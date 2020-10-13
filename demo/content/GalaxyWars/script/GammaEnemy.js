var Global = require("./Global");
var math = require("./Math");
var EntityType = require("./EntityType");
var ItemType = require("./ItemType");
var Bullet = require("./Bullet");
var Enemy = require("./Enemy");
var Particle = require("./Particle");
var emmitDamageEffect = require("./emmitDamageEffect");

var game = g.game;

//
// GammaEnemyコンストラクタ
//
function GammaEnemy() {
    var imageAsset = game.assets["gammaEnemy"];
    var width = imageAsset.width;
    var height = imageAsset.height;
    var x = (game.width - width) / 2;
    var y = -height;

    Enemy.call(this, { x: x, y: y }, 9999, 100, [], new g.Sprite({
        scene: Global.gameCore.scene,
        src: imageAsset,
        x: x,
        y: y
    }));

    GammaEnemy.numInstance++;
}

//
// GammaEnemy総数カウンタ
//
GammaEnemy.numInstance = 0;

GammaEnemy.prototype = Object.create(Enemy.prototype);

//
// 死亡ハンドラ
//
GammaEnemy.prototype.onDied = function() {
    Enemy.prototype.onDied.call(this);

    var imageAsset = game.assets["gammaEnemy"];
    var split = 8;
    var fragmentWidth = imageAsset.width / split;
    var fragmentHeight = imageAsset.height / split;
    for (var i = 0; i < split; i++) {
        var y = fragmentHeight * i;
        for (var j = 0; j < split; j++) {
            var spd = 150 + 250 * math.random();
            var th = math.random() * Math.PI * 2;
            var x = fragmentWidth * j;
            var offset = Math.PI * 2 * math.random();
            var scale = 1 + math.random();
            var p = new Particle({
                pos: { x: this.pos.x + x, y: this.pos.y + y},
                vel: { x: spd * Math.cos(th), y: spd * Math.sin(th) },
                life: (game.fps * 1.2) | 0,
                asset: imageAsset,
                width: fragmentWidth,
                height: fragmentHeight,
                srcX: x,
                srcY: y,
                onUpdate: function(p) {
                    var th = Math.PI * 2 / game.fps * p.cntr + offset;
                    p.spr.scaleX = scale * Math.cos(th);
                    p.spr.scaleY = scale * Math.sin(th);
                    var remain = p.life - p.cntr;
                    if (remain < 8) {
                        p.spr.opacity = remain / 8;
                    }
                    p.spr.modified();
                }
            });
            p.spr.compositeOperation = "source-over";
            if (i % 2 === 0) {
                p.spr.scaleX = 4;
                p.spr.scaleY = 4;
            }
            Global.gameCore.entities.push(p);
            emmitDamageEffect(p);
        }
    }
}

//
// 状態更新
//
GammaEnemy.prototype.onUpdate = function() {
    var progressTime = 50;
    if (this.cntr < progressTime) {
        this.pos.y += 4;
    } else {
        if (this.cntr === progressTime) {
            this.hp = 16;
        }

        var cntr = (this.cntr - progressTime) % (180 * 3);
        if (cntr < 180) {
            if (cntr % 3 === 0) {
                var th = Math.PI * 2 / 180 * cntr;
                var b = new Bullet(
                    EntityType.ENEMY_BULLET,
                    [ EntityType.PLAYER ],
                    { x: this.pos.x + this.spr.width / 2, y: this.pos.y + this.spr.height / 2 },
                    { x: 8 * Math.sin(th), y: 8 * Math.cos(th) },
                    2,
                    false,
                    game.assets["ball"]
                );
                Global.gameCore.entities.push(b);
                th = -th;
                var b = new Bullet(
                    EntityType.ENEMY_BULLET,
                    [ EntityType.PLAYER ],
                    { x: this.pos.x + this.spr.width / 2, y: this.pos.y + this.spr.height / 2 },
                    { x: 8 * Math.sin(th), y: 8 * Math.cos(th) },
                    2,
                    false,
                    game.assets["ball"]
                );
                Global.gameCore.entities.push(b);
            }
        } else if (cntr < 180 * 2) {
            if (cntr % 60 === 0) {
                var b = new Bullet(
                    EntityType.ENEMY,
                    [ EntityType.PLAYER ],
                    { x: this.pos.x + this.spr.width / 8, y: this.pos.y },
                    { x: 0, y: 4 },
                    1,
                    true,
                    game.assets["enemyMissile"],
                    game.fps * 5, // life
                    Math.PI / 4
                );
                Global.gameCore.entities.push(b);

                var b = new Bullet(
                    EntityType.ENEMY,
                    [ EntityType.PLAYER ],
                    { x: this.pos.x + this.spr.width / 8 * 7, y: this.pos.y },
                    { x: 0, y: 4 },
                    1,
                    true,
                    game.assets["enemyMissile"],
                    game.fps * 5, // life
                    -Math.PI / 4
                );
                Global.gameCore.entities.push(b);
            }
        } else {

        }
    }

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.modified();

    this.cntr++;

    return true;
}

//
// 破棄
//
GammaEnemy.prototype.destroy = function() {
    GammaEnemy.numInstance--;
    Enemy.prototype.destroy.call(this);
}

module.exports = GammaEnemy;
