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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window_MenuActor = void 0;
var DataManager_1 = require("../managers/DataManager");
var objects_1 = require("../objects");
var WindowMenuStatus_1 = require("./WindowMenuStatus");
var Window_MenuActor = /** @class */ (function (_super) {
    __extends(Window_MenuActor, _super);
    function Window_MenuActor(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
    }
    Window_MenuActor.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
        this.hide();
    };
    Window_MenuActor.prototype.processOk = function () {
        if (!this.cursorAll()) {
            DataManager_1.$gameParty.setTargetActor(DataManager_1.$gameParty.members()[this.index()]);
        }
        this.callOkHandler();
    };
    Window_MenuActor.prototype.selectLast = function () {
        this.select(DataManager_1.$gameParty.targetActor().index() || 0);
    };
    Window_MenuActor.prototype.selectForItem = function (item) {
        var actor = DataManager_1.$gameParty.menuActor();
        var action = new objects_1.Game_Action(actor);
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
