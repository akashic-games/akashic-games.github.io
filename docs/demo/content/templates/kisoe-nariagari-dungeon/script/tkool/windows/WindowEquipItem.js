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
exports.Window_EquipItem = void 0;
var JsonEx_1 = require("../core/JsonEx");
var WindowItemList_1 = require("./WindowItemList");
var Window_EquipItem = /** @class */ (function (_super) {
    __extends(Window_EquipItem, _super);
    function Window_EquipItem(scene, x, y, width, height) {
        return _super.call(this, scene, x, y, width, height) || this;
    }
    Window_EquipItem.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._slotId = 0;
    };
    Window_EquipItem.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };
    Window_EquipItem.prototype.setSlotId = function (slotId) {
        if (this._slotId !== slotId) {
            this._slotId = slotId;
            this.refresh();
            this.resetScroll();
        }
    };
    Window_EquipItem.prototype.includes = function (item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
            return false;
        }
        return this._actor.canEquip(item);
    };
    Window_EquipItem.prototype.isEnabled = function (_item) {
        return true;
    };
    Window_EquipItem.prototype.selectLast = function () {
        //
    };
    Window_EquipItem.prototype.setStatusWindow = function (statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };
    Window_EquipItem.prototype.updateHelp = function () {
        _super.prototype.updateHelp.call(this);
        if (this._actor && this._statusWindow) {
            var actor = JsonEx_1.JsonEx.makeDeepCopy(this._actor);
            actor.forceChangeEquip(this._slotId, this.item());
            this._statusWindow.setTempActor(actor);
        }
    };
    Window_EquipItem.prototype.playOkSound = function () {
        //
    };
    return Window_EquipItem;
}(WindowItemList_1.Window_ItemList));
exports.Window_EquipItem = Window_EquipItem;
