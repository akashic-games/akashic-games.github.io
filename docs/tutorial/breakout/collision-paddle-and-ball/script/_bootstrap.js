var main_1 = require("./main");
module.exports = function (originalParam) {
    var param = {};
    Object.keys(originalParam).forEach(function (key) {
        param[key] = originalParam[key];
    });
    // セッションパラメーター
    param.sessionParameter = {};
    // 乱数生成器
    param.random = g.game.random;
    var limitTickToWait = 3; // セッションパラメーターが来るまでに待つtick数
    var scene = new g.Scene({
        game: g.game
    });
    // セッションパラメーターを受け取ってゲームを開始します
    scene.onMessage.add(function (msg) {
        if (msg.data && msg.data.type === "start" && msg.data.parameters) {
            param.sessionParameter = msg.data.parameters; // sessionParameterフィールドを追加
            if (msg.data.parameters.randomSeed != null) {
                param.random = new g.XorshiftRandomGenerator(msg.data.parameters.randomSeed);
            }
            g.game.popScene();
            main_1.main(param);
        }
    });
    scene.onLoad.add(function () {
        var currentTickCount = 0;
        scene.onUpdate.add(function () {
            currentTickCount++;
            // 待ち時間を超えた場合はゲームを開始します
            if (currentTickCount > limitTickToWait) {
                g.game.popScene();
                main_1.main(param);
            }
        });
    });
    g.game.pushScene(scene);
};
