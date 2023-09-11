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
exports.Window_BattleSkill = void 0;
var WindowSkillList_1 = require("./WindowSkillList");
var Window_BattleSkill = /** @class */ (function (_super) {
    __extends(Window_BattleSkill, _super);
    function Window_BattleSkill(scene, x, y, width, height) {
        return _super.call(this, scene, x, y, width, height) || this;
    }
    Window_BattleSkill.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this.hide();
    };
    Window_BattleSkill.prototype.show = function () {
        this.selectLast();
        this.showHelpWindow();
        _super.prototype.show.call(this);
    };
    Window_BattleSkill.prototype.hide = function () {
        this.hideHelpWindow();
        _super.prototype.hide.call(this);
    };
    return Window_BattleSkill;
}(WindowSkillList_1.Window_SkillList));
exports.Window_BattleSkill = Window_BattleSkill;
