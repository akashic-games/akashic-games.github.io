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
exports.SceneManager = exports.CustomLoadingScene = void 0;
var core_1 = require("../core/");
var AudioManager_1 = require("./AudioManager");
var DataManager_1 = require("./DataManager");
var DM = require("./DataManager");
var ImageManager_1 = require("./ImageManager");
var PluginManager_1 = require("./PluginManager");
/**
 * ダウンロード済みのアセットを利用可能にする。
 *
 * @param targetScene アセットをロードしているシーン
 */
function assignAsset(targetScene) {
    // ダウンロード完了したデータを利用可能にする。
    // TODO v3 のアセットアクセッサ (g.game.scene().asset) を使うようにして、この代入をなくす。
    DataManager_1.DataManager._requestedDataNames = DataManager_1.DataManager._requestedDataNames.filter(function (pair) {
        // NOTE: ! グローバル変数に変数名でアクセスしている。
        // グローバル変数ではなくハッシュテーブル的なものにすべて収まっている形にしたほうが品が良いかも。
        // window[pair.name] = JSON.parse((pushedScene.assets[Utils.flatten(pair.src)] as g.TextAsset).data);
        // DataManager.onLoad(window[pair.name]);
        var anAsset = targetScene.assets[core_1.Utils.flatten(pair.src)];
        if (anAsset) {
            DM[pair.name] = JSON.parse(anAsset.data);
            DataManager_1.DataManager.onLoad(DM[pair.name]);
        }
        return !anAsset;
    });
}
function createLoadingLocalScene() {
    var scene = new g.Scene({
        game: g.game,
        local: true,
        name: "loadingLocalScene",
        seethrough: true
    });
    scene.onLoad.add(function () {
        scene.onUpdate.add(function () {
            if (ImageManager_1.ImageManager.isReady()) {
                g.game.popScene();
            }
        });
    });
    return scene;
}
var CustomLoadingScene = /** @class */ (function (_super) {
    __extends(CustomLoadingScene, _super);
    function CustomLoadingScene(param) {
        var _this = this;
        param.local = true;
        var assetIds = param.assetIds;
        param.assetIds = null;
        _this = _super.call(this, param) || this;
        _this.assetIds = assetIds;
        _this.targetScene = param.targetScene;
        _this.onLoad.handle(_this, _this._onLoaded);
        return _this;
    }
    CustomLoadingScene.prototype._onLoaded = function () {
        var _this = this;
        this.append(g.SpriteFactory.createSpriteFromScene(this, this.targetScene));
        // すべて読み込みが終わるとcallbackが呼び出される模様。
        this.targetScene.requestAssets(this.assetIds, function () {
            _this.assignAsset();
            g.game.popScene();
        });
        return true;
    };
    CustomLoadingScene.prototype.assignAsset = function () {
        assignAsset(this.targetScene);
    };
    return CustomLoadingScene;
}(g.Scene));
exports.CustomLoadingScene = CustomLoadingScene;
// MEMO: このクラスは本当に必要か？
var SceneAssetHolder = /** @class */ (function (_super) {
    __extends(SceneAssetHolder, _super);
    function SceneAssetHolder(scene, callback) {
        var _this = _super.call(this, {
            assetManager: scene._sceneAssetHolder._assetManager,
            assetIds: scene._sceneAssetHolder._assetIds,
            handlerSet: scene._sceneAssetHolder._handlerSet,
            userData: scene._sceneAssetHolder.userData
        }) || this;
        _this._scene = scene;
        _this.callback = callback;
        return _this;
    }
    SceneAssetHolder.prototype._onAssetLoad = function (asset) {
        var hs = this._handlerSet;
        if (this.destroyed() || hs.owner.destroyed())
            return;
        this._scene.assets[asset.id] = asset;
        this._scene.onAssetLoad.fire(asset);
        this._scene.onAssetLoadComplete.fire(asset);
        hs.handleLoad.call(hs.owner, asset);
        this._assets.push(asset);
        if (this.callback) {
            this.waitingAssetsCount += this.callback(asset, this._assetManager, this);
        }
        --this.waitingAssetsCount;
        if (this.waitingAssetsCount > 0)
            return;
        if (this.waitingAssetsCount < 0)
            throw g.ExceptionFactory.createAssertionError("SceneAssetHolder#_onAssetLoad: broken waitingAssetsCount");
        hs.handleFinish.call(hs.owner, this, true);
    };
    return SceneAssetHolder;
}(g.AssetHolder));
var SceneManager = /** @class */ (function () {
    function SceneManager() {
    }
    // if (!Utils.isMobileSafari()) SceneManager._currentTime = SceneManager._getTimeInMsWithoutMobileSafari();
    SceneManager._getTimeInMsWithoutMobileSafari = function () {
        // return performance.now();
        return Date.now();
    };
    SceneManager.run = function (sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);
            this.requestUpdate();
        }
        catch (e) {
            this.catchException(e);
        }
    };
    SceneManager.initialize = function () {
        this.initGraphics();
        this.checkFileAccess();
        this.initAudio();
        this.initInput();
        this.initNwjs();
        this.checkPluginErrors();
        this.setupErrorHandlers();
    };
    SceneManager.initGraphics = function () {
        var type = this.preferableRendererType();
        core_1.Graphics.initialize(this._screenWidth, this._screenHeight, type);
        core_1.Graphics.boxWidth = this._boxWidth;
        core_1.Graphics.boxHeight = this._boxHeight;
        core_1.Graphics.setLoadingImage("img/system/Loading.png");
        // if (Utils.isOptionValid("showfps")) {
        // 	Graphics.showFps();
        // }
        // if (type === "webgl") {
        // 	this.checkWebGL();
        // }
    };
    SceneManager.preferableRendererType = function () {
        // if (Utils.isOptionValid("canvas")) {
        // 	return "canvas";
        // } else if (Utils.isOptionValid("webgl")) {
        // 	return "webgl";
        // } else {
        // 	return "auto";
        // }
        return "auto";
    };
    SceneManager.shouldUseCanvasRenderer = function () {
        // return Utils.isMobileDevice();
        return true;
    };
    SceneManager.checkWebGL = function () {
        // if (!Graphics.hasWebGL()) {
        // 	throw new Error("Your browser does not support WebGL.");
        // }
    };
    SceneManager.checkFileAccess = function () {
        // if (!Utils.canReadGameFiles()) {
        // 	throw new Error("Your browser does not allow to read local files.");
        // }
    };
    SceneManager.initAudio = function () {
        // const noAudio = Utils.isOptionValid("noaudio");
        // if (!WebAudio.initialize(noAudio) && !noAudio) {
        // 	throw new Error("Your browser does not support Web Audio API.");
        // }
    };
    SceneManager.initInput = function () {
        // Input.initialize();
        core_1.TouchInput.initialize();
    };
    SceneManager.initNwjs = function () {
        // if (Utils.isNwjs()) {
        // 	const gui = require("nw.gui");
        // 	const win = gui.Window.get();
        // 	if (process.platform === "darwin" && !win.menu) {
        // 		const menubar = new gui.Menu({ type: "menubar" });
        // 		const option = { hideEdit: true, hideWindow: true };
        // 		menubar.createMacBuiltin("Game", option);
        // 		win.menu = menubar;
        // 	}
        // }
    };
    SceneManager.checkPluginErrors = function () {
        PluginManager_1.PluginManager.checkErrors();
    };
    SceneManager.setupErrorHandlers = function () {
        // (window as any).addEventListener("error", this.onError.bind(this));
        // (document as any).addEventListener("keydown", this.onKeyDown.bind(this));
    };
    SceneManager.requestUpdate = function () {
        // if (!this._stopped) {
        // 	requestAnimationFrame(this.update.bind(this));
        // }
    };
    SceneManager.update = function () {
        try {
            if (!ImageManager_1.ImageManager.isReady()) {
                g.game.pushScene(createLoadingLocalScene());
                return;
            }
            this.tickStart();
            // if (Utils.isMobileSafari()) {
            // 	this.updateInputData();
            // }
            this.updateManagers();
            this.updateMain();
            this.tickEnd();
        }
        catch (e) {
            this.catchException(e);
        }
    };
    SceneManager.terminate = function () {
        // window.close();
    };
    SceneManager.onError = function (e) {
        console.error(e.message);
        console.error(e.filename, e.lineno);
        try {
            this.stop();
            // Graphics.printError("Error", e.message);
            AudioManager_1.AudioManager.stopAll();
        }
        catch (e2) {
            //
        }
    };
    SceneManager.onKeyDown = function (_event) {
        // if (!event.ctrlKey && !event.altKey) {
        // 	switch (event.keyCode) {
        // 		case 116:   // F5
        // 			if (Utils.isNwjs()) {
        // 				location.reload();
        // 			}
        // 			break;
        // 		case 119:   // F8
        // 			if (Utils.isNwjs() && Utils.isOptionValid("test")) {
        // 				require("nw.gui").Window.get().showDevTools();
        // 			}
        // 			break;
        // 	}
        // }
    };
    SceneManager.catchException = function (e) {
        console.error("ScneManager#catchException(): " + e);
        if (e instanceof Error) {
            // Graphics.printError(e.name, e.message);
            console.error(e.stack);
        }
        else {
            // Graphics.printError("UnknownError", e);
        }
        AudioManager_1.AudioManager.stopAll();
        this.stop();
    };
    SceneManager.tickStart = function () {
        core_1.Graphics.tickStart();
    };
    SceneManager.tickEnd = function () {
        core_1.Graphics.tickEnd();
    };
    SceneManager.updateInputData = function () {
        // Input.update();
        core_1.TouchInput.update();
    };
    SceneManager.updateMain = function () {
        if ( /* Utils.isMobileSafari()*/false) {
            // this.changeScene();
            // this.updateScene();
        }
        else {
            // const newTime = this._getTimeInMsWithoutMobileSafari();
            // let fTime = (newTime - this._currentTime) / 1000;
            // if (fTime > 0.25) fTime = 0.25;
            // this._currentTime = newTime;
            // this._accumulator += fTime;
            // while (this._accumulator >= this._deltaTime) {
            // 	this.updateInputData();
            // 	this.changeScene();
            // 	this.updateScene();
            // 	this._accumulator -= this._deltaTime;
            // }
            this.updateInputData();
            this.changeScene();
            this.updateScene();
        }
        this.renderScene();
        // this.requestUpdate();
    };
    SceneManager.updateManagers = function () {
        ImageManager_1.ImageManager.update();
    };
    SceneManager.changeScene = function () {
        if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
            if (this._scene) {
                this._scene.terminate();
                this._scene.detachReservation();
                this._previousClass = this._scene.constructor;
            }
            this._scene = this._nextScene;
            if (this._scene) {
                this._scene.attachReservation();
                this._scene.create();
                this._nextScene = null;
                this._sceneStarted = false;
                this.onSceneCreate();
                this._changeSceneCore();
                core_1.TouchInput._setupEventHandlers(this._scene.scene);
            }
            if (this._exiting) {
                this.terminate();
            }
        }
    };
    // シーン切り替えでAkashicを利用する部分
    SceneManager._changeSceneCore = function () {
        var _this = this;
        // Base_Scene#create() でリクエストされたデータの一覧を
        // g.Scene#_sceneAssetHolder に無理やりねじ込む
        DataManager_1.DataManager._requestedDataNames.forEach(function (pair) {
            var src = core_1.Utils.flatten(pair.src);
            _this._scene.scene._sceneAssetHolder._assetIds.push(src);
        });
        this._scene.scene._sceneAssetHolder.waitingAssetsCount = this._scene.scene._sceneAssetHolder._assetIds.length;
        // ロード完了時、各種アセットを Bitmap や DataManager に格納する。
        var mvScene = this._scene;
        var akashicScene = this._scene.scene;
        akashicScene.onLoad.addOnce(function () {
            // SceneManager に利用可能になったことを伝える
            mvScene.thisSceneLoaded = true;
            var updateSceneManager = function () {
                SceneManager.update();
                akashicScene.modified();
            };
            akashicScene.onUpdate.add(updateSceneManager);
            // 一度実行しないと未初期化のシーンが１フレームレンダリングされてしまう。
            updateSceneManager();
        });
        g.game.pushScene(akashicScene);
    };
    SceneManager.updateScene = function () {
        if (this._scene && this._scene.thisSceneLoaded) {
            if (!this._sceneStarted && this._scene.isReady()) {
                this._scene.start();
                this._sceneStarted = true;
                this.onSceneStart();
            }
            if (this.isCurrentSceneStarted()) {
                this._scene.update();
            }
            var assetIds_1 = [];
            DataManager_1.DataManager._requestedDataNames.forEach(function (pair) {
                var src = core_1.Utils.flatten(pair.src);
                assetIds_1.push(src);
            });
            if (assetIds_1.length) {
                var loadingScene = new CustomLoadingScene({
                    game: g.game,
                    targetScene: this._scene.scene,
                    assetIds: assetIds_1
                });
                g.game.pushScene(loadingScene);
            }
        }
    };
    SceneManager.renderScene = function () {
        if (this.isCurrentSceneStarted()) {
            core_1.Graphics.render(this._scene);
        }
        else if (this._scene) {
            this.onSceneLoading();
        }
    };
    SceneManager.onSceneCreate = function () {
        core_1.Graphics.startLoading();
    };
    SceneManager.onSceneStart = function () {
        core_1.Graphics.endLoading();
    };
    SceneManager.onSceneLoading = function () {
        core_1.Graphics.updateLoading();
    };
    SceneManager.isSceneChanging = function () {
        return this._exiting || !!this._nextScene;
    };
    SceneManager.isCurrentSceneBusy = function () {
        return this._scene && this._scene.isBusy();
    };
    SceneManager.isCurrentSceneStarted = function () {
        return this._scene && this._sceneStarted;
    };
    SceneManager.isNextScene = function (sceneClass) {
        return this._nextScene && this._nextScene.constructor === sceneClass;
    };
    SceneManager.isPreviousScene = function (sceneClass) {
        return this._previousClass === sceneClass;
    };
    SceneManager.goto = function (sceneClass) {
        if (sceneClass) {
            this._nextScene = new sceneClass();
            var nextScene_1 = this._nextScene;
            nextScene_1.scene._sceneAssetHolder = new SceneAssetHolder(nextScene_1.scene, function (asset, assetManager, holder) {
                assignAsset(nextScene_1.scene);
                // 追加ダウンロードがあるかシーンに問い合わせる。
                // ダウンロードしたデータに基づいた判断が必要な場合、このように扱う。
                return nextScene_1.assetLoadHandler(asset, assetManager, holder);
            });
        }
        if (this._scene) {
            this._scene.stop();
        }
    };
    SceneManager.push = function (sceneClass) {
        this._stack.push(this._scene.constructor);
        this.goto(sceneClass);
    };
    SceneManager.pop = function () {
        if (this._stack.length > 0) {
            this.goto(this._stack.pop());
        }
        else {
            this.exit();
        }
    };
    SceneManager.exit = function () {
        this.goto(null);
        this._exiting = true;
    };
    SceneManager.clearStack = function () {
        this._stack = [];
    };
    SceneManager.stop = function () {
        this._stopped = true;
    };
    SceneManager.prepareNextScene = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        // `prepare()` を実装したシーンがpushされたあとに呼ばれる模様
        this._nextScene.prepare.apply(this._nextScene, arguments);
    };
    SceneManager.snap = function () {
        return core_1.Bitmap.snap(this._scene.scene);
    };
    SceneManager.snapForBackground = function () {
        this._backgroundBitmap = this.snap();
        this._backgroundBitmap.blur();
    };
    SceneManager.backgroundBitmap = function () {
        return this._backgroundBitmap;
    };
    SceneManager.resume = function () {
        this._stopped = false;
        this.requestUpdate();
        // if (!Utils.isMobileSafari()) {
        // 	this._currentTime = this._getTimeInMsWithoutMobileSafari();
        // 	this._accumulator = 0;
        // }
    };
    SceneManager._scene = null;
    SceneManager._nextScene = null;
    SceneManager._stack = [];
    SceneManager._stopped = false;
    SceneManager._sceneStarted = false;
    SceneManager._exiting = false;
    SceneManager._previousClass = null;
    SceneManager._backgroundBitmap = null;
    SceneManager._screenWidth = g.game.width;
    SceneManager._screenHeight = g.game.height;
    SceneManager._boxWidth = g.game.width;
    SceneManager._boxHeight = g.game.height;
    SceneManager._deltaTime = 1.0 / 60.0;
    SceneManager._accumulator = 0.0;
    SceneManager._currentTime = Date.now(); // see below
    return SceneManager;
}());
exports.SceneManager = SceneManager;
