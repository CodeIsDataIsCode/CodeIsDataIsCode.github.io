"use strict";
class _yinYang64GuaSystem_ {
    constructor() {
        this.yY64Gua = new Array(["1", "24", "50", "復", "䷗", "坤", "☷", "8", "地", "震", "☳", "4", "雷"], ["2", "27", "39", "頤", "䷚", "艮", "☶", "7", "山", "震", "☳", "4", "雷"], ["3", "3", "11", "屯", "䷂", "坎", "☵", "6", "水", "震", "☳", "4", "雷"], ["4", "42", "36", "益", "䷩", "巽", "☴", "5", "风", "震", "☳", "4", "雷"], ["5", "51", "25", "震", "䷲", "震", "☳", "4", "雷", "震", "☳", "4", "雷"], ["6", "21", "38", "噬嗑", "䷔", "离", "☲", "3", "火", "震", "☳", "4", "雷"], ["7", "17", "32", "隨", "䷐", "兑", "☱", "2", "泽", "震", "☳", "4", "雷"], ["8", "25", "37", "無妄", "䷘", "乾", "☰", "1", "天", "震", "☳", "4", "雷"], ["9", "36", "15", "明夷", "䷣", "坤", "☷", "8", "地", "离", "☲", "3", "火"], ["10", "22", "18", "賁", "䷕", "艮", "☶", "7", "山", "离", "☲", "3", "火"], ["11", "63", "12", "既濟", "䷾", "坎", "☵", "6", "水", "离", "☲", "3", "火"], ["12", "37", "35", "家人", "䷤", "巽", "☴", "5", "风", "离", "☲", "3", "火"], ["13", "55", "14", "豐", "䷶", "震", "☳", "4", "雷", "离", "☲", "3", "火"], ["14", "30", "41", "離", "䷝", "离", "☲", "3", "火", "离", "☲", "3", "火"], ["15", "49", "13", "革", "䷰", "兑", "☱", "2", "泽", "离", "☲", "3", "火"], ["16", "13", "48", "同人", "䷌", "乾", "☰", "1", "天", "离", "☲", "3", "火"], ["17", "19", "51", "臨", "䷒", "坤", "☷", "8", "地", "兑", "☱", "2", "泽"], ["18", "41", "20", "損", "䷨", "艮", "☶", "7", "山", "兑", "☱", "2", "泽"], ["19", "60", "10", "節", "䷻", "坎", "☵", "6", "水", "兑", "☱", "2", "泽"], ["20", "61", "23", "中孚", "䷼", "巽", "☴", "5", "风", "兑", "☱", "2", "泽"], ["21", "54", "64", "歸妹", "䷵", "震", "☳", "4", "雷", "兑", "☱", "2", "泽"], ["22", "38", "21", "睽", "䷥", "离", "☲", "3", "火", "兑", "☱", "2", "泽"], ["23", "58", "57", "兌", "䷹", "兑", "☱", "2", "泽", "兑", "☱", "2", "泽"], ["24", "10", "22", "履", "䷉", "乾", "☰", "1", "天", "兑", "☱", "2", "泽"], ["25", "11", "52", "泰", "䷊", "坤", "☷", "8", "地", "乾", "☰", "1", "天"], ["26", "26", "19", "大畜", "䷙", "艮", "☶", "7", "山", "乾", "☰", "1", "天"], ["27", "5", "55", "需", "䷄", "坎", "☵", "6", "水", "乾", "☰", "1", "天"], ["28", "9", "34", "小畜", "䷈", "巽", "☴", "5", "风", "乾", "☰", "1", "天"], ["29", "34", "53", "大壯", "䷡", "震", "☳", "4", "雷", "乾", "☰", "1", "天"], ["30", "14", "8", "大有", "䷍", "离", "☲", "3", "火", "乾", "☰", "1", "天"], ["31", "43", "54", "夬", "䷪", "兑", "☱", "2", "泽", "乾", "☰", "1", "天"], ["32", "1", "1", "乾", "䷀", "乾", "☰", "1", "天", "乾", "☰", "1", "天"], ["33", "44", "2", "姤", "䷫", "乾", "☰", "1", "天", "巽", "☴", "5", "风"], ["34", "28", "31", "大過", "䷛", "兑", "☱", "2", "泽", "巽", "☴", "5", "风"], ["35", "50", "43", "鼎", "䷱", "离", "☲", "3", "火", "巽", "☴", "5", "风"], ["36", "32", "28", "恆", "䷟", "震", "☳", "4", "雷", "巽", "☴", "5", "风"], ["37", "57", "33", "巽", "䷸", "巽", "☴", "5", "风", "巽", "☴", "5", "风"], ["38", "48", "30", "井", "䷯", "坎", "☵", "6", "水", "巽", "☴", "5", "风"], ["39", "18", "40", "蠱", "䷑", "艮", "☶", "7", "山", "巽", "☴", "5", "风"], ["40", "46", "29", "升", "䷭", "坤", "☷", "8", "地", "巽", "☴", "5", "风"], ["41", "6", "47", "訟", "䷅", "乾", "☰", "1", "天", "坎", "☵", "6", "水"], ["42", "47", "58", "困", "䷮", "兑", "☱", "2", "泽", "坎", "☵", "6", "水"], ["43", "64", "44", "未濟", "䷿", "离", "☲", "3", "火", "坎", "☵", "6", "水"], ["44", "40", "27", "解", "䷧", "震", "☳", "4", "雷", "坎", "☵", "6", "水"], ["45", "59", "46", "渙", "䷺", "巽", "☴", "5", "风", "坎", "☵", "6", "水"], ["46", "29", "9", "坎", "䷜", "坎", "☵", "6", "水", "坎", "☵", "6", "水"], ["47", "4", "45", "蒙", "䷃", "艮", "☶", "7", "山", "坎", "☵", "6", "水"], ["48", "7", "16", "師", "䷆", "坤", "☷", "8", "地", "坎", "☵", "6", "水"], ["49", "33", "3", "遁", "䷠", "乾", "☰", "1", "天", "艮", "☶", "7", "山"], ["50", "31", "60", "咸", "䷞", "兑", "☱", "2", "泽", "艮", "☶", "7", "山"], ["51", "56", "42", "旅", "䷷", "离", "☲", "3", "火", "艮", "☶", "7", "山"], ["52", "62", "63", "小過", "䷽", "震", "☳", "4", "雷", "艮", "☶", "7", "山"], ["53", "53", "24", "漸", "䷴", "巽", "☴", "5", "风", "艮", "☶", "7", "山"], ["54", "39", "61", "蹇", "䷦", "坎", "☵", "6", "水", "艮", "☶", "7", "山"], ["55", "52", "17", "艮", "䷳", "艮", "☶", "7", "山", "艮", "☶", "7", "山"], ["56", "15", "62", "謙", "䷎", "坤", "☷", "8", "地", "艮", "☶", "7", "山"], ["57", "12", "4", "否", "䷋", "乾", "☰", "1", "天", "坤", "☷", "8", "地"], ["58", "45", "59", "萃", "䷬", "兑", "☱", "2", "泽", "坤", "☷", "8", "地"], ["59", "35", "7", "晉", "䷢", "离", "☲", "3", "火", "坤", "☷", "8", "地"], ["60", "16", "26", "豫", "䷏", "震", "☳", "4", "雷", "坤", "☷", "8", "地"], ["61", "20", "5", "觀", "䷓", "巽", "☴", "5", "风", "坤", "☷", "8", "地"], ["62", "8", "56", "比", "䷇", "坎", "☵", "6", "水", "坤", "☷", "8", "地"], ["63", "23", "6", "剝", "䷖", "艮", "☶", "7", "山", "坤", "☷", "8", "地"], ["64", "2", "49", "坤", "䷁", "坤", "☷", "8", "地", "坤", "☷", "8", "地"]);
        this.yY64GuaFu = new Array();
        this.yY8Gua = new Array();
        this.yY64GuaBian = new Array([1, 1, 64], [1, 2, 17], [1, 3, 9], [1, 4, 5], [1, 5, 3], [1, 6, 2], [2, 1, 63], [2, 2, 18], [2, 3, 10], [2, 4, 6], [2, 5, 4], [2, 6, 1], [3, 1, 62], [3, 2, 19], [3, 3, 11], [3, 4, 7], [3, 5, 1], [3, 6, 4], [4, 1, 61], [4, 2, 20], [4, 3, 12], [4, 4, 8], [4, 5, 2], [4, 6, 3], [5, 1, 60], [5, 2, 21], [5, 3, 13], [5, 4, 1], [5, 5, 7], [5, 6, 6], [6, 1, 59], [6, 2, 22], [6, 3, 14], [6, 4, 2], [6, 5, 8], [6, 6, 5], [7, 1, 58], [7, 2, 23], [7, 3, 15], [7, 4, 3], [7, 5, 5], [7, 6, 8], [8, 1, 57], [8, 2, 24], [8, 3, 16], [8, 4, 4], [8, 5, 6], [8, 6, 7], [9, 1, 56], [9, 2, 25], [9, 3, 1], [9, 4, 13], [9, 5, 11], [9, 6, 10], [10, 1, 55], [10, 2, 26], [10, 3, 2], [10, 4, 14], [10, 5, 12], [10, 6, 9], [11, 1, 54], [11, 2, 27], [11, 3, 3], [11, 4, 15], [11, 5, 9], [11, 6, 12], [12, 1, 53], [12, 2, 28], [12, 3, 4], [12, 4, 16], [12, 5, 10], [12, 6, 11], [13, 1, 52], [13, 2, 29], [13, 3, 5], [13, 4, 9], [13, 5, 15], [13, 6, 14], [14, 1, 51], [14, 2, 30], [14, 3, 6], [14, 4, 10], [14, 5, 16], [14, 6, 13], [15, 1, 50], [15, 2, 31], [15, 3, 7], [15, 4, 11], [15, 5, 13], [15, 6, 16], [16, 1, 49], [16, 2, 32], [16, 3, 8], [16, 4, 12], [16, 5, 14], [16, 6, 15], [17, 1, 48], [17, 2, 1], [17, 3, 25], [17, 4, 21], [17, 5, 19], [17, 6, 18], [18, 1, 47], [18, 2, 2], [18, 3, 26], [18, 4, 22], [18, 5, 20], [18, 6, 17], [19, 1, 46], [19, 2, 3], [19, 3, 27], [19, 4, 23], [19, 5, 17], [19, 6, 20], [20, 1, 45], [20, 2, 4], [20, 3, 28], [20, 4, 24], [20, 5, 18], [20, 6, 19], [21, 1, 44], [21, 2, 5], [21, 3, 29], [21, 4, 17], [21, 5, 23], [21, 6, 22], [22, 1, 43], [22, 2, 6], [22, 3, 30], [22, 4, 18], [22, 5, 24], [22, 6, 21], [23, 1, 42], [23, 2, 7], [23, 3, 31], [23, 4, 19], [23, 5, 21], [23, 6, 24], [24, 1, 41], [24, 2, 8], [24, 3, 32], [24, 4, 20], [24, 5, 22], [24, 6, 23], [25, 1, 40], [25, 2, 9], [25, 3, 17], [25, 4, 29], [25, 5, 27], [25, 6, 26], [26, 1, 39], [26, 2, 10], [26, 3, 18], [26, 4, 30], [26, 5, 28], [26, 6, 25], [27, 1, 38], [27, 2, 11], [27, 3, 19], [27, 4, 31], [27, 5, 25], [27, 6, 28], [28, 1, 37], [28, 2, 12], [28, 3, 20], [28, 4, 32], [28, 5, 26], [28, 6, 27], [29, 1, 36], [29, 2, 13], [29, 3, 21], [29, 4, 25], [29, 5, 31], [29, 6, 30], [30, 1, 35], [30, 2, 14], [30, 3, 22], [30, 4, 26], [30, 5, 32], [30, 6, 29], [31, 1, 34], [31, 2, 15], [31, 3, 23], [31, 4, 27], [31, 5, 29], [31, 6, 32], [32, 1, 33], [32, 2, 16], [32, 3, 24], [32, 4, 28], [32, 5, 30], [32, 6, 31], [33, 1, 32], [33, 2, 49], [33, 3, 41], [33, 4, 37], [33, 5, 35], [33, 6, 34], [34, 1, 31], [34, 2, 50], [34, 3, 42], [34, 4, 38], [34, 5, 36], [34, 6, 33], [35, 1, 30], [35, 2, 51], [35, 3, 43], [35, 4, 39], [35, 5, 33], [35, 6, 36], [36, 1, 29], [36, 2, 52], [36, 3, 44], [36, 4, 40], [36, 5, 34], [36, 6, 35], [37, 1, 28], [37, 2, 53], [37, 3, 45], [37, 4, 33], [37, 5, 39], [37, 6, 38], [38, 1, 27], [38, 2, 54], [38, 3, 46], [38, 4, 34], [38, 5, 40], [38, 6, 37], [39, 1, 26], [39, 2, 55], [39, 3, 47], [39, 4, 35], [39, 5, 37], [39, 6, 40], [40, 1, 25], [40, 2, 56], [40, 3, 48], [40, 4, 36], [40, 5, 38], [40, 6, 39], [41, 1, 24], [41, 2, 57], [41, 3, 33], [41, 4, 45], [41, 5, 43], [41, 6, 42], [42, 1, 23], [42, 2, 58], [42, 3, 34], [42, 4, 46], [42, 5, 44], [42, 6, 41], [43, 1, 22], [43, 2, 59], [43, 3, 35], [43, 4, 47], [43, 5, 41], [43, 6, 44], [44, 1, 21], [44, 2, 60], [44, 3, 36], [44, 4, 48], [44, 5, 42], [44, 6, 43], [45, 1, 20], [45, 2, 61], [45, 3, 37], [45, 4, 41], [45, 5, 47], [45, 6, 46], [46, 1, 19], [46, 2, 62], [46, 3, 38], [46, 4, 42], [46, 5, 48], [46, 6, 45], [47, 1, 18], [47, 2, 63], [47, 3, 39], [47, 4, 43], [47, 5, 45], [47, 6, 48], [48, 1, 17], [48, 2, 64], [48, 3, 40], [48, 4, 44], [48, 5, 46], [48, 6, 47], [49, 1, 16], [49, 2, 33], [49, 3, 57], [49, 4, 53], [49, 5, 51], [49, 6, 50], [50, 1, 15], [50, 2, 34], [50, 3, 58], [50, 4, 54], [50, 5, 52], [50, 6, 49], [51, 1, 14], [51, 2, 35], [51, 3, 59], [51, 4, 55], [51, 5, 49], [51, 6, 52], [52, 1, 13], [52, 2, 36], [52, 3, 60], [52, 4, 56], [52, 5, 50], [52, 6, 51], [53, 1, 12], [53, 2, 37], [53, 3, 61], [53, 4, 49], [53, 5, 55], [53, 6, 54], [54, 1, 11], [54, 2, 38], [54, 3, 62], [54, 4, 50], [54, 5, 56], [54, 6, 53], [55, 1, 10], [55, 2, 39], [55, 3, 63], [55, 4, 51], [55, 5, 53], [55, 6, 56], [56, 1, 9], [56, 2, 40], [56, 3, 64], [56, 4, 52], [56, 5, 54], [56, 6, 55], [57, 1, 8], [57, 2, 41], [57, 3, 49], [57, 4, 61], [57, 5, 59], [57, 6, 58], [58, 1, 7], [58, 2, 42], [58, 3, 50], [58, 4, 62], [58, 5, 60], [58, 6, 57], [59, 1, 6], [59, 2, 43], [59, 3, 51], [59, 4, 63], [59, 5, 57], [59, 6, 60], [60, 1, 5], [60, 2, 44], [60, 3, 52], [60, 4, 64], [60, 5, 58], [60, 6, 59], [61, 1, 4], [61, 2, 45], [61, 3, 53], [61, 4, 57], [61, 5, 63], [61, 6, 62], [62, 1, 3], [62, 2, 46], [62, 3, 54], [62, 4, 58], [62, 5, 64], [62, 6, 61], [63, 1, 2], [63, 2, 47], [63, 3, 55], [63, 4, 59], [63, 5, 61], [63, 6, 64], [64, 1, 1], [64, 2, 48], [64, 3, 56], [64, 4, 60], [64, 5, 62], [64, 6, 63]);
    }
    initInfo(yearNo) {
    }
    getGuaName(xianTianGuaNo) {
        let guaNo = ((xianTianGuaNo - 1) % 64 + 64) % 64;
        return this.yY64Gua[guaNo][3];
    }
    getGuaFu(xianTianGuaNo) {
        let guaNo = ((xianTianGuaNo - 1) % 64 + 64) % 64;
        return this.yY64Gua[guaNo][4];
    }
    getGuaFullName(xianTianGuaNo) {
        let guaNo = ((xianTianGuaNo - 1) % 64 + 64) % 64;
        return (this.yY64Gua[guaNo][8] + this.yY64Gua[guaNo][12]
            + this.yY64Gua[guaNo][3] + this.yY64Gua[guaNo][4]);
    }
    getGuaBianNo(xianTianGuaNo, yaoNo) {
        let guaNo = ((xianTianGuaNo - 1) % 64 + 64) % 64;
        let yNo = ((yaoNo - 1) % 6 + 6) % 6;
        let No = guaNo * 6 + yNo;
        return this.yY64GuaBian[No][2];
    }
    getBGuaName(xianTianGuaNo, yaoNo) {
        let guaNo = this.getGuaBianNo(xianTianGuaNo, yaoNo);
        return this.yY64Gua[guaNo][3];
    }
    getBGuaFu(xianTianGuaNo, yaoNo) {
        let guaNo = this.getGuaBianNo(xianTianGuaNo, yaoNo);
        return this.yY64Gua[guaNo][4];
    }
    getBGuaFullName(xianTianGuaNo, yaoNo) {
        let guaNo = this.getGuaBianNo(xianTianGuaNo, yaoNo) - 1;
        return (this.yY64Gua[guaNo][8] + this.yY64Gua[guaNo][12]
            + this.yY64Gua[guaNo][3] + this.yY64Gua[guaNo][4]);
    }
}
var yinYang64Gua = new _yinYang64GuaSystem_();
class _HuangJiJingShiSystem_ {
    constructor() {
        this.yY64Gua = new _yinYang64GuaSystem_();
        this.yueHuiGuaNo = [1, 17, 25, 29, 30, 32, 33, 49, 57, 61, 63, 64, 1];
        this.yueHuiGuaName = ["复", "临", "泰", "大壮", "夬", "乾", "姤", "遁", "否", "观", "剥", "坤", "复"];
        this.yueHuiGuaFu = ["䷗", "䷒", "䷊", "䷡", "䷪", "䷀", "䷫", "䷠", "䷋", "䷓", "䷖", "䷁", "䷗"];
    }
    ;
    initInfo(year) {
        this.NYear = year + 2577;
        this.JiaZiNum = Math.floor((this.NYear - 1) / 60) + 1;
        this.JiaZiNo = ((this.NYear - 1) % 60 + 60) % 60 + 1;
        this.yueHuiNo = (Math.floor((year + 67016) / 10800) % 12 + 12) % 12 + 1;
        this.yueHuiJiaZiNo = (Math.floor((year + 67016) / 2160) % 60 + 60) % 60 + 1;
        this.yueHuiGuaNo = this.jiaZiNo2GuaNo(this.yueHuiJiaZiNo);
        this.daYunNo = (Math.floor((year + 67016) / 360) % 360 + 360) % 360 + 1;
        this.daYunJiaZiNo = Math.floor((this.daYunNo - 1) / 6) + 1;
        this.daYunYHGuaNo = this.jiaZiNo2GuaNo(this.daYunJiaZiNo);
        this.daYunYaoNo = (this.daYunNo - 1) % 6 + 1;
        this.daYunGuaNo = this.yY64Gua.getGuaBianNo(this.yueHuiGuaNo, this.daYunYaoNo);
        this.zhongYunNo = (Math.floor((year + 67016) / 60) % 2160 + 2160) % 2160 + 1;
        this.zhongYunJiaZiNo = (this.zhongYunNo - 1) % 60 + 1;
        this.zhongYunYaoNo = (this.zhongYunNo - 1) % 6 + 1;
        this.zhongYunGuaNo = this.yY64Gua.getGuaBianNo(this.daYunGuaNo, this.zhongYunYaoNo);
        this.xiaoYunNo = (Math.floor((year + 67016) / 10) % 12960 + 12960) % 12960 + 1;
        this.xiaoYunYaoNo = (this.xiaoYunNo - 1) % 6 + 1;
        this.xiaoYunGuaNo = this.yY64Gua.getGuaBianNo(this.zhongYunGuaNo, this.xiaoYunYaoNo);
        this.yueHuiStartYear = (this.yueHuiNo - 1) * 10800 - 67016;
        this.yueHuiEndYear = this.yueHuiStartYear + 10799;
        this.yueHuiGuaStartYear = (this.yueHuiJiaZiNo - 1) * 2160 - 67016;
        this.yueHuiGuaEndYear = this.yueHuiGuaStartYear + 2159;
        this.daYunStartYear = (this.daYunNo - 1) * 360 - 67016;
        this.daYunEndYear = this.daYunStartYear + 359;
        this.zhongYunStartYear = (this.zhongYunNo - 1) * 60 - 67016;
        this.zhongYunEndYear = this.zhongYunStartYear + 59;
        this.xiaoYunStartYear = (this.xiaoYunNo - 1) * 10 - 67016;
        this.xiaoYunEndYear = this.xiaoYunStartYear + 9;
        let guaNo = this.zhongYunGuaNo;
        if ((this.zhongYunGuaNo == 14) || (this.zhongYunGuaNo == 32) || (this.zhongYunGuaNo == 46)) {
            guaNo += 1;
        }
        else if (this.zhongYunGuaNo == 64) {
            guaNo = 1;
        }
        this.zhiYearJiaZiNo = (year - this.zhongYunStartYear + this.guaNo2JiaZiNo(guaNo) - 1) % 60 + 1;
        this.zhiYearGuaNo = this.jiaZiNo2GuaNo(this.zhiYearJiaZiNo);
    }
    ;
    getYueHuiStartYear() {
        return this.yueHuiStartYear;
    }
    ;
    getYueHuiEndYear() {
        return this.yueHuiEndYear;
    }
    ;
    getYueHuiGuaStartYear() {
        return this.yueHuiGuaStartYear;
    }
    ;
    getYueHuiGuaEndYear() {
        return this.yueHuiGuaEndYear;
    }
    ;
    getDaYunStartYear() {
        return this.daYunStartYear;
    }
    ;
    getDaYunEndYear() {
        return this.daYunEndYear;
    }
    ;
    getZhongYunStartYear() {
        return this.zhongYunStartYear;
    }
    ;
    getZhongYunEndYear() {
        return this.zhongYunEndYear;
    }
    ;
    getXiaoYunStartYear() {
        return this.xiaoYunStartYear;
    }
    ;
    getXiaoYunEndYear() {
        return this.xiaoYunEndYear;
    }
    ;
    getYueHuiNo() {
        return this.yueHuiNo;
    }
    ;
    getYueHuiJiaZiNo() {
        return this.yueHuiJiaZiNo;
    }
    ;
    getYueHuiGuaNo() {
        return this.yueHuiGuaNo;
    }
    ;
    getDaYunNo() {
        return this.daYunNo;
    }
    ;
    getDaYunJiaZiNo() {
        return this.daYunJiaZiNo;
    }
    ;
    getDaYunYaoNo() {
        return this.daYunYaoNo;
    }
    ;
    getDaYunYHGuaNo() {
        return this.daYunYHGuaNo;
    }
    ;
    getDaYunGuaNo() {
        return this.daYunGuaNo;
    }
    ;
    getZhongYunNo() {
        return this.zhongYunNo;
    }
    ;
    getZhongYunYaoNo() {
        return this.zhongYunYaoNo;
    }
    ;
    getZhongYunGuaNo() {
        return this.zhongYunGuaNo;
    }
    ;
    getXiaoYunNo() {
        return this.xiaoYunNo;
    }
    ;
    getXiaoYunYaoNo() {
        return this.xiaoYunYaoNo;
    }
    ;
    getXiaoYunGuaNo() {
        return this.xiaoYunGuaNo;
    }
    ;
    getZhiYearJiaZiNo() {
        return this.zhiYearJiaZiNo;
    }
    ;
    getZhiYearGuaNo() {
        return this.zhiYearGuaNo;
    }
    ;
    getYueHuiName() {
        let No = this.yueHuiNo - 1;
        return (diZhiName[No] + "月会" + this.yueHuiGuaFu[No] + this.yueHuiGuaName[No]);
    }
    ;
    getYueHuiGuaName() {
        return this.yY64Gua.getGuaFullName(this.yueHuiGuaNo);
    }
    ;
    getDaYunGuaName() {
        return this.yY64Gua.getBGuaFullName(this.yueHuiGuaNo, this.daYunYaoNo);
    }
    ;
    getZhongYunGuaName() {
        return this.yY64Gua.getBGuaFullName(this.daYunGuaNo, this.zhongYunYaoNo);
    }
    ;
    getXiaoYunGuaName() {
        return this.yY64Gua.getBGuaFullName(this.zhongYunGuaNo, this.xiaoYunYaoNo);
    }
    ;
    getZhiYearGuaName() {
        return this.yY64Gua.getGuaFullName(this.zhiYearGuaNo);
    }
    ;
    getNYear() {
        return this.NYear;
    }
    getJiaZiNum() {
        return this.JiaZiNum;
    }
    getJiaZiNo() {
        return this.JiaZiNo;
    }
    jiaZiNo2GuaNo(jiaZiNo) {
        let guaNo = 0;
        if (jiaZiNo < 14) {
            guaNo = jiaZiNo;
        }
        else if (jiaZiNo < 31) {
            guaNo = jiaZiNo + 1;
        }
        else if (jiaZiNo < 44) {
            guaNo = jiaZiNo + 2;
        }
        else if (jiaZiNo < 61) {
            guaNo = jiaZiNo + 3;
        }
        return guaNo;
    }
    guaNo2JiaZiNo(guaNo) {
        let jiaZiNo = 0;
        if (guaNo < 14) {
            jiaZiNo = guaNo;
        }
        else if (guaNo == 14) {
            jiaZiNo = 14;
        }
        else if (guaNo < 32) {
            jiaZiNo = guaNo - 1;
        }
        else if (guaNo == 32) {
            jiaZiNo = 31;
        }
        else if (guaNo < 46) {
            jiaZiNo = guaNo - 2;
        }
        else if (guaNo == 46) {
            jiaZiNo = 44;
        }
        else if (guaNo < 64) {
            jiaZiNo = guaNo - 3;
        }
        else if (guaNo == 64) {
            jiaZiNo = 1;
        }
        return jiaZiNo;
    }
}
;
var huangJiJingShiInfo = new _HuangJiJingShiSystem_();
