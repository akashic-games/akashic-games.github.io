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
exports.Sprite_StateIcon = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var Sprite_StateIcon = /** @class */ (function (_super) {
    __extends(Sprite_StateIcon, _super);
    function Sprite_StateIcon(scene) {
        return _super.call(this, scene) || this;
    }
    Sprite_StateIcon.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.initMembers();
        this.loadBitmap();
    };
    Sprite_StateIcon.prototype.initMembers = function () {
        this._battler = null;
        this._iconIndex = 0;
        this._animationCount = 0;
        this._animationIndex = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    };
    Sprite_StateIcon.prototype.loadBitmap = function () {
        this.bitmap = managers_1.ImageManager.loadSystem("IconSet");
        this.setFrame(0, 0, 0, 0);
    };
    Sprite_StateIcon.prototype.setup = function (battler) {
        this._battler = battler;
    };
    Sprite_StateIcon.prototype.update = function () {
        _super.prototype.update.call(this);
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updateIcon();
            this.updateFrame();
            this._animationCount = 0;
        }
    };
    Sprite_StateIcon.prototype.animationWait = function () {
        return 40;
    };
    Sprite_StateIcon.prototype.updateIcon = function () {
        var icons = [];
        if (this._battler && this._battler.isAlive()) {
            icons = this._battler.allIcons();
        }
        if (icons.length > 0) {
            this._animationIndex++;
            if (this._animationIndex >= icons.length) {
                this._animationIndex = 0;
            }
            this._iconIndex = icons[this._animationIndex];
        }
        else {
            this._animationIndex = 0;
            this._iconIndex = 0;
        }
    };
    Sprite_StateIcon.prototype.updateFrame = function () {
        var pw = Sprite_StateIcon._iconWidth;
        var ph = Sprite_StateIcon._iconHeight;
        var sx = (this._iconIndex % 16) * pw; // + pw;
        var sy = Math.floor(this._iconIndex / 16) * ph;
        this.setFrame(sx, sy, pw, ph);
    };
    Sprite_StateIcon._iconWidth = 32;
    Sprite_StateIcon._iconHeight = 32;
    return Sprite_StateIcon;
}(core_1.Sprite));
exports.Sprite_StateIcon = Sprite_StateIcon;
