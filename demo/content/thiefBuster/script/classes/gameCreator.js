"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thiefBuster_1 = require("./thiefBuster");
/**
 * GameBaseの実装クラスのインスタンス生成を行うだけのクラス
 * GameSubsceneに対して実装クラスの名前を隠ぺいする
 */
var GameCreator = /** @class */ (function () {
    function GameCreator() {
    }
    /**
     * GameBaseの実装クラスのインスタンスを生成する
     * @param {g.Scene}  _scene インスタンス生成に使用するScene
     * @return {GameBase} 生成されたインスタンス
     */
    GameCreator.createGame = function (_scene) {
        return new thiefBuster_1.ThiefBuster(_scene);
    };
    return GameCreator;
}());
exports.GameCreator = GameCreator;
