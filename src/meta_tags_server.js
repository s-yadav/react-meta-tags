import React from 'react';
import ReactDomServer from 'react-dom/server';
import {extractMetaAndTitle, removeDuplicateMetas} from './utils';

function MetaTagsServer(){
  const headElms = [];

  return {
    extract: function(elms){
      headElms.push(elms);
    },
    renderToString: function(){
      const headComponent = <div className="react-head-temp">{headElms}</div>;
      let componentStr = ReactDomServer.renderToStaticMarkup(headComponent);

      //remove wrapper div from string
      componentStr = componentStr.replace(/^<div[^<>]*class="react-head-temp"[^<>]*>(.*)<\/div>$/, ($1, $2) => {
        return $2;
      });

      const {title, metas, rest} = extractMetaAndTitle(componentStr);

      const metasStr = removeDuplicateMetas(metas).map(meta => meta._tagString).join('');

      return `
        ${title}
        ${metasStr}
        ${rest}
      `;
    }
  }
}

module.exports = MetaTagsServer;
