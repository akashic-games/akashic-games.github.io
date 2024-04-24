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
exports.Scene_Load = void 0;
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var SceneManager_1 = require("../managers/SceneManager");
var SoundManager_1 = require("../managers/SoundManager");
var TextManager_1 = require("../managers/TextManager");
var SceneFile_1 = require("./SceneFile");
var SceneMap_1 = require("./SceneMap");
var Scene_Load = /** @class */ (function (_super) {
    __extends(Scene_Load, _super);
    function Scene_Load() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Load.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Load.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._loadSuccess = false;
    };
    Scene_Load.prototype.terminate = function () {
        _super.prototype.terminate.call(this);
        if (this._loadSuccess) {
            globals_1.$gameSystem.onAfterLoad();
        }
    };
    Scene_Load.prototype.mode = function () {
        return "load";
    };
    Scene_Load.prototype.helpWindowText = function () {
        return TextManager_1.TextManager.loadMessage;
    };
    Scene_Load.prototype.firstSavefileIndex = function () {
        return DataManager_1.DataManager.latestSavefileId() - 1;
    };
    Scene_Load.prototype.onSavefileOk = function () {
        _super.prototype.onSavefileOk.call(this);
        if (DataManager_1.DataManager.loadGame(this.savefileId())) {
            this.onLoadSuccess();
        }
        else {
            this.onLoadFailure();
        }
    };
    Scene_Load.prototype.onLoadSuccess = function () {
        SoundManager_1.SoundManager.playLoad();
        this.fadeOutAll();
        this.reloadMapIfUpdated();
        SceneManager_1.SceneManager.goto(SceneMap_1.Scene_Map);
        this._loadSuccess = true;
    };
    Scene_Load.prototype.onLoadFailure = function () {
        SoundManager_1.SoundManager.playBuzzer();
        this.activateListWindow();
    };
    Scene_Load.prototype.reloadMapIfUpdated = function () {
        if (globals_1.$gameSystem.versionId() !== globals_1.$dataSystem.versionId) {
            globals_1.$gamePlayer.reserveTransfer(globals_1.$gameMap.mapId(), globals_1.$gamePlayer.x, globals_1.$gamePlayer.y);
            globals_1.$gamePlayer.requestMapReload();
        }
    };
    return Scene_Load;
}(SceneFile_1.Scene_File));
exports.Scene_Load = Scene_Load;
