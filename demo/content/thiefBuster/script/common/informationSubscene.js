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
var subscene_1 = require("../commonNicowariGame/subscene");
var commonAsaInfo_1 = require("./commonAsaInfo");
var asaEx_1 = require("../util/asaEx");
var spriteUtil_1 = require("../util/spriteUtil");
var entityUtil_1 = require("../util/entityUtil");
var commonDefine_1 = require("./commonDefine");
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
/**
 * 視聴者へのゲーム開始情報表示サブシーンの処理と表示を行うクラス
 */
var InformationSubscene = /** @class */ (function (_super) {
    __extends(InformationSubscene, _super);
    function InformationSubscene(_scene) {
        return _super.call(this, _scene) || this;
    }
    /**
     * このクラスで使用するオブジェクトを生成する
     * @override
     */
    InformationSubscene.prototype.init = function () {
        this.autoNext = (commonDefine_1.commonDefine.INFORMATION_WAIT > 0);
        this.inContent = false;
        this.requestedNextSubscene = new g.Trigger();
        var game = this.scene.game;
        var infoAnim = this.asaInformation = new asaEx_1.asaEx.Actor(this.scene, commonAsaInfo_1.CommonAsaInfo.nwInformation.pj);
        infoAnim.x = game.width / 2;
        infoAnim.y = game.height / 2;
        infoAnim.update.handle(spriteUtil_1.spriteUtil.makeActorUpdater(infoAnim));
        infoAnim.hide();
        entityUtil_1.entityUtil.appendEntity(infoAnim, this);
        entityUtil_1.entityUtil.hideEntity(this);
    };
    /**
     * 表示系以外のオブジェクトをdestroyする
     * 表示系のオブジェクトはg.Eのdestroyに任せる
     * @override
     */
    InformationSubscene.prototype.destroy = function () {
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
    InformationSubscene.prototype.showContent = function () {
        var anim = "";
        if (commonParameterReader_1.CommonParameterReader.launchType === commonParameterReader_1.LaunchType.SELF) {
            anim = commonAsaInfo_1.CommonAsaInfo.nwInformation.anim.self;
        }
        else if (commonParameterReader_1.CommonParameterReader.launchType === commonParameterReader_1.LaunchType.LOTTERY) {
            anim = commonAsaInfo_1.CommonAsaInfo.nwInformation.anim.lottery;
        }
        else if (commonParameterReader_1.CommonParameterReader.launchType === commonParameterReader_1.LaunchType.RANKING) {
            anim = commonAsaInfo_1.CommonAsaInfo.nwInformation.anim.ranking;
        }
        else {
            return;
        }
        this.asaInformation.play(anim, 0, false, 1);
        entityUtil_1.entityUtil.showEntity(this.asaInformation);
        entityUtil_1.entityUtil.showEntity(this);
    };
    /**
     * 動作を開始する
     * このサブシーンに遷移するワイプ演出が完了した時点で呼ばれる
     * @override
     */
    InformationSubscene.prototype.startContent = function () {
        this.inContent = true;
        if (this.autoNext) {
            this.scene.setTimeout(commonDefine_1.commonDefine.INFORMATION_WAIT, this, this.onTimeout);
            if (commonDefine_1.commonDefine.TOUCH_SKIP_WAIT > 0) {
                this.scene.setTimeout(commonDefine_1.commonDefine.TOUCH_SKIP_WAIT, this, this.onTimeoutToTouch);
            }
        }
        else {
            this.scene.pointDownCapture.handle(this, this.onTouch);
        }
    };
    /**
     * Scene#updateを起点とする処理から呼ばれる
     * @override
     */
    InformationSubscene.prototype.onUpdate = function () {
        // NOP
    };
    /**
     * 動作を停止する
     * このサブシーンから遷移するワイプ演出が始まる時点で呼ばれる
     * @override
     */
    InformationSubscene.prototype.stopContent = function () {
        this.inContent = false;
        this.scene.pointDownCapture.removeAll(this);
    };
    /**
     * 表示を終了する
     * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる
     * @override
     */
    InformationSubscene.prototype.hideContent = function () {
        entityUtil_1.entityUtil.hideEntity(this);
        entityUtil_1.entityUtil.hideEntity(this.asaInformation);
    };
    /**
     * Scene#setTimeoutのハンドラ
     * 次のシーンへの遷移を要求する
     */
    InformationSubscene.prototype.onTimeout = function () {
        if (this.inContent) {
            this.requestedNextSubscene.fire();
        }
    };
    /**
     * Scene#setTimeoutのハンドラ
     * タッチ受付を開始する
     */
    InformationSubscene.prototype.onTimeoutToTouch = function () {
        if (this.inContent) {
            this.scene.pointDownCapture.handle(this, this.onTouch);
        }
    };
    /**
     * Scene#pointDownCaptureのハンドラ
     * 次のシーンへの遷移を要求する
     * @param {g.PointDownEvent} _e イベントパラメータ
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    InformationSubscene.prototype.onTouch = function (_e) {
        if (this.inContent) {
            this.requestedNextSubscene.fire();
        }
        return true;
    };
    return InformationSubscene;
}(subscene_1.Subscene));
exports.InformationSubscene = InformationSubscene;
