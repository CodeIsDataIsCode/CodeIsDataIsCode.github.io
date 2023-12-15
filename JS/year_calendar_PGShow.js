"use strict";
/**********************
年历面页生成
**********************/
//dy起始年份偏移数，0為當年，-1為上年，1為明年；
function getNianLi(dy = 0) {
    let year = year2Ayear(YearCalYearText.value);
    //检查输入值
    if (year == -10000) {
        alert('getNianLi()：到底了');
        return;
    }
    year += dy;
    //加上偏移年数
    //YearCalYearText.value = Ayear2year(year);
    YearCalYearText.value = year;
    if (year < -10000) {
        alert('getNianLi()：到底了');
        return;
    }
    //检查输入值
    /*
    if(YearCalInfoOption.checked) YearCalOutArea.innerHTML = Ayear2year(y)+'年<br>'+nianLiHTML(y, '');
    else  YearCalOutArea.innerHTML = Ayear2year(y)+'年<br>'+nianLi2HTML(y, '');
    */
    if (YearCalInfoOption.checked) {
        YearCalOutArea.innerHTML = nianLiHTML(year, '|', "  ,");
        YearCalOutArea.innerHTML += "<hr>" + nianLi2HTML(year, '/', "  ,");
    }
    else
        YearCalOutArea.innerHTML = nianLi2HTML(year, '/', "  ,");
}
//dy起始年份偏移数
function getNianLiN() {
    let year = year2Ayear(YearCalYearText.value);
    let yearNum = parseInt(YearCalYearNumText.value);
    if (year == -10000) { //检查输入值
        alert("getNianLiN()年数选择超出范围：选择了年数为" + yearNum);
        return;
    }
    if (yearNum < 1 || yearNum > 500) {
        alert("getNianLiN()年数选择超出范围：选择了年数为" + yearNum);
        return;
    }
    let i, str = '';
    /* 旧版的年历输出：
    for(i=0;i<n;i++){
        if(YearCalInfoOption.checked) s += Ayear2year(y+i)+'年<br>'+nianLiHTML(y+i, '');
        else               s += Ayear2year(y+i)+'年<br>'+nianLi2HTML(y+i);
    }
    */
    //时刻/干支
    for (let i = 0; i < yearNum; i++) {
        if (YearCalInfoOption.checked)
            str += nianLiHTML(year + i, ' | ', " % ");
        else
            str += nianLi2HTML(year + i, " / ", " | ");
        str += "<hr>";
    }
    YearCalOutArea.innerHTML = str;
}
/********************
年历HTML生成
*********************/
/*
html年历生成：生成时刻选项的
年+农历月公历日期+对应农历月的节气公历日期（具体的时刻）信息
*/
function nianLiHTML(year, delimiter1 = "|", delimiter2 = "%") {
    //shuoJD精朔日期,shuoLowJD朔低进度日期，qiLowJD节气日期，qiJD节气精确日期，shuoMonthNo朔月的编号
    let shuoJD, shuoLowJD, qiJD, qiLowJD, shuoMonthNo;
    let s = '', s1 = '', s2 = '';
    gQiShuoBase.calcY(int2((year - 2000) * 365.2422 + 180)); //排定当年农历月序
    for (let i = 0; i < 14; i++) {
        if (gQiShuoBase.HeShuo[i + 1] > gQiShuoBase.MidQi[24])
            break; //已包含下一年的冬至
        shuoLowJD = gQiShuoBase.HeShuo[i];
        shuoJD = gLCalendarBase.shuoAccurate2(shuoLowJD); //利用粗略的合朔日，重新计算精确的朔日时间
        shuoMonthNo = getShuoMonthNo(shuoJD + J2000); //朔月所在的编号,从BC4713开始
        //s1 =  shuoLowJD + '/' + shuoJD +  '/';		//调试用，可删除
        s1 = '第' + shuoMonthNo + '个朔,';
        if (gQiShuoBase.LunarLeapMonth && i == gQiShuoBase.LunarLeapMonth)
            s1 += JD.JD2str(shuoJD + J2000).slice(0, 6 + 5 + 10) + ",闰";
        else
            s1 += JD.JD2str(shuoJD + J2000).slice(0, 6 + 5 + 10) + ",    ";
        s1 += gQiShuoBase.LunarMonthName[i];
        if (s1.length < 3)
            s1 += '月';
        s1 += (gQiShuoBase.LunarMonthDayNum[i] > 29 ? '月大' : '月小');
        if (int2(shuoJD + 0.5) != shuoLowJD)
            s2 = '<font color=#FF0000>' + s2 + '</font>';
        //v=(v+0.5+J2000)%1; if(v>0.5) v=1-v; if(v<8/1440) s2 = '<u>'+s2+'</u>'; //对靠近0点的加注
        s1 += s2 + delimiter1;
        for (let j = -2; j < 24; j++) {
            if (j >= 0)
                qiLowJD = gQiShuoBase.MidQi[j];
            if (j == -1)
                qiLowJD = gQiShuoBase.MidQi.pe1;
            if (j == -2)
                qiLowJD = gQiShuoBase.MidQi.pe2;
            qiJD = gLCalendarBase.qiAccurate2(qiLowJD); //利用粗略的节气日，重新计算精确的节气日时间
            if (qiLowJD < shuoLowJD || qiLowJD >= gQiShuoBase.HeShuo[i + 1])
                continue;
            s1 += '&nbsp;&nbsp;' + delimiter2 + JD.JD2str(qiJD + J2000).slice(6, 6 + 5 + 10) + " " + jieQiName[(j + 24) % 24] + ' ';
            if (int2(qiJD + 0.5) != qiLowJD)
                s2 = '<font color=#FF0000>' + s2 + '</font>';
            //v=(v+0.5+J2000)%1; if(v>0.5) v=1-v; if(v<8/1440) s2 = '<u>'+s2+'</u>'; //对靠近0点的加注
            s1 += s2 + delimiter1; //原正确的语句，调试后可以改用
            //s1 += s2 + qiLowJD + '/' + qiJD + delimiter1;	//为调试合气的数值
        }
        s += s1 + '<br>';
    }
    return s;
}
/*
html年历生成：生成干支选项的;
年+农历月日干支-公历日期+对应农历月的节气公历-农历日-干支日期信息
*/
function nianLi2HTML(year, delimiter1 = " | ", delimiter2 = "%") {
    let i, j, shuoJD, qiJD, qi, s = '', s1 = '', s2 = '';
    gQiShuoBase.calcY(int2((year - 2000) * 365.2422 + 180)); //排定当年农历月序
    for (i = 0; i < 14; i++) {
        //已包含下一年的冬至
        if (gQiShuoBase.HeShuo[i + 1] > gQiShuoBase.MidQi[24])
            break;
        if (gQiShuoBase.LunarLeapMonth && i == gQiShuoBase.LunarLeapMonth)
            s1 = year.toString() + ' |闰';
        else
            s1 = year.toString() + ' |';
        s1 += gQiShuoBase.LunarMonthName[i];
        if (s1.length < 3)
            s1 += '月';
        s1 += gQiShuoBase.LunarMonthDayNum[i] > 29 ? '月大' : '月小';
        shuoJD = gQiShuoBase.HeShuo[i] + J2000; //朔日JD
        s1 += delimiter1 + "(" + JD.JD2str(shuoJD).slice(6, 6 + 5) + tianGanName[(shuoJD + 9) % 10] + diZhiName[(shuoJD + 1) % 12] + "日)";
        //s1 += delimiter1 ;
        for (j = -2; j < 24; j++) {
            if (j >= 0)
                qi = gQiShuoBase.MidQi[j];
            if (j == -1)
                qi = gQiShuoBase.MidQi.pe1;
            if (j == -2)
                qi = gQiShuoBase.MidQi.pe2;
            if (qi < gQiShuoBase.HeShuo[i] || qi >= gQiShuoBase.HeShuo[i + 1])
                continue;
            qiJD = qi + J2000;
            s1 += delimiter2 + JD.JD2str(qi + J2000).slice(6, 6 + 5) + lunarDayName[qiJD - shuoJD] + tianGanName[(qiJD + 9) % 10] + diZhiName[(qiJD + 1) % 12] + "日";
            s1 += "(" + jieQiName[(j + 24) % 24] + ")";
        }
        s += s1 + '<br>';
    }
    return s;
}
