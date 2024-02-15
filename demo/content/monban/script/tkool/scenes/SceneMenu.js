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
exports.Scene_Menu = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var windows_1 = require("../windows");
var WindowGold_1 = require("../windows/WindowGold");
var WindowMenuStatus_1 = require("../windows/WindowMenuStatus");
var SceneEquip_1 = require("./SceneEquip");
var SceneGameEnd_1 = require("./SceneGameEnd");
var SceneItem_1 = require("./SceneItem");
var SceneMenuBase_1 = require("./SceneMenuBase");
var SceneSkill_1 = require("./SceneSkill");
var SceneStatus_1 = require("./SceneStatus");
var Scene_Menu = /** @class */ (function (_super) {
    __extends(Scene_Menu, _super);
    function Scene_Menu() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Menu.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Menu.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Menu.prototype.create = function () {
        SceneMenuBase_1.Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createGoldWindow();
        this.createStatusWindow();
    };
    Scene_Menu.prototype.start = function () {
        SceneMenuBase_1.Scene_MenuBase.prototype.start.call(this);
        this._statusWindow.refresh();
    };
    Scene_Menu.prototype.createCommandWindow = function () {
        this._commandWindow = new windows_1.Window_MenuCommand(0, 0);
        this._commandWindow.setHandler("item", this.commandItem.bind(this));
        this._commandWindow.setHandler("skill", this.commandPersonal.bind(this));
        this._commandWindow.setHandler("equip", this.commandPersonal.bind(this));
        this._commandWindow.setHandler("status", this.commandPersonal.bind(this));
        this._commandWindow.setHandler("formation", this.commandFormation.bind(this));
        // オプション機能とセーブ機能は非サポート要件なので、コメントアウト
        // this._commandWindow.setHandler("options",   this.commandOptions.bind(this));
        // this._commandWindow.setHandler("save",      this.commandSave.bind(this));
        this._commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };
    Scene_Menu.prototype.createGoldWindow = function () {
        this._goldWindow = new WindowGold_1.Window_Gold(0, 0);
        this._goldWindow.y = core_1.Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };
    Scene_Menu.prototype.createStatusWindow = function () {
        this._statusWindow = new WindowMenuStatus_1.Window_MenuStatus(this._commandWindow.width, 0);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };
    Scene_Menu.prototype.commandItem = function () {
        managers_1.SceneManager.push(SceneItem_1.Scene_Item);
    };
    Scene_Menu.prototype.commandPersonal = function () {
        this._statusWindow.setFormationMode(false);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler("ok", this.onPersonalOk.bind(this));
        this._statusWindow.setHandler("cancel", this.onPersonalCancel.bind(this));
    };
    Scene_Menu.prototype.commandFormation = function () {
        this._statusWindow.setFormationMode(true);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler("ok", this.onFormationOk.bind(this));
        this._statusWindow.setHandler("cancel", this.onFormationCancel.bind(this));
    };
    // オプション機能は非サポート要件なのでコメントアウト
    // commandOptions(): void {
    // 	SceneManager.push(Scene_Options);
    // }
    // セーブ機能は非サポート要件なのでコメントアウト
    // commandSave(): void {
    // 	SceneManager.push(Scene_Save);
    // }
    Scene_Menu.prototype.commandGameEnd = function () {
        managers_1.SceneManager.push(SceneGameEnd_1.Scene_GameEnd);
    };
    Scene_Menu.prototype.onPersonalOk = function () {
        switch (this._commandWindow.currentSymbol()) {
            case "skill":
                managers_1.SceneManager.push(SceneSkill_1.Scene_Skill);
                break;
            case "equip":
                managers_1.SceneManager.push(SceneEquip_1.Scene_Equip);
                break;
            case "status":
                managers_1.SceneManager.push(SceneStatus_1.Scene_Status);
                break;
        }
    };
    Scene_Menu.prototype.onPersonalCancel = function () {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    };
    Scene_Menu.prototype.onFormationOk = function () {
        var index = this._statusWindow.index();
        // const actor = $gameParty.members()[index];
        var pendingIndex = this._statusWindow.pendingIndex();
        if (pendingIndex >= 0) {
            DataManager_1.$gameParty.swapOrder(index, pendingIndex);
            this._statusWindow.setPendingIndex(-1);
            this._statusWindow.redrawItem(index);
        }
        else {
            this._statusWindow.setPendingIndex(index);
        }
        this._statusWindow.activate();
    };
    Scene_Menu.prototype.onFormationCancel = function () {
        if (this._statusWindow.pendingIndex() >= 0) {
            this._statusWindow.setPendingIndex(-1);
            this._statusWindow.activate();
        }
        else {
            this._statusWindow.deselect();
            this._commandWindow.activate();
        }
    };
    return Scene_Menu;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_Menu = Scene_Menu;
