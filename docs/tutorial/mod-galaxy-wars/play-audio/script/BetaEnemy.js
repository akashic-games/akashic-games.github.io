Object.defineProperty(exports, "__esModule", { value: true });
exports.BetaEnemy = void 0;
const Global_1 = require("./Global");
const math = require("./Math");
const EntityType_1 = require("./EntityType");
const ItemType_1 = require("./ItemType");
const Bullet_1 = require("./Bullet");
const Enemy_1 = require("./Enemy");
class BetaEnemy extends Enemy_1.Enemy {
    constructor() {
        const imageAsset = Global_1.Global.gameCore.scene.asset.getImage("/image/betaEnemy.png");
        const x = math.random() * (g.game.width - imageAsset.width);
        const y = -40;
        const itemTypes = [
            ItemType_1.ItemType.SHIELD,
            ItemType_1.ItemType.HOMING,
            ItemType_1.ItemType.RAPIDFIRE,
            ItemType_1.ItemType.BULLETSPEED,
            ItemType_1.ItemType.PIERCING,
        ];
        super({
            pos: { x: x, y: y },
            hp: 1,
            point: 10,
            itemType: itemTypes,
            spr: new g.Sprite({
                scene: Global_1.Global.gameCore.scene,
                src: imageAsset,
                x: x,
                y: y
            })
        });
        this.dropPointY = math.random() * (g.game.height / 3) + 32;
        this.origin = { x: this.pos.x, y: this.pos.y };
        this.cntrOffset = math.random() * 30 | 0;
        this.moveDown = true;
    }
    /**
     * 状態更新
     */
    onUpdate() {
        const imageAsset = Global_1.Global.gameCore.scene.asset.getImage("/image/betaEnemy.png");
        if (this.moveDown) {
            this.origin.y += 8;
            if (this.pos.y >= this.dropPointY) {
                this.moveDown = false;
            }
        }
        const cntr = this.cntr + this.cntrOffset;
        this.pos.x = this.origin.x + Math.sin(cntr / 45 * Math.PI) * 80;
        this.pos.y = this.origin.y + Math.sin(cntr / 20 * Math.PI) * 24;
        if (this.cntr % 3 === 0 && math.random() < 0.1) {
            const b = new Bullet_1.Bullet({
                type: EntityType_1.EntityType.ENEMY_BULLET,
                obstacles: [EntityType_1.EntityType.PLAYER],
                pos: { x: this.pos.x + imageAsset.width / 2, y: this.pos.y + imageAsset.height },
                vel: { x: 0, y: +8 },
                hp: 2,
                homing: false,
                imageAsset: Global_1.Global.gameCore.scene.asset.getImage("/image/ball.png")
            });
            Global_1.Global.gameCore.entities.push(b);
        }
        this.spr.x = this.pos.x;
        this.spr.y = this.pos.y;
        this.spr.modified();
        this.cntr++;
        return true;
    }
}
exports.BetaEnemy = BetaEnemy;
