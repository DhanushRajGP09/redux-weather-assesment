import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
const Nav = () => {
  const date = new Date();
  const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const displaydate =
    days[date.getDay()] +
    ", " +
    date.getDate() +
    "/" +
    [date.getMonth() + 1] +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    " " +
    (date.getHours() >= 12 ? "PM" : "AM");

  return (
    <div className="navbar">
      <div className="tab">
        <Link to="/">
          <button className="tablinks">HOME</button>
        </Link>
        <Link to="/Favourites">
          <button className="tablinks">FAVOURITE</button>
        </Link>
        <Link to="/Recents">
          <button className="tablinks">RECENT SEARCH</button>
        </Link>

        <div className="date">{displaydate}</div>
      </div>
    </div>
  );
};

export default Nav;
