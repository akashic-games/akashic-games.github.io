"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asaInfo_1 = require("./asaInfo");
/**
 * ゲーム関連の静的情報
 */
var define;
(function (define) {
    /** 制限時間[秒] */
    define.GAME_TIME = 60;
    /** このゲームが許容する最長の制限時間[秒] */
    define.GAME_TIME_MAX = 99;
    /** 残り時間警告が始まる残り時間[秒]（この時間未満になった時に始まる） */
    define.CAUTION_TIME_CONDITION = 6;
    /** 横解像度を480から640に変更した際のX座標オフセット値 */
    define.OFFSET_X = (640 - 480) / 2;
    /** タイマー数字の桁数 */
    define.GAME_TIMER_DIGIT = 2;
    /** タイマー数字のX座標 */
    define.GAME_TIMER_X = 62 + define.OFFSET_X;
    /** タイマー数字のY座標 */
    define.GAME_TIMER_Y = 5;
    /** UIアイコン（時計）のX座標 */
    define.ICON_T_X = 1 + define.OFFSET_X;
    /** UIアイコン（時計）のY座標 */
    define.ICON_T_Y = 1;
    /** ポイント用の数字の桁数 */
    define.GAME_SCORE_DIGIT = 5;
    /** ポイント用の数字のX座標 */
    define.GAME_SCORE_X = 426 + define.OFFSET_X;
    /** ポイント用の数字のY座標 */
    define.GAME_SCORE_Y = 5;
    /** UIアイコン（pt）のX座標 */
    define.ICON_PT_X = 451 + define.OFFSET_X;
    /** UIアイコン（pt）のY座標 */
    define.ICON_PT_Y = 5;
    /** ステージ背景配置位置 */
    define.POS_STAGE_BG = { x: -6, y: -6 };
    /** ステージ配置位置 */
    define.POS_STAGE = { x: 66 + define.OFFSET_X, y: 14 };
    /** ステージ右端ビル配置位置 */
    define.POS_STAGE_SIDE = { x: 555, y: -30 };
    /** 最上段ドア左上 */
    define.POS_DOOR = { x: 120 + define.OFFSET_X, y: 77 };
    /** ドア幅 */
    define.DOOR_WIDTH = 54;
    /** 各階高さ */
    define.FLOOR_HEIGHT = 100;
    /** 攻撃中停止フレーム長～リロードタイム */
    define.ATTCK_STOP_TIME = 10;
    /** ワークマンアタッチポイント名ゴンドラ */
    define.WKMAN_ATTACH_POINT_GONDOLA = "gondola";
    /** ワークマンアタッチポイント名攻撃位置 */
    define.WKMAN_ATTACH_POINT_ATTACK = "attack_pivot";
    /** ワークマンアタッチ時の相対座標補正値 通常腕位置 */
    define.WKMAN_ATTACH_POS_NORMAL = { x: 38, y: 43 };
    /** ワークマンアタッチ時の相対座標補正値 攻撃腕位置 */
    define.WKMAN_ATTACH_POS_ATTACK = { x: 40, y: 45 };
    /** 弾レベル */
    var BulletLevel;
    (function (BulletLevel) {
        /** 釘 */
        BulletLevel[BulletLevel["nail"] = 1] = "nail";
        /** ドライバー */
        BulletLevel[BulletLevel["screwDriver"] = 2] = "screwDriver";
        /** スパナ */
        BulletLevel[BulletLevel["spanner"] = 3] = "spanner";
        /** ハンマー */
        BulletLevel[BulletLevel["hammer"] = 4] = "hammer";
    })(BulletLevel = define.BulletLevel || (define.BulletLevel = {}));
    /** 弾速 */
    define.BULLET_MOVE_X = 15;
    /** 1投でのMAXコンボ */
    define.MAX_COMBO = 4;
    /** アイテム消失までのフレーム */
    define.ITEM_VANISH_LENGTH = 20;
    /** アイテム出現までの間隔（秒） */
    define.ITEM_POP_INTERVAL = 14;
    // export const ITEM_POP_INTERVAL: number = 1; // debug
    /** アイテム出現位置X 最小 */
    define.POS_ITEM_POP_X_MIN = 150 + define.OFFSET_X;
    /** アイテム出現位置X 最大 */
    define.POS_ITEM_POP_X_MAX = 430 + define.OFFSET_X;
    /** アイテム出現位置Yリスト */
    define.POS_ITEM_POP_LIST_Y = [
        134,
        234,
        334
    ];
    // 泥棒
    /** 泥棒種類 */
    var ThiefType;
    (function (ThiefType) {
        /** チビ */
        ThiefType[ThiefType["short"] = 0] = "short";
        /** ノッポ */
        ThiefType[ThiefType["tall"] = 1] = "tall";
        /** デブ */
        ThiefType[ThiefType["grande"] = 2] = "grande";
    })(ThiefType = define.ThiefType || (define.ThiefType = {}));
    var cnt = 0;
    for (var key in ThiefType) {
        if (isNaN(parseInt(key, 10))) {
            ++cnt;
        }
    }
    /** 泥棒種類 */
    define.NUM_OF_THIEF_TYPE = cnt;
    /** ドア前での立ち止まりフレーム */
    define.STOP_DOOR_TIME = 6;
    /** 泥棒出現位置Yリスト */
    define.POS_THIEF_POP_LIST_Y = [
        160,
        260,
        360
    ];
    /** 泥棒アニメ短縮 */
    var animes = asaInfo_1.AsaInfo.thief.anim;
    /** チビ初期値 */
    define.SHORT_VALUE = {
        type: ThiefType.short,
        life: 1,
        movSpd: -3,
        w: 60,
        h: 60,
        anim: {
            walk1: animes.shortWalk1,
            walk2: animes.shortWalk1,
            down1: animes.shortDown1,
            down2: animes.shortDown1,
            in: animes.shortIn1
        }
    };
    /** ノッポ初期値 */
    define.TALL_VALUE = {
        type: ThiefType.tall,
        life: 1,
        movSpd: -4.5,
        w: 72,
        h: 90,
        anim: {
            walk1: animes.tallWalk1,
            walk2: animes.tallWalk1,
            down1: animes.tallDown1,
            down2: animes.tallDown1,
            in: animes.tallIn1
        }
    };
    /** デブ初期値 */
    define.GRANDE_VALUE = {
        type: ThiefType.grande,
        life: 2,
        movSpd: -2.5,
        w: 118,
        h: 80,
        anim: {
            walk1: animes.grandeWalk1,
            walk2: animes.grandeWalk2,
            down1: animes.grandeDown1,
            down2: animes.grandeDown2,
            in: animes.grandeIn1
        }
    };
    /** 初期値配列 */
    define.THIEF_VALUES = [
        define.SHORT_VALUE,
        define.TALL_VALUE,
        define.GRANDE_VALUE
    ];
    /** 泥棒出現レート */
    define.THIEF_POP_RATES = [
        {
            phase: 1,
            popInterval: 45,
            floor: [
                { type: ThiefType.short, value: [0, 1, 2] },
                { type: ThiefType.tall, value: [0, 1, 2] },
                { type: ThiefType.grande, value: [0, 1, 2] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.short
            ]
        },
        {
            phase: 2,
            popInterval: 45,
            floor: [
                { type: ThiefType.short, value: [0, 1, 2] },
                { type: ThiefType.tall, value: [0, 1, 2] },
                { type: ThiefType.grande, value: [0, 1, 2] }
            ],
            list: [
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall
            ]
        },
        {
            phase: 3,
            popInterval: 45,
            floor: [
                { type: ThiefType.short, value: [0, 1, 2] },
                { type: ThiefType.tall, value: [0, 1, 2] },
                { type: ThiefType.grande, value: [0, 1, 2] }
            ],
            list: [
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande
            ]
        },
        {
            phase: 4,
            popInterval: 30,
            floor: [
                { type: ThiefType.short, value: [1, 2] },
                { type: ThiefType.tall, value: [0, 1] },
                { type: ThiefType.grande, value: [0, 1, 2] }
            ],
            list: [
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande
            ]
        },
        {
            phase: 5,
            popInterval: 22,
            floor: [
                { type: ThiefType.short, value: [1, 2] },
                { type: ThiefType.tall, value: [0, 1] },
                { type: ThiefType.grande, value: [0, 1, 2] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande,
                ThiefType.grande
            ]
        },
        {
            phase: 6,
            popInterval: 22,
            floor: [
                { type: ThiefType.short, value: [1, 2] },
                { type: ThiefType.tall, value: [0, 2] },
                { type: ThiefType.grande, value: [0, 1, 2] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande
            ]
        },
        {
            phase: 7,
            popInterval: 15,
            floor: [
                { type: ThiefType.short, value: [2] },
                { type: ThiefType.tall, value: [0] },
                { type: ThiefType.grande, value: [1] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande
            ]
        },
        {
            phase: 8,
            popInterval: 15,
            floor: [
                { type: ThiefType.short, value: [1, 2] },
                { type: ThiefType.tall, value: [1] },
                { type: ThiefType.grande, value: [0] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande
            ]
        },
        {
            phase: 9,
            popInterval: 15,
            floor: [
                { type: ThiefType.short, value: [2] },
                { type: ThiefType.tall, value: [0] },
                { type: ThiefType.grande, value: [1] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande,
                ThiefType.grande
            ]
        },
        {
            phase: 10,
            popInterval: 13,
            floor: [
                { type: ThiefType.short, value: [1] },
                { type: ThiefType.tall, value: [0, 2] },
                { type: ThiefType.grande, value: [0, 2] }
            ],
            list: [
                ThiefType.short,
                ThiefType.short,
                ThiefType.short,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.tall,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande,
                ThiefType.grande
            ]
        }
    ];
    /** 基本スコア */
    define.SCORE_BASE = 100;
    /** マイナススコア */
    define.SCORE_MINUS = -50;
    /** スコア上限 */
    define.SCORE_LIMIT = Math.pow(10, define.GAME_SCORE_DIGIT) - 1;
    /** コンボ表示位置 */
    define.POS_COMBO = { x: 182 + define.OFFSET_X, y: 20 };
    /** ポイント表示位置 Y座標補正01 */
    define.POS_POINT_OFFSET_Y_1 = -34;
    /** ポイント表示位置 Y座標補正02 */
    define.POS_POINT_OFFSET_Y_2 = -30;
    /** コンボ桁数 */
    define.COMBO_DIGIT = 3;
    /** コンボ倍率の除数 */
    define.COMBO_DIVISOR = 55;
    /** コンボアニメのピボット */
    define.COMBO_PIVOT = "num3_pivot";
    /** ポップスコアのピボット */
    define.POP_SCORE_PIVOT = "point_pivot";
    /** ポップスコアの符号なし表示ラベル桁 */
    define.POP_SCORE_DIGIT = 4;
})(define = exports.define || (exports.define = {}));
