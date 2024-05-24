"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fish = void 0;
const constants_1 = require("../constants");
const Resources_1 = require("../Resources");
/**
 * 魚クラス
 */
class Fish {
    constructor(param) {
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
    get isCaptured() {
        return this._isCaptured;
    }
    get name() {
        return this._label.text;
    }
    get score() {
        return this._score;
    }
    /**
     * 魚の当たり判定を返す
     */
    get area() {
        return {
            width: this._label.width,
            height: this._label.height,
            x: this._label.x,
            y: this._label.y
        };
    }
    destroy() {
        this._label.destroy();
    }
    /**
     * 釣られる
     */
    followHook(fishingRod) {
        this._label.onUpdate.add(() => {
            this._label.y = Math.min(fishingRod.hookArea.y, this._label.y);
            this._label.modified();
        });
    }
    /**
     * 泳ぐ
     */
    swim() {
        const timeline = (0, Resources_1.getResources)().timeline;
        const toX = this._label.x < g.game.width / 2 ? g.game.width : -this._label.width;
        if (this._swimTween) {
            timeline.remove(this._swimTween);
        }
        this._swimTween = timeline
            .create(this._label)
            .moveTo(toX, this._label.y, this._swimmingStyle.swimTime)
            .call(() => this._label.destroy());
    }
    /**
     * 泳ぎをやめる
     */
    stop() {
        this._isCaptured = true;
        if (this._swimTween) {
            (0, Resources_1.getResources)().timeline.remove(this._swimTween);
            this._swimTween = null;
        }
    }
    /**
     * 魚ラベル作成
     */
    _createLabel(param) {
        const pos = this._initialPos(param);
        return new g.Label({
            scene: param.parent.scene,
            text: param.name,
            font: (0, Resources_1.getResources)().font,
            fontSize: constants_1.FISH_FONT_SIZE,
            x: pos.x,
            y: pos.y
        });
    }
    /**
     * 初期位置生成
     */
    _initialPos(param) {
        switch (param.swimmingStyle.pattern) {
            case "left_to_right":
                return { x: -constants_1.FISH_FONT_SIZE, y: param.swimmingStyle.depth };
            case "right_to_left":
                return { x: g.game.width, y: param.swimmingStyle.depth };
        }
    }
}
exports.Fish = Fish;
