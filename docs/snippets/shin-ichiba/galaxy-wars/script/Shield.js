Object.defineProperty(exports, "__esModule", { value: true });
exports.Shield = void 0;
const Global_1 = require("./Global");
const EntityType_1 = require("./EntityType");
class Shield {
    constructor(idx, numFellow) {
        this.type = EntityType_1.EntityType.OBSTACLE;
        this.obstacles = [EntityType_1.EntityType.ENEMY_BULLET];
        this.pos = { x: 0, y: 0 };
        this.idx = idx;
        this.numFellow = numFellow;
        this.hp = 9999;
        this.cntr = 0;
        this.spr = new g.Sprite({
            scene: Global_1.Global.gameCore.scene,
            src: g.game.scene().asset.getImage("/image/shield.png")
        });
        Global_1.Global.gameCore.gameLayer.append(this.spr);
        this.update();
    }
    /**
     * 状態更新
     */
    update() {
        if (Global_1.Global.gameCore.player.shieldCntr <= 0) {
            return false;
        }
        const radius = 40;
        const th = this.cntr * 4 + Math.PI * 2 * (this.idx / this.numFellow);
        const cx = Global_1.Global.gameCore.player.spr.x + Global_1.Global.gameCore.player.spr.width / 2;
        const cy = Global_1.Global.gameCore.player.spr.y + Global_1.Global.gameCore.player.spr.height / 2;
        this.pos.x = cx + Math.cos(th) * radius - this.spr.width / 2;
        this.pos.y = cy + Math.sin(th) * radius - this.spr.height / 2;
        this.spr.x = this.pos.x;
        this.spr.y = this.pos.y;
        this.spr.modified();
        this.cntr++;
        return true;
    }
    /**
     * 衝突イベントハンドラ
     */
    onCollision(e) {
        e.hp--;
    }
    /**
     * 破棄
     */
    destroy() {
        this.spr.destroy();
    }
}
exports.Shield = Shield;
