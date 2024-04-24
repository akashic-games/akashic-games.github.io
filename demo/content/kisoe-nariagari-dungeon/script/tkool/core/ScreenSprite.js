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
exports.ScreenSprite = void 0;
var PIXI_1 = require("../PIXI");
var Graphics_1 = require("./Graphics");
var Utils_1 = require("./Utils");
var ScreenSprite = /** @class */ (function (_super) {
    __extends(ScreenSprite, _super);
    function ScreenSprite(blackOrWhite) {
        return _super.call(this, blackOrWhite) || this;
    }
    ScreenSprite.prototype.initialize = function (blackOrWhite) {
        _super.prototype.initialize.call(this);
        // PIXI.Container.call(this);
        // this._graphics = new PIXI.Graphics();
        // this.addChild(this._graphics);
        // ↑これは？
        // > Geometry to use, if omitted will create a new GraphicsGeometry instance
        // あとに出てくる描画処理で利用されている。
        this.opacity = 0;
        this._red = -1;
        this._green = -1;
        this._blue = -1;
        if (blackOrWhite === "black") {
            this.setBlack();
        }
        else {
            this.setWhite();
        }
        this.modified();
    };
    Object.defineProperty(ScreenSprite.prototype, "alpha", {
        get: function () {
            return this.opacity;
        },
        set: function (value) {
            this.opacity = value;
            this.modified();
        },
        enumerable: false,
        configurable: true
    });
    // ScreenSprite.YEPWarned = false;
    // ScreenSprite.warnYep = function () {
    // 	if (!ScreenSprite.YEPWarned) {
    // 		console.log("Deprecation warning. Please update YEP_CoreEngine. ScreenSprite is not a sprite, it has graphics inside.");
    // 		ScreenSprite.YEPWarned = true;
    // 	}
    // };
    // Object.defineProperty(ScreenSprite.prototype, 'anchor', {
    // 	get: function () {
    // 		ScreenSprite.warnYep();
    // 		this.scale.x = 1;
    // 		this.scale.y = 1;
    // 		return { x: 0, y: 0 };
    // 	},
    // 	set: function (value) {
    // 		this.alpha = value.clamp(0, 255) / 255;
    // 	},
    // 	configurable: true
    // });
    ScreenSprite.prototype.setBlack = function () {
        this.setColor(0, 0, 0);
    };
    ScreenSprite.prototype.setWhite = function () {
        this.setColor(255, 255, 255);
    };
    ScreenSprite.prototype.setColor = function (r, g, b) {
        if (this._red !== r || this._green !== g || this._blue !== b) {
            r = Math.min(255, Math.max(Math.round(r || 0), 0));
            g = Math.min(255, Math.max(Math.round(g || 0), 0));
            b = Math.min(255, Math.max(Math.round(b || 0), 0));
            this._red = r;
            this._green = g;
            this._blue = b;
            this._colorText = Utils_1.Utils.rgbToCssColor(r, g, b);
            // var graphics = this._graphics;
            // graphics.clear();
            // var intColor = (r << 16) | (g << 8) | b;
            // graphics.beginFill(intColor, 1);
            // //whole screen with zoom. BWAHAHAHAHA
            // graphics.drawRect(-Graphics.width * 5, -Graphics.height * 5, Graphics.width * 10, Graphics.height * 10);
            this.width = Graphics_1.Graphics.width;
            this.height = Graphics_1.Graphics.height;
            this.modified();
        }
    };
    ScreenSprite.prototype.renderSelf = function (renderer, _camera) {
        renderer.fillRect(0, 0, this.width, this.height, this._colorText);
        return true;
    };
    return ScreenSprite;
}(PIXI_1.Container));
exports.ScreenSprite = ScreenSprite;
