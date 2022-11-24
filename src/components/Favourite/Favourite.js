import React, { useEffect, useState } from "react";
import iconnothing from "../../images/icon_nothing.png";
import heart from "../../images/icon_favourite_Active.png";
import sun from "../../images/icon_mostly_sunny_small.png";
import "./Favourite.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getWeather,
  removeFromFav,
  removeFromliked,
  removeOneFromFav,
  removeOneFromLiked,
  removeparticularOneFromFav,
} from "../../features/Weather/weatherSlice";

const Favourite = () => {
  const [fav, setfav] = useState(true);
  const [count, setCount] = useState(0);
  const favdata = useSelector(getWeather);
  const dispatch = useDispatch();
  const showfav = () => {
    if (document.getElementsByClassName("fav-container").length <= 0) {
      setfav(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    setCount(document.getElementsByClassName("fav-container").length);
    showfav();
  });

  return (
    <div>
      <div className="Favourites">
        {fav ? (
          <div>
            <div className="fav-count">
              <span className="fav-count-text">
                {count} City added as favourite
              </span>
              <button
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/Favourites/modal");
                }}
              >
                Remove All
              </button>
            </div>
            {favdata.map((data) => {
              return (
                <div className="fav-container">
                  <div className="fav-loc">{data.name}</div>
                  <div className="fav-loc-details">
                    <div className="sun">
                      <img
                        src={require(`../../images/weathericons/${data.weather[0].icon}@2x.png`)}
                      ></img>
                    </div>
                    <div className="fav-temp">
                      <span style={{ color: "white" }} className="fav-temp-num">
                        {data.main
                          ? (
                              (data && data.main && data.main.temp - 32) *
                              (5 / 9)
                            ).toFixed(0)
                          : ""}
                      </span>
                      <span style={{ color: "white" }} className="fav-temp-c-f">
                        o
                        <span
                          style={{
                            marginTop: "7px",
                            fontSize: "20px",
                          }}
                        >
                          C
                        </span>
                      </span>
                    </div>
                    <span className="fav-temp-desc">
                      {data.weather ? data.weather[0].description : " "}
                    </span>
                  </div>

                  <img
                    src={heart}
                    className="heart-img"
                    onClick={() => {
                      dispatch(removeOneFromFav({ id: data.id }));
                      dispatch(removeOneFromLiked(data.id));
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-fav">
            <div>
              <img src={iconnothing}></img>
            </div>
            <span className="noaddedfav">No Favourites added</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
