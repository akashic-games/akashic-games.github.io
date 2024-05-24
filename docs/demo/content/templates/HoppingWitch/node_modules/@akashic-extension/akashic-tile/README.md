<p align="center">
<img src="https://github.com/akashic-games/akashic-tile/blob/master/img/akashic.png">
</p>

# akashic-tile

**akashic-tile** は、 [Akashic Engine](https://akashic-games.github.io/) 用のタイルマップ描画ライブラリです。

例えば幅32、高さ32の画像を敷き詰めたマップチップ画像のアセット `mapchipImage` を持つシーン `scene` がある時、
マップチップを敷き詰めた画像(タイルマップ)を表示するエンティティを生成できます。

```
var tile = new at.Tile({
  scene: scene,
  src: scene.assets.mapchipImage,
  tileWidth:  32,
  tileHeight: 32,
  tileData: [
    [0, 1, 1, 0],
    [1, 2, 2, 1],
    [0, 0, 1, 0]
  ]
});
scene.append(tile);
```

ここで `tileData` の内容は、マップチップのインデックスです。
マップチップのインデックスとは、マップチップ画像の各マップチップに対して、左上を0として順に振られた番号です。
すなわちインデックス0はマップチップ画像の一番左上の幅32、高さ32の部分を表します。
インデックス1はその右隣の幅32、高さ32の部分を表します。

## 利用方法

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install @akashic-extension/akashic-tile
```

でインストールできます。コンテンツからは、

```javascript
var at = require("@akashic-extension/akashic-tile");
```

で利用してください。
詳細な利用方法については、以下を参照してください。

* [APIリファレンス](https://akashic-games.github.io/reference/akashic-tile/index.html)。
* このリポジトリ同梱の[サンプルコード](https://github.com/akashic-games/akashic-tile/tree/master/sample)
Akashic Engineの詳細な利用方法については、 [公式ページ](https://akashic-games.github.io/) を参照してください。

## ビルド方法

**akashic-tile**はTypeScriptで書かれたライブラリであるため、ビルドにはnode.jsが必要です。

`npm run build` によりビルドできます。

```sh
npm install
npm run build
```

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](./LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
