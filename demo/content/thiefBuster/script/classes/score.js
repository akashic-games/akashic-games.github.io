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
var tl = require("@akashic-extension/akashic-timeline");
var entityUtil_1 = require("../util/entityUtil");
var define_1 = require("./define");
var gameUtil_1 = require("../util/gameUtil");
/** スコア強調時間：OFF→ON */
var SCORE_TIME_ON = 3;
/** スコア強調時間：ON→OFF */
var SCORE_TIME_OFF = 7;
/** スコア強調スケール：OFF→ON */
var SCORE_SCALE_ON = 1.1;
/** スコア強調スケール：ON→OFF */
var SCORE_SCALE_OFF = 1.0;
/** スコア強調時移動調整距離 */
var SCORE_SCALE_MOVE_X = 8;
/**
 * スコア処理を行うクラス
 */
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    /**
     * 継承元のg.Eのコンストラクタを呼び、タイムラインインスタンスを作成する
     * @param  {g.Scene} _scene シーン
     */
    function Score(_scene) {
        var _this = _super.call(this, { scene: _scene }) || this;
        /** スコアラベル */
        _this.label = null;
        /** ラベル初期位置 */
        _this.posLabelStart = null;
        /** 現在のスコア */
        _this.value = null;
        /** スコア加算演出用スタック */
        _this.stack = null;
        /** 加算幅 */
        _this.plus = null;
        _this.timeline = new tl.Timeline(_scene);
        _this.plus = 10;
        return _this;
    }
    /**
     * 表示系以外のオブジェクトをdestroyするメソッド
     * 表示系のオブジェクトはg.Eのdestroyに任せる。
     * @override
     */
    Score.prototype.destroy = function () {
        if (this.destroyed()) {
            return;
        }
        if (this.timeline) {
            this.timeline.destroy();
            this.timeline = null;
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * ラベルの作成
     * @param {g.BitmapFont}   _font     スコア用フォント
     * @param {number}         _digit    桁数
     * @param {g.CommonOffset} _posStart 初期位置
     */
    Score.prototype.createScoreLabel = function (_font, _digit, _posStart) {
        this.label = entityUtil_1.entityUtil.createNumLabel(this.scene, _font, _digit);
        entityUtil_1.entityUtil.appendEntity(this.label, this);
        entityUtil_1.entityUtil.moveNumLabelTo(// 1ケタ目左上へ移動
        this.label, _posStart.x, _posStart.y);
        // ラベル初期位置記憶
        this.posLabelStart = { x: this.label.x, y: this.label.y };
    };
    /**
     * 初期化
     */
    Score.prototype.init = function () {
        this.value = 0;
        this.stack = 0;
        entityUtil_1.entityUtil.setLabelText(this.label, String(this.value));
    };
    /**
     * ラベルテキストの更新
     */
    Score.prototype.onUpdate = function () {
        entityUtil_1.entityUtil.setLabelText(this.label, String(this.value));
        this.animePlusScore();
        if (this.value < 0) {
            this.value = 0;
            this.stack = 0;
            gameUtil_1.gameUtil.updateGameStateScore(this.value);
        }
        else if (this.value > define_1.define.SCORE_LIMIT) {
            this.value = define_1.define.SCORE_LIMIT;
            this.stack = 0;
            gameUtil_1.gameUtil.updateGameStateScore(this.value);
        }
    };
    /**
     * スコアのgetter
     * @return {number} スコア
     */
    Score.prototype.getValue = function () {
        return this.value;
    };
    /**
     * スタックスコアからのマージスコアを一気に足す
     */
    Score.prototype.mergeScore = function () {
        this.value += this.stack;
        this.stack = 0;
    };
    /**
     * スコア加算開始
     * @param {number} _plusScore 加算対象スコア
     */
    Score.prototype.startPlus = function (_plusScore) {
        this.setStack(_plusScore);
        this.setPlus();
        this.setTween();
        gameUtil_1.gameUtil.updateGameStateScore(this.value + this.stack);
    };
    /**
     * ゲーム終了時の処理まとめ
     */
    Score.prototype.onFinishGame = function () {
        this.mergeScore(); // 残ったスタックスコアを加算
        this.onUpdate();
        gameUtil_1.gameUtil.updateGameStateScore(this.value + this.stack);
    };
    /**
     * スコアをすこしずつ足す
     */
    Score.prototype.animePlusScore = function () {
        if (this.stack > 0 && this.stack >= this.plus) {
            this.value += this.plus;
            this.stack -= this.plus;
        }
        else {
            this.mergeScore();
        }
    };
    /**
     * 加算幅をスタックスコアから設定
     */
    Score.prototype.setPlus = function () {
        // ラベル強調時間で終わるように
        this.plus = Math.floor(this.stack / (SCORE_TIME_ON + SCORE_TIME_OFF));
    };
    /**
     * スコアを演出用にスタック
     * @param {number} _plusScore 加算対象スコア
     */
    Score.prototype.setStack = function (_plusScore) {
        this.stack += _plusScore;
    };
    /**
     * 加算時に強調する演出tween設定
     */
    Score.prototype.setTween = function () {
        var scaleOff = SCORE_SCALE_OFF; // 縮小倍率 =原寸大
        var scaleOn = SCORE_SCALE_ON; // 拡大倍率 スコア桁数によって調整したい
        var fps = this.scene.game.fps;
        var mSec = 1000;
        var timeScaleOffInit = 1 * mSec / fps; // 初期化縮小にかけるミリ秒
        var timeScaleOn = SCORE_TIME_ON * mSec / fps; // 巨大化にかけるミリ秒
        var timeScaleOff = SCORE_TIME_OFF * mSec / fps; // 縮小にかけるミリ秒
        this.timeline.clear(); // 毎回作り直し
        var tween = this.timeline.create(this.label, {
            modified: this.label.modified,
            destroyed: this.label.destroyed
        });
        // tweenが重なった場合、まず元のサイズに
        tween.to({ scaleX: scaleOff, scaleY: scaleOff }, timeScaleOffInit);
        tween.con(); // 上下処理結合
        tween.moveTo(// 位置をもとに戻す
        this.posLabelStart.x, this.posLabelStart.y, timeScaleOffInit);
        tween.to({ scaleX: scaleOn, scaleY: scaleOn }, timeScaleOn); // 強調開始
        tween.con(); // 上下処理結合
        tween.moveTo(// 原点の問題上ずれるので調整用 計算で調整幅出したい
        this.posLabelStart.x - SCORE_SCALE_MOVE_X, this.posLabelStart.y, timeScaleOn);
        tween.to({ scaleX: scaleOff, scaleY: scaleOff }, timeScaleOff); // 強調終了
        tween.con(); // 上下処理結合
        tween.moveTo(// 位置をもとに戻す
        this.posLabelStart.x, this.posLabelStart.y, timeScaleOff);
    };
    return Score;
}(g.E));
exports.Score = Score;
