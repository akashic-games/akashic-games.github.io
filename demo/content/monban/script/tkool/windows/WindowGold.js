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
exports.Window_Gold = void 0;
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowBase_1 = require("./WindowBase");
var Window_Gold = /** @class */ (function (_super) {
    __extends(Window_Gold, _super);
    function Window_Gold(scene, x, y) {
        return _super.call(this, scene, x, y) || this;
        // if (Object.getPrototypeOf(this) === Window_Gold.prototype) {
        // 	this.initialize(param.x, param.y);
        // }
    }
    Window_Gold.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };
    Window_Gold.prototype.windowWidth = function () {
        return 240;
    };
    Window_Gold.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };
    Window_Gold.prototype.refresh = function () {
        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
    };
    Window_Gold.prototype.value = function () {
        return DataManager_1.$gameParty.gold();
    };
    Window_Gold.prototype.currencyUnit = function () {
        return managers_1.TextManager.currencyUnit;
    };
    Window_Gold.prototype.open = function () {
        this.refresh();
        _super.prototype.open.call(this);
    };
    return Window_Gold;
}(WindowBase_1.Window_Base));
exports.Window_Gold = Window_Gold;
