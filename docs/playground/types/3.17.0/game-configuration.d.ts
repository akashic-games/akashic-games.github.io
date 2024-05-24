/*
v2.1.0
*/
// Dependencies for this module:
//   ../../../../@akashic/pdi-types

declare module '@akashic/game-configuration' {
    export * from "@akashic/game-configuration/AssetConfiguration";
    export * from "@akashic/game-configuration/GameConfiguration";
    export * from "@akashic/game-configuration/OperationPluginInfo";
}

declare module '@akashic/game-configuration/AssetConfiguration' {
    import type { AudioAssetHint, ImageAssetHint, VectorImageAssetHint, CommonArea } from "@akashic/pdi-types";
    /**
        * アセット宣言
        */
    export type AssetConfigurationMap = {
            [key: string]: AssetConfiguration;
    };
    /**
        * require()解決用のエントリポイント
        */
    export type ModuleMainScriptsMap = {
            [path: string]: string;
    };
    /**
        * AudioSystemの設定を表すインターフェース。
        */
    export interface AudioSystemConfiguration {
            loop?: boolean;
            hint?: AudioAssetHint;
    }
    /**
        * オーディオシステム宣言
        */
    export type AudioSystemConfigurationMap = {
            [key: string]: AudioSystemConfiguration;
    };
    export type AssetConfiguration = AudioAssetConfigurationBase | ImageAssetConfigurationBase | TextAssetConfigurationBase | ScriptAssetConfigurationBase | VideoAssetConfigurationBase | VectorImageAssetConfigurationBase | BinaryAssetConfigurationBase;
    /**
        * Assetの設定の共通部分。
        */
    export interface AssetConfigurationCommonBase {
            /**
                * Assetの種類。
                */
            type: string;
    }
    /**
        * Assetの設定を表すインターフェース。
        * game.json の "assets" の各プロパティに記述される値の型。
        */
    export interface AssetConfigurationBase extends AssetConfigurationCommonBase {
            /**
                * Assetを表すファイルへの絶対パス。
                */
            path: string;
            /**
                * Assetを表すファイルのrequire解決用の仮想ツリーにおけるパス。
                * 省略するとエンジンにより自動的に設定される。
                */
            virtualPath?: string;
            /**
                * グローバルアセットか否か。省略された場合、偽。
                * この値が真であるアセットは、ゲームコンテンツから常に `Game#assets` 経由で参照できる。`Scene` のコンストラクタで利用を宣言する必要がない。
                */
            global?: boolean;
    }
    /**
        * CommonAreaの短縮表記。
        * 各要素は順に CommonArea の x, y, width, height に読み替えられる。
        */
    export type CommonAreaShortened = [number, number, number, number];
    /**
        * ImageAssetの設定。
        */
    export interface ImageAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "image";
            /**
                * 幅。
                */
            width: number;
            /**
                * 高さ。
                */
            height: number;
            /**
                * ヒント。akashic-engineが最適なパフォーマンスを発揮するための情報。
                */
            hint?: ImageAssetHint;
            /**
                * 切り出す領域。
                * 指定した場合、その部分だけの画像アセットとして扱う。
                */
            slice?: CommonArea | CommonAreaShortened;
    }
    /**
        * VideoAssetの設定。
        */
    export interface VideoAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "video";
            /**
                * 幅。
                */
            width: number;
            /**
                * 高さ。
                */
            height: number;
            /**
                * ループ。
                */
            loop?: boolean;
            /**
                * width,heightではなく実サイズを用いる指定。
                */
            useRealSize?: boolean;
    }
    /**
        * AudioAssetの設定。
        */
    export interface AudioAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "audio";
            /**
                * AudioAssetのsystem指定。
                */
            systemId: "music" | "sound";
            /**
                * 再生時間。単位はミリ秒。
                */
            duration: number;
            /**
                * ループ。
                */
            loop?: boolean;
            /**
                * ヒント。
                */
            hint?: AudioAssetHint;
            /**
                * 再生開始位置。単位はミリ秒。
                */
            offset?: number;
    }
    /**
        * TextAssetの設定。
        */
    export interface TextAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "text";
    }
    /**
        * ScriptAssetの設定。
        */
    export interface ScriptAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "script";
            /**
                * 他のアセットよりも優先して読み込むかどうか。
                * この値が真であるアセットは、エントリポイントよりも先行して実行される。
                * global が真ではないアセットを先行して読み込むことはできない。
                * preload が真のアセットが複数ある場合、それらの実行順序は保証されない点に注意。
                */
            preload?: boolean;
            /**
                * このアセットが公開する変数名の配列。指定された場合、 module.exports の一部を上書きする。
                * 通常は指定する必要のない値であるが、 CommonJS の形式で書かれていないスクリプトを利用するなどの際に用いることができる。
                * `["foo", "bar"]` を指定した場合、対象のスクリプトアセットの末尾に以下のコードが挿入されたかのように扱われる。
                * ```
                * exports["foo"] = foo;
                * exports["bar"] = bar;
                * ```
                */
            exports?: string[];
    }
    /**
        * VectorImageAssetの設定。
        */
    export interface VectorImageAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "vector-image";
            /**
                * 幅。
                */
            width: number;
            /**
                * 高さ。
                */
            height: number;
            /**
                * ヒント。
                */
            hint?: VectorImageAssetHint;
    }
    /**
        * BinaryAssetの設定。
        */
    export interface BinaryAssetConfigurationBase extends AssetConfigurationBase {
            /**
                * Assetの種類。
                */
            type: "binary";
    }
}

