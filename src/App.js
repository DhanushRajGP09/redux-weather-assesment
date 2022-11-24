import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Favourite from "./components/Favourite/Favourite";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Removemodal from "./components/modal/Removemodal";
import Nav from "./components/Navbar/Nav";
import RecentSearch from "./components/Recentsearch/RecentSearch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Favourites/modal" element={<Removemodal />} />
        </Routes>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Favourites" element={<Favourite />} />
          <Route path="/Recents" element={<RecentSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
