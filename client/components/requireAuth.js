import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

export default function HOX(WrappedComponent) {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      const { user, loading } = nextProps.data;

      if (!user && !loading) {
        // redirect to login if not
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(query)(RequireAuth);
}
