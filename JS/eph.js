"use strict";
var SunMoonRiseFallObject = {
    L: 0,
    fa: 0,
    dt: 0,
    E: 0.409092614,
    getH: function (h, w) {
        var c = (Math.sin(h) - Math.sin(this.fa) * Math.sin(w)) / Math.cos(this.fa) / Math.cos(w);
        if (Math.abs(c) > 1)
            return Math.PI;
        return Math.acos(c);
    },
    Mcoord: function (jd, H0, r) {
        var z = m_coord((jd + this.dt) / 36525, 40, 30, 8);
        z = llrConv(z, this.E);
        r.H = rad2rrad(pGST(jd, this.dt) + this.L - z[0]);
        if (H0)
            r.H0 = this.getH(0.7275 * cs_rEar / z[2] - 34 * 60 / rad, z[1]);
    },
    Mt: function (jd) {
        this.dt = dt_T(jd);
        this.E = hcjj(jd / 36525);
        jd -= mod2(0.1726222 + 0.966136808032357 * jd - 0.0366 * this.dt + this.L / pi2, 1);
        var r = new Array();
        var sv = pi2 * 0.966;
        r.z = r.x = r.s = r.j = r.c = r.h = jd;
        this.Mcoord(jd, 1, r);
        r.s += (-r.H0 - r.H) / sv;
        r.j += (r.H0 - r.H) / sv;
        r.z += (0 - r.H) / sv;
        r.x += (Math.PI - r.H) / sv;
        this.Mcoord(r.s, 1, r);
        r.s += rad2rrad(-r.H0 - r.H) / sv;
        this.Mcoord(r.j, 1, r);
        r.j += rad2rrad(+r.H0 - r.H) / sv;
        this.Mcoord(r.z, 0, r);
        r.z += rad2rrad(0 - r.H) / sv;
        this.Mcoord(r.x, 0, r);
        r.x += rad2rrad(Math.PI - r.H) / sv;
        return r;
    },
    Scoord: function (jd, xm, r) {
        var z = new Array(Sun_Moon_Ephemeris.E_Lon((jd + this.dt) / 36525, 5) + Math.PI - 20.5 / rad, 0, 1);
        z = llrConv(z, this.E);
        r.H = rad2rrad(pGST(jd, this.dt) + this.L - z[0]);
        if (xm == 10 || xm == 1)
            r.H1 = this.getH(-50 * 60 / rad, z[1]);
        if (xm == 10 || xm == 2)
            r.H2 = this.getH(-6 * 3600 / rad, z[1]);
        if (xm == 10 || xm == 3)
            r.H3 = this.getH(-12 * 3600 / rad, z[1]);
        if (xm == 10 || xm == 4)
            r.H4 = this.getH(-18 * 3600 / rad, z[1]);
    },
    St: function (jd) {
        this.dt = dt_T(jd);
        this.E = hcjj(jd / 36525);
        jd -= mod2(jd + this.L / pi2, 1);
        var r = new Array(), sv = pi2;
        r.z = r.x = r.s = r.j = r.c = r.h = r.c2 = r.h2 = r.c3 = r.h3 = jd;
        r.sm = '';
        this.Scoord(jd, 10, r);
        r.s += (-r.H1 - r.H) / sv;
        r.j += (r.H1 - r.H) / sv;
        r.c += (-r.H2 - r.H) / sv;
        r.h += (r.H2 - r.H) / sv;
        r.c2 += (-r.H3 - r.H) / sv;
        r.h2 += (r.H3 - r.H) / sv;
        r.c3 += (-r.H4 - r.H) / sv;
        r.h3 += (r.H4 - r.H) / sv;
        r.z += (0 - r.H) / sv;
        r.x += (Math.PI - r.H) / sv;
        this.Scoord(r.s, 1, r);
        r.s += rad2rrad(-r.H1 - r.H) / sv;
        if (r.H1 == Math.PI)
            r.sm += '无升起.';
        this.Scoord(r.j, 1, r);
        r.j += rad2rrad(+r.H1 - r.H) / sv;
        if (r.H1 == Math.PI)
            r.sm += '无降落.';
        this.Scoord(r.c, 2, r);
        r.c += rad2rrad(-r.H2 - r.H) / sv;
        if (r.H2 == Math.PI)
            r.sm += '无民用晨.';
        this.Scoord(r.h, 2, r);
        r.h += rad2rrad(+r.H2 - r.H) / sv;
        if (r.H2 == Math.PI)
            r.sm += '无民用昏.';
        this.Scoord(r.c2, 3, r);
        r.c2 += rad2rrad(-r.H3 - r.H) / sv;
        if (r.H3 == Math.PI)
            r.sm += '无航海晨.';
        this.Scoord(r.h2, 3, r);
        r.h2 += rad2rrad(+r.H3 - r.H) / sv;
        if (r.H3 == Math.PI)
            r.sm += '无航海昏.';
        this.Scoord(r.c3, 4, r);
        r.c3 += rad2rrad(-r.H4 - r.H) / sv;
        if (r.H4 == Math.PI)
            r.sm += '无天文晨.';
        this.Scoord(r.h3, 4, r);
        r.h3 += rad2rrad(+r.H4 - r.H) / sv;
        if (r.H4 == Math.PI)
            r.sm += '无天文昏.';
        this.Scoord(r.z, 0, r);
        r.z += (0 - r.H) / sv;
        this.Scoord(r.x, 0, r);
        r.x += rad2rrad(Math.PI - r.H) / sv;
        return r;
    },
    rts: new Array(),
    calcRTS: function (jd, n, Jdl, Wdl, sq) {
        let i, c, r;
        if (!this.rts.length) {
            for (i = 0; i < 31; i++)
                this.rts[i] = new Array();
        }
        this.L = Jdl, this.fa = Wdl, sq /= 24;
        for (i = 0; i < n; i++) {
            r = this.rts[i];
            r.Ms = r.Mz = r.Mj = "--:--:--";
        }
        for (i = -1; i <= n; i++) {
            if (i >= 0 && i < n) {
                r = SunMoonRiseFallObject.St(jd + i + sq);
                this.rts[i].s = JD.JD2TimeStr(r.s - sq);
                this.rts[i].z = JD.JD2TimeStr(r.z - sq);
                this.rts[i].j = JD.JD2TimeStr(r.j - sq);
                this.rts[i].c = JD.JD2TimeStr(r.c - sq);
                this.rts[i].h = JD.JD2TimeStr(r.h - sq);
                this.rts[i].ch = JD.JD2TimeStr(r.h - r.c - 0.5);
                this.rts[i].sj = JD.JD2TimeStr(r.j - r.s - 0.5);
            }
            r = SunMoonRiseFallObject.Mt(jd + i + sq);
            c = int2(r.s - sq + 0.5) - jd;
            if (c >= 0 && c < n)
                this.rts[c].Ms = JD.JD2TimeStr(r.s - sq);
            c = int2(r.z - sq + 0.5) - jd;
            if (c >= 0 && c < n)
                this.rts[c].Mz = JD.JD2TimeStr(r.z - sq);
            c = int2(r.j - sq + 0.5) - jd;
            if (c >= 0 && c < n)
                this.rts[c].Mj = JD.JD2TimeStr(r.j - sq);
        }
        this.rts.dn = n;
    }
};
function xingJJ(xt, t, jing) {
    var a, z, ga, gz;
    a = p_coord(0, t, 10, 10, 10);
    z = p_coord(xt, t, 10, 10, 10);
    z = h2g(z, a);
    if (jing == 0)
        ;
    if (jing == 1) {
        a = p_coord(0, t, 60, 60, 60);
        z = p_coord(xt, t, 60, 60, 60);
        z = h2g(z, a);
    }
    if (jing >= 2) {
        a = p_coord(0, t - a[2] * cs_Agx, -1, -1, -1);
        z = p_coord(xt, t - z[2] * cs_Agx, -1, -1, -1);
        z = h2g(z, a);
    }
    a[0] += Math.PI, a[1] = -a[1];
    return j1_j2(z[0], z[1], a[0], a[1]);
}
function daJu(xt, t, dx) {
    var a, b, c;
    if (xt == 1) {
        a = 115.8774777586 / 36525;
        c = new Array(2, 0.2, 0.01, 46, 87);
    }
    if (xt == 2) {
        a = 583.9213708245 / 36525;
        c = new Array(4, 0.2, 0.01, 382, 521);
    }
    if (dx)
        b = c[3] / 36525;
    else
        b = c[4] / 36525;
    t = b + a * int2((t - b) / a + 0.5);
    var i, dt, r1, r2, r3;
    for (i = 0; i < 3; i++) {
        dt = c[i] / 36525;
        r1 = xingJJ(xt, t - dt, i);
        r2 = xingJJ(xt, t, i);
        r3 = xingJJ(xt, t + dt, i);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2;
    }
    r2 += (r1 - r3) / (r1 + r3 - 2 * r2) * (r3 - r1) / 8;
    var re = new Array(t, r2);
    return re;
}
function xingLiu0(xt, t, n, gxs) {
    var a, z, E = hcjj(t), zd;
    a = p_coord(0, t - gxs, n, n, n);
    z = p_coord(xt, t - gxs, n, n, n);
    z = h2g(z, a);
    if (gxs) {
        zd = nutation2(t);
        z[0] += zd[0];
        E += zd[1];
    }
    z = llrConv(z, E);
    return z;
}
function xingLiu(xt, t, sn) {
    var i, y1, y2, y3, n, g;
    var hh = cs_xxHH[xt - 1] / 36525;
    var v = pi2 / hh;
    if (xt > 2)
        v = -v;
    for (i = 0; i < 6; i++)
        t -= rad2rrad(XL0_calc(xt, 0, t, 8) - XL0_calc(0, 0, t, 8)) / v;
    var tt = new Array(5 / 36525, 1 / 36525, 0.5 / 36525, 2e-6, 2e-6), dt;
    var tc = new Array(17.4, 28, 52, 82, 86, 88, 89, 90);
    tc = tc[xt - 1] / 36525;
    if (sn) {
        if (xt > 2)
            t -= tc;
        else
            t += tc;
    }
    else {
        if (xt > 2)
            t += tc;
        else
            t -= tc;
    }
    for (i = 0; i < 4; i++) {
        dt = tt[i], n = 8, g = 0;
        if (i >= 3) {
            g = y2[2] * cs_Agx;
            n = -1;
        }
        y1 = xingLiu0(xt, t - dt, n, g);
        y2 = xingLiu0(xt, t, n, g);
        y3 = xingLiu0(xt, t + dt, n, g);
        t += (y1[0] - y3[0]) / (y1[0] + y3[0] - 2 * y2[0]) * dt / 2;
    }
    return t;
}
function xingMP(xt, t, n, E, g) {
    var a, p, m;
    a = p_coord(0, t - g[1], n, n, n);
    p = p_coord(xt, t - g[1], n, n, n);
    m = m_coord(t - g[0], n, n, n);
    p = h2g(p, a);
    m[0] += g[2];
    p[0] += g[2];
    m = llrConv(m, E + g[3]);
    p = llrConv(p, E + g[3]);
    var re = new Array(rad2rrad(m[0] - p[0]), m[1] - p[1], m[2] / cs_GS / 86400 / 36525, p[2] / cs_GS / 86400 / 36525 * cs_AU);
    return re;
}
function xingHY(xt, t) {
    var i, d, d2, v, E, g = new Array(0, 0, 0, 0);
    for (i = 0; i < 3; i++) {
        d = xingMP(xt, t, 8, 0.4091, g);
        t -= d[0] / 8192;
    }
    E = hcjj(t);
    var zd = nutation2(t);
    g = new Array(d[2], d[3], zd[0], zd[1]);
    d = xingMP(xt, t, 8, E, g);
    d2 = xingMP(xt, t + 1e-6, 8, E, g);
    v = (d2[0] - d[0]) / 1e-6;
    d = xingMP(xt, t, 30, E, g);
    t -= d[0] / v;
    d = xingMP(xt, t, -1, E, g);
    t -= d[0] / v;
    var re = new Array(t, d[1]);
    return re;
}
function xingSP(xt, t, n, w0, ts, tp) {
    var a, p, s;
    a = p_coord(0, t - tp, n, n, n);
    p = p_coord(xt, t - tp, n, n, n);
    s = p_coord(0, t - ts, n, n, n);
    s[0] += Math.PI;
    s[1] = -s[1];
    p = h2g(p, a);
    var re = new Array(rad2rrad(p[0] - s[0] - w0), p[1] - s[1], s[2] * cs_Agx, p[2] * cs_Agx);
    return re;
}
function xingHR(xt, t, f) {
    var i, a, b, v, dt = 2e-5;
    var w0 = Math.PI, w1 = 0;
    if (f) {
        w0 = 0;
        if (xt > 2)
            w1 = Math.PI;
    }
    v = pi2 / cs_xxHH[xt - 1] * 36525;
    if (xt > 2)
        v = -v;
    for (i = 0; i < 6; i++)
        t -= rad2rrad(XL0_calc(xt, 0, t, 8) - XL0_calc(0, 0, t, 8) - w0) / v;
    a = xingSP(xt, t, 8, w1, 0, 0);
    b = xingSP(xt, t + dt, 8, w1, 0, 0);
    v = (b[0] - a[0]) / dt;
    a = xingSP(xt, t, 40, w1, a[2], a[3]);
    t -= a[0] / v;
    a = xingSP(xt, t, -1, w1, a[2], a[3]);
    t -= a[0] / v;
    var re = new Array(t, a[1]);
    return re;
}
function xingX(xt, jd, L, fa) {
    var T = jd / 36525;
    var zd = nutation2(T);
    var dL = zd[0], dE = zd[1];
    var E = hcjj(T) + dE;
    var gstPing = pGST2(jd);
    var gst = gstPing + dL * Math.cos(E);
    var z, a, z2, a2, s = '';
    var ra, rb, rc, rfn = 8;
    if (xt == 10) {
        rfn = 2;
        a = e_coord(T, 15, 15, 15);
        z = m_coord(T, 1, 1, -1);
        ra = z[2];
        T -= ra * cs_Agx / cs_AU;
        a2 = e_coord(T, 15, 15, 15);
        z = m_coord(T, -1, -1, -1);
        rc = z[2];
        a2 = h2g(a, a2);
        a2[2] *= cs_AU;
        z2 = h2g(z, a2);
        rb = z2[2];
        z[0] = rad2mrad(z[0] + dL);
        s += '视黄经 ' + rad2str(z[0], 0) + ' 视黄纬 ' + rad2str(z[1], 0) + ' 地心距 ' + ra.toFixed(rfn) + '\r\n';
        z = llrConv(z, E);
        s += '视赤经 ' + rad2str(z[0], 1) + ' 视赤纬 ' + rad2str(z[1], 0) + ' 光行距 ' + rb.toFixed(rfn) + '\r\n';
    }
    if (xt < 10) {
        a = p_coord(0, T, -1, -1, -1);
        z = p_coord(xt, T, -1, -1, -1);
        z[0] = rad2mrad(z[0]);
        s += '黄经一 ' + rad2str(z[0], 0) + ' 黄纬一 ' + rad2str(z[1], 0) + ' 向径一 ' + z[2].toFixed(rfn) + '\r\n';
        z = h2g(z, a);
        ra = z[2];
        T -= ra * cs_Agx;
        a2 = p_coord(0, T, -1, -1, -1);
        z2 = p_coord(xt, T, -1, -1, -1);
        z = h2g(z2, a);
        rb = z[2];
        z = h2g(z2, a2);
        rc = z[2];
        z[0] = rad2mrad(z[0] + dL);
        s += '视黄经 ' + rad2str(z[0], 0) + ' 视黄纬 ' + rad2str(z[1], 0) + ' 地心距 ' + ra.toFixed(rfn) + '\r\n';
        z = llrConv(z, E);
        s += '视赤经 ' + rad2str(z[0], 1) + ' 视赤纬 ' + rad2str(z[1], 0) + ' 光行距 ' + rb.toFixed(rfn) + '\r\n';
    }
    var sj = rad2rrad(gst + L - z[0]);
    parallax(z, sj, fa, 0);
    s += '站赤经 ' + rad2str(z[0], 1) + ' 站赤纬 ' + rad2str(z[1], 0) + ' 视距离 ' + rc.toFixed(rfn) + '\r\n';
    z[0] += Math.PI / 2 - gst - L;
    z = llrConv(z, Math.PI / 2 - fa);
    z[0] = rad2mrad(Math.PI / 2 - z[0]);
    if (z[1] > 0)
        z[1] += MQC(z[1]);
    s += '方位角 ' + rad2str(z[0], 0) + ' 高度角 ' + rad2str(z[1], 0) + '\r\n';
    s += '恒星时 ' + rad2str(rad2mrad(gstPing), 1) + '(平) ' + rad2str(rad2mrad(gst), 1) + '(真)\r\n';
    return s;
}
function lineEll(x1, y1, z1, x2, y2, z2, e, r) {
    var dx = x2 - x1, dy = y2 - y1, dz = z2 - z1, e2 = e * e, A, B, C, D, R, t, p = new Object();
    A = dx * dx + dy * dy + dz * dz / e2;
    B = x1 * dx + y1 * dy + z1 * dz / e2;
    C = x1 * x1 + y1 * y1 + z1 * z1 / e2 - r * r;
    p.D = B * B - A * C;
    if (p.D < 0)
        return p;
    D = sqrt(p.D);
    if (B < 0)
        D = -D;
    t = (-B + D) / A;
    p.x = x1 + dx * t, p.y = y1 + dy * t, p.z = z1 + dz * t;
    R = sqrt(dx * dx + dy * dy + dz * dz);
    p.R1 = R * abs(t), p.R2 = R * abs(t - 1);
    return p;
}
function lineEar2(x1, y1, z1, x2, y2, z2, e, r, I) {
    var P = cos(I[1]), Q = sin(I[1]);
    var X1 = x1, Y1 = P * y1 - Q * z1, Z1 = Q * y1 + P * z1;
    var X2 = x2, Y2 = P * y2 - Q * z2, Z2 = Q * y2 + P * z2;
    var p = lineEll(X1, Y1, Z1, X2, Y2, Z2, e, r);
    p.J = p.W = 100;
    if (p.D < 0)
        return p;
    p.J = rad2rrad(atan2(p.y, p.x) + I[0] - I[2]);
    p.W = atan(p.z / e / e / sqrt(p.x * p.x + p.y * p.y));
    return p;
}
function lineEar(P, Q, gst) {
    var p = llr2xyz(P), q = llr2xyz(Q);
    var r = lineEll(p[0], p[1], p[2], q[0], q[1], q[2], cs_ba, cs_rEar);
    if (r.D < 0) {
        r.J = r.W = 100;
        return r;
    }
    r.W = atan(r.z / cs_ba2 / sqrt(r.x * r.x + r.y * r.y));
    r.J = rad2rrad(atan2(r.y, r.x) - gst);
    return r;
}
function cirOvl(R, ba, R2, x0, y0) {
    var re = new Object();
    var d = sqrt(x0 * x0 + y0 * y0);
    var sinB = y0 / d, cosB = x0 / d;
    var cosA = (R * R + d * d - R2 * R2) / (2 * d * R);
    if (abs(cosA) > 1) {
        re.n = 0;
        return re;
    }
    var sinA = Math.sqrt(1 - cosA * cosA);
    var k, g, ba2 = ba * ba, C, S;
    for (k = -1; k < 2; k += 2) {
        S = cosA * sinB + sinA * cosB * k;
        g = R - S * S * (1 / ba2 - 1) / 2;
        cosA = (g * g + d * d - R2 * R2) / (2 * d * g);
        if (Math.abs(cosA) > 1) {
            re.n = 0;
            return re;
        }
        sinA = Math.sqrt(1 - cosA * cosA);
        C = cosA * cosB - sinA * sinB * k;
        S = cosA * sinB + sinA * cosB * k;
        if (k == 1)
            re.A = [g * C, g * S];
        else
            re.B = [g * C, g * S];
    }
    re.n = 2;
    return re;
}
function lineOvl(x1, y1, dx, dy, r, ba) {
    var A, B, C, D, L, t1, t2, p = new Object();
    var f = ba * ba;
    A = dx * dx + dy * dy / f;
    B = x1 * dx + y1 * dy / f;
    C = x1 * x1 + y1 * y1 / f - r * r;
    D = B * B - A * C;
    if (D < 0) {
        p.n = 0;
        return p;
    }
    if (!D)
        p.n = 1;
    else
        p.n = 2;
    D = Math.sqrt(D);
    t1 = (-B + D) / A, t2 = (-B - D) / A;
    p.A = [x1 + dx * t1, y1 + dy * t1];
    p.B = [x1 + dx * t2, y1 + dy * t2];
    L = sqrt(dx * dx + dy * dy);
    p.R1 = L * Math.abs(t1);
    p.R2 = L * Math.abs(t2);
    return p;
}
var msc = {
    calc: function (T, L, fa, high) {
        this.T = T, this.L = L, this.fa = fa;
        this.dt = dt_T(T);
        this.jd = T - this.dt;
        T /= 36525;
        var zd = nutation2(T);
        this.dL = zd[0];
        this.dE = zd[1];
        this.E = hcjj(T) + this.dE;
        this.gst = pGST(this.jd, this.dt) + this.dL * Math.cos(this.E);
        var z = new Array();
        z = m_coord(T, -1, -1, -1);
        z[0] = rad2mrad(z[0] + gxc_moonLon(T) + this.dL);
        z[1] += gxc_moonLat(T);
        this.mHJ = z[0];
        this.mHW = z[1];
        this.mR = z[2];
        z = llrConv(z, this.E);
        this.mCJ = z[0];
        this.mCW = z[1];
        this.mShiJ = rad2mrad(this.gst + L - z[0]);
        if (this.mShiJ > Math.PI)
            this.mShiJ -= pi2;
        parallax(z, this.mShiJ, fa, high);
        this.mCJ2 = z[0], this.mCW2 = z[1], this.mR2 = z[2];
        z[0] += Math.PI / 2 - this.gst - L;
        z = llrConv(z, Math.PI / 2 - fa);
        z[0] = rad2mrad(Math.PI / 2 - z[0]);
        this.mDJ = z[0];
        this.mDW = z[1];
        if (z[1] > 0)
            z[1] += MQC(z[1]);
        this.mPJ = z[0];
        this.mPW = z[1];
        z = e_coord(T, -1, -1, -1);
        z[0] = rad2mrad(z[0] + Math.PI + gxc_sunLon(T) + this.dL);
        z[1] = -z[1] + gxc_sunLat(T);
        this.sHJ = z[0];
        this.sHW = z[1];
        this.sR = z[2];
        z = llrConv(z, this.E);
        this.sCJ = z[0];
        this.sCW = z[1];
        this.sShiJ = rad2mrad(this.gst + L - z[0]);
        if (this.sShiJ > Math.PI)
            this.sShiJ -= pi2;
        parallax(z, this.sShiJ, fa, high);
        this.sCJ2 = z[0], this.sCW2 = z[1], this.sR2 = z[2];
        z[0] += Math.PI / 2 - this.gst - L;
        z = llrConv(z, Math.PI / 2 - fa);
        z[0] = rad2mrad(Math.PI / 2 - z[0]);
        this.sDJ = z[0];
        this.sDW = z[1];
        if (z[1] > 0)
            z[1] += MQC(z[1]);
        this.sPJ = z[0];
        this.sPW = z[1];
        var t = T / 10, t2 = t * t, t3 = t2 * t, t4 = t3 * t, t5 = t4 * t;
        var Lon = (1753470142 + 6283319653318 * t + 529674 * t2 + 432 * t3 - 1124 * t4 - 9 * t5) / 1000000000 + Math.PI - 20.5 / rad;
        Lon = rad2mrad(Lon - (this.sCJ - this.dL * Math.cos(this.E)));
        if (Lon > Math.PI)
            Lon -= pi2;
        this.sc = Lon / pi2;
        this.pty = this.jd + L / pi2;
        this.zty = this.jd + L / pi2 + this.sc;
        this.mRad = cs_sMoon / this.mR2;
        this.sRad = 959.63 / this.sR2;
        this.e_mRad = cs_sMoon / this.mR;
        this.eShadow = (cs_rEarA / this.mR * rad - (959.63 - 8.794) / this.sR) * 51 / 50;
        this.eShadow2 = (cs_rEarA / this.mR * rad + (959.63 + 8.794) / this.sR) * 51 / 50;
        this.mIll = Sun_Moon_Ephemeris.moonIll(T);
        if (Math.abs(rad2rrad(this.mCJ - this.sCJ)) < 50 / 180 * Math.PI) {
            var pp = lineEar(new Array(this.mCJ, this.mCW, this.mR), new Array(this.sCJ, this.sCW, this.sR * cs_AU), this.gst);
            this.zx_J = pp.J;
            this.zx_W = pp.W;
        }
        else
            this.zx_J = this.zx_W = 100;
    },
    toHTML: function (fs) {
        var s = '<table width="100%" cellspacing=1 cellpadding=0 bgcolor="#FFC0C0">';
        s += '<tr><td bgcolor=white align=center>';
        s += '平太阳 ' + JD.JD2TimeStr(this.pty) + ' 真太阳 <font color=#FF0000>' + JD.JD2TimeStr(this.zty) + '</font><br>';
        s += '时差 ' + m2fm(this.sc * 86400, 2, 1) + " 月亮被照亮 " + (this.mIll * 100).toFixed(2) + '% ';
        s += '</td></tr>';
        s += '<tr><td bgcolor=white><center><pre style="margin-top: 0; margin-bottom: 0"><font color=blue><b>表一       月亮            太阳</b></font>\r\n';
        s += '视黄经 ' + rad2str(this.mHJ, 0) + '  ' + rad2str(this.sHJ, 0) + '\r\n';
        s += '视黄纬 ' + rad2str(this.mHW, 0) + '  ' + rad2str(this.sHW, 0) + '\r\n';
        s += '视赤经 ' + rad2str(this.mCJ, 1) + '  ' + rad2str(this.sCJ, 1) + '\r\n';
        s += '视赤纬 ' + rad2str(this.mCW, 0) + '  ' + rad2str(this.sCW, 0) + '\r\n';
        s += '距离     ' + (this.mR).toFixed(2) + '千米     ' + (this.sR).toFixed(8) + 'AU' + '\r\n';
        s += '</pre></center></td></tr>';
        s += '<tr><td bgcolor=white><center><pre style="margin-top: 0; margin-bottom: 0"><font color=blue><b>表二       月亮            太阳</b></font>\r\n';
        s += '方位角 ' + rad2str(this.mPJ, 0) + '  ' + rad2str(this.sPJ, 0) + '\r\n';
        s += '高度角 ' + rad2str(this.mPW, 0) + '  ' + rad2str(this.sPW, 0) + '\r\n';
        s += '时角   ' + rad2str(this.mShiJ, 0) + '  ' + rad2str(this.sShiJ, 0) + '\r\n';
        s += '视半径(观测点) ' + m2fm(this.mRad, 2, 0) + '     ' + m2fm(this.sRad, 2, 0) + '\r\n';
        s += '</pre></center></td></tr>';
        if (fs) {
            s += '<tr><td bgcolor=white align=center>';
            s += '力学时 ' + JD.JD2str(this.T + J2000).dateTimeStr;
            s += ' ΔT=' + (this.dt * 86400).toFixed(1) + '秒<br>';
            s += '黄经章 ' + (this.dL / pi2 * 360 * 3600).toFixed(2) + '" ';
            s += '交角章 ' + (this.dE / pi2 * 360 * 3600).toFixed(2) + '" ';
            s += 'ε=' + rad2str(this.E, 0);
            s += '</td></tr>';
        }
        s += '</table>';
        return s;
    }
};
var ysPL = {
    lineT: function (G, v, u, r, n) {
        var b = G.y * v - G.x * u, A = u * u + v * v, B = u * b, C = b * b - r * r * v * v, D = B * B - A * C;
        if (D < 0)
            return 0;
        D = Math.sqrt(D);
        if (!n)
            D = -D;
        return G.t + ((-B + D) / A - G.x) / v;
    },
    lecXY: function (jd, re) {
        var T = jd / 36525, zm = new Array(), zs = new Array();
        zs = e_coord(T, -1, -1, -1);
        zs[0] = rad2mrad(zs[0] + Math.PI + gxc_sunLon(T));
        zs[1] = -zs[1] + gxc_sunLat(T);
        zm = m_coord(T, -1, -1, -1);
        zm[0] = rad2mrad(zm[0] + gxc_moonLon(T));
        zm[1] += gxc_moonLat(T);
        re.e_mRad = cs_sMoon / zm[2];
        re.eShadow = (cs_rEarA / zm[2] * rad - (959.63 - 8.794) / zs[2]) * 51 / 50;
        re.eShadow2 = (cs_rEarA / zm[2] * rad + (959.63 + 8.794) / zs[2]) * 51 / 50;
        re.x = rad2rrad(zm[0] + Math.PI - zs[0]) * Math.cos((zm[1] - zs[1]) / 2);
        re.y = zm[1] + zs[1];
        re.mr = re.e_mRad / rad, re.er = re.eShadow / rad, re.Er = re.eShadow2 / rad;
        re.t = jd;
    },
    lecMax: function (jd) {
        this.lT = new Array();
        for (let i = 0; i < 7; i++)
            this.lT[i] = 0;
        this.sf = 0;
        this.LX = '';
        jd = Sun_Moon_Ephemeris.MS_aLon_t2(Math.floor((jd - 4) / 29.5306) * Math.PI * 2 + Math.PI) * 36525;
        var g = new Object(), G = new Object(), u, v;
        u = -18461 * Math.sin(0.057109 + 0.23089571958 * jd) * 0.23090 / rad;
        v = (Sun_Moon_Ephemeris.M_v(jd / 36525) - Sun_Moon_Ephemeris.E_v(jd / 36525)) / 36525;
        this.lecXY(jd, G);
        jd -= (G.y * u + G.x * v) / (u * u + v * v);
        var dt = 60 / 86400;
        this.lecXY(jd, G);
        this.lecXY(jd + dt, g);
        u = (g.y - G.y) / dt;
        v = (g.x - G.x) / dt;
        dt = -(G.y * u + G.x * v) / (u * u + v * v);
        jd += dt;
        var x = G.x + dt * v, y = G.y + dt * u, rmin = Math.sqrt(x * x + y * y);
        if (rmin <= G.mr + G.er) {
            this.lT[1] = jd;
            this.LX = '偏';
            this.sf = (G.mr + G.er - rmin) / G.mr / 2;
            this.lT[0] = this.lineT(G, v, u, G.mr + G.er, 0);
            this.lecXY(this.lT[0], g);
            this.lT[0] = this.lineT(g, v, u, g.mr + g.er, 0);
            this.lT[2] = this.lineT(G, v, u, G.mr + G.er, 1);
            this.lecXY(this.lT[2], g);
            this.lT[2] = this.lineT(g, v, u, g.mr + g.er, 1);
        }
        if (rmin <= G.mr + G.Er) {
            this.lT[3] = this.lineT(G, v, u, G.mr + G.Er, 0);
            this.lecXY(this.lT[3], g);
            this.lT[3] = this.lineT(g, v, u, g.mr + g.Er, 0);
            this.lT[4] = this.lineT(G, v, u, G.mr + G.Er, 1);
            this.lecXY(this.lT[4], g);
            this.lT[4] = this.lineT(g, v, u, g.mr + g.Er, 1);
        }
        if (rmin <= G.er - G.mr) {
            this.LX = '全';
            this.lT[5] = this.lineT(G, v, u, G.er - G.mr, 0);
            this.lecXY(this.lT[5], g);
            this.lT[5] = this.lineT(g, v, u, g.er - g.mr, 0);
            this.lT[6] = this.lineT(G, v, u, G.er - G.mr, 1);
            this.lecXY(this.lT[6], g);
            this.lT[6] = this.lineT(g, v, u, g.er - g.mr, 1);
        }
    }
};
function ecFast(jd) {
    var re = new Object();
    var t, t2, t3, t4;
    var L, mB, mR, sR, vL, vB, vR;
    var W = Math.floor((jd + 8) / 29.5306) * Math.PI * 2;
    t = (W + 1.08472) / 7771.37714500204;
    re.jd = re.jdSuo = t * 36525;
    t2 = t * t, t3 = t2 * t, t4 = t3 * t;
    L = (93.2720993 + 483202.0175273 * t - 0.0034029 * t2 - t3 / 3526000 + t4 / 863310000) / 180 * Math.PI;
    re.ac = 1, re.lx = 'N';
    if (Math.abs(Math.sin(L)) > 0.4)
        return re;
    t -= (-0.0000331 * t * t + 0.10976 * Math.cos(0.785 + 8328.6914 * t)) / 7771;
    t2 = t * t;
    L = -1.084719 + 7771.377145013 * t - 0.0000331 * t2 +
        (22640 * Math.cos(0.785 + 8328.6914 * t + 0.000152 * t2)
            + 4586 * Math.cos(0.19 + 7214.063 * t - 0.000218 * t2)
            + 2370 * Math.cos(2.54 + 15542.754 * t - 0.000070 * t2)
            + 769 * Math.cos(3.1 + 16657.383 * t)
            + 666 * Math.cos(1.5 + 628.302 * t)
            + 412 * Math.cos(4.8 + 16866.93 * t)
            + 212 * Math.cos(4.1 - 1114.63 * t)
            + 205 * Math.cos(0.2 + 6585.76 * t)
            + 192 * Math.cos(4.9 + 23871.45 * t)
            + 165 * Math.cos(2.6 + 14914.45 * t)
            + 147 * Math.cos(5.5 - 7700.39 * t)
            + 125 * Math.cos(0.5 + 7771.38 * t)
            + 109 * Math.cos(3.9 + 8956.99 * t)
            + 55 * Math.cos(5.6 - 1324.18 * t)
            + 45 * Math.cos(0.9 + 25195.62 * t)
            + 40 * Math.cos(3.8 - 8538.24 * t)
            + 38 * Math.cos(4.3 + 22756.82 * t)
            + 36 * Math.cos(5.5 + 24986.07 * t)
            - 6893 * Math.cos(4.669257 + 628.3076 * t)
            - 72 * Math.cos(4.6261 + 1256.62 * t)
            - 43 * Math.cos(2.67823 + 628.31 * t) * t
            + 21) / rad;
    t += (W - L) / (7771.38
        - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t2)
        - 179 * Math.sin(2.543 + 15542.7543 * t)
        - 160 * Math.sin(0.1874 + 7214.0629 * t));
    re.jd = re.jdSuo = jd = t * 36525;
    t2 = t * t / 10000, t3 = t2 * t / 10000;
    mB =
        18461 * Math.cos(0.0571 + 8433.46616 * t - 0.640 * t2 - 1 * t3)
            + 1010 * Math.cos(2.413 + 16762.1576 * t + 0.88 * t2 + 25 * t3)
            + 1000 * Math.cos(5.440 - 104.7747 * t + 2.16 * t2 + 26 * t3)
            + 624 * Math.cos(0.915 + 7109.2881 * t + 0 * t2 + 7 * t3)
            + 199 * Math.cos(1.82 + 15647.529 * t - 2.8 * t2 - 19 * t3)
            + 167 * Math.cos(4.84 - 1219.403 * t - 1.5 * t2 - 18 * t3)
            + 117 * Math.cos(4.17 + 23976.220 * t - 1.3 * t2 + 6 * t3)
            + 62 * Math.cos(4.8 + 25090.849 * t + 2 * t2 + 50 * t3)
            + 33 * Math.cos(3.3 + 15437.980 * t + 2 * t2 + 32 * t3)
            + 32 * Math.cos(1.5 + 8223.917 * t + 4 * t2 + 51 * t3)
            + 30 * Math.cos(1.0 + 6480.986 * t + 0 * t2 + 7 * t3)
            + 16 * Math.cos(2.5 - 9548.095 * t - 3 * t2 - 43 * t3)
            + 15 * Math.cos(0.2 + 32304.912 * t + 0 * t2 + 31 * t3)
            + 12 * Math.cos(4.0 + 7737.590 * t)
            + 9 * Math.cos(1.9 + 15019.227 * t)
            + 8 * Math.cos(5.4 + 8399.709 * t)
            + 8 * Math.cos(4.2 + 23347.918 * t)
            + 7 * Math.cos(4.9 - 1847.705 * t)
            + 7 * Math.cos(3.8 - 16133.856 * t)
            + 7 * Math.cos(2.7 + 14323.351 * t);
    mB /= rad;
    mR = 385001
        + 20905 * Math.cos(5.4971 + 8328.691425 * t + 1.52 * t2 + 25 * t3)
        + 3699 * Math.cos(4.900 + 7214.06287 * t - 2.18 * t2 - 19 * t3)
        + 2956 * Math.cos(0.972 + 15542.75429 * t - 0.66 * t2 + 6 * t3)
        + 570 * Math.cos(1.57 + 16657.3828 * t + 3.0 * t2 + 50 * t3)
        + 246 * Math.cos(5.69 - 1114.6286 * t - 3.7 * t2 - 44 * t3)
        + 205 * Math.cos(1.02 + 14914.4523 * t - 1 * t2 + 6 * t3)
        + 171 * Math.cos(3.33 + 23871.4457 * t + 1 * t2 + 31 * t3)
        + 152 * Math.cos(4.94 + 6585.761 * t - 2 * t2 - 19 * t3)
        + 130 * Math.cos(0.74 - 7700.389 * t - 2 * t2 - 25 * t3)
        + 109 * Math.cos(5.20 + 7771.377 * t)
        + 105 * Math.cos(2.31 + 8956.993 * t + 1 * t2 + 25 * t3)
        + 80 * Math.cos(5.38 - 8538.241 * t + 2.8 * t2 + 26 * t3)
        + 49 * Math.cos(6.24 + 628.302 * t)
        + 35 * Math.cos(2.7 + 22756.817 * t - 3 * t2 - 13 * t3)
        + 31 * Math.cos(4.1 + 16171.056 * t - 1 * t2 + 6 * t3)
        + 24 * Math.cos(1.7 + 7842.365 * t - 2 * t2 - 19 * t3)
        + 23 * Math.cos(3.9 + 24986.074 * t + 5 * t2 + 75 * t3)
        + 22 * Math.cos(0.4 + 14428.126 * t - 4 * t2 - 38 * t3)
        + 17 * Math.cos(2.0 + 8399.679 * t);
    mR /= 6378.1366;
    t = jd / 365250, t2 = t * t, t3 = t2 * t;
    sR = 10001399
        + 167070 * Math.cos(3.098464 + 6283.07585 * t)
        + 1396 * Math.cos(3.0552 + 12566.1517 * t)
        + 10302 * Math.cos(1.10749 + 6283.07585 * t) * t
        + 172 * Math.cos(1.064 + 12566.152 * t) * t
        + 436 * Math.cos(5.785 + 6283.076 * t) * t2
        + 14 * Math.cos(4.27 + 6283.08 * t) * t3;
    sR *= 1.49597870691 / 6378.1366 * 10;
    t = jd / 36525;
    vL = 7771
        - 914 * Math.sin(0.785 + 8328.6914 * t)
        - 179 * Math.sin(2.543 + 15542.7543 * t)
        - 160 * Math.sin(0.187 + 7214.0629 * t);
    vB = -755 * Math.sin(0.057 + 8433.4662 * t)
        - 82 * Math.sin(2.413 + 16762.1576 * t);
    vR = -27299 * Math.sin(5.497 + 8328.691425 * t)
        - 4184 * Math.sin(4.900 + 7214.06287 * t)
        - 7204 * Math.sin(0.972 + 15542.75429 * t);
    vL /= 36525, vB /= 36525, vR /= 36525;
    var gm = mR * Math.sin(mB) * vL / Math.sqrt(vB * vB + vL * vL), smR = sR - mR;
    var mk = 0.2725076, sk = 109.1222;
    var f1 = (sk + mk) / smR, r1 = mk + f1 * mR;
    var f2 = (sk - mk) / smR, r2 = mk - f2 * mR;
    var b = 0.9972, Agm = Math.abs(gm), Ar2 = Math.abs(r2);
    var fh2 = mR - mk / f2, h = Agm < 1 ? Math.sqrt(1 - gm * gm) : 0;
    var ls1, ls2, ls3, ls4;
    if (fh2 < h)
        re.lx = 'T';
    else
        re.lx = 'A';
    ls1 = Agm - (b + r1);
    if (Math.abs(ls1) < 0.016)
        re.ac = 0;
    ls2 = Agm - (b + Ar2);
    if (Math.abs(ls2) < 0.016)
        re.ac = 0;
    ls3 = Agm - (b);
    if (Math.abs(ls3) < 0.016)
        re.ac = 0;
    ls4 = Agm - (b - Ar2);
    if (Math.abs(ls4) < 0.016)
        re.ac = 0;
    if (ls1 > 0)
        re.lx = 'N';
    else if (ls2 > 0)
        re.lx = 'P';
    else if (ls3 > 0)
        re.lx += '0';
    else if (ls4 > 0)
        re.lx += '1';
    else {
        if (Math.abs(fh2 - h) < 0.019)
            re.ac = 0;
        if (Math.abs(fh2) < h) {
            var dr = vR * h / vL / mR;
            var H1 = mR - dr - mk / f2;
            var H2 = mR + dr - mk / f2;
            if (H1 > 0)
                re.lx = 'H3';
            if (H2 > 0)
                re.lx = 'H2';
            if (H1 > 0 && H2 > 0)
                re.lx = 'H';
            if (Math.abs(H1) < 0.019)
                re.ac = 0;
            if (Math.abs(H2) < 0.019)
                re.ac = 0;
        }
    }
    return re;
}
var rsGS = {
    Zs: new Array(),
    Zdt: 0.04,
    Zjd: 0,
    dT: 0,
    tanf1: 0.0046,
    tanf2: 0.0045,
    srad: 0.0046,
    bba: 1,
    bhc: 0,
    dyj: 23500,
    init: function (jd, n) {
        if (getShuoMonthNo(jd) == getShuoMonthNo(this.Zjd) && this.Zs.length == n * 9)
            return;
        this.Zs.length = 0;
        this.Zjd = jd = Sun_Moon_Ephemeris.MS_aLon_t2(getShuoMonthNo(jd) * Math.PI * 2) * 36525;
        this.dT = dt_T(jd);
        var zd = nutation2(jd / 36525);
        var E = hcjj(jd / 36525) + zd[1];
        var i, k, T, S, M, B, a = this.Zs;
        for (i = 0; i < n; i++) {
            T = (this.Zjd + (i - n / 2 + 0.5) * this.Zdt) / 36525;
            if (n == 7)
                S = e_coord(T, -1, -1, -1), M = m_coord(T, -1, -1, -1);
            if (n == 3)
                S = e_coord(T, 65, 65, 65), M = m_coord(T, -1, 150, 150);
            if (n == 2)
                S = e_coord(T, 20, 20, 20), M = m_coord(T, 30, 30, 30);
            S[0] = S[0] + zd[0] + gxc_sunLon(T) + Math.PI;
            S[1] = -S[1] + gxc_sunLat(T);
            M[0] = M[0] + zd[0] + gxc_moonLon(T);
            M[1] = M[1] + gxc_moonLat(T);
            S = llrConv(S, E);
            M = llrConv(M, E);
            S[2] *= cs_AU;
            if (i && S[0] < a[0])
                S[0] += pi2;
            if (i && M[0] < a[3])
                M[0] += pi2;
            k = i * 9;
            a[k + 0] = S[0], a[k + 1] = S[1], a[k + 2] = S[2];
            a[k + 3] = M[0], a[k + 4] = M[1], a[k + 5] = M[2];
            S = llr2xyz(S), M = llr2xyz(M);
            B = xyz2llr(new Array(S[0] - M[0], S[1] - M[1], S[2] - M[2]));
            B[0] = Math.PI / 2 + B[0];
            B[1] = Math.PI / 2 - B[1];
            if (i && B[0] < a[6])
                B[0] += pi2;
            a[k + 6] = B[0], a[k + 7] = B[1], a[k + 8] = pGST(T * 36525 - this.dT, this.dT) + zd[0] * cos(E);
        }
        var p = a.length - 9;
        this.dyj = (a[2] + a[p + 2] - a[5] - a[p + 5]) / 2 / cs_rEar;
        this.tanf1 = (cs_k0 + cs_k) / this.dyj;
        this.tanf2 = (cs_k0 - cs_k2) / this.dyj;
        this.srad = cs_k0 / ((a[2] + a[p + 2]) / 2 / cs_rEar);
        this.bba = Math.sin((a[1] + a[p + 1]) / 2);
        this.bba = cs_ba * (1 + (1 - cs_ba2) * this.bba * this.bba / 2);
        this.bhc = -atan(tan(E) * sin((a[6] + a[p + 6]) / 2));
    },
    chazhi: function (jd, xt) {
        var p = xt * 3, m = 3;
        var i, N = this.Zs.length / 9, B = this.Zs, z = new Array();
        var w = B.length / N;
        var t = (jd - this.Zjd) / this.Zdt + N / 2 - 0.5;
        if (N == 2) {
            for (i = 0; i < m; i++, p++)
                z[i] = B[p] + (B[p + w] - B[p]) * t;
            return z;
        }
        var c = Math.floor(t + 0.5);
        if (c <= 0)
            c = 1;
        if (c > N - 2)
            c = N - 2;
        t -= c, p += c * w;
        for (i = 0; i < m; i++, p++)
            z[i] = B[p] + (B[p + w] - B[p - w] + (B[p + w] + B[p - w] - B[p] * 2) * t) * t / 2;
        return z;
    },
    sun: function (jd) { return this.chazhi(jd, 0); },
    moon: function (jd) { return this.chazhi(jd, 1); },
    bse: function (jd) { return this.chazhi(jd, 2); },
    cd2bse: function (z, I) {
        var r = new Array(z[0] - I[0], z[1], z[2]);
        r = llrConv(r, -I[1]);
        return llr2xyz(r);
    },
    bse2cd: function (z, I) {
        var r = xyz2llr(z);
        r = llrConv(r, I[1]);
        r[0] = rad2mrad(r[0] + I[0]);
        return r;
    },
    bse2db: function (z, I, f) {
        var r = xyz2llr(z);
        r = llrConv(r, I[1]);
        r[0] = rad2rrad(r[0] + I[0] - I[2]);
        if (f)
            r[1] = atan(tan(r[1]) / cs_ba2);
        return r;
    },
    bseXY2db: function (x, y, I, f) {
        var b = f ? cs_ba : 1;
        var F = lineEar2(x, y, 2, x, y, 0, b, 1, I);
        return [F.J, F.W];
    },
    bseM: function (jd) {
        var a = this.cd2bse(this.chazhi(jd, 1), this.chazhi(jd, 2));
        a[0] /= cs_rEar, a[1] /= cs_rEar, a[2] /= cs_rEar;
        return a;
    },
    Vxy: function (x, y, s, vx, vy) {
        var r = new Object();
        var h = 1 - x * x - y * y;
        if (h < 0)
            h = 0;
        else
            h = sqrt(h);
        r.vx = pi2 * (sin(s) * h - cos(s) * y);
        r.vy = pi2 * x * cos(s);
        r.Vx = vx - r.vx;
        r.Vy = vy - r.vy;
        r.V = sqrt(r.Vx * r.Vx + r.Vy * r.Vy);
        return r;
    },
    rSM: function (mR) {
        var re = new Object();
        re.r1 = cs_k + this.tanf1 * mR;
        re.r2 = cs_k2 - this.tanf2 * mR;
        re.ar2 = abs(re.r2);
        re.sf = cs_k2 / mR / cs_k0 * (this.dyj + mR);
        return re;
    },
    qrd: function (jd, dx, dy, fs) {
        var ba2 = this.bba * this.bba;
        var M = this.bseM(jd), x = M[0], y = M[1];
        var B = this.rSM(M[2]);
        var r = 0;
        if (fs == 1)
            r = B.r1;
        var d = 1 - (1 / ba2 - 1) * y * y / (x * x + y * y) / 2 + r;
        var t = (d * d - x * x - y * y) / (dx * x + dy * y) / 2;
        x += t * dx, y += t * dy, jd += t;
        var c = (1 - ba2) * r * x * y / d / d / d;
        x += c * y;
        y -= c * x;
        var re = this.bse2db([x / d, y / d, 0], this.bse(jd), 1);
        re[2] = jd;
        return re;
    },
    feature: function (jd) {
        jd = this.Zjd;
        var tg = 0.04, jd1 = jd - tg / 2, re = new Object(), ls;
        var tg = 0.04, re = new Object(), ls;
        var a = this.bseM(jd - tg);
        var b = this.bseM(jd);
        var c = this.bseM(jd + tg);
        var vx = (c[0] - a[0]) / tg / 2;
        var vy = (c[1] - a[1]) / tg / 2;
        var vz = (c[2] - a[2]) / tg / 2;
        var ax = (c[0] + a[0] - 2 * b[0]) / tg / tg;
        var ay = (c[1] + a[1] - 2 * b[1]) / tg / tg;
        var v = Math.sqrt(vx * vx + vy * vy), v2 = v * v;
        re.jdSuo = jd;
        re.dT = this.dT;
        re.ds = this.bhc;
        re.vx = vx;
        re.vy = vy;
        re.ax = ax;
        re.ay = ay;
        re.v = v;
        re.k = vy / vx;
        var t0 = -(b[0] * vx + b[1] * vy) / v2;
        re.jd = jd + t0;
        re.xc = b[0] + vx * t0;
        re.yc = b[1] + vy * t0;
        re.zc = b[2] + vz * t0 - 1.37 * t0 * t0;
        re.D = (vx * b[1] - vy * b[0]) / v;
        re.d = Math.abs(re.D);
        re.I = this.bse(re.jd);
        var F = lineEar2(re.xc, re.yc, 2, re.xc, re.yc, 0, cs_ba, 1, re.I);
        var Bc, Bp, B2, B3, dt, t2, t3, t4, t5, t6;
        Bc = Bp = B2 = B3 = this.rSM(re.zc);
        if (F.W != 100)
            Bp = this.rSM(re.zc - F.R2);
        if (re.d < 1) {
            dt = sqrt(1 - re.d * re.d) / v;
            t2 = t0 - dt, t3 = t0 + dt;
            B2 = this.rSM(t2 * vz + b[2] - 1.37 * t2 * t2);
            B3 = this.rSM(t3 * vz + b[2] - 1.37 * t3 * t3);
        }
        ls = 1;
        dt = 0;
        if (re.d < ls)
            dt = sqrt(ls * ls - re.d * re.d) / v;
        t2 = t0 - dt, t3 = t0 + dt;
        ls = 1 + Bc.r1;
        dt = 0;
        if (re.d < ls)
            dt = sqrt(ls * ls - re.d * re.d) / v;
        t4 = t0 - dt, t5 = t0 + dt;
        t6 = -b[0] / vx;
        if (re.d < 1) {
            re.gk1 = this.qrd(t2 + jd, vx, vy, 0);
            re.gk2 = this.qrd(t3 + jd, vx, vy, 0);
        }
        else {
            re.gk1 = [0, 0, 0];
            re.gk2 = [0, 0, 0];
        }
        re.gk3 = this.qrd(t4 + jd, vx, vy, 1);
        re.gk4 = this.qrd(t5 + jd, vx, vy, 1);
        re.gk5 = this.bseXY2db(t6 * vx + b[0], t6 * vy + b[1], this.bse(t6 + jd), 1);
        re.gk5[2] = t6 + jd;
        if (F.W == 100) {
            ls = this.bse2db([re.xc, re.yc, 0], re.I, 0);
            re.zxJ = ls[0], re.zxW = ls[1];
            re.sf = (Bc.r1 - (re.d - 0.9972)) / (Bc.r1 - Bc.r2);
            if (re.d > 0.9972 + Bc.r1) {
                re.lx = 'N';
            }
            else if (re.d > 0.9972 + Bc.ar2) {
                re.lx = 'P';
            }
            else {
                if (Bc.sf < 1)
                    re.lx = 'A0';
                else
                    re.lx = 'T0';
            }
        }
        else {
            re.zxJ = F.J, re.zxW = F.W;
            re.sf = Bp.sf;
            if (re.d > 0.9966 - Bp.ar2) {
                if (Bp.sf < 1)
                    re.lx = 'A1';
                else
                    re.lx = 'T1';
            }
            else {
                if (Bp.sf >= 1) {
                    re.lx = 'H';
                    if (B2.sf > 1)
                        re.lx = 'H2';
                    if (B3.sf > 1)
                        re.lx = 'H3';
                    if (B2.sf > 1 && B3.sf > 1)
                        re.lx = 'T';
                }
                else
                    re.lx = 'A';
            }
        }
        re.Sdp = CD2DP(this.sun(re.jd), re.zxJ, re.zxW, re.I[2]);
        if (F.W != 100) {
            re.dw = abs(2 * Bp.r2 * cs_rEar) / sin(re.Sdp[1]);
            ls = this.Vxy(re.xc, re.yc, re.I[1], re.vx, re.vy);
            re.tt = 2 * abs(Bp.r2) / ls.V;
        }
        else
            re.dw = re.tt = 0;
        return re;
    },
    push: function (z, p) { p[p.length] = z[0], p[p.length] = z[1]; },
    elmCpy: function (a, n, b, m) {
        if (!b.length)
            return;
        if (n == -2)
            n = a.length;
        if (m == -2)
            m = b.length;
        if (n == -1)
            n = a.length - 2;
        if (m == -1)
            m = b.length - 2;
        a[n] = b[m], a[n + 1] = b[m + 1];
    },
    nanbei: function (M, vx0, vy0, h, r, I) {
        var x = M[0] - vy0 / vx0 * r * h, y = M[1] + h * r, z, i;
        var vx, vy, v, sinA, cosA, js = 0;
        for (i = 0; i < 3; i++) {
            z = 1 - x * x - y * y;
            if (z < 0) {
                if (js)
                    break;
                z = 0;
                js++;
            }
            z = Math.sqrt(z);
            x -= (x - M[0]) * z / M[2];
            y -= (y - M[1]) * z / M[2];
            vx = vx0 - pi2 * (sin(I[1]) * z - cos(I[1]) * y);
            vy = vy0 - pi2 * cos(I[1]) * x;
            v = Math.sqrt(vx * vx + vy * vy);
            sinA = h * vy / v, cosA = h * vx / v;
            x = M[0] - r * sinA, y = M[1] + r * cosA;
        }
        var X = M[0] - cs_k * sinA, Y = M[1] + cs_k * cosA;
        var p = lineEar2(X, Y, M[2], x, y, 0, cs_ba, 1, I);
        return [p.J, p.W, x, y];
    },
    mQie: function (M, vx0, vy0, h, r, I, A) {
        var p = this.nanbei(M, vx0, vy0, h, r, I);
        if (!A.f2)
            A.f2 = 0;
        A.f = p[1] == 100 ? 0 : 1;
        if (A.f2 != A.f) {
            var g = lineOvl(p[2], p[3], vx0, vy0, 1, this.bba), dj, F;
            if (g.n) {
                if (A.f)
                    dj = g.R2, F = g.B;
                else
                    dj = g.R1, F = g.A;
                F[2] = 0;
                var I2 = new Array(I[0], I[1], I[2] - dj / Math.sqrt(vx0 * vx0 + vy0 * vy0) * 6.28);
                this.push(this.bse2db(F, I2, 1), A);
            }
        }
        A.f2 = A.f;
        if (p[1] != 100)
            this.push(p, A);
    },
    mDian: function (M, vx0, vy0, AB, r, I, A) {
        var i, p, a = M, R, c = new Object();
        for (i = 0; i < 2; i++) {
            c = this.Vxy(a[0], a[1], I[1], vx0, vy0);
            p = lineOvl(M[0], M[1], c.Vy, -c.Vx, 1, this.bba);
            if (!p.n)
                break;
            if (AB)
                a = p.A, R = p.R1;
            else
                a = p.B, R = p.R2;
        }
        if (p.n && R <= r) {
            a = this.bse2db([a[0], a[1], 0], I, 1);
            this.push(a, A);
            return 1;
        }
        return 0;
    },
    jieX: function (jd) {
        var i, p, ls;
        var re = this.feature(jd);
        re.p1 = new Array(), re.p2 = new Array(), re.p3 = new Array(), re.p4 = new Array();
        re.q1 = new Array(), re.q2 = new Array(), re.q3 = new Array(), re.q4 = new Array();
        re.L1 = new Array(), re.L2 = new Array(), re.L3 = new Array(), re.L4 = new Array();
        re.L5 = new Array(), re.L6 = new Array();
        re.L0 = new Array();
        var T = 1.7 * 1.7 - re.d * re.d;
        if (T < 0)
            T = 0;
        T = Math.sqrt(T) / re.v + 0.01;
        var t = re.jd - T, N = 400, dt = 2 * T / N;
        var n1 = 0, n4 = 0;
        var Ua = re.q1, Ub = re.q2;
        this.push([0, 0], re.q2);
        this.push([0, 0], re.q3);
        this.push([0, 0], re.q4);
        for (i = 0; i <= N; i++, t += dt) {
            var vx = re.vx + re.ax * (t - re.jdSuo);
            var vy = re.vy + re.ay * (t - re.jdSuo);
            var M = this.bseM(t);
            var B = this.rSM(M[2]);
            var r = B.r1;
            var I = this.bse(t);
            p = cirOvl(1, this.bba, r, M[0], M[1]);
            if (n1 % 2) {
                if (!p.n)
                    n1++;
            }
            else {
                if (p.n)
                    n1++;
            }
            if (p.n) {
                p.A[2] = p.B[2] = 0;
                p.A = this.bse2db(p.A, I, 1);
                p.B = this.bse2db(p.B, I, 1);
                if (n1 == 1) {
                    this.push(p.A, re.p1);
                    this.push(p.B, re.p2);
                }
                if (n1 == 3) {
                    this.push(p.A, re.p3);
                    this.push(p.B, re.p4);
                }
            }
            if (!this.mDian(M, vx, vy, 0, r, I, Ua)) {
                if (Ua.length > 0)
                    Ua = re.q3;
            }
            ;
            if (!this.mDian(M, vx, vy, 1, r, I, Ub)) {
                if (Ub.length > 2)
                    Ub = re.q4;
            }
            ;
            if (t > re.jd) {
                if (Ua.length == 0)
                    Ua = re.q3;
                if (Ub.length == 2)
                    Ub = re.q4;
            }
            p = this.bseXY2db(M[0], M[1], I, 1);
            if (p[1] != 100 && n4 == 0 || p[1] == 100 && n4 == 1) {
                ls = lineOvl(M[0], M[1], vx, vy, 1, this.bba);
                var dj;
                if (n4 == 0)
                    dj = ls.R2, ls = ls.B;
                else
                    dj = ls.R1, ls = ls.A;
                ls[2] = 0;
                var I2 = new Array(I[0], I[1], I[2] - dj / Math.sqrt(vx * vx + vy * vy) * 6.28);
                this.push(this.bse2db(ls, I2, 1), re.L0);
                n4++;
            }
            if (p[1] != 100)
                this.push(p, re.L0);
            this.mQie(M, vx, vy, +1, r, I, re.L1);
            this.mQie(M, vx, vy, -1, r, I, re.L2);
            this.mQie(M, vx, vy, +1, B.r2, I, re.L3);
            this.mQie(M, vx, vy, -1, B.r2, I, re.L4);
            this.mQie(M, vx, vy, +1, (r + B.r2) / 2, I, re.L5);
            this.mQie(M, vx, vy, -1, (r + B.r2) / 2, I, re.L6);
        }
        this.elmCpy(re.q3, 0, re.q1, -1);
        this.elmCpy(re.q4, 0, re.q2, -1);
        this.elmCpy(re.q1, -2, re.L1, 0);
        this.elmCpy(re.q2, -2, re.L2, 0);
        this.elmCpy(re.q3, 0, re.L1, -1);
        this.elmCpy(re.q4, 0, re.L2, -1);
        this.elmCpy(re.q2, 0, re.q1, 0);
        this.elmCpy(re.q3, -2, re.q4, -1);
        return re;
    },
    jieX2: function (jd) {
        var re = new Object();
        var p1 = new Array(), p2 = new Array(), p3 = new Array();
        if (abs(jd - this.Zjd) > 0.5)
            return re;
        var i, s, p, x, y, X, Y;
        var S = this.sun(jd);
        var M = this.bseM(jd);
        var B = this.rSM(M[2]);
        var I = this.bse(jd);
        var Z = M[2];
        var a0 = M[0] * M[0] + M[1] * M[1];
        var a1 = a0 - B.r2 * B.r2;
        var a2 = a0 - B.r1 * B.r1;
        var N = 200;
        for (i = 0; i < N; i++) {
            s = i / N * pi2;
            var cosS = cos(s), sinS = sin(s);
            X = M[0] + cs_k * cosS, Y = M[1] + cs_k * sinS;
            x = M[0] + B.r2 * cosS, y = M[1] + B.r2 * sinS;
            p = lineEar2(X, Y, Z, x, y, 0, cs_ba, 1, I);
            if (p.W != 100)
                this.push([p.J, p.W], p1);
            else {
                if (sqrt(x * x + y * y) > a1)
                    this.push(this.bse2db([x, y, 0], I, 1), p1);
            }
            x = M[0] + B.r1 * cosS, y = M[1] + B.r1 * sinS;
            p = lineEar2(X, Y, Z, x, y, 0, cs_ba, 1, I);
            if (p.W != 100)
                this.push([p.J, p.W], p2);
            else {
                if (sqrt(x * x + y * y) > a2)
                    this.push(this.bse2db([x, y, 0], I, 1), p2);
            }
            p = llrConv([s, 0, 0], pi_2 - S[1]);
            p[0] = rad2rrad(p[0] + S[0] + pi_2 - I[2]);
            this.push(p, p3);
        }
        p1[p1.length] = p1[0], p1[p1.length] = p1[1];
        p2[p2.length] = p2[0], p2[p2.length] = p2[1];
        p3[p3.length] = p3[0], p3[p3.length] = p3[1];
        re.p1 = p1, re.p2 = p2, re.p3 = p3;
        return re;
    },
    jieX3: function (jd) {
        var i, k, p, ls;
        var re = this.feature(jd);
        var t = Math.floor(re.jd * 1440) / 1440 - 3 / 24;
        var N = 360, dt = 1 / 1440, s = '', s2;
        for (i = 0; i < N; i++, t += dt) {
            var vx = re.vx + re.ax * (t - re.jdSuo);
            var vy = re.vy + re.ay * (t - re.jdSuo);
            var M = this.bseM(t);
            var B = this.rSM(M[2]);
            var r = B.r1;
            var I = this.bse(t);
            s2 = JD.JD2str(t + J2000).dateTimeStr + ' ', k = 0;
            p = this.nanbei(M, vx, vy, +1, r, I);
            if (p[1] != 100)
                s2 += rad2str2(p[0]) + ' ' + rad2str2(p[1]) + '|', k++;
            else
                s2 += '-------------------|';
            p = this.nanbei(M, vx, vy, +1, B.r2, I);
            if (p[1] != 100)
                s2 += rad2str2(p[0]) + ' ' + rad2str2(p[1]) + '|', k++;
            else
                s2 += '-------------------|';
            p = this.bseXY2db(M[0], M[1], I, 1);
            if (p[1] != 100)
                s2 += rad2str2(p[0]) + ' ' + rad2str2(p[1]) + '|', k++;
            else
                s2 += '-------------------|';
            p = this.nanbei(M, vx, vy, -1, B.r2, I);
            if (p[1] != 100)
                s2 += rad2str2(p[0]) + ' ' + rad2str2(p[1]) + '|', k++;
            else
                s2 += '-------------------|';
            p = this.nanbei(M, vx, vy, -1, r, I);
            if (p[1] != 100)
                s2 += rad2str2(p[0]) + ' ' + rad2str2(p[1]) + ' ', k++;
            else
                s2 += '------------------- ';
            if (k)
                s += s2 + '<br>';
        }
        return '<pre>时间(力学时) 半影北界限 本影北界线 中心线 本影南界线 半影南界线，(伪本影南北界应互换)<br>' + s + '</pre>';
    }
};
var rsPL = {
    nasa_r: 0,
    sT: new Array(),
    secXY: function (jd, L, fa, high, re) {
        var deltat = dt_T(jd);
        var zd = nutation2(jd / 36525);
        var gst = pGST(jd - deltat, deltat) + zd[0] * Math.cos(hcjj(jd / 36525) + zd[1]);
        var z;
        z = rsGS.moon(jd);
        re.mCJ = z[0];
        re.mCW = z[1];
        re.mR = z[2];
        var mShiJ = rad2rrad(gst + L - z[0]);
        parallax(z, mShiJ, fa, high);
        re.mCJ2 = z[0], re.mCW2 = z[1], re.mR2 = z[2];
        z = rsGS.sun(jd);
        re.sCJ = z[0];
        re.sCW = z[1];
        re.sR = z[2];
        var sShiJ = rad2rrad(gst + L - z[0]);
        parallax(z, sShiJ, fa, high);
        re.sCJ2 = z[0], re.sCW2 = z[1], re.sR2 = z[2];
        re.mr = cs_sMoon / re.mR2 / rad;
        re.sr = 959.63 / re.sR2 / rad * cs_AU;
        if (this.nasa_r)
            re.mr *= cs_sMoon2 / cs_sMoon;
        re.x = rad2rrad(re.mCJ2 - re.sCJ2) * Math.cos((re.mCW2 + re.sCW2) / 2);
        re.y = re.mCW2 - re.sCW2;
        re.t = jd;
    },
    lineT: function (G, v, u, r, n) {
        var b = G.y * v - G.x * u, A = u * u + v * v, B = u * b, C = b * b - r * r * v * v, D = B * B - A * C;
        if (D < 0)
            return 0;
        D = Math.sqrt(D);
        if (!n)
            D = -D;
        return G.t + ((-B + D) / A - G.x) / v;
    },
    secMax: function (jd, L, fa, high) {
        var i;
        for (i = 0; i < 5; i++)
            this.sT[i] = 0;
        this.LX = '';
        this.sf = 0;
        this.sf2 = 0;
        this.sf3 = 0;
        this.sflx = " ";
        this.b1 = 1;
        this.dur = 0;
        this.P1 = this.V1 = 0;
        this.P2 = this.V2 = 0;
        this.sun_s = this.sun_j = 0;
        rsGS.init(jd, 7);
        jd = rsGS.Zjd;
        var G = new Object(), g = new Object();
        this.secXY(jd, L, fa, high, G);
        jd -= G.x / 0.2128;
        var u, v, dt = 60 / 86400, dt2;
        for (i = 0; i < 2; i++) {
            if (this.secXY(jd, L, fa, high, G) == 'err')
                return;
            if (this.secXY(jd + dt, L, fa, high, g) == 'err')
                return;
            u = (g.y - G.y) / dt;
            v = (g.x - G.x) / dt;
            dt2 = -(G.y * u + G.x * v) / (u * u + v * v);
            jd += dt2;
        }
        var maxsf = 0, maxjd = jd, rmin, ls;
        let tt = 0.01;
        for (i = -30; i < 30; i += 6) {
            tt = jd + i / 86400;
            this.secXY(tt, L, fa, high, g);
            ls = (g.mr + g.sr - Math.sqrt(g.x * g.x + g.y * g.y)) / g.sr / 2;
            if (ls > maxsf)
                maxsf = ls, maxjd = tt;
        }
        jd = maxjd;
        for (i = -5; i < 5; i += 1) {
            tt = jd + i / 86400;
            this.secXY(tt, L, fa, high, g);
            ls = (g.mr + g.sr - Math.sqrt(g.x * g.x + g.y * g.y)) / g.sr / 2;
            if (ls > maxsf)
                maxsf = ls, maxjd = tt;
        }
        jd = maxjd;
        this.secXY(jd, L, fa, high, G);
        rmin = Math.sqrt(G.x * G.x + G.y * G.y);
        this.sun_s = sunShengJ(jd - dt_T(jd) + L / pi2, L, fa, -1) + dt_T(jd);
        this.sun_j = sunShengJ(jd - dt_T(jd) + L / pi2, L, fa, 1) + dt_T(jd);
        if (rmin <= G.mr + G.sr) {
            this.sT[1] = jd;
            this.LX = '偏';
            this.sf = (G.mr + G.sr - rmin) / G.sr / 2;
            this.b1 = G.mr / G.sr;
            this.secXY(this.sun_s, L, fa, high, g);
            this.sf2 = (g.mr + g.sr - Math.sqrt(g.x * g.x + g.y * g.y)) / g.sr / 2;
            if (this.sf2 < 0)
                this.sf2 = 0;
            this.secXY(this.sun_j, L, fa, high, g);
            this.sf3 = (g.mr + g.sr - Math.sqrt(g.x * g.x + g.y * g.y)) / g.sr / 2;
            if (this.sf3 < 0)
                this.sf3 = 0;
            this.sT[0] = this.lineT(G, v, u, G.mr + G.sr, 0);
            for (i = 0; i < 3; i++) {
                this.secXY(this.sT[0], L, fa, high, g);
                this.sT[0] = this.lineT(g, v, u, g.mr + g.sr, 0);
            }
            this.P1 = rad2mrad(atan2(g.x, g.y));
            this.V1 = rad2mrad(this.P1 - shiChaJ(pGST2(this.sT[0]), L, fa, g.sCJ, g.sCW));
            this.sT[2] = this.lineT(G, v, u, G.mr + G.sr, 1);
            for (i = 0; i < 3; i++) {
                this.secXY(this.sT[2], L, fa, high, g);
                this.sT[2] = this.lineT(g, v, u, g.mr + g.sr, 1);
            }
            this.P2 = rad2mrad(atan2(g.x, g.y));
            this.V2 = rad2mrad(this.P2 - shiChaJ(pGST2(this.sT[2]), L, fa, g.sCJ, g.sCW));
        }
        if (rmin <= G.mr - G.sr) {
            this.LX = '全';
            this.sT[3] = this.lineT(G, v, u, G.mr - G.sr, 0);
            this.secXY(this.sT[3], L, fa, high, g);
            this.sT[3] = this.lineT(g, v, u, g.mr - g.sr, 0);
            this.sT[4] = this.lineT(G, v, u, G.mr - G.sr, 1);
            this.secXY(this.sT[4], L, fa, high, g);
            this.sT[4] = this.lineT(g, v, u, g.mr - g.sr, 1);
            this.dur = this.sT[4] - this.sT[3];
        }
        if (rmin <= G.sr - G.mr) {
            this.LX = '环';
            this.sT[3] = this.lineT(G, v, u, G.sr - G.mr, 0);
            this.secXY(this.sT[3], L, fa, high, g);
            this.sT[3] = this.lineT(g, v, u, g.sr - g.mr, 0);
            this.sT[4] = this.lineT(G, v, u, G.sr - G.mr, 1);
            this.secXY(this.sT[4], L, fa, high, g);
            this.sT[4] = this.lineT(g, v, u, g.sr - g.mr, 1);
            this.dur = this.sT[4] - this.sT[3];
        }
        if (this.sT[1] < this.sun_s && this.sf2 > 0)
            this.sf = this.sf2, this.sflx = "#";
        if (this.sT[1] > this.sun_j && this.sf3 > 0)
            this.sf = this.sf3, this.sflx = "*";
        for (i = 0; i < 5; i++) {
            if (this.sT[i] < this.sun_s || this.sT[i] > this.sun_j)
                this.sT[i] = 0;
        }
        this.sun_s -= dt_T(jd);
        this.sun_j -= dt_T(jd);
    },
    A: new Array(), B: new Array(),
    P: { S: new Array(), M: new Array(), g: 0 },
    Q: { S: new Array(), M: new Array(), g: 0 },
    V: new Array(),
    Vc: '', Vb: '',
    zb0: function (jd) {
        var deltat = dt_T(jd);
        var E = hcjj(jd / 36525);
        var zd = nutation2(jd / 36525);
        this.P.g = pGST(jd - deltat, deltat) + zd[0] * Math.cos(E + zd[1]);
        this.P.S = rsGS.sun(jd);
        this.P.M = rsGS.moon(jd);
        var t2 = jd + 60 / 86400;
        this.Q.g = pGST(t2 - deltat, deltat) + zd[0] * Math.cos(E + zd[1]);
        this.Q.S = rsGS.sun(t2);
        this.Q.M = rsGS.moon(t2);
        var z1 = new Array(), z2 = new Array();
        z1 = llr2xyz(this.P.S);
        z2 = llr2xyz(this.P.M);
        var k = 959.63 / cs_sMoon * cs_AU, F;
        F = new Array((z1[0] - z2[0]) / (1 - k) + z2[0], (z1[1] - z2[1]) / (1 - k) + z2[1], (z1[2] - z2[2]) / (1 - k) + z2[2]);
        this.A = xyz2llr(F);
        F = new Array((z1[0] - z2[0]) / (1 + k) + z2[0], (z1[1] - z2[1]) / (1 + k) + z2[1], (z1[2] - z2[2]) / (1 + k) + z2[2]);
        this.B = xyz2llr(F);
    },
    zbXY: function (p, L, fa) {
        var s = new Array(p.S[0], p.S[1], p.S[2]);
        var m = new Array(p.M[0], p.M[1], p.M[2]);
        parallax(s, p.g + L - p.S[0], fa, 0);
        parallax(m, p.g + L - p.M[0], fa, 0);
        p.mr = cs_sMoon / m[2] / rad;
        p.sr = 959.63 / s[2] / rad * cs_AU;
        p.x = rad2rrad(m[0] - s[0]) * Math.cos((m[1] + s[1]) / 2);
        p.y = m[1] - s[1];
    },
    p2p: function (L, fa, re, fAB, f) {
        var p = this.P, q = this.Q;
        this.zbXY(this.P, L, fa);
        this.zbXY(this.Q, L, fa);
        var u = q.y - p.y, v = q.x - p.x, a = Math.sqrt(u * u + v * v), r = 959.63 / p.S[2] / rad * cs_AU;
        var W = p.S[1] + f * r * v / a, J = p.S[0] - f * r * u / a / Math.cos((W + p.S[1]) / 2), R = p.S[2];
        var A = fAB ? this.A : this.B;
        var pp = lineEar(new Array(J, W, R), A, p.g);
        re.J = pp.J;
        re.W = pp.W;
    },
    pp0: function (re) {
        var p = this.P;
        var pp = lineEar(p.M, p.S, p.g);
        re.J = pp.J;
        re.W = pp.W;
        if (re.W == 100) {
            re.c = '';
            return;
        }
        re.c = '全';
        this.zbXY(p, re.J, re.W);
        if (p.sr > p.mr)
            re.c = '环';
    },
    nbj: function (jd) {
        rsGS.init(jd, 7);
        var i, G = new Object(), V = this.V;
        for (i = 0; i < 10; i++)
            V[i] = 100;
        this.Vc = '', this.Vb = '';
        this.zb0(jd);
        this.pp0(G);
        V[0] = G.J, V[1] = G.W, this.Vc = G.c;
        G.J = G.W = 0;
        for (i = 0; i < 2; i++)
            this.p2p(G.J, G.W, G, 1, 1);
        V[2] = G.J, V[3] = G.W;
        G.J = G.W = 0;
        for (i = 0; i < 2; i++)
            this.p2p(G.J, G.W, G, 1, -1);
        V[4] = G.J, V[5] = G.W;
        G.J = G.W = 0;
        for (i = 0; i < 3; i++)
            this.p2p(G.J, G.W, G, 0, -1);
        V[6] = G.J, V[7] = G.W;
        G.J = G.W = 0;
        for (i = 0; i < 3; i++)
            this.p2p(G.J, G.W, G, 0, 1);
        V[8] = G.J, V[9] = G.W;
        if (V[3] != 100 && V[5] != 100) {
            var x = (V[2] - V[4]) * Math.cos((V[3] + V[5]) / 2), y = V[3] - V[5];
            this.Vb = (cs_rEarA * Math.sqrt(x * x + y * y)).toFixed(0) + '千米';
        }
    }
};
