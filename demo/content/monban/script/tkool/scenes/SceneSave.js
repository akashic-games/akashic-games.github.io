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
exports.Scene_Save = void 0;
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var SoundManager_1 = require("../managers/SoundManager");
var StorageManager_1 = require("../managers/StorageManager");
var TextManager_1 = require("../managers/TextManager");
var SceneFile_1 = require("./SceneFile");
var Scene_Save = /** @class */ (function (_super) {
    __extends(Scene_Save, _super);
    function Scene_Save() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Save.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Save.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Save.prototype.mode = function () {
        return "save";
    };
    Scene_Save.prototype.helpWindowText = function () {
        return TextManager_1.TextManager.saveMessage;
    };
    Scene_Save.prototype.firstSavefileIndex = function () {
        return DataManager_1.DataManager.lastAccessedSavefileId() - 1;
    };
    Scene_Save.prototype.onSavefileOk = function () {
        _super.prototype.onSavefileOk.call(this);
        globals_1.$gameSystem.onBeforeSave();
        if (DataManager_1.DataManager.saveGame(this.savefileId())) {
            this.onSaveSuccess();
        }
        else {
            this.onSaveFailure();
        }
    };
    Scene_Save.prototype.onSaveSuccess = function () {
        SoundManager_1.SoundManager.playSave();
        StorageManager_1.StorageManager.cleanBackup(this.savefileId());
        this.popScene();
    };
    Scene_Save.prototype.onSaveFailure = function () {
        SoundManager_1.SoundManager.playBuzzer();
        this.activateListWindow();
    };
    return Scene_Save;
}(SceneFile_1.Scene_File));
exports.Scene_Save = Scene_Save;
