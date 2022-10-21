import React from "react";
import citiesData from "../cities-fr";

const icons = ["wb_sunny", "cloud", "grain"];
const API_key = "9af22ea1ce8b20820de319524ea676ca";

export default class Weather extends React.Component {
  state = {
    selectValue: "Abbeville",
    currentTemp: "",
    foreCastArr: [],
    latitude: "50.099998", // for initial render
    longitude: "1.83333", // for initial render
    showProgressBar: false,
  };

  componentDidMount = () => {
    const { latitude, longitude } = this.state;
    this.fetchCurrentWeather(latitude, longitude, API_key);
  };

  fetchWeatherForecast = (lat, lon) => {
    const days = 3;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${"metric"}&cnt=${days}&appid=${API_key}`
    ).then((response) => {
      return response.json().then((data) => {
        this.setState({
          foreCastArr: data.list,
        });
      });
    });
  };

  fetchCurrentWeather = (lat, lon) => {
    this.setState({
      showProgressBar: true,
    });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${"metric"}&appid=${API_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          showProgressBar: false,
          currentTemp: data.main.temp,
        });
      });

    return this.fetchWeatherForecast(lat, lon);
  };

  renderprogress = () => {
    return (
      <>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  renderForcastDetails = () => {
    const { selectValue, currentTemp, foreCastArr } = this.state;
    const threeDaysForCast = foreCastArr.map((ele, index) => {
      return (
        <div>
          {ele.main.temp}
          <sup>o</sup>
        </div>
      );
    });
    const iconsArr = icons.map((ele, index) => {
      return <i className="material-icons">{ele}</i>;
    });
    return (
      <>
        <div className="selected-city purple lighten-2 center">
          {selectValue}
        </div>
        <img src='climate.png' alt='climate' className="climate-img"/>
        <div className="current-temp">
          {currentTemp}
          <sup>o</sup>
        </div>
        <div className="days purple lighten-2 center">
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
        </div>
        <div className="forcast">{iconsArr}</div>
        <div className="forcast">{threeDaysForCast}</div>
      </>
    );
  };

  handleCitySelection = (e) => {
    const lat = e.target[e.target.selectedIndex].getAttribute("data-lat");
    const lon = e.target[e.target.selectedIndex].getAttribute("data-lon");
    this.setState({ selectValue: e.target.value });
    this.fetchCurrentWeather(lat, lon);
  };

  render() {
    const { showProgressBar,selectValue } = this.state;
    const citiesArr = citiesData.map((ele, index) => {
      return (
        <option value={ele.nm} data-lat={ele.lat} data-lon={ele.lon}>
          {ele.nm}
        </option>
      );
    });

    return (
      <div className="container card-panel purple lighten-3">
        <span className="label">Selectionner votre ville</span>
        <select
          value={selectValue}
          onChange={(e) => this.handleCitySelection(e)}
        >
          {citiesArr}
        </select>
        {showProgressBar ? this.renderprogress() : this.renderForcastDetails()}
      </div>
    );
  }
}
