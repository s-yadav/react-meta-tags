/**
 * react-meta-tags - 1.0.1
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016, 2020 to Sudhanshu Yadav, released under the MIT license.
 * https://github.com/s-yadav/react-meta-tags
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (factory((global.MetaTags = {}),global.React,global.ReactDOM));
}(this, (function (exports,React,ReactDOM) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var MetaContext = React.createContext({});
  /** context class which passes extract fuunction to MetaTags Component **/

  var MetaContextProviderWrapper =
  /*#__PURE__*/
  function (_Component) {
    _inherits(MetaContextProviderWrapper, _Component);

    function MetaContextProviderWrapper() {
      _classCallCheck(this, MetaContextProviderWrapper);

      return _possibleConstructorReturn(this, _getPrototypeOf(MetaContextProviderWrapper).apply(this, arguments));
    }

    _createClass(MetaContextProviderWrapper, [{
      key: "render",
      value: function render() {
        return React__default.createElement(MetaContext.Provider, {
          value: {
            extract: this.props.extract
          }
        }, React.Children.only(this.props.children));
      }
    }]);

    return MetaContextProviderWrapper;
  }(React.Component);

  var uniqueIdentifiersI = ['property', 'name', 'itemprop'];
  /**
    Note:
    1. In server side we will add meta tags and title at last after fitering
    2. In client we will match and replace meta tagString
    3. For now we will not support link and other tags properly, they can be added but we will not check for uniqueness and will not decide placement
  **/

  function filterOutMetaWithId(metas) {
    metas = Array.prototype.slice.call(metas || []);
    return metas.filter(function (meta) {
      return !meta.id;
    });
  }

  function getDuplicateTitle() {
    return document.head.querySelectorAll('title');
  }
  function getDuplicateCanonical() {
    return document.head.querySelectorAll('link[rel="canonical"]');
  }
  function getDuplicateElementById(_ref) {
    var id = _ref.id;
    return id && document.head.querySelector("#".concat(id));
  }
  function getDuplicateMeta(meta) {
    var head = document.head; //for any other unique identifier check if metas already available with same identifier which doesn't have id

    return uniqueIdentifiersI.reduce(function (duplicates, identifier) {
      var identifierValue = meta.getAttribute(identifier);
      return identifierValue ? duplicates.concat(filterOutMetaWithId(head.querySelectorAll("[".concat(identifier, " = \"").concat(identifierValue, "\"]")))) : duplicates;
    }, []);
  } //function to append childrens on a parent

  function appendChild(parent, childrens) {
    if (childrens.length === undefined) childrens = [childrens];
    var docFrag = document.createDocumentFragment(); //we used for loop instead of forEach because childrens can be array like object

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

  /** An wrapper component to wrap element which need to shifted to head **/

  var MetaTags =
  /*#__PURE__*/
  function (_Component) {
    _inherits(MetaTags, _Component);

    function MetaTags() {
      _classCallCheck(this, MetaTags);

      return _possibleConstructorReturn(this, _getPrototypeOf(MetaTags).apply(this, arguments));
    }

    _createClass(MetaTags, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.temporaryElement = document.createElement('div');
        this.handleChildrens();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(oldProps) {
        if (oldProps.children !== this.props.children) {
          this.handleChildrens();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.temporaryElement) {
          ReactDOM.unmountComponentAtNode(this.temporaryElement);
        }
      }
    }, {
      key: "extractChildren",
      value: function extractChildren() {
        var extract = this.context.extract;
        var children = this.props.children;

        if (!children) {
          return;
        }

        if (extract) {
          extract(children);
        }
      }
    }, {
      key: "handleChildrens",
      value: function handleChildrens() {
        var _this = this;

        var children = this.props.children;

        if (this.context.extract || !children) {
          return;
        }

        var headComponent = React__default.createElement("div", {
          className: "react-head-temp"
        }, children);
        ReactDOM.render(headComponent, this.temporaryElement, function () {
          var childStr = _this.temporaryElement.innerHTML; //if html is not changed return

          if (_this.lastChildStr === childStr) {
            return;
          }

          _this.lastChildStr = childStr;

          var tempHead = _this.temporaryElement.querySelector('.react-head-temp'); // .react-head-temp might not exist when triggered from async action


          if (tempHead === null) {
            return;
          }

          var childNodes = Array.prototype.slice.call(tempHead.children);
          var head = document.head;
          var headHtml = head.innerHTML; //filter children remove if children has not been changed

          childNodes = childNodes.filter(function (child) {
            return headHtml.indexOf(child.outerHTML) === -1;
          }); //create clone of childNodes

          childNodes = childNodes.map(function (child) {
            return child.cloneNode(true);
          }); //remove duplicate title and meta from head

          childNodes.forEach(function (child) {
            var tag = child.tagName.toLowerCase();

            if (tag === 'title') {
              var title = getDuplicateTitle();
              if (title) removeChild(head, title);
            } else if (child.id) {
              // if the element has id defined remove the existing element with that id
              var elm = getDuplicateElementById(child);
              if (elm) removeChild(head, elm);
            } else if (tag === 'meta') {
              var meta = getDuplicateMeta(child);
              if (meta) removeChild(head, meta);
            } else if (tag === 'link' && child.rel === 'canonical') {
              var link = getDuplicateCanonical(child);
              if (link) removeChild(head, link);
            }
          });
          appendChild(document.head, childNodes);
        });
      }
    }, {
      key: "render",
      value: function render() {
        this.extractChildren();
        return null;
      }
    }]);

    return MetaTags;
  }(React.Component);

  _defineProperty(MetaTags, "contextType", MetaContext);

  var ReactTitle =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ReactTitle, _Component);

    function ReactTitle() {
      _classCallCheck(this, ReactTitle);

      return _possibleConstructorReturn(this, _getPrototypeOf(ReactTitle).apply(this, arguments));
    }

    _createClass(ReactTitle, [{
      key: "render",
      value: function render() {
        return React__default.createElement(MetaTags, null, React__default.createElement("title", null, this.props.title));
      }
    }]);

    return ReactTitle;
  }(React.Component);

  exports.default = MetaTags;
  exports.MetaTags = MetaTags;
  exports.MetaTagsContext = MetaContextProviderWrapper;
  exports.ReactTitle = ReactTitle;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
