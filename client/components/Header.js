import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
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

  renderHeader() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return [
        <LocationForm key="location-form" />,
        <li key="1" className="header__nav-list-item">
          <a
            className="header__nav-list-item--link"
            onClick={this.logOut.bind(this)}
            to="/logout"
          >
            Logout
          </a>
        </li>,
      ];
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
    const defaults = {
      icon: 'PARTLY_CLOUDY_DAY',
      color: '#536976',
      size: 46,
      animate: true,
    };

    return (
      <header className="header">
        <div className="header__logo">
          <Link className="header__nav-list-item--logo" to="/">
            <ReactAnimatedWeather
              icon={defaults.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </Link>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">{this.renderHeader()}</ul>
        </nav>
      </header>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
