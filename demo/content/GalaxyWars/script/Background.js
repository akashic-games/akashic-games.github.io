var Global = require("./Global");
var math = require("./Math");
var EntityType = require("./EntityType");

var game = g.game;

//
// Backgroundコンストラクタ
//
function Background() {
    this.type = EntityType.EFFECT;
    this.cntr = 0;
    this.rgb = { r: 0, g: 191/255, b: 32/255 };
    this.spr = new g.FilledRect({
        scene: Global.gameCore.scene,
        cssColor: "#1E90FF",
        width: game.width,
        height: game.height
    });
    Global.gameCore.backgroundLayer.append(this.spr);
}

//
// 状態更新
//
Background.prototype.update = function() {
    if (this.cntr <= 60) {
        var t = Math.min(1, this.cntr / 60);
        var R = Math.round(0x00 * t + 0x1E * (1 - t));
        var G = Math.round(0x00 * t + 0x90 * (1 - t));
        var B = Math.round(0x20 * t + 0xFF * (1 - t));
        this.spr.cssColor = "#" + ("000000" + ((R << 16) | (G << 8) | B).toString(16)).slice(-6);
        this.spr.modified();
    }

    if (this.cntr % 4 === 0 && math.random() < 0.5) {
        var front = math.random() < 0.25;
        var imageAsset = game.assets[front ? "star01" : "star02"];
        var star = new g.Sprite({
            scene: Global.gameCore.scene,
            src: imageAsset,
            x: math.random() * (game.width - imageAsset.width),
            y: -imageAsset.height
        });
        star.modified();
        var that = this;
        star.update.add(function() {
            var t = Math.min(1, that.cntr / 60);
            var dy = front ? 8 : 4;
            dy += dy * 2.5 * (1 - t);
            star.y += dy;
            star.modified();
            if (star.y >= game.height) {
                star.destroy();
            }
        });
        this.spr.append(star);
    }

    this.cntr++;

    return true;
}

//
// 破棄
//
Background.prototype.destroy = function() {
    this.spr.destroy();
}

module.exports = Background;
