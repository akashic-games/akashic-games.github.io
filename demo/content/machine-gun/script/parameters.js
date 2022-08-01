"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallParameterB = exports.wallParameterA = exports.bulletParameterB = exports.bulletParameterA = exports.physics = exports.worldProperty = exports.DAMAGE_FONT = exports.GROUP_A = exports.bulletList = exports.b2Mat22 = exports.b2Vec2 = void 0;
var box2d = require("@akashic-extension/akashic-box2d");
/** 2次元ベクトル */
exports.b2Vec2 = box2d.Box2DWeb.Common.Math.b2Vec2;
/** 2 × 2 行列 */
exports.b2Mat22 = box2d.Box2DWeb.Common.Math.b2Mat22;
/** 衝突判定を持つ銃弾のリスト */
exports.bulletList = [];
/** Aグループ */
exports.GROUP_A = -1;
/** Bグループ */
var GROUP_B = -2;
/** 壁カテゴリ */
var CATEGORY_BULLET = 0x0001;
/** 壁カテゴリ */
var CATEGORY_WALL = 0x0002;
/** ダメージ描画に使用するフォント */
exports.DAMAGE_FONT = new g.DynamicFont({
    game: g.game,
    fontFamily: "monospace",
    size: 30
});
/** 物理世界のプロパティ */
exports.worldProperty = {
    gravity: [0.0, 0.0],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
exports.physics = new box2d.Box2D(exports.worldProperty);
;
/** グループAの銃弾生成パラメータ */
exports.bulletParameterA = {
    /** 見た目情報 */
    appear: {
        assetId: "circleA",
        width: 0.1 * exports.worldProperty.scale,
        height: 0.1 * exports.worldProperty.scale
    },
    /** 物理定義 */
    physics: {
        /** 物理挙動 */
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Dynamic // 自由に動ける物体
        }),
        /** 物理性質 */
        fixture: exports.physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: exports.physics.createCircleShape(0.1 * exports.worldProperty.scale),
            filter: {
                // 衝突判定のフィルタリング設定
                // ※ 負のグループに属するオブジェクト同士は衝突しない
                // ※ 物体のcategoryBitsとmaskBitsの論理積が真のときだけ衝突判定が行われる
                groupIndex: exports.GROUP_A,
                categoryBits: CATEGORY_BULLET,
                maskBits: CATEGORY_WALL
            }
        })
    }
};
/** グループBの銃弾生成パラメータ */
exports.bulletParameterB = {
    appear: {
        assetId: "circleB",
        width: 0.1 * exports.worldProperty.scale,
        height: 0.1 * exports.worldProperty.scale
    },
    physics: {
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Dynamic
        }),
        fixture: exports.physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: exports.physics.createCircleShape(0.1 * exports.worldProperty.scale),
            filter: {
                groupIndex: GROUP_B,
                categoryBits: CATEGORY_BULLET,
                maskBits: CATEGORY_WALL
            }
        })
    }
};
/** グループAの壁生成パラメータ */
exports.wallParameterA = {
    appear: {
        width: 0.3 * exports.worldProperty.scale,
        height: g.game.height / 3,
        cssColor: "crimson"
    },
    physics: {
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Static // 固定されて動かない物体
        }),
        fixture: exports.physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: exports.physics.createRectShape(0.3 * exports.worldProperty.scale, g.game.height / 3),
            filter: {
                groupIndex: exports.GROUP_A,
                categoryBits: CATEGORY_WALL,
                maskBits: CATEGORY_BULLET
            }
        })
    }
};
/** グループBの壁生成パラメータ */
exports.wallParameterB = {
    appear: {
        width: 0.3 * exports.worldProperty.scale,
        height: g.game.height / 3,
        cssColor: "teal"
    },
    physics: {
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Static
        }),
        fixture: exports.physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: exports.physics.createRectShape(0.3 * exports.worldProperty.scale, g.game.height / 3),
            filter: {
                groupIndex: GROUP_B,
                categoryBits: CATEGORY_WALL,
                maskBits: CATEGORY_BULLET
            }
        })
    }
};
