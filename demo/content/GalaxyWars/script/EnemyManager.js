Object.defineProperty(exports, "__esModule", { value: true });
exports.EnemyManager = void 0;
const Global_1 = require("./Global");
const math = require("./Math");
const EntityType_1 = require("./EntityType");
const AlphaEnemy_1 = require("./AlphaEnemy");
const BetaEnemy_1 = require("./BetaEnemy");
const GammaEnemy_1 = require("./GammaEnemy");
class EnemyManager {
    constructor() {
        this.cntr = 0;
    }
    /**
     * 敵総数カウント
     */
    countEnemy() {
        let count = 0;
        for (let i = 0; i < Global_1.Global.gameCore.entities.length; i++) {
            const e = Global_1.Global.gameCore.entities[i];
            if (e && e.type === EntityType_1.EntityType.ENEMY) {
                count++;
            }
        }
        return count;
    }
    /**
     * 状態更新
     */
    update() {
        if (this.cntr === g.game.fps * 3) { // tutorial 1
            for (let i = 0; i < 4; i++) {
                Global_1.Global.gameCore.entities.push(new BetaEnemy_1.BetaEnemy());
            }
        }
        else if (this.cntr === g.game.fps * 9) { // tutorial 2
            for (let i = 0; i < 4; i++) {
                Global_1.Global.gameCore.entities.push(new AlphaEnemy_1.AlphaEnemy());
            }
            Global_1.Global.gameCore.entities.push(new AlphaEnemy_1.AlphaEnemy());
        }
        else if (this.cntr === g.game.fps * 14) {
            Global_1.Global.gameCore.entities.push(new BetaEnemy_1.BetaEnemy());
            Global_1.Global.gameCore.entities.push(new AlphaEnemy_1.AlphaEnemy());
            Global_1.Global.gameCore.entities.push(new BetaEnemy_1.BetaEnemy());
            Global_1.Global.gameCore.entities.push(new AlphaEnemy_1.AlphaEnemy());
        }
        else if (this.cntr >= g.game.fps * 21) {
            const enemyCount = this.countEnemy();
            if (enemyCount < 2 || (enemyCount < 5 && math.random() < 0.5)) {
                const rnd = math.random();
                let enemy = null;
                if (rnd < 0.05) {
                    if (GammaEnemy_1.GammaEnemy.numInstance === 0 && rnd < 0.025) {
                        enemy = new GammaEnemy_1.GammaEnemy();
                    }
                    else {
                        enemy = new BetaEnemy_1.BetaEnemy();
                    }
                }
                else if (rnd < 0.1) {
                    enemy = new AlphaEnemy_1.AlphaEnemy();
                }
                if (enemy) {
                    Global_1.Global.gameCore.entities.push(enemy);
                }
            }
        }
        this.cntr++;
        return true;
    }
    /**
     * 破棄
     */
    destroy() {
        // nothing to do
    }
}
exports.EnemyManager = EnemyManager;
