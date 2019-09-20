"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
var define_1 = require("./define");
var miscAssetInfo_1 = require("./miscAssetInfo");
/**
 * ゲーム固有パラメータの読み込みクラス
 * 省略されたパラメータ項目の補完などを行う
 */
var GameParameterReader = /** @class */ (function () {
    function GameParameterReader() {
    }
    /**
     * 起動パラメータから対応するメンバ変数を設定する
     * @param {g.Scene} _scene Sceneインスタンス
     */
    GameParameterReader.read = function (_scene) {
        // 規定の出現間隔を割り当てる
        this.itemPopInterval = define_1.define.ITEM_POP_INTERVAL;
        // 規定のスタート時アイテムを割り当てる
        this.startItemLevel = define_1.define.BulletLevel.nail;
        // 規定の敵データを割り当てる
        this.thiefPopRates = define_1.define.THIEF_POP_RATES;
        if (!commonParameterReader_1.CommonParameterReader.nicowari) {
            if (commonParameterReader_1.CommonParameterReader.useDifficulty) {
                // 難易度指定によるパラメータを設定
                this.loadFromJson(_scene);
            }
            else {
                var param = _scene.game.vars.parameters;
                if (typeof param.itemPopInterval === "number") {
                    this.itemPopInterval = param.itemPopInterval;
                }
                if (typeof param.startItemLevel === "number") {
                    this.startItemLevel = param.startItemLevel;
                }
                if (param.thiefPopRates) {
                    this.thiefPopRates = (param.thiefPopRates);
                }
            }
        }
    };
    /**
     * JSONから難易度指定によるパラメータを設定
     * @param {g.Scene} _scene Sceneインスタンス
     */
    GameParameterReader.loadFromJson = function (_scene) {
        var difficultyJson = JSON.parse(_scene
            .assets[miscAssetInfo_1.MiscAssetInfo.difficultyData.name].data);
        var difficultyList = difficultyJson.difficultyParameterList;
        if (difficultyList.length === 0) {
            return;
        }
        var index = 0;
        for (var i = difficultyList.length - 1; i >= 0; --i) {
            if (difficultyList[i].minimumDifficulty
                <= commonParameterReader_1.CommonParameterReader.difficulty) {
                index = i;
                break;
            }
        }
        if (typeof difficultyList[index].itemPopInterval === "number") {
            this.itemPopInterval = difficultyList[index].itemPopInterval;
        }
        if (typeof difficultyList[index].startItemLevel === "number") {
            this.startItemLevel = difficultyList[index].startItemLevel;
        }
        if (difficultyList[index].embedNumber) {
            this.thiefPopRates = [];
            var length_1 = difficultyList[index].embedNumber.length;
            for (var i = 0; i < length_1; ++i) {
                var phase = difficultyList[index].embedNumber[i];
                this.thiefPopRates[i] = define_1.define.THIEF_POP_RATES[phase - 1];
            }
        }
    };
    return GameParameterReader;
}());
exports.GameParameterReader = GameParameterReader;
