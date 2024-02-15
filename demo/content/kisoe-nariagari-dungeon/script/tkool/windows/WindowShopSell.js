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
exports.Window_ShopSell = void 0;
var WindowItemList_1 = require("./WindowItemList");
var Window_ShopSell = /** @class */ (function (_super) {
    __extends(Window_ShopSell, _super);
    function Window_ShopSell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_ShopSell.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
    };
    Window_ShopSell.prototype.isEnabled = function (item) {
        return item && item.price > 0;
    };
    return Window_ShopSell;
}(WindowItemList_1.Window_ItemList));
exports.Window_ShopSell = Window_ShopSell;
