"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservablePoint = void 0;
var ObservablePoint = /** @class */ (function () {
    function ObservablePoint(observer, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
        this._observer = observer;
    }
    ObservablePoint.prototype.set = function (x, y) {
        var _x = x || 0;
        var _y = y || (y !== 0 ? _x : 0);
        if (this._x !== _x || this._y !== _y) {
            this._x = _x;
            this._y = _y;
            this._observer(this);
        }
    };
    Object.defineProperty(ObservablePoint.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (this._x !== value) {
                this._x = value;
                this._observer(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObservablePoint.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (this._y !== value) {
                this._y = value;
                this._observer(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    return ObservablePoint;
}());
exports.ObservablePoint = ObservablePoint;
