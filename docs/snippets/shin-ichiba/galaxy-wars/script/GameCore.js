Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCore = void 0;
const math = require("./Math");
const EntityType_1 = require("./EntityType");
const Player_1 = require("./Player");
const ItemGaugeTray_1 = require("./ItemGaugeTray");
const EnemyManager_1 = require("./EnemyManager");
const GammaEnemy_1 = require("./GammaEnemy");
const Background_1 = require("./Background");
const PlayerStatus_1 = require("./PlayerStatus");
const emmitDamageEffect_1 = require("./emmitDamageEffect");
class GameCore {
    constructor(scene) {
        this.scene = scene;
        this.cntr = 0;
        this.vibrationCntr = 0;
        this.entities = [];
        this.background = null;
        this.player = null;
        this.itemGaugeTray = null;
        this.playerStatus = null;
        this.enemyManager = null;
        this.hudLayer = new g.E({ scene: this.scene });
        this.backgroundLayer = new g.E({ scene: this.scene });
        this.gameLayer = new g.E({ scene: this.scene });
        this.scene.append(this.backgroundLayer);
        this.scene.append(this.gameLayer);
        this.scene.append(this.hudLayer);
        GammaEnemy_1.GammaEnemy.numInstance = 0;
    }
    /**
     * ゲーム開始
     */
    start() {
        this.background = new Background_1.Background();
        this.entities.push(this.background);
        this.itemGaugeTray = new ItemGaugeTray_1.ItemGaugeTray();
        this.entities.push(this.itemGaugeTray);
        this.player = new Player_1.Player();
        this.entities.push(this.player);
        this.playerStatus = new PlayerStatus_1.PlayerStatus();
        this.entities.push(this.playerStatus);
        this.enemyManager = new EnemyManager_1.EnemyManager();
        this.entities.push(this.enemyManager);
    }
    /**
     * 状態更新
     */
    update() {
        if (this.vibrationCntr >= 5) {
            this.gameLayer.x = math.random() * 32 / 2 - 16;
            this.gameLayer.y = math.random() * 32 / 2 - 16;
        }
        else {
            this.gameLayer.x = 0;
            this.gameLayer.y = 0;
        }
        this.gameLayer.modified();
        if (0 < this.vibrationCntr && this.vibrationCntr < 5) {
            // stop the world.
        }
        else {
            this.collisionDetection();
            if (this.cntr === GameCore.MAX_PLAYTIME * this.scene.game.fps && this.player.hp > 0) {
                this.player.hp = 0;
                for (let i = 0; i < 8; i++) {
                    (0, emmitDamageEffect_1.emmitDamageEffect)(this.player);
                }
            }
            this.updateEntities();
        }
        // shrink array
        this.entities = this.entities.filter(function (e) {
            return !!e;
        });
        if (this.vibrationCntr > 0) {
            this.vibrationCntr--;
        }
        this.cntr++;
    }
    /**
     * 自機から最も近い敵の探索
     */
    updateEntities() {
        const len = this.entities.length;
        for (let i = 0; i < len; i++) {
            const e = this.entities[i];
            if (!e) {
                continue;
            }
            if (!e.update()) {
                e.destroy();
                this.entities[i] = null;
            }
        }
    }
    /**
     * 自機から最も近い敵の探索
     */
    findEnemy() {
        let found = null;
        const len = this.entities.length;
        let nearest = Number.MAX_VALUE;
        for (let i = 0; i < len; i++) {
            const e = this.entities[i];
            if (!e || e.type != EntityType_1.EntityType.ENEMY) {
                continue;
            }
            const dx = e.pos.x - this.player.pos.x;
            const dy = e.pos.y - this.player.pos.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < nearest) {
                nearest = d2;
                found = e;
            }
        }
        return found;
    }
    /**
     * 衝突判定
     */
    collisionDetection() {
        const len = this.entities.length;
        for (let i = 0; i < len; i++) {
            const entity = this.entities[i];
            if (!entity || !entity.spr || !entity.obstacles || !entity.onCollision) {
                continue;
            }
            this.intersect(entity);
        }
    }
    /**
     * 衝突判定（内部処理）
     */
    intersect(collider) {
        const len = this.entities.length;
        for (let i = 0; i < len; i++) {
            const e = this.entities[i];
            if (!e || e === collider || !e.spr || collider.obstacles.indexOf(e.type) === -1) {
                continue;
            }
            if (math.intersectArea(collider.spr, e.spr)) {
                collider.onCollision(e);
            }
        }
    }
}
exports.GameCore = GameCore;
// 最大プレイ時間
GameCore.MAX_PLAYTIME = 60; // in sec
