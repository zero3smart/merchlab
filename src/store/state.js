import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
const reducer = combineReducers(reducers);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;
