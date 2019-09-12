"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * asapj関連の静的情報
 */
var AsaInfo = /** @class */ (function () {
    function AsaInfo() {
    }
    /** 現場のかた */
    // tslint:disable-next-line:typedef
    AsaInfo.workman = {
        pj: "pj_stg_player",
        anim: {
            tutorial: "tutorial_tutorial",
            gondola: "gondola_updown",
            hand: "hand_default",
            attack: "hand_attack"
        }
    };
    /** 弾 */
    // tslint:disable-next-line:typedef
    AsaInfo.bullet = {
        pj: "pj_stg_weapon",
        anim: {
            weapon01: "weaponi01_hit",
            weapon02: "weaponi02_hit",
            weapon03: "weaponi03_hit",
            weapon04: "weaponi04_hit"
        },
        w01: 29,
        h01: 18,
        w02: 43,
        h02: 15,
        w03: 44,
        h03: 44,
        w04: 44,
        h04: 44
    };
    /** アイテム */
    // tslint:disable-next-line:typedef
    AsaInfo.item = {
        pj: "pj_stg_item",
        anim: {
            driverIn: "driver_in",
            driverGet: "driver_get",
            driverStay: "driver_stay",
            driverLost: "driver_lost",
            spannerIn: "spanner_in",
            spannerGet: "spanner_get",
            spannerStay: "spanner_stay",
            spannerLost: "spanner_lost",
            hammerIn: "hammer_in",
            hammerGet: "hammer_get",
            hammerStay: "hammer_stay",
            hammerLost: "hammer_lost"
        },
        w: 52,
        h: 52 // stay大きさ
    };
    /** 泥棒 */
    // tslint:disable-next-line:typedef
    AsaInfo.thief = {
        pj: "pj_stg_enemy",
        anim: {
            shortWalk1: "mini_walk1",
            shortDown1: "mini_down1",
            shortIn1: "mini_in1",
            tallWalk1: "speed_walk1",
            tallDown1: "speed_down1",
            tallIn1: "speed_in1",
            grandeWalk1: "guard_walk1",
            grandeWalk2: "guard_walk2",
            grandeDown1: "guard_down1",
            grandeDown2: "guard_down2",
            grandeIn1: "guard_in1"
        }
    };
    /** ドア */
    // tslint:disable-next-line:typedef
    AsaInfo.door = {
        pj: "pj_stg_door",
        anim: {
            main: "door_door"
        }
    };
    /** 血しぶき */
    // tslint:disable-next-line:typedef
    AsaInfo.effect = {
        pj: "pj_stg_ef",
        anim: {
            main: "damage_hit"
        }
    };
    /** スコアポップポイント */
    // tslint:disable-next-line:typedef
    AsaInfo.scorePopPoint = {
        pj: "pj_stg_point",
        anim: {
            plus: "plus_point",
            minus: "minus_point"
        }
    };
    /** コンボ */
    // tslint:disable-next-line:typedef
    AsaInfo.combo = {
        pj: "pj_stg_combo",
        anim: {
            combo: "combo_combo"
        }
    };
    return AsaInfo;
}());
exports.AsaInfo = AsaInfo;
