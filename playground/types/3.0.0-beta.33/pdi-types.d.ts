/*v1.1.0

*/
// Dependencies for this module:
//   ../../../../@akashic/trigger
//   ../../../../@akashic/amflow
//   ../../../../@akashic/playlog

declare module '@akashic/pdi-types' {
    export * from "@akashic/pdi-types/commons";
    export * from "@akashic/pdi-types/errors";
    export * from "@akashic/pdi-types/surface/CompositeOperation";
    export * from "@akashic/pdi-types/surface/CompositeOperationString";
    export * from "@akashic/pdi-types/surface/ImageData";
    export * from "@akashic/pdi-types/surface/Renderer";
    export * from "@akashic/pdi-types/surface/ShaderProgram";
    export * from "@akashic/pdi-types/surface/ShaderUniform";
    export * from "@akashic/pdi-types/surface/Surface";
    export * from "@akashic/pdi-types/asset/audio/AudioAsset";
    export * from "@akashic/pdi-types/asset/audio/AudioPlayer";
    export * from "@akashic/pdi-types/asset/audio/AudioSystem";
    export * from "@akashic/pdi-types/asset/audio/AudioAssetHint";
    export * from "@akashic/pdi-types/asset/image/ImageAssetHint";
    export * from "@akashic/pdi-types/asset/image/ImageAsset";
    export * from "@akashic/pdi-types/asset/script/ScriptAsset";
    export * from "@akashic/pdi-types/asset/script/Module";
    export * from "@akashic/pdi-types/asset/script/ScriptAssetRuntimeValue";
    export * from "@akashic/pdi-types/asset/text/TextAsset";
    export * from "@akashic/pdi-types/asset/video/VideoPlayer";
    export * from "@akashic/pdi-types/asset/video/VideoSystem";
    export * from "@akashic/pdi-types/asset/video/VideoAsset";
    export * from "@akashic/pdi-types/asset/Asset";
    export * from "@akashic/pdi-types/asset/AssetLoadErrorType";
    export * from "@akashic/pdi-types/font/FontWeightString";
    export * from "@akashic/pdi-types/font/FontWeight";
    export * from "@akashic/pdi-types/font/FontFamily";
    export * from "@akashic/pdi-types/font/Glyph";
    export * from "@akashic/pdi-types/font/GlyphFactory";
    export * from "@akashic/pdi-types/platform/Looper";
    export * from "@akashic/pdi-types/platform/OperationPluginView";
    export * from "@akashic/pdi-types/platform/OperationPluginViewInfo";
    export * from "@akashic/pdi-types/platform/Platform";
    export * from "@akashic/pdi-types/platform/PlatformEventHandler";
    export * from "@akashic/pdi-types/platform/PlatformPointEvent";
    export * from "@akashic/pdi-types/platform/RendererRequirement";
    export * from "@akashic/pdi-types/platform/ResourceFactory";
}

declare module '@akashic/pdi-types/commons' {
    /**
        * オフセット特性インターフェース。
        */
    export interface CommonOffset {
            x: number;
            y: number;
    }
    /**
        * サイズ特性インターフェース。
        */
    export interface CommonSize {
            width: number;
            height: number;
    }
    /**
        * 汎用領域インターフェース。
        */
    export interface CommonArea extends CommonOffset, CommonSize {
    }
    /**
        * 汎用矩形インターフェース。
        */
    export interface CommonRect {
            left: number;
            right: number;
            top: number;
            bottom: number;
    }
}

declare module '@akashic/pdi-types/errors' {
    export interface ErrorLike {
            name: string;
            message: string;
            stack?: string;
            cause?: any;
    }
    /**
        * アサーションエラー。
        * エンジンが想定しない状態に陥った場合にthrowされる。メソッドの引数が正しくない場合などもこのエラーがthrowされる。
        */
    export interface AssertionError extends ErrorLike {
            name: "AssertionError";
    }
    /**
        * 型ミスマッチエラー。
        * 期待されるものと異なる型の値が与えられた場合にthrowされる。
        */
    export interface TypeMismatchError extends ErrorLike {
            name: "TypeMismatchError";
            /**
                * 期待される型情報。
                */
            expected: string;
            /**
                * 実際に渡されたオブジェクト。
                */
            actual: any;
    }
    /**
        * アセットロードエラー。
        * `Asset#_load()` が失敗した時、`AssetLoadHandler#_onAssetError` に渡される。
        *
        * エラーの理由は `message` から、そのおおまかな種別は `type` から得ることができる。
        * ただし特に `message` の内容はアセットの実装に依存するため、 `message` の値で処理を変更してはならない。
        * 読み込みの再試行が可能かどうかは `retriable` で判断すべきである。
        */
    export interface AssetLoadError extends ErrorLike {
            name: "AssetLoadError";
            /**
                * 再試行できるエラーかどうか。
                *
                * `Asset#_load()` が再試行できない要因 (HTTP 404 Not Found など) で失敗した時、偽。でなければ真。
                * 通常の場合 (`Scene` 経由で読み込んだ場合)、読み込み失敗回数が再試行回数上限 `AssetManager.MAX_ERROR_COUNT` を超えた際にも偽になる。
                */
            retriable: boolean;
    }
    export interface StorageLoadError extends ErrorLike {
            name: "StorageLoadError";
    }
}

declare module '@akashic/pdi-types/surface/CompositeOperation' {
    /**
        * 描画時の合成方法。
        * @deprecated 非推奨である。将来的に削除される。代わりに `CompositeOperationString` を利用すること。
        */
    export enum CompositeOperation {
            /**
                * 先に描画された領域の上に描画する。
                */
            SourceOver = 0,
            /**
                * 先に描画された領域と重なった部分のみを描画する。
                */
            SourceAtop = 1,
            /**
                * 先に描画された領域と重なった部分の色を加算して描画する。
                */
            Lighter = 2,
            /**
                * 先に描画された領域を全て無視して描画する。
                */
            Copy = 3,
            /**
                * 先に描画された領域と重なった部分に描画を行い、それ以外の部分を透明にする。
                * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
                */
            ExperimentalSourceIn = 4,
            /**
                * 先に描画された領域と重なっていない部分に描画を行い、それ以外の部分を透明にする。
                * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
                */
            ExperimentalSourceOut = 5,
            /**
                * 描画する領域だけを表示し、先に描画された領域と重なった部分は描画先を表示する。
                * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
                */
            ExperimentalDestinationAtop = 6,
            /**
                * 先に描画された領域と重なっていない部分を透明にし、重なった部分は描画先を表示する。
                * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
                */
            ExperimentalDestinationIn = 7,
            /**
                * 描画する領域を透明にする。
                */
            DestinationOut = 8,
            /**
                * 先に描画された領域の下に描画する。
                */
            DestinationOver = 9,
            /**
                * 先に描画された領域と重なった部分のみ透明にする。
                */
            Xor = 10
    }
}

