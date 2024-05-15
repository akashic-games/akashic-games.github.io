"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.generateRuntimeId = function () {
        return Utils._id++;
    };
    /**
     * rgbToCssColor
     * @param r [0, 255]
     * @param g [0, 255]
     * @param b [0, 255]
     */
    Utils.rgbToCssColor = function (r, g, b) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return "rgb(" + r + "," + g + "," + b + ")";
    };
    /**
     * rgbaToCssColor
     * @param r [0, 255]
     * @param g [0, 255]
     * @param b [0, 255]
     * @param a [0, 1]
     */
    Utils.rgbaToCssColor = function (r, g, b, a) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    Utils.cssToRGBColor = function (cssColor) {
        if (cssColor[0] === "#") {
            var result = cssColor
                .match(/#(..)(..)(..)/)
                .splice(1, 3)
                .map(function (v) { return parseInt(v, 16); });
            result.push(255);
            return result;
        }
        else {
            return cssColor
                .match(/rgba\((.+),\s*(.+),\s*(.+),\s*(.+)\)/)
                .splice(1, 4)
                .map(function (v) { return parseFloat(v); });
        }
    };
    Utils.isOptionValid = function (_option) {
        return false;
    };
    Utils.clamp = function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };
    Utils.format = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // "%3, %2, %1".replace(/%([0-9]+)/g, (s, n) => ["A", "B", "C"][Number(n) - 1]);
        // -> "C, B, A"
        return str.replace(/%([0-9]+)/g, function (_s, n) {
            return args[Number(n) - 1] + "";
        });
    };
    Utils.padZero = function (value, length) {
        var s = String(value);
        while (s.length < length) {
            s = "0" + s;
        }
        return s;
    };
    // ファイルパスをアセット名に変換する。
    Utils.flatten = function (str) {
        return str.replace(/[/\\\!\-]/g, "_").split(".")[0];
    };
    // RPGツクール用のパスをAkashic Engine用のパスにリネーム
    Utils.assetPathOfName = function (path) {
        return "/assets/".concat(decodeURIComponent(path));
    };
    Utils.randomInt = function (max) {
        return Math.floor(max * g.game.vars.random.generate());
    };
    Utils.equals = function (self, array) {
        if (!self || !array || self.length !== array.length) {
            return false;
        }
        for (var i = 0; i < self.length; i++) {
            if (Array.isArray(self[i]) && Array.isArray(array[i])) {
                if (!this.equals(self[i], array[i])) {
                    return false;
                }
            }
            else if (self[i] !== array[i]) {
                return false;
            }
        }
        return true;
    };
    Utils.cloneArray = function (array) {
        return array.slice(0);
    };
    Utils.mod = function (self, n) {
        return ((self % n) + n) % n;
    };
    Utils.contains = function (arr, element) {
        return arr.indexOf(element) >= 0;
    };
    Utils.isMobileDevice = function () {
        return false;
    };
    Utils.isArrayEqual = function (array1, array2) {
        if (array1.length !== array2.length)
            return false;
        return array1.every(function (val, index) { return val === array2[index]; });
    };
    Utils._id = 1;
    // ホバープラグインの登録番号。他のakashicプラグインとの番号被りを発生しないようにするため、100という大きめの数値を付与している
    // TODO: game.jsonで定義できるようにすべき
    Utils._akashicHoverPluginId = 100;
    return Utils;
}());
exports.Utils = Utils;
