# react-meta-tags
Handle document meta/head tags in isomorphic react with ease.

Handling title and meta/head tags in a isomporhic react is tricky. Its declarative to define those tags within the component, but they need to be moved on document head on client side as well as server side. While there are other modules which helps with the use-case like <a href="https://github.com/nfl/react-helmet" target="_blank">react-helmet</a> and  <a href="https://github.com/kodyl/react-document-meta" target="_blank">react-document-meta</a>, but they require to define those tags in a object literal. react-meta-tags allow you to write those tags in a declarative way and in normal jsx format.

### Install
Through npm
`npm install react-meta-tags --save`

Or get compiled development and production version from ./dist

### Usage

#### Using MetaTag Component

```jsx
import React from 'react';
import MetaTags from 'react-meta-tags';

class Component1 extends React.Component {
  render() {
    return (
        <div class="wrapper">
          <MetaTags>
            <title>Page 1</title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
          <div class="content"> Some Content </div>
        </div>
      )
  }
}
```
Note : Define id on tags so if you navigate to other page, older meta tags will be removed and replaced by new ones.


#### ReactTitle Component
If you just want to add title on a page you can use ReactTitle instead.
```jsx
import React from 'react';
import {ReactTitle} from 'react-meta-tags';

class Component2 extends React.Component {
  render() {
    return (
        <div class="wrapper">
          <ReactTitle title="Page 2"/>
          <div class="content"> Some Content </div>
        </div>
      )
  }
}
```

### Server Usage Example

```jsx
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';
/** Import other required modules **/

/*
------
  some serve specific code
------
*/

app.use((req, res) => {
    //make sure you get a new metatags instance for each request
    const metaTagsInstance = MetaTagsServer();

    //react router match
    match({
      routes, location: req.url
    }, (error, redirectLocation, renderProps) => {
      let reactString;

      try{
        reactString = ReactDomServer.renderToString(
        <Provider store={store}> {/*** If you are using redux ***/}
        {/* You have to pass extract method through MetaTagsContext so it can catch meta tags */}
          <MetaTagsContext extract = {metaTagsInstance.extract}>
            <RouterContext {...renderProps}/>
          </MetaTagsContext>
        </Provider>
        );
      }
      catch(e){
        res.status(500).send(e.stack);
        return;
      }

      //get all title and metatags as string
      const meta = metaTagsInstance.renderToString();

      //append metatag string to your template
      const template = (`
        <!doctype html>
        <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          ${meta}
        </head>
        <body>
          <div id="content">
            ${reactString}
          </div>
        </body>  
      `);

      res.status(200).send(template);
    });
});
```

So as per above code we have to do following for server rendering

1. Import MetaTagsServer and MetaTagsContext
2. Create a new instance of MetaTagsServer
3. Wrap your component inside MetaTagsContext and pass extract method as props
4. Extract meta string using renderToString of MetaTagsServer instance
5. Append meta string to your html template.

## Meta Tag Uniqueness
- The module uniquely identifies meta tag by id / property / name attribute.
- Multiple meta tags with same property / name is valid in html. If you need such case. Define a different id to both so that it can be uniquely differentiate.
- You should give an id if meta key is different then property/name to uniquely identify them.
