"use strict";
function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
Date.prototype.toLocaleString2 = function () {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
function year2Ayear(c) {
    let y = String(c).replace(/[^0-9Bb\*-]/g, '');
    let q = y.slice(0, 1);
    if (q == 'B' || q == 'b' || q == '*') {
        y = 1 - y.slice(1, y.length + 1);
        if (y > 0) {
            alert('通用纪法的公元前纪法从B.C.1年开始。并且没有公元0年');
            return -10000;
        }
    }
    else
        y -= 0;
    if (y < -4712)
        alert('超过B.C. 4713不准');
    if (y > 9999)
        alert('超过9999年的农历计算很不准。');
    return y;
}
function Ayear2year(yearNum) {
    let year = yearNum;
    if (year < 0) {
        return year;
    }
    ;
    {
        return year;
    }
}
function timeStr2hour(s) {
    let a = 0, b = 0, c = 0;
    s = String(s).replace(/[^0-9:\.]/g, '');
    s = s.split(':');
    if (s.length == 1)
        a = s[0].slice(0, 2) - 0, b = s[0].slice(2, 2 + 2) - 0, c = s[0].slice(4, 4 + 2) - 0;
    else if (s.length == 2)
        a = s[0] - 0, b = s[1] - 0, c = 0;
    else
        a = s[0] - 0, b = s[1] - 0, c = s[2] - 0;
    return a + b / 60 + c / 3600;
}
class _LocalStorage_ {
    existStorage() {
        return window.Storage && window.localStorage && window.localStorage instanceof Storage;
    }
    ;
    setItem(name, value, t = 1000) {
        if (!this.existStorage())
            this.setCookie(name, value, t);
        try {
            localStorage.setItem(name, value);
        }
        catch (e) {
            console.error('localStorage.setItem错误,', e.message);
        }
    }
    ;
    getItem(name) {
        let value;
        if (!this.existStorage())
            return this.getCookie(name);
        try {
            value = localStorage.getItem(name);
        }
        catch (e) {
            console.error('localStorage.getItem错误,', e.message);
        }
        finally {
            return value;
        }
    }
    ;
    setCookie(name, value, t = 1000) {
        let d = new Date();
        d.setTime(d.getTime() + (t * 86400 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    }
    ;
    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        return null;
    }
    ;
}
;
var storageL = new _LocalStorage_();
function addSelectOption(select, value, text) {
    let Op = document.createElement("OPTION");
    Op.value = value;
    Op.text = text;
    select.add(Op);
}
