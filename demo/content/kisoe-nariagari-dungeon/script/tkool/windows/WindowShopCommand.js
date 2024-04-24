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
exports.Window_ShopCommand = void 0;
var TextManager_1 = require("../managers/TextManager");
var WindowHorzCommand_1 = require("./WindowHorzCommand");
var Window_ShopCommand = /** @class */ (function (_super) {
    __extends(Window_ShopCommand, _super);
    function Window_ShopCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_ShopCommand.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var width = args[0];
        var purchaseOnly = args[1];
        this._windowWidth = width;
        this._purchaseOnly = purchaseOnly;
        _super.prototype.initialize.call(this, 0, 0);
    };
    Window_ShopCommand.prototype.windowWidth = function () {
        return this._windowWidth;
    };
    Window_ShopCommand.prototype.maxCols = function () {
        return 3;
    };
    Window_ShopCommand.prototype.makeCommandList = function () {
        this.addCommand(TextManager_1.TextManager.buy, "buy");
        this.addCommand(TextManager_1.TextManager.sell, "sell", !this._purchaseOnly);
        this.addCommand(TextManager_1.TextManager.cancel, "cancel");
    };
    return Window_ShopCommand;
}(WindowHorzCommand_1.Window_HorzCommand));
exports.Window_ShopCommand = Window_ShopCommand;
