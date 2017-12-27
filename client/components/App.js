import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import Dashboard from './Dashboard';
import requireAuth from './requireAuth';

const App = props => (
  <div className="container">
    <Header props={props} />
    <div className="content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
      </Switch>
    </div>
  </div>
);

export default withRouter(App);
