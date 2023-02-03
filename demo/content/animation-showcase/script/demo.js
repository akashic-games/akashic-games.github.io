"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScene = void 0;
const asa = require("@akashic-extension/akashic-animation");
const Particle = require("./Particle");
const UI = require("./UI");
const game = g.game;
// actor's play speed
const PLAY_SPEED = 0.33;
// button image asset names
const BUTTON_IMAGE_ASSET_NAMES = [
    "loop",
    "particle",
    "play",
    "showbone",
    "subweapon",
    "yrot"
];
// akashic-animation project text asset name
const ASA_PJ_NAME = "pj_stickman";
// Actor parameters
const SKIN_NAMES = ["stickman"];
const BONESET_NAME = "stickman";
const ANIMATION_NAME = "anime_1";
const WIDTH = 320;
const HEIGHT = 320;
function equipSecondaryBloodSword(actor) {
    // attach cell "sword" retrieved from actor's skin by name to bone "arm_l2"
    const m = new g.PlainMatrix();
    m.update(0, 0, 1, 1, -90, 0, 60, null, null);
    const attachment = actor.attach("sword", "arm_l2", m);
    // add collider (collision detection object)
    // CellAttachmentCollider uses CellAttachment as collision volume source
    const collider = new asa.CellAttachmentCollider(attachment, "追加コライダー", false);
    actor.addCollider(collider);
    return { attachment: attachment, collder: collider };
}
function rotateBody(actor) {
    const handler = (param) => {
        const t = param.currentFrame / param.frameCount;
        param.posture.attrs[asa.AttrId.sx] = Math.cos(Math.PI * 2 * t * 4 + Math.PI / 2);
        param.posture.updateMatrix();
    };
    actor.calculated("body", true).add({ func: handler, name: "bodyHandler" });
}
function stopBody(actor) {
    const trigger = actor.calculated("body", false);
    if (trigger) {
        trigger.removeAll({ name: "bodyHandler" });
    }
}
function updateParticles(actor, particles) {
    const colliders = actor.colliders;
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.collidable) {
            colliders.forEach((c) => {
                const volume = c.getVolume();
                if (!volume)
                    return;
                const aabb = volume.aabb();
                if (aabb.origin.x - aabb.extent.width < p.x && p.x < aabb.origin.x + aabb.extent.width) {
                    if (aabb.origin.y - aabb.extent.height < p.y && p.y < aabb.origin.y + aabb.extent.height) {
                        p.collide();
                    }
                }
            });
        }
        particles[i].update();
    }
}
function attachBoneNameText(actor, font, scene) {
    const attachments = [];
    actor.skeleton.bones.forEach((bone) => {
        const text = new g.Label({
            scene: scene,
            text: bone.name,
            fontSize: font.size,
            textAlign: "left",
            font: font,
            maxWidth: 128
        });
        attachments.push(actor.attach(new CancelRotationAttachment(text), bone.name));
    });
    return attachments;
}
function removeBoneNameText(actor, attachments) {
    if (!attachments) {
        return;
    }
    attachments.forEach((attachment) => {
        actor.removeAttachment(attachment);
    });
}
function invertMatrix(m) {
    const a = m[0];
    const b = m[1];
    const c = m[2];
    const d = m[3];
    const dt = a * d - b * c; // det
    if (dt === 0) {
        return undefined;
    }
    const e = m[4];
    const f = m[5];
    const mi = new Array(6);
    mi[0] = d / dt;
    mi[1] = -b / dt;
    mi[2] = -c / dt;
    mi[3] = a / dt;
    mi[4] = (c * f - d * e) / dt;
    mi[5] = -(a * f - b * e) / dt;
    return mi;
}
class CancelRotationAttachment extends asa.Attachment {
    constructor(e) {
        super();
        this.e = e;
    }
    render(renderer) {
        const mi = invertMatrix(this.posture.m._matrix);
        if (!mi) {
            return;
        }
        renderer.save();
        renderer.transform(mi); // cancel posture matrix
        renderer.translate(this.posture.m._matrix[4], this.posture.m._matrix[5]);
        this.e.render(renderer);
        renderer.restore();
    }
}
class DemoScene extends g.Scene {
    constructor(param) {
        super(param);
        this.particles = [];
        this.onLoad.add(this.onLoaded, this);
    }
    onLoaded() {
        this.font = new g.DynamicFont({
            game: g.game,
            fontFamily: g.FontFamily.Monospace,
            fontColor: "#FF8080",
            strokeWidth: 4,
            strokeColor: "#000FF",
            strokeOnly: false,
            size: 14
        });
        //
        // Load ASA resource
        //
        const resource = new asa.Resource();
        resource.loadProject(ASA_PJ_NAME, this.assets, game.assets);
        //
        // Setup Actor
        //
        const param = {
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
        this.actor.ended.add(() => {
            this.playBtn.setState(false);
            console.info("アニメーション再生終了イベント");
        });
        this.actor.calculated("root", true).add((param) => {
            if (param.left.time === param.currentFrame && param.left.userData) {
                console.info((param.posture ? "[P]" : "[_]") +
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
        for (let i = 0; i < 30; i++) {
            this.particles.push(new Particle(this));
        }
        this.onUpdate.add(this.handleUpdate, this);
    }
    handleUpdate() {
        updateParticles(this.actor, this.particles);
        this.actor.modified();
        this.actor.calc();
        this.indicator.position = this.actor.currentFrame / (this.actor.animation.frameCount - 1);
        this.indicator.modified();
    }
    setupButtons() {
        let btnX = 0;
        const showBoneBtn = new UI.ToggleButton({
            scene: this,
            src: this.asset.getImageById("showbone"),
            x: btnX,
            y: 0,
            touchable: true,
            onoff: this.actor.nullVisible
        });
        showBoneBtn.toggled.add((onoff) => {
            if (onoff) {
                this.actor.nullVisible = true;
                this.actor.boneCoordsVisible = true;
                this.attachments = attachBoneNameText(this.actor, this.font, this);
                console.info("NULLとボーン座標系の表示");
            }
            else {
                this.actor.nullVisible = false;
                this.actor.boneCoordsVisible = false;
                removeBoneNameText(this.actor, this.attachments);
                console.info("NULLとボーン座標系の非表示");
            }
        });
        this.append(showBoneBtn);
        btnX += showBoneBtn.width;
        const subWeaponBtn = new UI.ToggleButton({
            scene: this,
            src: this.asset.getImageById("subweapon"),
            x: btnX,
            y: 0,
            touchable: true,
            onoff: false
        });
        subWeaponBtn.toggled.add((onoff) => {
            if (onoff) {
                this.equipment = equipSecondaryBloodSword(this.actor);
                console.info("サブウェポンの装備");
            }
            else if (this.equipment) {
                this.actor.removeAttachment(this.equipment.attachment);
                this.actor.removeCollider(this.equipment.collider);
                console.info("サブウェポンの非装備");
            }
        });
        this.append(subWeaponBtn);
        btnX += subWeaponBtn.width;
        const yrotBtn = new UI.ToggleButton({
            scene: this,
            src: this.asset.getImageById("yrot"),
            x: btnX,
            y: 0,
            touchable: true,
            onoff: false
        });
        yrotBtn.toggled.add((onoff) => {
            if (onoff) {
                rotateBody(this.actor);
                console.info("アニメーション計算ハンドラによる回転開始");
            }
            else {
                stopBody(this.actor);
                console.info("アニメーション計算ハンドラによる回転終了");
            }
        });
        this.append(yrotBtn);
        btnX += yrotBtn.width;
        const particleBtn = new UI.ToggleButton({
            scene: this,
            src: this.asset.getImageById("particle"),
            x: btnX,
            y: 0,
            touchable: true,
            onoff: false
        });
        particleBtn.toggled.add((onoff) => {
            Particle.running = onoff;
            console.info("衝突判定用パーティクル: " + (particleBtn.onoff ? "オン" : "オフ"));
        });
        this.append(particleBtn);
        btnX += particleBtn.width;
        const loopBtn = new UI.ToggleButton({
            scene: this,
            src: this.asset.getImageById("loop"),
            x: btnX,
            y: 0,
            touchable: true,
            onoff: this.actor.loop
        });
        loopBtn.toggled.add((onoff) => {
            this.actor.loop = onoff;
            console.info("アニメーションループ: " + (loopBtn.onoff ? "オン" : "オフ"));
        });
        this.append(loopBtn);
        btnX += loopBtn.width;
        const playBtn = new UI.ToggleButton({
            scene: this,
            src: this.asset.getImageById("play"),
            x: btnX,
            y: 0,
            touchable: true,
            onoff: true
        });
        playBtn.toggled.add((onoff) => {
            if (onoff) {
                this.actor.play(ANIMATION_NAME, this.actor.currentFrame, this.actor.loop, PLAY_SPEED);
            }
            else {
                this.actor.pause = true;
            }
            console.info("アニメーション: " + (playBtn.onoff ? "再生" : "停止"));
        });
        this.append(playBtn);
        btnX += playBtn.width;
        this.playBtn = playBtn;
    }
}
function getAssetNames(relatedFileInfo, target) {
    const assetNames = [];
    const fileNames = relatedFileInfo[target];
    for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        const matches = fileName.match(/(.*)\.[^.]+$/);
        const assetName = matches ? matches[1] : fileName;
        assetNames.push(assetName);
    }
    return assetNames;
}
function createScene(snapshot) {
    // NOTE: ASA_PJ_NAMEアセットはグローバル設定
    const sspj = JSON.parse(game.assets[ASA_PJ_NAME].data);
    // NOTE: ss2asaのユーザデータ出力機能で関連アセット名を取得
    const relatedFileInfo = sspj.contents.userData.relatedFileInfo;
    const skinImageAssetNames = getAssetNames(relatedFileInfo, "imageFileNames");
    const animationAssetNames = getAssetNames(relatedFileInfo, "animationFileNames");
    const bonesetAssetNames = getAssetNames(relatedFileInfo, "boneSetFileNames");
    const skineAssetNames = getAssetNames(relatedFileInfo, "skinFileNames");
    return new DemoScene({
        game: game,
        assetIds: [].concat(BUTTON_IMAGE_ASSET_NAMES, skinImageAssetNames, animationAssetNames, bonesetAssetNames, skineAssetNames)
    });
}
exports.createScene = createScene;
