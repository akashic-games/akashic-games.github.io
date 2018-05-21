var Global = require("Global");
var math = require("Math");
var EntityType = require("EntityType");
var AlphaEnemy = require("AlphaEnemy");
var BetaEnemy = require("BetaEnemy");
var GammaEnemy = require("GammaEnemy");

var game = g.game;

//
// EnemyManagerコンストラクタ
//
function EnemyManager() {
    this.cntr = 0;
}

//
// 敵総数カウント
//
EnemyManager.prototype.countEnemy = function() {
    var count = 0;
    for (var i = 0; i < Global.gameCore.entities.length; i++) {
        var e = Global.gameCore.entities[i];
        if (e && e.type === EntityType.ENEMY) {
            count++;
        }
    }
    return count;
}

//
// 状態更新
//
EnemyManager.prototype.update = function() {
    if (this.cntr === game.fps * 3) { // tutorial 1
        for (var i = 0; i < 4; i++) {
            Global.gameCore.entities.push(new BetaEnemy());
        }
    } else if (this.cntr === game.fps * 18) { // tutorial 2
        for (var i = 0; i < 4; i++) {
            Global.gameCore.entities.push(new AlphaEnemy());
        }
    } else if (this.cntr === game.fps * 23) {
        Global.gameCore.entities.push(new BetaEnemy());
        Global.gameCore.entities.push(new AlphaEnemy());
        Global.gameCore.entities.push(new BetaEnemy());
        Global.gameCore.entities.push(new AlphaEnemy());
    } else if (this.cntr >= game.fps * 30) {
        var enemyCount = this.countEnemy();
        if (enemyCount < 2 || (enemyCount < 5 && math.random() < 0.5)) {
            var rnd = math.random();
            var enemy = null;
            if (rnd < 0.05) {
                if (GammaEnemy.numInstance === 0 && rnd < 0.025) {
                    enemy = new GammaEnemy();
                } else {
                    enemy = new BetaEnemy();
                }
            } else if (rnd < 0.1) {
                enemy = new AlphaEnemy();
            }
            if (enemy) {
                Global.gameCore.entities.push(enemy);
            }
        }
    }

    this.cntr++;

    return true;
}

//
// 破棄
//
EnemyManager.prototype.destroy = function() {
    // nothing to do
}

module.exports = EnemyManager;
