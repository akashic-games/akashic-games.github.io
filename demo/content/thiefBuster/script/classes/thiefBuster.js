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
var asaEx_1 = require("../util/asaEx");
var audioUtil_1 = require("../util/audioUtil");
var entityUtil_1 = require("../util/entityUtil");
var gameUtil_1 = require("../util/gameUtil");
var spriteUtil_1 = require("../util/spriteUtil");
var asaInfo_1 = require("./asaInfo");
var assetInfo_1 = require("./assetInfo");
var define_1 = require("./define");
var soundInfo_1 = require("./soundInfo");
var timerLabel_1 = require("./timerLabel");
var workman_1 = require("./workman");
var bullet_1 = require("./bullet");
var item_1 = require("./item");
var thief_1 = require("./thief");
var score_1 = require("./score");
var combo_1 = require("./combo");
var popScore_1 = require("./popScore");
var gameParameterReader_1 = require("./gameParameterReader");
var gameBase_1 = require("../commonNicowariGame/gameBase");
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
/**
 * ゲームの実体を実装するクラス
 */
var ThiefBuster = /** @class */ (function (_super) {
    __extends(ThiefBuster, _super);
    /**
     * 継承元のコンストラクタをよぶ
     * @param  {g.Scene} _scene シーン
     */
    function ThiefBuster(_scene) {
        var _this = _super.call(this, _scene) || this;
        /** 弾 */
        _this.bullets = [];
        /** 泥棒たち */
        _this.thieves = [];
        /** ドア3枚 */
        _this.doors = [];
        /** 泥棒出現段階 */
        _this.popPhase = 0;
        /** ゲーム開始からのフレーム用カウンタ */
        _this.cntGame = 0;
        /** アイテム出現用カウンタ */
        _this.cntItemPop = 0;
        /** フェイズごとの泥棒出現インデックスカウンタ */
        _this.cntPopIndexOnPhase = 0;
        return _this;
    }
    /**
     * このクラスで使用するオブジェクトを生成するメソッド
     * Scene#loadedを起点とする処理からコンストラクタの直後に呼ばれる。
     * このクラスはゲーム画面終了時も破棄されず、次のゲームで再利用される。
     * そのためゲーム状態の初期化はinitではなくshowContentで行う必要がある。
     * @override
     */
    ThiefBuster.prototype.init = function () {
        _super.prototype.init.call(this);
        var scene = this.scene;
        var game = scene.game;
        var spoUi = spriteUtil_1.spriteUtil.createSpriteParameter(assetInfo_1.AssetInfo.ui);
        var sfmUi = spriteUtil_1.spriteUtil.createSpriteFrameMap(assetInfo_1.AssetInfo.ui);
        var charCode0 = 48;
        var charCode10 = 58;
        gameParameterReader_1.GameParameterReader.read(scene);
        // 白数字
        var fontStgNum1 = gameUtil_1.gameUtil.createNumFontWithAssetInfo(assetInfo_1.AssetInfo.numWhite);
        // 赤数字
        var imgStgNum2 = this.scene.assets[assetInfo_1.AssetInfo.numRed.img];
        var jsonStgNum2 = JSON.parse(this.scene.assets[assetInfo_1.AssetInfo.numRed.json].data);
        var stgNum2FrameNames = assetInfo_1.AssetInfo.numRed.numFrames;
        var fontmapStgNum2 = gameUtil_1.gameUtil.makeGlyphMapFromFrames(charCode0, charCode10, jsonStgNum2, stgNum2FrameNames);
        gameUtil_1.gameUtil.addOneGlyphMapFromFrame("+", jsonStgNum2, assetInfo_1.AssetInfo.numRed.frames.plus, fontmapStgNum2);
        var stgNum2W = assetInfo_1.AssetInfo.numRed.fontWidth;
        var stgNum2H = assetInfo_1.AssetInfo.numRed.fontHeight;
        var fontStgNum2 = new g.BitmapFont(imgStgNum2, fontmapStgNum2, stgNum2W, stgNum2H, fontmapStgNum2[charCode0]);
        game.vars.scenedata.fontStgNum2 = fontStgNum2;
        // 青数字
        var imgStgNum3 = this.scene.assets[assetInfo_1.AssetInfo.numBlue.img];
        var jsonStgNum3 = JSON.parse(this.scene.assets[assetInfo_1.AssetInfo.numBlue.json].data);
        var stgNum3FrameNames = assetInfo_1.AssetInfo.numBlue.numFrames;
        var fontmapStgNum3 = gameUtil_1.gameUtil.makeGlyphMapFromFrames(charCode0, charCode10, jsonStgNum3, stgNum3FrameNames);
        gameUtil_1.gameUtil.addOneGlyphMapFromFrame("-", jsonStgNum3, assetInfo_1.AssetInfo.numBlue.frames.minus, fontmapStgNum3);
        var stgNum3W = assetInfo_1.AssetInfo.numBlue.fontWidth;
        var stgNum3H = assetInfo_1.AssetInfo.numBlue.fontHeight;
        var fontStgNum3 = new g.BitmapFont(imgStgNum3, fontmapStgNum3, stgNum3W, stgNum3H, fontmapStgNum2[charCode0]);
        game.vars.scenedata.fontStgNum3 = fontStgNum3;
        // レイヤー
        this.layerBuilding = new g.E({ scene: scene });
        this.layerThief = new g.E({ scene: scene });
        this.layerBullet = new g.E({ scene: scene });
        this.layerItem = new g.E({ scene: scene });
        entityUtil_1.entityUtil.appendEntity(this.layerBuilding, this);
        entityUtil_1.entityUtil.appendEntity(this.layerThief, this);
        entityUtil_1.entityUtil.appendEntity(this.layerBullet, this);
        entityUtil_1.entityUtil.appendEntity(this.layerItem, this);
        // タイマー
        var iconT = spriteUtil_1.spriteUtil.createFrameSprite(spoUi, sfmUi, assetInfo_1.AssetInfo.ui.frames.iconT);
        iconT.moveTo(define_1.define.ICON_T_X, define_1.define.ICON_T_Y);
        entityUtil_1.entityUtil.appendEntity(iconT, this.layerItem);
        var timer = this.timerLabel = new timerLabel_1.TimerLabel(this.scene);
        timer.createLabel(assetInfo_1.AssetInfo.numWhite, assetInfo_1.AssetInfo.numRed);
        timer.moveLabelTo(define_1.define.GAME_TIMER_X, define_1.define.GAME_TIMER_Y);
        entityUtil_1.entityUtil.appendEntity(timer, this.layerItem);
        var spoStage = spriteUtil_1.spriteUtil.createSpriteParameter(assetInfo_1.AssetInfo.stage);
        var sfmStage = spriteUtil_1.spriteUtil.createSpriteFrameMap(assetInfo_1.AssetInfo.stage);
        var stageBG = spriteUtil_1.spriteUtil.createFrameSprite(spoStage, sfmStage, assetInfo_1.AssetInfo.stage.frames.bg);
        stageBG.moveTo(define_1.define.POS_STAGE_BG);
        entityUtil_1.entityUtil.appendEntity(stageBG, this.layerBuilding);
        // ステージ背景とステージメインの間
        this.wkman = new workman_1.Workman(scene, this.layerBuilding);
        var stage = spriteUtil_1.spriteUtil.createFrameSprite(spoStage, sfmStage, assetInfo_1.AssetInfo.stage.frames.building);
        stage.moveTo(define_1.define.POS_STAGE);
        entityUtil_1.entityUtil.appendEntity(stage, this.layerBuilding);
        var stageSide = spriteUtil_1.spriteUtil.createFrameSprite(spoStage, sfmStage, assetInfo_1.AssetInfo.stage.frames.buildingSide);
        stageSide.moveTo(define_1.define.POS_STAGE_SIDE);
        entityUtil_1.entityUtil.appendEntity(stageSide, this.layerItem); // 泥棒より手前
        // スコア
        var iconPt = spriteUtil_1.spriteUtil.createFrameSprite(spoUi, sfmUi, assetInfo_1.AssetInfo.ui.frames.iconPt);
        iconPt.moveTo(define_1.define.ICON_PT_X, define_1.define.ICON_PT_Y);
        entityUtil_1.entityUtil.appendEntity(iconPt, this.layerItem);
        this.score = new score_1.Score(this.scene);
        entityUtil_1.entityUtil.appendEntity(this.score, this.layerItem);
        this.score.createScoreLabel(fontStgNum1, define_1.define.GAME_SCORE_DIGIT, { x: define_1.define.GAME_SCORE_X, y: define_1.define.GAME_SCORE_Y });
        this.combo = new combo_1.Combo(this.scene, this.layerItem, gameUtil_1.gameUtil.createNumFontWithAssetInfo(assetInfo_1.AssetInfo.numCb), asaInfo_1.AsaInfo.combo.pj, asaInfo_1.AsaInfo.combo.anim.combo, define_1.define.POS_COMBO, define_1.define.COMBO_DIGIT, define_1.define.COMBO_DIVISOR, define_1.define.COMBO_PIVOT);
        this.popScore = new popScore_1.PopScore(this.scene, this.layerItem, fontStgNum2, fontStgNum3, asaInfo_1.AsaInfo.scorePopPoint.pj, asaInfo_1.AsaInfo.scorePopPoint.anim.plus, asaInfo_1.AsaInfo.scorePopPoint.anim.minus, define_1.define.POS_POINT_OFFSET_Y_1, define_1.define.POS_POINT_OFFSET_Y_2, define_1.define.POP_SCORE_PIVOT, define_1.define.POP_SCORE_DIGIT);
        for (var i = 0; i < 3; ++i) {
            this.doors.push(this.createDoor(i));
        }
        this.item = new item_1.Item(this.scene, this.layerItem);
    };
    /**
     * 表示系以外のオブジェクトをdestroyするメソッド
     * 表示系のオブジェクトはg.Eのdestroyに任せる。
     * @override
     */
    ThiefBuster.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    /**
     * タイトル画面のBGMのアセット名を返すメソッド
     * 共通フロー側でBGMを鳴らさない場合は実装クラスでオーバーライドして
     * 空文字列を返すようにする
     * @return {string} アセット名
     * @override
     */
    ThiefBuster.prototype.getTitleBgmName = function () {
        return soundInfo_1.SoundInfo.bgmSet.title;
    };
    /**
     * ゲーム中のBGMのアセット名を返すメソッド
     * 共通フロー側でBGMを鳴らさない場合は実装クラスでオーバーライドして
     * 空文字列を返すようにする
     * @return {string} アセット名
     * @override
     */
    ThiefBuster.prototype.getMainBgmName = function () {
        return soundInfo_1.SoundInfo.bgmSet.main;
    };
    /**
     * 表示を開始するメソッド
     * ゲーム画面に遷移するワイプ演出で表示が始まる時点で呼ばれる。
     * @override
     */
    ThiefBuster.prototype.showContent = function () {
        this.inGame = false;
        var timeLimit = define_1.define.GAME_TIME;
        if (commonParameterReader_1.CommonParameterReader.useGameTimeLimit) {
            timeLimit = commonParameterReader_1.CommonParameterReader.gameTimeLimit;
            if (timeLimit > define_1.define.GAME_TIME_MAX) {
                timeLimit = define_1.define.GAME_TIME_MAX;
            }
        }
        else if (commonParameterReader_1.CommonParameterReader.useGameTimeMax) {
            timeLimit = define_1.define.GAME_TIME_MAX;
        }
        this.timerLabel.setTimeCount(timeLimit);
        this.timerLabel.timeCaution.handle(this, this.onTimeCaution);
        this.timerLabel.timeCautionCancel.handle(this, this.onTimeCautionCancel);
        this.wkman.init();
        this.item.init();
        for (var i = 0; i < this.thieves.length; ++i) {
            this.thieves[i].destroy();
        }
        this.thieves = [];
        for (var i = 0; i < this.doors.length; ++i) {
            this.doors[i].play(asaInfo_1.AsaInfo.door.anim.main, 0, false, 1.0); // ドア閉
            this.doors[i].pause = true;
        }
        this.score.init();
        this.combo.init();
        this.cntGame = 0;
        this.cntItemPop = 0;
        this.popPhase = 0;
        // 各フェイズの泥棒出現テーブルのランダムソート
        for (var i = 0; i < gameParameterReader_1.GameParameterReader.thiefPopRates.length; ++i) {
            this.sortArrayRandom(gameParameterReader_1.GameParameterReader.thiefPopRates[i].list);
        }
        _super.prototype.showContent.call(this);
    };
    /**
     * ゲームを開始するメソッド
     * ReadyGo演出が完了した時点で呼ばれる。
     * @override
     */
    ThiefBuster.prototype.startGame = function () {
        var _this = this;
        this.inGame = true;
        this.scene.pointDownCapture.handle(this, this.onTouch);
        var len = gameParameterReader_1.GameParameterReader.thiefPopRates.length;
        this.retTimeIdentifier = this.scene.setInterval((this.timerLabel.getTimeCount() * 1000) / len, // ゲーム制限時間のフェーズ数分の1ごと
        this, // owner
        function () {
            if (_this.popPhase < gameParameterReader_1.GameParameterReader.thiefPopRates.length - 1) {
                _this.popPhase += 1;
                _this.cntPopIndexOnPhase = 0;
                // console.log("sec" + this.timerLabel.getTimeCount() + " popPhase：" + (this.popPhase + 1));
                // console.table(define.THIEF_POP_RATES[this.popPhase].list);
            }
        });
    };
    /**
     * 表示を終了するメソッド
     * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる。
     * @override
     */
    ThiefBuster.prototype.hideContent = function () {
        this.timerLabel.timeCaution.removeAll(this);
        this.timerLabel.timeCautionCancel.removeAll(this);
        _super.prototype.hideContent.call(this);
    };
    /**
     * Scene#updateを起点とする処理から呼ばれるメソッド
     * ゲーム画面でない期間には呼ばれない。
     * @override
     */
    ThiefBuster.prototype.onUpdate = function () {
        if (this.inGame) {
            this.timerLabel.tick();
            if (this.timerLabel.getTimeCount() === 0) {
                this.finishGame();
                return; // ゲーム終了時は以降の処理を飛ばす
            }
            // 泥棒出現処理
            this.popThiefController();
            // アイテム出現処理
            this.popItemController();
            this.wkman.update();
            this.score.onUpdate();
            // 弾ループ
            for (var i = 0; i < this.bullets.length; ++i) {
                var bul = this.bullets[i]; // 短縮
                var bulArea = bul.getCollArea();
                // 画面外に出たら
                if (bulArea.x > (this.scene.game.width - define_1.define.OFFSET_X)) {
                    bul.destroySpr(); // 弾の削除
                    continue; // 次の弾へ
                }
                // アイテムに当たったら
                this.collWithItem(bulArea);
                // 泥棒に当たったら
                this.collWithThief(bul);
            } // end 弾ループ
            // 泥棒逃亡
            for (var i = 0; i < this.thieves.length; ++i) {
                var thief = this.thieves[i]; // 短縮
                if (thief.isDead()) {
                    continue;
                }
                // ドアとの判定
                this.collWithDoor(thief);
            } // end泥棒ループ
            // ドアクローズ音
            this.playCloseDoorSE();
            // 削除された弾を配列から取り除く
            this.spliceDestroyedBullet();
            // 削除された泥棒を配列から取り除く
            this.spliceDestroyedThief();
        } // end if (this.inGame)
    };
    /**
     * ゲームスタート前の説明
     * @return {boolean} trueで有効
     * @override
     */
    ThiefBuster.prototype.startPreGameGuide = function () {
        return false;
    };
    /**
     * ゲームスタート前の説明中の更新処理
     * @return {boolean} trueで終了
     * @override
     */
    ThiefBuster.prototype.onUpdatePreGameGuide = function () {
        return true;
    };
    /**
     * TimerLabel#timeCautionのハンドラ
     */
    ThiefBuster.prototype.onTimeCaution = function () {
        this.timeCaution.fire();
    };
    /**
     * TimerLabel#timeCautionCancelのハンドラ
     */
    ThiefBuster.prototype.onTimeCautionCancel = function () {
        this.timeCautionCancel.fire();
    };
    /**
     * ゲームを終了するメソッド
     * gameUtil.setGameScoreしたスコアが結果画面で表示される。
     * @param {boolean = false} opt_isLifeZero
     * (optional)ライフ消滅によるゲーム終了の場合はtrue
     */
    ThiefBuster.prototype.finishGame = function (opt_isLifeZero) {
        if (opt_isLifeZero === void 0) { opt_isLifeZero = false; }
        this.inGame = false;
        this.scene.pointDownCapture.removeAll(this);
        this.scene.clearInterval(this.retTimeIdentifier);
        for (var i = 0; i < this.thieves.length; ++i) {
            this.thieves[i].setMoveX(); // 画面上の泥棒の移動をストップ
        }
        this.score.onFinishGame();
        var resultScore = this.score.getValue();
        // マイナスの場合があるので明示的に0
        gameUtil_1.gameUtil.setGameScore(resultScore < 0 ? 0 : resultScore);
        // 呼び出すトリガーによって共通フローのジングルアニメが変化する
        if (opt_isLifeZero) {
            this.gameOver.fire();
            this.timerLabel.forceStopBlink();
        }
        else {
            this.timeup.fire();
        }
    };
    /**
     * Scene#pointDownCaptureのハンドラ
     * @param  {g.PointDownEvent} _e イベントパラメータ
     * @return {boolean}             ゲーム終了時はtrueを返す
     */
    ThiefBuster.prototype.onTouch = function (_e) {
        if (!this.inGame) {
            return true;
        }
        if (!this.wkman.isAttack()) {
            audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.attack);
            this.wkman.pointDown(); // 腕ふり
            var level = this.wkman.getLevel(); // ワークマン現在レベル
            var atkPos = this.wkman.getAttackPosition(); // 腕ふり場所
            // 弾の生成と配列への追加
            this.bullets.push(new bullet_1.Bullet(this.scene, this.layerBullet, level, atkPos));
        }
        return false;
    };
    /**
     * ドアの作成
     * @param  {number}      _index 階層
     * @return {asaEx.Actor}        ドアActor
     */
    ThiefBuster.prototype.createDoor = function (_index) {
        var doorActor = new asaEx_1.asaEx.Actor(this.scene, asaInfo_1.AsaInfo.door.pj, asaInfo_1.AsaInfo.door.anim.main);
        doorActor.width = define_1.define.DOOR_WIDTH;
        doorActor.moveTo(define_1.define.POS_DOOR.x, define_1.define.POS_DOOR.y + (_index * define_1.define.FLOOR_HEIGHT) // 各階層の高さ
        );
        entityUtil_1.entityUtil.appendEntity(doorActor, this.layerBuilding);
        doorActor.play(asaInfo_1.AsaInfo.door.anim.main, 0, false, 1.0);
        doorActor.pause = true;
        doorActor.update.handle(doorActor, function () {
            doorActor.modified();
            doorActor.calc();
            return false;
        });
        return doorActor;
    };
    /**
     * 一次元配列のランダムソート
     * @param {number[]} _ary 配列
     */
    ThiefBuster.prototype.sortArrayRandom = function (_ary) {
        if (!Array.isArray(_ary)) {
            return;
        }
        var len = _ary.length - 1;
        while (len) {
            var randWk = this.scene.game.random[0].get(0, len);
            var wk = _ary[len];
            _ary[len] = _ary[randWk];
            _ary[randWk] = wk;
            len -= 1;
        }
    };
    /**
     * 泥棒出現管理
     */
    ThiefBuster.prototype.popThiefController = function () {
        var info = gameParameterReader_1.GameParameterReader.thiefPopRates[this.popPhase];
        if (this.cntGame === 0 ||
            this.cntGame % info.popInterval === 0) {
            var retIndex = define_1.define.ThiefType.short;
            // フェイズごとのランダムソートされた泥棒リストから選択
            retIndex = info.list[this.cntPopIndexOnPhase];
            // フェイズごとのインデックスを進める
            ++this.cntPopIndexOnPhase;
            if (this.cntPopIndexOnPhase >= info.list.length) {
                this.cntPopIndexOnPhase = 0;
            }
            // 選択した泥棒の出現高さを取得
            var floorIndex = this.findOfFloor(info.floor, retIndex);
            this.sortArrayRandom(info.floor[floorIndex].value);
            // 泥棒の生成と配列への追加
            this.thieves.push(new thief_1.Thief(this.scene, this.layerThief, retIndex, info.floor[floorIndex].value[0] // ランダムソート後の1番目
            ));
        }
        ++this.cntGame;
    };
    /**
     * 指定配列の中からtype値が一致する要素があるindex番号を返す
     * @param  {define.PopFloorInterface[]} _ary  配列
     * @param  {number}                     _type 種別
     * @return {number}                           該当Index
     */
    ThiefBuster.prototype.findOfFloor = function (_ary, _type) {
        for (var i = 0; i < _ary.length; ++i) {
            if (_ary[i].type === _type) {
                return i;
            }
        }
        return 0;
    };
    /**
     * アイテム出現管理
     */
    ThiefBuster.prototype.popItemController = function () {
        if (this.beforeLevel !== this.wkman.getLevel()) {
            this.cntItemPop = 0; // 再計測開始
        }
        ++this.cntItemPop;
        // アイテムとるまでは休みなく出す
        if (this.cntItemPop > this.scene.game.fps * gameParameterReader_1.GameParameterReader.itemPopInterval) {
            this.item.popItem(this.wkman.getLevel()); // アイテムの出現
        }
        this.beforeLevel = this.wkman.getLevel(); // レベルの記憶
    };
    /**
     * 弾と泥棒との衝突
     * @param {Bullet} _bul 弾
     */
    ThiefBuster.prototype.collWithThief = function (_bul) {
        var bulArea = _bul.getCollArea();
        for (var i = 0; i < this.thieves.length; ++i) {
            var thief = this.thieves[i]; // 短縮
            var thiefArea = thief.getCollArea(); // 当たり判定エリア取得
            var plusScore = 0;
            // 弾と泥棒との当たり判定
            if (thief.checkCollisionStat() && // 当たり判定可能状態かつ
                g.Collision.intersectAreas(bulArea, thiefArea)) {
                // 泥棒のlife削る、泥棒の絶命時は自身の得点を返す
                plusScore = thief.minusLife();
                _bul.minusLife(); // 弾のlife削る
                if (plusScore !== 0) {
                    _bul.addKill(); // 弾ごとのキルカウント
                    thief.deathCry(_bul.getKill()); // 断末魔の叫び
                    // コンボなどのエフェクト作成と最終的なスコア計算
                    var comboValue = this.combo.getComboValue(plusScore);
                    this.combo.playComboAnim();
                    this.popScore.createPopScore(thief.getPosition(), comboValue);
                    this.score.startPlus(comboValue); // スコア加算開始
                }
            }
            if (_bul.checkSprDestroyed()) {
                break; // 泥棒との当たり判定ループ抜ける
            }
        }
    };
    /**
     * 弾とアイテムとの衝突処理
     * @param {g.CommonArea} _bulArea 弾の領域
     */
    ThiefBuster.prototype.collWithItem = function (_bulArea) {
        var item = this.item; // 短縮
        var itemArea = item.getCollArea();
        if (item.checkCollisionStat() && // 当たり判定可能状態かつ
            g.Collision.intersectAreas(_bulArea, itemArea)) {
            item.setAnimeGet(); // アニメをゲットに
            this.wkman.plusLevel(); // レベルアップ
        }
    };
    /**
     * 泥棒とドアとの衝突処理
     * @param {Thief} _thief 泥棒
     */
    ThiefBuster.prototype.collWithDoor = function (_thief) {
        var thiefPos = _thief.getPosition();
        var indexY = _thief.getIndexPosY();
        var door = this.doors[indexY];
        // ドア位置に達したら
        if (thiefPos.x < define_1.define.POS_DOOR.x + (door.width / 2) + 10) {
            if (!_thief.isStopDoor()) {
                _thief.setAnime(_thief.getAnimeTypes().in); // ドアに入るアニメに
            }
            else {
                if (_thief.isInDoor()) {
                    audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.open); // ドアオープン音
                    // ドア開閉アニメスタート
                    door.play(asaInfo_1.AsaInfo.door.anim.main, 0, false, 0.7);
                    // マイナスエフェクト作成
                    var minusValue = this.combo.getComboValue(define_1.define.SCORE_MINUS);
                    this.combo.playComboAnim();
                    this.popScore.createPopScore(thiefPos, minusValue);
                    this.score.startPlus(minusValue); // スコア減算開始
                    _thief.setFlgInDoor(false); // この条件にまた入らないようにset
                }
            }
        }
    };
    /**
     * ドア閉じる音鳴らす
     */
    ThiefBuster.prototype.playCloseDoorSE = function () {
        for (var i = 0; i < this.doors.length; ++i) {
            // アニメ終わったら
            if (this.doors[i].currentFrame >= this.doors[i].animation.frameCount - 1) {
                audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.close);
                this.doors[i].play(asaInfo_1.AsaInfo.door.anim.main, 0, false, 1.0); // ドア開閉
                this.doors[i].pause = true;
            }
        }
    };
    /**
     * 使命を終えた弾を配列から除去
     */
    ThiefBuster.prototype.spliceDestroyedBullet = function () {
        // 途中で取り除く可能性があるので最大値からマイナスループ
        for (var i = this.bullets.length - 1; i >= 0; --i) {
            if (this.bullets[i].checkSprDestroyed()) {
                this.bullets.splice(i, 1); // 配列から要素取り除き
            }
        }
    };
    /**
     * 使命を終えた泥棒を配列から除去
     */
    ThiefBuster.prototype.spliceDestroyedThief = function () {
        // 途中で取り除く可能性があるので最大値からマイナスループ
        for (var i = this.thieves.length - 1; i >= 0; --i) {
            if (this.thieves[i].checkSprDestroyed()) {
                this.thieves.splice(i, 1); // 配列から要素取り除き
            }
        }
    };
    return ThiefBuster;
}(gameBase_1.GameBase));
exports.ThiefBuster = ThiefBuster;
