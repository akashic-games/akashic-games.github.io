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
exports.ResultSubscene = void 0;
var commonAsaInfo_1 = require("./commonAsaInfo");
var commonAssetInfo_1 = require("./commonAssetInfo");
var commonSoundInfo_1 = require("./commonSoundInfo");
var commonDefine_1 = require("./commonDefine");
var asaEx_1 = require("../util/asaEx");
var spriteUtil_1 = require("../util/spriteUtil");
var entityUtil_1 = require("../util/entityUtil");
var gameUtil_1 = require("../util/gameUtil");
var audioUtil_1 = require("../util/audioUtil");
var subscene_1 = require("../commonNicowariGame/subscene");
/**
 * リザルトサブシーンの処理と表示を行うクラス
 */
var ResultSubscene = /** @class */ (function (_super) {
    __extends(ResultSubscene, _super);
    function ResultSubscene(_scene) {
        var _this = _super.call(this, _scene) || this;
        /** tips画像リスト */
        _this.tipsImgList = [];
        return _this;
    }
    /**
     * このクラスで使用するオブジェクトを生成する
     * @override
     */
    ResultSubscene.prototype.init = function () {
        this.requestedNextSubscene = new g.Trigger();
        var game = this.scene.game;
        if (commonDefine_1.commonDefine.SHOW_TIPS) {
            this.offsetY = 0;
            this.initTipsImgList();
        }
        else {
            this.offsetY = commonDefine_1.commonDefine.RESULT_OBJECTS_OFFSET_Y;
        }
        var result = this.asaResult =
            new asaEx_1.asaEx.Actor(this.scene, commonAsaInfo_1.CommonAsaInfo.nwCommon.pj);
        result.x = game.width / 2;
        result.y = (game.height / 2) + this.offsetY;
        result.onUpdate.add(spriteUtil_1.spriteUtil.makeActorUpdater(result));
        result.hide();
        entityUtil_1.entityUtil.appendEntity(result, this);
        this.scoreValue = 0;
        var font = gameUtil_1.gameUtil.createNumFontWithAssetInfo(commonAssetInfo_1.CommonAssetInfo.numResult);
        var score = this.scoreLabel = entityUtil_1.entityUtil.createNumLabel(this.scene, font, commonDefine_1.commonDefine.RESULT_SCORE_DIGIT);
        entityUtil_1.entityUtil.moveNumLabelTo(score, 320 + ((game.width - 480) / 2), 84 + this.offsetY, font);
        score.hide();
        entityUtil_1.entityUtil.appendEntity(score, this);
        this.isRolling = false;
        entityUtil_1.entityUtil.hideEntity(this);
    };
    /**
     * 表示系以外のオブジェクトをdestroyする
     * 表示系のオブジェクトはg.Eのdestroyに任せる
     * @override
     */
    ResultSubscene.prototype.destroy = function () {
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
     * 表示を開始する
     * このサブシーンに遷移するワイプ演出で表示が始まる時点で呼ばれる
     * @override
     */
    ResultSubscene.prototype.showContent = function () {
        this.scoreValue = gameUtil_1.gameUtil.getGameScore();
        this.scoreLabel.hide();
        entityUtil_1.entityUtil.showEntity(this);
    };
    /**
     * 動作を開始する
     * このサブシーンに遷移するワイプ演出が完了した時点で呼ばれる
     * @override
     */
    ResultSubscene.prototype.startContent = function () {
        this.asaResult.play(commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.result, 0, false, 1);
        this.createTips();
        audioUtil_1.audioUtil.play(commonSoundInfo_1.CommonSoundInfo.seSet.rollResult);
        this.isRolling = true;
        this.setScoreLabelText();
        entityUtil_1.entityUtil.showEntity(this.scoreLabel);
        entityUtil_1.entityUtil.showEntity(this.asaResult);
        this.scene.setTimeout(this.handleRollEnd, commonDefine_1.commonDefine.RESULT_ROLL_WAIT, this);
    };
    /**
     * Scene#updateを起点とする処理から呼ばれる
     * @override
     */
    ResultSubscene.prototype.handleUpdateSubscene = function () {
        if (this.isRolling) {
            this.setScoreLabelText();
        }
    };
    /**
     * 動作を停止する
     * このサブシーンから遷移するワイプ演出が始まる時点で呼ばれる
     * @override
     */
    ResultSubscene.prototype.stopContent = function () {
        // NOP
    };
    /**
     * 表示を終了する
     * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる
     * @override
     */
    ResultSubscene.prototype.hideContent = function () {
        entityUtil_1.entityUtil.hideEntity(this);
        entityUtil_1.entityUtil.hideEntity(this.asaResult);
    };
    /**
     * スコアラベルを設定する
     */
    ResultSubscene.prototype.setScoreLabelText = function () {
        var value = this.scoreValue;
        var len = String(value).length;
        if (this.isRolling) { // 回転中はスコア桁内でランダム
            var min = Math.pow(10, len - 1);
            var max = Math.pow(10, len) - 1;
            value = Math.floor(this.scene.game.random.generate() * (max - min) + min);
        }
        entityUtil_1.entityUtil.setLabelText(this.scoreLabel, String(value));
    };
    /**
     * Scene#setTimeoutのハンドラ
     * ロール演出の終了時用
     */
    ResultSubscene.prototype.handleRollEnd = function () {
        audioUtil_1.audioUtil.stop(commonSoundInfo_1.CommonSoundInfo.seSet.rollResult);
        audioUtil_1.audioUtil.play(commonSoundInfo_1.CommonSoundInfo.seSet.rollResultFinish);
        this.isRolling = false;
        this.setScoreLabelText();
        if (commonDefine_1.commonDefine.ENABLE_RETRY) {
            // リトライ操作を受け付ける場合
            this.scene.onPointDownCapture.add(this.handleTouch, this);
        }
    };
    /**
     * Scene#pointDownCaptureのハンドラ
     * 次のシーンへの遷移を要求する
     * @param {g.PointDownEvent} _e イベントパラメータ
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    ResultSubscene.prototype.handleTouch = function (_e) {
        this.requestedNextSubscene.fire();
        return true;
    };
    /**
     * tips画像を作成する
     */
    ResultSubscene.prototype.createTips = function () {
        if (this.tipsImgList.length === 0)
            return;
        var randIndex = gameUtil_1.gameUtil.getRandomLessThanMax(this.tipsImgList.length);
        var asset = this.tipsImgList[randIndex];
        var size = commonDefine_1.commonDefine.TIPS_IMG_SIZE;
        var spr = new g.Sprite({
            scene: this.scene,
            src: this.scene.asset.getImageById(asset),
            width: size.width,
            height: size.height
        });
        spr.moveTo(commonDefine_1.commonDefine.TIPS_IMG_POS);
        entityUtil_1.entityUtil.appendEntity(spr, this);
    };
    /**
     * CommonAssetInfoからtips画像アセットをリスト化する
     */
    ResultSubscene.prototype.initTipsImgList = function () {
        var _this = this;
        this.tipsImgList = [];
        var wk = commonAssetInfo_1.CommonAssetInfo;
        Object.keys(wk).filter(function (e) {
            return (e.indexOf(commonDefine_1.commonDefine.TIPS_VAR_NAME_HEAD) === 0); // commonDefine.TIPS_VAR_NAME_HEADで始まるオブジェクト
        }).forEach(function (val) {
            var info = wk[val];
            // console.log(info.img);
            _this.tipsImgList.push(info.img);
        });
    };
    return ResultSubscene;
}(subscene_1.Subscene));
exports.ResultSubscene = ResultSubscene;
