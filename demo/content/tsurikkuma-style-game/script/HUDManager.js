"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUDManager = void 0;
var constants_1 = require("./constants");
var Resources_1 = require("./Resources");
/**
 * HUDマネージャークラス
 * スコア、制限時間、システム文言などの管理を行います
 */
var HUDManager = /** @class */ (function () {
    function HUDManager(param) {
        this._scoreLabel = param.scoreLabel;
        this._timeLabel = param.timeLabel;
        this._systemLabel = param.systemLabel;
        this._timeLimit = constants_1.TIMELIMIT;
    }
    // ----------
    // スコア関係
    // ----------
    /**
     * スコアをセットする
     */
    HUDManager.prototype.setScore = function (score) {
        score = Math.min(score, 99999);
        var scoreText = constants_1.SCORE_LABEL_FORMAT + "".concat(score);
        this._scoreLabel.text = scoreText;
        this._scoreLabel.invalidate();
        if (!g.game.vars.gameState) {
            g.game.vars.gameState = {};
        }
        g.game.vars.gameState.score = score;
    };
    /**
     * 現時点のスコアを得る
     */
    HUDManager.prototype.getScore = function () {
        if (!g.game.vars.gameState) {
            return 0;
        }
        return g.game.vars.gameState.score;
    };
    /**
     * スコアの加算
     */
    HUDManager.prototype.addScore = function (score) {
        this.setScore(this.getScore() + score);
    };
    /**
     * 釣った魚からスコアを計算
     */
    HUDManager.prototype.calcScore = function (capturedFishList) {
        if (capturedFishList.some(function (fish) { return fish.score === 0; })) {
            return 0;
        }
        return capturedFishList.reduce(function (score, fish) { return score += fish.score; }, 0);
    };
    // ----------
    // 制限時間関係
    // ----------
    /**
     * 制限時間をセットする
     */
    HUDManager.prototype.setTimeLimit = function (timeLimit) {
        this._timeLimit = Math.max(timeLimit, 1);
        var timeLimitText = constants_1.TIME_LABEL_FORMAT + "".concat(timeLimit);
        if (this._timeLabel.text !== timeLimitText) {
            this._timeLabel.text = timeLimitText;
            this._timeLabel.invalidate();
        }
    };
    /**
     * 現時点の残り制限時間を得る
     */
    HUDManager.prototype.getNowTime = function () {
        if (this._timeLimit < 0) {
            return 0;
        }
        return this._timeLimit;
    };
    /**
     * 残り制限時間を更新
     */
    HUDManager.prototype.updateTime = function () {
        var now = Math.max(Math.floor(this._timeLimit), 0);
        var nowTimeText = constants_1.TIME_LABEL_FORMAT + "".concat(now);
        if (this._timeLabel.text !== nowTimeText) {
            this._timeLabel.text = nowTimeText;
            this._timeLabel.invalidate();
        }
        this._timeLimit -= 1 / g.game.fps;
    };
    ;
    // ----------
    // システムラベル関係
    // ----------
    /**
     * スタート時のカウントダウン開始
     */
    HUDManager.prototype.startCountdown = function (finished) {
        var _this = this;
        var timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._systemLabel, { modified: function () { return _this._systemLabel.invalidate(); } })
            .wait(1000).call(function () { return _this._systemLabel.text = "2"; })
            .wait(1000).call(function () { return _this._systemLabel.text = "1"; })
            .wait(1000).call(function () { return _this._systemLabel.text = "Start!"; })
            .wait(500).fadeOut(500)
            .call(function () { return finished(); });
    };
    ;
    /**
     * 終了時のシステム文言表示
     */
    HUDManager.prototype.showTimeUp = function () {
        this._systemLabel.text = "TIME UP!";
        this._systemLabel.opacity = 1.0;
        this._systemLabel.invalidate();
    };
    return HUDManager;
}());
exports.HUDManager = HUDManager;
