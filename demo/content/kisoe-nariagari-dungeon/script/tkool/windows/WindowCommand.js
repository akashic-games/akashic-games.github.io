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
exports.Window_Command = void 0;
var WindowSelectable_1 = require("./WindowSelectable");
var Window_Command = /** @class */ (function (_super) {
    __extends(Window_Command, _super);
    function Window_Command() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
        // if (Object.getPrototypeOf(this) === Window_Command.prototype) {
        // 	this.initialize(this.x, this.y);
        // }
    }
    Window_Command.prototype.initialize = function (x, y) {
        this.clearCommandList();
        this.makeCommandList();
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.select(0);
        this.activate();
    };
    Window_Command.prototype.windowWidth = function () {
        return 240;
    };
    Window_Command.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_Command.prototype.numVisibleRows = function () {
        return Math.ceil(this.maxItems() / this.maxCols());
    };
    Window_Command.prototype.maxItems = function () {
        return this._list.length;
    };
    Window_Command.prototype.clearCommandList = function () {
        this._list = [];
    };
    Window_Command.prototype.makeCommandList = function () {
        // nothing to do.
    };
    Window_Command.prototype.addCommand = function (name, symbol, enabled, ext) {
        if (enabled === undefined) {
            enabled = true;
        }
        if (ext === undefined) {
            ext = null;
        }
        this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext });
    };
    Window_Command.prototype.commandName = function (index) {
        return this._list[index].name;
    };
    Window_Command.prototype.commandSymbol = function (index) {
        return this._list[index].symbol;
    };
    Window_Command.prototype.isCommandEnabled = function (index) {
        return this._list[index].enabled;
    };
    Window_Command.prototype.currentData = function () {
        return this.index() >= 0 ? this._list[this.index()] : null;
    };
    Window_Command.prototype.isCurrentItemEnabled = function () {
        return this.currentData() ? this.currentData().enabled : false;
    };
    Window_Command.prototype.currentSymbol = function () {
        return this.currentData() ? this.currentData().symbol : null;
    };
    Window_Command.prototype.currentExt = function () {
        return this.currentData() ? this.currentData().ext : null;
    };
    Window_Command.prototype.findSymbol = function (symbol) {
        for (var i = 0; i < this._list.length; i++) {
            if (this._list[i].symbol === symbol) {
                return i;
            }
        }
        return -1;
    };
    Window_Command.prototype.selectSymbol = function (symbol) {
        var index = this.findSymbol(symbol);
        if (index >= 0) {
            this.select(index);
        }
        else {
            this.select(0);
        }
    };
    Window_Command.prototype.findExt = function (ext) {
        for (var i = 0; i < this._list.length; i++) {
            if (this._list[i].ext === ext) {
                return i;
            }
        }
        return -1;
    };
    Window_Command.prototype.selectExt = function (ext) {
        var index = this.findExt(ext);
        if (index >= 0) {
            this.select(index);
        }
        else {
            this.select(0);
        }
    };
    Window_Command.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    };
    Window_Command.prototype.itemTextAlign = function () {
        return "left";
    };
    Window_Command.prototype.isOkEnabled = function () {
        return true;
    };
    Window_Command.prototype.callOkHandler = function () {
        var symbol = this.currentSymbol();
        if (this.isHandled(symbol)) {
            this.callHandler(symbol);
        }
        else if (this.isHandled("ok")) {
            _super.prototype.callOkHandler.call(this);
        }
        else {
            this.activate();
        }
    };
    Window_Command.prototype.refresh = function () {
        this.clearCommandList();
        this.makeCommandList();
        this.createContents();
        _super.prototype.refresh.call(this);
    };
    return Window_Command;
}(WindowSelectable_1.Window_Selectable));
exports.Window_Command = Window_Command;
