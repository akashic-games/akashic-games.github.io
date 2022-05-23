"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishingRod = void 0;
var constants_1 = require("../constants");
var Resources_1 = require("../Resources");
/**
 * 釣り竿クラス
 */
var FishingRod = /** @class */ (function () {
    function FishingRod(param) {
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
    Object.defineProperty(FishingRod.prototype, "isCatching", {
        get: function () {
            return this._isCatching;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FishingRod.prototype, "hookArea", {
        /**
         * 釣り針の当たり判定を返す
         */
        get: function () {
            return {
                width: this._hook.width,
                height: this._hook.height,
                x: this._hook.x,
                y: this._hook.y
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 釣り上げる
     */
    FishingRod.prototype.catchUp = function (finished) {
        var _this = this;
        if (this._isFishing || this._isCatching)
            return;
        this._isCatching = true;
        this._isFishing = true;
        var timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._rodString).to({ height: constants_1.ROD_STRING_HEIGHT_WHEN_UP }, constants_1.FISHING_DURATION).wait(constants_1.FISHING_WAIT_DURATION);
        timeline.create(this._hook).moveTo(this._hook.x, constants_1.HOOK_POS_WHEN_UP.y, constants_1.FISHING_DURATION).wait(constants_1.FISHING_WAIT_DURATION)
            .call(function () {
            _this._isCatching = false;
            finished();
        });
    };
    /**
     * 釣った魚からパターンを判定
     */
    FishingRod.prototype.getFishingPattern = function (capturedFishList) {
        var pattern = "Default";
        capturedFishList.forEach(function (fish) {
            if (pattern !== "Default")
                return;
            switch (fish.name) {
                case "くらげ":
                    pattern = "Stuck";
                    break;
            }
        });
        return pattern;
    };
    /**
     * パターンに従って釣りをする
     */
    FishingRod.prototype.fishing = function (pattern) {
        switch (pattern) {
            case "Default":
                this._swingDown();
                break;
            case "Stuck":
                this._stuck();
                break;
        }
    };
    /**
     * 振り下ろす
     */
    FishingRod.prototype._swingDown = function () {
        var _this = this;
        var timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._rodString).to({ height: constants_1.ROD_STRING_SIZE.height }, constants_1.FISHING_DURATION);
        timeline.create(this._hook).moveTo(this._hook.x, constants_1.HOOK_POS.y, constants_1.FISHING_DURATION).call(function () {
            _this._isFishing = false;
        });
    };
    /**
     * スタックさせる
     */
    FishingRod.prototype._stuck = function () {
        var _this = this;
        this.onStuck.fire();
        // ${STUCK_DURATION} ミリ秒後に、スタックを解除し、釣竿を振り下ろす
        var timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._rodString).wait(constants_1.STUCK_DURATION);
        timeline.create(this._hook).wait(constants_1.STUCK_DURATION)
            .call(function () {
            _this._swingDown();
        });
    };
    /**
     * 釣竿を作成する
     */
    FishingRod.prototype._createRod = function () {
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
    };
    /**
     * 釣り糸を作成する
     */
    FishingRod.prototype._createRodString = function () {
        this._rodString = new g.FilledRect({
            scene: this._parent.scene,
            cssColor: constants_1.ROD_STRING_COLOR,
            width: constants_1.ROD_STRING_SIZE.width,
            height: constants_1.ROD_STRING_SIZE.height,
            x: constants_1.ROD_STRING_POS.x,
            y: constants_1.ROD_STRING_POS.y,
            parent: this._parent
        });
    };
    /**
     * 釣り針を作成する
     */
    FishingRod.prototype._createHook = function () {
        var scene = this._parent.scene;
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
    };
    return FishingRod;
}());
exports.FishingRod = FishingRod;
