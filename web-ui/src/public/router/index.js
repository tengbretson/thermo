import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Main from '../components/main';

const Root = props => <div>hello world</div>;
const Boot = props => <div>Boot</div>;

export const routes = (
  <Route path='/'>
    <IndexRoute component={Main} />
    <Route path='/boot' component={Boot} />
  </Route>
);
