import {
  Box,
  Heading,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetWeatherQuery } from "../redux/slices/weather.api";

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

  const { data, error, isLoading, refetch, fulfilledTimeStamp } =
    useGetWeatherQuery({
      lat: 42.3477,
      lon: -72.5292,
    });

  const REFRESH_MS = 1000 * 60 * 5; // 5 minutes

  const [weathercode, setWeathercode] = useState(0);

  useEffect(() => {
    if (data) {
      setWeathercode(data.current_weather.weathercode);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, REFRESH_MS);
    return () => clearInterval(interval);
  }, [REFRESH_MS, refetch]);

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
        <Spacer />
        {isLoading && <Heading size="md">Loading...</Heading>}
        {error && <Heading size="md">Error</Heading>}
        {data && (
          <>
            <Heading size="4xl">{data.current_weather.temperature}°</Heading>
            <Heading size="md">{getWeatherStatusFromCode(weathercode)}</Heading>
          </>
        )}
        <Spacer />
        {fulfilledTimeStamp && (
          <Text
            size="sm"
            textAlign="right"
            fontFamily={"'Work Sans', sans-serif"}
            color={"gray.500"}
          >
            Next update in{" "}
            {Math.round(
              (fulfilledTimeStamp + REFRESH_MS - Date.now()) / 1000 / 60
            )}{" "}
            minutes
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default Weather;
