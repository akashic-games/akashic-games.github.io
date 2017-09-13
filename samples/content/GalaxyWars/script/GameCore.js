var Global = require("Global");
var math = require("Math");
var EntityType = require("EntityType");
var Player = require("Player");
var ItemGaugeTray = require("ItemGaugeTray");
var EnemyManager = require("EnemyManager");
var GammaEnemy = require("GammaEnemy");
var Background = require("Background");
var PlayerStatus = require("PlayerStatus");

//
// GameCoreコンストラクタ
//
function GameCore(scene) {
    this.scene = scene;
    this.cntr = 0;
    this.vibrationCntr = 0;
    this.entities = [];

    this.background = null;
    this.player = null;
    this.itemGaugeTray = null;
    this.playerStatus = null;
    this.enemyManager = null;

    this.hudLayer = new g.E({scene: this.scene});
    this.backgroundLayer = new g.E({scene: this.scene});
    this.gameLayer = new g.E({scene: this.scene});
    this.scene.append(this.backgroundLayer);
    this.scene.append(this.gameLayer);
    this.scene.append(this.hudLayer);

    GammaEnemy.numInstance = 0;
}

//
// ゲーム開始
//
GameCore.prototype.start = function() {
    this.background = new Background();
    this.entities.push(this.background);
    this.itemGaugeTray = new ItemGaugeTray();
    this.entities.push(this.itemGaugeTray);
    this.player = new Player();
    this.entities.push(this.player);
    this.playerStatus = new PlayerStatus();
    this.entities.push(this.playerStatus);
    this.enemyManager = new EnemyManager();
    this.entities.push(this.enemyManager);
}

//
// 状態更新
//
GameCore.prototype.update = function() {
    if (this.vibrationCntr >= 5) {
        this.gameLayer.x = math.random() * 32 / 2 - 16;
        this.gameLayer.y = math.random() * 32 / 2 - 16;
    } else {
        this.gameLayer.x = 0;
        this.gameLayer.y = 0;
    }
    this.gameLayer.modified();

    if (0 < this.vibrationCntr && this.vibrationCntr < 5) {
        // stop the world.
    } else {
        this.collisionDetection();
        this.updateEntities();
    }

    // shrink array
    this.entities = this.entities.filter(function(e) {
        return !!e;
    });

    if (this.vibrationCntr > 0) {
        this.vibrationCntr--;
    }

    this.cntr++;
}

//
// すべての敵の状態更新
//
GameCore.prototype.updateEntities = function() {
    var len = this.entities.length;
    for (var i = 0; i < len; i++) {
        var e = this.entities[i]
        if (! e) {
            continue;
        }
        if (! e.update()) {
            e.destroy();
            this.entities[i] = null;
        }
    }
};

//
// 自機から最も近い敵の探索
//
GameCore.prototype.findEnemy = function() {
    var found = null;
    var len = this.entities.length;
    var nearest = Number.MAX_VALUE;
    for (var i = 0; i < len; i++) {
        var e = this.entities[i]
        if (! e || e.type != EntityType.ENEMY) {
            continue;
        }
        var dx = e.pos.x - this.player.pos.x;
        var dy = e.pos.y - this.player.pos.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < nearest) {
            nearest = d2;
            found = e;
        }
    }

    return found;
};

//
// 衝突判定
//
GameCore.prototype.collisionDetection = function() {
    var len = this.entities.length;

    for (var i = 0; i < len; i++) {
        var entity = this.entities[i];
        if (!entity || !entity.spr || !entity.obstacles || !entity.onCollision) {
            continue;
        }
        this.intersect(entity);
    }
}

//
// 衝突判定（内部処理）
//
GameCore.prototype.intersect = function(collider) {
    var len = this.entities.length;
    for (var i = 0; i < len; i++) {
        var e = this.entities[i];
        if (!e || e === collider || !e.spr || collider.obstacles.indexOf(e.type) === -1) {
            continue;
        }
        if (math.intersectArea(collider.spr, e.spr)) {
            collider.onCollision(e);
        }
    }
}

module.exports = GameCore;
