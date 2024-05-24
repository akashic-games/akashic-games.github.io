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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window_ItemCategory = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var WindowHorzCommand_1 = require("./WindowHorzCommand");
var Window_ItemCategory = /** @class */ (function (_super) {
    __extends(Window_ItemCategory, _super);
    function Window_ItemCategory(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
    }
    Window_ItemCategory.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
    };
    Window_ItemCategory.prototype.windowWidth = function () {
        return core_1.Graphics.boxWidth;
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
        this.addCommand(managers_1.TextManager.item, "item");
        this.addCommand(managers_1.TextManager.weapon, "weapon");
        this.addCommand(managers_1.TextManager.armor, "armor");
        this.addCommand(managers_1.TextManager.keyItem, "keyItem");
    };
    Window_ItemCategory.prototype.setItemWindow = function (itemWindow) {
        this._itemWindow = itemWindow;
    };
    return Window_ItemCategory;
}(WindowHorzCommand_1.Window_HorzCommand));
exports.Window_ItemCategory = Window_ItemCategory;
