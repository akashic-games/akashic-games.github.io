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
exports.ToneFilter = void 0;
var PIXI = require("../PIXI");
var Utils_1 = require("./Utils");
var ToneFilter = /** @class */ (function (_super) {
    __extends(ToneFilter, _super);
    function ToneFilter() {
        return _super.call(this) || this;
    }
    ToneFilter.prototype.adjustHue = function (value) {
        this.hue(value, true);
    };
    ToneFilter.prototype.adjustSaturation = function (value) {
        value = Utils_1.Utils.clamp(value || 0, -255, 255) / 255;
        this.saturate(value, true);
    };
    ToneFilter.prototype.adjustTone = function (r, g, b) {
        r = Utils_1.Utils.clamp(r || 0, -255, 255) / 255;
        g = Utils_1.Utils.clamp(g || 0, -255, 255) / 255;
        b = Utils_1.Utils.clamp(b || 0, -255, 255) / 255;
        if (r !== 0 || g !== 0 || b !== 0) {
            var matrix = [1, 0, 0, r, 0, 0, 1, 0, g, 0, 0, 0, 1, b, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(matrix, true);
        }
    };
    return ToneFilter;
}(PIXI.filters.ColorMatrixFilter));
exports.ToneFilter = ToneFilter;
