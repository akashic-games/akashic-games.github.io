"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fish = void 0;
var constants_1 = require("../constants");
var Resources_1 = require("../Resources");
/**
 * 魚クラス
 */
var Fish = /** @class */ (function () {
    function Fish(param) {
        /**
         * 泳ぐアニメーション用の Tween
         */
        this._swimTween = null;
        this._parent = param.parent;
        this._label = this._createLabel(param);
        this._parent.append(this._label);
        this._isCaptured = false;
        this._score = param.score;
        this._swimmingStyle = param.swimmingStyle;
    }
    Object.defineProperty(Fish.prototype, "isCaptured", {
        get: function () {
            return this._isCaptured;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fish.prototype, "name", {
        get: function () {
            return this._label.text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fish.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fish.prototype, "area", {
        /**
         * 魚の当たり判定を返す
         */
        get: function () {
            return {
                width: this._label.width,
                height: this._label.height,
                x: this._label.x,
                y: this._label.y
            };
        },
        enumerable: false,
        configurable: true
    });
    Fish.prototype.destroy = function () {
        this._label.destroy();
    };
    /**
     * 釣られる
     */
    Fish.prototype.followHook = function (fishingRod) {
        var _this = this;
        this._label.onUpdate.add(function () {
            _this._label.y = Math.min(fishingRod.hookArea.y, _this._label.y);
            _this._label.modified();
        });
    };
    /**
     * 泳ぐ
     */
    Fish.prototype.swim = function () {
        var _this = this;
        var timeline = (0, Resources_1.getResources)().timeline;
        var toX = this._label.x < g.game.width / 2 ? g.game.width : -this._label.width;
        if (this._swimTween) {
            timeline.remove(this._swimTween);
        }
        this._swimTween = timeline
            .create(this._label)
            .moveTo(toX, this._label.y, this._swimmingStyle.swimTime)
            .call(function () { return _this._label.destroy(); });
    };
    /**
     * 泳ぎをやめる
     */
    Fish.prototype.stop = function () {
        this._isCaptured = true;
        if (this._swimTween) {
            (0, Resources_1.getResources)().timeline.remove(this._swimTween);
            this._swimTween = null;
        }
    };
    /**
     * 魚ラベル作成
     */
    Fish.prototype._createLabel = function (param) {
        var pos = this._initialPos(param);
        return new g.Label({
            scene: param.parent.scene,
            text: param.name,
            font: (0, Resources_1.getResources)().font,
            fontSize: constants_1.FISH_FONT_SIZE,
            x: pos.x,
            y: pos.y
        });
    };
    /**
     * 初期位置生成
     */
    Fish.prototype._initialPos = function (param) {
        switch (param.swimmingStyle.pattern) {
            case "left_to_right":
                return { x: -constants_1.FISH_FONT_SIZE, y: param.swimmingStyle.depth };
            case "right_to_left":
                return { x: g.game.width, y: param.swimmingStyle.depth };
        }
    };
    return Fish;
}());
exports.Fish = Fish;
