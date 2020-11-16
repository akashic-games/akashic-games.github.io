/*v3.0.0-beta.2

*/

declare module '@akashic-extension/akashic-label' {
    export import Label = require("@akashic-extension/akashic-label/Label");
    export import LabelParameterObject = require("@akashic-extension/akashic-label/LabelParameterObject");
    export import FragmentDrawInfo = require("@akashic-extension/akashic-label/FragmentDrawInfo");
    export import RubyParser = require("@akashic-extension/akashic-label/RubyParser");
    export import Fragment = RubyParser.Fragment;
    export import RubyFragment = RubyParser.RubyFragment;
    export import RubyAlign = RubyParser.RubyAlign;
    export import RubyOptions = RubyParser.RubyOptions;
    import DRP = require("@akashic-extension/akashic-label/DefaultRubyParser");
    export import defaultRubyParser = DRP.parse;
}

declare module '@akashic-extension/akashic-label/Label' {
    import LabelParameterObject = require("@akashic-extension/akashic-label/LabelParameterObject");
    import rp = require("@akashic-extension/akashic-label/RubyParser");
    /**
        * 複数行のテキストを描画するエンティティ。
        * 文字列内の"\r\n"、"\n"、"\r"を区切りとして改行を行う。
        * また、自動改行が有効な場合はエンティティの幅に合わせて改行を行う。
        * 本クラスの利用にはg.Fontが必要となる。
        */
    class Label extends g.CacheableE {
            /**
                * 描画する文字列。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            text: string;
            /**
                * 描画に利用されるフォント。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            font: g.Font;
            /**
                * 文字列の描画位置。
                * 初期値は `"left"` である。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            textAlign: g.TextAlign | g.TextAlignString;
            /**
                * フォントサイズ。
                * 0 以上の数値でなければならない。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            fontSize: number;
            /**
                * 行間サイズ。
                * 初期値は0である。
                * -1 * fontSize 以上の数値でなければならない。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            lineGap: number;
            /**
                * 自動改行を行うかどうか。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            lineBreak: boolean;
            /**
                * 文字列の描画色をCSS Color形式で指定する。
                * 元の描画色に重ねて表示されるため、アルファ値を指定した場合は元の描画色が透けて表示される。
                * 初期値は `undefined` となり、 描画色の変更を行わない。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            textColor: string;
            /**
                * ルビを使うかどうか。
                * 初期値は真である。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            rubyEnabled: boolean;
            /**
                * ルビを持つ行と持たない行の行間を統一するかどうか。
                * 初期値は偽である。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            fixLineGap: boolean;
            /**
                * フォントの上端にある余白を描画するかどうか。
                * 真の場合、文字の描画内容が崩れない範囲で余白を詰めて描画される。
                * 初期値は偽である。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            trimMarginTop: boolean;
            /**
                * `width` プロパティを `this.text` の描画に必要な幅の値に自動的に更新するかを表す。
                * `width` プロパティの更新は `this.invalidate()` を呼び出した後のタイミングで行われる。
                * `textAlign` を `"left"` 以外にする場合、この値は `false` にすべきである。
                * `textAlign` が `"left"` 以外かつ、 この値が `true` の場合、描画内容は不定である。
                * 初期値は偽である。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            widthAutoAdjust: boolean;
            /**
                * ルビを解釈するパーサ。
                * 初期値は DefaultRubyParser.ts で定義している parse() 関数である。
                * 任意の文法でルビを記述する場合、この値に適切な関数を指定する必要がある。
                * この値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            rubyParser: rp.RubyParser;
            /**
                * ルビのレイアウト設定。
                * 個別のルビに `this.rubyOptions` の各プロパティと同名のプロパティが存在する場合、個別のルビの設定が優先される。
                *
                * rubyFontSize: ルビのフォントサイズ。初期値は `this.fontSize / 2` である。
                * rubyFont: ルビのビットマップフォント。初期値は `this.font` である。
                * rubyGap: ルビと本文の行間。初期値は0である。
                * rubyAlign: ルビのレイアウト。初期値は `RubyAlign.SpaceAround` である。
                *
                * これらの値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
                */
            rubyOptions: rp.RubyOptions;
            /**
                * 禁則処理の挙動を指定する関数。
                */
            lineBreakRule: rp.LineBreakRule;
            _beforeText: string;
            _beforeFont: g.Font;
            _beforeLineBreak: boolean;
            _beforeFontSize: number;
            _beforeTextAlign: g.TextAlign | g.TextAlignString;
            _beforeWidth: number;
            _beforeRubyEnabled: boolean;
            _beforeFixLineGap: boolean;
            _beforeTrimMarginTop: boolean;
            _beforeWidthAutoAdjust: boolean;
            _beforeRubyOptions: rp.RubyOptions;
            /**
                * 各種パラメータを指定して `Label` のインスタンスを生成する。
                * @param param このエンティティに対するパラメータ
                */
            constructor(param: LabelParameterObject);
            /**
                * このエンティティの描画キャッシュ無効化をエンジンに通知する。
                * このメソッドを呼び出し後、描画キャッシュの再構築が行われ、各 `g.Renderer` に描画内容の変更が反映される。
                */
            invalidate(): void;
            renderCache(renderer: g.Renderer): void;
            /**
                * 利用している `g.Surface` を破棄した上で、このエンティティを破棄する。
                * 利用している `g.Font` の破棄は行わないため、 `g.Font` の破棄はコンテンツ製作者が明示的に行う必要がある。
                */
            destroy(): void;
            /**
                * 禁則処理によって行幅が this.width を超える場合があるため、 `g.CacheableE` のメソッドをオーバーライドする
                */
            calculateCacheSize(): g.CommonSize;
            /**
                * 描画内容の行数を返す
                */
            get lineCount(): number;
            _offsetX(width: number): number;
    }
    export = Label;
}

