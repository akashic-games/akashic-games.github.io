var Global = require("./Global");
var EntityType = require("./EntityType");
var ItemType = require("./ItemType");
var Shield = require("./Shield");
var Bullet = require("./Bullet");
var emmitDamageEffect = require("./emmitDamageEffect");

var game = g.game;

//
// Playerコンストラクタ
//
function Player() {
    this.reset();

    this.obstacles = [
        EntityType.ENEMY,
        EntityType.ENEMY_BULLET,
        EntityType.ITEM
    ];

    this.spr = new g.Sprite({
        scene: Global.gameCore.scene,
        src: game.assets["player"],
        x: this.pos.x,
        y: this.pos.y
    });

    Global.gameCore.gameLayer.append(this.spr);
}

// プレイヤー最大HP
Player.MAX_HP = 15;

//
// 衝突イベントハンドラ
//
Player.prototype.onCollision = function(e) {
    if (e.type === EntityType.ITEM) {
        e.hp = 0;
        var effectTime = game.fps * 10;
        var that = this;
        var getter;
        switch (e.itemType) {
            case ItemType.SHIELD:
            if (this.shieldCntr <= 0) {
                for (var i = 0; i < 8; i++) {
                    Global.gameCore.entities.push(new Shield(i, 8));
                }
                getter = function() { return that.shieldCntr; };
            }
            this.shieldCntr = effectTime;
            break;

            case ItemType.HOMING:
            if (this.homingCntr <= 0) {
                getter = function() { return that.homingCntr; };
            }
            this.homingCntr = effectTime;
            break;

            case ItemType.PIERCING:
            if (this.piercingCntr <= 0) {
                getter = function() { return that.piercingCntr; };
            }
            this.piercingCntr = effectTime;
            break;

            case ItemType.RAPIDFIRE:
            if (this.rapidFireCntr <= 0) {
                getter = function() { return that.rapidFireCntr; };
            }
            this.rapidFireCntr = effectTime;
            break;

            case ItemType.BULLETSPEED:
            if (this.bulletSpeedCntr <= 0) {
                getter = function() { return that.bulletSpeedCntr; };
            }
            this.bulletSpeedCntr = effectTime;
            break;

            case ItemType.RECOVER:
            if (this.hp < Player.MAX_HP) this.hp++;
            break;

            default:;
        }

        if (getter) {
            Global.gameCore.itemGaugeTray.addItem(e.itemType, effectTime, getter);
        }
        Global.gameCore.itemGaugeTray.showItemName(e.itemType);
    } else {
        Global.gameCore.vibrationCntr = 10;
        for (var i = 0; i < 3; i++) {
            emmitDamageEffect(this);
        }
    }
}

//
// Player初期化
//
Player.prototype.reset = function() {
    this.type = EntityType.PLAYER;
    this.pos = {
        x: (game.width - game.assets["player"].width) / 2,
        y: game.height - game.assets["player"].height * 2
    };
    this.hp = Player.MAX_HP;
    this.score = 0;
    this.bulletCntr = 0;
    this.bulletInterval = 10;
    this.shieldCntr = 0;
    this.homingCntr = 0;
    this.rapidFireCntr = 0;
    this.bulletSpeedCntr = 0;
    this.piercingCntr = 0;
}

//
// Player移動
//
Player.prototype.move = function(dx, dy) {
    this.pos.x += dx;
    this.pos.y += dy;
    this.pos.x = Math.max(0, Math.min(game.width - this.spr.width, this.pos.x));
    this.pos.y = Math.max(0, Math.min(game.height - this.spr.height, this.pos.y));
}

//
// Player状態更新
//
Player.prototype.update = function() {
    if (this.hp <= 0) {
        return false;
    }

    var bulletInterval = this.rapidFireCntr > 0 ? this.bulletInterval / 2 : this.bulletInterval;
    var bulletSpeed = this.bulletSpeedCntr > 0 ? 16 : 8;
    var bulletHP = this.piercingCntr > 0 ? 3 : 1;
    var bulletHoming = this.homingCntr > 0;
    if (this.bulletCntr % bulletInterval === 0) {
        var b = new Bullet(
            EntityType.PLAYER_BULLET,
            [ EntityType.ENEMY ],
            { x: this.pos.x + this.spr.width / 2, y: this.pos.y },
            { x: 0, y: -bulletSpeed },
            bulletHP,
            bulletHoming,
            game.assets["missle"]
        );
        Global.gameCore.entities.push(b);
    }

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.modified();

    this.bulletCntr++;

    if (this.shieldCntr > 0) this.shieldCntr--;
    if (this.homingCntr > 0) this.homingCntr--;
    if (this.rapidFireCntr > 0) this.rapidFireCntr--;
    if (this.bulletSpeedCntr > 0) this.bulletSpeedCntr--;
    if (this.piercingCntr > 0) this.piercingCntr--;

    return true;
}

//
// Player破棄
//
Player.prototype.destroy = function() {
    this.spr.destroy();
}

module.exports = Player;
