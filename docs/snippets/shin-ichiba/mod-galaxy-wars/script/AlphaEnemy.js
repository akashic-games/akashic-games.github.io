Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaEnemy = void 0;
const Global_1 = require("./Global");
const math = require("./Math");
const EntityType_1 = require("./EntityType");
const ItemType_1 = require("./ItemType");
const Bullet_1 = require("./Bullet");
const Enemy_1 = require("./Enemy");
class AlphaEnemy extends Enemy_1.Enemy {
    constructor() {
        const imageAsset = Global_1.Global.gameCore.scene.asset.getImageById("alphaEnemy");
        const pos = {
            x: math.random() * (g.game.width - imageAsset.width),
            y: math.random() * -32 - 32
        };
        const itemType = [
            ItemType_1.ItemType.RECOVER
        ];
        super({
            pos: pos,
            hp: 4,
            point: 20,
            itemType: itemType,
            spr: new g.Sprite({
                scene: Global_1.Global.gameCore.scene,
                src: imageAsset,
                x: pos.x,
                y: pos.y
            })
        });
        this.targetPosition = null;
    }
    /**
     * 状態更新
     */
    onUpdate() {
        if (this.cntr < g.game.fps) {
            this.pos.y += 4;
        }
        else if (this.cntr < g.game.fps * 3) {
            if (this.cntr === g.game.fps) {
                this.targetPosition = { x: Global_1.Global.gameCore.player.pos.x, y: Global_1.Global.gameCore.player.pos.y };
            }
            if (this.cntr % 3 === 0) {
                this.fire(this.targetPosition);
            }
        }
        else {
            this.pos.y += 8;
        }
        this.spr.x = this.pos.x;
        this.spr.y = this.pos.y;
        this.spr.modified();
        return this.pos.y < g.game.height;
    }
    /**
     * 通常弾射出
     */
    fire(targetPosition) {
        const imageAsset = Global_1.Global.gameCore.scene.asset.getImageById("alphaEnemy");
        let dx = targetPosition.x - this.pos.x;
        let dy = targetPosition.y - this.pos.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0) {
            dx /= len;
            dy /= len;
            const b = new Bullet_1.Bullet({
                type: EntityType_1.EntityType.ENEMY_BULLET,
                obstacles: [EntityType_1.EntityType.PLAYER],
                pos: { x: this.pos.x + imageAsset.width / 2, y: this.pos.y + imageAsset.height },
                vel: { x: dx * 8, y: dy * 8 },
                hp: 2,
                homing: false,
                imageAsset: Global_1.Global.gameCore.scene.asset.getImageById("ball")
            });
            Global_1.Global.gameCore.entities.push(b);
        }
    }
    onDied() {
        super.onDied();
        // 撃破SEを鳴らす
        g.game.scene().asset.getAudioById("enemy_burst").play();
    }
}
exports.AlphaEnemy = AlphaEnemy;
