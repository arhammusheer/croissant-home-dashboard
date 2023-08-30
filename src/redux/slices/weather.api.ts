import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherResponse {
  current_weather: CurrentWeather;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

interface CurrentWeather {
  is_day: boolean;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

const weatherAPI = createApi({
  reducerPath: "weatherAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.open-meteo.com/v1/forecast",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`,
    }),
  }),
});

export default weatherAPI;

export const { useGetWeatherQuery } = weatherAPI;
