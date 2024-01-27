"use strict";
class _SanYuanJiuYunInfo_ {
    constructor() {
        this.year = 0;
        this.daYuanNo = 0;
        this.yunNo = 0;
        this.yuanNo = 0;
        this.yearMod = 0;
        this.yunName = "";
        this.yunGuaName = "";
        this.yunStarName = "";
        this.yuanStartYear = 0;
        this.yuanEndYear = 0;
        this.yunStartYear = 0;
        this.yunEndYear = 0;
        this.startEndYear = "";
        this.SY_Info = new Array(['0', '上元', '一', '白', '水', '贪狼', '坎', '☵', '', '', '', '', '', '', ''], ['1', '上元', '二', '黒', '土', '巨门', '坤', '☷', '', '', '', '', '', '', ''], ['2', '上元', '三', '碧', '木', '禄存', '震', '☳', '', '', '', '', '', '', ''], ['3', '中元', '四', '緑', '木', '文曲', '巽', '☴', '', '', '', '', '', '', ''], ['4', '中元', '五', '黄', '土', '廉贞', '中', 'O', '', '', '', '', '', '', ''], ['5', '中元', '六', '白', '金', '武曲', '乾', '☰', '', '', '', '', '', '', ''], ['6', '下元', '七', '赤', '金', '破军', '兌', '☱', '', '', '', '', '', '', ''], ['7', '下元', '八', '白', '土', '左辅', '艮', '☶', '', '', '', '', '', '', ''], ['8', '下元', '九', '紫', '火', '右弼', '離', '☲', '', '', '', '', '', '', '']);
    }
    initInfo(yearNo) {
        this.year = yearNo;
        this.daYuanNo = Math.floor((this.year + 116) / 180);
        this.yearMod = ((this.year + 116) % 180 + 180) % 180;
        this.yuanNo = parseInt(this.yearMod / 60) + 1;
        this.yunNo = parseInt(this.yearMod / 20) + 1;
        this.yuanStartYear = this.daYuanNo * 180 - 116;
        this.yuanEndYear = this.yuanStartYear + 179;
        this.yunStartYear = this.yuanStartYear + (this.yunNo - 1) * 20;
        this.yunEndYear = this.yunStartYear + 19;
        let No = this.yunNo - 1;
        this.yunName = this.SY_Info[No][1] + this.SY_Info[No][2] + this.SY_Info[No][3] + this.SY_Info[No][6] + this.SY_Info[No][4];
        this.yunGuaName = this.SY_Info[No][6] + this.SY_Info[No][7];
        this.yunStarName = this.SY_Info[No][5];
        this.startEndYear = this.yuanStartYear + "→[" + this.yunStartYear + "~" + this.yunEndYear + "]→" + this.yuanEndYear;
    }
    getYuanNo() {
        return this.yuanNo;
    }
    getYunStartYear() {
        return this.yunStartYear;
    }
    getYunEndYear() {
        return this.yunEndYear;
    }
    getYuanStartYear() {
        return this.yuanStartYear;
    }
    getYuanEndYear() {
        return this.yuanEndYear;
    }
    getYunNo() {
        return this.yunNo;
    }
    getYunName() {
        return (this.yunName + '運');
    }
    getYunGuaName() {
        return this.yunGuaName;
    }
    getYunStarName() {
        return (this.yunStarName + '星');
    }
    getStartEndYear() {
        return this.startEndYear;
    }
}
var sanYuanYunInfo = new _SanYuanJiuYunInfo_();
