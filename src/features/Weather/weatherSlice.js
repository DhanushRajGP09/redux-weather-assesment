import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../../common/apis/weatherApi";
import { APIKey } from "../../common/apis/weatherApiKey";

export const fetchAsyncWeather = createAsyncThunk(
  "favourites/fetchAsyncWeather",
  async () => {
    const response = await weatherApi.get(
      `weather?lat=13.34&lon=74.74&appid=${APIKey}`
    );
    return response.data;
  }
);

export const fetchAsyncWeatherSearch = createAsyncThunk(
  "favourites/fetchAsyncWeatherSearch",
  async (payload) => {
    const response = await weatherApi.get(
      `weather?q=${payload}&units=imperial&appid=${APIKey}`
    );
    return response.data;
  }
);

const initialState = {
  favourites: [],
  recents: [],
  liked: [],
  recentlySearched: {},
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addRecent: (state, action) => {
      state.recents.push(action.payload);
    },
    addToFav: (state, action) => {
      state.favourites.push(action.payload);
    },
    addToheart: (state, action) => {
      state.liked.push(action.payload);
    },
    removeOneFromFav: (state, action) => {
      state.favourites = state.favourites.filter(
        (place) => place.id !== action.payload.id
      );
    },
    removeOneFromLiked: (state, action) => {
      state.liked = state.liked.filter((data) => data !== action.payload);
    },
    removeFromFav: (state) => {
      state.favourites = [];
    },
    removeFromliked: (state) => {
      state.liked = [];
    },
    removeFromrecent: (state) => {
      state.recents = [];
    },
  },
  extraReducers: {
    [fetchAsyncWeather.pending]: () => {
      console.log("Pending....");
    },
    [fetchAsyncWeather.fulfilled]: (state, { payload }) => {
      console.log("Fetched Succefully!!!");
      return { ...state, favourites: payload };
    },
    [fetchAsyncWeather.rejected]: () => {
      console.log("Rejected....");
    },
    [fetchAsyncWeatherSearch.fulfilled]: (state, { payload }) => {
      console.log("Fetched Succefully!!!");
      return { ...state, recentlySearched: payload };
    },
  },
});

export const {
  addRecent,
  addToFav,
  addToheart,
  removeFromFav,
  removeFromrecent,
  removeOneFromFav,
  removeparticularOneFromFav,
  removeFromliked,
  removeOneFromLiked,
} = weatherSlice.actions;
export const getWeather = (state) => state.weather.favourites;
export const getLiked = (state) => state.weather.liked;
export const getLocationWeather = (state) => state.weather.recentlySearched;
export const getRecents = (state) => state.weather.recents;

export default weatherSlice.reducer;
