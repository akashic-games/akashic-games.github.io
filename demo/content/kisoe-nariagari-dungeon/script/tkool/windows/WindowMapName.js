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
exports.Window_MapName = void 0;
var globals_1 = require("../managers/globals");
var WindowBase_1 = require("./WindowBase");
var Window_MapName = /** @class */ (function (_super) {
    __extends(Window_MapName, _super);
    function Window_MapName() {
        return _super.call(this) || this;
        // if (Object.getPrototypeOf(this) === Window_MapName.prototype) {
        // 	this.initialize();
        // }
    }
    Window_MapName.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, 0, 0, width, height);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;
        this.refresh();
    };
    Window_MapName.prototype.windowWidth = function () {
        return 360;
    };
    Window_MapName.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };
    Window_MapName.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._showCount > 0 && globals_1.$gameMap.isNameDisplayEnabled()) {
            this.updateFadeIn();
            this._showCount--;
        }
        else {
            this.updateFadeOut();
        }
    };
    Window_MapName.prototype.updateFadeIn = function () {
        this.contentsOpacity += 16;
    };
    Window_MapName.prototype.updateFadeOut = function () {
        this.contentsOpacity -= 16;
    };
    Window_MapName.prototype.open = function () {
        this.refresh();
        this._showCount = 150;
    };
    Window_MapName.prototype.close = function () {
        this._showCount = 0;
    };
    Window_MapName.prototype.refresh = function () {
        this.contents.clear();
        if (globals_1.$gameMap.displayName()) {
            var width = this.contentsWidth();
            this.drawBackground(0, 0, width, this.lineHeight());
            this.drawText(globals_1.$gameMap.displayName(), 0, 0, width, "center");
        }
    };
    Window_MapName.prototype.drawBackground = function (x, y, width, height) {
        var color1 = this.dimColor1();
        var color2 = this.dimColor2();
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    };
    return Window_MapName;
}(WindowBase_1.Window_Base));
exports.Window_MapName = Window_MapName;
