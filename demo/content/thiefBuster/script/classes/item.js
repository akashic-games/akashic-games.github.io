"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var audioUtil_1 = require("../util/audioUtil");
var asaEx_1 = require("../util/asaEx");
var entityUtil_1 = require("../util/entityUtil");
var asaInfo_1 = require("./asaInfo");
var define_1 = require("./define");
var soundInfo_1 = require("./soundInfo");
/** アイテム種類数 ドライバー、スパナ、ハンマー */
var NUM_OF_ITEM_TYPE = 3;
/** 各アイテムのアニメ種類数 出現、取得、留まる、点滅 */
var NUM_OF_ITEM_ANIME = 4;
/**
 * アイテム管理クラス
 */
var Item = /** @class */ (function () {
    /**
     * AsaInfoからアニメ情報の紐付けと初期アイテムの生成
     * @param  {g.Scene} _scene  シーン
     * @param  {g.E}     _parent 親エンティティ
     */
    function Item(_scene, _parent) {
        /** 属するゲーム */
        this.game = null;
        /** アイテム */
        this.spr = null;
        /** 消滅カウント */
        this.cntVanish = 0;
        /** ワークマンレベル */
        this.level = null;
        /** 出現Y位置リスト */
        this.popPositionListY = define_1.define.POS_ITEM_POP_LIST_Y;
        this.game = _scene.game;
        var wkAnimeNames = [];
        var index = 0; // アニメ全種類数えるようインデックス
        for (var key in asaInfo_1.AsaInfo.item.anim) {
            // asainfo.animから順番に配列に格納
            if (asaInfo_1.AsaInfo.item.anim.hasOwnProperty(key)) {
                wkAnimeNames[index] = asaInfo_1.AsaInfo.item.anim[key];
                ++index;
            }
        }
        index = 0;
        this.animeTypes = new Array(NUM_OF_ITEM_TYPE); // アイテムアニメ管理用
        for (var i = 0; i < this.animeTypes.length; ++i) {
            // 初期化しないとエラーになる
            this.animeTypes[i] = {
                in: "",
                get: "",
                stay: "",
                lost: ""
            };
            for (var j = 0; j < NUM_OF_ITEM_ANIME; ++j) {
                if (index % NUM_OF_ITEM_ANIME === 0) {
                    this.animeTypes[i].in = wkAnimeNames[index];
                }
                else if (index % NUM_OF_ITEM_ANIME === 1) {
                    this.animeTypes[i].get = wkAnimeNames[index];
                }
                else if (index % NUM_OF_ITEM_ANIME === 2) {
                    this.animeTypes[i].stay = wkAnimeNames[index];
                }
                else if (index % NUM_OF_ITEM_ANIME === 3) {
                    this.animeTypes[i].lost = wkAnimeNames[index];
                }
                ++index;
            }
        }
        this.level = define_1.define.BulletLevel.nail; // 最初はクギ
        this.spr = new asaEx_1.asaEx.Actor(_scene, asaInfo_1.AsaInfo.item.pj, this.animeTypes[this.level - 1].in);
        entityUtil_1.entityUtil.appendEntity(this.spr, _parent);
        // 周りの状況に限らずアニメの更新と自動消滅を行う
        this.spr.update.handle(this, this.update);
        // インスタンスは一つしか作らないのでshowとhideを繰り返す
        entityUtil_1.entityUtil.hideEntity(this.spr);
    }
    /**
     * ゲーム毎の初期化
     */
    Item.prototype.init = function () {
        this.level = define_1.define.BulletLevel.nail;
        entityUtil_1.entityUtil.hideEntity(this.spr);
    };
    /**
     * ゲーム中の更新処理 this.spr.updateのハンドラ
     * @return {boolean} 通常falseを返す
     */
    Item.prototype.update = function () {
        if (!this.spr.destroyed()) {
            this.animeController();
            this.spr.modified();
            this.spr.calc();
        }
        return false;
    };
    /**
     * アイテムの出現（show）
     * @param  {define.BulletLevel} _level 弾レベル
     */
    Item.prototype.popItem = function (_level) {
        if (this.spr.visible()) {
            return;
        }
        if (_level >= define_1.define.BulletLevel.hammer) {
            return;
        }
        var pos = {
            x: this.game.random[0].get(define_1.define.POS_ITEM_POP_X_MIN, define_1.define.POS_ITEM_POP_X_MAX),
            y: this.popPositionListY[this.game.random[0].get(0, 2)]
        };
        this.level = _level;
        this.cntVanish = 0;
        this.spr.moveTo(pos);
        this.spr.play(this.animeTypes[_level - 1].in, 0, false, 1.0);
        audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.itemPop);
        entityUtil_1.entityUtil.showEntity(this.spr);
    };
    /**
     * 現在位置取得
     * @return {g.CommonOffset} 現在位置
     */
    Item.prototype.getPosition = function () {
        return { x: this.spr.x, y: this.spr.y };
    };
    /**
     * アイテム当たり判定用エリア取得
     * @return {g.CommonArea} 当たり領域
     */
    Item.prototype.getCollArea = function () {
        // 原点が中心なので左上基準に計算して返す
        return {
            x: this.spr.x - (asaInfo_1.AsaInfo.item.w / 2),
            y: this.spr.y - (asaInfo_1.AsaInfo.item.h / 2),
            width: asaInfo_1.AsaInfo.item.w,
            height: asaInfo_1.AsaInfo.item.h
        };
    };
    /**
     * アニメをgetに変更
     */
    Item.prototype.setAnimeGet = function () {
        audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.itemGet);
        this.spr.play(this.animeTypes[this.level - 1].get, 0, false, 1.0);
    };
    /**
     * 現在当たり判定できるか否か
     * @return {boolean} できるならtrue
     */
    Item.prototype.checkCollisionStat = function () {
        if (!this.spr.visible()) {
            return false;
        }
        // 出現アニメの時は当たり判定をしない
        if (this.spr.animation.name === this.animeTypes[this.level - 1].in) {
            return false;
        }
        // ゲットアニメの時は当たり判定をしない
        if (this.spr.animation.name === this.animeTypes[this.level - 1].get) {
            return false;
        }
        return true;
    };
    /**
     * アニメ管理
     */
    Item.prototype.animeController = function () {
        var actor = this.spr; // 短縮
        var nowAnime = actor.animation.name; // 現在再生中のアニメ名
        var anime = this.animeTypes[this.level - 1]; // 現レベルのアニメたち
        var playAnime = nowAnime; // 最終的に再生するアニメ とりあえず今のアニメ
        var flgLoop = false; // アニメをループさせるか否か
        switch (nowAnime) {
            case anime.in:// 出現アニメ
                if (actor.currentFrame >= actor.animation.frameCount - 1) {
                    playAnime = anime.stay; // 滞在アニメへ
                }
                break;
            case anime.stay:// 滞在アニメ
                flgLoop = true; // ループさせる
                this.cntVanish += 1; // 点滅するまでの時間カウント
                if (this.cntVanish >= define_1.define.ITEM_VANISH_LENGTH) {
                    playAnime = anime.lost; // 消滅アニメに移行
                }
                break;
            case anime.get:// 取得アニメ
                if (actor.currentFrame >= actor.animation.frameCount - 1) {
                    playAnime = anime.lost; // 一応消滅アニメに
                    entityUtil_1.entityUtil.hideEntity(this.spr); // 隠す
                    return;
                }
                break;
            case anime.lost:
                if (actor.currentFrame >= actor.animation.frameCount - 1) {
                    entityUtil_1.entityUtil.hideEntity(this.spr); // 隠す
                    return;
                }
                break;
        }
        if (nowAnime === playAnime) {
            return; // 何もせず
        }
        actor.play(playAnime, 0, flgLoop, 1.0); // 新しいアニメをゼロから再生開始
    };
    return Item;
}());
exports.Item = Item;
