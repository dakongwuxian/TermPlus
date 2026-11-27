# -*- mode: python ; coding: utf-8 -*-
from datetime import datetime
import os
import shutil

# 获取当前日期字符串，例如 20251222
today = datetime.now()
version_suffix = f"v{today.strftime('%y%m%d')}"
# 定义动态文件名
exe_name = f'TermPlus_{version_suffix}'

# 3. 【核心修改】将版本号写入 runtime hook 文件，让 exe 启动时能读到打包日期
_build_version_str = f"Version {today.strftime('%y%m%d')}"
os.environ["TERMPLUS_BUILD_VERSION"] = _build_version_str

# 动态生成 runtime hook 内容
_hook_content = f'''import os
os.environ["TERMPLUS_BUILD_VERSION"] = "{_build_version_str}"
'''
with open("_runtime_hook_version.py", "w", encoding="utf-8") as _hf:
    _hf.write(_hook_content)

a = Analysis(
    ['TermPlus.py'],
    pathex=[],
    binaries=[],
    # 语言文件：打包后位于 _internal\language\*.txt
    datas=[('language/*.txt', 'language')],
    hiddenimports=[
        'pyvisa_py',
        'pyvisa_py.usb',
        'pyvisa_py.usbtmc',
        'pyvisa_py.vxi11',
        'pyvisa_py.serial',
        'pyvisa_py.socket',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=['_runtime_hook_version.py'],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],                 # 【修改点 1】把 a.binaries 改为空列表 []
    [],                 # 【修改点 2】把 a.datas 改为空列表 []
    name=exe_name,      # 这里是生成的启动 exe 的名字
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='TermPlusIcon.ico',
)

# 【修改点 3】在末尾必须新增 COLLECT 对象
coll = COLLECT(
    exe,
    a.binaries,         # 将二进制库文件收集到文件夹中
    a.datas,            # 将数据文件（图片、version_info等）收集到文件夹中
    strip=False,
    upx=False,
    upx_exclude=[],
    name=exe_name,      # 【重点】这里是最终生成的【总文件夹】的名字
)

lone_exe = os.path.join('dist', exe_name + '.exe')
if os.path.exists(lone_exe):
    os.remove(lone_exe)