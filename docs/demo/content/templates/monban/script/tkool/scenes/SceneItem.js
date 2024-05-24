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
exports.Scene_Item = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowItemCategory_1 = require("../windows/WindowItemCategory");
var WindowItemList_1 = require("../windows/WindowItemList");
var SceneItemBase_1 = require("./SceneItemBase");
var Scene_Item = /** @class */ (function (_super) {
    __extends(Scene_Item, _super);
    function Scene_Item() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Item.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Item.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Item.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createHelpWindow();
        this.createCategoryWindow();
        this.createItemWindow();
        this.createActorWindow();
    };
    Scene_Item.prototype.createCategoryWindow = function () {
        this._categoryWindow = new WindowItemCategory_1.Window_ItemCategory(this.scene);
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.y = this._helpWindow.height;
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._categoryWindow);
    };
    Scene_Item.prototype.createItemWindow = function () {
        var wy = this._categoryWindow.y + this._categoryWindow.height;
        var wh = core_1.Graphics.boxHeight - wy;
        this._itemWindow = new WindowItemList_1.Window_ItemList(this.scene, 0, wy, core_1.Graphics.boxWidth, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);
    };
    Scene_Item.prototype.user = function () {
        var members = DataManager_1.$gameParty.movableMembers();
        var bestActor = members[0];
        var bestPha = 0;
        for (var i = 0; i < members.length; i++) {
            if (members[i].pha > bestPha) {
                bestPha = members[i].pha;
                bestActor = members[i];
            }
        }
        return bestActor;
    };
    Scene_Item.prototype.onCategoryOk = function () {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };
    Scene_Item.prototype.onItemOk = function () {
        DataManager_1.$gameParty.setLastItem(this.item());
        this.determineItem();
    };
    Scene_Item.prototype.onItemCancel = function () {
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    };
    Scene_Item.prototype.playSeForItem = function () {
        managers_1.SoundManager.playUseItem();
    };
    Scene_Item.prototype.useItem = function () {
        SceneItemBase_1.Scene_ItemBase.prototype.useItem.call(this);
        this._itemWindow.redrawCurrentItem();
    };
    return Scene_Item;
}(SceneItemBase_1.Scene_ItemBase));
exports.Scene_Item = Scene_Item;
