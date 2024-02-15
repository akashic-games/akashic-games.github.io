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
exports.Window_EquipStatus = void 0;
var managers_1 = require("../managers");
var WindowBase_1 = require("./WindowBase");
var Window_EquipStatus = /** @class */ (function (_super) {
    __extends(Window_EquipStatus, _super);
    function Window_EquipStatus(x, y) {
        return _super.call(this, x, y) || this;
    }
    Window_EquipStatus.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._tempActor = null;
        this.refresh();
    };
    Window_EquipStatus.prototype.windowWidth = function () {
        return 312;
    };
    Window_EquipStatus.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_EquipStatus.prototype.numVisibleRows = function () {
        return 7;
    };
    Window_EquipStatus.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };
    Window_EquipStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            this.drawActorName(this._actor, this.textPadding(), 0);
            for (var i = 0; i < 6; i++) {
                this.drawItem(0, this.lineHeight() * (1 + i), 2 + i);
            }
        }
    };
    Window_EquipStatus.prototype.setTempActor = function (tempActor) {
        if (this._tempActor !== tempActor) {
            this._tempActor = tempActor;
            this.refresh();
        }
    };
    Window_EquipStatus.prototype.drawItem = function (x, y, paramId) {
        this.drawParamName(x + this.textPadding(), y, paramId);
        if (this._actor) {
            this.drawCurrentParam(x + 140, y, paramId);
        }
        this.drawRightArrow(x + 188, y);
        if (this._tempActor) {
            this.drawNewParam(x + 222, y, paramId);
        }
    };
    Window_EquipStatus.prototype.drawParamName = function (x, y, paramId) {
        this.changeTextColor(this.systemColor());
        this.drawText(managers_1.TextManager.param(paramId), x, y, 120);
    };
    Window_EquipStatus.prototype.drawCurrentParam = function (x, y, paramId) {
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x, y, 48, "right");
    };
    Window_EquipStatus.prototype.drawRightArrow = function (x, y) {
        this.changeTextColor(this.systemColor());
        this.drawText("\u2192", x, y, 32, "center");
    };
    Window_EquipStatus.prototype.drawNewParam = function (x, y, paramId) {
        var newValue = this._tempActor.param(paramId);
        var diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, 48, "right");
    };
    return Window_EquipStatus;
}(WindowBase_1.Window_Base));
exports.Window_EquipStatus = Window_EquipStatus;
