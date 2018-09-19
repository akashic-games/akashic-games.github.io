var Global = require("./Global");
var math = require("./Math");

var game = g.game;

//
// GameOverLogoコンストラクタ
//
function GameOverLogo() {
    this.cntr = 0;
    this.span = game.fps;
    this.pulses = [];
    this.countDown = false;

    var gameOverImageAsset = game.assets["gameover"];

    this.spr = new g.E({
        scene: Global.gameCore.scene,
        x: (game.width - gameOverImageAsset.width) / 2,
        y: (game.height - gameOverImageAsset.height) / 3 * 1,
    });

    for (var i = 0; i < gameOverImageAsset.height; i++) {
        var cell = new g.Sprite({
            scene: Global.gameCore.scene,
            src: gameOverImageAsset,
            x: 0,
            y: i,
            width: gameOverImageAsset.width,
            height: 1,
            srcY: i
        })
        this.spr.append(cell);
    }

    this.update();

    Global.gameCore.scene.append(this.spr);
}

//
// アニメーション逆再生
//
GameOverLogo.prototype.playBackwards = function() {
    this.countDown = true;
    this.cntr = this.span;
}

//
// グリッチ発生
//
GameOverLogo.prototype.glitch = function() {
    var pulse = {
        cntr: 0,
        life: Math.floor(2 + math.random() * 4),
        pos: Math.floor(game.assets["gameover"].height * math.random()),
        len: Math.floor(4 + math.random() * 16),
        amp: 10 + 70 * math.random(),
        mov: math.random() < 0.5 ? (math.random() < 0.5 ? 2 : -2) : 0
    };
    this.pulses.push(pulse);
}

//
// 状態更新
//
GameOverLogo.prototype.update = function() {
    if (this.cntr > this.span + game.fps * 1.5 && math.random() < 0.1) {
        this.glitch();
    }

    var children = this.spr.children;
    var t = Math.max(0, (this.span - this.cntr) / this.span);
    for (var i = 0; i < children.length; i++) {
        var cell = children[i];
        var th = Math.PI * 4 * i / children.length + Math.PI * t * 2;
        var amp = 90 * t;
        cell.x = amp * Math.sin(th);
        cell.opacity = Math.min(1, (1 - t) * 3);
        cell.modified();
    }

    for (var i = 0; i < this.pulses.length; i++) {
        var p = this.pulses[i];

        var t = p.cntr / p.life;
        for (var j = p.pos; j < Math.min(p.pos + p.len, children.length); j++) {
            if (j < 0) continue;
            var s = (j - p.pos) / p.len;
            var th = Math.PI * 2 * s;
            var dx = Math.sin(th) * p.amp * Math.sin(Math.PI * t);
            var cell = children[j];
            cell.x += dx;
            cell.modified();
        }

        p.cntr++;
        p.pos += p.mov;
        if (p.cntr >= p.life) {
            this.pulses[i] = null;
        }
    }

    // shrink
    this.pulses = this.pulses.filter(function(p) {
        return !!p;
    });

    if (this.countDown) {
        this.cntr--;
        if (this.cntr < 0) {
            this.cntr = 0;
        }
    } else {
        this.cntr++;
    }

    return true;
}

//
// 破棄
//
GameOverLogo.prototype.destroy = function() {
    this.spr.destroy();
}

module.exports = GameOverLogo;
