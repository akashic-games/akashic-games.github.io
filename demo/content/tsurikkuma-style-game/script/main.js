"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var akashic_timeline_1 = require("@akashic-extension/akashic-timeline");
var constants_1 = require("./constants");
var FishingRod_1 = require("./entity/FishingRod");
var Sea_1 = require("./entity/Sea");
var HUDManager_1 = require("./HUDManager");
var Resources_1 = require("./Resources");
var TsurikkumaStyleGame = /** @class */ (function () {
    function TsurikkumaStyleGame(scene) {
        this.isPlaying = false;
        this.scene = scene;
        this.root = new g.E({ scene: scene });
        this.scene.append(this.root);
        createStage(this.root);
        createBear(this.root);
        this.sea = createSea(this.root);
        this.fishingRod = createFishingRod(this.root);
        this.hudManager = createHUDManager(this.root);
    }
    /**
     * ゲームを開始する
     */
    TsurikkumaStyleGame.prototype.start = function () {
        var _this = this;
        this.hudManager.startCountdown(function () { return _this._startGame(); });
    };
    /**
     * ゲームを1フレーム進める
     */
    TsurikkumaStyleGame.prototype.step = function () {
        if (!this.isPlaying)
            return;
        this.sea.checkFishOnHook(this.fishingRod);
        this.hudManager.updateTime();
        if (this.hudManager.getNowTime() <= 0) {
            // ゲーム終了
            this.isPlaying = false;
            this._finishGame();
        }
    };
    /**
     * タップしたときの処理
     */
    TsurikkumaStyleGame.prototype.onPointDown = function () {
        var _this = this;
        if (!this.isPlaying)
            return;
        this.fishingRod.catchUp(function () {
            var pattern = _this.fishingRod.getFishingPattern(_this.sea.capturedFishList);
            _this.hudManager.addScore(_this.hudManager.calcScore(_this.sea.capturedFishList));
            _this.fishingRod.fishing(pattern);
            _this.sea.destroyCapturedFish();
        });
    };
    /**
     * ゲーム本編開始
     */
    TsurikkumaStyleGame.prototype._startGame = function () {
        this.isPlaying = true;
        this.sea.startFishTimer();
    };
    /**
     * ゲーム終了時の処理
     */
    TsurikkumaStyleGame.prototype._finishGame = function () {
        this.scene.onPointUpCapture.removeAll();
        this.sea.clearFishTimer();
        this.hudManager.showTimeUp();
        if ((0, Resources_1.getResources)().param.isAtsumaru) {
            var boardId_1 = 1;
            window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId_1, g.game.vars.gameState.score).then(function () {
                window.RPGAtsumaru.experimental.scoreboards.display(boardId_1);
            });
        }
    };
    return TsurikkumaStyleGame;
}());
function main(param) {
    var scene = new g.Scene({ game: g.game });
    var timeLimit = constants_1.TIMELIMIT;
    if (param.sessionParameter.totalTimeLimit) {
        /**
         * セッションパラメータで制限時間が指定されたらその値を使用します
         * 制限時間の 10 秒ほど前にはゲーム上の演出が完了するようにします
         */
        timeLimit = Math.max(param.sessionParameter.totalTimeLimit - 10, 1);
    }
    (0, Resources_1.setResources)({
        timeline: new akashic_timeline_1.Timeline(scene),
        font: createFont(),
        timeLimit: timeLimit,
        param: param
    });
    var tsurikkumaStyleGame = new TsurikkumaStyleGame(scene);
    scene.onLoad.add(function () {
        tsurikkumaStyleGame.start();
    });
    scene.onUpdate.add(function () {
        tsurikkumaStyleGame.step();
    });
    scene.onPointDownCapture.add(function () {
        tsurikkumaStyleGame.onPointDown();
    });
    g.game.pushScene(scene);
}
exports.main = main;
/**
 * フォントを作成
 */
function createFont() {
    return new g.DynamicFont({
        game: g.game,
        fontFamily: constants_1.FONT_FAMILY,
        size: constants_1.FONT_SIZE
    });
}
/**
 * 背景を作成
 */
