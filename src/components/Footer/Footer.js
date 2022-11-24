import React from "react";
import "./Footer.scss";
import { useSelector } from "react-redux";
import {
  getLocationWeather,
  getWeather,
} from "../../features/Weather/weatherSlice";
import temp from "../../images/icon_temperature_info.png";
import cloud from "../../images/icon_precipitation_info.png";
import humidity from "../../images/icon_humidity_info.png";
import wind from "../../images/icon_wind_info.png";
import visibility from "../../images/icon_visibility_info.png";

const Footer = () => {
  const data = useSelector(getLocationWeather);
  return (
    <div className="footer">
      <div className="footer-contents">
        <div className="min-max-div">
          <div className="icon-temperature-info">
            <img src={temp}></img>
          </div>
          <div className="min-max-temp-details">
            <div className="min-max">Min-Max</div>
            <div className="min-max-temp">
              {data.main ? data.main.temp_min : ""}°-
              {data.main ? data.main.temp_max : ""}°
            </div>
          </div>
        </div>
        <div className="precipitation">
          <div className="icon-temperature-info">
            <img src={cloud}></img>
          </div>
          <div className="precipitation-details">
            <div className="precipitation-text">precipitation</div>
            <div className="precipitation-temp">0%</div>
          </div>
        </div>
        <div className="Humidity">
          <div className="icon-temperature-info">
            <img src={humidity}></img>
          </div>
          <div className="precipitation-details">
            <div className="precipitation-text">Humidity</div>
            <div className="precipitation-temp">
              {data.main ? data.main.humidity : ""} %
            </div>
          </div>
        </div>
        <div className="Wind">
          <div className="icon-temperature-info">
            <img src={wind}></img>
          </div>
          <div className="precipitation-details">
            <div className="precipitation-text">Wind</div>
            <div className="precipitation-temp">
              {data.wind ? data.wind.speed : ""}mph
            </div>
          </div>
        </div>
        <div className="Visibility">
          <div className="icon-temperature-info">
            <img src={visibility}></img>
          </div>
          <div className="precipitation-details">
            <div className="visibility-text">Visibility</div>
            <div className="visibility-temp">{data.visibility}mph</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
