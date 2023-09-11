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
exports.Window_ShopStatus = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowBase_1 = require("./WindowBase");
var Window_ShopStatus = /** @class */ (function (_super) {
    __extends(Window_ShopStatus, _super);
    function Window_ShopStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_ShopStatus.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._pageIndex = 0;
        this.refresh();
    };
    Window_ShopStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._item) {
            var x = this.textPadding();
            this.drawPossession(x, 0);
            if (this.isEquipItem()) {
                this.drawEquipInfo(x, this.lineHeight() * 2);
            }
        }
    };
    Window_ShopStatus.prototype.setItem = function (item) {
        this._item = item;
        this.refresh();
    };
    Window_ShopStatus.prototype.isEquipItem = function () {
        return managers_1.DataManager.isWeapon(this._item) || managers_1.DataManager.isArmor(this._item);
    };
    Window_ShopStatus.prototype.drawPossession = function (x, y) {
        var width = this.contents.width - this.textPadding() - x;
        var possessionWidth = this.textWidth("0000");
        this.changeTextColor(this.systemColor());
        this.drawText(managers_1.TextManager.possession, x, y, width - possessionWidth);
        this.resetTextColor();
        this.drawText(DataManager_1.$gameParty.numItems(this._item), x, y, width, "right");
    };
    Window_ShopStatus.prototype.drawEquipInfo = function (x, y) {
        var members = this.statusMembers();
        for (var i = 0; i < members.length; i++) {
            this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 2.4), members[i]);
        }
    };
    Window_ShopStatus.prototype.statusMembers = function () {
        var start = this._pageIndex * this.pageSize();
        var end = start + this.pageSize();
        return DataManager_1.$gameParty.members().slice(start, end);
    };
    Window_ShopStatus.prototype.pageSize = function () {
        return 4;
    };
    Window_ShopStatus.prototype.maxPages = function () {
        return Math.floor((DataManager_1.$gameParty.size() + this.pageSize() - 1) / this.pageSize());
    };
    Window_ShopStatus.prototype.drawActorEquipInfo = function (x, y, actor) {
        var enabled = actor.canEquip(this._item);
        this.changePaintOpacity(enabled);
        this.resetTextColor();
        this.drawText(actor.name(), x, y, 168);
        var item1 = this.currentEquippedItem(actor, this._item.etypeId);
        if (enabled) {
            this.drawActorParamChange(x, y, actor, item1);
        }
        this.drawItemName(item1, x, y + this.lineHeight());
        this.changePaintOpacity(true);
    };
    Window_ShopStatus.prototype.drawActorParamChange = function (x, y, _actor, item1) {
        var width = this.contents.width - this.textPadding() - x;
        var paramId = this.paramId();
        var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
        this.changeTextColor(this.paramchangeTextColor(change));
        this.drawText((change > 0 ? "+" : "") + change, x, y, width, "right");
    };
    Window_ShopStatus.prototype.paramId = function () {
        return managers_1.DataManager.isWeapon(this._item) ? 2 : 3;
    };
    Window_ShopStatus.prototype.currentEquippedItem = function (actor, etypeId) {
        var list = [];
        var equips = actor.equips();
        var slots = actor.equipSlots();
        for (var i = 0; i < slots.length; i++) {
            if (slots[i] === etypeId) {
                list.push(equips[i]);
            }
        }
        var paramId = this.paramId();
        var worstParam = Number.MAX_VALUE;
        var worstItem = null;
        for (var j = 0; j < list.length; j++) {
            if (list[j] && list[j].params[paramId] < worstParam) {
                worstParam = list[j].params[paramId];
                worstItem = list[j];
            }
        }
        return worstItem;
    };
    Window_ShopStatus.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updatePage();
    };
    Window_ShopStatus.prototype.updatePage = function () {
        if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
            this.changePage();
        }
    };
    Window_ShopStatus.prototype.isPageChangeEnabled = function () {
        return this.visible && this.maxPages() >= 2;
    };
    Window_ShopStatus.prototype.isPageChangeRequested = function () {
        // if (Input.isTriggered('shift')) {
        // 	return true;
        // }
        // if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        // 	return true;
        // }
        return false;
    };
    Window_ShopStatus.prototype.isTouchedInsideFrame = function () {
        var x = this.canvasToLocalX(core_1.TouchInput.x);
        var y = this.canvasToLocalY(core_1.TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };
    Window_ShopStatus.prototype.changePage = function () {
        this._pageIndex = (this._pageIndex + 1) % this.maxPages();
        this.refresh();
        managers_1.SoundManager.playCursor();
    };
    return Window_ShopStatus;
}(WindowBase_1.Window_Base));
exports.Window_ShopStatus = Window_ShopStatus;
