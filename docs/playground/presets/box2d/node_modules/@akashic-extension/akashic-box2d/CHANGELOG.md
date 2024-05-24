# CHANGELOG

## unreleased changes
* `Box2DOption` を `Box2DParameter` に変更
* `BodyOption` を `Box2DBodyDef` に変更
* `FixtureOption` を `Box2DFixtureDef` に変更
* 衝突判定をラップするクラス `ContactManager` を追加
* `EBody#id` を追加
* テスト環境を jest に変更
* 依存モジュールの更新

## 2.3.0
* box2dwebに以下の変更を行うパッチの追加
    * 実行環境によって三角関数の返す値が異なることにより、物理計算の結果も異なるものになる問題の修正

## 2.2.0
* box2dwebに以下の変更を行うパッチの追加
    * 物理計算が無限ループに陥る問題の修正
    * 物理計算を中断する機能の追加

## 2.1.3
* Box2D#createFixtureDef() に filter を指定できるように

## 2.1.2
* Box2D#createBody() に複数の b2FixtureDef をアタッチできるように

## 2.1.1
* ビルド方法の修正

## 2.1.0

* akashic-engine@~2.3.1 に追従

## 2.0.0

* akashic-engine@2.0.0 に追従

## 0.2.1

* publish対象から不要なファイルを除去

## 0.2.0

* 依存モジュールを更新

## 0.1.3

* 初期リリース
