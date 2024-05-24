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
exports.Scene_GameEnd = void 0;
var managers_1 = require("../managers");
var WindowGameEnd_1 = require("../windows/WindowGameEnd");
var SceneMenuBase_1 = require("./SceneMenuBase");
var SceneTitle_1 = require("./SceneTitle");
var Scene_GameEnd = /** @class */ (function (_super) {
    __extends(Scene_GameEnd, _super);
    function Scene_GameEnd() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_GameEnd.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_GameEnd.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_GameEnd.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createCommandWindow();
    };
    Scene_GameEnd.prototype.stop = function () {
        _super.prototype.stop.call(this);
        this._commandWindow.close();
    };
    Scene_GameEnd.prototype.createBackground = function () {
        SceneMenuBase_1.Scene_MenuBase.prototype.createBackground.call(this);
        this.setBackgroundOpacity(128);
    };
    Scene_GameEnd.prototype.createCommandWindow = function () {
        this._commandWindow = new WindowGameEnd_1.Window_GameEnd(this.scene);
        this._commandWindow.setHandler("toTitle", this.commandToTitle.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };
    Scene_GameEnd.prototype.commandToTitle = function () {
        this.fadeOutAll();
        managers_1.SceneManager.goto(SceneTitle_1.Scene_Title);
    };
    return Scene_GameEnd;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_GameEnd = Scene_GameEnd;
