"use strict";
function CLT_thisPageShow(pgNo) {
    if (pgNo == 1) {
        JD_Cal_PG.style.display = '';
        PI_Cal_PG.style.display = 'none';
    }
    else if (pgNo == 2) {
        JD_Cal_PG.style.display = 'none';
        PI_Cal_PG.style.display = '';
    }
}
function CLT_JD2DateCalShow(jd) {
    let MixStr = '原混合算法：', GCDateStr = '', JCDateStr = '', RiGanZhiStr = '';
    let GCDate = new Object();
    let JCDate = new Object();
    let riGanZhi;
    MixStr += JD.JD2str(jd).fullStr1;
    riGanZhi = JD.JD2DayGanZhi(jd);
    GCDate = JD.JD2GCDate(jd);
    JCDate = JD.JD2JCDate(jd);
    GCDateStr = '<br>格里历转换：' + GCDate.year + '-' + GCDate.month + '-' + GCDate.day + ' ' + GCDate.hour + ':' + GCDate.min + ':' + GCDate.sec;
    JCDateStr = '<br>儒略历转换：' + JCDate.year + '-' + JCDate.month + '-' + JCDate.day + ' ' + JCDate.hour + ':' + JCDate.min + ':' + JCDate.sec;
    RiGanZhiStr = '<br>日干支：' + riGanZhi.GanZhiNo + riGanZhi.DGanZhiName + '/' + riGanZhi.GanNo + riGanZhi.Gan + '/' + riGanZhi.ZhiNo + riGanZhi.Zhi;
    CLT_out1.innerHTML = MixStr + GCDateStr + JCDateStr + RiGanZhiStr;
}
function CLT_Date2JDCal(year, month, day, LCLeapFlag = 0, yueJian = 3) {
    let dateJD = new Object();
    dateJD.Mix = JD.jc_gc_Date2JD(year, month, day);
    dateJD.GC = JD.gcDate2JD(year, month, day);
    dateJD.JC = JD.jcDate2JD(year, month, day);
    dateJD.LC = JD.lcDate2JD(year, month, day, LCLeapFlag, yueJian);
    dateJD.Mix_DayNum = JD.getJC_GC_DayNum(year, month, day);
    dateJD.GC_DayNum = JD.getGC_DayNum(year, month, day);
    dateJD.JC_DayNum = JD.getJC_DayNum(year, month, day);
    dateJD.LC_DayNum = 1;
    dateJD.LC2MixDate = JD.JD2str(dateJD.LC).dateTimeStr;
    dateJD.dt_JD1 = dateJD.Mix - dateJD.GC;
    dateJD.dt_JD2 = dateJD.Mix - dateJD.JC;
    dateJD.dt_JD3 = dateJD.Mix - dateJD.LC;
    return dateJD;
}
function CLT_Date2JDInfoShow(lineNum) {
    let jd0 = CLT_jd1.value - 0;
    let year1 = year2Ayear(CLT_year1.value);
    let year2 = year2Ayear(CLT_year2.value);
    let month1 = CLT_MonthSel1.value - 0;
    let month2 = CLT_MonthSel2.value - 0;
    let day1 = (CLT_DaySel1.value - 0) + timeStr2hour(CLT_time1.value) / 24;
    let day2 = (CLT_DaySel2.value - 0) + timeStr2hour(CLT_time2.value) / 24;
    let LCLeapFlag1 = CLT_MonthLeapSel1.value - 0, LCLeapFlag2 = CLT_MonthLeapSel2.value - 0;
    let yueJian1 = CLT_YueJianSel1.value - 0, yueJian2 = CLT_YueJianSel2.value - 0;
    let jd1 = CLT_Date2JDCal(year1, month1, day1, LCLeapFlag1, yueJian1);
    let jd2 = CLT_Date2JDCal(year2, month2, day2, LCLeapFlag2, yueJian2);
    ;
    let jd1_1 = jd1.Mix;
    let jd1_2 = jd1.GC;
    let jd1_3 = jd1.JC;
    let jd1_4 = jd1.LC;
    let jd2_1 = jd2.Mix;
    let jd2_2 = jd2.GC;
    let jd2_3 = jd2.JC;
    let jd2_4 = jd2.LC;
    let dt_JD1_1 = 0, dt_JD1_2 = 0, dt_JD1_3 = 0;
    let dt_JD2_1 = 0, dt_JD2_2 = 0, dt_JD2_3 = 0;
    let dayNum1_0 = 0, dayNum1_1 = 0, dayNum1_2 = 0, dayNum1_3 = 0;
    let dayNum2_0 = 0, dayNum2_1 = 0, dayNum2_2 = 0, dayNum2_3 = 0;
    dt_JD1_1 = jd1.Mix - jd0;
    dt_JD1_3 = jd1.JC - jd1.GC;
    dt_JD2_1 = jd2.Mix - jd0;
    dt_JD2_2 = jd2.Mix - jd1.Mix;
    dt_JD2_3 = jd2.JC - jd2.GC;
    dayNum1_0 = jd1.Mix_DayNum;
    dayNum1_1 = jd1.GC_DayNum;
    dayNum1_2 = jd1.JC_DayNum;
    dayNum1_3 = jd1.LC_DayNum;
    dayNum2_0 = jd1.Mix_DayNum;
    dayNum2_1 = jd2.GC_DayNum;
    dayNum2_2 = jd2.JC_DayNum;
    dayNum2_3 = jd2.LC_DayNum;
    CLT_out2.innerHTML = '原混合算法：' + Number(jd1_1).toFixed(5) + '	(JD差值：' + Number(dt_JD1_1).toFixed(5) + '	年內積日：' + Number(dayNum1_0).toFixed(2) + ')';
    CLT_out2.innerHTML += '<br>新GC算法：' + Number(jd1_2).toFixed(5) + '	(年內積日：' + Number(dayNum1_1).toFixed(2) + ')';
    CLT_out2.innerHTML += '<br>新JC算法：' + Number(jd1_3).toFixed(5) + '	(年內積日：' + Number(dayNum1_2).toFixed(2) + ')(同日期两历法JD差：' + Number(dt_JD1_3).toFixed(2) + ')';
    CLT_out2.innerHTML += '<br>农历LC算法：' + Number(jd1_4).toFixed(5) + '(' + JD.JD2str(jd1_4).dateTimeStr + ')';
    CLT_out3.innerHTML = '原混合算法：' + Number(jd2_1).toFixed(5) + '	(JD差值：' + Number(dt_JD2_1).toFixed(5) + '	年內積日：' + Number(dayNum2_0).toFixed(2) + ')';
    CLT_out3.innerHTML += '<br>新GC算法：' + Number(jd2_2).toFixed(5) + '	(年內積日：' + Number(dayNum2_1).toFixed(2) + ')';
    CLT_out3.innerHTML += '<br>新JC算法：' + Number(jd2_3).toFixed(5) + '	(年內積日：' + Number(dayNum2_2).toFixed(2) + ')(同日期两历法JD差：' + Number(dt_JD2_3).toFixed(2) + ')';
    CLT_out3.innerHTML += '<br>农历LC算法：' + Number(jd2_4).toFixed(5) + '(' + JD.JD2str(jd2_4).dateTimeStr + ')';
    CLT_out3.innerHTML += '<br><br>两日期JD差：' + Number(dt_JD2_2).toFixed(5);
}
function CLT_refreshDate(lineNum) {
    let item1 = storageL.getItem('ThisSelCalendar');
    let item2 = storageL.getItem('ThisSelYear');
    let item3 = storageL.getItem('ThisSelLeapMonth');
    let item4 = storageL.getItem('ThisSelMonth');
    let item5 = storageL.getItem('ThisSelDay');
    let item6 = storageL.getItem('ThisSelYueJian');
    if (lineNum == 1) {
        CLT_CalendarSel1.value = item1;
        CLT_year1.value = item2;
        CLT_MonthLeapSel1.value = item3;
        CLT_MonthSel1.value = item4;
        CLT_DaySel1.value = item5;
        CLT_YueJianSel1.value = item6;
    }
    else if (lineNum == 2) {
        CLT_CalendarSel2.value = item1;
        CLT_year2.value = item2;
        CLT_MonthLeapSel2.value = item3;
        CLT_MonthSel2.value = item4;
        CLT_DaySel2.value = item5;
        CLT_YueJianSel2.value = item6;
    }
}
