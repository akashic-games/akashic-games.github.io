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
exports.Scene_MenuBase = void 0;
var Sprite_1 = require("../core/Sprite");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var windows_1 = require("../windows");
var SceneBase_1 = require("./SceneBase");
var Scene_MenuBase = /** @class */ (function (_super) {
    __extends(Scene_MenuBase, _super);
    function Scene_MenuBase() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_MenuBase.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_MenuBase.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_MenuBase.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createBackground();
        this.updateActor();
        this.createWindowLayer();
    };
    Scene_MenuBase.prototype.actor = function () {
        return this._actor;
    };
    Scene_MenuBase.prototype.updateActor = function () {
        this._actor = DataManager_1.$gameParty.menuActor();
    };
    Scene_MenuBase.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite_1.Sprite(this.scene);
        this._backgroundSprite.bitmap = managers_1.SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };
    Scene_MenuBase.prototype.setBackgroundOpacity = function (opacity) {
        this._backgroundSprite.opacity = opacity;
    };
    Scene_MenuBase.prototype.createHelpWindow = function () {
        this._helpWindow = new windows_1.Window_Help(this.scene);
        this.addWindow(this._helpWindow);
    };
    Scene_MenuBase.prototype.nextActor = function () {
        DataManager_1.$gameParty.makeMenuActorNext();
        this.updateActor();
        this.onActorChange();
    };
    Scene_MenuBase.prototype.previousActor = function () {
        DataManager_1.$gameParty.makeMenuActorPrevious();
        this.updateActor();
        this.onActorChange();
    };
    Scene_MenuBase.prototype.onActorChange = function () {
        //
    };
    return Scene_MenuBase;
}(SceneBase_1.Scene_Base));
exports.Scene_MenuBase = Scene_MenuBase;
