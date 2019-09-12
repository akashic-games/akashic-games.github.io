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
var commonDefine_1 = require("../common/commonDefine");
var entityUtil_1 = require("../util/entityUtil");
var gameUtil_1 = require("../util/gameUtil");
var define_1 = require("./define");
/**
 * 残り時間の管理、表示を行うクラス
 * 残り時間警告の演出も管理する。
 */
var TimerLabel = /** @class */ (function (_super) {
    __extends(TimerLabel, _super);
    function TimerLabel(_scene) {
        var _this = _super.call(this, { scene: _scene }) || this;
        _this.timeCaution = new g.Trigger();
        _this.timeCautionCancel = new g.Trigger();
        return _this;
    }
    /**
     * 表示系以外のオブジェクトをdestroyするメソッド
     * 表示系のオブジェクトはg.Eのdestroyに任せる。
     * @override
     */
    TimerLabel.prototype.destroy = function () {
        if (this.destroyed()) {
            return;
        }
        if (this.timeCaution) {
            this.timeCaution.destroy();
            this.timeCaution = null;
        }
        if (this.timeCautionCancel) {
            this.timeCautionCancel.destroy();
            this.timeCautionCancel = null;
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * フォントのアセット情報を渡してラベルを生成するメソッド
     * @param {AssetInfoType} _numBlackInfo 黒文字のアセット情報
     * @param {AssetInfoType} _numRedInfo 赤文字のアセット情報
     */
    TimerLabel.prototype.createLabel = function (_numBlackInfo, _numRedInfo) {
        this.remainFrameCount = 0;
        this.currentCount = 0;
        var fontBlack = gameUtil_1.gameUtil.createNumFontWithAssetInfo(_numBlackInfo);
        var labelBlack = this.labelBlack = entityUtil_1.entityUtil.createNumLabel(this.scene, fontBlack, define_1.define.GAME_TIMER_DIGIT);
        entityUtil_1.entityUtil.appendEntity(labelBlack, this);
        var scaleLayer = this.scaleLayer = new g.E({ scene: this.scene });
        entityUtil_1.entityUtil.appendEntity(scaleLayer, this);
        var fontRed = gameUtil_1.gameUtil.createNumFontWithAssetInfo(_numRedInfo);
        var labelRed = this.labelRed = entityUtil_1.entityUtil.createNumLabel(this.scene, fontRed, define_1.define.GAME_TIMER_DIGIT);
        entityUtil_1.entityUtil.appendEntity(labelRed, scaleLayer);
        this.stopBlink();
    };
    /**
     * 右端の数字の左上を指定してラベルの位置を設定するメソッド
     * @param {number} _x 右端の数字の左上のx座標
     * @param {number} _y 右端の数字の左上のy座標
     */
    TimerLabel.prototype.moveLabelTo = function (_x, _y) {
        if (!this.labelBlack) {
            return;
        }
        // 点滅時の拡大基準点
        var label = this.labelBlack;
        var font = label.bitmapFont;
        var pivotX = _x + (font.defaultGlyphWidth / 2);
        var pivotY = _y + (font.defaultGlyphHeight / 2);
        entityUtil_1.entityUtil.setXY(this.scaleLayer, pivotX, pivotY);
        // ラベルの左上
        var labelX = _x + font.defaultGlyphWidth - label.width;
        var labelY = _y;
        entityUtil_1.entityUtil.setXY(this.labelBlack, labelX, labelY);
        entityUtil_1.entityUtil.setXY(this.labelRed, labelX - pivotX, labelY - pivotY);
    };
    /**
     * 現在の残り秒数を設定するメソッド
     * @param {number} _seconds 設定する値
     */
    TimerLabel.prototype.setTimeCount = function (_seconds) {
        this.setTimeFrameCount(gameUtil_1.gameUtil.sec2Frame(_seconds));
    };
    /**
     * 現在の残り秒数をフレーム数で設定するメソッド
     * @param {number} _frames 設定する値
     */
    TimerLabel.prototype.setTimeFrameCount = function (_frames) {
        this.remainFrameCount = _frames;
        this.renewCurrentNumber(true);
    };
    /**
     * 現在の残り秒数を取得するメソッド（小数部は切り上げる）
     * @return {number} 秒数
     */
    TimerLabel.prototype.getTimeCount = function () {
        return Math.ceil(gameUtil_1.gameUtil.frame2Sec(this.remainFrameCount));
    };
    /**
     * 現在の残り秒数を取得するメソッド（小数部あり）
     * @return {number} 秒数
     */
    TimerLabel.prototype.getTimeCountReal = function () {
        return gameUtil_1.gameUtil.frame2Sec(this.remainFrameCount);
    };
    /**
     * 現在の残り秒数をフレーム数で取得するメソッド
     * @return {number} フレーム数
     */
    TimerLabel.prototype.getTimeFrameCount = function () {
        return this.remainFrameCount;
    };
    /**
     * 点滅状態を取得するメソッド
     * @return {boolean} 点滅中ならばtrue
     */
    TimerLabel.prototype.isBlinking = function () {
        return this.isBlinking_;
    };
    /**
     * 1フレーム分時間を進めるメソッド
     */
    TimerLabel.prototype.tick = function () {
        if (this.remainFrameCount > 0) {
            --this.remainFrameCount;
            // remainFrameCountの値が小数である場合を考慮した条件
            if (this.remainFrameCount < 0) {
                this.remainFrameCount = 0;
            }
            this.renewCurrentNumber();
        }
    };
    /**
     * 残り時間によらず赤点滅演出を終了するメソッド
     */
    TimerLabel.prototype.forceStopBlink = function () {
        if (this.isBlinking_) {
            this.stopBlink();
        }
    };
    /**
     * 残り時間表示の更新を行うメソッド
     * opt_isForceがtrueでなければ現在の表示内容と変化がある場合のみ
     * ラベル内容を設定する
     * @param {boolean = false} opt_isForce (optional)強制設定フラグ
     */
    TimerLabel.prototype.renewCurrentNumber = function (opt_isForce) {
        if (opt_isForce === void 0) { opt_isForce = false; }
        var seconds = this.getTimeCount();
        if (opt_isForce || (seconds !== this.currentCount)) {
            var text = String(seconds);
            entityUtil_1.entityUtil.setLabelText(this.labelBlack, text);
            entityUtil_1.entityUtil.setLabelText(this.labelRed, text);
            this.currentCount = seconds;
            this.checkBlinkState();
        }
    };
    /**
     * 赤点滅状態を確認、更新するメソッド
     */
    TimerLabel.prototype.checkBlinkState = function () {
        if ((this.currentCount > 0) &&
            (this.currentCount < define_1.define.CAUTION_TIME_CONDITION)) {
            if (!this.isBlinking_) {
                this.startBlink();
            }
        }
        else {
            if (this.isBlinking_) {
                this.stopBlink();
            }
        }
    };
    /**
     * 赤点滅演出を開始するメソッド
     */
    TimerLabel.prototype.startBlink = function () {
        this.isBlinking_ = true;
        this.setTween();
        entityUtil_1.entityUtil.hideEntity(this.labelBlack);
        entityUtil_1.entityUtil.showEntity(this.labelRed);
        this.timeCaution.fire();
    };
    /**
     * 赤点滅演出を終了するメソッド
     */
    TimerLabel.prototype.stopBlink = function () {
        this.isBlinking_ = false;
        entityUtil_1.entityUtil.hideEntity(this.labelRed);
        entityUtil_1.entityUtil.showEntity(this.labelBlack);
        this.timeCautionCancel.fire();
        // stopBlinkのあと実行中のtweenが終了する前にstartBlinkされると
        // 正常に動かないが仕様上起きない前提とする。
    };
    /**
     * 赤点滅一周期分のtweenを設定するメソッド
     */
    TimerLabel.prototype.setTween = function () {
        var _this = this;
        var scaleOff = commonDefine_1.commonDefine.CAUTION_TIME_SCALE_OFF;
        var scaleOn = commonDefine_1.commonDefine.CAUTION_TIME_SCALE_ON;
        entityUtil_1.entityUtil.setScale(this.scaleLayer, scaleOff);
        var timeline = this.scene.game.vars.scenedata.timeline;
        gameUtil_1.gameUtil.createTween(timeline, this.scaleLayer).
            to({ scaleX: scaleOn, scaleY: scaleOn }, gameUtil_1.gameUtil.frame2MSec(commonDefine_1.commonDefine.CAUTION_TIME_ON)).
            to({ scaleX: scaleOff, scaleY: scaleOff }, gameUtil_1.gameUtil.frame2MSec(commonDefine_1.commonDefine.CAUTION_TIME_OFF)).
            call(function () {
            if (_this.isBlinking_) {
                _this.setTween();
            }
        });
    };
    return TimerLabel;
}(g.E));
exports.TimerLabel = TimerLabel;
