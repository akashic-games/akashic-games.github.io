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
exports.Sprite_Actor = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var SpriteBase_1 = require("./SpriteBase");
var SpriteBattler_1 = require("./SpriteBattler");
var SpriteStateOverlay_1 = require("./SpriteStateOverlay");
var SpriteWeapon_1 = require("./SpriteWeapon");
var Sprite_Actor = /** @class */ (function (_super) {
    __extends(Sprite_Actor, _super);
    function Sprite_Actor(actor) {
        return _super.call(this, actor) || this;
    }
    Sprite_Actor.prototype.initialize = function (actor) {
        _super.prototype.initialize.call(this, actor);
        this.moveToStartPosition();
    };
    Sprite_Actor.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._battlerName = "";
        this._motion = null;
        this._motionCount = 0;
        this._pattern = 0;
        this.createShadowSprite();
        this.createWeaponSprite();
        this.createMainSprite();
        this.createStateSprite();
    };
    Sprite_Actor.prototype.createMainSprite = function () {
        this._mainSprite = new SpriteBase_1.Sprite_Base();
        this._mainSprite.anchor.x = 0.5;
        this._mainSprite.anchor.y = 1;
        this.addChild(this._mainSprite);
        this._effectTarget = this._mainSprite;
    };
    Sprite_Actor.prototype.createShadowSprite = function () {
        this._shadowSprite = new core_1.Sprite();
        this._shadowSprite.bitmap = managers_1.ImageManager.loadSystem("Shadow2");
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 0.5;
        this._shadowSprite.y = -2;
        this.addChild(this._shadowSprite);
    };
    Sprite_Actor.prototype.createWeaponSprite = function () {
        this._weaponSprite = new SpriteWeapon_1.Sprite_Weapon();
        this.addChild(this._weaponSprite);
    };
    Sprite_Actor.prototype.createStateSprite = function () {
        this._stateSprite = new SpriteStateOverlay_1.Sprite_StateOverlay();
        this.addChild(this._stateSprite);
    };
    Sprite_Actor.prototype.setBattler = function (battler) {
        _super.prototype.setBattler.call(this, battler);
        var changed = battler !== this._actor;
        if (changed) {
            this._actor = battler;
            if (battler) {
                this.setActorHome(battler.index());
            }
            this.startEntryMotion();
            this._stateSprite.setup(battler);
        }
    };
    Sprite_Actor.prototype.moveToStartPosition = function () {
        this.startMove(300, 0, 0);
    };
    Sprite_Actor.prototype.setActorHome = function (index) {
        this.setHome(600 + index * 32, 280 + index * 48);
    };
    Sprite_Actor.prototype.update = function () {
        SpriteBattler_1.Sprite_Battler.prototype.update.call(this);
        this.updateShadow();
        if (this._actor) {
            this.updateMotion();
        }
    };
    Sprite_Actor.prototype.updateShadow = function () {
        this._shadowSprite.visible = !!this._actor;
    };
    Sprite_Actor.prototype.updateMain = function () {
        SpriteBattler_1.Sprite_Battler.prototype.updateMain.call(this);
        if (this._actor.isSpriteVisible() && !this.isMoving()) {
            this.updateTargetPosition();
        }
    };
    Sprite_Actor.prototype.setupMotion = function () {
        if (this._actor.isMotionRequested()) {
            this.startMotion(this._actor.motionType());
            this._actor.clearMotion();
        }
    };
    Sprite_Actor.prototype.setupWeaponAnimation = function () {
        if (this._actor.isWeaponAnimationRequested()) {
            this._weaponSprite.setup(this._actor.weaponImageId());
            this._actor.clearWeaponAnimation();
        }
    };
    Sprite_Actor.prototype.startMotion = function (motionType) {
        var newMotion = Sprite_Actor.MOTIONS[motionType];
        if (this._motion !== newMotion) {
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };
    Sprite_Actor.prototype.updateTargetPosition = function () {
        if (this._actor.isInputting() || this._actor.isActing()) {
            this.stepForward();
        }
        else if (this._actor.canMove() && managers_1.BattleManager.isEscaped()) {
            this.retreat();
        }
        else if (!this.inHomePosition()) {
            this.stepBack();
        }
    };
    Sprite_Actor.prototype.updateBitmap = function () {
        SpriteBattler_1.Sprite_Battler.prototype.updateBitmap.call(this);
        var name = this._actor.battlerName();
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = managers_1.ImageManager.loadSvActor(name);
        }
    };
    Sprite_Actor.prototype.updateFrame = function () {
        SpriteBattler_1.Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var motionIndex = this._motion ? this._motion.index : 0;
            var pattern = this._pattern < 3 ? this._pattern : 1;
            var cw = bitmap.width / 9;
            var ch = bitmap.height / 6;
            var cx = Math.floor(motionIndex / 6) * 3 + pattern;
            var cy = motionIndex % 6;
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };
    Sprite_Actor.prototype.updateMove = function () {
        var bitmap = this._mainSprite.bitmap;
        if (!bitmap || bitmap.isReady()) {
            SpriteBattler_1.Sprite_Battler.prototype.updateMove.call(this);
        }
    };
    Sprite_Actor.prototype.updateMotion = function () {
        this.setupMotion();
        this.setupWeaponAnimation();
        if (this._actor.isMotionRefreshRequested()) {
            this.refreshMotion();
            this._actor.clearMotion();
        }
        this.updateMotionCount();
    };
    Sprite_Actor.prototype.updateMotionCount = function () {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            if (this._motion.loop) {
                this._pattern = (this._pattern + 1) % 4;
            }
            else if (this._pattern < 2) {
                this._pattern++;
            }
            else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };
    Sprite_Actor.prototype.motionSpeed = function () {
        return 12;
    };
    Sprite_Actor.prototype.refreshMotion = function () {
        var actor = this._actor;
        var motionGuard = Sprite_Actor.MOTIONS.guard;
        if (actor) {
            if (this._motion === motionGuard && !managers_1.BattleManager.isInputting()) {
                return;
            }
            var stateMotion = actor.stateMotionIndex();
            if (actor.isInputting() || actor.isActing()) {
                this.startMotion("walk");
            }
            else if (stateMotion === 3) {
                this.startMotion("dead");
            }
            else if (stateMotion === 2) {
                this.startMotion("sleep");
            }
            else if (actor.isChanting()) {
                this.startMotion("chant");
            }
            else if (actor.isGuard() || actor.isGuardWaiting()) {
                this.startMotion("guard");
            }
            else if (stateMotion === 1) {
                this.startMotion("abnormal");
            }
            else if (actor.isDying()) {
                this.startMotion("dying");
            }
            else if (actor.isUndecided()) {
                this.startMotion("walk");
            }
            else {
                this.startMotion("wait");
            }
        }
    };
    Sprite_Actor.prototype.startEntryMotion = function () {
        if (this._actor && this._actor.canMove()) {
            this.startMotion("walk");
            this.startMove(0, 0, 30);
        }
        else if (!this.isMoving()) {
            this.refreshMotion();
            this.startMove(0, 0, 0);
        }
    };
    Sprite_Actor.prototype.stepForward = function () {
        this.startMove(-48, 0, 12);
    };
    Sprite_Actor.prototype.stepBack = function () {
        this.startMove(0, 0, 12);
    };
    Sprite_Actor.prototype.retreat = function () {
        this.startMove(300, 0, 30);
    };
    Sprite_Actor.prototype.onMoveEnd = function () {
        SpriteBattler_1.Sprite_Battler.prototype.onMoveEnd.call(this);
        if (!managers_1.BattleManager.isBattleEnd()) {
            this.refreshMotion();
        }
    };
    Sprite_Actor.prototype.damageOffsetX = function () {
        return -32;
    };
    Sprite_Actor.prototype.damageOffsetY = function () {
        return 0;
    };
    Sprite_Actor.MOTIONS = {
        walk: { index: 0, loop: true },
        wait: { index: 1, loop: true },
        chant: { index: 2, loop: true },
        guard: { index: 3, loop: true },
        damage: { index: 4, loop: false },
        evade: { index: 5, loop: false },
        thrust: { index: 6, loop: false },
        swing: { index: 7, loop: false },
        missile: { index: 8, loop: false },
        skill: { index: 9, loop: false },
        spell: { index: 10, loop: false },
        item: { index: 11, loop: false },
        escape: { index: 12, loop: true },
        victory: { index: 13, loop: true },
        dying: { index: 14, loop: true },
        abnormal: { index: 15, loop: true },
        sleep: { index: 16, loop: true },
        dead: { index: 17, loop: true }
    };
    return Sprite_Actor;
}(SpriteBattler_1.Sprite_Battler));
exports.Sprite_Actor = Sprite_Actor;
