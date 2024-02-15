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
exports.Window_HorzCommand = void 0;
var WindowCommand_1 = require("./WindowCommand");
var Window_HorzCommand = /** @class */ (function (_super) {
    __extends(Window_HorzCommand, _super);
    function Window_HorzCommand() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_HorzCommand.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var x = args[0];
        var y = args[1];
        _super.prototype.initialize.call(this, x, y);
    };
    Window_HorzCommand.prototype.numVisibleRows = function () {
        return 1;
    };
    Window_HorzCommand.prototype.maxCols = function () {
        return 4;
    };
    Window_HorzCommand.prototype.itemTextAlign = function () {
        return "center";
    };
    return Window_HorzCommand;
}(WindowCommand_1.Window_Command));
exports.Window_HorzCommand = Window_HorzCommand;
