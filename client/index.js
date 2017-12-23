import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

// import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
// import Home from './components/Home';
// import Dashboard from './components/Dashboard';

import './style.scss';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
