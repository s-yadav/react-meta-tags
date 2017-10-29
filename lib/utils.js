'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.extractMetaAndTitle = extractMetaAndTitle;
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
  var match = void 0;
  while ((match = attributesRegex.exec(tagString)) !== null) {
    attr[match[1]] = match[3] || match[4] || match[5];
  }

  return attr;
}

function extractMetaAndTitle(domString) {
  var title = void 0;
  var metas = [];
  var match = void 0;

  //extract title, only take the last title, remove title from the string
  domString = domString.replace(titleRegex, function (titleStr) {
    title = titleStr;
    return '';
  });

  //extract metas
  domString = domString.replace(metaRegex, function (tagString) {
    metas.push(_extends({}, getAttributes(tagString), { tagString: tagString }));
    return '';
  });

  return {
    title: title,
    metas: metas,
    rest: domString
  };
}