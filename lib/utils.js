"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractMetaAndTitle = extractMetaAndTitle;
exports.removeDuplicateMetas = removeDuplicateMetas;
exports.getDuplicateTitle = getDuplicateTitle;
exports.getDuplicateCanonical = getDuplicateCanonical;
exports.getDuplicateMeta = getDuplicateMeta;
exports.appendChild = appendChild;
exports.removeChild = removeChild;
exports.getDomAsString = getDomAsString;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var metaRegex = /<meta[^<>]*?=(['"].*?['"]|[^<>]*?)*?\/?>/g;
var canonicalLinkRegex = /<link[^<>]*?rel=['"]canonical['"].*?(\/>|<\/link>)/g;
var titleRegex = /<title[^<>]*?>(.*?)<\/title>/g;
var attributesRegex = /(\S*?)=("(.*?)"|'(.*?)'|([^<>\s]*))/g;
var uniqueIdentifiers = ['property', 'name', 'itemprop'];
var uniqueIdentifiersAll = uniqueIdentifiers.concat(['id']);
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
    attr[match[1].toLowerCase()] = match[3] || match[4] || match[5];
    match = attributesRegex.exec(tagString);
  }

  return attr;
}

function filterOutMetaWithId(metas) {
  metas = Array.prototype.slice.call(metas || []);
  return metas.filter(function (meta) {
    return !meta.id;
  });
}

function extractMetaAndTitle(domString) {
  var title, canonicalLink;
  var metas = []; //extract title, only take the last title, remove title from the string

  domString = domString.replace(titleRegex, function (titleStr) {
    title = titleStr;
    return '';
  }); //extract canonical

  domString = domString.replace(canonicalLinkRegex, function (canonicalLinkStr) {
    canonicalLink = canonicalLinkStr;
    return '';
  }); //extract metas

  domString = domString.replace(metaRegex, function (_tagString) {
    metas.push(_objectSpread({}, getAttributes(_tagString), {
      _tagString: _tagString
    }));
    return '';
  });
  return {
    title: title,
    metas: metas,
    canonicalLink: canonicalLink,
    rest: domString
  };
}

function removeDuplicateMetas(metas) {
  var addedMeta = {}; //initialize all the identifiers with empty array

  uniqueIdentifiersAll.forEach(function (identifier) {
    addedMeta[identifier] = [];
  });
  var filteredMetas = [];

  var _loop = function _loop(i) {
    var meta = metas[i];
    var id = meta.id;
    var addMeta = false; //if has id and element with id is not present than always add meta

    if (id) {
      addMeta = !addedMeta.id[id]; //for any other unique identifier check if meta already available with same identifier which doesn't have id
    } else {
      addMeta = uniqueIdentifiers.filter(function (identifier) {
        var existing = addedMeta[identifier][meta[identifier]];
        return existing && !existing.id;
      }).length === 0;
    }

    if (addMeta) {
      filteredMetas.unshift(meta); //add meta as added 

      uniqueIdentifiersAll.forEach(function (identifier) {
        var identifierValue = meta[identifier];
        if (identifierValue) addedMeta[identifier][identifierValue] = meta;
      });
    }
  };

  for (var i = metas.length - 1; i >= 0; i--) {
    _loop(i);
  }

  return filteredMetas;
}

function getDuplicateTitle() {
  return document.head.querySelectorAll('title');
}

function getDuplicateCanonical() {
  return document.head.querySelectorAll('link[rel="canonical"]');
}

function getDuplicateMeta(meta) {
  var head = document.head;
  var id = meta.id; //if has id and element with id is not present than return the element

  if (id) {
    return id && head.querySelector("#".concat(id));
  } //for any other unique identifier check if metas already available with same identifier which doesn't have id


  return uniqueIdentifiers.reduce(function (duplicates, identifier) {
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
} //get dom as string format


function getDomAsString(dom) {
  var temp = document.createElement('div');
  temp.appendChild(dom);
  return temp.innerHTML;
}