var Global = require("Global");
var math = require("Math");
var EntityType = require("EntityType");
var Particle = require("Particle");

var game = g.game;

var BULLET_WIDTH = 8;
var BULLET_HEIGHT = 8;

//
// Bulletコンストラクタ
//
function Bullet(type, obstacles, pos, vel, hp, homing, imageAsset, life, th) {
    this.type = type;
    this.obstacles = obstacles;
    this.pos = { x: pos.x, y: pos.y };
    this.prevPos = { x: pos.x, y: pos.y };
    this.vel = { x: vel.x, y: vel.y };
    this.hp = hp;
    this.homing = homing;
    this.th = th ? th : 0;
    this.life = life;
    this.point = 0;

    this.pos.x -= BULLET_WIDTH / 2;
    this.spr = new g.E({
        scene: Global.gameCore.scene,
        width: BULLET_WIDTH,
        height: BULLET_HEIGHT,
        x: this.pos.x,
        y: this.pos.y
    });
    this.spr.append(new g.Sprite({
        scene: Global.gameCore.scene,
        src: imageAsset,
        x: (BULLET_WIDTH - imageAsset.width) / 2
    }));

    Global.gameCore.gameLayer.append(this.spr);
}

//
// 状態更新
//
Bullet.prototype.update = function() {
    if (this.hp <= 0) {
        return false;
    }

    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
    if (! this.homing) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    } else {
        var e = this.type === EntityType.PLAYER_BULLET ? Global.gameCore.findEnemy() : Global.gameCore.player;
        if (e && e.hp > 0) {
            var dx = e.pos.x + e.spr.width / 2 - this.pos.x;
            var dy = e.pos.y + e.spr.height / 2 - this.pos.y;
            var th = Math.atan2(-dy, dx) - Math.PI / 2;
            var dth = th - this.th;
            while (dth > Math.PI) dth -= Math.PI * 2;
            while (dth < -Math.PI) dth += Math.PI * 2;
            var limit = Math.PI * (5 / 180);
            dth = Math.max(-limit, Math.min(limit, dth));
            this.th += dth;
        }
        var spd = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        var c = Math.cos(this.th);
        var s = Math.sin(this.th);
        this.pos.x += -s * spd;
        this.pos.y -=  c * spd;
        if (this.life <= 0) {
            this.homing = false;
            this.vel.x = -s * spd * 2.5;
            this.vel.y = -c * spd * 2.5;
        }
    }

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.angle = -this.th / Math.PI * 180;
    this.spr.modified();

    this.life--;

    return !(this.pos.x < -this.spr.width || this.pos.x > game.width || this.pos.y < -this.spr.height || this.pos.y > game.height);
}

//
// 衝突イベントハンドラ
//
Bullet.prototype.onCollision = function(e) {
    this.hp--;
    e.hp--;
    var dir = null;
    if (e.hp > 0) {
        dir = { x: this.pos.x - this.prevPos.x, y: this.pos.y - this.prevPos.y };
    }
    Global.gameCore.entities.push(new HitEffectEmitter(e, dir));

    if (e.hp === 0 && e.point) {
        Global.gameCore.player.score += e.point;
        if (Global.hiScore < Global.gameCore.player.score) {
            Global.hiScore = Global.gameCore.player.score;
        }
    }
}

Bullet.prototype.destroy = function() {
    this.spr.destroy();
}

//
// 被弾エフェクト（小）エミッタコンストラクタ
//
function HitEffectEmitter(entity, dir) {
    this.entity = entity;
    this.dir = dir;
    this.cntr = 0;
    this.life = 3;
}

//
// 状態更新
//
HitEffectEmitter.prototype.update = function() {
    for (var i = 0; i < 4; i++) {
        var spd = 100 + 200 * math.random();;
        var th = math.random() * Math.PI * 2;
        var vel = null;
        if (this.dir) {
            var len = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y);
            if (len > 0) {
                var dx = this.dir.x / len;
                var dy = this.dir.y / len;
                var r = (math.random() + math.random() + math.random()) / 3;
                var th = -Math.PI / 4 + Math.PI / 2 * r;
                vel = {
                    x: (Math.cos(th) * dx - Math.sin(th) * dy) * spd,
                    y: (Math.sin(th) * dx + Math.cos(th) * dy) * spd
                };
            }
        }
        vel = vel || { x: spd * Math.cos(th), y: spd * Math.sin(th) };
        var p = new Particle({
            pos: { x: this.entity.pos.x + this.entity.spr.width / 2, y: this.entity.pos.y + this.entity.spr.height / 2 },
            vel: vel,
            drag: 0,
            grav: 0,
            life: game.fps,
            cssColor: math.random() < 0.33 ? "Yellow" : (math.random() < 0.5 ? "Red" : "White"),
            width: 2,
            height: 4,
            onUpdate: function(p) {
                var remain = p.life - p.cntr;
                if (remain < 8) {
                    p.spr.opacity = 0.7 * remain / 8;
                }
                p.spr.angle += 180 / game.fps;
                p.spr.modified();
            }
        });
        p.spr.angle = math.random() * 180;
        p.spr.opacity = 0.7;
        Global.gameCore.entities.push(p);
    }

    this.cntr++;
    return this.cntr < this.life;
}

HitEffectEmitter.prototype.destroy = function() {
    // nothing to do.
}

module.exports = Bullet;
