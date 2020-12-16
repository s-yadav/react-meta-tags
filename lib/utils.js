"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterAndArrangeTags = filterAndArrangeTags;
exports.getDuplicateTitle = getDuplicateTitle;
exports.getDuplicateCanonical = getDuplicateCanonical;
exports.getDuplicateElementById = getDuplicateElementById;
exports.getDuplicateMeta = getDuplicateMeta;
exports.appendChild = appendChild;
exports.removeChild = removeChild;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var camelCaseProps = ['itemProp'];
var uniqueIdentifiersI = ['property', 'name', 'itemprop'];
var uniqueIdentifiers = uniqueIdentifiersI.concat(camelCaseProps); //case sensitive props is defined in case anyone defined the lowercase prop

var uniqueIdentifiersAll = uniqueIdentifiers.concat(['id']);
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

function filterAndArrangeTags(headElms) {
  var title = null;
  var canonicalLink = null;
  var metas = [];
  var rest = [];
  headElms.forEach(function (elm) {
    var type = elm.type,
        props = elm.props;

    if (type === 'title') {
      title = elm;
    } else if (type === 'link' && props.rel === 'canonical') {
      canonicalLink = elm;
    } else if (type === 'meta') {
      metas.push(elm);
    } else {
      rest.push(elm);
    }
  });
  return [title].concat(_toConsumableArray(removeDuplicateMetas(metas)), [canonicalLink], rest);
}

function removeDuplicateMetas(metas) {
  var addedMeta = {}; //initialize all the identifiers with empty array

  uniqueIdentifiersAll.forEach(function (identifier) {
    addedMeta[identifier] = [];
  });
  var filteredMetas = [];

  var _loop = function _loop(i) {
    var meta = metas[i];
    var id = meta.props.id;
    var addMeta = false; //if has id and element with id is not present than always add meta

    if (id) {
      addMeta = !addedMeta.id[id]; //for any other unique identifier check if meta already available with same identifier which doesn't have id
    } else {
      addMeta = uniqueIdentifiers.filter(function (identifier) {
        var identifierValue = meta.props[identifier];
        var existing = addedMeta[identifier][identifierValue];
        return existing && !existing.props.id;
      }).length === 0;
    }

    if (addMeta) {
      filteredMetas.unshift(meta); //add meta as added

      uniqueIdentifiersAll.forEach(function (identifier) {
        var identifierValue = meta.props[identifier];
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