declare module '@akashic/pdi-types/surface/CompositeOperationString' {
    /**
      * 描画時の合成方法。
      *
      * - `"source-over"`: 先に描画された領域の上に描画する。
      * - `"source-atop"`: 先に描画された領域と重なった部分のみを描画する。
      * - `"lighter"`: 先に描画された領域と重なった部分の色を加算して描画する。
      * - `"copy"`: 先に描画された領域を全て無視して描画する。
      * - `"experimental-source-in"`: 先に描画された領域と重なった部分に描画を行い、それ以外の部分を透明にする。
      * - `"experimental-source-out"`: 先に描画された領域と重なっていない部分に描画を行い、それ以外の部分を透明にする。
      * - `"experimental-destination-atop"`: 描画する領域だけを表示し、先に描画された領域と重なった部分は描画先を表示する。
      * - `"experimental-destination-in"`: 先に描画された領域と重なっていない部分を透明にし、重なった部分は描画先を表示する。
      * - `"destination-out"`: 描画する領域を透明にする。
      * - `"destination-over"`: 先に描画された領域の下に描画する。
      * - `"xor"`: 先に描画された領域と重なった部分のみ透明にする。
      *
      * `experimental-` がつくものは、環境によって描画結果が大きく異なることがある。
      * 動作については HTML5 Canvas の globalCompositeOperation も参照のこと。
      * (ただし将来にわたってそれと互換である保証はない)
      */
    export type CompositeOperationString = "source-over" | "source-atop" | "lighter" | "copy" | "experimental-source-in" | "experimental-source-out" | "experimental-destination-atop" | "experimental-destination-in" | "destination-out" | "destination-over" | "xor";
}

declare module '@akashic/pdi-types/surface/ImageData' {
    import { CommonSize } from "@akashic/pdi-types/commons";
    /**
        * 描画領域のピクセル情報を表すインターフェース。
        */
    export interface ImageData extends CommonSize {
            /**
                * 描画領域の横幅のピクセル数。
                */
            width: number;
            /**
                * 描画領域の縦幅のピクセル数。
                */
            height: number;
            /**
                * 描画領域のピクセル情報を、RGBAの各色成分を1byteとした一次配列 (Non-Premultiplied Alpha) として返す。
                * 各要素の順番は、描画領域の左上から右へ進み、右端に到達したら下の列を走査したものとなる。
                */
            data: Uint8ClampedArray;
    }
}

