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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window_Status = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_Status = /** @class */ (function (_super) {
    __extends(Window_Status, _super);
    function Window_Status(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
    }
    Window_Status.prototype.initialize = function () {
        var width = core_1.Graphics.boxWidth;
        var height = core_1.Graphics.boxHeight;
        _super.prototype.initialize.call(this, 0, 0, width, height);
        this._actor = null;
        this.refresh();
        this.activate();
    };
    Window_Status.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };
    Window_Status.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            var lineHeight = this.lineHeight();
            this.drawBlock1(lineHeight * 0);
            this.drawHorzLine(lineHeight * 1);
            this.drawBlock2(lineHeight * 2);
            this.drawHorzLine(lineHeight * 6);
            this.drawBlock3(lineHeight * 7);
            this.drawHorzLine(lineHeight * 13);
            this.drawBlock4(lineHeight * 14);
        }
    };
    Window_Status.prototype.drawBlock1 = function (y) {
        this.drawActorName(this._actor, 6, y);
        this.drawActorClass(this._actor, 192, y);
        this.drawActorNickname(this._actor, 432, y);
    };
    Window_Status.prototype.drawBlock2 = function (y) {
        this.drawActorFace(this._actor, 12, y);
        this.drawBasicInfo(204, y);
        this.drawExpInfo(456, y);
    };
    Window_Status.prototype.drawBlock3 = function (y) {
        this.drawParameters(48, y);
        this.drawEquipments(432, y);
    };
    Window_Status.prototype.drawBlock4 = function (y) {
        this.drawProfile(6, y);
    };
    Window_Status.prototype.drawHorzLine = function (y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };
    Window_Status.prototype.lineColor = function () {
        return this.normalColor();
    };
    Window_Status.prototype.drawBasicInfo = function (x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorLevel(this._actor, x, y + lineHeight * 0);
        this.drawActorIcons(this._actor, x, y + lineHeight * 1);
        this.drawActorHp(this._actor, x, y + lineHeight * 2);
        this.drawActorMp(this._actor, x, y + lineHeight * 3);
    };
    Window_Status.prototype.drawParameters = function (x, y) {
        var lineHeight = this.lineHeight();
        for (var i = 0; i < 6; i++) {
            var paramId = i + 2;
            var y2 = y + lineHeight * i;
            this.changeTextColor(this.systemColor());
            this.drawText(managers_1.TextManager.param(paramId), x, y2, 160);
            this.resetTextColor();
            this.drawText(this._actor.param(paramId), x + 160, y2, 60, "right");
        }
    };
    Window_Status.prototype.drawExpInfo = function (x, y) {
        var lineHeight = this.lineHeight();
        var expTotal = core_1.Utils.format(managers_1.TextManager.expTotal, managers_1.TextManager.exp);
        var expNext = core_1.Utils.format(managers_1.TextManager.expNext, managers_1.TextManager.level);
        var value1 = this._actor.currentExp();
        var value2 = this._actor.nextRequiredExp();
        if (this._actor.isMaxLevel()) {
            value1 = "-------";
            value2 = "-------";
        }
        this.changeTextColor(this.systemColor());
        this.drawText(expTotal, x, y + lineHeight * 0, 270);
        this.drawText(expNext, x, y + lineHeight * 2, 270);
        this.resetTextColor();
        this.drawText(value1, x, y + lineHeight * 1, 270, "right");
        this.drawText(value2, x, y + lineHeight * 3, 270, "right");
    };
    Window_Status.prototype.drawEquipments = function (x, y) {
        var equips = this._actor.equips();
        var count = Math.min(equips.length, this.maxEquipmentLines());
        for (var i = 0; i < count; i++) {
            this.drawItemName(equips[i], x, y + this.lineHeight() * i);
        }
    };
    Window_Status.prototype.drawProfile = function (x, y) {
        this.drawTextEx(this._actor.profile(), x, y);
    };
    Window_Status.prototype.maxEquipmentLines = function () {
        return 6;
    };
    return Window_Status;
}(WindowSelectable_1.Window_Selectable));
exports.Window_Status = Window_Status;
