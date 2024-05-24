/*! akashic-engine-standalone@3.17.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AE = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var main = {};

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	}

	function __metadata(metadataKey, metadataValue) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	function __createBinding(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}

	function __exportStar(m, exports) {
	    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
	}

	function __values(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	function __spreadArrays() {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	}
	function __await(v) {
	    return this instanceof __await ? (this.v = v, this) : new __await(v);
	}

	function __asyncGenerator(thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}

	function __asyncDelegator(o) {
	    var i, p;
	    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
	}

	function __asyncValues(o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}

	function __makeTemplateObject(cooked, raw) {
	    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	    return cooked;
	}
	function __importStar(mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result.default = mod;
	    return result;
	}

	function __importDefault(mod) {
	    return (mod && mod.__esModule) ? mod : { default: mod };
	}

	function __classPrivateFieldGet(receiver, privateMap) {
	    if (!privateMap.has(receiver)) {
	        throw new TypeError("attempted to get private field on non-instance");
	    }
	    return privateMap.get(receiver);
	}

	function __classPrivateFieldSet(receiver, privateMap, value) {
	    if (!privateMap.has(receiver)) {
	        throw new TypeError("attempted to set private field on non-instance");
	    }
	    privateMap.set(receiver, value);
	    return value;
	}

	var tslib_es6 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get __assign () { return __assign; },
		__asyncDelegator: __asyncDelegator,
		__asyncGenerator: __asyncGenerator,
		__asyncValues: __asyncValues,
		__await: __await,
		__awaiter: __awaiter,
		__classPrivateFieldGet: __classPrivateFieldGet,
		__classPrivateFieldSet: __classPrivateFieldSet,
		__createBinding: __createBinding,
		__decorate: __decorate,
		__exportStar: __exportStar,
		__extends: __extends,
		__generator: __generator,
		__importDefault: __importDefault,
		__importStar: __importStar,
		__makeTemplateObject: __makeTemplateObject,
		__metadata: __metadata,
		__param: __param,
		__read: __read,
		__rest: __rest,
		__spread: __spread,
		__spreadArrays: __spreadArrays,
		__values: __values
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

	var lib$3 = {};

	var index_common = {};

	var lib$2 = {};

	var AssetConfiguration = {};

	var hasRequiredAssetConfiguration;

	function requireAssetConfiguration () {
		if (hasRequiredAssetConfiguration) return AssetConfiguration;
		hasRequiredAssetConfiguration = 1;
		Object.defineProperty(AssetConfiguration, "__esModule", { value: true });
		return AssetConfiguration;
	}

	var GameConfiguration = {};

	var hasRequiredGameConfiguration;

	function requireGameConfiguration () {
		if (hasRequiredGameConfiguration) return GameConfiguration;
		hasRequiredGameConfiguration = 1;
		Object.defineProperty(GameConfiguration, "__esModule", { value: true });
		return GameConfiguration;
	}

	var OperationPluginInfo = {};

	var hasRequiredOperationPluginInfo;

	function requireOperationPluginInfo () {
		if (hasRequiredOperationPluginInfo) return OperationPluginInfo;
		hasRequiredOperationPluginInfo = 1;
		Object.defineProperty(OperationPluginInfo, "__esModule", { value: true });
		return OperationPluginInfo;
	}

	var hasRequiredLib$3;

	function requireLib$3 () {
		if (hasRequiredLib$3) return lib$2;
		hasRequiredLib$3 = 1;
		(function (exports) {
			var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    var desc = Object.getOwnPropertyDescriptor(m, k);
			    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			      desc = { enumerable: true, get: function() { return m[k]; } };
			    }
			    Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    o[k2] = m[k];
			}));
			var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
			    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			__exportStar(requireAssetConfiguration(), exports);
			__exportStar(requireGameConfiguration(), exports);
			__exportStar(requireOperationPluginInfo(), exports); 
		} (lib$2));
		return lib$2;
	}

	var cjs = {};

	var hasRequiredCjs;

	function requireCjs () {
		if (hasRequiredCjs) return cjs;
		hasRequiredCjs = 1;

		function isPromise(target) {
		    return (target != null &&
		        (typeof target === "object" || typeof target === "function") &&
		        typeof target.then === "function");
		}

		/**
		 * イベント通知機構クラス。
		 */
		class Trigger {
		    constructor() {
		        this._handlers = [];
		        this.length = 0;
		    }
		    add(paramsOrFunc, owner) {
		        if (typeof paramsOrFunc === "function") {
		            this._addHandler({
		                func: paramsOrFunc,
		                owner,
		                once: false,
		                name: undefined,
		                filter: undefined,
		            });
		        }
		        else {
		            const params = paramsOrFunc;
		            const index = typeof params.index === "number" ? params.index : undefined;
		            this._addHandler({
		                func: params.func,
		                owner: params.owner,
		                once: false,
		                name: params.name,
		                filter: params.filter,
		            }, index);
		        }
		        this.length = this._handlers.length;
		    }
		    addOnce(paramsOrFunc, owner) {
		        if (typeof paramsOrFunc === "function") {
		            this._addHandler({
		                func: paramsOrFunc,
		                owner,
		                once: true,
		                name: undefined,
		                filter: undefined,
		            });
		        }
		        else {
		            const params = paramsOrFunc;
		            const index = typeof params.index === "number" ? params.index : undefined;
		            this._addHandler({
		                func: params.func,
		                owner: params.owner,
		                once: true,
		                name: params.name,
		                filter: params.filter
		            }, index);
		        }
		        this.length = this._handlers.length;
		    }
		    /**
		     * このTriggerにハンドラを追加する。
		     * @deprecated 互換性のために残されている。代わりに `add()` を利用すべきである。
		     */
		    handle(owner, func, name) {
		        this.add(func ? { owner, func, name } : { func: owner });
		    }
		    /**
		     * このTriggerを発火する。
		     *
		     * 登録された全ハンドラの関数を、引数 `arg` を与えて呼び出す。
		     * 呼び出し後、次のいずれかの条件を満たす全ハンドラの登録は解除される。
		     * * ハンドラが `addOnce()` で登録されていた場合
		     * * ハンドラが `add()` で登録される際に `once: true` オプションが与えられていた場合
		     * * ハンドラが Promise 以外の truthy な値を返した場合
		     *
		     * @param arg ハンドラに与えられる引数
		     */
		    fire(arg) {
		        if (!this._handlers || !this._handlers.length)
		            return;
		        const handlers = this._handlers.concat();
		        for (let i = 0; i < handlers.length; i++) {
		            const handler = handlers[i];
		            if (handler.filter && !handler.filter(handler))
		                continue;
		            const ret = handler.func.call(handler.owner, arg);
		            const returnedTruthy = !isPromise(ret) && !!ret;
		            if (returnedTruthy || handler.once) {
		                if (!this._handlers)
		                    continue;
		                const index = this._handlers.indexOf(handler);
		                if (index !== -1)
		                    this._handlers.splice(index, 1);
		            }
		        }
		        if (this._handlers != null)
		            this.length = this._handlers.length;
		    }
		    contains(paramsOrFunc, owner) {
		        const condition = typeof paramsOrFunc === "function" ? { func: paramsOrFunc, owner } : paramsOrFunc;
		        for (let i = 0; i < this._handlers.length; i++) {
		            if (this._comparePartial(condition, this._handlers[i])) {
		                return true;
		            }
		        }
		        return false;
		    }
		    remove(paramsOrFunc, owner) {
		        const condition = typeof paramsOrFunc === "function" ? { func: paramsOrFunc, owner } : paramsOrFunc;
		        for (let i = 0; i < this._handlers.length; i++) {
		            const handler = this._handlers[i];
		            if (condition.func === handler.func &&
		                condition.owner === handler.owner &&
		                condition.name === handler.name &&
		                condition.filter === handler.filter) {
		                this._handlers.splice(i, 1);
		                --this.length;
		                return;
		            }
		        }
		    }
		    /**
		     * 指定した条件に部分一致するイベントハンドラを削除する。
		     *
		     * 本メソッドは引数に与えた条件に一致したイベントハンドラを全て削除する。
		     * 引数の条件を一部省略した場合、その値の内容が登録時と異なっていても対象のイベントハンドラは削除される。
		     * 引数に与えた条件と完全に一致したイベントハンドラのみを削除したい場合は `this.remove()` を用いる。
		     * 引数を省略した場合は全てのイベントハンドラを削除する。
		     *
		     * @param params 削除するイベントハンドラの条件
		     */
		    removeAll(params) {
		        const handlers = [];
		        if (params) {
		            for (let i = 0; i < this._handlers.length; i++) {
		                const handler = this._handlers[i];
		                if (!this._comparePartial(params, handler)) {
		                    handlers.push(handler);
		                }
		            }
		        }
		        this._handlers = handlers;
		        this.length = this._handlers.length;
		    }
		    /**
		     * このTriggerを破棄する。
		     */
		    destroy() {
		        this._handlers = null;
		        this.length = null;
		    }
		    /**
		     * このTriggerが破棄されているかを返す。
		     */
		    destroyed() {
		        return this._handlers === null;
		    }
		    /**
		     * @private
		     */
		    _addHandler(params, index) {
		        if (index == null) {
		            this._handlers.push({
		                func: params.func,
		                owner: params.owner,
		                once: params.once,
		                name: params.name,
		                filter: params.filter,
		            });
		        }
		        else {
		            this._handlers.splice(index, 0, {
		                func: params.func,
		                owner: params.owner,
		                once: params.once,
		                name: params.name,
		                filter: params.filter,
		            });
		        }
		    }
		    /**
		     * @private
		     */
		    _comparePartial(target, compare) {
		        if (target.func !== undefined && target.func !== compare.func)
		            return false;
		        if (target.owner !== undefined && target.owner !== compare.owner)
		            return false;
		        if (target.name !== undefined && target.name !== compare.name)
		            return false;
		        if (target.filter !== undefined && target.filter !== compare.filter)
		            return false;
		        return true;
		    }
		}

		/**
		 * 他のTriggerLikeに反応して発火するイベント通知機構。
		 */
		class ChainTrigger extends Trigger {
		    /**
		     * `ChainTrigger` のインスタンスを生成する。
		     *
		     * このインスタンスは、 `chain` がfireされたときに `filter` を実行し、真を返した場合に自身をfireする。
		     * @param chain このインスタンスがfireするきっかけとなる TriggerLike
		     * @param filter `chain` がfireされたときに実行される関数。省略された場合、または本関数の戻り値が真の場合、このインスタンスをfireする。
		     * @param filterOwner `filter` 呼び出し時に使われる `this` の値。
		     */
		    constructor(chain, filter, filterOwner) {
		        super();
		        this.chain = chain;
		        this.filter = filter != null ? filter : null;
		        this.filterOwner = filterOwner;
		        this._isActivated = false;
		    }
		    add(paramsOrHandler, owner) {
		        super.add(paramsOrHandler, owner);
		        if (!this._isActivated) {
		            this.chain.add(this._onChainTriggerFired, this);
		            this._isActivated = true;
		        }
		    }
		    addOnce(paramsOrHandler, owner) {
		        super.addOnce(paramsOrHandler, owner);
		        if (!this._isActivated) {
		            this.chain.add(this._onChainTriggerFired, this);
		            this._isActivated = true;
		        }
		    }
		    remove(paramsOrFunc, owner) {
		        super.remove(paramsOrFunc, owner);
		        if (this.length === 0 && this._isActivated) {
		            this.chain.remove(this._onChainTriggerFired, this);
		            this._isActivated = false;
		        }
		    }
		    removeAll(params) {
		        super.removeAll(params);
		        if (this.length === 0 && this._isActivated) {
		            this.chain.remove(this._onChainTriggerFired, this);
		            this._isActivated = false;
		        }
		    }
		    destroy() {
		        super.destroy();
		        this.chain.remove(this._onChainTriggerFired, this);
		        this.filter = null;
		        this.filterOwner = null;
		        this._isActivated = false;
		    }
		    /**
		     * @private
		     */
		    _onChainTriggerFired(args) {
		        if (!this.filter || this.filter.call(this.filterOwner, args)) {
		            this.fire(args);
		        }
		    }
		}

		cjs.ChainTrigger = ChainTrigger;
		cjs.Trigger = Trigger;
		return cjs;
	}

	var lib$1 = {};

	var commons = {};

	var hasRequiredCommons;

	function requireCommons () {
		if (hasRequiredCommons) return commons;
		hasRequiredCommons = 1;
		Object.defineProperty(commons, "__esModule", { value: true });
		return commons;
	}

	var errors = {};

	var hasRequiredErrors;

	function requireErrors () {
		if (hasRequiredErrors) return errors;
		hasRequiredErrors = 1;
		Object.defineProperty(errors, "__esModule", { value: true });
		return errors;
	}

	var CompositeOperation = {};

	var hasRequiredCompositeOperation;

	function requireCompositeOperation () {
		if (hasRequiredCompositeOperation) return CompositeOperation;
		hasRequiredCompositeOperation = 1;
		Object.defineProperty(CompositeOperation, "__esModule", { value: true });
		CompositeOperation.CompositeOperation = void 0;
		/**
		 * 描画時の合成方法。
		 * @deprecated 非推奨である。将来的に削除される。代わりに `CompositeOperationString` を利用すること。
		 */
		var CompositeOperation$1;
		(function (CompositeOperation) {
		    /**
		     * 先に描画された領域の上に描画する。
		     */
		    CompositeOperation[CompositeOperation["SourceOver"] = 0] = "SourceOver";
		    /**
		     * 先に描画された領域と重なった部分のみを描画する。
		     */
		    CompositeOperation[CompositeOperation["SourceAtop"] = 1] = "SourceAtop";
		    /**
		     * 先に描画された領域と重なった部分の色を加算して描画する。
		     */
		    CompositeOperation[CompositeOperation["Lighter"] = 2] = "Lighter";
		    /**
		     * 先に描画された領域を全て無視して描画する。
		     */
		    CompositeOperation[CompositeOperation["Copy"] = 3] = "Copy";
		    /**
		     * 先に描画された領域と重なった部分に描画を行い、それ以外の部分を透明にする。
		     * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
		     */
		    CompositeOperation[CompositeOperation["ExperimentalSourceIn"] = 4] = "ExperimentalSourceIn";
		    /**
		     * 先に描画された領域と重なっていない部分に描画を行い、それ以外の部分を透明にする。
		     * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
		     */
		    CompositeOperation[CompositeOperation["ExperimentalSourceOut"] = 5] = "ExperimentalSourceOut";
		    /**
		     * 描画する領域だけを表示し、先に描画された領域と重なった部分は描画先を表示する。
		     * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
		     */
		    CompositeOperation[CompositeOperation["ExperimentalDestinationAtop"] = 6] = "ExperimentalDestinationAtop";
		    /**
		     * 先に描画された領域と重なっていない部分を透明にし、重なった部分は描画先を表示する。
		     * 環境により、描画結果が大きく異なる可能性があるため、試験的導入である。
		     */
		    CompositeOperation[CompositeOperation["ExperimentalDestinationIn"] = 7] = "ExperimentalDestinationIn";
		    /**
		     * 描画する領域を透明にする。
		     */
		    CompositeOperation[CompositeOperation["DestinationOut"] = 8] = "DestinationOut";
		    /**
		     * 先に描画された領域の下に描画する。
		     */
		    CompositeOperation[CompositeOperation["DestinationOver"] = 9] = "DestinationOver";
		    /**
		     * 先に描画された領域と重なった部分のみ透明にする。
		     */
		    CompositeOperation[CompositeOperation["Xor"] = 10] = "Xor";
		    /**
		     * 先に描画された色とこれから描画する色との差分の絶対値を描画する。
		     * ただし、一部環境ではサポートしない。
		     */
		    CompositeOperation[CompositeOperation["Difference"] = 11] = "Difference";
		    /**
		     * 先に描画された領域の明度と色相を維持し、重なっている部分の彩度を採用する。
		     * ただし、一部環境ではサポートしない。
		    */
		    CompositeOperation[CompositeOperation["Saturation"] = 12] = "Saturation";
		})(CompositeOperation$1 || (CompositeOperation.CompositeOperation = CompositeOperation$1 = {}));
		return CompositeOperation;
	}

	var CompositeOperationString = {};

	var hasRequiredCompositeOperationString;

	function requireCompositeOperationString () {
		if (hasRequiredCompositeOperationString) return CompositeOperationString;
		hasRequiredCompositeOperationString = 1;
		Object.defineProperty(CompositeOperationString, "__esModule", { value: true });
		return CompositeOperationString;
	}

	var ImageData$1 = {};

	var hasRequiredImageData;

	function requireImageData () {
		if (hasRequiredImageData) return ImageData$1;
		hasRequiredImageData = 1;
		Object.defineProperty(ImageData$1, "__esModule", { value: true });
		return ImageData$1;
	}

	var Renderer$1 = {};

	var hasRequiredRenderer$1;

	function requireRenderer$1 () {
		if (hasRequiredRenderer$1) return Renderer$1;
		hasRequiredRenderer$1 = 1;
		Object.defineProperty(Renderer$1, "__esModule", { value: true });
		return Renderer$1;
	}

	var ShaderProgram$1 = {};

	var hasRequiredShaderProgram$1;

	function requireShaderProgram$1 () {
		if (hasRequiredShaderProgram$1) return ShaderProgram$1;
		hasRequiredShaderProgram$1 = 1;
		Object.defineProperty(ShaderProgram$1, "__esModule", { value: true });
		return ShaderProgram$1;
	}

	var ShaderUniform = {};

	var hasRequiredShaderUniform;

	function requireShaderUniform () {
		if (hasRequiredShaderUniform) return ShaderUniform;
		hasRequiredShaderUniform = 1;
		Object.defineProperty(ShaderUniform, "__esModule", { value: true });
		return ShaderUniform;
	}

	var Surface$2 = {};

	var hasRequiredSurface$2;

	function requireSurface$2 () {
		if (hasRequiredSurface$2) return Surface$2;
		hasRequiredSurface$2 = 1;
		Object.defineProperty(Surface$2, "__esModule", { value: true });
		return Surface$2;
	}

	var AudioAsset$2 = {};

	var hasRequiredAudioAsset$2;

	function requireAudioAsset$2 () {
		if (hasRequiredAudioAsset$2) return AudioAsset$2;
		hasRequiredAudioAsset$2 = 1;
		Object.defineProperty(AudioAsset$2, "__esModule", { value: true });
		return AudioAsset$2;
	}

	var AudioPlayer$2 = {};

	var hasRequiredAudioPlayer$2;

	function requireAudioPlayer$2 () {
		if (hasRequiredAudioPlayer$2) return AudioPlayer$2;
		hasRequiredAudioPlayer$2 = 1;
		Object.defineProperty(AudioPlayer$2, "__esModule", { value: true });
		return AudioPlayer$2;
	}

	var AudioSystem$1 = {};

	var hasRequiredAudioSystem$1;

	function requireAudioSystem$1 () {
		if (hasRequiredAudioSystem$1) return AudioSystem$1;
		hasRequiredAudioSystem$1 = 1;
		Object.defineProperty(AudioSystem$1, "__esModule", { value: true });
		return AudioSystem$1;
	}

	var AudioAssetHint = {};

	var hasRequiredAudioAssetHint;

	function requireAudioAssetHint () {
		if (hasRequiredAudioAssetHint) return AudioAssetHint;
		hasRequiredAudioAssetHint = 1;
		Object.defineProperty(AudioAssetHint, "__esModule", { value: true });
		return AudioAssetHint;
	}

	var ImageAssetHint = {};

	var hasRequiredImageAssetHint;

	function requireImageAssetHint () {
		if (hasRequiredImageAssetHint) return ImageAssetHint;
		hasRequiredImageAssetHint = 1;
		Object.defineProperty(ImageAssetHint, "__esModule", { value: true });
		return ImageAssetHint;
	}

	var ImageAsset$2 = {};

	var hasRequiredImageAsset$2;

	function requireImageAsset$2 () {
		if (hasRequiredImageAsset$2) return ImageAsset$2;
		hasRequiredImageAsset$2 = 1;
		Object.defineProperty(ImageAsset$2, "__esModule", { value: true });
		return ImageAsset$2;
	}

	var ScriptAsset$2 = {};

	var hasRequiredScriptAsset$2;

	function requireScriptAsset$2 () {
		if (hasRequiredScriptAsset$2) return ScriptAsset$2;
		hasRequiredScriptAsset$2 = 1;
		Object.defineProperty(ScriptAsset$2, "__esModule", { value: true });
		return ScriptAsset$2;
	}

	var Module$1 = {};

	var hasRequiredModule$1;

	function requireModule$1 () {
		if (hasRequiredModule$1) return Module$1;
		hasRequiredModule$1 = 1;
		Object.defineProperty(Module$1, "__esModule", { value: true });
		return Module$1;
	}

	var ScriptAssetRuntimeValue = {};

	var hasRequiredScriptAssetRuntimeValue;

	function requireScriptAssetRuntimeValue () {
		if (hasRequiredScriptAssetRuntimeValue) return ScriptAssetRuntimeValue;
		hasRequiredScriptAssetRuntimeValue = 1;
		Object.defineProperty(ScriptAssetRuntimeValue, "__esModule", { value: true });
		return ScriptAssetRuntimeValue;
	}

	var TextAsset$2 = {};

	var hasRequiredTextAsset$2;

	function requireTextAsset$2 () {
		if (hasRequiredTextAsset$2) return TextAsset$2;
		hasRequiredTextAsset$2 = 1;
		Object.defineProperty(TextAsset$2, "__esModule", { value: true });
		return TextAsset$2;
	}

	var VideoPlayer$1 = {};

	var hasRequiredVideoPlayer$1;

	function requireVideoPlayer$1 () {
		if (hasRequiredVideoPlayer$1) return VideoPlayer$1;
		hasRequiredVideoPlayer$1 = 1;
		Object.defineProperty(VideoPlayer$1, "__esModule", { value: true });
		return VideoPlayer$1;
	}

	var VideoSystem$1 = {};

	var hasRequiredVideoSystem$1;

	function requireVideoSystem$1 () {
		if (hasRequiredVideoSystem$1) return VideoSystem$1;
		hasRequiredVideoSystem$1 = 1;
		Object.defineProperty(VideoSystem$1, "__esModule", { value: true });
		return VideoSystem$1;
	}

	var VideoAsset$2 = {};

	var hasRequiredVideoAsset$2;

	function requireVideoAsset$2 () {
		if (hasRequiredVideoAsset$2) return VideoAsset$2;
		hasRequiredVideoAsset$2 = 1;
		Object.defineProperty(VideoAsset$2, "__esModule", { value: true });
		return VideoAsset$2;
	}

	var VectorImageAsset$1 = {};

	var hasRequiredVectorImageAsset$1;

	function requireVectorImageAsset$1 () {
		if (hasRequiredVectorImageAsset$1) return VectorImageAsset$1;
		hasRequiredVectorImageAsset$1 = 1;
		Object.defineProperty(VectorImageAsset$1, "__esModule", { value: true });
		return VectorImageAsset$1;
	}

	var VectorImageAssetHint = {};

	var hasRequiredVectorImageAssetHint;

	function requireVectorImageAssetHint () {
		if (hasRequiredVectorImageAssetHint) return VectorImageAssetHint;
		hasRequiredVectorImageAssetHint = 1;
		Object.defineProperty(VectorImageAssetHint, "__esModule", { value: true });
		return VectorImageAssetHint;
	}

	var BinaryAsset$3 = {};

	var hasRequiredBinaryAsset$3;

	function requireBinaryAsset$3 () {
		if (hasRequiredBinaryAsset$3) return BinaryAsset$3;
		hasRequiredBinaryAsset$3 = 1;
		Object.defineProperty(BinaryAsset$3, "__esModule", { value: true });
		return BinaryAsset$3;
	}

	var Asset$3 = {};

	var hasRequiredAsset$3;

	function requireAsset$3 () {
		if (hasRequiredAsset$3) return Asset$3;
		hasRequiredAsset$3 = 1;
		Object.defineProperty(Asset$3, "__esModule", { value: true });
		return Asset$3;
	}

	var AssetLoadErrorType = {};

	var hasRequiredAssetLoadErrorType;

	function requireAssetLoadErrorType () {
		if (hasRequiredAssetLoadErrorType) return AssetLoadErrorType;
		hasRequiredAssetLoadErrorType = 1;
		Object.defineProperty(AssetLoadErrorType, "__esModule", { value: true });
		AssetLoadErrorType.AssetLoadErrorType = void 0;
		/**
		 * アセット読み込み失敗時のエラーの種別。
		 *
		 * この値はあくまでもエラーメッセージ出力のための補助情報であり、
		 * 網羅性・厳密性を追求したものではないことに注意。
		 *
		 * @deprecated 非推奨である。将来的に削除される。現在この型が必要な処理は存在しない。
		 */
		var AssetLoadErrorType$1;
		(function (AssetLoadErrorType) {
		    /**
		     * 明示されていない(以下のいずれかかもしれないし、そうでないかもしれない)。
		     */
		    AssetLoadErrorType[AssetLoadErrorType["Unspecified"] = 0] = "Unspecified";
		    /**
		     * エンジンの再試行回数上限設定値を超えた。
		     */
		    AssetLoadErrorType[AssetLoadErrorType["RetryLimitExceeded"] = 1] = "RetryLimitExceeded";
		    /**
		     * ネットワークエラー。タイムアウトなど。
		     */
		    AssetLoadErrorType[AssetLoadErrorType["NetworkError"] = 2] = "NetworkError";
		    /**
		     * リクエストに問題があるエラー。HTTP 4XX など。
		     */
		    AssetLoadErrorType[AssetLoadErrorType["ClientError"] = 3] = "ClientError";
		    /**
		     * サーバ側のエラー。HTTP 5XX など。
		     */
		    AssetLoadErrorType[AssetLoadErrorType["ServerError"] = 4] = "ServerError";
		})(AssetLoadErrorType$1 || (AssetLoadErrorType.AssetLoadErrorType = AssetLoadErrorType$1 = {}));
		return AssetLoadErrorType;
	}

	var FontWeightString = {};

	var hasRequiredFontWeightString;

	function requireFontWeightString () {
		if (hasRequiredFontWeightString) return FontWeightString;
		hasRequiredFontWeightString = 1;
		Object.defineProperty(FontWeightString, "__esModule", { value: true });
		return FontWeightString;
	}

	var FontWeight = {};

	var hasRequiredFontWeight;

	function requireFontWeight () {
		if (hasRequiredFontWeight) return FontWeight;
		hasRequiredFontWeight = 1;
		Object.defineProperty(FontWeight, "__esModule", { value: true });
		FontWeight.FontWeight = void 0;
		/**
		 * フォントのウェイト。
		 * @deprecated 非推奨である。将来的に削除される。代わりに `FontWeightString` を利用すること。
		 */
		var FontWeight$1;
		(function (FontWeight) {
		    /**
		     * 通常のフォントウェイト。
		     */
		    FontWeight[FontWeight["Normal"] = 0] = "Normal";
		    /**
		     * 太字のフォントウェイト。
		     */
		    FontWeight[FontWeight["Bold"] = 1] = "Bold";
		})(FontWeight$1 || (FontWeight.FontWeight = FontWeight$1 = {}));
		return FontWeight;
	}

	var FontFamily = {};

	var hasRequiredFontFamily;

	function requireFontFamily () {
		if (hasRequiredFontFamily) return FontFamily;
		hasRequiredFontFamily = 1;
		Object.defineProperty(FontFamily, "__esModule", { value: true });
		FontFamily.FontFamily = void 0;
		/**
		 * 文字列描画のフォントファミリ。
		 * @deprecated 非推奨である。将来的に削除される。代わりに文字列 `"sans-serif"`, `"serif"`, `"monospace"` を利用すること。
		 */
		var FontFamily$1;
		(function (FontFamily) {
		    /**
		     * サンセリフ体。ＭＳ Ｐゴシック等
		     */
		    FontFamily[FontFamily["SansSerif"] = 0] = "SansSerif";
		    /**
		     * セリフ体。ＭＳ 明朝等
		     */
		    FontFamily[FontFamily["Serif"] = 1] = "Serif";
		    /**
		     * 等幅。ＭＳ ゴシック等
		     */
		    FontFamily[FontFamily["Monospace"] = 2] = "Monospace";
		})(FontFamily$1 || (FontFamily.FontFamily = FontFamily$1 = {}));
		return FontFamily;
	}

	var Glyph$1 = {};

	var hasRequiredGlyph$1;

	function requireGlyph$1 () {
		if (hasRequiredGlyph$1) return Glyph$1;
		hasRequiredGlyph$1 = 1;
		Object.defineProperty(Glyph$1, "__esModule", { value: true });
		return Glyph$1;
	}

	var GlyphFactory$3 = {};

	var hasRequiredGlyphFactory$3;

	function requireGlyphFactory$3 () {
		if (hasRequiredGlyphFactory$3) return GlyphFactory$3;
		hasRequiredGlyphFactory$3 = 1;
		Object.defineProperty(GlyphFactory$3, "__esModule", { value: true });
		return GlyphFactory$3;
	}

	var Looper = {};

	var hasRequiredLooper;

	function requireLooper () {
		if (hasRequiredLooper) return Looper;
		hasRequiredLooper = 1;
		Object.defineProperty(Looper, "__esModule", { value: true });
		return Looper;
	}

	var OperationPluginView = {};

	var hasRequiredOperationPluginView;

	function requireOperationPluginView () {
		if (hasRequiredOperationPluginView) return OperationPluginView;
		hasRequiredOperationPluginView = 1;
		Object.defineProperty(OperationPluginView, "__esModule", { value: true });
		return OperationPluginView;
	}

	var OperationPluginViewInfo = {};

	var hasRequiredOperationPluginViewInfo;

	function requireOperationPluginViewInfo () {
		if (hasRequiredOperationPluginViewInfo) return OperationPluginViewInfo;
		hasRequiredOperationPluginViewInfo = 1;
		Object.defineProperty(OperationPluginViewInfo, "__esModule", { value: true });
		return OperationPluginViewInfo;
	}

	var Platform$1 = {};

	var hasRequiredPlatform$1;

	function requirePlatform$1 () {
		if (hasRequiredPlatform$1) return Platform$1;
		hasRequiredPlatform$1 = 1;
		Object.defineProperty(Platform$1, "__esModule", { value: true });
		return Platform$1;
	}

	var PlatformEventHandler = {};

	var hasRequiredPlatformEventHandler;

	function requirePlatformEventHandler () {
		if (hasRequiredPlatformEventHandler) return PlatformEventHandler;
		hasRequiredPlatformEventHandler = 1;
		Object.defineProperty(PlatformEventHandler, "__esModule", { value: true });
		return PlatformEventHandler;
	}

	var PlatformPointEvent = {};

	var hasRequiredPlatformPointEvent;

	function requirePlatformPointEvent () {
		if (hasRequiredPlatformPointEvent) return PlatformPointEvent;
		hasRequiredPlatformPointEvent = 1;
		Object.defineProperty(PlatformPointEvent, "__esModule", { value: true });
		return PlatformPointEvent;
	}

	var RendererRequirement = {};

	var hasRequiredRendererRequirement;

	function requireRendererRequirement () {
		if (hasRequiredRendererRequirement) return RendererRequirement;
		hasRequiredRendererRequirement = 1;
		Object.defineProperty(RendererRequirement, "__esModule", { value: true });
		return RendererRequirement;
	}

	var ResourceFactory$3 = {};

	var hasRequiredResourceFactory$3;

	function requireResourceFactory$3 () {
		if (hasRequiredResourceFactory$3) return ResourceFactory$3;
		hasRequiredResourceFactory$3 = 1;
		Object.defineProperty(ResourceFactory$3, "__esModule", { value: true });
		return ResourceFactory$3;
	}

	var hasRequiredLib$2;

	function requireLib$2 () {
		if (hasRequiredLib$2) return lib$1;
		hasRequiredLib$2 = 1;
		(function (exports) {
			var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    var desc = Object.getOwnPropertyDescriptor(m, k);
			    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			      desc = { enumerable: true, get: function() { return m[k]; } };
			    }
			    Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    o[k2] = m[k];
			}));
			var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
			    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			__exportStar(requireCommons(), exports);
			__exportStar(requireErrors(), exports);
			__exportStar(requireCompositeOperation(), exports);
			__exportStar(requireCompositeOperationString(), exports);
			__exportStar(requireImageData(), exports);
			__exportStar(requireRenderer$1(), exports);
			__exportStar(requireShaderProgram$1(), exports);
			__exportStar(requireShaderUniform(), exports);
			__exportStar(requireSurface$2(), exports);
			__exportStar(requireAudioAsset$2(), exports);
			__exportStar(requireAudioPlayer$2(), exports);
			__exportStar(requireAudioSystem$1(), exports);
			__exportStar(requireAudioAssetHint(), exports);
			__exportStar(requireImageAssetHint(), exports);
			__exportStar(requireImageAsset$2(), exports);
			__exportStar(requireScriptAsset$2(), exports);
			__exportStar(requireModule$1(), exports);
			__exportStar(requireScriptAssetRuntimeValue(), exports);
			__exportStar(requireTextAsset$2(), exports);
			__exportStar(requireVideoPlayer$1(), exports);
			__exportStar(requireVideoSystem$1(), exports);
			__exportStar(requireVideoAsset$2(), exports);
			__exportStar(requireVectorImageAsset$1(), exports);
			__exportStar(requireVectorImageAssetHint(), exports);
			__exportStar(requireBinaryAsset$3(), exports);
			__exportStar(requireAsset$3(), exports);
			__exportStar(requireAssetLoadErrorType(), exports);
			__exportStar(requireFontWeightString(), exports);
			__exportStar(requireFontWeight(), exports);
			__exportStar(requireFontFamily(), exports);
			__exportStar(requireGlyph$1(), exports);
			__exportStar(requireGlyphFactory$3(), exports);
			__exportStar(requireLooper(), exports);
			__exportStar(requireOperationPluginView(), exports);
			__exportStar(requireOperationPluginViewInfo(), exports);
			__exportStar(requirePlatform$1(), exports);
			__exportStar(requirePlatformEventHandler(), exports);
			__exportStar(requirePlatformPointEvent(), exports);
			__exportStar(requireRendererRequirement(), exports);
			__exportStar(requireResourceFactory$3(), exports); 
		} (lib$1));
		return lib$1;
	}

	var AudioSystem = {};

	var AudioPlayContext = {};

	var hasRequiredAudioPlayContext;

	function requireAudioPlayContext () {
		if (hasRequiredAudioPlayContext) return AudioPlayContext;
		hasRequiredAudioPlayContext = 1;
		Object.defineProperty(AudioPlayContext, "__esModule", { value: true });
		AudioPlayContext.AudioPlayContext = void 0;
		var trigger_1 = requireCjs();
		var AudioPlayContext$1 = /** @class */ (function () {
		    function AudioPlayContext(param) {
		        var _a;
		        /**
		         * `play()` が呼び出された時に通知される `Trigger` 。
		         */
		        this.onPlay = new trigger_1.Trigger();
		        /**
		         * `stop()` が呼び出された時に通知される `Trigger` 。
		         */
		        this.onStop = new trigger_1.Trigger();
		        this.asset = param.asset;
		        this._system = param.system;
		        this._resourceFactory = param.resourceFactory;
		        this._volume = (_a = param.volume) !== null && _a !== void 0 ? _a : 1.0;
		        this._id = param.id;
		        this._systemId = param.systemId;
		        this._player = this._createAudioPlayer();
		        this.asset.onDestroyed.addOnce(this.stop, this);
		    }
		    Object.defineProperty(AudioPlayContext.prototype, "volume", {
		        get: function () {
		            return this._volume;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    AudioPlayContext.prototype.play = function () {
		        this._player.play(this.asset);
		    };
		    AudioPlayContext.prototype.stop = function () {
		        this._player.stop();
		    };
		    AudioPlayContext.prototype.changeVolume = function (vol) {
		        this._volume = vol;
		        this._player.changeVolume(vol);
		    };
		    /**
		     * @private
		     */
		    AudioPlayContext.prototype._startSuppress = function () {
		        if (this._systemId === "music") {
		            this._player.changeVolume(0);
		            return;
		        }
		        this.stop();
		    };
		    /**
		     * @private
		     */
		    AudioPlayContext.prototype._endSuppress = function () {
		        if (this._systemId === "music") {
		            this._player.changeVolume(this._volume);
		            return;
		        }
		    };
		    AudioPlayContext.prototype._createAudioPlayer = function () {
		        var audioPlayer = this._resourceFactory.createAudioPlayer(this._system);
		        audioPlayer.changeVolume(this._volume);
		        audioPlayer.onPlay.add(this.onPlay.fire, this.onPlay);
		        audioPlayer.onStop.add(this.onStop.fire, this.onStop);
		        return audioPlayer;
		    };
		    return AudioPlayContext;
		}());
		AudioPlayContext.AudioPlayContext = AudioPlayContext$1;
		
		return AudioPlayContext;
	}

	var ExceptionFactory$2 = {};

	var hasRequiredExceptionFactory$2;

	function requireExceptionFactory$2 () {
		if (hasRequiredExceptionFactory$2) return ExceptionFactory$2;
		hasRequiredExceptionFactory$2 = 1;
		Object.defineProperty(ExceptionFactory$2, "__esModule", { value: true });
		ExceptionFactory$2.ExceptionFactory = void 0;
		/**
		 * 例外生成ファクトリ。
		 * エンジン内部での例外生成に利用するもので、ゲーム開発者は通常本モジュールを利用する必要はない。
		 */
		var ExceptionFactory;
		(function (ExceptionFactory) {
		    function createAssertionError(message, cause) {
		        var e = new Error(message);
		        e.name = "AssertionError";
		        e.cause = cause;
		        return e;
		    }
		    ExceptionFactory.createAssertionError = createAssertionError;
		    function createTypeMismatchError(methodName, expected, actual, cause) {
		        var message = "Type mismatch on " + methodName + "," + " expected type is " + expected;
		        if (arguments.length > 2) {
		            // actual 指定時
		            try {
		                var actualString = void 0;
		                if (actual && actual.constructor && actual.constructor.name) {
		                    actualString = actual.constructor.name;
		                }
		                else {
		                    actualString = typeof actual;
		                }
		                message += ", actual type is " + (actualString.length > 40 ? actualString.substr(0, 40) : actualString);
		            }
		            catch (ex) {
		                // メッセージ取得時に例外が発生したらactualの型情報出力はあきらめる
		            }
		        }
		        message += ".";
		        var e = new Error(message);
		        e.name = "TypeMismatchError";
		        e.cause = cause;
		        e.expected = expected;
		        e.actual = actual;
		        return e;
		    }
		    ExceptionFactory.createTypeMismatchError = createTypeMismatchError;
		    function createAssetLoadError(message, retriable, _type, // 歴史的経緯により残っている値。利用していない。
		    cause) {
		        if (retriable === void 0) { retriable = true; }
		        var e = new Error(message);
		        e.name = "AssetLoadError";
		        e.cause = cause;
		        e.retriable = retriable;
		        return e;
		    }
		    ExceptionFactory.createAssetLoadError = createAssetLoadError;
		    function createRequestAssetLoadError(message, detail, cause) {
		        var e = new Error(message);
		        e.name = "RequestAssetLoadError";
		        e.detail = detail;
		        e.cause = cause;
		        return e;
		    }
		    ExceptionFactory.createRequestAssetLoadError = createRequestAssetLoadError;
		})(ExceptionFactory || (ExceptionFactory$2.ExceptionFactory = ExceptionFactory = {}));
		
		return ExceptionFactory$2;
	}

	var WeakRefKVS = {};

	var hasRequiredWeakRefKVS;

	function requireWeakRefKVS () {
		if (hasRequiredWeakRefKVS) return WeakRefKVS;
		hasRequiredWeakRefKVS = 1;
		Object.defineProperty(WeakRefKVS, "__esModule", { value: true });
		WeakRefKVS.WeakRefKVS = void 0;
		/**
		 * @private
		 */
		var PseudoWeakRef = /** @class */ (function () {
		    function PseudoWeakRef(target) {
		        this._target = target;
		    }
		    PseudoWeakRef.prototype.deref = function () {
		        return this._target;
		    };
		    return PseudoWeakRef;
		}());
		/**
		 * 対象の値を弱参照として保持する Key-Value 型データストア。
		 * 通常、ゲーム開発者はこのクラスを利用する必要はない。
		 */
		var WeakRefKVS$1 = /** @class */ (function () {
		    function WeakRefKVS() {
		        /**
		         * @ignore
		         */
		        this._weakRefClass = typeof WeakRef !== "undefined" ? WeakRef : PseudoWeakRef;
		        /**
		         * @ignore
		         */
		        this._refMap = Object.create(null);
		    }
		    WeakRefKVS.prototype.set = function (key, value) {
		        if (this._refMap[key]) {
		            this.delete(key);
		        }
		        this._refMap[key] = new this._weakRefClass(value);
		    };
		    WeakRefKVS.prototype.get = function (key) {
		        var ref = this._refMap[key];
		        if (!ref) {
		            return undefined;
		        }
		        return ref.deref();
		    };
		    WeakRefKVS.prototype.has = function (key) {
		        return key in this._refMap;
		    };
		    WeakRefKVS.prototype.delete = function (key) {
		        delete this._refMap[key];
		    };
		    WeakRefKVS.prototype.keys = function () {
		        return Object.keys(this._refMap);
		    };
		    WeakRefKVS.prototype.clear = function () {
		        this._refMap = Object.create(null);
		    };
		    /**
		     * 参照されなくなった target のキーをマップから削除する。
		     */
		    WeakRefKVS.prototype.clean = function () {
		        for (var _i = 0, _a = Object.entries(this._refMap); _i < _a.length; _i++) {
		            var _b = _a[_i], key = _b[0], ref = _b[1];
		            if (ref.deref() === undefined)
		                this.delete(key);
		        }
		    };
		    return WeakRefKVS;
		}());
		WeakRefKVS.WeakRefKVS = WeakRefKVS$1;
		
		return WeakRefKVS;
	}

	var hasRequiredAudioSystem;

	function requireAudioSystem () {
		if (hasRequiredAudioSystem) return AudioSystem;
		hasRequiredAudioSystem = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(AudioSystem, "__esModule", { value: true });
		AudioSystem.SoundAudioSystem = AudioSystem.MusicAudioSystem = AudioSystem.AudioSystem = void 0;
		var AudioPlayContext_1 = requireAudioPlayContext();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var WeakRefKVS_1 = requireWeakRefKVS();
		var AudioSystem$1 = /** @class */ (function () {
		    function AudioSystem(param) {
		        this.id = param.id;
		        this._volume = param.volume || 1;
		        this._destroyRequestedAssets = {};
		        this._explicitMuted = param.muted || false;
		        this._suppressed = false;
		        this._muted = false;
		        this._contextMap = new WeakRefKVS_1.WeakRefKVS();
		        this._contextCount = 0;
		        this._resourceFactory = param.resourceFactory;
		        this._updateMuted();
		    }
		    Object.defineProperty(AudioSystem.prototype, "volume", {
		        // volumeの変更時には通知が必要なのでアクセサを使う。
		        // 呼び出し頻度が少ないため許容。
		        get: function () {
		            return this._volume;
		        },
		        set: function (value) {
		            if (value < 0 || value > 1 || isNaN(value) || typeof value !== "number")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AudioSystem#volume: expected: 0.0-1.0, actual: " + value);
		            this._volume = value;
		            this._onVolumeChanged();
		        },
		        enumerable: false,
		        configurable: true
		    });
		    AudioSystem.prototype.play = function (asset) {
		        var context = this.create(asset);
		        context.play();
		        return context;
		    };
		    AudioSystem.prototype.create = function (asset) {
		        // TODO: 依存関係の見直し
		        var context = new AudioPlayContext_1.AudioPlayContext({
		            id: this._generateAudioPlayContextId(),
		            resourceFactory: this._resourceFactory,
		            asset: asset,
		            system: this,
		            systemId: this.id,
		            volume: 1.0
		        });
		        if (this._contextCount % this._contentMapCleaningFrequency === 0) {
		            this._contextMap.clean();
		        }
		        this._contextMap.set(context._id, context);
		        return context;
		    };
		    AudioSystem.prototype.stopAll = function () {
		        for (var _i = 0, _a = this._contextMap.keys(); _i < _a.length; _i++) {
		            var key = _a[_i];
		            var ctx = this._contextMap.get(key);
		            ctx === null || ctx === void 0 ? void 0 : ctx.stop();
		        }
		        this._contextMap.clean();
		    };
		    AudioSystem.prototype.requestDestroy = function (asset) {
		        this._destroyRequestedAssets[asset.id] = asset;
		    };
		    /**
		     * `this.requestDestroy()` により破棄要求されているアセットの破棄を取り消す。
		     * @param asset アセット。
		     */
		    // NOTE: akashic-engine の独自仕様
		    AudioSystem.prototype.cancelRequestDestroy = function (asset) {
		        delete this._destroyRequestedAssets[asset.id];
		    };
		    /**
		     * `this.requestDestroy()` により破棄要求されていて、まだ実際には破棄されていないアセット。
		     * 対象のアセットが破棄要求されていなければ `null` を返す。
		     * @param assetId アセットID。
		     */
		    // NOTE: akashic-engine の独自仕様
		    AudioSystem.prototype.getDestroyRequestedAsset = function (assetId) {
		        if (this._destroyRequestedAssets.hasOwnProperty(assetId)) {
		            return this._destroyRequestedAssets[assetId];
		        }
		        return null;
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._reset = function () {
		        this.stopAll();
		        this._volume = 1;
		        this._destroyRequestedAssets = {};
		        this._muted = false;
		        this._suppressed = false;
		        this._explicitMuted = false;
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._setMuted = function (value) {
		        var before = this._explicitMuted;
		        this._explicitMuted = !!value;
		        if (this._explicitMuted !== before) {
		            this._updateMuted();
		            this._onMutedChanged();
		        }
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._setPlaybackRate = function (value) {
		        if (value < 0 || isNaN(value) || typeof value !== "number")
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AudioSystem#playbackRate: expected: greater or equal to 0.0, actual: " + value);
		        this._suppressed = value !== 1.0;
		        this._updateMuted();
		        this._onPlaybackRateChanged();
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._updateMuted = function () {
		        this._muted = this._explicitMuted || this._suppressed;
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._generateAudioPlayContextId = function () {
		        return "".concat(this.id, "-").concat(this._contextCount++);
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._startSuppress = function () {
		        // NOTE: 既存の AudioSystem は playbackRate に 1.0 以外を指定するとミュートとなる
		        this._setPlaybackRate(100);
		        for (var _i = 0, _a = this._contextMap.keys(); _i < _a.length; _i++) {
		            var key = _a[_i];
		            var ctx = this._contextMap.get(key);
		            ctx === null || ctx === void 0 ? void 0 : ctx._startSuppress();
		        }
		    };
		    /**
		     * @private
		     */
		    AudioSystem.prototype._endSuppress = function () {
		        // NOTE: 既存の AudioSystem は playbackRate に 1.0 を指定するとミュートが解除される
		        this._setPlaybackRate(1.0);
		        for (var _i = 0, _a = this._contextMap.keys(); _i < _a.length; _i++) {
		            var key = _a[_i];
		            var ctx = this._contextMap.get(key);
		            ctx === null || ctx === void 0 ? void 0 : ctx._endSuppress();
		        }
		    };
		    return AudioSystem;
		}());
		AudioSystem.AudioSystem = AudioSystem$1;
		var MusicAudioSystem = /** @class */ (function (_super) {
		    __extends(MusicAudioSystem, _super);
		    function MusicAudioSystem(param) {
		        var _this = _super.call(this, param) || this;
		        /**
		         * @private
		         */
		        _this._contentMapCleaningFrequency = 5;
		        _this._player = undefined;
		        return _this;
		    }
		    Object.defineProperty(MusicAudioSystem.prototype, "player", {
		        // Note: 音楽のないゲームの場合に無駄なインスタンスを作るのを避けるため、アクセサを使う
		        get: function () {
		            if (!this._player) {
		                this._player = this._resourceFactory.createAudioPlayer(this);
		                this._player.onPlay.add(this._handlePlay, this);
		                this._player.onStop.add(this._handleStop, this);
		            }
		            return this._player;
		        },
		        set: function (v) {
		            this._player = v;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    MusicAudioSystem.prototype.findPlayers = function (asset) {
		        if (this.player.currentAudio && this.player.currentAudio.id === asset.id)
		            return [this.player];
		        return [];
		    };
		    MusicAudioSystem.prototype.createPlayer = function () {
		        return this.player;
		    };
		    MusicAudioSystem.prototype.stopAll = function () {
		        _super.prototype.stopAll.call(this);
		        if (!this._player)
		            return;
		        this._player.stop();
		    };
		    /**
		     * @private
		     */
		    MusicAudioSystem.prototype._reset = function () {
		        _super.prototype._reset.call(this);
		        if (this._player) {
		            this._player.onPlay.remove(this._handlePlay, this);
		            this._player.onStop.remove(this._handleStop, this);
		        }
		        this._player = undefined;
		    };
		    /**
		     * @private
		     */
		    MusicAudioSystem.prototype._onVolumeChanged = function () {
		        this.player._notifyVolumeChanged();
		    };
		    /**
		     * @private
		     */
		    MusicAudioSystem.prototype._onMutedChanged = function () {
		        this.player._changeMuted(this._muted);
		    };
		    /**
		     * @private
		     */
		    MusicAudioSystem.prototype._onPlaybackRateChanged = function () {
		        this.player._changeMuted(this._muted);
		    };
		    /**
		     * @private
		     */
		    MusicAudioSystem.prototype._handlePlay = function (e) {
		        if (e.player !== this._player)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("MusicAudioSystem#_onPlayerPlayed: unexpected audio player");
		    };
		    /**
		     * @private
		     */
		    MusicAudioSystem.prototype._handleStop = function (e) {
		        if (this._destroyRequestedAssets[e.audio.id]) {
		            delete this._destroyRequestedAssets[e.audio.id];
		            e.audio.destroy();
		        }
		    };
		    return MusicAudioSystem;
		}(AudioSystem$1));
		AudioSystem.MusicAudioSystem = MusicAudioSystem;
		var SoundAudioSystem = /** @class */ (function (_super) {
		    __extends(SoundAudioSystem, _super);
		    function SoundAudioSystem(param) {
		        var _this = _super.call(this, param) || this;
		        /**
		         * @private
		         */
		        _this._contentMapCleaningFrequency = 50;
		        _this.players = [];
		        return _this;
		    }
		    SoundAudioSystem.prototype.createPlayer = function () {
		        var player = this._resourceFactory.createAudioPlayer(this);
		        if (player.canHandleStopped())
		            this.players.push(player);
		        player.onPlay.add(this._handlePlay, this);
		        player.onStop.add(this._handleStop, this);
		        return player;
		    };
		    SoundAudioSystem.prototype.findPlayers = function (asset) {
		        var ret = [];
		        for (var i = 0; i < this.players.length; ++i) {
		            var currentAudio = this.players[i].currentAudio;
		            if (currentAudio && currentAudio.id === asset.id)
		                ret.push(this.players[i]);
		        }
		        return ret;
		    };
		    SoundAudioSystem.prototype.stopAll = function () {
		        _super.prototype.stopAll.call(this);
		        var players = this.players.concat();
		        for (var i = 0; i < players.length; ++i) {
		            players[i].stop(); // auto remove
		        }
		    };
		    /**
		     * @private
		     */
		    SoundAudioSystem.prototype._reset = function () {
		        _super.prototype._reset.call(this);
		        for (var i = 0; i < this.players.length; ++i) {
		            var player = this.players[i];
		            player.onPlay.remove(this._handlePlay, this);
		            player.onStop.remove(this._handleStop, this);
		        }
		        this.players = [];
		    };
		    /**
		     * @private
		     */
		    SoundAudioSystem.prototype._onMutedChanged = function () {
		        var players = this.players;
		        for (var i = 0; i < players.length; ++i) {
		            players[i]._changeMuted(this._muted);
		        }
		    };
		    /**
		     * @private
		     */
		    SoundAudioSystem.prototype._onPlaybackRateChanged = function () {
		        var players = this.players;
		        if (this._suppressed) {
		            for (var i = 0; i < players.length; ++i) {
		                players[i]._changeMuted(true);
		            }
		        }
		    };
		    /**
		     * @private
		     */
		    SoundAudioSystem.prototype._handlePlay = function (_e) {
		        // do nothing
		    };
		    /**
		     * @private
		     */
		    SoundAudioSystem.prototype._handleStop = function (e) {
		        var index = this.players.indexOf(e.player);
		        if (index < 0)
		            return;
		        e.player.onStop.remove(this._handleStop, this);
		        this.players.splice(index, 1);
		        if (this._destroyRequestedAssets[e.audio.id]) {
		            delete this._destroyRequestedAssets[e.audio.id];
		            e.audio.destroy();
		        }
		    };
		    /**
		     * @private
		     */
		    SoundAudioSystem.prototype._onVolumeChanged = function () {
		        for (var i = 0; i < this.players.length; ++i) {
		            this.players[i]._notifyVolumeChanged();
		        }
		    };
		    return SoundAudioSystem;
		}(AudioSystem$1));
		AudioSystem.SoundAudioSystem = SoundAudioSystem;
		
		return AudioSystem;
	}

	var Module = {};

	var PathUtil = {};

	var hasRequiredPathUtil;

	function requirePathUtil () {
		if (hasRequiredPathUtil) return PathUtil;
		hasRequiredPathUtil = 1;
		Object.defineProperty(PathUtil, "__esModule", { value: true });
		PathUtil.PathUtil = void 0;
		/**
		 * パスユーティリティ。
		 */
		var PathUtil$1;
		(function (PathUtil) {
		    /**
		     * 二つのパス文字列をつなぎ、相対パス表現 (".", "..") を解決して返す。
		     * @param base 左辺パス文字列 (先頭の "./" を除き、".", ".." を含んではならない)
		     * @param path 右辺パス文字列
		     */
		    function resolvePath(base, path) {
		        function split(str) {
		            var ret = str.split("/");
		            if (ret[ret.length - 1] === "")
		                ret.pop();
		            return ret;
		        }
		        if (path === "")
		            return base;
		        var baseComponents = PathUtil.splitPath(base);
		        var parts = split(baseComponents.path).concat(split(path));
		        var resolved = [];
		        for (var i = 0; i < parts.length; ++i) {
		            var part = parts[i];
		            switch (part) {
		                case "..":
		                    var popped = resolved.pop();
		                    if (popped === undefined || popped === "" || popped === ".")
		                        throw new Error("PathUtil.resolvePath: invalid arguments");
		                    break;
		                case ".":
		                    if (resolved.length === 0) {
		                        resolved.push(".");
		                    }
		                    break;
		                case "": // 絶対パス
		                    resolved = [""];
		                    break;
		                default:
		                    resolved.push(part);
		            }
		        }
		        return baseComponents.host + resolved.join("/");
		    }
		    PathUtil.resolvePath = resolvePath;
		    /**
		     * パス文字列からディレクトリ名部分を切り出して返す。
		     * @param path パス文字列
		     */
		    function resolveDirname(path) {
		        var index = path.lastIndexOf("/");
		        if (index === -1)
		            return path;
		        return path.substr(0, index);
		    }
		    PathUtil.resolveDirname = resolveDirname;
		    /**
		     * パス文字列から拡張子部分を切り出して返す。
		     * @param path パス文字列
		     */
		    function resolveExtname(path) {
		        for (var i = path.length - 1; i >= 0; --i) {
		            var c = path.charAt(i);
		            if (c === ".") {
		                return path.substr(i);
		            }
		            else if (c === "/") {
		                return "";
		            }
		        }
		        return "";
		    }
		    PathUtil.resolveExtname = resolveExtname;
		    /**
		     * パス文字列から、node.js において require() の探索範囲になるパスの配列を作成して返す。
		     * @param path ディレクトリを表すパス文字列
		     */
		    function makeNodeModulePaths(path) {
		        var pathComponents = PathUtil.splitPath(path);
		        var host = pathComponents.host;
		        path = pathComponents.path;
		        if (path[path.length - 1] === "/") {
		            path = path.slice(0, path.length - 1);
		        }
		        var parts = path.split("/");
		        var firstDir = parts.indexOf("node_modules");
		        var root = firstDir > 0 ? firstDir - 1 : 0;
		        var dirs = [];
		        for (var i = parts.length - 1; i >= root; --i) {
		            if (parts[i] === "node_modules")
		                continue;
		            var dirParts = parts.slice(0, i + 1);
		            dirParts.push("node_modules");
		            var dir = dirParts.join("/");
		            dirs.push(host + dir);
		        }
		        return dirs;
		    }
		    PathUtil.makeNodeModulePaths = makeNodeModulePaths;
		    /**
		     * 与えられたパス文字列からホストを切り出す。
		     * @param path パス文字列
		     */
		    function splitPath(path) {
		        var host = "";
		        var doubleSlashIndex = path.indexOf("//");
		        if (doubleSlashIndex >= 0) {
		            var hostSlashIndex = path.indexOf("/", doubleSlashIndex + 2); // 2 === "//".length
		            if (hostSlashIndex >= 0) {
		                host = path.slice(0, hostSlashIndex);
		                path = path.slice(hostSlashIndex); // 先頭に "/" を残して絶対パス扱いさせる
		            }
		            else {
		                host = path;
		                path = "/"; // path全体がホストだったので、絶対パス扱いさせる
		            }
		        }
		        else {
		            host = "";
		        }
		        return { host: host, path: path };
		    }
		    PathUtil.splitPath = splitPath;
		})(PathUtil$1 || (PathUtil.PathUtil = PathUtil$1 = {}));
		return PathUtil;
	}

	var hasRequiredModule;

	function requireModule () {
		if (hasRequiredModule) return Module;
		hasRequiredModule = 1;
		Object.defineProperty(Module, "__esModule", { value: true });
		Module.Module = void 0;
		var PathUtil_1 = requirePathUtil();
		/**
		 * Node.js が提供する module の互換クラス。
		 */
		var Module$1 = /** @class */ (function () {
		    function Module(param) {
		        var _this = this;
		        var path = param.path;
		        var dirname = PathUtil_1.PathUtil.resolveDirname(path);
		        // `virtualPath` と `virtualDirname` は　`DynamicAsset` の場合は `undefined` になる。
		        var virtualPath = param.virtualPath;
		        var virtualDirname = virtualPath ? PathUtil_1.PathUtil.resolveDirname(virtualPath) : undefined;
		        var requireFunc = param.requireFunc;
		        var resolveFunc = param.resolveFunc;
		        this._runtimeValue = Object.create(param.runtimeValueBase, {
		            filename: {
		                value: path,
		                enumerable: true
		            },
		            dirname: {
		                value: dirname,
		                enumerable: true
		            },
		            module: {
		                value: this,
		                writable: true,
		                enumerable: true,
		                configurable: true
		            }
		        });
		        this.id = param.id;
		        this.filename = param.path;
		        this.exports = {};
		        this.parent = null; // Node.js と互換
		        this.loaded = false;
		        this.children = [];
		        this.paths = virtualDirname ? PathUtil_1.PathUtil.makeNodeModulePaths(virtualDirname) : [];
		        this._dirname = dirname;
		        this._virtualDirname = virtualDirname;
		        // メソッドとしてではなく単体で呼ばれるのでメソッドにせずここで実体を代入する
		        var require = (function (path) {
		            return requireFunc(path, _this);
		        });
		        require.resolve = function (path) {
		            return resolveFunc(path, _this);
		        };
		        this.require = require;
		    }
		    return Module;
		}());
		Module.Module = Module$1;
		
		return Module;
	}

	var ShaderProgram = {};

	var hasRequiredShaderProgram;

	function requireShaderProgram () {
		if (hasRequiredShaderProgram) return ShaderProgram;
		hasRequiredShaderProgram = 1;
		Object.defineProperty(ShaderProgram, "__esModule", { value: true });
		ShaderProgram.ShaderProgram = void 0;
		/**
		 * akashic-engineにおけるシェーダ機能を提供するクラス。
		 * 現バージョンのakashic-engineではフラグメントシェーダのみをサポートする。
		 */
		var ShaderProgram$1 = /** @class */ (function () {
		    /**
		     * 各種パラメータを指定して `ShaderProgram` のインスタンスを生成する。
		     * @param param `ShaderProgram` に設定するパラメータ
		     */
		    function ShaderProgram(param) {
		        this.fragmentShader = param.fragmentShader;
		        this.uniforms = param.uniforms;
		    }
		    return ShaderProgram;
		}());
		ShaderProgram.ShaderProgram = ShaderProgram$1;
		
		return ShaderProgram;
	}

	var VideoSystem = {};

	var hasRequiredVideoSystem;

	function requireVideoSystem () {
		if (hasRequiredVideoSystem) return VideoSystem;
		hasRequiredVideoSystem = 1;
		Object.defineProperty(VideoSystem, "__esModule", { value: true });
		VideoSystem.VideoSystem = void 0;
		/**
		 * 将来 VideoPlayerインスタンスの一元管理（ボリューム設定などAudioSystemと似た役割）
		 * を担うインターフェース。VideoAssetはVideoSystemを持つという体裁を整えるために(中身が空であるが)
		 * 定義されている。
		 * TODO: 実装
		 */
		var VideoSystem$1 = /** @class */ (function () {
		    function VideoSystem() {
		    }
		    return VideoSystem;
		}());
		VideoSystem.VideoSystem = VideoSystem$1;
		
		return VideoSystem;
	}

	var CacheableE = {};

	var E = {};

	var Event = {};

	var hasRequiredEvent;

	function requireEvent () {
		if (hasRequiredEvent) return Event;
		hasRequiredEvent = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(Event, "__esModule", { value: true });
		Event.SeedEvent = Event.PlayerInfoEvent = Event.TimestampEvent = Event.LeaveEvent = Event.JoinEvent = Event.OperationEvent = Event.MessageEvent = Event.PointMoveEventBase = Event.PointUpEventBase = Event.PointDownEventBase = Event.PointEventBase = void 0;
		/**
		 * ポインティング操作を表すイベントの基底クラス。
		 * PointEvent#targetでそのポインティング操作の対象が、
		 * PointEvent#pointでその対象からの相対座標が取得できる。
		 *
		 * 本イベントはマルチタッチに対応しており、PointEvent#pointerIdを参照することで識別することが出来る。
		 *
		 * abstract
		 */
		var PointEventBase = /** @class */ (function () {
		    function PointEventBase(pointerId, target, point, player, local, eventFlags, button) {
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.local = !!local;
		        this.player = player;
		        this.pointerId = pointerId;
		        this.target = target;
		        this.point = point;
		        this.button = button !== null && button !== void 0 ? button : 0;
		    }
		    return PointEventBase;
		}());
		Event.PointEventBase = PointEventBase;
		/**
		 * ポインティング操作の開始を表すイベントの基底クラス。
		 */
		var PointDownEventBase = /** @class */ (function (_super) {
		    __extends(PointDownEventBase, _super);
		    function PointDownEventBase() {
		        var _this = _super !== null && _super.apply(this, arguments) || this;
		        _this.type = "point-down";
		        return _this;
		    }
		    return PointDownEventBase;
		}(PointEventBase));
		Event.PointDownEventBase = PointDownEventBase;
		/**
		 * ポインティング操作の終了を表すイベントの基底クラス。
		 * PointDownEvent後にのみ発生する。
		 *
		 * PointUpEvent#startDeltaによってPointDownEvent時からの移動量が、
		 * PointUpEvent#prevDeltaによって直近のPointMoveEventからの移動量が取得出来る。
		 * PointUpEvent#pointにはPointDownEvent#pointと同じ値が格納される。
		 */
		var PointUpEventBase = /** @class */ (function (_super) {
		    __extends(PointUpEventBase, _super);
		    function PointUpEventBase(pointerId, target, point, prevDelta, startDelta, player, local, eventFlags, button) {
		        var _this = _super.call(this, pointerId, target, point, player, local, eventFlags, button) || this;
		        _this.type = "point-up";
		        _this.prevDelta = prevDelta;
		        _this.startDelta = startDelta;
		        return _this;
		    }
		    return PointUpEventBase;
		}(PointEventBase));
		Event.PointUpEventBase = PointUpEventBase;
		/**
		 * ポインティング操作の移動を表すイベント。
		 * PointDownEvent後にのみ発生するため、MouseMove相当のものが本イベントとして発生することはない。
		 *
		 * PointMoveEvent#startDeltaによってPointDownEvent時からの移動量が、
		 * PointMoveEvent#prevDeltaによって直近のPointMoveEventからの移動量が取得出来る。
		 * PointMoveEvent#pointにはPointMoveEvent#pointと同じ値が格納される。
		 *
		 * 本イベントは、プレイヤーがポインティングデバイスを移動していなくても、
		 * カメラの移動等視覚的にポイントが変化している場合にも発生する。
		 */
		var PointMoveEventBase = /** @class */ (function (_super) {
		    __extends(PointMoveEventBase, _super);
		    function PointMoveEventBase(pointerId, target, point, prevDelta, startDelta, player, local, eventFlags, button) {
		        var _this = _super.call(this, pointerId, target, point, player, local, eventFlags, button) || this;
		        _this.type = "point-move";
		        _this.prevDelta = prevDelta;
		        _this.startDelta = startDelta;
		        return _this;
		    }
		    return PointMoveEventBase;
		}(PointEventBase));
		Event.PointMoveEventBase = PointMoveEventBase;
		/**
		 * 汎用的なメッセージを表すイベント。
		 * MessageEvent#dataによってメッセージ内容を取得出来る。
		 */
		var MessageEvent = /** @class */ (function () {
		    function MessageEvent(data, player, local, eventFlags) {
		        this.type = "message";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.local = !!local;
		        this.player = player;
		        this.data = data;
		    }
		    return MessageEvent;
		}());
		Event.MessageEvent = MessageEvent;
		/**
		 * 操作プラグインが通知する操作を表すイベント。
		 * プラグインを識別する `OperationEvent#code` と、プラグインごとの内容 `OperationEvent#data` を持つ。
		 */
		var OperationEvent = /** @class */ (function () {
		    function OperationEvent(code, data, player, local, eventFlags) {
		        this.type = "operation";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.local = !!local;
		        this.player = player;
		        this.code = code;
		        this.data = data;
		    }
		    return OperationEvent;
		}());
		Event.OperationEvent = OperationEvent;
		/**
		 * プレイヤーの参加を表すイベント。
		 * JoinEvent#playerによって、参加したプレイヤーを取得出来る。
		 */
		var JoinEvent = /** @class */ (function () {
		    function JoinEvent(player, eventFlags) {
		        this.type = "join";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.player = player;
		    }
		    return JoinEvent;
		}());
		Event.JoinEvent = JoinEvent;
		/**
		 * プレイヤーの離脱を表すイベント。
		 * LeaveEvent#playerによって、離脱したプレイヤーを取得出来る。
		 */
		var LeaveEvent = /** @class */ (function () {
		    function LeaveEvent(player, eventFlags) {
		        this.type = "leave";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.player = player;
		    }
		    return LeaveEvent;
		}());
		Event.LeaveEvent = LeaveEvent;
		/**
		 * タイムスタンプを表すイベント。
		 */
		var TimestampEvent = /** @class */ (function () {
		    function TimestampEvent(timestamp, player, eventFlags) {
		        this.type = "timestamp";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.player = player;
		        this.timestamp = timestamp;
		    }
		    return TimestampEvent;
		}());
		Event.TimestampEvent = TimestampEvent;
		/**
		 * プレイヤー情報を表すイベント。
		 * PointInfoEvent#player.nameによってプレイヤー名を、PlayerInfoEvent#player.userDataによって送信者依存の追加データを取得できる。
		 */
		var PlayerInfoEvent = /** @class */ (function () {
		    function PlayerInfoEvent(player, eventFlags) {
		        this.type = "player-info";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.player = player;
		    }
		    return PlayerInfoEvent;
		}());
		Event.PlayerInfoEvent = PlayerInfoEvent;
		/**
		 * 新しい乱数の発生を表すイベント。
		 * SeedEvent#generatorによって、本イベントで発生したRandomGeneratorを取得出来る。
		 */
		var SeedEvent = /** @class */ (function () {
		    function SeedEvent(generator, eventFlags) {
		        this.type = "seed";
		        // @ts-ignore TODO: eventFlags のデフォルト値の扱い
		        this.eventFlags = eventFlags;
		        this.generator = generator;
		    }
		    return SeedEvent;
		}());
		Event.SeedEvent = SeedEvent;
		
		return Event;
	}

	var Matrix = {};

	var hasRequiredMatrix;

	function requireMatrix () {
		if (hasRequiredMatrix) return Matrix;
		hasRequiredMatrix = 1;
		Object.defineProperty(Matrix, "__esModule", { value: true });
		Matrix.PlainMatrix = void 0;
		/**
		 * 変換行列を一般的なJavaScriptのみで表したクラス。
		 * 通常ゲーム開発者が本クラスを直接利用する事はない。
		 * 各フィールド、メソッドの詳細は `Matrix` インターフェースの説明を参照。
		 */
		var PlainMatrix = /** @class */ (function () {
		    function PlainMatrix(widthOrSrc, height, scaleX, scaleY, angle, anchorX, anchorY) {
		        // TODO: (GAMEDEV-845) Float32Arrayの方が速いらしいので、polyfillして使うかどうか検討
		        if (widthOrSrc === undefined) {
		            this._modified = false;
		            this._matrix = [1, 0, 0, 1, 0, 0];
		        }
		        else if (typeof widthOrSrc === "number") {
		            this._modified = false;
		            // TODO: [0, 0, 0, 0, 0, 0]と速度比較
		            this._matrix = new Array(6);
		            // @ts-ignore
		            this.update(widthOrSrc, height, scaleX, scaleY, angle, 0, 0, anchorX, anchorY);
		        }
		        else {
		            this._modified = widthOrSrc._modified;
		            this._matrix = [
		                widthOrSrc._matrix[0],
		                widthOrSrc._matrix[1],
		                widthOrSrc._matrix[2],
		                widthOrSrc._matrix[3],
		                widthOrSrc._matrix[4],
		                widthOrSrc._matrix[5]
		            ];
		        }
		    }
		    PlainMatrix.prototype.update = function (width, height, scaleX, scaleY, angle, x, y, anchorX, anchorY) {
		        if (anchorX == null || anchorY == null) {
		            this._updateWithoutAnchor(width, height, scaleX, scaleY, angle, x, y);
		            return;
		        }
		        // ここで求める変換行列Mは、引数で指定された変形を、拡大・回転・平行移動の順に適用するものである。
		        // 変形の原点は (anchorX * width, anchorY * height) である。従って
		        //    M = A^-1 T R S A
		        // である。ただしここでA, S, R, Tは、それぞれ以下を表す変換行列である:
		        //    A: アンカーを原点に移す(平行移動する)変換
		        //    S: X軸方向にscaleX倍、Y軸方向にscaleY倍する変換
		        //    R: angle度だけ回転する変換
		        //    T: x, yの値だけ平行移動する変換
		        // それらは次のように表せる:
		        //           1    0   -w           sx    0    0            c   -s    0            1    0    x
		        //    A = [  0    1   -h]    S = [  0   sy    0]    R = [  s    c    0]    T = [  0    1    y]
		        //           0    0    1            0    0    1            0    0    1            0    0    1
		        // ここで sx, sy は scaleX, scaleY であり、c, s は cos(theta), sin(theta)
		        // (ただし theta = angle * PI / 180)、w = anchorX * width, h = anchorY * height である。
		        // 以下の実装は、M の各要素をそれぞれ計算して直接求めている。
		        var r = (angle * Math.PI) / 180;
		        var _cos = Math.cos(r);
		        var _sin = Math.sin(r);
		        var a = _cos * scaleX;
		        var b = _sin * scaleX;
		        var c = _sin * scaleY;
		        var d = _cos * scaleY;
		        var w = anchorX * width;
		        var h = anchorY * height;
		        this._matrix[0] = a;
		        this._matrix[1] = b;
		        this._matrix[2] = -c;
		        this._matrix[3] = d;
		        this._matrix[4] = -a * w + c * h + x;
		        this._matrix[5] = -b * w - d * h + y;
		    };
		    /**
		     * このメソッドは anchorX, anchorY が存在しなかった当時との互換性のため存在する。将来この互換性を破棄する時に削除する予定である。
		     * @private
		     */
		    PlainMatrix.prototype._updateWithoutAnchor = function (width, height, scaleX, scaleY, angle, x, y) {
		        // ここで求める変換行列Mは、引数で指定された変形を、拡大・回転・平行移動の順に適用するものである。
		        // 変形の原点は引数で指定された矩形の中心、すなわち (width/2, height/2) の位置である。従って
		        //    M = A^-1 T R S A
		        // である。ただしここでA, S, R, Tは、それぞれ以下を表す変換行列である:
		        //    A: 矩形の中心を原点に移す(平行移動する)変換
		        //    S: X軸方向にscaleX倍、Y軸方向にscaleY倍する変換
		        //    R: angle度だけ回転する変換
		        //    T: x, yの値だけ平行移動する変換
		        // それらは次のように表せる:
		        //           1    0   -w           sx    0    0            c   -s    0            1    0    x
		        //    A = [  0    1   -h]    S = [  0   sy    0]    R = [  s    c    0]    T = [  0    1    y]
		        //           0    0    1            0    0    1            0    0    1            0    0    1
		        // ここで sx, sy は scaleX, scaleY であり、c, s は cos(theta), sin(theta)
		        // (ただし theta = angle * PI / 180)、w = (width / 2), h = (height / 2) である。
		        // 以下の実装は、M の各要素をそれぞれ計算して直接求めている。
		        var r = (angle * Math.PI) / 180;
		        var _cos = Math.cos(r);
		        var _sin = Math.sin(r);
		        var a = _cos * scaleX;
		        var b = _sin * scaleX;
		        var c = _sin * scaleY;
		        var d = _cos * scaleY;
		        var w = width / 2;
		        var h = height / 2;
		        this._matrix[0] = a;
		        this._matrix[1] = b;
		        this._matrix[2] = -c;
		        this._matrix[3] = d;
		        this._matrix[4] = -a * w + c * h + w + x;
		        this._matrix[5] = -b * w - d * h + h + y;
		    };
		    PlainMatrix.prototype.updateByInverse = function (width, height, scaleX, scaleY, angle, x, y, anchorX, anchorY) {
		        if (anchorX == null || anchorY == null) {
		            this._updateByInverseWithoutAnchor(width, height, scaleX, scaleY, angle, x, y);
		            return;
		        }
		        // ここで求める変換行列は、update() の求める行列Mの逆行列、M^-1である。update() のコメントに記述のとおり、
		        //    M = A^-1 T R S A
		        // であるから、
		        //    M^-1 = A^-1 S^-1 R^-1 T^-1 A
		        // それぞれは次のように表せる:
		        //              1    0    w             1/sx     0    0               c    s    0               1    0   -x+w
		        //    A^-1 = [  0    1    h]    S^-1 = [   0  1/sy    0]    R^-1 = [ -s    c    0]    T^-1 = [  0    1   -y+h]
		        //              0    0    1                0     0    1               0    0    1               0    0    1
		        // ここで各変数は update() のコメントのものと同様である。
		        // 以下の実装は、M^-1 の各要素をそれぞれ計算して直接求めている。
		        var r = (angle * Math.PI) / 180;
		        var _cos = Math.cos(r);
		        var _sin = Math.sin(r);
		        var a = _cos / scaleX;
		        var b = _sin / scaleY;
		        var c = _sin / scaleX;
		        var d = _cos / scaleY;
		        var w = anchorX * width;
		        var h = anchorY * height;
		        this._matrix[0] = a;
		        this._matrix[1] = -b;
		        this._matrix[2] = c;
		        this._matrix[3] = d;
		        this._matrix[4] = -a * x - c * y + w;
		        this._matrix[5] = b * x - d * y + h;
		    };
		    /**
		     * このメソッドは anchorX, anchorY が存在しなかった当時との互換性のため存在する。将来この互換性を破棄する時に削除する予定である。
		     * @private
		     */
		    PlainMatrix.prototype._updateByInverseWithoutAnchor = function (width, height, scaleX, scaleY, angle, x, y) {
		        // ここで求める変換行列は、update() の求める行列Mの逆行列、M^-1である。update() のコメントに記述のとおり、
		        //    M = A^-1 T R S A
		        // であるから、
		        //    M^-1 = A^-1 S^-1 R^-1 T^-1 A
		        // それぞれは次のように表せる:
		        //              1    0    w             1/sx     0    0               c    s    0               1    0   -x
		        //    A^-1 = [  0    1    h]    S^-1 = [   0  1/sy    0]    R^-1 = [ -s    c    0]    T^-1 = [  0    1   -y]
		        //              0    0    1                0     0    1               0    0    1               0    0    1
		        // ここで各変数は update() のコメントのものと同様である。
		        // 以下の実装は、M^-1 の各要素をそれぞれ計算して直接求めている。
		        var r = (angle * Math.PI) / 180;
		        var _cos = Math.cos(r);
		        var _sin = Math.sin(r);
		        var a = _cos / scaleX;
		        var b = _sin / scaleY;
		        var c = _sin / scaleX;
		        var d = _cos / scaleY;
		        var w = width / 2;
		        var h = height / 2;
		        this._matrix[0] = a;
		        this._matrix[1] = -b;
		        this._matrix[2] = c;
		        this._matrix[3] = d;
		        this._matrix[4] = -a * (w + x) - c * (h + y) + w;
		        this._matrix[5] = b * (w + x) - d * (h + y) + h;
		    };
		    PlainMatrix.prototype.multiply = function (matrix) {
		        var m1 = this._matrix;
		        var m2 = matrix._matrix;
		        var m10 = m1[0];
		        var m11 = m1[1];
		        var m12 = m1[2];
		        var m13 = m1[3];
		        m1[0] = m10 * m2[0] + m12 * m2[1];
		        m1[1] = m11 * m2[0] + m13 * m2[1];
		        m1[2] = m10 * m2[2] + m12 * m2[3];
		        m1[3] = m11 * m2[2] + m13 * m2[3];
		        m1[4] = m10 * m2[4] + m12 * m2[5] + m1[4];
		        m1[5] = m11 * m2[4] + m13 * m2[5] + m1[5];
		    };
		    PlainMatrix.prototype.multiplyLeft = function (matrix) {
		        var m1 = matrix._matrix;
		        var m2 = this._matrix;
		        var m20 = m2[0];
		        var m22 = m2[2];
		        var m24 = m2[4];
		        m2[0] = m1[0] * m20 + m1[2] * m2[1];
		        m2[1] = m1[1] * m20 + m1[3] * m2[1];
		        m2[2] = m1[0] * m22 + m1[2] * m2[3];
		        m2[3] = m1[1] * m22 + m1[3] * m2[3];
		        m2[4] = m1[0] * m24 + m1[2] * m2[5] + m1[4];
		        m2[5] = m1[1] * m24 + m1[3] * m2[5] + m1[5];
		    };
		    PlainMatrix.prototype.multiplyNew = function (matrix) {
		        var ret = this.clone();
		        ret.multiply(matrix);
		        return ret;
		    };
		    PlainMatrix.prototype.reset = function (x, y) {
		        this._matrix[0] = 1;
		        this._matrix[1] = 0;
		        this._matrix[2] = 0;
		        this._matrix[3] = 1;
		        this._matrix[4] = x || 0;
		        this._matrix[5] = y || 0;
		    };
		    PlainMatrix.prototype.clone = function () {
		        return new PlainMatrix(this);
		    };
		    PlainMatrix.prototype.multiplyInverseForPoint = function (point) {
		        var m = this._matrix;
		        // id = inverse of the determinant
		        var _id = 1 / (m[0] * m[3] + m[2] * -m[1]);
		        return {
		            x: m[3] * _id * point.x + -m[2] * _id * point.y + (m[5] * m[2] - m[4] * m[3]) * _id,
		            y: m[0] * _id * point.y + -m[1] * _id * point.x + (-m[5] * m[0] + m[4] * m[1]) * _id
		        };
		    };
		    PlainMatrix.prototype.scale = function (x, y) {
		        var m = this._matrix;
		        m[0] *= x;
		        m[1] *= y;
		        m[2] *= x;
		        m[3] *= y;
		        m[4] *= x;
		        m[5] *= y;
		    };
		    PlainMatrix.prototype.multiplyPoint = function (point) {
		        var m = this._matrix;
		        var x = m[0] * point.x + m[2] * point.y + m[4];
		        var y = m[1] * point.x + m[3] * point.y + m[5];
		        return { x: x, y: y };
		    };
		    return PlainMatrix;
		}());
		Matrix.PlainMatrix = PlainMatrix;
		
		return Matrix;
	}

	var Object2D = {};

	var hasRequiredObject2D;

	function requireObject2D () {
		if (hasRequiredObject2D) return Object2D;
		hasRequiredObject2D = 1;
		Object.defineProperty(Object2D, "__esModule", { value: true });
		Object2D.Object2D = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var Matrix_1 = requireMatrix();
		/**
		 * 二次元の幾何的オブジェクト。位置とサイズ (に加えて傾きや透明度も) を持つ。
		 * ゲーム開発者は `E` を使えばよく、通常このクラスを意識する必要はない。
		 */
		var Object2D$1 = /** @class */ (function () {
		    function Object2D(param) {
		        if (!param) {
		            this.x = 0;
		            this.y = 0;
		            this.width = 0;
		            this.height = 0;
		            this.opacity = 1;
		            this.scaleX = 1;
		            this.scaleY = 1;
		            this.angle = 0;
		            this.compositeOperation = undefined;
		            this.anchorX = 0;
		            this.anchorY = 0;
		            this._matrix = undefined;
		        }
		        else {
		            this.x = param.x || 0;
		            this.y = param.y || 0;
		            this.width = param.width || 0;
		            this.height = param.height || 0;
		            this.opacity = param.opacity != null ? param.opacity : 1;
		            this.scaleX = param.scaleX != null ? param.scaleX : 1;
		            this.scaleY = param.scaleY != null ? param.scaleY : 1;
		            this.angle = param.angle || 0;
		            this.compositeOperation = param.compositeOperation;
		            // `null` に後方互換性のための意味を持たせているので、 `=== undefined` で比較する
		            this.anchorX = param.anchorX === undefined ? 0 : param.anchorX;
		            this.anchorY = param.anchorY === undefined ? 0 : param.anchorY;
		            this._matrix = undefined;
		        }
		    }
		    Object2D.prototype.moveTo = function (posOrX, y) {
		        if (typeof posOrX === "number" && typeof y !== "number") {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Object2D#moveTo: arguments must be CommonOffset or pair of x and y as a number.");
		        }
		        if (typeof posOrX === "number") {
		            this.x = posOrX;
		            this.y = y;
		        }
		        else {
		            this.x = posOrX.x;
		            this.y = posOrX.y;
		        }
		    };
		    /**
		     * オブジェクトを相対的に移動する。
		     * このメソッドは `x` と `y` を同時に加算するためのユーティリティメソッドである。
		     * `E` や `Camera2D` においてこのメソッドを呼び出した場合、 `modified()` を呼び出す必要がある。
		     * @param x X座標に加算する値
		     * @param y Y座標に加算する値
		     */
		    Object2D.prototype.moveBy = function (x, y) {
		        this.x += x;
		        this.y += y;
		    };
		    Object2D.prototype.resizeTo = function (sizeOrWidth, height) {
		        if (typeof sizeOrWidth === "number" && typeof height !== "number") {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Object2D#resizeTo: arguments must be CommonSize or pair of width and height as a number.");
		        }
		        if (typeof sizeOrWidth === "number") {
		            this.width = sizeOrWidth;
		            this.height = height;
		        }
		        else {
		            this.width = sizeOrWidth.width;
		            this.height = sizeOrWidth.height;
		        }
		    };
		    /**
		     * オブジェクトのサイズを相対的に変更する。
		     * このメソッドは `width` と `height` を同時に加算するためのユーティリティメソッドである。
		     * `E` や `Camera2D` においてこのメソッドを呼び出した場合、 `modified()` を呼び出す必要がある。
		     * @param width 加算する幅
		     * @param height 加算する高さ
		     */
		    Object2D.prototype.resizeBy = function (width, height) {
		        this.width += width;
		        this.height += height;
		    };
		    /**
		     * オブジェクトの拡大率を設定する。
		     * このメソッドは `scaleX` と `scaleY` に同じ値を同時に設定するためのユーティリティメソッドである。
		     * `E` や `Camera2D` においてこのメソッドを呼び出した場合、 `modified()` を呼び出す必要がある。
		     * @param scale 拡大率
		     */
		    Object2D.prototype.scale = function (scale) {
		        this.scaleX = scale;
		        this.scaleY = scale;
		    };
		    /**
		     * オブジェクトのアンカーの位置を設定する。
		     * このメソッドは `anchorX` と `anchorY` を同時に設定するためのユーティリティメソッドである。
		     * `E` や `Camera2D` においてこのメソッドを呼び出した場合、 `modified()` を呼び出す必要がある。
		     */
		    Object2D.prototype.anchor = function (x, y) {
		        this.anchorX = x;
		        this.anchorY = y;
		    };
		    /**
		     * このオブジェクトの変換行列を得る。
		     */
		    Object2D.prototype.getMatrix = function () {
		        if (!this._matrix) {
		            this._matrix = new Matrix_1.PlainMatrix();
		        }
		        else if (!this._matrix._modified) {
		            return this._matrix;
		        }
		        this._updateMatrix();
		        this._matrix._modified = false;
		        return this._matrix;
		    };
		    /**
		     * 公開のプロパティから内部の変換行列キャッシュを更新する。
		     * @private
		     */
		    Object2D.prototype._updateMatrix = function () {
		        if (this.angle || this.scaleX !== 1 || this.scaleY !== 1 || this.anchorX !== 0 || this.anchorY !== 0) {
		            // @ts-ignore
		            this._matrix.update(this.width, this.height, this.scaleX, this.scaleY, this.angle, this.x, this.y, this.anchorX, this.anchorY);
		        }
		        else {
		            // @ts-ignore
		            this._matrix.reset(this.x, this.y);
		        }
		    };
		    return Object2D;
		}());
		Object2D.Object2D = Object2D$1;
		
		return Object2D;
	}

	var Util = {};

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return Util;
		hasRequiredUtil = 1;
		Object.defineProperty(Util, "__esModule", { value: true });
		Util.Util = void 0;
		var pdi_types_1 = requireLib$2();
		/**
		 * ユーティリティ。
		 */
		var Util$1;
		(function (Util) {
		    var _a;
		    /**
		     * 2点間(P1..P2)の距離(pixel)を返す。
		     * @param {number} p1x P1-X
		     * @param {number} p1y P1-Y
		     * @param {number} p2x P2-X
		     * @param {number} p2y P2-Y
		     */
		    function distance(p1x, p1y, p2x, p2y) {
		        return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
		    }
		    Util.distance = distance;
		    /**
		     * 2点間(P1..P2)の距離(pixel)を返す。
		     * @param {CommonOffset} p1 座標1
		     * @param {CommonOffset} p2 座標2
		     */
		    function distanceBetweenOffsets(p1, p2) {
		        return Util.distance(p1.x, p1.y, p2.x, p2.y);
		    }
		    Util.distanceBetweenOffsets = distanceBetweenOffsets;
		    /**
		     * 2つの矩形の中心座標(P1..P2)間の距離(pixel)を返す。
		     * @param {CommonArea} p1 矩形1
		     * @param {CommonArea} p2 矩形2
		     */
		    function distanceBetweenAreas(p1, p2) {
		        return Util.distance(p1.x + p1.width / 2, p1.y + p1.height / 2, p2.x + p2.width / 2, p2.y + p2.height / 2);
		    }
		    Util.distanceBetweenAreas = distanceBetweenAreas;
		    /**
		     * idx文字目の文字のchar codeを返す。
		     *
		     * これはString#charCodeAt()と次の点で異なる。
		     * - idx文字目が上位サロゲートの時これを16bit左シフトし、idx+1文字目の下位サロゲートと論理和をとった値を返す。
		     * - idx文字目が下位サロゲートの時nullを返す。
		     *
		     * @param str 文字を取り出される文字列
		     * @param idx 取り出される文字の位置
		     */
		    // highly based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
		    function charCodeAt(str, idx) {
		        var code = str.charCodeAt(idx);
		        if (0xd800 <= code && code <= 0xdbff) {
		            var hi = code;
		            var low = str.charCodeAt(idx + 1);
		            return (hi << 16) | low;
		        }
		        if (0xdc00 <= code && code <= 0xdfff) {
		            // Low surrogate
		            return null;
		        }
		        return code;
		    }
		    Util.charCodeAt = charCodeAt;
		    /**
		     * enum の値の文字列を snake-case に変換した文字列を返す。
		     * @deprecated 非推奨である。非推奨の機能との互換性確保のために存在する。ゲーム開発者が使用すべきではない。
		     */
		    function enumToSnakeCase(enumDef, val) {
		        var s = enumDef[val];
		        // 呼び出し元で型が正しいことの保証が必要
		        return (s[0].toLowerCase() + s.slice(1).replace(/[A-Z]/g, function (c) { return "-" + c.toLowerCase(); }));
		    }
		    Util.enumToSnakeCase = enumToSnakeCase;
		    /**
		     * 数値を範囲内［min, max］に丸める
		     * @param num 丸める値
		     * @param min 値の下限
		     * @param max 値の上限
		     */
		    function clamp(num, min, max) {
		        return Math.min(Math.max(num, min), max);
		    }
		    Util.clamp = clamp;
		    /**
		     * CompositeOperation を CompositeOperationString に読み替えるテーブル。
		     * @deprecated 非推奨である。非推奨の機能との互換性のために存在する。ゲーム開発者が使用すべきではない。
		     */
		    // enumToSnakeCase() で代用できるが、 CompositeOperation の変換は複数回実行されうるので専用のテーブルを作っている。
		    Util.compositeOperationStringTable = (_a = {},
		        _a[pdi_types_1.CompositeOperation.SourceOver] = "source-over",
		        _a[pdi_types_1.CompositeOperation.SourceAtop] = "source-atop",
		        _a[pdi_types_1.CompositeOperation.Lighter] = "lighter",
		        _a[pdi_types_1.CompositeOperation.Copy] = "copy",
		        _a[pdi_types_1.CompositeOperation.ExperimentalSourceIn] = "experimental-source-in",
		        _a[pdi_types_1.CompositeOperation.ExperimentalSourceOut] = "experimental-source-out",
		        _a[pdi_types_1.CompositeOperation.ExperimentalDestinationAtop] = "experimental-destination-atop",
		        _a[pdi_types_1.CompositeOperation.ExperimentalDestinationIn] = "experimental-destination-in",
		        _a[pdi_types_1.CompositeOperation.DestinationOut] = "destination-out",
		        _a[pdi_types_1.CompositeOperation.DestinationOver] = "destination-over",
		        _a[pdi_types_1.CompositeOperation.Xor] = "xor",
		        _a[pdi_types_1.CompositeOperation.Difference] = "difference",
		        _a[pdi_types_1.CompositeOperation.Saturation] = "saturation",
		        _a);
		})(Util$1 || (Util.Util = Util$1 = {}));
		
		return Util;
	}

	var hasRequiredE;

	function requireE () {
		if (hasRequiredE) return E;
		hasRequiredE = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(E, "__esModule", { value: true });
		E.E = E.PointMoveEvent = E.PointUpEvent = E.PointDownEvent = void 0;
		var trigger_1 = requireCjs();
		var Event_1 = requireEvent();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var Matrix_1 = requireMatrix();
		var Object2D_1 = requireObject2D();
		var Util_1 = requireUtil();
		/**
		 * ポインティング操作の開始を表すイベント。
		 */
		var PointDownEvent = /** @class */ (function (_super) {
		    __extends(PointDownEvent, _super);
		    function PointDownEvent() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return PointDownEvent;
		}(Event_1.PointDownEventBase));
		E.PointDownEvent = PointDownEvent;
		/**
		 * ポインティング操作の終了を表すイベント。
		 * PointDownEvent後にのみ発生する。
		 *
		 * PointUpEvent#startDeltaによってPointDownEvent時からの移動量が、
		 * PointUpEvent#prevDeltaによって直近のPointMoveEventからの移動量が取得出来る。
		 * PointUpEvent#pointにはPointDownEvent#pointと同じ値が格納される。
		 */
		var PointUpEvent = /** @class */ (function (_super) {
		    __extends(PointUpEvent, _super);
		    function PointUpEvent() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return PointUpEvent;
		}(Event_1.PointUpEventBase));
		E.PointUpEvent = PointUpEvent;
		/**
		 * ポインティング操作の移動を表すイベント。
		 * PointDownEvent後にのみ発生するため、MouseMove相当のものが本イベントとして発生することはない。
		 *
		 * PointMoveEvent#startDeltaによってPointDownEvent時からの移動量が、
		 * PointMoveEvent#prevDeltaによって直近のPointMoveEventからの移動量が取得出来る。
		 * PointMoveEvent#pointにはPointMoveEvent#pointと同じ値が格納される。
		 *
		 * 本イベントは、プレイヤーがポインティングデバイスを移動していなくても、
		 * カメラの移動等視覚的にポイントが変化している場合にも発生する。
		 */
		var PointMoveEvent = /** @class */ (function (_super) {
		    __extends(PointMoveEvent, _super);
		    function PointMoveEvent() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return PointMoveEvent;
		}(Event_1.PointMoveEventBase));
		E.PointMoveEvent = PointMoveEvent;
		/**
		 * akashic-engineに描画される全てのエンティティを表す基底クラス。
		 * 本クラス単体に描画処理にはなく、直接利用する場合はchildrenを利用したコンテナとして程度で利用される。
		 */
		var E$1 = /** @class */ (function (_super) {
		    __extends(E, _super);
		    // pointMoveは代入する必要がないのでsetterを定義しない
		    /**
		     * 各種パラメータを指定して `E` のインスタンスを生成する。
		     * @param param 初期化に用いるパラメータのオブジェクト
		     */
		    function E(param) {
		        var _this = _super.call(this, param) || this;
		        _this.children = undefined;
		        _this.parent = undefined;
		        _this._touchable = false;
		        _this.state = 0 /* EntityStateFlags.None */;
		        _this._hasTouchableChildren = false;
		        _this._onUpdate = undefined;
		        _this._onMessage = undefined;
		        _this._onPointDown = undefined;
		        _this._onPointMove = undefined;
		        _this._onPointUp = undefined;
		        _this.tag = param.tag;
		        _this.shaderProgram = param.shaderProgram;
		        // local は Scene#register() や this.append() の呼び出しよりも先に立てなければならない
		        // ローカルシーン・ローカルティック補間シーンのエンティティは強制的に local (ローカルティックが来て他プレイヤーとずれる可能性がある)
		        _this.local = param.scene.local !== "non-local" || !!param.local;
		        if (param.children) {
		            for (var i = 0; i < param.children.length; ++i)
		                _this.append(param.children[i]);
		        }
		        if (param.parent) {
		            param.parent.append(_this);
		        }
		        if (param.touchable != null)
		            _this.touchable = param.touchable;
		        if (!!param.hidden)
		            _this.hide();
		        // set id, scene
		        // @ts-ignore NOTE: Game クラスで割り当てられるため、ここでは undefined を許容している
		        _this.id = param.id;
		        param.scene.register(_this);
		        return _this;
		    }
		    Object.defineProperty(E.prototype, "onUpdate", {
		        /**
		         * 時間経過イベント。本イベントの一度のfireにつき、常に1フレーム分の時間経過が起こる。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            if (!this._onUpdate)
		                this._onUpdate = new trigger_1.ChainTrigger(this.scene.onUpdate);
		            return this._onUpdate;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "onMessage", {
		        // onUpdateは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのmessageイベント。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            if (!this._onMessage)
		                this._onMessage = new trigger_1.ChainTrigger(this.scene.onMessage);
		            return this._onMessage;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "onPointDown", {
		        // onMessageは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのpoint downイベント。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            if (!this._onPointDown)
		                this._onPointDown = new trigger_1.ChainTrigger(this.scene.onPointDownCapture, this._isTargetOperation, this);
		            return this._onPointDown;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "onPointUp", {
		        // onPointDownは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのpoint upイベント。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            if (!this._onPointUp)
		                this._onPointUp = new trigger_1.ChainTrigger(this.scene.onPointUpCapture, this._isTargetOperation, this);
		            return this._onPointUp;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "onPointMove", {
		        // onPointUpは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのpoint moveイベント。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            if (!this._onPointMove)
		                this._onPointMove = new trigger_1.ChainTrigger(this.scene.onPointMoveCapture, this._isTargetOperation, this);
		            return this._onPointMove;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "touchable", {
		        // onPointMoveは代入する必要がないのでsetterを定義しない
		        /**
		         * プレイヤーにとって触れられるオブジェクトであるかを表す。
		         *
		         * この値が偽である場合、ポインティングイベントの対象にならない。
		         * 初期値は `false` である。
		         *
		         * `E` の他のプロパティと異なり、この値の変更後に `this.modified()` を呼び出す必要はない。
		         */
		        get: function () {
		            return this._touchable;
		        },
		        set: function (v) {
		            if (this._touchable === v)
		                return;
		            this._touchable = v;
		            if (v) {
		                this._enableTouchPropagation();
		            }
		            else {
		                this._disableTouchPropagation();
		            }
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "update", {
		        /**
		         * 時間経過イベント。本イベントの一度のfireにつき、常に1フレーム分の時間経過が起こる。
		         * @deprecated 非推奨である。将来的に削除される。代わりに `onUpdate` を利用すること。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            return this.onUpdate;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "message", {
		        // updateは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのmessageイベント。
		         * @deprecated 非推奨である。将来的に削除される。代わりに `onMessage` を利用すること。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            return this.onMessage;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "pointDown", {
		        // messageは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのpoint downイベント。
		         * @deprecated 非推奨である。将来的に削除される。代わりに `onPointDown` を利用すること。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            return this.onPointDown;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "pointUp", {
		        // pointDownは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのpoint upイベント。
		         * @deprecated 非推奨である。将来的に削除される。代わりに `onPointUp` を利用すること。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            return this.onPointUp;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(E.prototype, "pointMove", {
		        // pointUpは代入する必要がないのでsetterを定義しない
		        /**
		         * このエンティティのpoint moveイベント。
		         * @deprecated 非推奨である。将来的に削除される。代わりに `onPointMove` を利用すること。
		         */
		        // Eの生成コスト低減を考慮し、参照された時のみ生成出来るようアクセサを使う
		        get: function () {
		            return this.onPointMove;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    /**
		     * 自分自身と子孫の内容を描画する。
		     *
		     * このメソッドは、 `Renderer#draw()` からエンティティのツリー構造をトラバースする過程で暗黙に呼び出される。
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * @param renderer 描画先に対するRenderer
		     * @param camera 対象のカメラ。省略された場合、undefined
		     */
		    E.prototype.render = function (renderer, camera) {
		        this.state &= ~4 /* EntityStateFlags.Modified */;
		        if (this.state & 1 /* EntityStateFlags.Hidden */)
		            return;
		        if (this.state & 8 /* EntityStateFlags.ContextLess */) {
		            renderer.translate(this.x, this.y);
		            var goDown_1 = this.renderSelf(renderer, camera);
		            if (goDown_1 && this.children) {
		                var children = this.children;
		                var len = children.length;
		                for (var i = 0; i < len; ++i)
		                    children[i].render(renderer, camera);
		            }
		            renderer.translate(-this.x, -this.y);
		            return;
		        }
		        renderer.save();
		        if (this.angle || this.scaleX !== 1 || this.scaleY !== 1 || this.anchorX !== 0 || this.anchorY !== 0) {
		            // Note: this.scaleX/scaleYが0の場合描画した結果何も表示されない事になるが、特殊扱いはしない
		            renderer.transform(this.getMatrix()._matrix);
		        }
		        else {
		            // Note: 変形なしのオブジェクトはキャッシュもとらずtranslateのみで処理
		            renderer.translate(this.x, this.y);
		        }
		        if (this.opacity !== 1)
		            renderer.opacity(this.opacity);
		        var op = this.compositeOperation;
		        if (op !== undefined) {
		            renderer.setCompositeOperation(typeof op === "string" ? op : Util_1.Util.compositeOperationStringTable[op]);
		        }
		        if (this.shaderProgram !== undefined && renderer.isSupportedShaderProgram())
		            renderer.setShaderProgram(this.shaderProgram);
		        var goDown = this.renderSelf(renderer, camera);
		        if (goDown && this.children) {
		            // Note: concatしていないのでunsafeだが、render中に配列の中身が変わる事はない前提とする
		            var children = this.children;
		            for (var i = 0; i < children.length; ++i)
		                children[i].render(renderer, camera);
		        }
		        renderer.restore();
		    };
		    /**
		     * 自分自身の内容を描画する。
		     *
		     * このメソッドは、 `Renderer#draw()` からエンティティのツリー構造をトラバースする過程で暗黙に呼び出される。
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     *
		     * 戻り値は、このエンティティの子孫の描画をスキップすべきであれば偽、でなければ真である。
		     * (この値は、子孫の描画方法をカスタマイズする一部のサブクラスにおいて、通常の描画パスをスキップするために用いられる)
		     *
		     * @param renderer 描画先に対するRenderer
		     * @param camera 対象のカメラ
		     */
		    E.prototype.renderSelf = function (_renderer, _camera) {
		        // nothing to do
		        return true;
		    };
		    /**
		     * このエンティティが属する `Game` を返す。
		     */
		    E.prototype.game = function () {
		        return this.scene.game;
		    };
		    /**
		     * 子を追加する。
		     *
		     * @param e 子エンティティとして追加するエンティティ
		     */
		    E.prototype.append = function (e) {
		        this.insertBefore(e, undefined);
		    };
		    /**
		     * 子を挿入する。
		     *
		     * `target` が`this` の子でない場合、`append(e)` と同じ動作となる。
		     *
		     * @param e 子エンティティとして追加するエンティティ
		     * @param target 挿入位置にある子エンティティ
		     */
		    E.prototype.insertBefore = function (e, target) {
		        if (e.parent)
		            e.remove();
		        if (!this.children)
		            this.children = [];
		        e.parent = this;
		        var index = -1;
		        if (target !== undefined && (index = this.children.indexOf(target)) > -1) {
		            this.children.splice(index, 0, e);
		        }
		        else {
		            this.children.push(e);
		        }
		        if (e._touchable || e._hasTouchableChildren) {
		            this._hasTouchableChildren = true;
		            this._enableTouchPropagation();
		        }
		        this.modified(true);
		    };
		    /**
		     * 子を削除する。
		     *
		     * `e` が `this` の子でない場合、 `AssertionError` がthrowされる。
		     * `e === undefined` であり親がない場合、 `AssertionError` がthrowされる。
		     *
		     * @param e 削除する子エンティティ。省略された場合、自身を親から削除する
		     */
		    E.prototype.remove = function (e) {
		        if (e === undefined) {
		            this.parent.remove(this);
		            return;
		        }
		        var index = this.children ? this.children.indexOf(e) : -1;
		        if (index < 0)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("E#remove: invalid child");
		        this.children[index].parent = undefined;
		        this.children.splice(index, 1);
		        if (e._touchable || e._hasTouchableChildren) {
		            if (!this._findTouchableChildren(this)) {
		                this._hasTouchableChildren = false;
		                this._disableTouchPropagation();
		            }
		        }
		        this.modified(true);
		    };
		    /**
		     * このエンティティを破棄する。
		     *
		     * 親がある場合、親からは `remove()` される。
		     * 子孫を持っている場合、子孫も破棄される。
		     */
		    E.prototype.destroy = function () {
		        if (this.parent)
		            this.remove();
		        if (this.children) {
		            for (var i = this.children.length - 1; i >= 0; --i) {
		                this.children[i].destroy();
		            }
		            if (this.children.length !== 0)
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("E#destroy: can not destroy all children, " + this.children.length);
		            this.children = undefined;
		        }
		        // この解放はstringとforeachを使って書きたいが、minifyする時は.アクセスの方がいいのでやむを得ない
		        if (this._onUpdate) {
		            this._onUpdate.destroy();
		            this._onUpdate = undefined;
		        }
		        if (this._onMessage) {
		            this._onMessage.destroy();
		            this._onMessage = undefined;
		        }
		        if (this._onPointDown) {
		            this._onPointDown.destroy();
		            this._onPointDown = undefined;
		        }
		        if (this._onPointMove) {
		            this._onPointMove.destroy();
		            this._onPointMove = undefined;
		        }
		        if (this._onPointUp) {
		            this._onPointUp.destroy();
		            this._onPointUp = undefined;
		        }
		        this.scene.unregister(this);
		    };
		    /**
		     * このエンティティが破棄済みであるかを返す。
		     */
		    E.prototype.destroyed = function () {
		        return this.scene === undefined;
		    };
		    /**
		     * このエンティティに対する変更をエンジンに通知する。
		     *
		     * このメソッドの呼び出し後、 `this` に対する変更が各 `Renderer` の描画に反映される。
		     * ただし逆は真ではない。すなわち、再描画は他の要因によって行われることもある。
		     * ゲーム開発者は、このメソッドを呼び出していないことをもって再描画が行われていないことを仮定してはならない。
		     *
		     * 本メソッドは、このオブジェクトの `Object2D` 由来のプロパティ (`x`, `y`, `angle` など) を変更した場合にも呼びだす必要がある。
		     * 本メソッドは、描画キャッシュの無効化処理を含まない。描画キャッシュを持つエンティティは、このメソッドとは別に `invalidate()` を提供している。
		     * 描画キャッシュの無効化も必要な場合は、このメソッドではなくそちらを呼び出す必要がある。
		     * @param isBubbling 通常ゲーム開発者が指定する必要はない。この変更通知が、(このエンティティ自身のみならず)子孫の変更の通知を含む場合、真を渡さなければならない。省略された場合、偽。
		     */
		    E.prototype.modified = function (_isBubbling) {
		        // _matrixの用途は描画に限らない(e.g. E#findPointSourceByPoint)ので、Modifiedフラグと無関係にクリアする必要がある
		        if (this._matrix)
		            this._matrix._modified = true;
		        if (this.angle ||
		            this.scaleX !== 1 ||
		            this.scaleY !== 1 ||
		            this.anchorX !== 0 ||
		            this.anchorY !== 0 ||
		            this.opacity !== 1 ||
		            this.compositeOperation !== undefined ||
		            this.shaderProgram !== undefined) {
		            this.state &= ~8 /* EntityStateFlags.ContextLess */;
		        }
		        else {
		            this.state |= 8 /* EntityStateFlags.ContextLess */;
		        }
		        if (this.state & 4 /* EntityStateFlags.Modified */)
		            return;
		        this.state |= 4 /* EntityStateFlags.Modified */;
		        if (this.parent)
		            this.parent.modified(true);
		    };
		    /**
		     * このメソッドは、 `E#findPointSourceByPoint()` 内で子孫の探索をスキップすべきか判断するために呼ばれる。
		     * 通常、子孫の描画方法をカスタマイズする一部のサブクラスにおいて、与えられた座標に対する子孫の探索を制御する場合に利用する。
		     * ゲーム開発者がこのメソッドを呼び出す必要はない。
		     *
		     * 戻り値は、子孫の探索をスキップすべきであれば偽、でなければ真である。
		     *
		     * @param point このエンティティ（`this`）の位置を基準とした相対座標
		     */
		    E.prototype.shouldFindChildrenByPoint = function (_point) {
		        // nothing to do
		        return true;
		    };
		    /**
		     * 自身と自身の子孫の中で、その座標に反応する `PointSource` を返す。
		     *
		     * 戻り値は、対象が見つかった場合、 `target` に見つかったエンティティを持つ `PointSource` である。
		     * 対象が見つからなかった場合、 `undefined` である。戻り値が `undefined` でない場合、その `target` プロパティは次を満たす:
		     * - このエンティティ(`this`) またはその子孫である
		     * - `E#touchable` が真である
		     *
		     * @param point 対象の座標
		     * @param m `this` に適用する変換行列。省略された場合、単位行列
		     * @param force touchable指定を無視する場合真を指定する。省略された場合、偽
		     */
		    E.prototype.findPointSourceByPoint = function (point, m, force) {
		        if (this.state & 1 /* EntityStateFlags.Hidden */)
		            return undefined;
		        m = m ? m.multiplyNew(this.getMatrix()) : this.getMatrix().clone();
		        var p = m.multiplyInverseForPoint(point);
		        if (this._hasTouchableChildren || (force && this.children && this.children.length)) {
		            var children = this.children;
		            if (this.shouldFindChildrenByPoint(p)) {
		                for (var i = children.length - 1; i >= 0; --i) {
		                    var child = children[i];
		                    if (force || child._touchable || child._hasTouchableChildren) {
		                        var target = child.findPointSourceByPoint(point, m, force);
		                        if (target)
		                            return target;
		                    }
		                }
		            }
		        }
		        if (!(force || this._touchable))
		            return undefined;
		        // 逆行列をポイントにかけた結果がEにヒットしているかを計算
		        if (0 <= p.x && this.width > p.x && 0 <= p.y && this.height > p.y) {
		            return {
		                target: this,
		                point: p
		            };
		        }
		        return undefined;
		    };
		    /**
		     * このEが表示状態であるかどうかを返す。
		     */
		    E.prototype.visible = function () {
		        return (this.state & 1 /* EntityStateFlags.Hidden */) !== 1 /* EntityStateFlags.Hidden */;
		    };
		    /**
		     * このEを表示状態にする。
		     *
		     * `this.hide()` によって非表示状態にされたエンティティを表示状態に戻す。
		     * 生成直後のエンティティは表示状態であり、 `hide()` を呼び出さない限りこのメソッドを呼び出す必要はない。
		     */
		    E.prototype.show = function () {
		        if (!(this.state & 1 /* EntityStateFlags.Hidden */))
		            return;
		        this.state &= ~1 /* EntityStateFlags.Hidden */;
		        if (this.parent) {
		            this.parent.modified(true);
		        }
		    };
		    /**
		     * このEを非表示状態にする。
		     *
		     * `this.show()` が呼ばれるまでの間、このエンティティは各 `Renderer` によって描画されない。
		     * また `Game#findPointSource()` で返されることもなくなる。
		     * `this#pointDown`, `pointMove`, `pointUp` なども通常の方法ではfireされなくなる。
		     */
		    E.prototype.hide = function () {
		        if (this.state & 1 /* EntityStateFlags.Hidden */)
		            return;
		        this.state |= 1 /* EntityStateFlags.Hidden */;
		        if (this.parent) {
		            this.parent.modified(true);
		        }
		    };
		    /**
		     * このEの包含矩形を計算する。
		     */
		    E.prototype.calculateBoundingRect = function () {
		        return this._calculateBoundingRect(undefined);
		    };
		    /**
		     * このEの位置を基準とした相対座標をゲームの左上端を基準とした座標に変換する。
		     * @param offset Eの位置を基準とした相対座標
		     */
		    E.prototype.localToGlobal = function (offset) {
		        var point = offset;
		        for (var entity = this; entity instanceof E; entity = entity.parent) {
		            point = entity.getMatrix().multiplyPoint(point);
		        }
		        return point;
		    };
		    /**
		     * ゲームの左上端を基準とした座標をこのEの位置を基準とした相対座標に変換する。
		     * @param offset ゲームの左上端を基準とした座標
		     */
		    E.prototype.globalToLocal = function (offset) {
		        var matrix = new Matrix_1.PlainMatrix();
		        for (var entity = this; entity instanceof E; entity = entity.parent) {
		            matrix.multiplyLeft(entity.getMatrix());
		        }
		        return matrix.multiplyInverseForPoint(offset);
		    };
		    /**
		     * このエンティティの座標系を、指定された祖先エンティティ (またはシーン) の座標系に変換する行列を求める。
		     *
		     * 指定されたエンティティが、このエンティティの祖先でない時、その値は無視される。
		     * 指定されたシーンが、このエンティティの属するシーン出ない時、その値は無視される。
		     *
		     * @param target 座標系の変換先エンティティまたはシーン。省略した場合、このエンティティの属するシーン(グローバル座標系への変換行列になる)
		     * @private
		     */
		    E.prototype._calculateMatrixTo = function (target) {
		        var matrix = new Matrix_1.PlainMatrix();
		        for (var entity = this; entity instanceof E && entity !== target; entity = entity.parent) {
		            matrix.multiplyLeft(entity.getMatrix());
		        }
		        return matrix;
		    };
		    /**
		     * このエンティティと与えられたエンティティの共通祖先のうち、もっとも子孫側にあるものを探す。
		     * 共通祖先がない場合、 `undefined` を返す。
		     *
		     * @param target このエンティティとの共通祖先を探すエンティティ
		     * @private
		     */
		    E.prototype._findLowestCommonAncestorWith = function (target) {
		        var seen = {};
		        for (var p = this; p instanceof E; p = p.parent) {
		            seen[p.id] = true;
		        }
		        var ret = target;
		        for (; ret instanceof E; ret = ret.parent) {
		            if (seen.hasOwnProperty(ret.id))
		                break;
		        }
		        return ret;
		    };
		    /**
		     * @private
		     */
		    E.prototype._calculateBoundingRect = function (m) {
		        var matrix = this.getMatrix();
		        if (m) {
		            matrix = m.multiplyNew(matrix);
		        }
		        if (!this.visible()) {
		            return undefined;
		        }
		        var thisBoundingRect = {
		            left: 0,
		            right: this.width,
		            top: 0,
		            bottom: this.height
		        };
		        var targetCoordinates = [
		            { x: thisBoundingRect.left, y: thisBoundingRect.top },
		            { x: thisBoundingRect.left, y: thisBoundingRect.bottom },
		            { x: thisBoundingRect.right, y: thisBoundingRect.top },
		            { x: thisBoundingRect.right, y: thisBoundingRect.bottom }
		        ];
		        var convertedPoint = matrix.multiplyPoint(targetCoordinates[0]);
		        var result = {
		            left: convertedPoint.x,
		            right: convertedPoint.x,
		            top: convertedPoint.y,
		            bottom: convertedPoint.y
		        };
		        for (var i = 1; i < targetCoordinates.length; ++i) {
		            convertedPoint = matrix.multiplyPoint(targetCoordinates[i]);
		            if (result.left > convertedPoint.x)
		                result.left = convertedPoint.x;
		            if (result.right < convertedPoint.x)
		                result.right = convertedPoint.x;
		            if (result.top > convertedPoint.y)
		                result.top = convertedPoint.y;
		            if (result.bottom < convertedPoint.y)
		                result.bottom = convertedPoint.y;
		        }
		        if (this.children !== undefined) {
		            for (var i = 0; i < this.children.length; ++i) {
		                var nowResult = this.children[i]._calculateBoundingRect(matrix);
		                if (nowResult) {
		                    if (result.left > nowResult.left)
		                        result.left = nowResult.left;
		                    if (result.right < nowResult.right)
		                        result.right = nowResult.right;
		                    if (result.top > nowResult.top)
		                        result.top = nowResult.top;
		                    if (result.bottom < nowResult.bottom)
		                        result.bottom = nowResult.bottom;
		                }
		            }
		        }
		        return result;
		    };
		    /**
		     * @private
		     */
		    E.prototype._enableTouchPropagation = function () {
		        var p = this.parent;
		        while (p instanceof E && !p._hasTouchableChildren) {
		            p._hasTouchableChildren = true;
		            p = p.parent;
		        }
		    };
		    /**
		     * @private
		     */
		    E.prototype._disableTouchPropagation = function () {
		        var p = this.parent;
		        while (p instanceof E && p._hasTouchableChildren) {
		            if (this._findTouchableChildren(p))
		                break;
		            p._hasTouchableChildren = false;
		            p = p.parent;
		        }
		    };
		    /**
		     * @private
		     */
		    E.prototype._isTargetOperation = function (e) {
		        if (this.state & 1 /* EntityStateFlags.Hidden */)
		            return false;
		        if (e instanceof Event_1.PointEventBase)
		            return this._touchable && e.target === this;
		        return false;
		    };
		    E.prototype._findTouchableChildren = function (e) {
		        if (e.children) {
		            for (var i = 0; i < e.children.length; ++i) {
		                if (e.children[i].touchable)
		                    return e.children[i];
		                var tmp = this._findTouchableChildren(e.children[i]);
		                if (tmp)
		                    return tmp;
		            }
		        }
		        return undefined;
		    };
		    return E;
		}(Object2D_1.Object2D));
		E.E = E$1;
		
		return E;
	}

	var hasRequiredCacheableE;

	function requireCacheableE () {
		if (hasRequiredCacheableE) return CacheableE;
		hasRequiredCacheableE = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(CacheableE, "__esModule", { value: true });
		CacheableE.CacheableE = void 0;
		var E_1 = requireE();
		/**
		 * 内部描画キャッシュを持つ `E` 。
		 */
		var CacheableE$1 = /** @class */ (function (_super) {
		    __extends(CacheableE, _super);
		    /**
		     * 各種パラメータを指定して `CacheableE` のインスタンスを生成する。
		     * @param param このエンティティに対するパラメータ
		     */
		    function CacheableE(param) {
		        var _this = _super.call(this, param) || this;
		        _this._shouldRenderChildren = true;
		        _this._cache = undefined;
		        _this._renderer = undefined;
		        _this._renderedCamera = undefined;
		        return _this;
		    }
		    /**
		     * このエンティティの描画キャッシュ無効化をエンジンに通知する。
		     * このメソッドを呼び出し後、描画キャッシュの再構築が行われ、各 `Renderer` に描画内容の変更が反映される。
		     */
		    CacheableE.prototype.invalidate = function () {
		        this.state &= ~2 /* EntityStateFlags.Cached */;
		        this.modified();
		    };
		    /**
		     * このエンティティ自身の描画を行う。
		     * このメソッドはエンジンから暗黙に呼び出され、ゲーム開発者が呼び出す必要はない。
		     */
		    CacheableE.prototype.renderSelf = function (renderer, camera) {
		        var padding = CacheableE.PADDING;
		        if (this._renderedCamera !== camera) {
		            this.state &= ~2 /* EntityStateFlags.Cached */;
		            this._renderedCamera = camera;
		        }
		        if (!(this.state & 2 /* EntityStateFlags.Cached */)) {
		            this._cacheSize = this.calculateCacheSize();
		            var w = Math.ceil(this._cacheSize.width) + padding * 2;
		            var h = Math.ceil(this._cacheSize.height) + padding * 2;
		            var isNew = !this._cache || this._cache.width < w || this._cache.height < h;
		            if (isNew) {
		                if (this._cache && !this._cache.destroyed()) {
		                    this._cache.destroy();
		                }
		                this._cache = this.scene.game.resourceFactory.createSurface(w, h);
		                this._renderer = this._cache.renderer();
		            }
		            var cacheRenderer = this._renderer;
		            cacheRenderer.begin();
		            if (!isNew) {
		                cacheRenderer.clear();
		            }
		            cacheRenderer.save();
		            cacheRenderer.translate(padding, padding);
		            this.renderCache(cacheRenderer, camera);
		            cacheRenderer.restore();
		            this.state |= 2 /* EntityStateFlags.Cached */;
		            cacheRenderer.end();
		        }
		        if (this._cache && this._cacheSize.width > 0 && this._cacheSize.height > 0) {
		            renderer.translate(-padding, -padding);
		            this.renderSelfFromCache(renderer);
		            renderer.translate(padding, padding);
		        }
		        return this._shouldRenderChildren;
		    };
		    /**
		     * 内部キャッシュから自身の描画を行う。
		     * このメソッドはエンジンから暗黙に呼び出され、ゲーム開発者が呼び出す必要はない。
		     */
		    CacheableE.prototype.renderSelfFromCache = function (renderer) {
		        renderer.drawImage(this._cache, 0, 0, this._cacheSize.width + CacheableE.PADDING, this._cacheSize.height + CacheableE.PADDING, 0, 0);
		    };
		    /**
		     * 利用している `Surface` を破棄した上で、このエンティティを破棄する。
		     */
		    CacheableE.prototype.destroy = function () {
		        if (this._cache && !this._cache.destroyed()) {
		            this._cache.destroy();
		        }
		        this._cache = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    /**
		     * キャッシュのサイズを取得する。
		     * 本クラスを継承したクラスでエンティティのサイズと異なるサイズを利用する場合、このメソッドをオーバーライドする。
		     * このメソッドはエンジンから暗黙に呼び出され、ゲーム開発者が呼び出す必要はない。
		     * このメソッドから得られる値を変更した場合、 `this.invalidate()` を呼び出す必要がある。
		     */
		    CacheableE.prototype.calculateCacheSize = function () {
		        return {
		            width: this.width,
		            height: this.height
		        };
		    };
		    /**
		     * _cache のパディングサイズ。
		     *
		     * @private
		     */
		    CacheableE.PADDING = 1;
		    return CacheableE;
		}(E_1.E));
		CacheableE.CacheableE = CacheableE$1;
		
		return CacheableE;
	}

	var FilledRect = {};

	var hasRequiredFilledRect;

	function requireFilledRect () {
		if (hasRequiredFilledRect) return FilledRect;
		hasRequiredFilledRect = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(FilledRect, "__esModule", { value: true });
		FilledRect.FilledRect = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var E_1 = requireE();
		/**
		 * 塗りつぶされた矩形を表すエンティティ。
		 */
		var FilledRect$1 = /** @class */ (function (_super) {
		    __extends(FilledRect, _super);
		    /**
		     * 各種パラメータを指定して `FilledRect` のインスタンスを生成する。
		     * @param param このエンティティに対するパラメータ
		     */
		    function FilledRect(param) {
		        var _this = _super.call(this, param) || this;
		        if (typeof param.cssColor !== "string")
		            throw ExceptionFactory_1.ExceptionFactory.createTypeMismatchError("ColorBox#constructor(cssColor)", "string", param.cssColor);
		        _this.cssColor = param.cssColor;
		        return _this;
		    }
		    /**
		     * このエンティティ自身の描画を行う。
		     * このメソッドはエンジンから暗黙に呼び出され、ゲーム開発者が呼び出す必要はない。
		     */
		    FilledRect.prototype.renderSelf = function (renderer) {
		        renderer.fillRect(0, 0, this.width, this.height, this.cssColor);
		        return true;
		    };
		    return FilledRect;
		}(E_1.E));
		FilledRect.FilledRect = FilledRect$1;
		
		return FilledRect;
	}

	var FrameSprite = {};

	var Sprite = {};

	var SurfaceUtil = {};

	var hasRequiredSurfaceUtil;

	function requireSurfaceUtil () {
		if (hasRequiredSurfaceUtil) return SurfaceUtil;
		hasRequiredSurfaceUtil = 1;
		Object.defineProperty(SurfaceUtil, "__esModule", { value: true });
		SurfaceUtil.SurfaceUtil = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		/**
		 * Surface に関連するユーティリティ。
		 */
		var SurfaceUtil$1;
		(function (SurfaceUtil) {
		    /**
		     * 引数 `src` が `undefined` または `Surface` でそのまま返す。
		     * そうでなくかつ `ImageAsset` であれば `Surface` に変換して返す。
		     *
		     * @param src
		     */
		    function asSurface(src) {
		        if (!src) {
		            return undefined;
		        }
		        else if ("type" in src && src.type === "image") {
		            return src.asSurface();
		        }
		        else if ("_drawable" in src) {
		            return src;
		        }
		        throw ExceptionFactory_1.ExceptionFactory.createTypeMismatchError("SurfaceUtil#asSurface", "ImageAsset|Surface", src);
		    }
		    SurfaceUtil.asSurface = asSurface;
		    /**
		     * サーフェスのアニメーティングイベントへのハンドラ登録。
		     *
		     * これはエンジンが利用するものであり、ゲーム開発者が呼び出す必要はない。
		     *
		     * @param animatingHandler アニメーティングハンドラ
		     * @param surface サーフェス
		     */
		    function setupAnimatingHandler(animatingHandler, surface) {
		        if (surface.isPlaying()) {
		            animatingHandler._handleAnimationStart();
		        }
		    }
		    SurfaceUtil.setupAnimatingHandler = setupAnimatingHandler;
		    /**
		     * アニメーティングハンドラを別のサーフェスへ移動する。
		     *
		     * これはエンジンが利用するものであり、ゲーム開発者が呼び出す必要はない。
		     *
		     * @param animatingHandler アニメーティングハンドラ
		     * @param beforeSurface ハンドラ登録を解除するサーフェス
		     * @param afterSurface ハンドラを登録するサーフェス
		     */
		    function migrateAnimatingHandler(animatingHandler, _beforeSurface, afterSurface) {
		        animatingHandler._handleAnimationStop();
		        if (afterSurface.isPlaying()) {
		            animatingHandler._handleAnimationStart();
		        }
		    }
		    SurfaceUtil.migrateAnimatingHandler = migrateAnimatingHandler;
		    /**
		     * 対象の `Surface` にナインパッチ処理された `Surface` を描画する。
		     *
		     * これは、画像素材の拡大・縮小において「枠」の表現を実現するものである。
		     * 画像の上下左右の「枠」部分の幅・高さを渡すことで、上下の「枠」を縦に引き延ばすことなく、
		     * また左右の「枠」を横に引き延ばすことなく画像を任意サイズに拡大・縮小できる。
		     * ゲームにおけるメッセージウィンドウやダイアログの表現に利用することを想定している。
		     *
		     * @param destSurface 描画先 `Surface`
		     * @param srcSurface 描画元 `Surface`
		     * @param borderWidth 上下左右の「拡大しない」領域の大きさ。すべて同じ値なら数値一つを渡すことができる。省略された場合、 `4`
		     */
		    function drawNinePatch(destSurface, srcSurface, borderWidth) {
		        if (borderWidth === void 0) { borderWidth = 4; }
		        var renderer = destSurface.renderer();
		        renderer.begin();
		        renderer.clear();
		        renderNinePatch(renderer, destSurface.width, destSurface.height, srcSurface, borderWidth);
		        renderer.end();
		    }
		    SurfaceUtil.drawNinePatch = drawNinePatch;
		    /**
		     * 対象の `Renderer` にナインパッチ処理された `Surface` を描画する。
		     *
		     * 開発者は以下のような状況でこの関数を利用すべきである。
		     * * E を継承した独自の Entity を renderSelf() メソッドで描画する場合。この場合描画先の Surface が不明なので drawNinePatch() よりもこの関数の方が適している。
		     * * Surface全体ではなく部分的に描画したい場合。drawNinePatch() では Surface 全体の描画にしか対応していないため。
		     *
		     * @param renderer 描画先 `Renderer`
		     * @param width 描画先の横幅
		     * @param height 描画先の縦幅
		     * @param surface 描画元 `Surface`
		     * @param borderWidth 上下左右の「拡大しない」領域の大きさ。すべて同じ値なら数値一つを渡すことができる。省略された場合、 `4`
		     */
		    function renderNinePatch(renderer, width, height, surface, borderWidth) {
		        if (borderWidth === void 0) { borderWidth = 4; }
		        var border;
		        if (typeof borderWidth === "number") {
		            border = {
		                top: borderWidth,
		                bottom: borderWidth,
		                left: borderWidth,
		                right: borderWidth
		            };
		        }
		        else {
		            border = borderWidth;
		        }
		        //    x0  x1                          x2
		        // y0 +-----------------------------------+
		        //    | 1 |             5             | 2 |
		        // y1 |---+---------------------------+---|
		        //    |   |                           |   |
		        //    | 7 |             9             | 8 |
		        //    |   |                           |   |
		        // y2 |---+---------------------------+---|
		        //    | 3 |             6             | 4 |
		        //    +-----------------------------------+
		        //
		        // 1-4: 拡縮無し
		        // 5-6: 水平方向へ拡縮
		        // 7-8: 垂直方向へ拡縮
		        // 9  : 全方向へ拡縮
		        var sx1 = border.left;
		        var sx2 = surface.width - border.right;
		        var sy1 = border.top;
		        var sy2 = surface.height - border.bottom;
		        var dx1 = border.left;
		        var dx2 = width - border.right;
		        var dy1 = border.top;
		        var dy2 = height - border.bottom;
		        // Draw corners
		        var srcCorners = [
		            {
		                x: 0,
		                y: 0,
		                width: border.left,
		                height: border.top
		            },
		            {
		                x: sx2,
		                y: 0,
		                width: border.right,
		                height: border.top
		            },
		            {
		                x: 0,
		                y: sy2,
		                width: border.left,
		                height: border.bottom
		            },
		            {
		                x: sx2,
		                y: sy2,
		                width: border.right,
		                height: border.bottom
		            }
		        ];
		        var destCorners = [
		            { x: 0, y: 0 },
		            { x: dx2, y: 0 },
		            { x: 0, y: dy2 },
		            { x: dx2, y: dy2 }
		        ];
		        for (var i = 0; i < srcCorners.length; ++i) {
		            var c = srcCorners[i];
		            renderer.save();
		            renderer.translate(destCorners[i].x, destCorners[i].y);
		            renderer.drawImage(surface, c.x, c.y, c.width, c.height, 0, 0);
		            renderer.restore();
		        }
		        // Draw borders
		        var srcBorders = [
		            { x: sx1, y: 0, width: sx2 - sx1, height: border.top },
		            { x: 0, y: sy1, width: border.left, height: sy2 - sy1 },
		            { x: sx2, y: sy1, width: border.right, height: sy2 - sy1 },
		            { x: sx1, y: sy2, width: sx2 - sx1, height: border.bottom }
		        ];
		        var destBorders = [
		            { x: dx1, y: 0, width: dx2 - dx1, height: border.top },
		            { x: 0, y: dy1, width: border.left, height: dy2 - dy1 },
		            { x: dx2, y: dy1, width: border.right, height: dy2 - dy1 },
		            { x: dx1, y: dy2, width: dx2 - dx1, height: border.bottom }
		        ];
		        for (var i = 0; i < srcBorders.length; ++i) {
		            var s = srcBorders[i];
		            var d = destBorders[i];
		            renderer.save();
		            renderer.translate(d.x, d.y);
		            renderer.transform([d.width / s.width, 0, 0, d.height / s.height, 0, 0]);
		            renderer.drawImage(surface, s.x, s.y, s.width, s.height, 0, 0);
		            renderer.restore();
		        }
		        // Draw center
		        var sw = sx2 - sx1;
		        var sh = sy2 - sy1;
		        var dw = dx2 - dx1;
		        var dh = dy2 - dy1;
		        renderer.save();
		        renderer.translate(dx1, dy1);
		        renderer.transform([dw / sw, 0, 0, dh / sh, 0, 0]);
		        renderer.drawImage(surface, sx1, sy1, sw, sh, 0, 0);
		        renderer.restore();
		    }
		    SurfaceUtil.renderNinePatch = renderNinePatch;
		})(SurfaceUtil$1 || (SurfaceUtil.SurfaceUtil = SurfaceUtil$1 = {}));
		
		return SurfaceUtil;
	}

	var hasRequiredSprite;

	function requireSprite () {
		if (hasRequiredSprite) return Sprite;
		hasRequiredSprite = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(Sprite, "__esModule", { value: true });
		Sprite.Sprite = void 0;
		var Matrix_1 = requireMatrix();
		var SurfaceUtil_1 = requireSurfaceUtil();
		var E_1 = requireE();
		/**
		 * 画像を描画するエンティティ。
		 */
		var Sprite$1 = /** @class */ (function (_super) {
		    __extends(Sprite, _super);
		    /**
		     * 各種パラメータを指定して `Sprite` のインスタンスを生成する。
		     * @param param `Sprite` に設定するパラメータ
		     */
		    function Sprite(param) {
		        var _this = _super.call(this, param) || this;
		        _this.src = param.src;
		        if ("_drawable" in param.src) {
		            _this._surface = param.src;
		        }
		        else {
		            // @ts-ignore
		            _this._surface = SurfaceUtil_1.SurfaceUtil.asSurface(param.src);
		        }
		        if (param.width == null)
		            _this.width = _this._surface.width;
		        if (param.height == null)
		            _this.height = _this._surface.height;
		        _this.srcWidth = param.srcWidth != null ? param.srcWidth : _this.width;
		        _this.srcHeight = param.srcHeight != null ? param.srcHeight : _this.height;
		        _this.srcX = param.srcX || 0;
		        _this.srcY = param.srcY || 0;
		        _this._stretchMatrix = undefined;
		        _this._beforeSrc = _this.src;
		        _this._beforeSurface = _this._surface;
		        SurfaceUtil_1.SurfaceUtil.setupAnimatingHandler(_this, _this._surface);
		        _this._invalidateSelf();
		        return _this;
		    }
		    /**
		     * @private
		     */
		    Sprite.prototype._handleUpdate = function () {
		        this.modified();
		    };
		    /**
		     * @private
		     */
		    Sprite.prototype._handleAnimationStart = function () {
		        if (!this.onUpdate.contains(this._handleUpdate, this)) {
		            this.onUpdate.add(this._handleUpdate, this);
		        }
		    };
		    /**
		     * @private
		     */
		    Sprite.prototype._handleAnimationStop = function () {
		        if (!this.destroyed()) {
		            this.onUpdate.remove(this._handleUpdate, this);
		        }
		    };
		    /**
		     * このエンティティ自身の描画を行う。
		     * このメソッドはエンジンから暗黙に呼び出され、ゲーム開発者が呼び出す必要はない。
		     */
		    Sprite.prototype.renderSelf = function (renderer, _camera) {
		        if (this.srcWidth <= 0 || this.srcHeight <= 0) {
		            return true;
		        }
		        if (this._stretchMatrix) {
		            renderer.save();
		            renderer.transform(this._stretchMatrix._matrix);
		        }
		        renderer.drawImage(this._surface, this.srcX, this.srcY, this.srcWidth, this.srcHeight, 0, 0);
		        if (this._stretchMatrix)
		            renderer.restore();
		        return true;
		    };
		    /**
		     * このエンティティの描画キャッシュ無効化をエンジンに通知する。
		     * このメソッドを呼び出し後、描画キャッシュの再構築が行われ、各 `Renderer` に描画内容の変更が反映される。
		     */
		    Sprite.prototype.invalidate = function () {
		        this._invalidateSelf();
		        this.modified();
		    };
		    /**
		     * このエンティティを破棄する。
		     * デフォルトでは利用している `Surface` の破棄は行わない点に注意。
		     * @param destroySurface trueを指定した場合、このエンティティが抱える `Surface` も合わせて破棄する
		     */
		    Sprite.prototype.destroy = function (destroySurface) {
		        if (this._surface && !this._surface.destroyed() && destroySurface) {
		            this._surface.destroy();
		        }
		        this.src = undefined;
		        this._beforeSrc = undefined;
		        this._surface = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    Sprite.prototype._invalidateSelf = function () {
		        if (this.width === this.srcWidth && this.height === this.srcHeight) {
		            this._stretchMatrix = undefined;
		        }
		        else {
		            this._stretchMatrix = new Matrix_1.PlainMatrix();
		            this._stretchMatrix.scale(this.width / this.srcWidth, this.height / this.srcHeight);
		        }
		        if (this.src !== this._beforeSrc) {
		            this._beforeSrc = this.src;
		            if ("_drawable" in this.src) {
		                this._surface = this.src;
		            }
		            else {
		                // @ts-ignore
		                this._surface = SurfaceUtil_1.SurfaceUtil.asSurface(this.src);
		            }
		        }
		        if (this._surface !== this._beforeSurface) {
		            SurfaceUtil_1.SurfaceUtil.migrateAnimatingHandler(this, this._beforeSurface, this._surface);
		            this._beforeSurface = this._surface;
		        }
		    };
		    return Sprite;
		}(E_1.E));
		Sprite.Sprite = Sprite$1;
		
		return Sprite;
	}

	var hasRequiredFrameSprite;

	function requireFrameSprite () {
		if (hasRequiredFrameSprite) return FrameSprite;
		hasRequiredFrameSprite = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(FrameSprite, "__esModule", { value: true });
		FrameSprite.FrameSprite = void 0;
		var trigger_1 = requireCjs();
		var Sprite_1 = requireSprite();
		/**
		 * フレームとタイマーによるアニメーション機構を持つ `Sprite` 。
		 *
		 * このクラスは、コンストラクタで渡された画像を、
		 * 幅 `srcWidth`, 高さ `srcHeight` 単位で区切られた小さな画像(以下、画像片)の集まりであると解釈する。
		 * 各画像片は、左上から順に 0 から始まるインデックスで参照される。
		 *
		 * ゲーム開発者は、このインデックスからなる配列を `FrameSprite#frames` に設定する。
		 * `FrameSprite` は、 `frames` に指定されたインデックス(が表す画像片)を順番に描画することでアニメーションを実現する。
		 * アニメーションは `interval` ミリ秒ごとに進み、 `frames` の内容をループする。
		 *
		 * このクラスにおける `srcWidth`, `srcHeight` の扱いは、親クラスである `Sprite` とは異なっていることに注意。
		 */
		var FrameSprite$1 = /** @class */ (function (_super) {
		    __extends(FrameSprite, _super);
		    /**
		     * 各種パラメータを指定して `FrameSprite` のインスタンスを生成する。
		     * @param param `FrameSprite` に設定するパラメータ
		     */
		    function FrameSprite(param) {
		        var _this = _super.call(this, param) || this;
		        _this._lastUsedIndex = 0;
		        _this.frameNumber = param.frameNumber || 0;
		        _this.frames = param.frames != null ? param.frames : [0];
		        _this.interval = param.interval;
		        _this._timer = undefined;
		        _this.loop = param.loop != null ? param.loop : true;
		        _this.onFinish = new trigger_1.Trigger();
		        _this.finished = _this.onFinish;
		        _this._modifiedSelf();
		        return _this;
		    }
		    /**
		     * `Sprite` から `FrameSprite` を作成する。
		     * @param sprite 画像として使う`Sprite`
		     * @param width 作成されるエンティティの高さ。省略された場合、 `sprite.width`
		     * @param hegith 作成されるエンティティの高さ。省略された場合、 `sprite.height`
		     */
		    FrameSprite.createBySprite = function (sprite, width, height) {
		        var frameSprite = new FrameSprite({
		            scene: sprite.scene,
		            src: sprite.src,
		            width: width === undefined ? sprite.width : width,
		            height: height === undefined ? sprite.height : height
		        });
		        frameSprite.srcHeight = height === undefined ? sprite.srcHeight : height;
		        frameSprite.srcWidth = width === undefined ? sprite.srcWidth : width;
		        return frameSprite;
		    };
		    /**
		     * アニメーションを開始する。
		     */
		    FrameSprite.prototype.start = function () {
		        if (this.interval === undefined)
		            this.interval = 1000 / this.game().fps;
		        if (this._timer)
		            this._free();
		        this._timer = this.scene.createTimer(this.interval);
		        this._timer.onElapse.add(this._handleElapse, this);
		    };
		    /**
		     * このエンティティを破棄する。
		     * デフォルトでは利用している `Surface` の破棄は行わない点に注意。
		     * @param destroySurface trueを指定した場合、このエンティティが抱える `Surface` も合わせて破棄する
		     */
		    FrameSprite.prototype.destroy = function (destroySurface) {
		        this.stop();
		        _super.prototype.destroy.call(this, destroySurface);
		    };
		    /**
		     * アニメーションを停止する。
		     */
		    FrameSprite.prototype.stop = function () {
		        if (this._timer)
		            this._free();
		    };
		    /**
		     * このエンティティに対する変更をエンジンに通知する。詳細は `E#modified()` のドキュメントを参照。
		     */
		    FrameSprite.prototype.modified = function (isBubbling) {
		        this._modifiedSelf(isBubbling);
		        _super.prototype.modified.call(this, isBubbling);
		    };
		    /**
		     * @private
		     */
		    FrameSprite.prototype._handleElapse = function () {
		        if (this.frameNumber === this.frames.length - 1) {
		            if (this.loop) {
		                this.frameNumber = 0;
		            }
		            else {
		                this.stop();
		                this.onFinish.fire();
		            }
		        }
		        else {
		            this.frameNumber++;
		        }
		        this.modified();
		    };
		    /**
		     * @private
		     */
		    FrameSprite.prototype._free = function () {
		        if (!this._timer)
		            return;
		        this._timer.onElapse.remove(this._handleElapse, this);
		        if (this._timer.canDelete())
		            this.scene.deleteTimer(this._timer);
		        this._timer = undefined;
		    };
		    /**
		     * @private
		     */
		    FrameSprite.prototype._changeFrame = function () {
		        var frame = this.frames[this.frameNumber];
		        var sep = Math.floor(this._surface.width / this.srcWidth);
		        this.srcX = (frame % sep) * this.srcWidth;
		        this.srcY = Math.floor(frame / sep) * this.srcHeight;
		        this._lastUsedIndex = frame;
		    };
		    FrameSprite.prototype._modifiedSelf = function (_isBubbling) {
		        if (this._lastUsedIndex !== this.frames[this.frameNumber])
		            this._changeFrame();
		    };
		    return FrameSprite;
		}(Sprite_1.Sprite));
		FrameSprite.FrameSprite = FrameSprite$1;
		
		return FrameSprite;
	}

	var Label = {};

	var TextAlign = {};

	var hasRequiredTextAlign;

	function requireTextAlign () {
		if (hasRequiredTextAlign) return TextAlign;
		hasRequiredTextAlign = 1;
		Object.defineProperty(TextAlign, "__esModule", { value: true });
		TextAlign.TextAlign = void 0;
		/**
		 * テキストの描画位置。
		 * @deprecated 非推奨である。将来的に削除される。代わりに `TextAlignString` を利用すること。
		 */
		var TextAlign$1;
		(function (TextAlign) {
		    /**
		     * 左寄せ。
		     */
		    TextAlign[TextAlign["Left"] = 0] = "Left";
		    /**
		     * 中央寄せ。
		     */
		    TextAlign[TextAlign["Center"] = 1] = "Center";
		    /**
		     * 右寄せ。
		     */
		    TextAlign[TextAlign["Right"] = 2] = "Right";
		})(TextAlign$1 || (TextAlign.TextAlign = TextAlign$1 = {}));
		
		return TextAlign;
	}

	var hasRequiredLabel;

	function requireLabel () {
		if (hasRequiredLabel) return Label;
		hasRequiredLabel = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(Label, "__esModule", { value: true });
		Label.Label = void 0;
		var TextAlign_1 = requireTextAlign();
		var Util_1 = requireUtil();
		var CacheableE_1 = requireCacheableE();
		/**
		 * 単一行のテキストを描画するエンティティ。
		 * 本クラスの利用には `BitmapFont` または `DynamicFont` が必要となる。
		 */
		var Label$1 = /** @class */ (function (_super) {
		    __extends(Label, _super);
		    /**
		     * 各種パラメータを指定して `Label` のインスタンスを生成する。
		     * @param param このエンティティに指定するパラメータ
		     */
		    function Label(param) {
		        var _this = _super.call(this, param) || this;
		        _this.text = param.text;
		        _this.font = param.font;
		        _this.textAlign = param.textAlign != null ? param.textAlign : TextAlign_1.TextAlign.Left;
		        _this.glyphs = new Array(param.text.length);
		        _this.fontSize = param.fontSize != null ? param.fontSize : param.font.size;
		        _this.maxWidth = param.maxWidth;
		        _this.widthAutoAdjust = param.widthAutoAdjust != null ? param.widthAutoAdjust : true;
		        _this.textColor = param.textColor;
		        _this._realTextAlign = "left";
		        _this._textWidth = 0;
		        _this._overhangLeft = 0;
		        _this._overhangRight = 0;
		        _this._invalidateSelf();
		        return _this;
		    }
		    /**
		     * `width` と `textAlign` を設定し、 `widthAutoAdjust` を `false` に設定する。
		     *
		     * このメソッドは `this.textAlign` を設定するためのユーティリティである。
		     * `textAlign` を `"left"` (または非推奨の旧称 `TextAlign.Left`) 以外に設定する場合には、
		     * 通常 `width` や `widthAutoAdjust` も設定する必要があるため、それらをまとめて行う。
		     * このメソッドの呼び出し後、 `this.invalidate()` を呼び出す必要がある。
		     * @param width 幅
		     * @param textAlign テキストの描画位置
		     */
		    Label.prototype.aligning = function (width, textAlign) {
		        this.width = width;
		        this.widthAutoAdjust = false;
		        this.textAlign = textAlign;
		    };
		    /**
		     * このエンティティの描画キャッシュ無効化をエンジンに通知する。
		     * このメソッドを呼び出し後、描画キャッシュの再構築が行われ、各 `Renderer` に描画内容の変更が反映される。
		     */
		    Label.prototype.invalidate = function () {
		        this._invalidateSelf();
		        _super.prototype.invalidate.call(this);
		    };
		    /**
		     * Label自身の描画を行う。
		     */
		    Label.prototype.renderSelfFromCache = function (renderer) {
		        // glyphのはみ出し量に応じて、描画先のX座標を調整する。
		        var destOffsetX;
		        switch (this._realTextAlign) {
		            case "center":
		                destOffsetX = this.widthAutoAdjust ? this._overhangLeft : 0;
		                break;
		            case "right":
		                destOffsetX = this.widthAutoAdjust ? this._overhangLeft : this._overhangRight;
		                break;
		            default:
		                destOffsetX = this._overhangLeft;
		                break;
		        }
		        renderer.drawImage(this._cache, 0, 0, this._cacheSize.width + CacheableE_1.CacheableE.PADDING, this._cacheSize.height + CacheableE_1.CacheableE.PADDING, destOffsetX, 0);
		    };
		    Label.prototype.renderCache = function (renderer) {
		        if (!this.fontSize || this.height <= 0 || this._textWidth <= 0) {
		            return;
		        }
		        var scale = this.maxWidth && this.maxWidth > 0 && this.maxWidth < this._textWidth ? this.maxWidth / this._textWidth : 1;
		        var offsetX = 0;
		        switch (this._realTextAlign) {
		            case "center":
		                offsetX = this.width / 2 - ((this._textWidth + this._overhangLeft) / 2) * scale;
		                break;
		            case "right":
		                offsetX = this.width - (this._textWidth + this._overhangLeft) * scale;
		                break;
		            default:
		                offsetX -= this._overhangLeft * scale;
		                break;
		        }
		        renderer.translate(Math.round(offsetX), 0);
		        if (scale !== 1) {
		            renderer.transform([scale, 0, 0, 1, 0, 0]);
		        }
		        renderer.save();
		        var glyphScale = this.fontSize / this.font.size;
		        var cumulativeOffset = 0;
		        for (var i = 0; i < this.glyphs.length; ++i) {
		            var glyph = this.glyphs[i];
		            var glyphWidth = glyph.advanceWidth * glyphScale;
		            var code = glyph.code;
		            if (!glyph.isSurfaceValid) {
		                glyph = this.font.glyphForCharacter(code);
		                if (!glyph) {
		                    this._outputOfWarnLogWithNoGlyph(code, "renderCache()");
		                    continue;
		                }
		            }
		            if (glyph.surface) {
		                // 非空白文字
		                renderer.save();
		                renderer.translate(Math.round(cumulativeOffset), 0);
		                renderer.transform([glyphScale, 0, 0, glyphScale, 0, 0]);
		                renderer.drawImage(glyph.surface, glyph.x, glyph.y, glyph.width, glyph.height, glyph.offsetX, glyph.offsetY);
		                renderer.restore();
		            }
		            cumulativeOffset += glyphWidth;
		        }
		        renderer.restore();
		        renderer.save();
		        if (this.textColor) {
		            renderer.setCompositeOperation("source-atop");
		            renderer.fillRect(0, 0, this._textWidth, this.height, this.textColor);
		        }
		        renderer.restore();
		    };
		    /**
		     * このエンティティを破棄する。
		     * 利用している `BitmapFont` の破棄は行わないため、 `BitmapFont` の破棄はコンテンツ製作者が明示的に行う必要がある。
		     */
		    Label.prototype.destroy = function () {
		        _super.prototype.destroy.call(this);
		    };
		    Label.prototype._invalidateSelf = function () {
		        this.glyphs.length = 0;
		        this._textWidth = 0;
		        var align = this.textAlign;
		        this._realTextAlign = typeof align === "string" ? align : Util_1.Util.enumToSnakeCase(TextAlign_1.TextAlign, align);
		        if (!this.fontSize) {
		            this.height = 0;
		            return;
		        }
		        var effectiveTextLastIndex = this.text.length - 1;
		        // 右のはみだし量を求めるため、text内での有効な最後の glyph のindexを解決する。
		        for (var i = this.text.length - 1; i >= 0; --i) {
		            var code = Util_1.Util.charCodeAt(this.text, i);
		            if (!code) {
		                continue;
		            }
		            var glyph = this.font.glyphForCharacter(code);
		            if (glyph && glyph.width !== 0 && glyph.advanceWidth !== 0) {
		                effectiveTextLastIndex = i;
		                break;
		            }
		        }
		        var maxHeight = 0;
		        var glyphScale = this.font.size > 0 ? this.fontSize / this.font.size : 0;
		        for (var i = 0; i <= effectiveTextLastIndex; ++i) {
		            var code = Util_1.Util.charCodeAt(this.text, i);
		            if (!code) {
		                continue;
		            }
		            var glyph = this.font.glyphForCharacter(code);
		            if (!glyph) {
		                this._outputOfWarnLogWithNoGlyph(code, "_invalidateSelf()");
		                continue;
		            }
		            if (glyph.width < 0 || glyph.height < 0) {
		                continue;
		            }
		            if (glyph.x < 0 || glyph.y < 0) {
		                continue;
		            }
		            this.glyphs.push(glyph);
		            // Font に StrokeWidth が設定されている場合、文字の描画内容は、描画の基準点よりも左にはみ出る場合や、glyph.advanceWidth より右にはみ出る場合がある。
		            // キャッシュサーフェスの幅は、最初の文字と最後の文字のはみ出し部分を考慮して求める必要がある。
		            var overhang = 0;
		            if (i === 0) {
		                this._overhangLeft = Math.min(glyph.offsetX, 0);
		                overhang = -this._overhangLeft;
		            }
		            if (i === effectiveTextLastIndex) {
		                this._overhangRight = Math.max(glyph.width + glyph.offsetX - glyph.advanceWidth, 0);
		                overhang += this._overhangRight;
		            }
		            this._textWidth += (glyph.advanceWidth + overhang) * glyphScale;
		            var height = glyph.offsetY + glyph.height;
		            if (maxHeight < height) {
		                maxHeight = height;
		            }
		        }
		        if (this.widthAutoAdjust) {
		            this.width = this._textWidth;
		        }
		        this.height = maxHeight * glyphScale;
		    };
		    Label.prototype._outputOfWarnLogWithNoGlyph = function (code, functionName) {
		        var str = code & 0xffff0000 ? String.fromCharCode((code & 0xffff0000) >>> 16, code & 0xffff) : String.fromCharCode(code);
		        console.warn("Label#" +
		            functionName +
		            ": failed to get a glyph for '" +
		            str +
		            "' " +
		            "(BitmapFont might not have the glyph or DynamicFont might create a glyph larger than its atlas).");
		    };
		    return Label;
		}(CacheableE_1.CacheableE));
		Label.Label = Label$1;
		
		return Label;
	}

	var Pane = {};

	var hasRequiredPane;

	function requirePane () {
		if (hasRequiredPane) return Pane;
		hasRequiredPane = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(Pane, "__esModule", { value: true });
		Pane.Pane = void 0;
		var SurfaceUtil_1 = requireSurfaceUtil();
		var CacheableE_1 = requireCacheableE();
		/**
		 * 枠を表すエンティティ。
		 * クリッピングやパディング、バックグラウンドイメージの演出等の機能を持つため、
		 * メニューやメッセージ、ステータスのウィンドウ等に利用されることが期待される。
		 * このエンティティの子要素は、このエンティティの持つ `Surface` に描画される。
		 */
		var Pane$1 = /** @class */ (function (_super) {
		    __extends(Pane, _super);
		    /**
		     * 各種パラメータを指定して `Pane` のインスタンスを生成する。
		     * @param param このエンティティに指定するパラメータ
		     */
		    function Pane(param) {
		        var _this = _super.call(this, param) || this;
		        _this._oldWidth = param.width;
		        _this._oldHeight = param.height;
		        _this.backgroundImage = param.backgroundImage;
		        _this._beforeBackgroundImage = param.backgroundImage;
		        _this._backgroundImageSurface = SurfaceUtil_1.SurfaceUtil.asSurface(param.backgroundImage);
		        _this.backgroundEffector = param.backgroundEffector;
		        _this._shouldRenderChildren = false;
		        _this._padding = param.padding || 0;
		        _this._initialize();
		        _this._paddingChanged = false;
		        return _this;
		    }
		    Object.defineProperty(Pane.prototype, "padding", {
		        get: function () {
		            return this._padding;
		        },
		        /**
		         * パディング。
		         * このエンティティの子孫は、パディングに指定された分だけ右・下にずれた場所に描画され、またパディングの矩形サイズでクリッピングされる。
		         */
		        // NOTE: paddingの変更は頻繁に行われるものでは無いと思われるので、フラグを立てるためにアクセサを使う
		        set: function (padding) {
		            this._padding = padding;
		            this._paddingChanged = true;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    /**
		     * このエンティティに対する変更をエンジンに通知する。
		     * このメソッドの呼び出し後、 `this` に対する変更が各 `Renderer` の描画に反映される。
		     * このメソッドは描画キャッシュの無効化を保証しない。描画キャッシュの無効化も必要な場合、 `invalidate()`を呼び出さなければならない。
		     * 詳細は `E#modified()` のドキュメントを参照。
		     */
		    Pane.prototype.modified = function (isBubbling) {
		        if (isBubbling)
		            this.state &= ~2 /* EntityStateFlags.Cached */;
		        _super.prototype.modified.call(this);
		    };
		    Pane.prototype.shouldFindChildrenByPoint = function (point) {
		        var p = this._normalizedPadding;
		        if (p.left < point.x && this.width - p.right > point.x && p.top < point.y && this.height - p.bottom > point.y) {
		            return true;
		        }
		        return false;
		    };
		    Pane.prototype.renderCache = function (renderer, camera) {
		        if (this.width <= 0 || this.height <= 0) {
		            return;
		        }
		        this._renderBackground();
		        this._renderChildren(camera);
		        if (this._bgSurface) {
		            renderer.drawImage(this._bgSurface, 0, 0, this.width, this.height, 0, 0);
		        }
		        else if (this._backgroundImageSurface) {
		            renderer.drawImage(this._backgroundImageSurface, 0, 0, this.width, this.height, 0, 0);
		        }
		        if (this._childrenArea.width <= 0 || this._childrenArea.height <= 0) {
		            return;
		        }
		        renderer.save();
		        if (this._childrenArea.x !== 0 || this._childrenArea.y !== 0) {
		            renderer.translate(this._childrenArea.x, this._childrenArea.y);
		        }
		        renderer.drawImage(this._childrenSurface, 0, 0, this._childrenArea.width, this._childrenArea.height, 0, 0);
		        renderer.restore();
		    };
		    /**
		     * このエンティティを破棄する。また、バックバッファで利用している `Surface` も合わせて破棄される。
		     * ただし、 `backgroundImage` に利用している `Surface` の破棄は行わない。
		     * @param destroySurface trueを指定した場合、 `backgroundImage` に利用している `Surface` も合わせて破棄する。
		     */
		    Pane.prototype.destroy = function (destroySurface) {
		        if (destroySurface && this._backgroundImageSurface && !this._backgroundImageSurface.destroyed()) {
		            this._backgroundImageSurface.destroy();
		        }
		        if (this._bgSurface && !this._bgSurface.destroyed()) {
		            this._bgSurface.destroy();
		        }
		        if (this._childrenSurface && !this._childrenSurface.destroyed()) {
		            this._childrenSurface.destroy();
		        }
		        this.backgroundImage = undefined;
		        this._backgroundImageSurface = undefined;
		        this._beforeBackgroundImage = undefined;
		        this._bgSurface = undefined;
		        this._childrenSurface = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    /**
		     * @private
		     */
		    Pane.prototype._renderBackground = function () {
		        if (this.backgroundImage !== this._beforeBackgroundImage) {
		            this._backgroundImageSurface = SurfaceUtil_1.SurfaceUtil.asSurface(this.backgroundImage);
		            this._beforeBackgroundImage = this.backgroundImage;
		        }
		        if (this._backgroundImageSurface && this.backgroundEffector) {
		            var bgSurface = this.backgroundEffector.render(this._backgroundImageSurface, this.width, this.height);
		            if (this._bgSurface !== bgSurface) {
		                if (this._bgSurface && !this._bgSurface.destroyed()) {
		                    this._bgSurface.destroy();
		                }
		                this._bgSurface = bgSurface;
		            }
		        }
		        else {
		            this._bgSurface = undefined;
		        }
		    };
		    /**
		     * @private
		     */
		    Pane.prototype._renderChildren = function (camera) {
		        var isNew = this._oldWidth !== this.width || this._oldHeight !== this.height || this._paddingChanged;
		        if (isNew) {
		            this._initialize();
		            this._paddingChanged = false;
		            this._oldWidth = this.width;
		            this._oldHeight = this.height;
		        }
		        this._childrenRenderer.begin();
		        if (!isNew) {
		            this._childrenRenderer.clear();
		        }
		        if (this.children) {
		            // Note: concatしていないのでunsafeだが、render中に配列の中身が変わる事はない前提とする
		            var children = this.children;
		            for (var i = 0; i < children.length; ++i) {
		                children[i].render(this._childrenRenderer, camera);
		            }
		        }
		        this._childrenRenderer.end();
		    };
		    /**
		     * @private
		     */
		    Pane.prototype._initialize = function () {
		        var p = this._padding;
		        var r;
		        if (typeof p === "number") {
		            r = { top: p, bottom: p, left: p, right: p };
		        }
		        else {
		            r = p;
		        }
		        this._childrenArea = {
		            x: r.left,
		            y: r.top,
		            width: this.width - r.left - r.right,
		            height: this.height - r.top - r.bottom
		        };
		        var resourceFactory = this.scene.game.resourceFactory;
		        if (this._childrenSurface && !this._childrenSurface.destroyed()) {
		            this._childrenSurface.destroy();
		        }
		        this._childrenSurface = resourceFactory.createSurface(Math.ceil(this._childrenArea.width), Math.ceil(this._childrenArea.height));
		        this._childrenRenderer = this._childrenSurface.renderer();
		        this._normalizedPadding = r;
		    };
		    /**
		     * このPaneの包含矩形を計算する。
		     * Eを継承する他のクラスと異なり、Paneは子要素の位置を包括矩形に含まない。
		     * @private
		     */
		    Pane.prototype._calculateBoundingRect = function (m) {
		        var matrix = this.getMatrix();
		        if (m) {
		            matrix = m.multiplyNew(matrix);
		        }
		        if (!this.visible()) {
		            return undefined;
		        }
		        var thisBoundingRect = {
		            left: 0,
		            right: this.width,
		            top: 0,
		            bottom: this.height
		        };
		        var targetCoordinates = [
		            { x: thisBoundingRect.left, y: thisBoundingRect.top },
		            { x: thisBoundingRect.left, y: thisBoundingRect.bottom },
		            { x: thisBoundingRect.right, y: thisBoundingRect.top },
		            { x: thisBoundingRect.right, y: thisBoundingRect.bottom }
		        ];
		        var convertedPoint = matrix.multiplyPoint(targetCoordinates[0]);
		        var result = {
		            left: convertedPoint.x,
		            right: convertedPoint.x,
		            top: convertedPoint.y,
		            bottom: convertedPoint.y
		        };
		        for (var i = 1; i < targetCoordinates.length; ++i) {
		            convertedPoint = matrix.multiplyPoint(targetCoordinates[i]);
		            if (result.left > convertedPoint.x)
		                result.left = convertedPoint.x;
		            if (result.right < convertedPoint.x)
		                result.right = convertedPoint.x;
		            if (result.top > convertedPoint.y)
		                result.top = convertedPoint.y;
		            if (result.bottom < convertedPoint.y)
		                result.bottom = convertedPoint.y;
		        }
		        return result;
		    };
		    return Pane;
		}(CacheableE_1.CacheableE));
		Pane.Pane = Pane$1;
		
		return Pane;
	}

	var AssetAccessor = {};

	var hasRequiredAssetAccessor;

	function requireAssetAccessor () {
		if (hasRequiredAssetAccessor) return AssetAccessor;
		hasRequiredAssetAccessor = 1;
		Object.defineProperty(AssetAccessor, "__esModule", { value: true });
		AssetAccessor.AssetAccessor = void 0;
		/**
		 * アセットへのアクセスを提供するアクセッサ群。
		 *
		 * 実態は `AssetManager` のいくつかのメソッドに対するラッパーである。
		 * このクラスにより、パス・アセットID・パターン・フィルタから、対応する読み込み済みアセットを取得できる。
		 *
		 * 通常、ゲーム開発者はこのクラスのオブジェクトを生成する必要はない。
		 * `g.Scene#asset` に代入されている値を利用すればよい。
		 */
		var AssetAccessor$1 = /** @class */ (function () {
		    /**
		     * `AssetAccessor` のインスタンスを生成する。
		     *
		     * @param ラップする `AssetManager`
		     */
		    function AssetAccessor(assetManager) {
		        this._assetManager = assetManager;
		    }
		    /**
		     * パスから読み込み済みの画像アセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該の画像アセットが読み込まれていない場合、エラー。
		     *
		     * @param path 取得する画像アセットのパス
		     */
		    AssetAccessor.prototype.getImage = function (path) {
		        return this._assetManager.peekLiveAssetByAccessorPath(path, "image");
		    };
		    /**
		     * パスから読み込み済みのオーディオアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * さらにオーディオアセットに限り、拡張子を省いたものでなければならない。(e.g. `"/audio/bgm01"`)
		     *
		     * 当該のオーディオアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 取得するオーディオアセットのパス
		     */
		    AssetAccessor.prototype.getAudio = function (path) {
		        return this._assetManager.peekLiveAssetByAccessorPath(path, "audio");
		    };
		    /**
		     * パスから読み込み済みのスクリプトアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のスクリプトアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 取得するスクリプトアセットのパス
		     */
		    AssetAccessor.prototype.getScript = function (path) {
		        return this._assetManager.peekLiveAssetByAccessorPath(path, "script");
		    };
		    /**
		     * パスから読み込み済みのテキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のテキストアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 取得するテキストアセットのパス
		     */
		    AssetAccessor.prototype.getText = function (path) {
		        return this._assetManager.peekLiveAssetByAccessorPath(path, "text");
		    };
		    /**
		     * パスから読み込み済みのテキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得し、その内容の文字列を返す。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のテキストアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 内容の文字列を取得するテキストアセットのパス
		     */
		    AssetAccessor.prototype.getTextContent = function (path) {
		        return this.getText(path).data;
		    };
		    /**
		     * パスから読み込み済みのテキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得し、その内容をJSONとしてパースした値を返す。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のテキストアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 内容のJSONを取得するテキストアセットのパス
		     */
		    AssetAccessor.prototype.getJSONContent = function (path) {
		        return JSON.parse(this.getTextContent(path));
		    };
		    /**
		     * パスから読み込み済みのベクタ画像アセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のベクタ画像アセットが読み込まれていない場合、エラー。
		     *
		     * @param path 取得する画像アセットのパス
		     */
		    AssetAccessor.prototype.getVectorImage = function (path) {
		        return this._assetManager.peekLiveAssetByAccessorPath(path, "vector-image");
		    };
		    /**
		     * パスから読み込み済みのバイナリアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のバイナリアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 取得するバイナリアセットのパス
		     */
		    AssetAccessor.prototype.getBinary = function (path) {
		        return this._assetManager.peekLiveAssetByAccessorPath(path, "binary");
		    };
		    /**
		     * パスから読み込み済みのバイナリアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得し、その内容のバイト配列を返す。
		     *
		     * パスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスでなければならない。
		     * 当該のバイナリアセットが読み込まれていない場合、エラー。
		     *
		     * @param path 内容のバイト配列を取得するバイナリアセットのパス
		     */
		    AssetAccessor.prototype.getBinaryData = function (path) {
		        return this.getBinary(path).data;
		    };
		    /**
		     * 与えられたパターンまたはフィルタにマッチするパスを持つ、読み込み済みの全画像アセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     *
		     * ここでパスはgame.jsonのあるディレクトリをルート (`/`) とする、 `/` 区切りの絶対パスである。
		     *
		     * パターンは、パス文字列、またはパス中に0個以上の `**`, `*`, `?` を含む文字列である。
		     * ここで `**` は0個以上の任意のディレクトリを、 `*` は0個以上の `/` でない文字を、
		     * `?` は1個の `/` でない文字を表す。 (e.g. "/images/monsters??/*.png")
		     *
		     * フィルタは、パスを受け取ってbooleanを返す関数である。
		     * フィルタを与えた場合、読み込み済みの全アセットのうち、フィルタが偽でない値を返したものを返す。
		     *
		     * @param patternOrFilter 取得する画像アセットのパスパターンまたはフィルタ。省略した場合、読み込み済みの全て
		     */
		    AssetAccessor.prototype.getAllImages = function (patternOrFilter) {
		        return this._assetManager.peekAllLiveAssetsByPattern(patternOrFilter !== null && patternOrFilter !== void 0 ? patternOrFilter : "**/*", "image");
		    };
		    /**
		     * 与えられたパターンまたはフィルタにマッチするパスを持つ、読み込み済みの全オーディオアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 引数の仕様については `AssetAccessor#getAllImages()` の仕様を参照のこと。
		     * ただしオーディオアセットに限り、拡張子を省いたものでなければならない。(e.g. `"/audio/bgm*"`)
		     *
		     * @param patternOrFilter 取得するオーディオアセットのパスパターンまたはフィルタ。省略した場合、読み込み済みの全て
		     */
		    AssetAccessor.prototype.getAllAudios = function (patternOrFilter) {
		        return this._assetManager.peekAllLiveAssetsByPattern(patternOrFilter !== null && patternOrFilter !== void 0 ? patternOrFilter : "**/*", "audio");
		    };
		    /**
		     * 与えられたパターンまたはフィルタにマッチするパスを持つ、読み込み済みの全スクリプトアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 引数の仕様については `AssetAccessor#getAllImages()` の仕様を参照のこと。
		     *
		     * @param patternOrFilter 取得するスクリプトアセットのパスパターンまたはフィルタ。省略した場合、読み込み済みの全て
		     */
		    AssetAccessor.prototype.getAllScripts = function (patternOrFilter) {
		        return this._assetManager.peekAllLiveAssetsByPattern(patternOrFilter !== null && patternOrFilter !== void 0 ? patternOrFilter : "**/*", "script");
		    };
		    /**
		     * 与えられたパターンまたはフィルタにマッチするパスを持つ、読み込み済みの全テキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 引数の仕様については `AssetAccessor#getAllImages()` の仕様を参照のこと。
		     *
		     * @param patternOrFilter 取得するテキストアセットのパスパターンまたはフィルタ。省略した場合、読み込み済みの全て
		     */
		    AssetAccessor.prototype.getAllTexts = function (patternOrFilter) {
		        return this._assetManager.peekAllLiveAssetsByPattern(patternOrFilter !== null && patternOrFilter !== void 0 ? patternOrFilter : "**/*", "text");
		    };
		    /**
		     * 与えられたパターンまたはフィルタにマッチするパスを持つ、読み込み済みの全ベクタ画像アセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 引数の仕様については `AssetAccessor#getAllImages()` の仕様を参照のこと。
		     *
		     * @param patternOrFilter 取得するベクタ画像アセットのパスパターンまたはフィルタ。省略した場合、読み込み済みの全て
		     */
		    AssetAccessor.prototype.getAllVectorImages = function (patternOrFilter) {
		        return this._assetManager.peekAllLiveAssetsByPattern(patternOrFilter !== null && patternOrFilter !== void 0 ? patternOrFilter : "**/*", "vector-image");
		    };
		    /**
		     * 与えられたパターンまたはフィルタにマッチするパスを持つ、読み込み済みのバイナリアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 引数の仕様については `AssetAccessor#getAllImages()` の仕様を参照のこと。
		     *
		     * @param patternOrFilter 取得するベクタ画像アセットのパスパターンまたはフィルタ。省略した場合、読み込み済みの全て
		     */
		    AssetAccessor.prototype.getAllBinaries = function (patternOrFilter) {
		        return this._assetManager.peekAllLiveAssetsByPattern(patternOrFilter !== null && patternOrFilter !== void 0 ? patternOrFilter : "**/*", "binary");
		    };
		    /**
		     * アセットIDから読み込み済みの画像アセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 当該の画像アセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得する画像アセットのID
		     */
		    AssetAccessor.prototype.getImageById = function (assetId) {
		        return this._assetManager.peekLiveAssetById(assetId, "image");
		    };
		    /**
		     * アセットIDから読み込み済みのオーディオアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 当該のオーディオアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得するオーディオアセットのID
		     */
		    AssetAccessor.prototype.getAudioById = function (assetId) {
		        return this._assetManager.peekLiveAssetById(assetId, "audio");
		    };
		    /**
		     * アセットIDから読み込み済みのスクリプトアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 当該のスクリプトアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得するスクリプトアセットのID
		     */
		    AssetAccessor.prototype.getScriptById = function (assetId) {
		        return this._assetManager.peekLiveAssetById(assetId, "script");
		    };
		    /**
		     * アセットIDから読み込み済みのテキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 当該のテキストアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得するテキストアセットのID
		     */
		    AssetAccessor.prototype.getTextById = function (assetId) {
		        return this._assetManager.peekLiveAssetById(assetId, "text");
		    };
		    /**
		     * アセットIDから読み込み済みのテキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得し、その内容の文字列を返す。
		     * 当該のテキストアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 内容の文字列を取得するテキストアセットのID
		     */
		    AssetAccessor.prototype.getTextContentById = function (assetId) {
		        return this.getTextById(assetId).data;
		    };
		    /**
		     * アセットIDから読み込み済みのテキストアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得し、その内容をJSONとしてパースして返す。
		     * 当該のテキストアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 内容のJSONを取得するテキストアセットのID
		     */
		    AssetAccessor.prototype.getJSONContentById = function (assetId) {
		        return JSON.parse(this.getTextById(assetId).data);
		    };
		    /**
		     * アセットIDから読み込み済みのベクタ画像アセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 当該のベクタ画像アセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得するベクタ画像アセットのID
		     */
		    AssetAccessor.prototype.getVectorImageById = function (assetId) {
		        return this._assetManager.peekLiveAssetById(assetId, "vector-image");
		    };
		    /**
		     * アセットIDから読み込み済みのバイナリアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得する。
		     * 当該のバイナリアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得するバイナリアセットのID
		     */
		    AssetAccessor.prototype.getBinaryById = function (assetId) {
		        return this._assetManager.peekLiveAssetById(assetId, "binary");
		    };
		    /**
		     * アセットIDから読み込み済みのバイナリアセット（現在のシーンで読み込んだ、またはグローバルなアセット）を取得し、その内容のバイト配列を返す。
		     * 当該のバイナリアセットが読み込まれていない場合、エラー。
		     *
		     * @param assetId 取得するバイナリアセットのID
		     */
		    AssetAccessor.prototype.getBinaryDataById = function (assetId) {
		        return this.getBinaryById(assetId).data;
		    };
		    return AssetAccessor;
		}());
		AssetAccessor.AssetAccessor = AssetAccessor$1;
		
		return AssetAccessor;
	}

	var AssetGenerationConfiguration = {};

	var hasRequiredAssetGenerationConfiguration;

	function requireAssetGenerationConfiguration () {
		if (hasRequiredAssetGenerationConfiguration) return AssetGenerationConfiguration;
		hasRequiredAssetGenerationConfiguration = 1;
		Object.defineProperty(AssetGenerationConfiguration, "__esModule", { value: true });
		
		return AssetGenerationConfiguration;
	}

	var AssetHolder = {};

	var hasRequiredAssetHolder;

	function requireAssetHolder () {
		if (hasRequiredAssetHolder) return AssetHolder;
		hasRequiredAssetHolder = 1;
		Object.defineProperty(AssetHolder, "__esModule", { value: true });
		AssetHolder.AssetHolder = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		/**
		 * シーンのアセットの読み込みと破棄を管理するクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 */
		var AssetHolder$1 = /** @class */ (function () {
		    function AssetHolder(param) {
		        var assetManager = param.assetManager;
		        var assetIds = param.assetIds ? param.assetIds.concat() : [];
		        assetIds.push.apply(assetIds, assetManager.resolvePatternsToAssetIds(param.assetPaths || []));
		        this.waitingAssetsCount = assetIds.length;
		        this.userData = param.userData;
		        this._assetManager = assetManager;
		        this._assetIds = assetIds;
		        this._assets = [];
		        this._handlerSet = param.handlerSet;
		        this._requested = false;
		        this._alwaysNotifyFinish = !!param.alwaysNotifyFinish;
		        this._failureAssetIds = [];
		    }
		    AssetHolder.prototype.request = function () {
		        if (this.waitingAssetsCount === 0)
		            return false;
		        if (this._requested)
		            return true;
		        this._requested = true;
		        this._assetManager.requestAssets(this._assetIds, this);
		        return true;
		    };
		    AssetHolder.prototype.destroy = function () {
		        if (this._requested) {
		            this._assetManager.unrefAssets(this._assets);
		        }
		        this.waitingAssetsCount = 0;
		        this.userData = undefined;
		        this._handlerSet = undefined;
		        this._assetIds = undefined;
		        this._failureAssetIds = undefined;
		        this._requested = false;
		    };
		    AssetHolder.prototype.destroyed = function () {
		        return !this._handlerSet;
		    };
		    /**
		     * @private
		     */
		    AssetHolder.prototype._onAssetError = function (asset, error) {
		        var hs = this._handlerSet;
		        if (this.destroyed() || hs.owner.destroyed())
		            return;
		        var failureInfo = {
		            asset: asset,
		            error: error,
		            cancelRetry: false
		        };
		        hs.handleLoadFailure.call(hs.owner, failureInfo);
		        if (error.retriable && !failureInfo.cancelRetry) {
		            this._assetManager.retryLoad(asset);
		        }
		        else {
		            // game.json に定義されていればゲームを止める。それ以外 (DynamicAsset) では続行。
		            if (this._assetManager.configuration[asset.id]) {
		                hs.handleFinish.call(hs.owner, this, false);
		            }
		            else if (this._alwaysNotifyFinish) {
		                var assetConf = this._peekAssetConfFromAssetId(asset.id);
		                this._failureAssetIds.push(assetConf);
		                this._decrementWaitingAssetCount();
		            }
		        }
		    };
		    /**
		     * @private
		     */
		    AssetHolder.prototype._onAssetLoad = function (asset) {
		        var hs = this._handlerSet;
		        if (this.destroyed() || hs.owner.destroyed())
		            return;
		        hs.handleLoad.call(hs.owner, asset);
		        this._assets.push(asset);
		        this._decrementWaitingAssetCount();
		    };
		    /**
		     * @private
		     */
		    AssetHolder.prototype._decrementWaitingAssetCount = function () {
		        --this.waitingAssetsCount;
		        if (this.waitingAssetsCount > 0)
		            return;
		        if (this.waitingAssetsCount < 0)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetHolder#_onAssetLoad: broken waitingAssetsCount");
		        var hs = this._handlerSet;
		        hs.handleFinish.call(hs.owner, this, true);
		    };
		    /**
		     * @private
		     */
		    AssetHolder.prototype._getFailureAssetIds = function () {
		        return this._failureAssetIds;
		    };
		    /**
		     * @private
		     */
		    AssetHolder.prototype._peekAssetConfFromAssetId = function (id) {
		        for (var _i = 0, _a = this._assetIds; _i < _a.length; _i++) {
		            var assetConf = _a[_i];
		            var assetId = typeof assetConf === "string" ? assetConf : assetConf.id;
		            if (id === assetId) {
		                return assetConf;
		            }
		        }
		        throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetHolder#_peekAssetConfFromAssetId: could not peek the asset: ".concat(id));
		    };
		    return AssetHolder;
		}());
		AssetHolder.AssetHolder = AssetHolder$1;
		
		return AssetHolder;
	}

	var AssetLoadFailureInfo = {};

	var hasRequiredAssetLoadFailureInfo;

	function requireAssetLoadFailureInfo () {
		if (hasRequiredAssetLoadFailureInfo) return AssetLoadFailureInfo;
		hasRequiredAssetLoadFailureInfo = 1;
		Object.defineProperty(AssetLoadFailureInfo, "__esModule", { value: true });
		
		return AssetLoadFailureInfo;
	}

	var AssetManager = {};

	var EmptyBinaryAsset = {};

	var hasRequiredEmptyBinaryAsset;

	function requireEmptyBinaryAsset () {
		if (hasRequiredEmptyBinaryAsset) return EmptyBinaryAsset;
		hasRequiredEmptyBinaryAsset = 1;
		Object.defineProperty(EmptyBinaryAsset, "__esModule", { value: true });
		EmptyBinaryAsset.EmptyBinaryAsset = void 0;
		var trigger_1 = requireCjs();
		var EmptyBinaryAsset$1 = /** @class */ (function () {
		    function EmptyBinaryAsset(id, path) {
		        this.type = "binary";
		        this.onDestroyed = new trigger_1.Trigger();
		        this.id = id;
		        this.path = path;
		        this.originalPath = path;
		        this.data = new ArrayBuffer(0);
		    }
		    EmptyBinaryAsset.prototype.inUse = function () {
		        return false;
		    };
		    EmptyBinaryAsset.prototype.destroy = function () {
		        if (this.destroyed()) {
		            return;
		        }
		        this.onDestroyed.destroy();
		        this.onDestroyed = undefined;
		    };
		    EmptyBinaryAsset.prototype.destroyed = function () {
		        return !this.onDestroyed;
		    };
		    EmptyBinaryAsset.prototype._load = function (loader) {
		        loader._onAssetLoad(this);
		    };
		    EmptyBinaryAsset.prototype._assetPathFilter = function (path) {
		        return path;
		    };
		    return EmptyBinaryAsset;
		}());
		EmptyBinaryAsset.EmptyBinaryAsset = EmptyBinaryAsset$1;
		
		return EmptyBinaryAsset;
	}

	var EmptyGeneratedVectorImageAsset = {};

	var EmptyVectorImageAsset = {};

	var hasRequiredEmptyVectorImageAsset;

	function requireEmptyVectorImageAsset () {
		if (hasRequiredEmptyVectorImageAsset) return EmptyVectorImageAsset;
		hasRequiredEmptyVectorImageAsset = 1;
		Object.defineProperty(EmptyVectorImageAsset, "__esModule", { value: true });
		EmptyVectorImageAsset.EmptyVectorImageAsset = void 0;
		var trigger_1 = requireCjs();
		var EmptyVectorImageAsset$1 = /** @class */ (function () {
		    function EmptyVectorImageAsset(id, path, width, height, hint) {
		        this.type = "vector-image";
		        this.width = 0;
		        this.height = 0;
		        this.onDestroyed = new trigger_1.Trigger();
		        this.id = id;
		        this.path = path;
		        this.originalPath = path;
		        this.width = width;
		        this.height = height;
		        this.hint = hint;
		    }
		    EmptyVectorImageAsset.prototype.createSurface = function (_width, _height, _sx, _sy, _sWidth, _sHeight) {
		        return null;
		    };
		    EmptyVectorImageAsset.prototype.inUse = function () {
		        return false;
		    };
		    EmptyVectorImageAsset.prototype.destroy = function () {
		        if (this.destroyed()) {
		            return;
		        }
		        this.onDestroyed.destroy();
		        this.onDestroyed = undefined;
		    };
		    EmptyVectorImageAsset.prototype.destroyed = function () {
		        return !this.onDestroyed;
		    };
		    EmptyVectorImageAsset.prototype._load = function (loader) {
		        loader._onAssetLoad(this);
		    };
		    EmptyVectorImageAsset.prototype._assetPathFilter = function (path) {
		        return path;
		    };
		    return EmptyVectorImageAsset;
		}());
		EmptyVectorImageAsset.EmptyVectorImageAsset = EmptyVectorImageAsset$1;
		
		return EmptyVectorImageAsset;
	}

	var hasRequiredEmptyGeneratedVectorImageAsset;

	function requireEmptyGeneratedVectorImageAsset () {
		if (hasRequiredEmptyGeneratedVectorImageAsset) return EmptyGeneratedVectorImageAsset;
		hasRequiredEmptyGeneratedVectorImageAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(EmptyGeneratedVectorImageAsset, "__esModule", { value: true });
		EmptyGeneratedVectorImageAsset.EmptyGeneratedVectorImageAsset = void 0;
		var EmptyVectorImageAsset_1 = requireEmptyVectorImageAsset();
		var EmptyGeneratedVectorImageAsset$1 = /** @class */ (function (_super) {
		    __extends(EmptyGeneratedVectorImageAsset, _super);
		    function EmptyGeneratedVectorImageAsset(id, path, data) {
		        var _this = _super.call(this, id, path, 0, 0) || this;
		        _this.data = data;
		        return _this;
		    }
		    return EmptyGeneratedVectorImageAsset;
		}(EmptyVectorImageAsset_1.EmptyVectorImageAsset));
		EmptyGeneratedVectorImageAsset.EmptyGeneratedVectorImageAsset = EmptyGeneratedVectorImageAsset$1;
		
		return EmptyGeneratedVectorImageAsset;
	}

	var PartialImageAsset = {};

	var hasRequiredPartialImageAsset;

	function requirePartialImageAsset () {
		if (hasRequiredPartialImageAsset) return PartialImageAsset;
		hasRequiredPartialImageAsset = 1;
		Object.defineProperty(PartialImageAsset, "__esModule", { value: true });
		PartialImageAsset.PartialImageAsset = void 0;
		var trigger_1 = requireCjs();
		/**
		 * 部分画像アセット。
		 *
		 * `resourceFacotory.createImageAsset()` で生成したアセットをラップし、`slice` で指定される領域の画像アセットとして振る舞う。
		 * 通常、ゲーム開発者がこのクラスを生成する必要はない。
		 */
		var PartialImageAsset$1 = /** @class */ (function () {
		    /**
		     * 部分画像アセットを生成する。
		     *
		     * `createImageAsset()` と異なり、 `slice` で指定された領域の画像アセットとして振る舞うため、
		     * `this.width`, `this.height` が引数の `width`, height` ではなく `slice` の値で初期化される点に注意。
		     * (`width`, `height` は元になる画像アセットの生成に使われる)
		     */
		    function PartialImageAsset(resourceFactory, id, uri, width, height, slice) {
		        this.type = "image";
		        this.hint = undefined;
		        this.onDestroyed = new trigger_1.Trigger();
		        this._surface = null;
		        this._loadHandler = null;
		        this.id = id;
		        this.path = uri;
		        this.originalPath = uri;
		        this.width = slice.width;
		        this.height = slice.height;
		        this._slice = slice;
		        this._resourceFactory = resourceFactory;
		        var internalId = "".concat(id, "/<internal>"); // AssetManager が管理しないので値は何でもよいが、わかりやすさのため `id` を元にしておく
		        this._src = resourceFactory.createImageAsset(internalId, uri, width, height);
		    }
		    PartialImageAsset.prototype.initialize = function (hint) {
		        this.hint = hint; // 自分では使わないが、外部観測的に `ImageAsset` と合うように代入しておく
		        this._src.initialize(hint);
		    };
		    PartialImageAsset.prototype.inUse = function () {
		        return false;
		    };
		    PartialImageAsset.prototype.destroy = function () {
		        if (this.destroyed()) {
		            return;
		        }
		        this.onDestroyed.fire(this);
		        this._src.destroy();
		        this._src = null;
		        this._slice = null;
		        this._resourceFactory = null;
		        this._surface = null;
		        this._loadHandler = null;
		        this.onDestroyed.destroy();
		        this.onDestroyed = undefined;
		    };
		    PartialImageAsset.prototype.destroyed = function () {
		        return !this._src;
		    };
		    PartialImageAsset.prototype.asSurface = function () {
		        if (this._surface)
		            return this._surface;
		        var _a = this._slice, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
		        var surface = this._resourceFactory.createSurface(width, height);
		        var r = surface.renderer();
		        r.begin();
		        r.drawImage(this._src.asSurface(), x, y, width, height, 0, 0);
		        r.end();
		        this._surface = surface;
		        return surface;
		    };
		    /**
		     * @private
		     */
		    PartialImageAsset.prototype._load = function (loader) {
		        this._loadHandler = loader;
		        this._src._load(this);
		    };
		    /**
		     * this._src 用のロードハンドラ。
		     * @private
		     */
		    PartialImageAsset.prototype._onAssetLoad = function (_asset) {
		        this._loadHandler._onAssetLoad(this);
		    };
		    /**
		     * this._src 用のロードエラーハンドラ。
		     * @private
		     */
		    PartialImageAsset.prototype._onAssetError = function (_asset, error) {
		        this._loadHandler._onAssetError(this, error);
		    };
		    /**
		     * @private
		     */
		    PartialImageAsset.prototype._assetPathFilter = function (path) {
		        return path;
		    };
		    return PartialImageAsset;
		}());
		PartialImageAsset.PartialImageAsset = PartialImageAsset$1;
		
		return PartialImageAsset;
	}

	var hasRequiredAssetManager;

	function requireAssetManager () {
		if (hasRequiredAssetManager) return AssetManager;
		hasRequiredAssetManager = 1;
		Object.defineProperty(AssetManager, "__esModule", { value: true });
		AssetManager.AssetManager = void 0;
		var EmptyBinaryAsset_1 = requireEmptyBinaryAsset();
		var EmptyGeneratedVectorImageAsset_1 = requireEmptyGeneratedVectorImageAsset();
		var EmptyVectorImageAsset_1 = requireEmptyVectorImageAsset();
		var PartialImageAsset_1 = requirePartialImageAsset();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var VideoSystem_1 = requireVideoSystem();
		/**
		 * @ignore
		 */
		var AssetLoadingInfo = /** @class */ (function () {
		    function AssetLoadingInfo(asset, handler) {
		        this.asset = asset;
		        this.handlers = [handler];
		        this.errorCount = 0;
		        this.loading = false;
		    }
		    return AssetLoadingInfo;
		}());
		function normalizeAudioSystemConfMap(confMap) {
		    if (confMap === void 0) { confMap = {}; }
		    var systemDefaults = {
		        music: {
		            loop: true,
		            hint: { streaming: true }
		        },
		        sound: {
		            loop: false,
		            hint: { streaming: false }
		        }
		    };
		    for (var key in systemDefaults) {
		        if (!(key in confMap)) {
		            confMap[key] = systemDefaults[key];
		        }
		    }
		    return confMap;
		}
		function normalizeCommonArea(area) {
		    return Array.isArray(area) ? { x: area[0], y: area[1], width: area[2], height: area[3] } : area;
		}
		/**
		 * パスパターンを関数に変換する。
		 *
		 * パスパターンは、パス文字列、または0個以上の `**`, `*`, `?` を含むパス文字列である。
		 * (実装の単純化のため、いわゆる glob のうちよく使われそうなものだけをサポートしている。)
		 * 詳細は `AssetAccessor#getAllImages()` の仕様を参照のこと。
		 *
		 * 戻り値は、文字列一つを受け取り、パターンにマッチするか否かを返す関数。
		 *
		 * @param pattern パターン文字列
		 */
		function patternToFilter(pattern) {
		    var parserRe = /([^\*\\\?]*)(\\\*|\\\?|\?|\*(?!\*)|\*\*\/|$)/g;
		    //                [----A-----][--------------B---------------]
		    // A: パターンの特殊文字でない文字の塊。そのままマッチさせる(ためにエスケープして正規表現にする)
		    // B: パターンの特殊文字一つ(*, ** など)かそのエスケープ。patternSpecialsTable で対応する正規表現に変換
		    var patternSpecialsTable = {
		        "": "",
		        "\\*": "\\*",
		        "\\?": "\\?",
		        "*": "[^/]*",
		        "?": "[^/]",
		        "**/": "(?:^/)?(?:[^/]+/)*"
		        //      [--C--][----D----]
		        // C: 行頭の `/` (行頭でなければないので ? つき)
		        // D: ディレクトリ一つ分(e.g. "foo/")が0回以上
		    };
		    var regExpSpecialsRe = /[\\^$.*+?()[\]{}|]/g;
		    function escapeRegExp(s) {
		        return s.replace(regExpSpecialsRe, "\\$&");
		    }
		    var code = "";
		    for (var match = parserRe.exec(pattern); match && match[0] !== ""; match = parserRe.exec(pattern)) {
		        code += escapeRegExp(match[1]) + patternSpecialsTable[match[2]];
		    }
		    var re = new RegExp("^" + code + "$");
		    return function (path) { return re.test(path); };
		}
		/**
		 * `Asset` を管理するクラス。
		 *
		 * このクラスのインスタンスは `Game` に一つデフォルトで存在する(デフォルトアセットマネージャ)。
		 * デフォルトアセットマネージャは、game.json に記述された通常のアセットを読み込むために利用される。
		 *
		 * ゲーム開発者は、game.json に記述のないリソースを取得するために、このクラスのインスタンスを独自に生成してよい。
		 */
		var AssetManager$1 = /** @class */ (function () {
		    /**
		     * `AssetManager` のインスタンスを生成する。
		     *
		     * @param gameParams このインスタンスが属するゲーム。
		     * @param conf このアセットマネージャに与えるアセット定義。game.json の `"assets"` に相当。
		     * @param audioSystemConfMap このアセットマネージャに与えるオーディオシステムの宣言。
		     * @param moduleMainScripts このアセットマネージャに与える require() 解決用のエントリポイント。
		     */
		    function AssetManager(gameParams, conf, audioSystemConfMap, moduleMainScripts) {
		        this._resourceFactory = gameParams.resourceFactory;
		        this._audioSystemManager = gameParams.audio;
		        this._defaultAudioSystemId = gameParams.defaultAudioSystemId;
		        this._audioSystemConfMap = normalizeAudioSystemConfMap(audioSystemConfMap);
		        this.configuration = this._normalize(conf || {});
		        this._assets = {};
		        this._virtualPathToIdTable = {};
		        this._liveAssetVirtualPathTable = {};
		        this._liveAssetPathTable = {};
		        this._moduleMainScripts = moduleMainScripts ? moduleMainScripts : {};
		        this._refCounts = {};
		        this._loadings = {};
		        this._generatedAssetCount = 0;
		        var assetIds = Object.keys(this.configuration);
		        for (var i = 0; i < assetIds.length; ++i) {
		            var assetId = assetIds[i];
		            var conf_1 = this.configuration[assetId];
		            this._virtualPathToIdTable[conf_1.virtualPath] = assetId; // virtualPath の存在は _normalize() で確認済みのため 非 null アサーションとする
		        }
		    }
		    /**
		     * このインスタンスを破棄する。
		     */
		    AssetManager.prototype.destroy = function () {
		        var assetIds = Object.keys(this._refCounts);
		        for (var i = 0; i < assetIds.length; ++i) {
		            this._releaseAsset(assetIds[i]);
		        }
		        this.configuration = undefined;
		        this._assets = undefined;
		        this._liveAssetVirtualPathTable = undefined;
		        this._liveAssetPathTable = undefined;
		        this._refCounts = undefined;
		        this._loadings = undefined;
		    };
		    /**
		     * このインスタンスが破棄済みであるかどうかを返す。
		     */
		    AssetManager.prototype.destroyed = function () {
		        return this._assets === undefined;
		    };
		    /**
		     * `Asset` の読み込みを再試行する。
		     *
		     * 引数 `asset` は読み込みの失敗が (`Scene#assetLoadFail` で) 通知されたアセットでなければならない。
		     * @param asset 読み込みを再試行するアセット
		     */
		    AssetManager.prototype.retryLoad = function (asset) {
		        if (!this._loadings.hasOwnProperty(asset.id))
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#retryLoad: invalid argument.");
		        var loadingInfo = this._loadings[asset.id];
		        if (loadingInfo.errorCount > AssetManager.MAX_ERROR_COUNT) {
		            // DynamicAsset はエラーが規定回数超えた場合は例外にせず諦める。
		            if (!this.configuration[asset.id])
		                return;
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#retryLoad: too many retrying.");
		        }
		        if (!loadingInfo.loading) {
		            loadingInfo.loading = true;
		            asset._load(this);
		        }
		    };
		    /**
		     * グローバルアセットのIDを全て返す。
		     */
		    AssetManager.prototype.globalAssetIds = function () {
		        var ret = [];
		        var conf = this.configuration;
		        for (var p in conf) {
		            if (!conf.hasOwnProperty(p))
		                continue;
		            if (conf[p].global)
		                ret.push(p);
		        }
		        return ret;
		    };
		    /**
		     * プリロードすべきスクリプトアセットのIDを全て返す。
		     */
		    AssetManager.prototype.preloadScriptAssetIds = function () {
		        return Object.entries(this.configuration)
		            .filter(function (_a) {
		            var conf = _a[1];
		            return conf.type === "script" && conf.global && conf.preload;
		        })
		            .map(function (_a) {
		            var assetId = _a[0];
		            return assetId;
		        });
		    };
		    /**
		     * パターンまたはフィルタに合致するパスを持つアセットIDを全て返す。
		     *
		     * 戻り値は読み込み済みでないアセットのIDを含むことに注意。
		     * 読み込み済みのアセットにアクセスする場合は、 `peekAllLiveAssetsByPattern()` を利用すること。
		     *
		     * @param patternOrFilters パターンまたはフィルタ。仕様は `AssetAccessor#getAllImages()` を参照
		     */
		    AssetManager.prototype.resolvePatternsToAssetIds = function (patternOrFilters) {
		        if (patternOrFilters.length === 0)
		            return [];
		        var vpaths = Object.keys(this._virtualPathToIdTable);
		        var ret = [];
		        for (var i = 0; i < patternOrFilters.length; ++i) {
		            var patternOrFilter = patternOrFilters[i];
		            var filter = typeof patternOrFilter === "string" ? patternToFilter(this._replaceModulePathToAbsolute(patternOrFilter)) : patternOrFilter;
		            for (var j = 0; j < vpaths.length; ++j) {
		                var vpath = vpaths[j];
		                var accessorPath = "/" + vpath; // virtualPath に "/" を足すと accessorPath という仕様
		                if (filter(accessorPath))
		                    ret.push(this._virtualPathToIdTable[vpath]);
		            }
		        }
		        return ret;
		    };
		    /**
		     * アセットの取得を要求する。
		     *
		     * 要求したアセットが読み込み済みでない場合、読み込みが行われる。
		     * 取得した結果は `handler` を通して通知される。
		     * ゲーム開発者はこのメソッドを呼び出してアセットを取得した場合、
		     * 同じアセットID(または取得したアセット)で `unrefAsset()` を呼び出さなければならない。
		     *
		     * @param assetIdOrConf 要求するアセットのIDまたは設定
		     * @param handler 要求結果を受け取るハンドラ
		     */
		    AssetManager.prototype.requestAsset = function (assetIdOrConf, handler) {
		        var assetId;
		        if (typeof assetIdOrConf === "string") {
		            assetId = assetIdOrConf;
		        }
		        else if ("uri" in assetIdOrConf) {
		            assetId = assetIdOrConf.id;
		            assetIdOrConf = this._normalizeAssetBaseDeclaration(assetId, Object.create(assetIdOrConf));
		        }
		        else {
		            // TODO: ノーマライズ処理を _normalizeAssetBaseDeclaration() に統合すべき
		            assetId = assetIdOrConf.id;
		        }
		        var waiting = false;
		        var loadingInfo;
		        if (this._assets.hasOwnProperty(assetId)) {
		            ++this._refCounts[assetId];
		            handler._onAssetLoad(this._assets[assetId]);
		        }
		        else if (this._loadings.hasOwnProperty(assetId)) {
		            loadingInfo = this._loadings[assetId];
		            loadingInfo.handlers.push(handler);
		            ++this._refCounts[assetId];
		            waiting = true;
		        }
		        else {
		            var system = this._getAudioSystem(assetIdOrConf);
		            var audioAsset = system === null || system === void 0 ? void 0 : system.getDestroyRequestedAsset(assetId);
		            if (system && audioAsset) {
		                system.cancelRequestDestroy(audioAsset);
		                this._addAssetToTables(audioAsset);
		                this._refCounts[assetId] = 1;
		                handler._onAssetLoad(audioAsset);
		            }
		            else {
		                var a = this._createAssetFor(assetIdOrConf);
		                loadingInfo = new AssetLoadingInfo(a, handler);
		                this._loadings[assetId] = loadingInfo;
		                this._refCounts[assetId] = 1;
		                waiting = true;
		                loadingInfo.loading = true;
		                a._load(this);
		            }
		        }
		        return waiting;
		    };
		    /**
		     * アセットの参照カウントを減らす。
		     * 引数の各要素で `unrefAsset()` を呼び出す。
		     *
		     * @param assetOrId 参照カウントを減らすアセットまたはアセットID
		     */
		    AssetManager.prototype.unrefAsset = function (assetOrId) {
		        var assetId = typeof assetOrId === "string" ? assetOrId : assetOrId.id;
		        if (--this._refCounts[assetId] > 0)
		            return;
		        this._releaseAsset(assetId);
		    };
		    /**
		     * 複数のアセットの取得を要求する。
		     * 引数の各要素で `requestAsset()` を呼び出す。
		     *
		     * @param assetIdOrConfs 取得するアセットのIDまたはアセット定義
		     * @param handler 取得の結果を受け取るハンドラ
		     */
		    AssetManager.prototype.requestAssets = function (assetIdOrConfs, handler) {
		        var waitingCount = 0;
		        for (var i = 0, len = assetIdOrConfs.length; i < len; ++i) {
		            if (this.requestAsset(assetIdOrConfs[i], handler)) {
		                ++waitingCount;
		            }
		        }
		        return waitingCount;
		    };
		    /**
		     * 複数のアセットを解放する。
		     * 引数の各要素で `unrefAsset()` を呼び出す。
		     *
		     * @param assetOrIds 参照カウントを減らすアセットまたはアセットID
		     * @private
		     */
		    AssetManager.prototype.unrefAssets = function (assetOrIds) {
		        for (var i = 0, len = assetOrIds.length; i < len; ++i) {
		            this.unrefAsset(assetOrIds[i]);
		        }
		    };
		    /**
		     * アクセッサパスで指定された読み込み済みのアセットを返す。
		     *
		     * ここでアクセッサパスとは、 `AssetAccessor` が使うパス
		     * (game.jsonのディレクトリをルート (`/`) とする、 `/` 区切りの絶対パス形式の仮想パス)である。
		     * これは `/` を除けばアセットの仮想パス (virtualPath) と同一である。
		     *
		     * @param accessorPath 取得するアセットのアクセッサパス
		     * @param type 取得するアセットのタイプ。対象のアセットと合致しない場合、エラー
		     */
		    AssetManager.prototype.peekLiveAssetByAccessorPath = function (accessorPath, type) {
		        accessorPath = this._replaceModulePathToAbsolute(accessorPath);
		        if (accessorPath[0] !== "/")
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#peekLiveAssetByAccessorPath(): accessorPath must start with '/'");
		        var vpath = accessorPath.slice(1); // accessorPath から "/" を削ると virtualPath という仕様
		        var asset = this._liveAssetVirtualPathTable[vpath];
		        if (!asset || type !== asset.type)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#peekLiveAssetByAccessorPath(): No ".concat(type, " asset for ").concat(accessorPath));
		        return asset; // asset.typeを直前で確認しているので確実にTになるが、型推論できないのでキャストする
		    };
		    /**
		     * アセットIDで指定された読み込み済みのアセットを返す。
		     *
		     * @param assetId 取得するアセットのID
		     * @param type 取得するアセットのタイプ。対象のアセットと合致しない場合、エラー
		     */
		    AssetManager.prototype.peekLiveAssetById = function (assetId, type) {
		        var asset = this._assets[assetId];
		        if (!asset || type !== asset.type)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#peekLiveAssetById(): No ".concat(type, " asset for id ").concat(assetId));
		        return asset; // asset.typeを直前で確認しているので確実にTになるが、型推論できないのでキャストする
		    };
		    /**
		     * パターンまたはフィルタにマッチするパスを持つ、指定されたタイプの全読み込み済みアセットを返す。
		     *
		     * 戻り値の要素の順序は保証されない。
		     * パターンとフィルタについては `AssetAccessor#getAllImages()` の仕様を参照のこと。
		     *
		     * @param patternOrFilter 取得するアセットのパスパターンまたはフィルタ
		     * @param type 取得するアセットのタイプ。 null の場合、全てのタイプとして扱われる。
		     */
		    AssetManager.prototype.peekAllLiveAssetsByPattern = function (patternOrFilter, type) {
		        var vpaths = Object.keys(this._liveAssetVirtualPathTable);
		        var filter = typeof patternOrFilter === "string" ? patternToFilter(this._replaceModulePathToAbsolute(patternOrFilter)) : patternOrFilter;
		        var ret = [];
		        for (var i = 0; i < vpaths.length; ++i) {
		            var vpath = vpaths[i];
		            var asset = this._liveAssetVirtualPathTable[vpath];
		            if (type && asset.type !== type)
		                continue;
		            var accessorPath = "/" + vpath; // virtualPath に "/" を足すと accessorPath という仕様
		            // typeがT["type"]であればasset.typeを直前で確認しているので確実にTになるが、typeがnullの時にassetがTではない可能性がある
		            if (filter(accessorPath))
		                ret.push(asset);
		        }
		        return ret;
		    };
		    /**
		     * @ignore
		     */
		    AssetManager.prototype._normalize = function (configuration) {
		        var ret = {};
		        if (!(configuration instanceof Object))
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: invalid arguments.");
		        for (var p in configuration) {
		            if (!configuration.hasOwnProperty(p))
		                continue;
		            var conf = this._normalizeAssetBaseDeclaration(p, Object.create(configuration[p]));
		            if (!conf.path) {
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: No path given for: " + p);
		            }
		            if (!conf.virtualPath) {
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: No virtualPath given for: " + p);
		            }
		            if (!conf.global)
		                conf.global = false;
		            ret[p] = conf;
		        }
		        return ret;
		    };
		    /**
		     * @private
		     * @ignore
		     */
		    AssetManager.prototype._normalizeAssetBaseDeclaration = function (assetId, conf) {
		        if (!conf.type) {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: No type given for: " + assetId);
		        }
		        if (conf.type === "image") {
		            if (typeof conf.width !== "number")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong width given for the image asset: " + assetId);
		            if (typeof conf.height !== "number")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong height given for the image asset: " + assetId);
		            conf.slice = conf.slice ? normalizeCommonArea(conf.slice) : undefined;
		        }
		        if (conf.type === "audio") {
		            // durationというメンバは後から追加したため、古いgame.jsonではundefinedになる場合がある
		            if (conf.duration === undefined)
		                conf.duration = 0;
		            var audioSystemConf = this._audioSystemConfMap[conf.systemId];
		            if (conf.loop === undefined) {
		                conf.loop = !!audioSystemConf && !!audioSystemConf.loop;
		            }
		            if (conf.hint === undefined) {
		                conf.hint = audioSystemConf ? audioSystemConf.hint : {};
		            }
		            if (conf.systemId !== "music" && conf.systemId !== "sound") {
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong systemId given for the audio asset: " + assetId);
		            }
		        }
		        if (conf.type === "video") {
		            if (!conf.useRealSize) {
		                if (typeof conf.width !== "number")
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong width given for the video asset: " + assetId);
		                if (typeof conf.height !== "number")
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong height given for the video asset: " + assetId);
		                conf.useRealSize = false;
		            }
		        }
		        if (conf.type === "vector-image") {
		            if (typeof conf.width !== "number")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong width given for the vector-image asset: " + assetId);
		            if (typeof conf.height !== "number")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_normalize: wrong height given for the vector-image asset: " + assetId);
		        }
		        return conf;
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._createAssetFor = function (idOrConf) {
		        var _a;
		        var id;
		        var uri;
		        var conf;
		        if (typeof idOrConf === "string") {
		            id = idOrConf;
		            conf = this.configuration[id];
		            uri = this.configuration[id].path;
		        }
		        else if ("uri" in idOrConf) {
		            id = idOrConf.id;
		            conf = idOrConf;
		            uri = idOrConf.uri;
		        }
		        else {
		            return this._createGeneratedAssetFor(idOrConf);
		        }
		        var resourceFactory = this._resourceFactory;
		        if (!conf)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_createAssetFor: unknown asset ID: " + id);
		        var type = conf.type;
		        switch (type) {
		            case "image":
		                // _normalize() で conf.slice を CommonArea | undefined にしているので本来は不要な分岐だが、型の担保のためにチェックを行う
		                if (Array.isArray(conf.slice)) {
		                    throw new Error("AssetManager#_createAssetFor: array type of configuration.slice is not yet supported");
		                }
		                var asset = conf.slice
		                    ? new PartialImageAsset_1.PartialImageAsset(resourceFactory, id, uri, conf.width, conf.height, conf.slice)
		                    : resourceFactory.createImageAsset(id, uri, conf.width, conf.height);
		                asset.initialize(conf.hint);
		                return asset;
		            case "audio":
		                var system = conf.systemId
		                    ? this._audioSystemManager[conf.systemId]
		                    : this._audioSystemManager[this._defaultAudioSystemId];
		                return resourceFactory.createAudioAsset(id, uri, conf.duration, system, !!conf.loop, (_a = conf.hint) !== null && _a !== void 0 ? _a : {}, conf.offset);
		            case "text":
		                return resourceFactory.createTextAsset(id, uri);
		            case "script":
		                return resourceFactory.createScriptAsset(id, uri, conf.exports);
		            case "video":
		                // VideoSystemはまだ中身が定義されていなが、将来のためにVideoAssetにVideoSystemを渡すという体裁だけが整えられている。
		                // 以上を踏まえ、ここでは簡単のために都度新たなVideoSystemインスタンスを生成している。
		                var videoSystem = new VideoSystem_1.VideoSystem();
		                return resourceFactory.createVideoAsset(id, uri, conf.width, conf.height, videoSystem, !!conf.loop, !!conf.useRealSize);
		            case "vector-image":
		                if (!resourceFactory.createVectorImageAsset) {
		                    return new EmptyVectorImageAsset_1.EmptyVectorImageAsset(id, uri, conf.width, conf.height, conf.hint);
		                }
		                return resourceFactory.createVectorImageAsset(id, uri, conf.width, conf.height, conf.hint);
		            case "binary":
		                if (!resourceFactory.createBinaryAsset) {
		                    return new EmptyBinaryAsset_1.EmptyBinaryAsset(id, uri);
		                }
		                return resourceFactory.createBinaryAsset(id, uri);
		            default:
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssertionError#_createAssetFor: unknown asset type " + type + " for asset ID: " + id);
		        }
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._createGeneratedAssetFor = function (conf) {
		        var resourceFactory = this._resourceFactory;
		        var path = "%akashic%/generated-asset-".concat(this._generatedAssetCount++);
		        switch (conf.type) {
		            case "vector-image":
		                if (!resourceFactory.createVectorImageAssetFromString) {
		                    return new EmptyGeneratedVectorImageAsset_1.EmptyGeneratedVectorImageAsset(conf.id, path, conf.data);
		                }
		                return resourceFactory.createVectorImageAssetFromString(conf.id, path, conf.data);
		            default:
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssertionError#_createFromAssetGenerationFor: unsupported asset type ".concat(conf.type, " for asset ID: ").concat(conf.id));
		        }
		    };
		    /**
		     * @ignore
		     */
		    AssetManager.prototype._releaseAsset = function (assetId) {
		        var asset = this._assets[assetId] || (this._loadings[assetId] && this._loadings[assetId].asset);
		        var path = null;
		        if (asset) {
		            path = asset.path;
		            if (asset.inUse()) {
		                if (asset.type === "audio") {
		                    asset._system.requestDestroy(asset);
		                }
		                else if (asset.type === "video") {
		                    // NOTE: 一旦再生完了を待たずに破棄することにする
		                    // TODO: 再生中の動画を破棄するタイミングをどのように扱うか検討し実装
		                    asset.destroy();
		                }
		                else {
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#unrefAssets: Unsupported in-use " + asset.id);
		                }
		            }
		            else {
		                asset.destroy();
		            }
		        }
		        delete this._refCounts[assetId];
		        delete this._loadings[assetId];
		        delete this._assets[assetId];
		        if (this.configuration[assetId]) {
		            var virtualPath = this.configuration[assetId].virtualPath;
		            if (virtualPath && this._liveAssetVirtualPathTable.hasOwnProperty(virtualPath))
		                delete this._liveAssetVirtualPathTable[virtualPath];
		            if (path && this._liveAssetPathTable.hasOwnProperty(path))
		                delete this._liveAssetPathTable[path];
		        }
		    };
		    /**
		     * 現在ロード中のアセットの数。(デバッグ用; 直接の用途はない)
		     * @private
		     */
		    AssetManager.prototype._countLoadingAsset = function () {
		        return Object.keys(this._loadings).length;
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._onAssetError = function (asset, error) {
		        // ロード中に Scene が破棄されていた場合などで、asset が破棄済みになることがある
		        if (this.destroyed() || asset.destroyed())
		            return;
		        var loadingInfo = this._loadings[asset.id];
		        var hs = loadingInfo.handlers;
		        loadingInfo.loading = false;
		        ++loadingInfo.errorCount;
		        if (loadingInfo.errorCount > AssetManager.MAX_ERROR_COUNT && error.retriable) {
		            error = ExceptionFactory_1.ExceptionFactory.createAssetLoadError("Retry limit exceeded", false, null, error);
		        }
		        if (!error.retriable)
		            delete this._loadings[asset.id];
		        for (var i = 0; i < hs.length; ++i)
		            hs[i]._onAssetError(asset, error, this.retryLoad.bind(this));
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._onAssetLoad = function (asset) {
		        // ロード中に Scene が破棄されていた場合などで、asset が破棄済みになることがある
		        if (this.destroyed() || asset.destroyed())
		            return;
		        var loadingInfo = this._loadings[asset.id];
		        loadingInfo.loading = false;
		        delete this._loadings[asset.id];
		        this._addAssetToTables(asset);
		        var hs = loadingInfo.handlers;
		        for (var i = 0; i < hs.length; ++i)
		            hs[i]._onAssetLoad(asset);
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._replaceModulePathToAbsolute = function (accessorPath) {
		        if (accessorPath[0] === "/" ||
		            accessorPath[0] === "*" // パスに `**/*` が指定された場合
		        ) {
		            return accessorPath;
		        }
		        for (var moduleName in this._moduleMainScripts) {
		            if (!this._moduleMainScripts.hasOwnProperty(moduleName))
		                continue;
		            if (accessorPath.lastIndexOf(moduleName, 0) === 0) {
		                return "/node_modules/" + accessorPath;
		            }
		        }
		        return accessorPath;
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._getAudioSystem = function (assetIdOrConf) {
		        var conf = null;
		        if (typeof assetIdOrConf === "string") {
		            conf = this.configuration[assetIdOrConf];
		        }
		        else if ("uri" in assetIdOrConf) {
		            var dynConf = assetIdOrConf;
		            conf = dynConf;
		        }
		        else ;
		        if (!conf) {
		            return null;
		        }
		        if (conf.type !== "audio") {
		            return null;
		        }
		        return conf.systemId ? this._audioSystemManager[conf.systemId] : this._audioSystemManager[this._defaultAudioSystemId];
		    };
		    /**
		     * @private
		     */
		    AssetManager.prototype._addAssetToTables = function (asset) {
		        this._assets[asset.id] = asset;
		        // DynamicAsset の場合は configuration に書かれていないので以下の判定が偽になる
		        if (this.configuration[asset.id]) {
		            var virtualPath = this.configuration[asset.id].virtualPath; // virtualPath の存在は _normalize() で確認済みのため 非 null アサーションとする
		            if (!this._liveAssetVirtualPathTable.hasOwnProperty(virtualPath)) {
		                this._liveAssetVirtualPathTable[virtualPath] = asset;
		            }
		            else {
		                if (this._liveAssetVirtualPathTable[virtualPath].path !== asset.path)
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AssetManager#_onAssetLoad(): duplicated asset path");
		            }
		            if (!this._liveAssetPathTable.hasOwnProperty(asset.path))
		                this._liveAssetPathTable[asset.path] = virtualPath;
		        }
		    };
		    AssetManager.MAX_ERROR_COUNT = 3;
		    return AssetManager;
		}());
		AssetManager.AssetManager = AssetManager$1;
		
		return AssetManager;
	}

	var AssetManagerLoadHandler = {};

	var hasRequiredAssetManagerLoadHandler;

	function requireAssetManagerLoadHandler () {
		if (hasRequiredAssetManagerLoadHandler) return AssetManagerLoadHandler;
		hasRequiredAssetManagerLoadHandler = 1;
		Object.defineProperty(AssetManagerLoadHandler, "__esModule", { value: true });
		
		return AssetManagerLoadHandler;
	}

	var AudioSystemManager = {};

	var hasRequiredAudioSystemManager;

	function requireAudioSystemManager () {
		if (hasRequiredAudioSystemManager) return AudioSystemManager;
		hasRequiredAudioSystemManager = 1;
		Object.defineProperty(AudioSystemManager, "__esModule", { value: true });
		AudioSystemManager.AudioSystemManager = void 0;
		var AudioSystem_1 = requireAudioSystem();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		/**
		 * `AudioSystem` の管理クラス。
		 *
		 * 複数の `AudioSystem` に一括で必要な状態設定を行う。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 */
		var AudioSystemManager$1 = /** @class */ (function () {
		    function AudioSystemManager(resourceFactory) {
		        /**
		         * @private
		         */
		        this._muted = false;
		        this._resourceFactory = resourceFactory;
		        this.music = new AudioSystem_1.MusicAudioSystem({
		            id: "music",
		            muted: this._muted,
		            resourceFactory: resourceFactory
		        });
		        this.sound = new AudioSystem_1.SoundAudioSystem({
		            id: "sound",
		            muted: this._muted,
		            resourceFactory: resourceFactory
		        });
		    }
		    /**
		     * 対象の音声アセットの AudioPlayContext を生成する。
		     *
		     * @param asset 音声アセット
		     */
		    AudioSystemManager.prototype.create = function (asset) {
		        if (asset._system.id === "music") {
		            return this.music.create(asset);
		        }
		        else if (asset._system.id === "sound") {
		            return this.sound.create(asset);
		        }
		        else {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AudioSystemManager#create(): unknown systemId \"".concat(asset._system.id, "\" for asset ID \"").concat(asset.id, "\""));
		        }
		    };
		    /**
		     * 対象の音声アセットの AudioPlayContext を生成し、再生する。
		     *
		     * @param asset 音声アセット
		     */
		    AudioSystemManager.prototype.play = function (asset) {
		        if (asset._system.id === "music") {
		            return this.music.play(asset);
		        }
		        else if (asset._system.id === "sound") {
		            return this.sound.play(asset);
		        }
		        else {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("AudioSystemManager#play(): unknown systemId \"".concat(asset._system.id, "\" for asset ID \"").concat(asset.id, "\""));
		        }
		    };
		    /**
		     * @private
		     */
		    AudioSystemManager.prototype._reset = function () {
		        this._muted = false;
		        this.music._reset();
		        this.sound._reset();
		    };
		    /**
		     * @private
		     */
		    AudioSystemManager.prototype._setMuted = function (muted) {
		        if (this._muted === muted)
		            return;
		        this._muted = muted;
		        this.music._setMuted(muted);
		        this.sound._setMuted(muted);
		    };
		    /**
		     * @private
		     */
		    AudioSystemManager.prototype._setPlaybackRate = function (rate) {
		        this.music._setPlaybackRate(rate);
		        this.sound._setPlaybackRate(rate);
		    };
		    AudioSystemManager.prototype._startSuppress = function () {
		        this.music._startSuppress();
		        this.sound._startSuppress();
		    };
		    AudioSystemManager.prototype._endSuppress = function () {
		        this.music._endSuppress();
		        this.sound._endSuppress();
		    };
		    AudioSystemManager.prototype.stopAll = function () {
		        this.music.stopAll();
		        this.sound.stopAll();
		    };
		    return AudioSystemManager;
		}());
		AudioSystemManager.AudioSystemManager = AudioSystemManager$1;
		
		return AudioSystemManager;
	}

	var AudioUtil = {};

	var hasRequiredAudioUtil$1;

	function requireAudioUtil$1 () {
		if (hasRequiredAudioUtil$1) return AudioUtil;
		hasRequiredAudioUtil$1 = 1;
		Object.defineProperty(AudioUtil, "__esModule", { value: true });
		AudioUtil.AudioUtil = void 0;
		var Util_1 = requireUtil();
		/**
		 * linear のイージング関数。
		 */
		var linear = function (t, b, c, d) { return (c * t) / d + b; };
		/**
		 * Audio に関連するユーティリティ。
		 */
		var AudioUtil$1;
		(function (AudioUtil) {
		    /**
		     * 音声をフェードインさせる。
		     *
		     * @param game 対象の `Game`。
		     * @param context 対象の `AudioPlayContext` 。
		     * @param duration フェードインの長さ (ms)。
		     * @param to フェードイン後の音量。0 未満または 1 より大きい値を指定した場合の挙動は不定である。省略時は `1` 。
		     * @param easing イージング関数。省略時は linear 。
		     */
		    function fadeIn(game, context, duration, to, easing) {
		        if (to === void 0) { to = 1; }
		        if (easing === void 0) { easing = linear; }
		        context.changeVolume(0);
		        context.play();
		        var _a = transitionVolume(game, context, duration, to, easing), complete = _a.complete, cancel = _a.cancel;
		        return {
		            complete: function () {
		                complete();
		            },
		            cancel: function (revert) {
		                if (revert === void 0) { revert = false; }
		                cancel(revert);
		                if (revert) {
		                    context.stop();
		                }
		            }
		        };
		    }
		    AudioUtil.fadeIn = fadeIn;
		    /**
		     * 音声をフェードアウトさせる。
		     *
		     * @param game 対象の `Game`。
		     * @param context 対象の `AudioPlayContext` 。
		     * @param duration フェードアウトの長さ (ms)。
		     * @param easing イージング関数。省略時は linear が指定される。
		     */
		    function fadeOut(game, context, duration, easing) {
		        if (easing === void 0) { easing = linear; }
		        var _a = transitionVolume(game, context, duration, 0, easing), complete = _a.complete, cancel = _a.cancel;
		        return {
		            complete: function () {
		                complete();
		                context.stop();
		            },
		            cancel: function (revert) {
		                if (revert === void 0) { revert = false; }
		                cancel(revert);
		            }
		        };
		    }
		    AudioUtil.fadeOut = fadeOut;
		    /**
		     * 二つの音声をクロスフェードさせる。
		     *
		     * @param game 対象の `Game`。
		     * @param fadeInContext フェードイン対象の `AudioPlayContext` 。
		     * @param fadeOutContext フェードアウト対象の `AudioPlayContext` 。
		     * @param duration クロスフェードの長さ (ms)。
		     * @param to クロスフェード後の音量。0 未満または 1 より大きい値を指定した場合の挙動は不定。省略時は `1` 。
		     * @param easing イージング関数。フェードインとフェードアウトで共通であることに注意。省略時は linear が指定される。
		     */
		    function crossFade(game, fadeInContext, fadeOutContext, duration, to, easing) {
		        if (to === void 0) { to = 1; }
		        if (easing === void 0) { easing = linear; }
		        var fadeInFuncs = fadeIn(game, fadeInContext, duration, to, easing);
		        var fadeOutFuncs = fadeOut(game, fadeOutContext, duration, easing);
		        return {
		            complete: function () {
		                fadeInFuncs.complete();
		                fadeOutFuncs.complete();
		            },
		            cancel: function (revert) {
		                if (revert === void 0) { revert = false; }
		                fadeInFuncs.cancel(revert);
		                fadeOutFuncs.cancel(revert);
		            }
		        };
		    }
		    AudioUtil.crossFade = crossFade;
		    /**
		     * 音量を指定のイージングで遷移させる。
		     *
		     * @param game 対象の `Game`。
		     * @param context 対象の `AudioPlayContext` 。
		     * @param duration 遷移の長さ (ms)。
		     * @param to 遷移後の音量。0 未満または 1 より大きい値を指定した場合の挙動は不定。
		     * @param easing イージング関数。省略時は linear が指定される。
		     */
		    function transitionVolume(game, context, duration, to, easing) {
		        if (easing === void 0) { easing = linear; }
		        var frame = 1000 / game.fps;
		        var from = context.volume;
		        var elapsed = 0;
		        context.changeVolume(Util_1.Util.clamp(from, 0, 1));
		        var handler = function () {
		            elapsed += frame;
		            if (elapsed <= duration) {
		                var progress = easing(elapsed, from, to - from, duration);
		                context.changeVolume(Util_1.Util.clamp(progress, 0, 1));
		                return false;
		            }
		            else {
		                context.changeVolume(to);
		                return true;
		            }
		        };
		        var remove = function () {
		            if (game.onUpdate.contains(handler)) {
		                game.onUpdate.remove(handler);
		            }
		        };
		        game.onUpdate.add(handler);
		        return {
		            complete: function () {
		                remove();
		                context.changeVolume(to);
		            },
		            cancel: function (revert) {
		                remove();
		                if (revert) {
		                    context.changeVolume(from);
		                }
		            }
		        };
		    }
		    AudioUtil.transitionVolume = transitionVolume;
		})(AudioUtil$1 || (AudioUtil.AudioUtil = AudioUtil$1 = {}));
		
		return AudioUtil;
	}

	var BitmapFont = {};

	var Font = {};

	var hasRequiredFont;

	function requireFont () {
		if (hasRequiredFont) return Font;
		hasRequiredFont = 1;
		Object.defineProperty(Font, "__esModule", { value: true });
		Font.Font = void 0;
		var Util_1 = requireUtil();
		/**
		 * フォント。
		 */
		var Font$1 = /** @class */ (function () {
		    function Font() {
		    }
		    /**
		     * 対象の文字列を一行で描画した際の計測情報を返す。
		     *
		     * @param text 文字列
		     */
		    Font.prototype.measureText = function (text) {
		        var width = 0;
		        var actualBoundingBoxLeft = 0;
		        var actualBoundingBoxRight = 0;
		        var lastGlyph = null;
		        for (var i = 0; i < text.length; i++) {
		            var code = Util_1.Util.charCodeAt(text, i);
		            if (!code)
		                continue;
		            var glyph = this.glyphForCharacter(code);
		            if (!glyph || glyph.x < 0 || glyph.y < 0 || glyph.width < 0 || glyph.height < 0)
		                continue;
		            if (i === 0) {
		                actualBoundingBoxLeft = -glyph.offsetX;
		            }
		            lastGlyph = glyph;
		            width += glyph.advanceWidth;
		        }
		        if (lastGlyph) {
		            actualBoundingBoxRight = width + lastGlyph.offsetX + lastGlyph.width - lastGlyph.advanceWidth;
		        }
		        return {
		            width: width,
		            actualBoundingBoxLeft: actualBoundingBoxLeft,
		            actualBoundingBoxRight: actualBoundingBoxRight
		        };
		    };
		    return Font;
		}());
		Font.Font = Font$1;
		
		return Font;
	}

	var hasRequiredBitmapFont;

	function requireBitmapFont () {
		if (hasRequiredBitmapFont) return BitmapFont;
		hasRequiredBitmapFont = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(BitmapFont, "__esModule", { value: true });
		BitmapFont.BitmapFont = void 0;
		var Font_1 = requireFont();
		var SurfaceUtil_1 = requireSurfaceUtil();
		/**
		 * ラスタ画像によるフォント。
		 */
		var BitmapFont$1 = /** @class */ (function (_super) {
		    __extends(BitmapFont, _super);
		    /**
		     * 各種パラメータを指定して `BitmapFont` のインスタンスを生成する。
		     * @param param `BitmapFont` に設定するパラメータ
		     */
		    function BitmapFont(param) {
		        var _this = _super.call(this) || this;
		        // @ts-ignore
		        _this.surface = SurfaceUtil_1.SurfaceUtil.asSurface(param.src);
		        if (param.glyphInfo) {
		            _this.map = param.glyphInfo.map;
		            _this.defaultGlyphWidth = param.glyphInfo.width;
		            _this.defaultGlyphHeight = param.glyphInfo.height;
		            _this.missingGlyph = param.glyphInfo.missingGlyph;
		            _this.size = param.glyphInfo.height;
		        }
		        else {
		            _this.map = param.map || {};
		            _this.defaultGlyphWidth = param.defaultGlyphWidth || 0;
		            _this.defaultGlyphHeight = param.defaultGlyphHeight || 0;
		            _this.missingGlyph = param.missingGlyph;
		            _this.size = param.defaultGlyphHeight || 0;
		        }
		        return _this;
		    }
		    /**
		     * コードポイントに対応するグリフを返す。
		     * @param code コードポイント
		     */
		    BitmapFont.prototype.glyphForCharacter = function (code) {
		        var g = this.map[code] || this.missingGlyph;
		        if (!g) {
		            return null;
		        }
		        var w = g.width === undefined ? this.defaultGlyphWidth : g.width;
		        var h = g.height === undefined ? this.defaultGlyphHeight : g.height;
		        var offsetX = g.offsetX || 0;
		        var offsetY = g.offsetY || 0;
		        var advanceWidth = g.advanceWidth === undefined ? w : g.advanceWidth;
		        var surface = w === 0 || h === 0 ? undefined : this.surface;
		        return {
		            code: code,
		            x: g.x,
		            y: g.y,
		            width: w,
		            height: h,
		            surface: surface,
		            offsetX: offsetX,
		            offsetY: offsetY,
		            advanceWidth: advanceWidth,
		            isSurfaceValid: true,
		            _atlas: null
		        };
		    };
		    /**
		     * 利用している `Surface` を破棄した上で、このフォントを破棄する。
		     */
		    BitmapFont.prototype.destroy = function () {
		        if (this.surface && !this.surface.destroyed()) {
		            this.surface.destroy();
		        }
		        this.map = undefined;
		    };
		    /**
		     * 破棄されたオブジェクトかどうかを判定する。
		     */
		    BitmapFont.prototype.destroyed = function () {
		        // mapをfalsy値で作成された場合最初から破棄扱いになるが、仕様とする
		        return !this.map;
		    };
		    return BitmapFont;
		}(Font_1.Font));
		BitmapFont.BitmapFont = BitmapFont$1;
		
		return BitmapFont;
	}

	var Camera = {};

	var hasRequiredCamera;

	function requireCamera () {
		if (hasRequiredCamera) return Camera;
		hasRequiredCamera = 1;
		Object.defineProperty(Camera, "__esModule", { value: true });
		
		return Camera;
	}

	var Camera2D = {};

	var hasRequiredCamera2D;

	function requireCamera2D () {
		if (hasRequiredCamera2D) return Camera2D;
		hasRequiredCamera2D = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(Camera2D, "__esModule", { value: true });
		Camera2D.Camera2D = void 0;
		var Object2D_1 = requireObject2D();
		/**
		 * 2D世界におけるカメラ。
		 */
		var Camera2D$1 = /** @class */ (function (_super) {
		    __extends(Camera2D, _super);
		    /**
		     * 指定されたパラメータで `Camera2D` のインスタンスを生成する。
		     * @param param 初期化に用いるパラメータのオブジェクト
		     */
		    function Camera2D(param) {
		        var _this = _super.call(this, param) || this;
		        _this.local = !!param.local;
		        _this.name = param.name;
		        _this._modifiedCount = 0;
		        return _this;
		    }
		    /**
		     * 与えられたシリアリゼーションでカメラを復元する。
		     *
		     * @param ser `Camera2D#serialize()` の戻り値
		     */
		    Camera2D.deserialize = function (ser) {
		        var s = ser;
		        var ret = new Camera2D(s.param);
		        return ret;
		    };
		    /**
		     * カメラ状態の変更をエンジンに通知する。
		     *
		     * このメソッドの呼び出し後、このカメラのプロパティに対する変更が各 `Renderer` の描画に反映される。
		     * ただし逆は真ではない。すなわち、再描画は他の要因によって行われることもある。
		     * ゲーム開発者は、このメソッドを呼び出していないことをもって再描画が行われていないことを仮定してはならない。
		     *
		     * 本メソッドは、このオブジェクトの `Object2D` 由来のプロパティ (`x`, `y`, `angle` など) を変更した場合にも呼びだす必要がある。
		     */
		    Camera2D.prototype.modified = function () {
		        this._modifiedCount = (this._modifiedCount + 1) % 32768;
		        if (this._matrix)
		            this._matrix._modified = true;
		    };
		    /**
		     * このカメラをシリアライズする。
		     *
		     * このメソッドの戻り値を `Camera2D#deserialize()` に渡すことで同じ値を持つカメラを復元することができる。
		     */
		    Camera2D.prototype.serialize = function () {
		        var ser = {
		            param: {
		                local: this.local,
		                name: this.name,
		                x: this.x,
		                y: this.y,
		                width: this.width,
		                height: this.height,
		                opacity: this.opacity,
		                scaleX: this.scaleX,
		                scaleY: this.scaleY,
		                angle: this.angle,
		                anchorX: this.anchorX,
		                anchorY: this.anchorY,
		                compositeOperation: this.compositeOperation
		            }
		        };
		        return ser;
		    };
		    /**
		     * @private
		     */
		    Camera2D.prototype._applyTransformToRenderer = function (renderer) {
		        if (this.angle || this.scaleX !== 1 || this.scaleY !== 1 || this.anchorX !== 0 || this.anchorY !== 0) {
		            // Note: this.scaleX/scaleYが0の場合描画した結果何も表示されない事になるが、特殊扱いはしない
		            renderer.transform(this.getMatrix()._matrix);
		        }
		        else {
		            renderer.translate(-this.x, -this.y);
		        }
		        if (this.opacity !== 1)
		            renderer.opacity(this.opacity);
		    };
		    /**
		     * @private
		     */
		    Camera2D.prototype._updateMatrix = function () {
		        if (!this._matrix)
		            return;
		        // カメラの angle, x, y はエンティティと逆方向に作用することに注意。
		        if (this.angle || this.scaleX !== 1 || this.scaleY !== 1 || this.anchorX !== 0 || this.anchorY !== 0) {
		            this._matrix.updateByInverse(this.width, this.height, this.scaleX, this.scaleY, this.angle, this.x, this.y, this.anchorX, this.anchorY);
		        }
		        else {
		            this._matrix.reset(-this.x, -this.y);
		        }
		    };
		    return Camera2D;
		}(Object2D_1.Object2D));
		Camera2D.Camera2D = Camera2D$1;
		
		return Camera2D;
	}

	var Collision = {};

	var hasRequiredCollision;

	function requireCollision () {
		if (hasRequiredCollision) return Collision;
		hasRequiredCollision = 1;
		Object.defineProperty(Collision, "__esModule", { value: true });
		Collision.Collision = void 0;
		var Util_1 = requireUtil();
		// 外積の絶対値
		function absCross(v1, v2) {
		    return v1.x * v2.y - v1.y * v2.x;
		}
		// 二次元ベクトルの減算
		function sub(v1, v2) {
		    return { x: v1.x - v2.x, y: v1.y - v2.y };
		}
		/**
		 * オブジェクトなどの衝突判定機能を提供する。
		 */
		var Collision$1;
		(function (Collision) {
		    /**
		     * 二つのエンティティの衝突判定を行い、その結果を返す。
		     *
		     * 回転・拡大されたエンティティや、親の異なるエンティティ同士も扱える汎用の衝突判定処理。
		     * ただし計算量が多いので、大量のエンティティ間のすべての衝突を確認するような状況では利用を避けることが望ましい。
		     * 親が同じで回転・拡大を行わないエンティティ同士の場合は、より軽量な Collision.intersectAreas() を利用すること。
		     * 親が同じで中心座標同士の距離だけで判定してよい場合は、より軽量な Collision.withinAreas() を利用すること。
		     *
		     * 対象のエンティティの座標や大きさなどを変更した場合、
		     * この関数の呼び出し前にそのエンティティの modified() を呼び出しておく必要がある。
		     *
		     * @param e1 衝突判定するエンティティ
		     * @param e2 衝突判定するエンティティ
		     * @param area1 e1 の当たり判定領域。省略された場合、`{ x: 0, y: 0, width: e1.width, hegiht: e1.height }`
		     * @param area2 e2 の当たり判定領域。省略された場合、`{ x: 0, y: 0, width: e2.width, hegiht: e2.height }`
		     */
		    function intersectEntities(e1, e2, area1, area2) {
		        var lca = e1._findLowestCommonAncestorWith(e2);
		        if (!lca)
		            return false;
		        var r1 = area1
		            ? { left: area1.x, top: area1.y, right: area1.x + area1.width, bottom: area1.y + area1.height }
		            : { left: 0, top: 0, right: e1.width, bottom: e1.height };
		        var r2 = area2
		            ? { left: area2.x, top: area2.y, right: area2.x + area2.width, bottom: area2.y + area2.height }
		            : { left: 0, top: 0, right: e2.width, bottom: e2.height };
		        var mat1 = e1._calculateMatrixTo(lca);
		        var mat2 = e2._calculateMatrixTo(lca);
		        // 座標系を合わせる: 共通祖先の座標系に合わせたそれぞれの四隅の点を求める。
		        var lt1 = mat1.multiplyPoint({ x: r1.left, y: r1.top });
		        var rt1 = mat1.multiplyPoint({ x: r1.right, y: r1.top });
		        var lb1 = mat1.multiplyPoint({ x: r1.left, y: r1.bottom });
		        var rb1 = mat1.multiplyPoint({ x: r1.right, y: r1.bottom });
		        var lt2 = mat2.multiplyPoint({ x: r2.left, y: r2.top });
		        var rt2 = mat2.multiplyPoint({ x: r2.right, y: r2.top });
		        var lb2 = mat2.multiplyPoint({ x: r2.left, y: r2.bottom });
		        var rb2 = mat2.multiplyPoint({ x: r2.right, y: r2.bottom });
		        // AABB で枝狩りする。(高速化だけでなく後続の条件を単純化するのにも必要である点に注意)
		        var minX1 = Math.min(lt1.x, rt1.x, lb1.x, rb1.x);
		        var maxX1 = Math.max(lt1.x, rt1.x, lb1.x, rb1.x);
		        var minX2 = Math.min(lt2.x, rt2.x, lb2.x, rb2.x);
		        var maxX2 = Math.max(lt2.x, rt2.x, lb2.x, rb2.x);
		        if (maxX1 < minX2 || maxX2 < minX1)
		            return false;
		        var minY1 = Math.min(lt1.y, rt1.y, lb1.y, rb1.y);
		        var maxY1 = Math.max(lt1.y, rt1.y, lb1.y, rb1.y);
		        var minY2 = Math.min(lt2.y, rt2.y, lb2.y, rb2.y);
		        var maxY2 = Math.max(lt2.y, rt2.y, lb2.y, rb2.y);
		        if (maxY1 < minY2 || maxY2 < minY1)
		            return false;
		        // 二つの四角形それぞれのいずれかの辺同士が交差するなら衝突している。
		        if (Collision.intersectLineSegments(lt1, rt1, lt2, rt2) ||
		            Collision.intersectLineSegments(lt1, rt1, rt2, rb2) ||
		            Collision.intersectLineSegments(lt1, rt1, rb2, lb2) ||
		            Collision.intersectLineSegments(lt1, rt1, lb2, lt2) ||
		            Collision.intersectLineSegments(rt1, rb1, lt2, rt2) ||
		            Collision.intersectLineSegments(rt1, rb1, rt2, rb2) ||
		            Collision.intersectLineSegments(rt1, rb1, rb2, lb2) ||
		            Collision.intersectLineSegments(rt1, rb1, lb2, lt2) ||
		            Collision.intersectLineSegments(rb1, lb1, lt2, rt2) ||
		            Collision.intersectLineSegments(rb1, lb1, rt2, rb2) ||
		            Collision.intersectLineSegments(rb1, lb1, rb2, lb2) ||
		            Collision.intersectLineSegments(rb1, lb1, lb2, lt2) ||
		            Collision.intersectLineSegments(lb1, lt1, lt2, rt2) ||
		            Collision.intersectLineSegments(lb1, lt1, rt2, rb2) ||
		            Collision.intersectLineSegments(lb1, lt1, rb2, lb2) ||
		            Collision.intersectLineSegments(lb1, lt1, lb2, lt2)) {
		            return true;
		        }
		        // そうでない場合、e1 が e2 を包含しているなら衝突している。
		        // ここで辺は交差していないので、e1 が e2 の頂点一つ (lt2) を包含しているなら、全体を包含している。
		        // cf. https://ksta.skr.jp/topic/diaryb09.html#040528 "各辺の内側判定による内外判定"
		        var s1 = absCross(sub(lt1, rt1), sub(lt2, rt1));
		        if (s1 * absCross(sub(lb1, lt1), sub(lt2, lt1)) >= 0 &&
		            s1 * absCross(sub(rb1, lb1), sub(lt2, lb1)) >= 0 &&
		            s1 * absCross(sub(rt1, rb1), sub(lt2, rb1)) >= 0) {
		            return true;
		        }
		        // そうでない場合、e2 が e1 を包含しているなら衝突している。
		        var s2 = absCross(sub(lt2, rt2), sub(lt1, rt2));
		        return (s2 * absCross(sub(lb2, lt2), sub(lt1, lt2)) >= 0 &&
		            s2 * absCross(sub(rb2, lb2), sub(lt1, lb2)) >= 0 &&
		            s2 * absCross(sub(rt2, rb2), sub(lt1, rb2)) >= 0);
		    }
		    Collision.intersectEntities = intersectEntities;
		    /**
		     * 線分同士の衝突判定 (交差判定) を行い、その結果を返す。
		     *
		     * @param {CommonOffset} p1 線分の端点の一つ
		     * @param {CommonOffset} p2 線分の端点の一つ
		     * @param {CommonOffset} q1 もう一つの線分の端点の一つ
		     * @param {CommonOffset} q2 もう一つの線分の端点の一つ
		     */
		    function intersectLineSegments(p1, p2, q1, q2) {
		        // cf. https://ksta.skr.jp/topic/diaryb09.html#040518
		        var p = sub(p2, p1);
		        var q = sub(q2, q1);
		        return (absCross(sub(q1, p1), p) * absCross(sub(q2, p1), p) <= 0 && absCross(sub(p1, q1), q) * absCross(sub(p2, q1), q) <= 0 // 符号が違うことを積の符号で判定している
		        );
		    }
		    Collision.intersectLineSegments = intersectLineSegments;
		    /**
		     * 矩形交差による衝突判定を行い、その結果を返す。
		     * 戻り値は、二つの矩形t1, t2が交差しているとき真、でなければ偽。
		     *
		     * @param {number} x1 t1のX座標
		     * @param {number} y1 t1のY座標
		     * @param {number} width1 t1の幅
		     * @param {number} height1 t1の高さ
		     * @param {number} x2 t2のX座標
		     * @param {number} y2 t2のY座標
		     * @param {number} width2 t2の幅
		     * @param {number} height2 t2の高さ
		     */
		    function intersect(x1, y1, width1, height1, x2, y2, width2, height2) {
		        return x1 <= x2 + width2 && x2 <= x1 + width1 && y1 <= y2 + height2 && y2 <= y1 + height1;
		    }
		    Collision.intersect = intersect;
		    /**
		     * 矩形交差による衝突判定を行い、その結果を返す。
		     * 戻り値は、矩形t1, t2が交差しているとき真、でなければ偽。
		     *
		     * 特に、回転・拡大を利用していない、親が同じエンティティ同士の衝突判定に利用することができる。
		     * 条件を満たさない場合は `withinAreas()` や、より重いが正確な `intersectEntities()` の利用を検討すること。
		     *
		     * @param {CommonArea} t1 矩形1
		     * @param {CommonArea} t2 矩形2
		     */
		    function intersectAreas(t1, t2) {
		        return Collision.intersect(t1.x, t1.y, t1.width, t1.height, t2.x, t2.y, t2.width, t2.height);
		    }
		    Collision.intersectAreas = intersectAreas;
		    /**
		     * 2点間の距離による衝突判定を行い、その結果を返す。
		     * 戻り値は、2点間の距離が閾値以内であるとき真、でなければ偽。
		     * @param {number} t1x 一点の X 座標
		     * @param {number} t1y 一点の Y 座標
		     * @param {number} t2x もう一点の X 座標
		     * @param {number} t2y もう一点の Y 座標
		     * @param {number} [distance=1] 衝突判定閾値 [pixel]
		     */
		    function within(t1x, t1y, t2x, t2y, distance) {
		        if (distance === void 0) { distance = 1; }
		        return distance >= Util_1.Util.distance(t1x, t1y, t2x, t2y);
		    }
		    Collision.within = within;
		    /**
		     * 2つの矩形の中心座標間距離による衝突判定を行い、その結果を返す。
		     * 戻り値は、2点間の距離が閾値以内であるとき真、でなければ偽。
		     * @param {CommonArea} t1 矩形1
		     * @param {CommonArea} t2 矩形2
		     * @param {number} [distance=1] 衝突判定閾値 [pixel]
		     */
		    function withinAreas(t1, t2, distance) {
		        if (distance === void 0) { distance = 1; }
		        return distance >= Util_1.Util.distanceBetweenAreas(t1, t2);
		    }
		    Collision.withinAreas = withinAreas;
		})(Collision$1 || (Collision.Collision = Collision$1 = {}));
		
		return Collision;
	}

	var DefaultLoadingScene = {};

	var CameraCancellingE = {};

	var hasRequiredCameraCancellingE;

	function requireCameraCancellingE () {
		if (hasRequiredCameraCancellingE) return CameraCancellingE;
		hasRequiredCameraCancellingE = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(CameraCancellingE, "__esModule", { value: true });
		CameraCancellingE.CameraCancellingE = void 0;
		var Camera2D_1 = requireCamera2D();
		var Object2D_1 = requireObject2D();
		var E_1 = requireE();
		/**
		 * カメラのtransformを戻すエンティティ。
		 * 特定シーンのエンティティがカメラの影響を受けないようにするための内部エンティティ。
		 */
		var CameraCancellingE$1 = /** @class */ (function (_super) {
		    __extends(CameraCancellingE, _super);
		    function CameraCancellingE(param) {
		        var _this = _super.call(this, param) || this;
		        _this._canceller = new Object2D_1.Object2D();
		        return _this;
		    }
		    CameraCancellingE.prototype.renderSelf = function (renderer, camera) {
		        if (!this.children)
		            return false;
		        if (camera && camera instanceof Camera2D_1.Camera2D) {
		            var c = camera;
		            var canceller = this._canceller;
		            if (c.x !== canceller.x ||
		                c.y !== canceller.y ||
		                c.angle !== canceller.angle ||
		                c.scaleX !== canceller.scaleX ||
		                c.scaleY !== canceller.scaleY) {
		                canceller.x = c.x;
		                canceller.y = c.y;
		                canceller.angle = c.angle;
		                canceller.scaleX = c.scaleX;
		                canceller.scaleY = c.scaleY;
		                if (canceller._matrix) {
		                    canceller._matrix._modified = true;
		                }
		            }
		            renderer.save();
		            renderer.transform(canceller.getMatrix()._matrix);
		        }
		        // Note: concatしていないのでunsafeだが、render中に配列の中身が変わる事はない前提とする
		        var children = this.children;
		        for (var i = 0; i < children.length; ++i)
		            children[i].render(renderer, camera);
		        if (camera) {
		            renderer.restore();
		        }
		        return false;
		    };
		    return CameraCancellingE;
		}(E_1.E));
		CameraCancellingE.CameraCancellingE = CameraCancellingE$1;
		
		return CameraCancellingE;
	}

	var LoadingScene = {};

	var Scene = {};

	var TimerManager = {};

	var Timer = {};

	var hasRequiredTimer;

	function requireTimer () {
		if (hasRequiredTimer) return Timer;
		hasRequiredTimer = 1;
		Object.defineProperty(Timer, "__esModule", { value: true });
		Timer.Timer = void 0;
		var trigger_1 = requireCjs();
		/**
		 * 一定時間で繰り返される処理を表すタイマー。
		 *
		 * ゲーム開発者が本クラスのインスタンスを直接生成することはなく、
		 * 通常はScene#setTimeout、Scene#setIntervalによって間接的に利用する。
		 */
		var Timer$1 = /** @class */ (function () {
		    function Timer(interval, fps) {
		        this.interval = interval;
		        // NOTE: intervalが浮動小数の場合があるため念のため四捨五入する
		        this._scaledInterval = Math.round(interval * fps);
		        this.onElapse = new trigger_1.Trigger();
		        this.elapsed = this.onElapse;
		        this._scaledElapsed = 0;
		    }
		    Timer.prototype.tick = function () {
		        // NOTE: 1000 / fps * fps = 1000
		        this._scaledElapsed += 1000;
		        while (this._scaledElapsed >= this._scaledInterval) {
		            // NOTE: this.elapsed.fire()内でdestroy()される可能性があるため、destroyed()を判定する
		            if (!this.onElapse) {
		                break;
		            }
		            this.onElapse.fire();
		            this._scaledElapsed -= this._scaledInterval;
		        }
		    };
		    Timer.prototype.canDelete = function () {
		        return !this.onElapse || this.onElapse.length === 0;
		    };
		    Timer.prototype.destroy = function () {
		        this.interval = undefined;
		        this.onElapse.destroy();
		        this.onElapse = undefined;
		        this.elapsed = undefined;
		        this._scaledInterval = 0;
		        this._scaledElapsed = 0;
		    };
		    Timer.prototype.destroyed = function () {
		        return this.onElapse === undefined;
		    };
		    return Timer;
		}());
		Timer.Timer = Timer$1;
		
		return Timer;
	}

	var hasRequiredTimerManager;

	function requireTimerManager () {
		if (hasRequiredTimerManager) return TimerManager;
		hasRequiredTimerManager = 1;
		Object.defineProperty(TimerManager, "__esModule", { value: true });
		TimerManager.TimerManager = TimerManager.TimerIdentifier = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var Timer_1 = requireTimer();
		/**
		 * `Scene#setTimeout` や `Scene#setInterval` の実行単位を表す。
		 * ゲーム開発者が本クラスのインスタンスを直接生成することはなく、
		 * 本クラスの機能を直接利用することはない。
		 */
		var TimerIdentifier = /** @class */ (function () {
		    function TimerIdentifier(timer, handler, handlerOwner, fired, firedOwner) {
		        this._timer = timer;
		        this._handler = handler;
		        this._handlerOwner = handlerOwner;
		        this._fired = fired;
		        this._firedOwner = firedOwner;
		        this._timer.onElapse.add(this._handleElapse, this);
		    }
		    TimerIdentifier.prototype.destroy = function () {
		        this._timer.onElapse.remove(this._handleElapse, this);
		        this._timer = undefined;
		        this._handler = undefined;
		        this._handlerOwner = undefined;
		        this._fired = undefined;
		        this._firedOwner = undefined;
		    };
		    TimerIdentifier.prototype.destroyed = function () {
		        return this._timer === undefined;
		    };
		    /**
		     * @private
		     */
		    TimerIdentifier.prototype._handleElapse = function () {
		        if (this.destroyed())
		            return;
		        this._handler.call(this._handlerOwner);
		        if (this._fired) {
		            this._fired.call(this._firedOwner, this);
		        }
		    };
		    return TimerIdentifier;
		}());
		TimerManager.TimerIdentifier = TimerIdentifier;
		/**
		 * Timerを管理する機構を提供する。
		 * ゲーム開発者が本クラスを利用する事はない。
		 */
		var TimerManager$1 = /** @class */ (function () {
		    function TimerManager(trigger, fps) {
		        this._timers = [];
		        this._trigger = trigger;
		        this._identifiers = [];
		        this._fps = fps;
		        this._registered = false;
		    }
		    TimerManager.prototype.destroy = function () {
		        for (var i = 0; i < this._identifiers.length; ++i) {
		            this._identifiers[i].destroy();
		        }
		        for (var i = 0; i < this._timers.length; ++i) {
		            this._timers[i].destroy();
		        }
		        this._timers = undefined;
		        this._trigger = undefined;
		        this._identifiers = undefined;
		        this._fps = undefined;
		    };
		    TimerManager.prototype.destroyed = function () {
		        return this._timers === undefined;
		    };
		    /**
		     * 定期間隔で処理を実行するTimerを作成する。
		     * 本Timerはフレーム経過によって動作する疑似タイマーであるため、実時間の影響は受けない
		     * @param interval Timerの実行間隔（ミリ秒）
		     * @returns 作成したTimer
		     */
		    TimerManager.prototype.createTimer = function (interval) {
		        if (!this._registered) {
		            this._trigger.add(this._tick, this);
		            this._registered = true;
		        }
		        if (interval < 0)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("TimerManager#createTimer: invalid interval");
		        // NODE: intervalが0の場合に、Timer#tick()で無限ループとなるためintervalの最小値を1とする。
		        if (interval < 1)
		            interval = 1;
		        // NOTE: Timerの_scaledElapsedと比較するため、this.fps倍した値を用いる
		        // Math.min(1000 / this._fps * this.fps, interval * this._fps);
		        var acceptableMargin = Math.min(1000, interval * this._fps);
		        for (var i = 0; i < this._timers.length; ++i) {
		            if (this._timers[i].interval === interval) {
		                if (this._timers[i]._scaledElapsed < acceptableMargin) {
		                    return this._timers[i];
		                }
		            }
		        }
		        var timer = new Timer_1.Timer(interval, this._fps);
		        this._timers.push(timer);
		        return timer;
		    };
		    /**
		     * Timerを削除する。
		     * @param timer 削除するTimer
		     */
		    TimerManager.prototype.deleteTimer = function (timer) {
		        if (!timer.canDelete())
		            return;
		        var index = this._timers.indexOf(timer);
		        if (index < 0)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("TimerManager#deleteTimer: can not find timer");
		        this._timers.splice(index, 1);
		        timer.destroy();
		        if (!this._timers.length) {
		            if (!this._registered)
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("TimerManager#deleteTimer: handler is not handled");
		            this._trigger.remove(this._tick, this);
		            this._registered = false;
		        }
		    };
		    TimerManager.prototype.setTimeout = function (handler, milliseconds, owner) {
		        var timer = this.createTimer(milliseconds);
		        var identifier = new TimerIdentifier(timer, handler, owner, this._onTimeoutFired, this);
		        this._identifiers.push(identifier);
		        return identifier;
		    };
		    TimerManager.prototype.clearTimeout = function (identifier) {
		        this._clear(identifier);
		    };
		    TimerManager.prototype.setInterval = function (handler, interval, owner) {
		        var timer = this.createTimer(interval);
		        var identifier = new TimerIdentifier(timer, handler, owner);
		        this._identifiers.push(identifier);
		        return identifier;
		    };
		    TimerManager.prototype.clearInterval = function (identifier) {
		        this._clear(identifier);
		    };
		    /**
		     * すべてのTimerを時間経過させる。
		     * @private
		     */
		    TimerManager.prototype._tick = function () {
		        var timers = this._timers.concat();
		        for (var i = 0; i < timers.length; ++i)
		            timers[i].tick();
		    };
		    /**
		     * @private
		     */
		    TimerManager.prototype._onTimeoutFired = function (identifier) {
		        var index = this._identifiers.indexOf(identifier);
		        if (index < 0)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("TimerManager#_onTimeoutFired: can not find identifier");
		        this._identifiers.splice(index, 1);
		        var timer = identifier._timer;
		        identifier.destroy();
		        this.deleteTimer(timer);
		    };
		    /**
		     * @private
		     */
		    TimerManager.prototype._clear = function (identifier) {
		        var index = this._identifiers.indexOf(identifier);
		        if (index < 0)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("TimerManager#_clear: can not find identifier");
		        if (identifier.destroyed())
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("TimerManager#_clear: invalid identifier");
		        this._identifiers.splice(index, 1);
		        var timer = identifier._timer;
		        identifier.destroy();
		        this.deleteTimer(timer);
		    };
		    return TimerManager;
		}());
		TimerManager.TimerManager = TimerManager$1;
		
		return TimerManager;
	}

	var hasRequiredScene;

	function requireScene () {
		if (hasRequiredScene) return Scene;
		hasRequiredScene = 1;
		Object.defineProperty(Scene, "__esModule", { value: true });
		Scene.Scene = void 0;
		var trigger_1 = requireCjs();
		var AssetAccessor_1 = requireAssetAccessor();
		var AssetHolder_1 = requireAssetHolder();
		var Camera2D_1 = requireCamera2D();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var TimerManager_1 = requireTimerManager();
		/**
		 * シーンを表すクラス。
		 */
		var Scene$1 = /** @class */ (function () {
		    /**
		     * 各種パラメータを指定して `Scene` のインスタンスを生成する。
		     * @param param 初期化に用いるパラメータのオブジェクト
		     */
		    function Scene(param) {
		        var game = param.game;
		        var local = param.local === undefined
		            ? "non-local"
		            : param.local === false
		                ? "non-local"
		                : param.local === true
		                    ? "full-local"
		                    : param.local;
		        var tickGenerationMode = param.tickGenerationMode !== undefined ? param.tickGenerationMode : "by-clock";
		        this.name = param.name;
		        this.game = game;
		        this.local = local;
		        this.tickGenerationMode = tickGenerationMode;
		        this.onLoad = new trigger_1.Trigger();
		        this.loaded = this.onLoad;
		        this._onReady = new trigger_1.Trigger();
		        this._ready = this._onReady;
		        this.assets = {};
		        this.asset = new AssetAccessor_1.AssetAccessor(game._assetManager);
		        this.vars = {};
		        this._loaded = false;
		        this._prefetchRequested = false;
		        this._loadingState = "initial";
		        this.onUpdate = new trigger_1.Trigger();
		        this.update = this.onUpdate;
		        this._timer = new TimerManager_1.TimerManager(this.onUpdate, this.game.fps);
		        this.onAssetLoad = new trigger_1.Trigger();
		        this.onAssetLoadFailure = new trigger_1.Trigger();
		        this.onAssetLoadComplete = new trigger_1.Trigger();
		        this.assetLoaded = this.onAssetLoad;
		        this.assetLoadFailed = this.onAssetLoadFailure;
		        this.assetLoadCompleted = this.onAssetLoadComplete;
		        this.onMessage = new trigger_1.Trigger();
		        this.onPointDownCapture = new trigger_1.Trigger();
		        this.onPointMoveCapture = new trigger_1.Trigger();
		        this.onPointUpCapture = new trigger_1.Trigger();
		        this.onOperation = new trigger_1.Trigger();
		        this.message = this.onMessage;
		        this.pointDownCapture = this.onPointDownCapture;
		        this.pointMoveCapture = this.onPointMoveCapture;
		        this.pointUpCapture = this.onPointUpCapture;
		        this.operation = this.onOperation;
		        this.children = [];
		        this.state = "standby";
		        this.onStateChange = new trigger_1.Trigger();
		        this._assetHolders = [];
		        this._sceneAssetHolder = new AssetHolder_1.AssetHolder({
		            assetManager: this.game._assetManager,
		            assetIds: param.assetIds,
		            assetPaths: param.assetPaths,
		            handlerSet: {
		                owner: this,
		                handleLoad: this._handleSceneAssetLoad,
		                handleLoadFailure: this._handleSceneAssetLoadFailure,
		                handleFinish: this._handleSceneAssetLoadFinish
		            },
		            userData: null
		        });
		        this.seethrough = param.seethrough != null ? param.seethrough : false;
		    }
		    /**
		     * このシーンが変更されたことをエンジンに通知する。
		     *
		     * このメソッドは、このシーンに紐づいている `E` の `modified()` を呼び出すことで暗黙に呼び出される。
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * @param isBubbling この関数をこのシーンの子の `modified()` から呼び出す場合、真を渡さなくてはならない。省略された場合、偽。
		     */
		    Scene.prototype.modified = function (_isBubbling) {
		        this.game.modified();
		    };
		    /**
		     * このシーンを破棄する。
		     *
		     * 破棄処理の開始時に、このシーンの `onStateChange` が引数 `BeforeDestroyed` でfireされる。
		     * 破棄処理の終了時に、このシーンの `onStateChange` が引数 `Destroyed` でfireされる。
		     * このシーンに紐づいている全ての `E` と全てのTimerは破棄される。
		     * `Scene#setInterval()`, `Scene#setTimeout()` に渡された関数は呼び出されなくなる。
		     *
		     * このメソッドは `Scene#end` や `Game#popScene` などによって要求されたシーンの遷移時に暗黙に呼び出される。
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     */
		    Scene.prototype.destroy = function () {
		        this.state = "before-destroyed";
		        this.onStateChange.fire(this.state);
		        // TODO: (GAMEDEV-483) Sceneスタックがそれなりの量になると重くなるのでScene#dbが必要かもしれない
		        for (var _i = 0, _a = [this.game.db, this.game._localDb]; _i < _a.length; _i++) {
		            var db = _a[_i];
		            for (var _b = 0, _c = db.keys(); _b < _c.length; _b++) {
		                var key = _c[_b];
		                var e = db.get(key);
		                if ((e === null || e === void 0 ? void 0 : e.scene) === this) {
		                    e.destroy();
		                }
		            }
		        }
		        this._timer.destroy();
		        this.onUpdate.destroy();
		        this.onMessage.destroy();
		        this.onPointDownCapture.destroy();
		        this.onPointMoveCapture.destroy();
		        this.onPointUpCapture.destroy();
		        this.onOperation.destroy();
		        this.onLoad.destroy();
		        this.onAssetLoad.destroy();
		        this.onAssetLoadFailure.destroy();
		        this.onAssetLoadComplete.destroy();
		        this.assets = {};
		        this.vars = {};
		        // アセットを参照しているEより先に解放しないよう最後に解放する
		        for (var i = 0; i < this._assetHolders.length; ++i)
		            this._assetHolders[i].destroy();
		        this._sceneAssetHolder.destroy();
		        this.game = undefined;
		        this._waitingPrepare = undefined;
		        this.state = "destroyed";
		        this.onStateChange.fire(this.state);
		        this.onStateChange.destroy();
		    };
		    /**
		     * 破棄済みであるかを返す。
		     */
		    Scene.prototype.destroyed = function () {
		        return this.game === undefined;
		    };
		    /**
		     * 一定間隔で定期的に処理を実行するTimerを作成して返す。
		     *
		     * 戻り値は作成されたTimerである。
		     * 通常は `Scene#setInterval` を利用すればよく、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * `Timer` はフレーム経過処理(`Scene#onUpdate`)で実現される疑似的なタイマーである。実時間の影響は受けない。
		     * @param interval Timerの実行間隔（ミリ秒）
		     */
		    Scene.prototype.createTimer = function (interval) {
		        return this._timer.createTimer(interval);
		    };
		    /**
		     * Timerを削除する。
		     * `Scene#createTimer()`と同様に、通常はゲーム開発者がこのメソッドを呼び出す必要はない。
		     * このメソッドを利用する場合、メソッド実行前に対象のTimerのonElapseに登録したハンドラを全て削除しておく必要がある。
		     * @param timer 削除するTimer
		     */
		    Scene.prototype.deleteTimer = function (timer) {
		        this._timer.deleteTimer(timer);
		    };
		    /**
		     * 一定間隔で定期的に実行される処理を作成する。
		     *
		     * `interval` ミリ秒おきに `owner` を `this` として `handler` を呼び出す。
		     * 戻り値は `Scene#clearInterval` の引数に指定して定期実行を解除するために使える値である。
		     * このタイマーはフレーム経過処理(`Scene#onUpdate`)で実現される疑似的なタイマーである。実時間の影響は受けない。
		     * 関数は指定時間の経過直後ではなく、経過後最初のフレームで呼び出される。
		     * @param handler 処理
		     * @param interval 実行間隔(ミリ秒)
		     * @param owner handlerの所有者。省略された場合、null
		     */
		    Scene.prototype.setInterval = function (handler, interval, owner) {
		        return this._timer.setInterval(handler, interval, owner);
		    };
		    /**
		     * setIntervalで作成した定期処理を解除する。
		     * @param identifier 解除対象
		     */
		    Scene.prototype.clearInterval = function (identifier) {
		        this._timer.clearInterval(identifier);
		    };
		    /**
		     * 一定時間後に一度だけ実行される処理を作成する。
		     *
		     * `milliseconds` ミリ秒後(以降)に、一度だけ `owner` を `this` として `handler` を呼び出す。
		     * 戻り値は `Scene#clearTimeout` の引数に指定して処理を削除するために使える値である。
		     *
		     * このタイマーはフレーム経過処理(`Scene#onUpdate`)で実現される疑似的なタイマーである。実時間の影響は受けない。
		     * 関数は指定時間の経過直後ではなく、経過後最初のフレームで呼び出される。
		     * (理想的なケースでは、30FPSなら50msのコールバックは66.6ms時点で呼び出される)
		     * 時間経過に対して厳密な処理を行う必要があれば、自力で `Scene#onUpdate` 通知を処理すること。
		     *
		     * @param handler 処理
		     * @param milliseconds 時間(ミリ秒)
		     * @param owner handlerの所有者。省略された場合、null
		     */
		    Scene.prototype.setTimeout = function (handler, milliseconds, owner) {
		        return this._timer.setTimeout(handler, milliseconds, owner);
		    };
		    /**
		     * setTimeoutで作成した処理を削除する。
		     * @param identifier 解除対象
		     */
		    Scene.prototype.clearTimeout = function (identifier) {
		        this._timer.clearTimeout(identifier);
		    };
		    /**
		     * このシーンが現在のシーンであるかどうかを返す。
		     */
		    Scene.prototype.isCurrentScene = function () {
		        return this.game.scene() === this;
		    };
		    /**
		     * 次のシーンへの遷移を要求する。
		     *
		     * このメソッドは、 `toPush` が真ならば `Game#pushScene()` の、でなければ `Game#replaceScene` のエイリアスである。
		     * このメソッドは要求を行うだけである。呼び出し直後にはシーン遷移は行われていないことに注意。
		     * このシーンが現在のシーンでない場合、 `AssertionError` がthrowされる。
		     * @param next 遷移後のシーン
		     * @param toPush 現在のシーンを残したままにするなら真、削除して遷移するなら偽を指定する。省略された場合偽
		     */
		    Scene.prototype.gotoScene = function (next, toPush) {
		        if (!this.isCurrentScene())
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Scene#gotoScene: this scene is not the current scene");
		        if (toPush) {
		            this.game.pushScene(next);
		        }
		        else {
		            this.game.replaceScene(next);
		        }
		    };
		    /**
		     * このシーンの削除と、一つ前のシーンへの遷移を要求する。
		     *
		     * このメソッドは `Game#popScene()` のエイリアスである。
		     * このメソッドは要求を行うだけである。呼び出し直後にはシーン遷移は行われていないことに注意。
		     * このシーンが現在のシーンでない場合、 `AssertionError` がthrowされる。
		     */
		    Scene.prototype.end = function () {
		        if (!this.isCurrentScene())
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Scene#end: this scene is not the current scene");
		        this.game.popScene();
		    };
		    /**
		     * このSceneにエンティティを登録する。
		     *
		     * このメソッドは各エンティティに対して暗黙に呼び出される。ゲーム開発者がこのメソッドを明示的に呼び出す必要はない。
		     * @param e 登録するエンティティ
		     */
		    Scene.prototype.register = function (e) {
		        this.game.register(e);
		        e.scene = this;
		    };
		    /**
		     * このSceneからエンティティの登録を削除する。
		     *
		     * このメソッドは各エンティティに対して暗黙に呼び出される。ゲーム開発者がこのメソッドを明示的に呼び出す必要はない。
		     * @param e 登録を削除するエンティティ
		     */
		    Scene.prototype.unregister = function (e) {
		        // @ts-ignore
		        e.scene = undefined;
		        this.game.unregister(e);
		    };
		    /**
		     * 子エンティティを追加する。
		     *
		     * `this.children` の末尾に `e` を追加する(`e` はそれまでに追加されたすべての子エンティティより手前に表示される)。
		     *
		     * @param e 子エンティティとして追加するエンティティ
		     */
		    Scene.prototype.append = function (e) {
		        this.insertBefore(e, undefined);
		    };
		    /**
		     * 子エンティティを挿入する。
		     *
		     * `this.children` の`target`の位置に `e` を挿入する。
		     * `target` が`this` の子でない場合、`append(e)`と同じ動作となる。
		     *
		     * @param e 子エンティティとして追加するエンティティ
		     * @param target 挿入位置にある子エンティティ
		     */
		    Scene.prototype.insertBefore = function (e, target) {
		        if (e.parent)
		            e.remove();
		        e.parent = this;
		        var index = -1;
		        if (target !== undefined && (index = this.children.indexOf(target)) > -1) {
		            this.children.splice(index, 0, e);
		        }
		        else {
		            this.children.push(e);
		        }
		        this.modified(true);
		    };
		    /**
		     * 子エンティティを削除する。
		     * `this` の子から `e` を削除する。 `e` が `this` の子でない場合、何もしない。
		     * @param e 削除する子エンティティ
		     */
		    Scene.prototype.remove = function (e) {
		        var index = this.children.indexOf(e);
		        if (index === -1)
		            return;
		        this.children[index].parent = undefined;
		        this.children.splice(index, 1);
		        this.modified(true);
		    };
		    /**
		     * シーン内でその座標に反応する `PointSource` を返す。
		     * @param point 対象の座標
		     * @param force touchable指定を無視する場合真を指定する。指定されなかった場合偽
		     * @param camera 対象のカメラ。指定されなかった場合undefined
		     */
		    Scene.prototype.findPointSourceByPoint = function (point, force, camera) {
		        var mayConsumeLocalTick = this.local !== "non-local";
		        var children = this.children;
		        var m = camera && camera instanceof Camera2D_1.Camera2D ? camera.getMatrix() : undefined;
		        for (var i = children.length - 1; i >= 0; --i) {
		            var ret = children[i].findPointSourceByPoint(point, m, force);
		            if (ret) {
		                ret.local = (ret.target && ret.target.local) || mayConsumeLocalTick;
		                return ret;
		            }
		        }
		        return { target: undefined, point: undefined, local: mayConsumeLocalTick };
		    };
		    /**
		     * アセットの先読みを要求する。
		     *
		     * `Scene` に必要なアセットは、通常、`Game#pushScene()` などによるシーン遷移にともなって暗黙に読み込みが開始される。
		     * ゲーム開発者はこのメソッドを呼び出すことで、シーン遷移前にアセット読み込みを開始する(先読みする)ことができる。
		     * 先読み開始後、シーン遷移時までに読み込みが完了していない場合、通常の読み込み処理同様にローディングシーンが表示される。
		     */
		    Scene.prototype.prefetch = function () {
		        if (this._loaded) {
		            // _load() 呼び出し後に prefetch() する意味はない(先読みではない)。
		            return;
		        }
		        if (this._prefetchRequested)
		            return;
		        this._prefetchRequested = true;
		        this._sceneAssetHolder.request();
		    };
		    Scene.prototype.requestAssets = function (assetIdsOrConf, handler) {
		        var _this = this;
		        if (this._loadingState !== "ready-fired" && this._loadingState !== "loaded-fired") {
		            // このメソッドは読み込み完了前には呼び出せない。これは実装上の制限である。
		            // やろうと思えば _load() で読み込む対象として加えることができる。が、その場合 `handler` を呼び出す方法が単純でないので対応を見送る。
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Scene#requestAssets(): can be called after loaded.");
		        }
		        var assetIds;
		        var alwaysNotifyFinish;
		        if (Array.isArray(assetIdsOrConf)) {
		            assetIds = assetIdsOrConf;
		            alwaysNotifyFinish = false;
		        }
		        else {
		            assetIds = assetIdsOrConf.assetIds;
		            alwaysNotifyFinish = !!assetIdsOrConf.notifyErrorOnCallback;
		        }
		        var holder = new AssetHolder_1.AssetHolder({
		            assetManager: this.game._assetManager,
		            assetIds: assetIds,
		            alwaysNotifyFinish: alwaysNotifyFinish,
		            handlerSet: {
		                owner: this,
		                handleLoad: this._handleSceneAssetLoad,
		                handleLoadFailure: this._handleSceneAssetLoadFailure,
		                handleFinish: this._handleSceneAssetLoadFinish
		            },
		            userData: function () {
		                // 不要なクロージャは避けたいが生存チェックのため不可避
		                if (!_this.destroyed()) {
		                    var failureAssetIds = holder._getFailureAssetIds();
		                    if (failureAssetIds.length) {
		                        // このパスに入るのは AssetHolder の alwaysNotifyFinish フラグを真にした時のみであることに注意
		                        var error = ExceptionFactory_1.ExceptionFactory.createRequestAssetLoadError("Scene#requestAssets(): failed to load the asset. refer to the 'detail' property for more information.", { failureAssetIds: failureAssetIds });
		                        handler(error);
		                    }
		                    else {
		                        handler();
		                    }
		                }
		            }
		        });
		        this._assetHolders.push(holder);
		        holder.request();
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._activate = function () {
		        this.state = "active";
		        this.onStateChange.fire(this.state);
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._deactivate = function () {
		        this.state = "deactive";
		        this.onStateChange.fire(this.state);
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._needsLoading = function () {
		        return this._sceneAssetHolder.waitingAssetsCount > 0 || !!this._waitingPrepare;
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._load = function () {
		        if (this._loaded)
		            return;
		        this._loaded = true;
		        if (!this._sceneAssetHolder.request()) {
		            this._notifySceneReady();
		        }
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._handleSceneAssetLoad = function (asset) {
		        this.assets[asset.id] = asset;
		        this.onAssetLoad.fire(asset);
		        this.onAssetLoadComplete.fire(asset);
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._handleSceneAssetLoadFailure = function (failureInfo) {
		        this.onAssetLoadFailure.fire(failureInfo);
		        this.onAssetLoadComplete.fire(failureInfo.asset);
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._handleSceneAssetLoadFinish = function (holder, succeed) {
		        if (!succeed) {
		            this.game.terminateGame();
		            return;
		        }
		        // 動的アセット (`requestAssets()` 由来) の場合
		        if (holder.userData) {
		            this.game._pushPostTickTask(holder.userData, null);
		            return;
		        }
		        if (!this._loaded) {
		            // prefetch() で開始されたアセット読み込みを完了したが、_load() がまだ呼ばれていない。
		            // _notifySceneReady() は _load() 呼び出し後まで遅延する。
		            return;
		        }
		        this._notifySceneReady();
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._notifySceneReady = function () {
		        // 即座に `_onReady` をfireすることはしない。tick()のタイミングで行うため、リクエストをgameに投げておく。
		        this._loadingState = "ready";
		        this.game._pushPostTickTask(this._fireReady, this);
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._fireReady = function () {
		        if (this.destroyed())
		            return;
		        this._onReady.fire(this);
		        this._loadingState = "ready-fired";
		    };
		    /**
		     * @private
		     */
		    Scene.prototype._fireLoaded = function () {
		        if (this.destroyed())
		            return;
		        if (this._loadingState === "loaded-fired")
		            return;
		        this.onLoad.fire(this);
		        this._loadingState = "loaded-fired";
		    };
		    return Scene;
		}());
		Scene.Scene = Scene$1;
		
		return Scene;
	}

	var hasRequiredLoadingScene;

	function requireLoadingScene () {
		if (hasRequiredLoadingScene) return LoadingScene;
		hasRequiredLoadingScene = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(LoadingScene, "__esModule", { value: true });
		LoadingScene.LoadingScene = void 0;
		var trigger_1 = requireCjs();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var Scene_1 = requireScene();
		/**
		 * Assetの読み込み中に表示されるシーン。
		 *
		 * 本シーンは通常のシーンと異なり、ゲーム内時間(`Game#age`)と独立に実行される。
		 * アセットやストレージデータを読み込んでいる間、ゲーム内時間が進んでいない状態でも、
		 * `LoadingScene` は画面に変化を与えることができる(`update` がfireされる)。
		 *
		 * ゲーム開発者は、ローディング中の演出を実装した独自の `LoadingScene` を
		 * `Game#loadingScene` に代入することでエンジンに利用させることができる。
		 *
		 * ゲーム内時間と独立に処理される `LoadingScene` での処理には再現性がない(他プレイヤーと状態が共有されない)。
		 * そのため `Game` に対して副作用のある操作を行ってはならない点に注意すること。
		 */
		var LoadingScene$1 = /** @class */ (function (_super) {
		    __extends(LoadingScene, _super);
		    /**
		     * `LoadingScene` のインスタンスを生成する。
		     * @param param 初期化に用いるパラメータのオブジェクト
		     */
		    function LoadingScene(param) {
		        var _this = this;
		        param.local = true; // LoadingScene は強制的にローカルにする
		        _this = _super.call(this, param) || this;
		        _this.onTargetReset = new trigger_1.Trigger();
		        _this.onTargetReady = new trigger_1.Trigger();
		        _this.onTargetAssetLoad = new trigger_1.Trigger();
		        _this.targetReset = _this.onTargetReset;
		        _this.targetReady = _this.onTargetReady;
		        _this.targetAssetLoaded = _this.onTargetAssetLoad;
		        _this._explicitEnd = !!param.explicitEnd;
		        _this._targetScene = undefined;
		        return _this;
		    }
		    LoadingScene.prototype.destroy = function () {
		        this._clearTargetScene();
		        _super.prototype.destroy.call(this);
		    };
		    /**
		     * アセットロード待ち対象シーンを変更する。
		     *
		     * このメソッドは、新たにシーンのロード待ちが必要になった場合にエンジンによって呼び出される。
		     * (派生クラスはこの処理をオーバーライドしてもよいが、その場合その中で
		     * このメソッド自身 (`g.LoadingScene.prototype.reset`) を呼び出す (`call()` する) 必要がある。)
		     *
		     * @param targetScene アセットロード待ちが必要なシーン
		     */
		    LoadingScene.prototype.reset = function (targetScene) {
		        this._clearTargetScene();
		        this._targetScene = targetScene;
		        if (this._loadingState !== "loaded-fired") {
		            this.onLoad.addOnce(this._doReset, this);
		        }
		        else {
		            this._doReset();
		        }
		    };
		    /**
		     * アセットロード待ち対象シーンの残りのロード待ちアセット数を取得する。
		     */
		    LoadingScene.prototype.getTargetWaitingAssetsCount = function () {
		        return this._targetScene ? this._targetScene._sceneAssetHolder.waitingAssetsCount : 0;
		    };
		    /**
		     * ローディングシーンを終了する。
		     *
		     * `Scene#end()` と異なり、このメソッドの呼び出しはこのシーンを破棄しない。(ローディングシーンは再利用される。)
		     * このメソッドが呼び出される時、 `targetReady` がfireされた後でなければならない。
		     */
		    LoadingScene.prototype.end = function () {
		        if (!this._targetScene || this._targetScene._loadingState === "initial") {
		            var state = this._targetScene ? this._targetScene._loadingState : "(no scene)";
		            var msg = "LoadingScene#end(): the target scene is in invalid state: " + state;
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError(msg);
		        }
		        this.game._popSceneRaw(true);
		        this.game._pushPostTickTask(this._targetScene._fireLoaded, this._targetScene);
		        this._clearTargetScene();
		    };
		    /**
		     * @private
		     */
		    LoadingScene.prototype._clearTargetScene = function () {
		        if (!this._targetScene)
		            return;
		        this.onLoad.removeAll({ owner: this, func: this._doReset });
		        this._targetScene._onReady.removeAll({ owner: this });
		        this._targetScene.onAssetLoad.removeAll({ owner: this });
		        this._targetScene = undefined;
		    };
		    /**
		     * @private
		     */
		    LoadingScene.prototype._doReset = function () {
		        this.onTargetReset.fire(this._targetScene);
		        if (this._targetScene._loadingState === "initial" || this._targetScene._loadingState === "ready") {
		            this._targetScene._onReady.add(this._handleReady, this);
		            this._targetScene.onAssetLoad.add(this._handleAssetLoad, this);
		            this._targetScene._load();
		        }
		        else {
		            this._handleReady(this._targetScene);
		        }
		    };
		    /**
		     * @private
		     */
		    LoadingScene.prototype._handleAssetLoad = function (asset) {
		        this.onTargetAssetLoad.fire(asset);
		    };
		    /**
		     * @private
		     */
		    LoadingScene.prototype._handleReady = function (scene) {
		        this.onTargetReady.fire(scene);
		        if (!this._explicitEnd) {
		            this.end();
		        }
		    };
		    return LoadingScene;
		}(Scene_1.Scene));
		LoadingScene.LoadingScene = LoadingScene$1;
		
		return LoadingScene;
	}

	var hasRequiredDefaultLoadingScene;

	function requireDefaultLoadingScene () {
		if (hasRequiredDefaultLoadingScene) return DefaultLoadingScene;
		hasRequiredDefaultLoadingScene = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(DefaultLoadingScene, "__esModule", { value: true });
		DefaultLoadingScene.DefaultLoadingScene = void 0;
		var CameraCancellingE_1 = requireCameraCancellingE();
		var FilledRect_1 = requireFilledRect();
		var LoadingScene_1 = requireLoadingScene();
		/**
		 * デフォルトローディングシーン。
		 *
		 * `Game#_defaultLoadingScene` の初期値として利用される。
		 * このシーンはいかなるアセットも用いてはならない。
		 */
		var DefaultLoadingScene$1 = /** @class */ (function (_super) {
		    __extends(DefaultLoadingScene, _super);
		    /**
		     * `DefaultLoadingScene` のインスタンスを生成する。
		     * @param param 初期化に用いるパラメータのオブジェクト
		     */
		    function DefaultLoadingScene(param) {
		        var _this = _super.call(this, { game: param.game, name: "akashic:default-loading-scene" }) || this;
		        if (param.style === "compact") {
		            _this._barWidth = _this.game.width / 4;
		            _this._barHeight = 5;
		            _this._style = "compact";
		        }
		        else {
		            _this._barWidth = Math.min(_this.game.width, Math.max(100, _this.game.width / 2));
		            _this._barHeight = 5;
		            _this._style = "default";
		        }
		        _this._gauge = undefined;
		        _this._gaugeUpdateCount = 0;
		        _this._totalWaitingAssetCount = 0;
		        _this.onLoad.add(_this._handleLoad, _this);
		        _this.onTargetReset.add(_this._handleTargetReset, _this);
		        _this.onTargetAssetLoad.add(_this._handleTargetAssetLoad, _this);
		        return _this;
		    }
		    /**
		     * @private
		     */
		    DefaultLoadingScene.prototype._handleLoad = function () {
		        var barX, barY, bgColor;
		        if (this._style === "compact") {
		            var margin = Math.min(this.game.width, this.game.height) * 0.05;
		            barX = this.game.width - margin - this._barWidth;
		            barY = this.game.height - margin - this._barHeight;
		            bgColor = "transparent";
		        }
		        else {
		            barX = (this.game.width - this._barWidth) / 2;
		            barY = (this.game.height - this._barHeight) / 2;
		            bgColor = "rgba(0, 0, 0, 0.8)";
		        }
		        var gauge;
		        this.append(new CameraCancellingE_1.CameraCancellingE({
		            scene: this,
		            children: [
		                new FilledRect_1.FilledRect({
		                    scene: this,
		                    width: this.game.width,
		                    height: this.game.height,
		                    cssColor: bgColor,
		                    children: [
		                        new FilledRect_1.FilledRect({
		                            scene: this,
		                            x: barX,
		                            y: barY,
		                            width: this._barWidth,
		                            height: this._barHeight,
		                            cssColor: "gray",
		                            children: [
		                                (gauge = new FilledRect_1.FilledRect({
		                                    scene: this,
		                                    width: 0,
		                                    height: this._barHeight,
		                                    cssColor: "white"
		                                }))
		                            ]
		                        })
		                    ]
		                })
		            ]
		        }));
		        gauge.onUpdate.add(this._handleUpdate, this);
		        this._gauge = gauge;
		        return true; // Trigger 登録を解除する
		    };
		    /**
		     * @private
		     */
		    DefaultLoadingScene.prototype._handleUpdate = function () {
		        var BLINK_RANGE = 50;
		        var BLINK_PER_SEC = 2 / 3;
		        ++this._gaugeUpdateCount;
		        // 白を上限に sin 波で明滅させる (updateしていることの確認)
		        var c = Math.round(255 - BLINK_RANGE + Math.sin((this._gaugeUpdateCount / this.game.fps) * BLINK_PER_SEC * (2 * Math.PI)) * BLINK_RANGE);
		        this._gauge.cssColor = "rgb(" + c + "," + c + "," + c + ")";
		        this._gauge.modified();
		    };
		    /**
		     * @private
		     */
		    DefaultLoadingScene.prototype._handleTargetReset = function (targetScene) {
		        if (this._gauge) {
		            this._gauge.width = 0;
		            this._gauge.modified();
		        }
		        this._totalWaitingAssetCount = targetScene._sceneAssetHolder.waitingAssetsCount;
		    };
		    /**
		     * @private
		     */
		    DefaultLoadingScene.prototype._handleTargetAssetLoad = function (_asset) {
		        var waitingAssetsCount = this._targetScene._sceneAssetHolder.waitingAssetsCount;
		        this._gauge.width = Math.ceil((1 - waitingAssetsCount / this._totalWaitingAssetCount) * this._barWidth);
		        this._gauge.modified();
		    };
		    return DefaultLoadingScene;
		}(LoadingScene_1.LoadingScene));
		DefaultLoadingScene.DefaultLoadingScene = DefaultLoadingScene$1;
		
		return DefaultLoadingScene;
	}

	var DefaultSkippingScene = {};

	var hasRequiredDefaultSkippingScene;

	function requireDefaultSkippingScene () {
		if (hasRequiredDefaultSkippingScene) return DefaultSkippingScene;
		hasRequiredDefaultSkippingScene = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(DefaultSkippingScene, "__esModule", { value: true });
		DefaultSkippingScene.DefaultSkippingScene = void 0;
		var CameraCancellingE_1 = requireCameraCancellingE();
		var FilledRect_1 = requireFilledRect();
		var Scene_1 = requireScene();
		/**
		 * @ignore
		 */
		function easeInOutQuad(t, b, c, d) {
		    t /= d / 2;
		    if (t < 1)
		        return (c / 2) * t * t + b;
		    --t;
		    return (-c / 2) * (t * (t - 2) - 1) + b;
		}
		/**
		 * @ignore
		 */
		function easingInOutQuadWithSaturation(t, b, c, d) {
		    var threshold = d * 0.15;
		    return 0 < t && t < threshold ? easeInOutQuad(t, b, c, threshold) : b + c;
		}
		/**
		 * @ignore
		 */
		var EasingFilledRect = /** @class */ (function (_super) {
		    __extends(EasingFilledRect, _super);
		    function EasingFilledRect(param) {
		        var _this = _super.call(this, param) || this;
		        _this.age = 0;
		        _this.offsetDurationFrame = param.offsetDurationFrame;
		        _this.easingDurationFrame = param.easingDurationFrame;
		        _this.valueFrom = param.valueFrom;
		        _this.valueTo = param.valueTo;
		        _this.easing = param.easing;
		        _this.onUpdate.add(_this._incrementAge, _this);
		        _this.onUpdate.add(_this._updateColor, _this);
		        return _this;
		    }
		    EasingFilledRect.prototype._incrementAge = function () {
		        this.age++;
		    };
		    EasingFilledRect.prototype._updateColor = function () {
		        var cssColor = this._calculateCSSColor();
		        if (this.cssColor !== cssColor) {
		            this.cssColor = cssColor;
		            this.modified();
		        }
		    };
		    EasingFilledRect.prototype._calculateCSSColor = function () {
		        var _a = this, age = _a.age, offsetDurationFrame = _a.offsetDurationFrame, easingDurationFrame = _a.easingDurationFrame, valueFrom = _a.valueFrom, valueTo = _a.valueTo, easing = _a.easing;
		        var t = Math.max(age - offsetDurationFrame, 0) % easingDurationFrame;
		        var b = valueFrom;
		        var c = valueTo - valueFrom;
		        var d = easingDurationFrame;
		        var col = easing(t, b, c, d);
		        return "rgb(".concat(col, ", ").concat(col, ", ").concat(col, ")");
		    };
		    return EasingFilledRect;
		}(FilledRect_1.FilledRect));
		/**
		 * デフォルトスキッピングシーン。
		 *
		 * `Game#_defaultSkippingScene` の初期値として利用される。
		 */
		var DefaultSkippingScene$1 = /** @class */ (function (_super) {
		    __extends(DefaultSkippingScene, _super);
		    /**
		     * `DefaultSkippingScene` のインスタンスを生成する。
		     * @param param 初期化に用いるパラメータのオブジェクト
		     */
		    function DefaultSkippingScene(param) {
		        var _this = _super.call(this, { game: param.game, local: "full-local", name: "akashic:default-skipping-scene" }) || this;
		        if (param.style === "indicator") {
		            _this.onLoad.addOnce(_this._handleLoadForIndicator, _this);
		        }
		        return _this;
		    }
		    /**
		     * @private
		     */
		    DefaultSkippingScene.prototype._handleLoadForIndicator = function () {
		        var _this = this;
		        var game = this.game;
		        var rectSize = (Math.min(game.width, game.height) * 0.03) | 0;
		        var margin = (Math.min(game.width, game.height) * 0.03) | 0;
		        var marginRight = (Math.min(game.width, game.height) * 0.05) | 0;
		        var marginBottom = (Math.min(game.width, game.height) * 0.05) | 0;
		        var offsetDurationFrame = 400 / (1000 / game.fps);
		        var easingDurationFrame = 2500 / (1000 / game.fps);
		        var valueFrom = 255 - 50;
		        var valueTo = 255;
		        var easing = easingInOutQuadWithSaturation;
		        this.append(new CameraCancellingE_1.CameraCancellingE({
		            scene: this,
		            children: [3, 2, 1, 0].map(function (offsetIndex, i) {
		                return new EasingFilledRect({
		                    scene: _this,
		                    cssColor: "rgb(".concat(valueTo, ", ").concat(valueTo, ", ").concat(valueTo, ")"),
		                    width: rectSize,
		                    height: rectSize,
		                    x: game.width - i * (rectSize + margin) - marginRight,
		                    y: game.height - marginBottom,
		                    anchorX: 1,
		                    anchorY: 1,
		                    offsetDurationFrame: offsetDurationFrame * offsetIndex,
		                    easingDurationFrame: easingDurationFrame,
		                    valueFrom: valueFrom,
		                    valueTo: valueTo,
		                    easing: easing
		                });
		            })
		        }));
		    };
		    return DefaultSkippingScene;
		}(Scene_1.Scene));
		DefaultSkippingScene.DefaultSkippingScene = DefaultSkippingScene$1;
		
		return DefaultSkippingScene;
	}

	var DynamicAssetConfiguration = {};

	var hasRequiredDynamicAssetConfiguration;

	function requireDynamicAssetConfiguration () {
		if (hasRequiredDynamicAssetConfiguration) return DynamicAssetConfiguration;
		hasRequiredDynamicAssetConfiguration = 1;
		Object.defineProperty(DynamicAssetConfiguration, "__esModule", { value: true });
		
		return DynamicAssetConfiguration;
	}

	var DynamicFont = {};

	var SurfaceAtlasSet = {};

	var SurfaceAtlas = {};

	var SurfaceAtlasSlot = {};

	var hasRequiredSurfaceAtlasSlot;

	function requireSurfaceAtlasSlot () {
		if (hasRequiredSurfaceAtlasSlot) return SurfaceAtlasSlot;
		hasRequiredSurfaceAtlasSlot = 1;
		Object.defineProperty(SurfaceAtlasSlot, "__esModule", { value: true });
		SurfaceAtlasSlot.SurfaceAtlasSlot = void 0;
		/**
		 * SurfaceAtlasの空き領域管理クラス。
		 *
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 */
		var SurfaceAtlasSlot$1 = /** @class */ (function () {
		    function SurfaceAtlasSlot(x, y, width, height) {
		        this.x = x;
		        this.y = y;
		        this.width = width;
		        this.height = height;
		        this.prev = null;
		        this.next = null;
		    }
		    return SurfaceAtlasSlot;
		}());
		SurfaceAtlasSlot.SurfaceAtlasSlot = SurfaceAtlasSlot$1;
		
		return SurfaceAtlasSlot;
	}

	var hasRequiredSurfaceAtlas;

	function requireSurfaceAtlas () {
		if (hasRequiredSurfaceAtlas) return SurfaceAtlas;
		hasRequiredSurfaceAtlas = 1;
		Object.defineProperty(SurfaceAtlas, "__esModule", { value: true });
		SurfaceAtlas.SurfaceAtlas = void 0;
		var SurfaceAtlasSlot_1 = requireSurfaceAtlasSlot();
		function getSurfaceAtlasSlot(slot, width, height) {
		    while (slot) {
		        if (slot.width >= width && slot.height >= height) {
		            return slot;
		        }
		        // @ts-ignore
		        slot = slot.next;
		    }
		    return null;
		}
		/**
		 * サーフェスアトラス。
		 *
		 * 与えられたサーフェスの指定された領域をコピーし一枚のサーフェスにまとめる。
		 *
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 */
		var SurfaceAtlas$1 = /** @class */ (function () {
		    function SurfaceAtlas(surface) {
		        this._surface = surface;
		        this._emptySurfaceAtlasSlotHead = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(0, 0, this._surface.width, this._surface.height);
		        this._accessScore = 0;
		        this._usedRectangleAreaSize = { width: 0, height: 0 };
		    }
		    SurfaceAtlas.prototype.reset = function () {
		        var renderer = this._surface.renderer();
		        renderer.begin();
		        renderer.clear();
		        renderer.end();
		        this._emptySurfaceAtlasSlotHead = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(0, 0, this._surface.width, this._surface.height);
		        this._accessScore = 0;
		        this._usedRectangleAreaSize.width = 0;
		        this._usedRectangleAreaSize.height = 0;
		    };
		    /**
		     * @private
		     */
		    SurfaceAtlas.prototype._acquireSurfaceAtlasSlot = function (width, height) {
		        // Renderer#drawImage()でサーフェス上の一部を描画するとき、
		        // 指定した部分に隣接する画素がにじみ出る現象が確認されている。
		        // ここれではそれを避けるため1pixelの余白を与えている。
		        width += 1;
		        height += 1;
		        var slot = getSurfaceAtlasSlot(this._emptySurfaceAtlasSlotHead, width, height);
		        if (!slot) {
		            return null;
		        }
		        var remainWidth = slot.width - width;
		        var remainHeight = slot.height - height;
		        var left;
		        var right;
		        if (remainWidth <= remainHeight) {
		            left = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(slot.x + width, slot.y, remainWidth, height);
		            right = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(slot.x, slot.y + height, slot.width, remainHeight);
		        }
		        else {
		            left = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(slot.x, slot.y + height, width, remainHeight);
		            right = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(slot.x + width, slot.y, remainWidth, slot.height);
		        }
		        left.prev = slot.prev;
		        left.next = right;
		        if (left.prev === null) {
		            // left is head
		            this._emptySurfaceAtlasSlotHead = left;
		        }
		        else {
		            left.prev.next = left;
		        }
		        right.prev = left;
		        right.next = slot.next;
		        if (right.next) {
		            right.next.prev = right;
		        }
		        var acquiredSlot = new SurfaceAtlasSlot_1.SurfaceAtlasSlot(slot.x, slot.y, width, height);
		        this._updateUsedRectangleAreaSize(acquiredSlot);
		        return acquiredSlot;
		    };
		    /**
		     * @private
		     */
		    SurfaceAtlas.prototype._updateUsedRectangleAreaSize = function (slot) {
		        var slotRight = slot.x + slot.width;
		        var slotBottom = slot.y + slot.height;
		        if (slotRight > this._usedRectangleAreaSize.width) {
		            this._usedRectangleAreaSize.width = slotRight;
		        }
		        if (slotBottom > this._usedRectangleAreaSize.height) {
		            this._usedRectangleAreaSize.height = slotBottom;
		        }
		    };
		    /**
		     * サーフェスを追加する。
		     *
		     * @param surface 追加するサーフェス
		     * @param offsetX サーフェス内におけるX方向のオフセット位置。0以上の数値でなければならない
		     * @param offsetY サーフェス内におけるY方向のオフセット位置。0以上の数値でなければならない
		     * @param width サーフェス内における矩形の幅。0より大きい数値でなければならない
		     * @param height サーフェス内における矩形の高さ。0より大きい数値でなければならない
		     */
		    SurfaceAtlas.prototype.addSurface = function (surface, offsetX, offsetY, width, height) {
		        var slot = this._acquireSurfaceAtlasSlot(width, height);
		        if (!slot) {
		            return null;
		        }
		        var renderer = this._surface.renderer();
		        renderer.begin();
		        renderer.drawImage(surface, offsetX, offsetY, width, height, slot.x, slot.y);
		        renderer.end();
		        return slot;
		    };
		    /**
		     * このSurfaceAtlasの破棄を行う。
		     * 以後、このSurfaceを利用することは出来なくなる。
		     */
		    SurfaceAtlas.prototype.destroy = function () {
		        this._surface.destroy();
		    };
		    /**
		     * このSurfaceAtlasが破棄済であるかどうかを判定する。
		     */
		    SurfaceAtlas.prototype.destroyed = function () {
		        return this._surface.destroyed();
		    };
		    /**
		     * このSurfaceAtlasの大きさを取得する。
		     */
		    SurfaceAtlas.prototype.getAtlasUsedSize = function () {
		        return this._usedRectangleAreaSize;
		    };
		    SurfaceAtlas.prototype.getAccessScore = function () {
		        return this._accessScore;
		    };
		    return SurfaceAtlas;
		}());
		SurfaceAtlas.SurfaceAtlas = SurfaceAtlas$1;
		
		return SurfaceAtlas;
	}

	var hasRequiredSurfaceAtlasSet;

	function requireSurfaceAtlasSet () {
		if (hasRequiredSurfaceAtlasSet) return SurfaceAtlasSet;
		hasRequiredSurfaceAtlasSet = 1;
		Object.defineProperty(SurfaceAtlasSet, "__esModule", { value: true });
		SurfaceAtlasSet.SurfaceAtlasSet = void 0;
		var SurfaceAtlas_1 = requireSurfaceAtlas();
		function calcAtlasSize(hint) {
		    // @ts-ignore
		    var width = Math.ceil(Math.min(hint.initialAtlasWidth, hint.maxAtlasWidth));
		    // @ts-ignore
		    var height = Math.ceil(Math.min(hint.initialAtlasHeight, hint.maxAtlasHeight));
		    return { width: width, height: height };
		}
		/**
		 * DynamicFont で使用される SurfaceAtlas を管理するクラス。
		 *
		 * 歴史的経緯のため、名前に反して DynamicFont 専用のクラスであり、汎用の SurfaceAtlas 管理クラスではない点に注意。
		 */
		var SurfaceAtlasSet$1 = /** @class */ (function () {
		    function SurfaceAtlasSet(params) {
		        this._surfaceAtlases = [];
		        this._atlasGlyphsTable = [];
		        this._resourceFactory = params.resourceFactory;
		        this._currentAtlasIndex = 0;
		        var hint = params.hint ? params.hint : {};
		        this._maxAtlasNum = hint.maxAtlasNum ? hint.maxAtlasNum : SurfaceAtlasSet.INITIAL_MAX_SURFACEATLAS_NUM;
		        // 指定がないとき、やや古いモバイルデバイスでも確保できると言われる
		        // 縦横512pxのテクスチャ一枚のアトラスにまとめる形にする
		        // 2048x2048で確保してしまうと、Edge, Chrome にて処理が非常に遅くなることがある
		        hint.initialAtlasWidth = hint.initialAtlasWidth ? hint.initialAtlasWidth : 512;
		        hint.initialAtlasHeight = hint.initialAtlasHeight ? hint.initialAtlasHeight : 512;
		        hint.maxAtlasWidth = hint.maxAtlasWidth ? hint.maxAtlasWidth : 512;
		        hint.maxAtlasHeight = hint.maxAtlasHeight ? hint.maxAtlasHeight : 512;
		        this._atlasSize = calcAtlasSize(hint);
		    }
		    /**
		     * @private
		     */
		    SurfaceAtlasSet.prototype._deleteAtlas = function (delteNum) {
		        for (var i = 0; i < delteNum; ++i) {
		            var atlas = this._spliceLeastFrequentlyUsedAtlas();
		            if (!atlas)
		                return;
		            atlas.destroy();
		        }
		    };
		    /**
		     * surfaceAtlases の最も利用されていない SurfaceAtlas を探し、 そのインデックスを返す。
		     *
		     * _surfaceAtlases の長さが 0 の場合、 -1 を返す。
		     * @private
		     */
		    SurfaceAtlasSet.prototype._findLeastFrequentlyUsedAtlasIndex = function () {
		        var minScore = Number.MAX_VALUE;
		        var lowScoreAtlasIndex = -1;
		        for (var i = 0; i < this._surfaceAtlases.length; ++i) {
		            if (this._surfaceAtlases[i]._accessScore <= minScore) {
		                minScore = this._surfaceAtlases[i]._accessScore;
		                lowScoreAtlasIndex = i;
		            }
		        }
		        return lowScoreAtlasIndex;
		    };
		    /**
		     * surfaceAtlases の最も利用されていない SurfaceAtlas を切り離して返す。
		     *
		     * 返された SurfaceAtlas に紐づいていたすべての Glyph はサーフェスを失う (_isSurfaceValid が偽になる) 。
		     * _surfaceAtlases の長さが 0 の場合、 何もせず null を返す。
		     * @private
		     */
		    SurfaceAtlasSet.prototype._spliceLeastFrequentlyUsedAtlas = function () {
		        var idx = this._findLeastFrequentlyUsedAtlasIndex();
		        if (idx === -1)
		            return null;
		        if (this._currentAtlasIndex >= idx)
		            --this._currentAtlasIndex;
		        var spliced = this._surfaceAtlases.splice(idx, 1)[0];
		        var glyphs = this._atlasGlyphsTable.splice(idx, 1)[0];
		        for (var i = 0; i < glyphs.length; i++) {
		            var glyph = glyphs[i];
		            glyph.surface = undefined;
		            glyph.isSurfaceValid = false;
		            glyph._atlas = null;
		        }
		        return spliced;
		    };
		    /**
		     * 空き領域のある SurfaceAtlas を探索する。
		     * glyph が持つ情報を SurfaceAtlas へ移動し、移動した SurfaceAtlas の情報で glyph を置き換える。
		     * glyph が持っていた surface は破棄される。
		     *
		     * 移動に成功した場合 `true` を、失敗した (空き領域が見つからなかった) 場合 `false` を返す。
		     * @private
		     */
		    SurfaceAtlasSet.prototype._moveGlyphSurface = function (glyph) {
		        for (var i = 0; i < this._surfaceAtlases.length; ++i) {
		            var index = (this._currentAtlasIndex + i) % this._surfaceAtlases.length;
		            var atlas = this._surfaceAtlases[index];
		            var slot = atlas.addSurface(glyph.surface, glyph.x, glyph.y, glyph.width, glyph.height);
		            if (slot) {
		                this._currentAtlasIndex = index;
		                if (glyph.surface)
		                    glyph.surface.destroy();
		                glyph.surface = atlas._surface;
		                glyph.x = slot.x;
		                glyph.y = slot.y;
		                glyph._atlas = atlas;
		                this._atlasGlyphsTable[index].push(glyph);
		                return true;
		            }
		        }
		        return false;
		    };
		    /**
		     * サーフェスアトラスの再割り当てを行う。
		     * @private
		     */
		    SurfaceAtlasSet.prototype._reallocateAtlas = function () {
		        var atlas = null;
		        if (this._surfaceAtlases.length >= this._maxAtlasNum) {
		            atlas = this._spliceLeastFrequentlyUsedAtlas();
		            atlas.reset();
		        }
		        else {
		            atlas = new SurfaceAtlas_1.SurfaceAtlas(this._resourceFactory.createSurface(this._atlasSize.width, this._atlasSize.height));
		        }
		        this._surfaceAtlases.push(atlas);
		        this._atlasGlyphsTable.push([]);
		        this._currentAtlasIndex = this._surfaceAtlases.length - 1;
		    };
		    /**
		     * 引数で指定されたindexのサーフェスアトラスを取得する。
		     *
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * @param index 取得対象のインデックス
		     */
		    SurfaceAtlasSet.prototype.getAtlas = function (index) {
		        return this._surfaceAtlases[index];
		    };
		    /**
		     * サーフェスアトラスの保持数を取得する。
		     *
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     */
		    SurfaceAtlasSet.prototype.getAtlasNum = function () {
		        return this._surfaceAtlases.length;
		    };
		    /**
		     * 最大サーフェスアトラス保持数取得する。
		     */
		    SurfaceAtlasSet.prototype.getMaxAtlasNum = function () {
		        return this._maxAtlasNum;
		    };
		    /**
		     * 最大アトラス保持数設定する。
		     *
		     * 設定された値が、現在保持している_surfaceAtlasesの数より大きい場合、
		     * removeLeastFrequentlyUsedAtlas()で設定値まで削除する。
		     * @param value 設定値
		     */
		    SurfaceAtlasSet.prototype.changeMaxAtlasNum = function (value) {
		        this._maxAtlasNum = value;
		        if (this._surfaceAtlases.length > this._maxAtlasNum) {
		            var diff = this._surfaceAtlases.length - this._maxAtlasNum;
		            this._deleteAtlas(diff);
		        }
		    };
		    /**
		     * サーフェスアトラスのサイズを取得する。
		     *
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     */
		    SurfaceAtlasSet.prototype.getAtlasUsedSize = function () {
		        return this._atlasSize;
		    };
		    /**
		     * グリフを追加する。
		     *
		     * glyph が持っていたサーフェスは破棄され、このクラスが管理するいずれかの (サーフェスアトラスの) サーフェスに紐づけられる。
		     * 追加に成功した場合 `true` を、失敗した (空き領域が見つからなかった) 場合 `false` を返す。
		     *
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * @param glyph グリフ
		     */
		    SurfaceAtlasSet.prototype.addGlyph = function (glyph) {
		        // グリフがアトラスより大きいとき、`_atlasSet.addGlyph()`は失敗する。
		        // `_reallocateAtlas()`でアトラス増やしてもこれは解決できない。
		        // 無駄な空き領域探索とアトラスの再確保を避けるためにここでリターンする。
		        if (glyph.width > this._atlasSize.width || glyph.height > this._atlasSize.height) {
		            return false;
		        }
		        if (this._moveGlyphSurface(glyph))
		            return true;
		        // retry
		        this._reallocateAtlas();
		        return this._moveGlyphSurface(glyph);
		    };
		    /**
		     * グリフの利用を通知する。
		     *
		     * サーフェスが不足した時、このクラスは最も利用頻度の低いサーフェスを解放して再利用する。
		     * このメソッドによるグリフの利用通知は、利用頻度の低いサーフェスを特定するために利用される。
		     *
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * @param glyph グリフ
		     */
		    SurfaceAtlasSet.prototype.touchGlyph = function (glyph) {
		        // スコア更新
		        // NOTE: LRUを捨てる方式なら単純なタイムスタンプのほうがわかりやすいかもしれない
		        // NOTE: 正確な時刻は必要ないはずで、インクリメンタルなカウンタで代用すればDate()生成コストは省略できる
		        if (glyph._atlas)
		            glyph._atlas._accessScore += 1;
		        for (var i = 0; i < this._surfaceAtlases.length; i++) {
		            var atlas = this._surfaceAtlases[i];
		            atlas._accessScore /= 2;
		        }
		    };
		    /**
		     * このインスタンスを破棄する。
		     */
		    SurfaceAtlasSet.prototype.destroy = function () {
		        for (var i = 0; i < this._surfaceAtlases.length; ++i) {
		            this._surfaceAtlases[i].destroy();
		        }
		        this._surfaceAtlases = undefined;
		        this._resourceFactory = undefined;
		        this._atlasGlyphsTable = undefined;
		    };
		    /**
		     * このインスタンスが破棄済みであるかどうかを返す。
		     */
		    SurfaceAtlasSet.prototype.destroyed = function () {
		        return this._surfaceAtlases === undefined;
		    };
		    /**
		     * SurfaceAtlas最大保持数初期値
		     */
		    SurfaceAtlasSet.INITIAL_MAX_SURFACEATLAS_NUM = 10;
		    return SurfaceAtlasSet;
		}());
		SurfaceAtlasSet.SurfaceAtlasSet = SurfaceAtlasSet$1;
		
		return SurfaceAtlasSet;
	}

	var hasRequiredDynamicFont;

	function requireDynamicFont () {
		if (hasRequiredDynamicFont) return DynamicFont;
		hasRequiredDynamicFont = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(DynamicFont, "__esModule", { value: true });
		DynamicFont.DynamicFont = void 0;
		var pdi_types_1 = requireLib$2();
		var BitmapFont_1 = requireBitmapFont();
		var Font_1 = requireFont();
		var SurfaceAtlasSet_1 = requireSurfaceAtlasSet();
		var Util_1 = requireUtil();
		/**
		 * ビットマップフォントを逐次生成するフォント。
		 */
		var DynamicFont$1 = /** @class */ (function (_super) {
		    __extends(DynamicFont, _super);
		    /**
		     * 各種パラメータを指定して `DynamicFont` のインスタンスを生成する。
		     * @param param `DynamicFont` に設定するパラメータ
		     */
		    function DynamicFont(param) {
		        var _this = _super.call(this) || this;
		        _this.fontFamily = param.fontFamily;
		        _this.size = param.size;
		        _this.hint = param.hint != null ? param.hint : {};
		        _this.fontColor = param.fontColor != null ? param.fontColor : "black";
		        _this.fontWeight = param.fontWeight != null ? param.fontWeight : pdi_types_1.FontWeight.Normal;
		        _this.strokeWidth = param.strokeWidth != null ? param.strokeWidth : 0;
		        _this.strokeColor = param.strokeColor != null ? param.strokeColor : "black";
		        _this.strokeOnly = param.strokeOnly != null ? param.strokeOnly : false;
		        var game = param.game;
		        _this._resourceFactory = game.resourceFactory;
		        var ff = _this.fontFamily;
		        var realFontFamily;
		        if (typeof ff === "string") {
		            realFontFamily = ff;
		        }
		        else if (Array.isArray(ff)) {
		            var arr = [];
		            for (var i = 0; i < ff.length; ++i) {
		                var ffi = ff[i];
		                arr.push(typeof ffi === "string" ? ffi : Util_1.Util.enumToSnakeCase(pdi_types_1.FontFamily, ffi));
		            }
		            realFontFamily = arr;
		        }
		        else {
		            var arr = [];
		            arr.push(typeof ff === "string" ? ff : Util_1.Util.enumToSnakeCase(pdi_types_1.FontFamily, ff));
		            realFontFamily = arr;
		        }
		        var weight = _this.fontWeight;
		        var realFontWeight = typeof weight === "string" ? weight : Util_1.Util.enumToSnakeCase(pdi_types_1.FontWeight, weight);
		        _this._glyphFactory = _this._resourceFactory.createGlyphFactory(realFontFamily, _this.size, _this.hint.baselineHeight, _this.fontColor, _this.strokeWidth, _this.strokeColor, _this.strokeOnly, realFontWeight);
		        _this._glyphs = {};
		        _this._destroyed = false;
		        _this._isSurfaceAtlasSetOwner = false;
		        // NOTE: hint の特定プロパティ(baselineHeight)を分岐の条件にした場合、後でプロパティを追加した時に
		        // ここで追従漏れの懸念があるため、引数の hint が省略されているかで分岐させている。
		        if (param.surfaceAtlasSet) {
		            _this._atlasSet = param.surfaceAtlasSet;
		        }
		        else if (!!param.hint) {
		            _this._isSurfaceAtlasSetOwner = true;
		            _this._atlasSet = new SurfaceAtlasSet_1.SurfaceAtlasSet({
		                resourceFactory: game.resourceFactory,
		                hint: _this.hint
		            });
		        }
		        else {
		            _this._atlasSet = game.surfaceAtlasSet;
		        }
		        if (_this.hint.presetChars) {
		            for (var i = 0, len = _this.hint.presetChars.length; i < len; i++) {
		                var code = Util_1.Util.charCodeAt(_this.hint.presetChars, i);
		                if (!code) {
		                    continue;
		                }
		                _this.glyphForCharacter(code);
		            }
		        }
		        return _this;
		    }
		    /**
		     * グリフの取得。
		     *
		     * 取得に失敗するとnullが返る。
		     *
		     * 取得に失敗した時、次のようにすることで成功するかもしれない。
		     * - DynamicFont生成時に指定する文字サイズを小さくする
		     * - アトラスの初期サイズ・最大サイズを大きくする
		     *
		     * @param code 文字コード
		     */
		    DynamicFont.prototype.glyphForCharacter = function (code) {
		        var glyph = this._glyphs[code];
		        if (!(glyph && glyph.isSurfaceValid)) {
		            // g.Glyph にダウンキャストすることによって不整合が発生しうるので修正が必要
		            // TODO: g.Glyph を返す create() メソッドを持つ g.GlyphFactory を定義すべき
		            glyph = this._glyphFactory.create(code);
		            if (glyph.surface) {
		                // 空白文字でなければアトラス化する
		                if (!this._atlasSet.addGlyph(glyph)) {
		                    return null;
		                }
		            }
		            this._glyphs[code] = glyph;
		        }
		        this._atlasSet.touchGlyph(glyph);
		        return glyph;
		    };
		    /**
		     * BtimapFontの生成。
		     *
		     * 実装上の制限から、このメソッドを呼び出す場合、maxAtlasNum が 1 または undefined/null(1として扱われる) である必要がある。
		     * そうでない場合、失敗する可能性がある。
		     *
		     * @param missingGlyph `BitmapFont#map` に存在しないコードポイントの代わりに表示するべき文字。最初の一文字が用いられる。
		     */
		    DynamicFont.prototype.asBitmapFont = function (missingGlyphChar) {
		        var _this = this;
		        if (this._atlasSet.getAtlasNum() !== 1) {
		            return null;
		        }
		        var missingGlyphCharCodePoint = null;
		        if (missingGlyphChar) {
		            missingGlyphCharCodePoint = Util_1.Util.charCodeAt(missingGlyphChar, 0);
		            this.glyphForCharacter(missingGlyphCharCodePoint);
		        }
		        var glyphAreaMap = {};
		        Object.keys(this._glyphs).forEach(function (_key) {
		            var key = Number(_key);
		            var glyph = _this._glyphs[key];
		            var glyphArea = {
		                x: glyph.x,
		                y: glyph.y,
		                width: glyph.width,
		                height: glyph.height,
		                offsetX: glyph.offsetX,
		                offsetY: glyph.offsetY,
		                advanceWidth: glyph.advanceWidth
		            };
		            glyphAreaMap[key] = glyphArea;
		        });
		        // NOTE: (defaultGlyphWidth, defaultGlyphHeight)= (0, this.size) とする
		        //
		        // それぞれの役割は第一に `GlyphArea#width`, `GlyphArea#height` が与えられないときの
		        // デフォルト値である。ここでは必ず与えているのでデフォルト値としては利用されない。
		        // しかし defaultGlyphHeight は BitmapFont#size にも用いられる。
		        // そのために this.size をコンストラクタの第４引数に与えることにする。
		        // @ts-ignore
		        var missingGlyph = glyphAreaMap[missingGlyphCharCodePoint];
		        var atlas = this._atlasSet.getAtlas(0);
		        var size = atlas.getAtlasUsedSize();
		        var surface = this._resourceFactory.createSurface(size.width, size.height);
		        var renderer = surface.renderer();
		        renderer.begin();
		        renderer.drawImage(atlas._surface, 0, 0, size.width, size.height, 0, 0);
		        renderer.end();
		        var bitmapFont = new BitmapFont_1.BitmapFont({
		            src: surface,
		            map: glyphAreaMap,
		            defaultGlyphWidth: 0,
		            defaultGlyphHeight: this.size,
		            missingGlyph: missingGlyph
		        });
		        return bitmapFont;
		    };
		    DynamicFont.prototype.destroy = function () {
		        if (this._isSurfaceAtlasSetOwner) {
		            this._atlasSet.destroy();
		        }
		        this._glyphs = undefined;
		        this._glyphFactory = undefined;
		        this._destroyed = true;
		    };
		    DynamicFont.prototype.destroyed = function () {
		        return this._destroyed;
		    };
		    return DynamicFont;
		}(Font_1.Font));
		DynamicFont.DynamicFont = DynamicFont$1;
		
		return DynamicFont;
	}

	var EntityStateFlags = {};

	var hasRequiredEntityStateFlags;

	function requireEntityStateFlags () {
		if (hasRequiredEntityStateFlags) return EntityStateFlags;
		hasRequiredEntityStateFlags = 1;
		Object.defineProperty(EntityStateFlags, "__esModule", { value: true });
		
		return EntityStateFlags;
	}

	var EventConverter = {};

	var hasRequiredEventConverter;

	function requireEventConverter () {
		if (hasRequiredEventConverter) return EventConverter;
		hasRequiredEventConverter = 1;
		Object.defineProperty(EventConverter, "__esModule", { value: true });
		EventConverter.EventConverter = void 0;
		var E_1 = requireE();
		var Event_1 = requireEvent();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		/**
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 * @ignore
		 */
		var EventConverter$1 = /** @class */ (function () {
		    function EventConverter(param) {
		        var _a;
		        this._game = param.game;
		        this._playerId = (_a = param.playerId) !== null && _a !== void 0 ? _a : null;
		        this._playerTable = {};
		    }
		    /**
		     * playlog.Eventからg.Eventへ変換する。
		     */
		    EventConverter.prototype.toGameEvent = function (pev) {
		        var pointerId;
		        var entityId;
		        var target;
		        var point;
		        var startDelta;
		        var prevDelta;
		        var local;
		        var timestamp;
		        var button;
		        var eventCode = pev[0 /* EventIndex.General.Code */];
		        var prio = pev[1 /* EventIndex.General.EventFlags */];
		        var playerId = pev[2 /* EventIndex.General.PlayerId */];
		        // @ts-ignore
		        var player = this._playerTable[playerId] || { id: playerId };
		        switch (eventCode) {
		            case 0 /* pl.EventCode.Join */:
		                player = {
		                    id: playerId,
		                    name: pev[3 /* EventIndex.Join.PlayerName */]
		                };
		                // @ts-ignore
		                if (this._playerTable[playerId] && this._playerTable[playerId].userData != null) {
		                    // @ts-ignore
		                    player.userData = this._playerTable[playerId].userData;
		                }
		                // @ts-ignore
		                this._playerTable[playerId] = player;
		                return new Event_1.JoinEvent(player, prio);
		            case 1 /* pl.EventCode.Leave */:
		                delete this._playerTable[player.id];
		                return new Event_1.LeaveEvent(player, prio);
		            case 2 /* pl.EventCode.Timestamp */:
		                timestamp = pev[3 /* EventIndex.Timestamp.Timestamp */];
		                return new Event_1.TimestampEvent(timestamp, player, prio);
		            case 3 /* pl.EventCode.PlayerInfo */:
		                var playerName = pev[3 /* EventIndex.PlayerInfo.PlayerName */];
		                var userData = pev[4 /* EventIndex.PlayerInfo.UserData */];
		                player = {
		                    id: playerId,
		                    name: playerName,
		                    userData: userData
		                };
		                // @ts-ignore
		                this._playerTable[playerId] = player;
		                return new Event_1.PlayerInfoEvent(player, prio);
		            case 32 /* pl.EventCode.Message */:
		                local = pev[4 /* EventIndex.Message.Local */];
		                return new Event_1.MessageEvent(pev[3 /* EventIndex.Message.Message */], player, local, prio);
		            case 33 /* pl.EventCode.PointDown */:
		                local = pev[8 /* EventIndex.PointDown.Local */];
		                pointerId = pev[3 /* EventIndex.PointDown.PointerId */];
		                entityId = pev[6 /* EventIndex.PointDown.EntityId */];
		                target = entityId == null ? undefined : entityId >= 0 ? this._game.db.get(entityId) : this._game._localDb.get(entityId);
		                point = {
		                    x: pev[4 /* EventIndex.PointDown.X */],
		                    y: pev[5 /* EventIndex.PointDown.Y */]
		                };
		                button = pev[7 /* EventIndex.PointDown.Button */];
		                return new E_1.PointDownEvent(pointerId, target, point, player, local, prio, button);
		            case 34 /* pl.EventCode.PointMove */:
		                local = pev[12 /* EventIndex.PointMove.Local */];
		                pointerId = pev[3 /* EventIndex.PointMove.PointerId */];
		                entityId = pev[10 /* EventIndex.PointMove.EntityId */];
		                target = entityId == null ? undefined : entityId >= 0 ? this._game.db.get(entityId) : this._game._localDb.get(entityId);
		                point = {
		                    x: pev[4 /* EventIndex.PointMove.X */],
		                    y: pev[5 /* EventIndex.PointMove.Y */]
		                };
		                startDelta = {
		                    x: pev[6 /* EventIndex.PointMove.StartDeltaX */],
		                    y: pev[7 /* EventIndex.PointMove.StartDeltaY */]
		                };
		                prevDelta = {
		                    x: pev[8 /* EventIndex.PointMove.PrevDeltaX */],
		                    y: pev[9 /* EventIndex.PointMove.PrevDeltaY */]
		                };
		                button = pev[11 /* EventIndex.PointMove.Button */];
		                return new E_1.PointMoveEvent(pointerId, target, point, prevDelta, startDelta, player, local, prio, button);
		            case 35 /* pl.EventCode.PointUp */:
		                local = pev[12 /* EventIndex.PointUp.Local */];
		                pointerId = pev[3 /* EventIndex.PointUp.PointerId */];
		                entityId = pev[10 /* EventIndex.PointUp.EntityId */];
		                target = entityId == null ? undefined : entityId >= 0 ? this._game.db.get(entityId) : this._game._localDb.get(entityId);
		                point = {
		                    x: pev[4 /* EventIndex.PointUp.X */],
		                    y: pev[5 /* EventIndex.PointUp.Y */]
		                };
		                startDelta = {
		                    x: pev[6 /* EventIndex.PointUp.StartDeltaX */],
		                    y: pev[7 /* EventIndex.PointUp.StartDeltaY */]
		                };
		                prevDelta = {
		                    x: pev[8 /* EventIndex.PointUp.PrevDeltaX */],
		                    y: pev[9 /* EventIndex.PointUp.PrevDeltaY */]
		                };
		                button = pev[11 /* EventIndex.PointUp.Button */];
		                return new E_1.PointUpEvent(pointerId, target, point, prevDelta, startDelta, player, local, prio, button);
		            case 64 /* pl.EventCode.Operation */:
		                local = pev[5 /* EventIndex.Operation.Local */];
		                var operationCode = pev[3 /* EventIndex.Operation.OperationCode */];
		                var operationData = pev[4 /* EventIndex.Operation.OperationData */];
		                var decodedData = this._game._decodeOperationPluginOperation(operationCode, operationData);
		                return new Event_1.OperationEvent(operationCode, decodedData, player, local, prio);
		            default:
		                // TODO handle error
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("EventConverter#toGameEvent");
		        }
		    };
		    /**
		     * g.Eventからplaylog.Eventに変換する。
		     */
		    EventConverter.prototype.toPlaylogEvent = function (e, preservePlayer) {
		        var _a, _b, _c, _d, _e, _f, _g;
		        var targetId;
		        var playerId;
		        switch (e.type) {
		            case "join":
		            case "leave":
		                // akashic-engine は決して Join と Leave を生成しない
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("EventConverter#toPlaylogEvent: Invalid type: " + e.type);
		            case "timestamp":
		                var ts = e;
		                playerId = preservePlayer ? (_a = ts.player.id) !== null && _a !== void 0 ? _a : null : this._playerId;
		                return [
		                    2 /* pl.EventCode.Timestamp */,
		                    ts.eventFlags,
		                    playerId,
		                    ts.timestamp //            3: タイムスタンプ
		                ];
		            case "player-info":
		                var playerInfo = e;
		                playerId = preservePlayer ? (_b = playerInfo.player.id) !== null && _b !== void 0 ? _b : null : this._playerId;
		                return [
		                    3 /* pl.EventCode.PlayerInfo */,
		                    playerInfo.eventFlags,
		                    playerId,
		                    playerInfo.player.name,
		                    playerInfo.player.userData // 4: ユーザデータ
		                ];
		            case "point-down":
		                var pointDown = e;
		                targetId = pointDown.target ? pointDown.target.id : null;
		                playerId = preservePlayer && pointDown.player ? (_c = pointDown.player.id) !== null && _c !== void 0 ? _c : null : this._playerId;
		                return [
		                    33 /* pl.EventCode.PointDown */,
		                    pointDown.eventFlags,
		                    playerId,
		                    pointDown.pointerId,
		                    pointDown.point.x,
		                    pointDown.point.y,
		                    targetId,
		                    pointDown.button,
		                    !!pointDown.local //       8?: ローカルイベントかどうか
		                ];
		            case "point-move":
		                var pointMove = e;
		                targetId = pointMove.target ? pointMove.target.id : null;
		                playerId = preservePlayer && pointMove.player ? (_d = pointMove.player.id) !== null && _d !== void 0 ? _d : null : this._playerId;
		                return [
		                    34 /* pl.EventCode.PointMove */,
		                    pointMove.eventFlags,
		                    playerId,
		                    pointMove.pointerId,
		                    pointMove.point.x,
		                    pointMove.point.y,
		                    pointMove.startDelta.x,
		                    pointMove.startDelta.y,
		                    pointMove.prevDelta.x,
		                    pointMove.prevDelta.y,
		                    targetId,
		                    pointMove.button,
		                    !!pointMove.local //       12?: ローカルイベントかどうか
		                ];
		            case "point-up":
		                var pointUp = e;
		                targetId = pointUp.target ? pointUp.target.id : null;
		                playerId = preservePlayer && pointUp.player ? (_e = pointUp.player.id) !== null && _e !== void 0 ? _e : null : this._playerId;
		                return [
		                    35 /* pl.EventCode.PointUp */,
		                    pointUp.eventFlags,
		                    playerId,
		                    pointUp.pointerId,
		                    pointUp.point.x,
		                    pointUp.point.y,
		                    pointUp.startDelta.x,
		                    pointUp.startDelta.y,
		                    pointUp.prevDelta.x,
		                    pointUp.prevDelta.y,
		                    targetId,
		                    pointUp.button,
		                    !!pointUp.local //       12?: ローカルイベントかどうか
		                ];
		            case "message":
		                var message = e;
		                playerId = preservePlayer && message.player ? (_f = message.player.id) !== null && _f !== void 0 ? _f : null : this._playerId;
		                return [
		                    32 /* pl.EventCode.Message */,
		                    message.eventFlags,
		                    playerId,
		                    message.data,
		                    !!message.local //       4?: ローカル
		                ];
		            case "operation":
		                var op = e;
		                playerId = preservePlayer && op.player ? (_g = op.player.id) !== null && _g !== void 0 ? _g : null : this._playerId;
		                return [
		                    64 /* pl.EventCode.Operation */,
		                    op.eventFlags,
		                    playerId,
		                    op.code,
		                    op.data,
		                    !!op.local //              5?: ローカル
		                ];
		            default:
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Unknown type: " + e.type);
		        }
		    };
		    EventConverter.prototype.makePlaylogOperationEvent = function (op) {
		        var playerId = this._playerId;
		        var eventFlags = op.priority != null ? op.priority & 3 /* pl.EventFlagsMask.Priority */ : 0;
		        return [
		            64 /* pl.EventCode.Operation */,
		            eventFlags,
		            playerId,
		            op._code,
		            op.data,
		            !!op.local //              5: ローカル
		        ];
		    };
		    return EventConverter;
		}());
		EventConverter.EventConverter = EventConverter$1;
		
		return EventConverter;
	}

	var EventFilter = {};

	var hasRequiredEventFilter;

	function requireEventFilter () {
		if (hasRequiredEventFilter) return EventFilter;
		hasRequiredEventFilter = 1;
		Object.defineProperty(EventFilter, "__esModule", { value: true });
		
		return EventFilter;
	}

	var EventFilterController = {};

	var hasRequiredEventFilterController;

	function requireEventFilterController () {
		if (hasRequiredEventFilterController) return EventFilterController;
		hasRequiredEventFilterController = 1;
		Object.defineProperty(EventFilterController, "__esModule", { value: true });
		
		return EventFilterController;
	}

	var EventIndex = {};

	var hasRequiredEventIndex;

	function requireEventIndex () {
		if (hasRequiredEventIndex) return EventIndex;
		hasRequiredEventIndex = 1;
		Object.defineProperty(EventIndex, "__esModule", { value: true });
		
		return EventIndex;
	}

	var EventPriority = {};

	var hasRequiredEventPriority;

	function requireEventPriority () {
		if (hasRequiredEventPriority) return EventPriority;
		hasRequiredEventPriority = 1;
		Object.defineProperty(EventPriority, "__esModule", { value: true });
		
		return EventPriority;
	}

	var GameMainParameterObject = {};

	var hasRequiredGameMainParameterObject;

	function requireGameMainParameterObject () {
		if (hasRequiredGameMainParameterObject) return GameMainParameterObject;
		hasRequiredGameMainParameterObject = 1;
		Object.defineProperty(GameMainParameterObject, "__esModule", { value: true });
		
		return GameMainParameterObject;
	}

	var InternalOperationPluginInfo = {};

	var hasRequiredInternalOperationPluginInfo;

	function requireInternalOperationPluginInfo () {
		if (hasRequiredInternalOperationPluginInfo) return InternalOperationPluginInfo;
		hasRequiredInternalOperationPluginInfo = 1;
		Object.defineProperty(InternalOperationPluginInfo, "__esModule", { value: true });
		
		return InternalOperationPluginInfo;
	}

	var LocalTickModeString = {};

	var hasRequiredLocalTickModeString;

	function requireLocalTickModeString () {
		if (hasRequiredLocalTickModeString) return LocalTickModeString;
		hasRequiredLocalTickModeString = 1;
		Object.defineProperty(LocalTickModeString, "__esModule", { value: true });
		
		return LocalTickModeString;
	}

	var ModuleManager = {};

	var RequireCachedValue = {};

	var hasRequiredRequireCachedValue;

	function requireRequireCachedValue () {
		if (hasRequiredRequireCachedValue) return RequireCachedValue;
		hasRequiredRequireCachedValue = 1;
		Object.defineProperty(RequireCachedValue, "__esModule", { value: true });
		RequireCachedValue.RequireCachedValue = void 0;
		var RequireCachedValue$1 = /** @class */ (function () {
		    function RequireCachedValue(value) {
		        this._value = value;
		    }
		    /**
		     * @private
		     */
		    RequireCachedValue.prototype._cachedValue = function () {
		        return this._value;
		    };
		    return RequireCachedValue;
		}());
		RequireCachedValue.RequireCachedValue = RequireCachedValue$1;
		
		return RequireCachedValue;
	}

	var ScriptAssetContext = {};

	var hasRequiredScriptAssetContext;

	function requireScriptAssetContext () {
		if (hasRequiredScriptAssetContext) return ScriptAssetContext;
		hasRequiredScriptAssetContext = 1;
		Object.defineProperty(ScriptAssetContext, "__esModule", { value: true });
		ScriptAssetContext.ScriptAssetContext = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		/**
		 * `ScriptAsset` の実行コンテキスト。
		 * 通常スクリプトアセットを実行するためにはこのクラスを経由する。
		 *
		 * ゲーム開発者がこのクラスを利用する必要はない。
		 * スクリプトアセットを実行する場合は、暗黙にこのクラスを利用する `require()` を用いること。
		 */
		var ScriptAssetContext$1 = /** @class */ (function () {
		    function ScriptAssetContext(asset, module) {
		        this._asset = asset;
		        this._module = module;
		        this._started = false;
		    }
		    /**
		     * @private
		     */
		    ScriptAssetContext.prototype._cachedValue = function () {
		        if (!this._started)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("ScriptAssetContext#_cachedValue: not executed yet.");
		        return this._module.exports;
		    };
		    /**
		     * @private
		     */
		    ScriptAssetContext.prototype._executeScript = function (currentModule) {
		        if (this._started)
		            return this._module.exports;
		        if (currentModule) {
		            // Node.js 互換挙動: Module#parent は一番最初に require() した module になる
		            this._module.parent = currentModule;
		            // Node.js 互換挙動: 親 module の children には自身が実行中の段階で既に追加されている
		            currentModule.children.push(this._module);
		        }
		        this._started = true;
		        this._asset.execute(this._module._runtimeValue);
		        this._module.loaded = true;
		        return this._module.exports;
		    };
		    return ScriptAssetContext;
		}());
		ScriptAssetContext.ScriptAssetContext = ScriptAssetContext$1;
		
		return ScriptAssetContext;
	}

	var hasRequiredModuleManager;

	function requireModuleManager () {
		if (hasRequiredModuleManager) return ModuleManager;
		hasRequiredModuleManager = 1;
		Object.defineProperty(ModuleManager, "__esModule", { value: true });
		ModuleManager.ModuleManager = void 0;
		var PathUtil_1 = requirePathUtil();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var Module_1 = requireModule();
		var RequireCachedValue_1 = requireRequireCachedValue();
		var ScriptAssetContext_1 = requireScriptAssetContext();
		/**
		 * `Module` を管理するクラス。
		 * このクラスのインスタンスは `Game` に一つ存在し、スクリプトアセットの require() の解決に利用される。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 */
		var ModuleManager$1 = /** @class */ (function () {
		    function ModuleManager(runtimeBase, assetManager) {
		        this._assetManager = assetManager;
		        this._runtimeValueBase = runtimeBase;
		        this._scriptCaches = {};
		    }
		    /**
		     * エンジン内部で利用する _require() を wrap した関数
		     *
		     * 引数の仕様については `_require()` の仕様を参照のこと。
		     * _require() の戻り値で __esModule が真の場合に戻り値の .default を返す。
		     * 現状 Akashic Engine では ESM を扱えていない。そのため、対象の __esModule を参照し .default を返すことで、
		     * TypeScript/Babel 向けの簡易対応とし exports.default を扱えるようにしている。
		     * 通常、ゲーム開発者がこのメソッドを利用する必要はない。
		     *
		     * @ignore
		     */
		    ModuleManager.prototype._internalRequire = function (path, currentModule) {
		        var module = this._require(path, currentModule);
		        return module.__esModule ? module.default : module;
		    };
		    /**
		     * node.js の require() ライクな読み込み処理を行い、その結果を返す。
		     *
		     * node.jsのrequireに限りなく近いモデルでrequireする。
		     * ただしアセットIDで該当すればそちらを優先する。また node.js のコアモジュールには対応していない。
		     * 通常、ゲーム開発者が利用するのは `Module#require()` であり、このメソッドはその内部実装を提供する。
		     *
		     * @ignore
		     * @param path requireのパス。相対パスと、Asset識別名を利用することが出来る。
		     *              なお、./xxx.json のようにjsonを指定する場合、そのAssetはTextAssetである必要がある。
		     *              その他の形式である場合、そのAssetはScriptAssetである必要がある。
		     * @param currentModule このrequireを実行した Module
		     * @returns {any} スクリプト実行結果。通常はScriptAsset#executeの結果。
		     *                 例外的に、jsonであればTextAsset#dataをJSON.parseした結果が返る
		     */
		    ModuleManager.prototype._require = function (path, currentModule) {
		        // Node.js の require の挙動については http://nodejs.jp/nodejs.org_ja/api/modules.html も参照。
		        var _this = this;
		        var targetScriptAsset;
		        var resolvedPath;
		        var liveAssetVirtualPathTable = this._assetManager._liveAssetVirtualPathTable;
		        var moduleMainScripts = this._assetManager._moduleMainScripts;
		        // 0. アセットIDらしい場合はまず当該アセットを探す
		        if (path.indexOf("/") === -1) {
		            if (this._assetManager._assets.hasOwnProperty(path)) {
		                targetScriptAsset = this._assetManager._assets[path];
		                resolvedPath = this._assetManager._liveAssetPathTable[targetScriptAsset.path];
		            }
		        }
		        if (!resolvedPath) {
		            resolvedPath = this._resolvePath(path, currentModule);
		            // 戻り値は先頭に "/" が付くので削除している。( moduleMainScripts を参照して返される値には先頭に "/" は付かない)
		            if (/^\//.test(resolvedPath))
		                resolvedPath = resolvedPath.slice(1);
		        }
		        if (this._scriptCaches.hasOwnProperty(resolvedPath)) {
		            return this._scriptCaches[resolvedPath]._cachedValue();
		        }
		        // akashic-engine独自仕様: 対象の `path` が `moduleMainScripts` に指定されていたらそちらを参照する
		        if (moduleMainScripts[path]) {
		            targetScriptAsset = liveAssetVirtualPathTable[resolvedPath];
		        }
		        else {
		            targetScriptAsset = this._findAssetByPathAsFile(resolvedPath, liveAssetVirtualPathTable);
		        }
		        if (targetScriptAsset) {
		            // @ts-ignore
		            if (this._scriptCaches.hasOwnProperty(resolvedPath))
		                return this._scriptCaches[resolvedPath]._cachedValue();
		            if (targetScriptAsset.type === "script") {
		                var module = new Module_1.Module({
		                    runtimeValueBase: this._runtimeValueBase,
		                    id: targetScriptAsset.id,
		                    path: targetScriptAsset.path,
		                    virtualPath: this._assetManager._liveAssetPathTable[targetScriptAsset.path],
		                    requireFunc: function (path, mod) { return _this._require(path, mod); },
		                    resolveFunc: function (path, mod) { return _this._resolvePath(path, mod); }
		                });
		                var script = new ScriptAssetContext_1.ScriptAssetContext(targetScriptAsset, module);
		                // @ts-ignore
		                this._scriptCaches[resolvedPath] = script;
		                return script._executeScript(currentModule);
		            }
		            else if (targetScriptAsset.type === "text") {
		                // JSONの場合の特殊挙動をトレースするためのコード。node.jsの仕様に準ずる
		                if (targetScriptAsset && PathUtil_1.PathUtil.resolveExtname(path) === ".json") {
		                    // Note: node.jsではここでBOMの排除をしているが、いったんakashicでは排除しないで実装
		                    // @ts-ignore
		                    var cache = (this._scriptCaches[resolvedPath] = new RequireCachedValue_1.RequireCachedValue(JSON.parse(targetScriptAsset.data)));
		                    return cache._cachedValue();
		                }
		            }
		        }
		        throw ExceptionFactory_1.ExceptionFactory.createAssertionError("g._require: can not find module: " + path);
		    };
		    /**
		     * 対象のモジュールからの相対パスを、 game.json のディレクトリをルート (`/`) とする `/` 区切りの絶対パス形式として解決する。
		     * `this._require()` と違い `path` にアセットIDが指定されても解決しない点に注意。
		     * 通常、ゲーム開発者が利用するのは `require.resolve()` であり、このメソッドはその内部実装を提供する。
		     *
		     * @ignore
		     * @param path resolve する対象のパス。相対パスを利用することができる。
		     * @param currentModule この require を実行した Module 。
		     * @returns {string} 絶対パス
		     */
		    ModuleManager.prototype._resolvePath = function (path, currentModule) {
		        var resolvedPath = null;
		        var liveAssetVirtualPathTable = this._assetManager._liveAssetVirtualPathTable;
		        var moduleMainScripts = this._assetManager._moduleMainScripts;
		        // require(X) from module at path Y
		        // 1. If X is a core module,
		        // (何もしない。コアモジュールには対応していない。ゲーム開発者は自分でコアモジュールへの依存を解決する必要がある)
		        if (/^\.\/|^\.\.\/|^\//.test(path)) {
		            // 2. If X begins with './' or '/' or '../'
		            if (currentModule) {
		                if (!currentModule._virtualDirname) {
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("g._require.resolve: couldn't resolve the moudle path without virtualPath");
		                }
		                resolvedPath = PathUtil_1.PathUtil.resolvePath(currentModule._virtualDirname, path);
		            }
		            else {
		                if (!/^\.\//.test(path)) {
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("g._require.resolve: entry point path must start with './'");
		                }
		                resolvedPath = path.substring(2);
		            }
		            // 2.a. LOAD_AS_FILE(Y + X)
		            var targetPath = this._resolveAbsolutePathAsFile(resolvedPath, liveAssetVirtualPathTable);
		            if (targetPath) {
		                return targetPath;
		            }
		            // 2.b. LOAD_AS_DIRECTORY(Y + X)
		            targetPath = this._resolveAbsolutePathAsDirectory(resolvedPath, liveAssetVirtualPathTable);
		            if (targetPath) {
		                return targetPath;
		            }
		        }
		        else {
		            // 3. LOAD_NODE_MODULES(X, dirname(Y))
		            // akashic-engine独自仕様: 対象の `path` が `moduleMainScripts` に指定されていたらそちらを返す
		            if (moduleMainScripts[path]) {
		                return moduleMainScripts[path];
		            }
		            // 3.a LOAD_NODE_MODULES(X, START)
		            var dirs = currentModule ? currentModule.paths.concat() : [];
		            dirs.push("node_modules");
		            for (var i = 0; i < dirs.length; ++i) {
		                var dir = dirs[i];
		                var targetPath = PathUtil_1.PathUtil.resolvePath(dir, path);
		                resolvedPath = this._resolveAbsolutePathAsFile(targetPath, liveAssetVirtualPathTable);
		                if (resolvedPath) {
		                    return resolvedPath;
		                }
		                resolvedPath = this._resolveAbsolutePathAsDirectory(targetPath, liveAssetVirtualPathTable);
		                if (resolvedPath) {
		                    return resolvedPath;
		                }
		            }
		        }
		        throw ExceptionFactory_1.ExceptionFactory.createAssertionError("g._require.resolve: couldn't resolve the path: " + path);
		    };
		    /**
		     * 与えられたパス文字列がファイルパスであると仮定して、対応するアセットを探す。
		     * 見つかった場合そのアセットを、そうでない場合 `undefined` を返す。
		     * 通常、ゲーム開発者がファイルパスを扱うことはなく、このメソッドを呼び出す必要はない。
		     *
		     * @ignore
		     * @param resolvedPath パス文字列
		     * @param liveAssetPathTable パス文字列のプロパティに対応するアセットを格納したオブジェクト
		     */
		    ModuleManager.prototype._findAssetByPathAsFile = function (resolvedPath, liveAssetPathTable) {
		        if (liveAssetPathTable.hasOwnProperty(resolvedPath))
		            return liveAssetPathTable[resolvedPath];
		        if (liveAssetPathTable.hasOwnProperty(resolvedPath + ".js"))
		            return liveAssetPathTable[resolvedPath + ".js"];
		        return undefined;
		    };
		    /**
		     * 与えられたパス文字列がファイルパスであると仮定して、対応するアセットの絶対パスを解決する。
		     * アセットが存在した場合はそのパスを、そうでない場合 `null` を返す。
		     * 通常、ゲーム開発者がファイルパスを扱うことはなく、このメソッドを呼び出す必要はない。
		     *
		     * @ignore
		     * @param resolvedPath パス文字列
		     * @param liveAssetPathTable パス文字列のプロパティに対応するアセットを格納したオブジェクト
		     */
		    ModuleManager.prototype._resolveAbsolutePathAsFile = function (resolvedPath, liveAssetPathTable) {
		        if (liveAssetPathTable.hasOwnProperty(resolvedPath))
		            return "/" + resolvedPath;
		        if (liveAssetPathTable.hasOwnProperty(resolvedPath + ".js"))
		            return "/" + resolvedPath + ".js";
		        return null;
		    };
		    /**
		     * 与えられたパス文字列がディレクトリパスであると仮定して、対応するアセットの絶対パスを解決する。
		     * アセットが存在した場合はそのパスを、そうでない場合 `null` を返す。
		     * 通常、ゲーム開発者がファイルパスを扱うことはなく、このメソッドを呼び出す必要はない。
		     * ディレクトリ内に package.json が存在する場合、package.json 自体もアセットとして
		     * `liveAssetPathTable` から参照可能でなければならないことに注意。
		     *
		     * @ignore
		     * @param resolvedPath パス文字列
		     * @param liveAssetPathTable パス文字列のプロパティに対応するアセットを格納したオブジェクト
		     */
		    ModuleManager.prototype._resolveAbsolutePathAsDirectory = function (resolvedPath, liveAssetPathTable) {
		        var path = resolvedPath + "/package.json";
		        var asset = liveAssetPathTable[path];
		        // liveAssetPathTable[path] != null だけではpathと同名のprototypeプロパティがある場合trueになってしまうので hasOwnProperty() を利用
		        if (liveAssetPathTable.hasOwnProperty(path) && asset.type === "text") {
		            var pkg = JSON.parse(asset.data);
		            if (pkg && typeof pkg.main === "string") {
		                var targetPath = this._resolveAbsolutePathAsFile(PathUtil_1.PathUtil.resolvePath(resolvedPath, pkg.main), liveAssetPathTable);
		                if (targetPath) {
		                    return targetPath;
		                }
		            }
		        }
		        path = resolvedPath + "/index.js";
		        if (liveAssetPathTable.hasOwnProperty(path)) {
		            return "/" + path;
		        }
		        return null;
		    };
		    return ModuleManager;
		}());
		ModuleManager.ModuleManager = ModuleManager$1;
		
		return ModuleManager;
	}

	var NinePatchSurfaceEffector = {};

	var hasRequiredNinePatchSurfaceEffector;

	function requireNinePatchSurfaceEffector () {
		if (hasRequiredNinePatchSurfaceEffector) return NinePatchSurfaceEffector;
		hasRequiredNinePatchSurfaceEffector = 1;
		Object.defineProperty(NinePatchSurfaceEffector, "__esModule", { value: true });
		NinePatchSurfaceEffector.NinePatchSurfaceEffector = void 0;
		var SurfaceUtil_1 = requireSurfaceUtil();
		/**
		 * ナインパッチによる描画処理を提供するSurfaceEffector。
		 *
		 * このSurfaceEffectorは、画像素材の拡大・縮小において「枠」の表現を実現するものである。
		 * 画像の上下左右の「枠」部分の幅・高さを渡すことで、上下の「枠」を縦に引き延ばすことなく、
		 * また左右の「枠」を横に引き延ばすことなく画像を任意サイズに拡大・縮小できる。
		 * ゲームにおけるメッセージウィンドウやダイアログの表現に利用することを想定している。
		 *
		 * @deprecated 非推奨である。将来的に削除される。代わりに `SurfaceUtil#drawNinePatch()` を利用すること。
		 */
		var NinePatchSurfaceEffector$1 = /** @class */ (function () {
		    /**
		     * `NinePatchSurfaceEffector` のインスタンスを生成する。
		     * @deprecated 非推奨である。将来的に削除される。代わりに `SurfaceUtil#drawNinePatch()` を利用すること。
		     * @param game このインスタンスが属する `Game`。
		     * @param borderWidth 上下左右の「拡大しない」領域の大きさ。すべて同じ値なら数値一つを渡すことができる。省略された場合、 `4`
		     */
		    function NinePatchSurfaceEffector(game, borderWidth) {
		        if (borderWidth === void 0) { borderWidth = 4; }
		        this.game = game;
		        if (typeof borderWidth === "number") {
		            this.borderWidth = {
		                top: borderWidth,
		                bottom: borderWidth,
		                left: borderWidth,
		                right: borderWidth
		            };
		        }
		        else {
		            this.borderWidth = borderWidth;
		        }
		    }
		    /**
		     * 指定の大きさに拡大・縮小した描画結果の `Surface` を生成して返す。詳細は `SurfaceEffector#render` の項を参照。
		     */
		    NinePatchSurfaceEffector.prototype.render = function (srcSurface, width, height) {
		        if (!this._surface || this._surface.width !== width || this._surface.height !== height || this._beforeSrcSurface !== srcSurface) {
		            this._surface = this.game.resourceFactory.createSurface(Math.ceil(width), Math.ceil(height));
		            this._beforeSrcSurface = srcSurface;
		        }
		        SurfaceUtil_1.SurfaceUtil.drawNinePatch(this._surface, srcSurface, this.borderWidth);
		        return this._surface;
		    };
		    return NinePatchSurfaceEffector;
		}());
		NinePatchSurfaceEffector.NinePatchSurfaceEffector = NinePatchSurfaceEffector$1;
		
		return NinePatchSurfaceEffector;
	}

	var OperationPlugin = {};

	var hasRequiredOperationPlugin;

	function requireOperationPlugin () {
		if (hasRequiredOperationPlugin) return OperationPlugin;
		hasRequiredOperationPlugin = 1;
		Object.defineProperty(OperationPlugin, "__esModule", { value: true });
		
		return OperationPlugin;
	}

	var OperationPluginManager = {};

	var hasRequiredOperationPluginManager;

	function requireOperationPluginManager () {
		if (hasRequiredOperationPluginManager) return OperationPluginManager;
		hasRequiredOperationPluginManager = 1;
		var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
		    __assign = Object.assign || function(t) {
		        for (var s, i = 1, n = arguments.length; i < n; i++) {
		            s = arguments[i];
		            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
		                t[p] = s[p];
		        }
		        return t;
		    };
		    return __assign.apply(this, arguments);
		};
		Object.defineProperty(OperationPluginManager, "__esModule", { value: true });
		OperationPluginManager.OperationPluginManager = void 0;
		var trigger_1 = requireCjs();
		/**
		 * 操作プラグインからの通知をハンドルするクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 * @ignore
		 */
		var OperationHandler = /** @class */ (function () {
		    function OperationHandler(code, owner, handler) {
		        this._code = code;
		        this._handler = handler;
		        this._handlerOwner = owner;
		    }
		    OperationHandler.prototype.onOperation = function (op) {
		        var iop;
		        if (op instanceof Array) {
		            iop = { _code: this._code, data: op };
		        }
		        else {
		            iop = __assign({ _code: this._code }, op);
		        }
		        this._handler.call(this._handlerOwner, iop);
		    };
		    return OperationHandler;
		}());
		/**
		 * 操作プラグインを管理するクラス。
		 * 通常は game.json の `operationPlugins` フィールドを基に自動的に初期化される他、
		 * ゲーム開発者は本クラスを用いて直接操作プラグインを登録することもできる。
		 * 詳細は `this.register()` のコメントを参照。
		 *
		 * 本クラスのインスタンスをゲーム開発者が直接生成することない。
		 */
		var OperationPluginManager$1 = /** @class */ (function () {
		    function OperationPluginManager(game, viewInfo) {
		        this.onOperate = new trigger_1.Trigger();
		        this.operated = this.onOperate;
		        this.plugins = {};
		        this._game = game;
		        this._viewInfo = viewInfo;
		    }
		    /**
		     * 操作プラグインを手動で登録する。
		     * このメソッドを利用する場合、game.json の `operationPlugins` フィールドから該当の定義を省略する必要がある。
		     * 登録後、ゲーム開発者自身で `OperationPluginManager#start()` を呼び出さなければならない点に注意。
		     * @param pluginClass new 可能な操作プラグインの実態
		     * @param code 操作プラグインの識別コード
		     * @param option 操作プラグインのコンストラクタに渡すパラメータ
		     */
		    OperationPluginManager.prototype.register = function (pluginClass, code, option) {
		        return this._instantiateOperationPlugin(pluginClass, code, option);
		    };
		    /**
		     * 対象の操作プラグインを開始する。
		     * @param code 操作プラグインの識別コード
		     */
		    OperationPluginManager.prototype.start = function (code) {
		        var plugin = this.plugins[code];
		        if (!plugin)
		            return;
		        plugin.start();
		    };
		    /**
		     * 対象の操作プラグインを終了する。
		     * @param code 操作プラグインの識別コード
		     */
		    OperationPluginManager.prototype.stop = function (code) {
		        var plugin = this.plugins[code];
		        if (!plugin)
		            return;
		        plugin.stop();
		    };
		    OperationPluginManager.prototype.destroy = function () {
		        this.stopAll();
		        this.onOperate.destroy();
		        this.onOperate = undefined;
		        this.operated = undefined;
		        this.plugins = undefined;
		        this._game = undefined;
		        this._viewInfo = undefined;
		    };
		    OperationPluginManager.prototype.reset = function () {
		        this.stopAll();
		        this.onOperate.removeAll();
		        this.plugins = {};
		    };
		    OperationPluginManager.prototype.stopAll = function () {
		        for (var code in this.plugins) {
		            if (!this.plugins.hasOwnProperty(code))
		                continue;
		            var plugin = this.plugins[code];
		            if (plugin)
		                plugin.stop();
		        }
		    };
		    OperationPluginManager.prototype._instantiateOperationPlugin = function (pluginClass, code, option) {
		        if (!pluginClass.isSupported()) {
		            return;
		        }
		        if (this.plugins[code]) {
		            throw new Error("Plugin#code conflicted for code: ".concat(code));
		        }
		        var plugin = new pluginClass(this._game, this._viewInfo, option);
		        this.plugins[code] = plugin;
		        var handler = new OperationHandler(code, this.onOperate, this.onOperate.fire);
		        plugin.operationTrigger.add(handler.onOperation, handler);
		        return plugin;
		    };
		    return OperationPluginManager;
		}());
		OperationPluginManager.OperationPluginManager = OperationPluginManager$1;
		
		return OperationPluginManager;
	}

	var OperationPluginOperation = {};

	var hasRequiredOperationPluginOperation;

	function requireOperationPluginOperation () {
		if (hasRequiredOperationPluginOperation) return OperationPluginOperation;
		hasRequiredOperationPluginOperation = 1;
		Object.defineProperty(OperationPluginOperation, "__esModule", { value: true });
		
		return OperationPluginOperation;
	}

	var OperationPluginStatic = {};

	var hasRequiredOperationPluginStatic;

	function requireOperationPluginStatic () {
		if (hasRequiredOperationPluginStatic) return OperationPluginStatic;
		hasRequiredOperationPluginStatic = 1;
		Object.defineProperty(OperationPluginStatic, "__esModule", { value: true });
		
		return OperationPluginStatic;
	}

	var Player = {};

	var hasRequiredPlayer;

	function requirePlayer () {
		if (hasRequiredPlayer) return Player;
		hasRequiredPlayer = 1;
		Object.defineProperty(Player, "__esModule", { value: true });
		
		return Player;
	}

	var PointEventResolver = {};

	var hasRequiredPointEventResolver;

	function requirePointEventResolver () {
		if (hasRequiredPointEventResolver) return PointEventResolver;
		hasRequiredPointEventResolver = 1;
		Object.defineProperty(PointEventResolver, "__esModule", { value: true });
		PointEventResolver.PointEventResolver = void 0;
		/**
		 * PlatformPointEventからg.Eventへの変換機構。
		 *
		 * ほぼ座標しか持たないPlatformPointEventに対して、g.Point(Down|Move|Up)Eventはその座標にあるエンティティや、
		 * (g.Point(Move|Up)Eventの場合)g.PointDownEventからの座標の差分を持っている。
		 * それらの足りない情報を管理・追加して、PlatformPointEventをg.Eventに変換するクラス。
		 * Platform実装はpointDown()なしでpointMove()を呼び出してくることも考えられるため、
		 * Down -> Move -> Up の流れを保証する機能も持つ。
		 *
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 * @ignore
		 */
		var PointEventResolver$1 = /** @class */ (function () {
		    function PointEventResolver(param) {
		        var _a;
		        this._currentPoints = 0;
		        // g.Eと関連した座標データ
		        this._pointEventMap = {};
		        this._sourceResolver = param.sourceResolver;
		        this._playerId = param.playerId;
		        this._maxPoints = (_a = param.maxPoints) !== null && _a !== void 0 ? _a : null;
		    }
		    PointEventResolver.prototype.pointDown = function (e) {
		        if (this._maxPoints != null && this._currentPoints >= this._maxPoints) {
		            return null;
		        }
		        var source = this._sourceResolver.findPointSource(e.offset);
		        // @ts-ignore
		        var point = source.point ? source.point : e.offset;
		        // @ts-ignore
		        var targetId = source.target ? source.target.id : undefined;
		        // @ts-ignore
		        var local = source.local;
		        this._pointEventMap[e.identifier] = {
		            targetId: targetId,
		            local: local,
		            point: point,
		            start: { x: e.offset.x, y: e.offset.y },
		            prev: { x: e.offset.x, y: e.offset.y }
		        };
		        this._currentPoints++;
		        // NOTE: 優先度は機械的にJoinedをつけておく。Joinしていない限りPointDownEventなどはリジェクトされる。
		        var ret = [
		            33 /* pl.EventCode.PointDown */,
		            2 /* EventPriority.Joined */,
		            this._playerId,
		            e.identifier,
		            point.x,
		            point.y,
		            targetId,
		            e.button //                7?: ボタンの種類
		        ];
		        if (source && source.local)
		            ret.push(source.local); // 8?: ローカル
		        return ret;
		    };
		    PointEventResolver.prototype.pointMove = function (e) {
		        var holder = this._pointEventMap[e.identifier];
		        if (!holder)
		            return null;
		        var prev = { x: 0, y: 0 };
		        var start = { x: 0, y: 0 };
		        this._pointMoveAndUp(holder, e.offset, prev, start);
		        var ret = [
		            34 /* pl.EventCode.PointMove */,
		            2 /* EventPriority.Joined */,
		            this._playerId,
		            e.identifier,
		            holder.point.x,
		            holder.point.y,
		            start.x,
		            start.y,
		            prev.x,
		            prev.y,
		            holder.targetId,
		            e.button //                11?: ボタンの種類
		        ];
		        if (holder.local)
		            ret.push(holder.local); // 11?: ローカル
		        return ret;
		    };
		    PointEventResolver.prototype.pointUp = function (e) {
		        var holder = this._pointEventMap[e.identifier];
		        if (!holder)
		            return null;
		        var prev = { x: 0, y: 0 };
		        var start = { x: 0, y: 0 };
		        this._pointMoveAndUp(holder, e.offset, prev, start);
		        delete this._pointEventMap[e.identifier];
		        this._currentPoints--;
		        var ret = [
		            35 /* pl.EventCode.PointUp */,
		            2 /* EventPriority.Joined */,
		            this._playerId,
		            e.identifier,
		            holder.point.x,
		            holder.point.y,
		            start.x,
		            start.y,
		            prev.x,
		            prev.y,
		            holder.targetId,
		            e.button //              11?: ボタンの種類
		        ];
		        if (holder.local)
		            ret.push(holder.local); // 11?: ローカル
		        return ret;
		    };
		    PointEventResolver.prototype._pointMoveAndUp = function (holder, offset, prevDelta, startDelta) {
		        startDelta.x = offset.x - holder.start.x;
		        startDelta.y = offset.y - holder.start.y;
		        prevDelta.x = offset.x - holder.prev.x;
		        prevDelta.y = offset.y - holder.prev.y;
		        holder.prev.x = offset.x;
		        holder.prev.y = offset.y;
		    };
		    return PointEventResolver;
		}());
		PointEventResolver.PointEventResolver = PointEventResolver$1;
		
		return PointEventResolver;
	}

	var RandomGenerator = {};

	var hasRequiredRandomGenerator;

	function requireRandomGenerator () {
		if (hasRequiredRandomGenerator) return RandomGenerator;
		hasRequiredRandomGenerator = 1;
		Object.defineProperty(RandomGenerator, "__esModule", { value: true });
		RandomGenerator.RandomGenerator = void 0;
		/**
		 * 乱数生成器。
		 * `RandomGenerator#get()` によって、新しい乱数を生成することができる。
		 */
		var RandomGenerator$1 = /** @class */ (function () {
		    function RandomGenerator(seed) {
		        this.seed = seed;
		    }
		    return RandomGenerator;
		}());
		RandomGenerator.RandomGenerator = RandomGenerator$1;
		
		return RandomGenerator;
	}

	var Require = {};

	var hasRequiredRequire;

	function requireRequire () {
		if (hasRequiredRequire) return Require;
		hasRequiredRequire = 1;
		Object.defineProperty(Require, "__esModule", { value: true });
		
		return Require;
	}

	var RequireCacheable = {};

	var hasRequiredRequireCacheable;

	function requireRequireCacheable () {
		if (hasRequiredRequireCacheable) return RequireCacheable;
		hasRequiredRequireCacheable = 1;
		Object.defineProperty(RequireCacheable, "__esModule", { value: true });
		
		return RequireCacheable;
	}

	var SnapshotSaveRequest = {};

	var hasRequiredSnapshotSaveRequest;

	function requireSnapshotSaveRequest () {
		if (hasRequiredSnapshotSaveRequest) return SnapshotSaveRequest;
		hasRequiredSnapshotSaveRequest = 1;
		Object.defineProperty(SnapshotSaveRequest, "__esModule", { value: true });
		
		return SnapshotSaveRequest;
	}

	var SpriteFactory = {};

	var hasRequiredSpriteFactory;

	function requireSpriteFactory () {
		if (hasRequiredSpriteFactory) return SpriteFactory;
		hasRequiredSpriteFactory = 1;
		Object.defineProperty(SpriteFactory, "__esModule", { value: true });
		SpriteFactory.SpriteFactory = void 0;
		var Sprite_1 = requireSprite();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var SpriteFactory$1 = /** @class */ (function () {
		    function SpriteFactory() {
		    }
		    /**
		     * e の描画内容を持つ Sprite を生成する。
		     * @param scene 作成したSpriteを登録するScene
		     * @param e Sprite化したいE
		     * @param camera 使用カメラ
		     */
		    SpriteFactory.createSpriteFromE = function (scene, e, camera) {
		        var oldX = e.x;
		        var oldY = e.y;
		        var x = 0;
		        var y = 0;
		        var width = e.width;
		        var height = e.height;
		        var boundingRect = e.calculateBoundingRect();
		        if (!boundingRect) {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("SpriteFactory.createSpriteFromE: camera must look e");
		        }
		        width = boundingRect.right - boundingRect.left;
		        height = boundingRect.bottom - boundingRect.top;
		        if (boundingRect.left < e.x)
		            x = e.x - boundingRect.left;
		        if (boundingRect.top < e.y)
		            y = e.y - boundingRect.top;
		        e.moveTo(x, y);
		        // 再描画フラグを立てたくないために e._matrix を直接触っている
		        if (e._matrix)
		            e._matrix._modified = true;
		        var surface = scene.game.resourceFactory.createSurface(Math.ceil(width), Math.ceil(height));
		        var renderer = surface.renderer();
		        renderer.begin();
		        e.render(renderer, camera);
		        renderer.end();
		        var s = new Sprite_1.Sprite({
		            scene: scene,
		            src: surface,
		            width: width,
		            height: height
		        });
		        s.moveTo(boundingRect.left, boundingRect.top);
		        e.moveTo(oldX, oldY);
		        if (e._matrix)
		            e._matrix._modified = true;
		        return s;
		    };
		    /**
		     * scene の描画内容を持つ Sprite を生成する。
		     * @param toScene 作ったSpriteを登録するScene
		     * @param fromScene Sprite化したいScene
		     * @param camera 使用カメラ
		     */
		    SpriteFactory.createSpriteFromScene = function (toScene, fromScene, camera) {
		        var surface = toScene.game.resourceFactory.createSurface(Math.ceil(fromScene.game.width), Math.ceil(fromScene.game.height));
		        var renderer = surface.renderer();
		        renderer.begin();
		        var children = fromScene.children;
		        for (var i = 0; i < children.length; ++i)
		            children[i].render(renderer, camera);
		        renderer.end();
		        return new Sprite_1.Sprite({
		            scene: toScene,
		            src: surface,
		            width: fromScene.game.width,
		            height: fromScene.game.height
		        });
		    };
		    return SpriteFactory;
		}());
		SpriteFactory.SpriteFactory = SpriteFactory$1;
		
		return SpriteFactory;
	}

	var SurfaceEffector = {};

	var hasRequiredSurfaceEffector;

	function requireSurfaceEffector () {
		if (hasRequiredSurfaceEffector) return SurfaceEffector;
		hasRequiredSurfaceEffector = 1;
		Object.defineProperty(SurfaceEffector, "__esModule", { value: true });
		
		return SurfaceEffector;
	}

	var TextAlignString = {};

	var hasRequiredTextAlignString;

	function requireTextAlignString () {
		if (hasRequiredTextAlignString) return TextAlignString;
		hasRequiredTextAlignString = 1;
		Object.defineProperty(TextAlignString, "__esModule", { value: true });
		
		return TextAlignString;
	}

	var TextMetrics = {};

	var hasRequiredTextMetrics;

	function requireTextMetrics () {
		if (hasRequiredTextMetrics) return TextMetrics;
		hasRequiredTextMetrics = 1;
		Object.defineProperty(TextMetrics, "__esModule", { value: true });
		
		return TextMetrics;
	}

	var TickGenerationModeString = {};

	var hasRequiredTickGenerationModeString;

	function requireTickGenerationModeString () {
		if (hasRequiredTickGenerationModeString) return TickGenerationModeString;
		hasRequiredTickGenerationModeString = 1;
		Object.defineProperty(TickGenerationModeString, "__esModule", { value: true });
		
		return TickGenerationModeString;
	}

	var Xorshift = {};

	var hasRequiredXorshift;

	function requireXorshift () {
		if (hasRequiredXorshift) return Xorshift;
		hasRequiredXorshift = 1;
		// Copyright (c) 2014 Andreas Madsen & Emil Bay
		// From https://github.com/AndreasMadsen/xorshift
		// https://github.com/AndreasMadsen/xorshift/blob/master/LICENSE.md
		// Arranged by DWANGO Co., Ltd.
		Object.defineProperty(Xorshift, "__esModule", { value: true });
		Xorshift.Xorshift = void 0;
		var Xorshift$1 = /** @class */ (function () {
		    function Xorshift(seed) {
		        var seeds = Array.isArray(seed) ? seed : this.generateSeeds(seed);
		        this._state0U = seeds[0] | 0;
		        this._state0L = seeds[1] | 0;
		        this._state1U = seeds[2] | 0;
		        this._state1L = seeds[3] | 0;
		    }
		    Xorshift.deserialize = function (ser) {
		        var ret = new Xorshift([ser._state0U, ser._state0L, ser._state1U, ser._state1L]);
		        return ret;
		    };
		    Xorshift.prototype.initState = function (seed) {
		        var seeds = this.generateSeeds(seed);
		        this._state0L = seeds[0] | 0;
		        this._state0U = seeds[1] | 0;
		        this._state1L = seeds[2] | 0;
		        this._state1U = seeds[3] | 0;
		    };
		    Xorshift.prototype.randomInt = function () {
		        var s1U = this._state0U;
		        var s1L = this._state0L;
		        var s0U = this._state1U;
		        var s0L = this._state1L;
		        var sumL = (s0L >>> 0) + (s1L >>> 0);
		        var resU = (s0U + s1U + ((sumL / 2) >>> 31)) >>> 0;
		        var resL = sumL >>> 0;
		        this._state0U = s0U;
		        this._state0L = s0L;
		        var t1U = 0;
		        var t1L = 0;
		        var t2U = 0;
		        var t2L = 0;
		        var a1 = 23;
		        var m1 = 0xffffffff << (32 - a1);
		        t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
		        t1L = s1L << a1;
		        s1U = s1U ^ t1U;
		        s1L = s1L ^ t1L;
		        t1U = s1U ^ s0U;
		        t1L = s1L ^ s0L;
		        var a2 = 18;
		        var m2 = 0xffffffff >>> (32 - a2);
		        t2U = s1U >>> a2;
		        t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
		        t1U = t1U ^ t2U;
		        t1L = t1L ^ t2L;
		        var a3 = 5;
		        var m3 = 0xffffffff >>> (32 - a3);
		        t2U = s0U >>> a3;
		        t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
		        t1U = t1U ^ t2U;
		        t1L = t1L ^ t2L;
		        this._state1U = t1U;
		        this._state1L = t1L;
		        return [resU, resL];
		    };
		    Xorshift.prototype.random = function () {
		        var t2 = this.randomInt();
		        // Math.pow(2, -32) = 2.3283064365386963e-10
		        // Math.pow(2, -52) = 2.220446049250313e-16
		        return t2[0] * 2.3283064365386963e-10 + (t2[1] >>> 12) * 2.220446049250313e-16;
		    };
		    Xorshift.prototype.nextInt = function (min, sup) {
		        return Math.floor(min + this.random() * (sup - min));
		    };
		    Xorshift.prototype.serialize = function () {
		        return {
		            _state0U: this._state0U,
		            _state0L: this._state0L,
		            _state1U: this._state1U,
		            _state1L: this._state1L
		        };
		    };
		    // シード値が1つの場合にどのようにして初期状態を定義するかは特に定まっていない
		    // このコードはロジック的な裏付けは無いが採用例が多いために採用した
		    // 以下採用例
		    // http://meme.biology.tohoku.ac.jp/klabo-wiki/index.php?cmd=read&page=%B7%D7%BB%BB%B5%A1%2FC%2B%2B#y919a7e1
		    // http://hexadrive.sblo.jp/article/63660775.html
		    // http://meme.biology.tohoku.ac.jp/students/iwasaki/cxx/random.html#xorshift
		    Xorshift.prototype.generateSeeds = function (seed) {
		        var factor = 1812433253;
		        seed = factor * (seed ^ (seed >> 30)) + 1;
		        var seed1 = seed;
		        seed = factor * (seed ^ (seed >> 30)) + 2;
		        var seed2 = seed;
		        seed = factor * (seed ^ (seed >> 30)) + 3;
		        var seed3 = seed;
		        seed = factor * (seed ^ (seed >> 30)) + 4;
		        var seed4 = seed;
		        return [seed1, seed2, seed3, seed4];
		    };
		    return Xorshift;
		}());
		Xorshift.Xorshift = Xorshift$1;
		
		return Xorshift;
	}

	var XorshiftRandomGenerator = {};

	var hasRequiredXorshiftRandomGenerator;

	function requireXorshiftRandomGenerator () {
		if (hasRequiredXorshiftRandomGenerator) return XorshiftRandomGenerator;
		hasRequiredXorshiftRandomGenerator = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(XorshiftRandomGenerator, "__esModule", { value: true });
		XorshiftRandomGenerator.XorshiftRandomGenerator = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var RandomGenerator_1 = requireRandomGenerator();
		var Xorshift_1 = requireXorshift();
		/**
		 * Xorshiftを用いた乱数生成期。
		 */
		var XorshiftRandomGenerator$1 = /** @class */ (function (_super) {
		    __extends(XorshiftRandomGenerator, _super);
		    function XorshiftRandomGenerator(seed, xorshift) {
		        var _this = this;
		        if (seed === undefined) {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("XorshiftRandomGenerator#constructor: seed is undefined");
		        }
		        else {
		            _this = _super.call(this, seed) || this;
		            if (!!xorshift) {
		                _this._xorshift = Xorshift_1.Xorshift.deserialize(xorshift);
		            }
		            else {
		                _this._xorshift = new Xorshift_1.Xorshift(seed);
		            }
		        }
		        return _this;
		    }
		    XorshiftRandomGenerator.deserialize = function (ser) {
		        return new XorshiftRandomGenerator(ser._seed, ser._xorshift);
		    };
		    /**
		     * 乱数を生成する。
		     * `min` 以上 `max` 以下の数値を返す。
		     *
		     * @deprecated 非推奨である。将来的に削除される。代わりに `XorshiftRandomGenerator#generate()` を利用すること。
		     */
		    XorshiftRandomGenerator.prototype.get = function (min, max) {
		        return this._xorshift.nextInt(min, max + 1);
		    };
		    /**
		     * 乱数を生成する。
		     * 0 以上 1 未満の数値を返す。
		     *
		     * ローカルイベントの処理中を除き、原則 `Math.random()` ではなくこのメソッドを利用すること。
		     */
		    XorshiftRandomGenerator.prototype.generate = function () {
		        return this._xorshift.random();
		    };
		    XorshiftRandomGenerator.prototype.serialize = function () {
		        return {
		            _seed: this.seed,
		            _xorshift: this._xorshift.serialize()
		        };
		    };
		    return XorshiftRandomGenerator;
		}(RandomGenerator_1.RandomGenerator));
		XorshiftRandomGenerator.XorshiftRandomGenerator = XorshiftRandomGenerator$1;
		
		return XorshiftRandomGenerator;
	}

	var Game = {};

	var hasRequiredGame;

	function requireGame () {
		if (hasRequiredGame) return Game;
		hasRequiredGame = 1;
		Object.defineProperty(Game, "__esModule", { value: true });
		Game.Game = void 0;
		var trigger_1 = requireCjs();
		var AssetManager_1 = requireAssetManager();
		var AudioSystemManager_1 = requireAudioSystemManager();
		var DefaultLoadingScene_1 = requireDefaultLoadingScene();
		var DefaultSkippingScene_1 = requireDefaultSkippingScene();
		var EventConverter_1 = requireEventConverter();
		var ExceptionFactory_1 = requireExceptionFactory$2();
		var LoadingScene_1 = requireLoadingScene();
		var ModuleManager_1 = requireModuleManager();
		var OperationPluginManager_1 = requireOperationPluginManager();
		var PointEventResolver_1 = requirePointEventResolver();
		var Scene_1 = requireScene();
		var SurfaceAtlasSet_1 = requireSurfaceAtlasSet();
		var WeakRefKVS_1 = requireWeakRefKVS();
		var XorshiftRandomGenerator_1 = requireXorshiftRandomGenerator();
		/**
		 * コンテンツそのものを表すクラス。
		 *
		 * 本クラスのインスタンスは暗黙に生成され、ゲーム開発者が生成することはない。
		 * ゲーム開発者は `g.game` によって本クラスのインスタンスを参照できる。
		 *
		 * 本クラスをゲーム開発者が利用するのは以下のようなケースである。
		 * 1. Sceneの生成時、コンストラクタに引数として渡す
		 * 2. Sceneに紐付かないイベント Game#join, Game#leave, Game#playerInfo, Game#seed を処理する
		 * 3. 乱数を発生させるため、Game#randomにアクセスしRandomGeneratorを取得する
		 * 4. ゲームのメタ情報を確認するため、Game#width, Game#height, Game#fpsにアクセスする
		 * 5. グローバルアセットを取得するため、Game#assetsにアクセスする
		 * 6. LoadingSceneを変更するため、Game#loadingSceneにゲーム開発者の定義したLoadingSceneを指定する
		 * 7. スナップショットに対応するため、Game#requestSaveSnapshot()を呼び出す
		 * 8. 現在フォーカスされているCamera情報を得るため、Game#focusingCameraにアクセスする
		 * 9. AudioSystemを直接制御するため、Game#audioにアクセスする
		 * 10.Sceneのスタック情報を調べるため、Game#scenesにアクセスする
		 * 11.操作プラグインを直接制御するため、Game#operationPluginManagerにアクセスする
		 */
		var Game$1 = /** @class */ (function () {
		    /**
		     * `Game` のインスタンスを生成する。
		     *
		     * @param param この `Game` に指定するパラメータ
		     */
		    function Game(param) {
		        var gameConfiguration = this._normalizeConfiguration(param.configuration);
		        this.fps = gameConfiguration.fps;
		        this.width = gameConfiguration.width;
		        this.height = gameConfiguration.height;
		        this.renderers = [];
		        this.scenes = [];
		        this.age = 0;
		        this.assetBase = param.assetBase || "";
		        this.resourceFactory = param.resourceFactory;
		        this.handlerSet = param.handlerSet;
		        this.selfId = param.selfId;
		        this.db = undefined;
		        this.loadingScene = undefined;
		        this.operationPlugins = undefined;
		        this.random = undefined;
		        this.localRandom = undefined;
		        this._defaultLoadingScene = undefined;
		        this._defaultSkippingScene = undefined;
		        this._eventConverter = undefined;
		        this._pointEventResolver = undefined;
		        this._idx = undefined;
		        this._localDb = undefined;
		        this._localIdx = undefined;
		        this._cameraIdx = undefined;
		        this._isTerminated = undefined;
		        this._modified = undefined;
		        this._postTickTasks = undefined;
		        this._toBeDestroyedScenes = [];
		        this.playId = undefined;
		        this.isSkipping = false;
		        this.joinedPlayerIds = [];
		        this.audio = new AudioSystemManager_1.AudioSystemManager(this.resourceFactory);
		        this.defaultAudioSystemId = "sound";
		        this.assets = {};
		        this.surfaceAtlasSet = new SurfaceAtlasSet_1.SurfaceAtlasSet({ resourceFactory: this.resourceFactory });
		        this.onJoin = new trigger_1.Trigger();
		        this.onLeave = new trigger_1.Trigger();
		        this.onPlayerInfo = new trigger_1.Trigger();
		        this.onSeed = new trigger_1.Trigger();
		        this.join = this.onJoin;
		        this.leave = this.onLeave;
		        this.playerInfo = this.onPlayerInfo;
		        this.seed = this.onSeed;
		        this._eventTriggerMap = {
		            unknown: undefined,
		            timestamp: undefined,
		            join: this.onJoin,
		            leave: this.onLeave,
		            "player-info": this.onPlayerInfo,
		            seed: this.onSeed,
		            message: undefined,
		            "point-down": undefined,
		            "point-move": undefined,
		            "point-up": undefined,
		            operation: undefined
		        };
		        this.onResized = new trigger_1.Trigger();
		        this.onSkipChange = new trigger_1.Trigger();
		        this.resized = this.onResized;
		        this.skippingChanged = this.onSkipChange;
		        this.isLastTickLocal = true;
		        this.lastOmittedLocalTickCount = 0;
		        this.lastLocalTickMode = null;
		        this.lastTickGenerationMode = null;
		        this._onLoad = new trigger_1.Trigger();
		        this._onStart = new trigger_1.Trigger();
		        this._loaded = this._onLoad;
		        this._started = this._onStart;
		        this.isLoaded = false;
		        this.onSnapshotRequest = new trigger_1.Trigger();
		        this.snapshotRequest = this.onSnapshotRequest;
		        this.external = {};
		        this._runtimeValueBase = Object.create(param.engineModule, {
		            game: {
		                value: this,
		                enumerable: true
		            }
		        });
		        this._main = gameConfiguration.main;
		        this._mainFunc = param.mainFunc;
		        this._mainParameter = undefined;
		        this._configuration = gameConfiguration;
		        // TODO: AssetConfiguration[]のサポートができたらこの例外処理は削除する
		        if (Array.isArray(gameConfiguration.assets)) {
		            throw new Error("Game#constructor: array type of configuration.assets is not yet supported");
		        }
		        this._assetManager = new AssetManager_1.AssetManager(this, gameConfiguration.assets, gameConfiguration.audio, gameConfiguration.moduleMainScripts);
		        this._moduleManager = undefined;
		        this.operationPluginManager = new OperationPluginManager_1.OperationPluginManager(this, param.operationPluginViewInfo || null);
		        this._onOperationPluginOperated = new trigger_1.Trigger();
		        this._operationPluginOperated = this._onOperationPluginOperated;
		        this._onOperationPluginOperated.add(this._handleOperationPluginOperated, this);
		        this.onSceneChange = new trigger_1.Trigger();
		        this._onSceneChange = new trigger_1.Trigger();
		        this._onSceneChange.add(this._handleSceneChanged, this);
		        this._sceneChanged = this._onSceneChange;
		        this.onUpdate = new trigger_1.Trigger();
		        this._initialScene = new Scene_1.Scene({
		            game: this,
		            assetIds: this._assetManager.globalAssetIds(),
		            local: true,
		            name: "akashic:initial-scene"
		        });
		        this._initialScene.onLoad.add(this._handleInitialSceneLoad, this);
		        this._reset({ age: 0 });
		    }
		    Object.defineProperty(Game.prototype, "focusingCamera", {
		        /**
		         * 使用中のカメラ。
		         *
		         * `Game#draw()`, `Game#findPointSource()` のデフォルト値として使用される。
		         * この値を変更した場合、変更を描画に反映するためには `Game#modified()` を呼び出す必要がある。
		         */
		        // focusingCameraが変更されても古いカメラをtargetCamerasに持つエンティティのEntityStateFlags.Modifiedを取りこぼすことが無いように、変更時にはrenderを呼べるようアクセサを使う
		        get: function () {
		            return this._focusingCamera;
		        },
		        set: function (c) {
		            if (c === this._focusingCamera)
		                return;
		            if (this._modified)
		                this.render();
		            this._focusingCamera = c;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(Game.prototype, "skippingScene", {
		        /**
		         * スキッピングシーン。
		         * ゲームが早送りとなった際に描画される特殊なシーンであり、以下の制限を持つ。
		         *
		         * * サポートするシーンの種別は "full-local" のみ
		         * * 非グローバルアセットを利用してはならない
		         * * シーン内で発生した一切のイベントは処理されない
		         * * 早送りが複数回発生した場合でも、対象のシーンの onLoad は2度目以降発火せずにインスタンスが使い回される
		         *
		         * 初期値は `undefined` である。
		         */
		        get: function () {
		            return this._skippingScene;
		        },
		        set: function (scene) {
		            if (scene === this._skippingScene)
		                return;
		            if (scene) {
		                if (scene.local !== "full-local") {
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#skippingScene: only 'full-local' scene is supported.");
		                }
		                if (scene._needsLoading()) {
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#skippingScene: must not depend on any assets.");
		                }
		            }
		            this._skippingScene = scene;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    /**
		     * シーンスタックへのシーンの追加と、そのシーンへの遷移を要求する。
		     *
		     * このメソッドは要求を行うだけである。呼び出し直後にはシーン遷移は行われていないことに注意。
		     * 実際のシーン遷移は現在のフレームの終わり(Scene#update の fire 後) まで遅延される。
		     * このメソッドの呼び出しにより、現在のシーンの `stateChanged` が引数 `"deactive"` でfireされる。
		     * その後 `scene.stateChanged` が引数 `"active"` でfireされる。
		     * @param scene 遷移後のシーン
		     * @param option 遷移時のオプション
		     */
		    Game.prototype.pushScene = function (scene, option) {
		        this._postTickTasks.push({
		            type: 0 /* PostTickTaskType.PushScene */,
		            scene: scene,
		            prepare: option === null || option === void 0 ? void 0 : option.prepare
		        });
		    };
		    Game.prototype.replaceScene = function (scene, preserveCurrentOrOption) {
		        var preserveCurrent;
		        var prepare;
		        if (typeof preserveCurrentOrOption === "object") {
		            preserveCurrent = !!preserveCurrentOrOption.preserveCurrent;
		            prepare = preserveCurrentOrOption.prepare;
		        }
		        else {
		            preserveCurrent = !!preserveCurrentOrOption;
		        }
		        this._postTickTasks.push({
		            type: 1 /* PostTickTaskType.ReplaceScene */,
		            scene: scene,
		            preserveCurrent: preserveCurrent,
		            prepare: prepare
		        });
		    };
		    /**
		     * シーンスタックから現在のシーンを取り除くことを要求する
		     *
		     * このメソッドは要求を行うだけである。呼び出し直後にはシーン遷移は行われていないことに注意。
		     * 実際のシーン遷移は次のフレームまでに(次のupdateのfireまでに)行われる。
		     * 引数 `preserve` が偽の場合、このメソッドの呼び出しにより取り除かれたシーンは全て破棄される。
		     * またその時 `stateChanged` が引数 `"destroyed"` でfireされる。
		     * その後一つ前のシーンの `stateChanged` が引数 `"active"` でfireされる。
		     * また、step数がスタックされているシーンの数以上の場合、例外が投げられる。
		     *
		     * @param preserve 真の場合、シーンを破棄しない(ゲーム開発者が明示的に破棄せねばならない)。省略された場合、偽
		     * @param step 取り除くシーンの数。省略された場合、1
		     */
		    Game.prototype.popScene = function (preserve, step) {
		        if (step === void 0) { step = 1; }
		        for (var i = 0; i < step; i++) {
		            this._postTickTasks.push({ type: 2 /* PostTickTaskType.PopScene */, preserveCurrent: !!preserve });
		        }
		    };
		    /**
		     * 現在のシーンを返す。
		     * ない場合、 `undefined` を返す。
		     */
		    Game.prototype.scene = function () {
		        if (!this.scenes.length)
		            return undefined;
		        return this.scenes[this.scenes.length - 1];
		    };
		    /**
		     * この `Game` の時間経過とそれに伴う処理を行う。
		     *
		     * 現在の `Scene` に対して `Scene#update` をfireし、 `events` に設定されたイベントを処理する。
		     * このメソッドは暗黙に呼び出される。ゲーム開発者がこのメソッドを利用する必要はない。
		     *
		     * 戻り値は呼び出し前後でシーンが変わった(別のシーンに遷移した)場合、真。でなければ偽。
		     * @param advanceAge 偽を与えた場合、`this.age` を進めない。
		     * @param omittedTickCount タイムスタンプ待ちを省略する動作などにより、(前回の呼び出し以降に)省かれたローカルティックの数。省略された場合、 `0` 。
		     * @param events ティックに含ませるイベント。省略された場合、 `undefined` 。
		     */
		    Game.prototype.tick = function (advanceAge, omittedTickCount, events) {
		        var scene = null;
		        if (this._isTerminated)
		            return false;
		        this.isLastTickLocal = !advanceAge;
		        this.lastOmittedLocalTickCount = omittedTickCount || 0;
		        if (this.scenes.length) {
		            scene = this.scenes[this.scenes.length - 1];
		            if (events && events.length) {
		                for (var i = 0; i < events.length; ++i) {
		                    var event = this._eventConverter.toGameEvent(events[i]);
		                    var trigger = this._eventTriggerMap[event.type];
		                    // @ts-ignore 処理の高速化のため以下の箇所のみ型の厳格なチェックをなくす
		                    if (trigger)
		                        trigger.fire(event);
		                }
		            }
		            scene.onUpdate.fire();
		            if (advanceAge)
		                ++this.age;
		        }
		        this.onUpdate.fire();
		        if (this._postTickTasks.length) {
		            this._flushPostTickTasks();
		            return scene !== this.scenes[this.scenes.length - 1];
		        }
		        return false;
		    };
		    /**
		     * このGameを描画する。
		     *
		     * このゲームに紐づけられた `Renderer` (`this.renderers` に含まれるすべての `Renderer` で、この `Game` の描画を行う。
		     * 描画内容に変更がない場合、描画処理がスキップされる点に注意。強制的に描画をする場合は `this.modified()` を呼ぶこと。
		     * このメソッドは暗黙に呼び出される。ゲーム開発者がこのメソッドを利用する必要はない。
		     */
		    Game.prototype.render = function () {
		        var _a;
		        var scene;
		        var skippingScene = (_a = this._skippingScene) !== null && _a !== void 0 ? _a : this._defaultSkippingScene;
		        if (skippingScene && this.isSkipping) {
		            scene = skippingScene;
		            scene.onUpdate.fire();
		        }
		        else {
		            scene = this.scene();
		        }
		        if (!this._modified)
		            return;
		        if (!scene)
		            return;
		        var camera = this.focusingCamera;
		        var renderers = this.renderers; // unsafe
		        // 描画するべき一番底のシーンを先に探しておく
		        var index = this.scenes.length - 1;
		        while (index >= 0 && this.scenes[index].seethrough)
		            --index;
		        var renderBottomIndex = index;
		        for (var i = 0; i < renderers.length; ++i) {
		            var renderer = renderers[i];
		            renderer.begin();
		            renderer.save();
		            renderer.clear();
		            if (camera) {
		                renderer.save();
		                camera._applyTransformToRenderer(renderer);
		            }
		            if (scene === skippingScene) {
		                for (var k = 0; k < scene.children.length; ++k)
		                    scene.children[k].render(renderer, camera);
		            }
		            else {
		                for (var j = renderBottomIndex; j < this.scenes.length; ++j) {
		                    var children = this.scenes[j].children;
		                    for (var k = 0; k < children.length; ++k)
		                        children[k].render(renderer, camera);
		                }
		            }
		            if (camera) {
		                renderer.restore();
		            }
		            renderer.restore();
		            renderer.end();
		        }
		        this._modified = false;
		    };
		    /**
		     * 対象のポイントイベントのターゲットエンティティ(`PointTarget#target`)を解決し、それを補完した playlog.Event を返す。
		     * Down -> Move -> Up とは異なる順番で呼び出された場合 `null` を返す。
		     * このメソッドは暗黙に呼び出される。ゲーム開発者がこのメソッドを利用する必要はない。
		     * @param e プラットフォームのポイントイベント
		     */
		    Game.prototype.resolvePointEvent = function (e) {
		        switch (e.type) {
		            case 0 /* PlatformPointType.Down */:
		                return this._pointEventResolver.pointDown(e);
		            case 1 /* PlatformPointType.Move */:
		                return this._pointEventResolver.pointMove(e);
		            case 2 /* PlatformPointType.Up */:
		                return this._pointEventResolver.pointUp(e);
		        }
		    };
		    /**
		     * その座標に反応する `PointSource` を返す。
		     *
		     * 戻り値は、対象が見つかった場合、 `target` に見つかった `E` を持つ `PointSource` である。
		     * 対象が見つからなかった場合、 `undefined` である。
		     *
		     * 戻り値が `undefined` でない場合、その `target` プロパティは次を満たす:
		     * - `E#touchable` が真である
		     * - カメラ `camera` から可視である中で最も手前にある
		     *
		     * @param point 対象の座標
		     * @param camera 対象のカメラ。指定しなければ `Game.focusingCamera` が使われる
		     */
		    Game.prototype.findPointSource = function (point, camera) {
		        if (!camera)
		            camera = this.focusingCamera;
		        var scene = this.scene();
		        if (!scene)
		            return undefined;
		        return scene.findPointSourceByPoint(point, false, camera);
		    };
		    /**
		     * このGameにエンティティを登録する。
		     *
		     * このメソッドは各エンティティに対して暗黙に呼び出される。ゲーム開発者がこのメソッドを明示的に利用する必要はない。
		     * `e.id` が `undefined` である場合、このメソッドの呼び出し後、 `e.id` には `this` に一意の値が設定される。
		     * `e.local` が偽である場合、このメソッドの呼び出し後、 `this.db[e.id] === e` が成立する。
		     * `e.local` が真である場合、 `e.id` の値は不定である。
		     *
		     * @param e 登録するエンティティ
		     */
		    Game.prototype.register = function (e) {
		        if (e.local) {
		            if (e.id === undefined) {
		                e.id = --this._localIdx;
		            }
		            else {
		                // register前にidがある: スナップショットからの復元用パス
		                // スナップショットはローカルエンティティを残さないはずだが、実装上はできるようにしておく。
		                if (e.id > 0)
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#register: invalid local id: " + e.id);
		                if (this._localDb.has(e.id))
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#register: conflicted id: " + e.id);
		                if (this._localIdx > e.id)
		                    this._localIdx = e.id;
		            }
		            this._localDb.set(e.id, e);
		        }
		        else {
		            if (e.id === undefined) {
		                e.id = ++this._idx;
		            }
		            else {
		                // register前にidがある: スナップショットからの復元用パス
		                if (e.id < 0)
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#register: invalid non-local id: " + e.id);
		                if (this.db.has(e.id))
		                    throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#register: conflicted id: " + e.id);
		                // _idxがユニークな値を作れるよう更新しておく
		                if (this._idx < e.id)
		                    this._idx = e.id;
		            }
		            this.db.set(e.id, e);
		        }
		    };
		    /**
		     * このGameからエンティティの登録を削除する。
		     *
		     * このメソッドは各エンティティに対して暗黙に呼び出される。ゲーム開発者がこのメソッドを明示的に利用する必要はない。
		     * このメソッドの呼び出し後、 `this.db[e.id]` は未定義である。
		     * @param e 登録を削除するエンティティ
		     */
		    Game.prototype.unregister = function (e) {
		        if (e.local) {
		            this._localDb.delete(e.id);
		        }
		        else {
		            this.db.delete(e.id);
		        }
		    };
		    /**
		     * このゲームを終了する。
		     *
		     * エンジンに対して続行の断念を通知する。
		     * このメソッドの呼び出し後、このクライアントの操作要求は送信されない。
		     * またこのクライアントのゲーム実行は行われない(updateを含むイベントのfireはおきない)。
		     */
		    Game.prototype.terminateGame = function () {
		        this._isTerminated = true;
		        this._terminateGame();
		    };
		    /**
		     * 画面更新が必要のフラグを設定する。
		     */
		    Game.prototype.modified = function () {
		        this._modified = true;
		    };
		    /**
		     * イベントを発生させる。
		     *
		     * ゲーム開発者は、このメソッドを呼び出すことで、エンジンに指定のイベントを発生させることができる。
		     *
		     * @param e 発生させるイベント
		     */
		    Game.prototype.raiseEvent = function (e) {
		        this.handlerSet.raiseEvent(this._eventConverter.toPlaylogEvent(e));
		    };
		    /**
		     * ティックを発生させる。
		     *
		     * ゲーム開発者は、このメソッドを呼び出すことで、エンジンに時間経過を要求することができる。
		     * 現在のシーンのティック生成モード `Scene#tickGenerationMode` が `"manual"` でない場合、エラー。
		     *
		     * @param events そのティックで追加で発生させるイベント
		     */
		    Game.prototype.raiseTick = function (events) {
		        if (events == null || !events.length) {
		            this.handlerSet.raiseTick();
		            return;
		        }
		        var plEvents = [];
		        for (var i = 0; i < events.length; i++) {
		            plEvents.push(this._eventConverter.toPlaylogEvent(events[i]));
		        }
		        this.handlerSet.raiseTick(plEvents);
		    };
		    /**
		     * イベントフィルタを追加する。
		     *
		     * 一つ以上のイベントフィルタが存在する場合、このゲームで発生したイベントは、通常の処理の代わりにイベントフィルタに渡される。
		     * エンジンは、イベントフィルタが戻り値として返したイベントを、まるでそのイベントが発生したかのように処理する。
		     *
		     * イベントフィルタはローカルイベントに対しても適用される。
		     * イベントフィルタはローカルティック補間シーンやローカルシーンの間であっても適用される。
		     * 複数のイベントフィルタが存在する場合、そのすべてが適用される。適用順は登録の順である。
		     *
		     * @param filter 追加するイベントフィルタ
		     * @param handleEmpty イベントが存在しない場合でも定期的にフィルタを呼び出すか否か。省略された場合、偽。
		     */
		    Game.prototype.addEventFilter = function (filter, handleEmpty) {
		        this.handlerSet.addEventFilter(filter, handleEmpty);
		    };
		    /**
		     * イベントフィルタを削除する。
		     *
		     * @param filter 削除するイベントフィルタ
		     */
		    Game.prototype.removeEventFilter = function (filter) {
		        this.handlerSet.removeEventFilter(filter);
		    };
		    /**
		     * このインスタンスにおいてスナップショットの保存を行うべきかを返す。
		     *
		     * スナップショット保存に対応するゲームであっても、
		     * 必ずしもすべてのインスタンスにおいてスナップショット保存を行うべきとは限らない。
		     * たとえば多人数プレイ時には、複数のクライアントで同一のゲームが実行される。
		     * スナップショットを保存するのはそのうちの一つのインスタンスのみでよい。
		     * 本メソッドはそのような場合に、自身がスナップショットを保存すべきかどうかを判定するために用いることができる。
		     *
		     * スナップショット保存に対応するゲームは、このメソッドが真を返す時にのみ `Game#saveSnapshot()` を呼び出すべきである。
		     * 戻り値は、スナップショットの保存を行うべきであれば真、でなければ偽である。
		     *
		     * @deprecated 非推奨である。`saveSnapshot()` (非推奨) の利用時にしか必要ないため。アクティブインスタンスの判定には `isActiveInstance()` を用いること。
		     */
		    Game.prototype.shouldSaveSnapshot = function () {
		        return this.handlerSet.shouldSaveSnapshot();
		    };
		    /**
		     * スナップショットを保存する。
		     *
		     * このメソッドは `Game#shouldSaveSnapshot()` が真を返す `Game` に対してのみ呼び出されるべきである。
		     * そうでない場合、このメソッドの動作は不定である。
		     *
		     * このメソッドで保存されたスナップショットは、
		     * main スクリプト (ゲーム開始時に最初に実行されるスクリプト) の関数に、
		     * 引数 (の `snapshot` プロパティ) として与えられる場合がある。
		     * (e.g. マルチプレイのゲームプレイ画面を途中から開いた場合)
		     * スナップショットが与えられた場合、ゲームはそのスナップショットから保存時の実行状態を復元しなければならない。
		     *
		     * @param snapshot 保存するスナップショット。JSONとして妥当な値でなければならない。
		     * @param timestamp 保存時の時刻。 `g.TimestampEvent` を利用するゲームの場合、それらと同じ基準の時間情報を与えなければならない。
		     * @deprecated 非推奨である。互換性のために残されているが、この関数では適切なタイミングのスナップショット保存ができない場合がある。代わりに `requestSaveSnapshot()` を利用すること。
		     */
		    Game.prototype.saveSnapshot = function (snapshot, timestamp) {
		        this.handlerSet.saveSnapshot(this.age, snapshot, this.random.serialize(), this._idx, timestamp);
		    };
		    /**
		     * スナップショットを保存する。
		     *
		     * (`saveSnapshot()` と同じ機能だが、インターフェースが異なる。こちらを利用すること。)
		     *
		     * 引数として与えた関数 `func()` がフレームの終了時に呼び出される。
		     * エンジンは、`func()` の返した値に基づいて、実行環境にスナップショットの保存を要求する。
		     *
		     * 保存されたスナップショットは、必要に応じてゲームの起動時に与えられる。
		     * 詳細は `g.GameMainParameterObject` を参照のこと。
		     *
		     * このメソッドを 1 フレーム中に複数回呼び出した場合、引数に与えた関数 `func()` の呼び出し順は保証されない。
		     * (スナップショットはフレームごとに定まるので、1フレーム中に複数回呼び出す必要はない。)
		     *
		     * @param func フレーム終了時に呼び出す関数。 `SnapshotSaveRequest` を返した場合、スナップショット保存が要求される。
		     * @param owner func の呼び出し時に `this` として使われる値。指定しなかった場合、 `undefined` 。
		     */
		    Game.prototype.requestSaveSnapshot = function (func, owner) {
		        var _this = this;
		        // 他の箇所と異なり push でなく unshift しているのは、他の処理 (シーン遷移処理) と重なった時に先行するため。
		        // 効率はよくないが、このメソッドの利用頻度は高くないので許容。
		        this._postTickTasks.unshift({
		            type: 3 /* PostTickTaskType.Call */,
		            fun: function () {
		                if (!_this.handlerSet.shouldSaveSnapshot())
		                    return;
		                var req = func.call(owner);
		                if (!req)
		                    return; // (null に限らず) falsy は全部弾く。空の値を保存しても不具合の温床にしかならないため。
		                _this.handlerSet.saveSnapshot(_this.age, req.snapshot, _this.random.serialize(), _this._idx, req.timestamp);
		            },
		            owner: null
		        });
		    };
		    /**
		     * 現在時刻を取得する。
		     *
		     * 値は1970-01-01T00:00:00Zからのミリ秒での経過時刻である。
		     * `Date.now()` と異なり、この値は消化されたティックの数から算出される擬似的な時刻である。
		     */
		    Game.prototype.getCurrentTime = function () {
		        return this.handlerSet.getCurrentTime();
		    };
		    /**
		     * このインスタンスがアクティブインスタンスであるかどうか返す。
		     *
		     * ゲーム開発者は、この値の真偽に起因する処理で、ゲームのローカルな実行状態を変更してはならず、
		     * `raiseEvent()` などによって、グローバルな状態を更新する必要がある。
		     */
		    Game.prototype.isActiveInstance = function () {
		        return this.handlerSet.getInstanceType() === "active";
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._pushPostTickTask = function (fun, owner) {
		        this._postTickTasks.push({
		            type: 3 /* PostTickTaskType.Call */,
		            fun: fun,
		            owner: owner
		        });
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._popSceneRaw = function (preserveCurrent) {
		        this._postTickTasks.push({ type: 4 /* PostTickTaskType.PopSceneRaw */, preserveCurrent: preserveCurrent });
		    };
		    /**
		     * @private
		     */
		    Game.prototype._normalizeConfiguration = function (gameConfiguration) {
		        if (!gameConfiguration)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_normalizeConfiguration: invalid arguments");
		        if (gameConfiguration.assets == null)
		            gameConfiguration.assets = {};
		        if (gameConfiguration.fps == null)
		            gameConfiguration.fps = 30;
		        if (typeof gameConfiguration.fps !== "number")
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_normalizeConfiguration: fps must be given as a number");
		        if (!(0 <= gameConfiguration.fps && gameConfiguration.fps <= 60))
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_normalizeConfiguration: fps must be a number in (0, 60].");
		        if (typeof gameConfiguration.width !== "number")
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_normalizeConfiguration: width must be given as a number");
		        if (typeof gameConfiguration.height !== "number")
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_normalizeConfiguration: height must be given as a number");
		        return gameConfiguration;
		    };
		    /**
		     * @private
		     */
		    Game.prototype._setAudioPlaybackRate = function (playbackRate) {
		        this.audio._setPlaybackRate(playbackRate);
		    };
		    /**
		     * @private
		     */
		    Game.prototype._startSuppressAudio = function () {
		        this.audio._startSuppress();
		    };
		    /**
		     * @private
		     */
		    Game.prototype._endSuppressAudio = function () {
		        this.audio._endSuppress();
		    };
		    /**
		     * @private
		     */
		    Game.prototype._setMuted = function (muted) {
		        this.audio._setMuted(muted);
		    };
		    /**
		     * g.OperationEventのデータをデコードする。
		     * @private
		     */
		    Game.prototype._decodeOperationPluginOperation = function (code, op) {
		        var plugin = this.operationPluginManager.plugins[code];
		        if (!plugin || !plugin.decode)
		            return op;
		        return plugin.decode(op);
		    };
		    /**
		     * ゲーム状態のリセット。
		     * @private
		     */
		    Game.prototype._reset = function (param) {
		        var _a;
		        this.operationPluginManager.reset();
		        this.operationPluginManager.onOperate.add(this._onOperationPluginOperated.fire, this._onOperationPluginOperated);
		        if (this.scene()) {
		            while (this.scene() !== this._initialScene) {
		                this._popSceneRaw(false);
		                this._flushPostTickTasks();
		            }
		            if (!this.isLoaded) {
		                // _initialSceneの読み込みが終わっていない: _initialScene自体は使い回すので単にpopする。
		                this.scenes.pop();
		            }
		        }
		        if (this._skippingScene && !this._skippingScene.destroyed()) {
		            this._skippingScene.destroy();
		        }
		        if (param) {
		            if (param.age !== undefined)
		                this.age = param.age;
		            if (param.randGenSer !== undefined) {
		                this.random = XorshiftRandomGenerator_1.XorshiftRandomGenerator.deserialize(param.randGenSer);
		            }
		            else if (param.randSeed !== undefined) {
		                this.random = new XorshiftRandomGenerator_1.XorshiftRandomGenerator(param.randSeed);
		            }
		        }
		        this.audio._reset();
		        this._onLoad.removeAll({ func: this._handleLoad, owner: this });
		        this.onJoin.removeAll();
		        this.onLeave.removeAll();
		        this.onSeed.removeAll();
		        this.onResized.removeAll();
		        this.onSkipChange.removeAll();
		        this.onSceneChange.removeAll();
		        this.onUpdate.removeAll();
		        this.handlerSet.removeAllEventFilters();
		        this.isSkipping = false;
		        this.onSkipChange.add(this._handleSkipChange, this);
		        this.joinedPlayerIds = [];
		        this.onJoin.add(this._handleJoinEvent, this);
		        this.onLeave.add(this._handleLeaveEvent, this);
		        this._idx = (_a = param === null || param === void 0 ? void 0 : param.nextEntityId) !== null && _a !== void 0 ? _a : 0;
		        this._localIdx = 0;
		        this._cameraIdx = 0;
		        this.db = new WeakRefKVS_1.WeakRefKVS();
		        this._localDb = new WeakRefKVS_1.WeakRefKVS();
		        this._modified = true;
		        this.loadingScene = undefined;
		        this._skippingScene = undefined;
		        this._focusingCamera = undefined;
		        this.lastLocalTickMode = null;
		        this.lastTickGenerationMode = null;
		        this.onSnapshotRequest.removeAll();
		        this._postTickTasks = [];
		        this._toBeDestroyedScenes = [];
		        this._eventConverter = new EventConverter_1.EventConverter({ game: this, playerId: this.selfId }); // TODO: selfId が null のときの挙動
		        // TODO: selfId が null のときの挙動
		        this._pointEventResolver = new PointEventResolver_1.PointEventResolver({
		            sourceResolver: this,
		            playerId: this.selfId,
		            maxPoints: this._configuration.maxPoints
		        });
		        // ES5だとNumber.MAX_SAFE_INTEGERは使えないのでその値(9007199254740991)を直接かける
		        this.localRandom = new XorshiftRandomGenerator_1.XorshiftRandomGenerator(Math.floor(9007199254740991 * Math.random()));
		        this._isTerminated = false;
		        this.vars = {};
		        this._moduleManager = new ModuleManager_1.ModuleManager(this._runtimeValueBase, this._assetManager);
		        this.surfaceAtlasSet.destroy();
		        this.surfaceAtlasSet = new SurfaceAtlasSet_1.SurfaceAtlasSet({ resourceFactory: this.resourceFactory });
		        switch (this._configuration.defaultLoadingScene) {
		            case "none":
		                // Note: 何も描画しない実装として利用している
		                this._defaultLoadingScene = new LoadingScene_1.LoadingScene({ game: this });
		                break;
		            case "compact":
		                this._defaultLoadingScene = new DefaultLoadingScene_1.DefaultLoadingScene({ game: this, style: "compact" });
		                break;
		            default:
		                this._defaultLoadingScene = new DefaultLoadingScene_1.DefaultLoadingScene({ game: this });
		                break;
		        }
		        switch (this._configuration.defaultSkippingScene) {
		            case "none":
		                this._defaultSkippingScene = new DefaultSkippingScene_1.DefaultSkippingScene({ game: this, style: "none" });
		                break;
		            case "indicator":
		                this._defaultSkippingScene = new DefaultSkippingScene_1.DefaultSkippingScene({ game: this, style: "indicator" });
		                break;
		            default:
		                this._defaultSkippingScene = undefined;
		                break;
		        }
		    };
		    /**
		     * ゲームを破棄する。
		     * エンジンユーザとコンテンツに開放された一部プロパティ(external, vars)は維持する点に注意。
		     * @private
		     */
		    Game.prototype._destroy = function () {
		        // ユーザコードを扱う操作プラグインを真っ先に破棄
		        this.operationPluginManager.destroy();
		        // 到達できるシーンを全て破棄
		        if (this.scene()) {
		            while (this.scene() !== this._initialScene) {
		                this.popScene();
		                this._flushPostTickTasks();
		            }
		        }
		        this._initialScene.destroy();
		        if (this.loadingScene && !this.loadingScene.destroyed()) {
		            this.loadingScene.destroy();
		        }
		        if (!this._defaultLoadingScene.destroyed()) {
		            this._defaultLoadingScene.destroy();
		        }
		        if (this._defaultSkippingScene && !this._defaultSkippingScene.destroyed()) {
		            this._defaultSkippingScene.destroy();
		        }
		        if (this._skippingScene && !this._skippingScene.destroyed()) {
		            this._skippingScene.destroy();
		        }
		        // NOTE: fps, width, height, external, vars はそのまま保持しておく
		        this.db = undefined;
		        this.renderers = undefined;
		        this.scenes = undefined;
		        this.random = undefined;
		        this._modified = false;
		        this.age = 0;
		        this.assets = undefined; // this._initialScene.assets のエイリアスなので、特に破棄処理はしない。
		        this.isLoaded = false;
		        this.loadingScene = undefined;
		        this.assetBase = "";
		        this.selfId = undefined;
		        this.audio.music.stopAll();
		        this.audio.sound.stopAll();
		        this.audio = undefined;
		        this.defaultAudioSystemId = undefined;
		        this.handlerSet = undefined;
		        this.localRandom = undefined;
		        this.onJoin.destroy();
		        this.onJoin = undefined;
		        this.onLeave.destroy();
		        this.onLeave = undefined;
		        this.onSeed.destroy();
		        this.onSeed = undefined;
		        this.onPlayerInfo.destroy();
		        this.onPlayerInfo = undefined;
		        this.onResized.destroy();
		        this.onResized = undefined;
		        this.onSkipChange.destroy();
		        this.onSkipChange = undefined;
		        this.onSceneChange.destroy();
		        this.onSceneChange = undefined;
		        this.onUpdate.destroy();
		        this.onUpdate = undefined;
		        this.onSnapshotRequest.destroy();
		        this.onSnapshotRequest = undefined;
		        this.join = undefined;
		        this.leave = undefined;
		        this.seed = undefined;
		        this.playerInfo = undefined;
		        this.snapshotRequest = undefined;
		        this.resized = undefined;
		        this.skippingChanged = undefined;
		        this._sceneChanged = undefined;
		        this._loaded = undefined;
		        this._started = undefined;
		        this._operationPluginOperated = undefined;
		        this._onSceneChange.destroy();
		        this._onSceneChange = undefined;
		        this._onLoad.destroy();
		        this._onLoad = undefined;
		        this._onStart.destroy();
		        this._onStart = undefined;
		        // TODO より能動的にdestroy処理を入れるべきかもしれない
		        this.resourceFactory = undefined;
		        this.playId = undefined;
		        this.operationPlugins = undefined; // this._operationPluginManager.pluginsのエイリアスなので、特に破棄処理はしない。
		        this._eventTriggerMap = undefined;
		        this._initialScene = undefined;
		        this._defaultLoadingScene = undefined;
		        this._main = undefined;
		        this._mainFunc = undefined;
		        this._mainParameter = undefined;
		        this._assetManager.destroy();
		        this._assetManager = undefined;
		        this._eventConverter = undefined;
		        this._pointEventResolver = undefined;
		        this.operationPluginManager = undefined;
		        this._onOperationPluginOperated.destroy();
		        this._onOperationPluginOperated = undefined;
		        this._idx = 0;
		        this._localDb = undefined;
		        this._localIdx = 0;
		        this._cameraIdx = 0;
		        this._isTerminated = true;
		        this._focusingCamera = undefined;
		        this._skippingScene = undefined;
		        this._configuration = undefined;
		        this._postTickTasks = undefined;
		        this.surfaceAtlasSet.destroy();
		        this.surfaceAtlasSet = undefined;
		        this._moduleManager = undefined;
		    };
		    /**
		     * ゲームを開始する。
		     *
		     * 存在するシーンをすべて(_initialScene以外; あるなら)破棄し、グローバルアセットを読み込み、完了後ゲーム開発者の実装コードの実行を開始する。
		     * このメソッドの二度目以降の呼び出しの前には、 `this._reset()` を呼び出す必要がある。
		     * @param param ゲームのエントリポイントに渡す値
		     * @private
		     */
		    Game.prototype._loadAndStart = function (param) {
		        this._mainParameter = param || {};
		        if (!this.isLoaded) {
		            this._onLoad.add(this._handleLoad, this);
		            this.pushScene(this._initialScene);
		            this._flushPostTickTasks();
		        }
		        else {
		            this._handleLoad();
		        }
		    };
		    /**
		     * グローバルアセットの読み込みを開始する。
		     * 単体テスト用 (mainSceneなど特定アセットの存在を前提にする_loadAndStart()はテストに使いにくい) なので、通常ゲーム開発者が利用することはない
		     * @private
		     */
		    Game.prototype._startLoadingGlobalAssets = function () {
		        if (this.isLoaded)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_startLoadingGlobalAssets: already loaded.");
		        this.pushScene(this._initialScene);
		        this._flushPostTickTasks();
		    };
		    /**
		     * @private
		     */
		    Game.prototype._updateEventTriggers = function (scene) {
		        this._modified = true;
		        if (!scene) {
		            this._eventTriggerMap.message = undefined;
		            this._eventTriggerMap["point-down"] = undefined;
		            this._eventTriggerMap["point-move"] = undefined;
		            this._eventTriggerMap["point-up"] = undefined;
		            this._eventTriggerMap.operation = undefined;
		            return;
		        }
		        this._eventTriggerMap.message = scene.onMessage;
		        this._eventTriggerMap["point-down"] = scene.onPointDownCapture;
		        this._eventTriggerMap["point-move"] = scene.onPointMoveCapture;
		        this._eventTriggerMap["point-up"] = scene.onPointUpCapture;
		        this._eventTriggerMap.operation = scene.onOperation;
		        scene._activate();
		    };
		    /**
		     * @private
		     */
		    Game.prototype._handleInitialSceneLoad = function () {
		        this._initialScene.onLoad.remove(this._handleInitialSceneLoad, this);
		        this.assets = this._initialScene.assets;
		        this.isLoaded = true;
		        this._onLoad.fire(this);
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._handleOperationPluginOperated = function (op) {
		        var pev = this._eventConverter.makePlaylogOperationEvent(op);
		        this.handlerSet.raiseEvent(pev);
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._handleSceneChanged = function (scene) {
		        this._updateEventTriggers(scene);
		        var local = scene ? scene.local : "full-local";
		        var tickGenerationMode = scene ? scene.tickGenerationMode : "by-clock";
		        if (this.lastLocalTickMode === local && this.lastTickGenerationMode === tickGenerationMode) {
		            return;
		        }
		        this.lastLocalTickMode = local;
		        this.lastTickGenerationMode = tickGenerationMode;
		        this.handlerSet.changeSceneMode({
		            local: local,
		            tickGenerationMode: tickGenerationMode
		        });
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._handleSkippingSceneReady = function (scene) {
		        this._pushPostTickTask(scene._fireLoaded, scene);
		    };
		    /**
		     * @private
		     */
		    Game.prototype._terminateGame = function () {
		        // do nothing.
		    };
		    /**
		     * post-tick タスクを実行する。
		     *
		     * `pushScene()` などのシーン遷移や `_pushPostTickTask()` によって要求された post-tick タスクを実行する。
		     * 通常このメソッドは、毎フレーム一度、フレームの最後に呼び出されることを期待する (`Game#tick()` がこの呼び出しを行う)。
		     * ただしゲーム開始時 (グローバルアセット読み込み・スナップショットローダ起動後またはmainScene実行開始時) に関しては、
		     * シーン追加がゲーム開発者の記述によらない (`tick()` の外側である) ため、それぞれの箇所で明示的にこのメソッドを呼び出す。
		     * @private
		     */
		    Game.prototype._flushPostTickTasks = function () {
		        do {
		            var reqs = this._postTickTasks;
		            this._postTickTasks = [];
		            for (var i = 0; i < reqs.length; ++i) {
		                var req = reqs[i];
		                switch (req.type) {
		                    case 0 /* PostTickTaskType.PushScene */:
		                        var oldScene = this.scene();
		                        if (oldScene) {
		                            oldScene._deactivate();
		                        }
		                        this._doPushScene(req.scene, false, req.prepare
		                            ? this._createPreparingLoadingScene(req.scene, req.prepare, "akashic:preparing-".concat(req.scene.name))
		                            : undefined);
		                        break;
		                    case 1 /* PostTickTaskType.ReplaceScene */:
		                        // NOTE: replaceSceneの場合、pop時点では_sceneChangedをfireしない。_doPushScene() で一度だけfireする。
		                        this._doPopScene(req.preserveCurrent, false, false);
		                        this._doPushScene(req.scene, false, req.prepare
		                            ? this._createPreparingLoadingScene(req.scene, req.prepare, "akashic:preparing-".concat(req.scene.name))
		                            : undefined);
		                        break;
		                    case 2 /* PostTickTaskType.PopScene */:
		                        this._doPopScene(req.preserveCurrent, false, true);
		                        break;
		                    case 3 /* PostTickTaskType.Call */:
		                        req.fun.call(req.owner);
		                        break;
		                    case 4 /* PostTickTaskType.PopSceneRaw */:
		                        this._doPopScene(req.preserveCurrent, true, true);
		                        break;
		                    default:
		                        throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_flushPostTickTasks: unknown post-tick task type.");
		                }
		            }
		        } while (this._postTickTasks.length > 0); // flush中に追加される限りflushを続行する
		        if (this._toBeDestroyedScenes.length > 0) {
		            for (var _i = 0, _a = this._toBeDestroyedScenes; _i < _a.length; _i++) {
		                var scene = _a[_i];
		                scene.destroy();
		            }
		            this._toBeDestroyedScenes = [];
		        }
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._handleSkipChange = function (isSkipping) {
		        var _a;
		        this.isSkipping = isSkipping;
		        if (isSkipping) {
		            var skippingScene = (_a = this._skippingScene) !== null && _a !== void 0 ? _a : this._defaultSkippingScene;
		            if (skippingScene && !skippingScene._loaded) {
		                skippingScene._load();
		                skippingScene._onReady.addOnce(this._handleSkippingSceneReady, this);
		            }
		        }
		        this._cleanDB();
		        this._modified = true;
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._handleJoinEvent = function (event) {
		        if (!event.player.id || this.joinedPlayerIds.indexOf(event.player.id) !== -1) {
		            return;
		        }
		        this.joinedPlayerIds.push(event.player.id);
		    };
		    /**
		     * @ignore
		     */
		    Game.prototype._handleLeaveEvent = function (event) {
		        this.joinedPlayerIds = this.joinedPlayerIds.filter(function (id) { return id !== event.player.id; });
		    };
		    /**
		     * シーンスタックからシーンを取り除く。
		     *
		     * @ignore
		     * @param preserveCurrent 取り除いたシーンを破棄せずそのままにするか
		     * @param raw (ローディングシーンを考慮せず)そのまま取り除くか。偽の場合、シーンスタックトップのローディングシーンを全て除いてから取り除く
		     * @param fireSceneChanged onSceneChangeをfireして通知するか
		     */
		    Game.prototype._doPopScene = function (preserveCurrent, raw, fireSceneChanged) {
		        var _a;
		        var scene = this.scenes.pop();
		        if (!raw) {
		            while (scene && scene instanceof LoadingScene_1.LoadingScene) {
		                scene._clearTargetScene();
		                scene = this.scenes.pop();
		            }
		        }
		        if (!scene)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_doPopScene: invalid call; scene stack underflow");
		        if (scene === this._initialScene)
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_doPopScene: invalid call; attempting to pop the initial scene");
		        if (!preserveCurrent) {
		            if (!this._toBeDestroyedScenes.includes(scene)) {
		                this._toBeDestroyedScenes.push(scene);
		            }
		        }
		        if (!raw) {
		            // 取り除いた結果スタックトップがロード中のシーンになった場合はローディングシーンを積み直す
		            var nextScene = this.scene();
		            if (nextScene && nextScene._needsLoading() && nextScene._loadingState !== "loaded-fired") {
		                var loadingScene = nextScene._waitingPrepare
		                    ? this._createPreparingLoadingScene(nextScene, nextScene._waitingPrepare, "akashic:preparing-".concat(nextScene.name))
		                    : (_a = this.loadingScene) !== null && _a !== void 0 ? _a : this._defaultLoadingScene;
		                this._doPushScene(loadingScene, true, this._defaultLoadingScene);
		                loadingScene.reset(nextScene);
		            }
		        }
		        if (fireSceneChanged) {
		            var nextScene = this.scene();
		            this.onSceneChange.fire(nextScene);
		            this._onSceneChange.fire(nextScene);
		        }
		    };
		    Game.prototype._handleLoad = function () {
		        var operationPluginsField = this._configuration.operationPlugins || [];
		        // `game.json` の `operationPlugins` フィールドの登録は `game._onLoad` のfire後でなければならない。
		        for (var _i = 0, operationPluginsField_1 = operationPluginsField; _i < operationPluginsField_1.length; _i++) {
		            var pluginInfo = operationPluginsField_1[_i];
		            if (!pluginInfo.script)
		                continue;
		            var pluginClass = this._moduleManager._internalRequire(pluginInfo.script);
		            var plugin = this.operationPluginManager.register(pluginClass, pluginInfo.code, pluginInfo.option);
		            if (!pluginInfo.manualStart && plugin) {
		                plugin.start();
		            }
		        }
		        this.operationPlugins = this.operationPluginManager.plugins;
		        var preloadAssetIds = this._assetManager.preloadScriptAssetIds();
		        for (var _a = 0, preloadAssetIds_1 = preloadAssetIds; _a < preloadAssetIds_1.length; _a++) {
		            var preloadAssetId = preloadAssetIds_1[_a];
		            var fun = this._moduleManager._internalRequire(preloadAssetId);
		            if (!fun || typeof fun !== "function")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_handleLoad: ".concat(preloadAssetId, " has no-exported function."));
		            fun();
		        }
		        if (this._mainFunc) {
		            this._mainFunc(this._runtimeValueBase, this._mainParameter || {});
		        }
		        else if (this._main) {
		            var mainFun = this._moduleManager._internalRequire(this._main);
		            if (!mainFun || typeof mainFun !== "function")
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_handleLoad: Entry point ".concat(this._main, " not found."));
		            mainFun(this._mainParameter);
		        }
		        else {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_handleLoad: does not have an entry point");
		        }
		        this._flushPostTickTasks(); // シーン遷移を要求する可能性がある(というかまずする)
		        this._onStart.fire();
		    };
		    /**
		     * シーンをシーンスタックに追加する。
		     *
		     * @ignore
		     * @param scene 追加するシーン
		     * @param raw (ローディングシーンを考慮せず)そのまま追加するか。偽の場合、スタックトップのローディングシーンを除いてから追加する
		     * @param loadingScene ロードが必要な場合に利用するローディングシーン
		     */
		    Game.prototype._doPushScene = function (scene, raw, loadingScene) {
		        var scenes = this.scenes;
		        if (!raw) {
		            while (scenes.length > 0 && scenes[scenes.length - 1] instanceof LoadingScene_1.LoadingScene) {
		                var top = scenes.pop();
		                top._clearTargetScene();
		            }
		        }
		        if (!loadingScene)
		            loadingScene = this.loadingScene || this._defaultLoadingScene;
		        scenes.push(scene);
		        if (scene._needsLoading() && scene._loadingState !== "loaded-fired") {
		            if (this._defaultLoadingScene._needsLoading())
		                throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Game#_doPushScene: _defaultLoadingScene must not depend on any assets.");
		            this._doPushScene(loadingScene, true, this._defaultLoadingScene);
		            loadingScene.reset(scene);
		        }
		        else {
		            this.onSceneChange.fire(scene);
		            this._onSceneChange.fire(scene);
		            // 読み込み待ちのアセットがなければその場で(loadingSceneに任せず)ロード、SceneReadyを発生させてからLoadingSceneEndを起こす。
		            if (!scene._loaded) {
		                scene._load();
		                this._pushPostTickTask(scene._fireLoaded, scene);
		            }
		        }
		        this._modified = true;
		    };
		    /**
		     * 引数に指定したハンドラが完了するまで待機する空のローディングシーンを作成する。
		     */
		    Game.prototype._createPreparingLoadingScene = function (scene, prepare, name) {
		        var _this = this;
		        scene._waitingPrepare = prepare;
		        var loadingScene = new LoadingScene_1.LoadingScene({
		            game: this,
		            explicitEnd: true,
		            name: name
		        });
		        // prepare 対象シーンを保持するためクロージャを許容
		        loadingScene.onTargetReady.addOnce(function () {
		            var done = function () {
		                if (_this._isTerminated)
		                    return;
		                loadingScene.end();
		            };
		            var prepare = scene._waitingPrepare;
		            scene._waitingPrepare = undefined;
		            if (prepare) {
		                prepare(done);
		            }
		            else {
		                // NOTE: 異常系ではあるが prepare が存在しない場合は loadingScene.end() を直接呼ぶ
		                _this._pushPostTickTask(loadingScene.end, loadingScene);
		            }
		        });
		        return loadingScene;
		    };
		    Game.prototype._cleanDB = function () {
		        this.db.clean();
		        this._localDb.clean();
		    };
		    return Game;
		}());
		Game.Game = Game$1;
		
		return Game;
	}

	var hasRequiredIndex_common;

	function requireIndex_common () {
		if (hasRequiredIndex_common) return index_common;
		hasRequiredIndex_common = 1;
		(function (exports) {
			var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    var desc = Object.getOwnPropertyDescriptor(m, k);
			    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			      desc = { enumerable: true, get: function() { return m[k]; } };
			    }
			    Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    o[k2] = m[k];
			}));
			var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
			    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.PathUtil = exports.VideoSystem = exports.ShaderProgram = exports.Module = exports.AudioSystem = void 0;
			__exportStar(requireLib$3(), exports);
			__exportStar(requireCjs(), exports);
			// pdi-types 由来の型を g 直下から reexport する。
			// ただし一部の型名は、akashic-engine で同名のクラス実装を与えているため、
			// そのままでは両方 export しようとして衝突する。
			// ここで明示的に片方を export して衝突を解決している。
			__exportStar(requireLib$2(), exports);
			var AudioSystem_1 = requireAudioSystem();
			Object.defineProperty(exports, "AudioSystem", { enumerable: true, get: function () { return AudioSystem_1.AudioSystem; } });
			var Module_1 = requireModule();
			Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return Module_1.Module; } });
			var ShaderProgram_1 = requireShaderProgram();
			Object.defineProperty(exports, "ShaderProgram", { enumerable: true, get: function () { return ShaderProgram_1.ShaderProgram; } });
			var VideoSystem_1 = requireVideoSystem();
			Object.defineProperty(exports, "VideoSystem", { enumerable: true, get: function () { return VideoSystem_1.VideoSystem; } });
			// 後方互換性のため PathUtil のみ reexport する。
			var PathUtil_1 = requirePathUtil();
			Object.defineProperty(exports, "PathUtil", { enumerable: true, get: function () { return PathUtil_1.PathUtil; } });
			__exportStar(requireCacheableE(), exports);
			__exportStar(requireE(), exports);
			__exportStar(requireFilledRect(), exports);
			__exportStar(requireFrameSprite(), exports);
			__exportStar(requireLabel(), exports);
			__exportStar(requirePane(), exports);
			__exportStar(requireSprite(), exports);
			__exportStar(requireAssetAccessor(), exports);
			__exportStar(requireAssetGenerationConfiguration(), exports);
			__exportStar(requireAssetHolder(), exports);
			__exportStar(requireAssetLoadFailureInfo(), exports);
			__exportStar(requireAssetManager(), exports);
			__exportStar(requireAssetManagerLoadHandler(), exports);
			__exportStar(requireAudioPlayContext(), exports);
			__exportStar(requireAudioSystem(), exports);
			__exportStar(requireAudioSystemManager(), exports);
			__exportStar(requireAudioUtil$1(), exports);
			__exportStar(requireBitmapFont(), exports);
			__exportStar(requireCamera(), exports);
			__exportStar(requireCamera2D(), exports);
			__exportStar(requireCollision(), exports);
			__exportStar(requireDefaultLoadingScene(), exports);
			__exportStar(requireDefaultSkippingScene(), exports);
			__exportStar(requireDynamicAssetConfiguration(), exports);
			__exportStar(requireDynamicFont(), exports);
			__exportStar(requireEntityStateFlags(), exports);
			__exportStar(requireEvent(), exports);
			__exportStar(requireEventConverter(), exports);
			__exportStar(requireEventFilter(), exports);
			__exportStar(requireEventFilterController(), exports);
			__exportStar(requireEventIndex(), exports);
			__exportStar(requireEventPriority(), exports);
			__exportStar(requireExceptionFactory$2(), exports);
			__exportStar(requireFont(), exports);
			__exportStar(requireGameMainParameterObject(), exports);
			__exportStar(requireInternalOperationPluginInfo(), exports);
			__exportStar(requireLoadingScene(), exports);
			__exportStar(requireLocalTickModeString(), exports);
			__exportStar(requireMatrix(), exports);
			__exportStar(requireModule(), exports);
			__exportStar(requireModuleManager(), exports);
			__exportStar(requireNinePatchSurfaceEffector(), exports);
			__exportStar(requireObject2D(), exports);
			__exportStar(requireOperationPlugin(), exports);
			__exportStar(requireOperationPluginManager(), exports);
			__exportStar(requireOperationPluginOperation(), exports);
			__exportStar(requireOperationPluginStatic(), exports);
			__exportStar(requirePlayer(), exports);
			__exportStar(requirePointEventResolver(), exports);
			__exportStar(requireRandomGenerator(), exports);
			__exportStar(requireRequire(), exports);
			__exportStar(requireRequireCacheable(), exports);
			__exportStar(requireRequireCachedValue(), exports);
			__exportStar(requireScriptAssetContext(), exports);
			__exportStar(requireShaderProgram(), exports);
			__exportStar(requireSnapshotSaveRequest(), exports);
			__exportStar(requireSpriteFactory(), exports);
			__exportStar(requireSurfaceAtlas(), exports);
			__exportStar(requireSurfaceAtlasSet(), exports);
			__exportStar(requireSurfaceAtlasSlot(), exports);
			__exportStar(requireSurfaceEffector(), exports);
			__exportStar(requireSurfaceUtil(), exports);
			__exportStar(requireTextAlign(), exports);
			__exportStar(requireTextAlignString(), exports);
			__exportStar(requireTextMetrics(), exports);
			__exportStar(requireTickGenerationModeString(), exports);
			__exportStar(requireTimer(), exports);
			__exportStar(requireTimerManager(), exports);
			__exportStar(requireUtil(), exports);
			__exportStar(requireVideoSystem(), exports);
			__exportStar(requireWeakRefKVS(), exports);
			__exportStar(requireXorshift(), exports);
			__exportStar(requireXorshiftRandomGenerator(), exports);
			__exportStar(requireScene(), exports);
			__exportStar(requireGame(), exports);
			
		} (index_common));
		return index_common;
	}

	var GameHandlerSet$1 = {};

	var hasRequiredGameHandlerSet$1;

	function requireGameHandlerSet$1 () {
		if (hasRequiredGameHandlerSet$1) return GameHandlerSet$1;
		hasRequiredGameHandlerSet$1 = 1;
		Object.defineProperty(GameHandlerSet$1, "__esModule", { value: true });
		
		return GameHandlerSet$1;
	}

	var hasRequiredLib$1;

	function requireLib$1 () {
		if (hasRequiredLib$1) return lib$3;
		hasRequiredLib$1 = 1;
		(function (exports) {
			var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    var desc = Object.getOwnPropertyDescriptor(m, k);
			    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			      desc = { enumerable: true, get: function() { return m[k]; } };
			    }
			    Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    o[k2] = m[k];
			}));
			var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
			    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			__exportStar(requireIndex_common(), exports);
			__exportStar(requireGameHandlerSet$1(), exports); // NOTE: コンテンツから参照する必要はない
			
		} (lib$3));
		return lib$3;
	}

	var akashicEngine;
	var hasRequiredAkashicEngine;

	function requireAkashicEngine () {
		if (hasRequiredAkashicEngine) return akashicEngine;
		hasRequiredAkashicEngine = 1;
		akashicEngine = requireLib$1();
		return akashicEngine;
	}

	var GameHandlerSet = {};

	var hasRequiredGameHandlerSet;

	function requireGameHandlerSet () {
		if (hasRequiredGameHandlerSet) return GameHandlerSet;
		hasRequiredGameHandlerSet = 1;
		Object.defineProperty(GameHandlerSet, "__esModule", { value: true });
		GameHandlerSet.GameHandlerSet = void 0;
		var tslib_1 = require$$0;
		var g = tslib_1.__importStar(requireAkashicEngine());
		// TODO: いくつかのメソッドは現状動作しない。要実装検討。
		var GameHandlerSet$1 = /** @class */ (function () {
		    function GameHandlerSet(param) {
		        this.raiseEventTrigger = new g.Trigger();
		        this.raiseTickTrigger = new g.Trigger();
		        this.changeSceneModeTrigger = new g.Trigger();
		        this.snapshotTrigger = new g.Trigger();
		        this._eventFilterFuncs = null;
		        this._getCurrentTimeFunc = null;
		        this._local = null;
		        this._tickGenerationMode = null;
		        this.isSnapshotSaver = !!param.isSnapshotSaver;
		    }
		    GameHandlerSet.prototype.setCurrentTimeFunc = function (fun) {
		        this._getCurrentTimeFunc = fun;
		    };
		    GameHandlerSet.prototype.setEventFilterFuncs = function (funcs) {
		        this._eventFilterFuncs = funcs;
		    };
		    GameHandlerSet.prototype.removeAllEventFilters = function () {
		        if (this._eventFilterFuncs)
		            this._eventFilterFuncs.removeFilter();
		    };
		    GameHandlerSet.prototype.changeSceneMode = function (mode) {
		        this._local = mode.local;
		        this._tickGenerationMode = mode.tickGenerationMode;
		        this.changeSceneModeTrigger.fire(mode);
		    };
		    GameHandlerSet.prototype.getCurrentTime = function () {
		        if (this._getCurrentTimeFunc == null) {
		            return 0;
		        }
		        return Math.floor(this._getCurrentTimeFunc());
		    };
		    GameHandlerSet.prototype.raiseEvent = function (event) {
		        this.raiseEventTrigger.fire(event);
		    };
		    GameHandlerSet.prototype.raiseTick = function (events) {
		        if (events)
		            this.raiseTickTrigger.fire(events);
		    };
		    GameHandlerSet.prototype.addEventFilter = function (filter, handleEmpty) {
		        if (this._eventFilterFuncs)
		            this._eventFilterFuncs.addFilter(filter, handleEmpty);
		    };
		    GameHandlerSet.prototype.removeEventFilter = function (filter) {
		        if (this._eventFilterFuncs)
		            this._eventFilterFuncs.removeFilter(filter);
		    };
		    GameHandlerSet.prototype.shouldSaveSnapshot = function () {
		        return this.isSnapshotSaver;
		    };
		    GameHandlerSet.prototype.getInstanceType = function () {
		        // NOTE: Active かどうかは `shouldSaveSnapshot()` と等価なので、簡易対応としてこの実装を用いる。
		        return this.shouldSaveSnapshot() ? "active" : "passive";
		    };
		    GameHandlerSet.prototype.saveSnapshot = function (frame, gameSnapshot, randGenSer, timestamp) {
		        if (!this.shouldSaveSnapshot())
		            return;
		        this.snapshotTrigger.fire({
		            frame: frame,
		            timestamp: timestamp,
		            data: {
		                randGenSer: randGenSer,
		                gameSnapshot: gameSnapshot
		            }
		        });
		    };
		    return GameHandlerSet;
		}());
		GameHandlerSet.GameHandlerSet = GameHandlerSet$1;
		
		return GameHandlerSet;
	}

	var ResourceFactory$2 = {};

	function normalize (strArray) {
	  var resultArray = [];
	  if (strArray.length === 0) { return ''; }

	  if (typeof strArray[0] !== 'string') {
	    throw new TypeError('Url must be a string. Received ' + strArray[0]);
	  }

	  // If the first part is a plain protocol, we combine it with the next part.
	  if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
	    var first = strArray.shift();
	    strArray[0] = first + strArray[0];
	  }

	  // There must be two or three slashes in the file protocol, two slashes in anything else.
	  if (strArray[0].match(/^file:\/\/\//)) {
	    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
	  } else {
	    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
	  }

	  for (var i = 0; i < strArray.length; i++) {
	    var component = strArray[i];

	    if (typeof component !== 'string') {
	      throw new TypeError('Url must be a string. Received ' + component);
	    }

	    if (component === '') { continue; }

	    if (i > 0) {
	      // Removing the starting slashes for each component but the first.
	      component = component.replace(/^[\/]+/, '');
	    }
	    if (i < strArray.length - 1) {
	      // Removing the ending slashes for each component but the last.
	      component = component.replace(/[\/]+$/, '');
	    } else {
	      // For the last component we will combine multiple slashes to a single one.
	      component = component.replace(/[\/]+$/, '/');
	    }

	    resultArray.push(component);

	  }

	  var str = resultArray.join('/');
	  // Each input component is now separated by a single slash except the possible first plain protocol part.

	  // remove trailing slash before parameters or hash
	  str = str.replace(/\/(\?|&|#[^!])/g, '$1');

	  // replace ? in parameters with &
	  var parts = str.split('?');
	  str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

	  return str;
	}

	function urlJoin() {
	  var input;

	  if (typeof arguments[0] === 'object') {
	    input = arguments[0];
	  } else {
	    input = [].slice.call(arguments);
	  }

	  return normalize(input);
	}

	var urlJoin$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: urlJoin
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(urlJoin$1);

	var BinaryAsset$2 = {};

	var BinaryAsset$1 = {};

	var XHRLoader = {};

	var ExceptionFactory$1 = {};

	var hasRequiredExceptionFactory$1;

	function requireExceptionFactory$1 () {
		if (hasRequiredExceptionFactory$1) return ExceptionFactory$1;
		hasRequiredExceptionFactory$1 = 1;
		Object.defineProperty(ExceptionFactory$1, "__esModule", { value: true });
		ExceptionFactory$1.ExceptionFactory = void 0;
		var ExceptionFactory;
		(function (ExceptionFactory) {
		    function createAssetLoadError(message, retriable, cause) {
		        if (retriable === void 0) { retriable = true; }
		        return {
		            name: "AssetLoadError",
		            message: message,
		            retriable: retriable,
		            cause: cause
		        };
		    }
		    ExceptionFactory.createAssetLoadError = createAssetLoadError;
		})(ExceptionFactory || (ExceptionFactory$1.ExceptionFactory = ExceptionFactory = {}));
		return ExceptionFactory$1;
	}

	var hasRequiredXHRLoader;

	function requireXHRLoader () {
		if (hasRequiredXHRLoader) return XHRLoader;
		hasRequiredXHRLoader = 1;
		Object.defineProperty(XHRLoader, "__esModule", { value: true });
		XHRLoader.XHRLoader = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var XHRLoader$1 = /** @class */ (function () {
		    function XHRLoader(options) {
		        if (options === void 0) { options = {}; }
		        // デフォルトのタイムアウトは15秒
		        // TODO: タイムアウト値はこれが妥当であるか後日詳細を検討する
		        this.timeout = options.timeout || 15000;
		    }
		    XHRLoader.prototype.get = function (url, callback) {
		        this._getRequestObject({
		            url: url,
		            responseType: "text"
		        }, callback);
		    };
		    XHRLoader.prototype.getArrayBuffer = function (url, callback) {
		        this._getRequestObject({
		            url: url,
		            responseType: "arraybuffer"
		        }, callback);
		    };
		    XHRLoader.prototype._getRequestObject = function (requestObject, callback) {
		        var request = new XMLHttpRequest();
		        request.open("GET", requestObject.url, true);
		        request.responseType = requestObject.responseType;
		        request.timeout = this.timeout;
		        request.addEventListener("timeout", function () {
		            callback(ExceptionFactory_1.ExceptionFactory.createAssetLoadError("loading timeout"));
		        }, false);
		        request.addEventListener("load", function () {
		            if (request.status >= 200 && request.status < 300) {
		                // "text" とそれ以外で取得方法を分類する
		                var response = requestObject.responseType === "text" ? request.responseText : request.response;
		                callback(null, response);
		            }
		            else {
		                callback(ExceptionFactory_1.ExceptionFactory.createAssetLoadError("loading error. status: " + request.status));
		            }
		        }, false);
		        request.addEventListener("error", function () {
		            callback(ExceptionFactory_1.ExceptionFactory.createAssetLoadError("loading error. status: " + request.status));
		        }, false);
		        request.send();
		    };
		    return XHRLoader;
		}());
		XHRLoader.XHRLoader = XHRLoader$1;
		return XHRLoader;
	}

	var Asset$2 = {};

	var hasRequiredAsset$2;

	function requireAsset$2 () {
		if (hasRequiredAsset$2) return Asset$2;
		hasRequiredAsset$2 = 1;
		Object.defineProperty(Asset$2, "__esModule", { value: true });
		Asset$2.Asset = void 0;
		var trigger_1 = requireCjs();
		var Asset = /** @class */ (function () {
		    function Asset(id, path) {
		        this.onDestroyed = new trigger_1.Trigger();
		        this.id = id;
		        this.originalPath = path;
		        this.path = this._assetPathFilter(path);
		    }
		    Asset.prototype.destroy = function () {
		        this.onDestroyed.fire(this);
		        this.id = undefined;
		        this.originalPath = undefined;
		        this.path = undefined;
		        this.onDestroyed.destroy();
		        this.onDestroyed = undefined;
		    };
		    Asset.prototype.destroyed = function () {
		        return this.id === undefined;
		    };
		    Asset.prototype.inUse = function () {
		        return false;
		    };
		    Asset.prototype._assetPathFilter = function (path) {
		        // 拡張子の補完・読み替えが必要なassetはこれをオーバーライドすればよい。(対応形式が限定されるaudioなどの場合)
		        return path;
		    };
		    return Asset;
		}());
		Asset$2.Asset = Asset;
		return Asset$2;
	}

	var hasRequiredBinaryAsset$2;

	function requireBinaryAsset$2 () {
		if (hasRequiredBinaryAsset$2) return BinaryAsset$1;
		hasRequiredBinaryAsset$2 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(BinaryAsset$1, "__esModule", { value: true });
		BinaryAsset$1.BinaryAsset = void 0;
		var XHRLoader_1 = requireXHRLoader();
		var Asset_1 = requireAsset$2();
		var BinaryAsset = /** @class */ (function (_super) {
		    __extends(BinaryAsset, _super);
		    function BinaryAsset(id, assetPath) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "binary";
		        _this.data = undefined;
		        return _this;
		    }
		    BinaryAsset.prototype.destroy = function () {
		        this.data = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    BinaryAsset.prototype._load = function (handler) {
		        var _this = this;
		        var loader = new XHRLoader_1.XHRLoader();
		        loader.getArrayBuffer(this.path, function (error, responseData) {
		            if (error) {
		                handler._onAssetError(_this, error);
		                return;
		            }
		            if (responseData == null) {
		                handler._onAssetError(_this, {
		                    name: "AssetLoadError",
		                    retriable: false,
		                    message: "BinaryAsset#_load(): no data received"
		                });
		                return;
		            }
		            _this.data = responseData;
		            handler._onAssetLoad(_this);
		        });
		    };
		    return BinaryAsset;
		}(Asset_1.Asset));
		BinaryAsset$1.BinaryAsset = BinaryAsset;
		return BinaryAsset$1;
	}

	var hasRequiredBinaryAsset$1;

	function requireBinaryAsset$1 () {
		if (hasRequiredBinaryAsset$1) return BinaryAsset$2;
		hasRequiredBinaryAsset$1 = 1;
		Object.defineProperty(BinaryAsset$2, "__esModule", { value: true });
		BinaryAsset$2.BinaryAsset = void 0;
		var tslib_1 = require$$0;
		var BinaryAsset_1 = requireBinaryAsset$2();
		var BinaryAsset = /** @class */ (function (_super) {
		    tslib_1.__extends(BinaryAsset, _super);
		    function BinaryAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return BinaryAsset;
		}(BinaryAsset_1.BinaryAsset));
		BinaryAsset$2.BinaryAsset = BinaryAsset;
		
		return BinaryAsset$2;
	}

	var GeneratedVectorImageAsset = {};

	var GeneratedSVGImageAsset = {};

	var SVGImageAsset$1 = {};

	var Context2DSurface$1 = {};

	var CanvasSurface = {};

	var Surface$1 = {};

	var hasRequiredSurface$1;

	function requireSurface$1 () {
		if (hasRequiredSurface$1) return Surface$1;
		hasRequiredSurface$1 = 1;
		Object.defineProperty(Surface$1, "__esModule", { value: true });
		Surface$1.Surface = void 0;
		var Surface = /** @class */ (function () {
		    function Surface(width, height, drawable) {
		        // 非整数の動作は保証していないが、環境依存でエラーになるトラブルを軽減するため切り上げ。
		        this.width = Math.ceil(width);
		        this.height = Math.ceil(height);
		        this._drawable = drawable;
		    }
		    Surface.prototype.destroy = function () {
		        this._destroyed = true;
		    };
		    Surface.prototype.destroyed = function () {
		        // _destroyedはundefinedかtrueなため、常にbooleanが返すように!!演算子を用いる
		        return !!this._destroyed;
		    };
		    return Surface;
		}());
		Surface$1.Surface = Surface;
		return Surface$1;
	}

	var hasRequiredCanvasSurface;

	function requireCanvasSurface () {
		if (hasRequiredCanvasSurface) return CanvasSurface;
		hasRequiredCanvasSurface = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(CanvasSurface, "__esModule", { value: true });
		CanvasSurface.CanvasSurface = void 0;
		var Surface_1 = requireSurface$1();
		var CanvasSurface$1 = /** @class */ (function (_super) {
		    __extends(CanvasSurface, _super);
		    function CanvasSurface(width, height) {
		        var _this = this;
		        var canvas = document.createElement("canvas");
		        _this = _super.call(this, width, height, canvas) || this;
		        canvas.width = width;
		        canvas.height = height;
		        _this.canvas = canvas;
		        return _this;
		    }
		    CanvasSurface.prototype.destroy = function () {
		        this.canvas.width = 1;
		        this.canvas.height = 1;
		        this.canvas = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    CanvasSurface.prototype.getHTMLElement = function () {
		        return this.canvas;
		    };
		    /**
		     * 表示上の拡大率を変更する。
		     * `changeRawSize()` との差異に注意。
		     */
		    CanvasSurface.prototype.changeVisualScale = function (xScale, yScale) {
		        /*
		         Canvas要素のリサイズをCSS transformで行う。
		         CSSのwidth/height styleによるリサイズはおかしくなるケースが存在するので、可能な限りtransformを使う。
		         - https://twitter.com/uupaa/status/639002317576998912
		         - http://havelog.ayumusato.com/develop/performance/e554-paint_gpu_acceleration_problems.html
		         - http://buccchi.jp/blog/2013/03/android_canvas_deathpoint/
		         */
		        var canvasStyle = this.canvas.style;
		        if ("transform" in canvasStyle) {
		            canvasStyle.transformOrigin = "0 0";
		            canvasStyle.transform = "scale(" + xScale + "," + yScale + ")";
		        }
		        else if ("webkitTransform" in canvasStyle) {
		            canvasStyle.webkitTransformOrigin = "0 0";
		            canvasStyle.webkitTransform = "scale(" + xScale + "," + yScale + ")";
		        }
		        else {
		            canvasStyle.width = Math.floor(xScale * this.width) + "px";
		            canvasStyle.height = Math.floor(yScale * this.width) + "px";
		        }
		    };
		    return CanvasSurface;
		}(Surface_1.Surface));
		CanvasSurface.CanvasSurface = CanvasSurface$1;
		return CanvasSurface;
	}

	var CanvasSurfaceContext = {};

	var CanvasRenderingState = {};

	var AffineTransformer = {};

	var hasRequiredAffineTransformer;

	function requireAffineTransformer () {
		if (hasRequiredAffineTransformer) return AffineTransformer;
		hasRequiredAffineTransformer = 1;
		Object.defineProperty(AffineTransformer, "__esModule", { value: true });
		AffineTransformer.AffineTransformer = void 0;
		var AffineTransformer$1 = /** @class */ (function () {
		    function AffineTransformer(rhs) {
		        if (rhs) {
		            this.matrix = new Float32Array(rhs.matrix);
		        }
		        else {
		            this.matrix = new Float32Array([1, 0, 0, 1, 0, 0]);
		        }
		    }
		    AffineTransformer.prototype.scale = function (x, y) {
		        var m = this.matrix;
		        m[0] *= x;
		        m[1] *= x;
		        m[2] *= y;
		        m[3] *= y;
		        return this;
		    };
		    AffineTransformer.prototype.translate = function (x, y) {
		        var m = this.matrix;
		        m[4] += m[0] * x + m[2] * y;
		        m[5] += m[1] * x + m[3] * y;
		        return this;
		    };
		    AffineTransformer.prototype.transform = function (matrix) {
		        var m = this.matrix;
		        var a = matrix[0] * m[0] + matrix[1] * m[2];
		        var b = matrix[0] * m[1] + matrix[1] * m[3];
		        var c = matrix[2] * m[0] + matrix[3] * m[2];
		        var d = matrix[2] * m[1] + matrix[3] * m[3];
		        var e = matrix[4] * m[0] + matrix[5] * m[2] + m[4];
		        var f = matrix[4] * m[1] + matrix[5] * m[3] + m[5];
		        m[0] = a;
		        m[1] = b;
		        m[2] = c;
		        m[3] = d;
		        m[4] = e;
		        m[5] = f;
		        return this;
		    };
		    AffineTransformer.prototype.setTransform = function (matrix) {
		        var m = this.matrix;
		        m[0] = matrix[0];
		        m[1] = matrix[1];
		        m[2] = matrix[2];
		        m[3] = matrix[3];
		        m[4] = matrix[4];
		        m[5] = matrix[5];
		    };
		    AffineTransformer.prototype.copyFrom = function (rhs) {
		        this.matrix.set(rhs.matrix);
		        return this;
		    };
		    return AffineTransformer;
		}());
		AffineTransformer.AffineTransformer = AffineTransformer$1;
		return AffineTransformer;
	}

	var hasRequiredCanvasRenderingState;

	function requireCanvasRenderingState () {
		if (hasRequiredCanvasRenderingState) return CanvasRenderingState;
		hasRequiredCanvasRenderingState = 1;
		Object.defineProperty(CanvasRenderingState, "__esModule", { value: true });
		CanvasRenderingState.CanvasRenderingState = void 0;
		var AffineTransformer_1 = requireAffineTransformer();
		var CanvasRenderingState$1 = /** @class */ (function () {
		    function CanvasRenderingState(crs) {
		        if (crs) {
		            this.fillStyle = crs.fillStyle;
		            this.globalAlpha = crs.globalAlpha;
		            this.globalCompositeOperation = crs.globalCompositeOperation;
		            this.transformer = new AffineTransformer_1.AffineTransformer(crs.transformer);
		        }
		        else {
		            this.fillStyle = "#000000";
		            this.globalAlpha = 1.0;
		            this.globalCompositeOperation = "source-over";
		            this.transformer = new AffineTransformer_1.AffineTransformer();
		        }
		    }
		    return CanvasRenderingState;
		}());
		CanvasRenderingState.CanvasRenderingState = CanvasRenderingState$1;
		return CanvasRenderingState;
	}

	var hasRequiredCanvasSurfaceContext;

	function requireCanvasSurfaceContext () {
		if (hasRequiredCanvasSurfaceContext) return CanvasSurfaceContext;
		hasRequiredCanvasSurfaceContext = 1;
		Object.defineProperty(CanvasSurfaceContext, "__esModule", { value: true });
		CanvasSurfaceContext.CanvasSurfaceContext = void 0;
		var CanvasRenderingState_1 = requireCanvasRenderingState();
		var CanvasSurfaceContext$1 = /** @class */ (function () {
		    function CanvasSurfaceContext(context) {
		        this._stateStack = [];
		        this._modifiedTransform = false;
		        this._context = context;
		        var state = new CanvasRenderingState_1.CanvasRenderingState();
		        this._contextFillStyle = state.fillStyle;
		        this._contextGlobalAlpha = state.globalAlpha;
		        this._contextGlobalCompositeOperation = state.globalCompositeOperation;
		        this.pushState(state);
		    }
		    Object.defineProperty(CanvasSurfaceContext.prototype, "fillStyle", {
		        get: function () {
		            return this.currentState().fillStyle;
		        },
		        set: function (fillStyle) {
		            this.currentState().fillStyle = fillStyle;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(CanvasSurfaceContext.prototype, "globalAlpha", {
		        get: function () {
		            return this.currentState().globalAlpha;
		        },
		        set: function (globalAlpha) {
		            this.currentState().globalAlpha = globalAlpha;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(CanvasSurfaceContext.prototype, "globalCompositeOperation", {
		        get: function () {
		            return this.currentState().globalCompositeOperation;
		        },
		        set: function (operation) {
		            this.currentState().globalCompositeOperation = operation;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    CanvasSurfaceContext.prototype.getCanvasRenderingContext2D = function () {
		        return this._context;
		    };
		    CanvasSurfaceContext.prototype.clearRect = function (x, y, width, height) {
		        this.prerender();
		        this._context.clearRect(x, y, width, height);
		    };
		    CanvasSurfaceContext.prototype.save = function () {
		        var state = new CanvasRenderingState_1.CanvasRenderingState(this.currentState());
		        this.pushState(state);
		    };
		    CanvasSurfaceContext.prototype.restore = function () {
		        this.popState();
		    };
		    CanvasSurfaceContext.prototype.scale = function (x, y) {
		        this.currentState().transformer.scale(x, y);
		        this._modifiedTransform = true;
		    };
		    CanvasSurfaceContext.prototype.drawImage = function (image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
		        this.prerender();
		        this._context.drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
		    };
		    CanvasSurfaceContext.prototype.fillRect = function (x, y, width, height) {
		        this.prerender();
		        this._context.fillRect(x, y, width, height);
		    };
		    CanvasSurfaceContext.prototype.fillText = function (text, x, y, maxWidth) {
		        this.prerender();
		        this._context.fillText(text, x, y, maxWidth);
		    };
		    CanvasSurfaceContext.prototype.strokeText = function (text, x, y, maxWidth) {
		        this.prerender();
		        this._context.strokeText(text, x, y, maxWidth);
		    };
		    CanvasSurfaceContext.prototype.translate = function (x, y) {
		        this.currentState().transformer.translate(x, y);
		        this._modifiedTransform = true;
		    };
		    CanvasSurfaceContext.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
		        this.currentState().transformer.transform([m11, m12, m21, m22, dx, dy]);
		        this._modifiedTransform = true;
		    };
		    CanvasSurfaceContext.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
		        this.currentState().transformer.setTransform([m11, m12, m21, m22, dx, dy]);
		        this._modifiedTransform = true;
		    };
		    CanvasSurfaceContext.prototype.setGlobalAlpha = function (globalAlpha) {
		        this.currentState().globalAlpha = globalAlpha;
		    };
		    CanvasSurfaceContext.prototype.getImageData = function (sx, sy, sw, sh) {
		        return this._context.getImageData(sx, sy, sw, sh);
		    };
		    CanvasSurfaceContext.prototype.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
		        this._context.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
		    };
		    CanvasSurfaceContext.prototype.prerender = function () {
		        var currentState = this.currentState();
		        if (currentState.fillStyle !== this._contextFillStyle) {
		            this._context.fillStyle = currentState.fillStyle;
		            this._contextFillStyle = currentState.fillStyle;
		        }
		        if (currentState.globalAlpha !== this._contextGlobalAlpha) {
		            this._context.globalAlpha = currentState.globalAlpha;
		            this._contextGlobalAlpha = currentState.globalAlpha;
		        }
		        if (currentState.globalCompositeOperation !== this._contextGlobalCompositeOperation) {
		            this._context.globalCompositeOperation = currentState.globalCompositeOperation;
		            this._contextGlobalCompositeOperation = currentState.globalCompositeOperation;
		        }
		        if (this._modifiedTransform) {
		            var transformer = currentState.transformer;
		            this._context.setTransform(transformer.matrix[0], transformer.matrix[1], transformer.matrix[2], transformer.matrix[3], transformer.matrix[4], transformer.matrix[5]);
		            this._modifiedTransform = false;
		        }
		    };
		    CanvasSurfaceContext.prototype.pushState = function (state) {
		        this._stateStack.push(state);
		    };
		    CanvasSurfaceContext.prototype.popState = function () {
		        if (this._stateStack.length <= 1) {
		            return;
		        }
		        this._stateStack.pop();
		        this._modifiedTransform = true;
		        // TODO: `_context` が外部(Context2DRenderer)で破壊されているのでここで値を反映している。本来 `_context` の操作は全てこのクラスに集約すべきである。
		        this._contextFillStyle = this._context.fillStyle;
		        this._contextGlobalAlpha = this._context.globalAlpha;
		        this._contextGlobalCompositeOperation = this._context.globalCompositeOperation;
		    };
		    CanvasSurfaceContext.prototype.currentState = function () {
		        return this._stateStack[this._stateStack.length - 1];
		    };
		    return CanvasSurfaceContext;
		}());
		CanvasSurfaceContext.CanvasSurfaceContext = CanvasSurfaceContext$1;
		return CanvasSurfaceContext;
	}

	var Context2DRenderer = {};

	var hasRequiredContext2DRenderer;

	function requireContext2DRenderer () {
		if (hasRequiredContext2DRenderer) return Context2DRenderer;
		hasRequiredContext2DRenderer = 1;
		Object.defineProperty(Context2DRenderer, "__esModule", { value: true });
		Context2DRenderer.Context2DRenderer = void 0;
		var compositeOperationTable = {
		    "source-over": "source-over",
		    "source-atop": "source-atop",
		    "lighter": "lighter",
		    "copy": "copy",
		    "experimental-source-in": "source-in",
		    "experimental-source-out": "source-out",
		    "experimental-destination-atop": "destination-atop",
		    "experimental-destination-in": "destination-in",
		    "destination-out": "destination-out",
		    "destination-over": "destination-over",
		    "xor": "xor",
		    "difference": "difference",
		    "saturation": "saturation"
		};
		var Context2DRenderer$1 = /** @class */ (function () {
		    function Context2DRenderer(surface) {
		        this.surface = surface;
		        this.context = surface.context();
		        this.canvasRenderingContext2D = this.context.getCanvasRenderingContext2D();
		    }
		    Context2DRenderer.prototype.begin = function () {
		        this.canvasRenderingContext2D.save();
		        this.context.save();
		    };
		    Context2DRenderer.prototype.end = function () {
		        this.canvasRenderingContext2D.restore();
		        this.context.restore();
		    };
		    Context2DRenderer.prototype.clear = function () {
		        this.context.clearRect(0, 0, this.surface.width, this.surface.height);
		    };
		    Context2DRenderer.prototype.drawImage = function (surface, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY) {
		        this.context.drawImage(surface._drawable, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, width, height);
		    };
		    Context2DRenderer.prototype.drawSprites = function (surface, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, count) {
		        for (var i = 0; i < count; ++i) {
		            this.drawImage(surface, offsetX[i], offsetY[i], width[i], height[i], canvasOffsetX[i], canvasOffsetY[i]);
		        }
		    };
		    Context2DRenderer.prototype.translate = function (x, y) {
		        this.context.translate(x, y);
		    };
		    Context2DRenderer.prototype.transform = function (matrix) {
		        this.context.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
		    };
		    Context2DRenderer.prototype.opacity = function (opacity) {
		        // Note:globalAlphaの初期値が1であることは仕様上保証されているため、常に掛け合わせる
		        this.context.globalAlpha *= opacity;
		    };
		    Context2DRenderer.prototype.save = function () {
		        this.context.save();
		    };
		    Context2DRenderer.prototype.restore = function () {
		        this.context.restore();
		    };
		    Context2DRenderer.prototype.fillRect = function (x, y, width, height, cssColor) {
		        this.context.fillStyle = cssColor;
		        this.context.fillRect(x, y, width, height);
		    };
		    Context2DRenderer.prototype.setCompositeOperation = function (operation) {
		        this.context.globalCompositeOperation = compositeOperationTable[operation] || "source-over";
		    };
		    Context2DRenderer.prototype.setOpacity = function (opacity) {
		        this.context.globalAlpha = opacity;
		    };
		    Context2DRenderer.prototype.setTransform = function (matrix) {
		        this.context.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
		    };
		    Context2DRenderer.prototype.setShaderProgram = function (_shaderProgram) {
		        throw new Error("Context2DRenderer#setShaderProgram() is not implemented");
		    };
		    Context2DRenderer.prototype.isSupportedShaderProgram = function () {
		        return false;
		    };
		    Context2DRenderer.prototype.getContext = function () {
		        return this.context.getCanvasRenderingContext2D();
		    };
		    Context2DRenderer.prototype.flush = function () {
		        // do nothing.
		    };
		    Context2DRenderer.prototype._getImageData = function (sx, sy, sw, sh) {
		        return this.context.getImageData(sx, sy, sw, sh);
		    };
		    Context2DRenderer.prototype._putImageData = function (imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
		        if (dirtyX === void 0) { dirtyX = 0; }
		        if (dirtyY === void 0) { dirtyY = 0; }
		        if (dirtyWidth === void 0) { dirtyWidth = imageData.width; }
		        if (dirtyHeight === void 0) { dirtyHeight = imageData.height; }
		        this.context.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
		    };
		    return Context2DRenderer;
		}());
		Context2DRenderer.Context2DRenderer = Context2DRenderer$1;
		return Context2DRenderer;
	}

	var hasRequiredContext2DSurface$1;

	function requireContext2DSurface$1 () {
		if (hasRequiredContext2DSurface$1) return Context2DSurface$1;
		hasRequiredContext2DSurface$1 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(Context2DSurface$1, "__esModule", { value: true });
		Context2DSurface$1.Context2DSurface = void 0;
		var CanvasSurface_1 = requireCanvasSurface();
		var CanvasSurfaceContext_1 = requireCanvasSurfaceContext();
		var Context2DRenderer_1 = requireContext2DRenderer();
		var Context2DSurface = /** @class */ (function (_super) {
		    __extends(Context2DSurface, _super);
		    function Context2DSurface() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    Context2DSurface.prototype.context = function () {
		        if (!this._context) {
		            var context = this.canvas.getContext("2d");
		            if (!context) {
		                throw new Error("Context2DSurface#context(): could not initialize CanvasRenderingContext2D");
		            }
		            this._context = new CanvasSurfaceContext_1.CanvasSurfaceContext(context);
		        }
		        return this._context;
		    };
		    Context2DSurface.prototype.renderer = function () {
		        if (!this._renderer) {
		            this._renderer = new Context2DRenderer_1.Context2DRenderer(this);
		        }
		        return this._renderer;
		    };
		    Context2DSurface.prototype.changePhysicalScale = function (xScale, yScale) {
		        if (!this._context) {
		            throw new Error("Context2DSurface#changePhysicalScale(): context has not been initialized");
		        }
		        this.canvas.width = this.width * xScale;
		        this.canvas.height = this.height * yScale;
		        this._context.scale(xScale, yScale);
		    };
		    Context2DSurface.prototype.isPlaying = function () {
		        return false;
		    };
		    return Context2DSurface;
		}(CanvasSurface_1.CanvasSurface));
		Context2DSurface$1.Context2DSurface = Context2DSurface;
		return Context2DSurface$1;
	}

	var hasRequiredSVGImageAsset$1;

	function requireSVGImageAsset$1 () {
		if (hasRequiredSVGImageAsset$1) return SVGImageAsset$1;
		hasRequiredSVGImageAsset$1 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(SVGImageAsset$1, "__esModule", { value: true });
		SVGImageAsset$1.SVGImageAsset = SVGImageAsset$1.SVGImageAssetSurface = void 0;
		var Context2DSurface_1 = requireContext2DSurface$1();
		var Surface_1 = requireSurface$1();
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var Asset_1 = requireAsset$2();
		var SVGImageAssetSurface = /** @class */ (function (_super) {
		    __extends(SVGImageAssetSurface, _super);
		    function SVGImageAssetSurface() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    SVGImageAssetSurface.prototype.renderer = function () {
		        throw new Error("SVGImageAssetSurface cannot be rendered.");
		    };
		    SVGImageAssetSurface.prototype.isPlaying = function () {
		        return false;
		    };
		    return SVGImageAssetSurface;
		}(Surface_1.Surface));
		SVGImageAsset$1.SVGImageAssetSurface = SVGImageAssetSurface;
		var SVGImageAsset = /** @class */ (function (_super) {
		    __extends(SVGImageAsset, _super);
		    function SVGImageAsset(id, path, width, height, hint) {
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "vector-image";
		        _this.width = width;
		        _this.height = height;
		        _this.hint = hint;
		        _this.data = null;
		        _this._surface = null;
		        return _this;
		    }
		    SVGImageAsset.prototype.destroy = function () {
		        this.data = null;
		        this.hint = undefined;
		        this._surface = null;
		        _super.prototype.destroy.call(this);
		    };
		    SVGImageAsset.prototype._load = function (loader) {
		        var _this = this;
		        var image = new Image();
		        if (this.hint && this.hint.untainted) {
		            image.crossOrigin = "anonymous";
		        }
		        image.onerror = function () {
		            loader._onAssetError(_this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError("SVGImageAsset unknown loading error"));
		        };
		        image.onload = function () {
		            _this.data = image;
		            loader._onAssetLoad(_this);
		        };
		        image.src = this.path;
		    };
		    SVGImageAsset.prototype.createSurface = function (width, height, sx, sy, sWidth, sHeight) {
		        if (sx === void 0) { sx = 0; }
		        if (sy === void 0) { sy = 0; }
		        var _a = this, viewportWidth = _a.width, viewportHeight = _a.height, data = _a.data;
		        if (!data) {
		            throw new Error("SVGImageAsset#asSurface: not yet loaded.");
		        }
		        if (!this._surface) {
		            this._surface = new SVGImageAssetSurface(viewportWidth, viewportHeight, data);
		        }
		        if (!sWidth) {
		            sWidth = viewportWidth;
		        }
		        if (!sHeight) {
		            sHeight = viewportHeight;
		        }
		        var surface = new Context2DSurface_1.Context2DSurface(width, height);
		        var renderer = surface.renderer();
		        renderer.save();
		        renderer.transform([width / sWidth, 0, 0, height / sHeight, 0, 0]);
		        renderer.drawImage(this._surface, sx, sy, sWidth, sHeight, 0, 0);
		        renderer.restore();
		        return surface;
		    };
		    return SVGImageAsset;
		}(Asset_1.Asset));
		SVGImageAsset$1.SVGImageAsset = SVGImageAsset;
		return SVGImageAsset$1;
	}

	var hasRequiredGeneratedSVGImageAsset;

	function requireGeneratedSVGImageAsset () {
		if (hasRequiredGeneratedSVGImageAsset) return GeneratedSVGImageAsset;
		hasRequiredGeneratedSVGImageAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(GeneratedSVGImageAsset, "__esModule", { value: true });
		GeneratedSVGImageAsset.GeneratedSVGImageAsset = void 0;
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var SVGImageAsset_1 = requireSVGImageAsset$1();
		/**
		 * 文字列を解釈して動的に SVG を生成する VectorImageAsset 。
		 * `width`, `height` は `_load()` 完了まで確定しない (`0` である) 点に注意。
		 */
		var GeneratedSVGImageAsset$1 = /** @class */ (function (_super) {
		    __extends(GeneratedSVGImageAsset, _super);
		    function GeneratedSVGImageAsset(id, path, data) {
		        var _this = _super.call(this, id, path, 0, 0) || this;
		        _this._svgString = data;
		        return _this;
		    }
		    GeneratedSVGImageAsset.prototype.destroy = function () {
		        this._svgString = null;
		        _super.prototype.destroy.call(this);
		    };
		    GeneratedSVGImageAsset.prototype._load = function (loader) {
		        var _this = this;
		        var svgString = this._svgString;
		        var parser = new DOMParser();
		        var base64SVG;
		        try {
		            var doc = parser.parseFromString(svgString, "text/xml");
		            var inlineSVG = doc.getElementsByTagName("svg")[0];
		            var stringWidth = inlineSVG.getAttribute("width");
		            var stringHeight = inlineSVG.getAttribute("height");
		            if (stringWidth == null) {
		                throw new Error("must give width in the root element.");
		            }
		            if (stringHeight == null) {
		                throw new Error("must give height in the root element.");
		            }
		            if (!isPixelUnits(stringWidth)) {
		                throw new Error("the width in the root element must be given in \"px\" units");
		            }
		            if (!isPixelUnits(stringHeight)) {
		                throw new Error("the height in the root element must be given in \"px\" units");
		            }
		            base64SVG = window.btoa(svgString);
		            this.width = parseFloat(stringWidth);
		            this.height = parseFloat(stringHeight);
		        }
		        catch (e) {
		            loader._onAssetError(this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError(e.message, false, e));
		            return;
		        }
		        var image = new Image();
		        image.onerror = function (e) {
		            loader._onAssetError(_this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError("GeneratedSVGImageAsset: unknown loading error", undefined, e));
		        };
		        image.onload = function () {
		            _this.data = image;
		            loader._onAssetLoad(_this);
		        };
		        image.src = "data:image/svg+xml;base64," + base64SVG;
		    };
		    return GeneratedSVGImageAsset;
		}(SVGImageAsset_1.SVGImageAsset));
		GeneratedSVGImageAsset.GeneratedSVGImageAsset = GeneratedSVGImageAsset$1;
		/**
		 * "1.00", "1.0e2", ".1pt", "10%", "20px" などの文字列の単位が px かどうかチェックする。
		 */
		function isPixelUnits(value) {
		    // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#number
		    // [+-]? [0-9]* "." [0-9]+ ([Ee] integer)?
		    return /^[+-]?(?:(?:[0-9]+(?:\.[0-9]*)?)|(?:\.[0-9]+))(?:[eE][+-]?[0-9]+)?(?:px)?$/.test(value);
		}
		return GeneratedSVGImageAsset;
	}

	var hasRequiredGeneratedVectorImageAsset;

	function requireGeneratedVectorImageAsset () {
		if (hasRequiredGeneratedVectorImageAsset) return GeneratedVectorImageAsset;
		hasRequiredGeneratedVectorImageAsset = 1;
		Object.defineProperty(GeneratedVectorImageAsset, "__esModule", { value: true });
		GeneratedVectorImageAsset.GeneratedVectorImageAsset = void 0;
		var tslib_1 = require$$0;
		var GeneratedSVGImageAsset_1 = requireGeneratedSVGImageAsset();
		var GeneratedVectorImageAsset$1 = /** @class */ (function (_super) {
		    tslib_1.__extends(GeneratedVectorImageAsset, _super);
		    function GeneratedVectorImageAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return GeneratedVectorImageAsset;
		}(GeneratedSVGImageAsset_1.GeneratedSVGImageAsset));
		GeneratedVectorImageAsset.GeneratedVectorImageAsset = GeneratedVectorImageAsset$1;
		
		return GeneratedVectorImageAsset;
	}

	var ImageAsset$1 = {};

	var HTMLImageAsset = {};

	var hasRequiredHTMLImageAsset;

	function requireHTMLImageAsset () {
		if (hasRequiredHTMLImageAsset) return HTMLImageAsset;
		hasRequiredHTMLImageAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(HTMLImageAsset, "__esModule", { value: true });
		HTMLImageAsset.HTMLImageAsset = HTMLImageAsset.ImageAssetSurface = void 0;
		var Surface_1 = requireSurface$1();
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var Asset_1 = requireAsset$2();
		var ImageAssetSurface = /** @class */ (function (_super) {
		    __extends(ImageAssetSurface, _super);
		    function ImageAssetSurface() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ImageAssetSurface.prototype.renderer = function () {
		        throw new Error("ImageAssetSurface cannot be rendered.");
		    };
		    ImageAssetSurface.prototype.isPlaying = function () {
		        return false;
		    };
		    return ImageAssetSurface;
		}(Surface_1.Surface));
		HTMLImageAsset.ImageAssetSurface = ImageAssetSurface;
		var HTMLImageAsset$1 = /** @class */ (function (_super) {
		    __extends(HTMLImageAsset, _super);
		    function HTMLImageAsset(id, path, width, height) {
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "image";
		        _this.width = width;
		        _this.height = height;
		        _this.data = undefined;
		        _this._surface = undefined;
		        return _this;
		    }
		    HTMLImageAsset.prototype.initialize = function (hint) {
		        this.hint = hint;
		    };
		    HTMLImageAsset.prototype.destroy = function () {
		        if (this._surface && !this._surface.destroyed()) {
		            this._surface.destroy();
		        }
		        this.data = undefined;
		        this._surface = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    HTMLImageAsset.prototype._load = function (loader) {
		        var _this = this;
		        var image = new Image();
		        if (this.hint && this.hint.untainted) {
		            image.crossOrigin = "anonymous";
		        }
		        image.onerror = function () {
		            loader._onAssetError(_this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError("HTMLImageAsset unknown loading error"));
		        };
		        image.onload = function () {
		            _this.data = image;
		            loader._onAssetLoad(_this);
		        };
		        image.src = this.path;
		    };
		    HTMLImageAsset.prototype.asSurface = function () {
		        if (!this.data) {
		            throw new Error("ImageAssetImpl#asSurface: not yet loaded.");
		        }
		        if (this._surface) {
		            return this._surface;
		        }
		        this._surface = new ImageAssetSurface(this.width, this.height, this.data);
		        return this._surface;
		    };
		    return HTMLImageAsset;
		}(Asset_1.Asset));
		HTMLImageAsset.HTMLImageAsset = HTMLImageAsset$1;
		return HTMLImageAsset;
	}

	var hasRequiredImageAsset$1;

	function requireImageAsset$1 () {
		if (hasRequiredImageAsset$1) return ImageAsset$1;
		hasRequiredImageAsset$1 = 1;
		Object.defineProperty(ImageAsset$1, "__esModule", { value: true });
		ImageAsset$1.ImageAsset = void 0;
		var tslib_1 = require$$0;
		var HTMLImageAsset_1 = requireHTMLImageAsset();
		var ImageAsset = /** @class */ (function (_super) {
		    tslib_1.__extends(ImageAsset, _super);
		    function ImageAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return ImageAsset;
		}(HTMLImageAsset_1.HTMLImageAsset));
		ImageAsset$1.ImageAsset = ImageAsset;
		
		return ImageAsset$1;
	}

	var ScriptAsset$1 = {};

	var XHRScriptAsset = {};

	var hasRequiredXHRScriptAsset;

	function requireXHRScriptAsset () {
		if (hasRequiredXHRScriptAsset) return XHRScriptAsset;
		hasRequiredXHRScriptAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(XHRScriptAsset, "__esModule", { value: true });
		XHRScriptAsset.XHRScriptAsset = void 0;
		var XHRLoader_1 = requireXHRLoader();
		var Asset_1 = requireAsset$2();
		var XHRScriptAsset$1 = /** @class */ (function (_super) {
		    __extends(XHRScriptAsset, _super);
		    function XHRScriptAsset(id, path, exports) {
		        if (exports === void 0) { exports = []; }
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "script";
		        _this.script = ""; // _load() までは空文字が代入されている点に注意
		        _this.exports = exports;
		        return _this;
		    }
		    XHRScriptAsset.prototype._load = function (handler) {
		        var _this = this;
		        var loader = new XHRLoader_1.XHRLoader();
		        loader.get(this.path, function (error, responseText) {
		            if (error) {
		                handler._onAssetError(_this, error);
		                return;
		            }
		            _this.script = responseText + "\n";
		            handler._onAssetLoad(_this);
		        });
		    };
		    XHRScriptAsset.prototype.execute = function (execEnv) {
		        // TODO: この方式では読み込んだスクリプトがcookie参照できる等本質的な危険性がある
		        // 信頼できないスクリプトを読み込むようなケースでは、iframeに閉じ込めて実行などの方式を検討する事。
		        var func = this._wrap();
		        func(execEnv);
		        return execEnv.module.exports;
		    };
		    XHRScriptAsset.prototype.destroy = function () {
		        this.script = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    XHRScriptAsset.prototype._wrap = function () {
		        var postScript = "";
		        for (var _i = 0, _a = this.exports; _i < _a.length; _i++) {
		            var key = _a[_i];
		            postScript += "exports[\"".concat(key, "\"] = typeof ").concat(key, " !== \"undefined\" ? ").concat(key, " : undefined;\n");
		        }
		        var func = new Function("g", "(function(exports, require, module, __filename, __dirname) {\n" +
		            this.script + "\n" +
		            postScript + "\n" +
		            "})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);");
		        return func;
		    };
		    return XHRScriptAsset;
		}(Asset_1.Asset));
		XHRScriptAsset.XHRScriptAsset = XHRScriptAsset$1;
		return XHRScriptAsset;
	}

	var lib = {};

	var Asset$1 = {};

	var hasRequiredAsset$1;

	function requireAsset$1 () {
		if (hasRequiredAsset$1) return Asset$1;
		hasRequiredAsset$1 = 1;
		Object.defineProperty(Asset$1, "__esModule", { value: true });
		Asset$1.Asset = void 0;
		var trigger_1 = requireCjs();
		/**
		 * 各種リソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 */
		var Asset = /** @class */ (function () {
		    function Asset(id, path) {
		        this.id = id;
		        this.originalPath = path;
		        this.path = this._assetPathFilter(path);
		        this.onDestroyed = new trigger_1.Trigger();
		    }
		    Asset.prototype.destroy = function () {
		        this.onDestroyed.fire(this);
		        this.id = undefined;
		        this.originalPath = undefined;
		        this.path = undefined;
		        this.onDestroyed.destroy();
		        this.onDestroyed = undefined;
		    };
		    Asset.prototype.destroyed = function () {
		        return this.id === undefined;
		    };
		    /**
		     * 現在利用中で解放出来ない `Asset` かどうかを返す。
		     * 戻り値は、利用中である場合真、でなければ偽である。
		     *
		     * 本メソッドは通常 `false` が返るべきである。
		     * 例えば `Sprite` の元画像として使われているケース等では、その `Sprite` によって `Asset` は `Surface` に変換されているべきで、
		     * `Asset` が利用中で解放出来ない状態になっていない事を各プラットフォームで保障する必要がある。
		     *
		     * 唯一、例外的に本メソッドが `true` を返すことがあるのは音楽を表す `Asset` である。
		     * BGM等はシーンをまたいで演奏することもありえる上、
		     * 演奏中のリソースのコピーを常に各プラットフォームに強制するにはコストがかかりすぎるため、
		     * 本メソッドは `true` を返し、適切なタイミングで `Asset` が解放されるよう制御する必要がある。
		     */
		    Asset.prototype.inUse = function () {
		        return false;
		    };
		    /**
		     * @private
		     */
		    Asset.prototype._assetPathFilter = function (path) {
		        // 拡張子の補完・読み替えが必要なassetはこれをオーバーライドすればよい。(対応形式が限定されるaudioなどの場合)
		        return path;
		    };
		    return Asset;
		}());
		Asset$1.Asset = Asset;
		return Asset$1;
	}

	var AudioAsset$1 = {};

	var hasRequiredAudioAsset$1;

	function requireAudioAsset$1 () {
		if (hasRequiredAudioAsset$1) return AudioAsset$1;
		hasRequiredAudioAsset$1 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(AudioAsset$1, "__esModule", { value: true });
		AudioAsset$1.AudioAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * 音リソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 *
		 * AudioAsset#playを呼び出す事で、その音を再生することが出来る。
		 */
		var AudioAsset = /** @class */ (function (_super) {
		    __extends(AudioAsset, _super);
		    function AudioAsset(id, assetPath, duration, system, loop, hint, offset) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "audio";
		        _this.duration = duration;
		        _this.loop = loop;
		        _this.hint = hint;
		        _this._system = system;
		        _this.data = undefined;
		        _this.offset = offset;
		        return _this;
		    }
		    AudioAsset.prototype.play = function () {
		        var player = this._system.createPlayer();
		        player.play(this);
		        this._lastPlayedPlayer = player;
		        return player;
		    };
		    AudioAsset.prototype.stop = function () {
		        var players = this._system.findPlayers(this);
		        for (var i = 0; i < players.length; ++i)
		            players[i].stop();
		    };
		    AudioAsset.prototype.inUse = function () {
		        return this._system.findPlayers(this).length > 0;
		    };
		    AudioAsset.prototype.destroy = function () {
		        if (this._system)
		            this.stop();
		        this.data = undefined;
		        this._system = undefined;
		        this._lastPlayedPlayer = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return AudioAsset;
		}(Asset_1.Asset));
		AudioAsset$1.AudioAsset = AudioAsset;
		return AudioAsset$1;
	}

	var AudioPlayer$1 = {};

	var hasRequiredAudioPlayer$1;

	function requireAudioPlayer$1 () {
		if (hasRequiredAudioPlayer$1) return AudioPlayer$1;
		hasRequiredAudioPlayer$1 = 1;
		Object.defineProperty(AudioPlayer$1, "__esModule", { value: true });
		AudioPlayer$1.AudioPlayer = void 0;
		var trigger_1 = requireCjs();
		/**
		 * サウンド再生を行うクラス。
		 *
		 * 本クラスのインスタンスは、 `AudioSystem#createPlayer()` によって明示的に、
		 * または `AudioAsset#play()` によって暗黙的に生成される。
		 * ゲーム開発者は本クラスのインスタンスを直接生成すべきではない。
		 */
		var AudioPlayer = /** @class */ (function () {
		    /**
		     * `AudioPlayer` のインスタンスを生成する。
		     */
		    function AudioPlayer(system) {
		        this.onPlay = new trigger_1.Trigger();
		        this.onStop = new trigger_1.Trigger();
		        this.played = this.onPlay;
		        this.stopped = this.onStop;
		        this.currentAudio = undefined;
		        this.volume = system.volume;
		        this._muted = system._muted;
		        this._system = system;
		    }
		    /**
		     * `AudioAsset` を再生する。
		     *
		     * 再生後、 `this.onPlay` がfireされる。
		     * @param audio 再生するオーディオアセット
		     */
		    AudioPlayer.prototype.play = function (audio) {
		        this.currentAudio = audio;
		        this.onPlay.fire({
		            player: this,
		            audio: audio
		        });
		    };
		    /**
		     * 再生を停止する。
		     *
		     * 停止後、 `this.onStop` がfireされる。
		     * 再生中でない場合、何もしない(`onStop` もfireされない)。
		     */
		    AudioPlayer.prototype.stop = function () {
		        var audio = this.currentAudio;
		        if (!audio)
		            return;
		        this.currentAudio = undefined;
		        this.onStop.fire({
		            player: this,
		            audio: audio
		        });
		    };
		    /**
		     * 音声の終了を検知できるか否か。
		     * 通常、ゲーム開発者がこのメソッドを利用する必要はない。
		     */
		    AudioPlayer.prototype.canHandleStopped = function () {
		        return true;
		    };
		    /**
		     * 音量を変更する。
		     *
		     * @param volume 音量。0以上1.0以下でなければならない
		     */
		    // エンジンユーザが `AudioPlayer` の派生クラスを実装する場合は、
		    // `_changeMuted()` などと同様、このメソッドをオーバーライドして実際に音量を変更する処理を行うこと。
		    // オーバーライド先のメソッドはこのメソッドを呼びださなければならない。
		    AudioPlayer.prototype.changeVolume = function (volume) {
		        this.volume = volume;
		    };
		    /**
		     * ミュート状態を変更する。
		     *
		     * エンジンユーザが `AudioPlayer` の派生クラスを実装する場合は、
		     * このメソッドをオーバーライドして実際にミュート状態を変更する処理を行うこと。
		     * オーバーライド先のメソッドはこのメソッドを呼びださなければならない。
		     *
		     * @param muted ミュート状態にするか否か
		     * @private
		     */
		    AudioPlayer.prototype._changeMuted = function (muted) {
		        this._muted = muted;
		    };
		    /**
		     * 音量の変更を通知する。
		     * @private
		     */
		    AudioPlayer.prototype._notifyVolumeChanged = function () {
		        // AudioPlayerの音量を AudioSystem の音量で上書きしていたため、最終音量が正常に計算できていなかった。
		        // 暫定対応として、 changeVolume() に AudioPlayer 自身の音量を渡す事により最終音量の計算を実行させる。
		        this.changeVolume(this.volume);
		    };
		    return AudioPlayer;
		}());
		AudioPlayer$1.AudioPlayer = AudioPlayer;
		return AudioPlayer$1;
	}

	var BinaryAsset = {};

	var hasRequiredBinaryAsset;

	function requireBinaryAsset () {
		if (hasRequiredBinaryAsset) return BinaryAsset;
		hasRequiredBinaryAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(BinaryAsset, "__esModule", { value: true });
		BinaryAsset.BinaryAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * バイナリ形式のリソースを表すインターフェース。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 *
		 * BinaryAsset#dataによって、本リソースのバイト配列を取得することが出来る。
		 */
		var BinaryAsset$1 = /** @class */ (function (_super) {
		    __extends(BinaryAsset, _super);
		    function BinaryAsset(id, assetPath) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "binary";
		        _this.data = undefined;
		        return _this;
		    }
		    BinaryAsset.prototype.destroy = function () {
		        this.data = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return BinaryAsset;
		}(Asset_1.Asset));
		BinaryAsset.BinaryAsset = BinaryAsset$1;
		return BinaryAsset;
	}

	var ExceptionFactory = {};

	var hasRequiredExceptionFactory;

	function requireExceptionFactory () {
		if (hasRequiredExceptionFactory) return ExceptionFactory;
		hasRequiredExceptionFactory = 1;
		(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.ExceptionFactory = void 0;
			(function (ExceptionFactory) {
			    function createAssertionError(message, cause) {
			        var e = new Error(message);
			        e.name = "AssertionError";
			        e.cause = cause;
			        return e;
			    }
			    ExceptionFactory.createAssertionError = createAssertionError;
			    function createTypeMismatchError(methodName, expected, actual, cause) {
			        var message = "Type mismatch on " + methodName + "," + " expected type is " + expected;
			        if (arguments.length > 2) {
			            // actual 指定時
			            try {
			                var actualString = void 0;
			                if (actual && actual.constructor && actual.constructor.name) {
			                    actualString = actual.constructor.name;
			                }
			                else {
			                    actualString = typeof actual;
			                }
			                message += ", actual type is " + (actualString.length > 40 ? actualString.substr(0, 40) : actualString);
			            }
			            catch (ex) {
			                // メッセージ取得時に例外が発生したらactualの型情報出力はあきらめる
			            }
			        }
			        message += ".";
			        var e = new Error(message);
			        e.name = "TypeMismatchError";
			        e.cause = cause;
			        e.expected = expected;
			        e.actual = actual;
			        return e;
			    }
			    ExceptionFactory.createTypeMismatchError = createTypeMismatchError;
			    function createAssetLoadError(message, retriable, _type, // 歴史的経緯により残っている値。利用していない。
			    cause) {
			        if (retriable === void 0) { retriable = true; }
			        var e = new Error(message);
			        e.name = "AssetLoadError";
			        e.cause = cause;
			        e.retriable = retriable;
			        return e;
			    }
			    ExceptionFactory.createAssetLoadError = createAssetLoadError;
			})(exports.ExceptionFactory || (exports.ExceptionFactory = {})); 
		} (ExceptionFactory));
		return ExceptionFactory;
	}

	var Glyph = {};

	var hasRequiredGlyph;

	function requireGlyph () {
		if (hasRequiredGlyph) return Glyph;
		hasRequiredGlyph = 1;
		Object.defineProperty(Glyph, "__esModule", { value: true });
		Glyph.Glyph = void 0;
		/**
		 * グリフ。
		 *
		 * @deprecated 非推奨である。将来的に削除される予定である。
		 */
		var Glyph$1 = /** @class */ (function () {
		    /**
		     * `Glyph` のインスタンスを生成する。
		     * @deprecated 非推奨である。将来的に削除される予定である。
		     */
		    function Glyph(code, x, y, width, height, offsetX, offsetY, advanceWidth, surface, isSurfaceValid) {
		        if (offsetX === void 0) { offsetX = 0; }
		        if (offsetY === void 0) { offsetY = 0; }
		        if (advanceWidth === void 0) { advanceWidth = width; }
		        if (isSurfaceValid === void 0) { isSurfaceValid = !!surface; }
		        this.code = code;
		        this.x = x;
		        this.y = y;
		        this.width = width;
		        this.height = height;
		        this.offsetX = offsetX;
		        this.offsetY = offsetY;
		        this.advanceWidth = advanceWidth;
		        this.surface = surface;
		        this.isSurfaceValid = isSurfaceValid;
		        this._atlas = null;
		    }
		    /**
		     * グリフの描画上の幅を求める。
		     * 通常、ゲーム開発者がこのメソッドを呼び出す必要はない。
		     * @param fontSize フォントサイズ
		     */
		    Glyph.prototype.renderingWidth = function (fontSize) {
		        if (!this.width || !this.height) {
		            return 0;
		        }
		        return (fontSize / this.height) * this.width;
		    };
		    return Glyph;
		}());
		Glyph.Glyph = Glyph$1;
		return Glyph;
	}

	var GlyphFactory$2 = {};

	var hasRequiredGlyphFactory$2;

	function requireGlyphFactory$2 () {
		if (hasRequiredGlyphFactory$2) return GlyphFactory$2;
		hasRequiredGlyphFactory$2 = 1;
		Object.defineProperty(GlyphFactory$2, "__esModule", { value: true });
		GlyphFactory$2.GlyphFactory = void 0;
		/**
		 * グリフファクトリ。
		 *
		 * `DynamicFont` はこれを利用してグリフを生成する。
		 *
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはなく、ゲーム開発者が利用する必要もない。
		 */
		var GlyphFactory = /** @class */ (function () {
		    /**
		     * `GlyphFactory` を生成する。
		     *
		     * @param fontFamily フォントファミリ。フォント名、またはそれらの配列
		     * @param fontSize フォントサイズ
		     * @param baselineHeight ベースラインの高さ
		     * @param strokeWidth 輪郭幅
		     * @param strokeColor 輪郭色
		     * @param strokeOnly 輪郭を描画するか否か
		     * @param fontWeight フォントウェイト
		     */
		    function GlyphFactory(fontFamily, fontSize, baselineHeight, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight) {
		        if (baselineHeight === void 0) { baselineHeight = fontSize; }
		        if (fontColor === void 0) { fontColor = "black"; }
		        if (strokeWidth === void 0) { strokeWidth = 0; }
		        if (strokeColor === void 0) { strokeColor = "black"; }
		        if (strokeOnly === void 0) { strokeOnly = false; }
		        if (fontWeight === void 0) { fontWeight = "normal"; }
		        this.fontFamily = fontFamily;
		        this.fontSize = fontSize;
		        this.fontWeight = fontWeight;
		        this.baselineHeight = baselineHeight;
		        this.fontColor = fontColor;
		        this.strokeWidth = strokeWidth;
		        this.strokeColor = strokeColor;
		        this.strokeOnly = strokeOnly;
		    }
		    return GlyphFactory;
		}());
		GlyphFactory$2.GlyphFactory = GlyphFactory;
		return GlyphFactory$2;
	}

	var ImageAsset = {};

	var hasRequiredImageAsset;

	function requireImageAsset () {
		if (hasRequiredImageAsset) return ImageAsset;
		hasRequiredImageAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(ImageAsset, "__esModule", { value: true });
		ImageAsset.ImageAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * 画像リソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 *
		 * width, heightでメタデータとして画像の大きさをとることは出来るが、
		 * ゲーム開発者はそれ以外の情報を本クラスから直接は取得せず、Sprite等に本リソースを指定して利用する。
		 */
		var ImageAsset$1 = /** @class */ (function (_super) {
		    __extends(ImageAsset, _super);
		    function ImageAsset(id, assetPath, width, height) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "image";
		        _this.width = width;
		        _this.height = height;
		        return _this;
		    }
		    ImageAsset.prototype.initialize = function (hint) {
		        this.hint = hint;
		    };
		    return ImageAsset;
		}(Asset_1.Asset));
		ImageAsset.ImageAsset = ImageAsset$1;
		return ImageAsset;
	}

	var PdiCommonUtil = {};

	var hasRequiredPdiCommonUtil;

	function requirePdiCommonUtil () {
		if (hasRequiredPdiCommonUtil) return PdiCommonUtil;
		hasRequiredPdiCommonUtil = 1;
		(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.PdiCommonUtil = void 0;
			(function (PdiCommonUtil) {
			    /**
			     * 与えられたパス文字列に与えられた拡張子を追加する。
			     * @param path パス文字列
			     * @param ext 追加する拡張子
			     */
			    function addExtname(path, ext) {
			        var index = path.indexOf("?");
			        if (index === -1) {
			            return path + "." + ext;
			        }
			        // hoge?query => hoge.ext?query
			        return path.substring(0, index) + "." + ext + path.substring(index, path.length);
			    }
			    PdiCommonUtil.addExtname = addExtname;
			})(exports.PdiCommonUtil || (exports.PdiCommonUtil = {})); 
		} (PdiCommonUtil));
		return PdiCommonUtil;
	}

	var Renderer = {};

	var hasRequiredRenderer;

	function requireRenderer () {
		if (hasRequiredRenderer) return Renderer;
		hasRequiredRenderer = 1;
		Object.defineProperty(Renderer, "__esModule", { value: true });
		Renderer.Renderer = void 0;
		/**
		 * ゲームの描画を行うクラス。
		 *
		 * 描画は各エンティティによって行われる。通常、ゲーム開発者が本クラスを利用する必要はない。
		 */
		var Renderer$1 = /** @class */ (function () {
		    function Renderer() {
		    }
		    Renderer.prototype.begin = function () {
		        // nothing to do
		    };
		    Renderer.prototype.end = function () {
		        // nothing to do
		    };
		    return Renderer;
		}());
		Renderer.Renderer = Renderer$1;
		return Renderer;
	}

	var ResourceFactory$1 = {};

	var hasRequiredResourceFactory$2;

	function requireResourceFactory$2 () {
		if (hasRequiredResourceFactory$2) return ResourceFactory$1;
		hasRequiredResourceFactory$2 = 1;
		Object.defineProperty(ResourceFactory$1, "__esModule", { value: true });
		ResourceFactory$1.ResourceFactory = void 0;
		/**
		 * リソースの生成を行うクラス。
		 *
		 * このクラス (の実装クラス) のインスタンスはエンジンによって生成される。ゲーム開発者が生成する必要はない。
		 * またこのクラスの各種アセット生成メソッドは、エンジンによって暗黙に呼び出されるものである。
		 * 通常ゲーム開発者が呼び出す必要はない。
		 */
		var ResourceFactory = /** @class */ (function () {
		    function ResourceFactory() {
		    }
		    return ResourceFactory;
		}());
		ResourceFactory$1.ResourceFactory = ResourceFactory;
		return ResourceFactory$1;
	}

	var ScriptAsset = {};

	var hasRequiredScriptAsset$1;

	function requireScriptAsset$1 () {
		if (hasRequiredScriptAsset$1) return ScriptAsset;
		hasRequiredScriptAsset$1 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(ScriptAsset, "__esModule", { value: true });
		ScriptAsset.ScriptAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * スクリプトリソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 *
		 * ScriptAsset#executeによって、本リソースが表すスクリプトを実行し、その結果を受け取る事が出来る。
		 * requireによる参照とは異なり、executeはキャッシュされないため、何度でも呼び出し違う結果を受け取ることが出来る。
		 */
		var ScriptAsset$1 = /** @class */ (function (_super) {
		    __extends(ScriptAsset, _super);
		    function ScriptAsset(id, path, exports) {
		        if (exports === void 0) { exports = []; }
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "script";
		        _this.exports = exports;
		        _this.script = undefined;
		        return _this;
		    }
		    ScriptAsset.prototype.destroy = function () {
		        this.script = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return ScriptAsset;
		}(Asset_1.Asset));
		ScriptAsset.ScriptAsset = ScriptAsset$1;
		return ScriptAsset;
	}

	var Surface = {};

	var hasRequiredSurface;

	function requireSurface () {
		if (hasRequiredSurface) return Surface;
		hasRequiredSurface = 1;
		Object.defineProperty(Surface, "__esModule", { value: true });
		Surface.Surface = void 0;
		var ExceptionFactory_1 = requireExceptionFactory();
		/**
		 * 描画領域を表すクラス。
		 *
		 * このクラスのインスタンスは、エンジンによって暗黙に生成される。
		 * ゲーム開発者はこのクラスのインスタンスを明示的に生成する必要はなく、またできない。
		 */
		var Surface$1 = /** @class */ (function () {
		    /**
		     * `Surface` のインスタンスを生成する。
		     * @param width 描画領域の幅（整数値でなければならない）
		     * @param height 描画領域の高さ（整数値でなければならない）
		     * @param drawable 描画可能な実体。省略された場合、 `undefined`
		     */
		    function Surface(width, height, drawable) {
		        if (width % 1 !== 0 || height % 1 !== 0) {
		            throw ExceptionFactory_1.ExceptionFactory.createAssertionError("Surface#constructor: width and height must be integers");
		        }
		        this.width = width;
		        this.height = height;
		        this._drawable = drawable;
		        // this._destroyedは破棄時に一度だけ代入する特殊なフィールドなため、コンストラクタで初期値を代入しない
		    }
		    /**
		     * このSurfaceの破棄を行う。
		     * 以後、このSurfaceを利用することは出来なくなる。
		     */
		    Surface.prototype.destroy = function () {
		        this._destroyed = true;
		    };
		    /**
		     * このSurfaceが破棄済であるかどうかを判定する。
		     */
		    Surface.prototype.destroyed = function () {
		        // _destroyedはundefinedかtrueなため、常にbooleanが返すように!!演算子を用いる
		        return !!this._destroyed;
		    };
		    return Surface;
		}());
		Surface.Surface = Surface$1;
		return Surface;
	}

	var TextAsset$1 = {};

	var hasRequiredTextAsset$1;

	function requireTextAsset$1 () {
		if (hasRequiredTextAsset$1) return TextAsset$1;
		hasRequiredTextAsset$1 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(TextAsset$1, "__esModule", { value: true });
		TextAsset$1.TextAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * 文字列リソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 *
		 * TextAsset#dataによって、本リソースが保持する文字列を取得することが出来る。
		 */
		var TextAsset = /** @class */ (function (_super) {
		    __extends(TextAsset, _super);
		    function TextAsset(id, assetPath) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "text";
		        _this.data = undefined;
		        return _this;
		    }
		    TextAsset.prototype.destroy = function () {
		        this.data = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return TextAsset;
		}(Asset_1.Asset));
		TextAsset$1.TextAsset = TextAsset;
		return TextAsset$1;
	}

	var VectorImageAsset = {};

	var hasRequiredVectorImageAsset;

	function requireVectorImageAsset () {
		if (hasRequiredVectorImageAsset) return VectorImageAsset;
		hasRequiredVectorImageAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(VectorImageAsset, "__esModule", { value: true });
		VectorImageAsset.VectorImageAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * ベクタ画像リソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 */
		var VectorImageAsset$1 = /** @class */ (function (_super) {
		    __extends(VectorImageAsset, _super);
		    function VectorImageAsset(id, assetPath, width, height, hint) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "vector-image";
		        _this.width = width;
		        _this.height = height;
		        _this.hint = hint;
		        return _this;
		    }
		    return VectorImageAsset;
		}(Asset_1.Asset));
		VectorImageAsset.VectorImageAsset = VectorImageAsset$1;
		return VectorImageAsset;
	}

	var VideoAsset$1 = {};

	var hasRequiredVideoAsset$1;

	function requireVideoAsset$1 () {
		if (hasRequiredVideoAsset$1) return VideoAsset$1;
		hasRequiredVideoAsset$1 = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(VideoAsset$1, "__esModule", { value: true });
		VideoAsset$1.VideoAsset = void 0;
		var Asset_1 = requireAsset$1();
		/**
		 * 動画リソースを表すクラス。
		 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
		 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
		 * Scene#assets、またはGame#assetsによって取得して利用する。
		 */
		var VideoAsset = /** @class */ (function (_super) {
		    __extends(VideoAsset, _super);
		    function VideoAsset(id, assetPath, width, height, system, loop, useRealSize) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "video";
		        _this.width = width;
		        _this.height = height;
		        _this.realWidth = 0;
		        _this.realHeight = 0;
		        _this._system = system;
		        _this._loop = loop;
		        _this._useRealSize = useRealSize;
		        return _this;
		    }
		    VideoAsset.prototype.play = function (_loop) {
		        this.getPlayer().play(this);
		        return this.getPlayer();
		    };
		    VideoAsset.prototype.stop = function () {
		        this.getPlayer().stop();
		    };
		    VideoAsset.prototype.destroy = function () {
		        this._system = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return VideoAsset;
		}(Asset_1.Asset));
		VideoAsset$1.VideoAsset = VideoAsset;
		return VideoAsset$1;
	}

	var VideoPlayer = {};

	var hasRequiredVideoPlayer;

	function requireVideoPlayer () {
		if (hasRequiredVideoPlayer) return VideoPlayer;
		hasRequiredVideoPlayer = 1;
		Object.defineProperty(VideoPlayer, "__esModule", { value: true });
		VideoPlayer.VideoPlayer = void 0;
		var trigger_1 = requireCjs();
		/**
		 * ビデオ再生を行うクラス。
		 *
		 * ゲーム開発者は本クラスのインスタンスを直接生成すべきではない。
		 */
		var VideoPlayer$1 = /** @class */ (function () {
		    /**
		     * `VideoPlayer` のインスタンスを生成する。
		     */
		    function VideoPlayer(loop) {
		        this._loop = !!loop;
		        this.onPlay = new trigger_1.Trigger();
		        this.onStop = new trigger_1.Trigger();
		        this.played = this.onPlay;
		        this.stopped = this.onStop;
		        this.currentVideo = undefined;
		        this.volume = 1.0;
		    }
		    /**
		     * `VideoAsset` を再生する。
		     *
		     * 再生後、 `this.onPlay` がfireされる。
		     * @param Video 再生するビデオアセット
		     */
		    VideoPlayer.prototype.play = function (videoAsset) {
		        this.currentVideo = videoAsset;
		        this.onPlay.fire({
		            player: this,
		            video: videoAsset
		        });
		    };
		    /**
		     * 再生を停止する。
		     *
		     * 再生中でない場合、何もしない。
		     * 停止後、 `this.onStop` がfireされる。
		     */
		    VideoPlayer.prototype.stop = function () {
		        var videoAsset = this.currentVideo;
		        this.onStop.fire({
		            player: this,
		            video: videoAsset
		        });
		    };
		    /**
		     * 音量を変更する。
		     *
		     * エンジンユーザが `VideoPlayer` の派生クラスを実装する場合は、
		     *  このメソッドをオーバーライドして実際に音量を変更する処理を行うこと。
		     *  オーバーライド先のメソッドはこのメソッドを呼びださなければならない。
		     * @param volume 音量。0以上1.0以下でなければならない
		     */
		    VideoPlayer.prototype.changeVolume = function (volume) {
		        this.volume = volume;
		    };
		    return VideoPlayer;
		}());
		VideoPlayer.VideoPlayer = VideoPlayer$1;
		return VideoPlayer;
	}

	var hasRequiredLib;

	function requireLib () {
		if (hasRequiredLib) return lib;
		hasRequiredLib = 1;
		(function (exports) {
			var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    var desc = Object.getOwnPropertyDescriptor(m, k);
			    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
			      desc = { enumerable: true, get: function() { return m[k]; } };
			    }
			    Object.defineProperty(o, k2, desc);
			}) : (function(o, m, k, k2) {
			    if (k2 === undefined) k2 = k;
			    o[k2] = m[k];
			}));
			var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
			    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			__exportStar(requireAsset$1(), exports);
			__exportStar(requireAudioAsset$1(), exports);
			__exportStar(requireAudioPlayer$1(), exports);
			__exportStar(requireBinaryAsset(), exports);
			__exportStar(requireExceptionFactory(), exports);
			__exportStar(requireGlyph(), exports);
			__exportStar(requireGlyphFactory$2(), exports);
			__exportStar(requireImageAsset(), exports);
			__exportStar(requirePdiCommonUtil(), exports);
			__exportStar(requireRenderer(), exports);
			__exportStar(requireResourceFactory$2(), exports);
			__exportStar(requireScriptAsset$1(), exports);
			__exportStar(requireSurface(), exports);
			__exportStar(requireTextAsset$1(), exports);
			__exportStar(requireVectorImageAsset(), exports);
			__exportStar(requireVideoAsset$1(), exports);
			__exportStar(requireVideoPlayer(), exports); 
		} (lib));
		return lib;
	}

	var hasRequiredScriptAsset;

	function requireScriptAsset () {
		if (hasRequiredScriptAsset) return ScriptAsset$1;
		hasRequiredScriptAsset = 1;
		Object.defineProperty(ScriptAsset$1, "__esModule", { value: true });
		ScriptAsset$1.ScriptAsset = void 0;
		var tslib_1 = require$$0;
		var XHRScriptAsset_1 = requireXHRScriptAsset();
		var pdi_common_impl_1 = requireLib();
		/**
		 * g.ScriptAsset#script の型が akashic-engine (string) と pdi-browser (string | undefined) で不一致のため独自に実装。
		 * TODO: pdi-browser 側の修正
		 */
		var ScriptAsset = /** @class */ (function (_super) {
		    tslib_1.__extends(ScriptAsset, _super);
		    function ScriptAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    // NOTE: 独自実装
		    ScriptAsset.prototype._overrideLoadFunc = function (callback) {
		        var _this = this;
		        this._load = function (handler) {
		            callback(_this.id, _this.path, function (error, data) {
		                if (error) {
		                    handler._onAssetError(_this, pdi_common_impl_1.ExceptionFactory.createAssetLoadError(error.message, false));
		                    return;
		                }
		                if (!data) {
		                    handler._onAssetError(_this, pdi_common_impl_1.ExceptionFactory.createAssetLoadError("no data received", false));
		                    return;
		                }
		                _this.script = data + "\n";
		                handler._onAssetLoad(_this);
		            });
		        };
		    };
		    return ScriptAsset;
		}(XHRScriptAsset_1.XHRScriptAsset));
		ScriptAsset$1.ScriptAsset = ScriptAsset;
		
		return ScriptAsset$1;
	}

	var SVGImageAsset = {};

	var hasRequiredSVGImageAsset;

	function requireSVGImageAsset () {
		if (hasRequiredSVGImageAsset) return SVGImageAsset;
		hasRequiredSVGImageAsset = 1;
		Object.defineProperty(SVGImageAsset, "__esModule", { value: true });
		SVGImageAsset.VectorImageAsset = void 0;
		var tslib_1 = require$$0;
		var SVGImageAsset_1 = requireSVGImageAsset$1();
		var VectorImageAsset = /** @class */ (function (_super) {
		    tslib_1.__extends(VectorImageAsset, _super);
		    function VectorImageAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return VectorImageAsset;
		}(SVGImageAsset_1.SVGImageAsset));
		SVGImageAsset.VectorImageAsset = VectorImageAsset;
		
		return SVGImageAsset;
	}

	var TextAsset = {};

	var Asset = {};

	var hasRequiredAsset;

	function requireAsset () {
		if (hasRequiredAsset) return Asset;
		hasRequiredAsset = 1;
		Object.defineProperty(Asset, "__esModule", { value: true });
		Asset.Asset = void 0;
		var tslib_1 = require$$0;
		var g = tslib_1.__importStar(requireAkashicEngine());
		/**
		 * ScriptAsset および TextAsset の基底クラス。
		 */
		var Asset$1 = /** @class */ (function () {
		    function Asset(id, path) {
		        this.type = "";
		        this.onDestroyed = new g.Trigger();
		        this.id = id;
		        this.path = path;
		        this.originalPath = path;
		    }
		    Asset.prototype.inUse = function () {
		        return false;
		    };
		    Asset.prototype.destroy = function () {
		        this.onDestroyed.destroy();
		        this.onDestroyed = undefined;
		    };
		    Asset.prototype.destroyed = function () {
		        return this.onDestroyed === undefined;
		    };
		    Asset.prototype._assetPathFilter = function (path) {
		        return path;
		    };
		    return Asset;
		}());
		Asset.Asset = Asset$1;
		
		return Asset;
	}

	var hasRequiredTextAsset;

	function requireTextAsset () {
		if (hasRequiredTextAsset) return TextAsset;
		hasRequiredTextAsset = 1;
		Object.defineProperty(TextAsset, "__esModule", { value: true });
		TextAsset.TextAsset = void 0;
		var tslib_1 = require$$0;
		var g = tslib_1.__importStar(requireAkashicEngine());
		var XHRLoader_1 = requireXHRLoader();
		var pdi_common_impl_1 = requireLib();
		var Asset_1 = requireAsset();
		/**
		 * g.TextAsset#data の型が akashic-engine (string) と pdi-browser (string | undefined) で不一致のため独自に実装。
		 * TODO: pdi-browser 側の修正
		 */
		var TextAsset$1 = /** @class */ (function (_super) {
		    tslib_1.__extends(TextAsset, _super);
		    function TextAsset(id, path) {
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "text";
		        _this.data = "";
		        _this.onDestroyed = new g.Trigger();
		        return _this;
		    }
		    TextAsset.prototype._load = function (handler) {
		        var _this = this;
		        var loader = new XHRLoader_1.XHRLoader();
		        loader.get(this.path, function (error, responseText) {
		            if (error) {
		                handler._onAssetError(_this, error);
		                return;
		            }
		            _this.data = responseText + "\n";
		            handler._onAssetLoad(_this);
		        });
		    };
		    // NOTE: 独自実装
		    TextAsset.prototype._overrideLoadFunc = function (callback) {
		        var _this = this;
		        this._load = function (handler) {
		            callback(_this.id, _this.path, function (error, data) {
		                if (error) {
		                    handler._onAssetError(_this, pdi_common_impl_1.ExceptionFactory.createAssetLoadError(error.message, false));
		                    return;
		                }
		                if (!data) {
		                    handler._onAssetError(_this, pdi_common_impl_1.ExceptionFactory.createAssetLoadError("no data received", false));
		                    return;
		                }
		                _this.data = data;
		                handler._onAssetLoad(_this);
		            });
		        };
		    };
		    return TextAsset;
		}(Asset_1.Asset));
		TextAsset.TextAsset = TextAsset$1;
		
		return TextAsset;
	}

	var VideoAsset = {};

	var HTMLVideoAsset = {};

	var HTMLVideoPlayer = {};

	var hasRequiredHTMLVideoPlayer;

	function requireHTMLVideoPlayer () {
		if (hasRequiredHTMLVideoPlayer) return HTMLVideoPlayer;
		hasRequiredHTMLVideoPlayer = 1;
		Object.defineProperty(HTMLVideoPlayer, "__esModule", { value: true });
		HTMLVideoPlayer.HTMLVideoPlayer = void 0;
		var trigger_1 = requireCjs();
		var HTMLVideoPlayer$1 = /** @class */ (function () {
		    function HTMLVideoPlayer(loop) {
		        this._loop = !!loop;
		        this.onPlay = new trigger_1.Trigger();
		        this.onStop = new trigger_1.Trigger();
		        this.played = this.onPlay;
		        this.stopped = this.onStop;
		        this.currentVideo = undefined;
		        this.volume = 1.0;
		        this.isDummy = true;
		    }
		    HTMLVideoPlayer.prototype.play = function (_videoAsset) {
		        // not yet supported
		    };
		    HTMLVideoPlayer.prototype.stop = function () {
		        // not yet supported
		    };
		    HTMLVideoPlayer.prototype.changeVolume = function (_volume) {
		        // not yet supported
		    };
		    return HTMLVideoPlayer;
		}());
		HTMLVideoPlayer.HTMLVideoPlayer = HTMLVideoPlayer$1;
		return HTMLVideoPlayer;
	}

	var hasRequiredHTMLVideoAsset;

	function requireHTMLVideoAsset () {
		if (hasRequiredHTMLVideoAsset) return HTMLVideoAsset;
		hasRequiredHTMLVideoAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(HTMLVideoAsset, "__esModule", { value: true });
		HTMLVideoAsset.HTMLVideoAsset = void 0;
		var Surface_1 = requireSurface$1();
		var Asset_1 = requireAsset$2();
		var HTMLVideoPlayer_1 = requireHTMLVideoPlayer();
		var VideoAssetSurface = /** @class */ (function (_super) {
		    __extends(VideoAssetSurface, _super);
		    function VideoAssetSurface(width, height, drawable) {
		        return _super.call(this, width, height, drawable) || this;
		    }
		    VideoAssetSurface.prototype.renderer = function () {
		        throw new Error("VideoAssetSurface cannot be rendered.");
		    };
		    VideoAssetSurface.prototype.isPlaying = function () {
		        return false;
		    };
		    return VideoAssetSurface;
		}(Surface_1.Surface));
		var HTMLVideoAsset$1 = /** @class */ (function (_super) {
		    __extends(HTMLVideoAsset, _super);
		    function HTMLVideoAsset(id, assetPath, width, height, system, loop, useRealSize) {
		        var _this = _super.call(this, id, assetPath) || this;
		        _this.type = "video";
		        _this.width = width;
		        _this.height = height;
		        _this.realWidth = 0;
		        _this.realHeight = 0;
		        _this._system = system;
		        _this._loop = loop;
		        _this._useRealSize = useRealSize;
		        _this._player = new HTMLVideoPlayer_1.HTMLVideoPlayer();
		        _this._surface = new VideoAssetSurface(width, height);
		        return _this;
		    }
		    HTMLVideoAsset.prototype.play = function (_loop) {
		        this.getPlayer().play(this);
		        return this.getPlayer();
		    };
		    HTMLVideoAsset.prototype.stop = function () {
		        this.getPlayer().stop();
		    };
		    HTMLVideoAsset.prototype.inUse = function () {
		        return false;
		    };
		    HTMLVideoAsset.prototype._load = function (loader) {
		        var _this = this;
		        setTimeout(function () {
		            loader._onAssetLoad(_this);
		        }, 0);
		    };
		    HTMLVideoAsset.prototype.getPlayer = function () {
		        return this._player;
		    };
		    HTMLVideoAsset.prototype.asSurface = function () {
		        return this._surface;
		    };
		    return HTMLVideoAsset;
		}(Asset_1.Asset));
		HTMLVideoAsset.HTMLVideoAsset = HTMLVideoAsset$1;
		return HTMLVideoAsset;
	}

	var hasRequiredVideoAsset;

	function requireVideoAsset () {
		if (hasRequiredVideoAsset) return VideoAsset;
		hasRequiredVideoAsset = 1;
		Object.defineProperty(VideoAsset, "__esModule", { value: true });
		VideoAsset.VideoAsset = void 0;
		var tslib_1 = require$$0;
		var HTMLVideoAsset_1 = requireHTMLVideoAsset();
		var VideoAsset$1 = /** @class */ (function (_super) {
		    tslib_1.__extends(VideoAsset, _super);
		    function VideoAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return VideoAsset;
		}(HTMLVideoAsset_1.HTMLVideoAsset));
		VideoAsset.VideoAsset = VideoAsset$1;
		
		return VideoAsset;
	}

	var AudioFactory = {};

	var full = {};

	var Platform = {};

	var XHRTextAsset = {};

	var hasRequiredXHRTextAsset;

	function requireXHRTextAsset () {
		if (hasRequiredXHRTextAsset) return XHRTextAsset;
		hasRequiredXHRTextAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(XHRTextAsset, "__esModule", { value: true });
		XHRTextAsset.XHRTextAsset = void 0;
		var XHRLoader_1 = requireXHRLoader();
		var Asset_1 = requireAsset$2();
		var XHRTextAsset$1 = /** @class */ (function (_super) {
		    __extends(XHRTextAsset, _super);
		    function XHRTextAsset(id, path) {
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "text";
		        _this.data = ""; // _load() までは空文字が代入されている点に注意
		        return _this;
		    }
		    XHRTextAsset.prototype._load = function (handler) {
		        var _this = this;
		        var loader = new XHRLoader_1.XHRLoader();
		        loader.get(this.path, function (error, responseText) {
		            if (error) {
		                handler._onAssetError(_this, error);
		                return;
		            }
		            if (!responseText) {
		                handler._onAssetError(_this, {
		                    name: "AssetLoadError",
		                    message: "XHRTextAsset#_load(): no data received",
		                    retriable: false
		                });
		                return;
		            }
		            _this.data = responseText;
		            handler._onAssetLoad(_this);
		        });
		    };
		    XHRTextAsset.prototype.destroy = function () {
		        this.data = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return XHRTextAsset;
		}(Asset_1.Asset));
		XHRTextAsset.XHRTextAsset = XHRTextAsset$1;
		return XHRTextAsset;
	}

	var AudioManager = {};

	var hasRequiredAudioManager;

	function requireAudioManager () {
		if (hasRequiredAudioManager) return AudioManager;
		hasRequiredAudioManager = 1;
		Object.defineProperty(AudioManager, "__esModule", { value: true });
		AudioManager.AudioManager = void 0;
		var AudioManager$1 = /** @class */ (function () {
		    function AudioManager() {
		        this.audioAssets = [];
		        this._masterVolume = 1.0;
		    }
		    AudioManager.prototype.registerAudioAsset = function (asset) {
		        if (this.audioAssets.indexOf(asset) === -1)
		            this.audioAssets.push(asset);
		    };
		    AudioManager.prototype.removeAudioAsset = function (asset) {
		        var index = this.audioAssets.indexOf(asset);
		        if (index === -1)
		            this.audioAssets.splice(index, 1);
		    };
		    AudioManager.prototype.setMasterVolume = function (volume) {
		        this._masterVolume = volume;
		        for (var i = 0; i < this.audioAssets.length; i++) {
		            if (this.audioAssets[i]._lastPlayedPlayer) {
		                this.audioAssets[i]._lastPlayedPlayer.notifyMasterVolumeChanged();
		            }
		        }
		    };
		    AudioManager.prototype.getMasterVolume = function () {
		        return this._masterVolume;
		    };
		    return AudioManager;
		}());
		AudioManager.AudioManager = AudioManager$1;
		return AudioManager;
	}

	var ContainerController = {};

	var InputHandlerLayer = {};

	var MouseTouchEventHandler = {};

	var InputEventHandler = {};

	var hasRequiredInputEventHandler;

	function requireInputEventHandler () {
		if (hasRequiredInputEventHandler) return InputEventHandler;
		hasRequiredInputEventHandler = 1;
		Object.defineProperty(InputEventHandler, "__esModule", { value: true });
		InputEventHandler.preventEventDefault = InputEventHandler.InputEventHandler = void 0;
		var trigger_1 = requireCjs();
		/**
		 * 入力ハンドラ。
		 *
		 * コンストラクタで受け取ったViewに対してのハンドラを設定する。
		 * DOMイベント情報から `PlatformPointEvent` へ変換したデータを `pointTrigger` を通して通知する。
		 * Down -> Move -> Up のフローにおける、Moveイベントのロックを管理する。
		 */
		var InputEventHandler$1 = /** @class */ (function () {
		    function InputEventHandler(inputView) {
		        this.inputView = inputView;
		        this.pointerEventLock = {};
		        this._xScale = 1;
		        this._yScale = 1;
		        this.pointTrigger = new trigger_1.Trigger();
		        inputView.style.touchAction = "none";
		        inputView.style.userSelect = "none";
		    }
		    // `start()` で設定するDOMイベントをサポートしているかを返す
		    InputEventHandler.isSupported = function () {
		        return false;
		    };
		    InputEventHandler.prototype.setScale = function (xScale, yScale) {
		        if (yScale === void 0) { yScale = xScale; }
		        this._xScale = xScale;
		        this._yScale = yScale;
		    };
		    InputEventHandler.prototype.pointDown = function (identifier, pagePosition, button) {
		        this.pointTrigger.fire({
		            type: 0 /* PlatformPointType.Down */,
		            identifier: identifier,
		            offset: this.getOffsetFromEvent(pagePosition),
		            button: button
		        });
		        // downのイベントIDを保存して、moveとupのイベントの抑制をする(ロックする)
		        this.pointerEventLock[identifier] = true;
		    };
		    InputEventHandler.prototype.pointMove = function (identifier, pagePosition, button) {
		        if (!this.pointerEventLock.hasOwnProperty(identifier + "")) {
		            return;
		        }
		        this.pointTrigger.fire({
		            type: 1 /* PlatformPointType.Move */,
		            identifier: identifier,
		            offset: this.getOffsetFromEvent(pagePosition),
		            button: button
		        });
		    };
		    InputEventHandler.prototype.pointUp = function (identifier, pagePosition, button) {
		        if (!this.pointerEventLock.hasOwnProperty(identifier + "")) {
		            return;
		        }
		        this.pointTrigger.fire({
		            type: 2 /* PlatformPointType.Up */,
		            identifier: identifier,
		            offset: this.getOffsetFromEvent(pagePosition),
		            button: button
		        });
		        // Upが完了したら、Down->Upが完了したとしてロックを外す
		        delete this.pointerEventLock[identifier];
		    };
		    InputEventHandler.prototype.getOffsetFromEvent = function (e) {
		        return { x: e.offsetX, y: e.offsetY };
		    };
		    InputEventHandler.prototype.getScale = function () {
		        return { x: this._xScale, y: this._yScale };
		    };
		    InputEventHandler.prototype.getOffsetPositionFromInputView = function (position) {
		        // windowの左上を0,0とした時のinputViewのoffsetを取得する
		        var bounding = this.inputView.getBoundingClientRect();
		        var scale = this.getScale();
		        return {
		            offsetX: (position.pageX - Math.round(window.pageXOffset + bounding.left)) / scale.x,
		            offsetY: (position.pageY - Math.round(window.pageYOffset + bounding.top)) / scale.y
		        };
		    };
		    return InputEventHandler;
		}());
		InputEventHandler.InputEventHandler = InputEventHandler$1;
		function preventEventDefault(ev) {
		    ev.preventDefault();
		}
		InputEventHandler.preventEventDefault = preventEventDefault;
		return InputEventHandler;
	}

	var hasRequiredMouseTouchEventHandler;

	function requireMouseTouchEventHandler () {
		if (hasRequiredMouseTouchEventHandler) return MouseTouchEventHandler;
		hasRequiredMouseTouchEventHandler = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(MouseTouchEventHandler, "__esModule", { value: true });
		MouseTouchEventHandler.MouseTouchEventHandler = void 0;
		var InputEventHandler_1 = requireInputEventHandler();
		/**
		 * Mouse/Touch Events を利用した入力ハンドラ。
		 *
		 * Pointer Event が利用できない環境を想定するフォールバック実装。
		 * preventDefault() による副作用があるので、可能な環境では PointerEventHandler を利用すること。
		 */
		var MouseTouchEventHandler$1 = /** @class */ (function (_super) {
		    __extends(MouseTouchEventHandler, _super);
		    function MouseTouchEventHandler() {
		        var _this = _super !== null && _super.apply(this, arguments) || this;
		        _this.pressingMouseButton = null;
		        _this.onMouseDown = function (e) {
		            // TODO ボタンが複数押される状態をサポートする
		            if (_this.pressingMouseButton != null)
		                return;
		            _this.pressingMouseButton = e.button;
		            _this.pointDown(MouseTouchEventHandler.MOUSE_IDENTIFIER, _this.getOffsetPositionFromInputView(e), _this.getPlatformButtonType(e, 0 /* PlatformButtonType.Primary */));
		            window.addEventListener("mousemove", _this.onWindowMouseMove, false);
		            window.addEventListener("mouseup", _this.onWindowMouseUp, false);
		            // NOTE ここで e.preventDefault() してはならない。
		            // preventDefault() すると、iframe 内で動作していて iframe 外にドラッグした時に mousemove が途切れるようになる。
		        };
		        _this.onWindowMouseMove = function (e) {
		            _this.pointMove(MouseTouchEventHandler.MOUSE_IDENTIFIER, _this.getOffsetPositionFromInputView(e), -1 /* PlatformButtonType.Unchanged */);
		        };
		        _this.onWindowMouseUp = function (e) {
		            if (_this.pressingMouseButton !== e.button)
		                return;
		            _this.pressingMouseButton = null;
		            _this.pointUp(MouseTouchEventHandler.MOUSE_IDENTIFIER, _this.getOffsetPositionFromInputView(e), _this.getPlatformButtonType(e, 0 /* PlatformButtonType.Primary */));
		            window.removeEventListener("mousemove", _this.onWindowMouseMove, false);
		            window.removeEventListener("mouseup", _this.onWindowMouseUp, false);
		        };
		        _this.onTouchStart = function (e) {
		            var touches = e.changedTouches;
		            for (var i = 0, len = touches.length; i < len; i++) {
		                var touch = touches[i];
		                _this.pointDown(touch.identifier, _this.getOffsetPositionFromInputView(touch), 0 /* PlatformButtonType.Primary */);
		            }
		            // NOTE touch に追従して発生する mouse イベントを抑止するために preventDefault() する。
		            // ref. https://w3c.github.io/touch-events/#mouse-events
		            // なおこの preventDefault() は iOS WebView では別の副作用を持つ: このクラスは iOS では利用すべきでない。
		            e.preventDefault();
		        };
		        _this.onTouchMove = function (e) {
		            var touches = e.changedTouches;
		            for (var i = 0, len = touches.length; i < len; i++) {
		                var touch = touches[i];
		                _this.pointMove(touch.identifier, _this.getOffsetPositionFromInputView(touch), 0 /* PlatformButtonType.Primary */);
		            }
		        };
		        _this.onTouchEnd = function (e) {
		            var touches = e.changedTouches;
		            for (var i = 0, len = touches.length; i < len; i++) {
		                var touch = touches[i];
		                _this.pointUp(touch.identifier, _this.getOffsetPositionFromInputView(touch), 0 /* PlatformButtonType.Primary */);
		            }
		            window.removeEventListener("touchmove", _this.onTouchMove, false);
		            window.removeEventListener("touchend", _this.onTouchEnd, false);
		        };
		        return _this;
		    }
		    // `start()` で設定するDOMイベントをサポートしているかを返す
		    MouseTouchEventHandler.isSupported = function () {
		        return false;
		    };
		    MouseTouchEventHandler.prototype.start = function () {
		        this.inputView.addEventListener("mousedown", this.onMouseDown, false);
		        this.inputView.addEventListener("touchstart", this.onTouchStart);
		        this.inputView.addEventListener("touchmove", this.onTouchMove);
		        this.inputView.addEventListener("touchend", this.onTouchEnd);
		        this.inputView.addEventListener("contextmenu", InputEventHandler_1.preventEventDefault);
		    };
		    MouseTouchEventHandler.prototype.stop = function () {
		        this.inputView.removeEventListener("mousedown", this.onMouseDown, false);
		        this.inputView.removeEventListener("touchstart", this.onTouchStart);
		        this.inputView.removeEventListener("touchmove", this.onTouchMove);
		        this.inputView.removeEventListener("touchend", this.onTouchEnd);
		        this.inputView.removeEventListener("contextmenu", InputEventHandler_1.preventEventDefault);
		    };
		    MouseTouchEventHandler.prototype.getPlatformButtonType = function (e, defaultValue) {
		        switch (e.button) {
		            case -1:
		                // 変化なし
		                return -1 /* PlatformButtonType.Unchanged */;
		            case 0:
		                // 主ボタン（通常は左ボタン）
		                return 0 /* PlatformButtonType.Primary */;
		            case 1:
		                // 予備ボタン（通常は中ボタン）
		                return 1 /* PlatformButtonType.Auxiliary */;
		            case 2:
		                // 副ボタン（通常は右ボタン）
		                return 2 /* PlatformButtonType.Secondary */;
		            default:
		                return defaultValue;
		        }
		    };
		    MouseTouchEventHandler.MOUSE_IDENTIFIER = 1;
		    return MouseTouchEventHandler;
		}(InputEventHandler_1.InputEventHandler));
		MouseTouchEventHandler.MouseTouchEventHandler = MouseTouchEventHandler$1;
		return MouseTouchEventHandler;
	}

	var PointerEventHandler = {};

	var hasRequiredPointerEventHandler;

	function requirePointerEventHandler () {
		if (hasRequiredPointerEventHandler) return PointerEventHandler;
		hasRequiredPointerEventHandler = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(PointerEventHandler, "__esModule", { value: true });
		PointerEventHandler.PointerEventHandler = void 0;
		var InputEventHandler_1 = requireInputEventHandler();
		/**
		 * Pointer Events を利用した入力ハンドラ。
		 *
		 * コンストラクタで受け取ったViewに対して Pointer Events のハンドラを設定する。
		 * DOMイベント情報から `PlatformPointEvent` へ変換したデータを `pointTrigger` を通して通知する。
		 * Down -> Move -> Up のフローにおける、Moveイベントのロックを管理する。
		 */
		var PointerEventHandler$1 = /** @class */ (function (_super) {
		    __extends(PointerEventHandler, _super);
		    function PointerEventHandler(inputView) {
		        var _this = _super.call(this, inputView) || this;
		        _this.onPointerDown = function (e) {
		            _this.pointDown(e.pointerId, _this.getOffsetPositionFromInputView(e), _this.getPlatformButtonType(e, 0 /* PlatformButtonType.Primary */));
		            var onPointerMove = function (event) {
		                _this.pointMove(event.pointerId, _this.getOffsetPositionFromInputView(event), _this.getPlatformButtonType(event, -1 /* PlatformButtonType.Unchanged */));
		            };
		            var onPointerUp = function (event) {
		                _this.pointUp(event.pointerId, _this.getOffsetPositionFromInputView(event), _this.getPlatformButtonType(event, 0 /* PlatformButtonType.Primary */));
		                if (e.pointerId === event.pointerId) {
		                    var handlers = _this._eventHandlersMap[event.pointerId];
		                    if (!handlers)
		                        return;
		                    var onPointerMove_1 = handlers.onPointerMove, onPointerUp_1 = handlers.onPointerUp;
		                    window.removeEventListener("pointermove", onPointerMove_1, false);
		                    window.removeEventListener("pointerup", onPointerUp_1, false);
		                    delete _this._eventHandlersMap[event.pointerId];
		                }
		            };
		            window.addEventListener("pointermove", onPointerMove, false);
		            window.addEventListener("pointerup", onPointerUp, false);
		            _this._eventHandlersMap[e.pointerId] = { onPointerMove: onPointerMove, onPointerUp: onPointerUp };
		        };
		        _this._eventHandlersMap = Object.create(null);
		        return _this;
		    }
		    // `start()` で設定するDOMイベントをサポートしているかを返す
		    PointerEventHandler.isSupported = function () {
		        return false;
		    };
		    PointerEventHandler.prototype.start = function () {
		        this.inputView.addEventListener("pointerdown", this.onPointerDown, false);
		        this.inputView.addEventListener("contextmenu", InputEventHandler_1.preventEventDefault, false);
		    };
		    PointerEventHandler.prototype.stop = function () {
		        this.inputView.removeEventListener("pointerdown", this.onPointerDown, false);
		        this.inputView.removeEventListener("contextmenu", InputEventHandler_1.preventEventDefault, false);
		    };
		    PointerEventHandler.prototype.getPlatformButtonType = function (e, defaultValue) {
		        switch (e.button) {
		            case -1:
		                // 変化なし
		                return -1 /* PlatformButtonType.Unchanged */;
		            case 0:
		                // 主ボタン（通常は左ボタン）
		                return 0 /* PlatformButtonType.Primary */;
		            case 1:
		                // 予備ボタン（通常は中ボタン）
		                return 1 /* PlatformButtonType.Auxiliary */;
		            case 2:
		                // 副ボタン（通常は右ボタン）
		                return 2 /* PlatformButtonType.Secondary */;
		            default:
		                return defaultValue;
		        }
		    };
		    return PointerEventHandler;
		}(InputEventHandler_1.InputEventHandler));
		PointerEventHandler.PointerEventHandler = PointerEventHandler$1;
		return PointerEventHandler;
	}

	var hasRequiredInputHandlerLayer;

	function requireInputHandlerLayer () {
		if (hasRequiredInputHandlerLayer) return InputHandlerLayer;
		hasRequiredInputHandlerLayer = 1;
		Object.defineProperty(InputHandlerLayer, "__esModule", { value: true });
		InputHandlerLayer.InputHandlerLayer = void 0;
		var trigger_1 = requireCjs();
		var MouseTouchEventHandler_1 = requireMouseTouchEventHandler();
		var PointerEventHandler_1 = requirePointerEventHandler();
		/**
		 * ユーザの入力を受け付けるViewのレイヤー。
		 *
		 * 実行環境に適切なDOMイベントを設定し、DOMイベントから座標データへ変換した結果をGameに伝える。
		 * InputHandlerLayerはあくまで一つのレイヤーであり、Containerではない。
		 * 従ってこのViewの親子要素がどうなっているかを知る必要はない。
		 */
		var InputHandlerLayer$1 = /** @class */ (function () {
		    /**
		     * @example
		     *
		     * const inputHandlerLayer = new InputHandlerLayer();
		     * inputHandlerLayer.pointEventTrigger.add(function(pointEvent){
		     *   console.log(pointEvent);
		     * });
		     * containerController.appendChild(inputHandlerLayer.view);
		     */
		    function InputHandlerLayer(param) {
		        this.view = this._createInputView(param.width, param.height);
		        this._inputHandler = undefined;
		        this.pointEventTrigger = new trigger_1.Trigger();
		    }
		    // 実行環境でサポートしてるDOM Eventを使い、それぞれonPoint*Triggerを関連付ける
		    InputHandlerLayer.prototype.enablePointerEvent = function () {
		        var _this = this;
		        var pointerEventAvailable = !!window.PointerEvent;
		        this._inputHandler = pointerEventAvailable ? new PointerEventHandler_1.PointerEventHandler(this.view) : new MouseTouchEventHandler_1.MouseTouchEventHandler(this.view);
		        // 各種イベントのTrigger
		        this._inputHandler.pointTrigger.add(function (e) {
		            _this.pointEventTrigger.fire(e);
		        });
		        this._inputHandler.start();
		    };
		    // DOMイベントハンドラを開放する
		    InputHandlerLayer.prototype.disablePointerEvent = function () {
		        var _a;
		        (_a = this._inputHandler) === null || _a === void 0 ? void 0 : _a.stop();
		    };
		    InputHandlerLayer.prototype.setOffset = function (offset) {
		        var inputViewStyle = "position:relative; left:".concat(offset.x, "px; top:").concat(offset.y, "px");
		        this._inputHandler.inputView.setAttribute("style", inputViewStyle);
		    };
		    InputHandlerLayer.prototype.setViewSize = function (size) {
		        var view = this.view;
		        view.style.width = size.width + "px";
		        view.style.height = size.height + "px";
		    };
		    InputHandlerLayer.prototype.setViewTabIndex = function (tabIndex) {
		        var view = this.view;
		        view.setAttribute("tabindex", tabIndex);
		    };
		    InputHandlerLayer.prototype._createInputView = function (width, height) {
		        var view = document.createElement("div");
		        view.setAttribute("style", "display:inline-block; outline:none; touch-action:none");
		        view.style.width = width + "px";
		        view.style.height = height + "px";
		        view.setAttribute("tabindex", "0");
		        return view;
		    };
		    return InputHandlerLayer;
		}());
		InputHandlerLayer.InputHandlerLayer = InputHandlerLayer$1;
		return InputHandlerLayer;
	}

	var hasRequiredContainerController;

	function requireContainerController () {
		if (hasRequiredContainerController) return ContainerController;
		hasRequiredContainerController = 1;
		Object.defineProperty(ContainerController, "__esModule", { value: true });
		ContainerController.ContainerController = void 0;
		var trigger_1 = requireCjs();
		var InputHandlerLayer_1 = requireInputHandlerLayer();
		/*
		 HTML要素のContainerを管理するクラス。
		 CanvasやInputHandlerの実態となる要素の順番や追加済みなのかを管理する。
		 ContainerはInput、Canvasを1つのセットとして扱う。

		 以下のようなDOM構造を持つ

		 ContainerController.rootView
		 └── InputHandlerLayer
		     └── CanvasSurface
		 */
		var ContainerController$1 = /** @class */ (function () {
		    function ContainerController(resourceFactory) {
		        this.container = undefined;
		        this.surface = undefined;
		        this.inputHandlerLayer = undefined;
		        this.rootView = undefined;
		        /**
		         * ゲームコンテンツのCanvas拡大・縮小時に内部のコンテキスト領域のリサイズを行うかどうか。初期値はfalse。
		         * Note: この機能は実験的なものです。特定の環境や実行状態によっては正常な描画が期待できない場合もあります。
		         * 現バージョン(0.7.5) ではfalseにしておくことを推奨しています。
		         */
		        this.useResizeForScaling = false;
		        this.pointEventTrigger = new trigger_1.Trigger();
		        this._rendererReq = undefined;
		        this.resourceFactory = resourceFactory;
		    }
		    ContainerController.prototype.initialize = function (param) {
		        this._rendererReq = param.rendererRequirement;
		        this._loadView();
		    };
		    ContainerController.prototype.setRootView = function (rootView) {
		        if (rootView === this.rootView) {
		            return;
		        }
		        // 一つのContainerは一つのrootしか持たないのでloadし直す
		        if (this.rootView) {
		            this.unloadView();
		            this._loadView();
		        }
		        this.rootView = rootView;
		        this._appendToRootView(rootView);
		    };
		    ContainerController.prototype.resetView = function (rendererReq) {
		        this.unloadView();
		        this._rendererReq = rendererReq;
		        this._loadView();
		        this._appendToRootView(this.rootView);
		    };
		    ContainerController.prototype.getRenderer = function () {
		        if (!this.surface) {
		            throw new Error("this container has no surface");
		        }
		        // TODO: should be cached?
		        return this.surface.renderer();
		    };
		    ContainerController.prototype.changeScale = function (xScale, yScale) {
		        if (this.useResizeForScaling) {
		            this.surface.changePhysicalScale(xScale, yScale);
		        }
		        else {
		            this.surface.changeVisualScale(xScale, yScale);
		        }
		        this.inputHandlerLayer._inputHandler.setScale(xScale, yScale);
		    };
		    ContainerController.prototype.unloadView = function () {
		        // イベントを片付けてから、rootViewに所属するElementを開放する
		        this.inputHandlerLayer.disablePointerEvent();
		        if (this.rootView) {
		            while (this.rootView.firstChild) {
		                this.rootView.removeChild(this.rootView.firstChild);
		            }
		        }
		    };
		    ContainerController.prototype.setTabIndex = function (tabIndex) {
		        this.inputHandlerLayer.setViewTabIndex(tabIndex);
		    };
		    ContainerController.prototype._loadView = function () {
		        var _a = this._rendererReq, width = _a.primarySurfaceWidth, height = _a.primarySurfaceHeight;
		        // DocumentFragmentはinsertした時点で開放されているため毎回作る
		        // https://dom.spec.whatwg.org/#concept-node-insert
		        this.container = document.createDocumentFragment();
		        // 入力受け付けレイヤー - DOM Eventの管理
		        if (!this.inputHandlerLayer) {
		            this.inputHandlerLayer = new InputHandlerLayer_1.InputHandlerLayer({ width: width, height: height });
		        }
		        else {
		            // Note: 操作プラグインに与えた view 情報を削除しないため、 inputHandlerLayer を使いまわしている
		            this.inputHandlerLayer.setViewSize({ width: width, height: height });
		            this.inputHandlerLayer.pointEventTrigger.removeAll();
		            if (this.surface && !this.surface.destroyed()) {
		                this.inputHandlerLayer.view.removeChild(this.surface.canvas);
		                this.surface.destroy();
		            }
		        }
		        // 入力受け付けレイヤー > 描画レイヤー
		        this.surface = this.resourceFactory.createPrimarySurface(width, height);
		        this.inputHandlerLayer.view.appendChild(this.surface.getHTMLElement());
		        // containerController -> input -> canvas
		        this.container.appendChild(this.inputHandlerLayer.view);
		    };
		    ContainerController.prototype._appendToRootView = function (rootView) {
		        rootView.appendChild(this.container);
		        this.inputHandlerLayer.enablePointerEvent(); // Viewが追加されてから設定する
		        this.inputHandlerLayer.pointEventTrigger.add(this.pointEventTrigger.fire, this.pointEventTrigger);
		    };
		    return ContainerController;
		}());
		ContainerController.ContainerController = ContainerController$1;
		return ContainerController;
	}

	var AudioPluginManager = {};

	var hasRequiredAudioPluginManager;

	function requireAudioPluginManager () {
		if (hasRequiredAudioPluginManager) return AudioPluginManager;
		hasRequiredAudioPluginManager = 1;
		Object.defineProperty(AudioPluginManager, "__esModule", { value: true });
		AudioPluginManager.AudioPluginManager = void 0;
		/*
		 Audioプラグインを登録し、現在登録しているプラグインを管理するクラス

		 TODO: 各Gameインスタンスが一つのAudioプラグインしか持たないので、
		 PluginManagerが状態をもたずにGame自体にpluginを登録する方式もあり
		 */
		var AudioPluginManager$1 = /** @class */ (function () {
		    function AudioPluginManager() {
		        this._activePlugin = null;
		    }
		    AudioPluginManager.prototype.getActivePlugin = function () {
		        return this._activePlugin;
		    };
		    // Audioプラグインに登録を行い、どれか一つでも成功ならtrue、それ以外はfalseを返す
		    AudioPluginManager.prototype.tryInstallPlugin = function (plugins) {
		        for (var i = 0, len = plugins.length; i < len; i++) {
		            var p = plugins[i];
		            if (p.isSupported) {
		                // eslint-disable-next-line @typescript-eslint/naming-convention
		                var PluginConstructor = p; // インスタンス化するので命名規則の lint を除外
		                if (PluginConstructor.isSupported()) {
		                    this._activePlugin = new PluginConstructor();
		                    return true;
		                }
		            }
		            else {
		                this._activePlugin = p;
		                return true;
		            }
		        }
		        return false;
		    };
		    return AudioPluginManager;
		}());
		AudioPluginManager.AudioPluginManager = AudioPluginManager$1;
		return AudioPluginManager;
	}

	var AudioPluginRegistry = {};

	var hasRequiredAudioPluginRegistry;

	function requireAudioPluginRegistry () {
		if (hasRequiredAudioPluginRegistry) return AudioPluginRegistry;
		hasRequiredAudioPluginRegistry = 1;
		Object.defineProperty(AudioPluginRegistry, "__esModule", { value: true });
		AudioPluginRegistry.AudioPluginRegistry = void 0;
		var audioPlugins = [];
		// eslint-disable-next-line @typescript-eslint/naming-convention
		AudioPluginRegistry.AudioPluginRegistry = {
		    addPlugin: function (plugin) {
		        if (audioPlugins.indexOf(plugin) === -1) {
		            audioPlugins.push(plugin);
		        }
		    },
		    getRegisteredAudioPlugins: function () {
		        return audioPlugins;
		    },
		    clear: function () {
		        audioPlugins = [];
		    }
		};
		return AudioPluginRegistry;
	}

	var RafLooper = {};

	var hasRequiredRafLooper;

	function requireRafLooper () {
		if (hasRequiredRafLooper) return RafLooper;
		hasRequiredRafLooper = 1;
		Object.defineProperty(RafLooper, "__esModule", { value: true });
		RafLooper.RafLooper = void 0;
		var RafLooper$1 = /** @class */ (function () {
		    function RafLooper(fun) {
		        this._timerId = null;
		        this._fun = fun;
		        this._prev = 0;
		    }
		    RafLooper.prototype.start = function () {
		        var _this = this;
		        var onAnimationFrame = function (deltaTime) {
		            if (_this._timerId == null) {
		                // NOTE: Firefox Quantum 57.0.2の不具合(？)(cancelAnimationFrame()が機能しないことがある)暫定対策
		                return;
		            }
		            _this._timerId = requestAnimationFrame(onAnimationFrame);
		            _this._fun(deltaTime - _this._prev);
		            _this._prev = deltaTime;
		        };
		        var onFirstFrame = function (deltaTime) {
		            _this._timerId = requestAnimationFrame(onAnimationFrame);
		            _this._fun(0);
		            _this._prev = deltaTime;
		        };
		        this._timerId = requestAnimationFrame(onFirstFrame);
		    };
		    RafLooper.prototype.stop = function () {
		        if (this._timerId != null) {
		            cancelAnimationFrame(this._timerId);
		        }
		        this._timerId = null;
		        this._prev = 0;
		    };
		    return RafLooper;
		}());
		RafLooper.RafLooper = RafLooper$1;
		return RafLooper;
	}

	var ResourceFactory = {};

	var GlyphFactory$1 = {};

	var hasRequiredGlyphFactory$1;

	function requireGlyphFactory$1 () {
		if (hasRequiredGlyphFactory$1) return GlyphFactory$1;
		hasRequiredGlyphFactory$1 = 1;
		Object.defineProperty(GlyphFactory$1, "__esModule", { value: true });
		GlyphFactory$1.GlyphFactory = void 0;
		var Context2DSurface_1 = requireContext2DSurface$1();
		function createGlyphRenderedSurface(code, fontSize, cssFontFamily, baselineHeight, marginW, marginH, needImageData, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight) {
		    // 要求されたフォントサイズが描画可能な最小フォントサイズ以下だった場合、必要なスケーリング係数
		    var scale = fontSize < GlyphFactory._environmentMinimumFontSize ? fontSize / GlyphFactory._environmentMinimumFontSize : 1;
		    var surfaceWidth = Math.ceil((fontSize + marginW * 2) * scale);
		    var surfaceHeight = Math.ceil((fontSize + marginH * 2) * scale);
		    var surface = new Context2DSurface_1.Context2DSurface(surfaceWidth, surfaceHeight);
		    // NOTE: canvasを直接操作する
		    // 理由:
		    // * Renderer#drawSystemText()を廃止または非推奨にしたいのでそれを用いず文字列を描画する
		    // * RenderingHelperがcontextの状態を復帰するためTextMetricsを取れない
		    var canvas = surface.canvas;
		    var context = canvas.getContext("2d");
		    if (!context) {
		        throw new Error("createGlyphRenderedSurface(): could not initialize CanvasRenderingContext2D");
		    }
		    var str = (code & 0xFFFF0000) ? String.fromCharCode((code & 0xFFFF0000) >>> 16, code & 0xFFFF) : String.fromCharCode(code);
		    context.save();
		    // CanvasRenderingContext2D.font
		    // see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
		    // > This string uses the same syntax as the CSS font specifier. The default font is 10px sans-serif.
		    context.font = fontWeight + " " + fontSize + "px " + cssFontFamily;
		    context.textAlign = "left";
		    context.textBaseline = "alphabetic";
		    context.lineJoin = "bevel";
		    // 描画可能な最小フォントサイズ以下のフォントサイズはスケーリングで実現する
		    if (scale !== 1)
		        context.scale(scale, scale);
		    if (strokeWidth > 0) {
		        context.lineWidth = strokeWidth;
		        context.strokeStyle = strokeColor;
		        context.strokeText(str, marginW, marginH + baselineHeight);
		    }
		    if (!strokeOnly) {
		        context.fillStyle = fontColor;
		        context.fillText(str, marginW, marginH + baselineHeight);
		    }
		    var advanceWidth = context.measureText(str).width;
		    context.restore();
		    var result = {
		        surface: surface,
		        advanceWidth: advanceWidth,
		        imageData: needImageData ? context.getImageData(0, 0, canvas.width, canvas.height) : undefined
		    };
		    return result;
		}
		function calcGlyphArea(imageData) {
		    var sx = imageData.width;
		    var sy = imageData.height;
		    var ex = 0;
		    var ey = 0;
		    var currentPos = 0;
		    for (var y = 0, height = imageData.height; y < height; y = (y + 1) | 0) {
		        for (var x = 0, width = imageData.width; x < width; x = (x + 1) | 0) {
		            var a = imageData.data[currentPos + 3]; // get alpha value
		            if (a !== 0) {
		                if (x < sx) {
		                    sx = x;
		                }
		                if (x > ex) {
		                    ex = x;
		                }
		                if (y < sy) {
		                    sy = y;
		                }
		                if (y > ey) {
		                    ey = y;
		                }
		            }
		            currentPos += 4; // go to next pixel
		        }
		    }
		    var glyphArea;
		    if (sx === imageData.width) { // 空白文字
		        glyphArea = { x: 0, y: 0, width: 0, height: 0 }; // 空の領域に設定
		    }
		    else {
		        // sx, sy, ex, eyは座標ではなく画素のメモリ上の位置を指す添字。
		        // 故にwidth, heightを算出する時 1 加算する。
		        glyphArea = { x: sx, y: sy, width: ex - sx + 1, height: ey - sy + 1 };
		    }
		    return glyphArea;
		}
		function isGlyphAreaEmpty(glyphArea) {
		    return glyphArea.width === 0 || glyphArea.height === 0;
		}
		// ジェネリックフォントファミリとして定義されているキーワードのリスト
		// see: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
		var genericFontFamilyNames = [
		    "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"
		];
		// ジェネリックフォントファミリでない時クォートする。
		// > Font family names must either be given quoted as strings, or unquoted as a sequence of one or more identifiers.
		// > Generic family names are keywords and must not be quoted.
		// see: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
		function quoteIfNonGeneric(name) {
		    return (genericFontFamilyNames.indexOf(name) !== -1) ? name : "\"" + name + "\"";
		}
		function createGlyph(code, x, y, width, height, offsetX, offsetY, advanceWidth, surface, isSurfaceValid) {
		    return {
		        code: code,
		        x: x,
		        y: y,
		        width: width,
		        height: height,
		        surface: surface,
		        offsetX: offsetX,
		        offsetY: offsetY,
		        advanceWidth: advanceWidth,
		        isSurfaceValid: isSurfaceValid,
		        _atlas: null
		    };
		}
		var GlyphFactory = /** @class */ (function () {
		    function GlyphFactory(fontFamily, fontSize, baselineHeight, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight) {
		        if (baselineHeight === void 0) { baselineHeight = fontSize; }
		        if (fontColor === void 0) { fontColor = "black"; }
		        if (strokeWidth === void 0) { strokeWidth = 0; }
		        if (strokeColor === void 0) { strokeColor = "black"; }
		        if (strokeOnly === void 0) { strokeOnly = false; }
		        if (fontWeight === void 0) { fontWeight = "normal"; }
		        this._glyphAreas = Object.create(null);
		        this.fontFamily = fontFamily;
		        this.fontSize = fontSize;
		        this.baselineHeight = baselineHeight;
		        this.fontColor = fontColor;
		        this.strokeWidth = strokeWidth;
		        this.strokeColor = strokeColor;
		        this.strokeOnly = strokeOnly;
		        this.fontWeight = fontWeight;
		        this._cssFontFamily = (typeof fontFamily === "string")
		            ? quoteIfNonGeneric(fontFamily)
		            : fontFamily.map(quoteIfNonGeneric).join(",");
		        // Akashicエンジンは指定されたフォントに利用可能なものが見つからない時
		        // `"sans-serif"` を利用する、と仕様して定められている。
		        if (this._cssFontFamily.indexOf("sans-serif") === -1) {
		            this._cssFontFamily += ",sans-serif";
		        }
		        // `this.fontSize`の大きさの文字を描画するためのサーフェスを生成する。
		        // 一部の文字は縦横が`this.fontSize`幅の矩形に収まらない。
		        // そこで上下左右にマージンを設ける。マージン幅は`this.fontSize`に
		        // 0.3 を乗じたものにする。0.3に確たる根拠はないが、検証した範囲では
		        // これで十分であることを確認している。
		        //
		        // strokeWidthサポートに伴い、輪郭線の厚みを加味している。
		        this._marginW = Math.ceil(this.fontSize * 0.3 + this.strokeWidth / 2);
		        this._marginH = Math.ceil(this.fontSize * 0.3 + this.strokeWidth / 2);
		        if (GlyphFactory._environmentMinimumFontSize === undefined) {
		            GlyphFactory._environmentMinimumFontSize = this.measureMinimumFontSize();
		        }
		    }
		    GlyphFactory.prototype.create = function (code) {
		        var result = null;
		        var glyphArea = this._glyphAreas[code];
		        if (!glyphArea) {
		            result = createGlyphRenderedSurface(code, this.fontSize, this._cssFontFamily, this.baselineHeight, this._marginW, this._marginH, true, this.fontColor, this.strokeWidth, this.strokeColor, this.strokeOnly, this.fontWeight);
		            glyphArea = calcGlyphArea(result.imageData);
		            glyphArea.advanceWidth = result.advanceWidth;
		            this._glyphAreas[code] = glyphArea;
		        }
		        if (isGlyphAreaEmpty(glyphArea)) {
		            if (result) {
		                result.surface.destroy();
		            }
		            return createGlyph(code, 0, 0, 0, 0, 0, 0, glyphArea.advanceWidth, undefined, true);
		        }
		        else {
		            // pdi.Glyphに格納するサーフェスを生成する。
		            // glyphAreaはサーフェスをキャッシュしないため、描画する内容を持つグリフに対しては
		            // サーフェスを生成する。もし前段でcalcGlyphArea()のためのサーフェスを生成して
		            // いればここでは生成せずにそれを利用する。
		            if (!result) {
		                result = createGlyphRenderedSurface(code, this.fontSize, this._cssFontFamily, this.baselineHeight, this._marginW, this._marginH, false, this.fontColor, this.strokeWidth, this.strokeColor, this.strokeOnly, this.fontWeight);
		            }
		            return createGlyph(code, glyphArea.x, glyphArea.y, glyphArea.width, glyphArea.height, glyphArea.x - this._marginW, glyphArea.y - this._marginH, glyphArea.advanceWidth, result.surface, true);
		        }
		    };
		    // 実行環境の描画可能なフォントサイズの最小値を返す
		    GlyphFactory.prototype.measureMinimumFontSize = function () {
		        var fontSize = 1;
		        var str = "M";
		        var canvas = document.createElement("canvas");
		        var context = canvas.getContext("2d");
		        if (!context) {
		            throw new Error("GlyphFactory#measureMinimumFontSize(): could not initialize CanvasRenderingContext2D");
		        }
		        context.textAlign = "left";
		        context.textBaseline = "alphabetic";
		        context.lineJoin = "bevel";
		        var preWidth;
		        context.font = fontSize + "px sans-serif";
		        var width = context.measureText(str).width;
		        do {
		            preWidth = width;
		            fontSize += 1;
		            context.font = fontSize + "px sans-serif";
		            width = context.measureText(str).width;
		        } while (preWidth === width || fontSize > 50); // フォントサイズに対応しない動作環境の場合を考慮して上限値を設ける
		        return fontSize;
		    };
		    return GlyphFactory;
		}());
		GlyphFactory$1.GlyphFactory = GlyphFactory;
		return GlyphFactory$1;
	}

	var SurfaceFactory$1 = {};

	var RenderingHelper = {};

	var hasRequiredRenderingHelper;

	function requireRenderingHelper () {
		if (hasRequiredRenderingHelper) return RenderingHelper;
		hasRequiredRenderingHelper = 1;
		Object.defineProperty(RenderingHelper, "__esModule", { value: true });
		RenderingHelper.RenderingHelper = void 0;
		var RenderingHelper$1;
		(function (RenderingHelper) {
		    function toPowerOfTwo(x) {
		        if ((x & (x - 1)) !== 0) {
		            var y = 1;
		            while (y < x) {
		                y *= 2;
		            }
		            return y;
		        }
		        return x;
		    }
		    RenderingHelper.toPowerOfTwo = toPowerOfTwo;
		    function clamp(x) {
		        return Math.min(Math.max(x, 0.0), 1.0);
		    }
		    RenderingHelper.clamp = clamp;
		    function usedWebGL(rendererCandidates) {
		        var used = false;
		        if (rendererCandidates && (0 < rendererCandidates.length)) {
		            used = (rendererCandidates[0] === "webgl");
		        }
		        return used;
		    }
		    RenderingHelper.usedWebGL = usedWebGL;
		})(RenderingHelper$1 || (RenderingHelper.RenderingHelper = RenderingHelper$1 = {}));
		return RenderingHelper;
	}

	var WebGLSharedObject = {};

	var WebGLBackSurface = {};

	var WebGLBackSurfaceRenderer = {};

	var WebGLRenderer = {};

	var WebGLColor = {};

	var hasRequiredWebGLColor;

	function requireWebGLColor () {
		if (hasRequiredWebGLColor) return WebGLColor;
		hasRequiredWebGLColor = 1;
		Object.defineProperty(WebGLColor, "__esModule", { value: true });
		WebGLColor.WebGLColor = void 0;
		var RenderingHelper_1 = requireRenderingHelper();
		var WebGLColor$1;
		(function (WebGLColor) {
		    WebGLColor.colorMap = {
		        "ALICEBLUE": [0xF0 / 255.0, 0xF8 / 255.0, 0xFF / 255.0, 1.0],
		        "ANTIQUEWHITE": [0xFA / 255.0, 0xEB / 255.0, 0xD7 / 255.0, 1.0],
		        "AQUA": [0x00 / 255.0, 0xFF / 255.0, 0xFF / 255.0, 1.0],
		        "AQUAMARINE": [0x7F / 255.0, 0xFF / 255.0, 0xD4 / 255.0, 1.0],
		        "AZURE": [0xF0 / 255.0, 0xFF / 255.0, 0xFF / 255.0, 1.0],
		        "BEIGE": [0xF5 / 255.0, 0xF5 / 255.0, 0xDC / 255.0, 1.0],
		        "BISQUE": [0xFF / 255.0, 0xE4 / 255.0, 0xC4 / 255.0, 1.0],
		        "BLACK": [0x00 / 255.0, 0x00 / 255.0, 0x00 / 255.0, 1.0],
		        "BLANCHEDALMOND": [0xFF / 255.0, 0xEB / 255.0, 0xCD / 255.0, 1.0],
		        "BLUE": [0x00 / 255.0, 0x00 / 255.0, 0xFF / 255.0, 1.0],
		        "BLUEVIOLET": [0x8A / 255.0, 0x2B / 255.0, 0xE2 / 255.0, 1.0],
		        "BROWN": [0xA5 / 255.0, 0x2A / 255.0, 0x2A / 255.0, 1.0],
		        "BURLYWOOD": [0xDE / 255.0, 0xB8 / 255.0, 0x87 / 255.0, 1.0],
		        "CADETBLUE": [0x5F / 255.0, 0x9E / 255.0, 0xA0 / 255.0, 1.0],
		        "CHARTREUSE": [0x7F / 255.0, 0xFF / 255.0, 0x00 / 255.0, 1.0],
		        "CHOCOLATE": [0xD2 / 255.0, 0x69 / 255.0, 0x1E / 255.0, 1.0],
		        "CORAL": [0xFF / 255.0, 0x7F / 255.0, 0x50 / 255.0, 1.0],
		        "CORNFLOWERBLUE": [0x64 / 255.0, 0x95 / 255.0, 0xED / 255.0, 1.0],
		        "CORNSILK": [0xFF / 255.0, 0xF8 / 255.0, 0xDC / 255.0, 1.0],
		        "CRIMSON": [0xDC / 255.0, 0x14 / 255.0, 0x3C / 255.0, 1.0],
		        "CYAN": [0x00 / 255.0, 0xFF / 255.0, 0xFF / 255.0, 1.0],
		        "DARKBLUE": [0x00 / 255.0, 0x00 / 255.0, 0x8B / 255.0, 1.0],
		        "DARKCYAN": [0x00 / 255.0, 0x8B / 255.0, 0x8B / 255.0, 1.0],
		        "DARKGOLDENROD": [0xB8 / 255.0, 0x86 / 255.0, 0x0B / 255.0, 1.0],
		        "DARKGRAY": [0xA9 / 255.0, 0xA9 / 255.0, 0xA9 / 255.0, 1.0],
		        "DARKGREEN": [0x00 / 255.0, 0x64 / 255.0, 0x00 / 255.0, 1.0],
		        "DARKGREY": [0xA9 / 255.0, 0xA9 / 255.0, 0xA9 / 255.0, 1.0],
		        "DARKKHAKI": [0xBD / 255.0, 0xB7 / 255.0, 0x6B / 255.0, 1.0],
		        "DARKMAGENTA": [0x8B / 255.0, 0x00 / 255.0, 0x8B / 255.0, 1.0],
		        "DARKOLIVEGREEN": [0x55 / 255.0, 0x6B / 255.0, 0x2F / 255.0, 1.0],
		        "DARKORANGE": [0xFF / 255.0, 0x8C / 255.0, 0x00 / 255.0, 1.0],
		        "DARKORCHID": [0x99 / 255.0, 0x32 / 255.0, 0xCC / 255.0, 1.0],
		        "DARKRED": [0x8B / 255.0, 0x00 / 255.0, 0x00 / 255.0, 1.0],
		        "DARKSALMON": [0xE9 / 255.0, 0x96 / 255.0, 0x7A / 255.0, 1.0],
		        "DARKSEAGREEN": [0x8F / 255.0, 0xBC / 255.0, 0x8F / 255.0, 1.0],
		        "DARKSLATEBLUE": [0x48 / 255.0, 0x3D / 255.0, 0x8B / 255.0, 1.0],
		        "DARKSLATEGRAY": [0x2F / 255.0, 0x4F / 255.0, 0x4F / 255.0, 1.0],
		        "DARKSLATEGREY": [0x2F / 255.0, 0x4F / 255.0, 0x4F / 255.0, 1.0],
		        "DARKTURQUOISE": [0x00 / 255.0, 0xCE / 255.0, 0xD1 / 255.0, 1.0],
		        "DARKVIOLET": [0x94 / 255.0, 0x00 / 255.0, 0xD3 / 255.0, 1.0],
		        "DEEPPINK": [0xFF / 255.0, 0x14 / 255.0, 0x93 / 255.0, 1.0],
		        "DEEPSKYBLUE": [0x00 / 255.0, 0xBF / 255.0, 0xFF / 255.0, 1.0],
		        "DIMGRAY": [0x69 / 255.0, 0x69 / 255.0, 0x69 / 255.0, 1.0],
		        "DIMGREY": [0x69 / 255.0, 0x69 / 255.0, 0x69 / 255.0, 1.0],
		        "DODGERBLUE": [0x1E / 255.0, 0x90 / 255.0, 0xFF / 255.0, 1.0],
		        "FIREBRICK": [0xB2 / 255.0, 0x22 / 255.0, 0x22 / 255.0, 1.0],
		        "FLORALWHITE": [0xFF / 255.0, 0xFA / 255.0, 0xF0 / 255.0, 1.0],
		        "FORESTGREEN": [0x22 / 255.0, 0x8B / 255.0, 0x22 / 255.0, 1.0],
		        "FUCHSIA": [0xFF / 255.0, 0x00 / 255.0, 0xFF / 255.0, 1.0],
		        "GAINSBORO": [0xDC / 255.0, 0xDC / 255.0, 0xDC / 255.0, 1.0],
		        "GHOSTWHITE": [0xF8 / 255.0, 0xF8 / 255.0, 0xFF / 255.0, 1.0],
		        "GOLD": [0xFF / 255.0, 0xD7 / 255.0, 0x00 / 255.0, 1.0],
		        "GOLDENROD": [0xDA / 255.0, 0xA5 / 255.0, 0x20 / 255.0, 1.0],
		        "GRAY": [0x80 / 255.0, 0x80 / 255.0, 0x80 / 255.0, 1.0],
		        "GREEN": [0x00 / 255.0, 0x80 / 255.0, 0x00 / 255.0, 1.0],
		        "GREENYELLOW": [0xAD / 255.0, 0xFF / 255.0, 0x2F / 255.0, 1.0],
		        "GREY": [0x80 / 255.0, 0x80 / 255.0, 0x80 / 255.0, 1.0],
		        "HONEYDEW": [0xF0 / 255.0, 0xFF / 255.0, 0xF0 / 255.0, 1.0],
		        "HOTPINK": [0xFF / 255.0, 0x69 / 255.0, 0xB4 / 255.0, 1.0],
		        "INDIANRED": [0xCD / 255.0, 0x5C / 255.0, 0x5C / 255.0, 1.0],
		        "INDIGO": [0x4B / 255.0, 0x00 / 255.0, 0x82 / 255.0, 1.0],
		        "IVORY": [0xFF / 255.0, 0xFF / 255.0, 0xF0 / 255.0, 1.0],
		        "KHAKI": [0xF0 / 255.0, 0xE6 / 255.0, 0x8C / 255.0, 1.0],
		        "LAVENDER": [0xE6 / 255.0, 0xE6 / 255.0, 0xFA / 255.0, 1.0],
		        "LAVENDERBLUSH": [0xFF / 255.0, 0xF0 / 255.0, 0xF5 / 255.0, 1.0],
		        "LAWNGREEN": [0x7C / 255.0, 0xFC / 255.0, 0x00 / 255.0, 1.0],
		        "LEMONCHIFFON": [0xFF / 255.0, 0xFA / 255.0, 0xCD / 255.0, 1.0],
		        "LIGHTBLUE": [0xAD / 255.0, 0xD8 / 255.0, 0xE6 / 255.0, 1.0],
		        "LIGHTCORAL": [0xF0 / 255.0, 0x80 / 255.0, 0x80 / 255.0, 1.0],
		        "LIGHTCYAN": [0xE0 / 255.0, 0xFF / 255.0, 0xFF / 255.0, 1.0],
		        "LIGHTGOLDENRODYELLOW": [0xFA / 255.0, 0xFA / 255.0, 0xD2 / 255.0, 1.0],
		        "LIGHTGRAY": [0xD3 / 255.0, 0xD3 / 255.0, 0xD3 / 255.0, 1.0],
		        "LIGHTGREEN": [0x90 / 255.0, 0xEE / 255.0, 0x90 / 255.0, 1.0],
		        "LIGHTGREY": [0xD3 / 255.0, 0xD3 / 255.0, 0xD3 / 255.0, 1.0],
		        "LIGHTPINK": [0xFF / 255.0, 0xB6 / 255.0, 0xC1 / 255.0, 1.0],
		        "LIGHTSALMON": [0xFF / 255.0, 0xA0 / 255.0, 0x7A / 255.0, 1.0],
		        "LIGHTSEAGREEN": [0x20 / 255.0, 0xB2 / 255.0, 0xAA / 255.0, 1.0],
		        "LIGHTSKYBLUE": [0x87 / 255.0, 0xCE / 255.0, 0xFA / 255.0, 1.0],
		        "LIGHTSLATEGRAY": [0x77 / 255.0, 0x88 / 255.0, 0x99 / 255.0, 1.0],
		        "LIGHTSLATEGREY": [0x77 / 255.0, 0x88 / 255.0, 0x99 / 255.0, 1.0],
		        "LIGHTSTEELBLUE": [0xB0 / 255.0, 0xC4 / 255.0, 0xDE / 255.0, 1.0],
		        "LIGHTYELLOW": [0xFF / 255.0, 0xFF / 255.0, 0xE0 / 255.0, 1.0],
		        "LIME": [0x00 / 255.0, 0xFF / 255.0, 0x00 / 255.0, 1.0],
		        "LIMEGREEN": [0x32 / 255.0, 0xCD / 255.0, 0x32 / 255.0, 1.0],
		        "LINEN": [0xFA / 255.0, 0xF0 / 255.0, 0xE6 / 255.0, 1.0],
		        "MAGENTA": [0xFF / 255.0, 0x00 / 255.0, 0xFF / 255.0, 1.0],
		        "MAROON": [0x80 / 255.0, 0x00 / 255.0, 0x00 / 255.0, 1.0],
		        "MEDIUMAQUAMARINE": [0x66 / 255.0, 0xCD / 255.0, 0xAA / 255.0, 1.0],
		        "MEDIUMBLUE": [0x00 / 255.0, 0x00 / 255.0, 0xCD / 255.0, 1.0],
		        "MEDIUMORCHID": [0xBA / 255.0, 0x55 / 255.0, 0xD3 / 255.0, 1.0],
		        "MEDIUMPURPLE": [0x93 / 255.0, 0x70 / 255.0, 0xDB / 255.0, 1.0],
		        "MEDIUMSEAGREEN": [0x3C / 255.0, 0xB3 / 255.0, 0x71 / 255.0, 1.0],
		        "MEDIUMSLATEBLUE": [0x7B / 255.0, 0x68 / 255.0, 0xEE / 255.0, 1.0],
		        "MEDIUMSPRINGGREEN": [0x00 / 255.0, 0xFA / 255.0, 0x9A / 255.0, 1.0],
		        "MEDIUMTURQUOISE": [0x48 / 255.0, 0xD1 / 255.0, 0xCC / 255.0, 1.0],
		        "MEDIUMVIOLETRED": [0xC7 / 255.0, 0x15 / 255.0, 0x85 / 255.0, 1.0],
		        "MIDNIGHTBLUE": [0x19 / 255.0, 0x19 / 255.0, 0x70 / 255.0, 1.0],
		        "MINTCREAM": [0xF5 / 255.0, 0xFF / 255.0, 0xFA / 255.0, 1.0],
		        "MISTYROSE": [0xFF / 255.0, 0xE4 / 255.0, 0xE1 / 255.0, 1.0],
		        "MOCCASIN": [0xFF / 255.0, 0xE4 / 255.0, 0xB5 / 255.0, 1.0],
		        "NAVAJOWHITE": [0xFF / 255.0, 0xDE / 255.0, 0xAD / 255.0, 1.0],
		        "NAVY": [0x00 / 255.0, 0x00 / 255.0, 0x80 / 255.0, 1.0],
		        "OLDLACE": [0xFD / 255.0, 0xF5 / 255.0, 0xE6 / 255.0, 1.0],
		        "OLIVE": [0x80 / 255.0, 0x80 / 255.0, 0x00 / 255.0, 1.0],
		        "OLIVEDRAB": [0x6B / 255.0, 0x8E / 255.0, 0x23 / 255.0, 1.0],
		        "ORANGE": [0xFF / 255.0, 0xA5 / 255.0, 0x00 / 255.0, 1.0],
		        "ORANGERED": [0xFF / 255.0, 0x45 / 255.0, 0x00 / 255.0, 1.0],
		        "ORCHID": [0xDA / 255.0, 0x70 / 255.0, 0xD6 / 255.0, 1.0],
		        "PALEGOLDENROD": [0xEE / 255.0, 0xE8 / 255.0, 0xAA / 255.0, 1.0],
		        "PALEGREEN": [0x98 / 255.0, 0xFB / 255.0, 0x98 / 255.0, 1.0],
		        "PALETURQUOISE": [0xAF / 255.0, 0xEE / 255.0, 0xEE / 255.0, 1.0],
		        "PALEVIOLETRED": [0xDB / 255.0, 0x70 / 255.0, 0x93 / 255.0, 1.0],
		        "PAPAYAWHIP": [0xFF / 255.0, 0xEF / 255.0, 0xD5 / 255.0, 1.0],
		        "PEACHPUFF": [0xFF / 255.0, 0xDA / 255.0, 0xB9 / 255.0, 1.0],
		        "PERU": [0xCD / 255.0, 0x85 / 255.0, 0x3F / 255.0, 1.0],
		        "PINK": [0xFF / 255.0, 0xC0 / 255.0, 0xCB / 255.0, 1.0],
		        "PLUM": [0xDD / 255.0, 0xA0 / 255.0, 0xDD / 255.0, 1.0],
		        "POWDERBLUE": [0xB0 / 255.0, 0xE0 / 255.0, 0xE6 / 255.0, 1.0],
		        "PURPLE": [0x80 / 255.0, 0x00 / 255.0, 0x80 / 255.0, 1.0],
		        "RED": [0xFF / 255.0, 0x00 / 255.0, 0x00 / 255.0, 1.0],
		        "ROSYBROWN": [0xBC / 255.0, 0x8F / 255.0, 0x8F / 255.0, 1.0],
		        "ROYALBLUE": [0x41 / 255.0, 0x69 / 255.0, 0xE1 / 255.0, 1.0],
		        "SADDLEBROWN": [0x8B / 255.0, 0x45 / 255.0, 0x13 / 255.0, 1.0],
		        "SALMON": [0xFA / 255.0, 0x80 / 255.0, 0x72 / 255.0, 1.0],
		        "SANDYBROWN": [0xF4 / 255.0, 0xA4 / 255.0, 0x60 / 255.0, 1.0],
		        "SEAGREEN": [0x2E / 255.0, 0x8B / 255.0, 0x57 / 255.0, 1.0],
		        "SEASHELL": [0xFF / 255.0, 0xF5 / 255.0, 0xEE / 255.0, 1.0],
		        "SIENNA": [0xA0 / 255.0, 0x52 / 255.0, 0x2D / 255.0, 1.0],
		        "SILVER": [0xC0 / 255.0, 0xC0 / 255.0, 0xC0 / 255.0, 1.0],
		        "SKYBLUE": [0x87 / 255.0, 0xCE / 255.0, 0xEB / 255.0, 1.0],
		        "SLATEBLUE": [0x6A / 255.0, 0x5A / 255.0, 0xCD / 255.0, 1.0],
		        "SLATEGRAY": [0x70 / 255.0, 0x80 / 255.0, 0x90 / 255.0, 1.0],
		        "SLATEGREY": [0x70 / 255.0, 0x80 / 255.0, 0x90 / 255.0, 1.0],
		        "SNOW": [0xFF / 255.0, 0xFA / 255.0, 0xFA / 255.0, 1.0],
		        "SPRINGGREEN": [0x00 / 255.0, 0xFF / 255.0, 0x7F / 255.0, 1.0],
		        "STEELBLUE": [0x46 / 255.0, 0x82 / 255.0, 0xB4 / 255.0, 1.0],
		        "TAN": [0xD2 / 255.0, 0xB4 / 255.0, 0x8C / 255.0, 1.0],
		        "TEAL": [0x00 / 255.0, 0x80 / 255.0, 0x80 / 255.0, 1.0],
		        "THISTLE": [0xD8 / 255.0, 0xBF / 255.0, 0xD8 / 255.0, 1.0],
		        "TOMATO": [0xFF / 255.0, 0x63 / 255.0, 0x47 / 255.0, 1.0],
		        "TURQUOISE": [0x40 / 255.0, 0xE0 / 255.0, 0xD0 / 255.0, 1.0],
		        "VIOLET": [0xEE / 255.0, 0x82 / 255.0, 0xEE / 255.0, 1.0],
		        "WHEAT": [0xF5 / 255.0, 0xDE / 255.0, 0xB3 / 255.0, 1.0],
		        "WHITE": [0xFF / 255.0, 0xFF / 255.0, 0xFF / 255.0, 1.0],
		        "WHITESMOKE": [0xF5 / 255.0, 0xF5 / 255.0, 0xF5 / 255.0, 1.0],
		        "YELLOW": [0xFF / 255.0, 0xFF / 255.0, 0x00 / 255.0, 1.0],
		        "YELLOWGREEN": [0x9A / 255.0, 0xCD / 255.0, 0x32 / 255.0, 1.0]
		    };
		    function get(color) {
		        var rgba = (typeof color === "string") ? WebGLColor._toColor(color) : [color[0], color[1], color[2], color[3]];
		        rgba[3] = RenderingHelper_1.RenderingHelper.clamp(rgba[3]);
		        rgba[0] = RenderingHelper_1.RenderingHelper.clamp(rgba[0]) * rgba[3];
		        rgba[1] = RenderingHelper_1.RenderingHelper.clamp(rgba[1]) * rgba[3];
		        rgba[2] = RenderingHelper_1.RenderingHelper.clamp(rgba[2]) * rgba[3];
		        return rgba;
		    }
		    WebGLColor.get = get;
		    function _hsl2rgb(hsl) {
		        var h = hsl[0] % 360;
		        var s = hsl[1];
		        var l = (hsl[2] > 50) ? 100 - hsl[2] : hsl[2];
		        var a = hsl[3];
		        var max = l + l * s;
		        var min = l - l * s;
		        if (h < 60) {
		            return [max, (h / 60.0) * (max - min) + min, min, a];
		        }
		        else if (h < 120) {
		            return [((120 - h) / 60.0) * (max - min) + min, max, min, a];
		        }
		        else if (h < 180) {
		            return [min, max, ((h - 120) / 60.0) * (max - min) + min, a];
		        }
		        else if (h < 240) {
		            return [min, ((240 - h) / 60.0) * (max - min) + min, max, a];
		        }
		        else if (h < 300) {
		            return [((h - 240) / 60.0) * (max - min) + min, min, max, a];
		        }
		        else {
		            return [max, min, ((360 - h) / 60.0) * (max - min) + min, a];
		        }
		    }
		    WebGLColor._hsl2rgb = _hsl2rgb;
		    function _toColor(cssColor) {
		        // 大文字化して空白を削除 (ncc: normalized css color)
		        var ncc = cssColor.toUpperCase().replace(/\s+/g, "");
		        var rgba = WebGLColor.colorMap[ncc];
		        if (rgba) {
		            return rgba;
		        }
		        if (ncc.match(/^#([\dA-F])([\dA-F])([\dA-F])$/)) {
		            return [
		                parseInt(RegExp.$1, 16) / 15.0,
		                parseInt(RegExp.$2, 16) / 15.0,
		                parseInt(RegExp.$3, 16) / 15.0, 1.0
		            ];
		        }
		        else if (ncc.match(/^#([\dA-F]{2})([\dA-F]{2})([\dA-F]{2})$/)) {
		            return [
		                parseInt(RegExp.$1, 16) / 255.0,
		                parseInt(RegExp.$2, 16) / 255.0,
		                parseInt(RegExp.$3, 16) / 255.0, 1.0
		            ];
		        }
		        else if (ncc.match(/^RGB\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/)) {
		            return [
		                parseInt(RegExp.$1, 10) / 255.0,
		                parseInt(RegExp.$2, 10) / 255.0,
		                parseInt(RegExp.$3, 10) / 255.0, 1.0
		            ];
		        }
		        else if (ncc.match(/^RGBA\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d(\.\d*)?)\)$/)) {
		            return [
		                parseInt(RegExp.$1, 10) / 255.0,
		                parseInt(RegExp.$2, 10) / 255.0,
		                parseInt(RegExp.$3, 10) / 255.0,
		                parseFloat(RegExp.$4)
		            ];
		        }
		        else if (ncc.match(/^HSL\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$/)) {
		            return WebGLColor._hsl2rgb([
		                parseInt(RegExp.$1, 10),
		                RenderingHelper_1.RenderingHelper.clamp(parseInt(RegExp.$2, 10) / 100.0),
		                RenderingHelper_1.RenderingHelper.clamp(parseInt(RegExp.$3, 10) / 100.0), 1.0
		            ]);
		        }
		        else if (ncc.match(/^HSLA\((\d{1,3}),(\d{1,3})%,(\d{1,3})%,(\d(\.\d*)?)\)$/)) {
		            return WebGLColor._hsl2rgb([
		                parseInt(RegExp.$1, 10),
		                RenderingHelper_1.RenderingHelper.clamp(parseInt(RegExp.$2, 10) / 100.0),
		                RenderingHelper_1.RenderingHelper.clamp(parseInt(RegExp.$3, 10) / 100.0),
		                parseFloat(RegExp.$4)
		            ]);
		        }
		        else {
		            throw Error("illigal cssColor format: " + ncc);
		        }
		    }
		    WebGLColor._toColor = _toColor;
		})(WebGLColor$1 || (WebGLColor.WebGLColor = WebGLColor$1 = {}));
		return WebGLColor;
	}

	var WebGLRenderingState = {};

	var hasRequiredWebGLRenderingState;

	function requireWebGLRenderingState () {
		if (hasRequiredWebGLRenderingState) return WebGLRenderingState;
		hasRequiredWebGLRenderingState = 1;
		Object.defineProperty(WebGLRenderingState, "__esModule", { value: true });
		WebGLRenderingState.WebGLRenderingState = void 0;
		var AffineTransformer_1 = requireAffineTransformer();
		var WebGLRenderingState$1 = /** @class */ (function () {
		    function WebGLRenderingState(rhs) {
		        if (rhs) {
		            this.globalAlpha = rhs.globalAlpha;
		            this.globalCompositeOperation = rhs.globalCompositeOperation;
		            this.transformer = new AffineTransformer_1.AffineTransformer(rhs.transformer);
		            this.shaderProgram = rhs.shaderProgram;
		        }
		        else {
		            this.globalAlpha = 1.0;
		            this.globalCompositeOperation = "source-over";
		            this.transformer = new AffineTransformer_1.AffineTransformer();
		            this.shaderProgram = null;
		        }
		    }
		    WebGLRenderingState.prototype.copyFrom = function (rhs) {
		        this.globalAlpha = rhs.globalAlpha;
		        this.globalCompositeOperation = rhs.globalCompositeOperation;
		        this.transformer.copyFrom(rhs.transformer);
		        this.shaderProgram = rhs.shaderProgram;
		        return this;
		    };
		    return WebGLRenderingState;
		}());
		WebGLRenderingState.WebGLRenderingState = WebGLRenderingState$1;
		return WebGLRenderingState;
	}

	var hasRequiredWebGLRenderer;

	function requireWebGLRenderer () {
		if (hasRequiredWebGLRenderer) return WebGLRenderer;
		hasRequiredWebGLRenderer = 1;
		Object.defineProperty(WebGLRenderer, "__esModule", { value: true });
		WebGLRenderer.WebGLRenderer = void 0;
		var WebGLColor_1 = requireWebGLColor();
		var WebGLRenderingState_1 = requireWebGLRenderingState();
		var WebGLRenderer$1 = /** @class */ (function () {
		    function WebGLRenderer(shared, renderTarget) {
		        this._stateStack = [];
		        this._stateStackPointer = 0;
		        this._capacity = 0;
		        this._reallocation(WebGLRenderer.DEFAULT_CAPACITY);
		        this._whiteColor = [1.0, 1.0, 1.0, 1.0];
		        this._shared = shared;
		        this._renderTarget = renderTarget;
		    }
		    WebGLRenderer.prototype.clear = function () {
		        this._shared.clear();
		    };
		    WebGLRenderer.prototype.begin = function () {
		        // do nothing.
		    };
		    WebGLRenderer.prototype.end = function () {
		        this._shared.end();
		    };
		    WebGLRenderer.prototype.save = function () {
		        this._pushState();
		    };
		    WebGLRenderer.prototype.restore = function () {
		        this._popState();
		    };
		    WebGLRenderer.prototype.translate = function (x, y) {
		        this.currentState().transformer.translate(x, y);
		    };
		    WebGLRenderer.prototype.transform = function (matrix) {
		        this.currentState().transformer.transform(matrix);
		    };
		    WebGLRenderer.prototype.opacity = function (opacity) {
		        this.currentState().globalAlpha *= opacity;
		    };
		    WebGLRenderer.prototype.setCompositeOperation = function (operation) {
		        this.currentState().globalCompositeOperation = operation;
		    };
		    WebGLRenderer.prototype.currentState = function () {
		        return this._stateStack[this._stateStackPointer];
		    };
		    WebGLRenderer.prototype.fillRect = function (x, y, width, height, cssColor) {
		        this._shared.draw(this.currentState(), this._shared.getFillRectSurfaceTexture(), 0, 0, width, height, x, y, WebGLColor_1.WebGLColor.get(cssColor));
		    };
		    WebGLRenderer.prototype.drawSprites = function (surface, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, count) {
		        for (var i = 0; i < count; ++i) {
		            this.drawImage(surface, offsetX[i], offsetY[i], width[i], height[i], canvasOffsetX[i], canvasOffsetY[i]);
		        }
		    };
		    WebGLRenderer.prototype.drawImage = function (surface, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY) {
		        if (!surface._drawable) {
		            throw new Error("WebGLRenderer#drawImage: no drawable surface.");
		        }
		        // WebGLTexture でないなら変換する (HTMLVideoElement は対応しない)
		        // NOTE: 対象の surface が動画の場合、独立した framebuffer に描画した方がパフォーマンス上優位になり得る
		        if (!(surface._drawable.texture instanceof WebGLTexture)) {
		            this._shared.makeTextureForSurface(surface);
		        }
		        if (!surface._drawable.texture) {
		            throw new Error("WebGLRenderer#drawImage: could not create a texture.");
		        }
		        this._shared.draw(this.currentState(), surface._drawable, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, this._whiteColor);
		    };
		    WebGLRenderer.prototype.setTransform = function (matrix) {
		        this.currentState().transformer.setTransform(matrix);
		    };
		    WebGLRenderer.prototype.setOpacity = function (opacity) {
		        this.currentState().globalAlpha = opacity;
		    };
		    WebGLRenderer.prototype.setShaderProgram = function (shaderProgram) {
		        this.currentState().shaderProgram = this._shared.initializeShaderProgram(shaderProgram);
		    };
		    WebGLRenderer.prototype.isSupportedShaderProgram = function () {
		        return true;
		    };
		    WebGLRenderer.prototype.changeViewportSize = function (width, height) {
		        var old = this._renderTarget;
		        this._renderTarget = {
		            width: old.width,
		            height: old.height,
		            viewportWidth: width,
		            viewportHeight: height,
		            texture: old.texture,
		            framebuffer: old.framebuffer
		        };
		    };
		    WebGLRenderer.prototype.getContext = function () {
		        return this._shared.getContext();
		    };
		    WebGLRenderer.prototype.flush = function () {
		        return this._shared.flush();
		    };
		    WebGLRenderer.prototype.destroy = function () {
		        this._shared.requestDeleteRenderTarget(this._renderTarget);
		        this._shared = undefined;
		        this._renderTarget = undefined;
		        this._whiteColor = undefined;
		    };
		    WebGLRenderer.prototype._getImageData = function () {
		        throw new Error("WebGLRenderer#_getImageData() is not implemented");
		    };
		    WebGLRenderer.prototype._putImageData = function (_imageData, _dx, _dy, _dirtyX, _dirtyY, _dirtyWidth, _dirtyHeight) {
		        throw new Error("WebGLRenderer#_putImageData() is not implemented");
		    };
		    WebGLRenderer.prototype._pushState = function () {
		        var old = this.currentState();
		        ++this._stateStackPointer;
		        if (this._isOverCapacity()) {
		            this._reallocation(this._stateStackPointer + 1);
		        }
		        this.currentState().copyFrom(old);
		    };
		    WebGLRenderer.prototype._popState = function () {
		        if (this._stateStackPointer > 0) {
		            this.currentState().shaderProgram = null;
		            --this._stateStackPointer;
		        }
		        else {
		            throw new Error("WebGLRenderer#restore: state stack under-flow.");
		        }
		    };
		    WebGLRenderer.prototype._isOverCapacity = function () {
		        return this._capacity <= this._stateStackPointer;
		    };
		    WebGLRenderer.prototype._reallocation = function (newCapacity) {
		        // 指数的成長ポリシーの再割当:
		        var oldCapacity = this._capacity;
		        if (oldCapacity < newCapacity) {
		            if (newCapacity < (oldCapacity * 2)) {
		                this._capacity *= 2;
		            }
		            else {
		                this._capacity = newCapacity;
		            }
		            for (var i = oldCapacity; i < this._capacity; ++i) {
		                this._stateStack.push(new WebGLRenderingState_1.WebGLRenderingState());
		            }
		        }
		    };
		    WebGLRenderer.DEFAULT_CAPACITY = 16;
		    return WebGLRenderer;
		}());
		WebGLRenderer.WebGLRenderer = WebGLRenderer$1;
		return WebGLRenderer;
	}

	var hasRequiredWebGLBackSurfaceRenderer;

	function requireWebGLBackSurfaceRenderer () {
		if (hasRequiredWebGLBackSurfaceRenderer) return WebGLBackSurfaceRenderer;
		hasRequiredWebGLBackSurfaceRenderer = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(WebGLBackSurfaceRenderer, "__esModule", { value: true });
		WebGLBackSurfaceRenderer.WebGLBackSurfaceRenderer = void 0;
		var WebGLRenderer_1 = requireWebGLRenderer();
		var WebGLRenderingState_1 = requireWebGLRenderingState();
		var WebGLBackSurfaceRenderer$1 = /** @class */ (function (_super) {
		    __extends(WebGLBackSurfaceRenderer, _super);
		    function WebGLBackSurfaceRenderer(surface, shared) {
		        var _this = _super.call(this, shared, shared.createRenderTarget(surface.width, surface.height)) || this;
		        surface._drawable = {
		            texture: _this._renderTarget.texture,
		            textureOffsetX: 0,
		            textureOffsetY: 0,
		            textureWidth: surface.width,
		            textureHeight: surface.height
		        };
		        return _this;
		    }
		    WebGLBackSurfaceRenderer.prototype.begin = function () {
		        _super.prototype.begin.call(this);
		        // Canvas座標系とWebGL座標系の相互変換
		        // height は描画対象の高さを与える
		        this.save();
		        var rs = new WebGLRenderingState_1.WebGLRenderingState(this.currentState());
		        var matrix = rs.transformer.matrix;
		        matrix[1] *= -1;
		        matrix[3] *= -1;
		        matrix[5] = -matrix[5] + this._renderTarget.height;
		        this.currentState().copyFrom(rs);
		        this._shared.pushRenderTarget(this._renderTarget);
		    };
		    WebGLBackSurfaceRenderer.prototype.end = function () {
		        this.restore();
		        this._shared.popRenderTarget();
		        _super.prototype.end.call(this);
		    };
		    return WebGLBackSurfaceRenderer;
		}(WebGLRenderer_1.WebGLRenderer));
		WebGLBackSurfaceRenderer.WebGLBackSurfaceRenderer = WebGLBackSurfaceRenderer$1;
		return WebGLBackSurfaceRenderer;
	}

	var WebGLPrimarySurface = {};

	var WebGLPrimarySurfaceRenderer = {};

	var hasRequiredWebGLPrimarySurfaceRenderer;

	function requireWebGLPrimarySurfaceRenderer () {
		if (hasRequiredWebGLPrimarySurfaceRenderer) return WebGLPrimarySurfaceRenderer;
		hasRequiredWebGLPrimarySurfaceRenderer = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(WebGLPrimarySurfaceRenderer, "__esModule", { value: true });
		WebGLPrimarySurfaceRenderer.WebGLPrimarySurfaceRenderer = void 0;
		var WebGLRenderer_1 = requireWebGLRenderer();
		var WebGLPrimarySurfaceRenderer$1 = /** @class */ (function (_super) {
		    __extends(WebGLPrimarySurfaceRenderer, _super);
		    function WebGLPrimarySurfaceRenderer(shared, renderTarget) {
		        var _this = _super.call(this, shared, renderTarget) || this;
		        _this._shared.pushRenderTarget(_this._renderTarget);
		        return _this;
		    }
		    WebGLPrimarySurfaceRenderer.prototype.begin = function () {
		        _super.prototype.begin.call(this);
		        this._shared.begin();
		    };
		    return WebGLPrimarySurfaceRenderer;
		}(WebGLRenderer_1.WebGLRenderer));
		WebGLPrimarySurfaceRenderer.WebGLPrimarySurfaceRenderer = WebGLPrimarySurfaceRenderer$1;
		return WebGLPrimarySurfaceRenderer;
	}

	var hasRequiredWebGLPrimarySurface;

	function requireWebGLPrimarySurface () {
		if (hasRequiredWebGLPrimarySurface) return WebGLPrimarySurface;
		hasRequiredWebGLPrimarySurface = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(WebGLPrimarySurface, "__esModule", { value: true });
		WebGLPrimarySurface.WebGLPrimarySurface = void 0;
		var CanvasSurface_1 = requireCanvasSurface();
		var WebGLPrimarySurfaceRenderer_1 = requireWebGLPrimarySurfaceRenderer();
		var WebGLPrimarySurface$1 = /** @class */ (function (_super) {
		    __extends(WebGLPrimarySurface, _super);
		    function WebGLPrimarySurface(shared, width, height) {
		        var _this = _super.call(this, width, height) || this;
		        _this.canvas.style.position = "absolute";
		        _this._shared = shared;
		        return _this;
		    }
		    WebGLPrimarySurface.prototype.renderer = function () {
		        if (!this._renderer) {
		            this._renderer = new WebGLPrimarySurfaceRenderer_1.WebGLPrimarySurfaceRenderer(this._shared, this._shared.getPrimaryRenderTarget(this.width, this.height));
		        }
		        return this._renderer;
		    };
		    // override
		    WebGLPrimarySurface.prototype.changePhysicalScale = function (xScale, yScale) {
		        var width = Math.ceil(this.width * xScale);
		        var height = Math.ceil(this.height * yScale);
		        this.canvas.width = width;
		        this.canvas.height = height;
		        this.renderer().changeViewportSize(width, height);
		    };
		    WebGLPrimarySurface.prototype.isPlaying = function () {
		        return false;
		    };
		    return WebGLPrimarySurface;
		}(CanvasSurface_1.CanvasSurface));
		WebGLPrimarySurface.WebGLPrimarySurface = WebGLPrimarySurface$1;
		return WebGLPrimarySurface;
	}

	var hasRequiredWebGLBackSurface;

	function requireWebGLBackSurface () {
		if (hasRequiredWebGLBackSurface) return WebGLBackSurface;
		hasRequiredWebGLBackSurface = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(WebGLBackSurface, "__esModule", { value: true });
		WebGLBackSurface.WebGLBackSurface = void 0;
		var WebGLBackSurfaceRenderer_1 = requireWebGLBackSurfaceRenderer();
		var WebGLPrimarySurface_1 = requireWebGLPrimarySurface();
		var WebGLBackSurface$1 = /** @class */ (function (_super) {
		    __extends(WebGLBackSurface, _super);
		    function WebGLBackSurface() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    // override
		    WebGLBackSurface.prototype.renderer = function () {
		        if (!this._renderer) {
		            this._renderer = new WebGLBackSurfaceRenderer_1.WebGLBackSurfaceRenderer(this, this._shared);
		        }
		        return this._renderer;
		    };
		    WebGLBackSurface.prototype.destroy = function () {
		        if (this._renderer) {
		            this._renderer.destroy();
		        }
		        this._renderer = undefined;
		        this._drawable = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return WebGLBackSurface;
		}(WebGLPrimarySurface_1.WebGLPrimarySurface));
		WebGLBackSurface.WebGLBackSurface = WebGLBackSurface$1;
		return WebGLBackSurface;
	}

	var WebGLShaderProgram = {};

	var hasRequiredWebGLShaderProgram;

	function requireWebGLShaderProgram () {
		if (hasRequiredWebGLShaderProgram) return WebGLShaderProgram;
		hasRequiredWebGLShaderProgram = 1;
		Object.defineProperty(WebGLShaderProgram, "__esModule", { value: true });
		WebGLShaderProgram.WebGLShaderProgram = void 0;
		var WebGLShaderProgram$1 = /** @class */ (function () {
		    function WebGLShaderProgram(context, fSrc, uniforms) {
		        if (uniforms === void 0) { uniforms = Object.create(null); }
		        var vSrc = WebGLShaderProgram._DEFAULT_VERTEX_SHADER;
		        fSrc = fSrc || WebGLShaderProgram._DEFAULT_FRAGMENT_SHADER;
		        var program = WebGLShaderProgram._makeShaderProgram(context, vSrc, fSrc);
		        this.program = program;
		        this._context = context;
		        this._aVertex = context.getAttribLocation(this.program, "aVertex");
		        var uColor = context.getUniformLocation(this.program, "uColor");
		        if (!uColor) {
		            throw new Error("WebGLShaderProgram#constructor: could not get UniformLocation of 'uColor'");
		        }
		        var uAlpha = context.getUniformLocation(this.program, "uAlpha");
		        if (!uAlpha) {
		            throw new Error("WebGLShaderProgram#constructor: could not get UniformLocation of 'uAlpha'");
		        }
		        var uSampler = context.getUniformLocation(this.program, "uSampler");
		        if (!uSampler) {
		            throw new Error("WebGLShaderProgram#constructor: could not get UniformLocation of 'uSampler'");
		        }
		        this._uColor = uColor;
		        this._uAlpha = uAlpha;
		        this._uSampler = uSampler;
		        this._uniforms = uniforms;
		        this._uniformCaches = [];
		        this._uniformSetterTable = {
		            "float": this._uniform1f.bind(this),
		            "int": this._uniform1i.bind(this),
		            "float_v": this._uniform1fv.bind(this),
		            "int_v": this._uniform1iv.bind(this),
		            "vec2": this._uniform2fv.bind(this),
		            "vec3": this._uniform3fv.bind(this),
		            "vec4": this._uniform4fv.bind(this),
		            "ivec2": this._uniform2iv.bind(this),
		            "ivec3": this._uniform3iv.bind(this),
		            "ivec4": this._uniform4iv.bind(this),
		            "mat2": this._uniformMatrix2fv.bind(this),
		            "mat3": this._uniformMatrix3fv.bind(this),
		            "mat4": this._uniformMatrix4fv.bind(this)
		        };
		    }
		    WebGLShaderProgram._makeShader = function (gl, typ, src) {
		        var shader = gl.createShader(typ);
		        if (!shader) {
		            throw new Error("WebGLShaderProgram._makeShader(): WebGLShader could not initialize");
		        }
		        gl.shaderSource(shader, src);
		        gl.compileShader(shader);
		        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		            var msg = gl.getShaderInfoLog(shader);
		            gl.deleteShader(shader);
		            throw new Error(msg !== null && msg !== void 0 ? msg : "WebGLShaderProgram._makeShader(): unknown gl error");
		        }
		        return shader;
		    };
		    WebGLShaderProgram._makeShaderProgram = function (gl, vSrc, fSrc) {
		        var program = gl.createProgram();
		        if (!program) {
		            throw new Error("WebGLShaderProgram._makeShaderProgram(): WebGLProgram could not initialize");
		        }
		        var vShader = WebGLShaderProgram._makeShader(gl, gl.VERTEX_SHADER, vSrc);
		        gl.attachShader(program, vShader);
		        gl.deleteShader(vShader);
		        var fShader = WebGLShaderProgram._makeShader(gl, gl.FRAGMENT_SHADER, fSrc);
		        gl.attachShader(program, fShader);
		        gl.deleteShader(fShader);
		        gl.linkProgram(program);
		        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		            var msg = gl.getProgramInfoLog(program);
		            gl.deleteProgram(program);
		            throw new Error(msg !== null && msg !== void 0 ? msg : "WebGLShaderProgram._makeShaderProgram(): unknown gl error");
		        }
		        return program;
		    };
		    /**
		     * シェーダの attribute 変数 aVertex にバッファを登録する。
		     * use()/unuse() 間のみで効果がある。
		     */
		    WebGLShaderProgram.prototype.set_aVertex = function (buffer) {
		        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
		        this._context.enableVertexAttribArray(this._aVertex);
		        this._context.vertexAttribPointer(this._aVertex, 4, this._context.FLOAT, false, 0, 0);
		    };
		    /**
		     * シェーダの uniform 変数 uColor に値を設定する。
		     * use()/unuse() 間のみで効果がある。
		     */
		    WebGLShaderProgram.prototype.set_uColor = function (rgba) {
		        this._context.uniform4f(this._uColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		    };
		    /**
		     * シェーダの uniform 変数 uAlpha に値を設定する。
		     * use()/unuse() 間のみで効果がある。
		     */
		    WebGLShaderProgram.prototype.set_uAlpha = function (alpha) {
		        this._context.uniform1f(this._uAlpha, alpha);
		    };
		    /**
		     * シェーダの uniform 変数 uSampler にテクスチャステージ番号を設定する。
		     * use()/unuse() 間のみで効果がある。
		     */
		    WebGLShaderProgram.prototype.set_uSampler = function (value) {
		        this._context.uniform1i(this._uSampler, value);
		    };
		    /**
		     * ユーザ定義された uniform 値を更新する。
		     * use()/unuse() 間のみで効果がある。
		     */
		    WebGLShaderProgram.prototype.updateUniforms = function () {
		        for (var i = 0; i < this._uniformCaches.length; ++i) {
		            var cache = this._uniformCaches[i];
		            var value = this._uniforms[cache.name].value;
		            if (!cache.isArray && value === cache.beforeValue)
		                continue;
		            cache.update(cache.loc, value);
		            cache.beforeValue = value;
		        }
		    };
		    /**
		     * ユーザ定義されたシェーダの uniform 変数を初期化する。
		     */
		    WebGLShaderProgram.prototype.initializeUniforms = function () {
		        var _this = this;
		        var uniformCaches = [];
		        var uniforms = this._uniforms;
		        if (uniforms != null) {
		            Object.keys(uniforms).forEach(function (k) {
		                var type = uniforms[k].type;
		                var isArray = !(typeof uniforms[k].value === "number");
		                // typeがfloatまたはintで、valueが配列であれば配列としてuniform値を転送する。
		                if (isArray && (type === "int" || type === "float")) {
		                    type += "_v";
		                }
		                var update = _this._uniformSetterTable[type];
		                if (!update) {
		                    throw new Error("WebGLShaderProgram#initializeUniforms: Uniform type '".concat(type, "' is not supported."));
		                }
		                var loc = _this._context.getUniformLocation(_this.program, k);
		                if (!loc) {
		                    throw new Error("WebGLShaderProgram#initializeUniforms: could not get UniformLocation of '".concat(k, "'."));
		                }
		                uniformCaches.push({
		                    name: k,
		                    update: update,
		                    beforeValue: null,
		                    isArray: isArray,
		                    loc: loc
		                });
		            });
		        }
		        this._uniformCaches = uniformCaches;
		    };
		    /**
		     * シェーダを有効化する。
		     */
		    WebGLShaderProgram.prototype.use = function () {
		        this._context.useProgram(this.program);
		    };
		    /**
		     * シェーダを無効化する。
		     */
		    WebGLShaderProgram.prototype.unuse = function () {
		        this._context.useProgram(null);
		    };
		    WebGLShaderProgram.prototype.destroy = function () {
		        this._context.deleteProgram(this.program);
		    };
		    WebGLShaderProgram.prototype._uniform1f = function (loc, v) {
		        this._context.uniform1f(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform1i = function (loc, v) {
		        this._context.uniform1i(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform1fv = function (loc, v) {
		        this._context.uniform1fv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform1iv = function (loc, v) {
		        this._context.uniform1iv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform2fv = function (loc, v) {
		        this._context.uniform2fv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform3fv = function (loc, v) {
		        this._context.uniform3fv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform4fv = function (loc, v) {
		        this._context.uniform4fv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform2iv = function (loc, v) {
		        this._context.uniform2iv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform3iv = function (loc, v) {
		        this._context.uniform3iv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniform4iv = function (loc, v) {
		        this._context.uniform4iv(loc, v);
		    };
		    WebGLShaderProgram.prototype._uniformMatrix2fv = function (loc, v) {
		        this._context.uniformMatrix2fv(loc, false, v);
		    };
		    WebGLShaderProgram.prototype._uniformMatrix3fv = function (loc, v) {
		        this._context.uniformMatrix3fv(loc, false, v);
		    };
		    WebGLShaderProgram.prototype._uniformMatrix4fv = function (loc, v) {
		        this._context.uniformMatrix4fv(loc, false, v);
		    };
		    /* eslint-disable  @typescript-eslint/indent */
		    WebGLShaderProgram._DEFAULT_VERTEX_SHADER = "#version 100\n" +
		        "precision mediump float;\n" +
		        "attribute vec4 aVertex;\n" +
		        "varying vec2 vTexCoord;\n" +
		        "varying vec4 vColor;\n" +
		        "uniform vec4 uColor;\n" +
		        "uniform float uAlpha;\n" +
		        "void main() {" +
		        "    gl_Position = vec4(aVertex.xy, 0.0, 1.0);" +
		        "    vTexCoord = aVertex.zw;" +
		        "    vColor = uColor * uAlpha;" +
		        "}";
		    WebGLShaderProgram._DEFAULT_FRAGMENT_SHADER = "#version 100\n" +
		        "precision mediump float;\n" +
		        "varying vec2 vTexCoord;\n" +
		        "varying vec4 vColor;\n" +
		        "uniform sampler2D uSampler;\n" +
		        "void main() {" +
		        "    gl_FragColor = texture2D(uSampler, vTexCoord) * vColor;" +
		        "}";
		    return WebGLShaderProgram;
		}());
		WebGLShaderProgram.WebGLShaderProgram = WebGLShaderProgram$1;
		return WebGLShaderProgram;
	}

	var WebGLTextureAtlas = {};

	var WebGLTextureMap = {};

	var hasRequiredWebGLTextureMap;

	function requireWebGLTextureMap () {
		if (hasRequiredWebGLTextureMap) return WebGLTextureMap;
		hasRequiredWebGLTextureMap = 1;
		Object.defineProperty(WebGLTextureMap, "__esModule", { value: true });
		WebGLTextureMap.WebGLTextureMap = void 0;
		var WebGLTextureMap$1 = /** @class */ (function () {
		    function WebGLTextureMap(texture, offsetX, offsetY, width, height) {
		        this._left = null;
		        this._right = null;
		        this._surface = null;
		        this.texture = texture;
		        this.offsetX = offsetX;
		        this.offsetY = offsetY;
		        this._width = width;
		        this._height = height;
		    }
		    WebGLTextureMap.prototype.dispose = function () {
		        if (this._left) {
		            this._left.dispose();
		            this._left = null;
		        }
		        if (this._right) {
		            this._right.dispose();
		            this._right = null;
		        }
		        if (this._surface) {
		            if (this._surface._drawable) {
		                this._surface._drawable.texture = null;
		            }
		            this._surface = null;
		        }
		    };
		    WebGLTextureMap.prototype.capacity = function () {
		        return this._width * this._height;
		    };
		    WebGLTextureMap.prototype.area = function () {
		        if (!this._surface) {
		            return 0;
		        }
		        var image = this._surface._drawable;
		        var a = image.width * image.height;
		        if (this._left) {
		            a += this._left.area();
		        }
		        if (this._right) {
		            a += this._right.area();
		        }
		        return a;
		    };
		    WebGLTextureMap.prototype.occupancy = function () {
		        return this.area() / this.capacity();
		    };
		    WebGLTextureMap.prototype.insert = function (surface) {
		        var image = surface._drawable;
		        // マージンを考慮した領域を確保
		        var width = image.width + WebGLTextureMap.TEXTURE_MARGIN;
		        var height = image.height + WebGLTextureMap.TEXTURE_MARGIN;
		        // 再帰的にパッキング
		        if (this._surface) {
		            if (this._left) {
		                var left = this._left.insert(surface);
		                if (left) {
		                    return left;
		                }
		            }
		            if (this._right) {
		                var right = this._right.insert(surface);
		                if (right) {
		                    return right;
		                }
		            }
		            return null;
		        }
		        // 詰め込み不可能
		        if ((this._width < width) || (this._height < height)) {
		            return null;
		        }
		        var remainWidth = this._width - width;
		        var remainHeight = this._height - height;
		        if (remainWidth <= remainHeight) {
		            this._left = new WebGLTextureMap(this.texture, this.offsetX + width, this.offsetY, remainWidth, height);
		            this._right = new WebGLTextureMap(this.texture, this.offsetX, this.offsetY + height, this._width, remainHeight);
		        }
		        else {
		            this._left = new WebGLTextureMap(this.texture, this.offsetX, this.offsetY + height, width, remainHeight);
		            this._right = new WebGLTextureMap(this.texture, this.offsetX + width, this.offsetY, remainWidth, this._height);
		        }
		        this._surface = surface;
		        return this;
		    };
		    // 各テクスチャを配置する際のマージンピクセル数
		    // マージンを取らないと、隣接するテクスチャが滲んで描画される可能性がある。
		    WebGLTextureMap.TEXTURE_MARGIN = 1;
		    return WebGLTextureMap;
		}());
		WebGLTextureMap.WebGLTextureMap = WebGLTextureMap$1;
		return WebGLTextureMap;
	}

	var hasRequiredWebGLTextureAtlas;

	function requireWebGLTextureAtlas () {
		if (hasRequiredWebGLTextureAtlas) return WebGLTextureAtlas;
		hasRequiredWebGLTextureAtlas = 1;
		Object.defineProperty(WebGLTextureAtlas, "__esModule", { value: true });
		WebGLTextureAtlas.WebGLTextureAtlas = void 0;
		var RenderingHelper_1 = requireRenderingHelper();
		var WebGLTextureMap_1 = requireWebGLTextureMap();
		var WebGLTextureAtlas$1 = /** @class */ (function () {
		    function WebGLTextureAtlas() {
		        this._maps = [];
		        this._insertPos = 0;
		        this.emptyTexturePixels = new Uint8Array(WebGLTextureAtlas.TEXTURE_SIZE * WebGLTextureAtlas.TEXTURE_SIZE * 4);
		    }
		    /**
		     * 新しいシーンに遷移したとき呼ぶ。
		     */
		    WebGLTextureAtlas.prototype.clear = function () {
		        for (var i = 0; i < this._maps.length; ++i) {
		            this._maps[i].dispose();
		        }
		    };
		    /**
		     * 現在のテクスチャ領域使用効率を表示する。
		     */
		    WebGLTextureAtlas.prototype.showOccupancy = function () {
		        for (var i = 0; i < this._maps.length; ++i) {
		            console.log("occupancy[" + i + "]: " + this._maps[i].occupancy());
		        }
		    };
		    /**
		     * pdi.Surface 用にテクスチャを作成する。
		     */
		    WebGLTextureAtlas.prototype.makeTextureForSurface = function (shared, surface) {
		        var image = surface._drawable;
		        if (!image || image.texture) {
		            return;
		        }
		        var width = image.width;
		        var height = image.height;
		        // サイズが大きいので単体のテクスチャとして扱う
		        if ((width >= WebGLTextureAtlas.TEXTURE_SIZE) || (height >= WebGLTextureAtlas.TEXTURE_SIZE)) {
		            // 画像サイズが 2^n でないときはリサイズする
		            var w = RenderingHelper_1.RenderingHelper.toPowerOfTwo(image.width);
		            var h = RenderingHelper_1.RenderingHelper.toPowerOfTwo(image.height);
		            if ((w !== image.width) || (h !== image.height)) {
		                var canvas = document.createElement("canvas");
		                canvas.width = w;
		                canvas.height = h;
		                var canvasContext = canvas.getContext("2d");
		                if (!canvasContext) {
		                    throw new Error("WebGLTextureAtlas#makeTextureForSurface(): could not initialize CanvasRenderingContext2D");
		                }
		                canvasContext.globalCompositeOperation = "copy";
		                canvasContext.drawImage(image, 0, 0);
		                image = canvasContext.getImageData(0, 0, w, h);
		            }
		            surface._drawable.texture = shared.makeTexture(image);
		            surface._drawable.textureOffsetX = 0;
		            surface._drawable.textureOffsetY = 0;
		            surface._drawable.textureWidth = w;
		            surface._drawable.textureHeight = h;
		            return;
		        }
		        this._assign(shared, surface, this._maps);
		    };
		    /**
		     * 適当なテクスチャアトラスにサーフィスを割り当てる
		     */
		    WebGLTextureAtlas.prototype._assign = function (shared, surface, maps) {
		        // テクスチャアトラスに割り当てる
		        var map = null;
		        for (var i = 0; i < maps.length; ++i) {
		            map = maps[(i + this._insertPos) % maps.length].insert(surface);
		            if (map) {
		                // 登録する
		                this._register(shared, map, surface._drawable);
		                this._insertPos = i;
		                return;
		            }
		        }
		        map = null;
		        // テクスチャ容量があふれるので古いやつを消して再利用する
		        if (maps.length >= WebGLTextureAtlas.TEXTURE_COUNT) {
		            map = maps.shift();
		            shared.disposeTexture(map.texture);
		            map.dispose();
		            shared.clearTexture(this.emptyTexturePixels, WebGLTextureAtlas.TEXTURE_SIZE, WebGLTextureAtlas.TEXTURE_SIZE, map.texture);
		        }
		        // 再利用できない場合は、新規生成する
		        if (!map) {
		            map = new WebGLTextureMap_1.WebGLTextureMap(shared.makeTextureRaw(WebGLTextureAtlas.TEXTURE_SIZE, WebGLTextureAtlas.TEXTURE_SIZE), 0, 0, WebGLTextureAtlas.TEXTURE_SIZE, WebGLTextureAtlas.TEXTURE_SIZE);
		        }
		        // 登録する
		        maps.push(map);
		        map = map.insert(surface); // NOTE: 上の条件分岐で必ず insert() できると仮定
		        this._register(shared, map, surface._drawable);
		    };
		    /**
		     * テクスチャを登録する。
		     */
		    WebGLTextureAtlas.prototype._register = function (shared, map, image) {
		        image.texture = map.texture;
		        image.textureOffsetX = map.offsetX;
		        image.textureOffsetY = map.offsetY;
		        image.textureWidth = WebGLTextureAtlas.TEXTURE_SIZE;
		        image.textureHeight = WebGLTextureAtlas.TEXTURE_SIZE;
		        shared.assignTexture(image, map.offsetX, map.offsetY, map.texture);
		    };
		    // 確保するテクスチャのサイズ (実際のゲームに合わせてチューニングする必要がある)
		    WebGLTextureAtlas.TEXTURE_SIZE = 1024;
		    // 確保するテクスチャの数 (実際のゲームに合わせてチューニングする必要がある)
		    WebGLTextureAtlas.TEXTURE_COUNT = 16;
		    return WebGLTextureAtlas;
		}());
		WebGLTextureAtlas.WebGLTextureAtlas = WebGLTextureAtlas$1;
		return WebGLTextureAtlas;
	}

	var hasRequiredWebGLSharedObject;

	function requireWebGLSharedObject () {
		if (hasRequiredWebGLSharedObject) return WebGLSharedObject;
		hasRequiredWebGLSharedObject = 1;
		Object.defineProperty(WebGLSharedObject, "__esModule", { value: true });
		WebGLSharedObject.WebGLSharedObject = void 0;
		var WebGLBackSurface_1 = requireWebGLBackSurface();
		var WebGLPrimarySurface_1 = requireWebGLPrimarySurface();
		var WebGLShaderProgram_1 = requireWebGLShaderProgram();
		var WebGLTextureAtlas_1 = requireWebGLTextureAtlas();
		var WebGLSharedObject$1 = /** @class */ (function () {
		    function WebGLSharedObject(width, height) {
		        this._renderTarget = undefined;
		        this._defaultShaderProgram = undefined;
		        this._textureAtlas = undefined;
		        this._fillRectTexture = undefined;
		        this._fillRectSurfaceTexture = undefined;
		        this._maxSpriteCount = undefined;
		        this._vertices = undefined;
		        this._verticesCache = undefined;
		        this._numSprites = undefined;
		        this._renderTargetStack = undefined;
		        this._currentTexture = undefined;
		        this._currentColor = undefined;
		        this._currentAlpha = undefined;
		        this._currentCompositeOperation = undefined;
		        this._currentShaderProgram = undefined;
		        this._compositeOps = undefined;
		        this._deleteRequestedTargets = undefined;
		        var surface = new WebGLPrimarySurface_1.WebGLPrimarySurface(this, width, height);
		        var context = surface.canvas.getContext("webgl", { depth: false, preserveDrawingBuffer: true });
		        if (!context) {
		            throw new Error("WebGLSharedObject#constructor: could not initialize WebGLRenderingContext");
		        }
		        this._surface = surface;
		        this._context = context;
		        this._init();
		    }
		    WebGLSharedObject.prototype.getFillRectSurfaceTexture = function () {
		        return this._fillRectSurfaceTexture;
		    };
		    WebGLSharedObject.prototype.getPrimarySurface = function () {
		        // NOTE: 一つの WebGLSharedObject は一つの primary surface のみを保持するものとする。
		        return this._surface;
		    };
		    WebGLSharedObject.prototype.createBackSurface = function (width, height) {
		        return new WebGLBackSurface_1.WebGLBackSurface(this, width, height);
		    };
		    WebGLSharedObject.prototype.pushRenderTarget = function (renderTarget) {
		        this._commit();
		        this._renderTargetStack.push(renderTarget);
		        this._context.bindFramebuffer(this._context.FRAMEBUFFER, renderTarget.framebuffer);
		        this._context.viewport(0, 0, renderTarget.viewportWidth, renderTarget.viewportHeight);
		    };
		    WebGLSharedObject.prototype.popRenderTarget = function () {
		        this._commit();
		        this._renderTargetStack.pop();
		        var renderTarget = this.getCurrentRenderTarget();
		        this._context.bindFramebuffer(this._context.FRAMEBUFFER, renderTarget.framebuffer);
		        this._context.viewport(0, 0, renderTarget.viewportWidth, renderTarget.viewportHeight);
		    };
		    WebGLSharedObject.prototype.getCurrentRenderTarget = function () {
		        return this._renderTargetStack[this._renderTargetStack.length - 1];
		    };
		    WebGLSharedObject.prototype.begin = function () {
		        this.clear();
		        this._currentShaderProgram.use();
		        this._currentShaderProgram.set_aVertex(this._vertices);
		        this._currentShaderProgram.set_uColor(this._currentColor);
		        this._currentShaderProgram.set_uAlpha(this._currentAlpha);
		        this._currentShaderProgram.set_uSampler(0);
		        this._currentShaderProgram.updateUniforms();
		    };
		    WebGLSharedObject.prototype.clear = function () {
		        this._context.clear(this._context.COLOR_BUFFER_BIT);
		    };
		    WebGLSharedObject.prototype.draw = function (state, surfaceTexture, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, color) {
		        if (this._numSprites >= this._maxSpriteCount) {
		            this._commit();
		        }
		        var shaderProgram;
		        // fillRectの場合はデフォルトのシェーダを利用
		        if (surfaceTexture === this._fillRectSurfaceTexture || state.shaderProgram == null || state.shaderProgram._program == null) {
		            shaderProgram = this._defaultShaderProgram;
		        }
		        else {
		            shaderProgram = state.shaderProgram._program;
		        }
		        // シェーダプログラムを設定
		        if (this._currentShaderProgram !== shaderProgram) {
		            this._commit();
		            this._currentShaderProgram = shaderProgram;
		            this._currentShaderProgram.use();
		            this._currentShaderProgram.updateUniforms();
		            // シェーダプログラム変更時は全ての設定をクリア
		            this._currentCompositeOperation = null;
		            this._currentAlpha = null; // TODO: 型定義の見直し
		            this._currentColor = [];
		            this._currentTexture = null;
		        }
		        // テクスチャを設定
		        if (this._currentTexture !== surfaceTexture.texture) {
		            this._currentTexture = surfaceTexture.texture;
		            this._commit();
		            this._context.bindTexture(this._context.TEXTURE_2D, surfaceTexture.texture);
		        }
		        // 色を設定
		        if (this._currentColor[0] !== color[0] ||
		            this._currentColor[1] !== color[1] ||
		            this._currentColor[2] !== color[2] ||
		            this._currentColor[3] !== color[3]) {
		            this._currentColor = color;
		            this._commit();
		            this._currentShaderProgram.set_uColor(color);
		        }
		        // アルファを指定
		        if (this._currentAlpha !== state.globalAlpha) {
		            this._currentAlpha = state.globalAlpha;
		            this._commit();
		            this._currentShaderProgram.set_uAlpha(state.globalAlpha);
		        }
		        // 合成モードを設定
		        if (this._currentCompositeOperation !== state.globalCompositeOperation) {
		            this._currentCompositeOperation = state.globalCompositeOperation;
		            this._commit();
		            var compositeOperation = this._compositeOps[this._currentCompositeOperation];
		            this._context.blendFunc(compositeOperation[0], compositeOperation[1]);
		        }
		        var tw = 1.0 / surfaceTexture.textureWidth;
		        var th = 1.0 / surfaceTexture.textureHeight;
		        var ox = surfaceTexture.textureOffsetX;
		        var oy = surfaceTexture.textureOffsetY;
		        var s = tw * (ox + offsetX + width);
		        var t = th * (oy + offsetY + height);
		        var u = tw * (ox + offsetX);
		        var v = th * (oy + offsetY);
		        // 変換行列を設定
		        this._register(this._transformVertex(canvasOffsetX, canvasOffsetY, width, height, state.transformer), [u, v, s, v, s, t, u, v, s, t, u, t]);
		    };
		    WebGLSharedObject.prototype.end = function () {
		        this._commit();
		        if (this._deleteRequestedTargets.length > 0) {
		            for (var i = 0; i < this._deleteRequestedTargets.length; ++i) {
		                this.deleteRenderTarget(this._deleteRequestedTargets[i]);
		            }
		            this._deleteRequestedTargets = [];
		        }
		    };
		    WebGLSharedObject.prototype.makeTextureForSurface = function (surface) {
		        this._textureAtlas.makeTextureForSurface(this, surface);
		    };
		    WebGLSharedObject.prototype.disposeTexture = function (texture) {
		        if (this._currentTexture === texture) {
		            this._commit();
		        }
		    };
		    /**
		     * image を GPU 上のテクスチャメモリ領域にコピーする.
		     */
		    WebGLSharedObject.prototype.assignTexture = function (image, x, y, texture) {
		        this._context.bindTexture(this._context.TEXTURE_2D, texture);
		        if (image instanceof HTMLVideoElement) {
		            throw new Error("WebGLRenderer#assignTexture: HTMLVideoElement is not supported.");
		        }
		        this._context.texSubImage2D(this._context.TEXTURE_2D, 0, x, y, this._context.RGBA, this._context.UNSIGNED_BYTE, image);
		        this._context.bindTexture(this._context.TEXTURE_2D, this._currentTexture);
		    };
		    /**
		     * GPU 上のテクスチャメモリ領域を texturePixels でクリアする.
		     *
		     * NOTE: 本来はGPUデバイス上で領域をクリアすることが望ましく、ホストから都度領域を転送する texSubImage2D() は適当でない。
		     * FBOをTextureにバインドさせる方式などを考慮すべきである。
		     * ただし、以下の2点より本操作の最適化を見送っている。
		     * - 処理速度上最良のケースは本操作の呼び出しを行わないことである
		     * - 本操作の呼び出し頻度がWebGLTextureAtlas#TEXTURE_SIZEやWebGLTextureAtlas#TEXTURE_COUNTの値に依存するため、
		     *   そちらをチューニングする方が優先度が高い
		     */
		    WebGLSharedObject.prototype.clearTexture = function (texturePixels, width, height, texture) {
		        this._context.bindTexture(this._context.TEXTURE_2D, texture);
		        this._context.texSubImage2D(this._context.TEXTURE_2D, 0, 0, 0, width, height, this._context.RGBA, this._context.UNSIGNED_BYTE, texturePixels);
		        this._context.bindTexture(this._context.TEXTURE_2D, this._currentTexture);
		    };
		    WebGLSharedObject.prototype.makeTextureRaw = function (width, height, pixels) {
		        if (pixels === void 0) { pixels = null; }
		        var texture = this._context.createTexture();
		        if (!texture) {
		            throw new Error("WebGLSharedObject#makeTextureRaw(): could not create WebGLTexture");
		        }
		        this._context.bindTexture(this._context.TEXTURE_2D, texture);
		        this._context.pixelStorei(this._context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_S, this._context.CLAMP_TO_EDGE);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_T, this._context.CLAMP_TO_EDGE);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_MAG_FILTER, this._context.NEAREST);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_MIN_FILTER, this._context.NEAREST);
		        this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, width, height, 0, this._context.RGBA, this._context.UNSIGNED_BYTE, pixels);
		        this._context.bindTexture(this._context.TEXTURE_2D, this._currentTexture);
		        return texture;
		    };
		    WebGLSharedObject.prototype.makeTexture = function (data) {
		        var texture = this._context.createTexture();
		        if (!texture) {
		            throw new Error("WebGLSharedObject#makeTexture(): could not create WebGLTexture");
		        }
		        this._context.bindTexture(this._context.TEXTURE_2D, texture);
		        this._context.pixelStorei(this._context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_S, this._context.CLAMP_TO_EDGE);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_T, this._context.CLAMP_TO_EDGE);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_MAG_FILTER, this._context.NEAREST);
		        this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_MIN_FILTER, this._context.NEAREST);
		        if (data instanceof HTMLImageElement) {
		            this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, data);
		        }
		        else if (data instanceof HTMLCanvasElement) {
		            this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, data);
		        }
		        else if (data instanceof ImageData) {
		            this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, data);
		        }
		        this._context.bindTexture(this._context.TEXTURE_2D, this._currentTexture);
		        return texture;
		    };
		    WebGLSharedObject.prototype.getPrimaryRenderTarget = function (_width, _height) {
		        return this._renderTarget;
		    };
		    WebGLSharedObject.prototype.createRenderTarget = function (width, height) {
		        var context = this._context;
		        var framebuffer = context.createFramebuffer();
		        context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
		        var texture = context.createTexture();
		        context.bindTexture(context.TEXTURE_2D, texture);
		        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
		        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
		        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
		        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
		        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, width, height, 0, context.RGBA, context.UNSIGNED_BYTE, null);
		        context.framebufferTexture2D(context.FRAMEBUFFER, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, texture, 0);
		        context.bindTexture(context.TEXTURE_2D, this._currentTexture);
		        var renderTaget = this.getCurrentRenderTarget();
		        context.bindFramebuffer(context.FRAMEBUFFER, renderTaget.framebuffer);
		        return {
		            width: width,
		            height: height,
		            viewportWidth: width,
		            viewportHeight: height,
		            framebuffer: framebuffer,
		            texture: texture
		        };
		    };
		    WebGLSharedObject.prototype.requestDeleteRenderTarget = function (renderTaget) {
		        this._deleteRequestedTargets.push(renderTaget);
		    };
		    WebGLSharedObject.prototype.deleteRenderTarget = function (renderTaget) {
		        var context = this._context;
		        if (this.getCurrentRenderTarget() === renderTaget) {
		            this._commit();
		        }
		        context.deleteFramebuffer(renderTaget.framebuffer);
		        context.deleteTexture(renderTaget.texture);
		    };
		    WebGLSharedObject.prototype.getContext = function () {
		        return this._context;
		    };
		    WebGLSharedObject.prototype.getDefaultShaderProgram = function () {
		        return this._defaultShaderProgram;
		    };
		    WebGLSharedObject.prototype.initializeShaderProgram = function (shaderProgram) {
		        if (shaderProgram) {
		            if (!shaderProgram._program) {
		                var program = new WebGLShaderProgram_1.WebGLShaderProgram(this._context, shaderProgram.fragmentShader, shaderProgram.uniforms);
		                program.initializeUniforms();
		                shaderProgram._program = program;
		            }
		        }
		        return shaderProgram;
		    };
		    WebGLSharedObject.prototype.flush = function () {
		        this._commit();
		    };
		    WebGLSharedObject.prototype._init = function () {
		        var program = new WebGLShaderProgram_1.WebGLShaderProgram(this._context);
		        // 描画用リソース
		        this._textureAtlas = new WebGLTextureAtlas_1.WebGLTextureAtlas();
		        this._fillRectTexture = this.makeTextureRaw(1, 1, new Uint8Array([255, 255, 255, 255]));
		        this._fillRectSurfaceTexture = {
		            texture: this._fillRectTexture,
		            textureWidth: 1,
		            textureHeight: 1,
		            textureOffsetX: 0,
		            textureOffsetY: 0
		        };
		        this._renderTarget = {
		            width: this._surface.width,
		            height: this._surface.height,
		            viewportWidth: this._surface.width,
		            viewportHeight: this._surface.height,
		            framebuffer: null,
		            texture: null
		        };
		        // 描画命令をため込んでおくバッファ
		        this._maxSpriteCount = 1024;
		        this._vertices = this._makeBuffer(this._maxSpriteCount * 24 * 4);
		        this._verticesCache = new Float32Array(this._maxSpriteCount * 24);
		        this._numSprites = 0; // the number of sprites
		        this._currentTexture = null;
		        this._currentColor = [1.0, 1.0, 1.0, 1.0];
		        this._currentAlpha = 1.0;
		        this._currentCompositeOperation = "source-over";
		        this._currentShaderProgram = program;
		        this._defaultShaderProgram = program;
		        this._renderTargetStack = [];
		        this._deleteRequestedTargets = [];
		        // シェーダの設定
		        this._currentShaderProgram.use();
		        try {
		            this._currentShaderProgram.set_aVertex(this._vertices);
		            this._currentShaderProgram.set_uColor(this._currentColor);
		            this._currentShaderProgram.set_uAlpha(this._currentAlpha);
		            this._currentShaderProgram.set_uSampler(0);
		        }
		        finally {
		            this._currentShaderProgram.unuse();
		        }
		        // WebGL のパラメータを設定
		        this._context.enable(this._context.BLEND);
		        this._context.activeTexture(this._context.TEXTURE0);
		        this._context.bindTexture(this._context.TEXTURE_2D, this._fillRectTexture);
		        this._compositeOps = {
		            "source-atop": [this._context.DST_ALPHA, this._context.ONE_MINUS_SRC_ALPHA],
		            "experimental-source-in": [this._context.DST_ALPHA, this._context.ZERO],
		            "experimental-source-out": [this._context.ONE_MINUS_DST_ALPHA, this._context.ZERO],
		            "source-over": [this._context.ONE, this._context.ONE_MINUS_SRC_ALPHA],
		            "experimental-destination-atop": [this._context.ONE_MINUS_DST_ALPHA, this._context.SRC_ALPHA],
		            "experimental-destination-in": [this._context.ZERO, this._context.SRC_ALPHA],
		            "destination-out": [this._context.ZERO, this._context.ONE_MINUS_SRC_ALPHA],
		            "destination-over": [this._context.ONE_MINUS_DST_ALPHA, this._context.ONE],
		            "lighter": [this._context.ONE, this._context.ONE],
		            "copy": [this._context.ONE, this._context.ZERO],
		            "xor": [this._context.ONE_MINUS_DST_ALPHA, this._context.ONE_MINUS_SRC_ALPHA],
		            // difference と saturation は WebGL での描画に対応していないため、source-over と同等の値にする
		            "difference": [this._context.ONE, this._context.ONE_MINUS_SRC_ALPHA],
		            "saturation": [this._context.ONE, this._context.ONE_MINUS_SRC_ALPHA],
		        };
		        var compositeOperation = this._compositeOps[this._currentCompositeOperation];
		        this._context.blendFunc(compositeOperation[0], compositeOperation[1]);
		    };
		    WebGLSharedObject.prototype._makeBuffer = function (data) {
		        var buffer = this._context.createBuffer();
		        if (!buffer) {
		            throw new Error("WebGLSharedObject#_makeBuffer(): could not create WebGLBuffer");
		        }
		        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
		        this._context.bufferData(this._context.ARRAY_BUFFER, data, this._context.DYNAMIC_DRAW);
		        return buffer;
		    };
		    WebGLSharedObject.prototype._transformVertex = function (x, y, w, h, transformer) {
		        var renderTaget = this.getCurrentRenderTarget();
		        var cw = 2.0 / renderTaget.width;
		        var ch = -2.0 / renderTaget.height;
		        var m = transformer.matrix;
		        var a = cw * w * m[0];
		        var b = ch * w * m[1];
		        var c = cw * h * m[2];
		        var d = ch * h * m[3];
		        var e = cw * (x * m[0] + y * m[2] + m[4]) - 1.0;
		        var f = ch * (x * m[1] + y * m[3] + m[5]) + 1.0;
		        return [
		            e, f, a + e, b + f, a + c + e, b + d + f,
		            e, f, a + c + e, b + d + f, c + e, d + f
		        ];
		    };
		    WebGLSharedObject.prototype._register = function (vertex, texCoord) {
		        var offset = this._numSprites * 6;
		        ++this._numSprites;
		        for (var i = 0; i < 6; ++i) {
		            this._verticesCache[4 * (i + offset) + 0] = vertex[2 * i + 0];
		            this._verticesCache[4 * (i + offset) + 1] = vertex[2 * i + 1];
		            this._verticesCache[4 * (i + offset) + 2] = texCoord[2 * i + 0];
		            this._verticesCache[4 * (i + offset) + 3] = texCoord[2 * i + 1];
		        }
		    };
		    WebGLSharedObject.prototype._commit = function () {
		        if (this._numSprites > 0) {
		            this._context.bindBuffer(this._context.ARRAY_BUFFER, this._vertices);
		            this._context.bufferSubData(this._context.ARRAY_BUFFER, 0, this._verticesCache.subarray(0, this._numSprites * 24));
		            this._context.drawArrays(this._context.TRIANGLES, 0, this._numSprites * 6);
		            this._numSprites = 0;
		        }
		    };
		    return WebGLSharedObject;
		}());
		WebGLSharedObject.WebGLSharedObject = WebGLSharedObject$1;
		return WebGLSharedObject;
	}

	var CanvasDisposer = {};

	var hasRequiredCanvasDisposer;

	function requireCanvasDisposer () {
		if (hasRequiredCanvasDisposer) return CanvasDisposer;
		hasRequiredCanvasDisposer = 1;
		Object.defineProperty(CanvasDisposer, "__esModule", { value: true });
		CanvasDisposer.CanvasDisposer = void 0;
		var CanvasDisposer$1 = /** @class */ (function () {
		    function CanvasDisposer() {
		        this._idCounter = 0;
		        this._canvasMap = {};
		        this._registry = typeof FinalizationRegistry !== "undefined" ? new FinalizationRegistry(this._dispose.bind(this)) : null;
		    }
		    CanvasDisposer.prototype.register = function (target, canvas) {
		        if (!this._registry)
		            return;
		        var id = "".concat(this._idCounter++);
		        this._canvasMap[id] = canvas;
		        this._registry.register(target, id);
		    };
		    CanvasDisposer.prototype._dispose = function (id) {
		        var canvas = this._canvasMap[id];
		        if (!canvas)
		            return;
		        canvas.width = 1;
		        canvas.height = 1;
		        delete this._canvasMap[id];
		    };
		    return CanvasDisposer;
		}());
		CanvasDisposer.CanvasDisposer = CanvasDisposer$1;
		return CanvasDisposer;
	}

	var hasRequiredSurfaceFactory$1;

	function requireSurfaceFactory$1 () {
		if (hasRequiredSurfaceFactory$1) return SurfaceFactory$1;
		hasRequiredSurfaceFactory$1 = 1;
		Object.defineProperty(SurfaceFactory$1, "__esModule", { value: true });
		SurfaceFactory$1.SurfaceFactory = void 0;
		var Context2DSurface_1 = requireContext2DSurface$1();
		var RenderingHelper_1 = requireRenderingHelper();
		var WebGLSharedObject_1 = requireWebGLSharedObject();
		var CanvasDisposer_1 = requireCanvasDisposer();
		var SurfaceFactory = /** @class */ (function () {
		    function SurfaceFactory() {
		        this._disposer = new CanvasDisposer_1.CanvasDisposer();
		    }
		    SurfaceFactory.prototype.createPrimarySurface = function (width, height, rendererCandidates) {
		        if (RenderingHelper_1.RenderingHelper.usedWebGL(rendererCandidates)) {
		            if (!this._shared) {
		                this._shared = new WebGLSharedObject_1.WebGLSharedObject(width, height);
		            }
		            return this._shared.getPrimarySurface();
		        }
		        else {
		            return new Context2DSurface_1.Context2DSurface(width, height);
		        }
		    };
		    SurfaceFactory.prototype.createBackSurface = function (width, height, rendererCandidates) {
		        var surface = RenderingHelper_1.RenderingHelper.usedWebGL(rendererCandidates)
		            ? this._shared.createBackSurface(width, height)
		            : new Context2DSurface_1.Context2DSurface(width, height);
		        this._disposer.register(surface, surface.getHTMLElement());
		        return surface;
		    };
		    return SurfaceFactory;
		}());
		SurfaceFactory$1.SurfaceFactory = SurfaceFactory;
		return SurfaceFactory$1;
	}

	var hasRequiredResourceFactory$1;

	function requireResourceFactory$1 () {
		if (hasRequiredResourceFactory$1) return ResourceFactory;
		hasRequiredResourceFactory$1 = 1;
		Object.defineProperty(ResourceFactory, "__esModule", { value: true });
		ResourceFactory.ResourceFactory = void 0;
		var BinaryAsset_1 = requireBinaryAsset$2();
		var GeneratedSVGImageAsset_1 = requireGeneratedSVGImageAsset();
		var HTMLImageAsset_1 = requireHTMLImageAsset();
		var HTMLVideoAsset_1 = requireHTMLVideoAsset();
		var SVGImageAsset_1 = requireSVGImageAsset$1();
		var XHRScriptAsset_1 = requireXHRScriptAsset();
		var XHRTextAsset_1 = requireXHRTextAsset();
		var GlyphFactory_1 = requireGlyphFactory$1();
		var SurfaceFactory_1 = requireSurfaceFactory$1();
		var ResourceFactory$1 = /** @class */ (function () {
		    function ResourceFactory(param) {
		        this._audioPluginManager = param.audioPluginManager;
		        this._audioManager = param.audioManager;
		        this._platform = param.platform;
		        this._surfaceFactory = new SurfaceFactory_1.SurfaceFactory();
		    }
		    ResourceFactory.prototype.createAudioAsset = function (id, assetPath, duration, system, loop, hint, offset) {
		        var activePlugin = this._audioPluginManager.getActivePlugin();
		        if (!activePlugin) {
		            throw new Error("ResourceFactory#createAudioAsset(): could not initialize ActivePlugin");
		        }
		        var audioAsset = activePlugin.createAsset(id, assetPath, duration, system, loop, hint, offset);
		        this._audioManager.registerAudioAsset(audioAsset);
		        audioAsset.onDestroyed.addOnce(this._onAudioAssetDestroyed, this);
		        return audioAsset;
		    };
		    ResourceFactory.prototype.createAudioPlayer = function (system) {
		        var activePlugin = this._audioPluginManager.getActivePlugin();
		        if (!activePlugin) {
		            throw new Error("ResourceFactory#createAudioAsset(): could not initialize ActivePlugin");
		        }
		        return activePlugin.createPlayer(system, this._audioManager);
		    };
		    ResourceFactory.prototype.createImageAsset = function (id, assetPath, width, height) {
		        return new HTMLImageAsset_1.HTMLImageAsset(id, assetPath, width, height);
		    };
		    ResourceFactory.prototype.createVideoAsset = function (id, assetPath, width, height, system, loop, useRealSize) {
		        return new HTMLVideoAsset_1.HTMLVideoAsset(id, assetPath, width, height, system, loop, useRealSize);
		    };
		    ResourceFactory.prototype.createTextAsset = function (id, assetPath) {
		        return new XHRTextAsset_1.XHRTextAsset(id, assetPath);
		    };
		    ResourceFactory.prototype.createScriptAsset = function (id, assetPath, exports) {
		        return new XHRScriptAsset_1.XHRScriptAsset(id, assetPath, exports);
		    };
		    ResourceFactory.prototype.createPrimarySurface = function (width, height) {
		        return this._surfaceFactory.createPrimarySurface(width, height, this._rendererCandidates);
		    };
		    ResourceFactory.prototype.createSurface = function (width, height) {
		        return this._surfaceFactory.createBackSurface(width, height, this._rendererCandidates);
		    };
		    ResourceFactory.prototype.createGlyphFactory = function (fontFamily, fontSize, baseline, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight) {
		        return new GlyphFactory_1.GlyphFactory(fontFamily, fontSize, baseline, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight);
		    };
		    ResourceFactory.prototype.createVectorImageAsset = function (id, assetPath, width, height, hint) {
		        return new SVGImageAsset_1.SVGImageAsset(id, assetPath, width, height, hint);
		    };
		    ResourceFactory.prototype.createVectorImageAssetFromString = function (id, assetPath, data) {
		        return new GeneratedSVGImageAsset_1.GeneratedSVGImageAsset(id, assetPath, data);
		    };
		    ResourceFactory.prototype.createBinaryAsset = function (id, assetPath) {
		        return new BinaryAsset_1.BinaryAsset(id, assetPath);
		    };
		    ResourceFactory.prototype._onAudioAssetDestroyed = function (asset) {
		        this._audioManager.removeAudioAsset(asset);
		    };
		    return ResourceFactory;
		}());
		ResourceFactory.ResourceFactory = ResourceFactory$1;
		return ResourceFactory;
	}

	var hasRequiredPlatform;

	function requirePlatform () {
		if (hasRequiredPlatform) return Platform;
		hasRequiredPlatform = 1;
		Object.defineProperty(Platform, "__esModule", { value: true });
		Platform.Platform = void 0;
		var XHRTextAsset_1 = requireXHRTextAsset();
		var AudioManager_1 = requireAudioManager();
		var ContainerController_1 = requireContainerController();
		var AudioPluginManager_1 = requireAudioPluginManager();
		var AudioPluginRegistry_1 = requireAudioPluginRegistry();
		var RafLooper_1 = requireRafLooper();
		var ResourceFactory_1 = requireResourceFactory$1();
		var Platform$1 = /** @class */ (function () {
		    function Platform(param) {
		        /**
		         * DOM に対するタッチイベントの捕捉方法として pointer-events を利用しているかどうか。
		         * 現バージョンにおいては常に true となる。
		         * この値は MouseEvent および TouchEvent を利用していた旧バージョンとの識別のために存在し、もしこの値が undefined の場合は旧バージョンであるとみなす。
		         */
		        this.usingPointerEvents = true;
		        this.containerView = param.containerView;
		        this.audioPluginManager = new AudioPluginManager_1.AudioPluginManager();
		        if (param.audioPlugins) {
		            this.audioPluginManager.tryInstallPlugin(param.audioPlugins);
		        }
		        // TODO: make it deprecated
		        this.audioPluginManager.tryInstallPlugin(AudioPluginRegistry_1.AudioPluginRegistry.getRegisteredAudioPlugins());
		        this._audioManager = new AudioManager_1.AudioManager();
		        this.amflow = param.amflow;
		        this._platformEventHandler = null;
		        this._resourceFactory = param.resourceFactory || new ResourceFactory_1.ResourceFactory({
		            audioPluginManager: this.audioPluginManager,
		            platform: this,
		            audioManager: this._audioManager
		        });
		        this.containerController = new ContainerController_1.ContainerController(this._resourceFactory);
		        this._rendererReq = null;
		        this._disablePreventDefault = !!param.disablePreventDefault;
		    }
		    Platform.prototype.setPlatformEventHandler = function (handler) {
		        if (this.containerController) {
		            this.containerController.pointEventTrigger.removeAll({ owner: this._platformEventHandler });
		            this.containerController.pointEventTrigger.add(handler.onPointEvent, handler);
		        }
		        this._platformEventHandler = handler;
		    };
		    Platform.prototype.loadGameConfiguration = function (url, callback) {
		        var a = new XHRTextAsset_1.XHRTextAsset("(game.json)", url);
		        a._load({
		            _onAssetLoad: function (_asset) {
		                callback(null, JSON.parse(a.data));
		            },
		            _onAssetError: function (_asset, error) {
		                callback(error, null);
		            }
		        });
		    };
		    Platform.prototype.getResourceFactory = function () {
		        return this._resourceFactory;
		    };
		    Platform.prototype.setRendererRequirement = function (requirement) {
		        var _a;
		        if (!requirement) {
		            if (this.containerController)
		                this.containerController.unloadView();
		            return;
		        }
		        this._rendererReq = requirement;
		        this._resourceFactory._rendererCandidates = (_a = this._rendererReq.rendererCandidates) !== null && _a !== void 0 ? _a : [];
		        // Note: this.containerController.inputHandlerLayer の存在により this.containerController が初期化されているかを判定
		        if (this.containerController && !this.containerController.inputHandlerLayer) {
		            this.containerController.initialize({
		                rendererRequirement: requirement,
		                disablePreventDefault: this._disablePreventDefault
		            });
		            this.containerController.setRootView(this.containerView);
		            if (this._platformEventHandler) {
		                this.containerController.pointEventTrigger.add(this._platformEventHandler.onPointEvent, this._platformEventHandler);
		            }
		        }
		        else {
		            this.containerController.resetView(requirement);
		        }
		    };
		    Platform.prototype.getPrimarySurface = function () {
		        return this.containerController.surface;
		    };
		    Platform.prototype.getOperationPluginViewInfo = function () {
		        var _this = this;
		        return {
		            type: "pdi-browser",
		            view: this.containerController.inputHandlerLayer.view,
		            getScale: function () { return _this.containerController.inputHandlerLayer._inputHandler.getScale(); }
		        };
		    };
		    Platform.prototype.createLooper = function (fun) {
		        return new RafLooper_1.RafLooper(fun);
		    };
		    Platform.prototype.sendToExternal = function (_playId, _data) {
		        // Nothing to do.
		    };
		    Platform.prototype.registerAudioPlugins = function (plugins) {
		        return this.audioPluginManager.tryInstallPlugin(plugins);
		    };
		    Platform.prototype.setScale = function (xScale, yScale) {
		        this.containerController.changeScale(xScale, yScale);
		    };
		    Platform.prototype.notifyViewMoved = function () {
		        // 既に役割のないメソッド(呼び出さなくても正しく動作する)。公開APIのため後方互換性のために残している。
		    };
		    /**
		     * 最終的に出力されるマスター音量を変更する
		     *
		     * @param volume マスター音量
		     */
		    Platform.prototype.setMasterVolume = function (volume) {
		        this._audioManager.setMasterVolume(volume);
		    };
		    /**
		     * 最終的に出力されるマスター音量を取得する
		     */
		    Platform.prototype.getMasterVolume = function () {
		        return this._audioManager.getMasterVolume();
		    };
		    Platform.prototype.setTabIndex = function (tabIndex) {
		        this.containerController.setTabIndex(tabIndex);
		    };
		    Platform.prototype.destroy = function () {
		        this.setRendererRequirement(undefined);
		        this.setMasterVolume(0);
		    };
		    return Platform;
		}());
		Platform.Platform = Platform$1;
		return Platform;
	}

	var HTMLAudioPlugin = {};

	var audioUtil = {};

	var hasRequiredAudioUtil;

	function requireAudioUtil () {
		if (hasRequiredAudioUtil) return audioUtil;
		hasRequiredAudioUtil = 1;
		Object.defineProperty(audioUtil, "__esModule", { value: true });
		audioUtil.addExtname = audioUtil.resolveExtname = audioUtil.detectSupportedFormats = void 0;
		/**
		 * Audio 要素で再生できる形式を検出する。
		 * @returns 再生できる形式の配列
		 */
		function detectSupportedFormats() {
		    var _a;
		    // Edgeは再生できるファイル形式とcanPlayTypeの結果が一致しないため、固定でAACを利用する
		    if (navigator.userAgent.indexOf("Edge/") !== -1)
		        return ["aac"];
		    // Audio要素を実際に作って、canPlayTypeで再生できるかを判定する
		    var audioElement = document.createElement("audio");
		    var formats = ["ogg", "m4a", "aac", "mp4"]; // 順番重要: この順で優先的に使うことに注意 (ref. resolveExtName())
		    var mimeTable = { "m4a": "audio/x-m4a" };
		    var supportedFormats = [];
		    for (var i = 0, len = formats.length; i < len; i++) {
		        var format = formats[i];
		        var mimeType = (_a = mimeTable[format]) !== null && _a !== void 0 ? _a : ("audio/" + format);
		        try {
		            var canPlay = audioElement.canPlayType(mimeType);
		            if (canPlay !== "no" && canPlay !== "") {
		                supportedFormats.push(format);
		            }
		        }
		        catch (_e) {
		            // do nothing: just skip
		        }
		    }
		    return supportedFormats;
		}
		audioUtil.detectSupportedFormats = detectSupportedFormats;
		/**
		 * 拡張子の配列から、再生可能な形式に合致するものを探す。
		 * @param extensions 拡張子の配列または null | undefined (空配列と見なす)
		 * @param supportedFormats 再生可能な形式。detectSupportedFormats() の戻り値を期待する
		 * @returns 再生可能な形式の拡張子。なければ null
		 */
		function resolveExtname(extensions, supportedFormats) {
		    if (!extensions || !extensions.length)
		        return null;
		    for (var _i = 0, supportedFormats_1 = supportedFormats; _i < supportedFormats_1.length; _i++) {
		        var fmt = supportedFormats_1[_i];
		        var ext = "." + fmt;
		        if (extensions.indexOf(ext) !== -1)
		            return ext;
		    }
		    return null;
		}
		audioUtil.resolveExtname = resolveExtname;
		/**
		 * 与えられたパス文字列に与えられた拡張子を追加する。
		 * @param path パス文字列
		 * @param ext 追加する拡張子 ("." を含む)
		 */
		function addExtname(path, ext) {
		    var index = path.indexOf("?");
		    if (index === -1) {
		        return path + ext;
		    }
		    // hoge?query => hoge.ext?query
		    return path.substring(0, index) + ext + path.substring(index, path.length);
		}
		audioUtil.addExtname = addExtname;
		return audioUtil;
	}

	var HTMLAudioAsset = {};

	var AudioAsset = {};

	var hasRequiredAudioAsset;

	function requireAudioAsset () {
		if (hasRequiredAudioAsset) return AudioAsset;
		hasRequiredAudioAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(AudioAsset, "__esModule", { value: true });
		AudioAsset.AudioAsset = void 0;
		var Asset_1 = requireAsset$2();
		var AudioAsset$1 = /** @class */ (function (_super) {
		    __extends(AudioAsset, _super);
		    function AudioAsset(id, path, duration, system, loop, hint, offset) {
		        var _this = _super.call(this, id, path) || this;
		        _this.type = "audio";
		        _this.data = undefined;
		        _this.duration = duration;
		        _this.loop = loop;
		        _this.hint = hint;
		        _this._system = system;
		        _this.offset = offset;
		        _this.path = _this._modifyPath(_this.path);
		        return _this;
		    }
		    AudioAsset.prototype.play = function () {
		        var player = this._system.createPlayer();
		        player.play(this);
		        this._lastPlayedPlayer = player;
		        return player;
		    };
		    AudioAsset.prototype.stop = function () {
		        var players = this._system.findPlayers(this);
		        for (var i = 0; i < players.length; ++i)
		            players[i].stop();
		    };
		    AudioAsset.prototype.inUse = function () {
		        return this._system.findPlayers(this).length > 0;
		    };
		    AudioAsset.prototype.destroy = function () {
		        if (this._system)
		            this.stop();
		        this.data = undefined;
		        this._system = undefined;
		        this._lastPlayedPlayer = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return AudioAsset;
		}(Asset_1.Asset));
		AudioAsset.AudioAsset = AudioAsset$1;
		return AudioAsset;
	}

	var hasRequiredHTMLAudioAsset;

	function requireHTMLAudioAsset () {
		if (hasRequiredHTMLAudioAsset) return HTMLAudioAsset;
		hasRequiredHTMLAudioAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(HTMLAudioAsset, "__esModule", { value: true });
		HTMLAudioAsset.HTMLAudioAsset = void 0;
		var AudioAsset_1 = requireAudioAsset();
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var audioUtil_1 = requireAudioUtil();
		var HTMLAudioAsset$1 = /** @class */ (function (_super) {
		    __extends(HTMLAudioAsset, _super);
		    function HTMLAudioAsset() {
		        var _this = _super !== null && _super.apply(this, arguments) || this;
		        _this._intervalId = -1;
		        _this._intervalCount = 0;
		        return _this;
		    }
		    HTMLAudioAsset.prototype._load = function (loader) {
		        var _this = this;
		        if (this.path == null) {
		            // 再生可能な形式がない。実際には鳴らない音声としてロード成功しておく
		            this.data = null;
		            setTimeout(function () { return loader._onAssetLoad(_this); }, 0);
		            return;
		        }
		        var audio = this.createAudioElement();
		        var startLoadingAudio = function (path, handlers) {
		            // autoplay は preload よりも優先されるため明示的にfalseとする
		            audio.autoplay = false;
		            audio.preload = "none";
		            audio.src = path;
		            _this._attachAll(audio, handlers);
		            /* eslint-disable max-len */
		            // Firefoxはpreload="auto"でないと読み込みされない
		            // preloadはブラウザに対するHint属性なので、どう扱うかはブラウザの実装次第となる
		            // https://html.spec.whatwg.org/multipage/embedded-content.html#attr-media-preload
		            // https://developer.mozilla.org/ja/docs/Web/HTML/Element/audio#attr-preload
		            // https://github.com/CreateJS/SoundJS/blob/e2d4842a84ff425ada861edb9f6e9b57f63d7caf/src/soundjs/htmlaudio/HTMLAudioSoundInstance.js#L147-147
		            /* eslint-enable max-len */
		            audio.preload = "auto";
		            setAudioLoadInterval(audio, handlers);
		            audio.load();
		        };
		        var handlers = {
		            success: function () {
		                _this._detachAll(audio, handlers);
		                _this.data = audio;
		                loader._onAssetLoad(_this);
		                window.clearInterval(_this._intervalId);
		            },
		            error: function () {
		                _this._detachAll(audio, handlers);
		                _this.data = audio;
		                loader._onAssetError(_this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError("HTMLAudioAsset loading error"));
		                window.clearInterval(_this._intervalId);
		            }
		        };
		        var setAudioLoadInterval = function (audio, handlers) {
		            // IE11において、canplaythroughイベントが正常に発火しない問題が確認されたため、その対処として以下の処理を行っている。
		            // なお、canplaythroughはreadyStateの値が4になった時点で呼び出されるイベントである。
		            // インターバルとして指定している100msに根拠は無い。
		            _this._intervalCount = 0;
		            _this._intervalId = window.setInterval(function () {
		                if (audio.readyState === 4) {
		                    handlers.success();
		                }
		                else {
		                    ++_this._intervalCount;
		                    // readyStateの値が4にならない状態が1分（100ms×600）続いた場合、
		                    // 読み込みに失敗したとする。1分という時間に根拠は無い。
		                    if (_this._intervalCount === 600) {
		                        handlers.error();
		                    }
		                }
		            }, 100);
		        };
		        // 暫定対応：後方互換性のため、aacファイルが無い場合はmp4へのフォールバックを試みる。
		        // この対応を止める際には、HTMLAudioPluginのsupportedExtensionsからaacを除外する必要がある。
		        var delIndex = this.path.indexOf("?");
		        var basePath = delIndex >= 0 ? this.path.substring(0, delIndex) : this.path;
		        if (basePath.slice(-4) === ".aac" && HTMLAudioAsset.supportedFormats.indexOf("mp4") !== -1) {
		            var altHandlers_1 = {
		                success: handlers.success,
		                error: function () {
		                    _this._detachAll(audio, altHandlers_1);
		                    window.clearInterval(_this._intervalId);
		                    _this.path = (0, audioUtil_1.addExtname)(_this.originalPath, ".mp4");
		                    startLoadingAudio(_this.path, handlers);
		                }
		            };
		            startLoadingAudio(this.path, altHandlers_1);
		            return;
		        }
		        startLoadingAudio(this.path, handlers);
		    };
		    HTMLAudioAsset.prototype.cloneElement = function () {
		        return this.data ? this.createAudioElement(this.data.src) : null;
		    };
		    HTMLAudioAsset.prototype._assetPathFilter = function (path) {
		        if (HTMLAudioAsset.supportedFormats.indexOf("ogg") !== -1) {
		            return (0, audioUtil_1.addExtname)(path, ".ogg");
		        }
		        if (HTMLAudioAsset.supportedFormats.indexOf("aac") !== -1) {
		            return (0, audioUtil_1.addExtname)(path, ".aac");
		        }
		        // ここで検出されるのは最初にアクセスを試みるオーディオアセットのファイルパスなので、
		        // supportedFormatsに(後方互換性保持で使う可能性がある)mp4が含まれていても利用しない
		        // TODO: _assetPathFilter() における戻り値 `null` の扱い
		        return null;
		    };
		    HTMLAudioAsset.prototype._modifyPath = function (path) {
		        var _a;
		        var ext = (0, audioUtil_1.resolveExtname)((_a = this.hint) === null || _a === void 0 ? void 0 : _a.extensions, HTMLAudioAsset.supportedFormats);
		        return ext ? (0, audioUtil_1.addExtname)(this.originalPath, ext) : path;
		    };
		    HTMLAudioAsset.prototype.createAudioElement = function (src) {
		        return new Audio(src);
		    };
		    HTMLAudioAsset.prototype._attachAll = function (audio, handlers) {
		        if (handlers.success) {
		            /* eslint-disable max-len */
		            // https://developer.mozilla.org/en-US/docs/Web/Events/canplaythrough
		            // https://github.com/goldfire/howler.js/blob/1dad25cdd9d6982232050454e8b45411902efe65/howler.js#L372
		            // https://github.com/CreateJS/SoundJS/blob/e2d4842a84ff425ada861edb9f6e9b57f63d7caf/src/soundjs/htmlaudio/HTMLAudioSoundInstance.js#L145-145
		            /* eslint-enable max-len */
		            audio.addEventListener("canplaythrough", handlers.success, false);
		        }
		        if (handlers.error) {
		            // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
		            // stalledはfetchして取れなかった時に起きるイベント
		            audio.addEventListener("stalled", handlers.error, false);
		            audio.addEventListener("error", handlers.error, false);
		            audio.addEventListener("abort", handlers.error, false);
		        }
		    };
		    HTMLAudioAsset.prototype._detachAll = function (audio, handlers) {
		        if (handlers.success) {
		            audio.removeEventListener("canplaythrough", handlers.success, false);
		        }
		        if (handlers.error) {
		            audio.removeEventListener("stalled", handlers.error, false);
		            audio.removeEventListener("error", handlers.error, false);
		            audio.removeEventListener("abort", handlers.error, false);
		        }
		    };
		    return HTMLAudioAsset;
		}(AudioAsset_1.AudioAsset));
		HTMLAudioAsset.HTMLAudioAsset = HTMLAudioAsset$1;
		return HTMLAudioAsset;
	}

	var HTMLAudioPlayer = {};

	var AudioPlayer = {};

	var hasRequiredAudioPlayer;

	function requireAudioPlayer () {
		if (hasRequiredAudioPlayer) return AudioPlayer;
		hasRequiredAudioPlayer = 1;
		Object.defineProperty(AudioPlayer, "__esModule", { value: true });
		AudioPlayer.AudioPlayer = void 0;
		var trigger_1 = requireCjs();
		var AudioPlayer$1 = /** @class */ (function () {
		    function AudioPlayer(system) {
		        this.onPlay = new trigger_1.Trigger();
		        this.onStop = new trigger_1.Trigger();
		        this.played = this.onPlay;
		        this.stopped = this.onStop;
		        this.volume = 1;
		        this._muted = false;
		        this._system = system;
		    }
		    AudioPlayer.prototype.play = function (audio) {
		        this.currentAudio = audio;
		        this.onPlay.fire({
		            player: this,
		            audio: audio
		        });
		    };
		    AudioPlayer.prototype.stop = function () {
		        var audio = this.currentAudio;
		        if (!audio)
		            return;
		        this.currentAudio = undefined;
		        this.onStop.fire({
		            player: this,
		            audio: audio
		        });
		    };
		    AudioPlayer.prototype.canHandleStopped = function () {
		        return true;
		    };
		    AudioPlayer.prototype.changeVolume = function (volume) {
		        this.volume = volume;
		    };
		    // 歴史的経緯のためこの名前になっているが、対称性を考えればこのメソッドの正しい名前は _notifyMutedChanged() である。
		    AudioPlayer.prototype._changeMuted = function (_muted) {
		        // this._muted が未使用のため何もしない。
		    };
		    AudioPlayer.prototype._notifyVolumeChanged = function () {
		        // AudioPlayerの音量を AudioSystem の音量で上書きしていたため、最終音量が正常に計算できていなかった。
		        // 暫定対応として、 changeVolume() に AudioPlayer 自身の音量を渡す事により最終音量の計算を実行させる。
		        this.changeVolume(this.volume);
		    };
		    return AudioPlayer;
		}());
		AudioPlayer.AudioPlayer = AudioPlayer$1;
		return AudioPlayer;
	}

	var HTMLAudioAutoplayHelper = {};

	var hasRequiredHTMLAudioAutoplayHelper;

	function requireHTMLAudioAutoplayHelper () {
		if (hasRequiredHTMLAudioAutoplayHelper) return HTMLAudioAutoplayHelper;
		hasRequiredHTMLAudioAutoplayHelper = 1;
		/// chrome66以降などのブラウザに導入されるAutoplay Policyに対応する
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
		Object.defineProperty(HTMLAudioAutoplayHelper, "__esModule", { value: true });
		HTMLAudioAutoplayHelper.setupChromeMEIWorkaround = void 0;
		var state = 0 /* PlayableState.Unknown */;
		var suspendedAudioElements = [];
		function setupChromeMEIWorkaround(audio) {
		    // TODO 短時間 (e.g. 同期的) に複数呼ばれると timer が上書きされそう
		    var timer = null;
		    function playHandler() {
		        switch (state) {
		            case 0 /* PlayableState.Unknown */:
		            case 1 /* PlayableState.WaitingInteraction */: // 通常のケースではここには到達しないが、何らかの外因によって音を鳴らすことができた場合
		                playSuspendedAudioElements();
		                break;
		            // do nothing
		        }
		        state = 2 /* PlayableState.Ready */;
		        clearTimeout(timer);
		    }
		    function suspendedHandler() {
		        audio.removeEventListener("play", playHandler);
		        switch (state) {
		            case 0 /* PlayableState.Unknown */:
		                suspendedAudioElements.push(audio);
		                state = 1 /* PlayableState.WaitingInteraction */;
		                setUserInteractListener();
		                break;
		            case 1 /* PlayableState.WaitingInteraction */:
		                suspendedAudioElements.push(audio);
		                break;
		            case 2 /* PlayableState.Ready */:
		                audio.play(); // suspendedHandler が呼ばれるまでに音が鳴らせるようになった場合
		                break;
		            // do nothing;
		        }
		    }
		    switch (state) {
		        case 0 /* PlayableState.Unknown */:
		            audio.addEventListener("play", playHandler, true);
		            timer = window.setTimeout(suspendedHandler, 100); // 明確な根拠はないが100msec待ってもplayされなければ再生できないと判断する
		            break;
		        case 1 /* PlayableState.WaitingInteraction */:
		            suspendedAudioElements.push(audio);
		            break;
		        // do nothing
		    }
		}
		HTMLAudioAutoplayHelper.setupChromeMEIWorkaround = setupChromeMEIWorkaround;
		function resumeHandler() {
		    playSuspendedAudioElements();
		    clearUserInteractListener();
		}
		function setUserInteractListener() {
		    document.addEventListener("keydown", resumeHandler, true);
		    document.addEventListener("mousedown", resumeHandler, true);
		    document.addEventListener("touchend", resumeHandler, true);
		}
		function clearUserInteractListener() {
		    document.removeEventListener("keydown", resumeHandler);
		    document.removeEventListener("mousedown", resumeHandler);
		    document.removeEventListener("touchend", resumeHandler);
		}
		function playSuspendedAudioElements() {
		    state = 2 /* PlayableState.Ready */;
		    suspendedAudioElements.forEach(function (audio) { return audio.play(); });
		    suspendedAudioElements = [];
		}
		return HTMLAudioAutoplayHelper;
	}

	var hasRequiredHTMLAudioPlayer;

	function requireHTMLAudioPlayer () {
		if (hasRequiredHTMLAudioPlayer) return HTMLAudioPlayer;
		hasRequiredHTMLAudioPlayer = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(HTMLAudioPlayer, "__esModule", { value: true });
		HTMLAudioPlayer.HTMLAudioPlayer = void 0;
		var AudioPlayer_1 = requireAudioPlayer();
		var HTMLAudioAutoplayHelper_1 = requireHTMLAudioAutoplayHelper();
		var HTMLAudioPlayer$1 = /** @class */ (function (_super) {
		    __extends(HTMLAudioPlayer, _super);
		    function HTMLAudioPlayer(system, manager) {
		        var _this = _super.call(this, system) || this;
		        _this._audioInstance = null;
		        _this._isWaitingPlayEvent = false;
		        _this._isStopRequested = false;
		        _this._manager = manager;
		        _this._endedEventHandler = function () {
		            _this._onAudioEnded();
		        };
		        _this._onPlayEventHandler = function () {
		            _this._onPlayEvent();
		        };
		        _this._dummyDurationWaitTimer = null;
		        return _this;
		    }
		    HTMLAudioPlayer.prototype.play = function (asset) {
		        var _a;
		        if (this.currentAudio) {
		            this.stop();
		        }
		        var audio = asset.cloneElement();
		        if (audio) {
		            if (!asset.offset) {
		                // offsetが指定されていない場合、durationを無視して全体再生する
		                audio.loop = asset.loop;
		            }
		            else {
		                var offsetSec_1 = ((_a = asset.offset) !== null && _a !== void 0 ? _a : 0) / 1000;
		                var durationEndSec_1 = asset.duration / 1000 + offsetSec_1;
		                audio.currentTime = offsetSec_1;
		                audio.ontimeupdate = function () {
		                    if (durationEndSec_1 <= audio.currentTime) {
		                        if (asset.loop) {
		                            audio.currentTime = offsetSec_1;
		                        }
		                        else {
		                            audio.pause();
		                        }
		                    }
		                };
		                audio.onended = function () {
		                    if (asset.loop) {
		                        audio.currentTime = offsetSec_1;
		                        audio.play();
		                    }
		                };
		            }
		            (0, HTMLAudioAutoplayHelper_1.setupChromeMEIWorkaround)(audio);
		            audio.volume = this._calculateVolume();
		            audio.play().catch(function (_err) { });
		            // FIXME: 部分ループ再生の場合、音声再生1周目終了時に内部情報を削除してしまうため、この後にstop()を呼び出しても音声が止まらない問題がある
		            audio.addEventListener("ended", this._endedEventHandler, false);
		            audio.addEventListener("play", this._onPlayEventHandler, false);
		            this._isWaitingPlayEvent = true;
		            this._audioInstance = audio;
		        }
		        else {
		            // 再生できるオーディオがない場合。duration後に停止処理だけ行う(処理のみ進め音は鳴らさない)
		            this._dummyDurationWaitTimer = setTimeout(this._endedEventHandler, asset.duration);
		        }
		        _super.prototype.play.call(this, asset);
		    };
		    HTMLAudioPlayer.prototype.stop = function () {
		        if (!this.currentAudio) {
		            _super.prototype.stop.call(this);
		            return;
		        }
		        this._clearEndedEventHandler();
		        if (this._audioInstance) {
		            if (!this._isWaitingPlayEvent) {
		                // _audioInstance が再び play されることは無いので、 removeEventListener("play") する必要は無い
		                this._audioInstance.pause();
		                this._audioInstance = null;
		            }
		            else {
		                this._isStopRequested = true;
		            }
		        }
		        _super.prototype.stop.call(this);
		    };
		    HTMLAudioPlayer.prototype.changeVolume = function (volume) {
		        _super.prototype.changeVolume.call(this, volume);
		        if (this._audioInstance) {
		            this._audioInstance.volume = this._calculateVolume();
		        }
		    };
		    HTMLAudioPlayer.prototype._changeMuted = function (muted) {
		        _super.prototype._changeMuted.call(this, muted);
		        if (this._audioInstance) {
		            this._audioInstance.volume = this._calculateVolume();
		        }
		    };
		    HTMLAudioPlayer.prototype.notifyMasterVolumeChanged = function () {
		        if (this._audioInstance) {
		            this._audioInstance.volume = this._calculateVolume();
		        }
		    };
		    HTMLAudioPlayer.prototype._onAudioEnded = function () {
		        this._clearEndedEventHandler();
		        _super.prototype.stop.call(this);
		    };
		    HTMLAudioPlayer.prototype._clearEndedEventHandler = function () {
		        if (this._audioInstance)
		            this._audioInstance.removeEventListener("ended", this._endedEventHandler, false);
		        if (this._dummyDurationWaitTimer != null) {
		            clearTimeout(this._dummyDurationWaitTimer);
		            this._dummyDurationWaitTimer = null;
		        }
		    };
		    // audio.play() は非同期なので、 play が開始される前に stop を呼ばれた場合はこのハンドラ到達時に停止する
		    HTMLAudioPlayer.prototype._onPlayEvent = function () {
		        var _a;
		        if (!this._isWaitingPlayEvent)
		            return;
		        this._isWaitingPlayEvent = false;
		        if (this._isStopRequested) {
		            this._isStopRequested = false;
		            // _audioInstance が再び play されることは無いので、 removeEventListener("play") する必要は無い
		            (_a = this._audioInstance) === null || _a === void 0 ? void 0 : _a.pause();
		            this._audioInstance = null;
		        }
		    };
		    HTMLAudioPlayer.prototype._calculateVolume = function () {
		        return this._system._muted ? 0 : this.volume * this._system.volume * this._manager.getMasterVolume();
		    };
		    return HTMLAudioPlayer;
		}(AudioPlayer_1.AudioPlayer));
		HTMLAudioPlayer.HTMLAudioPlayer = HTMLAudioPlayer$1;
		return HTMLAudioPlayer;
	}

	var hasRequiredHTMLAudioPlugin;

	function requireHTMLAudioPlugin () {
		if (hasRequiredHTMLAudioPlugin) return HTMLAudioPlugin;
		hasRequiredHTMLAudioPlugin = 1;
		Object.defineProperty(HTMLAudioPlugin, "__esModule", { value: true });
		HTMLAudioPlugin.HTMLAudioPlugin = void 0;
		var audioUtil_1 = requireAudioUtil();
		var HTMLAudioAsset_1 = requireHTMLAudioAsset();
		var HTMLAudioPlayer_1 = requireHTMLAudioPlayer();
		var HTMLAudioPlugin$1 = /** @class */ (function () {
		    function HTMLAudioPlugin() {
		        this._supportedFormats = [];
		        this.supportedFormats = (0, audioUtil_1.detectSupportedFormats)();
		    }
		    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
		    // https://github.com/CreateJS/SoundJS/blob/master/src/soundjs/htmlaudio/HTMLAudioPlugin.js
		    HTMLAudioPlugin.isSupported = function () {
		        // Audio要素を実際に作って、canPlayTypeが存在するかで確認する
		        var audioElement = document.createElement("audio");
		        var result = false;
		        try {
		            result = (audioElement.canPlayType !== undefined);
		        }
		        catch (e) {
		            // ignore Error
		        }
		        return result;
		    };
		    Object.defineProperty(HTMLAudioPlugin.prototype, "supportedFormats", {
		        get: function () {
		            return this._supportedFormats;
		        },
		        set: function (supportedFormats) {
		            this._supportedFormats = supportedFormats;
		            HTMLAudioAsset_1.HTMLAudioAsset.supportedFormats = supportedFormats;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    HTMLAudioPlugin.prototype.createAsset = function (id, path, duration, system, loop, hint, offset) {
		        return new HTMLAudioAsset_1.HTMLAudioAsset(id, path, duration, system, loop, hint, offset);
		    };
		    HTMLAudioPlugin.prototype.createPlayer = function (system, manager) {
		        return new HTMLAudioPlayer_1.HTMLAudioPlayer(system, manager);
		    };
		    return HTMLAudioPlugin;
		}());
		HTMLAudioPlugin.HTMLAudioPlugin = HTMLAudioPlugin$1;
		return HTMLAudioPlugin;
	}

	var ProxyAudioPlugin = {};

	var ProxyAudioAsset = {};

	var hasRequiredProxyAudioAsset;

	function requireProxyAudioAsset () {
		if (hasRequiredProxyAudioAsset) return ProxyAudioAsset;
		hasRequiredProxyAudioAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(ProxyAudioAsset, "__esModule", { value: true });
		ProxyAudioAsset.ProxyAudioAsset = void 0;
		var AudioAsset_1 = requireAudioAsset();
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var ProxyAudioAsset$1 = /** @class */ (function (_super) {
		    __extends(ProxyAudioAsset, _super);
		    function ProxyAudioAsset(handlerSet, id, assetPath, duration, system, loop, hint, offset) {
		        var _this = _super.call(this, id, assetPath, duration, system, loop, hint, offset) || this;
		        _this._handlerSet = handlerSet;
		        return _this;
		    }
		    ProxyAudioAsset.prototype.destroy = function () {
		        this._handlerSet.unloadAudioAsset(this.id);
		        _super.prototype.destroy.call(this);
		    };
		    ProxyAudioAsset.prototype._load = function (loader) {
		        var _this = this;
		        this._handlerSet.loadAudioAsset({
		            id: this.id,
		            assetPath: this.path,
		            duration: this.duration,
		            loop: this.loop,
		            hint: this.hint,
		            offset: this.offset
		        }, function (err) {
		            if (err) {
		                loader._onAssetError(_this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError(err));
		            }
		            else {
		                loader._onAssetLoad(_this);
		            }
		        });
		    };
		    ProxyAudioAsset.prototype._assetPathFilter = function (path) {
		        return path;
		    };
		    ProxyAudioAsset.prototype._modifyPath = function (path) {
		        return path;
		    };
		    return ProxyAudioAsset;
		}(AudioAsset_1.AudioAsset));
		ProxyAudioAsset.ProxyAudioAsset = ProxyAudioAsset$1;
		return ProxyAudioAsset;
	}

	var ProxyAudioPlayer = {};

	var hasRequiredProxyAudioPlayer;

	function requireProxyAudioPlayer () {
		if (hasRequiredProxyAudioPlayer) return ProxyAudioPlayer;
		hasRequiredProxyAudioPlayer = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(ProxyAudioPlayer, "__esModule", { value: true });
		ProxyAudioPlayer.ProxyAudioPlayer = void 0;
		var AudioPlayer_1 = requireAudioPlayer();
		var ProxyAudioPlayer$1 = /** @class */ (function (_super) {
		    __extends(ProxyAudioPlayer, _super);
		    function ProxyAudioPlayer(handlerSet, system, manager) {
		        var _this = _super.call(this, system) || this;
		        _this._audioPlayerId = null;
		        _this._handlerSet = handlerSet;
		        _this._manager = manager;
		        return _this;
		    }
		    ProxyAudioPlayer.prototype.changeVolume = function (volume) {
		        _super.prototype.changeVolume.call(this, volume);
		        this._notifyVolumeToHandler();
		    };
		    ProxyAudioPlayer.prototype._changeMuted = function (muted) {
		        _super.prototype._changeMuted.call(this, muted);
		        this._notifyVolumeToHandler();
		    };
		    ProxyAudioPlayer.prototype.play = function (asset) {
		        if (this._audioPlayerId != null) {
		            this.stop();
		        }
		        this._audioPlayerId = "ap".concat(ProxyAudioPlayer._audioPlayerIdCounter++);
		        this._handlerSet.createAudioPlayer({
		            assetId: asset.id,
		            audioPlayerId: this._audioPlayerId,
		            isPlaying: true,
		            volume: this._calculateVolume(),
		            playbackRate: 1 // 未使用
		        });
		        _super.prototype.play.call(this, asset);
		    };
		    ProxyAudioPlayer.prototype.stop = function () {
		        if (this._audioPlayerId != null) {
		            this._handlerSet.stopAudioPlayer(this._audioPlayerId);
		            this._handlerSet.destroyAudioPlayer(this._audioPlayerId);
		            this._audioPlayerId = null;
		        }
		        _super.prototype.stop.call(this);
		    };
		    ProxyAudioPlayer.prototype.notifyMasterVolumeChanged = function () {
		        this._notifyVolumeToHandler();
		    };
		    ProxyAudioPlayer.prototype._notifyVolumeToHandler = function () {
		        if (this._audioPlayerId != null) {
		            this._handlerSet.changeAudioVolume(this._audioPlayerId, this._calculateVolume());
		        }
		    };
		    ProxyAudioPlayer.prototype._calculateVolume = function () {
		        return this._system._muted ? 0 : this.volume * this._system.volume * this._manager.getMasterVolume();
		    };
		    ProxyAudioPlayer._audioPlayerIdCounter = 0;
		    return ProxyAudioPlayer;
		}(AudioPlayer_1.AudioPlayer));
		ProxyAudioPlayer.ProxyAudioPlayer = ProxyAudioPlayer$1;
		return ProxyAudioPlayer;
	}

	var hasRequiredProxyAudioPlugin;

	function requireProxyAudioPlugin () {
		if (hasRequiredProxyAudioPlugin) return ProxyAudioPlugin;
		hasRequiredProxyAudioPlugin = 1;
		Object.defineProperty(ProxyAudioPlugin, "__esModule", { value: true });
		ProxyAudioPlugin.ProxyAudioPlugin = void 0;
		var ProxyAudioAsset_1 = requireProxyAudioAsset();
		var ProxyAudioPlayer_1 = requireProxyAudioPlayer();
		var ProxyAudioPlugin$1 = /** @class */ (function () {
		    function ProxyAudioPlugin(handlerSet) {
		        this.supportedFormats = [];
		        this._handlerSet = handlerSet;
		    }
		    ProxyAudioPlugin.isSupported = function () {
		        return true;
		    };
		    ProxyAudioPlugin.prototype.createAsset = function (id, assetPath, duration, system, loop, hint, offset) {
		        return new ProxyAudioAsset_1.ProxyAudioAsset(this._handlerSet, id, assetPath, duration, system, loop, hint, offset);
		    };
		    ProxyAudioPlugin.prototype.createPlayer = function (system, manager) {
		        return new ProxyAudioPlayer_1.ProxyAudioPlayer(this._handlerSet, system, manager);
		    };
		    return ProxyAudioPlugin;
		}());
		ProxyAudioPlugin.ProxyAudioPlugin = ProxyAudioPlugin$1;
		return ProxyAudioPlugin;
	}

	var WebAudioPlugin = {};

	var WebAudioAsset = {};

	var WebAudioHelper_1;
	var hasRequiredWebAudioHelper;

	function requireWebAudioHelper () {
		if (hasRequiredWebAudioHelper) return WebAudioHelper_1;
		hasRequiredWebAudioHelper = 1;
		// WebAudioのブラウザ間の差を吸収する
		// Compatible Table: http://compatibility.shwups-cms.ch/en/home?&property=AudioParam.prototype
		// http://qiita.com/mohayonao/items/d79e9fc56b4e9c157be1#polyfill
		// https://github.com/cwilso/webkitAudioContext-MonkeyPatch
		// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
		// eslint-disable-next-line @typescript-eslint/naming-convention
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		var WebAudioHelper;
		(function (WebAudioHelper) {
		    // AudioContextをシングルトンとして取得する
		    // 一つのページに一つのContextが存在すれば良い
		    function getAudioContext() {
		        if (!window.__akashic__) {
		            Object.defineProperty(window, "__akashic__", {
		                value: {},
		                enumerable: false,
		                configurable: false,
		                writable: false
		            });
		        }
		        var ctx = window.__akashic__.audioContext;
		        if (!(ctx instanceof AudioContext)) {
		            ctx = window.__akashic__.audioContext = new AudioContext();
		            WebAudioHelper._workAroundSafari();
		        }
		        return ctx;
		    }
		    WebAudioHelper.getAudioContext = getAudioContext;
		    function createGainNode(context) {
		        if (context.createGain) {
		            return context.createGain();
		        }
		        return context.createGainNode();
		    }
		    WebAudioHelper.createGainNode = createGainNode;
		    function createBufferNode(context) {
		        var sourceNode = context.createBufferSource();
		        // @ts-ignore startがあるなら問題ないので、拡張しないで返す
		        if (sourceNode.start) {
		            return sourceNode;
		        }
		        // start/stopがない環境へのエイリアスを貼る
		        sourceNode.start = sourceNode.noteOn;
		        sourceNode.stop = sourceNode.noteOff;
		        return sourceNode;
		    }
		    WebAudioHelper.createBufferNode = createBufferNode;
		    // Safari対策ワークアラウンド
		    function _workAroundSafari() {
		        document.addEventListener("touchstart", function touchInitializeHandler() {
		            document.removeEventListener("touchstart", touchInitializeHandler);
		            WebAudioHelper.getAudioContext().createBufferSource().start(0);
		        }, true);
		    }
		    WebAudioHelper._workAroundSafari = _workAroundSafari;
		})(WebAudioHelper || (WebAudioHelper = {}));
		WebAudioHelper_1 = WebAudioHelper;
		return WebAudioHelper_1;
	}

	var hasRequiredWebAudioAsset;

	function requireWebAudioAsset () {
		if (hasRequiredWebAudioAsset) return WebAudioAsset;
		hasRequiredWebAudioAsset = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(WebAudioAsset, "__esModule", { value: true });
		WebAudioAsset.WebAudioAsset = void 0;
		var AudioAsset_1 = requireAudioAsset();
		var ExceptionFactory_1 = requireExceptionFactory$1();
		var XHRLoader_1 = requireXHRLoader();
		var audioUtil_1 = requireAudioUtil();
		var helper = requireWebAudioHelper();
		var WebAudioAsset$1 = /** @class */ (function (_super) {
		    __extends(WebAudioAsset, _super);
		    function WebAudioAsset() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    WebAudioAsset.prototype._load = function (loader) {
		        var _this = this;
		        if (this.path == null) {
		            // 再生可能な形式がない。実際には鳴らない音声としてロード成功しておく
		            this.data = null;
		            setTimeout(function () { return loader._onAssetLoad(_this); }, 0);
		            return;
		        }
		        var successHandler = function (decodedAudio) {
		            _this.data = decodedAudio;
		            loader._onAssetLoad(_this);
		        };
		        var errorHandler = function () {
		            loader._onAssetError(_this, ExceptionFactory_1.ExceptionFactory.createAssetLoadError("WebAudioAsset unknown loading error"));
		        };
		        var onLoadArrayBufferHandler = function (response) {
		            var audioContext = helper.getAudioContext();
		            audioContext.decodeAudioData(response, successHandler, errorHandler);
		        };
		        var xhrLoader = new XHRLoader_1.XHRLoader();
		        var loadArrayBuffer = function (path, onSuccess, onFailed) {
		            xhrLoader.getArrayBuffer(path, function (error, response) {
		                if (error) {
		                    onFailed(error);
		                }
		                else {
		                    onSuccess(response);
		                }
		            });
		        };
		        var delIndex = this.path.indexOf("?");
		        var basePath = delIndex >= 0 ? this.path.substring(0, delIndex) : this.path;
		        if (basePath.slice(-4) === ".aac") {
		            // 暫定対応：後方互換性のため、aacファイルが無い場合はmp4へのフォールバックを試みる。
		            // この対応を止める際には、WebAudioPluginのsupportedExtensionsからaacを除外する必要がある。
		            loadArrayBuffer(this.path, onLoadArrayBufferHandler, function (_error) {
		                var altPath = (0, audioUtil_1.addExtname)(_this.originalPath, ".mp4");
		                loadArrayBuffer(altPath, function (response) {
		                    _this.path = altPath;
		                    onLoadArrayBufferHandler(response);
		                }, errorHandler);
		            });
		            return;
		        }
		        loadArrayBuffer(this.path, onLoadArrayBufferHandler, errorHandler);
		    };
		    WebAudioAsset.prototype._assetPathFilter = function (path) {
		        if (WebAudioAsset.supportedFormats.indexOf("ogg") !== -1) {
		            return (0, audioUtil_1.addExtname)(path, ".ogg");
		        }
		        if (WebAudioAsset.supportedFormats.indexOf("aac") !== -1) {
		            return (0, audioUtil_1.addExtname)(path, ".aac");
		        }
		        // ここで検出されるのは最初にアクセスを試みるオーディオアセットのファイルパスなので、
		        // supportedFormatsに(後方互換性保持で使う可能性がある)mp4が含まれていても利用しない
		        // TODO: _assetPathFilter() における戻り値 `null` の扱い
		        return null;
		    };
		    WebAudioAsset.prototype._modifyPath = function (path) {
		        var _a;
		        var ext = (0, audioUtil_1.resolveExtname)((_a = this.hint) === null || _a === void 0 ? void 0 : _a.extensions, WebAudioAsset.supportedFormats);
		        return ext ? (0, audioUtil_1.addExtname)(this.originalPath, ext) : path;
		    };
		    // _assetPathFilterの判定処理を小さくするため、予めサポートしてる拡張子一覧を持つ
		    WebAudioAsset.supportedFormats = [];
		    return WebAudioAsset;
		}(AudioAsset_1.AudioAsset));
		WebAudioAsset.WebAudioAsset = WebAudioAsset$1;
		return WebAudioAsset;
	}

	var WebAudioAutoplayHelper_1;
	var hasRequiredWebAudioAutoplayHelper;

	function requireWebAudioAutoplayHelper () {
		if (hasRequiredWebAudioAutoplayHelper) return WebAudioAutoplayHelper_1;
		hasRequiredWebAudioAutoplayHelper = 1;
		var helper = requireWebAudioHelper();
		// chrome66以降などのブラウザに導入されるAutoplay Policyに対応する
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
		var WebAudioAutoplayHelper;
		(function (WebAudioAutoplayHelper) {
		    function setupChromeMEIWorkaround() {
		        var context = helper.getAudioContext();
		        if (context && typeof context.resume !== "function")
		            return;
		        var gain = helper.createGainNode(context);
		        // テスト用の音源を用意する
		        var osc = context.createOscillator();
		        osc.type = "sawtooth";
		        osc.frequency.value = 440; // 何でも良いがドの音
		        osc.connect(gain);
		        osc.start(0);
		        var contextState = context.state;
		        osc.disconnect();
		        if (contextState !== "running")
		            setUserInteractListener();
		    }
		    WebAudioAutoplayHelper.setupChromeMEIWorkaround = setupChromeMEIWorkaround;
		})(WebAudioAutoplayHelper || (WebAudioAutoplayHelper = {}));
		function resumeHandler() {
		    var context = helper.getAudioContext();
		    context.resume();
		    clearUserInteractListener();
		}
		function setUserInteractListener() {
		    document.addEventListener("keydown", resumeHandler, true);
		    document.addEventListener("mousedown", resumeHandler, true);
		    document.addEventListener("touchend", resumeHandler, true);
		}
		function clearUserInteractListener() {
		    document.removeEventListener("keydown", resumeHandler);
		    document.removeEventListener("mousedown", resumeHandler);
		    document.removeEventListener("touchend", resumeHandler);
		}
		WebAudioAutoplayHelper_1 = WebAudioAutoplayHelper;
		return WebAudioAutoplayHelper_1;
	}

	var WebAudioPlayer = {};

	var hasRequiredWebAudioPlayer;

	function requireWebAudioPlayer () {
		if (hasRequiredWebAudioPlayer) return WebAudioPlayer;
		hasRequiredWebAudioPlayer = 1;
		var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
		Object.defineProperty(WebAudioPlayer, "__esModule", { value: true });
		WebAudioPlayer.WebAudioPlayer = void 0;
		var AudioPlayer_1 = requireAudioPlayer();
		var helper = requireWebAudioHelper();
		var WebAudioPlayer$1 = /** @class */ (function (_super) {
		    __extends(WebAudioPlayer, _super);
		    function WebAudioPlayer(system, manager) {
		        var _this = _super.call(this, system) || this;
		        _this._audioContext = helper.getAudioContext();
		        _this._manager = manager;
		        _this._gainNode = helper.createGainNode(_this._audioContext);
		        _this._gainNode.connect(_this._audioContext.destination);
		        _this._dummyDurationWaitTimer = null;
		        _this._endedEventHandler = function () {
		            _this._onAudioEnded();
		        };
		        return _this;
		    }
		    WebAudioPlayer.prototype.changeVolume = function (volume) {
		        _super.prototype.changeVolume.call(this, volume);
		        this._gainNode.gain.value = this._calculateVolume();
		    };
		    WebAudioPlayer.prototype._changeMuted = function (muted) {
		        _super.prototype._changeMuted.call(this, muted);
		        this._gainNode.gain.value = this._calculateVolume();
		    };
		    WebAudioPlayer.prototype.play = function (asset) {
		        var _a;
		        if (this.currentAudio) {
		            this.stop();
		        }
		        if (asset.data) {
		            var bufferNode = helper.createBufferNode(this._audioContext);
		            bufferNode.buffer = asset.data;
		            this._gainNode.gain.value = this._calculateVolume();
		            bufferNode.connect(this._gainNode);
		            this._sourceNode = bufferNode;
		            // Chromeだとevent listerで指定した場合に動かないことがある
		            // https://github.com/mozilla-appmaker/appmaker/issues/1984
		            this._sourceNode.onended = this._endedEventHandler;
		            // loop時にoffsetを指定すると正しく動作しないことがあるため、暫定対応としてloopが真の場合はoffsetを指定しない
		            if (asset.loop) {
		                bufferNode.loop = asset.loop;
		                this._sourceNode.start(0);
		            }
		            else {
		                var offset = ((_a = asset.offset) !== null && _a !== void 0 ? _a : 0) / 1000;
		                if (asset.duration > 0) {
		                    this._sourceNode.start(0, offset, asset.duration / 1000);
		                }
		                else {
		                    this._sourceNode.start(0, offset);
		                }
		            }
		        }
		        else {
		            // 再生できるオーディオがない場合。duration後に停止処理だけ行う(処理のみ進め音は鳴らさない)
		            this._dummyDurationWaitTimer = setTimeout(this._endedEventHandler, asset.duration);
		        }
		        _super.prototype.play.call(this, asset);
		    };
		    WebAudioPlayer.prototype.stop = function () {
		        if (!this.currentAudio) {
		            _super.prototype.stop.call(this);
		            return;
		        }
		        this._clearEndedEventHandler();
		        if (this._sourceNode)
		            this._sourceNode.stop(0);
		        _super.prototype.stop.call(this);
		    };
		    WebAudioPlayer.prototype.notifyMasterVolumeChanged = function () {
		        this._gainNode.gain.value = this._calculateVolume();
		    };
		    WebAudioPlayer.prototype._onAudioEnded = function () {
		        this._clearEndedEventHandler();
		        _super.prototype.stop.call(this);
		    };
		    WebAudioPlayer.prototype._clearEndedEventHandler = function () {
		        if (this._sourceNode)
		            this._sourceNode.onended = null;
		        if (this._dummyDurationWaitTimer != null) {
		            clearTimeout(this._dummyDurationWaitTimer);
		            this._dummyDurationWaitTimer = null;
		        }
		    };
		    WebAudioPlayer.prototype._calculateVolume = function () {
		        return this._system._muted ? 0 : this.volume * this._system.volume * this._manager.getMasterVolume();
		    };
		    return WebAudioPlayer;
		}(AudioPlayer_1.AudioPlayer));
		WebAudioPlayer.WebAudioPlayer = WebAudioPlayer$1;
		return WebAudioPlayer;
	}

	var hasRequiredWebAudioPlugin;

	function requireWebAudioPlugin () {
		if (hasRequiredWebAudioPlugin) return WebAudioPlugin;
		hasRequiredWebAudioPlugin = 1;
		Object.defineProperty(WebAudioPlugin, "__esModule", { value: true });
		WebAudioPlugin.WebAudioPlugin = void 0;
		var audioUtil_1 = requireAudioUtil();
		var WebAudioAsset_1 = requireWebAudioAsset();
		var autoPlayHelper = requireWebAudioAutoplayHelper();
		var WebAudioPlayer_1 = requireWebAudioPlayer();
		var WebAudioPlugin$1 = /** @class */ (function () {
		    function WebAudioPlugin() {
		        this._supportedFormats = [];
		        this.supportedFormats = (0, audioUtil_1.detectSupportedFormats)();
		        autoPlayHelper.setupChromeMEIWorkaround();
		    }
		    // AudioContextが存在するかどうかで判定する
		    // http://mohayonao.hatenablog.com/entry/2012/12/12/103009
		    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio/webaudio.js
		    WebAudioPlugin.isSupported = function () {
		        if ("AudioContext" in window) {
		            return true;
		        }
		        else if ("webkitAudioContext" in window) {
		            return true;
		        }
		        return false;
		    };
		    Object.defineProperty(WebAudioPlugin.prototype, "supportedFormats", {
		        get: function () {
		            return this._supportedFormats;
		        },
		        set: function (supportedFormats) {
		            this._supportedFormats = supportedFormats;
		            WebAudioAsset_1.WebAudioAsset.supportedFormats = supportedFormats;
		        },
		        enumerable: false,
		        configurable: true
		    });
		    WebAudioPlugin.prototype.createAsset = function (id, assetPath, duration, system, loop, hint, offset) {
		        return new WebAudioAsset_1.WebAudioAsset(id, assetPath, duration, system, loop, hint, offset);
		    };
		    WebAudioPlugin.prototype.createPlayer = function (system, manager) {
		        return new WebAudioPlayer_1.WebAudioPlayer(system, manager);
		    };
		    return WebAudioPlugin;
		}());
		WebAudioPlugin.WebAudioPlugin = WebAudioPlugin$1;
		return WebAudioPlugin;
	}

	var hasRequiredFull;

	function requireFull () {
		if (hasRequiredFull) return full;
		hasRequiredFull = 1;
		(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.ProxyAudioPlugin = exports.WebAudioPlugin = exports.HTMLAudioPlugin = exports.AudioPluginManager = exports.AudioPluginRegistry = exports.ResourceFactory = exports.Platform = void 0;
			var Platform_1 = requirePlatform();
			Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return Platform_1.Platform; } });
			var AudioPluginRegistry_1 = requireAudioPluginRegistry();
			Object.defineProperty(exports, "AudioPluginRegistry", { enumerable: true, get: function () { return AudioPluginRegistry_1.AudioPluginRegistry; } });
			var AudioPluginManager_1 = requireAudioPluginManager();
			Object.defineProperty(exports, "AudioPluginManager", { enumerable: true, get: function () { return AudioPluginManager_1.AudioPluginManager; } });
			// TODO: Audio Pluginの実態は別リポジトリに切り出す事を検討する
			var HTMLAudioPlugin_1 = requireHTMLAudioPlugin();
			Object.defineProperty(exports, "HTMLAudioPlugin", { enumerable: true, get: function () { return HTMLAudioPlugin_1.HTMLAudioPlugin; } });
			var ProxyAudioPlugin_1 = requireProxyAudioPlugin();
			Object.defineProperty(exports, "ProxyAudioPlugin", { enumerable: true, get: function () { return ProxyAudioPlugin_1.ProxyAudioPlugin; } });
			var WebAudioPlugin_1 = requireWebAudioPlugin();
			Object.defineProperty(exports, "WebAudioPlugin", { enumerable: true, get: function () { return WebAudioPlugin_1.WebAudioPlugin; } });
			var ResourceFactory_1 = requireResourceFactory$1();
			Object.defineProperty(exports, "ResourceFactory", { enumerable: true, get: function () { return ResourceFactory_1.ResourceFactory; } }); 
		} (full));
		return full;
	}

	var pdiBrowser;
	var hasRequiredPdiBrowser;

	function requirePdiBrowser () {
		if (hasRequiredPdiBrowser) return pdiBrowser;
		hasRequiredPdiBrowser = 1;
		pdiBrowser = requireFull();
		return pdiBrowser;
	}

	var hasRequiredAudioFactory;

	function requireAudioFactory () {
		if (hasRequiredAudioFactory) return AudioFactory;
		hasRequiredAudioFactory = 1;
		Object.defineProperty(AudioFactory, "__esModule", { value: true });
		AudioFactory.AudioFactory = void 0;
		var pdi_browser_1 = requirePdiBrowser();
		var AudioManager_1 = requireAudioManager();
		var AudioFactory$1 = /** @class */ (function () {
		    function AudioFactory() {
		        this.audioManager = new AudioManager_1.AudioManager();
		        this.audioPluginManager = new pdi_browser_1.AudioPluginManager();
		        // TODO: どうすべきだよくわからないが一旦
		        this.audioPluginManager.tryInstallPlugin([pdi_browser_1.HTMLAudioPlugin, pdi_browser_1.WebAudioPlugin]);
		    }
		    AudioFactory.prototype.createAudioAsset = function (id, path, duration, system, loop, hint, offset) {
		        var activePlugin = this.audioPluginManager.getActivePlugin();
		        var audioAsset = activePlugin.createAsset(id, path, duration, system, loop, hint, offset !== null && offset !== void 0 ? offset : 0);
		        this.audioManager.registerAudioAsset(audioAsset);
		        // TODO: g.AudioAsset#onDestroyed の引数は本来 g.AudioAsset のはず
		        audioAsset.onDestroyed.addOnce(this.handleAudioAssetDestroyed, this);
		        return audioAsset;
		    };
		    AudioFactory.prototype.createAudioPlayer = function (system) {
		        var activePlugin = this.audioPluginManager.getActivePlugin();
		        return activePlugin.createPlayer(system, this.audioManager);
		    };
		    AudioFactory.prototype.handleAudioAssetDestroyed = function (asset) {
		        this.audioManager.removeAudioAsset(asset);
		    };
		    return AudioFactory;
		}());
		AudioFactory.AudioFactory = AudioFactory$1;
		
		return AudioFactory;
	}

	var GlyphFactory = {};

	var hasRequiredGlyphFactory;

	function requireGlyphFactory () {
		if (hasRequiredGlyphFactory) return GlyphFactory;
		hasRequiredGlyphFactory = 1;
		Object.defineProperty(GlyphFactory, "__esModule", { value: true });
		GlyphFactory.GlyphFactory = void 0;
		var tslib_1 = require$$0;
		var pdi = tslib_1.__importStar(requireGlyphFactory$1());
		var GlyphFactory$1 = /** @class */ (function (_super) {
		    tslib_1.__extends(GlyphFactory, _super);
		    function GlyphFactory() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return GlyphFactory;
		}(pdi.GlyphFactory));
		GlyphFactory.GlyphFactory = GlyphFactory$1;
		
		return GlyphFactory;
	}

	var SurfaceFactory = {};

	var Context2DSurface = {};

	var hasRequiredContext2DSurface;

	function requireContext2DSurface () {
		if (hasRequiredContext2DSurface) return Context2DSurface;
		hasRequiredContext2DSurface = 1;
		Object.defineProperty(Context2DSurface, "__esModule", { value: true });
		Context2DSurface.Context2DSurface = void 0;
		var tslib_1 = require$$0;
		var pdi = tslib_1.__importStar(requireContext2DSurface$1());
		var Context2DSurface$1 = /** @class */ (function (_super) {
		    tslib_1.__extends(Context2DSurface, _super);
		    function Context2DSurface() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    return Context2DSurface;
		}(pdi.Context2DSurface));
		Context2DSurface.Context2DSurface = Context2DSurface$1;
		
		return Context2DSurface;
	}

	var PrimaryContext2DSurface = {};

	var hasRequiredPrimaryContext2DSurface;

	function requirePrimaryContext2DSurface () {
		if (hasRequiredPrimaryContext2DSurface) return PrimaryContext2DSurface;
		hasRequiredPrimaryContext2DSurface = 1;
		Object.defineProperty(PrimaryContext2DSurface, "__esModule", { value: true });
		PrimaryContext2DSurface.PrimaryContext2DSurface = void 0;
		var tslib_1 = require$$0;
		var CanvasSurfaceContext_1 = requireCanvasSurfaceContext();
		var Context2DRenderer_1 = requireContext2DRenderer();
		var Surface_1 = requireSurface$1();
		/**
		 * プライマリサーフェス用の Context2DSurface 実装。
		 * pdi-browser の CanvasSurface では外部から HTMLCanvasElement を渡すことができないため独自に実装 (変更点はその部分のみ)。
		 */
		var PrimaryContext2DSurface$1 = /** @class */ (function (_super) {
		    tslib_1.__extends(PrimaryContext2DSurface, _super);
		    function PrimaryContext2DSurface(width, height, canvas) {
		        var _this = _super.call(this, width, height, canvas) || this;
		        var context = canvas.getContext("2d");
		        if (context == null) {
		            throw new Error("PrimaryContext2DSurface#constructor: cannot get context");
		        }
		        _this._context = new CanvasSurfaceContext_1.CanvasSurfaceContext(context);
		        canvas.width = width;
		        canvas.height = height;
		        _this.canvas = canvas;
		        _this._renderer = undefined;
		        return _this;
		    }
		    PrimaryContext2DSurface.prototype.context = function () {
		        return this._context;
		    };
		    PrimaryContext2DSurface.prototype.renderer = function () {
		        if (!this._renderer) {
		            this._renderer = new Context2DRenderer_1.Context2DRenderer(this);
		        }
		        return this._renderer;
		    };
		    PrimaryContext2DSurface.prototype.changeVisualScale = function (xScale, yScale) {
		        /*
		         Canvas要素のリサイズをCSS transformで行う。
		         CSSのwidth/height styleによるリサイズはおかしくなるケースが存在するので、可能な限りtransformを使う。
		         - https://twitter.com/uupaa/status/639002317576998912
		         - http://havelog.ayumusato.com/develop/performance/e554-paint_gpu_acceleration_problems.html
		         - http://buccchi.jp/blog/2013/03/android_canvas_deathpoint/
		         */
		        var canvasStyle = this.canvas.style;
		        if ("transform" in canvasStyle) {
		            canvasStyle.transformOrigin = "0 0";
		            canvasStyle.transform = "scale(" + xScale + "," + yScale + ")";
		        }
		        else if ("webkitTransform" in canvasStyle) {
		            canvasStyle.webkitTransformOrigin = "0 0";
		            canvasStyle.webkitTransform = "scale(" + xScale + "," + yScale + ")";
		        }
		        else {
		            canvasStyle.width = Math.floor(xScale * this.width) + "px";
		            canvasStyle.height = Math.floor(yScale * this.width) + "px";
		        }
		    };
		    PrimaryContext2DSurface.prototype.changePhysicalScale = function (xScale, yScale) {
		        if (this._context)
		            this.canvas.width = this.width * xScale;
		        this.canvas.height = this.height * yScale;
		        this._context.scale(xScale, yScale);
		    };
		    PrimaryContext2DSurface.prototype.isPlaying = function () {
		        return false;
		    };
		    PrimaryContext2DSurface.prototype.getHTMLElement = function () {
		        return this.canvas;
		    };
		    PrimaryContext2DSurface.prototype.destroy = function () {
		        this.canvas.width = 1;
		        this.canvas.height = 1;
		        this.canvas = undefined;
		        this._renderer = undefined;
		        _super.prototype.destroy.call(this);
		    };
		    return PrimaryContext2DSurface;
		}(Surface_1.Surface));
		PrimaryContext2DSurface.PrimaryContext2DSurface = PrimaryContext2DSurface$1;
		
		return PrimaryContext2DSurface;
	}

	var hasRequiredSurfaceFactory;

	function requireSurfaceFactory () {
		if (hasRequiredSurfaceFactory) return SurfaceFactory;
		hasRequiredSurfaceFactory = 1;
		Object.defineProperty(SurfaceFactory, "__esModule", { value: true });
		SurfaceFactory.SurfaceFactory = void 0;
		var Context2DSurface_1 = requireContext2DSurface();
		var PrimaryContext2DSurface_1 = requirePrimaryContext2DSurface();
		var SurfaceFactory$1 = /** @class */ (function () {
		    function SurfaceFactory(canvas) {
		        this.canvas = canvas;
		    }
		    SurfaceFactory.prototype.createPrimarySurface = function (width, height) {
		        return new PrimaryContext2DSurface_1.PrimaryContext2DSurface(width, height, this.canvas);
		    };
		    SurfaceFactory.prototype.createSurface = function (width, height) {
		        return new Context2DSurface_1.Context2DSurface(width, height);
		    };
		    return SurfaceFactory;
		}());
		SurfaceFactory.SurfaceFactory = SurfaceFactory$1;
		
		return SurfaceFactory;
	}

	var hasRequiredResourceFactory;

	function requireResourceFactory () {
		if (hasRequiredResourceFactory) return ResourceFactory$2;
		hasRequiredResourceFactory = 1;
		Object.defineProperty(ResourceFactory$2, "__esModule", { value: true });
		ResourceFactory$2.ResourceFactory = void 0;
		var tslib_1 = require$$0;
		var url_join_1 = tslib_1.__importDefault(require$$1);
		var BinaryAsset_1 = requireBinaryAsset$1();
		var GeneratedVectorImageAsset_1 = requireGeneratedVectorImageAsset();
		var ImageAsset_1 = requireImageAsset$1();
		var ScriptAsset_1 = requireScriptAsset();
		var SVGImageAsset_1 = requireSVGImageAsset();
		var TextAsset_1 = requireTextAsset();
		var VideoAsset_1 = requireVideoAsset();
		var AudioFactory_1 = requireAudioFactory();
		var GlyphFactory_1 = requireGlyphFactory();
		var SurfaceFactory_1 = requireSurfaceFactory();
		var ResourceFactory = /** @class */ (function () {
		    function ResourceFactory(param) {
		        this.surfaceFactory = new SurfaceFactory_1.SurfaceFactory(param.canvas);
		        this.audioFactory = new AudioFactory_1.AudioFactory();
		        this.assetLoaderFuncs = param.assetLoaderFuncs;
		        this.assetBaseDir = param.assetBaseDir || "";
		    }
		    ResourceFactory.prototype.createAudioAsset = function (id, path, duration, system, loop, hint) {
		        return this.audioFactory.createAudioAsset(id, (0, url_join_1.default)(this.assetBaseDir, path), duration, system, loop, hint);
		    };
		    ResourceFactory.prototype.createAudioPlayer = function (system) {
		        return this.audioFactory.createAudioPlayer(system);
		    };
		    ResourceFactory.prototype.createImageAsset = function (id, path, width, height) {
		        return new ImageAsset_1.ImageAsset(id, (0, url_join_1.default)(this.assetBaseDir, path), width, height);
		    };
		    ResourceFactory.prototype.createVectorImageAsset = function (id, path, width, height, hint) {
		        return new SVGImageAsset_1.VectorImageAsset(id, (0, url_join_1.default)(this.assetBaseDir, path), width, height, hint);
		    };
		    ResourceFactory.prototype.createVideoAsset = function (id, path, width, height, system, loop, useRealSize) {
		        return new VideoAsset_1.VideoAsset(id, (0, url_join_1.default)(this.assetBaseDir, path), width, height, system, loop, useRealSize);
		    };
		    ResourceFactory.prototype.createTextAsset = function (id, path) {
		        var asset = new TextAsset_1.TextAsset(id, (0, url_join_1.default)(this.assetBaseDir, path));
		        if (this.assetLoaderFuncs && this.assetLoaderFuncs.loadTextAsset) {
		            asset._overrideLoadFunc(this.assetLoaderFuncs.loadTextAsset);
		        }
		        return asset;
		    };
		    ResourceFactory.prototype.createScriptAsset = function (id, path, exports) {
		        var asset = new ScriptAsset_1.ScriptAsset(id, (0, url_join_1.default)(this.assetBaseDir, path), exports);
		        if (this.assetLoaderFuncs && this.assetLoaderFuncs.loadScriptAsset) {
		            asset._overrideLoadFunc(this.assetLoaderFuncs.loadScriptAsset);
		        }
		        return asset;
		    };
		    ResourceFactory.prototype.createBinaryAsset = function (id, path) {
		        return new BinaryAsset_1.BinaryAsset(id, (0, url_join_1.default)(this.assetBaseDir, path));
		    };
		    ResourceFactory.prototype.createPrimarySurface = function (width, height) {
		        return this.surfaceFactory.createPrimarySurface(width, height);
		    };
		    ResourceFactory.prototype.createSurface = function (width, height) {
		        return this.surfaceFactory.createSurface(width, height);
		    };
		    ResourceFactory.prototype.createGlyphFactory = function (fontFamily, fontSize, baseline, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight) {
		        return new GlyphFactory_1.GlyphFactory(fontFamily, fontSize, baseline, fontColor, strokeWidth, strokeColor, strokeOnly, fontWeight);
		    };
		    ResourceFactory.prototype.createVectorImageAssetFromString = function (id, path, data) {
		        return new GeneratedVectorImageAsset_1.GeneratedVectorImageAsset(id, path, data);
		    };
		    return ResourceFactory;
		}());
		ResourceFactory$2.ResourceFactory = ResourceFactory;
		
		return ResourceFactory$2;
	}

	Object.defineProperty(main, "__esModule", { value: true });
	exports.initialize = main.initialize = void 0;
	var tslib_1 = require$$0;
	var g = tslib_1.__importStar(requireAkashicEngine());
	var GameHandlerSet_1 = requireGameHandlerSet();
	var ResourceFactory_1 = requireResourceFactory();
	var requestAnimationFrameId = null;
	window.g = g; // 他のモジュールが g を参照するケースを考慮して require() 時点で g を参照できるようにする
	/**
	 * akashic-engine を初期化してゲームを実行する。
	 * @param param 初期化パラメータ。
	 * @returns ゲームを破棄する関数。
	 */
	function initialize(param) {
	    var _a, _b, _c;
	    var resourceFactory = new ResourceFactory_1.ResourceFactory({
	        canvas: param.canvas,
	        assetLoaderFuncs: param.assetLoaderFuncs,
	        assetBaseDir: param.assetBaseDir
	    });
	    if (param.configuration == null) {
	        param.configuration = {};
	    }
	    if (param.configuration.assets == null) {
	        param.configuration.assets = {};
	    }
	    // virtual path を補完
	    var assets = param.configuration.assets;
	    var assetKeys = Object.keys(assets);
	    for (var i = 0; i < assetKeys.length; i++) {
	        assets[assetKeys[i]].virtualPath = assets[assetKeys[i]].path;
	    }
	    var game = new g.Game({
	        engineModule: g,
	        handlerSet: new GameHandlerSet_1.GameHandlerSet({ isSnapshotSaver: true }),
	        configuration: tslib_1.__assign(tslib_1.__assign({}, param.configuration), { assets: param.configuration.assets, main: (_a = param.configuration.main) !== null && _a !== void 0 ? _a : "", width: (_b = param.configuration.width) !== null && _b !== void 0 ? _b : param.canvas.width, height: (_c = param.configuration.height) !== null && _c !== void 0 ? _c : param.canvas.height }),
	        resourceFactory: resourceFactory,
	        operationPluginViewInfo: {
	            view: param.canvas
	        },
	        mainFunc: param.mainFunc
	    });
	    // primary surface の設定
	    var primarySurface = resourceFactory.createPrimarySurface(game.width, game.height);
	    game.renderers.push(primarySurface.renderer());
	    // NOTE: game._loadAndStart() のみを呼び出した場合 `g.game.random === undefined` となるため、事前に game.reset() で randSeed を与えている。
	    // TODO: akashic-engine 側の `g.Game#_loadAndStart()` のコメントを修正
	    game._reset({ randSeed: Date.now() });
	    game._loadAndStart({});
	    // ポイントイベントの処理
	    var pointEvents = [];
	    var element = param.canvas;
	    var getScaleX = function () {
	        return element.getBoundingClientRect().width / element.clientWidth;
	    };
	    var getScaleY = function () {
	        return element.getBoundingClientRect().height / element.clientHeight;
	    };
	    var handlePointerDownEvent = function (event) {
	        var rect = element.getBoundingClientRect();
	        pointEvents.push({
	            type: 0 /* g.PlatformPointType.Down */,
	            identifier: event.pointerId,
	            offset: {
	                x: (event.clientX - rect.left) / getScaleX(),
	                y: (event.clientY - rect.top) / getScaleY()
	            },
	            button: event.button
	        });
	        window.addEventListener("pointermove", handlePointerMoveEvent, { passive: false });
	        window.addEventListener("pointerup", handlePointerUpEvent, { passive: false });
	    };
	    var handlePointerMoveEvent = function (event) {
	        var rect = element.getBoundingClientRect();
	        pointEvents.push({
	            type: 1 /* g.PlatformPointType.Move */,
	            identifier: event.pointerId,
	            offset: {
	                x: (event.clientX - rect.left) / getScaleX(),
	                y: (event.clientY - rect.top) / getScaleY()
	            },
	            button: event.button
	        });
	    };
	    var handlePointerUpEvent = function (event) {
	        var rect = element.getBoundingClientRect();
	        pointEvents.push({
	            type: 2 /* g.PlatformPointType.Up */,
	            identifier: event.pointerId,
	            offset: {
	                x: (event.clientX - rect.left) / getScaleX(),
	                y: (event.clientY - rect.top) / getScaleY()
	            },
	            button: event.button
	        });
	        window.removeEventListener("pointermove", handlePointerMoveEvent);
	        window.removeEventListener("pointerup", handlePointerUpEvent);
	    };
	    var handlePreventDefaultEvent = function (event) {
	        event.preventDefault();
	    };
	    var handlePointEvent = function () {
	        element.addEventListener("pointerdown", handlePointerDownEvent, { passive: false });
	        element.addEventListener("contextmenu", handlePreventDefaultEvent, { passive: false });
	    };
	    var unhandlePointEvent = function () {
	        element.removeEventListener("pointerdown", handlePointerDownEvent);
	        element.removeEventListener("contextmenu", handlePreventDefaultEvent);
	    };
	    handlePointEvent();
	    // ゲームループ
	    var before = Date.now();
	    var frame = 1000 / game.fps;
	    var tick = function () {
	        if (requestAnimationFrameId === null) {
	            return;
	        }
	        var now = Date.now();
	        if (before + frame * 2 < now) {
	            // NOTE: 別タブなどで長時間 (ここでは実フレームの2倍以上の時間) tick() が呼ばれなかった場合は直前まで進める
	            before = now - frame - 1;
	        }
	        if (before + frame < now) {
	            if (pointEvents.length) {
	                var events = [];
	                for (var i = 0; i < pointEvents.length; i++) {
	                    var event_1 = game.resolvePointEvent(pointEvents[i]);
	                    if (event_1 == null)
	                        continue;
	                    events.push(event_1);
	                }
	                pointEvents.length = 0;
	                game.tick(true, undefined, events);
	            }
	            else {
	                game.tick(true);
	            }
	            game.render();
	            before += frame;
	        }
	        requestAnimationFrameId = window.requestAnimationFrame(tick);
	    };
	    requestAnimationFrameId = window.requestAnimationFrame(tick);
	    return function () {
	        if (requestAnimationFrameId !== null) {
	            window.cancelAnimationFrame(requestAnimationFrameId);
	            requestAnimationFrameId = null;
	        }
	        game._destroy();
	        unhandlePointEvent();
	        primarySurface.renderer().clear();
	    };
	}
	exports.initialize = main.initialize = initialize;

	exports.default = main;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
