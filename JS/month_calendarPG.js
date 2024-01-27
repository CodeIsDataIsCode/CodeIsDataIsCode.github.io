"use strict";
function MC_thisPageShow(pgNo) {
    if (pgNo == 1) {
        MC_MonthCalendarDiv.style.display = '';
        MC_YearCalendarDiv.style.display = 'none';
        MC_YuanYunDiv.style.display = 'none';
        MC_HuangJiJingShiDiv.style.display = 'none';
        MC_getLunarMonthPG(parseInt(MC_ThisYearText.value), parseInt(MC_ThisMonthText.value));
    }
    else if (pgNo == 2) {
        MC_MonthCalendarDiv.style.display = 'none';
        MC_YearCalendarDiv.style.display = '';
        MC_YuanYunDiv.style.display = 'none';
        MC_HuangJiJingShiDiv.style.display = 'none';
        MC_YearCalendarDiv.innerHTML = '';
        MC_createYearTB(Number(MC_ThisYearText.value));
    }
    else if (pgNo == 3) {
        MC_MonthCalendarDiv.style.display = 'none';
        MC_YearCalendarDiv.style.display = 'none';
        MC_YuanYunDiv.style.display = '';
        MC_HuangJiJingShiDiv.style.display = 'none';
        MC_YuanYunDiv.innerHTML = '';
        MC_createYuanYunTB(parseInt(MC_ThisYearText.value), parseInt(MC_ItemNumText.value));
    }
    else if (pgNo == 4) {
        MC_MonthCalendarDiv.style.display = 'none';
        MC_YearCalendarDiv.style.display = 'none';
        MC_YuanYunDiv.style.display = 'none';
        MC_HuangJiJingShiDiv.style.display = '';
        MC_HuangJiJingShiInfo.innerHTML = '';
        MC_createHuangJiJingShi_TB(parseInt(MC_ThisYearText.value), parseInt(MC_ItemNumText.value));
    }
}
function MC_createYearTBDate(year) {
    let tbTitle = ['周数', '日', '一', '二', '三', '四', '五', '六'];
    JD.setCEYearLeap(year);
    let isLeap = JD.YearLeap;
    let jd0 = JD.jc_gc_Date2JD(year, 1, 1);
    let weekNo = JD.JD2WeekNo(jd0);
    let dayNum = 0, dt_day = 0 - weekNo;
    let dayStr = '';
    let tbData = new Array(60);
    for (let i = 0; i < tbData.length; i++) {
        tbData[i] = new Array(8).fill(0);
    }
    tbData[0] = ['周数', '日', '一', '二', '三', '四', '五', '六'];
    for (let i = 1; i < 55; i++) {
        tbData[i][0] = i + '/' + i;
        for (let j = 1; j < 8; j++) {
            dayNum = (((i - 1) * 7) + j) + dt_day;
            if (dayNum < 1) {
                dayStr = '12/' + String(31 + dayNum) + '<br>' + dayNum;
            }
            else {
                dayStr = '1/' + String(j - weekNo);
            }
            dayNum = (i - 1) * 7 + j + weekNo;
            tbData[i][j] = dayStr;
        }
    }
    tbData[0][0] = String(year).slice(2, 4) + 'Y';
    return tbData;
}
function MC_createYearTB(year) {
    let tableData = MC_createYearTBDate(year);
    let tableContainer = document.getElementById("MC_YearCalendarDiv");
    let table = document.createElement("table");
    table.style = "background-color: #00ff00;";
    table.style.border = "5px  solid #0000ff";
    table.style.padding = '1px';
    let tbRow = new Object();
    let tbCell = new Object();
    let tbCellText = new Object();
    for (let i = 0; i < tableData.length; i++) {
        tbRow = document.createElement("tr");
        for (let j = 0; j < tableData[i].length; j++) {
            tbCell = document.createElement(i === 0 ? "th" : "td");
            tbRow.appendChild(tbCell);
            tbCell.style.border = "1px  solid #0000ff";
            tbCell.innerHTML = tableData[i][j];
        }
        table.appendChild(tbRow);
    }
    tableContainer.appendChild(table);
}
function MC_thisDayInfoShow1(thisDayNum) {
    if ((thisDayNum >= thisMonthWeek) && (thisDayNum <= (thisMonthWeek + thisMonthDayNum + 1))) {
        MC_thisDayInfoShow((thisDayNum - thisMonthWeek));
    }
}
function MC_thisDayInfoShow(thisDayNum) {
    if (event) {
        if (event.ctrlKey)
            return;
    }
    if (!oLunarGlobal.dn || (thisDayNum >= oLunarGlobal.dn))
        return;
    let longTemp = Number(MC_LongSelText.value);
    let latTemp = Number(MC_LatSelText.value);
    let timeZoneTemp = Number(MC_TimeZoneText.value);
    let cal5StrTemp = "";
    if (thisDayNum == -2) {
        cal5StrTemp = MC_Sun_Moon_Rise_Fall_Info(curRegionJD_2K, longTemp, latTemp, timeZoneTemp);
        MC_SunRiseFallInfo.bak = MC_SunRiseFallInfo.innerHTML;
    }
    if (thisDayNum < 0) {
        return;
    }
    let ob = oLunarGlobal.lunDay[thisDayNum];
    let str = "";
    cal5StrTemp = MC_Sun_Moon_Rise_Fall_Info(ob.d0, longTemp, latTemp, timeZoneTemp);
    MC_SunRiseFallInfo.innerHTML = cal5StrTemp;
    MC_SunRiseFallInfo.bak = cal5StrTemp;
    MC_SunRiseFallInfo.style.display = '';
    JD.setCEYearLeap(ob.Year);
    if (window.event) {
        str = "";
        MC_ThisDayText.value = ob.di + 1;
        str = "格里历: " + Ayear2year(ob.Year) + (JD.GCYearLeap ? "闰年" : "年") + ob.Month + '月' + ob.Day + '日(共' + ob.dn + '天)' + '<br>';
        str += "儒略历: " + Ayear2year(ob.Year) + (JD.JCYearLeap ? "闰年" : "年") + '<br>';
        str += ob.Lyear2 + '立春年/' + ob.Lyear3 + '春节年 ' + gWeekMidName[ob.week] + ' ' + ob.Constellation + '<br>';
        str += "农历: 黄帝" + ob.Lyear4 + '年 ' + ob.Lleap + ob.Lmc + '月' + (ob.Ldn > 29 ? '大 ' : '小 ') + ob.Ldc + '日' + "<br>";
        str += "干支: " + ob.Lyear2 + '年 ' + ob.Lmonth2 + '月 ' + ob.Lday2 + '日<br>';
        str += '回历: ' + ob.Hyear + '年' + ob.Hmonth + '月' + ob.Hday + '日<br>';
        str += 'JD: ' + (ob.d0 + J2000) + ' / JD2K=' + ob.d0 + '<br>';
        if (ob.MoonPhase)
            str += ob.MoonPhase + ' ' + ob.MoonPhaseTime + ' ';
        if (ob.JieQi)
            str += '节气：' + ob.JieQi + ' ' + ob.JieQiTime + '<br>';
        else {
            if (ob.LJieQi)
                str += ob.LJieQi + '<br>';
        }
        MC_ThisDayInfo.innerHTML = str;
    }
}
function MC_thisMonthDBChang(thisDayNum) {
    let yearTemp = parseInt(MC_ThisYearText.value);
    let monthTemp = parseInt(MC_ThisMonthText.value);
    if ((thisMonthWeek == 0) && (thisDayNum < 1)) {
        if (monthTemp == 1) {
            yearTemp -= 1;
            monthTemp = 12;
        }
        else {
            monthTemp -= 1;
        }
    }
    else if (thisDayNum < thisMonthWeek) {
        if (monthTemp == 1) {
            yearTemp -= 1;
            monthTemp = 12;
        }
        else {
            monthTemp -= 1;
        }
    }
    else if (thisDayNum >= (thisMonthWeek + thisMonthDayNum)) {
        if (monthTemp == 12) {
            yearTemp += 1;
            monthTemp = 1;
        }
        else {
            monthTemp += 1;
        }
    }
    MC_ThisYearText.value = yearTemp;
    MC_ThisMonthText.value = monthTemp;
    MC_getLunarMonthPG(yearTemp, monthTemp);
}
function MC_getLunarMonthPG(yearNum, monthNum) {
    if (monthNum == -10000) {
        console.log("月数为：" + monthNum);
        return;
    }
    if (!oLunarGlobal.dn || oLunarGlobal.Year != yearNum || oLunarGlobal.Month != monthNum) {
        oLunarGlobal.calendarInfoCalc(yearNum, monthNum, curRegionJD_2K);
        MC_MCTitleRow.innerHTML = oLunarGlobal.titleInfo;
        sanYuanYunInfo.initInfo(yearNum);
        MC_MCYuanYunInfoRow.innerHTML = sanYuanYunInfo.getYunName() + sanYuanYunInfo.getYunGuaName() + sanYuanYunInfo.getYunStarName()
            + "第" + sanYuanYunInfo.getYuanNo() + "元第" + sanYuanYunInfo.getYunNo() + "运"
            + "【" + sanYuanYunInfo.getStartEndYear() + "】";
        MC_QiShuoInfo.innerHTML = oLunarGlobal.qiShuoInfo;
    }
    MC_thisDayInfoShow(-2);
}
function MC_refreshDate() {
    let item1 = storageL.getItem('ThisSelCalendar');
    let item2 = storageL.getItem('ThisSelYear');
    let item3 = storageL.getItem('ThisSelLeapMonth');
    let item4 = storageL.getItem('ThisSelMonth');
    let item5 = storageL.getItem('ThisSelDay');
    MC_CalendarSel.value = item1;
    MC_ThisYearText.value = item2;
    MC_MonthLeapSel.value = item3;
    MC_ThisMonthText.value = item4;
    MC_ThisDayText.value = item5;
    MC_getLunarMonthPG(Number(item2), Number(item4));
}
function MC_createYuanYunTB(year, itemNum) {
    let yuanYunInfoStr = "";
    let yuanStartYear = 0;
    let yunStartYear = 0;
    for (let i = 0; i < itemNum; i++) {
        sanYuanYunInfo.initInfo(year + i * 180);
        yuanStartYear = sanYuanYunInfo.getYuanStartYear();
        yuanYunInfoStr += '<font style="font-size: 16px; color:#FF0000">' + yuanStartYear + JD.getYearGanZhi(yuanStartYear).YGanZhiName
            + gLCalendarBase.getNianHao(yuanStartYear) + '</font>'
            + "<br>";
        for (let j = 0; j < 9; j++) {
            sanYuanYunInfo.initInfo(yuanStartYear + j * 20);
            yunStartYear = sanYuanYunInfo.getYunStartYear();
            yuanYunInfoStr += '第' + (j + 1) + '运：' + yunStartYear + JD.getYearGanZhi(yunStartYear).YGanZhiName + ", " + sanYuanYunInfo.getYunName()
                + ", " + gLCalendarBase.getNianHao(yunStartYear)
                + "<br>";
        }
    }
    MC_YuanYunDiv.innerHTML = yuanYunInfoStr;
}
function MC_createHuangJiJingShi_TB(year, itemNum) {
    let infoStr = "";
    MC_HuangJiJingShi_NoTest_TB();
}
;
function MC_HuangJiJingShi_GuaBianTest_TB() {
    let infoStr = "";
    for (let i = 1; i < 65; i++) {
        infoStr += i + ': ' + yinYang64Gua.getGuaFullName(i) + ' → ';
        for (let j = 1; j < 7; j++) {
            infoStr += j + ':' + yinYang64Gua.getBGuaFullName(i, j) + ", ";
        }
        infoStr += "<br>";
    }
    MC_HuangJiJingShiInfo.innerHTML = infoStr;
}
;
function MC_HuangJiJingShi_NoTest_TB() {
    let infoStr = "";
    let year = parseInt(MC_ThisYearText.value);
    huangJiJingShiInfo.initInfo(year);
    let hueHuiNo = huangJiJingShiInfo.getYueHuiNo();
    let yuiHuiGuaNo = huangJiJingShiInfo.getYueHuiJiaZiNo();
    let daYunNo = huangJiJingShiInfo.getDaYunNo();
    let zhongYunNo = huangJiJingShiInfo.getZhongYunNo();
    let xiaoYunNo = huangJiJingShiInfo.getXiaoYunNo();
    let yueHuiStartYear = huangJiJingShiInfo.getYueHuiStartYear();
    let yueHuiEndYear = huangJiJingShiInfo.getYueHuiEndYear();
    let yueHuiGuaStartYear = huangJiJingShiInfo.getYueHuiGuaStartYear();
    let yueHuiGuaEndYear = huangJiJingShiInfo.getYueHuiGuaEndYear();
    let daYunStartYear = huangJiJingShiInfo.getDaYunStartYear();
    let daYunEndYear = huangJiJingShiInfo.getDaYunEndYear();
    let zhongYunStartYear = huangJiJingShiInfo.getZhongYunStartYear();
    let zhongYunEndYear = huangJiJingShiInfo.getZhongYunEndYear();
    let xiaoYunStartYear = huangJiJingShiInfo.getXiaoYunStartYear();
    let xiaoYunEndYear = huangJiJingShiInfo.getXiaoYunEndYear();
    infoStr = "<br>公元" + year + "年，" + gLCalendarBase.getNianHao(year) + "，黄帝纪年" + huangJiJingShiInfo.getNYear() + "年，第" + huangJiJingShiInfo.getJiaZiNum()
        + "个甲子周期，" + huangJiJingShiInfo.getJiaZiNo() + "号<br><br>"
        + "月会管10800年：" + hueHuiNo + "号，【" + yueHuiStartYear + gLCalendarBase.getNianHao(yueHuiStartYear) + " ~ " + yueHuiEndYear + "年】，"
        + huangJiJingShiInfo.getYueHuiName() + "<br><br>"
        + "月正卦管2160年：" + yuiHuiGuaNo + "号，【" + yueHuiGuaStartYear + gLCalendarBase.getNianHao(yueHuiGuaStartYear) + " ~ " + yueHuiGuaEndYear + "年】，卦："
        + huangJiJingShiInfo.getYueHuiGuaNo() + huangJiJingShiInfo.getYueHuiGuaName() + "<br><br>"
        + "大运   管360年：" + daYunNo + "号，【" + daYunStartYear + gLCalendarBase.getNianHao(daYunStartYear) + " ~ " + daYunEndYear + "年】"
        + "，甲子" + huangJiJingShiInfo.getDaYunJiaZiNo() + "号，" + huangJiJingShiInfo.getDaYunYHGuaNo() + "卦之第" + huangJiJingShiInfo.getDaYunYaoNo() + "爻变卦："
        + huangJiJingShiInfo.getDaYunGuaNo() + '号卦之：' + huangJiJingShiInfo.getDaYunGuaName() + "<br><br>"
        + "中运    管60年：" + zhongYunNo + "号，【" + zhongYunStartYear + gLCalendarBase.getNianHao(zhongYunStartYear) + " ~ " + zhongYunEndYear + "年】，"
        + huangJiJingShiInfo.getZhongYunYaoNo() + "爻变卦：" + huangJiJingShiInfo.getZhongYunGuaNo() + '号卦之：' + huangJiJingShiInfo.getZhongYunGuaName() + "<br><br>"
        + "小运    管10年：" + xiaoYunNo + "号，【" + xiaoYunStartYear + gLCalendarBase.getNianHao(xiaoYunStartYear) + " ~ " + xiaoYunEndYear + "年】，"
        + huangJiJingShiInfo.getXiaoYunYaoNo() + "爻变卦：" + huangJiJingShiInfo.getXiaoYunGuaNo() + '号卦之：' + huangJiJingShiInfo.getXiaoYunGuaName() + "<br><br>"
        + "值年卦 管1年：甲子第" + huangJiJingShiInfo.getZhiYearJiaZiNo() + "号，" + huangJiJingShiInfo.getZhiYearGuaNo() + "号卦之：" + huangJiJingShiInfo.getZhiYearGuaName()
        + "<br><br>";
    MC_HuangJiJingShiInfo.innerHTML = infoStr;
}
;
function MC_Sun_Moon_Rise_Fall_Info(jd, longValue, latValue, timeZoneValue) {
    SunMoonRiseFallObject.calcRTS(jd, 1, longValue, latValue, timeZoneValue);
    let sTemp = "";
    let ob = SunMoonRiseFallObject.rts[0];
    sTemp = '日出 <font color=#FF0000>' + ob.s + '</font> 日落 ' + ob.j + ' 中天 ' + ob.z + '<br>';
    sTemp += '月出 ' + ob.Ms + ' 月落 ' + ob.Mj + ' 月中 ' + ob.Mz + '<br>';
    sTemp += '晨起天亮 ' + ob.c + ' 晚上天黑 ' + ob.h + '<br>';
    sTemp += '日照时间 ' + ob.sj + ' 白天时间 ' + ob.ch + '<br>';
    return sTemp;
}
