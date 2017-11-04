import React from 'react';
import MetaTags from '../../../src/index';

function PageDummy() {
  return (
    <MetaTags>
      <title>React Meta Tags | Page Dummy</title>
      <meta name="description" content="Dummy description" />
    </MetaTags>
  )
}

class Page1 extends React.Component {
  render() {
    return (
      <div className="page1">
        <MetaTags>
          <title>React Meta Tags | Page1</title>
          <meta name="description" content="React meta tags handles document meta/head tags in isomorphic react with ease." />
        </MetaTags>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    )
  }
}

export default Page1;
