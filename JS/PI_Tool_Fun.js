"use strict";
function PI_GJ2_pi1(fs) {
    var st = '正弦迭代T=2-√(4-T)', ct = '余弦迭代T=2+√T';
    var i, a, T, p, s = '刘徽割圆,';
    if (fs == 0)
        a = 6, T = 1, s += '6边 T=1 p=3　 ' + ct;
    if (fs == 1)
        a = 4, T = 0, s += '4边 T=0 p=2√2' + ct;
    if (fs == 2)
        a = 6, T = 1, s += '6边 T=1 p=3　 ' + st;
    if (fs == 3)
        a = 4, T = 2, s += '4边 T=2 p=2√2' + st;
    if (fs == 4)
        a = 6, T = 1, s += '6边 T=1 补弧田p=(1+T/24)*3　 ' + st;
    if (fs == 5)
        a = 4, T = 2, s += '6边 T=1 补弧田p=(1+T/24)*2√2' + st;
    s += '<table><tr><td>割圆次数</td><td>边数</td><td>T</td><td>PI</td></tr>';
    for (i = 0; i < 30; i++) {
        a *= 2;
        if (fs == 0 || fs == 1)
            T = 2 + sqrt(T), p = a * sqrt(2 - sqrt(T)) / 2;
        if (fs == 2 || fs == 3)
            T /= 2 + sqrt(4 - T), p = a * sqrt(T) / 2;
        if (fs == 4 || fs == 5)
            T /= 2 + sqrt(4 - T), p = a * sqrt(T) * (1 + T / 24) / 2;
        s += '<tr><td>' + (i + 1) + '</td><td>' + a + '</td><td>' + T + '</td><td>' + p + '</td></tr>';
    }
    s += '</table>';
    PI_Cal_out1.innerHTML = s;
}
function PI_GJ2_jie(x, B) {
    var m = Math.pow(10, floor(Math.log(x / B) / 2.3));
    if (m < 1)
        m = 1;
    return floor(x / m + 0.5) * m;
}
function PI_GJ2_pi2() {
    var i, R = PI_GJ2_r.value - 0, a = 6, p, T = 1 * R * R;
    var s = '　从6边开始 T=R*R，正弦迭代T=2-√(4-T),弦长、差幂计算保留3位有效字就已足够用，计算PI=a*√(T/4)则采用全精度。<br>'
        + '　如果祖冲之算出下表中的差幂ΔS=aR(H/4R)<sup>3</sup>，那么实际每行只需计算T，不必算PI就可得到差幂。如果祖冲之算出更精确的差幂是4ΔS/3，那么他只需割圆5次(192边)就得到3.1415926。<br>'
        + '<table><tr align=center><td>割圆次数<br>i</td><td>边数<br>a</td><td>迭代变量<br>T</td><td>弦长<br>H=sqrt(T)</td><td>差幂<br>ΔS</td><td>精差幂<br>ΔJ</td><td>圆周率<br>PI(毫)</td></tr>';
    for (i = 0; i < 25; i++) {
        a *= 2;
        T /= 2 + sqrt(4 * R * R - T) / R, T = PI_GJ2_jie(T, R);
        if (T < R)
            break;
        var H = PI_GJ2_jie(sqrt(T), 100);
        var dS = PI_GJ2_jie(H * H * H / 64 * a / R / R, 100);
        var dJ = PI_GJ2_jie(dS * 4 / 3, 100);
        p = a * sqrt(T) / 2, p = floor(p + 0.5);
        s += '<tr align=right><td>' + (i + 1) + '</td><td>' + a + '</td><td>' + T + '</td><td>' + H + '</td><td>' + dS + '</td><td>' + dJ + '</td><td>' + p + '</td></tr>';
    }
    s += '</table>';
    PI_Cal_out1.innerHTML = s;
}
function PI_GJ2_pi() {
    var N = PI_GJ2_N.value - 0 + 1, a = new Array();
    var i = Math.round(3.4 * N), b = 2 * i + 1, j, f;
    for (j = 0; j < N; j++)
        a[j] = 0;
    for (; i > 0; i--, b -= 2, a[0] += 2)
        for (j = 0, f = 0; j < N; j++) {
            f = a[j] * i + f * 10;
            a[j] = Math.floor(f / b);
            f %= b;
        }
    for (i = N - 1; i > 0; i--)
        a[i - 1] += Math.floor(a[i] / 10), a[i] %= 10;
    a[0] = '<br>';
    for (i = 1; i < N; i++) {
        if (i % 10 == 0)
            a[i] += ' ';
        if (i % 100 == 0)
            a[i] += '<br>';
    }
    PI_Cal_out1.innerHTML =
        '本算法为低速算法，计算位数不宜过大，否则计算时间太长。<br>'
            + '以下计算圆周率,计算公式：PI/2=1+1/3+1*2/(1*3*5)+1*2*3/(1*3*5*7)+...<br>'
            + '通过提取公因子得连分式形式：PI=2+1/3(2+2/5(2+3/7(2+...,这样只需迭代计算a=2+a*n/(2n+1),n=N,…3,,2,1即可得到a=PI<br>'
            + '最后5位可能有错：			<font color=#FF0000>PI=3.' + a.join('') + '</font>';
}
var PI_GJ2_machin = {
    add: function (a, b, n) {
        for (var i = n - 1, f = 0; i >= 0; i--) {
            a[i] += b[i] + f;
            if (a[i] >= 10000000000)
                a[i] -= 10000000000, f = 1;
            else
                f = 0;
        }
    },
    sub0: function (a, b, r, n) {
        for (var i = n - 1, f = 0; i >= 0; i--) {
            r[i] = a[i] - b[i] - f;
            if (r[i] < 0)
                r[i] += 10000000000, f = 1;
            else
                f = 0;
        }
    },
    div: function (a, b, n) {
        for (var i = 0, f = 0, c; i < n; i++) {
            c = a[i] + f * 10000000000;
            a[i] = Math.floor((c + 0.1) / b);
            f = c % b;
        }
    },
    dao: function (a, f, b, n) {
        a[0] = Math.floor(f / b);
        f = f % b;
        for (var i = 1, c; i < n; i++) {
            c = f * 10000000000;
            a[i] = Math.floor((c + 0.1) / b);
            f = c % b;
        }
    },
    set: function (a, v, n) { for (var i = 0; i < n; i++)
        a[i] = 0; a[0] = v; a.length = n; },
    a: new Array(), b: new Array(), c: new Array(),
    arctg: function (k, v, zf, N) {
        var i = Math.round(N * 23.1 / Math.log(k * k)), n = i, n2;
        var a = this.a, b = this.b, c = this.c;
        for (; i >= 0; i--) {
            n2 = Math.round((n - i) * N / n) + 1;
            if (n2 > N)
                n2 = N;
            this.dao(c, v, 2 * i + 1, n2);
            this.div(b, k * k, n2);
            this.sub0(c, b, b, n2);
        }
        this.div(b, k, N);
        if (zf > 0)
            this.add(a, b, N);
        else
            this.sub0(a, b, a, N);
    },
    pi: function () {
        var N = PI_GJ2_N.value - 0;
        N = floor(N / 10 + 1.5);
        var a = this.a, b = this.b;
        this.set(a, 0, N);
        this.set(b, 0, N);
        this.arctg(5, 16, 1, N);
        this.arctg(239, 4, -1, N);
        a[0] = '<br>';
        for (var i = 1; i < N; i++) {
            a[i] = String(10000000000 + a[i]).slice(1, 1 + 10);
            if (i % 10 == 0)
                a[i] += '<br>';
            else
                a[i] += ' ';
        }
        PI_Cal_out1.innerHTML = '基于Machin公式，并做百亿进制优化，速度较快。<br>'
            + '计算公式：Machin PI=16arctg(1/5)-4arctg(1/239)<br>'
            + '最后5位可能有错：		<font color=#FF0000>PI=3.' + a.join('') + '</font>';
    }
};
function PI_GJ2_cls() {
    PI_Cal_out1.innerHTML = '';
}
