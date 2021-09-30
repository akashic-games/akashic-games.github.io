<p align="center">
<img src="img/akashic.png"/>
</p>

# collision-js

collision-js は算術ライブラリを含むコリジョンライブラリです。[Akashic Engine](https://akashic-games.github.io/)上での利用を念頭に開発されていますが、単体での利用も可能となっています。

以下の機能があります。

- コリジョン
    - 以下のシェイプ間の交差判定。
        - 点
        - 円
        - 有向ボックス
        - 軸平行ボックス
        - 直線
        - 線分
        - 凸多角形
- 算術
    - ２次元と３次元のベクトル。
    - ２行２列と３行３列の行列。

詳しくはAPIリファレンスを参照ください。

## 利用方法

[Akashic Engine](https://akashic-games.github.io/)で利用する手順を説明します。

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install @akashic-extension/collision-js
```

でインストールできます。コンテンツからは、

```javascript
var co = require("@akashic-extension/collision-js");
```

で利用してください。

Akashic Engineの詳細な利用方法については、 [公式ページ](https://akashic-games.github.io/) を参照してください。

## サンプル

`sample` ディレクトリにサンプルが用意されています。詳細はサンプルの `README.md` を参照してください。

## APIリファレンス

https://akashic-games.github.io/reference/collision-js/index.html

## ビルド方法

collision-js は TypeScript で書かれたライブラリであるため、ビルドには Node.js が必要です。

```sh
npm install
npm run build
```

## ライセンス

本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](./LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
