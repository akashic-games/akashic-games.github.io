# akashic-animation サンプル

これは `akashic-animation` の総合デモです。

## 実行方法

[akashic-sandbox](https://github.com/akashic-games/akashic-sandbox) をインストールして、
次の手順を実行後ブラウザで <http://localhost:3000/game/> を開いてください。

```sh
$ npm install
$ npm run build
$ akashic-sandbox .
```

## 内容

- 剣士の必殺技アニメーションの再生 (再生ボタン)
- ループ・非ループ再生の指定 (Loop ボタン)
- 当たり判定領域の可視化
- パーティクルとアタリ判定領域の交差テスト (Particle ボタン)
- 関節とボーン名の描画 (Bone ボタン)
- セルとコリジョンの動的設定 (サブ武器ボタン)
- ユーザデータ処理（コンソール出力）
- アニメーションハンドラによるアニメーション結果の上書き (Y 軸回転ボタン)

## 操作方法

各機能は画面上部のトグルボタンをクリックすることで操作できます。
