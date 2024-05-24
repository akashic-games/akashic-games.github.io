"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonParameterReader = exports.LaunchType = void 0;
/**
 * 起動方法
 * @export
 * @enum {number}
 */
var LaunchType;
(function (LaunchType) {
    /** 未指定 */
    LaunchType[LaunchType["NOTHING"] = 0] = "NOTHING";
    /** 放送者プレイ */
    LaunchType[LaunchType["SELF"] = 1] = "SELF";
    /** 抽選されたユーザーがプレイ */
    LaunchType[LaunchType["LOTTERY"] = 2] = "LOTTERY";
    /** みんなでプレイ */
    LaunchType[LaunchType["RANKING"] = 3] = "RANKING";
})(LaunchType = exports.LaunchType || (exports.LaunchType = {}));
/** 特定のシーンを判定する文字列 */
var INITIAL_SCENE_STRING = "game";
/** 起動方法の放送者プレイを判定する文字列 */
var LAUNCH_TYPE_SELF_STRING = "self";
/** 起動方法の抽選されたユーザーがプレイを判定する文字列 */
var LAUNCH_TYPE_LOTTERY_STRING = "lottery";
/** 起動方法のみんなでプレイを判定する文字列 */
var LAUNCH_TYPE_RANKING_STRING = "ranking";
/** ゲームシーン以外のシーンで消費する時間 */
var TIME_EXPECT_GAME_SCENE = 32;
/**
 * 共通パラメータの読み込みクラス
 * 省略されたパラメータ項目の補完などを行う
 */
var CommonParameterReader = /** @class */ (function () {
    function CommonParameterReader() {
    }
    /**
     * 起動パラメータから対応するメンバ変数を設定する
     * @param {RireGameParameters} parameters 起動パラメータ
     */
    CommonParameterReader.read = function (parameters) {
        this.initialScene = "";
        this.isInitialSceneGame = false;
        this.muteAudio = false;
        this.nicowari = false;
        this.useGameTimeLimit = false;
        this.gameTimeLimit = 0;
        this.useDifficulty = false;
        this.difficulty = 1;
        this.launchType = LaunchType.NOTHING;
        if (typeof parameters.nicowari === "boolean") {
            this.nicowari = parameters.nicowari;
        }
        // console.log("read: nicowari:" + this.nicowari + ".");
        if (this.nicowari) {
            return;
        }
        if (typeof parameters.initialScene === "string") {
            this.initialScene = parameters.initialScene;
        }
        if (this.initialScene === INITIAL_SCENE_STRING) {
            this.isInitialSceneGame = true;
        }
        // console.log("read: initialScene:" + this.initialScene + ", isInitialSceneGame:" + this.isInitialSceneGame + ".");
        if (typeof parameters.muteAudio === "boolean") {
            this.muteAudio = parameters.muteAudio;
        }
        // console.log("read: muteAudio:" + this.muteAudio + ".");
        if (typeof parameters.totalTimeLimit === "number") {
            this.useGameTimeLimit = true;
            // totalTimeLimitはゲーム全体で使う時間なのでゲームシーン以外で消費する時間分引く必要がある
            this.gameTimeLimit = Math.max(0, parameters.totalTimeLimit - TIME_EXPECT_GAME_SCENE);
        }
        // console.log("read: useGameTimeLimit:" + this.useGameTimeLimit + ", gameTimeLimit:" + this.gameTimeLimit + ".");
        // console.log("read: useGameTimeMax:" + this.useGameTimeMax + ".");
        if (typeof parameters.difficulty === "number") {
            this.useDifficulty = true;
            if (parameters.difficulty < 1) {
                this.difficulty = 1;
            }
            else if (parameters.difficulty > 10) {
                this.difficulty = 10;
            }
            else {
                this.difficulty = parameters.difficulty;
            }
        }
        // console.log("read: useDifficulty:" + this.useDifficulty + ", difficulty:" + this.difficulty + ".");
        if (typeof parameters.randomSeed === "number") {
            this.randomGenerator = new g.XorshiftRandomGenerator(parameters.randomSeed);
        }
        if (typeof parameters.launchType === "string") {
            if (parameters.launchType === LAUNCH_TYPE_SELF_STRING) {
                this.launchType = LaunchType.SELF;
            }
            else if (parameters.launchType === LAUNCH_TYPE_LOTTERY_STRING) {
                this.launchType = LaunchType.LOTTERY;
            }
            else if (parameters.launchType === LAUNCH_TYPE_RANKING_STRING) {
                this.launchType = LaunchType.RANKING;
            }
        }
    };
    return CommonParameterReader;
}());
exports.CommonParameterReader = CommonParameterReader;
