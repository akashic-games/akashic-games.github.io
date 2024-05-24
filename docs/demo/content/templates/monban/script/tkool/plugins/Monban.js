Object.defineProperty(exports, "__esModule", { value: true });
var Bitmap_1 = require("../core/Bitmap");
var Graphics_1 = require("../core/Graphics");
var BattleManager_1 = require("../managers/BattleManager");
var DataManager_1 = require("../managers/DataManager");
var PluginManager_1 = require("../managers/PluginManager");
var SpriteTimer_1 = require("../sprites/SpriteTimer");
//=============================================================================
// Monban.js
//=============================================================================
/*:
 * @plugindesc for performing unique productions for "monban"
 * @author DWANGO Co., Ltd.
 *
 * @param scale
 * @desc drawing magnification of timer
 * @default 1
 *
 * @help This plugin does not provide plugin commands.
 */
/*:ja
 * @plugindesc 「門番」独自の演出を行うためのプラグイン
 * @author 株式会社ドワンゴ
 *
 * @param scale
 * @desc タイマーの描画倍率
 * @default 1
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
(function () {
    var parameters = PluginManager_1.PluginManager.parameters("Monban");
    var scale = Number(parameters["scale"] || 1);
    // タイマー表示の作成
    var _spriteTimerCreateBitmap = SpriteTimer_1.Sprite_Timer.prototype.createBitmap;
    SpriteTimer_1.Sprite_Timer.prototype.createBitmap = function () {
        _spriteTimerCreateBitmap.call(this);
        this.bitmap = new Bitmap_1.Bitmap(96 * scale, 48 * scale);
        this.bitmap.fontSize = 32 * scale;
    };
    // タイマー表示文字列の設定
    var _spriteTimerTimerText = SpriteTimer_1.Sprite_Timer.prototype.timerText;
    SpriteTimer_1.Sprite_Timer.prototype.timerText = function () {
        _spriteTimerTimerText.call(this);
        return this._seconds;
    };
    // タイマー表示位置の設定
    var _spriteTimerUpdatePosition = SpriteTimer_1.Sprite_Timer.prototype.updatePosition;
    SpriteTimer_1.Sprite_Timer.prototype.updatePosition = function () {
        _spriteTimerUpdatePosition.call(this);
        this.x = (Graphics_1.Graphics.width - this.bitmap.width) / 2;
        this.y = 0;
    };

    // ゲームの高速化のために報酬メッセージのスキップ
    BattleManager_1.BattleManager.processVictory = function () {
        DataManager_1.$gameParty.removeBattleStates();
        DataManager_1.$gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        // this.displayVictoryMessage();
        // this.displayRewards();
        this.gainRewards();
        this.endBattle(0);
    };
})();
