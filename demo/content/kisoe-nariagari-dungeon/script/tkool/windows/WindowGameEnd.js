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
exports.Window_GameEnd = void 0;
var Graphics_1 = require("../core/Graphics");
var TextManager_1 = require("../managers/TextManager");
var WindowCommand_1 = require("./WindowCommand");
var Window_GameEnd = /** @class */ (function (_super) {
    __extends(Window_GameEnd, _super);
    function Window_GameEnd() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_GameEnd.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
        this.updatePlacement();
        this.openness = 0;
        this.open();
    };
    Window_GameEnd.prototype.windowWidth = function () {
        return 240;
    };
    Window_GameEnd.prototype.updatePlacement = function () {
        this.x = (Graphics_1.Graphics.boxWidth - this.width) / 2;
        this.y = (Graphics_1.Graphics.boxHeight - this.height) / 2;
    };
    Window_GameEnd.prototype.makeCommandList = function () {
        this.addCommand(TextManager_1.TextManager.toTitle, "toTitle");
        this.addCommand(TextManager_1.TextManager.cancel, "cancel");
    };
    return Window_GameEnd;
}(WindowCommand_1.Window_Command));
exports.Window_GameEnd = Window_GameEnd;
