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
var audioUtil_1 = require("../util/audioUtil");
var commonDefine_1 = require("./commonDefine");
/**
 * タイトルサブシーンの処理と表示を行うクラス
 */
var TitleSubscene = /** @class */ (function (_super) {
    __extends(TitleSubscene, _super);
    function TitleSubscene(_scene) {
        return _super.call(this, _scene) || this;
    }
    /**
     * このクラスで使用するオブジェクトを生成する
     * @override
     */
    TitleSubscene.prototype.init = function () {
        this.autoNext = (commonDefine_1.commonDefine.TITLE_WAIT > 0);
        this.inContent = false;
        this.bgmName = "";
        this.requestedNextSubscene = new g.Trigger();
        var game = this.scene.game;
        var title = this.asaTitle =
            new asaEx_1.asaEx.Actor(this.scene, commonAsaInfo_1.CommonAsaInfo.nwTitle.pj);
        title.x = game.width / 2;
        title.y = game.height / 2;
        title.update.handle(spriteUtil_1.spriteUtil.makeActorUpdater(title));
        title.hide();
        entityUtil_1.entityUtil.appendEntity(title, this);
        entityUtil_1.entityUtil.hideEntity(this);
    };
    /**
     * 表示系以外のオブジェクトをdestroyする
     * 表示系のオブジェクトはg.Eのdestroyに任せる
     * @override
     */
    TitleSubscene.prototype.destroy = function () {
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
     * タイトル画面のBGMのアセット名を設定するメソッド
     * @param {string} _bgmName タイトル画面のBGMのアセット名
     */
    TitleSubscene.prototype.setBgmName = function (_bgmName) {
        this.bgmName = _bgmName;
    };
    /**
     * 表示を開始する
     * このサブシーンに遷移するワイプ演出で表示が始まる時点で呼ばれる
     * @override
     */
    TitleSubscene.prototype.showContent = function () {
        audioUtil_1.audioUtil.play(this.bgmName);
        entityUtil_1.entityUtil.showEntity(this);
    };
    /**
     * 動作を開始する
     * このサブシーンに遷移するワイプ演出が完了した時点で呼ばれる
     * @override
     */
    TitleSubscene.prototype.startContent = function () {
        this.inContent = true;
        this.asaTitle.play(commonAsaInfo_1.CommonAsaInfo.nwTitle.anim.title, 0, false, 1);
        entityUtil_1.entityUtil.showEntity(this.asaTitle);
        if (this.autoNext) {
            this.scene.setTimeout(commonDefine_1.commonDefine.TITLE_WAIT, this, this.onTimeout);
            if (commonDefine_1.commonDefine.TOUCH_SKIP_WAIT > 0) {
                this.scene.setTimeout(commonDefine_1.commonDefine.TOUCH_SKIP_WAIT, this, this.onTimeoutToTouch);
            }
        }
        else {
            this.asaTitle.ended.handle(this, this.onTitleEnd);
        }
    };
    /**
     * Scene#updateを起点とする処理から呼ばれる
     * @override
     */
    TitleSubscene.prototype.onUpdate = function () {
        // NOP
    };
    /**
     * 動作を停止する
     * このサブシーンから遷移するワイプ演出が始まる時点で呼ばれる
     * @override
     */
    TitleSubscene.prototype.stopContent = function () {
        // console.log("TitleSubscene.stopContent: inContent:"+this.inContent+".");
        this.inContent = false;
        this.scene.pointDownCapture.removeAll(this);
    };
    /**
     * 表示を終了する
     * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる
     * @override
     */
    TitleSubscene.prototype.hideContent = function () {
        audioUtil_1.audioUtil.stop(this.bgmName);
        entityUtil_1.entityUtil.hideEntity(this);
        entityUtil_1.entityUtil.hideEntity(this.asaTitle);
    };
    /**
     * Scene#setTimeoutのハンドラ
     * 次のシーンへの遷移を要求する
     */
    TitleSubscene.prototype.onTimeout = function () {
        // console.log("TitleSubscene.onTimeout: inContent:"+this.inContent+".");
        if (this.inContent) {
            this.requestedNextSubscene.fire();
        }
    };
    /**
     * Scene#setTimeoutのハンドラ
     * タッチ受付を開始する
     */
    TitleSubscene.prototype.onTimeoutToTouch = function () {
        // console.log("TitleSubscene.onTimeoutToTouch: inContent:"+this.inContent+".");
        if (this.inContent) {
            this.scene.pointDownCapture.handle(this, this.onTouch);
        }
    };
    /**
     * Actor#endedのハンドラ
     * タイトルロゴアニメの終了時用
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    TitleSubscene.prototype.onTitleEnd = function () {
        if (this.inContent) {
            this.scene.pointDownCapture.handle(this, this.onTouch);
        }
        return true;
    };
    /**
     * Scene#pointDownCaptureのハンドラ
     * 次のシーンへの遷移を要求する
     * @param {g.PointDownEvent} e イベントパラメータ
     * @return {boolean} trueを返し、ハンドラ登録を解除する
     */
    TitleSubscene.prototype.onTouch = function (_e) {
        // console.log("TitleSubscene.onTouch: inContent:"+this.inContent+".");
        if (this.inContent) {
            this.requestedNextSubscene.fire();
        }
        return true;
    };
    return TitleSubscene;
}(subscene_1.Subscene));
exports.TitleSubscene = TitleSubscene;
