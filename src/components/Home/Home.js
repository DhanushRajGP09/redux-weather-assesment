import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import heart from "../../images/icon_favourite_Active.png";
import unfilledheart from "../../images/icon_favourite.png";
import Footer from "../Footer/Footer";
import {
  addToFav,
  addToheart,
  getLiked,
  getLocationWeather,
  removeOneFromFav,
  removeOneFromLiked,
} from "../../features/Weather/weatherSlice";
import { ReactionButtons } from "../heart";
import sunny from "../../images/icon_mostly_sunny.png";
import Switch from "react-switch";

const Home = () => {
  const [unfilled, setUnfilled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [add, setadd] = useState("Add to Favourite");
  const data = useSelector(getLocationWeather);
  const getlikeddata = useSelector(getLiked);
  console.log(getlikeddata);
  const dispatch = useDispatch();
  const handleHeart = () => {
    if (unfilled === true) {
      setUnfilled(!unfilled);
      setadd("Added to Favourite");
      dispatch(addToFav(data));
      dispatch(addToheart(data.id));
    } else {
      setUnfilled(!unfilled);
      dispatch(removeOneFromFav({ id: data.id }));
      dispatch(removeOneFromLiked(data.id));
    }
  };
  const handleChange = () => {
    setChecked(!checked);
  };

  const heartfilled = () => {
    if (getlikeddata.includes(data.id)) {
      setUnfilled(false);
      setadd("Added to Favourite");
    } else {
      setUnfilled(true);
      setadd("Add to Favourite");
    }
  };
  useEffect(() => {
    heartfilled();
  });

  return (
    <div className="home">
      <p className="location-name">{data.name}</p>
      <div className="add-to-fav-div">
        <img
          src={unfilled ? unfilledheart : heart}
          className="heart-img"
          onClick={() => {
            handleHeart();
          }}
        />
        <span
          className="favourite"
          style={{ color: add === "Add to Favourite" ? "white" : "#FAD05B" }}
        >
          {add}
        </span>
      </div>

      <div className="icon-weather">
        <img
          src={require(`../../images/weathericons/${data.weather[0].icon}@2x.png`)}
        ></img>
      </div>
      <div className="temperature">
        <span className="temp">
          {checked
            ? (data && data.main && data.main.temp).toFixed(0)
            : ((data && data.main && data.main.temp - 32) * (5 / 9)).toFixed(0)}
        </span>
        <div>
          <Switch
            borderRadius={4}
            onChange={handleChange}
            checked={checked}
            className="react-switch"
            offColor="transparent"
            onColor="transparent"
            uncheckedHandleIcon={
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",

                  alignItems: "center",

                  height: "100%",

                  fontSize: 18,

                  color: "red",
                }}
              >
                {"\u00B0"}C
              </div>
            }
            uncheckedIcon={
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",

                  alignItems: "center",

                  height: "100%",

                  fontSize: 18,

                  paddingRight: 2,

                  color: "white",

                  zIndex: "2",
                }}
              >
                {" \u00B0 "} F
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",

                  alignItems: "center",

                  height: "100%",

                  fontSize: 18,

                  paddingRight: 2,

                  color: "white",
                }}
              >
                {"\u00B0"}C
              </div>
            }
            checkedHandleIcon={
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",

                  alignItems: "center",

                  height: "100%",

                  color: "red",

                  fontSize: 18,
                }}
              >
                {"\u00B0"}F
              </div>
            }
          />
        </div>
      </div>
      <div className="temp-desc">
        {data.weather ? data.weather[0].description : " "}
      </div>
      <div className="line-copy"></div>

      <Footer />
    </div>
  );
};

export default Home;
