"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var commonDefine_1 = require("./commonDefine");
var entityUtil_1 = require("../util/entityUtil");
var gameUtil_1 = require("../util/gameUtil");
/**
 * 残り時間警告の赤点滅演出を管理するクラス
 */
var CautionFilledRect = /** @class */ (function (_super) {
    __extends(CautionFilledRect, _super);
    function CautionFilledRect(_scene) {
        var _this = _super.call(this, {
            scene: _scene,
            cssColor: commonDefine_1.commonDefine.CAUTION_FILLRECT_COLOR,
            width: _scene.game.width,
            height: _scene.game.height
        }) || this;
        _this.hide();
        return _this;
    }
    /**
     * 点滅状態を取得する
     * @return {boolean} 点滅中ならばtrue
     */
    CautionFilledRect.prototype.isBlinking = function () {
        return this.isBlinking_;
    };
    /**
     * 赤点滅演出を開始する
     */
    CautionFilledRect.prototype.startBlink = function () {
        this.isBlinking_ = true;
        this.setTween();
        entityUtil_1.entityUtil.showEntity(this);
    };
    /**
     * 赤点滅演出を終了する
     */
    CautionFilledRect.prototype.stopBlink = function () {
        this.isBlinking_ = false;
        entityUtil_1.entityUtil.hideEntity(this);
        // stopBlinkのあと実行中のtweenが終了する前にstartBlinkされると
        // 正常に動かないが仕様上起きない前提とする。
    };
    /**
     * 赤点滅一周期分のtweenを設定する
     */
    CautionFilledRect.prototype.setTween = function () {
        var _this = this;
        this.opacity = commonDefine_1.commonDefine.CAUTION_FILLRECT_OPACITY_OFF;
        var timeline = this.scene.game.vars.scenedata.timeline;
        var fps = this.scene.game.fps;
        gameUtil_1.gameUtil.createTween(timeline, this).
            to({ opacity: commonDefine_1.commonDefine.CAUTION_FILLRECT_OPACITY_ON }, commonDefine_1.commonDefine.CAUTION_TIME_ON * 1000 / fps).
            to({ opacity: commonDefine_1.commonDefine.CAUTION_FILLRECT_OPACITY_OFF }, commonDefine_1.commonDefine.CAUTION_TIME_OFF * 1000 / fps).
            call(function () {
            if (_this.isBlinking_) {
                _this.setTween();
            }
        });
    };
    return CautionFilledRect;
}(g.FilledRect));
exports.CautionFilledRect = CautionFilledRect;
