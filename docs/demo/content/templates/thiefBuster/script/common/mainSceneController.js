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
exports.MainSceneController = void 0;
var sceneController_1 = require("../commonNicowariGame/sceneController");
var tl = require("@akashic-extension/akashic-timeline");
var commonAsaInfo_1 = require("./commonAsaInfo");
var commonAssetInfo_1 = require("./commonAssetInfo");
var commonSoundInfo_1 = require("./commonSoundInfo");
var commonDefine_1 = require("./commonDefine");
var asaInfo_1 = require("../classes/asaInfo");
var assetInfo_1 = require("../classes/assetInfo");
var soundInfo_1 = require("../classes/soundInfo");
var miscAssetInfo_1 = require("../classes/miscAssetInfo");
var asaEx_1 = require("../util/asaEx");
var gameUtil_1 = require("../util/gameUtil");
var spriteUtil_1 = require("../util/spriteUtil");
var entityUtil_1 = require("../util/entityUtil");
var audioUtil_1 = require("../util/audioUtil");
var titleSubscene_1 = require("./titleSubscene");
var descriptionSubscene_1 = require("./descriptionSubscene");
var gameSubscene_1 = require("./gameSubscene");
var resultSubscene_1 = require("./resultSubscene");
var wipeManager_1 = require("./wipeManager");
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
var informationSubscene_1 = require("./informationSubscene");
/**
 * 起動パラメータイベントの判定を行うメソッド
 * @param {g.MessageEvent} e MessageEventオブジェクト
 * @return {boolean} 起動パラメータイベントであればtrue
 */
function isCOESessionStartMessage(e) {
    return e.data.type === "start";
}
/**
 * mainScene用のSceneを生成するクラス
 */
