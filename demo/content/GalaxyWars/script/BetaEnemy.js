var Global = require("./Global");
var math = require("./Math");
var EntityType = require("./EntityType");
var ItemType = require("./ItemType");
var Bullet = require("./Bullet");
var Enemy = require("./Enemy");

var game = g.game;

//
// BetaEnemyコンストラクタ
//
function BetaEnemy() {
    var imageAsset = game.assets["betaEnemy"];
    var x = math.random() * (game.width - imageAsset.width);
    var y = -40;
    var itemTypes = [
        ItemType.SHIELD,
        ItemType.HOMING,
        ItemType.RAPIDFIRE,
        ItemType.BULLETSPEED,
        ItemType.PIERCING,
    ];
    Enemy.call(this, { x: x, y: y }, 1, 10, itemTypes, new g.Sprite({
        scene: Global.gameCore.scene,
        src: imageAsset,
        x: x,
        y: y
    }));
    this.dropPointY = math.random() * (game.height / 3) + 32;
    this.origin = { x: this.pos.x, y: this.pos.y };
    this.cntrOffset = math.random() * 30 | 0;
    this.moveDown = true;
}

BetaEnemy.prototype = Object.create(Enemy.prototype);

//
// 状態更新
//
BetaEnemy.prototype.onUpdate = function() {
    var imageAsset = game.assets["betaEnemy"];
    if (this.moveDown) {
        this.origin.y += 8;
        if (this.pos.y >= this.dropPointY) {
            this.moveDown = false;
        }
    }
    var cntr = this.cntr + this.cntrOffset;
    this.pos.x = this.origin.x + Math.sin(cntr / 45 * Math.PI) * 80;
    this.pos.y = this.origin.y + Math.sin(cntr / 20 * Math.PI) * 24;

    if (this.cntr % 3 === 0 && math.random() < 0.1) {
        var b = new Bullet(
            EntityType.ENEMY_BULLET,
            [ EntityType.PLAYER ],
            { x: this.pos.x + imageAsset.width / 2, y: this.pos.y + imageAsset.height },
            { x: 0, y: +8 },
            2,
            false,
            game.assets["ball"]
        );
        Global.gameCore.entities.push(b);
    }

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.modified();

    this.cntr++;

    return true;
}

module.exports = BetaEnemy;
