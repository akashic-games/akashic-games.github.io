var Global = require("./Global");
var math = require("./Math");
var EntityType = require("./EntityType");
var createTitleScene = require("./titleScene");
var GameCore = require("./GameCore");
var GameOverLogo = require("./GameOverLogo");

var game = g.game;

//
// ゲームシーン生成
//
function createGameScene() {
    var scene = new g.Scene({ game: game });

    scene.loaded.add(function() {

        Global.gameCore = new GameCore(scene);

        // player input
        var clicked = false;
        scene.pointDownCapture.add(function() {
            clicked = true;
        });
        scene.pointMoveCapture.add(function(ev) {
            if (! clicked) {
                return;
            }
            Global.gameCore.player.move(ev.prevDelta.x, ev.prevDelta.y);
        });
        scene.pointUpCapture.add(function() {
            clicked = false;
        });

        // game loop
        var showResultUI = false;
        scene.update.add(function() {
            Global.gameCore.update();

            if (!showResultUI && Global.gameCore.player.hp <= 0) {
                scene.pointDownCapture.removeAll();
                scene.pointMoveCapture.removeAll();
                scene.pointUpCapture.removeAll();

                scene.setTimeout(function() {
                    var logoEntity = new GameOverLogo();
                    Global.gameCore.entities.push(logoEntity);

                    var returnBtnImageAsset = game.assets["returnButton"];

                    var returnBtn = new g.Sprite({
                        scene: scene,
                        src: returnBtnImageAsset,
                        x: (game.width - returnBtnImageAsset.width) / 2,
                        y: (game.height - returnBtnImageAsset.height) / 4 * 3,
                        touchable: true
                    });

                    returnBtn.pointDown.add(function() {
                        returnBtn.x += 4;
                        returnBtn.y += 4;
                        returnBtn.modified();
                    });

                    returnBtn.pointUp.add(function() {
                        returnBtn.x -= 4;
                        returnBtn.y -= 4;
                        returnBtn.touchable = false;
                        returnBtn.modified();
                        logoEntity.playBackwards()
                        scene.setTimeout(function() {
                            var createTitleScene = require("./titleScene"); // requireの循環参照回避
                            game.replaceScene(createTitleScene());
                        }, logoEntity.cntr / game.fps * 1000 + 500);
                    });

                    scene.append(returnBtn);
                }, 1000);
                showResultUI = true;
            }
        });

        Global.gameCore.start();
    });

    return scene;
}

module.exports = createGameScene;
