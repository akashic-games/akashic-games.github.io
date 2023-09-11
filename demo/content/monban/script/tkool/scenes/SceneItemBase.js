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
exports.Scene_ItemBase = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var objects_1 = require("../objects");
var WindowMenuActor_1 = require("../windows/WindowMenuActor");
var SceneMap_1 = require("./SceneMap");
var SceneMenuBase_1 = require("./SceneMenuBase");
var Scene_ItemBase = /** @class */ (function (_super) {
    __extends(Scene_ItemBase, _super);
    function Scene_ItemBase() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_ItemBase.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_ItemBase.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_ItemBase.prototype.create = function () {
        _super.prototype.create.call(this);
    };
    Scene_ItemBase.prototype.createActorWindow = function () {
        this._actorWindow = new WindowMenuActor_1.Window_MenuActor(this.scene);
        this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
        this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    };
    Scene_ItemBase.prototype.item = function () {
        return this._itemWindow.item();
    };
    Scene_ItemBase.prototype.user = function () {
        return null;
    };
    Scene_ItemBase.prototype.isCursorLeft = function () {
        return this._itemWindow.index() % 2 === 0;
    };
    Scene_ItemBase.prototype.showSubWindow = function (window) {
        window.x = this.isCursorLeft() ? core_1.Graphics.boxWidth - window.width : 0;
        window.show();
        window.activate();
    };
    Scene_ItemBase.prototype.hideSubWindow = function (window) {
        window.hide();
        window.deactivate();
        this.activateItemWindow();
    };
    Scene_ItemBase.prototype.onActorOk = function () {
        if (this.canUse()) {
            this.useItem();
        }
        else {
            managers_1.SoundManager.playBuzzer();
        }
    };
    Scene_ItemBase.prototype.onActorCancel = function () {
        this.hideSubWindow(this._actorWindow);
    };
    Scene_ItemBase.prototype.determineItem = function () {
        var action = new objects_1.Game_Action(this.user());
        var item = this.item();
        action.setItemObject(item);
        if (action.isForFriend()) {
            this.showSubWindow(this._actorWindow);
            this._actorWindow.selectForItem(this.item());
        }
        else {
            this.useItem();
            this.activateItemWindow();
        }
    };
    Scene_ItemBase.prototype.useItem = function () {
        this.playSeForItem();
        this.user().useItem(this.item());
        this.applyItem();
        this.checkCommonEvent();
        this.checkGameover();
        this._actorWindow.refresh();
    };
    Scene_ItemBase.prototype.activateItemWindow = function () {
        this._itemWindow.refresh();
        this._itemWindow.activate();
    };
    Scene_ItemBase.prototype.itemTargetActors = function () {
        var action = new objects_1.Game_Action(this.user());
        action.setItemObject(this.item());
        if (!action.isForFriend()) {
            return [];
        }
        else if (action.isForAll()) {
            return DataManager_1.$gameParty.members();
        }
        else {
            return [DataManager_1.$gameParty.members()[this._actorWindow.index()]];
        }
    };
    Scene_ItemBase.prototype.canUse = function () {
        var _a;
        return ((_a = this.user()) === null || _a === void 0 ? void 0 : _a.canUse(this.item())) && this.isItemEffectsValid();
    };
    Scene_ItemBase.prototype.isItemEffectsValid = function () {
        var action = new objects_1.Game_Action(this.user());
        action.setItemObject(this.item());
        return this.itemTargetActors().some(function (target) {
            return action.testApply(target);
        });
    };
    Scene_ItemBase.prototype.applyItem = function () {
        var action = new objects_1.Game_Action(this.user());
        action.setItemObject(this.item());
        this.itemTargetActors().forEach(function (target) {
            for (var i = 0; i < action.numRepeats(); i++) {
                action.apply(target);
            }
        });
        action.applyGlobal();
    };
    Scene_ItemBase.prototype.checkCommonEvent = function () {
        if (DataManager_1.$gameTemp.isCommonEventReserved()) {
            managers_1.SceneManager.goto(SceneMap_1.Scene_Map);
        }
    };
    Scene_ItemBase.prototype.playSeForItem = function () {
        //
    };
    return Scene_ItemBase;
}(SceneMenuBase_1.Scene_MenuBase));
exports.Scene_ItemBase = Scene_ItemBase;
