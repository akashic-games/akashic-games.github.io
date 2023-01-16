Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOverLogo = void 0;
const Global_1 = require("./Global");
const math = require("./Math");
class GameOverLogo {
    constructor() {
        this.cntr = 0;
        this.span = g.game.fps;
        this.pulses = [];
        this.countDown = false;
        const gameOverImageAsset = Global_1.Global.gameCore.scene.asset.getImageById("gameover");
        this.spr = new g.E({
            scene: Global_1.Global.gameCore.scene,
            x: (g.game.width - gameOverImageAsset.width) / 2,
            y: (g.game.height - gameOverImageAsset.height) / 2,
        });
        for (let i = 0; i < gameOverImageAsset.height; i++) {
            const cell = new g.Sprite({
                scene: Global_1.Global.gameCore.scene,
                src: gameOverImageAsset,
                x: 0,
                y: i,
                width: gameOverImageAsset.width,
                height: 1,
                srcY: i
            });
            this.spr.append(cell);
        }
        this.update();
        Global_1.Global.gameCore.scene.append(this.spr);
    }
    /**
     * アニメーション逆再生
     */
    playBackwards() {
        this.countDown = true;
        this.cntr = this.span;
    }
    /**
      * グリッチ発生
     */
    glitch() {
        const pulse = {
            cntr: 0,
            life: Math.floor(2 + math.random() * 4),
            pos: Math.floor(Global_1.Global.gameCore.scene.asset.getImageById("gameover").height * math.random()),
            len: Math.floor(4 + math.random() * 16),
            amp: 10 + 70 * math.random(),
            mov: math.random() < 0.5 ? (math.random() < 0.5 ? 2 : -2) : 0
        };
        this.pulses.push(pulse);
    }
    /**
     * 状態更新
     */
    update() {
        if (this.cntr > this.span + g.game.fps * 1.5 && math.random() < 0.1) {
            this.glitch();
        }
        const children = this.spr.children;
        const t = Math.max(0, (this.span - this.cntr) / this.span);
        for (let i = 0; i < children.length; i++) {
            const cell = children[i];
            const th = Math.PI * 4 * i / children.length + Math.PI * t * 2;
            const amp = 90 * t;
            cell.x = amp * Math.sin(th);
            cell.opacity = Math.min(1, (1 - t) * 3);
            cell.modified();
        }
        for (let i = 0; i < this.pulses.length; i++) {
            const p = this.pulses[i];
            const t = p.cntr / p.life;
            for (let j = p.pos; j < Math.min(p.pos + p.len, children.length); j++) {
                if (j < 0)
                    continue;
                const s = (j - p.pos) / p.len;
                const th = Math.PI * 2 * s;
                const dx = Math.sin(th) * p.amp * Math.sin(Math.PI * t);
                const cell = children[j];
                cell.x += dx;
                cell.modified();
            }
            p.cntr++;
            p.pos += p.mov;
            if (p.cntr >= p.life) {
                this.pulses[i] = null;
            }
        }
        // shrink
        this.pulses = this.pulses.filter(function (p) {
            return !!p;
        });
        if (this.countDown) {
            this.cntr--;
            if (this.cntr < 0) {
                this.cntr = 0;
            }
        }
        else {
            this.cntr++;
        }
        return true;
    }
    /**
     * 破棄
     */
    destroy() {
        this.spr.destroy();
    }
}
exports.GameOverLogo = GameOverLogo;
