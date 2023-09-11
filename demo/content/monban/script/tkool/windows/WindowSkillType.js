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
exports.Window_SkillType = void 0;
var DataManager_1 = require("../managers/DataManager");
var WindowCommand_1 = require("./WindowCommand");
var Window_SkillType = /** @class */ (function (_super) {
    __extends(Window_SkillType, _super);
    function Window_SkillType(scene, x, y) {
        return _super.call(this, scene, x, y) || this;
    }
    Window_SkillType.prototype.initialize = function (x, y) {
        _super.prototype.initialize.call(this, x, y);
        this._actor = null;
    };
    Window_SkillType.prototype.windowWidth = function () {
        return 240;
    };
    Window_SkillType.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.selectLast();
        }
    };
    Window_SkillType.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_SkillType.prototype.makeCommandList = function () {
        if (this._actor) {
            var skillTypes = this._actor.addedSkillTypes();
            skillTypes.sort(function (a, b) {
                return a - b;
            });
            skillTypes.forEach(function (stypeId) {
                var name = DataManager_1.$dataSystem.skillTypes[stypeId];
                this.addCommand(name, "skill", true, stypeId);
            }, this);
        }
    };
    Window_SkillType.prototype.update = function () {
        WindowCommand_1.Window_Command.prototype.update.call(this);
        if (this._skillWindow) {
            this._skillWindow.setStypeId(this.currentExt());
        }
    };
    Window_SkillType.prototype.setSkillWindow = function (skillWindow) {
        this._skillWindow = skillWindow;
    };
    Window_SkillType.prototype.selectLast = function () {
        var skill = this._actor.lastMenuSkill();
        if (skill) {
            this.selectExt(skill.stypeId);
        }
        else {
            this.select(0);
        }
    };
    return Window_SkillType;
}(WindowCommand_1.Window_Command));
exports.Window_SkillType = Window_SkillType;
