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
exports.Scene_Options = void 0;
var WindowOptions_1 = require("../windows/WindowOptions");
var SceneMenuBase_1 = require("./SceneMenuBase");
var Scene_Options = /** @class */ (function (_super) {
    __extends(Scene_Options, _super);
    function Scene_Options() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Options.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Options.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Options.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createOptionsWindow();
    };
    Scene_Options.prototype.terminate = function () {
        _super.prototype.terminate.call(this);
        // ConfigManager.save(); // オプション設定を保存する手段がまだ無いのでコメントアウト
    };
    Scene_Options.prototype.createOptionsWindow = function () {
        this._optionsWindow = new WindowOptions_1.Window_Options(this.scene);
        this._optionsWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._optionsWindow);
    };
    return Scene_Options;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_Options = Scene_Options;
