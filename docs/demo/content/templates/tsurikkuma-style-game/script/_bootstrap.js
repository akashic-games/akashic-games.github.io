"use strict";
// 通常このファイルを編集する必要はありません。ゲームの処理は main.js に記述してください
const main_1 = require("./main");
module.exports = (originalParam) => {
    const param = {};
    Object.keys(originalParam).forEach((key) => {
        param[key] = originalParam[key];
    });
    // セッションパラメーター
    param.sessionParameter = {};
    // コンテンツが動作している環境がRPGアツマール上かどうか
    param.isAtsumaru = typeof window !== "undefined" && typeof window.RPGAtsumaru !== "undefined";
    // 乱数生成器
    param.random = g.game.random;
    const limitTickToWait = 3; // セッションパラメーターが来るまでに待つtick数
    const scene = new g.Scene({
        game: g.game
    });
    // セッションパラメーターを受け取ってゲームを開始します
    scene.onMessage.add((msg) => {
        if (msg.data && msg.data.type === "start" && msg.data.parameters) {
            param.sessionParameter = msg.data.parameters; // sessionParameterフィールドを追加
            if (msg.data.parameters.randomSeed != null) {
                param.random = new g.XorshiftRandomGenerator(msg.data.parameters.randomSeed);
            }
            g.game.popScene();
            (0, main_1.main)(param);
        }
    });
    scene.onLoad.add(() => {
        let currentTickCount = 0;
        scene.onUpdate.add(function () {
            currentTickCount++;
            // 待ち時間を超えた場合はゲームを開始します
            if (currentTickCount > limitTickToWait) {
                g.game.popScene();
                (0, main_1.main)(param);
            }
        });
    });
    g.game.pushScene(scene);
};
