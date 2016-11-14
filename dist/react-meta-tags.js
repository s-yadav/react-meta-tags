/*!
 * react-meta-tags - 0.1.3
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016 to Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ReactTitle = exports.MetaTagsContext = exports.MetaTags = undefined;

	var _meta_tags_context = __webpack_require__(2);

	var _meta_tags_context2 = _interopRequireDefault(_meta_tags_context);

	var _meta_tags = __webpack_require__(4);

	var _meta_tags2 = _interopRequireDefault(_meta_tags);

	var _react_title = __webpack_require__(6);

	var _react_title2 = _interopRequireDefault(_react_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _meta_tags2.default;
	exports.MetaTags = _meta_tags2.default;
	exports.MetaTagsContext = _meta_tags_context2.default;
	exports.ReactTitle = _react_title2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/** context class which passes extract fuunction to MetaTags Component **/
	var MetaTagsContext = function (_Component) {
	  _inherits(MetaTagsContext, _Component);

	  function MetaTagsContext() {
	    _classCallCheck(this, MetaTagsContext);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(MetaTagsContext).apply(this, arguments));
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
	  extract: _react.PropTypes.func
	};
	exports.default = MetaTagsContext;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(5);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//function to append childrens on a parent
	function appendChild(parent, childrens) {

	  if (childrens.length === undefined) childrens = [childrens];

	  var docFrag = document.createDocumentFragment();

	  for (var i = 0, ln = childrens.length; i < ln; i++) {
	    docFrag.appendChild(childrens[i]);
	  }

	  parent.appendChild(docFrag);
	}

	//get dom as string format
	function getDomAsString(dom) {
	  var temp = document.createElement('div');
	  temp.appendChild(dom);
	  return temp.innerHTML;
	}

	/** An wrapper component to wrap element which need to shifted to head **/

	var MetaTags = function (_Component) {
	  _inherits(MetaTags, _Component);

	  function MetaTags() {
	    _classCallCheck(this, MetaTags);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(MetaTags).apply(this, arguments));
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
	      _reactDom2.default.render(headComponent, temp);
	      var childStr = temp.innerHTML;

	      //if html is not changed return
	      if (this.lastChildStr === childStr) {
	        return;
	      }

	      this.lastChildStr = childStr;

	      var childNodes = Array.prototype.slice.call(temp.querySelector('.react-head-temp').children);

	      var head = document.head;
	      var headHtml = head.innerHTML;

	      //filter children remove if children has not been changed
	      childNodes = childNodes.filter(function (child) {
	        return headHtml.indexOf(getDomAsString(child)) === -1;
	      });

	      //remove title and elements from head tag having same id
	      childNodes.forEach(function (child) {
	        var elemInHead = !!child.id && head.querySelector('#' + child.id);
	        if (elemInHead) {
	          head.removeChild(elemInHead);
	        }

	        //remove title always
	        if (!elemInHead && child.tagName === 'TITLE') {
	          var title = head.querySelector('title');
	          if (title) {
	            head.removeChild(title);
	          }
	        }
	      });

	      appendChild(document.head, childNodes);
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
	  extract: _react.PropTypes.func
	};
	exports.default = MetaTags;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _meta_tags = __webpack_require__(4);

	var _meta_tags2 = _interopRequireDefault(_meta_tags);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactTitle = function (_Component) {
	  _inherits(ReactTitle, _Component);

	  function ReactTitle() {
	    _classCallCheck(this, ReactTitle);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactTitle).apply(this, arguments));
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

	exports.default = ReactTitle;

/***/ }
/******/ ])
});
;