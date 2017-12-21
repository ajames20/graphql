import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import LocationForm from './LocationForm';
import mutation from '../mutations/Logout';

class Header extends Component {
  logOut() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li key="1" className="header__nav-list-item">
          <a className="header__nav-list-item--link" onClick={this.logOut.bind(this)} to="/logout">
            Logout
          </a>
        </li>
      );
    }

    return [
      <li key="2" className="header__nav-list-item">
        <Link className="header__nav-list-item--link" to="/signup">
          Sign Up
        </Link>
      </li>,
      <li key="3" className="header__nav-list-item">
        <Link className="header__nav-list-item--link" to="/login">
          Log In
        </Link>
      </li>,
    ];
  }

  render() {
    return (
      <header className="header">
        <LocationForm />
        <nav className="header__nav">
          <ul className="header__nav-list">
            {this.renderButtons()}
            <li key="0" className="header__nav-list-item">
              <Link className="header__nav-list-item--link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
