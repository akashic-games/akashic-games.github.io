<p align="center">
<img src="https://github.com/akashic-games/amflow/blob/master/img/akashic.png"/>
</p>

# AMFlow

Akashic Message Flow (AMFlow) は Akashic で共通に利用されるデータをやりとりするためのインターフェースを定義したものです。

このリポジトリでは、AMFlowの仕様及び、TypeScriptの型定義を提供します。

AMFlowの実装（以下、AMFlow実装）は、全てのメソッドを実装する必要はなく、用途に応じて必要なメソッドを実装してください。

## 仕様

### エラー

AMFlowのエラーとして以下を定義しています。

| エラー名           | 意味                             | 通知方法                 |
|:-------------------|:---------------------------------|--------------------------|
| InvalidStatus      | 不正な状態                       | 例外又はコールバック関数 |
| PermissionError    | 必要な権限が無い                 | 例外又はコールバック関数 |
| NotImplemented     | 未実装                           | 例外又はコールバック関数 |
| Timeout            | タイムアウト                     | コールバック関数         |
| BadRequest         | 不正な要求                       | コールバック関数         |
| RuntimeError       | 実行時エラー                     | 例外又はコールバック関数 |
| TokenRevoked       | トークンが失効した               | コールバック関数         |

AMFlow実装は、`Error#name` にエラー名をセットし、例外又はコールバック関数によりアプリケーションにエラーを通知する必要があります。

`TokenRevoked` エラー等のコールバック関数のみで通知されるエラーは、`sendEvent` や `sendTick` を行った場合に例外は発生せず、ただ呼び出しが無視されます。

### open

AMFlowのセッションを開始します。

```
open(playId: string, callback?: (error?: Error) => void): void;
```

セッションの確立成否を `callback` で通知します。

AMFlow実装は、このメソッド呼び出し時、または呼び出し前に必要であれば通信経路の確立を行うことが望まれます。

このメソッドの呼出し後、セッションの開始が必要なメソッドの呼び出しは、`open()` で指定された `playId` に関するものとなります。

セッションの開始が必須となるメソッドは以下となります。

* close
* authenticate
* sendTick
* sendEvent
* getTickList
* putStartPoint
* getStartPoint

また、セッションの開始が必須ではないメソッドは以下となります。

* onTick
* onEvent
* putStorageData
* getStorageData

### close

開始済みのAMFlowのセッションを終了します。このメソッドの呼び出しにはセッションの開始が必須です。

```
close(callback?: (error?: Error) => void): void;
```

AMFlow実装は、このメソッドの呼び出し後に `open()` とセッションの開始が必要なメソッド以外のメソッド呼び出しを受け付けてはなりません。

### authenticate

セッションの認証を要求します。このメソッドの呼び出しにはセッションの開始が必須です。

また、このメソッドは複数回呼び出すことが可能で、権限を更新することができます。

```
authenticate(token: string, callback: (error: Error, permission: Permission) => void): void;
```

認証要求の結果として、権限情報を表す `Permission` を `callback` で通知します。

AMFlow実装は、この `Permission` を元にその他のメソッドの動作を制限しなくてはなりません。

詳細は、[Permission.ts](https://github.com/akashic-games/amflow/blob/master/src/Permission.ts) に定義されています。

### sendTick

`playlog.Tick` を送信します。このメソッドの呼び出しにはセッションの開始が必須です。

```
sendTick(tick: playlog.Tick): void;
```

`playlog.Tick` に含まれる `playlog.Event` の非永続化フラグ (`playlog.EventFlags.Transient`) が真の場合、そのイベントは `getTickList()` から除外されます。

### onTick

`playlog.Tick` の受信ハンドラを登録します。

```
onTick(handler: (tick: playlog.Tick) => void): void;
```

このメソッドは複数回呼び出され、複数の受信ハンドラが登録される可能性があります。

### offTick

`onTick()` で登録した受信ハンドラの登録を解除します。

```
offTick(handler: (event: playlog.Tick) => void): void;
```

### sendEvent

`playlog.Event` を送信します。このメソッドの呼び出しにはセッションの開始が必須です。

```
sendEvent(event: playlog.Event): void;
```

### onEvent

`playlog.Event` の受信ハンドラを登録します。

```
onEvent(handler: (event: playlog.Event) => void): void;
```

このメソッドは複数回呼び出され、複数の受信ハンドラが登録される可能性があります。

### offEvent

`onEvent()` で登録した受信ハンドラの登録を解除します。

```
offEvent(handler: (event: playlog.Event) => void): void;
```

### getTickList

保存された `playlog.Tick` のリストを `playlog.TickList` の形式で取得します。このメソッドの呼び出しにはセッションの開始が必須です。

```
getTickList(opts: GetTickListOptions, callback: (error: Error, tickList: playlog.TickList) => void): void;
```

`opts.begin` で指定されたフレーム番号を含むフレームから、`opts.end` で指定されたフレーム番号を含まないフレームのリストとなります。

`opts.excludeEventFlags` で `playlog.TickList` に含まれる `playlog.Event` の除外条件を指定することができます。

指定された範囲の `playlog.Tick` が一つも見つからない場合、`tickList` は `null` となります。

### putStartPoint

開始地点情報を保存します。このメソッドの呼び出しにはセッションの開始が必須です。

```
putStartPoint(startPoint: StartPoint, callback: (error: Error) => void): void;
```

`StartPoint` は開始地点情報を表すデータで、[StartPoint.ts](https://github.com/akashic-games/amflow/blob/master/src/StartPoint.ts) で定義されています。

### getStartPoint

開始地点情報を取得します。このメソッドの呼び出しにはセッションの開始が必須です。

オプションとしてフレーム番号を指定しない場合は、0フレーム目に該当する開始地点情報を取得します。

オプションとしてフレーム番号を指定した場合は、フレーム番号以前の直近のフレームに該当する開始地点情報を取得します。

```
getStartPoint(opts: {frame?: number}, callback: (error: Error, startPoint: StartPoint) => void): void;
```

開始地点情報が見つからない場合、 `StartPoint` は `null` となります。

### putStorageData

ストレージデータを保存します。

```
putStorageData(key: playlog.StorageKey, value: playlog.StorageValue, options: any, callback: (err: Error) => void): void;
```

### getStorageData

ストレージデータを取得します。

```
getStorageData(keys: playlog.StorageReadKey[], callback: (error: Error, values: playlog.StorageData[]) => void): void;
```

### インストール

```
npm install @akashic/amflow
```

### 利用方法

```
import * as AMFlow from "@akashic/amflow";
```

## 開発

### ビルド

```
npm run build
```

### テスト

```
npm test
```

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/amflow/blob/master/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
