Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const Global_1 = require("./Global");
const EntityType_1 = require("./EntityType");
class Item {
    constructor(pos, itemType) {
        this.type = EntityType_1.EntityType.ITEM;
        this.itemType = itemType;
        this.originX = pos.x;
        this.pos = { x: pos.x, y: pos.y };
        this.cntr = 0;
        this.hp = 1;
        this.spr = new g.Sprite({
            scene: Global_1.Global.gameCore.scene,
            src: g.game.scene().asset.getImage(Item.itemImagePaths[itemType]),
            x: this.pos.x,
            y: this.pos.y
        });
        Global_1.Global.gameCore.gameLayer.append(this.spr);
    }
    /**
      * 状態更新
      */
    update() {
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
    /**
      * 破棄
      */
    destroy() {
        this.spr.destroy();
    }
}
exports.Item = Item;
Item.itemImagePaths = [
    "/image/item01.png",
    "/image/item02.png",
    "/image/item03.png",
    "/image/item04.png",
    "/image/item05.png",
    "/image/item06.png"
];
