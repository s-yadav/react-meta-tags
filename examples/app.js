import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import MetaTagsServer from '../src/meta_tags_server';
import {MetaTagsContext} from '../src/index';

import routes from './shared/routes';

const app = express();

app.use((req, res) => {
  match({
      routes, location: req.url
    }, (error, redirectLocation, renderProps) => {
      if(error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
          let reactString;

          const metaTagsInstance = MetaTagsServer();

          try{
            reactString = ReactDomServer.renderToString(
              <MetaTagsContext extract = {metaTagsInstance.extract}>
                <RouterContext {...renderProps}/>
              </MetaTagsContext>
            );
          }
          catch(e){
            console.log(e);
            res.status(500).send(e.stack);
            return;
          }

          const metaString = metaTagsInstance.renderToString();
          const metaComponents = metaTagsInstance.toComponents();
          console.log(metaComponents);

          const template = `
            <html lang="en">
            <head>
              <meta charSet="utf-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta http-equiv="x-ua-compatible" content="ie=edge">

              ${metaString}
              <!-- Bootstrap CSS -->
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous">

            </head>
            <body>
              <div id="app">${reactString}</div>
              <script src="http://localhost:9000/bundle.js"></script>
            </body>
          `;
          const Html = (<html lang="en">
            <head>
              <meta charSet="utf-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <meta http-equiv="x-ua-compatible" content="ie=edge" />
              {metaComponents}
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous" />
            </head>
            <body>
              <div id="app" dangerouslySetInnerHTML={{__html: reactString}} />
              <script src="http://localhost:9000/bundle.js"></script>
            </body>
          </html>)

        //res.status(200).send(`<!doctype html>${template}`)
        const htmlMarkup = ReactDomServer.renderToStaticMarkup(Html)
        res.status(200).send(`<!doctype html>${htmlMarkup}`)
      } else {
        console.log('redirected');
        res.status(301).redirect('/')
      }
    });
});

app.listen(8070, function() {
  console.log('Listening on 8070');
})
