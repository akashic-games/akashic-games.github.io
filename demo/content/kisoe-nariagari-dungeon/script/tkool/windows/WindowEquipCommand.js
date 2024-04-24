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
exports.Window_EquipCommand = void 0;
var TextManager_1 = require("../managers/TextManager");
var WindowHorzCommand_1 = require("./WindowHorzCommand");
var Window_EquipCommand = /** @class */ (function (_super) {
    __extends(Window_EquipCommand, _super);
    function Window_EquipCommand(x, y, width) {
        return _super.call(this, x, y, width) || this;
    }
    Window_EquipCommand.prototype.initialize = function (x, y, width) {
        this._windowWidth = width;
        _super.prototype.initialize.call(this, x, y);
    };
    Window_EquipCommand.prototype.windowWidth = function () {
        return this._windowWidth;
    };
    Window_EquipCommand.prototype.maxCols = function () {
        return 3;
    };
    Window_EquipCommand.prototype.makeCommandList = function () {
        this.addCommand(TextManager_1.TextManager.equip2, "equip");
        this.addCommand(TextManager_1.TextManager.optimize, "optimize");
        this.addCommand(TextManager_1.TextManager.clear, "clear");
    };
    return Window_EquipCommand;
}(WindowHorzCommand_1.Window_HorzCommand));
exports.Window_EquipCommand = Window_EquipCommand;
