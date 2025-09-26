"""
版权所有 (c) 2025 [吴宪]

本软件TermPlus（以下简称“软件”）为个人非商业用途开源发布。任何人均可免费使用、复制、修改和分发本软件，但仅限于个人非商业用途。
对于商业用途（包括但不限于嵌入商业产品、提供商业服务、营利分发等），必须事先获得作者的书面许可。

本软件按“现状”提供，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性以及不侵权的保证。
在任何情况下，作者均不对因使用或无法使用本软件而产生的任何直接、间接、偶然、特殊或后续损害承担责任。

如需商业授权或有任何疑问，请联系：[dakongwuxian@gmail.com]
"""

from logging import raiseExceptions
import tkinter as tk
from tkinter import scrolledtext, ttk, Canvas, simpledialog, messagebox, filedialog
import tkinter.font as tkFont
import serial
import serial.tools.list_ports
import threading
import time
import os # 遍历目录
import re # 加载脚本文件
import configparser
import ast
from datetime import datetime
import traceback
import builtins
import keyword
import subprocess
import pyvisa
rm = pyvisa.ResourceManager('@py')
from pyvisa.constants import AccessModes
import base64
from io import BytesIO
from PIL import Image, ImageTk
import paramiko
import sys
import io
import platform
import textwrap
import inspect
from version_info import VERSION
import multiprocessing

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

