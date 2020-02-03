import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from "./views/home/index.js";
import Cat from "./views/cat/index.js";
const hist = createBrowserHistory();

function Routes() {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:cat" component={Cat} />
      </Switch>
    </Router>
  );
}

export default Routes;
