/*v3.0.0-beta.0

*/
// Dependencies for this module:
//   ../typings/box2dweb.d.ts

declare module '@akashic-extension/akashic-box2d' {
    import * as Box2DWeb from "box2dweb";
    export * from "@akashic-extension/akashic-box2d/Box2D";
    export * from "@akashic-extension/akashic-box2d/ContactManager";
    export * from "@akashic-extension/akashic-box2d/parateters";
    export { Box2DWeb };
}

declare module '@akashic-extension/akashic-box2d/Box2D' {
    import * as box2dweb from "box2dweb";
    import { EBody, Box2DFixtureDef, Box2DBodyDef } from "@akashic-extension/akashic-box2d/parateters";
    /**
        * `Box2D` のインスタンス生成時に指定するパラメータ。
        */
    export interface Box2DParameter {
            /**
                * 重力の方向 (m/s^2)。
                */
            gravity: number[];
            /**
                * スケール (pixel/m)。
                */
            scale: number;
            /**
                * 停止した物体を物理演算対象とするかどうか。
                * 省略時はtrue。
                */
            sleep?: boolean;
    }
    /**
        * AkashicのエンティティをBox2DWebのb2Worldに追加し、演算結果をエンティティに反映するクラス。
        */
    export class Box2D {
            /**
                * `b2World` のインスタンス。
                */
            world: box2dweb.Dynamics.b2World;
            /**
                * このクラスが保持する `EBody` のリスト。
                */
            bodies: EBody[];
            /**
                * 物理世界のピクセルサイズとAkashicのピクセルサイズのスケール比。
                */
            scale: number;
            /**
                * `Box2D` のインスタンスを生成する。
                * @param param `b2World` の生成オプション
                */
            constructor(param: Box2DParameter);
            /**
                * このクラスにボディを追加し、その `EBody` を返す。
                * すでに同エンティティが追加されている場合は何もせず `null` を返す。
                * エンティティのアンカーポイントが (0.5, 0.5) に指定される点に注意。
                * @param entity 対象のエンティティ
                * @param bodyDef 対象のb2BodyDef
                * @param fixtureDef 対象のb2FixtureDefまたは対象のb2FixtureDefの配列
                */
            createBody(entity: g.E, bodyDef: box2dweb.Dynamics.b2BodyDef, fixtureDef: box2dweb.Dynamics.b2FixtureDef | box2dweb.Dynamics.b2FixtureDef[]): EBody | null;
            /**
                * このクラスに追加された `EBody` を削除する。
                * @param ebody 削除する `EBody`
                */
            removeBody(ebody: EBody): void;
            /**
                * エンティティからこのクラスに追加されている `EBody` を返す。
                * @param entity エンティティ
                */
            getEBodyFromEntity(entity: g.E): EBody | null;
            /**
                * `b2Body` からこのクラスに追加されている `EBody` を返す。
                * @param b2Body b2Body
                */
            getEBodyFromb2Body(b2Body: box2dweb.Dynamics.b2Body): EBody | null;
            /**
                * このクラスのインスタンスを破棄する。
                */
            destroy(): void;
            /**
                * このクラスのインスタンスが破棄済みであるかを返す。
                */
            destroyed(): boolean;
            /**
                * 時間を経過させ、このクラスに追加されたエンティティの座標と角度を変更する。
                * このメソッドは暗黙的に `E#modified()` を呼び出している。
                * @param dt 経過させる時間単位
                * @param velocityIteration 速度演算のイテレーション回数 省略時は10
                * @param positionIteration 位置演算のイテレーション回数 省略時は10
                */
            step(dt: number, velocityIteration?: number, positionIteration?: number): void;
            /**
                * ボディ同士の接触を、Box2DWebのユーザデータを参照して検出する。
                * @param body1 対象のボディ
                * @param body2 対象のボディ
                * @param contact 対象のb2Contacts
                */
            isContact(body1: EBody, body2: EBody, contact: box2dweb.Dynamics.Contacts.b2Contact): boolean;
            /**
                * 長方形を表す `b2PolygonShape` インスタンスを生成する。
                * @param width 横幅 px
                * @param height 縦幅 px
                */
            createRectShape(width: number, height: number): box2dweb.Collision.Shapes.b2PolygonShape;
            /**
                * 円を表す `b2CircleShape` インスタンスを生成する。
                * @param diameter 直径 px
                */
            createCircleShape(diameter: number): box2dweb.Collision.Shapes.b2CircleShape;
            /**
                * 任意の多角形を表す `b2PolygonShape` インスタンスを生成する。
                * @param vertices[] 各頂点の `b2Vec2` 配列
                */
            createPolygonShape(vertices: box2dweb.Common.Math.b2Vec2[]): box2dweb.Collision.Shapes.b2PolygonShape;
            /**
                * b2FixtureDefインスタンスを生成する。
                * @param fixtureOption FixtureOption
                */
            createFixtureDef(fixtureDef: Box2DFixtureDef): box2dweb.Dynamics.b2FixtureDef;
            /**
                * `b2BodyDef` インスタンスを生成する。
                * @param bodyDef Box2DBodyDef
                */
            createBodyDef(bodyDef: Box2DBodyDef): box2dweb.Dynamics.b2BodyDef;
            /**
                * ラジアンを度に変換する。
                * @param radian 対象のラジアン
                */
            degree(radian: number): number;
            /**
                * 度をラジアンに変換する。
                * @param degree 対象の度
                */
            radian(degree: number): number;
            /**
                * この物理エンジン世界のビクセルスケールに変換した `b2Vec2` インスタンスを生成する。
                * @param x x方向のピクセル値
                * @param y y方向のピクセル値
                */
            vec2(x: number, y: number): box2dweb.Common.Math.b2Vec2;
    }
}

