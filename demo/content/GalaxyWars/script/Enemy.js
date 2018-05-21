var Global = require("Global");
var math = require("Math");
var EntityType = require("EntityType");
var ItemType = require("ItemType");
var Item = require("Item");

var game = g.game;

//
// Enemyコンストラクタ
//
function Enemy(pos, hp, point, itemTypes, spr) {
    this.type = EntityType.ENEMY;
    this.cntr = 0;
    this.pos = {
        x: pos.x,
        y: pos.y
    };
    this.obstacles = [
        EntityType.PLAYER
    ];
    this.hp = hp;
    this.point = point;
    this.itemTypes = itemTypes;
    this.spr = spr;
    Global.gameCore.gameLayer.append(this.spr);
}

Enemy.prototype.onUpdate = function() {
    return true;
}

Enemy.prototype.onDied = function() {
    if (! this.itemTypes || this.itemTypes.length === 0) {
        return;
    }
    var itemType = this.itemTypes[Math.floor(math.random() * this.itemTypes.length)];
    var item = new Item(this.pos, itemType);
    Global.gameCore.entities.push(item);
}

Enemy.prototype.update = function() {
    if (this.hp <= 0) {
        this.onDied();
        return false;
    }
    var result = this.onUpdate(this);
    this.cntr++;
    return result;
}

Enemy.prototype.onCollision = function(e) {
    e.hp--;
}

Enemy.prototype.destroy = function() {
    this.spr.destroy();
}

module.exports = Enemy;
