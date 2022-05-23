"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sea = void 0;
var constants_1 = require("../constants");
var Fish_1 = require("./Fish");
/**
 * 出現する魚の種類
 */
var fishInfoList = [
    { name: "さかな", score: 1 },
    { name: "くらげ", score: 0 }
];
/**
 * 海クラス
 */
var Sea = /** @class */ (function () {
    function Sea(param) {
        this.capturedFishList = [];
        this._parent = param.parent;
        this._fishList = [];
    }
    /**
     * 定期的に魚を作成する
     */
    Sea.prototype.startFishTimer = function () {
        var _this = this;
        this._fishTimerIdentifier = this._parent.scene.setInterval(function () {
            var fish = _this._createRandomFish(_this._parent);
            fish.swim();
            _this._fishList.push(fish);
        }, constants_1.FISH_INTERVAL);
    };
    /**
     * タイマーをクリアする
     */
    Sea.prototype.clearFishTimer = function () {
        if (!this._fishTimerIdentifier)
            return;
        this._parent.scene.clearInterval(this._fishTimerIdentifier);
        this._fishTimerIdentifier = null;
    };
    /**
     * 釣り針と魚の当たり判定をチェックする
     */
    Sea.prototype.checkFishOnHook = function (fishingRod) {
        var _this = this;
        if (!this._fishList.length)
            return;
        if (!fishingRod.isCatching)
            return;
        this._fishList.forEach(function (fish) {
            // 釣り針と魚が当たっていた場合は釣り上げる
            if (g.Collision.intersectAreas(fishingRod.hookArea, fish.area)) {
                if (fish.isCaptured)
                    return;
                fish.stop();
                fish.followHook(fishingRod);
                _this._fishList = _this._fishList.filter(function (item) { return item !== fish; });
                _this.capturedFishList.push(fish);
            }
        });
    };
    /**
     * 捕まえた魚たちを destroy する
     */
    Sea.prototype.destroyCapturedFish = function () {
        this.capturedFishList.forEach(function (capturedFish) { return capturedFish.destroy(); });
        this.capturedFishList = [];
    };
    /**
     * ランダムな魚を作成
     */
    Sea.prototype._createRandomFish = function (parent) {
        // 作成する魚の種類
        var fishIdx = Math.floor(g.game.random.generate() * fishInfoList.length);
        // 魚の泳ぎ方のパターン
        var pattern = (Math.floor(g.game.random.generate() * 2)) ? "right_to_left" : "left_to_right";
        // 魚が泳ぐ水深
        var depth = constants_1.WATERSURFACE_POS.y + constants_1.FISH_FONT_SIZE * Math.floor(g.game.random.generate() * 5);
        // 魚が泳ぐ時間
        var swimTime = Math.floor(g.game.random.generate() * (constants_1.SWIMMING_TIME_RANGE.max - constants_1.SWIMMING_TIME_RANGE.min)) + constants_1.SWIMMING_TIME_RANGE.min;
        return new Fish_1.Fish({
            parent: parent,
            name: fishInfoList[fishIdx].name,
            score: fishInfoList[fishIdx].score,
            swimmingStyle: {
                pattern: pattern,
                depth: depth,
                swimTime: swimTime
            }
        });
    };
    return Sea;
}());
exports.Sea = Sea;
