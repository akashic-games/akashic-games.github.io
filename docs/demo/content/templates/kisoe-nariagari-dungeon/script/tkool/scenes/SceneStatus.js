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
exports.Scene_Status = void 0;
var WindowStatus_1 = require("../windows/WindowStatus");
var SceneMenuBase_1 = require("./SceneMenuBase");
var Scene_Status = /** @class */ (function (_super) {
    __extends(Scene_Status, _super);
    function Scene_Status() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Status.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Status.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Status.prototype.create = function () {
        _super.prototype.create.call(this);
        this._statusWindow = new WindowStatus_1.Window_Status(this.scene);
        this._statusWindow.setHandler("cancel", this.popScene.bind(this));
        this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };
    Scene_Status.prototype.start = function () {
        SceneMenuBase_1.Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
    };
    Scene_Status.prototype.refreshActor = function () {
        var actor = this.actor();
        this._statusWindow.setActor(actor);
    };
    Scene_Status.prototype.onActorChange = function () {
        this.refreshActor();
        this._statusWindow.activate();
    };
    return Scene_Status;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_Status = Scene_Status;
