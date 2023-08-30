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
exports.Window_BattleLog = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_BattleLog = /** @class */ (function (_super) {
    __extends(Window_BattleLog, _super);
    function Window_BattleLog(scene) {
        return _super.call(this, scene) || this;
    }
    Window_BattleLog.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        _super.prototype.initialize.call(this, 0, 0, width, height);
        // このプロパティは Window 自身でなく Window._windowSpriteContainer を操作する（子要素）。
        // ウィンドウ枠を非表示にし、黒帯をつけた文字列だけを表示する意図でそのようにしている。
        this.opacity = 0;
        this._lines = [];
        this._methods = [];
        this._waitCount = 0;
        this._waitMode = "";
        this._baseLineStack = [];
        this._spriteset = null;
        this.createBackBitmap();
        this.createBackSprite();
        this.refresh();
    };
    Window_BattleLog.prototype.setSpriteset = function (spriteset) {
        this._spriteset = spriteset;
    };
    Window_BattleLog.prototype.windowWidth = function () {
        return core_1.Graphics.boxWidth;
    };
    Window_BattleLog.prototype.windowHeight = function () {
        return this.fittingHeight(this.maxLines());
    };
    Window_BattleLog.prototype.maxLines = function () {
        return 10;
    };
    Window_BattleLog.prototype.createBackBitmap = function () {
        this._backBitmap = new core_1.Bitmap(this.width, this.height);
    };
    Window_BattleLog.prototype.createBackSprite = function () {
        this._backSprite = new core_1.Sprite(this.scene);
        this._backSprite.bitmap = this._backBitmap;
        this._backSprite.y = this.y;
        this.addChildToBack(this._backSprite);
    };
    Window_BattleLog.prototype.numLines = function () {
        return this._lines.length;
    };
    Window_BattleLog.prototype.messageSpeed = function () {
        return 16;
    };
    Window_BattleLog.prototype.isBusy = function () {
        return this._waitCount > 0 || this._waitMode || this._methods.length > 0;
    };
    Window_BattleLog.prototype.update = function () {
        if (!this.updateWait()) {
            this.callNextMethod();
        }
    };
    Window_BattleLog.prototype.updateWait = function () {
        return this.updateWaitCount() || this.updateWaitMode();
    };
    Window_BattleLog.prototype.updateWaitCount = function () {
        if (this._waitCount > 0) {
            this._waitCount -= this.isFastForward() ? 3 : 1;
            if (this._waitCount < 0) {
                this._waitCount = 0;
            }
            return true;
        }
        return false;
    };
    Window_BattleLog.prototype.updateWaitMode = function () {
        var waiting = false;
        switch (this._waitMode) {
            case "effect":
                waiting = this._spriteset.isEffecting();
                break;
            case "movement":
                waiting = this._spriteset.isAnyoneMoving();
                break;
        }
        if (!waiting) {
            this._waitMode = "";
        }
        return waiting;
    };
    Window_BattleLog.prototype.setWaitMode = function (waitMode) {
        this._waitMode = waitMode;
    };
    Window_BattleLog.prototype.callNextMethod = function () {
        if (this._methods.length > 0) {
            var method = this._methods.shift();
            if (method.name && this[method.name]) {
                this[method.name].apply(this, method.params);
            }
            else {
                throw new Error("Method not found: " + method.name);
            }
        }
    };
    Window_BattleLog.prototype.isFastForward = function () {
        return (
        /* Input.isLongPressed("ok") || Input.isPressed("shift") ||*/
        core_1.TouchInput.isLongPressed());
    };
    // push(methodName: string) {
    // 	const methodArgs = Array.prototype.slice.call(arguments, 1);
    // 	this._methods.push({ name: methodName, params: methodArgs });
    // }
    Window_BattleLog.prototype.push = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var methodArgs = args; // Array.prototype.slice.call(arguments, 1);
        this._methods.push({ name: methodName, params: methodArgs });
    };
    Window_BattleLog.prototype.clear = function () {
        this._lines = [];
        this._baseLineStack = [];
        this.refresh();
    };
    Window_BattleLog.prototype.wait = function () {
        this._waitCount = this.messageSpeed();
    };
    Window_BattleLog.prototype.waitForEffect = function () {
        this.setWaitMode("effect");
    };
    Window_BattleLog.prototype.waitForMovement = function () {
        this.setWaitMode("movement");
    };
    Window_BattleLog.prototype.addText = function (text) {
        this._lines.push(text);
        this.refresh();
        this.wait();
    };
    Window_BattleLog.prototype.pushBaseLine = function () {
        this._baseLineStack.push(this._lines.length);
    };
    Window_BattleLog.prototype.popBaseLine = function () {
        var baseLine = this._baseLineStack.pop();
        while (this._lines.length > baseLine) {
            this._lines.pop();
        }
    };
    Window_BattleLog.prototype.waitForNewLine = function () {
        var baseLine = 0;
        if (this._baseLineStack.length > 0) {
            baseLine = this._baseLineStack[this._baseLineStack.length - 1];
        }
        if (this._lines.length > baseLine) {
            this.wait();
        }
    };
    Window_BattleLog.prototype.popupDamage = function (target) {
        target.startDamagePopup();
    };
    Window_BattleLog.prototype.performActionStart = function (subject, action) {
        subject.performActionStart(action);
    };
    Window_BattleLog.prototype.performAction = function (subject, action) {
        subject.performAction(action);
    };
    Window_BattleLog.prototype.performActionEnd = function (subject) {
        subject.performActionEnd();
    };
    Window_BattleLog.prototype.performDamage = function (target) {
        target.performDamage();
    };
    Window_BattleLog.prototype.performMiss = function (target) {
        target.performMiss();
    };
    Window_BattleLog.prototype.performRecovery = function (target) {
        target.performRecovery();
    };
    Window_BattleLog.prototype.performEvasion = function (target) {
        target.performEvasion();
    };
    Window_BattleLog.prototype.performMagicEvasion = function (target) {
        target.performMagicEvasion();
    };
    Window_BattleLog.prototype.performCounter = function (target) {
        target.performCounter();
    };
    Window_BattleLog.prototype.performReflection = function (target) {
        target.performReflection();
    };
    Window_BattleLog.prototype.performSubstitute = function (substitute, target) {
        substitute.performSubstitute(target);
    };
    Window_BattleLog.prototype.performCollapse = function (target) {
        target.performCollapse();
    };
    Window_BattleLog.prototype.showAnimation = function (subject, targets, animationId) {
        if (animationId < 0) {
            this.showAttackAnimation(subject, targets);
        }
        else {
            this.showNormalAnimation(targets, animationId);
        }
    };
    Window_BattleLog.prototype.showAttackAnimation = function (subject, targets) {
        if (subject.isActor()) {
            this.showActorAttackAnimation(subject, targets);
        }
        else {
            this.showEnemyAttackAnimation(subject, targets);
        }
    };
    Window_BattleLog.prototype.showActorAttackAnimation = function (subject, targets) {
        this.showNormalAnimation(targets, subject.attackAnimationId1(), false);
        this.showNormalAnimation(targets, subject.attackAnimationId2(), true);
    };
    Window_BattleLog.prototype.showEnemyAttackAnimation = function (_subject, _targets) {
        managers_1.SoundManager.playEnemyAttack();
    };
    Window_BattleLog.prototype.showNormalAnimation = function (targets, animationId, mirror) {
        var animation = DataManager_1.$dataAnimations[animationId];
        if (animation) {
            var delay_1 = this.animationBaseDelay();
            var nextDelay_1 = this.animationNextDelay();
            targets.forEach(function (target) {
                target.startAnimation(animationId, mirror, delay_1);
                delay_1 += nextDelay_1;
            });
        }
    };
    Window_BattleLog.prototype.animationBaseDelay = function () {
        return 8;
    };
    Window_BattleLog.prototype.animationNextDelay = function () {
        return 12;
    };
    Window_BattleLog.prototype.refresh = function () {
        this.drawBackground();
        this.contents.clear();
        for (var i = 0; i < this._lines.length; i++) {
            this.drawLineText(i);
        }
    };
    Window_BattleLog.prototype.drawBackground = function () {
        var rect = this.backRect();
        var color = this.backColor();
        this._backBitmap.clear();
        this._backBitmap.paintOpacity = this.backPaintOpacity();
        this._backBitmap.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this._backBitmap.paintOpacity = 255;
    };
    Window_BattleLog.prototype.backRect = function () {
        return {
            x: 0,
            y: this.padding,
            width: this.width,
            height: this.numLines() * this.lineHeight()
        };
    };
    Window_BattleLog.prototype.backColor = function () {
        return "#000000";
    };
    Window_BattleLog.prototype.backPaintOpacity = function () {
        return 64;
    };
    Window_BattleLog.prototype.drawLineText = function (index) {
        var rect = this.itemRectForText(index);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
        this.drawTextEx(this._lines[index], rect.x, rect.y, rect.width);
    };
    Window_BattleLog.prototype.startTurn = function () {
        this.push("wait");
    };
    Window_BattleLog.prototype.startAction = function (subject, action, targets) {
        var item = action.item();
        this.push("performActionStart", subject, action);
        this.push("waitForMovement");
        this.push("performAction", subject, action);
        this.push("showAnimation", subject, core_1.Utils.cloneArray(targets), item.animationId);
        this.displayAction(subject, item);
    };
    Window_BattleLog.prototype.endAction = function (subject) {
        this.push("waitForNewLine");
        this.push("clear");
        this.push("performActionEnd", subject);
    };
    Window_BattleLog.prototype.displayCurrentState = function (subject) {
        var stateText = subject.mostImportantStateText();
        if (stateText) {
            this.push("addText", subject.name() + stateText);
            this.push("wait");
            this.push("clear");
        }
    };
    Window_BattleLog.prototype.displayRegeneration = function (subject) {
        this.push("popupDamage", subject);
    };
    Window_BattleLog.prototype.displayAction = function (subject, item) {
        var numMethods = this._methods.length;
        if (managers_1.DataManager.isSkill(item)) {
            if (item.message1) {
                this.push("addText", subject.name() + core_1.Utils.format(item.message1, item.name));
            }
            if (item.message2) {
                this.push("addText", core_1.Utils.format(item.message2, item.name));
            }
        }
        else {
            this.push("addText", core_1.Utils.format(managers_1.TextManager.useItem, subject.name(), item.name));
        }
        if (this._methods.length === numMethods) {
            this.push("wait");
        }
    };
    Window_BattleLog.prototype.displayCounter = function (target) {
        this.push("performCounter", target);
        this.push("addText", core_1.Utils.format(managers_1.TextManager.counterAttack, target.name()));
    };
    Window_BattleLog.prototype.displayReflection = function (target) {
        this.push("performReflection", target);
        this.push("addText", core_1.Utils.format(managers_1.TextManager.magicReflection, target.name()));
    };
    Window_BattleLog.prototype.displaySubstitute = function (substitute, target) {
        var substName = substitute.name();
        this.push("performSubstitute", substitute, target);
        this.push("addText", core_1.Utils.format(managers_1.TextManager.substitute, substName, target.name()));
    };
    Window_BattleLog.prototype.displayActionResults = function (subject, target) {
        if (target.result().used) {
            this.push("pushBaseLine");
            this.displayCritical(target);
            this.push("popupDamage", target);
            this.push("popupDamage", subject);
            this.displayDamage(target);
            this.displayAffectedStatus(target);
            this.displayFailure(target);
            this.push("waitForNewLine");
            this.push("popBaseLine");
        }
    };
    Window_BattleLog.prototype.displayFailure = function (target) {
        if (target.result().isHit() && !target.result().success) {
            this.push("addText", core_1.Utils.format(managers_1.TextManager.actionFailure, target.name()));
        }
    };
    Window_BattleLog.prototype.displayCritical = function (target) {
        if (target.result().critical) {
            if (target.isActor()) {
                this.push("addText", managers_1.TextManager.criticalToActor);
            }
            else {
                this.push("addText", managers_1.TextManager.criticalToEnemy);
            }
        }
    };
    Window_BattleLog.prototype.displayDamage = function (target) {
        if (target.result().missed) {
            this.displayMiss(target);
        }
        else if (target.result().evaded) {
            this.displayEvasion(target);
        }
        else {
            this.displayHpDamage(target);
            this.displayMpDamage(target);
            this.displayTpDamage(target);
        }
    };
    Window_BattleLog.prototype.displayMiss = function (target) {
        var fmt;
        if (target.result().physical) {
            fmt = target.isActor() ? managers_1.TextManager.actorNoHit : managers_1.TextManager.enemyNoHit;
            this.push("performMiss", target);
        }
        else {
            fmt = managers_1.TextManager.actionFailure;
        }
        this.push("addText", core_1.Utils.format(fmt, target.name()));
    };
    Window_BattleLog.prototype.displayEvasion = function (target) {
        var fmt;
        if (target.result().physical) {
            fmt = managers_1.TextManager.evasion;
            this.push("performEvasion", target);
        }
        else {
            fmt = managers_1.TextManager.magicEvasion;
            this.push("performMagicEvasion", target);
        }
        this.push("addText", core_1.Utils.format(fmt, target.name()));
    };
    Window_BattleLog.prototype.displayHpDamage = function (target) {
        if (target.result().hpAffected) {
            if (target.result().hpDamage > 0 && !target.result().drain) {
                this.push("performDamage", target);
            }
            if (target.result().hpDamage < 0) {
                this.push("performRecovery", target);
            }
            this.push("addText", this.makeHpDamageText(target));
        }
    };
    Window_BattleLog.prototype.displayMpDamage = function (target) {
        if (target.isAlive() && target.result().mpDamage !== 0) {
            if (target.result().mpDamage < 0) {
                this.push("performRecovery", target);
            }
            this.push("addText", this.makeMpDamageText(target));
        }
    };
    Window_BattleLog.prototype.displayTpDamage = function (target) {
        if (target.isAlive() && target.result().tpDamage !== 0) {
            if (target.result().tpDamage < 0) {
                this.push("performRecovery", target);
            }
            this.push("addText", this.makeTpDamageText(target));
        }
    };
    Window_BattleLog.prototype.displayAffectedStatus = function (target, _value) {
        // なぜか displayAutoAffectedStatus が第二引数を与える
        if (target.result().isStatusAffected()) {
            this.push("pushBaseLine");
            this.displayChangedStates(target);
            this.displayChangedBuffs(target);
            this.push("waitForNewLine");
            this.push("popBaseLine");
        }
    };
    Window_BattleLog.prototype.displayAutoAffectedStatus = function (target) {
        if (target.result().isStatusAffected()) {
            this.displayAffectedStatus(target, null);
            this.push("clear");
        }
    };
    Window_BattleLog.prototype.displayChangedStates = function (target) {
        this.displayAddedStates(target);
        this.displayRemovedStates(target);
    };
    Window_BattleLog.prototype.displayAddedStates = function (target) {
        var _this = this;
        target
            .result()
            .addedStateObjects()
            .forEach(function (state) {
            var stateMsg = target.isActor() ? state.message1 : state.message2;
            if (state.id === target.deathStateId()) {
                _this.push("performCollapse", target);
            }
            if (stateMsg) {
                _this.push("popBaseLine");
                _this.push("pushBaseLine");
                _this.push("addText", target.name() + stateMsg);
                _this.push("waitForEffect");
            }
        });
    };
    Window_BattleLog.prototype.displayRemovedStates = function (target) {
        var _this = this;
        target
            .result()
            .removedStateObjects()
            .forEach(function (state) {
            if (state.message4) {
                _this.push("popBaseLine");
                _this.push("pushBaseLine");
                _this.push("addText", target.name() + state.message4);
            }
        });
    };
    Window_BattleLog.prototype.displayChangedBuffs = function (target) {
        var result = target.result();
        this.displayBuffs(target, result.addedBuffs, managers_1.TextManager.buffAdd);
        this.displayBuffs(target, result.addedDebuffs, managers_1.TextManager.debuffAdd);
        this.displayBuffs(target, result.removedBuffs, managers_1.TextManager.buffRemove);
    };
    Window_BattleLog.prototype.displayBuffs = function (target, buffs, fmt) {
        var _this = this;
        buffs.forEach(function (paramId) {
            _this.push("popBaseLine");
            _this.push("pushBaseLine");
            _this.push("addText", core_1.Utils.format(fmt, target.name(), managers_1.TextManager.param(paramId)));
        });
    };
    Window_BattleLog.prototype.makeHpDamageText = function (target) {
        var result = target.result();
        var damage = result.hpDamage;
        var isActor = target.isActor();
        var fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? managers_1.TextManager.actorDrain : managers_1.TextManager.enemyDrain;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.hp, damage);
        }
        else if (damage > 0) {
            fmt = isActor ? managers_1.TextManager.actorDamage : managers_1.TextManager.enemyDamage;
            return core_1.Utils.format(fmt, target.name(), damage);
        }
        else if (damage < 0) {
            fmt = isActor ? managers_1.TextManager.actorRecovery : managers_1.TextManager.enemyRecovery;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.hp, -damage);
        }
        else {
            fmt = isActor ? managers_1.TextManager.actorNoDamage : managers_1.TextManager.enemyNoDamage;
            return core_1.Utils.format(fmt, target.name());
        }
    };
    Window_BattleLog.prototype.makeMpDamageText = function (target) {
        var result = target.result();
        var damage = result.mpDamage;
        var isActor = target.isActor();
        var fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? managers_1.TextManager.actorDrain : managers_1.TextManager.enemyDrain;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.mp, damage);
        }
        else if (damage > 0) {
            fmt = isActor ? managers_1.TextManager.actorLoss : managers_1.TextManager.enemyLoss;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.mp, damage);
        }
        else if (damage < 0) {
            fmt = isActor ? managers_1.TextManager.actorRecovery : managers_1.TextManager.enemyRecovery;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.mp, -damage);
        }
        else {
            return "";
        }
    };
    Window_BattleLog.prototype.makeTpDamageText = function (target) {
        var result = target.result();
        var damage = result.tpDamage;
        var isActor = target.isActor();
        var fmt;
        if (damage > 0) {
            fmt = isActor ? managers_1.TextManager.actorLoss : managers_1.TextManager.enemyLoss;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.tp, damage);
        }
        else if (damage < 0) {
            fmt = isActor ? managers_1.TextManager.actorGain : managers_1.TextManager.enemyGain;
            return core_1.Utils.format(fmt, target.name(), managers_1.TextManager.tp, -damage);
        }
        else {
            return "";
        }
    };
    return Window_BattleLog;
}(WindowSelectable_1.Window_Selectable));
exports.Window_BattleLog = Window_BattleLog;
