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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** context class which passes extract fuunction to MetaTags Component **/
var MetaTagsContext = function (_Component) {
  (0, _inherits3.default)(MetaTagsContext, _Component);

  function MetaTagsContext() {
    (0, _classCallCheck3.default)(this, MetaTagsContext);
    return (0, _possibleConstructorReturn3.default)(this, (MetaTagsContext.__proto__ || (0, _getPrototypeOf2.default)(MetaTagsContext)).apply(this, arguments));
  }

  (0, _createClass3.default)(MetaTagsContext, [{
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