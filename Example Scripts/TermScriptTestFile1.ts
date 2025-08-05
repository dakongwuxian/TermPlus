<tab {start up}>
<button {0} {1.hal ltu init }>
<data>
db reparse
hal ltu init

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {6.srv devinit}>
<data>
srv devinit
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {11.ip show}>
<data>
ip show
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {1.IRU Setup branch A/B}>
<data>
db add /7xx/id_ruType_8.2.x/BandIII.E/supportedRat -f -t char "T N L"
xenon:1 write SYNC_PROD_DLY_1 1228759

#=====NR100Mhz Single Xenon====
db write /7xx/id_ruType_8.2.x/dl/rf_bA/fabToFuDelay 0x177DA
db write /7xx/id_ruType_8.2.x/dl/rf_bB/fabToFuDelay 0x177DA
#db write /7xx/id_ruType_8.2.x/dl/rf_bC/fabToFuDelay 0x177DA
#db write /7xx/id_ruType_8.2.x/dl/rf_bD/fabToFuDelay 0x177DA


db write /7xx/id_ruType_8.2.x/ul/rf_bA/rfPortToSmgCpriI2SubDelay 0x00015A5E
db write /7xx/id_ruType_8.2.x/ul/rf_bB/rfPortToSmgCpriI2SubDelay 0x00015A5E
#db write /7xx/id_ruType_8.2.x/ul/rf_bC/rfPortToSmgCpriI2SubDelay 0x00015A5E
#db write /7xx/id_ruType_8.2.x/ul/rf_bD/rfPortToSmgCpriI2SubDelay 0x00015A5E


db setBand BandIII.E
#db setBand Band40.A


rd start 0
# ====DL Mac Address==
rd macAddress 0 34:6e:9d:6e:2e:f8

digitalIruFpga w DPE_0_DL_DST_0 0x9d6e2ef8
digitalIruFpga w DPE_0_DL_DST_1 0x0000346e

ptd rdModel sampleRate set 122880
ptd rdModel branchBandCap set Branch-A BandIII.E FDD
ptd rdModel branchBandCap set Branch-B BandIII.E FDD
#ptd rdModel branchBandCap set Branch-C Band40.A TDD
#ptd rdModel branchBandCap set Branch-D Band40.A TDD


ptd rdModel branchFreqCap set TX Branch-A 1805000 1830000 10 200000
ptd rdModel branchFreqCap set TX Branch-B 1805000 1805000 10 200000
#ptd rdModel branchFreqCap set TX Branch-C 2320000 2370000 10 200000
#ptd rdModel branchFreqCap set TX Branch-D 2320000 2370000 10 200000

rd finalize
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {1.IRU Setup_E/F/G/H}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"

xenon:0 write SYNC_PROD_DLY_0 1228759
xenon:0 write SYNC_PROD_DLY_1 1228759

#=====NR100Mhz Single Xenon====
db write /7xx/id_ruType_8.2.x/dl/rf_bE/fabToFuDelay 0x177DA
db write /7xx/id_ruType_8.2.x/dl/rf_bF/fabToFuDelay 0x177DA
db write /7xx/id_ruType_8.2.x/dl/rf_bG/fabToFuDelay 0x177DA
db write /7xx/id_ruType_8.2.x/dl/rf_bH/fabToFuDelay 0x177DA


db write /7xx/id_ruType_8.2.x/ul/rf_bE/rfPortToSmgCpriI2SubDelay 0x00015A5E
db write /7xx/id_ruType_8.2.x/ul/rf_bF/rfPortToSmgCpriI2SubDelay 0x00015A5E
db write /7xx/id_ruType_8.2.x/ul/rf_bG/rfPortToSmgCpriI2SubDelay 0x00015A5E

db setBand Band41.K 



rd start 0
#==Same as DPE_0_DL_DST_0/1===

rd macAddress 0 34:6e:9d:6e:2e:f8
digitalIruFpga w DPE_0_DL_DST_0 0x9d6e2ef8
digitalIruFpga w DPE_0_DL_DST_1 0x0000346e

ptd rdModel sampleRate set 122880

ptd rdModel branchBandCap set Branch-E Band41.K TDD
ptd rdModel branchBandCap set Branch-F Band41.K TDD
ptd rdModel branchBandCap set Branch-G Band41.K TDD
ptd rdModel branchBandCap set Branch-H Band41.K TDD

ptd rdModel branchFreqCap set TX Branch-E 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-F 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-G 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-H 2515000 2675000 10 200000

rd finalize
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {1.IRU Setup branch CD}>
<data>
db add /7xx/id_ruType_8.2.x/Band40.A/supportedRat -f -t char "T N L"
xenon:1 write SYNC_PROD_DLY_1 1228759

#=====NR100Mhz Single Xenon====

db write /7xx/id_ruType_8.2.x/dl/rf_bC/fabToFuDelay 0x177DA
db write /7xx/id_ruType_8.2.x/dl/rf_bD/fabToFuDelay 0x177DA



db write /7xx/id_ruType_8.2.x/ul/rf_bC/rfPortToSmgCpriI2SubDelay 0x00015A5E
db write /7xx/id_ruType_8.2.x/ul/rf_bD/rfPortToSmgCpriI2SubDelay 0x00015A5E


db setBand Band40.A


rd start 0
# ====DL Mac Address==
rd macAddress 0 34:6e:9d:6e:2e:f8

digitalIruFpga w DPE_0_DL_DST_0 0x9d6e2ef8
digitalIruFpga w DPE_0_DL_DST_1 0x0000346e

ptd rdModel sampleRate set 122880

ptd rdModel branchBandCap set Branch-C Band40.A TDD
ptd rdModel branchBandCap set Branch-D Band40.A TDD


ptd rdModel branchFreqCap set TX Branch-C 2320000 2370000 10 200000
ptd rdModel branchFreqCap set TX Branch-D 2320000 2370000 10 200000

rd finalize
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {2.ethphy config_registers}>
<data>
ethphy config_registers
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {7.srv pacc init}>
<data>
srv pacc init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {12.ethphy link_info}>
<data>
ethphy link_info
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {2.xenon delay(open and send)}>
<data>
#branch F 100Mhz x#dual xenon ===
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1219 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0x1819

xenon:0 r DL_0_FB_PRE_1_0_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_1_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_2_FBUF_STAT 
xenon:0 r DL_0_FB_PRE_1_3_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_4_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_5_FBUF_STAT 

#BRANCH F 60M 
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0x819 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0xD19

#BRANCH F 160M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0x819 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0x1419
xenon:0 w DL_0_FB_PRE_1_3_FBUF_CFG 0x1819
xenon:0 w DL_0_FB_PRE_1_4_FBUF_CFG 0x1819
xenon:0 w DL_0_FB_PRE_1_5_FBUF_CFG 0x1819

#branch F 50M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1119

#branch F 25M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB11 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1111


xenon:0 w DL_0_FB_PRE_1_0_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_1_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_2_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_3_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_4_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_5_SPC_CFG 0x1

xenon:0 w DL_0_FB_PRE_1_0_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_1_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_2_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_3_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_4_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_5_SPC_CFG 0x0



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {2.xenon delay B41K all(open and send)}>
<data>
#branch F 100Mhz x#dual xenon ===
xenon:0 w DL_0_FB_PRE_0_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_0_1_FBUF_CFG 0x1219 
xenon:0 w DL_0_FB_PRE_0_2_FBUF_CFG 0x1819

xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1219 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0x1819

xenon:0 w DL_1_FB_PRE_0_0_FBUF_CFG 0x2A19 
xenon:0 w DL_1_FB_PRE_0_1_FBUF_CFG 0x3119 
xenon:0 w DL_1_FB_PRE_0_2_FBUF_CFG 0x3719

xenon:0 w DL_1_FB_PRE_1_0_FBUF_CFG 0x2A19 
xenon:0 w DL_1_FB_PRE_1_1_FBUF_CFG 0x3119 
xenon:0 w DL_1_FB_PRE_1_2_FBUF_CFG 0x3719



xenon:0 r DL_0_FB_PRE_1_0_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_1_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_2_FBUF_STAT 
xenon:0 r DL_0_FB_PRE_1_3_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_4_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_5_FBUF_STAT 

#BRANCH F 60M 
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0x819 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0xD19

#BRANCH F 160M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0x819 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0x1419
xenon:0 w DL_0_FB_PRE_1_3_FBUF_CFG 0x1819
xenon:0 w DL_0_FB_PRE_1_4_FBUF_CFG 0x1819
xenon:0 w DL_0_FB_PRE_1_5_FBUF_CFG 0x1819

#branch F 50M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1119

#branch F 25M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB11 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1111


xenon:0 w DL_0_FB_PRE_1_0_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_1_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_2_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_3_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_4_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_5_SPC_CFG 0x1

xenon:0 w DL_0_FB_PRE_1_0_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_1_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_2_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_3_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_4_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_5_SPC_CFG 0x0



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {2.xenon delay B41K all(open and send)}>
<data>
#branch F 100Mhz x#dual xenon ===
xenon:0 w DL_0_FB_PRE_0_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_0_1_FBUF_CFG 0x1219 
xenon:0 w DL_0_FB_PRE_0_2_FBUF_CFG 0x1819

xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1219 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0x1819

xenon:0 w DL_1_FB_PRE_0_0_FBUF_CFG 0x2A19 
xenon:0 w DL_1_FB_PRE_0_1_FBUF_CFG 0x3119 
xenon:0 w DL_1_FB_PRE_0_2_FBUF_CFG 0x3719

xenon:0 w DL_1_FB_PRE_1_0_FBUF_CFG 0x2A19 
xenon:0 w DL_1_FB_PRE_1_1_FBUF_CFG 0x3119 
xenon:0 w DL_1_FB_PRE_1_2_FBUF_CFG 0x3719



xenon:0 r DL_0_FB_PRE_1_0_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_1_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_2_FBUF_STAT 
xenon:0 r DL_0_FB_PRE_1_3_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_4_FBUF_STAT  
xenon:0 r DL_0_FB_PRE_1_5_FBUF_STAT 

#BRANCH F 60M 
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0x819 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0xD19

#BRANCH F 160M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0x819 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_2_FBUF_CFG 0x1419
xenon:0 w DL_0_FB_PRE_1_3_FBUF_CFG 0x1819
xenon:0 w DL_0_FB_PRE_1_4_FBUF_CFG 0x1819
xenon:0 w DL_0_FB_PRE_1_5_FBUF_CFG 0x1819

#branch F 50M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB19 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1119

#branch F 25M
xenon:0 w DL_0_FB_PRE_1_0_FBUF_CFG 0xB11 
xenon:0 w DL_0_FB_PRE_1_1_FBUF_CFG 0x1111


xenon:0 w DL_0_FB_PRE_1_0_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_1_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_2_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_3_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_4_SPC_CFG 0x1
xenon:0 w DL_0_FB_PRE_1_5_SPC_CFG 0x1

xenon:0 w DL_0_FB_PRE_1_0_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_1_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_2_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_3_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_4_SPC_CFG 0x0
xenon:0 w DL_0_FB_PRE_1_5_SPC_CFG 0x0



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {3.ethphy db_init }>
<data>
ethphy db_init 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {8.srv ethernet init}>
<data>
srv ethernet init 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {RAT set(only once for IRU)}>
<data>
db flash set /77x/Band41.K/supportedRat -t char "N T L"
db flash set /77x/Band40.A/supportedRat -t char "T L"
db flash set /77x/BandIII.E/supportedRat -t char "T L"
db list /77x/Band41.K/supportedRat
db list /77x/Band40.A/supportedRat
db list /77x/BandIII.E/supportedRat
db list *Band41.K* used
db list *Band40.A* used
db list *BandIII.E* used


db flash set /7xx/id_ruType_8.2.x/Band41.K/supportedRat -t char "N T L"
db list /7xx/id_ruType_8.2.x/Band41.K/supportedRat
db list /7xx/id_ruType_8.2.x/Band78.L/supportedRat 


db flash set /7xx/id_ruType_8.2.x/Band40.A/supportedRat -t char "T L"
db list /7xx/id_ruType_8.2.x/Band40.A/supportedRat
db list /7xx/id_ruType_8.2.x/Band78.L/supportedRat

eqpm rdctrl xenonMode show 
eqpm rdctrl xenonNumber show

eqpm rdctrl xenonMode set 8
eqpm rdctrl xenonNumber set 2


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {IRU 204B Mapping}>
<data>
digitalIruFpga r JRC_01_DL_CFG 
digitalIruFpga r JRC_23_DL_CFG 
digitalIruFpga r JRC_45_DL_CFG 
digitalIruFpga r JRC_67_DL_CFG 
 #===dual xenon===

#digitalIruFpga w 0x50020 0x00000004
#digitalIruFpga w 0x50040 0x54000004
#digitalIruFpga w 0x50080 0x18000004
#digitalIruFpga w 0x500c0 0xdc000004 

digitalIruFpga w JRC_01_DL_CFG 0x98000000
digitalIruFpga w JRC_23_DL_CFG 0xDC000000
digitalIruFpga w JRC_45_DL_CFG 0x10000004
digitalIruFpga w JRC_67_DL_CFG 0x54000000 


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {IRU 204B Mapping}>
<data>
digitalIruFpga r JRC_01_DL_CFG 
digitalIruFpga r JRC_23_DL_CFG 
digitalIruFpga r JRC_45_DL_CFG 
digitalIruFpga r JRC_67_DL_CFG 
 #===dual xenon===

#digitalIruFpga w 0x50020 0x00000004
#digitalIruFpga w 0x50040 0x54000004
#digitalIruFpga w 0x50080 0x18000004
#digitalIruFpga w 0x500c0 0xdc000004 

digitalIruFpga w JRC_01_DL_CFG 0x98000000
digitalIruFpga w JRC_23_DL_CFG 0xDC000000
digitalIruFpga w JRC_45_DL_CFG 0x10000004
digitalIruFpga w JRC_67_DL_CFG 0x54000000 


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {IRU 204B Mapping}>
<data>
digitalIruFpga r JRC_01_DL_CFG 
digitalIruFpga r JRC_23_DL_CFG 
digitalIruFpga r JRC_45_DL_CFG 
digitalIruFpga r JRC_67_DL_CFG 
 #===dual xenon===

#digitalIruFpga w 0x50020 0x00000004
#digitalIruFpga w 0x50040 0x54000004
#digitalIruFpga w 0x50080 0x18000004
#digitalIruFpga w 0x500c0 0xdc000004 

digitalIruFpga w JRC_01_DL_CFG 0x98000000
digitalIruFpga w JRC_23_DL_CFG 0xDC000000
digitalIruFpga w JRC_45_DL_CFG 0x10000004
digitalIruFpga w JRC_67_DL_CFG 0x54000000 


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {4.hal fpga program}>
<data>
hal fpga program
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {9.srv pwrmeas init}>
<data>
srv pwrmeas init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {xenon:0 txpwr}>
<data>
xenon txpwr xenon:0
xenon txpwr xenon:1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {4.DOT branch A/B Carrier}>
<data>
#===ethernet config and mac address===
hal fpga write 0x2020 0x30000
hal fpga writed 0x106C 0x0303
hal fpga writed 0x146C 0x0303
hal fpga writed 0x186C 0x0303
hal fpga writed 0x1C6C 0x0303


#====UL Mac address===
#hal fpga write 0x2034 0x07262473
#hal fpga write 0x2038 0x0000F0B1

#===DL Mac address====
hal fpga write 0x202c 0x9d6e2ef8
hal fpga write 0x2030 0x0000346e

#=====pacc set init vaule for all branches ==
srv pacc setdac branch_a main 0x6e0
srv pacc setdac branch_a peak 0x580

srv pacc setdac branch_b main 0x6e0
srv pacc setdac branch_b peak 0x580

srv pacc setdac branch_c main 0x6e0
srv pacc setdac branch_c peak 0x580

srv pacc setdac branch_d main 0x6e0
srv pacc setdac branch_d peak 0x580

srv pacc setdac branch_e main 0x6e0
srv pacc setdac branch_e peak 0x580

srv pacc setdac branch_f main 0x6e0
srv pacc setdac branch_f peak 0x580

srv pacc setdac branch_g main 0x6e0
srv pacc setdac branch_g peak 0x580

srv pacc setdac branch_h main 0x6e0
srv pacc setdac branch_h peak 0x580
#=====DOT Carrier set===
srv datalink init
#srv datalink set dl branch_a 0 4 245760 8e2_1
srv datapath mute ul branch_h
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h

srv datapath unmute dl branch_a
srv datapath unmute dl branch_b
srv datapath unmute dl branch_c
srv datapath unmute dl branch_d
srv datapath unmute dl branch_f
srv datapath unmute dl branch_e
srv datapath unmute dl branch_g
srv datapath unmute dl branch_h



srv duplex tdd_en set disable trx1
#srv duplex tdd_en set disable trx2
#srv duplex tdd_en set disable trx3
#srv duplex tdd_en set disable trx4

#=====Madura setting for branch F,need modify===
% carry setup flow

#1. TX enable
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask> -1/2/4/8 for each. 15 for all
madura func maduraFuncRxTxEnableSet 0 15 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 0

#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 0 1
madura func maduraFuncTxLoSourceGet 0 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 0 0

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 0 0 1817500000


#3. init calibration
#QEC Init Cal
madura func maduraFuncTrackingCalsEnableSet 0 0x1000 0
# Tx to orx mapping
madura func maduraFuncTxToOrxMappingSet 0 0x10 1
madura func maduraFuncTxToOrxMappingSet 0 0x20 2
#ETX Pathdelay
madura func maduraFuncInitCalsRun 0 0x200000 1 0
madura func maduraFuncInitCalsRun 0 0x200000 2 0
#EXT LOL
madura func maduraFuncInitCalsRun 0 0x800 1 0
madura func maduraFuncInitCalsRun 0 0x800 2 0
#DPD Model
madura func maduraFuncDpdModelConfigSet 0 1 95
madura func maduraFuncDpdModelConfigSet 0 2 95
# DPD tracking config
madura func maduraFuncDpdTrackingConfigSet 0 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1 0 0
# CLGC tracking Config
#madura func maduraFuncClgcConfigSet <trx_id> <clgcConfigArraySize> <txChannelMask> <clgcEnableGainControl> <clgcMeasurementBatchTime_us> <clgcMaxSampleBatchesPerClgcRun> <clgcExpectedLoopGain_dB> <clgcExpectedLoopGainRipple_dB> <clgcTxQualifyingThreshold_dBFS> <clgcOrxQualifyingThreshold_dBFS> <clgcOrxMinimumSnr_dB> <clgcMaxGainAdjustmentStepSize_dB> <clgcDampingParam> <clgcMinTxAttenAdjust_dB> <clgcMaxTxAttenAdjust_dB>

#madura func maduraFuncClgcConfigSet 0 1 0x0F 1 2 512 -3 0.05 -48 -48 0 0.5 0.1 0.05 30 
madura func maduraFuncClgcConfigSet 0 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30 

#4 PA on####
hal fpga write 0x102c 0x800030ff
hal fpga write 0x142c 0x800030ff
hal fpga write 0x182c 0x800030ff
hal fpga write 0x1c2c 0x800030ff 
#!!!!! open the DC power supply!!!!!!

#5 enable TX QEC, CLGC, LOL tracking 
madura func maduraFuncTrackingCalsEnableSet 0 0x101100 1
madura func maduraFuncTrackingCalsEnableSet 0 0x202200 1

madura func maduraFuncDpdStatusGet 0 1
madura func maduraFuncDpdStatusGet 0 2

#6 DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 0 0x10000 1
madura func maduraFuncTrackingCalsEnableSet 0 0x20000 1
madura func maduraFuncDpdStatusGet 0 1
madura func maduraFuncDpdStatusGet 0 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {4.DOT branch E/F/G/H Carrier}>
<data>
#===ethernet config and mac address===
hal fpga write 0x2020 0x30000
hal fpga writed 0x106C 0x0303
hal fpga writed 0x146C 0x0303
hal fpga writed 0x186C 0x0303
hal fpga writed 0x1C6C 0x0303


#====UL Mac address===
#hal fpga write 0x2034 0x07262473
#hal fpga write 0x2038 0x0000F0B1

#===DL Mac address====
hal fpga write 0x202c 0x9d6e2ef8
hal fpga write 0x2030 0x0000346e

#=====pacc set init vaule for all branches ==
srv pacc setdac branch_a main 0x6e0
srv pacc setdac branch_a peak 0x580

srv pacc setdac branch_b main 0x6e0
srv pacc setdac branch_b peak 0x580

srv pacc setdac branch_c main 0x6e0
srv pacc setdac branch_c peak 0x580

srv pacc setdac branch_d main 0x6e0
srv pacc setdac branch_d peak 0x580

srv pacc setdac branch_e main 0x6e0
srv pacc setdac branch_e peak 0x580

srv pacc setdac branch_f main 0x6e0
srv pacc setdac branch_f peak 0x580

srv pacc setdac branch_g main 0x6e0
srv pacc setdac branch_g peak 0x580

srv pacc setdac branch_h main 0x6e0
srv pacc setdac branch_h peak 0x580
#=====DOT Carrier set===
srv datalink init
#srv datalink set dl branch_a 0 4 245760 8e2_1
srv datapath mute ul branch_h
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h

srv datapath unmute dl branch_a
srv datapath unmute dl branch_b
srv datapath unmute dl branch_c
srv datapath unmute dl branch_d
srv datapath unmute dl branch_f
srv datapath unmute dl branch_e
srv datapath unmute dl branch_g
srv datapath unmute dl branch_h



#srv duplex tdd_en set disable trx1
#srv duplex tdd_en set disable trx2
srv duplex tdd_en set disable trx3
srv duplex tdd_en set disable trx4

#=====Madura setting for branch F,need modify===
% carry setup flow

#1. TX enable
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask> -1/2/4/8 for each. 15 for all
madura func maduraFuncRxTxEnableSet 1 15 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 1

#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 1 1
madura func maduraFuncTxLoSourceGet 1 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 1 0
madura func maduraFuncPllFrequencyGet 1 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 0 2625000000
madura func maduraFuncPllFrequencySet 1 1 2625000000

#3. init calibration
#QEC Init Cal
madura func maduraFuncTrackingCalsEnableSet 1 0x1000 0
# Tx to orx mapping
madura func maduraFuncTxToOrxMappingSet 1 0x10 1
madura func maduraFuncTxToOrxMappingSet 1 0x20 2
madura func maduraFuncTxToOrxMappingSet 1 0x40 4
madura func maduraFuncTxToOrxMappingSet 1 0x80 8
#ETX Pathdelay
#madura func maduraFuncInitCalsRun <trx_id> <initCals.calMask> <initCals.channelMask> <initCals.warmBoot>
#madura func maduraFuncInitCalsRun 1 0x200000 15 0
madura func maduraFuncInitCalsRun 1 0x200000 1 0
madura func maduraFuncInitCalsRun 1 0x200000 2 0
madura func maduraFuncInitCalsRun 1 0x200000 4 0
madura func maduraFuncInitCalsRun 1 0x200000 8 0

#EXT LO
#madura func maduraFuncInitCalsRun 1 0x800 15 0
madura func maduraFuncInitCalsRun 1 0x800 1 0
madura func maduraFuncInitCalsRun 1 0x800 2 0
madura func maduraFuncInitCalsRun 1 0x800 4 0
madura func maduraFuncInitCalsRun 1 0x800 8 0
#DPD Model
#madura func maduraFuncDpdModelConfigSet <trx_id> <txChannelMask> <dpdNumFeatures>
#madura func maduraFuncDpdModelConfigSet 1 15 95
madura func maduraFuncDpdModelConfigSet 1 1 95
madura func maduraFuncDpdModelConfigSet 1 2 95
madura func maduraFuncDpdModelConfigSet 1 4 95
madura func maduraFuncDpdModelConfigSet 1 8 95
# DPD tracking config
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 40 40 16384 0xb68 65530 1 0x207 0 0x207 1 0 0
# CLGC tracking Config
#madura func maduraFuncClgcConfigSet <trx_id> <clgcConfigArraySize> <txChannelMask> <clgcEnableGainControl> <clgcMeasurementBatchTime_us> <clgcMaxSampleBatchesPerClgcRun> <clgcExpectedLoopGain_dB> <clgcExpectedLoopGainRipple_dB> <clgcTxQualifyingThreshold_dBFS> <clgcOrxQualifyingThreshold_dBFS> <clgcOrxMinimumSnr_dB> <clgcMaxGainAdjustmentStepSize_dB> <clgcDampingParam> <clgcMinTxAttenAdjust_dB> <clgcMaxTxAttenAdjust_dB>

#madura func maduraFuncClgcConfigSet 0 1 0x0F 1 2 512 -3 0.05 -48 -48 0 0.5 0.1 0.05 30 
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 100 512 -3 0.05 -36 -36 0 1 0.1 0.05 30 
madura func maduraFuncClgcConfigGet 1 2


#4 PA on####
#hal fpga write 0x102c 0x8000303f
#hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x800030ff
hal fpga write 0x1c2c 0x800030ff 
#!!!!! open the DC power supply!!!!!!

#5 enable TX QEC, CLGC, LOL tracking 
madura func maduraFuncTrackingCalsEnableSet 1 0x101100 1
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
madura func maduraFuncTrackingCalsEnableSet 1 0x404400 1
madura func maduraFuncTrackingCalsEnableSet 1 0x808800 1
madura func maduraFuncDpdStatusGet 1 1
madura func maduraFuncDpdStatusGet 1 2
madura func maduraFuncDpdStatusGet 1 4
madura func maduraFuncDpdStatusGet 1 8

#6 DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x10000 1
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1
madura func maduraFuncTrackingCalsEnableSet 1 0x40000 1
madura func maduraFuncTrackingCalsEnableSet 1 0x80000 1
madura func maduraFuncDpdStatusGet 1 1
madura func maduraFuncDpdStatusGet 1 2
madura func maduraFuncDpdStatusGet 1 4
madura func maduraFuncDpdStatusGet 1 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {23} {4.DOT branch C/D Carrier}>
<data>
#===ethernet config and mac address===
hal fpga write 0x2020 0x30000
hal fpga writed 0x106C 0x0303
hal fpga writed 0x146C 0x0303
hal fpga writed 0x186C 0x0303
hal fpga writed 0x1C6C 0x0303


#====UL Mac address===
#hal fpga write 0x2034 0x07262473
#hal fpga write 0x2038 0x0000F0B1

#===DL Mac address====
hal fpga write 0x202c 0x9d6e2ef8
hal fpga write 0x2030 0x0000346e

#=====pacc set init vaule for all branches ==
srv pacc setdac branch_a main 0x6e0
srv pacc setdac branch_a peak 0x580

srv pacc setdac branch_b main 0x6e0
srv pacc setdac branch_b peak 0x580

srv pacc setdac branch_c main 0x6e0
srv pacc setdac branch_c peak 0x580

srv pacc setdac branch_d main 0x6e0
srv pacc setdac branch_d peak 0x580

srv pacc setdac branch_e main 0x6e0
srv pacc setdac branch_e peak 0x580

srv pacc setdac branch_f main 0x6e0
srv pacc setdac branch_f peak 0x580

srv pacc setdac branch_g main 0x6e0
srv pacc setdac branch_g peak 0x580

srv pacc setdac branch_h main 0x6e0
srv pacc setdac branch_h peak 0x580
#=====DOT Carrier set===
srv datalink init
#srv datalink set dl branch_a 0 4 245760 8e2_1
srv datapath mute ul branch_h
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h

srv datapath unmute dl branch_a
srv datapath unmute dl branch_b
srv datapath unmute dl branch_c
srv datapath unmute dl branch_d
srv datapath unmute dl branch_f
srv datapath unmute dl branch_e
srv datapath unmute dl branch_g
srv datapath unmute dl branch_h

srv duplex tdd_en set disable trx2

#=====Madura setting for branch F,need modify===
% carry setup flow

#1. TX enable
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask> -1/2/4/8 for each. 15 for all
madura func maduraFuncRxTxEnableSet 0 15 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 0 

#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 0 4
madura func maduraFuncTxLoSourceGet 0 8

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 0 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 0 1 2345000000


#3. init calibration
#QEC Init Cal
madura func maduraFuncTrackingCalsEnableSet 1 0x1000 0
# Tx to orx mapping
madura func maduraFuncTxToOrxMappingSet 0 0x40 4
madura func maduraFuncTxToOrxMappingSet 0 0x80 8
#ETX Pathdelay
madura func maduraFuncInitCalsRun 0 0x200000 4 0
madura func maduraFuncInitCalsRun 0 0x200000 8 0
#EXT LO
madura func maduraFuncInitCalsRun 0 0x800 4 0
madura func maduraFuncInitCalsRun 0 0x800 8 0
#DPD Model
madura func maduraFuncDpdModelConfigSet 0 4 95
madura func maduraFuncDpdModelConfigSet 0 8 95
# DPD tracking config
madura func maduraFuncDpdTrackingConfigSet 0 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1 0 0
# CLGC tracking Config
#madura func maduraFuncClgcConfigSet <trx_id> <clgcConfigArraySize> <txChannelMask> <clgcEnableGainControl> <clgcMeasurementBatchTime_us> <clgcMaxSampleBatchesPerClgcRun> <clgcExpectedLoopGain_dB> <clgcExpectedLoopGainRipple_dB> <clgcTxQualifyingThreshold_dBFS> <clgcOrxQualifyingThreshold_dBFS> <clgcOrxMinimumSnr_dB> <clgcMaxGainAdjustmentStepSize_dB> <clgcDampingParam> <clgcMinTxAttenAdjust_dB> <clgcMaxTxAttenAdjust_dB>

#madura func maduraFuncClgcConfigSet 0 1 0x0F 1 2 512 -3 0.05 -48 -48 0 0.5 0.1 0.05 30 
madura func maduraFuncClgcConfigSet 0 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30 

#4 PA on####
#hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x800030ff
#hal fpga write 0x182c 0x8000303f
#hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!

#5 enable TX QEC, CLGC, LOL tracking 
madura func maduraFuncTrackingCalsEnableSet 0 0x404400 1
madura func maduraFuncTrackingCalsEnableSet 0 0x808800 1
madura func maduraFuncDpdStatusGet 0 4
madura func maduraFuncDpdStatusGet 0 8

#6 DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 0 0x40000 1
madura func maduraFuncTrackingCalsEnableSet 0 0x80000 1
madura func maduraFuncDpdStatusGet 0 4
madura func maduraFuncDpdStatusGet 0 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {5.hal fpga init}>
<data>
hal fpga init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {10.sync task start}>
<data>
sync task start 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {A/F pwr meter}>
<data>
srv pwrmeas dlpwr get branch_a
srv pwrmeas dlpwr get branch_b
srv pwrmeas dlpwr get branch_c
srv pwrmeas dlpwr get branch_d
srv pwrmeas dlpwr get branch_e
srv pwrmeas dlpwr get branch_f
srv pwrmeas dlpwr get branch_g
srv pwrmeas dlpwr get branch_h
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {clgc status}>
<data>
madura func ClgcStatusGet 0 1
madura func ClgcStatusGet 0 2
madura func ClgcStatusGet 0 4
madura func ClgcStatusGet 0 8


madura func ClgcStatusGet 1 1
madura func ClgcStatusGet 1 2
madura func ClgcStatusGet 1 4
madura func ClgcStatusGet 1 8

rfic func ClgcStatusGet 1 1
rfic func ClgcStatusGet 1 2
rfic func ClgcStatusGet 1 4
rfic func ClgcStatusGet 1 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {28} {PTP reset}>
<data>
hal fpga write 0x2090 0x300

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {29} {orx power get}>
<data>
madura func maduraFuncRxDecPowerGet 1 0x10
madura func maduraFuncRxDecPowerGet 1 0x20
madura func maduraFuncRxDecPowerGet 1 0x40
madura func maduraFuncRxDecPowerGet 1 0x80 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {Madura}>
<button {0} {Madura_tracking}>
<data>
##### TX enable####
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 1 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 1

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 1 0x20 2

#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 1 0x20


#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 1 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 1 0

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 0 2595000000

#####DPD MODEL####
madura func maduraFuncDpdModelConfigSet 1 2 95

####clgc config####
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncClgcConfigGet 1 2

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#### PA on####
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!

####initial tracking ####
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 2 0

#EXT LOL
madura func maduraFuncInitCalsRun 1 0x800 2 0

#DPD
madura func maduraFuncInitCalsRun 1 0x10000000 2 0

####QEC,LO,CLGC tracking enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
madura func maduraFuncDpdStatusGet 1 2


#### Tx test Tone #### optional
madura func maduraFuncTxTestToneSet 1 2 1 2000000 0


#### DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1
madura func maduraFuncDpdStatusGet 1 2

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {Madura Init 4}>
<data>
madura func maduraInitRxGainTableLoad 0 15
madura func maduraInitTxAttenTableLoad 0 15
madura func maduraInitRxGainTableLoad 1 15
madura func maduraInitTxAttenTableLoad 1 15

madura func maduraFuncAdcProfilesLoad 0
madura func maduraFuncAdcProfilesLoad 1

madura func maduraInitCpuProfileWrite 0
madura func maduraInitCpuProfileWrite 1

madura func maduraInitCpuStart 0
madura func maduraInitCpuStart 1

madura func maduraFuncPreMcsInit_NonBroadCast 0
madura func maduraFuncPreMcsInit_NonBroadCast 1

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {Madura Init 9}>
<data>
madura func maduraInitTxRampDownInit 0
madura func maduraInitTxRampDownInit 1


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {Madura_Dfrm_Status}>
<data>
madura func maduraFuncDfrmLinkConditionGet 0 1
madura func maduraFuncDfrmLinkConditionGet 1 1

madura func maduraFuncDeframerStatusGet 0 1
madura func maduraFuncDeframerStatusGet 1 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {204B status check}>
<data>
#madura func maduraFuncDeframerStatusGet <trx_id> <deframerSel>
madura func maduraFuncDeframerStatusGet 1 1
madura func maduraFuncDeframerStatusGet 0 1
#madura func maduraFuncFramerStatusGet <trx_id> <framerSel>
madura func maduraFuncFramerStatusGet 1 1
madura func maduraFuncFramerStatusGet 0 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {RX dis&en}>
<data>


#FPGA JESD RX diasble(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe
#FPGA JESD RX diasble(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe

#FPGA JESD RX enable(chipset 0)
hal fpga write 0x0000082c 0x801
hal fpga write 0x0000092c 0x801
#FPGA JESD RX enable(chipset 1)
hal fpga write 0x00000A2c 0x801
hal fpga write 0x00000B2c 0x801

#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 1
hal fpga writefield 0x0000097c 0x00008000 1
#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x00000A7c 0x00008000 1
hal fpga writefield 0x00000B7c 0x00008000 1

#RFIC framer sysref enable
madura func maduraFuncFramerSysrefCtrlSet 0 1 1
madura func maduraFuncFramerSysrefCtrlSet 1 1 1

#LTU sysref oneshot 1 time
#hal ltu debug 0x3 0x1
i2c write clock_synth 14,d3,04
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {Madura Init all}>
<data>
srv devinit
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {Madura Init 5}>
<data>
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01

madura func maduraInitMultichipSyncSet 0 1
madura func maduraInitMultichipSyncSet 1 1

gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

%d 100

gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

%d 100

gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

%d 100

gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

%d 100

madura func maduraInitMultichipSyncSet 0 0
madura func maduraInitMultichipSyncSet 1 0

madura func maduraInitMultichipSyncStatusGet 0
madura func maduraInitMultichipSyncStatusGet 1




</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {Madura Init 10}>
<data>
madura func maduraFuncGpIntInit 0 0xFFFFFFFFFFFFFFFF 0xFFFFFFFFFFFFFFFF
madura func maduraFuncGpIntInit 1 0xFFFFFFFFFFFFFFFF 0xFFFFFFFFFFFFFFFF
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {Madura_Frm_Status}>
<data>
madura func maduraFuncFramerStatusGet 0 1
madura func maduraFuncFramerStatusGet 1 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {TX/RX enable}>
<data>
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 1 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 1

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 1 0x20 2
#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 1 0x20

#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 1 2




#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 1 0
#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 0 2595000000

#madura func maduraFuncRadioStateGet <trx_id>
madura func maduraFuncRadioStateGet 1

madura


madura func maduraFuncTxTestToneSet 1 2 1 2000000 0


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {fpga jesd1}>
<data>
#JESD_SERDES_STATUS1_LN0
#[31:16]= {15'b0,RXPMA_RST_DONE}
#[15:12]= {RX_IS_ALIGNED,TXPMA_RST_DONE,PWR_GOOD,RXPRBSERR_INDIC}
#[11:08]= SM_RESET_RX[3:0]
#[07:04]= SM_RESET_TX[3:0]
#[03:00]= {1'b0,SM_RESET_ALL[2:0]}
hal fpga readd 0xc20
hal fpga readd 0xd20
hal fpga readd 0xe20
hal fpga readd 0xf20
#JESD_SERDES_STATUS1_LN1
hal fpga readd 0xc3c
hal fpga readd 0xd3c
hal fpga readd 0xe3c
hal fpga readd 0xf3c



hal fpga writed 0xc1c 0xffffffff
hal fpga writed 0xd1c 0xffffffff
hal fpga writed 0xe1c 0xffffffff
hal fpga writed 0xf1c 0xffffffff
hal fpga writed 0xc38 0xffffffff
hal fpga writed 0xd38 0xffffffff
hal fpga writed 0xe38 0xffffffff
hal fpga writed 0xf38 0xffffffff

#JESD_SERDES_STATUS_LN0
#[31:28]= {1'b0,RXBUFSTATUS[2:0]}
#[27:24]= {2'b00,TXBUFSTATUS[1:0]}
#[23:20]= 4'h0
#[19:16]= {1'b0,TXRESETDONE,RXCDRLOCK,RXRESETDONE}
#[15:12]= 4'h0
#[11:08]= RXDISPERR[3:0]
#[07:04]= 4'h0
#[03:00]= RXNOTINTABLE[3:0]
hal fpga readd 0xc1c
hal fpga readd 0xd1c
hal fpga readd 0xe1c
hal fpga readd 0xf1c
#JESD_SERDES_STATUS_LN1
hal fpga readd 0xc38
hal fpga readd 0xd38
hal fpga readd 0xe38
hal fpga readd 0xf38

#JESD_RX_IRQ
#[31:24]= 8'h00
#[23:20]= {3'b000,SYSREF_MISM}
#[19:16]= {1'b0,LN1_CGS_ERR,LN1_DISP_ERR,LN1_CODE_ERR}
#[15:12]= {LN1_ILA_CFG_ERR,LN1_JTBUF_UNDERFLOW,LN1_JTBUF_OVERFLOW,1'b0}
#[11: 8]= {1'b0,LN0_CGS_ERR,LN0_DISP_ERR,LN0_CODE_ERR}
#[ 7: 4]= {LN0_ILA_CFG_ERR,LN0_JTBUF_UNDERFLOW,LN0_JTBUF_OVERFLOW,1'b0}
#[ 3: 0]= {LK_STA_DOWN,LK_STA_UP,TP_CHECK_ERR,RST_DONE}
hal fpga read 0x800
hal fpga read 0x900
hal fpga read 0xa00
hal fpga read 0xb00

#JESD_RX_DBG
#[31:20]= 12'h000
#[19:16]= {1'b0,LN1_CGS_FSM[2:0]}
#[15:12]= {1'b0,LN0_CGS_FSM[2:0]}
#[11:00]= {7'b0,LK_FSM[4:0]}
hal fpga readd 0x84c
hal fpga readd 0x94c
hal fpga readd 0xa4c
hal fpga readd 0xb4c

#JESD_RX_REINIT_CAUSE
#[31:08]= 24'h0000_00
#[07:04]= {LN1_UNEXP_K,LN1_ILA_CS_ERR,LN1_ILA_SEQ_ERR,LN1_ILA_K_ERR}
#[03:00]= {LN0_UNEXP_K,LN0_ILA_CS_ERR,LN0_ILA_SEQ_ERR,LN0_ILA_K_ERR}
hal fpga readd 0x850
hal fpga readd 0x950
hal fpga readd 0xa50
hal fpga readd 0xb50

#JESD_RX_DEBUG_26_SYSREF
#[31:24]= {LENGTH[7:0]}
#[23:20]= 4'h0
#[19:16]= {2'b00,CNT_FLAG,1'b0}
#[15:00]= {6'b0,CNT[9:0]}
hal fpga readd 0x8f4
hal fpga readd 0x9f4
hal fpga readd 0xaf4
hal fpga readd 0xbf4

#######################################################################################################################################
#JESD_TX_IRQ
#[31:08]= 24'h0000_00
#[07:00]= {3'b000,SYSREF_MISM, LK_STA_DOWN,LK_STA_UP,RST_DONE,SYNC_ERR_TYPE2}
hal fpga readd 0x400
hal fpga readd 0x500
hal fpga readd 0x600
hal fpga readd 0x700

#JESD_TX_VERSION
#[31:00]= JESD_TX_VERSION
hal fpga readd 0x418
hal fpga readd 0x518
hal fpga readd 0x618
hal fpga readd 0x718

#JESD_TX_CONFIG_0
#[31:24]= {SCR,2'b00,L[4:0]}
#[23:16]= {1'b0,ADJDIR,PHADJ,LID[4:0]}
#[15:00]= {ADJCNT[3:0],BID[3:0],DID[7:0]]}
hal fpga readd 0x41c
hal fpga readd 0x51c
hal fpga readd 0x61c
hal fpga readd 0x71c

#JESD_TX_CONFIG_1
#[31:24]= {CS[1:0],1'b0,N[4:0]}
#[23:16]= {M[7:0]}
#[15:08]= {3'b000,K[4:0]}
#[07:00]= {F[7:0]}
hal fpga readd 0x420
hal fpga readd 0x520
hal fpga readd 0x620
hal fpga readd 0x720

#JESD_TX_CONFIG_2
#[31:24]= {FCHK[7:0]}
#[23:16]= {HD,2'b00,CF[4:0]}
#[15:08]= {JESDV[2:0],S[4:0]}
#[07:00]= {SUBCLASS[2:0],NN[4:0]}
hal fpga readd 0x424
hal fpga readd 0x524
hal fpga readd 0x624
hal fpga readd 0x724

#JESD_TX_CTRL
#[31:08]= 24'h0000_00
#[07:00]= {1'b0,IQ_SWITCH,TEST_PATTERN[2:0],TEST_MODE_EN,SCR_EN,LK_EN}
hal fpga readd 0x428
hal fpga readd 0x528
hal fpga readd 0x628
hal fpga readd 0x728

#JESD_TX_RST
#[31:16]= 16'h0000
#[15:00]= 0x0000--->0x5a5a--->software reset
hal fpga readd 0x42c
hal fpga readd 0x52c
hal fpga readd 0x62c
hal fpga readd 0x72c

#JESD_TX_STATUS
#[31:04]= 28'h0000_000
#[03:00]= {1'b0,LK_STATUS[1:0],PHY_STATUS}
hal fpga readd 0x430
hal fpga readd 0x530
hal fpga readd 0x630
hal fpga readd 0x730

#JESD_TX_SYNC_ERR_CNT
#[31:08]= 24'h0000_00
#[07:00]= {SYNC_ERR_CNT[7:0]}
hal fpga readd 0x434
hal fpga readd 0x534
hal fpga readd 0x634
hal fpga readd 0x734

#JESD_TX_LMFC
#[31:16]= 16'h0000
#[15:00]= {SYSREF_EN,OFFSET[14:0]}
hal fpga readd 0x478
hal fpga readd 0x578
hal fpga readd 0x678
hal fpga readd 0x778

#JESD_TX_SYNCB
#[31:01]= 0
#[00:00]= Link SYNCB status
hal fpga readd 0x47c
hal fpga readd 0x57c
hal fpga readd 0x67c
hal fpga readd 0x77c

#JESD_TX_ANTENNA_SWITCH
#[31:01]= 0
#[00:00]= antenna switch
hal fpga readd 0x480
hal fpga readd 0x580
hal fpga readd 0x680
hal fpga readd 0x780

#JESD_TX_IQ_SAMPLE_RATE
#[31:08]= 0
#[07:00]= TX_IQ_SAMPLE_RATE[7:0]
hal fpga readd 0x484
hal fpga readd 0x584
hal fpga readd 0x684
hal fpga readd 0x784

#JESD_TX_DEBUG_0
#[31:00]= teat_data
hal fpga readd 0x488
hal fpga readd 0x588
hal fpga readd 0x688
hal fpga readd 0x788

#JESD_TX_DEBUG_1_CLOSE_ANTE
#[31:16]= {15'b0,EN_ANTE1}
#[15:00]= {15'b0,EN_ANTE0}
hal fpga readd 0x48c
hal fpga readd 0x58c
hal fpga readd 0x68c
hal fpga readd 0x78c

#JESD_TX_DEBUG_2_RST_DONE
#[31:01]= 0
#[00:00]= i_gtx_lk_tx_rst_done
hal fpga readd 0x490
hal fpga readd 0x590
hal fpga readd 0x690
hal fpga readd 0x790

#JESD_TX_DEBUG_3_TEST_MODE_EN
#[31:16]= {15'b0,SYNCB_LOOP}
#[15:00]= {14'b0,ante 1 test mode enable,ante 0 test mode enable}
hal fpga readd 0x494
hal fpga readd 0x594
hal fpga readd 0x694
hal fpga readd 0x794

#JESD_TX_DEBUG_4_TEST_ANTE0
#[31:00]= ant0_testdata
hal fpga readd 0x498
hal fpga readd 0x598
hal fpga readd 0x698
hal fpga readd 0x798

#JESD_TX_DEBUG_5_TEST_ANTE1
#[31:00]= ant1_testdata
hal fpga readd 0x49c
hal fpga readd 0x59c
hal fpga readd 0x69c
hal fpga readd 0x79c

#JESD_TX_DEBUG_6_IRQ_CLR
#[31:01]= 0
#[00:00]= IRQ_CLR
hal fpga readd 0x4a0
hal fpga readd 0x5a0
hal fpga readd 0x6a0
hal fpga readd 0x7a0

#JESD_TX_DEBUG_7_IRQ_TRAP
#[31:08]= 24'h0000_00
#[07:00]= {3'b000,SYSREF_MISM,LK_STA_DOWN,LK_STA_UP,RST_DONE,SYNC_ERR_TYPE2}
hal fpga readd 0x4a4
hal fpga readd 0x5a4
hal fpga readd 0x6a4
hal fpga readd 0x7a4

#JESD_TX_DEBUG_8_CLR_EVENT
#[31:01]= 0
#[00:00]= CLR
hal fpga readd 0x4a8
hal fpga readd 0x5a8
hal fpga readd 0x6a8
hal fpga readd 0x7a8


#JESD_TX_DEBUG_9_EVENT
#[31:16]= 16'h0000
#[15:12]= {1'b0, SYNCB_LATEST, SW_RST_LATEST, LK_EN_LATEST}
#[11:08]= {1'b0, SYNCB_3,      SW_RST_3,      LK_EN_3}
#[07:04]= {1'b0, SYNCB_2,      SW_RST_2,      LK_EN_2}
#[03:00]= {1'b0, SYNCB_1,      SW_RST_1,      LK_EN_1}
hal fpga readd 0x4ac
hal fpga readd 0x5ac
hal fpga readd 0x6ac
hal fpga readd 0x7ac

#JESD_TX_DEBUG_10_CLR_CNT
#[31:01]= 0
#[00:00]= CLR
hal fpga readd 0x4b0
hal fpga readd 0x5b0
hal fpga readd 0x6b0
hal fpga readd 0x7b0

#JESD_TX_DEBUG_11_CNT
#[31:16]= SYNCB[15:0]
#[15:00]= SW_RST[15:0]
hal fpga readd 0x4b4
hal fpga readd 0x5b4
hal fpga readd 0x6b4
hal fpga readd 0x7b4

#JESD_TX_DEBUG_12_CNT
#[31:16]= 0
#[15:00]= LK_EN[15:0]
hal fpga readd 0x4b8
hal fpga readd 0x5b8
hal fpga readd 0x6b8
hal fpga readd 0x7b8

#JESD_TX_DEBUG_13_SYSREF_CLR
#[31:01]= 0
#[00:00]= CLR
hal fpga readd 0x4bc
hal fpga readd 0x5bc
hal fpga readd 0x6bc
hal fpga readd 0x7bc

#JESD_TX_DEBUG_14_SYSREF
#[31:24]= LENGTH[7:0]
#[23:20]= 4'h0
#[19:16]= {2'b00,CNT_FLAG,1'b0}
#[15:00]= {6'b0,CNT[9:0]}
hal fpga readd 0x4c0
hal fpga readd 0x5c0
hal fpga readd 0x6c0
hal fpga readd 0x7c0

####################################################################################################
#JESD_SERDES_VERSION
#[31:00]= VERSION
hal fpga readd 0xc00
hal fpga readd 0xd00
hal fpga readd 0xe00
hal fpga readd 0xf00

#JESD_SERDES_CPLL_RST
#[31:01]= 0
#[00:00]= CPLL_RESET
hal fpga readd 0xc04
hal fpga readd 0xd04
hal fpga readd 0xe04
hal fpga readd 0xf04

#JESD_SERDES_CPLL_STATUS
#[31:01]= 0
#[00:00]= CPLL_LOCK
hal fpga readd 0xc08
hal fpga readd 0xd08
hal fpga readd 0xe08
hal fpga readd 0xf08

################################################################
#JESD_SERDES_DPORT_LN0
#DRP READ
#[31:16]= {6'b0,ADDR[9:0]}
#[15:00]= {DRP_READ_DATA[15:0]}
hal fpga readd 0xc0c
hal fpga readd 0xd0c
hal fpga readd 0xe0c
hal fpga readd 0xf0c
#JESD_SERDES_DPORT_LN1
hal fpga readd 0xc28
hal fpga readd 0xd28
hal fpga readd 0xe28
hal fpga readd 0xf28

#JESD_SERDES_DPORT1_LN0
#DRP_WRITE
#[31:16]= {EN,WE,4'h0,ADDR[9:0]}
#[15:00]= {DRP_WRITE_DATA[15:0]}
hal fpga readd 0xc10
hal fpga readd 0xd10
hal fpga readd 0xe10
hal fpga readd 0xf10
#JESD_SERDES_DPORT1_LN1
hal fpga readd 0xc2c
hal fpga readd 0xd2c
hal fpga readd 0xe2c
hal fpga readd 0xf2c


#JESD_SERDES_CTRL1_LN0
#[31:24]= {6'b0,POWER_DOWN_EN,RXLPMEN}
#[23:16]= {TX_INHABIT,RXDFELPMRESET,TXPRECURSOR[4:0],TXPD[1]}
#[15:00]= {TXPD[0],RXPD[1:0],TXDIFFCTRL[4:0], TXPOSTCURSOR[4:0],GTRXRESET,GTTXRESET,GTREST}
hal fpga readd 0xc14
hal fpga readd 0xd14
hal fpga readd 0xe14
hal fpga readd 0xf14
#JESD_SERDES_CTRL1_LN1
hal fpga readd 0xc30
hal fpga readd 0xd30
hal fpga readd 0xe30
hal fpga readd 0xf30

#JESD_SERDES_CTRL2_LN0
#[31:20]= {11'b0,EYESCANRESET}
#[19:16]= {1'b0,LOOPBACK[2:0]}
#[15:08]= {RXPRBS_SEL[3:0], 3'b000,RXPRBS_RST, TXPRBS_SEL[3:0], 3'b000,TXPRBS_F_ERR}
hal fpga readd 0xc18
hal fpga readd 0xd18
hal fpga readd 0xe18
hal fpga readd 0xf18
#JESD_SERDES_CTRL2_LN1
hal fpga readd 0xc34
hal fpga readd 0xd34
hal fpga readd 0xe34
hal fpga readd 0xf34

#JESD_SERDES_STATUS_LN0
#[31:28]= {1'b0,RXBUFSTATUS[2:0]}
#[27:24]= {2'b00,TXBUFSTATUS[1:0]}
#[23:20]= 4'h0
#[19:16]= {1'b0,TXRESETDONE,RXCDRLOCK,RXRESETDONE}
#[15:12]= 4'h0
#[11:08]= RXDISPERR[3:0]
#[07:04]= 4'h0
#[03:00]= RXNOTINTABLE[3:0]
hal fpga readd 0xc1c
hal fpga readd 0xd1c
hal fpga readd 0xe1c
hal fpga readd 0xf1c
#JESD_SERDES_STATUS_LN1
hal fpga readd 0xc38
hal fpga readd 0xd38
hal fpga readd 0xe38
hal fpga readd 0xf38


#JESD_SERDES_STATUS1_LN0
#[31:16]= {15'b0,RXPMA_RST_DONE}
#[15:12]= {RX_IS_ALIGNED,TXPMA_RST_DONE,PWR_GOOD,RXPRBSERR_INDIC}
#[11:08]= SM_RESET_RX[3:0]
#[07:04]= SM_RESET_TX[3:0]
#[03:00]= {1'b0,SM_RESET_ALL[2:0]}
hal fpga readd 0xc20
hal fpga readd 0xd20
hal fpga readd 0xe20
hal fpga readd 0xf20
#JESD_SERDES_STATUS1_LN1
hal fpga readd 0xc3c
hal fpga readd 0xd3c
hal fpga readd 0xe3c
hal fpga readd 0xf3c


#JESD_SERDES_PRBS_ERR_LN0
#[31:00]= PRBS_ERR_CNT_LN0
hal fpga readd 0xc24
hal fpga readd 0xd24
hal fpga readd 0xe24
hal fpga readd 0xf24
#JESD_SERDES_PRBS_ERR_LN1
hal fpga readd 0xc40
hal fpga readd 0xd40
hal fpga readd 0xe40
hal fpga readd 0xf40

################################################################
#JESD_SERDES_IQ_SAMPLE_RATE
#[31:08]= 24'h0000_00
#[07:00]= SERDES_IQ_SAMPLE_RATE
#
hal fpga readd 0xc44
hal fpga readd 0xd44
hal fpga readd 0xe44
hal fpga readd 0xf44

#JESD_SERDES_DEBUG_0
#[31:00]= reseved_rw_data
hal fpga readd 0xc48
hal fpga readd 0xd48
hal fpga readd 0xe48
hal fpga readd 0xf48

#JESD_SERDES_DEBUG_1
#[31:00]= reseved_r_data
hal fpga readd 0xc4c
hal fpga readd 0xd4c
hal fpga readd 0xe4c
hal fpga readd 0xf4c




##################################################################################################
#JESD_RX_IRQ
#[31:24]= 8'h00
#[23:20]= {3'b000,SYSREF_MISM}
#[19:16]= {1'b0,LN1_CGS_ERR,LN1_DISP_ERR,LN1_CODE_ERR}
#[15:12]= {LN1_ILA_CFG_ERR,LN1_JTBUF_UNDERFLOW,LN1_JTBUF_OVERFLOW,1'b0}
#[11: 8]= {1'b0,LN0_CGS_ERR,LN0_DISP_ERR,LN0_CODE_ERR}
#[ 7: 4]= {LN0_ILA_CFG_ERR,LN0_JTBUF_UNDERFLOW,LN0_JTBUF_OVERFLOW,1'b0}
#[ 3: 0]= {LK_STA_DOWN,LK_STA_UP,TP_CHECK_ERR,RST_DONE}
hal fpga read 0x800
hal fpga read 0x900
hal fpga read 0xa00
hal fpga read 0xb00

#JESD_RX_VERSION
#[31:00]= JESD_RX_VERSION
hal fpga readd 0x818
hal fpga readd 0x918
hal fpga readd 0xa18
hal fpga readd 0xb18

#JESD_RX_CONFIG_0
#[31:28]= {ADJCNT[3:0]}
#[27:24]= {BID[3:0]}
#[23:16]= {DID[7:0]}
#[15:00]= {K284_Q,K280_R}={9C,1C}
hal fpga readd 0x81c
hal fpga readd 0x91c
hal fpga readd 0xa1c
hal fpga readd 0xb1c

#JESD_RX_CONFIG_1
#[31:24]= {3'b000,K[4:0]}
#[23:16]= {F[7:0]}
#[15:08]= {SCR,2'b00,L[4:0]}
#[07:00]= {1'b0,ADJDIR,PHADJ,LID[4:0]}
hal fpga readd 0x820
hal fpga readd 0x920
hal fpga readd 0xa20
hal fpga readd 0xb20

#JESD_RX_CONFIG_2
#[31:24]= {JESDV[2:0],S[4:0]}
#[23:16]= {SUBCLASS[2:0],NN[4:0]}
#[15:08]= {CS[1:0],1'b0,N[4:0]}
#[07:00]= {M[7:0]}
hal fpga readd 0x824
hal fpga readd 0x924
hal fpga readd 0xa24
hal fpga readd 0xb24

#JESD_RX_CONFIG_3
#[31:24]= {FCHK[7:0]}
#[23:16]= {RES2[7:0]}
#[15:08]= {RES1[7:0]}
#[07:00]= {HD,2'b00,CF[4:0]}
hal fpga readd 0x828
hal fpga readd 0x928
hal fpga readd 0xa28
hal fpga readd 0xb28

#JESD_RX_CTRL
#[31:16]= {15'b0,ANT_SWAP}
#[15:12]= {2'b00,PRBS_EN,RX_DEBUG}
#[11:08]= {IQ_SWAQ,TEST_LN[2:0]}
#[07:04]= {TEST_PATTERN[2:0],TEST_MODE}
#[03:00]= {2'b00,DESCR_EN,LK_EN}
hal fpga readd 0x82c
hal fpga readd 0x92c
hal fpga readd 0xa2c
hal fpga readd 0xb2c

#JESD_RX_RST
#[31:16]= 16'h0000
#[15:00]= 0x0000--->0x5a5a--->software reset
hal fpga readd 0x830
hal fpga readd 0x930
hal fpga readd 0xa30
hal fpga readd 0xb30

#JESD_RX_DBG
#[31:20]= 12'h000
#[19:16]= {1'b0,LN1_CGS_FSM[2:0]}
#[15:12]= {1'b0,LN0_CGS_FSM[2:0]}
#[11:00]= {7'b0,LK_FSM[4:0]}
hal fpga readd 0x84c
hal fpga readd 0x94c
hal fpga readd 0xa4c
hal fpga readd 0xb4c

#JESD_RX_REINIT_CAUSE
#[31:08]= 24'h0000_00
#[07:04]= {LN1_UNEXP_K,LN1_ILA_CS_ERR,LN1_ILA_SEQ_ERR,LN1_ILA_K_ERR}
#[03:00]= {LN0_UNEXP_K,LN0_ILA_CS_ERR,LN0_ILA_SEQ_ERR,LN0_ILA_K_ERR}
hal fpga readd 0x850
hal fpga readd 0x950
hal fpga readd 0xa50
hal fpga readd 0xb50

#JESD_RX_LMFC
#[31:16]= 16'h0000
#[15:00]= {SYSREF_EN,OFFSET[14:0]}
hal fpga readd 0x87c
hal fpga readd 0x97c
hal fpga readd 0xa7c
hal fpga readd 0xb7c

#JESD_RX_ILA_START_POINT
#[31:16]= 16'h0000
#[15:00]= {3'b000,LN1, 3'b000,LN0}
hal fpga readd 0x880
hal fpga readd 0x980
hal fpga readd 0xa80
hal fpga readd 0xb80

#JESD_RX_SYNCB
#[31:01]= 0
#[00:00]= Link SYNCB status
hal fpga readd 0x884
hal fpga readd 0x984
hal fpga readd 0xa84
hal fpga readd 0xb84

#JESD_RX_IQ_SAMPLE_RATE
#[31:01]= 31'b0
#[00:00]= RX_IQ_SAMPLE_RATE
hal fpga readd 0x888
hal fpga readd 0x988
hal fpga readd 0xa88
hal fpga readd 0xb88

#JESD_RX_ILA_LID
#[31:08]= 0
#[07:00]= {LN1_LID[3:0],LN0_LID[3:0]}
hal fpga readd 0x88c
hal fpga readd 0x98c
hal fpga readd 0xa8c
hal fpga readd 0xb8c

#JESD_RX_DEBUG_0_CFG_CS
#[31:24]= 8'h00
#[23:16]= {LANE_1_DATA[7:0]}
#[15:08]= 8'h00
#[07:00]= {LANE_0_DATA[7:0]}
hal fpga readd 0x890
hal fpga readd 0x990
hal fpga readd 0xa90
hal fpga readd 0xb90

#JESD_RX_DEBUG_22_LK_FSM
#[31:16]= {11'b0,LANE_1_DATA[4:0]}
#[15:00]= {11'b0,LANE_0_DATA[4:0]}
hal fpga readd 0x8e4
hal fpga readd 0x9e4
hal fpga readd 0xae4
hal fpga readd 0xbe4

#JESD_RX_DEBUG_25_SYSREF_CLR
#[31:01]= 0
#[00:00]= SYSREF_CLR
hal fpga readd 0x8f0
hal fpga readd 0x9f0
hal fpga readd 0xaf0
hal fpga readd 0xbf0


#JESD_RX_DEBUG_26_SYSREF
#[31:24]= {LENGTH[7:0]}
#[23:20]= 4'h0
#[19:16]= {2'b00,CNT_FLAG,1'b0}
#[15:00]= {6'b0,CNT[9:0]}
hal fpga readd 0x8f4
hal fpga readd 0x9f4
hal fpga readd 0xaf4
hal fpga readd 0xbf4


























</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {Madura Init 1}>
<data>
madura func maduraInitDevice

madura func maduraInitHwReset 0
madura func maduraInitHwReset 1

madura func maduraInitInitialize 0
madura func maduraInitInitialize 1

madura func maduraInitStreamImageLoad 0
%d 500
madura func maduraInitStreamImageLoad 1
%d 500

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {Maudra Init 6}>
<data>
madura func maduraInitPostMcsInit 0

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {Attention}>
<data>
Attention: 
for ETSW (rfic func), <trx_id> should be: 0 | 1
for PIS (rfic cli), <trx> should be trx1 | trx3

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {204blink_check}>
<data>
#madura func maduraFuncFramerTestDataSet 0 1 3 1
#madura func maduraFuncFramerTestDataSet 1 1 3 1



#JESD_SERDES_STATUS_LN0
#[31:28]= {1'b0,RXBUFSTATUS[2:0]}
#[27:24]= {2'b00,TXBUFSTATUS[1:0]}
#[23:20]= 4'h0
#[19:16]= {1'b0,TXRESETDONE,RXCDRLOCK,RXRESETDONE}
#[15:12]= 4'h0
#[11:08]= RXDISPERR[3:0]
#[07:04]= 4'h0
#[03:00]= RXNOTINTABLE[3:0]
hal fpga readd 0xc1c
hal fpga readd 0xd1c
#hal fpga readd 0xe1c
#hal fpga readd 0xf1c
#JESD_SERDES_STATUS_LN1
hal fpga readd 0xc38
hal fpga readd 0xd38
hal fpga readd 0xe38
hal fpga readd 0xf38

#JESD_TX_IRQ
#[31:08]= 24'h0000_00
#[07:00]= {3'b000,SYSREF_MISM, LK_STA_DOWN,LK_STA_UP,RST_DONE,SYNC_ERR_TYPE2}
hal fpga readd 0x400
hal fpga readd 0x500
hal fpga readd 0x600
hal fpga readd 0x700

#JESD_TX_STATUS
#[31:04]= 28'h0000_000
#[03:00]= {1'b0,LK_STATUS[1:0],PHY_STATUS}
hal fpga readd 0x430
hal fpga readd 0x530
hal fpga readd 0x630
hal fpga readd 0x730

madura func maduraFuncDeframerStatusGet 0 1
madura func maduraFuncDeframerStatusGet 1 1


madura func maduraFuncFramerStatusGet 0 1
madura func maduraFuncFramerStatusGet 1 1
#JESD_RX_DBG
#[31:20]= 12'h000
#[19:16]= {1'b0,LN1_CGS_FSM[2:0]}
#[15:12]= {1'b0,LN0_CGS_FSM[2:0]}
#[11:00]= {7'b0,LK_FSM[4:0]}
hal fpga readd 0x84c
hal fpga readd 0x94c
hal fpga readd 0xa4c
hal fpga readd 0xb4c


hal fpga writed 0xc1c 0xffffffff
hal fpga writed 0xd1c 0xffffffff
hal fpga writed 0xe1c 0xffffffff
hal fpga writed 0xf1c 0xffffffff
hal fpga writed 0xc38 0xffffffff
hal fpga writed 0xd38 0xffffffff
hal fpga writed 0xe38 0xffffffff
hal fpga writed 0xf38 0xffffffff




</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {Error Clear}>
<data>
rfic func CommonErrorClear 0
rfic func CommonErrorClear 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {maduraFuncFramerTestDataSet}>
<data>
madura func maduraFuncFramerTestDataSet 0 1 3 1
madura func maduraFuncFramerTestDataSet 1 1 3 1


madura func maduraFuncDeframerStatusGet 0 1
madura func maduraFuncDeframerStatusGet 1 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {Madura Init 2}>
<data>
madura func maduraInitCpuImageLoad 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {Madura Init 7}>
<data>
madura func maduraInitPostMcsInit 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {Madura Init 8 chip0}>
<data>
#PreJesdBringUp
#================================================================

#Fpga reset cpll, reset serdes, config rate
# Reset FPGA Serdes(chipset 0)
hal fpga writefield 0x00000C04 0x00000001 0x1
hal fpga writefield 0x00000C04 0x00000001 0x0
hal fpga writefield 0x00000D04 0x00000001 0x1
hal fpga writefield 0x00000D04 0x00000001 0x0

#Required 5ms delay for PLL lock - FD 4/155 16-CNH 160 8986-1
%d 5

#Check FPGA CPLL lock status(chipset 0)(locked:1)
hal fpga readfield 0x00000C08 0x00000001
hal fpga readfield 0x00000D08 0x00000001

#JESD lane(chipset 0)
hal fpga writefield 0x00000C14 0x00001f00 0x2
hal fpga writefield 0x00000C14 0x01000000 0x1
hal fpga writefield 0x00000C14 0x00000007 0x7
hal fpga writefield 0x00000C14 0x00000007 0x0
hal fpga writefield 0x00000C14 0x00400000 0x1
hal fpga writefield 0x00000C14 0x00400000 0x0

hal fpga writefield 0x00000C30 0x00001f00 0x2
hal fpga writefield 0x00000C30 0x01000000 0x1
hal fpga writefield 0x00000C30 0x00000007 0x7
hal fpga writefield 0x00000C30 0x00000007 0x0
D
hal fpga writefield 0x00000C30 0x00400000 0x1
hal fpga writefield 0x00000C30 0x00400000 0x0
D

hal fpga writefield 0x00000D14 0x00001f00 0x2
hal fpga writefield 0x00000D14 0x01000000 0x1
hal fpga writefield 0x00000D14 0x00000007 0x7
hal fpga writefield 0x00000D14 0x00000007 0x0
hal fpga writefield 0x00000D14 0x00400000 0x1
hal fpga writefield 0x00000D14 0x00400000 0x0

hal fpga writefield 0x00000D30 0x00001f00 0x2
hal fpga writefield 0x00000D30 0x01000000 0x1
hal fpga writefield 0x00000D30 0x00000007 0x7
hal fpga writefield 0x00000D30 0x00000007 0x0
hal fpga writefield 0x00000D30 0x00400000 0x1
hal fpga writefield 0x00000D30 0x00400000 0x0

#Rate configuration(chipset 0 --- 245.76M)
#tx
hal fpga write 0x0000041c 0x03000000
hal fpga write 0x00000420 0x0F071F03
hal fpga write 0x00000424 0x4C00202F
#rx
hal fpga write 0x0000081c 0x00009C1C
hal fpga write 0x00000820 0x1F030300
hal fpga write 0x00000824 0x202F8D07
hal fpga write 0x00000828 0x4C000000

#tx
hal fpga write 0x0000051c 0x03000000
hal fpga write 0x00000520 0x0F071F03
hal fpga write 0x00000524 0x4C00202F
#rx
hal fpga write 0x0000091c 0x00009C1C
hal fpga write 0x00000920 0x1F030300
hal fpga write 0x00000924 0x202F8D07
hal fpga write 0x00000928 0x4C000000


#JESD_IQ_SAMPLE_Rate_Serdes
#chip0_245.76
hal fpga write 0xC44 0x0
hal fpga write 0xD44 0x0


#JESD_IQ_SAMPLE_Rate_TX
#chip0_245.76
hal fpga write 0x484 0x0
hal fpga write 0x584 0x0


#JESD_IQ_SAMPLE_Rate_RX
#chip0_245.76
hal fpga write 0x888 0x0
hal fpga write 0x988 0x0


#Madura serdes reset
madura func maduraInitSerializerReset 0


#Disable RFIC deframer0 and all framer sysref switch
madura func maduraFuncDeframerSysrefCtrlSet 0 1 0
madura func maduraFuncFramerSysrefCtrlSet 0 7 0


#FPGA sysref for JESD TX&RX disable
#tx enable/disable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 0

#rx enable/disable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 0


#tx enable/disable(chipset 0)
hal fpga writefield 0x00000578 0x00008000 0

#rx enable/disable(chipset 0)
hal fpga writefield 0x0000097c 0x00008000 0


#FPGA JESD TX disable(chipset 0)
hal fpga write 0x00000428 0xfffffffe
hal fpga write 0x00000528 0xfffffffe


#FPGA JESD RX disable(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe


#Disable RFIC deframer0 and all framer
madura func maduraFuncDfrmLinkStateSet 0 1 0
madura func maduraFuncFramerLinkStateSet 0 7 0


#enable continuous sysref
#======================================================


#rficJesdRxBringUp
#======================================================
#RFIC framer reset
madura func maduraFuncFramerLinkStateSet 0 1 0

%d 50
madura func maduraFuncFramerLinkStateSet 0 1 1

#RFIC framer sysref enable
madura func maduraFuncFramerSysrefCtrlSet 0 1 1

%d 100

#FPGA JESD RX diasble(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe


#FPGA JESD RX enable(chipset 0)
hal fpga write 0x0000082c 0x801
hal fpga write 0x0000092c 0x801

#wait 50ms
%d 50

#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 1
hal fpga writefield 0x0000097c 0x00008000 1


#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0


#RFIC sysref for JESD RX disable
madura func maduraFuncFramerSysrefCtrlSet 0 1 0
#FPGA sysref for JESD RX disable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 0
hal fpga writefield 0x0000097c 0x00008000 0


#rficJesdTxBringUp
#=========================================================
#FPGA sysref JESD TX enable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 1
hal fpga writefield 0x00000578 0x00008000 1

#FPGA JESD TX disable(chipset 0)
hal fpga write 0x00000428 0xfffffffe
hal fpga write 0x00000528 0xfffffffe

#FPGA JESD TX enable(chipset 0)
hal fpga write 0x00000428 0x41
hal fpga write 0x00000528 0x41

%d 50

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

#FPGA sysref for JESD TX disable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 0
hal fpga writefield 0x00000578 0x00008000 0

#RFIC Deframer reset
madura func maduraFuncDfrmLinkStateSet 0 1 0

#wait 50ms
%d 50
madura func maduraFuncDfrmLinkStateSet 0 1 1

#RFIC sysref for deframer enable
madura func maduraFuncDeframerSysrefCtrlSet 0 1 1


#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

#RFIC sysref for deframer disable
madura func maduraFuncDeframerSysrefCtrlSet 0 1 0


# disable continuous sysref
#=============================================================


#postJesdBringUp
#=============================================================
#Get RFIC Deframer status
madura func maduraFuncDfrmLinkConditionGet 0 1

#Get FPGA JESD RX status(chipset 0 --- 245.76M: 0x11010)
hal fpga readfield 0x0000084c 0x0007701f
hal fpga readfield 0x0000094c 0x0007701f




</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {madura cw}>
<data>
#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 1 2600000000
madura func maduraFuncPllFrequencySet 1 0 2600000000
madura func maduraFuncPllFrequencySet 0 1 2595000000
madura func maduraFuncPllFrequencySet 0 0 2595000000
madura func maduraFuncPllFrequencyGet 1 1 
madura func maduraFuncPllFrequencyGet 1 0 
madura func maduraFuncPllFrequencyGet 0 1 
madura func maduraFuncPllFrequencyGet 0 0 


#Madura CW, madura func maduraFuncTxTestToneSet <trx_id> <txNcoTestToneCfg.txChannelMask> <txNcoTestToneCfg.enable> <txNcoTestToneCfg.txToneFreq_Hz> <txNcoTestToneCfg.txToneGain>
madura func maduraFuncTxTestToneSet 0 1 0 1000000 3
madura func maduraFuncTxTestToneSet 0 2 0 2000000 3
madura func maduraFuncTxTestToneSet 0 4 0 4000000 3
madura func maduraFuncTxTestToneSet 0 8 0 8000000 3
madura func maduraFuncTxTestToneGet 0 1
madura func maduraFuncTxTestToneGet 0 2
madura func maduraFuncTxTestToneGet 0 4
madura func maduraFuncTxTestToneGet 0 8

madura func maduraFuncTxTestToneSet 1 1 0 1000000 3
madura func maduraFuncTxTestToneSet 1 2 0 2000000 3
madura func maduraFuncTxTestToneSet 1 4 0 4000000 3
madura func maduraFuncTxTestToneSet 1 8 0 8000000 3
madura func maduraFuncTxTestToneGet 1 1
madura func maduraFuncTxTestToneGet 1 2
madura func maduraFuncTxTestToneGet 1 4
madura func maduraFuncTxTestToneGet 1 8

 
#Radio status get
#madura func maduraFuncRadioStateGet 0
#madura func maduraFuncRadioStateGet 1
# LO mapping, Channel 3 i not ok
#madura func maduraFuncTxLoSourceGet 0 1
#madura func maduraFuncTxLoSourceGet 0 2
#madura func maduraFuncTxLoSourceGet 0 4
#madura func maduraFuncTxLoSourceGet 0 8

#madura func maduraFuncTxLoSourceGet 1 1
#madura func maduraFuncTxLoSourceGet 1 2
#madura func maduraFuncTxLoSourceGet 1 4
#madura func maduraFuncTxLoSourceGet 1 8

# TX channel Enable, madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 1 0 0
madura func maduraFuncRxTxEnableSet 1 15 15
madura func maduraFuncRxTxEnableGet 1

madura func maduraFuncRxTxEnableSet 0 0 0
madura func maduraFuncRxTxEnableSet 0 15 15
madura func maduraFuncRxTxEnableGet 0



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {PLL status check}>
<data>
#PLL check, D0:DEV CLK, D1:LO1, D2:LO2, D3:AUXLO, 1 lock, 0 unlock
madura func maduraFuncPllStatusGet 0
madura func maduraFuncPllStatusGet 1

#madura func maduraFuncPllStatusGet <trx_id>
madura func maduraFuncPllStatusGet 0
madura func maduraFuncPllStatusGet 1
#madura func maduraFuncInitCalsDetailedStatusGet <trx_id>
madura func maduraFuncInitCalsDetailedStatusGet 0
madura func maduraFuncInitCalsDetailedStatusGet 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {Madura Init 3}>
<data>
madura func maduraInitCpuImageLoad 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {Madura Init 8}>
<data>
#PreJesdBringUp
#================================================================

#Fpga reset cpll, reset serdes, config rate
# Reset FPGA Serdes(chipset 0)
hal fpga writefield 0x00000C04 0x00000001 0x1
hal fpga writefield 0x00000C04 0x00000001 0x0
hal fpga writefield 0x00000D04 0x00000001 0x1
hal fpga writefield 0x00000D04 0x00000001 0x0
# Reset FPGA Serdes(chipset 1)
hal fpga writefield 0x00000E04 0x00000001 0x1
hal fpga writefield 0x00000E04 0x00000001 0x0
hal fpga writefield 0x00000F04 0x00000001 0x1
hal fpga writefield 0x00000F04 0x00000001 0x0

#Required 5ms delay for PLL lock - FD 4/155 16-CNH 160 8986-1
%d 5

#Check FPGA CPLL lock status(chipset 0)(locked:1)
hal fpga readfield 0x00000C08 0x00000001
hal fpga readfield 0x00000D08 0x00000001
#Check FPGA CPLL lock status(chipset 1)(locked:1)
hal fpga readfield 0x00000E08 0x00000001
hal fpga readfield 0x00000F08 0x00000001

#JESD lane(chipset 0)
hal fpga writefield 0x00000C14 0x00001f00 0x2
hal fpga writefield 0x00000C14 0x01000000 0x1
hal fpga writefield 0x00000C14 0x00000007 0x7
hal fpga writefield 0x00000C14 0x00000007 0x0
hal fpga writefield 0x00000C14 0x00400000 0x1
hal fpga writefield 0x00000C14 0x00400000 0x0

hal fpga writefield 0x00000C30 0x00001f00 0x2
hal fpga writefield 0x00000C30 0x01000000 0x1
hal fpga writefield 0x00000C30 0x00000007 0x7
hal fpga writefield 0x00000C30 0x00000007 0x0
hal fpga writefield 0x00000C30 0x00400000 0x1
hal fpga writefield 0x00000C30 0x00400000 0x0

hal fpga writefield 0x00000D14 0x00001f00 0x2
hal fpga writefield 0x00000D14 0x01000000 0x1
hal fpga writefield 0x00000D14 0x00000007 0x7
hal fpga writefield 0x00000D14 0x00000007 0x0
hal fpga writefield 0x00000D14 0x00400000 0x1
hal fpga writefield 0x00000D14 0x00400000 0x0

hal fpga writefield 0x00000D30 0x00001f00 0x2
hal fpga writefield 0x00000D30 0x01000000 0x1
hal fpga writefield 0x00000D30 0x00000007 0x7
hal fpga writefield 0x00000D30 0x00000007 0x0
hal fpga writefield 0x00000D30 0x00400000 0x1
hal fpga writefield 0x00000D30 0x00400000 0x0

#JESD lane(chipset 1)
hal fpga writefield 0x00000E14 0x00001f00 0x2
hal fpga writefield 0x00000E14 0x01000000 0x1
hal fpga writefield 0x00000E14 0x00000007 0x7
hal fpga writefield 0x00000E14 0x00000007 0x0
hal fpga writefield 0x00000E14 0x00400000 0x1
hal fpga writefield 0x00000E14 0x00400000 0x0

hal fpga writefield 0x00000E30 0x00001f00 0x2
hal fpga writefield 0x00000E30 0x01000000 0x1
hal fpga writefield 0x00000E30 0x00000007 0x7
hal fpga writefield 0x00000E30 0x00000007 0x0
hal fpga writefield 0x00000E30 0x00400000 0x1
hal fpga writefield 0x00000E30 0x00400000 0x0

hal fpga writefield 0x00000F14 0x00001f00 0x2
hal fpga writefield 0x00000F14 0x01000000 0x1
hal fpga writefield 0x00000F14 0x00000007 0x7
hal fpga writefield 0x00000F14 0x00000007 0x0
hal fpga writefield 0x00000F14 0x00400000 0x1
hal fpga writefield 0x00000F14 0x00400000 0x0

hal fpga writefield 0x00000F30 0x00001f00 0x2
hal fpga writefield 0x00000F30 0x01000000 0x1
hal fpga writefield 0x00000F30 0x00000007 0x7
hal fpga writefield 0x00000F30 0x00000007 0x0
hal fpga writefield 0x00000F30 0x00400000 0x1
hal fpga writefield 0x00000F30 0x00400000 0x0

#Rate configuration(chipset 0 --- 245.76M)
#tx
hal fpga write 0x0000041c 0x03000000
hal fpga write 0x00000420 0x0F071F03
hal fpga write 0x00000424 0x4C00202F
#rx
hal fpga write 0x0000081c 0x00009C1C
hal fpga write 0x00000820 0x1F030300
hal fpga write 0x00000824 0x202F8D07
hal fpga write 0x00000828 0x4C000000

#tx
hal fpga write 0x0000051c 0x03000000
hal fpga write 0x00000520 0x0F071F03
hal fpga write 0x00000524 0x4C00202F
#rx
hal fpga write 0x0000091c 0x00009C1C
hal fpga write 0x00000920 0x1F030300
hal fpga write 0x00000924 0x202F8D07
hal fpga write 0x00000928 0x4C000000

#Rate configuration(chipset 1 --- 122.88M)
#tx
hal fpga write 0x0000061c 0x01000000
hal fpga write 0x00000620 0x0F070F07
hal fpga write 0x00000624 0x3E00202F
#rx
hal fpga write 0x00000A1c 0x00009C1C
hal fpga write 0x00000A20 0x0F070100
hal fpga write 0x00000A24 0x202F8D07
hal fpga write 0x00000A28 0x3E000000

#tx
hal fpga write 0x0000071c 0x01000000
hal fpga write 0x00000720 0x0F070F07
hal fpga write 0x00000724 0x3E00202F
#rx
hal fpga write 0x00000B1c 0x00009C1C
hal fpga write 0x00000B20 0x0F070100
hal fpga write 0x00000B24 0x202F8D07
hal fpga write 0x00000B28 0x3E000000

#JESD_IQ_SAMPLE_Rate_Serdes
#chip0_245.76
hal fpga write 0xC44 0x0
hal fpga write 0xD44 0x0
#chip1_122.88
hal fpga write 0xE44 0xF0
hal fpga write 0xF44 0xF0

#JESD_IQ_SAMPLE_Rate_TX
#chip0_245.76
hal fpga write 0x484 0x0
hal fpga write 0x584 0x0
#chip1_122.88
hal fpga write 0x684 0xF0
hal fpga write 0x784 0xF0

#JESD_IQ_SAMPLE_Rate_RX
#chip0_245.76
hal fpga write 0x888 0x0
hal fpga write 0x988 0x0
#chip1_122.88
hal fpga write 0xA88 0x1
hal fpga write 0xB88 0x1

#Madura serdes reset
madura func maduraInitSerializerReset 0
madura func maduraInitSerializerReset 1

#Disable RFIC deframer0 and all framer sysref switch
madura func maduraFuncDeframerSysrefCtrlSet 0 1 0
madura func maduraFuncFramerSysrefCtrlSet 0 7 0
madura func maduraFuncDeframerSysrefCtrlSet 1 1 0
madura func maduraFuncFramerSysrefCtrlSet 1 7 0

#FPGA sysref for JESD TX&RX disable
#tx enable/disable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 0
#tx enable/disable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 0
#rx enable/disable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 0
#rx enable/disable(chipset 1)
hal fpga writefield 0x00000A7c 0x00008000 0

#tx enable/disable(chipset 0)
hal fpga writefield 0x00000578 0x00008000 0
#tx enable/disable(chipset 1)
hal fpga writefield 0x00000778 0x00008000 0
#rx enable/disable(chipset 0)
hal fpga writefield 0x0000097c 0x00008000 0
#rx enable/disable(chipset 1)
hal fpga writefield 0x00000B7c 0x00008000 0

#FPGA JESD TX disable(chipset 0)
hal fpga write 0x00000428 0xfffffffe
hal fpga write 0x00000528 0xfffffffe
#FPGA JESD TX disable(chipset 1)
hal fpga write 0x00000628 0xfffffffe
hal fpga write 0x00000728 0xfffffffe

#FPGA JESD RX disable(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe
#FPGA JESD RX disable(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe

#Disable RFIC deframer0 and all framer
madura func maduraFuncDfrmLinkStateSet 0 1 0
madura func maduraFuncFramerLinkStateSet 0 7 0
madura func maduraFuncDfrmLinkStateSet 1 1 0
madura func maduraFuncFramerLinkStateSet 1 7 0

#enable continuous sysref
#======================================================


#rficJesdRxBringUp
#======================================================
#RFIC framer reset
madura func maduraFuncFramerLinkStateSet 0 1 0
madura func maduraFuncFramerLinkStateSet 1 1 0
%d 50
madura func maduraFuncFramerLinkStateSet 0 1 1
madura func maduraFuncFramerLinkStateSet 1 1 1
#RFIC framer sysref enable
madura func maduraFuncFramerSysrefCtrlSet 0 1 1
madura func maduraFuncFramerSysrefCtrlSet 1 1 1
%d 100

#FPGA JESD RX diasble(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe
#FPGA JESD RX diasble(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe

#FPGA JESD RX enable(chipset 0)
hal fpga write 0x0000082c 0x801
hal fpga write 0x0000092c 0x801
#FPGA JESD RX enable(chipset 1)
hal fpga write 0x00000A2c 0x801
hal fpga write 0x00000B2c 0x801
#wait 50ms
%d 50

#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 1
hal fpga writefield 0x0000097c 0x00008000 1
#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x00000A7c 0x00008000 1
hal fpga writefield 0x00000B7c 0x00008000 1

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0


#RFIC sysref for JESD RX disable
madura func maduraFuncFramerSysrefCtrlSet 0 1 0
madura func maduraFuncFramerSysrefCtrlSet 1 1 0
#FPGA sysref for JESD RX disable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 0
hal fpga writefield 0x0000097c 0x00008000 0
#FPGA sysref for JESD RX disable(chipset 1)
hal fpga writefield 0x00000A7c 0x00008000 0
hal fpga writefield 0x00000B7c 0x00008000 0

#rficJesdTxBringUp
#=========================================================
#FPGA sysref JESD TX enable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 1
hal fpga writefield 0x00000578 0x00008000 1
#FPGA sysref JESD TX enable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 1
hal fpga writefield 0x00000778 0x00008000 1
#FPGA JESD TX disable(chipset 0)
hal fpga write 0x00000428 0xfffffffe
hal fpga write 0x00000528 0xfffffffe
#FPGA JESD TX disable(chipset 1)
hal fpga write 0x00000628 0xfffffffe
hal fpga write 0x00000728 0xfffffffe
#FPGA JESD TX enable(chipset 0)
hal fpga write 0x00000428 0x41
hal fpga write 0x00000528 0x41
#FPGA JESD TX enable(chipset 1)
hal fpga write 0x00000628 0x41
hal fpga write 0x00000728 0x41
%d 50

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

#FPGA sysref for JESD TX disable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 0
hal fpga writefield 0x00000578 0x00008000 0
#FPGA sysref for JESD TX disable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 0
hal fpga writefield 0x00000778 0x00008000 0
#RFIC Deframer reset
madura func maduraFuncDfrmLinkStateSet 0 1 0
madura func maduraFuncDfrmLinkStateSet 1 1 0
#wait 50ms
%d 50
madura func maduraFuncDfrmLinkStateSet 0 1 1
madura func maduraFuncDfrmLinkStateSet 1 1 1
#RFIC sysref for deframer enable
madura func maduraFuncDeframerSysrefCtrlSet 0 1 1
madura func maduraFuncDeframerSysrefCtrlSet 1 1 1

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

#RFIC sysref for deframer disable
madura func maduraFuncDeframerSysrefCtrlSet 0 1 0
madura func maduraFuncDeframerSysrefCtrlSet 1 1 0

# disable continuous sysref
#=============================================================


#postJesdBringUp
#=============================================================
#Get RFIC Deframer status
madura func maduraFuncDfrmLinkConditionGet 0 1
madura func maduraFuncDfrmLinkConditionGet 1 1
#Get FPGA JESD RX status(chipset 0 --- 245.76M: 0x11010)
hal fpga readfield 0x0000084c 0x0007701f
hal fpga readfield 0x0000094c 0x0007701f

#Get FPGA JESD RX status(chipset 1 --- 122.88M: 0x11010)
hal fpga readfield 0x00000A4c 0x0007701f
hal fpga readfield 0x00000B4c 0x0007701f


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {Madura Init 8 chip1}>
<data>
#PreJesdBringUp
#================================================================

#Fpga reset cpll, reset serdes, config rate

# Reset FPGA Serdes(chipset 1)
hal fpga writefield 0x00000E04 0x00000001 0x1
hal fpga writefield 0x00000E04 0x00000001 0x0
hal fpga writefield 0x00000F04 0x00000001 0x1
hal fpga writefield 0x00000F04 0x00000001 0x0

#Required 5ms delay for PLL lock - FD 4/155 16-CNH 160 8986-1
%d 5


#Check FPGA CPLL lock status(chipset 1)(locked:1)
hal fpga readfield 0x00000E08 0x00000001
hal fpga readfield 0x00000F08 0x00000001


#JESD lane(chipset 1)
hal fpga writefield 0x00000E14 0x00001f00 0x2
hal fpga writefield 0x00000E14 0x01000000 0x1
hal fpga writefield 0x00000E14 0x00000007 0x7
hal fpga writefield 0x00000E14 0x00000007 0x0
hal fpga writefield 0x00000E14 0x00400000 0x1
hal fpga writefield 0x00000E14 0x00400000 0x0

hal fpga writefield 0x00000E30 0x00001f00 0x2
hal fpga writefield 0x00000E30 0x01000000 0x1
hal fpga writefield 0x00000E30 0x00000007 0x7
hal fpga writefield 0x00000E30 0x00000007 0x0
hal fpga writefield 0x00000E30 0x00400000 0x1
hal fpga writefield 0x00000E30 0x00400000 0x0

hal fpga writefield 0x00000F14 0x00001f00 0x2
hal fpga writefield 0x00000F14 0x01000000 0x1
hal fpga writefield 0x00000F14 0x00000007 0x7
hal fpga writefield 0x00000F14 0x00000007 0x0
hal fpga writefield 0x00000F14 0x00400000 0x1
hal fpga writefield 0x00000F14 0x00400000 0x0

hal fpga writefield 0x00000F30 0x00001f00 0x2
hal fpga writefield 0x00000F30 0x01000000 0x1
hal fpga writefield 0x00000F30 0x00000007 0x7
hal fpga writefield 0x00000F30 0x00000007 0x0
hal fpga writefield 0x00000F30 0x00400000 0x1
hal fpga writefield 0x00000F30 0x00400000 0x0



#Rate configuration(chipset 1 --- 122.88M)
#tx
hal fpga write 0x0000061c 0x01000000
hal fpga write 0x00000620 0x0F070F07
hal fpga write 0x00000624 0x3E00202F
#rx
hal fpga write 0x00000A1c 0x00009C1C
hal fpga write 0x00000A20 0x0F070100
hal fpga write 0x00000A24 0x202F8D07
hal fpga write 0x00000A28 0x3E000000

#tx
hal fpga write 0x0000071c 0x01000000
hal fpga write 0x00000720 0x0F070F07
hal fpga write 0x00000724 0x3E00202F
#rx
hal fpga write 0x00000B1c 0x00009C1C
hal fpga write 0x00000B20 0x0F070100
hal fpga write 0x00000B24 0x202F8D07
hal fpga write 0x00000B28 0x3E000000

#JESD_IQ_SAMPLE_Rate_Serdes

#chip1_122.88
hal fpga write 0xE44 0xF0
hal fpga write 0xF44 0xF0

#JESD_IQ_SAMPLE_Rate_TX

#chip1_122.88
hal fpga write 0x684 0xF0
hal fpga write 0x784 0xF0

#JESD_IQ_SAMPLE_Rate_RX

#chip1_122.88
hal fpga write 0xA88 0x1
hal fpga write 0xB88 0x1

#Madura serdes reset

madura func maduraInitSerializerReset 1

#Disable RFIC deframer0 and all framer sysref switch

madura func maduraFuncDeframerSysrefCtrlSet 1 1 0
madura func maduraFuncFramerSysrefCtrlSet 1 7 0

#FPGA sysref for JESD TX&RX disable

#tx enable/disable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 0

#rx enable/disable(chipset 1)
hal fpga writefield 0x00000A7c 0x00008000 0


#tx enable/disable(chipset 1)
hal fpga writefield 0x00000778 0x00008000 0

#rx enable/disable(chipset 1)
hal fpga writefield 0x00000B7c 0x00008000 0


#FPGA JESD TX disable(chipset 1)
hal fpga write 0x00000628 0xfffffffe
hal fpga write 0x00000728 0xfffffffe


#FPGA JESD RX disable(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe

#Disable RFIC deframer0 and all framer

madura func maduraFuncDfrmLinkStateSet 1 1 0
madura func maduraFuncFramerLinkStateSet 1 7 0

#enable continuous sysref
#======================================================


#rficJesdRxBringUp
#======================================================
#RFIC framer reset

madura func maduraFuncFramerLinkStateSet 1 1 0
%d 50

madura func maduraFuncFramerLinkStateSet 1 1 1
#RFIC framer sysref enable

madura func maduraFuncFramerSysrefCtrlSet 1 1 1
%d 100


#FPGA JESD RX diasble(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe


#FPGA JESD RX enable(chipset 1)
hal fpga write 0x00000A2c 0x801
hal fpga write 0x00000B2c 0x801
#wait 50ms
%d 50


#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x00000A7c 0x00008000 1
hal fpga writefield 0x00000B7c 0x00008000 1

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0


#RFIC sysref for JESD RX disable

madura func maduraFuncFramerSysrefCtrlSet 1 1 0

#FPGA sysref for JESD RX disable(chipset 1)
hal fpga writefield 0x00000A7c 0x00008000 0
hal fpga writefield 0x00000B7c 0x00008000 0

#rficJesdTxBringUp
#=========================================================

#FPGA sysref JESD TX enable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 1
hal fpga writefield 0x00000778 0x00008000 1

#FPGA JESD TX disable(chipset 1)
hal fpga write 0x00000628 0xfffffffe
hal fpga write 0x00000728 0xfffffffe

#FPGA JESD TX enable(chipset 1)
hal fpga write 0x00000628 0x41
hal fpga write 0x00000728 0x41
%d 50

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0


#FPGA sysref for JESD TX disable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 0
hal fpga writefield 0x00000778 0x00008000 0
#RFIC Deframer reset

madura func maduraFuncDfrmLinkStateSet 1 1 0
#wait 50ms
%d 50

madura func maduraFuncDfrmLinkStateSet 1 1 1
#RFIC sysref for deframer enable

madura func maduraFuncDeframerSysrefCtrlSet 1 1 1

#LTU sysref oneshot 1 time
i2c write clock_synth 14,d3,01
i2c write clock_synth 00,0f,01
%d 100
gpio write PTC 12 0
gpio write PTC 12 1
gpio write PTC 12 0

#RFIC sysref for deframer disable

madura func maduraFuncDeframerSysrefCtrlSet 1 1 0

# disable continuous sysref
#=============================================================


#postJesdBringUp
#=============================================================
#Get RFIC Deframer status

madura func maduraFuncDfrmLinkConditionGet 1 1

#Get FPGA JESD RX status(chipset 1 --- 122.88M: 0x1010)
hal fpga readfield 0x00000A4c 0x0007701f
hal fpga readfield 0x00000B4c 0x0007701f


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {Madura Init 8 CSR}>
<data>

#enable continuous sysref
#======================================================
i2c write clock_synth 14,d2,00
i2c write clock_synth 14,d3,44
i2c write clock_synth 00,0f,01
i2c read clock_synth -s 14,d2 -r 1
i2c read clock_synth -s 14,d3 -r 1

gpio write PTC 12 0

#sysref on, keep gpio 1 will get period SYSREF
gpio write PTC 12 1

#PreJesdBringUp
#================================================================

#Fpga reset cpll, reset serdes, config rate
# Reset FPGA Serdes(chipset 0)
hal fpga writefield 0x00000C04 0x00000001 0x1
hal fpga writefield 0x00000C04 0x00000001 0x0
hal fpga writefield 0x00000D04 0x00000001 0x1
hal fpga writefield 0x00000D04 0x00000001 0x0
# Reset FPGA Serdes(chipset 1)
hal fpga writefield 0x00000E04 0x00000001 0x1
hal fpga writefield 0x00000E04 0x00000001 0x0
hal fpga writefield 0x00000F04 0x00000001 0x1
hal fpga writefield 0x00000F04 0x00000001 0x0

#Required 5ms delay for PLL lock - FD 4/155 16-CNH 160 8986-1
%d 5

#Check FPGA CPLL lock status(chipset 0)(locked:1)
hal fpga readfield 0x00000C08 0x00000001
hal fpga readfield 0x00000D08 0x00000001
#Check FPGA CPLL lock status(chipset 1)(locked:1)
hal fpga readfield 0x00000E08 0x00000001
hal fpga readfield 0x00000F08 0x00000001

#JESD lane(chipset 0)
hal fpga writefield 0x00000C14 0x00001f00 0x2
hal fpga writefield 0x00000C14 0x01000000 0x1
hal fpga writefield 0x00000C14 0x00000007 0x7
hal fpga writefield 0x00000C14 0x00000007 0x0
hal fpga writefield 0x00000C14 0x00400000 0x1
hal fpga writefield 0x00000C14 0x00400000 0x0

hal fpga writefield 0x00000C30 0x00001f00 0x2
hal fpga writefield 0x00000C30 0x01000000 0x1
hal fpga writefield 0x00000C30 0x00000007 0x7
hal fpga writefield 0x00000C30 0x00000007 0x0
hal fpga writefield 0x00000C30 0x00400000 0x1
hal fpga writefield 0x00000C30 0x00400000 0x0

hal fpga writefield 0x00000D14 0x00001f00 0x2
hal fpga writefield 0x00000D14 0x01000000 0x1
hal fpga writefield 0x00000D14 0x00000007 0x7
hal fpga writefield 0x00000D14 0x00000007 0x0
hal fpga writefield 0x00000D14 0x00400000 0x1
hal fpga writefield 0x00000D14 0x00400000 0x0

hal fpga writefield 0x00000D30 0x00001f00 0x2
hal fpga writefield 0x00000D30 0x01000000 0x1
hal fpga writefield 0x00000D30 0x00000007 0x7
hal fpga writefield 0x00000D30 0x00000007 0x0
hal fpga writefield 0x00000D30 0x00400000 0x1
hal fpga writefield 0x00000D30 0x00400000 0x0

#JESD lane(chipset 1)
hal fpga writefield 0x00000E14 0x00001f00 0x2
hal fpga writefield 0x00000E14 0x01000000 0x1
hal fpga writefield 0x00000E14 0x00000007 0x7
hal fpga writefield 0x00000E14 0x00000007 0x0
hal fpga writefield 0x00000E14 0x00400000 0x1
hal fpga writefield 0x00000E14 0x00400000 0x0

hal fpga writefield 0x00000E30 0x00001f00 0x2
hal fpga writefield 0x00000E30 0x01000000 0x1
hal fpga writefield 0x00000E30 0x00000007 0x7
hal fpga writefield 0x00000E30 0x00000007 0x0
hal fpga writefield 0x00000E30 0x00400000 0x1
hal fpga writefield 0x00000E30 0x00400000 0x0

hal fpga writefield 0x00000F14 0x00001f00 0x2
hal fpga writefield 0x00000F14 0x01000000 0x1
hal fpga writefield 0x00000F14 0x00000007 0x7
hal fpga writefield 0x00000F14 0x00000007 0x0
hal fpga writefield 0x00000F14 0x00400000 0x1
hal fpga writefield 0x00000F14 0x00400000 0x0

hal fpga writefield 0x00000F30 0x00001f00 0x2
hal fpga writefield 0x00000F30 0x01000000 0x1
hal fpga writefield 0x00000F30 0x00000007 0x7
hal fpga writefield 0x00000F30 0x00000007 0x0
hal fpga writefield 0x00000F30 0x00400000 0x1
hal fpga writefield 0x00000F30 0x00400000 0x0

#Rate configuration(chipset 0 --- 245.76M)
#tx
hal fpga write 0x0000041c 0x03000000
hal fpga write 0x00000420 0x0F071F03
hal fpga write 0x00000424 0x4C00202F
#rx
hal fpga write 0x0000081c 0x00009C1C
hal fpga write 0x00000820 0x1F030300
hal fpga write 0x00000824 0x202F8D07
hal fpga write 0x00000828 0x4C000000

#tx
hal fpga write 0x0000051c 0x03000000
hal fpga write 0x00000520 0x0F071F03
hal fpga write 0x00000524 0x4C00202F
#rx
hal fpga write 0x0000091c 0x00009C1C
hal fpga write 0x00000920 0x1F030300
hal fpga write 0x00000924 0x202F8D07
hal fpga write 0x00000928 0x4C000000

#Rate configuration(chipset 1 --- 122.88M)
#tx
hal fpga write 0x0000061c 0x01000000
hal fpga write 0x00000620 0x0F070F07
hal fpga write 0x00000624 0x3E00202F
#rx
hal fpga write 0x00000A1c 0x00009C1C
hal fpga write 0x00000A20 0x0F070100
hal fpga write 0x00000A24 0x202F8D07
hal fpga write 0x00000A28 0x3E000000

#tx
hal fpga write 0x0000071c 0x01000000
hal fpga write 0x00000720 0x0F070F07
hal fpga write 0x00000724 0x3E00202F
#rx
hal fpga write 0x00000B1c 0x00009C1C
hal fpga write 0x00000B20 0x0F070100
hal fpga write 0x00000B24 0x202F8D07
hal fpga write 0x00000B28 0x3E000000

#JESD_IQ_SAMPLE_Rate_Serdes
#chip0_245.76
hal fpga write 0xC44 0x0
hal fpga write 0xD44 0x0
#chip1_122.88
hal fpga write 0xE44 0xF0
hal fpga write 0xF44 0xF0

#JESD_IQ_SAMPLE_Rate_TX
#chip0_245.76
hal fpga write 0x484 0x0
hal fpga write 0x584 0x0
#chip1_122.88
hal fpga write 0x684 0xF0
hal fpga write 0x784 0xF0

#JESD_IQ_SAMPLE_Rate_RX
#chip0_245.76
hal fpga write 0x888 0x0
hal fpga write 0x988 0x0
#chip1_122.88
hal fpga write 0xA88 0x1
hal fpga write 0xB88 0x1

#Madura serdes reset
madura func maduraInitSerializerReset 0
madura func maduraInitSerializerReset 1

#Disable RFIC deframer0 and all framer sysref switch
madura func maduraFuncDeframerSysrefCtrlSet 0 1 0
madura func maduraFuncFramerSysrefCtrlSet 0 7 0
madura func maduraFuncDeframerSysrefCtrlSet 1 1 0
madura func maduraFuncFramerSysrefCtrlSet 1 7 0

#FPGA sysref for JESD TX&RX disable
#tx enable/disable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 0
#tx enable/disable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 0
#rx enable/disable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 0
#rx enable/disable(chipset 1)
hal fpga writefield 0x00000A7c 0x00008000 0

#tx enable/disable(chipset 0)
hal fpga writefield 0x00000578 0x00008000 0
#tx enable/disable(chipset 1)
hal fpga writefield 0x00000778 0x00008000 0
#rx enable/disable(chipset 0)
hal fpga writefield 0x0000097c 0x00008000 0
#rx enable/disable(chipset 1)
hal fpga writefield 0x00000B7c 0x00008000 0

#FPGA JESD TX disable(chipset 0)
hal fpga write 0x00000428 0xfffffffe
hal fpga write 0x00000528 0xfffffffe
#FPGA JESD TX disable(chipset 1)
hal fpga write 0x00000628 0xfffffffe
hal fpga write 0x00000728 0xfffffffe

#FPGA JESD RX disable(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe
#FPGA JESD RX disable(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe

#Disable RFIC deframer0 and all framer
madura func maduraFuncDfrmLinkStateSet 0 1 0
madura func maduraFuncFramerLinkStateSet 0 7 0
madura func maduraFuncDfrmLinkStateSet 1 1 0
madura func maduraFuncFramerLinkStateSet 1 7 0


#rficJesdRxBringUp
#======================================================
#RFIC framer reset
madura func maduraFuncFramerLinkStateSet 0 1 0
madura func maduraFuncFramerLinkStateSet 1 1 0
%d 50
madura func maduraFuncFramerLinkStateSet 0 1 1
madura func maduraFuncFramerLinkStateSet 1 1 1
#RFIC framer sysref enable
madura func maduraFuncFramerSysrefCtrlSet 0 1 1
madura func maduraFuncFramerSysrefCtrlSet 1 1 1
%d 100

#FPGA JESD RX diasble(chipset 0)
hal fpga write 0x0000082c 0xfffffffe
hal fpga write 0x0000092c 0xfffffffe
#FPGA JESD RX diasble(chipset 1)
hal fpga write 0x00000A2c 0xfffffffe
hal fpga write 0x00000B2c 0xfffffffe

#FPGA JESD RX enable(chipset 0)
hal fpga write 0x0000082c 0x801
hal fpga write 0x0000092c 0x801
#FPGA JESD RX enable(chipset 1)
hal fpga write 0x00000A2c 0x801
hal fpga write 0x00000B2c 0x801
#wait 50ms
%d 50

#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 1
hal fpga writefield 0x0000097c 0x00008000 1
#FPGA sysref for JESD RX enable(chipset 0)
hal fpga writefield 0x00000A7c 0x00008000 1
hal fpga writefield 0x00000B7c 0x00008000 1

#LTU sysref oneshot 1 time
#i2c write clock_synth 14,d3,01
#i2c write clock_synth 00,0f,01
#%d 100
#gpio write PTC 12 0
#gpio write PTC 12 1
#gpio write PTC 12 0


#RFIC sysref for JESD RX disable
madura func maduraFuncFramerSysrefCtrlSet 0 1 0
madura func maduraFuncFramerSysrefCtrlSet 1 1 0
#FPGA sysref for JESD RX disable(chipset 0)
hal fpga writefield 0x0000087c 0x00008000 0
hal fpga writefield 0x0000097c 0x00008000 0
#FPGA sysref for JESD RX disable(chipset 1)
hal fpga writefield 0x00000A7c 0x00008000 0
hal fpga writefield 0x00000B7c 0x00008000 0

#rficJesdTxBringUp
#=========================================================
#FPGA sysref JESD TX enable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 1
hal fpga writefield 0x00000578 0x00008000 1
#FPGA sysref JESD TX enable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 1
hal fpga writefield 0x00000778 0x00008000 1
#FPGA JESD TX disable(chipset 0)
hal fpga write 0x00000428 0xfffffffe
hal fpga write 0x00000528 0xfffffffe
#FPGA JESD TX disable(chipset 1)
hal fpga write 0x00000628 0xfffffffe
hal fpga write 0x00000728 0xfffffffe
#FPGA JESD TX enable(chipset 0)
hal fpga write 0x00000428 0x41
hal fpga write 0x00000528 0x41
#FPGA JESD TX enable(chipset 1)
hal fpga write 0x00000628 0x41
hal fpga write 0x00000728 0x41
%d 50

#LTU sysref oneshot 1 time
#i2c write clock_synth 14,d3,01
#i2c write clock_synth 00,0f,01
#%d 100
#gpio write PTC 12 0
#gpio write PTC 12 1
#gpio write PTC 12 0

#FPGA sysref for JESD TX disable(chipset 0)
hal fpga writefield 0x00000478 0x00008000 0
hal fpga writefield 0x00000578 0x00008000 0
#FPGA sysref for JESD TX disable(chipset 1)
hal fpga writefield 0x00000678 0x00008000 0
hal fpga writefield 0x00000778 0x00008000 0
#RFIC Deframer reset
madura func maduraFuncDfrmLinkStateSet 0 1 0
madura func maduraFuncDfrmLinkStateSet 1 1 0
#wait 50ms
%d 50
madura func maduraFuncDfrmLinkStateSet 0 1 1
madura func maduraFuncDfrmLinkStateSet 1 1 1
#RFIC sysref for deframer enable
madura func maduraFuncDeframerSysrefCtrlSet 0 1 1
madura func maduraFuncDeframerSysrefCtrlSet 1 1 1

#LTU sysref oneshot 1 time
#i2c write clock_synth 14,d3,01
#i2c write clock_synth 00,0f,01
#%d 100
#gpio write PTC 12 0
#gpio write PTC 12 1
#gpio write PTC 12 0

#RFIC sysref for deframer disable
madura func maduraFuncDeframerSysrefCtrlSet 0 1 0
madura func maduraFuncDeframerSysrefCtrlSet 1 1 0


#postJesdBringUp
#=============================================================
#Get RFIC Deframer status
madura func maduraFuncDfrmLinkConditionGet 0 1
madura func maduraFuncDfrmLinkConditionGet 1 1
#Get FPGA JESD RX status(chipset 0 --- 245.76M: 0x11010)
hal fpga readfield 0x0000084c 0x0007701f
hal fpga readfield 0x0000094c 0x0007701f

#Get FPGA JESD RX status(chipset 1 --- 122.88M: 0x1010)
hal fpga readfield 0x00000A4c 0x0007701f
hal fpga readfield 0x00000B4c 0x0007701f

# disable continuous sysref
#=============================================================
gpio write PTC 12 0

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {28} {Madura Rx Power Meter}>
<data>
madura func maduraFuncRxDecPowerGet 0 1
madura func maduraFuncRxDecPowerGet 0 2
madura func maduraFuncRxDecPowerGet 0 4
madura func maduraFuncRxDecPowerGet 0 8


madura func maduraFuncRxDecPowerGet 1 1
madura func maduraFuncRxDecPowerGet 1 2
madura func maduraFuncRxDecPowerGet 1 4
madura func maduraFuncRxDecPowerGet 1 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {madura_2}>
<button {0} {prbs err cnt get}>
<data>
rfic func DfrmPrbsErrCountGet 0
rfic func DfrmPrbsErrCountGet 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {rfic prbs reset&check}>
<data>
rfic func DfrmPrbsCountReset 0
rfic func DfrmPrbsErrCountGet 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {204B RX PRBS TEST G1}>
<data>
#ps: 4455/4453 hardware connection,FPGA G1 connect to RFIC0 G2.
rfic func FramerTestDataGet 0 1
%delay 10
rfic func FramerLinkStateSet 0 1 1
%delay 10

rfic func FramerTestDataSet 0 1 7 1
%delay 10
rfic func FramerTestDataGet 0 1

#set fpga prbs7 tx and checker
hal fpga write 0xd18 0x1010
hal fpga write 0xd34 0x1010
%delay 10
#reset fpga rx path
hal fpga write 0xd14 0x1000104
hal fpga write 0xd14 0x1000100
%delay 10
hal fpga write 0xd30 0x1000104
hal fpga write 0xd30 0x1000100


%delay 10
#read fpga rx err cnt
hal fpga read 0xd24
hal fpga read 0xd40

%delay 10
#insert err 
rfic func FramerTestDataInjectError 0 1 0xFF
rfic func FramerTestDataInjectError 0 1 0x00
%delay 10
#read fpga rx cdr bit17
hal fpga write 0xd1c 0xFFFFFFFF
hal fpga write 0xd38 0xFFFFFFFF
%delay 10
hal fpga read 0xd1c
hal fpga read 0xd38


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {prbs err count reset}>
<data>
rfic func DfrmPrbsCountReset 0
rfic func DfrmPrbsCountReset 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {204B TX PRBS TEST G1/G2}>
<data>
#204B TX
#chip0,G1 TX 0/1
hal fpga write 0xc18 0x1010
hal fpga write 0xc34 0x1010
#chip0,G2 TX 0/1
hal fpga write 0xd18 0x1010
hal fpga write 0xd34 0x1010


#rfic prbs7 checker
rfic func DfrmPrbsCheckerStateSet 0 1 1 0
rfic func DfrmPrbsCountReset 0
rfic func DfrmPrbsErrCountGet 0

#force err
hal fpga write 0xc18 0x1011
hal fpga write 0xc18 0x1010

hal fpga write 0xc34 0x1011
hal fpga write 0xc34 0x1010

hal fpga write 0xd18 0x1011
hal fpga write 0xd18 0x1010

hal fpga write 0xd34 0x1011
hal fpga write 0xd34 0x1010

rfic func DfrmPrbsErrCountGet 0

#4455/53 G2 did not use
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {204B RX PRBS TEST G2}>
<data>
#enable rfic tx prbs7
rfic func FramerTestDataGet 0 1
rfic func FramerLinkStateSet 0 1 1
%delay 10
rfic func FramerTestDataSet 0 1 7 1
rfic func FramerTestDataGet 0 1
%delay 10
#set fpga prbs7 tx and checker
hal fpga write 0xc18 0x1010
hal fpga write 0xc34 0x1010
%delay 10
#reset fpga rx path
hal fpga write 0xc14 0x1000104
hal fpga write 0xc14 0x1000100
%delay 10
hal fpga write 0xc30 0x1000104
hal fpga write 0xc30 0x1000100
%delay 10
#read fpga rx err cnt
hal fpga read 0xc24
hal fpga read 0xc40

%delay 10
#insert err 
rfic func FramerTestDataInjectError 0 1 0xFF
rfic func FramerTestDataInjectError 0 1 0x00
%delay 10
#read fpga rx cdr bit17
hal fpga write 0xc1c 0xFFFFFFFF
hal fpga write 0xc38 0xFFFFFFFF
%delay 10
hal fpga read 0xc1c
hal fpga read 0xc38

#4455/4453 RFIC G2 did not use
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {rfic func SrlCfgGet }>
<data>
rfic func SrlCfgGet 0 1
rfic func SrlCfgGet 0 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {204B RX PRBS TEST G3}>
<data>
rfic func FramerLinkStateSet 1 1 1
rfic func FramerTestDataSet 1 1 7 1
%delay 10
##set fpga prbs7 tx and checker
hal fpga write 0xf34 0x1010
hal fpga write 0xe34 0x1010
%delay 10
#reset fpga rx path
hal fpga write 0xf30 0x1000104
hal fpga write 0xf30 0x1000100
%delay 10
hal fpga write 0xe30 0x1000104
hal fpga write 0xe30 0x1000100
%delay 10
#read fpga rx err cnt
hal fpga read 0xf40
hal fpga read 0xe40
%delay 10
#insert err 
rfic func FramerTestDataInjectError 1 1 0xFF
rfic func FramerTestDataInjectError 1 1 0x00
%delay 10
#read fpga rx cdr bit17
hal fpga write 0xf38 0xFFFFFFFF
hal fpga write 0xe38 0xFFFFFFFF
%delay 10
hal fpga read 0xf38
hal fpga read 0xe38
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {204B DAC PRBS TEST LINK0 L0}>
<data>
#Enable prbs7 trx at FPGA link0_lane0 :
hal fpga writed 0xc18 0x00001010
#rfic prbs checker set
rfic func DfrmPrbsCheckerStateSet 0 1 1 0
#clear prbs err cnt
rfic func DfrmPrbsCountReset 0
#read prbs err cnt
rfic func DfrmPrbsErrCountGet 0




#fpga insert err
hal fpga writed 0xc18 0x00001011
hal fpga writed 0xc18 0x00001010
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {204B TX PRBS TEST G3/G4}>
<data>
#chip1,G3 TX 0/1 prbs7
hal fpga write 0xe18 0x1010
hal fpga write 0xe34 0x1010
#chip1,G4 TX 0/1 prbs7
hal fpga write 0xf18 0x1010
hal fpga write 0xf34 0x1010

#rfic rx set prbs7
rfic func DfrmPrbsCheckerStateSet 1 1 1 0
rfic func DfrmPrbsCountReset 1
rfic func DfrmPrbsErrCountGet 1


#insert err
hal fpga write 0xe18 0x1011
hal fpga write 0xe18 0x1010

hal fpga write 0xe34 0x1011
hal fpga write 0xe34 0x1010

hal fpga write 0xf18 0x1011
hal fpga write 0xf18 0x1010

hal fpga write 0xf34 0x1011
hal fpga write 0xf34 0x1010


rfic func DfrmPrbsErrCountGet 1

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {204B RX PRBS TEST G4}>
<data>
rfic func FramerLinkStateSet 1 1 1
rfic func FramerTestDataSet 1 1 7 1
%delay 10
##set fpga prbs7 tx and checker
hal fpga write 0xf18 0x1010
hal fpga write 0xe18 0x1010
%delay 10
#reset fpga rx path
hal fpga write 0xf14 0x1000104
hal fpga write 0xf14 0x1000100
%delay 10
hal fpga write 0xe14 0x1000104
hal fpga write 0xe14 0x1000100
%delay 10
#read fpga rx err cnt
hal fpga read 0xf24
hal fpga read 0xe24
%delay 10
#insert err 
rfic func FramerTestDataInjectError 1 1 0xFF
rfic func FramerTestDataInjectError 1 1 0x00
%delay 10
#read fpga rx cdr bit17
hal fpga write 0xf1c 0xFFFFFFFF
hal fpga write 0xe1c 0xFFFFFFFF
%delay 10
hal fpga read 0xf1c
hal fpga read 0xe1c
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {204B ADC PRBS TEST LINK0 L0}>
<data>
#Enable prbs7 tx at RFIC link0 L0
rfic func FramerTestDataSet 0 1 7 0
#enable prbs7 checker at fpga side
hal fpga writed 0xc18 0x00001010
#reset fpga rx
hal fpga writed 0xc14 0x1000104
#read fpga err cnt
hal fpga read 0xc24
#rfic instert err 
rfic func FramerTestDataInjectError 0 1 0xff
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {log_sw}>
<button {0} {telog print all}>
<data>
log print all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {switch to pis}>
<data>
scoreboard requested pis
system reset

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {ev_log print all}>
<data>
ev_log print all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {revision}>
<data>
rev
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {log clear}>
<data>
log clear
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {system reset}>
<data>
system reset
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {ev_log clear}>
<data>
ev_log clear
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {db reparse}>
<data>
db reparse
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {log print all}>
<data>
log print all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {db write}>
<data>
db write_string /brd/hwPid "KRY 901 536/1"
db write_string /brd/hwName "RD453B78B3B7"
db write_string /brd/hwRev "P1A"
db write_string /brd/hwDate "20220419"
db write_string /brd/hwSerNo "xxxxxxxxxx"
db write_string /brd/hwMarketName "Dot 4453 B78K B3 B7"



db write_string /brd/trx1A/antenna "antA"
db write_string /brd/trx1B/antenna "antB"
db write_string /brd/trx2A/antenna "antC"
db write_string /brd/trx2B/antenna "antD"
db write_string /brd/trx3A/antenna "antE"
db write_string /brd/trx3B/antenna "antF"
db write_string /brd/trx4A/antenna "antG"
db write_string /brd/trx4B/antenna "antH"
db write_string /brd/trx1A/band "BandIII"
db write_string /brd/trx1B/band "BandIII"
db write_string /brd/trx2A/band "BandVII"
db write_string /brd/trx2B/band "BandVII"
db write_string /brd/trx3A/band "Band78.K"
db write_string /brd/trx3B/band "Band78.K"
db write_string /brd/trx4A/band "Band78.K"
db write_string /brd/trx4B/band "Band78.K"



db write /brd/trx1A/duplexMode 0
db write /brd/trx1B/duplexMode 0
db write /brd/trx2A/duplexMode 0
db write /brd/trx2B/duplexMode 0
db write /brd/trx3A/duplexMode 1
db write /brd/trx3B/duplexMode 1
db write /brd/trx4A/duplexMode 1
db write /brd/trx4B/duplexMode 1
db write_string /brd/trx1/bbif "BBIF0"
db write_string /brd/trx2/bbif "BBIF1"
db write_string /brd/trx3/bbif "BBIF2"
db write_string /brd/trx4/bbif "BBIF3"



db write /brd/trx1A/paccSupport 1
db write /brd/trx1B/paccSupport 1
db write /brd/trx2A/paccSupport 1
db write /brd/trx2B/paccSupport 1
db write /brd/trx3A/paccSupport 1
db write /brd/trx3B/paccSupport 1
db write /brd/trx4A/paccSupport 1
db write /brd/trx4B/paccSupport 1



db write /brd/trx1A/paccChipId 0
db write /brd/trx1B/paccChipId 0
db write /brd/trx2A/paccChipId 0
db write /brd/trx2B/paccChipId 0
db write /brd/trx3A/paccChipId 1
db write /brd/trx3B/paccChipId 1
db write /brd/trx4A/paccChipId 1
db write /brd/trx4B/paccChipId 1



db write /brd/noOfBranches 8
db write_string /brd/macAddress "00:00:00:00:00:00"
db write /brd/noOfRJ45Ports 1



db write_string /brd/fpga/defFPGA "CXC 174 3456/2"
db write_string /brd/defLmName "CXC 112 4419/15"
db write_string /brd/ethernetPhyFw "CXC 112 4543/2"
db write_string /brd/trx1/rficFw "CXC 112 4536/2"
db write_string /brd/trx2/rficFw "CXC 112 4536/2"
db write_string /brd/trx3/rficFw "CXC 112 4536/2"
db write_string /brd/trx4/rficFw "CXC 112 4536/2"

db write_string /brd/pisLmName "CXP 902 9578/11"
db read /brd/pisLmName
db write /brd/pisAvailable 1
db write_string /brd/designDbProdNum "CXC 112 4542/6"
db write_string /brd/dpdDbProdNum "CXC 112 4576/5"



db write_string /brd/componentConfigId "rdTVK_9.8.0 rdPACC_2.0.0"
db write /brd/maxCapacityPhyRate 10000
db write_array /brd/supportedPhyRates 0 1000 2500 5000 10000 0 0
db write /brd/numberOfTrxDevice 4
db sync
system reset




#=====B3E UL===
db write /trx1A/ul/ref_Fq 17475000
db write /ul/refInputDigPower -6000
db write /trx1A/ul/fpga/iqPower 3198
db write /trx1A/ul/g3/gainRef 23
db write /trx1A/ul/gainRef 10029
db read /trx1A/ul/gainRef
db resize /trx1A/ul/gainVsFq_gain 20
db resize /trx1A/ul/gainVsFq_gain 15
db write_array /trx1A/ul/gainVsFq_gain 0 -271 -246 -171 -69 -9 9 -5 0 -14 -31 -30 -16 -53 -71 -132
db resize /trx1A/ul/measuredFreq 19
db resize /trx1A/ul/measuredFreq 15
db write_array /trx1A/ul/measuredFreq 0 17125000 17175000 17225000 17275000 17325000 17375000 17425000 17475000 17525000 17575000 17625000 17675000 17725000 17775000 17825000



db write /trx1B/ul/ref_Fq 17475000
db write /trx1B/ul/fpga/iqPower 3199
db write /trx1B/ul/g3/gainRef 73
db read /trx1B/ul/g3/gainRef
db write /trx1B/ul/gainRef 10030
db resize /trx1B/ul/gainVsFq_gain 20
db resize /trx1B/ul/gainVsFq_gain 15
db write_array /trx2B/ul/gainVsFq_gain 0 -151 -94 6 35 25 24 -19 0 0 52 104 118 79 -9 -131
db resize /trx1B/ul/measuredFreq 19
db resize /trx1B/ul/measuredFreq 15
db write_array /trx1B/ul/measuredFreq 0 17125000 17175000 17225000 17275000 17325000 17375000 17425000 17475000 17525000 17575000 17625000 17675000 17725000 17775000 17825000



#====B40A UL====
db write /trx2A/ul/ref_Fq 25325000
db write /ul/refInputDigPower -6000
db write /trx2A/ul/fpga/iqPower 3199
db write /trx2A/ul/g3/gainRef -192
db write /trx2A/ul/gainRef 10030
db resize /trx2A/ul/gainVsFq_gain 20
db resize /trx2A/ul/gainVsFq_gain 14
db write_array /trx2A/ul/gainVsFq_gain 0 -94 6 35 25 24 -19 0 0 52 104 118 79 -9 -131
db resize /trx2A/ul/measuredFreq 19
db resize /trx2A/ul/measuredFreq 14
db write_array /trx2A/ul/measuredFreq 0 25025000 25075000 25125000 25175000 25225000 25275000 25325000 25375000 25425000 25475000 25525000 25575000 25625000 25675000



db write /trx2B/ul/ref_Fq 25325000
db write /ul/refInputDigPower -6000
db write /trx2B/ul/fpga/iqPower 3199
db write /trx2B/ul/g3/gainRef -261
db write /trx2B/ul/gainRef 10030
db resize /trx2B/ul/gainVsFq_gain 20
db resize /trx2B/ul/gainVsFq_gain 14
db write_array /trx2B/ul/gainVsFq_gain 0 -94 6 35 25 24 -19 0 0 52 104 118 79 -9 -131
db resize /trx2B/ul/measuredFreq 19
db resize /trx2B/ul/measuredFreq 14
db write_array /trx2B/ul/measuredFreq 0 25025000 25075000 25125000 25175000 25225000 25275000 25325000 25375000 25425000 25475000 25525000 25575000 25625000 25675000



#====B41K UL==
db write /trx3A/ul/ref_Fq 36100000
db write /ul/refInputDigPower -6000
db write /trx3A/ul/fpga/iqPower 3199
db write /trx3A/ul/g3/gainRef -256
db write /trx3A/ul/gainRef 10031
db read /trx3A/ul/gainRef
db resize /trx3A/ul/gainVsFq_gain 20
db resize /trx3A/ul/gainVsFq_gain 19
db write_array /trx3A/ul/gainVsFq_gain 0 -145 11 -53 -39 14 35 -19 -54 -29 0 16 18 0 -8 -12 -39 -105 -194 -274
db resize /trx3A/ul/measuredFreq 19
db resize /trx3A/ul/measuredFreq 19
db write_array /trx3A/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000



db write /trx3B/ul/ref_Fq 36100000
db write /trx3B/ul/fpga/iqPower 3199
db write /trx3B/ul/g3/gainRef -405
db read /trx3B/ul/g3/gainRef
db write /trx3B/ul/gainRef 10031
db resize /trx3B/ul/gainVsFq_gain 20
db resize /trx3B/ul/gainVsFq_gain 19
db write_array /trx3B/ul/gainVsFq_gain 0 -142 -24 -44 -3 71 99 77 47 27 0 -41 -67 -86 -74 -60 -67 -109 -209 -335
db resize /trx3B/ul/measuredFreq 19
db resize /trx3B/ul/measuredFreq 19
db write_array /trx3B/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000



db write /trx4A/ul/ref_Fq 36100000
db write /ul/refInputDigPower -6000
db write /trx4A/ul/fpga/iqPower 3199
db write /trx4A/ul/g3/gainRef -347
db write /trx4A/ul/gainRef 10031
db resize /trx4A/ul/gainVsFq_gain 20
db resize /trx4A/ul/gainVsFq_gain 19
db write_array /trx4A/ul/gainVsFq_gain 0 -158 50 -4 -12 54 118 65 -6 -33 0 31 38 25 -9 -25 -35 -79 -157 -253
db resize /trx4A/ul/measuredFreq 19
db resize /trx4A/ul/measuredFreq 19
db write_array /trx4A/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000



db write /trx4B/ul/ref_Fq 36100000
db write /ul/refInputDigPower -6000
db write /trx4B/ul/fpga/iqPower 3199
db write /trx4B/ul/g3/gainRef -346
db write /trx4B/ul/gainRef 10031
db resize /trx4B/ul/gainVsFq_gain 20
db resize /trx4B/ul/gainVsFq_gain 19
db write_array /trx4B/ul/gainVsFq_gain 0 -118 -5 -8 28 89 138 110 45 2 0 9 29 51 69 75 54 -6 -108 -218
db resize /trx4B/ul/measuredFreq 19
db resize /trx4B/ul/measuredFreq 19
db write_array /trx4B/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000
db read /trx4B/ul/measuredFreq
db write /ul/tempCal 290



#===PACC====
db write /trx1A/dl/pa/mainPa/offset -90
db write /trx1A/dl/pa/peakPa/offset -80
db write /trx1B/dl/pa/mainPa/offset -80
db write /trx1B/dl/pa/peakPa/offset -100
db write /trx2A/dl/pa/mainPa/offset -90
db write /trx2A/dl/pa/peakPa/offset -80
db write /trx2B/dl/pa/mainPa/offset -80
db write /trx2B/dl/pa/peakPa/offset -100



db write /trx3A/dl/pa/mainPa/offset -59
db write /trx3A/dl/pa/peakPa/offset -49
db write /trx3B/dl/pa/mainPa/offset -118
db write /trx3B/dl/pa/peakPa/offset -97
db write /trx4A/dl/pa/mainPa/offset -3
db write /trx4A/dl/pa/peakPa/offset -4
db write /trx4B/dl/pa/mainPa/offset -23
db write /trx4B/dl/pa/peakPa/offset -20




#====B41K DL====
db write /trx3A/dl/fpga/iqPwr_ref 1186
db write /trx3A/dl/initOrxAtt 225
db write /trx3A/dl/orx/ref_Fq 36100000
db write /trx3A/dl/initTxDesiredGain -300
db resize /trx3A/dl/orx/freq_dB 19
db resize /trx3A/dl/orx/freq_dB 19
db write_array /trx3A/dl/orx/freq_dB 0 -84 -17 -28 -61 0 30 45 2 10 0 23 41 30 56 33 29 -24 -21 -25
db resize /trx3A/dl/orx/measuredFreq 19
db resize /trx3A/dl/orx/measuredFreq 19
db write_array /trx3A/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000



db write /trx3B/dl/fpga/iqPwr_ref 1186
db write /trx3B/dl/initOrxAtt 229
db write /trx3B/dl/orx/ref_Fq 36100000
db write /trx3B/dl/initTxDesiredGain -310
db resize /trx3B/dl/orx/freq_dB 19
db resize /trx3B/dl/orx/freq_dB 19
db write_array /trx3B/dl/orx/freq_dB 0 -145 -47 -37 -38 -45 0 8 11 2 0 -15 -22 -43 -54 -64 -92 -100 -114 -127
db resize /trx3B/dl/orx/measuredFreq 19
db resize /trx3B/dl/orx/measuredFreq 19
db write_array /trx3B/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000



db write /trx4A/dl/fpga/iqPwr_ref 1186
db write /trx4A/dl/initOrxAtt 222
db write /trx4A/dl/orx/ref_Fq 36100000
db write /trx4A/dl/initTxDesiredGain -375
db resize /trx4A/dl/orx/freq_dB 19
db resize /trx4A/dl/orx/freq_dB 19
db write_array /trx4A/dl/orx/freq_dB 0 -149 -63 -46 -36 18 0 11 -26 8 0 -47 -52 -21 -11 -45 -89 -42 -92 -95
db resize /trx4A/dl/orx/measuredFreq 19
db resize /trx4A/dl/orx/measuredFreq 19
db write_array /trx4A/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000



db write /trx4B/dl/fpga/iqPwr_ref 1186
db write /trx4B/dl/initOrxAtt 225
db write /trx4B/dl/orx/ref_Fq 36100000
db read /trx4B/dl/orx/ref_Fq
db write /trx4B/dl/initTxDesiredGain -359
db resize /trx4B/dl/orx/freq_dB 19
db resize /trx4B/dl/orx/freq_dB 19
db write_array /trx4B/dl/orx/freq_dB 0 -143 -70 -125 -77 -64 -52 -2 4 -12 0 -7 34 -27 2 4 -36 -55 -45 -89
db resize /trx4B/dl/orx/measuredFreq 19
db resize /trx4B/dl/orx/measuredFreq 19
db write_array /trx4B/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000
db write /dl/tempCal 350



#====B3E DL====
db write /trx1A/dl/fpga/iqPwr_ref 1180
db write /trx1A/dl/initOrxAtt 226
db write /trx1A/dl/orx/ref_Fq 18175000
db write /trx1A/dl/initTxDesiredGain -343
db resize /trx1A/dl/orx/freq_dB 19
db resize /trx1A/dl/orx/freq_dB 19
db write_array /trx1A/dl/orx/freq_dB 0 53 101 96 116 109 83 34 0 -14 14 25 87 94 53 -6
db resize /trx1A/dl/orx/measuredFreq 19
db resize /trx1A/dl/orx/measuredFreq 19
db write_array /trx1A/dl/orx/measuredFreq 0 18075000 18125000 18175000 18225000 18275000 18325000 18375000 18425000 18475000 18525000 18575000 18625000 18675000 18725000 18775000



db write /trx1B/dl/fpga/iqPwr_ref 1178
db write /trx1B/dl/initOrxAtt 234
db write /trx1B/dl/orx/ref_Fq 18175000
db write /trx1B/dl/initTxDesiredGain -378
db resize /trx1B/dl/orx/freq_dB 19
db resize /trx1B/dl/orx/freq_dB 19
db write_array /trx1B/dl/orx/freq_dB 0 12 53 109 110 78 73 7 0 -53 -14 22 47 58 -11 -92
db resize /trx1B/dl/orx/measuredFreq 19
db resize /trx1B/dl/orx/measuredFreq 19
db write_array /trx1B/dl/orx/measuredFreq 0 18075000 18125000 18175000 18225000 18275000 18325000 18375000 18425000 18475000 18525000 18575000 18625000 18675000 18725000 18775000




#=====B40A DL=====
db write /trx2A/dl/fpga/iqPwr_ref 1181
db write /trx2A/dl/initOrxAtt 228
db write /trx2A/dl/orx/ref_Fq 26525000
db write /trx2A/dl/initTxDesiredGain -338
db resize /trx2A/dl/orx/freq_dB 19
db resize /trx2A/dl/orx/freq_dB 14
db write_array /trx2A/dl/orx/freq_dB 0 53 109 110 78 73 7 0 -53 -14 22 47 58 -11 -92
db resize /trx2A/dl/orx/measuredFreq 19
db resize /trx2A/dl/orx/measuredFreq 14
db write_array /trx2A/dl/orx/measuredFreq 0 26225000 26275000 26325000 26375000 26425000 26475000 26525000 26575000 26625000 26675000 26725000 26775000 26825000 26875000



db write /trx2B/dl/fpga/iqPwr_ref 1181
db write /trx2B/dl/initOrxAtt 227
db write /trx2B/dl/orx/ref_Fq 26525000
db read /trx2B/dl/orx/ref_Fq
db write /trx2B/dl/initTxDesiredGain -346
db resize /trx2B/dl/orx/freq_dB 19
db resize /trx2B/dl/orx/freq_dB 14
db write_array /trx2B/dl/orx/freq_dB 0 53 109 110 78 73 7 0 -53 -14 22 47 58 -11 -92
db resize /trx2B/dl/orx/measuredFreq 19
db resize /trx2B/dl/orx/measuredFreq 14
db write_array /trx2B/dl/orx/measuredFreq 0 26225000 26275000 26325000 26375000 26425000 26475000 26525000 26575000 26625000 26675000 26725000 26775000 26825000 26875000
db sync
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {HW Access}>
<button {0} {temp all}>
<data>
temp all
#print all the temp sensor value
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {HW dB from Eric He}>
<data>
db write_string /brd/hwPid "KRY 901 501/1"
db write_string /brd/hwName "RD455B4140B3"
db write_string /brd/hwRev "P1A"
db write_string /brd/hwDate "20201229"
db write_string /brd/hwSerNo "xxxxxxxxxx"
db write_string /brd/hwMarketName "Dot4455 B41KB3EB40A"

db write_string /brd/trx1A/antenna "antA"
db write_string /brd/trx1B/antenna "antB"
db write_string /brd/trx2A/antenna "antC"
db write_string /brd/trx2B/antenna "antD" 
db write_string /brd/trx3A/antenna "antE"
db write_string /brd/trx3B/antenna "antF"
db write_string /brd/trx4A/antenna "antG"
db write_string /brd/trx4B/antenna  "antH"
db write_string /brd/trx1A/band "BandIII.E"
db write_string /brd/trx1B/band "BandIII.E"
db write_string /brd/trx2A/band "Band40.A"
db write_string /brd/trx2B/band "Band40.A"
db write_string /brd/trx3A/band "Band41.K"
db write_string /brd/trx3B/band "Band41.K"
db write_string /brd/trx4A/band "Band41.K"
db write_string /brd/trx4B/band "Band41.K"
db write /brd/trx1A/duplexMode 0
db write /brd/trx1B/duplexMode 0
db write /brd/trx2A/duplexMode 1
db write /brd/trx2B/duplexMode 1 
db write /brd/trx3A/duplexMode 1
db write /brd/trx3B/duplexMode 1
db write /brd/trx4A/duplexMode 1
db write /brd/trx4B/duplexMode 1
db write_string /brd/trx1/bbif "BBIF0"
db write_string /brd/trx2/bbif "BBIF1" 
db write_string /brd/trx3/bbif "BBIF2"
db write_string /brd/trx4/bbif "BBIF3"


db write /brd/trx1A/paccSupport 1
db write /brd/trx1B/paccSupport 1
db write /brd/trx2A/paccSupport 1
db write /brd/trx2B/paccSupport 1
db write /brd/trx3A/paccSupport 1
db write /brd/trx3B/paccSupport 1
db write /brd/trx4A/paccSupport 1
db write /brd/trx4B/paccSupport 1

db write /brd/noOfBranches 8
db write_string /brd/macAddress "00:00:00:00:00:00"
db write /brd/noOfRJ45Ports 1
db write /brd/noOfSFPPorts 1
db write_string /brd/fpga/defFPGA "CXC 174 3456/1"
db write_string /brd/defLmName "CXC 112 4419/13"
db write_string /brd/ethernetPhyFw "CXC 112 4543/1"
db write_string /brd/trx1/rficFw "CXC 112 4536/2"
db write_string /brd/trx2/rficFw "CXC 112 4536/2"
db write_string /brd/trx3/rficFw "CXC 112 4536/2"
db write_string /brd/trx4/rficFw "CXC 112 4536/2"

db write_string /brd/pisLmName "CXP 902 5228/9"
db write /brd/pisAvailable 1
db write_string /brd/designDbProdNum "CXC 112 4542/6"
db write_string /brd/dpdDbProdNum "CXC 112 4455/5"

#db write_string /brd/componentConfigId "rdTVK_9.8.0 rdPACC_2.0.0 rdExtRxLo_1.0.1"
db write_string /brd/componentConfigId "rdTVK_9.8.0 rdPACC_2.0.0"
db write /brd/maxCapacityPhyRate 10000
db write_array /brd/supportedPhyRates 0 1000 2500 5000 10000
db write /brd/numberOfTrxDevice 2
db sync

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {DOT UL Packet}>
<data>
hal fpga write 0x3004 0x1
hal fpga write 0x3020 0x1
hal fpga read 0x3700
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {DOT Power Meter}>
<data>
hal fpga read 0x18e0
hal fpga read 0x18e4

hal fpga read 0x18e8
hal fpga read 0x18ec

srv pwrmeas uldbbits branch_f all


srv pwrmeas dlpwr get branch_a
srv pwrmeas dlpwr get branch_b
srv pwrmeas dlpwr get branch_c
srv pwrmeas dlpwr get branch_d
srv pwrmeas dlpwr get branch_e
srv pwrmeas dlpwr get branch_f
srv pwrmeas dlpwr get branch_g
srv pwrmeas dlpwr get branch_h


srv pwrmeas ulpwr get branch_a
srv pwrmeas ulpwr get branch_b
srv pwrmeas ulpwr get branch_c
srv pwrmeas ulpwr get branch_d
srv pwrmeas ulpwr get branch_e
srv pwrmeas ulpwr get branch_f
srv pwrmeas ulpwr get branch_g
srv pwrmeas ulpwr get branch_h


hal fpga read 0x10a0
hal fpga read 0x10a4
hal fpga read 0x14a0
hal fpga read 0x14a4
hal fpga read 0x18a0
hal fpga read 0x18a4
hal fpga read 0x1ca0
hal fpga read 0x1ca4

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {read hwSerNo}>
<data>
db read /brd/hwSerNo
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {temp all}>
<data>
temp all
%delay 30000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {Pacc DAC Set_branch_F}>
<data>
srv pacc setdac branch_e main 0x6e0
srv pacc setdac branch_e peak 0x580

srv pacc setdac branch_f main 0x6e0
srv pacc setdac branch_f peak 0x580

srv pacc setdac branch_g main 0x6e0
srv pacc setdac branch_g peak 0x580

srv pacc setdac branch_h main 0x6e0
srv pacc setdac branch_h peak 0x580
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {xenon:0 rxpwr}>
<data>
xenon:0 rxpwr
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {tap fuction}>
<data>
#===branch F
hal fpga writed 0x90 0x8010c350
hal fpga writed 0x94 0x00
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
tap auto 2 5 1 100000 0
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
hal fpga writed 0x94 0x00 
 

hal fpga writed 0x90 0x802007d0
hal fpga writed 0x94 0x00
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
tap auto 2 5 1 4000 0
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
hal fpga writed 0x94 0x00 

####branch a 
hal fpga writed 0x90 0x801000c8
hal fpga writed 0x94 0x00
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
tap auto 2 0 1 400 0
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
hal fpga writed 0x94 0x00

#branch f dl
hal fpga writed 0x90 0x80101388
hal fpga writed 0x94 0x00
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
tap auto 0 5 1 10000 0
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
hal fpga writed 0x94 0x00

hal fpga writed 0x90 0x8001e000
hal fpga writed 0x94 0x00
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
tap auto 0 0 1 245760 0
hal fpga writed 0x7c 0x01
hal fpga writed 0x7c 0x00
hal fpga writed 0x94 0x00
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {db write 1}>
<data>
db write_string /brd/hwPid "KRY 901 536/1"
db write_string /brd/hwName "RD453B78B3B7"
db write_string /brd/hwRev "P1A"
db write_string /brd/hwDate "20220419"
db write_string /brd/hwSerNo "xxxxxxxxxx"
db write_string /brd/hwMarketName "Dot 4453 B78K B3 B7"

db write_string /brd/trx1A/antenna "antA"
db write_string /brd/trx1B/antenna "antB"
db write_string /brd/trx2A/antenna "antC"
db write_string /brd/trx2B/antenna "antD" 
db write_string /brd/trx3A/antenna "antE"
db write_string /brd/trx3B/antenna "antF"
db write_string /brd/trx4A/antenna "antG"
db write_string /brd/trx4B/antenna "antH"
db write_string /brd/trx1A/band "BandIII"
db write_string /brd/trx1B/band "BandIII"
db write_string /brd/trx2A/band "BandVII"
db write_string /brd/trx2B/band "BandVII"
db write_string /brd/trx3A/band "Band78.K"
db write_string /brd/trx3B/band "Band78.K"
db write_string /brd/trx4A/band "Band78.K"
db write_string /brd/trx4B/band "Band78.K"

db write /brd/trx1A/duplexMode 0
db write /brd/trx1B/duplexMode 0
db write /brd/trx2A/duplexMode 0
db write /brd/trx2B/duplexMode 0 
db write /brd/trx3A/duplexMode 1
db write /brd/trx3B/duplexMode 1
db write /brd/trx4A/duplexMode 1
db write /brd/trx4B/duplexMode 1
db write_string /brd/trx1/bbif "BBIF0"
db write_string /brd/trx2/bbif "BBIF1" 
db write_string /brd/trx3/bbif "BBIF2"
db write_string /brd/trx4/bbif "BBIF3"

db write /brd/trx1A/paccSupport 1
db write /brd/trx1B/paccSupport 1
db write /brd/trx2A/paccSupport 1
db write /brd/trx2B/paccSupport 1
db write /brd/trx3A/paccSupport 1
db write /brd/trx3B/paccSupport 1
db write /brd/trx4A/paccSupport 1
db write /brd/trx4B/paccSupport 1

db write /brd/trx1A/paccChipId 0
db write /brd/trx1B/paccChipId 0
db write /brd/trx2A/paccChipId 0
db write /brd/trx2B/paccChipId 0
db write /brd/trx3A/paccChipId 1
db write /brd/trx3B/paccChipId 1
db write /brd/trx4A/paccChipId 1
db write /brd/trx4B/paccChipId 1

db write /brd/noOfBranches 8
db write_string /brd/macAddress "00:00:00:00:00:00"
db write /brd/noOfRJ45Ports 1

db write_string /brd/fpga/defFPGA "CXC 174 3456/2"
db write_string /brd/defLmName "CXC 112 4419/15"
db write_string /brd/ethernetPhyFw "CXC 112 4543/2"
db write_string /brd/trx1/rficFw "CXC 112 4536/2"
db write_string /brd/trx2/rficFw "CXC 112 4536/2"
db write_string /brd/trx3/rficFw "CXC 112 4536/2"
db write_string /brd/trx4/rficFw "CXC 112 4536/2"
											  																			  
db write_string /brd/pisLmName "CXP 902 9578/11"
db read /brd/pisLmName
db write /brd/pisAvailable 1
db write_string /brd/designDbProdNum "CXC 112 4542/6"
db write_string /brd/dpdDbProdNum "CXC 112 4576/5"

db write_string /brd/componentConfigId "rdTVK_9.8.0 rdPACC_2.0.0"
db write /brd/maxCapacityPhyRate 10000
db write_array /brd/supportedPhyRates 0 1000 2500 5000 10000 0 0
db write /brd/numberOfTrxDevice 4
db sync
system reset
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {DOT UL_Branch_F}>
<data>
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h

srv datapath mute ul branch_a
srv datapath mute ul branch_b
srv datapath mute ul branch_c
srv datapath mute ul branch_d
srv datapath unmute ul branch_e
srv datapath unmute ul branch_f
srv datapath mute ul branch_g
srv datapath mute ul branch_h

madura func maduraFuncPllFrequencyGet 1 0
madura func maduraFuncRxTxEnableSet 1 0 0
madura func maduraFuncPllFrequencySet 1 0 2595000000
madura func maduraFuncRxTxEnableSet 1 15 0


madura func maduraFuncRxDecPowerGet 1 4


rfic rxgainctrolmode set trx1 mgc
hal fpga write 0x1820 0x1000c 
 
rfic radio trx1 off
#rfic rxlo Trx1 set 2585     
rfic radio trx1 on

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {DOT DL Branch F}>
<data>
srv datalink init
srv datalink set dl branch_a 0 4 245760 8e2_1
srv datapath mute ul branch_h
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h

srv datapath unmute dl branch_a
srv datapath unmute dl branch_b
srv datapath unmute dl branch_c
srv datapath unmute dl branch_d
srv datapath unmute dl branch_f
srv datapath unmute dl branch_e
srv datapath unmute dl branch_g
srv datapath unmute dl branch_h



srv duplex tdd_en set disable trx1
srv duplex tdd_en set disable trx2

#enable tx for F
madura func maduraFuncRxTxEnableSet 1 0 2
#F branches   
madura func maduraFuncTxToOrxMappingSet 1 0x20 2
madura func maduraFuncPllFrequencySet 1 0 2595000000
#branchF
madura func maduraFuncDpdModelConfigSet 1 2 95
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#FPGA set DL 3dB attenuation
hal fpga dlgain set branch_a 0x2d4f         

hal fpga write 0x182c 0x8000303f
#hal fpga write 0x142c 0x8000303f
#hal fpga write 0x182c 0x8000303f
#hal fpga write 0x1c2c 0x8000303f
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 2 0   
madura func maduraFuncInitCalsRun 1 0x800 2 0  
#EXT LOL        
madura func maduraFuncInitCalsRun 1 0x10000000 2 0
# DPD trackin enable
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1     

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {ATC IRU Branch A_SIM}>
<data>
digitalIruFpga w ATC_CTRL ATC_CTRL_DL_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG ATC_DL_BIN_CTRL_BP0_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG ATC_DL_BIN_CTRL_BP0_CFG_LOAD_RDY 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG ATC_DL_BIN_CTRL_BP1_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG ATC_DL_BIN_CTRL_BP1_CFG_LOAD_RDY 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG ATC_DL_BIN_CTRL_BP2_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG ATC_DL_BIN_CTRL_BP2_CFG_LOAD_RDY 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG ATC_DL_BIN_CTRL_BP3_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG ATC_DL_BIN_CTRL_BP3_CFG_LOAD_RDY 1
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP0 0x2
digitalIruFpga w ATC_BINSCALE_FACTOR_BP0 0x28c3
# scaleFactor=0.014073239651110132
# scaleShift=3
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP1 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP1 ATC_BINSCALE_FACTOR_BP1_DL 0x0
# scaleFactor=0
# scaleShift=0
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP2 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP2 ATC_BINSCALE_FACTOR_BP2_DL 0x0
# scaleFactor=0
# scaleShift=0
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP3 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP3 ATC_BINSCALE_FACTOR_BP3_DL 0x0
# scaleFactor=0
# scaleShift=0
digitalIruFpga w ATC_0_BLK_CFG_DL_0 0x80010080
digitalIruFpga w ATC_0_BLK_CFG_DL_1 0x80010001
digitalIruFpga w ATC_0_BLK_CFG_DL_2 0x80010002
digitalIruFpga w ATC_0_BLK_CFG_DL_3 0x80010003
digitalIruFpga w ATC_0_BLK_CFG_DL_4 0x80010004
digitalIruFpga w ATC_0_BLK_CFG_DL_5 0x80010005
digitalIruFpga w ATC_0_BLK_CFG_DL_6 0x80010006
digitalIruFpga w ATC_0_BLK_CFG_DL_7 0x8001e007
digitalIruFpga w ATC_0_BLK_CFG_DL_8 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_9 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_10 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_11 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_12 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_13 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_14 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_15 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_16 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_17 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_18 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_19 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_20 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_21 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_22 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_23 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_24 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_25 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_26 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_27 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_28 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_29 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_30 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_31 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_32 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_33 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_34 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_35 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_36 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_37 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_38 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_39 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_40 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_41 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_42 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_43 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_44 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_45 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_46 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_47 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_48 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_49 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_50 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_51 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_52 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_53 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_54 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_55 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_56 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_57 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_58 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_59 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_60 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_61 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_62 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_63 0x0


digitalIruFpga w ATC_TF_BR0_CFG ATC_TF_BR0_CFG_TF_ENCODE_EN 0x1
digitalIruFpga w ATC_TF_BR0_CFG ATC_TF_BR0_CFG_TF_PSB_BIN_NR 0x60
digitalIruFpga w ATC_TF_BR0_CFG ATC_TF_BR0_CFG_TF_PSB_BLK_NR 0x8
digitalIruFpga w ATC_TF_BR1_CFG ATC_TF_BR1_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR1_CFG ATC_TF_BR1_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR1_CFG ATC_TF_BR1_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR2_CFG ATC_TF_BR2_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR2_CFG ATC_TF_BR2_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR2_CFG ATC_TF_BR2_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR3_CFG ATC_TF_BR3_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR3_CFG ATC_TF_BR3_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR3_CFG ATC_TF_BR3_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR4_CFG ATC_TF_BR4_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR4_CFG ATC_TF_BR4_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR4_CFG ATC_TF_BR4_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR5_CFG ATC_TF_BR5_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR5_CFG ATC_TF_BR5_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR5_CFG ATC_TF_BR5_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR6_CFG ATC_TF_BR6_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR6_CFG ATC_TF_BR6_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR6_CFG ATC_TF_BR6_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR7_CFG ATC_TF_BR7_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR7_CFG ATC_TF_BR7_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR7_CFG ATC_TF_BR7_CFG_TF_PSB_BLK_NR 0x0


digitalIruFpga w ATC_CTRL ATC_CTRL_PKT_PER_TRANSFORM 0x4
digitalIruFpga w ATC_CTRL ATC_CTRL_ATC_PKT_EN_DL 1


#====
# DPE enabled
digitalIruFpga w DPE_0_DL_SETUP 0x1000004
#ATC Control
digitalIruFpga w ATC_CTRL 0x340
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {prod_dB check}>
<data>
db read /brd/hwPid??
db read /brd/trx1A/antenna

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {db write 2}>
<data>

#=====B3 UL===
db write /trx1A/ul/ref_Fq 17475000
db write /ul/refInputDigPower -6000
db write /trx1A/ul/fpga/iqPower 2649
db write /trx1A/ul/g3/gainRef 23
db write /trx1A/ul/gainRef 11781
db read /trx1A/ul/gainRef
db resize /trx1A/ul/gainVsFq_gain 20
db resize /trx1A/ul/gainVsFq_gain 15
db write_array /trx1A/ul/gainVsFq_gain 0 -271 -246 -171 -69 -9 9 -5 0 -14 -31 -30 -16 -53 -71 -132
db resize /trx1A/ul/measuredFreq 19
db resize /trx1A/ul/measuredFreq 15
db write_array /trx1A/ul/measuredFreq 0 17125000 17175000 17225000 17275000 17325000 17375000 17425000 17475000 17525000 17575000 17625000 17675000 17725000 17775000 17825000

db write /trx1B/ul/ref_Fq 17475000
db write /trx1B/ul/fpga/iqPower 2649
db write /trx1B/ul/g3/gainRef 73
db read /trx1B/ul/g3/gainRef
db write /trx1B/ul/gainRef 11781
db resize /trx1B/ul/gainVsFq_gain 20
db resize /trx1B/ul/gainVsFq_gain 15
db write_array /trx1B/ul/gainVsFq_gain 0 -151 -94 6 35 25 24 -19 0 0 52 104 118 79 -9 -131
db resize /trx1B/ul/measuredFreq 19
db resize /trx1B/ul/measuredFreq 15
db write_array /trx1B/ul/measuredFreq 0 17125000 17175000 17225000 17275000 17325000 17375000 17425000 17475000 17525000 17575000 17625000 17675000 17725000 17775000 17825000

#====B7 UL====
db write /trx2A/ul/ref_Fq 25325000
db write /ul/refInputDigPower -6000
db write /trx2A/ul/fpga/iqPower 2649
db write /trx2A/ul/g3/gainRef -192
db write /trx2A/ul/gainRef 11781
db resize /trx2A/ul/gainVsFq_gain 20
db resize /trx2A/ul/gainVsFq_gain 14
db write_array /trx2A/ul/gainVsFq_gain 0 -94 6 35 25 24 -19 0 0 52 104 118 79 -9 -131
db resize /trx2A/ul/measuredFreq 19
db resize /trx2A/ul/measuredFreq 14
db write_array /trx2A/ul/measuredFreq 0 25025000 25075000 25125000 25175000 25225000 25275000 25325000 25375000 25425000 25475000 25525000 25575000 25625000 25675000

db write /trx2B/ul/ref_Fq 25325000
db write /ul/refInputDigPower -6000
db write /trx2B/ul/fpga/iqPower 2649
db write /trx2B/ul/g3/gainRef -261
db write /trx2B/ul/gainRef 11781
db resize /trx2B/ul/gainVsFq_gain 20
db resize /trx2B/ul/gainVsFq_gain 14
db write_array /trx2B/ul/gainVsFq_gain 0 -94 6 35 25 24 -19 0 0 52 104 118 79 -9 -131
db resize /trx2B/ul/measuredFreq 19
db resize /trx2B/ul/measuredFreq 14
db write_array /trx2B/ul/measuredFreq 0 25025000 25075000 25125000 25175000 25225000 25275000 25325000 25375000 25425000 25475000 25525000 25575000 25625000 25675000

#====B78K UL==
db write /trx3A/ul/ref_Fq 36100000
db write /ul/refInputDigPower -6000
db write /trx3A/ul/fpga/iqPower 2649
db write /trx3A/ul/g3/gainRef -256
db write /trx3A/ul/gainRef 11781
db read /trx3A/ul/gainRef
db resize /trx3A/ul/gainVsFq_gain 20
db resize /trx3A/ul/gainVsFq_gain 19
db write_array /trx3A/ul/gainVsFq_gain 0 -145 11 -53 -39 14 35 -19 -54 -29 0 16 18 0 -8 -12 -39 -105 -194 -274
db resize /trx3A/ul/measuredFreq 19
db resize /trx3A/ul/measuredFreq 19
db write_array /trx3A/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000

db write /trx3B/ul/ref_Fq 36100000
db write /trx3B/ul/fpga/iqPower 2649
db write /trx3B/ul/g3/gainRef -405
db read /trx3B/ul/g3/gainRef
db write /trx3B/ul/gainRef 11781
db resize /trx3B/ul/gainVsFq_gain 20
db resize /trx3B/ul/gainVsFq_gain 19
db write_array /trx3B/ul/gainVsFq_gain 0 -142 -24 -44 -3 71 99 77 47 27 0 -41 -67 -86 -74 -60 -67 -109 -209 -335
db resize /trx3B/ul/measuredFreq 19
db resize /trx3B/ul/measuredFreq 19
db write_array /trx3B/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000

db write /trx4A/ul/ref_Fq 36100000
db write /ul/refInputDigPower -6000
db write /trx4A/ul/fpga/iqPower 2649
db write /trx4A/ul/g3/gainRef -347
db write /trx4A/ul/gainRef 11781
db resize /trx4A/ul/gainVsFq_gain 20
db resize /trx4A/ul/gainVsFq_gain 19
db write_array /trx4A/ul/gainVsFq_gain 0  -158 50 -4 -12 54 118 65 -6 -33 0 31 38 25 -9 -25 -35 -79 -157 -253
db resize /trx4A/ul/measuredFreq 19
db resize /trx4A/ul/measuredFreq 19
db write_array /trx4A/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000

db write /trx4B/ul/ref_Fq 36100000
db write /ul/refInputDigPower -6000
db write /trx4B/ul/fpga/iqPower 2649
db write /trx4B/ul/g3/gainRef -346
db write /trx4B/ul/gainRef 11781
db resize /trx4B/ul/gainVsFq_gain 20
db resize /trx4B/ul/gainVsFq_gain 19
db write_array /trx4B/ul/gainVsFq_gain 0 -118 -5 -8 28 89 138 110 45 2 0 9 29 51 69 75 54 -6 -108 -218
db resize /trx4B/ul/measuredFreq 19
db resize /trx4B/ul/measuredFreq 19
db write_array /trx4B/ul/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000
db read /trx4B/ul/measuredFreq
db write /ul/tempCal 290

#===PACC====
db write /trx1A/dl/pa/mainPa/offset -100
db write /trx1A/dl/pa/peakPa/offset -90
db write /trx1B/dl/pa/mainPa/offset -176
db write /trx1B/dl/pa/peakPa/offset -50
db write /trx2A/dl/pa/mainPa/offset -70
db write /trx2A/dl/pa/peakPa/offset -190
db write /trx2B/dl/pa/mainPa/offset -170
db write /trx2B/dl/pa/peakPa/offset -30

db write /trx3A/dl/pa/mainPa/offset -91
db write /trx3A/dl/pa/peakPa/offset -185
db write /trx3B/dl/pa/mainPa/offset -130
db write /trx3B/dl/pa/peakPa/offset -220
db write /trx4A/dl/pa/mainPa/offset -20
db write /trx4A/dl/pa/peakPa/offset -150
db write /trx4B/dl/pa/mainPa/offset -80
db write /trx4B/dl/pa/peakPa/offset -300


#====B78K DL====
db write /trx3A/dl/fpga/iqPwr_ref 1201
db write /trx3A/dl/initOrxAtt 240
db write /trx3A/dl/orx/ref_Fq 36100000
db write /trx3A/dl/initTxDesiredGain -300
db resize /trx3A/dl/orx/freq_dB 19
db resize /trx3A/dl/orx/freq_dB 19
db write_array /trx3A/dl/orx/freq_dB 0 -84 -17 -28 -61 0 30 45 2 10 0 23 41 30 56 33 29 -24 -21 -25
db resize /trx3A/dl/orx/measuredFreq 19
db resize /trx3A/dl/orx/measuredFreq 19
db write_array /trx3A/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000

db write /trx3B/dl/fpga/iqPwr_ref 1201
db write /trx3B/dl/initOrxAtt 243
db write /trx3B/dl/orx/ref_Fq 36100000
db write /trx3B/dl/initTxDesiredGain -310
db resize /trx3B/dl/orx/freq_dB 19
db resize /trx3B/dl/orx/freq_dB 19
db write_array /trx3B/dl/orx/freq_dB 0  -145 -47 -37 -38 -45 0 8 11 2 0 -15 -22 -43 -54 -64 -92 -100 -114 -127
db resize /trx3B/dl/orx/measuredFreq 19
db resize /trx3B/dl/orx/measuredFreq 19
db write_array /trx3B/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000

db write /trx4A/dl/fpga/iqPwr_ref 1201
db write /trx4A/dl/initOrxAtt 243
db write /trx4A/dl/orx/ref_Fq 36100000
db write /trx4A/dl/initTxDesiredGain -375
db resize /trx4A/dl/orx/freq_dB 19
db resize /trx4A/dl/orx/freq_dB 19
db write_array /trx4A/dl/orx/freq_dB 0 -149 -63 -46 -36 18 0 11 -26 8 0 -47 -52 -21 -11 -45 -89 -42 -92 -95
db resize /trx4A/dl/orx/measuredFreq 19
db resize /trx4A/dl/orx/measuredFreq 19
db write_array /trx4A/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000

db write /trx4B/dl/fpga/iqPwr_ref 1202
db write /trx4B/dl/initOrxAtt 244
db write /trx4B/dl/orx/ref_Fq 36100000
db read /trx4B/dl/orx/ref_Fq
db write /trx4B/dl/initTxDesiredGain -359
db resize /trx4B/dl/orx/freq_dB 19
db resize /trx4B/dl/orx/freq_dB 19
db write_array /trx4B/dl/orx/freq_dB 0 -143 -70 -125 -77 -64 -52 -2 4 -12 0 -7 34 -27 2 4 -36 -55 -45 -89
db resize /trx4B/dl/orx/measuredFreq 19
db resize /trx4B/dl/orx/measuredFreq 19
db write_array /trx4B/dl/orx/measuredFreq 0 34300000 34500000 34700000 34900000 35100000 35300000 35500000 35700000 35900000 36100000 36300000 36500000 36700000 36900000 37100000 37300000 37500000 37700000 37900000
db write /dl/tempCal 350

#====B3 DL====
db write /trx1A/dl/fpga/iqPwr_ref 1205
db write /trx1A/dl/initOrxAtt 242
db write /trx1A/dl/orx/ref_Fq 18425000
db write /trx1A/dl/initTxDesiredGain -343
db resize /trx1A/dl/orx/freq_dB 19
db resize /trx1A/dl/orx/freq_dB 19
db write_array /trx1A/dl/orx/freq_dB 0  53 101 96 116 109 83 34 0 -14 14 25 87 94 53 -6
db resize /trx1A/dl/orx/measuredFreq 19
db resize /trx1A/dl/orx/measuredFreq 19
db write_array /trx1A/dl/orx/measuredFreq 0 18075000 18125000 18175000 18225000 18275000 18325000 18375000 18425000 18475000 18525000 18575000 18625000 18675000 18725000 18775000 

db write /trx1B/dl/fpga/iqPwr_ref 1205
db write /trx1B/dl/initOrxAtt 243
db write /trx1B/dl/orx/ref_Fq 18425000
db write /trx1B/dl/initTxDesiredGain -378
db resize /trx1B/dl/orx/freq_dB 19
db resize /trx1B/dl/orx/freq_dB 19
db write_array /trx1B/dl/orx/freq_dB 0  12 53 109 110 78 73 7 0 -53 -14 22 47 58 -11 -92
db resize /trx1B/dl/orx/measuredFreq 19
db resize /trx1B/dl/orx/measuredFreq 19
db write_array /trx1B/dl/orx/measuredFreq 0 18075000 18125000 18175000 18225000 18275000 18325000 18375000 18425000 18475000 18525000 18575000 18625000 18675000 18725000 18775000 


#=====B7 DL=====
db write /trx2A/dl/fpga/iqPwr_ref 1205
db write /trx2A/dl/initOrxAtt 242
db write /trx2A/dl/orx/ref_Fq 26525000
db write /trx2A/dl/initTxDesiredGain -338
db resize /trx2A/dl/orx/freq_dB 19
db resize /trx2A/dl/orx/freq_dB 14
db write_array /trx2A/dl/orx/freq_dB 0 53 109 110 78 73 7 0 -53 -14 22 47 58 -11 -92
db resize /trx2A/dl/orx/measuredFreq 19
db resize /trx2A/dl/orx/measuredFreq 14
db write_array /trx2A/dl/orx/measuredFreq 0 26225000 26275000 26325000 26375000 26425000 26475000 26525000 26575000 26625000 26675000 26725000 26775000 26825000 26875000

db write /trx2B/dl/fpga/iqPwr_ref 1202
db write /trx2B/dl/initOrxAtt 245
db write /trx2B/dl/orx/ref_Fq 26525000
db read /trx2B/dl/orx/ref_Fq
db write /trx2B/dl/initTxDesiredGain -346
db resize /trx2B/dl/orx/freq_dB 19
db resize /trx2B/dl/orx/freq_dB 14
db write_array /trx2B/dl/orx/freq_dB 0  53 109 110 78 73 7 0 -53 -14 22 47 58 -11 -92
db resize /trx2B/dl/orx/measuredFreq 19
db resize /trx2B/dl/orx/measuredFreq 14
db write_array /trx2B/dl/orx/measuredFreq 0 26225000 26275000 26325000 26375000 26425000 26475000 26525000 26575000 26625000 26675000 26725000 26775000 26825000 26875000
db sync

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {Float to Fix}>
<data>
#madura func maduraFuncRxDataFormatGet 1 2
#madura func maduraFuncRxDataFormatGet
#madura func maduraFuncRxDataFormatSet 1 0 1
#madura func maduraFuncRxDataFormatSet 1 1 0x02 1 0 0 0 0 0 0 0 2 2 0 0 4 62 0 32 3 0 0 0 0 0 0 0 0 0 0 0 0 
#madura func maduraFuncRxDataFormatSet 1 2


#madura func maduraFuncRxDataFormatSet 0 0 1
#madura func maduraFuncRxDataFormatSet 0 1 0x01 0 1 1 1 0 1 1 0 1 2 0 0 4 0 7 172 0 0 0 0 0 0 0 0 0 0 0 0 0
#madura func maduraFuncRxDataFormatSet 0 2 


#=====================FPGA Float to Fix Point=====
hal fpga write 0x1820 0x4
hal fpga write 0x1820 0x8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {23} {DOT ATC BR A _ SIM}>
<data>
hal fpga writed 0x2860 0x1
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46664662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2864 0x46624662
hal fpga writed 0x2864 0x46626662
hal fpga writed 0x2860 0x100
hal fpga writed 0x2800 0x1
hal fpga writed 0x2804 0x00000074
hal fpga writed 0x2804 0x00007f59
hal fpga writed 0x2804 0x7ffe00cd
hal fpga writed 0x2804 0x00017f0f
hal fpga writed 0x2804 0x7ffd010f
hal fpga writed 0x2804 0x00027ed2
hal fpga writed 0x2804 0x7ffc0148
hal fpga writed 0x2804 0x00047e9c
hal fpga writed 0x2804 0x7ffa017d
hal fpga writed 0x2804 0x00067e69
hal fpga writed 0x2804 0x7ff801ae
hal fpga writed 0x2804 0x00087e39
hal fpga writed 0x2804 0x7ff601de
hal fpga writed 0x2804 0x000a7e09
hal fpga writed 0x2804 0x7ff4020d
hal fpga writed 0x2804 0x000d7ddb
hal fpga writed 0x2804 0x7ff1023b
hal fpga writed 0x2804 0x000f7dae
hal fpga writed 0x2804 0x7fee0268
hal fpga writed 0x2804 0x00137d81
hal fpga writed 0x2804 0x7feb0295
hal fpga writed 0x2804 0x00167d54
hal fpga writed 0x2804 0x7fe702c2
hal fpga writed 0x2804 0x001a7d27
hal fpga writed 0x2804 0x7fe302ee
hal fpga writed 0x2804 0x001e7cfa
hal fpga writed 0x2804 0x7fdf031b
hal fpga writed 0x2804 0x00227cce
hal fpga writed 0x2804 0x7fdb0348
hal fpga writed 0x2804 0x00267ca1
hal fpga writed 0x2804 0x7fd60375
hal fpga writed 0x2804 0x002b7c73
hal fpga writed 0x2804 0x7fd103a2
hal fpga writed 0x2804 0x00307c46
hal fpga writed 0x2804 0x7fcc03d0
hal fpga writed 0x2804 0x00367c18
hal fpga writed 0x2804 0x7fc703fe
hal fpga writed 0x2804 0x003b7bea
hal fpga writed 0x2804 0x7fc1042c
hal fpga writed 0x2804 0x00417bbc
hal fpga writed 0x2804 0x7fbb045b
hal fpga writed 0x2804 0x00487b8d
hal fpga writed 0x2804 0x7fb4048a
hal fpga writed 0x2804 0x004e7b5e
hal fpga writed 0x2804 0x7fad04b9
hal fpga writed 0x2804 0x00557b2e
hal fpga writed 0x2804 0x7fa604e9
hal fpga writed 0x2804 0x005d7afe
hal fpga writed 0x2804 0x7f9f0519
hal fpga writed 0x2804 0x00647ace
hal fpga writed 0x2804 0x7f97054a
hal fpga writed 0x2804 0x006c7a9d
hal fpga writed 0x2804 0x7f8f057b
hal fpga writed 0x2804 0x00747a6b
hal fpga writed 0x2804 0x7f8605ad
hal fpga writed 0x2804 0x007d7a3a
hal fpga writed 0x2804 0x7f7e05df
hal fpga writed 0x2804 0x00867a07
hal fpga writed 0x2804 0x7f740611
hal fpga writed 0x2804 0x008f79d4
hal fpga writed 0x2804 0x7f6b0644
hal fpga writed 0x2804 0x009979a1
hal fpga writed 0x2804 0x7f610678
hal fpga writed 0x2804 0x00a3796e
hal fpga writed 0x2804 0x7f5706ac
hal fpga writed 0x2804 0x00ad7939
hal fpga writed 0x2804 0x7f4c06e0
hal fpga writed 0x2804 0x00b87905
hal fpga writed 0x2804 0x7f410715
hal fpga writed 0x2804 0x00c378cf
hal fpga writed 0x2804 0x7f36074a
hal fpga writed 0x2804 0x00cf789a
hal fpga writed 0x2804 0x7f2a0780
hal fpga writed 0x2804 0x00db7863
hal fpga writed 0x2804 0x7f1e07b7
hal fpga writed 0x2804 0x00e7782d
hal fpga writed 0x2804 0x7f1107ee
hal fpga writed 0x2804 0x00f477f6
hal fpga writed 0x2804 0x7f040825
hal fpga writed 0x2804 0x010177be
hal fpga writed 0x2804 0x7ef7085d
hal fpga writed 0x2804 0x010f7786
hal fpga writed 0x2804 0x7ee90896
hal fpga writed 0x2804 0x011d774d
hal fpga writed 0x2804 0x7edb08cf
hal fpga writed 0x2804 0x012b7714
hal fpga writed 0x2804 0x7ecc0908
hal fpga writed 0x2804 0x013a76da
hal fpga writed 0x2804 0x7ebd0942
hal fpga writed 0x2804 0x014a76a0
hal fpga writed 0x2804 0x7eae097c
hal fpga writed 0x2804 0x01597665
hal fpga writed 0x2804 0x7e9e09b7
hal fpga writed 0x2804 0x016a762a
hal fpga writed 0x2804 0x7e8d09f3
hal fpga writed 0x2804 0x017a75ee
hal fpga writed 0x2804 0x7e7c0a2f
hal fpga writed 0x2804 0x018b75b2
hal fpga writed 0x2804 0x7e6b0a6b
hal fpga writed 0x2804 0x019d7575
hal fpga writed 0x2804 0x7e590aa8
hal fpga writed 0x2804 0x01af7538
hal fpga writed 0x2804 0x7e470ae6
hal fpga writed 0x2804 0x01c174fa
hal fpga writed 0x2804 0x7e340b24
hal fpga writed 0x2804 0x01d474bc
hal fpga writed 0x2804 0x7e210b62
hal fpga writed 0x2804 0x01e8747e
hal fpga writed 0x2804 0x7e0d0ba1
hal fpga writed 0x2804 0x01fc743e
hal fpga writed 0x2804 0x7df90be0
hal fpga writed 0x2804 0x021073ff
hal fpga writed 0x2804 0x7de40c20
hal fpga writed 0x2804 0x022573bf
hal fpga writed 0x2804 0x7dcf0c61
hal fpga writed 0x2804 0x023b737e
hal fpga writed 0x2804 0x7dba0ca1
hal fpga writed 0x2804 0x0251733d
hal fpga writed 0x2804 0x7da30ce3
hal fpga writed 0x2804 0x026772fc
hal fpga writed 0x2804 0x7d8d0d24
hal fpga writed 0x2804 0x027e72ba
hal fpga writed 0x2804 0x7d750d67
hal fpga writed 0x2804 0x02957277
hal fpga writed 0x2804 0x7d5e0da9
hal fpga writed 0x2804 0x02ad7234
hal fpga writed 0x2804 0x7d450dec
hal fpga writed 0x2804 0x02c671f1
hal fpga writed 0x2804 0x7d2d0e30
hal fpga writed 0x2804 0x02df71ad
hal fpga writed 0x2804 0x7d130e74
hal fpga writed 0x2804 0x02f97169
hal fpga writed 0x2804 0x7cf90eb8
hal fpga writed 0x2804 0x03137124
hal fpga writed 0x2804 0x7cdf0efd
hal fpga writed 0x2804 0x032d70df
hal fpga writed 0x2804 0x7cc40f42
hal fpga writed 0x2804 0x0349709a
hal fpga writed 0x2804 0x7ca80f88
hal fpga writed 0x2804 0x03647054
hal fpga writed 0x2804 0x7c8c0fce
hal fpga writed 0x2804 0x0381700d
hal fpga writed 0x2804 0x7c701015
hal fpga writed 0x2804 0x039e6fc7
hal fpga writed 0x2804 0x7c53105c
hal fpga writed 0x2804 0x03bb6f7f
hal fpga writed 0x2804 0x7c3510a3
hal fpga writed 0x2804 0x03d96f38
hal fpga writed 0x2804 0x7c1610eb
hal fpga writed 0x2804 0x03f86ef0
hal fpga writed 0x2804 0x7bf81133
hal fpga writed 0x2804 0x04176ea7
hal fpga writed 0x2804 0x7bd8117c
hal fpga writed 0x2804 0x04376e5f
hal fpga writed 0x2804 0x7bb811c5
hal fpga writed 0x2804 0x04576e16
hal fpga writed 0x2804 0x7b97120e
hal fpga writed 0x2804 0x04786dcc
hal fpga writed 0x2804 0x7b761258
hal fpga writed 0x2804 0x049a6d82
hal fpga writed 0x2804 0x7b5412a2
hal fpga writed 0x2804 0x04bc6d38
hal fpga writed 0x2804 0x7b3212ec
hal fpga writed 0x2804 0x04df6ced
hal fpga writed 0x2804 0x7b0f1337
hal fpga writed 0x2804 0x05026ca2
hal fpga writed 0x2804 0x7aeb1382
hal fpga writed 0x2804 0x05266c57
hal fpga writed 0x2804 0x7ac713ce
hal fpga writed 0x2804 0x054b6c0b
hal fpga writed 0x2804 0x7aa2141a
hal fpga writed 0x2804 0x05706bbf
hal fpga writed 0x2804 0x7a7c1466
hal fpga writed 0x2804 0x05966b73
hal fpga writed 0x2804 0x7a5614b3
hal fpga writed 0x2804 0x05bc6b26
hal fpga writed 0x2804 0x7a2f14ff
hal fpga writed 0x2804 0x05e36ad9
hal fpga writed 0x2804 0x7a08154d
hal fpga writed 0x2804 0x060b6a8c
hal fpga writed 0x2804 0x79e0159a
hal fpga writed 0x2804 0x06336a3e
hal fpga writed 0x2804 0x79b715e8
hal fpga writed 0x2804 0x065c69f0
hal fpga writed 0x2804 0x798e1636
hal fpga writed 0x2804 0x068669a2
hal fpga writed 0x2804 0x79641684
hal fpga writed 0x2804 0x06b06954
hal fpga writed 0x2804 0x793a16d3
hal fpga writed 0x2804 0x06db6905
hal fpga writed 0x2804 0x790f1722
hal fpga writed 0x2804 0x070668b6
hal fpga writed 0x2804 0x78e31771
hal fpga writed 0x2804 0x07326867
hal fpga writed 0x2804 0x78b617c0
hal fpga writed 0x2804 0x075f6817
hal fpga writed 0x2804 0x78891810
hal fpga writed 0x2804 0x078d67c7
hal fpga writed 0x2804 0x785b1860
hal fpga writed 0x2804 0x07bb6777
hal fpga writed 0x2804 0x782d18b0
hal fpga writed 0x2804 0x07ea6727
hal fpga writed 0x2804 0x77fe1900
hal fpga writed 0x2804 0x081966d6
hal fpga writed 0x2804 0x77ce1951
hal fpga writed 0x2804 0x08496686
hal fpga writed 0x2804 0x779e19a2
hal fpga writed 0x2804 0x087a6635
hal fpga writed 0x2804 0x776d19f3
hal fpga writed 0x2804 0x08ab65e4
hal fpga writed 0x2804 0x773b1a44
hal fpga writed 0x2804 0x08dd6592
hal fpga writed 0x2804 0x77081a95
hal fpga writed 0x2804 0x09106541
hal fpga writed 0x2804 0x76d51ae7
hal fpga writed 0x2804 0x094364ef
hal fpga writed 0x2804 0x76a21b39
hal fpga writed 0x2804 0x0978649d
hal fpga writed 0x2804 0x766d1b8b
hal fpga writed 0x2804 0x09ac644b
hal fpga writed 0x2804 0x76381bdd
hal fpga writed 0x2804 0x09e263f9
hal fpga writed 0x2804 0x76021c2f
hal fpga writed 0x2804 0x0a1863a7
hal fpga writed 0x2804 0x75cc1c81
hal fpga writed 0x2804 0x0a4f6354
hal fpga writed 0x2804 0x75951cd4
hal fpga writed 0x2804 0x0a866302
hal fpga writed 0x2804 0x755d1d27
hal fpga writed 0x2804 0x0abe62af
hal fpga writed 0x2804 0x75251d79
hal fpga writed 0x2804 0x0af7625c
hal fpga writed 0x2804 0x74eb1dcc
hal fpga writed 0x2804 0x0b306209
hal fpga writed 0x2804 0x74b21e1f
hal fpga writed 0x2804 0x0b6b61b6
hal fpga writed 0x2804 0x74771e73
hal fpga writed 0x2804 0x0ba56163
hal fpga writed 0x2804 0x743c1ec6
hal fpga writed 0x2804 0x0be16110
hal fpga writed 0x2804 0x74001f19
hal fpga writed 0x2804 0x0c1d60bc
hal fpga writed 0x2804 0x73c41f6c
hal fpga writed 0x2804 0x0c5a6069
hal fpga writed 0x2804 0x73861fc0
hal fpga writed 0x2804 0x0c976016
hal fpga writed 0x2804 0x73482013
hal fpga writed 0x2804 0x0cd65fc2
hal fpga writed 0x2804 0x730a2067
hal fpga writed 0x2804 0x0d155f6f
hal fpga writed 0x2804 0x72cb20ba
hal fpga writed 0x2804 0x0d545f1b
hal fpga writed 0x2804 0x728b210e
hal fpga writed 0x2804 0x0d955ec7
hal fpga writed 0x2804 0x724a2161
hal fpga writed 0x2804 0x0dd65e74
hal fpga writed 0x2804 0x720921b5
hal fpga writed 0x2804 0x0e175e20
hal fpga writed 0x2804 0x71c72209
hal fpga writed 0x2804 0x0e595dcd
hal fpga writed 0x2804 0x7184225c
hal fpga writed 0x2804 0x0e9c5d79
hal fpga writed 0x2804 0x714122b0
hal fpga writed 0x2804 0x0ee05d25
hal fpga writed 0x2804 0x70fd2303
hal fpga writed 0x2804 0x0f255cd2
hal fpga writed 0x2804 0x70b82357
hal fpga writed 0x2804 0x0f6a5c7e
hal fpga writed 0x2804 0x707323aa
hal fpga writed 0x2804 0x0faf5c2b
hal fpga writed 0x2804 0x702d23fe
hal fpga writed 0x2804 0x0ff65bd8
hal fpga writed 0x2804 0x6fe62451
hal fpga writed 0x2804 0x103d5b84
hal fpga writed 0x2804 0x6f9e24a4
hal fpga writed 0x2804 0x10845b31
hal fpga writed 0x2804 0x6f5624f8
hal fpga writed 0x2804 0x10cd5ade
hal fpga writed 0x2804 0x6f0e254b
hal fpga writed 0x2804 0x11165a8b
hal fpga writed 0x2804 0x6ec4259e
hal fpga writed 0x2804 0x11605a38
hal fpga writed 0x2804 0x6e7a25f1
hal fpga writed 0x2804 0x11aa59e5
hal fpga writed 0x2804 0x6e2f2644
hal fpga writed 0x2804 0x11f55992
hal fpga writed 0x2804 0x6de42696
hal fpga writed 0x2804 0x1241593f
hal fpga writed 0x2804 0x6d9826e9
hal fpga writed 0x2804 0x128d58ed
hal fpga writed 0x2804 0x6d4b273b
hal fpga writed 0x2804 0x12db589b
hal fpga writed 0x2804 0x6cfe278e
hal fpga writed 0x2804 0x13285848
hal fpga writed 0x2804 0x6cb027e0
hal fpga writed 0x2804 0x137757f6
hal fpga writed 0x2804 0x6c612832
hal fpga writed 0x2804 0x13c657a4
hal fpga writed 0x2804 0x6c122883
hal fpga writed 0x2804 0x14155753
hal fpga writed 0x2804 0x6bc228d5
hal fpga writed 0x2804 0x14665701
hal fpga writed 0x2804 0x6b712926
hal fpga writed 0x2804 0x14b756b0
hal fpga writed 0x2804 0x6b202978
hal fpga writed 0x2804 0x1508565f
hal fpga writed 0x2804 0x6ace29c9
hal fpga writed 0x2804 0x155b560e
hal fpga writed 0x2804 0x6a7b2a19
hal fpga writed 0x2804 0x15ae55bd
hal fpga writed 0x2804 0x6a282a6a
hal fpga writed 0x2804 0x1601556d
hal fpga writed 0x2804 0x69d42aba
hal fpga writed 0x2804 0x1655551d
hal fpga writed 0x2804 0x697f2b0a
hal fpga writed 0x2804 0x16aa54cd
hal fpga writed 0x2804 0x692a2b5a
hal fpga writed 0x2804 0x1700547d
hal fpga writed 0x2804 0x68d42baa
hal fpga writed 0x2804 0x1756542e
hal fpga writed 0x2804 0x687e2bf9
hal fpga writed 0x2804 0x17ac53df
hal fpga writed 0x2804 0x68272c48
hal fpga writed 0x2804 0x18045390
hal fpga writed 0x2804 0x67cf2c97
hal fpga writed 0x2804 0x185c5341
hal fpga writed 0x2804 0x67772ce5
hal fpga writed 0x2804 0x18b452f3
hal fpga writed 0x2804 0x671e2d33
hal fpga writed 0x2804 0x190d52a5
hal fpga writed 0x2804 0x66c52d81
hal fpga writed 0x2804 0x19675257
hal fpga writed 0x2804 0x666b2dce
hal fpga writed 0x2804 0x19c1520a
hal fpga writed 0x2804 0x66102e1b
hal fpga writed 0x2804 0x1a1c51bd
hal fpga writed 0x2804 0x65b52e68
hal fpga writed 0x2804 0x1a785171
hal fpga writed 0x2804 0x65592eb5
hal fpga writed 0x2804 0x1ad45124
hal fpga writed 0x2804 0x64fd2f01
hal fpga writed 0x2804 0x1b3150d9
hal fpga writed 0x2804 0x64a02f4c
hal fpga writed 0x2804 0x1b8e508d
hal fpga writed 0x2804 0x64422f98
hal fpga writed 0x2804 0x1bec5042
hal fpga writed 0x2804 0x63e42fe2
hal fpga writed 0x2804 0x1c4a4ff7
hal fpga writed 0x2804 0x6385302d
hal fpga writed 0x2804 0x1ca94fad
hal fpga writed 0x2804 0x63263077
hal fpga writed 0x2804 0x1d094f63
hal fpga writed 0x2804 0x62c630c1
hal fpga writed 0x2804 0x1d694f19
hal fpga writed 0x2804 0x6266310a
hal fpga writed 0x2804 0x1dc94ed0
hal fpga writed 0x2804 0x62053153
hal fpga writed 0x2804 0x1e2b4e88
hal fpga writed 0x2804 0x61a4319b
hal fpga writed 0x2804 0x1e8c4e40
hal fpga writed 0x2804 0x614231e3
hal fpga writed 0x2804 0x1eef4df8
hal fpga writed 0x2804 0x60df322b
hal fpga writed 0x2804 0x1f514db1
hal fpga writed 0x2804 0x607c3272
hal fpga writed 0x2804 0x1fb54d6a
hal fpga writed 0x2804 0x601832b8
hal fpga writed 0x2804 0x20194d23
hal fpga writed 0x2804 0x5fb432ff
hal fpga writed 0x2804 0x207d4cde
hal fpga writed 0x2804 0x5f503344
hal fpga writed 0x2804 0x20e24c98
hal fpga writed 0x2804 0x5eeb3389
hal fpga writed 0x2804 0x21474c53
hal fpga writed 0x2804 0x5e8533ce
hal fpga writed 0x2804 0x21ad4c0f
hal fpga writed 0x2804 0x5e1f3412
hal fpga writed 0x2804 0x22134bcb
hal fpga writed 0x2804 0x5db83456
hal fpga writed 0x2804 0x227a4b88
hal fpga writed 0x2804 0x5d513499
hal fpga writed 0x2804 0x22e14b45
hal fpga writed 0x2804 0x5cea34db
hal fpga writed 0x2804 0x23494b03
hal fpga writed 0x2804 0x5c82351d
hal fpga writed 0x2804 0x23b24ac1
hal fpga writed 0x2804 0x5c19355f
hal fpga writed 0x2804 0x241a4a80
hal fpga writed 0x2804 0x5bb035a0
hal fpga writed 0x2804 0x24834a3f
hal fpga writed 0x2804 0x5b4735e0
hal fpga writed 0x2804 0x24ed49ff
hal fpga writed 0x2804 0x5add3620
hal fpga writed 0x2804 0x255749c0
hal fpga writed 0x2804 0x5a73365f
hal fpga writed 0x2804 0x25c24981
hal fpga writed 0x2804 0x5a08369d
hal fpga writed 0x2804 0x262c4943
hal fpga writed 0x2804 0x599d36db
hal fpga writed 0x2804 0x26984905
hal fpga writed 0x2804 0x59313719
hal fpga writed 0x2804 0x270448c8
hal fpga writed 0x2804 0x58c53756
hal fpga writed 0x2804 0x2770488b
hal fpga writed 0x2804 0x58593792
hal fpga writed 0x2804 0x27dc484f
hal fpga writed 0x2804 0x57ec37cd
hal fpga writed 0x2804 0x28494814
hal fpga writed 0x2804 0x577f3808
hal fpga writed 0x2804 0x28b747da
hal fpga writed 0x2804 0x57113842
hal fpga writed 0x2804 0x292447a0
hal fpga writed 0x2804 0x56a4387c
hal fpga writed 0x2804 0x29934766
hal fpga writed 0x2804 0x563538b5
hal fpga writed 0x2804 0x2a01472e
hal fpga writed 0x2804 0x55c738ed
hal fpga writed 0x2804 0x2a7046f6
hal fpga writed 0x2804 0x55583925
hal fpga writed 0x2804 0x2adf46be
hal fpga writed 0x2804 0x54e8395c
hal fpga writed 0x2804 0x2b4f4688
hal fpga writed 0x2804 0x54783993
hal fpga writed 0x2804 0x2bbf4652
hal fpga writed 0x2804 0x540839c8
hal fpga writed 0x2804 0x2c2f461c
hal fpga writed 0x2804 0x539839fd
hal fpga writed 0x2804 0x2c9f45e8
hal fpga writed 0x2804 0x53273a31
hal fpga writed 0x2804 0x2d1045b4
hal fpga writed 0x2804 0x52b63a65
hal fpga writed 0x2804 0x2d814580
hal fpga writed 0x2804 0x52453a98
hal fpga writed 0x2804 0x2df3454e
hal fpga writed 0x2804 0x51d33aca
hal fpga writed 0x2804 0x2e65451c
hal fpga writed 0x2804 0x51613afc
hal fpga writed 0x2804 0x2ed744eb
hal fpga writed 0x2804 0x50ef3b2c
hal fpga writed 0x2804 0x2f4944bb
hal fpga writed 0x2804 0x507d3b5c
hal fpga writed 0x2804 0x2fbc448b
hal fpga writed 0x2804 0x500a3b8c
hal fpga writed 0x2804 0x302f445c
hal fpga writed 0x2804 0x4f973bba
hal fpga writed 0x2804 0x30a2442e
hal fpga writed 0x2804 0x4f243be8
hal fpga writed 0x2804 0x31154400
hal fpga writed 0x2804 0x4eb03c15
hal fpga writed 0x2804 0x318943d4
hal fpga writed 0x2804 0x4e3c3c41
hal fpga writed 0x2804 0x31fd43a8
hal fpga writed 0x2804 0x4dc83c6d
hal fpga writed 0x2804 0x3271437d
hal fpga writed 0x2804 0x4d543c98
hal fpga writed 0x2804 0x32e54352
hal fpga writed 0x2804 0x4ce03cc2
hal fpga writed 0x2804 0x33594329
hal fpga writed 0x2804 0x4c6b3ceb
hal fpga writed 0x2804 0x33ce4300
hal fpga writed 0x2804 0x4bf63d13
hal fpga writed 0x2804 0x344342d8
hal fpga writed 0x2804 0x4b813d3b
hal fpga writed 0x2804 0x34b842b0
hal fpga writed 0x2804 0x4b0c3d62
hal fpga writed 0x2804 0x352e428a
hal fpga writed 0x2804 0x4a973d88
hal fpga writed 0x2804 0x35a34264
hal fpga writed 0x2804 0x4a213dad
hal fpga writed 0x2804 0x3619423f
hal fpga writed 0x2804 0x49ac3dd2
hal fpga writed 0x2804 0x368e421b
hal fpga writed 0x2804 0x49363df5
hal fpga writed 0x2804 0x370441f8
hal fpga writed 0x2804 0x48c03e18
hal fpga writed 0x2804 0x377a41d6
hal fpga writed 0x2804 0x484a3e3a
hal fpga writed 0x2804 0x37f141b4
hal fpga writed 0x2804 0x47d33e5c
hal fpga writed 0x2804 0x38674193
hal fpga writed 0x2804 0x475d3e7c
hal fpga writed 0x2804 0x38dd4173
hal fpga writed 0x2804 0x46e63e9c
hal fpga writed 0x2804 0x39544154
hal fpga writed 0x2804 0x46703ebb
hal fpga writed 0x2804 0x39ca4135
hal fpga writed 0x2804 0x45f93ed9
hal fpga writed 0x2804 0x3a414118
hal fpga writed 0x2804 0x45823ef6
hal fpga writed 0x2804 0x3ab840fb
hal fpga writed 0x2804 0x450c3f12
hal fpga writed 0x2804 0x3b2f40df
hal fpga writed 0x2804 0x44953f2d
hal fpga writed 0x2804 0x3ba640c4
hal fpga writed 0x2804 0x441e3f48
hal fpga writed 0x2804 0x3c1d40aa
hal fpga writed 0x2804 0x43a73f62
hal fpga writed 0x2804 0x3c944091
hal fpga writed 0x2804 0x43303f7b
hal fpga writed 0x2804 0x3d0b4078
hal fpga writed 0x2804 0x42b93f93
hal fpga writed 0x2804 0x3d824061
hal fpga writed 0x2804 0x42413faa
hal fpga writed 0x2804 0x3df9404a
hal fpga writed 0x2804 0x41ca3fc0
hal fpga writed 0x2804 0x3e704034
hal fpga writed 0x2804 0x41533fd6
hal fpga writed 0x2804 0x3ee7401f
hal fpga writed 0x2804 0x40dc3feb
hal fpga writed 0x2804 0x3f5f400a
hal fpga writed 0x2804 0x40653ffe
hal fpga writed 0x2804 0x3fd63ff7
hal fpga writed 0x2804 0x3fee4011
hal fpga writed 0x2804 0x404d3fe5
hal fpga writed 0x2804 0x3f774023
hal fpga writed 0x2804 0x40c43fd3
hal fpga writed 0x2804 0x3f004034
hal fpga writed 0x2804 0x413b3fc2
hal fpga writed 0x2804 0x3e894045
hal fpga writed 0x2804 0x41b23fb2
hal fpga writed 0x2804 0x3e124054
hal fpga writed 0x2804 0x42293fa3
hal fpga writed 0x2804 0x3d9b4063
hal fpga writed 0x2804 0x42a03f95
hal fpga writed 0x2804 0x3d244070
hal fpga writed 0x2804 0x43173f88
hal fpga writed 0x2804 0x3cad407d
hal fpga writed 0x2804 0x438d3f7c
hal fpga writed 0x2804 0x3c364089
hal fpga writed 0x2804 0x44043f70
hal fpga writed 0x2804 0x3bc04094
hal fpga writed 0x2804 0x447b3f66
hal fpga writed 0x2804 0x3b49409e
hal fpga writed 0x2804 0x44f13f5c
hal fpga writed 0x2804 0x3ad340a8
hal fpga writed 0x2804 0x45683f53
hal fpga writed 0x2804 0x3a5c40b0
hal fpga writed 0x2804 0x45de3f4b
hal fpga writed 0x2804 0x39e640b8
hal fpga writed 0x2804 0x46543f44
hal fpga writed 0x2804 0x397040be
hal fpga writed 0x2804 0x46ca3f3e
hal fpga writed 0x2804 0x38fa40c4
hal fpga writed 0x2804 0x47403f38
hal fpga writed 0x2804 0x388440c9
hal fpga writed 0x2804 0x47b53f34
hal fpga writed 0x2804 0x380f40cd
hal fpga writed 0x2804 0x482b3f30
hal fpga writed 0x2804 0x379940d0
hal fpga writed 0x2804 0x48a03f2e
hal fpga writed 0x2804 0x372440d2
hal fpga writed 0x2804 0x49163f2c
hal fpga writed 0x2804 0x36af40d4
hal fpga writed 0x2804 0x498b3f2b
hal fpga writed 0x2804 0x363a40d4
hal fpga writed 0x2804 0x4a003f2b
hal fpga writed 0x2804 0x35c540d4
hal fpga writed 0x2804 0x4a743f2c
hal fpga writed 0x2804 0x355140d2
hal fpga writed 0x2804 0x4ae93f2e
hal fpga writed 0x2804 0x34dc40d0
hal fpga writed 0x2804 0x4b5d3f30
hal fpga writed 0x2804 0x346840cd
hal fpga writed 0x2804 0x4bd13f34
hal fpga writed 0x2804 0x33f440c9
hal fpga writed 0x2804 0x4c453f38
hal fpga writed 0x2804 0x338040c4
hal fpga writed 0x2804 0x4cb83f3e
hal fpga writed 0x2804 0x330d40be
hal fpga writed 0x2804 0x4d2c3f44
hal fpga writed 0x2804 0x329a40b8
hal fpga writed 0x2804 0x4d9f3f4b
hal fpga writed 0x2804 0x322740b0
hal fpga writed 0x2804 0x4e123f53
hal fpga writed 0x2804 0x31b440a8
hal fpga writed 0x2804 0x4e843f5c
hal fpga writed 0x2804 0x3142409f
hal fpga writed 0x2804 0x4ef63f65
hal fpga writed 0x2804 0x30d04095
hal fpga writed 0x2804 0x4f683f70
hal fpga writed 0x2804 0x305e408a
hal fpga writed 0x2804 0x4fda3f7b
hal fpga writed 0x2804 0x2fec407e
hal fpga writed 0x2804 0x504c3f88
hal fpga writed 0x2804 0x2f7b4071
hal fpga writed 0x2804 0x50bd3f95
hal fpga writed 0x2804 0x2f0a4063
hal fpga writed 0x2804 0x512e3fa3
hal fpga writed 0x2804 0x2e994055
hal fpga writed 0x2804 0x519e3fb2
hal fpga writed 0x2804 0x2e294045
hal fpga writed 0x2804 0x520e3fc2
hal fpga writed 0x2804 0x2db94035
hal fpga writed 0x2804 0x527e3fd2
hal fpga writed 0x2804 0x2d494024
hal fpga writed 0x2804 0x52ee3fe4
hal fpga writed 0x2804 0x2cda4012
hal fpga writed 0x2804 0x535d3ff6
hal fpga writed 0x2804 0x2c6b3fff
hal fpga writed 0x2804 0x53cc4009
hal fpga writed 0x2804 0x2bfc3fec
hal fpga writed 0x2804 0x543a401e
hal fpga writed 0x2804 0x2b8e3fd7
hal fpga writed 0x2804 0x54a84033
hal fpga writed 0x2804 0x2b203fc2
hal fpga writed 0x2804 0x55164048
hal fpga writed 0x2804 0x2ab23fab
hal fpga writed 0x2804 0x5583405f
hal fpga writed 0x2804 0x2a453f94
hal fpga writed 0x2804 0x55f04077
hal fpga writed 0x2804 0x29d83f7c
hal fpga writed 0x2804 0x565d408f
hal fpga writed 0x2804 0x296c3f64
hal fpga writed 0x2804 0x56c940a8
hal fpga writed 0x2804 0x29003f4a
hal fpga writed 0x2804 0x573540c2
hal fpga writed 0x2804 0x28943f2f
hal fpga writed 0x2804 0x57a140dd
hal fpga writed 0x2804 0x28293f14
hal fpga writed 0x2804 0x580c40f9
hal fpga writed 0x2804 0x27be3ef8
hal fpga writed 0x2804 0x58764115
hal fpga writed 0x2804 0x27543edb
hal fpga writed 0x2804 0x58e04133
hal fpga writed 0x2804 0x26ea3ebd
hal fpga writed 0x2804 0x594a4151
hal fpga writed 0x2804 0x26803e9f
hal fpga writed 0x2804 0x59b34170
hal fpga writed 0x2804 0x26173e7f
hal fpga writed 0x2804 0x5a1c4190
hal fpga writed 0x2804 0x25ae3e5f
hal fpga writed 0x2804 0x5a8541b0
hal fpga writed 0x2804 0x25463e3e
hal fpga writed 0x2804 0x5aed41d2
hal fpga writed 0x2804 0x24de3e1c
hal fpga writed 0x2804 0x5b5441f4
hal fpga writed 0x2804 0x24773df9
hal fpga writed 0x2804 0x5bbb4217
hal fpga writed 0x2804 0x24103dd6
hal fpga writed 0x2804 0x5c22423b
hal fpga writed 0x2804 0x23aa3db2
hal fpga writed 0x2804 0x5c884260
hal fpga writed 0x2804 0x23443d8d
hal fpga writed 0x2804 0x5cee4285
hal fpga writed 0x2804 0x22df3d67
hal fpga writed 0x2804 0x5d5342ab
hal fpga writed 0x2804 0x227a3d40
hal fpga writed 0x2804 0x5db742d2
hal fpga writed 0x2804 0x22153d19
hal fpga writed 0x2804 0x5e1c42fa
hal fpga writed 0x2804 0x21b13cf1
hal fpga writed 0x2804 0x5e7f4323
hal fpga writed 0x2804 0x214e3cc8
hal fpga writed 0x2804 0x5ee3434c
hal fpga writed 0x2804 0x20eb3c9e
hal fpga writed 0x2804 0x5f454376
hal fpga writed 0x2804 0x20893c73
hal fpga writed 0x2804 0x5fa743a1
hal fpga writed 0x2804 0x20273c48
hal fpga writed 0x2804 0x600943cd
hal fpga writed 0x2804 0x1fc53c1c
hal fpga writed 0x2804 0x606a43f9
hal fpga writed 0x2804 0x1f653bef
hal fpga writed 0x2804 0x60cb4426
hal fpga writed 0x2804 0x1f043bc2
hal fpga writed 0x2804 0x612b4454
hal fpga writed 0x2804 0x1ea43b94
hal fpga writed 0x2804 0x618a4483
hal fpga writed 0x2804 0x1e453b65
hal fpga writed 0x2804 0x61e944b2
hal fpga writed 0x2804 0x1de63b35
hal fpga writed 0x2804 0x624844e2
hal fpga writed 0x2804 0x1d883b04
hal fpga writed 0x2804 0x62a64513
hal fpga writed 0x2804 0x1d2b3ad3
hal fpga writed 0x2804 0x63034545
hal fpga writed 0x2804 0x1cce3aa1
hal fpga writed 0x2804 0x63604577
hal fpga writed 0x2804 0x1c713a6f
hal fpga writed 0x2804 0x63bc45aa
hal fpga writed 0x2804 0x1c153a3b
hal fpga writed 0x2804 0x641845de
hal fpga writed 0x2804 0x1bba3a07
hal fpga writed 0x2804 0x64734612
hal fpga writed 0x2804 0x1b5f39d2
hal fpga writed 0x2804 0x64cd4647
hal fpga writed 0x2804 0x1b05399d
hal fpga writed 0x2804 0x6527467d
hal fpga writed 0x2804 0x1aab3967
hal fpga writed 0x2804 0x658146b3
hal fpga writed 0x2804 0x1a523930
hal fpga writed 0x2804 0x65da46eb
hal fpga writed 0x2804 0x19f938f9
hal fpga writed 0x2804 0x66324722
hal fpga writed 0x2804 0x19a138c0
hal fpga writed 0x2804 0x668a475b
hal fpga writed 0x2804 0x194a3888
hal fpga writed 0x2804 0x66e14794
hal fpga writed 0x2804 0x18f3384e
hal fpga writed 0x2804 0x673747ce
hal fpga writed 0x2804 0x189d3814
hal fpga writed 0x2804 0x678d4808
hal fpga writed 0x2804 0x184737d9
hal fpga writed 0x2804 0x67e24844
hal fpga writed 0x2804 0x17f2379e
hal fpga writed 0x2804 0x6837487f
hal fpga writed 0x2804 0x179e3762
hal fpga writed 0x2804 0x688b48bc
hal fpga writed 0x2804 0x174a3725
hal fpga writed 0x2804 0x68df48f9
hal fpga writed 0x2804 0x16f736e7
hal fpga writed 0x2804 0x69324937
hal fpga writed 0x2804 0x16a436a9
hal fpga writed 0x2804 0x69844975
hal fpga writed 0x2804 0x1652366b
hal fpga writed 0x2804 0x69d649b4
hal fpga writed 0x2804 0x1601362c
hal fpga writed 0x2804 0x6a2749f3
hal fpga writed 0x2804 0x15b035ec
hal fpga writed 0x2804 0x6a774a33
hal fpga writed 0x2804 0x156035ab
hal fpga writed 0x2804 0x6ac74a74
hal fpga writed 0x2804 0x1510356a
hal fpga writed 0x2804 0x6b164ab6
hal fpga writed 0x2804 0x14c13529
hal fpga writed 0x2804 0x6b654af8
hal fpga writed 0x2804 0x147334e6
hal fpga writed 0x2804 0x6bb34b3a
hal fpga writed 0x2804 0x142534a3
hal fpga writed 0x2804 0x6c004b7d
hal fpga writed 0x2804 0x13d83460
hal fpga writed 0x2804 0x6c4d4bc1
hal fpga writed 0x2804 0x138c341c
hal fpga writed 0x2804 0x6c994c05
hal fpga writed 0x2804 0x134033d8
hal fpga writed 0x2804 0x6ce54c4a
hal fpga writed 0x2804 0x12f53392
hal fpga writed 0x2804 0x6d304c8f
hal fpga writed 0x2804 0x12aa334d
hal fpga writed 0x2804 0x6d7a4cd5
hal fpga writed 0x2804 0x12603307
hal fpga writed 0x2804 0x6dc34d1c
hal fpga writed 0x2804 0x121732c0
hal fpga writed 0x2804 0x6e0c4d63
hal fpga writed 0x2804 0x11ce3279
hal fpga writed 0x2804 0x6e554daa
hal fpga writed 0x2804 0x11863231
hal fpga writed 0x2804 0x6e9d4df2
hal fpga writed 0x2804 0x113f31e8
hal fpga writed 0x2804 0x6ee44e3b
hal fpga writed 0x2804 0x10f831a0
hal fpga writed 0x2804 0x6f2a4e84
hal fpga writed 0x2804 0x10b23156
hal fpga writed 0x2804 0x6f704ece
hal fpga writed 0x2804 0x106c310c
hal fpga writed 0x2804 0x6fb54f18
hal fpga writed 0x2804 0x102730c2
hal fpga writed 0x2804 0x6ffa4f62
hal fpga writed 0x2804 0x0fe33077
hal fpga writed 0x2804 0x703e4fae
hal fpga writed 0x2804 0x0f9f302c
hal fpga writed 0x2804 0x70814ff9
hal fpga writed 0x2804 0x0f5c2fe0
hal fpga writed 0x2804 0x70c45045
hal fpga writed 0x2804 0x0f1a2f93
hal fpga writed 0x2804 0x71065092
hal fpga writed 0x2804 0x0ed82f47
hal fpga writed 0x2804 0x714750df
hal fpga writed 0x2804 0x0e972ef9
hal fpga writed 0x2804 0x7188512c
hal fpga writed 0x2804 0x0e572eac
hal fpga writed 0x2804 0x71c8517a
hal fpga writed 0x2804 0x0e172e5d
hal fpga writed 0x2804 0x720851c9
hal fpga writed 0x2804 0x0dd82e0f
hal fpga writed 0x2804 0x72475218
hal fpga writed 0x2804 0x0d992dc0
hal fpga writed 0x2804 0x72855267
hal fpga writed 0x2804 0x0d5b2d70
hal fpga writed 0x2804 0x72c352b7
hal fpga writed 0x2804 0x0d1e2d20
hal fpga writed 0x2804 0x73005307
hal fpga writed 0x2804 0x0ce12cd0
hal fpga writed 0x2804 0x733c5358
hal fpga writed 0x2804 0x0ca52c7f
hal fpga writed 0x2804 0x737853a9
hal fpga writed 0x2804 0x0c6a2c2e
hal fpga writed 0x2804 0x73b353fa
hal fpga writed 0x2804 0x0c2f2bdc
hal fpga writed 0x2804 0x73ed544c
hal fpga writed 0x2804 0x0bf52b8a
hal fpga writed 0x2804 0x7427549e
hal fpga writed 0x2804 0x0bbb2b38
hal fpga writed 0x2804 0x746154f1
hal fpga writed 0x2804 0x0b822ae5
hal fpga writed 0x2804 0x74995544
hal fpga writed 0x2804 0x0b4a2a92
hal fpga writed 0x2804 0x74d15597
hal fpga writed 0x2804 0x0b122a3e
hal fpga writed 0x2804 0x750955eb
hal fpga writed 0x2804 0x0adb29ea
hal fpga writed 0x2804 0x753f563f
hal fpga writed 0x2804 0x0aa52996
hal fpga writed 0x2804 0x75755694
hal fpga writed 0x2804 0x0a6f2941
hal fpga writed 0x2804 0x75ab56e9
hal fpga writed 0x2804 0x0a3928ec
hal fpga writed 0x2804 0x75e0573e
hal fpga writed 0x2804 0x0a052896
hal fpga writed 0x2804 0x76145794
hal fpga writed 0x2804 0x09d12840
hal fpga writed 0x2804 0x764857ea
hal fpga writed 0x2804 0x099e27ea
hal fpga writed 0x2804 0x767b5840
hal fpga writed 0x2804 0x096b2794
hal fpga writed 0x2804 0x76ad5897
hal fpga writed 0x2804 0x0939273d
hal fpga writed 0x2804 0x76df58ee
hal fpga writed 0x2804 0x090726e6
hal fpga writed 0x2804 0x77105945
hal fpga writed 0x2804 0x08d6268e
hal fpga writed 0x2804 0x7741599d
hal fpga writed 0x2804 0x08a62636
hal fpga writed 0x2804 0x777159f5
hal fpga writed 0x2804 0x087625de
hal fpga writed 0x2804 0x77a05a4d
hal fpga writed 0x2804 0x08472586
hal fpga writed 0x2804 0x77cf5aa5
hal fpga writed 0x2804 0x0819252d
hal fpga writed 0x2804 0x77fe5afe
hal fpga writed 0x2804 0x07eb24d4
hal fpga writed 0x2804 0x782b5b58
hal fpga writed 0x2804 0x07bd247b
hal fpga writed 0x2804 0x78585bb1
hal fpga writed 0x2804 0x07912421
hal fpga writed 0x2804 0x78855c0b
hal fpga writed 0x2804 0x076423c7
hal fpga writed 0x2804 0x78b05c65
hal fpga writed 0x2804 0x0739236d
hal fpga writed 0x2804 0x78dc5cbf
hal fpga writed 0x2804 0x070e2313
hal fpga writed 0x2804 0x79065d1a
hal fpga writed 0x2804 0x06e322b8
hal fpga writed 0x2804 0x79305d75
hal fpga writed 0x2804 0x06ba225d
hal fpga writed 0x2804 0x795a5dd0
hal fpga writed 0x2804 0x06902202
hal fpga writed 0x2804 0x79835e2b
hal fpga writed 0x2804 0x066821a6
hal fpga writed 0x2804 0x79ab5e87
hal fpga writed 0x2804 0x0640214a
hal fpga writed 0x2804 0x79d35ee3
hal fpga writed 0x2804 0x061820ee
hal fpga writed 0x2804 0x79fa5f3f
hal fpga writed 0x2804 0x05f12092
hal fpga writed 0x2804 0x7a215f9b
hal fpga writed 0x2804 0x05cb2036
hal fpga writed 0x2804 0x7a475ff8
hal fpga writed 0x2804 0x05a51fd9
hal fpga writed 0x2804 0x7a6d6055
hal fpga writed 0x2804 0x05801f7c
hal fpga writed 0x2804 0x7a9260b2
hal fpga writed 0x2804 0x055b1f1f
hal fpga writed 0x2804 0x7ab6610f
hal fpga writed 0x2804 0x05371ec1
hal fpga writed 0x2804 0x7ada616c
hal fpga writed 0x2804 0x05141e64
hal fpga writed 0x2804 0x7afd61ca
hal fpga writed 0x2804 0x04f01e06
hal fpga writed 0x2804 0x7b206228
hal fpga writed 0x2804 0x04ce1da8
hal fpga writed 0x2804 0x7b426286
hal fpga writed 0x2804 0x04ac1d4a
hal fpga writed 0x2804 0x7b6462e5
hal fpga writed 0x2804 0x048b1ceb
hal fpga writed 0x2804 0x7b856343
hal fpga writed 0x2804 0x046a1c8d
hal fpga writed 0x2804 0x7ba563a2
hal fpga writed 0x2804 0x044a1c2e
hal fpga writed 0x2804 0x7bc56401
hal fpga writed 0x2804 0x042a1bcf
hal fpga writed 0x2804 0x7be56460
hal fpga writed 0x2804 0x040b1b70
hal fpga writed 0x2804 0x7c0464bf
hal fpga writed 0x2804 0x03ec1b10
hal fpga writed 0x2804 0x7c22651f
hal fpga writed 0x2804 0x03ce1ab1
hal fpga writed 0x2804 0x7c40657e
hal fpga writed 0x2804 0x03b01a51
hal fpga writed 0x2804 0x7c5e65de
hal fpga writed 0x2804 0x039319f1
hal fpga writed 0x2804 0x7c7b663e
hal fpga writed 0x2804 0x03761991
hal fpga writed 0x2804 0x7c97669e
hal fpga writed 0x2804 0x035a1931
hal fpga writed 0x2804 0x7cb366fe
hal fpga writed 0x2804 0x033f18d1
hal fpga writed 0x2804 0x7cce675f
hal fpga writed 0x2804 0x03231870
hal fpga writed 0x2804 0x7ce967bf
hal fpga writed 0x2804 0x0309180f
hal fpga writed 0x2804 0x7d036820
hal fpga writed 0x2804 0x02ef17af
hal fpga writed 0x2804 0x7d1d6881
hal fpga writed 0x2804 0x02d5174e
hal fpga writed 0x2804 0x7d3668e2
hal fpga writed 0x2804 0x02bc16ed
hal fpga writed 0x2804 0x7d4f6943
hal fpga writed 0x2804 0x02a4168b
hal fpga writed 0x2804 0x7d6869a4
hal fpga writed 0x2804 0x028b162a
hal fpga writed 0x2804 0x7d7f6a06
hal fpga writed 0x2804 0x027415c9
hal fpga writed 0x2804 0x7d976a67
hal fpga writed 0x2804 0x025d1567
hal fpga writed 0x2804 0x7dae6ac9
hal fpga writed 0x2804 0x02461505
hal fpga writed 0x2804 0x7dc46b2a
hal fpga writed 0x2804 0x023014a4
hal fpga writed 0x2804 0x7dda6b8c
hal fpga writed 0x2804 0x021a1442
hal fpga writed 0x2804 0x7def6bee
hal fpga writed 0x2804 0x020513e0
hal fpga writed 0x2804 0x7e046c50
hal fpga writed 0x2804 0x01f0137d
hal fpga writed 0x2804 0x7e196cb3
hal fpga writed 0x2804 0x01dc131b
hal fpga writed 0x2804 0x7e2d6d15
hal fpga writed 0x2804 0x01c812b9
hal fpga writed 0x2804 0x7e416d77
hal fpga writed 0x2804 0x01b51256
hal fpga writed 0x2804 0x7e546dda
hal fpga writed 0x2804 0x01a211f4
hal fpga writed 0x2804 0x7e666e3c
hal fpga writed 0x2804 0x01901191
hal fpga writed 0x2804 0x7e796e9f
hal fpga writed 0x2804 0x017e112e
hal fpga writed 0x2804 0x7e8a6f02
hal fpga writed 0x2804 0x016c10cc
hal fpga writed 0x2804 0x7e9c6f65
hal fpga writed 0x2804 0x015b1069
hal fpga writed 0x2804 0x7eac6fc8
hal fpga writed 0x2804 0x014a1006
hal fpga writed 0x2804 0x7ebd702b
hal fpga writed 0x2804 0x013a0fa3
hal fpga writed 0x2804 0x7ecd708e
hal fpga writed 0x2804 0x012a0f40
hal fpga writed 0x2804 0x7edc70f1
hal fpga writed 0x2804 0x011b0edc
hal fpga writed 0x2804 0x7eeb7154
hal fpga writed 0x2804 0x010c0e79
hal fpga writed 0x2804 0x7efa71b8
hal fpga writed 0x2804 0x00fe0e16
hal fpga writed 0x2804 0x7f08721b
hal fpga writed 0x2804 0x00f00db2
hal fpga writed 0x2804 0x7f16727f
hal fpga writed 0x2804 0x00e20d4f
hal fpga writed 0x2804 0x7f2472e2
hal fpga writed 0x2804 0x00d50ceb
hal fpga writed 0x2804 0x7f317346
hal fpga writed 0x2804 0x00c80c88
hal fpga writed 0x2804 0x7f3d73a9
hal fpga writed 0x2804 0x00bc0c24
hal fpga writed 0x2804 0x7f49740d
hal fpga writed 0x2804 0x00b00bc0
hal fpga writed 0x2804 0x7f557471
hal fpga writed 0x2804 0x00a40b5c
hal fpga writed 0x2804 0x7f6074d5
hal fpga writed 0x2804 0x00990af9
hal fpga writed 0x2804 0x7f6b7538
hal fpga writed 0x2804 0x008f0a95
hal fpga writed 0x2804 0x7f76759c
hal fpga writed 0x2804 0x00840a31
hal fpga writed 0x2804 0x7f807600
hal fpga writed 0x2804 0x007a09cd
hal fpga writed 0x2804 0x7f897664
hal fpga writed 0x2804 0x00710969
hal fpga writed 0x2804 0x7f9376c8
hal fpga writed 0x2804 0x00680905
hal fpga writed 0x2804 0x7f9c772c
hal fpga writed 0x2804 0x005f08a1
hal fpga writed 0x2804 0x7fa47791
hal fpga writed 0x2804 0x0057083c
hal fpga writed 0x2804 0x7fac77f5
hal fpga writed 0x2804 0x004f07d8
hal fpga writed 0x2804 0x7fb47859
hal fpga writed 0x2804 0x00470774
hal fpga writed 0x2804 0x7fbb78bd
hal fpga writed 0x2804 0x00400710
hal fpga writed 0x2804 0x7fc27921
hal fpga writed 0x2804 0x003906ac
hal fpga writed 0x2804 0x7fc97986
hal fpga writed 0x2804 0x00330647
hal fpga writed 0x2804 0x7fcf79ea
hal fpga writed 0x2804 0x002d05e3
hal fpga writed 0x2804 0x7fd57a4e
hal fpga writed 0x2804 0x0027057f
hal fpga writed 0x2804 0x7fda7ab3
hal fpga writed 0x2804 0x0022051a
hal fpga writed 0x2804 0x7fdf7b17
hal fpga writed 0x2804 0x001d04b6
hal fpga writed 0x2804 0x7fe47b7b
hal fpga writed 0x2804 0x00190451
hal fpga writed 0x2804 0x7fe87be0
hal fpga writed 0x2804 0x001503ed
hal fpga writed 0x2804 0x7fec7c44
hal fpga writed 0x2804 0x00110389
hal fpga writed 0x2804 0x7ff07ca9
hal fpga writed 0x2804 0x000d0324
hal fpga writed 0x2804 0x7ff37d0d
hal fpga writed 0x2804 0x000a02c0
hal fpga writed 0x2804 0x7ff67d72
hal fpga writed 0x2804 0x0008025b
hal fpga writed 0x2804 0x7ff97dd6
hal fpga writed 0x2804 0x000501f7
hal fpga writed 0x2804 0x7ffb7e3b
hal fpga writed 0x2804 0x00030192
hal fpga writed 0x2804 0x7ffc7e9f
hal fpga writed 0x2804 0x0002012e
hal fpga writed 0x2804 0x7ffe7f04
hal fpga writed 0x2804 0x000000c9
hal fpga writed 0x2804 0x7fff7f68
hal fpga writed 0x2804 0x00000065
hal fpga writed 0x2804 0x7fff7fcd
hal fpga writed 0x2804 0xffff0000
hal fpga writed 0x2804 0x7fff0032
hal fpga writed 0x2804 0x00007f9a
hal fpga writed 0x2804 0x7fff0097
hal fpga writed 0x2804 0x00017f36
hal fpga writed 0x2804 0x7ffe00fb
hal fpga writed 0x2804 0x00027ed1
hal fpga writed 0x2804 0x7ffc0160
hal fpga writed 0x2804 0x00047e6d
hal fpga writed 0x2804 0x7ffa01c4
hal fpga writed 0x2804 0x00067e08
hal fpga writed 0x2804 0x7ff80229
hal fpga writed 0x2804 0x00087da4
hal fpga writed 0x2804 0x7ff6028d
hal fpga writed 0x2804 0x000b7d3f
hal fpga writed 0x2804 0x7ff302f2
hal fpga writed 0x2804 0x000e7cdb
hal fpga writed 0x2804 0x7fef0356
hal fpga writed 0x2804 0x00117c76
hal fpga writed 0x2804 0x7fec03bb
hal fpga writed 0x2804 0x00157c12
hal fpga writed 0x2804 0x7fe8041f
hal fpga writed 0x2804 0x00197bae
hal fpga writed 0x2804 0x7fe40484
hal fpga writed 0x2804 0x001e7b49
hal fpga writed 0x2804 0x7fdf04e8
hal fpga writed 0x2804 0x00237ae5
hal fpga writed 0x2804 0x7fda054c
hal fpga writed 0x2804 0x00287a80
hal fpga writed 0x2804 0x7fd405b1
hal fpga writed 0x2804 0x002e7a1c
hal fpga writed 0x2804 0x7fce0615
hal fpga writed 0x2804 0x003479b8
hal fpga writed 0x2804 0x7fc80679
hal fpga writed 0x2804 0x003a7954
hal fpga writed 0x2804 0x7fc206de
hal fpga writed 0x2804 0x004178ef
hal fpga writed 0x2804 0x7fbb0742
hal fpga writed 0x2804 0x0048788b
hal fpga writed 0x2804 0x7fb307a6
hal fpga writed 0x2804 0x00507827
hal fpga writed 0x2804 0x7fab080a
hal fpga writed 0x2804 0x005877c3
hal fpga writed 0x2804 0x7fa3086e
hal fpga writed 0x2804 0x0060775f
hal fpga writed 0x2804 0x7f9b08d3
hal fpga writed 0x2804 0x006976fa
hal fpga writed 0x2804 0x7f920937
hal fpga writed 0x2804 0x00727696
hal fpga writed 0x2804 0x7f88099b
hal fpga writed 0x2804 0x007b7632
hal fpga writed 0x2804 0x7f7f09ff
hal fpga writed 0x2804 0x008575ce
hal fpga writed 0x2804 0x7f750a63
hal fpga writed 0x2804 0x0090756a
hal fpga writed 0x2804 0x7f6a0ac6
hal fpga writed 0x2804 0x009a7507
hal fpga writed 0x2804 0x7f5f0b2a
hal fpga writed 0x2804 0x00a674a3
hal fpga writed 0x2804 0x7f540b8e
hal fpga writed 0x2804 0x00b1743f
hal fpga writed 0x2804 0x7f480bf2
hal fpga writed 0x2804 0x00bd73db
hal fpga writed 0x2804 0x7f3c0c56
hal fpga writed 0x2804 0x00ca7378
hal fpga writed 0x2804 0x7f2f0cb9
hal fpga writed 0x2804 0x00d67314
hal fpga writed 0x2804 0x7f220d1d
hal fpga writed 0x2804 0x00e472b0
hal fpga writed 0x2804 0x7f150d80
hal fpga writed 0x2804 0x00f1724d
hal fpga writed 0x2804 0x7f070de4
hal fpga writed 0x2804 0x00ff71ea
hal fpga writed 0x2804 0x7ef80e47
hal fpga writed 0x2804 0x010e7186
hal fpga writed 0x2804 0x7eea0eaa
hal fpga writed 0x2804 0x011d7123
hal fpga writed 0x2804 0x7edb0f0e
hal fpga writed 0x2804 0x012c70c0
hal fpga writed 0x2804 0x7ecb0f71
hal fpga writed 0x2804 0x013c705d
hal fpga writed 0x2804 0x7ebb0fd4
hal fpga writed 0x2804 0x014c6ff9
hal fpga writed 0x2804 0x7eaa1037
hal fpga writed 0x2804 0x015d6f97
hal fpga writed 0x2804 0x7e9a109a
hal fpga writed 0x2804 0x016e6f34
hal fpga writed 0x2804 0x7e8810fd
hal fpga writed 0x2804 0x01806ed1
hal fpga writed 0x2804 0x7e761160
hal fpga writed 0x2804 0x01926e6e
hal fpga writed 0x2804 0x7e6411c2
hal fpga writed 0x2804 0x01a46e0b
hal fpga writed 0x2804 0x7e511225
hal fpga writed 0x2804 0x01b76da9
hal fpga writed 0x2804 0x7e3e1287
hal fpga writed 0x2804 0x01cb6d47
hal fpga writed 0x2804 0x7e2a12ea
hal fpga writed 0x2804 0x01df6ce4
hal fpga writed 0x2804 0x7e16134c
hal fpga writed 0x2804 0x01f36c82
hal fpga writed 0x2804 0x7e0213ae
hal fpga writed 0x2804 0x02086c20
hal fpga writed 0x2804 0x7ded1410
hal fpga writed 0x2804 0x021d6bbe
hal fpga writed 0x2804 0x7dd71472
hal fpga writed 0x2804 0x02336b5c
hal fpga writed 0x2804 0x7dc114d4
hal fpga writed 0x2804 0x02496afa
hal fpga writed 0x2804 0x7dab1536
hal fpga writed 0x2804 0x02606a98
hal fpga writed 0x2804 0x7d941597
hal fpga writed 0x2804 0x02776a37
hal fpga writed 0x2804 0x7d7c15f9
hal fpga writed 0x2804 0x028f69d5
hal fpga writed 0x2804 0x7d64165a
hal fpga writed 0x2804 0x02a76974
hal fpga writed 0x2804 0x7d4c16bb
hal fpga writed 0x2804 0x02c06913
hal fpga writed 0x2804 0x7d33171d
hal fpga writed 0x2804 0x02d968b2
hal fpga writed 0x2804 0x7d19177e
hal fpga writed 0x2804 0x02f26851
hal fpga writed 0x2804 0x7d0017de
hal fpga writed 0x2804 0x030d67f0
hal fpga writed 0x2804 0x7ce5183f
hal fpga writed 0x2804 0x03276790
hal fpga writed 0x2804 0x7cca18a0
hal fpga writed 0x2804 0x0343672f
hal fpga writed 0x2804 0x7caf1900
hal fpga writed 0x2804 0x035e66cf
hal fpga writed 0x2804 0x7c931960
hal fpga writed 0x2804 0x037a666f
hal fpga writed 0x2804 0x7c7619c0
hal fpga writed 0x2804 0x0397660f
hal fpga writed 0x2804 0x7c591a20
hal fpga writed 0x2804 0x03b465af
hal fpga writed 0x2804 0x7c3c1a80
hal fpga writed 0x2804 0x03d2654f
hal fpga writed 0x2804 0x7c1e1adf
hal fpga writed 0x2804 0x03f064f0
hal fpga writed 0x2804 0x7bff1b3f
hal fpga writed 0x2804 0x040f6490
hal fpga writed 0x2804 0x7be01b9e
hal fpga writed 0x2804 0x042f6431
hal fpga writed 0x2804 0x7bc01bfd
hal fpga writed 0x2804 0x044f63d2
hal fpga writed 0x2804 0x7ba01c5c
hal fpga writed 0x2804 0x046f6374
hal fpga writed 0x2804 0x7b801cbb
hal fpga writed 0x2804 0x04906315
hal fpga writed 0x2804 0x7b5e1d19
hal fpga writed 0x2804 0x04b162b7
hal fpga writed 0x2804 0x7b3d1d77
hal fpga writed 0x2804 0x04d46258
hal fpga writed 0x2804 0x7b1a1dd6
hal fpga writed 0x2804 0x04f661fb
hal fpga writed 0x2804 0x7af71e33
hal fpga writed 0x2804 0x0519619d
hal fpga writed 0x2804 0x7ad41e91
hal fpga writed 0x2804 0x053d613f
hal fpga writed 0x2804 0x7ab01eef
hal fpga writed 0x2804 0x056160e2
hal fpga writed 0x2804 0x7a8b1f4c
hal fpga writed 0x2804 0x05866085
hal fpga writed 0x2804 0x7a661fa9
hal fpga writed 0x2804 0x05ab6028
hal fpga writed 0x2804 0x7a412006
hal fpga writed 0x2804 0x05d15fcb
hal fpga writed 0x2804 0x7a1a2062
hal fpga writed 0x2804 0x05f85f6f
hal fpga writed 0x2804 0x79f420be
hal fpga writed 0x2804 0x061f5f13
hal fpga writed 0x2804 0x79cc211a
hal fpga writed 0x2804 0x06475eb7
hal fpga writed 0x2804 0x79a42176
hal fpga writed 0x2804 0x066f5e5b
hal fpga writed 0x2804 0x797c21d2
hal fpga writed 0x2804 0x06985dff
hal fpga writed 0x2804 0x7953222d
hal fpga writed 0x2804 0x06c15da4
hal fpga writed 0x2804 0x79292288
hal fpga writed 0x2804 0x06eb5d49
hal fpga writed 0x2804 0x78ff22e3
hal fpga writed 0x2804 0x07155cef
hal fpga writed 0x2804 0x78d4233e
hal fpga writed 0x2804 0x07415c94
hal fpga writed 0x2804 0x78a92398
hal fpga writed 0x2804 0x076c5c3a
hal fpga writed 0x2804 0x787d23f2
hal fpga writed 0x2804 0x07995be0
hal fpga writed 0x2804 0x7850244c
hal fpga writed 0x2804 0x07c65b87
hal fpga writed 0x2804 0x782324a5
hal fpga writed 0x2804 0x07f35b2d
hal fpga writed 0x2804 0x77f524fe
hal fpga writed 0x2804 0x08215ad5
hal fpga writed 0x2804 0x77c72557
hal fpga writed 0x2804 0x08505a7c
hal fpga writed 0x2804 0x779825af
hal fpga writed 0x2804 0x087f5a24
hal fpga writed 0x2804 0x77682608
hal fpga writed 0x2804 0x08af59cb
hal fpga writed 0x2804 0x7738265f
hal fpga writed 0x2804 0x08df5974
hal fpga writed 0x2804 0x770726b7
hal fpga writed 0x2804 0x0911591c
hal fpga writed 0x2804 0x76d6270e
hal fpga writed 0x2804 0x094258c5
hal fpga writed 0x2804 0x76a42765
hal fpga writed 0x2804 0x0975586f
hal fpga writed 0x2804 0x767127bc
hal fpga writed 0x2804 0x09a75818
hal fpga writed 0x2804 0x763e2812
hal fpga writed 0x2804 0x09db57c2
hal fpga writed 0x2804 0x760a2868
hal fpga writed 0x2804 0x0a0f576c
hal fpga writed 0x2804 0x75d628bd
hal fpga writed 0x2804 0x0a445717
hal fpga writed 0x2804 0x75a02913
hal fpga writed 0x2804 0x0a7956c2
hal fpga writed 0x2804 0x756b2967
hal fpga writed 0x2804 0x0aaf566d
hal fpga writed 0x2804 0x753429bc
hal fpga writed 0x2804 0x0ae65619
hal fpga writed 0x2804 0x74fe2a10
hal fpga writed 0x2804 0x0b1d55c5
hal fpga writed 0x2804 0x74c62a64
hal fpga writed 0x2804 0x0b555572
hal fpga writed 0x2804 0x748e2ab7
hal fpga writed 0x2804 0x0b8e551e
hal fpga writed 0x2804 0x74552b0a
hal fpga writed 0x2804 0x0bc754cc
hal fpga writed 0x2804 0x741c2b5c
hal fpga writed 0x2804 0x0c005479
hal fpga writed 0x2804 0x73e12baf
hal fpga writed 0x2804 0x0c3b5427
hal fpga writed 0x2804 0x73a72c00
hal fpga writed 0x2804 0x0c7653d6
hal fpga writed 0x2804 0x736b2c52
hal fpga writed 0x2804 0x0cb15385
hal fpga writed 0x2804 0x73302ca3
hal fpga writed 0x2804 0x0cee5334
hal fpga writed 0x2804 0x72f32cf3
hal fpga writed 0x2804 0x0d2b52e4
hal fpga writed 0x2804 0x72b62d43
hal fpga writed 0x2804 0x0d685294
hal fpga writed 0x2804 0x72782d93
hal fpga writed 0x2804 0x0da65245
hal fpga writed 0x2804 0x72392de2
hal fpga writed 0x2804 0x0de551f6
hal fpga writed 0x2804 0x71fa2e31
hal fpga writed 0x2804 0x0e2451a7
hal fpga writed 0x2804 0x71bb2e7f
hal fpga writed 0x2804 0x0e645159
hal fpga writed 0x2804 0x717a2ecd
hal fpga writed 0x2804 0x0ea5510b
hal fpga writed 0x2804 0x71392f1a
hal fpga writed 0x2804 0x0ee650be
hal fpga writed 0x2804 0x70f82f67
hal fpga writed 0x2804 0x0f285072
hal fpga writed 0x2804 0x70b52fb4
hal fpga writed 0x2804 0x0f6b5025
hal fpga writed 0x2804 0x70733000
hal fpga writed 0x2804 0x0fae4fda
hal fpga writed 0x2804 0x702f304b
hal fpga writed 0x2804 0x0ff24f8e
hal fpga writed 0x2804 0x6feb3096
hal fpga writed 0x2804 0x10374f44
hal fpga writed 0x2804 0x6fa630e0
hal fpga writed 0x2804 0x107c4ef9
hal fpga writed 0x2804 0x6f61312a
hal fpga writed 0x2804 0x10c14eb0
hal fpga writed 0x2804 0x6f1b3174
hal fpga writed 0x2804 0x11084e67
hal fpga writed 0x2804 0x6ed431bd
hal fpga writed 0x2804 0x114f4e1e
hal fpga writed 0x2804 0x6e8c3205
hal fpga writed 0x2804 0x11964dd6
hal fpga writed 0x2804 0x6e45324d
hal fpga writed 0x2804 0x11df4d8e
hal fpga writed 0x2804 0x6dfc3295
hal fpga writed 0x2804 0x12284d47
hal fpga writed 0x2804 0x6db332dc
hal fpga writed 0x2804 0x12714d00
hal fpga writed 0x2804 0x6d693322
hal fpga writed 0x2804 0x12bb4cba
hal fpga writed 0x2804 0x6d1e3368
hal fpga writed 0x2804 0x13064c75
hal fpga writed 0x2804 0x6cd333ad
hal fpga writed 0x2804 0x13514c30
hal fpga writed 0x2804 0x6c8833f1
hal fpga writed 0x2804 0x139e4beb
hal fpga writed 0x2804 0x6c3b3436
hal fpga writed 0x2804 0x13ea4ba8
hal fpga writed 0x2804 0x6bee3479
hal fpga writed 0x2804 0x14374b64
hal fpga writed 0x2804 0x6ba134bc
hal fpga writed 0x2804 0x14854b22
hal fpga writed 0x2804 0x6b5234fe
hal fpga writed 0x2804 0x14d44ae0
hal fpga writed 0x2804 0x6b043540
hal fpga writed 0x2804 0x15234a9e
hal fpga writed 0x2804 0x6ab43581
hal fpga writed 0x2804 0x15734a5d
hal fpga writed 0x2804 0x6a6435c2
hal fpga writed 0x2804 0x15c34a1d
hal fpga writed 0x2804 0x6a133602
hal fpga writed 0x2804 0x161449dd
hal fpga writed 0x2804 0x69c23641
hal fpga writed 0x2804 0x1666499e
hal fpga writed 0x2804 0x69703680
hal fpga writed 0x2804 0x16b84960
hal fpga writed 0x2804 0x691e36be
hal fpga writed 0x2804 0x170b4922
hal fpga writed 0x2804 0x68cb36fc
hal fpga writed 0x2804 0x175e48e5
hal fpga writed 0x2804 0x68773739
hal fpga writed 0x2804 0x17b248a8
hal fpga writed 0x2804 0x68233775
hal fpga writed 0x2804 0x1807486c
hal fpga writed 0x2804 0x67ce37b0
hal fpga writed 0x2804 0x185c4831
hal fpga writed 0x2804 0x677837eb
hal fpga writed 0x2804 0x18b247f6
hal fpga writed 0x2804 0x67223826
hal fpga writed 0x2804 0x190847bc
hal fpga writed 0x2804 0x66cb385f
hal fpga writed 0x2804 0x195f4783
hal fpga writed 0x2804 0x66743898
hal fpga writed 0x2804 0x19b7474b
hal fpga writed 0x2804 0x661c38d1
hal fpga writed 0x2804 0x1a0f4713
hal fpga writed 0x2804 0x65c43908
hal fpga writed 0x2804 0x1a6846db
hal fpga writed 0x2804 0x656b393f
hal fpga writed 0x2804 0x1ac146a5
hal fpga writed 0x2804 0x65113975
hal fpga writed 0x2804 0x1b1b466f
hal fpga writed 0x2804 0x64b739ab
hal fpga writed 0x2804 0x1b75463a
hal fpga writed 0x2804 0x645c39e0
hal fpga writed 0x2804 0x1bd04605
hal fpga writed 0x2804 0x64013a14
hal fpga writed 0x2804 0x1c2c45d1
hal fpga writed 0x2804 0x63a53a48
hal fpga writed 0x2804 0x1c88459e
hal fpga writed 0x2804 0x63483a7a
hal fpga writed 0x2804 0x1ce5456c
hal fpga writed 0x2804 0x62eb3aac
hal fpga writed 0x2804 0x1d42453a
hal fpga writed 0x2804 0x628e3ade
hal fpga writed 0x2804 0x1da04509
hal fpga writed 0x2804 0x62303b0e
hal fpga writed 0x2804 0x1dfe44d9
hal fpga writed 0x2804 0x61d13b3e
hal fpga writed 0x2804 0x1e5d44a9
hal fpga writed 0x2804 0x61723b6d
hal fpga writed 0x2804 0x1ebd447a
hal fpga writed 0x2804 0x61123b9c
hal fpga writed 0x2804 0x1f1d444c
hal fpga writed 0x2804 0x60b23bc9
hal fpga writed 0x2804 0x1f7d441f
hal fpga writed 0x2804 0x60513bf6
hal fpga writed 0x2804 0x1fde43f3
hal fpga writed 0x2804 0x5ff03c22
hal fpga writed 0x2804 0x204043c7
hal fpga writed 0x2804 0x5f8e3c4e
hal fpga writed 0x2804 0x20a2439c
hal fpga writed 0x2804 0x5f2c3c79
hal fpga writed 0x2804 0x21054371
hal fpga writed 0x2804 0x5ec93ca2
hal fpga writed 0x2804 0x21684348
hal fpga writed 0x2804 0x5e653ccc
hal fpga writed 0x2804 0x21cb431f
hal fpga writed 0x2804 0x5e023cf4
hal fpga writed 0x2804 0x223042f7
hal fpga writed 0x2804 0x5d9d3d1b
hal fpga writed 0x2804 0x229442d0
hal fpga writed 0x2804 0x5d383d42
hal fpga writed 0x2804 0x22f942aa
hal fpga writed 0x2804 0x5cd33d68
hal fpga writed 0x2804 0x235f4284
hal fpga writed 0x2804 0x5c6d3d8d
hal fpga writed 0x2804 0x23c5425f
hal fpga writed 0x2804 0x5c073db2
hal fpga writed 0x2804 0x242b423b
hal fpga writed 0x2804 0x5ba03dd6
hal fpga writed 0x2804 0x24924218
hal fpga writed 0x2804 0x5b393df8
hal fpga writed 0x2804 0x24fa41f6
hal fpga writed 0x2804 0x5ad13e1a
hal fpga writed 0x2804 0x256241d4
hal fpga writed 0x2804 0x5a693e3c
hal fpga writed 0x2804 0x25ca41b3
hal fpga writed 0x2804 0x5a003e5c
hal fpga writed 0x2804 0x26334193
hal fpga writed 0x2804 0x59973e7c
hal fpga writed 0x2804 0x269c4174
hal fpga writed 0x2804 0x592e3e9a
hal fpga writed 0x2804 0x27064156
hal fpga writed 0x2804 0x58c43eb8
hal fpga writed 0x2804 0x27704138
hal fpga writed 0x2804 0x585a3ed5
hal fpga writed 0x2804 0x27db411b
hal fpga writed 0x2804 0x57ef3ef2
hal fpga writed 0x2804 0x284640ff
hal fpga writed 0x2804 0x57843f0d
hal fpga writed 0x2804 0x28b140e4
hal fpga writed 0x2804 0x57183f28
hal fpga writed 0x2804 0x291d40ca
hal fpga writed 0x2804 0x56ac3f42
hal fpga writed 0x2804 0x298940b1
hal fpga writed 0x2804 0x56403f5b
hal fpga writed 0x2804 0x29f64098
hal fpga writed 0x2804 0x55d33f73
hal fpga writed 0x2804 0x2a634081
hal fpga writed 0x2804 0x55663f8a
hal fpga writed 0x2804 0x2ad0406a
hal fpga writed 0x2804 0x54f83fa0
hal fpga writed 0x2804 0x2b3e4054
hal fpga writed 0x2804 0x548a3fb6
hal fpga writed 0x2804 0x2bac403f
hal fpga writed 0x2804 0x541c3fcb
hal fpga writed 0x2804 0x2c1a402a
hal fpga writed 0x2804 0x53ad3fde
hal fpga writed 0x2804 0x2c894017
hal fpga writed 0x2804 0x533e3ff1
hal fpga writed 0x2804 0x2cf84004
hal fpga writed 0x2804 0x52cf4004
hal fpga writed 0x2804 0x2d683ff3
hal fpga writed 0x2804 0x525f4015
hal fpga writed 0x2804 0x2dd83fe2
hal fpga writed 0x2804 0x51ef4025
hal fpga writed 0x2804 0x2e483fd2
hal fpga writed 0x2804 0x517f4035
hal fpga writed 0x2804 0x2eb83fc3
hal fpga writed 0x2804 0x510e4043
hal fpga writed 0x2804 0x2f293fb5
hal fpga writed 0x2804 0x509d4051
hal fpga writed 0x2804 0x2f9a3fa7
hal fpga writed 0x2804 0x502c405e
hal fpga writed 0x2804 0x300c3f9b
hal fpga writed 0x2804 0x4fbb406a
hal fpga writed 0x2804 0x307d3f8f
hal fpga writed 0x2804 0x4f494075
hal fpga writed 0x2804 0x30ef3f84
hal fpga writed 0x2804 0x4ed74080
hal fpga writed 0x2804 0x31623f7a
hal fpga writed 0x2804 0x4e644089
hal fpga writed 0x2804 0x31d43f71
hal fpga writed 0x2804 0x4df24092
hal fpga writed 0x2804 0x32473f69
hal fpga writed 0x2804 0x4d7f4099
hal fpga writed 0x2804 0x32ba3f62
hal fpga writed 0x2804 0x4d0b40a0
hal fpga writed 0x2804 0x332d3f5c
hal fpga writed 0x2804 0x4c9840a6
hal fpga writed 0x2804 0x33a13f56
hal fpga writed 0x2804 0x4c2440ab
hal fpga writed 0x2804 0x34153f52
hal fpga writed 0x2804 0x4bb040af
hal fpga writed 0x2804 0x34893f4e
hal fpga writed 0x2804 0x4b3c40b3
hal fpga writed 0x2804 0x34fd3f4b
hal fpga writed 0x2804 0x4ac840b5
hal fpga writed 0x2804 0x35713f49
hal fpga writed 0x2804 0x4a5340b6
hal fpga writed 0x2804 0x35e63f48
hal fpga writed 0x2804 0x49df40b7
hal fpga writed 0x2804 0x365b3f48
hal fpga writed 0x2804 0x496a40b7
hal fpga writed 0x2804 0x36d03f49
hal fpga writed 0x2804 0x48f540b6
hal fpga writed 0x2804 0x37453f4a
hal fpga writed 0x2804 0x487f40b4
hal fpga writed 0x2804 0x37bb3f4d
hal fpga writed 0x2804 0x480a40b1
hal fpga writed 0x2804 0x38303f50
hal fpga writed 0x2804 0x479440ad
hal fpga writed 0x2804 0x38a63f54
hal fpga writed 0x2804 0x471e40a8
hal fpga writed 0x2804 0x391c3f5a
hal fpga writed 0x2804 0x46a840a3
hal fpga writed 0x2804 0x39923f60
hal fpga writed 0x2804 0x4632409c
hal fpga writed 0x2804 0x3a083f66
hal fpga writed 0x2804 0x45bc4095
hal fpga writed 0x2804 0x3a7e3f6e
hal fpga writed 0x2804 0x4546408d
hal fpga writed 0x2804 0x3af43f77
hal fpga writed 0x2804 0x44cf4083
hal fpga writed 0x2804 0x3b6b3f80
hal fpga writed 0x2804 0x44594079
hal fpga writed 0x2804 0x3be23f8b
hal fpga writed 0x2804 0x43e2406f
hal fpga writed 0x2804 0x3c583f96
hal fpga writed 0x2804 0x436b4063
hal fpga writed 0x2804 0x3ccf3fa2
hal fpga writed 0x2804 0x42f54056
hal fpga writed 0x2804 0x3d463faf
hal fpga writed 0x2804 0x427e4049
hal fpga writed 0x2804 0x3dbd3fbd
hal fpga writed 0x2804 0x4207403a
hal fpga writed 0x2804 0x3e343fcc
hal fpga writed 0x2804 0x4190402b
hal fpga writed 0x2804 0x3eab3fdc
hal fpga writed 0x2804 0x4119401b
hal fpga writed 0x2804 0x3f223fec
hal fpga writed 0x2804 0x40a1400a
hal fpga writed 0x2804 0x3f993ffe
hal fpga writed 0x2804 0x402a3ff8
hal fpga writed 0x2804 0x40104010
hal fpga writed 0x2804 0x3fb33fe5
hal fpga writed 0x2804 0x40874023
hal fpga writed 0x2804 0x3f3c3fd2
hal fpga writed 0x2804 0x40ff4037
hal fpga writed 0x2804 0x3ec53fbd
hal fpga writed 0x2804 0x4176404c
hal fpga writed 0x2804 0x3e4e3fa8
hal fpga writed 0x2804 0x41ed4062
hal fpga writed 0x2804 0x3dd63f92
hal fpga writed 0x2804 0x42644079
hal fpga writed 0x2804 0x3d5f3f7b
hal fpga writed 0x2804 0x42db4090
hal fpga writed 0x2804 0x3ce83f63
hal fpga writed 0x2804 0x435240a8
hal fpga writed 0x2804 0x3c713f4a
hal fpga writed 0x2804 0x43c940c2
hal fpga writed 0x2804 0x3bfa3f30
hal fpga writed 0x2804 0x444040dc
hal fpga writed 0x2804 0x3b833f16
hal fpga writed 0x2804 0x44b740f6
hal fpga writed 0x2804 0x3b0c3efb
hal fpga writed 0x2804 0x452e4112
hal fpga writed 0x2804 0x3a953edf
hal fpga writed 0x2804 0x45a5412f
hal fpga writed 0x2804 0x3a1e3ec2
hal fpga writed 0x2804 0x461c414c
hal fpga writed 0x2804 0x39a83ea4
hal fpga writed 0x2804 0x4693416a
hal fpga writed 0x2804 0x39313e85
hal fpga writed 0x2804 0x47094189
hal fpga writed 0x2804 0x38bb3e66
hal fpga writed 0x2804 0x478041a9
hal fpga writed 0x2804 0x38443e46
hal fpga writed 0x2804 0x47f641ca
hal fpga writed 0x2804 0x37ce3e25
hal fpga writed 0x2804 0x486c41eb
hal fpga writed 0x2804 0x37583e03
hal fpga writed 0x2804 0x48e2420e
hal fpga writed 0x2804 0x36e23de0
hal fpga writed 0x2804 0x49584231
hal fpga writed 0x2804 0x366c3dbc
hal fpga writed 0x2804 0x49ce4255
hal fpga writed 0x2804 0x35f63d98
hal fpga writed 0x2804 0x4a444279
hal fpga writed 0x2804 0x35803d73
hal fpga writed 0x2804 0x4ab9429f
hal fpga writed 0x2804 0x350b3d4d
hal fpga writed 0x2804 0x4b2f42c5
hal fpga writed 0x2804 0x34963d26
hal fpga writed 0x2804 0x4ba442ec
hal fpga writed 0x2804 0x34213cff
hal fpga writed 0x2804 0x4c194314
hal fpga writed 0x2804 0x33ac3cd7
hal fpga writed 0x2804 0x4c8e433d
hal fpga writed 0x2804 0x33373cae
hal fpga writed 0x2804 0x4d024366
hal fpga writed 0x2804 0x32c33c84
hal fpga writed 0x2804 0x4d774391
hal fpga writed 0x2804 0x324e3c59
hal fpga writed 0x2804 0x4deb43bc
hal fpga writed 0x2804 0x31da3c2e
hal fpga writed 0x2804 0x4e5f43e7
hal fpga writed 0x2804 0x31663c02
hal fpga writed 0x2804 0x4ed24414
hal fpga writed 0x2804 0x30f33bd5
hal fpga writed 0x2804 0x4f464441
hal fpga writed 0x2804 0x307f3ba7
hal fpga writed 0x2804 0x4fb9446f
hal fpga writed 0x2804 0x300c3b79
hal fpga writed 0x2804 0x502c449e
hal fpga writed 0x2804 0x2f9a3b4a
hal fpga writed 0x2804 0x509f44cd
hal fpga writed 0x2804 0x2f273b1a
hal fpga writed 0x2804 0x511144fd
hal fpga writed 0x2804 0x2eb53ae9
hal fpga writed 0x2804 0x5183452e
hal fpga writed 0x2804 0x2e433ab8
hal fpga writed 0x2804 0x51f54560
hal fpga writed 0x2804 0x2dd13a86
hal fpga writed 0x2804 0x52674592
hal fpga writed 0x2804 0x2d603a53
hal fpga writed 0x2804 0x52d845c5
hal fpga writed 0x2804 0x2cef3a20
hal fpga writed 0x2804 0x534945f9
hal fpga writed 0x2804 0x2c7e39ec
hal fpga writed 0x2804 0x53ba462e
hal fpga writed 0x2804 0x2c0d39b7
hal fpga writed 0x2804 0x542a4663
hal fpga writed 0x2804 0x2b9d3981
hal fpga writed 0x2804 0x549a4699
hal fpga writed 0x2804 0x2b2d394b
hal fpga writed 0x2804 0x550946cf
hal fpga writed 0x2804 0x2abe3914
hal fpga writed 0x2804 0x55794706
hal fpga writed 0x2804 0x2a4f38dd
hal fpga writed 0x2804 0x55e8473e
hal fpga writed 0x2804 0x29e038a5
hal fpga writed 0x2804 0x56564777
hal fpga writed 0x2804 0x2972386c
hal fpga writed 0x2804 0x56c447b0
hal fpga writed 0x2804 0x29043832
hal fpga writed 0x2804 0x573247ea
hal fpga writed 0x2804 0x289637f8
hal fpga writed 0x2804 0x57a04824
hal fpga writed 0x2804 0x282937bd
hal fpga writed 0x2804 0x580d485f
hal fpga writed 0x2804 0x27bc3782
hal fpga writed 0x2804 0x5879489b
hal fpga writed 0x2804 0x274f3746
hal fpga writed 0x2804 0x58e648d7
hal fpga writed 0x2804 0x26e33709
hal fpga writed 0x2804 0x59524914
hal fpga writed 0x2804 0x267836cc
hal fpga writed 0x2804 0x59bd4952
hal fpga writed 0x2804 0x260c368e
hal fpga writed 0x2804 0x5a284990
hal fpga writed 0x2804 0x25a23650
hal fpga writed 0x2804 0x5a9349ce
hal fpga writed 0x2804 0x25373611
hal fpga writed 0x2804 0x5afd4a0e
hal fpga writed 0x2804 0x24cd35d1
hal fpga writed 0x2804 0x5b664a4e
hal fpga writed 0x2804 0x24643591
hal fpga writed 0x2804 0x5bd04a8e
hal fpga writed 0x2804 0x23fb3551
hal fpga writed 0x2804 0x5c394acf
hal fpga writed 0x2804 0x2392350f
hal fpga writed 0x2804 0x5ca14b11
hal fpga writed 0x2804 0x232a34cd
hal fpga writed 0x2804 0x5d094b53
hal fpga writed 0x2804 0x22c2348b
hal fpga writed 0x2804 0x5d704b95
hal fpga writed 0x2804 0x225b3448
hal fpga writed 0x2804 0x5dd74bd9
hal fpga writed 0x2804 0x21f53405
hal fpga writed 0x2804 0x5e3e4c1c
hal fpga writed 0x2804 0x218e33c1
hal fpga writed 0x2804 0x5ea44c60
hal fpga writed 0x2804 0x2129337c
hal fpga writed 0x2804 0x5f094ca5
hal fpga writed 0x2804 0x20c33337
hal fpga writed 0x2804 0x5f6e4cea
hal fpga writed 0x2804 0x205f32f2
hal fpga writed 0x2804 0x5fd24d30
hal fpga writed 0x2804 0x1ffb32ac
hal fpga writed 0x2804 0x60364d76
hal fpga writed 0x2804 0x1f973265
hal fpga writed 0x2804 0x609a4dbd
hal fpga writed 0x2804 0x1f34321f
hal fpga writed 0x2804 0x60fd4e04
hal fpga writed 0x2804 0x1ed131d7
hal fpga writed 0x2804 0x615f4e4c
hal fpga writed 0x2804 0x1e6f318f
hal fpga writed 0x2804 0x61c14e94
hal fpga writed 0x2804 0x1e0d3147
hal fpga writed 0x2804 0x62224edc
hal fpga writed 0x2804 0x1dac30fe
hal fpga writed 0x2804 0x62834f25
hal fpga writed 0x2804 0x1d4c30b5
hal fpga writed 0x2804 0x62e34f6e
hal fpga writed 0x2804 0x1cec306c
hal fpga writed 0x2804 0x63434fb8
hal fpga writed 0x2804 0x1c8d3022
hal fpga writed 0x2804 0x63a25002
hal fpga writed 0x2804 0x1c2e2fd7
hal fpga writed 0x2804 0x6400504d
hal fpga writed 0x2804 0x1bcf2f8d
hal fpga writed 0x2804 0x645e5098
hal fpga writed 0x2804 0x1b722f42
hal fpga writed 0x2804 0x64bc50e3
hal fpga writed 0x2804 0x1b152ef6
hal fpga writed 0x2804 0x6519512f
hal fpga writed 0x2804 0x1ab82eaa
hal fpga writed 0x2804 0x6575517b
hal fpga writed 0x2804 0x1a5c2e5e
hal fpga writed 0x2804 0x65d151c7
hal fpga writed 0x2804 0x1a012e11
hal fpga writed 0x2804 0x662c5214
hal fpga writed 0x2804 0x19a62dc4
hal fpga writed 0x2804 0x66865261
hal fpga writed 0x2804 0x194c2d77
hal fpga writed 0x2804 0x66e052af
hal fpga writed 0x2804 0x18f22d29
hal fpga writed 0x2804 0x673952fd
hal fpga writed 0x2804 0x18992cdb
hal fpga writed 0x2804 0x6792534b
hal fpga writed 0x2804 0x18412c8d
hal fpga writed 0x2804 0x67ea5399
hal fpga writed 0x2804 0x17e92c3f
hal fpga writed 0x2804 0x684153e8
hal fpga writed 0x2804 0x17922bf0
hal fpga writed 0x2804 0x68985437
hal fpga writed 0x2804 0x173c2ba1
hal fpga writed 0x2804 0x68ee5486
hal fpga writed 0x2804 0x16e62b51
hal fpga writed 0x2804 0x694454d6
hal fpga writed 0x2804 0x16912b02
hal fpga writed 0x2804 0x69995525
hal fpga writed 0x2804 0x163c2ab2
hal fpga writed 0x2804 0x69ed5575
hal fpga writed 0x2804 0x15e82a61
hal fpga writed 0x2804 0x6a4155c6
hal fpga writed 0x2804 0x15952a11
hal fpga writed 0x2804 0x6a945616
hal fpga writed 0x2804 0x154229c0
hal fpga writed 0x2804 0x6ae65667
hal fpga writed 0x2804 0x14f0296f
hal fpga writed 0x2804 0x6b3856b8
hal fpga writed 0x2804 0x149e291e
hal fpga writed 0x2804 0x6b895709
hal fpga writed 0x2804 0x144e28cd
hal fpga writed 0x2804 0x6bda575b
hal fpga writed 0x2804 0x13fd287c
hal fpga writed 0x2804 0x6c2957ac
hal fpga writed 0x2804 0x13ae282a
hal fpga writed 0x2804 0x6c7957fe
hal fpga writed 0x2804 0x135f27d8
hal fpga writed 0x2804 0x6cc75850
hal fpga writed 0x2804 0x13112786
hal fpga writed 0x2804 0x6d1558a2
hal fpga writed 0x2804 0x12c32734
hal fpga writed 0x2804 0x6d6258f4
hal fpga writed 0x2804 0x127626e2
hal fpga writed 0x2804 0x6daf5947
hal fpga writed 0x2804 0x122a268f
hal fpga writed 0x2804 0x6dfb5999
hal fpga writed 0x2804 0x11df263d
hal fpga writed 0x2804 0x6e4659ec
hal fpga writed 0x2804 0x119425ea
hal fpga writed 0x2804 0x6e905a3f
hal fpga writed 0x2804 0x114a2597
hal fpga writed 0x2804 0x6eda5a91
hal fpga writed 0x2804 0x11002544
hal fpga writed 0x2804 0x6f245ae4
hal fpga writed 0x2804 0x10b724f1
hal fpga writed 0x2804 0x6f6c5b37
hal fpga writed 0x2804 0x106f249e
hal fpga writed 0x2804 0x6fb45b8b
hal fpga writed 0x2804 0x1027244b
hal fpga writed 0x2804 0x6ffb5bde
hal fpga writed 0x2804 0x0fe123f8
hal fpga writed 0x2804 0x70425c31
hal fpga writed 0x2804 0x0f9a23a4
hal fpga writed 0x2804 0x70885c84
hal fpga writed 0x2804 0x0f552351
hal fpga writed 0x2804 0x70cd5cd8
hal fpga writed 0x2804 0x0f1022fd
hal fpga writed 0x2804 0x71115d2b
hal fpga writed 0x2804 0x0ecc22aa
hal fpga writed 0x2804 0x71555d7f
hal fpga writed 0x2804 0x0e882256
hal fpga writed 0x2804 0x71985dd2
hal fpga writed 0x2804 0x0e462203
hal fpga writed 0x2804 0x71db5e26
hal fpga writed 0x2804 0x0e0321af
hal fpga writed 0x2804 0x721c5e79
hal fpga writed 0x2804 0x0dc2215c
hal fpga writed 0x2804 0x725d5ecd
hal fpga writed 0x2804 0x0d812108
hal fpga writed 0x2804 0x729e5f20
hal fpga writed 0x2804 0x0d4120b5
hal fpga writed 0x2804 0x72de5f74
hal fpga writed 0x2804 0x0d022062
hal fpga writed 0x2804 0x731d5fc7
hal fpga writed 0x2804 0x0cc3200e
hal fpga writed 0x2804 0x735b601b
hal fpga writed 0x2804 0x0c851fbb
hal fpga writed 0x2804 0x7399606e
hal fpga writed 0x2804 0x0c481f68
hal fpga writed 0x2804 0x73d660c1
hal fpga writed 0x2804 0x0c0b1f14
hal fpga writed 0x2804 0x74126114
hal fpga writed 0x2804 0x0bcf1ec1
hal fpga writed 0x2804 0x744e6167
hal fpga writed 0x2804 0x0b941e6e
hal fpga writed 0x2804 0x748961bb
hal fpga writed 0x2804 0x0b591e1b
hal fpga writed 0x2804 0x74c3620e
hal fpga writed 0x2804 0x0b1f1dc8
hal fpga writed 0x2804 0x74fc6260
hal fpga writed 0x2804 0x0ae61d75
hal fpga writed 0x2804 0x753562b3
hal fpga writed 0x2804 0x0aad1d23
hal fpga writed 0x2804 0x756e6306
hal fpga writed 0x2804 0x0a761cd0
hal fpga writed 0x2804 0x75a56358
hal fpga writed 0x2804 0x0a3e1c7d
hal fpga writed 0x2804 0x75dc63ab
hal fpga writed 0x2804 0x0a081c2b
hal fpga writed 0x2804 0x761263fd
hal fpga writed 0x2804 0x09d21bd9
hal fpga writed 0x2804 0x7648644f
hal fpga writed 0x2804 0x099d1b87
hal fpga writed 0x2804 0x767d64a1
hal fpga writed 0x2804 0x09681b35
hal fpga writed 0x2804 0x76b164f3
hal fpga writed 0x2804 0x09341ae3
hal fpga writed 0x2804 0x76e46544
hal fpga writed 0x2804 0x09011a92
hal fpga writed 0x2804 0x77176596
hal fpga writed 0x2804 0x08cf1a41
hal fpga writed 0x2804 0x774a65e7
hal fpga writed 0x2804 0x089d19ef
hal fpga writed 0x2804 0x777b6638
hal fpga writed 0x2804 0x086b199e
hal fpga writed 0x2804 0x77ac6689
hal fpga writed 0x2804 0x083b194e
hal fpga writed 0x2804 0x77dc66da
hal fpga writed 0x2804 0x080b18fd
hal fpga writed 0x2804 0x780c672a
hal fpga writed 0x2804 0x07dc18ad
hal fpga writed 0x2804 0x783b677a
hal fpga writed 0x2804 0x07ad185d
hal fpga writed 0x2804 0x786967ca
hal fpga writed 0x2804 0x077f180d
hal fpga writed 0x2804 0x7896681a
hal fpga writed 0x2804 0x075217bd
hal fpga writed 0x2804 0x78c36869
hal fpga writed 0x2804 0x0726176e
hal fpga writed 0x2804 0x78f068b9
hal fpga writed 0x2804 0x06fa171f
hal fpga writed 0x2804 0x791b6908
hal fpga writed 0x2804 0x06ce16d0
hal fpga writed 0x2804 0x79466956
hal fpga writed 0x2804 0x06a41682
hal fpga writed 0x2804 0x797169a5
hal fpga writed 0x2804 0x067a1633
hal fpga writed 0x2804 0x799a69f3
hal fpga writed 0x2804 0x065015e5
hal fpga writed 0x2804 0x79c36a41
hal fpga writed 0x2804 0x06271598
hal fpga writed 0x2804 0x79ec6a8e
hal fpga writed 0x2804 0x05ff154a
hal fpga writed 0x2804 0x7a146adb
hal fpga writed 0x2804 0x05d814fd
hal fpga writed 0x2804 0x7a3b6b28
hal fpga writed 0x2804 0x05b114b0
hal fpga writed 0x2804 0x7a616b75
hal fpga writed 0x2804 0x058b1464
hal fpga writed 0x2804 0x7a876bc1
hal fpga writed 0x2804 0x05651418
hal fpga writed 0x2804 0x7aad6c0d
hal fpga writed 0x2804 0x054013cc
hal fpga writed 0x2804 0x7ad16c59
hal fpga writed 0x2804 0x051c1380
hal fpga writed 0x2804 0x7af56ca4
hal fpga writed 0x2804 0x04f81335
hal fpga writed 0x2804 0x7b196cef
hal fpga writed 0x2804 0x04d512eb
hal fpga writed 0x2804 0x7b3c6d3a
hal fpga writed 0x2804 0x04b212a0
hal fpga writed 0x2804 0x7b5e6d84
hal fpga writed 0x2804 0x04901256
hal fpga writed 0x2804 0x7b806dce
hal fpga writed 0x2804 0x046f120c
hal fpga writed 0x2804 0x7ba16e17
hal fpga writed 0x2804 0x044e11c3
hal fpga writed 0x2804 0x7bc16e60
hal fpga writed 0x2804 0x042e117a
hal fpga writed 0x2804 0x7be16ea9
hal fpga writed 0x2804 0x040e1132
hal fpga writed 0x2804 0x7c006ef1
hal fpga writed 0x2804 0x03ef10ea
hal fpga writed 0x2804 0x7c1f6f39
hal fpga writed 0x2804 0x03d110a2
hal fpga writed 0x2804 0x7c3d6f81
hal fpga writed 0x2804 0x03b3105a
hal fpga writed 0x2804 0x7c5b6fc8
hal fpga writed 0x2804 0x03961014
hal fpga writed 0x2804 0x7c78700f
hal fpga writed 0x2804 0x03790fcd
hal fpga writed 0x2804 0x7c947055
hal fpga writed 0x2804 0x035d0f87
hal fpga writed 0x2804 0x7cb0709b
hal fpga writed 0x2804 0x03410f41
hal fpga writed 0x2804 0x7ccc70e0
hal fpga writed 0x2804 0x03260efc
hal fpga writed 0x2804 0x7ce67126
hal fpga writed 0x2804 0x030b0eb7
hal fpga writed 0x2804 0x7d01716a
hal fpga writed 0x2804 0x02f10e73
hal fpga writed 0x2804 0x7d1a71ae
hal fpga writed 0x2804 0x02d80e2f
hal fpga writed 0x2804 0x7d3471f2
hal fpga writed 0x2804 0x02bf0deb
hal fpga writed 0x2804 0x7d4c7235
hal fpga writed 0x2804 0x02a70da8
hal fpga writed 0x2804 0x7d647278
hal fpga writed 0x2804 0x028f0d66
hal fpga writed 0x2804 0x7d7c72bb
hal fpga writed 0x2804 0x02780d23
hal fpga writed 0x2804 0x7d9372fd
hal fpga writed 0x2804 0x02610ce2
hal fpga writed 0x2804 0x7da9733e
hal fpga writed 0x2804 0x024a0ca0
hal fpga writed 0x2804 0x7dbf737f
hal fpga writed 0x2804 0x02350c60
hal fpga writed 0x2804 0x7dd573c0
hal fpga writed 0x2804 0x021f0c1f
hal fpga writed 0x2804 0x7dea7400
hal fpga writed 0x2804 0x020b0be0
hal fpga writed 0x2804 0x7dff743f
hal fpga writed 0x2804 0x01f60ba0
hal fpga writed 0x2804 0x7e13747e
hal fpga writed 0x2804 0x01e30b61
hal fpga writed 0x2804 0x7e2674bd
hal fpga writed 0x2804 0x01cf0b23
hal fpga writed 0x2804 0x7e3974fb
hal fpga writed 0x2804 0x01bc0ae5
hal fpga writed 0x2804 0x7e4c7539
hal fpga writed 0x2804 0x01aa0aa8
hal fpga writed 0x2804 0x7e5e7576
hal fpga writed 0x2804 0x01980a6b
hal fpga writed 0x2804 0x7e7075b3
hal fpga writed 0x2804 0x01870a2e
hal fpga writed 0x2804 0x7e8175ef
hal fpga writed 0x2804 0x017609f2
hal fpga writed 0x2804 0x7e92762a
hal fpga writed 0x2804 0x016509b7
hal fpga writed 0x2804 0x7ea27666
hal fpga writed 0x2804 0x0155097c
hal fpga writed 0x2804 0x7eb276a0
hal fpga writed 0x2804 0x01460942
hal fpga writed 0x2804 0x7ec176da
hal fpga writed 0x2804 0x01360908
hal fpga writed 0x2804 0x7ed07714
hal fpga writed 0x2804 0x012808ce
hal fpga writed 0x2804 0x7edf774d
hal fpga writed 0x2804 0x01190895
hal fpga writed 0x2804 0x7eed7786
hal fpga writed 0x2804 0x010b085d
hal fpga writed 0x2804 0x7efa77be
hal fpga writed 0x2804 0x00fe0825
hal fpga writed 0x2804 0x7f0877f6
hal fpga writed 0x2804 0x00f107ed
hal fpga writed 0x2804 0x7f15782d
hal fpga writed 0x2804 0x00e407b6
hal fpga writed 0x2804 0x7f217864
hal fpga writed 0x2804 0x00d80780
hal fpga writed 0x2804 0x7f2d789a
hal fpga writed 0x2804 0x00cc074a
hal fpga writed 0x2804 0x7f3978d0
hal fpga writed 0x2804 0x00c10715
hal fpga writed 0x2804 0x7f447905
hal fpga writed 0x2804 0x00b506e0
hal fpga writed 0x2804 0x7f4f793a
hal fpga writed 0x2804 0x00ab06ab
hal fpga writed 0x2804 0x7f59796e
hal fpga writed 0x2804 0x00a00677
hal fpga writed 0x2804 0x7f6479a1
hal fpga writed 0x2804 0x00970644
hal fpga writed 0x2804 0x7f6d79d5
hal fpga writed 0x2804 0x008d0611
hal fpga writed 0x2804 0x7f777a07
hal fpga writed 0x2804 0x008405de
hal fpga writed 0x2804 0x7f807a3a
hal fpga writed 0x2804 0x007b05ac
hal fpga writed 0x2804 0x7f887a6c
hal fpga writed 0x2804 0x0072057b
hal fpga writed 0x2804 0x7f917a9d
hal fpga writed 0x2804 0x006a054a
hal fpga writed 0x2804 0x7f997ace
hal fpga writed 0x2804 0x00620519
hal fpga writed 0x2804 0x7fa17afe
hal fpga writed 0x2804 0x005b04e9
hal fpga writed 0x2804 0x7fa87b2e
hal fpga writed 0x2804 0x005404b9
hal fpga writed 0x2804 0x7faf7b5e
hal fpga writed 0x2804 0x004d048a
hal fpga writed 0x2804 0x7fb67b8d
hal fpga writed 0x2804 0x0046045b
hal fpga writed 0x2804 0x7fbc7bbc
hal fpga writed 0x2804 0x0040042c
hal fpga writed 0x2804 0x7fc27bea
hal fpga writed 0x2804 0x003a03fe
hal fpga writed 0x2804 0x7fc87c18
hal fpga writed 0x2804 0x003403d0
hal fpga writed 0x2804 0x7fcd7c46
hal fpga writed 0x2804 0x002f03a2
hal fpga writed 0x2804 0x7fd27c73
hal fpga writed 0x2804 0x002a0375
hal fpga writed 0x2804 0x7fd77ca1
hal fpga writed 0x2804 0x00250348
hal fpga writed 0x2804 0x7fdc7cce
hal fpga writed 0x2804 0x0021031b
hal fpga writed 0x2804 0x7fe07cfa
hal fpga writed 0x2804 0x001d02ee
hal fpga writed 0x2804 0x7fe47d27
hal fpga writed 0x2804 0x001902c1
hal fpga writed 0x2804 0x7fe87d54
hal fpga writed 0x2804 0x00150295
hal fpga writed 0x2804 0x7feb7d81
hal fpga writed 0x2804 0x00120268
hal fpga writed 0x2804 0x7fef7dae
hal fpga writed 0x2804 0x000f023a
hal fpga writed 0x2804 0x7ff27ddb
hal fpga writed 0x2804 0x000c020d
hal fpga writed 0x2804 0x7ff47e09
hal fpga writed 0x2804 0x000a01de
hal fpga writed 0x2804 0x7ff77e39
hal fpga writed 0x2804 0x000701ae
hal fpga writed 0x2804 0x7ff97e69
hal fpga writed 0x2804 0x0005017d
hal fpga writed 0x2804 0x7ffb7e9c
hal fpga writed 0x2804 0x00040148
hal fpga writed 0x2804 0x7ffc7ed2
hal fpga writed 0x2804 0x0002010f
hal fpga writed 0x2804 0x7ffe7f0f
hal fpga writed 0x2804 0x000100cd
hal fpga writed 0x2804 0x7ffe7f59
hal fpga writed 0x2804 0x00000074
hal fpga writed 0x2800 0x100
hal fpga writed 0x280c 0x1
hal fpga writed 0x2810 0x258e256b
hal fpga writed 0x2810 0x5ab825b2
hal fpga writed 0x2810 0x5a295adb
hal fpga writed 0x2810 0x25005a06
hal fpga writed 0x2810 0x261d24dd
hal fpga writed 0x2810 0x5b452641
hal fpga writed 0x2810 0x599a5b68
hal fpga writed 0x2810 0x24735976
hal fpga writed 0x2810 0x26ad2450
hal fpga writed 0x2810 0x5bd226d1
hal fpga writed 0x2810 0x590a5bf5
hal fpga writed 0x2810 0x23e758e6
hal fpga writed 0x2810 0x273d23c5
hal fpga writed 0x2810 0x5c5d2761
hal fpga writed 0x2810 0x58795c80
hal fpga writed 0x2810 0x235c5855
hal fpga writed 0x2810 0x27ce233a
hal fpga writed 0x2810 0x5ce827f3
hal fpga writed 0x2810 0x57e85d0b
hal fpga writed 0x2810 0x22d257c3
hal fpga writed 0x2810 0x286022af
hal fpga writed 0x2810 0x5d722885
hal fpga writed 0x2810 0x57555d94
hal fpga writed 0x2810 0x22485730
hal fpga writed 0x2810 0x28f32226
hal fpga writed 0x2810 0x5dfb2918
hal fpga writed 0x2810 0x56c25e1d
hal fpga writed 0x2810 0x21c0569d
hal fpga writed 0x2810 0x2987219e
hal fpga writed 0x2810 0x5e8329ac
hal fpga writed 0x2810 0x562d5ea5
hal fpga writed 0x2810 0x21385608
hal fpga writed 0x2810 0x2a1c2117
hal fpga writed 0x2810 0x5f0a2a41
hal fpga writed 0x2810 0x55985f2c
hal fpga writed 0x2810 0x20b25573
hal fpga writed 0x2810 0x2ab12090
hal fpga writed 0x2810 0x5f902ad7
hal fpga writed 0x2810 0x55025fb2
hal fpga writed 0x2810 0x202c54dd
hal fpga writed 0x2810 0x2b48200b
hal fpga writed 0x2810 0x60162b6e
hal fpga writed 0x2810 0x546c6037
hal fpga writed 0x2810 0x1fa75446
hal fpga writed 0x2810 0x2bdf1f86
hal fpga writed 0x2810 0x609a2c05
hal fpga writed 0x2810 0x53d460bb
hal fpga writed 0x2810 0x1f2353ae
hal fpga writed 0x2810 0x2c771f02
hal fpga writed 0x2810 0x611d2c9d
hal fpga writed 0x2810 0x533c613e
hal fpga writed 0x2810 0x1ea05316
hal fpga writed 0x2810 0x2d101e80
hal fpga writed 0x2810 0x61a02d36
hal fpga writed 0x2810 0x52a361c0
hal fpga writed 0x2810 0x1e1e527c
hal fpga writed 0x2810 0x2da91dfe
hal fpga writed 0x2810 0x62212dd0
hal fpga writed 0x2810 0x52096242
hal fpga writed 0x2810 0x1d9d51e2
hal fpga writed 0x2810 0x2e441d7d
hal fpga writed 0x2810 0x62a22e6a
hal fpga writed 0x2810 0x516e62c2
hal fpga writed 0x2810 0x1d1d5147
hal fpga writed 0x2810 0x2edf1cfd
hal fpga writed 0x2810 0x63222f06
hal fpga writed 0x2810 0x50d36342
hal fpga writed 0x2810 0x1c9e50ac
hal fpga writed 0x2810 0x2f7b1c7e
hal fpga writed 0x2810 0x63a02fa2
hal fpga writed 0x2810 0x503663c0
hal fpga writed 0x2810 0x1c20500f
hal fpga writed 0x2810 0x30171c00
hal fpga writed 0x2810 0x641e303f
hal fpga writed 0x2810 0x4f99643e
hal fpga writed 0x2810 0x1ba24f72
hal fpga writed 0x2810 0x30b51b83
hal fpga writed 0x2810 0x649b30dc
hal fpga writed 0x2810 0x4efb64ba
hal fpga writed 0x2810 0x1b264ed4
hal fpga writed 0x2810 0x31531b07
hal fpga writed 0x2810 0x6517317b
hal fpga writed 0x2810 0x4e5d6536
hal fpga writed 0x2810 0x1aab4e35
hal fpga writed 0x2810 0x31f21a8c
hal fpga writed 0x2810 0x6592321a
hal fpga writed 0x2810 0x4dbd65b0
hal fpga writed 0x2810 0x1a304d95
hal fpga writed 0x2810 0x32921a12
hal fpga writed 0x2810 0x660c32ba
hal fpga writed 0x2810 0x4d1d662a
hal fpga writed 0x2810 0x19b74cf5
hal fpga writed 0x2810 0x33321999
hal fpga writed 0x2810 0x6684335a
hal fpga writed 0x2810 0x4c7c66a3
hal fpga writed 0x2810 0x193e4c54
hal fpga writed 0x2810 0x33d31921
hal fpga writed 0x2810 0x66fc33fc
hal fpga writed 0x2810 0x4bdb671a
hal fpga writed 0x2810 0x18c74bb2
hal fpga writed 0x2810 0x347518a9
hal fpga writed 0x2810 0x6773349e
hal fpga writed 0x2810 0x4b386791
hal fpga writed 0x2810 0x18514b10
hal fpga writed 0x2810 0x35181833
hal fpga writed 0x2810 0x67e93541
hal fpga writed 0x2810 0x4a956806
hal fpga writed 0x2810 0x17db4a6d
hal fpga writed 0x2810 0x35bb17be
hal fpga writed 0x2810 0x685e35e4
hal fpga writed 0x2810 0x49f2687b
hal fpga writed 0x2810 0x176749c9
hal fpga writed 0x2810 0x365f174a
hal fpga writed 0x2810 0x68d23689
hal fpga writed 0x2810 0x494d68ef
hal fpga writed 0x2810 0x16f34924
hal fpga writed 0x2810 0x370416d7
hal fpga writed 0x2810 0x6945372e
hal fpga writed 0x2810 0x48a86961
hal fpga writed 0x2810 0x1681487f
hal fpga writed 0x2810 0x37aa1665
hal fpga writed 0x2810 0x69b737d3
hal fpga writed 0x2810 0x480269d3
hal fpga writed 0x2810 0x161047d9
hal fpga writed 0x2810 0x385015f4
hal fpga writed 0x2810 0x6a28387a
hal fpga writed 0x2810 0x475c6a44
hal fpga writed 0x2810 0x159f4732
hal fpga writed 0x2810 0x38f71583
hal fpga writed 0x2810 0x6a973921
hal fpga writed 0x2810 0x46b46ab3
hal fpga writed 0x2810 0x1530468a
hal fpga writed 0x2810 0x399f1514
hal fpga writed 0x2810 0x6b0639c9
hal fpga writed 0x2810 0x460c6b22
hal fpga writed 0x2810 0x14c245e2
hal fpga writed 0x2810 0x3a4714a6
hal fpga writed 0x2810 0x6b743a71
hal fpga writed 0x2810 0x45646b8f
hal fpga writed 0x2810 0x14554539
hal fpga writed 0x2810 0x3af01439
hal fpga writed 0x2810 0x6be13b1a
hal fpga writed 0x2810 0x44ba6bfc
hal fpga writed 0x2810 0x13e84490
hal fpga writed 0x2810 0x3b9913cd
hal fpga writed 0x2810 0x6c4c3bc4
hal fpga writed 0x2810 0x44116c67
hal fpga writed 0x2810 0x137d43e6
hal fpga writed 0x2810 0x3c441362
hal fpga writed 0x2810 0x6cb73c6e
hal fpga writed 0x2810 0x43666cd2
hal fpga writed 0x2810 0x1313433b
hal fpga writed 0x2810 0x3cef12f9
hal fpga writed 0x2810 0x6d213d19
hal fpga writed 0x2810 0x42bb6d3b
hal fpga writed 0x2810 0x12aa4290
hal fpga writed 0x2810 0x3d9a1290
hal fpga writed 0x2810 0x6d893dc5
hal fpga writed 0x2810 0x420f6da3
hal fpga writed 0x2810 0x124241e4
hal fpga writed 0x2810 0x3e461228
hal fpga writed 0x2810 0x6df13e72
hal fpga writed 0x2810 0x41626e0a
hal fpga writed 0x2810 0x11db4137
hal fpga writed 0x2810 0x3ef311c1
hal fpga writed 0x2810 0x6e573f1f
hal fpga writed 0x2810 0x40b56e71
hal fpga writed 0x2810 0x1175408a
hal fpga writed 0x2810 0x3fa1115c
hal fpga writed 0x2810 0x6ebd3fcc
hal fpga writed 0x2810 0x40076ed6
hal fpga writed 0x2810 0x11103fdc
hal fpga writed 0x2810 0x404f10f7
hal fpga writed 0x2810 0x6f21407a
hal fpga writed 0x2810 0x3f596f3a
hal fpga writed 0x2810 0x10ac3f2d
hal fpga writed 0x2810 0x40fe1094
hal fpga writed 0x2810 0x6f844129
hal fpga writed 0x2810 0x3eaa6f9d
hal fpga writed 0x2810 0x104a3e7e
hal fpga writed 0x2810 0x41ad1031
hal fpga writed 0x2810 0x6fe641d9
hal fpga writed 0x2810 0x3dfa6fff
hal fpga writed 0x2810 0x0fe83dce
hal fpga writed 0x2810 0x425d0fd0
hal fpga writed 0x2810 0x70474289
hal fpga writed 0x2810 0x3d4a705f
hal fpga writed 0x2810 0x0f883d1e
hal fpga writed 0x2810 0x430d0f70
hal fpga writed 0x2810 0x70a7433a
hal fpga writed 0x2810 0x3c9970bf
hal fpga writed 0x2810 0x0f283c6d
hal fpga writed 0x2810 0x43be0f10
hal fpga writed 0x2810 0x710643eb
hal fpga writed 0x2810 0x3be8711e
hal fpga writed 0x2810 0x0eca3bbb
hal fpga writed 0x2810 0x44700eb2
hal fpga writed 0x2810 0x7164449d
hal fpga writed 0x2810 0x3b36717b
hal fpga writed 0x2810 0x0e6c3b09
hal fpga writed 0x2810 0x45220e55
hal fpga writed 0x2810 0x71c1454f
hal fpga writed 0x2810 0x3a8371d8
hal fpga writed 0x2810 0x0e103a57
hal fpga writed 0x2810 0x45d50df9
hal fpga writed 0x2810 0x721c4602
hal fpga writed 0x2810 0x39d07233
hal fpga writed 0x2810 0x0db539a3
hal fpga writed 0x2810 0x46890d9f
hal fpga writed 0x2810 0x727746b6
hal fpga writed 0x2810 0x391d728d
hal fpga writed 0x2810 0x0d5b38f0
hal fpga writed 0x2810 0x473d0d45
hal fpga writed 0x2810 0x72d0476a
hal fpga writed 0x2810 0x386872e7
hal fpga writed 0x2810 0x0d02383b
hal fpga writed 0x2810 0x47f10cec
hal fpga writed 0x2810 0x7329481e
hal fpga writed 0x2810 0x37b4733f
hal fpga writed 0x2810 0x0caa3786
hal fpga writed 0x2810 0x48a60c95
hal fpga writed 0x2810 0x738048d3
hal fpga writed 0x2810 0x36fe7396
hal fpga writed 0x2810 0x0c5436d1
hal fpga writed 0x2810 0x495c0c3e
hal fpga writed 0x2810 0x73d64989
hal fpga writed 0x2810 0x364873eb
hal fpga writed 0x2810 0x0bfe361b
hal fpga writed 0x2810 0x4a120be9
hal fpga writed 0x2810 0x742b4a3f
hal fpga writed 0x2810 0x35927440
hal fpga writed 0x2810 0x0baa3564
hal fpga writed 0x2810 0x4ac80b95
hal fpga writed 0x2810 0x747f4af6
hal fpga writed 0x2810 0x34db7494
hal fpga writed 0x2810 0x0b5734ad
hal fpga writed 0x2810 0x4b7f0b42
hal fpga writed 0x2810 0x74d24bad
hal fpga writed 0x2810 0x342474e6
hal fpga writed 0x2810 0x0b0433f6
hal fpga writed 0x2810 0x4c370af0
hal fpga writed 0x2810 0x75234c65
hal fpga writed 0x2810 0x336c7538
hal fpga writed 0x2810 0x0ab3333e
hal fpga writed 0x2810 0x4cef0a9f
hal fpga writed 0x2810 0x75744d1d
hal fpga writed 0x2810 0x32b47588
hal fpga writed 0x2810 0x0a633285
hal fpga writed 0x2810 0x4da80a50
hal fpga writed 0x2810 0x75c34dd6
hal fpga writed 0x2810 0x31fb75d7
hal fpga writed 0x2810 0x0a1531cc
hal fpga writed 0x2810 0x4e610a01
hal fpga writed 0x2810 0x76114e8f
hal fpga writed 0x2810 0x31417625
hal fpga writed 0x2810 0x09c73113
hal fpga writed 0x2810 0x4f1a09b4
hal fpga writed 0x2810 0x765e4f49
hal fpga writed 0x2810 0x30887672
hal fpga writed 0x2810 0x097a3059
hal fpga writed 0x2810 0x4fd50967
hal fpga writed 0x2810 0x76aa5003
hal fpga writed 0x2810 0x2fcd76bd
hal fpga writed 0x2810 0x092f2f9f
hal fpga writed 0x2810 0x508f091c
hal fpga writed 0x2810 0x76f550be
hal fpga writed 0x2810 0x2f137708
hal fpga writed 0x2810 0x08e52ee4
hal fpga writed 0x2810 0x514a08d2
hal fpga writed 0x2810 0x773f5179
hal fpga writed 0x2810 0x2e577751
hal fpga writed 0x2810 0x089c2e28
hal fpga writed 0x2810 0x5205088a
hal fpga writed 0x2810 0x77875234
hal fpga writed 0x2810 0x2d9c7799
hal fpga writed 0x2810 0x08542d6d
hal fpga writed 0x2810 0x52c10842
hal fpga writed 0x2810 0x77cf52f0
hal fpga writed 0x2810 0x2ce077e0
hal fpga writed 0x2810 0x080d2cb1
hal fpga writed 0x2810 0x537e07fc
hal fpga writed 0x2810 0x781553ad
hal fpga writed 0x2810 0x2c237826
hal fpga writed 0x2810 0x07c72bf4
hal fpga writed 0x2810 0x543a07b6
hal fpga writed 0x2810 0x785a546a
hal fpga writed 0x2810 0x2b66786b
hal fpga writed 0x2810 0x07832b37
hal fpga writed 0x2810 0x54f70772
hal fpga writed 0x2810 0x789e5527
hal fpga writed 0x2810 0x2aa978af
hal fpga writed 0x2810 0x07402a79
hal fpga writed 0x2810 0x55b5072f
hal fpga writed 0x2810 0x78e155e4
hal fpga writed 0x2810 0x29eb78f1
hal fpga writed 0x2810 0x06fe29bc
hal fpga writed 0x2810 0x567306ed
hal fpga writed 0x2810 0x792256a3
hal fpga writed 0x2810 0x292d7932
hal fpga writed 0x2810 0x06bd28fd
hal fpga writed 0x2810 0x573106ac
hal fpga writed 0x2810 0x79625761
hal fpga writed 0x2810 0x286e7972
hal fpga writed 0x2810 0x067d283f
hal fpga writed 0x2810 0x57f0066d
hal fpga writed 0x2810 0x79a25820
hal fpga writed 0x2810 0x27af79b1
hal fpga writed 0x2810 0x063e2780
hal fpga writed 0x2810 0x58af062f
hal fpga writed 0x2810 0x79e058df
hal fpga writed 0x2810 0x26f079ef
hal fpga writed 0x2810 0x060126c0
hal fpga writed 0x2810 0x596f05f1
hal fpga writed 0x2810 0x7a1d599f
hal fpga writed 0x2810 0x26307a2c
hal fpga writed 0x2810 0x05c42600
hal fpga writed 0x2810 0x5a2f05b6
hal fpga writed 0x2810 0x7a585a5f
hal fpga writed 0x2810 0x25707a67
hal fpga writed 0x2810 0x05892540
hal fpga writed 0x2810 0x5aef057b
hal fpga writed 0x2810 0x7a935b1f
hal fpga writed 0x2810 0x24b07aa1
hal fpga writed 0x2810 0x054f2480
hal fpga writed 0x2810 0x5bb00541
hal fpga writed 0x2810 0x7acc5be0
hal fpga writed 0x2810 0x23ef7ada
hal fpga writed 0x2810 0x051723bf
hal fpga writed 0x2810 0x5c710509
hal fpga writed 0x2810 0x7b045ca1
hal fpga writed 0x2810 0x232e7b12
hal fpga writed 0x2810 0x04df22fd
hal fpga writed 0x2810 0x5d3204d1
hal fpga writed 0x2810 0x7b3b5d62
hal fpga writed 0x2810 0x226c7b49
hal fpga writed 0x2810 0x04a9223c
hal fpga writed 0x2810 0x5df4049b
hal fpga writed 0x2810 0x7b715e24
hal fpga writed 0x2810 0x21aa7b7e
hal fpga writed 0x2810 0x0474217a
hal fpga writed 0x2810 0x5eb60466
hal fpga writed 0x2810 0x7ba65ee6
hal fpga writed 0x2810 0x20e87bb3
hal fpga writed 0x2810 0x044020b8
hal fpga writed 0x2810 0x5f780433
hal fpga writed 0x2810 0x7bd95fa8
hal fpga writed 0x2810 0x20267be6
hal fpga writed 0x2810 0x040d1ff5
hal fpga writed 0x2810 0x603a0400
hal fpga writed 0x2810 0x7c0b606b
hal fpga writed 0x2810 0x1f637c18
hal fpga writed 0x2810 0x03db1f32
hal fpga writed 0x2810 0x60fd03cf
hal fpga writed 0x2810 0x7c3c612e
hal fpga writed 0x2810 0x1ea07c48
hal fpga writed 0x2810 0x03ab1e6f
hal fpga writed 0x2810 0x61c1039f
hal fpga writed 0x2810 0x7c6c61f1
hal fpga writed 0x2810 0x1ddd7c78
hal fpga writed 0x2810 0x037c1dac
hal fpga writed 0x2810 0x62840370
hal fpga writed 0x2810 0x7c9b62b5
hal fpga writed 0x2810 0x1d197ca6
hal fpga writed 0x2810 0x034e1ce8
hal fpga writed 0x2810 0x63480342
hal fpga writed 0x2810 0x7cc86379
hal fpga writed 0x2810 0x1c557cd3
hal fpga writed 0x2810 0x03211c24
hal fpga writed 0x2810 0x640c0316
hal fpga writed 0x2810 0x7cf4643d
hal fpga writed 0x2810 0x1b917cff
hal fpga writed 0x2810 0x02f51b60
hal fpga writed 0x2810 0x64d002ea
hal fpga writed 0x2810 0x7d1f6501
hal fpga writed 0x2810 0x1acc7d2a
hal fpga writed 0x2810 0x02cb1a9b
hal fpga writed 0x2810 0x659502c0
hal fpga writed 0x2810 0x7d4965c6
hal fpga writed 0x2810 0x1a087d53
hal fpga writed 0x2810 0x02a219d6
hal fpga writed 0x2810 0x665a0297
hal fpga writed 0x2810 0x7d72668b
hal fpga writed 0x2810 0x19437d7c
hal fpga writed 0x2810 0x027a1911
hal fpga writed 0x2810 0x671f0270
hal fpga writed 0x2810 0x7d996750
hal fpga writed 0x2810 0x187d7da3
hal fpga writed 0x2810 0x0253184c
hal fpga writed 0x2810 0x67e40249
hal fpga writed 0x2810 0x7dbf6816
hal fpga writed 0x2810 0x17b87dc9
hal fpga writed 0x2810 0x022d1787
hal fpga writed 0x2810 0x68aa0224
hal fpga writed 0x2810 0x7de468db
hal fpga writed 0x2810 0x16f27ded
hal fpga writed 0x2810 0x020916c1
hal fpga writed 0x2810 0x69700200
hal fpga writed 0x2810 0x7e0869a1
hal fpga writed 0x2810 0x162c7e11
hal fpga writed 0x2810 0x01e615fb
hal fpga writed 0x2810 0x6a3601dd
hal fpga writed 0x2810 0x7e2a6a67
hal fpga writed 0x2810 0x15667e33
hal fpga writed 0x2810 0x01c41535
hal fpga writed 0x2810 0x6afc01bc
hal fpga writed 0x2810 0x7e4c6b2e
hal fpga writed 0x2810 0x14a07e54
hal fpga writed 0x2810 0x01a3146e
hal fpga writed 0x2810 0x6bc2019b
hal fpga writed 0x2810 0x7e6c6bf4
hal fpga writed 0x2810 0x13d97e74
hal fpga writed 0x2810 0x018413a8
hal fpga writed 0x2810 0x6c89017c
hal fpga writed 0x2810 0x7e8b6cbb
hal fpga writed 0x2810 0x13137e92
hal fpga writed 0x2810 0x016512e1
hal fpga writed 0x2810 0x6d50015e
hal fpga writed 0x2810 0x7ea86d82
hal fpga writed 0x2810 0x124c7eb0
hal fpga writed 0x2810 0x0148121a
hal fpga writed 0x2810 0x6e170141
hal fpga writed 0x2810 0x7ec56e49
hal fpga writed 0x2810 0x11857ecc
hal fpga writed 0x2810 0x012c1153
hal fpga writed 0x2810 0x6ede0126
hal fpga writed 0x2810 0x7ee06f10
hal fpga writed 0x2810 0x10bd7ee7
hal fpga writed 0x2810 0x0112108c
hal fpga writed 0x2810 0x6fa5010b
hal fpga writed 0x2810 0x7efa6fd7
hal fpga writed 0x2810 0x0ff67f00
hal fpga writed 0x2810 0x00f90fc4
hal fpga writed 0x2810 0x706d00f2
hal fpga writed 0x2810 0x7f13709f
hal fpga writed 0x2810 0x0f2e7f19
hal fpga writed 0x2810 0x00e00efc
hal fpga writed 0x2810 0x713400db
hal fpga writed 0x2810 0x7f2a7166
hal fpga writed 0x2810 0x0e677f30
hal fpga writed 0x2810 0x00c90e35
hal fpga writed 0x2810 0x71fc00c4
hal fpga writed 0x2810 0x7f41722e
hal fpga writed 0x2810 0x0d9f7f46
hal fpga writed 0x2810 0x00b40d6d
hal fpga writed 0x2810 0x72c400af
hal fpga writed 0x2810 0x7f5672f6
hal fpga writed 0x2810 0x0cd77f5b
hal fpga writed 0x2810 0x009f0ca5
hal fpga writed 0x2810 0x738c009a
hal fpga writed 0x2810 0x7f6a73be
hal fpga writed 0x2810 0x0c0f7f6e
hal fpga writed 0x2810 0x008c0bdd
hal fpga writed 0x2810 0x74540087
hal fpga writed 0x2810 0x7f7c7486
hal fpga writed 0x2810 0x0b477f81
hal fpga writed 0x2810 0x007a0b14
hal fpga writed 0x2810 0x751d0076
hal fpga writed 0x2810 0x7f8e754f
hal fpga writed 0x2810 0x0a7e7f92
hal fpga writed 0x2810 0x00690a4c
hal fpga writed 0x2810 0x75e50065
hal fpga writed 0x2810 0x7f9e7617
hal fpga writed 0x2810 0x09b67fa2
hal fpga writed 0x2810 0x005a0984
hal fpga writed 0x2810 0x76ae0056
hal fpga writed 0x2810 0x7fad76e0
hal fpga writed 0x2810 0x08ed7fb0
hal fpga writed 0x2810 0x004b08bb
hal fpga writed 0x2810 0x77760048
hal fpga writed 0x2810 0x7fba77a8
hal fpga writed 0x2810 0x08257fbe
hal fpga writed 0x2810 0x003e07f2
hal fpga writed 0x2810 0x783f003b
hal fpga writed 0x2810 0x7fc77871
hal fpga writed 0x2810 0x075c7fca
hal fpga writed 0x2810 0x0032072a
hal fpga writed 0x2810 0x79070030
hal fpga writed 0x2810 0x7fd2793a
hal fpga writed 0x2810 0x06937fd5
hal fpga writed 0x2810 0x00280661
hal fpga writed 0x2810 0x79d00025
hal fpga writed 0x2810 0x7fdc7a02
hal fpga writed 0x2810 0x05ca7fde
hal fpga writed 0x2810 0x001e0598
hal fpga writed 0x2810 0x7a99001c
hal fpga writed 0x2810 0x7fe57acb
hal fpga writed 0x2810 0x05017fe7
hal fpga writed 0x2810 0x001604cf
hal fpga writed 0x2810 0x7b620014
hal fpga writed 0x2810 0x7fec7b94
hal fpga writed 0x2810 0x04397fee
hal fpga writed 0x2810 0x000f0406
hal fpga writed 0x2810 0x7c2b000e
hal fpga writed 0x2810 0x7ff37c5d
hal fpga writed 0x2810 0x03707ff4
hal fpga writed 0x2810 0x0009033d
hal fpga writed 0x2810 0x7cf40008
hal fpga writed 0x2810 0x7ff87d26
hal fpga writed 0x2810 0x02a77ff9
hal fpga writed 0x2810 0x00050274
hal fpga writed 0x2810 0x7dbd0004
hal fpga writed 0x2810 0x7ffc7def
hal fpga writed 0x2810 0x01de7ffd
hal fpga writed 0x2810 0x000201ab
hal fpga writed 0x2810 0x7e860001
hal fpga writed 0x2810 0x7ffe7eb8
hal fpga writed 0x2810 0x01147fff
hal fpga writed 0x2810 0x000000e2
hal fpga writed 0x2810 0x7f4fffff
hal fpga writed 0x2810 0x7fff7f81
hal fpga writed 0x2810 0x004b7fff
hal fpga writed 0x2810 0xffff0019
hal fpga writed 0x2810 0x0019ffff
hal fpga writed 0x2810 0x7fff004b
hal fpga writed 0x2810 0x7f817fff
hal fpga writed 0x2810 0xffff7f4f
hal fpga writed 0x2810 0x00e20000
hal fpga writed 0x2810 0x7fff0114
hal fpga writed 0x2810 0x7eb87ffe
hal fpga writed 0x2810 0x00017e86
hal fpga writed 0x2810 0x01ab0002
hal fpga writed 0x2810 0x7ffd01de
hal fpga writed 0x2810 0x7def7ffc
hal fpga writed 0x2810 0x00047dbd
hal fpga writed 0x2810 0x02740005
hal fpga writed 0x2810 0x7ff902a7
hal fpga writed 0x2810 0x7d267ff8
hal fpga writed 0x2810 0x00087cf4
hal fpga writed 0x2810 0x033d0009
hal fpga writed 0x2810 0x7ff40370
hal fpga writed 0x2810 0x7c5d7ff3
hal fpga writed 0x2810 0x000e7c2b
hal fpga writed 0x2810 0x0406000f
hal fpga writed 0x2810 0x7fee0439
hal fpga writed 0x2810 0x7b947fec
hal fpga writed 0x2810 0x00147b62
hal fpga writed 0x2810 0x04cf0016
hal fpga writed 0x2810 0x7fe70501
hal fpga writed 0x2810 0x7acb7fe5
hal fpga writed 0x2810 0x001c7a99
hal fpga writed 0x2810 0x0598001e
hal fpga writed 0x2810 0x7fde05ca
hal fpga writed 0x2810 0x7a027fdc
hal fpga writed 0x2810 0x002579d0
hal fpga writed 0x2810 0x06610028
hal fpga writed 0x2810 0x7fd50693
hal fpga writed 0x2810 0x793a7fd2
hal fpga writed 0x2810 0x00307907
hal fpga writed 0x2810 0x072a0032
hal fpga writed 0x2810 0x7fca075c
hal fpga writed 0x2810 0x78717fc7
hal fpga writed 0x2810 0x003b783f
hal fpga writed 0x2810 0x07f2003e
hal fpga writed 0x2810 0x7fbe0825
hal fpga writed 0x2810 0x77a87fba
hal fpga writed 0x2810 0x00487776
hal fpga writed 0x2810 0x08bb004b
hal fpga writed 0x2810 0x7fb008ed
hal fpga writed 0x2810 0x76e07fad
hal fpga writed 0x2810 0x005676ae
hal fpga writed 0x2810 0x0984005a
hal fpga writed 0x2810 0x7fa209b6
hal fpga writed 0x2810 0x76177f9e
hal fpga writed 0x2810 0x006575e5
hal fpga writed 0x2810 0x0a4c0069
hal fpga writed 0x2810 0x7f920a7e
hal fpga writed 0x2810 0x754f7f8e
hal fpga writed 0x2810 0x0076751d
hal fpga writed 0x2810 0x0b14007a
hal fpga writed 0x2810 0x7f810b47
hal fpga writed 0x2810 0x74867f7c
hal fpga writed 0x2810 0x00877454
hal fpga writed 0x2810 0x0bdd008c
hal fpga writed 0x2810 0x7f6e0c0f
hal fpga writed 0x2810 0x73be7f6a
hal fpga writed 0x2810 0x009a738c
hal fpga writed 0x2810 0x0ca5009f
hal fpga writed 0x2810 0x7f5b0cd7
hal fpga writed 0x2810 0x72f67f56
hal fpga writed 0x2810 0x00af72c4
hal fpga writed 0x2810 0x0d6d00b4
hal fpga writed 0x2810 0x7f460d9f
hal fpga writed 0x2810 0x722e7f41
hal fpga writed 0x2810 0x00c471fc
hal fpga writed 0x2810 0x0e3500c9
hal fpga writed 0x2810 0x7f300e67
hal fpga writed 0x2810 0x71667f2a
hal fpga writed 0x2810 0x00db7134
hal fpga writed 0x2810 0x0efc00e0
hal fpga writed 0x2810 0x7f190f2e
hal fpga writed 0x2810 0x709f7f13
hal fpga writed 0x2810 0x00f2706d
hal fpga writed 0x2810 0x0fc400f9
hal fpga writed 0x2810 0x7f000ff6
hal fpga writed 0x2810 0x6fd77efa
hal fpga writed 0x2810 0x010b6fa5
hal fpga writed 0x2810 0x108c0112
hal fpga writed 0x2810 0x7ee710bd
hal fpga writed 0x2810 0x6f107ee0
hal fpga writed 0x2810 0x01266ede
hal fpga writed 0x2810 0x1153012c
hal fpga writed 0x2810 0x7ecc1185
hal fpga writed 0x2810 0x6e497ec5
hal fpga writed 0x2810 0x01416e17
hal fpga writed 0x2810 0x121a0148
hal fpga writed 0x2810 0x7eb0124c
hal fpga writed 0x2810 0x6d827ea8
hal fpga writed 0x2810 0x015e6d50
hal fpga writed 0x2810 0x12e10165
hal fpga writed 0x2810 0x7e921313
hal fpga writed 0x2810 0x6cbb7e8b
hal fpga writed 0x2810 0x017c6c89
hal fpga writed 0x2810 0x13a80184
hal fpga writed 0x2810 0x7e7413d9
hal fpga writed 0x2810 0x6bf47e6c
hal fpga writed 0x2810 0x019b6bc2
hal fpga writed 0x2810 0x146e01a3
hal fpga writed 0x2810 0x7e5414a0
hal fpga writed 0x2810 0x6b2e7e4c
hal fpga writed 0x2810 0x01bc6afc
hal fpga writed 0x2810 0x153501c4
hal fpga writed 0x2810 0x7e331566
hal fpga writed 0x2810 0x6a677e2a
hal fpga writed 0x2810 0x01dd6a36
hal fpga writed 0x2810 0x15fb01e6
hal fpga writed 0x2810 0x7e11162c
hal fpga writed 0x2810 0x69a17e08
hal fpga writed 0x2810 0x02006970
hal fpga writed 0x2810 0x16c10209
hal fpga writed 0x2810 0x7ded16f2
hal fpga writed 0x2810 0x68db7de4
hal fpga writed 0x2810 0x022468aa
hal fpga writed 0x2810 0x1787022d
hal fpga writed 0x2810 0x7dc917b8
hal fpga writed 0x2810 0x68167dbf
hal fpga writed 0x2810 0x024967e4
hal fpga writed 0x2810 0x184c0253
hal fpga writed 0x2810 0x7da3187d
hal fpga writed 0x2810 0x67507d99
hal fpga writed 0x2810 0x0270671f
hal fpga writed 0x2810 0x1911027a
hal fpga writed 0x2810 0x7d7c1943
hal fpga writed 0x2810 0x668b7d72
hal fpga writed 0x2810 0x0297665a
hal fpga writed 0x2810 0x19d602a2
hal fpga writed 0x2810 0x7d531a08
hal fpga writed 0x2810 0x65c67d49
hal fpga writed 0x2810 0x02c06595
hal fpga writed 0x2810 0x1a9b02cb
hal fpga writed 0x2810 0x7d2a1acc
hal fpga writed 0x2810 0x65017d1f
hal fpga writed 0x2810 0x02ea64d0
hal fpga writed 0x2810 0x1b6002f5
hal fpga writed 0x2810 0x7cff1b91
hal fpga writed 0x2810 0x643d7cf4
hal fpga writed 0x2810 0x0316640c
hal fpga writed 0x2810 0x1c240321
hal fpga writed 0x2810 0x7cd31c55
hal fpga writed 0x2810 0x63797cc8
hal fpga writed 0x2810 0x03426348
hal fpga writed 0x2810 0x1ce8034e
hal fpga writed 0x2810 0x7ca61d19
hal fpga writed 0x2810 0x62b57c9b
hal fpga writed 0x2810 0x03706284
hal fpga writed 0x2810 0x1dac037c
hal fpga writed 0x2810 0x7c781ddd
hal fpga writed 0x2810 0x61f17c6c
hal fpga writed 0x2810 0x039f61c1
hal fpga writed 0x2810 0x1e6f03ab
hal fpga writed 0x2810 0x7c481ea0
hal fpga writed 0x2810 0x612e7c3c
hal fpga writed 0x2810 0x03cf60fd
hal fpga writed 0x2810 0x1f3203db
hal fpga writed 0x2810 0x7c181f63
hal fpga writed 0x2810 0x606b7c0b
hal fpga writed 0x2810 0x0400603a
hal fpga writed 0x2810 0x1ff5040d
hal fpga writed 0x2810 0x7be62026
hal fpga writed 0x2810 0x5fa87bd9
hal fpga writed 0x2810 0x04335f78
hal fpga writed 0x2810 0x20b80440
hal fpga writed 0x2810 0x7bb320e8
hal fpga writed 0x2810 0x5ee67ba6
hal fpga writed 0x2810 0x04665eb6
hal fpga writed 0x2810 0x217a0474
hal fpga writed 0x2810 0x7b7e21aa
hal fpga writed 0x2810 0x5e247b71
hal fpga writed 0x2810 0x049b5df4
hal fpga writed 0x2810 0x223c04a9
hal fpga writed 0x2810 0x7b49226c
hal fpga writed 0x2810 0x5d627b3b
hal fpga writed 0x2810 0x04d15d32
hal fpga writed 0x2810 0x22fd04df
hal fpga writed 0x2810 0x7b12232e
hal fpga writed 0x2810 0x5ca17b04
hal fpga writed 0x2810 0x05095c71
hal fpga writed 0x2810 0x23bf0517
hal fpga writed 0x2810 0x7ada23ef
hal fpga writed 0x2810 0x5be07acc
hal fpga writed 0x2810 0x05415bb0
hal fpga writed 0x2810 0x2480054f
hal fpga writed 0x2810 0x7aa124b0
hal fpga writed 0x2810 0x5b1f7a93
hal fpga writed 0x2810 0x057b5aef
hal fpga writed 0x2810 0x25400589
hal fpga writed 0x2810 0x7a672570
hal fpga writed 0x2810 0x5a5f7a58
hal fpga writed 0x2810 0x05b65a2f
hal fpga writed 0x2810 0x260005c4
hal fpga writed 0x2810 0x7a2c2630
hal fpga writed 0x2810 0x599f7a1d
hal fpga writed 0x2810 0x05f1596f
hal fpga writed 0x2810 0x26c00601
hal fpga writed 0x2810 0x79ef26f0
hal fpga writed 0x2810 0x58df79e0
hal fpga writed 0x2810 0x062f58af
hal fpga writed 0x2810 0x2780063e
hal fpga writed 0x2810 0x79b127af
hal fpga writed 0x2810 0x582079a2
hal fpga writed 0x2810 0x066d57f0
hal fpga writed 0x2810 0x283f067d
hal fpga writed 0x2810 0x7972286e
hal fpga writed 0x2810 0x57617962
hal fpga writed 0x2810 0x06ac5731
hal fpga writed 0x2810 0x28fd06bd
hal fpga writed 0x2810 0x7932292d
hal fpga writed 0x2810 0x56a37922
hal fpga writed 0x2810 0x06ed5673
hal fpga writed 0x2810 0x29bc06fe
hal fpga writed 0x2810 0x78f129eb
hal fpga writed 0x2810 0x55e478e1
hal fpga writed 0x2810 0x072f55b5
hal fpga writed 0x2810 0x2a790740
hal fpga writed 0x2810 0x78af2aa9
hal fpga writed 0x2810 0x5527789e
hal fpga writed 0x2810 0x077254f7
hal fpga writed 0x2810 0x2b370783
hal fpga writed 0x2810 0x786b2b66
hal fpga writed 0x2810 0x546a785a
hal fpga writed 0x2810 0x07b6543a
hal fpga writed 0x2810 0x2bf407c7
hal fpga writed 0x2810 0x78262c23
hal fpga writed 0x2810 0x53ad7815
hal fpga writed 0x2810 0x07fc537e
hal fpga writed 0x2810 0x2cb1080d
hal fpga writed 0x2810 0x77e02ce0
hal fpga writed 0x2810 0x52f077cf
hal fpga writed 0x2810 0x084252c1
hal fpga writed 0x2810 0x2d6d0854
hal fpga writed 0x2810 0x77992d9c
hal fpga writed 0x2810 0x52347787
hal fpga writed 0x2810 0x088a5205
hal fpga writed 0x2810 0x2e28089c
hal fpga writed 0x2810 0x77512e57
hal fpga writed 0x2810 0x5179773f
hal fpga writed 0x2810 0x08d2514a
hal fpga writed 0x2810 0x2ee408e5
hal fpga writed 0x2810 0x77082f13
hal fpga writed 0x2810 0x50be76f5
hal fpga writed 0x2810 0x091c508f
hal fpga writed 0x2810 0x2f9f092f
hal fpga writed 0x2810 0x76bd2fcd
hal fpga writed 0x2810 0x500376aa
hal fpga writed 0x2810 0x09674fd5
hal fpga writed 0x2810 0x3059097a
hal fpga writed 0x2810 0x76723088
hal fpga writed 0x2810 0x4f49765e
hal fpga writed 0x2810 0x09b44f1a
hal fpga writed 0x2810 0x311309c7
hal fpga writed 0x2810 0x76253141
hal fpga writed 0x2810 0x4e8f7611
hal fpga writed 0x2810 0x0a014e61
hal fpga writed 0x2810 0x31cc0a15
hal fpga writed 0x2810 0x75d731fb
hal fpga writed 0x2810 0x4dd675c3
hal fpga writed 0x2810 0x0a504da8
hal fpga writed 0x2810 0x32850a63
hal fpga writed 0x2810 0x758832b4
hal fpga writed 0x2810 0x4d1d7574
hal fpga writed 0x2810 0x0a9f4cef
hal fpga writed 0x2810 0x333e0ab3
hal fpga writed 0x2810 0x7538336c
hal fpga writed 0x2810 0x4c657523
hal fpga writed 0x2810 0x0af04c37
hal fpga writed 0x2810 0x33f60b04
hal fpga writed 0x2810 0x74e63424
hal fpga writed 0x2810 0x4bad74d2
hal fpga writed 0x2810 0x0b424b7f
hal fpga writed 0x2810 0x34ad0b57
hal fpga writed 0x2810 0x749434db
hal fpga writed 0x2810 0x4af6747f
hal fpga writed 0x2810 0x0b954ac8
hal fpga writed 0x2810 0x35640baa
hal fpga writed 0x2810 0x74403592
hal fpga writed 0x2810 0x4a3f742b
hal fpga writed 0x2810 0x0be94a12
hal fpga writed 0x2810 0x361b0bfe
hal fpga writed 0x2810 0x73eb3648
hal fpga writed 0x2810 0x498973d6
hal fpga writed 0x2810 0x0c3e495c
hal fpga writed 0x2810 0x36d10c54
hal fpga writed 0x2810 0x739636fe
hal fpga writed 0x2810 0x48d37380
hal fpga writed 0x2810 0x0c9548a6
hal fpga writed 0x2810 0x37860caa
hal fpga writed 0x2810 0x733f37b4
hal fpga writed 0x2810 0x481e7329
hal fpga writed 0x2810 0x0cec47f1
hal fpga writed 0x2810 0x383b0d02
hal fpga writed 0x2810 0x72e73868
hal fpga writed 0x2810 0x476a72d0
hal fpga writed 0x2810 0x0d45473d
hal fpga writed 0x2810 0x38f00d5b
hal fpga writed 0x2810 0x728d391d
hal fpga writed 0x2810 0x46b67277
hal fpga writed 0x2810 0x0d9f4689
hal fpga writed 0x2810 0x39a30db5
hal fpga writed 0x2810 0x723339d0
hal fpga writed 0x2810 0x4602721c
hal fpga writed 0x2810 0x0df945d5
hal fpga writed 0x2810 0x3a570e10
hal fpga writed 0x2810 0x71d83a83
hal fpga writed 0x2810 0x454f71c1
hal fpga writed 0x2810 0x0e554522
hal fpga writed 0x2810 0x3b090e6c
hal fpga writed 0x2810 0x717b3b36
hal fpga writed 0x2810 0x449d7164
hal fpga writed 0x2810 0x0eb24470
hal fpga writed 0x2810 0x3bbb0eca
hal fpga writed 0x2810 0x711e3be8
hal fpga writed 0x2810 0x43eb7106
hal fpga writed 0x2810 0x0f1043be
hal fpga writed 0x2810 0x3c6d0f28
hal fpga writed 0x2810 0x70bf3c99
hal fpga writed 0x2810 0x433a70a7
hal fpga writed 0x2810 0x0f70430d
hal fpga writed 0x2810 0x3d1e0f88
hal fpga writed 0x2810 0x705f3d4a
hal fpga writed 0x2810 0x42897047
hal fpga writed 0x2810 0x0fd0425d
hal fpga writed 0x2810 0x3dce0fe8
hal fpga writed 0x2810 0x6fff3dfa
hal fpga writed 0x2810 0x41d96fe6
hal fpga writed 0x2810 0x103141ad
hal fpga writed 0x2810 0x3e7e104a
hal fpga writed 0x2810 0x6f9d3eaa
hal fpga writed 0x2810 0x41296f84
hal fpga writed 0x2810 0x109440fe
hal fpga writed 0x2810 0x3f2d10ac
hal fpga writed 0x2810 0x6f3a3f59
hal fpga writed 0x2810 0x407a6f21
hal fpga writed 0x2810 0x10f7404f
hal fpga writed 0x2810 0x3fdc1110
hal fpga writed 0x2810 0x6ed64007
hal fpga writed 0x2810 0x3fcc6ebd
hal fpga writed 0x2810 0x115c3fa1
hal fpga writed 0x2810 0x408a1175
hal fpga writed 0x2810 0x6e7140b5
hal fpga writed 0x2810 0x3f1f6e57
hal fpga writed 0x2810 0x11c13ef3
hal fpga writed 0x2810 0x413711db
hal fpga writed 0x2810 0x6e0a4162
hal fpga writed 0x2810 0x3e726df1
hal fpga writed 0x2810 0x12283e46
hal fpga writed 0x2810 0x41e41242
hal fpga writed 0x2810 0x6da3420f
hal fpga writed 0x2810 0x3dc56d89
hal fpga writed 0x2810 0x12903d9a
hal fpga writed 0x2810 0x429012aa
hal fpga writed 0x2810 0x6d3b42bb
hal fpga writed 0x2810 0x3d196d21
hal fpga writed 0x2810 0x12f93cef
hal fpga writed 0x2810 0x433b1313
hal fpga writed 0x2810 0x6cd24366
hal fpga writed 0x2810 0x3c6e6cb7
hal fpga writed 0x2810 0x13623c44
hal fpga writed 0x2810 0x43e6137d
hal fpga writed 0x2810 0x6c674411
hal fpga writed 0x2810 0x3bc46c4c
hal fpga writed 0x2810 0x13cd3b99
hal fpga writed 0x2810 0x449013e8
hal fpga writed 0x2810 0x6bfc44ba
hal fpga writed 0x2810 0x3b1a6be1
hal fpga writed 0x2810 0x14393af0
hal fpga writed 0x2810 0x45391455
hal fpga writed 0x2810 0x6b8f4564
hal fpga writed 0x2810 0x3a716b74
hal fpga writed 0x2810 0x14a63a47
hal fpga writed 0x2810 0x45e214c2
hal fpga writed 0x2810 0x6b22460c
hal fpga writed 0x2810 0x39c96b06
hal fpga writed 0x2810 0x1514399f
hal fpga writed 0x2810 0x468a1530
hal fpga writed 0x2810 0x6ab346b4
hal fpga writed 0x2810 0x39216a97
hal fpga writed 0x2810 0x158338f7
hal fpga writed 0x2810 0x4732159f
hal fpga writed 0x2810 0x6a44475c
hal fpga writed 0x2810 0x387a6a28
hal fpga writed 0x2810 0x15f43850
hal fpga writed 0x2810 0x47d91610
hal fpga writed 0x2810 0x69d34802
hal fpga writed 0x2810 0x37d369b7
hal fpga writed 0x2810 0x166537aa
hal fpga writed 0x2810 0x487f1681
hal fpga writed 0x2810 0x696148a8
hal fpga writed 0x2810 0x372e6945
hal fpga writed 0x2810 0x16d73704
hal fpga writed 0x2810 0x492416f3
hal fpga writed 0x2810 0x68ef494d
hal fpga writed 0x2810 0x368968d2
hal fpga writed 0x2810 0x174a365f
hal fpga writed 0x2810 0x49c91767
hal fpga writed 0x2810 0x687b49f2
hal fpga writed 0x2810 0x35e4685e
hal fpga writed 0x2810 0x17be35bb
hal fpga writed 0x2810 0x4a6d17db
hal fpga writed 0x2810 0x68064a95
hal fpga writed 0x2810 0x354167e9
hal fpga writed 0x2810 0x18333518
hal fpga writed 0x2810 0x4b101851
hal fpga writed 0x2810 0x67914b38
hal fpga writed 0x2810 0x349e6773
hal fpga writed 0x2810 0x18a93475
hal fpga writed 0x2810 0x4bb218c7
hal fpga writed 0x2810 0x671a4bdb
hal fpga writed 0x2810 0x33fc66fc
hal fpga writed 0x2810 0x192133d3
hal fpga writed 0x2810 0x4c54193e
hal fpga writed 0x2810 0x66a34c7c
hal fpga writed 0x2810 0x335a6684
hal fpga writed 0x2810 0x19993332
hal fpga writed 0x2810 0x4cf519b7
hal fpga writed 0x2810 0x662a4d1d
hal fpga writed 0x2810 0x32ba660c
hal fpga writed 0x2810 0x1a123292
hal fpga writed 0x2810 0x4d951a30
hal fpga writed 0x2810 0x65b04dbd
hal fpga writed 0x2810 0x321a6592
hal fpga writed 0x2810 0x1a8c31f2
hal fpga writed 0x2810 0x4e351aab
hal fpga writed 0x2810 0x65364e5d
hal fpga writed 0x2810 0x317b6517
hal fpga writed 0x2810 0x1b073153
hal fpga writed 0x2810 0x4ed41b26
hal fpga writed 0x2810 0x64ba4efb
hal fpga writed 0x2810 0x30dc649b
hal fpga writed 0x2810 0x1b8330b5
hal fpga writed 0x2810 0x4f721ba2
hal fpga writed 0x2810 0x643e4f99
hal fpga writed 0x2810 0x303f641e
hal fpga writed 0x2810 0x1c003017
hal fpga writed 0x2810 0x500f1c20
hal fpga writed 0x2810 0x63c05036
hal fpga writed 0x2810 0x2fa263a0
hal fpga writed 0x2810 0x1c7e2f7b
hal fpga writed 0x2810 0x50ac1c9e
hal fpga writed 0x2810 0x634250d3
hal fpga writed 0x2810 0x2f066322
hal fpga writed 0x2810 0x1cfd2edf
hal fpga writed 0x2810 0x51471d1d
hal fpga writed 0x2810 0x62c2516e
hal fpga writed 0x2810 0x2e6a62a2
hal fpga writed 0x2810 0x1d7d2e44
hal fpga writed 0x2810 0x51e21d9d
hal fpga writed 0x2810 0x62425209
hal fpga writed 0x2810 0x2dd06221
hal fpga writed 0x2810 0x1dfe2da9
hal fpga writed 0x2810 0x527c1e1e
hal fpga writed 0x2810 0x61c052a3
hal fpga writed 0x2810 0x2d3661a0
hal fpga writed 0x2810 0x1e802d10
hal fpga writed 0x2810 0x53161ea0
hal fpga writed 0x2810 0x613e533c
hal fpga writed 0x2810 0x2c9d611d
hal fpga writed 0x2810 0x1f022c77
hal fpga writed 0x2810 0x53ae1f23
hal fpga writed 0x2810 0x60bb53d4
hal fpga writed 0x2810 0x2c05609a
hal fpga writed 0x2810 0x1f862bdf
hal fpga writed 0x2810 0x54461fa7
hal fpga writed 0x2810 0x6037546c
hal fpga writed 0x2810 0x2b6e6016
hal fpga writed 0x2810 0x200b2b48
hal fpga writed 0x2810 0x54dd202c
hal fpga writed 0x2810 0x5fb25502
hal fpga writed 0x2810 0x2ad75f90
hal fpga writed 0x2810 0x20902ab1
hal fpga writed 0x2810 0x557320b2
hal fpga writed 0x2810 0x5f2c5598
hal fpga writed 0x2810 0x2a415f0a
hal fpga writed 0x2810 0x21172a1c
hal fpga writed 0x2810 0x56082138
hal fpga writed 0x2810 0x5ea5562d
hal fpga writed 0x2810 0x29ac5e83
hal fpga writed 0x2810 0x219e2987
hal fpga writed 0x2810 0x569d21c0
hal fpga writed 0x2810 0x5e1d56c2
hal fpga writed 0x2810 0x29185dfb
hal fpga writed 0x2810 0x222628f3
hal fpga writed 0x2810 0x57302248
hal fpga writed 0x2810 0x5d945755
hal fpga writed 0x2810 0x28855d72
hal fpga writed 0x2810 0x22af2860
hal fpga writed 0x2810 0x57c322d2
hal fpga writed 0x2810 0x5d0b57e8
hal fpga writed 0x2810 0x27f35ce8
hal fpga writed 0x2810 0x233a27ce
hal fpga writed 0x2810 0x5855235c
hal fpga writed 0x2810 0x5c805879
hal fpga writed 0x2810 0x27615c5d
hal fpga writed 0x2810 0x23c5273d
hal fpga writed 0x2810 0x58e623e7
hal fpga writed 0x2810 0x5bf5590a
hal fpga writed 0x2810 0x26d15bd2
hal fpga writed 0x2810 0x245026ad
hal fpga writed 0x2810 0x59762473
hal fpga writed 0x2810 0x5b68599a
hal fpga writed 0x2810 0x26415b45
hal fpga writed 0x2810 0x24dd261d
hal fpga writed 0x2810 0x5a062500
hal fpga writed 0x2810 0x5adb5a29
hal fpga writed 0x2810 0x25b25ab8
hal fpga writed 0x2810 0x256b258e
hal fpga writed 0x2810 0x256b5a71
hal fpga writed 0x2810 0x25b22547
hal fpga writed 0x2810 0x5adb25d6
hal fpga writed 0x2810 0x5a065aff
hal fpga writed 0x2810 0x24dd59e2
hal fpga writed 0x2810 0x264124ba
hal fpga writed 0x2810 0x5b682665
hal fpga writed 0x2810 0x59765b8c
hal fpga writed 0x2810 0x24505952
hal fpga writed 0x2810 0x26d1242d
hal fpga writed 0x2810 0x5bf526f5
hal fpga writed 0x2810 0x58e65c18
hal fpga writed 0x2810 0x23c558c2
hal fpga writed 0x2810 0x276123a2
hal fpga writed 0x2810 0x5c802786
hal fpga writed 0x2810 0x58555ca3
hal fpga writed 0x2810 0x233a5831
hal fpga writed 0x2810 0x27f32317
hal fpga writed 0x2810 0x5d0b2817
hal fpga writed 0x2810 0x57c35d2d
hal fpga writed 0x2810 0x22af579f
hal fpga writed 0x2810 0x2885228d
hal fpga writed 0x2810 0x5d9428aa
hal fpga writed 0x2810 0x57305db7
hal fpga writed 0x2810 0x2226570c
hal fpga writed 0x2810 0x29182204
hal fpga writed 0x2810 0x5e1d293d
hal fpga writed 0x2810 0x569d5e3f
hal fpga writed 0x2810 0x219e5678
hal fpga writed 0x2810 0x29ac217c
hal fpga writed 0x2810 0x5ea529d2
hal fpga writed 0x2810 0x56085ec7
hal fpga writed 0x2810 0x211755e3
hal fpga writed 0x2810 0x2a4120f5
hal fpga writed 0x2810 0x5f2c2a67
hal fpga writed 0x2810 0x55735f4d
hal fpga writed 0x2810 0x2090554e
hal fpga writed 0x2810 0x2ad7206f
hal fpga writed 0x2810 0x5fb22afd
hal fpga writed 0x2810 0x54dd5fd3
hal fpga writed 0x2810 0x200b54b7
hal fpga writed 0x2810 0x2b6e1fe9
hal fpga writed 0x2810 0x60372b93
hal fpga writed 0x2810 0x54466058
hal fpga writed 0x2810 0x1f865420
hal fpga writed 0x2810 0x2c051f65
hal fpga writed 0x2810 0x60bb2c2b
hal fpga writed 0x2810 0x53ae60dc
hal fpga writed 0x2810 0x1f025388
hal fpga writed 0x2810 0x2c9d1ee2
hal fpga writed 0x2810 0x613e2cc3
hal fpga writed 0x2810 0x5316615f
hal fpga writed 0x2810 0x1e8052ef
hal fpga writed 0x2810 0x2d361e5f
hal fpga writed 0x2810 0x61c02d5c
hal fpga writed 0x2810 0x527c61e1
hal fpga writed 0x2810 0x1dfe5256
hal fpga writed 0x2810 0x2dd01dde
hal fpga writed 0x2810 0x62422df6
hal fpga writed 0x2810 0x51e26262
hal fpga writed 0x2810 0x1d7d51bb
hal fpga writed 0x2810 0x2e6a1d5d
hal fpga writed 0x2810 0x62c22e91
hal fpga writed 0x2810 0x514762e2
hal fpga writed 0x2810 0x1cfd5120
hal fpga writed 0x2810 0x2f061cdd
hal fpga writed 0x2810 0x63422f2c
hal fpga writed 0x2810 0x50ac6361
hal fpga writed 0x2810 0x1c7e5084
hal fpga writed 0x2810 0x2fa21c5f
hal fpga writed 0x2810 0x63c02fc9
hal fpga writed 0x2810 0x500f63df
hal fpga writed 0x2810 0x1c004fe8
hal fpga writed 0x2810 0x303f1be1
hal fpga writed 0x2810 0x643e3066
hal fpga writed 0x2810 0x4f72645d
hal fpga writed 0x2810 0x1b834f4a
hal fpga writed 0x2810 0x30dc1b64
hal fpga writed 0x2810 0x64ba3104
hal fpga writed 0x2810 0x4ed464d9
hal fpga writed 0x2810 0x1b074eac
hal fpga writed 0x2810 0x317b1ae8
hal fpga writed 0x2810 0x653631a2
hal fpga writed 0x2810 0x4e356554
hal fpga writed 0x2810 0x1a8c4e0d
hal fpga writed 0x2810 0x321a1a6d
hal fpga writed 0x2810 0x65b03242
hal fpga writed 0x2810 0x4d9565cf
hal fpga writed 0x2810 0x1a124d6d
hal fpga writed 0x2810 0x32ba19f3
hal fpga writed 0x2810 0x662a32e2
hal fpga writed 0x2810 0x4cf56648
hal fpga writed 0x2810 0x19994ccd
hal fpga writed 0x2810 0x335a197b
hal fpga writed 0x2810 0x66a33383
hal fpga writed 0x2810 0x4c5466c1
hal fpga writed 0x2810 0x19214c2c
hal fpga writed 0x2810 0x33fc1903
hal fpga writed 0x2810 0x671a3424
hal fpga writed 0x2810 0x4bb26738
hal fpga writed 0x2810 0x18a94b8a
hal fpga writed 0x2810 0x349e188c
hal fpga writed 0x2810 0x679134c7
hal fpga writed 0x2810 0x4b1067ae
hal fpga writed 0x2810 0x18334ae7
hal fpga writed 0x2810 0x35411816
hal fpga writed 0x2810 0x6806356a
hal fpga writed 0x2810 0x4a6d6824
hal fpga writed 0x2810 0x17be4a44
hal fpga writed 0x2810 0x35e417a1
hal fpga writed 0x2810 0x687b360d
hal fpga writed 0x2810 0x49c96898
hal fpga writed 0x2810 0x174a49a0
hal fpga writed 0x2810 0x3689172d
hal fpga writed 0x2810 0x68ef36b2
hal fpga writed 0x2810 0x4924690c
hal fpga writed 0x2810 0x16d748fb
hal fpga writed 0x2810 0x372e16ba
hal fpga writed 0x2810 0x69613757
hal fpga writed 0x2810 0x487f697e
hal fpga writed 0x2810 0x16654855
hal fpga writed 0x2810 0x37d31648
hal fpga writed 0x2810 0x69d337fd
hal fpga writed 0x2810 0x47d969ef
hal fpga writed 0x2810 0x15f447af
hal fpga writed 0x2810 0x387a15d7
hal fpga writed 0x2810 0x6a4438a3
hal fpga writed 0x2810 0x47326a60
hal fpga writed 0x2810 0x15834708
hal fpga writed 0x2810 0x39211568
hal fpga writed 0x2810 0x6ab3394b
hal fpga writed 0x2810 0x468a6acf
hal fpga writed 0x2810 0x15144660
hal fpga writed 0x2810 0x39c914f9
hal fpga writed 0x2810 0x6b2239f3
hal fpga writed 0x2810 0x45e26b3d
hal fpga writed 0x2810 0x14a645b8
hal fpga writed 0x2810 0x3a71148b
hal fpga writed 0x2810 0x6b8f3a9b
hal fpga writed 0x2810 0x45396baa
hal fpga writed 0x2810 0x1439450f
hal fpga writed 0x2810 0x3b1a141e
hal fpga writed 0x2810 0x6bfc3b45
hal fpga writed 0x2810 0x44906c17
hal fpga writed 0x2810 0x13cd4466
hal fpga writed 0x2810 0x3bc413b3
hal fpga writed 0x2810 0x6c673bee
hal fpga writed 0x2810 0x43e66c82
hal fpga writed 0x2810 0x136243bb
hal fpga writed 0x2810 0x3c6e1348
hal fpga writed 0x2810 0x6cd23c99
hal fpga writed 0x2810 0x433b6cec
hal fpga writed 0x2810 0x12f94310
hal fpga writed 0x2810 0x3d1912de
hal fpga writed 0x2810 0x6d3b3d44
hal fpga writed 0x2810 0x42906d55
hal fpga writed 0x2810 0x12904265
hal fpga writed 0x2810 0x3dc51276
hal fpga writed 0x2810 0x6da33df0
hal fpga writed 0x2810 0x41e46dbd
hal fpga writed 0x2810 0x122841b9
hal fpga writed 0x2810 0x3e72120e
hal fpga writed 0x2810 0x6e0a3e9d
hal fpga writed 0x2810 0x41376e24
hal fpga writed 0x2810 0x11c1410c
hal fpga writed 0x2810 0x3f1f11a8
hal fpga writed 0x2810 0x6e713f4a
hal fpga writed 0x2810 0x408a6e8a
hal fpga writed 0x2810 0x115c405e
hal fpga writed 0x2810 0x3fcc1142
hal fpga writed 0x2810 0x6ed63ff8
hal fpga writed 0x2810 0x3fdc6eef
hal fpga writed 0x2810 0x10f73fb0
hal fpga writed 0x2810 0x407a10de
hal fpga writed 0x2810 0x6f3a40a6
hal fpga writed 0x2810 0x3f2d6f53
hal fpga writed 0x2810 0x10943f01
hal fpga writed 0x2810 0x4129107b
hal fpga writed 0x2810 0x6f9d4155
hal fpga writed 0x2810 0x3e7e6fb5
hal fpga writed 0x2810 0x10313e52
hal fpga writed 0x2810 0x41d91019
hal fpga writed 0x2810 0x6fff4205
hal fpga writed 0x2810 0x3dce7017
hal fpga writed 0x2810 0x0fd03da2
hal fpga writed 0x2810 0x42890fb8
hal fpga writed 0x2810 0x705f42b5
hal fpga writed 0x2810 0x3d1e7077
hal fpga writed 0x2810 0x0f703cf2
hal fpga writed 0x2810 0x433a0f58
hal fpga writed 0x2810 0x70bf4366
hal fpga writed 0x2810 0x3c6d70d7
hal fpga writed 0x2810 0x0f103c41
hal fpga writed 0x2810 0x43eb0ef9
hal fpga writed 0x2810 0x711e4417
hal fpga writed 0x2810 0x3bbb7135
hal fpga writed 0x2810 0x0eb23b8f
hal fpga writed 0x2810 0x449d0e9b
hal fpga writed 0x2810 0x717b44c9
hal fpga writed 0x2810 0x3b097193
hal fpga writed 0x2810 0x0e553add
hal fpga writed 0x2810 0x454f0e3e
hal fpga writed 0x2810 0x71d8457c
hal fpga writed 0x2810 0x3a5771ef
hal fpga writed 0x2810 0x0df93a2a
hal fpga writed 0x2810 0x46020de3
hal fpga writed 0x2810 0x7233462f
hal fpga writed 0x2810 0x39a3724a
hal fpga writed 0x2810 0x0d9f3976
hal fpga writed 0x2810 0x46b60d88
hal fpga writed 0x2810 0x728d46e2
hal fpga writed 0x2810 0x38f072a4
hal fpga writed 0x2810 0x0d4538c2
hal fpga writed 0x2810 0x476a0d2f
hal fpga writed 0x2810 0x72e74797
hal fpga writed 0x2810 0x383b72fd
hal fpga writed 0x2810 0x0cec380e
hal fpga writed 0x2810 0x481e0cd6
hal fpga writed 0x2810 0x733f484b
hal fpga writed 0x2810 0x37867355
hal fpga writed 0x2810 0x0c953759
hal fpga writed 0x2810 0x48d30c7f
hal fpga writed 0x2810 0x73964901
hal fpga writed 0x2810 0x36d173ab
hal fpga writed 0x2810 0x0c3e36a3
hal fpga writed 0x2810 0x49890c29
hal fpga writed 0x2810 0x73eb49b7
hal fpga writed 0x2810 0x361b7401
hal fpga writed 0x2810 0x0be935ed
hal fpga writed 0x2810 0x4a3f0bd4
hal fpga writed 0x2810 0x74404a6d
hal fpga writed 0x2810 0x35647455
hal fpga writed 0x2810 0x0b953537
hal fpga writed 0x2810 0x4af60b80
hal fpga writed 0x2810 0x74944b24
hal fpga writed 0x2810 0x34ad74a8
hal fpga writed 0x2810 0x0b423480
hal fpga writed 0x2810 0x4bad0b2d
hal fpga writed 0x2810 0x74e64bdb
hal fpga writed 0x2810 0x33f674fb
hal fpga writed 0x2810 0x0af033c8
hal fpga writed 0x2810 0x4c650adc
hal fpga writed 0x2810 0x75384c93
hal fpga writed 0x2810 0x333e754c
hal fpga writed 0x2810 0x0a9f3310
hal fpga writed 0x2810 0x4d1d0a8b
hal fpga writed 0x2810 0x75884d4b
hal fpga writed 0x2810 0x3285759c
hal fpga writed 0x2810 0x0a503257
hal fpga writed 0x2810 0x4dd60a3c
hal fpga writed 0x2810 0x75d74e04
hal fpga writed 0x2810 0x31cc75ea
hal fpga writed 0x2810 0x0a01319e
hal fpga writed 0x2810 0x4e8f09ee
hal fpga writed 0x2810 0x76254ebe
hal fpga writed 0x2810 0x31137638
hal fpga writed 0x2810 0x09b430e5
hal fpga writed 0x2810 0x4f4909a1
hal fpga writed 0x2810 0x76724f77
hal fpga writed 0x2810 0x30597685
hal fpga writed 0x2810 0x0967302a
hal fpga writed 0x2810 0x50030955
hal fpga writed 0x2810 0x76bd5032
hal fpga writed 0x2810 0x2f9f76d0
hal fpga writed 0x2810 0x091c2f70
hal fpga writed 0x2810 0x50be090a
hal fpga writed 0x2810 0x770850ec
hal fpga writed 0x2810 0x2ee4771a
hal fpga writed 0x2810 0x08d22eb5
hal fpga writed 0x2810 0x517908c0
hal fpga writed 0x2810 0x775151a8
hal fpga writed 0x2810 0x2e287763
hal fpga writed 0x2810 0x088a2dfa
hal fpga writed 0x2810 0x52340878
hal fpga writed 0x2810 0x77995263
hal fpga writed 0x2810 0x2d6d77ab
hal fpga writed 0x2810 0x08422d3e
hal fpga writed 0x2810 0x52f00830
hal fpga writed 0x2810 0x77e0531f
hal fpga writed 0x2810 0x2cb177f2
hal fpga writed 0x2810 0x07fc2c81
hal fpga writed 0x2810 0x53ad07ea
hal fpga writed 0x2810 0x782653dc
hal fpga writed 0x2810 0x2bf47838
hal fpga writed 0x2810 0x07b62bc5
hal fpga writed 0x2810 0x546a07a5
hal fpga writed 0x2810 0x786b5499
hal fpga writed 0x2810 0x2b37787c
hal fpga writed 0x2810 0x07722b08
hal fpga writed 0x2810 0x55270761
hal fpga writed 0x2810 0x78af5556
hal fpga writed 0x2810 0x2a7978bf
hal fpga writed 0x2810 0x072f2a4a
hal fpga writed 0x2810 0x55e4071e
hal fpga writed 0x2810 0x78f15614
hal fpga writed 0x2810 0x29bc7901
hal fpga writed 0x2810 0x06ed298c
hal fpga writed 0x2810 0x56a306dd
hal fpga writed 0x2810 0x793256d2
hal fpga writed 0x2810 0x28fd7942
hal fpga writed 0x2810 0x06ac28ce
hal fpga writed 0x2810 0x5761069d
hal fpga writed 0x2810 0x79725791
hal fpga writed 0x2810 0x283f7982
hal fpga writed 0x2810 0x066d280f
hal fpga writed 0x2810 0x5820065d
hal fpga writed 0x2810 0x79b15850
hal fpga writed 0x2810 0x278079c1
hal fpga writed 0x2810 0x062f2750
hal fpga writed 0x2810 0x58df061f
hal fpga writed 0x2810 0x79ef590f
hal fpga writed 0x2810 0x26c079fe
hal fpga writed 0x2810 0x05f12690
hal fpga writed 0x2810 0x599f05e2
hal fpga writed 0x2810 0x7a2c59cf
hal fpga writed 0x2810 0x26007a3b
hal fpga writed 0x2810 0x05b625d0
hal fpga writed 0x2810 0x5a5f05a7
hal fpga writed 0x2810 0x7a675a8f
hal fpga writed 0x2810 0x25407a76
hal fpga writed 0x2810 0x057b2510
hal fpga writed 0x2810 0x5b1f056c
hal fpga writed 0x2810 0x7aa15b4f
hal fpga writed 0x2810 0x24807ab0
hal fpga writed 0x2810 0x0541244f
hal fpga writed 0x2810 0x5be00533
hal fpga writed 0x2810 0x7ada5c10
hal fpga writed 0x2810 0x23bf7ae8
hal fpga writed 0x2810 0x0509238e
hal fpga writed 0x2810 0x5ca104fb
hal fpga writed 0x2810 0x7b125cd1
hal fpga writed 0x2810 0x22fd7b20
hal fpga writed 0x2810 0x04d122cd
hal fpga writed 0x2810 0x5d6204c4
hal fpga writed 0x2810 0x7b495d93
hal fpga writed 0x2810 0x223c7b56
hal fpga writed 0x2810 0x049b220b
hal fpga writed 0x2810 0x5e24048e
hal fpga writed 0x2810 0x7b7e5e55
hal fpga writed 0x2810 0x217a7b8b
hal fpga writed 0x2810 0x04662149
hal fpga writed 0x2810 0x5ee60459
hal fpga writed 0x2810 0x7bb35f17
hal fpga writed 0x2810 0x20b87bbf
hal fpga writed 0x2810 0x04332087
hal fpga writed 0x2810 0x5fa80426
hal fpga writed 0x2810 0x7be65fd9
hal fpga writed 0x2810 0x1ff57bf2
hal fpga writed 0x2810 0x04001fc5
hal fpga writed 0x2810 0x606b03f4
hal fpga writed 0x2810 0x7c18609c
hal fpga writed 0x2810 0x1f327c24
hal fpga writed 0x2810 0x03cf1f02
hal fpga writed 0x2810 0x612e03c3
hal fpga writed 0x2810 0x7c48615f
hal fpga writed 0x2810 0x1e6f7c54
hal fpga writed 0x2810 0x039f1e3e
hal fpga writed 0x2810 0x61f10393
hal fpga writed 0x2810 0x7c786222
hal fpga writed 0x2810 0x1dac7c83
hal fpga writed 0x2810 0x03701d7b
hal fpga writed 0x2810 0x62b50364
hal fpga writed 0x2810 0x7ca662e6
hal fpga writed 0x2810 0x1ce87cb1
hal fpga writed 0x2810 0x03421cb7
hal fpga writed 0x2810 0x63790337
hal fpga writed 0x2810 0x7cd363aa
hal fpga writed 0x2810 0x1c247cde
hal fpga writed 0x2810 0x03161bf3
hal fpga writed 0x2810 0x643d030b
hal fpga writed 0x2810 0x7cff646e
hal fpga writed 0x2810 0x1b607d0a
hal fpga writed 0x2810 0x02ea1b2f
hal fpga writed 0x2810 0x650102e0
hal fpga writed 0x2810 0x7d2a6533
hal fpga writed 0x2810 0x1a9b7d34
hal fpga writed 0x2810 0x02c01a6a
hal fpga writed 0x2810 0x65c602b6
hal fpga writed 0x2810 0x7d5365f7
hal fpga writed 0x2810 0x19d67d5d
hal fpga writed 0x2810 0x029719a5
hal fpga writed 0x2810 0x668b028d
hal fpga writed 0x2810 0x7d7c66bc
hal fpga writed 0x2810 0x19117d85
hal fpga writed 0x2810 0x027018e0
hal fpga writed 0x2810 0x67500266
hal fpga writed 0x2810 0x7da36782
hal fpga writed 0x2810 0x184c7dac
hal fpga writed 0x2810 0x0249181b
hal fpga writed 0x2810 0x68160240
hal fpga writed 0x2810 0x7dc96847
hal fpga writed 0x2810 0x17877dd2
hal fpga writed 0x2810 0x02241755
hal fpga writed 0x2810 0x68db021b
hal fpga writed 0x2810 0x7ded690d
hal fpga writed 0x2810 0x16c17df6
hal fpga writed 0x2810 0x0200168f
hal fpga writed 0x2810 0x69a101f7
hal fpga writed 0x2810 0x7e1169d3
hal fpga writed 0x2810 0x15fb7e19
hal fpga writed 0x2810 0x01dd15c9
hal fpga writed 0x2810 0x6a6701d5
hal fpga writed 0x2810 0x7e336a99
hal fpga writed 0x2810 0x15357e3b
hal fpga writed 0x2810 0x01bc1503
hal fpga writed 0x2810 0x6b2e01b3
hal fpga writed 0x2810 0x7e546b5f
hal fpga writed 0x2810 0x146e7e5c
hal fpga writed 0x2810 0x019b143d
hal fpga writed 0x2810 0x6bf40193
hal fpga writed 0x2810 0x7e746c26
hal fpga writed 0x2810 0x13a87e7b
hal fpga writed 0x2810 0x017c1376
hal fpga writed 0x2810 0x6cbb0174
hal fpga writed 0x2810 0x7e926cec
hal fpga writed 0x2810 0x12e17e9a
hal fpga writed 0x2810 0x015e12af
hal fpga writed 0x2810 0x6d820157
hal fpga writed 0x2810 0x7eb06db3
hal fpga writed 0x2810 0x121a7eb7
hal fpga writed 0x2810 0x014111e8
hal fpga writed 0x2810 0x6e49013a
hal fpga writed 0x2810 0x7ecc6e7a
hal fpga writed 0x2810 0x11537ed3
hal fpga writed 0x2810 0x01261121
hal fpga writed 0x2810 0x6f10011f
hal fpga writed 0x2810 0x7ee76f42
hal fpga writed 0x2810 0x108c7eed
hal fpga writed 0x2810 0x010b105a
hal fpga writed 0x2810 0x6fd70105
hal fpga writed 0x2810 0x7f007009
hal fpga writed 0x2810 0x0fc47f06
hal fpga writed 0x2810 0x00f20f92
hal fpga writed 0x2810 0x709f00ec
hal fpga writed 0x2810 0x7f1970d1
hal fpga writed 0x2810 0x0efc7f1f
hal fpga writed 0x2810 0x00db0ecb
hal fpga writed 0x2810 0x716600d5
hal fpga writed 0x2810 0x7f307198
hal fpga writed 0x2810 0x0e357f36
hal fpga writed 0x2810 0x00c40e03
hal fpga writed 0x2810 0x722e00be
hal fpga writed 0x2810 0x7f467260
hal fpga writed 0x2810 0x0d6d7f4b
hal fpga writed 0x2810 0x00af0d3b
hal fpga writed 0x2810 0x72f600a9
hal fpga writed 0x2810 0x7f5b7328
hal fpga writed 0x2810 0x0ca57f60
hal fpga writed 0x2810 0x009a0c73
hal fpga writed 0x2810 0x73be0095
hal fpga writed 0x2810 0x7f6e73f0
hal fpga writed 0x2810 0x0bdd7f73
hal fpga writed 0x2810 0x00870bab
hal fpga writed 0x2810 0x74860083
hal fpga writed 0x2810 0x7f8174b8
hal fpga writed 0x2810 0x0b147f85
hal fpga writed 0x2810 0x00760ae2
hal fpga writed 0x2810 0x754f0071
hal fpga writed 0x2810 0x7f927581
hal fpga writed 0x2810 0x0a4c7f96
hal fpga writed 0x2810 0x00650a1a
hal fpga writed 0x2810 0x76170061
hal fpga writed 0x2810 0x7fa27649
hal fpga writed 0x2810 0x09847fa5
hal fpga writed 0x2810 0x00560951
hal fpga writed 0x2810 0x76e00052
hal fpga writed 0x2810 0x7fb07712
hal fpga writed 0x2810 0x08bb7fb4
hal fpga writed 0x2810 0x00480889
hal fpga writed 0x2810 0x77a80045
hal fpga writed 0x2810 0x7fbe77da
hal fpga writed 0x2810 0x07f27fc1
hal fpga writed 0x2810 0x003b07c0
hal fpga writed 0x2810 0x78710038
hal fpga writed 0x2810 0x7fca78a3
hal fpga writed 0x2810 0x072a7fcd
hal fpga writed 0x2810 0x003006f8
hal fpga writed 0x2810 0x793a002d
hal fpga writed 0x2810 0x7fd5796c
hal fpga writed 0x2810 0x06617fd7
hal fpga writed 0x2810 0x0025062f
hal fpga writed 0x2810 0x7a020023
hal fpga writed 0x2810 0x7fde7a35
hal fpga writed 0x2810 0x05987fe1
hal fpga writed 0x2810 0x001c0566
hal fpga writed 0x2810 0x7acb001a
hal fpga writed 0x2810 0x7fe77afe
hal fpga writed 0x2810 0x04cf7fe9
hal fpga writed 0x2810 0x0014049d
hal fpga writed 0x2810 0x7b940013
hal fpga writed 0x2810 0x7fee7bc6
hal fpga writed 0x2810 0x04067ff0
hal fpga writed 0x2810 0x000e03d4
hal fpga writed 0x2810 0x7c5d000c
hal fpga writed 0x2810 0x7ff47c8f
hal fpga writed 0x2810 0x033d7ff6
hal fpga writed 0x2810 0x0008030b
hal fpga writed 0x2810 0x7d260007
hal fpga writed 0x2810 0x7ff97d58
hal fpga writed 0x2810 0x02747ffa
hal fpga writed 0x2810 0x00040242
hal fpga writed 0x2810 0x7def0003
hal fpga writed 0x2810 0x7ffd7e21
hal fpga writed 0x2810 0x01ab7ffd
hal fpga writed 0x2810 0x00010179
hal fpga writed 0x2810 0x7eb80001
hal fpga writed 0x2810 0x7fff7eeb
hal fpga writed 0x2810 0x00e27fff
hal fpga writed 0x2810 0xffff00b0
hal fpga writed 0x2810 0x7f81ffff
hal fpga writed 0x2810 0x7fff7fb4
hal fpga writed 0x2810 0x00197fff
hal fpga writed 0x2810 0xffff7fe6
hal fpga writed 0x2810 0x004bffff
hal fpga writed 0x2810 0x7fff007e
hal fpga writed 0x2810 0x7f4f7fff
hal fpga writed 0x2810 0x00007f1d
hal fpga writed 0x2810 0x01140000
hal fpga writed 0x2810 0x7ffe0147
hal fpga writed 0x2810 0x7e867ffe
hal fpga writed 0x2810 0x00027e54
hal fpga writed 0x2810 0x01de0002
hal fpga writed 0x2810 0x7ffc0210
hal fpga writed 0x2810 0x7dbd7ffb
hal fpga writed 0x2810 0x00057d8b
hal fpga writed 0x2810 0x02a70006
hal fpga writed 0x2810 0x7ff802d9
hal fpga writed 0x2810 0x7cf47ff7
hal fpga writed 0x2810 0x00097cc2
hal fpga writed 0x2810 0x0370000b
hal fpga writed 0x2810 0x7ff303a2
hal fpga writed 0x2810 0x7c2b7ff1
hal fpga writed 0x2810 0x000f7bf9
hal fpga writed 0x2810 0x04390011
hal fpga writed 0x2810 0x7fec046b
hal fpga writed 0x2810 0x7b627feb
hal fpga writed 0x2810 0x00167b30
hal fpga writed 0x2810 0x05010018
hal fpga writed 0x2810 0x7fe50534
hal fpga writed 0x2810 0x7a997fe3
hal fpga writed 0x2810 0x001e7a67
hal fpga writed 0x2810 0x05ca0021
hal fpga writed 0x2810 0x7fdc05fd
hal fpga writed 0x2810 0x79d07fda
hal fpga writed 0x2810 0x0028799e
hal fpga writed 0x2810 0x0693002a
hal fpga writed 0x2810 0x7fd206c5
hal fpga writed 0x2810 0x79077fcf
hal fpga writed 0x2810 0x003278d5
hal fpga writed 0x2810 0x075c0035
hal fpga writed 0x2810 0x7fc7078e
hal fpga writed 0x2810 0x783f7fc4
hal fpga writed 0x2810 0x003e780d
hal fpga writed 0x2810 0x08250041
hal fpga writed 0x2810 0x7fba0857
hal fpga writed 0x2810 0x77767fb7
hal fpga writed 0x2810 0x004b7744
hal fpga writed 0x2810 0x08ed004f
hal fpga writed 0x2810 0x7fad091f
hal fpga writed 0x2810 0x76ae7fa9
hal fpga writed 0x2810 0x005a767b
hal fpga writed 0x2810 0x09b6005d
hal fpga writed 0x2810 0x7f9e09e8
hal fpga writed 0x2810 0x75e57f9a
hal fpga writed 0x2810 0x006975b3
hal fpga writed 0x2810 0x0a7e006d
hal fpga writed 0x2810 0x7f8e0ab0
hal fpga writed 0x2810 0x751d7f89
hal fpga writed 0x2810 0x007a74eb
hal fpga writed 0x2810 0x0b47007e
hal fpga writed 0x2810 0x7f7c0b79
hal fpga writed 0x2810 0x74547f78
hal fpga writed 0x2810 0x008c7422
hal fpga writed 0x2810 0x0c0f0091
hal fpga writed 0x2810 0x7f6a0c41
hal fpga writed 0x2810 0x738c7f65
hal fpga writed 0x2810 0x009f735a
hal fpga writed 0x2810 0x0cd700a4
hal fpga writed 0x2810 0x7f560d09
hal fpga writed 0x2810 0x72c47f50
hal fpga writed 0x2810 0x00b47292
hal fpga writed 0x2810 0x0d9f00b9
hal fpga writed 0x2810 0x7f410dd1
hal fpga writed 0x2810 0x71fc7f3b
hal fpga writed 0x2810 0x00c971ca
hal fpga writed 0x2810 0x0e6700cf
hal fpga writed 0x2810 0x7f2a0e99
hal fpga writed 0x2810 0x71347f24
hal fpga writed 0x2810 0x00e07103
hal fpga writed 0x2810 0x0f2e00e6
hal fpga writed 0x2810 0x7f130f60
hal fpga writed 0x2810 0x706d7f0d
hal fpga writed 0x2810 0x00f9703b
hal fpga writed 0x2810 0x0ff600ff
hal fpga writed 0x2810 0x7efa1028
hal fpga writed 0x2810 0x6fa57ef4
hal fpga writed 0x2810 0x01126f73
hal fpga writed 0x2810 0x10bd0118
hal fpga writed 0x2810 0x7ee010ef
hal fpga writed 0x2810 0x6ede7ed9
hal fpga writed 0x2810 0x012c6eac
hal fpga writed 0x2810 0x11850133
hal fpga writed 0x2810 0x7ec511b6
hal fpga writed 0x2810 0x6e177ebe
hal fpga writed 0x2810 0x01486de5
hal fpga writed 0x2810 0x124c014f
hal fpga writed 0x2810 0x7ea8127d
hal fpga writed 0x2810 0x6d507ea1
hal fpga writed 0x2810 0x01656d1e
hal fpga writed 0x2810 0x1313016d
hal fpga writed 0x2810 0x7e8b1344
hal fpga writed 0x2810 0x6c897e83
hal fpga writed 0x2810 0x01846c57
hal fpga writed 0x2810 0x13d9018b
hal fpga writed 0x2810 0x7e6c140b
hal fpga writed 0x2810 0x6bc27e64
hal fpga writed 0x2810 0x01a36b91
hal fpga writed 0x2810 0x14a001ab
hal fpga writed 0x2810 0x7e4c14d1
hal fpga writed 0x2810 0x6afc7e43
hal fpga writed 0x2810 0x01c46aca
hal fpga writed 0x2810 0x156601cc
hal fpga writed 0x2810 0x7e2a1598
hal fpga writed 0x2810 0x6a367e22
hal fpga writed 0x2810 0x01e66a04
hal fpga writed 0x2810 0x162c01ee
hal fpga writed 0x2810 0x7e08165e
hal fpga writed 0x2810 0x69707dff
hal fpga writed 0x2810 0x0209693e
hal fpga writed 0x2810 0x16f20212
hal fpga writed 0x2810 0x7de41724
hal fpga writed 0x2810 0x68aa7ddb
hal fpga writed 0x2810 0x022d6878
hal fpga writed 0x2810 0x17b80236
hal fpga writed 0x2810 0x7dbf17e9
hal fpga writed 0x2810 0x67e47db6
hal fpga writed 0x2810 0x025367b3
hal fpga writed 0x2810 0x187d025c
hal fpga writed 0x2810 0x7d9918af
hal fpga writed 0x2810 0x671f7d8f
hal fpga writed 0x2810 0x027a66ee
hal fpga writed 0x2810 0x19430283
hal fpga writed 0x2810 0x7d721974
hal fpga writed 0x2810 0x665a7d68
hal fpga writed 0x2810 0x02a26629
hal fpga writed 0x2810 0x1a0802ac
hal fpga writed 0x2810 0x7d491a39
hal fpga writed 0x2810 0x65957d3f
hal fpga writed 0x2810 0x02cb6564
hal fpga writed 0x2810 0x1acc02d5
hal fpga writed 0x2810 0x7d1f1afe
hal fpga writed 0x2810 0x64d07d15
hal fpga writed 0x2810 0x02f5649f
hal fpga writed 0x2810 0x1b910300
hal fpga writed 0x2810 0x7cf41bc2
hal fpga writed 0x2810 0x640c7ce9
hal fpga writed 0x2810 0x032163db
hal fpga writed 0x2810 0x1c55032c
hal fpga writed 0x2810 0x7cc81c86
hal fpga writed 0x2810 0x63487cbd
hal fpga writed 0x2810 0x034e6317
hal fpga writed 0x2810 0x1d190359
hal fpga writed 0x2810 0x7c9b1d4a
hal fpga writed 0x2810 0x62847c8f
hal fpga writed 0x2810 0x037c6253
hal fpga writed 0x2810 0x1ddd0387
hal fpga writed 0x2810 0x7c6c1e0e
hal fpga writed 0x2810 0x61c17c60
hal fpga writed 0x2810 0x03ab6190
hal fpga writed 0x2810 0x1ea003b7
hal fpga writed 0x2810 0x7c3c1ed1
hal fpga writed 0x2810 0x60fd7c30
hal fpga writed 0x2810 0x03db60cd
hal fpga writed 0x2810 0x1f6303e7
hal fpga writed 0x2810 0x7c0b1f94
hal fpga writed 0x2810 0x603a7bff
hal fpga writed 0x2810 0x040d600a
hal fpga writed 0x2810 0x20260419
hal fpga writed 0x2810 0x7bd92057
hal fpga writed 0x2810 0x5f787bcc
hal fpga writed 0x2810 0x04405f47
hal fpga writed 0x2810 0x20e8044c
hal fpga writed 0x2810 0x7ba62119
hal fpga writed 0x2810 0x5eb67b99
hal fpga writed 0x2810 0x04745e85
hal fpga writed 0x2810 0x21aa0481
hal fpga writed 0x2810 0x7b7121db
hal fpga writed 0x2810 0x5df47b64
hal fpga writed 0x2810 0x04a95dc3
hal fpga writed 0x2810 0x226c04b6
hal fpga writed 0x2810 0x7b3b229d
hal fpga writed 0x2810 0x5d327b2e
hal fpga writed 0x2810 0x04df5d02
hal fpga writed 0x2810 0x232e04ed
hal fpga writed 0x2810 0x7b04235e
hal fpga writed 0x2810 0x5c717af6
hal fpga writed 0x2810 0x05175c40
hal fpga writed 0x2810 0x23ef0525
hal fpga writed 0x2810 0x7acc241f
hal fpga writed 0x2810 0x5bb07abe
hal fpga writed 0x2810 0x054f5b7f
hal fpga writed 0x2810 0x24b0055e
hal fpga writed 0x2810 0x7a9324e0
hal fpga writed 0x2810 0x5aef7a84
hal fpga writed 0x2810 0x05895abf
hal fpga writed 0x2810 0x25700598
hal fpga writed 0x2810 0x7a5825a0
hal fpga writed 0x2810 0x5a2f7a49
hal fpga writed 0x2810 0x05c459ff
hal fpga writed 0x2810 0x263005d3
hal fpga writed 0x2810 0x7a1d2660
hal fpga writed 0x2810 0x596f7a0e
hal fpga writed 0x2810 0x0601593f
hal fpga writed 0x2810 0x26f00610
hal fpga writed 0x2810 0x79e02720
hal fpga writed 0x2810 0x58af79d0
hal fpga writed 0x2810 0x063e587f
hal fpga writed 0x2810 0x27af064e
hal fpga writed 0x2810 0x79a227df
hal fpga writed 0x2810 0x57f07992
hal fpga writed 0x2810 0x067d57c0
hal fpga writed 0x2810 0x286e068d
hal fpga writed 0x2810 0x7962289e
hal fpga writed 0x2810 0x57317953
hal fpga writed 0x2810 0x06bd5702
hal fpga writed 0x2810 0x292d06cd
hal fpga writed 0x2810 0x7922295c
hal fpga writed 0x2810 0x56737912
hal fpga writed 0x2810 0x06fe5643
hal fpga writed 0x2810 0x29eb070e
hal fpga writed 0x2810 0x78e12a1b
hal fpga writed 0x2810 0x55b578d0
hal fpga writed 0x2810 0x07405586
hal fpga writed 0x2810 0x2aa90750
hal fpga writed 0x2810 0x789e2ad8
hal fpga writed 0x2810 0x54f7788d
hal fpga writed 0x2810 0x078354c8
hal fpga writed 0x2810 0x2b660794
hal fpga writed 0x2810 0x785a2b95
hal fpga writed 0x2810 0x543a7849
hal fpga writed 0x2810 0x07c7540b
hal fpga writed 0x2810 0x2c2307d9
hal fpga writed 0x2810 0x78152c52
hal fpga writed 0x2810 0x537e7803
hal fpga writed 0x2810 0x080d534e
hal fpga writed 0x2810 0x2ce0081f
hal fpga writed 0x2810 0x77cf2d0f
hal fpga writed 0x2810 0x52c177bd
hal fpga writed 0x2810 0x08545292
hal fpga writed 0x2810 0x2d9c0866
hal fpga writed 0x2810 0x77872dcb
hal fpga writed 0x2810 0x52057775
hal fpga writed 0x2810 0x089c51d7
hal fpga writed 0x2810 0x2e5708ae
hal fpga writed 0x2810 0x773f2e86
hal fpga writed 0x2810 0x514a772d
hal fpga writed 0x2810 0x08e5511b
hal fpga writed 0x2810 0x2f1308f7
hal fpga writed 0x2810 0x76f52f41
hal fpga writed 0x2810 0x508f76e3
hal fpga writed 0x2810 0x092f5060
hal fpga writed 0x2810 0x2fcd0942
hal fpga writed 0x2810 0x76aa2ffc
hal fpga writed 0x2810 0x4fd57698
hal fpga writed 0x2810 0x097a4fa6
hal fpga writed 0x2810 0x3088098d
hal fpga writed 0x2810 0x765e30b6
hal fpga writed 0x2810 0x4f1a764b
hal fpga writed 0x2810 0x09c74eec
hal fpga writed 0x2810 0x314109da
hal fpga writed 0x2810 0x76113170
hal fpga writed 0x2810 0x4e6175fe
hal fpga writed 0x2810 0x0a154e33
hal fpga writed 0x2810 0x31fb0a28
hal fpga writed 0x2810 0x75c33229
hal fpga writed 0x2810 0x4da875af
hal fpga writed 0x2810 0x0a634d7a
hal fpga writed 0x2810 0x32b40a77
hal fpga writed 0x2810 0x757432e2
hal fpga writed 0x2810 0x4cef7560
hal fpga writed 0x2810 0x0ab34cc1
hal fpga writed 0x2810 0x336c0ac7
hal fpga writed 0x2810 0x7523339a
hal fpga writed 0x2810 0x4c37750f
hal fpga writed 0x2810 0x0b044c09
hal fpga writed 0x2810 0x34240b19
hal fpga writed 0x2810 0x74d23452
hal fpga writed 0x2810 0x4b7f74bd
hal fpga writed 0x2810 0x0b574b52
hal fpga writed 0x2810 0x34db0b6b
hal fpga writed 0x2810 0x747f3509
hal fpga writed 0x2810 0x4ac8746a
hal fpga writed 0x2810 0x0baa4a9b
hal fpga writed 0x2810 0x35920bbf
hal fpga writed 0x2810 0x742b35c0
hal fpga writed 0x2810 0x4a127416
hal fpga writed 0x2810 0x0bfe49e4
hal fpga writed 0x2810 0x36480c14
hal fpga writed 0x2810 0x73d63676
hal fpga writed 0x2810 0x495c73c1
hal fpga writed 0x2810 0x0c54492e
hal fpga writed 0x2810 0x36fe0c69
hal fpga writed 0x2810 0x7380372c
hal fpga writed 0x2810 0x48a6736a
hal fpga writed 0x2810 0x0caa4879
hal fpga writed 0x2810 0x37b40cc0
hal fpga writed 0x2810 0x732937e1
hal fpga writed 0x2810 0x47f17313
hal fpga writed 0x2810 0x0d0247c4
hal fpga writed 0x2810 0x38680d18
hal fpga writed 0x2810 0x72d03895
hal fpga writed 0x2810 0x473d72ba
hal fpga writed 0x2810 0x0d5b470f
hal fpga writed 0x2810 0x391d0d72
hal fpga writed 0x2810 0x72773949
hal fpga writed 0x2810 0x46897260
hal fpga writed 0x2810 0x0db5465c
hal fpga writed 0x2810 0x39d00dcc
hal fpga writed 0x2810 0x721c39fd
hal fpga writed 0x2810 0x45d57206
hal fpga writed 0x2810 0x0e1045a8
hal fpga writed 0x2810 0x3a830e27
hal fpga writed 0x2810 0x71c13ab0
hal fpga writed 0x2810 0x452271aa
hal fpga writed 0x2810 0x0e6c44f6
hal fpga writed 0x2810 0x3b360e84
hal fpga writed 0x2810 0x71643b62
hal fpga writed 0x2810 0x4470714d
hal fpga writed 0x2810 0x0eca4444
hal fpga writed 0x2810 0x3be80ee1
hal fpga writed 0x2810 0x71063c14
hal fpga writed 0x2810 0x43be70ef
hal fpga writed 0x2810 0x0f284392
hal fpga writed 0x2810 0x3c990f40
hal fpga writed 0x2810 0x70a73cc5
hal fpga writed 0x2810 0x430d708f
hal fpga writed 0x2810 0x0f8842e1
hal fpga writed 0x2810 0x3d4a0fa0
hal fpga writed 0x2810 0x70473d76
hal fpga writed 0x2810 0x425d702f
hal fpga writed 0x2810 0x0fe84231
hal fpga writed 0x2810 0x3dfa1000
hal fpga writed 0x2810 0x6fe63e26
hal fpga writed 0x2810 0x41ad6fce
hal fpga writed 0x2810 0x104a4181
hal fpga writed 0x2810 0x3eaa1062
hal fpga writed 0x2810 0x6f843ed6
hal fpga writed 0x2810 0x40fe6f6b
hal fpga writed 0x2810 0x10ac40d2
hal fpga writed 0x2810 0x3f5910c5
hal fpga writed 0x2810 0x6f213f85
hal fpga writed 0x2810 0x404f6f08
hal fpga writed 0x2810 0x11104023
hal fpga writed 0x2810 0x40071129
hal fpga writed 0x2810 0x6ebd4033
hal fpga writed 0x2810 0x3fa16ea3
hal fpga writed 0x2810 0x11753f75
hal fpga writed 0x2810 0x40b5118e
hal fpga writed 0x2810 0x6e5740e0
hal fpga writed 0x2810 0x3ef36e3e
hal fpga writed 0x2810 0x11db3ec8
hal fpga writed 0x2810 0x416211f5
hal fpga writed 0x2810 0x6df1418d
hal fpga writed 0x2810 0x3e466dd7
hal fpga writed 0x2810 0x12423e1b
hal fpga writed 0x2810 0x420f125c
hal fpga writed 0x2810 0x6d89423a
hal fpga writed 0x2810 0x3d9a6d6f
hal fpga writed 0x2810 0x12aa3d6f
hal fpga writed 0x2810 0x42bb12c4
hal fpga writed 0x2810 0x6d2142e6
hal fpga writed 0x2810 0x3cef6d06
hal fpga writed 0x2810 0x13133cc4
hal fpga writed 0x2810 0x4366132d
hal fpga writed 0x2810 0x6cb74391
hal fpga writed 0x2810 0x3c446c9d
hal fpga writed 0x2810 0x137d3c19
hal fpga writed 0x2810 0x44111398
hal fpga writed 0x2810 0x6c4c443b
hal fpga writed 0x2810 0x3b996c32
hal fpga writed 0x2810 0x13e83b6f
hal fpga writed 0x2810 0x44ba1403
hal fpga writed 0x2810 0x6be144e5
hal fpga writed 0x2810 0x3af06bc6
hal fpga writed 0x2810 0x14553ac6
hal fpga writed 0x2810 0x45641470
hal fpga writed 0x2810 0x6b74458e
hal fpga writed 0x2810 0x3a476b59
hal fpga writed 0x2810 0x14c23a1d
hal fpga writed 0x2810 0x460c14dd
hal fpga writed 0x2810 0x6b064636
hal fpga writed 0x2810 0x399f6aeb
hal fpga writed 0x2810 0x15303975
hal fpga writed 0x2810 0x46b4154c
hal fpga writed 0x2810 0x6a9746de
hal fpga writed 0x2810 0x38f76a7c
hal fpga writed 0x2810 0x159f38cd
hal fpga writed 0x2810 0x475c15bb
hal fpga writed 0x2810 0x6a284785
hal fpga writed 0x2810 0x38506a0b
hal fpga writed 0x2810 0x16103826
hal fpga writed 0x2810 0x4802162c
hal fpga writed 0x2810 0x69b7482c
hal fpga writed 0x2810 0x37aa699a
hal fpga writed 0x2810 0x16813780
hal fpga writed 0x2810 0x48a8169e
hal fpga writed 0x2810 0x694548d1
hal fpga writed 0x2810 0x37046928
hal fpga writed 0x2810 0x16f336db
hal fpga writed 0x2810 0x494d1710
hal fpga writed 0x2810 0x68d24976
hal fpga writed 0x2810 0x365f68b5
hal fpga writed 0x2810 0x17673636
hal fpga writed 0x2810 0x49f21784
hal fpga writed 0x2810 0x685e4a1b
hal fpga writed 0x2810 0x35bb6841
hal fpga writed 0x2810 0x17db3592
hal fpga writed 0x2810 0x4a9517f9
hal fpga writed 0x2810 0x67e94abe
hal fpga writed 0x2810 0x351867cc
hal fpga writed 0x2810 0x185134ef
hal fpga writed 0x2810 0x4b38186e
hal fpga writed 0x2810 0x67734b61
hal fpga writed 0x2810 0x34756756
hal fpga writed 0x2810 0x18c7344d
hal fpga writed 0x2810 0x4bdb18e5
hal fpga writed 0x2810 0x66fc4c03
hal fpga writed 0x2810 0x33d366de
hal fpga writed 0x2810 0x193e33ab
hal fpga writed 0x2810 0x4c7c195c
hal fpga writed 0x2810 0x66844ca5
hal fpga writed 0x2810 0x33326666
hal fpga writed 0x2810 0x19b7330a
hal fpga writed 0x2810 0x4d1d19d5
hal fpga writed 0x2810 0x660c4d45
hal fpga writed 0x2810 0x329265ed
hal fpga writed 0x2810 0x1a30326a
hal fpga writed 0x2810 0x4dbd1a4f
hal fpga writed 0x2810 0x65924de5
hal fpga writed 0x2810 0x31f26573
hal fpga writed 0x2810 0x1aab31ca
hal fpga writed 0x2810 0x4e5d1ac9
hal fpga writed 0x2810 0x65174e84
hal fpga writed 0x2810 0x315364f8
hal fpga writed 0x2810 0x1b26312b
hal fpga writed 0x2810 0x4efb1b45
hal fpga writed 0x2810 0x649b4f23
hal fpga writed 0x2810 0x30b5647c
hal fpga writed 0x2810 0x1ba2308d
hal fpga writed 0x2810 0x4f991bc1
hal fpga writed 0x2810 0x641e4fc0
hal fpga writed 0x2810 0x301763ff
hal fpga writed 0x2810 0x1c202ff0
hal fpga writed 0x2810 0x50361c3f
hal fpga writed 0x2810 0x63a0505d
hal fpga writed 0x2810 0x2f7b6381
hal fpga writed 0x2810 0x1c9e2f53
hal fpga writed 0x2810 0x50d31cbd
hal fpga writed 0x2810 0x632250f9
hal fpga writed 0x2810 0x2edf6302
hal fpga writed 0x2810 0x1d1d2eb8
hal fpga writed 0x2810 0x516e1d3d
hal fpga writed 0x2810 0x62a25195
hal fpga writed 0x2810 0x2e446282
hal fpga writed 0x2810 0x1d9d2e1d
hal fpga writed 0x2810 0x52091dbd
hal fpga writed 0x2810 0x6221522f
hal fpga writed 0x2810 0x2da96201
hal fpga writed 0x2810 0x1e1e2d83
hal fpga writed 0x2810 0x52a31e3f
hal fpga writed 0x2810 0x61a052c9
hal fpga writed 0x2810 0x2d10617f
hal fpga writed 0x2810 0x1ea02ce9
hal fpga writed 0x2810 0x533c1ec1
hal fpga writed 0x2810 0x611d5362
hal fpga writed 0x2810 0x2c7760fd
hal fpga writed 0x2810 0x1f232c51
hal fpga writed 0x2810 0x53d41f44
hal fpga writed 0x2810 0x609a53fa
hal fpga writed 0x2810 0x2bdf6079
hal fpga writed 0x2810 0x1fa72bb9
hal fpga writed 0x2810 0x546c1fc8
hal fpga writed 0x2810 0x60165491
hal fpga writed 0x2810 0x2b485ff4
hal fpga writed 0x2810 0x202c2b22
hal fpga writed 0x2810 0x5502204d
hal fpga writed 0x2810 0x5f905528
hal fpga writed 0x2810 0x2ab15f6f
hal fpga writed 0x2810 0x20b22a8c
hal fpga writed 0x2810 0x559820d3
hal fpga writed 0x2810 0x5f0a55be
hal fpga writed 0x2810 0x2a1c5ee8
hal fpga writed 0x2810 0x213829f7
hal fpga writed 0x2810 0x562d215a
hal fpga writed 0x2810 0x5e835653
hal fpga writed 0x2810 0x29875e61
hal fpga writed 0x2810 0x21c02962
hal fpga writed 0x2810 0x56c221e2
hal fpga writed 0x2810 0x5dfb56e7
hal fpga writed 0x2810 0x28f35dd9
hal fpga writed 0x2810 0x224828cf
hal fpga writed 0x2810 0x5755226b
hal fpga writed 0x2810 0x5d72577a
hal fpga writed 0x2810 0x28605d50
hal fpga writed 0x2810 0x22d2283c
hal fpga writed 0x2810 0x57e822f4
hal fpga writed 0x2810 0x5ce8580c
hal fpga writed 0x2810 0x27ce5cc5
hal fpga writed 0x2810 0x235c27aa
hal fpga writed 0x2810 0x5879237f
hal fpga writed 0x2810 0x5c5d589e
hal fpga writed 0x2810 0x273d5c3a
hal fpga writed 0x2810 0x23e72719
hal fpga writed 0x2810 0x590a240a
hal fpga writed 0x2810 0x5bd2592e
hal fpga writed 0x2810 0x26ad5baf
hal fpga writed 0x2810 0x24732689
hal fpga writed 0x2810 0x599a2497
hal fpga writed 0x2810 0x5b4559be
hal fpga writed 0x2810 0x261d5b22
hal fpga writed 0x2810 0x250025f9
hal fpga writed 0x2810 0x5a292524
hal fpga writed 0x2810 0x5ab85a4d
hal fpga writed 0x2810 0x258e5a94
hal fpga writed 0x280c 0x100
hal fpga writed 0x2818 0x1
hal fpga writed 0x281c 0x5a71256b
hal fpga writed 0x281c 0x254725b2
hal fpga writed 0x281c 0x25d65adb
hal fpga writed 0x281c 0x5aff5a06
hal fpga writed 0x281c 0x59e224dd
hal fpga writed 0x281c 0x24ba2641
hal fpga writed 0x281c 0x26655b68
hal fpga writed 0x281c 0x5b8c5976
hal fpga writed 0x281c 0x59522450
hal fpga writed 0x281c 0x242d26d1
hal fpga writed 0x281c 0x26f55bf5
hal fpga writed 0x281c 0x5c1858e6
hal fpga writed 0x281c 0x58c223c5
hal fpga writed 0x281c 0x23a22761
hal fpga writed 0x281c 0x27865c80
hal fpga writed 0x281c 0x5ca35855
hal fpga writed 0x281c 0x5831233a
hal fpga writed 0x281c 0x231727f3
hal fpga writed 0x281c 0x28175d0b
hal fpga writed 0x281c 0x5d2d57c3
hal fpga writed 0x281c 0x579f22af
hal fpga writed 0x281c 0x228d2885
hal fpga writed 0x281c 0x28aa5d94
hal fpga writed 0x281c 0x5db75730
hal fpga writed 0x281c 0x570c2226
hal fpga writed 0x281c 0x22042918
hal fpga writed 0x281c 0x293d5e1d
hal fpga writed 0x281c 0x5e3f569d
hal fpga writed 0x281c 0x5678219e
hal fpga writed 0x281c 0x217c29ac
hal fpga writed 0x281c 0x29d25ea5
hal fpga writed 0x281c 0x5ec75608
hal fpga writed 0x281c 0x55e32117
hal fpga writed 0x281c 0x20f52a41
hal fpga writed 0x281c 0x2a675f2c
hal fpga writed 0x281c 0x5f4d5573
hal fpga writed 0x281c 0x554e2090
hal fpga writed 0x281c 0x206f2ad7
hal fpga writed 0x281c 0x2afd5fb2
hal fpga writed 0x281c 0x5fd354dd
hal fpga writed 0x281c 0x54b7200b
hal fpga writed 0x281c 0x1fe92b6e
hal fpga writed 0x281c 0x2b936037
hal fpga writed 0x281c 0x60585446
hal fpga writed 0x281c 0x54201f86
hal fpga writed 0x281c 0x1f652c05
hal fpga writed 0x281c 0x2c2b60bb
hal fpga writed 0x281c 0x60dc53ae
hal fpga writed 0x281c 0x53881f02
hal fpga writed 0x281c 0x1ee22c9d
hal fpga writed 0x281c 0x2cc3613e
hal fpga writed 0x281c 0x615f5316
hal fpga writed 0x281c 0x52ef1e80
hal fpga writed 0x281c 0x1e5f2d36
hal fpga writed 0x281c 0x2d5c61c0
hal fpga writed 0x281c 0x61e1527c
hal fpga writed 0x281c 0x52561dfe
hal fpga writed 0x281c 0x1dde2dd0
hal fpga writed 0x281c 0x2df66242
hal fpga writed 0x281c 0x626251e2
hal fpga writed 0x281c 0x51bb1d7d
hal fpga writed 0x281c 0x1d5d2e6a
hal fpga writed 0x281c 0x2e9162c2
hal fpga writed 0x281c 0x62e25147
hal fpga writed 0x281c 0x51201cfd
hal fpga writed 0x281c 0x1cdd2f06
hal fpga writed 0x281c 0x2f2c6342
hal fpga writed 0x281c 0x636150ac
hal fpga writed 0x281c 0x50841c7e
hal fpga writed 0x281c 0x1c5f2fa2
hal fpga writed 0x281c 0x2fc963c0
hal fpga writed 0x281c 0x63df500f
hal fpga writed 0x281c 0x4fe81c00
hal fpga writed 0x281c 0x1be1303f
hal fpga writed 0x281c 0x3066643e
hal fpga writed 0x281c 0x645d4f72
hal fpga writed 0x281c 0x4f4a1b83
hal fpga writed 0x281c 0x1b6430dc
hal fpga writed 0x281c 0x310464ba
hal fpga writed 0x281c 0x64d94ed4
hal fpga writed 0x281c 0x4eac1b07
hal fpga writed 0x281c 0x1ae8317b
hal fpga writed 0x281c 0x31a26536
hal fpga writed 0x281c 0x65544e35
hal fpga writed 0x281c 0x4e0d1a8c
hal fpga writed 0x281c 0x1a6d321a
hal fpga writed 0x281c 0x324265b0
hal fpga writed 0x281c 0x65cf4d95
hal fpga writed 0x281c 0x4d6d1a12
hal fpga writed 0x281c 0x19f332ba
hal fpga writed 0x281c 0x32e2662a
hal fpga writed 0x281c 0x66484cf5
hal fpga writed 0x281c 0x4ccd1999
hal fpga writed 0x281c 0x197b335a
hal fpga writed 0x281c 0x338366a3
hal fpga writed 0x281c 0x66c14c54
hal fpga writed 0x281c 0x4c2c1921
hal fpga writed 0x281c 0x190333fc
hal fpga writed 0x281c 0x3424671a
hal fpga writed 0x281c 0x67384bb2
hal fpga writed 0x281c 0x4b8a18a9
hal fpga writed 0x281c 0x188c349e
hal fpga writed 0x281c 0x34c76791
hal fpga writed 0x281c 0x67ae4b10
hal fpga writed 0x281c 0x4ae71833
hal fpga writed 0x281c 0x18163541
hal fpga writed 0x281c 0x356a6806
hal fpga writed 0x281c 0x68244a6d
hal fpga writed 0x281c 0x4a4417be
hal fpga writed 0x281c 0x17a135e4
hal fpga writed 0x281c 0x360d687b
hal fpga writed 0x281c 0x689849c9
hal fpga writed 0x281c 0x49a0174a
hal fpga writed 0x281c 0x172d3689
hal fpga writed 0x281c 0x36b268ef
hal fpga writed 0x281c 0x690c4924
hal fpga writed 0x281c 0x48fb16d7
hal fpga writed 0x281c 0x16ba372e
hal fpga writed 0x281c 0x37576961
hal fpga writed 0x281c 0x697e487f
hal fpga writed 0x281c 0x48551665
hal fpga writed 0x281c 0x164837d3
hal fpga writed 0x281c 0x37fd69d3
hal fpga writed 0x281c 0x69ef47d9
hal fpga writed 0x281c 0x47af15f4
hal fpga writed 0x281c 0x15d7387a
hal fpga writed 0x281c 0x38a36a44
hal fpga writed 0x281c 0x6a604732
hal fpga writed 0x281c 0x47081583
hal fpga writed 0x281c 0x15683921
hal fpga writed 0x281c 0x394b6ab3
hal fpga writed 0x281c 0x6acf468a
hal fpga writed 0x281c 0x46601514
hal fpga writed 0x281c 0x14f939c9
hal fpga writed 0x281c 0x39f36b22
hal fpga writed 0x281c 0x6b3d45e2
hal fpga writed 0x281c 0x45b814a6
hal fpga writed 0x281c 0x148b3a71
hal fpga writed 0x281c 0x3a9b6b8f
hal fpga writed 0x281c 0x6baa4539
hal fpga writed 0x281c 0x450f1439
hal fpga writed 0x281c 0x141e3b1a
hal fpga writed 0x281c 0x3b456bfc
hal fpga writed 0x281c 0x6c174490
hal fpga writed 0x281c 0x446613cd
hal fpga writed 0x281c 0x13b33bc4
hal fpga writed 0x281c 0x3bee6c67
hal fpga writed 0x281c 0x6c8243e6
hal fpga writed 0x281c 0x43bb1362
hal fpga writed 0x281c 0x13483c6e
hal fpga writed 0x281c 0x3c996cd2
hal fpga writed 0x281c 0x6cec433b
hal fpga writed 0x281c 0x431012f9
hal fpga writed 0x281c 0x12de3d19
hal fpga writed 0x281c 0x3d446d3b
hal fpga writed 0x281c 0x6d554290
hal fpga writed 0x281c 0x42651290
hal fpga writed 0x281c 0x12763dc5
hal fpga writed 0x281c 0x3df06da3
hal fpga writed 0x281c 0x6dbd41e4
hal fpga writed 0x281c 0x41b91228
hal fpga writed 0x281c 0x120e3e72
hal fpga writed 0x281c 0x3e9d6e0a
hal fpga writed 0x281c 0x6e244137
hal fpga writed 0x281c 0x410c11c1
hal fpga writed 0x281c 0x11a83f1f
hal fpga writed 0x281c 0x3f4a6e71
hal fpga writed 0x281c 0x6e8a408a
hal fpga writed 0x281c 0x405e115c
hal fpga writed 0x281c 0x11423fcc
hal fpga writed 0x281c 0x3ff86ed6
hal fpga writed 0x281c 0x6eef3fdc
hal fpga writed 0x281c 0x3fb010f7
hal fpga writed 0x281c 0x10de407a
hal fpga writed 0x281c 0x40a66f3a
hal fpga writed 0x281c 0x6f533f2d
hal fpga writed 0x281c 0x3f011094
hal fpga writed 0x281c 0x107b4129
hal fpga writed 0x281c 0x41556f9d
hal fpga writed 0x281c 0x6fb53e7e
hal fpga writed 0x281c 0x3e521031
hal fpga writed 0x281c 0x101941d9
hal fpga writed 0x281c 0x42056fff
hal fpga writed 0x281c 0x70173dce
hal fpga writed 0x281c 0x3da20fd0
hal fpga writed 0x281c 0x0fb84289
hal fpga writed 0x281c 0x42b5705f
hal fpga writed 0x281c 0x70773d1e
hal fpga writed 0x281c 0x3cf20f70
hal fpga writed 0x281c 0x0f58433a
hal fpga writed 0x281c 0x436670bf
hal fpga writed 0x281c 0x70d73c6d
hal fpga writed 0x281c 0x3c410f10
hal fpga writed 0x281c 0x0ef943eb
hal fpga writed 0x281c 0x4417711e
hal fpga writed 0x281c 0x71353bbb
hal fpga writed 0x281c 0x3b8f0eb2
hal fpga writed 0x281c 0x0e9b449d
hal fpga writed 0x281c 0x44c9717b
hal fpga writed 0x281c 0x71933b09
hal fpga writed 0x281c 0x3add0e55
hal fpga writed 0x281c 0x0e3e454f
hal fpga writed 0x281c 0x457c71d8
hal fpga writed 0x281c 0x71ef3a57
hal fpga writed 0x281c 0x3a2a0df9
hal fpga writed 0x281c 0x0de34602
hal fpga writed 0x281c 0x462f7233
hal fpga writed 0x281c 0x724a39a3
hal fpga writed 0x281c 0x39760d9f
hal fpga writed 0x281c 0x0d8846b6
hal fpga writed 0x281c 0x46e2728d
hal fpga writed 0x281c 0x72a438f0
hal fpga writed 0x281c 0x38c20d45
hal fpga writed 0x281c 0x0d2f476a
hal fpga writed 0x281c 0x479772e7
hal fpga writed 0x281c 0x72fd383b
hal fpga writed 0x281c 0x380e0cec
hal fpga writed 0x281c 0x0cd6481e
hal fpga writed 0x281c 0x484b733f
hal fpga writed 0x281c 0x73553786
hal fpga writed 0x281c 0x37590c95
hal fpga writed 0x281c 0x0c7f48d3
hal fpga writed 0x281c 0x49017396
hal fpga writed 0x281c 0x73ab36d1
hal fpga writed 0x281c 0x36a30c3e
hal fpga writed 0x281c 0x0c294989
hal fpga writed 0x281c 0x49b773eb
hal fpga writed 0x281c 0x7401361b
hal fpga writed 0x281c 0x35ed0be9
hal fpga writed 0x281c 0x0bd44a3f
hal fpga writed 0x281c 0x4a6d7440
hal fpga writed 0x281c 0x74553564
hal fpga writed 0x281c 0x35370b95
hal fpga writed 0x281c 0x0b804af6
hal fpga writed 0x281c 0x4b247494
hal fpga writed 0x281c 0x74a834ad
hal fpga writed 0x281c 0x34800b42
hal fpga writed 0x281c 0x0b2d4bad
hal fpga writed 0x281c 0x4bdb74e6
hal fpga writed 0x281c 0x74fb33f6
hal fpga writed 0x281c 0x33c80af0
hal fpga writed 0x281c 0x0adc4c65
hal fpga writed 0x281c 0x4c937538
hal fpga writed 0x281c 0x754c333e
hal fpga writed 0x281c 0x33100a9f
hal fpga writed 0x281c 0x0a8b4d1d
hal fpga writed 0x281c 0x4d4b7588
hal fpga writed 0x281c 0x759c3285
hal fpga writed 0x281c 0x32570a50
hal fpga writed 0x281c 0x0a3c4dd6
hal fpga writed 0x281c 0x4e0475d7
hal fpga writed 0x281c 0x75ea31cc
hal fpga writed 0x281c 0x319e0a01
hal fpga writed 0x281c 0x09ee4e8f
hal fpga writed 0x281c 0x4ebe7625
hal fpga writed 0x281c 0x76383113
hal fpga writed 0x281c 0x30e509b4
hal fpga writed 0x281c 0x09a14f49
hal fpga writed 0x281c 0x4f777672
hal fpga writed 0x281c 0x76853059
hal fpga writed 0x281c 0x302a0967
hal fpga writed 0x281c 0x09555003
hal fpga writed 0x281c 0x503276bd
hal fpga writed 0x281c 0x76d02f9f
hal fpga writed 0x281c 0x2f70091c
hal fpga writed 0x281c 0x090a50be
hal fpga writed 0x281c 0x50ec7708
hal fpga writed 0x281c 0x771a2ee4
hal fpga writed 0x281c 0x2eb508d2
hal fpga writed 0x281c 0x08c05179
hal fpga writed 0x281c 0x51a87751
hal fpga writed 0x281c 0x77632e28
hal fpga writed 0x281c 0x2dfa088a
hal fpga writed 0x281c 0x08785234
hal fpga writed 0x281c 0x52637799
hal fpga writed 0x281c 0x77ab2d6d
hal fpga writed 0x281c 0x2d3e0842
hal fpga writed 0x281c 0x083052f0
hal fpga writed 0x281c 0x531f77e0
hal fpga writed 0x281c 0x77f22cb1
hal fpga writed 0x281c 0x2c8107fc
hal fpga writed 0x281c 0x07ea53ad
hal fpga writed 0x281c 0x53dc7826
hal fpga writed 0x281c 0x78382bf4
hal fpga writed 0x281c 0x2bc507b6
hal fpga writed 0x281c 0x07a5546a
hal fpga writed 0x281c 0x5499786b
hal fpga writed 0x281c 0x787c2b37
hal fpga writed 0x281c 0x2b080772
hal fpga writed 0x281c 0x07615527
hal fpga writed 0x281c 0x555678af
hal fpga writed 0x281c 0x78bf2a79
hal fpga writed 0x281c 0x2a4a072f
hal fpga writed 0x281c 0x071e55e4
hal fpga writed 0x281c 0x561478f1
hal fpga writed 0x281c 0x790129bc
hal fpga writed 0x281c 0x298c06ed
hal fpga writed 0x281c 0x06dd56a3
hal fpga writed 0x281c 0x56d27932
hal fpga writed 0x281c 0x794228fd
hal fpga writed 0x281c 0x28ce06ac
hal fpga writed 0x281c 0x069d5761
hal fpga writed 0x281c 0x57917972
hal fpga writed 0x281c 0x7982283f
hal fpga writed 0x281c 0x280f066d
hal fpga writed 0x281c 0x065d5820
hal fpga writed 0x281c 0x585079b1
hal fpga writed 0x281c 0x79c12780
hal fpga writed 0x281c 0x2750062f
hal fpga writed 0x281c 0x061f58df
hal fpga writed 0x281c 0x590f79ef
hal fpga writed 0x281c 0x79fe26c0
hal fpga writed 0x281c 0x269005f1
hal fpga writed 0x281c 0x05e2599f
hal fpga writed 0x281c 0x59cf7a2c
hal fpga writed 0x281c 0x7a3b2600
hal fpga writed 0x281c 0x25d005b6
hal fpga writed 0x281c 0x05a75a5f
hal fpga writed 0x281c 0x5a8f7a67
hal fpga writed 0x281c 0x7a762540
hal fpga writed 0x281c 0x2510057b
hal fpga writed 0x281c 0x056c5b1f
hal fpga writed 0x281c 0x5b4f7aa1
hal fpga writed 0x281c 0x7ab02480
hal fpga writed 0x281c 0x244f0541
hal fpga writed 0x281c 0x05335be0
hal fpga writed 0x281c 0x5c107ada
hal fpga writed 0x281c 0x7ae823bf
hal fpga writed 0x281c 0x238e0509
hal fpga writed 0x281c 0x04fb5ca1
hal fpga writed 0x281c 0x5cd17b12
hal fpga writed 0x281c 0x7b2022fd
hal fpga writed 0x281c 0x22cd04d1
hal fpga writed 0x281c 0x04c45d62
hal fpga writed 0x281c 0x5d937b49
hal fpga writed 0x281c 0x7b56223c
hal fpga writed 0x281c 0x220b049b
hal fpga writed 0x281c 0x048e5e24
hal fpga writed 0x281c 0x5e557b7e
hal fpga writed 0x281c 0x7b8b217a
hal fpga writed 0x281c 0x21490466
hal fpga writed 0x281c 0x04595ee6
hal fpga writed 0x281c 0x5f177bb3
hal fpga writed 0x281c 0x7bbf20b8
hal fpga writed 0x281c 0x20870433
hal fpga writed 0x281c 0x04265fa8
hal fpga writed 0x281c 0x5fd97be6
hal fpga writed 0x281c 0x7bf21ff5
hal fpga writed 0x281c 0x1fc50400
hal fpga writed 0x281c 0x03f4606b
hal fpga writed 0x281c 0x609c7c18
hal fpga writed 0x281c 0x7c241f32
hal fpga writed 0x281c 0x1f0203cf
hal fpga writed 0x281c 0x03c3612e
hal fpga writed 0x281c 0x615f7c48
hal fpga writed 0x281c 0x7c541e6f
hal fpga writed 0x281c 0x1e3e039f
hal fpga writed 0x281c 0x039361f1
hal fpga writed 0x281c 0x62227c78
hal fpga writed 0x281c 0x7c831dac
hal fpga writed 0x281c 0x1d7b0370
hal fpga writed 0x281c 0x036462b5
hal fpga writed 0x281c 0x62e67ca6
hal fpga writed 0x281c 0x7cb11ce8
hal fpga writed 0x281c 0x1cb70342
hal fpga writed 0x281c 0x03376379
hal fpga writed 0x281c 0x63aa7cd3
hal fpga writed 0x281c 0x7cde1c24
hal fpga writed 0x281c 0x1bf30316
hal fpga writed 0x281c 0x030b643d
hal fpga writed 0x281c 0x646e7cff
hal fpga writed 0x281c 0x7d0a1b60
hal fpga writed 0x281c 0x1b2f02ea
hal fpga writed 0x281c 0x02e06501
hal fpga writed 0x281c 0x65337d2a
hal fpga writed 0x281c 0x7d341a9b
hal fpga writed 0x281c 0x1a6a02c0
hal fpga writed 0x281c 0x02b665c6
hal fpga writed 0x281c 0x65f77d53
hal fpga writed 0x281c 0x7d5d19d6
hal fpga writed 0x281c 0x19a50297
hal fpga writed 0x281c 0x028d668b
hal fpga writed 0x281c 0x66bc7d7c
hal fpga writed 0x281c 0x7d851911
hal fpga writed 0x281c 0x18e00270
hal fpga writed 0x281c 0x02666750
hal fpga writed 0x281c 0x67827da3
hal fpga writed 0x281c 0x7dac184c
hal fpga writed 0x281c 0x181b0249
hal fpga writed 0x281c 0x02406816
hal fpga writed 0x281c 0x68477dc9
hal fpga writed 0x281c 0x7dd21787
hal fpga writed 0x281c 0x17550224
hal fpga writed 0x281c 0x021b68db
hal fpga writed 0x281c 0x690d7ded
hal fpga writed 0x281c 0x7df616c1
hal fpga writed 0x281c 0x168f0200
hal fpga writed 0x281c 0x01f769a1
hal fpga writed 0x281c 0x69d37e11
hal fpga writed 0x281c 0x7e1915fb
hal fpga writed 0x281c 0x15c901dd
hal fpga writed 0x281c 0x01d56a67
hal fpga writed 0x281c 0x6a997e33
hal fpga writed 0x281c 0x7e3b1535
hal fpga writed 0x281c 0x150301bc
hal fpga writed 0x281c 0x01b36b2e
hal fpga writed 0x281c 0x6b5f7e54
hal fpga writed 0x281c 0x7e5c146e
hal fpga writed 0x281c 0x143d019b
hal fpga writed 0x281c 0x01936bf4
hal fpga writed 0x281c 0x6c267e74
hal fpga writed 0x281c 0x7e7b13a8
hal fpga writed 0x281c 0x1376017c
hal fpga writed 0x281c 0x01746cbb
hal fpga writed 0x281c 0x6cec7e92
hal fpga writed 0x281c 0x7e9a12e1
hal fpga writed 0x281c 0x12af015e
hal fpga writed 0x281c 0x01576d82
hal fpga writed 0x281c 0x6db37eb0
hal fpga writed 0x281c 0x7eb7121a
hal fpga writed 0x281c 0x11e80141
hal fpga writed 0x281c 0x013a6e49
hal fpga writed 0x281c 0x6e7a7ecc
hal fpga writed 0x281c 0x7ed31153
hal fpga writed 0x281c 0x11210126
hal fpga writed 0x281c 0x011f6f10
hal fpga writed 0x281c 0x6f427ee7
hal fpga writed 0x281c 0x7eed108c
hal fpga writed 0x281c 0x105a010b
hal fpga writed 0x281c 0x01056fd7
hal fpga writed 0x281c 0x70097f00
hal fpga writed 0x281c 0x7f060fc4
hal fpga writed 0x281c 0x0f9200f2
hal fpga writed 0x281c 0x00ec709f
hal fpga writed 0x281c 0x70d17f19
hal fpga writed 0x281c 0x7f1f0efc
hal fpga writed 0x281c 0x0ecb00db
hal fpga writed 0x281c 0x00d57166
hal fpga writed 0x281c 0x71987f30
hal fpga writed 0x281c 0x7f360e35
hal fpga writed 0x281c 0x0e0300c4
hal fpga writed 0x281c 0x00be722e
hal fpga writed 0x281c 0x72607f46
hal fpga writed 0x281c 0x7f4b0d6d
hal fpga writed 0x281c 0x0d3b00af
hal fpga writed 0x281c 0x00a972f6
hal fpga writed 0x281c 0x73287f5b
hal fpga writed 0x281c 0x7f600ca5
hal fpga writed 0x281c 0x0c73009a
hal fpga writed 0x281c 0x009573be
hal fpga writed 0x281c 0x73f07f6e
hal fpga writed 0x281c 0x7f730bdd
hal fpga writed 0x281c 0x0bab0087
hal fpga writed 0x281c 0x00837486
hal fpga writed 0x281c 0x74b87f81
hal fpga writed 0x281c 0x7f850b14
hal fpga writed 0x281c 0x0ae20076
hal fpga writed 0x281c 0x0071754f
hal fpga writed 0x281c 0x75817f92
hal fpga writed 0x281c 0x7f960a4c
hal fpga writed 0x281c 0x0a1a0065
hal fpga writed 0x281c 0x00617617
hal fpga writed 0x281c 0x76497fa2
hal fpga writed 0x281c 0x7fa50984
hal fpga writed 0x281c 0x09510056
hal fpga writed 0x281c 0x005276e0
hal fpga writed 0x281c 0x77127fb0
hal fpga writed 0x281c 0x7fb408bb
hal fpga writed 0x281c 0x08890048
hal fpga writed 0x281c 0x004577a8
hal fpga writed 0x281c 0x77da7fbe
hal fpga writed 0x281c 0x7fc107f2
hal fpga writed 0x281c 0x07c0003b
hal fpga writed 0x281c 0x00387871
hal fpga writed 0x281c 0x78a37fca
hal fpga writed 0x281c 0x7fcd072a
hal fpga writed 0x281c 0x06f80030
hal fpga writed 0x281c 0x002d793a
hal fpga writed 0x281c 0x796c7fd5
hal fpga writed 0x281c 0x7fd70661
hal fpga writed 0x281c 0x062f0025
hal fpga writed 0x281c 0x00237a02
hal fpga writed 0x281c 0x7a357fde
hal fpga writed 0x281c 0x7fe10598
hal fpga writed 0x281c 0x0566001c
hal fpga writed 0x281c 0x001a7acb
hal fpga writed 0x281c 0x7afe7fe7
hal fpga writed 0x281c 0x7fe904cf
hal fpga writed 0x281c 0x049d0014
hal fpga writed 0x281c 0x00137b94
hal fpga writed 0x281c 0x7bc67fee
hal fpga writed 0x281c 0x7ff00406
hal fpga writed 0x281c 0x03d4000e
hal fpga writed 0x281c 0x000c7c5d
hal fpga writed 0x281c 0x7c8f7ff4
hal fpga writed 0x281c 0x7ff6033d
hal fpga writed 0x281c 0x030b0008
hal fpga writed 0x281c 0x00077d26
hal fpga writed 0x281c 0x7d587ff9
hal fpga writed 0x281c 0x7ffa0274
hal fpga writed 0x281c 0x02420004
hal fpga writed 0x281c 0x00037def
hal fpga writed 0x281c 0x7e217ffd
hal fpga writed 0x281c 0x7ffd01ab
hal fpga writed 0x281c 0x01790001
hal fpga writed 0x281c 0x00017eb8
hal fpga writed 0x281c 0x7eeb7fff
hal fpga writed 0x281c 0x7fff00e2
hal fpga writed 0x281c 0x00b0ffff
hal fpga writed 0x281c 0xffff7f81
hal fpga writed 0x281c 0x7fb47fff
hal fpga writed 0x281c 0x7fff0019
hal fpga writed 0x281c 0x7fe6ffff
hal fpga writed 0x281c 0xffff004b
hal fpga writed 0x281c 0x007e7fff
hal fpga writed 0x281c 0x7fff7f4f
hal fpga writed 0x281c 0x7f1d0000
hal fpga writed 0x281c 0x00000114
hal fpga writed 0x281c 0x01477ffe
hal fpga writed 0x281c 0x7ffe7e86
hal fpga writed 0x281c 0x7e540002
hal fpga writed 0x281c 0x000201de
hal fpga writed 0x281c 0x02107ffc
hal fpga writed 0x281c 0x7ffb7dbd
hal fpga writed 0x281c 0x7d8b0005
hal fpga writed 0x281c 0x000602a7
hal fpga writed 0x281c 0x02d97ff8
hal fpga writed 0x281c 0x7ff77cf4
hal fpga writed 0x281c 0x7cc20009
hal fpga writed 0x281c 0x000b0370
hal fpga writed 0x281c 0x03a27ff3
hal fpga writed 0x281c 0x7ff17c2b
hal fpga writed 0x281c 0x7bf9000f
hal fpga writed 0x281c 0x00110439
hal fpga writed 0x281c 0x046b7fec
hal fpga writed 0x281c 0x7feb7b62
hal fpga writed 0x281c 0x7b300016
hal fpga writed 0x281c 0x00180501
hal fpga writed 0x281c 0x05347fe5
hal fpga writed 0x281c 0x7fe37a99
hal fpga writed 0x281c 0x7a67001e
hal fpga writed 0x281c 0x002105ca
hal fpga writed 0x281c 0x05fd7fdc
hal fpga writed 0x281c 0x7fda79d0
hal fpga writed 0x281c 0x799e0028
hal fpga writed 0x281c 0x002a0693
hal fpga writed 0x281c 0x06c57fd2
hal fpga writed 0x281c 0x7fcf7907
hal fpga writed 0x281c 0x78d50032
hal fpga writed 0x281c 0x0035075c
hal fpga writed 0x281c 0x078e7fc7
hal fpga writed 0x281c 0x7fc4783f
hal fpga writed 0x281c 0x780d003e
hal fpga writed 0x281c 0x00410825
hal fpga writed 0x281c 0x08577fba
hal fpga writed 0x281c 0x7fb77776
hal fpga writed 0x281c 0x7744004b
hal fpga writed 0x281c 0x004f08ed
hal fpga writed 0x281c 0x091f7fad
hal fpga writed 0x281c 0x7fa976ae
hal fpga writed 0x281c 0x767b005a
hal fpga writed 0x281c 0x005d09b6
hal fpga writed 0x281c 0x09e87f9e
hal fpga writed 0x281c 0x7f9a75e5
hal fpga writed 0x281c 0x75b30069
hal fpga writed 0x281c 0x006d0a7e
hal fpga writed 0x281c 0x0ab07f8e
hal fpga writed 0x281c 0x7f89751d
hal fpga writed 0x281c 0x74eb007a
hal fpga writed 0x281c 0x007e0b47
hal fpga writed 0x281c 0x0b797f7c
hal fpga writed 0x281c 0x7f787454
hal fpga writed 0x281c 0x7422008c
hal fpga writed 0x281c 0x00910c0f
hal fpga writed 0x281c 0x0c417f6a
hal fpga writed 0x281c 0x7f65738c
hal fpga writed 0x281c 0x735a009f
hal fpga writed 0x281c 0x00a40cd7
hal fpga writed 0x281c 0x0d097f56
hal fpga writed 0x281c 0x7f5072c4
hal fpga writed 0x281c 0x729200b4
hal fpga writed 0x281c 0x00b90d9f
hal fpga writed 0x281c 0x0dd17f41
hal fpga writed 0x281c 0x7f3b71fc
hal fpga writed 0x281c 0x71ca00c9
hal fpga writed 0x281c 0x00cf0e67
hal fpga writed 0x281c 0x0e997f2a
hal fpga writed 0x281c 0x7f247134
hal fpga writed 0x281c 0x710300e0
hal fpga writed 0x281c 0x00e60f2e
hal fpga writed 0x281c 0x0f607f13
hal fpga writed 0x281c 0x7f0d706d
hal fpga writed 0x281c 0x703b00f9
hal fpga writed 0x281c 0x00ff0ff6
hal fpga writed 0x281c 0x10287efa
hal fpga writed 0x281c 0x7ef46fa5
hal fpga writed 0x281c 0x6f730112
hal fpga writed 0x281c 0x011810bd
hal fpga writed 0x281c 0x10ef7ee0
hal fpga writed 0x281c 0x7ed96ede
hal fpga writed 0x281c 0x6eac012c
hal fpga writed 0x281c 0x01331185
hal fpga writed 0x281c 0x11b67ec5
hal fpga writed 0x281c 0x7ebe6e17
hal fpga writed 0x281c 0x6de50148
hal fpga writed 0x281c 0x014f124c
hal fpga writed 0x281c 0x127d7ea8
hal fpga writed 0x281c 0x7ea16d50
hal fpga writed 0x281c 0x6d1e0165
hal fpga writed 0x281c 0x016d1313
hal fpga writed 0x281c 0x13447e8b
hal fpga writed 0x281c 0x7e836c89
hal fpga writed 0x281c 0x6c570184
hal fpga writed 0x281c 0x018b13d9
hal fpga writed 0x281c 0x140b7e6c
hal fpga writed 0x281c 0x7e646bc2
hal fpga writed 0x281c 0x6b9101a3
hal fpga writed 0x281c 0x01ab14a0
hal fpga writed 0x281c 0x14d17e4c
hal fpga writed 0x281c 0x7e436afc
hal fpga writed 0x281c 0x6aca01c4
hal fpga writed 0x281c 0x01cc1566
hal fpga writed 0x281c 0x15987e2a
hal fpga writed 0x281c 0x7e226a36
hal fpga writed 0x281c 0x6a0401e6
hal fpga writed 0x281c 0x01ee162c
hal fpga writed 0x281c 0x165e7e08
hal fpga writed 0x281c 0x7dff6970
hal fpga writed 0x281c 0x693e0209
hal fpga writed 0x281c 0x021216f2
hal fpga writed 0x281c 0x17247de4
hal fpga writed 0x281c 0x7ddb68aa
hal fpga writed 0x281c 0x6878022d
hal fpga writed 0x281c 0x023617b8
hal fpga writed 0x281c 0x17e97dbf
hal fpga writed 0x281c 0x7db667e4
hal fpga writed 0x281c 0x67b30253
hal fpga writed 0x281c 0x025c187d
hal fpga writed 0x281c 0x18af7d99
hal fpga writed 0x281c 0x7d8f671f
hal fpga writed 0x281c 0x66ee027a
hal fpga writed 0x281c 0x02831943
hal fpga writed 0x281c 0x19747d72
hal fpga writed 0x281c 0x7d68665a
hal fpga writed 0x281c 0x662902a2
hal fpga writed 0x281c 0x02ac1a08
hal fpga writed 0x281c 0x1a397d49
hal fpga writed 0x281c 0x7d3f6595
hal fpga writed 0x281c 0x656402cb
hal fpga writed 0x281c 0x02d51acc
hal fpga writed 0x281c 0x1afe7d1f
hal fpga writed 0x281c 0x7d1564d0
hal fpga writed 0x281c 0x649f02f5
hal fpga writed 0x281c 0x03001b91
hal fpga writed 0x281c 0x1bc27cf4
hal fpga writed 0x281c 0x7ce9640c
hal fpga writed 0x281c 0x63db0321
hal fpga writed 0x281c 0x032c1c55
hal fpga writed 0x281c 0x1c867cc8
hal fpga writed 0x281c 0x7cbd6348
hal fpga writed 0x281c 0x6317034e
hal fpga writed 0x281c 0x03591d19
hal fpga writed 0x281c 0x1d4a7c9b
hal fpga writed 0x281c 0x7c8f6284
hal fpga writed 0x281c 0x6253037c
hal fpga writed 0x281c 0x03871ddd
hal fpga writed 0x281c 0x1e0e7c6c
hal fpga writed 0x281c 0x7c6061c1
hal fpga writed 0x281c 0x619003ab
hal fpga writed 0x281c 0x03b71ea0
hal fpga writed 0x281c 0x1ed17c3c
hal fpga writed 0x281c 0x7c3060fd
hal fpga writed 0x281c 0x60cd03db
hal fpga writed 0x281c 0x03e71f63
hal fpga writed 0x281c 0x1f947c0b
hal fpga writed 0x281c 0x7bff603a
hal fpga writed 0x281c 0x600a040d
hal fpga writed 0x281c 0x04192026
hal fpga writed 0x281c 0x20577bd9
hal fpga writed 0x281c 0x7bcc5f78
hal fpga writed 0x281c 0x5f470440
hal fpga writed 0x281c 0x044c20e8
hal fpga writed 0x281c 0x21197ba6
hal fpga writed 0x281c 0x7b995eb6
hal fpga writed 0x281c 0x5e850474
hal fpga writed 0x281c 0x048121aa
hal fpga writed 0x281c 0x21db7b71
hal fpga writed 0x281c 0x7b645df4
hal fpga writed 0x281c 0x5dc304a9
hal fpga writed 0x281c 0x04b6226c
hal fpga writed 0x281c 0x229d7b3b
hal fpga writed 0x281c 0x7b2e5d32
hal fpga writed 0x281c 0x5d0204df
hal fpga writed 0x281c 0x04ed232e
hal fpga writed 0x281c 0x235e7b04
hal fpga writed 0x281c 0x7af65c71
hal fpga writed 0x281c 0x5c400517
hal fpga writed 0x281c 0x052523ef
hal fpga writed 0x281c 0x241f7acc
hal fpga writed 0x281c 0x7abe5bb0
hal fpga writed 0x281c 0x5b7f054f
hal fpga writed 0x281c 0x055e24b0
hal fpga writed 0x281c 0x24e07a93
hal fpga writed 0x281c 0x7a845aef
hal fpga writed 0x281c 0x5abf0589
hal fpga writed 0x281c 0x05982570
hal fpga writed 0x281c 0x25a07a58
hal fpga writed 0x281c 0x7a495a2f
hal fpga writed 0x281c 0x59ff05c4
hal fpga writed 0x281c 0x05d32630
hal fpga writed 0x281c 0x26607a1d
hal fpga writed 0x281c 0x7a0e596f
hal fpga writed 0x281c 0x593f0601
hal fpga writed 0x281c 0x061026f0
hal fpga writed 0x281c 0x272079e0
hal fpga writed 0x281c 0x79d058af
hal fpga writed 0x281c 0x587f063e
hal fpga writed 0x281c 0x064e27af
hal fpga writed 0x281c 0x27df79a2
hal fpga writed 0x281c 0x799257f0
hal fpga writed 0x281c 0x57c0067d
hal fpga writed 0x281c 0x068d286e
hal fpga writed 0x281c 0x289e7962
hal fpga writed 0x281c 0x79535731
hal fpga writed 0x281c 0x570206bd
hal fpga writed 0x281c 0x06cd292d
hal fpga writed 0x281c 0x295c7922
hal fpga writed 0x281c 0x79125673
hal fpga writed 0x281c 0x564306fe
hal fpga writed 0x281c 0x070e29eb
hal fpga writed 0x281c 0x2a1b78e1
hal fpga writed 0x281c 0x78d055b5
hal fpga writed 0x281c 0x55860740
hal fpga writed 0x281c 0x07502aa9
hal fpga writed 0x281c 0x2ad8789e
hal fpga writed 0x281c 0x788d54f7
hal fpga writed 0x281c 0x54c80783
hal fpga writed 0x281c 0x07942b66
hal fpga writed 0x281c 0x2b95785a
hal fpga writed 0x281c 0x7849543a
hal fpga writed 0x281c 0x540b07c7
hal fpga writed 0x281c 0x07d92c23
hal fpga writed 0x281c 0x2c527815
hal fpga writed 0x281c 0x7803537e
hal fpga writed 0x281c 0x534e080d
hal fpga writed 0x281c 0x081f2ce0
hal fpga writed 0x281c 0x2d0f77cf
hal fpga writed 0x281c 0x77bd52c1
hal fpga writed 0x281c 0x52920854
hal fpga writed 0x281c 0x08662d9c
hal fpga writed 0x281c 0x2dcb7787
hal fpga writed 0x281c 0x77755205
hal fpga writed 0x281c 0x51d7089c
hal fpga writed 0x281c 0x08ae2e57
hal fpga writed 0x281c 0x2e86773f
hal fpga writed 0x281c 0x772d514a
hal fpga writed 0x281c 0x511b08e5
hal fpga writed 0x281c 0x08f72f13
hal fpga writed 0x281c 0x2f4176f5
hal fpga writed 0x281c 0x76e3508f
hal fpga writed 0x281c 0x5060092f
hal fpga writed 0x281c 0x09422fcd
hal fpga writed 0x281c 0x2ffc76aa
hal fpga writed 0x281c 0x76984fd5
hal fpga writed 0x281c 0x4fa6097a
hal fpga writed 0x281c 0x098d3088
hal fpga writed 0x281c 0x30b6765e
hal fpga writed 0x281c 0x764b4f1a
hal fpga writed 0x281c 0x4eec09c7
hal fpga writed 0x281c 0x09da3141
hal fpga writed 0x281c 0x31707611
hal fpga writed 0x281c 0x75fe4e61
hal fpga writed 0x281c 0x4e330a15
hal fpga writed 0x281c 0x0a2831fb
hal fpga writed 0x281c 0x322975c3
hal fpga writed 0x281c 0x75af4da8
hal fpga writed 0x281c 0x4d7a0a63
hal fpga writed 0x281c 0x0a7732b4
hal fpga writed 0x281c 0x32e27574
hal fpga writed 0x281c 0x75604cef
hal fpga writed 0x281c 0x4cc10ab3
hal fpga writed 0x281c 0x0ac7336c
hal fpga writed 0x281c 0x339a7523
hal fpga writed 0x281c 0x750f4c37
hal fpga writed 0x281c 0x4c090b04
hal fpga writed 0x281c 0x0b193424
hal fpga writed 0x281c 0x345274d2
hal fpga writed 0x281c 0x74bd4b7f
hal fpga writed 0x281c 0x4b520b57
hal fpga writed 0x281c 0x0b6b34db
hal fpga writed 0x281c 0x3509747f
hal fpga writed 0x281c 0x746a4ac8
hal fpga writed 0x281c 0x4a9b0baa
hal fpga writed 0x281c 0x0bbf3592
hal fpga writed 0x281c 0x35c0742b
hal fpga writed 0x281c 0x74164a12
hal fpga writed 0x281c 0x49e40bfe
hal fpga writed 0x281c 0x0c143648
hal fpga writed 0x281c 0x367673d6
hal fpga writed 0x281c 0x73c1495c
hal fpga writed 0x281c 0x492e0c54
hal fpga writed 0x281c 0x0c6936fe
hal fpga writed 0x281c 0x372c7380
hal fpga writed 0x281c 0x736a48a6
hal fpga writed 0x281c 0x48790caa
hal fpga writed 0x281c 0x0cc037b4
hal fpga writed 0x281c 0x37e17329
hal fpga writed 0x281c 0x731347f1
hal fpga writed 0x281c 0x47c40d02
hal fpga writed 0x281c 0x0d183868
hal fpga writed 0x281c 0x389572d0
hal fpga writed 0x281c 0x72ba473d
hal fpga writed 0x281c 0x470f0d5b
hal fpga writed 0x281c 0x0d72391d
hal fpga writed 0x281c 0x39497277
hal fpga writed 0x281c 0x72604689
hal fpga writed 0x281c 0x465c0db5
hal fpga writed 0x281c 0x0dcc39d0
hal fpga writed 0x281c 0x39fd721c
hal fpga writed 0x281c 0x720645d5
hal fpga writed 0x281c 0x45a80e10
hal fpga writed 0x281c 0x0e273a83
hal fpga writed 0x281c 0x3ab071c1
hal fpga writed 0x281c 0x71aa4522
hal fpga writed 0x281c 0x44f60e6c
hal fpga writed 0x281c 0x0e843b36
hal fpga writed 0x281c 0x3b627164
hal fpga writed 0x281c 0x714d4470
hal fpga writed 0x281c 0x44440eca
hal fpga writed 0x281c 0x0ee13be8
hal fpga writed 0x281c 0x3c147106
hal fpga writed 0x281c 0x70ef43be
hal fpga writed 0x281c 0x43920f28
hal fpga writed 0x281c 0x0f403c99
hal fpga writed 0x281c 0x3cc570a7
hal fpga writed 0x281c 0x708f430d
hal fpga writed 0x281c 0x42e10f88
hal fpga writed 0x281c 0x0fa03d4a
hal fpga writed 0x281c 0x3d767047
hal fpga writed 0x281c 0x702f425d
hal fpga writed 0x281c 0x42310fe8
hal fpga writed 0x281c 0x10003dfa
hal fpga writed 0x281c 0x3e266fe6
hal fpga writed 0x281c 0x6fce41ad
hal fpga writed 0x281c 0x4181104a
hal fpga writed 0x281c 0x10623eaa
hal fpga writed 0x281c 0x3ed66f84
hal fpga writed 0x281c 0x6f6b40fe
hal fpga writed 0x281c 0x40d210ac
hal fpga writed 0x281c 0x10c53f59
hal fpga writed 0x281c 0x3f856f21
hal fpga writed 0x281c 0x6f08404f
hal fpga writed 0x281c 0x40231110
hal fpga writed 0x281c 0x11294007
hal fpga writed 0x281c 0x40336ebd
hal fpga writed 0x281c 0x6ea33fa1
hal fpga writed 0x281c 0x3f751175
hal fpga writed 0x281c 0x118e40b5
hal fpga writed 0x281c 0x40e06e57
hal fpga writed 0x281c 0x6e3e3ef3
hal fpga writed 0x281c 0x3ec811db
hal fpga writed 0x281c 0x11f54162
hal fpga writed 0x281c 0x418d6df1
hal fpga writed 0x281c 0x6dd73e46
hal fpga writed 0x281c 0x3e1b1242
hal fpga writed 0x281c 0x125c420f
hal fpga writed 0x281c 0x423a6d89
hal fpga writed 0x281c 0x6d6f3d9a
hal fpga writed 0x281c 0x3d6f12aa
hal fpga writed 0x281c 0x12c442bb
hal fpga writed 0x281c 0x42e66d21
hal fpga writed 0x281c 0x6d063cef
hal fpga writed 0x281c 0x3cc41313
hal fpga writed 0x281c 0x132d4366
hal fpga writed 0x281c 0x43916cb7
hal fpga writed 0x281c 0x6c9d3c44
hal fpga writed 0x281c 0x3c19137d
hal fpga writed 0x281c 0x13984411
hal fpga writed 0x281c 0x443b6c4c
hal fpga writed 0x281c 0x6c323b99
hal fpga writed 0x281c 0x3b6f13e8
hal fpga writed 0x281c 0x140344ba
hal fpga writed 0x281c 0x44e56be1
hal fpga writed 0x281c 0x6bc63af0
hal fpga writed 0x281c 0x3ac61455
hal fpga writed 0x281c 0x14704564
hal fpga writed 0x281c 0x458e6b74
hal fpga writed 0x281c 0x6b593a47
hal fpga writed 0x281c 0x3a1d14c2
hal fpga writed 0x281c 0x14dd460c
hal fpga writed 0x281c 0x46366b06
hal fpga writed 0x281c 0x6aeb399f
hal fpga writed 0x281c 0x39751530
hal fpga writed 0x281c 0x154c46b4
hal fpga writed 0x281c 0x46de6a97
hal fpga writed 0x281c 0x6a7c38f7
hal fpga writed 0x281c 0x38cd159f
hal fpga writed 0x281c 0x15bb475c
hal fpga writed 0x281c 0x47856a28
hal fpga writed 0x281c 0x6a0b3850
hal fpga writed 0x281c 0x38261610
hal fpga writed 0x281c 0x162c4802
hal fpga writed 0x281c 0x482c69b7
hal fpga writed 0x281c 0x699a37aa
hal fpga writed 0x281c 0x37801681
hal fpga writed 0x281c 0x169e48a8
hal fpga writed 0x281c 0x48d16945
hal fpga writed 0x281c 0x69283704
hal fpga writed 0x281c 0x36db16f3
hal fpga writed 0x281c 0x1710494d
hal fpga writed 0x281c 0x497668d2
hal fpga writed 0x281c 0x68b5365f
hal fpga writed 0x281c 0x36361767
hal fpga writed 0x281c 0x178449f2
hal fpga writed 0x281c 0x4a1b685e
hal fpga writed 0x281c 0x684135bb
hal fpga writed 0x281c 0x359217db
hal fpga writed 0x281c 0x17f94a95
hal fpga writed 0x281c 0x4abe67e9
hal fpga writed 0x281c 0x67cc3518
hal fpga writed 0x281c 0x34ef1851
hal fpga writed 0x281c 0x186e4b38
hal fpga writed 0x281c 0x4b616773
hal fpga writed 0x281c 0x67563475
hal fpga writed 0x281c 0x344d18c7
hal fpga writed 0x281c 0x18e54bdb
hal fpga writed 0x281c 0x4c0366fc
hal fpga writed 0x281c 0x66de33d3
hal fpga writed 0x281c 0x33ab193e
hal fpga writed 0x281c 0x195c4c7c
hal fpga writed 0x281c 0x4ca56684
hal fpga writed 0x281c 0x66663332
hal fpga writed 0x281c 0x330a19b7
hal fpga writed 0x281c 0x19d54d1d
hal fpga writed 0x281c 0x4d45660c
hal fpga writed 0x281c 0x65ed3292
hal fpga writed 0x281c 0x326a1a30
hal fpga writed 0x281c 0x1a4f4dbd
hal fpga writed 0x281c 0x4de56592
hal fpga writed 0x281c 0x657331f2
hal fpga writed 0x281c 0x31ca1aab
hal fpga writed 0x281c 0x1ac94e5d
hal fpga writed 0x281c 0x4e846517
hal fpga writed 0x281c 0x64f83153
hal fpga writed 0x281c 0x312b1b26
hal fpga writed 0x281c 0x1b454efb
hal fpga writed 0x281c 0x4f23649b
hal fpga writed 0x281c 0x647c30b5
hal fpga writed 0x281c 0x308d1ba2
hal fpga writed 0x281c 0x1bc14f99
hal fpga writed 0x281c 0x4fc0641e
hal fpga writed 0x281c 0x63ff3017
hal fpga writed 0x281c 0x2ff01c20
hal fpga writed 0x281c 0x1c3f5036
hal fpga writed 0x281c 0x505d63a0
hal fpga writed 0x281c 0x63812f7b
hal fpga writed 0x281c 0x2f531c9e
hal fpga writed 0x281c 0x1cbd50d3
hal fpga writed 0x281c 0x50f96322
hal fpga writed 0x281c 0x63022edf
hal fpga writed 0x281c 0x2eb81d1d
hal fpga writed 0x281c 0x1d3d516e
hal fpga writed 0x281c 0x519562a2
hal fpga writed 0x281c 0x62822e44
hal fpga writed 0x281c 0x2e1d1d9d
hal fpga writed 0x281c 0x1dbd5209
hal fpga writed 0x281c 0x522f6221
hal fpga writed 0x281c 0x62012da9
hal fpga writed 0x281c 0x2d831e1e
hal fpga writed 0x281c 0x1e3f52a3
hal fpga writed 0x281c 0x52c961a0
hal fpga writed 0x281c 0x617f2d10
hal fpga writed 0x281c 0x2ce91ea0
hal fpga writed 0x281c 0x1ec1533c
hal fpga writed 0x281c 0x5362611d
hal fpga writed 0x281c 0x60fd2c77
hal fpga writed 0x281c 0x2c511f23
hal fpga writed 0x281c 0x1f4453d4
hal fpga writed 0x281c 0x53fa609a
hal fpga writed 0x281c 0x60792bdf
hal fpga writed 0x281c 0x2bb91fa7
hal fpga writed 0x281c 0x1fc8546c
hal fpga writed 0x281c 0x54916016
hal fpga writed 0x281c 0x5ff42b48
hal fpga writed 0x281c 0x2b22202c
hal fpga writed 0x281c 0x204d5502
hal fpga writed 0x281c 0x55285f90
hal fpga writed 0x281c 0x5f6f2ab1
hal fpga writed 0x281c 0x2a8c20b2
hal fpga writed 0x281c 0x20d35598
hal fpga writed 0x281c 0x55be5f0a
hal fpga writed 0x281c 0x5ee82a1c
hal fpga writed 0x281c 0x29f72138
hal fpga writed 0x281c 0x215a562d
hal fpga writed 0x281c 0x56535e83
hal fpga writed 0x281c 0x5e612987
hal fpga writed 0x281c 0x296221c0
hal fpga writed 0x281c 0x21e256c2
hal fpga writed 0x281c 0x56e75dfb
hal fpga writed 0x281c 0x5dd928f3
hal fpga writed 0x281c 0x28cf2248
hal fpga writed 0x281c 0x226b5755
hal fpga writed 0x281c 0x577a5d72
hal fpga writed 0x281c 0x5d502860
hal fpga writed 0x281c 0x283c22d2
hal fpga writed 0x281c 0x22f457e8
hal fpga writed 0x281c 0x580c5ce8
hal fpga writed 0x281c 0x5cc527ce
hal fpga writed 0x281c 0x27aa235c
hal fpga writed 0x281c 0x237f5879
hal fpga writed 0x281c 0x589e5c5d
hal fpga writed 0x281c 0x5c3a273d
hal fpga writed 0x281c 0x271923e7
hal fpga writed 0x281c 0x240a590a
hal fpga writed 0x281c 0x592e5bd2
hal fpga writed 0x281c 0x5baf26ad
hal fpga writed 0x281c 0x26892473
hal fpga writed 0x281c 0x2497599a
hal fpga writed 0x281c 0x59be5b45
hal fpga writed 0x281c 0x5b22261d
hal fpga writed 0x281c 0x25f92500
hal fpga writed 0x281c 0x25245a29
hal fpga writed 0x281c 0x5a4d5ab8
hal fpga writed 0x281c 0x5a94258e
hal fpga writed 0x281c 0x5a945a71
hal fpga writed 0x281c 0x5a4d2547
hal fpga writed 0x281c 0x252425d6
hal fpga writed 0x281c 0x25f95aff
hal fpga writed 0x281c 0x5b2259e2
hal fpga writed 0x281c 0x59be24ba
hal fpga writed 0x281c 0x24972665
hal fpga writed 0x281c 0x26895b8c
hal fpga writed 0x281c 0x5baf5952
hal fpga writed 0x281c 0x592e242d
hal fpga writed 0x281c 0x240a26f5
hal fpga writed 0x281c 0x27195c18
hal fpga writed 0x281c 0x5c3a58c2
hal fpga writed 0x281c 0x589e23a2
hal fpga writed 0x281c 0x237f2786
hal fpga writed 0x281c 0x27aa5ca3
hal fpga writed 0x281c 0x5cc55831
hal fpga writed 0x281c 0x580c2317
hal fpga writed 0x281c 0x22f42817
hal fpga writed 0x281c 0x283c5d2d
hal fpga writed 0x281c 0x5d50579f
hal fpga writed 0x281c 0x577a228d
hal fpga writed 0x281c 0x226b28aa
hal fpga writed 0x281c 0x28cf5db7
hal fpga writed 0x281c 0x5dd9570c
hal fpga writed 0x281c 0x56e72204
hal fpga writed 0x281c 0x21e2293d
hal fpga writed 0x281c 0x29625e3f
hal fpga writed 0x281c 0x5e615678
hal fpga writed 0x281c 0x5653217c
hal fpga writed 0x281c 0x215a29d2
hal fpga writed 0x281c 0x29f75ec7
hal fpga writed 0x281c 0x5ee855e3
hal fpga writed 0x281c 0x55be20f5
hal fpga writed 0x281c 0x20d32a67
hal fpga writed 0x281c 0x2a8c5f4d
hal fpga writed 0x281c 0x5f6f554e
hal fpga writed 0x281c 0x5528206f
hal fpga writed 0x281c 0x204d2afd
hal fpga writed 0x281c 0x2b225fd3
hal fpga writed 0x281c 0x5ff454b7
hal fpga writed 0x281c 0x54911fe9
hal fpga writed 0x281c 0x1fc82b93
hal fpga writed 0x281c 0x2bb96058
hal fpga writed 0x281c 0x60795420
hal fpga writed 0x281c 0x53fa1f65
hal fpga writed 0x281c 0x1f442c2b
hal fpga writed 0x281c 0x2c5160dc
hal fpga writed 0x281c 0x60fd5388
hal fpga writed 0x281c 0x53621ee2
hal fpga writed 0x281c 0x1ec12cc3
hal fpga writed 0x281c 0x2ce9615f
hal fpga writed 0x281c 0x617f52ef
hal fpga writed 0x281c 0x52c91e5f
hal fpga writed 0x281c 0x1e3f2d5c
hal fpga writed 0x281c 0x2d8361e1
hal fpga writed 0x281c 0x62015256
hal fpga writed 0x281c 0x522f1dde
hal fpga writed 0x281c 0x1dbd2df6
hal fpga writed 0x281c 0x2e1d6262
hal fpga writed 0x281c 0x628251bb
hal fpga writed 0x281c 0x51951d5d
hal fpga writed 0x281c 0x1d3d2e91
hal fpga writed 0x281c 0x2eb862e2
hal fpga writed 0x281c 0x63025120
hal fpga writed 0x281c 0x50f91cdd
hal fpga writed 0x281c 0x1cbd2f2c
hal fpga writed 0x281c 0x2f536361
hal fpga writed 0x281c 0x63815084
hal fpga writed 0x281c 0x505d1c5f
hal fpga writed 0x281c 0x1c3f2fc9
hal fpga writed 0x281c 0x2ff063df
hal fpga writed 0x281c 0x63ff4fe8
hal fpga writed 0x281c 0x4fc01be1
hal fpga writed 0x281c 0x1bc13066
hal fpga writed 0x281c 0x308d645d
hal fpga writed 0x281c 0x647c4f4a
hal fpga writed 0x281c 0x4f231b64
hal fpga writed 0x281c 0x1b453104
hal fpga writed 0x281c 0x312b64d9
hal fpga writed 0x281c 0x64f84eac
hal fpga writed 0x281c 0x4e841ae8
hal fpga writed 0x281c 0x1ac931a2
hal fpga writed 0x281c 0x31ca6554
hal fpga writed 0x281c 0x65734e0d
hal fpga writed 0x281c 0x4de51a6d
hal fpga writed 0x281c 0x1a4f3242
hal fpga writed 0x281c 0x326a65cf
hal fpga writed 0x281c 0x65ed4d6d
hal fpga writed 0x281c 0x4d4519f3
hal fpga writed 0x281c 0x19d532e2
hal fpga writed 0x281c 0x330a6648
hal fpga writed 0x281c 0x66664ccd
hal fpga writed 0x281c 0x4ca5197b
hal fpga writed 0x281c 0x195c3383
hal fpga writed 0x281c 0x33ab66c1
hal fpga writed 0x281c 0x66de4c2c
hal fpga writed 0x281c 0x4c031903
hal fpga writed 0x281c 0x18e53424
hal fpga writed 0x281c 0x344d6738
hal fpga writed 0x281c 0x67564b8a
hal fpga writed 0x281c 0x4b61188c
hal fpga writed 0x281c 0x186e34c7
hal fpga writed 0x281c 0x34ef67ae
hal fpga writed 0x281c 0x67cc4ae7
hal fpga writed 0x281c 0x4abe1816
hal fpga writed 0x281c 0x17f9356a
hal fpga writed 0x281c 0x35926824
hal fpga writed 0x281c 0x68414a44
hal fpga writed 0x281c 0x4a1b17a1
hal fpga writed 0x281c 0x1784360d
hal fpga writed 0x281c 0x36366898
hal fpga writed 0x281c 0x68b549a0
hal fpga writed 0x281c 0x4976172d
hal fpga writed 0x281c 0x171036b2
hal fpga writed 0x281c 0x36db690c
hal fpga writed 0x281c 0x692848fb
hal fpga writed 0x281c 0x48d116ba
hal fpga writed 0x281c 0x169e3757
hal fpga writed 0x281c 0x3780697e
hal fpga writed 0x281c 0x699a4855
hal fpga writed 0x281c 0x482c1648
hal fpga writed 0x281c 0x162c37fd
hal fpga writed 0x281c 0x382669ef
hal fpga writed 0x281c 0x6a0b47af
hal fpga writed 0x281c 0x478515d7
hal fpga writed 0x281c 0x15bb38a3
hal fpga writed 0x281c 0x38cd6a60
hal fpga writed 0x281c 0x6a7c4708
hal fpga writed 0x281c 0x46de1568
hal fpga writed 0x281c 0x154c394b
hal fpga writed 0x281c 0x39756acf
hal fpga writed 0x281c 0x6aeb4660
hal fpga writed 0x281c 0x463614f9
hal fpga writed 0x281c 0x14dd39f3
hal fpga writed 0x281c 0x3a1d6b3d
hal fpga writed 0x281c 0x6b5945b8
hal fpga writed 0x281c 0x458e148b
hal fpga writed 0x281c 0x14703a9b
hal fpga writed 0x281c 0x3ac66baa
hal fpga writed 0x281c 0x6bc6450f
hal fpga writed 0x281c 0x44e5141e
hal fpga writed 0x281c 0x14033b45
hal fpga writed 0x281c 0x3b6f6c17
hal fpga writed 0x281c 0x6c324466
hal fpga writed 0x281c 0x443b13b3
hal fpga writed 0x281c 0x13983bee
hal fpga writed 0x281c 0x3c196c82
hal fpga writed 0x281c 0x6c9d43bb
hal fpga writed 0x281c 0x43911348
hal fpga writed 0x281c 0x132d3c99
hal fpga writed 0x281c 0x3cc46cec
hal fpga writed 0x281c 0x6d064310
hal fpga writed 0x281c 0x42e612de
hal fpga writed 0x281c 0x12c43d44
hal fpga writed 0x281c 0x3d6f6d55
hal fpga writed 0x281c 0x6d6f4265
hal fpga writed 0x281c 0x423a1276
hal fpga writed 0x281c 0x125c3df0
hal fpga writed 0x281c 0x3e1b6dbd
hal fpga writed 0x281c 0x6dd741b9
hal fpga writed 0x281c 0x418d120e
hal fpga writed 0x281c 0x11f53e9d
hal fpga writed 0x281c 0x3ec86e24
hal fpga writed 0x281c 0x6e3e410c
hal fpga writed 0x281c 0x40e011a8
hal fpga writed 0x281c 0x118e3f4a
hal fpga writed 0x281c 0x3f756e8a
hal fpga writed 0x281c 0x6ea3405e
hal fpga writed 0x281c 0x40331142
hal fpga writed 0x281c 0x11293ff8
hal fpga writed 0x281c 0x40236eef
hal fpga writed 0x281c 0x6f083fb0
hal fpga writed 0x281c 0x3f8510de
hal fpga writed 0x281c 0x10c540a6
hal fpga writed 0x281c 0x40d26f53
hal fpga writed 0x281c 0x6f6b3f01
hal fpga writed 0x281c 0x3ed6107b
hal fpga writed 0x281c 0x10624155
hal fpga writed 0x281c 0x41816fb5
hal fpga writed 0x281c 0x6fce3e52
hal fpga writed 0x281c 0x3e261019
hal fpga writed 0x281c 0x10004205
hal fpga writed 0x281c 0x42317017
hal fpga writed 0x281c 0x702f3da2
hal fpga writed 0x281c 0x3d760fb8
hal fpga writed 0x281c 0x0fa042b5
hal fpga writed 0x281c 0x42e17077
hal fpga writed 0x281c 0x708f3cf2
hal fpga writed 0x281c 0x3cc50f58
hal fpga writed 0x281c 0x0f404366
hal fpga writed 0x281c 0x439270d7
hal fpga writed 0x281c 0x70ef3c41
hal fpga writed 0x281c 0x3c140ef9
hal fpga writed 0x281c 0x0ee14417
hal fpga writed 0x281c 0x44447135
hal fpga writed 0x281c 0x714d3b8f
hal fpga writed 0x281c 0x3b620e9b
hal fpga writed 0x281c 0x0e8444c9
hal fpga writed 0x281c 0x44f67193
hal fpga writed 0x281c 0x71aa3add
hal fpga writed 0x281c 0x3ab00e3e
hal fpga writed 0x281c 0x0e27457c
hal fpga writed 0x281c 0x45a871ef
hal fpga writed 0x281c 0x72063a2a
hal fpga writed 0x281c 0x39fd0de3
hal fpga writed 0x281c 0x0dcc462f
hal fpga writed 0x281c 0x465c724a
hal fpga writed 0x281c 0x72603976
hal fpga writed 0x281c 0x39490d88
hal fpga writed 0x281c 0x0d7246e2
hal fpga writed 0x281c 0x470f72a4
hal fpga writed 0x281c 0x72ba38c2
hal fpga writed 0x281c 0x38950d2f
hal fpga writed 0x281c 0x0d184797
hal fpga writed 0x281c 0x47c472fd
hal fpga writed 0x281c 0x7313380e
hal fpga writed 0x281c 0x37e10cd6
hal fpga writed 0x281c 0x0cc0484b
hal fpga writed 0x281c 0x48797355
hal fpga writed 0x281c 0x736a3759
hal fpga writed 0x281c 0x372c0c7f
hal fpga writed 0x281c 0x0c694901
hal fpga writed 0x281c 0x492e73ab
hal fpga writed 0x281c 0x73c136a3
hal fpga writed 0x281c 0x36760c29
hal fpga writed 0x281c 0x0c1449b7
hal fpga writed 0x281c 0x49e47401
hal fpga writed 0x281c 0x741635ed
hal fpga writed 0x281c 0x35c00bd4
hal fpga writed 0x281c 0x0bbf4a6d
hal fpga writed 0x281c 0x4a9b7455
hal fpga writed 0x281c 0x746a3537
hal fpga writed 0x281c 0x35090b80
hal fpga writed 0x281c 0x0b6b4b24
hal fpga writed 0x281c 0x4b5274a8
hal fpga writed 0x281c 0x74bd3480
hal fpga writed 0x281c 0x34520b2d
hal fpga writed 0x281c 0x0b194bdb
hal fpga writed 0x281c 0x4c0974fb
hal fpga writed 0x281c 0x750f33c8
hal fpga writed 0x281c 0x339a0adc
hal fpga writed 0x281c 0x0ac74c93
hal fpga writed 0x281c 0x4cc1754c
hal fpga writed 0x281c 0x75603310
hal fpga writed 0x281c 0x32e20a8b
hal fpga writed 0x281c 0x0a774d4b
hal fpga writed 0x281c 0x4d7a759c
hal fpga writed 0x281c 0x75af3257
hal fpga writed 0x281c 0x32290a3c
hal fpga writed 0x281c 0x0a284e04
hal fpga writed 0x281c 0x4e3375ea
hal fpga writed 0x281c 0x75fe319e
hal fpga writed 0x281c 0x317009ee
hal fpga writed 0x281c 0x09da4ebe
hal fpga writed 0x281c 0x4eec7638
hal fpga writed 0x281c 0x764b30e5
hal fpga writed 0x281c 0x30b609a1
hal fpga writed 0x281c 0x098d4f77
hal fpga writed 0x281c 0x4fa67685
hal fpga writed 0x281c 0x7698302a
hal fpga writed 0x281c 0x2ffc0955
hal fpga writed 0x281c 0x09425032
hal fpga writed 0x281c 0x506076d0
hal fpga writed 0x281c 0x76e32f70
hal fpga writed 0x281c 0x2f41090a
hal fpga writed 0x281c 0x08f750ec
hal fpga writed 0x281c 0x511b771a
hal fpga writed 0x281c 0x772d2eb5
hal fpga writed 0x281c 0x2e8608c0
hal fpga writed 0x281c 0x08ae51a8
hal fpga writed 0x281c 0x51d77763
hal fpga writed 0x281c 0x77752dfa
hal fpga writed 0x281c 0x2dcb0878
hal fpga writed 0x281c 0x08665263
hal fpga writed 0x281c 0x529277ab
hal fpga writed 0x281c 0x77bd2d3e
hal fpga writed 0x281c 0x2d0f0830
hal fpga writed 0x281c 0x081f531f
hal fpga writed 0x281c 0x534e77f2
hal fpga writed 0x281c 0x78032c81
hal fpga writed 0x281c 0x2c5207ea
hal fpga writed 0x281c 0x07d953dc
hal fpga writed 0x281c 0x540b7838
hal fpga writed 0x281c 0x78492bc5
hal fpga writed 0x281c 0x2b9507a5
hal fpga writed 0x281c 0x07945499
hal fpga writed 0x281c 0x54c8787c
hal fpga writed 0x281c 0x788d2b08
hal fpga writed 0x281c 0x2ad80761
hal fpga writed 0x281c 0x07505556
hal fpga writed 0x281c 0x558678bf
hal fpga writed 0x281c 0x78d02a4a
hal fpga writed 0x281c 0x2a1b071e
hal fpga writed 0x281c 0x070e5614
hal fpga writed 0x281c 0x56437901
hal fpga writed 0x281c 0x7912298c
hal fpga writed 0x281c 0x295c06dd
hal fpga writed 0x281c 0x06cd56d2
hal fpga writed 0x281c 0x57027942
hal fpga writed 0x281c 0x795328ce
hal fpga writed 0x281c 0x289e069d
hal fpga writed 0x281c 0x068d5791
hal fpga writed 0x281c 0x57c07982
hal fpga writed 0x281c 0x7992280f
hal fpga writed 0x281c 0x27df065d
hal fpga writed 0x281c 0x064e5850
hal fpga writed 0x281c 0x587f79c1
hal fpga writed 0x281c 0x79d02750
hal fpga writed 0x281c 0x2720061f
hal fpga writed 0x281c 0x0610590f
hal fpga writed 0x281c 0x593f79fe
hal fpga writed 0x281c 0x7a0e2690
hal fpga writed 0x281c 0x266005e2
hal fpga writed 0x281c 0x05d359cf
hal fpga writed 0x281c 0x59ff7a3b
hal fpga writed 0x281c 0x7a4925d0
hal fpga writed 0x281c 0x25a005a7
hal fpga writed 0x281c 0x05985a8f
hal fpga writed 0x281c 0x5abf7a76
hal fpga writed 0x281c 0x7a842510
hal fpga writed 0x281c 0x24e0056c
hal fpga writed 0x281c 0x055e5b4f
hal fpga writed 0x281c 0x5b7f7ab0
hal fpga writed 0x281c 0x7abe244f
hal fpga writed 0x281c 0x241f0533
hal fpga writed 0x281c 0x05255c10
hal fpga writed 0x281c 0x5c407ae8
hal fpga writed 0x281c 0x7af6238e
hal fpga writed 0x281c 0x235e04fb
hal fpga writed 0x281c 0x04ed5cd1
hal fpga writed 0x281c 0x5d027b20
hal fpga writed 0x281c 0x7b2e22cd
hal fpga writed 0x281c 0x229d04c4
hal fpga writed 0x281c 0x04b65d93
hal fpga writed 0x281c 0x5dc37b56
hal fpga writed 0x281c 0x7b64220b
hal fpga writed 0x281c 0x21db048e
hal fpga writed 0x281c 0x04815e55
hal fpga writed 0x281c 0x5e857b8b
hal fpga writed 0x281c 0x7b992149
hal fpga writed 0x281c 0x21190459
hal fpga writed 0x281c 0x044c5f17
hal fpga writed 0x281c 0x5f477bbf
hal fpga writed 0x281c 0x7bcc2087
hal fpga writed 0x281c 0x20570426
hal fpga writed 0x281c 0x04195fd9
hal fpga writed 0x281c 0x600a7bf2
hal fpga writed 0x281c 0x7bff1fc5
hal fpga writed 0x281c 0x1f9403f4
hal fpga writed 0x281c 0x03e7609c
hal fpga writed 0x281c 0x60cd7c24
hal fpga writed 0x281c 0x7c301f02
hal fpga writed 0x281c 0x1ed103c3
hal fpga writed 0x281c 0x03b7615f
hal fpga writed 0x281c 0x61907c54
hal fpga writed 0x281c 0x7c601e3e
hal fpga writed 0x281c 0x1e0e0393
hal fpga writed 0x281c 0x03876222
hal fpga writed 0x281c 0x62537c83
hal fpga writed 0x281c 0x7c8f1d7b
hal fpga writed 0x281c 0x1d4a0364
hal fpga writed 0x281c 0x035962e6
hal fpga writed 0x281c 0x63177cb1
hal fpga writed 0x281c 0x7cbd1cb7
hal fpga writed 0x281c 0x1c860337
hal fpga writed 0x281c 0x032c63aa
hal fpga writed 0x281c 0x63db7cde
hal fpga writed 0x281c 0x7ce91bf3
hal fpga writed 0x281c 0x1bc2030b
hal fpga writed 0x281c 0x0300646e
hal fpga writed 0x281c 0x649f7d0a
hal fpga writed 0x281c 0x7d151b2f
hal fpga writed 0x281c 0x1afe02e0
hal fpga writed 0x281c 0x02d56533
hal fpga writed 0x281c 0x65647d34
hal fpga writed 0x281c 0x7d3f1a6a
hal fpga writed 0x281c 0x1a3902b6
hal fpga writed 0x281c 0x02ac65f7
hal fpga writed 0x281c 0x66297d5d
hal fpga writed 0x281c 0x7d6819a5
hal fpga writed 0x281c 0x1974028d
hal fpga writed 0x281c 0x028366bc
hal fpga writed 0x281c 0x66ee7d85
hal fpga writed 0x281c 0x7d8f18e0
hal fpga writed 0x281c 0x18af0266
hal fpga writed 0x281c 0x025c6782
hal fpga writed 0x281c 0x67b37dac
hal fpga writed 0x281c 0x7db6181b
hal fpga writed 0x281c 0x17e90240
hal fpga writed 0x281c 0x02366847
hal fpga writed 0x281c 0x68787dd2
hal fpga writed 0x281c 0x7ddb1755
hal fpga writed 0x281c 0x1724021b
hal fpga writed 0x281c 0x0212690d
hal fpga writed 0x281c 0x693e7df6
hal fpga writed 0x281c 0x7dff168f
hal fpga writed 0x281c 0x165e01f7
hal fpga writed 0x281c 0x01ee69d3
hal fpga writed 0x281c 0x6a047e19
hal fpga writed 0x281c 0x7e2215c9
hal fpga writed 0x281c 0x159801d5
hal fpga writed 0x281c 0x01cc6a99
hal fpga writed 0x281c 0x6aca7e3b
hal fpga writed 0x281c 0x7e431503
hal fpga writed 0x281c 0x14d101b3
hal fpga writed 0x281c 0x01ab6b5f
hal fpga writed 0x281c 0x6b917e5c
hal fpga writed 0x281c 0x7e64143d
hal fpga writed 0x281c 0x140b0193
hal fpga writed 0x281c 0x018b6c26
hal fpga writed 0x281c 0x6c577e7b
hal fpga writed 0x281c 0x7e831376
hal fpga writed 0x281c 0x13440174
hal fpga writed 0x281c 0x016d6cec
hal fpga writed 0x281c 0x6d1e7e9a
hal fpga writed 0x281c 0x7ea112af
hal fpga writed 0x281c 0x127d0157
hal fpga writed 0x281c 0x014f6db3
hal fpga writed 0x281c 0x6de57eb7
hal fpga writed 0x281c 0x7ebe11e8
hal fpga writed 0x281c 0x11b6013a
hal fpga writed 0x281c 0x01336e7a
hal fpga writed 0x281c 0x6eac7ed3
hal fpga writed 0x281c 0x7ed91121
hal fpga writed 0x281c 0x10ef011f
hal fpga writed 0x281c 0x01186f42
hal fpga writed 0x281c 0x6f737eed
hal fpga writed 0x281c 0x7ef4105a
hal fpga writed 0x281c 0x10280105
hal fpga writed 0x281c 0x00ff7009
hal fpga writed 0x281c 0x703b7f06
hal fpga writed 0x281c 0x7f0d0f92
hal fpga writed 0x281c 0x0f6000ec
hal fpga writed 0x281c 0x00e670d1
hal fpga writed 0x281c 0x71037f1f
hal fpga writed 0x281c 0x7f240ecb
hal fpga writed 0x281c 0x0e9900d5
hal fpga writed 0x281c 0x00cf7198
hal fpga writed 0x281c 0x71ca7f36
hal fpga writed 0x281c 0x7f3b0e03
hal fpga writed 0x281c 0x0dd100be
hal fpga writed 0x281c 0x00b97260
hal fpga writed 0x281c 0x72927f4b
hal fpga writed 0x281c 0x7f500d3b
hal fpga writed 0x281c 0x0d0900a9
hal fpga writed 0x281c 0x00a47328
hal fpga writed 0x281c 0x735a7f60
hal fpga writed 0x281c 0x7f650c73
hal fpga writed 0x281c 0x0c410095
hal fpga writed 0x281c 0x009173f0
hal fpga writed 0x281c 0x74227f73
hal fpga writed 0x281c 0x7f780bab
hal fpga writed 0x281c 0x0b790083
hal fpga writed 0x281c 0x007e74b8
hal fpga writed 0x281c 0x74eb7f85
hal fpga writed 0x281c 0x7f890ae2
hal fpga writed 0x281c 0x0ab00071
hal fpga writed 0x281c 0x006d7581
hal fpga writed 0x281c 0x75b37f96
hal fpga writed 0x281c 0x7f9a0a1a
hal fpga writed 0x281c 0x09e80061
hal fpga writed 0x281c 0x005d7649
hal fpga writed 0x281c 0x767b7fa5
hal fpga writed 0x281c 0x7fa90951
hal fpga writed 0x281c 0x091f0052
hal fpga writed 0x281c 0x004f7712
hal fpga writed 0x281c 0x77447fb4
hal fpga writed 0x281c 0x7fb70889
hal fpga writed 0x281c 0x08570045
hal fpga writed 0x281c 0x004177da
hal fpga writed 0x281c 0x780d7fc1
hal fpga writed 0x281c 0x7fc407c0
hal fpga writed 0x281c 0x078e0038
hal fpga writed 0x281c 0x003578a3
hal fpga writed 0x281c 0x78d57fcd
hal fpga writed 0x281c 0x7fcf06f8
hal fpga writed 0x281c 0x06c5002d
hal fpga writed 0x281c 0x002a796c
hal fpga writed 0x281c 0x799e7fd7
hal fpga writed 0x281c 0x7fda062f
hal fpga writed 0x281c 0x05fd0023
hal fpga writed 0x281c 0x00217a35
hal fpga writed 0x281c 0x7a677fe1
hal fpga writed 0x281c 0x7fe30566
hal fpga writed 0x281c 0x0534001a
hal fpga writed 0x281c 0x00187afe
hal fpga writed 0x281c 0x7b307fe9
hal fpga writed 0x281c 0x7feb049d
hal fpga writed 0x281c 0x046b0013
hal fpga writed 0x281c 0x00117bc6
hal fpga writed 0x281c 0x7bf97ff0
hal fpga writed 0x281c 0x7ff103d4
hal fpga writed 0x281c 0x03a2000c
hal fpga writed 0x281c 0x000b7c8f
hal fpga writed 0x281c 0x7cc27ff6
hal fpga writed 0x281c 0x7ff7030b
hal fpga writed 0x281c 0x02d90007
hal fpga writed 0x281c 0x00067d58
hal fpga writed 0x281c 0x7d8b7ffa
hal fpga writed 0x281c 0x7ffb0242
hal fpga writed 0x281c 0x02100003
hal fpga writed 0x281c 0x00027e21
hal fpga writed 0x281c 0x7e547ffd
hal fpga writed 0x281c 0x7ffe0179
hal fpga writed 0x281c 0x01470001
hal fpga writed 0x281c 0x00007eeb
hal fpga writed 0x281c 0x7f1d7fff
hal fpga writed 0x281c 0x7fff00b0
hal fpga writed 0x281c 0x007effff
hal fpga writed 0x281c 0xffff7fb4
hal fpga writed 0x281c 0x7fe67fff
hal fpga writed 0x281c 0x7fff7fe6
hal fpga writed 0x281c 0x7fb4ffff
hal fpga writed 0x281c 0xffff007e
hal fpga writed 0x281c 0x00b07fff
hal fpga writed 0x281c 0x7fff7f1d
hal fpga writed 0x281c 0x7eeb0000
hal fpga writed 0x281c 0x00010147
hal fpga writed 0x281c 0x01797ffe
hal fpga writed 0x281c 0x7ffd7e54
hal fpga writed 0x281c 0x7e210002
hal fpga writed 0x281c 0x00030210
hal fpga writed 0x281c 0x02427ffb
hal fpga writed 0x281c 0x7ffa7d8b
hal fpga writed 0x281c 0x7d580006
hal fpga writed 0x281c 0x000702d9
hal fpga writed 0x281c 0x030b7ff7
hal fpga writed 0x281c 0x7ff67cc2
hal fpga writed 0x281c 0x7c8f000b
hal fpga writed 0x281c 0x000c03a2
hal fpga writed 0x281c 0x03d47ff1
hal fpga writed 0x281c 0x7ff07bf9
hal fpga writed 0x281c 0x7bc60011
hal fpga writed 0x281c 0x0013046b
hal fpga writed 0x281c 0x049d7feb
hal fpga writed 0x281c 0x7fe97b30
hal fpga writed 0x281c 0x7afe0018
hal fpga writed 0x281c 0x001a0534
hal fpga writed 0x281c 0x05667fe3
hal fpga writed 0x281c 0x7fe17a67
hal fpga writed 0x281c 0x7a350021
hal fpga writed 0x281c 0x002305fd
hal fpga writed 0x281c 0x062f7fda
hal fpga writed 0x281c 0x7fd7799e
hal fpga writed 0x281c 0x796c002a
hal fpga writed 0x281c 0x002d06c5
hal fpga writed 0x281c 0x06f87fcf
hal fpga writed 0x281c 0x7fcd78d5
hal fpga writed 0x281c 0x78a30035
hal fpga writed 0x281c 0x0038078e
hal fpga writed 0x281c 0x07c07fc4
hal fpga writed 0x281c 0x7fc1780d
hal fpga writed 0x281c 0x77da0041
hal fpga writed 0x281c 0x00450857
hal fpga writed 0x281c 0x08897fb7
hal fpga writed 0x281c 0x7fb47744
hal fpga writed 0x281c 0x7712004f
hal fpga writed 0x281c 0x0052091f
hal fpga writed 0x281c 0x09517fa9
hal fpga writed 0x281c 0x7fa5767b
hal fpga writed 0x281c 0x7649005d
hal fpga writed 0x281c 0x006109e8
hal fpga writed 0x281c 0x0a1a7f9a
hal fpga writed 0x281c 0x7f9675b3
hal fpga writed 0x281c 0x7581006d
hal fpga writed 0x281c 0x00710ab0
hal fpga writed 0x281c 0x0ae27f89
hal fpga writed 0x281c 0x7f8574eb
hal fpga writed 0x281c 0x74b8007e
hal fpga writed 0x281c 0x00830b79
hal fpga writed 0x281c 0x0bab7f78
hal fpga writed 0x281c 0x7f737422
hal fpga writed 0x281c 0x73f00091
hal fpga writed 0x281c 0x00950c41
hal fpga writed 0x281c 0x0c737f65
hal fpga writed 0x281c 0x7f60735a
hal fpga writed 0x281c 0x732800a4
hal fpga writed 0x281c 0x00a90d09
hal fpga writed 0x281c 0x0d3b7f50
hal fpga writed 0x281c 0x7f4b7292
hal fpga writed 0x281c 0x726000b9
hal fpga writed 0x281c 0x00be0dd1
hal fpga writed 0x281c 0x0e037f3b
hal fpga writed 0x281c 0x7f3671ca
hal fpga writed 0x281c 0x719800cf
hal fpga writed 0x281c 0x00d50e99
hal fpga writed 0x281c 0x0ecb7f24
hal fpga writed 0x281c 0x7f1f7103
hal fpga writed 0x281c 0x70d100e6
hal fpga writed 0x281c 0x00ec0f60
hal fpga writed 0x281c 0x0f927f0d
hal fpga writed 0x281c 0x7f06703b
hal fpga writed 0x281c 0x700900ff
hal fpga writed 0x281c 0x01051028
hal fpga writed 0x281c 0x105a7ef4
hal fpga writed 0x281c 0x7eed6f73
hal fpga writed 0x281c 0x6f420118
hal fpga writed 0x281c 0x011f10ef
hal fpga writed 0x281c 0x11217ed9
hal fpga writed 0x281c 0x7ed36eac
hal fpga writed 0x281c 0x6e7a0133
hal fpga writed 0x281c 0x013a11b6
hal fpga writed 0x281c 0x11e87ebe
hal fpga writed 0x281c 0x7eb76de5
hal fpga writed 0x281c 0x6db3014f
hal fpga writed 0x281c 0x0157127d
hal fpga writed 0x281c 0x12af7ea1
hal fpga writed 0x281c 0x7e9a6d1e
hal fpga writed 0x281c 0x6cec016d
hal fpga writed 0x281c 0x01741344
hal fpga writed 0x281c 0x13767e83
hal fpga writed 0x281c 0x7e7b6c57
hal fpga writed 0x281c 0x6c26018b
hal fpga writed 0x281c 0x0193140b
hal fpga writed 0x281c 0x143d7e64
hal fpga writed 0x281c 0x7e5c6b91
hal fpga writed 0x281c 0x6b5f01ab
hal fpga writed 0x281c 0x01b314d1
hal fpga writed 0x281c 0x15037e43
hal fpga writed 0x281c 0x7e3b6aca
hal fpga writed 0x281c 0x6a9901cc
hal fpga writed 0x281c 0x01d51598
hal fpga writed 0x281c 0x15c97e22
hal fpga writed 0x281c 0x7e196a04
hal fpga writed 0x281c 0x69d301ee
hal fpga writed 0x281c 0x01f7165e
hal fpga writed 0x281c 0x168f7dff
hal fpga writed 0x281c 0x7df6693e
hal fpga writed 0x281c 0x690d0212
hal fpga writed 0x281c 0x021b1724
hal fpga writed 0x281c 0x17557ddb
hal fpga writed 0x281c 0x7dd26878
hal fpga writed 0x281c 0x68470236
hal fpga writed 0x281c 0x024017e9
hal fpga writed 0x281c 0x181b7db6
hal fpga writed 0x281c 0x7dac67b3
hal fpga writed 0x281c 0x6782025c
hal fpga writed 0x281c 0x026618af
hal fpga writed 0x281c 0x18e07d8f
hal fpga writed 0x281c 0x7d8566ee
hal fpga writed 0x281c 0x66bc0283
hal fpga writed 0x281c 0x028d1974
hal fpga writed 0x281c 0x19a57d68
hal fpga writed 0x281c 0x7d5d6629
hal fpga writed 0x281c 0x65f702ac
hal fpga writed 0x281c 0x02b61a39
hal fpga writed 0x281c 0x1a6a7d3f
hal fpga writed 0x281c 0x7d346564
hal fpga writed 0x281c 0x653302d5
hal fpga writed 0x281c 0x02e01afe
hal fpga writed 0x281c 0x1b2f7d15
hal fpga writed 0x281c 0x7d0a649f
hal fpga writed 0x281c 0x646e0300
hal fpga writed 0x281c 0x030b1bc2
hal fpga writed 0x281c 0x1bf37ce9
hal fpga writed 0x281c 0x7cde63db
hal fpga writed 0x281c 0x63aa032c
hal fpga writed 0x281c 0x03371c86
hal fpga writed 0x281c 0x1cb77cbd
hal fpga writed 0x281c 0x7cb16317
hal fpga writed 0x281c 0x62e60359
hal fpga writed 0x281c 0x03641d4a
hal fpga writed 0x281c 0x1d7b7c8f
hal fpga writed 0x281c 0x7c836253
hal fpga writed 0x281c 0x62220387
hal fpga writed 0x281c 0x03931e0e
hal fpga writed 0x281c 0x1e3e7c60
hal fpga writed 0x281c 0x7c546190
hal fpga writed 0x281c 0x615f03b7
hal fpga writed 0x281c 0x03c31ed1
hal fpga writed 0x281c 0x1f027c30
hal fpga writed 0x281c 0x7c2460cd
hal fpga writed 0x281c 0x609c03e7
hal fpga writed 0x281c 0x03f41f94
hal fpga writed 0x281c 0x1fc57bff
hal fpga writed 0x281c 0x7bf2600a
hal fpga writed 0x281c 0x5fd90419
hal fpga writed 0x281c 0x04262057
hal fpga writed 0x281c 0x20877bcc
hal fpga writed 0x281c 0x7bbf5f47
hal fpga writed 0x281c 0x5f17044c
hal fpga writed 0x281c 0x04592119
hal fpga writed 0x281c 0x21497b99
hal fpga writed 0x281c 0x7b8b5e85
hal fpga writed 0x281c 0x5e550481
hal fpga writed 0x281c 0x048e21db
hal fpga writed 0x281c 0x220b7b64
hal fpga writed 0x281c 0x7b565dc3
hal fpga writed 0x281c 0x5d9304b6
hal fpga writed 0x281c 0x04c4229d
hal fpga writed 0x281c 0x22cd7b2e
hal fpga writed 0x281c 0x7b205d02
hal fpga writed 0x281c 0x5cd104ed
hal fpga writed 0x281c 0x04fb235e
hal fpga writed 0x281c 0x238e7af6
hal fpga writed 0x281c 0x7ae85c40
hal fpga writed 0x281c 0x5c100525
hal fpga writed 0x281c 0x0533241f
hal fpga writed 0x281c 0x244f7abe
hal fpga writed 0x281c 0x7ab05b7f
hal fpga writed 0x281c 0x5b4f055e
hal fpga writed 0x281c 0x056c24e0
hal fpga writed 0x281c 0x25107a84
hal fpga writed 0x281c 0x7a765abf
hal fpga writed 0x281c 0x5a8f0598
hal fpga writed 0x281c 0x05a725a0
hal fpga writed 0x281c 0x25d07a49
hal fpga writed 0x281c 0x7a3b59ff
hal fpga writed 0x281c 0x59cf05d3
hal fpga writed 0x281c 0x05e22660
hal fpga writed 0x281c 0x26907a0e
hal fpga writed 0x281c 0x79fe593f
hal fpga writed 0x281c 0x590f0610
hal fpga writed 0x281c 0x061f2720
hal fpga writed 0x281c 0x275079d0
hal fpga writed 0x281c 0x79c1587f
hal fpga writed 0x281c 0x5850064e
hal fpga writed 0x281c 0x065d27df
hal fpga writed 0x281c 0x280f7992
hal fpga writed 0x281c 0x798257c0
hal fpga writed 0x281c 0x5791068d
hal fpga writed 0x281c 0x069d289e
hal fpga writed 0x281c 0x28ce7953
hal fpga writed 0x281c 0x79425702
hal fpga writed 0x281c 0x56d206cd
hal fpga writed 0x281c 0x06dd295c
hal fpga writed 0x281c 0x298c7912
hal fpga writed 0x281c 0x79015643
hal fpga writed 0x281c 0x5614070e
hal fpga writed 0x281c 0x071e2a1b
hal fpga writed 0x281c 0x2a4a78d0
hal fpga writed 0x281c 0x78bf5586
hal fpga writed 0x281c 0x55560750
hal fpga writed 0x281c 0x07612ad8
hal fpga writed 0x281c 0x2b08788d
hal fpga writed 0x281c 0x787c54c8
hal fpga writed 0x281c 0x54990794
hal fpga writed 0x281c 0x07a52b95
hal fpga writed 0x281c 0x2bc57849
hal fpga writed 0x281c 0x7838540b
hal fpga writed 0x281c 0x53dc07d9
hal fpga writed 0x281c 0x07ea2c52
hal fpga writed 0x281c 0x2c817803
hal fpga writed 0x281c 0x77f2534e
hal fpga writed 0x281c 0x531f081f
hal fpga writed 0x281c 0x08302d0f
hal fpga writed 0x281c 0x2d3e77bd
hal fpga writed 0x281c 0x77ab5292
hal fpga writed 0x281c 0x52630866
hal fpga writed 0x281c 0x08782dcb
hal fpga writed 0x281c 0x2dfa7775
hal fpga writed 0x281c 0x776351d7
hal fpga writed 0x281c 0x51a808ae
hal fpga writed 0x281c 0x08c02e86
hal fpga writed 0x281c 0x2eb5772d
hal fpga writed 0x281c 0x771a511b
hal fpga writed 0x281c 0x50ec08f7
hal fpga writed 0x281c 0x090a2f41
hal fpga writed 0x281c 0x2f7076e3
hal fpga writed 0x281c 0x76d05060
hal fpga writed 0x281c 0x50320942
hal fpga writed 0x281c 0x09552ffc
hal fpga writed 0x281c 0x302a7698
hal fpga writed 0x281c 0x76854fa6
hal fpga writed 0x281c 0x4f77098d
hal fpga writed 0x281c 0x09a130b6
hal fpga writed 0x281c 0x30e5764b
hal fpga writed 0x281c 0x76384eec
hal fpga writed 0x281c 0x4ebe09da
hal fpga writed 0x281c 0x09ee3170
hal fpga writed 0x281c 0x319e75fe
hal fpga writed 0x281c 0x75ea4e33
hal fpga writed 0x281c 0x4e040a28
hal fpga writed 0x281c 0x0a3c3229
hal fpga writed 0x281c 0x325775af
hal fpga writed 0x281c 0x759c4d7a
hal fpga writed 0x281c 0x4d4b0a77
hal fpga writed 0x281c 0x0a8b32e2
hal fpga writed 0x281c 0x33107560
hal fpga writed 0x281c 0x754c4cc1
hal fpga writed 0x281c 0x4c930ac7
hal fpga writed 0x281c 0x0adc339a
hal fpga writed 0x281c 0x33c8750f
hal fpga writed 0x281c 0x74fb4c09
hal fpga writed 0x281c 0x4bdb0b19
hal fpga writed 0x281c 0x0b2d3452
hal fpga writed 0x281c 0x348074bd
hal fpga writed 0x281c 0x74a84b52
hal fpga writed 0x281c 0x4b240b6b
hal fpga writed 0x281c 0x0b803509
hal fpga writed 0x281c 0x3537746a
hal fpga writed 0x281c 0x74554a9b
hal fpga writed 0x281c 0x4a6d0bbf
hal fpga writed 0x281c 0x0bd435c0
hal fpga writed 0x281c 0x35ed7416
hal fpga writed 0x281c 0x740149e4
hal fpga writed 0x281c 0x49b70c14
hal fpga writed 0x281c 0x0c293676
hal fpga writed 0x281c 0x36a373c1
hal fpga writed 0x281c 0x73ab492e
hal fpga writed 0x281c 0x49010c69
hal fpga writed 0x281c 0x0c7f372c
hal fpga writed 0x281c 0x3759736a
hal fpga writed 0x281c 0x73554879
hal fpga writed 0x281c 0x484b0cc0
hal fpga writed 0x281c 0x0cd637e1
hal fpga writed 0x281c 0x380e7313
hal fpga writed 0x281c 0x72fd47c4
hal fpga writed 0x281c 0x47970d18
hal fpga writed 0x281c 0x0d2f3895
hal fpga writed 0x281c 0x38c272ba
hal fpga writed 0x281c 0x72a4470f
hal fpga writed 0x281c 0x46e20d72
hal fpga writed 0x281c 0x0d883949
hal fpga writed 0x281c 0x39767260
hal fpga writed 0x281c 0x724a465c
hal fpga writed 0x281c 0x462f0dcc
hal fpga writed 0x281c 0x0de339fd
hal fpga writed 0x281c 0x3a2a7206
hal fpga writed 0x281c 0x71ef45a8
hal fpga writed 0x281c 0x457c0e27
hal fpga writed 0x281c 0x0e3e3ab0
hal fpga writed 0x281c 0x3add71aa
hal fpga writed 0x281c 0x719344f6
hal fpga writed 0x281c 0x44c90e84
hal fpga writed 0x281c 0x0e9b3b62
hal fpga writed 0x281c 0x3b8f714d
hal fpga writed 0x281c 0x71354444
hal fpga writed 0x281c 0x44170ee1
hal fpga writed 0x281c 0x0ef93c14
hal fpga writed 0x281c 0x3c4170ef
hal fpga writed 0x281c 0x70d74392
hal fpga writed 0x281c 0x43660f40
hal fpga writed 0x281c 0x0f583cc5
hal fpga writed 0x281c 0x3cf2708f
hal fpga writed 0x281c 0x707742e1
hal fpga writed 0x281c 0x42b50fa0
hal fpga writed 0x281c 0x0fb83d76
hal fpga writed 0x281c 0x3da2702f
hal fpga writed 0x281c 0x70174231
hal fpga writed 0x281c 0x42051000
hal fpga writed 0x281c 0x10193e26
hal fpga writed 0x281c 0x3e526fce
hal fpga writed 0x281c 0x6fb54181
hal fpga writed 0x281c 0x41551062
hal fpga writed 0x281c 0x107b3ed6
hal fpga writed 0x281c 0x3f016f6b
hal fpga writed 0x281c 0x6f5340d2
hal fpga writed 0x281c 0x40a610c5
hal fpga writed 0x281c 0x10de3f85
hal fpga writed 0x281c 0x3fb06f08
hal fpga writed 0x281c 0x6eef4023
hal fpga writed 0x281c 0x3ff81129
hal fpga writed 0x281c 0x11424033
hal fpga writed 0x281c 0x405e6ea3
hal fpga writed 0x281c 0x6e8a3f75
hal fpga writed 0x281c 0x3f4a118e
hal fpga writed 0x281c 0x11a840e0
hal fpga writed 0x281c 0x410c6e3e
hal fpga writed 0x281c 0x6e243ec8
hal fpga writed 0x281c 0x3e9d11f5
hal fpga writed 0x281c 0x120e418d
hal fpga writed 0x281c 0x41b96dd7
hal fpga writed 0x281c 0x6dbd3e1b
hal fpga writed 0x281c 0x3df0125c
hal fpga writed 0x281c 0x1276423a
hal fpga writed 0x281c 0x42656d6f
hal fpga writed 0x281c 0x6d553d6f
hal fpga writed 0x281c 0x3d4412c4
hal fpga writed 0x281c 0x12de42e6
hal fpga writed 0x281c 0x43106d06
hal fpga writed 0x281c 0x6cec3cc4
hal fpga writed 0x281c 0x3c99132d
hal fpga writed 0x281c 0x13484391
hal fpga writed 0x281c 0x43bb6c9d
hal fpga writed 0x281c 0x6c823c19
hal fpga writed 0x281c 0x3bee1398
hal fpga writed 0x281c 0x13b3443b
hal fpga writed 0x281c 0x44666c32
hal fpga writed 0x281c 0x6c173b6f
hal fpga writed 0x281c 0x3b451403
hal fpga writed 0x281c 0x141e44e5
hal fpga writed 0x281c 0x450f6bc6
hal fpga writed 0x281c 0x6baa3ac6
hal fpga writed 0x281c 0x3a9b1470
hal fpga writed 0x281c 0x148b458e
hal fpga writed 0x281c 0x45b86b59
hal fpga writed 0x281c 0x6b3d3a1d
hal fpga writed 0x281c 0x39f314dd
hal fpga writed 0x281c 0x14f94636
hal fpga writed 0x281c 0x46606aeb
hal fpga writed 0x281c 0x6acf3975
hal fpga writed 0x281c 0x394b154c
hal fpga writed 0x281c 0x156846de
hal fpga writed 0x281c 0x47086a7c
hal fpga writed 0x281c 0x6a6038cd
hal fpga writed 0x281c 0x38a315bb
hal fpga writed 0x281c 0x15d74785
hal fpga writed 0x281c 0x47af6a0b
hal fpga writed 0x281c 0x69ef3826
hal fpga writed 0x281c 0x37fd162c
hal fpga writed 0x281c 0x1648482c
hal fpga writed 0x281c 0x4855699a
hal fpga writed 0x281c 0x697e3780
hal fpga writed 0x281c 0x3757169e
hal fpga writed 0x281c 0x16ba48d1
hal fpga writed 0x281c 0x48fb6928
hal fpga writed 0x281c 0x690c36db
hal fpga writed 0x281c 0x36b21710
hal fpga writed 0x281c 0x172d4976
hal fpga writed 0x281c 0x49a068b5
hal fpga writed 0x281c 0x68983636
hal fpga writed 0x281c 0x360d1784
hal fpga writed 0x281c 0x17a14a1b
hal fpga writed 0x281c 0x4a446841
hal fpga writed 0x281c 0x68243592
hal fpga writed 0x281c 0x356a17f9
hal fpga writed 0x281c 0x18164abe
hal fpga writed 0x281c 0x4ae767cc
hal fpga writed 0x281c 0x67ae34ef
hal fpga writed 0x281c 0x34c7186e
hal fpga writed 0x281c 0x188c4b61
hal fpga writed 0x281c 0x4b8a6756
hal fpga writed 0x281c 0x6738344d
hal fpga writed 0x281c 0x342418e5
hal fpga writed 0x281c 0x19034c03
hal fpga writed 0x281c 0x4c2c66de
hal fpga writed 0x281c 0x66c133ab
hal fpga writed 0x281c 0x3383195c
hal fpga writed 0x281c 0x197b4ca5
hal fpga writed 0x281c 0x4ccd6666
hal fpga writed 0x281c 0x6648330a
hal fpga writed 0x281c 0x32e219d5
hal fpga writed 0x281c 0x19f34d45
hal fpga writed 0x281c 0x4d6d65ed
hal fpga writed 0x281c 0x65cf326a
hal fpga writed 0x281c 0x32421a4f
hal fpga writed 0x281c 0x1a6d4de5
hal fpga writed 0x281c 0x4e0d6573
hal fpga writed 0x281c 0x655431ca
hal fpga writed 0x281c 0x31a21ac9
hal fpga writed 0x281c 0x1ae84e84
hal fpga writed 0x281c 0x4eac64f8
hal fpga writed 0x281c 0x64d9312b
hal fpga writed 0x281c 0x31041b45
hal fpga writed 0x281c 0x1b644f23
hal fpga writed 0x281c 0x4f4a647c
hal fpga writed 0x281c 0x645d308d
hal fpga writed 0x281c 0x30661bc1
hal fpga writed 0x281c 0x1be14fc0
hal fpga writed 0x281c 0x4fe863ff
hal fpga writed 0x281c 0x63df2ff0
hal fpga writed 0x281c 0x2fc91c3f
hal fpga writed 0x281c 0x1c5f505d
hal fpga writed 0x281c 0x50846381
hal fpga writed 0x281c 0x63612f53
hal fpga writed 0x281c 0x2f2c1cbd
hal fpga writed 0x281c 0x1cdd50f9
hal fpga writed 0x281c 0x51206302
hal fpga writed 0x281c 0x62e22eb8
hal fpga writed 0x281c 0x2e911d3d
hal fpga writed 0x281c 0x1d5d5195
hal fpga writed 0x281c 0x51bb6282
hal fpga writed 0x281c 0x62622e1d
hal fpga writed 0x281c 0x2df61dbd
hal fpga writed 0x281c 0x1dde522f
hal fpga writed 0x281c 0x52566201
hal fpga writed 0x281c 0x61e12d83
hal fpga writed 0x281c 0x2d5c1e3f
hal fpga writed 0x281c 0x1e5f52c9
hal fpga writed 0x281c 0x52ef617f
hal fpga writed 0x281c 0x615f2ce9
hal fpga writed 0x281c 0x2cc31ec1
hal fpga writed 0x281c 0x1ee25362
hal fpga writed 0x281c 0x538860fd
hal fpga writed 0x281c 0x60dc2c51
hal fpga writed 0x281c 0x2c2b1f44
hal fpga writed 0x281c 0x1f6553fa
hal fpga writed 0x281c 0x54206079
hal fpga writed 0x281c 0x60582bb9
hal fpga writed 0x281c 0x2b931fc8
hal fpga writed 0x281c 0x1fe95491
hal fpga writed 0x281c 0x54b75ff4
hal fpga writed 0x281c 0x5fd32b22
hal fpga writed 0x281c 0x2afd204d
hal fpga writed 0x281c 0x206f5528
hal fpga writed 0x281c 0x554e5f6f
hal fpga writed 0x281c 0x5f4d2a8c
hal fpga writed 0x281c 0x2a6720d3
hal fpga writed 0x281c 0x20f555be
hal fpga writed 0x281c 0x55e35ee8
hal fpga writed 0x281c 0x5ec729f7
hal fpga writed 0x281c 0x29d2215a
hal fpga writed 0x281c 0x217c5653
hal fpga writed 0x281c 0x56785e61
hal fpga writed 0x281c 0x5e3f2962
hal fpga writed 0x281c 0x293d21e2
hal fpga writed 0x281c 0x220456e7
hal fpga writed 0x281c 0x570c5dd9
hal fpga writed 0x281c 0x5db728cf
hal fpga writed 0x281c 0x28aa226b
hal fpga writed 0x281c 0x228d577a
hal fpga writed 0x281c 0x579f5d50
hal fpga writed 0x281c 0x5d2d283c
hal fpga writed 0x281c 0x281722f4
hal fpga writed 0x281c 0x2317580c
hal fpga writed 0x281c 0x58315cc5
hal fpga writed 0x281c 0x5ca327aa
hal fpga writed 0x281c 0x2786237f
hal fpga writed 0x281c 0x23a2589e
hal fpga writed 0x281c 0x58c25c3a
hal fpga writed 0x281c 0x5c182719
hal fpga writed 0x281c 0x26f5240a
hal fpga writed 0x281c 0x242d592e
hal fpga writed 0x281c 0x59525baf
hal fpga writed 0x281c 0x5b8c2689
hal fpga writed 0x281c 0x26652497
hal fpga writed 0x281c 0x24ba59be
hal fpga writed 0x281c 0x59e25b22
hal fpga writed 0x281c 0x5aff25f9
hal fpga writed 0x281c 0x25d62524
hal fpga writed 0x281c 0x25475a4d
hal fpga writed 0x281c 0x5a715a94
hal fpga writed 0x2818 0x100
hal fpga writed 0x2824 0x1
hal fpga writed 0x2828 0x0000003a
hal fpga writed 0x2828 0x00007fac
hal fpga writed 0x2828 0x00000067
hal fpga writed 0x2828 0x7ffe7f87
hal fpga writed 0x2828 0x00010088
hal fpga writed 0x2828 0x7ffe7f69
hal fpga writed 0x2828 0x000200a4
hal fpga writed 0x2828 0x7ffd7f4e
hal fpga writed 0x2828 0x000200be
hal fpga writed 0x2828 0x7ffc7f34
hal fpga writed 0x2828 0x000300d7
hal fpga writed 0x2828 0x7ffb7f1c
hal fpga writed 0x2828 0x000400ef
hal fpga writed 0x2828 0x7ffa7f04
hal fpga writed 0x2828 0x00060106
hal fpga writed 0x2828 0x7ff97eed
hal fpga writed 0x2828 0x0007011d
hal fpga writed 0x2828 0x7ff77ed6
hal fpga writed 0x2828 0x00090134
hal fpga writed 0x2828 0x7ff67ec0
hal fpga writed 0x2828 0x000a014a
hal fpga writed 0x2828 0x7ff47ea9
hal fpga writed 0x2828 0x000c0161
hal fpga writed 0x2828 0x7ff27e93
hal fpga writed 0x2828 0x000e0177
hal fpga writed 0x2828 0x7ff07e7d
hal fpga writed 0x2828 0x0010018e
hal fpga writed 0x2828 0x7fee7e66
hal fpga writed 0x2828 0x001201a4
hal fpga writed 0x2828 0x7fec7e50
hal fpga writed 0x2828 0x001401bb
hal fpga writed 0x2828 0x7fe97e39
hal fpga writed 0x2828 0x001701d1
hal fpga writed 0x2828 0x7fe77e22
hal fpga writed 0x2828 0x001901e8
hal fpga writed 0x2828 0x7fe47e0c
hal fpga writed 0x2828 0x001c01ff
hal fpga writed 0x2828 0x7fe17df5
hal fpga writed 0x2828 0x001f0216
hal fpga writed 0x2828 0x7fde7ddd
hal fpga writed 0x2828 0x0022022d
hal fpga writed 0x2828 0x7fdb7dc6
hal fpga writed 0x2828 0x00250245
hal fpga writed 0x2828 0x7fd87dae
hal fpga writed 0x2828 0x0029025d
hal fpga writed 0x2828 0x7fd47d97
hal fpga writed 0x2828 0x002c0274
hal fpga writed 0x2828 0x7fd17d7f
hal fpga writed 0x2828 0x0030028d
hal fpga writed 0x2828 0x7fcd7d66
hal fpga writed 0x2828 0x003402a5
hal fpga writed 0x2828 0x7fc97d4e
hal fpga writed 0x2828 0x003802bd
hal fpga writed 0x2828 0x7fc57d35
hal fpga writed 0x2828 0x003c02d6
hal fpga writed 0x2828 0x7fc17d1c
hal fpga writed 0x2828 0x004102ef
hal fpga writed 0x2828 0x7fbc7d03
hal fpga writed 0x2828 0x00450309
hal fpga writed 0x2828 0x7fb77cea
hal fpga writed 0x2828 0x004a0322
hal fpga writed 0x2828 0x7fb37cd0
hal fpga writed 0x2828 0x004f033c
hal fpga writed 0x2828 0x7fad7cb6
hal fpga writed 0x2828 0x00540356
hal fpga writed 0x2828 0x7fa87c9c
hal fpga writed 0x2828 0x00590370
hal fpga writed 0x2828 0x7fa37c82
hal fpga writed 0x2828 0x005f038a
hal fpga writed 0x2828 0x7f9d7c67
hal fpga writed 0x2828 0x006503a5
hal fpga writed 0x2828 0x7f977c4c
hal fpga writed 0x2828 0x006a03c0
hal fpga writed 0x2828 0x7f917c31
hal fpga writed 0x2828 0x007103db
hal fpga writed 0x2828 0x7f8b7c16
hal fpga writed 0x2828 0x007703f7
hal fpga writed 0x2828 0x7f857bfa
hal fpga writed 0x2828 0x007d0413
hal fpga writed 0x2828 0x7f7e7bde
hal fpga writed 0x2828 0x0084042f
hal fpga writed 0x2828 0x7f787bc2
hal fpga writed 0x2828 0x008b044b
hal fpga writed 0x2828 0x7f717ba6
hal fpga writed 0x2828 0x00920467
hal fpga writed 0x2828 0x7f697b89
hal fpga writed 0x2828 0x00990484
hal fpga writed 0x2828 0x7f627b6d
hal fpga writed 0x2828 0x00a104a1
hal fpga writed 0x2828 0x7f5a7b4f
hal fpga writed 0x2828 0x00a904be
hal fpga writed 0x2828 0x7f527b32
hal fpga writed 0x2828 0x00b104dc
hal fpga writed 0x2828 0x7f4a7b14
hal fpga writed 0x2828 0x00b904f9
hal fpga writed 0x2828 0x7f427af7
hal fpga writed 0x2828 0x00c10517
hal fpga writed 0x2828 0x7f397ad8
hal fpga writed 0x2828 0x00ca0536
hal fpga writed 0x2828 0x7f317aba
hal fpga writed 0x2828 0x00d30554
hal fpga writed 0x2828 0x7f287a9c
hal fpga writed 0x2828 0x00dc0573
hal fpga writed 0x2828 0x7f1e7a7d
hal fpga writed 0x2828 0x00e50592
hal fpga writed 0x2828 0x7f157a5e
hal fpga writed 0x2828 0x00ef05b1
hal fpga writed 0x2828 0x7f0b7a3e
hal fpga writed 0x2828 0x00f905d0
hal fpga writed 0x2828 0x7f017a1f
hal fpga writed 0x2828 0x010305f0
hal fpga writed 0x2828 0x7ef779ff
hal fpga writed 0x2828 0x010d0610
hal fpga writed 0x2828 0x7eec79df
hal fpga writed 0x2828 0x01180630
hal fpga writed 0x2828 0x7ee279bf
hal fpga writed 0x2828 0x01230651
hal fpga writed 0x2828 0x7ed7799e
hal fpga writed 0x2828 0x012e0671
hal fpga writed 0x2828 0x7ecc797d
hal fpga writed 0x2828 0x01390692
hal fpga writed 0x2828 0x7ec0795c
hal fpga writed 0x2828 0x014506b3
hal fpga writed 0x2828 0x7eb4793b
hal fpga writed 0x2828 0x015106d5
hal fpga writed 0x2828 0x7ea8791a
hal fpga writed 0x2828 0x015d06f6
hal fpga writed 0x2828 0x7e9c78f8
hal fpga writed 0x2828 0x01690718
hal fpga writed 0x2828 0x7e8f78d6
hal fpga writed 0x2828 0x0176073a
hal fpga writed 0x2828 0x7e8378b4
hal fpga writed 0x2828 0x0183075c
hal fpga writed 0x2828 0x7e767892
hal fpga writed 0x2828 0x0190077f
hal fpga writed 0x2828 0x7e68786f
hal fpga writed 0x2828 0x019e07a1
hal fpga writed 0x2828 0x7e5b784c
hal fpga writed 0x2828 0x01ab07c4
hal fpga writed 0x2828 0x7e4d7829
hal fpga writed 0x2828 0x01b907e7
hal fpga writed 0x2828 0x7e3f7806
hal fpga writed 0x2828 0x01c8080a
hal fpga writed 0x2828 0x7e3077e3
hal fpga writed 0x2828 0x01d6082e
hal fpga writed 0x2828 0x7e2177bf
hal fpga writed 0x2828 0x01e50852
hal fpga writed 0x2828 0x7e12779b
hal fpga writed 0x2828 0x01f40876
hal fpga writed 0x2828 0x7e037777
hal fpga writed 0x2828 0x0204089a
hal fpga writed 0x2828 0x7df37753
hal fpga writed 0x2828 0x021308be
hal fpga writed 0x2828 0x7de4772f
hal fpga writed 0x2828 0x022408e2
hal fpga writed 0x2828 0x7dd3770a
hal fpga writed 0x2828 0x02340907
hal fpga writed 0x2828 0x7dc376e5
hal fpga writed 0x2828 0x0244092c
hal fpga writed 0x2828 0x7db276c1
hal fpga writed 0x2828 0x02550951
hal fpga writed 0x2828 0x7da1769b
hal fpga writed 0x2828 0x02670976
hal fpga writed 0x2828 0x7d907676
hal fpga writed 0x2828 0x0278099c
hal fpga writed 0x2828 0x7d7e7651
hal fpga writed 0x2828 0x028a09c1
hal fpga writed 0x2828 0x7d6c762b
hal fpga writed 0x2828 0x029c09e7
hal fpga writed 0x2828 0x7d5a7605
hal fpga writed 0x2828 0x02af0a0d
hal fpga writed 0x2828 0x7d4775df
hal fpga writed 0x2828 0x02c10a33
hal fpga writed 0x2828 0x7d3475b9
hal fpga writed 0x2828 0x02d40a59
hal fpga writed 0x2828 0x7d217593
hal fpga writed 0x2828 0x02e80a80
hal fpga writed 0x2828 0x7d0d756c
hal fpga writed 0x2828 0x02fb0aa6
hal fpga writed 0x2828 0x7cfa7545
hal fpga writed 0x2828 0x030f0acd
hal fpga writed 0x2828 0x7ce5751f
hal fpga writed 0x2828 0x03240af4
hal fpga writed 0x2828 0x7cd174f8
hal fpga writed 0x2828 0x03380b1b
hal fpga writed 0x2828 0x7cbc74d1
hal fpga writed 0x2828 0x034d0b42
hal fpga writed 0x2828 0x7ca774a9
hal fpga writed 0x2828 0x03630b69
hal fpga writed 0x2828 0x7c927482
hal fpga writed 0x2828 0x03780b91
hal fpga writed 0x2828 0x7c7c745a
hal fpga writed 0x2828 0x038e0bb8
hal fpga writed 0x2828 0x7c667433
hal fpga writed 0x2828 0x03a40be0
hal fpga writed 0x2828 0x7c4f740b
hal fpga writed 0x2828 0x03bb0c08
hal fpga writed 0x2828 0x7c3973e3
hal fpga writed 0x2828 0x03d20c30
hal fpga writed 0x2828 0x7c2273bb
hal fpga writed 0x2828 0x03e90c58
hal fpga writed 0x2828 0x7c0a7393
hal fpga writed 0x2828 0x04010c80
hal fpga writed 0x2828 0x7bf2736b
hal fpga writed 0x2828 0x04180ca8
hal fpga writed 0x2828 0x7bda7342
hal fpga writed 0x2828 0x04310cd1
hal fpga writed 0x2828 0x7bc2731a
hal fpga writed 0x2828 0x04490cf9
hal fpga writed 0x2828 0x7ba972f1
hal fpga writed 0x2828 0x04620d22
hal fpga writed 0x2828 0x7b9072c9
hal fpga writed 0x2828 0x047b0d4b
hal fpga writed 0x2828 0x7b7772a0
hal fpga writed 0x2828 0x04950d73
hal fpga writed 0x2828 0x7b5d7277
hal fpga writed 0x2828 0x04af0d9c
hal fpga writed 0x2828 0x7b43724e
hal fpga writed 0x2828 0x04c90dc5
hal fpga writed 0x2828 0x7b297225
hal fpga writed 0x2828 0x04e30dee
hal fpga writed 0x2828 0x7b0e71fc
hal fpga writed 0x2828 0x04fe0e18
hal fpga writed 0x2828 0x7af371d3
hal fpga writed 0x2828 0x051a0e41
hal fpga writed 0x2828 0x7ad871aa
hal fpga writed 0x2828 0x05350e6a
hal fpga writed 0x2828 0x7abc7180
hal fpga writed 0x2828 0x05510e93
hal fpga writed 0x2828 0x7aa07157
hal fpga writed 0x2828 0x056d0ebd
hal fpga writed 0x2828 0x7a84712e
hal fpga writed 0x2828 0x058a0ee6
hal fpga writed 0x2828 0x7a677104
hal fpga writed 0x2828 0x05a70f10
hal fpga writed 0x2828 0x7a4a70db
hal fpga writed 0x2828 0x05c40f39
hal fpga writed 0x2828 0x7a2c70b1
hal fpga writed 0x2828 0x05e20f63
hal fpga writed 0x2828 0x7a0f7087
hal fpga writed 0x2828 0x05ff0f8c
hal fpga writed 0x2828 0x79f0705e
hal fpga writed 0x2828 0x061e0fb6
hal fpga writed 0x2828 0x79d27034
hal fpga writed 0x2828 0x063c0fe0
hal fpga writed 0x2828 0x79b3700a
hal fpga writed 0x2828 0x065b100a
hal fpga writed 0x2828 0x79946fe1
hal fpga writed 0x2828 0x067b1033
hal fpga writed 0x2828 0x79756fb7
hal fpga writed 0x2828 0x069a105d
hal fpga writed 0x2828 0x79556f8d
hal fpga writed 0x2828 0x06ba1087
hal fpga writed 0x2828 0x79356f63
hal fpga writed 0x2828 0x06da10b1
hal fpga writed 0x2828 0x79146f39
hal fpga writed 0x2828 0x06fb10da
hal fpga writed 0x2828 0x78f36f10
hal fpga writed 0x2828 0x071c1104
hal fpga writed 0x2828 0x78d26ee6
hal fpga writed 0x2828 0x073d112e
hal fpga writed 0x2828 0x78b16ebc
hal fpga writed 0x2828 0x075f1158
hal fpga writed 0x2828 0x788f6e92
hal fpga writed 0x2828 0x07811182
hal fpga writed 0x2828 0x786d6e68
hal fpga writed 0x2828 0x07a311ab
hal fpga writed 0x2828 0x784a6e3f
hal fpga writed 0x2828 0x07c611d5
hal fpga writed 0x2828 0x78276e15
hal fpga writed 0x2828 0x07e911ff
hal fpga writed 0x2828 0x78046deb
hal fpga writed 0x2828 0x080d1229
hal fpga writed 0x2828 0x77e16dc2
hal fpga writed 0x2828 0x08301252
hal fpga writed 0x2828 0x77bd6d98
hal fpga writed 0x2828 0x0854127c
hal fpga writed 0x2828 0x77996d6e
hal fpga writed 0x2828 0x087912a5
hal fpga writed 0x2828 0x77746d45
hal fpga writed 0x2828 0x089d12cf
hal fpga writed 0x2828 0x774f6d1b
hal fpga writed 0x2828 0x08c212f8
hal fpga writed 0x2828 0x772a6cf2
hal fpga writed 0x2828 0x08e81322
hal fpga writed 0x2828 0x77046cc9
hal fpga writed 0x2828 0x090e134b
hal fpga writed 0x2828 0x76de6c9f
hal fpga writed 0x2828 0x09341374
hal fpga writed 0x2828 0x76b86c76
hal fpga writed 0x2828 0x095a139e
hal fpga writed 0x2828 0x76926c4d
hal fpga writed 0x2828 0x098113c7
hal fpga writed 0x2828 0x766b6c24
hal fpga writed 0x2828 0x09a813f0
hal fpga writed 0x2828 0x76446bfb
hal fpga writed 0x2828 0x09cf1419
hal fpga writed 0x2828 0x761c6bd2
hal fpga writed 0x2828 0x09f71442
hal fpga writed 0x2828 0x75f46ba9
hal fpga writed 0x2828 0x0a1f146b
hal fpga writed 0x2828 0x75cc6b80
hal fpga writed 0x2828 0x0a471493
hal fpga writed 0x2828 0x75a46b57
hal fpga writed 0x2828 0x0a7014bc
hal fpga writed 0x2828 0x757b6b2f
hal fpga writed 0x2828 0x0a9914e4
hal fpga writed 0x2828 0x75526b06
hal fpga writed 0x2828 0x0ac2150d
hal fpga writed 0x2828 0x75286ade
hal fpga writed 0x2828 0x0aec1535
hal fpga writed 0x2828 0x74fe6ab6
hal fpga writed 0x2828 0x0b16155d
hal fpga writed 0x2828 0x74d46a8e
hal fpga writed 0x2828 0x0b401585
hal fpga writed 0x2828 0x74aa6a66
hal fpga writed 0x2828 0x0b6a15ad
hal fpga writed 0x2828 0x747f6a3e
hal fpga writed 0x2828 0x0b9515d5
hal fpga writed 0x2828 0x74546a16
hal fpga writed 0x2828 0x0bc015fc
hal fpga writed 0x2828 0x742969ef
hal fpga writed 0x2828 0x0bec1624
hal fpga writed 0x2828 0x73fd69c7
hal fpga writed 0x2828 0x0c18164b
hal fpga writed 0x2828 0x73d169a0
hal fpga writed 0x2828 0x0c441673
hal fpga writed 0x2828 0x73a56979
hal fpga writed 0x2828 0x0c70169a
hal fpga writed 0x2828 0x73786952
hal fpga writed 0x2828 0x0c9d16c0
hal fpga writed 0x2828 0x734b692b
hal fpga writed 0x2828 0x0cca16e7
hal fpga writed 0x2828 0x731e6905
hal fpga writed 0x2828 0x0cf7170e
hal fpga writed 0x2828 0x72f168de
hal fpga writed 0x2828 0x0d251734
hal fpga writed 0x2828 0x72c368b8
hal fpga writed 0x2828 0x0d53175a
hal fpga writed 0x2828 0x72956892
hal fpga writed 0x2828 0x0d811780
hal fpga writed 0x2828 0x7267686c
hal fpga writed 0x2828 0x0db017a6
hal fpga writed 0x2828 0x72386846
hal fpga writed 0x2828 0x0dde17cc
hal fpga writed 0x2828 0x72096820
hal fpga writed 0x2828 0x0e0d17f1
hal fpga writed 0x2828 0x71da67fb
hal fpga writed 0x2828 0x0e3d1817
hal fpga writed 0x2828 0x71aa67d6
hal fpga writed 0x2828 0x0e6c183c
hal fpga writed 0x2828 0x717b67b1
hal fpga writed 0x2828 0x0e9c1860
hal fpga writed 0x2828 0x714b678c
hal fpga writed 0x2828 0x0ecd1885
hal fpga writed 0x2828 0x711a6768
hal fpga writed 0x2828 0x0efd18a9
hal fpga writed 0x2828 0x70ea6743
hal fpga writed 0x2828 0x0f2e18ce
hal fpga writed 0x2828 0x70b9671f
hal fpga writed 0x2828 0x0f5f18f2
hal fpga writed 0x2828 0x708866fb
hal fpga writed 0x2828 0x0f901915
hal fpga writed 0x2828 0x705666d8
hal fpga writed 0x2828 0x0fc21939
hal fpga writed 0x2828 0x702566b4
hal fpga writed 0x2828 0x0ff3195c
hal fpga writed 0x2828 0x6ff36691
hal fpga writed 0x2828 0x1025197f
hal fpga writed 0x2828 0x6fc1666e
hal fpga writed 0x2828 0x105819a2
hal fpga writed 0x2828 0x6f8e664c
hal fpga writed 0x2828 0x108a19c5
hal fpga writed 0x2828 0x6f5b6629
hal fpga writed 0x2828 0x10bd19e7
hal fpga writed 0x2828 0x6f286607
hal fpga writed 0x2828 0x10f01a09
hal fpga writed 0x2828 0x6ef565e5
hal fpga writed 0x2828 0x11231a2b
hal fpga writed 0x2828 0x6ec265c3
hal fpga writed 0x2828 0x11571a4c
hal fpga writed 0x2828 0x6e8e65a2
hal fpga writed 0x2828 0x118b1a6e
hal fpga writed 0x2828 0x6e5a6581
hal fpga writed 0x2828 0x11bf1a8f
hal fpga writed 0x2828 0x6e266560
hal fpga writed 0x2828 0x11f31aaf
hal fpga writed 0x2828 0x6df2653f
hal fpga writed 0x2828 0x12271ad0
hal fpga writed 0x2828 0x6dbd651f
hal fpga writed 0x2828 0x125c1af0
hal fpga writed 0x2828 0x6d8864ff
hal fpga writed 0x2828 0x12911b10
hal fpga writed 0x2828 0x6d5364df
hal fpga writed 0x2828 0x12c61b2f
hal fpga writed 0x2828 0x6d1e64c0
hal fpga writed 0x2828 0x12fb1b4f
hal fpga writed 0x2828 0x6ce964a1
hal fpga writed 0x2828 0x13311b6e
hal fpga writed 0x2828 0x6cb36482
hal fpga writed 0x2828 0x13671b8c
hal fpga writed 0x2828 0x6c7d6463
hal fpga writed 0x2828 0x139d1bab
hal fpga writed 0x2828 0x6c476445
hal fpga writed 0x2828 0x13d31bc9
hal fpga writed 0x2828 0x6c116427
hal fpga writed 0x2828 0x14091be7
hal fpga writed 0x2828 0x6bda640a
hal fpga writed 0x2828 0x14401c04
hal fpga writed 0x2828 0x6ba463ec
hal fpga writed 0x2828 0x14771c21
hal fpga writed 0x2828 0x6b6d63cf
hal fpga writed 0x2828 0x14ae1c3e
hal fpga writed 0x2828 0x6b3663b3
hal fpga writed 0x2828 0x14e51c5b
hal fpga writed 0x2828 0x6afe6396
hal fpga writed 0x2828 0x151c1c77
hal fpga writed 0x2828 0x6ac7637a
hal fpga writed 0x2828 0x15541c93
hal fpga writed 0x2828 0x6a8f635f
hal fpga writed 0x2828 0x158b1cae
hal fpga writed 0x2828 0x6a586343
hal fpga writed 0x2828 0x15c31cc9
hal fpga writed 0x2828 0x6a206328
hal fpga writed 0x2828 0x15fb1ce4
hal fpga writed 0x2828 0x69e8630e
hal fpga writed 0x2828 0x16331cff
hal fpga writed 0x2828 0x69af62f3
hal fpga writed 0x2828 0x166c1d19
hal fpga writed 0x2828 0x697762d9
hal fpga writed 0x2828 0x16a41d33
hal fpga writed 0x2828 0x693e62c0
hal fpga writed 0x2828 0x16dd1d4c
hal fpga writed 0x2828 0x690662a6
hal fpga writed 0x2828 0x17161d65
hal fpga writed 0x2828 0x68cd628e
hal fpga writed 0x2828 0x174f1d7e
hal fpga writed 0x2828 0x68946275
hal fpga writed 0x2828 0x17881d96
hal fpga writed 0x2828 0x685a625d
hal fpga writed 0x2828 0x17c11dae
hal fpga writed 0x2828 0x68216245
hal fpga writed 0x2828 0x17fb1dc6
hal fpga writed 0x2828 0x67e8622e
hal fpga writed 0x2828 0x18341ddd
hal fpga writed 0x2828 0x67ae6216
hal fpga writed 0x2828 0x186e1df4
hal fpga writed 0x2828 0x67746200
hal fpga writed 0x2828 0x18a71e0a
hal fpga writed 0x2828 0x673b61e9
hal fpga writed 0x2828 0x18e11e21
hal fpga writed 0x2828 0x670161d3
hal fpga writed 0x2828 0x191b1e36
hal fpga writed 0x2828 0x66c761be
hal fpga writed 0x2828 0x19551e4c
hal fpga writed 0x2828 0x668d61a9
hal fpga writed 0x2828 0x19901e61
hal fpga writed 0x2828 0x66526194
hal fpga writed 0x2828 0x19ca1e75
hal fpga writed 0x2828 0x6618617f
hal fpga writed 0x2828 0x1a041e8a
hal fpga writed 0x2828 0x65dd616b
hal fpga writed 0x2828 0x1a3f1e9d
hal fpga writed 0x2828 0x65a36158
hal fpga writed 0x2828 0x1a791eb1
hal fpga writed 0x2828 0x65686145
hal fpga writed 0x2828 0x1ab41ec4
hal fpga writed 0x2828 0x652e6132
hal fpga writed 0x2828 0x1aef1ed7
hal fpga writed 0x2828 0x64f3611f
hal fpga writed 0x2828 0x1b2a1ee9
hal fpga writed 0x2828 0x64b8610d
hal fpga writed 0x2828 0x1b651efb
hal fpga writed 0x2828 0x647d60fc
hal fpga writed 0x2828 0x1ba01f0c
hal fpga writed 0x2828 0x644260ea
hal fpga writed 0x2828 0x1bdb1f1d
hal fpga writed 0x2828 0x640760d9
hal fpga writed 0x2828 0x1c161f2e
hal fpga writed 0x2828 0x63cc60c9
hal fpga writed 0x2828 0x1c511f3e
hal fpga writed 0x2828 0x639060b9
hal fpga writed 0x2828 0x1c8c1f4e
hal fpga writed 0x2828 0x635560a9
hal fpga writed 0x2828 0x1cc81f5d
hal fpga writed 0x2828 0x631a609a
hal fpga writed 0x2828 0x1d031f6c
hal fpga writed 0x2828 0x62de608b
hal fpga writed 0x2828 0x1d3e1f7b
hal fpga writed 0x2828 0x62a3607d
hal fpga writed 0x2828 0x1d7a1f89
hal fpga writed 0x2828 0x6268606f
hal fpga writed 0x2828 0x1db51f97
hal fpga writed 0x2828 0x622c6062
hal fpga writed 0x2828 0x1df11fa4
hal fpga writed 0x2828 0x61f16054
hal fpga writed 0x2828 0x1e2c1fb1
hal fpga writed 0x2828 0x61b56048
hal fpga writed 0x2828 0x1e681fbd
hal fpga writed 0x2828 0x617a603c
hal fpga writed 0x2828 0x1ea31fc9
hal fpga writed 0x2828 0x613e6030
hal fpga writed 0x2828 0x1edf1fd5
hal fpga writed 0x2828 0x61026024
hal fpga writed 0x2828 0x1f1a1fe0
hal fpga writed 0x2828 0x60c76019
hal fpga writed 0x2828 0x1f561feb
hal fpga writed 0x2828 0x608b600f
hal fpga writed 0x2828 0x1f911ff5
hal fpga writed 0x2828 0x60506005
hal fpga writed 0x2828 0x1fcd1fff
hal fpga writed 0x2828 0x60145ffb
hal fpga writed 0x2828 0x20092009
hal fpga writed 0x2828 0x5fd95ff2
hal fpga writed 0x2828 0x20442012
hal fpga writed 0x2828 0x5f9d5fe9
hal fpga writed 0x2828 0x2080201a
hal fpga writed 0x2828 0x5f625fe1
hal fpga writed 0x2828 0x20bb2022
hal fpga writed 0x2828 0x5f265fd9
hal fpga writed 0x2828 0x20f7202a
hal fpga writed 0x2828 0x5eeb5fd1
hal fpga writed 0x2828 0x21322031
hal fpga writed 0x2828 0x5eaf5fca
hal fpga writed 0x2828 0x216e2038
hal fpga writed 0x2828 0x5e745fc4
hal fpga writed 0x2828 0x21a9203f
hal fpga writed 0x2828 0x5e385fbd
hal fpga writed 0x2828 0x21e42045
hal fpga writed 0x2828 0x5dfd5fb8
hal fpga writed 0x2828 0x2220204a
hal fpga writed 0x2828 0x5dc25fb2
hal fpga writed 0x2828 0x225b204f
hal fpga writed 0x2828 0x5d865fad
hal fpga writed 0x2828 0x22962054
hal fpga writed 0x2828 0x5d4b5fa9
hal fpga writed 0x2828 0x22d12058
hal fpga writed 0x2828 0x5d105fa5
hal fpga writed 0x2828 0x230c205c
hal fpga writed 0x2828 0x5cd55fa1
hal fpga writed 0x2828 0x2347205f
hal fpga writed 0x2828 0x5c9a5f9e
hal fpga writed 0x2828 0x23822062
hal fpga writed 0x2828 0x5c5f5f9c
hal fpga writed 0x2828 0x23bd2064
hal fpga writed 0x2828 0x5c245f99
hal fpga writed 0x2828 0x23f82066
hal fpga writed 0x2828 0x5be95f98
hal fpga writed 0x2828 0x24332068
hal fpga writed 0x2828 0x5baf5f96
hal fpga writed 0x2828 0x246e2069
hal fpga writed 0x2828 0x5b745f95
hal fpga writed 0x2828 0x24a8206a
hal fpga writed 0x2828 0x5b3a5f95
hal fpga writed 0x2828 0x24e3206a
hal fpga writed 0x2828 0x5aff5f95
hal fpga writed 0x2828 0x251d206a
hal fpga writed 0x2828 0x5ac55f95
hal fpga writed 0x2828 0x25572069
hal fpga writed 0x2828 0x5a8b5f96
hal fpga writed 0x2828 0x25912068
hal fpga writed 0x2828 0x5a515f98
hal fpga writed 0x2828 0x25cb2066
hal fpga writed 0x2828 0x5a175f99
hal fpga writed 0x2828 0x26052065
hal fpga writed 0x2828 0x59dd5f9c
hal fpga writed 0x2828 0x263f2062
hal fpga writed 0x2828 0x59a35f9e
hal fpga writed 0x2828 0x2679205f
hal fpga writed 0x2828 0x59695fa1
hal fpga writed 0x2828 0x26b3205c
hal fpga writed 0x2828 0x59305fa5
hal fpga writed 0x2828 0x26ec2058
hal fpga writed 0x2828 0x58f65fa9
hal fpga writed 0x2828 0x27252054
hal fpga writed 0x2828 0x58bd5fad
hal fpga writed 0x2828 0x275f204f
hal fpga writed 0x2828 0x58845fb2
hal fpga writed 0x2828 0x2798204a
hal fpga writed 0x2828 0x584b5fb7
hal fpga writed 0x2828 0x27d12045
hal fpga writed 0x2828 0x58125fbd
hal fpga writed 0x2828 0x2809203f
hal fpga writed 0x2828 0x57d95fc3
hal fpga writed 0x2828 0x28422038
hal fpga writed 0x2828 0x57a15fca
hal fpga writed 0x2828 0x287b2032
hal fpga writed 0x2828 0x57685fd1
hal fpga writed 0x2828 0x28b3202a
hal fpga writed 0x2828 0x57305fd8
hal fpga writed 0x2828 0x28eb2023
hal fpga writed 0x2828 0x56f85fe0
hal fpga writed 0x2828 0x2923201b
hal fpga writed 0x2828 0x56c05fe9
hal fpga writed 0x2828 0x295b2012
hal fpga writed 0x2828 0x56885ff1
hal fpga writed 0x2828 0x29932009
hal fpga writed 0x2828 0x56515ffb
hal fpga writed 0x2828 0x29ca2000
hal fpga writed 0x2828 0x56196004
hal fpga writed 0x2828 0x2a011ff6
hal fpga writed 0x2828 0x55e2600e
hal fpga writed 0x2828 0x2a391fec
hal fpga writed 0x2828 0x55ab6019
hal fpga writed 0x2828 0x2a701fe1
hal fpga writed 0x2828 0x55746024
hal fpga writed 0x2828 0x2aa61fd6
hal fpga writed 0x2828 0x553d602f
hal fpga writed 0x2828 0x2add1fca
hal fpga writed 0x2828 0x5507603b
hal fpga writed 0x2828 0x2b131fbe
hal fpga writed 0x2828 0x54d06047
hal fpga writed 0x2828 0x2b4a1fb2
hal fpga writed 0x2828 0x549a6054
hal fpga writed 0x2828 0x2b801fa5
hal fpga writed 0x2828 0x54646061
hal fpga writed 0x2828 0x2bb51f98
hal fpga writed 0x2828 0x542f606e
hal fpga writed 0x2828 0x2beb1f8a
hal fpga writed 0x2828 0x53f9607c
hal fpga writed 0x2828 0x2c201f7c
hal fpga writed 0x2828 0x53c4608a
hal fpga writed 0x2828 0x2c561f6e
hal fpga writed 0x2828 0x538f6099
hal fpga writed 0x2828 0x2c8b1f5f
hal fpga writed 0x2828 0x535a60a8
hal fpga writed 0x2828 0x2cbf1f4f
hal fpga writed 0x2828 0x532560b7
hal fpga writed 0x2828 0x2cf41f40
hal fpga writed 0x2828 0x52f160c7
hal fpga writed 0x2828 0x2d281f30
hal fpga writed 0x2828 0x52bd60d8
hal fpga writed 0x2828 0x2d5c1f1f
hal fpga writed 0x2828 0x528960e8
hal fpga writed 0x2828 0x2d901f0e
hal fpga writed 0x2828 0x525560fa
hal fpga writed 0x2828 0x2dc41efd
hal fpga writed 0x2828 0x5221610b
hal fpga writed 0x2828 0x2df71eeb
hal fpga writed 0x2828 0x51ee611d
hal fpga writed 0x2828 0x2e2b1ed9
hal fpga writed 0x2828 0x51bb612f
hal fpga writed 0x2828 0x2e5d1ec6
hal fpga writed 0x2828 0x51886142
hal fpga writed 0x2828 0x2e901eb3
hal fpga writed 0x2828 0x51566155
hal fpga writed 0x2828 0x2ec31ea0
hal fpga writed 0x2828 0x51236169
hal fpga writed 0x2828 0x2ef51e8c
hal fpga writed 0x2828 0x50f1617d
hal fpga writed 0x2828 0x2f271e78
hal fpga writed 0x2828 0x50bf6191
hal fpga writed 0x2828 0x2f591e64
hal fpga writed 0x2828 0x508e61a6
hal fpga writed 0x2828 0x2f8a1e4f
hal fpga writed 0x2828 0x505c61bb
hal fpga writed 0x2828 0x2fbb1e3a
hal fpga writed 0x2828 0x502b61d0
hal fpga writed 0x2828 0x2fec1e24
hal fpga writed 0x2828 0x4ffb61e6
hal fpga writed 0x2828 0x301d1e0e
hal fpga writed 0x2828 0x4fca61fc
hal fpga writed 0x2828 0x304d1df8
hal fpga writed 0x2828 0x4f9a6213
hal fpga writed 0x2828 0x307d1de1
hal fpga writed 0x2828 0x4f6a622a
hal fpga writed 0x2828 0x30ad1dca
hal fpga writed 0x2828 0x4f3a6241
hal fpga writed 0x2828 0x30dd1db2
hal fpga writed 0x2828 0x4f0a6259
hal fpga writed 0x2828 0x310c1d9a
hal fpga writed 0x2828 0x4edb6271
hal fpga writed 0x2828 0x313b1d82
hal fpga writed 0x2828 0x4eac6289
hal fpga writed 0x2828 0x316a1d6a
hal fpga writed 0x2828 0x4e7e62a2
hal fpga writed 0x2828 0x31991d51
hal fpga writed 0x2828 0x4e4f62bb
hal fpga writed 0x2828 0x31c71d37
hal fpga writed 0x2828 0x4e2162d4
hal fpga writed 0x2828 0x31f51d1e
hal fpga writed 0x2828 0x4df362ee
hal fpga writed 0x2828 0x32231d04
hal fpga writed 0x2828 0x4dc66309
hal fpga writed 0x2828 0x32501ce9
hal fpga writed 0x2828 0x4d986323
hal fpga writed 0x2828 0x327d1ccf
hal fpga writed 0x2828 0x4d6b633e
hal fpga writed 0x2828 0x32aa1cb3
hal fpga writed 0x2828 0x4d3f6359
hal fpga writed 0x2828 0x32d71c98
hal fpga writed 0x2828 0x4d126375
hal fpga writed 0x2828 0x33031c7c
hal fpga writed 0x2828 0x4ce66391
hal fpga writed 0x2828 0x332f1c60
hal fpga writed 0x2828 0x4cba63ad
hal fpga writed 0x2828 0x335b1c44
hal fpga writed 0x2828 0x4c8f63ca
hal fpga writed 0x2828 0x33861c27
hal fpga writed 0x2828 0x4c6363e6
hal fpga writed 0x2828 0x33b11c0a
hal fpga writed 0x2828 0x4c386404
hal fpga writed 0x2828 0x33dc1bed
hal fpga writed 0x2828 0x4c0e6421
hal fpga writed 0x2828 0x34061bcf
hal fpga writed 0x2828 0x4be3643f
hal fpga writed 0x2828 0x34311bb1
hal fpga writed 0x2828 0x4bb9645d
hal fpga writed 0x2828 0x345a1b92
hal fpga writed 0x2828 0x4b90647c
hal fpga writed 0x2828 0x34841b74
hal fpga writed 0x2828 0x4b66649b
hal fpga writed 0x2828 0x34ad1b55
hal fpga writed 0x2828 0x4b3d64ba
hal fpga writed 0x2828 0x34d61b35
hal fpga writed 0x2828 0x4b1464d9
hal fpga writed 0x2828 0x34ff1b16
hal fpga writed 0x2828 0x4aec64f9
hal fpga writed 0x2828 0x35271af6
hal fpga writed 0x2828 0x4ac36519
hal fpga writed 0x2828 0x35501ad6
hal fpga writed 0x2828 0x4a9c653a
hal fpga writed 0x2828 0x35771ab5
hal fpga writed 0x2828 0x4a74655a
hal fpga writed 0x2828 0x359f1a94
hal fpga writed 0x2828 0x4a4d657b
hal fpga writed 0x2828 0x35c61a73
hal fpga writed 0x2828 0x4a26659d
hal fpga writed 0x2828 0x35ed1a52
hal fpga writed 0x2828 0x49ff65be
hal fpga writed 0x2828 0x36131a30
hal fpga writed 0x2828 0x49d865e0
hal fpga writed 0x2828 0x363a1a0e
hal fpga writed 0x2828 0x49b26602
hal fpga writed 0x2828 0x365f19ec
hal fpga writed 0x2828 0x498d6624
hal fpga writed 0x2828 0x368519c9
hal fpga writed 0x2828 0x49676647
hal fpga writed 0x2828 0x36aa19a6
hal fpga writed 0x2828 0x4942666a
hal fpga writed 0x2828 0x36cf1983
hal fpga writed 0x2828 0x491d668d
hal fpga writed 0x2828 0x36f41960
hal fpga writed 0x2828 0x48f966b1
hal fpga writed 0x2828 0x3718193c
hal fpga writed 0x2828 0x48d566d5
hal fpga writed 0x2828 0x373c1918
hal fpga writed 0x2828 0x48b166f9
hal fpga writed 0x2828 0x376018f4
hal fpga writed 0x2828 0x488d671d
hal fpga writed 0x2828 0x378418d0
hal fpga writed 0x2828 0x486a6742
hal fpga writed 0x2828 0x37a718ab
hal fpga writed 0x2828 0x48476766
hal fpga writed 0x2828 0x37c91886
hal fpga writed 0x2828 0x4824678b
hal fpga writed 0x2828 0x37ec1861
hal fpga writed 0x2828 0x480267b1
hal fpga writed 0x2828 0x380e183c
hal fpga writed 0x2828 0x47e067d6
hal fpga writed 0x2828 0x38301816
hal fpga writed 0x2828 0x47be67fc
hal fpga writed 0x2828 0x385117f0
hal fpga writed 0x2828 0x479d6822
hal fpga writed 0x2828 0x387317ca
hal fpga writed 0x2828 0x477c6848
hal fpga writed 0x2828 0x389317a3
hal fpga writed 0x2828 0x475b686f
hal fpga writed 0x2828 0x38b4177d
hal fpga writed 0x2828 0x473b6896
hal fpga writed 0x2828 0x38d41756
hal fpga writed 0x2828 0x471b68bd
hal fpga writed 0x2828 0x38f4172f
hal fpga writed 0x2828 0x46fb68e4
hal fpga writed 0x2828 0x39141707
hal fpga writed 0x2828 0x46dc690b
hal fpga writed 0x2828 0x393316e0
hal fpga writed 0x2828 0x46bc6933
hal fpga writed 0x2828 0x395216b8
hal fpga writed 0x2828 0x469e695b
hal fpga writed 0x2828 0x39711690
hal fpga writed 0x2828 0x467f6983
hal fpga writed 0x2828 0x398f1668
hal fpga writed 0x2828 0x466169ab
hal fpga writed 0x2828 0x39ad1640
hal fpga writed 0x2828 0x464369d4
hal fpga writed 0x2828 0x39cb1617
hal fpga writed 0x2828 0x462669fd
hal fpga writed 0x2828 0x39e815ee
hal fpga writed 0x2828 0x46086a25
hal fpga writed 0x2828 0x3a0515c5
hal fpga writed 0x2828 0x45eb6a4f
hal fpga writed 0x2828 0x3a22159c
hal fpga writed 0x2828 0x45cf6a78
hal fpga writed 0x2828 0x3a3e1572
hal fpga writed 0x2828 0x45b26aa1
hal fpga writed 0x2828 0x3a5b1549
hal fpga writed 0x2828 0x45966acb
hal fpga writed 0x2828 0x3a76151f
hal fpga writed 0x2828 0x457b6af5
hal fpga writed 0x2828 0x3a9214f5
hal fpga writed 0x2828 0x455f6b1f
hal fpga writed 0x2828 0x3aad14cb
hal fpga writed 0x2828 0x45446b49
hal fpga writed 0x2828 0x3ac814a0
hal fpga writed 0x2828 0x452a6b74
hal fpga writed 0x2828 0x3ae31476
hal fpga writed 0x2828 0x450f6b9f
hal fpga writed 0x2828 0x3afd144b
hal fpga writed 0x2828 0x44f56bc9
hal fpga writed 0x2828 0x3b171420
hal fpga writed 0x2828 0x44db6bf4
hal fpga writed 0x2828 0x3b3113f5
hal fpga writed 0x2828 0x44c26c1f
hal fpga writed 0x2828 0x3b4a13ca
hal fpga writed 0x2828 0x44a86c4b
hal fpga writed 0x2828 0x3b63139e
hal fpga writed 0x2828 0x448f6c76
hal fpga writed 0x2828 0x3b7c1373
hal fpga writed 0x2828 0x44776ca2
hal fpga writed 0x2828 0x3b941347
hal fpga writed 0x2828 0x445e6cce
hal fpga writed 0x2828 0x3bad131b
hal fpga writed 0x2828 0x44466cfa
hal fpga writed 0x2828 0x3bc412ef
hal fpga writed 0x2828 0x442f6d26
hal fpga writed 0x2828 0x3bdc12c3
hal fpga writed 0x2828 0x44176d52
hal fpga writed 0x2828 0x3bf31297
hal fpga writed 0x2828 0x44006d7f
hal fpga writed 0x2828 0x3c0a126a
hal fpga writed 0x2828 0x43e96dab
hal fpga writed 0x2828 0x3c21123d
hal fpga writed 0x2828 0x43d36dd8
hal fpga writed 0x2828 0x3c371211
hal fpga writed 0x2828 0x43bd6e05
hal fpga writed 0x2828 0x3c4d11e4
hal fpga writed 0x2828 0x43a76e32
hal fpga writed 0x2828 0x3c6311b7
hal fpga writed 0x2828 0x43916e5f
hal fpga writed 0x2828 0x3c791189
hal fpga writed 0x2828 0x437c6e8c
hal fpga writed 0x2828 0x3c8e115c
hal fpga writed 0x2828 0x43676eba
hal fpga writed 0x2828 0x3ca3112e
hal fpga writed 0x2828 0x43526ee7
hal fpga writed 0x2828 0x3cb71101
hal fpga writed 0x2828 0x433e6f15
hal fpga writed 0x2828 0x3ccc10d3
hal fpga writed 0x2828 0x43296f43
hal fpga writed 0x2828 0x3ce010a5
hal fpga writed 0x2828 0x43156f71
hal fpga writed 0x2828 0x3cf31077
hal fpga writed 0x2828 0x43026f9f
hal fpga writed 0x2828 0x3d071049
hal fpga writed 0x2828 0x42ef6fcd
hal fpga writed 0x2828 0x3d1a101b
hal fpga writed 0x2828 0x42db6ffb
hal fpga writed 0x2828 0x3d2d0fec
hal fpga writed 0x2828 0x42c9702a
hal fpga writed 0x2828 0x3d400fbe
hal fpga writed 0x2828 0x42b67058
hal fpga writed 0x2828 0x3d520f8f
hal fpga writed 0x2828 0x42a47087
hal fpga writed 0x2828 0x3d640f61
hal fpga writed 0x2828 0x429270b6
hal fpga writed 0x2828 0x3d760f32
hal fpga writed 0x2828 0x428070e5
hal fpga writed 0x2828 0x3d870f03
hal fpga writed 0x2828 0x426f7114
hal fpga writed 0x2828 0x3d980ed4
hal fpga writed 0x2828 0x425e7143
hal fpga writed 0x2828 0x3da90ea5
hal fpga writed 0x2828 0x424d7172
hal fpga writed 0x2828 0x3dba0e76
hal fpga writed 0x2828 0x423d71a1
hal fpga writed 0x2828 0x3dcb0e46
hal fpga writed 0x2828 0x422c71d0
hal fpga writed 0x2828 0x3ddb0e17
hal fpga writed 0x2828 0x421c7200
hal fpga writed 0x2828 0x3deb0de7
hal fpga writed 0x2828 0x420d722f
hal fpga writed 0x2828 0x3dfa0db8
hal fpga writed 0x2828 0x41fd725f
hal fpga writed 0x2828 0x3e0a0d88
hal fpga writed 0x2828 0x41ee728f
hal fpga writed 0x2828 0x3e190d58
hal fpga writed 0x2828 0x41df72bf
hal fpga writed 0x2828 0x3e270d28
hal fpga writed 0x2828 0x41d072ee
hal fpga writed 0x2828 0x3e360cf9
hal fpga writed 0x2828 0x41c2731e
hal fpga writed 0x2828 0x3e440cc9
hal fpga writed 0x2828 0x41b4734e
hal fpga writed 0x2828 0x3e520c98
hal fpga writed 0x2828 0x41a6737f
hal fpga writed 0x2828 0x3e600c68
hal fpga writed 0x2828 0x419873af
hal fpga writed 0x2828 0x3e6e0c38
hal fpga writed 0x2828 0x418b73df
hal fpga writed 0x2828 0x3e7b0c08
hal fpga writed 0x2828 0x417d740f
hal fpga writed 0x2828 0x3e880bd7
hal fpga writed 0x2828 0x41707440
hal fpga writed 0x2828 0x3e950ba7
hal fpga writed 0x2828 0x41647470
hal fpga writed 0x2828 0x3ea10b76
hal fpga writed 0x2828 0x415774a1
hal fpga writed 0x2828 0x3eae0b46
hal fpga writed 0x2828 0x414b74d2
hal fpga writed 0x2828 0x3eba0b15
hal fpga writed 0x2828 0x413f7502
hal fpga writed 0x2828 0x3ec60ae4
hal fpga writed 0x2828 0x41347533
hal fpga writed 0x2828 0x3ed10ab4
hal fpga writed 0x2828 0x41287564
hal fpga writed 0x2828 0x3edc0a83
hal fpga writed 0x2828 0x411d7595
hal fpga writed 0x2828 0x3ee80a52
hal fpga writed 0x2828 0x411275c6
hal fpga writed 0x2828 0x3ef20a21
hal fpga writed 0x2828 0x410775f7
hal fpga writed 0x2828 0x3efd09f0
hal fpga writed 0x2828 0x40fd7628
hal fpga writed 0x2828 0x3f0709bf
hal fpga writed 0x2828 0x40f37659
hal fpga writed 0x2828 0x3f11098e
hal fpga writed 0x2828 0x40e9768a
hal fpga writed 0x2828 0x3f1b095c
hal fpga writed 0x2828 0x40df76bb
hal fpga writed 0x2828 0x3f25092b
hal fpga writed 0x2828 0x40d576ec
hal fpga writed 0x2828 0x3f2f08fa
hal fpga writed 0x2828 0x40cc771e
hal fpga writed 0x2828 0x3f3808c9
hal fpga writed 0x2828 0x40c3774f
hal fpga writed 0x2828 0x3f410897
hal fpga writed 0x2828 0x40ba7780
hal fpga writed 0x2828 0x3f490866
hal fpga writed 0x2828 0x40b177b2
hal fpga writed 0x2828 0x3f520834
hal fpga writed 0x2828 0x40a977e3
hal fpga writed 0x2828 0x3f5a0803
hal fpga writed 0x2828 0x40a17815
hal fpga writed 0x2828 0x3f6207d1
hal fpga writed 0x2828 0x40997846
hal fpga writed 0x2828 0x3f6a07a0
hal fpga writed 0x2828 0x40917878
hal fpga writed 0x2828 0x3f72076e
hal fpga writed 0x2828 0x408978aa
hal fpga writed 0x2828 0x3f79073d
hal fpga writed 0x2828 0x408278db
hal fpga writed 0x2828 0x3f81070b
hal fpga writed 0x2828 0x407b790d
hal fpga writed 0x2828 0x3f8806d9
hal fpga writed 0x2828 0x4074793f
hal fpga writed 0x2828 0x3f8e06a7
hal fpga writed 0x2828 0x406d7971
hal fpga writed 0x2828 0x3f950676
hal fpga writed 0x2828 0x406779a2
hal fpga writed 0x2828 0x3f9b0644
hal fpga writed 0x2828 0x406079d4
hal fpga writed 0x2828 0x3fa20612
hal fpga writed 0x2828 0x405a7a06
hal fpga writed 0x2828 0x3fa805e0
hal fpga writed 0x2828 0x40557a38
hal fpga writed 0x2828 0x3fad05ae
hal fpga writed 0x2828 0x404f7a6a
hal fpga writed 0x2828 0x3fb3057c
hal fpga writed 0x2828 0x40497a9c
hal fpga writed 0x2828 0x3fb8054a
hal fpga writed 0x2828 0x40447ace
hal fpga writed 0x2828 0x3fbd0518
hal fpga writed 0x2828 0x403f7b00
hal fpga writed 0x2828 0x3fc204e6
hal fpga writed 0x2828 0x403a7b32
hal fpga writed 0x2828 0x3fc704b4
hal fpga writed 0x2828 0x40367b64
hal fpga writed 0x2828 0x3fcc0482
hal fpga writed 0x2828 0x40317b96
hal fpga writed 0x2828 0x3fd00450
hal fpga writed 0x2828 0x402d7bc8
hal fpga writed 0x2828 0x3fd4041e
hal fpga writed 0x2828 0x40297bfa
hal fpga writed 0x2828 0x3fd803ec
hal fpga writed 0x2828 0x40257c2c
hal fpga writed 0x2828 0x3fdc03ba
hal fpga writed 0x2828 0x40217c5e
hal fpga writed 0x2828 0x3fdf0388
hal fpga writed 0x2828 0x401e7c90
hal fpga writed 0x2828 0x3fe30356
hal fpga writed 0x2828 0x401b7cc2
hal fpga writed 0x2828 0x3fe60324
hal fpga writed 0x2828 0x40187cf4
hal fpga writed 0x2828 0x3fe902f1
hal fpga writed 0x2828 0x40157d27
hal fpga writed 0x2828 0x3fec02bf
hal fpga writed 0x2828 0x40127d59
hal fpga writed 0x2828 0x3fee028d
hal fpga writed 0x2828 0x400f7d8b
hal fpga writed 0x2828 0x3ff1025b
hal fpga writed 0x2828 0x400d7dbd
hal fpga writed 0x2828 0x3ff30229
hal fpga writed 0x2828 0x400b7def
hal fpga writed 0x2828 0x3ff501f6
hal fpga writed 0x2828 0x40097e22
hal fpga writed 0x2828 0x3ff701c4
hal fpga writed 0x2828 0x40077e54
hal fpga writed 0x2828 0x3ff90192
hal fpga writed 0x2828 0x40057e86
hal fpga writed 0x2828 0x3ffa0160
hal fpga writed 0x2828 0x40047eb8
hal fpga writed 0x2828 0x3ffc012e
hal fpga writed 0x2828 0x40037eeb
hal fpga writed 0x2828 0x3ffd00fb
hal fpga writed 0x2828 0x40027f1d
hal fpga writed 0x2828 0x3ffe00c9
hal fpga writed 0x2828 0x40017f4f
hal fpga writed 0x2828 0x3fff0097
hal fpga writed 0x2828 0x40007f81
hal fpga writed 0x2828 0x3fff0065
hal fpga writed 0x2828 0x3fff7fb4
hal fpga writed 0x2828 0x40000032
hal fpga writed 0x2828 0x3fff7fe6
hal fpga writed 0x2828 0x40000000
hal fpga writed 0x2828 0x3fff0019
hal fpga writed 0x2828 0x40007fcd
hal fpga writed 0x2828 0x4000004b
hal fpga writed 0x2828 0x3fff7f9a
hal fpga writed 0x2828 0x4000007e
hal fpga writed 0x2828 0x3ffe7f68
hal fpga writed 0x2828 0x400100b0
hal fpga writed 0x2828 0x3ffe7f36
hal fpga writed 0x2828 0x400200e2
hal fpga writed 0x2828 0x3ffd7f04
hal fpga writed 0x2828 0x40030114
hal fpga writed 0x2828 0x3ffb7ed1
hal fpga writed 0x2828 0x40040147
hal fpga writed 0x2828 0x3ffa7e9f
hal fpga writed 0x2828 0x40060179
hal fpga writed 0x2828 0x3ff97e6d
hal fpga writed 0x2828 0x400701ab
hal fpga writed 0x2828 0x3ff77e3b
hal fpga writed 0x2828 0x400901dd
hal fpga writed 0x2828 0x3ff57e09
hal fpga writed 0x2828 0x400b0210
hal fpga writed 0x2828 0x3ff37dd6
hal fpga writed 0x2828 0x400d0242
hal fpga writed 0x2828 0x3ff17da4
hal fpga writed 0x2828 0x40100274
hal fpga writed 0x2828 0x3fee7d72
hal fpga writed 0x2828 0x401202a6
hal fpga writed 0x2828 0x3fec7d40
hal fpga writed 0x2828 0x401502d8
hal fpga writed 0x2828 0x3fe97d0e
hal fpga writed 0x2828 0x4018030b
hal fpga writed 0x2828 0x3fe67cdb
hal fpga writed 0x2828 0x401b033d
hal fpga writed 0x2828 0x3fe27ca9
hal fpga writed 0x2828 0x401e036f
hal fpga writed 0x2828 0x3fdf7c77
hal fpga writed 0x2828 0x402203a1
hal fpga writed 0x2828 0x3fdb7c45
hal fpga writed 0x2828 0x402503d3
hal fpga writed 0x2828 0x3fd87c13
hal fpga writed 0x2828 0x40290405
hal fpga writed 0x2828 0x3fd47be1
hal fpga writed 0x2828 0x402d0437
hal fpga writed 0x2828 0x3fd07baf
hal fpga writed 0x2828 0x40320469
hal fpga writed 0x2828 0x3fcb7b7d
hal fpga writed 0x2828 0x4036049b
hal fpga writed 0x2828 0x3fc77b4b
hal fpga writed 0x2828 0x403b04cd
hal fpga writed 0x2828 0x3fc27b19
hal fpga writed 0x2828 0x404004ff
hal fpga writed 0x2828 0x3fbd7ae7
hal fpga writed 0x2828 0x40450531
hal fpga writed 0x2828 0x3fb87ab5
hal fpga writed 0x2828 0x404a0563
hal fpga writed 0x2828 0x3fb27a83
hal fpga writed 0x2828 0x404f0595
hal fpga writed 0x2828 0x3fad7a51
hal fpga writed 0x2828 0x405505c7
hal fpga writed 0x2828 0x3fa77a1f
hal fpga writed 0x2828 0x405b05f9
hal fpga writed 0x2828 0x3fa179ed
hal fpga writed 0x2828 0x4061062b
hal fpga writed 0x2828 0x3f9b79bb
hal fpga writed 0x2828 0x4067065d
hal fpga writed 0x2828 0x3f947989
hal fpga writed 0x2828 0x406e068e
hal fpga writed 0x2828 0x3f8e7958
hal fpga writed 0x2828 0x407506c0
hal fpga writed 0x2828 0x3f877926
hal fpga writed 0x2828 0x407c06f2
hal fpga writed 0x2828 0x3f8078f4
hal fpga writed 0x2828 0x40830724
hal fpga writed 0x2828 0x3f7978c3
hal fpga writed 0x2828 0x408a0755
hal fpga writed 0x2828 0x3f717891
hal fpga writed 0x2828 0x40920787
hal fpga writed 0x2828 0x3f69785f
hal fpga writed 0x2828 0x409a07b8
hal fpga writed 0x2828 0x3f62782e
hal fpga writed 0x2828 0x40a207ea
hal fpga writed 0x2828 0x3f5977fc
hal fpga writed 0x2828 0x40aa081c
hal fpga writed 0x2828 0x3f5177cb
hal fpga writed 0x2828 0x40b2084d
hal fpga writed 0x2828 0x3f487799
hal fpga writed 0x2828 0x40bb087e
hal fpga writed 0x2828 0x3f407768
hal fpga writed 0x2828 0x40c408b0
hal fpga writed 0x2828 0x3f377737
hal fpga writed 0x2828 0x40cd08e1
hal fpga writed 0x2828 0x3f2d7705
hal fpga writed 0x2828 0x40d60912
hal fpga writed 0x2828 0x3f2476d4
hal fpga writed 0x2828 0x40e00944
hal fpga writed 0x2828 0x3f1a76a3
hal fpga writed 0x2828 0x40ea0975
hal fpga writed 0x2828 0x3f107672
hal fpga writed 0x2828 0x40f409a6
hal fpga writed 0x2828 0x3f067640
hal fpga writed 0x2828 0x40fe09d7
hal fpga writed 0x2828 0x3efc760f
hal fpga writed 0x2828 0x41090a08
hal fpga writed 0x2828 0x3ef175de
hal fpga writed 0x2828 0x41130a39
hal fpga writed 0x2828 0x3ee675ad
hal fpga writed 0x2828 0x411e0a6a
hal fpga writed 0x2828 0x3edb757d
hal fpga writed 0x2828 0x412a0a9b
hal fpga writed 0x2828 0x3ed0754c
hal fpga writed 0x2828 0x41350acc
hal fpga writed 0x2828 0x3ec4751b
hal fpga writed 0x2828 0x41410afc
hal fpga writed 0x2828 0x3eb874ea
hal fpga writed 0x2828 0x414d0b2d
hal fpga writed 0x2828 0x3eac74ba
hal fpga writed 0x2828 0x41590b5e
hal fpga writed 0x2828 0x3ea07489
hal fpga writed 0x2828 0x41660b8e
hal fpga writed 0x2828 0x3e937458
hal fpga writed 0x2828 0x41720bbf
hal fpga writed 0x2828 0x3e867428
hal fpga writed 0x2828 0x417f0bef
hal fpga writed 0x2828 0x3e7973f8
hal fpga writed 0x2828 0x418c0c20
hal fpga writed 0x2828 0x3e6c73c7
hal fpga writed 0x2828 0x419a0c50
hal fpga writed 0x2828 0x3e5e7397
hal fpga writed 0x2828 0x41a80c80
hal fpga writed 0x2828 0x3e507367
hal fpga writed 0x2828 0x41b60cb0
hal fpga writed 0x2828 0x3e427337
hal fpga writed 0x2828 0x41c40ce0
hal fpga writed 0x2828 0x3e347307
hal fpga writed 0x2828 0x41d20d10
hal fpga writed 0x2828 0x3e2572d7
hal fpga writed 0x2828 0x41e10d40
hal fpga writed 0x2828 0x3e1672a7
hal fpga writed 0x2828 0x41f00d70
hal fpga writed 0x2828 0x3e077277
hal fpga writed 0x2828 0x41ff0d9f
hal fpga writed 0x2828 0x3df87248
hal fpga writed 0x2828 0x420f0dcf
hal fpga writed 0x2828 0x3de87218
hal fpga writed 0x2828 0x421f0dff
hal fpga writed 0x2828 0x3dd871e9
hal fpga writed 0x2828 0x422f0e2e
hal fpga writed 0x2828 0x3dc871b9
hal fpga writed 0x2828 0x423f0e5d
hal fpga writed 0x2828 0x3db8718a
hal fpga writed 0x2828 0x42500e8d
hal fpga writed 0x2828 0x3da7715b
hal fpga writed 0x2828 0x42610ebc
hal fpga writed 0x2828 0x3d96712c
hal fpga writed 0x2828 0x42720eeb
hal fpga writed 0x2828 0x3d8470fd
hal fpga writed 0x2828 0x42830f1a
hal fpga writed 0x2828 0x3d7370ce
hal fpga writed 0x2828 0x42950f49
hal fpga writed 0x2828 0x3d61709f
hal fpga writed 0x2828 0x42a70f77
hal fpga writed 0x2828 0x3d4f7070
hal fpga writed 0x2828 0x42b90fa6
hal fpga writed 0x2828 0x3d3c7042
hal fpga writed 0x2828 0x42cc0fd4
hal fpga writed 0x2828 0x3d2a7013
hal fpga writed 0x2828 0x42df1003
hal fpga writed 0x2828 0x3d176fe5
hal fpga writed 0x2828 0x42f21031
hal fpga writed 0x2828 0x3d046fb7
hal fpga writed 0x2828 0x4305105f
hal fpga writed 0x2828 0x3cf06f89
hal fpga writed 0x2828 0x4319108d
hal fpga writed 0x2828 0x3cdc6f5b
hal fpga writed 0x2828 0x432d10bb
hal fpga writed 0x2828 0x3cc86f2d
hal fpga writed 0x2828 0x434110e9
hal fpga writed 0x2828 0x3cb46eff
hal fpga writed 0x2828 0x43561117
hal fpga writed 0x2828 0x3c9f6ed2
hal fpga writed 0x2828 0x436a1144
hal fpga writed 0x2828 0x3c8a6ea4
hal fpga writed 0x2828 0x43801172
hal fpga writed 0x2828 0x3c756e77
hal fpga writed 0x2828 0x4395119f
hal fpga writed 0x2828 0x3c5f6e4a
hal fpga writed 0x2828 0x43ab11cc
hal fpga writed 0x2828 0x3c496e1d
hal fpga writed 0x2828 0x43c111f9
hal fpga writed 0x2828 0x3c336df0
hal fpga writed 0x2828 0x43d71226
hal fpga writed 0x2828 0x3c1d6dc3
hal fpga writed 0x2828 0x43ee1252
hal fpga writed 0x2828 0x3c066d96
hal fpga writed 0x2828 0x4404127f
hal fpga writed 0x2828 0x3bef6d6a
hal fpga writed 0x2828 0x441c12ab
hal fpga writed 0x2828 0x3bd86d3d
hal fpga writed 0x2828 0x443312d8
hal fpga writed 0x2828 0x3bc06d11
hal fpga writed 0x2828 0x444b1304
hal fpga writed 0x2828 0x3ba86ce5
hal fpga writed 0x2828 0x44631330
hal fpga writed 0x2828 0x3b906cb9
hal fpga writed 0x2828 0x447b135b
hal fpga writed 0x2828 0x3b776c8e
hal fpga writed 0x2828 0x44941387
hal fpga writed 0x2828 0x3b5e6c62
hal fpga writed 0x2828 0x44ad13b3
hal fpga writed 0x2828 0x3b456c37
hal fpga writed 0x2828 0x44c613de
hal fpga writed 0x2828 0x3b2c6c0c
hal fpga writed 0x2828 0x44e01409
hal fpga writed 0x2828 0x3b126be1
hal fpga writed 0x2828 0x44fa1434
hal fpga writed 0x2828 0x3af86bb6
hal fpga writed 0x2828 0x4514145f
hal fpga writed 0x2828 0x3ade6b8b
hal fpga writed 0x2828 0x452f1489
hal fpga writed 0x2828 0x3ac36b60
hal fpga writed 0x2828 0x454a14b4
hal fpga writed 0x2828 0x3aa86b36
hal fpga writed 0x2828 0x456514de
hal fpga writed 0x2828 0x3a8d6b0c
hal fpga writed 0x2828 0x45801508
hal fpga writed 0x2828 0x3a716ae2
hal fpga writed 0x2828 0x459c1532
hal fpga writed 0x2828 0x3a556ab8
hal fpga writed 0x2828 0x45b8155b
hal fpga writed 0x2828 0x3a396a8f
hal fpga writed 0x2828 0x45d51585
hal fpga writed 0x2828 0x3a1c6a65
hal fpga writed 0x2828 0x45f115ae
hal fpga writed 0x2828 0x39ff6a3c
hal fpga writed 0x2828 0x460e15d7
hal fpga writed 0x2828 0x39e26a13
hal fpga writed 0x2828 0x462c1600
hal fpga writed 0x2828 0x39c569ea
hal fpga writed 0x2828 0x46491629
hal fpga writed 0x2828 0x39a769c2
hal fpga writed 0x2828 0x46671651
hal fpga writed 0x2828 0x3989699a
hal fpga writed 0x2828 0x4686167a
hal fpga writed 0x2828 0x396a6971
hal fpga writed 0x2828 0x46a416a2
hal fpga writed 0x2828 0x394b6949
hal fpga writed 0x2828 0x46c316c9
hal fpga writed 0x2828 0x392c6922
hal fpga writed 0x2828 0x46e216f1
hal fpga writed 0x2828 0x390d68fa
hal fpga writed 0x2828 0x47021718
hal fpga writed 0x2828 0x38ed68d3
hal fpga writed 0x2828 0x47221740
hal fpga writed 0x2828 0x38cd68ac
hal fpga writed 0x2828 0x47421766
hal fpga writed 0x2828 0x38ad6885
hal fpga writed 0x2828 0x4762178d
hal fpga writed 0x2828 0x388c685f
hal fpga writed 0x2828 0x478317b4
hal fpga writed 0x2828 0x386b6838
hal fpga writed 0x2828 0x47a417da
hal fpga writed 0x2828 0x384a6812
hal fpga writed 0x2828 0x47c61800
hal fpga writed 0x2828 0x382867ec
hal fpga writed 0x2828 0x47e81826
hal fpga writed 0x2828 0x380667c7
hal fpga writed 0x2828 0x480a184b
hal fpga writed 0x2828 0x37e467a1
hal fpga writed 0x2828 0x482c1870
hal fpga writed 0x2828 0x37c2677c
hal fpga writed 0x2828 0x484f1895
hal fpga writed 0x2828 0x379f6757
hal fpga writed 0x2828 0x487218ba
hal fpga writed 0x2828 0x377c6733
hal fpga writed 0x2828 0x489518de
hal fpga writed 0x2828 0x3758670e
hal fpga writed 0x2828 0x48b91903
hal fpga writed 0x2828 0x373466ea
hal fpga writed 0x2828 0x48dd1927
hal fpga writed 0x2828 0x371066c6
hal fpga writed 0x2828 0x4901194a
hal fpga writed 0x2828 0x36ec66a3
hal fpga writed 0x2828 0x4926196e
hal fpga writed 0x2828 0x36c76680
hal fpga writed 0x2828 0x494b1991
hal fpga writed 0x2828 0x36a2665d
hal fpga writed 0x2828 0x497019b4
hal fpga writed 0x2828 0x367c663a
hal fpga writed 0x2828 0x499519d6
hal fpga writed 0x2828 0x36576617
hal fpga writed 0x2828 0x49bb19f9
hal fpga writed 0x2828 0x363165f5
hal fpga writed 0x2828 0x49e11a1b
hal fpga writed 0x2828 0x360a65d3
hal fpga writed 0x2828 0x4a081a3d
hal fpga writed 0x2828 0x35e465b2
hal fpga writed 0x2828 0x4a2f1a5e
hal fpga writed 0x2828 0x35bd6590
hal fpga writed 0x2828 0x4a561a7f
hal fpga writed 0x2828 0x3596656f
hal fpga writed 0x2828 0x4a7d1aa0
hal fpga writed 0x2828 0x356e654f
hal fpga writed 0x2828 0x4aa51ac1
hal fpga writed 0x2828 0x3546652e
hal fpga writed 0x2828 0x4acd1ae1
hal fpga writed 0x2828 0x351e650e
hal fpga writed 0x2828 0x4af51b01
hal fpga writed 0x2828 0x34f564ee
hal fpga writed 0x2828 0x4b1e1b21
hal fpga writed 0x2828 0x34cd64cf
hal fpga writed 0x2828 0x4b471b40
hal fpga writed 0x2828 0x34a464af
hal fpga writed 0x2828 0x4b701b5f
hal fpga writed 0x2828 0x347a6491
hal fpga writed 0x2828 0x4b9a1b7e
hal fpga writed 0x2828 0x34506472
hal fpga writed 0x2828 0x4bc41b9c
hal fpga writed 0x2828 0x34266454
hal fpga writed 0x2828 0x4bee1bba
hal fpga writed 0x2828 0x33fc6436
hal fpga writed 0x2828 0x4c181bd8
hal fpga writed 0x2828 0x33d16418
hal fpga writed 0x2828 0x4c431bf6
hal fpga writed 0x2828 0x33a763fb
hal fpga writed 0x2828 0x4c6e1c13
hal fpga writed 0x2828 0x337b63de
hal fpga writed 0x2828 0x4c991c30
hal fpga writed 0x2828 0x335063c1
hal fpga writed 0x2828 0x4cc51c4c
hal fpga writed 0x2828 0x332463a5
hal fpga writed 0x2828 0x4cf11c68
hal fpga writed 0x2828 0x32f86389
hal fpga writed 0x2828 0x4d1d1c84
hal fpga writed 0x2828 0x32cc636d
hal fpga writed 0x2828 0x4d4a1ca0
hal fpga writed 0x2828 0x329f6352
hal fpga writed 0x2828 0x4d761cbb
hal fpga writed 0x2828 0x32726337
hal fpga writed 0x2828 0x4da41cd5
hal fpga writed 0x2828 0x3245631c
hal fpga writed 0x2828 0x4dd11cf0
hal fpga writed 0x2828 0x32176302
hal fpga writed 0x2828 0x4dff1d0a
hal fpga writed 0x2828 0x31e962e8
hal fpga writed 0x2828 0x4e2d1d24
hal fpga writed 0x2828 0x31bb62cf
hal fpga writed 0x2828 0x4e5b1d3d
hal fpga writed 0x2828 0x318d62b5
hal fpga writed 0x2828 0x4e891d56
hal fpga writed 0x2828 0x315e629c
hal fpga writed 0x2828 0x4eb81d6f
hal fpga writed 0x2828 0x312f6284
hal fpga writed 0x2828 0x4ee71d87
hal fpga writed 0x2828 0x3100626c
hal fpga writed 0x2828 0x4f161d9f
hal fpga writed 0x2828 0x30d16254
hal fpga writed 0x2828 0x4f461db7
hal fpga writed 0x2828 0x30a1623d
hal fpga writed 0x2828 0x4f761dce
hal fpga writed 0x2828 0x30716226
hal fpga writed 0x2828 0x4fa61de5
hal fpga writed 0x2828 0x3041620f
hal fpga writed 0x2828 0x4fd61dfb
hal fpga writed 0x2828 0x301061f9
hal fpga writed 0x2828 0x50071e11
hal fpga writed 0x2828 0x2fe061e3
hal fpga writed 0x2828 0x50381e27
hal fpga writed 0x2828 0x2fae61cd
hal fpga writed 0x2828 0x50691e3c
hal fpga writed 0x2828 0x2f7d61b8
hal fpga writed 0x2828 0x509b1e51
hal fpga writed 0x2828 0x2f4c61a3
hal fpga writed 0x2828 0x50cc1e66
hal fpga writed 0x2828 0x2f1a618f
hal fpga writed 0x2828 0x50fe1e7a
hal fpga writed 0x2828 0x2ee8617b
hal fpga writed 0x2828 0x51301e8e
hal fpga writed 0x2828 0x2eb56168
hal fpga writed 0x2828 0x51631ea1
hal fpga writed 0x2828 0x2e836154
hal fpga writed 0x2828 0x51951eb4
hal fpga writed 0x2828 0x2e506142
hal fpga writed 0x2828 0x51c81ec7
hal fpga writed 0x2828 0x2e1d612f
hal fpga writed 0x2828 0x51fc1ed9
hal fpga writed 0x2828 0x2dea611d
hal fpga writed 0x2828 0x522f1eeb
hal fpga writed 0x2828 0x2db6610b
hal fpga writed 0x2828 0x52631efc
hal fpga writed 0x2828 0x2d8360fa
hal fpga writed 0x2828 0x52961f0d
hal fpga writed 0x2828 0x2d4f60e9
hal fpga writed 0x2828 0x52ca1f1e
hal fpga writed 0x2828 0x2d1a60d9
hal fpga writed 0x2828 0x52ff1f2e
hal fpga writed 0x2828 0x2ce660c9
hal fpga writed 0x2828 0x53331f3e
hal fpga writed 0x2828 0x2cb160b9
hal fpga writed 0x2828 0x53681f4d
hal fpga writed 0x2828 0x2c7d60aa
hal fpga writed 0x2828 0x539d1f5c
hal fpga writed 0x2828 0x2c47609c
hal fpga writed 0x2828 0x53d21f6b
hal fpga writed 0x2828 0x2c12608d
hal fpga writed 0x2828 0x54081f79
hal fpga writed 0x2828 0x2bdd607f
hal fpga writed 0x2828 0x543d1f87
hal fpga writed 0x2828 0x2ba76072
hal fpga writed 0x2828 0x54731f94
hal fpga writed 0x2828 0x2b716065
hal fpga writed 0x2828 0x54a91fa1
hal fpga writed 0x2828 0x2b3b6058
hal fpga writed 0x2828 0x54df1fad
hal fpga writed 0x2828 0x2b05604c
hal fpga writed 0x2828 0x55161fb9
hal fpga writed 0x2828 0x2ace6040
hal fpga writed 0x2828 0x554c1fc5
hal fpga writed 0x2828 0x2a986034
hal fpga writed 0x2828 0x55831fd0
hal fpga writed 0x2828 0x2a616029
hal fpga writed 0x2828 0x55ba1fdb
hal fpga writed 0x2828 0x2a2a601f
hal fpga writed 0x2828 0x55f11fe5
hal fpga writed 0x2828 0x29f26015
hal fpga writed 0x2828 0x56281fef
hal fpga writed 0x2828 0x29bb600b
hal fpga writed 0x2828 0x56601ff9
hal fpga writed 0x2828 0x29836002
hal fpga writed 0x2828 0x56972002
hal fpga writed 0x2828 0x294c5ff9
hal fpga writed 0x2828 0x56cf200a
hal fpga writed 0x2828 0x29145ff0
hal fpga writed 0x2828 0x57072013
hal fpga writed 0x2828 0x28dc5fe8
hal fpga writed 0x2828 0x573f201a
hal fpga writed 0x2828 0x28a35fe1
hal fpga writed 0x2828 0x57782022
hal fpga writed 0x2828 0x286b5fda
hal fpga writed 0x2828 0x57b02029
hal fpga writed 0x2828 0x28325fd3
hal fpga writed 0x2828 0x57e9202f
hal fpga writed 0x2828 0x27fa5fcd
hal fpga writed 0x2828 0x58222035
hal fpga writed 0x2828 0x27c15fc7
hal fpga writed 0x2828 0x585b203b
hal fpga writed 0x2828 0x27885fc2
hal fpga writed 0x2828 0x58942040
hal fpga writed 0x2828 0x274f5fbd
hal fpga writed 0x2828 0x58cd2045
hal fpga writed 0x2828 0x27155fb8
hal fpga writed 0x2828 0x59062049
hal fpga writed 0x2828 0x26dc5fb4
hal fpga writed 0x2828 0x5940204d
hal fpga writed 0x2828 0x26a35fb1
hal fpga writed 0x2828 0x59792050
hal fpga writed 0x2828 0x26695fad
hal fpga writed 0x2828 0x59b32053
hal fpga writed 0x2828 0x262f5fab
hal fpga writed 0x2828 0x59ed2056
hal fpga writed 0x2828 0x25f55fa8
hal fpga writed 0x2828 0x5a272058
hal fpga writed 0x2828 0x25bb5fa6
hal fpga writed 0x2828 0x5a612059
hal fpga writed 0x2828 0x25815fa5
hal fpga writed 0x2828 0x5a9b205a
hal fpga writed 0x2828 0x25475fa4
hal fpga writed 0x2828 0x5ad5205b
hal fpga writed 0x2828 0x250c5fa4
hal fpga writed 0x2828 0x5b10205c
hal fpga writed 0x2828 0x24d25fa3
hal fpga writed 0x2828 0x5b4a205b
hal fpga writed 0x2828 0x24985fa4
hal fpga writed 0x2828 0x5b85205b
hal fpga writed 0x2828 0x245d5fa5
hal fpga writed 0x2828 0x5bbf205a
hal fpga writed 0x2828 0x24225fa6
hal fpga writed 0x2828 0x5bfa2058
hal fpga writed 0x2828 0x23e75fa8
hal fpga writed 0x2828 0x5c352056
hal fpga writed 0x2828 0x23ad5faa
hal fpga writed 0x2828 0x5c702054
hal fpga writed 0x2828 0x23725fac
hal fpga writed 0x2828 0x5cab2051
hal fpga writed 0x2828 0x23375faf
hal fpga writed 0x2828 0x5ce6204e
hal fpga writed 0x2828 0x22fc5fb3
hal fpga writed 0x2828 0x5d21204a
hal fpga writed 0x2828 0x22c05fb7
hal fpga writed 0x2828 0x5d5c2046
hal fpga writed 0x2828 0x22855fbb
hal fpga writed 0x2828 0x5d972042
hal fpga writed 0x2828 0x224a5fc0
hal fpga writed 0x2828 0x5dd3203d
hal fpga writed 0x2828 0x220f5fc5
hal fpga writed 0x2828 0x5e0e2037
hal fpga writed 0x2828 0x21d35fcb
hal fpga writed 0x2828 0x5e492031
hal fpga writed 0x2828 0x21985fd1
hal fpga writed 0x2828 0x5e85202b
hal fpga writed 0x2828 0x215d5fd7
hal fpga writed 0x2828 0x5ec02024
hal fpga writed 0x2828 0x21215fde
hal fpga writed 0x2828 0x5efc201d
hal fpga writed 0x2828 0x20e65fe6
hal fpga writed 0x2828 0x5f372016
hal fpga writed 0x2828 0x20aa5fed
hal fpga writed 0x2828 0x5f73200d
hal fpga writed 0x2828 0x206f5ff6
hal fpga writed 0x2828 0x5fae2005
hal fpga writed 0x2828 0x20335ffe
hal fpga writed 0x2828 0x5fea1ffc
hal fpga writed 0x2828 0x1ff76008
hal fpga writed 0x2828 0x60251ff3
hal fpga writed 0x2828 0x1fbc6011
hal fpga writed 0x2828 0x60611fe9
hal fpga writed 0x2828 0x1f80601b
hal fpga writed 0x2828 0x609d1fdf
hal fpga writed 0x2828 0x1f456026
hal fpga writed 0x2828 0x60d81fd4
hal fpga writed 0x2828 0x1f096031
hal fpga writed 0x2828 0x61141fc9
hal fpga writed 0x2828 0x1ecd603c
hal fpga writed 0x2828 0x614f1fbd
hal fpga writed 0x2828 0x1e926048
hal fpga writed 0x2828 0x618b1fb1
hal fpga writed 0x2828 0x1e566054
hal fpga writed 0x2828 0x61c61fa5
hal fpga writed 0x2828 0x1e1b6060
hal fpga writed 0x2828 0x62021f98
hal fpga writed 0x2828 0x1ddf606d
hal fpga writed 0x2828 0x623d1f8b
hal fpga writed 0x2828 0x1da4607b
hal fpga writed 0x2828 0x62791f7d
hal fpga writed 0x2828 0x1d686089
hal fpga writed 0x2828 0x62b41f6f
hal fpga writed 0x2828 0x1d2d6097
hal fpga writed 0x2828 0x62f01f61
hal fpga writed 0x2828 0x1cf260a6
hal fpga writed 0x2828 0x632b1f52
hal fpga writed 0x2828 0x1cb660b5
hal fpga writed 0x2828 0x63661f43
hal fpga writed 0x2828 0x1c7b60c4
hal fpga writed 0x2828 0x63a21f33
hal fpga writed 0x2828 0x1c4060d4
hal fpga writed 0x2828 0x63dd1f23
hal fpga writed 0x2828 0x1c0460e4
hal fpga writed 0x2828 0x64181f12
hal fpga writed 0x2828 0x1bc960f5
hal fpga writed 0x2828 0x64531f01
hal fpga writed 0x2828 0x1b8e6106
hal fpga writed 0x2828 0x648e1ef0
hal fpga writed 0x2828 0x1b536118
hal fpga writed 0x2828 0x64c91ede
hal fpga writed 0x2828 0x1b18612a
hal fpga writed 0x2828 0x65041ecc
hal fpga writed 0x2828 0x1ade613c
hal fpga writed 0x2828 0x653f1eb9
hal fpga writed 0x2828 0x1aa3614f
hal fpga writed 0x2828 0x657a1ea7
hal fpga writed 0x2828 0x1a686162
hal fpga writed 0x2828 0x65b41e93
hal fpga writed 0x2828 0x1a2e6176
hal fpga writed 0x2828 0x65ef1e7f
hal fpga writed 0x2828 0x19f3618a
hal fpga writed 0x2828 0x66291e6b
hal fpga writed 0x2828 0x19b9619e
hal fpga writed 0x2828 0x66631e57
hal fpga writed 0x2828 0x197e61b3
hal fpga writed 0x2828 0x669e1e42
hal fpga writed 0x2828 0x194461c8
hal fpga writed 0x2828 0x66d81e2d
hal fpga writed 0x2828 0x190a61dd
hal fpga writed 0x2828 0x67121e17
hal fpga writed 0x2828 0x18d061f3
hal fpga writed 0x2828 0x674c1e01
hal fpga writed 0x2828 0x18966209
hal fpga writed 0x2828 0x67861dea
hal fpga writed 0x2828 0x185d6220
hal fpga writed 0x2828 0x67bf1dd4
hal fpga writed 0x2828 0x18236237
hal fpga writed 0x2828 0x67f91dbc
hal fpga writed 0x2828 0x17e9624e
hal fpga writed 0x2828 0x68321da5
hal fpga writed 0x2828 0x17b06266
hal fpga writed 0x2828 0x686b1d8d
hal fpga writed 0x2828 0x1777627e
hal fpga writed 0x2828 0x68a51d75
hal fpga writed 0x2828 0x173e6297
hal fpga writed 0x2828 0x68de1d5c
hal fpga writed 0x2828 0x170562af
hal fpga writed 0x2828 0x69161d43
hal fpga writed 0x2828 0x16cc62c9
hal fpga writed 0x2828 0x694f1d2a
hal fpga writed 0x2828 0x169462e2
hal fpga writed 0x2828 0x69881d10
hal fpga writed 0x2828 0x165b62fc
hal fpga writed 0x2828 0x69c01cf6
hal fpga writed 0x2828 0x16236316
hal fpga writed 0x2828 0x69f81cdb
hal fpga writed 0x2828 0x15eb6331
hal fpga writed 0x2828 0x6a301cc1
hal fpga writed 0x2828 0x15b3634c
hal fpga writed 0x2828 0x6a681ca6
hal fpga writed 0x2828 0x157b6367
hal fpga writed 0x2828 0x6aa01c8a
hal fpga writed 0x2828 0x15436383
hal fpga writed 0x2828 0x6ad81c6e
hal fpga writed 0x2828 0x150c639f
hal fpga writed 0x2828 0x6b0f1c52
hal fpga writed 0x2828 0x14d463bb
hal fpga writed 0x2828 0x6b461c36
hal fpga writed 0x2828 0x149d63d7
hal fpga writed 0x2828 0x6b7d1c19
hal fpga writed 0x2828 0x146663f4
hal fpga writed 0x2828 0x6bb41bfc
hal fpga writed 0x2828 0x14306412
hal fpga writed 0x2828 0x6beb1bdf
hal fpga writed 0x2828 0x13f9642f
hal fpga writed 0x2828 0x6c211bc1
hal fpga writed 0x2828 0x13c3644d
hal fpga writed 0x2828 0x6c571ba3
hal fpga writed 0x2828 0x138d646b
hal fpga writed 0x2828 0x6c8d1b85
hal fpga writed 0x2828 0x1357648a
hal fpga writed 0x2828 0x6cc31b66
hal fpga writed 0x2828 0x132164a8
hal fpga writed 0x2828 0x6cf91b47
hal fpga writed 0x2828 0x12eb64c7
hal fpga writed 0x2828 0x6d2e1b28
hal fpga writed 0x2828 0x12b664e7
hal fpga writed 0x2828 0x6d631b08
hal fpga writed 0x2828 0x12816506
hal fpga writed 0x2828 0x6d981ae9
hal fpga writed 0x2828 0x124c6526
hal fpga writed 0x2828 0x6dcd1ac9
hal fpga writed 0x2828 0x12186547
hal fpga writed 0x2828 0x6e021aa8
hal fpga writed 0x2828 0x11e36567
hal fpga writed 0x2828 0x6e361a88
hal fpga writed 0x2828 0x11af6588
hal fpga writed 0x2828 0x6e6a1a67
hal fpga writed 0x2828 0x117b65a9
hal fpga writed 0x2828 0x6e9e1a46
hal fpga writed 0x2828 0x114765ca
hal fpga writed 0x2828 0x6ed11a24
hal fpga writed 0x2828 0x111465ec
hal fpga writed 0x2828 0x6f051a02
hal fpga writed 0x2828 0x10e1660e
hal fpga writed 0x2828 0x6f3819e0
hal fpga writed 0x2828 0x10ae6630
hal fpga writed 0x2828 0x6f6b19be
hal fpga writed 0x2828 0x107b6652
hal fpga writed 0x2828 0x6f9d199c
hal fpga writed 0x2828 0x10496675
hal fpga writed 0x2828 0x6fd01979
hal fpga writed 0x2828 0x10166698
hal fpga writed 0x2828 0x70021956
hal fpga writed 0x2828 0x0fe466bb
hal fpga writed 0x2828 0x70341933
hal fpga writed 0x2828 0x0fb366de
hal fpga writed 0x2828 0x7065190f
hal fpga writed 0x2828 0x0f816702
hal fpga writed 0x2828 0x709618ec
hal fpga writed 0x2828 0x0f506725
hal fpga writed 0x2828 0x70c818c8
hal fpga writed 0x2828 0x0f1f6749
hal fpga writed 0x2828 0x70f818a4
hal fpga writed 0x2828 0x0eee676e
hal fpga writed 0x2828 0x7129187f
hal fpga writed 0x2828 0x0ebe6792
hal fpga writed 0x2828 0x7159185b
hal fpga writed 0x2828 0x0e8e67b7
hal fpga writed 0x2828 0x71891836
hal fpga writed 0x2828 0x0e5e67dc
hal fpga writed 0x2828 0x71b91811
hal fpga writed 0x2828 0x0e2f6801
hal fpga writed 0x2828 0x71e817ec
hal fpga writed 0x2828 0x0dff6826
hal fpga writed 0x2828 0x721717c6
hal fpga writed 0x2828 0x0dd0684b
hal fpga writed 0x2828 0x724617a1
hal fpga writed 0x2828 0x0da26871
hal fpga writed 0x2828 0x7275177b
hal fpga writed 0x2828 0x0d736897
hal fpga writed 0x2828 0x72a31755
hal fpga writed 0x2828 0x0d4568bd
hal fpga writed 0x2828 0x72d1172f
hal fpga writed 0x2828 0x0d1768e3
hal fpga writed 0x2828 0x72ff1709
hal fpga writed 0x2828 0x0cea690a
hal fpga writed 0x2828 0x732c16e2
hal fpga writed 0x2828 0x0cbc6930
hal fpga writed 0x2828 0x735916bb
hal fpga writed 0x2828 0x0c906957
hal fpga writed 0x2828 0x73861695
hal fpga writed 0x2828 0x0c63697e
hal fpga writed 0x2828 0x73b2166e
hal fpga writed 0x2828 0x0c3769a5
hal fpga writed 0x2828 0x73de1647
hal fpga writed 0x2828 0x0c0b69cc
hal fpga writed 0x2828 0x740a161f
hal fpga writed 0x2828 0x0bdf69f3
hal fpga writed 0x2828 0x743615f8
hal fpga writed 0x2828 0x0bb36a1b
hal fpga writed 0x2828 0x746115d0
hal fpga writed 0x2828 0x0b886a43
hal fpga writed 0x2828 0x748c15a9
hal fpga writed 0x2828 0x0b5e6a6a
hal fpga writed 0x2828 0x74b71581
hal fpga writed 0x2828 0x0b336a92
hal fpga writed 0x2828 0x74e11559
hal fpga writed 0x2828 0x0b096aba
hal fpga writed 0x2828 0x750b1531
hal fpga writed 0x2828 0x0adf6ae2
hal fpga writed 0x2828 0x75351508
hal fpga writed 0x2828 0x0ab66b0b
hal fpga writed 0x2828 0x755e14e0
hal fpga writed 0x2828 0x0a8c6b33
hal fpga writed 0x2828 0x758714b8
hal fpga writed 0x2828 0x0a636b5c
hal fpga writed 0x2828 0x75b0148f
hal fpga writed 0x2828 0x0a3b6b84
hal fpga writed 0x2828 0x75d81467
hal fpga writed 0x2828 0x0a136bad
hal fpga writed 0x2828 0x7600143e
hal fpga writed 0x2828 0x09eb6bd6
hal fpga writed 0x2828 0x76281415
hal fpga writed 0x2828 0x09c36bfe
hal fpga writed 0x2828 0x764f13ec
hal fpga writed 0x2828 0x099c6c27
hal fpga writed 0x2828 0x767713c3
hal fpga writed 0x2828 0x09756c50
hal fpga writed 0x2828 0x769d139a
hal fpga writed 0x2828 0x094e6c7a
hal fpga writed 0x2828 0x76c41371
hal fpga writed 0x2828 0x09286ca3
hal fpga writed 0x2828 0x76ea1348
hal fpga writed 0x2828 0x09026ccc
hal fpga writed 0x2828 0x7710131e
hal fpga writed 0x2828 0x08dd6cf5
hal fpga writed 0x2828 0x773512f5
hal fpga writed 0x2828 0x08b76d1f
hal fpga writed 0x2828 0x775a12cc
hal fpga writed 0x2828 0x08926d48
hal fpga writed 0x2828 0x777f12a2
hal fpga writed 0x2828 0x086e6d72
hal fpga writed 0x2828 0x77a31279
hal fpga writed 0x2828 0x08496d9b
hal fpga writed 0x2828 0x77c8124f
hal fpga writed 0x2828 0x08266dc5
hal fpga writed 0x2828 0x77eb1225
hal fpga writed 0x2828 0x08026dee
hal fpga writed 0x2828 0x780f11fc
hal fpga writed 0x2828 0x07df6e18
hal fpga writed 0x2828 0x783211d2
hal fpga writed 0x2828 0x07bc6e42
hal fpga writed 0x2828 0x785511a8
hal fpga writed 0x2828 0x07996e6b
hal fpga writed 0x2828 0x7877117f
hal fpga writed 0x2828 0x07776e95
hal fpga writed 0x2828 0x78991155
hal fpga writed 0x2828 0x07556ebf
hal fpga writed 0x2828 0x78bb112b
hal fpga writed 0x2828 0x07336ee9
hal fpga writed 0x2828 0x78dc1101
hal fpga writed 0x2828 0x07126f12
hal fpga writed 0x2828 0x78fd10d8
hal fpga writed 0x2828 0x06f16f3c
hal fpga writed 0x2828 0x791e10ae
hal fpga writed 0x2828 0x06d16f66
hal fpga writed 0x2828 0x793e1084
hal fpga writed 0x2828 0x06b16f90
hal fpga writed 0x2828 0x795e105b
hal fpga writed 0x2828 0x06916fb9
hal fpga writed 0x2828 0x797e1031
hal fpga writed 0x2828 0x06716fe3
hal fpga writed 0x2828 0x799d1007
hal fpga writed 0x2828 0x0652700d
hal fpga writed 0x2828 0x79bc0fdd
hal fpga writed 0x2828 0x06337036
hal fpga writed 0x2828 0x79db0fb4
hal fpga writed 0x2828 0x06157060
hal fpga writed 0x2828 0x79f90f8a
hal fpga writed 0x2828 0x05f7708a
hal fpga writed 0x2828 0x7a170f61
hal fpga writed 0x2828 0x05d970b3
hal fpga writed 0x2828 0x7a350f37
hal fpga writed 0x2828 0x05bb70dd
hal fpga writed 0x2828 0x7a520f0d
hal fpga writed 0x2828 0x059e7106
hal fpga writed 0x2828 0x7a6f0ee4
hal fpga writed 0x2828 0x05817130
hal fpga writed 0x2828 0x7a8c0ebb
hal fpga writed 0x2828 0x05657159
hal fpga writed 0x2828 0x7aa80e91
hal fpga writed 0x2828 0x05497182
hal fpga writed 0x2828 0x7ac40e68
hal fpga writed 0x2828 0x052d71ac
hal fpga writed 0x2828 0x7ae00e3f
hal fpga writed 0x2828 0x051171d5
hal fpga writed 0x2828 0x7afb0e16
hal fpga writed 0x2828 0x04f671fe
hal fpga writed 0x2828 0x7b160dec
hal fpga writed 0x2828 0x04dc7227
hal fpga writed 0x2828 0x7b310dc3
hal fpga writed 0x2828 0x04c17250
hal fpga writed 0x2828 0x7b4b0d9b
hal fpga writed 0x2828 0x04a77279
hal fpga writed 0x2828 0x7b650d72
hal fpga writed 0x2828 0x048d72a2
hal fpga writed 0x2828 0x7b7e0d49
hal fpga writed 0x2828 0x047472ca
hal fpga writed 0x2828 0x7b980d20
hal fpga writed 0x2828 0x045b72f3
hal fpga writed 0x2828 0x7bb10cf8
hal fpga writed 0x2828 0x0442731c
hal fpga writed 0x2828 0x7bc90ccf
hal fpga writed 0x2828 0x042a7344
hal fpga writed 0x2828 0x7be20ca7
hal fpga writed 0x2828 0x0411736c
hal fpga writed 0x2828 0x7bf90c7f
hal fpga writed 0x2828 0x03fa7395
hal fpga writed 0x2828 0x7c110c56
hal fpga writed 0x2828 0x03e273bd
hal fpga writed 0x2828 0x7c280c2e
hal fpga writed 0x2828 0x03cb73e5
hal fpga writed 0x2828 0x7c3f0c06
hal fpga writed 0x2828 0x03b4740c
hal fpga writed 0x2828 0x7c560bdf
hal fpga writed 0x2828 0x039e7434
hal fpga writed 0x2828 0x7c6c0bb7
hal fpga writed 0x2828 0x0388745c
hal fpga writed 0x2828 0x7c820b8f
hal fpga writed 0x2828 0x03727483
hal fpga writed 0x2828 0x7c980b68
hal fpga writed 0x2828 0x035c74ab
hal fpga writed 0x2828 0x7cad0b41
hal fpga writed 0x2828 0x034774d2
hal fpga writed 0x2828 0x7cc20b1a
hal fpga writed 0x2828 0x033274f9
hal fpga writed 0x2828 0x7cd70af3
hal fpga writed 0x2828 0x031e7520
hal fpga writed 0x2828 0x7ceb0acc
hal fpga writed 0x2828 0x030a7547
hal fpga writed 0x2828 0x7cff0aa5
hal fpga writed 0x2828 0x02f6756d
hal fpga writed 0x2828 0x7d130a7f
hal fpga writed 0x2828 0x02e27594
hal fpga writed 0x2828 0x7d270a58
hal fpga writed 0x2828 0x02cf75ba
hal fpga writed 0x2828 0x7d3a0a32
hal fpga writed 0x2828 0x02bc75e0
hal fpga writed 0x2828 0x7d4c0a0c
hal fpga writed 0x2828 0x02a97606
hal fpga writed 0x2828 0x7d5f09e6
hal fpga writed 0x2828 0x0297762c
hal fpga writed 0x2828 0x7d7109c0
hal fpga writed 0x2828 0x02857652
hal fpga writed 0x2828 0x7d83099b
hal fpga writed 0x2828 0x02737677
hal fpga writed 0x2828 0x7d950975
hal fpga writed 0x2828 0x0262769c
hal fpga writed 0x2828 0x7da60950
hal fpga writed 0x2828 0x025176c1
hal fpga writed 0x2828 0x7db7092b
hal fpga writed 0x2828 0x024076e6
hal fpga writed 0x2828 0x7dc80906
hal fpga writed 0x2828 0x022f770b
hal fpga writed 0x2828 0x7dd808e2
hal fpga writed 0x2828 0x021f7730
hal fpga writed 0x2828 0x7de808bd
hal fpga writed 0x2828 0x020f7754
hal fpga writed 0x2828 0x7df80899
hal fpga writed 0x2828 0x01ff7778
hal fpga writed 0x2828 0x7e070875
hal fpga writed 0x2828 0x01f0779c
hal fpga writed 0x2828 0x7e170851
hal fpga writed 0x2828 0x01e177c0
hal fpga writed 0x2828 0x7e26082d
hal fpga writed 0x2828 0x01d277e4
hal fpga writed 0x2828 0x7e34080a
hal fpga writed 0x2828 0x01c47807
hal fpga writed 0x2828 0x7e4307e7
hal fpga writed 0x2828 0x01b5782a
hal fpga writed 0x2828 0x7e5107c3
hal fpga writed 0x2828 0x01a7784d
hal fpga writed 0x2828 0x7e5f07a1
hal fpga writed 0x2828 0x019a7870
hal fpga writed 0x2828 0x7e6c077e
hal fpga writed 0x2828 0x018c7892
hal fpga writed 0x2828 0x7e79075c
hal fpga writed 0x2828 0x017f78b5
hal fpga writed 0x2828 0x7e860739
hal fpga writed 0x2828 0x017278d7
hal fpga writed 0x2828 0x7e930717
hal fpga writed 0x2828 0x016678f9
hal fpga writed 0x2828 0x7e9f06f6
hal fpga writed 0x2828 0x0159791a
hal fpga writed 0x2828 0x7eac06d4
hal fpga writed 0x2828 0x014d793c
hal fpga writed 0x2828 0x7eb806b3
hal fpga writed 0x2828 0x0142795d
hal fpga writed 0x2828 0x7ec30692
hal fpga writed 0x2828 0x0136797e
hal fpga writed 0x2828 0x7ecf0671
hal fpga writed 0x2828 0x012b799e
hal fpga writed 0x2828 0x7eda0650
hal fpga writed 0x2828 0x012079bf
hal fpga writed 0x2828 0x7ee50630
hal fpga writed 0x2828 0x011579df
hal fpga writed 0x2828 0x7eef0610
hal fpga writed 0x2828 0x010a79ff
hal fpga writed 0x2828 0x7efa05f0
hal fpga writed 0x2828 0x01007a1f
hal fpga writed 0x2828 0x7f0405d0
hal fpga writed 0x2828 0x00f67a3f
hal fpga writed 0x2828 0x7f0e05b1
hal fpga writed 0x2828 0x00ec7a5e
hal fpga writed 0x2828 0x7f170591
hal fpga writed 0x2828 0x00e37a7d
hal fpga writed 0x2828 0x7f210573
hal fpga writed 0x2828 0x00da7a9c
hal fpga writed 0x2828 0x7f2a0554
hal fpga writed 0x2828 0x00d17aba
hal fpga writed 0x2828 0x7f330535
hal fpga writed 0x2828 0x00c87ad9
hal fpga writed 0x2828 0x7f3c0517
hal fpga writed 0x2828 0x00bf7af7
hal fpga writed 0x2828 0x7f4404f9
hal fpga writed 0x2828 0x00b77b15
hal fpga writed 0x2828 0x7f4c04db
hal fpga writed 0x2828 0x00af7b32
hal fpga writed 0x2828 0x7f5404be
hal fpga writed 0x2828 0x00a77b50
hal fpga writed 0x2828 0x7f5c04a1
hal fpga writed 0x2828 0x009f7b6d
hal fpga writed 0x2828 0x7f640484
hal fpga writed 0x2828 0x00977b8a
hal fpga writed 0x2828 0x7f6b0467
hal fpga writed 0x2828 0x00907ba6
hal fpga writed 0x2828 0x7f72044b
hal fpga writed 0x2828 0x00897bc3
hal fpga writed 0x2828 0x7f79042e
hal fpga writed 0x2828 0x00827bdf
hal fpga writed 0x2828 0x7f800412
hal fpga writed 0x2828 0x007c7bfa
hal fpga writed 0x2828 0x7f8703f7
hal fpga writed 0x2828 0x00757c16
hal fpga writed 0x2828 0x7f8d03db
hal fpga writed 0x2828 0x006f7c31
hal fpga writed 0x2828 0x7f9303c0
hal fpga writed 0x2828 0x00697c4c
hal fpga writed 0x2828 0x7f9903a5
hal fpga writed 0x2828 0x00637c67
hal fpga writed 0x2828 0x7f9f038a
hal fpga writed 0x2828 0x005d7c82
hal fpga writed 0x2828 0x7fa40370
hal fpga writed 0x2828 0x00587c9c
hal fpga writed 0x2828 0x7faa0356
hal fpga writed 0x2828 0x00537cb6
hal fpga writed 0x2828 0x7faf033c
hal fpga writed 0x2828 0x004e7cd0
hal fpga writed 0x2828 0x7fb40322
hal fpga writed 0x2828 0x00497cea
hal fpga writed 0x2828 0x7fb90308
hal fpga writed 0x2828 0x00447d03
hal fpga writed 0x2828 0x7fbd02ef
hal fpga writed 0x2828 0x00407d1c
hal fpga writed 0x2828 0x7fc202d6
hal fpga writed 0x2828 0x003b7d35
hal fpga writed 0x2828 0x7fc602bd
hal fpga writed 0x2828 0x00377d4e
hal fpga writed 0x2828 0x7fca02a5
hal fpga writed 0x2828 0x00337d66
hal fpga writed 0x2828 0x7fce028d
hal fpga writed 0x2828 0x002f7d7f
hal fpga writed 0x2828 0x7fd20274
hal fpga writed 0x2828 0x002c7d97
hal fpga writed 0x2828 0x7fd5025c
hal fpga writed 0x2828 0x00287dae
hal fpga writed 0x2828 0x7fd90245
hal fpga writed 0x2828 0x00257dc6
hal fpga writed 0x2828 0x7fdc022d
hal fpga writed 0x2828 0x00227ddd
hal fpga writed 0x2828 0x7fdf0216
hal fpga writed 0x2828 0x001e7df5
hal fpga writed 0x2828 0x7fe201ff
hal fpga writed 0x2828 0x001c7e0c
hal fpga writed 0x2828 0x7fe501e8
hal fpga writed 0x2828 0x00197e22
hal fpga writed 0x2828 0x7fe701d1
hal fpga writed 0x2828 0x00167e39
hal fpga writed 0x2828 0x7fea01ba
hal fpga writed 0x2828 0x00147e50
hal fpga writed 0x2828 0x7fec01a4
hal fpga writed 0x2828 0x00127e66
hal fpga writed 0x2828 0x7fef018d
hal fpga writed 0x2828 0x000f7e7d
hal fpga writed 0x2828 0x7ff10177
hal fpga writed 0x2828 0x000d7e93
hal fpga writed 0x2828 0x7ff30161
hal fpga writed 0x2828 0x000c7ea9
hal fpga writed 0x2828 0x7ff4014a
hal fpga writed 0x2828 0x000a7ec0
hal fpga writed 0x2828 0x7ff60134
hal fpga writed 0x2828 0x00087ed6
hal fpga writed 0x2828 0x7ff8011d
hal fpga writed 0x2828 0x00077eed
hal fpga writed 0x2828 0x7ff90106
hal fpga writed 0x2828 0x00057f04
hal fpga writed 0x2828 0x7ffa00ef
hal fpga writed 0x2828 0x00047f1c
hal fpga writed 0x2828 0x7ffb00d7
hal fpga writed 0x2828 0x00037f34
hal fpga writed 0x2828 0x7ffc00be
hal fpga writed 0x2828 0x00027f4e
hal fpga writed 0x2828 0x7ffd00a4
hal fpga writed 0x2828 0x00017f69
hal fpga writed 0x2828 0x7ffe0088
hal fpga writed 0x2828 0x00017f87
hal fpga writed 0x2828 0x00000067
hal fpga writed 0x2828 0x00007fac
hal fpga writed 0x2828 0x0000003a
hal fpga writed 0x2824 0x100
hal fpga writed 0x2890 0x2000
hal fpga writed 0x2894 0x647d
hal fpga writed 0x2898 0x0
hal fpga writed 0x289c 0x0
hal fpga writed 0x28a0 0x0
hal fpga writed 0x2100 0x80010080
hal fpga writed 0x2104 0x80010001
hal fpga writed 0x2108 0x80010002
hal fpga writed 0x210c 0x80010003
hal fpga writed 0x2110 0x80010004
hal fpga writed 0x2114 0x80010005
hal fpga writed 0x2118 0x80010006
hal fpga writed 0x211c 0x8001e007
hal fpga writed 0x2120 0x0
hal fpga writed 0x2124 0x0
hal fpga writed 0x2128 0x0
hal fpga writed 0x212c 0x0
hal fpga writed 0x2130 0x0
hal fpga writed 0x2134 0x0
hal fpga writed 0x2138 0x0
hal fpga writed 0x213c 0x0
hal fpga writed 0x2140 0x0
hal fpga writed 0x2144 0x0
hal fpga writed 0x2148 0x0
hal fpga writed 0x214c 0x0
hal fpga writed 0x2150 0x0
hal fpga writed 0x2154 0x0
hal fpga writed 0x2158 0x0
hal fpga writed 0x215c 0x0
hal fpga writed 0x2160 0x0
hal fpga writed 0x2164 0x0
hal fpga writed 0x2168 0x0
hal fpga writed 0x216c 0x0
hal fpga writed 0x2170 0x0
hal fpga writed 0x2174 0x0
hal fpga writed 0x2178 0x0
hal fpga writed 0x217c 0x0
hal fpga writed 0x2180 0x0
hal fpga writed 0x2184 0x0
hal fpga writed 0x2188 0x0
hal fpga writed 0x218c 0x0
hal fpga writed 0x2190 0x0
hal fpga writed 0x2194 0x0
hal fpga writed 0x2198 0x0
hal fpga writed 0x219c 0x0
hal fpga writed 0x21a0 0x0
hal fpga writed 0x21a4 0x0
hal fpga writed 0x21a8 0x0
hal fpga writed 0x21ac 0x0
hal fpga writed 0x21b0 0x0
hal fpga writed 0x21b4 0x0
hal fpga writed 0x21b8 0x0
hal fpga writed 0x21bc 0x0
hal fpga writed 0x21c0 0x0
hal fpga writed 0x21c4 0x0
hal fpga writed 0x21c8 0x0
hal fpga writed 0x21cc 0x0
hal fpga writed 0x21d0 0x0
hal fpga writed 0x21d4 0x0
hal fpga writed 0x21d8 0x0
hal fpga writed 0x21dc 0x0
hal fpga writed 0x21e0 0x0
hal fpga writed 0x21e4 0x0
hal fpga writed 0x21e8 0x0
hal fpga writed 0x21ec 0x0
hal fpga writed 0x21f0 0x0
hal fpga writed 0x21f4 0x0
hal fpga writed 0x21f8 0x0
hal fpga writed 0x21fc 0x0
hal fpga writed 0x2a00 0x34e0d
hal fpga writed 0x2a04 0x34e0d
hal fpga writed 0x2a08 0x34e0d
hal fpga writed 0x2a0c 0x34e0d
hal fpga writed 0x2a10 0x35804
hal fpga writed 0x2a14 0x35804
hal fpga writed 0x2a18 0x35302
hal fpga writed 0x2a1c 0x35302
hal fpga writed 0x20fc 0x400

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {ethphy link_info}>
<data>
ethphy link_info
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {Madura config from LiWen F}>
<data>
##### TX enable####
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 1 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 1

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 1 0x20 2

#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 1 0x20


#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 1 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 1 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 0 2625000000
madura func maduraFuncPllFrequencySet 1 1 2625000000

#####DPD MODEL####
madura func maduraFuncDpdModelConfigSet 1 2 95

####clgc config####
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncClgcConfigGet 1 2

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#### PA on####
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!

####initial tracking ####
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 2 0

#EXT LOL
madura func maduraFuncInitCalsRun 1 0x800 2 0

#DPD
madura func maduraFuncInitCalsRun 1 0x10000000 2 0

####QEC,LO,CLGC tracking enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
madura func maduraFuncDpdStatusGet 1 2


#### Tx test Tone #### optional
madura func maduraFuncTxTestToneSet 1 2 0 2000000 0


#### DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1
madura func maduraFuncDpdStatusGet 1 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {29} {Madura config from LiWen E}>
<data>
##### TX enable####
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 1 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 1

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 1 0x20 2
madura func maduraFuncTxToOrxMappingSet 1 0x10 1
madura func maduraFuncTxToOrxMappingSet 1 0x40 4
madura func maduraFuncTxToOrxMappingSet 1 0x80 8

#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 1 0x20


#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 1 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 1 0
madura func maduraFuncPllFrequencyGet 1 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 0 2595000000
madura func maduraFuncPllFrequencySet 1 1 2595000000
madura func maduraFuncPllFrequencySet 1 2 2595000000


#####DPD MODEL####
#madura func maduraFuncDpdModelConfigSet <trx_id> <txChannelMask> <dpdNumFeatures>
madura func maduraFuncDpdModelConfigSet 1 1 95
madura func maduraFuncDpdModelConfigSet 1 2 95

####clgc config####
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncClgcConfigGet 1 1

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#### PA on####
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!
hal fpga write 0x102c 0x0
hal fpga write 0x142c 0x0
hal fpga write 0x182c 0x0
hal fpga write 0x1c2c 0x0
####initial tracking ####
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 8 0

#EXT LOL
madura func maduraFuncInitCalsRun 1 0x800 8 0

#DPD
madura func maduraFuncInitCalsRun 1 0x10000000 8 0

####QEC,LO,CLGC tracking enable####
#madura func maduraFuncTrackingCalsEnableSet <trx_id> <enableMask> <enableDisableFlag>
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
madura func maduraFuncDpdStatusGet 1 1


#### Tx test Tone #### optional
#madura func maduraFuncTxTestToneSet <trx_id> <txNcoTestToneCfg.txChannelMask> <txNcoTestToneCfg.enable> <txNcoTestToneCfg.txToneFreq_Hz> <txNcoTestToneCfg.txToneGain>
madura func maduraFuncTxTestToneSet 1 1 1 2000000 1


#### DPD trackin enable####
#madura func maduraFuncTrackingCalsEnableSet <trx_id> <enableMask> <enableDisableFlag>
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1
madura func maduraFuncDpdStatusGet 1 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {IRU command}>
<button {0} {RESTART 1}>
<data>
restart 1
#restart 1,2,3,4,5,6,7,8

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {event log read}>
<data>
elog read
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {rd reset 1}>
<data>
rd reset 1
#reset PORT1 dot
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {eqpm swLoadSrv status all}>
<data>
eqpm swLoadSrv status all  

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {user login}>
<data>
root
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {dot1 OPHY trx packet read}>
<data>
rdsh 1 hal fpga write 0x4440 0x1
rdsh 1 hal fpga read 0x4454             #tx total packet
rdsh 1 hal fpga read 0x4458             #tx total good packet
rdsh 1 hal fpga read 0x445c             #rx total packet
rdsh 1 hal fpga read 0x4460             #rx total good packet
rdsh 1 hal fpga read 0x4464             #rx packet bad FCS

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {rd info connection}>
<data>
rd info connection
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {event log clear}>
<data>
elog clear
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {dot1 telog read}>
<data>
rd log 1 te read
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {dot1 temp all}>
<data>
rdsh 1 temp all

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {password}>
<data>
IWas@Office2day
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {dot1 EPHY trx packet read}>
<data>
rdsh 1 hal fpga write 0x3020 0x1
rdsh 1 hal fpga read 0x3700                    #TX_total_packets
rdsh 1 hal fpga read 0x3708                    #TX_total_good_packets
rdsh 1 hal fpga read 0x3808                    #RX_total_packets
rdsh 1 hal fpga read 0x3810                    #RX_total_good_packets
rdsh 1 hal fpga read 0x38c8                    #RX_packets_bad_fcs

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {eqpm rdFault dump all}>
<data>
eqpm rdFault dump all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {hwlog read}>
<data>
hwlog read
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {dot1 ev_log read}>
<data>
rd log 1 ev read
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {eqpm rdFault actions disable}>
<data>
eqpm rdFault actions disable
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {endebugport in TCA}>
<data>
lhsh RE_1_1_0 endebugport
#RE_1_1_0 is just an example, can be found in TCA RUMA page
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {IRU PORT1 trx packet read}>
<data>
digitalIruFpga w ETH_MAC_TICK 0x1
digitalIruFpga r ETH_MAC0_STAT_TX_TOTAL_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_TOTAL_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_TOTAL_GOOD_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_BAD_FCS

#MAC0=PORT1,MAC1=PORT2...



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {te log read}>
<data>
te log read
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {hwlog delete}>
<data>
hwlog delete
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {dot1 telog clear}>
<data>
rd log 1 te clear

#rdsh 1 log clear    
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {dot1 serial_number read}>
<data>
rdsh 1 db read /brd/hwSerNo
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {lmclist}>
<data>
lmclist
#list the pis and available app in iru
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {23} {IRU sfp read }>
<data>
eqpm rdSfp diagnostic_data all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {te log clear}>
<data>
te log clear

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {llog }>
<data>
llog
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {dot1 ev_log clear}>
<data>
rdsh 1 ev_log clear
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {IRU trx packet}>
<data>
digitalIruFpga w ETH_MAC_TICK 0x1
digitalIruFpga r ETH_MAC0_STAT_TX_TOTAL_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_TOTAL_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_TOTAL_GOOD_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_BAD_FCS
#MAC0=PORT1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {factory4455}>
<button {0} {1-DOT Common commands}>
<data>
#===truth table===
hal fpga write 0x11a4 0x4000001
hal fpga write 0x15a4 0x4000001
hal fpga write 0x19a4 0x4000001
hal fpga write 0x1da4 0x4000001
#===ethernet config and mac address===
hal fpga writed 0x106C 0x0303
hal fpga writed 0x146C 0x0303
hal fpga writed 0x186C 0x0303
hal fpga writed 0x1C6C 0x0303
#===DL Mac address====
hal fpga write 0x202c 0x07288447       
hal fpga write 0x2030 0x0000f0b1       
#====Rx Att 6dB attenuation set===
rfic func RxGainSet 0 1 1 242
rfic func RxGainSet 0 1 2 242
rfic func RxGainSet 0 1 4 241
rfic func RxGainSet 0 1 8 241
rfic func RxGainSet 1 1 1 241
rfic func RxGainSet 1 1 2 241
rfic func RxGainSet 1 1 4 241
rfic func RxGainSet 1 1 8 241

#==========UL 41k==============
#====Rx Att 6dB attenuation set===
rfic func RxGainSet 0 1 1 242
rfic func RxGainSet 0 1 2 242
rfic func RxGainSet 0 1 4 241
rfic func RxGainSet 0 1 8 241
rfic func RxGainSet 1 1 1 241
rfic func RxGainSet 1 1 2 241
rfic func RxGainSet 1 1 4 241
rfic func RxGainSet 1 1 8 241
srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx3
srv frequency actual branch_e rx 2585     
srv datapath unmute ul branch_e
temp dot
db read /rxE/gainTarget    
hal fpga ulgain set branch_e 0x4000
db write /trx3A/ul/ref_Fq 25850000
db read /trx3A/ul/ref_Fq
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_e


#========UL branchA=======
srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx1
srv frequency actual branch_a rx 1722.5     
srv datapath unmute ul branch_a
temp dot
db read /rxA/gainTarget    
hal fpga ulgain set branch_a 0x4000
db write /trx1A/ul/ref_Fq 17225000
db read /trx1A/ul/ref_Fq
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_a



#---------UL branchC========
srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx2
srv frequency actual branch_c rx 2347.5     
srv datapath unmute ul branch_c
temp dot
db read /rxC/gainTarget    
hal fpga ulgain set branch_c 0x4000
db write /trx2A/ul/ref_Fq 23475000
db read /trx2A/ul/ref_Fq
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_c




#========DL=============
#DOT mute all data path
hal fpga write 0x1020 0x10000
hal fpga write 0x1420 0x10000
hal fpga write 0x1820 0x10000
hal fpga write 0x1c20 0x10000
hal fpga write 0x102C 0x800000C0
hal fpga write 0x142C 0x800000C0
hal fpga write 0x182C 0x800000C0
hal fpga write 0x1C2C 0x800000C0


#====to IRU=====






</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {xenon}>
<data>
xenon txpwr xenon:0
xenon txpwr xenon:1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {5-dot UL carriersetup}>
<data>
fault clear
txrx datalink set ul configatc start
txrx datalink set ul branch_a 122880 6 17125000 120 1 9713 6 38 0 0 1250 156
txrx datalink set ul branch_b 122880 6 17125000 120 1 9713 7 38 0 0 1250 156
txrx datalink set ul branch_c 122880 6 23225000 120 1 9713 4 38 0 0 1250 156
txrx datalink set ul branch_d 122880 6 23225000 120 1 9713 5 38 0 0 1250 156
txrx datalink set ul branch_e 245760 6 25175000 120 1 9713 0 38 0 0 1250 156
txrx datalink set ul branch_f 245760 6 25175000 120 1 9713 1 38 0 0 1250 156
txrx datalink set ul branch_g 245760 6 25175000 120 1 9713 2 38 0 0 1250 156
txrx datalink set ul branch_h 245760 6 25175000 120 1 9713 3 38 0 0 1250 156
txrx rxcarrier set branch_a 1 1712.5 5 0 0 45150 0
txrx rxcarrier set branch_b 1 1712.5 5 0 0 45150 0
txrx rxcarrier set branch_c 1 2322.5 5 0 0 45150 0
txrx rxcarrier set branch_d 1 2322.5 5 0 0 45150 0
txrx rxcarrier set branch_e 1 2517.5 5 0 0 45150 0
txrx rxcarrier set branch_f 1 2517.5 5 0 0 45150 0
txrx rxcarrier set branch_g 1 2517.5 5 0 0 45150 0
txrx rxcarrier set branch_h 1 2517.5 5 0 0 45150 0
txrx datalink set ul configatc end
srv datapath mute ul all
srv datapath mute dl all
hal fpga write 0x2034 0x07269B55       
hal fpga write 0x2038 0x0000F0B1             
srv duplex mode set fdd trx1
srv datapath mute ul branch_a
txrx rx_enable_branch enable branch_a disable
txrx rx_enable_branch enable branch_a enable
txrx gainconfig start rx branch_a
srv duplex mode set fdd trx1
srv datapath mute ul branch_b
txrx rx_enable_branch enable branch_b disable
txrx rx_enable_branch enable branch_b enable
txrx gainconfig start rx branch_b
srv duplex mode set fdd trx2
srv datapath mute ul branch_c
txrx rx_enable_branch enable branch_c disable
txrx rx_enable_branch enable branch_c enable
txrx gainconfig start rx branch_c
srv duplex mode set fdd trx2
srv datapath mute ul branch_d
txrx rx_enable_branch enable branch_d disable
txrx rx_enable_branch enable branch_d enable
txrx gainconfig start rx branch_d
srv duplex mode set fdd trx3
srv datapath mute ul branch_e
txrx rx_enable_branch enable branch_e disable
txrx rx_enable_branch enable branch_e enable
txrx gainconfig start rx branch_e
srv duplex mode set fdd trx3
srv datapath mute ul branch_f
txrx rx_enable_branch enable branch_f disable
txrx rx_enable_branch enable branch_f enable
txrx gainconfig start rx branch_f
srv duplex mode set fdd trx4
srv datapath mute ul branch_g
txrx rx_enable_branch enable branch_g disable
txrx rx_enable_branch enable branch_g enable
txrx gainconfig start rx branch_g
srv duplex mode set fdd trx4
srv datapath mute ul branch_h
txrx rx_enable_branch enable branch_h disable
txrx rx_enable_branch enable branch_h enable
txrx gainconfig start rx branch_h
hal fpga write 0x5094 0x0237f
hal fpga write 0x5098 0x0237f
hal fpga write 0x509c 0x0237f
hal fpga write 0x50a0 0x0237f

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {1-DL-IRUsetup}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
db add /7xx/id_ruType_8.2.x/BandIII.E/supportedRat -f -t char "T N L"
db add /7xx/id_ruType_8.2.x/Band40.A/supportedRat -f -t char "T N L"
rd start 0
rd macAddress 0 f0:b1:07:28:84:47                         
digitalIruFpga w DPE_0_DL_DST_0 0x07288447       
digitalIruFpga w DPE_0_DL_DST_1 0x0000f0b1       
ptd rdModel sampleRate set 122880
ptd rdModel branchBandCap set AB BandIII.E FDD
ptd rdModel branchBandCap set CD Band40.A FDD
ptd rdModel branchBandCap set EFGH Band41.K FDD
ptd rdModel branchFreqCap set TX AB 1805000 1830000 10 100000
ptd rdModel branchFreqCap set TX CD 2320000 2370000 10 100000
ptd rdModel branchFreqCap set TX EFGH 2515000 2675000 10 100000
rd finalize

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {2-IRU-setup carriers}>
<data>
#eqpm rdctrl xenonMode set 8                

trdc release 1
trdc release 2
trdc release 3
trdc release 4
trdc release 5
trdc release 6
trdc release 7
trdc release 8
trdc release 9
trdc release 10
trdc release 11
trdc release 12
trdc release 13
trdc release 14
trdc release 15
trdc release 16
trdc release 17
trdc release 18
trdc release 19
trdc release 20
trdc release 21
trdc release 22
trdc release 23
trdc release 24
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
db add /7xx/id_ruType_8.2.x/BandIII.E/supportedRat -f -t char "T N L"
db add /7xx/id_ruType_8.2.x/Band40.A/supportedRat -f -t char "T N L"
rd start 0
rd macAddress 0 f0:b1:07:28:84:47                         
digitalIruFpga w DPE_0_DL_DST_0 0x07288447       
digitalIruFpga w DPE_0_DL_DST_1 0x0000f0b1       
ptd rdModel sampleRate set 122880
ptd rdModel branchBandCap set AB BandIII.E FDD
ptd rdModel branchBandCap set CD Band40.A FDD
ptd rdModel branchBandCap set EFGH Band41.K FDD
ptd rdModel branchFreqCap set TX AB 1805000 1830000 10 100000
ptd rdModel branchFreqCap set TX CD 2320000 2370000 10 100000
ptd rdModel branchFreqCap set TX EFGH 2515000 2675000 10 100000
rd finalize
trdc setup6 21 0 1 1817500 0 0 -0 5000 0 0 -0 1 0 0 7680 0 1 1 1 1 0 0 4 0
trdc setup6 22 0 1 1817500 0 0 -0 5000 0 1 -0 1 0 0 7680 0 1 1 1 1 0 2 4 0
trdc setup6 23 0 1 2347500 0 0 -0 5000 0 2 -0 1 0 0 7680 0 1 1 1 1 1 0 4 0
trdc setup6 24 0 1 2347500 0 0 -0 5000 0 3 -0 1 0 0 7680 0 1 1 1 1 1 2 4 0
trdc setup6 1 0 1 2585000 0 0 -0 20000 0 4 -0 1 0 0 19200 0 1 0 1 1 0 0 1 0
trdc setup6 2 0 1 2585000 0 0 -0 20000 0 5 -0 1 0 0 19200 0 1 0 1 1 0 5 1 0
trdc setup6 3 0 1 2585000 0 0 -0 20000 0 6 -0 1 0 0 19200 0 1 0 1 1 1 4 1 0
trdc setup6 4 0 1 2585000 0 0 -0 20000 0 7 -0 1 0 0 19200 0 1 0 1 1 2 3 1 0
trdc on 21
trdc on 22
trdc on 23
trdc on 24
trdc on 1
trdc on 2
trdc on 3
trdc on 4











</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {Dot start to PIS}>
<data>
scoreboard init
scoreboard requested pis
system reset

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {6-xenon rx}>
<data>
xenon rxpwr xenon:1
xenon rxpwr xenon:0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {2-DL-dot setup}>
<data>
fault clear
txrx datalink set dl configatc start
txrx datalink set dl branch_a 122880 6 18075000 120 4 21253 36 44 0 0 1250 156
txrx datalink set dl branch_b 122880 6 18075000 120 4 21253 37 44 0 0 1250 156
txrx datalink set dl branch_c 122880 6 23300000 120 3 20642 34 61 0 0 1250 156
txrx datalink set dl branch_d 122880 6 23300000 120 3 20642 35 61 0 0 1250 156
txrx datalink set dl branch_e 245760 6 25650000 120 2 26112 28 97 0 0 1250 156
txrx datalink set dl branch_f 245760 6 25650000 120 2 26112 29 97 0 0 1250 156
txrx datalink set dl branch_g 245760 6 25650000 120 2 26112 30 97 0 0 1250 156
txrx datalink set dl branch_h 245760 6 25650000 120 2 26112 31 97 0 0 1250 156
txrx txcarrier set  branch_a 1 1807.5 5 2100 0 45150 6
txrx txcarrier set  branch_b 1 1807.5 5 2100 0 45150 6
txrx txcarrier set  branch_c 1 2330.5 20 2400 0 190950 5
txrx txcarrier set  branch_d 1 2330.5  20 2400 0 190950 5
txrx txcarrier set  branch_e 5 2525 20 1900 0 190950 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5
txrx txcarrier set  branch_f 5 2525 20 1900 0 190950 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5
txrx txcarrier set  branch_g 5 2525 20 1900 0 190950 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5
txrx txcarrier set  branch_h 5 2525 20 1900 0 190950 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5
txrx datalink set dl configatc end
srv datapath mute ul all
srv datapath mute dl all
srv duplex mode set fdd trx1
srv datapath mute dl branch_a
txrx tx_enable_branch enable branch_a disable
txrx tx_enable_branch enable branch_a enable
srv pwrmeas dlpwr get branch_a
srv duplex mode set fdd trx1
srv datapath mute dl branch_b
txrx tx_enable_branch enable branch_b disable
txrx tx_enable_branch enable branch_b enable
srv pwrmeas dlpwr get branch_b
srv duplex mode set fdd trx2
srv datapath mute dl branch_c
txrx tx_enable_branch enable branch_c disable
txrx tx_enable_branch enable branch_c enable
srv pwrmeas dlpwr get branch_c
srv duplex mode set fdd trx2
srv datapath mute dl branch_d
txrx tx_enable_branch enable branch_d disable
txrx tx_enable_branch enable branch_d enable
srv pwrmeas dlpwr get branch_d
srv duplex mode set fdd trx3
srv datapath mute dl branch_e
txrx tx_enable_branch enable branch_e disable
txrx tx_enable_branch enable branch_e enable
srv pwrmeas dlpwr get branch_e
srv duplex mode set fdd trx3
srv datapath mute dl branch_f
txrx tx_enable_branch enable branch_f disable
txrx tx_enable_branch enable branch_f enable
srv pwrmeas dlpwr get branch_f
srv duplex mode set fdd trx4
srv datapath mute dl branch_g
txrx tx_enable_branch enable branch_g disable
txrx tx_enable_branch enable branch_g enable
srv pwrmeas dlpwr get branch_g
srv duplex mode set fdd trx4
srv datapath mute dl branch_h
txrx tx_enable_branch enable branch_h disable
txrx tx_enable_branch enable branch_h enable
srv pwrmeas dlpwr get branch_h

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {3-dot ATC}>
<data>
srv datapath mute dl all
srv datapath mute ul all
srv datalink init
srv datalink set dl configatc start
srv datalink set dl branch_a atcparam 122880 6 18175000 120 4 21253 10 44 0 0 1250 156
srv datalink set dl branch_a carrierparam 1 18175000 50000 2100 0 45150 6
srv datalink set dl branch_b atcparam 122880 6 18175000 120 4 21253 11 44 0 0 1250 156
srv datalink set dl branch_b carrierparam 1 18175000 50000 2100 0 45150 6
srv datalink set dl branch_c atcparam 122880 6 23475000 120 4 21253 8 44 0 0 1250 156
srv datalink set dl branch_c carrierparam 1 23475000 50000 2400 0 45150 6
srv datalink set dl branch_d atcparam 122880 6 23475000 120 4 21253 9 44 0 0 1250 156
srv datalink set dl branch_d carrierparam 1 23475000 50000 2400 0 45150 6
srv datalink set dl branch_e atcparam 245760 6 25850000 120 3 29193 4 61 0 0 1250 156
srv datalink set dl branch_e carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl branch_f atcparam 245760 6 25850000 120 3 29193 5 61 0 0 1250 156
srv datalink set dl branch_f carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl branch_g atcparam 245760 6 25850000 120 3 29193 6 61 0 0 1250 156
srv datalink set dl branch_g carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl branch_h atcparam 245760 6 25850000 120 3 29193 7 61 0 0 1250 156
srv datalink set dl branch_h carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl configatc linkspeed 10000
srv datalink set dl configatc end

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {pis dot common}>
<data>
hal fpga write 0x11a4 0x4000001
hal fpga write 0x15a4 0x4000001
hal fpga write 0x19a4 0x4000001
hal fpga write 0x1da4 0x4000001
hal fpga write 0x106C 0x0303
hal fpga write 0x146C 0x0303
hal fpga write 0x186C 0x0303
hal fpga write 0x1C6C 0x0303
hal fpga write 0x202c 0x07288447       
hal fpga write 0x2030 0x0000f0b1       
tddsyncsup test set crc_err 0
tddsyncsup test set msg_err 0
tddsyncsup test set unexpected 0
tddsyncsup test set msg_miss 0
 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {7-dot UL release}>
<data>
srv datapath mute ul all
srv datapath mute dl all
srv datapath mute ul branch_a
txrx rx_enable_branch enable branch_a disable
srv datapath mute ul branch_b
txrx rx_enable_branch enable branch_b disable
srv datapath mute ul branch_c
txrx rx_enable_branch enable branch_c disable
srv datapath mute ul branch_d
txrx rx_enable_branch enable branch_d disable
srv datapath mute ul branch_e
txrx rx_enable_branch enable branch_e disable
srv datapath mute ul branch_f
txrx rx_enable_branch enable branch_f disable
srv datapath mute ul branch_g
txrx rx_enable_branch enable branch_g disable
srv datapath mute ul branch_h
txrx rx_enable_branch enable branch_h disable

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {3-DL-d0t release}>
<data>
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h
txrx tx_enable_branch enable branch_a disable
txrx tx_enable_branch enable branch_b disable
txrx tx_enable_branch enable branch_c disable
txrx tx_enable_branch enable branch_d disable
txrx tx_enable_branch enable branch_e disable
txrx tx_enable_branch enable branch_f disable
txrx tx_enable_branch enable branch_g disable
txrx tx_enable_branch enable branch_h disable
srv datapath mute ul all
srv datapath mute dl all

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {4-CLGC DPD}>
<data>
rfic func ClgcConfigSet 0 1 0x0F 0 1000 512 -3 0.05 -46 -50 0 2 0.1 10 30
rfic func ClgcConfigSet 1 1 0x0F 0 1000 512 -3 0.05 -46 -50 0 2 0.1 10 30
rfic func DpdTrackingConfigSet 0 0x01 25 40 16384 0x10448D0 655350 2 0x292 50 0x207 1 0 20
rfic func DpdTrackingConfigSet 0 0x02 25 40 16384 0x10448D0 655350 2 0x292 50 0x207 1 0 20
rfic func DpdTrackingConfigSet 0 0x04 25 38 16384 0x10448D0 655350 2 0x292 50 0x207 1 0 20
rfic func DpdTrackingConfigSet 0 0x08 25 38 16384 0x10448D0 655350 2 0x292 50 0x207 1 0 20
rfic func DpdTrackingConfigSet 1 0x0F 30 35 16384 0x106C4C  655350 2 0x292 50 0x207 1 0 20

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {3-iru UL setup}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
db add /7xx/id_ruType_8.2.x/BandIII.E/supportedRat -f -t char "T N L"
db add /7xx/id_ruType_8.2.x/Band40.A/supportedRat -f -t char "T N L"
xenon:0 write SYNC_PROD_DLY_1 1228749
db write /7xx/id_ruType_8.2.x/ul/rf_bA/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bB/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bC/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bD/rfPortToSmgCpriI2SubDelay  304531
rd start 0
ptd rdModel sampleRate set 122880
ptd rdModel branchBandCap set AB BandIII.E FDD
ptd rdModel branchBandCap set CD Band40.A FDD
ptd rdModel branchBandCap set EFGH Band41.K FDD
ptd rdModel branchFreqCap set RX AB 1710000 1735000 10 100000
ptd rdModel branchFreqCap set RX CD 2320000 2370000 10 100000
ptd rdModel branchFreqCap set RX EFGH 2515000 2675000 10 100000
rd finalize

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {dot atc configuration}>
<data>
srv atc get dl nulling trx0
srv atc get dl nulling trx1
srv atc get dl nulling trx2
srv atc get dl nulling trx3

srv atc get dl psd trx0
srv atc get dl psd trx1
srv atc get dl psd trx2
srv atc get dl psd trx3

srv atc get dl scale trx0
srv atc get dl scale trx1
srv atc get dl scale trx2
srv atc get dl scale trx3

srv atc get dl block
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {IRU atc configuration}>
<data>
dRdiAtcData read nulling 0
dRdiAtcData read nulling 1
dRdiAtcData read nulling 2
dRdiAtcData read nulling 3

dRdiAtcData read psd 0
dRdiAtcData read psd 1
dRdiAtcData read psd 2
dRdiAtcData read psd 3

dRdiAtcData read scale 0
dRdiAtcData read scale 1
dRdiAtcData read scale 2
dRdiAtcData read scale 3

dRdiAtcData read block
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {5-branchE}>
<data>

#====branchE=====
srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 1 1 1 20000
srv duplex tdd_en set disable trx3
srv frequency actual branch_e tx 2585
srv datapath unmute dl branch_e
	#1s delay
rfic func PreConfigAttForExtPathDelayCals 0
rfic func PreConfigAttForExtPathDelayCals 1
rfic func InitCalsRun 1 0x200000 1 0
	#1s delay
rfic func InitCalsRun 1 0x800 1 0
	#1s delay
rfic func TrackingCalsEnableSet 1 0xfffff0 0 
rfic func DpdReset 1 1 2
rfic func DpdReset 1 1 1
rfic func TrackingCalsEnableSet 1 0x100000 1 
rfic func TxAttenSet 1 1 1 20000  
srv pwrmeas dlpwr get branch_e

#=====branchA=====
srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 0 1 1 20000
srv duplex tdd_en set disable trx1
srv frequency actual branch_a tx 1817.5
srv datapath unmute dl branch_a
	#1s delay
rfic func PreConfigAttForExtPathDelayCals 0
rfic func PreConfigAttForExtPathDelayCals 1
rfic func InitCalsRun 0 0x200000 1 0
	#1s delay
rfic func InitCalsRun 0 0x800 1 0
	#1s delay
rfic func TrackingCalsEnableSet 0 0xfffff0 0 
rfic func DpdReset 0 1 2
rfic func DpdReset 0 1 1
rfic func TrackingCalsEnableSet 0 0x100000 1 
rfic func TxAttenSet 0 1 1 20000  
srv pwrmeas dlpwr get branch_a


#======branchC=====
srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 0 1 4 20000
srv duplex tdd_en set disable trx2
srv frequency actual branch_c tx 2347.5
rfic func PreConfigAttForExtPathDelayCals 0
rfic func PreConfigAttForExtPathDelayCals 1
srv datapath unmute dl branch_c
	#1s delay
rfic func InitCalsRun 0 0x200000 4 0
	#1s delay
rfic func InitCalsRun 0 0x800 4 0
	#1s delay
rfic func TrackingCalsEnableSet 0 0xfffff0 0 
rfic func DpdReset 0 4 2
rfic func DpdReset 0 4 1
rfic func TrackingCalsEnableSet 0 0x400000 1 
rfic func TxAttenSet 0 1 4 20000 
srv pwrmeas dlpwr get branch_c


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {4-rux UL carriersetup ATC}>
<data>
#digitalIruFpga r OAM0_IRU_MAC_ADDR_LSB     //Read and Record Low 8bit of IRU Mac
#digitalIruFpga r OAM0_IRU_MAC_ADDR_MSB    //Read and Record High 4bit of IRU Mac
digitalIruFpga w ATC_IFFT_BINSCALE_BP0 0x07366
digitalIruFpga w ATC_IFFT_BINSCALE_BP1 0x07366
digitalIruFpga w ATC_IFFT_BINSCALE_BP2 0x07366
digitalIruFpga w ATC_IFFT_BINSCALE_BP3 0x07366

</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {factory4459}>
<button {0} {1-dl-dot common}>
<data>
#===truth table===
hal fpga write 0x19a4 0x4000001
hal fpga write 0x1da4 0x4000001
#===ethernet config and mac address===
hal fpga writed 0x186C 0x0303
hal fpga writed 0x1C6C 0x0303
#===DL Mac address====
#Data: f0:b1:07:28:94:05
hal fpga write 0x202c 0x07289405
hal fpga write 0x2030 0x0000f0b1 
#need to mute DOT all data path before Carrier release.
hal fpga write 0x1820 0x10000
hal fpga write 0x1c20 0x10000
hal fpga write 0x182C 0x800000C0
hal fpga write 0x1C2C 0x800000C0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {xenon tx}>
<data>
xenon txpwr xenon:0
xenon txpwr xenon:1


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {1-PIS-dl/UL-dot common}>
<data>
hal fpga write 0x19a4 0x4000001
hal fpga write 0x1da4 0x4000001
hal fpga write 0x186C 0x0303
hal fpga write 0x1C6C 0x0303
#8bit of DOT Mac address
hal fpga write 0x202c 0x07289405       
hal fpga write 0x2030 0x0000f0b1 
#Workaround for SW bug, formal version will remove 
#db write /brd/trx2A/duplexMode 1 
#db write /brd/trx2B/duplexMode 1 
#Workaround for SW bug, formal version will remove
#db sync                                         
tddsyncsup test set crc_err 0
tddsyncsup test set msg_err 0
tddsyncsup test set unexpected 0
tddsyncsup test set msg_miss 0


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {1-PIS-UL-irusetup}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
xenon:0 write SYNC_PROD_DLY_1 1228749
db write /7xx/id_ruType_8.2.x/ul/rf_bA/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bB/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bC/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bD/rfPortToSmgCpriI2SubDelay  304531
rd start 0
#ptd rdModel sampleRate set 122880
ptd rdModel sampleRate set 245760 245760 245760 245760
ptd rdModel branchBandCap set ABCD Band41.K FDD
#ptd rdModel branchFreqCap set RX ABCD 2515000 2675000 10 100000
ptd rdModel branchFreqCap set RX ABCD 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX ABCD 2515000 2675000 10 200000
rd finalize

#============rux carrier setup===========

#digitalIruFpga r OAM0_IRU_MAC_ADDR_LSB     //Read and Record Low 8bit of IRU Mac
#digitalIruFpga r OAM0_IRU_MAC_ADDR_MSB    //Read and Record High 4bit of IRU Mac

#digitalIruFpga w ATC_BINSCALE_FACTOR_BP0 0xffff0000 0x73660000
#digitalIruFpga w ATC_BINSCALE_FACTOR_BP1 0xffff0000 0x73660000
#digitalIruFpga w ATC_BINSCALE_SHIFT 0xffff0000 0x00000000
#digitalIruFpga w ATC_FFT_BINSCALE_BP0 0x7366
#digitalIruFpga w ATC_FFT_BINSCALE_BP1 0x7366

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {read fpga}>
<data>
dRdiAtcData read psd 2
digitalIruFpga info
digitalIruFpga r DPE_0_DL_SETUP
digitalIruFpga r ATC_TX_CFG
digitalIruFpga w ATC_TX_CFG x01C

srv pwrmeas dlpwr get branch_a

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {test}>
<data>
#bin pair2
hal fpga write 0x57d0 0x4
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8
hal fpga read 0x57d8

#bin pair3
hal fpga write 0x57dc 0x4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4
hal fpga read 0x57e4



digitalIruFpga w ATC_FFT_BIN_CTRL_FULL_BP2_CFG 0x00000010 0x00000010
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP2_GET


digitalIruFpga w ATC_FFT_BIN_CTRL_FULL_BP3_CFG 0x00000010 0x00000010
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
digitalIruFpga r ATC_FFT_BIN_CTRL_FULL_BP3_GET
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {2-iru setup}>
<data>
#eqpm rdctrl xenonMode set 4
 
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
rd start 0
rd macAddress 0 f0:b1:07:28:94:05                         
digitalIruFpga w DPE_0_DL_DST_0 0x07289405        
digitalIruFpga w DPE_0_DL_DST_1 0x0000f0b1       
#ptd rdModel sampleRate set 122880
ptd rdModel sampleRate set 245760 245760 245760 245760
#ptd rdModel sampleRate get 
ptd rdModel branchBandCap set ABCD Band41.K FDD
#ptd rdModel branchFreqCap set TX ABCD 2515000 2675000 10 100000
ptd rdModel branchFreqCap set RX ABCD 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX ABCD 2515000 2675000 10 200000
rd finalize


trdc setup3 1 0 1 2585000 0 0 -0 20000 0 0 -0 1 0 0 30720 1 0 1 1 0 0
trdc setup3 2 0 1 2585000 0 0 -0 20000 0 1 -0 1 0 0 30720 1 0 1 1 8 0
trdc setup3 3 0 1 2585000 0 0 -0 20000 0 2 -0 1 0 0 30720 1 0 1 1 16 0
trdc setup3 4 0 1 2585000 0 0 -0 20000 0 3 -0 1 0 0 30720 1 0 1 1 24 0

trdc on 1
trdc on 2
trdc on 3
trdc on 4

dRdiAtcData read psd 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {etsw-UL }>
<data>
rfic func RxGainSet 0 1 1 241
rfic func RxGainSet 0 1 2 241
rfic func RxGainSet 0 1 4 241
rfic func RxGainSet 0 1 8 241

srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx3
srv frequency actual branch_a rx 2585     
srv datapath unmute ul branch_a
db read /rxA/gainTarget    
hal fpga ulgain set branch_a 0x4000
db write /trx3A/ul/ref_Fq 25850000
db read /trx3A/ul/ref_Fq
#SG input power level
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_a


srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx3
srv frequency actual branch_b rx 2585     
srv datapath unmute ul branch_b
db read /rxB/gainTarget    
hal fpga ulgain set branch_b 0x4000
db write /trx3B/ul/ref_Fq 25850000
db read /trx3B/ul/ref_Fq
#SG input power level
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_b



srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx4
srv frequency actual branch_c rx 2585     
srv datapath unmute ul branch_c
db read /rxC/gainTarget    
hal fpga ulgain set branch_c 0x4000
db write /trx4A/ul/ref_Fq 25850000
db read /trx4A/ul/ref_Fq
#SG input power level
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_c


srv datapath mute dl all
srv datapath mute ul all
srv duplex tdd_en set disable trx4
srv frequency actual branch_d rx 2585     
srv datapath unmute ul branch_d
temp dot
db read /rxD/gainTarget   
hal fpga ulgain set branch_d 0x4000
db write /trx4B/ul/ref_Fq 25850000
db read /trx4B/ul/ref_Fq
#//SG input power level
db write /ul/refInputDigPower -6000    
db read /ul/refInputDigPower
srv pwrmeas ulpwr get branch_d













</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {2-iru setup}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
rd start 0
rd macAddress 0 f0:b1:07:28:94:05                         
digitalIruFpga w DPE_0_DL_DST_0 0x07289405        
digitalIruFpga w DPE_0_DL_DST_1 0x0000f0b1 
ptd rdModel sampleRate set 245760 245760 245760 245760
ptd rdModel branchBandCap set ABCD Band41.K FDD
#ptd rdModel branchFreqCap set TX ABCD 2515000 2675000 10 100000
ptd rdModel branchFreqCap set RX ABCD 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX ABCD 2515000 2675000 10 200000
rd finalize

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {2-dot-setup NF}>
<data>
#fault clear
#txrx datalink set ul configatc start
#txrx datalink set ul branch_a 245760 6 25175000 120 1 9713 0 38 0 0 0 0
#txrx datalink set ul branch_b 245760 6 25175000 120 1 9713 1 38 0 0 0 0
#txrx datalink set ul branch_c 245760 6 25175000 120 1 9713 2 38 0 0 0 0
#txrx datalink set ul branch_d 245760 6 25175000 120 1 9713 3 38 0 0 0 0
#txrx rxcarrier set branch_a 1 2517.5 5 0 0 45150 0
#txrx rxcarrier set branch_b 1 2517.5 5 0 0 45150 0
#txrx rxcarrier set branch_c 1 2517.5 5 0 0 45150 0
#txrx rxcarrier set branch_d 1 2517.5 5 0 0 45150 0
#txrx datalink set ul configatc end

fault clear
txrx datalink set ul configatc start
txrx datalink set ul branch_a 245760 6 25850000 120 2 17902 0 38 0 0 1250 156
txrx datalink set ul branch_b 245760 6 25850000 120 2 17902 1 38 0 0 1250 156
txrx datalink set ul branch_c 245760 6 25850000 120 2 17902 2 38 0 0 1250 156
txrx datalink set ul branch_d 245760 6 25850000 120 2 17902 3 38 0 0 1250 156
txrx rxcarrier set branch_a 1 2585 5 2600 0 45150 0
txrx rxcarrier set branch_b 1 2585 5 2600 0 45150 0
txrx rxcarrier set branch_c 1 2585 5 2600 0 45150 0
txrx rxcarrier set branch_d 1 2585 5 2600 0 45150 0
txrx datalink set ul configatc end

#add DPE
hal fpga write 0x2020 0
hal fpga write 0x2020 0x30000

srv datapath mute ul all
srv datapath mute dl all
#IRU Mac address
hal fpga write 0x2034 0x07269B55       
hal fpga write 0x2038 0x0000F0B1



srv duplex mode set fdd trx3
srv datapath mute ul branch_a
txrx rx_enable_branch enable branch_a disable
txrx rx_enable_branch enable branch_a enable
txrx gainconfig start rx branch_a

srv duplex mode set fdd trx3
srv datapath mute ul branch_b
txrx rx_enable_branch enable branch_b disable
txrx rx_enable_branch enable branch_b enable
txrx gainconfig start rx branch_b

srv duplex mode set fdd trx4
srv datapath mute ul branch_c
txrx rx_enable_branch enable branch_c disable
txrx rx_enable_branch enable branch_c enable
txrx gainconfig start rx branch_c

srv duplex mode set fdd trx4
srv datapath mute ul branch_d
txrx rx_enable_branch enable branch_d disable
txrx rx_enable_branch enable branch_d enable
txrx gainconfig start rx branch_d

#hal fpga write 0x509c 0x237e
#hal fpga write 0x50a0 0x237e



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {6 DOT PIS release UL}>
<data>
srv datapath mute ul all
srv datapath mute dl all
srv datapath mute ul branch_a
txrx rx_enable_branch enable branch_a disable
srv datapath mute ul branch_b
txrx rx_enable_branch enable branch_b disable
srv datapath mute ul branch_c
txrx rx_enable_branch enable branch_c disable
srv datapath mute ul branch_d
txrx rx_enable_branch enable branch_d disable

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {trx1 clgc/dpd}>
<data>
rdsh 1 rfic clgc trx1 get tx1 status
rdsh 1 rfic clgc trx1 get tx2 status
rdsh 1 rfic clgc trx1 get tx3 status
rdsh 1 rfic clgc trx1 get tx4 status

rfic clgc trx3 get tx1 status
rfic clgc trx3 get tx2 status
rfic clgc trx3 get tx3 status
rfic clgc trx3 get tx4 status


rdsh 1 rfic TxAttenGet trx1 1
rdsh 1 rfic TxAttenGet trx1 2
rdsh 1 rfic TxAttenGet trx1 4
rdsh 1 rfic TxAttenGet trx1 8

rdsh 1 rfic TxAttenGet trx3 1
rdsh 1 rfic TxAttenGet trx3 2
rdsh 1 rfic TxAttenGet trx3 4
rdsh 1 rfic TxAttenGet trx3 8

rfic func TxAttenGet 0 4





rdsh 1 rfic dpdStatus trx3 get tx2 status

rdsh 1 rfic dpdStatus trx1 get tx1 status
rdsh 1 rfic dpdStatus trx1 get tx2 status
rdsh 1 rfic dpdStatus trx1 get tx3 status
rdsh 1 rfic dpdStatus trx1 get tx4 status

rdsh 1 rfic dpdStatus trx3 get tx1 status
rdsh 1 rfic dpdStatus trx3 get tx2 status
rdsh 1 rfic dpdStatus trx3 get tx3 status
rdsh 1 rfic dpdStatus trx3 get tx4 status
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {3-dot ATC}>
<data>
srv datapath mute dl all
srv datapath mute ul all
srv datalink init
srv datalink set dl configatc start
srv datalink set dl branch_a atcparam  245760 6 25850000 120 3 29193 4 61 0 0 1250 156
srv datalink set dl branch_a carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl branch_b atcparam  245760 6 25850000 120 3 29193 5 61 0 0 1250 156
srv datalink set dl branch_b carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl branch_c atcparam  245760 6 25850000 120 3 29193 6 61 0 0 1250 156
srv datalink set dl branch_c carrierparam 1 25850000 200000 2600 0 190950 5
srv datalink set dl branch_d atcparam  245760 6 25850000 120 3 29193 7 61 0 0 1250 156
srv datalink set dl branch_d carrierparam 1 25850000 200000 2600 0 190950 5
#srv datalink set dl configatc linkspeed 10000
srv datalink set dl configatc end

#add DPE
#hal fpga write 0x2020 0x0
#hal fpga write 0x2020 0x30000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {xenon rx}>
<data>
xenon rxpwr xenon:0
xenon rxpwr xenon:1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {3-dot ATC and ACLR}>
<data>
fault clear
txrx datalink set dl configatc start
txrx datalink set dl branch_a 245760 6 25850000 120 2 26112 28 97 0 0 1250 156
txrx datalink set dl branch_b 245760 6 25850000 120 2 26112 29 97 0 0 1250 156
txrx datalink set dl branch_c 245760 6 25850000 120 2 26112 30 97 0 0 1250 156
txrx datalink set dl branch_d 245760 6 25850000 120 2 26112 31 97 0 0 1250 156
txrx txcarrier set  branch_a 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5 2625 20 1900 0 190950 5
txrx txcarrier set  branch_b 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5 2625 20 1900 0 190950 5
txrx txcarrier set  branch_c 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5 2625 20 1900 0 190950 5
txrx txcarrier set  branch_d 5 2545 20 1900 0 190950 5 2565 20 1900 0 190950 5 2585 20 1900 0 190950 5 2605 20 1900 0 190950 5 2625 20 1900 0 190950 5
txrx datalink set dl configatc end
#add DPE
hal fpga write 0x2020 0
hal fpga write 0x2020 0x30000

srv datapath mute ul all
srv datapath mute dl all
srv duplex mode set fdd trx3
srv datapath mute dl branch_a
txrx tx_enable_branch enable branch_a disable
txrx tx_enable_branch enable branch_a enable
srv pwrmeas dlpwr get branch_a

srv duplex mode set fdd trx3
srv datapath mute dl branch_b
txrx tx_enable_branch enable branch_b disable
txrx tx_enable_branch enable branch_b enable
srv pwrmeas dlpwr get branch_b

srv duplex mode set fdd trx4
srv datapath mute dl branch_c
txrx tx_enable_branch enable branch_c disable
txrx tx_enable_branch enable branch_c enable
srv pwrmeas dlpwr get branch_c

srv duplex mode set fdd trx4
srv datapath mute dl branch_d
txrx tx_enable_branch enable branch_d disable
txrx tx_enable_branch enable branch_d enable
srv pwrmeas dlpwr get branch_d





</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {3-dot release}>
<data>
srv datapath mute ul all
srv datapath mute dl all
srv datapath mute ul branch_a
txrx rx_enable_branch enable branch_a disable
srv datapath mute ul branch_b
txrx rx_enable_branch enable branch_b disable
srv datapath mute ul branch_c
txrx rx_enable_branch enable branch_c disable
srv datapath mute ul branch_d
txrx rx_enable_branch enable branch_d disable

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {ul change freq}>
<data>
srv datapath mute dl branch_d
srv datapath mute ul branch_d
srv frequency actual branch_d rx 2665
srv datapath unmute ul branch_d
#delay: 500 ms
srv pwrmeas ulpwr get branch_d

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {4-CLGC DPD}>
<data>
rfic func ClgcConfigSet 0 1 0x0F 0 100 512 -3 0.05 -36 -36 0 1 0.1 0.05 30
rfic func DpdTrackingConfigSet 0 0x0F 30 30 65535 0xb68 983000 2 0x207 0 0x207 1 0 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {4-dot release}>
<data>
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
txrx tx_enable_branch enable branch_a disable
txrx tx_enable_branch enable branch_b disable
txrx tx_enable_branch enable branch_c disable
txrx tx_enable_branch enable branch_d disable
srv datapath mute ul all
srv datapath mute dl all

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {4 IRU UL-20M EVM}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"
xenon:0 write SYNC_PROD_DLY_1 1228749
db write /7xx/id_ruType_8.2.x/ul/rf_bA/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bB/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bC/rfPortToSmgCpriI2SubDelay  304531
db write /7xx/id_ruType_8.2.x/ul/rf_bD/rfPortToSmgCpriI2SubDelay  304531
rd start 0
ptd rdModel sampleRate set 245760 245760 245760 245760
ptd rdModel branchBandCap set ABCD Band41.K FDD

ptd rdModel branchFreqCap set RX ABCD 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX ABCD 2515000 2675000 10 200000
rd finalize


#=========Rux Setup carrier then continue

#digitalIruFpga w ATC_IFFT_BINSCALE_BP0 0x7366
#digitalIruFpga w ATC_IFFT_BINSCALE_BP1 0x7366

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {23} {debug}>
<data>
dRdiAtcData read block
dRdiAtcData read version


digitalIruFpga w ATC_RX_BLK_CFG 0x00000010 0x00000010
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
digitalIruFpga r ATC_RX_BLK_GET
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {5-powercheck}>
<data>
srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 0 1 1 20000
srv duplex tdd_en set disable trx3
srv frequency actual branch_a tx 2585
srv datapath unmute dl branch_a
#1 s delay
rfic func InitCalsRun 0 0x200000 1 0
#1 s delay
rfic func InitCalsRun 0 0x800 1 0
#1 s delay
rfic func TrackingCalsEnableSet 0 0xfffff0 0        
rfic func DpdReset 0 1 2
rfic func DpdReset 0 1 1
rfic func TrackingCalsEnableSet 0 0x100000 1    
rfic func TxAttenSet 0 1 1 20000          
srv pwrmeas dlpwr get branch_a

srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 0 1 2 20000
srv duplex tdd_en set disable trx3
srv frequency actual branch_b tx 2585
srv datapath unmute dl branch_b
#1s delay
rfic func InitCalsRun 0 0x200000 2 0
#1s delay
rfic func InitCalsRun 0 0x800 2 0
#1s delay
rfic func TrackingCalsEnableSet 0 0xfffff0 0         
rfic func DpdReset 0 2 2
rfic func DpdReset 0 2 1
rfic func TrackingCalsEnableSet 0 0x200000 1     
rfic func TxAttenSet 0 1 2 20000     
srv pwrmeas dlpwr get branch_b

srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 0 1 4 20000
srv duplex tdd_en set disable trx4
srv frequency actual branch_c tx 2585
srv datapath unmute dl branch_c
#1s delay
rfic func InitCalsRun 0 0x200000 4 0
#1s delay
rfic func InitCalsRun 0 0x800 4 0
#1s delay
rfic func TrackingCalsEnableSet 0 0xfffff0 0      
rfic func DpdReset 0 4 2
rfic func DpdReset 0 4 1
rfic func TrackingCalsEnableSet 0 0x400000 1    
rfic func TxAttenSet 0 1 4 20000  
srv pwrmeas dlpwr get branch_c

srv datapath mute ul all
srv datapath mute dl all
rfic func TxAttenSet 0 1 8 20000
srv duplex tdd_en set disable trx4
srv frequency actual branch_d tx 2585
srv datapath unmute dl branch_d
#1s delay
rfic func InitCalsRun 0 0x200000 8 0
#1s delay
rfic func InitCalsRun 0 0x800 8 0
#1s delay
rfic func TrackingCalsEnableSet 0 0xfffff0 0           
rfic func DpdReset 0 8 2
rfic func DpdReset 0 8 1
rfic func TrackingCalsEnableSet 0 0x800000 1        
rfic func TxAttenSet 0 1 8 20000      
srv pwrmeas dlpwr get branch_d




#hal fpga read 0x2020
#hal fpga write 0x2020 0x0
#hal fpga write 0x2020 0x20000

digitalIruFpga r DPE_0_DL_SETUP 
digitalIruFpga w DPE_0_DL_SETUP 0x0
digitalIruFpga w DPE_0_DL_SETUP 0x01000004
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {srv pwrmeas ulpwr get branch_a}>
<data>
srv pwrmeas ulpwr get branch_a
srv pwrmeas ulpwr get branch_b
srv pwrmeas ulpwr get branch_c
srv pwrmeas ulpwr get branch_d

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {5-dot for EVM}>
<data>
fault clear
txrx datalink set dl configatc start
txrx datalink set dl branch_a 245760 6 26650000 120 3 29193 4 61 0 0 1250 156
txrx datalink set dl branch_b 245760 6 26650000 120 3 29193 5 61 0 0 1250 156
txrx datalink set dl branch_c 245760 6 26650000 120 3 29193 6 61 0 0 1250 156
txrx datalink set dl branch_d 245760 6 26650000 120 3 29193 7 61 0 0 1250 156
txrx txcarrier set branch_a 1 2665 20 2600 0 190950 5
txrx txcarrier set branch_b 1 2665 20 2600 0 190950 5
txrx txcarrier set branch_c 1 2665 20 2600 0 190950 5
txrx txcarrier set branch_d 1 2665 20 2600 0 190950 5
txrx datalink set dl configatc end

#add DPE
hal fpga write 0x2020 0
hal fpga write 0x2020 0x30000

srv datapath mute ul all
srv datapath mute dl all
srv duplex mode set fdd trx3
srv datapath mute dl branch_a
txrx tx_enable_branch enable branch_a disable
txrx tx_enable_branch enable branch_a enable
srv pwrmeas dlpwr get branch_a


srv duplex mode set fdd trx3
srv datapath mute dl branch_b
txrx tx_enable_branch enable branch_b disable
txrx tx_enable_branch enable branch_b enable
srv pwrmeas dlpwr get branch_b

srv duplex mode set fdd trx4
srv datapath mute dl branch_c
txrx tx_enable_branch enable branch_c disable
txrx tx_enable_branch enable branch_c enable
srv pwrmeas dlpwr get branch_c

srv duplex mode set fdd trx4
srv datapath mute dl branch_d
txrx tx_enable_branch enable branch_d disable
txrx tx_enable_branch enable branch_d enable
srv pwrmeas dlpwr get branch_d


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {5 DOT UL-20M EVM }>
<data>
fault clear
txrx datalink set ul configatc start
txrx datalink set ul branch_a 245760 6 25850000 120 2 17902 4 58 0 0 1250 156
txrx datalink set ul branch_b 245760 6 25850000 120 2 17902 5 58 0 0 1250 156
txrx datalink set ul branch_c 245760 6 25850000 120 2 17902 6 58 0 0 1250 156
txrx datalink set ul branch_d 245760 6 25850000 120 2 17902 7 58 0 0 1250 156
txrx rxcarrier set branch_a 1 2585 20 2600 0 190950 2
txrx rxcarrier set branch_b 1 2585 20 2600 0 190950 2
txrx rxcarrier set branch_c 1 2585 20 2600 0 190950 2
txrx rxcarrier set branch_d 1 2585 20 2600 0 190950 2
#srv datalink set ul configatc linkspeed 10000
txrx datalink set ul configatc end

#add DPE
hal fpga write 0x2020 0
hal fpga write 0x2020 0x30000

srv datapath mute ul all
srv datapath mute dl all

#IRU Mac address
hal fpga write 0x2034 0x07269B55       
hal fpga write 0x2038 0x0000F0B1

srv duplex mode set fdd trx3
srv datapath mute ul branch_a
txrx rx_enable_branch enable branch_a disable
txrx rx_enable_branch enable branch_a enable
txrx gainconfig start rx branch_a

srv duplex mode set fdd trx3
srv datapath mute ul branch_b
txrx rx_enable_branch enable branch_b disable
txrx rx_enable_branch enable branch_b enable
txrx gainconfig start rx branch_b

srv duplex mode set fdd trx4
srv datapath mute ul branch_c
txrx rx_enable_branch enable branch_c disable
txrx rx_enable_branch enable branch_c enable
txrx gainconfig start rx branch_c

srv duplex mode set fdd trx4
srv datapath mute ul branch_d
txrx rx_enable_branch enable branch_d disable
txrx rx_enable_branch enable branch_d enable
txrx gainconfig start rx branch_d

#hal fpga write 0x509c 0x237e
#hal fpga write 0x50a0 0x237e



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {29} {sample}>
<data>
UL LTE5M samplerate:7.68M

UL LTE20M samplerate:30.72M
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {FPGA}>
<button {0} {hal fpga program}>
<data>
hal fpga program
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {FPGA OPHY GTY RX RESET}>
<data>
hal  fpga  write  0x4404 0x2 
%delay 100


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {hal fpga init_type 0}>
<data>
hal fpga init_type 0
#init EPHY mode 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {FPGA JESD RX status}>
<data>
#Get FPGA JESD RX status(chipset 0 --- 245.76M: 0x11010)
hal fpga readfield 0x0000084c 0x0007701f
hal fpga readfield 0x0000094c 0x0007701f
#Get FPGA JESD RX status(chipset 1 --- 122.88M: 0x1010)
hal fpga readfield 0x00000A4c 0x0007701f
hal fpga readfield 0x00000B4c 0x0007701f
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {LNA_0_ON_OFF}>
<data>
hal fpga write 0x102C 0x80000080
%delay 1000
hal fpga write 0x102C 0x00000000
%delay 1000
hal fpga write 0x102C 0x80000080
%delay 1000
hal fpga write 0x102C 0x00000000
%delay 1000
hal fpga write 0x102C 0x80000080
%delay 1000
hal fpga write 0x102C 0x00000000
%delay 1000
hal fpga write 0x102C 0x80000080
%delay 1000
hal fpga write 0x102C 0x00000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {PA_4_ON_OFF}>
<data>
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {OPHY GTY 10.3G PRBS setting}>
<data>
hal fpga write  0x4418    0xF0000000
%delay 100
hal fpga read  0x4418
%delay 100
hal  fpga  write  0x4434  0x168
%delay 100
hal fpga read  0x4434
%delay 100
hal  fpga  write  0x4410  0xC0C6E046
%delay 100
hal  fpga  read  0x4414
%delay 100
hal  fpga  write  0x4410  0x80C60000
%delay 100
hal  fpga  read  0x4414
%delay 100
hal  fpga  write  0x4410  0xC0C6E046
%delay 100
hal  fpga  read  0x4414
%delay 100
hal  fpga  write  0x4410  0x80C60000
%delay 100
hal  fpga  read  0x4414
%delay 100
hal  fpga  write 0x4434  0x10168
%delay 100
hal  fpga  read  0x4434
%delay 100
hal fpga write  0x4418  0x40000000
%delay 100
hal fpga read  0x4418
%delay 100
hal fpga init_type 1
%delay 100
hal fpga write    0x4418    0xF0000000
%delay 100
hal fpga read     0x4418 
%delay 100  
hal fpga write    0x4434     0x10168
%delay 100
hal fpga read     0x4434
%delay 100
hal fpga read 0x440c
%delay 100
hal  fpga  read   0x4418
%delay 100
hal  fpga  write  0x4418  0xF1000000 
%delay 100 
hal  fpga  read   0x4418
%delay 100
hal  fpga  write  0x4410  0x807C0000
%delay 100
hal  fpga  read  0x4414    
%delay 100
hal  fpga  write  0x4410  0xC07C00E8
%delay 100
hal  fpga  write  0x4410  0x807C0000
%delay 100
hal  fpga  read  0x4414 
%delay 100  
hal  fpga  read 0x4434
%delay 100
hal  fpga  write  0x4434  0x10150  
%delay 100
hal  fpga  read 0x4434
%delay 100
hal  fpga  read  0x4418
%delay 100
hal  fpga  write  0x4418  0xF1000505
%delay 100
hal  fpga  read  0x4418 
%delay 100
hal  fpga  write  0x4418  0xF0000505
%delay 100
hal fpga write 0x4408 0x2000
%delay 100
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {OPHY GT tx 10Gbps 0101}>
<data>
hal  fpga  write  0x4418 0xF0000209
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {hal fpga init_type 1}>
<data>
hal fpga init_type 1
#init OPHY mode 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {FPGA JESD TX status}>
<data>


hal fpga readd 0x430
hal fpga readd 0x530
hal fpga readd 0x630
hal fpga readd 0x730
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {PA_0_ON_OFF}>
<data>
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {LNA_4_ON_OFF}>
<data>
hal fpga write 0x182C 0x80000080
%delay 1000
hal fpga write 0x182C 0x00000000
%delay 1000
hal fpga write 0x182C 0x80000080
%delay 1000
hal fpga write 0x182C 0x00000000
%delay 1000
hal fpga write 0x182C 0x80000080
%delay 1000
hal fpga write 0x182C 0x00000000
%delay 1000
hal fpga write 0x182C 0x80000080
%delay 1000
hal fpga write 0x182C 0x00000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {reset sfp prbs err cnt}>
<data>
hal  fpga  write  0x4418 0xF0001505 
hal  fpga  write  0x4418 0xF0000505 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {read fpga OPHY gty reg}>
<data>
hal fpga read  0x4418
%delay 100
hal fpga read  0x4434
%delay 100
hal fpga read 0x440c
%delay 100
hal fpga read 0x4408
%delay 100

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {204B PRBS31}>
<data>
hal fpga writed 0xc18 0x00005050
hal fpga writed 0xc34 0x00005050
hal fpga writed 0xd18 0x00005050
hal fpga writed 0xd34 0x00005050

hal fpga writed 0xe18 0x00005050
hal fpga writed 0xe34 0x00005050
hal fpga writed 0xf18 0x00005050
hal fpga writed 0xf34 0x00005050

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {PA_1_ON_OFF}>
<data>
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {read sfp err cnt}>
<data>
hal fpga write 0x4410 0x825E0000
%delay 100
hal fpga read  0x4414
%delay 100
hal fpga write 0x4410 0x825F0000
%delay 100
hal fpga read  0x4414
%delay 100
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {EPHY trx packet }>
<data>
hal fpga write 0x3020 0x1
hal fpga read 0x3700                #TX_total_packets
hal fpga read 0x3708                #TX_total_good_packets
hal fpga read 0x3808                #RX_total_packets
hal fpga read 0x3810                #RX_total_good_packets
hal fpga read 0x38c8                #RX_packets_bad_fcs


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {204B FIR read}>
<data>
hal fpga read 0xc14
hal fpga read 0xc30
hal fpga read 0xd14
hal fpga read 0xd30
hal fpga read 0xe14
hal fpga read 0xe30
hal fpga read 0xf14
hal fpga read 0xf30
#TXPRECURSOR [21:17],TXDIFFCTRL [11:8],TXPOSTCURSOR [7:3]
# in 4455,vlaue=0x1000100,  TXDIFF=1  430mV , pre post =0     
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {PA_2_ON_OFF}>
<data>
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {OPHY GTY force err}>
<data>
hal  fpga  write  0x4418 0xF0000515
%delay 10
hal  fpga  write  0x4418 0xF0000505 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {OPHY trx packet}>
<data>
hal fpga write 0x4440 0x1
hal fpga read 0x4454                 #TX_total_packets        
hal fpga read 0x4458                 #TX_total_good_packets
hal fpga read 0x445c                 #RX_total_packets
hal fpga read 0x4460                 #RX_total_good_packets
hal fpga read 0x4464                 #RX_packets_bad_fcs

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {28} {PA_3_ON_OFF}>
<data>
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {LTU}>
<button {0} {check lock status}>
<data>
i2c write clock_synth 00,0f,01
i2c read clock_synth -s 20,01 -r 1
i2c read clock_synth -s 02,84 -r 1
i2c read clock_synth -s 30,05 -r 1           
i2c read clock_synth -s 30,06 -r 1             
i2c read clock_synth -s 30,07 -r 1            
i2c read clock_synth -s 30,08 -r 1             

#3005  SYNCE
#3006  TCXO
#3007  RECOVERY CLK REFB
#3008  RECOVERY CLK REFBB
#0x10 means reference valid,other value means invalid,detail info can be found in register manual
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {Q0A output enable}>
<data>
i2c write clock_synth  21,02,00
i2c write clock_synth 00,0f,01
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {switch to tcxo ref}>
<data>
i2c write clock_synth  20,01,0d
i2c write clock_synth 02,84,01
i2c write clock_synth 00,0f,01
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {hal ltu init_type 1}>
<data>
hal ltu init_type 1
#init optical db
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {switch to OPHY recovery ref}>
<data>
i2c write clock_synth  20,01,03
i2c write clock_synth 02,84,02
i2c write clock_synth 00,0f,01
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {hal ltu init_type 0}>
<data>
hal ltu init_type 0
#init electrical db
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {switch to sync-E ref}>
<data>
i2c write clock_synth  20,01,0e
i2c write clock_synth 02,84,00
i2c write clock_synth 00,0f,01
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {free run}>
<data>
i2c write clock_synth  20,01,0f
i2c write clock_synth 02,84,00
i2c write clock_synth 00,0f,01
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {retimer}>
<button {0} {10.3G setting}>
<data>
retimer write_reg 0xFC 0x00  0xFF
%delay 100
retimer write_reg 0xFD 0x00  0xFF
%delay 100
retimer write_reg 0xFF 0x00  0x0F
%delay 100
retimer write_reg 0x04 0x40  0xFF
%delay 100
retimer write_reg 0xFC 0x01  0xFF
%delay 100
retimer write_reg 0xFF 0x03  0x03
%delay 100
retimer write_reg 0x00 0x04  0x04
%delay 100
retimer write_reg 0xFF 0x03 0x3
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x60 0x90 0xFF
%delay 100
retimer write_reg 0x61 0xB3 0xFF
%delay 100
retimer write_reg 0x62 0x90 0xFF
%delay 100
retimer write_reg 0x63 0xB3 0xFF
%delay 100
retimer write_reg 0x64 0xFF 0xFF
%delay 100
retimer write_reg 0x09 0x04 0x04
%delay 100
retimer write_reg 0x18 0x10 0x70
%delay 100
retimer write_reg 0x0a 0x0c 0x0c
%delay 100
retimer write_reg 0x0a 0x00 0x0c
%delay 100
retimer write_reg 0xFF 0x01 0x03
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x95 0x8
%delay 100
retimer write_reg 0x96 0x6
%delay 100
retimer write_reg 0xFC 0x2 0xFF
%delay 100
retimer write_reg 0x95 0x8
%delay 100
retimer write_reg 0x96 0x6
%delay 100
retimer write_reg 0xFF 0x01 0x03
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x2D 0x08 0x08
%delay 100
retimer write_reg 0x2D 0x04 0x04
%delay 100
retimer write_reg 0x03 0x00 0x03
%delay 100
retimer write_reg 0x31 0x0  0x60
%delay 100
retimer write_reg 0xFF  0x1	0x3
%delay 100
retimer write_reg 0xFC  0x1	0xFF
%delay 100
retimer write_reg 0x3d  0x88
%delay 100
retimer write_reg 0x3f   0x41 
%delay 100
retimer write_reg 0xFF  0x1	0x3
%delay 100
retimer write_reg 0xFC  0x2	0xFF
%delay 100
retimer write_reg 0x3d  0x05
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x0A 0xC 0xC
%delay 100
retimer write_reg 0x0A 0x0 0xC
%delay 100
retimer write_reg 0xFC 0x2 0xFF
%delay 100
retimer write_reg 0x0A 0xC 0xC
%delay 100
retimer write_reg 0x0A 0x0 0xC
%delay 100

 

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {Check CDR lock status}>
<data>
retimer write_reg 0xFF 0x1	0x3
retimer write_reg 0xFC 0x1	0xFF
retimer read_reg 0x78 
retimer write_reg 0xFC 0x2	0xFF
retimer read_reg 0x78 
#0X30 means CDR lock
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {CDR RESET & de-RESET}>
<data>
#CH0
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x0A 0xC 0xC
retimer write_reg 0x0A 0x0 0xC
#CH1
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0x0A 0xC 0xC
retimer write_reg 0x0A 0x0 0xC
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {CH0 fan out to CH1 and CH0}>
<data>
retimer write_reg 0xFF 0x03 0x3
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x60 0x90 0xFF
retimer write_reg 0x61 0xB3 0xFF
retimer write_reg 0x62 0x90 0xFF
retimer write_reg 0x63 0xB3 0xFF
retimer write_reg 0x64 0xFF 0xFF
retimer write_reg 0x09 0x04 0x04
retimer write_reg 0x18 0x10 0x70
retimer write_reg 0x0a 0x0c 0x0c
%delay 100
retimer write_reg 0x0a 0x00 0x0c
retimer write_reg 0xFF 0x01 0x03
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x96 0xC
retimer write_reg 0x0A 0xC 0xC
retimer write_reg 0x0A 0x0 0xC
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0x96 0x3
retimer write_reg 0x0A 0xC 0xC
retimer write_reg 0x0A 0x0 0xC
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {CH0 raw mode when CDR unlock}>
<data>
retimer write_reg 0xFF 0x01 0x3
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x1E 0x01 0xE9
retimer write_reg 0xFF 0x1 0x3

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {25G setting}>
<data>
retimer write_reg 0xFC 0x00  0xFF
retimer write_reg 0xFD 0x00  0xFF
retimer write_reg 0xFF 0x00  0x0F
retimer write_reg 0x04 0x40  0xFF
retimer write_reg 0xFC 0x01  0xFF
retimer write_reg 0xFF 0x03  0x03
retimer write_reg 0x00 0x04  0x04
retimer write_reg 0xFF 0x03 0x03
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x60 0x74 0xFF
retimer write_reg 0x61 0xc0 0xFF
retimer write_reg 0x62 0x74 0xFF
retimer write_reg 0x63 0xc0 0xFF
retimer write_reg 0x64 0xff 0xFF
retimer write_reg 0x09 0x04 0x04
retimer write_reg 0x18 0x00 0x70
retimer write_reg 0x0a 0x0c 0x0c
retimer write_reg 0x0a 0x00 0x0c
retimer write_reg 0xFF 0x01 0x03
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x95 0x8
retimer write_reg 0x96 0x6
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0x95 0x8
retimer write_reg 0x96 0x6
retimer write_reg 0xFF 0x01 0x03
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0x31 0x40  0x60
retimer write_reg 0x23 0x40 0x40
retimer write_reg 0x1E 0x02  0x0A
retimer write_reg 0x7f 0x01  0x07
retimer write_reg 0x7d 0x0f  0x0f
retimer write_reg 0x7f 0x10  0x10
retimer write_reg 0xFF 0x01 0x03
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x31 0x40  0x60
retimer write_reg 0x23 0x40 0x40
retimer write_reg 0x1E 0x02  0x0A
retimer write_reg 0x7f 0x01  0x07
retimer write_reg 0x7d 0x0f  0x0f
retimer write_reg 0x7f 0x10  0x10
retimer write_reg 0xFF  0x1	0x3
retimer write_reg 0xFC  0x2	0xFF
retimer write_reg 0x3d  0x10
retimer write_reg 0xFF  0x1	0x3
retimer write_reg 0xFC  0x1	0xFF
retimer write_reg 0x3d  0x88
retimer write_reg 0x3f  0x41
retimer write_reg 0xFF  0x1	0x3
retimer write_reg 0xFC  0x1	0xFF
retimer write_reg 0x8E  0x1 0x1
retimer write_reg 0xFF  0x1	0x3
retimer write_reg 0xFC  0x2	0xFF
retimer write_reg 0x8E  0x1  0x1
retimer write_reg 0x13  0x20 0x20
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x0A 0xC 0xC
retimer write_reg 0x0A 0x0 0xC
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0x0A 0xC 0xC
retimer write_reg 0x0A 0x0 0xC

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {READ EYE OPENING}>
<data>
#CH0
retimer write_reg 0xFC 0x1	0xFF
retimer read_reg 0x27 
retimer read_reg 0x28 
#CH1
retimer write_reg 0xFC 0x2	0xFF
retimer read_reg 0x27 
retimer read_reg 0x28 
#To convert HEO to UI: HEO_UI = Reg_0x27 / 32,VEO_mV = Reg_0x28 * 3.125
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {enable ch1 prbs checker }>
<data>
retimer write_reg 0xFC 0x02 0xFF
retimer write_reg 0x0D 0x00 0x80
retimer write_reg 0x79 0x40 0x40
retimer write_reg 0x30 0x00 0x8
retimer write_reg 0x30 0x08 0x8
retimer write_reg 0x30 0x10 0x10
retimer write_reg 0x30 0x00 0x10
retimer write_reg 0x82 0x40 0x40
retimer write_reg 0x82 0x00 0x40
retimer read_reg 0x01 
#0x90 means PRBS7,0x9a means PRBS31
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {CH1 fan out to CH1 and CH0}>
<data>
retimer write_reg 0xFF 0x03 0x3
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x60 0x90 0xFF
%delay 100
retimer write_reg 0x61 0xB3 0xFF
%delay 100
retimer write_reg 0x62 0x90 0xFF
%delay 100
retimer write_reg 0x63 0xB3 0xFF
%delay 100
retimer write_reg 0x64 0xFF 0xFF
%delay 100
retimer write_reg 0x09 0x04 0x04
%delay 100
retimer write_reg 0x18 0x10 0x70
%delay 100
retimer write_reg 0x0a 0x0c 0x0c
%delay 100
retimer write_reg 0x0a 0x00 0x0c
%delay 100
retimer write_reg 0xFF 0x01 0x03
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x96 0x3
%delay 100
retimer write_reg 0x0A 0xC 0xC
%delay 100
retimer write_reg 0x0A 0x0 0xC
%delay 100
retimer write_reg 0xFC 0x2 0xFF
%delay 100
retimer write_reg 0x96 0xC
%delay 100
retimer write_reg 0x0A 0xC 0xC
%delay 100
retimer write_reg 0x0A 0x0 0xC
%delay 100
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {turn off CH1 output}>
<data>
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0xA5 0xE0 0xE0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {CH0 raw mode out voltage}>
<data>
retimer write_reg 0xFF 0x01 0x3
%delay 100
retimer write_reg 0xFC 0x1 0xFF
%delay 100
retimer write_reg 0x1A 0xc0 0xc0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {retimer write 10G db}>
<data>
retimer init 10
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {enable ch0  8180  pattern output}>
<data>
retimer write_reg 0xFC 0x01 0xFF
retimer write_reg 0x7c 0xFF 0xFF
retimer write_reg 0x97 0x00 0xFF
retimer write_reg 0x30 0x04 0x2c
retimer write_reg 0x1E 0x10 0x10
retimer write_reg 0x79 0x00 0x60
retimer write_reg 0xA5 0x80 0xE0

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {check prbs err cnt ch0}>
<data>
retimer write_reg 0xFC 0x01 0xFF
retimer write_reg 0x82 0x80 0x80
retimer read_reg 0x83 
retimer read_reg 0x84 
retimer write_reg 0x82 0x0 0x80
#0x83*256+0x84

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {sfp prbs test}>
<data>
system reset
%delay 6000
hal fpga program
%delay  5000
sfp prbs test
%delay 15000

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {CH1 retimed data output}>
<data>
retimer write_reg 0xFC 0x2 0xFF
retimer write_reg 0xA5 0x20 0xE0

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {retimer write 25G db}>
<data>
retimer init 25
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {switch ch0 retimed data output}>
<data>
retimer write_reg 0xFC 0x01 0xFF
retimer write_reg 0x7c 0xFF 0xFF
retimer write_reg 0x97 0x00 0xFF
retimer write_reg 0x30 0x04 0x2c
retimer write_reg 0x1E 0x10 0x10
retimer write_reg 0x79 0x00 0x60
retimer write_reg 0xA5 0x20 0xE0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {check prbs err cnt ch1}>
<data>
retimer write_reg 0xFC 0x02 0xFF
retimer write_reg 0x82 0x80 0x80
retimer read_reg 0x83 
retimer read_reg 0x84 
retimer write_reg 0x82 0x0 0x80
#0x83*256+0x84

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {retimer command in pis&IRU}>
<data>
rdsh 1 i2c read retimer -s 0x1E -r 1
rdsh 1 i2c write retimer 0xff,0x01
rdsh 1 i2c write retimer 0xfc,0x02
rdsh 1 i2c write retimer 0x31,0x23

rdsh 1 i2c write retimer 0xff,0x10
rdsh 1 i2c write retimer 0x0e,0x00
rdsh 1 i2c write retimer 0x0e,0x40
rdsh 1 i2c write retimer 0x0e,0x0
rdsh 1 i2c write retimer 0x14,0x10
rdsh 1 i2c read retimer -s 0x0d -r 1
rdsh 1 i2c read retimer -s 0x0e -r 1
rdsh 1 i2c write retimer 0xff,0x01
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {enable ch0 prbs checker }>
<data>
retimer write_reg 0xFC 0x01 0xFF
retimer write_reg 0x0D 0x00 0x80
retimer write_reg 0x79 0x40 0x40
retimer write_reg 0x30 0x00 0x8
retimer write_reg 0x30 0x08 0x8
retimer write_reg 0x30 0x10 0x10
retimer write_reg 0x30 0x00 0x10
retimer write_reg 0x82 0x40 0x40
retimer write_reg 0x82 0x00 0x40
retimer read_reg 0x01 
#0x90 means PRBS7,0x9a means PRBS31
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {clear prbs checker err cnt}>
<data>
retimer write_reg 0xFF 0x03 0x3
retimer write_reg 0xFC 0x01 0xFF
retimer write_reg 0x82 0x40 0x40
retimer write_reg 0x82 0x00 0x40
retimer write_reg 0xFF 0x01 0x03
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {retimer allreg}>
<data>
retimer allreg
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {28} {enable ch0 prbs generator}>
<data>
retimer write_reg 0xFC 0x1 0xFF
retimer write_reg 0x2E 0x04 0x04
retimer write_reg 0x30 0x01 0x03
retimer write_reg 0x1E 0x10 0x10
retimer write_reg 0x79 0x0 0x20
retimer write_reg 0x79 0x20 0x20
retimer write_reg 0x30 0x0 0x8
retimer write_reg 0x30 0x8 0x8
retimer write_reg 0xA5 0x80 0xE0
#2E bit2+30bit[1:0]=000,001,010,011,100,101,110,111 means PRBS 7,9,11,15,23,31,58,63
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {SFP}>
<button {0} {1_sfp check exist}>
<data>
sfp check exist
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {power suplly voltage}>
<data>
sfp read_reg if 0x62
sfp read_reg if 0x63
#(0x62*256+0x63)*100 uV
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {2_sfp power on}>
<data>
sfp power on
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {tx bias}>
<data>
sfp read_reg if 0x64
sfp read_reg if 0x65
#(0x64*256+0x65)*2uA
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {3_sfp check rxpwr}>
<data>
sfp check rxpwr
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {tx power}>
<data>
sfp read_reg if 0x66
sfp read_reg if 0x67
#(0x66*256+0x67)*0.1uW
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {ip show simplified}>
<data>
hal ltu init
%delay 1000
ethphy config_registers
%delay 2000
ethphy db_init
hal fpga program
%delay 5000
hal fpga init
srv ethernet init
%delay 15000
ip show
%delay 2000
#system reset
%delay 5000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {4_sfp tx on }>
<data>
sfp tx on 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {rx power}>
<data>
sfp read_reg if 0x68
sfp read_reg if 0x69
#(0x68*256+0x69)*0.1uW
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {sfp temp}>
<data>
sfp read_reg if 0x60
sfp read_reg if 0x61
#0x60 integer,0x61 decimal
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {BCM phy}>
<button {0} {PHY Load}>
<data>
gpio write PTC 0 0
gpio write PTC 0 1
ethphy download pis
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {TM4-t5}>
<data>
mdio write 1 1 0x0084 0x9800
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {TM4-t3}>
<data>
mdio write 1 1 0x0084 0x9000
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {PHY BER at line side}>
<data>
ethphy reg_read line 1 3 0x0021
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {PHY Status}>
<data>

//LINE STATUS read twice 0x06 ok
mdio read 1 1 0x0001
mdio read 1 3 0x0001
mdio read 1 1 0x0001
mdio read 1 3 0x0001

//user status 603a ,0107 ---ok
mdio read 1 0x1e 0x400d

//MAC STATUS read twice 0x4 ok
mdio write 1 0x1e 0x4110 0x2004
mdio write 1 0x1e 0x4111 0x2004
mdio write 1 0x1e 0x4113 0x2004

// read 0x4,0x4
mdio read 1 1 0x0001
mdio read 1 3 0x0001

mdio write 1 0x1e 0x4110 0x0001
mdio write 1 0x1e 0x4111 0x0001
mdio write 1 0x1e 0x4113 0x1002
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {TM3}>
<data>
mdio write 1 1 0x0084 0x6000
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {TM4-t2}>
<data>
mdio write 1 1 0x0084 0x8800
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {SNR margin}>
<data>
mdio write 1 0x1E 0x4038 0x0000
mdio write 1 0x1E 0x4005 0x8030


mdio read 1 0x1e 0x4038
mdio read 1 0x1E 0x4039 
mdio read 1 0x1E 0x403A 
mdio read 1 0x1E 0x403B
mdio read 1 0x1E 0x403C 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {TMReadDefault}>
<data>
mdio write 1 1 0x0084 0x0
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {TM2}>
<data>
mdio write 1 1 0x0084 0x4000
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {TM4-t1}>
<data>
mdio write 1 1 0x0084 0x8400
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {4455-USXGMII-PRBS31-test}>
<data>
//access to MAC@PHY
mdio write 1 0x1e 0x4110 0x2004
mdio write 1 0x1e 0x4111 0x2004
mdio write 1 0x1e 0x4113 0x2004

//Enable PRBS transmit@pHY
mdio read 1 1 0xD0E1
mdio write 1 1 0xD0E1 0xa
mdio write 1 1 0xD0E1 0xb

//insert error at transmit@PHY,bit 5 0-to-1 transition inserts single bit error in  the MSB bit of the data bus
//mdio write 1 1 0xD0E1 0xb
//mdio write 1 1 0xD0E1 0x2b

//Enable PRBS check@PHY
mdio read 1 1 0xD0D1
mdio write 1 1 0xD0D1 0x88a
mdio write 1 1 0xD0D1 0x88b



//Read PRBS error counter@PHY  0xD0DA --[30:16], 0xD0DB --[15:0], clear-on-read reg.
mdio read 1 1 0xD0DA
mdio read 1 1 0xD0DB


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
### SERDES and USXGMII configuration
# Reset GT
hal fpga write 0x4004 0x3

# Bypass UXGMII AN
#hal fpga write 0x50C8 0x16010301

# ENABLE AND RESET UXGMII AN
hal fpga writed 0x30C8 0x16010320
hal fpga writed 0x30C8 0x16010360
hal fpga writed 0x30C8 0x16010320

# Check GT is locked (read 0x7)
hal fpga read 0x400C

# Check USXGMII RX Block Lock (read 0x1)
hal fpga readd 0x340C

# Check USXGMII TX Status (read 0x0, first time 0x1)
hal fpga readd 0x3400

# Check USXGMII RX Status (read 0x0)
hal fpga readd 0x3404

### TX PRBS test
# Register 0x4018
# bit 30~28 TXOUTCLKSEL
# bit 24    TXPCSRESET
# bit 20    EYESCANRESET
# bit 18~16 LOOPBACK
# bit 12    RXPRBSCNTRESET
# bit 11~8  RXPRBSSEL
# bit 4     TXPRBSFORCEERR
# bit 3~0   TXPRBSSEL

# Reset TXPCS
hal fpga writed 0x4018 0x51000000
# Set attribute TXGEARBOX_EN to 1'b0 and TXBUF_EN to 1'b1 via DRP.
# read out 0x7c's value
hal fpga writed 0x4010 0x807C0000
hal fpga read 0x4014

hal fpga writed 0x4010 0xC07C00E8
hal fpga writed 0x4010 0x807C0000
hal fpga read 0x4014

# Set port TXOUTCLKSEL to 3'b010 (TXOUTCLKPMA).
hal fpga writed 0x4018 0x21000000

# Set port TXPRBSSEL to the desired pattern.
# Enable the PRBS-31 test @FPGA
# Set the TX & RX to PRBS-31
hal fpga writed 0x4018 0x21000505
# RESET RXPRBSCNT
hal fpga writed 0x4018 0x21001505
hal fpga writed 0x4018 0x21000505

hal fpga read 0x4018

# Release the PCS from reset by deasserting TXPCSRESET and wait for TXRESETDONE to assert
hal fpga writed 0x4018 0x20000505
# 0x7
hal fpga readd 0x400c
***********************************************************************************************************************************

### Force TX PRBS error
## wait 2min
# FPGA TX force error,when bit 4 become high.
//hal fpga writed 0x4018 0x20000515
//clear error
hal fpga writed 0x4018 0x20000505

//read error
# RX PRBS CNT READ, 0x25e(15:0), 0x25f(31:16)
hal fpga write 0x4010 0x825e0000
hal fpga read 0x4014

hal fpga write 0x4010 0x825f0000
hal fpga read 0x4014


//Read PRBS error counter@PHY  0xD0DA --[30:16], 0xD0DB --[15:0], clear-on-read reg.
mdio write 1 0x1e 0x4110 0x2004
mdio write 1 0x1e 0x4111 0x2004
mdio write 1 0x1e 0x4113 0x2004
mdio read 1 1 0xD0DA
mdio read 1 1 0xD0DB



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {TM6}>
<data>
mdio write 1 1 0x0084 0xc000
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {TM1}>
<data>
mdio write 1 1 0x0084 0x2000
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {jitter slave-slave}>
<data>
mdio write 1 7 0x0020 0x9003
mdio write 1 7 0x0000 0x3200
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {TM5}>
<data>
mdio write 1 1 0x0084 0xa000
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {TM4-t4}>
<data>
mdio write 1 1 0x0084 0x9400
mdio read 1 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {jitter slave-master}>
<data>
mdio write 1 7 0x0020 0xd003
mdio write 1 7 0x0000 0x3200
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {DPD/CLGC}>
<button {0} {DpdModelConfigSet}>
<data>
madura func maduraFuncDpdModelConfigSet 1 2 95
madura func maduraFuncDpdModelConfigGet 1 2 95
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {ClgcConfigSet/Get}>
<data>
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncClgcConfigGet 1 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {DPD_TrackingCalsEnableSet}>
<data>
madura func maduraFuncTrackingCalsEnableSet 1 0xFFFFFF 1

madura func maduraFuncTrackingCalsEnableGet 1 

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {DpdReset}>
<data>
#madura func maduraFuncDpdReset <trx_id> <txChannel> <dpdResetMode>

madura func maduraFuncDpdReset 1 2 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {DBG1}>
<data>
madura func maduraFuncSpiByteRead 1 0xD3
madura func maduraFuncSpiByteRead 1 0xD4
madura func maduraFuncSpiByteRead 1 0xD5
madura func maduraFuncSpiByteRead 1 0xD6
madura func maduraFuncSpiByteRead 1 0xD7
madura func maduraFuncSpiByteRead 1 0xD8
madura func maduraFuncSpiByteRead 1 0xD9
madura func maduraFuncSpiByteRead 1 0xDA


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {RxTxEnableSet/Get}>
<data>
madura func maduraFuncRxTxEnableSet 0 0x01 1
madura func maduraFuncRxTxEnableGet 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {InitCalsRun/Wait}>
<data>
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 2 0
%d 5000
#madura func maduraFuncInitCalsWait 1 60000

#EXT LOL
madura func maduraFuncInitCalsRun 1 0x800 2 0
%d 5000
#madura func maduraFuncInitCalsWait 0 60000

#DPD
madura func maduraFuncInitCalsRun 1 0x10100000 2 0
%d 5000
#madura func maduraFuncInitCalsWait 0 60000

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {ClgcStatusGet}>
<data>
madura func maduraFuncClgcStatusGet 1 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {ADI_DEBUG}>
<data>
madura func maduraFuncSpiByteWrite 0 0x35 0xD1
%d 100
madura func maduraFuncSpiByteRead 0 0x37
%d 100
madura func maduraFuncSpiByteWrite 0 0x35 0xA1
%d 100
madura func maduraFuncSpiByteRead 0 0x37
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {Carrier/DPD/CLGC}>
<data>
##### TX enable####
madura func maduraFuncRxTxEnableSet 1 0 15
#madura func maduraFuncRxTxEnableGet 1

madura func maduraFuncTxToOrxMappingSet 1 0x20 2

#madura func maduraFuncTxToOrxMappingGet 1 0x20
#madura func maduraFuncTxLoSourceGet 1 2
#madura func maduraFuncPllFrequencyGet 1 0

madura func maduraFuncPllFrequencySet 1 0 2595000000

#####DPD MODEL####
madura func maduraFuncDpdModelConfigSet 1 2 95

####clgc config####
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
#madura func maduraFuncClgcConfigGet 1 2

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#### PA on####在这之前把PA先关掉, 别把PA烧了。
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f

####initial tracking ####
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 2 0

#EXT LOL
madura func maduraFuncInitCalsRun 1 0x800 2 0

#DPD
madura func maduraFuncInitCalsRun 1 0x10000000 2 0

####QEC,LO,CLGC tracking enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
#madura func maduraFuncTrackingCalsEnableGet 1
#madura func maduraFuncDpdStatusGet 1 2

#### Tx test Tone #### optional
madura func maduraFuncTxTestToneSet 1 2 1 2000000 0

#### DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1
#madura func maduraFuncDpdStatusGet 1 2

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {PllFrequencySet/Get}>
<data>
madura func maduraFuncPllFrequencySet 0 1 2600000000
madura func maduraFuncPllFrequencyGet 0 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {QEC_TrackingCalsEnableSet}>
<data>
madura func maduraFuncTrackingCalsEnableSet 1 0x2000 1

madura func maduraFuncTrackingCalsEnableGet 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {DpdStatusGet}>
<data>
madura func maduraFuncDpdStatusGet 1 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {program_dump}>
<data>
madura func maduraFuncArmMemRead 1 0x01018000 0x38000 0

#madura func maduraFuncArmMemRead 1 0x01018000 0x12AAA 0

#madura func maduraFuncArmMemRead 1 0x0102AAAA 0x12AAA 0

#madura func maduraFuncArmMemRead 1 0x0103D554 0x12AAB 0

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {clgc status}>
<data>
madura func maduraFuncClgcStatusGet 0 1
madura func maduraFuncClgcStatusGet 0 2
madura func maduraFuncClgcStatusGet 0 4
madura func maduraFuncClgcStatusGet 0 8


madura func maduraFuncClgcStatusGet 1 1
madura func maduraFuncClgcStatusGet 1 2
madura func maduraFuncClgcStatusGet 1 4
madura func maduraFuncClgcStatusGet 1 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {TxNcoShifterSet/Get}>
<data>
madura func maduraFuncTxNcoShifterSet 0 1 0x0000 1000 1 1
%d 2000
madura func maduraFuncTxNcoShifterGet 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {LOL_TrackingCalsEnableSet}>
<data>
madura func maduraFuncTrackingCalsEnableSet 1 0x200 1

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {sys reset}>
<data>
system reset
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {data_dump}>
<data>
madura func maduraFuncArmMemRead 1 0x20028000 0x28000 0

#madura func maduraFuncArmMemRead 1 0x20028000 0xD555 0

#madura func maduraFuncArmMemRead 1 0x20035555 0xD555 0

#madura func maduraFuncArmMemRead 1 0x20042AAA 0xD555 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {DpdTrackingConfigSet}>
<data>
#parameter need to modify with - dbFs
#madura func maduraFuncDpdTrackingConfigSet 0 0x0F 20 20 16384 0 65530 1 0 0 0 0 0 1
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#madura func maduraFuncDpdTrackingConfigSet <trx_id> <txChannelMask> <dpdIndirectRegularizationValue> <dpdDirectRegularizationValue> <dpdSamples> <dpdMThreshold> <dpdPeakSearchWindowSize> <dpdUpdateMode> <minAvgSignalLevel> <dpdMu> <minAvgSignalLevelOrx> <dpdFilterSel>  
#madura func maduraFuncDpdTrackingConfigGet 1 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {CLGC_TrackingCalsEnableSet}>
<data>
#Enable
madura func maduraFuncTrackingCalsEnableSet 1 0xffffff 1
madura func maduraFuncTrackingCalsEnableGet 1 
#Disable
madura func maduraFuncTrackingCalsEnableSet 1 0x200000 0
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {maduraFuncDpdTrackingConfigGet}>
<data>
madura func maduraFuncDpdTrackingConfigGet 1 2 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {CPU Exception}>
<data>
madura func maduraFuncCpuException 1



</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {carrier}>
<button {0} {xenon:0 txpwr}>
<data>
xenon txpwr xenon:0
xenon txpwr xenon:1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {trdc off release}>
<data>
trdc off 1
trdc off 2
trdc off 3
trdc off 4
trdc off 5

trdc release 1
trdc release 2
trdc release 3
trdc release 4
trdc release 5
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {carrier setup command}>
<data>
trdc setup3 1 0 1 2595000 0 0 -0 20000 0 0 -0 1 0 0 30720 1 0 1 1 0 0
#trdc setup3 5 0 0 2585000 0 0 -0 20000 0 0 -0 1 0 0 30720 1 0 1 1 0 0

trdc setup3 2 0 1 2585000 0 0 -0 20000 0 1 -0 1 0 0 30720 1 0 1 1 0 0
#trdc setup3 6 0 0 2585000 0 0 -0 20000 0 1 -0 1 0 0 30720 1 0 1 1 8 0

trdc setup3 3 0 1 2585000 0 0 -0 20000 0 2 -0 1 0 0 30720 1 0 1 1 0 0
#trdc setup3 7 0 0 2585000 0 0 -0 20000 0 2 -0 1 0 0 30720 1 0 1 1 16 0

trdc setup3 4 0 1 2585000 0 0 -0 20000 0 3 -0 1 0 0 30720 1 0 1 1 0 0
#trdc setup3 8 0 0 2585000 0 0 -0 20000 0 3 -0 1 0 0 30720 1 0 1 1 24 0
trdc on 1
trdc on 2
trdc on 3
trdc on 4
#trdc on 5
#trdc on 6
#trdc on 7
#trdc on 8


xenon:0 w DL_0_FB_POST_0_0_FT_CFG_FTW0 0x0
xenon:0 w DL_0_FB_POST_1_0_FT_CFG_FTW0 0x0
xenon:0 w DL_1_FB_POST_0_0_FT_CFG_FTW0 0x0
xenon:0 w DL_1_FB_POST_1_0_FT_CFG_FTW0 0x0
miraFpga w DPE_0_DL_DST_0 0x67000002
miraFpga w DPE_0_DL_DST_1 0x0000000d

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {carrier on}>
<data>
trdc config set 1 0 1 0 1 1722500 0
trdc config set 1 1 1 0 1 1722500 0
trdc config set 1 2 1 0 1 2345000 0
trdc config set 1 3 1 0 1 2345000 0
trdc config set 1 4 1 0 1 2525000 0
trdc config set 1 5 1 0 1 2525000 0
trdc config set 1 6 1 0 1 2525000 0
trdc config set 1 7 1 0 1 2525000 0
trdc setup7 1 11 1 1 2525000 0 0 -0 0 1 4 -0 0 1 1 1 1 0 0 4 0 
trdc setup7 2 11 1 1 2525000 0 0 -0 0 1 5 -0 0 1 1 1 1 2 0 4 0 
trdc setup7 3 11 1 1 2525000 0 0 -0 0 1 6 -0 0 1 1 1 1 4 0 4 0 
trdc setup7 4 11 1 1 2525000 0 0 -0 0 1 7 -0 0 1 1 1 1 6 0 4 0 
trdc setup7 5 1 1 1 2345000 0 0 -0 0 1 2 -0 0 1 0 1 1 0 0 4 0 
trdc setup7 6 1 1 1 2345000 0 0 -0 0 1 3 -0 0 1 0 1 1 0 2 4 0 
trdc setup7 7 11 1 0 2525000 0 0 0 0 1 4 0 0 1 1 7 1 0 0 4 0 
trdc setup7 8 11 1 0 2525000 0 0 0 0 1 5 0 0 1 1 7 1 2 0 4 0 
trdc setup7 9 11 1 0 2525000 0 0 0 0 1 6 0 0 1 1 7 1 4 0 4 0 
trdc setup7 10 11 1 0 2525000 0 0 0 0 1 7 0 0 1 1 7 1 6 0 4 0 
trdc setup7 11 1 0 1 1817500 0 0 -0 0 1 0 -0 0 1 0 1 1 1 0 4 0 
trdc setup7 12 1 0 0 1722500 0 0 0 0 1 0 0 0 1 0 6 1 0 0 4 0 
trdc setup7 13 1 0 1 1817500 0 0 -0 0 1 1 -0 0 1 0 1 1 1 2 4 0 
trdc setup7 14 1 0 0 1722500 0 0 0 0 1 1 0 0 1 0 6 1 0 2 4 0 
trdc setup7 15 1 1 0 2345000 0 0 0 0 1 2 0 0 1 0 7 1 1 0 4 0 
trdc setup7 16 1 1 0 2345000 0 0 0 0 1 3 0 0 1 0 7 1 1 2 4 0 
trdc on 1
trdc on 2
trdc on 3
trdc on 4
trdc on 5
trdc on 6
trdc on 7
trdc on 8
trdc on 9
trdc on 10
trdc on 11
trdc on 12
trdc on 13
trdc on 14
trdc on 15
trdc on 16
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {carrier off}>
<data>
#8*LTE5M
trdc off 16
trdc off 15
trdc off 14
trdc off 13
trdc off 12
trdc off 11
trdc off 10
trdc off 9
trdc off 8
trdc off 7
trdc off 6
trdc off 5
trdc off 4
trdc off 3
trdc off 2
trdc off 1
trdc release 16
trdc release 15
trdc release 14
trdc release 13
trdc release 12
trdc release 11
trdc release 10
trdc release 9
trdc release 8
trdc release 7
trdc release 6
trdc release 5
trdc release 4
trdc release 3
trdc release 2
trdc release 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {29} {xenon debug}>
<data>
xenon:0 r DL_0_FB_PRE_0_0_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_0_1_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_0_2_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_0_3_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_0_4_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_0_5_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_1_0_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_1_1_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_1_2_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_1_3_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_1_4_FBUF_IRQ
xenon:0 r DL_0_FB_PRE_1_5_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_0_0_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_0_1_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_0_2_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_0_3_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_0_4_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_0_5_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_1_0_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_1_1_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_1_2_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_1_3_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_1_4_FBUF_IRQ
xenon:0 r DL_1_FB_PRE_1_5_FBUF_IRQ 


xenon:0 r DL_0_FB_PRE_0_0_FBUF_CFG 
xenon:0 r DL_0_FB_PRE_0_1_FBUF_CFG 
xenon:0 r DL_0_FB_PRE_0_2_FBUF_CFG 
xenon:0 r DL_0_FB_PRE_0_3_FBUF_CFG 
xenon:0 r DL_0_FB_PRE_0_4_FBUF_CFG 
xenon:0 r DL_0_FB_PRE_0_5_FBUF_CFG 
xenon:0 r DL_0_FB_POST_0_0_FT_CFG_FTW0 
xenon:0 r DL_0_FB_POST_0_1_FT_CFG_FTW0 
xenon:0 r DL_0_FB_POST_0_2_FT_CFG_FTW0 
xenon:0 r DL_0_FB_POST_0_3_FT_CFG_FTW0 
xenon:0 r DL_0_FB_POST_0_4_FT_CFG_FTW0 
xenon:0 r DL_0_FB_POST_0_5_FT_CFG_FTW0
xenon:0 r DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_0
xenon:0 r DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_1
xenon:0 r DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_2?
xenon:0 r DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_3
xenon:0 r DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_4
xenon:0 r DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_5? 

#xenon:0 w DL_0_FB_PRE_0_0_FBUF_CFG 0x254EEC11
#xenon:0 w DL_0_FB_PRE_0_3_FBUF_CFG 0x254EEC11
xenon:0 w DL_0_FB_PRE_0_0_FBUF_CFG 0xD11
xenon:0 w DL_0_FB_PRE_0_3_FBUF_CFG 0xD11
xenon:0 w DL_0_FB_POST_0_0_FT_CFG_FTW0 0x0
xenon:0 w DL_0_FB_POST_0_3_FT_CFG_FTW0 0x0
xenon:0 w DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_0 0x000F0060
xenon:0 w DL_0_FBG_FE_0_FE_CPLXFIR_CFG_FILT_3 0x000F0060

xenon:0 w DL_0_MCB_CFR_0_0_EN 0x00000001 0x00000000? 
xenon:0 w DL_0_MCB_CFR_0_3_EN 0x00000001 0x00000000


xenon:0 w DL_0_FB_PRE_0_0_FBUF_CFG 0xD11
xenon:0 w DL_0_FB_PRE_0_3_FBUF_CFG 0xD11
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {EVB Carrier}>
<button {0} {1.IRU Setup}>
<data>
db add /7xx/id_ruType_8.2.x/Band41.K/supportedRat -f -t char "T N L"

xenon:0 write SYNC_PROD_DLY_0 198570
xenon:0 write SYNC_PROD_DLY_1 198570

#=====NR100Mhz Single Xenon====
db write /7xx/id_ruType_8.2.x/dl/rf_bA/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bB/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bC/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bD/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bE/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bF/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bG/fabToFuDelay 96218
db write /7xx/id_ruType_8.2.x/dl/rf_bH/fabToFuDelay 96218

db write /7xx/id_ruType_8.2.x/ul/rf_bA/rfPortToSmgCpriI2SubDelay 88670
db write /7xx/id_ruType_8.2.x/ul/rf_bB/rfPortToSmgCpriI2SubDelay 88670
db write /7xx/id_ruType_8.2.x/ul/rf_bC/rfPortToSmgCpriI2SubDelay 88670
db write /7xx/id_ruType_8.2.x/ul/rf_bD/rfPortToSmgCpriI2SubDelay 88670
db write /7xx/id_ruType_8.2.x/ul/rf_bE/rfPortToSmgCpriI2SubDelay 88670
db write /7xx/id_ruType_8.2.x/ul/rf_bF/rfPortToSmgCpriI2SubDelay 88670
db write /7xx/id_ruType_8.2.x/ul/rf_bG/rfPortToSmgCpriI2SubDelay 88670

db setBand Band41.K 



rd start 0
#==Same as DPE_0_DL_DST_0/1===

digitalIruFpga w DPE_0_DL_DST_0 0x67000002
digitalIruFpga w DPE_0_DL_DST_1 0x0000000d

ptd rdModel sampleRate set 122880
ptd rdModel branchBandCap set Branch-A Band41.K TDD
ptd rdModel branchBandCap set Branch-B Band41.K TDD
ptd rdModel branchBandCap set Branch-C Band41.K TDD
ptd rdModel branchBandCap set Branch-D Band41.K TDD
ptd rdModel branchBandCap set Branch-E Band41.K TDD
ptd rdModel branchBandCap set Branch-F Band41.K TDD
ptd rdModel branchBandCap set Branch-G Band41.K TDD
ptd rdModel branchBandCap set Branch-H Band41.K TDD

ptd rdModel branchFreqCap set TX Branch-A 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-B 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-C 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-D 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-E 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-F 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-G 2515000 2675000 10 200000
ptd rdModel branchFreqCap set TX Branch-H 2515000 2675000 10 200000

rd finalize
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {EVB_Startup}>
<data>
db reparse
hal ltu init 0
ethphy config_registers
ethphy db_init 
hal fpga program
hal fpga init
#srv rxlo init        
srv devinit  
srv pacc init
srv ethernet init  
srv pwrmeas init
sync task start  
ip show
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {jesd mapping}>
<data>
digitalIruFpga w JRC_01_DL_CFG 0x00000000
digitalIruFpga w JRC_23_DL_CFG 0x00000000
digitalIruFpga w JRC_45_DL_CFG 0x50000004
digitalIruFpga w JRC_67_DL_CFG 0x00000000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {tx Att set}>
<data>
#madura func maduraFuncTxAttenSet <trx_id> <numTxAttenConfigs> <txAttenuation.txChannelMask> <txAttenuation.txAttenuation_mdB>
#madura func maduraFuncTxAttenGet <trx_id> <txChannel>
madura func TxAttenGet 0 1
madura func TxAttenGet 0 2
madura func TxAttenGet 0 4
madura func TxAttenGet 0 8


madura func TxAttenGet 1 1
madura func TxAttenGet 1 2
madura func TxAttenGet 1 4
madura func TxAttenGet 1 8


rfic func TxAttenSet 0 1 1 10000
rfic func TxAttenSet 0 1 2 22000
rfic func TxAttenSet 0 1 4 22000
rfic func TxAttenSet 0 1 8 22000

rfic func TxAttenSet 1 1 1 22000
rfic func TxAttenSet 1 1 2 22000
rfic func TxAttenSet 1 1 4 22000
rfic func TxAttenSet 1 1 8 22000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {Madura config Carrier branch A}>
<data>
##### TX enable####
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 0 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 0

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 0 0x10 1

#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 0 0x10


#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 0 1

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 0 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 0 0 2595000000
madura func maduraFuncPllFrequencySet 0 1 2595000000

#####DPD MODEL####
#madura func maduraFuncDpdModelConfigSet <trx_id> <txChannelMask> <dpdNumFeatures>
madura func maduraFuncDpdModelConfigSet 0 1 95

####clgc config####
#madura func maduraFuncClgcConfigSet <trx_id> <clgcConfigArraySize> <txChannelMask> <clgcEnableGainControl> <clgcMeasurementBatchTime_us> <clgcMaxSampleBatc#hesPerClgcRun> <clgcExpectedLoopGain_dB> <clgcExpectedLoopGainRipple_dB> <clgcTxQualifyingThreshold_dBFS> <clgcOrxQualifyingThreshold_dBFS> <clgcOrxMinimumSnr_dB> <clgcMaxGainAdjustmentStepSize_dB> <clgcDampingParam> <clgcMinTxAttenAdjust_dB> <clgcMaxTxAttenAdjust_dB>

madura func maduraFuncClgcConfigSet 0 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
#madura func maduraFuncClgcConfigGet <trx_id> <txChannel>
madura func maduraFuncClgcConfigGet 0 1

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 0 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#### PA on####
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!

####initial tracking ####
#madura func maduraFuncInitCalsRun <trx_id> <initCals.calMask> <initCals.channelMask> <initCals.warmBoot>
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 0 0x200000 1 0

#EXT LOL
madura func maduraFuncInitCalsRun 0 0x800 1 0

#DPD
madura func maduraFuncInitCalsRun 0 0x10000000 1 0

####QEC,LO,CLGC tracking enable####
#madura func maduraFuncTrackingCalsEnableSet <trx_id> <enableMask> <enableDisableFlag>
madura func maduraFuncTrackingCalsEnableSet 0 0x202200 1
madura func maduraFuncDpdStatusGet 0 1


#### Tx test Tone #### optional
#madura func maduraFuncTxTestToneSet <trx_id> <txNcoTestToneCfg.txChannelMask> <txNcoTestToneCfg.enable> <txNcoTestToneCfg.txToneFreq_Hz> <txNcoTestToneCfg.txToneGain>
madura func maduraFuncTxTestToneSet 0 1 1 2000000 0


#### DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 0 0x20000 1
madura func maduraFuncDpdStatusGet 0 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {DOT Ethernet config}>
<data>
hal fpga write 0x2020 0x30000
hal fpga writed 0x106C 0x0303
hal fpga writed 0x146C 0x0303
hal fpga writed 0x186C 0x0303
hal fpga writed 0x1C6C 0x0303

hal fpga write 0x2034 0x07262473
hal fpga write 0x2038 0x0000F0B1


hal fpga write 0x202c 0x67000002
hal fpga write 0x2030 0x000d
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {DOT Packet check}>
<data>
hal fpga write 0x3020 0x1
hal fpga read 0x3700
hal fpga read 0x3708
hal fpga read 0x3808
hal fpga read 0x3810
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {db setBand Band41.K }>
<data>
db setBand Band41.K 
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {clgc status}>
<data>
rfic func maduraFuncClgcStatusGet 0 1
rfic func maduraFuncClgcStatusGet 0 2
rfic func maduraFuncClgcStatusGet 0 4
rfic func maduraFuncClgcStatusGet 0 8


rfic func ClgcStatusGet 1 1
rfic func maduraFuncClgcStatusGet 1 2
rfic func maduraFuncClgcStatusGet 1 4
rfic func maduraFuncClgcStatusGet 1 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {Madura config Carrier branch B}>
<data>
##### TX enable####
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 0 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 0

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 0 0x20 2

#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 0 0x20


#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 0 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 0 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 0 0 2595000000
madura func maduraFuncPllFrequencySet 0 1 2595000000

#####DPD MODEL####
#madura func maduraFuncDpdModelConfigSet <trx_id> <txChannelMask> <dpdNumFeatures>
madura func maduraFuncDpdModelConfigSet 0 2 95

####clgc config####
#madura func maduraFuncClgcConfigSet <trx_id> <clgcConfigArraySize> <txChannelMask> <clgcEnableGainControl> <clgcMeasurementBatchTime_us> <clgcMaxSampleBatc#hesPerClgcRun> <clgcExpectedLoopGain_dB> <clgcExpectedLoopGainRipple_dB> <clgcTxQualifyingThreshold_dBFS> <clgcOrxQualifyingThreshold_dBFS> <clgcOrxMinimumSnr_dB> <clgcMaxGainAdjustmentStepSize_dB> <clgcDampingParam> <clgcMinTxAttenAdjust_dB> <clgcMaxTxAttenAdjust_dB>

madura func maduraFuncClgcConfigSet 0 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
#madura func maduraFuncClgcConfigGet <trx_id> <txChannel>
madura func maduraFuncClgcConfigGet 0 2

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 0 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1

#### PA on####
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!

####initial tracking ####
#madura func maduraFuncInitCalsRun <trx_id> <initCals.calMask> <initCals.channelMask> <initCals.warmBoot>
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 0 0x200000 2 0

#EXT LOL
madura func maduraFuncInitCalsRun 0 0x800 2 0

#DPD
madura func maduraFuncInitCalsRun 0 0x10000000 2 0

####QEC,LO,CLGC tracking enable####
#madura func maduraFuncTrackingCalsEnableSet <trx_id> <enableMask> <enableDisableFlag>
madura func maduraFuncTrackingCalsEnableSet 0 0x202200 1
madura func maduraFuncDpdStatusGet 0 2


#### Tx test Tone #### optional
#madura func maduraFuncTxTestToneSet <trx_id> <txNcoTestToneCfg.txChannelMask> <txNcoTestToneCfg.enable> <txNcoTestToneCfg.txToneFreq_Hz> <txNcoTestToneCfg.txToneGain>
madura func maduraFuncTxTestToneSet 0 2 1 2000000 0


#### DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 0 0x20000 1
madura func maduraFuncDpdStatusGet 0 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {3.xenon delay}>
<data>
#Branch A 100Mhz
xenon:0 w DL_0_FB_PRE_0_0_FBUF_CFG 0x2A19
xenon:0 w DL_0_FB_PRE_0_1_FBUF_CFG 0x2A19
xenon:0 w DL_0_FB_PRE_0_2_FBUF_CFG 0x2A19

#Branch E 100Mhz
#xenon:0 w DL_1_FB_PRE_0_0_FBUF_CFG 0x2A19
#xenon:0 w DL_1_FB_PRE_0_1_FBUF_CFG 0x2A19
#xenon:0 w DL_1_FB_PRE_0_2_FBUF_CFG 0x2A19

#Branch F 100Mhz
xenon:0 w DL_1_FB_PRE_0_3_FBUF_CFG 0x2A19
xenon:0 w DL_1_FB_PRE_0_4_FBUF_CFG 0x2A19
xenon:0 w DL_1_FB_PRE_0_5_FBUF_CFG 0x2A19
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {Pacc DAC Set_E/F/G/H}>
<data>
srv pacc setdac branch_e main 0x6e0
srv pacc setdac branch_e peak 0x580

srv pacc setdac branch_f main 0x6e0
srv pacc setdac branch_f peak 0x580

srv pacc setdac branch_g main 0x6e0
srv pacc setdac branch_g peak 0x580

srv pacc setdac branch_h main 0x6e0
srv pacc setdac branch_h peak 0x580
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {IRU packet check}>
<data>
digitalIruFpga w ETH_MAC_TICK 0x1
digitalIruFpga r ETH_MAC0_STAT_TX_TOTAL_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_TOTAL_PACKETS
digitalIruFpga r ETH_MAC0_STAT_RX_TOTAL_GOOD_PACKETS
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {A/F pwr meter}>
<data>
srv pwrmeas dlpwr get branch_a
srv pwrmeas dlpwr get branch_f
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {WX_IRU_BranchF}>
<data>
digitalIruFpga w DPE_0_DL_SETUP 0x0
digitalIruFpga w ATC_CTRL 0x1 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG 0x1 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG 0x100 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG 0x1 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG 0x100 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG 0x1 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG 0x100 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG 0x1 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG 0x100 0x1
digitalIruFpga w ATC_BINSCALE_SHIFT 0x7000 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP0 0xffff 0x0
digitalIruFpga w ATC_BINSCALE_SHIFT 0x700 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP1 0xffff 0x0
digitalIruFpga w ATC_BINSCALE_SHIFT 0x70 0x3
digitalIruFpga w ATC_BINSCALE_FACTOR_BP2 0xffff 0x39a4
digitalIruFpga w ATC_BINSCALE_SHIFT 0x7 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP3 0xffff 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_0 0x800400d0
digitalIruFpga w ATC_0_BLK_CFG_DL_1 0x80040051
digitalIruFpga w ATC_0_BLK_CFG_DL_2 0x80040052
digitalIruFpga w ATC_0_BLK_CFG_DL_3 0x80040053
digitalIruFpga w ATC_0_BLK_CFG_DL_4 0x80040054
digitalIruFpga w ATC_0_BLK_CFG_DL_5 0x80040055
digitalIruFpga w ATC_0_BLK_CFG_DL_6 0x80040056
digitalIruFpga w ATC_0_BLK_CFG_DL_7 0x8004e057
digitalIruFpga w ATC_0_BLK_CFG_DL_8 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_9 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_10 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_11 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_12 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_13 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_14 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_15 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_16 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_17 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_18 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_19 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_20 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_21 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_22 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_23 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_24 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_25 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_26 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_27 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_28 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_29 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_30 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_31 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_32 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_33 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_34 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_35 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_36 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_37 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_38 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_39 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_40 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_41 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_42 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_43 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_44 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_45 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_46 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_47 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_48 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_49 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_50 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_51 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_52 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_53 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_54 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_55 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_56 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_57 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_58 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_59 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_60 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_61 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_62 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_63 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR5_CFG 0x20000 0x1
digitalIruFpga w ATC_TF_BR5_CFG 0x7f00 0x60
digitalIruFpga w ATC_TF_BR5_CFG 0x1f 0x8
digitalIruFpga w ATC_TF_BR6_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR6_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR6_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x1f 0x0
digitalIruFpga w ATC_CTRL 0xf0 0x4
digitalIruFpga w ATC_CTRL 0x100 0x1
digitalIruFpga w DPE_0_DL_SETUP 0x1000000

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {IQC DUMP}>
<data>

xenon r xenon:0 CPRI_IQC_X_MCPRI_0_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_ING_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_ING_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_ING_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_EGR_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_EGR_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_EGR_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_EGR_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_DL_HANDLER_EGR_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_EGR_PORT_CONF	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING	 
 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_ING	 
 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_ING	 
 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_ING	 

xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_EGR	 

xenon r xenon:0 CPRI_IQC_X_MCPRI_1_EGR	 

xenon r xenon:0 CPRI_IQC_X_MCPRI_2_EGR	 
 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_EGR	 

xenon r xenon:0 CPRI_IQC_X_MCPRI_0_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_UL_HANDLER_0_ING	 

xenon r xenon:0 CPRI_IQC_X_UL_HANDLER_1_ING	 

xenon r xenon:0 CPRI_IQC_X_UL_HANDLER_0_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_UL_HANDLER_1_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_UL_HANDLER_0_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_UL_HANDLER_1_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_ING	 

xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_ING_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_DL_HANDLER_EGR	 
 
xenon r xenon:0 CPRI_IQC_X_DL_HANDLER_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_DL_HANDLER_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_EGR	 
 
xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_X_DP_HANDLER_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_CORE	 
 
xenon r xenon:0 CPRI_IQC_X_CORE_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW0_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW1_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW2_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW3_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW4_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW5_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW6_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW7_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW8_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW9_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW10_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW11_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW12_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW13_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW14_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW15_CONF1	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW0_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW1_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW2_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW3_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW4_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW5_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW6_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW7_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW8_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW9_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW10_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW11_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW12_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW13_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW14_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW15_CONF2	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW0_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW1_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW2_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW3_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW4_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW5_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW6_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW7_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW8_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW9_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW10_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW11_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW12_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW13_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW14_CONF3	 
xenon r xenon:0 CPRI_IQC_X_TAG_GEN_LUT_FLOW15_CONF3	 
xenon r xenon:0 CPRI_IQC_DLH_CRC_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB0_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB1_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB2_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB3_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB4_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB5_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB6_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB7_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB8_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB9_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB10_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB11_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB12_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB13_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB14_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB15_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB16_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB17_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB18_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB19_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB20_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB21_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB22_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_DL_FB23_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB0_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB1_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB2_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB3_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB4_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB5_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB6_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB7_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB8_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB9_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB10_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB11_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB12_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB13_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB14_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB15_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB16_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB17_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB18_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB19_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB20_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB21_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB22_CONF	 
xenon r xenon:0 CPRI_IQC_DLH_UL_FB23_CONF	 
xenon r xenon:0 CPRI_IQC_DLH	 

xenon r xenon:0 CPRI_IQC_DLH_DUPLICATE	 
 
xenon r xenon:0 CPRI_IQC_DLH_EGR_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_DLH_EGR_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_DLH_DECODER_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_DLH_DECODER_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_DLH_STATUS	 
xenon r xenon:0 CPRI_IQC_DPH	 

xenon r xenon:0 CPRI_IQC_TX_DPH_CORE_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_TX_DPH_CORE_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_TX_DPH_BUFFER	 

xenon r xenon:0 CPRI_IQC_RX_DPH_ING_CRC_CONF	 
xenon r xenon:0 CPRI_IQC_RX_DPH_ING_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_RX_DPH_CORE_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_RX_DPH_CORE_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_RX_DPH_BUFFER	 
 
xenon r xenon:0 CPRI_IQC_RX_DPH_CMD	 
xenon r xenon:0 CPRI_IQC_RX_DPH_FILT_CONF	 
xenon r xenon:0 CPRI_IQC_RX_DPH_CTRL_BUF	 
xenon r xenon:0 CPRI_IQC_TX_DP_MIRI	 
xenon r xenon:0 CPRI_IQC_RX_DP_MIRI	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT	 
	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_ARFCN0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_ARFCN1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_ARFCN2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_ARFCN3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_ARFCN0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_ARFCN1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_ARFCN2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_ARFCN3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_MIN0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_MIN1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_MIN2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_MIN3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_MIN0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_MIN1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_MIN2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_MIN3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_DELTA0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_DELTA1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_DELTA2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_FTW_DELTA3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_DELTA0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_DELTA1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_DELTA2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_FTW_DELTA3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_NSHIFT	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_VSWR	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_GAIN_MEMBASE_ADDR0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_GAIN_MEMBASE_ADDR1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_GAIN_MEMBASE_ADDR2	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_GAIN_MEMBASE_ADDR3	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_ANTENNA_BRANCH_CR0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_ANTENNA_BRANCH_CR1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_NSHIFT	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_ANTENNA_BRANCH_CR0	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_ANTENNA_BRANCH_CR1	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_DL_CR_RANGE	 
xenon r xenon:0 CPRI_IQC_PGFH_LUT_UL_CR_RANGE	 
xenon r xenon:0 CPRI_IQC_FCB	 

xenon r xenon:0 CPRI_IQC_FCB_DUPLICATE	 

xenon r xenon:0 CPRI_IQC_FCB_STATUS	 
xenon r xenon:0 CPRI_IQC_FCB_CMD	 
xenon r xenon:0 CPRI_IQC_FCB_DL_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_FCB_DL_DISCARD_PKT	 
xenon r xenon:0 CPRI_IQC_FCB_DP_ACCEPT_PKT	 
xenon r xenon:0 CPRI_IQC_FCB_MIRI	 
xenon r xenon:0 CPRI_IQC_DL_LOC	 
	 
xenon r xenon:0 CPRI_IQC_FCB_LOC	 

xenon r xenon:0 CPRI_IQC_PGFH_LUT_MIRI	 


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {ATC_IRU_BranchF}>
<data>
digitalIruFpga w DPE_0_DL_SETUP 0x0000004
digitalIruFpga w DPE_1_DL_SETUP 0x0000004
digitalIruFpga w DPE_2_DL_SETUP 0x0000004
digitalIruFpga w DPE_3_DL_SETUP 0x0000004
digitalIruFpga w DPE_4_DL_SETUP 0x0000004
digitalIruFpga w DPE_5_DL_SETUP 0x0000004
digitalIruFpga w DPE_6_DL_SETUP 0x0000004
digitalIruFpga w DPE_7_DL_SETUP 0x0000004


#digitalIruFpga w DPE_0_DL_SETUP 0x01000004
#digitalIruFpga w DPE_1_DL_SETUP 0x01000004
#digitalIruFpga w DPE_2_DL_SETUP 0x01000004
#digitalIruFpga w DPE_3_DL_SETUP 0x01000004
#digitalIruFpga w DPE_4_DL_SETUP 0x01000004
#digitalIruFpga w DPE_5_DL_SETUP 0x01000004
#digitalIruFpga w DPE_6_DL_SETUP 0x01000004
#digitalIruFpga w DPE_7_DL_SETUP 0x01000004


digitalIruFpga w ATC_CTRL ATC_CTRL_DL_RST 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG 0x100
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG 0x100
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG 0x100
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG 0x100
digitalIruFpga w ATC_BINSCALE_SHIFT 0x0020
digitalIruFpga w ATC_BINSCALE_FACTOR_BP0 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP1 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP2 0x28c2
digitalIruFpga w ATC_BINSCALE_FACTOR_BP3 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_0 0x800400d0
digitalIruFpga w ATC_0_BLK_CFG_DL_1 0x80040051
digitalIruFpga w ATC_0_BLK_CFG_DL_2 0x80040052
digitalIruFpga w ATC_0_BLK_CFG_DL_3 0x80040053
digitalIruFpga w ATC_0_BLK_CFG_DL_4 0x80040054
digitalIruFpga w ATC_0_BLK_CFG_DL_5 0x80040055
digitalIruFpga w ATC_0_BLK_CFG_DL_6 0x80040056
digitalIruFpga w ATC_0_BLK_CFG_DL_7 0x8004e057
digitalIruFpga w ATC_0_BLK_CFG_DL_8 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_9 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_10 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_11 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_12 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_13 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_14 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_15 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_16 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_17 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_18 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_19 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_20 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_21 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_22 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_23 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_24 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_25 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_26 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_27 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_28 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_29 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_30 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_31 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_32 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_33 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_34 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_35 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_36 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_37 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_38 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_39 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_40 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_41 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_42 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_43 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_44 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_45 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_46 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_47 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_48 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_49 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_50 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_51 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_52 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_53 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_54 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_55 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_56 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_57 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_58 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_59 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_60 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_61 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_62 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_63 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x0
digitalIruFpga w ATC_TF_BR5_CFG 0x26008
digitalIruFpga w ATC_TF_BR6_CFG 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x0
digitalIruFpga w ATC_CTRL ATC_CTRL_PKT_PER_TRANSFORM 0x4
digitalIruFpga w ATC_CTRL ATC_CTRL_ATC_PKT_EN_DL 0x1

# DPE enabled
digitalIruFpga w DPE_0_DL_SETUP 0x1000004
#ATC Control
digitalIruFpga w ATC_CTRL 0x240

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {DOT Carrier step 1}>
<data>
srv datalink init
#srv datalink set dl branch_a 0 4 245760 8e2_1
srv datapath mute ul branch_h
srv datapath mute dl branch_a
srv datapath mute dl branch_b
srv datapath mute dl branch_c
srv datapath mute dl branch_d
srv datapath mute dl branch_e
srv datapath mute dl branch_f
srv datapath mute dl branch_g
srv datapath mute dl branch_h

srv datapath unmute dl branch_a
srv datapath unmute dl branch_b
srv datapath unmute dl branch_c
srv datapath unmute dl branch_d
srv datapath unmute dl branch_f
srv datapath unmute dl branch_e
srv datapath unmute dl branch_g
srv datapath unmute dl branch_h



srv duplex tdd_en set disable trx1
srv duplex tdd_en set disable trx2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {IRU ATC 1130}>
<data>
digitalIruFpga w DPE_0_DL_SETUP 0x0
digitalIruFpga w ATC_CTRL 0x1 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG 0x1 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG 0x100 0x100
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG 0x1 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG 0x100 0x100
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG 0x1 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG 0x100 0x100
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG 0x1 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG 0x100 0x100
digitalIruFpga w ATC_BINSCALE_SHIFT 0x7000 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP0 0xffff 0x0
digitalIruFpga w ATC_BINSCALE_SHIFT 0x700 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP1 0xffff 0x0
digitalIruFpga w ATC_BINSCALE_SHIFT 0x70 0x20
digitalIruFpga w ATC_BINSCALE_FACTOR_BP2 0xffff 0x28c2
digitalIruFpga w ATC_BINSCALE_SHIFT 0x7 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP3 0xffff 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_0 0x800400d0
digitalIruFpga w ATC_0_BLK_CFG_DL_1 0x80040051
digitalIruFpga w ATC_0_BLK_CFG_DL_2 0x80040052
digitalIruFpga w ATC_0_BLK_CFG_DL_3 0x80040053
digitalIruFpga w ATC_0_BLK_CFG_DL_4 0x80040054
digitalIruFpga w ATC_0_BLK_CFG_DL_5 0x80040055
digitalIruFpga w ATC_0_BLK_CFG_DL_6 0x80040056
digitalIruFpga w ATC_0_BLK_CFG_DL_7 0x8004e057
digitalIruFpga w ATC_0_BLK_CFG_DL_8 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_9 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_10 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_11 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_12 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_13 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_14 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_15 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_16 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_17 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_18 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_19 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_20 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_21 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_22 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_23 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_24 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_25 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_26 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_27 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_28 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_29 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_30 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_31 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_32 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_33 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_34 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_35 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_36 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_37 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_38 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_39 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_40 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_41 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_42 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_43 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_44 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_45 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_46 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_47 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_48 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_49 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_50 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_51 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_52 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_53 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_54 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_55 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_56 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_57 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_58 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_59 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_60 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_61 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_62 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_63 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR0_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR1_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR2_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR3_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR4_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR5_CFG 0x20000 0x20000
digitalIruFpga w ATC_TF_BR5_CFG 0x7f00 0x6000
digitalIruFpga w ATC_TF_BR5_CFG 0x1f 0x8
digitalIruFpga w ATC_TF_BR6_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR6_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR6_CFG 0x1f 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x20000 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x7f00 0x0
digitalIruFpga w ATC_TF_BR7_CFG 0x1f 0x0
digitalIruFpga w ATC_CTRL 0xf0 0x40
digitalIruFpga w ATC_CTRL 0x100 0x100
digitalIruFpga w ATC_CTRL 0x240
digitalIruFpga w DPE_0_DL_SETUP 0x1000000

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {DOT ATC CONF CHECK}>
<data>
hal fpga  read  0x2100  
hal fpga  read  0x2104  
hal fpga  read  0x2108  
hal fpga  read  0x210c  
hal fpga  read  0x2110  
hal fpga  read  0x2114  
hal fpga  read  0x2118  
hal fpga  read  0x211c  
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {ATC_202011231500_IRU_brnach_A}>
<data>
digitalIruFpga w DPE_0_DL_SETUP 0x0
digitalIruFpga w ATC_CTRL ATC_CTRL_DL_RST 0x1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG ATC_DL_BIN_CTRL_BP0_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46664662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46624662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_PUT 0x46626662
digitalIruFpga w ATC_DL_BIN_CTRL_BP0_CFG ATC_DL_BIN_CTRL_BP0_CFG_LOAD_RDY 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG ATC_DL_BIN_CTRL_BP1_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP1_CFG ATC_DL_BIN_CTRL_BP1_CFG_LOAD_RDY 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG ATC_DL_BIN_CTRL_BP2_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP2_CFG ATC_DL_BIN_CTRL_BP2_CFG_LOAD_RDY 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG ATC_DL_BIN_CTRL_BP3_CFG_WR_ADDR_RST 1
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_PUT 0x0
digitalIruFpga w ATC_DL_BIN_CTRL_BP3_CFG ATC_DL_BIN_CTRL_BP3_CFG_LOAD_RDY 1
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP0 0x2
digitalIruFpga w ATC_BINSCALE_FACTOR_BP0 ATC_BINSCALE_FACTOR_BP0_DL 0x28c2
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP1 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP1 ATC_BINSCALE_FACTOR_BP1_DL 0x0
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP2 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP2 ATC_BINSCALE_FACTOR_BP2_DL 0x0
digitalIruFpga w ATC_BINSCALE_SHIFT ATC_BINSCALE_SHIFT_DL_BP3 0x0
digitalIruFpga w ATC_BINSCALE_FACTOR_BP3 ATC_BINSCALE_FACTOR_BP3_DL 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_0 0x80010080
digitalIruFpga w ATC_0_BLK_CFG_DL_1 0x80010001
digitalIruFpga w ATC_0_BLK_CFG_DL_2 0x80010002
digitalIruFpga w ATC_0_BLK_CFG_DL_3 0x80010003
digitalIruFpga w ATC_0_BLK_CFG_DL_4 0x80010004
digitalIruFpga w ATC_0_BLK_CFG_DL_5 0x80010005
digitalIruFpga w ATC_0_BLK_CFG_DL_6 0x80010006
digitalIruFpga w ATC_0_BLK_CFG_DL_7 0x8001e007
digitalIruFpga w ATC_0_BLK_CFG_DL_8 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_9 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_10 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_11 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_12 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_13 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_14 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_15 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_16 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_17 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_18 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_19 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_20 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_21 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_22 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_23 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_24 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_25 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_26 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_27 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_28 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_29 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_30 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_31 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_32 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_33 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_34 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_35 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_36 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_37 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_38 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_39 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_40 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_41 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_42 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_43 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_44 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_45 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_46 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_47 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_48 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_49 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_50 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_51 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_52 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_53 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_54 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_55 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_56 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_57 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_58 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_59 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_60 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_61 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_62 0x0
digitalIruFpga w ATC_0_BLK_CFG_DL_63 0x0
digitalIruFpga w ATC_TF_BR0_CFG ATC_TF_BR0_CFG_TF_ENCODE_EN 0x1
digitalIruFpga w ATC_TF_BR0_CFG ATC_TF_BR0_CFG_TF_PSB_BIN_NR 0x60
digitalIruFpga w ATC_TF_BR0_CFG ATC_TF_BR0_CFG_TF_PSB_BLK_NR 0x8
digitalIruFpga w ATC_TF_BR1_CFG ATC_TF_BR1_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR1_CFG ATC_TF_BR1_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR1_CFG ATC_TF_BR1_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR2_CFG ATC_TF_BR2_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR2_CFG ATC_TF_BR2_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR2_CFG ATC_TF_BR2_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR3_CFG ATC_TF_BR3_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR3_CFG ATC_TF_BR3_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR3_CFG ATC_TF_BR3_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR4_CFG ATC_TF_BR4_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR4_CFG ATC_TF_BR4_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR4_CFG ATC_TF_BR4_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR5_CFG ATC_TF_BR5_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR5_CFG ATC_TF_BR5_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR5_CFG ATC_TF_BR5_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR6_CFG ATC_TF_BR6_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR6_CFG ATC_TF_BR6_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR6_CFG ATC_TF_BR6_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_TF_BR7_CFG ATC_TF_BR7_CFG_TF_ENCODE_EN 0x0
digitalIruFpga w ATC_TF_BR7_CFG ATC_TF_BR7_CFG_TF_PSB_BIN_NR 0x0
digitalIruFpga w ATC_TF_BR7_CFG ATC_TF_BR7_CFG_TF_PSB_BLK_NR 0x0
digitalIruFpga w ATC_CTRL ATC_CTRL_PKT_PER_TRANSFORM 0x4
digitalIruFpga w ATC_CTRL ATC_CTRL_ATC_PKT_EN_DL 0x1

# DPE enabled
digitalIruFpga w DPE_0_DL_SETUP 0x1000004
#ATC Control
digitalIruFpga w ATC_CTRL 0x340

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {23} {gain adjust}>
<data>
#===branch F
hal fpga read 0x1090
hal fpga read 0x1094
hal fpga write 0x1090 0x2000

hal fpga read 0x1490
hal fpga read 0x1494
hal fpga write 0x1494 0x2000

hal fpga read 0x1890
hal fpga read 0x1894
hal fpga write 0x1894 0x2000

hal fpga read 0x1c90
hal fpga read 0x1c94

hal fpga write 0x1c90 0x2000
hal fpga write 0x1c94 0x4000

hal fpga read 0x2090
hal fpga write 0x2090 0x800



#PTP
/var/run/coli/syncrdiptplocal info all
/var/run/coli/syncrdiptpcontrol info all
/var/run/coli/syncrdiptplocal ptp4ldebug 7
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {xenon:0 txpwr}>
<data>
xenon txpwr xenon:0
xenon txpwr xenon:1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {ATC_DOT_BranchF}>
<data>
hal fpga write 0x2020 0x0
hal fpga  writefield 0x20fc 0x1 0x1
hal fpga  writefield 0x2860 0x1 1
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  writefield 0x2860 0x100 1
hal fpga  writefield 0x286c 0x1 1
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  writefield 0x286c 0x100 1
hal fpga  writefield 0x2878 0x1 1
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  writefield 0x2878 0x100 1
hal fpga  writefield 0x2884 0x1 1
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  writefield 0x2884 0x100 1
hal fpga  writefield  0x2890 0x7000 0x0
hal fpga  writefield  0x2894 0xffff 0x0
hal fpga  writefield  0x2890 0x700 0x0
hal fpga  writefield  0x2898 0xffff 0x0
hal fpga  writefield  0x2890 0x70 0x2
hal fpga  writefield  0x289c 0xffff 0x647f
#hal fpga  writefield  0x289c 0xffff 0x28c2
hal fpga  writefield  0x2890 0x7 0x0
hal fpga  writefield  0x28a0 0xffff 0x0
hal fpga  write  0x2100  0x800400d0
hal fpga  write  0x2104  0x80040051
hal fpga  write  0x2108  0x80040052
hal fpga  write  0x210c  0x80040053
hal fpga  write  0x2110  0x80040054
hal fpga  write  0x2114  0x80040055
hal fpga  write  0x2118  0x80040056
hal fpga  write  0x211c  0x8004e057
hal fpga  write  0x2120  0x0
hal fpga  write  0x2124  0x0
hal fpga  write  0x2128  0x0
hal fpga  write  0x212c  0x0
hal fpga  write  0x2130  0x0
hal fpga  write  0x2134  0x0
hal fpga  write  0x2138  0x0
hal fpga  write  0x213c  0x0
hal fpga  write  0x2140  0x0
hal fpga  write  0x2144  0x0
hal fpga  write  0x2148  0x0
hal fpga  write  0x214c  0x0
hal fpga  write  0x2150  0x0
hal fpga  write  0x2154  0x0
hal fpga  write  0x2158  0x0
hal fpga  write  0x215c  0x0
hal fpga  write  0x2160  0x0
hal fpga  write  0x2164  0x0
hal fpga  write  0x2168  0x0
hal fpga  write  0x216c  0x0
hal fpga  write  0x2170  0x0
hal fpga  write  0x2174  0x0
hal fpga  write  0x2178  0x0
hal fpga  write  0x217c  0x0
hal fpga  write  0x2180  0x0
hal fpga  write  0x2184  0x0
hal fpga  write  0x2188  0x0
hal fpga  write  0x218c  0x0
hal fpga  write  0x2190  0x0
hal fpga  write  0x2194  0x0
hal fpga  write  0x2198  0x0
hal fpga  write  0x219c  0x0
hal fpga  write  0x21a0  0x0
hal fpga  write  0x21a4  0x0
hal fpga  write  0x21a8  0x0
hal fpga  write  0x21ac  0x0
hal fpga  write  0x21b0  0x0
hal fpga  write  0x21b4  0x0
hal fpga  write  0x21b8  0x0
hal fpga  write  0x21bc  0x0
hal fpga  write  0x21c0  0x0
hal fpga  write  0x21c4  0x0
hal fpga  write  0x21c8  0x0
hal fpga  write  0x21cc  0x0
hal fpga  write  0x21d0  0x0
hal fpga  write  0x21d4  0x0
hal fpga  write  0x21d8  0x0
hal fpga  write  0x21dc  0x0
hal fpga  write  0x21e0  0x0
hal fpga  write  0x21e4  0x0
hal fpga  write  0x21e8  0x0
hal fpga  write  0x21ec  0x0
hal fpga  write  0x21f0  0x0
hal fpga  write  0x21f4  0x0
hal fpga  write  0x21f8  0x0
hal fpga  write  0x21fc  0x0
hal fpga  writefield  0x2a00 0x20000 0x0
hal fpga  writefield  0x2a00 0x7f00 0x0
hal fpga  writefield  0x2a00 0x1f 0x0
hal fpga  writefield  0x2a04 0x20000 0x0
hal fpga  writefield  0x2a04 0x7f00 0x0
hal fpga  writefield  0x2a04 0x1f 0x0
hal fpga  writefield  0x2a08 0x20000 0x0
hal fpga  writefield  0x2a08 0x7f00 0x0
hal fpga  writefield  0x2a08 0x1f 0x0
hal fpga  writefield  0x2a0c 0x20000 0x0
hal fpga  writefield  0x2a0c 0x7f00 0x0
hal fpga  writefield  0x2a0c 0x1f 0x0
hal fpga  writefield  0x2a10 0x20000 0x0
hal fpga  writefield  0x2a10 0x7f00 0x0
hal fpga  writefield  0x2a10 0x1f 0x0
hal fpga  writefield  0x2a14 0x20000 0x1
hal fpga  writefield  0x2a14 0x7f00 0x60
hal fpga  writefield  0x2a14 0x1f 0x8
hal fpga  writefield  0x2a18 0x20000 0x0
hal fpga  writefield  0x2a18 0x7f00 0x0
hal fpga  writefield  0x2a18 0x1f 0x0
hal fpga  writefield  0x2a1c 0x20000 0x0
hal fpga  writefield  0x2a1c 0x7f00 0x0
hal fpga  writefield  0x2a1c 0x1f 0x0
hal fpga  writefield 0x20fc 0xf0 0x4
hal fpga write 0x2020 0x30000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {DOT ATC 1130}>
<data>
hal fpga write 0x2020 0x0
hal fpga  writefield 0x20fc 0x1 0x1
hal fpga  writefield 0x2860 0x1 1
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  write 0x2864 0x0
hal fpga  writefield 0x2860 0x100 1
hal fpga  writefield 0x286c 0x1 1
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  write 0x2870 0x0
hal fpga  writefield 0x286c 0x100 1
hal fpga  writefield 0x2878 0x1 1
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46664662
hal fpga  write 0x287c 0x46626662
hal fpga  write 0x287c 0x46624662
hal fpga  write 0x287c 0x46626662
hal fpga  writefield 0x2878 0x100 1
hal fpga  writefield 0x2884 0x1 1
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  write 0x2888 0x0
hal fpga  writefield 0x2884 0x100 1
hal fpga  writefield  0x2890 0x7000 0x0
hal fpga  writefield  0x2894 0xffff 0x0
hal fpga  writefield  0x2890 0x700 0x0
hal fpga  writefield  0x2898 0xffff 0x0
hal fpga  writefield  0x2890 0x70 0x2
hal fpga  writefield  0x289c 0xffff 0x647d
hal fpga  writefield  0x2890 0x7 0x0
hal fpga  writefield  0x28a0 0xffff 0x0
hal fpga  write  0x2100  0x800400d0
hal fpga  write  0x2104  0x80040051
hal fpga  write  0x2108  0x80040052
hal fpga  write  0x210c  0x80040053
hal fpga  write  0x2110  0x80040054
hal fpga  write  0x2114  0x80040055
hal fpga  write  0x2118  0x80040056
hal fpga  write  0x211c  0x8004e057
hal fpga  write  0x2120  0x0
hal fpga  write  0x2124  0x0
hal fpga  write  0x2128  0x0
hal fpga  write  0x212c  0x0
hal fpga  write  0x2130  0x0
hal fpga  write  0x2134  0x0
hal fpga  write  0x2138  0x0
hal fpga  write  0x213c  0x0
hal fpga  write  0x2140  0x0
hal fpga  write  0x2144  0x0
hal fpga  write  0x2148  0x0
hal fpga  write  0x214c  0x0
hal fpga  write  0x2150  0x0
hal fpga  write  0x2154  0x0
hal fpga  write  0x2158  0x0
hal fpga  write  0x215c  0x0
hal fpga  write  0x2160  0x0
hal fpga  write  0x2164  0x0
hal fpga  write  0x2168  0x0
hal fpga  write  0x216c  0x0
hal fpga  write  0x2170  0x0
hal fpga  write  0x2174  0x0
hal fpga  write  0x2178  0x0
hal fpga  write  0x217c  0x0
hal fpga  write  0x2180  0x0
hal fpga  write  0x2184  0x0
hal fpga  write  0x2188  0x0
hal fpga  write  0x218c  0x0
hal fpga  write  0x2190  0x0
hal fpga  write  0x2194  0x0
hal fpga  write  0x2198  0x0
hal fpga  write  0x219c  0x0
hal fpga  write  0x21a0  0x0
hal fpga  write  0x21a4  0x0
hal fpga  write  0x21a8  0x0
hal fpga  write  0x21ac  0x0
hal fpga  write  0x21b0  0x0
hal fpga  write  0x21b4  0x0
hal fpga  write  0x21b8  0x0
hal fpga  write  0x21bc  0x0
hal fpga  write  0x21c0  0x0
hal fpga  write  0x21c4  0x0
hal fpga  write  0x21c8  0x0
hal fpga  write  0x21cc  0x0
hal fpga  write  0x21d0  0x0
hal fpga  write  0x21d4  0x0
hal fpga  write  0x21d8  0x0
hal fpga  write  0x21dc  0x0
hal fpga  write  0x21e0  0x0
hal fpga  write  0x21e4  0x0
hal fpga  write  0x21e8  0x0
hal fpga  write  0x21ec  0x0
hal fpga  write  0x21f0  0x0
hal fpga  write  0x21f4  0x0
hal fpga  write  0x21f8  0x0
hal fpga  write  0x21fc  0x0
hal fpga  writefield  0x2a00 0x20000 0x0
hal fpga  writefield  0x2a00 0x7f00 0x0
hal fpga  writefield  0x2a00 0x1f 0x0
hal fpga  writefield  0x2a04 0x20000 0x0
hal fpga  writefield  0x2a04 0x7f00 0x0
hal fpga  writefield  0x2a04 0x1f 0x0
hal fpga  writefield  0x2a08 0x20000 0x0
hal fpga  writefield  0x2a08 0x7f00 0x0
hal fpga  writefield  0x2a08 0x1f 0x0
hal fpga  writefield  0x2a0c 0x20000 0x0
hal fpga  writefield  0x2a0c 0x7f00 0x0
hal fpga  writefield  0x2a0c 0x1f 0x0
hal fpga  writefield  0x2a10 0x20000 0x0
hal fpga  writefield  0x2a10 0x7f00 0x0
hal fpga  writefield  0x2a10 0x1f 0x0
hal fpga  writefield  0x2a14 0x20000 0x1
hal fpga  writefield  0x2a14 0x7f00 0x60
hal fpga  writefield  0x2a14 0x1f 0x8
hal fpga  writefield  0x2a18 0x20000 0x0
hal fpga  writefield  0x2a18 0x7f00 0x0
hal fpga  writefield  0x2a18 0x1f 0x0
hal fpga  writefield  0x2a1c 0x20000 0x0
hal fpga  writefield  0x2a1c 0x7f00 0x0
hal fpga  writefield  0x2a1c 0x1f 0x0
hal fpga  writefield 0x20fc 0xf0 0x4
hal fpga write 0x2020 0x30000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {Madura config from LiWen F}>
<data>
##### TX enable####
#madura func maduraFuncRxTxEnableSet <trx_id> <rxChannelMask> <txChannelMask>
madura func maduraFuncRxTxEnableSet 1 0 15
#madura func maduraFuncRxTxEnableGet
madura func maduraFuncRxTxEnableGet 1

#madura func maduraFuncTxToOrxMappingSet <trx_id> <orxChannel> <txChannel>
madura func maduraFuncTxToOrxMappingSet 1 0x20 2

#madura func maduraFuncTxToOrxMappingGet <trx_id> <orxChannel> 
madura func maduraFuncTxToOrxMappingGet 1 0x20


#madura func maduraFuncTxLoSourceGet <trx_id> <txChannel>
madura func maduraFuncTxLoSourceGet 1 2

#madura func maduraFuncPllFrequencyGet <trx_id> <pllName>
madura func maduraFuncPllFrequencyGet 1 1

#madura func maduraFuncPllFrequencySet <trx_id> <pllName> <pllLoFrequency_Hz>
madura func maduraFuncPllFrequencySet 1 0 2595000000
madura func maduraFuncPllFrequencySet 1 1 2595000000

#####DPD MODEL####
madura func maduraFuncDpdModelConfigSet 1 2 95

####clgc config####
madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncClgcConfigGet 1 2

####DPD config####
madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1 0 0
madura func maduraFuncDpdTrackingConfigGet 1 2
#### PA on####
hal fpga write 0x102c 0x8000303f
hal fpga write 0x142c 0x8000303f
hal fpga write 0x182c 0x8000303f
hal fpga write 0x1c2c 0x8000303f 
#!!!!! open the DC power supply!!!!!!

####initial tracking ####
#EXT PATH DELAY
madura func maduraFuncInitCalsRun 1 0x200000 2 0

#EXT LOL
madura func maduraFuncInitCalsRun 1 0x800 2 0

#DPD
madura func maduraFuncInitCalsRun 1 0x10000000 2 0

####QEC,LO,CLGC tracking enable####
#madura func maduraFuncInitCalsRun <trx_id> <initCals.calMask> <initCals.channelMask> <initCals.warmBoot>
#QEC Init Cal
#madura func maduraFuncTrackingCalsEnableSet 1 0x1000 1
# Tx to orx mapping
#madura func maduraFuncTxToOrxMappingSet 1 0x20 2
#ETX Pathdelay
#madura func maduraFuncInitCalsRun 1 0x200000 2 0
#EXT LO
#madura func maduraFuncInitCalsRun 1 0x800 2 0
#DPD Mode
#madura func maduraFuncDpdModelConfigSet 1 2 95
# DPD config
#madura func maduraFuncDpdTrackingConfigSet 1 0x0F 20 20 16384 0xb68 65530 1 0x207 0 0x207 1
# CLGC Config
#madura func maduraFuncClgcConfigSet 1 1 0x0F 1 10 0 0 0.05 -20 -36 0 0.5 0.1 0.05 30
madura func maduraFuncTrackingCalsEnableSet 1 0x202200 1
madura func maduraFuncDpdStatusGet 1 2


#### Tx test Tone #### optional
#madura func maduraFuncTxTestToneSet 1 2 0 2000000 0


#### DPD trackin enable####
madura func maduraFuncTrackingCalsEnableSet 1 0x20000 1
madura func maduraFuncDpdStatusGet 1 2
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {28} {IQC Check}>
<data>
hal fpga read 0x202c
hal fpga read 0x2030
hal fpga read 0x2034
hal fpga read 0x2038


digitalIruFpga r OAM0_IRU_MAC_ADDR_LSB
digitalIruFpga r OAM0_IRU_MAC_ADDR_MSB


xenon r xenon:0 CPRI_IQC_X_MCPRI_0_EGR_ACCEPT_PKT
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_EGR_ACCEPT_PKT 
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_EGR_ACCEPT_PKT
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_EGR_ACCEPT_PKT
 
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING_DISCARD_PKT
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_ING_DISCARD_PKT
xenon r xenon:0 CPRI_IQC_X_MCPRI_2_ING_DISCARD_PKT
xenon r xenon:0 CPRI_IQC_X_MCPRI_3_ING_DISCARD_PKT
 
xenon r xenon:1 CPRI_IQC_X_MCPRI_0_EGR_ACCEPT_PKT
xenon r xenon:1 CPRI_IQC_X_MCPRI_1_EGR_ACCEPT_PKT 
xenon r xenon:1 CPRI_IQC_X_MCPRI_2_EGR_ACCEPT_PKT
xenon r xenon:1 CPRI_IQC_X_MCPRI_3_EGR_ACCEPT_PKT
                
xenon r xenon:1 CPRI_IQC_X_MCPRI_0_ING_DISCARD_PKT
xenon r xenon:1 CPRI_IQC_X_MCPRI_1_ING_DISCARD_PKT
xenon r xenon:1 CPRI_IQC_X_MCPRI_2_ING_DISCARD_PKT
xenon r xenon:1 CPRI_IQC_X_MCPRI_3_ING_DISCARD_PKT

xenon r xenon:0 CPRI_IQC_X_MCPRI_0_EGR_TRAP
xenon r xenon:0 CPRI_IQC_FCB_TRAP
xenon r xenon:0 CPRI_IQC_X_CORE

xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING
xenon r xenon:0 0x06660098
xenon r xenon:0 SYNC_EGS_OUTPUT
xenon r xenon:0 0x066600A0
xenon r xenon:0 0x066600BC
xenon r xenon:0 CPRI_IQC_DLH
xenon r xenon:0 CPRI_IQC_DLH_STATUS
xenon r xenon:0 CPRI_IQC_X_MCPRI_0_ING 
xenon r xenon:0 CPRI_IQC_X_MCPRI_1_ING 


xenon r xenon:0 CPRI_IQC_DLH_DL_FB12_CONF
xenon r xenon:0 CPRI_IQC_DLH_DL_FB13_CONF
xenon r xenon:0 CPRI_IQC_DLH_DL_FB14_CONF
xenon r xenon:0 CPRI_IQC_DLH_DL_FB15_CONF
xenon r xenon:0 CPRI_IQC_DLH_DL_FB16_CONF
xenon r xenon:0 CPRI_IQC_DLH_DL_FB17_CONF

rdsh 2 hal fpga read 0x119c
rdsh 2 hal fpga read 0x11e8

rdsh 2 hal fpga read 0x159c
rdsh 2 hal fpga read 0x15e8

rdsh 2 hal fpga read 0x199c
rdsh 2 hal fpga read 0x19e8

rdsh 2 hal fpga read 0x1d9c
rdsh 2 hal fpga read 0x1de8


rdsh 2 srv pwrmeas dlpwr get branch_f

digitalIruFpga w IQC_TX_CFG 0x1
digitalIruFpga r IQC_DBG_STAT

digitalIruFpga r IQC_STATUS 





</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {29} {DPD Status}>
<data>
madura func maduraFuncDpdStatusGet 0 1
madura func maduraFuncDpdStatusGet 0 2


madura func maduraFuncDpdStatusGet 1 8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {nor flash}>
<button {0} {flexspi erase_sec}>
<data>
flexspi erase_sec spi1 0x30300000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {flexspi write spi1}>
<data>
flexspi write spi1 0x30300000 0xAA55AA55
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {flexspi read spi1}>
<data>
flexspi read spi1 0x30300000 4
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {ISSI stability test}>
<data>
dot> flexspi erase_sec spi1 0x30300000
OK
dot> flexspi write spi1 0x30300000 0x55AA55AA
0x55,0xaa,0x55,0xaa,OK
dot> flexspi read spi1 0x30300000 4
Date:
0x55 0xaa 0x55 0xaa 
dot> flexspi erase_sec spi1 0x30300000
OK
dot> flexspi write spi1 0x30300000 0xAA55AA55
0xaa,0x55,0xaa,0x55,OK
dot> flexspi read spi1 0x30300000 4
Date:
0xaa 0x55 0xaa 0x55 

#this is the test log, need to change the format,then you can use it to do stability test
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {marvell phy}>
<button {0} {LTU status}>
<data>
#update LTU's io status, need to send this before read LTU registers
i2c write clock_synth 00,0f,01	
#read SYNCE(REFA) status, 0x10 with IRU1648, 0xb with IRU1649
i2c read clock_synth -s 30,05 -r 1		
#read FPGA recover clock(REFB) status, 0x10 with IRU1649, 0xb with IRU1648
i2c read clock_synth -s 30,07 -r 1		
#read DPLL0 lock status, should be 0x2f, other value means abnormal
i2c read clock_synth -s 31,00 -r 1	
#read DPLL1 lock status, should be 0x2f, other value means abnormal				
i2c read clock_synth -s 32,00 -r 1	
#read DPLL0 operation, should be 0x8, 0x18 means tcxo is chosen
i2c read clock_synth -s 31,01 -r 1	
#read DPLL1 operation, should be 0x8, 0x18 means tcxo is chosen					
i2c read clock_synth -s 32,01 -r 1	
#read SYSCLK and PLL status, should be 0x33, other value means abnormal
i2c read clock_synth -s 30,01 -r 1

#other clock lock status

#read power down status, bit 3 Power-down REFBB, bit 2 Power-down REFB, bit 1Power-down REFAA, bit 0 Power-down REFA
i2c read clock_synth -s 20,01 -r 1
#Read if Closed-loop source is Auxiliary DPLL source
i2c read clock_synth -s 02,84 -r 1
#TCXO(REFAA)
i2c read clock_synth -s 30,06 -r 1
#FPGA RECOVERY CLK REFB 
i2c read clock_synth -s 30,07 -r 1
#FPGA RECOVERY CLK REFBB 
i2c read clock_synth -s 30,08 -r 1 
#0x10 means reference valid,other value means invalid,detail info can be found in register manual

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {TM3 Slave mode jitter test}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b011, Slave mode jitter test
mdio write 8 1 0x0084 0x6000

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {TM4-t5}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b100, Transmitter distortion test
#bit 12:10 = 0b110,  Dual Tone #4
mdio write 8 1 0x0084 0x9800

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {1 db reparse}>
<data>
db reparse
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {jitter slave-master}>
<data>
#write 7.0x20  Autonegotiation 10GBASE-T Control register
#bit 15 = 1 Enable MASTER-SLAVE Manual configuration
#bit 14, MASTER-SLAVE Configuration, 1 = Master
#bit 12 = 1, Advertise PHY as 10GBASE-T capable
#bit 1 = 1,  Advertise PHY as 10GBASE-T fast retrain capable
#bit 0 = 1,  Advertise PHY as capable of loop timing
mdio write 8 7 0x0020 0xd003
#write 7.0  Autonegotiation Standard Control register
#bit 13,  Extended next pages are enabled
#bit 12, Enable autonegotiation
#bit 9,  Restart autonegotiation process
mdio write 8 7 0x0000 0x3200
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {TM4-t1}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b100, Transmitter distortion test
#bit 12:10 = 0b001,  Dual Tone #1
mdio write 8 1 0x0084 0x8400

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {TM5}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b101,  PSD and power level test
mdio write 8 1 0x0084 0xa000

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {back to normal mode}>
<data>
mdio write 8 1 0x0084 0x0000

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {2 hal ltu init}>
<data>
hal ltu init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {jitter slave-slave}>
<data>
#write 7.0x20  Autonegotiation 10GBASE-T Control register
#bit 15 = 1 Enable MASTER-SLAVE Manual configuration
#bit 14, MASTER-SLAVE Configuration, 0 = Slave
#bit 12 = 1, Advertise PHY as 10GBASE-T capable
#bit 1 = 1,  Advertise PHY as 10GBASE-T fast retrain capable
#bit 0 = 1,  Advertise PHY as capable of loop timing
mdio write 8 7 0x0020 0x9003
#write 7.0  Autonegotiation Standard Control register
#bit 13,  Extended next pages are enabled
#bit 12, Enable autonegotiation
#bit 9,  Restart autonegotiation process
mdio write 8 7 0x0000 0x3200
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {TM4-t2}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b100, Transmitter distortion test
#bit 12:10 = 0b010,  Dual Tone #2
mdio write 8 1 0x0084 0x8800

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {TM6}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b110,   Transmitter Droop test
mdio write 8 1 0x0084 0xc000
mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {Set TM as Default}>
<data>
mdio write 8 1 0x0084 0x0
mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {3 ethphy config_registers}>
<data>
ethphy config_registers
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {TM1 Master source for slave mode jitter test}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 13 = 1, Master source for slave mode jitter test
mdio write 8 1 0x0084 0x2000

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {TM4-t3}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b100, Transmitter distortion test
#bit 12:10 = 0b100,  Dual Tone #3
mdio write 8 1 0x0084 0x9000
mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {PHY Status}>
<data>

#for dot4455, PHY Status Register
#user status 603a ,0107 ---ok
#mdio read 1 0x1e 0x400d

#for dot4453, 

#read 1.E800, should be 0x1, bit 0 = 1 means PMA Rx link good
mdio read 8 1 0xE800

#read 7.C800, should be 0x7, bit 3:1 = 0b011 means speed is 10G, bit 0 = 1 means Full Duplex
mdio read 8 7 0xC800

#read 3.0x20, should be 0x100D, PCS 10G status, bit 12 = 1 means PCS 10G link up, bit 1 = 0 means no high BER, bit 0 = 1 means frame synchronization is locked on 10G PCS
mdio read 8 3 0x20

#LINE STATUS
#PMA Standard Status 1 Register, 1.1, should return 0x4(or 0x6?), means PMA/PMD receive link up and  PMA supports low-power mode
mdio read 8 1 0x0001
#PCS Standard Status 1 Register,, address 3.1, should return 0x4(or 0x6?), means PCS Receive link-up and PCS supports low-power mode
mdio read 8 3 0x0001

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {4 ethphy db_init}>
<data>
ethphy db_init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {TM2 Master mode jitter test}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 14 = 1, Master mode jitter test
mdio write 8 1 0x0084 0x4000

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {TM4-t4}>
<data>
#write 10GBASE-T Test Modes register, Address 1.84
#bit 15:13 = 0b100, Transmitter distortion test
#bit 12:10 = 0b101,  Dual Tone #4
mdio write 8 1 0x0084 0x9400

mdio read 8 1 0x0084
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {PHY Load}>
<data>
#gpio write PTC 0 0
#gpio write PTC 0 1
#set UART tx pin?
gpio write PT3 0 0
gpio write PT3 0 1
ethphy download pis
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {marvell phy and fpga USXGMII test}>
<button {0} {1 db reparse}>
<data>
db reparse
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {6 hal fpga init}>
<data>
hal fpga init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {7 set PHY into PRBS test mode}>
<data>
# Enable SerDes PRBS Test Mode, sets mode via 4.E414.7:4 (0 for XFI), enable by write 1 into 4.E414.3:0
mdio write 8 4 0xe414 0x1

# Set PRBS Pattern to PRBS31,	sets 4.E415.3:0
mdio write 8 4 0xe415 0x1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {12 clear FPGA error count}>
<data>
# RESET RX PRBS error counter
hal fpga write 0x4018 0x20001505
hal fpga write 0x4018 0x20000505
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {usxgmii prbs31 test in total}>
<data>
#PHY
# Enable SerDes PRBS Test Mode, sets mode via 4.E414.7:4 (0 for XFI), enable by write 1 into 4.E414.3:0
mdio write 8 4 0xe414 0x1

# Set PRBS Pattern to PRBS31,	sets 4.E415.3:0
mdio write 8 4 0xe415 0x1

# Inject PRBS Error, sets 4.E415.5
mdio write 8 4 0xe415 0x21

# PRBS Bit Error Count, reads 4.E811.E:0
mdio read 8 4 0xe811

# Clear PRBS Error Counter, sets 4.E415.4? (Marvell's code has typo in the comment), self clear bit
mdio write 8 4 0xe415 0x11

# Disable SerDes Test Mode, sets 4.E415.3:0/4.E414.3:0 to 0
mdio write 8 4 0xe415 0x0
mdio write 8 4 0xe414 0x0




#FPGA
#below configurations are for Using TX Pattern Generator, could be found at page 155 in UG578 ultrasacle gty transceivers

# Reset TXPCS
hal fpga write 0x4018 0x51000000
# Set attribute TXBUF_EN to 1'b1 via DRP. UG578 is wrong, don't set TXGEARBOX_EN to 1
# read out 0x7c's value(normally 2068)
hal fpga write 0x4010 0x807C0000
hal fpga read 0x4014

#if 2068, then write 20e8
hal fpga write 0x4010 0xC07C00e8
hal fpga write 0x4010 0x807C0000
hal fpga read 0x4014

# Set port TXOUTCLKSEL to 3'b010 (TXOUTCLKPMA).
hal fpga write 0x4018 0x21000000

# Set port TXPRBSSEL to the desired pattern.
# Enable the PRBS-31 test @FPGA
# Set the TX & RX to PRBS-31
hal fpga write 0x4018 0x21000505
#hal fpga write 0x4018 0x21000101

# RESET RX PRBS error counter
hal fpga write 0x4018 0x21001505
hal fpga write 0x4018 0x21000505

#hal fpga write 0x4018 0x21001101
#hal fpga write 0x4018 0x21000101

hal fpga read 0x4018

# Release the PCS from reset by deasserting TXPCSRESET and wait for TXRESETDONE to assert
hal fpga write 0x4018 0x20000505
#hal fpga write 0x4018 0x21000101
# 0x7
hal fpga read 0x400c


#FPGA
### Force TX PRBS error
## wait 2min
# FPGA TX force error,when bit 4 become high.
hal fpga write 0x4018 0x20000515
#clear error
hal fpga write 0x4018 0x20000505

#read error
# RX PRBS CNT READ, 0x25e(15:0), 0x25f(31:16)
hal fpga write 0x4010 0x825e0000
hal fpga read 0x4014

hal fpga write 0x4010 0x825f0000
hal fpga read 0x4014

#PHY
# Inject PRBS Error, sets 4.E415.5
mdio write 8 4 0xe415 0x21

# PRBS Bit Error Count, reads 4.E811.E:0
mdio read 8 4 0xe811

# Clear PRBS Error Counter, sets 4.E415.4? (Marvell's code has typo in the comment), self clear bit
mdio write 8 4 0xe415 0x11



</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {2 hal ltu init}>
<data>
hal ltu init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {system reset}>
<data>
system reset
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {8 set FPGA into PRBS mode}>
<data>
# Reset TXPCS
hal fpga write 0x4018 0x51000000
# Set attribute TXBUF_EN to 1'b1 via DRP. UG578 is wrong, don't set TXGEARBOX_EN to 1
# read out 0x7c's value(normally 2068)
#hal fpga write 0x4010 0x807C0000
#hal fpga read 0x4014

#if 2068, then write 20e8
hal fpga write 0x4010 0xC07C00e8
hal fpga write 0x4010 0x807C0000
#hal fpga read 0x4014

# Set port TXOUTCLKSEL to 3'b010 (TXOUTCLKPMA).
hal fpga write 0x4018 0x21000000

# Set port TXPRBSSEL to the desired pattern.
# Enable the PRBS-31 test @FPGA
# Set the TX & RX to PRBS-31
hal fpga write 0x4018 0x21000505
#hal fpga write 0x4018 0x21000101

# RESET RX PRBS error counter
hal fpga write 0x4018 0x21001505
hal fpga write 0x4018 0x21000505

#hal fpga write 0x4018 0x21001101
#hal fpga write 0x4018 0x21000101

#hal fpga read 0x4018

# Release the PCS from reset by deasserting TXPCSRESET and wait for TXRESETDONE to assert
hal fpga write 0x4018 0x20000505
#hal fpga write 0x4018 0x21000101
# 0x7
#hal fpga read 0x400c

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {12 inject one error from PHY to FPGA}>
<data>
# Inject PRBS Error, sets 4.E415.5
mdio write 8 4 0xe415 0x21
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {3 ethphy config_registers}>
<data>
ethphy config_registers
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {9 read PHY error count}>
<data>
# PRBS Bit Error Count, reads 4.E811.E:0
mdio read 8 4 0xe811
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {13 set FPGA TX into error}>
<data>
# FPGA TX force error,when bit 4 become high.
hal fpga write 0x4018 0x20000515
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {4 ethphy db_init}>
<data>
ethphy db_init
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {10 read FPGA error count}>
<data>
#read error
# RX PRBS CNT READ, 0x25e(15:0), 0x25f(31:16)
hal fpga write 0x4010 0x825f0000
hal fpga read 0x4014
hal fpga write 0x4010 0x825e0000
hal fpga read 0x4014


</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {14 get FPGA TX out of error}>
<data>
#clear error
hal fpga write 0x4018 0x20000505
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {5 hal fpga program}>
<data>
hal fpga program
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {11 clear PHY error count}>
<data>
# Clear PRBS Error Counter, sets 4.E415.4? (Marvell's code has typo in the comment), self clear bit
mdio write 8 4 0xe415 0x11
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {TIF_board and PHY}>
<button {0} {db reparse}>
<data>
db reparse

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {jtagspi -s=ENABLE_JTAG_SEGGER}>
<data>
jtagspi -s=ENABLE_JTAG_SEGGER
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {ethphy config_registers}>
<data>
ethphy config_registers
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {jtagspi -s=ENABLE_SPI}>
<data>
jtagspi -s=ENABLE_SPI
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {TIF all commands}>
<data>
24v -p=RFCONNECTORPNEUMATIC -s=on
progjtag -s=on
uart -p=RD -s=on
testcon3state -s=on
24v -p=FAN1 -s=on
dmmmux -m=ISENSE_LINE
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
poecurrent -m=1 -g=64
dmmmux -m=ISENSE_LINE
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
poecurrent -m=1 -g=64
dmmmux -m=ISENSE_DIFF
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
poecurrent -m=0 -g=1
testcon3state -s=off
testcon3state -s=on
poecurrent -m=0 -g=1
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
testcon3state -s=on
dmmmux -m=DUT5V
dmmmux -m=DUT3_3V
testcon3state -s=off
testcon3state -s=off
testcon3state -s=on
poecurrent -m=0 -g=1
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
testcon3state -s=on
dmmmux -m=DUT5V
dmmmux -m=DUT3_3V
testcon3state -s=off
progjtag -s=on
uart -p=RD -s=on
testcon3state -s=on
progjtag -s=on
jtagspi -s=ENABLE_JTAG_SEGGER
progjtag -s=on
uart -p=RD -s=on
testcon3state -s=on
progjtag -s=on
jtagspi -s=ENABLE_SPI
progjtag -s=on
progjtag -s=off
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
testcon3state -s=on
progjtag -s=on
progjtag -s=off
dutpower -s=on
uart -p=RD -s=on
uart -p=RD -s=on
testcon3state -s=on
24v -p=RFCONNECTORPNEUMATIC -s=off

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {jtagspi -s=1}>
<data>
jtagspi -s=1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {progjtag -s=on}>
<data>
progjtag -s=on
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {uart -p=RD -s=on}>
<data>
uart -p=RD -s=on
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {VR test case}>
<button {0} {sysref generate}>
<data>

#clock test
#//TC3.18 TC3.22 TC3.23
#//N-shot sysref
#//4-shot sysref (configure once)
i2c write clock_synth 14,d3,04
i2c write clock_synth 00,0f,01

#//M0 toggle to trigger one time
gpio write PT3 14 0
gpio write PT3 14 1

#//period sysref, sysref (configure once)
i2c write clock_synth 14,d2,00
i2c write clock_synth 14,d3,44
i2c write clock_synth 00,0f,01

#//sysref off
gpio write PT3 14 0

#//sysref on, keep gpio 1 will get period SYSREF
gpio write PT3 14 1

#//sysref off when finish usage.
gpio write PT3 14 0

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {1} {read phy ber}>
<data>
ethphy reg_read line 8 3 0x21
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {phy loopback function}>
<data>
srv ethernet lbtest 1500 1000 10
#srv ethernet lbtest <pkt size> <count> <waittm> -Loopback test
#Packet size should be between 64, 1500
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {CLGC status}>
<data>
rfic clgc trx1 get tx1 satus
rfic clgc trx1 get tx2 satus
rfic clgc trx1 get tx3 satus
rfic clgc trx1 get tx4 satus
rfic clgc trx3 get tx1 satus
rfic clgc trx3 get tx2 satus
rfic clgc trx3 get tx3 satus
rfic clgc trx3 get tx4 satus

rdsh 1 rfic clgc trx1 get tx1 satus
rdsh 1 rfic clgc trx1 get tx2 satus
rdsh 1 rfic clgc trx1 get tx3 satus
rdsh 1 rfic clgc trx1 get tx4 satus
rdsh 1 rfic clgc trx3 get tx1 satus
rdsh 1 rfic clgc trx3 get tx2 satus
rdsh 1 rfic clgc trx3 get tx3 satus
rdsh 1 rfic clgc trx3 get tx4 satus

rdsh 1 srv pwrmeas dlpwr get branch_a
rdsh 1 srv pwrmeas dlpwr get branch_b
rdsh 1 srv pwrmeas dlpwr get branch_c
rdsh 1 srv pwrmeas dlpwr get branch_d
rdsh 1 srv pwrmeas dlpwr get branch_e
rdsh 1 srv pwrmeas dlpwr get branch_f
rdsh 1 srv pwrmeas dlpwr get branch_g
rdsh 1 srv pwrmeas dlpwr get branch_h

rdsh 1 srv pwrmeas ulpwr get branch_a
rdsh 1 srv pwrmeas ulpwr get branch_b
rdsh 1 srv pwrmeas ulpwr get branch_c
rdsh 1 srv pwrmeas ulpwr get branch_d
rdsh 1 srv pwrmeas ulpwr get branch_e
rdsh 1 srv pwrmeas ulpwr get branch_f
rdsh 1 srv pwrmeas ulpwr get branch_g
rdsh 1 srv pwrmeas ulpwr get branch_h
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {7} {temp all}>
<data>
temp all
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {usxgmii loopback test by register config}>
<data>
#access to MAC@PHY, input these to config MAC side of PHY, input other commands to config line side, see 2.2 register maps in 84891-DS100
mdio write 1 0x1e 0x4110 0x2004
mdio write 1 0x1e 0x4111 0x2004
mdio write 1 0x1e 0x4113 0x2004

#read register, XFI_TX_prbs_gen_config:PRBS generator control register (DEVAD = 1, Address = 0xD0E1)
#set the PRBS polynomial as PRBS 31 on TX
#Enable the PRBS generator on TX
mdio read 1 1 0xD0E1
mdio write 1 1 0xD0E1 0xa
mdio write 1 1 0xD0E1 0xb

#insert error at transmit@PHY,bit 5 0-to-1 transition inserts single bit error in  the MSB bit of the data bus
#mdio write 1 1 0xD0E1 0xb
#mdio write 1 1 0xD0E1 0x2b

#read register, XFI_RX_prbs_chk_config: PRBS checker control (DEVAD = 1, address = 0xD0D1)
#on RX, enable PRBS checker clock, select rx_dsc_lock and prbs_chk_en as PRBS checker, select PRBS 31
#on RX, enable PRBS checker
mdio read 1 1 0xD0D1
mdio write 1 1 0xD0D1 0x88a
mdio write 1 1 0xD0D1 0x88b

#Read PRBS error counter@PHY  0xD0DA --[30:16], 0xD0DB --[15:0], clear-on-read reg.
#XFI_RX_prbs_chk_err_cnt_msb_status, XFI_RX_prbs_chk_err_cnt_lsb_status
mdio read 1 1 0xD0DA
mdio read 1 1 0xD0DB


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
### SERDES and USXGMII configuration
# Reset GT
hal fpga write 0x4004 0x3

# Bypass UXGMII AN
#full duplex, speed: 10Gb/s, usxgmii rate: 10Gb/s, AN bypass on
#hal fpga write 0x50C8 0x16010301

# ENABLE AND RESET UXGMII AN
hal fpga write 0x30C8 0x16010320
hal fpga write 0x30C8 0x16010360
hal fpga write 0x30C8 0x16010320

# Check GT is locked (read 0x7)
hal fpga read 0x400C

# Check USXGMII RX Block Lock (read 0x1)
hal fpga read 0x340C

# Check USXGMII TX Status (read 0x0, first time 0x1)
hal fpga read 0x3400

# Check USXGMII RX Status (read 0x0)
hal fpga read 0x3404

### TX PRBS test
# Register 0x4018
# bit 30~28 TXOUTCLKSEL
# bit 24    TXPCSRESET
# bit 20    EYESCANRESET
# bit 18~16 LOOPBACK
# bit 12    RXPRBSCNTRESET
# bit 11~8  RXPRBSSEL
# bit 4     TXPRBSFORCEERR
# bit 3~0   TXPRBSSEL

#below configurations are for Using TX Pattern Generator, could be found at page 155 in UG578 ultrasacle gty transceivers

# Reset TXPCS
hal fpga write 0x4018 0x51000000
# Set attribute TXGEARBOX_EN to 1'b0 and TXBUF_EN to 1'b1 via DRP.
# read out 0x7c's value
hal fpga write 0x4010 0x807C0000
hal fpga read 0x4014

hal fpga write 0x4010 0xC07C00E8
hal fpga write 0x4010 0x807C0000
hal fpga read 0x4014

# Set port TXOUTCLKSEL to 3'b010 (TXOUTCLKPMA).
hal fpga write 0x4018 0x21000000

# Set port TXPRBSSEL to the desired pattern.
# Enable the PRBS-31 test @FPGA
# Set the TX & RX to PRBS-31
hal fpga write 0x4018 0x21000505

# RESET RX PRBS error counter
hal fpga write 0x4018 0x21001505
hal fpga write 0x4018 0x21000505

hal fpga read 0x4018

# Release the PCS from reset by deasserting TXPCSRESET and wait for TXRESETDONE to assert
hal fpga write 0x4018 0x20000505
# 0x7
hal fpga read 0x400c
***********************************************************************************************************************************

### Force TX PRBS error
## wait 2min
# FPGA TX force error,when bit 4 become high.
#hal fpga write 0x4018 0x20000515
#clear error
hal fpga write 0x4018 0x20000505

#read error
# RX PRBS CNT READ, 0x25e(15:0), 0x25f(31:16)
hal fpga write 0x4010 0x825e0000
hal fpga read 0x4014

hal fpga write 0x4010 0x825f0000
hal fpga read 0x4014


#Read PRBS error counter@PHY  0xD0DA --[30:16], 0xD0DB --[15:0], clear-on-read reg.
mdio write 1 0x1e 0x4110 0x2004
mdio write 1 0x1e 0x4111 0x2004
mdio write 1 0x1e 0x4113 0x2004
mdio read 1 1 0xD0DA
mdio read 1 1 0xD0DB




</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {A/F pwr meter}>
<data>
srv pwrmeas dlpwr get branch_a
srv pwrmeas dlpwr get branch_b
srv pwrmeas dlpwr get branch_c
srv pwrmeas dlpwr get branch_d
srv pwrmeas dlpwr get branch_e
srv pwrmeas dlpwr get branch_f
srv pwrmeas dlpwr get branch_g
srv pwrmeas dlpwr get branch_h
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {13} {read FPGA bad package}>
<data>
#write this register to gain access to following registers
hal fpga write 0x3020 0x1
#TX total
#hal fpga read 0x3700
#TX good
#hal fpga read 0x3708
#RX total
#hal fpga read 0x3808
#RX good
#hal fpga read 0x3810
#RX bad packages
hal fpga read 0x38c8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {read FPGA packages}>
<data>
#write this register to gain access to following registers
hal fpga write 0x3020 0x1
#TX total
#hal fpga read 0x3700
#TX good
#hal fpga read 0x3708
#RX total
#hal fpga read 0x3808
#RX good
#hal fpga read 0x3810
#RX bad packages
hal fpga read 0x38c8
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {POE monitor off}>
<data>
#make operational
eqpm rdPoe dbgOn all
eqpm rdPoe detect 1
rdc dump state


#make poe off
eqpm rdFault actions disable
eqpm rdFault report disable
eqpm rdFault reportII disable
eqpm rdPoe dbgOn all
switch set PoePower0 off 


#check 
eqpm rdFault dump
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {PHY PCS rx bad frame counter}>
<data>
#%p "10GBASE-T bad Frame Counter MSW"
mdio read 0x8 0x3 0xe815
#%p "10GBASE-Trx bad Frame Counter LSW"
mdio read 0x8 0x3 0xe814

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {24} {POE Current read}>
<data>
#0+1
tps info all poe:0 0
tps info all poe:0 1
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {PHY XFI tx bad frame counter}>
<data>
#%p "xfi0 bad Frame Counter MSW"
mdio read 0x8 0x3 0xc863
#%p "xfi0 bad Frame Counter LSW"
mdio read 0x8 0x3 0xc862
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

<tab {MCU }>
</tab>

<tab {FPGA_GPIO}>
<button {0} {LNA_01_ON_OFF}>
<data>
hal fpga write 0x102C 0x800000c0
%delay 1000
hal fpga write 0x102C 0x00000000
%delay 1000
hal fpga write 0x102C 0x800000c0
%delay 1000
hal fpga write 0x102C 0x00000000
%delay 1000

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {2} {PA_2_ON_OFF}>
<data>
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C1
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {3} {PA_7_ON_OFF}>
<data>
hal fpga write 0x1C2C 0x800000C2
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
hal fpga write 0x1C2C 0x800000C2
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
hal fpga write 0x1C2C 0x800000C2
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
hal fpga write 0x1C2C 0x800000C2
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {4} {PA_DRIVER_01_ON_OFF}>
<data>
hal fpga write 0x102C 0x8000000C
%delay 1000
hal fpga write 0x102C 0x80000000
%delay 1000
hal fpga write 0x102C 0x8000000C
%delay 1000
hal fpga write 0x102C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {5} {RX_EN_23_ON_OFF}>
<data>
hal fpga write 0x142C 0x80000300
%delay 1000
hal fpga write 0x142C 0x80000000
%delay 1000
hal fpga write 0x142C 0x80000300
%delay 1000
hal fpga write 0x142C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {6} {LNA_23_ON_OFF}>
<data>
hal fpga write 0x142C 0x800000c0
%delay 1000
hal fpga write 0x142C 0x00000000
%delay 1000
hal fpga write 0x142C 0x800000c0
%delay 1000
hal fpga write 0x142C 0x00000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {8} {PA_3_ON_OFF}>
<data>
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
hal fpga write 0x142C 0x800000C2
%delay 1000
hal fpga write 0x142C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {9} {MPA_01_ON_OFF}>
<data>
hal fpga write 0x102C 0x80003000
%delay 1000
hal fpga write 0x102C 0x80000000
%delay 1000
hal fpga write 0x102C 0x80003000
%delay 1000
hal fpga write 0x102C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {10} {PA_DRIVER_23_ON_OFF}>
<data>
hal fpga write 0x142C 0x8000000C
%delay 1000
hal fpga write 0x142C 0x80000000
%delay 1000
hal fpga write 0x142C 0x8000000C
%delay 1000
hal fpga write 0x142C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {11} {RX_EN_45_ON_OFF}>
<data>
hal fpga write 0x182C 0x80000300
%delay 1000
hal fpga write 0x182C 0x80000000
%delay 1000
hal fpga write 0x182C 0x80000300
%delay 1000
hal fpga write 0x182C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {12} {LNA_45_ON_OFF}>
<data>
hal fpga write 0x182C 0x800000c0
%delay 182C
hal fpga write 0x182C 0x00000000
%delay 182C
hal fpga write 0x182C 0x800000c0
%delay 182C
hal fpga write 0x182C 0x00000000
%delay 182C

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {14} {PA_4_ON_OFF}>
<data>
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C1
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {15} {MPA_23_ON_OFF}>
<data>
hal fpga write 0x142C 0x80003000
%delay 1000
hal fpga write 0x142C 0x80000000
%delay 1000
hal fpga write 0x142C 0x80003000
%delay 1000
hal fpga write 0x142C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {16} {PA_DRIVER_45_ON_OFF}>
<data>
hal fpga write 0x182C 0x8000000C
%delay 1000
hal fpga write 0x182C 0x80000000
%delay 1000
hal fpga write 0x182C 0x8000000C
%delay 1000
hal fpga write 0x182C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {17} {RX_EN_67_ON_OFF}>
<data>
hal fpga write 0x1c2C 0x80000300
%delay 1000
hal fpga write 0x1c2C 0x80000000
%delay 1000
hal fpga write 0x1c2C 0x80000300
%delay 1000
hal fpga write 0x1c2C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {18} {LNA_67_ON_OFF}>
<data>
hal fpga write 0x1C2C 0x800000c0
%delay 1000
hal fpga write 0x1C2C 0x00000000
%delay 1000
hal fpga write 0x1C2C 0x800000c0
%delay 1000
hal fpga write 0x1C2C 0x00000000
%delay 1000

</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {19} {PA_0_ON_OFF}>
<data>
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C1
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {20} {PA_5_ON_OFF}>
<data>
hal fpga write 0x182C 0x800000C2
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C2
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C2
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
hal fpga write 0x182C 0x800000C2
%delay 1000
hal fpga write 0x182C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {21} {MPA_45_ON_OFF}>
<data>
hal fpga write 0x182C 0x80003000
%delay 1000
hal fpga write 0x182C 0x80000000
%delay 1000
hal fpga write 0x182C 0x80003000
%delay 1000
hal fpga write 0x182C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {22} {PA_DRIVER_67_ON_OFF}>
<data>
hal fpga write 0x1c2C 0x8000000C
%delay 1000
hal fpga write 0x1c2C 0x80000000
%delay 1000
hal fpga write 0x1c2C 0x8000000C
%delay 1000
hal fpga write 0x1c2C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {25} {PA_1_ON_OFF}>
<data>
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
hal fpga write 0x102C 0x800000C2
%delay 1000
hal fpga write 0x102C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {26} {PA_6_ON_OFF}>
<data>
hal fpga write 0x1C2C 0x800000C1
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
hal fpga write 0x1C2C 0x800000C1
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
hal fpga write 0x1C2C 0x800000C1
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
hal fpga write 0x1C2C 0x800000C1
%delay 1000
hal fpga write 0x1C2C 0x800000C0
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {27} {MPA_67_ON_OFF}>
<data>
hal fpga write 0x1c2C 0x80003000
%delay 1000
hal fpga write 0x1c2C 0x80000000
%delay 1000
hal fpga write 0x1c2C 0x80003000
%delay 1000
hal fpga write 0x1c2C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
<button {28} {RX_EN_01_ON_OFF}>
<data>
hal fpga write 0x102C 0x80000300
%delay 1000
hal fpga write 0x102C 0x80000000
%delay 1000
hal fpga write 0x102C 0x80000300
%delay 1000
hal fpga write 0x102C 0x80000000
%delay 1000
</data>
<icon>

</icon>
<desc>

</desc>
</button>
</tab>

