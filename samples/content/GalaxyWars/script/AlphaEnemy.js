var Global = require("Global");
var math = require("Math");
var EntityType = require("EntityType");
var ItemType = require("ItemType");
var Bullet = require("Bullet");
var Enemy = require("Enemy");

var game = g.game;

//
// AlphaEnemyコンストラクタ
//
function AlphaEnemy() {
    var imageAsset = game.assets["alphaEnemy"];
    var pos = {
        x: math.random() * (game.width - imageAsset.width),
        y: math.random() * -32 - 32
    };
    var itemTypes = [
        ItemType.RECOVER
    ];
    Enemy.call(this, pos, 4, 20, itemTypes, new g.Sprite({
        scene: Global.gameCore.scene,
        src: imageAsset,
        x: pos.x,
        y: pos.y
    }));
    this.targetPosition = null;
}

AlphaEnemy.prototype = Object.create(Enemy.prototype);

//
// 状態更新
//
AlphaEnemy.prototype.onUpdate = function() {
    if (this.cntr < game.fps) {
        this.pos.y += 4;
    } else if (this.cntr < game.fps * 3) {
        if (this.cntr === game.fps) {
            this.targetPosition = { x: Global.gameCore.player.pos.x, y: Global.gameCore.player.pos.y };
        }
        if (this.cntr % 3 === 0) {
            this.fire(this.targetPosition);
        }
    } else {
        this.pos.y += 8;
    }

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.modified();

    return this.pos.y < game.height;
}

//
// 通常弾射出
//
AlphaEnemy.prototype.fire = function(targetPosition) {
    var imageAsset = game.assets["alphaEnemy"];
    var dx = targetPosition.x - this.pos.x;
    var dy = targetPosition.y - this.pos.y;
    var len = Math.sqrt(dx * dx + dy * dy);

    if (len > 0) {
        dx /= len;
        dy /= len;
        var b = new Bullet(
            EntityType.ENEMY_BULLET,
            [ EntityType.PLAYER ],
            { x: this.pos.x + imageAsset.width / 2, y: this.pos.y + imageAsset.height },
            { x: dx * 8, y: dy * 8 },
            2,
            false,
            game.assets["ball"]
        );
        Global.gameCore.entities.push(b);
    }
}

module.exports = AlphaEnemy;
