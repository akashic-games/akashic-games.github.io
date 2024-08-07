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
exports.Scene_Boot = void 0;
var Graphics_1 = require("../core/Graphics");
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SoundManager_1 = require("../managers/SoundManager");
var SceneBase_1 = require("./SceneBase");
var SceneTitle_1 = require("./SceneTitle");
var Scene_Boot = /** @class */ (function (_super) {
    __extends(Scene_Boot, _super);
    function Scene_Boot() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Boot.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Boot.loadSystemImages = function () {
        ImageManager_1.ImageManager.reserveSystem("IconSet");
        ImageManager_1.ImageManager.reserveSystem("Balloon");
        ImageManager_1.ImageManager.reserveSystem("Shadow1");
        ImageManager_1.ImageManager.reserveSystem("Shadow2");
        ImageManager_1.ImageManager.reserveSystem("Damage");
        ImageManager_1.ImageManager.reserveSystem("States");
        ImageManager_1.ImageManager.reserveSystem("Weapons1");
        ImageManager_1.ImageManager.reserveSystem("Weapons2");
        ImageManager_1.ImageManager.reserveSystem("Weapons3");
        ImageManager_1.ImageManager.reserveSystem("ButtonSet");
    };
    Scene_Boot.prototype.initialize = function () {
        this._startDate = Date.now();
        _super.prototype.initialize.call(this);
    };
    Scene_Boot.prototype.create = function () {
        SceneBase_1.Scene_Base.prototype.create.call(this);
        DataManager_1.DataManager.loadDatabase();
        // ConfigManager.load();
        this.loadSystemWindowImage();
        // DataManagerからここへ移動。
        // ファイルロードに関することはすべてcreate()で完結させたい。
        Scene_Boot.loadSystemImages();
    };
    Scene_Boot.prototype.loadSystemWindowImage = function () {
        ImageManager_1.ImageManager.reserveSystem("Window");
    };
    Scene_Boot.prototype.isReady = function () {
        if (SceneBase_1.Scene_Base.prototype.isReady.call(this)) {
            return DataManager_1.DataManager.isDatabaseLoaded() && this.isGameFontLoaded();
        }
        else {
            return false;
        }
    };
    Scene_Boot.prototype.isGameFontLoaded = function () {
        if (Graphics_1.Graphics.isFontLoaded("GameFont")) {
            return true;
        }
        else if (!Graphics_1.Graphics.canUseCssFontLoading()) {
            var elapsed = Date.now() - this._startDate;
            if (elapsed >= 60000) {
                throw new Error("Failed to load GameFont");
            }
        }
    };
    Scene_Boot.prototype.start = function () {
        SceneBase_1.Scene_Base.prototype.start.call(this);
        SoundManager_1.SoundManager.preloadImportantSounds();
        if (DataManager_1.DataManager.isBattleTest() && false) {
            // DataManager.setupBattleTest();
            // SceneManager.goto(Scene_Battle);
        }
        else if (DataManager_1.DataManager.isEventTest() && false) {
            // DataManager.setupEventTest();
            // SceneManager.goto(Scene_Map);
        }
        else {
            this.checkPlayerLocation();
            DataManager_1.DataManager.setupNewGame();
            SceneManager_1.SceneManager.goto(SceneTitle_1.Scene_Title);
            // Window_TitleCommand.initCommandPosition();
        }
        this.updateDocumentTitle();
    };
    Scene_Boot.prototype.updateDocumentTitle = function () {
        // document.title = $dataSystem.gameTitle;
    };
    Scene_Boot.prototype.checkPlayerLocation = function () {
        if (globals_1.$dataSystem.startMapId === 0) {
            throw new Error('Player"s starting position is not set');
        }
    };
    return Scene_Boot;
}(SceneBase_1.Scene_Base));
exports.Scene_Boot = Scene_Boot;
