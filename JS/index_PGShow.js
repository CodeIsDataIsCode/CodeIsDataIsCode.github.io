"use strict";
var funTabPGNo_Selt = 1;
function regionSelChange() {
    let timeZoneInfoTemp = RegionSel.options[RegionSel.selectedIndex].value;
    timeZoneInfoTemp = timeZoneInfoTemp.split('#');
    RegionSel.v = timeZoneInfoTemp[0];
    RegionSel.rg = timeZoneInfoTemp[1];
    curSeltTimeZone = RegionSel.v;
    curSeltDST = RegionSel.rg;
    TimeZoneText.value = curSeltTimeZone;
    if (RegionSel.rg) {
        CB_DST.checked = false;
    }
    else {
        CB_DST.checked = true;
    }
    TimeZoneInfoShowArea.innerHTML = timeZoneInfoTemp[2];
    let continentSelId = document.getElementById("ContinentSel");
    let regionSelId = document.getElementById("RegionSel");
    storageL.setItem('continentSelNo', ContinentSel.selectedIndex, 1000);
    storageL.setItem('continentSelName', continentSelId.options[ContinentSel.selectedIndex].text, 1000);
    storageL.setItem('regionSelNo', RegionSel.selectedIndex, 1000);
    storageL.setItem('regionSelName', regionSelId.options[RegionSel.selectedIndex].text, 1000);
    storageL.setItem('TimeZoneValue', curSeltTimeZone, 1000);
    storageL.setItem('curSeltDST', curSeltDST ? '1' : '0', 1000);
    storageL.setItem('curSeltDSTName', curSeltDST ? '夏令时' : '非夏令时', 1000);
    storageL.setItem('TimeZoneName', timeZoneInfoTemp[2] + '时区', 1000);
}
function continentSelChange() {
    let ob = GlobalTimeZoneArr[ContinentSel.options[ContinentSel.selectedIndex].value - 0];
    RegionSel.length = 0;
    for (let i = 1; i < ob.length; i += 2)
        addSelectOption(RegionSel, ob[i + 1], ob[i]);
    regionSelChange();
}
function timeZoneTextIn() {
    console.log("timeZoneTextIn()输入为：" + TimeZoneText.value);
    curSeltTimeZone = Number(TimeZoneText.value);
}
function yearChange(yearNum) {
    let yearTemp = yearNum;
    let monthTemp = ThisMonthSel.value - 0;
    if ((yearTemp <= -10000)) {
        alert('yearChange()年数值小于公元前10000年，无法显示日历！');
        return;
    }
    else if ((yearTemp >= 10000)) {
        alert('yearChange()年数值大于公元10000年，无法显示日历！');
        return;
    }
    else {
        thisYearSelInit(yearTemp);
        ThisYearText.value = yearTemp;
    }
    console.log('yearChange()年:' + yearNum + '/' + monthTemp + '||' + ThisMonthSel.value);
    MC_getLunarMonthPG(yearNum, monthTemp);
    storageThisDate();
}
function storageThisDate() {
    storageL.setItem('ThisSelCalendar', WhatCalendarSel.value, 1000);
    storageL.setItem('ThisSelYear', ThisYearText.value, 1000);
    storageL.setItem('ThisSelLeapMonth', ThisLeapMonthSel.value, 1000);
    storageL.setItem('ThisSelYueJian', ThisYueJianSel.value, 1000);
    storageL.setItem('ThisSelMonth', ThisMonthSel.value, 1000);
    storageL.setItem('ThisSelDay', ThisDaySel.value, 1000);
}
function yearChangeSelChange() {
    let yChangeNum = parseInt(YearChangeSel.value);
    let yNum = parseInt(ThisYearSel.value) + yChangeNum + 0;
    yearChange(yNum);
    console.log('yearChangeSelChange()年数值:' + yNum + '/改变了：' + yChangeNum);
    YearChangeSel.value = 0;
}
function monthChange(ud) {
    let yearNumTemp = parseInt(year2Ayear(ThisYearText.value));
    ;
    let monthNumTemp = parseInt(ThisMonthSel.value);
    if (ud == 0) {
        if (monthNumTemp <= 1 && yearNumTemp <= -10000) {
            alert('已经超过了公元前10000年，到顶了！');
            return;
        }
        else if (monthNumTemp <= 1) {
            ThisMonthSel.value = 12;
            yearNumTemp = yearNumTemp - 1;
            ThisYearText.value = Ayear2year(yearNumTemp);
        }
        else {
            ThisMonthSel.value = monthNumTemp - 1;
        }
    }
    else if (ud == 1) {
        if (monthNumTemp >= 12 && yearNumTemp >= 9999) {
            alert('已经超过了公元10000年，到顶了！');
            return;
        }
        else if (monthNumTemp >= 12) {
            ThisMonthSel.value = 1;
            yearNumTemp = yearNumTemp + 1;
            ThisYearText.value = Ayear2year(yearNumTemp);
        }
        else {
            ThisMonthSel.value = monthNumTemp + 1;
        }
    }
    else if (ud == 2) {
        set_date_screen(2);
    }
    MC_getLunarMonthPG(parseInt(yearNumTemp), parseInt(ThisMonthSel.value));
    storageThisDate();
}
function monthChangeSelChange() {
    let mChangeNum = parseInt(MonthChangeSel.value);
    console.log('monthChangeSelChange()/改变了：' + mChangeNum);
    MonthChangeSel.value = 0;
}
function dayChangeSelChange() {
    let dChangeNum = parseInt(DayChangeSel.value);
    console.log('dayChangeSelChange()/改变了：' + dChangeNum);
    DayChangeSel.value = 0;
    storageThisDate();
}
function timeChangeSelChange() {
}
function clockShowConversion(dateTimeObj) {
    let h = RegionSel.v - 0;
    let rg = '';
    let v = RegionSel.rg;
    let jdFrom2K = dateTimeObj / 86400000 - 10957.5 + h / 24;
    LocalClockArea.innerHTML = dateTimeObj.toLocaleString2() + "(" + (-dateTimeObj.getTimezoneOffset() / 60.0).toFixed(1) + "TZ)";
    ;
    if (v) {
        let year1 = JD.Year;
        let year2 = year1;
        let month1 = v.slice(0, 2) - 0;
        let month2 = v.slice(5, 5 + 2) - 0;
        if (month2 < month1)
            year2++;
        let J1 = JD.getJD4Week(year1, month1, v.slice(2, 2 + 1), v.slice(3, 3 + 1) - 0) - 0.5 - J2000 + (v.charCodeAt(4) - 97) / 24;
        let J2 = JD.getJD4Week(year2, month2, v.slice(7, 7 + 1), v.slice(8, 8 + 1) - 0) - 0.5 - J2000 + (v.charCodeAt(9) - 97) / 24;
        if (jdFrom2K >= J1 && jdFrom2K < J2)
            jdFrom2K += 1 / 24, rg = '<font color=#FF0000>¤</font>';
    }
    JD.setJD2YMD(jdFrom2K + J2000);
    SelRegionClock.innerHTML = '[' + JD.Day + '日 ' + JD.Hour + ':' + JD.Min + ':' + int2(JD.Sec) + rg + ']';
}
function citySelChange() {
    let i;
    let latLongValue = new LongLatDecode(CitySel.options[CitySel.selectedIndex].value);
    CitySel.Long = latLongValue.Long;
    CitySel.Lat = latLongValue.Lat;
    let stateSelId = document.getElementById("StateSel");
    let citySelId = document.getElementById("CitySel");
    curSeltLong = (latLongValue.Long * 180.0 / Math.PI);
    curSeltLat = (latLongValue.Lat * 180.0 / Math.PI);
    LongSelText.value = curSeltLong;
    LatSelText.value = curSeltLat;
    MC_thisDayInfoShow(-2);
    storageL.setItem('StateSelNo', StateSel.selectedIndex, 1000);
    storageL.setItem('StateSelName', stateSelId.options[StateSel.selectedIndex].text, 1000);
    storageL.setItem('CitySelNo', CitySel.selectedIndex, 1000);
    storageL.setItem('CitySelName', citySelId.options[CitySel.selectedIndex].text, 1000);
    storageL.setItem('CruCityLong', curSeltLong, 1000);
    storageL.setItem('CruCityLat', curSeltLat, 1000);
}
function stateSelChange() {
    CitySel.length = 0;
    let ob = Long_Lat_ChineseCityArr[StateSel.options[StateSel.selectedIndex].value - 0];
    for (let i = 1; i < ob.length; i++)
        addSelectOption(CitySel, ob[i].slice(0, 4), ob[i].slice(4, ob[i].length));
    citySelChange();
}
function longSelTextIn() {
    console.log("longSelTextIn()输入为：" + LongSelText.value);
    curSeltLong = Number(LongSelText.value);
}
function latSelTextIn() {
    console.log("latSelTextIn()输入为：" + LatSelText.value);
    curSeltLat = Number(LatSelText.value);
}
function thisTabPageShow(tabPageURL = "month_calendar.htm", seltTabNo = 4, tabPageName = "月曆表") {
    let tabCon = document.getElementById('funTabCon');
    let btns = document.getElementById('funTabTit').getElementsByTagName('span');
    funTabPGNo_Selt = seltTabNo - 1;
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = '';
    }
    ;
    btns[funTabPGNo_Selt].className = 'select';
    tabCon.src = tabPageURL;
    storageL.setItem('OpenSubPageURL', tabPageURL, 1000);
    storageL.setItem('OpenSubPageName', tabPageName, 1000);
    storageL.setItem('OpenSubPageNo', seltTabNo, 1000);
}
function pageObjectInit() {
    ThisTitle.innerHTML = softwareName + verStr;
    SoftwareVerNameArea.innerHTML = softwareVerName;
    let item1 = storageL.getItem('StateSelNo');
    let item2 = storageL.getItem('CitySelNo');
    let item3 = storageL.getItem('continentSelNo');
    let item4 = storageL.getItem('regionSelNo');
    let item5 = storageL.getItem('OpenSubPageURL');
    let item6 = storageL.getItem('OpenSubPageNo');
    let item7 = storageL.getItem('OpenSubPageName');
    if (item1 == null) {
        item1 = "0";
        item2 = "1";
    }
    if (item3 == null) {
        item3 = "0";
        item4 = "1";
    }
    if (item5 == null) {
        item5 = "month_calendar.htm";
        item6 = "4";
        item7 = "月曆表";
    }
    for (let i = 0; i < GlobalTimeZoneArr.length; i++)
        addSelectOption(ContinentSel, i, GlobalTimeZoneArr[i][0]);
    ContinentSel.selectedIndex = item3;
    continentSelChange();
    RegionSel.selectedIndex = item4;
    regionSelChange();
    for (let i = 0; i < Long_Lat_ChineseCityArr.length; i++)
        addSelectOption(StateSel, i, Long_Lat_ChineseCityArr[i][0]);
    StateSel.selectedIndex = item1;
    stateSelChange();
    CitySel.selectedIndex = item2;
    citySelChange();
    let tu3_buff = 0;
    thisTabPageShow(item5, Number(item6), item7);
    tick();
    set_date_screen(0);
    tick();
}
function thisYearIsOK() {
    let thisYearTemp = parseInt(year2Ayear(ThisYearText.value));
    thisYearSelInit(thisYearTemp);
    console.log("thisYearIsOK()输入的年：" + thisYearTemp + "/年选择按钮：" + ThisYearSel.value);
    MC_getLunarMonthPG(thisYearTemp, parseInt(ThisMonthSel.value));
}
function thisYearSelInit(thisYear) {
    let selectAllNum = 61;
    let selCtrlTemp = document.getElementById("ThisYearSel");
    let selCtrlLength = selCtrlTemp.length;
    let loopNum = 0;
    let thisSelNum = 0;
    for (let i = 0; i <= selCtrlLength; i++) {
        selCtrlTemp.remove(selCtrlLength - i);
    }
    for (let i = 0; i <= selectAllNum; i++) {
        let optionTemp = document.createElement("option");
        loopNum = thisYear + i - parseInt(selectAllNum / 2 - 0);
        if (loopNum <= 0) {
            optionTemp.text = '前' + (Math.abs(loopNum) + 1).toString() + '年';
        }
        else {
            optionTemp.text = loopNum.toString() + '年';
        }
        optionTemp.value = loopNum.toString();
        selCtrlTemp.add(optionTemp);
    }
    for (let i = 0; i <= selCtrlTemp.length; i++) {
        selCtrlTemp.selectedIndex = i.toString();
        if (thisYear == selCtrlTemp.value) {
            return;
        }
    }
}
function thisYearSelChange() {
    let yearNum = ThisYearSel.value - 0;
    ThisYearText.value = Ayear2year(yearNum);
    console.log('thisYearSelChange()年:' + yearNum);
    yearChange(yearNum);
    storageThisDate();
}
function thisMonthSelChange() {
    console.log('thisMonthSelChange()年:' + ThisYearSel.value + "/" + ThisMonthSel.value);
    MC_getLunarMonthPG(parseInt(ThisYearSel.value), parseInt(ThisMonthSel.value));
    storageThisDate();
}
function thisDaySelChange() {
    storageL.setItem('ThisSelDay', ThisDaySel.value, 1000);
}
function tick() {
    let nowDate = new Date();
    let item5 = storageL.getItem('OpenSubPageURL');
    let item6 = storageL.getItem('OpenSubPageNo');
    let item7 = storageL.getItem('OpenSubPageName');
    curShowPGLB.innerHTML = item6 + "号【" + item7 + "】页";
    clockShowConversion(nowDate);
    window.setTimeout("tick()", 1000);
}
function set_date_screen(fw) {
    let nowTime = new Date();
    curTimeZone = -nowTime.getTimezoneOffset() / 60.0;
    curRegionJD_2K = nowTime / 86400000 - 10957.5 - curTimeZone / 24;
    JD.setJD2YMD(curRegionJD_2K + J2000);
    if (!fw || fw == 1) {
    }
    if (!fw || fw == 2) {
        ThisYearText.value = nowTime.getFullYear();
        ThisMonthSel.value = nowTime.getMonth() + 1;
        ThisDaySel.value = nowTime.getDate();
        thisYearSelInit(year2Ayear(ThisYearText.value));
    }
    curRegionJD_2K = int2(curRegionJD_2K + 0.5);
    curSeltTimeZone = TimeZoneText.value;
    curSeltLong = LongSelText.value;
    curSeltLat = LatSelText.value;
    curSeltDST = CB_DST.checked;
}
function MC_thisDayInfoShow(thisDayNum) {
}
function MC_getLunarMonthPG(yearNum, monthNum) {
}
