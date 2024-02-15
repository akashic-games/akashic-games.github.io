"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Followers = void 0;
var DataManager_1 = require("../managers/DataManager");
var GameFollower_1 = require("./GameFollower");
var Game_Followers = /** @class */ (function () {
    function Game_Followers() {
        this.initialize();
    }
    Game_Followers.prototype.initialize = function () {
        this._visible = DataManager_1.$dataSystem.optFollowers;
        this._gathering = false;
        this._data = [];
        for (var i = 1; i < DataManager_1.$gameParty.maxBattleMembers(); i++) {
            this._data.push(new GameFollower_1.Game_Follower(i));
        }
    };
    Game_Followers.prototype.isVisible = function () {
        return this._visible;
    };
    Game_Followers.prototype.show = function () {
        this._visible = true;
    };
    Game_Followers.prototype.hide = function () {
        this._visible = false;
    };
    Game_Followers.prototype.follower = function (index) {
        return this._data[index];
    };
    Game_Followers.prototype.forEach = function (callback, thisObject) {
        this._data.forEach(callback, thisObject);
    };
    Game_Followers.prototype.reverseEach = function (callback, thisObject) {
        this._data.reverse();
        this._data.forEach(callback, thisObject);
        this._data.reverse();
    };
    Game_Followers.prototype.refresh = function () {
        this.forEach(function (follower) {
            return follower.refresh();
        }, this);
    };
    Game_Followers.prototype.update = function () {
        if (this.areGathering()) {
            if (!this.areMoving()) {
                this.updateMove();
            }
            if (this.areGathered()) {
                this._gathering = false;
            }
        }
        this.forEach(function (follower) {
            follower.update();
        }, this);
    };
    Game_Followers.prototype.updateMove = function () {
        for (var i = this._data.length - 1; i >= 0; i--) {
            var precedingCharacter = i > 0 ? this._data[i - 1] : DataManager_1.$gamePlayer;
            this._data[i].chaseCharacter(precedingCharacter);
        }
    };
    Game_Followers.prototype.jumpAll = function () {
        if (DataManager_1.$gamePlayer.isJumping()) {
            for (var i = 0; i < this._data.length; i++) {
                var follower = this._data[i];
                var sx = DataManager_1.$gamePlayer.deltaXFrom(follower.x);
                var sy = DataManager_1.$gamePlayer.deltaYFrom(follower.y);
                follower.jump(sx, sy);
            }
        }
    };
    Game_Followers.prototype.synchronize = function (x, y, d) {
        this.forEach(function (follower) {
            follower.locate(x, y);
            follower.setDirection(d);
        }, this);
    };
    Game_Followers.prototype.gather = function () {
        this._gathering = true;
    };
    Game_Followers.prototype.areGathering = function () {
        return this._gathering;
    };
    Game_Followers.prototype.visibleFollowers = function () {
        return this._data.filter(function (follower) {
            return follower.isVisible();
        }, this);
    };
    Game_Followers.prototype.areMoving = function () {
        return this.visibleFollowers().some(function (follower) {
            return follower.isMoving();
        }, this);
    };
    Game_Followers.prototype.areGathered = function () {
        return this.visibleFollowers().every(function (follower) {
            return !follower.isMoving() && follower.pos(DataManager_1.$gamePlayer.x, DataManager_1.$gamePlayer.y);
        }, this);
    };
    Game_Followers.prototype.isSomeoneCollided = function (x, y) {
        return this.visibleFollowers().some(function (follower) {
            return follower.pos(x, y);
        }, this);
    };
    return Game_Followers;
}());
exports.Game_Followers = Game_Followers;
