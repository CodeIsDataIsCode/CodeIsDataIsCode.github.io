"use strict";
//====================气朔表===================
//定朔测试函数
function shuoCalcPageShow(angle) {
    //任意角度
    if (angle == -1)
        angle = prompt("请输入角度(0朔,90上弦,180望,270下弦,或其它):", 0) - 0;
    let earthMoonDist, T, shuoMonthNo;
    let dateDelimiter = ','; //jd数值 和 日期之间的分隔符
    //var s = "月-日黄经差"+jiao+"<br>";
    let headStr = "<br>" + angle.toString() + "度朔望JD值" + dateDelimiter + "年" + "-月" + "-日" + dateDelimiter + "时" + "<br>";
    let s2 = "";
    let y = year2Ayear(QiShuoCalcPGThisYearText.value) - 2000; //从2000年开始的年数
    let countNum = QiShuoCalcNumText.value - 0; //共计算多少组数据
    let thisYearShuoNo = int2(y * (365.2422 / 29.53058886)); //截止当年首经历朔望的个数
    let jdShuo = 0; //当前朔望的JD数值
    let lastShuoJD = 0; //上一个朔望JD数值
    let JD_Diff = 0; //两个JD之间的差值
    for (let i = 0; i < countNum; i++) {
        T = Sun_Moon_Ephemeris.MS_aLon_t((thisYearShuoNo + i + angle / 360) * 2 * Math.PI); //精确时间计算,入口参数是当年各朔望黄经
        earthMoonDist = XL1_calc(2, T, -1); //计算月亮和地球之间的距离
        jdShuo = (T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525)); //转化为北京时间
        if (i > 0)
            JD_Diff = jdShuo - lastShuoJD;
        shuoMonthNo = getShuoMonthNo(jdShuo); //朔月所在的编号,从BC4713开始
        //s2 += jdShuo.toString()+','+JD.JD2str( jdShuo )+','+r.toFixed(2)+"千米<br>";
        //日期转为字串    .toFixed()和.toString()的区别,.toFixed(5),可调整输出小数点位数，最高16位
        //在输出时间和纪年信息长度上不同
        //s2 += shuoMonthNo + '号朔月,' + jdShuo.toFixed(5) + dateDelimiter + JD.JD2str(jdShuo);
        s2 += shuoMonthNo + '号朔月,' + jdShuo.toFixed(5) + dateDelimiter + JD.JD2str(jdShuo).slice(0, 21);
        s2 += ' (' + JD_Diff.toFixed(5) + ')'; //输出上下两个的长度 29.53058886
        s2 += '/L=' + earthMoonDist.toFixed(0) + "Km"; //地月之间的距离，去掉+earthMoonDist.toFixed(2)+"千米
        s2 += "<br>";
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
        lastShuoJD = jdShuo;
    }
    QiShuoInfoArea.innerHTML = headStr + s2;
}
//定气测试函数，计算和显示24节气的函数
//立春315°，雨水330°，惊蛰345°，春分0°，清明15°
function qiCalcPageShow() {
    let T;
    let headStr = ""; //"-------<br>"
    let qiInfoStr = "";
    let titleStr = "定24节气表<br><hr>";
    let yearFrom2k = year2Ayear(QiShuoCalcPGThisYearText.value) - 2000; //从2000为纪元0年起点
    let allNum = parseInt(QiShuoCalcNumText.value);
    let jdTemp = 0;
    for (let i = 0; i < allNum; i++) {
        //精确节气时间计算，日月星历基本函数类：已知太阳视黄经反求时间，春分为0°，立春为-45°
        T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i - 3) * 15 / 360 + 1) * 2 * Math.PI);
        jdTemp = T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525); //转化为北京时间
        qiInfoStr += jdTemp.toFixed(16) + ',' + JD.JD2str(jdTemp) + ',' + jieQiName[(i + 3) % 24]; //日期转为字串
        //if(i%2==1) s2+=' 视黄经'+(i*15)+'<br>';//输出两个节气
        //if((i+8)%24==1) s2+=',U<br>';
        //调节哪个节气在第一
        qiInfoStr += '<br>';
        //	else s2+=',  '
        if (i % 50 == 0) {
            headStr += qiInfoStr;
            qiInfoStr = "";
        }
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + qiInfoStr;
}
//干支年的开始日期
function ganZhiYearPageShow() {
    let i;
    let T;
    let headStr = "-------<br>";
    let s2 = "";
    let titleStr = "<br>定干支年的开始日期表<br><hr>";
    let yearFrom2k = year2Ayear(QiShuoCalcPGThisYearText.value) - 2000.0; //从2000为纪元0年起点
    let allNum = parseInt(QiShuoCalcNumText.value);
    let jdTemp = 0;
    for (i = 0; i < allNum; i++) {
        T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + i + 0.87500) * 2 * Math.PI); //0.875 = 1 - 45/360
        jdTemp = T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525);
        s2 += jdTemp.toFixed(16) + ',' + JD.JD2str(jdTemp) + ",立春寅月"; //日期转为字串
        s2 += '<br>';
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + s2;
    ;
}
//定候测试函数
function houCalcPageShow() {
    var i, T;
    let headStr = '&nbsp;&nbsp;&nbsp;&nbsp;初候　　　　　　　　　　　　二候　　　　　　　　　三候';
    let s2 = '';
    let y = year2Ayear(QiShuoCalcPGThisYearText.value) - 2000;
    let n = QiShuoCalcNumText.value - 0;
    for (i = 0; i < n * 3; i++) {
        //精确节气时间计算
        T = Sun_Moon_Ephemeris.S_aLon_t((y + i * 5 / 360 + 1) * 2 * Math.PI);
        if (i % 3 == 0)
            s2 += '<br>' + jieQiName[(i / 3 + 6) % 24];
        else
            s2 += '　';
        s2 += JD.JD2str(T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525)); //日期转为字串
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
    }
    QiShuoInfoArea.innerHTML = headStr + s2;
}
//查詢每年的十二星座开始的日期
function constellationPageShow() {
    let i;
    let T;
    let headStr = "-------<br>";
    let s2 = "";
    let titleStr = "<br>定特定太阳星座的干支年的开始日期表<br><hr>";
    let yearFrom2k = year2Ayear(QiShuoCalcPGThisYearText.value) - 2000.0; //从2000为纪元0年起点
    let allNum = parseInt(QiShuoCalcNumText.value);
    let jdTemp = 0;
    for (i = 0; i < allNum; i++) {
        T = Sun_Moon_Ephemeris.S_aLon_t((yearFrom2k + (i - 3) * 30 / 360 + 1) * 2 * Math.PI); //如果只是要某个特定的星座，
        //T = Sun_Moon_Ephemeris.S_aLon_t( (yearFrom2k  + i + 30/360 + 1 )*2*Math.PI );//30是其起始角
        jdTemp = T * 36525 + J2000 + 8 / 24 - dt_T(T * 36525);
        s2 += jdTemp.toFixed(16) + ',' + JD.JD2str(jdTemp) + "," + constellationFullName[i % 12]; //日期转为字串
        s2 += '<br>';
        if (i % 50 == 0) {
            headStr += s2;
            s2 = "";
        }
    }
    QiShuoInfoArea.innerHTML = titleStr + headStr + s2;
    ;
}
