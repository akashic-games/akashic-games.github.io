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
exports.Window_BattleActor = void 0;
var globals_1 = require("../managers/globals");
var WindowBattleStatus_1 = require("./WindowBattleStatus");
var Window_BattleActor = /** @class */ (function (_super) {
    __extends(Window_BattleActor, _super);
    function Window_BattleActor(x, y) {
        return _super.call(this, x, y) || this;
    }
    Window_BattleActor.prototype.initialize = function (x, y) {
        _super.prototype.initialize.call(this);
        this.x = x;
        this.y = y;
        this.openness = 255;
        this.hide();
    };
    Window_BattleActor.prototype.show = function () {
        this.select(0);
        _super.prototype.show.call(this);
    };
    Window_BattleActor.prototype.hide = function () {
        _super.prototype.hide.call(this);
        globals_1.$gameParty.select(null);
    };
    Window_BattleActor.prototype.select = function (index) {
        _super.prototype.select.call(this, index);
        globals_1.$gameParty.select(this.actor());
    };
    Window_BattleActor.prototype.actor = function () {
        return globals_1.$gameParty.members()[this.index()];
    };
    return Window_BattleActor;
}(WindowBattleStatus_1.Window_BattleStatus));
exports.Window_BattleActor = Window_BattleActor;
