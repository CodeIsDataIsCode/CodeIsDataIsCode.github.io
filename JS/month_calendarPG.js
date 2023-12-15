"use strict";
//显时本月第n日的摘要信息。调用前应先执月历页面生成，产生有效的lunDay对象
function thisDayInfoShow1(thisDayNum) {
    //console.log("thisDayInfoShow1()thisDayNum:" + thisDayNum + "/thisMonthWeek:" + thisMonthWeek);
    //thisMonthWeek 本月1日的星期几，周日为0，周六为6；thisDayNum：1号为0，
    if ((thisDayNum >= thisMonthWeek) && (thisDayNum <= (thisMonthWeek + thisMonthDayNum + 1))) {
        thisDayInfoShow((thisDayNum - thisMonthWeek));
    }
}
/**********************
日历(某日)信息页面生成
**********************/
//显时本月第n日的摘要信息。调用前应先执月历页面生成，产生有效的lun对象
function thisDayInfoShow(thisDayNum) {
    //如果按住ctrl键不放，再将鼠标移出日历区，即可保持该日信息摘要不变；
    //console.log("thisDayInfoShow()thisDayNum:" + thisDayNum);
    if (event) {
        //console.log("按下的键位为：" + 'opp');
        if (event.ctrlKey)
            return;
    }
    if (!oLunarGlobal.dn || (thisDayNum >= oLunarGlobal.dn))
        return;
    let longTemp = Number(MC_LongSelText.value);
    let latTemp = Number(MC_LatSelText.value);
    let timeZoneTemp = Number(MC_TimeZoneText.value);
    //console.log("thisDayInfoShow()-經度:"+longTemp+"/緯度:" +latTemp +"/時區:" +timeZoneTemp);
    let cal5StrTemp = "";
    //初始化时候，生成日落日出信息
    if (thisDayNum == -2) {
        cal5StrTemp = MC_Sun_Moon_Rise_Fall_Info(curRegionJD_2K, longTemp, latTemp, timeZoneTemp);
        MonthCalSunRiseFallInfo.bak = MonthCalSunRiseFallInfo.innerHTML;
    }
    if (thisDayNum < 0) {
        return;
    }
    //显示月第n日的日期信息
    let ob = oLunarGlobal.lunDay[thisDayNum];
    let str = "";
    cal5StrTemp = MC_Sun_Moon_Rise_Fall_Info(ob.d0, longTemp, latTemp, timeZoneTemp);
    //console.log("thisDayInfoShow()传入的日期为："	+	ob.d0+'/当前时区：'+timeZoneTemp);
    MonthCalSunRiseFallInfo.innerHTML = cal5StrTemp;
    MonthCalSunRiseFallInfo.bak = cal5StrTemp;
    MonthCalSunRiseFallInfo.style.display = '';
    //鼠标移过日期上方
    //if(window.event && window.event.srcElement.tagName=='SPAN')
    if (window.event) {
        //公历的年月日
        str = "";
        MC_ThisDayText.value = ob.di + 1;
        str = "格里历: " + Ayear2year(ob.Year) + (JD.setGCYearLeap(ob.Year) ? "闰年" : "年") + ob.Month + '月' + ob.Day + '日(共' + ob.dn + '天)' + '<br>';
        str += "儒略历: " + Ayear2year(ob.Year) + (JD.setJCYearLeap(ob.Year) ? "闰年" : "年") + '<br>';
        //年干支、周几、星座，Lyear2干支纪年(立春)，ob.Lyear3干支纪年(春节)
        str += ob.Lyear2 + '立春年/' + ob.Lyear3 + '春节年 ' + gWeekMidName[ob.week] + ' ' + ob.Constellation + '<br>';
        //黄帝纪年数、农历月、农历日
        str += "农历: " + ob.Lyear4 + '年 ' + ob.Lleap + ob.Lmc + '月' + (ob.Ldn > 29 ? '大 ' : '小 ') + ob.Ldc + '日' + "<br>";
        //干支纪年的年柱、月柱、日柱
        str += "干支: " + ob.Lyear2 + '年 ' + ob.Lmonth2 + '月 ' + ob.Lday2 + '日<br>';
        //回历信息
        str += '回历: ' + ob.Hyear + '年' + ob.Hmonth + '月' + ob.Hday + '日<br>';
        //JD信息
        str += 'JD: ' + (ob.d0 + J2000) + ' / JD2K=' + ob.d0 + '<br>';
        //节气、朔望、假日、三伏、三九等信息
        if (ob.MoonPhase)
            str += ob.MoonPhase + ' ' + ob.MoonPhaseTime + ' ';
        if (ob.JieQi)
            str += '节气：' + ob.JieQi + ' ' + ob.JieQiTime + '<br>';
        else {
            if (ob.LJieQi)
                str += ob.LJieQi + '<br>';
        }
        //先显示再传值屏幕流畅，显示每日详细信息在表格中
        MonthCalThisDayInfo.innerHTML = str;
    }
}
//双击本月第n日的时候，跳转到上月或者下月
function thisMonthDBChang(thisDayNum) {
    //console.log("thisMonthDBChang()thisDayNum:" + thisDayNum);
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
    //console.log("thisMonthDBChang()MC_ThisYearText.value:" + MC_ThisYearText.value + "/MC_ThisMonthText.value:"+MC_ThisMonthText.value);
    getLunarMonthPG(yearTemp, monthTemp);
}
/**********************
月历页面生成
**********************/
//月历页面生成
function getLunarMonthPG(yearNum, monthNum) {
    //console.log("getLunarMonthPG()yearNum:" + yearNum +"/monthNum:" + monthNum);
    if (monthNum == -10000) {
        console.log("月数为：" + monthNum);
        return;
    }
    //月历未计算
    if (!oLunarGlobal.dn || oLunarGlobal.Year != yearNum || oLunarGlobal.Month != monthNum) {
        //console.log("getLunarMonthPG()oLunarGlobal.dn:" + oLunarGlobal.dn + "/oLunarGlobal.year:" + parseInt(oLunarGlobal.Year) +"/oLunarGlobal.month:" + oLunarGlobal.Month);
        //oLunarGlobal.calendarHTML(yearNum,monthNum,curRegionJD_2K);
        oLunarGlobal.calendarInfoCalc(yearNum, monthNum, curRegionJD_2K);
        MonthCalendarTitle.innerHTML = oLunarGlobal.titleInfo; //年号行信息
        MonthCalendarYuanYunInfo.innerHTML = sanYuanSysTemp.getYunName(yearNum); //三元九运信息
        MonthCalOutArea.innerHTML = oLunarGlobal.calendarInfo;
        MonthCalQiShuoInfo.innerHTML = oLunarGlobal.qiShuoInfo;
    }
    //生成具体的每日信息
    thisDayInfoShow(-2);
}
/********************
升降计算等
*********************/
//升降计算,使用北时时间,tz=-8指东8区,jd+tz应在当地正午左右(误差数小时不要紧)
function MC_Sun_Moon_Rise_Fall_Info(jd, longValue, latValue, timeZoneValue) {
    //console.log("MC_Sun_Moon_Rise_Fall():" +jd+ "/" + longValue+ "/"+latValue+ "/"+timeZoneValue+ "/");
    SunMoonRiseFallObject.calcRTS(jd, 1, longValue, latValue, timeZoneValue);
    let sTemp = "";
    let ob = SunMoonRiseFallObject.rts[0];
    // JD.setJD2YMD(jd+J2000);
    sTemp = '日出 <font color=#FF0000>' + ob.s + '</font> 日落 ' + ob.j + ' 中天 ' + ob.z + '<br>';
    sTemp += '月出 ' + ob.Ms + ' 月落 ' + ob.Mj + ' 月中 ' + ob.Mz + '<br>';
    sTemp += '晨起天亮 ' + ob.c + ' 晚上天黑 ' + ob.h + '<br>';
    sTemp += '日照时间 ' + ob.sj + ' 白天时间 ' + ob.ch + '<br>';
    return sTemp;
}
