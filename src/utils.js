const metaRegex = /<meta[^<>]*?=(['"].*?['"]|[^<>]*?)*?\/?>/g;
const canonicalLinkRegex = /<link[^<>]*?rel=['"]canonical['"].*?(\/>|<\/link>)/g;
const titleRegex = /<title[^<>]*?>(.*?)<\/title>/g;
const attributesRegex = /(\S*?)=("(.*?)"|'(.*?)'|([^<>\s]*))/g;
const uniqueIdentifiers = ['property', 'name', 'itemprop'];
const uniqueIdentifiersAll = uniqueIdentifiers.concat(['id']);

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
    attr[match[1].toLowerCase()] = match[3] || match[4] || match[5];
    match = attributesRegex.exec(tagString);
  }

  return attr;
}

function filterOutMetaWithId(metas) {
  metas = Array.prototype.slice.call(metas || []);
  return metas.filter(meta => !meta.id);
}

export function extractMetaAndTitle(domString) {
  let title, canonicalLink;
  const metas = [];

  //extract title, only take the last title, remove title from the string
  domString = domString.replace(titleRegex, (titleStr) => {
    title = titleStr;
    return '';
  });


  //extract canonical
  domString = domString.replace(canonicalLinkRegex, (canonicalLinkStr) => {
    canonicalLink = canonicalLinkStr;
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
    canonicalLink,
    rest: domString
  }
}

export function removeDuplicateMetas(metas) {
  const addedMeta = {};
  
  //initialize all the identifiers with empty array
  uniqueIdentifiersAll.forEach((identifier) => {
    addedMeta[identifier] = [];
  });

  const filteredMetas = [];
  for (let i = metas.length - 1; i >=0 ; i--) {
    const meta = metas[i];

    const { id } = meta;
    let addMeta = false;

    //if has id and element with id is not present than always add meta
    if (id) {
      addMeta = !addedMeta.id[id];

    //for any other unique identifier check if meta already available with same identifier which doesn't have id
    } else {
      addMeta = uniqueIdentifiers.filter((identifier) => {
        const existing = addedMeta[identifier][meta[identifier]];
        return existing && !existing.id;
      }).length === 0;
    }

    if (addMeta) {
      filteredMetas.unshift(meta);

      //add meta as added 
      uniqueIdentifiersAll.forEach((identifier) => {
        const identifierValue = meta[identifier];
        if (identifierValue) addedMeta[identifier][identifierValue] = meta; 
      });
    }
  }

  return filteredMetas;
}

export function getDuplicateTitle() {
  return document.head.querySelectorAll('title');
}

export function getDuplicateCanonical() {
  return document.head.querySelectorAll('link[rel="canonical"]');
}

export function getDuplicateMeta(meta) {
  const head = document.head;
  const { id } = meta;

  //if has id and element with id is not present than return the element
  if (id) {
    return id && head.querySelector(`#${id}`);
  } 

  //for any other unique identifier check if metas already available with same identifier which doesn't have id
  return uniqueIdentifiers.reduce((duplicates, identifier) => {
    const identifierValue = meta.getAttribute(identifier);
    return (identifierValue ? 
      duplicates.concat(filterOutMetaWithId(head.querySelectorAll(`[${identifier} = "${identifierValue}"]`))) :
      duplicates);
  }, []);
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
