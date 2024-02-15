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
exports.Window_MenuStatus = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowBase_1 = require("./WindowBase");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_MenuStatus = /** @class */ (function (_super) {
    __extends(Window_MenuStatus, _super);
    function Window_MenuStatus() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_MenuStatus.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, x, y, width, height);
        this._formationMode = false;
        this._pendingIndex = -1;
        this.refresh();
    };
    Window_MenuStatus.prototype.windowWidth = function () {
        return core_1.Graphics.boxWidth - 240;
    };
    Window_MenuStatus.prototype.windowHeight = function () {
        return core_1.Graphics.boxHeight;
    };
    Window_MenuStatus.prototype.maxItems = function () {
        return DataManager_1.$gameParty.size();
    };
    Window_MenuStatus.prototype.itemHeight = function () {
        var clientHeight = this.height - this.padding * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };
    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_MenuStatus.prototype.loadImages = function () {
        DataManager_1.$gameParty.members().forEach(function (actor) {
            managers_1.ImageManager.reserveFace(actor.faceName());
        });
    };
    Window_MenuStatus.prototype.drawItem = function (index) {
        this.drawItemBackground(index);
        this.drawItemImage(index);
        this.drawItemStatus(index);
    };
    Window_MenuStatus.prototype.drawItemBackground = function (index) {
        if (index === this._pendingIndex) {
            var rect = this.itemRect(index);
            var color = this.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.changePaintOpacity(true);
        }
    };
    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = DataManager_1.$gameParty.members()[index];
        var rect = this.itemRect(index);
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + 1, rect.y + 1, WindowBase_1.Window_Base._faceWidth, WindowBase_1.Window_Base._faceHeight);
        this.changePaintOpacity(true);
    };
    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        var actor = DataManager_1.$gameParty.members()[index];
        var rect = this.itemRect(index);
        var x = rect.x + 162;
        var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
        var width = rect.width - x - this.textPadding();
        this.drawActorSimpleStatus(actor, x, y, width);
    };
    Window_MenuStatus.prototype.processOk = function () {
        WindowSelectable_1.Window_Selectable.prototype.processOk.call(this);
        DataManager_1.$gameParty.setMenuActor(DataManager_1.$gameParty.members()[this.index()]);
    };
    Window_MenuStatus.prototype.isCurrentItemEnabled = function () {
        if (this._formationMode) {
            var actor = DataManager_1.$gameParty.members()[this.index()];
            return actor && actor.isFormationChangeOk();
        }
        else {
            return true;
        }
    };
    Window_MenuStatus.prototype.selectLast = function () {
        this.select(DataManager_1.$gameParty.menuActor().index() || 0);
    };
    Window_MenuStatus.prototype.formationMode = function () {
        return this._formationMode;
    };
    Window_MenuStatus.prototype.setFormationMode = function (formationMode) {
        this._formationMode = formationMode;
    };
    Window_MenuStatus.prototype.pendingIndex = function () {
        return this._pendingIndex;
    };
    Window_MenuStatus.prototype.setPendingIndex = function (index) {
        var lastPendingIndex = this._pendingIndex;
        this._pendingIndex = index;
        this.redrawItem(this._pendingIndex);
        this.redrawItem(lastPendingIndex);
    };
    return Window_MenuStatus;
}(WindowSelectable_1.Window_Selectable));
exports.Window_MenuStatus = Window_MenuStatus;
