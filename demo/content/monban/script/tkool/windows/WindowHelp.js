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
exports.Window_Help = void 0;
var core_1 = require("../core");
var WindowBase_1 = require("./WindowBase");
var Window_Help = /** @class */ (function (_super) {
    __extends(Window_Help, _super);
    function Window_Help(scene, numLines) {
        return _super.call(this, scene, numLines) || this;
    }
    Window_Help.prototype.initialize = function (numLines) {
        var width = core_1.Graphics.boxWidth;
        var height = this.fittingHeight(numLines || 2);
        _super.prototype.initialize.call(this, 0, 0, width, height);
        this._text = "";
    };
    Window_Help.prototype.setText = function (text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };
    Window_Help.prototype.clear = function () {
        this.setText("");
    };
    Window_Help.prototype.setItem = function (item) {
        this.setText(item ? item.description : "");
    };
    Window_Help.prototype.refresh = function () {
        this.contents.clear();
        this.drawTextEx(this._text, this.textPadding(), 0);
    };
    return Window_Help;
}(WindowBase_1.Window_Base));
exports.Window_Help = Window_Help;
