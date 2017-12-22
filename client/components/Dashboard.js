import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import Loader from 'halogen/ClipLoader';
import axios from 'axios';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      country: '',
      weatherIcon: undefined,
      summary: '',
    };
  }

  getLocation() {
    const ipAddress = 'http://ip-api.com/json';

    axios
      .get(ipAddress)
      .then(response => {
        const lng = response.data.longitude;
        const lat = response.data.latitude;
        this.getWeather(lat, lng);
        const { city, country } = response.data;

        this.setState({ city, country });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getWeather() {
    const uri =
      'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3dc1508c16f644095ba9353d7b468a8/60.1674,24.9426/';
    axios
      .get(uri)
      .then(weatherData => {
        this.displayWeather(weatherData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  displayWeather(weatherData) {
    const { summary } = weatherData.data.currently;
    let { icon } = weatherData.data.currently;

    icon = icon.replace(/\-/g, '_').toUpperCase();

    this.setState({ summary, weatherIcon: icon });
  }

  componentWillMount() {
    this.getLocation();
  }

  render() {
    const { user } = this.props.data;

    if (!user) {
      hashHistory.push('/');
    }

    const defaults = {
      icon: '',
      color: '#bbd2c5',
      size: 246,
      animate: true,
    };

    const { city, country, summary, weatherIcon } = this.state;
    const { icon, color, size, animate } = defaults;

    return (
      <div className="dashboard">
        <div className="dashboard__location-panel">
          <h2>Locations</h2>
        </div>
        <div className="dashboard__current-location-panel">
          <div className="dashboard__current-location-panel--header">
            <p className="dashboard__current-location-panel--city">{city}</p>
            <p className="dashboard__current-location-panel--country">
              {country}
            </p>
          </div>

          <div className="dashboard__current-location-panel-details" />
          {!weatherIcon ? (
            <Loader
              className="dashboard__current-location-panel-details--loader"
              color="#bbd2c5"
              size="56px"
              margin="0 auto"
            />
          ) : (
            <ReactAnimatedWeather
              className="dashboard__current-location-panel-details--icon"
              icon={weatherIcon}
              color={color}
              size={size}
              animate={animate}
            />
          )}
          <p className="dashboard__current-location-panel-details--summary">
            {summary}
          </p>
        </div>
      </div>
    );
  }
}

export default graphql(query)(Dashboard);
