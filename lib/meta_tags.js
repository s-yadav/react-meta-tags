'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

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