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
exports.Window_BattleStatus = void 0;
var Graphics_1 = require("../core/Graphics");
var globals_1 = require("../managers/globals");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_BattleStatus = /** @class */ (function (_super) {
    __extends(Window_BattleStatus, _super);
    function Window_BattleStatus() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_BattleStatus.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = Graphics_1.Graphics.boxWidth - width;
        var y = Graphics_1.Graphics.boxHeight - height;
        _super.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.openness = 0;
    };
    Window_BattleStatus.prototype.windowWidth = function () {
        return Graphics_1.Graphics.boxWidth - 192;
    };
    Window_BattleStatus.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_BattleStatus.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_BattleStatus.prototype.maxItems = function () {
        return globals_1.$gameParty.battleMembers().length;
    };
    Window_BattleStatus.prototype.refresh = function () {
        this.contents.clear();
        this.drawAllItems();
    };
    Window_BattleStatus.prototype.drawItem = function (index) {
        var actor = globals_1.$gameParty.battleMembers()[index];
        this.drawBasicArea(this.basicAreaRect(index), actor);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor);
    };
    Window_BattleStatus.prototype.basicAreaRect = function (index) {
        var rect = this.itemRectForText(index);
        rect.width -= this.gaugeAreaWidth() + 15;
        return rect;
    };
    Window_BattleStatus.prototype.gaugeAreaRect = function (index) {
        var rect = this.itemRectForText(index);
        rect.x += rect.width - this.gaugeAreaWidth();
        rect.width = this.gaugeAreaWidth();
        return rect;
    };
    Window_BattleStatus.prototype.gaugeAreaWidth = function () {
        return 330;
    };
    Window_BattleStatus.prototype.drawBasicArea = function (rect, actor) {
        this.drawActorName(actor, rect.x + 0, rect.y, 150);
        this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
    };
    Window_BattleStatus.prototype.drawGaugeArea = function (rect, actor) {
        if (globals_1.$dataSystem.optDisplayTp) {
            this.drawGaugeAreaWithTp(rect, actor);
        }
        else {
            this.drawGaugeAreaWithoutTp(rect, actor);
        }
    };
    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function (rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 108);
        this.drawActorMp(actor, rect.x + 123, rect.y, 96);
        this.drawActorTp(actor, rect.x + 234, rect.y, 96);
    };
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function (rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 201);
        this.drawActorMp(actor, rect.x + 216, rect.y, 114);
    };
    return Window_BattleStatus;
}(WindowSelectable_1.Window_Selectable));
exports.Window_BattleStatus = Window_BattleStatus;
