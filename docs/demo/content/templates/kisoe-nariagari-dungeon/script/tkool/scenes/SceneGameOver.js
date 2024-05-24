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
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
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
        managers_1.AudioManager.stopAll();
    };
    Scene_Gameover.prototype.playGameoverMusic = function () {
        managers_1.AudioManager.stopBgm();
        managers_1.AudioManager.stopBgs();
        managers_1.AudioManager.playMe(DataManager_1.$dataSystem.gameoverMe);
    };
    Scene_Gameover.prototype.createBackground = function () {
        this._backSprite = new core_1.Sprite(this.scene);
        this._backSprite.bitmap = managers_1.ImageManager.loadSystem("GameOver");
        this.addChild(this._backSprite);
    };
    Scene_Gameover.prototype.isTriggered = function () {
        return /* Input.isTriggered("ok") ||*/ core_1.TouchInput.isTriggered();
    };
    Scene_Gameover.prototype.gotoTitle = function () {
        managers_1.SceneManager.goto(SceneTitle_1.Scene_Title);
    };
    return Scene_Gameover;
}(SceneBase_1.Scene_Base));
exports.Scene_Gameover = Scene_Gameover;
