"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var asa = require("@akashic-extension/akashic-animation");
var Particle = require("./Particle");
var UI = require("./UI");
var game = g.game;
// actor's play speed
var PLAY_SPEED = 0.33;
// button image asset names
var BUTTON_IMAGE_ASSET_NAMES = [
    "loop",
    "particle",
    "play",
    "showbone",
    "subweapon",
    "yrot"
];
// akashic-animation project text asset name
var ASA_PJ_NAME = "pj_stickman";
// Actor parameters
var SKIN_NAMES = ["stickman"];
var BONESET_NAME = "stickman";
var ANIMATION_NAME = "anime_1";
var WIDTH = 320;
var HEIGHT = 320;
function equipSecondaryBloodSword(actor) {
    // attach cell "sword" retrieved from actor's skin by name to bone "arm_l2"
    var m = new g.PlainMatrix();
    m.update(0, 0, 1, 1, -90, 0, 60);
    var attachment = actor.attach("sword", "arm_l2", m);
    // add collider (collision detection object)
    // CellAttachmentCollider uses CellAttachment as collision volume source
    var collider = new asa.CellAttachmentCollider(attachment, "追加コライダー", false);
    actor.addCollider(collider);
    return { attachment: attachment, collder: collider };
}
function rotateBody(actor) {
    var handler = function (param) {
        var t = param.currentFrame / param.frameCount;
        param.posture.attrs[asa.AttrId.sx] = Math.cos(Math.PI * 2 * t * 4 + Math.PI / 2);
        param.posture.updateMatrix();
    };
    actor.calculated("body", true).add({ func: handler, name: "bodyHandler" });
}
function stopBody(actor) {
    var trigger = actor.calculated("body", false);
    if (trigger) {
        trigger.removeAll({ name: "bodyHandler" });
    }
}
function updateParticles(actor, particles) {
    var colliders = actor.colliders;
    var _loop_1 = function (i) {
        var p = particles[i];
        if (p.collidable) {
            colliders.forEach(function (c) {
                var volume = c.getVolume();
                if (!volume)
                    return;
                var aabb = volume.aabb();
                if (aabb.origin.x - aabb.extent.width < p.x && p.x < aabb.origin.x + aabb.extent.width) {
                    if (aabb.origin.y - aabb.extent.height < p.y && p.y < aabb.origin.y + aabb.extent.height) {
                        p.collide();
                    }
                }
            });
        }
        particles[i].update();
    };
    for (var i = 0; i < particles.length; i++) {
        _loop_1(i);
    }
}
function attachBoneNameText(actor) {
    var attachments = [];
    actor.skeleton.bones.forEach(function (bone) {
        attachments.push(actor.attach(new SystemTextAttachment(bone.name), bone.name));
    });
    return attachments;
}
function removeBoneNameText(actor, attachments) {
    if (!attachments) {
        return;
    }
    attachments.forEach(function (attachment) {
        actor.removeAttachment(attachment);
    });
}
function invertMatrix(m) {
    var a = m[0];
    var b = m[1];
    var c = m[2];
    var d = m[3];
    var dt = a * d - b * c; // det
    if (dt === 0) {
        return undefined;
    }
    var e = m[4];
    var f = m[5];
    var mi = new Array(6);
    mi[0] = d / dt;
    mi[1] = -b / dt;
    mi[2] = -c / dt;
    mi[3] = a / dt;
    mi[4] = (c * f - d * e) / dt;
    mi[5] = -(a * f - b * e) / dt;
    return mi;
}
var SystemTextAttachment = /** @class */ (function (_super) {
    __extends(SystemTextAttachment, _super);
    function SystemTextAttachment(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    SystemTextAttachment.prototype.render = function (renderer) {
        var mi = invertMatrix(this.posture.m._matrix);
        if (!mi) {
            return;
        }
        renderer.save();
        {
            renderer.transform(mi); // cancel posture matrix
            renderer.drawSystemText(this.text, this.posture.m._matrix[4], this.posture.m._matrix[5], 128, 12, g.TextAlign.Left, g.TextBaseline.Alphabetic, "#FF8080", g.FontFamily.Monospace, 4, "#000FF", false);
        }
        renderer.restore();
    };
    return SystemTextAttachment;
}(asa.Attachment));
var DemoScene = /** @class */ (function (_super) {
    __extends(DemoScene, _super);
    function DemoScene(param) {
        var _this = _super.call(this, param) || this;
        _this.particles = [];
        _this.loaded.add(_this.onLoaded, _this);
        return _this;
    }
    DemoScene.prototype.onLoaded = function () {
        var _this = this;
        //
        // Load ASA resource
        //
        var resource = new asa.Resource();
        resource.loadProject(ASA_PJ_NAME, this.assets, game.assets);
        //
        // Setup Actor
        //
        var param = {
            scene: this,
            resource: resource,
            animationName: ANIMATION_NAME,
            skinNames: SKIN_NAMES,
            boneSetName: BONESET_NAME,
            width: WIDTH,
            height: HEIGHT,
            playSpeed: PLAY_SPEED
        };
        this.actor = new asa.Actor(param);
        this.actor.x = 256;
        this.actor.y = 128;
        this.actor.colliderVisible = true;
        this.actor.nullVisible = false;
        this.actor.boneCoordsVisible = false;
        this.actor.ended.add(function () {
            _this.playBtn.setState(false);
            game.logger.info("アニメーション再生終了イベント");
        });
        this.actor.calculated("root", true).add(function (param) {
            if (param.left.time === param.currentFrame && param.left.userData) {
                game.logger.info((param.posture ? "[P]" : "[_]") +
                    "root: " + param.currentFrame + ": " +
                    param.left.userData.str +
                    (param.posture ? "" : "(handling past user data)"));
            }
            if (param.posture) {
                param.posture.updateMatrix();
            }
        });
        this.actor.play(ANIMATION_NAME, 0, true, PLAY_SPEED);
        this.append(this.actor);
        //
        // Setup UI
        //
        this.setupButtons();
        this.indicator = new UI.Indicator(this);
        this.append(this.indicator);
        //
        // Setup particle
        //
        for (var i = 0; i < 30; i++) {
            this.particles.push(new Particle(this));
        }
        this.update.add(this.onUpdate, this);
    };
    DemoScene.prototype.onUpdate = function () {
        updateParticles(this.actor, this.particles);
        this.actor.modified();
        this.actor.calc();
        this.indicator.position = this.actor.currentFrame / (this.actor.animation.frameCount - 1);
        this.indicator.modified();
    };
    DemoScene.prototype.setupButtons = function () {
        var _this = this;
        var btnX = 0;
        var showBoneBtn = new UI.ToggleButton({ scene: this, src: this.assets["showbone"], x: btnX, y: 0, touchable: true, onoff: this.actor.nullVisible });
        showBoneBtn.toggled.add(function (onoff) {
            if (onoff) {
                _this.actor.nullVisible = true;
                _this.actor.boneCoordsVisible = true;
                _this.attachments = attachBoneNameText(_this.actor);
                game.logger.info("NULLとボーン座標系の表示");
            }
            else {
                _this.actor.nullVisible = false;
                _this.actor.boneCoordsVisible = false;
                removeBoneNameText(_this.actor, _this.attachments);
                game.logger.info("NULLとボーン座標系の非表示");
            }
        });
        this.append(showBoneBtn);
        btnX += showBoneBtn.width;
        var subWeaponBtn = new UI.ToggleButton({ scene: this, src: this.assets["subweapon"], x: btnX, y: 0, touchable: true, onoff: false });
        subWeaponBtn.toggled.add(function (onoff) {
            if (onoff) {
                _this.equipment = equipSecondaryBloodSword(_this.actor);
                game.logger.info("サブウェポンの装備");
            }
            else if (_this.equipment) {
                _this.actor.removeAttachment(_this.equipment.attachment);
                _this.actor.removeCollider(_this.equipment.collider);
                game.logger.info("サブウェポンの非装備");
            }
        });
        this.append(subWeaponBtn);
        btnX += subWeaponBtn.width;
        var yrotBtn = new UI.ToggleButton({ scene: this, src: this.assets["yrot"], x: btnX, y: 0, touchable: true, onoff: false });
        yrotBtn.toggled.add(function (onoff) {
            if (onoff) {
                rotateBody(_this.actor);
                game.logger.info("アニメーション計算ハンドラによる回転開始");
            }
            else {
                stopBody(_this.actor);
                game.logger.info("アニメーション計算ハンドラによる回転終了");
            }
        });
        this.append(yrotBtn);
        btnX += yrotBtn.width;
        var particleBtn = new UI.ToggleButton({ scene: this, src: this.assets["particle"], x: btnX, y: 0, touchable: true, onoff: false });
        particleBtn.toggled.add(function (onoff) {
            Particle.running = onoff;
            game.logger.info("衝突判定用パーティクル: " + (particleBtn.onoff ? "オン" : "オフ"));
        });
        this.append(particleBtn);
        btnX += particleBtn.width;
        var loopBtn = new UI.ToggleButton({ scene: this, src: this.assets["loop"], x: btnX, y: 0, touchable: true, onoff: this.actor.loop });
        loopBtn.toggled.add(function (onoff) {
            _this.actor.loop = onoff;
            game.logger.info("アニメーションループ: " + (loopBtn.onoff ? "オン" : "オフ"));
        });
        this.append(loopBtn);
        btnX += loopBtn.width;
        var playBtn = new UI.ToggleButton({ scene: this, src: this.assets["play"], x: btnX, y: 0, touchable: true, onoff: true });
        playBtn.toggled.add(function (onoff) {
            if (onoff) {
                _this.actor.play(ANIMATION_NAME, _this.actor.currentFrame, _this.actor.loop, PLAY_SPEED);
            }
            else {
                _this.actor.pause = true;
            }
            game.logger.info("アニメーション: " + (playBtn.onoff ? "再生" : "停止"));
        });
        this.append(playBtn);
        btnX += playBtn.width;
        this.playBtn = playBtn;
    };
    return DemoScene;
}(g.Scene));
function getAssetNames(relatedFileInfo, target) {
    var assetNames = [];
    var fileNames = relatedFileInfo[target];
    for (var i = 0; i < fileNames.length; i++) {
        var fileName = fileNames[i];
        var matches = fileName.match(/(.*)\.[^.]+$/);
        var assetName = matches ? matches[1] : fileName;
        assetNames.push(assetName);
    }
    return assetNames;
}
function createScene(snapshot) {
    // NOTE: ASA_PJ_NAMEアセットはグローバル設定
    var sspj = JSON.parse(game.assets[ASA_PJ_NAME].data);
    // NOTE: ss2asaのユーザデータ出力機能で関連アセット名を取得
    var relatedFileInfo = sspj.contents.userData.relatedFileInfo;
    var skinImageAssetNames = getAssetNames(relatedFileInfo, "imageFileNames");
    var animationAssetNames = getAssetNames(relatedFileInfo, "animationFileNames");
    var bonesetAssetNames = getAssetNames(relatedFileInfo, "boneSetFileNames");
    var skineAssetNames = getAssetNames(relatedFileInfo, "skinFileNames");
    return new DemoScene({
        game: game,
        assetIds: [].concat(BUTTON_IMAGE_ASSET_NAMES, skinImageAssetNames, animationAssetNames, bonesetAssetNames, skineAssetNames)
    });
}
exports.createScene = createScene;
