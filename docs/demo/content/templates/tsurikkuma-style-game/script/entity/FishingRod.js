"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishingRod = void 0;
const constants_1 = require("../constants");
const Resources_1 = require("../Resources");
/**
 * 釣り竿クラス
 */
class FishingRod {
    constructor(param) {
        /**
         * スタック時のトリガー
         */
        this.onStuck = new g.Trigger();
        this._parent = param.parent;
        this._isCatching = false;
        this._isFishing = false;
        this._createRod();
        this._createRodString();
        this._createHook();
    }
    get isCatching() {
        return this._isCatching;
    }
    /**
     * 釣り針の当たり判定を返す
     */
    get hookArea() {
        return {
            width: this._hook.width,
            height: this._hook.height,
            x: this._hook.x,
            y: this._hook.y
        };
    }
    /**
     * 釣り上げる
     */
    catchUp(finished) {
        if (this._isFishing || this._isCatching)
            return;
        this._isCatching = true;
        this._isFishing = true;
        const timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._rodString).to({ height: constants_1.ROD_STRING_HEIGHT_WHEN_UP }, constants_1.FISHING_DURATION).wait(constants_1.FISHING_WAIT_DURATION);
        timeline.create(this._hook).moveTo(this._hook.x, constants_1.HOOK_POS_WHEN_UP.y, constants_1.FISHING_DURATION).wait(constants_1.FISHING_WAIT_DURATION)
            .call(() => {
            this._isCatching = false;
            finished();
        });
    }
    /**
     * 釣った魚からパターンを判定
     */
    getFishingPattern(capturedFishList) {
        let pattern = "Default";
        capturedFishList.forEach(fish => {
            if (pattern !== "Default")
                return;
            switch (fish.name) {
                case "くらげ":
                    pattern = "Stuck";
                    break;
            }
        });
        return pattern;
    }
    /**
     * パターンに従って釣りをする
     */
    fishing(pattern) {
        switch (pattern) {
            case "Default":
                this._swingDown();
                break;
            case "Stuck":
                this._stuck();
                break;
        }
    }
    /**
     * 振り下ろす
     */
    _swingDown() {
        const timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._rodString).to({ height: constants_1.ROD_STRING_SIZE.height }, constants_1.FISHING_DURATION);
        timeline.create(this._hook).moveTo(this._hook.x, constants_1.HOOK_POS.y, constants_1.FISHING_DURATION).call(() => {
            this._isFishing = false;
        });
    }
    /**
     * スタックさせる
     */
    _stuck() {
        this.onStuck.fire();
        // ${STUCK_DURATION} ミリ秒後に、スタックを解除し、釣竿を振り下ろす
        const timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._rodString).wait(constants_1.STUCK_DURATION);
        timeline.create(this._hook).wait(constants_1.STUCK_DURATION)
            .call(() => {
            this._swingDown();
        });
    }
    /**
     * 釣竿を作成する
     */
    _createRod() {
        new g.FilledRect({
            scene: this._parent.scene,
            cssColor: constants_1.ROD_COLOR,
            width: constants_1.ROD_SIZE.width,
            height: constants_1.ROD_SIZE.height,
            x: constants_1.ROD_POS.x,
            y: constants_1.ROD_POS.y,
            angle: constants_1.ROD_ANGLE,
            parent: this._parent,
            anchorX: null,
            anchorY: null
        });
    }
    /**
     * 釣り糸を作成する
     */
    _createRodString() {
        this._rodString = new g.FilledRect({
            scene: this._parent.scene,
            cssColor: constants_1.ROD_STRING_COLOR,
            width: constants_1.ROD_STRING_SIZE.width,
            height: constants_1.ROD_STRING_SIZE.height,
            x: constants_1.ROD_STRING_POS.x,
            y: constants_1.ROD_STRING_POS.y,
            parent: this._parent
        });
    }
    /**
     * 釣り針を作成する
     */
    _createHook() {
        const scene = this._parent.scene;
        this._hook = new g.E({
            scene: scene,
            width: constants_1.HOOK_SIZE.width,
            height: constants_1.HOOK_SIZE.height,
            x: constants_1.HOOK_POS.x,
            y: constants_1.HOOK_POS.y,
            parent: this._parent
        });
        new g.FilledRect({
            scene: scene,
            cssColor: constants_1.HOOK_COLOR,
            width: 10,
            height: this._hook.height,
            x: this._hook.width - 10,
            parent: this._hook
        });
        new g.FilledRect({
            scene: scene,
            cssColor: constants_1.HOOK_COLOR,
            width: this._hook.width,
            height: 10,
            y: this._hook.height - 10,
            parent: this._hook
        });
        new g.FilledRect({
            scene: scene,
            cssColor: constants_1.HOOK_COLOR,
            width: 10,
            height: 20,
            y: this._hook.height - 20,
            parent: this._hook
        });
    }
}
exports.FishingRod = FishingRod;
