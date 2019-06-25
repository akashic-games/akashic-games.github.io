# ChangeLog

## 3.0.3

* セルの無いパーツについても `CircleCollider` が動作するように修正
* セルの無いパーツについても `BoneCellCollider` が動作するように修正
  * セルがない時、サイズが `(width, height) = (1.0, 1.0)` のセルと同等の判定になる

## 3.0.2

* AlphaBlendModeを `@akashic-extension/akashic-animation` から読み込めるように修正

## 3.0.1

* X/Yローカルスケール機能の追加
* ローカル不透明度機能の追加
* イメージの左右反転及び上下反転機能の追加
* セルの無いパーツ(rootパーツ等)の不透明度が反映されるように改修
* 以下のαブレンドモードに対応できるように改修
  * add

## 3.0.0

* akashic-engine@2.0.0 系に追従。

## 2.7.1

* TypeDocの実行に失敗する問題の修正。

## 2.7.0

* TypeScript 2.1 導入。

## 2.6.2

* 初期リリース。
