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
exports.Window_EquipSlot = void 0;
var DataManager_1 = require("../managers/DataManager");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_EquipSlot = /** @class */ (function (_super) {
    __extends(Window_EquipSlot, _super);
    function Window_EquipSlot(scene, x, y, width, height) {
        return _super.call(this, scene, x, y, width, height) || this;
    }
    Window_EquipSlot.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this.refresh();
    };
    Window_EquipSlot.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };
    Window_EquipSlot.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._itemWindow) {
            this._itemWindow.setSlotId(this.index());
        }
    };
    Window_EquipSlot.prototype.maxItems = function () {
        return this._actor ? this._actor.equipSlots().length : 0;
    };
    Window_EquipSlot.prototype.item = function () {
        return this._actor ? this._actor.equips()[this.index()] : null;
    };
    Window_EquipSlot.prototype.drawItem = function (index) {
        if (this._actor) {
            var rect = this.itemRectForText(index);
            this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
            this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
            this.changePaintOpacity(true);
        }
    };
    Window_EquipSlot.prototype.slotName = function (index) {
        var slots = this._actor.equipSlots();
        return this._actor ? DataManager_1.$dataSystem.equipTypes[slots[index]] : "";
    };
    Window_EquipSlot.prototype.isEnabled = function (index) {
        return this._actor ? this._actor.isEquipChangeOk(index) : false;
    };
    Window_EquipSlot.prototype.isCurrentItemEnabled = function () {
        return this.isEnabled(this.index());
    };
    Window_EquipSlot.prototype.setStatusWindow = function (statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };
    Window_EquipSlot.prototype.setItemWindow = function (itemWindow) {
        this._itemWindow = itemWindow;
    };
    Window_EquipSlot.prototype.updateHelp = function () {
        _super.prototype.updateHelp.call(this);
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setTempActor(null);
        }
    };
    return Window_EquipSlot;
}(WindowSelectable_1.Window_Selectable));
exports.Window_EquipSlot = Window_EquipSlot;
