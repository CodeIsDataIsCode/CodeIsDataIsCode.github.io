"use strict";
class _cGCalendarBase_ {
    constructor() {
        this.init();
    }
    init() {
    }
    ;
    getDayName(u, r) {
    }
    ;
    getHuiLi(d0, date) {
        let z, y, m, d;
        d = d0 + 503105;
        z = int2(d / 10631);
        d -= z * 10631;
        y = int2((d + 0.5) / 354.366);
        d -= int2(y * 354.366 + 0.5);
        m = int2((d + 0.11) / 29.51);
        d -= int2(m * 29.5 + 0.5);
        date.Hyear = z * 30 + y + 1;
        date.Hmonth = m + 1;
        date.Hday = d + 1;
    }
}
;
var gGCalendarBase = new _cGCalendarBase_();
class _cLCalendarBase_ {
    constructor() {
        this.JNB = [];
        this.nianHaoInit();
    }
    nianHaoInit() {
        let nianHaoStr = '-2069,45,0,夏,禹,,禹,-2024,10,0,夏,启,,启,-2014,25,0,夏,太康,,太康,-1986,14,0,夏,仲康,,仲康,-1972,28,0,夏,相,,相,-1944,2,0,夏,后羿,,后羿,-1942,38,0,夏,寒浞,,寒浞,-1904,21,0,夏,少康,,少康,-1883,17,0,夏,杼,,杼,-1866,26,0,夏,槐,,槐,-1840,18,0,夏,芒,,芒,-1822,16,0,夏,泄,,泄,-1806,59,0,夏,不降,,不降,-1747,21,0,夏,扃,,扃,-1726,21,0,夏,廑,,廑,'
            + '-1705,31,0,夏,孔甲,,孔甲,-1674,11,0,夏,皋,,皋,-1663,11,0,夏,发,,发,-1652,53,0,夏,桀,,桀,-1599,11,0,商,商太祖,汤,商汤,-1588,1,0,商,商代王,太乙,商代王,-1587,2,0,商,哀王,子胜,外丙,-1585,4,0,商,懿王,子庸,仲壬,-1581,12,0,商,太宗,子至,太甲,-1569,29,0,商,昭王,子绚,沃丁,-1540,25,0,商,宣王,子辩,太庚,-1515,17,0,商,敬王,子高,小甲,-1498,13,0,商,元王,子密,雍己,-1485,75,0,商,中宗,子伷,太戊,-1410,11,0,商,孝成王,子庄,仲丁,'
            + '-1399,15,0,商,思王,子发,外壬,-1384,9,0,商,前平王,子整,河亶甲,-1375,19,0,商,穆王,子滕,祖乙,-1356,16,0,商,桓王,子旦,祖辛,-1340,5,0,商,僖王,子逾,沃甲,-1335,9,0,商,庄王,子新,祖丁,-1326,6,0,商,顷王,子更,南庚,-1320,7,0,商,悼王,子和,阳甲,-1313,42,0,商,世祖,子旬,盘庚,-1271,21,0,商,章王,子颂,小辛,-1250,1,0,商,惠王,子敛,小乙,-1249,59,0,商,高宗,子昭,武丁,-1190,2,0,商,后平王,子跃,祖庚,-1188,33,0,商,世宗,子载,祖甲,-1155,8,0,商,甲宗,子先,廪辛,'
            + '-1147,1,0,商,康祖,子嚣,庚丁,-1146,35,0,商,武祖,子瞿,武乙,-1111,11,0,商,匡王,子托,文丁,-1100,26,0,商,德王,子羡,帝乙,-1074,29,0,商,纣王,子寿,帝辛,-1045,4,0,西周,武王,姬发,武王,-1041,22,0,西周,成王,姬诵,成王,-1019,25,0,西周,康王,姬钊,康王,-994,19,0,西周,昭王,姬瑕,昭王,-975,54,0,西周,穆王,姬满,穆王,-921,23,0,西周,共王,姬繄,共王,-898,8,0,西周,懿王,姬囏,懿王,-890,6,0,西周,孝王,姬辟方,孝王,-884,8,0,西周,夷王,姬燮,夷王,-876,36,0,西周,厉王,姬胡,厉王,'
            + '-840,14,0,西周,厉王,姬胡,共和,-826,46,0,西周,宣王,姬静,宣王,-780,11,0,西周,幽王,姬宫湦,幽王,-769,51,0,东周,平王,姬宜臼,平王,-718,23,0,东周,桓王,姬林,桓王,-695,15,0,东周,庄王,姬佗,庄王,-680,5,0,东周,釐王,姬胡齐,釐王,-675,25,0,东周,惠王,姬阆,惠王,-650,33,0,东周,襄王,姬郑,襄王,-617,6,0,东周,顷王,姬壬臣,顷王,-611,6,0,东周,匡王,姬班,匡王,-605,21,0,东周,定王,姬瑜,定王,-584,14,0,东周,简王,姬夷,简王,-570,27,0,东周,灵王,姬泄心,灵王,-543,24,0,东周,景王,姬贵,景王,'
            + '-519,1,0,东周,悼王,姬勐,悼王,-518,44,0,东周,敬王,姬匄,敬王,-474,7,0,东周,元王,姬仁,元王,-467,27,0,东周,贞定王,姬介,贞定王,-440,1,0,东周,哀王-思王,姬去疾-姬叔,哀王-思王,-439,15,0,东周,考王,姬嵬,考王,-424,24,0,东周,威烈王,姬午,威烈王,-400,26,0,东周,安王,姬骄,安王,-374,7,0,东周,烈王,姬喜,烈王,-367,48,0,东周,显王,姬扁,显王,-319,6,0,东周,慎靓王,姬定,慎靓王,-313,8,0,东周,赧王,姬延,赧王,-305,56,0,战国-秦,昭襄王,嬴则,昭襄王,-249,1,0,战国-秦,孝文王,嬴柱,孝文王,-248,3,0,战国-秦,庄襄王,嬴子楚,庄襄王,'
            + '-245,25,0,秦,嬴政,嬴政,嬴政,-220,12,0,秦,始皇帝,嬴政,始皇,-208,3,0,秦,二世皇帝,嬴胡亥,二世,-205,12,0,西汉,高帝,刘邦,高帝,-193,7,0,西汉,惠帝,刘盈,惠帝,-186,8,0,西汉,高后,吕雉,高后,-178,16,0,西汉,文帝,刘恒,文帝,-162,7,0,西汉,文帝,刘恒,后元,-155,7,0,西汉,景帝,刘启,景帝,-148,6,0,西汉,景帝,刘启,中元,-142,3,0,西汉,景帝,刘启,后元,-139,6,0,西汉,武帝,刘彻,建元,-133,6,0,西汉,武帝,刘彻,元光,-127,6,0,西汉,武帝,刘彻,元朔,-121,6,0,西汉,武帝,刘彻,元狩,'
            + '-115,6,0,西汉,武帝,刘彻,元鼎,-109,6,0,西汉,武帝,刘彻,元封,-103,4,0,西汉,武帝,刘彻,太初,-99,4,0,西汉,武帝,刘彻,天汉,-95,4,0,西汉,武帝,刘彻,太始,-91,4,0,西汉,武帝,刘彻,征和,-87,2,0,西汉,武帝,刘彻,后元,-85,6,0,西汉,昭帝,刘弗陵,始元,-79,6,0,西汉,昭帝,刘弗陵,元凤,-73,1,0,西汉,昭帝,刘弗陵,元平,-72,4,0,西汉,宣帝,刘询,本始,-68,4,0,西汉,宣帝,刘询,地节,-64,4,0,西汉,宣帝,刘询,元康,-60,4,0,西汉,宣帝,刘询,神爵,-56,4,0,西汉,宣帝,刘询,五凤,'
            + '-52,4,0,西汉,宣帝,刘询,甘露,-48,1,0,西汉,宣帝,刘询,黄龙,-47,5,0,西汉,元帝,刘奭,初元,-42,5,0,西汉,元帝,刘奭,永光,-37,5,0,西汉,元帝,刘奭,建昭,-32,1,0,西汉,元帝,刘奭,竟宁,-31,4,0,西汉,成帝,刘骜,建始,-27,4,0,西汉,成帝,刘骜,河平,-23,4,0,西汉,成帝,刘骜,阳朔,-19,4,0,西汉,成帝,刘骜,鸿嘉,-15,4,0,西汉,成帝,刘骜,永始,-11,4,0,西汉,成帝,刘骜,元延,-7,2,0,西汉,成帝,刘骜,绥和,-5,4,0,西汉,哀帝,刘欣,建平,-1,2,0,西汉,哀帝,刘欣,元寿,'
            + '1,5,0,西汉,平帝,刘衍,元始,6,2,0,西汉,孺子婴,王莽摄政,居摄,8,1,0,西汉,孺子婴,王莽摄政,初始,9,5,0,新,,王莽,始建国,14,6,0,新,,王莽,天凤,20,3,0,新,,王莽,地皇,23,2,0,西汉,更始帝,刘玄,更始,25,31,0,东汉,光武帝,刘秀,建武,56,2,0,东汉,光武帝,刘秀,建武中元,58,18,0,东汉,明帝,刘庄,永平,76,8,0,东汉,章帝,刘炟,建初,84,3,0,东汉,章帝,刘炟,元和,87,2,0,东汉,章帝,刘炟,章和,89,16,0,东汉,和帝,刘肇,永元,105,1,0,东汉,和帝,刘肇,元兴,'
            + '106,1,0,东汉,殇帝,刘隆,延平,107,7,0,东汉,安帝,刘祜,永初,114,6,0,东汉,安帝,刘祜,元初,120,1,0,东汉,安帝,刘祜,永宁,121,1,0,东汉,安帝,刘祜,建光,122,4,0,东汉,安帝,刘祜,延光,126,6,0,东汉,顺帝,刘保,永建,132,4,0,东汉,顺帝,刘保,阳嘉,136,6,0,东汉,顺帝,刘保,永和,142,2,0,东汉,顺帝,刘保,汉安,144,1,0,东汉,顺帝,刘保,建康,145,1,0,东汉,冲帝,刘炳,永嘉,146,1,0,东汉,质帝,刘缵,本初,147,3,0,东汉,桓帝,刘志,建和,150,1,0,东汉,桓帝,刘志,和平,'
            + '151,2,0,东汉,桓帝,刘志,元嘉,153,2,0,东汉,桓帝,刘志,永兴,155,3,0,东汉,桓帝,刘志,永寿,158,9,0,东汉,桓帝,刘志,延熹,167,1,0,东汉,桓帝,刘志,永康,168,4,0,东汉,灵帝,刘宏,建宁,172,6,0,东汉,灵帝,刘宏,熹平,178,6,0,东汉,灵帝,刘宏,光和,184,6,0,东汉,灵帝,刘宏,中平,190,4,0,东汉,献帝,刘协,初平,194,2,0,东汉,献帝,刘协,兴平,196,24,0,东汉,献帝,刘协,建安,220,7,0,三国-魏,文帝,曹丕,黄初,227,6,0,三国-魏,明帝,曹叡,太和,233,4,0,三国-魏,明帝,曹叡,青龙,'
            + '237,3,0,三国-魏,明帝,曹叡,景初,240,9,0,三国-魏,齐王,曹芳,正始,249,5,0,三国-魏,齐王,曹芳,嘉平,254,2,0,三国-魏,高贵乡公,曹髦,正元,256,4,0,三国-魏,高贵乡公,曹髦,甘露,260,4,0,三国-魏,元帝,曹奂,景元,264,1,0,三国-魏,元帝,曹奂,咸熙,265,10,0,西晋,武帝,司马炎,泰始,275,5,0,西晋,武帝,司马炎,咸宁,280,10,0,西晋,武帝,司马炎,太康,290,10,0,西晋,武帝,司马炎,太熙,300,1,0,西晋,惠帝,司马衷,永康,301,1,0,西晋,惠帝,司马衷,永宁,302,2,0,西晋,惠帝,司马衷,太安,304,2,0,西晋,惠帝,司马衷,永安,'
            + '306,1,0,西晋,惠帝,司马衷,光熙,307,6,0,西晋,怀帝,司马炽,永嘉,313,4,0,西晋,愍帝,司马邺,建兴,317,1,0,东晋,元帝,司马睿,建武,318,4,0,东晋,元帝,司马睿,大兴,322,1,0,东晋,元帝,司马睿,永昌,323,3,0,东晋,明帝,司马绍,太宁,326,9,0,东晋,成帝,司马衍,咸和,335,8,0,东晋,成帝,司马衍,咸康,343,2,0,东晋,康帝,司马岳,建元,345,12,0,东晋,穆帝,司马聃,永和,357,5,0,东晋,穆帝,司马聃,升平,362,1,0,东晋,哀帝,司马丕,隆和,363,3,0,东晋,哀帝,司马丕,兴宁,366,5,0,东晋,海西公,司马奕,太和,'
            + '371,2,0,东晋,简文帝,司马昱,咸安,373,3,0,东晋,孝武帝,司马曜,甯康,376,21,0,东晋,孝武帝,司马曜,太元,397,5,0,东晋,安帝,司马德宗,隆安,402,3,0,东晋,安帝,司马德宗,元兴,405,14,0,东晋,安帝,司马德宗,义熙,419,1,0,东晋,恭帝,司马德文,元熙,420,3,0,南朝/宋,武帝,刘裕,永初,423,2,0,南朝/宋,少帝,刘义符,景平,424,30,0,南朝/宋,文帝,刘義隆,元嘉,454,3,0,南朝/宋,孝武,帝刘骏,孝建,457,8,0,南朝/宋,孝武,帝刘骏,大明,465,1,0,南朝/宋,废帝,刘子业,永光,465,1,0,南朝/宋,废帝,刘子业,景和,'
            + '465,7,0,南朝/宋,明帝,刘彧,泰始,472,1,0,南朝/宋,明帝,刘彧,泰豫,473,5,0,南朝/宋,废帝,刘昱,元徽,477,3,0,南朝/宋,顺帝,刘准,升明,479,4,0,南朝/齐,高帝,萧道成,建元,483,11,0,南朝/齐,武帝,萧赜,永明,494,1,0,南朝/齐,欎林王,萧昭业,隆昌,494,1,0,南朝/齐,海陵王,萧昭文,延兴,494,5,0,南朝/齐,明帝,萧鸾,建武,498,1,0,南朝/齐,明帝,萧鸾,永泰,499,3,0,南朝/齐,东昏侯,萧宝,中兴,501,2,0,南朝/齐,和帝,萧宝融,中兴,502,18,0,南朝/梁,武帝,萧衍,天监,520,8,0,南朝/梁,武帝,萧衍,普通,527,3,0,南朝/梁,武帝,萧衍,大通,'
            + '529,6,0,南朝/梁,武帝,萧衍,中大通,535,12,0,南朝/梁,武帝,萧衍,大同,546,2,0,南朝/梁,武帝,萧衍,中大同,547,3,0,南朝/梁,武帝,萧衍,太清,550,2,0,南朝/梁,简文帝,萧纲,大宝,551,2,0,南朝/梁,豫章王,萧栋,天正,552,4,0,南朝/梁,元帝,萧绎,承圣,555,1,0,南朝/梁,贞阳侯,萧渊明,天成,555,2,0,南朝/梁,敬帝,萧方智,绍泰,556,2,0,南朝/梁,敬帝,萧方智,太平,557,3,0,南朝/陈,武帝,陈霸先,太平,560,7,0,南朝/陈,文帝,陈蒨,天嘉,566,1,0,南朝/陈,文帝,陈蒨,天康,567,2,0,南朝/陈,废帝,陈伯宗,光大,569,14,0,南朝/陈,宣帝,陈顼,太建,'
            + '583,4,0,南朝/陈,后主,陈叔宝,至德,587,3,0,南朝/陈,后主,陈叔宝,祯明,555,8,0,南朝/后梁,宣帝,萧詧,大定,562,24,0,南朝/后梁,明帝,萧岿,天保,586,2,0,南朝/后梁,莒公,萧琮,广运,386,11,0,北朝/北魏,道武帝,拓跋圭,登国,396,3,0,北朝/北魏,道武帝,拓跋圭,皇始,398,7,0,北朝/北魏,道武帝,拓跋圭,天兴,404,6,0,北朝/北魏,道武帝,拓跋圭,天赐,409,5,0,北朝/北魏,明元帝,拓跋嗣,永兴,414,3,0,北朝/北魏,明元帝,拓跋嗣,神瑞,416,8,0,北朝/北魏,明元帝,拓跋嗣,泰常,424,5,0,北朝/北魏,太武帝,拓跋焘,始光,428,4,0,北朝/北魏,太武帝,拓跋焘,神麚,432,3,0,北朝/北魏,太武帝,拓跋焘,延和,'
            + '435,6,0,北朝/北魏,太武帝,拓跋焘,太延,440,12,0,北朝/北魏,太武帝,拓跋焘,太平真君,451,2,0,北朝/北魏,太武帝,拓跋焘,正平,452,1,0,北朝/北魏,南安王,拓跋余,承平,452,3,0,北朝/北魏,文成帝,拓跋浚,兴安,454,2,0,北朝/北魏,文成帝,拓跋浚,兴光,455,5,0,北朝/北魏,文成帝,拓跋浚,太安,460,6,0,北朝/北魏,文成帝,拓跋浚,和平,466,2,0,北朝/北魏,献文帝,拓跋弘,天安,467,5,0,北朝/北魏,献文帝,拓跋弘,皇兴,471,6,0,北朝/北魏,教文帝,拓跋宏,延兴,476,1,0,北朝/北魏,孝文帝,拓跋宏,承明,477,23,0,北朝/北魏,孝文帝,拓跋宏,太和,500,4,0,北朝/北魏,宣武帝,元恪,景明,504,5,0,北朝/北魏,宣武帝,元恪,正始,'
            + '508,5,0,北朝/北魏,宣武帝,元恪,永平,512,4,0,北朝/北魏,宣武帝,元恪,延昌,516,3,0,北朝/北魏,孝明帝,元诩,熙平,518,3,0,北朝/北魏,孝明帝,元诩,神龟,520,6,0,北朝/北魏,孝明帝,元诩,正光,525,3,0,北朝/北魏,孝明帝,元诩,孝昌,528,1,0,北朝/北魏,孝明帝,元诩,武泰,528,1,0,北朝/北魏,孝庄帝,元子攸,建义,528,3,0,北朝/北魏,孝庄帝,元子攸,永安,530,2,0,北朝/北魏,东海王,元晔,建明,531,2,0,北朝/北魏,节闵帝,元恭,普泰,531,2,0,北朝/北魏,安定王,元朗,中兴,532,1,0,北朝/北魏,孝武帝,元修,太昌,532,1,0,北朝/北魏,孝武帝,元修,永兴,532,3,0,北朝/北魏,孝武帝,元修,永熙,'
            + '534,4,0,北朝/东魏,孝静帝,元善见,天平,538,2,0,北朝/东魏,孝静帝,元善见,元象,539,4,0,北朝/东魏,孝静帝,元善见,兴和,543,8,0,北朝/东魏,孝静帝,元善见,武定,535,17,0,北朝/西魏,文帝,元宝炬,大统,552,3,0,北朝/西魏,废帝,元钦,大统,554,3,0,北朝/西魏,恭帝,元廓,大统,550,10,0,北朝/北齐,文宣帝,高洋,天保,560,1,0,北朝/北齐,废帝,高殷,乾明,560,2,0,北朝/北齐,孝昭帝,高演,皇建,561,2,0,北朝/北齐,武成帝,高湛,太宁,562,4,0,北朝/北齐,武成帝,高湛,河清,565,5,0,北朝/北齐,温公,高纬,天统,570,7,0,北朝/北齐,温公,高纬,武平,576,2,0,北朝/北齐,温公,高纬,隆化,'
            + '576,1,0,北朝/北齐,安德王,高延宗,德昌,577,1,0,北朝/北齐,幼主,高恒,承光,557,1,0,北朝/北周,闵帝,宇文觉,空,557,2,0,北朝/北周,明帝,宇文毓,空,559,2,0,北朝/北周,明帝,宇文毓,武成,561,5,0,北朝/北周,武帝,宇文邕,保定,566,7,0,北朝/北周,武帝,宇文邕,天和,572,7,0,北朝/北周,武帝,宇文邕,建德,578,1,0,北朝/北周,武帝,宇文邕,宣政,579,1,0,北朝/北周,宣帝,宇文贇,大成,579,2,0,北朝/北周,静帝,宇文衍,大象,581,1,0,北朝/北周,静帝,宇文衍,大定,581,20,0,隋,文帝,杨坚,开皇,601,4,0,隋,文帝,杨坚,仁寿,605,13,0,隋,炀帝,杨广,大业,'
            + '617,2,0,隋,恭帝,杨侑,义宁,618,9,0,唐,高祖,李渊,武德,627,23,0,唐,太宗,李世民,贞观,650,6,0,唐,高宗,李治,永徽,656,6,0,唐,高宗,李治,显庆,661,3,0,唐,高宗,李治,龙朔,664,2,0,唐,高宗,李治,麟德,666,3,0,唐,高宗,李治,乾封,668,3,0,唐,高宗,李治,总章,670,5,0,唐,高宗,李治,咸亨,674,3,0,唐,高宗,李治,上元,676,4,0,唐,高宗,李治,仪凤,679,2,0,唐,高宗,李治,调露,680,2,0,唐,高宗,李治,永隆,681,2,0,唐,高宗,李治,开耀,'
            + '682,2,0,唐,高宗,李治,永淳,683,1,0,唐,高宗,李治,弘道,684,1,0,唐,中宗,李显,嗣圣,684,1,0,唐,睿宗,李旦,文明,684,1,0,武周,则天后,武曌,光宅,685,4,0,武周,则天后,武曌,垂拱,689,1,0,武周,则天后,武曌,永昌,689,2,0,武周,则天后,武曌,载初,690,3,0,武周,则天后,武曌,天授,692,1,0,武周,则天后,武曌,如意,692,3,0,武周,则天后,武曌,长寿,694,1,0,武周,则天后,武曌,延载,695,1,0,武周,则天后,武曌,证圣,695,2,0,武周,则天后,武曌,天册万岁,696,1,0,武周,则天后,武曌,万岁登封,'
            + '696,2,0,武周,则天后,武曌,万岁通天,697,1,0,武周,则天后,武曌,神功,698,3,0,武周,则天后,武曌,圣历,700,1,0,武周,则天后,武曌,久视,701,1,0,武周,则天后,武曌,大足,701,4,0,武周,则天后,武曌,长安,705,1,0,武周,则天后,李显,神龙,705,2,0,唐,中宗,李显,神龙,707,4,0,唐,中宗,李显,景龙,710,1,0,唐,温王,李重茂,唐隆,710,2,0,唐,睿宗,李旦,景云,712,1,0,唐,睿宗,李旦,太极,712,1,0,唐,睿宗,李旦,延和,712,2,0,唐,玄宗,李隆基,先天,713,29,0,唐,玄宗,李隆基,开元,'
            + '742,15,0,唐,玄宗,李隆基,天宝,756,3,0,唐,肃宗,李亨,至德,758,3,0,唐,肃宗,李亨,乾元,760,3,0,唐,肃宗,李亨,上元,762,2,0,唐,肃宗,李亨,宝应,763,2,0,唐,代宗,李豫,广德,765,2,0,唐,肃宗,李亨,永泰,766,14,0,唐,肃宗,李亨,大历,780,4,0,唐,德宗,李适,建中,784,1,0,唐,德宗,李适,兴元,785,21,0,唐,德宗,李适,贞元,805,1,0,唐,顺宗,李诵,永贞,806,15,0,唐,宪宗,李纯,元和,821,4,0,唐,穆宗,李恒,长庆,825,3,0,唐,敬宗,李湛,宝历,'
            + '827,9,0,唐,文宗,李昂,大和,836,5,0,唐,文宗,李昂,开成,841,6,0,唐,武宗,李炎,会昌,847,14,0,唐,宣宗,李忱,大中,860,15,0,唐,宣宗,李忱,咸通,874,6,0,唐,僖宗,李儇,乾符,880,2,0,唐,僖宗,李儇,广明,881,5,0,唐,僖宗,李儇,中和,885,4,0,唐,僖宗,李儇,光启,888,1,0,唐,僖宗,李儇,文德,889,1,0,唐,昭宗,李晔,龙纪,890,2,0,唐,昭宗,李晔,大顺,892,2,0,唐,昭宗,李晔,景福,894,5,0,唐,昭宗,李晔,乾宁,898,4,0,唐,昭宗,李晔,光化,'
            + '901,4,0,唐,昭宗,李晔,天复,904,1,0,唐,昭宗,李晔,天佑,905,3,1,唐,昭宣帝,李祝,天佑,907,5,0,五代/梁,太祖,朱温,开平,911,2,0,五代/梁,太祖,朱温,乾化,913,1,0,五代/梁,庶人,朱友圭,凤历,913,3,2,五代/梁,末帝,朱友贞,乾化,915,7,0,五代/梁,末帝,朱友贞,贞明,921,3,0,五代/梁,末帝,朱友贞,龙德,923,4,0,五代/唐,庄宗,李存勗,同光,926,5,0,五代/唐,明宗,李嗣源,天成,930,4,0,五代/唐,明宗,李嗣源,长兴,934,1,0,五代/唐,闵帝,李从厚,应顺,934,3,0,五代/唐,潞王,李从珂,清泰,936,6,0,五代/晋,高祖,石敬瑭,天福,'
            + '942,2,6,五代/晋,出帝,石重贵,天福,944,3,0,五代/晋,出帝,石重贵,开运,947,12,0,五代/汉,高祖,刘知远,天福,948,1,0,五代/汉,隐帝,刘承祐,乾祐,948,3,0,五代/汉,隐帝,刘承祐,乾祐,951,3,0,五代/周,太祖,郭威,广顺,954,1,0,五代/周,太祖,郭威,显德,954,6,0,五代/周,世宗,柴荣,显德,959,2,5,五代/周,恭帝,郭宗训,显德,960,4,0,北宋,太祖,赵匡胤,建隆,963,6,0,北宋,太祖,赵匡胤,乾德,968,9,0,北宋,太祖,赵匡胤,开宝,976,9,0,北宋,太宗,赵炅,太平兴国,984,4,0,北宋,太宗,赵炅,雍熙,988,2,0,北宋,太宗,赵炅,端拱,'
            + '990,5,0,北宋,太宗,赵炅,淳化,995,3,0,北宋,太宗,赵炅,至道,998,6,0,北宋,真宗,赵恒,咸平,1004,4,0,北宋,真宗,赵恒,景德,1008,9,0,北宋,真宗,赵恒,大中祥符,1017,5,0,北宋,真宗,赵恒,天禧,1022,1,0,北宋,真宗,赵恒,乾兴,1023,10,0,北宋,仁宗,赵祯,天圣,1032,2,0,北宋,仁宗,赵祯,明道,1034,5,0,北宋,仁宗,赵祯,景祐,1038,3,0,北宋,仁宗,赵祯,宝元,1040,2,0,北宋,仁宗,赵祯,康定,1041,8,0,北宋,仁宗,赵祯,庆历,1049,6,0,北宋,仁宗,赵祯,皇祐,1054,3,0,北宋,仁宗,赵祯,至和,'
            + '1056,8,0,北宋,仁宗,赵祯,嘉祐,1064,4,0,北宋,英宗,赵曙,治平,1068,10,0,北宋,神宗,赵顼,熙宁,1078,8,0,北宋,神宗,赵顼,元丰,1086,9,0,北宋,哲宗,赵煦,元祐,1094,5,0,北宋,哲宗,赵煦,绍圣,1098,3,0,北宋,哲宗,赵煦,元符,1101,1,0,北宋,徽宗,赵佶,建中靖国,1102,5,0,北宋,徽宗,赵佶,崇宁,1107,4,0,北宋,徽宗,赵佶,大观,1111,8,0,北宋,徽宗,赵佶,政和,1118,2,0,北宋,徽宗,赵佶,重和,1119,7,0,北宋,徽宗,赵佶,宣和,1126,2,0,北宋,钦宗,赵桓,靖康,1127,4,0,南宋,高宗,赵构,建炎,'
            + '1131,32,0,南宋,高宗,赵构,绍兴,1163,2,0,南宋,孝宗,赵慎,隆兴,1165,9,0,南宋,孝宗,赵慎,乾道,1174,16,0,南宋,孝宗,赵慎,淳熙,1190,5,0,南宋,光宗,赵暴,绍熙,1195,6,0,南宋,宁宗,赵扩,庆元,1201,4,0,南宋,宁宗,赵扩,嘉泰,1205,3,0,南宋,宁宗,赵扩,开禧,1208,17,0,南宋,宁宗,赵扩,嘉定,1225,3,0,南宋,理宗,赵昀,宝庆,1228,6,0,南宋,理宗,赵昀,绍定,1234,3,0,南宋,理宗,赵昀,端平,1237,4,0,南宋,理宗,赵昀,嘉熙,1241,12,0,南宋,理宗,赵昀,淳祐,1253,6,0,南宋,理宗,赵昀,寶祐,'
            + '1259,1,0,南宋,理宗,赵昀,开庆,1260,5,0,南宋,理宗,赵昀,景定,1265,10,0,南宋,度宗,赵禥,咸淳,1275,2,0,南宋,恭宗,赵㬎,德祐 ,1276,3,0,南宋,端宗,赵昰,景炎,1278,2,0,南宋,帝昺,赵昺,祥兴,1271,24,7,元,世祖,孛儿只斤·忽必烈,至元,1295,3,0,元,成宗,孛儿只斤·铁穆耳,元贞,1297,11,0,元,成宗,孛儿只斤·铁穆耳,大德,1308,4,0,元,武宗,孛儿只斤·海山,至大,1312,2,0,元,仁宗,孛儿只斤·爱育黎拔力八达,皇庆,1314,7,0,元,仁宗,孛儿只斤·愛育黎拔力八達,延祐,1321,3,0,元,英宗,孛儿只斤·宗硕德八剌,至治,1324,5,0,元,泰定帝,孛儿只斤·也孙铁木耳,泰定,1328,1,0,元,泰定帝,孛儿只斤·也孙铁木耳,至和,'
            + '1328,1,0,元,幼主,孛儿只斤·阿速吉八,天顺,1328,3,0,元,文宗,孛儿只斤·图贴睦尔,天历,1330,3,0,元,文宗,孛儿只斤·图贴睦尔,至顺,1333,3,0,元,惠宗,孛儿只斤·妥镤贴睦尔,元统,1335,6,0,元,惠宗,孛儿只斤·妥镤贴睦尔,至元,1341,28,0,元,惠宗,孛儿只斤·妥镤贴睦尔,至正,1368,31,0,明,太祖,朱元璋,洪武,1399,4,0,明,惠帝,朱允溫,建文,1403,22,0,明,成祖,朱棣,永乐,1425,1,0,明,仁宗,朱高炽,洪熙,1426,10,0,明,宣宗,朱瞻基,宣德,1436,14,0,明,英宗,朱祁镇,正统,1450,7,0,明,代宗,朱祁钰,景泰,1457,8,0,明,英宗,朱祁镇,天顺,1465,23,0,明,宪宗,朱见深,成化,'
            + '1488,18,0,明,孝宗,朱祐樘,弘治,1506,16,0,明,武宗,朱厚照,正德,1522,45,0,明,世宗,朱厚熜,嘉靖,1567,6,0,明,穆宗,朱载贺,隆庆,1573,48,0,明,神宗,朱翊钧,万历,1620,1,0,明,光宗,朱常洛,泰昌,1621,7,0,明,熹宗,朱同校,天启,1628,17,0,明,毅宗,朱由检,崇祯,1644,18,0,清,世祖,爱新觉罗福临,顺治,1662,61,0,清,圣祖,爱新觉罗玄烨,康熙,1723,13,0,清,世宗,爱新觉罗胤禛,雍正,1736,60,0,清,高宗,爱新觉罗弘历,乾隆,1796,25,0,清,仁宗,爱新觉罗颙琰,嘉庆,1821,30,0,清,宣宗,爱新觉罗旻宁,道光,1851,11,0,清,文宗,爱新觉罗奕詝,咸丰,'
            + '1862,13,0,清,穆宗,爱新觉罗载淳,同治,1875,34,0,清,德宗,爱新觉罗载湉,光绪,1909,3,0,清,无号,爱新觉罗溥仪,宣统,1912,140,0,民国,总统,,民国,1949,9999,0,共和国,人大,,共和';
        this.JNB = nianHaoStr.split(',');
        for (let i = 0; i < this.JNB.length; i += 7) {
            this.JNB[i] -= 0;
            this.JNB[i + 1] -= 0;
            this.JNB[i + 2] -= 0;
        }
    }
    ;
    getNianHao(year) {
        let i, j, c = '', s = '';
        for (i = 0; i < this.JNB.length; i += 7) {
            j = this.JNB[i];
            if (year < j || year >= (j + this.JNB[i + 1]))
                continue;
            c = this.JNB[i + 6] + (year - j + 1 + this.JNB[i + 2]) + JD.getYearGanZhi(year).YGanZhiName;
            s += (s ? ';' : '') + '[' + this.JNB[i + 3] + ']' + this.JNB[i + 4] + ' ' + this.JNB[i + 5] + ' ' + c;
        }
        return s;
    }
    ;
    getDayName(u, r) {
    }
    ;
    qiAccurate(W) {
        let t = Sun_Moon_Ephemeris.S_aLon_t(W) * 36525;
        return (t - dt_T(t) + 8.0 / 24);
    }
    ;
    shuoAccurate(W) {
        let t = Sun_Moon_Ephemeris.MS_aLon_t(W) * 36525;
        return (t - dt_T(t) + 8.0 / 24);
    }
    ;
    qiAccurate2(jd) {
        let d = Math.PI / 12.0;
        let w = Math.floor((jd + 293) / 365.2422 * 24) * d;
        let aQiJD = this.qiAccurate(w);
        if (aQiJD - jd > 5)
            return this.qiAccurate(w - d);
        if (aQiJD - jd < -5)
            return this.qiAccurate(w + d);
        return aQiJD;
    }
    ;
    shuoAccurate2(jd) {
        return this.shuoAccurate(Math.floor((jd + 8) / 29.5306) * Math.PI * 2);
    }
}
;
var gLCalendarBase = new _cLCalendarBase_();
class _cQiShuoBase_ {
    constructor() {
        this.SB = '';
        this.QB = '';
        this.LunarLeapMonth = 0;
        this.LunarMonthName = new Array();
        this.MidQi = new Array();
        this.HeShuo = new Array();
        this.LunarMonthDayNum = new Array();
        this.LunarYear = new Array();
        this.suoKB = [
            1457698.231017, 29.53067166,
            1546082.512234, 29.53085106,
            1640640.735300, 29.53060000,
            1642472.151543, 29.53085439,
            1683430.509300, 29.53086148,
            1752148.041079, 29.53085097,
            1807724.481520, 29.53059851,
            1883618.114100, 29.53060000,
            1907360.704700, 29.53060000,
            1936596.224900, 29.53060000,
            1939135.675300, 29.53060000,
            1947168.00
        ];
        this.qiKB = [
            1640650.479938, 15.21842500,
            1642476.703182, 15.21874996,
            1683430.515601, 15.218750011,
            1752157.640664, 15.218749978,
            1807675.003759, 15.218620279,
            1883627.765182, 15.218612292,
            1907369.128100, 15.218449176,
            1936603.140413, 15.218425000,
            1939145.524180, 15.218466998,
            1947180.798300, 15.218524844,
            1964362.041824, 15.218533526,
            1987372.340971, 15.218513908,
            1999653.819126, 15.218530782,
            2007445.469786, 15.218535181,
            2021324.917146, 15.218526248,
            2047257.232342, 15.218519654,
            2070282.898213, 15.218425000,
            2073204.872850, 15.218515221,
            2080144.500926, 15.218530782,
            2086703.688963, 15.218523776,
            2110033.182763, 15.218425000,
            2111190.300888, 15.218425000,
            2113731.271005, 15.218515671,
            2120670.840263, 15.218425000,
            2123973.309063, 15.218425000,
            2125068.997336, 15.218477932,
            2136026.312633, 15.218472436,
            2156099.495538, 15.218425000,
            2159021.324663, 15.218425000,
            2162308.575254, 15.218461742,
            2178485.706538, 15.218425000,
            2178759.662849, 15.218445786,
            2185334.020800, 15.218425000,
            2187525.481425, 15.218425000,
            2188621.191481, 15.218437494,
            2322147.76
        ];
    }
    shuoLowCalc(W) {
        let v = 7771.37714500204;
        let t = (W + 1.08472) / v, L;
        t -= (-0.0000331 * t * t
            + 0.10976 * Math.cos(0.785 + 8328.6914 * t)
            + 0.02224 * Math.cos(0.187 + 7214.0629 * t)
            - 0.03342 * Math.cos(4.669 + 628.3076 * t)) / v
            + (32 * (t + 1.8) * (t + 1.8) - 20) / 86400 / 36525;
        return t * 36525 + 8 / 24;
    }
    ;
    qiLowCalc(W) {
        let t, L, v = 628.3319653318;
        t = (W - 4.895062166) / v;
        t -= (53 * t * t + 334116 * Math.cos(4.67 + 628.307585 * t) + 2061 * Math.cos(2.678 + 628.3076 * t) * t) / v / 10000000;
        L = 48950621.66 + 6283319653.318 * t + 53 * t * t
            + 334166 * Math.cos(4.669257 + 628.307585 * t)
            + 3489 * Math.cos(4.6261 + 1256.61517 * t)
            + 2060.6 * Math.cos(2.67823 + 628.307585 * t) * t
            - 994 - 834 * Math.sin(2.1824 - 33.75705 * t);
        t -= (L / 10000000 - W) / 628.332 + (32 * (t + 1.8) * (t + 1.8) - 20) / 86400 / 36525;
        return t * 36525 + 8 / 24;
    }
    ;
    qiHighCalc(W) {
        let JDtemp = Sun_Moon_Ephemeris.S_aLon_t2(W) * 36525;
        JDtemp = JDtemp - dt_T(JDtemp) + 8 / 24;
        let v = ((JDtemp + 0.5) % 1) * 86400;
        if (v < 1200 || v > 86400 - 1200)
            JDtemp = Sun_Moon_Ephemeris.S_aLon_t(W) * 36525 - dt_T(JDtemp) + 8 / 24;
        return JDtemp;
    }
    ;
    shuoHighCalc(W) {
        let JDtemp = Sun_Moon_Ephemeris.MS_aLon_t2(W) * 36525;
        JDtemp = JDtemp - dt_T(JDtemp) + 8 / 24;
        let v = ((JDtemp + 0.5) % 1) * 86400;
        if (v < 1800 || v > 86400 - 1800)
            JDtemp = Sun_Moon_Ephemeris.MS_aLon_t(W) * 36525 - dt_T(JDtemp) + 8 / 24;
        return JDtemp;
    }
    ;
    jieya(s) {
        let o = "0000000000", o2 = o + o;
        s = s.replace(/J/g, '00');
        s = s.replace(/I/g, '000');
        s = s.replace(/H/g, '0000');
        s = s.replace(/G/g, '00000');
        s = s.replace(/t/g, '02');
        s = s.replace(/s/g, '002');
        s = s.replace(/r/g, '0002');
        s = s.replace(/q/g, '00002');
        s = s.replace(/p/g, '000002');
        s = s.replace(/o/g, '0000002');
        s = s.replace(/n/g, '00000002');
        s = s.replace(/m/g, '000000002');
        s = s.replace(/l/g, '0000000002');
        s = s.replace(/k/g, '01');
        s = s.replace(/j/g, '0101');
        s = s.replace(/i/g, '001');
        s = s.replace(/h/g, '001001');
        s = s.replace(/g/g, '0001');
        s = s.replace(/f/g, '00001');
        s = s.replace(/e/g, '000001');
        s = s.replace(/d/g, '0000001');
        s = s.replace(/c/g, '00000001');
        s = s.replace(/b/g, '000000001');
        s = s.replace(/a/g, '0000000001');
        s = s.replace(/A/g, o2 + o2 + o2);
        s = s.replace(/B/g, o2 + o2 + o);
        s = s.replace(/C/g, o2 + o2);
        s = s.replace(/D/g, o2 + o);
        s = s.replace(/E/g, o2);
        s = s.replace(/F/g, o);
        return s;
    }
    ;
    init() {
        let suoS, qiS;
        suoS = "EqoFscDcrFpmEsF2DfFideFelFpFfFfFiaipqti1ksttikptikqckstekqttgkqttgkqteksttikptikq2fjstgjqttjkqttgkqt";
        suoS += "ekstfkptikq2tijstgjiFkirFsAeACoFsiDaDiADc1AFbBfgdfikijFifegF1FhaikgFag1E2btaieeibggiffdeigFfqDfaiBkF";
        suoS += "1kEaikhkigeidhhdiegcFfakF1ggkidbiaedksaFffckekidhhdhdikcikiakicjF1deedFhFccgicdekgiFbiaikcfi1kbFibef";
        suoS += "gEgFdcFkFeFkdcfkF1kfkcickEiFkDacFiEfbiaejcFfffkhkdgkaiei1ehigikhdFikfckF1dhhdikcfgjikhfjicjicgiehdik";
        suoS += "cikggcifgiejF1jkieFhegikggcikFegiegkfjebhigikggcikdgkaFkijcfkcikfkcifikiggkaeeigefkcdfcfkhkdgkegieid";
        suoS += "hijcFfakhfgeidieidiegikhfkfckfcjbdehdikggikgkfkicjicjF1dbidikFiggcifgiejkiegkigcdiegfggcikdbgfgefjF1";
        suoS += "kfegikggcikdgFkeeijcfkcikfkekcikdgkabhkFikaffcfkhkdgkegbiaekfkiakicjhfgqdq2fkiakgkfkhfkfcjiekgFebicg";
        suoS += "gbedF1jikejbbbiakgbgkacgiejkijjgigfiakggfggcibFifjefjF1kfekdgjcibFeFkijcfkfhkfkeaieigekgbhkfikidfcje";
        suoS += "aibgekgdkiffiffkiakF1jhbakgdki1dj1ikfkicjicjieeFkgdkicggkighdF1jfgkgfgbdkicggfggkidFkiekgijkeigfiski";
        suoS += "ggfaidheigF1jekijcikickiggkidhhdbgcfkFikikhkigeidieFikggikhkffaffijhidhhakgdkhkijF1kiakF1kfheakgdkif";
        suoS += "iggkigicjiejkieedikgdfcggkigieeiejfgkgkigbgikicggkiaideeijkefjeijikhkiggkiaidheigcikaikffikijgkiahi1";
        suoS += "hhdikgjfifaakekighie1hiaikggikhkffakicjhiahaikggikhkijF1kfejfeFhidikggiffiggkigicjiekgieeigikggiffig";
        suoS += "gkidheigkgfjkeigiegikifiggkidhedeijcfkFikikhkiggkidhh1ehigcikaffkhkiggkidhh1hhigikekfiFkFikcidhh1hit";
        suoS += "cikggikhkfkicjicghiediaikggikhkijbjfejfeFhaikggifikiggkigiejkikgkgieeigikggiffiggkigieeigekijcijikgg";
        suoS += "ifikiggkideedeijkefkfckikhkiggkidhh1ehijcikaffkhkiggkidhh1hhigikhkikFikfckcidhh1hiaikgjikhfjicjicgie";
        suoS += "hdikcikggifikigiejfejkieFhegikggifikiggfghigkfjeijkhigikggifikiggkigieeijcijcikfksikifikiggkidehdeij";
        suoS += "cfdckikhkiggkhghh1ehijikifffffkhsFngErD1pAfBoDd1BlEtFqA2AqoEpDqElAEsEeB2BmADlDkqBtC1FnEpDqnEmFsFsAFn";
        suoS += "llBbFmDsDiCtDmAB2BmtCgpEplCpAEiBiEoFqFtEqsDcCnFtADnFlEgdkEgmEtEsCtDmADqFtAFrAtEcCqAE1BoFqC1F1DrFtBmF";
        suoS += "tAC2ACnFaoCgADcADcCcFfoFtDlAFgmFqBq2bpEoAEmkqnEeCtAE1bAEqgDfFfCrgEcBrACfAAABqAAB1AAClEnFeCtCgAADqDoB";
        suoS += "mtAAACbFiAAADsEtBqAB2FsDqpFqEmFsCeDtFlCeDtoEpClEqAAFrAFoCgFmFsFqEnAEcCqFeCtFtEnAEeFtAAEkFnErAABbFkAD";
        suoS += "nAAeCtFeAfBoAEpFtAABtFqAApDcCGJ";
        qiS = "FrcFs22AFsckF2tsDtFqEtF1posFdFgiFseFtmelpsEfhkF2anmelpFlF1ikrotcnEqEq2FfqmcDsrFor22FgFrcgDscFs22FgEe";
        qiS += "FtE2sfFs22sCoEsaF2tsD1FpeE2eFsssEciFsFnmelpFcFhkF2tcnEqEpFgkrotcnEqrEtFermcDsrE222FgBmcmr22DaEfnaF22";
        qiS += "2sD1FpeForeF2tssEfiFpEoeFssD1iFstEqFppDgFstcnEqEpFg11FscnEqrAoAF2ClAEsDmDtCtBaDlAFbAEpAAAAAD2FgBiBqo";
        qiS += "BbnBaBoAAAAAAAEgDqAdBqAFrBaBoACdAAf1AACgAAAeBbCamDgEifAE2AABa1C1BgFdiAAACoCeE1ADiEifDaAEqAAFe1AcFbcA";
        qiS += "AAAAF1iFaAAACpACmFmAAAAAAAACrDaAAADG0";
        this.SB = this.jieya(suoS);
        this.QB = this.jieya(qiS);
    }
    ;
    calc(jdFrom2K, qs) {
        let jd = jdFrom2K + J2000;
        jdFrom2K += J2000;
        let i = 0, D = 0, n = '';
        let B = this.suoKB, pc = 14;
        if (qs == '气')
            B = this.qiKB, pc = 7;
        let f1 = B[0] - pc, f2 = B[B.length - 1] - pc, f3 = 2436935;
        if (jd < f1 || jd >= f3) {
            if (qs == '气')
                return Math.floor(this.qiHighCalc(Math.floor((jd + pc - 2451259) / 365.2422 * 24) * Math.PI / 12) + 0.5);
            else
                return Math.floor(this.shuoHighCalc(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5);
        }
        if (jd >= f1 && jd < f2) {
            for (i = 0; i < B.length; i += 2)
                if (jd + pc < B[i + 2])
                    break;
            D = B[i] + B[i + 1] * Math.floor((jd + pc - B[i]) / B[i + 1]);
            D = Math.floor(D + 0.5);
            if (D == 1683460)
                D++;
            return D - 2451545;
        }
        if (jd >= f2 && jd < f3) {
            if (qs == '气') {
                D = Math.floor(this.qiLowCalc(Math.floor((jd + pc - 2451259) / 365.2422 * 24) * Math.PI / 12) + 0.5);
                n = this.QB.slice(Math.floor((jd - f2) / 365.2422 * 24), Math.floor((jd - f2) / 365.2422 * 24) + 1);
            }
            else {
                D = Math.floor(this.shuoLowCalc(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5);
                n = this.SB.slice(Math.floor((jd - f2) / 29.5306), Math.floor((jd - f2) / 29.5306) + 1);
            }
            if (n == "1")
                return D + 1;
            if (n == "2")
                return D - 1;
            return D;
        }
    }
    ;
    calcY(jdFrom2K) {
        let A = this.MidQi, B = this.HeShuo;
        let i = 0, k = 0, W = 0, w = 0;
        W = int2((jdFrom2K - 355 + 183) / 365.2422) * 365.2422 + 355;
        if (this.calc(W, '气') > jdFrom2K)
            W -= 365.2422;
        for (i = 0; i < 25; i++)
            A[i] = this.calc(W + 15.2184 * i, '气');
        A.pe1 = this.calc(W - 15.2, '气');
        A.pe2 = this.calc(W - 30.4, '气');
        w = this.calc(A[0], '朔');
        if (w > A[0])
            w -= 29.53;
        for (i = 0; i < 15; i++)
            B[i] = this.calc(w + 29.5306 * i, '朔');
        this.LunarLeapMonth = 0;
        for (i = 0; i < 14; i++) {
            this.LunarMonthDayNum[i] = this.HeShuo[i + 1] - this.HeShuo[i];
            this.LunarMonthName[i] = i;
        }
        let YY = int2((this.MidQi[0] + 10 + 180) / 365.2422) + 2000;
        if (YY >= -721 && YY <= -104) {
            let ns = [];
            let yy;
            for (i = 0; i < 3; i++) {
                yy = YY + i - 1;
                if (yy >= -721)
                    ns[i] = this.calc(1457698 - J2000 + int2(0.342 + (yy + 721) * 12.368422) * 29.5306, '朔'), ns[i + 3] = '十三', ns[i + 6] = 2;
                if (yy >= -479)
                    ns[i] = this.calc(1546083 - J2000 + int2(0.500 + (yy + 479) * 12.368422) * 29.5306, '朔'), ns[i + 3] = '十三', ns[i + 6] = 2;
                if (yy >= -220)
                    ns[i] = this.calc(1640641 - J2000 + int2(0.866 + (yy + 220) * 12.369000) * 29.5306, '朔'), ns[i + 3] = '后九', ns[i + 6] = 11;
            }
            let nn, f1;
            for (i = 0; i < 14; i++) {
                for (nn = 2; nn >= 0; nn--)
                    if (this.HeShuo[i] >= ns[nn])
                        break;
                f1 = int2((this.HeShuo[i] - ns[nn] + 15) / 29.5306);
                if (f1 < 12)
                    this.LunarMonthName[i] = lunarMonthName[(f1 + ns[nn + 6]) % 12];
                else
                    this.LunarMonthName[i] = ns[nn + 3];
            }
            return;
        }
        if (B[13] <= A[24]) {
            for (i = 1; B[i + 1] > A[2 * i] && i < 13; i++)
                ;
            this.LunarLeapMonth = i;
            for (; i < 14; i++)
                this.LunarMonthName[i]--;
        }
        for (i = 0; i < 14; i++) {
            let Dm = this.HeShuo[i] + J2000, v2 = this.LunarMonthName[i];
            let mc = lunarMonthName[v2 % 12];
            if (Dm >= 1724360 && Dm <= 1729794)
                mc = lunarMonthName[(v2 + 1) % 12];
            else if (Dm >= 1807724 && Dm <= 1808699)
                mc = lunarMonthName[(v2 + 1) % 12];
            else if (Dm >= 1999349 && Dm <= 1999467)
                mc = lunarMonthName[(v2 + 2) % 12];
            else if (Dm >= 1973067 && Dm <= 1977052) {
                if (v2 % 12 == 0)
                    mc = "正";
                if (v2 == 2)
                    mc = '一';
            }
            if (Dm == 1729794 || Dm == 1808699)
                mc = '拾贰';
            this.LunarMonthName[i] = mc;
        }
    }
}
;
var gQiShuoBase = new _cQiShuoBase_();
gQiShuoBase.init();
class _cGCDayInfo_ {
    constructor() {
        this.Lyear2 = '';
        this.Lyear3 = '';
        this.Lmonth2 = '';
        this.Lday2 = '';
        this.Ldn = '';
        this.Lleap = '';
        this.Lmc = '';
        this.Lmc2 = '';
        this.Ldc = '';
        this.LJieQi = '';
        this.MoonPhase = '';
        this.MoonPhaseTime = '';
        this.JieQi = '';
        this.JieQiTime = '';
        this.Constellation = '';
    }
}
class _Lunar_ {
    constructor(thisYearNum, thisMonthNum) {
        this.sty_head = ' style="font-family: 思源黑体,Courier New; font-size: 14px; text-align: center; background-color: #E0E0FF; color: #000000; font-weight: bold" ';
        this.sty_body = ' style="font-family: 思源黑体,Courier New; font-size: 12px; text-align: center " ';
        this.sty_date = ' style="font-family: Arial Black; text-align: center;font-size: 20px" ';
        this.sty_date2 = ' style="font-family: Arial Black; text-align: center;font-size: 20px; color: #FF0000" ';
        this.sty_cur = ' style="background-color:#90D050" ';
        this.lunDay = new Array();
        this.Ly = "";
        this.Lyear2 = "";
        this.Lyear3 = "";
        this.Lyear4 = "";
        this.ZodiacName = "";
        this.EmperorYear = "";
        this.Constellation = "";
        for (let i = 0; i < 35; i++) {
            this.lunDay[i] = new _cGCDayInfo_();
        }
        this.lunDay.dn = 0;
    }
    substr2(s, n, end) {
        s = s.replace(/(^\s*)|(\s*$)/g, "");
        if (s.length > n + 1)
            return s.slice(0, n) + end;
        return s;
    }
    calendarCalc(thisYearNum, thisMonthNum) {
        let i, j, k, yearTemp, Bd0, Bdn;
        for (let i = 0; i < 31; i++) {
            this.lunDay[i] = new Object();
        }
        this.lunDay.dn = 0;
        JD.Year = thisYearNum;
        JD.Month = thisMonthNum;
        JD.Day = 1;
        JD.Hour = 12;
        JD.Min = 0;
        JD.Sec = 0.1;
        Bd0 = int2(JD.toJD()) - J2000;
        JD.Month++;
        if (JD.Month > 12)
            JD.Year++, JD.Month = 1;
        Bdn = int2(JD.toJD()) - J2000 - Bd0;
        this.weekDay = (Bd0 + J2000 + 1 + 7000000) % 7;
        this.Year = thisYearNum;
        this.Month = thisMonthNum;
        this.d0 = Bd0;
        this.dn = Bdn;
        this.JD0 = JD.JD(thisYearNum, 1, 1) + 0.5;
        this.JD0WeekDay = (this.JD0 + 1 + 7000000) % 7;
        this.M_WeekNum = parseInt((J2000 + Bd0 - this.JD0 + this.JD0WeekDay) / 7 + 1);
        thisMonthWeek = this.weekDay;
        thisMonthDayNum = this.dn;
        yearTemp = thisYearNum - 1984 + 12000;
        this.Ly = tianGanName[yearTemp % 10] + diZhiName[yearTemp % 12];
        this.ZodiacName = zodiacName[yearTemp % 12];
        this.EmperorYear = gLCalendarBase.getNianHao(thisYearNum);
        let D, w;
        let ob = new _cGCDayInfo_();
        let ob2 = new _cGCDayInfo_();
        for (i = 0, j = 0; i < Bdn; i++) {
            ob = this.lunDay[i];
            ob.d0 = Bd0 + i;
            ob.di = i;
            ob.dn = Bdn;
            ob.Year = thisYearNum;
            ob.Month = thisMonthNum;
            ob.week0 = this.weekDay;
            ob.week = (this.weekDay + i) % 7;
            ob.weeki = int2((this.weekDay + i) / 7);
            ob.weekN = int2((this.weekDay + Bdn - 1) / 7) + 1;
            JD.setJD2YMD(ob.d0 + J2000);
            ob.Day = JD.Day;
            if (!gQiShuoBase.MidQi.length || ob.d0 < gQiShuoBase.MidQi[0] || ob.d0 >= gQiShuoBase.MidQi[24])
                gQiShuoBase.calcY(ob.d0);
            let mk = int2((ob.d0 - gQiShuoBase.HeShuo[0]) / 30);
            if (mk < 13 && gQiShuoBase.HeShuo[mk + 1] <= ob.d0)
                mk++;
            ob.Ldi = ob.d0 - gQiShuoBase.HeShuo[mk];
            ob.Ldc = lunarDayName[ob.Ldi];
            ob.cur_dz = ob.d0 - gQiShuoBase.MidQi[0];
            ob.cur_xz = ob.d0 - gQiShuoBase.MidQi[12];
            ob.cur_lq = ob.d0 - gQiShuoBase.MidQi[15];
            ob.cur_mz = ob.d0 - gQiShuoBase.MidQi[11];
            ob.cur_xs = ob.d0 - gQiShuoBase.MidQi[13];
            if (ob.d0 == gQiShuoBase.HeShuo[mk] || ob.d0 == Bd0) {
                ob.Lmc = gQiShuoBase.LunarMonthName[mk];
                ob.Ldn = gQiShuoBase.LunarMonthDayNum[mk];
                ob.Lleap = (gQiShuoBase.LunarLeapMonth && gQiShuoBase.LunarLeapMonth == mk) ? '闰' : '';
                ob.Lmc2 = mk < 13 ? gQiShuoBase.LunarMonthName[mk + 1] : "未知";
            }
            else {
                ob2 = this.lunDay[i - 1];
                ob.Lmc = ob2.Lmc;
                ob.Ldn = ob2.Ldn;
                ob.Lleap = ob2.Lleap;
                ob.Lmc2 = ob2.Lmc2;
            }
            let qk = int2((ob.d0 - gQiShuoBase.MidQi[0] - 7) / 15.2184);
            if (qk < 23 && ob.d0 >= gQiShuoBase.MidQi[qk + 1])
                qk++;
            if (ob.d0 == gQiShuoBase.MidQi[qk])
                ob.LJieQi = jieQiName[qk];
            else
                ob.LJieQi = '';
            ob.MoonPhase = ob.MoonPhaseJD = ob.MoonPhaseTime = '';
            ob.JieQi = ob.JieQiJD = ob.JieQiTime = '';
            D = gQiShuoBase.MidQi[3] + (ob.d0 < gQiShuoBase.MidQi[3] ? -365 : 0) + 365.25 * 16 - 35;
            ob.Lyear = Math.floor(D / 365.2422 + 0.5);
            D = gQiShuoBase.HeShuo[2];
            for (j = 0; j < 14; j++) {
                if (gQiShuoBase.LunarMonthName[j] != '正' || gQiShuoBase.LunarLeapMonth == j && j)
                    continue;
                D = gQiShuoBase.HeShuo[j];
                if (ob.d0 < D) {
                    D -= 365;
                    break;
                }
            }
            D = D + 5810;
            ob.Lyear0 = Math.floor(D / 365.2422 + 0.5);
            D = ob.Lyear + 12000;
            ob.Lyear2 = tianGanName[D % 10] + diZhiName[D % 12];
            D = ob.Lyear0 + 12000;
            ob.Lyear3 = tianGanName[D % 10] + diZhiName[D % 12];
            ob.Lyear4 = ob.Lyear0 + 1984 + 2698;
            this.Lyear4 = ob.Lyear4;
            mk = int2((ob.d0 - gQiShuoBase.MidQi[0]) / 30.43685);
            if (mk < 12 && ob.d0 >= gQiShuoBase.MidQi[2 * mk + 1])
                mk++;
            D = mk + int2((gQiShuoBase.MidQi[12] + 390) / 365.2422) * 12 + 900000;
            ob.Lmonth = D % 12;
            ob.Lmonth2 = tianGanName[D % 10] + diZhiName[D % 12];
            D = ob.d0 - 6 + 9000000;
            ob.Lday2 = tianGanName[D % 10] + diZhiName[D % 12];
            mk = int2((ob.d0 - gQiShuoBase.MidQi[0] - 15) / 30.43685);
            if (mk < 11 && ob.d0 >= gQiShuoBase.MidQi[2 * mk + 2])
                mk++;
            ob.Constellation = constellationFullName[(mk + 12) % 12];
            gGCalendarBase.getHuiLi(ob.d0, ob);
            ob.A = ob.B = ob.C = '';
            ob.Fjia = 0;
        }
        let d, xn, jd2 = Bd0 + dt_T(Bd0) - 8 / 24;
        w = Sun_Moon_Ephemeris.MS_aLon(jd2 / 36525, 10, 3);
        w = int2((w - 0.78) / Math.PI * 2) * Math.PI / 2;
        do {
            d = gLCalendarBase.shuoAccurate(w);
            D = int2(d + 0.5);
            xn = int2(w / pi2 * 4 + 4000000.01) % 4;
            w += pi2 / 4;
            if (D >= Bd0 + Bdn)
                break;
            if (D < Bd0)
                continue;
            ob = this.lunDay[D - Bd0];
            ob.MoonPhase = moonPhaseFullName[xn];
            ob.MoonPhaseJD = d;
            ob.MoonPhaseTime = JD.JD2TimeStr(d);
        } while ((D + 5) < (Bd0 + Bdn));
        w = Sun_Moon_Ephemeris.S_aLon(jd2 / 36525, 3);
        w = int2((w - 0.13) / pi2 * 24) * pi2 / 24;
        do {
            d = gLCalendarBase.qiAccurate(w);
            D = int2(d + 0.5);
            xn = int2(w / pi2 * 24 + 24000006.01) % 24;
            w += pi2 / 24;
            if (D >= Bd0 + Bdn)
                break;
            if (D < Bd0)
                continue;
            ob = this.lunDay[D - Bd0];
            ob.JieQi = jieQiName[xn];
            ob.JieQiJD = d;
            ob.JieQiTime = JD.JD2TimeStr(d);
        } while (D + 12 < Bd0 + Bdn);
    }
    calendarInfoCalc(thisYearNum, thisMonthNum, curRegionJD_2K) {
        let i, j, c, c2 = '', cr = "", isM = "";
        let ob;
        let thisYearTemp = thisYearNum, thisMonthTemp = thisMonthNum;
        let lastYearTemp, lastMonthTemp;
        let nextYearTemp, nextMonthTemp;
        if (thisMonthTemp == 1) {
            lastYearTemp = thisYearTemp - 1;
            lastMonthTemp = 12;
            nextYearTemp = thisYearTemp;
            nextMonthTemp = thisMonthTemp + 1;
        }
        else if (thisMonthTemp == 12) {
            lastYearTemp = thisYearTemp;
            lastMonthTemp = 11;
            nextYearTemp = thisYearTemp + 1;
            nextMonthTemp = 1;
        }
        else {
            lastYearTemp = thisYearTemp;
            lastMonthTemp = thisMonthTemp - 1;
            nextYearTemp = thisYearTemp;
            nextMonthTemp = thisMonthTemp + 1;
        }
        this.calendarCalc(thisYearNum, thisMonthNum);
        this.titleInfo = this.EmperorYear + ' 黄帝' + this.Lyear4 + this.Ly + '年【' + this.ZodiacName + '年】';
        let ta0 = "";
        let strTemp = "";
        let dayInfoTemp = [];
        for (let i = 0; i < 42; i++) {
            let elementTemp = document.getElementById('MC_Day' + (i + 1));
            elementTemp === null || elementTemp === void 0 ? void 0 : elementTemp.style.backgroundColor = "#ffffff";
            if (i < this.weekDay) {
                elementTemp.innerHTML = "";
            }
            else if (i >= (this.weekDay + this.dn)) {
                elementTemp.innerHTML = "";
            }
            else {
                ob = this.lunDay[i - this.weekDay];
                if ((thisYearNum == 1582) && (thisMonthNum == 10) && ((i - this.weekDay + 1) >= 5)) {
                    strTemp = "<font color=#0000FF font-size='28px'><b>" + (i - this.weekDay + 11) + "</b></font>";
                }
                else {
                    strTemp = "<font color=#0000FF font-size='28px'><b>" + (i - this.weekDay + 1) + "</b></font>";
                }
                if (ob.Ldc == "初一") {
                    strTemp += " " + ob.Lleap + ob.Lmc + '月' + (ob.Ldn == 30 ? '大' : '小') + ob.Lday2;
                    elementTemp === null || elementTemp === void 0 ? void 0 : elementTemp.style.backgroundColor = "#00aa00";
                }
                else {
                    strTemp += " " + ob.Ldc + ob.Lday2;
                }
                if (ob.LJieQi != "") {
                    elementTemp === null || elementTemp === void 0 ? void 0 : elementTemp.style.backgroundColor = "#fdf905";
                    ob.B = "◆" + ob.LJieQi;
                }
                elementTemp.innerHTML = strTemp + "<br>" + ob.MoonPhase + ob.B;
            }
        }
        for (let i = 0; i < 6; i++) {
            let elementTemp = document.getElementById('MC_Week' + (i + 1));
            elementTemp.innerHTML = (this.M_WeekNum + i) + "/" + (i + 1);
        }
        let shuoStr = '', qiStr = '';
        for (let i = 0; i < this.dn; i++) {
            ob = this.lunDay[i];
            c = i + 1;
            if (ob.MoonPhase == '朔🌑')
                shuoStr += thisMonthTemp + '/' + c + '日 ' + ob.MoonPhaseTime + " " + ob.MoonPhase + '<br>';
            if (ob.MoonPhase == '上弦🌓')
                shuoStr += thisMonthTemp + '/' + c + '日 ' + ob.MoonPhaseTime + " " + ob.MoonPhase + '<br>';
            if (ob.MoonPhase == "望🌕")
                shuoStr += thisMonthTemp + '/' + c + '日 ' + ob.MoonPhaseTime + " " + ob.MoonPhase + '<br>';
            if (ob.MoonPhase == "下弦🌗")
                shuoStr += thisMonthTemp + '/' + c + '日 ' + ob.MoonPhaseTime + " " + ob.MoonPhase + '<br>';
            if (ob.JieQi)
                qiStr += thisMonthTemp + '/' + c + '日 ' + ob.JieQiTime + " ◆" + ob.JieQi + "◆<br>";
        }
        this.qiShuoInfo = "<font style='font-size:12px;color:rgb(255, 0, 0)'>" + shuoStr + '</font>'
            + "<font style='font-size:12px;color:rgb(0, 0, 255)'>" + qiStr + '</font>';
    }
    ;
    calendarHTML(thisYearNum, thisMonthNum, curRegionJD_2K) {
        let i, j, c, c2, cr = "", isM = "";
        let ob;
        this.calendarCalc(thisYearNum, thisMonthNum);
        c = this.EmperorYear + ' 农历' + this.Ly + '年【' + this.ZodiacName + '年】';
        if (c.length > 33)
            c = '<span style="font-size:12px">' + c + '</span>';
        else
            c = '<span style="font-size:16px;font-weight:bold">' + c + '</span>';
        let ta0 = '<tr><td colspan=7 style="background-color:#0000A0;color:#FFFF00">' + c + '</td></tr>';
        ta0 += '<tr>' + '<td' + this.sty_head + 'width="%14">日</td>' + '<td' + this.sty_head + 'width="%14">一</td>' + '<td' + this.sty_head + 'width="%14">二</td>'
            + '<td' + this.sty_head + 'width="%14">三</td>' + '<td' + this.sty_head + 'width="%14">四</td>' + '<td' + this.sty_head + 'width="%14">五</td>'
            + '<td' + this.sty_head + 'width="%14">六</td></tr>';
        for (i = 0; i < this.dn; i++) {
            ob = this.lunDay[i];
            if (!i) {
                for (j = 0; j < this.weekDay; j++)
                    cr += '<td' + this.sty_body + '></td>';
            }
            c = '', isM = '';
            if (!c && ob.Ldc == "初一")
                c = ob.Lleap + ob.Lmc + '月' + (ob.Ldn == 30 ? '大' : '小');
            if (!c)
                c = ob.Ldc;
            if (ob.MoonPhase == "朔🌑")
                isM = '<font color=#505000>🌑</font>';
            if (ob.MoonPhase == "望🌕")
                isM = '<font color=#F0B000>🌕</font>';
            if (ob.MoonPhase == "上弦🌓")
                isM = '<font color=#F0B000><b>🌓</b></font>';
            if (ob.MoonPhase == "下弦🌗")
                isM = '<font color=#F0B000><b>🌗</b></font>';
            if (ob.JieQi)
                isM += '<font color=#00C000>◆</font>';
            c2 = this.sty_date;
            c2 += ' onmouseover="MC_thisDayInfoShow(' + i + ')"';
            c2 = '<span' + c2 + '>' + ob.Day + '</span>';
            if (ob.d0 == curRegionJD_2K)
                c2 = '<span' + this.sty_cur + '>' + c2 + '</span>';
            cr += '<td' + this.sty_body + 'width="14%">' + c2 + '<br>' + isM + c + '</td>';
            if (i == this.dn - 1) {
                for (j = 0; j < 6 - ob.week; j++)
                    cr += '<td' + this.sty_body + '></td>';
            }
            if (i == this.dn - 1 || ob.week == 6)
                ta0 += '<tr>' + cr + '</tr>', cr = "";
        }
        this.calendarInfo = '<table border=0 cellpadding=3 cellspacing=1 width="100%">' + ta0 + '</table>';
        let b2 = '', b3 = '', b4 = '';
        for (i = 0; i < this.dn; i++) {
            ob = this.lunDay[i];
            c = i + 1;
            if (c < 10)
                c = '&nbsp;' + c;
            if (ob.MoonPhase == '朔🌑')
                b2 += c + '日 ' + ob.MoonPhaseTime + ob.MoonPhase + '<br>';
            if (ob.MoonPhase == '上弦🌓')
                b2 += c + '日 ' + ob.MoonPhaseTime + ob.MoonPhase + '<br>';
            if (ob.MoonPhase == "望🌕")
                b3 += c + '日 ' + ob.MoonPhaseTime + ob.MoonPhase + '<br>';
            if (ob.MoonPhase == "下弦🌗")
                b3 += c + '日 ' + ob.MoonPhaseTime + ob.MoonPhase + '<br>';
            if (ob.JieQi)
                b4 += c + '日 ' + ob.JieQiTime + ob.JieQi + '<br>';
        }
        this.qiShuoInfo = b2 + b3 + b4;
    }
}
var oLunarGlobal = new _Lunar_();
class _Calendar_JD_ {
    constructor(calendarFlag = 0, Year = 2000, Month = 1, Day = 1, Hour = 12, Min = 0, Sec = 0, LCLeapFlag = 0) {
        this.tianGanTB = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲"];
        this.diZhiTB = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"];
        this.Hour = Hour - 0;
        this.Min = Min - 0;
        this.Sec = Sec - 0;
        this.time = ((this.Sec / 60 + this.Min) / 60 + this.Hour) / 24;
        this.Year = Year - 0;
        this.Month = Month - 0;
        this.Day = Day - 0;
        this.GCYear = Year - 0;
        this.GCMonth = 1;
        this.GCDay = 1;
        this.JCYear = Year - 0;
        this.JCMonth = 1;
        this.JCDay = 1;
        this.LCYear = Year - 0;
        this.LCMonth = 1;
        this.LCDay = 1;
        this.GCYearLeap = 0;
        this.JCYearLeap = 0;
        this.LCMonthLeap = LCLeapFlag;
        this.thisJD = J2000;
    }
    init_YMD2JD(calendarFlag, Year, Month, Day, LCLeapFlag = 0) {
    }
    setCEYearLeap(year, calendar = 1) {
        let isLeap1 = 0, isLeap2 = 0;
        if (((year % 4) + 4) % 4 == 0) {
            isLeap2 = isLeap1 = 1;
        }
        if (((year % 100) + 100) % 100 == 0) {
            isLeap1 = 0;
        }
        if (((year % 400) + 400) % 400 == 0) {
            isLeap1 = 1;
        }
        if (calendar == 1) {
            this.YearLeap = isLeap1;
        }
        else if (calendar == 2) {
            this.YearLeap = isLeap2;
        }
        ;
        this.JCYearLeap = isLeap2;
        this.GCYearLeap = isLeap1;
        return this.YearLeap;
    }
    setGCYearLeap(year) {
        let isLeap = this.setCEYearLeap(year, 1);
        return isLeap;
    }
    setJCYearLeap(year) {
        let isLeap = this.setCEYearLeap(year, 2);
        return isLeap;
    }
    dateTimeStrSeparate(dateTimeString) {
        let sTimeDateTemp = dateTimeString.split('.');
        let sFirstCharTemp = sTimeDateTemp[0].slice(0, 1);
        let iADTemp = 1;
        let yearTemp = '';
        let monthTemp = '';
        let dayTemp = '';
        let hourTemp = '';
        let minuteTemp = '';
        let timeTemp = '';
        let genderTemp = Number(sTimeDateTemp[1].slice(0, 1));
        let hemisphereTemp = Number(sTimeDateTemp[1].slice(1, 2));
        if (sFirstCharTemp == '-') {
            iADTemp = -1;
        }
        else if (sFirstCharTemp == '+') {
            iADTemp = 1;
        }
        yearTemp = Number(sTimeDateTemp[0].slice(1, 5));
        monthTemp = Number(sTimeDateTemp[0].slice(5, 7));
        dayTemp = Number(sTimeDateTemp[0].slice(7, 9));
        hourTemp = Number(sTimeDateTemp[0].slice(9, 11));
        minuteTemp = Number(sTimeDateTemp[0].slice(11, 13));
        timeTemp = hourTemp + minuteTemp / 60.0;
        return [iADTemp, yearTemp, monthTemp, dayTemp, hourTemp, minuteTemp, timeTemp, genderTemp, hemisphereTemp];
    }
    getGCYearLeap() {
        return this.GCYearLeap;
    }
    getJCYearLeap() {
        return this.JCYearLeap;
    }
    JD(year, month, day) {
        let JDTemp = this.jc_gc_Date2JD(year, month, day);
        return JDTemp;
    }
    toJD() {
        let JDTemp = this.jc_gc_Date2JD(this.Year, this.Month, this.Day + ((this.Sec / 60 + this.Min) / 60 + this.Hour) / 24);
        return JDTemp;
    }
    ;
    jc_gc_Date2JD(Year = 2000, Month = 1, Day = 1) {
        let n = 0, calendarFlag = 0;
        let year = Year, month = Month, day = Day;
        let lengthMonth;
        if ((Year * 372 + Month * 31 + int2(Day)) >= 588829) {
            calendarFlag = 1;
            lengthMonth = this.getGC_MonthLenth(Year, Month);
        }
        else {
            lengthMonth = this.getJC_MonthLenth(Year, Month);
        }
        if ((lengthMonth + 1) < day) {
            window.alert('jc_gc_Date2JD()公历' + Year + '年' + Month + '月，最多有：' + lengthMonth + '日。(' + day + ')');
            day = (day % 1) + lengthMonth;
            window.alert('jc_gc_Date2JD()公历日截取后的日数为：' + day);
        }
        if (Month < 1) {
            window.alert('jc_gc_Date2JD()公历' + Month + '月，月数小于1月，将被强制设为1月。');
            month = 1;
        }
        else if (Month > 12) {
            window.alert('jc_gc_Date2JD()公历' + Month + '月，月数大于12月，将被强制设为12月。');
            month = 12;
        }
        if (Month <= 2)
            month += 12, year--;
        if (calendarFlag)
            n = int2(year / 100), n = 2 - n + int2(n / 4);
        return int2(365.25 * (year + 4716)) + int2(30.6001 * (month + 1)) + day + n - 1524.5;
    }
    gcDate2JD(GCYear, GCMonth, GCDay) {
        let year = GCYear, month = GCMonth, day = GCDay;
        let lengthMonth = this.getGC_MonthLenth(GCYear, GCMonth);
        if (GCDay < 1) {
            day = 1;
            window.alert('gcDate2JD()格里历' + GCDay + '日，小于1日，将被强制设为1日。');
        }
        else if ((lengthMonth + 1) < day) {
            day = (day % 1) + lengthMonth;
            window.alert('gcDate2JD()格里历' + GCYear + '年' + GCMonth + '月，最多有：' + lengthMonth + '日。(' + GCDay + '截取后的日数为：' + day + ')');
        }
        if (GCMonth < 1) {
            window.alert('gcDate2JD()格里历' + GCMonth + '月，小于1月，将被强制设为1月。');
            month = 1;
        }
        else if (GCMonth > 12) {
            window.alert('gcDate2JD()格里历' + GCMonth + '月，大于12月，将被强制设为12月。');
            month = 12;
        }
        let JD = 0;
        JD = (year + 10000) * 365 + Math.ceil((year + 10000) / 4) - Math.ceil((year + 10000) / 100) + Math.ceil((year + 10000) / 400);
        JD += this.getGC_DayNum(year, month, day) - 1931442.5 + 77;
        return JD;
    }
    jcDate2JD(JCYear, JCMonth, JCDay) {
        let year = JCYear, month = JCMonth, day = JCDay;
        let lengthMonth = this.getJC_MonthLenth(JCYear, JCMonth);
        if (JCDay < 1) {
            day = 1;
            window.alert('jcDate2JD()格里历' + JCDay + '日，小于1日，将被强制设为1日。');
        }
        else if ((lengthMonth + 1) < day) {
            day = (day % 1) + lengthMonth;
            window.alert('jcDate2JD()儒略历' + JCYear + '年' + JCMonth + '月，最多有：' + lengthMonth + '日。(' + JCDay + '截取后的日数为：' + day + ')');
        }
        if (JCMonth < 1) {
            window.alert('jcDate2JD()儒略历' + JCMonth + '月，小于1月，将被强制设为1月。');
            month = 1;
        }
        else if (JCMonth > 12) {
            window.alert('jcDate2JD()儒略历' + JCMonth + '月，大于12月，将被强制设为12月。');
            month = 12;
        }
        let JD = 0;
        JD = (year + 10000) * 365 + Math.ceil((year + 10000) / 4);
        JD += this.getJC_DayNum(year, month, day) - 1931442.5;
        return JD;
    }
    gcDate2JD_1(GCYear, GCMonth, GCDay) {
        let A = Math.floor(GCYear / 100);
        let B = 2 - A + Math.floor(A / 4);
        let year = GCYear, month = GCMonth, day = GCDay;
        let lengthMonth = this.getGC_MonthLenth(GCYear, GCMonth);
        if (GCDay < 1) {
            day = 1;
            window.alert('gcDate2JD()格里历' + GCDay + '日，小于1日，将被强制设为1日。');
        }
        else if ((lengthMonth + 1) < day) {
            day = (day % 1) + lengthMonth;
            window.alert('gcDate2JD()格里历' + GCYear + '年' + GCMonth + '月，最多有：' + lengthMonth + '日。(' + GCDay + ')' + '截取后的日数为：' + day);
        }
        if (GCMonth < 1) {
            window.alert('gcDate2JD()格里历' + GCMonth + '月，小于1月，将被强制设为1月。');
            month = 1;
        }
        else if (GCMonth > 12) {
            window.alert('gcDate2JD()格里历' + GCMonth + '月，大于12月，将被强制设为12月。');
            month = 12;
        }
        if (GCMonth <= 2) {
            year -= 1;
            month += 12;
        }
        let JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
        return JD;
    }
    jcDate2JD_1(JCYear, JCMonth, JCDay) {
        let a = Math.floor((14 - JCMonth) / 12);
        let year = JCYear, month = JCMonth, day = JCDay;
        let lengthMonth = this.getJC_MonthLenth(JCYear, JCMonth);
        if ((lengthMonth + 1) < day) {
            window.alert('jcDate2JD()儒略历' + JCYear + '年' + JCMonth + '月，最多有：' + lengthMonth + '日。(' + day + ')');
            day = (day % 1) + lengthMonth;
            window.alert('jcDate2JD()儒略历日截取后的日数为：' + day);
        }
        if (JCMonth < 1) {
            window.alert('jcDate2JD()儒略历' + JCMonth + '月，月数小于1月，将被强制设为1月。');
            month = 1;
        }
        else if (JCMonth > 12) {
            window.alert('jcDate2JD()儒略历' + JCMonth + '月，月数大于12月，将被强制设为12月。');
            month = 12;
        }
        year = JCYear + 4800 - a;
        month = month + 12 * a - 3;
        let JD = day + Math.floor((153 * month + 2) / 5) + 365 * year + Math.floor(year / 4) - 32083 - 0.5;
        return JD;
    }
    lcDate2JD(LCYear, LCMonth, LCDay, leapMonthFlag = 0, firstMonth = 3) {
        let month, day = LCDay, lMonthNo;
        let JD0, JD1;
        let lengthMonth;
        gQiShuoBase.calcY(int2((LCYear - 2000) * 365.2422 + 180));
        month = LCMonth + firstMonth - 1;
        lMonthNo = gQiShuoBase.LunarLeapMonth;
        if (month == lMonthNo) {
            if (leapMonthFlag == 1)
                month += 1;
        }
        else if (leapMonthFlag == 1) {
            window.alert('农历' + LCYear + '年' + LCMonth + '月，无闰月；本年闰月数：' + (lMonthNum));
        }
        JD0 = gQiShuoBase.HeShuo[month - 1];
        lengthMonth = gQiShuoBase.LunarMonthDayNum[month - 1];
        if ((lengthMonth + 1) < day) {
            window.alert('农历' + LCYear + '年' + LCMonth + '月，最多有：' + lengthMonth + '日。(' + day + ')');
            day = (day % 1) + lengthMonth;
            window.alert('农历日截取后的日数为：' + day);
        }
        JD1 = JD0 + day - 1.5 + J2000;
        return JD1;
    }
    getCE_MonthLenth(year, month, calendar = 1) {
        let isleap = this.setCEYearLeap(year, calendar);
        let lengthMonth = 30;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            lengthMonth = 31;
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            lengthMonth = 30;
        }
        else if (month == 2) {
            lengthMonth = 28 + Number(isleap ? 1 : 0);
        }
        return lengthMonth;
    }
    getGC_MonthLenth(year, month) {
        return this.getCE_MonthLenth(year, month, 1);
    }
    getJC_MonthLenth(year, month) {
        return this.getCE_MonthLenth(year, month, 2);
    }
    getJC_GC_DayNum(year, month, day) {
        let dayNum = this.jc_gc_Date2JD(year, month, day) - this.jc_gc_Date2JD(year, 1, 1);
        return dayNum;
    }
    getGC_DayNum(year, month, day) {
        let dayNum = 0;
        let isleap = this.setGCYearLeap(year);
        if (month == 1) {
            dayNum = day;
        }
        else if (month == 2) {
            dayNum = 31 + day;
        }
        else if (month == 3) {
            dayNum = 59 + day;
        }
        else if (month == 4) {
            dayNum = 90 + day;
        }
        else if (month == 5) {
            dayNum = 120 + day;
        }
        else if (month == 6) {
            dayNum = 151 + day;
        }
        else if (month == 7) {
            dayNum = 181 + day;
        }
        else if (month == 8) {
            dayNum = 212 + day;
        }
        else if (month == 9) {
            dayNum = 243 + day;
        }
        else if (month == 10) {
            dayNum = 273 + day;
        }
        else if (month == 11) {
            dayNum = 304 + day;
        }
        else if (month == 12) {
            dayNum = 334 + day;
        }
        if ((month > 2) && (isleap == 1)) {
            dayNum += 1;
        }
        return (dayNum - 1);
    }
    getJC_DayNum(year, month, day) {
        let dayNum = 0;
        let isleap = this.setJCYearLeap(year);
        if (month == 1) {
            dayNum = day;
        }
        else if (month == 2) {
            dayNum = 31 + day;
        }
        else if (month == 3) {
            dayNum = 59 + day;
        }
        else if (month == 4) {
            dayNum = 90 + day;
        }
        else if (month == 5) {
            dayNum = 120 + day;
        }
        else if (month == 6) {
            dayNum = 151 + day;
        }
        else if (month == 7) {
            dayNum = 181 + day;
        }
        else if (month == 8) {
            dayNum = 212 + day;
        }
        else if (month == 9) {
            dayNum = 243 + day;
        }
        else if (month == 10) {
            dayNum = 273 + day;
        }
        else if (month == 11) {
            dayNum = 304 + day;
        }
        else if (month == 12) {
            dayNum = 334 + day;
        }
        if ((month > 2) && (isleap == 1)) {
            dayNum += 1;
        }
        return (dayNum - 1);
    }
    JD2GC0Date(jd1, timeZone = 0, dst = 0) {
        let jd = jd1 + (timeZone + dst) / 24;
        let date = new Object();
        let D = int2(jd + 0.5);
        let F = jd + 0.5 - D;
        let c;
        if (D >= 2299161) {
            c = int2((D - 1867216.25) / 36524.25);
            D += 1 + c - int2(c / 4);
        }
        D += 1524;
        date.Year = int2((D - 122.1) / 365.25);
        D -= int2(365.25 * date.Year);
        date.Month = int2(D / 30.601);
        D -= int2(30.601 * date.Month);
        date.Day = D;
        if (date.Month > 13) {
            date.Month -= 13;
            date.Year -= 4715;
        }
        else {
            date.Month -= 1;
            date.Year -= 4716;
        }
        F *= 24;
        date.Hour = int2(F);
        F -= date.Hour;
        F *= 60;
        date.Min = int2(F);
        F -= date.Min;
        F *= 60;
        date.Sec = F;
        return date;
    }
    JD2GCDate(jd1, timeZone = 0, dst = 0) {
        let JD = jd1 + (timeZone + dst) / 24;
        let date = new Object();
        let time = new Object();
        let Z = Math.floor(JD + 0.5);
        let W = Math.floor((Z - 1867216.25) / 36524.25);
        let X = Math.floor(W / 4);
        let A = Z + 1 + W - X;
        let B = A + 1524;
        let C = Math.floor((B - 122.1) / 365.25);
        let D = Math.floor(365.25 * C);
        let E = Math.floor((B - D) / 30.6001);
        date.day = B - D - Math.floor(30.6001 * E);
        date.month = E - (E > 13.5 ? 13 : 1);
        date.year = C - (date.month > 2.5 ? 4716 : 4715);
        time = this.JD2Time(JD);
        date.hour = time.hour;
        date.min = time.min;
        date.sec = time.sec;
        return date;
    }
    JD2JCDate(jd1, timeZone = 0, dst = 0) {
        let JD = jd1 + (timeZone + dst) / 24;
        let date = new Object();
        let time = new Object();
        let Z = Math.floor(JD + 0.5);
        let A = Z + 1524;
        let B = Math.floor((A - 122.1) / 365.25);
        let C = Math.floor(365.25 * B);
        let D = Math.floor((A - C) / 30.6001);
        date.day = A - C - Math.floor(30.6001 * D);
        date.month = D - (D > 13.5 ? 13 : 1);
        date.year = B - (date.month > 2.5 ? 4716 : 4715);
        time = this.JD2Time(JD);
        date.hour = time.hour;
        date.min = time.min;
        date.sec = time.sec;
        return date;
    }
    getGC0Date2str(date, timeZone = 0, dst = 0) {
        let Y = "";
        let M = "0" + date.Month;
        let D = "0" + date.Day;
        let h = date.Hour;
        let hStr = "";
        let m = date.Min;
        let mStr = "";
        let s = int2(date.Sec + .5);
        let sStr = "";
        let strOb = new Object();
        if (date.Year >= 0) {
            Y = '+' + String(date.Year).padStart(4, "0");
        }
        else {
            Y = '-' + String(-date.Year).padStart(4, "0");
        }
        if (s >= 60)
            s -= 60, m++;
        if (m >= 60)
            m -= 60, h++;
        if (h < 10) {
            hStr = "0" + h.toString();
        }
        else {
            hStr = h.toString();
        }
        if (m < 10) {
            mStr = "0" + m.toString();
        }
        else {
            mStr = m.toString();
        }
        if (s < 10) {
            sStr = "0" + s.toString();
        }
        else {
            sStr = s.toString();
        }
        Y = Y.slice(Y.length - 5, Y.length);
        M = M.slice(M.length - 2, M.length);
        D = D.slice(D.length - 2, D.length);
        hStr = hStr.slice(hStr.length - 2, hStr.length);
        mStr = mStr.slice(mStr.length - 2, mStr.length);
        sStr = sStr.slice(sStr.length - 2, sStr.length);
        strOb.dateStr = Y + yearDelimiter + M + yearDelimiter + D + yearTimeDelimiter;
        strOb.timeStr = hStr + timeDelimiter + mStr + timeDelimiter + sStr;
        strOb.dateTimeStr = strOb.dateStr + yearTimeDelimiter + strOb.timeStr;
        strOb.NianHao = gLCalendarBase.getNianHao(date.Year);
        strOb.dateStr1 = Y + M + D;
        strOb.timeStr1 = hStr + mStr + '.00';
        strOb.timeStr2 = hStr + mStr + '.10';
        strOb.dateTimeStr1 = strOb.dateStr1 + strOb.timeStr1;
        strOb.dateTimeStr2 = strOb.dateStr1 + strOb.timeStr2;
        strOb.fullStr0 = strOb.dateStr + strOb.NianHao;
        strOb.fullStr1 = strOb.dateTimeStr + strOb.NianHao;
        return strOb;
    }
    ;
    JD2str(jd, timeZone = 0, dst = 0) {
        let date = this.JD2GC0Date(jd + (timeZone + dst) / 24);
        return this.getGC0Date2str(date);
    }
    ;
    setJD2YMD(jd) {
        let date = this.JD2GC0Date(jd);
        this.Year = date.Year;
        this.Month = date.Month;
        this.Day = date.Day;
        this.Hour = date.Hour;
        this.Min = date.Min;
        this.Sec = date.Sec;
        return [this.Year, this.Month, this.Day, this.Hour, this.Min, this.Sec];
    }
    ;
    JD2Time(jd0) {
        let hour, min, sec;
        let time = new Object();
        let jd = jd0 + 0.5;
        jd = (jd - int2(jd));
        sec = int2(jd * 86400 + 0.5);
        hour = int2(sec / 3600);
        sec -= hour * 3600;
        min = int2(sec / 60);
        sec -= min * 60;
        time.hour = hour;
        time.min = min;
        time.sec = sec;
        return time;
    }
    JD2TimeStr(jd0) {
        let h, m, s;
        let jd = jd0 + 0.5;
        let delimiter = ':';
        jd = (jd - int2(jd));
        s = int2(jd * 86400 + 0.5);
        h = int2(s / 3600);
        s -= h * 3600;
        m = int2(s / 60);
        s -= m * 60;
        h = "0" + h;
        m = "0" + m;
        s = "0" + s;
        return (h.slice(h.length - 2, h.length) + delimiter + m.slice(m.length - 2, m.length) + delimiter + s.slice(s.length - 2, s.length));
    }
    ;
    JD2WeekNo(jd) {
        return ((jd + 1.5) % 7 + 7) % 7;
    }
    ;
    getJD4Week(year, month, nWeekNum, weekDay) {
        let jd = JD.JD(year, month, 1.5);
        let w0 = (jd + 1 + 7000000) % 7;
        let jd1 = jd - w0 + 7 * nWeekNum + weekDay;
        if (weekDay >= w0)
            jd1 -= 7;
        if (nWeekNum == 5) {
            month++;
            if (month > 12)
                month = 1, year++;
            if (jd1 >= JD.JD(year, month, 1.5))
                jd1 -= 7;
        }
        return jd1;
    }
    getJieQiNo2JD(year, JieQiNo) {
        let yFrom2k = year - 2000;
        let JD0 = new Object();
        let JD1;
        let JD2;
        let JD3;
        let JD4;
        JD1 = Sun_Moon_Ephemeris.S_aLon_t((yFrom2k + (JieQiNo - 5) * 15 / 360 + 1) * 2 * Math.PI);
        JD0.JD1 = JD1 * 36525 + J2000 + 8 / 24 - dt_T(JD1 * 36525);
        JD2 = Sun_Moon_Ephemeris.S_aLon_t((yFrom2k + (JieQiNo - 4) * 15 / 360 + 1) * 2 * Math.PI);
        JD0.JD2 = JD2 * 36525 + J2000 + 8 / 24 - dt_T(JD2 * 36525);
        JD3 = Sun_Moon_Ephemeris.S_aLon_t((yFrom2k + (JieQiNo - 3) * 15 / 360 + 1) * 2 * Math.PI);
        JD0.JD3 = JD3 * 36525 + J2000 + 8 / 24 - dt_T(JD3 * 36525);
        JD4 = Sun_Moon_Ephemeris.S_aLon_t((yFrom2k + (JieQiNo - 2) * 15 / 360 + 1) * 2 * Math.PI);
        JD0.JD4 = JD4 * 36525 + J2000 + 8 / 24 - dt_T(JD4 * 36525);
        return JD0;
    }
    JD2DayGanZhi(jd) {
        let jdTemp = Math.floor(jd + 0.5);
        let ganZhiInfo = new Object();
        ganZhiInfo.JD = jdTemp;
        ganZhiInfo.GanNo = ((jdTemp + 9) % 10 + 10) % 10 + 1;
        ganZhiInfo.Gan = this.tianGanTB[ganZhiInfo.GanNo - 1];
        ganZhiInfo.ZhiNo = ((jdTemp + 1) % 12 + 12) % 12 + 1;
        ganZhiInfo.Zhi = this.diZhiTB[ganZhiInfo.ZhiNo - 1];
        ganZhiInfo.GanZhiNo = ((jdTemp + 49) % 60 + 60) % 60 + 1;
        ganZhiInfo.GanZhi = ganZhiInfo.Gan + ganZhiInfo.Zhi;
        ganZhiInfo.DGanZhiName = ganZhiInfo.Gan + ganZhiInfo.Zhi + '日';
        return ganZhiInfo;
    }
    getYearGanZhi(year) {
        let y = Number(year);
        let ganZhiInfo = new Object();
        ganZhiInfo.Year = y;
        ganZhiInfo.YName = '公元' + y + '年';
        ganZhiInfo.LCYear = y + 2698;
        ganZhiInfo.LCYName1 = '黄帝' + (y + 2698) + '年';
        ganZhiInfo.GanNo = ((y - 4) % 10 + 10) % 10 + 1;
        ganZhiInfo.Gan = this.tianGanTB[ganZhiInfo.GanNo - 1];
        ganZhiInfo.ZhiNo = ((y - 4) % 12 + 12) % 12 + 1;
        ganZhiInfo.Zhi = this.diZhiTB[ganZhiInfo.ZhiNo - 1];
        ganZhiInfo.GanZhiNo = ((y - 4) % 60 + 60) % 60 + 1;
        ganZhiInfo.GanZhi = ganZhiInfo.Gan + ganZhiInfo.Zhi;
        ganZhiInfo.YGanZhiName = ganZhiInfo.Gan + ganZhiInfo.Zhi + '年';
        ganZhiInfo.LCYName2 = '黄帝' + (y + 2698) + ganZhiInfo.YGanZhiName;
        return ganZhiInfo;
    }
    getMonthNoGanZhi(yearGanZhiNo, lMonthNo = 1) {
        let ganZhiInfo = new Object();
        let MganZhiNo = ((yearGanZhiNo - 1) * 12 + lMonthNo + 1) % 60;
        ganZhiInfo.YGanZhiNo = yearGanZhiNo;
        ganZhiInfo.MGanZhiNo = MganZhiNo + 1;
        ganZhiInfo.GanNo = (MganZhiNo) % 10 + 1;
        ganZhiInfo.Gan = this.tianGanTB[ganZhiInfo.GanNo - 1];
        ganZhiInfo.ZhiNo = (MganZhiNo) % 12 + 1;
        ganZhiInfo.Zhi = this.diZhiTB[ganZhiInfo.ZhiNo - 1];
        ganZhiInfo.GanZhi = ganZhiInfo.Gan + ganZhiInfo.Zhi;
        ganZhiInfo.MGanZhiName = ganZhiInfo.Gan + ganZhiInfo.Zhi + '月';
        return ganZhiInfo;
    }
    getYMD2MGanZhi(year, month = 3, day = 1) {
        let ganZhiInfo = new Object();
        let MganZhiNo = 1;
        let yGanZhiNo = ((year - 4) % 10 + 10) % 10 + 1;
        ganZhiInfo = this.getMonthNoGanZhi(yGanZhiNo, MganZhiNo);
        return ganZhiInfo;
    }
    CorrectDateValue(year, month, day, calendar, isLeapMonth = 0, firstMonth = 3) {
        let y = year, m = month, d = LCDay, lMonthNo;
        let date = new Object();
        let lengthMonth = 0;
        let calendarName = '';
        if (calendar == 1) {
            calendarName = '格里历';
        }
        else if (calendar == 2) {
            calendarName = '儒略历';
        }
        else if (calendar == 3) {
            calendarName = '中华农历';
        }
        if (month < 1) {
            m = 1;
            window.alert('CorrectDateValue()：' + calendarName + month + '月，小于1月，不正确，将被设为1月。');
        }
        else if ((calendar < 3) && (month > 12)) {
            m = 12;
            window.alert('CorrectDateValue()：' + calendarName + month + '月，大于12月，不正确，将被设为12月。');
        }
        if (day < 1) {
            d = 1 + (day % 1);
            window.alert('CorrectDateValue()：' + calendarName + day + '日，小于1日，不正确，将被设为1日。');
        }
        if (calendar < 3) {
            lengthMonth = this.getCE_MonthLenth(y, m, calendar);
            d = (day % 1) + lengthMonth;
            window.alert('CorrectDateValue()格里历' + year + '年' + month + '月，最多有：' + lengthMonth + '日。(' + GCDay + '截取后的日数为：' + day + ')');
        }
        else if (calendar == 3) {
            gQiShuoBase.calcY(int2((LCYear - 2000) * 365.2422 + 180));
            month = LCMonth + firstMonth - 1;
            lMonthNo = gQiShuoBase.LunarLeapMonth;
            if (month == lMonthNo) {
                if (leapMonthFlag == 1)
                    month += 1;
            }
            else if (leapMonthFlag == 1) {
                window.alert('农历' + LCYear + '年' + LCMonth + '月，无闰月；本年闰月数：' + (lMonthNum));
            }
        }
        return date;
    }
}
;
var JD = new _Calendar_JD_(0, 2000, 1, 1, 13, 31, 29, 0);
