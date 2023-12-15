"use strict";
var funTabPGNo_Selt = 1; //	當前是哪個tab頁面被顯示
/****************
外地时间选择
****************/
//国家或地区改变
function regionSelChange() {
    let i;
    let timeZoneInfoTemp = RegionSel.options[RegionSel.selectedIndex].value;
    timeZoneInfoTemp = timeZoneInfoTemp.split('#');
    RegionSel.v = timeZoneInfoTemp[0]; //地区时差
    RegionSel.rg = timeZoneInfoTemp[1]; //日光节约参数
    curSeltTimeZone = RegionSel.v;
    curSeltDST = RegionSel.rg;
    TimeZoneText.value = curSeltTimeZone;
    //夏令时时区，选择为非
    if (RegionSel.rg) {
        CB_DST.checked = false;
    }
    else {
        CB_DST.checked = true;
    }
    //console.log("regionSelChange()选择的时区："+curSeltTimeZone+"/夏令时:"+(curSeltDST?'是':'非'));
    TimeZoneInfoShowArea.innerHTML = timeZoneInfoTemp[2]; //时区说明
}
//大陆洲别改变
function continentSelChange() {
    let i, ob = GlobalTimeZoneArr[ContinentSel.options[ContinentSel.selectedIndex].value - 0]; //某洲数组
    RegionSel.length = 0;
    for (i = 1; i < ob.length; i += 2)
        addOp(RegionSel, ob[i + 1], ob[i]);
    regionSelChange();
}
//时区输入的时候
function timeZoneTextIn() {
    console.log("timeZoneTextIn()输入为：" + TimeZoneText.value);
    curSeltTimeZone = Number(TimeZoneText.value);
}
//年份变化时候，执行的函数
function yearChange(yearNum) {
    //var thisYear = year2Ayear(ThisYearText.value);
    let yearTemp = yearNum;
    let monthTemp = ThisMonthSel.value - 0;
    //console.log('yearChange()年:'+ yearNum+'/' + monthTemp+ '||'+yearTemp);
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
        ThisYearText.value = Ayear2year(yearTemp);
    }
    //thisYearIsOK();	//年的改变最后都要调用这个函数
    console.log('yearChange()年:' + yearNum + '/' + monthTemp + '||' + ThisMonthSel.value);
    getLunarMonthPG(yearNum, monthTemp);
}
//改变年份的选择按钮变化时
function yearChangeSelChange() {
    let yearChangeNum = parseInt(YearChangeSel.value - 0);
    let yearNum = parseInt(ThisYearSel.value) + yearChangeNum + 0;
    //var thisYearCtrlTemp = document.getElementById("ThisYearText");
    //thisYearCtrlTemp.value = Ayear2year(changeNum);
    console.log('yearChangeSelChange()年数值:' + yearNum + '/改变了：' + yearChangeNum);
    //ThisYearText.value = Ayear2year(yearNum);
    yearChange(yearNum);
}
//跳到上(或下)下月，0：向前减一个月，1：向后减一个月，2：现在时刻的月份
function monthChange(ud) {
    let yearNumTemp = parseInt(year2Ayear(ThisYearText.value));
    ;
    let monthNumTemp = parseInt(ThisMonthSel.value);
    //0：向前减一个月，1：向后减一个月，2：回到现在时刻的月份
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
    getLunarMonthPG(parseInt(yearNumTemp), parseInt(ThisMonthSel.value)); //不确定是否正确
}
//月份改变选择按钮变化时
function monthChangeSelChange() {
}
//日期改变选择按钮变化时
function dayChangeSelChange() {
}
//时辰改变选择按钮变化时
function timeChangeSelChange() {
}
//显示时钟,传入日期对象
function clockShowConversion(dateTimeObj) {
    let h = RegionSel.v - 0;
    let rg = '';
    let v = RegionSel.rg;
    let jdFrom2K = dateTimeObj / 86400000 - 10957.5 + h / 24; //J2000起算的儒略日数(当地时间)
    LocalClockArea.innerHTML = dateTimeObj.toLocaleString2() + "(" + (-dateTimeObj.getTimezoneOffset() / 60.0).toFixed(1) + "TZ)";
    ;
    if (v) {
        let year1 = JD.Year;
        //console.log("clockShowConversion()JD.Year:"+JD.Year);
        let year2 = year1; //该时所在年份
        let month1 = v.slice(0, 2) - 0;
        let month2 = v.slice(5, 5 + 2) - 0;
        if (month2 < month1)
            year2++;
        //getJD4Week(y,m,n,w)求y年m月第n个星期w的jd
        let J1 = JD.getJD4Week(year1, month1, v.slice(2, 2 + 1), v.slice(3, 3 + 1) - 0) - 0.5 - J2000 + (v.charCodeAt(4) - 97) / 24;
        let J2 = JD.getJD4Week(year2, month2, v.slice(7, 7 + 1), v.slice(8, 8 + 1) - 0) - 0.5 - J2000 + (v.charCodeAt(9) - 97) / 24;
        if (jdFrom2K >= J1 && jdFrom2K < J2)
            jdFrom2K += 1 / 24, rg = '<font color=#FF0000>¤</font>'; //夏令时
    }
    JD.setJD2YMD(jdFrom2K + J2000);
    SelRegionClock.innerHTML = '[' + JD.Day + '日 ' + JD.Hour + ':' + JD.Min + ':' + int2(JD.Sec) + rg + ']'; //为了与LocalClockArea同步,秒数取整而不四舍五入
}
/****************
地理经纬度选择的页面控制函数
****************/
function citySelChange() {
    let i;
    //latitude and longitude 经纬度
    let latLongValue = new LongLatDecode(CitySel.options[CitySel.selectedIndex].value);
    CitySel.Long = latLongValue.Long; //经度
    CitySel.Lat = latLongValue.Lat; //纬度
    /*
    Cb_J.value=(latLongValue.Long/Math.PI*180).toFixed(6), Cb_W.value=(latLongValue.Lat/Math.PI*180).toFixed(6);
    Cf_J.value = Cd_J.value = Cp9_J.value = Cb_J.value;
    Cf_W.value = Cd_W.value = Cp9_W.value = Cb_W.value;
    */
    curSeltLong = (latLongValue.Long * 180.0 / Math.PI);
    curSeltLat = (latLongValue.Lat * 180.0 / Math.PI);
    LongSelText.value = curSeltLong;
    LatSelText.value = curSeltLat;
    thisDayInfoShow(-2);
    storageL.setItem('StateSel', StateSel.selectedIndex, 1000);
    storageL.setItem('CitySel', CitySel.selectedIndex, 1000);
}
//省份选择控件变化时
function stateSelChange() {
    CitySel.length = 0;
    let ob = Long_Lat_ChineseCityArr[StateSel.options[StateSel.selectedIndex].value - 0];
    for (let i = 1; i < ob.length; i++)
        addOp(CitySel, ob[i].slice(0, 4), ob[i].slice(4, ob[i].length));
    citySelChange();
}
//时区输入的时候
function longSelTextIn() {
    console.log("longSelTextIn()输入为：" + LongSelText.value);
    curSeltLong = Number(LongSelText.value);
}
//时区输入的时候
function latSelTextIn() {
    console.log("latSelTextIn()输入为：" + LatSelText.value);
    curSeltLat = Number(LatSelText.value);
}
//tab下級頁面的顯示函數
function thisTabPageShow(tabPageName, seltTabNo) {
    let tabCon = document.getElementById('funTabCon');
    let btns = document.getElementById('funTabTit').getElementsByTagName('span');
    funTabPGNo_Selt = seltTabNo - 1;
    //this.className = 'select';
    for (var i = 0; i < btns.length; i++) {
        btns[i].className = '';
    }
    ;
    btns[funTabPGNo_Selt].className = 'select';
    tabCon.src = tabPageName;
    //tabCon.srcdoc = tabPageName;
}
//页面、对象、控件等的初始化
function pageObjectInit() {
    //console.log("pageObjectInit()全局定义函数中：" + yinFu.getName() +'/'+ yinFu.getNo()  +'/'+ yinFu.getIsYang() );
    //console.log("pageObjectInit()全局定义函数中：" + muXing.getBSName() +'/'+ muXing.getBSNo());
    ThisTitle.innerHTML = softwareName + verStr;
    SoftwareVerNameArea.innerHTML = softwareVerName;
    //时区的初始化
    for (let i = 0; i < GlobalTimeZoneArr.length; i++)
        addOp(document.all.ContinentSel, i, GlobalTimeZoneArr[i][0]);
    continentSelChange();
    for (let i = 0; i < Long_Lat_ChineseCityArr.length; i++)
        addOp(document.all.StateSel, i, Long_Lat_ChineseCityArr[i][0]);
    var seI1 = storageL.getItem('StateSel');
    var seI2 = storageL.getItem('CitySel');
    StateSel.selectedIndex = seI1;
    stateSelChange(); //省份改变
    CitySel.selectedIndex = seI2;
    citySelChange(); //城市改变
    var tu3_buff = 0;
    tick(); //触发时钟
    set_date_screen(0);
    tick(); //触发时钟
    //调用月历页面生成函数
    //getLunarMonthPG(parseInt(ThisYearSel.value),parseInt(ThisMonthSel.value));
}
//年的选择定了之后，全部要执行这个选项
function thisYearIsOK() {
    let thisYearTemp = parseInt(year2Ayear(ThisYearText.value));
    thisYearSelInit(thisYearTemp);
    console.log("thisYearIsOK()输入的年：" + thisYearTemp + "/年选择按钮：" + ThisYearSel.value);
    getLunarMonthPG(thisYearTemp, parseInt(ThisMonthSel.value));
}
//生成年选择按钮控件的相关项
function thisYearSelInit(thisYear) {
    let selectAllNum = 61; //可以增加多少条目
    let selCtrlTemp = document.getElementById("ThisYearSel");
    let selCtrlLength = selCtrlTemp.length;
    let loopNum = 0;
    let thisSelNum = 0;
    //先删除已有条目，必须从最大的删除
    for (var i = 0; i <= selCtrlLength; i++) {
        selCtrlTemp.remove(selCtrlLength - i);
    }
    /*
    selCtrlLength = selCtrlTemp.length;
    console.log('年选择按钮的条目长度为：' + selCtrlLength);
    */
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
    /*
    console.log('年选择按钮的条目长度为：' + selCtrlTemp.length);
    loopNum = selCtrlTemp.length;
    */
    for (let i = 0; i <= selCtrlTemp.length; i++) {
        selCtrlTemp.selectedIndex = i.toString(); //设置当前选项
        if (thisYear == selCtrlTemp.value) {
            //console.log(thisYear +'/'+i +'/'+ selCtrlTemp.value + '/' + selCtrlTemp.length);
            return;
        }
    }
}
//年份选择按钮项目变化时
function thisYearSelChange() {
    let yearNum = ThisYearSel.value - 0;
    ThisYearText.value = Ayear2year(yearNum);
    console.log('thisYearSelChange()年:' + yearNum);
    yearChange(yearNum);
}
//月历页面的月份选择按钮变化时
function thisMonthSelChange() {
    console.log('thisMonthSelChange()年:' + ThisYearSel.value + "/" + ThisMonthSel.value);
    getLunarMonthPG(parseInt(ThisYearSel.value), parseInt(ThisMonthSel.value));
}
//月历页面的日期选择按钮变化时
function thisDaySelChange() {
}
/**********************
时钟1秒定时
**********************/
//即时坐标计算
function tick() {
    let nowDate = new Date();
    clockShowConversion(nowDate);
    //zb_calc();
    window.setTimeout("tick()", 2000);
}
/********************
当前时间初始化,在屏幕上显示时间、保存本地时区信息等
*********************/
//把当前时间置于屏幕的便入框之中
function set_date_screen(fw) {
    let nowTime = new Date();
    curTimeZone = -nowTime.getTimezoneOffset() / 60.0; //时区：+8为北京时；返回 UTC 时间与本地时间之间的时差，以分钟为单位。
    curRegionJD_2K = nowTime / 86400000 - 10957.5 - curTimeZone / 24; //J2000起算的儒略日数(当前本地时间)
    JD.setJD2YMD(curRegionJD_2K + J2000);
    //console.log("set_date_screen(fw)本地时间："+ Date().toString() +'/时区为：' + curTimeZone);
    if (!fw || fw == 1) {
        //MLTimeInText.value = JD.h+':'+JD.m+':'+JD.s.toFixed(0);
        //MLTimeInText.value = nowTime.getHours()+':'+nowTime.getMinutes()+':'+nowTime.getSeconds();
        //mlTimeInText();
    }
    if (!fw || fw == 2) {
        ThisYearText.value = nowTime.getFullYear();
        ThisMonthSel.value = nowTime.getMonth() + 1;
        ThisDaySel.value = nowTime.getDate();
        thisYearSelInit(year2Ayear(ThisYearText.value));
        //Cal_m.value = JD.Month;
        //ThisMonthSel.value  = JD.Month;
    }
    curRegionJD_2K = int2(curRegionJD_2K + 0.5);
    curSeltTimeZone = TimeZoneText.value;
    curSeltLong = LongSelText.value;
    curSeltLat = LatSelText.value;
    curSeltDST = CB_DST.checked;
}
//显时本月第n日的摘要信息。调用前应先执月历页面生成，产生有效的lun对象
function thisDayInfoShow(thisDayNum) {
}
//月历页面生成
function getLunarMonthPG(yearNum, monthNum) {
}
