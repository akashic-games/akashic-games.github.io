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
exports.Scene_Map = void 0;
var TouchInput_1 = require("../core/TouchInput");
var AudioManager_1 = require("../managers/AudioManager");
var BattleManager_1 = require("../managers/BattleManager");
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SoundManager_1 = require("../managers/SoundManager");
var SpritesetMap_1 = require("../sprites/SpritesetMap");
var WindowMapName_1 = require("../windows/WindowMapName");
var WindowMenuCommand_1 = require("../windows/WindowMenuCommand");
var WindowMessage_1 = require("../windows/WindowMessage");
var WindowScrollText_1 = require("../windows/WindowScrollText");
var SceneBase_1 = require("./SceneBase");
var SceneBattle_1 = require("./SceneBattle");
var SceneGameOver_1 = require("./SceneGameOver");
var SceneMenu_1 = require("./SceneMenu");
var SceneTitle_1 = require("./SceneTitle");
var Scene_Map = /** @class */ (function (_super) {
    __extends(Scene_Map, _super);
    function Scene_Map() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Map.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Map.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._waitCount = 0;
        this._encounterEffectDuration = 0;
        this._mapLoaded = false;
        this._touchCount = 0;
    };
    Scene_Map.prototype.create = function () {
        _super.prototype.create.call(this);
        this._transfer = globals_1.$gamePlayer.isTransferring();
        var mapId = this._transfer ? globals_1.$gamePlayer.newMapId() : globals_1.$gameMap.mapId();
        DataManager_1.DataManager.loadMapData(mapId);
    };
    Scene_Map.prototype.isReady = function () {
        if (!this._mapLoaded && DataManager_1.DataManager.isMapLoaded()) {
            // NOTE: `assetLoadHandler()` で呼び出す
            // this.onMapLoaded();
            // this._mapLoaded = true;
        }
        return this._mapLoaded && _super.prototype.isReady.call(this);
    };
    Scene_Map.prototype.onMapLoaded = function () {
        if (this._transfer) {
            globals_1.$gamePlayer.performTransfer();
        }
        this.createDisplayObjects();
    };
    Scene_Map.prototype.assetLoadHandler = function (_asset, _assetManager, _holder) {
        if (this._mapLoaded) {
            return 0;
        }
        if (DataManager_1.DataManager.isMapLoaded()) {
            this.onMapLoaded(); // 画像のロードリクエストが走っているはず
            this._mapLoaded = true;
        }
        return 0;
    };
    Scene_Map.prototype.start = function () {
        _super.prototype.start.call(this);
        SceneManager_1.SceneManager.clearStack();
        if (this._transfer) {
            this.fadeInForTransfer();
            this._mapNameWindow.open();
            globals_1.$gameMap.autoplay();
        }
        else if (this.needsFadeIn()) {
            this.startFadeIn(this.fadeSpeed(), false);
        }
        this.menuCalling = false;
    };
    Scene_Map.prototype.update = function () {
        this.updateDestination();
        this.updateMainMultiply();
        if (this.isSceneChangeOk()) {
            this.updateScene();
        }
        else if (SceneManager_1.SceneManager.isNextScene(SceneBattle_1.Scene_Battle)) {
            this.updateEncounterEffect();
        }
        this.updateWaitCount();
        _super.prototype.update.call(this);
    };
    Scene_Map.prototype.updateMainMultiply = function () {
        this.updateMain();
        if (this.isFastForward()) {
            this.updateMain();
        }
    };
    Scene_Map.prototype.updateMain = function () {
        var active = this.isActive();
        globals_1.$gameMap.update(active);
        globals_1.$gamePlayer.update(active);
        globals_1.$gameTimer.update(active);
        globals_1.$gameScreen.update();
    };
    Scene_Map.prototype.isFastForward = function () {
        return globals_1.$gameMap.isEventRunning() && !SceneManager_1.SceneManager.isSceneChanging() && /* Input.isLongPressed('ok') ||*/ TouchInput_1.TouchInput.isLongPressed();
    };
    Scene_Map.prototype.stop = function () {
        _super.prototype.stop.call(this);
        globals_1.$gamePlayer.straighten();
        this._mapNameWindow.close();
        if (this.needsSlowFadeOut()) {
            this.startFadeOut(this.slowFadeSpeed(), false);
        }
        else if (SceneManager_1.SceneManager.isNextScene(Scene_Map)) {
            this.fadeOutForTransfer();
        }
        else if (SceneManager_1.SceneManager.isNextScene(SceneBattle_1.Scene_Battle)) {
            this.launchBattle();
        }
    };
    Scene_Map.prototype.isBusy = function () {
        return ((this._messageWindow && this._messageWindow.isClosing()) ||
            this._waitCount > 0 ||
            this._encounterEffectDuration > 0 ||
            _super.prototype.isBusy.call(this));
    };
    Scene_Map.prototype.terminate = function () {
        _super.prototype.terminate.call(this);
        if (!SceneManager_1.SceneManager.isNextScene(SceneBattle_1.Scene_Battle)) {
            this._spriteset.update();
            this._mapNameWindow.hide();
            SceneManager_1.SceneManager.snapForBackground();
        }
        else {
            ImageManager_1.ImageManager.clearRequest();
        }
        if (SceneManager_1.SceneManager.isNextScene(Scene_Map)) {
            ImageManager_1.ImageManager.clearRequest();
        }
        globals_1.$gameScreen.clearZoom();
        this.removeChild(this._fadeSprite);
        this.removeChild(this._mapNameWindow);
        this.removeChild(this._windowLayer);
        this.removeChild(this._spriteset);
    };
    Scene_Map.prototype.needsFadeIn = function () {
        return SceneManager_1.SceneManager.isPreviousScene(SceneBattle_1.Scene_Battle);
        // || SceneManager.isPreviousScene(Scene_Load)); // Scene_Load(ロード機能)は非サポートのため、コメントアウト
    };
    Scene_Map.prototype.needsSlowFadeOut = function () {
        return SceneManager_1.SceneManager.isNextScene(SceneTitle_1.Scene_Title) || SceneManager_1.SceneManager.isNextScene(SceneGameOver_1.Scene_Gameover);
    };
    Scene_Map.prototype.updateWaitCount = function () {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        return false;
    };
    Scene_Map.prototype.updateDestination = function () {
        if (this.isMapTouchOk()) {
            this.processMapTouch();
        }
        else {
            globals_1.$gameTemp.clearDestination();
            this._touchCount = 0;
        }
    };
    Scene_Map.prototype.isMapTouchOk = function () {
        return this.isActive() && globals_1.$gamePlayer.canMove();
    };
    Scene_Map.prototype.processMapTouch = function () {
        if (TouchInput_1.TouchInput.isTriggered() || this._touchCount > 0) {
            if (TouchInput_1.TouchInput.isPressed()) {
                if (this._touchCount === 0 || this._touchCount >= 15) {
                    var x = globals_1.$gameMap.canvasToMapX(TouchInput_1.TouchInput.x);
                    var y = globals_1.$gameMap.canvasToMapY(TouchInput_1.TouchInput.y);
                    globals_1.$gameTemp.setDestination(x, y);
                }
                this._touchCount++;
            }
            else {
                this._touchCount = 0;
            }
        }
    };
    Scene_Map.prototype.isSceneChangeOk = function () {
        return this.isActive() && !globals_1.$gameMessage.isBusy();
    };
    Scene_Map.prototype.updateScene = function () {
        this.checkGameover();
        if (!SceneManager_1.SceneManager.isSceneChanging()) {
            this.updateTransferPlayer();
        }
        if (!SceneManager_1.SceneManager.isSceneChanging()) {
            this.updateEncounter();
        }
        if (!SceneManager_1.SceneManager.isSceneChanging()) {
            this.updateCallMenu();
        }
        if (!SceneManager_1.SceneManager.isSceneChanging()) {
            this.updateCallDebug();
        }
    };
    Scene_Map.prototype.createDisplayObjects = function () {
        this.createSpriteset();
        this.createMapNameWindow();
        this.createWindowLayer();
        this.createAllWindows();
    };
    Scene_Map.prototype.createSpriteset = function () {
        this._spriteset = new SpritesetMap_1.Spriteset_Map(); // ファイルの要求がある
        this.addChild(this._spriteset);
    };
    Scene_Map.prototype.createAllWindows = function () {
        this.createMessageWindow();
        this.createScrollTextWindow();
    };
    Scene_Map.prototype.createMapNameWindow = function () {
        this._mapNameWindow = new WindowMapName_1.Window_MapName();
        this.addChild(this._mapNameWindow);
    };
    Scene_Map.prototype.createMessageWindow = function () {
        var _this = this;
        this._messageWindow = new WindowMessage_1.Window_Message();
        this.addWindow(this._messageWindow);
        this._messageWindow.subWindows().forEach(function (window) {
            _this.addWindow(window);
        });
    };
    Scene_Map.prototype.createScrollTextWindow = function () {
        this._scrollTextWindow = new WindowScrollText_1.Window_ScrollText();
        this.addWindow(this._scrollTextWindow);
    };
    Scene_Map.prototype.updateTransferPlayer = function () {
        if (globals_1.$gamePlayer.isTransferring()) {
            SceneManager_1.SceneManager.goto(Scene_Map);
        }
    };
    Scene_Map.prototype.updateEncounter = function () {
        if (globals_1.$gamePlayer.executeEncounter()) {
            SceneManager_1.SceneManager.push(SceneBattle_1.Scene_Battle);
        }
    };
    Scene_Map.prototype.updateCallMenu = function () {
        if (this.isMenuEnabled()) {
            if (this.isMenuCalled()) {
                this.menuCalling = true;
            }
            if (this.menuCalling && !globals_1.$gamePlayer.isMoving()) {
                this.callMenu();
            }
        }
        else {
            this.menuCalling = false;
        }
    };
    Scene_Map.prototype.isMenuEnabled = function () {
        return globals_1.$gameSystem.isMenuEnabled() && !globals_1.$gameMap.isEventRunning();
    };
    Scene_Map.prototype.isMenuCalled = function () {
        return /* Input.isTriggered('menu') ||*/ TouchInput_1.TouchInput.isCancelled();
    };
    Scene_Map.prototype.callMenu = function () {
        // メニュー表示機能
        SoundManager_1.SoundManager.playOk();
        SceneManager_1.SceneManager.push(SceneMenu_1.Scene_Menu);
        WindowMenuCommand_1.Window_MenuCommand.initCommandPosition();
        globals_1.$gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };
    Scene_Map.prototype.updateCallDebug = function () {
        if (this.isDebugCalled()) {
            SceneManager_1.SceneManager.push(Scene_Debug);
        }
    };
    Scene_Map.prototype.isDebugCalled = function () {
        return /* Input.isTriggered('debug') &&*/ globals_1.$gameTemp.isPlaytest();
    };
    Scene_Map.prototype.fadeInForTransfer = function () {
        var fadeType = globals_1.$gamePlayer.fadeType();
        switch (fadeType) {
            case 0:
            case 1:
                this.startFadeIn(this.fadeSpeed(), fadeType === 1);
                break;
        }
    };
    Scene_Map.prototype.fadeOutForTransfer = function () {
        var fadeType = globals_1.$gamePlayer.fadeType();
        switch (fadeType) {
            case 0:
            case 1:
                this.startFadeOut(this.fadeSpeed(), fadeType === 1);
                break;
        }
    };
    Scene_Map.prototype.launchBattle = function () {
        BattleManager_1.BattleManager.saveBgmAndBgs();
        this.stopAudioOnBattleStart();
        SoundManager_1.SoundManager.playBattleStart();
        this.startEncounterEffect();
        this._mapNameWindow.hide();
    };
    Scene_Map.prototype.stopAudioOnBattleStart = function () {
        if (!AudioManager_1.AudioManager.isCurrentBgm(globals_1.$gameSystem.battleBgm())) {
            AudioManager_1.AudioManager.stopBgm();
        }
        AudioManager_1.AudioManager.stopBgs();
        AudioManager_1.AudioManager.stopMe();
        AudioManager_1.AudioManager.stopSe();
    };
    Scene_Map.prototype.startEncounterEffect = function () {
        this._spriteset.hideCharacters();
        this._encounterEffectDuration = this.encounterEffectSpeed();
    };
    Scene_Map.prototype.updateEncounterEffect = function () {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            var speed = this.encounterEffectSpeed();
            var n = speed - this._encounterEffectDuration;
            var p = n / speed;
            var q = ((p - 1) * 20 * p + 5) * p + 1;
            var zoomX = globals_1.$gamePlayer.screenX();
            var zoomY = globals_1.$gamePlayer.screenY() - 24;
            if (n === 2) {
                globals_1.$gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                this.startFlashForEncounter(speed / 2);
            }
            globals_1.$gameScreen.setZoom(zoomX, zoomY, q);
            if (n === Math.floor(speed / 6)) {
                this.startFlashForEncounter(speed / 2);
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager_1.BattleManager.playBattleBgm();
                this.startFadeOut(this.fadeSpeed());
            }
        }
    };
    Scene_Map.prototype.snapForBattleBackground = function () {
        this._windowLayer.visible = false;
        SceneManager_1.SceneManager.snapForBackground();
        this._windowLayer.visible = true;
    };
    Scene_Map.prototype.startFlashForEncounter = function (duration) {
        var color = [255, 255, 255, 255];
        globals_1.$gameScreen.startFlash(color, duration);
    };
    Scene_Map.prototype.encounterEffectSpeed = function () {
        return 60;
    };
    return Scene_Map;
}(SceneBase_1.Scene_Base));
exports.Scene_Map = Scene_Map;
