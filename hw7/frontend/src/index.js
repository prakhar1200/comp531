

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import {persistStore, autoRehydrate} from 'redux-persist'

import App from './app'
import Reducer from './reducers'


const store = createStore(Reducer, undefined, autoRehydrate());
persistStore(store)


ReactDOM.render(
          <Provider store = {store}>
          		<App /> 
                    
          </Provider>
, document.getElementById('app')
);


