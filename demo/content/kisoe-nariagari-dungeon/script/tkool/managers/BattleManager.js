"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleManager = void 0;
var Utils_1 = require("../core/Utils");
var GameAction_1 = require("../objects/GameAction");
var SceneGameOver_1 = require("../scenes/SceneGameOver");
var AudioManager_1 = require("./AudioManager");
var globals_1 = require("./globals");
var SceneManager_1 = require("./SceneManager");
var SoundManager_1 = require("./SoundManager");
var TextManager_1 = require("./TextManager");
var BattleManager = /** @class */ (function () {
    function BattleManager() {
    }
    BattleManager.setup = function (troopId, canEscape, canLose) {
        this.initMembers();
        this._canEscape = canEscape;
        this._canLose = canLose;
        globals_1.$gameTroop.setup(troopId);
        globals_1.$gameScreen.onBattleStart();
        this.makeEscapeRatio();
    };
    BattleManager.initMembers = function () {
        this._phase = "init";
        this._canEscape = false;
        this._canLose = false;
        this._battleTest = false;
        this._eventCallback = null;
        this._preemptive = false;
        this._surprise = false;
        this._actorIndex = -1;
        this._actionForcedBattler = null;
        this._mapBgm = null;
        this._mapBgs = null;
        this._actionBattlers = [];
        this._subject = null;
        this._action = null;
        this._targets = [];
        this._logWindow = null;
        this._statusWindow = null;
        this._spriteset = null;
        this._escapeRatio = 0;
        this._escaped = false;
        this._rewards = {};
        this._turnForced = false;
    };
    BattleManager.isBattleTest = function () {
        return this._battleTest;
    };
    BattleManager.setBattleTest = function (battleTest) {
        this._battleTest = battleTest;
    };
    BattleManager.setEventCallback = function (callback) {
        this._eventCallback = callback;
    };
    BattleManager.setLogWindow = function (logWindow) {
        this._logWindow = logWindow;
    };
    BattleManager.setStatusWindow = function (statusWindow) {
        this._statusWindow = statusWindow;
    };
    BattleManager.setSpriteset = function (spriteset) {
        this._spriteset = spriteset;
    };
    BattleManager.onEncounter = function () {
        this._preemptive = g.game.vars.random.generate() < this.ratePreemptive();
        this._surprise = g.game.vars.random.generate() < this.rateSurprise() && !this._preemptive;
    };
    BattleManager.ratePreemptive = function () {
        return globals_1.$gameParty.ratePreemptive(globals_1.$gameTroop.agility());
    };
    BattleManager.rateSurprise = function () {
        return globals_1.$gameParty.rateSurprise(globals_1.$gameTroop.agility());
    };
    BattleManager.saveBgmAndBgs = function () {
        this._mapBgm = AudioManager_1.AudioManager.saveBgm();
        this._mapBgs = AudioManager_1.AudioManager.saveBgs();
    };
    BattleManager.playBattleBgm = function () {
        AudioManager_1.AudioManager.playBgm(globals_1.$gameSystem.battleBgm());
        AudioManager_1.AudioManager.stopBgs();
    };
    BattleManager.playVictoryMe = function () {
        AudioManager_1.AudioManager.playMe(globals_1.$gameSystem.victoryMe());
    };
    BattleManager.playDefeatMe = function () {
        AudioManager_1.AudioManager.playMe(globals_1.$gameSystem.defeatMe());
    };
    BattleManager.replayBgmAndBgs = function () {
        if (this._mapBgm) {
            AudioManager_1.AudioManager.replayBgm(this._mapBgm);
        }
        else {
            AudioManager_1.AudioManager.stopBgm();
        }
        if (this._mapBgs) {
            AudioManager_1.AudioManager.replayBgs(this._mapBgs);
        }
    };
    BattleManager.makeEscapeRatio = function () {
        this._escapeRatio = (0.5 * globals_1.$gameParty.agility()) / globals_1.$gameTroop.agility();
    };
    BattleManager.update = function () {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
                case "start":
                    this.startInput();
                    break;
                case "turn":
                    this.updateTurn();
                    break;
                case "action":
                    this.updateAction();
                    break;
                case "turnEnd":
                    this.updateTurnEnd();
                    break;
                case "battleEnd":
                    this.updateBattleEnd();
                    break;
            }
        }
    };
    BattleManager.updateEvent = function () {
        switch (this._phase) {
            case "start":
            case "turn":
            case "turnEnd":
                if (this.isActionForced()) {
                    this.processForcedAction();
                    return true;
                }
                else {
                    return this.updateEventMain();
                }
        }
        return this.checkAbort();
    };
    BattleManager.updateEventMain = function () {
        globals_1.$gameTroop.updateInterpreter();
        globals_1.$gameParty.requestMotionRefresh();
        if (globals_1.$gameTroop.isEventRunning() || this.checkBattleEnd()) {
            return true;
        }
        globals_1.$gameTroop.setupBattleEvent();
        if (globals_1.$gameTroop.isEventRunning() || SceneManager_1.SceneManager.isSceneChanging()) {
            return true;
        }
        return false;
    };
    BattleManager.isBusy = function () {
        return globals_1.$gameMessage.isBusy() || this._spriteset.isBusy() || this._logWindow.isBusy();
    };
    BattleManager.isInputting = function () {
        return this._phase === "input";
    };
    BattleManager.isInTurn = function () {
        return this._phase === "turn";
    };
    BattleManager.isTurnEnd = function () {
        return this._phase === "turnEnd";
    };
    BattleManager.isAborting = function () {
        return this._phase === "aborting";
    };
    BattleManager.isBattleEnd = function () {
        return this._phase === "battleEnd";
    };
    BattleManager.canEscape = function () {
        return this._canEscape;
    };
    BattleManager.canLose = function () {
        return this._canLose;
    };
    BattleManager.isEscaped = function () {
        return this._escaped;
    };
    BattleManager.actor = function () {
        return this._actorIndex >= 0 ? globals_1.$gameParty.members()[this._actorIndex] : null;
    };
    BattleManager.clearActor = function () {
        this.changeActor(-1, "");
    };
    BattleManager.changeActor = function (newActorIndex, lastActorActionState) {
        var lastActor = this.actor();
        this._actorIndex = newActorIndex;
        var newActor = this.actor();
        if (lastActor) {
            lastActor.setActionState(lastActorActionState);
        }
        if (newActor) {
            newActor.setActionState("inputting");
        }
    };
    BattleManager.startBattle = function () {
        this._phase = "start";
        globals_1.$gameSystem.onBattleStart();
        globals_1.$gameParty.onBattleStart();
        globals_1.$gameTroop.onBattleStart();
        this.displayStartMessages();
    };
    BattleManager.displayStartMessages = function () {
        globals_1.$gameTroop.enemyNames().forEach(function (name) {
            globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.emerge, name));
        });
        if (this._preemptive) {
            globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.preemptive, globals_1.$gameParty.name()));
        }
        else if (this._surprise) {
            globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.surprise, globals_1.$gameParty.name()));
        }
    };
    BattleManager.startInput = function () {
        this._phase = "input";
        globals_1.$gameParty.makeActions();
        globals_1.$gameTroop.makeActions();
        this.clearActor();
        if (this._surprise || !globals_1.$gameParty.canInput()) {
            this.startTurn();
        }
    };
    BattleManager.inputtingAction = function () {
        return this.actor() ? this.actor().inputtingAction() : null;
    };
    BattleManager.selectNextCommand = function () {
        do {
            if (!this.actor() || !this.actor().selectNextCommand()) {
                this.changeActor(this._actorIndex + 1, "waiting");
                if (this._actorIndex >= globals_1.$gameParty.size()) {
                    this.startTurn();
                    break;
                }
            }
        } while (!this.actor().canInput());
    };
    BattleManager.selectPreviousCommand = function () {
        do {
            if (!this.actor() || !this.actor().selectPreviousCommand()) {
                this.changeActor(this._actorIndex - 1, "undecided");
                if (this._actorIndex < 0) {
                    return;
                }
            }
        } while (!this.actor().canInput());
    };
    BattleManager.refreshStatus = function () {
        this._statusWindow.refresh();
    };
    BattleManager.startTurn = function () {
        this._phase = "turn";
        this.clearActor();
        globals_1.$gameTroop.increaseTurn();
        this.makeActionOrders();
        globals_1.$gameParty.requestMotionRefresh();
        this._logWindow.startTurn();
    };
    BattleManager.updateTurn = function () {
        globals_1.$gameParty.requestMotionRefresh();
        if (!this._subject) {
            this._subject = this.getNextSubject();
        }
        if (this._subject) {
            this.processTurn();
        }
        else {
            this.endTurn();
        }
    };
    BattleManager.processTurn = function () {
        var subject = this._subject;
        var action = subject.currentAction();
        if (action) {
            action.prepare();
            if (action.isValid()) {
                this.startAction();
            }
            subject.removeCurrentAction();
        }
        else {
            subject.onAllActionsEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(subject);
            this._logWindow.displayCurrentState(subject);
            this._logWindow.displayRegeneration(subject);
            this._subject = this.getNextSubject();
        }
    };
    BattleManager.endTurn = function () {
        var _this = this;
        this._phase = "turnEnd";
        this._preemptive = false;
        this._surprise = false;
        this.allBattleMembers().forEach(function (battler) {
            battler.onTurnEnd();
            _this.refreshStatus();
            _this._logWindow.displayAutoAffectedStatus(battler);
            _this._logWindow.displayRegeneration(battler);
        });
        if (this.isForcedTurn()) {
            this._turnForced = false;
        }
    };
    BattleManager.isForcedTurn = function () {
        return this._turnForced;
    };
    BattleManager.updateTurnEnd = function () {
        this.startInput();
    };
    BattleManager.getNextSubject = function () {
        for (;;) {
            var battler = this._actionBattlers.shift();
            if (!battler) {
                return null;
            }
            if (battler.isBattleMember() && battler.isAlive()) {
                return battler;
            }
        }
    };
    BattleManager.allBattleMembers = function () {
        // Actor配列 と Enemy配列 を結合するので、共通の親クラスの配列に型を変換する
        return globals_1.$gameParty.members().concat(globals_1.$gameTroop.members());
    };
    BattleManager.makeActionOrders = function () {
        var battlers = [];
        if (!this._surprise) {
            battlers = battlers.concat(globals_1.$gameParty.members());
        }
        if (!this._preemptive) {
            battlers = battlers.concat(globals_1.$gameTroop.members());
        }
        battlers.forEach(function (battler) {
            battler.makeSpeed();
        });
        battlers.sort(function (a, b) {
            return b.speed() - a.speed();
        });
        this._actionBattlers = battlers;
    };
    BattleManager.startAction = function () {
        var subject = this._subject;
        var action = subject.currentAction();
        var targets = action.makeTargets();
        this._phase = "action";
        this._action = action;
        this._targets = targets;
        subject.useItem(action.item());
        this._action.applyGlobal();
        this.refreshStatus();
        this._logWindow.startAction(subject, action, targets);
    };
    BattleManager.updateAction = function () {
        var target = this._targets.shift();
        if (target) {
            this.invokeAction(this._subject, target);
        }
        else {
            this.endAction();
        }
    };
    BattleManager.endAction = function () {
        this._logWindow.endAction(this._subject);
        this._phase = "turn";
    };
    BattleManager.invokeAction = function (subject, target) {
        this._logWindow.push("pushBaseLine");
        if (g.game.vars.random.generate() < this._action.itemCnt(target)) {
            this.invokeCounterAttack(subject, target);
        }
        else if (g.game.vars.random.generate() < this._action.itemMrf(target)) {
            this.invokeMagicReflection(subject, target);
        }
        else {
            this.invokeNormalAction(subject, target);
        }
        subject.setLastTarget(target);
        this._logWindow.push("popBaseLine");
        this.refreshStatus();
    };
    BattleManager.invokeNormalAction = function (subject, target) {
        var realTarget = this.applySubstitute(target);
        this._action.apply(realTarget);
        this._logWindow.displayActionResults(subject, realTarget);
    };
    BattleManager.invokeCounterAttack = function (subject, target) {
        var action = new GameAction_1.Game_Action(target);
        action.setAttack();
        action.apply(subject);
        this._logWindow.displayCounter(target);
        this._logWindow.displayActionResults(target, subject);
    };
    BattleManager.invokeMagicReflection = function (subject, target) {
        this._action._reflectionTarget = target;
        this._logWindow.displayReflection(target);
        this._action.apply(subject);
        this._logWindow.displayActionResults(target, subject);
    };
    BattleManager.applySubstitute = function (target) {
        if (this.checkSubstitute(target)) {
            var substitute = target.friendsUnit().substituteBattler();
            if (substitute && target !== substitute) {
                this._logWindow.displaySubstitute(substitute, target);
                return substitute;
            }
        }
        return target;
    };
    BattleManager.checkSubstitute = function (target) {
        return target.isDying() && !this._action.isCertainHit();
    };
    BattleManager.isActionForced = function () {
        return !!this._actionForcedBattler;
    };
    BattleManager.forceAction = function (battler) {
        this._actionForcedBattler = battler;
        var index = this._actionBattlers.indexOf(battler);
        if (index >= 0) {
            this._actionBattlers.splice(index, 1);
        }
    };
    BattleManager.processForcedAction = function () {
        if (this._actionForcedBattler) {
            this._turnForced = true;
            this._subject = this._actionForcedBattler;
            this._actionForcedBattler = null;
            this.startAction();
            this._subject.removeCurrentAction();
        }
    };
    BattleManager.abort = function () {
        this._phase = "aborting";
    };
    BattleManager.checkBattleEnd = function () {
        if (this._phase) {
            if (this.checkAbort()) {
                return true;
            }
            else if (globals_1.$gameParty.isAllDead()) {
                this.processDefeat();
                return true;
            }
            else if (globals_1.$gameTroop.isAllDead()) {
                this.processVictory();
                return true;
            }
        }
        return false;
    };
    BattleManager.checkAbort = function () {
        if (globals_1.$gameParty.isEmpty() || this.isAborting()) {
            SoundManager_1.SoundManager.playEscape();
            this._escaped = true;
            this.processAbort();
        }
        return false;
    };
    BattleManager.processVictory = function () {
        globals_1.$gameParty.removeBattleStates();
        globals_1.$gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        this.displayVictoryMessage();
        this.displayRewards();
        this.gainRewards();
        this.endBattle(0);
    };
    BattleManager.processEscape = function () {
        globals_1.$gameParty.performEscape();
        SoundManager_1.SoundManager.playEscape();
        var success = this._preemptive ? true : g.game.vars.random.generate() < this._escapeRatio;
        if (success) {
            this.displayEscapeSuccessMessage();
            this._escaped = true;
            this.processAbort();
        }
        else {
            this.displayEscapeFailureMessage();
            this._escapeRatio += 0.1;
            globals_1.$gameParty.clearActions();
            this.startTurn();
        }
        return success;
    };
    BattleManager.processAbort = function () {
        globals_1.$gameParty.removeBattleStates();
        this.replayBgmAndBgs();
        this.endBattle(1);
    };
    BattleManager.processDefeat = function () {
        this.displayDefeatMessage();
        this.playDefeatMe();
        if (this._canLose) {
            this.replayBgmAndBgs();
        }
        else {
            AudioManager_1.AudioManager.stopBgm();
        }
        this.endBattle(2);
    };
    BattleManager.endBattle = function (result) {
        this._phase = "battleEnd";
        if (this._eventCallback) {
            this._eventCallback(result);
        }
        if (result === 0) {
            globals_1.$gameSystem.onBattleWin();
        }
        else if (this._escaped) {
            globals_1.$gameSystem.onBattleEscape();
        }
    };
    BattleManager.updateBattleEnd = function () {
        if (this.isBattleTest()) {
            AudioManager_1.AudioManager.stopBgm();
            SceneManager_1.SceneManager.exit();
        }
        else if (!this._escaped && globals_1.$gameParty.isAllDead()) {
            if (this._canLose) {
                globals_1.$gameParty.reviveBattleMembers();
                SceneManager_1.SceneManager.pop();
            }
            else {
                SceneManager_1.SceneManager.goto(SceneGameOver_1.Scene_Gameover);
            }
        }
        else {
            SceneManager_1.SceneManager.pop();
        }
        this._phase = null;
    };
    BattleManager.makeRewards = function () {
        this._rewards = {};
        this._rewards.gold = globals_1.$gameTroop.goldTotal();
        this._rewards.exp = globals_1.$gameTroop.expTotal();
        this._rewards.items = globals_1.$gameTroop.makeDropItems();
    };
    BattleManager.displayVictoryMessage = function () {
        globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.victory, globals_1.$gameParty.name()));
    };
    BattleManager.displayDefeatMessage = function () {
        globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.defeat, globals_1.$gameParty.name()));
    };
    BattleManager.displayEscapeSuccessMessage = function () {
        globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.escapeStart, globals_1.$gameParty.name()));
    };
    BattleManager.displayEscapeFailureMessage = function () {
        globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.escapeStart, globals_1.$gameParty.name()));
        globals_1.$gameMessage.add("\\." + TextManager_1.TextManager.escapeFailure);
    };
    BattleManager.displayRewards = function () {
        this.displayExp();
        this.displayGold();
        this.displayDropItems();
    };
    BattleManager.displayExp = function () {
        var exp = this._rewards.exp;
        if (exp > 0) {
            var text = Utils_1.Utils.format(TextManager_1.TextManager.obtainExp, exp, TextManager_1.TextManager.exp);
            globals_1.$gameMessage.add("\\." + text);
        }
    };
    BattleManager.displayGold = function () {
        var gold = this._rewards.gold;
        if (gold > 0) {
            globals_1.$gameMessage.add("\\." + Utils_1.Utils.format(TextManager_1.TextManager.obtainGold, gold));
        }
    };
    BattleManager.displayDropItems = function () {
        var items = this._rewards.items;
        if (items.length > 0) {
            globals_1.$gameMessage.newPage();
            items.forEach(function (item) {
                globals_1.$gameMessage.add(Utils_1.Utils.format(TextManager_1.TextManager.obtainItem, item.name));
            });
        }
    };
    BattleManager.gainRewards = function () {
        this.gainExp();
        this.gainGold();
        this.gainDropItems();
    };
    BattleManager.gainExp = function () {
        var exp = this._rewards.exp;
        globals_1.$gameParty.allMembers().forEach(function (actor) {
            actor.gainExp(exp);
        });
    };
    BattleManager.gainGold = function () {
        globals_1.$gameParty.gainGold(this._rewards.gold);
    };
    BattleManager.gainDropItems = function () {
        var items = this._rewards.items;
        items.forEach(function (item) {
            globals_1.$gameParty.gainItem(item, 1);
        });
    };
    return BattleManager;
}());
exports.BattleManager = BattleManager;
