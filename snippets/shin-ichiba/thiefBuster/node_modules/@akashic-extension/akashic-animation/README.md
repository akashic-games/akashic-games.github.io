<p align="center">
<img src="img/akashic-animation.png" />
</p>

# Akashic Animation

Akashic Animationは[Akashic Engine](https://akashic-games.github.io/)向けのアニメーションライブラリです。

## 利用方法

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install @akashic-extension/akashic-animation
```

でインストールできます。コンテンツからは、

```javascript
var aa = require("@akashic-extension/akashic-animation");
```

で利用してください。

Akashic Engineの詳細な利用方法については、 [公式ページ](https://akashic-games.github.io/) を参照してください。

## APIリファレンス
[こちら](https://akashic-games.github.io/reference/akashic-animation/index.html)。

## 補足
### ループアニメーションの補間
アニメーションをループ再生するとき、最後のフレームと最初のフレームの間は常に線形補間になります。

### キーフレームの外挿
再生するアニメーションの0フレーム目がキーフレームでない時、akashic-animationは0フレーム目に初期値を与えます。初期値は属性により異なります（次の表参照）。

| 属性                | 値         |
|:------------------- |:---------- |
| X,Y座標             | 0, 0       |
| Z回転               | 0          |
| X,Yスケール         | 1, 1       |
| ローカルX,Yスケール | 1, 1       |
| アルファ            | 1          |
| ローカルアルファ    | 無し       |
| セル                | 無し       |
| セル中心座標        | 0, 0       |
| セルUV              | 0, 0       |
| 優先順位            | 0          |
| 可視・不可視        | 可視       |
| 円アタリ判定半径    | 0          |
| 水平フリップ        | しない     |
| 垂直フリップ        | しない     |
| ユーザデータ        | 無し       |

最終フレームがキーフレームでない時も同様に値を与えます。この値は最後のキーフレームと同じ値になります。

### E#modified()とActor#calc()の順序
`Actor#calc()`はActor自体の座標や回転の値から導かれる行列を利用します。そのため、`Actor#calc()`の前に`Actor#modified()`を実行してください。さらに`Collider`は`Actor#calc()`の計算結果を利用します。

以上から、Actorを利用したプログラムはおよそ次のような順序で実行することになります。
```typescript
// アクターの更新
actor.x += 10;
actor.angle += 1;
actor.modified();

...

// アニメーションの更新
actor.calc();

...

// 当たり判定
actor.colliders.forEach(function(c) {
    var volume = c.getVolume();
    if (! volume) return;
    var aabb = volume.aabb();
    // 具体的な計算
});
```

### Attachment
`Attachment`は`Actor`のボーンに描画可能なオブジェクトをアタッチするクラスです。現在は`Actor`のスキンからセルを取り出し、それを任意のボーンにアタッチすることできます。

### Collider
`Collider`は衝突判定に必要な値を導出するクラスです。`asabn`ファイルにセルに基づいた当たり判定の情報が記述されている時、自動的に`BoneCellCollider`が生成されます。

`CellAttachmentCollider`は`CellAttachment`を衝突判定に利用するコライダーです。Actorにセルをアタッチした時、これで当たり判定を扱いたい時に利用してください。

`Collider`には`name`と`tag`の２つのプロパティがあります。`name`はコンバータによって使用される可能性があります。`BoneCellCollider`ではボーン名が設定されます。

`tag`はコンバータも`akashic-animation`も利用することはありません。衝突判定に必要な情報を紐付けるなどご利用ください。

### Volume
当たり判定の領域を表すクラスです。`Collider#getVolume()`を用いて取得できます。

`Volume#aabb()`でAABBを取得できます。

`Volume`にはいくつかの派生クラスがあります。Colliderの返す`Volue`の型を確認しダウンキャストすることでより具体的な情報が得られます。

`Volume#aabbFirst`フラグはDCCツールまたはプログラム中で設定されます。これは当たり判定でAABBを優先する（ダウンキャスト後の詳細な情報でなく）ことを示します。

### アニメーションの座標系
akashic-animationは `Actor#x,Actor#y` を原点とする座標系で描画されます。

### アニメーション計算ハンドラ
`Actor#calculated()`を用いることでアニメーションの計算結果を変更したり、ユーザデータを受け取ることが出来ます。

#### 標準的なハンドラの書き方 (JavaScript)
```js
actor.calculated("root", true).handle(this, function(param) { // rootボーンにハンドラ登録
    if (param.left.time === param.currentFrame && param.left.userData) {
        // 現在時刻のユーザデータが存在するとき、効果音を再生する
        playSound(param.left.userData.str);
    }
    if (param.posture) {
        // アニメーション計算結果を書き換え
        param.posture.attrs[AttrId.alpha] *= 0.5;
        // ハンドラはPosture#updateMatrix()を実行するかPosture#mに適切な値を格納する責任を持ちます
        param.posture.updateMatrix();
        // Posture#updateMatrix()の結果を書き換え
        param.posture.m._matrix[5] += 10;
    }
}, "root handler"); // g.Trigger.removeByName() でハンドラを削除するときに利用するハンドラ名
```

#### AnimationHandlerParam
登録されたハンドラには`AnimationHandlerParam`型のオブジェクトが渡されます。
```typescript
interface AnimationHandlerParam {
    posture?: Posture;
    left?: AnimationHandlerKeyFrameInfo;
    right?: AnimationHandlerKeyFrameInfo;
    currentFrame: number;
    frameCount: number;
 };
```

```typescript
interface AnimationHandlerKeyFrameInfo {
    time: number;
    userData?: any;
}
```

#### アニメーション計算ハンドラの実行タイミング
ハンドラが実行されるタイミングは２つあります。ハンドラ実行タイミングによって`AnimationHandlerParam`に格納される値が変わります。

* 各ボーンのアニメーション計算開始前
  * 前回の`Actor#calc()`から今回の`Actor#calc()`の間に１つ以上のキーフレームがスキップされており、それらがユーザデータを持つときハンドラを実行します。実行回数はスキップされたキーフレーム数になります。
  * `posture`: `undefined`になります。
  * `left`: スキップされた`KeyFrame`の`time`と`userData`が格納されます。
  * `right`: `undefined`になります。
  * `currentFrame`: `left.time`と同じ値になります。
  * `frameCount`: 現在再生中のアニメーションのフレーム数が格納されます。
  * *次の操作の直後についてはハンドラを実行しません。*
    * `Actor#currentFrame`
    * `Actor#play()`
* 各ボーンのアニメーション計算完了後
  * `posture`: 計算結果が格納されます。例えば`posture[AttrId.alpha]`とすると半透明度の計算結果にアクセスできます。
  * `left`, `right`: 現在時刻に対して左右（前後）にある直近の`KeyFrame`の時刻と`userData`が格納されます。再生中のアニメーションがハンドラを取り付けたボーンに対してユーザデータを持たない時`undefined`となります。
  * `currentFrame`: 現在時刻（フレーム番号）が格納されます。`Actor`は再生速度可変のため、この値は整数とは限りません。
  * `frameCount`: 現在再生中のアニメーションのフレーム数が格納されます。

*ハンドラは`posture`が`undefined`かどうか確認することで呼び出しタイミングを区別できます。*

### アニメーション再生終了ハンドラ
 `Actor#ended`を用いることでアニメーション再生が終了したタイミングで呼び出されるハンドラを登録できます。

```js
 actor.ended.handle(function() {
     stopBGM();
     goNextScene();
 });
```

### 制限
#### Actorを他のEの子にするとColliderが正しく当たり判定領域を求められない
`Collider` は `Actor#calc()` の結果を用いますが `Actor#calc()` は `Actor#parent` の行列を参照しません。

#### 属性の継承関係を変更できない
ボーンの扱う属性の継承関係は次のように固定されています。

| 属性           | 継承       |
|:-------------- |:---------- |
| 行列           | YES        |
| 透明度         | YES        |
| 参照セル       | NO         |
| セル中心位置   | NO         |
| セルUV         | NO         |
| セル描画順位   | NO         |
| セル可視フラグ | NO         |
| セル左右反転   | NO         |
| セル上下反転   | NO         |

### アルファブレンドモード
akashic-animationでは、セル毎にアルファブレンドを指定できるようになっています。
現在サポートしているアルファブレンドは以下の通りです。

| アルファブレンド  | 説明                                                                        |
|:----------------- |:--------------------------------------------------------------------------- |
| normal            | デフォルトの設定です。描画元のセルを描画先の内容の上に描きます              |
| add               | 描画先の内容の色(背景色)と描画元のセルの重なる部分のカラー値が加算されます  |

## ビルド方法
akashic-animationはTypeScriptで書かれたライブラリであるため、ビルドにはnode.jsが必要です。

`npm run build` によりgulpを使ってビルドできます。

```sh
npm install
npm run build
```

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](./LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
