import { Box, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Weather = () => {
  const WMO = {
    0: "Clear sky",

    1: "Mainly clear sky",
    2: "Partly Cloudy",
    3: "Mostly Cloudy",

    45: "Fog",
    49: "Freezing Fog",

    51: "Light Drizzle",
    53: "Drizzling",
    55: "Heavy Drizzle",

    56: "Light Freezing drizzle",
    57: "Freezing drizzle",

    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",

    66: "Light freezing rain",
    67: "Freezing rain",

    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",

    77: "Light snow grains",

    80: "Light showers of rain",
    81: "Showers of rain",
    82: "Heavy showers of rain",

    85: "Light showers of snow",
    86: "Showers of snow",

    95: "Thunderstorm",

    99: "Unknown precipitation",
  } as { [key: number]: string };
  const getWeatherStatusFromCode = (weathercode: number) => {
    return WMO[weathercode] || "Unknown";
  };

  const [weather, setWeather] = useState<typeof EXAMPLE_WEATHER | null>(null);
  const [weathercode, setWeathercode] = useState(0);

  const getWeather = () => {
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=42.3477&longitude=-72.5292&current_weather=true&timezone=auto"
      )
      .then((res) => {
        setWeather(res.data);
        setWeathercode(res.data.current_weather.weathercode);
      });
  };

  useEffect(() => {
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, 1000 * 60 * 10); // every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const bgGradient = useColorModeValue(
    "linear(to-r, rgba(255,255,255,0.75), rgba(0,0,0,0))",
    "linear(to-r, rgba(0,0,0,0.75), rgba(0,0,0,0))"
  );

  return (
    <Box
      bg={useColorModeValue("blue.200", "blue.700")}
      color={useColorModeValue("black", "white")}
      bgImage={`/weathercode/${weathercode}.jpg`}
      bgSize="cover"
      h={"full"}
      backdropBrightness={useColorModeValue(0.5, 0.2)}
      rounded={"2xl"}
    >
      <Stack
        direction="column"
        spacing={4}
        justify={"center"}
        h={"full"}
        bgGradient={bgGradient}
        p={6}
      >
        <Heading
          size="lg"
          fontFamily={"'Work Sans', sans-serif"}
          outline={1}
          outlineColor={"black"}
        >
          Weather
        </Heading>
        <Heading size="4xl">{weather?.current_weather.temperature}°C</Heading>
        <Heading size="md">{getWeatherStatusFromCode(weathercode)}</Heading>
      </Stack>
    </Box>
  );
};

export default Weather;

const EXAMPLE_WEATHER = {
  latitude: 42.343937,
  longitude: -72.54776,
  generationtime_ms: 1.1609792709350586,
  utc_offset_seconds: -14400,
  timezone: "America/New_York",
  timezone_abbreviation: "EDT",
  elevation: 51.0,
  current_weather: {
    temperature: 23.5,
    windspeed: 13.0,
    winddirection: 161,
    weathercode: 3,
    is_day: 1,
    time: "2023-08-28T19:00",
  },
};
