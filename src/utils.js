const metaRegex = /<meta[^<>]*?=(['"].*?['"]|[^<>]*?)*?\/?>/g;
const titleRegex = /<title[^<>]*?>(.*?)<\/title>/g;
const attributesRegex = /(\S*?)=("(.*?)"|'(.*?)'|([^<>\s]*))/g;

/**
  Note:
  1. In server side we will add meta tags and title at last after fitering
  2. In client we will match and replace meta tagString
  3. For now we will not support link and other tags properly, they can be added but we will not check for uniqueness and will not decide placement
**/

function getAttributes(tagString) {
  const attr = {};
  if (!tagString) return attr;
  let match = attributesRegex.exec(tagString);
  while (match !== null) {
    attr[match[1]] = match[3] || match[4] || match[5];
    match = attributesRegex.exec(tagString);
  }

  return attr;
}

function filterOutMetaWithId(metas) {
  metas = Array.from(metas || []);
  return metas.filter(meta => !meta.id);
}

export function extractMetaAndTitle(domString) {
  let title;
  const metas = [];

  //extract title, only take the last title, remove title from the string
  domString = domString.replace(titleRegex, (titleStr) => {
    title = titleStr;
    return '';
  });

  //extract metas
  domString = domString.replace(metaRegex, (_tagString) => {
    metas.push({...getAttributes(_tagString), _tagString});
    return '';
  });

  return {
    title,
    metas,
    rest: domString
  }
}

export function removeDuplicateMetas(metas) {
  const metaAddedProperties = {};
  const metaAddedNames = {};
  const metaAddedIds = {};

  const filteredMetas = [];
  for (let i = metas.length - 1; i >=0 ; i--) {
    const meta = metas[i];
    const {id, property, name} = meta;
    let addMeta = false;

    //if id is defined dont check any thing else
    if (id) {
      addMeta = !metaAddedIds[id];

    // if property key or name key is defined and its different add that,
    // But they should have different id

    } else if (property || name) {
      const existing = metaAddedProperties[property] || metaAddedNames[name];
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

export function getDuplicateTitle() {
  return document.head.querySelector('title');
}

export function getDuplicateMeta(meta) {
  const head = document.head;
  const {id, property, name} = meta;
  if (id) {
    return id && head.querySelector(`#${id}`);
  } else if (name) {
    return filterOutMetaWithId(head.querySelectorAll(`[name = "${name}"]`));
  } else if (property) {
    return filterOutMetaWithId(head.querySelectorAll(`[property = "${property}"]`));
  }

  return null;
}


//function to append childrens on a parent
export function appendChild(parent, childrens) {

  if (childrens.length === undefined) childrens = [childrens];

  const docFrag = document.createDocumentFragment();

  //we used for loop instead of forEach because childrens can be array like object
  for (let i = 0, ln = childrens.length; i < ln; i++) {
    docFrag.appendChild(childrens[i]);
  }

  parent.appendChild(docFrag);
}

export function removeChild(parent, childrens) {
  if (childrens.length === undefined) childrens = [childrens];
  for (let i = 0, ln = childrens.length; i < ln; i++) {
    parent.removeChild(childrens[i]);
  }
}

//get dom as string format
export function getDomAsString(dom) {
  const temp = document.createElement('div');
  temp.appendChild(dom);
  return temp.innerHTML;
}
