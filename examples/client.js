//to let webpack know the assetPath
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, match, browserHistory } from 'react-router';

import routes from './shared/routes';

const dest = document.getElementById('app');


match({ routes:patchedRoutes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
      <Router {...renderProps} />
  , dest);
})
