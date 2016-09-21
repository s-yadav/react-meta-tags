'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MetaTagsServer() {
  var headElms = [];
  return {
    extract: function extract(elms) {
      headElms.push(elms);
    },
    renderToString: function renderToString() {
      var headComponent = _react2.default.createElement(
        'div',
        { className: 'react-head-temp' },
        headElms
      );
      var componentStr = _server2.default.renderToStaticMarkup(headComponent);

      //remove wrapper div from string
      componentStr = componentStr.replace(/^<div[^<>]*class="react-head-temp"[^<>]*>(.*)<\/div>$/, function ($1, $2) {
        return $2;
      });

      return componentStr;
    }
  };
}

module.exports = MetaTagsServer;
