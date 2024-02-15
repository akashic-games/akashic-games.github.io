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
exports.Scene_Shop = void 0;
var Graphics_1 = require("../core/Graphics");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var windows_1 = require("../windows");
var WindowGold_1 = require("../windows/WindowGold");
var WindowItemCategory_1 = require("../windows/WindowItemCategory");
var WindowShopBuy_1 = require("../windows/WindowShopBuy");
var WindowShopCommand_1 = require("../windows/WindowShopCommand");
var WindowShopNumber_1 = require("../windows/WindowShopNumber");
var WindowShopSell_1 = require("../windows/WindowShopSell");
var WindowShopStatus_1 = require("../windows/WindowShopStatus");
var SceneMenuBase_1 = require("./SceneMenuBase");
var Scene_Shop = /** @class */ (function (_super) {
    __extends(Scene_Shop, _super);
    function Scene_Shop() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Shop.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Shop.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Shop.prototype.prepare = function (goods, purchaseOnly) {
        this._goods = goods;
        this._purchaseOnly = purchaseOnly;
        this._item = null;
    };
    Scene_Shop.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        this.createNumberWindow();
        this.createStatusWindow();
        this.createBuyWindow();
        this.createCategoryWindow();
        this.createSellWindow();
    };
    Scene_Shop.prototype.createGoldWindow = function () {
        this._goldWindow = new WindowGold_1.Window_Gold(0, this._helpWindow.height);
        this._goldWindow.x = Graphics_1.Graphics.boxWidth - this._goldWindow.width;
        this.addWindow(this._goldWindow);
    };
    Scene_Shop.prototype.createCommandWindow = function () {
        this._commandWindow = new WindowShopCommand_1.Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
        this._commandWindow.y = this._helpWindow.height;
        this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
        this._commandWindow.setHandler("sell", this.commandSell.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };
    Scene_Shop.prototype.createDummyWindow = function () {
        var wy = this._commandWindow.y + this._commandWindow.height;
        var wh = Graphics_1.Graphics.boxHeight - wy;
        this._dummyWindow = new windows_1.Window_Base(0, wy, Graphics_1.Graphics.boxWidth, wh);
        this.addWindow(this._dummyWindow);
    };
    Scene_Shop.prototype.createNumberWindow = function () {
        var wy = this._dummyWindow.y;
        var wh = this._dummyWindow.height;
        this._numberWindow = new WindowShopNumber_1.Window_ShopNumber(0, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
        this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };
    Scene_Shop.prototype.createStatusWindow = function () {
        var wx = this._numberWindow.width;
        var wy = this._dummyWindow.y;
        var ww = Graphics_1.Graphics.boxWidth - wx;
        var wh = this._dummyWindow.height;
        this._statusWindow = new WindowShopStatus_1.Window_ShopStatus(wx, wy, ww, wh);
        this._statusWindow.hide();
        this.addWindow(this._statusWindow);
    };
    Scene_Shop.prototype.createBuyWindow = function () {
        var wy = this._dummyWindow.y;
        var wh = this._dummyWindow.height;
        this._buyWindow = new WindowShopBuy_1.Window_ShopBuy(0, wy, wh, this._goods);
        this._buyWindow.setHelpWindow(this._helpWindow);
        this._buyWindow.setStatusWindow(this._statusWindow);
        this._buyWindow.hide();
        this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
        this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
        this.addWindow(this._buyWindow);
    };
    Scene_Shop.prototype.createCategoryWindow = function () {
        this._categoryWindow = new WindowItemCategory_1.Window_ItemCategory();
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.y = this._dummyWindow.y;
        this._categoryWindow.hide();
        this._categoryWindow.deactivate();
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
        this.addWindow(this._categoryWindow);
    };
    Scene_Shop.prototype.createSellWindow = function () {
        var wy = this._categoryWindow.y + this._categoryWindow.height;
        var wh = Graphics_1.Graphics.boxHeight - wy;
        this._sellWindow = new WindowShopSell_1.Window_ShopSell(0, wy, Graphics_1.Graphics.boxWidth, wh);
        this._sellWindow.setHelpWindow(this._helpWindow);
        this._sellWindow.hide();
        this._sellWindow.setHandler("ok", this.onSellOk.bind(this));
        this._sellWindow.setHandler("cancel", this.onSellCancel.bind(this));
        this._categoryWindow.setItemWindow(this._sellWindow);
        this.addWindow(this._sellWindow);
    };
    Scene_Shop.prototype.activateBuyWindow = function () {
        this._buyWindow.setMoney(this.money());
        this._buyWindow.show();
        this._buyWindow.activate();
        this._statusWindow.show();
    };
    Scene_Shop.prototype.activateSellWindow = function () {
        this._categoryWindow.show();
        this._sellWindow.refresh();
        this._sellWindow.show();
        this._sellWindow.activate();
        this._statusWindow.hide();
    };
    Scene_Shop.prototype.commandBuy = function () {
        this._dummyWindow.hide();
        this.activateBuyWindow();
    };
    Scene_Shop.prototype.commandSell = function () {
        this._dummyWindow.hide();
        this._categoryWindow.show();
        this._categoryWindow.activate();
        this._sellWindow.show();
        this._sellWindow.deselect();
        this._sellWindow.refresh();
    };
    Scene_Shop.prototype.onBuyOk = function () {
        this._item = this._buyWindow.item();
        this._buyWindow.hide();
        this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
    };
    Scene_Shop.prototype.onBuyCancel = function () {
        this._commandWindow.activate();
        this._dummyWindow.show();
        this._buyWindow.hide();
        this._statusWindow.hide();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
    };
    Scene_Shop.prototype.onCategoryOk = function () {
        this.activateSellWindow();
        this._sellWindow.select(0);
    };
    Scene_Shop.prototype.onCategoryCancel = function () {
        this._commandWindow.activate();
        this._dummyWindow.show();
        this._categoryWindow.hide();
        this._sellWindow.hide();
    };
    Scene_Shop.prototype.onSellOk = function () {
        this._item = this._sellWindow.item();
        this._categoryWindow.hide();
        this._sellWindow.hide();
        this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
        this._statusWindow.setItem(this._item);
        this._statusWindow.show();
    };
    Scene_Shop.prototype.onSellCancel = function () {
        this._sellWindow.deselect();
        this._categoryWindow.activate();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
    };
    Scene_Shop.prototype.onNumberOk = function () {
        managers_1.SoundManager.playShop();
        switch (this._commandWindow.currentSymbol()) {
            case "buy":
                this.doBuy(this._numberWindow.number());
                break;
            case "sell":
                this.doSell(this._numberWindow.number());
                break;
        }
        this.endNumberInput();
        this._goldWindow.refresh();
        this._statusWindow.refresh();
    };
    Scene_Shop.prototype.onNumberCancel = function () {
        managers_1.SoundManager.playCancel();
        this.endNumberInput();
    };
    Scene_Shop.prototype.doBuy = function (number) {
        DataManager_1.$gameParty.loseGold(number * this.buyingPrice());
        DataManager_1.$gameParty.gainItem(this._item, number);
    };
    Scene_Shop.prototype.doSell = function (number) {
        DataManager_1.$gameParty.gainGold(number * this.sellingPrice());
        DataManager_1.$gameParty.loseItem(this._item, number);
    };
    Scene_Shop.prototype.endNumberInput = function () {
        this._numberWindow.hide();
        switch (this._commandWindow.currentSymbol()) {
            case "buy":
                this.activateBuyWindow();
                break;
            case "sell":
                this.activateSellWindow();
                break;
        }
    };
    Scene_Shop.prototype.maxBuy = function () {
        var max = DataManager_1.$gameParty.maxItems(this._item) - DataManager_1.$gameParty.numItems(this._item);
        var price = this.buyingPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        }
        else {
            return max;
        }
    };
    Scene_Shop.prototype.maxSell = function () {
        return DataManager_1.$gameParty.numItems(this._item);
    };
    Scene_Shop.prototype.money = function () {
        return this._goldWindow.value();
    };
    Scene_Shop.prototype.currencyUnit = function () {
        return this._goldWindow.currencyUnit();
    };
    Scene_Shop.prototype.buyingPrice = function () {
        return this._buyWindow.price(this._item);
    };
    Scene_Shop.prototype.sellingPrice = function () {
        return Math.floor(this._item.price / 2);
    };
    return Scene_Shop;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_Shop = Scene_Shop;
