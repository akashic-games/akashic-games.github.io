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
exports.Window_ShopBuy = void 0;
var globals_1 = require("../managers/globals");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_ShopBuy = /** @class */ (function (_super) {
    __extends(Window_ShopBuy, _super);
    function Window_ShopBuy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_ShopBuy.prototype.initialize = function (x, y, height, shopGoods) {
        var width = this.windowWidth();
        _super.prototype.initialize.call(this, x, y, width, height);
        this._shopGoods = shopGoods;
        this._money = 0;
        this.refresh();
        this.select(0);
    };
    Window_ShopBuy.prototype.windowWidth = function () {
        return 456;
    };
    Window_ShopBuy.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };
    Window_ShopBuy.prototype.item = function () {
        return this._data[this.index()];
    };
    Window_ShopBuy.prototype.setMoney = function (money) {
        this._money = money;
        this.refresh();
    };
    Window_ShopBuy.prototype.isCurrentItemEnabled = function () {
        return this.isEnabled(this._data[this.index()]);
    };
    Window_ShopBuy.prototype.price = function (item) {
        return this._price[this._data.indexOf(item)] || 0;
    };
    Window_ShopBuy.prototype.isEnabled = function (item) {
        return item && this.price(item) <= this._money && !globals_1.$gameParty.hasMaxItems(item);
    };
    Window_ShopBuy.prototype.refresh = function () {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };
    Window_ShopBuy.prototype.makeItemList = function () {
        this._data = [];
        this._price = [];
        this._shopGoods.forEach(function (goods) {
            var item = null;
            switch (goods[0]) {
                case 0:
                    item = globals_1.$dataItems[goods[1]];
                    break;
                case 1:
                    item = globals_1.$dataWeapons[goods[1]];
                    break;
                case 2:
                    item = globals_1.$dataArmors[goods[1]];
                    break;
            }
            if (item) {
                this._data.push(item);
                this._price.push(goods[2] === 0 ? item.price : goods[3]);
            }
        }, this);
    };
    Window_ShopBuy.prototype.drawItem = function (index) {
        var item = this._data[index];
        var rect = this.itemRect(index);
        var priceWidth = 96;
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
        this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, "right");
        this.changePaintOpacity(true);
    };
    Window_ShopBuy.prototype.setStatusWindow = function (statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };
    Window_ShopBuy.prototype.updateHelp = function () {
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setItem(this.item());
        }
    };
    return Window_ShopBuy;
}(WindowSelectable_1.Window_Selectable));
exports.Window_ShopBuy = Window_ShopBuy;
