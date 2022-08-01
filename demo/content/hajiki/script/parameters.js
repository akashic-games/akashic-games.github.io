"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floorParameter = exports.wallParameter = exports.hajikiParameter = exports.physics = exports.worldProperty = exports.b2Mat22 = exports.b2Vec2 = void 0;
var box2d = require("@akashic-extension/akashic-box2d");
/** 2次元ベクトル */
exports.b2Vec2 = box2d.Box2DWeb.Common.Math.b2Vec2;
/** 2×2 の行列 */
exports.b2Mat22 = box2d.Box2DWeb.Common.Math.b2Mat22;
/** 物理世界のプロパティ */
exports.worldProperty = {
    gravity: [0.0, 0.0],
    scale: 50,
    sleep: true // 停止した物体を演算対象としないかどうか
};
/** 物理エンジンの世界 */
exports.physics = new box2d.Box2D(exports.worldProperty);
;
/** おはじきのパラメータ */
exports.hajikiParameter = {
    appear: {
        width: 1.0 * exports.worldProperty.scale,
        height: 1.0 * exports.worldProperty.scale
    },
    /** 物理定義 */
    physics: {
        /** 物理挙動 */
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Dynamic // 自由に動ける物体
        }),
        /** 物理性質 */
        fixture: exports.physics.createFixtureDef({
            density: 5.0,
            friction: 1.0,
            restitution: 0.999,
            shape: exports.physics.createCircleShape(1.0 * exports.worldProperty.scale) // 衝突判定の形（直径 1m の円形）
        })
    }
};
/** 壁の生成パラメータ */
exports.wallParameter = {
    appear: {
        width: 0.3 * exports.worldProperty.scale,
        height: g.game.height,
        cssColor: "royalblue"
    },
    physics: {
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Static // 固定されて動かない物体
        }),
        fixture: exports.physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: exports.physics.createRectShape(0.3 * exports.worldProperty.scale, g.game.height)
        })
    }
};
/** 床・天井の生成パラメータ */
exports.floorParameter = {
    appear: {
        width: g.game.width,
        height: 0.3 * exports.worldProperty.scale,
        cssColor: "royalblue"
    },
    physics: {
        body: exports.physics.createBodyDef({
            type: box2d.BodyType.Static
        }),
        fixture: exports.physics.createFixtureDef({
            density: 1.0,
            friction: 0.3,
            restitution: 0.7,
            shape: exports.physics.createRectShape(g.game.width, 0.3 * exports.worldProperty.scale)
        })
    }
};
