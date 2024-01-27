"use strict";
function QS_shuoCalcPageShow(angle) {
    if (angle == -1)
        angle = parseFloat(QS_AngleText.value);
    let earthMoonDist, T, shuoMonthNo;
    let dateDelimiter = ',';
    let headStr = angle.toString() + "度朔望JD值" + dateDelimiter + "年" + "-月" + "-日" + dateDelimiter + "时" + "<br>";
    let s2 = " ";
    let y = year2Ayear(QS_ThisYearText.value) - 2000;
    let countNum = QS_ItemNumText.value - 0;
    let thisYearShuoNo = int2((y * 365.2422) / 29.53058886);
    let jdShuo = 0;
    let lastShuoJD = 0;
    let JD_Diff = 0;
    for (let i = 0; i < countNum; i++) {
        T = Sun_Moon_Ephemeris.MS_aLon_t((thisYearShuoNo + i + angle / 360) * 2 * Math.PI);
        earthMoonDist = XL1_calc(2, T, -1);
        jdShuo = (T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525));
        if (i > 0)
            JD_Diff = jdShuo - lastShuoJD;
        shuoMonthNo = getShuoMonthNo(jdShuo);
        s2 += shuoMonthNo + '号朔月,' + jdShuo.toFixed(5) + dateDelimiter + JD.JD2str(jdShuo).dateTimeStr;
        s2 += ' (' + JD_Diff.toFixed(5) + ')';
        s2 += '/L=' + earthMoonDist.toFixed(0) + "Km";
        s2 += "<br>";
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
        lastShuoJD = jdShuo;
    }
    QiShuoInfoArea.innerHTML = headStr + s2;
}
function QS_qiCalcPageShow() {
    let T, lastT, nextT, W;
    let funNo = Number(QS_JieQiCalModeList.value);
    let headStr = "";
    let qiInfoStr = "";
    let titleStr = "定24节气表：JD----公历日期----公历日期字符串----节气名----视黄经<br><hr>";
    let year = year2Ayear(QS_ThisYearText.value);
    let yearFrom2k = year - 2000;
    let allNum = parseInt(QS_ItemNumText.value);
    let jdTemp, lastJD, lastJD1, nextJD1;
    let huangLong = 0;
    let dt_JD = 0, dt_JD1 = 0, dt_JD2 = 0, dt_JD3 = 0;
    let last_dt_JD = 0;
    let huangLongStart = (year + 4712) * 360;
    let thisLong = parseFloat(QS_JieQiList.value);
    if (thisLong == -361) {
        thisLong = (parseFloat(QS_AngleText.value)) % 360;
    }
    if (funNo == 1) {
        for (let i = 0; i < allNum; i++) {
            T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i - 6) * 15 / 360 + 1) * 2 * Math.PI);
            jdTemp = T * 36525 + J2000 - dt_T(T * 36525);
            if (i == 0) {
                dt_JD = 0;
            }
            else {
                dt_JD = jdTemp - lastJD;
            }
            lastJD = jdTemp;
            huangLong = i * 15 - 90 + huangLongStart;
            W = Math.floor(huangLong / 360);
            qiInfoStr += jieQiName[(i) % 24] + ',' + jdTemp.toFixed(16) + ',(差：' + dt_JD.toFixed(3)
                + '),<font style="font-size: 12px; color:#FF0000">' + JD.JD2str(jdTemp, 8, 0).fullStr1
                + '</font>（视黄经：' + huangLong + '° / ' + W + '圈' + (huangLong % 360 + 360) % 360 + '°）' + '<br>';
        }
    }
    else if (funNo == 2) {
        for (let i = 0; i < allNum; i++) {
            T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i - 3) * 30 / 360 + 1) * 2 * Math.PI);
            jdTemp = T * 36525 + J2000 - dt_T(T * 36525);
            if (i == 0) {
                dt_JD = 0;
            }
            else {
                dt_JD = jdTemp - lastJD;
            }
            lastJD = jdTemp;
            huangLong = i * 15 - 90 + huangLongStart;
            W = Math.floor(huangLong / 360);
            qiInfoStr += jieQiName[(2 * i) % 24] + ',' + jdTemp.toFixed(16) + ',(差：' + dt_JD.toFixed(3)
                + '),<font style="font-size: 12px; color:#FF0000">' + JD.JD2str(jdTemp, 8).fullStr0
                + '</font>（视黄经：' + huangLong + '° / ' + W + '圈' + (huangLong % 360 + 360) % 360 + '°）' + '<br>';
        }
    }
    else if (funNo == 3) {
        for (let i = 0; i < allNum; i++) {
            T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + ((i - 3) * 30 + 15) / 360 + 1) * 2 * Math.PI);
            jdTemp = T * 36525 + J2000 - dt_T(T * 36525);
            if (i == 0) {
                dt_JD = 0;
            }
            else {
                dt_JD = jdTemp - lastJD;
            }
            lastJD = jdTemp;
            huangLong = i * 15 - 90 + huangLongStart;
            W = Math.floor(huangLong / 360);
            qiInfoStr += jieQiName[(2 * i + 1) % 24] + ',' + jdTemp.toFixed(16) + ',(差：' + dt_JD.toFixed(3)
                + '),<font style="font-size: 12px; color:#FF0000">' + JD.JD2str(jdTemp, 8, 0).fullStr0
                + '</font>（视黄经：' + huangLong + '° / ' + W + '圈' + (huangLong % 360 + 360) % 360 + '°）' + '<br>';
        }
    }
    else if (funNo == 4) {
        for (let i = 0; i < allNum; i++) {
            T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 360 + thisLong) / 360 + 1) * 2 * Math.PI);
            jdTemp = T * 36525 + J2000 - dt_T(T * 36525);
            lastT = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 360 - 15 + thisLong) / 360 + 1) * 2 * Math.PI);
            lastJD1 = lastT * 36525 + J2000 - dt_T(lastT * 36525);
            nextT = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 360 + 15 + thisLong) / 360 + 1) * 2 * Math.PI);
            nextJD1 = nextT * 36525 + J2000 - dt_T(nextT * 36525);
            if (i == 0) {
                dt_JD = 0;
            }
            else {
                dt_JD = jdTemp - lastJD;
            }
            lastJD = jdTemp;
            dt_JD1 = jdTemp - lastJD1;
            dt_JD2 = nextJD1 - jdTemp;
            dt_JD3 = nextJD1 - lastJD1;
            huangLong = i * 360 + thisLong + huangLongStart;
            W = year + 4713 + i;
            qiInfoStr += jdTemp.toFixed(16) + ',(差：' + dt_JD.toFixed(5) + '/' + dt_JD1.toFixed(4) + '/' + dt_JD2.toFixed(4)
                + '/' + dt_JD3.toFixed(5) + '),<font style="font-size: 12px; color:#FF0000">'
                + JD.JD2str(jdTemp, 8, 0).fullStr1 + '</font>,（视黄经：' + huangLong + '° / ' + W + '圈' + thisLong + '°）' + '<br>';
        }
    }
    else if (funNo == 5) {
        for (let i = 0; i < allNum; i++) {
            T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 180 + thisLong) / 360 + 1) * 2 * Math.PI);
            jdTemp = T * 36525 + J2000 - dt_T(T * 36525);
            lastT = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 180 - 180 + thisLong) / 360 + 1) * 2 * Math.PI);
            lastJD1 = lastT * 36525 + J2000 - dt_T(lastT * 36525);
            dt_JD = jdTemp - lastJD1;
            if (i > 0) {
                dt_JD1 = dt_JD - last_dt_JD;
            }
            else {
                dt_JD1 = 0;
            }
            last_dt_JD = dt_JD;
            huangLong = i * 180 + thisLong + huangLongStart;
            W = year + 4713 + i;
            qiInfoStr += jieQiName[(12 * i + 30 + int2(thisLong / 15)) % 24] + ',' + jdTemp.toFixed(16) + ',(差：' + dt_JD.toFixed(4)
                + ' / ' + dt_JD1.toFixed(4) + '),<font style="font-size: 12px; color:#FF0000">'
                + JD.JD2str(jdTemp, 8, 0).fullStr1 + '</font>,（视黄经：' + huangLong + '° / ' + W + '圈' + huangLong % 360 + '°）'
                + '<br>';
        }
    }
    else if (funNo == 6) {
        for (let i = 0; i < allNum; i++) {
            T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 90 + thisLong) / 360 + 1) * 2 * Math.PI);
            jdTemp = T * 36525 + J2000 - dt_T(T * 36525);
            if (i == 0) {
                dt_JD = 0;
                dt_JD1 = 0;
            }
            else {
                dt_JD = jdTemp - lastJD;
                dt_JD1 = dt_JD - last_dt_JD;
            }
            lastJD = jdTemp;
            last_dt_JD = dt_JD;
            huangLong = i * 90 + thisLong + huangLongStart;
            W = year + 4713 + i;
            qiInfoStr += jieQiName[(6 * i + 30 + int2(thisLong / 15)) % 24] + ',' + jdTemp.toFixed(16) + ',(差：' + dt_JD.toFixed(4)
                + ' / ' + dt_JD1.toFixed(4) + '),<font style="font-size: 12px; color:#FF0000">'
                + JD.JD2str(jdTemp, 8, 0).fullStr1 + '</font>,（视黄经：' + huangLong + '° / ' + W + '圈' + huangLong % 360 + '°）'
                + '<br>';
        }
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + qiInfoStr;
}
function QS_earthMinRPageShow() {
    let titleStr = "近日点：JD(近日点年长，冬至JD差)----近日点公历日期(两点之差JD长)----远日点公历日期(两点半径大小)--<br><hr>";
    let infoStr = "";
    let headStr = "";
    let year = year2Ayear(QS_ThisYearText.value);
    let yearFrom2k = year - 2000;
    let T_From2k = yearFrom2k / 100.0;
    let T_JieQi = 0, dt_JD = 0, dt_JD1 = 0, dt_JD_JieQi = 0;
    let allNum = parseInt(QS_ItemNumText.value);
    let perihelionData = new Array(0, 1);
    let aphelionData = new Array(0, 1);
    let jd0 = 0, jd1 = 0, jd_JieQi = 0;
    let last_JD0 = 0;
    let dist0 = 0, dist1 = 0, dist3 = 0;
    for (let i = 0; i < allNum; i++) {
        perihelionData = Sun_Moon_Ephemeris.earthMinR(T_From2k + (i + 0.4) / 100.0, true);
        aphelionData = Sun_Moon_Ephemeris.earthMinR(T_From2k + (i + 0.6) / 100.0, false);
        T_JieQi = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i * 360 - 90) / 360.0 + 1.0) * 2 * Math.PI);
        jd_JieQi = T_JieQi * 36525 + J2000 - dt_T(T_JieQi * 36525);
        jd0 = perihelionData[0] * 36525 + J2000 - dt_T(perihelionData[0] * 36525);
        dist0 = perihelionData[1];
        jd1 = aphelionData[0] * 36525 + J2000 - dt_T(aphelionData[0] * 36525);
        dist1 = aphelionData[1];
        dt_JD_JieQi = jd0 - jd_JieQi;
        dt_JD1 = jd1 - jd0;
        dist3 = dist0 + dist1;
        if (i == 0) {
            dt_JD = 0;
        }
        else {
            dt_JD = jd0 - last_JD0;
        }
        last_JD0 = jd0;
        infoStr += jd0.toFixed(16) + '(差：' + dt_JD.toFixed(5) + ',冬至差：' + dt_JD_JieQi.toFixed(5) + '), ' + JD.JD2str(jd0, 0, 0).dateTimeStr
            + ' ,(' + dt_JD1.toFixed(5) + '),   ' + JD.JD2str(jd1, 0, 0).fullStr1
            + '(' + dist0.toFixed(5) + ' / ' + dist1.toFixed(5) + ' / ' + dist3.toFixed(7) + ")<br>";
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + infoStr;
}
function QS_ganZhiYearPageShow(year) {
    let T;
    let titleStr = "定基督纪年年干支（立春节气点）的开始日期表<br><hr>";
    let headStr = "----<以立春节气点定寅月>----<br>";
    let s2 = "";
    let yearFrom2k = year - 2000.0;
    let allNum = parseInt(QS_ItemNumText.value);
    let jdTemp = 0;
    for (let i = 0; i < allNum; i++) {
        T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + i + 0.87500) * 2 * Math.PI);
        jdTemp = T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525);
        s2 += JD.getYearGanZhi(year + i).LCYName2 + JD.getYMD2MGanZhi(year + i).MGanZhiName + ', ';
        s2 += jdTemp.toFixed(16) + ',' + JD.JD2str(jdTemp).fullStr0 + '<br>';
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + s2;
}
function QS_houCalcPageShow() {
    let T = 0;
    let headStr = '&nbsp;&nbsp;&nbsp;&nbsp;初候　　　　　　　　　　　　　　二候　　　　　　　　　　　　三候';
    let s1 = '', s2 = '';
    let year = year2Ayear(QS_ThisYearText.value) - 2000;
    let n = QS_ItemNumText.value - 0;
    let JDtemp = 0, lastJD = 0, dt_JD = 0;
    for (let i = 0; i < n * 3; i++) {
        T = Sun_Moon_Ephemeris.S_aLon_t((year + i * 5 / 360 + 1) * 2 * Math.PI);
        JDtemp = T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525);
        s1 = JD.JD2str(JDtemp).fullStr0;
        if (i > 0) {
            dt_JD = JDtemp - lastJD;
        }
        lastJD = JDtemp;
        if (i % 3 == 0)
            s2 += '<br>' + s1.slice(0, 5) + '年, ' + jieQiName[(i / 3 + 6) % 24] + ', ';
        else
            s2 += '　';
        s2 += s1.slice(6, 21) + '(差：' + dt_JD.toFixed(5) + '), ';
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
    }
    QiShuoInfoArea.innerHTML = headStr + s2;
}
function QS_constellationPageShow() {
    let T;
    let headStr = "-------<br>";
    let s2 = "";
    let titleStr = "定特定太阳星座(黄道十二星座)的干支年的开始日期表<br><hr>";
    let yearFrom2k = year2Ayear(QS_ThisYearText.value) - 2000.0;
    let allNum = parseInt(QS_ItemNumText.value);
    let jdTemp = 0, lastJD = 0, dt_JD = 0;
    for (let i = 0; i < allNum; i++) {
        T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i - 3) * 30 / 360 + 1) * 2 * Math.PI);
        jdTemp = T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525);
        if (i == 0) {
            dt_JD = 0;
        }
        else {
            dt_JD = jdTemp - lastJD;
        }
        s2 += constellationFullName[i % 12] + ",  " + jdTemp.toFixed(16) + '(差:' + dt_JD.toFixed(4) + '),' + JD.JD2str(jdTemp).fullStr0;
        s2 += '<br>';
        lastJD = jdTemp;
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + s2;
    ;
}
