/*v3.0.0-beta.2

*/

declare module '@akashic-extension/akashic-timeline' {
    export import Timeline = require("@akashic-extension/akashic-timeline/Timeline");
    export import Tween = require("@akashic-extension/akashic-timeline/Tween");
    export import TweenOption = require("@akashic-extension/akashic-timeline/TweenOption");
    export import Easing = require("@akashic-extension/akashic-timeline/Easing");
    export import TweenStateSerialization = require("@akashic-extension/akashic-timeline/TweenStateSerialization");
}

declare module '@akashic-extension/akashic-timeline/Timeline' {
    import Tween = require("@akashic-extension/akashic-timeline/Tween");
    import TweenOption = require("@akashic-extension/akashic-timeline/TweenOption");
    /**
        * タイムライン機能を提供するクラス。
        */
    class Timeline {
            /**
                * タイムラインが一時停止状態かどうかを表すフラグ。
                * タイムラインを一時停止する場合は`true`をセットする。
                */
            paused: boolean;
            _scene: g.Scene;
            _tweens: Tween[];
            _fps: number;
            /**
                * Timelineを生成する。
                * @param scene タイムラインを実行する `Scene`
                */
            constructor(scene: g.Scene);
            /**
                * Timelineに紐付いたTweenを生成する。
                * @param target タイムライン処理の対象にするオブジェクト
                * @param option Tweenの生成オプション。省略された場合、 {modified: target.modified, destroyed: target.destroyed} が与えられた時と同様の処理を行う。
                */
            create(target: any, option?: TweenOption): Tween;
            /**
                * Timelineに紐付いたTweenを削除する。
                * @param tween 削除するTween。
                */
            remove(tween: Tween): void;
            /**
                * Timelineに紐付いた全Tweenのアクションを完了させる。詳細は `Tween#complete()`の説明を参照。
                */
            completeAll(): void;
            /**
                * Timelineに紐付いた全Tweenのアクションを取り消す。詳細は `Tween#cancel()`の説明を参照。
                * @param revert ターゲットのプロパティをアクション開始前に戻すかどうか (指定しない場合は `false`)
                */
            cancelAll(revert?: boolean): void;
            /**
                * Timelineに紐付いた全Tweenの紐付けを解除する。
                */
            clear(): void;
            /**
                * このTimelineを破棄する。
                */
            destroy(): void;
            /**
                * このTimelineが破棄済みであるかを返す。
                */
            destroyed(): boolean;
            _handler(): void;
    }
    export = Timeline;
}

