# TermPlus
Serial port GUI tool on Windows, key features: button send, loop send, customized multi-line loop send, smart wait function.

本项目采用 [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/) 许可。

本项目作者为吴宪，项目名为TermPlus，是用于Windows操作系统下的串口通讯软件。

该软件可以直接在窗口中输入内容实现串口通信，也可以在单行发送框中发送内容。

该软件实现了对通过按键发送保存好的命令，对调试过程中大量命令省去了记忆和打字的时间，按键可以保存成“.ts”文件，实现保存和修改。

该软件实现了串口命令的定时发送、循环发送、变量发送，实现了识别串口接收内容中的指定内容或指定格式内容的功能。

该软件提供了python代码的运行空间，可以不依赖python的安装即可运行python的代码。对于未安装的依赖库，需要在源代码中添加后重新打包才能使用。

直接下载exe的压缩包解压后即可使用，也可以用源代码自行压制可执行程序。

使用说明参见User Manual.txt，版本更新内容参见Change Note.txt，多行循环发送脚本示例参见Example Scripts。

如果遇到使用问题可以发送邮件至dakongwuxian@gmail.com，会尽量及时修复bug。

长时间运行不建议使用同一个exe直接开启2个或多个GUI窗口，容易崩溃。使用2个文件夹中的不同的exe，更加稳定。单独运行很稳定，已经经过了数月的测试。

本人不对此软件的可靠性负责，用于商业项目时可能出现未知的数据风险，请自行负责。

本软件可用于个人和学习用途，如果用于商业用途需要作者授权。

![GUI screen shot 20250923](https://github.com/user-attachments/assets/44fe7714-cc6e-44a9-997b-a45dd8ecab73)
