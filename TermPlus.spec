# -*- mode: python ; coding: utf-8 -*-
from datetime import datetime
import os
import shutil

# 获取当前日期字符串，例如 20251222
today = datetime.now()
version_suffix = f"v{today.strftime('%y%m%d')}"
# 定义动态文件名
exe_name = f'TermPlus_{version_suffix}'

# 3. 【核心修改】不写文件，直接把日期塞进环境变量，传给 PyInstaller
os.environ["TERMPLUS_BUILD_VERSION"] = f"Version {today.strftime('%y%m%d')}"

a = Analysis(
    ['TermPlus.py'],
    pathex=[],
    binaries=[],
    datas=[],
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
    runtime_hooks=[],
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