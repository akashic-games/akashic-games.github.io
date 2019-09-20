"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asaEx_1 = require("../util/asaEx");
var entityUtil_1 = require("../util/entityUtil");
var asaInfo_1 = require("./asaInfo");
var define_1 = require("./define");
var gameParameterReader_1 = require("./gameParameterReader");
/**
 * ワークマン管理クラス
 */
var Workman = /** @class */ (function () {
    /**
     * ワークマンの作成
     * @param  {g.Scene} _scene  シーン
     * @param  {g.E}     _parent 親エンティティ
     */
    function Workman(_scene, _parent) {
        /** 属するゲーム */
        this.game = null;
        /** ワークマンとゴンドラ */
        this.spr = null;
        /** ワークマン手 */
        this.sprHand = null;
        /** ワークマン手アタッチメント */
        this.attachHand = null;
        /** 攻撃中 */
        this.flgAttack = false;
        /** 攻撃中停止位置 */
        this.stopFrame = 0;
        /** 攻撃中カウンタ */
        this.cntStop = 0;
        /** 弾レベル */
        this.level = null;
        /** ゴンドラスピード */
        this.gondolaSpeed = 1.0;
        this.game = _scene.game;
        this.level = define_1.define.BulletLevel.nail;
        this.spr = new asaEx_1.asaEx.Actor(_scene, asaInfo_1.AsaInfo.workman.pj, asaInfo_1.AsaInfo.workman.anim.gondola);
        this.spr.moveTo(this.game.width / 2, this.game.height / 2);
        entityUtil_1.entityUtil.appendEntity(this.spr, _parent);
        this.sprHand = new asaEx_1.asaEx.Actor(_scene, asaInfo_1.AsaInfo.workman.pj, asaInfo_1.AsaInfo.workman.anim.hand);
        // アタッチ
        this.attachHand = new asaEx_1.asaEx.ActorAttachment(this.sprHand);
        this.spr.attach(this.attachHand, define_1.define.WKMAN_ATTACH_POINT_GONDOLA);
        this.changeHand(define_1.define.WKMAN_ATTACH_POS_NORMAL, asaInfo_1.AsaInfo.workman.anim.hand);
        this.spr.modified();
        this.spr.calc();
        this.sprHand.modified();
        this.sprHand.calc();
    }
    /**
     * ゲーム毎の初期化
     */
    Workman.prototype.init = function () {
        this.level = gameParameterReader_1.GameParameterReader.startItemLevel;
        this.flgAttack = false;
        this.cntStop = 0;
        this.spr.play(asaInfo_1.AsaInfo.workman.anim.gondola, 0, true, this.gondolaSpeed);
        this.changeHand(define_1.define.WKMAN_ATTACH_POS_NORMAL, asaInfo_1.AsaInfo.workman.anim.hand);
    };
    /**
     * ゲーム中の更新処理
     */
    Workman.prototype.update = function () {
        if (this.flgAttack) {
            ++this.cntStop;
            // 攻撃時フレームでゴンドラ止める
            this.spr.play(asaInfo_1.AsaInfo.workman.anim.gondola, this.stopFrame, true, this.gondolaSpeed);
            if (this.cntStop > define_1.define.ATTCK_STOP_TIME) {
                this.flgAttack = false;
                this.cntStop = 0;
                // 通常腕に戻す
                this.changeHand(define_1.define.WKMAN_ATTACH_POS_NORMAL, asaInfo_1.AsaInfo.workman.anim.hand);
                // ゴンドラ移動反転
                // 往復で1アニメの場合 (総フレーム数 - 現在のフレーム - 1)
                this.spr.play(asaInfo_1.AsaInfo.workman.anim.gondola, this.spr.animation.frameCount - this.stopFrame - 1, true, this.gondolaSpeed);
            }
        }
        if (this.spr) {
            this.spr.modified();
            this.spr.calc();
        }
        if (this.sprHand) {
            this.sprHand.modified();
            this.sprHand.calc();
        }
    };
    /**
     * ワークマンアタック
     */
    Workman.prototype.pointDown = function () {
        if (this.flgAttack) {
            return;
        }
        this.flgAttack = true; // 攻撃中フラグオン
        this.stopFrame = this.spr.currentFrame; // 攻撃時フレーム（ゴンドラ高さ）記憶
        this.cntStop = 0;
        this.changeHand(define_1.define.WKMAN_ATTACH_POS_ATTACK, asaInfo_1.AsaInfo.workman.anim.attack); // 攻撃腕に
    };
    /**
     * 攻撃位置取得
     * @return {g.CommonOffset} 攻撃腕のポイント
     */
    Workman.prototype.getAttackPosition = function () {
        return this.spr.getBonePositionInScene(define_1.define.WKMAN_ATTACH_POINT_ATTACK);
    };
    /**
     * 弾レベル取得
     * @return {define.BulletLevel} 弾レベル
     */
    Workman.prototype.getLevel = function () {
        return this.level;
    };
    /**
     * レベルアップ
     */
    Workman.prototype.plusLevel = function () {
        if (this.level === define_1.define.BulletLevel.hammer) {
            return;
        }
        this.level += 1;
    };
    /**
     * 攻撃中フラグ取得
     * @return {boolean} 攻撃中フラグ
     */
    Workman.prototype.isAttack = function () {
        return this.flgAttack;
    };
    /**
     * 手の切り替え
     * @param {g.CommonOffset} _attachPoint 新しいアタッチポイント
     * @param {string}         _anime       新しいアニメ
     */
    Workman.prototype.changeHand = function (_attachPoint, _anime) {
        this.sprHand.moveTo(_attachPoint);
        // 新しいアニメ 攻撃腕の場合でも投げきった状態で止めるのでloopはfalse
        this.sprHand.play(_anime, 0, false, 1.0);
    };
    return Workman;
}());
exports.Workman = Workman;
