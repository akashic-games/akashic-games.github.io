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
exports.ToneSprite = void 0;
var PIXI_1 = require("../PIXI");
var Graphics_1 = require("./Graphics");
var Utils_1 = require("./Utils");
// export interface ToneSpriteParameterObject extends ContainerParameterObject {
// }
var ToneSprite = /** @class */ (function (_super) {
    __extends(ToneSprite, _super);
    function ToneSprite() {
        return _super.call(this) || this;
        // this.initialize();
    }
    ToneSprite.prototype.initialize = function () {
        this.clear();
    };
    ToneSprite.prototype.clear = function () {
        this._red = 0;
        this._green = 0;
        this._blue = 0;
        this._gray = 0;
    };
    ToneSprite.prototype.setTone = function (r, g, b, gray) {
        this._red = Utils_1.Utils.clamp(Math.round(r || 0), -255, 255);
        this._green = Utils_1.Utils.clamp(Math.round(g || 0), -255, 255);
        this._blue = Utils_1.Utils.clamp(Math.round(b || 0), -255, 255);
        this._gray = Utils_1.Utils.clamp(Math.round(gray || 0), 0, 255);
    };
    // ToneSprite.prototype._renderCanvas = function(renderer) {
    ToneSprite.prototype.renderSelf = function (renderer, _camera) {
        if (this.visible) {
            // const context = renderer.context;
            // const t = this.worldTransform;
            // const r = renderer.resolution;
            // const width = Graphics.width;
            // const height = Graphics.height;
            // context.save();
            var width = Graphics_1.Graphics.width;
            var height = Graphics_1.Graphics.height;
            renderer.save();
            // context.setTransform(t.a, t.b, t.c, t.d, t.tx * r, t.ty * r);
            // transformはAkashicによって設定済みのものそのままで良いと想定
            // if (Graphics.canUseSaturationBlend() && this._gray > 0) {
            // 	context.globalCompositeOperation = "saturation";
            // 	context.globalAlpha = this._gray / 255;
            // 	context.fillStyle = "#ffffff";
            // 	context.fillRect(0, 0, width, height);
            // }
            if (Graphics_1.Graphics.canUseSaturationBlend() && this._gray > 0) {
                renderer.setCompositeOperation("lighter"); // saturationの代わり
                renderer.opacity(this._gray / 255);
                renderer.fillRect(0, 0, width, height, "white");
            }
            // context.globalAlpha = 1;
            renderer.opacity(1);
            var r1 = Math.max(0, this._red);
            var g1 = Math.max(0, this._green);
            var b1 = Math.max(0, this._blue);
            // if (r1 || g1 || b1) {
            // 	context.globalCompositeOperation = "lighter";
            // 	context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
            // 	context.fillRect(0, 0, width, height);
            // }
            if (r1 || g1 || b1) {
                renderer.setCompositeOperation("lighter");
                renderer.fillRect(0, 0, width, height, Utils_1.Utils.rgbToCssColor(r1, g1, b1));
            }
            // Akashic は "difference" をサポートしていない
            if (Graphics_1.Graphics.canUseDifferenceBlend()) {
                var r2 = Math.max(0, -this._red);
                var g2 = Math.max(0, -this._green);
                var b2 = Math.max(0, -this._blue);
                if (r2 || g2 || b2) {
                    // context.globalCompositeOperation = "difference";
                    // context.fillStyle = "#ffffff";
                    // context.fillRect(0, 0, width, height);
                    // context.globalCompositeOperation = "lighter";
                    // context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
                    // context.fillRect(0, 0, width, height);
                    // context.globalCompositeOperation = "difference";
                    // context.fillStyle = "#ffffff";
                    // context.fillRect(0, 0, width, height);
                }
            }
            // context.restore();
            renderer.restore();
        }
        return true;
    };
    return ToneSprite;
}(PIXI_1.Container));
exports.ToneSprite = ToneSprite;
