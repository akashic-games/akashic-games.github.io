Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameScene = void 0;
const Global_1 = require("./Global");
const GameCore_1 = require("./GameCore");
const GameOverLogo_1 = require("./GameOverLogo");
//
// ゲームシーン生成
//
function createGameScene() {
    const scene = new g.Scene({ game: g.game });
    scene.onLoad.add(() => {
        Global_1.Global.gameCore = new GameCore_1.GameCore(scene);
        // player input
        let clicked = false;
        scene.onPointDownCapture.add(() => {
            clicked = true;
        });
        scene.onPointMoveCapture.add((ev) => {
            if (!clicked) {
                return;
            }
            Global_1.Global.gameCore.player.move(ev.prevDelta.x, ev.prevDelta.y);
        });
        scene.onPointUpCapture.add(() => {
            clicked = false;
        });
        const timeGaugeWidth = g.game.width;
        const timeGauge = new g.FilledRect({
            scene: scene,
            width: timeGaugeWidth,
            height: 4,
            cssColor: "Red"
        });
        scene.append(timeGauge);
        // game loop
        let showResultUI = false;
        scene.onUpdate.add(() => {
            Global_1.Global.gameCore.update();
            g.game.vars.gameState.score = Global_1.Global.gameCore.player.score;
            const maxPlayTimeInFPS = GameCore_1.GameCore.MAX_PLAYTIME * g.game.fps;
            const remainTimeRate = Math.max(maxPlayTimeInFPS - Global_1.Global.gameCore.cntr, 0) / maxPlayTimeInFPS;
            timeGauge.width = timeGaugeWidth * remainTimeRate;
            timeGauge.modified();
            if (!showResultUI && Global_1.Global.gameCore.player.hp <= 0) {
                scene.onPointDownCapture.removeAll();
                scene.onPointMoveCapture.removeAll();
                scene.onPointUpCapture.removeAll();
                scene.setTimeout(() => {
                    const logoEntity = new GameOverLogo_1.GameOverLogo();
                    Global_1.Global.gameCore.entities.push(logoEntity);
                }, 1000);
                showResultUI = true;
                g.game.vars.gameState.isFinished = true;
            }
            if (Global_1.Global.gameCore.cntr === maxPlayTimeInFPS + g.game.fps * 6) {
                console.log("👍 done with " + JSON.stringify(g.game.vars.gameState));
            }
        });
        Global_1.Global.gameCore.start();
    });
    return scene;
}
exports.createGameScene = createGameScene;
