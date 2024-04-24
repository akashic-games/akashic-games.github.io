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
exports.Scene_Battle = void 0;
var Graphics_1 = require("../core/Graphics");
var AudioManager_1 = require("../managers/AudioManager");
var BattleManager_1 = require("../managers/BattleManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SpritesetBattle_1 = require("../sprites/SpritesetBattle");
var WindowActorCommand_1 = require("../windows/WindowActorCommand");
var WindowBattleActor_1 = require("../windows/WindowBattleActor");
var WindowBattleEnemy_1 = require("../windows/WindowBattleEnemy");
var WindowBattleItem_1 = require("../windows/WindowBattleItem");
var WindowBattleLog_1 = require("../windows/WindowBattleLog");
var WindowBattleSkill_1 = require("../windows/WindowBattleSkill");
var WindowBattleStatus_1 = require("../windows/WindowBattleStatus");
var WindowHelp_1 = require("../windows/WindowHelp");
var WindowMessage_1 = require("../windows/WindowMessage");
var WindowPartyCommand_1 = require("../windows/WindowPartyCommand");
var WindowScrollText_1 = require("../windows/WindowScrollText");
var SceneBase_1 = require("./SceneBase");
var SceneGameOver_1 = require("./SceneGameOver");
var SceneTitle_1 = require("./SceneTitle");
var Scene_Battle = /** @class */ (function (_super) {
    __extends(Scene_Battle, _super);
    function Scene_Battle() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Scene_Battle.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Scene_Battle.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Scene_Battle.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createDisplayObjects();
    };
    Scene_Battle.prototype.start = function () {
        _super.prototype.start.call(this);
        this.startFadeIn(this.fadeSpeed(), false);
        BattleManager_1.BattleManager.playBattleBgm();
        BattleManager_1.BattleManager.startBattle();
    };
    Scene_Battle.prototype.update = function () {
        var active = this.isActive();
        globals_1.$gameTimer.update(active);
        globals_1.$gameScreen.update();
        this.updateStatusWindow();
        this.updateWindowPositions();
        if (active && !this.isBusy()) {
            this.updateBattleProcess();
        }
        _super.prototype.update.call(this);
    };
    Scene_Battle.prototype.updateBattleProcess = function () {
        if (!this.isAnyInputWindowActive() || BattleManager_1.BattleManager.isAborting() || BattleManager_1.BattleManager.isBattleEnd()) {
            BattleManager_1.BattleManager.update();
            this.changeInputWindow();
        }
    };
    Scene_Battle.prototype.isAnyInputWindowActive = function () {
        return (this._partyCommandWindow.active ||
            this._actorCommandWindow.active ||
            this._skillWindow.active ||
            this._itemWindow.active ||
            this._actorWindow.active ||
            this._enemyWindow.active);
    };
    Scene_Battle.prototype.changeInputWindow = function () {
        if (BattleManager_1.BattleManager.isInputting()) {
            if (BattleManager_1.BattleManager.actor()) {
                this.startActorCommandSelection();
            }
            else {
                this.startPartyCommandSelection();
            }
        }
        else {
            this.endCommandSelection();
        }
    };
    Scene_Battle.prototype.stop = function () {
        _super.prototype.stop.call(this);
        if (this.needsSlowFadeOut()) {
            this.startFadeOut(this.slowFadeSpeed(), false);
        }
        else {
            this.startFadeOut(this.fadeSpeed(), false);
        }
        this._statusWindow.close();
        this._partyCommandWindow.close();
        this._actorCommandWindow.close();
    };
    Scene_Battle.prototype.terminate = function () {
        _super.prototype.terminate.call(this);
        globals_1.$gameParty.onBattleEnd();
        globals_1.$gameTroop.onBattleEnd();
        AudioManager_1.AudioManager.stopMe();
        ImageManager_1.ImageManager.clearRequest();
    };
    Scene_Battle.prototype.needsSlowFadeOut = function () {
        return SceneManager_1.SceneManager.isNextScene(SceneTitle_1.Scene_Title) || SceneManager_1.SceneManager.isNextScene(SceneGameOver_1.Scene_Gameover);
    };
    Scene_Battle.prototype.updateStatusWindow = function () {
        if (globals_1.$gameMessage.isBusy()) {
            this._statusWindow.close();
            this._partyCommandWindow.close();
            this._actorCommandWindow.close();
        }
        else if (this.isActive() && !this._messageWindow.isClosing()) {
            this._statusWindow.open();
        }
    };
    Scene_Battle.prototype.updateWindowPositions = function () {
        var statusX = 0;
        if (BattleManager_1.BattleManager.isInputting()) {
            statusX = this._partyCommandWindow.width;
        }
        else {
            statusX = this._partyCommandWindow.width / 2;
        }
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x += 16;
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x = statusX;
            }
        }
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x -= 16;
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x = statusX;
            }
        }
    };
    Scene_Battle.prototype.createDisplayObjects = function () {
        this.createSpriteset();
        this.createWindowLayer();
        this.createAllWindows();
        BattleManager_1.BattleManager.setLogWindow(this._logWindow);
        BattleManager_1.BattleManager.setStatusWindow(this._statusWindow);
        BattleManager_1.BattleManager.setSpriteset(this._spriteset);
        this._logWindow.setSpriteset(this._spriteset);
    };
    Scene_Battle.prototype.createSpriteset = function () {
        this._spriteset = new SpritesetBattle_1.Spriteset_Battle();
        this.addChild(this._spriteset);
    };
    Scene_Battle.prototype.createAllWindows = function () {
        this.createLogWindow();
        this.createStatusWindow();
        this.createPartyCommandWindow();
        this.createActorCommandWindow();
        this.createHelpWindow();
        this.createSkillWindow();
        this.createItemWindow();
        this.createActorWindow();
        this.createEnemyWindow();
        this.createMessageWindow();
        this.createScrollTextWindow();
    };
    Scene_Battle.prototype.createLogWindow = function () {
        this._logWindow = new WindowBattleLog_1.Window_BattleLog();
        this.addWindow(this._logWindow);
    };
    Scene_Battle.prototype.createStatusWindow = function () {
        this._statusWindow = new WindowBattleStatus_1.Window_BattleStatus();
        this.addWindow(this._statusWindow);
    };
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        this._partyCommandWindow = new WindowPartyCommand_1.Window_PartyCommand();
        this._partyCommandWindow.setHandler("fight", this.commandFight.bind(this));
        this._partyCommandWindow.setHandler("escape", this.commandEscape.bind(this));
        this._partyCommandWindow.deselect();
        this.addWindow(this._partyCommandWindow);
    };
    Scene_Battle.prototype.createActorCommandWindow = function () {
        this._actorCommandWindow = new WindowActorCommand_1.Window_ActorCommand();
        this._actorCommandWindow.setHandler("attack", this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler("skill", this.commandSkill.bind(this));
        this._actorCommandWindow.setHandler("guard", this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler("item", this.commandItem.bind(this));
        this._actorCommandWindow.setHandler("cancel", this.selectPreviousCommand.bind(this));
        this.addWindow(this._actorCommandWindow);
    };
    Scene_Battle.prototype.createHelpWindow = function () {
        this._helpWindow = new WindowHelp_1.Window_Help();
        this._helpWindow.visible = false;
        this.addWindow(this._helpWindow);
    };
    Scene_Battle.prototype.createSkillWindow = function () {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = this._statusWindow.y - wy;
        this._skillWindow = new WindowBattleSkill_1.Window_BattleSkill(0, wy, Graphics_1.Graphics.boxWidth, wh);
        this._skillWindow.setHelpWindow(this._helpWindow);
        this._skillWindow.setHandler("ok", this.onSkillOk.bind(this));
        this._skillWindow.setHandler("cancel", this.onSkillCancel.bind(this));
        this.addWindow(this._skillWindow);
    };
    Scene_Battle.prototype.createItemWindow = function () {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = this._statusWindow.y - wy;
        this._itemWindow = new WindowBattleItem_1.Window_BattleItem(0, wy, Graphics_1.Graphics.boxWidth, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
    };
    Scene_Battle.prototype.createActorWindow = function () {
        this._actorWindow = new WindowBattleActor_1.Window_BattleActor(0, this._statusWindow.y);
        this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
        this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    };
    Scene_Battle.prototype.createEnemyWindow = function () {
        this._enemyWindow = new WindowBattleEnemy_1.Window_BattleEnemy(0, this._statusWindow.y);
        this._enemyWindow.x = Graphics_1.Graphics.boxWidth - this._enemyWindow.width;
        this._enemyWindow.setHandler("ok", this.onEnemyOk.bind(this));
        this._enemyWindow.setHandler("cancel", this.onEnemyCancel.bind(this));
        this.addWindow(this._enemyWindow);
    };
    Scene_Battle.prototype.createMessageWindow = function () {
        var _this = this;
        this._messageWindow = new WindowMessage_1.Window_Message();
        this.addWindow(this._messageWindow);
        this._messageWindow.subWindows().forEach(function (window) {
            _this.addWindow(window);
        });
    };
    Scene_Battle.prototype.createScrollTextWindow = function () {
        this._scrollTextWindow = new WindowScrollText_1.Window_ScrollText();
        this.addWindow(this._scrollTextWindow);
    };
    Scene_Battle.prototype.refreshStatus = function () {
        this._statusWindow.refresh();
    };
    Scene_Battle.prototype.startPartyCommandSelection = function () {
        this.refreshStatus();
        this._statusWindow.deselect();
        this._statusWindow.open();
        this._actorCommandWindow.close();
        this._partyCommandWindow.setup();
    };
    Scene_Battle.prototype.commandFight = function () {
        this.selectNextCommand();
    };
    Scene_Battle.prototype.commandEscape = function () {
        BattleManager_1.BattleManager.processEscape();
        this.changeInputWindow();
    };
    Scene_Battle.prototype.startActorCommandSelection = function () {
        this._statusWindow.select(BattleManager_1.BattleManager.actor().index());
        this._partyCommandWindow.close();
        this._actorCommandWindow.setup(BattleManager_1.BattleManager.actor());
    };
    Scene_Battle.prototype.commandAttack = function () {
        BattleManager_1.BattleManager.inputtingAction().setAttack();
        this.selectEnemySelection();
    };
    Scene_Battle.prototype.commandSkill = function () {
        this._skillWindow.setActor(BattleManager_1.BattleManager.actor());
        this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
        this._skillWindow.refresh();
        this._skillWindow.show();
        this._skillWindow.activate();
    };
    Scene_Battle.prototype.commandGuard = function () {
        BattleManager_1.BattleManager.inputtingAction().setGuard();
        this.selectNextCommand();
    };
    Scene_Battle.prototype.commandItem = function () {
        this._itemWindow.refresh();
        this._itemWindow.show();
        this._itemWindow.activate();
    };
    Scene_Battle.prototype.selectNextCommand = function () {
        BattleManager_1.BattleManager.selectNextCommand();
        this.changeInputWindow();
    };
    Scene_Battle.prototype.selectPreviousCommand = function () {
        BattleManager_1.BattleManager.selectPreviousCommand();
        this.changeInputWindow();
    };
    Scene_Battle.prototype.selectActorSelection = function () {
        this._actorWindow.refresh();
        this._actorWindow.show();
        this._actorWindow.activate();
    };
    Scene_Battle.prototype.onActorOk = function () {
        var action = BattleManager_1.BattleManager.inputtingAction();
        action.setTarget(this._actorWindow.index());
        this._actorWindow.hide();
        this._skillWindow.hide();
        this._itemWindow.hide();
        this.selectNextCommand();
    };
    Scene_Battle.prototype.onActorCancel = function () {
        this._actorWindow.hide();
        switch (this._actorCommandWindow.currentSymbol()) {
            case "skill":
                this._skillWindow.show();
                this._skillWindow.activate();
                break;
            case "item":
                this._itemWindow.show();
                this._itemWindow.activate();
                break;
        }
    };
    Scene_Battle.prototype.selectEnemySelection = function () {
        this._enemyWindow.refresh();
        this._enemyWindow.show();
        this._enemyWindow.select(0);
        this._enemyWindow.activate();
    };
    Scene_Battle.prototype.onEnemyOk = function () {
        var action = BattleManager_1.BattleManager.inputtingAction();
        action.setTarget(this._enemyWindow.enemyIndex());
        this._enemyWindow.hide();
        this._skillWindow.hide();
        this._itemWindow.hide();
        this.selectNextCommand();
    };
    Scene_Battle.prototype.onEnemyCancel = function () {
        this._enemyWindow.hide();
        switch (this._actorCommandWindow.currentSymbol()) {
            case "attack":
                this._actorCommandWindow.activate();
                break;
            case "skill":
                this._skillWindow.show();
                this._skillWindow.activate();
                break;
            case "item":
                this._itemWindow.show();
                this._itemWindow.activate();
                break;
        }
    };
    Scene_Battle.prototype.onSkillOk = function () {
        var skill = this._skillWindow.item();
        var action = BattleManager_1.BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager_1.BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
    };
    Scene_Battle.prototype.onSkillCancel = function () {
        this._skillWindow.hide();
        this._actorCommandWindow.activate();
    };
    Scene_Battle.prototype.onItemOk = function () {
        var item = this._itemWindow.item();
        var action = BattleManager_1.BattleManager.inputtingAction();
        action.setItem(item.id);
        globals_1.$gameParty.setLastItem(item);
        this.onSelectAction();
    };
    Scene_Battle.prototype.onItemCancel = function () {
        this._itemWindow.hide();
        this._actorCommandWindow.activate();
    };
    Scene_Battle.prototype.onSelectAction = function () {
        var action = BattleManager_1.BattleManager.inputtingAction();
        this._skillWindow.hide();
        this._itemWindow.hide();
        if (!action.needsSelection()) {
            this.selectNextCommand();
        }
        else if (action.isForOpponent()) {
            this.selectEnemySelection();
        }
        else {
            this.selectActorSelection();
        }
    };
    Scene_Battle.prototype.endCommandSelection = function () {
        this._partyCommandWindow.close();
        this._actorCommandWindow.close();
        this._statusWindow.deselect();
    };
    return Scene_Battle;
}(SceneBase_1.Scene_Base));
exports.Scene_Battle = Scene_Battle;
