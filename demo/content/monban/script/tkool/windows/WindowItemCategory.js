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
exports.Window_ItemCategory = void 0;
var Graphics_1 = require("../core/Graphics");
var TextManager_1 = require("../managers/TextManager");
var WindowHorzCommand_1 = require("./WindowHorzCommand");
var Window_ItemCategory = /** @class */ (function (_super) {
    __extends(Window_ItemCategory, _super);
    function Window_ItemCategory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_ItemCategory.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
    };
    Window_ItemCategory.prototype.windowWidth = function () {
        return Graphics_1.Graphics.boxWidth;
    };
    Window_ItemCategory.prototype.maxCols = function () {
        return 4;
    };
    Window_ItemCategory.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._itemWindow) {
            this._itemWindow.setCategory(this.currentSymbol());
        }
    };
    Window_ItemCategory.prototype.makeCommandList = function () {
        this.addCommand(TextManager_1.TextManager.item, "item");
        this.addCommand(TextManager_1.TextManager.weapon, "weapon");
        this.addCommand(TextManager_1.TextManager.armor, "armor");
        this.addCommand(TextManager_1.TextManager.keyItem, "keyItem");
    };
    Window_ItemCategory.prototype.setItemWindow = function (itemWindow) {
        this._itemWindow = itemWindow;
    };
    return Window_ItemCategory;
}(WindowHorzCommand_1.Window_HorzCommand));
exports.Window_ItemCategory = Window_ItemCategory;
