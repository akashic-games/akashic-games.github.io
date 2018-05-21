var Global = require("Global");
var EntityType = require("EntityType");
var Item = require("Item");

var game = g.game;

var ITEMGAUGE_BAR_HEIGHT = 4;

var itemNames = [
    "SHIELD",
    "HOMING",
    "RAPIDFIRE",
    "BULLETSPEED",
    "PIERCING",
    "RECOVER"
];

//
// ItemGaugeコンストラクタ
//
function ItemGauge(pos, itemType, max, getter, tray) {
    this.pos = { x: pos.x, y: pos.y };
    this.type = EntityType.EFFECT;
    this.itemType = itemType;
    this.max = max;
    this.getter = getter;
    this.tray = tray;

    var itemGaugeImageAsset = game.assets[Item.itemImageNames[itemType]];
    this.spr = new g.Sprite({
        scene: Global.gameCore.scene,
        src: itemGaugeImageAsset,
        x: pos.x,
        y: pos.y
    });
    Global.gameCore.hudLayer.append(this.spr);
    this.bar = new g.FilledRect({
        scene: Global.gameCore.scene,
        cssColor: "#FFB0B0",
        width: itemGaugeImageAsset.width,
        height: ITEMGAUGE_BAR_HEIGHT,
        x: 0,
        y: itemGaugeImageAsset.height + 2
    });
    this.spr.append(this.bar);
}

//
// 状態更新
//
ItemGauge.prototype.update = function() {
    var ratio = this.getter() / this.max;
    if (ratio <= 0) {
        return false;
    }
    this.bar.width = 16 * ratio;
    this.bar.modified();
    return true;
}

//
// 破棄
//
ItemGauge.prototype.destroy = function() {
    if (this.tray) {
        this.tray.remove(this);
    }
    this.spr.destroy();
}

//
// ItemGaugeTrayコンストラクタ
//
function ItemGaugeTray() {
    this.cntr = 0;
    this.gauges = [];
    this.spr = new g.Label({
        scene: Global.gameCore.scene,
        text: "",
        font: Global.bmpFont,
        fontSize: 16,
        x: 4, y: game.height - (game.assets["item01"].height + ITEMGAUGE_BAR_HEIGHT + 20)
    });
    Global.gameCore.hudLayer.append(this.spr);
}

//
// アイテム追加
//
ItemGaugeTray.prototype.addItem = function(itemType, max, getter) {
    var gauge = new ItemGauge({ x: game.width, y: game.height - (game.assets["item01"].height + ITEMGAUGE_BAR_HEIGHT + 4)}, itemType, max, getter, this);
    Global.gameCore.entities.push(gauge);
    this.gauges.push(gauge);
}

//
// アイテム名表示
//
ItemGaugeTray.prototype.showItemName = function(itemType) {
    this.spr.text = itemNames[itemType];
    this.spr.invalidate();
    this.cntr = 0;
}

//
// 状態更新
//
ItemGaugeTray.prototype.update = function() {
    var padding = 4;
    var x = padding;
    for (var i = 0; i < this.gauges.length; i++) {
        var g = this.gauges[i];
        if (g.spr.x > x) {
            var diff = (g.spr.x - x) * 0.85;
            g.spr.x = x + (diff > 1 ? diff : 0);
            g.spr.modified();
        }
        x += g.spr.width + padding;
    }

    if (this.cntr >= 90) {
        this.spr.text = "";
        this.spr.invalidate();
    };

    this.cntr++;

    return true;
}

//
// アイテムゲージ削除
//
ItemGaugeTray.prototype.remove = function(gauge) {
    var index = this.gauges.indexOf(gauge);
    if (index !== -1) {
        this.gauges.splice(index, 1);
    }
}

//
// 破棄
//
ItemGaugeTray.prototype.destroy = function() {
    // nothing to do.
}

module.exports = ItemGaugeTray;
