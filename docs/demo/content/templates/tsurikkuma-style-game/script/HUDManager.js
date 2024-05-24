"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUDManager = void 0;
const constants_1 = require("./constants");
const Resources_1 = require("./Resources");
/**
 * HUDマネージャークラス
 * スコア、制限時間、システム文言などの管理を行います
 */
class HUDManager {
    constructor(param) {
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
    setScore(score) {
        score = Math.min(score, 99999);
        const scoreText = constants_1.SCORE_LABEL_FORMAT + `${score}`;
        this._scoreLabel.text = scoreText;
        this._scoreLabel.invalidate();
        if (!g.game.vars.gameState) {
            g.game.vars.gameState = {};
        }
        g.game.vars.gameState.score = score;
    }
    /**
     * 現時点のスコアを得る
     */
    getScore() {
        if (!g.game.vars.gameState) {
            return 0;
        }
        return g.game.vars.gameState.score;
    }
    /**
     * スコアの加算
     */
    addScore(score) {
        this.setScore(this.getScore() + score);
    }
    /**
     * 釣った魚からスコアを計算
     */
    calcScore(capturedFishList) {
        if (capturedFishList.some(fish => fish.score === 0)) {
            return 0;
        }
        return capturedFishList.reduce((score, fish) => score += fish.score, 0);
    }
    // ----------
    // 制限時間関係
    // ----------
    /**
     * 制限時間をセットする
     */
    setTimeLimit(timeLimit) {
        this._timeLimit = Math.max(timeLimit, 1);
        const timeLimitText = constants_1.TIME_LABEL_FORMAT + `${timeLimit}`;
        if (this._timeLabel.text !== timeLimitText) {
            this._timeLabel.text = timeLimitText;
            this._timeLabel.invalidate();
        }
    }
    /**
     * 現時点の残り制限時間を得る
     */
    getNowTime() {
        if (this._timeLimit < 0) {
            return 0;
        }
        return this._timeLimit;
    }
    /**
     * 残り制限時間を更新
     */
    updateTime() {
        const now = Math.max(Math.floor(this._timeLimit), 0);
        const nowTimeText = constants_1.TIME_LABEL_FORMAT + `${now}`;
        if (this._timeLabel.text !== nowTimeText) {
            this._timeLabel.text = nowTimeText;
            this._timeLabel.invalidate();
        }
        this._timeLimit -= 1 / g.game.fps;
    }
    // ----------
    // システムラベル関係
    // ----------
    /**
     * スタート時のカウントダウン開始
     */
    startCountdown(finished) {
        const timeline = (0, Resources_1.getResources)().timeline;
        timeline.create(this._systemLabel, { modified: () => this._systemLabel.invalidate() })
            .wait(1000).call(() => this._systemLabel.text = "2")
            .wait(1000).call(() => this._systemLabel.text = "1")
            .wait(1000).call(() => this._systemLabel.text = "Start!")
            .wait(500).fadeOut(500)
            .call(() => finished());
    }
    /**
     * 終了時のシステム文言表示
     */
    showTimeUp() {
        this._systemLabel.text = "TIME UP!";
        this._systemLabel.opacity = 1.0;
        this._systemLabel.invalidate();
    }
}
exports.HUDManager = HUDManager;
