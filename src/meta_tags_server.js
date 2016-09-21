import React from 'react';
import ReactDomServer from 'react-dom/server';

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

      return componentStr;
    }
  }
}

module.exports = MetaTagsServer;
