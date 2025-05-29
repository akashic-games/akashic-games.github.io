Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDestructionEnemy = void 0;
const Enemy_1 = require("./Enemy");
const ItemType_1 = require("./ItemType");
const Global_1 = require("./Global");
const math = require("./Math");
/**
 * 自機に特攻してくる敵
 */
class SelfDestructionEnemy extends Enemy_1.Enemy {
    constructor() {
        const imageAsset = Global_1.Global.gameCore.scene.asset.getImageById("selfDestructionEnemy");
        const x = math.random() * (g.game.width - imageAsset.width);
        const y = -20;
        const itemTypes = [
            ItemType_1.ItemType.CHARGE
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
    }
    /**
     * 状態更新
     */
    onUpdate() {
        const speed = 7;
        const target = Global_1.Global.gameCore.player.pos;
        const x = target.x - this.pos.x;
        const y = target.y - this.pos.y;
        const radian = Math.atan2(y, x);
        const dx = speed * Math.cos(radian);
        const dy = speed * Math.sin(radian);
        this.pos.x += dx;
        this.pos.y += dy;
        this.spr.x = this.pos.x;
        this.spr.y = this.pos.y;
        this.spr.modified();
        // 撃破されなければ7秒間は生存する
        return this.cntr < g.game.fps * 7;
    }
    onDied() {
        super.onDied();
        // 撃破SEを鳴らす
        g.game.scene().asset.getAudioById("enemy_burst").play();
    }
}
exports.SelfDestructionEnemy = SelfDestructionEnemy;
