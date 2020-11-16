<p align="center">
<img src="img/akashic.png"/>
</p>

# akashic-label

**akashic-label** は、[Akashic Engine](https://akashic-games.github.io/) 用のテキスト描画ライブラリです。
Akashic Engine 標準の `g.Label` と同様の機能に加え、次の機能を提供します。

* ルビつき文字列の描画
* 複数行のテキスト配置

## 利用方法

[akashic-cli](https://github.com/akashic-games/akashic-cli) でインストールして利用します。
Akashic Engineの詳細な利用方法については、 [公式ページ](https://akashic-games.github.io/) を参照してください。

```
akashic install @akashic-extension/akashic-label
```

インストール後、ゲームスクリプトから `require()` して利用してください。

```
var al = require("@akashic-extension/akashic-label")
```

使い方は [akashic-labelの利用方法](./akashic-label.md) を参照してください。
詳細なリファレンスは [APIリファレンス](https://akashic-games.github.io/reference/akashic-label/index.html) を参照してください。

## ビルド方法

**akashic-label** はTypeScriptで書かれたライブラリであるため、ビルドにはNode.jsが必要です。

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
