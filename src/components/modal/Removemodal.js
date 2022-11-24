import React from "react";
import { useState } from "react";
import "./Removemodal.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFromFav,
  removeFromliked,
} from "../../features/Weather/weatherSlice";

export default function Removemodal() {
  const [isShown, setisShown] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <div
        id="myModal"
        className="Updatemodal"
        style={{ display: isShown ? "block" : "none" }}
      >
        <div className="modal-content">
          <div className="popup">
            <span className="are-you-sure-want-to">
              Are you sure want to remove all the favourites?
            </span>
            <div className="group7">
              <button
                className="button-no"
                onClick={() => {
                  setisShown(false);
                }}
              >
                <span className="no" onClick={navigate("/Favourites")}>
                  No
                </span>
              </button>

              <button className="button-yes">
                <span
                  className="yes"
                  onClick={() => {
                    dispatch(removeFromFav());
                    dispatch(removeFromliked());
                    setisShown(false);
                  }}
                >
                  Yes
                </span>
              </button>
            </div>
          </div>

          <div className="close-btn">
            <img src="./images/close_btn.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
