import React from 'react';
import {Router, Route, IndexRoute } from 'react-router';

import App from './index';
import Page1 from './page1/page1';
import Page2 from './page2/page2';

const AppRoute = (
  <Router component={App}>
    <IndexRoute component={Page1}/>
    <Route path="page1" component={Page1}/>
    <Route path="page2" component={Page2}/>
  </Router>
);

export default AppRoute;
