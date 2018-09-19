var Global = require("./Global");
var math = require("./Math");
var Particle = require("./Particle");

var game = g.game;

//
// 被弾エフェクト（大）
//
function emmitDamageEffect(entity) {
    var th = math.random() * Math.PI * 2;
    var spd = 750;
    var imageAsset = game.assets["particle"];

    var p = new Particle({
        pos: { x: entity.pos.x + entity.spr.width / 2, y: entity.pos.y + entity.spr.height / 2 },
        vel: { x: spd * Math.cos(th), y: spd * Math.sin(th) },
        drag: 4,
        grav: 500,
        life: game.fps,
        asset: imageAsset,
        onUpdate: function(p) {
            if (p.vel.y > 0) {
                p.spr.opacity *= 0.9;
            }
            if (p.cntr % 3 === 0) {
                var p2 = new Particle({
                    pos: p.pos,
                    vel: { x: 0, y: 0 },
                    drag: 0,
                    grav: 0,
                    life: 8,
                    asset: imageAsset,
                    onUpdate: function(p) {
                        p.spr.opacity *= 0.9;
                        p.spr.modified();
                    }
                });
                p2.spr.opacity = p.spr.opacity;
                Global.gameCore.entities.push(p2);
            }
        }
    });
    p.spr.scaleX = 2.0;
    p.spr.scaleY = 2.0;
    p.spr.modified();

    Global.gameCore.entities.push(p);
}

module.exports = emmitDamageEffect;