function createStage(parent) {
    /**
     * 背景 (空と海)
     */
    new g.FilledRect({
        scene: parent.scene,
        cssColor: constants_1.BACKGROUND_COLOR,
        width: g.game.width,
        height: g.game.height,
        opacity: constants_1.BACKGROUND_ALPHA,
        parent: parent
    });
    /**
     * 島
     */
    new g.FilledRect({
        scene: parent.scene,
        cssColor: constants_1.ISLAND_COLOR,
        width: constants_1.ISLAND_SIZE.width,
        height: constants_1.ISLAND_SIZE.height,
        x: constants_1.ISLAND_POS.x,
        y: constants_1.ISLAND_POS.y,
        parent: parent
    });
    /**
     * 草
     */
    new g.FilledRect({
        scene: parent.scene,
        cssColor: constants_1.GRASS_COLOR,
        width: constants_1.GRASS_SIZE.width,
        height: constants_1.GRASS_SIZE.height,
        x: constants_1.GRASS_POS.x,
        y: constants_1.GRASS_POS.y,
        parent: parent
    });
    /**
     * 水面
     */
    new g.FilledRect({
        scene: parent.scene,
        cssColor: constants_1.WATERSURFACE_COLOR,
        width: g.game.width,
        height: 3,
        x: constants_1.WATERSURFACE_POS.x,
        y: constants_1.WATERSURFACE_POS.y,
        parent: parent
    });
}
/**
 * くまを作成
 */
function createBear(parent) {
    new g.FilledRect({
        scene: parent.scene,
        cssColor: constants_1.BEAR_COLOR,
        width: constants_1.BEAR_SIZE.width,
        height: constants_1.BEAR_SIZE.height,
        x: constants_1.BEAR_POS.x,
        y: constants_1.BEAR_POS.y,
        parent: parent
    });
}
/**
 * 海を作成
 */
function createSea(parent) {
    return new Sea_1.Sea({ parent: parent });
}
/**
 * 釣竿を作成
 */
function createFishingRod(parent) {
    var fishingRod = new FishingRod_1.FishingRod({ parent: parent });
    fishingRod.onStuck.add(function () {
        createMissLabel(parent);
    });
    return fishingRod;
}
/**
 * HUDマネージャーを作成
 */
function createHUDManager(parent) {
    var hudManager = new HUDManager_1.HUDManager({
        scoreLabel: createScoreLabel(parent),
        timeLabel: createTimeLabel(parent),
        systemLabel: createSystemLabel(parent)
    });
    hudManager.setScore(0);
    hudManager.setTimeLimit((0, Resources_1.getResources)().timeLimit);
    return hudManager;
}
/**
 * スコアラベルを作成
 */
function createScoreLabel(parent) {
    return new g.Label({
        scene: parent.scene,
        text: "",
        font: (0, Resources_1.getResources)().font,
        fontSize: constants_1.FONT_SIZE,
        width: g.game.width - 10,
        y: 5,
        textAlign: "right",
        widthAutoAdjust: false,
        parent: parent
    });
}
/**
 * 制限時間ラベルを作成
 */
function createTimeLabel(parent) {
    return new g.Label({
        scene: parent.scene,
        text: "",
        font: (0, Resources_1.getResources)().font,
        fontSize: constants_1.FONT_SIZE,
        width: g.game.width - 220,
        y: 5,
        textAlign: "right",
        widthAutoAdjust: false,
        parent: parent
    });
}
/**
 *  システムラベルを作成
 */
function createSystemLabel(parent) {
    return new g.Label({
        scene: parent.scene,
        text: "3",
        font: (0, Resources_1.getResources)().font,
        fontSize: constants_1.FONT_SIZE * 2,
        x: g.game.width / 2,
        y: g.game.height / 2,
        anchorX: 0.5,
        anchorY: 0.5,
        parent: parent
    });
}
/**
 * 釣りミス時のラベルを作成
 */
function createMissLabel(parent) {
    var missLabel = new g.Label({
        scene: parent.scene,
        text: "miss!",
        textColor: "red",
        font: (0, Resources_1.getResources)().font,
        fontSize: Math.floor(constants_1.FONT_SIZE / 2),
        x: constants_1.BEAR_POS.x + constants_1.BEAR_SIZE.width * 2,
        y: constants_1.BEAR_POS.y,
        parent: parent
    });
    (0, Resources_1.getResources)()
        .timeline.create(missLabel)
        .wait(constants_1.STUCK_DURATION)
        .call(function () { return missLabel.destroy(); });
}
