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
exports.Weather = void 0;
var core_1 = require("../core");
var PIXI_1 = require("../PIXI");
// export interface WeatherParameterObject extends ContainerParameterObject {
// }
var Weather = /** @class */ (function (_super) {
    __extends(Weather, _super);
    function Weather(scene) {
        return _super.call(this, scene) || this;
        // this.initialize();
    }
    Weather.prototype.initialize = function () {
        // this._width = Graphics.width;
        // this._height = Graphics.height;
        // NOTE: PIXI.Container width, height を用意していない(g.Eそのまま)。うまくいかないかも
        this.width = core_1.Graphics.width;
        this.height = core_1.Graphics.height;
        this._sprites = [];
        this._createBitmaps();
        this._createDimmer();
        this.type = "none";
        this.power = 0;
        this.origin = new PIXI_1.Point();
    };
    Weather.prototype.update = function () {
        this._updateDimmer();
        this._updateAllSprites();
    };
    /**
     * @method _createBitmaps
     * @private
     */
    Weather.prototype._createBitmaps = function () {
        this._rainBitmap = new core_1.Bitmap(1, 60);
        this._rainBitmap.fillAll("white");
        this._stormBitmap = new core_1.Bitmap(2, 100);
        this._stormBitmap.fillAll("white");
        this._snowBitmap = new core_1.Bitmap(9, 9);
        this._snowBitmap.drawCircle(4, 4, 4, "white");
    };
    /**
     * @method _createDimmer
     * @private
     */
    Weather.prototype._createDimmer = function () {
        this._dimmerSprite = new core_1.ScreenSprite(this.scene);
        this._dimmerSprite.setColor(80, 80, 80);
        this.addChild(this._dimmerSprite);
    };
    /**
     * @method _updateDimmer
     * @private
     */
    Weather.prototype._updateDimmer = function () {
        this._dimmerSprite.opacity = Math.floor(this.power * 6);
    };
    /**
     * @method _updateAllSprites
     * @private
     */
    Weather.prototype._updateAllSprites = function () {
        var _this = this;
        var maxSprites = Math.floor(this.power * 10);
        while (this._sprites.length < maxSprites) {
            this._addSprite();
        }
        while (this._sprites.length > maxSprites) {
            this._removeSprite();
        }
        this._sprites.forEach(function (sprite) {
            _this._updateSprite(sprite);
            // sprite.x = sprite.ax - this.origin.x;
            // sprite.y = sprite.ay - this.origin.y;
            sprite.x = sprite.ax - _this.origin.x;
            sprite.y = sprite.ay - _this.origin.y;
        });
    };
    /**
     * @method _addSprite
     * @private
     */
    Weather.prototype._addSprite = function () {
        // const sprite = new Sprite(this.viewport);
        // NOTE: viewport はどこからも設定されない。MVのソースでもそのはず。よくわからない。
        // TODO: MVで天候を設定したフィールドを実行してデバッガで値を確認する。
        var sprite = new core_1.Sprite(this.scene, this.viewport);
        sprite.opacity = 0;
        this._sprites.push(sprite);
        this.addChild(sprite);
    };
    /**
     * @method _removeSprite
     * @private
     */
    Weather.prototype._removeSprite = function () {
        this.removeChild(this._sprites.pop());
    };
    /**
     * @method _updateSprite
     * @param {Sprite} sprite
     * @private
     */
    Weather.prototype._updateSprite = function (sprite) {
        switch (this.type) {
            case "rain":
                this._updateRainSprite(sprite);
                break;
            case "storm":
                this._updateStormSprite(sprite);
                break;
            case "snow":
                this._updateSnowSprite(sprite);
                break;
        }
        if (sprite.opacity < 40) {
            this._rebornSprite(sprite);
        }
    };
    /**
     * @method _updateRainSprite
     * @param {Sprite} sprite
     * @private
     */
    Weather.prototype._updateRainSprite = function (sprite) {
        sprite.bitmap = this._rainBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };
    /**
     * @method _updateStormSprite
     * @param {Sprite} sprite
     * @private
     */
    Weather.prototype._updateStormSprite = function (sprite) {
        sprite.bitmap = this._stormBitmap;
        sprite.rotation = Math.PI / 8;
        sprite.ax -= 8 * Math.sin(sprite.rotation);
        sprite.ay += 8 * Math.cos(sprite.rotation);
        sprite.opacity -= 8;
    };
    /**
     * @method _updateSnowSprite
     * @param {Sprite} sprite
     * @private
     */
    Weather.prototype._updateSnowSprite = function (sprite) {
        sprite.bitmap = this._snowBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
        sprite.opacity -= 3;
    };
    /**
     * @method _rebornSprite
     * @param {Sprite} sprite
     * @private
     */
    Weather.prototype._rebornSprite = function (sprite) {
        sprite.ax = core_1.Utils.randomInt(core_1.Graphics.width + 100) - 100 + this.origin.x;
        sprite.ay = core_1.Utils.randomInt(core_1.Graphics.height + 200) - 200 + this.origin.y;
        sprite.opacity = 160 + core_1.Utils.randomInt(60);
    };
    return Weather;
}(PIXI_1.Container));
exports.Weather = Weather;
