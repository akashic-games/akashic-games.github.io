"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Actors = void 0;
var DataManager_1 = require("../managers/DataManager");
var GameActor_1 = require("./GameActor");
var Game_Actors = /** @class */ (function () {
    function Game_Actors() {
        this.initialize();
    }
    Game_Actors.prototype.initialize = function () {
        this._data = [];
    };
    Game_Actors.prototype.actor = function (actorId) {
        if (DataManager_1.$dataActors[actorId]) {
            if (!this._data[actorId]) {
                this._data[actorId] = new GameActor_1.Game_Actor(actorId);
            }
            return this._data[actorId];
        }
        return null;
    };
    return Game_Actors;
}());
exports.Game_Actors = Game_Actors;
