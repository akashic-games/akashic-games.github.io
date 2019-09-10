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
var gameUtil_1 = require("../util/gameUtil");
var entityUtil_1 = require("../util/entityUtil");
var commonAsaInfo_1 = require("./commonAsaInfo");
var asaEx_1 = require("../util/asaEx");
/**
 * ワイプ演出を管理するクラス
 */
var WipeManager = /** @class */ (function (_super) {
    __extends(WipeManager, _super);
    function WipeManager(_scene) {
        var _this = _super.call(this, { scene: _scene }) || this;
        _this.fadeAsa = new asaEx_1.asaEx.Actor(_scene, commonAsaInfo_1.CommonAsaInfo.nwCommon.pj);
        _this.fadeAsa.x = _scene.game.width / 2;
        _this.fadeAsa.y = _scene.game.height / 2;
        _this.fadeAsa.pause = true;
        _this.append(_this.fadeAsa);
        entityUtil_1.entityUtil.hideEntity(_this.fadeAsa);
        return _this;
    }
    /**
     * @override g.E#destroy
     */
    WipeManager.prototype.destroy = function () {
        if (this.destroyed()) {
            return;
        }
        if (!!this.fadeAsa) {
            this.fadeAsa.destroy();
            this.fadeAsa = null;
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * ワイプ演出を開始する
     * @param {boolean} _isRtoL trueならばRtoL、falseならばLtoRのアニメを使用する
     * @param {() => void} _funcMid 全画面が黒になった時点で呼ばれる関数
     * @param {() => void} _funcFinal ワイプ演出が終了した時点で呼ばれる関数
     */
    WipeManager.prototype.startWipe = function (_isRtoL, _funcMid, _funcFinal) {
        var _this = this;
        var animName = _isRtoL ?
            commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.fadeRtoL :
            commonAsaInfo_1.CommonAsaInfo.nwCommon.anim.fadeLtoR;
        this.fadeAsa.play(animName, 0, false, 1.0);
        this.fadeAsa.pause = false;
        entityUtil_1.entityUtil.showEntity(this.fadeAsa);
        // ワイプアニメの黒幕移動部分のフレーム数
        var wipeFrames = 6;
        // 黒幕で完全に画面が隠れるまでのフレーム数
        var inFrames = (wipeFrames / 2) | 0;
        var outFrames = wipeFrames - inFrames;
        var timeline = this.scene.game.vars.scenedata.timeline;
        gameUtil_1.gameUtil.createTween(timeline, this.fadeAsa).
            every(function () {
            _this.fadeAsa.modified();
            _this.fadeAsa.calc();
        }, gameUtil_1.gameUtil.frame2MSec(inFrames)).
            call(function () {
            if (_funcMid) {
                _funcMid();
            }
        }).
            every(function () {
            _this.fadeAsa.modified();
            _this.fadeAsa.calc();
        }, gameUtil_1.gameUtil.frame2MSec(outFrames)).
            call(function () {
            _this.fadeAsa.pause = true;
            entityUtil_1.entityUtil.hideEntity(_this.fadeAsa);
            if (_funcFinal) {
                _funcFinal();
            }
        });
    };
    return WipeManager;
}(g.E));
exports.WipeManager = WipeManager;
