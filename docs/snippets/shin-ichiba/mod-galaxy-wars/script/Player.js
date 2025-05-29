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
        this.speed = 5;
        this.shieldCntr = 0;
        this.score = 0;
        this.hp = 0;
        this.sp = 0;
        this.reset();
        this.obstacles = [
            EntityType_1.EntityType.ENEMY,
            EntityType_1.EntityType.ENEMY_BULLET,
            EntityType_1.EntityType.ITEM
        ];
        this.spr = new g.Sprite({
            scene: Global_1.Global.gameCore.scene,
            src: g.game.scene().asset.getImageById("player"),
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
                    if (this.hp < Player.MAX_HP)
                        this.hp++;
                    break;
                case ItemType_1.ItemType.CHARGE:
                    this.sp = Player.MAX_SP;
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
            // ダメージ処理に合わせて、ダメージ用SEを鳴らす
            g.game.scene().asset.getAudioById("damage").play();
        }
    }
    /**
     * Player初期化
     */
    reset() {
        this.type = EntityType_1.EntityType.PLAYER;
        const imgAsset = g.game.scene().asset.getImageById("player");
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
                imageAsset: g.game.scene().asset.getImageById("missle")
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
     * 必殺技実行メソッド
     */
    specialAttack() {
        if (this.sp < Player.MAX_SP) {
            return;
        }
        this.sp = 0;
        const imageAsset = g.game.scene().asset.getImageById("special");
        const speed = 10;
        const power = 10;
        const halfCount = 5;
        const angleInterval = 90 / halfCount;
        // 等間隔で放射状に大きめの弾を同時発射(直線上の弾は敢えて二重にして2倍の威力にしている)
        for (let i = -1; i < 2; i += 2) {
            for (let j = 0; j < halfCount; j++) {
                const angle = 90 + i * angleInterval * j;
                const radian = angle * (Math.PI / 180);
                Global_1.Global.gameCore.entities.push(new Bullet_1.Bullet({
                    type: EntityType_1.EntityType.PLAYER_BULLET,
                    obstacles: [EntityType_1.EntityType.ENEMY],
                    pos: { x: this.pos.x + this.spr.width / 2, y: this.pos.y },
                    vel: { x: speed * Math.cos(radian), y: -1 * speed * Math.sin(radian) },
                    hp: power,
                    homing: false,
                    imageAsset
                }));
            }
        }
        g.game.scene().asset.getAudioById("special_attack").play();
    }
    getSpeed() {
        return this.speed;
    }
    addSp(pt) {
        this.sp += pt;
        if (this.sp > Player.MAX_SP) {
            this.sp = Player.MAX_SP;
        }
    }
    /**
     *  Player破棄
     */
    destroy() {
        this.spr.destroy();
    }
}
exports.Player = Player;
Player.MAX_HP = 30; // プレイヤー最大HP 10->30に変更
Player.MAX_SP = 7;
