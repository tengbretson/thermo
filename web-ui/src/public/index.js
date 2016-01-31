import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { syncHistory, routeReducer as routing } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import { Provider } from 'react-redux';

import { routes } from './router';
import reducers from './reducers';

const history = createHistory();
const reducer = combineReducers({ ...reducers, routing });
const reduxRouterMiddleware = syncHistory(history);
const store = applyMiddleware(reduxRouterMiddleware)(createStore)(reducer);

reduxRouterMiddleware.listenForReplays(store);

const App = () => (
  <Provider store={store}>
    <Router history={history}>{ routes }</Router>
  </Provider>
);

render(<App />, document.querySelector('main'));
