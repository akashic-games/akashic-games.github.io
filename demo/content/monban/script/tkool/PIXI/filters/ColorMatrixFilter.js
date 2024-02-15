"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorMatrixFilter = void 0;
var Filter_1 = require("./Filter");
// PIXIの当該機能のインターフェースだけ持ってきたもの。空振りする。
// see: http://pixijs.download/dev/docs/packages_filters_filter-color-matrix_src_ColorMatrixFilter.js.html
var ColorMatrixFilter = /** @class */ (function (_super) {
    __extends(ColorMatrixFilter, _super);
    function ColorMatrixFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorMatrixFilter.prototype.hue = function (_value, _b) {
        console.log("❗ColorMatrixFilter#hue called");
    };
    ColorMatrixFilter.prototype.saturate = function (_value, _b) {
        console.log("❗ColorMatrixFilter#saturate called");
    };
    ColorMatrixFilter.prototype.reset = function () {
        //
    };
    ColorMatrixFilter.prototype._loadMatrix = function (_matrix, _b) {
        console.log("❗ColorMatrixFilter#_loadMatrix called");
    };
    return ColorMatrixFilter;
}(Filter_1.Filter));
exports.ColorMatrixFilter = ColorMatrixFilter;