declare module '@akashic-extension/akashic-label/LabelParameterObject' {
    import rt = require("@akashic-extension/akashic-label/RubyParser");
    /**
        * `Label` のコンストラクタに渡すことができるパラメータ。
        */
    interface LabelParameterObject extends g.CacheableEParameterObject {
            /**
                * 描画する文字列。
                */
            text: string;
            /**
                * 描画に利用されるフォント。
                */
            font: g.Font;
            /**
                * フォントサイズ。
                * 0 以上の数値でなければならない。
                * これは `LabelParameterObject#font` に与えられたフォントを
                * `fontSize` フォントサイズ相当で描画するよう指示する値である。
                * 歴史的経緯によりフォントサイズと説明されているが、実際には拡大縮小率を求めるために用いられている。
                */
            fontSize: number;
            /**
                * 横幅。
                * `lineBreak` が真の場合、描画する文字列はこの幅に収まるよう改行される。
                */
            width: number;
            /**
                * 自動改行を行うかどうか。
                */
            lineBreak?: boolean;
            /**
                * 行間サイズ。
                * 初期値は0である。
                * -1 * fontSize 以上の数値でなければならない。
                */
            lineGap?: number;
            /**
                * 文字列の描画位置。
                * 初期値は `"left"` である。
                */
            textAlign?: g.TextAlign | g.TextAlignString;
            /**
                * 文字列の描画色をCSS Color形式で指定する。
                * 元の描画色に重ねて表示されるため、アルファ値を指定した場合は元の描画色が透けて表示される。
                * 初期値は `undefined` となり、 描画色の変更を行わない。
                */
            textColor?: string;
            /**
                * ルビを使うかどうか。
                * 初期値は真である。
                */
            rubyEnabled?: boolean;
            /**
                * ルビを持つ行と持たない行の行間を統一するかどうか。
                * 初期値は偽である。
                */
            fixLineGap?: boolean;
            /**
                * フォントの上端にある余白を描画するかどうか。
                * 真の場合、文字の描画内容が崩れない範囲で余白を詰めて描画される。
                * 初期値は偽である。
                */
            trimMarginTop?: boolean;
            /**
                * `width` プロパティを `this.text` の描画に必要な幅で自動的に更新するかを表す。
                * `textAlign` を `"left"` 以外にする場合、この値は `false` にすべきである。
                * (`textAlign` は `width` を元に描画位置を調整するため、 `true` の場合左寄せで右寄せでも描画結果が変わらなくなる)
                * 初期値は偽である。
                */
            widthAutoAdjust?: boolean;
            /**
                * ルビを解釈するパーサ。
                * 初期値は DefaultRubyParser.ts で定義している parse() 関数である。
                * 任意の文法でルビを記述する場合、この値に適切な関数を指定する必要がある。
                */
            rubyParser?: rt.RubyParser;
            /**
                * ルビのレイアウト設定。
                */
            rubyOptions?: rt.RubyOptions;
            /**
                * 禁則処理の挙動を指定する関数。
                *
                */
            lineBreakRule?: rt.LineBreakRule;
    }
    export = LabelParameterObject;
}