declare module '@akashic/pdi-types/surface/Renderer' {
    import { CompositeOperationString } from "@akashic/pdi-types/surface/CompositeOperationString";
    import { ImageData } from "@akashic/pdi-types/surface/ImageData";
    import { ShaderProgram } from "@akashic/pdi-types/surface/ShaderProgram";
    import { Surface } from "@akashic/pdi-types/surface/Surface";
    /**
        * ゲームの描画を行うクラス。
        *
        * 描画は各エンティティによって行われる。通常、ゲーム開発者が本クラスを利用する必要はない。
        */
    export interface Renderer {
            begin(): void;
            clear(): void;
            /**
                * 指定されたSurfaceの描画を行う。
                *
                * @param surface 描画するSurface
                * @param offsetX 描画元のX座標。0以上の数値でなければならない
                * @param offsetY 描画元のY座標。0以上の数値でなければならない
                * @param width 描画する矩形の幅。0より大きい数値でなければならない
                * @param height 描画する矩形の高さ。0より大きい数値でなければならない
                * @param destOffsetX 描画先のX座標。0以上の数値でなければならない
                * @param destOffsetY 描画先のY座標。0以上の数値でなければならない
                */
            drawImage(surface: Surface, offsetX: number, offsetY: number, width: number, height: number, destOffsetX: number, destOffsetY: number): void;
            drawSprites(surface: Surface, offsetX: number[], offsetY: number[], width: number[], height: number[], canvasOffsetX: number[], canvasOffsetY: number[], count: number): void;
            translate(x: number, y: number): void;
            transform(matrix: number[]): void;
            opacity(opacity: number): void;
            save(): void;
            restore(): void;
            fillRect(x: number, y: number, width: number, height: number, cssColor: string): void;
            setCompositeOperation(operation: CompositeOperationString): void;
            setTransform(matrix: number[]): void;
            setOpacity(opacity: number): void;
            /**
                * 本Rendererがシェーダ機能をサポートしているかを返す。
                */
            isSupportedShaderProgram(): boolean;
            /**
                * 本Rendererにシェーダを設定する。
                * 引数に `null` が指定された場合、本Rendererに設定されているシェーダの設定を解除する。
                */
            setShaderProgram(shaderProgram: ShaderProgram | null): void;
            /**
                * 本Rendererの描画内容を表すImageDataを取得する。
                * 引数は CanvasRenderingContext2D#getImageData() と同様である。
                * 本メソッドの呼び出しは `Renderer#end()` から `Renderer#begin()` の間でなければならない。
                * NOTE: 実行環境によっては戻り値が `null` または `undefined` となりえることに注意。
                * @ignore
                */
            _getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
            /**
                * 本Rendererの描画内容を上書きする。
                * 引数は CanvasRenderingContext2D#putImageData() と同様である。
                * 本メソッドの呼び出しは `Renderer#end()` から `Renderer#begin()` の間でなければならない。
                * @ignore
                */
            _putImageData(imageData: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
            end(): void;
    }
}

declare module '@akashic/pdi-types/surface/ShaderProgram' {
    import { ShaderUniform } from "@akashic/pdi-types/surface/ShaderUniform";
    export interface ShaderProgram {
            /**
                * フラグメントシェーダの文字列。
                *
                * フラグメントシェーダは GLSL 1.0 に準拠した記述でなければならない。
                * またフラグメントシェーダには以下の varying, uniform 値がエンジンによって与えられる。
                * * uniform float uAlpha
                *   * 描画時の透過度
                * * uniform sampler2D uSampler
                *   * 描画元テクスチャ番号
                * * varying vec2 vTexCoord
                *   * 描画元テクスチャの座標
                *   * gl_FragColor = texture2D(uSampler, vTexCoord); のような形で描画元テクスチャのピクセルを参照できる
                *
                * この値が省略された場合、エンジンで用意されたデフォルトのフラグメントシェーダを利用する。
                */
            fragmentShader: string | undefined;
            /**
                * 各シェーダに与えられるuniform値のマップ。
                * `ShaderUniform#value` 以外の値を直接書き換えてはならない。
                */
            uniforms: {
                    [name: string]: ShaderUniform;
            } | undefined;
            /**
                * シェーダプログラムの実体。
                * @private
                */
            _program: any;
    }
}

declare module '@akashic/pdi-types/surface/ShaderUniform' {
    export type ShaderUniformType = "float" | "int" | "vec2" | "vec3" | "vec4" | "ivec2" | "ivec3" | "ivec4" | "mat2" | "mat3" | "mat4";
    /**
        * シェーダに与えるuniform値の情報を表すインターフェース定義。
        */
    export interface ShaderUniform {
            /**
                * uniform値の型。
                * この値は `ShaderProgram` の生成時にのみ指定可能であり、直接書き換えてはならない。
                */
            type: ShaderUniformType;
            /**
                * uniform値。
                * この値の型は `ShaderProgram` の生成時にのみ指定可能であり、変更してはならない。
                *
                * 例えば `type` に `"float"` を指定して `value` に `[0.0, 1.0]` のような配列型を指定した場合、
                * それ以降 `value` に `0.0` のような数値を代入することはできない。
                */
            value: number | Int32Array | Float32Array;
    }
}

declare module '@akashic/pdi-types/surface/Surface' {
    import { CommonSize } from "@akashic/pdi-types/commons";
    import { Renderer } from "@akashic/pdi-types/surface/Renderer";
    /**
        * 描画領域を表すインターフェース。
        */
    export interface Surface extends CommonSize {
            /**
                * 描画領域の幅。
                * この値を直接書き換えてはならない。
                */
            width: number;
            /**
                * 描画領域の高さ。
                * この値を直接書き換えてはならない。
                */
            height: number;
            /**
                * 描画可能な実体。
                * 具体的には renderer().drawImage() の実装が描画対象として利用できる値。
                * @private
                */
            _drawable: any;
            /**
                * このSurfaceへの描画手段を提供するRendererを生成して返す。
                */
            renderer(): Renderer;
            /**
                * このSurfaceが動画を再生中であるかどうかを判定する。
                */
            isPlaying(): boolean;
            /**
                * このSurfaceの破棄を行う。
                */
            destroy(): void;
            /**
                * このSurfaceが破棄済みであるかどうかを判定する。
                */
            destroyed(): boolean;
    }
}

declare module '@akashic/pdi-types/asset/audio/AudioAsset' {
    import { Asset } from "@akashic/pdi-types/asset/Asset";
    import { AudioAssetHint } from "@akashic/pdi-types/asset/audio/AudioAssetHint";
    import { AudioPlayer } from "@akashic/pdi-types/asset/audio/AudioPlayer";
    import { AudioSystem } from "@akashic/pdi-types/asset/audio/AudioSystem";
    /**
        * 音リソースを表すインターフェース。
        * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
        * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
        * Scene#assets、またはGame#assetsによって取得して利用する。
        *
        * AudioAsset#playを呼び出す事で、その音を再生することが出来る。
        */
    export interface AudioAsset extends Asset {
            type: "audio";
            data: any;
            duration: number;
            loop: boolean;
            hint: AudioAssetHint;
            /**
                * @ignore
                */
            _system: AudioSystem;
            play(): AudioPlayer;
            stop(): void;
            inUse(): boolean;
    }
}

declare module '@akashic/pdi-types/asset/audio/AudioPlayer' {
    import { Trigger } from "@akashic/trigger";
    import { AudioAsset } from "@akashic/pdi-types/asset/audio/AudioAsset";
    export interface AudioPlayerEvent {
            player: AudioPlayer;
            audio: AudioAsset;
    }
    /**
        * サウンド再生を行うインターフェース。
        *
        * 本クラスのインスタンスは、 `AudioSystem#createPlayer()` によって明示的に、
        * または `AudioAsset#play()` によって暗黙的に生成される。
        * ゲーム開発者は本クラスのインスタンスを直接生成すべきではない。
        */
    export interface AudioPlayer {
            /**
                * 再生中のオーディオアセット。
                * 再生中のものがない場合、 `undefined` 。
                */
            currentAudio: AudioAsset | undefined;
            /**
                * `play()` が呼び出された時に通知される `Trigger` 。
                */
            onPlay: Trigger<AudioPlayerEvent>;
            /**
                * `stop()` が呼び出された時に通知される `Trigger` 。
                */
            onStop: Trigger<AudioPlayerEvent>;
            /**
                * 音量。
                *
                * 0 (無音) 以上 1.0 (最大) 以下の数値である。
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
                * 音量を変更したい場合、  `changeVolume()` メソッドを用いること。
                */
            volume: number;
            /**
                * `play()` が呼び出された時に通知される `Trigger` 。
                * @deprecated 非推奨である。将来的に削除される。代わりに `onPlay` を利用すること。
                */
            played: Trigger<AudioPlayerEvent>;
            /**
                * `stop()` が呼び出された時に通知される `Trigger` 。
                * @deprecated 非推奨である。将来的に削除される。代わりに `onStop` を利用すること。
                */
            stopped: Trigger<AudioPlayerEvent>;
            /**
                * ミュート中か否か。
                * @private
                */
            _muted: boolean;
            /**
                * `AudioAsset` を再生する。
                *
                * 再生後、 `this.onPlay` がfireされる。
                * @param audio 再生するオーディオアセット
                */
            play(audio: AudioAsset): void;
            /**
                * 再生を停止する。
                *
                * 停止後、 `this.onStop` がfireされる。
                * 再生中でない場合、何もしない(`onStop` もfireされない)。
                */
            stop(): void;
            /**
                * 音声の終了を検知できるか否か。
                * 通常、ゲーム開発者がこのメソッドを利用する必要はない。
                */
            canHandleStopped(): boolean;
            /**
                * 音量を変更する。
                *
                * @param volume 音量。0以上1.0以下でなければならない
                */
            changeVolume(volume: number): void;
            /**
                * ミュート状態を変更する。
                *
                * エンジンユーザが `AudioPlayer` の派生クラスを実装する場合は、
                * このメソッドをオーバーライドして実際にミュート状態を変更する処理を行うこと。
                * オーバーライド先のメソッドはこのメソッドを呼びださなければならない。
                *
                * @param muted ミュート状態にするか否か
                * @private
                */
            _changeMuted(muted: boolean): void;
            /**
                * 音量の変更を通知する。
                * @private
                */
            _notifyVolumeChanged(): void;
    }
}

declare module '@akashic/pdi-types/asset/audio/AudioSystem' {
    import { AudioAsset } from "@akashic/pdi-types/asset/audio/AudioAsset";
    import { AudioPlayer } from "@akashic/pdi-types/asset/audio/AudioPlayer";
    export interface AudioSystem {
            id: string;
            volume: number;
            /**
                * @private
                */
            _muted: boolean;
            stopAll(): void;
            findPlayers(asset: AudioAsset): AudioPlayer[];
            createPlayer(): AudioPlayer;
            requestDestroy(asset: AudioAsset): void;
            /**
                * @private
                */
            _reset(): void;
            /**
                * @private
                */
            _setMuted(value: boolean): void;
            /**
                * @private
                */
            _setPlaybackRate(value: number): void;
    }
}

declare module '@akashic/pdi-types/asset/audio/AudioAssetHint' {
    /**
      * AudioSystemの設定を表すインターフェース。
      */
    export interface AudioAssetHint {
        streaming?: boolean;
    }
}

declare module '@akashic/pdi-types/asset/image/ImageAssetHint' {
    /**
      * ImageAssetの設定を表すインターフェース。
      */
    export interface ImageAssetHint {
        untainted?: boolean;
    }
}

declare module '@akashic/pdi-types/asset/image/ImageAsset' {
    import { Surface } from "@akashic/pdi-types/surface/Surface";
    import { Asset } from "@akashic/pdi-types/asset/Asset";
    import { ImageAssetHint } from "@akashic/pdi-types/asset/image/ImageAssetHint";
    /**
      * 画像リソースを表すインターフェース。
      * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
      * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
      * Scene#assets、またはGame#assetsによって取得して利用する。
      *
      * width, heightでメタデータとして画像の大きさをとることは出来るが、
      * ゲーム開発者はそれ以外の情報を本クラスから直接は取得せず、Sprite等に本リソースを指定して利用する。
      */
    export interface ImageAsset extends Asset {
        type: "image";
        width: number;
        height: number;
        hint: ImageAssetHint | undefined;
        asSurface(): Surface;
        initialize(hint: ImageAssetHint | undefined): void;
    }
}

declare module '@akashic/pdi-types/asset/script/ScriptAsset' {
    import { Asset } from "@akashic/pdi-types/asset/Asset";
    import { ScriptAssetRuntimeValue } from "@akashic/pdi-types/asset/script/ScriptAssetRuntimeValue";
    /**
      * スクリプトリソースを表すインターフェース。
      * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
      * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
      * Scene#assets、またはGame#assetsによって取得して利用する。
      *
      * ScriptAsset#executeによって、本リソースが表すスクリプトを実行し、その結果を受け取る事が出来る。
      * requireによる参照とは異なり、executeはキャッシュされないため、何度でも呼び出し違う結果を受け取ることが出来る。
      */
    export interface ScriptAsset extends Asset {
        type: "script";
        script: string;
        execute(execEnv: ScriptAssetRuntimeValue): any;
    }
}

declare module '@akashic/pdi-types/asset/script/Module' {
    /**
        * Node.js が提供する module の互換インターフェース。
        */
    export interface Module {
            /**
                * モジュールのID。
                * アセットIDとは異なることに注意。
                */
            id: string;
            /**
                * このモジュールのファイル名。
                * フルパスで与えられる。
                */
            filename: string;
            /**
                * このモジュールが公開する値。
                */
            exports: any;
            /**
                * このモジュールの親。一番最初にこのモジュール (のファイル) を require() したモジュール。
                * 該当するモジュールがなければ `null` である。
                */
            parent: Module | null;
            /**
                * このモジュールの読み込みが完了しているか。
                */
            loaded: boolean;
            /**
                * このモジュールが `require()` したモジュール。
                */
            children: Module[];
            /**
                * このモジュール内で `require()` した時の検索先ディレクトリ。
                */
            paths: string[];
            /**
                * このモジュールの評価時に与えられる `require()` 関数。
                */
            require: (path: string) => any;
    }
}

declare module '@akashic/pdi-types/asset/script/ScriptAssetRuntimeValue' {
    import { Module } from "@akashic/pdi-types/asset/script/Module";
    /**
        * `ScriptAsset` の実行時、`g` 以下に加えられる値を定めた共通interface。
        */
    export interface ScriptAssetRuntimeValueBase {
            /**
                * `ScriptAsset` にひも付けられた `Game` 。
                */
            game: any;
    }
    /**
        * `ScriptAsset` の実行時、`g` 以下に加えられる値を定めたinterface。
        * `g` の実際の値は、本来の `g` のすべてのプロパティに加えて以下を持つ必要がある。
        *
        * 通常のゲーム開発者がこのクラスを直接利用する必要はない。
        * `ScriptAsset` を実行する場合は、暗黙にこのクラスを利用する `require()` を用いるべきである。
        */
    export interface ScriptAssetRuntimeValue extends ScriptAssetRuntimeValueBase {
            /**
                * この `ScriptAsset` が公開する値のプレースホルダ。
                * エンジンはここに代入された値を `module.exports` に代入されたものとみなす。
                */
            exports: any;
            /**
                * この `ScriptAsset` のファイルパスのうち、ディレクトリ部分。
                */
            dirname: string;
            /**
                * この `ScriptAsset` のファイルパス。
                */
            filename: string;
            /**
                * この `ScriptAsset` に対応するモジュール。
                */
            module: Module;
    }
}

declare module '@akashic/pdi-types/asset/text/TextAsset' {
    import { Asset } from "@akashic/pdi-types/asset/Asset";
    /**
      * 文字列リソースを表すインターフェース。
      * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
      * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
      * Scene#assets、またはGame#assetsによって取得して利用する。
      *
      * TextAsset#dataによって、本リソースが保持する文字列を取得することが出来る。
      */
    export interface TextAsset extends Asset {
        type: "text";
        data: string;
    }
}

declare module '@akashic/pdi-types/asset/video/VideoPlayer' {
    import { Trigger } from "@akashic/trigger";
    import { VideoAsset } from "@akashic/pdi-types/asset/video/VideoAsset";
    export interface VideoPlayerEvent {
            player: VideoPlayer;
            video: VideoAsset | undefined;
    }
    /**
        * ビデオ再生を行うインターフェース。
        *
        * ゲーム開発者は本クラスのインスタンスを直接生成すべきではない。
        */
    export interface VideoPlayer {
            /**
                * 再生中のビデオアセット。
                * 再生中のものがない場合、 `undefined` 。
                */
            currentVideo: VideoAsset | undefined;
            /**
                * `play()` が呼び出された時に通知される `Trigger` 。
                */
            onPlay: Trigger<VideoPlayerEvent>;
            /**
                * `stop()` が呼び出された時に通知される `Trigger` 。
                */
            onStop: Trigger<VideoPlayerEvent>;
            /**
                * 音量。
                *
                * 0 (無音) 以上 1.0 (最大) 以下の数値である。
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
                * 音量を変更したい場合、  `changeVolume()` メソッドを用いること。
                */
            volume: number;
            /**
                * `play()` が呼び出された時に通知される `Trigger` 。
                * @deprecated 非推奨である。将来的に削除される。代わりに `onPlay` を利用すること。
                */
            played: Trigger<VideoPlayerEvent>;
            /**
                * `stop()` が呼び出された時に通知される `Trigger` 。
                * @deprecated 非推奨である。将来的に削除される。代わりに `onStop` を利用すること。
                */
            stopped: Trigger<VideoPlayerEvent>;
            /**
                * @private
                */
            _loop: boolean;
            /**
                * `VideoAsset` を再生する。
                *
                * 再生後、 `this.onPlay` がfireされる。
                * @param Video 再生するビデオアセット
                */
            play(videoAsset: VideoAsset): void;
            /**
                * 再生を停止する。
                *
                * 再生中でない場合、何もしない。
                * 停止後、 `this.onStop` がfireされる。
                */
            stop(): void;
            /**
                * 音量を変更する。
                *
                * エンジンユーザが `VideoPlayer` の派生クラスを実装する場合は、
                *  このメソッドをオーバーライドして実際に音量を変更する処理を行うこと。
                *  オーバーライド先のメソッドはこのメソッドを呼びださなければならない。
                * @param volume 音量。0以上1.0以下でなければならない
                */
            changeVolume(volume: number): void;
    }
}

declare module '@akashic/pdi-types/asset/video/VideoSystem' {
    /**
      * 将来 VideoPlayerインスタンスの一元管理（ボリューム設定などAudioSystemと似た役割）
      * を担うインターフェース。VideoAssetはVideoSystemを持つという体裁を整えるために(中身が空であるが)
      * 定義されている。
      */
    export interface VideoSystem {
    }
}

declare module '@akashic/pdi-types/asset/video/VideoAsset' {
    import { Surface } from "@akashic/pdi-types/surface/Surface";
    import { Asset } from "@akashic/pdi-types/asset/Asset";
    import { VideoPlayer } from "@akashic/pdi-types/asset/video/VideoPlayer";
    /**
        * 動画リソースを表すインターフェース。
        * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
        * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
        * Scene#assets、またはGame#assetsによって取得して利用する。
        */
    export interface VideoAsset extends Asset {
            type: "video";
            width: number;
            height: number;
            /**
                * 動画の本来の幅。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
                */
            realWidth: number;
            /**
                * 動画の本来の高さ。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
                */
            realHeight: number;
            asSurface(): Surface;
            play(_loop?: boolean): VideoPlayer;
            stop(): void;
            getPlayer(): VideoPlayer;
            destroy(): void;
    }
}

declare module '@akashic/pdi-types/asset/Asset' {
    import { Trigger } from "@akashic/trigger";
    import { AssetLoadError } from "@akashic/pdi-types/errors";
    /**
        * `Asset` の読み込みまたは読み込み失敗を受け取るハンドラのインターフェース定義。
        * 通常、このインターフェースをゲーム開発者が利用する必要はない。
        * `AssetManagerLoadHandler` とは異なる。こちらは `Asset` の読み込み処理を直接実行する場合に用いるハンドラである。
        * @ignore
        */
    export interface AssetLoadHandler {
            /**
                * 読み込失敗の通知を受ける関数。
                * @param asset 読み込みに失敗したアセット
                * @param error 失敗の内容を表すエラー
                */
            _onAssetError(asset: Asset, error: AssetLoadError): void;
            /**
                * 読み込み完了の通知を受ける関数。
                * @param asset 読み込みが完了したアセット
                */
            _onAssetLoad(asset: Asset): void;
    }
    /**
        * 各種リソースを表すインターフェース定義。
        * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
        * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
        * Scene#assets、またはGame#assetsによって取得して利用する。
        */
    export interface Asset {
            id: string;
            type: string;
            path: string;
            originalPath: string;
            onDestroyed: Trigger<Asset>;
            /**
                * 現在利用中で解放出来ない `Asset` かどうかを返す。
                * 戻り値は、利用中である場合真、でなければ偽である。
                *
                * 本メソッドは通常 `false` が返るべきである。
                * 例えば `Sprite` の元画像として使われているケース等では、その `Sprite` によって `Asset` は `Surface` に変換されているべきで、
                * `Asset` が利用中で解放出来ない状態になっていない事を各プラットフォームで保障する必要がある。
                *
                * 唯一、例外的に本メソッドが `true` を返すことがあるのは音楽を表す `Asset` である。
                * BGM等はシーンをまたいで演奏することもありえる上、
                * 演奏中のリソースのコピーを常に各プラットフォームに強制するにはコストがかかりすぎるため、
                * 本メソッドは `true` を返し、適切なタイミングで `Asset` が解放されるよう制御する必要がある。
                */
            inUse(): boolean;
            /**
                * このアセットのリソースの破棄を行う。
                */
            destroy(): void;
            /**
                * このアセットのリソースが破棄済みであるかどうかを判定する。
                */
            destroyed(): boolean;
            /**
                * アセットの読み込みを行う。
                *
                * ゲーム開発者がアセット読み込み失敗時の挙動をカスタマイズする際、読み込みを再試行する場合は、
                * (このメソッドではなく) `AssetLoadFailureInfo#cancelRetry` に真を代入する必要がある。
                *
                * @param loader 読み込み結果の通知を受け取るハンドラ
                * @private
                */
            _load(loader: AssetLoadHandler): void;
            /**
                * @private
                */
            _assetPathFilter(path: string): string;
    }
}

declare module '@akashic/pdi-types/asset/AssetLoadErrorType' {
    /**
        * アセット読み込み失敗時のエラーの種別。
        *
        * この値はあくまでもエラーメッセージ出力のための補助情報であり、
        * 網羅性・厳密性を追求したものではないことに注意。
        *
        * @deprecated 非推奨である。将来的に削除される。現在この型が必要な処理は存在しない。
        */
    export enum AssetLoadErrorType {
            /**
                * 明示されていない(以下のいずれかかもしれないし、そうでないかもしれない)。
                */
            Unspecified = 0,
            /**
                * エンジンの再試行回数上限設定値を超えた。
                */
            RetryLimitExceeded = 1,
            /**
                * ネットワークエラー。タイムアウトなど。
                */
            NetworkError = 2,
            /**
                * リクエストに問題があるエラー。HTTP 4XX など。
                */
            ClientError = 3,
            /**
                * サーバ側のエラー。HTTP 5XX など。
                */
            ServerError = 4
    }
}

declare module '@akashic/pdi-types/font/FontWeightString' {
    /**
      * フォントのウェイト。
      *
      * - `"normal"`: 通常のウェイト。
      * - `"bold"`: 太字のウェイト。
      */
    export type FontWeightString = "normal" | "bold";
}

declare module '@akashic/pdi-types/font/FontWeight' {
    /**
        * フォントのウェイト。
        * @deprecated 非推奨である。将来的に削除される。代わりに `FontWeightString` を利用すること。
        */
    export enum FontWeight {
            /**
                * 通常のフォントウェイト。
                */
            Normal = 0,
            /**
                * 太字のフォントウェイト。
                */
            Bold = 1
    }
}

declare module '@akashic/pdi-types/font/FontFamily' {
    /**
        * 文字列描画のフォントファミリ。
        * @deprecated 非推奨である。将来的に削除される。代わりに文字列 `"sans-serif"`, `"serif"`, `"monospace"` を利用すること。
        */
    export enum FontFamily {
            /**
                * サンセリフ体。ＭＳ Ｐゴシック等
                */
            SansSerif = 0,
            /**
                * セリフ体。ＭＳ 明朝等
                */
            Serif = 1,
            /**
                * 等幅。ＭＳ ゴシック等
                */
            Monospace = 2
    }
}

declare module '@akashic/pdi-types/font/Glyph' {
    import { Surface } from "@akashic/pdi-types/surface/Surface";
    /**
        * グリフの領域を表すインターフェース。
        */
    export interface GlyphArea {
            x: number;
            y: number;
            width?: number;
            height?: number;
            offsetX?: number;
            offsetY?: number;
            advanceWidth?: number;
    }
    /**
        * グリフ。
        */
    export interface Glyph {
            /**
                * 文字コード。
                */
            code: number;
            /**
                * サーフェス上の文字のX座標。
                *
                * `this.surface` が `undefined` である時、この値は不定である。
                */
            x: number;
            /**
                * サーフェス上の文字のY座標。
                *
                * `this.surface` が `undefined` である時、この値は不定である。
                */
            y: number;
            /**
                * 文字の横幅。
                *
                * `this.surface` が `undefined` である時、この値は不定である。
                */
            width: number;
            /**
                * 文字の縦幅。
                *
                * `this.surface` が `undefined` である時、この値は不定である。
                */
            height: number;
            /**
                * 文字を印字したサーフェス。
                *
                * 描画すべき内容がない場合 `surface` は `undefined` である。
                */
            surface: Surface | undefined;
            /**
                * X軸方向についての描画位置調整量。
                *
                * 基準座標からこの値を加算した位置に描画することで正しい文字間隔に配置される。
                *
                * `this.surface` が `undefined` である時、この値は不定である。
                */
            offsetX: number;
            /**
                * Y軸方向についての描画位置調整量。
                *
                * 基準座標からこの値を加算した位置に描画することで文字のベースラインが一致する。
                *
                * `this.surface` が `undefined` である時、この値は不定である。
                */
            offsetY: number;
            /**
                * この文字の次の文字の開始位置までの幅。
                */
            advanceWidth: number;
            /**
                * `this.surface` が有効か否か。
                *
                * `this.surface` が破棄された、または生成後に書き換えられた時は偽。
                */
            isSurfaceValid: boolean;
            /**
                * @ignore
                * 利用側で使うためにプロパティとして予約しておく。 null で初期化されねばならない。
                */
            _atlas: unknown;
    }
}

declare module '@akashic/pdi-types/font/GlyphFactory' {
    import { FontWeightString } from "@akashic/pdi-types/font/FontWeightString";
    import { Glyph } from "@akashic/pdi-types/font/Glyph";
    /**
        * グリフファクトリ。
        *
        * `DynamicFont` はこれを利用してグリフを生成する。
        *
        * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
        */
    export interface GlyphFactory {
            /**
                * フォントファミリ。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            fontFamily: string | string[];
            /**
                * フォントサイズ。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            fontSize: number;
            /**
                * ベースライン。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            baselineHeight: number;
            /**
                * フォント色。CSS Colorで指定する。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            fontColor: string;
            /**
                * フォントウェイト。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            fontWeight: FontWeightString;
            /**
                * 輪郭幅。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            strokeWidth: number;
            /**
                * 輪郭色。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            strokeColor: string;
            /**
                * 輪郭を描画しているか否か。
                *
                * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更すべきではない。
                */
            strokeOnly: boolean;
            /**
                * グリフの生成。
                *
                * `DynamicFont` はこれを用いてグリフを生成する。
                *
                * @param code 文字コード
                */
            create(code: number): Glyph;
    }
}

declare module '@akashic/pdi-types/platform/Looper' {
    /**
        * 定期実行処理。
        * 自身に紐付けられた関数を定期的に呼び出すだけの型。
        */
    export interface Looper {
            /**
                * 定期実行の開始。
                * 自身に紐付けられた関数を任意の頻度で呼び出す。
                */
            start(): void;
            /**
                * 定期実行の停止。
                * `start()` で開始された定期実行を停止する。`start()` が呼び出されていない時の動作結果は不定である。
                * このメソッドは、自身に紐付けられた関数の実行中に呼び出された場合でも正しく動作せねばならない。
                */
            stop(): void;
    }
}

declare module '@akashic/pdi-types/platform/OperationPluginView' {
    /**
        * 操作プラグインが参照する、抽象化されたview。
        *
        * 各操作プラグインは、この値に加えたevent listenerを元にoperationTriggerをfireしてよい。
        */
    export interface OperationPluginView {
            /**
                * イベントリスナを追加する。
                *
                * @param type listenするタイプ。利用可能な文字列は環境に依存する
                * @param callback イベントリスナ
                * @param useCapture capturing phaseで発火するか。通常、この引数を指定する必要はない
                */
            addEventListener(type: string, callback: (event: any) => any, useCapture?: boolean): void;
            /**
                * イベントリスナを削除する。
                *
                * @param type 削除するイベントリスナのタイプ
                * @param callback 削除するイベントリスナ
                * @param useCapture capturing phaseで発火するか。通常、この引数を指定する必要はない
                */
            removeEventListener(type: string, callback: (event: any) => any, useCapture?: boolean): void;
    }
}

declare module '@akashic/pdi-types/platform/OperationPluginViewInfo' {
    import { OperationPluginView } from "@akashic/pdi-types/platform/OperationPluginView";
    /**
        * 操作プラグインが参照する、抽象化されたviewの情報。
        */
    export interface OperationPluginViewInfo {
            /**
                * 抽象化されたview。
                */
            view: OperationPluginView;
            /**
                * このviewのタイプ。
                * `null` または `undefined` の場合、`view` はDOMのHTMLElementと互換であると期待してよい。
                */
            type?: string;
    }
}

declare module '@akashic/pdi-types/platform/Platform' {
    import { AMFlow } from "@akashic/amflow";
    import { Surface } from "@akashic/pdi-types/surface/Surface";
    import { Looper } from "@akashic/pdi-types/platform/Looper";
    import { OperationPluginViewInfo } from "@akashic/pdi-types/platform/OperationPluginViewInfo";
    import { PlatformEventHandler } from "@akashic/pdi-types/platform/PlatformEventHandler";
    import { RendererRequirement } from "@akashic/pdi-types/platform/RendererRequirement";
    import { ResourceFactory } from "@akashic/pdi-types/platform/ResourceFactory";
    /**
        * Platform: PDIの主要なインターフェース。
        *
        * PDIの実装者はこのインターフェースを満たすものを定義すればよい。
        */
    export interface Platform {
            /**
                * Playlog 送受信ルーチン。
                */
            amflow: AMFlow;
            /**
                * プラットフォーム上で発生したイベントのハンドラを設定する。
                *
                * 複数回呼び出された場合、最後の呼び出しで与えられたハンドラのみが利用される。
                * @param handler 設定するハンドラ
                */
            setPlatformEventHandler(handler: PlatformEventHandler): void;
            /**
                * game.json を読み込む。
                *
                * 読み込みが成功した場合、`callback` が呼び出され、`err` に `null` が渡される。
                * 読み込みが失敗した場合、`callback` が呼び出され、`err` に `Error` のインスタンスが渡される。
                *
                * @param url 読み込むgame.jsonのURL
                * @param callback 読み込み結果を与えるコールバック
                */
            loadGameConfiguration(url: string, callback: (err: any, configuration: any) => void): void;
            /**
                * このプラットフォームのRendererに対する要求を通知する。
                *
                * このメソッドの呼び出しは `getPrimarySurface()` および `getResourceFactory().createSurface()` の振る舞いに影響を与える。
                * 実装者は、このメソッドの呼び出し時、前回の呼び出し後に取得・生成された全ての `Surface` を `destroy()` してはならない。
                * また、実装者はこのメソッドの2度目以降の呼び出し時、プライマリサーフェスを `destroy()` させなければならない。
                * 引数が省略された場合、実装は Renderer に紐づくデータを解放してよい。
                * @param param Rendererに対する要求
                */
            setRendererRequirement(requirement?: RendererRequirement): void;
            /**
                * プライマリサーフェスを取得する。
                * 実装者は、このメソッドの呼び出し以前に、 `setRendererRequirement()` が呼び出されていると仮定してよい。
                */
            getPrimarySurface(): Surface;
            /**
                * ResourceFactoryを取得する。
                * 実装者は、このメソッドの呼び出し以前に、 `setRendererRequirement()` が呼び出されていると仮定してよい。
                */
            getResourceFactory(): ResourceFactory;
            /**
                * OperationPluginViewInfoを取得する。
                *
                * このメソッドの戻り値が操作プラグインに渡される。
                * このメソッドが省略された場合、操作プラグインには代わりに `null` が渡される。
                * 実装者は、このメソッドの呼び出し以前に、 `setRendererRequirement()` が呼び出されていると仮定してよい。
                */
            getOperationPluginViewInfo?(): OperationPluginViewInfo;
            /**
                * 定期実行処理を作成する。
                *
                * 引数に与えられた関数 `fun` を定期的に呼び出す `Looper` を作成する。
                * `fun` は、引数として前回呼び出された時点からの経過時間[ms]が与えられる。
                * `fun` は前回の呼び出し時から、前回の呼び出し時の戻り値[ms]分の時間が経過していない場合、副作用を持つ処理を行ってはならない。
                *
                * @param fun 定期的に呼び出す関数
                */
            createLooper(fun: (deltaTime: number) => number): Looper;
            /**
                * 外部への情報送信。
                *
                * ゲーム開発者に「外部への情報送信」として提供される機能。その実態はPDIの実装者に委ねられる。
                * 通常の用途の場合、一つのプレイにおいて、この関数が実際になんらかの動作を行うエンジンインスタンスは、高々一つであることが期待されると思われる。
                * エンジンはその性質を保証しない。必要であればPDIまたはエンジンの利用者(アプリケーション)が担保すること。
                *
                * @param playId 情報送信を要求したプレイのID
                * @param data 送信するデータ
                */
            sendToExternal(playId: string, data: any): void;
            /**
                * コンテンツ中の全リソースの削除を行う。
                */
            destroy?(): void;
    }
}

declare module '@akashic/pdi-types/platform/PlatformEventHandler' {
    import * as pl from "@akashic/playlog";
    import { PlatformPointEvent } from "@akashic/pdi-types/platform/PlatformPointEvent";
    /**
        * プラットフォームで生じたイベントの受付口。
        */
    export interface PlatformEventHandler {
            /**
                * イベントの発生を通知する。
                *
                * @param pev 追加するイベント
                */
            onEvent(pev: pl.Event): void;
            /**
                * プラットフォームのポイントイベントの発生を通知する。
                *
                * PDI は `pl.PointDownEvent` などを作成できないので、代わりにこちらを用いる。
                * (PDI では `pl.PointDownEvent#5` (イベントが発生した位置にあるエンティティのID) などを解決することができない。)
                * @param ev: 追加するイベント
                */
            onPointEvent(ev: PlatformPointEvent): void;
    }
}

declare module '@akashic/pdi-types/platform/PlatformPointEvent' {
    import { CommonOffset } from "@akashic/pdi-types/commons";
    /**
        * ポイントイベントの種類。
        */
    export const enum PlatformPointType {
            Down = 0,
            Move = 1,
            Up = 2
    }
    /**
        * プラットフォームのポイントイベント。
        *
        * 利用側で `g.PointDownEvent` などに変換される、プラットフォームのポイントイベント。
        * `g.PointDownEvent` などと異なるのは、ターゲットエンティティ(`target`)が解決されていないという点である。
        * (ターゲットエンティティやローカルフラグは `g.Game` を参照しないと解決できない。このレイヤではそれらに関知しない。)
        */
    export interface PlatformPointEvent {
            /**
                * ポイントイベントの種類。
                */
            type: PlatformPointType;
            /**
                * (同時に発生しうる)ポイントイベントを区別する識別子。
                */
            identifier: number;
            /**
                * ポイントイベントの生じた位置。
                * プライマリサーフェスの左上を原点とする。
                */
            offset: CommonOffset;
    }
}

declare module '@akashic/pdi-types/platform/RendererRequirement' {
    /**
        * Rendererへの要求事項。
        */
    export interface RendererRequirement {
            /**
                * プライマリサーフェスの幅。
                */
            primarySurfaceWidth: number;
            /**
                * プライマリサーフェスの高さ。
                */
            primarySurfaceHeight: number;
            /**
                * Rendererのタイプ。
                * 優先度の高いものから順に指定される。
                */
            rendererCandidates?: string[];
    }
}

declare module '@akashic/pdi-types/platform/ResourceFactory' {
    import { AudioAsset } from "@akashic/pdi-types/asset/audio/AudioAsset";
    import { AudioAssetHint } from "@akashic/pdi-types/asset/audio/AudioAssetHint";
    import { AudioPlayer } from "@akashic/pdi-types/asset/audio/AudioPlayer";
    import { AudioSystem } from "@akashic/pdi-types/asset/audio/AudioSystem";
    import { ImageAsset } from "@akashic/pdi-types/asset/image/ImageAsset";
    import { ScriptAsset } from "@akashic/pdi-types/asset/script/ScriptAsset";
    import { TextAsset } from "@akashic/pdi-types/asset/text/TextAsset";
    import { VideoAsset } from "@akashic/pdi-types/asset/video/VideoAsset";
    import { VideoSystem } from "@akashic/pdi-types/asset/video/VideoSystem";
    import { FontWeightString } from "@akashic/pdi-types/font/FontWeightString";
    import { GlyphFactory } from "@akashic/pdi-types/font/GlyphFactory";
    import { Surface } from "@akashic/pdi-types/surface/Surface";
    /**
        * リソースの生成を行うインターフェース。
        *
        * このクラス (の実装クラス) のインスタンスはエンジンによって生成される。ゲーム開発者が生成する必要はない。
        * またこのクラスの各種アセット生成メソッドは、エンジンによって暗黙に呼び出されるものである。
        * 通常ゲーム開発者が呼び出す必要はない。
        */
    export interface ResourceFactory {
            createImageAsset(id: string, assetPath: string, width: number, height: number): ImageAsset;
            createVideoAsset(id: string, assetPath: string, width: number, height: number, system: VideoSystem, loop: boolean, useRealSize: boolean): VideoAsset;
            createAudioAsset(id: string, assetPath: string, duration: number, system: AudioSystem, loop: boolean, hint: AudioAssetHint): AudioAsset;
            createTextAsset(id: string, assetPath: string): TextAsset;
            createAudioPlayer(system: AudioSystem): AudioPlayer;
            createScriptAsset(id: string, assetPath: string): ScriptAsset;
            /**
                * Surface を作成する。
                * 与えられたサイズで、ゲーム開発者が利用できる描画領域 (`Surface`) を作成して返す。
                * 作成された直後のSurfaceは `Renderer#clear` 後の状態と同様であることが保証される。
                * @param width 幅(ピクセル、整数値)
                * @param height 高さ(ピクセル、整数値)
                */
            createSurface(width: number, height: number): Surface;
            /**
                * GlyphFactory を作成する。
                *
                * @param fontFamily フォントファミリ。フォント名、またはそれらの配列で指定する。
                * @param fontSize フォントサイズ
                * @param baselineHeight 描画原点からベースラインまでの距離。生成する `g.Glyph` は
                *                       描画原点からこの値分下がったところにベースラインがあるかのように描かれる。省略された場合、 `fontSize` と同じ値として扱われる
                * @param fontColor フォントの色。省略された場合、 `"black"` として扱われる
                * @param strokeWidth ストローク(縁取り線)の幅。省略された場合、 `0` として扱われる
                * @param strokeColor ストロークの色。省略された場合、 `"black"` として扱われる
                * @param strokeOnly ストロークのみを描画するか否か。省略された場合、偽として扱われる
                * @param fontWeight フォントウェイト。省略された場合、 `"normal"` として扱われる
                *
                * `fontFamily` に指定できる値は環境に依存する。
                * 少なくとも `"sans-serif"`, `"serif"`, `"monospace"` (それぞれサンセリフ体、セリフ体、等幅の字体) は有効な値である。
                * ただし `fontFamily` は参考値であり、環境によってはそれらの字体で描かれるとは限らない。
                */
            createGlyphFactory(fontFamily: string | string[], fontSize: number, baselineHeight?: number, fontColor?: string, strokeWidth?: number, strokeColor?: string, strokeOnly?: boolean, fontWeight?: FontWeightString): GlyphFactory;
    }
}

