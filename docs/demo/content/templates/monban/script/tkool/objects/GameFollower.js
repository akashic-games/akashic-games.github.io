"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Follower = void 0;
var DataManager_1 = require("../managers/DataManager");
var GameCharacter_1 = require("./GameCharacter");
var Game_Follower = /** @class */ (function (_super) {
    __extends(Game_Follower, _super);
    function Game_Follower(memberIndex) {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Game_Follower.prototype) {
            _this.initialize(memberIndex);
        }
        return _this;
    }
    Game_Follower.prototype.initialize = function (memberIndex) {
        _super.prototype.initialize.call(this);
        this._memberIndex = memberIndex;
        this.setTransparent(DataManager_1.$dataSystem.optTransparent);
        this.setThrough(true);
    };
    Game_Follower.prototype.refresh = function () {
        var characterName = this.isVisible() ? this.actor().characterName() : "";
        var characterIndex = this.isVisible() ? this.actor().characterIndex() : 0;
        this.setImage(characterName, characterIndex);
    };
    Game_Follower.prototype.actor = function () {
        return DataManager_1.$gameParty.battleMembers()[this._memberIndex];
    };
    Game_Follower.prototype.isVisible = function () {
        return this.actor() && DataManager_1.$gamePlayer.followers().isVisible();
    };
    Game_Follower.prototype.update = function () {
        GameCharacter_1.Game_Character.prototype.update.call(this);
        this.setMoveSpeed(DataManager_1.$gamePlayer.realMoveSpeed());
        this.setOpacity(DataManager_1.$gamePlayer.opacity());
        this.setBlendMode(DataManager_1.$gamePlayer.blendMode());
        this.setWalkAnime(DataManager_1.$gamePlayer.hasWalkAnime());
        this.setStepAnime(DataManager_1.$gamePlayer.hasStepAnime());
        this.setDirectionFix(DataManager_1.$gamePlayer.isDirectionFixed());
        this.setTransparent(DataManager_1.$gamePlayer.isTransparent());
    };
    Game_Follower.prototype.chaseCharacter = function (character) {
        var sx = this.deltaXFrom(character.x);
        var sy = this.deltaYFrom(character.y);
        if (sx !== 0 && sy !== 0) {
            this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
        }
        else if (sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
        else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
        this.setMoveSpeed(DataManager_1.$gamePlayer.realMoveSpeed());
    };
    return Game_Follower;
}(GameCharacter_1.Game_Character));
exports.Game_Follower = Game_Follower;
