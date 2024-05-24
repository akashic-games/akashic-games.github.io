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
exports.Sprite_Timer = void 0;
var core_1 = require("../core");
var DataManager_1 = require("../managers/DataManager");
var Sprite_Timer = /** @class */ (function (_super) {
    __extends(Sprite_Timer, _super);
    function Sprite_Timer(scene) {
        return _super.call(this, scene) || this;
        // if (Object.getPrototypeOf(this) === Sprite_Timer.prototype) {
        // 	this.initialize(param.bitmap);
        // }
    }
    Sprite_Timer.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._seconds = 0;
        this.createBitmap();
        this.update();
    };
    Sprite_Timer.prototype.createBitmap = function () {
        this.bitmap = new core_1.Bitmap(96, 48);
        this.bitmap.fontSize = 32;
    };
    Sprite_Timer.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateBitmap();
        this.updatePosition();
        this.updateVisibility();
    };
    Sprite_Timer.prototype.updateBitmap = function () {
        if (this._seconds !== DataManager_1.$gameTimer.seconds()) {
            this._seconds = DataManager_1.$gameTimer.seconds();
            this.redraw();
        }
    };
    Sprite_Timer.prototype.redraw = function () {
        var text = this.timerText();
        var width = this.bitmap.width;
        var height = this.bitmap.height;
        this.bitmap.clear();
        this.bitmap.drawText(text, 0, 0, width, height, "center");
    };
    Sprite_Timer.prototype.timerText = function () {
        var min = Math.floor(this._seconds / 60) % 60;
        var sec = this._seconds % 60;
        return core_1.Utils.padZero(min, 2) + ":" + core_1.Utils.padZero(sec, 2);
    };
    Sprite_Timer.prototype.updatePosition = function () {
        this.x = core_1.Graphics.width - this.bitmap.width;
        this.y = 0;
    };
    Sprite_Timer.prototype.updateVisibility = function () {
        this.visible = DataManager_1.$gameTimer.isWorking();
    };
    return Sprite_Timer;
}(core_1.Sprite));
exports.Sprite_Timer = Sprite_Timer;
