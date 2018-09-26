function RawPointUpPlugin(game, view, option) {
	this.game = game;
	this.view = view.view;
	this.operationTrigger = new g.Trigger();
	this._onMouseUp_bound = this._onMouseUp.bind(this);
	this._onTouchEnd_bound = this._onTouchEnd.bind(this);
}

RawPointUpPlugin.isSupported = function () {
	return (typeof document !== "undefined") && (typeof document.addEventListener === "function");
};

var proto = RawPointUpPlugin.prototype;

proto.start = function start() {
	this.view.addEventListener("mouseup", this._onMouseUp_bound, false);
	this.view.addEventListener("touchend", this._onTouchEnd_bound, false);
	return true;
};

proto.stop = function stop() {
	this.view.removeEventListener("mouseup", this._onMouseUp_bound, false);
	this.view.removeEventListener("touchend", this._onTouchEnd_bound, false);
};

proto._onMouseUp = function _onMouseUp(e) {
	var rect = this.view.getBoundingClientRect();
	var px = e.pageX - (window.pageXOffset + rect.left);
	var py = e.pageY - (window.pageYOffset + rect.top);
	var scale = this.view.getScale ? this.view.getScale() : { x: 1, y: 1 };
	var target = this.game.scene().findPointSourceByPoint({ x: px / scale.x, y: py / scale.y }).target;
	if (target && target.rawPointUp && (typeof target.rawPointUp.fire === "function"))
		target.rawPointUp.fire();
};

proto._onTouchEnd = function _onTouchEnd(e) {
	var touches = e.changedTouches;
	for(var i = 0, len = touches.length; i < len; i++)
		this._onMouseUp(touches[i]);
};

module.exports = RawPointUpPlugin;
