"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asaEx_1 = require("../util/asaEx");
var entityUtil_1 = require("../util/entityUtil");
/**
 * 指定した場所で符号つき数字ラベルを表示するクラス
 */
var PopScore = /** @class */ (function () {
    /**
     * 初期値の設定
     * @param  {g.Scene}      _scene           シーン
     * @param  {g.E}          _parent          親エンティティ
     * @param  {g.BitmapFont} _fontPlus        プラス用フォント
     * @param  {g.BitmapFont} _fontMinus       マイナス用フォント
     * @param  {string}       _asaPjName       ポップアニメpj
     * @param  {string}       _plusAnimName    プラス時アニメ
     * @param  {string}       _minusAnimName   マイナス時アニメ
     * @param  {number}       _actorPosOffsetY actorアタッチ時のY座標補正値
     * @param  {number}       _labelPosOffsetY ラベルアタッチ時のY座標補正値
     * @param  {string}       _pivot           アタッチ用ピボット
     * @param  {number}       _digit           符号なし表示ラベル桁
     */
    function PopScore(_scene, _parent, _fontPlus, _fontMinus, _asaPjName, _plusAnimName, _minusAnimName, _actorPosOffsetY, _labelPosOffsetY, _pivot, _digit) {
        this.scene = _scene;
        this.layer = _parent;
        this.fontPlus = _fontPlus;
        this.fontMinus = _fontMinus;
        this.asaPjName = _asaPjName;
        this.plusAnimName = _plusAnimName;
        this.minusAnimName = _minusAnimName;
        this.actorPosOffsetY = _actorPosOffsetY;
        this.labelPosOffsetY = _labelPosOffsetY;
        this.pivot = _pivot;
        this.digit = _digit;
    }
    /**
     * プラス/マイナススコア生成
     * @param  {g.CommonOffset} _pos   座標
     * @param  {number}         _value スコア
     */
    PopScore.prototype.createPopScore = function (_pos, _value) {
        var popAnime = this.plusAnimName;
        var font = this.fontPlus; // プラスフォント
        var sign = "+"; // 符号
        if (_value < 0) {
            popAnime = this.minusAnimName;
            font = this.fontMinus; // マイナスフォント
            sign = ""; // 符号いらず
        }
        // ポイント演出用ダミーアニメ
        var actorPopPoint = new asaEx_1.asaEx.Actor(this.scene, this.asaPjName);
        actorPopPoint.moveTo(_pos.x, _pos.y + this.actorPosOffsetY);
        entityUtil_1.entityUtil.appendEntity(actorPopPoint, this.layer);
        actorPopPoint.play(popAnime, 0, false, 1.0); // ループなしで再生
        var label = entityUtil_1.entityUtil.createNumLabel(this.scene, font, this.digit + 1);
        entityUtil_1.entityUtil.moveNumLabelTo(// appendした箇所からの相対座標
        label, 0 + label.bitmapFont.defaultGlyphWidth, 0 + this.labelPosOffsetY - (label.bitmapFont.defaultGlyphHeight / 2));
        entityUtil_1.entityUtil.setLabelText(label, sign + String(_value)); // 符号つきテキスト
        // アタッチメント
        var attachment = new asaEx_1.asaEx.EntityAttachment(label);
        actorPopPoint.attach(attachment, this.pivot); // ダミーアニメにアタッチ
        actorPopPoint.update.handle(actorPopPoint, function () {
            actorPopPoint.modified();
            actorPopPoint.calc();
            // 自身を破棄
            if (actorPopPoint.currentFrame >= actorPopPoint.animation.frameCount - 1) {
                actorPopPoint.removeAttachment(attachment); // アタッチに子供がいるとdestroyで残るため
                actorPopPoint.destroy(); // アタッチしたコンボ、appendしたラベルも消える
            }
            return false;
        });
    };
    return PopScore;
}());
exports.PopScore = PopScore;
