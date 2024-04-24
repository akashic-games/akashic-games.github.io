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
exports.Window_BattleEnemy = void 0;
var Graphics_1 = require("../core/Graphics");
var globals_1 = require("../managers/globals");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_BattleEnemy = /** @class */ (function (_super) {
    __extends(Window_BattleEnemy, _super);
    function Window_BattleEnemy(x, y) {
        return _super.call(this, x, y) || this;
    }
    Window_BattleEnemy.prototype.initialize = function (x, y) {
        this._enemies = [];
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.hide();
    };
    Window_BattleEnemy.prototype.windowWidth = function () {
        return Graphics_1.Graphics.boxWidth - 192;
    };
    Window_BattleEnemy.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_BattleEnemy.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_BattleEnemy.prototype.maxCols = function () {
        return 2;
    };
    Window_BattleEnemy.prototype.maxItems = function () {
        return this._enemies.length;
    };
    Window_BattleEnemy.prototype.enemy = function () {
        return this._enemies[this.index()];
    };
    Window_BattleEnemy.prototype.enemyIndex = function () {
        var enemy = this.enemy();
        return enemy ? enemy.index() : -1;
    };
    Window_BattleEnemy.prototype.drawItem = function (index) {
        this.resetTextColor();
        var name = this._enemies[index].name();
        var rect = this.itemRectForText(index);
        this.drawText(name, rect.x, rect.y, rect.width);
    };
    Window_BattleEnemy.prototype.show = function () {
        this.refresh();
        this.select(0);
        _super.prototype.show.call(this);
    };
    Window_BattleEnemy.prototype.hide = function () {
        _super.prototype.hide.call(this);
        globals_1.$gameTroop.select(null);
    };
    Window_BattleEnemy.prototype.refresh = function () {
        this._enemies = globals_1.$gameTroop.aliveMembers();
        _super.prototype.refresh.call(this);
    };
    Window_BattleEnemy.prototype.select = function (index) {
        _super.prototype.select.call(this, index);
        globals_1.$gameTroop.select(this.enemy());
    };
    return Window_BattleEnemy;
}(WindowSelectable_1.Window_Selectable));
exports.Window_BattleEnemy = Window_BattleEnemy;
