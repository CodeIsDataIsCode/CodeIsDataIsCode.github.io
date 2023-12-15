"use strict";
//命理八字頁面的啟動初始化
function ML_BaZiPageInit() {
    ML_ThisYearSelInit(1979);
    ML_ThisYearText.value = 1979;
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
/**********************
命理八字页面的八字计算和显示
**********************/
//将选择的日期，重新载入
function ML_BaZiPageRenew() {
    ML_BaZiPageShow(1);
}
function ML_BaZiPageShow(daYunNum = 1) {
    let thisLong = Number(ML_LongSelText.value);
    let thisLat = Number(ML_LatSelText.value);
    let thisTimeZone = Number(ML_TimeZoneText.value);
    let pregnantWeeks = timeStr2hour(ML_PregnantWeeksText.value); //怀孕多少周之后生产的
    let meGanNo = Number(ML_ThisMeGanSel.value); //换太极点的
    //八字计算
    baZiInfo.setBaZiZhuInfo(ML_ThisPanDataTime.value, ML_ThisLiuDataTime.value, daYunNum, thisLong, thisTimeZone, pregnantWeeks, meGanNo);
    //显示八字的结构信息
    ML_BaZiStructInfo();
    //顯示本命盤
    ML_BaZiMingPanZhuShow();
    //顯示大運表
    ML_DaYunTBShow();
    ML_LiuYearTBShow(baZiInfo.DaYunSelectNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo);
    //本命盤中的大運、流年信息的显示
    ML_daYunLiuYearZhuShow(baZiInfo.DaYunSelectNo);
    //顯示大運表，流年表，流月表中選擇項的信息
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, baZiInfo.liuMontheSelectNo);
    //ML_temp_JieQiJD(baZiInfo.thisYear,baZiInfo.monthZhuInfo.ZhiNo);
    //顯示大運流年表
    //ML_LiuYearTBShow(1);
    //調用干選擇變化函數
    if (ML_ThisMeGanSel.value == -1) {
        ML_ThisMeGanSel.value = baZiInfo.getDayZhu().GanNo;
        ML_ThisMeGanSelChange();
    }
}
// 显示八字的结构相关信息，在计算八字之后执行
function ML_BaZiStructInfo() {
    let yangGanNum = baZiInfo.yangGanNum;
    let seasonName = baZiInfo.seasonName;
    if (baZiInfo.cangGanNum == 1) {
    }
    else if (baZiInfo.cangGanNum == 2) {
    }
    else if (baZiInfo.cangGanNum == 3) {
    }
    ML_BaZiPanInfoOut.innerHTML = '八字结构：' + yangGanNum + '阳/' + (4 - yangGanNum) + '阴/' + seasonName + '/'
        + baZiInfo.MonthQiShow;
}
// 显示本盘中的大运流年柱的信息
function ML_BaZiMingPanZhuShow() {
    let genderTemp = ML_GenderChk.checked ? '男' : '女';
    let isNHemisphere = ML_HemisphereChk.checked;
    let meGanNo = Number(ML_ThisMeGanSel.value); //换太极点的
    let strTemp0 = '';
    let strTemp1 = '';
    let thisTime = timeStr2hour(ML_TimeInText.value) - 0;
    let pregnantWeeks = timeStr2hour(ML_PregnantWeeksText.value); //怀孕多少周之后生产的
    let thisYear = Number(ML_ThisYearText.value); //year2Ayear(ML_ThisYearText.value)
    if (ML_ADFlagChk.checked == true) {
        thisYear = 0 - thisYear;
    }
    let thisMonth = Number(ML_ThisMonthSel.value);
    let thisDay = Number(ML_ThisDaySel.value);
    let thisLong = Number(ML_LongSelText.value);
    let thisLat = Number(ML_LatSelText.value);
    let thisTimeZone = Number(ML_TimeZoneText.value);
    let jd = JD.JD(thisYear, thisMonth, thisDay + thisTime / 24.0);
    let tdElement01 = new Object();
    let tdElement02 = new Object();
    let tdElement03 = new Object();
    let tdElement04 = new Object();
    let tdElement05 = new Object();
    let tdElement06 = new Object();
    let tdElement07 = new Object();
    let tdElement08 = new Object();
    let tdElement09 = new Object();
    let tdElement10 = new Object();
    let tdElement11 = new Object();
    let tdElement12 = new Object();
    let tdElement13 = new Object();
    //設置本命盤信息
    baZiInfo.setBaZiMingPanInfo(ML_ThisPanDataTime.value, thisLong, thisTimeZone, pregnantWeeks, meGanNo);
    strTemp0 = '<font color=#FF0000  >[调试信息]：</font>' + '/经度:' + baZiInfo.getLongitude()
        + '/时区:' + baZiInfo.getTimeZone() + '/未转换JD数:' + jd + '/平太阳JD:' + baZiInfo.getBirthdayJD() + '/时数:' + thisTime + '<br>';
    strTemp0 = strTemp0
        + '/真太阳JD:' + baZiInfo.getBirthdayTST_JD() + '/真太阳时：' + baZiInfo.getTrueSolarTime().toString() + '/农历年:'
        + gLCalendarBase.Lyear + '年' + gLCalendarBase.Lleap + gLCalendarBase.Lmc + '月' + gLCalendarBase.Ldn + gLCalendarBase.Ldc + '日' + '<br>';
    ML_DebugInfoOut.innerHTML = strTemp0;
    ML_BaZiDateInfoOut.innerHTML = '<font color=#FF0000><b>[日标]：</b></font>' + '公历:' + thisYear + '/' + thisMonth + '/' + thisDay + '  '
        + baZiInfo.getTrueSolarTime() + '(真太阳时)' + '/儒略日数:' + int2(jd + 0.5) + '/距2000年首:' + int2(jd + 0.5 - J2000) + '日';
    //3:身柱，4：命柱，5：胎柱，6：年柱，7：北半球月柱（南半球月柱），8：日柱，9：時柱，10：大運柱
    //哪些命盘中的柱被开启
    for (let i = 3; i <= 9; i++) {
        //出生日期
        tdElement03 = document.getElementById('ML_BZTB_03_' + String(i).padStart(2, "0"));
        if (i == 6) {
            tdElement03.innerHTML = baZiInfo.yearZhuInfo.Name; //thisYear + '年';
        }
        else if (i == 7) {
            tdElement03.innerHTML = baZiInfo.monthZhuInfo.Name; //thisMonth+ '月';
        }
        else if (i == 8) {
            tdElement03.innerHTML = baZiInfo.dayZhuInfo.Name; //thisDay+ '日';
        }
        else if (i == 9) {
            tdElement03.innerHTML = baZiInfo.timeZhuInfo.Name; //thisTime.toFixed(2);
        }
        //纳音
        tdElement04 = document.getElementById('ML_BZTB_04_' + String(i).padStart(2, "0"));
        //tdElement04.style =  'font-size:10px;font-style: italic;';
        tdElement04.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).NaYin;
        //柱号
        tdElement05 = document.getElementById('ML_BZTB_05_' + String(i).padStart(2, "0"));
        tdElement05.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).No;
        if (i == 8)
            tdElement05.innerHTML = tdElement05.innerHTML + genderTemp;
        //柱天干	+	干神
        tdElement06 = document.getElementById('ML_BZTB_06_' + String(i).padStart(2, "0"));
        tdElement06.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).GanShen + '</font>';
        //柱地支	+	地支十神
        tdElement07 = document.getElementById('ML_BZTB_07_' + String(i).padStart(2, "0"));
        tdElement07.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhiShen + '</font>';
        //柱地支藏干
        tdElement08 = document.getElementById('ML_BZTB_08_' + String(i).padStart(2, "0"));
        tdElement08.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanName + '</font>';
        //柱地支藏干-十神
        tdElement09 = document.getElementById('ML_BZTB_09_' + String(i).padStart(2, "0"));
        tdElement09.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanShen + '</font>';
        //柱的地运-火土共长生
        tdElement10 = document.getElementById('ML_BZTB_10_' + String(i).padStart(2, "0"));
        tdElement10.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).HuoTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuHuoTuDiYun + '</font>';
        //柱的地运-火土共长生
        tdElement11 = document.getElementById('ML_BZTB_11_' + String(i).padStart(2, "0"));
        tdElement11.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ShuiTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuShuiTuDiYun + '</font>';
        //柱的空亡
        tdElement12 = document.getElementById('ML_BZTB_12_' + String(i).padStart(2, "0"));
        tdElement12.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).XunKong;
    }
}
// 显示本盘中的大运流年柱的信息
function ML_daYunLiuYearZhuShow(daYunNum = 1) {
    let isNHemisphere = ML_HemisphereChk.checked;
    let meGanNo = Number(ML_ThisMeGanSel.value); //换太极点的
    baZiInfo.setYunZhuInfo(daYunNum);
    let tdElement01 = new Object();
    let tdElement02 = new Object();
    let tdElement03 = new Object();
    let tdElement04 = new Object();
    let tdElement05 = new Object();
    let tdElement06 = new Object();
    let tdElement07 = new Object();
    let tdElement08 = new Object();
    let tdElement09 = new Object();
    let tdElement10 = new Object();
    let tdElement11 = new Object();
    let tdElement12 = new Object();
    let tdElement13 = new Object();
    //哪些命盘中的柱被开启
    for (let i = 10; i <= 14; i++) {
        //出生日期
        tdElement03 = document.getElementById('ML_BZTB_03_' + String(i).padStart(2, "0"));
        if (i == 10) {
            tdElement03.innerHTML = baZiInfo.yunZhuInfo.Name;
        }
        else if (i == 11) {
            tdElement03.innerHTML = baZiInfo.liuYearZhuInfo.Name;
        }
        else if (i == 12) {
            tdElement03.innerHTML = baZiInfo.liuMonthZhuInfo.Name;
        }
        else if (i == 13) {
            tdElement03.innerHTML = baZiInfo.liuDayZhuInfo.Name;
        }
        else if (i == 14) {
            tdElement03.innerHTML = baZiInfo.liuTimeZhuInfo.Name;
        }
        //纳音
        tdElement04 = document.getElementById('ML_BZTB_04_' + String(i).padStart(2, "0"));
        //tdElement04.style =  'font-size:10px;font-style: italic;';
        tdElement04.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).NaYin;
        //柱号
        tdElement05 = document.getElementById('ML_BZTB_05_' + String(i).padStart(2, "0"));
        tdElement05.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).No;
        if (i == 8)
            tdElement05.innerHTML = tdElement05.innerHTML + genderTemp;
        //柱天干	+	干神
        tdElement06 = document.getElementById('ML_BZTB_06_' + String(i).padStart(2, "0"));
        tdElement06.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).GanShen + '</font>';
        //柱地支	+	地支十神
        tdElement07 = document.getElementById('ML_BZTB_07_' + String(i).padStart(2, "0"));
        tdElement07.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhiShen + '</font>';
        //柱地支藏干
        tdElement08 = document.getElementById('ML_BZTB_08_' + String(i).padStart(2, "0"));
        tdElement08.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanName + '</font>';
        //柱地支藏干-十神
        tdElement09 = document.getElementById('ML_BZTB_09_' + String(i).padStart(2, "0"));
        tdElement09.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanShen + '</font>';
        //柱的地运-火土共长生
        tdElement10 = document.getElementById('ML_BZTB_10_' + String(i).padStart(2, "0"));
        tdElement10.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).HuoTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuHuoTuDiYun + '</font>';
        //柱的地运-火土共长生
        tdElement11 = document.getElementById('ML_BZTB_11_' + String(i).padStart(2, "0"));
        tdElement11.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ShuiTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuShuiTuDiYun + '</font>';
        //柱的空亡
        tdElement12 = document.getElementById('ML_BZTB_12_' + String(i).padStart(2, "0"));
        tdElement12.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).XunKong;
    }
}
//大運表的顯示;
function ML_DaYunTBShow() {
    let tdElement = new Array();
    for (let i = 0; i < 14; i++) {
        //大運-柱名稱
        tdElement[0] = document.getElementById('ML_BZYun_03_' + String(i).padStart(2, "0"));
        tdElement[0].innerHTML = baZiInfo.daYunInfo[i].Name;
        //console.log('ML_DaYunTBShow():' + baZiInfo.daYunInfo[i].Name);
        //大運-天干
        tdElement[1] = document.getElementById('ML_BZYun_04_' + String(i).padStart(2, "0"));
        tdElement[1].innerHTML = baZiInfo.daYunInfo[i].Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].GanShen + '</font>';
        //大運-地支
        tdElement[2] = document.getElementById('ML_BZYun_05_' + String(i).padStart(2, "0"));
        tdElement[2].innerHTML = baZiInfo.daYunInfo[i].Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].ZhiShen + '</font>';
        //大運-火土地運
        tdElement[3] = document.getElementById('ML_BZYun_06_' + String(i).padStart(2, "0"));
        tdElement[3].innerHTML = baZiInfo.daYunInfo[i].HuoTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].ZhuHuoTuDiYun;
        //大運-水土地運
        tdElement[4] = document.getElementById('ML_BZYun_07_' + String(i).padStart(2, "0"));
        tdElement[4].innerHTML = baZiInfo.daYunInfo[i].ShuiTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].ZhuShuiTuDiYun;
        //大運-周歲信息
        tdElement[5] = document.getElementById('ML_BZYun_08_' + String(i).padStart(2, "0"));
        tdElement[5].innerHTML = baZiInfo.daYunInfo[i].daYunSuiNumStr;
        //大運-年信息
        tdElement[6] = document.getElementById('ML_BZYun_09_' + String(i).padStart(2, "0"));
        tdElement[6].innerHTML = String(baZiInfo.daYunInfo[i].daYunYearNumStr).slice(2, 8); //baZiInfo.daYunInfo[i].daYunYearNumStr;
    }
}
//大運流年表的顯示;
function ML_LiuYearTBShow(daYunZhuSelectNo) {
    let tdElement = new Array();
    baZiInfo.DaYunSelectNo = daYunZhuSelectNo;
    baZiInfo.setLiuYearZhuInfo(daYunZhuSelectNo, baZiInfo.MeGanNo);
    baZiInfo.setLiuMonthZhuInfo(daYunZhuSelectNo, baZiInfo.DaYunSelectNo, baZiInfo.MeGanNo);
    console.log('ML_LiuYearTBShow()在運行！大运表选择第：' + baZiInfo.DaYunSelectNo + '柱');
    for (let i = 0; i < 14; i++) {
        //大運流年-柱名稱
        tdElement[0] = document.getElementById('ML_BZYear_03_' + String(i).padStart(2, "0"));
        tdElement[0].innerHTML = baZiInfo.liuYearInfo[i].Name;
        //console.log('ML_DaYunTBShow():' + baZiInfo.daYunInfo[i].Name);
        //大運流年-天干
        tdElement[1] = document.getElementById('ML_BZYear_04_' + String(i).padStart(2, "0"));
        tdElement[1].innerHTML = baZiInfo.liuYearInfo[i].Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].GanShen + '</font>';
        //大運流年-地支
        tdElement[2] = document.getElementById('ML_BZYear_05_' + String(i).padStart(2, "0"));
        tdElement[2].innerHTML = baZiInfo.liuYearInfo[i].Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].ZhiShen + '</font>';
        //大運流年-火土地運
        tdElement[3] = document.getElementById('ML_BZYear_06_' + String(i).padStart(2, "0"));
        tdElement[3].innerHTML = baZiInfo.liuYearInfo[i].HuoTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].ZhuHuoTuDiYun;
        //大運流年-水土地運
        tdElement[4] = document.getElementById('ML_BZYear_07_' + String(i).padStart(2, "0"));
        tdElement[4].innerHTML = baZiInfo.liuYearInfo[i].ShuiTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].ZhuShuiTuDiYun;
        //大運流年-周歲信息
        tdElement[5] = document.getElementById('ML_BZYear_08_' + String(i).padStart(2, "0"));
        tdElement[5].innerHTML = baZiInfo.liuYearInfo[i].daYunSuiNumStr;
        //大運流年-年信息
        tdElement[6] = document.getElementById('ML_BZYear_09_' + String(i).padStart(2, "0"));
        tdElement[6].innerHTML = baZiInfo.liuYearInfo[i].daYunYearNumStr;
    }
}
//大運流月表的顯示;
function ML_LiuMonthTBShow(daYunZhuSelectNo, liuYearSelectNo) {
    console.log('ML_LiuMonthTBShow()在運行！大运表柱選擇第：' + daYunZhuSelectNo + '柱/流年表柱選擇：' + liuYearSelectNo);
    let tdElement = new Array();
    baZiInfo.DaYunSelectNo = daYunZhuSelectNo;
    baZiInfo.liuYearSelectNo = liuYearSelectNo;
    //初始化，流年的流月柱
    baZiInfo.setLiuMonthZhuInfo(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, baZiInfo.MeGanNo);
    for (let i = 0; i < 14; i++) {
        //大運流年之流月-柱名稱
        tdElement[0] = document.getElementById('ML_BZMonth_03_' + String(i).padStart(2, "0"));
        tdElement[0].innerHTML = baZiInfo.liuMonthInfo[i].Name;
        //console.log('ML_DaYunTBShow():' + baZiInfo.daYunInfo[i].Name);
        //大運流年之流月-天干
        tdElement[1] = document.getElementById('ML_BZMonth_04_' + String(i).padStart(2, "0"));
        tdElement[1].innerHTML = baZiInfo.liuMonthInfo[i].Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].GanShen + '</font>';
        //大運流年之流月-地支
        tdElement[2] = document.getElementById('ML_BZMonth_05_' + String(i).padStart(2, "0"));
        tdElement[2].innerHTML = baZiInfo.liuMonthInfo[i].Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].ZhiShen + '</font>';
        //大運流年之流月-火土地運
        tdElement[3] = document.getElementById('ML_BZMonth_06_' + String(i).padStart(2, "0"));
        tdElement[3].innerHTML = baZiInfo.liuMonthInfo[i].HuoTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].ZhuHuoTuDiYun;
        //大運流年之流月-水土地運
        tdElement[4] = document.getElementById('ML_BZMonth_07_' + String(i).padStart(2, "0"));
        tdElement[4].innerHTML = baZiInfo.liuMonthInfo[i].ShuiTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].ZhuShuiTuDiYun;
        //大運流年之流月-月的日期信息
        tdElement[5] = document.getElementById('ML_BZMonth_08_' + String(i).padStart(2, "0"));
        tdElement[5].innerHTML = baZiInfo.liuMonthInfo[i].daYunSuiNumStr;
        //大運流年之流月-年信息
        //tdElement[6]	=	document.getElementById('ML_BZMonth_09_' + String(i).padStart(2, "0"));
        //tdElement[6].innerHTML	=	baZiInfo.liuMonthInfo[i].daYunYearNumStr;
    }
}
//本盤、流年盤的時期控制開關變化時候
function ML_DaYunChang(changNum) {
    baZiInfo.DaYunSelectNo = baZiInfo.DaYunSelectNo + changNum;
    baZiInfo.liuYearSelectNo = 1;
    baZiInfo.liuMontheSelectNo = 1;
    if (baZiInfo.DaYunSelectNo < 0) {
        baZiInfo.DaYunSelectNo = 13;
    }
    else if (baZiInfo.DaYunSelectNo > 13) {
        baZiInfo.DaYunSelectNo = 0;
    }
    console.log('ML_DaYunChang()大運號：' + baZiInfo.DaYunSelectNo);
    //ML_BaZiPageShow(baZiInfo.DaYunSelectNo);
    //ML_LiuYearTBShow(baZiInfo.DaYunSelectNo);
    //ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo,baZiInfo.liuYearSelectNo);
    ML_daYunLiuYearZhuShow(baZiInfo.DaYunSelectNo);
    ML_LiuYearTBShow(baZiInfo.DaYunSelectNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, baZiInfo.liuMontheSelectNo);
}
//本盤、流年盤的時期控制開關變化時候
function ML_daYunTBZhuSel(thisYunZhuNo) {
    console.log('ML_daYunTBZhuSel()在運行：被選擇的大運柱為：' + thisYunZhuNo);
    //tdElement01	=	document.getElementById('ML_BZTB_03_' + String(i).padStart(2, "0"));
    //ML_BaZiPageShow(thisYunZhuNo);
    ML_daYunLiuYearZhuShow(thisYunZhuNo);
    ML_LiuYearTBShow(thisYunZhuNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo);
    ML_YunLiuYearMonthZhuSelNameShow(thisYunZhuNo, 1, 1);
}
//本盤、流年盤的時期控制開關變化時候
function ML_liuYearTBZhuSel(thisLiuYearZhuNo) {
    let tdElement02 = document.getElementById('ML_BZMonth_LiuYearSel');
    let tdElement03 = document.getElementById('ML_BZMonth_LiuMonthSel');
    baZiInfo.liuYearSelectNo = thisLiuYearZhuNo;
    console.log('ML_liuYearTBZhuSel()在運行：選擇的大運柱號：' + baZiInfo.DaYunSelectNo + ' / 被選擇的流年柱為：' + thisLiuYearZhuNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, thisLiuYearZhuNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, thisLiuYearZhuNo);
}
//本盤、流月盤的時期控制開關變化時候
function ML_liuMonthTBZhuSel(thisLiuMonthZhuNo) {
    let tdElement03 = document.getElementById('ML_BZMonth_LiuMonthSel');
    baZiInfo.liuMontheSelectNo = thisLiuMonthZhuNo;
    console.log('ML_liuMonthTBZhuSel()在運行：被選擇的流月柱為：' + thisLiuMonthZhuNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, thisLiuMonthZhuNo);
}
//本盤、流年盤的時期控制開關變化時候
function ML_YunLiuYearMonthZhuSelNameShow(thisYunZhuNo, thisLiuYearZhuNo = 1, thisLiuMonthZhuNo = 1) {
    baZiInfo.DaYunSelectNo = thisYunZhuNo;
    baZiInfo.liuYearSelectNo = thisLiuYearZhuNo;
    baZiInfo.liuMontheSelectNo = thisLiuMonthZhuNo;
    let tdElement01 = document.getElementById('ML_BZMonth_DaYunSel');
    let tdElement02 = document.getElementById('ML_BZMonth_LiuYearSel');
    let tdElement03 = document.getElementById('ML_BZMonth_LiuMonthSel');
    tdElement01.innerHTML = baZiInfo.daYunInfo[baZiInfo.DaYunSelectNo].daYunYearNumStr;
    tdElement02.innerHTML = baZiInfo.liuYearInfo[baZiInfo.liuYearSelectNo].daYunYearNumStr;
    tdElement03.innerHTML = baZiInfo.liuMontheSelectNo;
}
//在时间、地标初始化完成后就可执行
//ML_BaZiPageShow();
function ML_BaZiPageSetTime() {
    ML_Set_DateCtl_Value(1); //set_date_screen(1);
    ML_BaZiPageShow(1);
}
//202302031200形式的日期數據輸入後的分解
function ML_ThisPanDataTimeChange() {
    let iTimeDateTemp = JD.dataTimeStrSeparate(ML_ThisPanDataTime.value);
    let sTimeDateTemp = ML_ThisPanDataTime.value;
    let sTimeDateTemp1 = sTimeDateTemp;
    let iADTemp = iTimeDateTemp[0]; //	公元前後的標誌
    let yearTemp = iTimeDateTemp[1]; //	年的標誌
    let monthTemp = iTimeDateTemp[2]; //	月的標誌
    let dayTemp = iTimeDateTemp[3]; //	日期的標誌
    let hourTemp = iTimeDateTemp[4]; //	小時的標誌
    let minuteTemp = iTimeDateTemp[5]; //	分鐘的標誌
    let genderTemp = iTimeDateTemp[7]; //男女选择的标志
    let hemisphereTemp = iTimeDateTemp[8]; //半球选择的标志
    do {
        ML_ThisPanDataTime.value = sTimeDateTemp1;
        sTimeDateTemp = sTimeDateTemp1;
        iTimeDateTemp = JD.dataTimeStrSeparate(sTimeDateTemp);
        iADTemp = iTimeDateTemp[0];
        yearTemp = iTimeDateTemp[1];
        monthTemp = iTimeDateTemp[2];
        dayTemp = iTimeDateTemp[3];
        hourTemp = iTimeDateTemp[4];
        minuteTemp = iTimeDateTemp[5];
        genderTemp = iTimeDateTemp[7];
        hemisphereTemp = iTimeDateTemp[8];
        sTimeDateTemp1 = window.prompt('您輸入的是：' + iADTemp * yearTemp + '年' + monthTemp + '月' + dayTemp + '日' + hourTemp + '時'
            + minuteTemp + '分，' + String((genderTemp == 0) ? '男性' : '女性') + ' / ' + String((hemisphereTemp == 0) ? '北' : '南') + '半球，是否確定此輸入？', sTimeDateTemp);
        if ((sTimeDateTemp1 == null) || (sTimeDateTemp1 == "")) {
            sTimeDateTemp1 = sTimeDateTemp;
            ML_ThisDataPanTime.value = sTimeDateTemp1;
        }
    } while ((sTimeDateTemp1 != sTimeDateTemp)); // && (sTimeDateTemp1 != null ) && (sTimeDateTemp1 != "")
    //console.log('ML_ThisPanDataTimeChange():' + '您輸入的是：' + sADTemp + yearTemp +'年' + monthTemp + '月' + dayTemp + '日' + hourTemp + '時'	+ minuteTemp + '分/' + sTimeDateTemp1);
    ML_ThisYearText.value = yearTemp;
    ML_ThisYearSelInit(yearTemp); //先帮年选择控件初始化
    ML_ThisYearSel.value = yearTemp;
    ML_ThisMonthSel.value = monthTemp;
    ML_ThisDaySel.value = dayTemp;
    ML_TimeInText.value = hourTemp + ":" + minuteTemp;
    //公元前后设置
    if (iADTemp == -1) {
        ML_ADFlagChk.checked = true;
    }
    else
        ML_ADFlagChk.checked = false;
    //男女性别设置
    if (genderTemp == 0) {
        ML_GenderChk.checked = true;
    }
    else
        ML_GenderChk.checked = false;
    //南北半球设置
    if (hemisphereTemp == 0) {
        ML_HemisphereChk.checked = true;
    }
    else
        ML_HemisphereChk.checked = false;
    ML_BaZiPageShow(1);
}
//
function ML_ThisLiuDataTimeChange() {
    ML_BaZiPageShow(1);
}
//202302031200形式的日期數據日期轉化為輸入類控件text文本数值
function ML_DataTimeString2Ctl_Value() {
}
//日期輸入類控件text文本轉化為202302031200形式的日期數據
function ML_DataTimeCtl2String() {
    let sTimeDateTemp = '';
    //let sTimeDateTemp:string	=	ML_ThisPanDataTime.value;
    //let sTimeDateTemp1:string	=	sTimeDateTemp;
    //let vLengthTemp:number	=	sTimeDateTemp.length;
    //let sFirstCharTemp:string	=	sTimeDateTemp.slice(0, 1);
    let sADTemp = ''; //	公元前後的標誌
    let iADTemp = 1; //	公元前後的標誌
    let yearTemp = Number(ML_ThisYearText.value); //	年的標誌
    let monthTemp = Number(ML_ThisMonthSel.value); //	月的標誌
    let dayTemp = Number(ML_ThisDaySel.value); //	日期的標誌
    let sTimeArrTemp = ML_TimeInText.value.split(":");
    let hourTemp = Number(sTimeArrTemp[0]); //	小時的標誌
    let minuteTemp = Number(sTimeArrTemp[1]); //	分鐘的標誌 padStart
    let genderTemp = Number(ML_GenderChk.checked ? 0 : 1); //男女性別的標誌
    let hemisphereTemp = Number(ML_HemisphereChk.checked ? 0 : 1); //南北半球的標誌
    if (ML_ADFlagChk.checked) {
        sADTemp = '-';
        iADTemp = -1;
        //yearTemp = yearTemp + 1;
    }
    else {
        sADTemp = '+';
        iADTemp = 1;
    }
    sTimeDateTemp = sADTemp + String(yearTemp).padStart(4, '0') + String(monthTemp).padStart(2, '0')
        + String(dayTemp).padStart(2, '0') + String(hourTemp).padStart(2, '0') + String(minuteTemp).padStart(2, '0')
        + '.' + genderTemp + hemisphereTemp;
    if (ML_Pan_Liu_Chk.checked == true && ML_PanDataTimeLock_Chk.checked == false) {
        ML_ThisPanDataTime.value = sTimeDateTemp;
    }
    else if (ML_Pan_Liu_Chk.checked == false) {
        ML_ThisLiuDataTime.value = sTimeDateTemp;
    }
    //console.log('ML_DataTimeCtl2String():' + sADTemp + yearTemp + '/' + monthTemp + '/' +  dayTemp + '/' + hourTemp + '/' + minuteTemp);
    return sTimeDateTemp;
}
//公元選擇按鈕變化時
function ML_ADFlagChkChange() {
    ML_DataTimeCtl2String();
}
//年輸入text控件文本變化時
function ML_ThisYearTextChange() {
    let thisYearTemp = parseInt(year2Ayear(ML_ThisYearText.value));
    ML_ThisYearSelInit(thisYearTemp);
    console.log("ML_ThisYearIsOK()输入的年：" + thisYearTemp + "/年选择按钮：" + ML_ThisYearSel.value);
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//年輸入selcet控件选项变化時
function ML_ThisYearSelChange() {
    let yearNum = ML_ThisYearSel.value - 0;
    ML_ThisYearText.value = Ayear2year(yearNum);
    //console.log('ML_ThisYearSelChange()年:'+yearNum);
    ML_YearChange(yearNum);
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//命理八字頁面的生成年选择按钮控件的相关项
function ML_ThisYearSelInit(thisYear) {
    let selectAllNum = 61; //可以增加多少条目
    let selCtrlTemp = document.getElementById("ML_ThisYearSel");
    let selCtrlLength = selCtrlTemp.length;
    let loopNum = 0;
    let thisSelNum = 0;
    //先删除已有条目，必须从最大的删除
    for (var i = 0; i <= selCtrlLength; i++) {
        selCtrlTemp.remove(selCtrlLength - i);
    }
    for (let i = 0; i <= selectAllNum; i++) {
        let optionTemp = document.createElement("option");
        loopNum = thisYear + i - parseInt(selectAllNum / 2 - 0);
        if (loopNum <= 0) {
            optionTemp.text = '前' + (Math.abs(loopNum) + 1).toString() + yinYangSysTemp.getYear2GanZhiName(loopNum - 1) + '年';
        }
        else {
            optionTemp.text = loopNum.toString() + yinYangSysTemp.getYear2GanZhiName(loopNum) + '年';
        }
        optionTemp.value = loopNum; //未修改前：loopNum.toString()
        selCtrlTemp.add(optionTemp);
    }
    for (let i = 0; i <= selCtrlTemp.length; i++) {
        selCtrlTemp.selectedIndex = i.toString(); //设置当前选项
        if (thisYear == selCtrlTemp.value) {
            //console.log('ML_ThisYearSelInit():'+thisYear +'/'+i +'/'+ selCtrlTemp.value + '/' + selCtrlTemp.length);
            return;
        }
    }
}
//年份变化时候，执行的函数
function ML_YearChange(yearNum) {
    //var thisYear = year2Ayear(ThisYearText.value);
    let yearTemp = yearNum;
    let monthTemp = ML_ThisMonthSel.value - 0;
    //console.log('yearChange()年:'+ yearNum+'/' + monthTemp+ '||'+yearTemp);
    if ((yearTemp <= -10000)) {
        alert('yearChange()年数值小于公元前10000年，无法显示日历！');
        return;
    }
    else if ((yearTemp >= 10000)) {
        alert('yearChange()年数值大于公元10000年，无法显示日历！');
        return;
    }
    else {
        ML_ThisYearSelInit(yearTemp);
        if (yearTemp < 0) {
            ML_ADFlagChk.checked = true;
        }
        else
            ML_ADFlagChk.checked = false;
        ML_ThisYearText.value = Ayear2year(yearTemp);
    }
    //thisYearIsOK();	//年的改变最后都要调用这个函数
    //console.log('ML_YearChange()年:'+ yearNum +'/' + monthTemp + '||'+ML_ThisMonthSel.value);
    //getLunarMonthPG(yearNum,monthTemp);
}
//月輸入text控件文本變化時
function ML_ThisMonthTextChange() {
    ML_DataTimeCtl2String();
}
//月輸入selcet控件选项变化時
function ML_ThisMonthSelChange() {
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//日輸入selcet控件选项变化時
function ML_ThisDaySelChange() {
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//日輸入text控件文本變化時
function ML_ThisDayTextChange() {
    ML_DataTimeCtl2String();
}
//時間輸入text控件文本變化時
function ML_TimeInTextChange() {
    ML_DataTimeCtl2String();
    let thisHour = parseInt(timeStr2hour(ML_TimeInText.value)) % 24;
    let remainder = parseInt((thisHour % 2) ? 1 : 0);
    console.log("ML_TimeInTextChange()余数为：" + remainder + "/" + thisHour + "/" + parseInt((thisHour + remainder) % 23));
    if (parseInt((thisHour + remainder)) == 24) {
        ML_LunarTime.value = 0;
    }
    else {
        ML_LunarTime.value = parseInt((thisHour + remainder) % 23);
    }
}
//农历时间选择控件改变时
function ML_LunarTimeSelChange() {
    ML_TimeInText.value = String(ML_LunarTime.value).padStart(2, '0') + ":01";
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//從現在的時間設置八字頁面的控件數值
function ML_Set_DateCtl_Value(fw) {
    let nowTime = new Date();
    let curTimeZone = -nowTime.getTimezoneOffset() / 60.0; //时区：+8为北京时；返回 UTC 时间与本地时间之间的时差，以分钟为单位。
    console.log("ML_Set_DateCtl_Value()本地时间：" + Date().toString() + '/时区为：' + curTimeZone);
    let curRegionJD_2K = nowTime / 86400000 - 10957.5 - curTimeZone / 24; //J2000起算的儒略日数(当前本地时间)
    //let curTimeZone:number	= Number(ML_TimeZoneText.value);
    let curLong = Number(ML_LongSelText.value);
    let curLat = Number(ML_LatSelText.value);
    let curDST = ML_DSTChk.checked; //夏令时标志
    JD.setJD2YMD(curRegionJD_2K + J2000);
    if (!fw || fw == 1) {
        //MLTimeInText.value = JD.h+':'+JD.m+':'+JD.s.toFixed(0);
        //MLTimeInText.value = nowTime.getHours()+':'+nowTime.getMinutes()+':'+nowTime.getSeconds();
        //mlTimeInText();
    }
    /*
    if(!fw||fw==2){

        //Cal_m.value = JD.Month;
        //ThisMonthSel.value  = JD.Month;
        ML_ThisYearText.value		=	nowTime.getFullYear();
        ML_ThisMonthSel.value	=	nowTime.getMonth()+1;
        ML_ThisDaySel.value		=	nowTime.getDate();
        thisYearSelInit(year2Ayear(ThisYearText.value));}
    */
    ML_ThisYearText.value = nowTime.getFullYear();
    ML_ThisYearSelInit(nowTime.getFullYear());
    ML_ThisYearSel.value = nowTime.getFullYear();
    ML_ThisMonthSel.value = nowTime.getMonth() + 1;
    ML_ThisDaySel.value = nowTime.getDate();
    ML_TimeZoneText.value = curTimeZone;
    ML_DataTimeCtl2String();
    curTimeZone = Number(ML_TimeZoneText.value);
    curLong = Number(ML_LongSelText.value);
    curLat = Number(ML_LatSelText.value);
    //thisYearSelInit(year2Ayear(ThisYearText.value));
    curRegionJD_2K = int2(curRegionJD_2K + 0.5);
}
//性別選擇變化時
function ML_GenderChkChange() {
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//南北半球選擇變化時
function ML_HemisphereChkChange() {
    ML_DataTimeCtl2String();
    ML_BaZiPageShow(1);
}
//怀孕周数變化時
function ML_PregnantWeeksTextChange() {
    ML_BaZiPageShow(1);
}
//指定盤信息的太極點：誰是我干（比如取代日柱天干的位置）
function ML_ThisMeGanSelChange() {
    ML_BaZiPageShow(1);
    let thisMeGanSelNo = Number(ML_ThisMeGanSel.value);
    if (thisMeGanSelNo == -1) {
        thisMeGanSelNo = baZiInfo.getDayZhu().GanNo;
    }
    ML_TianGanCommentInfoOut.innerHTML = '天干評語：' + yinYangSysTemp.getTianGanComment(thisMeGanSelNo);
    ML_TiaoHouYongShenInfoOut.innerHTML = '《窮通寶鑒》調侯參考：' + yinYangSysTemp.getTiaoHouYongShen(thisMeGanSelNo, baZiInfo.getMonthZhu().ZhiNo);
}
//經度信息變化時
function ML_LongSelTextChange() {
    ML_BaZiPageShow(1);
}
//緯度信息變化時
function ML_LatSelTextChange() {
    ML_BaZiPageShow(1);
}
//時區信息變化時
function ML_TimeZoneTextChange() {
    ML_BaZiPageShow(1);
}
//本盤、流年盤的時期控制開關變化時候
function ML_Pan_Liu_ChkChang() {
    ML_DataTimeCtl2String();
}
//節氣的臨時調試函數
function ML_temp_JieQiJD(yearNum, monthZhiNo) {
    let jieQiJDTemp = yinYangSysTemp.getMonthJieQiJD(yearNum, monthZhiNo);
    let jd1 = jieQiJDTemp[0] - baZiInfo.birthdayTST_JD;
    let jd11 = jd1 * 120 / 365.2425;
    let jd2 = jieQiJDTemp[1] - baZiInfo.birthdayTST_JD;
    let jd21 = jd2 * 120 / 365.2425;
    let jd3 = jieQiJDTemp[2] - baZiInfo.birthdayTST_JD;
    let jd31 = jd2 * 120 / 365.2425;
    let length1 = 3;
    console.log('ML_BaZiPageShow():开始節JD:' + jd1.toFixed(length1) + '[' + jd11.toFixed(length1) + '年]/生日JD:'
        + baZiInfo.birthdayTST_JD.toFixed(length1) + '/中氣JD:'
        + jd2.toFixed(length1) + '[' + jd21.toFixed(length1) + '年]/中气时长：' + (jieQiJDTemp[1] - jieQiJDTemp[0]).toFixed(length1)
        + '/结束節JD:' + jd3.toFixed(length1) + '[' + jd31.toFixed(length1) + '年]/节气时长：'
        + (jieQiJDTemp[2] - jieQiJDTemp[0]).toFixed(length1));
}
