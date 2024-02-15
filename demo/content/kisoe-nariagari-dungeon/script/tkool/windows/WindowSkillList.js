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
exports.Window_SkillList = void 0;
var DataManager_1 = require("../managers/DataManager");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_SkillList = /** @class */ (function (_super) {
    __extends(Window_SkillList, _super);
    function Window_SkillList(x, y, width, height) {
        return _super.call(this, x, y, width, height) || this;
    }
    Window_SkillList.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._stypeId = 0;
        this._data = [];
    };
    Window_SkillList.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };
    Window_SkillList.prototype.setStypeId = function (stypeId) {
        if (this._stypeId !== stypeId) {
            this._stypeId = stypeId;
            this.refresh();
            this.resetScroll();
        }
    };
    Window_SkillList.prototype.maxCols = function () {
        return 2;
    };
    Window_SkillList.prototype.spacing = function () {
        return 48;
    };
    Window_SkillList.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };
    Window_SkillList.prototype.item = function () {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };
    Window_SkillList.prototype.isCurrentItemEnabled = function () {
        return this.isEnabled(this._data[this.index()]);
    };
    Window_SkillList.prototype.includes = function (item) {
        return item && item.stypeId === this._stypeId;
    };
    Window_SkillList.prototype.isEnabled = function (item) {
        return this._actor && this._actor.canUse(item);
    };
    Window_SkillList.prototype.makeItemList = function () {
        var _this = this;
        if (this._actor) {
            this._data = this._actor.skills().filter(function (item) {
                return _this.includes(item);
            });
        }
        else {
            this._data = [];
        }
    };
    Window_SkillList.prototype.selectLast = function () {
        var skill;
        if (DataManager_1.$gameParty.inBattle()) {
            skill = this._actor.lastBattleSkill();
        }
        else {
            skill = this._actor.lastMenuSkill();
        }
        var index = this._data.indexOf(skill);
        this.select(index >= 0 ? index : 0);
    };
    Window_SkillList.prototype.drawItem = function (index) {
        var skill = this._data[index];
        if (skill) {
            var costWidth = this.costWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(/* 1*/ true);
        }
    };
    Window_SkillList.prototype.costWidth = function () {
        return this.textWidth("000");
    };
    Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
        if (this._actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), x, y, width, "right");
        }
        else if (this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x, y, width, "right");
        }
    };
    Window_SkillList.prototype.updateHelp = function () {
        this.setHelpWindowItem(this.item());
    };
    Window_SkillList.prototype.refresh = function () {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };
    return Window_SkillList;
}(WindowSelectable_1.Window_Selectable));
exports.Window_SkillList = Window_SkillList;
