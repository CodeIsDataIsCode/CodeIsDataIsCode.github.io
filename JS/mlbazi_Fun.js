"use strict";
//interface
class _BaZiInfo_ {
    //	命主姓名+出生日期字符串+性別+經緯度+時區+南半球+運周數
    constructor(zhuName, birthDayStr, genderTemp = true, longitude = 112.308, latitude = 34.656, timeZone = 8.0, Now_DST = false, NHemisphereTemp = true, pregnantWeeksNum = 40.0) {
        let yearTemp;
        let monthTemp;
        let dayTemp;
        let timeTemp;
        this.name = zhuName;
        this.thisGender = genderTemp; //男性：true；女性：false；
        this.pregnantWeeks = pregnantWeeksNum; //懷孕多少周之後生產的；
        this.thisHemisphere = NHemisphereTemp; //北半球：true；南半球：false；
        this.timeZone = timeZone; //時區
        this.DST_Zone = false; //是否是夏令時時區，非夏令時：true；夏令時：false；
        this.Now_DST = Now_DST; //當前日期是否是夏令時，非夏令時：true；夏令時：false；
        this.longitude = longitude; //经度
        this.latitude = latitude; //緯度
        this.meanSolarTime = ''; //平太陽時時間
        this.birthdayJD = 0.2; //平太陽時出生時間
        this.trueSolarTime = ''; //真太陽時時間
        this.birthdayTST_JD = 0.3; //真太陽時出生時間
        this.taiZhuInfo = new Object(); //胎柱
        this.mingZhuInfo = new Object(); //命柱
        this.bodyZhuInfo = new Object(); //身柱
        this.yearZhuInfo = new Object(); //年柱
        this.monthZhuInfo = new Object(); //月柱
        this.monthSZhuInfo = new Object(); //南半球月柱
        this.dayZhuInfo = new Object(); //日柱
        this.timeZhuInfo = new Object(); //時柱
        this.MeGanNo = 1;
        this.yunZhuInfo = new Object(); //當前大運柱
        this.liuYearZhuInfo = new Object(); //當前流年柱
        this.liuMonthZhuInfo = new Object(); //當前流月柱
        this.liuDayZhuInfo = new Object(); //當前流日柱
        this.liuTimeZhuInfo = new Object(); //當前流時柱
        this.daYunInfo = new Array(); //14個，14組
        this.liuYearInfo = new Array(); //14個，14組
        this.liuMonthInfo = new Array(); //14個，14組
        this.liuDayInfo = new Array(); //14個，14組
        this.liuTimeInfo = new Array(); //14個，14組
        this.daYunFRFlag = true; //大運的順行和逆行
        this.jdYun = new Array(); //14個大運開始的jd
        this.daYunYearNum = new Array(); //大運年的信息,（y,m,d,t）數組
        this.liuYearYearNum = new Array(); //大運流年的年的信息
        this.daYunSuiNum = new Array(); //大運歲的信息
        this.liuMonthJD = new Array(); //大運流年流月的節氣JD
        this.daYunYearStr = new Array();
        this.daYunSuiStr = new Array();
        this.DaYunSelectNo = 1; //-1:前一個，0：同月柱，1：下一個,最大12
        this.liuYearSelectNo = 1; //-1:前一個，0：同月柱，1：下一個,最大12
        this.liuMontheSelectNo = 1; //-1:前一個，0：同月柱，1：下一個,最大12
        this.liuDaySelectNo = 1; //-1:前一個，0：同月柱，1：下一個,最大12
        this.liuTimeSelectNo = 1; //-1:前一個，0：同月柱，1：下一個,最大12
    }
    getTimeZone() {
        return this.timeZone;
    }
    getLongitude() {
        return this.longitude;
    }
    getMeanSolarTime() {
        return this.meanSolarTime;
    }
    getBirthdayJD() {
        return this.birthdayJD;
    }
    getTrueSolarTime() {
        return this.trueSolarTime;
    }
    getBirthdayTST_JD() {
        return this.birthdayTST_JD;
    }
    getBodyZhu() {
        return this.bodyZhuInfo;
    }
    getMingZhu() {
        return this.mingZhuInfo;
    }
    getTaiZhu() {
        return this.taiZhuInfo;
    }
    getTaiSZhu() {
        return this.taiSZhuInfo;
    }
    getYearZhu() {
        return this.yearZhuInfo;
    }
    getMonthZhu() {
        return this.monthZhuInfo;
    }
    getMonthSZhu() {
        return this.monthSZhuInfo;
    }
    getDayZhu() {
        return this.dayZhuInfo;
    }
    getTimeZhu() {
        return this.timeZhuInfo;
    }
    //取得大運順逆的標誌
    getDaYunFRFlag() {
        return this.daYunFRFlag;
    }
    //已選擇的大運柱
    getDaYunZhu() {
        return this.yunZhuInfo;
    }
    //選擇的大運柱的某一柱,從0到13號
    getDaYunNZhu(daYunNo1) {
        let daYunNo = daYunNo1;
        if (daYunNo < 0) {
            daYunNo = 2;
        }
        else if (daYunNo > 14) {
            daYunNo = 5;
        }
        return this.daYunInfo[daYunNo];
    }
    //已選擇的流年柱
    getLiuYearZhu() {
        return this.liuYearZhuInfo;
    }
    //選擇的流年柱的某一柱,從0到13號
    getLiuYearNZhu(liuYearNo1) {
        let liuYearNo = liuYearNo1;
        if (liuYearNo < 0) {
            liuYearNo = 1;
        }
        else if (daYunNo > 14) {
            liuYearNo = 10;
        }
        return this.liuYearInfo[liuYearNo];
    }
    //已選擇的流月柱
    getLiuMonthZhu() {
        return this.liuMonthZhuInfo;
    }
    //選擇的流月柱的某一柱,從0到13號
    getLiuMonthNZhu(liuMonthNo1) {
        let liuMonthNo = liuMonthNo1;
        if (liuMonthNo < 0) {
            liuMonthNo = 1;
        }
        else if (liuMonthNo > 14) {
            liuMonthNo = 10;
        }
        return this.liuMonthInfo[liuMonthNo];
    }
    //已選擇的流日柱
    getLiuDayZhu() {
        return this.liuDayZhuInfo;
    }
    //選擇的流日柱的某一柱,從0到13號
    getLiuDayNZhu(liuDayNo1) {
        let liuDayNo = liuDayNo1;
        if (liuDayNo < 0) {
            liuDayNo = 1;
        }
        else if (liuDayNo > 32) {
            liuDayNo = 10;
        }
        return this.liuDayInfo[liuDayNo];
    }
    //已選擇的流時柱
    getLiuTimeZhu() {
        return this.liuTimeZhuInfo;
    }
    //選擇的流時間柱的某一柱,從0到13號
    getLiuTimeNZhu(liuTimeNo1) {
        let liuTimeNo = liuTimeNo1;
        if (liuTimeNo < 0) {
            liuTimeNo = 1;
        }
        else if (liuTimeNo > 14) {
            liuTimeNo = 10;
        }
        return this.liuTimeInfo[liuTimeNo];
    }
    //通過八字排盤的排列位置編號，返回柱的信息
    //3:身柱，4：命柱，5：胎柱，6：年柱，7：北半球月柱（南半球月柱），8：日柱，9：時柱，10：大運柱
    //isNHemisphere：南北半球的標誌
    getBaZiZhuInfo(zhuNo, isNHemisphere = true) {
        if (zhuNo == 3) {
            return this.bodyZhuInfo;
        }
        else if (zhuNo == 4) {
            return this.mingZhuInfo;
        }
        else if (zhuNo == 5) {
            return this.taiZhuInfo;
        }
        else if (zhuNo == 6) {
            return this.yearZhuInfo;
        }
        else if (zhuNo == 7) {
            return this.monthZhuInfo;
        }
        else if (zhuNo == 8) {
            return this.dayZhuInfo;
        }
        else if (zhuNo == 9) {
            return this.timeZhuInfo;
        }
        else if (zhuNo == 10) {
            return this.yunZhuInfo;
        }
        else if (zhuNo == 11) {
            return this.liuYearZhuInfo;
        }
        else if (zhuNo == 12) {
            return this.liuMonthZhuInfo;
        }
        else if (zhuNo == 13) {
            return this.liuDayZhuInfo;
        }
        else if (zhuNo == 14) {
            return this.liuTimeZhuInfo;
        }
    }
    /*
    //命理八字计算。jdFromJ2000为格林尼治UT(J2000起算),localLongitude为本地经度,返回在物件baZiObject中
    baZiObject对象中的信息：
    birthdayJD	生日时的儒略日数；
    bz_zty	trueSolarTime	真太阳时
    bz_jn		nianZhu	年柱干支
    bz_jy		yueZhu	月柱干支
    bz_jr		riZhu		日柱干支
    bz_js		shiZhu	四柱干支
    bz_JS		fullShiChenGanZhi   全天纪时表
    */
    setBaZiZhuInfo(panDataTime, liuDataTime, daYunNum, localLongitude, timeZone, pregnantWeeks = 40, thisMeGanNo = -1) {
        //let i: number, v: number, vLiu: number;
        //console.log('setBaZiZhuInfo()本盤:' + panDataTime + '/流年:'+ liuDataTime);
        console.log('setBaZiZhuInfo()本盤的:日干號為：' + thisMeGanNo + '/取整數後：' + thisMeGanNo);
        //設置本命盤，胎元，命宮，身宮等信息
        this.setBaZiMingPanInfo(panDataTime, localLongitude, timeZone, pregnantWeeks, thisMeGanNo);
        //大運的順逆行判斷,true是順，false是逆；
        this.YearGanYinYang = yinYangSysTemp.getGanYinYang(this.yearZhuInfo.GanNo);
        if (this.YearGanYinYang == true) {
            if (this.thisGender) {
                this.daYunFRFlag = true;
            }
            else {
                this.daYunFRFlag = false;
            }
        }
        else {
            if (this.thisGender) {
                this.daYunFRFlag = false;
            }
            else {
                this.daYunFRFlag = true;
            }
        }
        //return baZiInfo;
        //設置14柱大運柱
        this.setDaYunZhuInfo(this.thisYear, this.monthZhuNo, this.birthdayTST_JD, this.daYunFRFlag, this.MeGanNo);
        //設置流年柱
        this.DaYunSelectNo = 2;
        this.setLiuYearZhuInfo(this.DaYunSelectNo, this.MeGanNo);
        //設置流月柱  
        this.liuYearSelectNo = 2;
        this.setLiuMonthZhuInfo(this.DaYunSelectNo, this.liuYearSelectNo, this.MeGanNo);
        //設置流月柱,被選擇的柱號
        this.liuMontheSelectNo = 2;
        this.liuDaySelectNo = 2; //-1:前一個，0：同月柱，1：下一個,最大12
        this.liuTimeSelectNo = 2; //-1:前一個，0：同月柱，1：下一個,最大12
        //設置本命盤的大運柱信息
        this.setYunZhuInfo(daYunNum);
        //設置本命盤中的流年流月流日等信息
        this.setBaZiLiuYearZhuInfo(liuDataTime, localLongitude, timeZone, this.MeGanNo);
        //八字的结构相关信息
        this.setBaZiStructInfo();
        //八字的季节信息
        this.setBaZiSeasonInfo();
        //设置八字格局
        this.setBaZiModel();
    }
    ;
    //八字的结构相关信息
    setBaZiStructInfo() {
        this.yangGanNum = 0;
        if (this.yearZhuInfo.yinYang)
            this.yangGanNum += 1;
        if (this.monthZhuInfo.yinYang)
            this.yangGanNum += 1;
        if (this.dayZhuInfo.yinYang)
            this.yangGanNum += 1;
        if (this.timeZhuInfo.yinYang)
            this.yangGanNum += 1;
    }
    //八字的月令季节信息
    setBaZiSeasonInfo() {
        if ((this.monthZhuInfo.ZhiNo == 1) || (this.monthZhuInfo.ZhiNo == 12)) {
            this.seasonNo = 4;
            this.seasonName = '冬季';
        }
        else if ((this.monthZhuInfo.ZhiNo == 3) || (this.monthZhuInfo.ZhiNo == 4)) {
            this.seasonNo = 1;
            this.seasonName = '春季';
        }
        else if ((this.monthZhuInfo.ZhiNo == 6) || (this.monthZhuInfo.ZhiNo == 7)) {
            this.seasonNo = 2;
            this.seasonName = '夏季';
        }
        else if ((this.monthZhuInfo.ZhiNo == 9) || (this.monthZhuInfo.ZhiNo == 10)) {
            this.seasonNo = 3;
            this.seasonName = '秋季';
        }
        else if ((this.monthZhuInfo.ZhiNo == 2)) {
            this.seasonNo = 5;
            this.seasonName = '丑季土';
        }
        else if ((this.monthZhuInfo.ZhiNo == 5)) {
            this.seasonNo = 5;
            this.seasonName = '辰季土';
        }
        else if ((this.monthZhuInfo.ZhiNo == 8)) {
            this.seasonNo = 5;
            this.seasonName = '未季土';
        }
        else if ((this.monthZhuInfo.ZhiNo == 11)) {
            this.seasonNo = 5;
            this.seasonName = '戌季土';
        }
    }
    //设置八字格局
    setBaZiModel() {
        this.benQiShow = false;
        this.midQiShow = false;
        this.yuQiShow = false;
        this.MonthQiShow = '';
        if (this.monthZhuInfo.cangGanNum == 1) {
            if (this.monthZhuInfo.cangGan1No == this.yearZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.monthZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.dayZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.timeZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.benQiShow) {
                this.MonthQiShow = '本气透出';
            }
            else {
                this.MonthQiShow = '本气不透';
            }
        }
        else if (this.monthZhuInfo.cangGanNum == 2) {
            if (this.monthZhuInfo.cangGan1No == this.yearZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.monthZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.dayZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.timeZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.benQiShow) {
                this.MonthQiShow = '本氣透出';
            }
            else {
                this.MonthQiShow = '本氣不透';
            }
            if (this.monthZhuInfo.cangGan2No == this.yearZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.monthZhuInfo.cangGan2No == this.monthZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.monthZhuInfo.cangGan2No == this.dayZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.monthZhuInfo.cangGan2No == this.timeZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.midQiShow) {
                this.MonthQiShow = this.MonthQiShow + '/中氣透出';
            }
            else {
                this.MonthQiShow = this.MonthQiShow + '/中氣不透';
            }
        }
        else if (this.monthZhuInfo.cangGanNum == 3) {
            if (this.monthZhuInfo.cangGan1No == this.yearZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.monthZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.dayZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.monthZhuInfo.cangGan1No == this.timeZhuInfo.GanNo)
                this.benQiShow = true;
            if (this.benQiShow) {
                this.MonthQiShow = '本氣透出';
            }
            else {
                this.MonthQiShow = '本氣不透';
            }
            if (this.monthZhuInfo.cangGan2No == this.yearZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.monthZhuInfo.cangGan2No == this.monthZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.monthZhuInfo.cangGan2No == this.dayZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.monthZhuInfo.cangGan2No == this.timeZhuInfo.GanNo)
                this.midQiShow = true;
            if (this.midQiShow) {
                this.MonthQiShow = this.MonthQiShow + '/中氣透出';
            }
            else {
                this.MonthQiShow = this.MonthQiShow + '/中氣不透';
            }
            if (this.monthZhuInfo.cangGan3No == this.yearZhuInfo.GanNo)
                this.yuQiShow = true;
            if (this.monthZhuInfo.cangGan3No == this.monthZhuInfo.GanNo)
                this.yuQiShow = true;
            if (this.monthZhuInfo.cangGan3No == this.dayZhuInfo.GanNo)
                this.yuQiShow = true;
            if (this.monthZhuInfo.cangGan3No == this.timeZhuInfo.GanNo)
                this.yuQiShow = true;
            if (this.yuQiShow) {
                this.MonthQiShow = this.MonthQiShow + '/餘氣透出';
            }
            else {
                this.MonthQiShow = this.MonthQiShow + '/餘氣不透';
            }
        }
    }
    //設置本命盤中的本命的四柱信息、胎元、命柱、身柱的信息
    setBaZiMingPanInfo(panDataTime, localLongitude, timeZone, pregnantWeeks = 40, thisMeGanNo = -1) {
        let i, v;
        //let strTemp1: string, strTemp2: string, strTemp3: string, strTemp4: string;
        //console.log('setBaZiMingPanInfo()本盤:' + panDataTime);
        this.thisYear = (JD.dataTimeStrSeparate(panDataTime)[0]) * (JD.dataTimeStrSeparate(panDataTime)[1]);
        this.thisMonth = JD.dataTimeStrSeparate(panDataTime)[2];
        this.thisDay = JD.dataTimeStrSeparate(panDataTime)[3];
        this.thisTime = JD.dataTimeStrSeparate(panDataTime)[6];
        this.thisGender = (JD.dataTimeStrSeparate(panDataTime)[7] == 0) ? true : false; //0是男性，1是女性
        this.thisHemisphere = (JD.dataTimeStrSeparate(panDataTime)[8] == 0) ? true : false; //0是北半球，1是南半球
        //console.log('setBaZiMingPanInfo()' + thisYear + '年:'+ thisMonth + '月:' + thisDay 	+ '日:'+ thisTime + '時/性別:'+ thisGender + '半球:'+ thisHemisphere);
        //let jd: number = JD.JD(year2Ayear(thisYear), thisMonth, thisDay + (thisTime / 24.0));	//转换日期为jd数值
        let jd = JD.JD(this.thisYear, this.thisMonth, this.thisDay + (this.thisTime / 24.0)); //转换日期为jd数值
        let jdTemp = jd - J2000 - timeZone / 24.0;
        let jd2 = jdTemp + dt_T(jdTemp); //力学时
        let jdPregnant = jd2 - pregnantWeeks * 7.0; //怀孕时候的日期时间
        let w = Sun_Moon_Ephemeris.S_aLon(jd2 / 36525, -1); // 此刻太阳视黄经
        let k = int2((w / pi2 * 360 + 45 + 15 * 360) / 30); // 1984年立春起算的节气数(不含中气)
        let wPregnant = Sun_Moon_Ephemeris.S_aLon(jdPregnant / 36525, -1); // 怀孕时刻的太阳视黄经
        let kPregnant = int2((wPregnant / pi2 * 360 + 45 + 15 * 360) / 30); // 1984年立春起算的节气数(不含中气)
        this.timeZone = timeZone;
        this.longitude = localLongitude;
        this.meanSolarTime = ''; // 平太阳时
        this.birthdayJD = jdTemp + J2000 + localLongitude / 360.0; // 平太阳时的出生日期JD
        jdTemp += pty_zty2(jd2 / 36525) + localLongitude / 360.0; // 本地真太阳时(使用低精度算法计算时差)
        this.trueSolarTime = JD.getTimeStr(jdTemp); // 本地真太阳时(使用低精度算法计算时差)
        this.birthdayTST_JD = jdTemp + J2000; //真太阳时的出生日期JD
        //转为前一日23点起算(原jd为本日中午12点起算)
        jdTemp += 13 / 24;
        let thisDayNum = Math.floor(jdTemp); //日数
        let shiChenNum = int2((jdTemp - thisDayNum) * 12); //12时辰整数值
        let dataTimeOb = JD.JD2GC0Date(jdTemp + J2000 - 13 / 24);
        this.thisYear = dataTimeOb.Year;
        this.thisMonth = dataTimeOb.Month;
        this.thisDay = dataTimeOb.Day;
        this.thisTime = dataTimeOb.Hour + dataTimeOb.Min / 60.0;
        //日柱计算
        v = thisDayNum - 6 + 9000000;
        let riGanNo = v % 10 + 1;
        this.MeGanNo = riGanNo;
        if (thisMeGanNo != -1) {
            riGanNo = thisMeGanNo;
            this.MeGanNo = thisMeGanNo;
        }
        this.dayZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisDay) + '日', yinYangSysTemp.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1), riGanNo);
        console.log('setBaZiMingPanInfo():日干號：' + riGanNo);
        //年柱计算
        v = int2(k / 12 + 6000000);
        this.yearZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisYear) + '年', yinYangSysTemp.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1), riGanNo);
        //console.log('setBaZiMingPanInfo():年陰陽為：' + this.YearGanYinYang + '/男女為：'+ this.thisGender + '/大運順逆為：'+ String(this.daYunFRFlag?'順':'逆'));
        //console.log('setBaZiMingPanInfo():年干号：' + this.yearZhuInfo.GanNo + ',是:' + String(this.YearGanYinYang?'陽':'陰'));//?'陽':'陰'
        //北半球的月柱计算、胎元計算
        v = k + 2 + 60000000;
        let vPregnant = kPregnant + 2 + 60000000;
        let thisMonthZhuNo, thisLiuMonthNo;
        if (this.thisHemisphere) {
            thisMonthZhuNo = yinYangSysTemp.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1);
            this.monthZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisMonth) + '月', thisMonthZhuNo, riGanNo);
            this.taiZhuInfo = yinYangSysTemp.getZhuInfo('胎', yinYangSysTemp.getZhuNoByGanZhiNo(vPregnant % 10 + 1, vPregnant % 12 + 1), riGanNo);
        }
        else {
            //南半球的月柱计算、胎元計算
            thisMonthZhuNo = yinYangSysTemp.getZhuNoByGanZhiNo(v % 10 + 1, (v + 6) % 12 + 1);
            this.monthZhuInfo = yinYangSysTemp.getZhuInfo('南' + String(this.thisMonth) + '月', thisMonthZhuNo, riGanNo);
            this.taiZhuInfo = yinYangSysTemp.getZhuInfo('南胎', yinYangSysTemp.getZhuNoByGanZhiNo(vPregnant % 10 + 1, (vPregnant + 6) % 12 + 1), riGanNo);
        }
        this.monthZhuNo = Number(this.monthZhuInfo.No);
        //时柱计算
        v = (thisDayNum - 1) * 12 + 90000000 + shiChenNum;
        this.timeZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisTime).slice(0, 5) + '時', yinYangSysTemp.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1), riGanNo);
        //命柱计算
        let mingZhuZhiNo = 1;
        mingZhuZhiNo = (32 - this.monthZhuInfo.ZhiNo - this.timeZhuInfo.ZhiNo) % 12;
        if (mingZhuZhiNo == 0)
            mingZhuZhiNo = 12;
        //console.log('setBaZiZhuInfo():年干号：'+ this.yearZhuInfo.GanNo + '/命柱支号：' + mingZhuZhiNo + '/月支号：' + this.monthZhuInfo.ZhiNo  +'/时支号：' +this.timeZhuInfo.ZhiNo);
        let mingZhuNo = yinYangSysTemp.getMonthZhuNoByYearGanNo(Number(this.yearZhuInfo.GanNo), Number(mingZhuZhiNo));
        //let mingZhuNo:number	=	20;
        this.mingZhuInfo = yinYangSysTemp.getZhuInfo('命柱', mingZhuNo, riGanNo);
        //身柱计算
        let bodyZhuZhiNo = 1;
        bodyZhuZhiNo = (this.monthZhuInfo.ZhiNo + this.timeZhuInfo.ZhiNo);
        if (bodyZhuZhiNo > 12)
            bodyZhuZhiNo -= 12;
        let bodyZhuNo = yinYangSysTemp.getMonthZhuNoByYearGanNo(Number(this.yearZhuInfo.GanNo), Number(bodyZhuZhiNo));
        //let mingZhuNo:number	=	20;
        this.bodyZhuInfo = yinYangSysTemp.getZhuInfo('身柱', bodyZhuNo, riGanNo);
    }
    //設置本盤中的大運柱的柱信息
    setYunZhuInfo(daYunNum) {
        //設置當前大運柱计算
        let daYunShowNo = 0;
        if (this.daYunFRFlag) {
            daYunShowNo = this.monthZhuNo + daYunNum - 1;
        }
        else {
            daYunShowNo = this.monthZhuNo - daYunNum + 1;
        }
        if (daYunShowNo > 60) {
            daYunShowNo -= 60;
        }
        else
            (daYunShowNo < 1);
        {
            daYunShowNo += 60;
        }
        this.yunZhuInfo = yinYangSysTemp.getZhuInfo(String((daYunNum - 1) + '運'), daYunShowNo, this.MeGanNo);
        //thisMonthZhuNo + 
    }
    //yinYangSysTemp.getMonthJieQiJD(yearNum,monthZhiNo);
    //設置大運柱的柱信息
    setDaYunZhuInfo(yearNum, monthZhuNo, birthdayJD01, daYunFRFlag1, riGanNo) {
        console.log('setDaYunZhuInfo():年是：' + yearNum + '月柱號為：' + monthZhuNo + '生日為：' + birthdayJD01 + '，順逆為:' + daYunFRFlag1);
        this.daYunInfo = new Array();
        this.daYunFRFlag = daYunFRFlag1;
        let daYunNum = -1;
        let monthZhiNo = yinYangSysTemp.getZhiNoByZhuNo(monthZhuNo);
        let jieQiJD = new Array();
        //子月的問題
        if (monthZhiNo == 1) {
            jieQiJD = yinYangSysTemp.getMonthJieQiJD(yearNum + 1, monthZhiNo);
        }
        else if (monthZhiNo > 1) {
            jieQiJD = yinYangSysTemp.getMonthJieQiJD(yearNum, monthZhiNo);
        }
        console.log('setDaYunZhuInfo():年是：' + yearNum + '/月柱號為：' + monthZhuNo + '/月支号：' + monthZhiNo);
        console.log('setDaYunZhuInfo():開始節：' + jieQiJD[0] + '/中節氣：' + jieQiJD[1] + '/結束節氣：' + jieQiJD[2]);
        let birthdayJD = Number(birthdayJD01);
        console.log('setDaYunZhuInfo():生日：' + birthdayJD + '/轉換前生日為：' + birthdayJD01);
        let jd01 = birthdayJD - jieQiJD[0];
        let jd11 = jd01 * 120; //距離節氣頭的時長
        let jd02 = jieQiJD[1] - birthdayJD;
        let jd12 = jd02 * 120; //距離節氣中的時長
        let jd03 = jieQiJD[2] - birthdayJD;
        let jd13 = jd03 * 120; //距離節氣尾的時長
        console.log('setDaYunZhuInfo():距離節氣頭的時長：' + jd11 / 365.2425 + '/距離節氣中的時長：' + jd12 / 365.2425 + '/距離節氣尾的時長：' + jd13 / 365.2425 + '/' + (jieQiJD[2] - jieQiJD[0]) * 120 / 365.2425);
        this.jdYun[0] = birthdayJD - 3652.425;
        this.jdYun[1] = birthdayJD;
        this.daYunSuiNum[0] = -10;
        this.daYunSuiNum[1] = 0;
        if (this.daYunFRFlag) {
            for (let i = 2; i <= 13; i++) {
                this.jdYun[i] = jd13 + birthdayJD + 3652.425 * (i - 2);
                this.daYunSuiNum[i] = ((jd13 + 3652.425 * (i - 2)) / 365.2425 + 0.1).toFixed(1);
            }
        }
        else {
            for (let i = 2; i <= 13; i++) {
                this.jdYun[i] = jd11 + birthdayJD + 3652.425 * (i - 2);
                this.daYunSuiNum[i] = ((jd11 + 3652.425 * (i - 2)) / 365.2425 + 0.1).toFixed(1);
            }
        }
        for (let i = 0; i <= 13; i++) {
            this.daYunYearNum[i] = JD.setJD2YMD(this.jdYun[i]);
            //daYunSui
            //this.daYunYearStr[i] = String(this.daYunYearNum[i][0]).slice(2,4) + '/' + String(this.daYunYearNum[i][1]);
            this.daYunYearStr[i] = String(this.daYunYearNum[i][0]) + '/' + String(this.daYunYearNum[i][1]);
            this.daYunSuiStr[i] = String(this.daYunSuiNum[i]);
            //	+'/'+ String(daYunYearNum[i][2]
            //console.log('setYunZhuInfo():第' + i+'個大運年的字符：' + daYunYearStr[i]);
        }
        if (this.daYunFRFlag) {
            for (let i = 0; i < 14; i++) {
                daYunNum = monthZhuNo + i - 1;
                if (daYunNum < 1) {
                    daYunNum = daYunNum + 60;
                }
                else if (daYunNum > 60) {
                    daYunNum = daYunNum - 60;
                }
                this.daYunInfo[i] = yinYangSysTemp.getZhuInfo(String((i - 1) + '運' + daYunNum), daYunNum, riGanNo, this.daYunYearStr[i], this.daYunSuiStr[i]);
                //this.daYunInfo[i].daYunYearNumStr = JD.setFromJD(jdYun[i])[0] + '/'+JD.setFromJD(jdYun[i])[1];
            }
        }
        else {
            for (let i = 0; i < 14; i++) {
                daYunNum = monthZhuNo - i + 1;
                if (daYunNum < 1) {
                    daYunNum = daYunNum + 60;
                }
                else if (daYunNum > 60) {
                    daYunNum = daYunNum - 60;
                }
                this.daYunInfo[i] = yinYangSysTemp.getZhuInfo(String((i - 1) + '運' + daYunNum), daYunNum, riGanNo, this.daYunYearStr[i], this.daYunSuiStr[i]);
                //this.daYunInfo[i].daYunYearNumStr = JD.setFromJD(jdYun[i])[0] + '/'+JD.setFromJD(jdYun[i])[1];
            }
        }
    }
    /* */
    //設置流年柱的柱信息
    setLiuYearZhuInfo(daYunSelectNo1, riGanNo) {
        let daYunSelectNo = daYunSelectNo1;
        let startYear, yearZhuNo;
        if (daYunSelectNo < -1) {
            daYunSelectNo = 0;
        }
        else if (daYunSelectNo > 13) {
            daYunSelectNo = 13;
        }
        baZiInfo.DaYunSelectNo = daYunSelectNo; //設置被選中的流年柱號
        startYear = this.daYunYearNum[daYunSelectNo][0] - 2;
        for (let i = 0; i < 14; i++) {
            this.liuYearYearNum[i] = startYear + i;
            yearZhuNo = yinYangSysTemp.getYear2GanZhiNo(startYear + i);
            //console.log('setLiuYearZhuInfo()年柱號：' + yearZhuNo);
            this.liuYearInfo[i] = yinYangSysTemp.getZhuInfo(String((i - 2) + '年'), yearZhuNo, riGanNo, (startYear + i), ((startYear + i) - this.daYunYearNum[1][0]));
        }
    }
    //設置流年柱的柱信息
    setLiuMonthZhuInfo(daYunSelectNo1, liuYearSelectNo1, riGanNo) {
        let daYunSelectNo = daYunSelectNo1;
        let liuYearSelectNo = liuYearSelectNo1;
        let thisLiuYear, thisLiuYearZhuNo;
        let liuYearGanNo, monthZhuNo;
        let liuMonthMD; //流年之流月的月日的記錄
        let j;
        let monthName = '';
        if (daYunSelectNo < -1) {
            daYunSelectNo = 0;
        }
        else if (daYunSelectNo > 13) {
            daYunSelectNo = 13;
        }
        baZiInfo.DaYunSelectNo = daYunSelectNo; //設置被選中的大運柱號
        baZiInfo.liuYearSelectNo = liuYearSelectNo; //設置被選中的流年柱號
        thisLiuYear = this.daYunYearNum[liuYearSelectNo][0]; //- 2
        thisLiuYearZhuNo = yinYangSysTemp.getYear2GanZhiNo(thisLiuYear);
        //liuYearGanNo			=	yinYangSysTemp.
        console.log('setLiuMonthZhuInfo()選擇大運是：' + daYunSelectNo + '/流年柱是：' + liuYearSelectNo + '/流年是：' + thisLiuYear + '年/年柱號：' + thisLiuYearZhuNo);
        //console.log('setLiuMonthZhuInfo()日干號為：' + riGanNo);
        for (let i = 0; i < 14; i++) {
            if (i < 2) {
                thisLiuYear = this.liuYearYearNum[liuYearSelectNo] - 1;
                liuYearGanNo = yinYangSysTemp.getYear2GanNo(thisLiuYear);
            }
            else {
                thisLiuYear = this.liuYearYearNum[liuYearSelectNo];
                liuYearGanNo = yinYangSysTemp.getYear2GanNo(thisLiuYear);
            }
            j = i + 1; //調整月支號為1-12
            if (j > 12) {
                j = j - 12;
            }
            this.liuMonthJD[i] = (yinYangSysTemp.getMonthJieQiJD(thisLiuYear, j))[0];
            monthZhuNo = Number(yinYangSysTemp.getMonthZhuNoByYearGanNo(liuYearGanNo, j));
            liuMonthMD = (JD.setJD2YMD(this.liuMonthJD[i]))[1] + '/' + (JD.setJD2YMD(this.liuMonthJD[i]))[2];
            //console.log('setLiuMonthZhuInfo()流年干號：' + liuYearGanNo + '/月柱號：'+ monthZhuNo + '/i=' + i+ '/j='+j);
            if (i == 0) {
                monthName = '11月';
            }
            else if (i == 1) {
                monthName = '12月';
            }
            else if (i >= 2) {
                monthName = (i - 1) + '月';
            }
            this.liuMonthInfo[i] = yinYangSysTemp.getZhuInfo(monthName, monthZhuNo, riGanNo, '', liuMonthMD);
        }
    }
    //設置本命盤中的大運流年的四柱信息
    setBaZiLiuYearZhuInfo(liuDataTime, localLongitude, timeZone, thisMeGanNo = -1) {
        let i, vLiu;
        this.timeZone = timeZone;
        this.longitude = localLongitude;
        this.thisLiuYear = (JD.dataTimeStrSeparate(liuDataTime)[0]) * (JD.dataTimeStrSeparate(liuDataTime)[1]);
        this.thisLiuMonth = JD.dataTimeStrSeparate(liuDataTime)[2];
        this.thisLiuDay = JD.dataTimeStrSeparate(liuDataTime)[3];
        this.thisLiuTime = JD.dataTimeStrSeparate(liuDataTime)[6];
        this.thisLiuHemisphere = (JD.dataTimeStrSeparate(liuDataTime)[8] == 0) ? true : false; //0是北半球，1是南半球
        let jdLiu = JD.JD(this.thisLiuYear, this.thisLiuMonth, this.thisLiuDay + (this.thisLiuTime / 24.0)); //转换日期为jd数值
        //console.log('setBaZiLiuYearZhuInfo()流年盤:' + liuDataTime);
        let jdLiuTemp = jdLiu - J2000;
        let wLiu = Sun_Moon_Ephemeris.S_aLon(jdLiuTemp / 36525, -1); // 此刻太阳视黄经
        let kLiu = int2((wLiu / pi2 * 360 + 45 + 15 * 360) / 30); // 1984年立春起算的节气数(不含中气)
        //转为前一日23点起算(原jd为本日中午12点起算)
        jdLiuTemp += 13 / 24;
        let thisLiuDayNum = Math.floor(jdLiuTemp); //日数
        let liuShiChenNum = int2((jdLiuTemp - thisLiuDayNum) * 12); //12时辰整数值
        //console.log('setBaZiLiuYearZhuInfo()流年:' + thisLiuYear + '流月:'+ thisLiuMonth + '流日:' + thisLiuDay + '流時:'+ thisLiuTime + '半球:'+ thisLiuHemisphere);
        let thisLiuMonthNo;
        //流年的年柱计算
        vLiu = int2(kLiu / 12 + 6000000);
        this.liuYearZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisLiuYear) + '年', yinYangSysTemp.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1), thisMeGanNo);
        //流年的月柱計算
        vLiu = kLiu + 2 + 60000000;
        if (this.thisLiuHemisphere) {
            thisLiuMonthNo = yinYangSysTemp.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1);
            this.liuMonthZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisLiuMonth) + '月', thisLiuMonthNo, thisMeGanNo);
        }
        else {
            thisLiuMonthNo = yinYangSysTemp.getZhuNoByGanZhiNo(vLiu % 10 + 1, (vLiu + 6) % 12 + 1);
            this.liuMonthZhuInfo = yinYangSysTemp.getZhuInfo('南' + String(this.thisLiuMonth) + '月', thisLiuMonthNo, thisMeGanNo);
        }
        //流年的日柱计算
        vLiu = thisLiuDayNum - 6 + 9000000;
        this.liuDayZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisLiuDay) + '日', yinYangSysTemp.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1), thisMeGanNo);
        //流年的时柱计算
        vLiu = (thisLiuDayNum - 1) * 12 + 90000000 + liuShiChenNum;
        this.liuTimeZhuInfo = yinYangSysTemp.getZhuInfo(String(this.thisLiuTime).slice(0, 5) + '時', yinYangSysTemp.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1), thisMeGanNo);
    }
    //八字反查JD
    baZiToDateCal(yearZhuNo, monthZhuZhiNo, dayZhuNo, timeZhuZhiNo, startYear = 1500, endYear = 2105) {
        let startYearTemp = startYear;
        let endYearTemp = endYear + 1;
        //-10,016为甲子年，-9956年甲子年,1984年甲子年
        let yearLoopNum = Math.trunc((startYearTemp + 10017) / 60); //年份数循环了多个干支了
        let startDayJD = (startYearTemp + 4712) * 365.2524;
        let endDayJD = (endYearTemp + 4713) * 365.2524;
        //JD = 0(-0.5416667；0-13/24) 癸丑日50号 -4712/1/1 12:00:00
        let thisJD = []; //可以修改为从index=0开始
        let T_Start = 0;
        let T_End = 0;
        let jdStartTemp = 0;
        let jdEndTemp = 0;
        for (let i = 0; (-10017 + (i + yearLoopNum) * 60 + yearZhuNo) <= endYearTemp; i++) {
            //新年从寅月开始，子，丑月要加一年
            if (monthZhuZhiNo > 2) {
                T_Start = Sun_Moon_Ephemeris.S_aLon_t(((-10017 + (i + yearLoopNum) * 60 + yearZhuNo) - 2000 + ganZhiMonthAngle[monthZhuZhiNo - 1] / 360 + 1) * 2 * Math.PI);
                T_End = Sun_Moon_Ephemeris.S_aLon_t(((-10017 + (i + yearLoopNum) * 60 + yearZhuNo) - 2000 + ganZhiMonthAngle[monthZhuZhiNo] / 360 + 1) * 2 * Math.PI);
            }
            else {
                T_Start = Sun_Moon_Ephemeris.S_aLon_t(((-10017 + (i + yearLoopNum) * 60 + yearZhuNo) - 2000 + ganZhiMonthAngle[monthZhuZhiNo - 1] / 360 + 2) * 2 * Math.PI);
                T_End = Sun_Moon_Ephemeris.S_aLon_t(((-10017 + (i + yearLoopNum) * 60 + yearZhuNo) - 2000 + ganZhiMonthAngle[monthZhuZhiNo] / 360 + 2) * 2 * Math.PI);
            }
            jdStartTemp = T_Start * 36525 + J2000 + 8 / 24 - dt_T(T_Start * 36525);
            jdEndTemp = T_End * 36525 + J2000 + 8 / 24 - dt_T(T_End * 36525);
            let thisJDTemp = 0;
            //console.log("开始:"+jdStartTemp+"/结束："+jdEndTemp +"当前:"+thisJDTemp+"/差:"+(thisJDTemp-jdStartTemp));
            for (let i = 0; i < 4; i++) {
                thisJDTemp = Math.trunc((jdStartTemp - 50) / 60 + 2) * 60 - 12 / 24 + dayZhuNo - 110 + i * 60 + (timeZhuZhiNo - 1) / 12;
                if ((thisJDTemp >= jdStartTemp) && (thisJDTemp <= jdEndTemp)) {
                    thisJD.push(thisJDTemp);
                }
            }
        }
        return thisJD;
    }
}
var baZiInfo = new _BaZiInfo_('張三', '200006151200', true, 120.0, 35.0, 8.0, false, true, 40);
