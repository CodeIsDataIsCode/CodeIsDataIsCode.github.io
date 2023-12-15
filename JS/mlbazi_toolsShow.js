"use strict";
//八字反查日期，显示組合出來的八字
function ML_baZiQueryBaZiInfo() {
    //ML_BaZiQueryBaZiInfoOut
    let yearGanOb = document.getElementById('ML_BaZiQueryYearZhuGanSel');
    let yearGanObIndex = yearGanOb.selectedIndex;
    let yearZhiOb = document.getElementById('ML_BaZiQueryYearZhuZhiSel');
    let yearZhiObIndex = yearZhiOb.selectedIndex;
    let monthZhiOb = document.getElementById('ML_BaZiQueryMonthZhuZhiSel');
    let monthZhiObIndex = monthZhiOb.selectedIndex;
    let dayGanOb = document.getElementById('ML_BaZiQueryDayZhuGanSel');
    let dayGanObIndex = dayGanOb.selectedIndex;
    let dayZhiOb = document.getElementById('ML_BaZiQueryDayZhuZhiSel');
    let dayZhiObIndex = dayZhiOb.selectedIndex;
    let timeZhiOb = document.getElementById('ML_BaZiQueryTimeZhuZhiSel');
    let timeZhiObIndex = timeZhiOb.selectedIndex;
    ML_BaZiQueryBaZiInfoOut.innerHTML = '組合的四柱為：'
        + yinYangSysTemp.getZhuNameByGanZhiNo(ML_BaZiQueryYearZhuGanSel.value, ML_BaZiQueryYearZhuZhiSel.value) + '年  '
        + yinYangSysTemp.getMonthZhuNameByYearGanNo(ML_BaZiQueryYearZhuGanSel.value, ML_BaZiQueryMonthZhuZhiSel.value) + '月 '
        + yinYangSysTemp.getZhuNameByGanZhiNo(ML_BaZiQueryDayZhuGanSel.value, ML_BaZiQueryDayZhuZhiSel.value) + '日  '
        + yinYangSysTemp.getTimeZhuNameByDayGanNo(ML_BaZiQueryDayZhuGanSel.value, ML_BaZiQueryTimeZhuZhiSel.value) + '時 <  '
        + yinYangSysTemp.getZhuNameByGanZhiNo(ML_BaZiQueryYearZhuGanSel.value, ML_BaZiQueryYearZhuZhiSel.value)
        + yinYangSysTemp.getMonthZhuNameByYearGanNo(ML_BaZiQueryYearZhuGanSel.value, ML_BaZiQueryMonthZhuZhiSel.value)
        + yinYangSysTemp.getZhuNameByGanZhiNo(ML_BaZiQueryDayZhuGanSel.value, ML_BaZiQueryDayZhuZhiSel.value)
        + yinYangSysTemp.getTimeZhuNameByDayGanNo(ML_BaZiQueryDayZhuGanSel.value, ML_BaZiQueryTimeZhuZhiSel.value) + '>';
}
//八字反查日期，页面信息显示
function ML_baZiToDateInfoShow() {
    let startYearTemp = Number(BaZiQueryStartYear.value);
    let endYearTemp = Number(BaZiQueryEndYear.value) + 1;
    let yearZhuGanNo = Number(ML_BaZiQueryYearZhuGanSel.value);
    let yearZhuZhiNo = Number(ML_BaZiQueryYearZhuZhiSel.value);
    let yearZhuNo = yinYangSysTemp.getZhuNoByGanZhiNo(yearZhuGanNo, yearZhuZhiNo);
    let yearZhuName = yinYangSysTemp.getZhuNameByGanZhiNo(yearZhuGanNo, yearZhuZhiNo);
    let monthZhuZhiNo = Number(ML_BaZiQueryMonthZhuZhiSel.value);
    let monthZhuNo = yinYangSysTemp.getMonthZhuNoByYearGanNo(yearZhuGanNo, monthZhuZhiNo);
    let monthZhuName = yinYangSysTemp.getMonthZhuNameByYearGanNo(yearZhuGanNo, monthZhuZhiNo);
    let dayZhuGanNo = Number(ML_BaZiQueryDayZhuGanSel.value);
    let dayZhuZhiNo = Number(ML_BaZiQueryDayZhuZhiSel.value);
    let dayZhuNo = yinYangSysTemp.getZhuNoByGanZhiNo(dayZhuGanNo, dayZhuZhiNo);
    let dayZhuName = yinYangSysTemp.getZhuNameByGanZhiNo(dayZhuGanNo, dayZhuZhiNo);
    let timeZhuZhiNo = Number(ML_BaZiQueryTimeZhuZhiSel.value);
    let timeZhuNo = yinYangSysTemp.getTimeZhuNoByDayGanNo(dayZhuGanNo, timeZhuZhiNo);
    let timeZhuName = yinYangSysTemp.getTimeZhuNameByDayGanNo(dayZhuGanNo, timeZhuZhiNo);
    //JD = 0(-0.5416667；0-13/24) 癸丑日50号 -4712/1/1 12:00:00
    let dayStrTemp = "";
    let dayNumTemp = [0];
    let thisJD = baZiInfo.baZiToDateCal(yearZhuNo, monthZhuZhiNo, dayZhuNo, timeZhuZhiNo, startYearTemp, endYearTemp);
    let thisJDStr = "";
    //生成时间串
    for (let i = 0; i < thisJD.length; i++) {
        thisJDStr += (i + 1) + ",JD=" + Number(thisJD[i]).toFixed(3) + ",日期：" + JD.JD2str(thisJD[i]) + "<br>";
    }
    let titleTemp = yearZhuNo + yearZhuName + "年/" + monthZhuNo + monthZhuName
        + "月/" + dayZhuNo + dayZhuName + "日/" + timeZhuNo + timeZhuName
        + "時,   共查到：" + thisJD.length + "组日期组合<br><hr>";
    ML_BaZiToDateInfoOut.innerHTML = titleTemp + thisJDStr + "<br><hr>"; //"<br>" +
}
//清空八字反查信息
function ML_baZiToDateInfoCls() {
    ML_BaZiToDateInfoOut.innerHTML = "<br><hr>";
}
//年柱天干变化时
function ML_baZiQueryYearZhuGanSelChange() {
    let selCtrlTemp = document.getElementById("ML_BaZiQueryYearZhuZhiSel");
    let selCtrlLength = selCtrlTemp.length;
    let selCtrlValue = ML_BaZiQueryYearZhuGanSel.value;
    for (let i = 0; i <= selCtrlLength; i++) {
        selCtrlTemp.remove(selCtrlLength - i);
    }
    let optionTemp1 = document.createElement("option");
    let optionTemp2 = document.createElement("option");
    let optionTemp3 = document.createElement("option");
    let optionTemp4 = document.createElement("option");
    let optionTemp5 = document.createElement("option");
    let optionTemp6 = document.createElement("option");
    if ((selCtrlValue % 2) == 1) {
        optionTemp1.text = "子年";
        optionTemp1.value = 1;
        selCtrlTemp.add(optionTemp1);
        optionTemp2.text = "寅年";
        optionTemp2.value = 3;
        selCtrlTemp.add(optionTemp2);
        optionTemp3.text = "辰年";
        optionTemp3.value = 5;
        selCtrlTemp.add(optionTemp3);
        optionTemp4.text = "午年";
        optionTemp4.value = 7;
        selCtrlTemp.add(optionTemp4);
        optionTemp5.text = "申年";
        optionTemp5.value = 9;
        selCtrlTemp.add(optionTemp5);
        optionTemp6.text = "戌年";
        optionTemp6.value = 11;
        selCtrlTemp.add(optionTemp6);
        //selCtrlTemp.value 	= 1;
    }
    else {
        optionTemp1.text = "丑年";
        optionTemp1.value = 2;
        selCtrlTemp.add(optionTemp1);
        optionTemp2.text = "卯年";
        optionTemp2.value = 4;
        selCtrlTemp.add(optionTemp2);
        optionTemp3.text = "巳年";
        optionTemp3.value = 6;
        selCtrlTemp.add(optionTemp3);
        optionTemp4.text = "未年";
        optionTemp4.value = 8;
        selCtrlTemp.add(optionTemp4);
        optionTemp5.text = "酉年";
        optionTemp5.value = 10;
        selCtrlTemp.add(optionTemp5);
        optionTemp6.text = "亥年";
        optionTemp6.value = 12;
        selCtrlTemp.add(optionTemp6);
        //selCtrlTemp.selected = true; 	= 2;
    }
    optionTemp2.selected = true;
}
//日柱天干变化时
function ML_baZiQueryDayZhuGanSelChange() {
    let selCtrlTemp = document.getElementById("ML_BaZiQueryDayZhuZhiSel");
    let selCtrlLength = selCtrlTemp.length;
    let selCtrlValue = ML_BaZiQueryDayZhuGanSel.value;
    for (let i = 0; i <= selCtrlLength; i++) {
        selCtrlTemp.remove(selCtrlLength - i);
    }
    let optionTemp1 = document.createElement("option");
    let optionTemp2 = document.createElement("option");
    let optionTemp3 = document.createElement("option");
    let optionTemp4 = document.createElement("option");
    let optionTemp5 = document.createElement("option");
    let optionTemp6 = document.createElement("option");
    if ((selCtrlValue % 2) == 1) {
        optionTemp1.text = "子日";
        optionTemp1.value = 1;
        selCtrlTemp.add(optionTemp1);
        optionTemp2.text = "寅日";
        optionTemp2.value = 3;
        selCtrlTemp.add(optionTemp2);
        optionTemp3.text = "辰日";
        optionTemp3.value = 5;
        selCtrlTemp.add(optionTemp3);
        optionTemp4.text = "午日";
        optionTemp4.value = 7;
        selCtrlTemp.add(optionTemp4);
        optionTemp5.text = "申日";
        optionTemp5.value = 9;
        selCtrlTemp.add(optionTemp5);
        optionTemp6.text = "戌日";
        optionTemp6.value = 11;
        selCtrlTemp.add(optionTemp6);
    }
    else {
        optionTemp1.text = "丑日";
        optionTemp1.value = 2;
        selCtrlTemp.add(optionTemp1);
        optionTemp2.text = "卯日";
        optionTemp2.value = 4;
        selCtrlTemp.add(optionTemp2);
        optionTemp3.text = "巳日";
        optionTemp3.value = 6;
        selCtrlTemp.add(optionTemp3);
        optionTemp4.text = "未日";
        optionTemp4.value = 8;
        selCtrlTemp.add(optionTemp4);
        optionTemp5.text = "酉日";
        optionTemp5.value = 10;
        selCtrlTemp.add(optionTemp5);
        optionTemp6.text = "亥日";
        optionTemp6.value = 12;
        selCtrlTemp.add(optionTemp6);
    }
    //selCtrlTemp.selectedIndex 	= "0";
    optionTemp2.selected = true;
}
