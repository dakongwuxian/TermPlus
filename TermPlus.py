"""
版权所有 (c) 2025 [吴宪]

本软件TermPlus（以下简称“软件”）为个人非商业用途开源发布。任何人均可免费使用、复制、修改和分发本软件，但仅限于个人非商业用途。
对于商业用途（包括但不限于嵌入商业产品、提供商业服务、营利分发等），必须事先获得作者的书面许可。

本软件按“现状”提供，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性以及不侵权的保证。
在任何情况下，作者均不对因使用或无法使用本软件而产生的任何直接、间接、偶然、特殊或后续损害承担责任。

如需商业授权或有任何疑问，请联系：[dakongwuxian@gmail.com]
"""
from queue import Empty
import tkinter as tk
from tkinter import scrolledtext, ttk, Canvas, simpledialog, messagebox, filedialog
from turtle import color
import serial
import serial.tools.list_ports
import threading
import time
import os #新增，用于遍历目录
import re #新增，用于加载脚本文件
import configparser
import ast
from datetime import datetime

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

    #def receive_data(self):
    #    if self.ser and self.ser.is_open:
    #        # 串口接收等待时间设置，如果超过这个时间没有继续收到字符，则认为此次传输结束
    #        self.ser.timeout = 0.01
    #        try:
    #            data = self.ser.readline().decode().strip()
    #        except serial.SerialException:
    #            data = None
    #        return data

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
        self.auto_save_file = None
        self.last_saved_index = "1.0"  # 记录 autosave 时最后保存的位置
        self.auto_save_stop = False   # 控制 autosave 线程停止的标志
        self.root = root
        self.root.title("TermPlus")         
        window_width = 910
        window_height = 790
        root.minsize(910,600)
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
        self.about_menu.add_command(label="Developed By Xian.Wu", state="disabled")
        self.about_menu.add_command(label="dakongwuxian@gmail.com", state="disabled")
        
        # 用于单元格右键菜单的剪贴板（复制功能），存储元组 (text, custom_data)
        self.cell_clipboard = ("", "")
        self.current_cell = None

        # 在 __init__ 方法中，对根窗口进行 grid 配置
        self.root.rowconfigure(0, weight=1)
        self.root.columnconfigure(0, weight=1)

        # 使用 grid 布局创建 main_frame，并让它随窗口扩展
        self.main_frame = tk.Frame(self.root)
        self.main_frame.grid(row=0, column=0, sticky="nsew", padx=10, pady=10)
                
        # 设置 main_frame 内部的行和列
        self.main_frame.grid_rowconfigure(0, weight=1)            # Row 0（接收文本区域）扩展
        self.main_frame.grid_rowconfigure(1, weight=0, minsize=470) # Row 1 固定高度
        self.main_frame.grid_columnconfigure(0, weight=1)           # 第一列扩展
        self.main_frame.grid_columnconfigure(1, weight=0, minsize=120)
        
        # Row 0: 接收文本区域（日志显示）
        self.text_area = scrolledtext.ScrolledText(self.main_frame, wrap=tk.WORD)
        self.text_area.grid(row=0, column=0, columnspan=1, padx=10, pady=5, sticky="nsew")
        
        # 配置字体颜色的tag，设置前景色为对应色
        self.text_area.tag_config("red", foreground="red")
        self.text_area.tag_config("blue", foreground="blue")
        self.text_area.tag_config("green", foreground="green")

        # 在接受文本框中输入内容的处理
        self.text_area.bind("<Key>", self.on_key_press)
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

        # 启动定时检查任务，每30秒检测一次 text_area 内容是否过大需要删除
        self.text_area.after(30000, self.auto_save_and_auto_delete)

        # Row 1：发送文本标签、发送文本框、发送按钮和发送新行复选框
        # “发送文本:”
        row_1_y = -440 # “发送”、发送文本框、发送按钮、checkbox、“发送新行”的y坐标，坐标原点在窗口左上角
        label_send = tk.Label(self.main_frame, text="发送文本:")
        label_send.place(relx=0, rely=1, anchor="sw",x=10, y=row_1_y)

        # 发送文本框
        self.send_entry = ttk.Combobox(self.main_frame, width=66)
        self.send_entry.place(relx=0, rely=1, anchor="sw",x=80, y=row_1_y)
        self.send_entry.bind("<Return>", self.send_data_btn)

        # 发送新行复选框
        self.send_newline_var = tk.BooleanVar(value=True)
        self.newline_checkbox = tk.Checkbutton(self.main_frame, text="发送新行", variable=self.send_newline_var)
        self.newline_checkbox.place(relx=0, rely=1, anchor="sw",x=570, y=row_1_y)
        
        # 发送按钮
        self.send_btn = tk.Button(self.main_frame, text="发送", command=self.send_data_btn, state=tk.DISABLED, width=10)
        self.send_btn.place(relx=0, rely=1, anchor="sw",x=650, y=row_1_y+4)

        # Row 2：数据统计、循环间隔（s)标签、循环间隔输入框和循环发送按钮
        self.data_stats = tk.StringVar(value="发送: 000 B | 接收: 000 B")

        row_2_y = -410  # 下方几个空间的y坐标，坐标原点是窗口的左上角
        #数据统计："发送: 0 B | 接收: 0 B"
        self.stats_label = tk.Label(self.main_frame, textvariable=self.data_stats)
        self.stats_label.place(relx=0, rely=1, anchor="sw",x=10, y=row_2_y)
        # 新增：显示日期的静态标签和动态标签
        self.date_label_title = tk.Label(self.main_frame, text="日期:")
        self.date_label_title.place(relx=0, rely=1, anchor="sw",x=180, y=row_2_y)
        self.date_label = tk.Label(self.main_frame, text="", font=("Arial", 10))
        self.date_label.place(relx=0, rely=1, anchor="sw",x=210, y=row_2_y)

        # 新增：显示时间的静态标签和动态标签
        self.time_label_title = tk.Label(self.main_frame, text="时间:")
        self.time_label_title.place(relx=0, rely=1, anchor="sw",x=300, y=row_2_y)
        self.time_label = tk.Label(self.main_frame, text="", font=("Arial", 10))
        self.time_label.place(relx=0, rely=1, anchor="sw",x=330, y=row_2_y)

        # 时间戳label和check box
        self.time_label_title = tk.Label(self.main_frame, text="时间戳")
        self.time_label_title.place(relx=0, rely=1, anchor="sw",x=400, y=row_2_y)
        self.timestamp_onoff = tk.BooleanVar(value=False)
        self.timestamp_check = tk.Checkbutton(self.main_frame, variable=self.timestamp_onoff)
        self.timestamp_check.place(relx=0, rely=1, anchor="sw",x=450, y=row_2_y+2)  

        self.update_time()  # 启动时间更新
        #循环间隔（s)标签
        loop_interval_label = tk.Label(self.main_frame, text="循环间隔 (s):")
        loop_interval_label.place(relx=0, rely=1, anchor="sw",x=500, y=row_2_y)
        #循环间隔输入框
        self.loop_interval_entry = tk.Entry(self.main_frame, width=5)
        self.loop_interval_entry.place(relx=0, rely=1, anchor="sw",x=600, y=row_2_y)
        self.loop_interval_entry.insert(0, "3")
        # 单行循环发送按钮
        self.single_loop_send_btn = tk.Button(self.main_frame, text="单行循环", command=self.toggle_loop_send, state=tk.DISABLED, width=10)
        self.single_loop_send_btn.place(relx=0, rely=1, anchor="sw",x=650, y=row_2_y+4)

        # Row 3: 标签页操作按钮区域（新建、重命名、删除）
        # 给 row_3_frame 设置固定尺寸
        row_3_frame = tk.Frame(self.main_frame, width=730, height=30)
        row_3_frame.place(relx=0, rely=1, anchor="sw",x=10, y=-370)  # 调整 x,y 确保在 main_frame 内可见

        self.new_tab_btn = tk.Button(row_3_frame, text="新建标签页", command=self.create_new_tab)
        self.new_tab_btn.place(x=0, y=-4)
        self.rename_tab_btn = tk.Button(row_3_frame, text="重命名标签页", command=self.rename_current_tab)
        self.rename_tab_btn.place(x=80, y=-4)
        self.delete_tab_btn = tk.Button(row_3_frame, text="删除标签页", command=self.delete_current_tab)
        self.delete_tab_btn.place(x=170, y=-4)
        
        # “清屏”按钮
        self.clear_screen_btn = tk.Button(row_3_frame, text="清屏", command=self.clear_text_area, width=10)
        self.clear_screen_btn.place(x=650-10, y=-4)

        # Terminal label and entry
        self.send_all_terminal_label = tk.Label(row_3_frame, text="等待符号:")
        self.send_all_terminal_label.place(x=350, y=0)
        self.send_all_terminal_entry = tk.Entry(row_3_frame, width=5)
        self.send_all_terminal_entry.place(x=430, y=0)
        self.send_all_terminal_entry.insert(0, "#")
        # Terminal wait over time label and entry
        self.send_all_over_time_label = tk.Label(row_3_frame, text="超时时间 (s):")
        self.send_all_over_time_label.place(x=500-10, y=0)
        self.send_all_over_time_entry = tk.Entry(row_3_frame, width=5)
        self.send_all_over_time_entry.place(x=600-10, y=0)
        self.send_all_over_time_entry.insert(0, "5")

        # Row 4: Notebook区域（标签页区域），创建一个一行两列的区域，让notebook占据第一行一列，第一行第二列固定宽度。
        self.notebook_frame = tk.Frame(self.main_frame)
        self.notebook_frame.place(relx=0, rely=1, anchor="sw",x=10, y=-180, relwidth=1.0, height=186)

        # 设置 notebook_frame 内部的行和列，让第二列默认为0，使得第一列不会被右侧悬浮的控件们挡住
        self.notebook_frame.grid_columnconfigure(0, weight=1)           # 第一列扩展
        self.notebook_frame.grid_columnconfigure(1, weight=0, minsize=150)

        self.notebook = ttk.Notebook(self.notebook_frame)
        # 例如：Notebook 固定位置和大小
        self.notebook.grid(row=0, column=0, columnspan=1, padx=0, pady=0, sticky="nsew")
        self.add_tab("Tab 1")
        self.add_tab("Tab 2")

        # Row 5
        self.row_5_frame = tk.Frame(self.main_frame)
        self.row_5_frame.place(relx=0, rely=1, anchor="sw",x=10, y=-145, relwidth = 1.0, height = 34)
        #self.row_5_frame.grid_columnconfigure(0, weight=1)           # 第一列扩展
        #self.row_5_frame.grid_columnconfigure(1, weight=0, minsize=150)

        # 文字“多行循环发送”
        self.multi_loop_label = tk.Label(self.row_5_frame, text="多行循环")
        self.multi_loop_label.place(relx=0, rely=0, anchor="ne",x=55, y=4)
        # 文字，当前执行循环：x
        self.current_loop_count = tk.StringVar(value="当前循环：0")
        self.current_loop_count_label = tk.Label(self.row_5_frame, textvariable=self.current_loop_count)
        self.current_loop_count_label.place(relx=0, rely=0, anchor="ne",x=300, y=4)
        # “默认间隔时间”文字
        self.default_delay_time_label = tk.Label(self.row_5_frame, text="默认间隔ms:")
        self.default_delay_time_label.place(relx=0, rely=0, anchor="ne",x=410, y=4)
        # 单行文本框,“默认间隔时间”右侧
        self.default_delay_time_entry = tk.Entry(self.row_5_frame, width=5)
        self.default_delay_time_entry.place(relx=0, rely=0, anchor="ne",x=460, y=4)
        self.default_delay_time_entry.insert(0,0)
        # “循环次数”文字
        self.loop_count_label = tk.Label(self.row_5_frame, text="循环次数:")
        self.loop_count_label.place(relx=0, rely=0, anchor="ne",x=530, y=4)
        # 单行文本框,“循环次数”右侧
        self.loop_count_entry = tk.Entry(self.row_5_frame, width=5)
        self.loop_count_entry.place(relx=0, rely=0, anchor="ne",x=580, y=4)
        self.loop_count_entry.insert(0,3)
        # “开始”按钮，放在单行文本框右侧
        self.start_button = tk.Button(self.row_5_frame, width=5, text="开始", command=self.start_multi_loop_send, state=tk.NORMAL)
        self.start_button.place(relx=0, rely=0, anchor="ne",x=640, y=0)
        # “暂停”按钮
        self.pause_button = tk.Button(self.row_5_frame, width=5, text="暂停", command=self.pause_resume_multi_loop_send, state=tk.DISABLED)
        self.pause_button.place(relx=0, rely=0, anchor="ne", x=690, y=0)
        # “停止”按钮
        self.stop_button = tk.Button(self.row_5_frame, width=5, text="停止", command=self.stop_multi_loop_send, state=tk.DISABLED)
        self.stop_button.place(relx=0, rely=0, anchor="ne", x=740, y=0)
         # 暂停控制的 Event，以及标记当前暂停状态
        self.pause_event = threading.Event()
        self.pause_event.set()   # 未暂停状态
        self.paused = False        # 标记是否处于暂停状态
        
        # Row 6
        # 多行文本框
        self.multi_loop_text = scrolledtext.ScrolledText(self.main_frame, width=104, height=10)
        self.multi_loop_text.place(relx=0, rely=1, anchor="sw",x=10, y=-10)

        self.multi_loop_text.insert("1.0", "# Open example scripts to know how to send loop scripts.\n")
        self.multi_loop_text.insert("2.0", "# See details in User Manual.txt\n")
        self.multi_loop_text.insert("3.0", "# Here is an example for repeating reboot radio\n")
        self.multi_loop_text.insert("4.0", "send mr -s 2 -m auapplic\n")
        self.multi_loop_text.insert("5.0", "wait for krypton login: for 60\n")
        self.multi_loop_text.insert("6.0", "wait 1\n")
        self.multi_loop_text.insert("7.0", "send root\n")
        self.multi_loop_text.insert("8.0", "wait for krypton:~# for 10\n")
        self.multi_loop_text.insert("9.0", "wait 1\n")
        self.multi_loop_text.insert("10.0", "send lmclist\n")
        self.multi_loop_text.insert("11.0", "wait for O&M for 100\n")
        self.multi_loop_text.insert("12.0", "wait 1\n")
        self.multi_loop_text.insert("13.0", "send lmclist\n")
        self.multi_loop_text.insert("14.0", "wait 3\n")

        # 右侧功能区，使用 place 定位，固定在右上角，不影响左侧布局
        self.right_frame = tk.Frame(self.main_frame) # , borderwidth=1, relief="raised" 边框可选项 flat raised sunken groove ridge
        self.right_frame.place(relx=1.0, rely=1.0, anchor="se", x=-10, y=-10)

        # 新增：窗口名输入框，默认“TermPlus”
        tk.Label(self.right_frame, text="窗口名:").pack(anchor="w")
        self.window_name_var = tk.StringVar(value="TermPlus")
        self.window_name_entry = tk.Entry(self.right_frame, textvariable=self.window_name_var, width=15)
        self.window_name_entry.pack(fill="x", pady=2)
        self.window_name_entry.bind("<KeyRelease>", self.update_window_title)
        # 启动时设置窗口标题为默认值
        self.root.title(self.window_name_var.get())

		# 右侧区域内部内容依然可以用 pack 或 grid 布局：
        tk.Label(self.right_frame, text="选择串口:").pack(anchor="w")
        self.port_var = tk.StringVar()
        self.port_menu = ttk.Combobox(self.right_frame, textvariable=self.port_var, values=self.get_ports(), state="readonly", width=10)
        self.port_menu.pack(fill="x", pady=2)
        self.refresh_btn = tk.Button(self.right_frame, text="刷新串口", command=self.refresh_ports, width=10)
        self.refresh_btn.pack(fill="x", pady=2)
        tk.Label(self.right_frame, text="波特率:").pack(anchor="w")
        self.baud_var = tk.StringVar(value="115200")
        baudrates = ["300", "1200", "2400", "4800", "9600", "19200", "38400", "57600", "115200", "230400"]
        self.baud_menu = ttk.Combobox(self.right_frame, textvariable=self.baud_var, values=baudrates, width=10)
        self.baud_menu.pack(fill="x", pady=2)
        #串口指示、打开串口/关闭串口
        toggle_frame = tk.Frame(self.right_frame)
        toggle_frame.pack(fill="x", pady=2)

        self.toggle_port_btn = tk.Button(toggle_frame, text="打开串口", command=self.toggle_serial, width=10)
        self.toggle_port_btn.pack(side="left")

        # 将状态画布放在按钮右侧，设置一些水平间距
        self.status_canvas = Canvas(toggle_frame, width=20, height=20, bg="gray", highlightthickness=0)
        self.status_canvas.pack(side="left", padx=5)

        # 在关闭串口按钮下方增加间隔行
        #tk.Label(self.right_frame, text="").pack(pady=5)

        # 第一行：显示文字“自动保存路径”
        tk.Label(self.right_frame, text="自动保存路径").pack(anchor="w")

        # 第二行：一个文本框和右边的方形按键
        auto_save_path_frame = tk.Frame(self.right_frame)
        auto_save_path_frame.pack(fill="x", pady=2)
        self.auto_save_path_entry = tk.Entry(auto_save_path_frame, width=10, justify="right")
        self.auto_save_path_entry.pack(side="left", fill="x", expand=True, pady=2)
        # 按键上的文字为省略号，点击后调用 choose_auto_save_path 方法
        square_button = tk.Button(auto_save_path_frame, text="…", width=2, height=1, command=self.choose_auto_save_path)
        square_button.pack(side="left")

        # 第三行：显示文字“保存文件名”
        tk.Label(self.right_frame, text="保存文件名").pack(anchor="w")

        # 第四行：一个文本框（用于输入文件名）
        default_text = tk.StringVar(value="AutoSave")
        self.file_name_entry = tk.Entry(self.right_frame, width=10, justify="left", textvariable=default_text)
        self.file_name_entry.pack(fill="x", pady=2)

        # 第五行：显示“自动保存状态”和右边的按钮
        auto_save_frame = tk.Frame(self.right_frame)
        auto_save_frame.pack(fill="x", pady=5)
        # 文字“自动保存”
        tk.Label(auto_save_frame, text="自动保存").pack(side="left")
        # 自动保存按键，初始背景为灰色，点击后切换颜色
        self.auto_save_btn = tk.Button(auto_save_frame, text="OFF", width=4, height=1, bg="gray", command=self.toggle_auto_save)
        self.auto_save_btn.pack(side="right", padx=2)
        # “文件最大容量”
        tk.Label(self.right_frame, text="文件最大容量").pack(anchor="w", pady=(2,0))
        # 文本框和右侧显示“MB”
        file_capacity_frame = tk.Frame(self.right_frame)
        file_capacity_frame.pack(fill="x", pady=2)
        self.max_capacity_entry = tk.Entry(file_capacity_frame, width=10, justify="right")
        self.max_capacity_entry.pack(side="left", fill="x", expand=True)
        self.max_capacity_entry.insert(0, "10")
        tk.Label(file_capacity_frame, text="MB").pack(side="left", padx=2)

        # 脚本路径选择框：上方标签、文本框及小三角按钮
        script_path_label = tk.Label(self.right_frame, text="脚本路径")
        script_path_label.pack(anchor="w")
        path_frame = tk.Frame(self.right_frame)
        path_frame.pack(fill="x", pady=2)
        # 文本框宽度与关闭串口按钮一致，文本右对齐
        self.script_path_entry = tk.Entry(path_frame, width=10, justify="right")
        self.script_path_entry.grid(row=0, column=0, sticky="ew")
        path_frame.columnconfigure(0, weight=1)
        # 按钮区域：使用固定尺寸的 Frame 保证按钮宽高相等
        button_size = 5  # 可根据实际情况调整
        button_frame = tk.Frame(path_frame, width=button_size, height=button_size)
        button_frame.grid(row=0, column=1, padx=(1,0))
        button_frame.grid_propagate(False)
        script_path_button = tk.Button(button_frame, text="…", command=self.choose_script_path)
        script_path_button.pack(fill="both", expand=True)
        # 在脚本路径文本框下方增加一个下拉选择框，用于显示脚本路径下所有 .ts 文件
        script_file_label = tk.Label(self.right_frame, text="脚本文件")
        script_file_label.pack(anchor="w", pady=(5,0))
        self.script_file_combo = ttk.Combobox(self.right_frame, values=[], width=10, state="readonly")
        self.script_file_combo.pack(fill="x", pady=2)
        # 新增加载脚本按钮
        self.load_script_button = tk.Button(self.right_frame, text="加载脚本", command=self.load_script)
        self.load_script_button.pack(fill="x", pady=2)
        # 在右侧区域新增保存脚本按钮，放置在加载脚本按钮下方
        self.save_script_button = tk.Button(self.right_frame, text="保存脚本", command=self.save_script)
        self.save_script_button.pack(fill="x", pady=2)
        # 在右侧区域“保存脚本”按钮下方新增“保存为新脚本”按钮
        self.save_as_script_button = tk.Button(self.right_frame, text="另存为", command=self.save_as_new_script)
        self.save_as_script_button.pack(fill="x", pady=2)

        # 新增：空行，用于分隔
        #tk.Label(self.right_frame, text="").pack(pady=5)
        # 新增：标题“多行循环发送”
        tk.Label(self.right_frame, text="多行循环发送").pack(anchor="w")
        # 新增三个按键所在的容器
        # 垂直排列三个按键
        self.open_multi_loop_btn = tk.Button(self.right_frame, text="打开", command=self.open_multi_loop_file, width=15)
        self.open_multi_loop_btn.pack(fill="x", pady=2)
        self.save_multi_loop_btn = tk.Button(self.right_frame, text="保存", command=self.save_multi_loop_file, width=15)
        self.save_multi_loop_btn.pack(fill="x", pady=2)
        self.save_as_multi_loop_btn = tk.Button(self.right_frame, text="另存为", command=self.save_multi_loop_file_as, width=15)
        self.save_as_multi_loop_btn.pack(fill="x", pady=2)

        # 保存 text_area 的原始 grid 布局信息
        self.original_text_area_grid = self.text_area.grid_info()
        
        # 保存 main_frame 中（除 text_area 和最大化按钮外）的其他控件的原始 place 信息
        self.original_layout = {}
        for widget in self.main_frame.winfo_children():
            # 如果不是 text_area 且不是以后要创建的最大化按钮，则保存放置信息
            # 这里假设其他控件均使用 place 布局（text_area 为 grid 布局）
            if widget != self.text_area:
                self.original_layout[widget] = widget.place_info()
        
        # 新增：最大化状态标记
        self.maximized = False
        
        # 新增：创建“最大化/恢复”按钮（例如放在窗口右上角，不影响 text_area）
        self.maximize_button = tk.Button(self.main_frame, text="□", command=self.toggle_maximize, width=2)
        # 这里采用 place 定位（注意此处将一直显示）
        self.maximize_button.place(relx=1, rely=0, anchor="ne", x=-146, y=5)

        self.sent_bytes = 0
        self.received_bytes = 0
        self.serial_conn = None
        self.reading_thread = None
        self.stop_reading = False
        self.loop_sending = False
        self.loop_thread = None

        self.refresh_ports()
        # 初始化完成后，尝试加载之前保存的配置
        self.load_setup()

    # 打开 按键
    def open_multi_loop_file(self):
        """打开一个 .txt 文件，并将其中的内容替换到多行循环发送文本框中，同时记录文件路径"""
        file_path = filedialog.askopenfilename(
            title="选择文本文件",
            filetypes=(("Text Files", "*.txt"), ("All Files", "*.*"))
        )
        if file_path:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                self.multi_loop_text.delete("1.0", tk.END)
                self.multi_loop_text.insert("1.0", content)
                self.multi_loop_txt_filepath = file_path
            except Exception as e:
                messagebox.showerror("错误", f"打开文件失败: {e}")

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
                messagebox.showinfo("提示", "保存成功")
            except Exception as e:
                messagebox.showerror("错误", f"保存文件失败: {e}")

    # 根据窗口名文本框更新窗口名
    def update_window_title(self, event=None):
        new_title = self.window_name_var.get()
        self.root.title(new_title)

    def clear_text_area(self):
        """清除接收文本框中的所有内容，并重置发送和接收的字符计数"""
        self.text_area.delete("1.0", "end")
        self.sent_bytes = 0
        self.received_bytes = 0
        self.update_data_stats()
        # 重置自动保存的位置
        self.last_saved_index = self.text_area.index("end-1c")
        


    # def start_multi_loop_send(self):
    #    # 在新线程中运行自定义脚本，避免阻塞GUI
    #    threading.Thread(target=self.run_custom_script, daemon=True).start()
    def start_multi_loop_send(self):
        if not self.loop_sending:
            self.loop_sending = True
            self.loop_stop = False
            self.pause_event.set()    # 确保初始状态为非暂停
            # 启动后禁用开始按钮，启用停止和暂停按钮
            self.start_button.config(state=tk.DISABLED)
            self.stop_button.config(state=tk.NORMAL)
            self.pause_button.config(state=tk.NORMAL)
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
        """
        预处理多行循环发送文本框中的代码：
          - 行以 "wait for" 开头，转换为 wait_for("xx", yy)
          - 行以 "wait" 开头（但不包含 "wait for"）转换为 wait(x)
          - 行以 "send " 开头，转换为 send_line("xx")
            如果 default_delay_time_entry 中的数字 T > 0，则在该行后追加一行 wait(T/1000)
          - 其它行不做转换
        根据 loop_count_entry 的值决定执行次数，且每次执行更新当前循环计数。
        """
        # 读取默认延时（毫秒）和循环次数
        try:
            T = float(self.default_delay_time_entry.get().strip())
        except:
            T = 0
        try:
            loop_count = int(self.loop_count_entry.get().strip())
        except:
            loop_count = 0  # 0 表示无限循环

        code = self.multi_loop_text.get("1.0", tk.END)
        lines = code.splitlines()
        processed_lines = []
        import re
        #import time
        for i,line in enumerate(lines):
            leading_whitespace = re.match(r'^\s*', line).group()
            stripped = line.strip()
            if not stripped:
                continue
            if stripped.startswith("wait for "):
                m = re.match(r'^wait\s+for\s+(.+?)\s+for\s+(.+)$', stripped)
                if m:
                    target = m.group(1).strip()
                    duration = m.group(2).strip()
                    if not (target.startswith('"') or target.startswith("'")):
                        target = f'"{target}"'
                    new_line = f"{leading_whitespace}wait_for({target}, {duration})"
                    processed_lines.append(new_line)
                else:
                    processed_lines.append(stripped)
            elif stripped.startswith("wait "):
                m = re.match(r'^wait\s+(\d+(\.\d+)?).*$', stripped)
                if m:
                    duration = m.group(1)
                    new_line = f"{leading_whitespace}wait({duration})"
                    processed_lines.append(new_line)
                else:
                    processed_lines.append(stripped)
            elif stripped.startswith("send "):
                arg = stripped[len("send "):].strip()
                if not (arg.startswith('"') or arg.startswith("'")):
                    arg = f'"{arg}"'
                new_line = f"{leading_whitespace}send_line({arg})"
                if T > 0:
                    # 判断下一行是否存在且是否以 "wait" 或 "wait for" 开头（忽略大小写）
                    if i < len(lines) - 1:
                        next_line_stripped = lines[i+1].strip().lower()
                        if not (next_line_stripped.startswith("wait") or next_line_stripped.startswith("wait for")):
                            new_line += f"\n{leading_whitespace}wait({T/1000})"
                    else:
                        new_line += f"\n{leading_whitespace}wait({T/1000})"
                processed_lines.append(new_line)
            else:
                processed_lines.append(line)
        processed_code = "\n".join(processed_lines)
    
        # 定义局部命名空间并注入预定义函数
        local_namespace = {}
        local_namespace["re"] = re
        local_namespace["gui"] = self
        local_namespace["StopLoopException"] = StopLoopException
        local_namespace["messagebox"] = messagebox

        def send_line(text):
            if not (self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open):
                messagebox.showwarning("警告", "串口未打开，循环发送终止")
                raise Exception("串口未打开")
            text_to_send = text + '\n'
            #self.send_data(text_to_send)
            self.serial_conn.send_data(text_to_send)
            self.text_area.insert(tk.END, text_to_send)
            self.text_area.yview(tk.END)
            self.sent_bytes += len(text_to_send.encode())
            self.update_data_stats()


        local_namespace["send_line"] = send_line

        local_namespace["wait"] = time.sleep

        # 修改后的 wait 函数，检查 self.loop_stop 标志，允许立即中断
        def wait(seconds):
            interval = 0.1
            elapsed = 0
            while elapsed < seconds:
                self.pause_event.wait() # 阻塞直到未暂停；如果当前处于暂停状态，此处将阻塞
                if self.loop_stop:
                    raise StopLoopException("循环已停止")
                time.sleep(interval)
                elapsed += interval

        local_namespace["wait"] = wait

        def wait_for(target_string, over_time):
            # 如果字符串为空，则不执行该函数
            if target_string=='':
                messagebox.showwarning("Warning", "wait for must have a target string.")
                return
            # 如果over_time小于等于0，则不执行该函数
            if over_time <= 0:
                messagebox.showwarning("Warning", "Over time must be positive.")
                return
            start_time = time.time()
            last_index = self.text_area.index("end-1c")
            while time.time() - start_time < over_time:
                if self.loop_stop:
                    raise StopLoopException("循环已停止")
                current_index = self.text_area.index("end-1c")
                # 如果发生了删除操作，导致 last_index 大于 current_index，则重置 last_index 为文本起始位置
                if self.text_area.compare(last_index, ">", current_index):
                    last_index = "1.0"
                new_text = self.text_area.get(last_index, current_index)
                if target_string in new_text:
                    return True
                time.sleep(0.1)
                try:
                    last_index = self.text_area.index(f"{current_index} - {len(target_string)}c")
                except Exception:
                    last_index = current_index
            return False

        local_namespace["wait_for"] = wait_for

        iteration = 0
        self.loop_stop = False
        while (loop_count == 0 or iteration < loop_count) and not self.loop_stop:
            iteration += 1
            self.root.after(0, lambda i=iteration: self.current_loop_count.set(f"当前循环：{i}"))
            try:
                exec(processed_code, {}, local_namespace)
            # 当检测到停止标志时，不显示错误窗口，直接退出循环
            except StopLoopException:
                break
            except Exception as e:
                messagebox.showerror("脚本执行错误", str(e))
                break
        self.loop_sending = False
        self.root.after(0, lambda: self.start_button.config(state=tk.NORMAL))
        self.root.after(0, lambda: self.stop_button.config(state=tk.DISABLED))
        self.root.after(0, lambda: self.pause_button.config(state=tk.DISABLED))

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
            with open(full_path, "w", encoding="utf-8") as f:
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
                cell = tk.Button(tab_frame, text="", width=16, height=1, anchor="w", justify="left", relief="groove")
                cell.grid(row=i, column=j, padx=1, pady=1, sticky="nsew")  # 使用 sticky="nsew"
                cell.custom_data = ""  # 存储多行待发送内容
                # 左键点击：发送该按钮保存的多行内容
                cell.config(command=lambda c=cell: self.cell_send(c))
                # 右键绑定：弹出单元格菜单
                cell.bind("<Button-3>", lambda event, c=cell: self.show_cell_menu(event, c))

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
        edit_win = tk.Toplevel(self.root)
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
        single_entry = tk.Entry(edit_win, width=50)
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
        multi_text = scrolledtext.ScrolledText(edit_win)
        #multi_text = tk.Text(edit_win)
        multi_text.grid(row=1, column=0, padx=10, pady=5, sticky="nsew")
        multi_text.insert(tk.END, self.current_cell.custom_data)
        # 创建一个控制区域，将新功能按钮和原有保存按钮放在同一行
        ctrl_frame = tk.Frame(edit_win)
        ctrl_frame.grid(row=2, column=0, padx=10, pady=(5,10), sticky="ew")
        ctrl_frame.columnconfigure(0, weight=1)
        ctrl_frame.columnconfigure(1, weight=1)
        # 左侧区域：发送相关按钮
        left_frame = tk.Frame(ctrl_frame)
        left_frame.grid(row=0, column=0, sticky="w")
        # 右侧区域：保存按钮
        right_frame = tk.Frame(ctrl_frame)
        right_frame.grid(row=0, column=1, sticky="e")
        
        # cell的三个按钮，发送当前行、发送当前行并移动至下一行、发送全部
        def send_current_row():
            index = multi_text.index("insert")
            line_start = f"{index.split('.')[0]}.0"
            line_end = f"{index.split('.')[0]}.end"
            current_line = multi_text.get(line_start, line_end)
            if current_line.strip():
                self.send_via_serial(current_line)
        
        def send_current_row_and_move():
            index = multi_text.index("insert")
            line_start = f"{index.split('.')[0]}.0"
            line_end = f"{index.split('.')[0]}.end"
            current_line = multi_text.get(line_start, line_end).strip()

            if current_line:  # 如果当前行不为空
                if current_line.lower().startswith(("wait", "#")):
                    # 如果行以 "wait"或“#” 开头，则不发送，只移动到下一行
                    pass  
                else:
                    # 发送当前行内容
                    self.send_via_serial(current_line)

            # 计算下一行的行号
            line_num = int(index.split('.')[0])
            total_lines = int(multi_text.index("end-1c").split('.')[0])
            next_line = line_num + 1 if line_num < total_lines else 1

            # 移动光标到下一行
            multi_text.mark_set("insert", f"{next_line}.0")

        # 原有保存按钮，靠右
        def save_action(close_after=False):
            new_text = single_entry.get()
            self.current_cell.config(text=new_text)
            self.current_cell.custom_data = multi_text.get("1.0", tk.END).strip()
            edit_win.title(new_text)  # 将单行文本框中的内容设置为窗口标题
            if close_after:
                edit_win.destroy()
        btn_send_row = tk.Button(left_frame, text="Send", command=send_current_row)
        btn_send_row.pack(side=tk.LEFT, padx=5)
        btn_send_row_move = tk.Button(left_frame, text="Send & Next", command=send_current_row_and_move)
        btn_send_row_move.pack(side=tk.LEFT, padx=5)
        btn_send_all = tk.Button(left_frame, text="Send All", command=lambda: self.send_all(multi_text.get("1.0", tk.END)))
        btn_send_all.pack(side=tk.LEFT, padx=5)
        btn_save = tk.Button(right_frame, text="Save", command=lambda: save_action(False))
        btn_save.pack(side=tk.LEFT, padx=5)
        btn_save_close = tk.Button(right_frame, text="Save & close", command=lambda: save_action(True))
        btn_save_close.pack(side=tk.LEFT, padx=5)
        



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

        # 处理 "wait for <substring> for <seconds>"
        match_wait_for = re.match(r'^wait for (.+) for (\d+)$', command, re.IGNORECASE)
        if match_wait_for:
            wait_str = match_wait_for.group(1)
            wait_time = int(match_wait_for.group(2))

            initial_text = self.text_area.get("1.0", tk.END)
            initial_length = len(initial_text)
            start_time = time.time()

            def check_received():
                current_text = self.text_area.get("1.0", tk.END)
                new_text = current_text[initial_length:]
                if wait_str in new_text or (time.time() - start_time >= wait_time):
                    self._send_next_command(all_lines, index + 1)  # 继续执行下一行
                else:
                    self.text_area.after(100, check_received)  # 100ms 后再次检查

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
        terminal_str = self.send_all_terminal_entry.get().strip()
        over_time_str = self.send_all_over_time_entry.get().strip()
        if terminal_str and over_time_str:
            try:
                timeout = float(over_time_str)
            except Exception:
                timeout = 0
            if timeout > 0:
                # 记录发送命令时文本区域的末尾位置
                initial_text = self.text_area.get("1.0", tk.END)
                initial_length = len(initial_text)
                start_time = time.time()
                def check_terminal():
                    current_text = self.text_area.get("1.0", tk.END)
                    new_text = current_text[initial_length:]
                    if terminal_str in new_text:
                        # 检测到终止符，继续执行下一行命令
                        self._send_next_command(all_lines, index + 1)
                    elif time.time() - start_time >= timeout:
                        # 超时未检测到终止符，在主窗口中显示超时，直接终止函数执行
                        self.text_area.insert(tk.END, "Waiting for terminal_str over time, commands sending ended.", "red")
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

    def send_via_serial(self, data):
        if self.serial_conn:
            # 如果选中时间戳，则插入发送时间
            if self.timestamp_onoff.get():
                timestamp_str = datetime.now().strftime("%H:%M:%S.%f")[:-3]
                self.text_area.insert(tk.END, f"\nSend at    {timestamp_str}\n","blue")
            data_and_return = data + '\n'
            self.serial_conn.send_data(data_and_return)
            self.text_area.insert(tk.END, data_and_return)
            self.text_area.yview(tk.END)
            self.sent_bytes += len(data.encode())
            self.update_data_stats()

    def create_new_tab(self):
        new_title = f"Tab {len([t for t in self.notebook.tabs() if self.notebook.tab(t, 'text') != '']) + 1}"
        self.add_tab(new_title)
        self.notebook.select(self.notebook.tabs()[-1])

    def rename_current_tab(self):
        current = self.notebook.select()
        if current:
            new_name = simpledialog.askstring("重命名", "请输入新名称：", parent=self.root)
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
                self.start_button.config(state=tk.NORMAL)
                self.toggle_port_btn.config(text="关闭串口")
                self.port_menu.config(state="disabled")
                self.baud_menu.config(state="disabled")
                self.refresh_btn.config(state="disabled")
                self.status_canvas.config(bg="green")
                self.text_area.insert(tk.END, f"串口已打开: {port} @ {baudrate}bps\n")
                self.text_area.yview(tk.END)
                self.stop_reading = False
                self.reading_thread = threading.Thread(target=self.read_from_serial, daemon=True)
                self.reading_thread.start()
            else:
                # 串口未打开成功，给出错误提示
                self.text_area.insert(tk.END, f"错误: 无法连接到 {port}\n")
                self.text_area.yview(tk.END)
        except Exception as e:
            self.text_area.insert(tk.END, f"错误: 无法连接到 {port}\n")
            self.text_area.yview(tk.END)   

    def close_serial(self):
        if self.serial_conn:
            self.stop_reading = True
            self.serial_conn.close()
            self.send_btn.config(state=tk.DISABLED) #发送
            self.single_loop_send_btn.config(state=tk.DISABLED) #单行循环
            self.start_button.config(state=tk.DISABLED)
            self.stop_button.config(state=tk.DISABLED)
            self.pause_button.config(state=tk.DISABLED)
            self.toggle_port_btn.config(text="打开串口")
            self.port_menu.config(state="readonly")
            self.baud_menu.config(state="readonly")
            self.refresh_btn.config(state="normal")
            self.status_canvas.config(bg="gray")
            self.text_area.insert(tk.END, "串口已关闭\n")
            self.text_area.yview(tk.END)
            if self.loop_sending:
                self.loop_sending = False
                self.single_loop_send_btn.config(text="单行循环")
    
    # 创建自动保存文件
    def create_auto_save_file(self):
        path = self.auto_save_path_entry.get().strip()
        fname = self.file_name_entry.get().strip()
        if not path or not fname:
            messagebox.showwarning("警告", "未指定路径和文件名")
            return None
        # 构造文件名：保存文件名_YYYY-MM-DD_HH_MM_SS.txt
        filename = f"{fname}_{time.strftime('%Y-%m-%d')}_{time.strftime('%H-%M-%S')}.txt"
        full_path = os.path.join(path, filename)
        try:
            new_file = open(full_path, "w", encoding="utf-8")
            return new_file
        except Exception as e:
            messagebox.showerror("错误", f"无法创建自动保存文件：{e}")
            return None

    def send_data_btn(self, event=None):
        if self.serial_conn:
            data = self.send_entry.get()
            if data:
                # 如果选中时间戳，则先插入发送时间
                if self.timestamp_onoff.get():
                    timestamp_str = datetime.now().strftime("%H:%M:%S.%f")[:-3]
                    self.text_area.insert(tk.END, f"\nSend at    {timestamp_str}\n", "blue")
                # 如果“发送新行”checkbox被勾选
                if self.send_newline_var.get():
                    data_to_send = data + "\n"
                else:
                    data_to_send = data
                self.serial_conn.send_data(data_to_send)
                self.text_area.insert(tk.END, data_to_send)
                self.text_area.yview(tk.END)
                self.sent_bytes += len(data_to_send.encode())
                self.update_data_stats()
                self.add_sent_command(data) # 更新已发送命令

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
                    self.text_area.insert(tk.END, f"\nSend at    {timestamp_str}\n", "blue")
                self.serial_conn.send_data(data_to_send)
                self.text_area.insert(tk.END, f"{data_to_send}")
                self.text_area.yview(tk.END)
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
                            self.text_area.insert(tk.END, f"\nReceive at {timestamp_str}\n", "green")
                            self.allow_new_timestamp = False  # 插入一次时间戳后禁止后续插入
                        received_str = data_bytes.decode(errors='replace')
                        self.text_area.insert(tk.END, received_str)
                        self.text_area.yview(tk.END)  # 自动滚动到末尾
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
        self.data_stats.set(f"发送: {format_bytes(self.sent_bytes)} | 接收: {format_bytes(self.received_bytes)}")

    def new_port(self):
        self.root.update_idletasks()
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
            if self.input_buffer.strip():
                # Send buffered input followed by a newline
                data_to_send = self.input_buffer + "\n"
                if self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open:
                    self.serial_conn.send_data(data_to_send)
                    # 如果选中时间戳，则先插入接收时间
                    if self.timestamp_onoff.get():
                        timestamp_str = datetime.now().strftime("%H:%M:%S.%f")[:-3]
                        self.text_area.insert(tk.END, f"\nSend at    {timestamp_str}\n", "blue")
                    self.sent_bytes += len(data_to_send.encode())
                    self.add_sent_command(self.input_buffer) # 更新已发送命令
                    self.sent_commands_number = -1  # 重置上下键的命令索引
            else:
               # 若 input buffer 为空，则仅发送回车字符（前提是串口已打开）
                if self.serial_conn and self.serial_conn.ser and self.serial_conn.ser.is_open:
                    self.serial_conn.send_data("\n")
                    self.sent_bytes += 1
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
            #return "break" # 不禁止backspace本身在主窗口中的删除操作

        # 处理左箭头：向左移动光标
        elif event.keysym == "Left":
            if self.input_buffer_cursor > 0:
                self.input_buffer_cursor -= 1
            #return "break" # 不禁止光标在窗口中的移动

        # 处理右箭头：向右移动光标
        elif event.keysym == "Right":
            if self.input_buffer_cursor < len(self.input_buffer):
                self.input_buffer_cursor += 1
            #return "break" # 不禁止光标在窗口中的移动
        
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
        else:
            # 关闭自动保存
            self.auto_save_stop = True
            if self.auto_save_file:
                self.auto_save_file.close()
                self.auto_save_file = None
            self.auto_save_btn.config(text="OFF", bg="gray")

    def auto_save_and_auto_delete(self):
        """
        每30秒，如果自动保存标志位打开，则执行自动保存操作。
        """
        # 执行自动保存操作（如果标志位打开）
        if not self.auto_save_stop:
            #获取当前文本框末尾的索引
            current_index = self.text_area.index("end-1c")
            # 获取从上次保存到当前的新内容
            new_text = self.text_area.get(self.last_saved_index, current_index)
            if new_text and self.auto_save_file:
                try:
                    self.auto_save_file.write(new_text)
                    self.auto_save_file.flush()
                    self.last_saved_index = current_index  # 更新最后保存位置

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
                        # 重置 last_saved_index 为当前末尾
                        self.last_saved_index = self.text_area.index("end-1c")
                except Exception as e:
                    print("Autosave error:", e)
        """
        检查 text_area 中字符数量，如果超过100000，则仅保留后一半的行的内容
        """
        content = self.text_area.get("1.0", "end-1c")
        if len(content) > 100000:
            # 获取当前总行数和 text_area 的显示行数（高度）
            total_lines = int(self.text_area.index("end-1c").split('.')[0])
            # 如果总行数大于2，则仅保留后一半的行
            if total_lines > 2:
                start_line = int(total_lines/2) + 1
                # 删除从第一行到 start_line 行的起始部分
                self.text_area.delete("1.0", f"{start_line}.0")
                # 更新文本框的内容后，重新记录最后保存的位置
                self.last_saved_index = self.text_area.index("end-1c")
        # 10秒后再次检测
        self.text_area.after(10000, self.auto_save_and_auto_delete)
    
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
            
            # 脚本路径
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
            
            # 脚本文件下拉框
            if 'script_file' in setup:
                ts_files = list(self.script_file_combo['values'])  # 先将可选值转为列表
                if setup['script_file'] in ts_files:
                    idx = ts_files.index(setup['script_file'])
                    self.script_file_combo.current(idx)
                    self.load_script()
            
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

root = tk.Tk()
app = SerialGUI(root)
root.mainloop()
