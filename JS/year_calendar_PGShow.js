"use strict";
function YC_getNianLi(dy = 0) {
    let year = year2Ayear(YearCalYearText.value);
    if (year == -10000) {
        alert('YC_getNianLi()：到底了');
        return;
    }
    year += dy;
    YearCalYearText.value = year;
    if (year < -10000) {
        alert('YC_getNianLi()：到底了');
        return;
    }
    if (YearCalInfoOption.checked) {
        YearCalOutArea.innerHTML = YC_nianLiHTML(year, '|', "  ,");
        YearCalOutArea.innerHTML += "<hr>" + YC_nianLi2HTML(year, '/', "  ,");
    }
    else
        YearCalOutArea.innerHTML = YC_nianLi2HTML(year, '/', "  ,");
}
function YC_getNianLiN(year, yearNum) {
    if (year == -10000) {
        alert("YC_getNianLiN()年数选择超出范围：选择了年数为" + yearNum);
        return;
    }
    if (yearNum < 1 || yearNum > 5000) {
        alert("YC_getNianLiN()年数选择超出范围（4501）：选择了年数为" + yearNum);
        return;
    }
    let str = '';
    for (let i = 0; i < yearNum; i++) {
        if (YearCalInfoOption.checked)
            str += YC_nianLiHTML(year + i, ' | ', " % ");
        else
            str += YC_nianLi2HTML(year + i, " / ", " | ");
    }
    YearCalOutArea.innerHTML = str;
}
function YC_nianLiHTML(year, delimiter1 = "|", delimiter2 = "%") {
    let shuoJD, shuoLowJD, qiJD, qiLowJD, shuoMonthNo;
    let s = '', s1 = '', s2 = '';
    let pe1JD, pe2JD, MidQiJD0;
    gQiShuoBase.calcY(int2((year - 2000) * 365.2422 + 180));
    pe1JD = gQiShuoBase.MidQi.pe1 + J2000;
    pe2JD = gQiShuoBase.MidQi.pe2 + J2000;
    MidQiJD0 = gQiShuoBase.MidQi[0] + J2000;
    s = '闰月数：' + gQiShuoBase.LunarLeapMonth + ',pe2,';
    s += pe2JD + '(' + JD.JD2str(pe2JD).dateTimeStr.slice(6, 11) + '),pe1,' + pe1JD + '(' + JD.JD2str(pe1JD).dateTimeStr.slice(6, 11) + ')';
    s += ',第一气,' + MidQiJD0 + '(' + JD.JD2str(MidQiJD0).dateTimeStr.slice(6, 11) + '),公元';
    s += year + '年,' + gLCalendarBase.getNianHao(year) + '<br>';
    if (gQiShuoBase.LunarLeapMonth == 1) {
        s = '<font color=red>' + s + '</font>';
    }
    else if (gQiShuoBase.LunarLeapMonth == 12) {
        s = '<font color=blue>' + s + '</font>';
    }
    for (let i = 0; i < 14; i++) {
        if (gQiShuoBase.HeShuo[i + 1] > gQiShuoBase.MidQi[24])
            break;
        shuoLowJD = gQiShuoBase.HeShuo[i];
        shuoJD = gLCalendarBase.shuoAccurate2(shuoLowJD);
        shuoMonthNo = getShuoMonthNo(shuoJD + J2000);
        s1 = shuoMonthNo + ',JD=' + (shuoLowJD + J2000) + ',';
        if (gQiShuoBase.LunarLeapMonth && i == gQiShuoBase.LunarLeapMonth)
            s1 += "<font color=#FF0000>闰</font>";
        else
            s1 += "    ";
        s1 += gQiShuoBase.LunarMonthName[i];
        s1 += (gQiShuoBase.LunarMonthDayNum[i] > 29 ? '月,<font color=#FF0000>大</font>,' : '月,<font color=#0000FF>小</font>,');
        s1 += JD.JD2str(shuoLowJD + J2000).dateTimeStr;
        s2 = '(' + JD.JD2str(shuoJD + J2000).dateTimeStr.slice(9, 21) + ")";
        if (int2(shuoJD + 0.5) != shuoLowJD)
            s2 = '<font color=#FF0000>' + s2 + '</font>';
        s1 += s2;
        for (let j = -2; j < 24; j++) {
            if (j >= 0)
                qiLowJD = gQiShuoBase.MidQi[j];
            if (j == -1)
                qiLowJD = gQiShuoBase.MidQi.pe1;
            if (j == -2)
                qiLowJD = gQiShuoBase.MidQi.pe2;
            qiJD = gLCalendarBase.qiAccurate2(qiLowJD);
            if (qiLowJD < shuoLowJD || qiLowJD >= gQiShuoBase.HeShuo[i + 1])
                continue;
            s1 += ',' + jieQiName[(j + 24) % 24] + "," + JD.JD2str(qiLowJD + J2000).dateTimeStr.slice(6, 6 + 5);
            s2 = '(' + JD.JD2str(qiJD + J2000).dateTimeStr.slice(9, 21) + ")";
            if (int2(qiJD + 0.5) != qiLowJD)
                s2 = '<font color=#FF0000>' + s2 + '</font>';
            s1 += s2;
        }
        s += s1 + '<br>';
    }
    return s;
}
function YC_nianLi2HTML(year, delimiter1 = " | ", delimiter2 = " % ") {
    let shuoJD, qiJD, qi, s = '', s1 = '', s2 = '';
    gQiShuoBase.calcY(int2((year - 2000) * 365.2422 + 180));
    for (let i = 0; i < 14; i++) {
        if (gQiShuoBase.HeShuo[i + 1] > gQiShuoBase.MidQi[24])
            break;
        if (gQiShuoBase.LunarLeapMonth && i == gQiShuoBase.LunarLeapMonth)
            s1 = '<font color=#FF0000>闰</font>';
        else
            s1 = '  ';
        s1 += gQiShuoBase.LunarMonthName[i];
        s1 += gQiShuoBase.LunarMonthDayNum[i] > 29 ? '月,<font color=#FF0000>大</font>' : '月,<font color=#0000FF>小</font>';
        shuoJD = gQiShuoBase.HeShuo[i] + J2000;
        s1 += delimiter1 + "(" + JD.JD2str(shuoJD).dateStr + JD.JD2DayGanZhi(shuoJD).DGanZhiName + ")";
        for (let j = -2; j < 24; j++) {
            if (j >= 0)
                qi = gQiShuoBase.MidQi[j];
            if (j == -1)
                qi = gQiShuoBase.MidQi.pe1;
            if (j == -2)
                qi = gQiShuoBase.MidQi.pe2;
            if (qi < gQiShuoBase.HeShuo[i] || qi >= gQiShuoBase.HeShuo[i + 1])
                continue;
            qiJD = qi + J2000;
            s1 += delimiter2 + JD.JD2str(qi + J2000).dateStr.slice(6, 11) + lunarDayName[qiJD - shuoJD] + JD.JD2DayGanZhi(qiJD).DGanZhiName;
            s1 += "(" + jieQiName[(j + 24) % 24] + ")";
        }
        s += s1 + '<br>';
    }
    return s;
}
