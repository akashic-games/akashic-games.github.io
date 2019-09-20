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
/**
 * asa.Actor機能拡張を目的としたクラス群
 */
var asaEx;
(function (asaEx) {
    /**
     * asa関連データの管理クラス
     * 以下の機能を提供する
     * ・シーンロード時のアセット名配列生成
     * ・asa.Resourceの生成と保持
     * ・アニメ名に対応するボーン名を取得
     */
    var ResourceManager = /** @class */ (function () {
        function ResourceManager() {
        }
        /**
         * asapjのアセット名配列から必要なファイルのアセット名を追加先配列に追加する
         * @param _pjNames asapjファイルのアセット名配列
         * @param _assets アセットのマップ
         * @param _assetIds アセット名を追加する配列
         */
        ResourceManager.addAsaAssetIds = function (_pjNames, _assets, _assetIds) {
            var ids = ResourceManager.getAssetIds(_pjNames, _assets);
            // g.game.logger.debug("addAsaAssetIds: before: assetIds.length:"+assetIds.length+", pjNames.length:"+pjNames.length+".");
            _assetIds.push.apply(_assetIds, ids);
            // g.game.logger.debug("addAsaAssetIds: after: assetIds.length:"+assetIds.length+".");
        };
        /**
         * asapjのアセット名配列から必要なファイルのアセット名の配列を生成する
         * @param _pjNames asapjファイルのアセット名配列
         * @param _assets アセットのマップ
         * @return asapjから参照されるファイルのアセット名配列
         */
        ResourceManager.getAssetIds = function (_pjNames, _assets) {
            var res = [];
            var iEnd = _pjNames.length;
            for (var i = 0; i < iEnd; ++i) {
                var pjName = _pjNames[i];
                // console.log("makeAnimBoneTable: pjNames["+i+"]:"+pjName+".");
                if (!_assets[pjName]) {
                    g.game.logger.error("ResourceManager.getAssetIds: not found asapj:" + pjName + " in assets. Not set global option in game.json?");
                    return null;
                }
                var pjJson = _assets[pjName].data;
                var pjData = JSON.parse(pjJson);
                var fileNames = [pjName].concat(pjData.contents.boneSetFileNames, pjData.contents.skinFileNames, pjData.contents.animationFileNames);
                res = res.concat(makeAssetNames_(fileNames));
            }
            return res;
        };
        /**
         * asapjのアセット名に応じてasa.Resourceのインスタンスを返す
         * まだg.game.vars.asaResourcesに存在しないasapjの場合は新たなasa.Resourceを生成し、
         * g.game.vars.asaResourcesに追加する
         * @param _scene g.Sceneのインスタンス
         * @param _pjName asapjファイルのアセット名
         * @return asa.Resourceのインスタンス
         */
        ResourceManager.getResource = function (_scene, _pjName) {
            if (!g.game.vars.asaResources) {
                g.game.vars.asaResources = {};
            }
            // console.log("getResource: pjName:"+pjName+".");
            var resources = g.game.vars.asaResources;
            var res = null;
            if (resources.hasOwnProperty(_pjName)) {
                res = resources[_pjName];
            }
            else {
                res = new asa.Resource();
                res.loadProject(_pjName, _scene.assets);
                resources[_pjName] = res;
            }
            return res;
        };
        /**
         * asa.Resourceのインスタンスからスキン名の配列を生成する
         * @param _resource asa.Resourceのインスタンス
         * @return スキン名の配列
         */
        ResourceManager.getSkinNames = function (_resource) {
            var res = [];
            var iEnd = _resource.skins.length;
            for (var i = 0; i < iEnd; ++i) {
                res[res.length] = _resource.skins[i].name;
            }
            return res;
        };
        /**
         * アニメ名からボーン名を取得する
         * @param _pjName asapjのアセット名
         * @param _animName アニメ名
         * @return ボーン名
         */
        ResourceManager.getBoneName = function (_pjName, _animName) {
            var tableMap = g.game.vars.asaAnimBoneTableMap;
            var table = tableMap[_pjName];
            // console.log("getBoneName: table["+anName+"]:"+table[anName]+".");
            return table[_animName];
        };
        /**
         * 指定したasapjの情報をg.game.vars.asaAnimBoneTableMapと
         * g.game.vars.asaResourcesから削除する
         * @param _pjName asapjのアセット名
         */
        ResourceManager.removeLoadedResource = function (pjName) {
            if (g.game.vars.asaAnimBoneTableMap) {
                if (g.game.vars.asaAnimBoneTableMap.hasOwnProperty(pjName)) {
                    delete g.game.vars.asaAnimBoneTableMap[pjName];
                }
            }
            if (g.game.vars.asaResources) {
                if (g.game.vars.asaResources.hasOwnProperty(pjName)) {
                    delete g.game.vars.asaResources[pjName];
                }
            }
        };
        /**
         * g.game.vars.asaAnimBoneTableMapとg.game.vars.asaResourcesの内容を
         * すべて削除する
         */
        ResourceManager.removeAllLoadedResource = function () {
            if (g.game.vars.asaAnimBoneTableMap) {
                delete g.game.vars.asaAnimBoneTableMap;
            }
            if (g.game.vars.asaResources) {
                delete g.game.vars.asaResources;
            }
        };
        return ResourceManager;
    }());
    asaEx.ResourceManager = ResourceManager;
    /**
     * asa.Actorを機能拡張したクラス
     * 以下の機能を提供する
     * ・インスタンス生成時にasapjのアセット名から自動的に
     *   asa.ActorParameterObjectを生成する
     * （asa.Resourceの生成もResourceManagerを利用して自動的に行う）
     * ・play時にアニメ名に対応したボーンに自動的に切り替える
     * ・ボーン名を指定してボーンの現在の座標を取得する
     */
    var Actor = /** @class */ (function (_super) {
        __extends(Actor, _super);
        /**
         * Actorコンストラクタ
         * @param _scene g.Sceneのインスタンス
         * @param _pjName asapjのアセット名
         * @param opt_animName (optional)アニメ名
         * @param opt_loopFlag
         * (optional)再生をループするか指定するフラグ。真の時ループ再生。
         * 省略時はtrue。
         */
        function Actor(_scene, _pjName, opt_animName, opt_loopFlag) {
            if (opt_loopFlag === void 0) { opt_loopFlag = true; }
            var _this = this;
            if (!g.game.vars.asaAnimBoneTableMap) {
                g.game.vars.asaAnimBoneTableMap = {};
            }
            if (!g.game.vars.asaAnimBoneTableMap.hasOwnProperty(_pjName)) {
                g.game.vars.asaAnimBoneTableMap[_pjName] =
                    loadAnimBoneTable_(_pjName, _scene.assets);
            }
            var resource = ResourceManager.getResource(_scene, _pjName);
            if (!opt_animName) {
                opt_animName = resource.animations[0].name;
            }
            var param = {
                scene: _scene,
                resource: resource,
                animationName: opt_animName,
                skinNames: ResourceManager.getSkinNames(resource),
                boneSetName: ResourceManager.getBoneName(_pjName, opt_animName),
                width: 1,
                height: 1
            };
            _this = _super.call(this, param) || this;
            _this.loop = opt_loopFlag;
            _this.pjName = _pjName;
            return _this;
        }
        /**
         * アニメーションを再生する
         * @param _animName アニメ名
         * @param _startFrame 再生開始フレーム
         * @param _loopFlag 再生をループするか指定するフラグ。真の時ループ再生
         * @param _playSpeed 再生速度。1.0で通常の再生速度
         * @param opt_noCalcFlag (optional)super.playのあとに、calcを行うか指定するフラグ。trueの場合はcalcを行わない。
         * @override
         */
        Actor.prototype.play = function (_animName, _startFrame, _loopFlag, _playSpeed, opt_noCalcFlag) {
            if (opt_noCalcFlag === void 0) { opt_noCalcFlag = false; }
            var currBnName = this.getBoneName();
            var nextBnName = this.getBoneName(_animName);
            // console.log("AsaEx.Actor.play: anName:"+anName+".");
            if (currBnName !== nextBnName) {
                this.changeBone(nextBnName);
            }
            _super.prototype.play.call(this, _animName, _startFrame, _loopFlag, _playSpeed);
            if (!opt_noCalcFlag) {
                this.modified();
                this.calc();
            }
        };
        /**
         * Actorの位置を原点としたボーンの座標を取得する
         * @param _boneName ボーン名
         * @param opt_matrix (optional)ボーンに対する位置や向きを変える変換行列
         * @return ボーンの座標
         */
        Actor.prototype.getBonePosition = function (_boneName, opt_matrix) {
            var inScene = this.getBonePositionInScene(_boneName, opt_matrix);
            var rootMatrix = this.getMatrix()._matrix;
            return { x: inScene.x - rootMatrix[4], y: inScene.y - rootMatrix[5] };
        };
        /**
         * Scene上のボーンの座標を取得する
         * @param _boneName ボーン名
         * @param opt_matrix (optional)ボーンに対する位置や向きを変える変換行列
         * @return ボーンの座標
         */
        Actor.prototype.getBonePositionInScene = function (_boneName, opt_matrix) {
            var bones = this.skeleton.bones;
            var iEnd = bones.length;
            for (var i = 0; i < iEnd; ++i) {
                // console.log("getBonePosition: bones["+i+"].name:"+bones[i].name+", boneName:"+boneName+".");
                if (bones[i].name === _boneName) {
                    var boneMatrix = this.skeleton.
                        composedCaches[bones[i].arrayIndex].m._matrix;
                    if (opt_matrix) {
                        boneMatrix =
                            applyMatrix(boneMatrix, opt_matrix._matrix);
                    }
                    // console.log("getBonePosition: bones["+i+"].name:"+bones[i].name+", x:"+matrix[4]+", y:"+matrix[5]+".");
                    return { x: boneMatrix[4], y: boneMatrix[5] };
                }
            }
            return { x: 0, y: 0 };
        };
        /**
         * アニメ名に対応するボーン名を取得する
         * @param _animName アニメ名
         * @return ボーン名
         */
        Actor.prototype.getBoneName = function (_animName) {
            if (!_animName) {
                _animName = this.animation.name;
            }
            return ResourceManager.getBoneName(this.pjName, _animName);
        };
        /**
         * ボーンを切り替える
         * @param _boneName ボーン名
         */
        Actor.prototype.changeBone = function (_boneName) {
            var _this = this;
            // vvv akashic-animation/lib/Actor.js より引用
            // skeleton
            var boneSet = this.resource.getBoneSetByName(_boneName);
            this.skeleton = new asa.Skeleton(boneSet.bones, function () {
                return _this.getMatrix();
            });
            // collider
            this.colliders = [];
            setupCollider_(boneSet.bones, this);
            // ^^^ akashic-animation/lib/Actor.js より引用
        };
        return Actor;
    }(asa.Actor));
    asaEx.Actor = Actor;
    /**
     * 変換行列を掛ける
     * @param _m1 掛けられる変換行列
     * @param _m2 掛ける変換行列
     * @return 掛けた結果
     */
    function applyMatrix(_m1, _m2) {
        var m0 = [1, 0, 0, 1, 0, 0];
        m0[0] = _m1[0] * _m2[0] + _m1[2] * _m2[1];
        m0[1] = _m1[1] * _m2[0] + _m1[3] * _m2[1];
        m0[2] = _m1[0] * _m2[2] + _m1[2] * _m2[3];
        m0[3] = _m1[1] * _m2[2] + _m1[3] * _m2[3];
        m0[4] = _m1[0] * _m2[4] + _m1[2] * _m2[5] + _m1[4];
        m0[5] = _m1[1] * _m2[4] + _m1[3] * _m2[5] + _m1[5];
        return m0;
    }
    asaEx.applyMatrix = applyMatrix;
    // vvv akashic-animation/sample/src/demo.ts より引用
    /**
     * 変換行列の逆行列を生成する
     * @param _m 変換行列
     * @return 逆行列
     */
    function invertMatrix(_m) {
        var a = _m[0];
        var b = _m[1];
        var c = _m[2];
        var d = _m[3];
        var dt = a * d - b * c; // det
        if (dt === 0) {
            return undefined;
        }
        var e = _m[4];
        var f = _m[5];
        var mi = new Array(6);
        mi[0] = d / dt;
        mi[1] = -b / dt;
        mi[2] = -c / dt;
        mi[3] = a / dt;
        mi[4] = (c * f - d * e) / dt;
        mi[5] = -(a * f - b * e) / dt;
        return mi;
    }
    asaEx.invertMatrix = invertMatrix;
    // ^^^ akashic-animation/sample/src/demo.ts より引用
    /**
     * g.E用アタッチメント
     * g.Eをasa.Actorのボーンにアタッチするためのasa.Attachmentサブクラス
     */
    var EntityAttachment = /** @class */ (function (_super) {
        __extends(EntityAttachment, _super);
        /**
         * ActorAttachmentコンストラクタ
         * @param _actor アタッチするActorのインスタンス
         * @param opt_matrix (optional)アタッチ先のボーンに対しての位置や向きを変えるための変換行列
         */
        function EntityAttachment(_entity, opt_matrix) {
            var _this = _super.call(this) || this;
            _this.entity = _entity;
            _this.matrix = opt_matrix || new g.PlainMatrix();
            // g.game.logger.debug("ActorAttachment: matrix._matrix:["+this.matrix._matrix.join()+"].");
            _this.cancelParentSR = false;
            return _this;
        }
        /**
         * Actor#renderPosturesから呼ばれるAttachment#renderの実装
         * @param _renderer g.Rendererのインスタンス
         * @override
         */
        EntityAttachment.prototype.render = function (_renderer) {
            if (this.cancelParentSR) {
                // vvv akashic-animation/lib/Skeleton.js より引用
                var m0 = [1, 0, 0, 1, 0, 0];
                var m1 = this.posture.m._matrix;
                var m2 = this.matrix._matrix;
                // m0 = m1 * m2
                m0[0] = m1[0] * m2[0] + m1[2] * m2[1];
                m0[1] = m1[1] * m2[0] + m1[3] * m2[1];
                m0[2] = m1[0] * m2[2] + m1[2] * m2[3];
                m0[3] = m1[1] * m2[2] + m1[3] * m2[3];
                m0[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
                m0[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
                // ^^^ akashic-animation/lib/Skeleton.js より引用
                // g.game.logger.debug("ActorAttachment.render: m0:["+m0.join()+"].");
                // vvv akashic-animation/sample/src/demo.ts より引用
                var mi = invertMatrix(this.posture.m._matrix);
                if (!mi) {
                    return;
                }
                _renderer.save();
                {
                    _renderer.transform(mi); // cancel posture matrix
                    _renderer.translate(m0[4], m0[5]);
                    this.entity.render(_renderer);
                }
                _renderer.restore();
                // ^^^ akashic-animation/sample/src/demo.ts より引用
            }
            else {
                _renderer.save();
                {
                    _renderer.transform(this.matrix._matrix);
                    this.entity.render(_renderer);
                }
                _renderer.restore();
            }
        };
        return EntityAttachment;
    }(asa.Attachment));
    asaEx.EntityAttachment = EntityAttachment;
    /**
     * Actor用アタッチメント
     * asa.Actorを他のActorのボーンにアタッチするためのasa.Attachmentサブクラス
     * EntityAttachmentに置き換えられるが、互換性のためEntityAttachmentの
     * コンストラクタのみをオーバーライドしたクラスとして残している
     */
    var ActorAttachment = /** @class */ (function (_super) {
        __extends(ActorAttachment, _super);
        /**
         * ActorAttachmentコンストラクタ
         * @param _actor アタッチするActorのインスタンス
         * @param opt_matrix (optional)アタッチ先のボーンに対しての位置や向きを変えるための変換行列
         */
        function ActorAttachment(_actor, opt_matrix) {
            var _this = this;
            if (opt_matrix) {
                _this = _super.call(this, _actor, opt_matrix) || this;
            }
            else {
                _this = _super.call(this, _actor) || this;
            }
            return _this;
        }
        return ActorAttachment;
    }(EntityAttachment));
    asaEx.ActorAttachment = ActorAttachment;
    /**
     * ファイル名の配列からアセット名の配列を生成する
     * @param _fileNames ファイル名の配列
     * @return アセット名の配列
     * @private
     */
    function makeAssetNames_(_fileNames) {
        var res = [];
        var iEnd = _fileNames.length;
        for (var i = 0; i < iEnd; ++i) {
            // アセット名は拡張子を除いたファイル名
            var name_1 = _fileNames[i].split(".")[0];
            res[res.length] = name_1;
            // console.log("makeAssetNames: res["+(res.length-1)+"]:"+res[res.length-1]+".");
            if (name_1.indexOf("sk_") === 0) {
                // スキンアセット名からプリフィクスを除いたものを
                // イメージアセット名とする
                res[res.length] = name_1.substr(3);
            }
        }
        return res;
    }
    /**
     * アニメ名に対応するボーン名のテーブルを生成する
     * @param _combinationInfos ボーン名に対するアニメ名の対応情報
     * @return キーをアニメ名、値をボーン名としたマップ
     * @private
     */
    function makeAnimBoneTable_(_combinationInfos) {
        var res = {};
        var iEnd = _combinationInfos.length;
        for (var i = 0; i < iEnd; ++i) {
            var info = _combinationInfos[i];
            var bnName = info.boneName;
            var anNames = info.animationNames;
            var jEnd = anNames.length;
            for (var j = 0; j < jEnd; ++j) {
                res[anNames[j]] = bnName;
                // console.log("makeAnimBoneTable: anNames["+j+"]:"+anNames[j]+", bnName:"+bnName+".");
            }
        }
        return res;
    }
    /**
     * asapjファイルからアニメ名に対応するボーン名のテーブルを生成する
     * @param _pjName asapjファイルのアセット名
     * @param _assets アセットのマップ
     * @return キーをアニメ名、値をボーン名としたマップ
     * @private
     */
    function loadAnimBoneTable_(_pjName, _assets) {
        // g.game.logger.debug("AsaEx.loadAnimBoneTable: pjName:"+pjName+".");
        if (!_assets[_pjName]) {
            g.game.logger.error("AsaEx.loadAnimBoneTable: not found asapj:" + _pjName + " in assets.");
            return null;
        }
        var res = null;
        var pjJson = _assets[_pjName].data;
        var pjData = JSON.parse(pjJson);
        if ((!!pjData.contents.userData) &&
            (!!pjData.contents.userData.combinationInfo)) {
            res = makeAnimBoneTable_(pjData.contents.userData.combinationInfo);
        }
        else {
            g.game.logger.error("AsaEx.loadAnimBoneTable: not found combinationInfo in " + _pjName + ". Use -c option with ss2asa.");
        }
        return res;
    }
})(asaEx = exports.asaEx || (exports.asaEx = {}));
// vvv akashic-animation/lib/Actor.js より引用
function setupColliderForCell_(_info, _bone) {
    var collider;
    switch (_info.boundType) {
        case "aabb":
        case "box":
            collider = new asa.BoneCellCollider(_bone.name, _info.boundType === "aabb");
            break;
        default:
            g.game.logger.warn("Invalid type combination: " + _info.geometryType + ", " + _info.boundType);
            break;
    }
    return collider;
}
function setupColliderForCircle_(_info, _bone) {
    var collider;
    switch (_info.boundType) {
        case "aabb":
        case "circle":
            collider = new asa.CircleCollider(_bone.name, _info.boundType === "aabb", _info.scaleOption);
            break;
        default:
            g.game.logger.warn("Invalid type combination: " + _info.geometryType + ", " + _info.boundType);
            break;
    }
    return collider;
}
function setupCollider_(_bones, _actor) {
    _bones.forEach(function (_bone) {
        if (!_bone.colliderInfos) {
            return;
        }
        _bone.colliderInfos.forEach(function (_info) {
            var collider;
            switch (_info.geometryType) {
                case "cell":
                    collider = setupColliderForCell_(_info, _bone);
                    break;
                case "circle":
                    collider = setupColliderForCircle_(_info, _bone);
                    break;
                case "box":
                    g.game.logger.warn("Not implemented geometory type " + _info.geometryType);
                    break;
                default:
                    g.game.logger.warn("Unknown geometory type " + _info.geometryType);
                    break;
            }
            if (collider) {
                _actor.addCollider(collider);
            }
        });
    });
}
// ^^^ akashic-animation/lib/Actor.js より引用
