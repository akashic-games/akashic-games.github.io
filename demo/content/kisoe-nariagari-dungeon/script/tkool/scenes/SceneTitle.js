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
exports.Scene_Title = void 0;
var Bitmap_1 = require("../core/Bitmap");
var Graphics_1 = require("../core/Graphics");
var Sprite_1 = require("../core/Sprite");
var AudioManager_1 = require("../managers/AudioManager");
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var WindowTitleCommand_1 = require("../windows/WindowTitleCommand");
var SceneBase_1 = require("./SceneBase");
var SceneMap_1 = require("./SceneMap");
var Scene_Title = /** @class */ (function (_super) {
    __extends(Scene_Title, _super);
    function Scene_Title() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Title.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Title.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Title.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createBackground();
        this.createForeground();
        this.createWindowLayer();
        this.createCommandWindow();
    };
    Scene_Title.prototype.start = function () {
        SceneManager_1.SceneManager.clearStack();
        this.centerSprite(this._backSprite1);
        this.centerSprite(this._backSprite2);
        this.playTitleMusic();
        this.startFadeIn(this.fadeSpeed(), false);
    };
    Scene_Title.prototype.update = function () {
        if (!this.isBusy()) {
            this._commandWindow.open();
        }
        _super.prototype.update.call(this);
    };
    Scene_Title.prototype.isBusy = function () {
        return (this._commandWindow && this._commandWindow.isClosing()) || _super.prototype.isBusy.call(this);
    };
    Scene_Title.prototype.terminate = function () {
        _super.prototype.terminate.call(this);
        SceneManager_1.SceneManager.snapForBackground();
    };
    Scene_Title.prototype.createBackground = function () {
        this._backSprite1 = new Sprite_1.Sprite(ImageManager_1.ImageManager.loadTitle1(globals_1.$dataSystem.title1Name));
        this._backSprite2 = new Sprite_1.Sprite(ImageManager_1.ImageManager.loadTitle2(globals_1.$dataSystem.title2Name));
        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };
    Scene_Title.prototype.createForeground = function () {
        this._gameTitleSprite = new Sprite_1.Sprite(new Bitmap_1.Bitmap(Graphics_1.Graphics.width, Graphics_1.Graphics.height));
        this.addChild(this._gameTitleSprite);
        if (globals_1.$dataSystem.optDrawTitle) {
            this.drawGameTitle();
        }
    };
    Scene_Title.prototype.drawGameTitle = function () {
        var x = 20;
        var y = Graphics_1.Graphics.height / 4;
        var maxWidth = Graphics_1.Graphics.width - x * 2;
        var text = globals_1.$dataSystem.gameTitle;
        this._gameTitleSprite.bitmap.outlineColor = "black";
        this._gameTitleSprite.bitmap.outlineWidth = 8;
        this._gameTitleSprite.bitmap.fontSize = 72;
        this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, "center");
    };
    Scene_Title.prototype.centerSprite = function (sprite) {
        // NOTE: 以下をオリジナルのコードのとおり有効にすると、いろいろなものが画面右下に位置していまう。
        sprite.x = Graphics_1.Graphics.width / 2;
        sprite.y = Graphics_1.Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.modified();
    };
    Scene_Title.prototype.createCommandWindow = function () {
        this._commandWindow = new WindowTitleCommand_1.Window_TitleCommand();
        this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
        this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
        this._commandWindow.setHandler("options", this.commandOptions.bind(this));
        // NOTE: ここで updateTransform() してあげないと、１フレームだけウィンドウが開いた状態になってしまう。
        // TODO: 根本的解決
        this._commandWindow.updateTransform();
        this.addWindow(this._commandWindow);
    };
    Scene_Title.prototype.commandNewGame = function () {
        DataManager_1.DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager_1.SceneManager.goto(SceneMap_1.Scene_Map);
    };
    Scene_Title.prototype.commandContinue = function () {
        this._commandWindow.close();
        // SceneManager.push(Scene_Load);
    };
    Scene_Title.prototype.commandOptions = function () {
        this._commandWindow.close();
        // SceneManager.push(Scene_Options);
    };
    Scene_Title.prototype.playTitleMusic = function () {
        AudioManager_1.AudioManager.playBgm(globals_1.$dataSystem.titleBgm);
        AudioManager_1.AudioManager.stopBgs();
        AudioManager_1.AudioManager.stopMe();
    };
    return Scene_Title;
}(SceneBase_1.Scene_Base));
exports.Scene_Title = Scene_Title;
