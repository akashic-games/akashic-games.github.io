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
exports.Window_ItemList = void 0;
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_ItemList = /** @class */ (function (_super) {
    __extends(Window_ItemList, _super);
    function Window_ItemList() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_ItemList.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this._category = "none";
        this._data = [];
    };
    Window_ItemList.prototype.setCategory = function (category) {
        if (this._category !== category) {
            this._category = category;
            this.refresh();
            this.resetScroll();
        }
    };
    Window_ItemList.prototype.maxCols = function () {
        return 2;
    };
    Window_ItemList.prototype.spacing = function () {
        return 48;
    };
    Window_ItemList.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };
    Window_ItemList.prototype.item = function () {
        var index = this.index();
        return this._data && index >= 0 ? this._data[index] : null;
    };
    Window_ItemList.prototype.isCurrentItemEnabled = function () {
        return this.isEnabled(this.item());
    };
    Window_ItemList.prototype.includes = function (item) {
        switch (this._category) {
            case "item":
                return managers_1.DataManager.isItem(item) && item.itypeId === 1;
            case "weapon":
                return managers_1.DataManager.isWeapon(item);
            case "armor":
                return managers_1.DataManager.isArmor(item);
            case "keyItem":
                return managers_1.DataManager.isItem(item) && item.itypeId === 2;
            default:
                return false;
        }
    };
    Window_ItemList.prototype.needsNumber = function () {
        return true;
    };
    Window_ItemList.prototype.isEnabled = function (item) {
        return DataManager_1.$gameParty.canUse(item);
    };
    Window_ItemList.prototype.makeItemList = function () {
        var _this = this;
        this._data = DataManager_1.$gameParty.allItems().filter(function (item) {
            return _this.includes(item);
        });
        if (this.includes(null)) {
            this._data.push(null);
        }
    };
    Window_ItemList.prototype.selectLast = function () {
        var index = this._data.indexOf(DataManager_1.$gameParty.lastItem());
        this.select(index >= 0 ? index : 0);
    };
    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(/* 1*/ true);
        }
    };
    Window_ItemList.prototype.numberWidth = function () {
        return this.textWidth("000");
    };
    Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(":", x, y, width - this.textWidth("00"), "right");
            this.drawText(DataManager_1.$gameParty.numItems(item), x, y, width, "right");
        }
    };
    Window_ItemList.prototype.updateHelp = function () {
        this.setHelpWindowItem(this.item());
    };
    Window_ItemList.prototype.refresh = function () {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };
    return Window_ItemList;
}(WindowSelectable_1.Window_Selectable));
exports.Window_ItemList = Window_ItemList;
