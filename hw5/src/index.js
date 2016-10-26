

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, Route, browserHistory, hashHistory } from 'react-router';

import App from './app'
import Reducer from './reducers'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger));

ReactDOM.render(
          <Provider store={ store}>
                    <App />
          </Provider>
, document.getElementById('app')
);


