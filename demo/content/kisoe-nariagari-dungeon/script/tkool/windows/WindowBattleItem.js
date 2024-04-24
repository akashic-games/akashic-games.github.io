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
exports.Window_BattleItem = void 0;
var globals_1 = require("../managers/globals");
var WindowItemList_1 = require("./WindowItemList");
var Window_BattleItem = /** @class */ (function (_super) {
    __extends(Window_BattleItem, _super);
    function Window_BattleItem(x, y, width, height) {
        return _super.call(this, x, y, width, height) || this;
    }
    Window_BattleItem.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this.hide();
    };
    Window_BattleItem.prototype.includes = function (item) {
        return globals_1.$gameParty.canUse(item);
    };
    Window_BattleItem.prototype.show = function () {
        this.selectLast();
        this.showHelpWindow();
        _super.prototype.show.call(this);
    };
    Window_BattleItem.prototype.hide = function () {
        this.hideHelpWindow();
        _super.prototype.hide.call(this);
    };
    return Window_BattleItem;
}(WindowItemList_1.Window_ItemList));
exports.Window_BattleItem = Window_BattleItem;