declare module '@akashic-extension/akashic-box2d/ContactManager' {
    import { Box2D, EBody } from "@akashic-extension/akashic-box2d/";
    /**
        * `ContactManager` のインスタンス生成時に指定するパラメータ。
        */
    export interface ContactManagerParameter {
            /**
                * Box2D のインスタンス。
                */
            box2d: Box2D;
    }
    /**
        * 衝突判定を管理するクラス。
        */
    export class ContactManager {
            /**
                * Box2D のインスタンス。
                */
            box2d: Box2D;
            /**
                * `ContactManager` のインスタンスを生成する。
                * @param param `ContactManager` の生成オプション
                */
            constructor(param: ContactManagerParameter);
            /**
                * このクラスのインスタンスを破棄する。
                */
            destroy(): void;
            /**
                * このクラスのインスタンスが破棄済みであるかを返す。
                */
            destroyed(): boolean;
            /**
                * `EBody` 同士の接触開始を検出する `g.Trigger` を生成する。
                * @param bodyA 対象のボディ
                * @param bodyB 対象のボディ
                */
            createBeginContactTrigger(bodyA: EBody, bodyB: EBody): g.Trigger<void>;
            /**
                * `EBody` 同士の接触開始を検出する `g.Trigger` を削除する。
                * @param bodyA 対象のボディ
                * @param bodyB 対象のボディ
                */
            removeBeginContactTrigger(bodyA: EBody, bodyB: EBody): boolean;
            /**
                * `EBody` 同士の接触終了を検出する `g.Trigger` を生成する。
                * @param bodyA 対象のボディ
                * @param bodyB 対象のボディ
                */
            createEndContactTrigger(bodyA: EBody, bodyB: EBody): g.Trigger<void>;
            /**
                * `EBody` 同士の接触終了を検出する `g.Trigger` を削除する。
                * @param bodyA 対象のボディ
                * @param bodyB 対象のボディ
                */
            removeEndContactTrigger(bodyA: EBody, bodyB: EBody): boolean;
    }
}

declare module '@akashic-extension/akashic-box2d/parateters' {
    import * as box2dweb from "box2dweb";
    /**
        * ボディの定義。
        * 未指定の場合は box2dweb 側の初期値に従う。
        */
    export interface Box2DBodyDef {
            /**
                * BodyType。
                */
            type?: number;
            /**
                * ボディのユーザデータ。
                */
            userData?: string;
            /**
                * 開始時にボディをアクティブとするかどうか。
                */
            active?: boolean;
            /**
                * ボディのスリープを許可するかどうか。
                */
            allowSleep?: boolean;
            /**
                * 角速度の減衰率。
                */
            angularDamping?: number;
            /**
                * 角速度。
                */
            angularVelocity?: number;
            /**
                * ボディの初期状態をアウェイクにするかスリープにするか。
                */
            awake?: boolean;
            /**
                * 他のボディとの衝突時に貫通を許可するかどうか。
                */
            bullet?: boolean;
            /**
                * 回転を固定させるかどうか。
                */
            fixedRotation?: boolean;
            /**
                * 速度の減衰率。
                */
            linearDamping?: number;
            /**
                * ボディの初期速度。
                */
            linearVelocity?: box2dweb.Common.Math.b2Vec2;
            /**
                * ボディに与える重力のスケール
                */
            gravityScale?: number;
    }
    /**
        * ボディのタイプを指定するオプション。
        * 未指定の場合は box2dweb 側の初期値に従う。
        */
    export interface Box2DFixtureDef {
            /**
                * ボディの形状。
                */
            shape?: box2dweb.Collision.Shapes.b2PolygonShape | box2dweb.Collision.Shapes.b2CircleShape;
            /**
                * 密度 (kg/m^2)。
                */
            density?: number;
            /**
                * 摩擦係数。
                */
            friction?: number;
            /**
                * 反発係数。
                */
            restitution?: number;
            /**
                * センサーかどうか。
                */
            isSensor?: boolean;
            /**
                * ボディのユーザデータを指定する。
                */
            userData?: string;
            /**
                * フィルタリングデータ。
                */
            filter?: {
                    /**
                        * カテゴリのビット値。
                        */
                    categoryBits: number;
                    /**
                        * マスクのビット値。
                        */
                    maskBits: number;
                    /**
                        * グループインデックス。
                        */
                    groupIndex?: number;
            };
    }
    /**
        * ボディタイプの定義。
        */
    export enum BodyType {
            /**
                * 静的物体。
                */
            Static,
            /**
                * キネマティック物体。
                */
            Kinematic,
            /**
                * 動的物体。
                */
            Dynamic
    }
    /**
        * ボディとエンティティを紐づけるインタフェース。
        */
    export interface EBody {
            /**
                * ID。
                */
            id: string;
            /**
                * Akashicのエンティティ。
                */
            entity: g.E;
            /**
                * Box2Dのボディ。
                */
            b2Body: box2dweb.Dynamics.b2Body;
    }
}

declare module '@akashic-extension/akashic-box2d/' {
    import * as Box2DWeb from "box2dweb";
    export * from "@akashic-extension/akashic-box2d/Box2D";
    export * from "@akashic-extension/akashic-box2d/ContactManager";
    export * from "@akashic-extension/akashic-box2d/parateters";
    export { Box2DWeb };
}

