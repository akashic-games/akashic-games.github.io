var Global = require("./Global");
var EntityType = require("./EntityType");

var game = g.game;

//
// シールドコンストラクタ
//
function Shield(idx, numFellow) {
    this.type = EntityType.OBSTACLE;
    this.obstacles = [ EntityType.ENEMY_BULLET ];
    this.pos = { x: 0, y: 0 };
    this.idx = idx;
    this.numFellow = numFellow;
    this.hp = 9999;
    this.cntr = 0;

    this.spr = new g.Sprite({
        scene: Global.gameCore.scene,
        src: game.assets["shield"]
    });
    Global.gameCore.gameLayer.append(this.spr);

    this.update();
}

//
// 状態更新
//
Shield.prototype.update = function() {
    if (Global.gameCore.player.shieldCntr <= 0) {
        return false;
    }

    var radius = 40;
    var th = this.cntr * 4 + Math.PI * 2 * (this.idx / this.numFellow);
    var cx = Global.gameCore.player.spr.x + Global.gameCore.player.spr.width / 2;
    var cy = Global.gameCore.player.spr.y + Global.gameCore.player.spr.height / 2;
    this.pos.x = cx + Math.cos(th) * radius - this.spr.width / 2;
    this.pos.y = cy + Math.sin(th) * radius - this.spr.height / 2;

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.modified();

    this.cntr++;

    return true;
}

//
// 衝突イベントハンドラ
//
Shield.prototype.onCollision = function(e) {
    e.hp--;
}

//
// 破棄
//
Shield.prototype.destroy = function() {
    this.spr.destroy();
}

module.exports = Shield;
