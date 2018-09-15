"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MetaTagsServer() {
  var headElms = [];
  return {
    extract: function extract(elms) {
      headElms.push(elms);
    },
    renderToString: function renderToString() {
      var headComponent = _react.default.createElement("div", {
        className: "react-head-temp"
      }, headElms);

      var componentStr = _server.default.renderToStaticMarkup(headComponent); //remove wrapper div from string


      componentStr = componentStr.replace(/^<div[^<>]*class="react-head-temp"[^<>]*>(.*)<\/div>$/, function ($1, $2) {
        return $2;
      });

      var _extractMetaAndTitle = (0, _utils.extractMetaAndTitle)(componentStr),
          _extractMetaAndTitle$ = _extractMetaAndTitle.title,
          title = _extractMetaAndTitle$ === void 0 ? '' : _extractMetaAndTitle$,
          metas = _extractMetaAndTitle.metas,
          _extractMetaAndTitle$2 = _extractMetaAndTitle.canonicalLink,
          canonicalLink = _extractMetaAndTitle$2 === void 0 ? '' : _extractMetaAndTitle$2,
          rest = _extractMetaAndTitle.rest;

      var metasStr = (0, _utils.removeDuplicateMetas)(metas).map(function (meta) {
        return meta._tagString;
      }).join('');
      return "\n        ".concat(title, "\n        ").concat(metasStr, "\n        ").concat(canonicalLink, "\n        ").concat(rest, "\n      ");
    }
  };
}

module.exports = MetaTagsServer;