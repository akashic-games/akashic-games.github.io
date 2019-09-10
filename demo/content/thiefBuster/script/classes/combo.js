"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asaEx_1 = require("../util/asaEx");
var entityUtil_1 = require("../util/entityUtil");
/**
 * コンボエフェクトクラス
 */
var Combo = /** @class */ (function () {
    /**
     * 初期値の設定
     * @param  {g.Scene}        _scene     シーン
     * @param  {g.E}            _parent    親エンティティ
     * @param  {g.BitmapFont}   _font      コンボフォント
     * @param  {string}         _asaPjName コンボASAのpj
     * @param  {string}         _animName  コンボアニメ名
     * @param  {g.CommonOffset} _pos       アニメ位置
     * @param  {number}         _digit     コンボ桁
     * @param  {number}         _divisor   コンボ倍率除数
     * @param  {string}         _pivot     コンボアタッチピボット
     */
    function Combo(_scene, _parent, _font, _asaPjName, _animName, _pos, _digit, _divisor, _pivot) {
        var _this = this;
        /** 属するシーン */
        this.scene = null;
        /** 現在のコンボ数 */
        this.comboNum = 0;
        this.scene = _scene;
        this.animName = _animName;
        this.divisor = _divisor;
        var defaultText = "";
        for (; _digit > defaultText.length; defaultText += "0")
            ; // コンボ用ラベル初期テキスト作成
        // コンボ用ラベル3桁左よせ
        this.label = entityUtil_1.entityUtil.createLabel(this.scene, defaultText, _font, _digit, g.TextAlign.Left);
        this.label.update.handle(function () {
            entityUtil_1.entityUtil.setLabelText(_this.label, String(_this.comboNum));
        });
        // コンボアニメ
        this.actor = new asaEx_1.asaEx.Actor(this.scene, _asaPjName, _animName);
        this.actor.moveTo(_pos);
        this.actor.pause = true;
        entityUtil_1.entityUtil.hideEntity(this.actor);
        entityUtil_1.entityUtil.appendEntity(this.actor, _parent);
        // アタッチメントを作成
        var attachCombo = new asaEx_1.asaEx.EntityAttachment(this.label);
        this.actor.attach(attachCombo, _pivot); // コンボアニメにラベルをアタッチ
        this.actor.update.handle(this.actor, function () {
            _this.actor.modified();
            _this.actor.calc();
            return false;
        });
    }
    /**
     *  ゲーム毎の初期化
     */
    Combo.prototype.init = function () {
        this.comboNum = 0;
        entityUtil_1.entityUtil.hideEntity(this.actor);
    };
    /**
     * コンボスコアを取得
     * コンボの増減も実施
     * @param  {number} _value 計算するスコア
     * @return {number}        コンボスコア
     */
    Combo.prototype.getComboValue = function (_value) {
        if (_value < 0) {
            entityUtil_1.entityUtil.hideEntity(this.actor);
            this.comboNum = 0;
            return _value;
        }
        else {
            this.comboNum += 1;
            return this.calcComboValue(_value); // キルカウントからコンボスコアを計算
        }
    };
    /**
     * コンボアニメを再生
     */
    Combo.prototype.playComboAnim = function () {
        if (this.comboNum >= 2) {
            entityUtil_1.entityUtil.showEntity(this.actor);
            this.actor.play(this.animName, 0, false, 1.0);
        }
    };
    /**
     * コンボ計算
     * @param  {number} _plusScore スコア
     * @return {number}            コンボ倍率を掛けたスコアを四捨五入したもの
     */
    Combo.prototype.calcComboValue = function (_plusScore) {
        // 倍率 コンボ1 = 1 + (1-1 / 倍率除数)、コンボ2 = 1 + (2-1 / 倍率除数)、コンボ3 = 1 + (3-1 / 倍率除数)...
        var scale = 1 + ((this.comboNum - 1) / this.divisor);
        return Math.round(_plusScore * scale); // 四捨五入
    };
    return Combo;
}());
exports.Combo = Combo;
