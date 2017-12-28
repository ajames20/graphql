import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import { graphql } from 'react-apollo';
import { NavLink, Link, withRouter } from 'react-router-dom';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  logOut() {
    const { user } = this.props.data;
    this.props
      .mutate({
        variables: { user },
        refetchQueries: [{ query }],
      })
      .then(() => {
        this.props.history.push('/login');
      });
  }

  renderHeader() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return [
        <li key="0" className="header__nav-list-item">
          <NavLink
            activeStyle={{
              fontWeight: '600',
              color: '#536976',
              textDecoration: 'underline',
            }}
            className="header__nav-list-item--link"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>,
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
      color: '#292e49',
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

        <div className="header__heading">
          <h1 className="header__heading--text">WeeklyWeather</h1>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">{this.renderHeader()}</ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(graphql(query)(graphql(mutation)(Header)));
