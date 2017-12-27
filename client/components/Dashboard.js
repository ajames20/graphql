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
      temperature: '',
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
    const uri = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3dc1508c16f644095ba9353d7b468a8/${lng},${lat}/`;
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
    let { icon, temperature } = weatherData.data.currently;
    let daily = weatherData.data.daily.data;

    temperature = `${Math.round(temperature)}°`;
    icon = icon.replace(/\-/g, '_').toUpperCase();

    this.setState({ summary, weatherIcon: icon, temperature, daily });
  }

  componentDidMount() {
    this.getLocation();
  }

  renderDay(arr) {
    if (!arr) {
      return (
        <Loader
          className="dashboard__current-location-panel-details--loader"
          color="#bbd2c5"
          size="56px"
          margin="0 auto"
        />
      );
    }
    return arr.map((day, i) => {
      const options = {
        weekday: 'long',
      };
      const dayDefaults = {
        icon: '',
        color: '#292e49',
        size: 50,
        animate: true,
      };
      const weekday = new Date(day.time * 1000)
        .toLocaleTimeString('en-us', options)
        .split(' ')[0];

      const min = `${Math.round(day.temperatureMin)}°`;
      const max = `${Math.round(day.temperatureMax)}°`;
      const dailyWeatherIcon = day.icon.replace(/\-/g, '_').toUpperCase();

      return (
        <div className="dashboard__location-panel--list">
          <li className="dashboard__location-panel--list-item" key={i}>
            {weekday}
          </li>
          <div className="dashboard__location-panel--list-temp">
            <span className="low">{min}</span>
            <span className="high"> {max}</span>
          </div>
          <div className="dashboard__location-panel--list-icon">
            <ReactAnimatedWeather
              icon={dailyWeatherIcon}
              size={dayDefaults.size}
              color={dayDefaults.color}
            />
          </div>
        </div>
      );
    });
  }

  render() {
    const defaults = {
      icon: '',
      color: '#292e49',
      size: 230,
      animate: true,
    };

    const {
      city,
      country,
      summary,
      weatherIcon,
      temperature,
      daily,
    } = this.state;
    const { icon, color, size, animate } = defaults;

    return (
      <div className="dashboard">
        <div className="dashboard__location-panel">
          <h2 className="dashboard__location-panel-header">Daily</h2>

          <ul>{this.renderDay(daily)}</ul>
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

          <p className="dashboard__current-location-panel-details--temperature">
            Currently: {temperature}
          </p>

          <p className="dashboard__current-location-panel-details--condition">
            Condition: {summary}
          </p>
        </div>
      </div>
    );
  }
}

export default graphql(query)(Dashboard);
