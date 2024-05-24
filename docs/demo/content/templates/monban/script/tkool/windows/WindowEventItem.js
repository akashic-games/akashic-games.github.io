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
exports.Window_EventItem = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowItemList_1 = require("./WindowItemList");
var Window_EventItem = /** @class */ (function (_super) {
    __extends(Window_EventItem, _super);
    function Window_EventItem(scene, messageWindow) {
        return _super.call(this, scene, messageWindow) || this;
        // if (Object.getPrototypeOf(this) === Window_EventItem.prototype) {
        // 	this.initialize(param.messageWindow);
        // }
    }
    Window_EventItem.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._messageWindow = args[0];
        var width = core_1.Graphics.boxWidth;
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, 0, 0, width, height);
        this.openness = 0;
        this.deactivate();
        this.setHandler("ok", this.onOk.bind(this));
        this.setHandler("cancel", this.onCancel.bind(this));
    };
    Window_EventItem.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_EventItem.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_EventItem.prototype.start = function () {
        this.refresh();
        this.updatePlacement();
        this.select(0);
        this.open();
        this.activate();
    };
    Window_EventItem.prototype.updatePlacement = function () {
        if (this._messageWindow.y >= core_1.Graphics.boxHeight / 2) {
            this.y = 0;
        }
        else {
            this.y = core_1.Graphics.boxHeight - this.height;
        }
    };
    Window_EventItem.prototype.includes = function (item) {
        var itypeId = DataManager_1.$gameMessage.itemChoiceItypeId();
        return managers_1.DataManager.isItem(item) && item.itypeId === itypeId;
    };
    Window_EventItem.prototype.isEnabled = function (_item) {
        return true;
    };
    Window_EventItem.prototype.onOk = function () {
        var item = this.item();
        var itemId = item ? item.id : 0;
        DataManager_1.$gameVariables.setValue(DataManager_1.$gameMessage.itemChoiceVariableId(), itemId);
        this._messageWindow.terminateMessage();
        this.close();
    };
    Window_EventItem.prototype.onCancel = function () {
        DataManager_1.$gameVariables.setValue(DataManager_1.$gameMessage.itemChoiceVariableId(), 0);
        this._messageWindow.terminateMessage();
        this.close();
    };
    return Window_EventItem;
}(WindowItemList_1.Window_ItemList));
exports.Window_EventItem = Window_EventItem;
