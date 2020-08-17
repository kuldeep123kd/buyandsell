import React from 'react';
import { Route, Switch } from "react-router-dom";

import ScrollToTop from './ScrollToTop';
import HomePage from '../Frontend/containers/HomePage/HomePage';
// import LoginForm from './components/LoginForm/LoginForm';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';


class Routes extends React.Component {

  render () {
    return (
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </ScrollToTop>
    )
  }
}

export default Routes;