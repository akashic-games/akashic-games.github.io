Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Global_1 = require("./Global");
const math = require("./Math");
const EntityType_1 = require("./EntityType");
class Background {
    constructor() {
        this.type = EntityType_1.EntityType.EFFECT;
        this.cntr = 0;
        this.spr = new g.FilledRect({
            scene: Global_1.Global.gameCore.scene,
            cssColor: "#1E90FF",
            width: g.game.width,
            height: g.game.height,
            opacity: 0.7
        });
        Global_1.Global.gameCore.backgroundLayer.append(this.spr);
    }
    /**
     * 状態更新
     */
    update() {
        if (this.cntr <= 60) {
            const t = Math.min(1, this.cntr / 60);
            const R = Math.round(0x00 * t + 0x1E * (1 - t));
            const G = Math.round(0x00 * t + 0x90 * (1 - t));
            const B = Math.round(0x20 * t + 0xFF * (1 - t));
            this.spr.cssColor = "#" + ("000000" + ((R << 16) | (G << 8) | B).toString(16)).slice(-6);
            this.spr.modified();
        }
        if (this.cntr % 4 === 0 && math.random() < 0.5) {
            const front = math.random() < 0.25;
            const imageAsset = Global_1.Global.gameCore.scene.asset.getImage(front ? "/image/star01.png" : "/image/star02.png");
            const star = new g.Sprite({
                scene: Global_1.Global.gameCore.scene,
                src: imageAsset,
                x: math.random() * (g.game.width - imageAsset.width),
                y: -imageAsset.height
            });
            star.modified();
            star.onUpdate.add(() => {
                const t = Math.min(1, this.cntr / 60);
                let dy = front ? 8 : 4;
                dy += dy * 2.5 * (1 - t);
                star.y += dy;
                star.modified();
                if (star.y >= g.game.height) {
                    star.destroy();
                }
            });
            this.spr.append(star);
        }
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
exports.Background = Background;
