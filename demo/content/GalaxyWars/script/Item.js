var Global = require("Global");
var EntityType = require("EntityType");

var game = g.game;

//
// アイテムコンストラクタ
//
function Item(pos, itemType) {
    this.type = EntityType.ITEM;
    this.itemType = itemType;
    this.originX = pos.x;
    this.pos = { x: pos.x, y: pos.y };
    this.cntr = 0;
    this.hp = 1;
    this.spr = new g.Sprite({
        scene: Global.gameCore.scene,
        src: game.assets[Item.itemImageNames[itemType]],
        x: this.pos.x,
        y: this.pos.y
    });
    Global.gameCore.gameLayer.append(this.spr);
}

Item.itemImageNames = [
    "item01",
    "item02",
    "item03",
    "item04",
    "item05",
    "item06"
];

//
// アイテム状態更新
//
Item.prototype.update = function() {
    if (this.hp <= 0) {
        return false;
    }

    this.pos.x = this.originX + Math.sin(Math.PI * this.cntr / 18) * 48;
    this.pos.y += 3;
    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.spr.modified();

    this.cntr++;

    return true;
}

//
// 破棄
//
Item.prototype.destroy = function() {
    this.spr.destroy();
}

module.exports = Item;
