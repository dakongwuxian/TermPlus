<tab {burn load}>
<button {0} {root}>
<data>
root
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {all scripts in one}>
<data>
配置某个io的pinmux（#符号下）
gpio pinmux kryptonGpio:0 1 16 out gpio

设置改io输出高和低（#符号下）
gpio write kryptonGpio:0 1 16 1
gpio write kryptonGpio:0 1 16 0



读取LTU的锁定状态
tumstat -d tum0
sspi 8:0 24 8138
sspi 8:0 24 81b8
sspi 8:0 24 80e2
响应示例
oot@krypton:~# tumstat -d tum0
 TUM mode: cpri
 domain:rbs:   status: locked
domain:eqm:   status: locked
 Sysref status:
name:all              id:00  status:disabled, modes:continuos
name:sfc              id:01  status:disabled, modes:continuos
GPIOs:
name:eec              pin:LTU_LD_1         value:1
name:rec              pin:LTU_LD_2         value:1
root@krypton:~# sspi 8:0 24 8138
00000A
root@krypton:~# sspi 8:0 24 81b8
00000A
root@krypton:~# sspi 8:0 24 80e2
000007


sfp相关情况的命令

auboot和app合体的包，从auboot切换为app的命令
mr -s 2 -m auapplic


如何进入HWTM
软件重启，进入safe mode
mr -s 2 -m safe

进入HWTM之后需要输入以下命令
systemctl start hwtm.target
sleep 1
testmgr.bash
sleep 3
testbox switch Sysref on
testbox hw_init all -f

工厂使用HWTM的命令为

testbox switch Sysref on
 testbox jesd_init krypton0 DAC
testbox jesd_init krypton0 ADC
testbox hw_init AMC7834_AD7293:pacc0
 testbox hw_init AMC7834_AD7293:pacc1 
testbox hw_init AMC7834_AD7293:pacc2
 testbox hw_init AMC7834_AD7293:pacc3
testbox hw_init krypton:cpu
 testbox hw_init krypton:emca
testbox hw_init krypton:BC7NM_SERIAL_IF
 testbox hw_init krypton:BC7NM_FH
testbox hw_init krypton:BC7NM_AI
testbox hw_init krypton:BC7NM_ADC_DAC
testbox hw_init LPS22DF:pressure
testbox hw_init dcdc:dcdc0
testbox hw_init dcdc:dcdc0
testbox hw_init ina226:pwrmeter
 testbox hw_init palau:palau0
testbox version
testbox indicator init

在HWTM下读取温度的命令
testbox sensor_read dfe0:DFE_PVTSENSOR_0 
testbox sensor_read dfe0:DFE_PVTSENSOR_1 
testbox sensor_read cpm:MONGOOSE 
testbox sfp_temp cpm:sfp0  
testbox sfp_temp cpm:sfp1  
testbox sfp_temp cpm:sfp2  
testbox sfp_temp cpm:sfp3

在HWTM下，通过 testbox what的指令去list目前这个版本所有可以用的command
然后再用testbox sensor_read help的指令去学习这个command怎么用

读取电压、电流的命令
ch r all

类似下面

[10:29 AM] Yong Guo G
ch r all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {cofig COM board IP}>
<data>
#10.166.147.47

ifconfig eth0 10.166.147.42 netmask 255.255.255.128 broadcast 10.166.147.127
route add default gw 10.166.147.1
ifconfig eth0
ping -c 4 10.166.147.42
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {Power Shell - send dc load to board}>
<data>
open power shell
#scp fileName.dc root@IPaddress:/tmp/slotd_debug_3.fifo
power shell send scp K1__CM_dev_app-CXP2021113_1-P21B461A_20240702-041518.dc root@10.166.147.42:/tmp/slotd_debug_3.fifo
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {read current under $}>
<data>
cs r
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {linksup -d -p}>
<data>
linksup -d -p
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {icolish}>
<data>
icolish
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {reboot to slot3 in safe mode}>
<data>
mr -s 3 -m safe
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {read voltage under $}>
<data>
vs r
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {exit}>
<data>
exit
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {reboot to app in slot 3}>
<data>
mr -s 3 -m AUAPPLIC
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {mamastart}>
<data>
mamastart
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {reboot to slot2 in safe mode}>
<data>
mr -s 2 -m safe
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {reboot to auboot in slot 1}>
<data>
mr -s 1 -m auboot
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {lmclist}>
<data>
lmclist
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {reboot to app in slot 2}>
<data>
mr -s 2 -m AUAPPLIC
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {reboot to auapplic in slot 1}>
<data>
mr -s 1 -m auapplic
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {power supply example}>
<button {0} {N5767A power control example}>
<data>
visa_init(USB0::0x0957::0xA407::US19E8463P::0::INSTR)
visa_query(OUTP?)
visa_write(OUTP OFF)
visa_write(OUTP ON)
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {power shell example}>
<button {0} {Power Shell Example}>
<data>
ifconfig eth0 10.166.147.42 netmask 255.255.255.128 broadcast 10.166.147.127
route add default gw 10.166.147.1
ifconfig eth0
ping -c 4 10.166.147.42
open power shell
power shell send ping 10.166.147.42
power shell send cd C:\4485\4485_R1C_JESD_DL_lane4_CRC_issue_debug\krypton_bin\aapl_3.2.7
# 如果power shell通过cd命令要访问的路径有空格，则需要在路径的头尾加上单引号
power shell send scp aapl_krypton0 root@10.166.147.42:/usr/bin
cd ..
ls /usr/bin/aapl_krypton0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

