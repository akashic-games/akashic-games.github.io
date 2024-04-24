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
exports.Window_MenuActor = void 0;
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var GameAction_1 = require("../objects/GameAction");
var WindowMenuStatus_1 = require("./WindowMenuStatus");
var Window_MenuActor = /** @class */ (function (_super) {
    __extends(Window_MenuActor, _super);
    function Window_MenuActor() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_MenuActor.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
        this.hide();
    };
    Window_MenuActor.prototype.processOk = function () {
        if (!this.cursorAll()) {
            globals_1.$gameParty.setTargetActor(globals_1.$gameParty.members()[this.index()]);
        }
        this.callOkHandler();
    };
    Window_MenuActor.prototype.selectLast = function () {
        this.select(globals_1.$gameParty.targetActor().index() || 0);
    };
    Window_MenuActor.prototype.selectForItem = function (item) {
        var actor = globals_1.$gameParty.menuActor();
        var action = new GameAction_1.Game_Action(actor);
        action.setItemObject(item);
        this.setCursorFixed(false);
        this.setCursorAll(false);
        if (action.isForUser()) {
            if (DataManager_1.DataManager.isSkill(item)) {
                this.setCursorFixed(true);
                this.select(actor.index());
            }
            else {
                this.selectLast();
            }
        }
        else if (action.isForAll()) {
            this.setCursorAll(true);
            this.select(0);
        }
        else {
            this.selectLast();
        }
    };
    return Window_MenuActor;
}(WindowMenuStatus_1.Window_MenuStatus));
exports.Window_MenuActor = Window_MenuActor;
