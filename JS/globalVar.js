"use strict";
/***********************
*本软件使用 http://www.nongli.net/sxwnl/的相关日历算法，并参考其相关的界面设计
*https://github.com/sxwnl/sxwnl
*https://github.com/sxwnl/sxwnl-cpp
 ***********************/
/*declare var <全局变量>:<类型>;
或者
declare const <全局变量>:<类型>;
*/
const softwareName = "觀天地窺天機";
const verStr = "V23.05";
const softwareVerName = softwareName + '<br>' + verStr;
var curRegionJD_2K; //现在日期 //J2000起算的儒略日数(当前本地时间)
var curTimeZone; //当前位置所在的时区
var curSeltTimeZone; //当前选择的时区
var curSeltLong; //当前选择的经度
var curSeltLat; //当前选择的纬度
var curSeltDST; //当前选择的时区是否施行夏令时
var curRegionDST; //当前区域是否施行夏令时
const gWeekMidName = ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const gWeekLongName = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
const gWeekShortName = ['日', '一', '二', '三', '四', '五', '六', '七'];
const tianGanName = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲"];
const diZhiName = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"];
//月名称,建寅,开始的黄经角度，从大雪节开始是子月
const ganZhiMonthAngle = [-105, -75, -45, -15, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285];
//Zodiac十二生肖
const zodiacName = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪", "鼠"];
const lunarMonthName = ['冬', '腊', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬'];
const lunarDayName = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一', '初一'];
//中文数字
const cnNumeral = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '零'];
const cnNumeral2 = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '零'];
//24节气的名称，从冬至开始;24节气开始的黄经角度
const jieQiName = ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];
const jieQiAngle = [-90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285];
//十二星座的名称和开始角度 symbol
const constellationName = ["摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"];
const constellationSymbol = ["♑️", "♒️", "♓️", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️"];
const constellationFullName = ["摩羯座♑️", "水瓶座♒️", "双鱼座♓️", "白羊座♈️", "金牛座♉️", "双子座♊️", "巨蟹座♋️", "狮子座♌️", "处女座♍️", "天秤座♎️", "天蝎座♏️", "射手座♐️", "摩羯座♑️"];
const constellationAngle = [-90, -60, -30, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
const moonPhaseName = ["朔", "上弦", "望", "下弦"]; //月相名称表
const moonPhaseSymbol = ["🌑", "🌓", "🌕", "🌗"]; //月相符号表
const moonPhaseFullName = ["朔🌑", "上弦🌓", "望🌕", "下弦🌗"];
const yearDelimiter = "-"; //日期的年月日的分隔符
const timeDelimiter = ":"; //时间的年月日的分隔符
const yearTimeDelimiter = "  "; //时间的年月日的分隔符
var thisMonthWeek = 0; //日历显示页面中，当月1日是周几
var thisMonthDayNum = 0; //日历显示页面中，当月共多少日
