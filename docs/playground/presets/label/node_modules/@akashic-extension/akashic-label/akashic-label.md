# akashic-labelの利用方法

akashic-label は、Akashic Engine でルビ文字や複数行のテキスト描画を行うための `Label` クラスを提供するライブラリです。
この文書では akashic-label の利用方法をまとめます。

[sample/ ディレクトリ](./sample/) に本モジュールを使ったサンプルコンテンツが置いてあります。
具体的な利用例についてはそちらを参照してください。

**注意**: 現在の Akashic Engine(akashic-engine@1.10.1 以降) には、このライブラリと同名の `Label` クラスが存在します ( `g.Label` ) 。
akashic-label は、Akashic Engine の `g.Label`, `g.MultiLineLabel` (v2.0.0 で廃止) の高機能版です。
このドキュメントで断りなく「ラベル」「 `Label` 」と書いてある場合、 akashic-label の `Label` を指します。

## 準備

Akashic を使ったゲーム開発の準備が終わっていない場合は [Akashic Engine 入門](https://akashic-games.github.io/tutorial/tutorial.html) を参照してゲーム開発の環境を整えてください。

インストールには akashic-cli を使用します。
game.json が置かれているディレクトリで以下のコマンドを実行してください。

```sh
akashic install @akashic-extension/akashic-label
```

このコマンドは `npm install --save @akashic-extension/akashic-label` を行い、その後 game.json の globalScripts フィールドを更新します。
(game.json の詳細は [game.jsonの仕様](https://akashic-games.github.io/guide/game-json.html) を参照してください)

akashic-label を利用したいシーンで以下の様に `require` を行います。

```javascript
var al = require("@akashic-extension/akashic-label");
```

本ドキュメントのサンプルコードでは、 akashic-label の機能は `al` 変数を経由して呼び出すことになります。

## 初期化

akashic-label は Akashic Engine の `g.Label` と同じインターフェイスを持ちます (akashic-engine@1.10.1 現在) 。
よって、既に Akashic Engine の `g.Label` を利用している箇所では、これを akashic-label に置き換えることができます。

```javascript
var label = new al.Label({
    scene: scene,
    text: "Hello!",
    font: bmpfont,
    fontSize: 30,
    width: 180
});
scene.append(label);
// サンプルコードにおける `scene` と `bmpfont` は、それぞれ `g.Scene` と `g.BitmapFont` の値とします。
```

## ルビ

akashic-label ではルビをサポートしています。ラベルは、 `text` プロパティ中の特定の記述をルビの指定として解釈します。
ルビの指定方法は、通常は以下のように指定します。

```javascript
var text = '{"rt":"コーヒー","rb":"珈琲"}を飲む。';
var label = new al.Label({
    scene: scene,
    text: text,
    font: bmpfont,
    fontSize: 30,
    width: 200,
    lineBreak: false
});
```

`rt` (ruby text) はルビを表し、 `rb` (ruby base) は本文を表します。

ルビは途中で改行されません。 `width` 幅に収まらない場合、ルビの手前で自動改行されます。
`rt` 、 `rb` 内に改行記号を含めることはできません。ルビの途中で改行したい場合は、複数に分割したルビを記述します。

```javascript
var text = '{"rb": "車", "rt": "しゃ"}{"rb": "掌", "rt": "しょう"}';
```

### ルビ設定

ルビのスタイルを指定するには、ラベルの `rubyOptions` プロパティを使用します。
設定項目は `rubyFontSize` 、 `rubyFont` 、 `rubyGap` 、 `RubyAlign` があります。
それぞれ「ルビのフォントサイズ」「ルビのフォント」「ルビと本文の間隔」「ルビのアライン」を表します。

```javascript
var text = '{"rt":"コーヒー","rb":"珈琲"}を飲む。';
var label = new al.Label({
    scene: scene,
    text: text,
    font: bmpfont,
    fontSize: 30,
    width: 200,
    lineBreak: false,
    rubyOptions: {
        rubyFontSize: 10,
        rubyFont: rubyFont,
        rubyGap: 2,
        rubyAlign: al.RubyAlign.Center
    }
});
// サンプルコードにおける `rubyFont` は、 `g.Bitmapfont` の値とします。
```

各設定については akashic-label の [APIリファレンス](https://akashic-games.github.io/reference/akashic-label/index.html) 内の `RubyOptions` のページ、または [sample/ ディレクトリ](./sample/) 内のサンプルコードを参照してください。

また、１つのラベル内に複数のルビが含まれる場合、ルビ毎に別の設定を適用することができます。
```javascript
var text = '{"rb": "珈琲", "rt": "コーヒー", "rubyAlign":' + al.RubyAlign.Center + '}' +
             '{"rb": "紅茶", "rt": "こうちゃ", "rubyAlign":' + al.RubyAlign.SpaceAround + ', rubyFontSize: ' + 5 + '}';
```

個別の設定がされなかった場合は、そのラベルインスタンス共通のルビ設定 (`Label#rubyOptions`) が適用されます。

### 描画される文字幅がruby text > ruby baseの場合

ルビ幅が本文よりも広い場合、ルビ幅に合わせて本文の左右に余白が入ります。ルビは前後の本文にかかりません。

### エスケープ文字

開き括弧、閉じ括弧、スラッシュ、バックスラッシュはエスケープ文字を使って表現します。

|表示|  `{`  |  `}`  | `/`  | `\`  |
|----|-------|-------|------|------|
|入力|`"\\{"`|`"\\}"`|`"\/"`|`"\\"`|

ただし、後述する独自のパーサ関数を利用する場合、エスケープ文字の仕様は利用するパーサ関数に依存します。

## 改行

akashic-label は自動改行と任意改行をサポートしています。

自動改行はデフォルトで有効化されています。
自動改行が有効な場合、文字の描画位置が `width` 幅を超える時、その文字の手前に改行が挿入されます。
この機能はコンストラクタ、またはインスタンスの `lineBreak` プロパティに偽を設定することで無効にすることができます。

```javascript
var label = new al.Label({
    scene: scene,
    text: "1行目\r2行目",
    font: bmpfont,
    fontSize: 30,
    width: 180,
    lineBreak: false
});
...
label.lineBreak = false;
label.invalidate();
```

ラベルのtextプロパティに改行記号が含まれている場合、その位置で改行されます。 `\r` 、 `\n` 、 `\r\n` が改行記号として扱われます。

### 行間

各行の行間は `lineGap` で指定します。初期値は0であり、最小値で本文の `fontSize * (-1)` 、最大値に制限はありません。

lineGap が指定するのは、ある行の下端と、その次の行の上端の間隔です。行の上端とは、ルビがあればルビの上端であり、ルビがなければ本文の上端です。
よって、実際の行間はルビの有無・ルビ設定によって変化します。次の行にルビがない場合の実際の行間は `lineGap` となり、次の行にルビがある場合は `(lineGap + rubyFontSize + rubyGap)` で算出されます。

ただし、 `fixLineGap` に真を代入すると、次の行のルビの有無を問わず、全ての行において実際の行間を `(lineGap + rubyFontSize + rubyGap)` として描画します。この場合、行間の大きさは全ての行で同一になります。

## その他

### 独自のパーサ関数利用

akashic-label は、ルビの指定を解釈するパーサ関数が独立しており、パーサ関数を切り替えて任意の指定方法を使うことができます。
パーサ関数を変更するには、ラベルのコンストラクタ、またはインスタンスの `rubyParser` プロパティに `function(text: string): Fragment[]` 型の関数を指定します。

また、ラベルのコンストラクタ、またはインスタンスの `rubyEnabled` プロパティに偽を設定することで、ルビを指定する記述をルビとして解釈しないよう変更することができます。

### 禁則処理

akashic-label は自動改行の振る舞いをカスタマイズすることができます。この機能を利用して、行末・行頭に配置される文字を制御し、禁則処理を実現することができます。

禁則処理を行うには、ラベルのコンストラクタ引数、またはインスタンスの `lineBreakRule` プロパティに `(fragments: Fragment[], index: number) => number` 型の関数を指定します。
この関数は改行位置を算出するたびに呼び出され、 akashic-label が算出した改行位置を上書きすることができます。

`lineBreakRule` の第一引数 `fragments` には、1文字ずつ・1ルビブロックごとに分解された文字とルビブロックの混合した配列が与えられます。
例として、 `"これは{"rb": "ルビ", "rt": "るび"}です"` というテキストの改行位置を算出する場合、 `fragments` には `["こ", "れ", "は", {rb: "ルビ", rt: "るび"}, "で", "す"]` が与えられます。

`lineBreakRule` の第二引数 `index` は akashic-label が算出した改行位置です。 `fragments[index]` は `index` の位置で改行したとき、次の行の先頭に来る文字です。
例として、`"一行目二行目"` というテキストが1行に3文字ずつ描画される場合、 `index` には `3` が与えられ、 `fragments[index]` は `"二"` になります。

`lineBreakRule` の戻り値は整数でなければならず、 `index` に代わる改行位置として扱われます。

例として、この関数は以下のように指定します。

```
var sampleRule = function (fragments, index) {
    const ngHead = ["」", "』", "】"];
    const ngTail = ["「", "『", "【"];
    const next = fragments[index];
    if (typeof next !== "string") return index;
    const isNextNg = ngHead.indexOf(next) !== -1;
    if (isNextNg) {
        return index + 1;
    } else {
        const prev = fragments[index-1];
        if (typeof prev !== "string") return index;
        const isPrevNg = ngHead.indexOf(prev) !== -1;
        if (!!prev && isPrevNg) {
            return index;
        } else if (!!prev && ngTail.indexOf(prev) !== -1) {
            return index - 1;
        }
        return index;
    }
}
var label = new Label({
    scene: scene,
    text: text,
    font: font,
    fontSize: 15,
    textAlign: g.TextAlign.Left,
    width: game.width,
    lineBreak: true,
    lineBreakRule: sampleRule
});
```

`sampleRule()` には、 `index` に akashic-label が算出した改行位置が渡されます。 `sampleRule()` では、この文字を `next` に格納しています。
この文字は改行された新しい行の１文字目に配置されます。よって、もし `"」"` が行頭に配置される場合、 `sampleRule()` は `index + 1` を返します。改行位置を1文字分後ろにずらすことで、行頭に `"」"` が配置されることを回避しています。

同様に、 行末に配置されようとしている文字は `prev` に格納されます。その文字が `"「"` だった場合、 `sampleRule()` は `index -1` を返します。改行位置を1文字分前にずらすことで、行末に `"」"` が配置されることを回避しています。