declare module '@akashic/game-configuration/GameConfiguration' {
    import type { AssetConfiguration, AssetConfigurationMap, AudioSystemConfigurationMap, ModuleMainScriptsMap } from "@akashic/game-configuration/AssetConfiguration";
    import type { OperationPluginInfo } from "@akashic/game-configuration/OperationPluginInfo";
    /**
        * ゲームの設定を表すインターフェース。
        * game.jsonによって定義される。
        */
    export interface GameConfiguration {
            /**
                * ゲーム画面の幅。
                */
            width: number;
            /**
                * ゲーム画面の高さ。
                */
            height: number;
            /**
                * ゲームのFPS。省略時は30。
                */
            fps?: number;
            /**
                * エントリポイント。require() できるパス。
                */
            main: string;
            /**
                * AudioSystemの追加定義。キーにsystem名を書く。不要(デフォルトの "sound" と "music" しか使わない)なら省略してよい。
                */
            audio?: AudioSystemConfigurationMap;
            /**
                * アセット宣言。
                */
            assets: AssetConfigurationMap | AssetConfiguration[];
            /**
                * 操作プラグインの情報。
                */
            operationPlugins?: OperationPluginInfo[];
            /**
                * スクリプトアセットの簡略記述用テーブル。
                *
                * グローバルアセットである *.js ファイル、*.json ファイルに限り、この配列にファイル名(コンテンツルートディレクトリから相対パス)を書くことができる。
                * ここにファイル名を書いた場合、 `assets` でのアセット定義は不要であり、拡張子 js であれば `ScriptAsset` として、
                * 拡張子 json であれば `TextAsset` として扱われる。また常に "global": true として扱われる。
                * ここに記述されたファイルのアセットIDは不定である。ゲーム開発者がこのファイルを読み込むためには、相対パスによる (`require()` を用いねばならない)
                */
            globalScripts?: string[];
            /**
                * require()解決用ののエントリポイントを格納したテーブル。
                *
                * require()の第一引数をキーとした値が本テーブルに存在した場合、require()時にその値をパスとしたスクリプトアセットを評価する。
                */
            moduleMainScripts?: ModuleMainScriptsMap;
            /**
                * デフォルトローディングシーンについての指定。
                * 省略時または "default" を指定すると `DefaultLoadingScene` を表示する。
                * "compact"を指定すると以下のようなローディングシーンを表示する。
                *   * 背景が透過
                *   * プログレスバーが画面中央ではなく右下の方に小さく表示される
                * デフォルトローディングシーンを非表示にしたい場合は "none" を指定する。
                */
            defaultLoadingScene?: "default" | "compact" | "none";
            /**
                * デフォルトのスキッピングシーンについての指定。
                * 省略時または "fast-forward" を指定するとスキップ中のシーン内容をそのまま早送りで表示する。
                * "indicator"を指定するとスキップ中に専用のシーンを表示する。
                * スキップ中の描画を抑制したい場合は "none" を指定する。
                */
            defaultSkippingScene?: "fast-forward" | "indicator" | "none";
            /**
                * 同時にポイント可能な上限を指定。
                * 指定された数以上のポイントが同時にされた場合、maxPoints目以降のポイントは全て無効となる。
                */
            maxPoints?: number;
            environment?: Environment;
    }
    export interface NormalizedGameConfiguration extends GameConfiguration {
            fps: number;
            assets: AssetConfigurationMap;
    }
    export interface GameConfigurationDefinitionDeclaration {
            /**
                * GameConfigurationの内容を得られるURL。
                */
            url: string;
            /**
                * GameConfigurationのpath, globalScriptsのパスの基準となるパス。
                * 指定されなかった場合、 `g.PathUtil.resolveDirname(this.url)` が与えられたものとみなされる。
                */
            basePath?: string;
    }
    export interface CascadeGameConfiguration {
            /**
                * `GameConfigurationDefinitionDeclaration` の配列。
                *
                * 指定された場合、この `GameConfiguration` は、指定された配列で得られた `GameConfiguration` を
                * すべてマージしたものであるかのように取り扱われる。この時このオブジェクトの他のプロパティは無視される。
                *
                * 配列の各要素には文字列を与えることもできる。
                * `path: string` は `{ url: path }: GameConfigurationDefinitionDeclaration` として解釈される。
                */
            definitions: (string | GameConfigurationDefinitionDeclaration)[];
    }
    export interface Environment {
            "sandbox-runtime"?: string;
            "akashic-runtime"?: AkashicRuntime | string;
            atsumaru?: AtsumaruEnvironment;
            nicolive?: NicoliveEnvironment;
            niconico?: NicoliveEnvironment;
            external?: External;
            features?: Features[];
    }
    export interface AkashicRuntime {
            version: string;
            flavor?: string;
    }
    export interface AtsumaruEnvironment {
            supportedModes?: AtsumaruSupportedModes[];
    }
    export interface NicoliveEnvironment {
            supportedModes?: NicoliveSupportedModes[];
            preferredSessionParameters?: PreferredSessionParameters;
    }
    export interface PreferredSessionParameters {
            totalTimeLimit?: number;
    }
    export type AtsumaruSupportedModes = "multi";
    export type NicoliveSupportedModes = "single" | "ranking" | "multi_admission" | "multi";
    export interface External {
            [key: string]: string;
    }
    export type Features = "WebAssembly";
}

declare module '@akashic/game-configuration/OperationPluginInfo' {
    /**
        * 操作プラグインのインスタンス生成に必要な情報。
        */
    export interface OperationPluginInfo {
            /**
                * このプラグインに割り当てるコード番号。
                * このプラグインが通知する操作から生成された `OperationEvent` が、 `code` にこの値を持つ。
                */
            code: number;
            /**
                * プラグインの定義を含むスクリプトファイルのパス。
                * スクリプトファイルではない経路で初期化された場合 `undefined` 。
                *
                * プラグインの定義を得るために、この値が require() に渡される。
                * 相対パスであるとき、その基準は game.json のあるディレクトリである。
                * また対応するスクリプトアセットは `"global": true` が指定されていなければならない。
                */
            script?: string;
            /**
                * プラグインを new する際に引き渡すオプション。
                */
            option?: any;
            /**
                * このプラグインを手動で `start()` するか否か。
                *
                * 真である場合、このプラグインの `start()` は暗黙に呼び出されなくなる。
                * 指定されなかった場合、偽。
                */
            manualStart?: boolean;
    }
}