var MainSceneController = /** @class */ (function (_super) {
    __extends(MainSceneController, _super);
    function MainSceneController() {
        return _super.call(this) || this;
    }
    /**
     * このクラスのインスタンスと、そのインスタンスで処理するSceneを生成する
     * @param {g.Game} _game Scene生成に使用するGame
     * @return {g.Scene} 生成したScene
     */
    MainSceneController.createMainScene = function (_game) {
        var controller = new MainSceneController();
        return controller.createScene(g.game);
    };
    /**
     * このクラスで処理するSceneを生成する
     * @param {g.Game} _game Scene生成に使用するGame
     * @return {g.Scene} 生成したScene
     * @override
     */
    MainSceneController.prototype.createScene = function (_game) {
        var _this = this;
        gameUtil_1.gameUtil.initGameState();
        // レイアウト変更要求
        if (_game.external.send) {
            _game.external.send({
                type: "nx:layout",
                layout: "under-comment",
                background: "hidden"
            });
        }
        var assetIds = [];
        spriteUtil_1.spriteUtil.addAssetIdsFromAssetInfoMap(commonAssetInfo_1.CommonAssetInfo, assetIds);
        spriteUtil_1.spriteUtil.addAssetIdsFromAssetInfoMap(assetInfo_1.AssetInfo, assetIds);
        asaEx_1.asaEx.ResourceManager.addAsaAssetIds(spriteUtil_1.spriteUtil.getPjNamesFromAsainfoMap(commonAsaInfo_1.CommonAsaInfo), _game.assets, assetIds);
        asaEx_1.asaEx.ResourceManager.addAsaAssetIds(spriteUtil_1.spriteUtil.getPjNamesFromAsainfoMap(asaInfo_1.AsaInfo), _game.assets, assetIds);
        audioUtil_1.audioUtil.addAssetIdsFromSoundInfoMap(commonSoundInfo_1.CommonSoundInfo, assetIds);
        audioUtil_1.audioUtil.addAssetIdsFromSoundInfoMap(soundInfo_1.SoundInfo, assetIds);
        gameUtil_1.gameUtil.addAssetIdsFromMiscAssetInfoMap(miscAssetInfo_1.MiscAssetInfo, assetIds);
        // console.log("createScene: assetIds:"+assetIds.join(",")+".");
        var scene = new g.Scene({ game: _game, assetIds: assetIds });
        var parameters = null;
        scene.onLoad.addOnce(function () {
            // loaded完了後、OperationEventを処理するため1 tick遅延させる
            scene.onUpdate.addOnce(function () {
                // console.log("scene.update: parameters:" + parameters + ".");
                if (parameters) {
                    // 起動パラメータの保持
                    scene.game.vars.parameters = parameters;
                    commonParameterReader_1.CommonParameterReader.read(parameters);
                }
                else {
                    scene.game.vars.parameters = {};
                    commonParameterReader_1.CommonParameterReader.read({});
                }
                _this.handleLoaded(scene);
            });
        });
        scene.onMessage.add(function (e) {
            // console.log("scene.message: e:" + JSON.stringify(e) + ".");
            if (isCOESessionStartMessage(e)) {
                parameters = e.data.parameters;
            }
        });
        return scene;
    };
    /**
     * Scene#loadedのハンドラ
     * onUpdateを呼ぶScene#updateのハンドラをこの中で登録する
     * @param {g.Scene} _scene 処理対象のScene
     * @return {boolean} 通常trueを返し、ハンドラ登録を解除する
     * @override
     */
    MainSceneController.prototype.handleLoaded = function (_scene) {
        var _this = this;
        var game = _scene.game;
        game.vars.scenedata = {};
        // このシーンで使いまわすTimelineインスタンス
        game.vars.scenedata.timeline = new tl.Timeline(_scene);
        this.mainLayer = new g.E({ scene: _scene });
        entityUtil_1.entityUtil.appendEntity(this.mainLayer, _scene);
        this.wipeLayer = new g.E({ scene: _scene });
        entityUtil_1.entityUtil.appendEntity(this.wipeLayer, _scene);
        this.wipeManager = new wipeManager_1.WipeManager(_scene);
        entityUtil_1.entityUtil.appendEntity(this.wipeManager, this.wipeLayer);
        var shade = new g.FilledRect({
            scene: _scene,
            cssColor: "#000000",
            opacity: commonDefine_1.commonDefine.BG_SHADE_OPACITY,
            width: _scene.game.width,
            height: _scene.game.height
        });
        entityUtil_1.entityUtil.appendEntity(shade, this.mainLayer);
        var infoSubScene = this.informationSubscene = new informationSubscene_1.InformationSubscene(_scene);
        infoSubScene.init();
        infoSubScene.requestedNextSubscene.add(this.goNextFromInformation, this);
        entityUtil_1.entityUtil.appendEntity(infoSubScene, this.mainLayer);
        var title = this.titleSubscene = new titleSubscene_1.TitleSubscene(_scene);
        title.init();
        title.requestedNextSubscene.add(this.goNextFromTitle, this);
        entityUtil_1.entityUtil.appendEntity(title, this.mainLayer);
        var desc = this.descriptionSubscene = new descriptionSubscene_1.DescriptionSubscene(_scene);
        desc.init();
        desc.requestedNextSubscene.add(this.goNextFromDescription, this);
        entityUtil_1.entityUtil.appendEntity(desc, this.mainLayer);
        var main = this.gameSubscene = new gameSubscene_1.GameSubscene(_scene);
        main.init();
        main.requestedNextSubscene.add(this.goNextFromGame, this);
        entityUtil_1.entityUtil.appendEntity(main, this.mainLayer);
        var result = this.resultSubscene = new resultSubscene_1.ResultSubscene(_scene);
        result.init();
        result.requestedNextSubscene.add(this.goNextFromResult, this);
        entityUtil_1.entityUtil.appendEntity(result, this.mainLayer);
        if (commonParameterReader_1.CommonParameterReader.muteAudio) {
            audioUtil_1.audioUtil.setMute(true);
        }
        title.setBgmName(main.getTitleBgmName());
        if (commonDefine_1.commonDefine.DEBUG_SKIP_PREGAMESUBSCENE) {
            this.changeSubscene(this.gameSubscene);
        }
        else {
            if (commonParameterReader_1.CommonParameterReader.isInitialSceneGame) {
                this.changeSubscene(this.descriptionSubscene);
            }
            else {
                if (commonParameterReader_1.CommonParameterReader.launchType === commonParameterReader_1.LaunchType.NOTHING) {
                    this.changeSubscene(this.titleSubscene);
                }
                else {
                    this.changeSubscene(this.informationSubscene);
                }
            }
        }
        _scene.onUpdate.add(function () {
            return _this.handleUpdate(_scene);
        });
        _scene.onStateChange.add(function (e) {
            if (e === "destroyed") {
                asaEx_1.asaEx.ResourceManager.removeAllLoadedResource();
                delete game.vars.scenedata;
            }
        });
        return true;
    };
    /**
     * Scene#updateのハンドラ
     * @param {g.Scene} _scene 処理対象のScene
     * @return {boolean} 通常falseを返す
     * @override
     */
    MainSceneController.prototype.handleUpdate = function (_scene) {
        this.currentSubscene.handleUpdateSubscene();
        return false;
    };
    /**
     * currentSubsceneをワイプなしで変更する
     * @param {Subscene} _next 変更後のサブシーン
     */
    MainSceneController.prototype.changeSubscene = function (_next) {
        if (this.currentSubscene) {
            this.currentSubscene.stopContent();
            this.currentSubscene.hideContent();
        }
        this.currentSubscene = _next;
        this.currentSubscene.showContent();
        this.currentSubscene.startContent();
    };
    /**
     * currentSubsceneをワイプありで変更する
     * @param {boolean} _isRtoL trueならばRtoL、falseならばLtoRのワイプを使用する
     * @param {Subscene} _next 変更後のサブシーン
     */
    MainSceneController.prototype.trasitionSubscene = function (_isRtoL, _next) {
        var _this = this;
        if (this.currentSubscene) {
            this.currentSubscene.stopContent();
        }
        this.wipeManager.startWipe(_isRtoL, function () {
            if (_this.currentSubscene) {
                _this.currentSubscene.hideContent();
            }
            _this.currentSubscene = _next;
            _this.currentSubscene.showContent();
        }, function () {
            _this.currentSubscene.startContent();
        });
    };
    /**
     * ゲーム開始説明画面からタイトルに遷移する
     * InformationSubScene#requestedNextSubsceneのハンドラ
     */
    MainSceneController.prototype.goNextFromInformation = function () {
        this.trasitionSubscene(true, this.titleSubscene);
    };
    /**
     * タイトルから説明に遷移する
     * TitleSubscene#requestedNextSubsceneのハンドラ
     */
    MainSceneController.prototype.goNextFromTitle = function () {
        this.trasitionSubscene(true, this.descriptionSubscene);
    };
    /**
     * 説明からゲームに遷移する
     * DescriptionSubscene#requestedNextSubsceneのハンドラ
     */
    MainSceneController.prototype.goNextFromDescription = function () {
        this.trasitionSubscene(true, this.gameSubscene);
    };
    /**
     * ゲームからリザルトに遷移する
     * GameSubscene#requestedNextSubsceneのハンドラ
     */
    MainSceneController.prototype.goNextFromGame = function () {
        this.trasitionSubscene(false, this.resultSubscene);
    };
    /**
     * リザルトからタイトルに遷移する
     * ResultSubscene#requestedNextSubsceneのハンドラ
     */
    MainSceneController.prototype.goNextFromResult = function () {
        if (commonDefine_1.commonDefine.DEBUG_SKIP_PREGAMESUBSCENE) {
            this.changeSubscene(this.gameSubscene);
        }
        else {
            if (commonParameterReader_1.CommonParameterReader.isInitialSceneGame) {
                this.changeSubscene(this.descriptionSubscene);
            }
            else {
                this.changeSubscene(this.informationSubscene);
            }
        }
    };
    return MainSceneController;
}(sceneController_1.SceneController));
exports.MainSceneController = MainSceneController;
