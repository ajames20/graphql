import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class Header extends Component {
  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }

    if (user) {
      return <div>Logout</div>;
    }
    return <div>You're not signed in</div>;
  }

  render() {
    return (
      <header className="header">
        <nav className="header__nav">{this.renderButtons()}</nav>
      </header>
    );
  }
}

export default graphql(query)(Header);
