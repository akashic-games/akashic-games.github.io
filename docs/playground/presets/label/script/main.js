function main() {
  var al = require("@akashic-extension/akashic-label");
  var game = g.game;
  var scene = new g.Scene({ game: game, assetIds: ["plus", "minus", "frame"] });
  var onRuby = false;
  var maxFontSize = 36;
  var minFontSize = 4;
  scene.loaded.add(function () {
    // このサンプルで使うフォントの生成
    var dhint = {
      initialAtlasWidth: 256,
      initialAtlasHeight: 256,
      maxAtlasWidth: 256,
      maxAtlasHeight: 256,
      maxAtlasNum: 8
    };
    var dfont = new g.DynamicFont({
      game: scene.game,
      fontFamily: "monospace",
      size: 40,
      hint: dhint
    });

    // タイトル
    var tlabel0 = new al.Label({
      scene: scene,
      text: "行末の禁則処理とルビ",
      font: dfont,
      fontSize: 30,
      width: game.width,
      textAlign: g.TextAlign.Center,
      x: 0
    });
    scene.append(tlabel0);

    // テキスト書き込み用のフレーム
    var sentenceFramePane = new g.Pane({
      scene: scene,
      width: 0.9 * g.game.width,
      height: 0.257 * g.game.width,
      x: 0.05 * g.game.width,
      y: g.game.height - 0.307 * g.game.width
    });
    scene.append(sentenceFramePane);

    var sentenceFrame = new g.Sprite({
      scene: scene,
      src: scene.asset.getImageById("frame"),
      srcWidth: 1051,
      srcHeight: 300,
      width: sentenceFramePane.width,
      height: sentenceFramePane.height
    });
    sentenceFramePane.append(sentenceFrame);

    // 書き込まれるテキスト
    var text = "『Akashic Engine』は【JavaScript】で動作する「ゲームエンジン」です。\n「オープンソース」で公開されており、制作したゲームの公開に「ロイヤリティ」は必要ありません。\nゲーム開発で利用できる「ライブラリ」と「ツール」が用意されており、今すぐ開発を始めることができます。";
    var textForRuby = '『{"rb":"Akashic Engine","rt":"あかしっく えんじん"}』は【{"rb":"JavaScript","rt":"じゃばすくりぷと"}】で{"rb":"動作","rt":"どうさ"}する「ゲームエンジン」です。\n' +
      '「オープンソース」で{"rb":"公開","rt":"こうかい"}されており、{"rb":"制作","rt":"せいさく"}したゲームの{"rb":"公開","rt":"こうかい"}に「ロイヤリティ」は{"rb":"必要","rt":"ひつよう"}ありません。\n' +
      'ゲーム{"rb":"開発","rt":"かいはつ"}で{"rb":"利用","rt":"りよう"}できる「ライブラリ」と「ツール」が{"rb":"用意","rt":"ようい"}されており、{"rb":"今","rt":"いま"}すぐ{"rb":"開発","rt":"かいはつ"}を{"rb":"始","rt":"はじ"}めることができます。';
    var sampleRule = function (fragments, index) {
      var ignoreHead = ["」", "』", "】", "、", "。"];
      var ignoreTail = ["「", "『", "【"];
      var headChar = fragments[index];
      var isHeadCharIgnore = ignoreHead.indexOf(headChar) !== -1;
      if (typeof headChar !== "string")
        return index;
      if (isHeadCharIgnore) {
        return index + 1;
      }
      else {
        var before = fragments[index - 1];
        var isBeforeIgnore = ignoreHead.indexOf(before) !== -1;
        if (!!before && isBeforeIgnore) {
          return index;
        }
        else if (!!before && ignoreTail.indexOf(before) !== -1) {
          return index - 1;
        }
        return index;
      }
    };
    var lblabel = new al.Label({
      scene: scene,
      text: text,
      font: dfont,
      fontSize: 20,
      textAlign: g.TextAlign.Left,
      width: sentenceFramePane.width - 0.02 * g.game.width,
      lineBreak: true,
      widthAutoAdjust: true,
      lineBreakRule: sampleRule,
      x: 0.01 * g.game.width,
      y: 0.01 * g.game.width,
      rubyOptions: {
        rubyFontSize: 10
      }
    });
    sentenceFramePane.append(lblabel);

    // フォントサイズ変更ボタンまわり
    var rubySettingLabel = new al.Label({
      scene: scene,
      text: "文字サイズ変更",
      font: dfont,
      fontSize: 24,
      width: 200,
      textAlign: g.TextAlign.Center,
      x: 0.17 * g.game.width,
      y: 0.2 * g.game.height
    });
    scene.append(rubySettingLabel);
    var sizeUpButton = new g.Sprite({
      scene: scene,
      src: scene.asset.getImageById("plus"),
      srcWidth: 114,
      srcHeight: 114,
      width: 57,
      height: 57,
      x: 0.2 * g.game.width,
      y: 0.28 * g.game.height,
      touchable: true
    });
    sizeUpButton.onPointDown.add(function () {
      if (lblabel.fontSize < maxFontSize) {
        lblabel.fontSize++;
        lblabel.rubyOptions.rubyFontSize = lblabel.fontSize / 2;
        lblabel.invalidate();
      }
    });
    scene.append(sizeUpButton);
    var sizeDownButton = new g.Sprite({
      scene: scene,
      src: scene.asset.getImageById("minus"),
      srcWidth: 114,
      srcHeight: 38,
      width: 57,
      height: 19,
      x: 0.32 * g.game.width,
      y: 0.325 * g.game.height,
      touchable: true
    });
    sizeDownButton.onPointDown.add(function () {
      if (minFontSize < lblabel.fontSize) {
        lblabel.fontSize--;
        lblabel.rubyOptions.rubyFontSize = lblabel.fontSize / 2;
        lblabel.invalidate();
      }
    });
    scene.append(sizeDownButton);

    // ルビ設定まわり
    var rubySettingLabel = new al.Label({
      scene: scene,
      text: "ふりがな設定",
      font: dfont,
      fontSize: 24,
      width: 200,
      textAlign: g.TextAlign.Center,
      x: 0.55 * g.game.width,
      y: 0.2 * g.game.height
    });
    scene.append(rubySettingLabel);
    var rubyButton = new g.FilledRect({
      scene: scene,
      cssColor: "black",
      width: 120,
      height: 40,
      x: 0.6 * g.game.width,
      y: 0.3 * g.game.height,
      touchable: true
    });
    var rubyButtonLabel = new al.Label({
      scene: scene,
      text: "ON",
      textColor: "white",
      font: dfont,
      fontSize: 20,
      width: 100,
      textAlign: g.TextAlign.Center,
      y: 0.2 * rubyButton.height
    });
    rubyButton.onPointUp.add(function () {
      onRuby = !onRuby;
      if (onRuby) {
        lblabel.text = textForRuby;
        rubyButtonLabel.text = "OFF";
      } else {
        lblabel.text = text;
        rubyButtonLabel.text = "ON";
      }
      lblabel.invalidate();
      rubyButtonLabel.invalidate();
    });
    rubyButton.append(rubyButtonLabel);
    scene.append(rubyButton);
  });
  game.pushScene(scene);
}
module.exports = main;
