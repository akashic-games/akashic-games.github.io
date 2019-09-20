"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var audioUtil_1 = require("../util/audioUtil");
var asaEx_1 = require("../util/asaEx");
var entityUtil_1 = require("../util/entityUtil");
var asaInfo_1 = require("./asaInfo");
var define_1 = require("./define");
var soundInfo_1 = require("./soundInfo");
/**
 * 泥棒管理クラス
 */
var Thief = /** @class */ (function () {
    /**
     * 泥棒の生成
     * @param  {g.Scene}          _scene  シーン
     * @param  {g.E}              _parent 親E
     * @param  {define.ThiefType} _type   泥棒タイプ
     * @param  {number}           _floor  Y位置
     */
    function Thief(_scene, _parent, _type, _floor) {
        /** 属するゲーム */
        this.game = null;
        /** 属するシーン */
        this.scene = null;
        /** 親レイヤー */
        this.layer = null;
        /** 泥棒 */
        this.spr = null;
        /** 逃げ切りトリガー */
        this.escapeStartTrigger = null;
        /** 泥棒耐久値 */
        this.life = null;
        /** 泥棒移動速度 */
        this.moveX = null;
        /** 出現Y位置リスト */
        this.popPositionListY = define_1.define.POS_THIEF_POP_LIST_Y;
        /** Y位置インデックス（ドアとの判定用） */
        this.indexPosY = null;
        /** 泥棒種類 */
        this.type = null;
        /** ドア前立ち止まりカウンタ */
        this.cntStopDoor = 0;
        /** ドア前立ち止まりフラグ */
        this.flgStopDoor = false;
        /** ドアインフラグ */
        this.flgInDoor = false;
        /** 死亡フラグ */
        this.flgDead = false;
        this.scene = _scene;
        this.game = _scene.game;
        this.layer = _parent;
        var thiefType;
        if (typeof _type === "undefined") {
            thiefType = this.game.random[0].get(0, define_1.define.NUM_OF_THIEF_TYPE - 1); // ランダム
        }
        else {
            thiefType = _type;
        }
        if (typeof _floor === "undefined") {
            this.indexPosY = this.game.random[0].get(0, 2);
        }
        else {
            this.indexPosY = _floor;
        }
        var thiefValue;
        // 泥棒タイプによって初期値を設定
        for (var i = 0; i < define_1.define.THIEF_VALUES.length; ++i) {
            if (define_1.define.THIEF_VALUES[i].type === thiefType) {
                thiefValue = define_1.define.THIEF_VALUES[i];
                break;
            }
        }
        this.type = thiefType; // このインスタンスの泥棒タイプの記憶
        // このインスタンスのメインactor
        this.spr = new asaEx_1.asaEx.Actor(_scene, asaInfo_1.AsaInfo.thief.pj, thiefValue.anim.walk1);
        this.animeTypes = thiefValue.anim;
        this.moveX = thiefValue.movSpd; // 種類ごとの速さ設定
        this.life = thiefValue.life; // 種類に応じてライフを設定
        this.spr.width = thiefValue.w; // 種類ごとの大きさ設定 幅
        this.spr.height = thiefValue.h; // 種類ごとの大きさ設定 高さ
        // 画面端だが完全に隠れない位置
        this.spr.moveTo(this.game.width - define_1.define.OFFSET_X + 10, this.popPositionListY[this.indexPosY]);
        entityUtil_1.entityUtil.appendEntity(this.spr, _parent);
        this.spr.modified();
        this.escapeStartTrigger = new g.Trigger(); // 逃げ切り用
        // 周りの状況に限らずアニメの更新と移動を行う
        this.spr.update.handle(this, this.update);
    }
    /**
     * sprとtriggerの削除
     */
    Thief.prototype.destroy = function () {
        if (!this.spr.destroyed()) {
            this.spr.destroy();
        }
        if (!this.escapeStartTrigger.destroyed()) {
            this.escapeStartTrigger.destroy();
        }
    };
    /**
     * ゲーム中の更新処理
     * @return {boolean} 通常falseを返す
     */
    Thief.prototype.update = function () {
        if (!this.spr.destroyed()) {
            this.spr.x += this.moveX;
            this.animeController();
            this.spr.modified();
            this.spr.calc();
        }
        return false;
    };
    /**
     * 弾が泥棒に当たった時
     * @return {number} スコア
     */
    Thief.prototype.minusLife = function () {
        this.life -= 1;
        this.createDamegeEffect();
        if (this.life <= 0) {
            // 泥棒やられアニメに変更
            this.moveX = 0;
            this.setAnime(this.animeTypes.down2);
            this.flgDead = true;
            return (this.type + 1) * define_1.define.SCORE_BASE;
        }
        else {
            this.setAnime(this.animeTypes.down1);
            audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.hit);
            return 0;
        }
    };
    /**
     * 現在位置取得
     * @return {g.CommonOffset} 現在位置（原点）
     */
    Thief.prototype.getPosition = function () {
        return {
            x: this.spr.x,
            y: this.spr.y
        };
    };
    /**
     * Y位置インデックス取得
     * @return {number} Y位置インデックス
     */
    Thief.prototype.getIndexPosY = function () {
        return this.indexPosY;
    };
    /**
     * 当たり判定用エリア取得
     * @return {g.CommonArea} 当たり判定用エリア 左上基準
     */
    Thief.prototype.getCollArea = function () {
        // 原点が底辺中央なので計算して返す
        return {
            x: this.spr.x - (this.spr.width / 2),
            y: this.spr.y - this.spr.height,
            width: this.spr.width,
            height: this.spr.height
        };
    };
    /**
     * 泥棒種類ごとのアニメタイプを取得
     * @return {define.ThiefAnimeType} アニメタイプ
     */
    Thief.prototype.getAnimeTypes = function () {
        return this.animeTypes;
    };
    /**
     * ドアインフラグの設定
     * @param  {boolean} _flg ドアインフラグ
     */
    Thief.prototype.setFlgInDoor = function (_flg) {
        this.flgInDoor = _flg;
    };
    /**
     * 再生するアニメをセット
     * @param  {string} _animetype アニメタイプ
     */
    Thief.prototype.setAnime = function (_animetype) {
        var _this = this;
        // 現在プレイ中のアニメの場合は処理しない
        if (this.spr.animation.name === _animetype) {
            return;
        }
        // このメソッドを使うときはループが必要なアニメを再生しない想定
        this.spr.play(_animetype, 0, false, 1.0);
        // ドアインアニメへの変更要請ありました
        if (this.spr.animation.name === this.animeTypes.in) {
            this.escapeStartTrigger.handle(function () {
                _this.flgInDoor = true; // 逃げ切りフラグオン
                return true;
            });
        }
    };
    /**
     * 移動量設定（主にゲーム終了時用）
     * @param  {number} _moveX 移動量
     */
    Thief.prototype.setMoveX = function (_moveX) {
        if (_moveX === void 0) { _moveX = 0; }
        this.moveX = _moveX;
    };
    /**
     * 死亡フラグ取得
     * @return {boolean} 死亡フラグ
     */
    Thief.prototype.isDead = function () {
        return this.flgDead;
    };
    /**
     * ドア前立ち止まりフラグを取得
     * @return {boolean} ドア前立ち止まりフラグ
     */
    Thief.prototype.isStopDoor = function () {
        return this.flgStopDoor;
    };
    /**
     * ドアインフラグを取得
     * @return {boolean} ドアインフラグ
     */
    Thief.prototype.isInDoor = function () {
        return this.flgInDoor;
    };
    /**
     * sprが削除されたか調べる
     * @return {boolean} 削除されていたらtrue
     */
    Thief.prototype.checkSprDestroyed = function () {
        return this.spr.destroyed();
    };
    /**
     * 現在当たり判定できるか否か
     * @return {boolean} できるならtrue
     */
    Thief.prototype.checkCollisionStat = function () {
        // down2アニメの時は判定しない
        if (this.spr.animation.name === this.animeTypes.down2) {
            return false;
        }
        // ドアに入り始めている
        if (this.flgStopDoor && this.cntStopDoor >= define_1.define.STOP_DOOR_TIME) {
            return false;
        }
        return true;
    };
    /**
     * 断末魔の叫び
     * @param {number} _kill 弾が倒してきた人数
     */
    Thief.prototype.deathCry = function (_kill) {
        switch (_kill) {
            case 1:
                audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.kill01);
                break;
            case 2:
                audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.kill02);
                break;
            case 3:
                audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.kill03);
                break;
            case 4:
                audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.kill04);
                break;
            default:
                break;
        }
    };
    /**
     * アニメ管理
     */
    Thief.prototype.animeController = function () {
        var actor = this.spr;
        var nowAnime = actor.animation.name;
        var anime = this.animeTypes;
        var playAnime = nowAnime;
        var flgLoop = false;
        switch (nowAnime) {
            case anime.walk1:
            case anime.walk2:
                flgLoop = true;
                break;
            // チビノッポのdown1＝down2であることを考慮して先にdown2を書いている
            case anime.down2:
                if (actor.currentFrame >= actor.animation.frameCount - 1) {
                    this.destroy();
                    return;
                }
                break;
            case anime.down1:
                // アニメ終了時
                if (actor.currentFrame >= actor.animation.frameCount - 1) {
                    playAnime = anime.walk2; // 傷つき歩行
                    flgLoop = true;
                    if (this.flgStopDoor) {
                        playAnime = anime.in;
                        flgLoop = false;
                    }
                }
                break;
            case anime.in:
                this.flgStopDoor = true;
                this.moveX = 0;
                ++this.cntStopDoor;
                if (this.cntStopDoor < define_1.define.STOP_DOOR_TIME) {
                    actor.play(playAnime, 0, flgLoop, 1.0); // 0フレーム目でとめておく
                    return;
                }
                // 以下、規定時間に達したら処理
                // ドアインフラグをオンにしているだけだが、1回しか通りたくないのでtriggerで。
                this.escapeStartTrigger.fire();
                if (actor.currentFrame >= actor.animation.frameCount - 1) {
                    this.destroy();
                    return;
                }
                break;
        }
        if (nowAnime === playAnime) {
            return; // なにもしない
        }
        actor.play(playAnime, 0, flgLoop, 1.0);
    };
    /**
     * 血しぶき生成
     */
    Thief.prototype.createDamegeEffect = function () {
        var actor = new asaEx_1.asaEx.Actor(this.scene, asaInfo_1.AsaInfo.effect.pj, asaInfo_1.AsaInfo.effect.anim.main);
        var pos = this.getPosition(); // 足元
        actor.moveTo(pos.x, pos.y - (this.spr.height / 2)); // 中心に補正
        entityUtil_1.entityUtil.appendEntity(actor, this.layer);
        actor.play(asaInfo_1.AsaInfo.effect.anim.main, 0, false, 1.0); // ループなしで再生
        actor.update.handle(actor, function () {
            actor.modified();
            actor.calc();
            if (actor.currentFrame >= actor.animation.frameCount - 1) {
                actor.destroy();
            }
            return false;
        });
    };
    return Thief;
}());
exports.Thief = Thief;
