Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemGaugeTray = void 0;
const Global_1 = require("./Global");
const EntityType_1 = require("./EntityType");
const Item_1 = require("./Item");
const ITEMGAUGE_BAR_HEIGHT = 4;
const itemNames = [
    "SHIELD",
    "HOMING",
    "RAPIDFIRE",
    "BULLETSPEED",
    "PIERCING",
    "RECOVER",
    "ENERGYCHARGE"
];
class ItemGauge {
    constructor(params) {
        this.pos = { x: params.pos.x, y: params.pos.y };
        this.type = EntityType_1.EntityType.EFFECT;
        this.itemType = params.itemType;
        this.max = params.max;
        this.getter = params.getter;
        this.tray = params.tray;
        const itemGaugeImageAsset = g.game.scene().asset.getImageById(Item_1.Item.itemImageNames[params.itemType]);
        this.spr = new g.Sprite({
            scene: Global_1.Global.gameCore.scene,
            src: itemGaugeImageAsset,
            x: params.pos.x,
            y: params.pos.y
        });
        Global_1.Global.gameCore.hudLayer.append(this.spr);
        this.bar = new g.FilledRect({
            scene: Global_1.Global.gameCore.scene,
            cssColor: "#FFB0B0",
            width: itemGaugeImageAsset.width,
            height: ITEMGAUGE_BAR_HEIGHT,
            x: 0,
            y: itemGaugeImageAsset.height + 2
        });
        this.spr.append(this.bar);
    }
    /**
     * 状態更新
     */
    update() {
        const ratio = this.getter() / this.max;
        if (ratio <= 0) {
            return false;
        }
        this.bar.width = 16 * ratio;
        this.bar.modified();
        return true;
    }
    /**
     * 破棄
     */
    destroy() {
        if (this.tray) {
            this.tray.remove(this);
        }
        this.spr.destroy();
    }
}
class ItemGaugeTray {
    constructor() {
        this.cntr = 0;
        this.gauges = [];
        this.spr = new g.Label({
            scene: Global_1.Global.gameCore.scene,
            text: "",
            font: Global_1.Global.bmpFont,
            fontSize: 16,
            x: 4, y: g.game.height - (g.game.scene().asset.getImageById("item01").height + ITEMGAUGE_BAR_HEIGHT + 20)
        });
        Global_1.Global.gameCore.hudLayer.append(this.spr);
    }
    /**
     * アイテム追加
     */
    addItem(itemType, max, getter) {
        const gauge = new ItemGauge({
            pos: {
                x: g.game.width,
                y: g.game.height - (g.game.scene().asset.getImageById("item01").height + ITEMGAUGE_BAR_HEIGHT + 4)
            },
            itemType,
            max,
            getter,
            tray: this
        });
        Global_1.Global.gameCore.entities.push(gauge);
        this.gauges.push(gauge);
    }
    /**
     * アイテム追加
     */
    showItemName(itemType) {
        this.spr.text = itemNames[itemType];
        this.spr.invalidate();
        this.cntr = 0;
    }
    /**
     * 状態更新
     */
    update() {
        const padding = 4;
        let x = padding;
        for (let i = 0; i < this.gauges.length; i++) {
            const g = this.gauges[i];
            if (g.spr.x > x) {
                const diff = (g.spr.x - x) * 0.85;
                g.spr.x = x + (diff > 1 ? diff : 0);
                g.spr.modified();
            }
            x += g.spr.width + padding;
        }
        if (this.cntr >= 90) {
            this.spr.text = "";
            this.spr.invalidate();
        }
        this.cntr++;
        return true;
    }
    /**
     * アイテムゲージ削除
     */
    remove(gauge) {
        const index = this.gauges.indexOf(gauge);
        if (index !== -1) {
            this.gauges.splice(index, 1);
        }
    }
    /**
     * 破棄
     */
    destroy() {
        // nothing to do.
    }
}
exports.ItemGaugeTray = ItemGaugeTray;
