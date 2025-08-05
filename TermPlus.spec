# -*- mode: python ; coding: utf-8 -*-
from datetime import datetime

# 写入打包日期到 version_info.py
with open("version_info.py", "w") as f:
    f.write(f'VERSION = "Version {datetime.now().strftime("%Y%m%d")}"\n')

a = Analysis(
    ['TermPlus.py'],
    pathex=[],
    binaries=[],
    datas=[('version_info.py', '.')],
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
    a.binaries,
    a.datas,
    [],
    name='TermPlus',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
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
