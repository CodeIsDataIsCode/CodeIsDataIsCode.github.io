"use strict";
//此脚本为月历工具页面的专用函数
//JD值转年月日时
function JD2DateCalShow(jd) {
    let str1 = '<br>原混合算法：', str2 = '', str3 = '';
    let dateTemp1 = new Object();
    let dateTemp2 = new Object();
    if (jd < 0) {
        str1 = '不能为负';
    }
    else {
        str1 += JD.JD2str(jd); //调用_JD_类中的函数
        dateTemp1 = JD.JD2GCDate_2(jd);
        dateTemp2 = JD.JD2JCDate_2(jd);
        str2 = '<br>新的格里历转换：' + dateTemp1.year + '-' + dateTemp1.month + '-' + dateTemp1.day;
        str3 = '<br>新的儒略历转换：' + dateTemp2.year + '-' + dateTemp2.month + '-' + dateTemp2.day;
    }
    GJ1_out.innerHTML = str1 + str2 + str3;
}
//年月日时转JD值
function Date2JDCalShow(fs) {
    let jd1 = JD.jc_gc_Date2JD(year2Ayear(GJ1_y.value), GJ1_m.value - 0, (GJ1_d.value - 0) + timeStr2hour(GJ1_t.value) / 24);
    let jd2 = JD.gcDate2JD(year2Ayear(GJ1_y.value), GJ1_m.value - 0, (GJ1_d.value - 0) + timeStr2hour(GJ1_t.value) / 24);
    let jd3 = JD.jcDate2JD(year2Ayear(GJ1_y.value), GJ1_m.value - 0, (GJ1_d.value - 0) + timeStr2hour(GJ1_t.value) / 24);
    //日期加上一个偏移量
    if (fs == 1) {
        jd1 -= GJ1_jd.value - 0;
        if (jd1 >= 0)
            jd1 += '(' + JD.JD2str(jd1) + ')';
    }
    //年内积日
    if (fs == 2)
        jd1 -= JD.JD(year2Ayear(GJ1_y.value), 1, 1.5) - 1;
    //两个日期相减
    if (fs == 3) {
        jd1 -= JD.JD(year2Ayear(GJ1_y2.value), GJ1_m2.value - 0, (GJ1_d2.value - 0) + timeStr2hour(GJ1_t2.value) / 24);
    }
    GJ1_out.innerHTML = '<br>原混合算法：' + Number(jd1).toFixed(5);
    GJ1_out.innerHTML += '<br>新 GC 算法：' + Number(jd2).toFixed(5);
    GJ1_out.innerHTML += '<br>新 JC 算法：' + Number(jd3).toFixed(5);
}