declare module '@akashic-extension/akashic-timeline/Tween' {
    import TweenOption = require("@akashic-extension/akashic-timeline/TweenOption");
    import EasingType = require("@akashic-extension/akashic-timeline/EasingType");
    import TweenStateSerialization = require("@akashic-extension/akashic-timeline/TweenStateSerialization");
    /**
        * オブジェクトの状態を変化させるアクションを定義するクラス。
        * 本クラスのインスタンス生成には`Timeline#create()`を利用する。
        */
    class Tween {
            /**
                * アクションの実行が一時停止状態かどうかを表すフラグ。
                * 一時停止する場合は`true`をセットする。
                */
            paused: boolean;
            _target: any;
            _stepIndex: number;
            _loop: boolean;
            _modifiedHandler: () => void;
            _destroyedHandler: () => boolean;
            /**
                * Tweenを生成する。
                * @param target 対象となるオブジェクト
                * @param option オプション
                */
            constructor(target: any, option?: TweenOption);
            /**
                * オブジェクトの状態を変化させるアクションを追加する。
                * @param props 変化内容
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            to(props: any, duration: number, easing?: EasingType): this;
            /**
                * オブジェクトの状態を変化させるアクションを追加する。
                * 変化内容はアクション開始時を基準とした相対値で指定する。
                * @param props 変化内容
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                * @param multiply `true`を指定すると`props`の値をアクション開始時の値に掛け合わせた値が終了値となる（指定しない場合は`false`）
                */
            by(props: any, duration: number, easing?: EasingType, multiply?: boolean): this;
            /**
                * 次に追加されるアクションを、このメソッド呼び出しの直前に追加されたアクションと並列に実行させる。
                * `Tween#con()`で並列実行を指定されたアクションが全て終了後、次の並列実行を指定されていないアクションを実行する。
                */
            con(): this;
            /**
                * オブジェクトの変化を停止するアクションを追加する。
                * @param duration 停止する時間（ミリ秒）
                */
            wait(duration: number): this;
            /**
                * 関数を即座に実行するアクションを追加する。
                * @param func 実行する関数
                */
            call(func: () => void): this;
            /**
                * 一時停止するアクションを追加する。
                * 内部的には`Tween#call()`で`Tween#paused`に`true`をセットしている。
                */
            pause(): this;
            /**
                * 待機時間をキーとして実行したい関数を複数指定する。
                * @param actions 待機時間をキーとして実行したい関数を値としたオブジェクト
                */
            cue(funcs: {
                    [key: string]: () => void;
            }): this;
            /**
                * 指定した時間を経過するまで毎フレーム指定した関数を呼び出すアクションを追加する。
                * @param func 毎フレーム呼び出される関数。第一引数は経過時間、第二引数はEasingした結果の変化量（0-1）となる。
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            every(func: (e: number, p: number) => void, duration: number, easing?: EasingType): this;
            /**
                * ターゲットをフェードインさせるアクションを追加する。
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            fadeIn(duration: number, easing?: EasingType): this;
            /**
                * ターゲットをフェードアウトさせるアクションを追加する。
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            fadeOut(duration: number, easing?: EasingType): this;
            /**
                * ターゲットを指定した座標に移動するアクションを追加する。
                * @param x x座標
                * @param y y座標
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            moveTo(x: number, y: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットを指定した相対座標に移動するアクションを追加する。相対座標の基準値はアクション開始時の座標となる。
                * @param x x座標
                * @param y y座標
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            moveBy(x: number, y: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットのX座標を指定した座標に移動するアクションを追加する。
                * @param x x座標
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            moveX(x: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットのY座標を指定した座標に移動するアクションを追加する。
                * @param y y座標
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            moveY(y: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットを指定した角度に回転するアクションを追加する。
                * @param angle 角度
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            rotateTo(angle: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットをアクション開始時の角度を基準とした相対角度に回転するアクションを追加する。
                * @param angle 角度
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            rotateBy(angle: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットを指定した倍率に拡縮するアクションを追加する。
                * @param scaleX X方向の倍率
                * @param scaleY Y方向の倍率
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            scaleTo(scaleX: number, scaleY: number, duration: number, easing?: EasingType): this;
            /**
                * ターゲットのアクション開始時の倍率に指定した倍率を掛け合わせた倍率に拡縮するアクションを追加する。
                * @param scaleX X方向の倍率
                * @param scaleY Y方向の倍率
                * @param duration 変化に要する時間（ミリ秒）
                * @param easing Easing関数（指定しない場合は`Easing.linear`）
                */
            scaleBy(scaleX: number, scaleY: number, duration: number, easing?: EasingType): this;
            /**
                * このTweenに追加されたすべてのアクションを即座に完了する。
                * `Tween#loop`が`true`の場合、ループの終端までのアクションがすべて実行される。
                */
            complete(): void;
            /**
                * このTweenに追加されたすべてのアクションを取り消す。
                * `revert`を`true` にした場合、ターゲットのプロパティをアクション開始前に戻す。
                * ただし`Tween#call()`や`Tween#every()`により変更されたプロパティは戻らない点に注意。
                * @param revert ターゲットのプロパティをアクション開始前に戻すかどうか (指定しない場合は `false`)
                */
            cancel(revert?: boolean): void;
            /**
                * アニメーションが終了しているかどうかを返す。
                * `_target`が破棄された場合又は、全アクションの実行が終了した場合に`true`を返す。
                */
            isFinished(): boolean;
            /**
                * アニメーションを実行する。
                * @param delta 前フレームからの経過時間
                */
            _fire(delta: number): void;
            /**
                * Tweenの実行状態をシリアライズして返す。
                */
            serializeState(): TweenStateSerialization;
            /**
                * Tweenの実行状態を復元する。
                * @param serializedstate 復元に使う情報。
                */
            deserializeState(serializedState: TweenStateSerialization): void;
    }
    export = Tween;
}

