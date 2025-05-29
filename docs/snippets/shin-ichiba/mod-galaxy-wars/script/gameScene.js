Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameScene = void 0;
const Global_1 = require("./Global");
const GameCore_1 = require("./GameCore");
const GameOverLogo_1 = require("./GameOverLogo");
const gameUi_1 = require("./gameUi");
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
        // 自機操作方法としてバーチャルスティックも追加
        const gameStickBackSize = 100;
        const gameStickSize = 72;
        const gameStick = (0, gameUi_1.createGameStickEntity)(scene, Global_1.Global.gameCore.scene.asset.getImageById("gameStick"), { x: g.game.width - gameStickBackSize - 12, y: g.game.height - gameStickBackSize - 12, width: gameStickBackSize, height: gameStickBackSize }, { width: gameStickSize, height: gameStickSize }, (offset) => {
            const speed = Global_1.Global.gameCore.player.getSpeed();
            let dx = Math.round(offset.x * speed);
            let dy = Math.round(offset.y * speed);
            // バーチャルスティックが使われている時は既存の入力法を使わないように
            if (dx !== 0 || dy !== 0) {
                clicked = false;
            }
            Global_1.Global.gameCore.player.move(dx, dy);
        });
        scene.append(gameStick);
        // Specialボタンの追加
        const specialButtonWidth = 120;
        const specialButtonHeight = 30;
        const specialButton = (0, gameUi_1.createSpecialAttackButton)(scene, {
            x: g.game.width - specialButtonWidth - 12,
            y: g.game.height - gameStickBackSize - specialButtonHeight - 24,
            width: specialButtonWidth,
            height: specialButtonHeight
        });
        scene.append(specialButton);
        const timeGaugeWidth = g.game.width;
        const timeGauge = new g.FilledRect({
            scene: scene,
            width: timeGaugeWidth,
            height: 4,
            cssColor: "green"
        });
        scene.append(timeGauge);
        // 残り時間表示ラベル
        const timeLabel = new g.Label({
            scene: Global_1.Global.gameCore.scene,
            text: "",
            font: Global_1.Global.bmpFont,
            fontSize: 16,
            x: g.game.width - (16 * 9 + 4), y: 4
        });
        scene.append(timeLabel);
        // ステージBGM再生
        let stageBgm = scene.asset.getAudioById("bgm_normal");
        stageBgm.play();
        // game loop
        let showResultUI = false;
        let startCountDownBgm = false; // BGM変更用フラグ
        scene.onUpdate.add(() => {
            Global_1.Global.gameCore.update();
            g.game.vars.gameState.score = Global_1.Global.gameCore.player.score;
            const maxPlayTimeInFPS = GameCore_1.GameCore.MAX_PLAYTIME * g.game.fps;
            const remainTimeRate = Math.max(maxPlayTimeInFPS - Global_1.Global.gameCore.cntr, 0) / maxPlayTimeInFPS;
            const remainTime = Math.floor(GameCore_1.GameCore.MAX_PLAYTIME - Global_1.Global.gameCore.cntr / g.game.fps);
            // 残り時間によってバーやラベルの色を変えてプレイヤーの危機感を煽るように
            if (remainTime <= 10) {
                timeGauge.cssColor = "red";
                timeLabel.textColor = "red";
                // 残り時間が少なくなったらBGMを変える
                if (Global_1.Global.gameCore.player.hp > 0 && !startCountDownBgm) {
                    startCountDownBgm = true;
                    stageBgm.stop();
                    stageBgm = scene.asset.getAudioById("bgm_near_timeout");
                    stageBgm.play();
                }
            }
            else if (remainTime <= 30) {
                timeGauge.cssColor = "yellow";
            }
            timeGauge.width = timeGaugeWidth * remainTimeRate;
            timeGauge.modified();
            timeLabel.text = `TIME: ${remainTime > 0 ? remainTime : 0}`;
            timeLabel.invalidate();
            if (!showResultUI && Global_1.Global.gameCore.player.hp <= 0) {
                // ゲームオーバー処理なのでここでゲームオーバー用BGM(ループなし)を鳴らす
                stageBgm.stop();
                g.game.scene().asset.getAudioById("bgm_gameover").play();
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
