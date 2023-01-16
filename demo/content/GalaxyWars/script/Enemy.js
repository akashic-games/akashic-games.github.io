Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const Global_1 = require("./Global");
const math = require("./Math");
const EntityType_1 = require("./EntityType");
const Item_1 = require("./Item");
class Enemy {
    constructor(params) {
        this.type = EntityType_1.EntityType.ENEMY;
        this.cntr = 0;
        this.pos = {
            x: params.pos.x,
            y: params.pos.y
        };
        this.obstacles = [
            EntityType_1.EntityType.PLAYER
        ];
        this.hp = params.hp;
        this.point = params.point;
        this.itemTypes = params.itemType;
        this.spr = params.spr;
        Global_1.Global.gameCore.gameLayer.append(this.spr);
    }
    onUpdate() {
        return true;
    }
    onDied() {
        if (!this.itemTypes || this.itemTypes.length === 0) {
            return;
        }
        const itemType = this.itemTypes[Math.floor(math.random() * this.itemTypes.length)];
        const item = new Item_1.Item(this.pos, itemType);
        Global_1.Global.gameCore.entities.push(item);
    }
    update() {
        if (this.hp <= 0) {
            this.onDied();
            return false;
        }
        const result = this.onUpdate();
        this.cntr++;
        return result;
    }
    onCollision(e) {
        e.hp--;
    }
    destroy() {
        this.spr.destroy();
    }
}
exports.Enemy = Enemy;
