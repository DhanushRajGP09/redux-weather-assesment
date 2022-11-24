import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo_web.png";
import search from "../../images/icon_search_white.png";
import {
  addRecent,
  fetchAsyncWeatherSearch,
  getRecents,
  getWeather,
} from "../../features/Weather/weatherSlice";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLocationWeather } from "../../features/Weather/weatherSlice";
import Removemodal from "../modal/Removemodal";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const name = "udupi";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncWeatherSearch(name));
  }, [dispatch]);

  const data = useSelector(getLocationWeather);

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
      </Link>
      <div className="search">
        <div className="search-city">
          <input
            className="searchinput"
            placeholder="Search city"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            type="text"
          ></input>
        </div>
        <div className="icon-search-white">
          <img
            src={search}
            alt="search"
            style={{ opacity: "1" }}
            onClick={() => {
              dispatch(fetchAsyncWeatherSearch(inputValue));
              dispatch(addRecent(data, data.id));
            }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Header;
