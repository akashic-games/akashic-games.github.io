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
exports.Scene_Skill = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var WindowSkillList_1 = require("../windows/WindowSkillList");
var WindowSkillStatus_1 = require("../windows/WindowSkillStatus");
var WindowSkillType_1 = require("../windows/WindowSkillType");
var SceneItemBase_1 = require("./SceneItemBase");
var Scene_Skill = /** @class */ (function (_super) {
    __extends(Scene_Skill, _super);
    function Scene_Skill() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Skill.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Skill.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Skill.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createHelpWindow();
        this.createSkillTypeWindow();
        this.createStatusWindow();
        this.createItemWindow();
        this.createActorWindow();
    };
    Scene_Skill.prototype.start = function () {
        _super.prototype.start.call(this);
        this.refreshActor();
    };
    Scene_Skill.prototype.createSkillTypeWindow = function () {
        var wy = this._helpWindow.height;
        this._skillTypeWindow = new WindowSkillType_1.Window_SkillType(0, wy);
        this._skillTypeWindow.setHelpWindow(this._helpWindow);
        this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
        this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
        this._skillTypeWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._skillTypeWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._skillTypeWindow);
    };
    Scene_Skill.prototype.createStatusWindow = function () {
        var wx = this._skillTypeWindow.width;
        var wy = this._helpWindow.height;
        var ww = core_1.Graphics.boxWidth - wx;
        var wh = this._skillTypeWindow.height;
        this._statusWindow = new WindowSkillStatus_1.Window_SkillStatus(wx, wy, ww, wh);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };
    Scene_Skill.prototype.createItemWindow = function () {
        var wx = 0;
        var wy = this._statusWindow.y + this._statusWindow.height;
        var ww = core_1.Graphics.boxWidth;
        var wh = core_1.Graphics.boxHeight - wy;
        this._itemWindow = new WindowSkillList_1.Window_SkillList(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._skillTypeWindow.setSkillWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };
    Scene_Skill.prototype.refreshActor = function () {
        var actor = this.actor();
        this._skillTypeWindow.setActor(actor);
        this._statusWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };
    Scene_Skill.prototype.user = function () {
        return this.actor();
    };
    Scene_Skill.prototype.commandSkill = function () {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };
    Scene_Skill.prototype.onItemOk = function () {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
    };
    Scene_Skill.prototype.onItemCancel = function () {
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };
    Scene_Skill.prototype.playSeForItem = function () {
        managers_1.SoundManager.playUseSkill();
    };
    Scene_Skill.prototype.useItem = function () {
        _super.prototype.useItem.call(this);
        this._statusWindow.refresh();
        this._itemWindow.refresh();
    };
    Scene_Skill.prototype.onActorChange = function () {
        this.refreshActor();
        this._skillTypeWindow.activate();
    };
    return Scene_Skill;
}(SceneItemBase_1.Scene_ItemBase));
exports.Scene_Skill = Scene_Skill;
