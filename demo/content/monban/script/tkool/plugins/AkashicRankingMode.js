"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
// =============================================================================
// AkashicRankingMode.js
// =============================================================================
/* :
 * @plugindesc plugin for creating ranking-type nicolive games.
 * @author DWANGO Co., Ltd.
 *
 * @param scoreVariableNumber
 * @desc Variable number to use as SCORE.
 * @default 1
 *
 * @param totalTimeLimit
 * @desc Total game time limit. min:20, max:200.
 * @default 75
 *
 * @param titleTime
 * @desc Time to display title screen.
 * @default 5
 *
 * @param graceTime
 * @desc Waiting time after game ends.
 * @default 10
 *
 * @param prohibitMenu
 * @desc Whether to prohibit menu display during timer display. 1:yes 0:no.
 * @default 1
 *
 * @param showScore
 * @desc Whether to show current score. 1:yes 0:no.
 * @default 1
 *
 * @param scoreWidth
 * @desc Width of score display window.
 * @default 200
 *
 * @param scoreHeight
 * @desc Height of score display window.
 * @default 70
 *
 * @param scoreX
 * @desc X-coordinate of score display window.
 * @default 0
 *
 * @param scoreY
 * @desc Y-coordinate of score display window.
 * @default 0
 *
 * @param scoreUnit
 * @desc Unit of score.
 * @default pt
 *
 * @param musicVolume
 * @desc Overall volume of BGM and BGS. min: 0, max: 100.
 * @default 100
 *
 * @param soundVolume
 * @desc Overall volume of SE and ME. min: 0, max: 100.
 * @default 100
 *
 * @param forceNamagameTimer
 * @desc Whether to rewrite timer time limit. 1:yes 0:no.
 * @default 1
 *
 * Plugin Command
 *
 *  NAMAGAME_START_TIMER : Using the timer in the nicolive games environment.
 *
 * This plugin is essential when creating ranking-type nicolive games.
 */
/* :ja
 * @plugindesc ランキング形式のニコ生ゲームを作るためのプラグイン
 * @author 株式会社ドワンゴ
 *
 * @param scoreVariableNumber
 * @desc スコアとして使用する変数番号
 * @default 1
 *
 * @param totalTimeLimit
 * @desc ゲームの総制限時間。最小値:20、最大値:200
 * @default 75
 *
 * @param titleTime
 * @desc タイトル画面を表示する時間
 * @default 5
 *
 * @param graceTime
 * @desc ゲーム終了後待機時間
 * @default 10
 *
 * @param prohibitMenu
 * @desc タイマー表示中にメニュー表示を禁止するかどうか。1:禁止する、0:禁止しない
 * @default 1
 *
 * @param showScore
 * @desc 現在のスコアを表示するかどうか。1:表示する、0:表示しない
 * @default 1
 *
 * @param scoreWidth
 * @desc スコア表示ウィンドウの横幅
 * @default 200
 *
 * @param scoreHeight
 * @desc スコア表示ウィンドウの縦幅
 * @default 70
 *
 * @param scoreX
 * @desc スコア表示ウィンドウのx座標
 * @default 0
 *
 * @param scoreY
 * @desc スコア表示ウィンドウのy座標
 * @default 0
 *
 * @param scoreUnit
 * @desc スコアの単位
 * @default pt
 *
 * @param musicVolume
 * @desc BGM・BGSの全体音量。最小値:0、最大値:100
 * @default 100
 *
 * @param soundVolume
 * @desc SE・MEの全体音量。最小値:0、最大値:100
 * @default 100
 *
 * @param forceNamagameTimer
 * @desc タイマーの制限時間書き換えを行うかどうか。1:はい、0:いいえ
 * @default 1
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （引数の間は半角スペースで区切る）
 *
 *  NAMAGAME_START_TIMER : ニコ生ゲーム環境のタイマーを利用する。
 *
 * ランキング形式のニコ生ゲームを作る時にこのプラグインが必須です。
 */
