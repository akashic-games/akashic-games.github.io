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
exports.Scene_Equip = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var WindowEquipCommand_1 = require("../windows/WindowEquipCommand");
var WindowEquipItem_1 = require("../windows/WindowEquipItem");
var WindowEquipSlot_1 = require("../windows/WindowEquipSlot");
var WindowEquipStatus_1 = require("../windows/WindowEquipStatus");
var SceneMenuBase_1 = require("./SceneMenuBase");
var Scene_Equip = /** @class */ (function (_super) {
    __extends(Scene_Equip, _super);
    function Scene_Equip() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Equip.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Equip.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Equip.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createHelpWindow();
        this.createStatusWindow();
        this.createCommandWindow();
        this.createSlotWindow();
        this.createItemWindow();
        this.refreshActor();
    };
    Scene_Equip.prototype.createStatusWindow = function () {
        this._statusWindow = new WindowEquipStatus_1.Window_EquipStatus(this.scene, 0, this._helpWindow.height);
        this.addWindow(this._statusWindow);
    };
    Scene_Equip.prototype.createCommandWindow = function () {
        var wx = this._statusWindow.width;
        var wy = this._helpWindow.height;
        var ww = core_1.Graphics.boxWidth - this._statusWindow.width;
        this._commandWindow = new WindowEquipCommand_1.Window_EquipCommand(this.scene, wx, wy, ww);
        this._commandWindow.setHelpWindow(this._helpWindow);
        this._commandWindow.setHandler("equip", this.commandEquip.bind(this));
        this._commandWindow.setHandler("optimize", this.commandOptimize.bind(this));
        this._commandWindow.setHandler("clear", this.commandClear.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this._commandWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._commandWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._commandWindow);
    };
    Scene_Equip.prototype.createSlotWindow = function () {
        var wx = this._statusWindow.width;
        var wy = this._commandWindow.y + this._commandWindow.height;
        var ww = core_1.Graphics.boxWidth - this._statusWindow.width;
        var wh = this._statusWindow.height - this._commandWindow.height;
        this._slotWindow = new WindowEquipSlot_1.Window_EquipSlot(this.scene, wx, wy, ww, wh);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
        this._slotWindow.setHandler("cancel", this.onSlotCancel.bind(this));
        this.addWindow(this._slotWindow);
    };
    Scene_Equip.prototype.createItemWindow = function () {
        var wx = 0;
        var wy = this._statusWindow.y + this._statusWindow.height;
        var ww = core_1.Graphics.boxWidth;
        var wh = core_1.Graphics.boxHeight - wy;
        this._itemWindow = new WindowEquipItem_1.Window_EquipItem(this.scene, wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };
    Scene_Equip.prototype.refreshActor = function () {
        var actor = this.actor();
        this._statusWindow.setActor(actor);
        this._slotWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };
    Scene_Equip.prototype.commandEquip = function () {
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };
    Scene_Equip.prototype.commandOptimize = function () {
        managers_1.SoundManager.playEquip();
        this.actor().optimizeEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._commandWindow.activate();
    };
    Scene_Equip.prototype.commandClear = function () {
        managers_1.SoundManager.playEquip();
        this.actor().clearEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._commandWindow.activate();
    };
    Scene_Equip.prototype.onSlotOk = function () {
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };
    Scene_Equip.prototype.onSlotCancel = function () {
        this._slotWindow.deselect();
        this._commandWindow.activate();
    };
    Scene_Equip.prototype.onItemOk = function () {
        managers_1.SoundManager.playEquip();
        this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
    };
    Scene_Equip.prototype.onItemCancel = function () {
        this._slotWindow.activate();
        this._itemWindow.deselect();
    };
    Scene_Equip.prototype.onActorChange = function () {
        this.refreshActor();
        this._commandWindow.activate();
    };
    return Scene_Equip;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_Equip = Scene_Equip;
