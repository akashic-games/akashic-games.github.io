"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * g.Eとそのサブクラス（g.Spriteを除く）を扱うユーティリティ関数群
 */
var entityUtil;
(function (entityUtil) {
    /**
     * Entityのappendとmodifiedを行う
     * @param _entity addend対象のエンティティ
     * @param _parent addend先のエンティティ
     */
    function appendEntity(_entity, _parent) {
        _parent.append(_entity);
        _entity.modified();
    }
    entityUtil.appendEntity = appendEntity;
    /**
     * Entityのhideとmodifiedを行う
     * @param _entity 処理対象のEntity
     */
    function hideEntity(_entity) {
        _entity.hide();
        _entity.modified();
    }
    entityUtil.hideEntity = hideEntity;
    /**
     * Entityのshowとmodifiedを行う
     * @param _entity 処理対象のEntity
     */
    function showEntity(_entity) {
        _entity.show();
        _entity.modified();
    }
    entityUtil.showEntity = showEntity;
    /**
     * Entityのx/yの設定とmodifiedを行う
     * @param _entity 処理対象のEntity
     * @param _x      設定するx座標
     * @param _y      設定するy座標
     */
    function setXY(_entity, _x, _y) {
        _entity.x = _x;
        _entity.y = _y;
        _entity.modified();
    }
    entityUtil.setXY = setXY;
    /**
     * Entityのxの設定とmodifiedを行う
     * @param _entity 処理対象のEntity
     * @param _x      設定するx座標
     */
    function setX(_entity, _x) {
        _entity.x = _x;
        _entity.modified();
    }
    entityUtil.setX = setX;
    /**
     * Entityのyの設定とmodifiedを行う
     * @param _entity 処理対象のEntity
     * @param _y      設定するy座標
     */
    function setY(_entity, _y) {
        _entity.y = _y;
        _entity.modified();
    }
    entityUtil.setY = setY;
    /**
     * Entityのopacityの設定とmodifiedを行う
     * @param _entity 処理対象のEntity
     * @param _opacity 設定する値
     */
    function setOpacity(_entity, _opacity) {
        _entity.opacity = _opacity;
        _entity.modified();
    }
    entityUtil.setOpacity = setOpacity;
    /**
     * EntityのscaleX/scaleYの設定とmodifiedを行う
     * @param _entity 処理対象のEntity
     * @param _scale  設定する値
     */
    function setScale(_entity, _scale) {
        _entity.scaleX = _scale;
        _entity.scaleY = _scale;
        _entity.modified();
    }
    entityUtil.setScale = setScale;
    /**
     * Labelの生成とaligning、fontSizeの設定を行う
     * @param  _scene      Labelの生成に使用するScene
     * @param  _text       Labelに初期設定する文字列
     * @param  _bitmapFont 使用するBitmapFont
     * @param  _maxLength  想定する桁数
     * @param  _align      設定するTextAlign
     * @return             生成したLabel
     */
    function createLabel(_scene, _text, _bitmapFont, _maxLength, _align) {
        var label = new g.Label({
            scene: _scene,
            text: _text,
            bitmapFont: _bitmapFont,
            fontSize: _bitmapFont.defaultGlyphHeight
        });
        label.aligning(_bitmapFont.defaultGlyphWidth * _maxLength, _align);
        label.invalidate();
        return label;
    }
    entityUtil.createLabel = createLabel;
    /**
     * 数字用のcreateLabelのショートハンド
     * _textは桁数分の9埋め文字列、_alignはRightに設定する。
     * @param  _scene      Labelの生成に使用するScene
     * @param  _bitmapFont 使用するBitmapFont
     * @param  _digit      想定する桁数
     * @return             生成したLabel
     */
    function createNumLabel(_scene, _bitmapFont, _digit) {
        var nums = [];
        for (var i = 0; i < _digit; ++i) {
            nums[nums.length] = "9";
        }
        var text = nums.join("");
        var label = createLabel(_scene, text, _bitmapFont, _digit, g.TextAlign.Right);
        return label;
    }
    entityUtil.createNumLabel = createNumLabel;
    /**
     * 右端の数字の左上を指定してラベルの位置を設定するメソッド
     * @param  _label 処理対象のLabel
     * @param  _x     右端の数字の左上のx座標
     * @param  _y     右端の数字の左上のy座標
     */
    function moveNumLabelTo(_label, _x, _y) {
        _label.x = _x + _label.bitmapFont.defaultGlyphWidth - _label.width;
        _label.y = _y;
        _label.modified();
    }
    entityUtil.moveNumLabelTo = moveNumLabelTo;
    /**
     * Label.textの設定とinvalidateを行う
     * @param _label 処理対象のLabel
     * @param _text  設定する文字列
     */
    function setLabelText(_label, _text) {
        _label.text = _text;
        _label.invalidate();
    }
    entityUtil.setLabelText = setLabelText;
    /**
     * Entityの子要素を全てdestroyする
     * @param _e 処理対象のE
     */
    function destroyAllChildren(_e) {
        if (!_e.children)
            return; // Childrenが未定義であれば何もしない
        var end = _e.children.length - 1;
        for (var i = end; i >= 0; --i) {
            if (!_e.children[i].destroyed()) {
                _e.children[i].destroy();
            }
        }
    }
    entityUtil.destroyAllChildren = destroyAllChildren;
})(entityUtil = exports.entityUtil || (exports.entityUtil = {}));