class SerialGUI:
    def __init__(self, root, center=True):
        self.root = root
        self.root.report_callback_exception = self.report_callback_exception

        self.auto_save_file = None
        self.last_saved_index = "1.0"  # 记录 autosave 时最后保存的位置
        self.auto_save_stop = True   # 控制 autosave 线程停止的标志
        self.root = root
        self.last_send_index = None
        self.wait_for_initial_index  = None
        self.allow_auto_delete = True

        # 初始化 PyVISA ResourceManager，psu 初始为 None
        self.rm  = pyvisa.ResourceManager()
        self.psu = None

        # 字体设置
        default_font = tkFont.nametofont("TkDefaultFont")
        default_font.configure(family="Microsoft YaHei UI", size=9)

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
        self.menu_bar.add_cascade(label="新建", menu=self.new_menu)
        self.new_menu.add_command(label="新建窗口", command=self.new_port)
        self.new_menu.add_separator()
        self.new_menu.add_command(label="退出", command=self.root.destroy)
        # About 菜单
        self.about_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="关于", menu=self.about_menu)
        self.about_menu.add_command(label="Developed by Xian.Wu", state="disabled")
        self.about_menu.add_command(label="dakongwuxian@gmail.com", state="disabled")

        self.about_menu.add_command(label=VERSION, state="disabled")

        self.about_menu.add_command(label="Donation Here.",command=self.show_about_window,state="normal")
        
        # 用于单元格右键菜单的剪贴板（复制功能），存储元组 (text, custom_data)
        self.cell_clipboard = ("", "")
        self.current_cell = None

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
        self.show_keys_btn = tk.Button(self.row_0_frame, text="按键", command=self.toggle_key_area)
        self.show_keys_btn.pack(side="left", padx=(10,4))
        self.show_script_btn = tk.Button(self.row_0_frame, text="脚本", command=self.toggle_script_area)
        self.show_script_btn.pack(side="left", padx=4)
        self.toggle_sidebar_btn = tk.Button(self.row_0_frame, text="配置", command=self.toggle_sidebar)
        self.toggle_sidebar_btn.pack(side="left", padx=4)

        # 黑白主题切换
        self.theme_btn = tk.Button(self.row_0_frame, text="主题", command=self.toggle_theme)
        self.theme_btn.pack(side="left", padx=4)

        # row 1 text_area
        #self.text_area = scrolledtext.ScrolledText(self.main_frame, wrap=tk.WORD)
        self.text_area = scrolledtext.ScrolledText(
            self.main_frame,
            wrap=tk.WORD,
            undo=True,              # 启用撤销栈
            autoseparators=False,   # 关闭自动分隔
            maxundo=20              # 不限撤销步数
        )
        # 添加右键菜单
        self.text_popup_menu = tk.Menu(self.text_area, tearoff=0)
        self.text_popup_menu.add_command(label="剪切", command=lambda: self.text_area.event_generate("<<Cut>>"))
        self.text_popup_menu.add_command(label="复制", command=lambda: self.text_area.event_generate("<<Copy>>"))
        self.text_popup_menu.add_command(label="粘贴", command=lambda: self.text_area.event_generate("<<Paste>>"))
        self.text_popup_menu.add_command(label="删除", command=self._delete_selection)
        self.text_popup_menu.add_separator()
        self.text_popup_menu.add_command(label="全选", command=lambda: self.text_area.event_generate("<<SelectAll>>"))

        self.text_area.bind("<Button-3>", self._show_text_popup)  # Windows右键
        self.text_area.bind("<Control-a>", lambda e: self.text_area.event_generate("<<SelectAll>>"))  # Ctrl+A 全选

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
        self.label_send = tk.Label(self.row_2_frame, text="发送文本:")
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
        self.newline_checkbox = ttk.Checkbutton(self.row_2_frame, text="发送新行", variable=self.send_newline_var, style='Custom.TCheckbutton')
        self.newline_checkbox.place(relx=0, rely=0.5, anchor="w",x=560)
        
        # 发送按钮
        self.send_btn = tk.Button(self.row_2_frame, text="发送", command=self.send_data_btn, state=tk.DISABLED, width=10)
        self.send_btn.place(relx=0, rely=0.5, anchor="w",x=640)

        # Row 3：数据统计、循环间隔（s)标签、循环间隔输入框和循环发送按钮
        self.row_3_frame = tk.Frame(self.main_frame, width=730, height=32)
        self.row_3_frame.grid(row=3, column=0, sticky="nw", padx=0)

        #数据统计："发送: 0 B | 接收: 0 B"
        self.data_stats = tk.StringVar(value="发送: 000 B | 接收: 000 B")
        self.stats_label = tk.Label(self.row_3_frame, textvariable=self.data_stats)
        self.stats_label.place(relx=0, rely=0.5, anchor="w",x=10)
        # 新增：显示日期的静态标签和动态标签
        self.date_label_title = tk.Label(self.row_3_frame, text="日期:")
        self.date_label_title.place(relx=0, rely=0.5, anchor="w",x=170, y=0)
        self.date_label = tk.Label(self.row_3_frame, text="")
        self.date_label.place(relx=0, rely=0.5, anchor="w",x=210)

        # 新增：显示时间的静态标签和动态标签
        self.time_label_title = tk.Label(self.row_3_frame, text="时间:")
        self.time_label_title.place(relx=0, rely=0.5, anchor="w",x=290)
        self.time_label = tk.Label(self.row_3_frame, text="")
        self.time_label.place(relx=0, rely=0.5, anchor="w",x=330)

        # 时间戳label和check box
        self.time_stamp_title = tk.Label(self.row_3_frame, text="时间戳")
        self.time_stamp_title.place(relx=0, rely=0.5, anchor="w",x=400)
        self.timestamp_onoff = tk.BooleanVar(value=False)
        self.timestamp_check = ttk.Checkbutton(self.row_3_frame, variable=self.timestamp_onoff, style='Custom.TCheckbutton')
        self.timestamp_check.place(relx=0, rely=0.5, anchor="w",x=450)  

        self.update_time()  # 启动时间更新
        #循环间隔（s)标签
        self.loop_interval_label = tk.Label(self.row_3_frame, text="循环间隔 (s):")
        self.loop_interval_label.place(relx=0, rely=0.5, anchor="w",x=500)
        #循环间隔输入框
        self.loop_interval_entry = tk.Entry(self.row_3_frame, width=5)
        self.loop_interval_entry.place(relx=0, rely=0.5, anchor="w",x=600)
        self.loop_interval_entry.insert(0, "3")
        # 单行循环发送按钮
        self.single_loop_send_btn = tk.Button(self.row_3_frame, text="单行循环", command=self.toggle_loop_send, state=tk.DISABLED, width=10)
        self.single_loop_send_btn.place(relx=0, rely=0.5, anchor="w",x=650)

        # Row 4:
        self.row_4_frame = tk.Frame(self.main_frame, width=730, height=32)
        self.row_4_frame.grid(row=4, column=0, sticky="nw", padx=10, pady=(0,10))

        # 自动清屏 check box
        self.auto_clear_onoff = tk.BooleanVar(value=True)
        self.auto_clear_check = ttk.Checkbutton(self.row_4_frame, text="自动清屏",variable=self.auto_clear_onoff, style='Custom.TCheckbutton')
        self.auto_clear_check.place(relx=0, rely=0.5, anchor="w",x=560)  

        # “清屏”按钮
        self.clear_screen_btn = tk.Button(self.row_4_frame, text="清屏", command=self.clear_text_area, width=10)
        self.clear_screen_btn.place(relx=0, rely=0.5, anchor="w",x=650-10)

        # 等待符号
        self.send_all_terminal_label = tk.Label(self.row_4_frame, text="等待符号:")
        self.send_all_terminal_label.place(relx=0, rely=0.5, anchor="w",x=0)
        # 等待符号选择框
        self.send_all_terminal_entry = tk.Entry(self.row_4_frame, width=5) # 如果直接让text等于某个字符串，会导致多个窗口时共享同一个text变量，会一起被手动修改
        self.send_all_terminal_entry.place(relx=0, rely=0.5, anchor="w",x=70)
        self.send_all_terminal_entry.insert(0,"#,$") # 在entry被创建后，插入内容，这个内容就不会导致多个窗口被同步修改
        # Terminal wait over time label and entry
        self.send_all_over_time_label = tk.Label(self.row_4_frame, text="超时时间 (s):")
        self.send_all_over_time_label.place(relx=0, rely=0.5, anchor="w",x=140)

        self.send_all_over_time_entry = tk.Entry(self.row_4_frame, width=5)
        self.send_all_over_time_entry.place(relx=0, rely=0.5, anchor="w",x=240)
        self.send_all_over_time_entry.insert(0, "5")

        # row 5
        # 按键控制控件行
        self.row_5_frame = tk.Frame(self.main_frame, width=730, height=30)
        self.row_5_frame.grid(row=5, column=0, sticky="ew", padx=(10,0), pady=(0,5))
        self.row_5_frame.grid_propagate(False) # 固定该父容器

        # 脚本路径选择框：上方标签、文本框及小三角按钮
        self.script_path_label = tk.Label(self.row_5_frame, text="按键选择")
        self.script_path_label.place(relx=0, rely=0.5, anchor="w",x=0)

        # 文本框宽度与关闭串口按钮一致，文本右对齐
        self.script_path_entry = tk.Entry(self.row_5_frame, width=25, justify="right")
        self.script_path_entry.place(relx=0, rely=0.5, anchor="w",x=60)
        # 路径浏览按键
        self.script_path_button = tk.Button(self.row_5_frame, text="…", command=self.choose_script_path)
        self.script_path_button.place(relx=0, rely=0.5, anchor="w",x=240)
        # 下拉选择框，用于显示脚本路径下所有 .ts 文件
        self.script_file_combo = ttk.Combobox(self.row_5_frame, values=[], width=42, state="readonly")
        self.script_file_combo.place(relx=0, rely=0.5, anchor="w",x=270)

        # 加载按钮
        self.load_script_button = tk.Button(self.row_5_frame, width = 5, text="加载", command=self.load_script)
        self.load_script_button.place(relx=0, rely=0.5, anchor="w",x=585)
        # 保存按钮
        self.save_script_button = tk.Button(self.row_5_frame,width = 5, text="保存", command=self.save_script)
        self.save_script_button.place(relx=0, rely=0.5, anchor="w",x=635)
        # 另存按钮
        self.save_as_script_button = tk.Button(self.row_5_frame, width = 5,text="另存", command=self.save_as_new_script)
        self.save_as_script_button.place(relx=0, rely=0.5, anchor="w",x=685)




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
        self.tab_menu.add_command(label="Rename",command=self.rename_current_tab)
        self.tab_menu.add_command(label="Delete",command=self.delete_current_tab)

        # 绑定右键事件到 notebook，弹出上下文菜单
        self.notebook.bind("<Button-3>", self.show_tab_menu)

        # Row 7, “多行循环”等文字和按键
        self.row_7_frame = tk.Frame(self.main_frame, width=730, height=34)
        self.row_7_frame.grid(row=7, column=0, sticky="nw", padx=(10,0), pady=(0,0))

        # 文字“脚本区域”
        self.multi_loop_label = tk.Label(self.row_7_frame, text="脚本区域")
        self.multi_loop_label.place(relx=0, rely=0.5, anchor="w",x=0)

        # “行间延时ms:”文字
        self.default_delay_time_label = tk.Label(self.row_7_frame, text="行间延时ms:")
        self.default_delay_time_label.place(relx=0, rely=0.5, anchor="w",x=235)

        # 文字，当前执行循环：x
        self.current_loop_count = tk.StringVar(value="当前循环：0000")
        self.current_loop_count_label = tk.Label(self.row_7_frame, textvariable=self.current_loop_count)
        self.current_loop_count_label.place(relx=0, rely=0.5, anchor="w",x=365)

        # 行间延时ms:单行文本框
        self.default_delay_time_entry = tk.Entry(self.row_7_frame, width=5)
        self.default_delay_time_entry.place(relx=0, rely=0.5, anchor="w",x=315)
        self.default_delay_time_entry.insert(0,0)
        # “循环次数”文字
        self.loop_count_label = tk.Label(self.row_7_frame, text="循环次数:")
        self.loop_count_label.place(relx=0, rely=0.5, anchor="w",x=520-55)
        # 单行文本框,“循环次数”右侧
        self.loop_count_entry = tk.Entry(self.row_7_frame, width=5)
        self.loop_count_entry.place(relx=0, rely=0.5, anchor="w",x=580-55)
        self.loop_count_entry.insert(0,3)
        # “开始”按钮，放在单行文本框右侧
        self.start_button = tk.Button(self.row_7_frame, width=5, text="开始", command=self.start_multi_loop_send, state=tk.NORMAL)
        self.start_button.place(relx=0, rely=0.5, anchor="w",x=640-55)
        # “暂停”按钮
        self.pause_button = tk.Button(self.row_7_frame, width=5, text="暂停", command=self.pause_resume_multi_loop_send, state=tk.DISABLED)
        self.pause_button.place(relx=0, rely=0.5, anchor="w", x=690-55)
        # “停止”按钮
        self.stop_button = tk.Button(self.row_7_frame, width=5, text="停止", command=self.stop_multi_loop_send, state=tk.DISABLED)
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
            maxundo=20               # 不限制撤销步数 :contentReference[oaicite:2]{index=2}
        )

        # 为 multi_loop_text 添加右键菜单
        def show_loop_context_menu(event):
            context_menu = tk.Menu(self.multi_loop_text, tearoff=0)
            context_menu.add_command(label="剪切", command=lambda: self.multi_loop_text.event_generate("<<Cut>>"))
            context_menu.add_command(label="复制", command=lambda: self.multi_loop_text.event_generate("<<Copy>>"))
            context_menu.add_command(label="粘贴", command=lambda: self.multi_loop_text.event_generate("<<Paste>>"))
            context_menu.add_command(label="删除", command=lambda: self.multi_loop_text.delete("sel.first", "sel.last") if self.multi_loop_text.tag_ranges("sel") else None)
            context_menu.add_separator()
            context_menu.add_command(label="全选", command=lambda: self.multi_loop_text.tag_add("sel", "1.0", "end"))
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
            "get_future_lines_till_str_or_overtime"
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
        self.row_9_frame = tk.Frame(self.main_frame,width=730, height=30)
        self.row_9_frame.grid(row=9, column=0, sticky="ew", padx=(10,0), pady=(2,0))
        self.row_9_frame.grid_propagate(False) # 固定该父容器

        # 脚本相关配置控件
        # multi_script_path_label
        self.multi_script_path_label = tk.Label(self.row_9_frame, text="脚本选择")
        self.multi_script_path_label.place(relx=0, rely=0.5, anchor="w",x=0)

        # 路径选择文本框
        self.multi_script_path_entry = tk.Entry(self.row_9_frame, width=25, justify="right")
        self.multi_script_path_entry.place(relx=0, rely=0.5, anchor="w",x=60)

        # 路径按钮
        self.multi_script_path_button = tk.Button(self.row_9_frame, text="…", command=self.multi_choose_script_path)
        self.multi_script_path_button.place(relx=0, rely=0.5, anchor="w",x=240)
        
        # 文件选择下拉框
        self.multi_script_file_combo = ttk.Combobox(self.row_9_frame, values=[], width=42, state="readonly")
        self.multi_script_file_combo.place(relx=0, rely=0.5, anchor="w",x=270)

        # 三个按键
        self.open_multi_loop_btn = tk.Button(self.row_9_frame, text="打开", width=5, command=self.open_multi_loop_file)
        self.open_multi_loop_btn.place(relx=0, rely=0.5, anchor="w",x=585)
        self.save_multi_loop_btn = tk.Button(self.row_9_frame, text="保存", width=5, command=self.save_multi_loop_file)
        self.save_multi_loop_btn.place(relx=0, rely=0.5, anchor="w",x=635)
        self.save_as_multi_loop_btn = tk.Button(self.row_9_frame, text="另存", width=5, command=self.save_multi_loop_file_as)
        self.save_as_multi_loop_btn.place(relx=0, rely=0.5, anchor="w",x=685)






        # right_frame 右侧功能区，使用grid放置在右下角
        self.right_frame = tk.Frame(self.main_frame) # , borderwidth=1, relief="raised" 边框可选项 flat raised sunken groove ridge
        # 放到 main_frame 的 col=1，row=0~9 行，占据右下角
        self.right_frame.grid(row=0, column=1,rowspan=10,sticky="ne",padx=(5,5), pady=(0,0))        # south-east，贴到右下

        # 窗口名输入框，默认“TermPlus”
        self.window_name_label = tk.Label(self.right_frame, text="窗口名:")
        self.window_name_label.pack(anchor="w")
        self.window_name_var = tk.StringVar(value="TermPlus")
        self.window_name_entry = tk.Entry(self.right_frame, textvariable=self.window_name_var, width=15)
        self.window_name_entry.pack(fill="x", pady=2,anchor="se")
        self.window_name_entry.bind("<KeyRelease>", self.update_window_title)
        # 启动时设置窗口标题为默认值
        self.root.title(self.window_name_var.get())
		# 选择串口
        self.choose_port_label = tk.Label(self.right_frame, text="选择串口:")
        self.choose_port_label.pack(anchor="w",pady=(20,0))
        self.port_var = tk.StringVar()
        self.port_menu = ttk.Combobox(self.right_frame, textvariable=self.port_var, values=self.get_ports(), state="readonly", width=10)
        self.port_menu.pack(fill="x", pady=2, anchor="se")
        # 检测可用串口
        self.refresh_btn = tk.Button(self.right_frame, text="检测可用串口", command=self.refresh_ports, width=10)
        self.refresh_btn.pack(fill="x", pady=2, anchor="se")
        # 选择或输入波特率
        self.baud_label = tk.Label(self.right_frame, text="波特率:")
        self.baud_label.pack(anchor="w")
        self.baud_var = tk.StringVar(value="115200")
        baudrates = ["300", "1200", "2400", "4800", "9600", "19200", "38400", "57600", "115200", "230400"]
        self.baud_menu = ttk.Combobox(self.right_frame, textvariable=self.baud_var, values=baudrates, width=10)
        self.baud_menu.pack(fill="x", pady=2, anchor="se")
        # 串口指示、打开串口/关闭串口
        self.toggle_frame = tk.Frame(self.right_frame)
        self.toggle_frame.pack(fill="x", pady=2, anchor="se")
        self.toggle_port_btn = tk.Button(self.toggle_frame, text="打开串口", command=self.toggle_serial, width=10)
        self.toggle_port_btn.pack(side="left", anchor="se")
        # 将状态画布放在按钮右侧，设置一些水平间距
        self.status_canvas = Canvas(self.toggle_frame, width=20, height=20, bg="gray", highlightthickness=0)
        self.status_canvas.pack(side="left", padx=5, anchor="se")
        # 配置SSH
        self.ssh_frame = tk.Frame(self.right_frame)
        self.ssh_frame.pack(fill="x", pady=2, anchor="se")
        self.ssh_config_btn = tk.Button(self.ssh_frame, text="配置SSH", command=self.open_ssh_config_window, width=10)
        self.ssh_config_btn.pack(side="left", anchor="se")
        # 将状态画布放在按钮右侧，设置一些水平间距
        self.ssh_status_canvas = Canvas(self.ssh_frame, width=20, height=20, bg="gray", highlightthickness=0)
        self.ssh_status_canvas.pack(side="left", padx=5, anchor="se")

        # 文字“自动保存路径”
        self.auto_save_path_label = tk.Label(self.right_frame, text="自动保存路径")
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
        self.save_file_name_label = tk.Label(self.right_frame, text="保存文件名")
        self.save_file_name_label.pack(anchor="sw")
        # 文本框
        self.file_name_entry = tk.Entry(self.right_frame, width=10, justify="left")
        self.file_name_entry.pack(fill="x", pady=0, anchor="se")
        self.file_name_entry.insert(0,"AutoSave")
        # 自动保存状态 按钮
        self.auto_save_frame = tk.Frame(self.right_frame)
        self.auto_save_frame.pack(fill="x", pady=0)
        # 文字“自动保存”
        self.auto_save_label = tk.Label(self.auto_save_frame, text="自动保存")
        self.auto_save_label.pack(side="left", anchor="se")
        # 自动保存按键，初始背景为灰色，点击后切换颜色
        self.auto_save_btn = tk.Button(self.auto_save_frame, text="OFF", width=4, height=1, bg="gray", command=self.toggle_auto_save)
        self.auto_save_btn.pack(side="right", padx=(2,0), anchor="se")
        # 文件最大容量
        self.file_max_volume_label = tk.Label(self.right_frame, text="文件最大容量")
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
        self.auto_clear_all_content = None
        self.auto_save_new_text = None
        # ─── 新增：PowerShell 进程句柄 ───
        self.ps_proc = None
        #self.last_auto_delete_lines = 0
        self.refresh_ports()
        # 初始化完成后，尝试加载之前保存的配置
        self.load_setup()

        # 启动定时检查任务，每10秒检测一次 text_area 内容是否过大需要删除
        self.auto_save_and_auto_delete()

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
            messagebox.showerror("程序异常", f"发生异常:\n{val}")
        except Exception:
            # 避免在没有主窗口或多线程时弹窗崩溃
            pass

        # 不抛出异常，让 Tkinter 事件循环继续

    def show_about_window(self):
        top = tk.Toplevel(root)
        top.title("Donation")
        # 设置固定窗口大小
        win_width = 300
        win_height = 300

        # 获取主窗口的位置和尺寸
        root.update_idletasks()
        root_x = root.winfo_x()
        root_y = root.winfo_y()
        root_width = root.winfo_width()
        root_height = root.winfo_height()

        # 计算居中位置
        pos_x = root_x + (root_width - win_width) // 2
        pos_y = root_y + (root_height - win_height) // 2

        # 设置 Toplevel 窗口的大小和位置
        top.geometry(f"{win_width}x{win_height}+{pos_x}+{pos_y}")
    
        # 加载大图
        try:
            # 解码 base64 数据
            img_data = base64.b64decode(img_base64)
            img_pil = Image.open(BytesIO(img_data))
            img_resized = img_pil.resize((200, 200), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(img_resized)

            # 显示图片
            label = tk.Label(top, image=photo)
            label.image = photo  # 防止被垃圾回收
            label.pack(pady=10)
        except Exception as e:
            tk.Label(top, text=f"图片显示失败: {e}").pack()

        tk.Label(top, text="Open source is not easy.").pack()
        tk.Label(top, text="Donations are welcome via Alipay.").pack()


    # 打开 按键
    def open_multi_loop_file(self):
        """打开指定文件夹路径和文件名的 .txt 文件，并将其中的内容替换到多行循环发送文本框中，同时记录文件路径"""
        dir_path = self.multi_script_path_entry.get().strip()
        file_name = self.multi_script_file_combo.get().strip()
        if not dir_path or not file_name:
            messagebox.showwarning("警告", "请选择脚本路径和脚本文件")
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
            messagebox.showerror("错误", f"加载脚本失败：{e}")
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
                messagebox.showinfo("提示", "保存成功")
            except Exception as e:
                messagebox.showerror("错误", f"保存文件失败: {e}")
        else:
            # 若之前未指定路径，则调用另存为功能
            self.save_multi_loop_file_as()

    # 另存为 按键
    def save_multi_loop_file_as(self):
        """弹出对话框指定路径和文件名，将多行循环发送文本框中的内容保存至指定的 .txt 文件中"""
        file_path = filedialog.asksaveasfilename(
            title="另存为",
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
                messagebox.showinfo("提示", "保存成功")

            except Exception as e:
                messagebox.showerror("错误", f"保存文件失败: {e}")

    # 根据窗口名文本框更新窗口名
    def update_window_title(self, event=None):
        new_title = self.window_name_var.get()
        self.root.title(new_title)

    def clear_text_area(self):
        #raise RuntimeError("测试异常触发")
        """清除接收文本框中的所有内容，并重置发送和接收的字符计数"""
        # self.text_area.after(0, lambda: (
        #     self.text_area.delete("1.0", "end"),
        #     self.last_saved_index = self.text_area.index("end-1c")
        #     ))
        self.text_area.delete("1.0", "end"),
        self.last_saved_index = "1.0"
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
        
    def start_multi_loop_send(self):
        if not self.loop_sending:
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
        if self.loop_sending:
            self.loop_stop = True
            self.loop_sending = False
            # 为了避免在暂停状态下不能退出，恢复 Event
            self.pause_event.set()
            self.paused = False
            # 恢复按钮初始状态
            self.start_button.config(state=tk.NORMAL)
            self.stop_button.config(state=tk.DISABLED)
            self.pause_button.config(state=tk.DISABLED, text="暂停")

    def pause_resume_multi_loop_send(self):
        # 如果没有运行，则不处理
        if not self.loop_sending:
            return
        # 如果当前未处于暂停状态，则暂停；如果已暂停，则继续
        if not self.paused:
            self.pause_event.clear()  # 清除后wait()处将会阻塞
            self.paused = True
            self.pause_button.config(text="继续")
        else:
            self.pause_event.set()     # 允许继续执行
            self.paused = False
            self.pause_button.config(text="暂停")


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
            while elapsed < seconds:
                self.pause_event.wait()
                if self.loop_stop:
                    raise StopLoopException("循环已停止")
                time.sleep(interval)
                elapsed += interval
                #self.root.update_idletasks()

        def wait_for(target_string, over_time):
            if target_string == '':
                self.tk_safe(lambda: messagebox.showwarning("Warning", "wait for must have a target string."))
                return False
            if over_time <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Over time must be positive."))
                return False

            self.allow_auto_delete = False
            self.script_wait_for_new_text = ""
            start_time = time.time()
            last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
            start_index = last_index
            try:
                while time.time() - start_time < over_time:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    #self.root.update_idletasks()
                    current_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                    if self.tk_safe(lambda:self.text_area.compare(last_index, ">", current_index)):
                        #print(f"wait_for get function find last index bigger than current index.\n")
                        self.tk_safe(lambda: messagebox.showerror("脚本执行错误", "wait_for get function find last index bigger than current index. wait for function skipped"))
                        return False
                    if self.tk_safe(lambda:self.text_area.compare(last_index, "<", current_index)):    
                        try:
                            self.script_wait_for_new_text = self.tk_safe(lambda:self.text_area.get(last_index, current_index),wait = True)
                        except Exception as e:
                            #print(f"wait_for get text fault, index might be changed and not corrected right: {e}")
                            self.script_wait_for_new_text = ""
                    if target_string in self.script_wait_for_new_text:
                        return True
                    time.sleep(0.1)
                    try:
                        if self.tk_safe(lambda:self.text_area.compare("end-1c", "==", "1.0")) and target_string != "":
                            last_index = "1.0"
                        else:
                            last_index = self.tk_safe(lambda:self.text_area.index(f"{current_index} - {max(1, len(target_string))}c"))
                            if self.tk_safe(lambda:self.text_area.compare(last_index, "<", start_index)):
                                last_index = start_index
                    except Exception:
                        self.tk_safe(lambda: messagebox.showerror("脚本执行错误", "wait_for index auto change error 2"))
                        return False
            finally:
                self.allow_auto_delete = True
            return False

        def wait_for_any(target_list, timeout):
            if not target_list:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "wait_for_any must have a non-empty target list."))
                return None
            if timeout <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Timeout must be positive."))
                return None

            self.allow_auto_delete = False
            self.script_wait_for_any_new_text = ""
            try:
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
                    #self.root.update_idletasks()
                    if time.time() - start_time >= timeout:
                        return None
                    current_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                    if self.tk_safe(lambda:self.text_area.compare(last_index, ">", current_index)):
                        #print("wait for any index error, last index bigger than current index. wait for any skipped.")
                        self.tk_safe(lambda: messagebox.showerror("脚本执行错误", "wait for any index error, last index bigger than current index. wait for any skipped."))
                        return None
                    if self.tk_safe(lambda:self.text_area.compare(last_index, "<", current_index)):
                        try:
                            self.script_wait_for_any_new_text = self.tk_safe(lambda:self.text_area.get(last_index, current_index))
                        except Exception as e:
                            #print(f"wait_for_any get 出错: {e}")
                            self.script_wait_for_any_new_text = ""
                    for target in target_list:
                        if target in self.script_wait_for_any_new_text:
                            return target
                    time.sleep(0.1)
                    try:
                        if self.tk_safe(lambda:self.text_area.compare("end-1c", "==", "1.0")) and length_of_longest_string > 0:
                            last_index = "1.0"
                        else:
                            last_index = self.tk_safe(lambda:self.text_area.index(f"{current_index} - {max(1, length_of_longest_string)}c"))
                            if self.tk_safe(lambda:self.text_area.compare(last_index, "<", start_index)):
                                last_index = start_index
                    except Exception:
                        self.tk_safe(lambda: messagebox.showerror("脚本执行错误", "wait_for_any index auto change error 2"))
                        return None
            finally:
                self.allow_auto_delete = True

        def show_str(string_to_show):
            if string_to_show == "":
                self.tk_safe(lambda: messagebox.showerror("函数错误", "show_str函数的输入值不能为空."))
                return
            self.tk_safe(lambda:self.text_area.insert(tk.END, string_to_show))
            self.tk_safe(lambda:self.text_area.see(tk.END))

        def show_date_time():
            self.tk_safe(lambda:self.text_area.insert(tk.END, str(datetime.now()) + "\n"))
            self.tk_safe(lambda:self.text_area.see(tk.END))

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
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Over time must be positive."))
                return None

            self.allow_auto_delete = False
            self.script_wait_for_new_text = ""
            collected_text = ""   # 新增
            start_time = time.time()
            last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
            try:
                while time.time() - start_time < over_time:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    #self.root.update_idletasks()
                    current_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                    if self.tk_safe(lambda:self.text_area.compare(last_index, ">", current_index)):
                        #print(f"get_future_lines function failed due to last index bigger than current index.\n")
                        self.tk_safe(lambda: messagebox.showerror("脚本执行错误", "get_future_lines function failed due to last index bigger than current index."))
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
                self.allow_auto_delete = True
            return collected_text


        def get_future_lines_till_str_or_overtime(end_str,over_time):
            if end_str == '':
                self.tk_safe(lambda: messagebox.showwarning("Warning", "end_str must not be empty."))
                return None
            if over_time <= 0:
                self.tk_safe(lambda: messagebox.showwarning("Warning", "Over time must be positive."))
                return None

            self.allow_auto_delete = False
            self.script_wait_for_new_text = ""
            collected_text = ""   # 新增
            start_time = time.time()
            last_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
            try:
                while time.time() - start_time < over_time:
                    if self.loop_stop:
                        raise StopLoopException("循环已停止")
                    #self.root.update_idletasks()
                    current_index = self.tk_safe(lambda:self.text_area.index("end-1c"))
                    if self.tk_safe(lambda:self.text_area.compare(last_index, ">", current_index)):
                        #print(f"get_future_lines function failed due to last index bigger than current index.\n")
                        self.tk_safe(lambda: messagebox.showerror("脚本执行错误", "get_future_lines function failed due to last index bigger than current index."))
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
                self.allow_auto_delete = True
            return collected_text



        def set_port(port_name):
            port_str = str(port_name)
            try:
                self.tk_safe(lambda: self.port_menu.set(port_str))
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror("错误", f"设置端口失败: {e}"))

        def set_baudrate(baud):
            baud_str = str(baud)
            try:
                self.tk_safe(lambda: self.baud_var.set(baud_str))
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror("错误", f"设置波特率失败: {e}"))

        # This function will be injected into the user's script
        # It handles highlighting and pausing
        def _highlight_and_wait(line_nums):
            self.tk_safe(lambda: self.multi_loop_text.tag_remove("highlight", "1.0", tk.END))
            if line_nums:
                first_line_num = line_nums[0]
                last_line_num = line_nums[-1]
                self.tk_safe(lambda: self.multi_loop_text.tag_add("highlight", f"{first_line_num}.0", f"{last_line_num}.end"))
                self.tk_safe(lambda: self.multi_loop_text.see(f"{first_line_num}.0"))
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
            "clear_all_highlights":clear_all_highlights,
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
            self.root.after(0, lambda i=iteration: self.current_loop_count.set(f"当前循环：{i}"))

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
                            last_tb_line = "<无法获取行内容>"
                    else:
                        import linecache
                        last_tb_line = linecache.getline(filename, lineno).strip()
                else:
                    last_tb_line = "<未知代码行>"

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
                            vars_in_line[name] = "<未定义>"
                vars_in_line_str = "\n".join([f"{k} = {v}" for k, v in vars_in_line.items()])

                # 获取 text_area 内容
                try:
                    text_area_content = self.tk_safe(lambda:self.text_area.get("1.0", tk.END))
                except Exception:
                    text_area_content = "<无法获取 text_area 内容>"

                # 获取所有局部变量
                try:
                    local_vars_str = "\n".join([f"{k}={v!r}" for k, v in local_namespace.items()])
                except Exception:
                    local_vars_str = "<无法获取局部变量>"

                # 获取全局变量（排除内建）
                try:
                    global_vars_str = "\n".join([f"{k}={v!r}" for k, v in globals().items() if k not in ("__builtins__",)])
                except Exception:
                    global_vars_str = "<无法获取全局变量>"

                # 获取 GUI 控件状态
                gui_vars_str = ""
                try:
                    gui_vars_str = "\n".join([f"{name}={entry.get()}" for name, entry in getattr(self, "entries_dict", {}).items()])
                except Exception:
                    gui_vars_str = "<无法获取 GUI 控件状态>"

                # 系统信息
                system_info = f"Python版本: {sys.version}\n平台: {platform.platform()}\n当前目录: {os.getcwd()}"

                # 生成完整错误信息
                error_info = f"""
==== Script Execution Error ====
时间: {error_time}
循环次数: {iteration}
异常类型: {type(e).__name__}
异常信息: {e}
Traceback:
{tb_str}

出错行信息:
{last_tb_line}

出错行相关变量:
{vars_in_line_str}

脚本输出(print):
{output_text}

当前执行脚本内容:
{full_executable_script}

局部变量:
{local_vars_str}

全局变量:
{global_vars_str}

GUI 控件状态:
{gui_vars_str}

当前 text_area 内容:
{text_area_content}

系统信息:
{system_info}
===============================
"""

                try:
                    with open("script_error_info.txt", "a", encoding="utf-8") as f:
                        f.write(error_info)
                except Exception:
                    pass

                self.tk_safe(lambda: messagebox.showerror(
                    "脚本执行错误",
                    f"错误原因:\n{e}\n\n"
                    f"出错位置：\n{last_tb_line}\n\n"
                    f"错误详情：\n{tb_str}\n\n"
                    f"详细信息参见 script_error_info.txt"
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
            self.tk_safe(lambda: messagebox .showerror("错误", f"无法打开 PowerShell: {e}"))

    '''def _read_ps_output(self):
        print("[_read_ps_output] thread started")
        for line in self.ps_proc.stdout:
            print(f"[ps stdout] {line.strip()}")
            self.text_area.after(0, self._append_text, line)'''

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
        if not isinstance(text, str) or text.strip() == "":
            return
        """在 text_area 末尾插入文本，并自动滚动。"""
        # 使用after lambda的形式是为了让子进程不会冲突
        self.tk_safe(lambda:self.text_area.insert(tk.END, text))
        self.tk_safe(lambda:self.text_area.see(tk.END))
        # 可选：也更新发送/接收统计等

    def powershell_send(self, cmd_text):
        """类方法：向已打开的 PowerShell 窗口发送命令"""
        if getattr(self, 'ps_proc', None) and self.ps_proc.stdin:
            try:
                print(f"[powershell_send] sending: {cmd_text}")
                self.ps_proc.stdin.write(cmd_text + "\n")
                self.ps_proc.stdin.flush()
            except Exception as e:
                self.tk_safe(lambda: messagebox.showerror("错误", f"PowerShell 发送失败: {e}"))
        else:
            self.tk_safe(lambda: messagebox.showwarning("警告", "请先执行 open power shell"))
    

    def on_closing(self):
        """
        在窗口关闭时调用，先保存当前UI设置，然后正常销毁窗口
        """
        # 如果自动保存正在开启，则先关闭文件
        if self.auto_save_file:
            self.auto_save_file.close()
            self.auto_save_file = None

        # 先保存当前控件值到配置文件
        self.save_setup()
        
        # 然后再销毁窗口
        self.root.destroy()

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
            path = filedialog.askdirectory(title="选择文件夹")
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
            path = filedialog.askdirectory(title="选择文件夹")
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
            path = filedialog.askdirectory(title="选择文件夹")
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

    def load_script(self):
        dir_path = self.script_path_entry.get().strip()
        file_name = self.script_file_combo.get().strip()
        if not dir_path or not file_name:
            messagebox.showwarning("警告", "请选择脚本路径和脚本文件")
            return
        full_path = os.path.join(dir_path, file_name)
        try:
            # term的ts文件本来是ANSI格式的，
            #with open(full_path, "r", encoding="utf-8-sig") as f:
            with open(full_path, "r", encoding="gbk") as f:
                content = f.read()
        except Exception as e:
            messagebox.showerror("错误", f"加载脚本失败：{e}")
            return
        # 使用正则表达式解析标签页和按钮信息
        tab_pattern = re.compile(r'<tab\s*\{([^}]+)\}>(.*?)</tab>', re.DOTALL)
        button_pattern = re.compile(r'<button\s*\{(\d+)\}\s*\{([^}]+)\}>(.*?)</button>', re.DOTALL)
        data_pattern = re.compile(r'<data>\s*(.*?)\s*</data>', re.DOTALL)
        tabs = tab_pattern.findall(content)
        if not tabs:
            messagebox.showwarning("警告", "未找到任何标签页定义")
            return
        # 清除现有标签页
        for tab in self.notebook.tabs():
            self.notebook.forget(tab)
        # 对每个标签页创建新的标签
        for tab_name, tab_content in tabs:
            button_info = {}  # key: 按钮索引(int)，value: (按钮名称, 按钮文本)
            buttons = button_pattern.findall(tab_content)
            for btn_index, btn_name, btn_content in buttons:
                data_match = data_pattern.search(btn_content)
                btn_text = data_match.group(1).strip() if data_match else ""
                button_info[int(btn_index)] = (btn_name, btn_text)
            self.create_tab_from_script(tab_name, button_info)

    def save_script(self):
        # 获取脚本文件名，如果为空则提示警告
        file_name = self.script_file_combo.get().strip()
        if not file_name:
            messagebox.showwarning("警告", "未指定保存文件")
            return
        # 获取脚本路径
        dir_path = self.script_path_entry.get().strip()
        if not dir_path:
            messagebox.showwarning("警告", "未指定脚本路径")
            return
        full_path = os.path.join(dir_path, file_name)
    
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
            with open(full_path, "w", encoding="gbk") as f:
                f.write(script_content)
            messagebox.showinfo("提示", "脚本保存成功")
        except Exception as e:
            messagebox.showerror("错误", f"保存脚本失败：{e}")

    def save_as_new_script(self):
        # 弹出新窗口，允许选择保存路径和输入文件名
        new_win = tk.Toplevel(self.root)
        new_win.title("保存为新脚本")
        new_win.grab_set()  # 模态窗口

        tk.Label(new_win, text="保存路径:").grid(row=0, column=0, padx=5, pady=5, sticky="w")
        path_entry = tk.Entry(new_win, width=40)
        path_entry.grid(row=0, column=1, padx=5, pady=5)
        # 新增：默认值为当前脚本路径文本框的值
        default_path = self.script_path_entry.get().strip()
        path_entry.insert(0, default_path)
    
        tk.Button(new_win, text="选择", command=lambda: self.choose_folder_in_win(path_entry)).grid(row=0, column=2, padx=5, pady=5)
    
        def choose_folder():
            try:
                folder = self.root.tk.call('tk_chooseDirectory')
            except Exception:
                folder = filedialog.askdirectory(title="选择文件夹")
            if folder:
                path_entry.delete(0, tk.END)
                path_entry.insert(0, folder)
        tk.Button(new_win, text="选择", command=choose_folder).grid(row=0, column=2, padx=5, pady=5)

        tk.Label(new_win, text="文件名 (.ts):").grid(row=1, column=0, padx=5, pady=5, sticky="w")
        file_entry = tk.Entry(new_win, width=40)
        file_entry.grid(row=1, column=1, padx=5, pady=5)

        def do_save():
            folder = path_entry.get().strip()
            file_name = file_entry.get().strip()
            if not folder or not file_name:
                messagebox.showwarning("警告", "请选择保存路径并输入文件名", parent=new_win)
                return
            if not file_name.lower().endswith(".ts"):
                file_name += ".ts"
            full_path = os.path.join(folder, file_name)
            try:
                # 创建新文件（若已存在则覆盖为空）
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write("")
            except Exception as e:
                messagebox.showerror("错误", f"无法创建文件：{e}", parent=new_win)
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

        tk.Button(new_win, text="保存", command=do_save).grid(row=2, column=0, columnspan=3, padx=5, pady=10)
    
    def choose_folder_in_win(self, entry_widget):
        try:
            folder = self.root.tk.call('tk_chooseDirectory')
        except Exception:
            folder = filedialog.askdirectory(title="选择文件夹")
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
            cell.config(command=lambda c=cell: self.cell_send(c))
            cell.bind("<Button-3>", lambda event, c=cell: self.show_cell_menu(event, c))
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
                # 左键点击：发送该按钮保存的多行内容
                cell.config(command=lambda c=cell: self.cell_send(c))
                # 右键绑定：弹出单元格菜单
                cell.bind("<Button-3>", lambda event, c=cell: self.show_cell_menu(event, c))

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
        edit_win.configure(bg=window_bg_color)
        # 将编辑窗口放在屏幕正中心
        edit_win.update_idletasks()
        screen_width = edit_win.winfo_screenwidth()
        screen_height = edit_win.winfo_screenheight()
        window_width = edit_win.winfo_reqwidth()
        window_height = edit_win.winfo_reqheight()
        x = (screen_width // 2) - (window_width // 2)
        y = (screen_height // 2) - (window_height // 2)
        edit_win.geometry(f"+{x}+{y}")

        # 使用 grid 布局，让窗口随大小变化
        edit_win.columnconfigure(0, weight=1)
        # row 1 为多行文本框，设置扩展权重，使其填满剩余垂直空间
        edit_win.rowconfigure(1, weight=1)

        # 单行文本框用于编辑显示内容
        single_entry = tk.Entry(
            edit_win, 
            width=50,
            bg=text_bg_color,
            fg=text_fg_color,
            insertbackground=cursor_color,  # 光标颜色
            insertborderwidth=1
        )
        single_entry.grid(row=0, column=0, padx=10, pady=(10, 5), sticky="ew")
        single_entry.insert(tk.END, self.current_cell.cget("text"))
        # 获取单行文本框中的内容，设置为窗口标题
        current_single_line_text = single_entry.get()
        if current_single_line_text == '':
            cell_title = "未命名"
        else:
            cell_title = current_single_line_text
        edit_win.title(cell_title)
        # 多行文本框用于编辑待发送内容
        #multi_text = scrolledtext.ScrolledText(edit_win)
        multi_text = scrolledtext.ScrolledText(
            edit_win,
            undo=True,               # 启用撤销栈
            autoseparators=False,    # 关闭自动分隔
            maxundo=20,               # 不限撤销步数
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

        #multi_text = tk.Text(edit_win)
        #multi_text.grid(row=1, column=0, padx=10, pady=5, sticky="nsew")
        #multi_text.insert(tk.END, self.current_cell.custom_data)
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
                # 单行：直接发送
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
                else:
                    self.send_via_serial(current_line)

            # 计算下一行行号（循环回到第一行）
            total_lines = int(multi_text.index("end-1c").split('.')[0])
            next_line = line_num + 1 if line_num < total_lines else 1
            next_start = f"{next_line}.0"
            next_end   = f"{next_line}.end"

            # 移动光标到下一行行首
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
            new_text = single_entry.get()
            cell.config(text=new_text)
            cell.custom_data = multi_text.get("1.0", tk.END).strip()
            edit_win.title(new_text)
            if close_after:
                edit_win.destroy()
        btn_send_row = tk.Button(left_frame, text="Send(F1)", command=send_current_row,bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_send_row.pack(side=tk.LEFT, padx=5)
        btn_send_row_move = tk.Button(left_frame, text="Send & Next(F5)", command=send_current_row_and_move,bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_send_row_move.pack(side=tk.LEFT, padx=5)
        btn_send_all = tk.Button(left_frame, text="Send All(F9)", command=lambda: self.send_all(multi_text.get("1.0", tk.END)),bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_send_all.pack(side=tk.LEFT, padx=5)

        # 给编辑窗口绑定功能键事件
        edit_win.bind("<F1>", lambda event: send_current_row())
        edit_win.bind("<F5>", lambda event: send_current_row_and_move())
        edit_win.bind("<F9>", lambda event: self.send_all(multi_text.get("1.0", tk.END)))

        btn_save = tk.Button(right_frame, text="Save", command=lambda: save_action(False),bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_save.pack(side=tk.LEFT, padx=5)
        btn_save_close = tk.Button(right_frame, text="Save & close", command=lambda: save_action(True),bg=btn_bg_color, fg=btn_fg_color,activebackground=btn_bg_color, activeforeground=btn_fg_color)
        btn_save_close.pack(side=tk.LEFT, padx=5)

        # 确保窗口拥有键盘焦点，以捕获按键
        edit_win.focus_set()

        # ——— 为 multi_text 增加右键菜单 ———
        def show_context_menu(event):
            context_menu = tk.Menu(multi_text, tearoff=0)
            context_menu.add_command(label="剪切", command=lambda: multi_text.event_generate("<<Cut>>"))
            context_menu.add_command(label="复制", command=lambda: multi_text.event_generate("<<Copy>>"))
            context_menu.add_command(label="粘贴", command=lambda: multi_text.event_generate("<<Paste>>"))
            context_menu.add_command(label="删除", command=lambda: multi_text.delete("sel.first", "sel.last") if multi_text.tag_ranges("sel") else None)
            context_menu.add_separator()
            context_menu.add_command(label="全选", command=lambda: multi_text.tag_add("sel", "1.0", "end"))
            context_menu.tk_popup(event.x_root, event.y_root)

        multi_text.bind("<Button-3>", show_context_menu)

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

            def check_received():
                current_index = self.tk_safe(lambda: self.text_area.index("end-1c"))
                if self.tk_safe(lambda: self.text_area.compare(self.wait_for_initial_index, ">", current_index)):
                    print("wait for x for t error, initial index bigger than current index, wait for skipped.")
                    self.tk_safe(lambda: messagebox.showerror("commands running error","wait for x for t error, initial index bigger than current index, wait for skipped."))
                    return
                        
                self.button_send_wait_for_new_text = self.tk_safe(lambda: self.text_area.get(self.wait_for_initial_index, current_index))

                if wait_str in self.button_send_wait_for_new_text or (time.time() - start_time >= wait_time):
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
                        self.tk_safe(lambda: messagebox.showerror("wait terminal symbol error","wait terminal symbol error, last index bigger than current index, wait for skipped."))
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
                        self.text_area.insert(tk.END, "串口未收到设置的等待符号，发送终止，请设置或去掉等待符号。", "red")
                        self.text_area.yview(tk.END)
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
            self.current_cell.config(text="")
            self.current_cell.custom_data = ""

    def cell_paste(self):
        if self.current_cell and self.cell_clipboard:
            self.current_cell.config(text=self.cell_clipboard[0])
            self.current_cell.custom_data = self.cell_clipboard[1]

    def cell_send(self, cell):
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
            self.tk_safe(lambda: messagebox.showwarning("警告", "串口或 SSH 未连接"))
            return
        key = data.strip().lower()
        # 拦截打开 PowerShell
        if key == "open power shell":
            self.open_powershell()
            return
        # 拦截向 PowerShell 发送命令
        if key.startswith("power shell send "):
            cmd = data.strip()[len("power shell send "):]
            self.powershell_send(cmd)
            return
        # ── VISA 拦截 ──
        # 1) 初始化 VISA 设备
        if key.startswith("visa_init"):
            m = re.match(r'visa_init\(\s*([^\)]+?)\s*\)', data, re.IGNORECASE)
            if m:
                addr = m.group(1)
                try:
                    # 使用 shared_lock 模式，等待解锁时间设为 3000 ms
                    visa_res = self.rm.open_resource(
                        addr,
                        access_mode=AccessModes.shared_lock,  # ⑤ 共享锁
                        open_timeout=3000                    # ⑥ 等待 3 s
                    )
                    self.psu = VisaComm(visa_res)
                    self.tk_safe(lambda: self.text_area.insert(tk.END, f"√ VISA 初始化成功: {addr}\n"))
                except Exception as e:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, f"× VISA 初始化失败: {e}\n"))
            else:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× visa_init 格式错误，应为 visa_init(ADDRESS)\n"))
            self.tk_safe(lambda: self.text_area.see(tk.END))
            return

        # 2) QUERY
        if key.startswith("visa_query"):
            if not self.psu:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× 请先使用 visa_init 初始化设备\n"))
            else:
                m = re.match(r'visa_query\(\s*(.+?)\s*\)', data.strip(), re.IGNORECASE)
                if m:
                    cmd = m.group(1)
                    try:
                        resp = self.psu.query(cmd)
                        self.tk_safe(lambda: self.text_area.insert(tk.END, f">>> VISA QUERY: {cmd}\n{resp}\n"))
                    except Exception as e:
                        self.tk_safe(lambda: self.text_area.insert(tk.END, f"× VISA QUERY 错误: {e}\n"))
                else:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "× visa_query 格式错误，应为 visa_query(COMMAND)\n"))
            self.tk_safe(lambda: self.text_area.see(tk.END))
            return

        # 3) WRITE
        if key.startswith("visa_write"):
            if not self.psu:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× 请先使用 visa_init 初始化设备\n"))
            else:
                m = re.match(r'visa_write\(\s*(.+?)\s*\)', data.strip(), re.IGNORECASE)
                if m:
                    cmd = m.group(1)
                    try:
                        self.psu.write(cmd)
                        self.tk_safe(lambda: self.text_area.insert(tk.END, f"√ VISA WRITE: {cmd}\n"))
                    except Exception as e:
                        self.tk_safe(lambda: self.text_area.insert(tk.END, f"× VISA WRITE 错误: {e}\n"))
                else:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, "× visa_write 格式错误，应为 visa_write(COMMAND)\n"))
            self.tk_safe(lambda: self.text_area.see(tk.END))
            return

        # 4) READ
        if key.startswith("visa_read"):
            if not self.psu:
                self.tk_safe(lambda: self.text_area.insert(tk.END, "× 请先使用 visa_init 初始化设备\n"))
            else:
                try:
                    resp = self.psu.read()
                    self.tk_safe(lambda: self.text_area.insert(tk.END, f">>> VISA READ:\n{resp}\n"))
                except Exception as e:
                    self.tk_safe(lambda: self.text_area.insert(tk.END, f"× VISA READ 错误: {e}\n"))
            self.tk_safe(lambda: self.text_area.see(tk.END))
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
                self.tk_safe(lambda: messagebox.showerror("SSH 发送失败", str(e)))
                return
        else:
            self.serial_conn.send_data(raw)  
        
        # 判断是否向主窗口写入发送的字符串
        if insert_display:
            # 安全地在主线程插入并滚动
            self.tk_safe(lambda: self.text_area.insert(tk.END, raw))
            self.tk_safe(lambda: self.text_area.yview(tk.END))
        # 在此处更新发送后的窗口的最后的位置
        self.last_send_index = self.tk_safe(lambda: self.text_area.index("end-1c"))

        # （3）更新统计
        self.sent_bytes += len(data.encode())
        self.update_data_stats()

    def create_new_tab(self):
        new_title = f"Tab {len([t for t in self.notebook.tabs() if self.notebook.tab(t, 'text') != '']) + 1}"
        self.add_tab(new_title)
        self.notebook.select(self.notebook.tabs()[-1])

    def rename_current_tab(self):
        current = self.notebook.select()
        if current:
            current_name = self.notebook.tab(current, "text")
            new_name = simpledialog.askstring("重命名", "请输入新名称：",initialvalue=current_name, parent=self.root)
            if new_name:
                self.notebook.tab(current, text=new_name)

    def delete_current_tab(self):
        current = self.notebook.select()
        if current:
            self.notebook.forget(current)

    def get_ports(self):
        ports = [port.device for port in serial.tools.list_ports.comports()]
        return ports if ports else ["无可用串口"]

    def refresh_ports(self):
        ports = self.get_ports()
        self.port_menu["values"] = ports
        if ports:
            self.port_var.set(ports[0])

    def toggle_serial(self):
    # 如果当前没有连接或串口未打开，则尝试连接
        if self.serial_conn is None or not (self.serial_conn.ser and self.serial_conn.ser.is_open):
            self.connect_serial()  # connect_serial 内部会更新相关状态
            # 如果连接成功，则更新按钮文字为“关闭串口”
            if self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open:
                self.toggle_port_btn.config(text="关闭串口")
        else:
            self.close_serial()  # close_serial 内部更新状态
            self.toggle_port_btn.config(text="打开串口")

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
                self.toggle_port_btn.config(text="关闭串口")
                self.port_menu.config(state="disabled")
                self.baud_menu.config(state="disabled")
                self.refresh_btn.config(state="disabled")
                self.status_canvas.config(bg="green")
                self.tk_safe(lambda: self.text_area.insert(tk.END, f"串口已打开: {port} @ {baudrate}bps\n"))
                self.tk_safe(lambda: self.text_area.yview(tk.END))
                self.stop_reading = False
                self.reading_thread = threading.Thread(target=self.read_from_serial, daemon=True)
                self.reading_thread.start()
            else:
                # 串口未打开成功，给出错误提示
                self.tk_safe(lambda: self.text_area.insert(tk.END, f"错误: 无法连接到 {port}\n"))
                self.tk_safe(lambda: self.text_area.yview(tk.END))
        except Exception as e:
            self.tk_safe(lambda: self.text_area.insert(tk.END, f"错误: 无法连接到 {port}\n"))
            self.tk_safe(lambda: self.text_area.yview(tk.END))

    def close_serial(self):
        if self.serial_conn:
            self.stop_reading = True
            self.serial_conn.close()
            self.send_btn.config(state=tk.DISABLED) #发送
            self.single_loop_send_btn.config(state=tk.DISABLED) #单行循环
            #self.start_button.config(state=tk.DISABLED) # 开始运行按钮，新增了脚本对COM口的操作，此行注释掉
            self.stop_button.config(state=tk.DISABLED)
            self.pause_button.config(state=tk.DISABLED)
            self.toggle_port_btn.config(text="打开串口")
            self.port_menu.config(state="readonly")
            self.baud_menu.config(state="readonly")
            self.refresh_btn.config(state="normal")
            self.status_canvas.config(bg="gray")
            self.tk_safe(lambda: self.text_area.insert(tk.END, "串口已关闭\n"))
            self.tk_safe(lambda: self.text_area.yview(tk.END))


            if self.loop_sending:
                self.loop_sending = False
                self.single_loop_send_btn.config(text="单行循环")

    def open_ssh_config_window(self):
        win = tk.Toplevel(self.root)
        win.title("SSH 串口配置")

        # 固定初始大小
        width, height = 200, 180
        screen_w = win.winfo_screenwidth()
        screen_h = win.winfo_screenheight()
        x = (screen_w - width) // 2
        y = (screen_h - height) // 2
        win.geometry(f"{width}x{height}+{x}+{y}")

        tk.Label(win, text="IP 地址:").pack()
        ip_entry = tk.Entry(win)
        ip_entry.pack()
        ip_entry.insert(0, getattr(self, 'ssh_ip', ''))

        tk.Label(win, text="用户名:").pack()
        user_entry = tk.Entry(win)
        user_entry.pack()
        user_entry.insert(0, getattr(self, 'ssh_user', ''))

        tk.Label(win, text="密码:").pack()
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

        tk.Button(btn_frame, text="连接", command=connect_ssh).pack(side=tk.LEFT, padx=5)
        tk.Button(btn_frame, text="断开", command=disconnect_ssh).pack(side=tk.LEFT, padx=5)

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
            messagebox.showerror("SSH 连接失败", str(e))

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

    # 创建自动保存文件
    def create_auto_save_file(self):
        path = self.auto_save_path_entry.get().strip()
        fname = self.file_name_entry.get().strip()
        if not path or not fname:
            self.tk_safe(lambda: messagebox.showwarning("警告", "未指定路径和文件名"))
            return None
        # 构造文件名：保存文件名_YYYY-MM-DD_HH_MM_SS.txt
        filename = f"{fname}_{time.strftime('%Y-%m-%d')}_{time.strftime('%H-%M-%S')}.txt"
        full_path = os.path.join(path, filename)
        try:
            new_file = open(full_path, "w", encoding="utf-8")
            return new_file
        except Exception as e:
            self.tk_safe(lambda: messagebox.showerror("错误", f"无法创建自动保存文件：{e}"))
            return None

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
            self.single_loop_send_btn.config(text="停止发送")
            self.loop_thread = threading.Thread(target=self.loop_send, daemon=True)
            self.loop_thread.start()
        else:
            self.loop_sending = False
            self.single_loop_send_btn.config(text="单行循环")

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
                self.tk_safe(lambda: self.text_area.yview(tk.END))
                


                self.sent_bytes += len(data_to_send.encode())
                self.update_data_stats()
            sleep_time = 0
            while sleep_time < interval and self.loop_sending:
                time.sleep(0.1)
                sleep_time += 0.1
    
    def read_from_serial(self):
        while not self.stop_reading:
            if self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open:
                try:
                    # 使用 read() 读取当前缓冲区中的所有数据，如果没有数据则至少读取1个字节
                    data_bytes = self.serial_conn.ser.read(self.serial_conn.ser.in_waiting or 1)
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
                        received_str = data_bytes.decode(errors='replace')
                        #self.text_area.insert(tk.END, received_str)
                        self.tk_safe(lambda: self.text_area.insert(tk.END, received_str))
                        self.tk_safe(lambda: self.text_area.yview(tk.END))  # 自动滚动到末尾
                        self.received_bytes += len(data_bytes)
                        self.update_data_stats()
                    else:
                        # 如果没有接收到数据，计算当前时间和上次接收时间是否超过0.1秒，超过则允许下一次插入时间戳
                        if self.last_data_time is not None and (self.current_read_time - self.last_data_time) >= 0.1:
                            self.allow_new_timestamp = True  # 超过 0.1 秒后，允许下一次插入时间戳
                        # 如果没有接收到数据，短暂休眠，避免占用过多 CPU 资源
                        time.sleep(0.01)
                except Exception:
                    break

    def update_data_stats(self):
        # 如果发送或接收的字节数超过 1,000,000,000，则重置为0
        if self.sent_bytes >= 1_000_000_000:
            self.sent_bytes = 0
        if self.received_bytes >= 1_000_000_000:
            self.received_bytes = 0
        self.tk_safe(lambda: self.data_stats.set(f"发送: {format_bytes(self.sent_bytes)} | 接收: {format_bytes(self.received_bytes)}"))

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
        self.serial_conn.send_byte_data(b'\x03') # Alt+C -> Ctrl+C (ETX)
        print("发送 Alt+C (0x03) 信号到串口。")
        return "break"

    def on_alt_d_press(self, event):
        self.serial_conn.send_byte_data(b'\x04') # Alt+D -> Ctrl+D (EOT)
        print("发送 Alt+D (0x04) 信号到串口。")
        return "break"

    def on_alt_z_press(self, event):
        self.serial_conn.send_byte_data(b'\x1A') # Alt+Z -> Ctrl+Z (SUB)
        print("发送 Alt+Z (0x1A) 信号到串口。")
        return "break"

    def on_alt_l_press(self, event):
        self.serial_conn.send_byte_data(b'\x0C') # Alt+L -> Ctrl+L (FF - Form Feed, Clear Screen)
        print("发送 Alt+L (0x0C) 信号到串口。")
        return "break"

    def on_alt_a_press(self, event):
        self.serial_conn.send_byte_data(b'\x01') # Alt+A -> Ctrl+A (SOH - Start of Header, Go to Beginning of Line)
        print("发送 Alt+A (0x01) 信号到串口。")
        return "break"

    def on_alt_e_press(self, event):
        self.serial_conn.send_byte_data(b'\x05') # Alt+E -> Ctrl+E (ENQ - Enquiry, Go to End of Line)
        print("发送 Alt+E (0x05) 信号到串口。")
        return "break"

    def on_alt_k_press(self, event):
        self.serial_conn.send_byte_data(b'\x0B') # Alt+K -> Ctrl+K (VT - Vertical Tab, Cut to End of Line)
        print("发送 Alt+K (0x0B) 信号到串口。")
        return "break"

    def on_alt_u_press(self, event):
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
            self.text_area.yview(tk.END)
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
           
    '''def tk_safe(self, expr, wait=None):
        """
        在主线程安全执行 Tkinter 表达式。

        参数:
            expr : lambda 表达式 (Tkinter 调用)
            wait : None  → 自动判断 (有返回值就阻塞，无返回值就异步)
                   True  → 强制阻塞等待返回
                   False → 强制异步，不等待

        返回:
            - 如果阻塞执行且有返回值 → 返回结果
            - 其他情况 → None

        示例
            获取值（阻塞执行，自动返回结果）
            content = self.tk_safe(lambda: self.text_area.get("1.0", "end-1c"))
            pos = self.tk_safe(lambda: self.text_area.index("end-1c"))

            修改值（默认异步执行，不阻塞）
            self.tk_safe(lambda: self.text_area.insert(tk.END, "Hello\n"))
            self.tk_safe(lambda: self.text_area.delete("1.0", "end"))

            修改值但要阻塞（等执行完成后再继续）
            self.tk_safe(lambda: self.text_area.insert(tk.END, "阻塞插入\n"), wait=True)
        """
        # 1. 判断当前是否是主进程
        # 'MainProcess' 是默认的主进程名称
        is_main_process = multiprocessing.current_process().name == 'MainProcess'

        result = []
        event = threading.Event()

        def wrapper():
            try:
                r = expr()
                if r is not None:
                    result.append(r)
            except Exception as e:
                result.append(e)
            finally:
                event.set()

        # 安排到 Tk 主线程
        self.root.after(0, wrapper)

        # 自动模式: wait=None 默认设置为 True (阻塞)
        effective_wait = wait
        if effective_wait is None:
            effective_wait = True

        # 如果是主进程，强制设置为不等待 (不阻塞)
        if is_main_process:
            # 目标：主进程中不阻塞
            effective_wait = False

        # 自动模式: 根据返回值推断 wait
        if wait is None:
            # 如果调用看起来要返回值，调用者会用 `=` 赋值 → 需要等
            # 这里没法直接判断，只能靠习惯：取值时指定 wait=None 就能等
            # 修改操作一般不需要返回 → 默认不等
            wait = True  

        # 4. 执行等待或立即返回
        if effective_wait:
            # 只有子进程中 wait=True (或默认) 才会进入此阻塞等待
            # 使用一个较长的超时时间，以适应跨进程通信的额外开销
            event.wait(timeout=10.0)
            
            if result:
                if isinstance(result[0], Exception):
                    raise result[0]
                return result[0]
            # 超时或 expr() 返回 None
            return None
        else:
            # 主进程总是进入此分支（不阻塞），子进程 wait=False 也进入此分支
            return None
        '''

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
                    try:
                        max_capacity_mb = float(self.max_capacity_entry.get().strip())
                    except Exception:
                        max_capacity_mb = 10  # 默认10 MB
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
            if self.allow_auto_delete:
                self.auto_clear_all_content = self.tk_safe(lambda: self.text_area.get("1.0", "end-1c"))
                lenth_total_chars = len(self.auto_clear_all_content)
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

                        # 更新 last_saved_index
                        last_saved_index_line = int(self.last_saved_index.split('.')[0])
                        last_saved_index_colume = int(self.last_saved_index.split('.')[1])
                        self.last_saved_index = f"{last_saved_index_line - delete_end_line + 1}.{last_saved_index_colume}"

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
        self.tk_safe(lambda: self.text_area.see(tk.END))
        
    def save_setup(self):
        """
        将当前窗口名、串口选项、波特率、自动保存路径、文件名、文件最大容量、脚本路径、
        脚本文件名、循环间隔、默认延时、循环次数等信息保存到 TermPlusSetup.ini
        """
        config = configparser.ConfigParser()
        config['Setup'] = {
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
            'sent_commands': self.sent_commands
        }
        # 在程序所在目录创建/覆盖 TermPlusSetup.ini
        with open("TermPlusSetup.ini", "w", encoding="utf-8") as configfile:
            config.write(configfile)
    '''
    # 切换主窗口最大化
    def toggle_maximize(self):
        if not self.maximized:
            # 进入最大化模式：
            # 隐藏除 text_area 和 maximize_button 外的所有控件
            for widget in self.main_frame.winfo_children():
                if widget not in (self.text_area, self.maximize_button):
                    # 使用 place_forget 隐藏（text_area 由于使用 grid 故不处理）
                    widget.place_forget()
            # 隐藏 text_area 的 grid 布局，并通过 place 让其占满整个 main_frame
            self.text_area.grid_remove()
            self.text_area.place(relx=0, rely=0, relwidth=1, relheight=1)
            # 将窗口放到主窗口右上角
            self.maximize_button.place(relx=1, rely=0, anchor="ne", x=-15, y=0)
            # 修改按钮文字为“恢复”
            self.maximize_button.config(text="－")
            self.maximized = True
        else:
            # 恢复原布局：
            # 隐藏 text_area 使用的 place 布局，并恢复 grid 布局
            self.text_area.place_forget()
            self.text_area.grid(**self.original_text_area_grid)
            # 恢复之前隐藏的控件
            for widget, geom in self.original_layout.items():
                widget.place(**geom)
            # 将按钮放回主窗口右上角
            self.maximize_button.place(relx=1, rely=0, anchor="ne", x=-146, y=5)
                # 将按钮文字改回“最大化”
            self.maximize_button.config(text="□")
            self.maximized = False
    '''
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

        #self.multi_button_frame.configure(background=window_bg_color)
        #self.path_frame.configure(background=window_bg_color)
        #self.script_buttons_frame.configure(background=window_bg_color)
        #self.multi_script_buttons_frame.configure(background=window_bg_color)
        #self.multi_path_frame.configure(background=window_bg_color)
        self.file_capacity_frame.configure(background=window_bg_color)

        # 设置窗口背景色
        self.root.configure(bg=window_bg_color)
        # 设置菜单栏控件的颜色
        #self.menu_bar.configure(bg=window_bg_color, fg=text_fg_color, activebackground=window_bg_color, activeforeground=text_fg_color)  # 菜单栏本身无法修改颜色
        self.new_menu.configure(bg=window_bg_color, fg=text_fg_color)
        self.about_menu.configure(bg=window_bg_color, fg=text_fg_color)

        # 设置所有Label的颜色
        for widget in [self.label_send, self.stats_label, self.date_label_title, self.date_label,
                        self.time_label_title, self.time_label, self.time_label_title, self.time_stamp_title, self.loop_interval_label,
                        self.send_all_terminal_label, self.send_all_over_time_label,
                        self.multi_loop_label, self.current_loop_count_label,
                        self.default_delay_time_label, self.loop_count_label, self.window_name_label, self.choose_port_label, 
                        self.baud_label, self.auto_save_label,self.auto_save_path_label,self.save_file_name_label,self.file_max_volume_label,
                        self.MB_label,self.script_path_label,self.multi_script_path_label]:
            widget.configure(background=window_bg_color, foreground=text_fg_color)
           
        # 设置所有Entry的颜色
        for widget in [ self.loop_interval_entry, self.send_all_terminal_entry,
                        self.send_all_over_time_entry, self.default_delay_time_entry,
                        self.loop_count_entry, self.window_name_entry,self.file_name_entry,
                        self.max_capacity_entry,self.script_path_entry,self.multi_script_path_entry]:
            widget.configure(background=window_bg_color, foreground=text_fg_color) #, insertbackground=cursor_color
            
        # 设置所有Button的颜色
        for widget in [self.show_keys_btn, self.show_script_btn, self.toggle_sidebar_btn,self.theme_btn,
                        self.send_btn, self.single_loop_send_btn, self.clear_screen_btn,
                        self.start_button, self.pause_button, self.stop_button,
                        self.refresh_btn, self.toggle_port_btn,self.ssh_config_btn, self.square_button,self.script_path_button,self.multi_script_path_button,
                        self.load_script_button,self.save_script_button,self.save_as_script_button,self.open_multi_loop_btn,
                        self.save_multi_loop_btn,self.save_as_multi_loop_btn]:
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
        if not os.path.exists("TermPlusSetup.ini"):
            return  # 文件不存在则直接返回
        
        config = configparser.ConfigParser()
        config.read("TermPlusSetup.ini", encoding="utf-8")
        
        if 'Setup' in config:
            setup = config['Setup']
            
            # 读取窗口名并更新窗口标题
            if 'window_name' in setup:
                self.window_name_entry.delete(0, 'end')
                self.window_name_entry.insert(0, setup['window_name'])
                self.root.title(setup['window_name'])
            
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
            # 脚本路径
            if 'multi_script_path' in setup:
                self.multi_script_path_entry.delete(0, 'end')
                self.multi_script_path_entry.insert(0, setup['script_path'])
                self.multi_script_path_entry.icursor(tk.END)      # 将光标移到文本末尾
                self.multi_script_path_entry.update_idletasks()     # 强制更新界面
                self.multi_script_path_entry.xview_moveto(1.0)        # 滚动显示到文本末尾
                # 扫描路径下所有后缀为 .ts 的文件
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

            # 已发送命令
            if 'sent_commands' in setup:
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
    self.tk_safe(lambda: messagebox.showerror("程序异常", "发生未捕获异常，程序已记录日志，参见TermPlus_crash.log。"))


