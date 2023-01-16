Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const Global_1 = require("./Global");
const EntityType_1 = require("./EntityType");
class Particle {
    constructor(params) {
        this.type = EntityType_1.EntityType.EFFECT;
        this.cntr = 0;
        this.pos = { x: params.pos.x, y: params.pos.y };
        this.vel = params.vel ? { x: params.vel.x, y: params.vel.y } : { x: 0, y: 0 };
        this.drag = params.drag || 0;
        this.grav = params.grav || 0;
        this.life = params.life;
        this.onUpdate = params.onUpdate;
        if (params.asset) {
            this.spr = new g.Sprite({
                scene: Global_1.Global.gameCore.scene,
                src: params.asset,
                x: this.pos.x,
                y: this.pos.y,
                width: params.width || params.asset.width,
                height: params.height || params.asset.height,
                srcX: params.srcX || 0,
                srcY: params.srcY || 0
            });
        }
        else {
            this.spr = new g.FilledRect({
                scene: Global_1.Global.gameCore.scene,
                cssColor: params.cssColor,
                width: params.width,
                height: params.height,
                x: this.pos.x,
                y: this.pos.y
            });
        }
        this.spr.compositeOperation = "lighter";
        Global_1.Global.gameCore.gameLayer.append(this.spr);
    }
    update() {
        if (this.cntr === this.life) {
            return false;
        }
        const dt = 1 / g.game.fps;
        const a = {
            x: -this.vel.x * this.drag,
            y: -this.vel.y * this.drag + this.grav
        };
        this.vel.x += a.x * dt;
        this.vel.y += a.y * dt;
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
        if (this.onUpdate) {
            this.onUpdate(this);
        }
        this.spr.x = this.pos.x;
        this.spr.y = this.pos.y;
        this.spr.modified();
        this.cntr++;
        return true;
    }
    destroy() {
        this.spr.destroy();
    }
}
exports.Particle = Particle;
