"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Item = void 0;
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var Game_Item = /** @class */ (function () {
    function Game_Item(item) {
        this.initialize(item);
    }
    Game_Item.prototype.initialize = function (item) {
        this._dataClass = "";
        this._itemId = 0;
        if (item) {
            this.setObject(item);
        }
    };
    Game_Item.prototype.isSkill = function () {
        return this._dataClass === "skill";
    };
    Game_Item.prototype.isItem = function () {
        return this._dataClass === "item";
    };
    Game_Item.prototype.isUsableItem = function () {
        return this.isSkill() || this.isItem();
    };
    Game_Item.prototype.isWeapon = function () {
        return this._dataClass === "weapon";
    };
    Game_Item.prototype.isArmor = function () {
        return this._dataClass === "armor";
    };
    Game_Item.prototype.isEquipItem = function () {
        return this.isWeapon() || this.isArmor();
    };
    Game_Item.prototype.isNull = function () {
        return this._dataClass === "";
    };
    Game_Item.prototype.itemId = function () {
        return this._itemId;
    };
    Game_Item.prototype.object = function () {
        if (this.isSkill()) {
            return DataManager_1.$dataSkills[this._itemId];
        }
        else if (this.isItem()) {
            return DataManager_1.$dataItems[this._itemId];
        }
        else if (this.isWeapon()) {
            return DataManager_1.$dataWeapons[this._itemId];
        }
        else if (this.isArmor()) {
            return DataManager_1.$dataArmors[this._itemId];
        }
        else {
            return null;
        }
    };
    Game_Item.prototype.setObject = function (item) {
        if (managers_1.DataManager.isSkill(item)) {
            this._dataClass = "skill";
        }
        else if (managers_1.DataManager.isItem(item)) {
            this._dataClass = "item";
        }
        else if (managers_1.DataManager.isWeapon(item)) {
            this._dataClass = "weapon";
        }
        else if (managers_1.DataManager.isArmor(item)) {
            this._dataClass = "armor";
        }
        else {
            this._dataClass = "";
        }
        this._itemId = item ? item.id : 0;
    };
    Game_Item.prototype.setEquip = function (isWeapon, itemId) {
        this._dataClass = isWeapon ? "weapon" : "armor";
        this._itemId = itemId;
    };
    return Game_Item;
}());
exports.Game_Item = Game_Item;
