'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** An wrapper component to wrap element which need to shifted to head **/
var MetaTags = function (_Component) {
  (0, _inherits3.default)(MetaTags, _Component);

  function MetaTags() {
    (0, _classCallCheck3.default)(this, MetaTags);
    return (0, _possibleConstructorReturn3.default)(this, (MetaTags.__proto__ || (0, _getPrototypeOf2.default)(MetaTags)).apply(this, arguments));
  }

  (0, _createClass3.default)(MetaTags, [{
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
          } else if (tag === 'link' && child.rel === 'canonical') {
            var link = (0, _utils.getDuplicateCanonical)(child);
            if (link) (0, _utils.removeChild)(head, link);
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