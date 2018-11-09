import React from 'react';
import ReactDomServer from 'react-dom/server';
import {filterAndArrangeTags} from './utils';

function MetaTagsServer(){
  let headElms = [];

  return {
    extract(elms) {
      if (!(elms instanceof Array)) {
        elms = [elms];
      }
      
      //filter out null nodes
      elms = elms.filter(elm => !!elm);

      headElms = headElms.concat(elms);
    },
    renderToString() {
      const filteredElms = filterAndArrangeTags(headElms);
      const headComponent = <div className="react-head-temp">{filteredElms}</div>;
      let componentStr = ReactDomServer.renderToStaticMarkup(headComponent);

      //remove wrapper div from string
      componentStr = componentStr.replace(/^<div[^<>]*class="react-head-temp"[^<>]*>(.*)<\/div>$/, ($1, $2) => {
        return $2;
      });

      return componentStr;
    },
    getTags() {
      return filterAndArrangeTags(headElms);
    }
  }
}

export default MetaTagsServer;
