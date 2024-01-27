"use strict";
class _BaZiInfo_ {
    constructor(zhuName, birthDayStr, genderTemp = true, longitude = 112.308, latitude = 34.656, timeZone = 8.0, Now_DST = false, NHemisphereTemp = true, pregnantWeeksNum = 40.0) {
        let yearTemp;
        let monthTemp;
        let dayTemp;
        let timeTemp;
        this.name = zhuName;
        this.thisGender = genderTemp;
        this.pregnantWeeks = pregnantWeeksNum;
        this.thisHemisphere = NHemisphereTemp;
        this.timeZone = timeZone;
        this.DST_Zone = false;
        this.Now_DST = Now_DST;
        this.longitude = longitude;
        this.latitude = latitude;
        this.meanSolarTime = '';
        this.birthdayJD = 0.2;
        this.trueSolarTime = '';
        this.birthdayTST_JD = 0.3;
        this.taiZhuInfo = new Object();
        this.mingZhuInfo = new Object();
        this.bodyZhuInfo = new Object();
        this.yearZhuInfo = new Object();
        this.monthZhuInfo = new Object();
        this.monthSZhuInfo = new Object();
        this.dayZhuInfo = new Object();
        this.timeZhuInfo = new Object();
        this.MeGanNo = 1;
        this.yunZhuInfo = new Object();
        this.liuYearZhuInfo = new Object();
        this.liuMonthZhuInfo = new Object();
        this.liuDayZhuInfo = new Object();
        this.liuTimeZhuInfo = new Object();
        this.daYunInfo = new Array();
        this.liuYearInfo = new Array();
        this.liuMonthInfo = new Array();
        this.liuDayInfo = new Array();
        this.liuTimeInfo = new Array();
        this.daYunFRFlag = true;
        this.jdYun = new Array();
        this.daYunYearNum = new Array();
        this.liuYearYearNum = new Array();
        this.daYunSuiNum = new Array();
        this.liuMonthJD = new Array();
        this.daYunYearStr = new Array();
        this.daYunSuiStr = new Array();
        this.DaYunSelectNo = 1;
        this.liuYearSelectNo = 1;
        this.liuMontheSelectNo = 1;
        this.liuDaySelectNo = 1;
        this.liuTimeSelectNo = 1;
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
    getDaYunFRFlag() {
        return this.daYunFRFlag;
    }
    getDaYunZhu() {
        return this.yunZhuInfo;
    }
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
    getLiuYearZhu() {
        return this.liuYearZhuInfo;
    }
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
    getLiuMonthZhu() {
        return this.liuMonthZhuInfo;
    }
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
    getLiuDayZhu() {
        return this.liuDayZhuInfo;
    }
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
    getLiuTimeZhu() {
        return this.liuTimeZhuInfo;
    }
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
    setBaZiZhuInfo(panDateTime, liuDateTime, daYunNum, localLongitude, timeZone, pregnantWeeks = 40, thisMeGanNo = -1) {
        console.log('setBaZiZhuInfo()本盤的:日干號為：' + thisMeGanNo + '/取整數後：' + thisMeGanNo);
        this.setBaZiMingPanInfo(panDateTime, localLongitude, timeZone, pregnantWeeks, thisMeGanNo);
        this.YearGanYinYang = wuXingGZSys.getGanYinYang(this.yearZhuInfo.GanNo);
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
        this.setDaYunZhuInfo(this.thisYear, this.monthZhuNo, this.birthdayTST_JD, this.daYunFRFlag, this.MeGanNo);
        this.DaYunSelectNo = 2;
        this.setLiuYearZhuInfo(this.DaYunSelectNo, this.MeGanNo);
        this.liuYearSelectNo = 2;
        this.setLiuMonthZhuInfo(this.DaYunSelectNo, this.liuYearSelectNo, this.MeGanNo);
        this.liuMontheSelectNo = 2;
        this.liuDaySelectNo = 2;
        this.liuTimeSelectNo = 2;
        this.setYunZhuInfo(daYunNum);
        this.setBaZiLiuYearZhuInfo(liuDateTime, localLongitude, timeZone, this.MeGanNo);
        this.setBaZiStructInfo();
        this.setBaZiSeasonInfo();
        this.setBaZiModel();
    }
    ;
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
    setBaZiMingPanInfo(panDateTime, localLongitude, timeZone, pregnantWeeks = 40, thisMeGanNo = -1) {
        let i, v;
        this.thisYear = (JD.dateTimeStrSeparate(panDateTime)[0]) * (JD.dateTimeStrSeparate(panDateTime)[1]);
        this.thisMonth = JD.dateTimeStrSeparate(panDateTime)[2];
        this.thisDay = JD.dateTimeStrSeparate(panDateTime)[3];
        this.thisTime = JD.dateTimeStrSeparate(panDateTime)[6];
        this.thisGender = (JD.dateTimeStrSeparate(panDateTime)[7] == 0) ? true : false;
        this.thisHemisphere = (JD.dateTimeStrSeparate(panDateTime)[8] == 0) ? true : false;
        let jd = JD.JD(this.thisYear, this.thisMonth, this.thisDay + (this.thisTime / 24.0));
        let jdTemp = jd - J2000 - timeZone / 24.0;
        let jd2 = jdTemp + dt_T(jdTemp);
        let jdPregnant = jd2 - pregnantWeeks * 7.0;
        let w = Sun_Moon_Ephemeris.S_aLon(jd2 / 36525, -1);
        let k = int2((w / pi2 * 360 + 45 + 15 * 360) / 30);
        let wPregnant = Sun_Moon_Ephemeris.S_aLon(jdPregnant / 36525, -1);
        let kPregnant = int2((wPregnant / pi2 * 360 + 45 + 15 * 360) / 30);
        this.timeZone = timeZone;
        this.longitude = localLongitude;
        this.meanSolarTime = '';
        this.birthdayJD = jdTemp + J2000 + localLongitude / 360.0;
        jdTemp += pty_zty2(jd2 / 36525) + localLongitude / 360.0;
        this.trueSolarTime = JD.JD2TimeStr(jdTemp);
        this.birthdayTST_JD = jdTemp + J2000;
        jdTemp += 13 / 24;
        let thisDayNum = Math.floor(jdTemp);
        let shiChenNum = int2((jdTemp - thisDayNum) * 12);
        let dateTimeOb = JD.JD2GC0Date(jdTemp + J2000 - 13 / 24);
        this.thisYear = dateTimeOb.Year;
        this.thisMonth = dateTimeOb.Month;
        this.thisDay = dateTimeOb.Day;
        this.thisTime = dateTimeOb.Hour + dateTimeOb.Min / 60.0;
        v = thisDayNum - 6 + 9000000;
        let riGanNo = v % 10 + 1;
        this.MeGanNo = riGanNo;
        if (thisMeGanNo != -1) {
            riGanNo = thisMeGanNo;
            this.MeGanNo = thisMeGanNo;
        }
        this.dayZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisDay) + '日', wuXingGZSys.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1), riGanNo);
        console.log('setBaZiMingPanInfo():日干號：' + riGanNo);
        v = int2(k / 12 + 6000000);
        this.yearZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisYear) + '年', wuXingGZSys.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1), riGanNo);
        v = k + 2 + 60000000;
        let vPregnant = kPregnant + 2 + 60000000;
        let thisMonthZhuNo, thisLiuMonthNo;
        if (this.thisHemisphere) {
            thisMonthZhuNo = wuXingGZSys.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1);
            this.monthZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisMonth) + '月', thisMonthZhuNo, riGanNo);
            this.taiZhuInfo = wuXingGZSys.getZhuInfo('胎', wuXingGZSys.getZhuNoByGanZhiNo(vPregnant % 10 + 1, vPregnant % 12 + 1), riGanNo);
        }
        else {
            thisMonthZhuNo = wuXingGZSys.getZhuNoByGanZhiNo(v % 10 + 1, (v + 6) % 12 + 1);
            this.monthZhuInfo = wuXingGZSys.getZhuInfo('南' + String(this.thisMonth) + '月', thisMonthZhuNo, riGanNo);
            this.taiZhuInfo = wuXingGZSys.getZhuInfo('南胎', wuXingGZSys.getZhuNoByGanZhiNo(vPregnant % 10 + 1, (vPregnant + 6) % 12 + 1), riGanNo);
        }
        this.monthZhuNo = Number(this.monthZhuInfo.No);
        v = (thisDayNum - 1) * 12 + 90000000 + shiChenNum;
        this.timeZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisTime).slice(0, 5) + '時', wuXingGZSys.getZhuNoByGanZhiNo(v % 10 + 1, v % 12 + 1), riGanNo);
        let mingZhuZhiNo = 1;
        mingZhuZhiNo = (32 - this.monthZhuInfo.ZhiNo - this.timeZhuInfo.ZhiNo) % 12;
        if (mingZhuZhiNo == 0)
            mingZhuZhiNo = 12;
        let mingZhuNo = wuXingGZSys.getMonthZhuNoByYearGanNo(Number(this.yearZhuInfo.GanNo), Number(mingZhuZhiNo));
        this.mingZhuInfo = wuXingGZSys.getZhuInfo('命柱', mingZhuNo, riGanNo);
        let bodyZhuZhiNo = 1;
        bodyZhuZhiNo = (this.monthZhuInfo.ZhiNo + this.timeZhuInfo.ZhiNo);
        if (bodyZhuZhiNo > 12)
            bodyZhuZhiNo -= 12;
        let bodyZhuNo = wuXingGZSys.getMonthZhuNoByYearGanNo(Number(this.yearZhuInfo.GanNo), Number(bodyZhuZhiNo));
        this.bodyZhuInfo = wuXingGZSys.getZhuInfo('身柱', bodyZhuNo, riGanNo);
    }
    setYunZhuInfo(daYunNum) {
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
        this.yunZhuInfo = wuXingGZSys.getZhuInfo(String((daYunNum - 1) + '運'), daYunShowNo, this.MeGanNo);
    }
    setDaYunZhuInfo(yearNum, monthZhuNo, birthdayJD01, daYunFRFlag1, riGanNo) {
        console.log('setDaYunZhuInfo():年是：' + yearNum + '月柱號為：' + monthZhuNo + '生日為：' + birthdayJD01 + '，順逆為:' + daYunFRFlag1);
        this.daYunInfo = new Array();
        this.daYunFRFlag = daYunFRFlag1;
        let daYunNum = -1;
        let monthZhiNo = wuXingGZSys.getZhiNoByZhuNo(monthZhuNo);
        let jieQiJD = new Object();
        if (monthZhiNo == 1) {
            jieQiJD = wuXingGZSys.getMonthJieQiJD(yearNum + 1, monthZhiNo);
        }
        else if (monthZhiNo > 1) {
            jieQiJD = wuXingGZSys.getMonthJieQiJD(yearNum, monthZhiNo);
        }
        console.log('setDaYunZhuInfo():年是：' + yearNum + '/月柱號為：' + monthZhuNo + '/月支号：' + monthZhiNo);
        console.log('setDaYunZhuInfo():開始節：' + jieQiJD.startJD + '/中節氣：' + jieQiJD.midJD + '/結束節氣：' + jieQiJD.endJD);
        let birthdayJD = Number(birthdayJD01);
        console.log('setDaYunZhuInfo():生日：' + birthdayJD + '/轉換前生日為：' + birthdayJD01);
        let jd01 = birthdayJD - jieQiJD.startJD;
        let jd11 = jd01 * 120;
        let jd02 = jieQiJD.midJD - birthdayJD;
        let jd12 = jd02 * 120;
        let jd03 = jieQiJD.endJD - birthdayJD;
        let jd13 = jd03 * 120;
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
            this.daYunYearStr[i] = String(this.daYunYearNum[i][0]) + '/' + String(this.daYunYearNum[i][1]);
            this.daYunSuiStr[i] = String(this.daYunSuiNum[i]);
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
                this.daYunInfo[i] = wuXingGZSys.getZhuInfo(String((i - 1) + '運' + daYunNum), daYunNum, riGanNo, this.daYunYearStr[i], this.daYunSuiStr[i]);
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
                this.daYunInfo[i] = wuXingGZSys.getZhuInfo(String((i - 1) + '運' + daYunNum), daYunNum, riGanNo, this.daYunYearStr[i], this.daYunSuiStr[i]);
            }
        }
    }
    setLiuYearZhuInfo(daYunSelectNo1, riGanNo) {
        let daYunSelectNo = daYunSelectNo1;
        let startYear, yearZhuNo;
        if (daYunSelectNo < -1) {
            daYunSelectNo = 0;
        }
        else if (daYunSelectNo > 13) {
            daYunSelectNo = 13;
        }
        baZiInfo.DaYunSelectNo = daYunSelectNo;
        startYear = this.daYunYearNum[daYunSelectNo][0] - 2;
        for (let i = 0; i < 14; i++) {
            this.liuYearYearNum[i] = startYear + i;
            yearZhuNo = wuXingGZSys.getYear2GanZhiNo(startYear + i);
            this.liuYearInfo[i] = wuXingGZSys.getZhuInfo(String((i - 2) + '年'), yearZhuNo, riGanNo, (startYear + i), ((startYear + i) - this.daYunYearNum[1][0]));
        }
    }
    setLiuMonthZhuInfo(daYunSelectNo1, liuYearSelectNo1, riGanNo) {
        let daYunSelectNo = daYunSelectNo1;
        let liuYearSelectNo = liuYearSelectNo1;
        let thisLiuYear, thisLiuYearZhuNo;
        let liuYearGanNo, monthZhuNo;
        let liuMonthMD;
        let j;
        let monthName = '';
        if (daYunSelectNo < -1) {
            daYunSelectNo = 0;
        }
        else if (daYunSelectNo > 13) {
            daYunSelectNo = 13;
        }
        baZiInfo.DaYunSelectNo = daYunSelectNo;
        baZiInfo.liuYearSelectNo = liuYearSelectNo;
        thisLiuYear = this.daYunYearNum[liuYearSelectNo][0];
        thisLiuYearZhuNo = wuXingGZSys.getYear2GanZhiNo(thisLiuYear);
        console.log('setLiuMonthZhuInfo()選擇大運是：' + daYunSelectNo + '/流年柱是：' + liuYearSelectNo + '/流年是：' + thisLiuYear + '年/年柱號：' + thisLiuYearZhuNo);
        for (let i = 0; i < 14; i++) {
            if (i < 2) {
                thisLiuYear = this.liuYearYearNum[liuYearSelectNo] - 1;
                liuYearGanNo = wuXingGZSys.getYear2GanNo(thisLiuYear);
            }
            else {
                thisLiuYear = this.liuYearYearNum[liuYearSelectNo];
                liuYearGanNo = wuXingGZSys.getYear2GanNo(thisLiuYear);
            }
            j = i + 1;
            if (j > 12) {
                j = j - 12;
            }
            this.liuMonthJD[i] = wuXingGZSys.getMonthJieQiJD(thisLiuYear, j).startJD;
            monthZhuNo = Number(wuXingGZSys.getMonthZhuNoByYearGanNo(liuYearGanNo, j));
            liuMonthMD = (JD.setJD2YMD(this.liuMonthJD[i]))[1] + '/' + (JD.setJD2YMD(this.liuMonthJD[i]))[2];
            if (i == 0) {
                monthName = '11月';
            }
            else if (i == 1) {
                monthName = '12月';
            }
            else if (i >= 2) {
                monthName = (i - 1) + '月';
            }
            this.liuMonthInfo[i] = wuXingGZSys.getZhuInfo(monthName, monthZhuNo, riGanNo, '', liuMonthMD);
        }
    }
    setBaZiLiuYearZhuInfo(liuDateTime, localLongitude, timeZone, thisMeGanNo = -1) {
        let i, vLiu;
        this.timeZone = timeZone;
        this.longitude = localLongitude;
        this.thisLiuYear = (JD.dateTimeStrSeparate(liuDateTime)[0]) * (JD.dateTimeStrSeparate(liuDateTime)[1]);
        this.thisLiuMonth = JD.dateTimeStrSeparate(liuDateTime)[2];
        this.thisLiuDay = JD.dateTimeStrSeparate(liuDateTime)[3];
        this.thisLiuTime = JD.dateTimeStrSeparate(liuDateTime)[6];
        this.thisLiuHemisphere = (JD.dateTimeStrSeparate(liuDateTime)[8] == 0) ? true : false;
        let jdLiu = JD.JD(this.thisLiuYear, this.thisLiuMonth, this.thisLiuDay + (this.thisLiuTime / 24.0));
        let jdLiuTemp = jdLiu - J2000;
        let wLiu = Sun_Moon_Ephemeris.S_aLon(jdLiuTemp / 36525, -1);
        let kLiu = int2((wLiu / pi2 * 360 + 45 + 15 * 360) / 30);
        jdLiuTemp += 13 / 24;
        let thisLiuDayNum = Math.floor(jdLiuTemp);
        let liuShiChenNum = int2((jdLiuTemp - thisLiuDayNum) * 12);
        let thisLiuMonthNo;
        vLiu = int2(kLiu / 12 + 6000000);
        this.liuYearZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisLiuYear) + '年', wuXingGZSys.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1), thisMeGanNo);
        vLiu = kLiu + 2 + 60000000;
        if (this.thisLiuHemisphere) {
            thisLiuMonthNo = wuXingGZSys.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1);
            this.liuMonthZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisLiuMonth) + '月', thisLiuMonthNo, thisMeGanNo);
        }
        else {
            thisLiuMonthNo = wuXingGZSys.getZhuNoByGanZhiNo(vLiu % 10 + 1, (vLiu + 6) % 12 + 1);
            this.liuMonthZhuInfo = wuXingGZSys.getZhuInfo('南' + String(this.thisLiuMonth) + '月', thisLiuMonthNo, thisMeGanNo);
        }
        vLiu = thisLiuDayNum - 6 + 9000000;
        this.liuDayZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisLiuDay) + '日', wuXingGZSys.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1), thisMeGanNo);
        vLiu = (thisLiuDayNum - 1) * 12 + 90000000 + liuShiChenNum;
        this.liuTimeZhuInfo = wuXingGZSys.getZhuInfo(String(this.thisLiuTime).slice(0, 5) + '時', wuXingGZSys.getZhuNoByGanZhiNo(vLiu % 10 + 1, vLiu % 12 + 1), thisMeGanNo);
    }
    baZiToDateCal(yearZhuNo, monthZhuZhiNo, dayZhuNo, timeZhuZhiNo, startYear = 1500, endYear = 2105) {
        let startYearTemp = startYear;
        let endYearTemp = endYear + 1;
        let yearLoopNum = Math.trunc((startYearTemp + 10017) / 60);
        let startDayJD = (startYearTemp + 4712) * 365.2524;
        let endDayJD = (endYearTemp + 4713) * 365.2524;
        let thisJD = [];
        let T_Start = 0;
        let T_End = 0;
        let jdStartTemp = 0;
        let jdEndTemp = 0;
        for (let i = 0; (-10017 + (i + yearLoopNum) * 60 + yearZhuNo) <= endYearTemp; i++) {
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