declare module '@akashic-extension/akashic-timeline/TweenOption' {
    /**
        * Tweenに指定するオプション。
        */
    interface TweenOption {
            /**
                * ループ実行するかどうかを指定する。
                * `false`を指定した場合、全アクションが終了後、`Tween`は`Timeline`から削除される。
                */
            loop?: boolean;
            /**
                * 1フレーム処理が完了するごとに呼び出す関数を指定する。
                * 省略された場合、Tweenの対象オブジェクトの`modified()`が与えられる(対象オブジェクトが`modified()`を持たない場合は`undefined`となる)。
                * 呼び出された関数内での`this`はTweenの対象オブジェクトとなる。
                */
            modified?: () => void;
            /**
                * 対象が削除されたかどうかを調べる関数を指定する。
                * 省略された場合、Tweenの対象オブジェクトの`destroyed()`が与えられる(対象オブジェクトが`destroyed()`を持たない場合は`undefined`となる)。
                * この関数が`true`を返す場合、Tweenは自動的に処理を中止し、当該Tweenを抱えるTimelineもTweenも削除する。
                * 呼び出された関数内での`this`はTweenの対象オブジェクトとなる。
                */
            destroyed?: () => boolean;
    }
    export = TweenOption;
}

declare module '@akashic-extension/akashic-timeline/Easing' {
    /**
        * Easing関数群。
        * 参考: http://gizma.com/easing/
        */
    module Easing {
            /**
                * 入力値をlinearした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function linear(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInQuadした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInQuad(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseOutQuadした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeOutQuad(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInOutQuadした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInOutQuad(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInQubicした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInCubic(t: number, b: number, c: number, d: number): number;
            /**
                * @deprecated この関数は非推奨機能である。代わりに `easeInCubic` を用いるべきである。
                */
            const easeInQubic: typeof easeInCubic;
            /**
                * 入力値をeaseOutQubicした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeOutCubic(t: number, b: number, c: number, d: number): number;
            /**
                * @deprecated この関数は非推奨機能である。代わりに `easeOutCubic` を用いるべきである。
                */
            const easeOutQubic: typeof easeOutCubic;
            /**
                * 入力値をeaseInOutQubicした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInOutCubic(t: number, b: number, c: number, d: number): number;
            /**
                * @deprecated この関数は非推奨機能である。代わりに `easeInOutCubic` を用いるべきである。
                */
            const easeInOutQubic: typeof easeInOutCubic;
            /**
                * 入力値をeaseInQuartした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInQuart(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseOutQuartした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeOutQuart(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInQuintした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInQuint(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseOutQuintした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeOutQuint(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInOutQuintした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInOutQuint(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInSineした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInSine(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseOutSineした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeOutSine(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInOutSineした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInOutSine(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInExpoした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInExpo(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInOutExpoした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInOutExpo(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInCircした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInCirc(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseOutCircした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeOutCirc(t: number, b: number, c: number, d: number): number;
            /**
                * 入力値をeaseInOutCircした結果の現在位置を返す。
                * @param t 経過時間
                * @param b 開始位置
                * @param c 終了位置
                * @param d 所要時間
                */
            function easeInOutCirc(t: number, b: number, c: number, d: number): number;
    }
    export = Easing;
}

declare module '@akashic-extension/akashic-timeline/TweenStateSerialization' {
    import ActionType = require("@akashic-extension/akashic-timeline/ActionType");
    interface TweenStateSerialization {
        _stepIndex: number;
        _initialProp: any;
        _steps: {
            input: any;
            start: any;
            goal: any;
            duration: number;
            elapsed: number;
            type: ActionType;
            cueIndex: number;
            initialized: boolean;
            finished: boolean;
        }[][];
    }
    export = TweenStateSerialization;
}

declare module '@akashic-extension/akashic-timeline/EasingType' {
    type EasingType = (t: number, b: number, c: number, d: number) => number;
    export = EasingType;
}

declare module '@akashic-extension/akashic-timeline/ActionType' {
    enum ActionType {
        Wait = 0,
        Call = 1,
        TweenTo = 2,
        TweenBy = 3,
        TweenByMult = 4,
        Cue = 5,
        Every = 6
    }
    export = ActionType;
}

