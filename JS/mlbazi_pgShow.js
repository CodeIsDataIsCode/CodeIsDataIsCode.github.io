"use strict";
function ML_BaZiPageInit() {
    ML_ThisYearSelInit(1979);
    ML_ThisYearText.value = 1979;
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_BaZiPageRenew() {
    ML_BaZiPageShow(1);
}
function ML_BaZiPageShow(daYunNum = 1) {
    let thisLong = Number(ML_LongSelText.value);
    let thisLat = Number(ML_LatSelText.value);
    let thisTimeZone = Number(ML_TimeZoneText.value);
    let pregnantWeeks = timeStr2hour(ML_PregnantWeeksText.value);
    let meGanNo = Number(ML_ThisMeGanSel.value);
    baZiInfo.setBaZiZhuInfo(ML_ThisPanDateTime.value, ML_ThisLiuDateTime.value, daYunNum, thisLong, thisTimeZone, pregnantWeeks, meGanNo);
    ML_BaZiStructInfo();
    ML_BaZiMingPanZhuShow();
    ML_DaYunTBShow();
    ML_LiuYearTBShow(baZiInfo.DaYunSelectNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo);
    ML_daYunLiuYearZhuShow(baZiInfo.DaYunSelectNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, baZiInfo.liuMontheSelectNo);
    if (ML_ThisMeGanSel.value == -1) {
        ML_ThisMeGanSel.value = baZiInfo.getDayZhu().GanNo;
        ML_ThisMeGanSelChange();
    }
}
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
function ML_BaZiMingPanZhuShow() {
    let genderTemp = ML_GenderChk.checked ? '男' : '女';
    let isNHemisphere = ML_HemisphereChk.checked;
    let meGanNo = Number(ML_ThisMeGanSel.value);
    let strTemp0 = '';
    let strTemp1 = '';
    let thisTime = timeStr2hour(ML_TimeInText.value) - 0;
    let pregnantWeeks = timeStr2hour(ML_PregnantWeeksText.value);
    let thisYear = Number(ML_ThisYearText.value);
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
    baZiInfo.setBaZiMingPanInfo(ML_ThisPanDateTime.value, thisLong, thisTimeZone, pregnantWeeks, meGanNo);
    strTemp0 = '<font color=#FF0000  >[调试信息]：</font>' + '/经度:' + baZiInfo.getLongitude()
        + '/时区:' + baZiInfo.getTimeZone() + '/未转换JD数:' + jd + '/平太阳JD:' + baZiInfo.getBirthdayJD() + '/时数:' + thisTime + '<br>';
    strTemp0 = strTemp0
        + '/真太阳JD:' + baZiInfo.getBirthdayTST_JD() + '/真太阳时：' + baZiInfo.getTrueSolarTime().toString() + '/农历年:'
        + gLCalendarBase.Lyear + '年' + gLCalendarBase.Lleap + gLCalendarBase.Lmc + '月' + gLCalendarBase.Ldn + gLCalendarBase.Ldc + '日' + '<br>';
    ML_DebugInfoOut.innerHTML = strTemp0;
    ML_BaZiDateInfoOut.innerHTML = '<font color=#FF0000><b>[日标]：</b></font>' + '公历:' + thisYear + '/' + thisMonth + '/' + thisDay + '  '
        + baZiInfo.getTrueSolarTime() + '(真太阳时)' + '/儒略日数:' + int2(jd + 0.5) + '/距2000年首:' + int2(jd + 0.5 - J2000) + '日';
    for (let i = 3; i <= 9; i++) {
        tdElement03 = document.getElementById('ML_BZTB_03_' + String(i).padStart(2, "0"));
        if (i == 6) {
            tdElement03.innerHTML = baZiInfo.yearZhuInfo.Name;
        }
        else if (i == 7) {
            tdElement03.innerHTML = baZiInfo.monthZhuInfo.Name;
        }
        else if (i == 8) {
            tdElement03.innerHTML = baZiInfo.dayZhuInfo.Name;
        }
        else if (i == 9) {
            tdElement03.innerHTML = baZiInfo.timeZhuInfo.Name;
        }
        tdElement04 = document.getElementById('ML_BZTB_04_' + String(i).padStart(2, "0"));
        tdElement04.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).NaYin;
        tdElement05 = document.getElementById('ML_BZTB_05_' + String(i).padStart(2, "0"));
        tdElement05.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).No;
        if (i == 8)
            tdElement05.innerHTML = tdElement05.innerHTML + genderTemp;
        tdElement06 = document.getElementById('ML_BZTB_06_' + String(i).padStart(2, "0"));
        tdElement06.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).GanShen + '</font>';
        tdElement07 = document.getElementById('ML_BZTB_07_' + String(i).padStart(2, "0"));
        tdElement07.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhiShen + '</font>';
        tdElement08 = document.getElementById('ML_BZTB_08_' + String(i).padStart(2, "0"));
        tdElement08.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanName + '</font>';
        tdElement09 = document.getElementById('ML_BZTB_09_' + String(i).padStart(2, "0"));
        tdElement09.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanShen + '</font>';
        tdElement10 = document.getElementById('ML_BZTB_10_' + String(i).padStart(2, "0"));
        tdElement10.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).HuoTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuHuoTuDiYun + '</font>';
        tdElement11 = document.getElementById('ML_BZTB_11_' + String(i).padStart(2, "0"));
        tdElement11.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ShuiTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuShuiTuDiYun + '</font>';
        tdElement12 = document.getElementById('ML_BZTB_12_' + String(i).padStart(2, "0"));
        tdElement12.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).XunKong;
    }
}
function ML_daYunLiuYearZhuShow(daYunNum = 1) {
    let isNHemisphere = ML_HemisphereChk.checked;
    let meGanNo = Number(ML_ThisMeGanSel.value);
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
    for (let i = 10; i <= 14; i++) {
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
        tdElement04 = document.getElementById('ML_BZTB_04_' + String(i).padStart(2, "0"));
        tdElement04.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).NaYin;
        tdElement05 = document.getElementById('ML_BZTB_05_' + String(i).padStart(2, "0"));
        tdElement05.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).No;
        if (i == 8)
            tdElement05.innerHTML = tdElement05.innerHTML + genderTemp;
        tdElement06 = document.getElementById('ML_BZTB_06_' + String(i).padStart(2, "0"));
        tdElement06.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).GanShen + '</font>';
        tdElement07 = document.getElementById('ML_BZTB_07_' + String(i).padStart(2, "0"));
        tdElement07.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhiShen + '</font>';
        tdElement08 = document.getElementById('ML_BZTB_08_' + String(i).padStart(2, "0"));
        tdElement08.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanName + '</font>';
        tdElement09 = document.getElementById('ML_BZTB_09_' + String(i).padStart(2, "0"));
        tdElement09.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).cangGanShen + '</font>';
        tdElement10 = document.getElementById('ML_BZTB_10_' + String(i).padStart(2, "0"));
        tdElement10.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).HuoTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuHuoTuDiYun + '</font>';
        tdElement11 = document.getElementById('ML_BZTB_11_' + String(i).padStart(2, "0"));
        tdElement11.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ShuiTuDiYun + ''
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.getBaZiZhuInfo(i, isNHemisphere).ZhuShuiTuDiYun + '</font>';
        tdElement12 = document.getElementById('ML_BZTB_12_' + String(i).padStart(2, "0"));
        tdElement12.innerHTML = baZiInfo.getBaZiZhuInfo(i, isNHemisphere).XunKong;
    }
}
function ML_DaYunTBShow() {
    let tdElement = new Array();
    for (let i = 0; i < 14; i++) {
        tdElement[0] = document.getElementById('ML_BZYun_03_' + String(i).padStart(2, "0"));
        tdElement[0].innerHTML = baZiInfo.daYunInfo[i].Name;
        tdElement[1] = document.getElementById('ML_BZYun_04_' + String(i).padStart(2, "0"));
        tdElement[1].innerHTML = baZiInfo.daYunInfo[i].Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].GanShen + '</font>';
        tdElement[2] = document.getElementById('ML_BZYun_05_' + String(i).padStart(2, "0"));
        tdElement[2].innerHTML = baZiInfo.daYunInfo[i].Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].ZhiShen + '</font>';
        tdElement[3] = document.getElementById('ML_BZYun_06_' + String(i).padStart(2, "0"));
        tdElement[3].innerHTML = baZiInfo.daYunInfo[i].HuoTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].ZhuHuoTuDiYun;
        tdElement[4] = document.getElementById('ML_BZYun_07_' + String(i).padStart(2, "0"));
        tdElement[4].innerHTML = baZiInfo.daYunInfo[i].ShuiTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.daYunInfo[i].ZhuShuiTuDiYun;
        tdElement[5] = document.getElementById('ML_BZYun_08_' + String(i).padStart(2, "0"));
        tdElement[5].innerHTML = baZiInfo.daYunInfo[i].daYunSuiNumStr;
        tdElement[6] = document.getElementById('ML_BZYun_09_' + String(i).padStart(2, "0"));
        tdElement[6].innerHTML = String(baZiInfo.daYunInfo[i].daYunYearNumStr).slice(2, 8);
    }
}
function ML_LiuYearTBShow(daYunZhuSelectNo) {
    let tdElement = new Array();
    baZiInfo.DaYunSelectNo = daYunZhuSelectNo;
    baZiInfo.setLiuYearZhuInfo(daYunZhuSelectNo, baZiInfo.MeGanNo);
    baZiInfo.setLiuMonthZhuInfo(daYunZhuSelectNo, baZiInfo.DaYunSelectNo, baZiInfo.MeGanNo);
    console.log('ML_LiuYearTBShow()在運行！大运表选择第：' + baZiInfo.DaYunSelectNo + '柱');
    for (let i = 0; i < 14; i++) {
        tdElement[0] = document.getElementById('ML_BZYear_03_' + String(i).padStart(2, "0"));
        tdElement[0].innerHTML = baZiInfo.liuYearInfo[i].Name;
        tdElement[1] = document.getElementById('ML_BZYear_04_' + String(i).padStart(2, "0"));
        tdElement[1].innerHTML = baZiInfo.liuYearInfo[i].Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].GanShen + '</font>';
        tdElement[2] = document.getElementById('ML_BZYear_05_' + String(i).padStart(2, "0"));
        tdElement[2].innerHTML = baZiInfo.liuYearInfo[i].Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].ZhiShen + '</font>';
        tdElement[3] = document.getElementById('ML_BZYear_06_' + String(i).padStart(2, "0"));
        tdElement[3].innerHTML = baZiInfo.liuYearInfo[i].HuoTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].ZhuHuoTuDiYun;
        tdElement[4] = document.getElementById('ML_BZYear_07_' + String(i).padStart(2, "0"));
        tdElement[4].innerHTML = baZiInfo.liuYearInfo[i].ShuiTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuYearInfo[i].ZhuShuiTuDiYun;
        tdElement[5] = document.getElementById('ML_BZYear_08_' + String(i).padStart(2, "0"));
        tdElement[5].innerHTML = baZiInfo.liuYearInfo[i].daYunSuiNumStr;
        tdElement[6] = document.getElementById('ML_BZYear_09_' + String(i).padStart(2, "0"));
        tdElement[6].innerHTML = baZiInfo.liuYearInfo[i].daYunYearNumStr;
    }
}
function ML_LiuMonthTBShow(daYunZhuSelectNo, liuYearSelectNo) {
    console.log('ML_LiuMonthTBShow()在運行！大运表柱選擇第：' + daYunZhuSelectNo + '柱/流年表柱選擇：' + liuYearSelectNo);
    let tdElement = new Array();
    baZiInfo.DaYunSelectNo = daYunZhuSelectNo;
    baZiInfo.liuYearSelectNo = liuYearSelectNo;
    baZiInfo.setLiuMonthZhuInfo(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, baZiInfo.MeGanNo);
    for (let i = 0; i < 14; i++) {
        tdElement[0] = document.getElementById('ML_BZMonth_03_' + String(i).padStart(2, "0"));
        tdElement[0].innerHTML = baZiInfo.liuMonthInfo[i].Name;
        tdElement[1] = document.getElementById('ML_BZMonth_04_' + String(i).padStart(2, "0"));
        tdElement[1].innerHTML = baZiInfo.liuMonthInfo[i].Gan
            + '<font style="font-size:30%;color:blue;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].GanShen + '</font>';
        tdElement[2] = document.getElementById('ML_BZMonth_05_' + String(i).padStart(2, "0"));
        tdElement[2].innerHTML = baZiInfo.liuMonthInfo[i].Zhi
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].ZhiShen + '</font>';
        tdElement[3] = document.getElementById('ML_BZMonth_06_' + String(i).padStart(2, "0"));
        tdElement[3].innerHTML = baZiInfo.liuMonthInfo[i].HuoTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].ZhuHuoTuDiYun;
        tdElement[4] = document.getElementById('ML_BZMonth_07_' + String(i).padStart(2, "0"));
        tdElement[4].innerHTML = baZiInfo.liuMonthInfo[i].ShuiTuDiYun
            + '<font style="font-size:30%;color:red;font-weight:bold;font-style:italic">' + baZiInfo.liuMonthInfo[i].ZhuShuiTuDiYun;
        tdElement[5] = document.getElementById('ML_BZMonth_08_' + String(i).padStart(2, "0"));
        tdElement[5].innerHTML = baZiInfo.liuMonthInfo[i].daYunSuiNumStr;
    }
}
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
    ML_daYunLiuYearZhuShow(baZiInfo.DaYunSelectNo);
    ML_LiuYearTBShow(baZiInfo.DaYunSelectNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, baZiInfo.liuMontheSelectNo);
}
function ML_daYunTBZhuSel(thisYunZhuNo) {
    console.log('ML_daYunTBZhuSel()在運行：被選擇的大運柱為：' + thisYunZhuNo);
    ML_daYunLiuYearZhuShow(thisYunZhuNo);
    ML_LiuYearTBShow(thisYunZhuNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo);
    ML_YunLiuYearMonthZhuSelNameShow(thisYunZhuNo, 1, 1);
}
function ML_liuYearTBZhuSel(thisLiuYearZhuNo) {
    let tdElement02 = document.getElementById('ML_BZMonth_LiuYearSel');
    let tdElement03 = document.getElementById('ML_BZMonth_LiuMonthSel');
    baZiInfo.liuYearSelectNo = thisLiuYearZhuNo;
    console.log('ML_liuYearTBZhuSel()在運行：選擇的大運柱號：' + baZiInfo.DaYunSelectNo + ' / 被選擇的流年柱為：' + thisLiuYearZhuNo);
    ML_LiuMonthTBShow(baZiInfo.DaYunSelectNo, thisLiuYearZhuNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, thisLiuYearZhuNo);
}
function ML_liuMonthTBZhuSel(thisLiuMonthZhuNo) {
    let tdElement03 = document.getElementById('ML_BZMonth_LiuMonthSel');
    baZiInfo.liuMontheSelectNo = thisLiuMonthZhuNo;
    console.log('ML_liuMonthTBZhuSel()在運行：被選擇的流月柱為：' + thisLiuMonthZhuNo);
    ML_YunLiuYearMonthZhuSelNameShow(baZiInfo.DaYunSelectNo, baZiInfo.liuYearSelectNo, thisLiuMonthZhuNo);
}
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
function ML_BaZiPageSetTime() {
    ML_Set_DateCtl_Value(1);
    ML_BaZiPageShow(1);
}
function ML_ThisPanDateTimeChange() {
    let iTimeDateTemp = JD.dateTimeStrSeparate(ML_ThisPanDateTime.value);
    let sTimeDateTemp = ML_ThisPanDateTime.value;
    let sTimeDateTemp1 = sTimeDateTemp;
    let iADTemp = iTimeDateTemp[0];
    let yearTemp = iTimeDateTemp[1];
    let monthTemp = iTimeDateTemp[2];
    let dayTemp = iTimeDateTemp[3];
    let hourTemp = iTimeDateTemp[4];
    let minuteTemp = iTimeDateTemp[5];
    let genderTemp = iTimeDateTemp[7];
    let hemisphereTemp = iTimeDateTemp[8];
    do {
        ML_ThisPanDateTime.value = sTimeDateTemp1;
        sTimeDateTemp = sTimeDateTemp1;
        iTimeDateTemp = JD.dateTimeStrSeparate(sTimeDateTemp);
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
            ML_ThisPanDateTime.value = sTimeDateTemp1;
        }
    } while ((sTimeDateTemp1 != sTimeDateTemp));
    ML_ThisYearText.value = yearTemp;
    ML_ThisYearSelInit(yearTemp);
    ML_ThisYearSel.value = yearTemp;
    ML_ThisMonthSel.value = monthTemp;
    ML_ThisDaySel.value = dayTemp;
    ML_TimeInText.value = hourTemp + ":" + minuteTemp;
    if (iADTemp == -1) {
        ML_ADFlagChk.checked = true;
    }
    else
        ML_ADFlagChk.checked = false;
    if (genderTemp == 0) {
        ML_GenderChk.checked = true;
    }
    else
        ML_GenderChk.checked = false;
    if (hemisphereTemp == 0) {
        ML_HemisphereChk.checked = true;
    }
    else
        ML_HemisphereChk.checked = false;
    ML_BaZiPageShow(1);
}
function ML_ThisLiuDateTimeChange() {
    ML_BaZiPageShow(1);
}
function ML_DateTimeString2Ctl_Value() {
}
function ML_DateTimeCtl2String() {
    let sTimeDateTemp = '';
    let sADTemp = '';
    let iADTemp = 1;
    let yearTemp = Number(ML_ThisYearText.value);
    let monthTemp = Number(ML_ThisMonthSel.value);
    let dayTemp = Number(ML_ThisDaySel.value);
    let sTimeArrTemp = ML_TimeInText.value.split(":");
    let hourTemp = Number(sTimeArrTemp[0]);
    let minuteTemp = Number(sTimeArrTemp[1]);
    let genderTemp = Number(ML_GenderChk.checked ? 0 : 1);
    let hemisphereTemp = Number(ML_HemisphereChk.checked ? 0 : 1);
    if (ML_ADFlagChk.checked) {
        sADTemp = '-';
        iADTemp = -1;
    }
    else {
        sADTemp = '+';
        iADTemp = 1;
    }
    sTimeDateTemp = sADTemp + String(yearTemp).padStart(4, '0') + String(monthTemp).padStart(2, '0')
        + String(dayTemp).padStart(2, '0') + String(hourTemp).padStart(2, '0') + String(minuteTemp).padStart(2, '0')
        + '.' + genderTemp + hemisphereTemp;
    if (ML_Pan_Liu_Chk.checked == true && ML_PanDateTimeLock_Chk.checked == false) {
        ML_ThisPanDateTime.value = sTimeDateTemp;
    }
    else if (ML_Pan_Liu_Chk.checked == false) {
        ML_ThisLiuDateTime.value = sTimeDateTemp;
    }
    return sTimeDateTemp;
}
function ML_ADFlagChkChange() {
    ML_DateTimeCtl2String();
}
function ML_ThisYearTextChange() {
    let thisYearTemp = parseInt(year2Ayear(ML_ThisYearText.value));
    ML_ThisYearSelInit(thisYearTemp);
    console.log("ML_ThisYearIsOK()输入的年：" + thisYearTemp + "/年选择按钮：" + ML_ThisYearSel.value);
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_ThisYearSelChange() {
    let yearNum = ML_ThisYearSel.value - 0;
    ML_ThisYearText.value = Ayear2year(yearNum);
    ML_YearChange(yearNum);
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_ThisYearSelInit(thisYear) {
    let selectAllNum = 61;
    let selCtrlTemp = document.getElementById("ML_ThisYearSel");
    let selCtrlLength = selCtrlTemp.length;
    let loopNum = 0;
    let thisSelNum = 0;
    for (var i = 0; i <= selCtrlLength; i++) {
        selCtrlTemp.remove(selCtrlLength - i);
    }
    for (let i = 0; i <= selectAllNum; i++) {
        let optionTemp = document.createElement("option");
        loopNum = thisYear + i - parseInt(selectAllNum / 2 - 0);
        if (loopNum <= 0) {
            optionTemp.text = '前' + (Math.abs(loopNum) + 1).toString() + wuXingGZSys.getYear2GanZhiName(loopNum - 1) + '年';
        }
        else {
            optionTemp.text = loopNum.toString() + wuXingGZSys.getYear2GanZhiName(loopNum) + '年';
        }
        optionTemp.value = loopNum;
        selCtrlTemp.add(optionTemp);
    }
    for (let i = 0; i <= selCtrlTemp.length; i++) {
        selCtrlTemp.selectedIndex = i.toString();
        if (thisYear == selCtrlTemp.value) {
            return;
        }
    }
}
function ML_YearChange(yearNum) {
    let yearTemp = yearNum;
    let monthTemp = ML_ThisMonthSel.value - 0;
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
}
function ML_ThisMonthTextChange() {
    ML_DateTimeCtl2String();
}
function ML_ThisMonthSelChange() {
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_ThisDaySelChange() {
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_ThisDayTextChange() {
    ML_DateTimeCtl2String();
}
function ML_TimeInTextChange() {
    ML_DateTimeCtl2String();
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
function ML_LunarTimeSelChange() {
    ML_TimeInText.value = String(ML_LunarTime.value).padStart(2, '0') + ":01";
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_Set_DateCtl_Value(fw) {
    let nowTime = new Date();
    let curTimeZone = -nowTime.getTimezoneOffset() / 60.0;
    console.log("ML_Set_DateCtl_Value()本地时间：" + Date().toString() + '/时区为：' + curTimeZone);
    let curRegionJD_2K = nowTime / 86400000 - 10957.5 - curTimeZone / 24;
    let curLong = Number(ML_LongSelText.value);
    let curLat = Number(ML_LatSelText.value);
    let curDST = ML_DSTChk.checked;
    JD.setJD2YMD(curRegionJD_2K + J2000);
    if (!fw || fw == 1) {
    }
    ML_ThisYearText.value = nowTime.getFullYear();
    ML_ThisYearSelInit(nowTime.getFullYear());
    ML_ThisYearSel.value = nowTime.getFullYear();
    ML_ThisMonthSel.value = nowTime.getMonth() + 1;
    ML_ThisDaySel.value = nowTime.getDate();
    ML_TimeZoneText.value = curTimeZone;
    ML_DateTimeCtl2String();
    curTimeZone = Number(ML_TimeZoneText.value);
    curLong = Number(ML_LongSelText.value);
    curLat = Number(ML_LatSelText.value);
    curRegionJD_2K = int2(curRegionJD_2K + 0.5);
}
function ML_GenderChkChange() {
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_HemisphereChkChange() {
    ML_DateTimeCtl2String();
    ML_BaZiPageShow(1);
}
function ML_PregnantWeeksTextChange() {
    ML_BaZiPageShow(1);
}
function ML_ThisMeGanSelChange() {
    ML_BaZiPageShow(1);
    let thisMeGanSelNo = Number(ML_ThisMeGanSel.value);
    if (thisMeGanSelNo == -1) {
        thisMeGanSelNo = baZiInfo.getDayZhu().GanNo;
    }
    ML_TianGanCommentInfoOut.innerHTML = '天干評語：' + wuXingGZSys.getTianGanComment(thisMeGanSelNo);
    ML_TiaoHouYongShenInfoOut.innerHTML = '《窮通寶鑒》調侯參考：' + wuXingGZSys.getTiaoHouYongShen(thisMeGanSelNo, baZiInfo.getMonthZhu().ZhiNo);
}
function ML_LongSelTextChange() {
    ML_BaZiPageShow(1);
}
function ML_LatSelTextChange() {
    ML_BaZiPageShow(1);
}
function ML_TimeZoneTextChange() {
    ML_BaZiPageShow(1);
}
function ML_Pan_Liu_ChkChang() {
    ML_DateTimeCtl2String();
}
function ML_temp_JieQiJD(yearNum, monthZhiNo) {
    let jieQiJDTemp = wuXingGZSys.getMonthJieQiJD(yearNum, monthZhiNo);
    let jd1 = jieQiJDTemp.startJD - baZiInfo.birthdayTST_JD;
    let jd11 = jd1 * 120 / 365.2425;
    let jd2 = jieQiJDTemp.midJD - baZiInfo.birthdayTST_JD;
    let jd21 = jd2 * 120 / 365.2425;
    let jd3 = jieQiJDTemp.endJD - baZiInfo.birthdayTST_JD;
    let jd31 = jd2 * 120 / 365.2425;
    let length1 = 3;
    console.log('ML_BaZiPageShow():开始節JD:' + jd1.toFixed(length1) + '[' + jd11.toFixed(length1) + '年]/生日JD:'
        + baZiInfo.birthdayTST_JD.toFixed(length1) + '/中氣JD:'
        + jd2.toFixed(length1) + '[' + jd21.toFixed(length1) + '年]/中气时长：' + (jieQiJDTemp.midJD - jieQiJDTemp.startJD).toFixed(length1)
        + '/结束節JD:' + jd3.toFixed(length1) + '[' + jd31.toFixed(length1) + '年]/节气时长：'
        + (jieQiJDTemp.endJD - jieQiJDTemp.startJD).toFixed(length1));
}
