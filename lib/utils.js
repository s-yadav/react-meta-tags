'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.extractMetaAndTitle = extractMetaAndTitle;
exports.removeDuplicateMetas = removeDuplicateMetas;
exports.getDuplicateTitle = getDuplicateTitle;
exports.getDuplicateMeta = getDuplicateMeta;
exports.appendChild = appendChild;
exports.removeChild = removeChild;
exports.getDomAsString = getDomAsString;
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
  var match = attributesRegex.exec(tagString);
  while (match !== null) {
    attr[match[1]] = match[3] || match[4] || match[5];
    match = attributesRegex.exec(tagString);
  }

  return attr;
}

function filterOutMetaWithId(metas) {
  metas = Array.from(metas || []);
  return metas.filter(function (meta) {
    return !meta.id;
  });
}

function extractMetaAndTitle(domString) {
  var title = void 0;
  var metas = [];

  //extract title, only take the last title, remove title from the string
  domString = domString.replace(titleRegex, function (titleStr) {
    title = titleStr;
    return '';
  });

  //extract metas
  domString = domString.replace(metaRegex, function (_tagString) {
    metas.push(_extends({}, getAttributes(_tagString), { _tagString: _tagString }));
    return '';
  });

  return {
    title: title,
    metas: metas,
    rest: domString
  };
}

function removeDuplicateMetas(metas) {
  var metaAddedProperties = {};
  var metaAddedNames = {};
  var metaAddedIds = {};

  var filteredMetas = [];
  for (var i = metas.length - 1; i >= 0; i--) {
    var meta = metas[i];
    var id = meta.id,
        property = meta.property,
        name = meta.name;

    var addMeta = false;

    //if id is defined dont check any thing else
    if (id) {
      addMeta = !metaAddedIds[id];

      // if property key or name key is defined and its different add that,
      // But they should have different id
    } else if (property || name) {
      var existing = metaAddedProperties[property] || metaAddedNames[name];
      addMeta = !existing || existing.id; //if existing have id and the current doesn't then keep it
    }

    if (id) metaAddedIds[id] = meta;
    if (property) metaAddedProperties[property] = meta;
    if (name) metaAddedNames[name] = meta;

    if (addMeta) {
      filteredMetas.push(meta);
    }
  }

  return filteredMetas;
}

function getDuplicateTitle() {
  return document.head.querySelector('title');
}

function getDuplicateMeta(meta) {
  var head = document.head;
  var id = meta.id,
      property = meta.property,
      name = meta.name;

  if (id) {
    return id && head.querySelector('#' + id);
  } else if (name) {
    return filterOutMetaWithId(head.querySelectorAll('[name = "' + name + '"]'));
  } else if (property) {
    return filterOutMetaWithId(head.querySelectorAll('[property = "' + property + '"]'));
  }

  return null;
}

//function to append childrens on a parent
function appendChild(parent, childrens) {

  if (childrens.length === undefined) childrens = [childrens];

  var docFrag = document.createDocumentFragment();

  //we used for loop instead of forEach because childrens can be array like object
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

//get dom as string format
function getDomAsString(dom) {
  var temp = document.createElement('div');
  temp.appendChild(dom);
  return temp.innerHTML;
}