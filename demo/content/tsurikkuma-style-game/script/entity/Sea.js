"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sea = void 0;
const constants_1 = require("../constants");
const Fish_1 = require("./Fish");
/**
 * 出現する魚の種類
 */
const fishInfoList = [
    { name: "さかな", score: 1 },
    { name: "くらげ", score: 0 }
];
/**
 * 海クラス
 */
class Sea {
    constructor(param) {
        this.capturedFishList = [];
        this._parent = param.parent;
        this._fishList = [];
    }
    /**
     * 定期的に魚を作成する
     */
    startFishTimer() {
        this._fishTimerIdentifier = this._parent.scene.setInterval(() => {
            const fish = this._createRandomFish(this._parent);
            fish.swim();
            this._fishList.push(fish);
        }, constants_1.FISH_INTERVAL);
    }
    /**
     * タイマーをクリアする
     */
    clearFishTimer() {
        if (!this._fishTimerIdentifier)
            return;
        this._parent.scene.clearInterval(this._fishTimerIdentifier);
        this._fishTimerIdentifier = null;
    }
    /**
     * 釣り針と魚の当たり判定をチェックする
     */
    checkFishOnHook(fishingRod) {
        if (!this._fishList.length)
            return;
        if (!fishingRod.isCatching)
            return;
        this._fishList.forEach(fish => {
            // 釣り針と魚が当たっていた場合は釣り上げる
            if (g.Collision.intersectAreas(fishingRod.hookArea, fish.area)) {
                if (fish.isCaptured)
                    return;
                fish.stop();
                fish.followHook(fishingRod);
                this._fishList = this._fishList.filter(item => item !== fish);
                this.capturedFishList.push(fish);
            }
        });
    }
    /**
     * 捕まえた魚たちを destroy する
     */
    destroyCapturedFish() {
        this.capturedFishList.forEach(capturedFish => capturedFish.destroy());
        this.capturedFishList = [];
    }
    /**
     * ランダムな魚を作成
     */
    _createRandomFish(parent) {
        // 作成する魚の種類
        const fishIdx = Math.floor(g.game.random.generate() * fishInfoList.length);
        // 魚の泳ぎ方のパターン
        const pattern = (Math.floor(g.game.random.generate() * 2)) ? "right_to_left" : "left_to_right";
        // 魚が泳ぐ水深
        const depth = constants_1.WATERSURFACE_POS.y + constants_1.FISH_FONT_SIZE * Math.floor(g.game.random.generate() * 5);
        // 魚が泳ぐ時間
        const swimTime = Math.floor(g.game.random.generate() * (constants_1.SWIMMING_TIME_RANGE.max - constants_1.SWIMMING_TIME_RANGE.min)) + constants_1.SWIMMING_TIME_RANGE.min;
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
    }
}
exports.Sea = Sea;
