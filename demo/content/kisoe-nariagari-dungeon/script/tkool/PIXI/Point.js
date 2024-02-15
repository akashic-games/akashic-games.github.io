"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.set = function (x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);
    };
    return Point;
}());
exports.Point = Point;
