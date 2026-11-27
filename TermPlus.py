"""
版权所有 (c) 2025 [吴宪]

本软件TermPlus（以下简称“软件”）为个人非商业用途开源发布。任何人均可免费使用、复制、修改和分发本软件，但仅限于个人非商业用途。
对于商业用途（包括但不限于嵌入商业产品、提供商业服务、营利分发等），必须事先获得作者的书面许可。

本软件按“现状”提供，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性以及不侵权的保证。
在任何情况下，作者均不对因使用或无法使用本软件而产生的任何直接、间接、偶然、特殊或后续损害承担责任。

如需商业授权或有任何疑问，请联系：[dakongwuxian@gmail.com]
"""
import ast
import base64
import builtins
import codecs
import configparser
from datetime import datetime
import io
import json
import keyword
import os # 遍历目录
import queue
import random
import paramiko
import pyvisa
from pyvisa.constants import AccessModes
from PIL import Image, ImageTk
import platform
import re # 加载脚本文件
import subprocess
import sys
import serial
import serial.tools.list_ports
import tkinter as tk
from tkinter import scrolledtext, ttk, Canvas, simpledialog, messagebox, filedialog
import tkinter.font as tkFont
import threading
import time
import traceback
from urllib.parse import urljoin,quote


# ============================================================
# 多语言支持
# ------------------------------------------------------------
# - 界面文字统一用 tr(键, 英文原文, **参数) 获取。英文原文直接写在代码里，作为默认值和兜底。
# - 其他语言放在 language 文件夹下的 <语言代码>.txt（打包后位于 _internal\language），
#   每行一条 "键 = 译文"，UTF-8 编码，# 开头为注释，译文中的 \n 表示换行。
#   缺少的键自动显示英文，所以新增语言时没翻译完的条目也不会空白。
# - TermPlusSetup.ini 的 [Setup] 里 language = en / zh ...，为空或没有 ini 时用英文。
# - 程序启动时（创建任何控件之前）就加载语言，切换语言需要重启生效。
# ============================================================
if getattr(sys, "frozen", False):
    # 打包后：ini 跟 exe 放在一起；语言文件在 _internal\language
    APP_DIR = os.path.dirname(os.path.abspath(sys.executable))
    LANG_DIR = os.path.join(getattr(sys, "_MEIPASS", APP_DIR), "language")
else:
    APP_DIR = os.path.dirname(os.path.abspath(__file__))
    LANG_DIR = os.path.join(APP_DIR, "language")
INI_PATH = os.path.join(APP_DIR, "TermPlusSetup.ini")

DEFAULT_LANG = "en"
# ini 里允许写的别名，不区分大小写
LANG_ALIASES = {
    "en": "en", "english": "en",
    "zh": "zh", "chinese": "zh", "zh_cn": "zh", "zh-cn": "zh", "中文": "zh",
    "ja": "ja", "japanese": "ja", "日本語": "ja",
    "sv": "sv", "swedish": "sv", "svenska": "sv",
}

_LANG_CODE = DEFAULT_LANG      # 当前生效的语言
_LANG_SAVE_CODE = DEFAULT_LANG # 关闭时写入 ini 的语言（在语言窗口里选了新语言后会变）
_LANG = {}                     # 当前语言的 键 -> 译文


def _lang_unescape(value):
    """处理译文里的 \\n、\\t、\\\\ 转义。"""
    out = []
    i = 0
    while i < len(value):
        c = value[i]
        if c == "\\" and i + 1 < len(value):
            n = value[i + 1]
            if n == "n":
                out.append("\n"); i += 2; continue
            if n == "t":
                out.append("\t"); i += 2; continue
            if n == "\\":
                out.append("\\"); i += 2; continue
        out.append(c)
        i += 1
    return "".join(out)


def read_lang_file(path):
    """读取一个语言文件，返回 {键: 译文}。读不到时返回空字典。"""
    table = {}
    try:
        with open(path, "r", encoding="utf-8-sig") as f:
            for raw in f:
                line = raw.rstrip("\r\n")
                if not line.strip() or line.lstrip().startswith("#"):
                    continue
                if "=" not in line:
                    continue
                key, value = line.split("=", 1)
                key = key.strip()
                # 只去掉等号后紧跟的一个空格，保留译文本身的前后空格
                if value.startswith(" "):
                    value = value[1:]
                if key:
                    table[key] = _lang_unescape(value)
    except OSError:
        pass
    return table


def list_languages():
    """扫描 language 文件夹，返回 [(代码, 显示名称), ...]。英文始终在列表里。"""
    langs = {}
    try:
        for name in os.listdir(LANG_DIR):
            if name.lower().endswith(".txt"):
                code = os.path.splitext(name)[0].lower()
                table = read_lang_file(os.path.join(LANG_DIR, name))
                langs[code] = table.get("language.name", code)
    except OSError:
        pass
    langs.setdefault(DEFAULT_LANG, "English")
    return sorted(langs.items(), key=lambda kv: (kv[0] != DEFAULT_LANG, kv[0]))


def normalize_lang(value):
    """把 ini 里写的语言（en / English / chinese …）转成语言代码，认不出来时用英文。"""
    v = (value or "").strip().lower()
    if not v:
        return DEFAULT_LANG
    code = LANG_ALIASES.get(v, v)
    if code == DEFAULT_LANG or os.path.isfile(os.path.join(LANG_DIR, code + ".txt")):
        return code
    return DEFAULT_LANG


def read_ini_language():
    """在创建任何控件之前，单独从 ini 里读出 language。"""
    try:
        cfg = configparser.ConfigParser()
        cfg.read(INI_PATH, encoding="utf-8")
        return cfg.get("Setup", "language", fallback="")
    except Exception:
        return ""


def load_language(code):
    global _LANG_CODE, _LANG_SAVE_CODE, _LANG
    _LANG_CODE = code
    _LANG_SAVE_CODE = code
    _LANG = read_lang_file(os.path.join(LANG_DIR, code + ".txt"))


def tr(key, default, **kwargs):
    """取当前语言的译文；没有时用英文原文。带参数时按 {名称} 填入。"""
    text = _LANG.get(key, default)
    if not kwargs:
        return text
    try:
        return text.format(**kwargs)
    except (KeyError, IndexError, ValueError):
        # 译文里的占位符写错时，退回英文，避免界面报错
        try:
            return default.format(**kwargs)
        except (KeyError, IndexError, ValueError):
            return default


def ui_font_family():
    """界面字体，语言文件里可以用 font.ui 指定，默认 Microsoft YaHei UI。"""
    return _LANG.get("font.ui", "Microsoft YaHei UI")


def _monitor_work_area(x, y):
    """返回包含屏幕坐标 (x, y) 的显示器的工作区 (left, top, right, bottom)，不含任务栏。
    多屏时副屏的坐标可能是负数（副屏在主屏左边或上边）。取不到时返回 None。"""
    if sys.platform != "win32":
        return None
    try:
        import ctypes
        from ctypes import wintypes

        class MONITORINFO(ctypes.Structure):
            _fields_ = [("cbSize", wintypes.DWORD), ("rcMonitor", wintypes.RECT),
                        ("rcWork", wintypes.RECT), ("dwFlags", wintypes.DWORD)]

        user32 = ctypes.windll.user32
        user32.MonitorFromPoint.restype = wintypes.HMONITOR
        user32.MonitorFromPoint.argtypes = [wintypes.POINT, wintypes.DWORD]
        user32.GetMonitorInfoW.argtypes = [wintypes.HMONITOR, ctypes.POINTER(MONITORINFO)]
        MONITOR_DEFAULTTONEAREST = 2
        hmon = user32.MonitorFromPoint(wintypes.POINT(int(x), int(y)), MONITOR_DEFAULTTONEAREST)
        info = MONITORINFO()
        info.cbSize = ctypes.sizeof(MONITORINFO)
        if not hmon or not user32.GetMonitorInfoW(hmon, ctypes.byref(info)):
            return None
        r = info.rcWork
        return r.left, r.top, r.right, r.bottom
    except Exception:
        return None


def place_on_parent_monitor(win, parent, y_ratio=3):
    """把弹出窗口放到父窗口中间（垂直方向偏上 1/y_ratio），并保证整个窗口落在父窗口所在的那块屏幕里。
    调用前窗口可以先 withdraw()，调用后再 deiconify()。"""
    win.update_idletasks()
    # reqwidth/reqheight 不含标题栏和边框，留出余量，保证标题栏和按键都在屏幕内
    w = win.winfo_reqwidth() + 16
    h = win.winfo_reqheight() + 40
    px, py = parent.winfo_rootx(), parent.winfo_rooty()
    pw, ph = parent.winfo_width(), parent.winfo_height()
    x = px + (pw - w) // 2
    y = py + (ph - h) // y_ratio
    area = _monitor_work_area(px + pw // 2, py + ph // 2)
    if area is None:
        # 取不到显示器信息时，按整个虚拟桌面限制
        left, top = parent.winfo_vrootx(), parent.winfo_vrooty()
        right = left + parent.winfo_vrootwidth()
        bottom = top + parent.winfo_vrootheight()
    else:
        left, top, right, bottom = area
    x = max(left, min(x, right - w))
    y = max(top, min(y, bottom - h))
    win.geometry(f"+{x}+{y}")


def restart_app():
    """重新启动 TermPlus（打包后启动 exe，源码运行时用当前解释器重新运行本文件）。"""
    if getattr(sys, "frozen", False):
        args = [sys.executable]
    else:
        args = [sys.executable, os.path.abspath(__file__)]
    subprocess.Popen(args, cwd=APP_DIR, close_fds=True)


load_language(normalize_lang(read_ini_language()))


def _parse_visa_call(name, line):
    """解析 visa_init / visa_query / visa_write 的参数，返回参数文本；格式不对返回 None。

    支持：
      visa_query(CHAM:WAVE_TEXT?)            括号形式，取第一个 "(" 到最后一个 ")" 之间的全部内容，
                                              内部的括号、引号不会截断；最后一个 ")" 之后的内容（注释等）忽略
      visa_query（CHAM:IP?）                 全角括号
      visa_query CHAM:IP?                    空格简写形式
    """
    s = line.strip()
    if not s.lower().startswith(name):
        return None
    rest = s[len(name):]
    if rest.lstrip()[:1] in ("(", "（"):
        m = re.match(r'^\s*[\(（]\s*(.*\S)\s*[\)）]', rest)
        return m.group(1) if m else None
    if rest[:1].isspace() and rest.strip():
        return rest.strip()
    return None


def _visa_arg_to_py(arg):
    """把脚本里 visa_init/visa_query/visa_write 的参数转成可执行的 Python 表达式。

    - 以引号开头且本身是合法 Python 表达式（如 "OUTP ON"、"VOLT " + str(v)）时原样保留，
      兼容已有写法；
    - 否则视为原始命令文本，用 repr() 生成字符串字面量，内部的引号、反斜杠、括号都会被正确转义，
      例如 CHAM:WAVE_TEXT "(start temp 25C)-(loop count 10)"。
    """
    if arg[:1] in ('"', "'"):
        try:
            ast.parse(arg, mode='eval')
            return arg
        except SyntaxError:
            pass
    return repr(arg)


# 嵌入的二维码 base64 字符串（PNG 格式）
img_base64 = (
"iVBORw0KGgoAAAANSUhEUgAAANgAAADZAQAAAABqB8PlAAAAGmVYSWZNTQAqAAAACAABARIAAwAA"
"AAEAAQAAAAAAABPAdecAAATCSURBVHjazVjbjuNEED3ltmgLJDp8wKS9/+EdZzV8CJ+wvGWkRenR"
"rJR5Wz6FD1iYzmSl5SMQsmd546WNBOqA7cNDkrlkLwybGOG3uNLlrqpT51S3EO99Evy3NgQARVnT"
"hKjPPaQyJsxiAcAOs5cZW3V5jDDS7hnK7rhpjGQo2Q8U+0ocrphLkPgjFsmbipg5dJIjAeC3f3wJ"
"AKMD5bqsK4yeXnQTYWdFMuV31l3c/kwPWdt+HcPk1nOXdEmwxq1A+6YHgG44nGl6MLeoV07RS49m"
"dOagWA3yPQkjoMC1BETXTjCGAS5S/+oGu7ur2/16hSS56EFgquilN8bMSZIcJp8e+AlI3HdIZzgr"
"u2/TP7QDPCrQAcqPrQnQDqoSBkxRetvv0bfuPpbWPDXZ8MSMHpYBdMpjDMOg2ar6sLFnN7bpSk48"
"AGS6haoZREe89keSD8KDdFAeAIOmU156Q8wcynqo2k716mRBjoAzfv/EX6+J4/lRsrsuyQ+rARk8"
"+p3Yp+WmtlF5jAFCz71if2ANaDe8pLE46RUMRa9SVQPCi9VE1bkdprZ0Jb3QBLJVHpaEdkVhh6kt"
"YpyikB4E2UJIGzBVy2Xd2zRe3HfDsLcGIGieL1kZBmB2vqxsMJyzBSyTTQOP7rTyobAUAMD73XlC"
"t0XZA8AUUKwZwoz0Uj20tjIn2/fYPtnliRSz7LU/EY7COsRRY4Nkv0+sVHfWjf4xvuzBuZ57lBXC"
"Wg0YDQOmherHA2E3ovSqZjB2/T3hC9KXvd1g924r84bBD7CXu2LgN3uZAlJXwaxj74EwBTA+4Kwo"
"93Idyxa2Ctw8IRiHsh2obxPjLrqJXGHUrCmXdtREdJN6GM1JACh/9PjYmPWLvwLxIipvt7Nwfi8d"
"+2NpHoFjABss9RaYTgH7rt4MB4jPbfHptvgEUiAHkmaVqeVzocFXAIA/fzPM1HLphzrnaFeUi8pu"
"+7Y3IUCzfTgv/ctc6znbkhXClidM0BGKNXfmrA/7jA/VHB0BVVkas+0VzF7HouxtEm944o43n6La"
"9flqkTw49uztl65FAiDFU5SeuTRYneovcZT0QnQni+vrj69ttqtet4KWaJl/8/hJvQCgU5RXRwLJ"
"tAPzQbCUNhEn885eh4DVZ233qDJmNP1aVEsMNJvOWkhvA01EyWq8ns/K+h524wE1Z6q4qCsTNM9Z"
"2R7ALELxrV6pDsODMb2j0nkuuFW2gFlbLnrQ6KiWJGkwhfIy0OzGOZckKwPSFaoXGsMIVQ1zH5IC"
"6B6ryxxmlal2kY+b2q5cgbIqB8KSpsf4c8N5LJSXygQz53J5p7ZfAG632fbRgD6Da/ESeNnjDPgU"
"z371P/hNbQupqwA9d1A9DAMASM19eOKD5/dWKpBxds4lKxjoeJB54p063YjI5Hg8bkRneNXJI4IO"
"3eS6HuYMG2Zsi7KXEABFLwwh4v68xHdIy8djdyXPwBy21vFMpBODBlik46S/d7e242a/2H9+25Bv"
"bb+8qZpRc9qq1aMKAdqV9ONDcXKy27eA9HUwWeyeP7k6aiRc0L8qFvkwPKHZTY6v7ahuXLoErgFj"
"vhZIN9Bd3pmk6tLmAVitTk+Px8ZIRFFeJu9fl+9xl/c/uhP/kO1vBYeg5BFXBCUAAAAASUVORK5C"
"YII="
)


# ============================================================================
# 按键文件（.ts）自动同步：解析 / 序列化 / 标签页对应 / 三方合并 / 加锁写入 / 备份
# 这一部分不碰界面，后台线程和主线程都可以调用。
#   标签页数据统一表示为 [(标签页名, {格子序号: (按键名, 多行内容)}), ...]
#   只保留按键名非空白的按键，多行内容去掉首尾空白——与保存时写出、加载时读回的结果一致，
#   所以两份数据可以直接比较。
# ============================================================================
_TS_TAB_RE = re.compile(r'<tab\s*\{([^}]+)\}>(.*?)</tab>', re.DOTALL)
_TS_BTN_RE = re.compile(r'<button\s*\{(\d+)\}\s*\{([^}]+)\}>(.*?)</button>', re.DOTALL)
_TS_DATA_RE = re.compile(r'<data>\s*(.*?)\s*</data>', re.DOTALL)
TS_ENCODINGS = ('gbk', 'utf-8', 'utf-8-sig', 'latin-1')
TS_LOCK_STALE_SECONDS = 10      # 锁文件 10 秒没变化，当作程序崩溃留下的
TS_LOCK_WAIT_SECONDS = 12       # 最多等这么久拿锁


class TsLockBusy(Exception):
    """别的 TermPlus 正在保存，等不到锁。"""


def ts_parse(content):
    tabs = []
    for tab_name, tab_content in _TS_TAB_RE.findall(content or ""):
        buttons = {}
        for idx, name, body in _TS_BTN_RE.findall(tab_content):
            m = _TS_DATA_RE.search(body)
            buttons[int(idx)] = (name, m.group(1).strip() if m else "")
        tabs.append((tab_name, {i: v for i, v in buttons.items() if v[0].strip()}))
    return tabs


def ts_serialize(tabs):
    """与 save_script 写出的格式完全相同。"""
    out = []
    for tab_name, buttons in tabs:
        out.append(f"<tab {{{tab_name}}}>\n")
        for idx in sorted(buttons):
            name, data = buttons[idx]
            if not name.strip():
                continue
            out.append(f"<button {{{idx}}} {{{name}}}>\n<data>\n{data}\n</data>\n"
                       "<icon>\n\n</icon>\n<desc>\n\n</desc>\n</button>\n")
        out.append("</tab>\n\n")
    return "".join(out)


def ts_read(path):
    """读取 ts 文件，返回 (内容, 编码)。读不到时抛 OSError。"""
    for enc in TS_ENCODINGS:
        try:
            with open(path, "r", encoding=enc) as f:
                return f.read(), enc
        except UnicodeDecodeError:
            continue
    with open(path, "r", encoding="gbk", errors="replace") as f:
        return f.read(), "gbk"


def ts_fingerprint(path):
    st = os.stat(path)
    return (st.st_mtime_ns, st.st_size)


def ts_read_stable(path):
    """读取并确认读的过程中文件没有变化（防止读到别的程序写了一半的文件）。返回 (内容, 编码, 指纹)。"""
    for _ in range(3):
        fp1 = ts_fingerprint(path)
        text, enc = ts_read(path)
        fp2 = ts_fingerprint(path)
        if fp1 == fp2:
            return text, enc, fp2
        time.sleep(0.3)
    return text, enc, fp2


def _ts_tab_similarity(a, b):
    keys = set(a) | set(b)
    if not keys:
        return 0.0
    return sum(1 for k in keys if a.get(k) == b.get(k)) / len(keys)


def ts_match_tabs(base, disk):
    """ts 文件里的每个标签页对应基准里的第几个，对不上为 None。
    先按名称（重名时按第几次出现），再按按键内容相似度（≥50%，同位置优先）。"""
    disk_map = [None] * len(disk)
    used = set()
    by_name = {}
    for i, (name, _) in enumerate(base):
        by_name.setdefault(name, []).append(i)
    seen = {}
    for j, (name, _) in enumerate(disk):
        k = seen.get(name, 0)
        seen[name] = k + 1
        lst = by_name.get(name, [])
        if k < len(lst):
            disk_map[j] = lst[k]
            used.add(lst[k])
    for j, (_, db) in enumerate(disk):
        if disk_map[j] is not None:
            continue
        best, best_score = None, 0.0
        for i, (_, bb) in enumerate(base):
            if i in used:
                continue
            score = _ts_tab_similarity(bb, db) + (0.01 if i == j else 0.0)
            if score > best_score:
                best, best_score = i, score
        if best is not None and best_score >= 0.5:
            disk_map[j] = best
            used.add(best)
    return disk_map


def _ts_entry(name, buttons, ref, new_base):
    # ref：界面上对应的标签页 frame（没有则新建）；new_base：在 ts 文件里的序号（本地新增为 None）
    # ui：只在界面上保留、不写进文件的按键值（冲突时点了“取消”）；pending：这些按键的序号
    return {"name": name, "buttons": dict(buttons), "ref": ref, "new_base": new_base,
            "ui": {}, "pending": set()}


def ts_merge(base, local, disk, disk_map):
    """三方合并。
    base / disk：[(名称, 按键)]；local：[{name, buttons, base, editors, pending, ref}]
    返回 (entries, local_keys, disk_keys, conflicts)。
    键：("b", 基准序号) / ("l", 本地序号) / ("d", ts 序号)。"""
    entries, conflicts = {}, []
    l_by_base, local_keys = {}, []
    for k, e in enumerate(local):
        b = e.get("base")
        if b is not None and 0 <= b < len(base) and b not in l_by_base:
            l_by_base[b] = e
            local_keys.append(("b", b))
        else:
            local_keys.append(("l", k))
            entries[("l", k)] = _ts_entry(e["name"], e["buttons"], e["ref"], None)
    d_by_base, disk_keys = {}, []
    for j, b in enumerate(disk_map):
        if b is not None:
            d_by_base[b] = j
            disk_keys.append(("b", b))
        else:
            disk_keys.append(("d", j))
            entries[("d", j)] = _ts_entry(disk[j][0], disk[j][1], None, j)

    for i, (bn, bb) in enumerate(base):
        key = ("b", i)
        le, j = l_by_base.get(i), d_by_base.get(i)
        if le is not None and j is not None:
            dn, db = disk[j]
            ln, lb, pend = le["name"], le["buttons"], set(le.get("pending") or ())
            ent = _ts_entry(ln, {}, le["ref"], j)
            if ln == dn or dn == bn:
                ent["name"] = ln
            elif ln == bn:
                ent["name"] = dn
            else:
                ent["name"] = dn
                conflicts.append({"kind": "name", "key": key, "local": ln, "ts": dn})
            for idx in sorted(set(bb) | set(lb) | set(db) | pend):
                b, l, d = bb.get(idx), lb.get(idx), db.get(idx)
                if idx in pend:
                    # 上次冲突时点了“取消”：两边还不一样就继续算冲突
                    val, conflict = l, l != d
                elif l == d or l == b:
                    val, conflict = (l if l == d else d), False
                elif d == b:
                    val, conflict = l, False
                else:
                    val, conflict = d, True
                if conflict:
                    val = d
                    conflicts.append({"kind": "button", "key": key, "idx": idx,
                                      "tab": ln, "local": l, "ts": d})
                if val is not None:
                    ent["buttons"][idx] = val
            entries[key] = ent
        elif le is not None:            # ts 里删了这个标签页
            if le["name"] != bn or le["buttons"] != bb or le.get("editors"):
                conflicts.append({"kind": "delete", "key": key, "deleted_by": "ts", "tab": le["name"],
                                  "keep": _ts_entry(le["name"], le["buttons"], le["ref"], None)})
        elif j is not None:             # 本地删了这个标签页
            dn, db = disk[j]
            if dn != bn or db != bb:
                conflicts.append({"kind": "delete", "key": key, "deleted_by": "local", "tab": dn,
                                  "keep": _ts_entry(dn, db, None, j)})
    return entries, local_keys, disk_keys, conflicts


def ts_apply_choice(entries, conflict, side):
    """side：button → local / ts / cancel；name → local / ts；delete → delete / keep。
    button 选 local 时用 conflict["local"]（弹窗里改过的话调用前已经替换成改过的值）。"""
    kind, key = conflict["kind"], conflict["key"]
    if kind == "delete":
        if side == "keep":
            entries[key] = conflict["keep"]
        return
    ent = entries[key]
    if kind == "name":
        ent["name"] = conflict["local"] if side == "local" else conflict["ts"]
        return
    idx = conflict["idx"]
    val = conflict["local"] if side == "local" else conflict["ts"]
    if side == "cancel":
        # 文件里先保留 ts 的值（不覆盖别人的修改），界面上保留本地的值，下次保存再提示
        ent["ui"][idx] = conflict["local"]
        ent["pending"].add(idx)
    if val is None:
        ent["buttons"].pop(idx, None)
    else:
        ent["buttons"][idx] = val


def _ts_order_changed(keys):
    b = [k[1] for k in keys if k[0] == "b"]
    return b != sorted(b)


def ts_merge_order(local_keys, disk_keys):
    """只有一边调整了顺序就用那一边；两边都调整了以 ts 为准。
    另一边新增的标签页插在它在自己那边的前一个标签页后面。"""
    if _ts_order_changed(disk_keys):
        skeleton, extra = disk_keys, local_keys
    else:
        skeleton, extra = local_keys, disk_keys
    order = list(skeleton)
    present = set(order)
    for n, k in enumerate(extra):
        if k in present:
            continue
        at = 0
        for q in reversed(extra[:n]):
            if q in present:
                at = order.index(q) + 1
                break
        order.insert(at, k)
        present.add(k)
    return order


def _ts_lock_path(path):
    return path + ".lock"


def ts_lock(path):
    """在 ts 旁边独占创建 .lock 文件；别人持有时等待。返回锁文件路径。"""
    lock = _ts_lock_path(path)
    deadline = time.time() + TS_LOCK_WAIT_SECONDS
    first_seen = {}
    while True:
        try:
            fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
            try:
                os.write(fd, f"{platform.node()} {os.getpid()} {time.time():.0f}\n".encode())
            finally:
                os.close(fd)
            return lock
        except FileExistsError:
            try:
                mtime = os.stat(lock).st_mtime
            except FileNotFoundError:
                continue
            # 共享盘上文件的时间用的是那台电脑的时钟，不能和本机时间直接比：
            # 改为在本机观察同一个锁文件超过 10 秒没有变化，才当作程序崩溃留下的残留
            seen = first_seen.setdefault(mtime, time.time())
            if time.time() - seen > TS_LOCK_STALE_SECONDS:
                try:
                    os.remove(lock)
                except OSError:
                    pass
                continue
            if time.time() > deadline:
                raise TsLockBusy(lock)
            time.sleep(0.2)


def ts_unlock(lock):
    try:
        os.remove(lock)
    except OSError:
        pass


def ts_write_atomic(path, content, encoding):
    """先写临时文件，再整体替换，别的程序不会读到写了一半的文件。"""
    folder, name = os.path.split(path)
    tmp = os.path.join(folder, f".{name}.{os.getpid()}.{threading.get_ident()}.tmp")
    try:
        with open(tmp, "w", encoding=encoding) as f:
            f.write(content)
        for attempt in range(30):
            try:
                os.replace(tmp, path)
                return
            except PermissionError:
                # 别的程序正好在读这个文件，Windows 不允许替换，稍等重试
                if attempt == 29:
                    raise
                time.sleep(0.1)
    finally:
        if os.path.exists(tmp):
            try:
                os.remove(tmp)
            except OSError:
                pass


def ts_backup(path, content, encoding, label):
    """把 content 备份到 ts 同一个文件夹；写不进去时放到本机 %LOCALAPPDATA%\\TermPlus\\backup。返回备份路径。"""
    folder, name = os.path.split(path)
    stem = name[:-3] if name.lower().endswith(".ts") else name
    backup_name = f"{stem}_backup_{label}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.ts"
    local_dir = os.path.join(os.environ.get("LOCALAPPDATA") or os.path.expanduser("~"), "TermPlus", "backup")
    last_error = None
    for target_dir in (folder, local_dir):
        try:
            os.makedirs(target_dir, exist_ok=True)
            target = os.path.join(target_dir, backup_name)
            try:
                with open(target, "w", encoding=encoding) as f:
                    f.write(content)
            except UnicodeEncodeError:
                with open(target, "w", encoding="utf-8") as f:
                    f.write(content)
            return target
        except OSError as e:
            last_error = e
    raise last_error


def ts_locked_write(path, content, encoding, expected_canon, backup_label=None):
    """加锁 → 重新读文件 → 和预期不一样就返回 ("changed", 当前内容, 指纹)，不写；
    一样就（需要时先备份当前文件）写入，返回 ("written", 备份路径或 None, 指纹)。"""
    if not os.path.exists(path):
        # 文件不见了（被删、被改名或共享盘异常）：不能当成“空文件”去合并，否则会删光所有标签页
        raise FileNotFoundError(path)
    lock = ts_lock(path)
    try:
        cur_text, cur_enc = ts_read(path)
        if ts_serialize(ts_parse(cur_text)) != expected_canon:
            return ("changed", cur_text, ts_fingerprint(path))
        backup_path = ts_backup(path, cur_text, cur_enc, backup_label) if backup_label else None
        ts_write_atomic(path, content, encoding)
        return ("written", backup_path, ts_fingerprint(path))
    finally:
        ts_unlock(lock)


class KeyFileSyncWorker(threading.Thread):
    """自动同步的后台线程：定时查 ts 文件有没有变化，以及执行读、写、备份。
    共享盘卡住时只卡这个线程，不会卡界面。结果用 root.after 交回主线程处理。"""
    POLL_SECONDS = 2.0
    POLL_JITTER = 0.5          # 每个窗口错开一点，避免很多窗口同时查
    OFFLINE_POLL_SECONDS = 10.0

    def __init__(self, gui):
        super().__init__(daemon=True)
        self.gui = gui
        self.jobs = queue.Queue()
        self.offline = False
        self.stopped = False

    def post(self, job):
        self.jobs.put(job)

    def stop(self):
        self.stopped = True
        self.jobs.put(None)

    def _emit(self, *args):
        try:
            self.gui.root.after(0, self.gui._sync_on_result, *args)
        except (RuntimeError, tk.TclError):
            self.stopped = True    # 窗口已经关了

    def _went_offline(self, path, error):
        if not self.offline:
            self.offline = True
            self._emit("offline", path, str(error))

    def _came_online(self, path):
        if self.offline:
            self.offline = False
            self._emit("online", path)

    def run(self):
        while not self.stopped:
            wait = (self.OFFLINE_POLL_SECONDS if self.offline
                    else self.POLL_SECONDS + random.uniform(0, self.POLL_JITTER))
            try:
                job = self.jobs.get(timeout=wait)
            except queue.Empty:
                job = ("poll",)
            if job is None:
                break
            try:
                self._do(job)
            except Exception as e:      # 兜底，线程不能死
                self._emit("error", job[1] if len(job) > 1 else None, repr(e), False)

    def _do(self, job):
        kind = job[0]
        g = self.gui
        if kind == "poll":
            path = g._sync_path() if g._sync_enabled else None
            if not path:
                return
            try:
                fp = ts_fingerprint(path)
                self._came_online(path)
                if fp == g._sync_last_fp:
                    return
                text, enc, fp = ts_read_stable(path)
            except OSError as e:
                self._went_offline(path, e)
                return
            g._sync_last_fp = fp
            self._emit("disk", path, text, enc, False)
        elif kind == "read":
            path = job[1]
            try:
                text, enc, fp = ts_read_stable(path)
            except OSError as e:
                self._went_offline(path, e)
                self._emit("error", path, str(e), True)
                return
            self._came_online(path)
            g._sync_last_fp = fp
            self._emit("disk", path, text, enc, True)
        elif kind == "write":
            _, path, content, enc, expected, backup_label = job
            try:
                result = ts_locked_write(path, content, enc, expected, backup_label)
            except TsLockBusy:
                self._emit("busy", path)
                return
            except OSError as e:
                self._went_offline(path, e)
                self._emit("error", path, str(e), True)
                return
            except ValueError as e:      # 编码写不进去等
                self._emit("error", path, str(e), False)
                return
            self._came_online(path)
            if result[2] is not None:
                g._sync_last_fp = result[2]
            if result[0] == "changed":
                self._emit("disk", path, result[1], enc, True)
            else:
                self._emit("written", path, content, result[1])
        elif kind == "backup":
            _, path, content, enc, label = job
            try:
                self._emit("backup_done", path, ts_backup(path, content, enc, label))
            except OSError as e:
                self._emit("backup_failed", path, str(e))


class SerialComm:
    def __init__(self, port, baudrate=115200):
        try:
            self.ser = serial.Serial(port, baudrate, timeout=1)
        except serial.SerialException as e:
            self.ser = None
            error_message = str(e).lower()
            if "busy" in error_message or "access" in error_message or "permission" in error_message:
                print(f"串口 {port} 被占用或无访问权限: {e}")
            else:
                print(f"串口打开失败: {e}")


    def send_data(self, data):
        if self.ser and self.ser.is_open:
            try:
                self.ser.write(data.encode())
            except serial.SerialException:
                print("发送数据失败")

    def send_byte_data(self, data_bytes):
        """
        直接发送字节数据到串口。
        传入的数据必须是 bytes 或 bytearray 类型。
        """
        if self.ser and self.ser.is_open:
            try:
                # 检查传入的数据是否为字节类型
                if isinstance(data_bytes, (bytes, bytearray)):
                    self.ser.write(data_bytes)
                    # print(f"发送了原始字节: {data_bytes!r}") # 用于调试
                else:
                    print(f"错误: send_byte_data 函数只接受 bytes 或 bytearray 类型，传入了 {type(data_bytes)}。")
            except serial.SerialException as e:
                print(f"发送字节数据失败: {e}")
            except Exception as e:
                print(f"发送字节数据时发生未知错误: {e}")
        else:
            print("串口未打开，无法发送字节数据。")

    def receive_data(self, end_char='\n'):
        if self.ser and self.ser.is_open:
            self.ser.timeout = 0.1
            received_data = bytearray()
            try:
                while True:
                    char = self.ser.read(1)
                    if char:
                        received_data.extend(char)
                        if received_data.endswith(end_char.encode()):
                            break
                    else:
                        break
                data = received_data.decode().strip()
            except serial.SerialException:
                data = None
            return data

    def close(self):
        if self.ser and self.ser.is_open:
            self.ser.close()

#判断收发的字节数是否超过1k和1M，超过则修改为1k和1M
def format_bytes(size):
    if size >= 1_000_000:
        return f"{size / 1_000_000:03.0f}MB"
    elif size >= 1000:
        return f"{size / 1000:03.0f}kB"
    else:
        return f"{size:03.0f}B"

# 在 SerialGUI 类外或内部定义自定义异常类
class StopLoopException(Exception):
    pass


# ============================================================================
# 控制字符 / ANSI 转义序列渲染
# ============================================================================

# C0 控制字符与 DEL 的可读名称（0x09 TAB 与 0x0A LF 不在表内，保持原样）
CTRL_CHAR_NAMES = {
    0x00: "<NUL>", 0x01: "<SOH>", 0x02: "<STX>", 0x03: "<ETX>",
    0x04: "<EOT>", 0x05: "<ENQ>", 0x06: "<ACK>", 0x07: "<BEL>",
    0x08: "<BS>",  0x0B: "<VT>",  0x0C: "<FF>",  0x0D: "<CR>",
    0x0E: "<SO>",  0x0F: "<SI>",  0x10: "<DLE>", 0x11: "<DC1>",
    0x12: "<DC2>", 0x13: "<DC3>", 0x14: "<DC4>", 0x15: "<NAK>",
    0x16: "<SYN>", 0x17: "<ETB>", 0x18: "<CAN>", 0x19: "<EM>",
    0x1A: "<SUB>", 0x1B: "<Esc>", 0x1C: "<FS>",  0x1D: "<GS>",
    0x1E: "<RS>",  0x1F: "<US>",  0x7F: "<DEL>"
}


def escape_ctrl_chars(s):
    """把控制字符转换成 <Esc> / <CR> / <BEL> 这样的可读文字。"""
    out = []
    for ch in s:
        name = CTRL_CHAR_NAMES.get(ord(ch))
        out.append(name if name else ch)
    return ''.join(out)


class AnsiTextRenderer:
    """
    负责把写入主窗口的文本中的控制字符做处理，共三种显示方式：

    terminal（终端效果）：能实现的直接生效——SGR 颜色/粗体/下划线、\\r 行首覆盖、
        \\b 退格、\\t 制表位、ESC[K 清行、ESC[C/D/G 行内移动；纯噪声（NUL、光标显隐、
        窗口标题 OSC、字符集选择）静默丢弃；其余无法实现的（ESC[2J 清屏、ESC[A/B
        上下移动等）转成 <Esc>[2J 这样的可读文字。
    escape（显示为文字）：什么效果都不应用，所有控制字符一律转成可读文字
        （\\n 与 \\t 除外，保持原样，与复制时的行为一致）。
    raw（原样）：旧版行为，原样写入，仅把 \\r\\n 与 \\r 折叠成 \\n。
    """

    MODE_TERMINAL = "terminal"
    MODE_ESCAPE = "escape"
    MODE_RAW = "raw"

    # 残留（可能被切开的转义序列）最大长度，超过则判定为垃圾数据按字面输出
    MAX_PENDING = 64
    # 残留超过该时间（毫秒）仍未补全，则按字面输出，避免内容永久不显示
    PENDING_FLUSH_MS = 300
    # 按需创建的颜色 tag 上限，避免 tag_names() 无限增长拖慢自动清屏
    MAX_DYNAMIC_TAGS = 300

    # 分词正则：完整的转义序列 + 其他 C0 控制字符（不含 \t \n，也不含裸 \x1b）
    _TOKEN_RE = re.compile(
        "(\x1b\\[[0-?]*[ -/]*[@-~])"                 # 1 CSI
        "|(\x1b\\][^\x07\x1b]*(?:\x07|\x1b\\\\))"    # 2 OSC
        "|(\x1b[PX^_][\\s\\S]*?\x1b\\\\)"            # 3 DCS/SOS/PM/APC
        "|(\x1b[ -/][0-~])"                          # 4 ESC + 中间字符 + 终止符
        "|(\x1b(?![\\[\\]PX^_])[0-~])"               # 5 ESC + 终止符（排除 CSI/OSC/DCS 引导符）
        "|([\x00-\x08\x0b-\x1a\x1c-\x1f\x7f])"       # 6 其他 C0 / DEL
        "|(\x1b)"                                    # 7 落单的 ESC（无法构成序列）
    )
    _SPLIT_RE = re.compile("([\n\t])")

    # ---- 16 色前景调色板（分别针对浅色/深色背景做了可读性调整）----
    FG_LIGHT = [
        "#000000", "#cc0000", "#007f00", "#8a6d00",
        "#0000cc", "#a800a8", "#007f7f", "#7f7f7f",
        "#6a6a6a", "#e02020", "#00a000", "#b07800",
        "#3333e0", "#c800c8", "#00a0a0", "#000000",
    ]
    FG_DARK = [
        "#5a5a5a", "#ff6b6b", "#6bd96b", "#e8d16b",
        "#7fa8ff", "#e08ae0", "#6bd9d9", "#c8c8c8",
        "#8a8a8a", "#ff8f8f", "#95e895", "#f2e08a",
        "#a3bfff", "#eaa8ea", "#8ae8e8", "#ffffff",
    ]
    # ---- 16 色背景调色板（浅深主题共用标准配色）----
    BG_BASE = [
        "#000000", "#b02020", "#1f9020", "#b09020",
        "#2040b0", "#a030a0", "#209090", "#d8d8d8",
        "#707070", "#e04040", "#40c040", "#e0d040",
        "#4060e0", "#d050d0", "#40c0c0", "#ffffff",
    ]

    def __init__(self, gui, text_widget):
        self.gui = gui
        self.text = text_widget
        # 真正的插入/删除方法（绕开 SerialGUI 对 insert 的 monkey patch，避免递归）
        self._insert = text_widget.insert
        self._delete = text_widget.delete
        # 字体（粗体/斜体 tag 需要）
        self.font_family = "Courier New"
        self.font_size = 10
        # 显示方式，默认终端效果
        self.mode = self.MODE_TERMINAL
        # 主题（影响调色板）
        self.light_theme = True
        # 动态创建的颜色 tag 记录：颜色键 -> tag 名
        self._dyn_fg = {}
        self._dyn_bg = {}
        self._dyn_count = 0
        # 属性组合 -> tag 元组 的缓存
        self._tag_cache = {}
        self._pending_timer = None
        self.reset()

    # ------------------------------------------------------------------ 状态
    def reset(self):
        """清屏或重新连接时重置解析状态。"""
        self.pending = ""          # 被切开的、等待补全的序列
        self.col = 0               # 当前行的光标列（字符数，非像素）
        self._last_end = None      # 上次写入后的末尾索引，用于发现外部改动
        self._monitor_parts = []   # 本次 feed 中实际写入的可见文本（喂给正则监控）
        self._cr_pending = None    # 已收到但还没落地的 CR，见 _resolve_pending_cr
        self._reset_sgr()
        self._cancel_pending_timer()

    def _reset_sgr(self):
        self.fg = None
        self.bg = None
        self.bold = False
        self.dim = False
        self.italic = False
        self.underline = False
        self.reverse = False
        self.strike = False

    def set_mode(self, mode):
        if mode == self.mode:
            return
        # 切换方式时先把残留按字面吐出来，避免丢内容
        if self.pending:
            data, self.pending = self.pending, ""
            try:
                self.feed(data, literal=True)
            except Exception:
                pass
        self.mode = mode
        self._reset_sgr()

    def bind_widget_methods(self, insert_func, delete_func):
        """绑定未被 monkey patch 的原始 insert/delete，避免递归调用。"""
        self._insert = insert_func
        self._delete = delete_func

    def set_font(self, family, size):
        self.font_family = family
        self.font_size = size
        self._setup_tags()

    @staticmethod
    def _normalize_tags(tags):
        """把 insert(..., "green") / insert(..., ("a","b")) 统一成扁平元组。"""
        if not tags:
            return ()
        flat = []
        for t in tags:
            if isinstance(t, (tuple, list)):
                flat.extend(str(x) for x in t)
            elif t:
                flat.append(str(t))
        return tuple(flat)

    def set_theme(self, light):
        self.light_theme = bool(light)
        self._setup_tags()

    # ------------------------------------------------------------------ tag
    def _setup_tags(self):
        """（重新）配置所有固定 tag。主题或字体变化时会再调用一次。"""
        t = self.text
        fg_pal = self.FG_LIGHT if self.light_theme else self.FG_DARK
        # 背景色 tag 先建（前景色 tag 后建，优先级更高，避免互相覆盖 foreground）
        for i, color in enumerate(self.BG_BASE):
            t.tag_config(f"ansi_bg_{i}", background=color)
        for i, color in enumerate(fg_pal):
            t.tag_config(f"ansi_fg_{i}", foreground=color)
        # 反显时用到的“默认色互换”
        widget_bg = t.cget("background") or ("#FFFFFF" if self.light_theme else "#171b26")
        widget_fg = t.cget("foreground") or ("#000000" if self.light_theme else "#d9dce4")
        t.tag_config("ansi_fg_defbg", foreground=widget_bg)
        t.tag_config("ansi_bg_deffg", background=widget_fg)
        # 设置了背景色但没设前景色时，按背景明暗自动挑一个可读的前景色
        t.tag_config("ansi_fg_auto_light", foreground="#000000")
        t.tag_config("ansi_fg_auto_dark", foreground="#ffffff")
        # 字形
        t.tag_config("ansi_bold", font=(self.font_family, self.font_size, "bold"))
        t.tag_config("ansi_italic", font=(self.font_family, self.font_size, "italic"))
        t.tag_config("ansi_underline", underline=True)
        t.tag_config("ansi_strike", overstrike=True)
        # 被转成文字的控制字符，用独立颜色标出来，方便和真实内容区分
        t.tag_config("ansi_ctrl", foreground="#b06fb0" if self.light_theme else "#d18fd1")
        # 已按需创建的颜色 tag 不需要重配（256/真彩色不随主题变化）
        self._tag_cache.clear()

    @staticmethod
    def _xterm256(idx):
        """标准 xterm 256 色表：0-15 基础色 / 16-231 6x6x6 立方 / 232-255 灰阶。"""
        base = [
            (0, 0, 0), (205, 0, 0), (0, 205, 0), (205, 205, 0),
            (0, 0, 238), (205, 0, 205), (0, 205, 205), (229, 229, 229),
            (127, 127, 127), (255, 0, 0), (0, 255, 0), (255, 255, 0),
            (92, 92, 255), (255, 0, 255), (0, 255, 255), (255, 255, 255),
        ]
        if idx < 16:
            return base[idx]
        if idx < 232:
            n = idx - 16
            levels = (0, 95, 135, 175, 215, 255)
            return (levels[n // 36], levels[(n // 6) % 6], levels[n % 6])
        v = 8 + (idx - 232) * 10
        return (v, v, v)

    @staticmethod
    def _luminance(rgb):
        r, g, b = rgb
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255.0

    def _color_rgb(self, color):
        """把内部颜色表示转换成 (r,g,b)，无法确定时返回 None。"""
        if isinstance(color, int):
            if color < 16:
                pal = self.FG_LIGHT if self.light_theme else self.FG_DARK
                h = pal[color].lstrip('#')
                return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
            return self._xterm256(color)
        if isinstance(color, tuple) and len(color) == 3:
            return color
        return None

    def _dyn_tag(self, color, is_fg):
        """为 256 色 / 真彩色按需创建 tag，超过上限则退化到 16 色。"""
        store = self._dyn_fg if is_fg else self._dyn_bg
        key = color
        name = store.get(key)
        if name:
            return name
        rgb = self._color_rgb(color)
        if rgb is None:
            return None
        if self._dyn_count >= self.MAX_DYNAMIC_TAGS:
            # 退化：按明暗映射到 16 色里最近的一个
            lum = self._luminance(rgb)
            idx = 7 if lum > 0.5 else 8
            return f"ansi_fg_{idx}" if is_fg else f"ansi_bg_{idx}"
        prefix = "ansi_dfg_" if is_fg else "ansi_dbg_"
        name = f"{prefix}{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
        hexcolor = f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
        if is_fg:
            self.text.tag_config(name, foreground=hexcolor)
        else:
            self.text.tag_config(name, background=hexcolor)
        store[key] = name
        self._dyn_count += 1
        return name

    def _current_tags(self):
        """把当前 SGR 状态翻译成 tag 元组。"""
        key = (self.fg, self.bg, self.bold, self.dim, self.italic,
               self.underline, self.reverse, self.strike)
        cached = self._tag_cache.get(key)
        if cached is not None:
            return cached

        fg, bg = self.fg, self.bg
        if self.reverse:
            # 反显：前后景互换，未设置的一方用控件默认色
            fg, bg = (bg if bg is not None else 'defbg'), (fg if fg is not None else 'deffg')
        if self.dim:
            if fg is None:
                fg = 8
            elif isinstance(fg, int) and 8 <= fg <= 15:
                fg -= 8

        tags = []
        # 背景
        if bg == 'deffg':
            tags.append("ansi_bg_deffg")
        elif isinstance(bg, int) and bg < 16:
            tags.append(f"ansi_bg_{bg}")
        elif bg is not None:
            name = self._dyn_tag(bg, False)
            if name:
                tags.append(name)
        # 前景
        if fg == 'defbg':
            tags.append("ansi_fg_defbg")
        elif isinstance(fg, int) and fg < 16:
            tags.append(f"ansi_fg_{fg}")
        elif fg is not None:
            name = self._dyn_tag(fg, True)
            if name:
                tags.append(name)
        elif bg is not None and bg != 'deffg':
            # 只设了背景色：按背景明暗挑一个能看清的前景色
            rgb = self._color_rgb(bg)
            if rgb is not None:
                tags.append("ansi_fg_auto_light" if self._luminance(rgb) > 0.5
                            else "ansi_fg_auto_dark")
        # 字形
        if self.bold:
            tags.append("ansi_bold")
        if self.italic:
            tags.append("ansi_italic")
        if self.underline:
            tags.append("ansi_underline")
        if self.strike:
            tags.append("ansi_strike")

        result = tuple(tags)
        self._tag_cache[key] = result
        return result

    # ------------------------------------------------------------------ 入口
    def handles(self, index):
        """判断该 insert 是否是“追加到末尾”，只有末尾追加才交给本渲染器。"""
        try:
            resolved = self.text.index(index)
            return resolved == self.text.index("end-1c") or resolved == self.text.index("end")
        except Exception:
            return False

    def feed(self, chars, base_tags=(), literal=False):
        """
        主入口。base_tags 是调用方显式指定的 tag（例如时间戳的 "green"），
        有显式 tag 时以调用方为准，不叠加流里的 SGR 颜色。
        literal=True 表示内容已确认完整，不再做“跨块残留”判断。
        必须在主线程调用。
        """
        monitor_text = ""
        base_tags = self._normalize_tags(base_tags)
        try:
            self._cancel_pending_timer()
            self._sync_cursor()
            if self.mode == self.MODE_RAW:
                text = chars.replace('\r\n', '\n').replace('\r', '\n')
                self._cr_pending = None
                self._raw_insert("end", text, base_tags)
                self.col = self._line_len()
                monitor_text = text
            else:
                data = self.pending + chars
                self.pending = ""
                if not literal:
                    data, self.pending = self._split_incomplete_tail(data)
                if data:
                    self._monitor_parts = []
                    if self.mode == self.MODE_ESCAPE:
                        self._render_escape(data, base_tags)
                    else:
                        self._render_terminal(data, base_tags)
                    monitor_text = ''.join(self._monitor_parts)
                if self.pending:
                    self._schedule_pending_flush()
            self._last_end = self.text.index("end-1c")
        except Exception as e:
            # 渲染失败不能影响串口收数，退化成原样插入
            print(f"AnsiTextRenderer 渲染异常，已按原样插入: {e}")
            try:
                self._insert("end", chars)
                monitor_text = chars
                self.pending = ""
                self._cr_pending = None
                self._last_end = self.text.index("end-1c")
            except Exception:
                pass
        if monitor_text:
            try:
                self.gui.regex_monitor.on_new_text(monitor_text)
            except Exception as e:
                print(f"regex_monitor.on_new_text 异常: {e}")

    # ------------------------------------------------- 残留（跨块序列）处理
    def _split_incomplete_tail(self, s):
        """把结尾可能被切开的序列拆出来，返回 (本次可处理部分, 留到下次的残留)。"""
        if not s:
            return '', ''
        idx = s.rfind('\x1b')
        if idx >= 0:
            m = self._TOKEN_RE.match(s, idx)
            # 匹配到第 7 组（落单 ESC）说明序列还没收完
            if (m is None) or (m.lastindex is not None and m.lastindex >= 6):
                if len(s) - idx <= self.MAX_PENDING:
                    return s[:idx], s[idx:]
                # 太长了，判定为垃圾数据，按字面处理
        # 末尾孤立的 \r：\r\n 可能被切成两块，留到下次一起判断
        if s.endswith('\r'):
            return s[:-1], '\r'
        return s, ''

    def _schedule_pending_flush(self):
        try:
            self._pending_timer = self.text.after(self.PENDING_FLUSH_MS, self._flush_pending)
        except Exception:
            self._pending_timer = None

    def _cancel_pending_timer(self):
        if self._pending_timer is not None:
            try:
                self.text.after_cancel(self._pending_timer)
            except Exception:
                pass
            self._pending_timer = None

    def _flush_pending(self):
        """残留迟迟没有补全，按字面输出，避免内容一直不显示。"""
        self._pending_timer = None
        if not self.pending:
            return
        data, self.pending = self.pending, ""
        self.feed(data, literal=True)

    # ------------------------------------------------------------ 渲染实现
    def _render_escape(self, data, base_tags):
        """显示为文字：一律转文字，只保留 \\n 与 \\t。"""
        for part in self._SPLIT_RE.split(data):
            if not part:
                continue
            if part == '\n':
                self._newline(base_tags)
            elif part == '\t':
                self._put(part, base_tags)
            elif escape_ctrl_chars(part) == part:
                self._put(part, base_tags)
            else:
                # 混合内容：逐段写入，控制字符用 ansi_ctrl 标出来
                buf = ""
                for ch in part:
                    name = CTRL_CHAR_NAMES.get(ord(ch))
                    if name is None:
                        buf += ch
                    else:
                        if buf:
                            self._put(buf, base_tags)
                            buf = ""
                        self._put(name, base_tags or ("ansi_ctrl",))
                if buf:
                    self._put(buf, base_tags)

    def _render_terminal(self, data, base_tags):
        """终端效果：能实现的应用，不能实现的转文字。"""
        pos = 0
        for m in self._TOKEN_RE.finditer(data):
            if m.start() > pos:
                self._write_run(data[pos:m.start()], base_tags)
            pos = m.end()
            seq = m.group(0)
            if m.lastindex >= 6:
                self._handle_c0(seq, base_tags)
            else:
                if not self._handle_escape(seq, m.lastindex):
                    self._put(escape_ctrl_chars(seq), base_tags or ("ansi_ctrl",))
        if pos < len(data):
            self._write_run(data[pos:], base_tags)

    def _handle_c0(self, ch, base_tags):
        code = ord(ch)
        if code == 0x00:                    # NUL：常见填充字节，丢弃
            return
        if code == 0x0d:                    # CR
            # CR 的效果一律延后到下一次输出时才落地（见 _resolve_pending_cr），
            # 这样 \r\n 才不会被当成两个换行，跨块被切开也一样正确。
            if getattr(self.gui, "auto_delete_lock_count", 0) > 0:
                # 脚本正盯着 text_area 的索引，退化成换行，保持旧版行为
                self._cr_pending = 'degrade'
            else:
                self._cr_pending = 'overwrite'
                self.col = 0
            return
        if code == 0x08:                    # BS：左移一格
            if self.col > 0:
                self.col -= 1
            return
        # 其余（BEL/VT/FF/SO/SI/DEL 等）转文字
        self._put(CTRL_CHAR_NAMES.get(code, ch), base_tags or ("ansi_ctrl",))

    def _handle_escape(self, seq, group):
        """处理完整转义序列。返回 True 表示已消化（应用效果或静默丢弃）。"""
        if group == 1:                                  # CSI
            return self._handle_csi(seq)
        if group == 2:                                  # OSC
            body = seq[2:]
            ps = body.split(';', 1)[0]
            if ps in ('0', '1', '2', '7'):              # 窗口标题 / 工作目录，噪声
                return True
            return False
        if group == 4:                                  # ESC ( B 之类的字符集选择
            return seq[1] in '()*+'
        return False                                    # DCS 与其他 ESC 序列 -> 转文字

    def _handle_csi(self, seq):
        final = seq[-1]
        body = seq[2:-1]
        # 带中间字符（如 ESC[?25h 的 '?' 属于参数字节，这里指 0x20-0x2F）的一律转文字
        if body and body[-1] in ' !"#$%&\'()*+,-./':
            return False
        if final == 'm':
            self._apply_sgr(body)
            return True
        if final in ('h', 'l'):
            # 私有模式：只静默丢弃光标显隐/闪烁，其余（如备用屏幕）转文字
            return body in ('?25', '?12')
        if final == 'K':
            self._erase_in_line(body)
            return True
        if final in ('C', 'D', 'G', '`'):
            self._move_cursor(final, body)
            return True
        return False

    # ------------------------------------------------------------ SGR 解析
    def _apply_sgr(self, body):
        if body == '':
            params = [0]
        else:
            params = []
            for p in body.replace(':', ';').split(';'):
                params.append(int(p) if p.isdigit() else 0)
        i = 0
        n = len(params)
        while i < n:
            p = params[i]
            if p == 0:
                self._reset_sgr()
            elif p == 1:
                self.bold = True
            elif p == 2:
                self.dim = True
            elif p == 3:
                self.italic = True
            elif p == 4:
                self.underline = True
            elif p == 7:
                self.reverse = True
            elif p == 9:
                self.strike = True
            elif p in (21, 22):
                self.bold = False
                self.dim = False
            elif p == 23:
                self.italic = False
            elif p == 24:
                self.underline = False
            elif p == 27:
                self.reverse = False
            elif p == 29:
                self.strike = False
            elif 30 <= p <= 37:
                self.fg = p - 30
            elif p == 39:
                self.fg = None
            elif 40 <= p <= 47:
                self.bg = p - 40
            elif p == 49:
                self.bg = None
            elif 90 <= p <= 97:
                self.fg = p - 90 + 8
            elif 100 <= p <= 107:
                self.bg = p - 100 + 8
            elif p in (38, 48):
                color, consumed = self._parse_extended_color(params, i + 1)
                if consumed:
                    if p == 38:
                        self.fg = color
                    else:
                        self.bg = color
                    i += consumed
            # 5/6（闪烁）、8（隐藏）等忽略
            i += 1

    @staticmethod
    def _parse_extended_color(params, i):
        """解析 38;5;n / 38;2;r;g;b，返回 (颜色, 消耗的参数个数)。"""
        if i >= len(params):
            return None, 0
        mode = params[i]
        if mode == 5 and i + 1 < len(params):
            return max(0, min(255, params[i + 1])), 2
        if mode == 2 and i + 3 < len(params):
            r = max(0, min(255, params[i + 1]))
            g = max(0, min(255, params[i + 2]))
            b = max(0, min(255, params[i + 3]))
            return (r, g, b), 4
        return None, 0

    # ------------------------------------------------------- 光标与行内编辑
    def _move_cursor(self, final, body):
        try:
            n = int(body) if body else 1
        except ValueError:
            n = 1
        line_len = self._line_len()
        if final == 'C':                    # 右移，不越过行尾已有内容
            self.col = min(self.col + max(1, n), line_len)
        elif final == 'D':                  # 左移
            self.col = max(0, self.col - max(1, n))
        else:                               # G / ` 绝对列（1 起）
            self.col = max(0, min(max(1, n) - 1, line_len))

    def _erase_in_line(self, body):
        try:
            mode = int(body) if body else 0
        except ValueError:
            mode = 0
        line_start = self.text.index("end-1c linestart")
        line_len = self._line_len(line_start)
        if mode == 0:                       # 光标到行尾
            if self.col < line_len:
                self._delete(f"{line_start}+{self.col}c", "end-1c")
        elif mode == 1:                     # 行首到光标（用空格填充，保持列位）
            keep = min(self.col, line_len)
            if keep > 0:
                self._delete(line_start, f"{line_start}+{keep}c")
                self._insert(line_start, ' ' * keep)
        else:                               # 整行
            if line_len > 0:
                self._delete(line_start, "end-1c")

    def _line_len(self, line_start=None):
        if line_start is None:
            line_start = self.text.index("end-1c linestart")
        return len(self.text.get(line_start, "end-1c"))

    def _sync_cursor(self):
        """
        末尾内容可能被别处改动过（本地回显、自动清屏删除前半部分），
        此时把光标重新对齐到行尾，避免覆盖位置错乱。
        """
        try:
            cur_end = self.text.index("end-1c")
        except Exception:
            return
        if self._last_end is None or cur_end != self._last_end:
            # 末尾被别处改过，挂着的 CR 已经失去意义，丢掉避免莫名多出换行
            self._cr_pending = None
            self.col = self._line_len()
        else:
            line_len = self._line_len()
            if self.col > line_len or self.col < 0:
                self.col = line_len

    # ------------------------------------------------------------ 文本写入
    def _write_run(self, run, base_tags):
        """写入一段普通文本，其中的 \\n 与 \\t 需要特殊处理。"""
        for part in self._SPLIT_RE.split(run):
            if not part:
                continue
            if part == '\n':
                self._newline(base_tags)
            elif part == '\t':
                self._put(' ' * (8 - (self.col % 8)), base_tags)
            else:
                self._put(part, base_tags)

    def _resolve_pending_cr(self, base_tags, followed_by_nl):
        """
        把挂着的 CR 落地。延后处理是为了区分 \\r\\n 和裸 \\r：
          - 紧跟 \\n：CR 本身什么都不做，换行由那个 \\n 负责（等价于旧版
            replace('\\r\\n','\\n')），否则每行都会多出一个空行。
          - 退化模式（脚本盯索引）：真的插一个换行，等价于旧版 replace('\\r','\\n')。
          - 覆盖模式：窗口里不换行（后续文本原地覆盖），但给正则监控补一个换行，
            这样按行匹配的规则看到的还是一行一条。
        """
        kind = self._cr_pending
        if not kind:
            return
        self._cr_pending = None
        if followed_by_nl:
            return
        if kind == 'degrade':
            self._emit_newline(base_tags)
        else:
            self._monitor_parts.append('\n')

    def _newline(self, base_tags):
        """收到 \\n：先消化挂着的 CR，再换行。"""
        self._resolve_pending_cr(base_tags, followed_by_nl=True)
        self._emit_newline(base_tags)

    def _emit_newline(self, base_tags):
        """真正写入换行：始终追加到文本末尾，光标回到新行行首。"""
        self._raw_insert("end", '\n', base_tags)
        self.col = 0
        self._monitor_parts.append('\n')

    def _put(self, text, base_tags):
        """按当前列写入文本：在行尾则追加，在行内则覆盖。"""
        if not text:
            return
        # 有挂着的 CR 就先落地（可能会插入换行，所以必须在算 line_start 之前）
        self._resolve_pending_cr(base_tags, followed_by_nl=False)
        tags = base_tags if base_tags else self._current_tags()
        line_start = self.text.index("end-1c linestart")
        line_len = self._line_len(line_start)
        if self.col > line_len:
            # 光标被移到了行尾之外，用空格补齐
            pad = ' ' * (self.col - line_len)
            self._raw_insert("end", pad, ())
            self._monitor_parts.append(pad)
            line_len = self.col
        if self.col >= line_len:
            self._raw_insert("end", text, tags)
            self.col = line_len + len(text)
        else:
            start = f"{line_start}+{self.col}c"
            overwrite = min(len(text), line_len - self.col)
            self._delete(start, f"{line_start}+{self.col + overwrite}c")
            self._raw_insert(start, text, tags)
            self.col += len(text)
        self._monitor_parts.append(text)

    def _raw_insert(self, index, text, tags):
        if tags:
            self._insert(index, text, tags)
        else:
            self._insert(index, text)


class RegexMonitor:
    MAX_ROWS = 5000  # 最大行数，超过后删除前一半，避免内存无限增长

    def __init__(self, gui):
        self.gui = gui
        self.window = None
        self.rules = []
        self.match_buffer = ""
        self.global_offset = 0
        self.idle_timer_id = None
        self.IDLE_MS = 100
        self.BUFFER_LIMIT = 2048
        # 自动保存
        self._save_file = None
        self._save_stop = True
        # 正则规则文件路径缓存
        self._rules_filepath = ""
        # 监控开关
        self._monitoring = False
        # 增量刷新：记录已显示的行数
        self._last_displayed_row = 0

    def on_new_text(self, chars):
        if not self.rules or not self.window or not self._monitoring:
            return
        self.match_buffer += chars
        if self.idle_timer_id is not None:
            self.gui.root.after_cancel(self.idle_timer_id)
        if len(self.match_buffer) > self.BUFFER_LIMIT:
            self._do_match()
        else:
            self.idle_timer_id = self.gui.root.after(self.IDLE_MS, self._do_match)

    def _do_match(self):
        self.idle_timer_id = None
        if not self.match_buffer:
            return
        max_lines = max((r["lines"] for r in self.rules), default=1)
        lines = self.match_buffer.split('\n')
        if self.match_buffer.endswith('\n'):
            complete_lines = lines[:-1]
            leftover = ""
        else:
            complete_lines = lines[:-1]
            leftover = lines[-1]
        if not complete_lines:
            return

        # 收集所有规则的匹配结果，按行号分组，最后统一写入避免中间状态干扰对齐
        # pending: {row_key: {rule_index: (g_start, g_end, text)}}
        # 用 (block_start_in_buffer, m.start()) 作为行标识不合适，直接按源行号i分组
        # 但同一行可能有多个匹配，所以用列表收集每个规则的匹配
        all_matches = [[] for _ in self.rules]  # all_matches[rule_idx] = [(g_start,g_end,text), ...]

        for rule_idx, rule in enumerate(self.rules):
            n = rule["lines"]
            compiled = rule["compiled"]
            if compiled is None:
                continue
            for i in range(len(complete_lines)):
                window_lines = complete_lines[i:i + n]
                if len(window_lines) < n:
                    break
                text_block = '\n'.join(window_lines)
                block_start_in_buffer = sum(len(complete_lines[j]) + 1 for j in range(i))
                for m in compiled.finditer(text_block):
                    g_start = self.global_offset + block_start_in_buffer + m.start()
                    g_end = self.global_offset + block_start_in_buffer + m.end()
                    all_matches[rule_idx].append((g_start, g_end, m.group(1) if m.lastindex else m.group()))

        # 统一写入：按源文本行分组，组内按列号排序，确保同一行数据的各列按列序填充
        # 为每条匹配确定它属于哪一行源文本（用 complete_lines 的 block_start 判断）
        # 计算每行源文本的起始偏移
        line_starts = []
        offset = self.global_offset
        for cl in complete_lines:
            line_starts.append(offset)
            offset += len(cl) + 1

        def get_source_line(g_start):
            """确定 g_start 属于哪一行源文本"""
            for idx in range(len(line_starts) - 1, -1, -1):
                if g_start >= line_starts[idx]:
                    return idx
            return 0

        # 收集所有匹配并附带列号和源行号
        all_sorted = []
        for rule_idx in range(len(self.rules)):
            for g_start, g_end, text in all_matches[rule_idx]:
                src_line = get_source_line(g_start)
                all_sorted.append((src_line, rule_idx, g_start, g_end, text))
        # 按源行号排序，同行内按列号排序
        all_sorted.sort(key=lambda x: (x[0], x[1]))

        has_new = False
        for src_line, rule_idx, g_start, g_end, text in all_sorted:
            if self._add_result_with_alignment(rule_idx, g_start, g_end, text):
                has_new = True

        # 批量写入完成后刷新显示
        if has_new:
            self._refresh_all_columns()

        overlap_count = max(max_lines - 1, 0)
        if overlap_count > 0 and len(complete_lines) > overlap_count:
            consumed_lines = complete_lines[:-overlap_count]
            kept_lines = complete_lines[-overlap_count:]
        elif overlap_count == 0:
            consumed_lines = complete_lines
            kept_lines = []
        else:
            consumed_lines = []
            kept_lines = complete_lines

        consumed_chars = sum(len(l) + 1 for l in consumed_lines)
        self.global_offset += consumed_chars
        remaining = '\n'.join(kept_lines)
        if kept_lines:
            remaining += '\n'
        self.match_buffer = remaining + leftover

    def _add_result_with_alignment(self, rule_idx, g_start, g_end, text):
        """
        按对齐规则写入一条匹配结果。
        核心逻辑：
        1. 如果本列末尾有空占位行，回填到最早的那个空占位行
        2. 否则直接追加到本列末尾（下一行）
        左侧列写入时会给右侧列补空行（通过对齐逻辑），右侧列到达时回填这些空行。
        返回 True 表示成功写入，False 表示被去重跳过。
        """
        rule = self.rules[rule_idx]
        results = rule["results"]
        # 去重：新匹配被已有结果完全包含则跳过
        for rs, re_, rt in results:
            if rs <= g_start and g_end <= re_:
                return False
        # 去重：新匹配完全包含某些旧结果则删除旧结果
        results[:] = [(rs, re_, rt) for rs, re_, rt in results if not (g_start <= rs and re_ <= g_end)]

        # 策略1：回填 —— 从末尾往前找最早的连续空占位行，填入第一个
        backfill_idx = len(results)
        while backfill_idx > 0 and results[backfill_idx - 1] == (0, 0, ""):
            backfill_idx -= 1
        if backfill_idx < len(results):
            # 有空行可以回填
            results[backfill_idx] = (g_start, g_end, text)
            self._check_max_rows()
            self._autosave_new_rows()
            return True

        # 策略2：无空行可回填，直接追加
        # 如果本列是"先导列"（右侧列在当前最大行已有真实数据），需要给右侧列补空行
        global_max = max((len(self.rules[i]["results"]) for i in range(len(self.rules))), default=0)
        target_row = len(results) + 1  # 默认：直接追加到本列下一行

        # 但如果左侧列已经比本列高，且本列是先导列（写入后需要给右侧留位置），
        # 则需要对齐到全局最大行+1
        # 判断条件：本列左侧有列，且左侧列比本列高
        if rule_idx > 0:
            left_max = max((len(self.rules[i]["results"]) for i in range(rule_idx)), default=0)
            # 如果左侧列比本列还高，那本列直接追加即可（不跳行）
            # 如果本列和左侧列齐平，且右侧列在本行已有数据，才需要新起一行
            if len(results) >= left_max:
                # 本列已经和左侧齐平，检查右侧是否在当前行已有数据
                right_has_data = False
                for i in range(rule_idx + 1, len(self.rules)):
                    r = self.rules[i]["results"]
                    if len(r) > len(results) and len(r) > 0:
                        # 右侧列比本列高且有数据
                        last_entry = r[len(results)] if len(results) < len(r) else None
                        if last_entry and last_entry != (0, 0, ""):
                            right_has_data = True
                            break
                if right_has_data:
                    target_row = len(results) + 1  # 新起一行（给右侧留空）
        
        # 对于最左列（rule_idx=0），写入后需要给右侧列补空行
        # 补空行到 target_row - 1（通常不需要，因为 target_row = len+1）
        while len(results) < target_row - 1:
            results.append((0, 0, ""))
        results.append((g_start, g_end, text))

        # 关键：左侧列写入后，给右侧列补空行到相同高度，以便右侧后续回填
        current_len = len(results)
        for i in range(rule_idx + 1, len(self.rules)):
            r = self.rules[i]["results"]
            while len(r) < current_len:
                r.append((0, 0, ""))

        self._check_max_rows()
        self._autosave_new_rows()
        return True

    def _add_result_aligned(self, rule, g_start, g_end, text):
        """向后兼容：供 _test_all 等旧调用使用"""
        rule_idx = self.rules.index(rule) if rule in self.rules else 0
        self._add_result_with_alignment(rule_idx, g_start, g_end, text)

    def _check_max_rows(self):
        max_row = max((len(r["results"]) for r in self.rules), default=0)
        if max_row > self.MAX_ROWS:
            keep_from = max_row // 2
            for rule in self.rules:
                deleted = keep_from
                rule["results"] = rule["results"][keep_from:]
                rule["saved_count"] = max(0, rule.get("saved_count", 0) - deleted)
            # 截断后需要全量重绘
            self._last_displayed_row = 0
            self._refresh_all_columns()

    def _autosave_new_rows(self):
        if self._save_stop or self._save_file is None:
            return
        max_row = max((len(r["results"]) for r in self.rules), default=0)
        # 找到所有列已保存的最小行数（即从哪行开始有新数据）
        min_saved = min((r.get("saved_count", 0) for r in self.rules), default=0)
        if min_saved >= max_row:
            return
        col_width = 30
        seq_width = 5
        try:
            for row in range(min_saved, max_row):
                line = str(row + 1).ljust(seq_width)
                for rule in self.rules:
                    if row < len(rule["results"]):
                        cell = rule["results"][row][2].replace('\n', ' ')
                    else:
                        cell = ""
                    line += cell.ljust(col_width)
                self._save_file.write(line.rstrip() + '\n')
            self._save_file.flush()
            # 检查文件大小
            try:
                max_mb = float(self._save_max_mb_entry.get().strip())
            except Exception:
                max_mb = 10
            if self._save_file.tell() >= max_mb * 1024 * 1024:
                self._save_file.close()
                self._create_save_file()
            # 更新saved_count
            for rule in self.rules:
                rule["saved_count"] = max_row
        except Exception as e:
            print("RegexMonitor autosave error:", e)

    def _refresh_all_columns(self):
        if not self.window or not self.window.winfo_exists():
            return
        if not hasattr(self, '_result_text') or not self._result_text.winfo_exists():
            return
        seq_width = 5
        # 每列宽度动态计算：取列头和所有内容中最长的，加2作为间距，最小10
        col_widths = []
        max_rows = max((len(r["results"]) for r in self.rules), default=0)
        for rule in self.rules:
            w = len(rule["pattern_str"])
            for row in range(max_rows):
                if row < len(rule["results"]):
                    cell = rule["results"][row][2].replace('\n', ' ')
                    w = max(w, len(cell))
            col_widths.append(max(10, w + 2))
        self._result_text.delete("1.0", tk.END)
        header = "No.".ljust(seq_width)
        for i, rule in enumerate(self.rules):
            header += rule["pattern_str"][:col_widths[i]].ljust(col_widths[i])
        self._result_text.insert(tk.END, header.rstrip() + '\n')
        for row in range(max_rows):
            line = str(row + 1).ljust(seq_width)
            for i, rule in enumerate(self.rules):
                if row < len(rule["results"]):
                    cell = rule["results"][row][2].replace('\n', ' ')
                else:
                    cell = ""
                line += cell.ljust(col_widths[i])
            self._result_text.insert(tk.END, line.rstrip() + '\n')
        self._result_text.see(tk.END)
        # 记录已显示的行数，供增量刷新使用
        self._last_displayed_row = max_rows

    def _refresh_incremental(self):
        """增量刷新：只追加 _last_displayed_row 之后的新行，避免全量重绘"""
        if not self.window or not self.window.winfo_exists():
            return
        if not hasattr(self, '_result_text') or not self._result_text.winfo_exists():
            return
        max_rows = max((len(r["results"]) for r in self.rules), default=0)
        start = getattr(self, '_last_displayed_row', 0)
        if start >= max_rows:
            return
        seq_width = 5
        # 计算各列宽度（与全量刷新一致）
        col_widths = []
        for rule in self.rules:
            w = len(rule["pattern_str"])
            for row in range(max_rows):
                if row < len(rule["results"]):
                    cell = rule["results"][row][2].replace('\n', ' ')
                    w = max(w, len(cell))
            col_widths.append(max(10, w + 2))
        # 只追加新行
        for row in range(start, max_rows):
            line = str(row + 1).ljust(seq_width)
            for i, rule in enumerate(self.rules):
                if row < len(rule["results"]):
                    cell = rule["results"][row][2].replace('\n', ' ')
                else:
                    cell = ""
                line += cell.ljust(col_widths[i])
            self._result_text.insert(tk.END, line.rstrip() + '\n')
        self._result_text.see(tk.END)
        self._last_displayed_row = max_rows

    def _get_cursor_col(self):
        if not self.rules:
            return 0
        col_width = 30
        seq_width = 5
        idx = self._result_text.index(tk.INSERT)
        col_char = int(idx.split('.')[1])
        if col_char < seq_width:
            return 0
        return min((col_char - seq_width) // col_width, len(self.rules) - 1)

    def _refresh_header(self):
        pass

    def _close_window(self):
        # 情况1：自动保存正在运行，弹窗询问
        if not self._save_stop:
            dialog = tk.Toplevel(self.window)
            dialog.title(tr("regex.autosave_running_title", "Auto Save Running"))
            dialog.geometry("300x110")
            dialog.resizable(False, False)
            dialog.grab_set()
            dialog.update_idletasks()
            x = (dialog.winfo_screenwidth() - dialog.winfo_width()) // 2
            y = (dialog.winfo_screenheight() - dialog.winfo_height()) // 2
            dialog.geometry(f"+{x}+{y}")
            tk.Label(dialog, text=tr("regex.autosave_running_msg", "Auto save is running. Please choose:"), justify="center").pack(pady=(15, 5))
            btn_frame = tk.Frame(dialog)
            btn_frame.pack(pady=5)
            result = [None]
            def do_stop():
                result[0] = "stop"
                dialog.destroy()
            def do_keep():
                result[0] = "keep"
                dialog.destroy()
            tk.Button(btn_frame, text=tr("regex.stop_and_close", "Stop & Close"), command=do_stop, width=14).pack(side="left", padx=5)
            tk.Button(btn_frame, text=tr("regex.keep_running", "Keep Running"), command=do_keep, width=14).pack(side="left", padx=5)
            dialog.wait_window()
            if result[0] != "stop":
                return
            self._stop_autosave()
            self.rules = []
            self.match_buffer = ""
            self.global_offset = 0
        # 情况2：无自动保存但有规则，直接清空规则并停止
        elif self.rules:
            self.rules = []
            self.match_buffer = ""
            self.global_offset = 0
        self.gui.save_setup()
        if self.window and self.window.winfo_exists():
            self.window.destroy()
        self.window = None

    def toggle_window(self):
        if self.window and self.window.winfo_exists():
            self._close_window()
            return
        self.window = tk.Toplevel(self.gui.root)
        self.window.title(tr("regex.window_title", "Regex Match Monitor"))
        self.window.geometry("910x560")
        self.window.protocol("WM_DELETE_WINDOW", self._close_window)

        ctrl = tk.Frame(self.window)
        ctrl.pack(fill="x", padx=5, pady=5)
        tk.Label(ctrl, text=tr("regex.regex_label", "Regex:")).pack(side="left")
        self._regex_entry = tk.Entry(ctrl, width=25)
        self._regex_entry.pack(side="left", padx=2)
        self._regex_entry.bind("<Return>", lambda e: self._add_rule())
        tk.Label(ctrl, text=tr("regex.window_lines", "Match lines:")).pack(side="left")
        self._lines_entry = tk.Entry(ctrl, width=3)
        self._lines_entry.insert(0, "1")
        self._lines_entry.pack(side="left", padx=2)
        tk.Button(ctrl, text=tr("regex.add", "Add⏎"), width=8, command=self._add_rule).pack(side="left", padx=5)
        tk.Button(ctrl, text=tr("regex.test", "Test"), width=8, command=self._test_all).pack(side="left", padx=5)
        self._monitor_btn = tk.Button(ctrl, text=tr("regex.start_monitor", "Start"), width=8, bg="gray",
                                      command=self._toggle_monitoring)
        self._monitor_btn.pack(side="left", padx=5)

        ctrl2 = tk.Frame(self.window)
        ctrl2.pack(fill="x", padx=5, pady=(0, 2))
        tk.Button(ctrl2, text="<", command=self._swap_col_left).pack(side="left", padx=2)
        tk.Button(ctrl2, text=">", command=self._swap_col_right).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("regex.clear_col", "Clear Column"), command=self._clear_col_results).pack(side="left", padx=8)
        tk.Button(ctrl2, text=tr("regex.clear_all", "Clear All"), command=self._clear_all_results).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("regex.delete_col_rule", "Delete Column Regex"), command=self._delete_col_rule).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("regex.delete_all_rules", "Delete All Regex"), command=self._delete_all_rules).pack(side="left", padx=2)
        tk.Label(ctrl2, text=tr("regex.rules_label", "Regex:")).pack(side="left", padx=(16, 2))
        tk.Button(ctrl2, text=tr("common.load", "Load"), command=self._load_rules_file).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("common.save", "Save"), command=self._save_rules_file).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("regex.save_as", "Save As"), command=self._saveas_rules_file).pack(side="left", padx=2)
        tk.Label(ctrl2, text="").pack(side="left", padx=(16, 0))
        tk.Label(ctrl2, text=tr("regex.results_label", "Results:")).pack(side="left", padx=(0, 2))
        tk.Button(ctrl2, text=tr("regex.copy_to_clipboard", "Copy to Clipboard"), command=self._copy_result_to_clipboard).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("regex.save_to_file", "Save to File"), command=self._save_result_to_file).pack(side="left", padx=2)
        tk.Button(ctrl2, text=tr("regex.open_in_excel", "Open in Excel"), command=self._open_result_in_excel).pack(side="left", padx=2)

        # 文本框 + 滚动条
        txt_frame = tk.Frame(self.window)
        txt_frame.pack(fill="both", expand=True, padx=5, pady=(5, 0))
        xscroll = tk.Scrollbar(txt_frame, orient="horizontal")
        xscroll.pack(side="bottom", fill="x")
        yscroll = tk.Scrollbar(txt_frame, orient="vertical")
        yscroll.pack(side="right", fill="y")
        self._result_text = tk.Text(
            txt_frame, wrap=tk.NONE, font=("Courier New", 9),
            xscrollcommand=xscroll.set, yscrollcommand=yscroll.set,
            insertbackground="black", insertwidth=2)
        self._result_text.pack(side="left", fill="both", expand=True)
        xscroll.config(command=self._result_text.xview)
        yscroll.config(command=self._result_text.yview)

        # 底部自动保存控件行
        save_frame = tk.Frame(self.window)
        save_frame.pack(fill="x", padx=5, pady=(2, 5))
        tk.Label(save_frame, text=tr("regex.autosave", "Auto Save")).pack(side="left")
        self._save_btn = tk.Button(save_frame, text="OFF", width=4, bg="gray",
                                   command=self._toggle_autosave)
        self._save_btn.pack(side="left", padx=2)
        tk.Label(save_frame, text=tr("regex.path", "Path")).pack(side="left", padx=(8, 2))
        self._save_path_entry = tk.Entry(save_frame, width=20, justify="right")
        self._save_path_entry.pack(side="left", padx=2)
        tk.Button(save_frame, text="...", command=self._choose_save_path).pack(side="left", padx=2)
        tk.Label(save_frame, text=tr("regex.filename", "File name")).pack(side="left", padx=(8, 2))
        self._save_name_entry = tk.Entry(save_frame, width=15)
        self._save_name_entry.pack(side="left", padx=2)
        tk.Label(save_frame, text=tr("regex.max_size", "Max size")).pack(side="left", padx=(8, 2))
        self._save_max_mb_entry = tk.Entry(save_frame, width=5)
        self._save_max_mb_entry.insert(0, "10")
        self._save_max_mb_entry.pack(side="left", padx=2)
        tk.Label(save_frame, text="MB").pack(side="left")

        # 从ini恢复
        self._load_save_settings_from_ini()
        self._refresh_all_columns()

    def _load_save_settings_from_ini(self):
        # 优先从gui上已加载的init值恢复（load_setup已读取）
        p = getattr(self.gui, '_regex_save_path_init', '')
        n = getattr(self.gui, '_regex_save_filename_init', '')
        m = getattr(self.gui, '_regex_save_max_mb_init', '10')
        self._save_path_entry.delete(0, tk.END)
        self._save_path_entry.insert(0, p if p else os.path.dirname(os.path.abspath(__file__)))
        self._save_path_entry.xview_moveto(1.0)
        self._save_name_entry.delete(0, tk.END)
        self._save_name_entry.insert(0, n if n else 'AutoSaveRegexMatch')
        self._save_max_mb_entry.delete(0, tk.END)
        self._save_max_mb_entry.insert(0, m if m else '10')

    def _toggle_monitoring(self):
        self._monitoring = not self._monitoring
        if self._monitoring:
            self._monitor_btn.config(text=tr("regex.stop_monitor", "Stop"), bg="green")
        else:
            self._monitor_btn.config(text=tr("regex.start_monitor", "Start"), bg="gray")

    def _choose_save_path(self):
        from tkinter import filedialog
        path = filedialog.askdirectory(title=tr("regex.choose_save_path", "Select Save Folder"), parent=self.window)
        if path:
            self._save_path_entry.delete(0, tk.END)
            self._save_path_entry.insert(0, path)
            self._save_path_entry.xview_moveto(1.0)

    def _toggle_autosave(self):
        if self._save_stop:
            path = self._save_path_entry.get().strip()
            name = self._save_name_entry.get().strip()
            if not path or not os.path.isdir(path):
                messagebox.showwarning(tr("common.warning", "Warning"), tr("regex.invalid_save_path", "Please select a valid save folder"), parent=self.window)
                return
            if not name:
                messagebox.showwarning(tr("common.warning", "Warning"), tr("regex.enter_filename", "Please enter a file name"), parent=self.window)
                return
            if self._create_save_file():
                self._save_stop = False
                self._save_btn.config(text="ON", bg="green")
        else:
            self._stop_autosave()

    def _create_save_file(self):
        import time
        path = self._save_path_entry.get().strip()
        name = self._save_name_entry.get().strip()
        ts = time.strftime('%Y-%m-%d_%H-%M-%S')
        filename = "{}-{}.txt".format(name, ts)
        full_path = os.path.join(path, filename)
        try:
            self._save_file = open(full_path, 'w', encoding='utf-8')
            # 写标题行
            col_width = 30
            seq_width = 5
            header = "No.".ljust(seq_width)
            for rule in self.rules:
                header += rule["pattern_str"][:col_width].ljust(col_width)
            self._save_file.write(header.rstrip() + '\n')
            self._save_file.flush()
            for rule in self.rules:
                rule["saved_count"] = len(rule["results"])
            return True
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("regex.create_file_failed", "Cannot create file: {error}", error=e), parent=self.window)
            return False

    def _stop_autosave(self):
        self._save_stop = True
        if self._save_file:
            try:
                self._save_file.close()
            except Exception:
                pass
            self._save_file = None
        if hasattr(self, '_save_btn') and self._save_btn.winfo_exists():
            self._save_btn.config(text="OFF", bg="gray")

    def get_save_settings(self):
        """供save_setup调用，返回当前控件值"""
        if not self.window or not self.window.winfo_exists():
            # 窗口未打开时从init缓存读取
            p = getattr(self.gui, '_regex_save_path_init', '')
            n = getattr(self.gui, '_regex_save_filename_init', '')
            m = getattr(self.gui, '_regex_save_max_mb_init', '10')
            return str(p), str(n), str(m or '10')
        p = self._save_path_entry.get().strip()
        n = self._save_name_entry.get().strip()
        m = self._save_max_mb_entry.get().strip()
        # 同步更新缓存，避免窗口关闭后下次save_setup读到旧值
        self.gui._regex_save_path_init = p
        self.gui._regex_save_filename_init = n
        self.gui._regex_save_max_mb_init = m
        return p, n, m

    def _add_rule(self):
        if not self.window or not self.window.winfo_exists():
            return
        pattern_str = self._regex_entry.get().strip()
        if not pattern_str:
            return
        try:
            compiled = re.compile(pattern_str, re.DOTALL)
        except re.error as e:
            messagebox.showerror(tr("regex.regex_error", "Regex Error"), tr("regex.invalid_regex", "Invalid regular expression:\n{error}", error=e), parent=self.window)
            return
        try:
            lines = max(1, int(self._lines_entry.get().strip()))
        except ValueError:
            lines = 1
        rule = {"pattern_str": pattern_str, "lines": lines, "compiled": compiled,
                "results": [], "saved_count": 0}
        self.rules.append(rule)
        self._regex_entry.delete(0, tk.END)
        self._refresh_header()
        self._refresh_all_columns()

    def _clear_col_results(self):
        if not self.rules:
            return
        col = self._get_cursor_col()
        self.rules[col]["results"] = []
        self.rules[col]["saved_count"] = 0
        self._refresh_all_columns()

    def _clear_all_results(self):
        for rule in self.rules:
            rule["results"] = []
            rule["saved_count"] = 0
        self._refresh_all_columns()

    def _delete_col_rule(self):
        if not self.rules:
            return
        col = self._get_cursor_col()
        self.rules.pop(col)
        self._refresh_header()
        self._refresh_all_columns()

    def _delete_all_rules(self):
        self.rules = []
        self._refresh_header()
        self._refresh_all_columns()

    def _test_all(self):
        """用主窗口当前全部文本对所有正则做一次完整匹配，结果追加到现有结果末尾"""
        if not self.rules:
            return
        text = self.gui.text_area.get("1.0", tk.END)
        for rule_idx, rule in enumerate(self.rules):
            compiled = rule["compiled"]
            if compiled is None:
                continue
            lines = text.split('\n')
            n = rule["lines"]
            for i in range(len(lines)):
                window_lines = lines[i:i + n]
                if len(window_lines) < n:
                    break
                text_block = '\n'.join(window_lines)
                block_start = sum(len(lines[j]) + 1 for j in range(i))
                for m in compiled.finditer(text_block):
                    g_start = block_start + m.start()
                    g_end = block_start + m.end()
                    matched = m.group(1) if m.lastindex else m.group()
                    self._add_result_with_alignment(rule_idx, g_start, g_end, matched)
        self._refresh_all_columns()

    def _swap_col_left(self):
        if not self.rules:
            return
        col = self._get_cursor_col()
        if col == 0:
            return
        self.rules[col], self.rules[col - 1] = self.rules[col - 1], self.rules[col]
        self._refresh_all_columns()
        self._move_cursor_to_col(col - 1)

    def _swap_col_right(self):
        if not self.rules:
            return
        col = self._get_cursor_col()
        if col >= len(self.rules) - 1:
            return
        self.rules[col], self.rules[col + 1] = self.rules[col + 1], self.rules[col]
        self._refresh_all_columns()
        self._move_cursor_to_col(col + 1)

    def _move_cursor_to_col(self, col):
        seq_width = 5
        col_width = 30
        char_pos = seq_width + col * col_width
        total_lines = int(self._result_text.index(tk.END).split('.')[0])
        target_line = 2 if total_lines >= 2 else 1
        self._result_text.mark_set(tk.INSERT, "{}.{}".format(target_line, char_pos))
        self._result_text.see("{}.{}".format(target_line, char_pos))
        self._result_text.focus_set()

    def _load_rules_file(self):
        path = filedialog.askopenfilename(
            title=tr("regex.load_rules_title", "Load Regex Rules"),
            filetypes=(("Text Files", "*.txt"), ("All Files", "*.*")),
            parent=self.window
        )
        if not path:
            return
        try:
            with open(path, "r", encoding="utf-8") as f:
                lines = [l.rstrip("\n") for l in f.readlines()]
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("regex.read_file_failed", "Cannot read file: {error}", error=e), parent=self.window)
            return
        # 验证所有行都是合法正则
        for i, line in enumerate(lines):
            if not line.strip():
                continue
            try:
                re.compile(line.strip(), re.DOTALL)
            except re.error as e:
                messagebox.showerror(tr("regex.regex_error", "Regex Error"), tr("regex.invalid_line", "Line {line_no} is invalid: {line}\n{error}", line_no=i + 1, line=line.strip(), error=e), parent=self.window)
                return
        # 依次添加
        for line in lines:
            if not line.strip():
                continue
            self._regex_entry.delete(0, tk.END)
            self._regex_entry.insert(0, line.strip())
            self._add_rule()
        self._rules_filepath = path

    def _save_rules_file(self):
        if not self.rules:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("regex.no_rules", "No regex rules defined"), parent=self.window)
            return
        if not self._rules_filepath:
            self._saveas_rules_file()
            return
        try:
            with open(self._rules_filepath, "w", encoding="utf-8") as f:
                for rule in self.rules:
                    f.write(rule["pattern_str"] + "\n")
            messagebox.showinfo(tr("common.info", "Info"), tr("regex.saved_to", "Saved to: {path}", path=self._rules_filepath), parent=self.window)
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("regex.save_failed", "Save failed: {error}", error=e), parent=self.window)

    def _saveas_rules_file(self):
        if not self.rules:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("regex.no_rules", "No regex rules defined"), parent=self.window)
            return
        path = filedialog.asksaveasfilename(
            title=tr("regex.save_rules_as_title", "Save Regex Rules As"),
            defaultextension=".txt",
            filetypes=(("Text Files", "*.txt"), ("All Files", "*.*")),
            parent=self.window
        )
        if not path:
            return
        try:
            with open(path, "w", encoding="utf-8") as f:
                for rule in self.rules:
                    f.write(rule["pattern_str"] + "\n")
            self._rules_filepath = path
            messagebox.showinfo(tr("common.info", "Info"), tr("regex.saved_to", "Saved to: {path}", path=path), parent=self.window)
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("regex.save_failed", "Save failed: {error}", error=e), parent=self.window)


    def _copy_result_to_clipboard(self):
        if not self.window or not self.window.winfo_exists():
            return
        text = self._result_text.get("1.0", "end")
        self.window.clipboard_clear()
        self.window.clipboard_append(text)

    def _save_result_to_file(self):
        if not self.window or not self.window.winfo_exists():
            return
        path = filedialog.asksaveasfilename(
            title=tr("regex.save_to_file", "Save to File"),
            defaultextension=".xlsx",
            filetypes=(("Excel Files", "*.xlsx"), ("Text Files", "*.txt"), ("All Files", "*.*")),
            parent=self.window
        )
        if not path:
            return
        try:
            if path.lower().endswith(".xlsx"):
                self._save_result_as_xlsx(path)
            else:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(self._result_text.get("1.0", "end"))
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("regex.save_failed", "Save failed: {error}", error=e), parent=self.window)

    def _save_result_as_xlsx(self, path):
        import openpyxl
        seq_width = 5
        col_widths = []
        max_rows = max((len(r["results"]) for r in self.rules), default=0)
        for rule in self.rules:
            w = len(rule["pattern_str"])
            for row in range(max_rows):
                if row < len(rule["results"]):
                    cell = rule["results"][row][2].replace('\n', ' ')
                    w = max(w, len(cell))
            col_widths.append(max(10, w + 2))
        wb = openpyxl.Workbook()
        ws = wb.active
        text = self._result_text.get("1.0", "end")
        for line in text.splitlines():
            if not line.strip():
                continue
            row_data = [line[:seq_width].strip()]
            pos = seq_width
            for w in col_widths:
                row_data.append(line[pos:pos + w].strip())
                pos += w
            ws.append(row_data)
        wb.save(path)

    def _open_result_in_excel(self):
        if not self.window or not self.window.winfo_exists():
            return
        import tempfile
        text = self._result_text.get("1.0", "end")
        try:
            with tempfile.NamedTemporaryFile(mode="w", suffix=".csv", delete=False,
                                             encoding="utf-8-sig") as f:
                tmp_path = f.name
                for line in text.splitlines():
                    if line.strip():
                        f.write(",".join(col for col in line.split()) + "\n")
            import subprocess as sp
            sp.Popen(["cmd", "/c", "start", "", tmp_path], shell=False)
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("regex.open_excel_failed", "Failed to open Excel: {error}", error=e), parent=self.window)


class SerialGUI:

    # 显示方式下拉框：界面文字 <-> 渲染器模式 <-> ini 里保存的值
    # HEX显示 不是 AnsiTextRenderer 的模式，它只改串口接收内容的呈现方式，见 _on_display_mode_change
    HEX_RX_MODE = "hex"
    # 标签文字随语言变化（模块加载时已读入语言），ini 里保存的是模式值，与语言无关
    DISPLAY_MODE_LABELS = (
        tr("display.terminal", "Terminal"),
        tr("display.escape", "Show as text"),
        tr("display.raw", "Raw (boxes)"),
        tr("display.hex", "HEX"),
    )
    DISPLAY_MODE_BY_LABEL = {
        DISPLAY_MODE_LABELS[0]: AnsiTextRenderer.MODE_TERMINAL,
        DISPLAY_MODE_LABELS[1]: AnsiTextRenderer.MODE_ESCAPE,
        DISPLAY_MODE_LABELS[2]: AnsiTextRenderer.MODE_RAW,
        DISPLAY_MODE_LABELS[3]: HEX_RX_MODE,
    }
    DISPLAY_LABEL_BY_MODE = {v: k for k, v in DISPLAY_MODE_BY_LABEL.items()}
    DISPLAY_MODE_TIP = tr(
        "display.tip",
        "Some characters received in the main window are hidden control codes sent by the device.\n"
        "\n"
        "Terminal: control codes take effect - colors are applied and progress bars refresh in place.\n"
        "          The few that cannot be reproduced (clear screen, cursor up, ...) are shown as text like <Esc>[2J.\n"
        "\n"
        "Show as text: every control code is written out as text, e.g. <Esc>[1m, <CR>, <BEL>,\n"
        "          and no effect is applied. Use it to see exactly what the device sent.\n"
        "\n"
        "Raw (boxes): old behavior, control codes are inserted as-is and show up as boxes or disappear.\n"
        "\n"
        "HEX: every byte received from the serial port is shown as two hex digits separated by spaces,\n"
        "          e.g. A0 01 01 A2. No text decoding, useful for binary protocols such as relays and Modbus -\n"
        "          non-ASCII bytes are no longer turned into \"\ufffd\" and lost.\n"
        "          Only serial input is converted; timestamps, [HEX SEND] echo and script output are unchanged.\n"
        "          Switch to any other option to leave HEX display."
    )

    # 串口接收是否按十六进制显示（对应下拉框的“HEX显示”），供接收线程读取
    hex_rx_display = False

    # 按键文件是否有未保存的修改。做成属性：任何地方改它，窗口标题的 * 标记都会跟着更新
    @property
    def script_modified(self):
        return getattr(self, "_script_modified", False)

    @script_modified.setter
    def script_modified(self, value):
        self._script_modified = bool(value)
        self._refresh_title()
        # 自动同步：任何一次本地修改都安排一次保存（同步引擎自己改界面时不算）
        if value and getattr(self, "_sync_enabled", False) and not getattr(self, "_sync_applying", False):
            self._sync_local_rev += 1
            self._sync_schedule()

    def _refresh_title(self):
        """主窗口标题 = 窗口名。（未保存标记 * 只显示在按键编辑窗口的标题上，见 _update_edit_title）"""
        var = getattr(self, "window_name_var", None)
        if var is None:
            return
        try:
            self.root.title(var.get())
        except tk.TclError:
            pass

    def _update_edit_title(self, cell_id):
        """按键编辑窗口的标题 = 按键名；窗口里的内容改了还没 Save 时在后面加 " *"。"""
        info = getattr(self, "cell_edit_info", {}).get(cell_id)
        if not info:
            return
        try:
            if not info["win"].winfo_exists():
                return
            current = (info["entry"].get(), info["text"].get("1.0", tk.END).strip())
            name = info["base"][0] or tr("keys.untitled", "Untitled")
            info["win"].title(name + (" *" if current != info["base"] else ""))
        except tk.TclError:
            pass

    def __init__(self, root, center=True):
        self.root = root
        self.root.report_callback_exception = self.report_callback_exception

        self.auto_save_file = None
        self.last_saved_index = "1.0"  # 记录 autosave 时最后保存的位置
        self.auto_save_stop = True   # 控制 autosave 线程停止的标志
        self.root = root
        self.last_send_index = None
        self.wait_for_initial_index  = None
        self.auto_delete_lock_count = 0

        # 初始化 PyVISA ResourceManager，psu 初始为 None
        self.rm  = pyvisa.ResourceManager()
        self.psu = None

        # 字体设置
        default_font = tkFont.nametofont("TkDefaultFont")
        default_font.configure(family=ui_font_family(), size=9)

        # 窗口标题
        self.root.title("TermPlus")     
        # 窗口启动时尺寸
        window_width = 910
        window_height = 790
        # 窗口最小尺寸
        root.minsize(910,700)
        # 窗口关闭时的回调
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        # 新增：用于记录多行循环发送文本对应的文件路径
        self.multi_loop_txt_filepath = None

        if center:
            screen_width = self.root.winfo_screenwidth()
            screen_height = self.root.winfo_screenheight()
            position_x = (screen_width - window_width) // 2
            position_y = (screen_height - window_height) // 2
        else:
            # 默认不居中时，可以使用传入的新位置，比如偏移100,100
            position_x, position_y = 100, 100
        self.root.geometry(f"{window_width}x{window_height}+{position_x}+{position_y}")

        # 设置ttk控件的style，用以修改其配色
        self.style = ttk.Style()
        self.style.theme_use('default')  # 使用支持自定义样式的主题
        self.style.configure(".", font=default_font)    # 默认 ttk 控件都用 ui_font
        self.style.configure("TEntry", font=default_font)
        self.style.configure('Custom.TCheckbutton',
                background="#F0F0F0",
                foreground='black')
        self.style.map('Custom.TCheckbutton',
                  background=[('active', "#F0F0F0")],
                  foreground=[('active', 'black')])

        # 设置未选中状态下的浅色 Tab 样式
        self.style.configure(
            'TNotebook.Tab',
            background='#F0F0F0',         # 未选中时的背景浅灰色 :contentReference[oaicite:1]{index=1}
            foreground='black'            # 未选中时的文字黑色
        )

        # 3. 设置选中状态下的映射（selected: 选中, active: 鼠标悬停）
        self.style.map(
            'TNotebook.Tab',
            background=[
                ('selected', '#FFFFFF'),  # 选中时白色背景 :contentReference[oaicite:2]{index=2}
                ('active',   '#D3D3D3')   # 悬停时浅灰背景 :contentReference[oaicite:3]{index=3}
            ],
            foreground=[
                ('selected', 'black')      # 选中时文字保持黑色 :contentReference[oaicite:4]{index=4}
            ]
        )

        # 创建菜单栏
        self.menu_bar = tk.Menu(self.root)
        self.root.config(menu=self.menu_bar)
        # New 菜单
        self.new_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label=tr("main.menu_new", "New"), menu=self.new_menu)
        self.new_menu.add_command(label=tr("main.menu_new_window", "New Window"), command=self.new_port)
        self.new_menu.add_separator()
        self.new_menu.add_command(label=tr("main.menu_exit", "Exit"), command=self.root.destroy)
        # # Scripts Git Menu
        # self.scripts_git_menu = tk.Menu(self.menu_bar, tearoff=0)
        # self.menu_bar.add_cascade(label="脚本同步", menu=self.scripts_git_menu)
        # self.scripts_git_menu.add_command(label="脚本同步", command=self.show_scripts_git_setup_window)

        # Language 菜单：始终用英文显示，选错语言时也能找回来
        self.language_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="Language", menu=self.language_menu)
        self.language_menu.add_command(label="Choose Language", command=self.show_language_window)

        # About 菜单
        self.about_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label=tr("main.menu_about", "About"), menu=self.about_menu)
        self.about_menu.add_command(label="Developed by Xian.Wu", state="disabled")
        self.about_menu.add_command(label="dakongwuxian@gmail.com", state="disabled")

        def get_version():
            # 尝试从环境变量中读取打包时注入的日期
            build_version = os.environ.get("TERMPLUS_BUILD_VERSION")
            
            if build_version:
                # 如果是运行打包后的 exe，能直接拿到这个固定的打包日期
                return build_version
            else:
                # 如果你是在 VS Code 里直接跑源码开发，拿不到环境变量，就显示当前日期加上 (Dev) 标识
                return f"Version {datetime.now().strftime('%y%m%d')} (Dev)"
            
        self.about_menu.add_command(label=get_version(), state="disabled")

        self.about_menu.add_command(label="Buy me a coffee ☕",command=self.show_about_window,state="normal")
        
        # 用于单元格右键菜单的剪贴板（复制功能），存储元组 (text, custom_data)
        self.cell_clipboard = ("", "")
        self.current_cell = None
        # 用于跟踪每个按钮对应的编辑窗口 {cell_id: edit_window}
        self.cell_edit_windows = {}
        # 按键拖动交换 / tab 拖动排序的状态（None 表示没有在拖动）
        self._drag = None
        # 拖动结束后吞掉这一次松手可能触发的按键发送
        self._suppress_cell_click = False
        # 按键区的撤销记录（交换、清空、粘贴、删除标签页），Ctrl+Z 撤销
        self._key_undo = []
        # 按键编辑窗口的控件，自动同步时用来刷新内容 {id(cell): {...}}
        self.cell_edit_info = {}
        # ---- 按键文件自动同步的状态 ----
        self._sync_enabled = False
        self._sync_worker = None
        self._sync_last_fp = None          # ts 文件上次看到的 (修改时间, 大小)
        self._sync_base_tabs = []          # 基准：上次加载/保存/同步时 ts 文件的内容
        self._sync_base_canon = None
        self._sync_busy = False            # 正在合并 / 等待写入结果
        self._sync_again = False           # 忙的时候又有本地修改，结束后再同步一次
        self._sync_deferred = None         # 忙的时候收到的 ts 变化，结束后再处理
        self._sync_after_id = None
        self._sync_applying = False        # 同步引擎正在改界面，不算本地修改
        self._sync_local_rev = 0
        self._sync_job_rev = 0
        self._sync_write_frames = []
        self._sync_manual = False          # 本次同步由“保存”按钮触发，完成后弹提示
        self._sync_offline_since = None
        self._sync_offline_timer = None
        self.cell_send_all_stop = False

        # 在 __init__ 方法中，对根窗口进行 grid 配置
        self.root.rowconfigure(0, weight=1)
        self.root.columnconfigure(0, weight=1)

        # 使用 grid 布局创建 main_frame，并让它随窗口扩展
        self.main_frame = tk.Frame(self.root)
        self.main_frame.grid(row=0, column=0, sticky="nsew", padx=10, pady=(5,10))
                
        # 设置 main_frame 内部的行和列
        self.main_frame.grid_rowconfigure(0, weight=0)  # row_0_frame
        self.main_frame.grid_rowconfigure(1, weight=1)  # 文本区域,固定高度
        self.main_frame.grid_rowconfigure(2, weight=0) 
        self.main_frame.grid_rowconfigure(3, weight=0)
        self.main_frame.grid_rowconfigure(4, weight=0)
        self.main_frame.grid_rowconfigure(5, weight=0)
        self.main_frame.grid_rowconfigure(6, weight=0)
        self.main_frame.grid_rowconfigure(7, weight=0)
        self.main_frame.grid_rowconfigure(8, weight=0)
        self.main_frame.grid_rowconfigure(9, weight=0)
        self.main_frame.grid_columnconfigure(0, weight=1)           # 第一列扩展
        self.main_frame.grid_columnconfigure(1, weight=0)

        # row 0 area show/hide buttons
        self.row_0_frame = tk.Frame(self.main_frame)
        self.row_0_frame.grid(row=0, column=0, sticky="NW", padx=0)
        self.show_keys_btn = tk.Button(self.row_0_frame, text=tr("main.btn_keys", "Keys"), command=self.toggle_key_area)
        self.show_keys_btn.pack(side="left", padx=(10,4))
        self.show_script_btn = tk.Button(self.row_0_frame, text=tr("main.btn_script", "Script"), command=self.toggle_script_area)
        self.show_script_btn.pack(side="left", padx=4)
        self.toggle_sidebar_btn = tk.Button(self.row_0_frame, text=tr("main.btn_config", "Config"), command=self.toggle_sidebar)
        self.toggle_sidebar_btn.pack(side="left", padx=4)

        # 黑白主题切换
        self.theme_btn = tk.Button(self.row_0_frame, text=tr("main.btn_theme", "Theme"), command=self.toggle_theme)
        self.theme_btn.pack(side="left", padx=4)

        # 正则匹配按钮
        self.regex_monitor_btn = tk.Button(self.row_0_frame, text=tr("main.btn_regex", "Regex"), command=self.toggle_regex_monitor)
        self.regex_monitor_btn.pack(side="left", padx=4)

        # row 1 text_area
        #self.text_area = scrolledtext.ScrolledText(self.main_frame, wrap=tk.WORD)
        self.text_area = scrolledtext.ScrolledText(
            self.main_frame,
            wrap=tk.WORD,
            undo=True,              # 启用撤销栈
            autoseparators=False,   # 关闭自动分隔
            maxundo=20              # 限制undo栈避免长时间运行内存增长，勿改为-1
        )
        # 添加右键菜单
        self.text_popup_menu = tk.Menu(self.text_area, tearoff=0)
        self.text_popup_menu.add_command(label=tr("main.cut", "Cut"), command=lambda: self.text_area.event_generate("<<Cut>>"))
        self.text_popup_menu.add_command(label=tr("main.copy", "Copy"), command=lambda: self.text_area.event_generate("<<Copy>>"))
        self.text_popup_menu.add_command(label=tr("main.paste", "Paste"), command=lambda: self.text_area.event_generate("<<Paste>>"))
        self.text_popup_menu.add_command(label=tr("main.delete", "Delete"), command=self._delete_selection)
        self.text_popup_menu.add_separator()
        self.text_popup_menu.add_command(label=tr("main.select_all", "Select All"), command=lambda: self.text_area.event_generate("<<SelectAll>>"))

        self.text_area.bind("<Button-3>", self._show_text_popup)  # Windows右键
        self.text_area.bind("<Control-a>", lambda e: self.text_area.event_generate("<<SelectAll>>"))  # Ctrl+A 全选
        self.text_area.bind("<<Copy>>", self._on_text_area_copy)  # 复制时处理控制字符

        # 2. 用 <KeyRelease> + after_idle 来插入分隔符：
        def _text_area_keyrelease(event):
            # 只对可见字符和删除键插入分隔符
            if event.char or event.keysym in ("BackSpace", "Delete"):
                # 延迟到空闲时，确保文本已实际更新后再插入分隔
                self.text_area.after_idle(self.text_area.edit_separator)

        self.text_area.bind("<KeyRelease>", _text_area_keyrelease)

        # 3. 保持 Ctrl+Z / Ctrl+Y 的撤销／重做绑定：
        def _text_area_undo(event):
            self.text_area.edit_undo()
            return "break"   # 阻止默认 Ctrl+Z 删除行为 :contentReference[oaicite:2]{index=2}

        def _text_area_redo(event):
            self.text_area.edit_redo()
            return "break"

        self.text_area.bind("<Control-z>", _text_area_undo)
        self.text_area.bind("<Control-y>", _text_area_redo)

        self.text_area.grid(row=1, column=0, columnspan=1, padx=10, pady=5, sticky="nsew") 
        
        # 配置字体颜色的tag，设置前景色为对应色
        self.text_area.tag_config("red", foreground="red")
        self.text_area.tag_config("blue", foreground="blue")
        self.text_area.tag_config("green", foreground="green")

        # 主窗口改用等宽字体：\r 覆盖、制表位对齐、表格类输出才能对得整齐
        self.mono_font_family = self._pick_mono_font()
        self.mono_font_size = 10
        self.text_area.configure(font=(self.mono_font_family, self.mono_font_size))

        # 控制字符渲染器（终端效果 / 显示为文字 / 原样）
        self.ansi_renderer = AnsiTextRenderer(self, self.text_area)
        self.ansi_renderer.set_font(self.mono_font_family, self.mono_font_size)

        # 在接受文本框中输入内容的处理
        self.text_area.bind("<Key>", self.on_key_press)

        # --- 为 Alt 组合键单独绑定事件 ---
        # 注意：这里的 <Alt-c> 会在 Alt 和 c 同时按下时触发
        self.text_area.bind("<Alt-c>", self.on_alt_c_press)
        self.text_area.bind("<Alt-d>", self.on_alt_d_press)
        self.text_area.bind("<Alt-z>", self.on_alt_z_press)
        self.text_area.bind("<Alt-l>", self.on_alt_l_press)
        self.text_area.bind("<Alt-a>", self.on_alt_a_press)
        self.text_area.bind("<Alt-e>", self.on_alt_e_press)
        self.text_area.bind("<Alt-k>", self.on_alt_k_press)
        self.text_area.bind("<Alt-u>", self.on_alt_u_press)

        self.input_buffer = ""  # Buffer to store user input
        self.input_buffer_cursor = 0 # 光标，用于记录左右键的移动，以便删除合适的字符
        self.received_data = ''
        # 控制接收时间戳插入的变量
        self.last_data_time = None
        self.current_read_time = None
        self.allow_new_timestamp = True

        # 记录按下enter和点击发送按键后发送的字符串
        self.sent_commands = [] # 用于保存最后10个发送的命令
        self.sent_commands_number = -1   # 用于跟踪当前浏览的命令索引

        # Row 2：发送文本标签、发送文本框、发送按钮和发送新行复选框
        self.row_2_frame = tk.Frame(self.main_frame, width=730, height=32)
        self.row_2_frame.grid(row=2, column=0, sticky="nw", padx=10, pady=(10,0))
        # “发送文本:”
        self.label_send = tk.Label(self.row_2_frame, text=tr("main.send_text_label", "Send:"))
        self.label_send.place(relx=0, rely=0.5, anchor="w",x=0)
        
        # 发送文本框
        # 1. 历史撤销/重做栈
        self.send_undo_stack = []   # 每项：(text, cursor_index)
        self.send_redo_stack = []
        # 发送文本框
        self.send_entry = ttk.Combobox(self.row_2_frame, width=66)
        self.send_entry.place(relx=0, rely=0.5, anchor="w",x=70)
        self.send_entry.bind("<Return>", self.send_data_btn)

        # 2. 绑定文本变化：KeyRelease 时记录状态
        def _on_send_keyrelease(event):
            # 仅针对可见字符和删除键
            if event.char or event.keysym in ("BackSpace", "Delete"):
                # 记录当前内容和光标
                txt = self.send_entry.get()
                idx = self.send_entry.index(tk.INSERT)
                self.send_undo_stack.append((txt, idx))
                # 新输入清空重做栈
                self.send_redo_stack.clear()
        self.send_entry.bind("<KeyRelease>", _on_send_keyrelease)

        # 3. 撤销：Ctrl+Z
        def _on_send_undo(event):
            if not self.send_undo_stack:
                return "break"
            # 最新状态先推到 redo
            last = self.send_undo_stack.pop()
            cur_txt = self.send_entry.get()
            cur_idx = self.send_entry.index(tk.INSERT)
            self.send_redo_stack.append((cur_txt, cur_idx))
            # 取上一个状态
            if self.send_undo_stack:
                txt, idx = self.send_undo_stack[-1]
            else:
                txt, idx = "", 0
            # 恢复
            self.send_entry.set(txt)
            self.send_entry.icursor(idx)
            return "break"
        self.send_entry.bind("<Control-z>", _on_send_undo)

        # 4. 重做：Ctrl+Y
        def _on_send_redo(event):
            if not self.send_redo_stack:
                return "break"
            txt, idx = self.send_redo_stack.pop()
            # 当前状态推到 undo
            cur_txt = self.send_entry.get()
            cur_idx = self.send_entry.index(tk.INSERT)
            self.send_undo_stack.append((cur_txt, cur_idx))
            # 恢复 redo 状态
            self.send_entry.set(txt)
            self.send_entry.icursor(idx)
            return "break"
        self.send_entry.bind("<Control-y>", _on_send_redo)

        # 发送新行复选框
        self.send_newline_var = tk.BooleanVar(value=True)
        self.newline_checkbox = ttk.Checkbutton(self.row_2_frame, text=tr("main.send_newline", "Newline"), variable=self.send_newline_var, style='Custom.TCheckbutton')
        self.newline_checkbox.place(relx=0, rely=0.5, anchor="w",x=560)
        
        # 发送按钮
        self.send_btn = tk.Button(self.row_2_frame, text=tr("main.send", "Send"), command=self.send_data_btn, state=tk.DISABLED, width=10)
        self.send_btn.place(relx=0, rely=0.5, anchor="w",x=640)

        # Row 3：数据统计、循环间隔（s)标签、循环间隔输入框和循环发送按钮
        self.row_3_frame = tk.Frame(self.main_frame, width=730, height=32)
        self.row_3_frame.grid(row=3, column=0, sticky="nw", padx=0)

        #数据统计："发送: 0 B | 接收: 0 B"
        self.data_stats = tk.StringVar(value=tr("main.data_stats", "Sent: {sent} | Recv: {recv}", sent="000 B", recv="000 B"))
        self.stats_label = tk.Label(self.row_3_frame, textvariable=self.data_stats)
        self.stats_label.place(relx=0, rely=0.5, anchor="w",x=10)
        # 新增：显示日期的静态标签和动态标签
        self.date_label_title = tk.Label(self.row_3_frame, text=tr("main.date", "Date:"))
        self.date_label_title.place(relx=0, rely=0.5, anchor="w",x=170, y=0)
        self.date_label = tk.Label(self.row_3_frame, text="")
        self.date_label.place(relx=0, rely=0.5, anchor="w",x=210)

        # 新增：显示时间的静态标签和动态标签
        self.time_label_title = tk.Label(self.row_3_frame, text=tr("main.time", "Time:"))
        self.time_label_title.place(relx=0, rely=0.5, anchor="w",x=290)
        self.time_label = tk.Label(self.row_3_frame, text="")
        self.time_label.place(relx=0, rely=0.5, anchor="w",x=330)

        # 时间戳 check box
        self.timestamp_onoff = tk.BooleanVar(value=False)
        self.timestamp_check = ttk.Checkbutton(self.row_3_frame, text=tr("main.timestamp", "Timestamp"),
                                               variable=self.timestamp_onoff,
                                               style='Custom.TCheckbutton')
        self.timestamp_check.place(relx=0, rely=0.5, anchor="w", x=420)  

        self.update_time()  # 启动时间更新
        #循环间隔（s)标签
        self.loop_interval_label = tk.Label(self.row_3_frame, text=tr("main.loop_interval", "Interval (s):"))
        self.loop_interval_label.place(relx=0, rely=0.5, anchor="w",x=500)
        #循环间隔输入框
        self.loop_interval_entry = tk.Entry(self.row_3_frame, width=5)
        self.loop_interval_entry.place(relx=0, rely=0.5, anchor="w",x=600)
        self.loop_interval_entry.insert(0, "3")
        # 单行循环发送按钮
        self.single_loop_send_btn = tk.Button(self.row_3_frame, text=tr("main.single_loop", "Loop Send"), command=self.toggle_loop_send, state=tk.DISABLED, width=10)
        self.single_loop_send_btn.place(relx=0, rely=0.5, anchor="w",x=650)

        # Row 4:
        self.row_4_frame = tk.Frame(self.main_frame, width=730, height=32)
        self.row_4_frame.grid(row=4, column=0, sticky="nw", padx=10, pady=(0,10))

        # 自动清屏 check box
        self.auto_clear_onoff = tk.BooleanVar(value=True)
        self.auto_clear_check = ttk.Checkbutton(self.row_4_frame, text=tr("main.auto_clear", "Auto Clear"),variable=self.auto_clear_onoff, style='Custom.TCheckbutton')
        self.auto_clear_check.place(relx=0, rely=0.5, anchor="w",x=560)  

        # “清屏”按钮
        self.clear_screen_btn = tk.Button(self.row_4_frame, text=tr("main.clear", "Clear"), command=self.clear_text_area, width=10)
        self.clear_screen_btn.place(relx=0, rely=0.5, anchor="w",x=650-10)

        # 等待符号
        self.send_all_terminal_label = tk.Label(self.row_4_frame, text=tr("main.wait_symbol", "Prompt:"))
        self.send_all_terminal_label.place(relx=0, rely=0.5, anchor="w",x=0)
        # 等待符号选择框
        self.send_all_terminal_entry = tk.Entry(self.row_4_frame, width=5) # 如果直接让text等于某个字符串，会导致多个窗口时共享同一个text变量，会一起被手动修改
        self.send_all_terminal_entry.place(relx=0, rely=0.5, anchor="w",x=70)
        self.send_all_terminal_entry.insert(0,"#,$") # 在entry被创建后，插入内容，这个内容就不会导致多个窗口被同步修改
        # Terminal wait over time label and entry
        self.send_all_over_time_label = tk.Label(self.row_4_frame, text=tr("main.timeout", "Timeout (s):"))
        self.send_all_over_time_label.place(relx=0, rely=0.5, anchor="w",x=140)

        self.send_all_over_time_entry = tk.Entry(self.row_4_frame, width=5)
        self.send_all_over_time_entry.place(relx=0, rely=0.5, anchor="w",x=240)
        self.send_all_over_time_entry.insert(0, "5")

        # 显示方式下拉框：控制字符怎么显示
        self.display_mode_label = tk.Label(self.row_4_frame, text=tr("main.display_mode", "Display:"))
        self.display_mode_label.place(relx=0, rely=0.5, anchor="w", x=290)
        self.display_mode_combo = ttk.Combobox(self.row_4_frame, width=10, state="readonly",
                                               values=list(self.DISPLAY_MODE_LABELS))
        self.display_mode_combo.place(relx=0, rely=0.5, anchor="w", x=350)
        self.display_mode_combo.set(self.DISPLAY_MODE_LABELS[0])   # 默认“终端效果”
        self.display_mode_combo.bind("<<ComboboxSelected>>", self._on_display_mode_change)
        self._bind_tooltip(self.display_mode_combo, self.DISPLAY_MODE_TIP)
        self._bind_tooltip(self.display_mode_label, self.DISPLAY_MODE_TIP)

        # 自动滚动复选框
        self.auto_scroll_var = tk.BooleanVar(value=True)
        self.auto_scroll_check = ttk.Checkbutton(self.row_4_frame, text=tr("main.auto_scroll", "Auto Scroll"),
                                                  variable=self.auto_scroll_var,
                                                  style='Custom.TCheckbutton')
        self.auto_scroll_check.place(relx=0, rely=0.5, anchor="w", x=460)

        # row 5
        # 按键控制控件行
        self.row_5_frame = tk.Frame(self.main_frame, height=30)
        self.row_5_frame.grid(row=5, column=0, sticky="ew", padx=(10,20), pady=(0,5))

        # 使用 pack 布局，让下拉框自动填充剩余空间
        # 左侧固定控件
        self.script_path_label = tk.Label(self.row_5_frame, text=tr("main.key_file", "Key File"))
        self.script_path_label.pack(side="left")

        self.script_path_entry = tk.Entry(self.row_5_frame, width=25, justify="right")
        self.script_path_entry.pack(side="left", padx=(5,2))

        self.script_path_button = tk.Button(self.row_5_frame, text="…", command=self.choose_script_path)
        self.script_path_button.pack(side="left", padx=(0,5))

        # 右侧固定控件（从右往左 pack）
        self.history_paths = [""] * 5
        self.history_buttons = []
        self.history_strike = [False] * 5
        self.history_btn_frame = tk.Frame(self.row_5_frame)
        self.history_btn_frame.pack(side="right", padx=(2,0))
        for i in range(5):
            btn = tk.Button(self.history_btn_frame, text=str(i+1),
                            command=lambda idx=i: self._load_from_history(idx))
            btn.pack(side="left", padx=1)
            # 右键：Clear / Clear All，清掉不用的历史记录，按键变回窄的数字，腾出界面位置
            btn.bind("<Button-3>", lambda event, idx=i: self._show_history_menu(event, idx))
            self.history_buttons.append(btn)

        self.history_label = tk.Label(self.row_5_frame, text=tr("main.history", "History..."))
        self.history_label.pack(side="right", padx=(5,2))

        # 自动同步勾选框（在“另存”右边；右侧控件是从右往左 pack 的）
        self.key_sync_var = tk.BooleanVar(value=False)
        self.key_sync_check = ttk.Checkbutton(self.row_5_frame, text=tr("keys.auto_sync", "Auto Sync"),
                                              variable=self.key_sync_var, command=self._on_sync_toggle,
                                              style='Custom.TCheckbutton')
        self.key_sync_check.pack(side="right", padx=(4, 2))

        self.save_as_script_button = tk.Button(self.row_5_frame, width=5, text=tr("common.save_as", "SaveAs"), command=self.save_as_new_script)
        self.save_as_script_button.pack(side="right", padx=2)

        self.save_script_button = tk.Button(self.row_5_frame, width=5, text=tr("common.save", "Save"), command=self.save_script)
        self.save_script_button.pack(side="right", padx=2)

        self.load_script_button = tk.Button(self.row_5_frame, width=5, text=tr("common.load", "Load"), command=self.load_script)
        self.load_script_button.pack(side="right", padx=2)

        # 中间下拉框，填充剩余空间
        self.script_file_combo = ttk.Combobox(self.row_5_frame, values=[], state="readonly")
        self.script_file_combo.pack(side="left", fill="x", expand=True, padx=(0,5))
        # Row 6: Notebook区域（标签页区域），创建一个一行两列的区域，让notebook占据第一行一列，第一行第二列固定宽度。
        self.row_6_frame = tk.Frame(self.main_frame, height=186)#width=730, 
        self.row_6_frame.grid(row=6, column=0, sticky="nsew", padx=(0,20), pady=(0,10))

        # 设置 notebook_frame 内部的行和列，让第二列默认为0，使得第一列不会被右侧悬浮的控件们挡住
        self.row_6_frame.grid_columnconfigure(0, weight=1)           # 第一列扩展
        self.row_6_frame.grid_columnconfigure(1, weight=0)

        #self.notebook = ttk.Notebook(self.row_5_frame, style='Custom.TCheckbutton')
        self.notebook = ttk.Notebook(self.row_6_frame,)# 本身使用默认样式 'TNotebook' :contentReference[oaicite:5]{index=5}
        self.notebook.grid(row=0, column=0, columnspan=1, padx=(10,0), pady=0, sticky="nsew")
        self.add_tab("Tab 1")
        self.add_tab("Tab 2")

        # 为标签页添加右键上下文菜单,创建一个菜单，包含 New / Rename / Delete 三项
        self.tab_menu = tk.Menu(self.root, tearoff=0)
        self.tab_menu.add_command(label="New",   command=self.create_new_tab)
        self.tab_menu.add_command(label="Duplicate", command=self.duplicate_current_tab)
        self.tab_menu.add_command(label="Rename",command=self.rename_current_tab)
        self.tab_menu.add_command(label="Delete",command=self.delete_current_tab)

        # 绑定右键事件到 notebook，弹出上下文菜单
        self.notebook.bind("<Button-3>", self.show_tab_menu)

        # 左键拖动 tab 标签调整顺序（add="+" 保留 Notebook 自带的按下即切换）
        self.notebook.bind("<ButtonPress-1>", self._tab_drag_press, add="+")
        self.notebook.bind("<B1-Motion>", self._tab_drag_motion, add="+")
        self.notebook.bind("<ButtonRelease-1>", self._tab_drag_release, add="+")
        # 拖动过程中按 Esc 取消（按键拖动和 tab 拖动共用）
        self.root.bind("<Escape>", self._drag_cancel, add="+")
        # 按键区撤销。输入框/文本框里的 Ctrl+Z 仍然是它们自己的撤销，见 _on_key_undo
        self.root.bind("<Control-z>", self._on_key_undo, add="+")
        self.root.bind("<Control-Z>", self._on_key_undo, add="+")

        # Row 7, “多行循环”等文字和按键
        self.row_7_frame = tk.Frame(self.main_frame, width=730, height=34)
        self.row_7_frame.grid(row=7, column=0, sticky="nw", padx=(10,0), pady=(0,0))

        # 文字“脚本区域”
        self.multi_loop_label = tk.Label(self.row_7_frame, text=tr("main.script_area", "Script Area"))
        self.multi_loop_label.place(relx=0, rely=0.5, anchor="w",x=0)

        # “行间延时ms:”文字
        self.default_delay_time_label = tk.Label(self.row_7_frame, text=tr("main.line_delay", "Delay ms:"))
        self.default_delay_time_label.place(relx=0, rely=0.5, anchor="w",x=235)

        # 文字，当前执行循环：x
        self.current_loop_count = tk.StringVar(value=tr("main.current_loop", "Loop: {count}", count="0000"))
        self.current_loop_count_label = tk.Label(self.row_7_frame, textvariable=self.current_loop_count)
        self.current_loop_count_label.place(relx=0, rely=0.5, anchor="w",x=365)

        # 行间延时ms:单行文本框
        self.default_delay_time_entry = tk.Entry(self.row_7_frame, width=5)
        self.default_delay_time_entry.place(relx=0, rely=0.5, anchor="w",x=315)
        self.default_delay_time_entry.insert(0,0)
        # “循环次数”文字
        self.loop_count_label = tk.Label(self.row_7_frame, text=tr("main.loop_count", "Loops:"))
        self.loop_count_label.place(relx=0, rely=0.5, anchor="w",x=520-55)
        # 单行文本框,“循环次数”右侧
        self.loop_count_entry = tk.Entry(self.row_7_frame, width=5)
        self.loop_count_entry.place(relx=0, rely=0.5, anchor="w",x=580-55)
        self.loop_count_entry.insert(0,3)
        # “开始”按钮，放在单行文本框右侧
        self.start_button = tk.Button(self.row_7_frame, width=5, text=tr("main.start", "Start"), command=self.start_multi_loop_send, state=tk.NORMAL)
        self.start_button.place(relx=0, rely=0.5, anchor="w",x=640-55)
        # “暂停”按钮
        self.pause_button = tk.Button(self.row_7_frame, width=5, text=tr("main.pause", "Pause"), command=self.pause_resume_multi_loop_send, state=tk.DISABLED)
        self.pause_button.place(relx=0, rely=0.5, anchor="w", x=690-55)
        # “停止”按钮
        self.stop_button = tk.Button(self.row_7_frame, width=5, text=tr("main.stop", "Stop"), command=self.stop_multi_loop_send, state=tk.DISABLED)
        self.stop_button.place(relx=0, rely=0.5, anchor="w", x=740-55)
         # 暂停控制的 Event，以及标记当前暂停状态
        self.pause_event = threading.Event()
        self.pause_event.set()   # 未暂停状态
        self.paused = False        # 标记是否处于暂停状态
        
        # Row 8
        # 多行文本框
        
        self.row_8_frame = tk.Frame(self.main_frame,width=730, height=150)
        self.row_8_frame.grid(row=8, column=0, sticky="ew", padx=10, pady=(0,0))
        self.row_8_frame.grid_propagate(False) # 固定该父容器
        #self.multi_loop_text = scrolledtext.ScrolledText(self.row_8_frame,height=10)
        self.multi_loop_text = scrolledtext.ScrolledText(
            self.row_8_frame,
            height=15,
            undo=True,               # 打开撤销功能 :contentReference[oaicite:0]{index=0}
            autoseparators=False,     # 禁用自动分隔编辑操作 :contentReference[oaicite:1]{index=1}
            maxundo=20               # 限制undo栈避免长时间运行内存增长，勿改为-1
        )

        # 为 multi_loop_text 添加右键菜单
        def show_loop_context_menu(event):
            context_menu = tk.Menu(self.multi_loop_text, tearoff=0)
            context_menu.add_command(label=tr("main.cut", "Cut"), command=lambda: self.multi_loop_text.event_generate("<<Cut>>"))
            context_menu.add_command(label=tr("main.copy", "Copy"), command=lambda: self.multi_loop_text.event_generate("<<Copy>>"))
            context_menu.add_command(label=tr("main.paste", "Paste"), command=lambda: self.multi_loop_text.event_generate("<<Paste>>"))
            context_menu.add_command(label=tr("main.delete", "Delete"), command=lambda: self.multi_loop_text.delete("sel.first", "sel.last") if self.multi_loop_text.tag_ranges("sel") else None)
            context_menu.add_separator()
            context_menu.add_command(label=tr("main.select_all", "Select All"), command=lambda: self.multi_loop_text.tag_add("sel", "1.0", "end"))
            context_menu.tk_popup(event.x_root, event.y_root)

        self.multi_loop_text.bind("<Button-3>", show_loop_context_menu)

        def _on_key(event):
            # 只对可见字符和删除键插入撤销分隔
            if event.char or event.keysym in ("BackSpace", "Delete"):
                # 延迟到事件循环尾部，确保已有文本更新
                self.multi_loop_text.after_idle(self.multi_loop_text.edit_separator)

        # 使用 <Key> 而非 <KeyRelease>
        self.multi_loop_text.bind("<Key>", _on_key)

        # 保留 Ctrl+Z / Ctrl+Y 绑定（确保回调正确返回 "break"）
        def _undo(event):
            self.multi_loop_text.edit_undo()
            return "break"

        def _redo(event):
            self.multi_loop_text.edit_redo()
            return "break"

        self.multi_loop_text.bind("<Control-z>", _undo)
        self.multi_loop_text.bind("<Control-y>", _redo)

        self.multi_loop_text.pack(fill="x")

        self.multi_loop_text.insert("1.0", "# Open example scripts to know how to send loop scripts.\n")
        self.multi_loop_text.insert("2.0", "# See details in User Manual.txt\n")
        self.multi_loop_text.insert("3.0", "# Availabel functions:\n")
        self.multi_loop_text.insert("4.0", "# 1. repeatly send commands to serial port using while for or setting the loop count\n")
        self.multi_loop_text.insert("5.0", "# 2. open power shell and send commands to power shell\n")
        self.multi_loop_text.insert("6.0", "# 3. delay for certain time between two sends\n")
        self.multi_loop_text.insert("7.0", "# 4. waiting for specific string which is expected to show in receive window\n")
        self.multi_loop_text.insert("8.0", "# 5. stop loop running or run specific commands after expected string show in receive window\n")
        self.multi_loop_text.insert("9.0", "# 6. get contents in main window and match for strings you want\n")

        # 清除undo/redo的历史，保证上面几行插入的内容不会被撤销影响
        self.multi_loop_text.edit_reset()
        
        # 用于高亮（蓝色）所有函数名
        self.multi_loop_text.tag_config("func", foreground="blue") # #9CDCFE blue  189, 99, 128 = BD6380 #569CD6

        # 用于指示当前运行的行
        self.multi_loop_text.tag_configure("highlight", background="yellow")

        # 绑定修改事件，用于自动高亮
        self.multi_loop_text.bind("<<Modified>>", self.on_multi_loop_modified)

        # 要高亮的名字列表
        #   a. Python 内置关键字──关键字模块
        kw = keyword.kwlist  # ['False','None','True','and',…,'if','else',…]
        #   b. Python 内置函数／类型──builtins 模块
        bi = [name for name in dir(builtins) if callable(getattr(builtins, name))]
        #   c. （可选）re 模块里的函数
        re_funcs = [name for name, obj in vars(re).items() if callable(obj)]
        # 自定义的函数
        custom_funcs = [
            "send", "wait","wait_for","wait for","wait_for_any","visa_init","visa_query","visa_write","visa_read",     # 例如你脚本里定义的函数
            "open_powershell",      # 以及其它任意名字
            "powershell_send",
            "send_line",
            "send_and_get",
            "open power shell",
            "power shell send",
            "toggle_serial",
            "connect_serial",
            "close_serial",
            "set_port",
            "set_baudrate",
            "gui.text_area.insert",
            "gui.text_area.see",
            "show_str",
            "show_date_time",
            "get_last_n_lines",
            "get_future_n_lines_or_till_overtime",
            "get_future_lines_till_str_or_overtime",
            "run_button",
            "send_commands_from_file"
        ]
        
        # 合并所有词，转义后拼成一个大正则
        all_words = set(kw + bi + re_funcs + custom_funcs)
        # 确保按最长优先，避免关键字 like "in" 湿匹配到变量名中的 in
        sorted_words = sorted(all_words, key=len, reverse=True)
        escaped = [re.escape(w) for w in sorted_words]
        pattern = r"\b(?:" + "|".join(escaped) + r")\b"
        self._func_highlight_re = re.compile(pattern)
 
        # row 9
        # 脚本控制区域
        self.row_9_frame = tk.Frame(self.main_frame, height=30)
        self.row_9_frame.grid(row=9, column=0, sticky="ew", padx=(10,20), pady=(2,0))

        # 使用 pack 布局
        # 左侧固定控件
        self.multi_script_path_label = tk.Label(self.row_9_frame, text=tr("main.script_file", "Script File"))
        self.multi_script_path_label.pack(side="left")

        self.multi_script_path_entry = tk.Entry(self.row_9_frame, width=25, justify="right")
        self.multi_script_path_entry.pack(side="left", padx=(5,2))

        self.multi_script_path_button = tk.Button(self.row_9_frame, text="…", command=self.multi_choose_script_path)
        self.multi_script_path_button.pack(side="left", padx=(0,5))

        # 右侧固定控件（从右往左 pack）
        self.save_as_multi_loop_btn = tk.Button(self.row_9_frame, text=tr("common.save_as", "SaveAs"), width=5, command=self.save_multi_loop_file_as)
        self.save_as_multi_loop_btn.pack(side="right", padx=2)

        self.save_multi_loop_btn = tk.Button(self.row_9_frame, text=tr("common.save", "Save"), width=5, command=self.save_multi_loop_file)
        self.save_multi_loop_btn.pack(side="right", padx=2)

        self.open_multi_loop_btn = tk.Button(self.row_9_frame, text=tr("common.open", "Open"), width=5, command=self.open_multi_loop_file)
        self.open_multi_loop_btn.pack(side="right", padx=2)

        # 中间下拉框，填充剩余空间
        self.multi_script_file_combo = ttk.Combobox(self.row_9_frame, values=[], state="readonly")
        self.multi_script_file_combo.pack(side="left", fill="x", expand=True, padx=(0,5))

        # right_frame 右侧功能区，使用grid放置在右下角
        self.right_frame = tk.Frame(self.main_frame) # , borderwidth=1, relief="raised" 边框可选项 flat raised sunken groove ridge
        # 放到 main_frame 的 col=1，row=0~9 行，占据右下角
        self.right_frame.grid(row=0, column=1,rowspan=10,sticky="ne",padx=(5,5), pady=(0,0))        # south-east，贴到右下

        # 窗口名输入框，默认“TermPlus”
        self.window_name_label = tk.Label(self.right_frame, text=tr("main.window_name", "Window name:"))
        self.window_name_label.pack(anchor="w")
        self.window_name_var = tk.StringVar(value="TermPlus")
        self.window_name_entry = tk.Entry(self.right_frame, textvariable=self.window_name_var, width=15)
        self.window_name_entry.pack(fill="x", pady=2,anchor="se")
        self.window_name_entry.bind("<KeyRelease>", self.update_window_title)
        # 启动时设置窗口标题为默认值
        self._refresh_title()
		# 选择串口
        self.choose_port_label = tk.Label(self.right_frame, text=tr("main.choose_port", "Port:"))
        self.choose_port_label.pack(anchor="w",pady=(20,0))
        self.port_var = tk.StringVar()
        self.port_menu = ttk.Combobox(self.right_frame, textvariable=self.port_var, values=self.get_ports(), state="readonly", width=10)
        self.port_menu.pack(fill="x", pady=2, anchor="se")
        # 检测可用串口
        self.refresh_btn = tk.Button(self.right_frame, text=tr("main.refresh_ports", "Scan Ports"), command=self.refresh_ports, width=10)
        self.refresh_btn.pack(fill="x", pady=2, anchor="se")
        # 选择或输入波特率
        self.baud_label = tk.Label(self.right_frame, text=tr("main.baudrate", "Baud rate:"))
        self.baud_label.pack(anchor="w")
        self.baud_var = tk.StringVar(value="115200")
        baudrates = ["300", "1200", "2400", "4800", "9600", "19200", "38400", "57600", "115200", "230400"]
        self.baud_menu = ttk.Combobox(self.right_frame, textvariable=self.baud_var, values=baudrates, width=10)
        self.baud_menu.pack(fill="x", pady=2, anchor="se")
        # 串口指示、打开串口/关闭串口
        self.toggle_frame = tk.Frame(self.right_frame)
        self.toggle_frame.pack(fill="x", pady=2, anchor="se")
        self.toggle_port_btn = tk.Button(self.toggle_frame, text=tr("main.connect_serial", "Connect"), command=self.toggle_serial, width=10)
        self.toggle_port_btn.pack(side="left", anchor="se")
        # 将状态画布放在按钮右侧，设置一些水平间距
        self.status_canvas = Canvas(self.toggle_frame, width=20, height=20, bg="gray", highlightthickness=0)
        self.status_canvas.pack(side="left", padx=5, anchor="se")
        # 配置SSH
        self.ssh_frame = tk.Frame(self.right_frame)
        self.ssh_frame.pack(fill="x", pady=2, anchor="se")
        self.ssh_config_btn = tk.Button(self.ssh_frame, text=tr("main.ssh_config", "SSH Setup"), command=self.open_ssh_config_window, width=10)
        self.ssh_config_btn.pack(side="left", anchor="se")
        # 将状态画布放在按钮右侧，设置一些水平间距
        self.ssh_status_canvas = Canvas(self.ssh_frame, width=20, height=20, bg="gray", highlightthickness=0)
        self.ssh_status_canvas.pack(side="left", padx=5, anchor="se")

        # 文字“自动保存路径”
        self.auto_save_path_label = tk.Label(self.right_frame, text=tr("main.auto_save_path", "Auto-save path"))
        self.auto_save_path_label.pack(anchor="sw",pady=(20,0))
        # 文本框 方形按键
        self.auto_save_path_frame = tk.Frame(self.right_frame)
        self.auto_save_path_frame.pack(fill="x", pady=0, anchor="se")
        self.auto_save_path_entry = tk.Entry(self.auto_save_path_frame, width=10, justify="right")
        self.auto_save_path_entry.pack(side="left", fill="x", expand=True, pady=2, anchor="se")
        # 按键 省略号
        self.square_button = tk.Button(self.auto_save_path_frame, text="…", width=2, height=1, command=self.choose_auto_save_path)
        self.square_button.pack(side="left", anchor="se")
        # 文字 保存文件名
        self.save_file_name_label = tk.Label(self.right_frame, text=tr("main.save_file_name", "File name"))
        self.save_file_name_label.pack(anchor="sw")
        # 文本框
        self.file_name_entry = tk.Entry(self.right_frame, width=10, justify="left")
        self.file_name_entry.pack(fill="x", pady=0, anchor="se")
        self.file_name_entry.insert(0,"AutoSave")
        # 自动保存状态 按钮
        self.auto_save_frame = tk.Frame(self.right_frame)
        self.auto_save_frame.pack(fill="x", pady=0)
        # 文字“自动保存”
        self.auto_save_label = tk.Label(self.auto_save_frame, text=tr("main.auto_save", "Auto Save"))
        self.auto_save_label.pack(side="left", anchor="se")
        # 自动保存按键，初始背景为灰色，点击后切换颜色
        self.auto_save_btn = tk.Button(self.auto_save_frame, text="OFF", width=4, height=1, bg="gray", command=self.toggle_auto_save)
        self.auto_save_btn.pack(side="right", padx=(2,0), anchor="se")
        # 文件最大容量
        self.file_max_volume_label = tk.Label(self.right_frame, text=tr("main.max_file_size", "Max file size"))
        self.file_max_volume_label.pack(anchor="sw", pady=(0,0))
        # 文本框 右侧显示“MB”
        self.file_capacity_frame = tk.Frame(self.right_frame)
        self.file_capacity_frame.pack(fill="x", pady=0, anchor="se")
        self.max_capacity_entry = tk.Entry(self.file_capacity_frame, width=10, justify="right")
        self.max_capacity_entry.pack(side="left", fill="x", expand=True, anchor="se")
        self.max_capacity_entry.insert(0, "10")
        self.MB_label = tk.Label(self.file_capacity_frame, text="MB")
        self.MB_label.pack(side="left", padx=2, anchor="se")

        # 保存原始的 grid 配置
        self.row_5_grid_info = self.row_5_frame.grid_info()
        self.row_6_grid_info = self.row_6_frame.grid_info()
        self.row_7_grid_info = self.row_7_frame.grid_info()
        self.row_8_grid_info = self.row_8_frame.grid_info()
        self.row_9_grid_info = self.row_9_frame.grid_info()
        self.right_frame_grid_info = self.right_frame.grid_info()

        self.sent_bytes = 0
        self.received_bytes = 0
        self.serial_conn = None
        self.reading_thread = None
        self.stop_reading = False
        self.loop_sending = False
        self.loop_thread = None
        self.current_color_theme_light = True
        self.button_send_check_terminal_new_text = None
        self.button_send_wait_for_new_text = None
        self.script_wait_for_new_text = None
        self.script_wait_for_any_new_text = None
        self.auto_save_new_text = None
        # ─── 新增：PowerShell 进程句柄 ───
        self.ps_proc = None
        # ─── 新增：脚本修改状态标记 ───
        self.script_modified = False
        # ─── 新增：当前编辑的脚本文件信息 ───
        self.current_script_path = ""
        self.current_script_file = ""
        self.file_encodings = {}  # 记录每个文件的编码格式 {file_path: encoding}
        #self.last_auto_delete_lines = 0
        self.refresh_ports()
        # 初始化完成后，尝试加载之前保存的配置
        self.load_setup()

        # 初始化正则匹配监控
        self.regex_monitor = RegexMonitor(self)
        self._hook_text_area_insert()
        # 应用（可能是从 ini 读回来的）显示方式
        self._on_display_mode_change()

        # 启动定时检查任务，每10秒检测一次 text_area 内容是否过大需要删除
        self.auto_save_and_auto_delete()

    def _pick_mono_font(self):
        """
        挑一个系统里可用的等宽字体。
        首选 Cascadia Code，检测不到则退回 Consolas（Vista 起 Windows 都自带），
        最后兜底 Courier New。
        注：Cascadia Code 的连字在 Tk 上不会被渲染（Tk 走 GDI，不执行 OpenType
        的 calt 特性），实测与 Cascadia Mono 逐像素一致，不会影响列位计算。
        """
        try:
            families = set(tkFont.families())
        except Exception:
            families = set()
        for name in ("Cascadia Code", "Consolas", "Courier New"):
            if name in families:
                return name
        return "Courier New"

    def _bind_tooltip(self, widget, text):
        """给控件加一个鼠标悬停提示。"""
        state = {"win": None, "timer": None}

        def show():
            state["timer"] = None
            if state["win"] is not None:
                return
            try:
                x = widget.winfo_rootx()
                y = widget.winfo_rooty() + widget.winfo_height() + 4
                tip = tk.Toplevel(widget)
                tip.wm_overrideredirect(True)
                tip.wm_geometry(f"+{x}+{y}")
                tk.Label(tip, text=text, justify="left", relief="solid", borderwidth=1,
                         background="#FFFFE1", foreground="#000000",
                         padx=6, pady=4).pack()
                state["win"] = tip
            except Exception:
                state["win"] = None

        def on_enter(_event=None):
            if state["timer"] is None:
                state["timer"] = widget.after(400, show)

        def on_leave(_event=None):
            if state["timer"] is not None:
                try:
                    widget.after_cancel(state["timer"])
                except Exception:
                    pass
                state["timer"] = None
            if state["win"] is not None:
                try:
                    state["win"].destroy()
                except Exception:
                    pass
                state["win"] = None

        widget.bind("<Enter>", on_enter, add="+")
        widget.bind("<Leave>", on_leave, add="+")
        widget.bind("<ButtonPress>", on_leave, add="+")

    def _on_display_mode_change(self, event=None):
        """显示方式下拉框变化时切换渲染器模式。"""
        label = self.display_mode_combo.get()
        mode = self.DISPLAY_MODE_BY_LABEL.get(label, AnsiTextRenderer.MODE_TERMINAL)
        # HEX显示只作用于串口接收内容（在 read_from_serial 里转成十六进制文本），
        # 其他写进主窗口的内容仍按终端效果渲染；切到别的档位即自动退出十六进制显示。
        self.hex_rx_display = (mode == self.HEX_RX_MODE)
        self.ansi_renderer.set_mode(
            AnsiTextRenderer.MODE_TERMINAL if self.hex_rx_display else mode)
        # 让焦点回到接收窗口，避免下拉框吞掉后续按键
        try:
            self.text_area.focus_set()
        except Exception:
            pass

    def _hook_text_area_insert(self):
        original_insert = self.text_area.insert
        # 渲染器直接持有未被 hook 的原始方法，避免递归
        self.ansi_renderer.bind_widget_methods(original_insert, self.text_area.delete)

        def hooked_insert(index, chars, *args):
            if not chars:
                return
            # 只有“追加到末尾”的写入才交给控制字符渲染器；
            # 本地行编辑那类在 "insert" 光标处的写入保持原样。
            if self.ansi_renderer.handles(index):
                self.ansi_renderer.feed(chars, args)
                return
            original_insert(index, chars, *args)
            self.regex_monitor.on_new_text(chars)

        self.text_area.insert = hooked_insert

    def toggle_regex_monitor(self):
        self.regex_monitor.toggle_window()

    def report_callback_exception(self, exc, val, tb):
        """
        Tkinter 回调异常处理：记录日志 + 弹窗提示 + 保持主循环继续
        """

        # 记录错误到日志
        err_msg = ''.join(traceback.format_exception(exc, val, tb))
        with open("TermPlus_crash.log", "a", encoding="utf-8") as f:
            f.write("\n\n==== Tkinter Callback Exception on {} ====\n".format(
                datetime.now()))
            f.write(err_msg)

        # 控制台也打印，方便调试
        print("[Tkinter Callback Exception]", err_msg)

        # 弹出错误提示，但不中断程序
        try:
            messagebox.showerror(tr("main.app_exception_title", "Program Error"),
                                 tr("main.app_exception_msg", "An exception occurred:\n{error}", error=val),
                                 parent=self.root)

        except Exception:
            # 避免在没有主窗口或多线程时弹窗崩溃
            pass

        # 不抛出异常，让 Tkinter 事件循环继续

    def show_about_window(self):
        top = tk.Toplevel(self.root)
        top.title("Coffee!")
        # 设置固定窗口大小
        win_width = 300
        win_height = 300

        # 获取主窗口的位置和尺寸
        self.root.update_idletasks()
        root_x = self.root.winfo_x()
        root_y = self.root.winfo_y()
        root_width = self.root.winfo_width()
        root_height = self.root.winfo_height()

        # 计算居中位置
        pos_x = root_x + (root_width - win_width) // 2
        pos_y = root_y + (root_height - win_height) // 2

        # 设置 Toplevel 窗口的大小和位置
        top.geometry(f"{win_width}x{win_height}+{pos_x}+{pos_y}")
    
        # 加载大图
        try:
            # 解码 base64 数据
            img_data = base64.b64decode(img_base64)
            img_pil = Image.open(io.BytesIO(img_data))
            img_resized = img_pil.resize((200, 200), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(img_resized)

            # 显示图片
            label = tk.Label(top, image=photo)
            label.image = photo  # 防止被垃圾回收
            label.pack(pady=10)
        except Exception as e:
            tk.Label(top, text=tr("main.image_failed", "Failed to show image: {error}", error=e)).pack()

        tk.Label(top, text="If this tool saved your time,").pack()
        tk.Label(top, text="feel free to buy me a coffee.").pack()
        tk.Label(top, text="Your support means a lot to me!").pack()


    # 打开 按键
    def open_multi_loop_file(self):
        """打开指定文件夹路径和文件名的 .txt 文件，并将其中的内容替换到多行循环发送文本框中，同时记录文件路径"""
        dir_path = self.multi_script_path_entry.get().strip()
        file_name = self.multi_script_file_combo.get().strip()
        if not dir_path or not file_name:
            messagebox.showwarning(tr("common.warning", "Warning"),
                                   tr("main.select_script_path_file", "Please select a script path and a script file."),
                                   parent=self.root)

            return
        full_path = os.path.join(dir_path, file_name)
        try:
            # term的ts文件本来是ANSI格式的，
            #with open(full_path, "r", encoding="utf-8-sig") as f:
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()
                self.multi_loop_text.delete("1.0", tk.END)
                self.multi_loop_text.insert("1.0", content)
                self.multi_loop_txt_filepath = full_path
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"),
                                 tr("main.load_script_failed", "Failed to load script: {error}", error=e),
                                 parent=self.root)

            return

    # 保存 按键
    def save_multi_loop_file(self):
        """
        保存多行循环发送文本框中的内容至之前指定的 .txt 文件，
        如果之前未指定，则调用另存为功能
        """
        if self.multi_loop_txt_filepath:
            try:
                with open(self.multi_loop_txt_filepath, "w", encoding="utf-8") as f:
                    f.write(self.multi_loop_text.get("1.0", tk.END))
                messagebox.showinfo(tr("common.info", "Info"), tr("main.save_ok", "Saved successfully."), parent=self.root)

            except Exception as e:
                messagebox.showerror(tr("common.error", "Error"),
                                     tr("main.save_file_failed", "Failed to save file: {error}", error=e),
                                     parent=self.root)

        else:
            # 若之前未指定路径，则调用另存为功能
            self.save_multi_loop_file_as()

    # 另存为 按键
    def save_multi_loop_file_as(self):
        """弹出对话框指定路径和文件名，将多行循环发送文本框中的内容保存至指定的 .txt 文件中"""
        file_path = filedialog.asksaveasfilename(
            title=tr("main.save_as_dialog", "Save As"),
            defaultextension=".txt",
            filetypes=(("Text Files", "*.txt"), ("All Files", "*.*"))
        )
        if file_path:
            try:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(self.multi_loop_text.get("1.0", tk.END))
                self.multi_loop_txt_filepath = file_path
                # 获取当前 Combobox 的所有选项
                current_values = list(self.multi_script_file_combo['values'])
                file_name = os.path.basename(file_path)
                # 如果文件名不在选项中，则加入
                if file_name not in current_values:
                    current_values.append(file_name)
                    self.multi_script_file_combo.config(values=current_values)
                # 将当前选中项设置为新保存的文件
                self.multi_script_file_combo.set(file_name)
                messagebox.showinfo(tr("common.info", "Info"), tr("main.save_ok", "Saved successfully."), parent=self.root)


            except Exception as e:
                messagebox.showerror(tr("common.error", "Error"),
                                     tr("main.save_file_failed", "Failed to save file: {error}", error=e),
                                     parent=self.root)


    # 根据窗口名文本框更新窗口名
    def update_window_title(self, event=None):
        self._refresh_title()

    def clear_text_area(self):
        #raise RuntimeError("测试异常触发")
        """清除接收文本框中的所有内容，并重置发送和接收的字符计数"""
        # self.text_area.after(0, lambda: (
        #     self.text_area.delete("1.0", "end"),
        #     self.last_saved_index = self.text_area.index("end-1c")
        #     ))
        self.text_area.delete("1.0", "end")
        self.last_saved_index = "1.0"
        self.regex_monitor.global_offset = 0
        self.regex_monitor.match_buffer = ""
        # 重置控制字符渲染器的解析状态（光标列、颜色、跨块残留）
        self.ansi_renderer.reset()
        self.sent_bytes = 0
        self.received_bytes = 0
        self.update_data_stats()
        # 重置自动保存的位置


    def _show_text_popup(self, event):
        try:
            self.text_popup_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.text_popup_menu.grab_release()

    def _delete_selection(self):
        try:
            #sel = self.text_area.get(tk.SEL_FIRST, tk.SEL_LAST)
            self.text_area.delete(tk.SEL_FIRST, tk.SEL_LAST)
        except tk.TclError:
            pass  # 没有选中内容时不报错

    def _on_text_area_copy(self, event=None):
        """
        拦截text_area的复制操作，将控制字符转为可见形式后放入剪贴板。
        例如：ESC -> <Esc>, NUL -> <NUL>, BEL -> <BEL> 等。
        保留常见的换行符(\n)和制表符(\t)不转换。
        """
        try:
            sel_text = self.text_area.get(tk.SEL_FIRST, tk.SEL_LAST)
        except tk.TclError:
            return  # 没有选中内容

        # 复用模块级的控制字符名称表（不转换 \n 和 \t，保持原样）。
        # 注：显示方式为“终端效果”或“显示为文字”时控制字符基本不会再进到窗口里，
        # 这里主要是给“原样(方块)”模式和历史内容兜底。
        result = escape_ctrl_chars(sel_text)

        # 放入剪贴板
        self.root.clipboard_clear()
        self.root.clipboard_append(result)

        return "break"  # 阻止默认的复制行为

    def start_multi_loop_send(self):
        #if not self.loop_sending:
        self.loop_sending = True
        self.loop_stop = False
        self.pause_event.set()    # 确保初始状态为非暂停
        # 启动后禁用开始按钮，启用停止和暂停按钮
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        self.pause_button.config(state=tk.NORMAL)
        # 关闭撤销栈
        self.text_area.configure(undo=False)
        threading.Thread(target=self.run_custom_script, daemon=True).start()

    def stop_multi_loop_send(self):
        #if self.loop_sending:
        self.loop_stop = True
        self.loop_sending = False
        # 为了避免在暂停状态下不能退出，恢复 Event
        self.pause_event.set()
        self.paused = False
        # 恢复按钮初始状态
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        self.pause_button.config(state=tk.DISABLED, text=tr("main.pause", "Pause"))

    def pause_resume_multi_loop_send(self):
        # 如果没有运行，则不处理
        if not self.loop_sending:
            return
        # 如果当前未处于暂停状态，则暂停；如果已暂停，则继续
        if not self.paused:
            self.pause_event.clear()  # 清除后wait()处将会阻塞
            self.paused = True
            self.pause_button.config(text=tr("main.resume", "Resume"))
        else:
            self.pause_event.set()     # 允许继续执行
            self.paused = False
            self.pause_button.config(text=tr("main.pause", "Pause"))


    def run_custom_script(self):
        try:
            T = float(self.default_delay_time_entry.get().strip())
        except ValueError:
            T = 0
        try:
            loop_count = int(self.loop_count_entry.get().strip())
        except ValueError:
            loop_count = 0

        original_script_content = self.multi_loop_text.get("1.0", tk.END)
        original_lines = original_script_content.splitlines()

        def send_line(text, add_newline=True, insert_display=True):
            if not text or str(text).strip() == "":
                print("send_line 跳过空字符串")
                return
            self.send_via_serial(text, add_newline=add_newline, insert_display=insert_display)

        def wait(seconds):
            interval = 0.1
            elapsed = 0
            line_num = getattr(self, '_current_script_line', None)
            show_countdown = seconds >= 2 and line_num is not None
            countdown_suffix = ""
            last_shown = int(seconds)
            if show_countdown:
                countdown_suffix = f" ({last_shown})"
                self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.insert(f"{ln}.end", cs))
            try:
                while elapsed < seconds:
                    self.pause_event.wait()
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    time.sleep(interval)
                    elapsed += interval
                    if show_countdown:
                        remaining = max(0, int(seconds - elapsed))
                        if remaining != last_shown:
                            old_suffix = countdown_suffix
                            countdown_suffix = f" ({remaining})"
                            self.tk_safe(lambda os=old_suffix, cs=countdown_suffix, ln=line_num: (
                                self.multi_loop_text.delete(f"{ln}.end - {len(os)}c", f"{ln}.end"),
                                self.multi_loop_text.insert(f"{ln}.end", cs)
                            ))
                            last_shown = remaining
            finally:
                if show_countdown and countdown_suffix:
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.delete(f"{ln}.end - {len(cs)}c", f"{ln}.end"))

        def wait_for(target_string, over_time):
            if target_string == '':
                self.tk_safe(lambda: messagebox.showwarning("Warning", "wait for must have a target string.", parent=self.root))

                return False
            if over_time <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Over time must be positive.", parent=self.root))

                return False

            # finally 里要用到的变量先给好默认值，避免异常发生在赋值之前导致 NameError
            line_num = getattr(self, '_current_script_line', None)
            show_countdown = False
            countdown_suffix = ""
            # 锁计数的自增必须紧贴 try，否则中间任何一句抛异常（例如 over_time
            # 被误传成字符串）都会让 finally 不执行，锁永久泄漏、自动清屏失效
            self.auto_delete_lock_count += 1
            try:
                script_wait_for_new_text = ""
                start_time = time.time()
                last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                start_index = last_index

                show_countdown = over_time >= 2 and line_num is not None
                last_shown = int(over_time)
                if show_countdown:
                    countdown_suffix = f" ({last_shown})"
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.insert(f"{ln}.end", cs))

                while time.time() - start_time < over_time:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    def _wait_for_check(li=last_index):
                        ci = self.text_area.index("end-1c")
                        if self.text_area.compare(li, ">", ci):
                            return "error", "", ci
                        if self.text_area.compare(li, "<", ci):
                            return "new", self.text_area.get(li, ci), ci
                        return "same", "", ci
                    status, val, new_index = self.tk_safe(_wait_for_check)
                    if status == "error":
                        self.tk_safe(lambda: messagebox.showerror(tr("script.exec_error_title", "Script Error"), "wait_for get function find last index bigger than current index. wait for function skipped", parent=self.root))
                        return False
                    if status == "new":
                        script_wait_for_new_text += val
                        # 保留冗余：last_index 回退 target_string 长度，防止目标被截断
                        retain_chars = len(target_string) - 1
                        def _calc_retain_index(ni=new_index, rc=retain_chars, si=start_index):
                            candidate = self.text_area.index(f"{ni} - {rc}c")
                            if self.text_area.compare(candidate, "<", si):
                                return si
                            return candidate
                        last_index = self.tk_safe(_calc_retain_index)
                    if target_string in script_wait_for_new_text:
                        return True
                    time.sleep(0.1)

                    if show_countdown:
                        elapsed = time.time() - start_time
                        remaining = max(0, int(over_time - elapsed))
                        if remaining != last_shown:
                            old_suffix = countdown_suffix
                            countdown_suffix = f" ({remaining})"
                            self.tk_safe(lambda os=old_suffix, cs=countdown_suffix, ln=line_num: (
                                self.multi_loop_text.delete(f"{ln}.end - {len(os)}c", f"{ln}.end"),
                                self.multi_loop_text.insert(f"{ln}.end", cs)
                            ))
                            last_shown = remaining

            finally:
                self.auto_delete_lock_count -= 1
                if show_countdown and countdown_suffix:
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.delete(f"{ln}.end - {len(cs)}c", f"{ln}.end"))
            return False

        def wait_for_any(target_list, timeout):
            if not target_list:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "wait_for_any must have a non-empty target list.", parent=self.root))

                return None
            if timeout <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Timeout must be positive.", parent=self.root))

                return None

            # finally 里要用到的变量先给好默认值，避免异常发生在赋值之前导致 NameError
            line_num = getattr(self, '_current_script_line', None)
            show_countdown = False
            countdown_suffix = ""
            # 锁计数的自增必须紧贴 try，否则中间任何一句抛异常（例如 timeout
            # 被误传成字符串）都会让 finally 不执行，锁永久泄漏、自动清屏失效
            self.auto_delete_lock_count += 1
            try:
                self.script_wait_for_any_new_text = ""

                show_countdown = timeout >= 2 and line_num is not None
                last_shown = int(timeout)
                if show_countdown:
                    countdown_suffix = f" ({last_shown})"
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.insert(f"{ln}.end", cs))

                start_time = time.time()
                last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                start_index = last_index

                if not target_list:
                    length_of_longest_string = 0
                else:
                    longest_string = max(target_list, key=len)
                    length_of_longest_string = len(longest_string)

                while True:
                    if self.loop_stop:
                        return None
                    if time.time() - start_time >= timeout:
                        return None
                    def _wait_for_any_check(li=last_index):
                        ci = self.text_area.index("end-1c")
                        if self.text_area.compare(li, ">", ci):
                            return "error", "", ci
                        if self.text_area.compare(li, "<", ci):
                            return "new", self.text_area.get(li, ci), ci
                        return "same", "", ci
                    status, val, new_index = self.tk_safe(_wait_for_any_check)
                    if status == "error":
                        self.tk_safe(lambda: messagebox.showerror(tr("script.exec_error_title", "Script Error"), "wait for any index error, last index bigger than current index. wait for any skipped.", parent=self.root))
                        return None
                    if status == "new":
                        self.script_wait_for_any_new_text += val
                        # 保留冗余：last_index 回退最长目标字符串长度，防止目标被截断
                        retain_chars = length_of_longest_string - 1 if length_of_longest_string > 0 else 0
                        if retain_chars > 0:
                            def _calc_retain_index_any(ni=new_index, rc=retain_chars, si=start_index):
                                candidate = self.text_area.index(f"{ni} - {rc}c")
                                if self.text_area.compare(candidate, "<", si):
                                    return si
                                return candidate
                            last_index = self.tk_safe(_calc_retain_index_any)
                        else:
                            last_index = new_index
                    for target in target_list:
                        if target in self.script_wait_for_any_new_text:
                            return target
                    time.sleep(0.1)

                    if show_countdown:
                        elapsed = time.time() - start_time
                        remaining = max(0, int(timeout - elapsed))
                        if remaining != last_shown:
                            old_suffix = countdown_suffix
                            countdown_suffix = f" ({remaining})"
                            self.tk_safe(lambda os=old_suffix, cs=countdown_suffix, ln=line_num: (
                                self.multi_loop_text.delete(f"{ln}.end - {len(os)}c", f"{ln}.end"),
                                self.multi_loop_text.insert(f"{ln}.end", cs)
                            ))
                            last_shown = remaining

            finally:
                self.auto_delete_lock_count -= 1
                if show_countdown and countdown_suffix:
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.delete(f"{ln}.end - {len(cs)}c", f"{ln}.end"))

        def show_str(string_to_show):
            if string_to_show == "":
                self.tk_safe(lambda: messagebox.showerror(tr("script.func_error_title", "Function Error"), tr("script.show_str_empty", "show_str input must not be empty."), parent=self.root))

                return
            self.tk_safe(lambda:self.text_area.insert(tk.END, string_to_show))
            self.tk_safe(lambda:self._auto_scroll())

        def send_and_get(str_2_send, regex_pattern, over_time, wait_str="", line_count=0):
            """
            发送命令并从回复中用正则匹配捕获数据。
            返回 re.Match 对象或 None。
            """
            if not str_2_send:
                return None
            # 发送
            send_line(str_2_send)
            last_match = None
            # finally 里要用到的变量先给好默认值，避免异常发生在赋值之前导致 NameError
            line_num = getattr(self, '_current_script_line', None)
            show_countdown = False
            countdown_suffix = ""
            # 锁计数的自增必须紧贴 try，否则中间任何一句抛异常（例如 over_time
            # 被误传成字符串）都会让 finally 不执行，锁永久泄漏、自动清屏失效
            self.auto_delete_lock_count += 1
            try:
                # 记录发送后的位置
                start_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
                last_index = start_index
                collected_text = ""
                start_time = time.time()

                show_countdown = over_time >= 2 and line_num is not None
                last_shown = int(over_time)
                if show_countdown:
                    countdown_suffix = f" ({last_shown})"
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.insert(f"{ln}.end", cs))

                while True:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    # 超时检查
                    if time.time() - start_time >= over_time:
                        break
                    # 获取新内容
                    def _send_and_get_check(li=last_index):
                        ci = self.text_area.index("end-1c")
                        if self.text_area.compare(li, "<", ci):
                            return ci, self.text_area.get(li, ci)
                        return ci, ""
                    current_index, new_text = self.tk_safe(_send_and_get_check)
                    if new_text:
                        collected_text += new_text
                        # 保留冗余：last_index 回退 wait_str 长度，防止目标被截断
                        if wait_str:
                            retain_chars = len(wait_str) - 1
                            def _calc_retain_index_sag(ci=current_index, rc=retain_chars, si=start_index):
                                candidate = self.text_area.index(f"{ci} - {rc}c")
                                if self.text_area.compare(candidate, "<", si):
                                    return si
                                return candidate
                            last_index = self.tk_safe(_calc_retain_index_sag)
                        else:
                            last_index = current_index
                    # 检查停止条件：wait_str
                    if wait_str and wait_str in collected_text:
                        break
                    # 检查停止条件：line_count
                    if line_count > 0 and len(collected_text.splitlines()) >= line_count:
                        break
                    # 倒计时显示
                    if show_countdown:
                        elapsed = time.time() - start_time
                        remaining = max(0, int(over_time - elapsed))
                        if remaining != last_shown:
                            old_suffix = countdown_suffix
                            countdown_suffix = f" ({remaining})"
                            self.tk_safe(lambda os=old_suffix, cs=countdown_suffix, ln=line_num: (
                                self.multi_loop_text.delete(f"{ln}.end - {len(os)}c", f"{ln}.end"),
                                self.multi_loop_text.insert(f"{ln}.end", cs)
                            ))
                            last_shown = remaining
                    time.sleep(0.1)
                # 执行正则匹配。
                # 注意不能直接用 collected_text：为了防止 wait_str 被两次读取切开，
                # 上面每轮都把 last_index 回退了 len(wait_str)-1 个字符，那部分文本
                # 会被重复追加，拿它做匹配会多出重复结果。这里从 start_index 到当前
                # 末尾重新完整取一次，保证不重不漏。
                match_text = ""
                if regex_pattern:
                    def _get_match_text(si=start_index):
                        ci = self.text_area.index("end-1c")
                        if self.text_area.compare(si, "<", ci):
                            return self.text_area.get(si, ci)
                        return ""
                    match_text = self.tk_safe(_get_match_text)
                if match_text and regex_pattern:
                    results = re.findall(regex_pattern, match_text)
                    if results:
                        if len(results) == 1:
                            # 只有一个匹配结果
                            if isinstance(results[0], tuple):
                                # 多个捕获组，但只有一个匹配，返回元组
                                last_match = list(results[0]) if len(results[0]) > 1 else results[0][0]
                            else:
                                # 单个捕获组，单个匹配，直接返回字符串
                                last_match = results[0]
                        else:
                            # 多个匹配结果，返回列表
                            last_match = results
            finally:
                self.auto_delete_lock_count -= 1
                if show_countdown and countdown_suffix:
                    self.tk_safe(lambda cs=countdown_suffix, ln=line_num: self.multi_loop_text.delete(f"{ln}.end - {len(cs)}c", f"{ln}.end"))
            return last_match

        # run_button / send_commands_from_file 里用来识别 wait 语句的正则，
        # 与按键发送引擎 _send_next_command 保持一致（那里只认整数秒，这里放宽到小数）
        _RE_WAIT_SECONDS = re.compile(r'^wait\s+(\d+(?:\.\d+)?)\s*$', re.IGNORECASE)
        _RE_WAIT_FOR = re.compile(r'^wait\s+for\s+(.+?)\s+for\s+(\d+(?:\.\d+)?)\s*$', re.IGNORECASE)

        def _write_script_alert(msg):
            """在主窗口用红色写一段告警，前后各空一行。"""
            text = f"\n{msg}\n\n"
            self.tk_safe(lambda: self.text_area.insert(tk.END, text, "red"))
            self.tk_safe(lambda: self._auto_scroll())

        def _check_run_lines_args(func_name, wait_str, over_time):
            """run_button / send_commands_from_file 的公共参数校验。"""
            if not wait_str or not str(wait_str).strip():
                self.tk_safe(lambda: messagebox.showwarning(
                    "Warning",
                    tr("script.wait_str_required",
                       "{func_name} requires a wait string.\n\n"
                       "E.g. the device prompt $ or #. It is used to tell when the previous command has finished,\n"
                       "leaving it empty floods the device with commands.",
                       func_name=func_name),
                    parent=self.root))
                return False
            try:
                if float(over_time) <= 0:
                    raise ValueError
            except (TypeError, ValueError):
                self.tk_safe(lambda: messagebox.showwarning(
                    "Warning", tr("script.timeout_positive", "{func_name}: timeout must be a number greater than 0.", func_name=func_name), parent=self.root))
                return False
            return True

        def _run_command_lines(source_desc, raw_lines, wait_str, over_time, interpret=True):
            """
            逐行执行 raw_lines 里的内容，行为与"点击按键发送"保持一致。
            interpret=True（默认）时，每一行按下面的顺序判断：
              1. 空行、以 # 开头的注释行            -> 跳过
              2. wait <秒>                          -> 真的等待，不发送
              3. wait for <字符串> for <秒>         -> 真的等待，不发送
              4. 自定义函数命令（show_str / set_port / connect_serial /
                 open power shell / visa_xxx 等，与按键区域支持的完全相同）
                                                    -> 执行，不发送
              5. 其余                               -> 发送到串口，然后等 wait_str
            interpret=False 时只做第 1 条，其余一律原样发送到串口。
            发送后如果下一行是 wait 语句，则跳过本行对 wait_str 的等待
            （与按键发送引擎的行为一致，避免重复等待）。

            某一行没等到就绪信号不会中断整段，而是在主窗口写一条红色告警后继续下一行。
            每行的行尾空白会被去掉。
            返回 1（每一次等待都成功）或 0（有任何一次等待超时）。
            source_desc 只用于告警文字，例如【按键 初始化】或【文件 init.txt】。
            """
            # 保留原始行号（告警要报【第几行】，必须是文件/按键里的行号，不是过滤后的序号）
            cmds = []
            for idx, raw in enumerate(raw_lines, start=1):
                text = raw.rstrip()
                if not text.strip() or text.lstrip().startswith("#"):
                    continue
                cmds.append((idx, text))
            total = len(cmds)
            if total == 0:
                _write_script_alert(tr("script.no_commands", "*** No commands to send in {source}, skipped ***", source=source_desc))
                return 0

            all_hit = True
            # finally 里要用到的变量先给好默认值
            line_num = getattr(self, '_current_script_line', None)
            show_progress = line_num is not None
            suffix = ""

            def _set_suffix(new_suffix):
                """更新脚本行尾的【进度 + 倒计时】后缀，写法与现有倒计时保持一致。"""
                nonlocal suffix
                old = suffix
                suffix = new_suffix
                if old and new_suffix:
                    self.tk_safe(lambda o=old, n=new_suffix, ln=line_num: (
                        self.multi_loop_text.delete(f"{ln}.end - {len(o)}c", f"{ln}.end"),
                        self.multi_loop_text.insert(f"{ln}.end", n)
                    ))
                elif new_suffix:
                    self.tk_safe(lambda n=new_suffix, ln=line_num:
                                 self.multi_loop_text.insert(f"{ln}.end", n))
                elif old:
                    self.tk_safe(lambda o=old, ln=line_num:
                                 self.multi_loop_text.delete(f"{ln}.end - {len(o)}c", f"{ln}.end"))

            over_time = float(over_time)
            wait_str = str(wait_str)
            retain_chars = max(0, len(wait_str) - 1)

            # 锁计数的自增必须紧贴 try，否则异常时 finally 不执行会导致锁泄漏
            self.auto_delete_lock_count += 1
            try:
                for seq, (src_line_no, cmd) in enumerate(cmds, start=1):
                    # 响应暂停和停止
                    self.pause_event.wait()
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")

                    def _alert(reason):
                        _write_script_alert(
                            tr("script.timeout_alert",
                               "*** Wait timeout ***  Source: {source}  Line {line}"
                               " (progress {seq}/{total})\n"
                               "    Command: {cmd}\n"
                               "{reason}\n"
                               "    Wait for this line skipped, continuing with next line",
                               source=source_desc, line=src_line_no, seq=seq, total=total,
                               cmd=cmd, reason=reason)
                        )

                    if interpret:
                        # ---- wait <秒> ----
                        m = _RE_WAIT_SECONDS.match(cmd)
                        if m:
                            if show_progress:
                                _set_suffix(f" ({seq}/{total})")
                            # 交给脚本自带的 wait()，它有自己的倒计时并响应暂停/停止
                            wait(float(m.group(1)))
                            continue
                        # ---- wait for <字符串> for <秒> ----
                        m = _RE_WAIT_FOR.match(cmd)
                        if m:
                            if show_progress:
                                _set_suffix(f" ({seq}/{total})")
                            target, secs = m.group(1), float(m.group(2))
                            if not wait_for(target, secs):
                                all_hit = False
                                _alert("    " + tr("script.wait_for_not_found", "wait for line: not received within {secs:g} s: {target}", secs=secs, target=target))
                            continue
                        # ---- 自定义函数命令（与按键区域支持的完全相同）----
                        if self.tk_safe(lambda c=cmd: self._try_execute_cell_command(c)):
                            if show_progress:
                                _set_suffix(f" ({seq}/{total})")
                            continue

                    send_line(cmd)

                    # 与按键发送引擎一致：下一行是 wait 语句时，跳过本行对 wait_str 的等待
                    if interpret and seq < total:
                        next_cmd = cmds[seq][1]
                        if next_cmd.strip().lower().startswith("wait"):
                            if show_progress:
                                _set_suffix(f" ({seq}/{total})")
                            continue

                    start_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
                    last_index = start_index
                    collected_text = ""
                    start_time = time.time()
                    last_shown = int(over_time)
                    if show_progress:
                        _set_suffix(f" ({seq}/{total} {last_shown})")

                    hit = False
                    while True:
                        self.pause_event.wait()
                        if self.loop_stop:
                            raise StopLoopException("循环已停止")
                        if time.time() - start_time >= over_time:
                            break
                        def _check(li=last_index):
                            ci = self.text_area.index("end-1c")
                            if self.text_area.compare(li, "<", ci):
                                return ci, self.text_area.get(li, ci)
                            return ci, ""
                        current_index, new_text = self.tk_safe(_check)
                        if new_text:
                            collected_text += new_text
                            # 保留冗余：回退 len(wait_str)-1 个字符，防止等待符号被两次读取切开
                            if retain_chars:
                                def _retain(ci=current_index, rc=retain_chars, si=start_index):
                                    candidate = self.text_area.index(f"{ci} - {rc}c")
                                    if self.text_area.compare(candidate, "<", si):
                                        return si
                                    return candidate
                                last_index = self.tk_safe(_retain)
                            else:
                                last_index = current_index
                        if wait_str in collected_text:
                            hit = True
                            break
                        if show_progress:
                            remaining = max(0, int(over_time - (time.time() - start_time)))
                            if remaining != last_shown:
                                last_shown = remaining
                                _set_suffix(f" ({seq}/{total} {remaining})")
                        time.sleep(0.1)

                    if not hit:
                        all_hit = False
                        _alert("    " + tr("script.wait_str_not_found", "Wait string not received: {wait_str}    Timeout: {timeout:g} s", wait_str=wait_str, timeout=over_time))
            finally:
                self.auto_delete_lock_count -= 1
                if show_progress and suffix:
                    _set_suffix("")
            return 1 if all_hit else 0

        def run_button(button_name, wait_str, over_time, tab_name=None, interpret=True):
            """
            运行【按键发送】区域里某个已有按键保存的多行内容，行为与点击该按键一致。
            button_name : 按键上显示的名字
            wait_str    : 普通命令发送后等待的字符串（设备提示符，如 $ 或 #）
            over_time   : 普通命令的等待超时秒数
            tab_name    : 可选，指定标签页，用于区分重名按键
            interpret   : 可选，默认 True。True 时按键里的 wait / wait for /
                          show_str / set_port / visa_xxx 等会像点按键那样被执行；
                          False 时所有行一律原样发送到串口。
            返回 1（每次等待都成功）或 0（有等待超时 / 参数错误 / 找不到按键）。
            """
            if not button_name or not str(button_name).strip():
                self.tk_safe(lambda: messagebox.showwarning(
                    "Warning", tr("script.run_button_name_required", "run_button requires a button name."), parent=self.root))
                return 0
            if not _check_run_lines_args("run_button", wait_str, over_time):
                return 0

            def _find_buttons():
                found = []
                for tab_id in self.notebook.tabs():
                    t_name = self.notebook.tab(tab_id, "text")
                    if tab_name is not None and t_name != tab_name:
                        continue
                    frame = self.notebook.nametowidget(tab_id)
                    for child in frame.winfo_children():
                        if isinstance(child, tk.Button) and child.cget("text") == button_name:
                            found.append((t_name, getattr(child, "custom_data", "") or ""))
                return found

            matches = self.tk_safe(_find_buttons)
            if not matches:
                where = (tr("script.where_tab", "tab {tab}", tab=tab_name) if tab_name
                         else tr("script.where_all_tabs", "all tabs"))
                self.tk_safe(lambda: messagebox.showwarning(
                    "Warning",
                    tr("script.button_not_found",
                       "No button named {button} found in {where}.\n\n"
                       "Make sure the matching key file is loaded and the button name matches exactly.",
                       where=where, button=button_name),
                    parent=self.root))
                return 0
            if len(matches) > 1:
                tabs_str = tr("script.list_sep", ", ").join(m[0] for m in matches)
                self.tk_safe(lambda ts=tabs_str: messagebox.showwarning(
                    "Warning",
                    tr("script.button_ambiguous",
                       "Several buttons are named {button} (in {tabs}).\n\n"
                       "Use the tab_name parameter to choose a tab, e.g.:\n",
                       button=button_name, tabs=ts)
                    + f'run_button("{button_name}", "$", 20, tab_name="Tab 1")',
                    parent=self.root))
                return 0

            tab_of, data = matches[0]
            desc = tr("script.desc_button", "button {button} (tab {tab})", button=button_name, tab=tab_of)
            return _run_command_lines(desc, data.splitlines(), wait_str, over_time, interpret)

        def send_commands_from_file(file_name, wait_str, over_time, interpret=True):
            """
            从一个纯文本文件里逐行读取内容并执行，规则与按键发送完全相同。
            file_name  : 绝对路径，或相对【脚本路径】输入框的文件名
            wait_str   : 普通命令发送后等待的字符串（设备提示符，如 $ 或 #）
            over_time  : 普通命令的等待超时秒数
            interpret  : 可选，默认 True。True 时文件里的 wait / wait for /
                         show_str / set_port / visa_xxx 等会被执行；
                         False 时所有行一律原样发送到串口。
            返回 1（每次等待都成功）或 0（有等待超时 / 参数错误 / 文件读不到）。
            """
            if not file_name or not str(file_name).strip():
                self.tk_safe(lambda: messagebox.showwarning(
                    "Warning", tr("script.file_name_required", "send_commands_from_file requires a file name."), parent=self.root))
                return 0
            if not _check_run_lines_args("send_commands_from_file", wait_str, over_time):
                return 0

            path = str(file_name).strip()
            if not os.path.isabs(path):
                base = self.tk_safe(lambda: self.multi_script_path_entry.get().strip())
                if base:
                    path = os.path.join(base, path)
            path = os.path.abspath(path)
            if not os.path.isfile(path):
                self.tk_safe(lambda p=path: messagebox.showwarning(
                    "Warning",
                    tr("script.cmd_file_not_found",
                       "Command file not found:\n\n{path}\n\n"
                       "Relative names are resolved against the script path field; an absolute path also works.",
                       path=p),
                    parent=self.root))
                return 0

            content = None
            for enc in ("utf-8-sig", "gbk"):
                try:
                    with open(path, "r", encoding=enc) as f:
                        content = f.read()
                    break
                except UnicodeDecodeError:
                    continue
                except Exception as e:
                    self.tk_safe(lambda err=e, p=path: messagebox.showerror(
                        tr("common.error", "Error"), tr("script.cmd_file_read_failed", "Failed to read command file:\n\n{error}\n\n{path}", error=err, path=p), parent=self.root))
                    return 0
            if content is None:
                # utf-8 和 gbk 都解不开，退化成替换非法字节，至少能跑
                with open(path, "r", encoding="utf-8", errors="replace") as f:
                    content = f.read()

            desc = tr("script.desc_file", "file {name}", name=os.path.basename(path))
            return _run_command_lines(desc, content.splitlines(), wait_str, over_time, interpret)

        def show_date_time():
            self.tk_safe(lambda:self.text_area.insert(tk.END, str(datetime.now()) + "\n"))
            self.tk_safe(lambda:self._auto_scroll())

        def get_last_n_lines(line_amount):
            if line_amount<1:
                return None
            end_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
            start_index = self.tk_safe(lambda:self.text_area.index(f"{end_index} - {line_amount} lines"))
            text_to_return = self.tk_safe(lambda:self.text_area.get(start_index,end_index))
            return text_to_return

        def get_future_n_lines_or_till_overtime(line_amount,over_time):
            if line_amount<1:
                return None
            if over_time <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Over time must be positive.", parent=self.root))

                return None

            collected_text = ""   # 新增
            # 锁计数的自增必须紧贴 try，否则中间任何一句抛异常都会让 finally 不执行，
            # 锁永久泄漏、自动清屏失效
            self.auto_delete_lock_count += 1
            try:
                self.script_wait_for_new_text = ""
                start_time = time.time()
                last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                while time.time() - start_time < over_time:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    #self.root.update_idletasks()
                    current_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                    if self.tk_safe(lambda:self.text_area.compare(last_index, ">", current_index)):
                        #print(f"get_future_lines function failed due to last index bigger than current index.\n")
                        self.tk_safe(lambda: messagebox.showerror(tr("script.exec_error_title", "Script Error"), "get_future_lines function failed due to last index bigger than current index.", parent=self.root))

                        return None
                    if self.tk_safe(lambda:self.text_area.compare(last_index, "==", current_index)):
                        self.script_wait_for_new_text = ""
                    else:
                        try:
                            self.script_wait_for_new_text = self.tk_safe(lambda:self.text_area.get(last_index, current_index))
                        except Exception as e:
                            #print(f"get text fault, index might be changed and not corrected right: {e}")
                            self.script_wait_for_new_text = ""
                    last_index = current_index
                    collected_text += self.script_wait_for_new_text
                    self.script_wait_for_new_text = ""
                    lines = collected_text.splitlines()
                    if len(lines) >= line_amount:
                        collected_text = '\n'.join(lines[:line_amount])
                        return collected_text
                    time.sleep(0.1)
            finally:
                self.auto_delete_lock_count -= 1
            return collected_text


        def get_future_lines_till_str_or_overtime(end_str,over_time):
            if end_str == '':
                self.tk_safe(lambda: messagebox.showwarning("Warning", "end_str must not be empty.", parent=self.root))

                return None
            if over_time <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Over time must be positive.", parent=self.root))

                return None

            collected_text = ""   # 新增
            # 锁计数的自增必须紧贴 try，否则中间任何一句抛异常都会让 finally 不执行，
            # 锁永久泄漏、自动清屏失效
            self.auto_delete_lock_count += 1
            try:
                self.script_wait_for_new_text = ""
                start_time = time.time()
                last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                while time.time() - start_time < over_time:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    #self.root.update_idletasks()
                    current_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                    if self.tk_safe(lambda:self.text_area.compare(last_index, ">", current_index)):
                        #print(f"get_future_lines function failed due to last index bigger than current index.\n")
                        self.tk_safe(lambda: messagebox.showerror(tr("script.exec_error_title", "Script Error"), "get_future_lines function failed due to last index bigger than current index.", parent=self.root))

                        return None
                    if self.tk_safe(lambda:self.text_area.compare(last_index, "==", current_index)):
                        self.script_wait_for_new_text = ""
                    else:
                        try:
                            self.script_wait_for_new_text = self.tk_safe(lambda:self.text_area.get(last_index, current_index))
                        except Exception as e:
                            #print(f"get text fault, index might be changed and not corrected right: {e}")
                            self.script_wait_for_new_text = ""
                    last_index = current_index
                    collected_text += self.script_wait_for_new_text
                    self.script_wait_for_new_text = ""
                    if end_str in collected_text:
                        return collected_text
                    time.sleep(0.1)
            finally:
                self.auto_delete_lock_count -= 1
            return collected_text



        def set_port(port_name):
            port_str = str(port_name)
            try:
                self.tk_safe(lambda: self.port_menu.set(port_str))
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror(tr("common.error", "Error"), tr("script.set_port_failed", "Failed to set port: {error}", error=e), parent=self.root))


        def set_baudrate(baud):
            baud_str = str(baud)
            try:
                self.tk_safe(lambda: self.baud_var.set(baud_str))
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror(tr("common.error", "Error"), tr("script.set_baud_failed", "Failed to set baud rate: {error}", error=e), parent=self.root))


        # This function will be injected into the user's script
        # It handles highlighting and pausing
        def _highlight_and_wait(line_nums):
            self.tk_safe(lambda: self.multi_loop_text.tag_remove("highlight", "1.0", tk.END))
            if line_nums:
                self._current_script_line = line_nums[0]
                first_line_num = line_nums[0]
                last_line_num = line_nums[-1]
                self.tk_safe(lambda: self.multi_loop_text.tag_add("highlight", f"{first_line_num}.0", f"{last_line_num}.end"))
                self.tk_safe(lambda: self.multi_loop_text.see(f"{first_line_num}.0"))
            else:
                self._current_script_line = None
            #self.root.update_idletasks()
            self.pause_event.wait()
            if self.loop_stop:
                raise StopLoopException("循环已停止")
            time.sleep(0.05) # Small pause for visual feedback

        def clear_all_highlights():
            self.tk_safe(lambda: self.multi_loop_text.tag_remove("highlight", "1.0", tk.END))

        local_namespace = {
            "open_powershell": self.open_powershell,
            "powershell_send": self.powershell_send,
            "wait_for_any": wait_for_any,
            "wait_for": wait_for,
            "wait": wait,
            "send_line": send_line,
            "re": re,
            "gui": self,
            "messagebox": messagebox,
            "StopLoopException": StopLoopException,
            "tk": tk,
            "END": tk.END,
            "toggle_serial": self.toggle_serial,
            "connect_serial": self.connect_serial,
            "close_serial": self.close_serial,
            "set_port": set_port,
            "set_baudrate": set_baudrate,
            "_highlight_and_wait": _highlight_and_wait, # Inject the helper function
            "get_last_n_lines": get_last_n_lines,
            "get_future_n_lines_or_till_overtime": get_future_n_lines_or_till_overtime,
            "get_future_lines_till_str_or_overtime": get_future_lines_till_str_or_overtime,
            "show_str": show_str,
            "show_date_time": show_date_time,
            "send_and_get": send_and_get,
            "run_button": run_button,
            "send_commands_from_file": send_commands_from_file,
            "clear_all_highlights":clear_all_highlights,
            "visa_init": self._script_visa_init,
            "visa_query": self._script_visa_query,
            "visa_write": self._script_visa_write,
            "visa_read": self._script_visa_read,
        }

        processed_script_lines = []
        
        #last_code_indent = ""  # 记录最近一行代码的缩进，用于空行缩进对齐

        for i, original_line in enumerate(original_lines):
            original_line_num = i + 1
            # 把行开头的tab转换成4个空格
            # 注意：expandtabs会替换行中所有tab，不只是开头，但一般脚本里tab都是缩进用的
            line_with_spaces = original_line.expandtabs(4)
            stripped_line = line_with_spaces.strip()
            leading_whitespace = re.match(r'^\s*', line_with_spaces).group()
            #current_indent_level = len(leading_whitespace)


            # 处理空行
            if stripped_line == "":
                # 空行的缩进用上一次有效代码行的缩进
                processed_script_lines.append(line_with_spaces)
                continue

            # 处理注释行
            if stripped_line.startswith("#"):
                processed_script_lines.append(line_with_spaces)
                continue
            
            # 结构控制语句判断逻辑
            control_keywords = ['if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally']
            # 去除末尾冒号后再判断 token
            token = stripped_line.split()[0].rstrip(":") if stripped_line.split() else ""
            is_control_stmt = (
                (token in control_keywords and stripped_line.endswith(":"))
                or token in ["pass", "break", "continue", "raise"]
            )

            if is_control_stmt:
                processed_script_lines.append(line_with_spaces)
                continue

            # 非空非注释行，更新最近代码缩进
            #last_code_indent = leading_whitespace

            low = stripped_line.lower()
            processed_line = line_with_spaces # Default to original if no special command

            # --- Special Command Processing ---
            # These will be replaced by the Python function calls
            if low == "open power shell":
                processed_line = f"{leading_whitespace}open_powershell()"
            elif low.startswith("power shell send "):
                arg = stripped_line[len("power shell send "):].strip()
                processed_line = f"{leading_whitespace}powershell_send({repr(arg)})"
            elif low.startswith("wait for "):
                m = re.match(r'^wait\s+for\s+(.+?)\s+for\s+(.+)$', stripped_line)
                if m:
                    target = m.group(1).strip()
                    duration = m.group(2).strip()
                    if not (target.startswith('"') or target.startswith("'")):
                        target = f'"{target}"'
                    processed_line = f"{leading_whitespace}wait_for({target}, {duration})"
            elif low.startswith("wait "):
                m = re.match(r'^wait\s+(\d+(\.\d+)?).*$', stripped_line)
                if m:
                    duration = m.group(1)
                    processed_line = f"{leading_whitespace}wait({duration})"
            elif low.startswith("send "):
                arg = stripped_line[len("send "):].strip()
                if not arg:
                    print(f"Skipping empty send command on line {original_line_num}")
                    processed_line = None # Don't add if empty send
                else:
                    if not (arg.startswith('"') or arg.startswith("'")):
                        arg = f'"{arg}"'
                    processed_line = f"{leading_whitespace}send_line({arg})"
                    # Add implicit wait after send, handled by injecting another highlight and wait call
                    if T > 0:
                         # We need to make sure this wait is at the same indentation level as the send
                        processed_script_lines.append(f"{leading_whitespace}_highlight_and_wait([])") # No line num, just a pause point
                        processed_script_lines.append(f"{leading_whitespace}wait({T/1000})")

            elif low.startswith("visa_init"):
                m = re.match(r'^visa_init\(\s*(.*\S)\s*\)$', stripped_line, re.IGNORECASE)
                if m:
                    addr = _visa_arg_to_py(m.group(1))
                    processed_line = f"{leading_whitespace}visa_init({addr})"
                else:
                    # visa_init GPIB0::5::INSTR 简写形式
                    arg = stripped_line[len("visa_init"):].strip()
                    if arg:
                        processed_line = f'{leading_whitespace}visa_init({_visa_arg_to_py(arg)})'

            elif low.startswith("visa_query"):
                # 贪婪匹配到行尾最后一个 ")"，命令内部的括号、引号不会截断
                m = re.match(r'^visa_query\(\s*(.*\S)\s*\)$', stripped_line, re.IGNORECASE)
                if m:
                    cmd = _visa_arg_to_py(m.group(1))
                    processed_line = f"{leading_whitespace}visa_query({cmd})"
                else:
                    arg = stripped_line[len("visa_query"):].strip()
                    if arg:
                        processed_line = f'{leading_whitespace}visa_query({_visa_arg_to_py(arg)})'

            elif low.startswith("visa_write"):
                # 贪婪匹配到行尾最后一个 ")"，命令内部的括号、引号不会截断
                m = re.match(r'^visa_write\(\s*(.*\S)\s*\)$', stripped_line, re.IGNORECASE)
                if m:
                    cmd = _visa_arg_to_py(m.group(1))
                    processed_line = f"{leading_whitespace}visa_write({cmd})"
                else:
                    arg = stripped_line[len("visa_write"):].strip()
                    if arg:
                        processed_line = f'{leading_whitespace}visa_write({_visa_arg_to_py(arg)})'

            elif low.startswith("visa_read"):
                processed_line = f"{leading_whitespace}visa_read()"

            elif low.startswith("wait for any "):
                 m = re.match(r'^wait\s+for\s+any\s+\[(.*?)\]\s+for\s+(.+)$', low)
                 if m:
                     targets_str = m.group(1).strip()
                     duration = m.group(2).strip()
                     try:
                         target_list = ast.literal_eval(f"[{targets_str}]")
                         if not isinstance(target_list, list) or not all(isinstance(x, str) for x in target_list):
                             raise ValueError("Invalid target list format.")
                         processed_line = f"{leading_whitespace}wait_for_any({target_list}, {duration})"
                     except (ValueError, SyntaxError) as e:
                         print(f"Error parsing wait for any target list on line {line_with_spaces}: {e}")
                         processed_line = line_with_spaces # Fallback to original if parsing fails
                 else:
                     processed_line = line_with_spaces # Fallback if regex fails


            # --- Injecting the highlight_and_wait call ---
            # Inject before the processed line
            if processed_line is not None:
                # For control flow statements (e.g., while, if) and their immediate bodies,
                # we want to highlight the *entire block* that is being executed together.
                # However, for single-line commands, just that line.

                # Determine if this line ends a block or is a new standalone statement.
                # Simplistic way: if it's a colon-ending line, or its indentation
                # is less than the previous *meaningful* line (not just a comment/empty line)
                # or if it's the very first code line.
                
                # This indentation logic will be tricky and might need refinement for all edge cases
                # A robust solution might require a full Python parser.
                # For now, let's keep it simple: inject before every executable line.
                
                # This will give "line by line" highlight for everything, which is what the user wants for wait/send
                # and also provides progress for normal python code.
                
                #processed_script_lines.append(f"{leading_whitespace}_highlight_and_wait([{original_line_num}])")
                highlight_line = f"{leading_whitespace}_highlight_and_wait([{original_line_num}])"
                processed_script_lines.append(highlight_line)
                processed_script_lines.append(processed_line)
            
            #last_indent_level = current_indent_level # Update for next iteration

        # --- Final script assembly ---
        # Wrap the processed script in a function to ensure it runs in a clean scope
        # and we can easily call it.
        # Ensure initial indentation for the _highlight_and_wait call is correct.
        
        # Add a final cleanup highlight remove after the script finishes
        #processed_script_lines.append("\ngui.multi_loop_text.tag_remove('highlight', '1.0', tk.END)\n")
        processed_script_lines.append("\nclear_all_highlights()\n")


        full_executable_script = "\n".join(processed_script_lines)
        
        # --- Execution loop ---
        iteration = 0
        self.loop_stop = False
        
        while (loop_count == 0 or iteration < loop_count) and not self.loop_stop:
            iteration += 1
            self.root.after(0, lambda i=iteration: self.current_loop_count.set(tr("main.current_loop", "Loop: {count}", count=i)))

            try:
                # 重定向 stdout 捕获 print 输出
                stdout_buffer = io.StringIO()
                stderr_buffer = io.StringIO()
                old_stdout, old_stderr = sys.stdout, sys.stderr
                sys.stdout, sys.stderr = stdout_buffer, stderr_buffer
                output_text = ""  # 提前初始化

                # 编译并执行脚本
                compiled_script = compile(full_executable_script, '<exec_script>', 'exec')
                exec(compiled_script, globals(), local_namespace)

            except StopLoopException:
                self.loop_stop = True
                output_text = stdout_buffer.getvalue()
                break

            except Exception as e:
                self.loop_stop = True
                output_text = stdout_buffer.getvalue()
                error_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                tb_str = traceback.format_exc()

                # 从 sys.exc_info() 获取 traceback，定位最后一帧 frame
                exc_type, exc_value, exc_tb = sys.exc_info()
                last_tb = exc_tb
                last_frame = None
                while last_tb:
                    last_frame = last_tb.tb_frame
                    lineno = last_tb.tb_lineno
                    last_tb = last_tb.tb_next

                # 获取出错行源码
                if last_frame:
                    filename = last_frame.f_code.co_filename
                    if filename == "<exec_script>":
                        script_lines = full_executable_script.splitlines()
                        if 0 < lineno <= len(script_lines):
                            last_tb_line = script_lines[lineno - 1].strip()
                        else:
                            last_tb_line = tr("script.err_no_line", "<cannot get line content>")
                    else:
                        import linecache
                        last_tb_line = linecache.getline(filename, lineno).strip()
                else:
                    last_tb_line = tr("script.err_unknown_line", "<unknown code line>")

                # 从代码行中解析可能的变量名
                #import re
                var_names = set(re.findall(r'\b[a-zA-Z_]\w*\b', last_tb_line))

                # 收集变量值
                vars_in_line = {}
                if last_frame:
                    for name in var_names:
                        if name in last_frame.f_locals:
                            vars_in_line[name] = repr(last_frame.f_locals[name])
                        elif name in last_frame.f_globals:
                            vars_in_line[name] = repr(last_frame.f_globals[name])
                        else:
                            vars_in_line[name] = tr("script.err_undefined", "<undefined>")
                vars_in_line_str = "\n".join([f"{k} = {v}" for k, v in vars_in_line.items()])

                # 获取 text_area 内容
                try:
                    text_area_content = self.tk_safe(lambda:self.text_area.get("1.0", tk.END))
                except Exception:
                    text_area_content = tr("script.err_no_text_area", "<cannot get text_area content>")

                # 获取所有局部变量
                try:
                    local_vars_str = "\n".join([f"{k}={v!r}" for k, v in local_namespace.items()])
                except Exception:
                    local_vars_str = tr("script.err_no_locals", "<cannot get local variables>")

                # 获取全局变量（排除内建）
                try:
                    global_vars_str = "\n".join([f"{k}={v!r}" for k, v in globals().items() if k not in ("__builtins__",)])
                except Exception:
                    global_vars_str = tr("script.err_no_globals", "<cannot get global variables>")

                # 获取 GUI 控件状态
                gui_vars_str = ""
                try:
                    gui_vars_str = "\n".join([f"{name}={entry.get()}" for name, entry in getattr(self, "entries_dict", {}).items()])
                except Exception:
                    gui_vars_str = tr("script.err_no_gui_state", "<cannot get GUI widget state>")

                # 系统信息
                system_info = tr("script.err_system_info",
                                 "Python version: {version}\nPlatform: {platform}\nCurrent dir: {cwd}",
                                 version=sys.version, platform=platform.platform(), cwd=os.getcwd())

                # 生成完整错误信息
                error_info = f"""
==== Script Execution Error ====
{tr('script.err_time', 'Time')}: {error_time}
{tr('script.err_loop_count', 'Loop count')}: {iteration}
{tr('script.err_exc_type', 'Exception type')}: {type(e).__name__}
{tr('script.err_exc_msg', 'Exception message')}: {e}
Traceback:
{tb_str}

{tr('script.err_line_info', 'Error line')}:
{last_tb_line}

{tr('script.err_line_vars', 'Variables in error line')}:
{vars_in_line_str}

{tr('script.err_print_output', 'Script output (print)')}:
{output_text}

{tr('script.err_script_content', 'Executed script content')}:
{full_executable_script}

{tr('script.err_locals', 'Local variables')}:
{local_vars_str}

{tr('script.err_globals', 'Global variables')}:
{global_vars_str}

{tr('script.err_gui_state', 'GUI widget state')}:
{gui_vars_str}

{tr('script.err_text_area', 'Current text_area content')}:
{text_area_content}

{tr('script.err_system', 'System info')}:
{system_info}
===============================
"""

                try:
                    with open("script_error_info.txt", "a", encoding="utf-8") as f:
                        f.write(error_info)
                except Exception:
                    pass

                self.tk_safe(lambda: messagebox.showerror(
                    tr("script.exec_error_title", "Script Error"),
                    tr("script.exec_error_msg",
                       "Error:\n{error}\n\n"
                       "Location:\n{line}\n\n"
                       "Details:\n{traceback}\n\n"
                       "See script_error_info.txt for more information",
                       error=e, line=last_tb_line, traceback=tb_str),
                    parent=self.root
                ))

                break
            else:
                output_text = stdout_buffer.getvalue()

            finally:
                sys.stdout, sys.stderr = old_stdout, old_stderr

        # Final cleanup regardless of how the loop ended
        self.tk_safe(lambda: self.multi_loop_text.tag_remove("highlight", "1.0", tk.END))
        print("Script execution finished.")

        self.loop_sending = False
        self.tk_safe(lambda: self.start_button.config(state=tk.NORMAL))
        self.tk_safe(lambda: self.stop_button.config(state=tk.DISABLED))
        self.tk_safe(lambda: self.pause_button.config(state=tk.DISABLED))
        # 重新开启撤销栈
        self.tk_safe(lambda:self.text_area.configure(undo=True),wait = True)

    def on_multi_loop_modified(self, event=None):
        """
        当 multi_loop_text 内容发生修改时，自动触发高亮。
        """
        # 重置 Modified 状态，否则不会再触发
        if self.multi_loop_text.edit_modified():
            self.multi_loop_text.edit_modified(False)
            self.highlight_multi_loop()

    # 新增方法：根据正则匹配函数名并应用标签

    def highlight_multi_loop(self):
        """
        在 multi_loop_text 中，将函数名（send, wait, wait for,
        open power shell, power shell send）高亮为蓝色。
        """
        widget = self.multi_loop_text
        text = widget.get("1.0", "end")  # 取全量内容

        # 清除旧标签
        widget.tag_remove("func", "1.0", "end")
        # 在整个文本中搜索所有匹配
        for m in self._func_highlight_re.finditer(text):
            # 找到本行的行首位置
            line_start = text.rfind('\n', 0, m.start()) + 1
            # 本行注释前缀：去掉缩进后看首字符
            prefix = text[line_start:m.start()].lstrip()
            if prefix.startswith('#'):
                # 注释行，跳过
                continue
            start = f"1.0+{m.start()}c"
            end   = f"1.0+{m.end()}c"
            widget.tag_add("func", start, end)

    def open_powershell(self):
        """
        打开一个新的 PowerShell 窗口，并保存句柄到 self.ps_proc。
        同时启动后台线程，将管道里的输出镜像回 PowerShell 窗口，
        既能脚本推送，也能在窗口中看到响应。
        """
        # 如果已打开且进程未退出，就不重复打开
        if getattr(self, 'ps_proc', None) and self.ps_proc.poll() is None:
            return

        try:
            # 启动 PowerShell，stdin/stdout 都走管道，同时新开控制台
            print("[ps start] launching PowerShell")
            self.ps_proc = subprocess.Popen(
                ["powershell", "-NoExit"],
                stdin = subprocess.PIPE,
                stdout= subprocess.PIPE,
                stderr= subprocess.STDOUT,
                bufsize=1,
                universal_newlines=True,
                #creationflags = subprocess.CREATE_NEW_CONSOLE
            )
            print("[ps start] launching read thread")
            # 启动镜像线程：从管道读，再写回 CONOUT$
            threading.Thread(
                target=self._read_ps_output,
                daemon=True
            ).start()

            # 发送一条测试命令
            self.ps_proc.stdin.write("Write-Output 'PowerShell Ready'\n")
            self.ps_proc.stdin.flush()

            # 原有的延时或其他初始化
            time.sleep(0.1)

        except Exception as e:
            self.tk_safe(lambda: messagebox .showerror(tr("common.error", "Error"), tr("script.ps_open_failed", "Cannot open PowerShell: {error}", error=e)))

    def _read_ps_output(self):
        #print("[_read_ps_output] thread started")
        buffer = ""
        while True:
            char = self.ps_proc.stdout.read(1)
            if not char:
                break
            buffer += char
            if char == '\n':
                self._append_text(buffer)
                buffer = ""
            elif len(buffer) > 100 and '\r' in buffer:
                # 处理类似进度条的覆盖行（以 \r 回车符结尾）
                self._append_text(buffer.strip() + "\n")
                buffer = ""

    def _append_text(self, text):
        # 不能用 strip() 判空：纯 \r 或纯转义序列的小块也要交给渲染器处理
        if not isinstance(text, str) or text == "":
            return
        """在 text_area 末尾插入文本，并自动滚动。"""
        # 使用after lambda的形式是为了让子进程不会冲突
        self.tk_safe(lambda:self.text_area.insert(tk.END, text))
        self.tk_safe(lambda:self._auto_scroll())
        # 可选：也更新发送/接收统计等

    def _auto_scroll(self):
        """如果自动滚动复选框勾选，则滚动到底部"""
        if self.auto_scroll_var.get():
            self.text_area.yview(tk.END)

    def powershell_send(self, cmd_text):
        """类方法：向已打开的 PowerShell 窗口发送命令"""
        if getattr(self, 'ps_proc', None) and self.ps_proc.stdin:
            try:
                print(f"[powershell_send] sending: {cmd_text}")
                self.ps_proc.stdin.write(cmd_text + "\n")
                self.ps_proc.stdin.flush()
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror(tr("common.error", "Error"), tr("script.ps_send_failed", "PowerShell send failed: {error}", error=e), parent=self.root))

        else:
            self.tk_safe(lambda: messagebox.showwarning(tr("common.warning", "Warning"), tr("script.ps_not_open", "Please run open power shell first"), parent=self.root))

    

    def on_closing(self):
        """
        在窗口关闭时调用，先保存当前UI设置，然后正常销毁窗口
        """
        # 检查是否有未保存的更改
        if not self.check_unsaved_changes():
            return
        self._sync_stop()
            
        # 如果自动保存正在开启，则先关闭文件
        if self.auto_save_file:
            self.auto_save_file.close()
            self.auto_save_file = None

        # 先保存当前控件值到配置文件
        self.save_setup()
        
        # 然后再销毁窗口
        self.root.destroy()

    def show_language_window(self):
        """Language -> Choose Language：列出 language 文件夹里的语言，选中后写入 ini 并重启。
        窗口文字固定用英文，选错语言时也能看懂。"""
        langs = list_languages()

        win = tk.Toplevel(self.root)
        win.withdraw()  # 先隐藏，摆好位置再显示，避免先在别处闪一下
        win.title("Choose Language")
        win.transient(self.root)
        win.resizable(False, False)
        win.attributes('-topmost', True)

        tk.Label(win, text=f"Languages found in: {LANG_DIR}", anchor="w",
                 justify="left", wraplength=360).pack(fill="x", padx=12, pady=(12, 6))

        listbox = tk.Listbox(win, height=max(3, min(10, len(langs))), exportselection=False)
        listbox.pack(fill="both", expand=True, padx=12)
        for code, name in langs:
            mark = "   (current)" if code == _LANG_CODE else ""
            listbox.insert(tk.END, f"{name}  [{code}]{mark}")
        codes = [c for c, _ in langs]
        if _LANG_CODE in codes:
            listbox.selection_set(codes.index(_LANG_CODE))
            listbox.see(codes.index(_LANG_CODE))

        def do_load():
            global _LANG_SAVE_CODE
            sel = listbox.curselection()
            if not sel:
                messagebox.showwarning("Language", "Please select a language first.", parent=win)
                return
            code = codes[sel[0]]
            if code == _LANG_CODE:
                messagebox.showinfo("Language", "This language is already in use.", parent=win)
                return
            msg = "TermPlus needs to close and restart for the new language to take effect.\n\nClose and restart now?"
            if _LANG_CODE != DEFAULT_LANG:
                msg += "\n\n" + tr("lang.restart_prompt",
                                   "TermPlus needs to close and restart for the new language to take effect.\n\nClose and restart now?")
            if not messagebox.askokcancel("Language", msg, parent=win):
                return
            # 有未保存的按键文件时先询问；取消则不切换
            if not self.check_unsaved_changes():
                return
            win.destroy()
            # 写入 ini（save_setup 会保存 _LANG_SAVE_CODE），然后关闭并重新启动
            _LANG_SAVE_CODE = code
            if self.auto_save_file:
                self.auto_save_file.close()
                self.auto_save_file = None
            self.save_setup()
            try:
                restart_app()
            except Exception as e:
                messagebox.showerror("Language",
                                     f"Language saved, but TermPlus could not restart automatically:\n{e}\n\n"
                                     "Please start TermPlus again manually.", parent=self.root)
            # 用 _root() 关闭整个程序（包括 新建窗口 打开的其他窗口）
            self.root._root().destroy()

        btn_frame = tk.Frame(win)
        btn_frame.pack(fill="x", padx=12, pady=12)
        ttk.Button(btn_frame, text="Cancel", width=10, command=win.destroy).pack(side="right")
        ttk.Button(btn_frame, text="Load", width=10, command=do_load).pack(side="right", padx=(0, 8))
        listbox.bind("<Double-Button-1>", lambda e: do_load())

        place_on_parent_monitor(win, self.root)
        win.deiconify()
        win.grab_set()

    def update_time(self):
        current_date = time.strftime("%Y-%m-%d")
        current_time = time.strftime("%H:%M:%S")
        self.date_label.config(text=current_date)
        self.time_label.config(text=current_time)
        # 每隔 1000 毫秒更新一次
        self.date_label.after(1000, self.update_time)

    # 自动保存路径按键
    def choose_auto_save_path(self):
        try:
            path = self.root.tk.call('tk_chooseDirectory')
        except Exception:
            path = filedialog.askdirectory(title=tr("file.select_folder", "Select Folder"))
        if path:
            self.auto_save_path_entry.delete(0, tk.END)
            self.auto_save_path_entry.insert(0, path)
            self.auto_save_path_entry.icursor(tk.END)      # 将光标移到末尾
            self.auto_save_path_entry.update_idletasks()     # 强制更新界面
            self.auto_save_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
    
    def choose_script_path(self):
        # 尝试使用 tk_chooseDirectory 并设置右下角按钮文本为“选择”
        try:
            path = self.root.tk.call('tk_chooseDirectory')
        except Exception:
            path = filedialog.askdirectory(title=tr("file.select_folder", "Select Folder"))
        if path:
            self.script_path_entry.delete(0, tk.END)
            self.script_path_entry.insert(0, path)
            self.script_path_entry.icursor(tk.END)      # 将光标移到文本末尾
            self.script_path_entry.update_idletasks()     # 强制更新界面
            self.script_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
            # 扫描路径下所有后缀为 .ts 的文件
            try:
                ts_files = [f for f in os.listdir(path)
                            if os.path.isfile(os.path.join(path, f)) and f.lower().endswith('.ts')]
            except Exception as e:
                ts_files = []
            # 更新下拉选择框
            self.script_file_combo['values'] = ts_files
            if ts_files:
                self.script_file_combo.current(0)

    def multi_choose_script_path(self):
        # 尝试使用 tk_chooseDirectory 并设置右下角按钮文本为“选择”
        try:
            path = self.root.tk.call('tk_chooseDirectory')
        except Exception:
            path = filedialog.askdirectory(title=tr("file.select_folder", "Select Folder"))
        if path:
            self.multi_script_path_entry.delete(0, tk.END)
            self.multi_script_path_entry.insert(0, path)
            self.multi_script_path_entry.icursor(tk.END)      # 将光标移到文本末尾
            self.multi_script_path_entry.update_idletasks()     # 强制更新界面
            self.multi_script_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
            # 扫描路径下所有后缀为 .ts 的文件
            try:
                ts_files = [f for f in os.listdir(path)
                            if os.path.isfile(os.path.join(path, f)) and f.lower().endswith('.txt')]
            except Exception as e:
                ts_files = []
            # 更新下拉选择框
            self.multi_script_file_combo['values'] = ts_files
            if ts_files:
                self.multi_script_file_combo.current(0)

    def check_unsaved_changes(self):
        """检查是否有未保存的脚本修改"""
        if self.script_modified:
            # 创建自定义对话框
            dialog = tk.Toplevel(self.root)
            dialog.title(tr("file.unsaved_title", "Unsaved Changes"))
            dialog.geometry("300x120")
            dialog.resizable(False, False)
            dialog.grab_set()  # 模态对话框
            
            # 居中显示
            dialog.update_idletasks()
            x = (dialog.winfo_screenwidth() - dialog.winfo_width()) // 2
            y = (dialog.winfo_screenheight() - dialog.winfo_height()) // 2
            dialog.geometry(f"+{x}+{y}")
            
            # 消息文本
            tk.Label(dialog, text=tr("file.unsaved_msg", "The current script has unsaved changes. Save before continuing?"), 
                    wraplength=280, justify="center").pack(pady=20)
            
            # 按钮框架
            btn_frame = tk.Frame(dialog)
            btn_frame.pack(pady=10)
            
            result = [None]  # 用列表存储结果，便于在内部函数中修改
            
            def save_and_continue():
                result[0] = "save"
                dialog.destroy()
                
            def dont_save():
                result[0] = "dont_save"
                dialog.destroy()
                
            def cancel():
                result[0] = "cancel"
                dialog.destroy()
            
            # 三个按钮
            tk.Button(btn_frame, text=tr("common.save", "Save"), command=save_and_continue, width=10).pack(side="left", padx=5)
            tk.Button(btn_frame, text=tr("file.dont_save", "Don't Save"), command=dont_save, width=12).pack(side="left", padx=5)
            tk.Button(btn_frame, text=tr("common.cancel", "Cancel"), command=cancel, width=10).pack(side="left", padx=5)
            
            # 等待用户选择
            dialog.wait_window()
            
            if result[0] == "save":
                # 保存失败（如共享盘连不上）时不继续，避免关闭窗口或加载别的文件后丢掉修改
                return bool(self.save_current_script())
            elif result[0] == "dont_save":
                return True
            else:  # cancel
                return False
        return True

    def save_current_script(self):
        """保存当前正在编辑的脚本文件。返回 True 表示保存成功。"""
        if not self.current_script_path or not self.current_script_file:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("file.no_current_script", "Cannot determine the script file being edited"), parent=self.root)

            return False
        if self._sync_enabled:
            # 自动同步开着：和 ts 文件合并后再保存，并等保存完成
            return self._sync_blocking_save()
            
        full_path = os.path.join(self.current_script_path, self.current_script_file)
        
        # 构造脚本文本内容
        script_content = ""
        # 遍历 Notebook 中所有标签页
        for tab_id in self.notebook.tabs():
            tab_widget = self.notebook.nametowidget(tab_id)
            tab_name = self.notebook.tab(tab_id, "text")
            script_content += f"<tab {{{tab_name}}}>\n"
            # 收集当前标签页中所有按钮，按 grid 的行列排序
            buttons = []
            for child in tab_widget.winfo_children():
                if isinstance(child, tk.Button):
                    info = child.grid_info()
                    row = int(info.get("row", 0))
                    column = int(info.get("column", 0))
                    idx = row * 6 + column  # 假设按钮排列为 5 行 6 列
                    buttons.append((idx, child))
            # 按钮按索引排序
            buttons.sort(key=lambda x: x[0])
            # 仅输出按钮名称不为空的按钮
            for idx, btn in buttons:
                btn_name = btn.cget("text")
                btn_text = btn.custom_data
                if btn_name.strip():
                    script_content += f"<button {{{idx}}} {{{btn_name}}}>\n"
                    script_content += "<data>\n"
                    script_content += f"{btn_text}\n"
                    script_content += "</data>\n"
                    script_content += "<icon>\n\n</icon>\n"
                    script_content += "<desc>\n\n</desc>\n"
                    script_content += "</button>\n"
            script_content += "</tab>\n\n"
        
        try:
            # 获取文件编码
            current_file_path = os.path.join(self.current_script_path, self.current_script_file)
            file_encoding = self.file_encodings.get(current_file_path, "gbk")
            with open(full_path, "w", encoding=file_encoding) as f:
                f.write(script_content)
            self._sync_reset_base_from_content(script_content, full_path)
            # 保存成功后重置修改标记
            self.script_modified = False
            messagebox.showinfo(tr("common.info", "Info"), tr("file.script_saved", "Script saved successfully"), parent=self.root)
            return True

        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("file.save_script_failed", "Failed to save script: {error}", error=e), parent=self.root)
            return False


    def _update_history_button(self, idx):
        btn = self.history_buttons[idx]
        path = self.history_paths[idx]
        strike = self.history_strike[idx]
        if not path:
            btn.config(text=str(idx+1), width=2, font=(ui_font_family(), 9))
        else:
            name = os.path.basename(path)
            display = name if len(name) <= 20 else name[:20] + '...'
            w = max(2, min(20, len(display)))
            if strike:
                btn.config(text=display, width=w, font=(ui_font_family(), 9, 'overstrike'))
            else:
                btn.config(text=display, width=w, font=(ui_font_family(), 9))

    def _show_history_menu(self, event, idx):
        menu = tk.Menu(self.root, tearoff=0)
        menu.add_command(label=tr("history.clear", "Clear"), command=lambda: self._clear_history(idx),
                         state="normal" if self.history_paths[idx] else "disabled")
        menu.add_command(label=tr("history.clear_all", "Clear All"), command=self._clear_all_history,
                         state="normal" if any(self.history_paths) else "disabled")
        menu.tk_popup(event.x_root, event.y_root)
        menu.grab_release()

    def _clear_history(self, idx):
        """清掉一个历史记录；后面的往前移，有记录的始终排在前面。"""
        self.history_paths.pop(idx)
        self.history_paths.append("")
        self.history_strike.pop(idx)
        self.history_strike.append(False)
        for i in range(5):
            self._update_history_button(i)

    def _clear_all_history(self):
        self.history_paths = [""] * 5
        self.history_strike = [False] * 5
        for i in range(5):
            self._update_history_button(i)

    def _push_history(self, full_path):
        if not full_path:
            return
        # 如果要推入的文件就是当前加载的文件，不推入
        cur_dir = self.script_path_entry.get().strip()
        cur_file = self.script_file_combo.get().strip()
        if cur_dir and cur_file:
            cur_full = os.path.join(cur_dir, cur_file)
            if full_path == cur_full:
                return
        # 如果已在历史里，不移动位置，不做任何操作（交换逻辑不需要提前）
        if full_path in self.history_paths:
            return
        # 不在历史里，插入位置1，丢弃位置5
        self.history_paths.insert(0, full_path)
        self.history_paths.pop()
        self.history_strike.insert(0, False)
        self.history_strike.pop()
        for i in range(5):
            self._update_history_button(i)

    def _load_from_history(self, idx):
        full_path = self.history_paths[idx]
        if not full_path:
            return
        if not self.check_unsaved_changes():
            return
        if not os.path.isfile(full_path):
            messagebox.showwarning(tr("common.warning", "Warning"), tr("file.history_missing", "File does not exist or has been moved:\n{path}", path=full_path), parent=self.root)
            self.history_strike[idx] = True
            self._update_history_button(idx)
            return
        # 获取当前文件，准备和该按键做交换
        old_path = self.current_script_path
        old_file = self.current_script_file
        # 填入路径和文件名，执行加载
        dir_path = os.path.dirname(full_path)
        file_name = os.path.basename(full_path)
        self.script_path_entry.delete(0, tk.END)
        self.script_path_entry.insert(0, dir_path)
        self.script_path_entry.xview_moveto(1.0)
        try:
            ts_files = [f for f in os.listdir(dir_path)
                        if os.path.isfile(os.path.join(dir_path, f)) and f.lower().endswith('.ts')]
        except Exception:
            ts_files = []
        self.script_file_combo['values'] = ts_files
        self.script_file_combo.set(file_name)
        # 加载前先把历史按键的文件设为当前文件，避免 load_script 里的推入历史逻辑干扰
        self.current_script_path = dir_path
        self.current_script_file = file_name
        # 调用 load_script（此时 current_script_file 已是新文件，不会推入历史）
        self.load_script()
        # 加载成功后，把旧文件写入该按键（实现交换）
        if os.path.isfile(full_path):
            if old_path and old_file:
                self.history_paths[idx] = os.path.join(old_path, old_file)
            else:
                self.history_paths[idx] = ""
            self.history_strike[idx] = False
            self._update_history_button(idx)

    def load_script(self):
        # 检查是否有未保存的更改
        if not self.check_unsaved_changes():
            return
            
        dir_path = self.script_path_entry.get().strip()
        file_name = self.script_file_combo.get().strip()
        if not dir_path or not file_name:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("main.select_script_path_file", "Please select a script path and a script file."), parent=self.root)

            return
        full_path = os.path.join(dir_path, file_name)
        
        # 尝试多种编码格式
        encodings = ['gbk', 'utf-8', 'utf-8-sig', 'latin-1']
        content = None
        used_encoding = "gbk"  # 默认编码
        
        for encoding in encodings:
            try:
                with open(full_path, "r", encoding=encoding) as f:
                    content = f.read()
                used_encoding = encoding  # 记录成功的编码
                break
            except UnicodeDecodeError:
                continue
            except Exception as e:
                messagebox.showerror(tr("common.error", "Error"), tr("main.load_script_failed", "Failed to load script: {error}", error=e), parent=self.root)

                return
        
        # 如果所有编码都失败，使用gbk并处理错误字符
        if content is None:
            try:
                with open(full_path, "r", encoding="gbk", errors="replace") as f:
                    content = f.read()
                used_encoding = "gbk"
            except Exception as e:
                messagebox.showerror(tr("common.error", "Error"), tr("main.load_script_failed", "Failed to load script: {error}", error=e), parent=self.root)

                return
        # 使用正则表达式解析标签页和按钮信息
        tab_pattern = re.compile(r'<tab\s*\{([^}]+)\}>(.*?)</tab>', re.DOTALL)
        button_pattern = re.compile(r'<button\s*\{(\d+)\}\s*\{([^}]+)\}>(.*?)</button>', re.DOTALL)
        data_pattern = re.compile(r'<data>\s*(.*?)\s*</data>', re.DOTALL)
        tabs = tab_pattern.findall(content)
        if not tabs:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("keys.no_tabs_found", "No tab definitions found"), parent=self.root)

            return
        # 加载会替换所有按键；有打开的编辑窗口时先确认，确认后关掉它们
        open_editors = [cid for cid, win in self.cell_edit_windows.items() if self._widget_alive(win)]
        if open_editors and not messagebox.askyesno(
                tr("common.confirm", "Confirm"),
                tr("keys.load_close_editors",
                   "Loading will close {count} open button edit window(s). Unsaved edits in them will be lost.\n\nContinue?",
                   count=len(open_editors)),
                parent=self.root):
            return
        # 记住当前选中的标签页，加载后切回去（先按名称找，找不到按位置）
        prev_name, prev_index = None, 0
        try:
            prev = self.notebook.select()
            if prev:
                prev_name = self.notebook.tab(prev, "text")
                prev_index = self.notebook.index(prev)
        except tk.TclError:
            pass
        # 清除现有标签页：关掉编辑窗口并销毁，避免旧按键一直留在内存里
        self._clear_key_undo()
        for tab in self.notebook.tabs():
            frame = self.notebook.nametowidget(tab)
            self.notebook.forget(tab)
            self._destroy_tab_frame(frame)
        for cid in list(self.cell_edit_windows):
            self._close_edit_window(cid)
        # 对每个标签页创建新的标签
        for tab_name, tab_content in tabs:
            button_info = {}  # key: 按钮索引(int)，value: (按钮名称, 按钮文本)
            buttons = button_pattern.findall(tab_content)
            for btn_index, btn_name, btn_content in buttons:
                data_match = data_pattern.search(btn_content)
                btn_text = data_match.group(1).strip() if data_match else ""
                button_info[int(btn_index)] = (btn_name, btn_text)
            self.create_tab_from_script(tab_name, button_info)
        new_tabs = self.notebook.tabs()
        target = None
        if prev_name is not None:
            target = next((t for t in new_tabs if self.notebook.tab(t, "text") == prev_name), None)
        if target is None and new_tabs:
            target = new_tabs[min(prev_index, len(new_tabs) - 1)]
        if target is not None:
            self.notebook.select(target)
        
        # 加载成功前，把被换下的旧文件推入历史
        old_path = self.current_script_path
        old_file = self.current_script_file
        if old_path and old_file:
            old_full = os.path.join(old_path, old_file)
            # 只有旧文件与新文件不同时才推入历史
            if old_full != full_path:
                self._push_history(old_full)
        # 加载成功后更新当前编辑文件信息并重置修改标记
        self.current_script_path = dir_path
        self.current_script_file = file_name
        self.file_encodings[full_path] = used_encoding  # 记录文件编码
        # 自动同步的基准：刚加载的内容
        self._sync_busy = False
        self._sync_deferred = None
        self._sync_reset_base_from_content(content, full_path)
        self.script_modified = False

    def save_script(self):
        # 获取脚本文件名，如果为空则提示警告
        file_name = self.script_file_combo.get().strip()
        if not file_name:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("keys.no_save_file", "No file specified to save"), parent=self.root)

            return
        # 获取脚本路径
        dir_path = self.script_path_entry.get().strip()
        if not dir_path:
            messagebox.showwarning(tr("common.warning", "Warning"), tr("keys.no_script_path", "No script path specified"), parent=self.root)

            return
        full_path = os.path.join(dir_path, file_name)
        # 自动同步开着、保存的就是当前同步的文件：走合并保存，完成后弹“保存成功”
        if self._sync_enabled and self._same_path(full_path, self._sync_path()):
            self._sync_manual = True
            self._sync_kick()
            return
    
        # 构造脚本文本内容
        script_content = ""
        # 遍历 Notebook 中所有标签页
        for tab_id in self.notebook.tabs():
            tab_widget = self.notebook.nametowidget(tab_id)
            tab_name = self.notebook.tab(tab_id, "text")
            script_content += f"<tab {{{tab_name}}}>\n"
            # 收集当前标签页中所有按钮，按 grid 的行列排序
            buttons = []
            for child in tab_widget.winfo_children():
                if isinstance(child, tk.Button):
                    info = child.grid_info()
                    row = int(info.get("row", 0))
                    column = int(info.get("column", 0))
                    idx = row * 6 + column  # 假设按钮排列为 5 行 6 列
                    buttons.append((idx, child))
            # 按钮按索引排序
            buttons.sort(key=lambda x: x[0])
            # 仅输出按钮名称不为空的按钮
            for idx, btn in buttons:
                btn_name = btn.cget("text")
                btn_text = btn.custom_data
                if btn_name.strip():
                    script_content += f"<button {{{idx}}} {{{btn_name}}}>\n"
                    script_content += "<data>\n"
                    script_content += f"{btn_text}\n"
                    script_content += "</data>\n"
                    script_content += "<icon>\n\n</icon>\n"
                    script_content += "<desc>\n\n</desc>\n"
                    script_content += "</button>\n"
            script_content += "</tab>\n\n"
    
        try:
            # 获取文件编码
            file_encoding = self.file_encodings.get(full_path, "gbk")
            with open(full_path, "w", encoding=file_encoding) as f:
                f.write(script_content)
            # 保存到哪个文件，之后编辑的就是哪个文件（另存为也走这里）；同步的基准也换成它
            self.current_script_path = dir_path
            self.current_script_file = file_name
            self.file_encodings[full_path] = file_encoding
            self._sync_reset_base_from_content(script_content, full_path)
            # 保存成功后重置修改标记
            self.script_modified = False
            messagebox.showinfo(tr("common.info", "Info"), tr("file.script_saved", "Script saved successfully"), parent=self.root)

        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"), tr("file.save_script_failed", "Failed to save script: {error}", error=e), parent=self.root)


    def save_as_new_script(self):
        # 弹出新窗口，允许选择保存路径和输入文件名
        new_win = tk.Toplevel(self.root)
        new_win.title(tr("keys.save_as_new_title", "Save as New Script"))
        new_win.grab_set()  # 模态窗口

        tk.Label(new_win, text=tr("keys.save_path", "Save path:")).grid(row=0, column=0, padx=5, pady=5, sticky="w")
        path_entry = tk.Entry(new_win, width=40)
        path_entry.grid(row=0, column=1, padx=5, pady=5)
        # 新增：默认值为当前脚本路径文本框的值
        default_path = self.script_path_entry.get().strip()
        path_entry.insert(0, default_path)
    
        tk.Button(new_win, text=tr("keys.browse", "Browse"), command=lambda: self.choose_folder_in_win(path_entry)).grid(row=0, column=2, padx=5, pady=5)

        tk.Label(new_win, text=tr("keys.file_name_ts", "File name (.ts):")).grid(row=1, column=0, padx=5, pady=5, sticky="w")
        file_entry = tk.Entry(new_win, width=40)
        file_entry.grid(row=1, column=1, padx=5, pady=5)

        def do_save():
            folder = path_entry.get().strip()
            file_name = file_entry.get().strip()
            if not folder or not file_name:
                messagebox.showwarning(tr("common.warning", "Warning"), tr("keys.select_path_and_name", "Please select a save path and enter a file name"), parent=new_win)
                return
            if not file_name.lower().endswith(".ts"):
                file_name += ".ts"
            full_path = os.path.join(folder, file_name)
            # 另存前，把原文件推入历史（文件名发生变化时）
            orig_file = self.script_file_combo.get().strip()
            orig_path = self.script_path_entry.get().strip()
            if orig_file and orig_path:
                orig_full = os.path.join(orig_path, orig_file)
                if orig_full != full_path:
                    self._push_history(orig_full)
            try:
                # 创建新文件（若已存在则覆盖为空）
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write("")
            except Exception as e:
                messagebox.showerror(tr("common.error", "Error"), tr("keys.create_file_failed", "Cannot create file: {error}", error=e), parent=new_win)
                return
            # 更新主窗口中的脚本路径文本框
            self.script_path_entry.delete(0, tk.END)
            self.script_path_entry.insert(0, folder)
            self.script_path_entry.icursor(tk.END)
            self.script_path_entry.update_idletasks()
            self.script_path_entry.xview_moveto(1.0)
            # 更新脚本文件下拉框
            try:
                ts_files = [f for f in os.listdir(folder)
                            if os.path.isfile(os.path.join(folder, f)) and f.lower().endswith('.ts')]
            except Exception:
                ts_files = []
            self.script_file_combo['values'] = ts_files
            if file_name in ts_files:
                self.script_file_combo.set(file_name)
            else:
                ts_files.append(file_name)
                self.script_file_combo['values'] = ts_files
                self.script_file_combo.set(file_name)
            new_win.destroy()
            # 调用保存脚本功能，将当前标签页信息保存到刚创建的文件中
            self.save_script()

        tk.Button(new_win, text=tr("common.save", "Save"), command=do_save).grid(row=2, column=0, columnspan=3, padx=5, pady=10)
    
    def choose_folder_in_win(self, entry_widget):
        try:
            folder = self.root.tk.call('tk_chooseDirectory')
        except Exception:
            folder = filedialog.askdirectory(title=tr("file.select_folder", "Select Folder"))
        if folder:
            entry_widget.delete(0, tk.END)
            entry_widget.insert(0, folder)

    def create_tab_from_script(self, tab_name, button_info):
        tab_frame = tk.Frame(self.notebook)
        self.notebook.add(tab_frame, text=tab_name)
        # 为每一列设置权重，使其在窗口调整大小时按比例扩展
        for col in range(6):
            tab_frame.grid_columnconfigure(col, weight=1)
        # 为每一行设置权重（如果需要按钮在垂直方向上也随窗口调整大小）
        for row in range(5):
            tab_frame.grid_rowconfigure(row, weight=1)
        # 创建5行6列共30个按钮，按钮索引0~29
        # 创建5行6列共30个按钮，按钮索引0~29
        for idx in range(30):
            row = idx // 6
            col = idx % 6
            cell = tk.Button(tab_frame, text="", anchor="w", justify="left", relief="groove")
            cell.grid(row=row, column=col, padx=1, pady=1, sticky="nsew")
            cell.custom_data = ""
            self._bind_cell(cell)
            # 如果当前索引在脚本中有定义，则更新按钮名称和文本
            if idx in button_info:
                btn_name, btn_text = button_info[idx]
                cell.config(text=btn_name)
                cell.custom_data = btn_text

    def add_tab(self, title):
        tab_frame = tk.Frame(self.notebook)
        self.notebook.add(tab_frame, text=title)
        # 为每一列设置权重，使其在窗口调整大小时按比例扩展
        for j in range(6):
            tab_frame.grid_columnconfigure(j, weight=1)
        # 创建5*6按钮网格，每个按钮默认为空，宽度16, 高度1
        for i in range(5):
            tab_frame.grid_rowconfigure(i, weight=1)  # 设置行的权重
            for j in range(6):
                cell = tk.Button(tab_frame, text="", height=1, anchor="w", justify="left", relief="groove") #width=16 
                cell.grid(row=i, column=j, padx=1, pady=1, sticky="nsew")  # 使用 sticky="nsew"
                cell.custom_data = ""  # 存储多行待发送内容
                self._bind_cell(cell)

    # ------------------------------------------------ 按键拖动交换 / tab 拖动排序
    DRAG_THRESHOLD = 5      # 按下后移动超过这么多像素才算拖动，避免点击时手抖
    DRAG_GHOST_ALPHA = 0.6  # 跟随光标的虚影透明度

    def _bind_cell(self, cell):
        """给按键区的一个按钮绑定：左键点击发送、右键菜单、左键拖动交换。"""
        cell.config(command=lambda c=cell: self.cell_send(c))
        cell.bind("<Button-3>", lambda event, c=cell: self.show_cell_menu(event, c))
        # add="+"：不覆盖 Button 自带的按下/松开行为
        cell.bind("<ButtonPress-1>", lambda event, c=cell: self._cell_drag_press(event, c), add="+")
        cell.bind("<B1-Motion>", self._cell_drag_motion, add="+")
        cell.bind("<ButtonRelease-1>", self._cell_drag_release, add="+")

    # ---------------- 虚影与公共状态
    def _drag_passed_threshold(self, event):
        d = self._drag
        return (abs(event.x_root - d["x0"]) >= self.DRAG_THRESHOLD
                or abs(event.y_root - d["y0"]) >= self.DRAG_THRESHOLD)

    def _create_drag_ghost(self, text, width, height, **label_opts):
        """创建跟随光标的半透明虚影（无边框的小窗口）。"""
        ghost = tk.Toplevel(self.root)
        ghost.overrideredirect(True)
        try:
            ghost.attributes("-alpha", self.DRAG_GHOST_ALPHA)
            ghost.attributes("-topmost", True)
        except tk.TclError:
            pass
        tk.Label(ghost, text=text, relief="groove", bd=2, **label_opts).pack(fill="both", expand=True)
        ghost.geometry(f"{max(int(width), 1)}x{max(int(height), 1)}+-10000+-10000")
        # 万一焦点落到虚影上，Esc 照样能取消
        ghost.bind("<Escape>", self._drag_cancel)
        return ghost

    def _move_drag_ghost(self, x_root, y_root):
        d = self._drag
        ghost = d.get("ghost") if d else None
        if ghost is None:
            return
        try:
            ghost.geometry(f"+{x_root - d['off_x']}+{y_root - d['off_y']}")
        except tk.TclError:
            pass

    def _end_drag(self):
        """结束拖动：销毁虚影、恢复光标、清空状态。可以重复调用。"""
        d = self._drag
        self._drag = None
        if not d:
            return
        ghost = d.get("ghost")
        if ghost is not None:
            try:
                ghost.destroy()
            except tk.TclError:
                pass
        widget = d.get("cursor_widget")
        if widget is not None:
            try:
                widget.config(cursor=d.get("old_cursor", ""))
            except tk.TclError:
                pass

    def _start_drag_visual(self, widget, ghost):
        """进入拖动状态：显示虚影、改光标。"""
        d = self._drag
        d["active"] = True
        d["ghost"] = ghost
        try:
            d["old_cursor"] = widget.cget("cursor")
            widget.config(cursor="fleur")
            d["cursor_widget"] = widget
        except tk.TclError:
            pass

    def _drag_cancel(self, event=None):
        """拖动中按 Esc：取消本次拖动，松手后什么都不做。"""
        d = self._drag
        if not d or not d["active"] or d["cancelled"]:
            return
        d["cancelled"] = True
        ghost = d.get("ghost")
        if ghost is not None:
            try:
                ghost.destroy()
            except tk.TclError:
                pass
            d["ghost"] = None
        return "break"

    # ---------------- 按键拖动交换（同一个 tab 内）
    def _cell_drag_press(self, event, cell):
        self._end_drag()
        self._drag = {
            "kind": "cell", "source": cell,
            "x0": event.x_root, "y0": event.y_root,
            # 保持按下时光标在按钮里的相对位置，虚影看起来像把按钮拎起来
            "off_x": event.x, "off_y": event.y,
            "active": False, "cancelled": False, "ghost": None,
        }

    def _cell_drag_motion(self, event):
        d = self._drag
        if not d or d["kind"] != "cell" or d["cancelled"]:
            return
        if not d["active"]:
            if not self._drag_passed_threshold(event):
                return
            src = d["source"]
            try:
                ghost = self._create_drag_ghost(
                    src.cget("text"), src.winfo_width(), src.winfo_height(),
                    fg=src.cget("fg"), bg=src.cget("bg"), font=src.cget("font"),
                    anchor="w", justify="left")
            except tk.TclError:
                self._end_drag()
                return
            self._start_drag_visual(src, ghost)
        self._move_drag_ghost(event.x_root, event.y_root)

    def _cell_drag_release(self, event):
        d = self._drag
        if not d or d["kind"] != "cell":
            return
        was_active, cancelled, source = d["active"], d["cancelled"], d["source"]
        # 先销毁虚影再找目标，否则 winfo_containing 可能拿到虚影窗口
        self._end_drag()
        if not was_active:
            return  # 没拖动，就是普通点击，交给 Button 自己的 command

        # 拖动过（包括取消）：如果松手又回到了源按钮上，Button 会执行 command，这里吞掉它。
        # Button 的 command 在本回调之后同步执行，after_idle 再把标记清掉，不影响下一次点击。
        self._suppress_cell_click = True
        self.root.after_idle(self._clear_cell_click_suppress)
        if cancelled:
            return

        try:
            target = self.root.winfo_containing(event.x_root, event.y_root)
        except (tk.TclError, KeyError):
            target = None
        if (target is None or target is source
                or not isinstance(target, tk.Button)
                or not hasattr(target, "custom_data")
                or target.master is not source.master):   # 只在同一个 tab 内交换
            return
        # 放到松手事件处理完之后执行，弹窗不会让按钮卡在按下状态
        self.root.after_idle(lambda: self._swap_cells(source, target))

    def _clear_cell_click_suppress(self):
        self._suppress_cell_click = False

    def _cell_has_open_editor(self, cell):
        win = self.cell_edit_windows.get(id(cell))
        if win is None:
            return False
        try:
            return bool(win.winfo_exists())
        except tk.TclError:
            return False

    def _swap_cells(self, a, b):
        """交换两个按键的名称和多行内容。"""
        try:
            if not (a.winfo_exists() and b.winfo_exists()):
                return
            a_text, b_text = a.cget("text"), b.cget("text")
        except tk.TclError:
            return
        a_data, b_data = a.custom_data or "", b.custom_data or ""
        a_empty = not a_text.strip() and not a_data.strip()
        b_empty = not b_text.strip() and not b_data.strip()
        if a_empty and b_empty:
            return  # 两边都是空按钮，不做任何操作
        if self._cell_has_open_editor(a) or self._cell_has_open_editor(b):
            messagebox.showwarning(
                tr("common.warning", "Warning"),
                tr("cell.swap_editor_open",
                   "This button has an edit window open. Close the edit window first, then drag to swap."),
                parent=self.root)
            return
        self._push_undo({"type": "cells", "items": [(a, a_text, a_data), (b, b_text, b_data)]})
        a.config(text=b_text)
        a.custom_data = b_data
        b.config(text=a_text)
        b.custom_data = a_data
        self.script_modified = True

    # ---------------- tab 拖动排序
    def _notebook_tab_at(self, x, y):
        """返回 notebook 坐标 (x, y) 处的 tab 索引，不在任何 tab 上时返回 None。"""
        try:
            # 直接调 Tcl：不在 tab 上时返回空字符串，Python 封装的 index() 会因此报错
            v = self.notebook.tk.call(self.notebook._w, "index", f"@{int(x)},{int(y)}")
        except tk.TclError:
            return None
        if v == "" or v is None:
            return None
        try:
            return int(v)
        except (TypeError, ValueError):
            return None

    def _notebook_tab_span(self, idx, x, y):
        """从 (x, y) 向左右逐像素扫描，得到第 idx 个 tab 的左右边界（含）。"""
        width = self.notebook.winfo_width()
        left = right = int(x)
        while left > 0 and self._notebook_tab_at(left - 1, y) == idx:
            left -= 1
        while right < width - 1 and self._notebook_tab_at(right + 1, y) == idx:
            right += 1
        return left, right

    def _notebook_header_height(self):
        """标签栏的高度：当前页内容区的顶部（相对 notebook）。取不到时返回 0。"""
        try:
            page = self.notebook.nametowidget(self.notebook.select())
            return max(0, page.winfo_rooty() - self.notebook.winfo_rooty())
        except (tk.TclError, KeyError):
            return 0

    def _tab_drag_press(self, event):
        self._end_drag()
        idx = self._notebook_tab_at(event.x, event.y)
        if idx is None:
            return
        tabs = self.notebook.tabs()
        if idx >= len(tabs):
            return
        left, right = self._notebook_tab_span(idx, event.x, event.y)
        height = self._notebook_header_height() or 24
        self._drag = {
            "kind": "tab", "source": tabs[idx],
            "x0": event.x_root, "y0": event.y_root,
            "off_x": event.x - left, "off_y": event.y,
            "width": right - left + 1, "height": height,
            "active": False, "cancelled": False, "ghost": None,
        }

    def _tab_drag_motion(self, event):
        d = self._drag
        if not d or d["kind"] != "tab" or d["cancelled"]:
            return
        if not d["active"]:
            if not self._drag_passed_threshold(event):
                return
            # 虚影用选中 tab 的样式（两种主题下选中的 tab 都是白底黑字）
            style = ttk.Style()
            bg = style.lookup("TNotebook.Tab", "background", ("selected",)) or "#FFFFFF"
            fg = style.lookup("TNotebook.Tab", "foreground", ("selected",)) or "black"
            font = style.lookup("TNotebook.Tab", "font") or "TkDefaultFont"
            try:
                text = self.notebook.tab(d["source"], "text")
                ghost = self._create_drag_ghost(text, d["width"], d["height"],
                                                fg=fg, bg=bg, font=font)
            except tk.TclError:
                self._end_drag()
                return
            self._start_drag_visual(self.notebook, ghost)
        self._move_drag_ghost(event.x_root, event.y_root)

    def _tab_drag_release(self, event):
        d = self._drag
        if not d or d["kind"] != "tab":
            return
        was_active, cancelled, src = d["active"], d["cancelled"], d["source"]
        self._end_drag()
        if not was_active or cancelled:
            return

        tabs = list(self.notebook.tabs())
        if src not in tabs:
            return
        header = self._notebook_header_height()
        x, y = event.x, event.y
        # 只认标签栏那一行，且不超出 notebook 的宽度
        if header <= 0 or not (0 <= y < header) or not (0 <= x < self.notebook.winfo_width()):
            return
        row_y = header // 2   # 用标签栏中线判断，避免未选中的 tab 顶部留白造成误判
        n = len(tabs)
        s = tabs.index(src)
        idx = self._notebook_tab_at(x, row_y)
        if idx is not None:
            left, right = self._notebook_tab_span(idx, x, row_y)
            # 左半边插到目标前面，右半边插到目标后面
            insert_at = idx if x < (left + right + 1) / 2 else idx + 1
            if s < insert_at:
                insert_at -= 1   # 源 tab 移走后，后面的索引整体前移
        else:
            # 不在 tab 上：只有在最后一个 tab 右边的空白处才算“移到最后”
            probe = x - 1
            while probe >= 0 and self._notebook_tab_at(probe, row_y) is None:
                probe -= 1
            if probe < 0 or self._notebook_tab_at(probe, row_y) != n - 1:
                return
            insert_at = n - 1
        if insert_at == s:
            return
        self.notebook.insert(insert_at, src)
        self.notebook.select(src)
        self.script_modified = True

    def show_tab_menu(self, event):
        """
        在 notebook 上捕获右键，计算当前点击的 tab index，
        选中该 tab 并弹出上下文菜单。
        """
        # identify 返回类似 'label' 或 'close'，在有 label 的地方右键才生效
        elem = self.notebook.identify(event.x, event.y)
        if "label" not in elem:
            return

        # 计算被点击的 tab 索引
        tab_index = self.notebook.index(f"@{event.x},{event.y}")
        # 切换选中到该 tab
        self.notebook.select(tab_index)

        # 弹出菜单
        self.tab_menu.tk_popup(event.x_root, event.y_root)
        self.tab_menu.grab_release()

    def show_cell_menu(self, event, cell):
        self.current_cell = cell
        if not hasattr(self, 'cell_menu'):
            self.cell_menu = tk.Menu(self.root, tearoff=0)
            self.cell_menu.add_command(label="edit", command=self.cell_edit)
            self.cell_menu.add_command(label="copy", command=self.cell_copy)
            self.cell_menu.add_command(label="clear", command=self.cell_clear)
            self.cell_menu.add_command(label="paste", command=self.cell_paste)
        self.cell_menu.tk_popup(event.x_root, event.y_root)
        self.cell_menu.grab_release()

    def cell_edit(self):
        if not self.current_cell:
            return
        
        # 检查该按钮是否已有打开的编辑窗口
        cell_id = id(self.current_cell)
        if cell_id in self.cell_edit_windows:
            edit_win = self.cell_edit_windows[cell_id]
            # 如果窗口存在且未关闭,则将其置顶
            if edit_win.winfo_exists():
                edit_win.lift()
                edit_win.focus_force()
                return
        
        # ——— 根据主题选配色 ———
        if self.current_color_theme_light:
            # 浅色主题
            window_bg_color = "#F0F0F0"   # (240,240,240)
            text_bg_color   = "#FFFFFF"   # (255,255,255)
            text_fg_color   = "#000000"   # (0,0,0)
            cursor_color    = "#000000"   # 黑色光标
            btn_bg_color    = "#E0E0E0"   # 浅灰按钮
            btn_fg_color    = "#000000"
        else:
            # 深色主题
            window_bg_color = "#252A38"   # (37,42,56)
            text_bg_color   = "#171b26"   # (23,27,38)
            text_fg_color   = "#d9dce4"   # (217,220,228)
            cursor_color    = "#FFFFFF"   # 白色光标
            btn_bg_color    = "#3A3F4B"   # 深灰按钮
            btn_fg_color    = "#d9dce4"

        cell = self.current_cell
        edit_win = tk.Toplevel(self.root)
        # 先隐藏，控件都建好、位置算好后再显示（见 _place_cell_edit_window），避免先在别处闪一下
        edit_win.withdraw()
        edit_win.configure(bg=window_bg_color)

        # 使用 grid 布局，让窗口随大小变化
        edit_win.columnconfigure(0, weight=1)
        # row 1 为多行文本框，设置扩展权重，使其填满剩余垂直空间
        edit_win.rowconfigure(1, weight=1)

        # row 0: 单行文本框 + pin按钮 放在同一行
        row0_frame = tk.Frame(edit_win, bg=window_bg_color)
        row0_frame.grid(row=0, column=0, padx=10, pady=(10, 5), sticky="ew")
        row0_frame.columnconfigure(0, weight=1)

        # 单行文本框用于编辑显示内容
        single_entry = tk.Entry(
            row0_frame, 
            width=50,
            bg=text_bg_color,
            fg=text_fg_color,
            insertbackground=cursor_color,  # 光标颜色
            insertborderwidth=1
        )
        single_entry.grid(row=0, column=0, sticky="ew")
        single_entry.insert(tk.END, self.current_cell.cget("text"))
        # 名称一改就刷新标题上的 *（见 _update_edit_title）
        name_var = tk.StringVar(edit_win, value=single_entry.get())
        single_entry.config(textvariable=name_var)
        edit_win._name_var = name_var   # 保持引用，否则 StringVar 被回收后监听失效
        name_var.trace_add("write", lambda *a, cid=cell_id: self.root.after_idle(self._update_edit_title, cid))

        # pin 按钮放在 single_entry 右侧
        pin_button = tk.Button(row0_frame, text="📍", width=2,
                               command=lambda: self.toggle_pin(cell_id, edit_win, pin_button),
                               bg=btn_bg_color, fg=btn_fg_color,
                               activebackground=btn_bg_color, activeforeground=btn_fg_color)
        pin_button.grid(row=0, column=1, padx=(5, 0))

        # 获取单行文本框中的内容，设置为窗口标题
        current_single_line_text = single_entry.get()
        if current_single_line_text == '':
            cell_title = tr("keys.untitled", "Untitled")
        else:
            cell_title = current_single_line_text
        edit_win.title(cell_title)
        # 多行文本框用于编辑待发送内容
        #multi_text = scrolledtext.ScrolledText(edit_win)
        multi_text = scrolledtext.ScrolledText(
            edit_win,
            undo=True,               # 启用撤销栈
            autoseparators=False,    # 关闭自动分隔
            maxundo=20,               # 限制undo栈避免长时间运行内存增长，勿改为-1
            bg=text_bg_color,
            fg=text_fg_color,
            insertbackground=cursor_color,  # 光标颜色
            insertborderwidth=1
        )
        multi_text.grid(row=1, column=0, padx=10, pady=5, sticky="nsew")
        multi_text.insert(tk.END, cell.custom_data)   # 保留原有内容
        # 2) 重置撤销栈 —— 这样初始插入不再可撤销
        multi_text.edit_reset()

        # ——— 新增：灰色注释高亮 ———
        # 拿到当前文本框默认字体
        current_font = tkFont.nametofont(multi_text.cget("font"))
        # 拷贝一份并设置为斜体
        italic_font = current_font.copy()
        italic_font.configure(slant="italic")

        # 配置 gray tag：绿色 + 斜体
        multi_text.tag_config(
            "gray",
            foreground="green",
            font=italic_font
        )

        # 2. 当内容被修改时，扫描每一行，给以 '#' 开头的行打上灰色标签
        def _highlight_comments(event=None):
            # 只在真正修改后才处理
            if not multi_text.edit_modified():
                return
            # 清除旧标签
            multi_text.tag_remove("gray", "1.0", "end")
            # 遍历所有行
            for idx, line in enumerate(multi_text.get("1.0", "end-1c").splitlines(), start=1):
                if line.lstrip().startswith("#"):
                    start = f"{idx}.0"
                    end   = f"{idx}.end"
                    multi_text.tag_add("gray", start, end)
            # 重置 modified 状态，以便下次继续触发
            multi_text.edit_modified(False)

        # 3. 绑定 <<Modified>> 事件
        multi_text.bind("<<Modified>>", _highlight_comments)
        # 内容一改就刷新标题上的 *（_highlight_comments 每次都会复位 modified 标记，所以每次修改都会触发）
        multi_text.bind("<<Modified>>", lambda e, cid=cell_id: self.root.after_idle(self._update_edit_title, cid), add="+")

        # 每次按键或删除后插入撤销分隔，确保每次撤销只回退一个字符操作
        def _on_multi_edit_keyrelease(event):
            if event.char or event.keysym in ("BackSpace", "Delete"):
                multi_text.after_idle(multi_text.edit_separator)

        multi_text.bind("<KeyRelease>", _on_multi_edit_keyrelease)

        # 绑定 Ctrl+Z / Ctrl+Y 到撤销／重做，并阻止默认行为
        def _multi_edit_undo(event):
            multi_text.edit_undo()
            return "break"

        def _multi_edit_redo(event):
            multi_text.edit_redo()
            return "break"

        multi_text.bind("<Control-z>", _multi_edit_undo)
        multi_text.bind("<Control-y>", _multi_edit_redo)

        # 创建一个控制区域，将新功能按钮和原有保存按钮放在同一行
        ctrl_frame = tk.Frame(edit_win)
        ctrl_frame.configure(background=window_bg_color)
        ctrl_frame.grid(row=2, column=0, padx=10, pady=(5,10), sticky="ew")
        ctrl_frame.columnconfigure(0, weight=1)
        ctrl_frame.columnconfigure(1, weight=1)
        # 左侧区域：发送相关按钮
        left_frame = tk.Frame(ctrl_frame)
        left_frame.configure(background=window_bg_color)
        left_frame.grid(row=0, column=0, sticky="w")
        # 右侧区域：保存按钮
        right_frame = tk.Frame(ctrl_frame)
        right_frame.configure(background=window_bg_color)
        right_frame.grid(row=0, column=1, sticky="e")
        
        # cell的三个按钮，发送当前行、发送当前行并移动至下一行、发送全部
        def send_current_row():
            try:
                # 尝试获取选区的起止索引
                start_index = multi_text.index(tk.SEL_FIRST)   # 'sel.first'
                end_index   = multi_text.index(tk.SEL_LAST)    # 'sel.last'
                # 将索引转换为行号
                start_line = int(start_index.split('.')[0])
                end_line   = int(end_index.split('.')[0])
            except tk.TclError:
                # 无选区：只发送光标所在行
                cursor_index = multi_text.index(tk.INSERT)     # 'insert'
                line_num = int(cursor_index.split('.')[0])
                start_line = end_line = line_num

            # 收集要发送的行文本（非空，且不以 # 开头）
            all_lines = []
            for ln in range(start_line, end_line + 1):
                text_line = multi_text.get(f"{ln}.0", f"{ln}.end")
                if not text_line.strip():
                    continue
                if text_line.lstrip().startswith('#'):
                    # 以 # 开头的注释行，跳过
                    continue
                all_lines.append(text_line.strip())

            if not all_lines:
                return  # 没有可发送的内容

            if start_line == end_line:
                # 单行：先检查是否是自定义函数命令
                if not self._try_execute_cell_command(all_lines[0]):
                    self.send_via_serial(all_lines[0])
            else:
                # 多行：调用已有的递归发送函数，从第 0 行开始
                self._send_next_command(all_lines, 0)
        
        def send_current_row_and_move():
            index = multi_text.index("insert")
            line_num = int(index.split('.')[0])
            line_start = f"{line_num}.0"
            line_end = f"{line_num}.end"
            current_line = multi_text.get(line_start, line_end).strip()

            # 发送或跳过当前行
            if current_line:
                if current_line.lower().startswith(("wait", "#")):
                    # 注释或 wait 开头，跳过发送
                    pass  
                elif not self._try_execute_cell_command(current_line):
                    self.send_via_serial(current_line)

            # 查找下一个非空且不以#开头的行
            total_lines = int(multi_text.index("end-1c").split('.')[0])
            next_line = line_num + 1 if line_num < total_lines else 1
            start_search_line = next_line
            
            # 循环查找满足条件的行
            while True:
                test_line = multi_text.get(f"{next_line}.0", f"{next_line}.end").strip()
                # 如果找到非空且不以#开头的行，跳出循环
                if test_line and not test_line.startswith("#"):
                    break
                # 移动到下一行
                next_line = next_line + 1 if next_line < total_lines else 1
                # 如果回到起始搜索行，说明没有找到满足条件的行
                if next_line == start_search_line:
                    break
            
            next_start = f"{next_line}.0"
            next_end   = f"{next_line}.end"

            # 移动光标到找到的行行首
            multi_text.mark_set("insert", next_start)
            multi_text.see(next_start)

            # 取消之前的选区并选中整行
            try:
                multi_text.tag_remove("sel", "1.0", "end")
            except Exception:
                pass
            multi_text.tag_add("sel", next_start, next_end)

        # 原有保存按钮，靠右
        def save_action(close_after=False):
            old_text = cell.cget("text")
            old_data = cell.custom_data
            new_text = single_entry.get()
            new_data = multi_text.get("1.0", tk.END).strip()
            info = self.cell_edit_info.get(cell_id)
            if info is not None and info["ext"]:
                # 编辑期间 ts 文件里这个按键被改了：让用户选保留哪个版本
                ts_now = (old_text, (old_data or "").strip())
                if ts_now != info["base"] and ts_now != (new_text, new_data):
                    conflict = {"local": (new_text, new_data), "ts": ts_now, "idx": self._cell_index(cell),
                                "tab": self.notebook.tab(str(cell.master), "text") if str(cell.master) in self.notebook.tabs() else ""}
                    choice, edited = self._conflict_button_dialog(conflict, 1, 1, allow_all=False, parent=edit_win)
                    if choice == "cancel":
                        return
                    if choice == "ts":
                        single_entry.delete(0, tk.END)
                        single_entry.insert(0, ts_now[0])
                        multi_text.delete("1.0", tk.END)
                        multi_text.insert("1.0", ts_now[1])
                        multi_text.edit_reset()
                        new_text, new_data = ts_now
                    else:
                        new_text, new_data = edited if edited is not None else ("", "")
                        single_entry.delete(0, tk.END)
                        single_entry.insert(0, new_text)
                        multi_text.delete("1.0", tk.END)
                        multi_text.insert("1.0", new_data)
                info["ext"] = False
            if info is not None:
                info["base"] = (new_text, new_data)
                if info.get("notice") is not None:
                    info["notice"].grid_remove()
            
            # 只有内容真正改变时才标记
            if old_text != new_text or old_data != new_data:
                self.script_modified = True
                
            cell.config(text=new_text)
            cell.custom_data = new_data
            self._update_edit_title(cell_id)
            if close_after:
                edit_win.destroy()
        btn_send_row = tk.Button(left_frame, text="Send(F1)", command=send_current_row,bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_send_row.pack(side=tk.LEFT, padx=5)
        btn_send_row_move = tk.Button(left_frame, text="Send & Next(F5)", command=send_current_row_and_move,bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_send_row_move.pack(side=tk.LEFT, padx=5)
        def toggle_send_all():
            if btn_send_all.cget("text") == "Send All(F9)":
                self.cell_send_all_stop = False
                btn_send_all.config(text="Stop(F9)")
                lines = multi_text.get("1.0", tk.END)
                self.send_all_with_callback(lines, lambda: btn_send_all.config(text="Send All(F9)"))
            else:
                self.cell_send_all_stop = True
                btn_send_all.config(text="Send All(F9)")

        btn_send_all = tk.Button(left_frame, text="Send All(F9)", command=toggle_send_all,bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_send_all.pack(side=tk.LEFT, padx=5)

        # 给编辑窗口绑定功能键事件
        edit_win.bind("<F1>", lambda event: send_current_row())
        edit_win.bind("<F5>", lambda event: send_current_row_and_move())
        edit_win.bind("<F9>", lambda event: toggle_send_all())

        btn_save = tk.Button(right_frame, text="Save", command=lambda: save_action(False),bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_save.pack(side=tk.LEFT, padx=5)
        btn_save_close = tk.Button(right_frame, text="Save & close", command=lambda: save_action(True),bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_save_close.pack(side=tk.LEFT, padx=5)

        # 确保窗口拥有键盘焦点，以捕获按键
        edit_win.focus_set()

        # ——— 为 multi_text 增加右键菜单 ———
        def show_context_menu(event):
            context_menu = tk.Menu(multi_text, tearoff=0)
            context_menu.add_command(label=tr("main.cut", "Cut"), command=lambda: multi_text.event_generate("<<Cut>>"))
            context_menu.add_command(label=tr("main.copy", "Copy"), command=lambda: multi_text.event_generate("<<Copy>>"))
            context_menu.add_command(label=tr("main.paste", "Paste"), command=lambda: multi_text.event_generate("<<Paste>>"))
            context_menu.add_command(label=tr("main.delete", "Delete"), command=lambda: multi_text.delete("sel.first", "sel.last") if multi_text.tag_ranges("sel") else None)
            context_menu.add_separator()
            context_menu.add_command(label=tr("main.select_all", "Select All"), command=lambda: multi_text.tag_add("sel", "1.0", "end"))
            context_menu.tk_popup(event.x_root, event.y_root)

        multi_text.bind("<Button-3>", show_context_menu)

        # 自动同步的提示（ts 文件里这个按键被改了），平时隐藏
        notice_label = tk.Label(edit_win, text="", anchor="w", justify="left", bg=window_bg_color, wraplength=520)
        notice_label.grid(row=3, column=0, padx=10, pady=(0, 8), sticky="ew")
        notice_label.grid_remove()

        # 在创建编辑窗口后,将其添加到字典中
        self.cell_edit_windows[cell_id] = edit_win
        # 记下编辑窗口的控件和打开时的内容，自动同步时用来刷新或判断是否正在修改
        self.cell_edit_info[cell_id] = {
            "cell": cell, "win": edit_win, "entry": single_entry, "text": multi_text, "notice": notice_label,
            "base": (cell.cget("text"), (cell.custom_data or "").strip()), "ext": False,
        }

        def _on_edit_destroy(event, win=edit_win, cid=cell_id):
            # Save & close 直接 destroy 窗口时也清掉记录
            if event.widget is win:
                info = self.cell_edit_info.get(cid)
                if info is not None and info["win"] is win:
                    self.cell_edit_info.pop(cid, None)
        edit_win.bind("<Destroy>", _on_edit_destroy, add="+")
        
        # 在窗口关闭时从字典中移除
        edit_win.protocol("WM_DELETE_WINDOW", lambda: self.on_edit_window_close(cell_id))

        used_title = self._place_cell_edit_window(edit_win)
        edit_win.deiconify()
        # 显示后量一下编辑窗口自己的标题栏高度，和估计的不一样就再放一次
        edit_win.update_idletasks()
        try:
            measured = edit_win.winfo_rooty() - edit_win.winfo_y()
        except tk.TclError:
            measured = 0
        if measured > 0 and measured != used_title:
            self._place_cell_edit_window(edit_win, measured)
        edit_win.focus_set()

    CELL_EDIT_MARGIN_Y = 30      # 编辑窗口上下各比主窗口缩进多少像素
    CELL_EDIT_MARGIN_RIGHT = 30  # 编辑窗口右边比主窗口右边往左缩进多少像素

    def _place_cell_edit_window(self, win, edit_title=None):
        """编辑窗口：垂直方向在主窗口中间、高度比主窗口小一点；右边对齐主窗口右边再往左一点；宽度不变。
        edit_title：编辑窗口标题栏的高度（已显示后量到的）；不给就估算。返回用到的标题栏高度。"""
        win.update_idletasks()
        root = self.root
        try:
            rx, ry = root.winfo_rootx(), root.winfo_rooty()      # 主窗口内容区的左上角
            rw, rh = root.winfo_width(), root.winfo_height()
            outer_top = root.winfo_y()                            # 主窗口外框（含标题栏、菜单栏）的顶部
        except tk.TclError:
            return edit_title
        if edit_title is None:
            # 主窗口的标题栏 + 菜单栏；编辑窗口没有菜单栏，减掉菜单栏的高度
            edit_title = max(0, ry - outer_top)
            if sys.platform == "win32" and str(root.cget("menu") if "menu" in root.keys() else ""):
                try:
                    import ctypes
                    edit_title = max(0, edit_title - ctypes.windll.user32.GetSystemMetrics(15))  # SM_CYMENU
                except Exception:
                    pass
        outer_bottom = ry + rh
        width = win.winfo_reqwidth()
        # 整个编辑窗口（含标题栏）比主窗口（含标题栏）上下各小 CELL_EDIT_MARGIN_Y
        y = outer_top + self.CELL_EDIT_MARGIN_Y
        height = max(200, outer_bottom - self.CELL_EDIT_MARGIN_Y - y - edit_title)
        x = rx + rw - self.CELL_EDIT_MARGIN_RIGHT - width
        title_h = edit_title
        # 不超出主窗口所在屏幕的工作区（不压到任务栏、不跑到屏幕外）
        area = _monitor_work_area(rx + rw // 2, ry + rh // 2)
        if area:
            left, top, right, bottom = area
            width = min(width, right - left)
            height = min(height, bottom - top - title_h)
            x = max(left, min(x, right - width))
            y = max(top, min(y, bottom - title_h - height))
        win.geometry(f"{width}x{height}+{x}+{y}")
        return edit_title

    def toggle_pin(self, cell_id, window, pin_button):
        """切换窗口置顶状态"""
        current_state = window.attributes('-topmost')
        new_state = not current_state
        window.attributes('-topmost', new_state)
        
        # 更新按钮图标
        if new_state:
            pin_button.config(text="📌")  # 已置顶
        else:
            pin_button.config(text="📍")  # 未置顶
    
    def on_edit_window_close(self, cell_id):
        """当编辑窗口关闭时,从字典中移除"""
        self.cell_edit_info.pop(cell_id, None)
        if cell_id in self.cell_edit_windows:
            edit_win = self.cell_edit_windows[cell_id]
            edit_win.attributes('-topmost', False)  # 先取消置顶
            if edit_win.winfo_exists():
                edit_win.destroy()
            del self.cell_edit_windows[cell_id]
            
    def _script_visa_init(self, address):
        try:
            visa_res = self.rm.open_resource(address, access_mode=AccessModes.shared_lock, open_timeout=3000)
            self.psu = VisaComm(visa_res)
            self.tk_safe(lambda: self.text_area.insert(tk.END, "√ " + tr("visa.init_ok", "VISA initialized: {address}", address=address) + "\n"))
        except Exception as e:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.init_failed", "VISA init failed: {error}", error=e) + "\n"))
        self.tk_safe(lambda: self._auto_scroll())

    def _script_visa_query(self, cmd):
        if not self.psu:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.not_initialized", "Please use visa_init to initialize the device first") + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return None
        try:
            resp = self.psu.query(cmd)
            self.tk_safe(lambda: self.text_area.insert(tk.END, f">>> VISA QUERY: {cmd}\n{resp}\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return resp
        except Exception as e:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.query_error", "VISA QUERY error: {error}", error=e) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return None

    def _script_visa_write(self, cmd):
        if not self.psu:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.not_initialized", "Please use visa_init to initialize the device first") + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return
        try:
            self.psu.write(cmd)
            self.tk_safe(lambda: self.text_area.insert(tk.END, f"√ VISA WRITE: {cmd}\n"))
        except Exception as e:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.write_error", "VISA WRITE error: {error}", error=e) + "\n"))
        self.tk_safe(lambda: self._auto_scroll())

    def _script_visa_read(self):
        if not self.psu:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.not_initialized", "Please use visa_init to initialize the device first") + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return None
        try:
            resp = self.psu.read()
            self.tk_safe(lambda: self.text_area.insert(tk.END, f">>> VISA READ:\n{resp}\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return resp
        except Exception as e:
            self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.read_error", "VISA READ error: {error}", error=e) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return None

    def _try_execute_cell_command(self, command):
        """尝试执行按钮区域的自定义函数命令，成功返回 True，否则返回 False"""
        low = command.strip().lower()
        
        # show_str("xxx")
        m = re.match(r'^show_str\((.+)\)$', command.strip())
        if m:
            arg = m.group(1).strip().strip('"').strip("'")
            self.tk_safe(lambda: self.text_area.insert(tk.END, arg))
            self.tk_safe(lambda: self._auto_scroll())
            return True
        
        # show_date_time()
        if low == "show_date_time()":
            self.tk_safe(lambda: self.text_area.insert(tk.END, str(datetime.now()) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return True
        
        # set_port("COMx")
        m = re.match(r'^set_port\((.+)\)$', command.strip())
        if m:
            port_str = m.group(1).strip().strip('"').strip("'")
            self.tk_safe(lambda: self.port_menu.set(port_str))
            return True
        
        # set_baudrate(115200)
        m = re.match(r'^set_baudrate\((.+)\)$', command.strip())
        if m:
            baud_str = m.group(1).strip().strip('"').strip("'")
            self.tk_safe(lambda: self.baud_var.set(baud_str))
            return True
        
        # connect_serial()
        if low == "connect_serial()":
            self.tk_safe(lambda: self.connect_serial())
            return True
        
        # close_serial()
        if low == "close_serial()":
            self.tk_safe(lambda: self.close_serial())
            return True
        
        # toggle_serial()
        if low == "toggle_serial()":
            self.tk_safe(lambda: self.toggle_serial())
            return True
        
        # open power shell / open_powershell()
        if low == "open power shell" or low == "open_powershell()":
            self.open_powershell()
            return True
        
        # power shell send xxx / powershell_send("xxx")
        if low.startswith("power shell send "):
            cmd = command.strip()[len("power shell send "):]
            self.powershell_send(cmd)
            return True
        m = re.match(r'^powershell_send\((.+)\)$', command.strip())
        if m:
            cmd = m.group(1).strip().strip('"').strip("'")
            self.powershell_send(cmd)
            return True
        
        # visa_init(address)
        if low.startswith("visa_init"):
            addr = _parse_visa_call("visa_init", command)
            if addr is not None:
                addr = addr.strip("\"'")
                try:
                    visa_res = self.rm.open_resource(addr, access_mode=AccessModes.shared_lock, open_timeout=3000)
                    self.psu = VisaComm(visa_res)
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "√ " + tr("visa.init_ok", "VISA initialized: {address}", address=addr) + "\n"))
                except Exception as e:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.init_failed", "VISA init failed: {error}", error=e) + "\n"))
            else:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.init_format_error", "visa_init format error, expected visa_init(ADDRESS)") + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return True
        
        # visa_query(command)
        if low.startswith("visa_query"):
            if not self.psu:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.not_initialized", "Please use visa_init to initialize the device first") + "\n"))
            else:
                cmd = _parse_visa_call("visa_query", command)
                if cmd is not None:
                    try:
                        resp = self.psu.query(cmd)
                        self.tk_safe(lambda: self.text_area.insert(tk.END, f">>> VISA QUERY: {cmd}\n{resp}\n"))
                    except Exception as e:
                        self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.query_error", "VISA QUERY error: {error}", error=e) + "\n"))
                else:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.query_format_error", "visa_query format error, expected visa_query(COMMAND), got: {command!r}", command=command) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return True
        
        # visa_write(command)
        if low.startswith("visa_write"):
            if not self.psu:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.not_initialized", "Please use visa_init to initialize the device first") + "\n"))
            else:
                cmd = _parse_visa_call("visa_write", command)
                if cmd is not None:
                    try:
                        self.psu.write(cmd)
                        self.tk_safe(lambda: self.text_area.insert(tk.END, f"√ VISA WRITE: {cmd}\n"))
                    except Exception as e:
                        self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.write_error", "VISA WRITE error: {error}", error=e) + "\n"))
                else:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.write_format_error", "visa_write format error, expected visa_write(COMMAND), got: {command!r}", command=command) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return True
        
        # visa_read()
        if low.startswith("visa_read"):
            if not self.psu:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.not_initialized", "Please use visa_init to initialize the device first") + "\n"))
            else:
                try:
                    resp = self.psu.read()
                    self.tk_safe(lambda: self.text_area.insert(tk.END, f">>> VISA READ:\n{resp}\n"))
                except Exception as e:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "× " + tr("visa.read_error", "VISA READ error: {error}", error=e) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())
            return True
        
        return False

    def send_all_with_callback(self, data, on_complete):
        """带完成回调的 send_all，支持通过 cell_send_all_stop 中断"""
        all_lines = data.splitlines()
        self._send_next_command_with_stop(all_lines, 0, on_complete)

    def _send_next_command_with_stop(self, all_lines, index, on_complete):
        """递归执行命令，支持 stop 中断"""
        if self.cell_send_all_stop:
            on_complete()
            return

        if index >= len(all_lines):
            on_complete()
            return

        command = all_lines[index].strip()
        if not command:
            self._send_next_command_with_stop(all_lines, index + 1, on_complete)
            return

        if re.match(r'^\s*#', command):
            self._send_next_command_with_stop(all_lines, index + 1, on_complete)
            return

        # 处理 "wait for <substring> for <seconds>"
        match_wait_for = re.match(r'^wait for (.+) for (\d+)$', command, re.IGNORECASE)
        if match_wait_for:
            wait_str = match_wait_for.group(1)
            wait_time = int(match_wait_for.group(2))
            self.wait_for_initial_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
            start_time = time.time()
            self.auto_delete_lock_count += 1

            def check_received():
                if self.cell_send_all_stop:
                    self.auto_delete_lock_count -= 1
                    on_complete()
                    return
                current_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
                if self.tk_safe(lambda: self.text_area.compare(self.wait_for_initial_index, ">", current_index)):
                    self.auto_delete_lock_count -= 1
                    self._send_next_command_with_stop(all_lines, index + 1, on_complete)
                    return
                self.button_send_wait_for_new_text = self.tk_safe(lambda: self.text_area.get(self.wait_for_initial_index, current_index))
                if wait_str in self.button_send_wait_for_new_text or (time.time() - start_time >= wait_time):
                    self.auto_delete_lock_count -= 1
                    self._send_next_command_with_stop(all_lines, index + 1, on_complete)
                else:
                    self.tk_safe(lambda: self.text_area.after(100, check_received))

            check_received()
            return

        # 处理 "wait <seconds>"
        match_wait = re.match(r'^wait (\d+)$', command, re.IGNORECASE)
        if match_wait:
            wait_time = int(match_wait.group(1)) * 1000
            self.text_area.after(wait_time, lambda: self._send_next_command_with_stop(all_lines, index + 1, on_complete))
            return

        # 拦截自定义函数命令
        if self._try_execute_cell_command(command):
            self._send_next_command_with_stop(all_lines, index + 1, on_complete)
            return

        # 发送命令
        self.send_via_serial(command)

        if index + 1 >= len(all_lines):
            on_complete()
            return

        next_command = all_lines[index + 1].strip()
        if next_command.startswith("wait"):
            self._send_next_command_with_stop(all_lines, index + 1, on_complete)
            return

        self.terminal_strs = [s.strip() for s in self.send_all_terminal_entry.get().split(',') if s.strip()]
        self.over_time_str = self.send_all_over_time_entry.get().strip()
        if self.terminal_strs and self.over_time_str:
            try:
                timeout = float(self.over_time_str)
            except Exception:
                timeout = 0
            if timeout > 0:
                start_time = time.time()
                def check_terminal():
                    if self.cell_send_all_stop:
                        on_complete()
                        return
                    current_index = self.text_area.index("end-1c")
                    if self.text_area.compare(self.last_send_index, ">", current_index):
                        on_complete()
                        return
                    self.button_send_check_terminal_new_text = self.text_area.get(self.last_send_index, current_index)
                    if any(term in self.button_send_check_terminal_new_text for term in self.terminal_strs):
                        self._send_next_command_with_stop(all_lines, index + 1, on_complete)
                    elif time.time() - start_time >= timeout:
                        self.text_area.insert(tk.END, tr("send.wait_symbol_timeout", "Wait symbol not received from the port. Sending stopped. Set or clear the wait symbol."), "red")
                        self._auto_scroll()
                        on_complete()
                    else:
                        self.text_area.after(100, check_terminal)
                check_terminal()
                return

        self.text_area.after(100, lambda: self._send_next_command_with_stop(all_lines, index + 1, on_complete))

    def send_all(self, data):
        """ 在后台线程中执行命令发送，避免 GUI 窗口卡顿 """
        all_lines = data.splitlines()
        self._send_next_command(all_lines, 0)  # 递归执行，每次处理一行

    def _send_next_command(self, all_lines, index):
        """ 递归执行命令，支持 wait 语句，防止 GUI 卡顿 """
        if index >= len(all_lines):
            return  # 所有命令执行完毕

        command = all_lines[index].strip()
        if not command:
            self._send_next_command(all_lines, index + 1)
            return

        # 处理注释行：以 # 开头的行，跳过并执行下一条
        if re.match(r'^\s*#', command):
            # 直接开始下一条命令
            self._send_next_command(all_lines, index + 1)
            return
        
        # 处理 "wait for <substring> for <seconds>"
        match_wait_for = re.match(r'^wait for (.+) for (\d+)$', command, re.IGNORECASE)
        if match_wait_for:
            wait_str = match_wait_for.group(1)
            wait_time = int(match_wait_for.group(2))

            self.wait_for_initial_index  = self.tk_safe(lambda: self.text_area.index("end-1c"))
            start_time = time.time()
            self.auto_delete_lock_count += 1

            def check_received():
                current_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
                if self.tk_safe(lambda: self.text_area.compare(self.wait_for_initial_index, ">", current_index)):
                    print("wait for x for t error, initial index bigger than current index, wait for skipped.")
                    self.auto_delete_lock_count -= 1
                    self.tk_safe(lambda: messagebox.showerror("commands running error","wait for x for t error, initial index bigger than current index, wait for skipped.", parent=self.root))

                    return
                        
                self.button_send_wait_for_new_text = self.tk_safe(lambda: self.text_area.get(self.wait_for_initial_index, current_index))

                if wait_str in self.button_send_wait_for_new_text or (time.time() - start_time >= wait_time):
                    self.auto_delete_lock_count -= 1
                    self._send_next_command(all_lines, index + 1)  # 继续执行下一行
                else:
                    self.tk_safe(lambda: self.text_area.after(100, check_received))  # 100ms 后再次检查

            check_received()
            return

        # 处理 "wait <seconds>"
        match_wait = re.match(r'^wait (\d+)$', command, re.IGNORECASE)
        if match_wait:
            wait_time = int(match_wait.group(1)) * 1000  # 转换为毫秒
            self.text_area.after(wait_time, lambda: self._send_next_command(all_lines, index + 1))
            return

        # 拦截自定义函数命令
        if self._try_execute_cell_command(command):
            self._send_next_command(all_lines, index + 1)
            return

        # 发送命令
        self.send_via_serial(command)
        # 判断当前是否是最后一行，如果是，则直接结束
        if index + 1 >= len(all_lines):
            return  # 所有命令执行完毕
        # 判断下一句是否以wait开头，如果是，则跳过对“等待字符”的判断，直接执行下一行代码
        next_command = all_lines[index+1].strip()
        if next_command.startswith("wait"):
            self._send_next_command(all_lines, index + 1)
            return
        # 如果下一行不是以wait开头，则执行后面的内容
        # 检查 send_all_terminal_entry 是否有字符，以及 send_all_over_time_entry 是否有数字
        #terminal_str = self.send_all_terminal_entry.get().strip()
        self.terminal_strs = [s.strip() for s in self.send_all_terminal_entry.get().split(',') if s.strip()]
        self.over_time_str = self.send_all_over_time_entry.get().strip()
        if self.terminal_strs and self.over_time_str:
            try:
                timeout = float(self.over_time_str)
            except Exception:
                timeout = 0
            if timeout > 0:
                start_time = time.time()
                def check_terminal():
                    # 如果发生了删除操作，导致 last_send_index 大于 current_index，停止运行该语句并弹窗，后续语句继续执行
                    current_index = self.text_area.index("end-1c")
                    if self.text_area.compare(self.last_send_index, ">", current_index):
                        #print("wait terminal symbol error, last index bigger than current index, wait for skipped.")
                        self.tk_safe(lambda: messagebox.showerror("wait terminal symbol error","wait terminal symbol error, last index bigger than current index, wait for skipped.", parent=self.root))

                        return
                        
                    self.button_send_check_terminal_new_text = self.text_area.get(self.last_send_index, current_index)

                    #if terminal_str in self.button_send_check_terminal_new_text:
                        # 检测到终止符，继续执行下一行命令
                        #self._send_next_command(all_lines, index + 1)
                    if any(term in self.button_send_check_terminal_new_text for term in self.terminal_strs):
                        # 检测到任意一个终止符，继续执行下一行命令
                        self._send_next_command(all_lines, index + 1)
                    elif time.time() - start_time >= timeout:
                        # 超时未检测到终止符，在主窗口中显示超时，直接终止函数执行
                        self.text_area.insert(tk.END, tr("send.wait_symbol_timeout", "Wait symbol not received from the port. Sending stopped. Set or clear the wait symbol."), "red")
                        self._auto_scroll()
                        return
                    else:
                        self.text_area.after(100, check_terminal)
                check_terminal()
                return

        # 如果未设置终端条件，则采用默认的短暂延迟后执行下一行
        self.text_area.after(100, lambda: self._send_next_command(all_lines, index + 1))

    def cell_copy(self):
        if self.current_cell:
            self.cell_clipboard = (self.current_cell.cget("text"), self.current_cell.custom_data)

    def cell_clear(self):
        if self.current_cell:
            # 检查是否有内容需要清除
            old_text = self.current_cell.cget("text")
            old_data = self.current_cell.custom_data
            if old_text or old_data:
                self._push_undo({"type": "cells", "items": [(self.current_cell, old_text, old_data)]})
                self.script_modified = True
            self.current_cell.config(text="")
            self.current_cell.custom_data = ""

    def cell_paste(self):
        if self.current_cell and self.cell_clipboard:
            # 检查是否有内容变化
            old_text = self.current_cell.cget("text")
            old_data = self.current_cell.custom_data
            new_text = self.cell_clipboard[0]
            new_data = self.cell_clipboard[1]
            
            if old_text != new_text or old_data != new_data:
                self._push_undo({"type": "cells", "items": [(self.current_cell, old_text, old_data)]})
                self.script_modified = True
                
            self.current_cell.config(text=new_text)
            self.current_cell.custom_data = new_data

    def cell_send(self, cell):
        # 刚刚拖动过（拖出去又回到原按钮松手、或按 Esc 取消），这次松手不发送
        if self._suppress_cell_click:
            self._suppress_cell_click = False
            return
        if self.serial_conn and cell.custom_data:
            self.send_all(cell.custom_data)  # 传递 cell.custom_data

    def send_via_serial(self, data, add_newline=True, insert_display=True):
        """
         统一的发送入口，内部会拦截 PowerShell 关键字。
         原来总是会在 data 后面加一个 '\n'。
         现在由参数 add_newline 决定是否加 '\n'。
         原来总是插入到 text_area
         现在需要由参数insert_display:决定是否插入到 text_area
         新增四种 VISA 控制指令：
         - visa_init(address)
         - visa_query(command)
         - visa_write(command)
         - visa_read()
        """
        if not (
            (self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open)  # 串口打开
            or
            (hasattr(self, 'ssh_channel') and self.ssh_channel and not self.ssh_channel.closed)  # SSH 打开
        ):
            # 将SSH状态色块置为灰色
            self.tk_safe(lambda: self.ssh_status_canvas.config(bg="gray"))
            self.tk_safe(lambda: messagebox.showwarning(tr("common.warning", "Warning"), tr("send.not_connected", "Serial port or SSH not connected"), parent=self.root))

            return
        key = data.strip().lower()
        # ========== 解析 \xA0\x01\x01\xA2 格式 ==========
        if "\\x" in data:
            try:
                # 找出所有 \x?? 格式
                byte_list = re.findall(r'\\x([0-9A-Fa-f]{2})', data)
                if byte_list:
                    byte_data = bytes(int(x, 16) for x in byte_list)

                    # 发送二进制数据
                    if hasattr(self, 'ssh_channel') and self.ssh_channel and not self.ssh_channel.closed:
                        self.ssh_channel.send(byte_data)
                    else:
                        self.serial_conn.ser.write(byte_data)

                    # 显示区域写入（不改变原有逻辑）
                    if insert_display:
                        self.text_area.after(0, lambda: (
                            self.text_area.insert(tk.END, f"[HEX SEND] {data} [SEND END]\n"),
                            self._auto_scroll()
                        ))
                    return
            except Exception as e:
                messagebox.showerror(tr("send.hex_format_error", "Invalid HEX Escape Format"), f"{e}", parent=self.root)

                return

        # 默认走串口
        # （1）插入可选的时间戳
        if self.timestamp_onoff.get():
            ts = datetime.now().strftime("%H:%M:%S.%f")[:-3]
            self.tk_safe(lambda: self.text_area.insert(tk.END, f"\nSend at    {ts}\n", "blue"))
        # （2）真正写入串口并显示
        raw = data + ("\n" if add_newline else "")

        # ========== 新增 SSH / 串口选择 ==========
        if hasattr(self, 'ssh_channel') and self.ssh_channel and not self.ssh_channel.closed:
            try:
                self.ssh_channel.send(raw)
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror(tr("send.ssh_send_failed", "SSH Send Failed"), str(e), parent=self.root))

                return
        else:
            self.serial_conn.send_data(raw)  
        
        # 判断是否向主窗口写入发送的字符串
        if insert_display:
            # 安全地在主线程插入并滚动
            self.tk_safe(lambda: self.text_area.insert(tk.END, raw))
            self.tk_safe(lambda: self._auto_scroll())
        # 在此处更新发送后的窗口的最后的位置
        self.last_send_index = self.tk_safe(lambda: self.text_area.index("end-1c"))

        # （3）更新统计
        self.sent_bytes += len(data.encode())
        self.update_data_stats()

    def create_new_tab(self):
        new_title = f"Tab {len([t for t in self.notebook.tabs() if self.notebook.tab(t, 'text') != '']) + 1}"
        self.add_tab(new_title)
        self.notebook.select(self.notebook.tabs()[-1])
        self.script_modified = True

    def rename_current_tab(self):
        current = self.notebook.select()
        if current:
            current_name = self.notebook.tab(current, "text")
            new_name = simpledialog.askstring(tr("keys.rename_title", "Rename"), tr("keys.rename_prompt", "Enter a new name:"),initialvalue=current_name, parent=self.root)
            if new_name and new_name != current_name:
                self.notebook.tab(current, text=new_name)
                self.script_modified = True

    def delete_current_tab(self):
        """删除当前标签页：全是空按键时直接删；有内容时先确认。删除后可以 Ctrl+Z 撤销。"""
        current = self.notebook.select()
        if not current:
            return
        frame = self.notebook.nametowidget(current)
        name = self.notebook.tab(current, "text")
        cells = self._frame_cells(frame)
        if any(self._cell_has_open_editor(c) for c in cells):
            messagebox.showwarning(
                tr("common.warning", "Warning"),
                tr("tab.delete_editor_open",
                   "A button in this tab has an edit window open. Close the edit window first, then delete the tab."),
                parent=self.root)
            return
        has_content = any(c.cget("text").strip() or (c.custom_data or "").strip() for c in cells)
        if has_content and not messagebox.askyesno(
                tr("common.confirm", "Confirm"),
                tr("tab.delete_confirm",
                   "Tab \"{name}\" contains buttons with content. Delete it?\n\nYou can press Ctrl+Z to undo.",
                   name=name),
                parent=self.root):
            return
        index = self.notebook.index(current)
        self.notebook.forget(current)   # 只移出界面不销毁，撤销时放回去
        self._push_undo({"type": "tab_delete", "frame": frame, "index": index, "text": name})
        self.script_modified = True

    def duplicate_current_tab(self):
        """复制当前标签页，新标签页放在它右边，名称后加 (2)、(3)…"""
        current = self.notebook.select()
        if not current:
            return
        src_frame = self.notebook.nametowidget(current)
        name = self.notebook.tab(current, "text")
        button_info = {}
        for cell in self._frame_cells(src_frame):
            text, data = cell.cget("text"), cell.custom_data or ""
            if text or data:
                gi = cell.grid_info()
                button_info[int(gi.get("row", 0)) * 6 + int(gi.get("column", 0))] = (text, data)
        existing = {self.notebook.tab(t, "text") for t in self.notebook.tabs()}
        n = 2
        while f"{name} ({n})" in existing:
            n += 1
        self.create_tab_from_script(f"{name} ({n})", button_info)
        new_id = self.notebook.tabs()[-1]
        new_frame = self.notebook.nametowidget(new_id)
        # 沿用原标签页的配色（深色/浅色主题）
        try:
            new_frame.configure(background=src_frame.cget("background"))
            src_cells = self._frame_cells(src_frame)
            if src_cells:
                ref = src_cells[0]
                colors = {k: ref.cget(k) for k in ("background", "foreground",
                                                   "activebackground", "activeforeground")}
                for cell in self._frame_cells(new_frame):
                    cell.configure(**colors)
        except tk.TclError:
            pass
        self.notebook.insert(self.notebook.index(current) + 1, new_id)
        self.notebook.select(new_id)
        self.script_modified = True

    # ---------------- 按键区撤销（Ctrl+Z）
    UNDO_LIMIT = 30

    @staticmethod
    def _frame_cells(frame):
        """标签页里的所有按键。"""
        return [c for c in frame.winfo_children()
                if isinstance(c, tk.Button) and hasattr(c, "custom_data")]

    @staticmethod
    def _widget_alive(widget):
        try:
            return bool(widget.winfo_exists())
        except tk.TclError:
            return False

    def _close_edit_window(self, cell_id):
        """关闭一个按键编辑窗口；窗口已经不在时只清掉记录。"""
        try:
            self.on_edit_window_close(cell_id)
        except tk.TclError:
            self.cell_edit_windows.pop(cell_id, None)

    def _close_edit_windows_in(self, frame):
        for cell in self._frame_cells(frame):
            if id(cell) in self.cell_edit_windows:
                self._close_edit_window(id(cell))

    def _destroy_tab_frame(self, frame):
        """彻底销毁一个标签页（先关掉其中按键的编辑窗口）。"""
        if not self._widget_alive(frame):
            return
        self._close_edit_windows_in(frame)
        try:
            frame.destroy()
        except tk.TclError:
            pass

    def _push_undo(self, record):
        self._key_undo.append(record)
        while len(self._key_undo) > self.UNDO_LIMIT:
            self._discard_undo_record(self._key_undo.pop(0))
        # 点按键不会移动焦点；把焦点交给主窗口，紧接着按 Ctrl+Z 才会撤销按键操作，
        # 而不是撤销输入框里的文字
        try:
            self.root.focus_set()
        except tk.TclError:
            pass

    def _discard_undo_record(self, record):
        if record["type"] == "tab_delete":
            self._destroy_tab_frame(record["frame"])

    def _clear_key_undo(self):
        for record in self._key_undo:
            self._discard_undo_record(record)
        self._key_undo = []

    def _on_key_undo(self, event=None):
        widget = getattr(event, "widget", None)
        # 焦点在输入框、文本框里时不处理，让它们撤销自己的文字
        if not isinstance(widget, tk.Misc) or isinstance(
                widget, (tk.Entry, tk.Text, tk.Spinbox, ttk.Entry)):
            return
        self.key_undo()
        return "break"

    def key_undo(self):
        """撤销最近一次交换 / 清空 / 粘贴 / 删除标签页。"""
        while self._key_undo:
            record = self._key_undo[-1]
            if record["type"] == "cells":
                items = [it for it in record["items"] if self._widget_alive(it[0])]
                if not items:
                    self._key_undo.pop()
                    continue
                if any(self._cell_has_open_editor(cell) for cell, _, _ in items):
                    messagebox.showwarning(
                        tr("common.warning", "Warning"),
                        tr("cell.undo_editor_open",
                           "This button has an edit window open. Close the edit window first, then undo."),
                        parent=self.root)
                    return
                self._key_undo.pop()
                for cell, text, data in items:
                    cell.config(text=text)
                    cell.custom_data = data
                # 切到被撤销的按键所在的标签页
                page = items[0][0].master
                if str(page) in self.notebook.tabs():
                    self.notebook.select(page)
            elif record["type"] == "tab_delete":
                self._key_undo.pop()
                frame = record["frame"]
                if not self._widget_alive(frame):
                    continue
                if record["index"] < len(self.notebook.tabs()):
                    self.notebook.insert(record["index"], frame, text=record["text"])
                else:
                    self.notebook.add(frame, text=record["text"])
                self.notebook.select(frame)
            else:
                self._key_undo.pop()
                continue
            self.script_modified = True
            return

    # ================================================================
    # 按键文件自动同步
    # 多个 TermPlus 打开同一个 ts 文件时：本地一改就自动保存（保存时和 ts 文件逐个按键合并），
    # 别的窗口改了 ts 文件就自动加载进来。读写都在后台线程 KeyFileSyncWorker 里做。
    # ================================================================
    SYNC_DEBOUNCE_MS = 300               # 连续操作合并成一次保存
    SYNC_BIG_CONFLICTS = 5               # 冲突超过这个数，先弹总结窗口
    SYNC_OFFLINE_REMIND_MS = 5 * 60 * 1000

    def _sync_path(self):
        if self.current_script_path and self.current_script_file:
            return os.path.join(self.current_script_path, self.current_script_file)
        return None

    @staticmethod
    def _same_path(a, b):
        if not a or not b:
            return False
        return os.path.normcase(os.path.abspath(a)) == os.path.normcase(os.path.abspath(b))

    def _notebook_frames(self):
        return [self.notebook.nametowidget(t) for t in self.notebook.tabs()]

    @staticmethod
    def _cell_index(cell):
        gi = cell.grid_info()
        return int(gi.get("row", 0)) * 6 + int(gi.get("column", 0))

    @staticmethod
    def _cell_value(cell):
        """按键在文件里的样子：(名称, 去掉首尾空白的内容)；名称为空白的按键不会写进文件，记为 None。"""
        name = cell.cget("text")
        if not name.strip():
            return None
        return (name, (cell.custom_data or "").strip())

    def _sync_set_modified(self, value):
        """同步引擎自己设置修改标记，不触发新一轮保存。"""
        self._sync_applying = True
        try:
            self.script_modified = value
        finally:
            self._sync_applying = False

    def _sync_set_base(self, tabs, frames):
        """记下新的基准，并记下界面上每个标签页对应基准里的第几个。"""
        self._sync_base_tabs = [(n, dict(b)) for n, b in tabs]
        self._sync_base_canon = ts_serialize(self._sync_base_tabs)
        listed = set()
        for i, frame in enumerate(frames):
            if self._widget_alive(frame):
                frame._sync_base = i
                listed.add(str(frame))
        for frame in self._notebook_frames():
            if str(frame) not in listed:
                frame._sync_base = None
        for record in self._key_undo:
            if record["type"] == "tab_delete" and self._widget_alive(record["frame"]):
                record["frame"]._sync_base = None   # 撤销删除放回来的，算本地新建

    def _sync_reset_base_from_content(self, content, path=None):
        """加载或手动保存之后：以 content 为基准，界面上的标签页按顺序对应。"""
        frames = self._notebook_frames()
        for frame in frames:
            frame._sync_pending = set()
        self._sync_set_base(ts_parse(content), frames)
        path = path or self._sync_path()
        try:
            self._sync_last_fp = ts_fingerprint(path) if path else None
        except OSError:
            self._sync_last_fp = None

    def _sync_snapshot(self):
        local = []
        for frame in self._notebook_frames():
            buttons, editors = {}, False
            for cell in self._frame_cells(frame):
                v = self._cell_value(cell)
                if v is not None:
                    buttons[self._cell_index(cell)] = v
                editors = editors or self._cell_has_open_editor(cell)
            local.append({"name": self.notebook.tab(str(frame), "text"), "buttons": buttons,
                          "base": getattr(frame, "_sync_base", None), "editors": editors,
                          "pending": set(getattr(frame, "_sync_pending", set())), "ref": frame})
        return local

    # ---------------- 开关、调度
    def _on_sync_toggle(self, quiet=False):
        if self.key_sync_var.get():
            if not self._sync_path() or self._sync_base_canon is None:
                self.key_sync_var.set(False)
                if not quiet:
                    messagebox.showwarning(tr("common.warning", "Warning"),
                                           tr("keys.sync_need_file", "Load a key file first, then turn on Auto Sync."),
                                           parent=self.root)
                return
            self._sync_enabled = True
            if self._sync_worker is None:
                self._sync_worker = KeyFileSyncWorker(self)
                self._sync_worker.start()
            self._sync_kick()
        else:
            self._sync_stop()

    def _sync_stop(self):
        self._sync_enabled = False
        if self._sync_worker is not None:
            self._sync_worker.stop()
            self._sync_worker = None
        for attr in ("_sync_after_id", "_sync_offline_timer"):
            aid = getattr(self, attr)
            if aid:
                try:
                    self.root.after_cancel(aid)
                except tk.TclError:
                    pass
                setattr(self, attr, None)
        self._sync_busy = self._sync_again = False
        self._sync_deferred = None
        self._sync_offline_since = None

    def _sync_schedule(self):
        if self._sync_after_id:
            try:
                self.root.after_cancel(self._sync_after_id)
            except tk.TclError:
                pass
        self._sync_after_id = self.root.after(self.SYNC_DEBOUNCE_MS, self._sync_kick)

    def _sync_kick(self):
        self._sync_after_id = None
        path = self._sync_path()
        if not self._sync_enabled or not path or self._sync_worker is None:
            return
        if self._sync_busy:
            self._sync_again = True
            return
        self._sync_busy = True
        self._sync_job_rev = self._sync_local_rev
        self._sync_worker.post(("read", path))

    def _sync_finish(self, ok=True, error=None):
        self._sync_busy = False
        if self._sync_manual:
            self._sync_manual = False
            if ok:
                messagebox.showinfo(tr("common.info", "Info"), tr("file.script_saved", "Script saved successfully"), parent=self.root)
            else:
                messagebox.showerror(tr("common.error", "Error"),
                                     tr("file.save_script_failed", "Failed to save script: {error}", error=error),
                                     parent=self.root)
        if self._sync_deferred is not None and self._sync_enabled:
            path, text, enc = self._sync_deferred
            self._sync_deferred = None
            self._sync_busy = True
            self._sync_process_disk(path, text, enc)
        elif self._sync_again:
            self._sync_again = False
            self._sync_kick()

    # ---------------- 后台线程的结果
    def _sync_on_result(self, kind, path, *rest):
        if kind in ("backup_done", "backup_failed"):
            if kind == "backup_done":
                self._sync_log(tr("sync.backup_saved", "[Auto Sync] Backup saved: {path}", path=rest[0]), "blue")
            else:
                self._sync_log(tr("sync.backup_failed", "[Auto Sync] Failed to save the backup: {error}", error=rest[0]))
            return
        if not self._sync_enabled:
            return
        if not self._same_path(path, self._sync_path()):
            # 期间加载了别的文件，旧文件的结果作废
            if kind in ("written", "error", "busy") or (kind == "disk" and rest[2]):
                self._sync_busy = False
            return
        if kind == "offline":
            self._sync_offline_since = time.time()
            self._sync_log(tr("sync.offline",
                              "[Auto Sync] Cannot access the key file: {path}\nLocal changes are not synced yet. ({error})",
                              path=path, error=rest[0]))
            self._sync_offline_timer = self.root.after(self.SYNC_OFFLINE_REMIND_MS, self._sync_offline_tick)
        elif kind == "online":
            if self._sync_offline_since is not None:
                self._sync_log(tr("sync.online", "[Auto Sync] The key file is reachable again. Syncing."), "green")
            self._sync_offline_since = None
            if self._sync_offline_timer:
                self.root.after_cancel(self._sync_offline_timer)
                self._sync_offline_timer = None
            if self.script_modified:
                self._sync_kick()
        elif kind == "disk":
            text, enc, forced = rest
            if self._sync_busy and not forced:
                self._sync_deferred = (path, text, enc)
                return
            self._sync_busy = True
            self._sync_process_disk(path, text, enc)
        elif kind == "written":
            content, backup_path = rest
            if backup_path:
                self._sync_log(tr("sync.backup_saved", "[Auto Sync] Backup saved: {path}", path=backup_path), "blue")
            self._sync_on_written(content)
            self._sync_finish(True)
        elif kind == "error":
            error, connectivity = rest
            if not connectivity:
                self._sync_log(tr("sync.save_failed", "[Auto Sync] Failed to save the key file: {error}", error=error))
            self._sync_finish(False, error)
        elif kind == "busy":
            self._sync_busy = False
            self._sync_again = False
            self.root.after(1000, self._sync_kick)

    def _sync_offline_tick(self):
        self._sync_offline_timer = None
        if not self._sync_enabled or self._sync_offline_since is None:
            return
        minutes = int((time.time() - self._sync_offline_since) // 60)
        self._sync_log(tr("sync.still_offline",
                          "[Auto Sync] The key file has been unreachable for {minutes} min. Local changes are not synced yet. You can use SaveAs to keep a copy.",
                          minutes=minutes))
        self._sync_offline_timer = self.root.after(self.SYNC_OFFLINE_REMIND_MS, self._sync_offline_tick)

    def _sync_log(self, text, tag="red"):
        """自动同步的提示写进主窗口。"""
        try:
            self.text_area.insert(tk.END, f"\n{datetime.now().strftime('%H:%M:%S')} {text}\n", tag)
            self._auto_scroll()
        except tk.TclError:
            pass

    def _sync_on_written(self, content):
        frames = [f for f in self._sync_write_frames if self._widget_alive(f)]
        self._sync_set_base(ts_parse(content), frames)
        self._sync_write_frames = []
        pending = any(getattr(f, "_sync_pending", None) for f in self._notebook_frames())
        if self._sync_local_rev != self._sync_job_rev:
            self._sync_again = True           # 写入期间又有本地修改
        else:
            self._sync_set_modified(pending)

    # ---------------- 合并
    def _sync_process_disk(self, path, text, enc):
        """收到 ts 文件内容（定时检查发现变化，或本地修改后读到的）：合并，然后交给后台写入。"""
        try:
            action = self._sync_merge(path, text, enc)
        except Exception as e:
            self._sync_log(tr("sync.save_failed", "[Auto Sync] Failed to save the key file: {error}", error=repr(e)))
            self._sync_finish(False, e)
            return
        if action is not None and action[0] == "write" and self._sync_worker is not None:
            _, content, expected, backup_label = action
            self._sync_worker.post(("write", path, content, enc, expected, backup_label))
            return
        if action is not None and action[0] == "backup" and self._sync_worker is not None:
            self._sync_worker.post(("backup", path, action[1], enc, "local"))
        self._sync_finish(True)

    def _sync_merge(self, path, text, enc):
        """返回 None（不用写）/ ("write", 内容, 预期的 ts 内容, 备份标签) / ("backup", 内容) / ("pause",)。
        界面在这里就更新好了。"""
        self.file_encodings[path] = enc
        disk = ts_parse(text)
        if not disk:
            self._sync_log(tr("sync.invalid_file",
                              "[Auto Sync] No tab definitions found in the key file, so it was not loaded. Check whether the file is damaged: {path}",
                              path=path))
            return None
        disk_canon = ts_serialize(disk)
        if disk_canon == self._sync_base_canon and not self.script_modified:
            return None
        base = self._sync_base_tabs
        local = self._sync_snapshot()
        disk_map = ts_match_tabs(base, disk)
        entries, lkeys, dkeys, conflicts = ts_merge(base, local, disk, disk_map)
        if conflicts:
            unmatched = len(base) - sum(1 for b in disk_map if b is not None)
            big = len(conflicts) > self.SYNC_BIG_CONFLICTS or (bool(base) and unmatched / len(base) > 0.5)
            mode = self._sync_resolve(conflicts, entries, big, unmatched)
            if mode == "pause":
                self.key_sync_var.set(False)
                self._sync_stop()
                self._sync_log(tr("sync.paused", "[Auto Sync] Auto Sync is paused. Local changes are kept and not saved."), "blue")
                return ("pause",)
            if mode == "ts_all":
                # 以 ts 为准：先备份本地版本，再把界面换成 ts 的内容
                local_content = ts_serialize([(e["name"], e["buttons"]) for e in local])
                ref_by_base = {e["base"]: e["ref"] for e in local if e["base"] is not None}
                final = [_ts_entry(dn, db, ref_by_base.get(disk_map[j]), j) for j, (dn, db) in enumerate(disk)]
                frames = self._sync_apply(final)
                self._sync_set_base(disk, frames)
                self._sync_set_modified(False)
                return ("backup", local_content)
            if mode == "local_all":
                # 以本地为准：写入时先备份 ts 当前的版本
                for f in self._notebook_frames():
                    f._sync_pending = set()
                content = ts_serialize([(e["name"], e["buttons"]) for e in local])
                self._sync_write_frames = self._notebook_frames()
                return ("write", content, disk_canon, "ts")
        order = [k for k in ts_merge_order(lkeys, dkeys) if k in entries]
        final = [entries[k] for k in order]
        frames = self._sync_apply(final)
        file_tabs = [(e["name"], e["buttons"]) for e in final]
        content = ts_serialize(file_tabs)
        if content == disk_canon:
            self._sync_set_base(file_tabs, frames)
            self._sync_set_modified(any(e["pending"] for e in final))
            return None
        self._sync_write_frames = frames
        return ("write", content, disk_canon, None)

    def _sync_apply(self, final):
        """把合并结果放到界面上：尽量沿用原来的标签页和按键（已打开的编辑窗口还连着同一个按键），
        当前选中的标签页不变。返回按最终顺序排列的标签页 frame。"""
        self._sync_applying = True
        try:
            frames_before = self._notebook_frames()
            sel = self.notebook.select()
            sel_frame = self.notebook.nametowidget(sel) if sel else None
            sel_index = self.notebook.index(sel) if sel else 0
            ref_cell = next((c for f in frames_before for c in self._frame_cells(f)), None)
            frames = []
            for e in final:
                ui_buttons = dict(e["buttons"])
                for idx, val in e["ui"].items():
                    if val is None:
                        ui_buttons.pop(idx, None)
                    else:
                        ui_buttons[idx] = val
                frame = e["ref"] if e["ref"] is not None and self._widget_alive(e["ref"]) else None
                if frame is None:
                    self.create_tab_from_script(e["name"], ui_buttons)
                    frame = self.notebook.nametowidget(self.notebook.tabs()[-1])
                    self._sync_copy_theme(frame, ref_cell)
                else:
                    if self.notebook.tab(str(frame), "text") != e["name"]:
                        self.notebook.tab(str(frame), text=e["name"])
                    self._sync_update_cells(frame, ui_buttons)
                frame._sync_pending = set(e["pending"])
                frames.append(frame)
            keep = {str(f) for f in frames}
            for frame in frames_before:
                if str(frame) not in keep:
                    self.notebook.forget(str(frame))
                    self._destroy_tab_frame(frame)
            for i, frame in enumerate(frames):
                self.notebook.insert(i, frame)
            if sel_frame is not None and str(sel_frame) in keep:
                self.notebook.select(sel_frame)
            elif frames:
                self.notebook.select(frames[min(sel_index, len(frames) - 1)])
            return frames
        finally:
            self._sync_applying = False

    @staticmethod
    def _sync_copy_theme(frame, ref_cell):
        if ref_cell is None:
            return
        try:
            frame.configure(background=ref_cell.master.cget("background"))
            colors = {k: ref_cell.cget(k) for k in ("background", "foreground", "activebackground", "activeforeground")}
            for c in frame.winfo_children():
                if isinstance(c, tk.Button):
                    c.configure(**colors)
        except tk.TclError:
            pass

    def _sync_update_cells(self, frame, buttons):
        for cell in self._frame_cells(frame):
            new = buttons.get(self._cell_index(cell))
            if self._cell_value(cell) == new:
                continue
            name, data = new if new is not None else ("", "")
            self._sync_refresh_editor(cell, name, data)
            cell.config(text=name)
            cell.custom_data = data

    def _sync_refresh_editor(self, cell, name, data):
        """按键被 ts 文件改了：编辑窗口没在改就直接刷新；正在改就只提示，点 Save 时再让用户选。"""
        info = self.cell_edit_info.get(id(cell))
        if not info or info["cell"] is not cell or not self._widget_alive(info["win"]):
            return
        current = (info["entry"].get(), info["text"].get("1.0", tk.END).strip())
        if current == info["base"]:
            info["entry"].delete(0, tk.END)
            info["entry"].insert(0, name)
            info["text"].delete("1.0", tk.END)
            info["text"].insert("1.0", data)
            info["text"].edit_reset()
            info["base"] = (name, data)
            info["ext"] = False
            self._update_edit_title(id(cell))
            self._edit_notice(info, tr("edit.ext_updated", "Updated from the key file at {time}",
                                       time=datetime.now().strftime("%H:%M:%S")), "green")
        else:
            info["ext"] = True
            self._edit_notice(info, tr("edit.ext_changed",
                                       "This button was changed in the key file. When you click Save, you can choose which version to keep."),
                              "red")

    @staticmethod
    def _edit_notice(info, text, color):
        label = info.get("notice")
        if label is None:
            return
        try:
            label.config(text=text, fg=color)
            label.grid()
        except tk.TclError:
            pass

    # ---------------- 冲突处理
    def _sync_resolve(self, conflicts, entries, big, unmatched):
        """返回 "done" / "pause" / "ts_all" / "local_all"。"""
        if big:
            stats = {
                "tabs": len({c["key"] for c in conflicts}),
                "buttons": sum(1 for c in conflicts if c["kind"] == "button"),
                "names": sum(1 for c in conflicts if c["kind"] == "name"),
                "deletes": sum(1 for c in conflicts if c["kind"] == "delete"),
                "unmatched": unmatched,
            }
            mode = self._sync_summary_dialog(stats)
            if mode != "itemized":
                return mode
        all_side = None
        total = len(conflicts)
        for n, c in enumerate(conflicts, 1):
            choice = all_side
            if choice is None:
                if c["kind"] == "button":
                    choice, edited = self._conflict_button_dialog(c, n, total, allow_all=True)
                    if choice in ("local", "all_local"):
                        c["local"] = edited
                else:
                    choice = self._conflict_tab_dialog(c, n, total)
                if choice in ("all_local", "all_ts"):
                    all_side = choice
            if c["kind"] == "delete":
                if choice in ("all_local", "all_ts"):
                    deleter = "local" if choice == "all_local" else "ts"
                    side = "delete" if c["deleted_by"] == deleter else "keep"
                else:
                    side = choice
            else:
                side = {"all_local": "local", "all_ts": "ts"}.get(choice, choice)
            ts_apply_choice(entries, c, side)
        return "done"

    def _conflict_window(self, title, parent=None):
        win = tk.Toplevel(parent or self.root)
        win.withdraw()
        win.title(title)
        win.transient(parent or self.root)
        win.protocol("WM_DELETE_WINDOW", win.destroy)
        return win

    def _conflict_show(self, win, parent=None):
        place_on_parent_monitor(win, parent or self.root)
        win.deiconify()
        win.lift()
        win.grab_set()
        win.focus_force()
        win.wait_window()

    def _conflict_button_dialog(self, conflict, n, total, allow_all, parent=None):
        """按键冲突：左边本地（可改），右边 ts（只读可复制）。
        返回 (选择, 本地的值)；选择为 local / ts / cancel / all_local / all_ts。直接关窗口 = 取消。"""
        result = {"choice": "cancel", "value": conflict["local"]}
        win = self._conflict_window(tr("conflict.button_title", "Button Conflict {n}/{total}", n=n, total=total), parent)
        idx = conflict.get("idx", 0)
        tk.Label(win, justify="left", anchor="w", wraplength=760,
                 text=tr("conflict.button_msg",
                         "Button {idx} (row {row}, column {col}) in tab \"{tab}\" was changed both here and in the key file.",
                         idx=idx, row=idx // 6 + 1, col=idx % 6 + 1, tab=conflict.get("tab", ""))
                 ).grid(row=0, column=0, columnspan=2, sticky="w", padx=10, pady=(10, 6))
        win.columnconfigure(0, weight=1)
        win.columnconfigure(1, weight=1)
        win.rowconfigure(1, weight=1)

        def column(col, title, value, editable):
            frame = tk.LabelFrame(win, text=title)
            frame.grid(row=1, column=col, sticky="nsew", padx=10, pady=4)
            frame.columnconfigure(1, weight=1)
            frame.rowconfigure(1, weight=1)
            name, data = value if value is not None else ("", "")
            tk.Label(frame, text=tr("conflict.name", "Name:")).grid(row=0, column=0, sticky="w", padx=4, pady=4)
            entry = tk.Entry(frame)
            entry.insert(0, name)
            entry.grid(row=0, column=1, sticky="ew", padx=4, pady=4)
            text = scrolledtext.ScrolledText(frame, width=44, height=16, undo=editable)
            text.insert("1.0", data)
            text.grid(row=1, column=0, columnspan=2, sticky="nsew", padx=4, pady=4)
            if not editable:
                entry.config(state="readonly")

                def block(event):
                    # 只读，但可以选中、复制、移动光标
                    if event.state & 0x4 and event.keysym.lower() in ("c", "a", "insert"):
                        return None
                    if event.keysym in ("Left", "Right", "Up", "Down", "Home", "End", "Prior", "Next"):
                        return None
                    return "break"
                text.bind("<Key>", block)
                for ev in ("<<Paste>>", "<<Cut>>", "<<Clear>>"):
                    text.bind(ev, lambda e: "break")
            return entry, text

        l_entry, l_text = column(0, tr("conflict.local", "Local version (editable)"), conflict["local"], True)
        column(1, tr("conflict.ts", "Key file version (read-only)"), conflict["ts"], False)

        def done(choice):
            result["choice"] = choice
            name = l_entry.get()
            data = l_text.get("1.0", tk.END).strip()
            result["value"] = (name, data) if name.strip() else None
            win.destroy()

        bar = tk.Frame(win)
        bar.grid(row=2, column=0, columnspan=2, pady=(6, 10))
        tk.Button(bar, text=tr("conflict.keep_local", "Save Local Version"), command=lambda: done("local")).pack(side="left", padx=4)
        tk.Button(bar, text=tr("conflict.keep_ts", "Save Key File Version"), command=lambda: done("ts")).pack(side="left", padx=4)
        tk.Button(bar, text=tr("common.cancel", "Cancel"), command=lambda: done("cancel")).pack(side="left", padx=4)
        if allow_all and n < total:
            tk.Button(bar, text=tr("conflict.all_local", "Use Local for All Remaining"), command=lambda: done("all_local")).pack(side="left", padx=(16, 4))
            tk.Button(bar, text=tr("conflict.all_ts", "Use Key File for All Remaining"), command=lambda: done("all_ts")).pack(side="left", padx=4)
        self._conflict_show(win, parent)
        return result["choice"], result["value"]

    def _conflict_tab_dialog(self, conflict, n, total):
        """标签页冲突（名称 / 一边删除一边修改）。返回 local / ts（名称）、delete / keep（删除），
        或 all_local / all_ts。直接关窗口按不丢内容处理：名称用 ts 的，删除选保留。"""
        result = {"choice": "ts" if conflict["kind"] == "name" else "keep"}
        win = self._conflict_window(tr("conflict.tab_title", "Tab Conflict {n}/{total}", n=n, total=total))
        if conflict["kind"] == "name":
            msg = tr("conflict.name_msg",
                     "This tab was renamed both here and in the key file.\n\nLocal name: {local}\nKey file name: {ts}",
                     local=conflict["local"], ts=conflict["ts"])
            options = [(tr("conflict.use_local_name", "Use Local Name"), "local"),
                       (tr("conflict.use_ts_name", "Use Key File Name"), "ts")]
        else:
            if conflict["deleted_by"] == "ts":
                msg = tr("conflict.deleted_by_ts_msg",
                         "Tab \"{tab}\" was deleted in the key file, but it was changed here (or has an open edit window).",
                         tab=conflict["tab"])
            else:
                msg = tr("conflict.deleted_by_local_msg",
                         "Tab \"{tab}\" was deleted here, but it was changed in the key file.", tab=conflict["tab"])
            options = [(tr("conflict.delete_tab", "Delete Tab"), "delete"),
                       (tr("conflict.keep_tab", "Keep Tab"), "keep")]
        tk.Label(win, text=msg, justify="left", wraplength=460).pack(padx=16, pady=(14, 10), anchor="w")
        bar = tk.Frame(win)
        bar.pack(pady=(0, 12), padx=10)

        def done(choice):
            result["choice"] = choice
            win.destroy()
        for label, value in options:
            tk.Button(bar, text=label, command=lambda v=value: done(v)).pack(side="left", padx=4)
        if n < total:
            tk.Button(bar, text=tr("conflict.all_local", "Use Local for All Remaining"), command=lambda: done("all_local")).pack(side="left", padx=(16, 4))
            tk.Button(bar, text=tr("conflict.all_ts", "Use Key File for All Remaining"), command=lambda: done("all_ts")).pack(side="left", padx=4)
        self._conflict_show(win)
        return result["choice"]

    def _sync_summary_dialog(self, stats):
        """差异太大时的总结窗口。返回 ts_all / local_all / itemized / pause（直接关窗口 = 暂停同步）。"""
        result = {"choice": "pause"}
        win = self._conflict_window(tr("conflict.summary_title", "Many Differences"))
        tk.Label(win, justify="left", wraplength=520, text=tr(
            "conflict.summary_msg",
            "Both this window and the key file were changed a lot since the last sync:\n\n"
            "  Tabs with conflicts: {tabs}\n  Button conflicts: {buttons}\n  Tab name conflicts: {names}\n"
            "  Tabs deleted on one side and changed on the other: {deletes}\n  Tabs that cannot be matched: {unmatched}\n\n"
            "The version that is discarded is backed up first.", **stats)).pack(padx=16, pady=(14, 10), anchor="w")
        bar = tk.Frame(win)
        bar.pack(pady=(0, 12), padx=10)

        def done(choice):
            result["choice"] = choice
            win.destroy()
        for label, value in ((tr("conflict.use_ts_all", "Use Key File (discard local)"), "ts_all"),
                             (tr("conflict.use_local_all", "Use Local (overwrite key file)"), "local_all"),
                             (tr("conflict.itemized", "Resolve One by One"), "itemized"),
                             (tr("conflict.pause", "Pause Auto Sync"), "pause")):
            tk.Button(bar, text=label, command=lambda v=value: done(v)).pack(side="left", padx=4)
        self._conflict_show(win)
        return result["choice"]

    # ---------------- 同步模式下需要等保存完成的场合（关闭窗口、加载前提示保存）
    def _sync_blocking_save(self):
        """返回 True 表示已经保存好（或不需要保存）。"""
        deadline = time.time() + 15
        while self._sync_busy and time.time() < deadline:
            self.root.update()
            time.sleep(0.05)
        path = self._sync_path()
        self._sync_busy = True
        try:
            for _ in range(3):
                text, enc, fp = ts_read_stable(path)
                self._sync_last_fp = fp
                action = self._sync_merge(path, text, enc)
                if action is None:
                    return not self.script_modified
                if action[0] == "pause":
                    return False
                if action[0] == "backup":
                    ts_backup(path, action[1], enc, "local")
                    return True
                _, content, expected, backup_label = action
                self._sync_job_rev = self._sync_local_rev
                result = ts_locked_write(path, content, enc, expected, backup_label)
                self._sync_last_fp = result[2]
                if result[0] == "written":
                    self._sync_on_written(content)
                    return not self.script_modified
            return False
        except Exception as e:
            messagebox.showerror(tr("common.error", "Error"),
                                 tr("file.save_script_failed", "Failed to save script: {error}", error=e), parent=self.root)
            return False
        finally:
            self._sync_busy = False

    def get_ports(self):
        ports = [port.device for port in serial.tools.list_ports.comports()]
        return ports if ports else [tr("send.no_ports", "No ports available")]

    def refresh_ports(self):
        ports = self.get_ports()
        self.port_menu["values"] = ports
        if ports:
            self.port_var.set(ports[0])

    def toggle_serial(self):
    # 如果当前没有连接或串口未打开，则尝试连接
        if self.serial_conn is None or not (self.serial_conn.ser and self.serial_conn.ser.is_open):
            self.connect_serial()  # connect_serial 内部会更新相关状态
            # 如果连接成功，则更新按钮文字为“断开串口”
            if self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open:
                self.toggle_port_btn.config(text=tr("main.disconnect_serial", "Disconnect"))
        else:
            self.close_serial()  # close_serial 内部更新状态
            self.toggle_port_btn.config(text=tr("main.connect_serial", "Connect"))

    def connect_serial(self):
        port = self.port_var.get()
        baudrate = int(self.baud_var.get())
        try:
            self.serial_conn = SerialComm(port, baudrate)
            # 判断串口对象是否成功打开
            if self.serial_conn.ser and self.serial_conn.ser.is_open:
                self.send_btn.config(state=tk.NORMAL) #发送
                self.single_loop_send_btn.config(state=tk.NORMAL) #单行循环
                #self.start_button.config(state=tk.NORMAL) # 开始运行按钮，新增了脚本对COM口的操作，此行注释掉
                self.toggle_port_btn.config(text=tr("main.close_serial", "Close Port"))
                self.port_menu.config(state="disabled")
                self.baud_menu.config(state="disabled")
                self.refresh_btn.config(state="disabled")
                self.status_canvas.config(bg="green")
                self.tk_safe(lambda: self.text_area.insert(tk.END, tr("serial.opened", "Port opened: {port} @ {baudrate}bps", port=port, baudrate=baudrate) + "\n"))
                self.tk_safe(lambda: self._auto_scroll())
                self.stop_reading = False
                self.reading_thread = threading.Thread(target=self.read_from_serial, daemon=True)
                self.reading_thread.start()
            else:
                # 串口未打开成功，给出错误提示
                self.tk_safe(lambda: self.text_area.insert(tk.END, tr("serial.connect_failed", "Error: cannot connect to {port}", port=port) + "\n"))
                self.tk_safe(lambda: self._auto_scroll())
        except Exception as e:
            self.tk_safe(lambda: self.text_area.insert(tk.END, tr("serial.connect_failed", "Error: cannot connect to {port}", port=port) + "\n"))
            self.tk_safe(lambda: self._auto_scroll())

    def close_serial(self):
        if self.serial_conn:
            self.stop_reading = True
            self.serial_conn.close()
            self.send_btn.config(state=tk.DISABLED) #发送
            self.single_loop_send_btn.config(state=tk.DISABLED) #单行循环
            #self.start_button.config(state=tk.DISABLED) # 开始运行按钮，新增了脚本对COM口的操作，此行注释掉
            #self.stop_button.config(state=tk.DISABLED)
            #self.pause_button.config(state=tk.DISABLED)
            self.toggle_port_btn.config(text=tr("main.open_serial", "Open Port"))
            self.port_menu.config(state="readonly")
            self.baud_menu.config(state="readonly")
            self.refresh_btn.config(state="normal")
            self.status_canvas.config(bg="gray")
            self.tk_safe(lambda: self.text_area.insert(tk.END, tr("serial.closed", "Port closed") + "\n"))
            self.tk_safe(lambda: self._auto_scroll())

            #if self.loop_sending:
                #self.loop_sending = False
                #self.single_loop_send_btn.config(text="单行循环")

    def open_ssh_config_window(self):
        win = tk.Toplevel(self.root)
        win.title(tr("ssh.config_title", "SSH Config"))

        # 固定初始大小
        width, height = 200, 180
        screen_w = win.winfo_screenwidth()
        screen_h = win.winfo_screenheight()
        x = (screen_w - width) // 2
        y = (screen_h - height) // 2
        win.geometry(f"{width}x{height}+{x}+{y}")

        tk.Label(win, text=tr("ssh.ip", "IP Address:")).pack()
        ip_entry = tk.Entry(win)
        ip_entry.pack()
        ip_entry.insert(0, getattr(self, 'ssh_ip', ''))

        tk.Label(win, text=tr("ssh.username", "Username:")).pack()
        user_entry = tk.Entry(win)
        user_entry.pack()
        user_entry.insert(0, getattr(self, 'ssh_user', ''))

        tk.Label(win, text=tr("ssh.password", "Password:")).pack()
        pwd_entry = tk.Entry(win, show="*")
        pwd_entry.pack()
        pwd_entry.insert(0, getattr(self, 'ssh_password', ''))

        def connect_ssh():
            self.ssh_ip = ip_entry.get().strip()
            self.ssh_user = user_entry.get().strip()
            self.ssh_password = pwd_entry.get().strip()

            threading.Thread(target=self._ssh_connect_thread, daemon=True).start()

        def disconnect_ssh():
            self._ssh_disconnect()

        btn_frame = tk.Frame(win)
        btn_frame.pack(pady=5)

        tk.Button(btn_frame, text=tr("ssh.connect", "Connect"), command=connect_ssh).pack(side=tk.LEFT, padx=5)
        tk.Button(btn_frame, text=tr("ssh.disconnect", "Disconnect"), command=disconnect_ssh).pack(side=tk.LEFT, padx=5)

    def _ssh_connect_thread(self):
        try:
            # 创建 SSH 客户端
            self.ssh_client = paramiko.SSHClient()
            self.ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            self.ssh_client.connect(
                hostname=self.ssh_ip,
                username=self.ssh_user,
                password=self.ssh_password
            )

            # 创建交互式 shell
            self.ssh_channel = self.ssh_client.invoke_shell()
            self.ssh_channel.settimeout(0.0)  # 非阻塞模式

            # 更新状态颜色
            self.ssh_status_canvas.config(bg="green")

            # 启动接收线程
            threading.Thread(target=self._ssh_receive_loop, daemon=True).start()

        except Exception as e:
            messagebox.showerror(tr("ssh.connect_failed", "SSH Connection Failed"), str(e), parent=self.root)


    def _ssh_disconnect(self):
        try:
            if hasattr(self, 'ssh_channel'):
                self.ssh_channel.close()
            if hasattr(self, 'ssh_client'):
                self.ssh_client.close()
            self.ssh_status_canvas.config(bg="gray")
        except:
            pass

    def _ssh_receive_loop(self):
        """接收 SSH 数据并写入 text_area"""
        try:
            while True:
                if not self.ssh_channel.recv_ready():
                    time.sleep(0.05)
                    continue
                data = self.ssh_channel.recv(4096).decode('utf-8', errors='ignore')
                if not data:
                    break
                self._append_text(data)
        except Exception:
            pass

    # Windows 文件名里不允许出现的字符。半角冒号最危险：open() 不会报错，
    # 而是把内容写进 NTFS 的备用数据流，资源管理器里只看得到一个 0 字节的空文件。
    INVALID_NAME_CHARS = '<>:"/\\|?*'
    # 建议的单文件容量上限（MB），超过会提示可能卡顿
    RECOMMENDED_MAX_CAPACITY_MB = 20

    @classmethod
    def _find_invalid_name_chars(cls, text):
        """找出文件名里不能用的字符，返回可读的列表（去重、保持出现顺序）。"""
        bad = []
        for ch in text:
            if ch in cls.INVALID_NAME_CHARS:
                item = ch
            elif ord(ch) < 32:
                item = f"\\x{ord(ch):02x}"
            else:
                continue
            if item not in bad:
                bad.append(item)
        return bad

    @staticmethod
    def _is_absolute_dir_path(path):
        """
        判断是否是完整的绝对路径。
        os.path.isabs 在部分 Python 版本里会把 '\\logs' 当成绝对路径，
        所以这里用 splitdrive 自己判断：必须有盘符或 UNC 前缀，且其后紧跟分隔符。
        """
        drive, rest = os.path.splitdrive(path)
        if not drive:
            return False
        return rest[:1] in ("\\", "/") or drive.startswith("\\\\")

    def _check_auto_save_target(self, path, fname):
        """校验自动保存的路径和文件名。合格返回空字符串，否则返回不合格的原因。"""
        if not path:
            return tr("autosave.no_path",
                      "No auto save path set.\n\n"
                      "Click the … button to the right of the path box and choose a folder for the logs.")
        if not fname:
            return tr("autosave.no_filename",
                      "No file name set.\n\n"
                      "Enter a name in \"File name\". Date and time are appended automatically.")

        bad = self._find_invalid_name_chars(fname)
        if bad:
            return tr("autosave.invalid_chars",
                      "The file name contains characters that Windows does not allow:\n\n"
                      "        {chars}\n\n"
                      "Not allowed:  < > : \" / \\ | ? *\n\n"
                      "Watch out for the colon: it raises no error, but the log is written into a\n"
                      "hidden NTFS data stream, and Explorer shows only an empty 0-byte file, so it\n"
                      "looks as if nothing was saved.\n\n"
                      "Current file name: {fname}",
                      chars="  ".join(bad), fname=fname)

        if not self._is_absolute_dir_path(path):
            return tr("autosave.not_absolute",
                      "The auto save path must be a full absolute path, e.g.  D:\\log  or  \\\\server\\share.\n\n"
                      "Current value: {path}\n"
                      "Resolves to: {abspath}\n\n"
                      "Forms like logs, . or C: are relative to the program's working directory.\n"
                      "That directory differs when started by double-click, a shortcut or another program,\n"
                      "so the file may end up somewhere unexpected, without any error.",
                      path=path, abspath=os.path.abspath(path))

        if not os.path.exists(path):
            return tr("autosave.path_missing",
                      "The auto save path does not exist:\n\n"
                      "        {path}\n\n"
                      "The folder is not created automatically, to avoid stray folders from typos.\n"
                      "Create it in Explorer first, or use the … button to choose an existing one.",
                      path=path)
        if not os.path.isdir(path):
            return tr("autosave.path_is_file",
                      "The auto save path points to a file, not a folder:\n\n"
                      "        {path}\n\n"
                      "Please enter a folder path.",
                      path=path)
        return ""

    def _check_auto_save_capacity(self):
        """
        校验“文件最大容量”。
        返回 (是否可以继续, 是否需要用户确认, 提示文字)。
        """
        raw = self.max_capacity_entry.get().strip()
        advice = tr("autosave.capacity_advice",
                    "Recommended: no more than {max_mb} MB. Very large log files open slowly\n"
                    "or not at all in text editors, and writing and rotation may lag.",
                    max_mb=self.RECOMMENDED_MAX_CAPACITY_MB)
        if not raw:
            return False, False, (tr("autosave.capacity_empty",
                                     "\"Max file size\" is empty.\n\n"
                                     "Enter a number greater than 0, in MB.")
                                  + "\n\n" + advice)
        try:
            value = float(raw)
        except ValueError:
            return False, False, (tr("autosave.capacity_not_number",
                                     "\"Max file size\" is \"{raw}\", which is not a valid number.\n\n"
                                     "Enter digits only, without the unit (MB is shown to the right),\n"
                                     "and without thousands separators.",
                                     raw=raw)
                                  + "\n\n" + advice)
        if value <= 0:
            return False, False, (tr("autosave.capacity_not_positive",
                                     "\"Max file size\" is {raw}; it must be greater than 0.\n\n"
                                     "0 or a negative value makes the file count as full every 10 seconds,\n"
                                     "so the program keeps closing it and creating new ones, producing many small files.",
                                     raw=raw)
                                  + "\n\n" + advice)
        if value > self.RECOMMENDED_MAX_CAPACITY_MB:
            return True, True, (tr("autosave.capacity_large",
                                   "Max file size is set to {raw} MB, which is large.",
                                   raw=raw)
                                + "\n\n" + advice + "\n\n"
                                + tr("autosave.capacity_large_confirm",
                                     "Enable auto save with this setting anyway?"))
        return True, False, ""

    def _auto_save_capacity_mb(self, default=10.0):
        """取“文件最大容量”的有效数值；非法或 <=0 时用默认值，避免每次检查都触发轮转。"""
        try:
            value = float(self.max_capacity_entry.get().strip())
        except Exception:
            return default
        return value if value > 0 else default

    # 创建自动保存文件
    def create_auto_save_file(self):
        path = self.auto_save_path_entry.get().strip()
        fname = self.file_name_entry.get().strip()

        # 先校验路径和文件名，不合格就说明原因并停止，不再去 open()
        reason = self._check_auto_save_target(path, fname)
        if reason:
            self.tk_safe(lambda: messagebox.showwarning(tr("autosave.cannot_enable", "Cannot Enable Auto Save"), reason, parent=self.root))
            return None

        # 构造文件名：保存文件名_YYYY-MM-DD_HH_MM_SS.txt
        filename = f"{fname}_{time.strftime('%Y-%m-%d')}_{time.strftime('%H-%M-%S')}.txt"
        full_path = os.path.abspath(os.path.join(path, filename))
        try:
            new_file = open(full_path, "w", encoding="utf-8")
        except Exception as e:
            # 把完整路径和长度一并给出，方便判断是权限、路径过长还是别的原因
            msg = tr("autosave.create_failed",
                     "Cannot create auto save file:\n\n{error}\n\n"
                     "Full path ({length} characters):\n{path}",
                     error=e, length=len(full_path), path=full_path)
            self.tk_safe(lambda: messagebox.showerror(tr("common.error", "Error"), msg, parent=self.root))
            return None

        # 把实际写入的绝对路径显示出来，避免以后再出现“文件到底存哪了”的问题
        self.tk_safe(lambda: self.text_area.insert(
            tk.END, tr("autosave.enabled", "Auto save on, file: {path}", path=full_path) + "\n", "green"))
        self.tk_safe(lambda: self._auto_scroll())
        return new_file

    def send_data_btn(self, event=None):
        """
        由“发送”按钮或回车触发：
         - 读取输入框 text；
         - 根据“发送新行”复选框决定是否添加 '\\n'；
         - 复用 send_via_serial 完成发送与拦截；
         - 最后更新已发送命令历史。
        """
        if self.serial_conn:
            data = self.send_entry.get()
            if not data:
                return

            # 通过 add_newline 参数控制是否在末尾补 '\n'
            self.send_via_serial(data, add_newline=self.send_newline_var.get())

            # 更新已发送命令历史
            self.add_sent_command(data)

    def toggle_loop_send(self):
        if not self.loop_sending:
            self.loop_sending = True
            self.single_loop_send_btn.config(text=tr("main.stop_sending", "Stop"))
            self.loop_thread = threading.Thread(target=self.loop_send, daemon=True)
            self.loop_thread.start()
        else:
            self.loop_sending = False
            self.single_loop_send_btn.config(text=tr("main.single_loop", "Loop Send"))

    def loop_send(self):
        while self.loop_sending:
            try:
                interval = float(self.loop_interval_entry.get())
                if interval <= 0:
                    interval = 3
            except Exception:
                interval = 3
            data = self.send_entry.get()
            if data and self.serial_conn:
                # 如果选中发送新行被勾选
                if self.send_newline_var.get():
                    data_to_send = data + "\n"
                else:
                    data_to_send = data
                # 如果选中时间戳，则先插入发送时间

                if self.timestamp_onoff.get():
                    timestamp_str = datetime.now().strftime("%H:%M:%S.%f")[:-3]
                    # 使用 after(0, lambda: ( 将要执行的语句包住，可以让子进程不会跟其他进程冲突
                    self.tk_safe(lambda: self.text_area.insert(tk.END, f"\nSend at    {timestamp_str}\n", "blue"))
                self.serial_conn.send_data(data_to_send)
                # 使用 after(0, lambda: ( 将要执行的语句包住，可以让子进程不会跟其他进程冲突

                self.tk_safe(lambda: self.text_area.insert(tk.END, f"{data_to_send}"))
                self.tk_safe(lambda: self._auto_scroll())
                


                self.sent_bytes += len(data_to_send.encode())
                self.update_data_stats()
            sleep_time = 0
            while sleep_time < interval and self.loop_sending:
                time.sleep(0.1)
                sleep_time += 0.1

    def read_from_serial(self):
        self.recv_buffer = ""
        # UTF-8 增量解码器：多字节字符跨读取边界时不再变成 U+FFFD
        self._rx_decoder = codecs.getincrementaldecoder('utf-8')(errors='replace')
        # 记录本线程上一轮用的是不是 HEX 显示，用于发现下拉框切档
        rx_hex_active = self.hex_rx_display
        self.last_serial_receive_update_time = time.time()
        while not self.stop_reading:
            if self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open:
                try:
                    # 使用 read() 读取当前缓冲区中的所有数据，如果没有数据则至少读取1个字节
                    data_bytes = self.serial_conn.ser.read_all()
                    self.current_read_time = time.time() # 获取当前时间
                    if data_bytes:
                        # 如果接收到了数据，也要进行一次判断，current time是否超过last time 0.1秒
                        if self.last_data_time is not None and (self.current_read_time - self.last_data_time) >= 0.1:
                            self.allow_new_timestamp = True  # 超过 0.1 秒后，允许下一次插入时间戳
                        self.last_data_time = self.current_read_time  # 更新最近接收时间
                        # 如果选中时间戳，则先插入接收时间
                        if self.timestamp_onoff.get() and self.allow_new_timestamp:
                            timestamp_str = datetime.now().strftime("%H:%M:%S.%f")[:-3]
                            self.tk_safe(lambda: self.text_area.insert(tk.END, f"\nReceive at {timestamp_str}\n", "green"))
                            self.allow_new_timestamp = False  # 插入一次时间戳后禁止后续插入
                        # 显示方式在“HEX显示”与其他档位之间切换时，丢掉增量解码器里
                        # 可能挂着的半个多字节字符，避免切换后第一个字符是乱码
                        rx_hex_now = self.hex_rx_display
                        if rx_hex_now != rx_hex_active:
                            self._rx_decoder = codecs.getincrementaldecoder('utf-8')(errors='replace')
                            rx_hex_active = rx_hex_now
                        if rx_hex_now:
                            # HEX显示：不做任何文本解码，每字节两位十六进制、空格分隔。
                            # 末尾补一个空格，保证跨 read_all() 边界的字节之间也是分开的
                            received_str = data_bytes.hex(' ').upper() + ' '
                        else:
                            # 用增量解码器，避免一个多字节字符被 read_all() 切开后变成乱码方块
                            received_str = self._rx_decoder.decode(data_bytes)
                        self.recv_buffer += received_str

                    else:
                        # 如果没有接收到数据，计算当前时间和上次接收时间是否超过0.1秒，超过则允许下一次插入时间戳
                        if self.last_data_time is not None and (self.current_read_time - self.last_data_time) >= 0.1:
                            self.allow_new_timestamp = True  # 超过 0.1 秒后，允许下一次插入时间戳
                        # 如果没有接收到数据，短暂休眠，避免占用过多 CPU 资源
                        time.sleep(0.001)

                    # 定期批量刷新UI（每200ms或缓存>2KB）
                    if len(self.recv_buffer) > 2048 or ((self.current_read_time - self.last_serial_receive_update_time) > 0.1 and len(self.recv_buffer)>0):
                        # 孤立的 \r 与被切开的转义序列都由 AnsiTextRenderer 负责跨块拼接
                        chunk = self.recv_buffer
                        self.recv_buffer = ""
                        self.tk_safe(lambda c=chunk: self.text_area.insert(tk.END, c))
                        self.tk_safe(lambda: self._auto_scroll())
                        self.last_serial_receive_update_time = self.current_read_time
                        self.received_bytes += len(data_bytes)
                        self.update_data_stats()

                except Exception as e:
                    print(f"read_from_serial error: {e}")
                    break

    def update_data_stats(self):
        # 如果发送或接收的字节数超过 1,000,000,000，则重置为0
        if self.sent_bytes >= 1_000_000_000:
            self.sent_bytes = 0
        if self.received_bytes >= 1_000_000_000:
            self.received_bytes = 0
        self.tk_safe(lambda: self.data_stats.set(tr("main.data_stats", "Sent: {sent} | Recv: {recv}", sent=format_bytes(self.sent_bytes), recv=format_bytes(self.received_bytes))))

    def new_port(self):
        #self.root.update_idletasks()
        # 获取当前窗口位置
        x = self.root.winfo_x()
        y = self.root.winfo_y()
        # 设定新窗口偏移量，比如偏移50像素
        new_x = x + 10
        new_y = y + 10
        new_win = tk.Toplevel(self.root)
        # 创建新窗口时，传入 center=False，不让其居中
        SerialGUI(new_win, center=False)
        new_win.geometry(f"+{new_x}+{new_y}")

    # --- 新增的 Alt 组合键处理函数 ---
    def on_alt_c_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x03') # Alt+C -> Ctrl+C (ETX)
        print("发送 Alt+C (0x03) 信号到串口。")
        return "break"

    def on_alt_d_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x04') # Alt+D -> Ctrl+D (EOT)
        print("发送 Alt+D (0x04) 信号到串口。")
        return "break"

    def on_alt_z_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x1A') # Alt+Z -> Ctrl+Z (SUB)
        print("发送 Alt+Z (0x1A) 信号到串口。")
        return "break"

    def on_alt_l_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x0C') # Alt+L -> Ctrl+L (FF - Form Feed, Clear Screen)
        print("发送 Alt+L (0x0C) 信号到串口。")
        return "break"

    def on_alt_a_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x01') # Alt+A -> Ctrl+A (SOH - Start of Header, Go to Beginning of Line)
        print("发送 Alt+A (0x01) 信号到串口。")
        return "break"

    def on_alt_e_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x05') # Alt+E -> Ctrl+E (ENQ - Enquiry, Go to End of Line)
        print("发送 Alt+E (0x05) 信号到串口。")
        return "break"

    def on_alt_k_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x0B') # Alt+K -> Ctrl+K (VT - Vertical Tab, Cut to End of Line)
        print("发送 Alt+K (0x0B) 信号到串口。")
        return "break"

    def on_alt_u_press(self, event):
        if not self.serial_conn:
            return "break"
        self.serial_conn.send_byte_data(b'\x15') # Alt+U -> Ctrl+U (NAK - Negative Acknowledge, Cut to Beginning of Line)
        print("发送 Alt+U (0x15) 信号到串口。")
        return "break"
    
    def on_key_press(self, event):
        """
        按键时：
         - 将输入字符写入input buffer，并更新光标位置
         - 如果是回车键，则判断串口是否打开，若打开则发送input buffer的内容（附带回车），并清空input buffer
         - 如果input buffer为空，则判断串口是否打开，若打开则发送回车字符
         - backspace键删除光标前的字符
         - 左右键时移动光标
         - 不再直接写入 autosave 文件，由后台线程统一处理
        """
        # 如果主键盘和小键盘的回车键被按下
        if event.keysym in ("Return", "KP_Enter"):
            # Enter key pressed
            # 如果有输入内容
            if self.input_buffer.strip():
                # 可选：先插入“Send at”时间戳
                if self.timestamp_onoff.get():
                    ts = datetime.now().strftime("%H:%M:%S.%f")[:-3]
                    self.text_area.insert(tk.END, f"\nSend at    {ts}\n", "blue")

                # 用统一入口发送，包括 PowerShell 拦截
                self.send_via_serial(self.input_buffer,add_newline=True,insert_display=False)
                self.add_sent_command(self.input_buffer) # 更新已发送命令
                self.sent_commands_number = -1  # 重置上下键的命令索引
            else:
                # 缓冲区为空时，仅发送一个回车
                self.send_via_serial("",
                                     add_newline=True,insert_display=False)
            self._auto_scroll()
            self.update_data_stats()
            # 只要按下回车，就在文本框中进行换行
            #self.append_to_text_area(f"\n")
            # Clear the input buffer, reset cursor
            self.input_buffer = ""
            self.input_buffer_cursor = 0
            # Move cursor to the end of the text area

            self.text_area.mark_set("insert", "end")
            self.text_area.see("end")
            
            #return "break"  # Prevent default newline insertion
        
            # 处理 BackSpace 键：删除光标前的一个字符
        elif event.keysym == "BackSpace":
            if self.input_buffer_cursor > 0:
                self.input_buffer = (self.input_buffer[:self.input_buffer_cursor - 1] +
                                     self.input_buffer[self.input_buffer_cursor:])
                self.input_buffer_cursor -= 1
            else:
                return "break"# 如果已输入内容的计数值已归零，则禁止backspace本身在主窗口中的删除操作

        # 处理左箭头：向左移动光标
        elif event.keysym == "Left":
            if self.input_buffer_cursor > 0:
                self.input_buffer_cursor -= 1
            else:
                return "break"# 如果已输入内容的计数值已归零，则禁止移动

        # 处理右箭头：向右移动光标
        elif event.keysym == "Right":
            if self.input_buffer_cursor < len(self.input_buffer):
                self.input_buffer_cursor += 1
            else:
                return "break"# 不满足则禁止移动
        
        elif event.keysym == "Up":
            # 处理上箭头键：浏览之前的命令
            if self.sent_commands:
                if self.sent_commands_number >= -1 and self.sent_commands_number < len(self.sent_commands) - 1:
                    self.sent_commands_number += 1
                    self._replace_input_buffer_with_command()
                #elif self.sent_commands_number == len(self.sent_commands) - 1:
                #    self._replace_input_buffer_with_command()
            return "break"

        elif event.keysym == "Down":
            # 处理下箭头键：浏览之后的命令
            if self.sent_commands:
                if self.sent_commands_number < len(self.sent_commands) and self.sent_commands_number > 0:
                     self.sent_commands_number -= 1
                     self._replace_input_buffer_with_command()
                elif self.sent_commands_number == 0:
                    self._clear_input_buffer()
                    self.sent_commands_number = -1
            return "break"

        elif event.char and event.keysym not in ("BackSpace", "Tab", "Shift_L", "Shift_R", "Control_L", "Control_R", "Alt_L", "Alt_R"):
                    # 在光标位置插入字符
            self.input_buffer = (self.input_buffer[:self.input_buffer_cursor] + event.char + self.input_buffer[self.input_buffer_cursor:])
            self.input_buffer_cursor += 1
        # Allow default behavior for other keys
        return None

    def _replace_input_buffer_with_command(self):
        """用历史命令替换当前输入缓冲区的内容。"""
        if 0 <= self.sent_commands_number < len(self.sent_commands):
            command = self.sent_commands[self.sent_commands_number]
            # 删除当前输入缓冲区的内容
            self.text_area.delete("insert -%dc" % len(self.input_buffer), "insert")
            # 插入历史命令
            self.text_area.insert("insert", command)
            self.input_buffer = command
            self.input_buffer_cursor = len(command)

    def _clear_input_buffer(self):
        """清空输入缓冲区。"""
        self.text_area.delete("insert -%dc" % len(self.input_buffer), "insert")
        self.input_buffer = ""
        self.input_buffer_cursor = 0

    def add_sent_command(self, command):
        # 如果命令为空，则不更新
        if command.strip() == "":
            return
        # 如果已经有发送记录，并且最新的一条记录与当前命令相同，则不更新
        if self.sent_commands and self.sent_commands[0] == command:
            return
        # 插入到列表头部
        self.sent_commands.insert(0, command)
        # 如果列表元素超过20个，则删除最后一个
        if len(self.sent_commands) > 20:
            self.sent_commands.pop()
        # 更新下拉框的可选值
        self.send_entry['values'] = self.sent_commands

    def toggle_auto_save(self):
        # 当点击按钮时为 "OFF" ，则尝试开启自动保存，并更改按钮状态和文字
        if self.auto_save_btn.cget("text") == "OFF":
            # 先校验文件最大容量：不合格就说明原因并停止，不去创建文件
            cap_ok, cap_confirm, cap_msg = self._check_auto_save_capacity()
            if not cap_ok:
                self.tk_safe(lambda: messagebox.showwarning(
                    tr("autosave.cannot_enable", "Cannot Enable Auto Save"), cap_msg, parent=self.root))
                return
            if cap_confirm:
                if not self.tk_safe(lambda: messagebox.askokcancel(
                        tr("autosave.capacity_large_title", "File Size Large"), cap_msg, parent=self.root)):
                    return
            new_file = self.create_auto_save_file()
            if new_file is None:
                return
            self.auto_save_file = new_file
            self.last_saved_index = self.text_area.index("end-1c")
            self.auto_save_stop = False
            self.auto_save_btn.config(text="ON", bg="green")
            # 开启自动保存和关闭自动保存时，都立即执行一次是否清屏的检查并执行一次保存
            self.auto_save_and_auto_delete_onetime()
        else:
            # 先立即执行一次保存操作，然后再停止
            self.auto_save_and_auto_delete_onetime()
            # 关闭自动保存
            self.auto_save_stop = True
            if self.auto_save_file:
                self.auto_save_file.close()
                self.auto_save_file = None
            self.auto_save_btn.config(text="OFF", bg="gray")

    def tk_safe(self, expr, wait=None):
        """
        在主线程安全执行 Tkinter 表达式。
        - 如果从主线程调用，则直接执行并返回结果。
        - 如果从子线程调用，则调度到主线程，并阻塞等待结果返回。
        """
        # 1. 正确地判断当前是否在主GUI线程
        if threading.current_thread() is threading.main_thread():
            # --- 主线程路径 ---
            # 已经在本垒，直接执行即可
            try:
                return expr()
            except Exception as e:
                print(f"在 tk_safe (主线程模式) 中直接执行时发生异常: {e}")
                raise  # 将异常重新抛出，以便上层代码能感知到
        else:
            # --- 子线程路径 ---
            # 保持原有的事件等待机制
            result = []
            event = threading.Event()

            def wrapper():
                try:
                    r = expr()
                    result.append(r)
                except Exception as e:
                    result.append(e)
                finally:
                    event.set()

            # 将任务调度到主线程的事件队列
            self.root.after(0, wrapper)

            # 阻塞当前子线程，等待主线程完成任务并设置事件
            event.wait(timeout=10.0)  # 设置10秒超时以防万一

            if result:
                res = result[0]
                if isinstance(res, Exception):
                    raise res  # 将在主线程中捕获的异常在子线程中重新抛出
                return res
            else:
                # 如果超时，result列表会是空的
                raise TimeoutError("tk_safe 在等待主线程返回时超时")

    def auto_save_and_auto_delete_onetime(self):
        # 执行自动保存操作（如果标志位打开）
        if not self.auto_save_stop:
            print("auto save func start")
            #获取当前文本框末尾的索引
            current_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
            # 获取从上次保存到当前的新内容
            if self.tk_safe(lambda: self.text_area.compare(self.last_saved_index, ">", current_index)):
                self.last_saved_index = current_index
                self.auto_save_new_text = ""
            else:
                self.auto_save_new_text = self.tk_safe(lambda: self.text_area.get(self.last_saved_index, current_index))
                print(f"save content start index is {self.last_saved_index} end index is {current_index}")
            if self.auto_save_new_text and self.auto_save_file:
                self.last_saved_index = current_index  # 更新最后保存位置
                try:
                    self.auto_save_file.write(self.auto_save_new_text)
                    self.auto_save_file.flush()
                    # 检查当前 autosave 文件大小（单位：字节）
                    current_size = self.auto_save_file.tell()
                    # 容量非法或 <=0 时用默认值，避免恒真导致每 10 秒轮转一个新文件
                    max_capacity_mb = self._auto_save_capacity_mb()
                    if current_size >= max_capacity_mb * 1024 * 1024:
                        # 文件超过最大容量，关闭当前文件并重新创建新文件
                        self.auto_save_file.close()
                        self.auto_save_file = self.create_auto_save_file()
                except Exception as e:
                    print("Autosave error:", e)
        """
        检查 text_area 中字符数量，如果超过100000，则仅保留后一半的行的内容
        """
        if self.auto_clear_onoff.get():
            # 如果wait for /wait for any函数将该标志位关闭，则不进行自动删除，避免引起index变化导致的问题
            if self.auto_delete_lock_count == 0:
                lenth_total_chars = self.tk_safe(lambda: self.text_area.count("1.0", "end-1c", "chars"))
                # count 返回元组如 (12345,)，取第一个元素；如果为空则视为0
                lenth_total_chars = lenth_total_chars[0] if lenth_total_chars else 0
                if lenth_total_chars > 1000000:
                    print("auto delete triggered")
                    # 获取当前总行数
                    current_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
                    current_total_lines = int(current_index.split('.')[0])
                    if current_total_lines > 2:
                        delete_end_line = (current_total_lines + 1) // 2  # 向上取整

                        # 删除前记录
                        print(f"[delete] before last_saved_index={self.last_saved_index}")

                        # 清理 tag
                        for tag in self.text_area.tag_names():
                            self.tk_safe(lambda: self.text_area.tag_remove(tag, "1.0", f"{delete_end_line}.0"),wait=True)

                        # 删除文本
                        self.tk_safe(lambda: self.text_area.delete("1.0", f"{delete_end_line}.0"),wait=True)
                        print(f"delete content start index=1.0 end index={delete_end_line}.0")

                        # 重置 RegexMonitor 的偏移和缓冲，避免与自动清屏冲突
                        self.regex_monitor.global_offset = 0
                        self.regex_monitor.match_buffer = ""

                        # 更新 last_saved_index
                        last_saved_index_line = int(self.last_saved_index.split('.')[0])
                        last_saved_index_colume = int(self.last_saved_index.split('.')[1])
                        new_line = max(1, last_saved_index_line - delete_end_line + 1)
                        self.last_saved_index = f"{new_line}.{last_saved_index_colume}"

                        print(f"[delete] after last_saved_index={self.last_saved_index}")


    def auto_save_and_auto_delete(self):
        """
        每10秒，如果自动保存标志位打开，则执行自动保存操作。
        """
        self.auto_save_and_auto_delete_onetime()
        
            # 10秒后再次检测
        self.tk_safe(lambda: self.text_area.after(10000, self.auto_save_and_auto_delete))

    def code_show_date_time(self):
        
        self.tk_safe(lambda: self.text_area.insert(tk.END, str(datetime.now()) + "\n"))
        self.tk_safe(lambda: self._auto_scroll())
        
    def save_setup(self):
        """
        将当前窗口名、串口选项、波特率、自动保存路径、文件名、文件最大容量、脚本路径、
        脚本文件名、循环间隔、默认延时、循环次数等信息保存到 TermPlusSetup.ini
        """
        config = configparser.ConfigParser()
        config['Setup'] = {
            # 界面语言：en / zh ...，在 Language 菜单里修改，重启生效
            'language': _LANG_SAVE_CODE,
            'window_name': self.window_name_entry.get(),
            'serial_port_menu': self.port_menu.get(),
            'baud_rate_menu': self.baud_menu.get(),
            'auto_save_path': self.auto_save_path_entry.get(),
            'auto_save_file_name': self.file_name_entry.get(),
            'file_max_capacity': self.max_capacity_entry.get(),
            'script_path': self.script_path_entry.get(),
            'script_file': self.script_file_combo.get(),
            'multi_script_path': self.multi_script_path_entry.get(),
            'multi_script_file': self.multi_script_file_combo.get(),
            'loop_interval': self.loop_interval_entry.get(),
            'default_delay_time': self.default_delay_time_entry.get(),
            'loop_count': self.loop_count_entry.get(),
            'terminal_symbol': self.send_all_terminal_entry.get(),
            'terminal_wait_over_time': self.send_all_over_time_entry.get(),
            'display_mode': self.DISPLAY_MODE_BY_LABEL.get(
                self.display_mode_combo.get(), AnsiTextRenderer.MODE_TERMINAL),
            'sent_commands': json.dumps(self.sent_commands, ensure_ascii=False),
            'key_auto_sync': str(bool(self.key_sync_var.get())),
        }
        for i, p in enumerate(self.history_paths):
            config['Setup'][f'history_{i+1}'] = p
        for i, s in enumerate(self.history_strike):
            config['Setup'][f'history_{i+1}_strike'] = str(s)
        # 保存正则匹配自动保存设置
        p, n, m = self.regex_monitor.get_save_settings()
        config['Setup']['regex_save_path'] = p
        config['Setup']['regex_save_filename'] = n
        config['Setup']['regex_save_max_mb'] = m
        # 在 exe（源码运行时为 TermPlus.py）所在目录创建/覆盖 TermPlusSetup.ini
        with open(INI_PATH, "w", encoding="utf-8") as configfile:
            config.write(configfile)

    def toggle_key_area(self):
        if self.row_5_frame.winfo_ismapped():
            # 隐藏
            self.row_5_frame.grid_remove()
            self.row_6_frame.grid_remove()
        else:
            # 恢复到原来位置
            self.row_5_frame.grid(**self.row_5_grid_info)
            self.row_6_frame.grid(**self.row_6_grid_info)

    def toggle_script_area(self):
        if self.row_7_frame.winfo_ismapped():
            
            self.row_7_frame.grid_remove()
            self.row_8_frame.grid_remove()
            self.row_9_frame.grid_remove()
        else:
            
            self.row_7_frame.grid(**self.row_7_grid_info)
            self.row_8_frame.grid(**self.row_8_grid_info)
            self.row_9_frame.grid(**self.row_9_grid_info)

    def toggle_sidebar(self):
        #点击后收起或展开右侧面板：
        if self.right_frame.winfo_ismapped():
            self.right_frame.grid_remove()
        else:
            self.right_frame.grid(**self.right_frame_grid_info)

    def toggle_theme(self):
        if self.current_color_theme_light == True:# 如果当前是浅色主题
            # 切换到深色主题
            window_bg_color = '#252A38'    # 37 42 56
            text_bg_color = "#171b26"      # (0, 0, 0)
            text_fg_color = "#d9dce4"      # (255, 255, 255)
            cursor_color = "#FFFFFF"  # 深色背景下用白色光标
            # 多行循环文本框内需要高亮的文字的tag
            self.multi_loop_text.tag_config("func", foreground="#569CD6") # #9CDCFE blue  189, 99, 128 = BD6380 #569CD6
            # 主窗口的blue的tag的配色在深色配色下需要修改
            self.text_area.tag_config("blue", foreground="#569CD6")
            
            # 设置tab未选中状态下的深色 Tab 样式
            self.style.configure(
                'TNotebook.Tab',
                background='#252A38',         # 未选中时的背景深色 :contentReference[oaicite:1]{index=1}
                foreground='#d9dce4'            # 未选中时的文字白色
            )

            # 设置选中状态下的映射（selected: 选中, active: 鼠标悬停）
            self.style.map(
                'TNotebook.Tab',
                background=[
                    ('selected', '#FFFFFF'),  # 选中时白色背景 :contentReference[oaicite:2]{index=2}
                    ('active',   '#D3D3D3')   # 悬停时浅灰背景 :contentReference[oaicite:3]{index=3}
                ],
                foreground=[
                    ('selected', 'black')      # 选中时文字保持黑色 :contentReference[oaicite:4]{index=4}
                ]
            )
            self.current_color_theme_light = False
        else:
            # 切换到浅色主题
            window_bg_color = "#F0F0F0"    # (240, 240, 240)
            text_bg_color = "#FFFFFF"      # (255, 255, 255)
            text_fg_color = "#000000"      # (0, 0, 0)
            self.multi_loop_text.tag_config("func", foreground="blue") # #9CDCFE blue  189, 99, 128 = BD6380 #569CD6
            self.text_area.tag_config("blue", foreground="blue")
            cursor_color = "#000000"  # 浅色背景下用黑色光标
            
            # 设置tab未选中状态下的浅色 Tab 样式
            self.style.configure(
                'TNotebook.Tab',
                background='#F0F0F0',         # 未选中时的背景浅灰色 :contentReference[oaicite:1]{index=1}
                foreground='black'            # 未选中时的文字黑色
            )

            # 3. 设置选中状态下的映射（selected: 选中, active: 鼠标悬停）
            self.style.map(
                'TNotebook.Tab',
                background=[
                    ('selected', '#FFFFFF'),  # 选中时白色背景 :contentReference[oaicite:2]{index=2}
                    ('active',   '#D3D3D3')   # 悬停时浅灰背景 :contentReference[oaicite:3]{index=3}
                ],
                foreground=[
                    ('selected', 'black')      # 选中时文字保持黑色 :contentReference[oaicite:4]{index=4}
                ]
            )
            self.current_color_theme_light = True

        # 设置所有ttk控件的颜色样式
        self.style.configure('Custom.TCheckbutton',
                background=window_bg_color,
                foreground=text_fg_color)
            
        # 设置输入文字的控件的颜色，ttk.Combox
        self.text_area.configure(background=text_bg_color, foreground=text_fg_color, insertbackground=cursor_color)
        # ANSI 颜色调色板要跟随主题，否则深色背景下黑字、浅色背景下白字都看不见
        self.ansi_renderer.set_theme(self.current_color_theme_light)
        self.multi_loop_text.configure(background=text_bg_color, foreground=text_fg_color, insertbackground=cursor_color)
        self.auto_save_path_entry.configure(background=text_bg_color, foreground=text_fg_color, insertbackground=cursor_color)

        # 这几个控件是ttk控件中的下拉菜单，无法直接修改其配色
        #self.send_entry.configure(background=text_bg_color, foreground=text_fg_color)
        #self.baud_menu.configure(background=text_bg_color, foreground=text_fg_color)
        #self.port_menu.configure(background=text_bg_color, foreground=text_fg_color)
        #self.script_file_combo.configure(background=text_bg_color, foreground=text_fg_color)
        
        # 设置所有Frame的背景色
        self.main_frame.configure(background=window_bg_color)
        self.row_0_frame.configure(background=window_bg_color)
        self.row_2_frame.configure(background=window_bg_color)
        self.row_3_frame.configure(background=window_bg_color)
        self.row_4_frame.configure(background=window_bg_color)
        self.row_5_frame.configure(background=window_bg_color)
        self.row_6_frame.configure(background=window_bg_color)
        self.row_7_frame.configure(background=window_bg_color)
        self.row_8_frame.configure(background=window_bg_color)
        self.row_9_frame.configure(background=window_bg_color)
        self.right_frame.configure(background=window_bg_color)
        self.toggle_frame.configure(background=window_bg_color)
        self.auto_save_path_frame.configure(background=window_bg_color)
        self.auto_save_frame.configure(background=window_bg_color)
        self.ssh_frame.configure(background=window_bg_color)
        self.file_capacity_frame.configure(background=window_bg_color)
        self.history_btn_frame.configure(background=window_bg_color)

        # 设置窗口背景色
        self.root.configure(bg=window_bg_color)
        # 设置菜单栏控件的颜色
        #self.menu_bar.configure(bg=window_bg_color, fg=text_fg_color, activebackground=window_bg_color, activeforeground=text_fg_color)  # 菜单栏本身无法修改颜色
        self.new_menu.configure(bg=window_bg_color, fg=text_fg_color)
        self.about_menu.configure(bg=window_bg_color, fg=text_fg_color)

        # 设置所有Label的颜色
        for widget in [self.label_send, self.stats_label, self.date_label_title, self.date_label,
                        self.time_label_title, self.time_label, self.time_label_title, self.loop_interval_label,
                        self.send_all_terminal_label, self.send_all_over_time_label,
                        self.display_mode_label,
                        self.multi_loop_label, self.current_loop_count_label,
                        self.default_delay_time_label, self.loop_count_label, self.window_name_label, self.choose_port_label, 
                        self.baud_label, self.auto_save_label,self.auto_save_path_label,self.save_file_name_label,self.file_max_volume_label,
                        self.MB_label,self.script_path_label,self.multi_script_path_label,self.history_label]:
            widget.configure(background=window_bg_color, foreground=text_fg_color)
           
        # 设置所有Entry的颜色
        for widget in [ self.loop_interval_entry, self.send_all_terminal_entry,
                        self.send_all_over_time_entry, self.default_delay_time_entry,
                        self.loop_count_entry, self.window_name_entry,self.file_name_entry,
                        self.max_capacity_entry,self.script_path_entry,self.multi_script_path_entry]:
            widget.configure(background=window_bg_color, foreground=text_fg_color) #, insertbackground=cursor_color
            
        # 设置所有Button的颜色
        for widget in [self.show_keys_btn, self.show_script_btn, self.toggle_sidebar_btn,self.theme_btn,self.regex_monitor_btn,
                        self.send_btn, self.single_loop_send_btn, self.clear_screen_btn,
                        self.start_button, self.pause_button, self.stop_button,
                        self.refresh_btn, self.toggle_port_btn,self.ssh_config_btn, self.square_button,self.script_path_button,self.multi_script_path_button,
                        self.load_script_button,self.save_script_button,self.save_as_script_button,self.open_multi_loop_btn,
                        self.save_multi_loop_btn,self.save_as_multi_loop_btn] + self.history_buttons:
            widget.configure(background=window_bg_color, foreground=text_fg_color)

        # 设置tab的颜色
        for tab_id in self.notebook.tabs():
            tab_frame = self.notebook.nametowidget(tab_id)
            tab_frame.configure(background=window_bg_color)
            for child in tab_frame.winfo_children():
                if isinstance(child, tk.Button):
                    child.configure(
                        background=window_bg_color,
                        foreground=text_fg_color,
                        activebackground=text_bg_color,
                        activeforeground=text_fg_color
                    )
        
    def load_setup(self):
        """
        程序启动时，尝试从 TermPlusSetup.ini 读取控件的默认值，如果文件不存在则不做任何操作
        """
        import os
        if not os.path.exists(INI_PATH):
            return  # 文件不存在则直接返回
        
        config = configparser.ConfigParser()
        config.read(INI_PATH, encoding="utf-8")
        
        if 'Setup' in config:
            setup = config['Setup']

            # 按键文件历史记录（5 个历史按键），文件已不存在时显示删除线
            for i in range(5):
                p = setup.get(f'history_{i+1}', '').strip()
                self.history_paths[i] = p
                self.history_strike[i] = bool(p) and not os.path.isfile(p)
                self._update_history_button(i)
            
            # 读取窗口名并更新窗口标题
            if 'window_name' in setup:
                self.window_name_entry.delete(0, 'end')
                self.window_name_entry.insert(0, setup['window_name'])
                self._refresh_title()
            
            # 读取串口下拉框的值
            if 'serial_port_menu' in setup:
                # 如果该值在当前下拉框可选值列表中，就设置它
                if setup['serial_port_menu'] in self.port_menu['values']:
                    self.port_menu.set(setup['serial_port_menu'])
            
            # 读取波特率下拉框的值
            if 'baud_rate_menu' in setup:
                if setup['baud_rate_menu'] in self.baud_menu['values']:
                    self.baud_menu.set(setup['baud_rate_menu'])
            
            # 自动保存路径
            if 'auto_save_path' in setup:
                self.auto_save_path_entry.delete(0, 'end')
                self.auto_save_path_entry.insert(0, setup['auto_save_path'])
                self.auto_save_path_entry.icursor(tk.END)      # 将光标移到文本末尾
                self.auto_save_path_entry.update_idletasks()     # 强制更新界面
                self.auto_save_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
            
            # 自动保存文件名
            if 'auto_save_file_name' in setup:
                self.file_name_entry.delete(0, 'end')
                self.file_name_entry.insert(0, setup['auto_save_file_name'])
            
            # 文件最大容量
            if 'file_max_capacity' in setup:
                self.max_capacity_entry.delete(0, 'end')
                self.max_capacity_entry.insert(0, setup['file_max_capacity'])
            
            # 按键路径
            if 'script_path' in setup:
                self.script_path_entry.delete(0, 'end')
                self.script_path_entry.insert(0, setup['script_path'])
                self.script_path_entry.icursor(tk.END)      # 将光标移到文本末尾
                self.script_path_entry.update_idletasks()     # 强制更新界面
                self.script_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
                # 扫描路径下所有后缀为 .ts 的文件
                try:
                    ts_files = [f for f in os.listdir(setup['script_path'])
                                if os.path.isfile(os.path.join(setup['script_path'], f)) and f.lower().endswith('.ts')]
                except Exception as e:
                    ts_files = []
                # 更新下拉选择框
                self.script_file_combo['values'] = ts_files
                #if ts_files:
                    #self.script_file_combo.current(0)
            
            # 按键文件下拉框
            if 'script_file' in setup:
                ts_files = list(self.script_file_combo['values'])  # 先将可选值转为列表
                if setup['script_file'] in ts_files:
                    idx = ts_files.index(setup['script_file'])
                    self.script_file_combo.current(idx)
                    self.load_script()
            # 按键文件自动同步（启动时加载了按键文件才会真正打开）
            if setup.get('key_auto_sync', 'False') == 'True':
                self.key_sync_var.set(True)
                self._on_sync_toggle(quiet=True)
            # 脚本路径
            if 'multi_script_path' in setup:
                self.multi_script_path_entry.delete(0, 'end')
                self.multi_script_path_entry.insert(0, setup['multi_script_path'])
                self.multi_script_path_entry.icursor(tk.END)      # 将光标移到文本末尾
                self.multi_script_path_entry.update_idletasks()     # 强制更新界面
                self.multi_script_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
                # 扫描路径下所有后缀为 .txt 的文件
                try:
                    ts_files = [f for f in os.listdir(setup['multi_script_path'])
                                if os.path.isfile(os.path.join(setup['multi_script_path'], f)) and f.lower().endswith('.txt')]
                except Exception as e:
                    ts_files = []
                # 更新下拉选择框
                self.multi_script_file_combo['values'] = ts_files
                #if ts_files:
                    #self.script_file_combo.current(0)
            
            # 脚本文件下拉框
            if 'multi_script_file' in setup:
                ts_files = list(self.multi_script_file_combo['values'])  # 先将可选值转为列表
                if setup['multi_script_file'] in ts_files:
                    idx = ts_files.index(setup['multi_script_file'])
                    self.multi_script_file_combo.current(idx)
                    self.open_multi_loop_file()
            
            # 循环间隔
            if 'loop_interval' in setup:
                self.loop_interval_entry.delete(0, 'end')
                self.loop_interval_entry.insert(0, setup['loop_interval'])
            
            # 默认延时
            if 'default_delay_time' in setup:
                self.default_delay_time_entry.delete(0, 'end')
                self.default_delay_time_entry.insert(0, setup['default_delay_time'])
            
            # 循环次数
            if 'loop_count' in setup:
                self.loop_count_entry.delete(0, 'end')
                self.loop_count_entry.insert(0, setup['loop_count'])
            
            # 等待符号
            if 'terminal_symbol' in setup:
                self.send_all_terminal_entry.delete(0, 'end')
                self.send_all_terminal_entry.insert(0, setup['terminal_symbol'])
            
            # 等待符号超时时间
            if 'terminal_wait_over_time' in setup:
                self.send_all_over_time_entry.delete(0, 'end')
                self.send_all_over_time_entry.insert(0, setup['terminal_wait_over_time'])

            # 显示方式（控制字符怎么显示）
            if 'display_mode' in setup:
                label = self.DISPLAY_LABEL_BY_MODE.get(setup['display_mode'].strip())
                if label:
                    self.display_mode_combo.set(label)

            # 已发送命令
            if 'sent_commands' in setup:
                try:
                    self.sent_commands = json.loads(setup['sent_commands'])
                except (json.JSONDecodeError, ValueError):
                    # 兼容旧版 INI 文件（用 Python repr 格式存储的）
                    self.sent_commands = ast.literal_eval(setup['sent_commands'])
                # 更新下拉框的可选值
                self.send_entry['values'] = self.sent_commands

class VisaComm:
    def __init__(self, resource):
        self.resource = resource
        # 保留其他必要配置
        self.resource.timeout = 5000           # ② 设置超时为 5000 ms
        self.resource.write_termination = '\n'
        self.resource.read_termination  = '\n'

    def write(self, cmd: str):
        self.resource.write(cmd)

    def read(self) -> str:
        return self.resource.read()

    def query(self, cmd: str) -> str:
        return self.resource.query(cmd)

root = tk.Tk()
app = SerialGUI(root)
#root.mainloop()

try:
    root.mainloop()
except Exception:
    with open("TermPlus_crash.log", "a", encoding="utf-8") as f:
        f.write("\n\n==== Crash on {} ====\n".format(datetime.now()))
        f.write(traceback.format_exc())
    self.tk_safe(lambda: messagebox.showerror("程序异常", "发生未捕获异常，程序已记录日志，参见TermPlus_crash.log。", parent=self.root))



