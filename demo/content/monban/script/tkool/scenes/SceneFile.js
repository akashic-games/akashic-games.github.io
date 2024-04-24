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
exports.Scene_File = void 0;
var Graphics_1 = require("../core/Graphics");
var DataManager_1 = require("../managers/DataManager");
var WindowHelp_1 = require("../windows/WindowHelp");
var WindowSavefileList_1 = require("../windows/WindowSavefileList");
var SceneMenuBase_1 = require("./SceneMenuBase");
var Scene_File = /** @class */ (function (_super) {
    __extends(Scene_File, _super);
    function Scene_File() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_File.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_File.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_File.prototype.create = function () {
        _super.prototype.create.call(this);
        DataManager_1.DataManager.loadAllSavefileImages();
        this.createHelpWindow();
        this.createListWindow();
    };
    Scene_File.prototype.start = function () {
        _super.prototype.start.call(this);
        this._listWindow.refresh();
    };
    Scene_File.prototype.savefileId = function () {
        return this._listWindow.index() + 1;
    };
    Scene_File.prototype.createHelpWindow = function () {
        this._helpWindow = new WindowHelp_1.Window_Help(1);
        this._helpWindow.setText(this.helpWindowText());
        this.addWindow(this._helpWindow);
    };
    Scene_File.prototype.createListWindow = function () {
        var x = 0;
        var y = this._helpWindow.height;
        var width = Graphics_1.Graphics.boxWidth;
        var height = Graphics_1.Graphics.boxHeight - y;
        this._listWindow = new WindowSavefileList_1.Window_SavefileList(x, y, width, height);
        this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
        this._listWindow.setHandler("cancel", this.popScene.bind(this));
        this._listWindow.select(this.firstSavefileIndex());
        this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
        this._listWindow.setMode(this.mode());
        this._listWindow.refresh();
        this.addWindow(this._listWindow);
    };
    Scene_File.prototype.mode = function () {
        return null;
    };
    Scene_File.prototype.activateListWindow = function () {
        this._listWindow.activate();
    };
    Scene_File.prototype.helpWindowText = function () {
        return "";
    };
    Scene_File.prototype.firstSavefileIndex = function () {
        return 0;
    };
    Scene_File.prototype.onSavefileOk = function () {
        //
    };
    return Scene_File;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_File = Scene_File;
