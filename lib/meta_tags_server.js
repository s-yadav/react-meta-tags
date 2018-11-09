"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MetaTagsServer() {
  var headElms = [];
  return {
    extract: function extract(elms) {
      if (!(elms instanceof Array)) {
        elms = [elms];
      } //filter out null nodes


      elms = elms.filter(function (elm) {
        return !!elm;
      });
      headElms = headElms.concat(elms);
    },
    renderToString: function renderToString() {
      var filteredElms = (0, _utils.filterAndArrangeTags)(headElms);

      var headComponent = _react.default.createElement("div", {
        className: "react-head-temp"
      }, filteredElms);

      var componentStr = _server.default.renderToStaticMarkup(headComponent); //remove wrapper div from string


      componentStr = componentStr.replace(/^<div[^<>]*class="react-head-temp"[^<>]*>(.*)<\/div>$/, function ($1, $2) {
        return $2;
      });
      return componentStr;
    },
    getTags: function getTags() {
      return (0, _utils.filterAndArrangeTags)(headElms);
    }
  };
}

var _default = MetaTagsServer;
exports.default = _default;
module.exports = exports.default;