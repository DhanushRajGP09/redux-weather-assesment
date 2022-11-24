import React, { useState } from "react";
import iconnothing from "../../images/icon_nothing.png";
import heart from "../../images/icon_favourite_Active.png";
import sun from "../../images/icon_mostly_sunny_small.png";
import "./RecentSearch.scss";
import { useDispatch, useSelector } from "react-redux";
import unfilledheart from "../../images/icon_favourite.png";
import { useEffect } from "react";
import {
  getRecents,
  getLiked,
  removeFromrecent,
  addToFav,
  addToheart,
  removeOneFromFav,
  removeOneFromLiked,
} from "../../features/Weather/weatherSlice";

const RecentSearch = () => {
  const [recent, setrecent] = useState(true);
  const [unfilled, setUnfilled] = useState(true);
  const data = useSelector(getRecents);
  const getlikeddata = useSelector(getLiked);
  console.log(data);
  console.log(getlikeddata);
  const dispatch = useDispatch();
  const showrecent = () => {
    if (document.getElementsByClassName("recent-container").length <= 0) {
      setrecent(false);
    }
  };

  const handleHeart = (data) => {
    if (unfilled == true) {
      setUnfilled(!unfilled);
      dispatch(addToFav(data));
      dispatch(addToheart(data.id));
    } else {
      setUnfilled(!unfilled);
      dispatch(removeOneFromFav({ id: data.id }));
      dispatch(removeOneFromLiked(data.id));
    }
  };

  useEffect(() => {
    showrecent();
  });

  return (
    <div>
      <div className="Recents">
        {recent ? (
          <div>
            <div className="recent-count">
              <span className="recent-count-text">
                You Recently Searched For
              </span>
              <button
                onClick={() => {
                  dispatch(removeFromrecent());
                }}
              >
                Clear All
              </button>
            </div>
            {data.map((data) => {
              return (
                <div className="recent-container">
                  <div className="recent-loc">{data.name}</div>
                  <div className="recent-loc-details">
                    <div className="sun">
                      <img
                        src={require(`../../images/weathericons/${data.weather[0].icon}@2x.png`)}
                      ></img>
                    </div>
                    <div className="recent-temp">
                      <span
                        style={{ color: "white" }}
                        className="recent-temp-num"
                      >
                        {data.main
                          ? (
                              (data && data.main && data.main.temp - 32) *
                              (5 / 9)
                            ).toFixed(0)
                          : ""}
                      </span>
                      <span
                        style={{ color: "white" }}
                        className="recent-temp-c-f"
                      >
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
                    <span className="recent-temp-desc">
                      {data.weather ? data.weather[0].description : " "}
                    </span>
                  </div>
                  <img
                    src={getlikeddata.includes(data.id) ? heart : unfilledheart}
                    className="heart-img"
                    onClick={() => {
                      handleHeart(data);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-recent">
            <div>
              <img src={iconnothing}></img>
            </div>
            <span className="noaddedrecent">No Recent Search</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentSearch;
