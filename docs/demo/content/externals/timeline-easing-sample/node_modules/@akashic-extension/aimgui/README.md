<p align="center">
<img src="img/akashic.png"/>
</p>

# AimGui

AimGui は [Akashic Engine](https://akashic-games.github.io/) のためのシンプルなGUIライブラリです。 [Dear ImGui](https://github.com/ocornut/imgui) にインスパイアされています。

以下のウィジェット(UI部品)が利用できます。

- ウインドウ
- モーダルウインドウ
- ラベル
- ボタン
- ラジオボタン
- チェックボックス
- スライダー
- テキストボックス
- 折りたたみ (collapsing)
- 水平配置 (horizontal)
- 空白 (margin)

## 使い方

ウインドウにラベル、スライダー、ボタンを表示する例を示します。

ウィジェットにはタイトルをつけます。これは他のウィジェットと区別するための識別子になります。そのため重複しないようにします。別のウインドウや折り畳みの中にあるウィジェットとは重複して構いません。例えば、二つのウインドウに "閉じる" というタイトルのボタンを配置することができます。

```typescript
// GUIで利用するフォント。
const font = new g.DynamicFont({
    game: g.game,
    size: 13,
    fontFamily: "monospace",
    fontColor: "white"
});

// GUI を表示する E 。
const guiE = new aimgui.GuiE({
    scene,
    width: g.game.width,
    height: g.game.height,
    font
});

scene.append(guiE);

// GUIで操作するデータ。
const gameSetting = {
    volume: 0.5,
};

// GUIの配置と応答の実装。
guiE.run = gui => {
    gui.window("Debug Tool") // ウインドウを配置。
        .position(16, 16) // 初期位置の指定。
        .size(240, 240) // 初期サイズの指定。
        .show(gui => { // 表示。
            // ラベルの表示。
            gui.label("サウンドテスト");
            // ボリュームを変更するスライダー。
            gui.slider("ボリューム", gameSetting, "volume", 0, 1);
            // 音声を再生するボタン。
            if (gui.button("再生")) {
                scene.asset.getAudio("/audio/se")
                    .play()
                    .changeVolume(gameSetting.volume);
            }
        });
};
```

![Debug Tool ウインドウ](./img/sample.gif "サンプル")

より詳しい使い方は、APIリファレンスと付属のサンプルを参照ください。

## 利用方法

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install @akashic-extension/aimgui
```

でインストールできます。コンテンツからは、

```javascript
var aimgui = require("@akashic-extension/aimgui");
```

で利用してください。

Akashic Engineの詳細な利用方法については、 [公式ページ](https://akashic-games.github.io/) を参照してください。

## サンプル

`sample` ディレクトリにサンプルが用意されています。詳細はサンプルの `README.md` を参照してください。

## APIリファレンス

https://akashic-games.github.io/reference/aimgui/index.html

## ビルド方法

aimgui は TypeScript で書かれたライブラリであるため、ビルドには Node.js が必要です。

```sh
npm install
npm run build
```

## ライセンス

本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](./LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています(サンプルで使用されている音声を除く)。
