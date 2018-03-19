import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/state'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import SignInContainer from './components/SignIn/SignInContainer'
import SignUpContainer from './components/SignUp/SignUpContainer'
import ForgotPasswordContainer from './components/ForgotPassword/ForgotPasswordContainer'
import ForgotEmailContainer from './components/ForgotEmail/ForgotEmailContainer'
import MainLayoutContainer from './components/MainLayout/MainLayoutContainer'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="signIn" component={SignInContainer} />
        <Route path="signUp" component={SignUpContainer} />
        <Route path="forgotPassword" component={ForgotPasswordContainer} />
        <Route path="forgotEmail" component={ForgotEmailContainer} />
        <Route path="main" component={MainLayoutContainer}>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