(function () {
    // パラメータ取得
    var parameters = index_1.PluginManager.parameters("AkashicRankingMode");
    var scoreVariableNumber = Number(parameters.scoreVariableNumber || 1);
    var totalTimeLimit = typeof g !== "undefined" && g.game.vars.totalTimeLimit ? g.game.vars.totalTimeLimit : Number(parameters.totalTimeLimit || 75);
    var titleTime = Number(parameters.titleTime || 5);
    var graceTime = Number(parameters.graceTime || 10);
    var prohibitMenu = Number(parameters.prohibitMenu || 1) !== 0;
    var showScore = Number(parameters.showScore || 1) !== 0;
    var scoreWidth = Number(parameters.scoreWidth || 200);
    var scoreHeight = Number(parameters.scoreHeight || 70);
    var scoreX = Number(parameters.scoreX || 0);
    var scoreY = Number(parameters.scoreY || 0);
    var scoreUnit = parameters.scoreUnit || "pt";
    var MAX_VOLUME = 100;
    var MIN_VOLUME = 0;
    var musicVolume = clamp(Number(parameters.musicVolume || MAX_VOLUME), MIN_VOLUME, MAX_VOLUME);
    var soundVolume = clamp(Number(parameters.soundVolume || MAX_VOLUME), MIN_VOLUME, MAX_VOLUME);
    var forceNamagameTimer = Number(parameters.forceNamagameTimer || 1) !== 0;
    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    // ゲームスコア用のウィンドウを用意
    // 参考: Window_Gold クラス
    var Window_GameScore = /** @class */ (function (_super) {
        __extends(Window_GameScore, _super);
        function Window_GameScore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_GameScore.prototype.initialize = function (x, y) {
            _super.prototype.initialize.call(this, x, y, scoreWidth, scoreHeight);
            this.refresh();
        };
        Window_GameScore.prototype.refresh = function () {
            var x = this.textPadding();
            var width = this.contents.width - this.textPadding() * 2;
            this.contents.clear();
            this.drawCurrencyValue(index_1.$gameVariables.value(scoreVariableNumber), scoreUnit, x, 0, width);
        };
        Window_GameScore.prototype.open = function () {
            this.refresh();
            _super.prototype.open.call(this);
        };
        return Window_GameScore;
    }(index_1.Window_Base));
    // スコア初期化
    if (typeof g !== "undefined") {
        g.game.vars.gameState = {
            score: 0
        };
    }
    // タイトル画面を自動的に飛ばす処理
    var _timerId = null;
    var _sceneTitleStart = index_1.Scene_Title.prototype.start;
    index_1.Scene_Title.prototype.start = function () {
        var _this = this;
        _sceneTitleStart.call(this);
        var scene = typeof g === "undefined" ? window : g.game.scene();
        _timerId = scene.setTimeout(function () {
            scene.clearTimeout(_timerId);
            _timerId = null;
            _this.commandNewGame();
        }, titleTime * 1000);
    };
    // タイトルメニューを非表示にするための対応
    index_1.Scene_Title.prototype.isBusy = function () {
        return _timerId != null;
    };
    // スコアを反映させる処理
    var _gameVariablesSetValue = index_1.Game_Variables.prototype.setValue;
    index_1.Game_Variables.prototype.setValue = function (variableId, value) {
        _gameVariablesSetValue.call(this, variableId, value);
        if (variableId === scoreVariableNumber && typeof g !== "undefined") {
            g.game.vars.gameState.score = value;
        }
    };
    // ニコ生ゲーム用のタイマーのフレーム数を算出
    function calcTimerFrames() {
        var fps;
        if (typeof g === "undefined") {
            // RPGツクールでのfpsのデフォルト値は60
            fps = 60;
        }
        else {
            fps = g.game.fps;
        }
        var timeLimit = totalTimeLimit - titleTime - graceTime;
        return timeLimit * fps;
    }
    // タイマーの制限時間の書き換え
    if (forceNamagameTimer) {
        index_1.Game_Timer.prototype.start = function (_count) {
            this._frames = calcTimerFrames();
            this._working = true;
        };
    }
    // メニュー画面から「ゲーム終了」の項目を削除する
    index_1.Window_MenuCommand.prototype.addGameEndCommand = function () {
        // 「ゲーム終了」の項目をメニューにはいらないようにするため、このメソッドでは何も行わない
    };
    // prohibitMenuがONの場合、タイマー利用時はメニュー画面を利用禁止にする
    if (prohibitMenu) {
        var _sceneMapCallMenu_1 = index_1.Scene_Map.prototype.callMenu;
        index_1.Scene_Map.prototype.callMenu = function () {
            if (index_1.$gameTimer && index_1.$gameTimer.isWorking()) {
                return;
            }
            _sceneMapCallMenu_1.call(this);
        };
        var _gameInterpretercommand351_1 = index_1.Game_Interpreter.prototype.command351;
        index_1.Game_Interpreter.prototype.command351 = function () {
            if (index_1.$gameTimer && index_1.$gameTimer.isWorking()) {
                return true;
            }
            return _gameInterpretercommand351_1.call(this);
        };
    }
    var _sceneMapCreateDisplayObjects = index_1.Scene_Map.prototype.createDisplayObjects;
    index_1.Scene_Map.prototype.createDisplayObjects = function () {
        var original = _sceneMapCreateDisplayObjects.call(this);
        this.gameScoreWindow = new Window_GameScore(scoreX, scoreY);
        if (showScore) {
            this.gameScoreWindow.open();
            this.addWindow(this.gameScoreWindow);
        }
        return original;
    };
    var _sceneMapUpdate = index_1.Scene_Map.prototype.update;
    index_1.Scene_Map.prototype.update = function () {
        var original = _sceneMapUpdate.call(this);
        this.gameScoreWindow.refresh();
        return original;
    };
    // 全体の音量調整
    index_1.AudioManager.bgmVolume = musicVolume;
    index_1.AudioManager.bgsVolume = musicVolume;
    index_1.AudioManager.meVolume = soundVolume;
    index_1.AudioManager.seVolume = soundVolume;
    // プラグインコマンドを追加定義。
    var _gameInterpreterPluginCommand = index_1.Game_Interpreter.prototype.pluginCommand;
    index_1.Game_Interpreter.prototype.pluginCommand = function (command, _args) {
        _gameInterpreterPluginCommand.apply(this, arguments);
        switch (command) {
            // ニコ生ゲーム環境のタイマーを利用する
            case "NAMAGAME_START_TIMER":
                var frames = calcTimerFrames();
                index_1.$gameTimer.start(frames);
                break;
            default:
                break;
        }
    };
})();
