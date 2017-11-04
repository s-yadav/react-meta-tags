/*!
 * react-meta-tags - 0.3.0
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016,2017 to Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["MetaTags"] = factory(require("react"), require("react-dom"));
	else
		root["MetaTags"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ReactTitle = exports.MetaTagsContext = exports.MetaTags = undefined;

	var _meta_tags_context = __webpack_require__(2);

	var _meta_tags_context2 = _interopRequireDefault(_meta_tags_context);

	var _meta_tags = __webpack_require__(9);

	var _meta_tags2 = _interopRequireDefault(_meta_tags);

	var _react_title = __webpack_require__(12);

	var _react_title2 = _interopRequireDefault(_react_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _meta_tags2.default;
	exports.MetaTags = _meta_tags2.default;
	exports.MetaTagsContext = _meta_tags_context2.default;
	exports.ReactTitle = _react_title2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/** context class which passes extract fuunction to MetaTags Component **/
	var MetaTagsContext = function (_Component) {
	  _inherits(MetaTagsContext, _Component);

	  function MetaTagsContext() {
	    _classCallCheck(this, MetaTagsContext);

	    return _possibleConstructorReturn(this, (MetaTagsContext.__proto__ || Object.getPrototypeOf(MetaTagsContext)).apply(this, arguments));
	  }

	  _createClass(MetaTagsContext, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { extract: this.props.extract };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.only(this.props.children);
	    }
	  }]);

	  return MetaTagsContext;
	}(_react.Component);

	MetaTagsContext.childContextTypes = {
	  extract: _propTypes2.default.func
	};
	exports.default = MetaTagsContext;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(5)();
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var ReactPropTypesSecret = __webpack_require__(8);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _utils = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/** An wrapper component to wrap element which need to shifted to head **/
	var MetaTags = function (_Component) {
	  _inherits(MetaTags, _Component);

	  function MetaTags() {
	    _classCallCheck(this, MetaTags);

	    return _possibleConstructorReturn(this, (MetaTags.__proto__ || Object.getPrototypeOf(MetaTags)).apply(this, arguments));
	  }

	  _createClass(MetaTags, [{
	    key: 'extractChildren',
	    value: function extractChildren() {
	      var extract = this.context.extract;


	      if (extract) {
	        extract(this.props.children);
	        return;
	      }
	    }
	  }, {
	    key: 'handleChildrens',
	    value: function handleChildrens() {
	      var _this2 = this;

	      var children = this.props.children;


	      if (this.context.extract) {
	        return;
	      }

	      var headComponent = _react2.default.createElement(
	        'div',
	        { className: 'react-head-temp' },
	        children
	      );

	      var temp = document.createElement("div");
	      _reactDom2.default.render(headComponent, temp, function () {
	        var childStr = temp.innerHTML;

	        //if html is not changed return
	        if (_this2.lastChildStr === childStr) {
	          return;
	        }

	        _this2.lastChildStr = childStr;

	        var childNodes = Array.prototype.slice.call(temp.querySelector('.react-head-temp').children);

	        var head = document.head;
	        var headHtml = head.innerHTML;

	        //filter children remove if children has not been changed
	        childNodes = childNodes.filter(function (child) {
	          return headHtml.indexOf((0, _utils.getDomAsString)(child)) === -1;
	        });

	        //remove duplicate title and meta from head
	        childNodes.forEach(function (child) {
	          var tag = child.tagName.toLowerCase();
	          if (tag === 'title') {
	            var title = (0, _utils.getDuplicateTitle)();
	            if (title) (0, _utils.removeChild)(head, title);
	          } else if (tag === 'meta') {
	            var meta = (0, _utils.getDuplicateMeta)(child);
	            if (meta) (0, _utils.removeChild)(head, meta);
	          }
	        });

	        (0, _utils.appendChild)(document.head, childNodes);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.handleChildrens();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(oldProps) {
	      if (oldProps.children !== this.props.children) {
	        this.handleChildrens();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.extractChildren();
	      return null;
	    }
	  }]);

	  return MetaTags;
	}(_react.Component);

	MetaTags.contextTypes = {
	  extract: _propTypes2.default.func
	};
	exports.default = MetaTags;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.extractMetaAndTitle = extractMetaAndTitle;
	exports.removeDuplicateMetas = removeDuplicateMetas;
	exports.getDuplicateTitle = getDuplicateTitle;
	exports.getDuplicateMeta = getDuplicateMeta;
	exports.appendChild = appendChild;
	exports.removeChild = removeChild;
	exports.getDomAsString = getDomAsString;
	var metaRegex = /<meta[^<>]*?=(['"].*?['"]|[^<>]*?)*?\/?>/g;
	var titleRegex = /<title[^<>]*?>(.*?)<\/title>/g;
	var attributesRegex = /(\S*?)=("(.*?)"|'(.*?)'|([^<>\s]*))/g;

	/**
	  Note:
	  1. In server side we will add meta tags and title at last after fitering
	  2. In client we will match and replace meta tagString
	  3. For now we will not support link and other tags properly, they can be added but we will not check for uniqueness and will not decide placement
	**/

	function getAttributes(tagString) {
	  var attr = {};
	  if (!tagString) return attr;
	  var match = attributesRegex.exec(tagString);
	  while (match !== null) {
	    attr[match[1]] = match[3] || match[4] || match[5];
	    match = attributesRegex.exec(tagString);
	  }

	  return attr;
	}

	function filterOutMetaWithId(metas) {
	  metas = Array.from(metas || []);
	  return metas.filter(function (meta) {
	    return !meta.id;
	  });
	}

	function extractMetaAndTitle(domString) {
	  var title = void 0;
	  var metas = [];

	  //extract title, only take the last title, remove title from the string
	  domString = domString.replace(titleRegex, function (titleStr) {
	    title = titleStr;
	    return '';
	  });

	  //extract metas
	  domString = domString.replace(metaRegex, function (_tagString) {
	    metas.push(_extends({}, getAttributes(_tagString), { _tagString: _tagString }));
	    return '';
	  });

	  return {
	    title: title,
	    metas: metas,
	    rest: domString
	  };
	}

	function removeDuplicateMetas(metas) {
	  var metaAddedProperties = {};
	  var metaAddedNames = {};
	  var metaAddedIds = {};

	  var filteredMetas = [];
	  for (var i = metas.length - 1; i >= 0; i--) {
	    var meta = metas[i];
	    var id = meta.id,
	        property = meta.property,
	        name = meta.name;

	    var addMeta = false;

	    //if id is defined dont check any thing else
	    if (id) {
	      addMeta = !metaAddedIds[id];

	      // if property key or name key is defined and its different add that,
	      // But they should have different id
	    } else if (property || name) {
	      var existing = metaAddedProperties[property] || metaAddedNames[name];
	      addMeta = !existing || existing.id; //if existing have id and the current doesn't then keep it
	    }

	    if (id) metaAddedIds[id] = meta;
	    if (property) metaAddedProperties[property] = meta;
	    if (name) metaAddedNames[name] = meta;

	    if (addMeta) {
	      filteredMetas.push(meta);
	    }
	  }

	  return filteredMetas;
	}

	function getDuplicateTitle() {
	  return document.head.querySelector('title');
	}

	function getDuplicateMeta(meta) {
	  var head = document.head;
	  var id = meta.id,
	      property = meta.property,
	      name = meta.name;

	  if (id) {
	    return id && head.querySelector('#' + id);
	  } else if (name) {
	    return filterOutMetaWithId(head.querySelectorAll('[name = "' + name + '"]'));
	  } else if (property) {
	    return filterOutMetaWithId(head.querySelectorAll('[property = "' + property + '"]'));
	  }

	  return null;
	}

	//function to append childrens on a parent
	function appendChild(parent, childrens) {

	  if (childrens.length === undefined) childrens = [childrens];

	  var docFrag = document.createDocumentFragment();

	  //we used for loop instead of forEach because childrens can be array like object
	  for (var i = 0, ln = childrens.length; i < ln; i++) {
	    docFrag.appendChild(childrens[i]);
	  }

	  parent.appendChild(docFrag);
	}

	function removeChild(parent, childrens) {
	  if (childrens.length === undefined) childrens = [childrens];
	  for (var i = 0, ln = childrens.length; i < ln; i++) {
	    parent.removeChild(childrens[i]);
	  }
	}

	//get dom as string format
	function getDomAsString(dom) {
	  var temp = document.createElement('div');
	  temp.appendChild(dom);
	  return temp.innerHTML;
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _meta_tags = __webpack_require__(9);

	var _meta_tags2 = _interopRequireDefault(_meta_tags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactTitle = function (_Component) {
	  _inherits(ReactTitle, _Component);

	  function ReactTitle() {
	    _classCallCheck(this, ReactTitle);

	    return _possibleConstructorReturn(this, (ReactTitle.__proto__ || Object.getPrototypeOf(ReactTitle)).apply(this, arguments));
	  }

	  _createClass(ReactTitle, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _meta_tags2.default,
	        null,
	        _react2.default.createElement(
	          'title',
	          null,
	          this.props.title
	        )
	      );
	    }
	  }]);

	  return ReactTitle;
	}(_react.Component);

	ReactTitle.propTypes = {
	  title: _propTypes2.default.string
	};
	exports.default = ReactTitle;

/***/ })
/******/ ])
});
;