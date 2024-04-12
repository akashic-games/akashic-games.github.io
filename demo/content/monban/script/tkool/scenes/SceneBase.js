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
exports.Scene_Base = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var Scene_Base = /** @class */ (function (_super) {
    __extends(Scene_Base, _super);
    function Scene_Base() {
        var _this = _super.call(this) || this;
        _this.thisSceneLoaded = false;
        if (Object.getPrototypeOf(_this) === Scene_Base.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Base.prototype.initialize = function () {
        this._active = false;
        this._fadeSign = 0;
        this._fadeDuration = 0;
        this._fadeSprite = null;
        this._imageReservationId = core_1.Utils.generateRuntimeId();
    };
    Scene_Base.prototype.attachReservation = function () {
        managers_1.ImageManager.setDefaultReservationId(this._imageReservationId);
    };
    Scene_Base.prototype.detachReservation = function () {
        managers_1.ImageManager.releaseReservation(this._imageReservationId);
    };
    Scene_Base.prototype.create = function () {
        //
    };
    Scene_Base.prototype.isActive = function () {
        return this._active;
    };
    Scene_Base.prototype.isReady = function () {
        return managers_1.ImageManager.isReady();
    };
    Scene_Base.prototype.start = function () {
        this._active = true;
    };
    Scene_Base.prototype.update = function () {
        this.updateFade();
        this.updateChildren();
    };
    Scene_Base.prototype.stop = function () {
        this._active = false;
    };
    Scene_Base.prototype.isBusy = function () {
        return this._fadeDuration > 0;
    };
    Scene_Base.prototype.terminate = function () {
        //
    };
    Scene_Base.prototype.createWindowLayer = function () {
        var width = core_1.Graphics.boxWidth;
        var height = core_1.Graphics.boxHeight;
        var x = (core_1.Graphics.width - width) / 2;
        var y = (core_1.Graphics.height - height) / 2;
        this._windowLayer = new core_1.WindowLayer();
        this._windowLayer.move(x, y, width, height);
        this.addChild(this._windowLayer);
    };
    Scene_Base.prototype.addWindow = function (window) {
        this._windowLayer.addChild(window);
    };
    Scene_Base.prototype.startFadeIn = function (duration, white) {
        this.createFadeSprite(white);
        this._fadeSign = 1;
        this._fadeDuration = duration || 30;
        this._fadeSprite.opacity = 255;
    };
    Scene_Base.prototype.startFadeOut = function (duration, white) {
        this.createFadeSprite(white);
        this._fadeSign = -1;
        this._fadeDuration = duration || 30;
        this._fadeSprite.opacity = 0;
    };
    Scene_Base.prototype.createFadeSprite = function (white) {
        if (!this._fadeSprite) {
            this._fadeSprite = new core_1.ScreenSprite(white ? "white" : "black");
            this.addChild(this._fadeSprite);
        }
        if (white) {
            this._fadeSprite.setWhite();
        }
        else {
            this._fadeSprite.setBlack();
        }
    };
    Scene_Base.prototype.updateFade = function () {
        if (this._fadeDuration > 0) {
            var d = this._fadeDuration;
            if (this._fadeSign > 0) {
                this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
            }
            else {
                this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
            }
            this._fadeDuration--;
        }
    };
    Scene_Base.prototype.updateChildren = function () {
        // if (! this.children) {
        // 	return;
        // }
        // this.children.forEach((_child) => {
        // 	const child = _child as any;
        // 	if (child.__update) {
        // 		child.__update();
        // 	}
        // 	if (child.updateTransform) {
        // 		child.updateTransform();
        // 	}
        // });
        var children = this._root.children;
        if (!children) {
            return;
        }
        children.forEach(function (child) {
            if (child.update) {
                child.update();
            }
            if (child.updateTransform) {
                child.updateTransform();
            }
        });
    };
    Scene_Base.prototype.popScene = function () {
        managers_1.SceneManager.pop();
    };
    Scene_Base.prototype.checkGameover = function () {
        // if ($gameParty.isAllDead()) {
        // 	SceneManager.goto(Scene_Gameover);
        // }
    };
    Scene_Base.prototype.fadeOutAll = function () {
        var time = this.slowFadeSpeed() / 60;
        managers_1.AudioManager.fadeOutBgm(time);
        managers_1.AudioManager.fadeOutBgs(time);
        managers_1.AudioManager.fadeOutMe(time);
        this.startFadeOut(this.slowFadeSpeed());
    };
    Scene_Base.prototype.fadeSpeed = function () {
        return 24;
    };
    Scene_Base.prototype.slowFadeSpeed = function () {
        return this.fadeSpeed() * 2;
    };
    Scene_Base.prototype.assetLoadHandler = function (_asset, _assetManager, _holder) {
        return 0;
    };
    return Scene_Base;
}(core_1.Stage));
exports.Scene_Base = Scene_Base;
