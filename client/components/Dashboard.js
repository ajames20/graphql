import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import Loader from 'halogen/ClipLoader';
import axios from 'axios';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

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
    const ipAddress = 'http://freegeoip.net/json/';

    axios
      .get(ipAddress)
      .then(response => {
        const lng = response.data.longitude;
        const lat = response.data.latitude;

        const { city, country_name } = response.data;
        this.setState({ city, country: country_name });
        this.getWeather(lng, lat);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getWeather(lat, lng) {
    const uri = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3dc1508c16f644095ba9353d7b468a8/${lat},${lng}/`;
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

  componentDidMount() {
    const { user } = this.props.data;

    if (!user) {
      // redirect to login if not
      this.props.history.push('/login');
    }
    this.getLocation();
  }

  render() {
    const defaults = {
      icon: '',
      color: '#292e49',
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
