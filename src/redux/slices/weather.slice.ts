import { createSlice } from "@reduxjs/toolkit";

interface WeatherState {
  temperature: number;
  weather: string;
}

const initialState: WeatherState = {
  temperature: 0,
  weather: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
});

export default weatherSlice.reducer;
