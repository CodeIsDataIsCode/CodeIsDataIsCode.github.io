"use strict";
class SanYuanJiuYunInfo {
    constructor() {
        //No[0]、三元[1]、運數[2]、顏色[3]、五行[4]、九星[5]、卦[6]、符[7]、[8]、[9]、[10]、[11]、[12]、[13]、[14]、[]、
        this.SanYuanJiuYunA = new Array(['0', '上元', '一', '白', '水', '贫狼', '坎', '☵', '', '', '', '', '', '', ''], ['1', '上元', '二', '黒', '土', '巨门', '坤', '☷', '', '', '', '', '', '', ''], ['2', '上元', '三', '碧', '木', '禄存', '震', '☳', '', '', '', '', '', '', ''], ['3', '中元', '四', '緑', '木', '文曲', '巽', '☴', '', '', '', '', '', '', ''], ['4', '中元', '五', '黄', '土', '廉贞', '中 ', '', '', '', '', '', '', '', ''], ['5', '中元', '六', '白', '金', '武曲', '乾', '☰', '', '', '', '', '', '', ''], ['6', '下元', '七', '赤', '金', '破军', '兌', '☱', '', '', '', '', '', '', ''], ['7', '下元', '八', '白', '土', '左辅', '艮', '☶', '', '', '', '', '', '', ''], ['8', '下元', '九', '紫', '火', '右弼', '離', '☲', '', '', '', '', '', '', '']);
    }
    getYunNo(yearNo) {
        let vYearTemp = yearNo;
        let vYearModTemp;
        let vYunNoTemp;
        if (vYearTemp < 0) {
            vYearTemp = vYearTemp + 18001 + 116;
        }
        else {
            vYearTemp = vYearTemp + 116;
        }
        vYearModTemp = ((vYearTemp) % 180);
        vYunNoTemp = parseInt(vYearModTemp / 20);
        //console.log('getYunNo():小運號' + (vYunNoTemp+1) +'/' + yearNo + '年');
        return vYunNoTemp;
    }
    getYunName(yearNo) {
        let vYunNoTemp = this.getYunNo(yearNo);
        let yunNameTemp = this.SanYuanJiuYunA[vYunNoTemp][1] + this.SanYuanJiuYunA[vYunNoTemp][2]
            + this.SanYuanJiuYunA[vYunNoTemp][3] + this.SanYuanJiuYunA[vYunNoTemp][4] + '運';
        return (yunNameTemp);
    }
}
var sanYuanSysTemp = new SanYuanJiuYunInfo();
