var Global = require("Global");
var Player = require("Player");

var game = g.game;

//
// PlayerStatusコンストラクタ
//
function PlayerStatus() {
    this.scoreLabel = new g.Label({
        scene: Global.gameCore.scene,
        text: "",
        font: Global.bmpFont,
        fontSize: 16,
        x: 4, y: 4
    });
    Global.gameCore.hudLayer.append(this.scoreLabel);

    this.hiScoreLabel = new g.Label({
        scene: Global.gameCore.scene,
        text: "",
        font: Global.bmpFont,
        fontSize: 16,
        x: game.width - (16 * 9 + 4), y: 4
    });
    Global.gameCore.hudLayer.append(this.hiScoreLabel);

    this.hpGauge = new g.E({ scene: Global.gameCore.scene });

    // trick
    var m = this.hpGauge.getMatrix()._matrix;
    this.hpGauge.angle = 0.001; // dummy value to apply following matrix
    var sk = -Math.PI/6;
    m[0] = Math.cos(sk);
    m[1] = 0;
    m[2] = Math.sin(sk);
    m[3] = 1;
    this.hpGauge.getMatrix().update = function() {}; // to prevent hpGauge from overwriting matrix

    var x = 28;
    for (var i = 0; i < Player.MAX_HP; i++) {
        var scale = new g.FilledRect({
            scene: Global.gameCore.scene,
            width: 8,
            height: 16,
            x: x,
            y: 24,
            cssColor: "Yellow"
        });
        x += scale.width + 4;
        this.hpGauge.append(scale);
    }
    Global.gameCore.hudLayer.append(this.hpGauge);
}

//
// 状態更新
//
PlayerStatus.prototype.update = function() {
    this.scoreLabel.text = "SCORE " + ("00000" + Global.gameCore.player.score).slice(-6);
    this.scoreLabel.invalidate();
    this.hiScoreLabel.text = "HI " + ("00000" + Global.hiScore).slice(-6);
    this.hiScoreLabel.invalidate();

    var scales = this.hpGauge.children;
    for (var i = 0; i < scales.length; i++) {
        var scale = scales[i];
        scale.cssColor = (i < Global.gameCore.player.hp) ? "Yellow" : "Red";
        scale.modified();
    }

    return true;
}

//
// 破棄
//
PlayerStatus.prototype.destroy = function() {
    this.scoreLabel.destroy();
    this.hpLabel.destroy();
    this.hpGauge.destroy();
}

module.exports = PlayerStatus;
