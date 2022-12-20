"use strict";

var AudioPresenter_1 = require("./AudioPresenter");
var FieldScene_1 = require("./FieldScene");
var GameFont_1 = require("./GameFont");
var Global_1 = require("./Global");
var ManualScene_1 = require("./ManualScene");
var NumberValue_1 = require("./NumberValue");
var OuterParamReceiver_1 = require("./OuterParamReceiver");
var ResultScene_1 = require("./ResultScene");
var TitleScene_1 = require("./TitleScene");
function main(_param) {
  var scene = new g.Scene({
    game: g.game,
    assetIds: ["ui_common", "ui", "ui_2", "glyph28", "glyph72", "glyph32_yellow", "bgm_130", "jin_000", "jin_002", "se_005A_mono", "se_006B_mono", "se_001a", "se_001c", "se_002c", "se_003", "se_004", "se_100c"]
  });
  Global_1.Global.init();
  OuterParamReceiver_1.OuterParamReceiver.receiveParamFromMessage(scene);
  OuterParamReceiver_1.OuterParamReceiver.paramSetting();
  scene.onLoad.add(function () {
    AudioPresenter_1.AudioPresenter.initialize(scene);
    NumberValue_1.NumberFont.instance.initialize(scene);
    GameFont_1.GameFont.instance.initialize(scene);
    var title = new TitleScene_1.TitleScene(scene);
    var manual = new ManualScene_1.ManualScene(scene);
    var field = new FieldScene_1.FieldScene(scene);
    var result = new ResultScene_1.ResultScene(scene);
    title.finishCallback.push(function () {
      title.dispose();
      manual.activate(scene);
    });
    manual.finishCallback.push(function () {
      manual.dispose();
      field.activate(scene);
    });
    field.finishCallback.push(function () {
      field.dispose();
      result.activate(scene);
    });
    result.finishCallback.push(function () {
      result.dispose();
      title.activate(scene);
    });
    if (Global_1.Global.instance.DEBUG) {
      field.activate(scene);
    } else {
      title.activate(scene);
    }
  });
  g.game.pushScene(scene);
}
module.exports = main;