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
exports.Scene_Gameover = void 0;
var Sprite_1 = require("../core/Sprite");
var TouchInput_1 = require("../core/TouchInput");
var AudioManager_1 = require("../managers/AudioManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SceneBase_1 = require("./SceneBase");
var SceneTitle_1 = require("./SceneTitle");
var Scene_Gameover = /** @class */ (function (_super) {
    __extends(Scene_Gameover, _super);
    function Scene_Gameover() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Gameover.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Gameover.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Gameover.prototype.create = function () {
        _super.prototype.create.call(this);
        this.playGameoverMusic();
        this.createBackground();
    };
    Scene_Gameover.prototype.start = function () {
        _super.prototype.start.call(this);
        this.startFadeIn(this.slowFadeSpeed(), false);
    };
    Scene_Gameover.prototype.update = function () {
        if (this.isActive() && !this.isBusy() && this.isTriggered()) {
            this.gotoTitle();
        }
        _super.prototype.update.call(this);
    };
    Scene_Gameover.prototype.stop = function () {
        SceneBase_1.Scene_Base.prototype.stop.call(this);
        this.fadeOutAll();
    };
    Scene_Gameover.prototype.terminate = function () {
        SceneBase_1.Scene_Base.prototype.terminate.call(this);
        AudioManager_1.AudioManager.stopAll();
    };
    Scene_Gameover.prototype.playGameoverMusic = function () {
        AudioManager_1.AudioManager.stopBgm();
        AudioManager_1.AudioManager.stopBgs();
        AudioManager_1.AudioManager.playMe(globals_1.$dataSystem.gameoverMe);
    };
    Scene_Gameover.prototype.createBackground = function () {
        this._backSprite = new Sprite_1.Sprite();
        this._backSprite.bitmap = ImageManager_1.ImageManager.loadSystem("GameOver");
        this.addChild(this._backSprite);
    };
    Scene_Gameover.prototype.isTriggered = function () {
        return /* Input.isTriggered("ok") ||*/ TouchInput_1.TouchInput.isTriggered();
    };
    Scene_Gameover.prototype.gotoTitle = function () {
        SceneManager_1.SceneManager.goto(SceneTitle_1.Scene_Title);
    };
    return Scene_Gameover;
}(SceneBase_1.Scene_Base));
exports.Scene_Gameover = Scene_Gameover;
