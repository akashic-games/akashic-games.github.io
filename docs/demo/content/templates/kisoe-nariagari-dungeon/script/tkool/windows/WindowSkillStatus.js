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
exports.Window_SkillStatus = void 0;
var WindowBase_1 = require("./WindowBase");
var Window_SkillStatus = /** @class */ (function (_super) {
    __extends(Window_SkillStatus, _super);
    function Window_SkillStatus(scene, x, y, width, height) {
        return _super.call(this, scene, x, y, width, height) || this;
    }
    Window_SkillStatus.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
    };
    Window_SkillStatus.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };
    Window_SkillStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            var y = h / 2 - this.lineHeight() * 1.5;
            var width = w - 162 - this.textPadding();
            this.drawActorFace(this._actor, 0, 0, 144, h);
            this.drawActorSimpleStatus(this._actor, 162, y, width);
        }
    };
    return Window_SkillStatus;
}(WindowBase_1.Window_Base));
exports.Window_SkillStatus = Window_SkillStatus;
