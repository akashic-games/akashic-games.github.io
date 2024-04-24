"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/* :
 * @plugindesc Plugin used to set basic parameters.
 * @author RM CoreScript team
 *
 * @help This plugin does not provide plugin commands.
 *
 * @param screenWidth
 * @desc For setting the screen width.
 * @default 816
 *
 * @param screenHeight
 * @desc For setting the screen height.
 * @default 624
 */
/* :ja
 * @plugindesc 基本的なパラメーターを設定するプラグインです。
 * @author RM CoreScript team
 *
 * @help このプラグインにはプラグインコマンドはありません。
 *
 * @param screenWidth
 * @desc 画面サイズの幅
 * @default 816
 *
 * @param screenHeight
 * @desc 画面サイズの高さ
 * @default 624
 */
(function () {
    var parameters = index_1.PluginManager.parameters("Community_Basic");
    // var cacheLimit = toNumber(parameters['cacheLimit'], 10);
    var screenWidth = Number(parameters.screenWidth || 816);
    var screenHeight = Number(parameters.screenHeight || 624);
    // var renderingMode = parameters['renderingMode'].toLowerCase();
    // var alwaysDash = parameters['alwaysDash'].toLowerCase() === 'on';
    // var windowWidthTo = toNumber(parameters['changeWindowWidthTo'], 0);
    // var windowHeightTo = toNumber(parameters['changeWindowHeightTo'], 0);
    // var windowWidth;
    // var windowHeight;
    // if(windowWidthTo){
    // 	windowWidth = windowWidthTo;
    // }else if(screenWidth !== SceneManager._screenWidth){
    // 	windowWidth = screenWidth;
    // }
    // if(windowHeightTo){
    // 	windowHeight = windowHeightTo;
    // }else if(screenHeight !== SceneManager._screenHeight){
    // 	windowHeight = screenHeight;
    // }
    // ImageCache.limit = cacheLimit * 1000 * 1000;
    index_1.SceneManager._screenWidth = screenWidth;
    index_1.SceneManager._screenHeight = screenHeight;
    index_1.SceneManager._boxWidth = screenWidth;
    index_1.SceneManager._boxHeight = screenHeight;
    // SceneManager.preferableRendererType = function() {
    // 	if (Utils.isOptionValid('canvas')) {
    // 		return 'canvas';
    // 	} else if (Utils.isOptionValid('webgl')) {
    // 		return 'webgl';
    // 	} else if (renderingMode === 'canvas') {
    // 		return 'canvas';
    // 	} else if (renderingMode === 'webgl') {
    // 		return 'webgl';
    // 	} else {
    // 		return 'auto';
    // 	}
    // };
    // var _ConfigManager_applyData = ConfigManager.applyData;
    // ConfigManager.applyData = function(config) {
    // 	_ConfigManager_applyData.apply(this, arguments);
    // 	if (config['alwaysDash'] === undefined) {
    // 		this.alwaysDash = alwaysDash;
    // 	}
    // };
    // var _SceneManager_initNwjs = SceneManager.initNwjs;
    // SceneManager.initNwjs = function() {
    // 	_SceneManager_initNwjs.apply(this, arguments);
    // 	if (Utils.isNwjs() && windowWidth && windowHeight) {
    // 		var dw = windowWidth - window.innerWidth;
    // 		var dh = windowHeight - window.innerHeight;
    // 		window.moveBy(-dw / 2, -dh / 2);
    // 		window.resizeBy(dw, dh);
    // 	}
    // };
})();
