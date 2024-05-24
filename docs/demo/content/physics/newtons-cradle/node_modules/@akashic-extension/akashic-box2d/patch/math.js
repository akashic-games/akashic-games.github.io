var b2 = require("box2dweb");

function patchBox2DMath(opts) {
    opts = opts || {};
    opts.tableSize = typeof opts.tableSize === "number" ? opts.tableSize : 8192 * 4;
    opts.wholePeriod = opts.wholePeriod === undefined ? true : !!opts.wholePeriod;

    var arrayType = typeof Float32Array !== "undefined" ? Float32Array : Array;

    function setupSinTable(arr, angleRange) {
        var reso = arr.length;

        // Math.sin() との差の絶対値の最大値:
        // * iterNum=10: 5.551115123125783e-16
        // * iterNum= 5: 5.551115123125783e-16
        // * iterNum= 4: 4.374278717023117e-14
        function sin(x) {
            var iterNum = 5;
            var minus_x_squared = -x * x;
            var s = 1;
            var n = 0;
            var term = 1;

            for (var i = 1; i <= 2 * iterNum; i++) {
                n = n + 2;
                term = term * minus_x_squared / (n * (n + 1));
                s = s + term;
            }

            s = x * s;

            return s;
        }

        var factor = angleRange / (reso - 1);
        for (var i = 0; i < reso; i++) {
            arr[i] = sin(factor * i);
        }

        return arr;
    }

    function LutMath() {
        var angleRange = opts.wholePeriod ? Math.PI * 2 : Math.PI / 2;
        this.PI2 = Math.PI * 2;
        this.factor = (opts.tableSize - 1) / angleRange;
        this.sinTable = setupSinTable(new arrayType(opts.tableSize), angleRange);
    }

    LutMath.prototype.sin = opts.wholePeriod ? function(th) {
        th %= this.PI2;
        if (th < 0) {
            th += this.PI2;
        }
        return this.sinTable[(th * this.factor) | 0];
    } : function(th) {
        th %= this.PI2;
        if (th < 0) {
            th += this.PI2;
        }

        var sign = 1;
        if (th > Math.PI) {
            th -= Math.PI;
            sign = -1;
        }

        var idx = (th * this.factor) | 0;
        if (idx > this.sinTable.length - 1) {
            idx = (this.sinTable.length - 1) * 2 - idx;
        }

        return sign * this.sinTable[idx];
    };

    LutMath.prototype.cos = function(th) {
        return this.sin(th + Math.PI / 2);
    };

    b2.Common.Math.b2Mat22.prototype.__lutmath = new LutMath();

    // override
    b2.Common.Math.b2Mat22.prototype.Set = function(angle) {
        if (angle === undefined) angle = 0;
        var c = this.__lutmath.cos(angle);
        var s = this.__lutmath.sin(angle);
        this.col1.x = c;
        this.col2.x = (-s);
        this.col1.y = s;
        this.col2.y = c;
    };
}

module.exports = {
    patchBox2DMath: patchBox2DMath
};
