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
exports.GameSubscene = void 0;
var subscene_1 = require("../commonNicowariGame/subscene");
var commonAsaInfo_1 = require("./commonAsaInfo");
var commonSoundInfo_1 = require("./commonSoundInfo");
var commonDefine_1 = require("./commonDefine");
var asaEx_1 = require("../util/asaEx");
var spriteUtil_1 = require("../util/spriteUtil");
var entityUtil_1 = require("../util/entityUtil");
var audioUtil_1 = require("../util/audioUtil");
var cautionFilledRect_1 = require("./cautionFilledRect");
var gameCreator_1 = require("../classes/gameCreator");
/**
 * ゲームサブシーンの処理と表示を行うクラス
 */
var GameSubscene = /** @class */ (function (_super) {
    __extends(GameSubscene, _super);
    function GameSubscene(_scene) {
        return _super.call(this, _scene) || this;
    }
    /**
     * このクラスで使用するオブジェクトを生成する
     * @override
     */
    GameSubscene.prototype.init = function () {
        this.requestedNextSubscene = new g.Trigger();
        var game = this.scene.game;
        var cautionFill = this.cautionFill = new cautionFilledRect_1.CautionFilledRect(this.scene);
        entityUtil_1.entityUtil.appendEntity(cautionFill, this);
        this.inPreGameGuide = false;
        var content = this.gameContent = gameCreator_1.GameCreator.createGame(this.scene);
        content.init();
        entityUtil_1.entityUtil.appendEntity(content, this);
        var jingle = this.asaJingle =
            new asaEx_1.asaEx.Actor(this.scene, commonAsaInfo_1.CommonAsaInfo.nwCommon.pj);
        jingle.x = game.width / 2;
        jingle.y = game.height / 2;
        jingle.onUpdate.add(spriteUtil_1.spriteUtil.makeActorUpdater(jingle));
        jingle.hide();
        entityUtil_1.entityUtil.appendEntity(jingle, this);
        entityUtil_1.entityUtil.hideEntity(this);
    };
    /**
     * 表示系以外のオブジェクトをdestroyする
     * 表示系のオブジェクトはg.Eのdestroyに任せる
     * @override
     */
    GameSubscene.prototype.destroy = function () {
        if (this.destroyed()) {
            return;
        }
        if (this.requestedNextSubscene) {
            this.requestedNextSubscene.destroy();
            this.requestedNextSubscene = null;
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * タイトル画面のBGMのアセット名を返すメソッド
     * @return {string} アセット名
     */
    GameSubscene.prototype.getTitleBgmName = function () {
        return this.gameContent.getTitleBgmName();
    };
    /**
     * 表示を開始する
     * このサブシーンに遷移するワイプ演出で表示が始まる時点で呼ばれる
     * @override
     */
    GameSubscene.prototype.showContent = function () {
        this.gameContent.showContent();
        entityUtil_1.entityUtil.showEntity(this.gameContent);
        entityUtil_1.entityUtil.showEntity(this);
    };
    /**
     * 動作を開始する
     * このサブシーンに遷移するワイプ演出が完了した時点で呼ばれる
     * @override
     */
    GameSubscene.prototype.startContent = function () {
        this.inPreGameGuide = this.gameContent.startPreGameGuide();
        if (!this.inPreGameGuide) {
            this.startReady();
        }
    };
    /**
     * Scene#updateを起点とする処理から呼ばれる
     * @override
     */
    GameSubscene.prototype.handleUpdateSubscene = function () {
        if (this.inPreGameGuide) {
            if (this.gameContent.handleUpdatePreGameGuide()) {
                this.inPreGameGuide = false;
                this.startReady();
            }
        }
        this.gameContent.handleUpdateScene();
    };
    /**
     * 動作を停止する
     * このサブシーンから遷移するワイプ演出が始まる時点で呼ばれる
     * @override
     */
    GameSubscene.prototype.stopContent = function () {
        // NOP
    };
    /**
     * 表示を終了する
     * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる
     * @override
     */
    GameSubscene.prototype.hideContent = function () {
        entityUtil_1.entityUtil.hideEntity(this);
        entityUtil_1.entityUtil.hideEntity(this.asaJingle);
        entityUtil_1.entityUtil.hideEntity(this.gameContent);
        this.gameContent.hideContent();
    };
    /**
     * ReadyGoジングルを開始する
     */
    GameSubscene.prototype.startReady = function () {
        if (this.gameContent.needsReadyGoJingle()) {
            this.asaJingle.play(commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.readyGo, 0, false, 1);
            this.asaJingle.ended.add(this.handleReadyEnd, this);
            entityUtil_1.entityUtil.showEntity(this.asaJingle);
            audioUtil_1.audioUtil.play(commonSoundInfo_1.CommonSoundInfo.seSet.ready);
        }
        else {
            this.startGame();
        }
    };
    /**
     * Actor#endedのハンドラ
     * ReadyGoアニメの終了時用
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    GameSubscene.prototype.handleReadyEnd = function () {
        entityUtil_1.entityUtil.hideEntity(this.asaJingle);
        this.startGame();
        return true;
    };
    /**
     * ゲームを開始する
     */
    GameSubscene.prototype.startGame = function () {
        audioUtil_1.audioUtil.play(this.gameContent.getMainBgmName());
        this.gameContent.timeCaution.add(this.handleTimeCaution, this);
        this.gameContent.timeCautionCancel.add(this.handleTimeCautionCancel, this);
        this.gameContent.timeup.add(this.handleTimeup, this);
        this.gameContent.timeout.add(this.handleTimeout, this);
        this.gameContent.gameClear.add(this.handleGameClear, this);
        this.gameContent.gameOver.add(this.handleGameOver, this);
        this.gameContent.startGame();
    };
    /**
     * GaemBase#timeCautionのハンドラ
     * 残り時間警告の赤点滅を開始する
     */
    GameSubscene.prototype.handleTimeCaution = function () {
        this.cautionFill.startBlink();
    };
    /**
     * GaemBase#timeCautionCancelのハンドラ
     * 残り時間警告の赤点滅を中断する
     */
    GameSubscene.prototype.handleTimeCautionCancel = function () {
        this.cautionFill.stopBlink();
    };
    /**
     * GaemBase#timeupのハンドラ
     * タイムアップ演出を開始する
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    GameSubscene.prototype.handleTimeup = function () {
        this.finishGame(commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.timeup);
        return true;
    };
    /**
     * GaemBase#timeoutのハンドラ
     * タイムアウト演出を開始する
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    GameSubscene.prototype.handleTimeout = function () {
        this.finishGame(commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.timeout);
        return true;
    };
    /**
     * GaemBase#gameClearのハンドラ
     * ゲームクリア演出を開始する
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    GameSubscene.prototype.handleGameClear = function () {
        this.finishGame(commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.gameClear);
        return true;
    };
    /**
     * GaemBase#gameOverのハンドラ
     * ゲームオーバー演出を開始する
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    GameSubscene.prototype.handleGameOver = function () {
        this.finishGame(commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.gameOver);
        return true;
    };
    /**
     * タイムアップ/タイムアウト/ゲームクリア/ゲームオーバー時の処理を行う
     * @param {string} _jingleAnimName ジングルアニメ名
     */
    GameSubscene.prototype.finishGame = function (_jingleAnimName) {
        audioUtil_1.audioUtil.stop(this.gameContent.getMainBgmName());
        this.cautionFill.stopBlink();
        this.gameContent.timeCaution.removeAll({ owner: this });
        this.gameContent.timeCautionCancel.removeAll({ owner: this });
        this.gameContent.timeup.removeAll({ owner: this });
        this.gameContent.timeout.removeAll({ owner: this });
        this.gameContent.gameClear.removeAll({ owner: this });
        this.gameContent.gameOver.removeAll({ owner: this });
        this.asaJingle.play(_jingleAnimName, 0, false, 1, true);
        entityUtil_1.entityUtil.showEntity(this.asaJingle);
        audioUtil_1.audioUtil.play(commonSoundInfo_1.CommonSoundInfo.seSet.timeup);
        this.scene.setTimeout(this.handleTimeupEnd, commonDefine_1.commonDefine.TIMEUP_WAIT, this);
    };
    /**
     * Scene#setTimeoutのハンドラ
     * Timeup演出の終了時用
     * 次のシーンへの遷移を要求する
     */
    GameSubscene.prototype.handleTimeupEnd = function () {
        this.requestedNextSubscene.fire();
    };
    return GameSubscene;
}(subscene_1.Subscene));
exports.GameSubscene = GameSubscene;
