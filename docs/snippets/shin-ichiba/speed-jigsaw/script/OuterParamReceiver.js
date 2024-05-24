"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OuterParamReceiver = void 0;
var Global_1 = require("./Global");
var OuterParamReceiver = /** @class */function () {
  function OuterParamReceiver() {}
  OuterParamReceiver.receiveParamFromMessage = function (s) {
    s.onMessage.add(function (msg) {
      if (msg.data && msg.data.type === "start") {
        if (msg.data.parameters) {
          if (msg.data.parameters.totalTimeLimit) {
            Global_1.Global.instance.totalTimeLimit = msg.data.parameters.totalTimeLimit;
          }
          if (msg.data.parameters.difficulty) {
            Global_1.Global.instance.difficulty = msg.data.parameters.difficulty;
          }
          if (msg.data.parameters.randomSeed) {
            Global_1.Global.instance.random = new g.XorshiftRandomGenerator(msg.data.parameters.randomSeed);
          }
        }
      }
    });
  };
  OuterParamReceiver.paramSetting = function () {
    g.game.vars.gameState = {
      score: 0,
      playThreshold: 1,
      clearThreshold: 0
    };
  };
  OuterParamReceiver.setGlobalScore = function (score) {
    if (g.game.vars.gameState) {
      if (g.game.vars.gameState.score !== undefined) {
        g.game.vars.gameState.score = score;
      }
    }
  };
  OuterParamReceiver.setClearThreashold = function (v) {
    if (g.game.vars.gameState) {
      if (g.game.vars.gameState.clearThreshold !== undefined) {
        g.game.vars.gameState.clearThreshold = v;
      }
    }
  };
  return OuterParamReceiver;
}();
exports.OuterParamReceiver = OuterParamReceiver;