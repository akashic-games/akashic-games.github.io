Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Global_1 = require("./Global");
const EntityType_1 = require("./EntityType");
const ItemType_1 = require("./ItemType");
const Shield_1 = require("./Shield");
const Bullet_1 = require("./Bullet");
const emmitDamageEffect_1 = require("./emmitDamageEffect");
class Player {
    constructor() {
        this.homingCntr = 0;
        this.piercingCntr = 0;
        this.rapidFireCntr = 0;
        this.bulletSpeedCntr = 0;
        this.bulletCntr = 0;
        this.bulletInterval = 10;
        this.shieldCntr = 0;
        this.score = 0;
        this.hp = 0;
        this.reset();
        this.obstacles = [
            EntityType_1.EntityType.ENEMY,
            EntityType_1.EntityType.ENEMY_BULLET,
            EntityType_1.EntityType.ITEM
        ];
        this.spr = new g.Sprite({
            scene: Global_1.Global.gameCore.scene,
            src: g.game.scene().asset.getImage("/image/player.png"),
            x: this.pos.x,
            y: this.pos.y
        });
        Global_1.Global.gameCore.gameLayer.append(this.spr);
    }
    /**
     * 衝突イベントハンドラ
     */
    onCollision(e) {
        if (e.type === EntityType_1.EntityType.ITEM) {
            const se = g.game.asset.getAudio("/audio/SE_item");
            g.game.audio.play(se);

            e.hp = 0;
            const effectTime = g.game.fps * 10;
            let getter;
            switch (e.itemType) {
                case ItemType_1.ItemType.SHIELD:
                    if (this.shieldCntr <= 0) {
                        for (let i = 0; i < 8; i++) {
                            Global_1.Global.gameCore.entities.push(new Shield_1.Shield(i, 8));
                        }
                        getter = () => { return this.shieldCntr; };
                    }
                    this.shieldCntr = effectTime;
                    break;
                case ItemType_1.ItemType.HOMING:
                    if (this.homingCntr <= 0) {
                        getter = () => { return this.homingCntr; };
                    }
                    this.homingCntr = effectTime;
                    break;
                case ItemType_1.ItemType.PIERCING:
                    if (this.piercingCntr <= 0) {
                        getter = () => { return this.piercingCntr; };
                    }
                    this.piercingCntr = effectTime;
                    break;
                case ItemType_1.ItemType.RAPIDFIRE:
                    if (this.rapidFireCntr <= 0) {
                        getter = () => { return this.rapidFireCntr; };
                    }
                    this.rapidFireCntr = effectTime;
                    break;
                case ItemType_1.ItemType.BULLETSPEED:
                    if (this.bulletSpeedCntr <= 0) {
                        getter = () => { return this.bulletSpeedCntr; };
                    }
                    this.bulletSpeedCntr = effectTime;
                    break;
                case ItemType_1.ItemType.RECOVER:
                    if (this.hp <= Player.MAX_HP - 2)
                        this.hp = this.hp + 2;
                    else if (this.hp <= Player.MAX_HP - 1)
                        this.hp = this.hp + 1;
                    break;
                default:
            }
            if (getter) {
                Global_1.Global.gameCore.itemGaugeTray.addItem(e.itemType, effectTime, getter);
            }
            Global_1.Global.gameCore.itemGaugeTray.showItemName(e.itemType);
        }
        else {
            Global_1.Global.gameCore.vibrationCntr = 10;
            for (let i = 0; i < 3; i++) {
                (0, emmitDamageEffect_1.emmitDamageEffect)(this);
            }
        }
    }
    /**
     * Player初期化
     */
    reset() {
        this.type = EntityType_1.EntityType.PLAYER;
        const imgAsset = g.game.scene().asset.getImage("/image/player.png");
        this.pos = {
            x: (g.game.width - imgAsset.width) / 2,
            y: g.game.height - imgAsset.height * 2
        };
        this.hp = Player.MAX_HP;
        this.score = 0;
        this.bulletCntr = 0;
        this.bulletInterval = 10;
        this.shieldCntr = 0;
        this.homingCntr = 0;
        this.rapidFireCntr = 0;
        this.bulletSpeedCntr = 0;
        this.piercingCntr = 0;
    }
    /**
     * Player移動
     */
    move(dx, dy) {
        this.pos.x += dx;
        this.pos.y += dy;
        this.pos.x = Math.max(0, Math.min(g.game.width - this.spr.width, this.pos.x));
        this.pos.y = Math.max(0, Math.min(g.game.height - this.spr.height, this.pos.y));
    }
    /**
     * Player状態更新
     */
    update() {
        if (this.hp <= 0) {
            return false;
        }
        const bulletInterval = this.rapidFireCntr > 0 ? this.bulletInterval / 2 : this.bulletInterval;
        const bulletSpeed = this.bulletSpeedCntr > 0 ? 16 : 8;
        const bulletHP = this.piercingCntr > 0 ? 3 : 1;
        const bulletHoming = this.homingCntr > 0;
        if (this.bulletCntr % bulletInterval === 0) {
            const b = new Bullet_1.Bullet({
                type: EntityType_1.EntityType.PLAYER_BULLET,
                obstacles: [EntityType_1.EntityType.ENEMY],
                pos: { x: this.pos.x + this.spr.width / 2, y: this.pos.y },
                vel: { x: 0, y: -bulletSpeed },
                hp: bulletHP,
                homing: bulletHoming,
                imageAsset: g.game.scene().asset.getImage("/image/missle.png")
            });
            Global_1.Global.gameCore.entities.push(b);
        }
        this.spr.x = this.pos.x;
        this.spr.y = this.pos.y;
        this.spr.modified();
        this.bulletCntr++;
        if (this.shieldCntr > 0)
            this.shieldCntr--;
        if (this.homingCntr > 0)
            this.homingCntr--;
        if (this.rapidFireCntr > 0)
            this.rapidFireCntr--;
        if (this.bulletSpeedCntr > 0)
            this.bulletSpeedCntr--;
        if (this.piercingCntr > 0)
            this.piercingCntr--;
        return true;
    }
    /**
     *  Player破棄
     */
    destroy() {
        this.spr.destroy();
    }
}
exports.Player = Player;
Player.MAX_HP = 30; // プレイヤー最大HP