declare module '@akashic-extension/akashic-label/FragmentDrawInfo' {
    import rp = require("@akashic-extension/akashic-label/RubyParser");
    /**
        * 行に含まれる描画要素のうち、1つを表すインターフェース定義。
        */
    export type FragmentDrawInfo = StringDrawInfo | RubyFragmentDrawInfo;
    /**
        * 行に含まれる文字列要素。
        */
    export class StringDrawInfo {
            text: string;
            width: number;
            glyphs: g.Glyph[];
            constructor(text: string, width: number, glyphs: g.Glyph[]);
    }
    /**
        * 行に含まれるルビ要素。
        */
    export class RubyFragmentDrawInfo {
            text: string;
            fragment: rp.RubyFragment;
            width: number;
            rbWidth: number;
            rtWidth: number;
            glyphs: g.Glyph[];
            rubyGlyphs: g.Glyph[];
            constructor(fragment: rp.RubyFragment, width: number, rbWidth: number, rtWidth: number, glyphs: g.Glyph[], rubyGlyphs: g.Glyph[]);
    }
    /**
        * `Label`の行単位の描画情報を表すインターフェース定義。
        */
    export interface LineInfo {
            sourceText: string;
            width: number;
            height: number;
            minMinusOffsetY: number;
            surface: g.Surface;
            fragmentDrawInfoArray: FragmentDrawInfo[];
    }
}

declare module '@akashic-extension/akashic-label/RubyParser' {
    export interface RubyOptions {
            /**
                * ルビのフォントサイズ。
                */
            rubyFontSize?: number;
            /**
                * ルビのフォント。
                */
            rubyFont?: g.Font;
            /**
                * rtとrbの行間。
                */
            rubyGap?: number;
            /**
                * rtとrbの描画幅が短い要素を、長い要素に合わせてどのようにレイアウトするか。
                */
            rubyAlign?: RubyAlign;
    }
    export interface RubyFragment extends RubyOptions {
            /**
                * ベーステキスト（ruby base）。
                */
            rb: string;
            /**
                * ルビ（ruby text）。
                */
            rt: string;
            /**
                * コンストラクタに与えられた文字列。
                */
            text: string;
    }
    /**
        * 文字とルビに分解されたtext。文字は必ず1文字ずつに分解される。
        */
    export type Fragment = string | RubyFragment;
    export type RubyParser = (text: string) => Fragment[];
    export enum RubyAlign {
            /**
                * rtの字間は固定で中央に揃える。
                */
            Center = 0,
            /**
                * rb幅に合わせてrtの字間を揃える。
                */
            SpaceAround = 1
    }
    /**
        * 禁則処理の挙動を指定する関数。
        * @param fragments その行に含まれる予定のフラグメント
        * @param index その行で予定されている改行位置
        * @returns 禁則処理を適用した改行位置処理を適用した改行位置
        *
        */
    export type LineBreakRule = (fragments: Fragment[], index: number) => number;
    export function flatmap<T, U>(arr: T[], func: (e: T) => (U | U[])): U[];
}

declare module '@akashic-extension/akashic-label/DefaultRubyParser' {
    import rp = require("@akashic-extension/akashic-label/RubyParser");
    /**
      * 文字列からルビをパースする。
      * このパーサは、akashic-labelのデフォルトルビ記法のためのパーサである。
      *
      * このパーサを使う場合、ラベルに与える文字列にJSONのオブジェクトを表す文字列を含むことができる。
      * 文字列中のオブジェクトはルビを表す要素として扱われる。
      * オブジェクトのメンバーには、ルビを表す `rt` と、本文を表す `rb` を含む必要がある。
      * これらのメンバー以外に、RubyOptions型が持つメンバーを含むことができる。
      *
      * 入力の例として、
      * 'これは{"rb":"本文","rt":"ルビ", "rubyFontSize": 2}です。'
      * という文字列が与えられた場合、このパーサは
      * ["これは", {rb:"本文", rt: "ルビ", rubyFontSize: 2}, "です。"]
      * という配列を返す。
      * また、 `{` や `}` は `\\` でエスケープする必要がある。
      * 例として、括弧は `\\{` 、 バックスラッシュは `\\` を用いて表現する。
      * 注意すべき点として、オブジェクトのプロパティ名はダブルクォートでくくられている必要がある。
      */
    export function parse(text: string): rp.Fragment[];
}

