<p align="center">
<img src="https://github.com/akashic-games/trigger/blob/master/img/akashic.png"/>
</p>

# Trigger

TypeScript向けに書かれたイベント通知機構です。
Node.jsの [`EventEmitter`][emitter] に相当する機能を提供しますが、TypeScript上の型定義を明確かつ簡潔にするため次の制限を加えています。

* 名前(イベント名)を持たない (各通知ごとに個別の `Trigger` インスタンスを利用する)
* 引数は高々一つ

[emitter]: https://nodejs.org/api/events.html

## インストール

Node.jsが必要です。次のコマンドでインストールできます。

```
npm install @akashic/trigger
```

## 利用方法

`import` するとclass `Trigger`, `ChainTrigger` が利用できます。

以下は `Trigger` の単純な使用例です。
APIの詳細な仕様は [Trigger.ts][src-trigger], [ChainTrigger.ts][src-chaintrigger] のコメントをご覧ください。

```javascript
import { Trigger } from "@akashic/trigger";

// 引数の型 (ここでは string) を指定してインスタンス生成
const t = new Trigger<string>();

// ハンドラを追加
t.add((s: string) => {
    console.log("fired:", s);
});

// 第二引数でthisを指定して登録することも可能
t.add(someObject.method, someObject);

// オブジェクト引数を使うと全てのオプションが制御可能
t.add({
    func: someObject.method,
    owner: someObject,
    name: "name-as-you-like",  // ハンドラ識別用の名前
    index: 0                   // 挿入先を指定
});

// 一回実行したあと登録解除されるハンドラを追加
t.addOnce((s: string) => {
    // do something
});

// 全登録ハンドラを起動
t.fire("some-string-value");

// 条件にマッチするハンドラをすべて削除 (ここでは `owner` が `someObject` で登録されたものすべて)
t.removeAll({ owner: someObject });

// 登録ハンドラをすべて削除
t.removeAll();
```

併せて、 `Trigger`, `ChainTrigger` の公開APIと同じシグネチャを持つinterface `TriggerLike`, `ChainTriggerLike` も公開しています。
公開インターフェースなどにおいて、クラスへの依存を避け duck-typing を可能にしたいケースでは、 `Trigger` などをこれにキャストしてご利用ください。

```javascript
import { Trigger, TriggerLike } from "@akashic/trigger";

export class Foo {
    onDestroyed: TriggerLike<void>;
    constructor() {
        this.onDestroyed = new Trigger<void>();
    }

    // `trigger` は直接 `Trigger` やその派生クラスでなくても、同じシグネチャを持つものでありさえすればよい
    someMethod(trigger: TriggerLike<number>): void {
        // ...
        trigger.fire(someValue);
    }
}
```

[src-trigger]: https://github.com/akashic-games/trigger/blob/master/src/Trigger.ts
[src-chaintrigger]: https://github.com/akashic-games/trigger/blob/master/src/ChainTrigger.ts

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/trigger/blob/master/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
