import {
  Box,
  Card,
  Grid,
  Heading,
  Progress,
  Spacer,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import "./App.css";
import "@fontsource/work-sans";
import axios from "axios";
import { useEffect, useState } from "react";
import News from "./components/News";

function App() {
  const theme = useColorMode();

  const checkTheme = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 7 || hour > 18) {
      theme.setColorMode("dark");
    } else {
      theme.setColorMode("light");
    }
  };

  // Dark theme between 6pm and 6am
  useEffect(() => {
    checkTheme();
    const interval = setInterval(() => {
      checkTheme();
    }, 1000 * 60); // every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Box h="100vh" w="100vw" bg={useColorModeValue("gray.50", "black")} p={4}>
      <Grid
        templateAreas={`
        "name name name name"     
        "bus bus weather weather"
        "bottom bottom bottom bottom"
        `}
        h="100%"
        gap={4}
      >
        <Stack direction={"row"} gridArea="name" h={"20vh"} spacing={4}>
          <Name />
          <Spacer />
          <DateTime />
        </Stack>
        <Card gridArea="bus" h={"50vh"}>
          <Bus />
        </Card>
        <Card gridArea="weather">
          <Weather />
        </Card>
        <Box gridArea={"bottom"} minH={"20vh"}>
          <News />
        </Box>
      </Grid>
    </Box>
  );
}

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
  )

  return (
    <Box
      bg={useColorModeValue("blue.200", "blue.700")}
      color={useColorModeValue("black", "white")}
      borderRadius={8}
      bgImage={`/weathercode/${weathercode}.jpg`}
      bgSize="cover"
      h={"full"}
      // Dark backdrop for light text
      backdropBrightness={useColorModeValue(0.5, 0.2)}
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

const Name = () => {
  const Greeting = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      return "Morning";
    } else if (hour < 18) {
      return "Afternoon";
    } else if (hour < 22) {
      return "Evening";
    } else {
      return "Night";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Greeting();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack direction="column" spacing={4} p={6} justify={"center"}>
      <Heading size="lg" fontFamily={"'Work Sans', sans-serif"}>
        Hey There Arham
      </Heading>
      <Heading size="3xl">Good {Greeting()}</Heading>
    </Stack>
  );
};

const DateTime = () => {
  const [date, setDate] = useState(new Date());
  const day = date.getDay(); // 0 - 6
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Rerender every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      direction="column"
      spacing={4}
      p={8}
      justify={"center"}
      align={"end"}
      textAlign="right"
    >
      <Heading
        size="lg"
        fontFamily={"'Work Sans', sans-serif"}
        textAlign="right"
      >
        Today is {days[day]}, {date.toLocaleDateString()}
      </Heading>

      <Heading size="3xl" textAlign="right">
        {date.toLocaleTimeString()}
      </Heading>
    </Stack>
  );
};

const Bus = () => {
  const [bus, setBus] = useState<typeof EXAMPLE_BUS | null>(null);
  const [busTime, setBusTime] = useState(0); // In epoch seconds
  const [busTimeNext, setBusTimeNext] = useState(0); // In epoch seconds, -1 if no next bus

  // Update bus time
  useEffect(() => {
    if (bus) {
      const now = Date.now() / 1000;
      const nextBus =
        bus.route_departures[0].itineraries[0].schedule_items[0].departure_time;
      setBusTime(Math.round((nextBus - now) / 60));

      if (
        bus.route_departures[0].itineraries[0].schedule_items.length > 1 &&
        bus.route_departures[0].itineraries[0].schedule_items[1]
      ) {
        const nextBusNext =
          bus.route_departures[0].itineraries[0].schedule_items[1]
            .departure_time;
        setBusTimeNext(Math.round((nextBusNext - now) / 60));
      } else {
        setBusTimeNext(-1);
      }
    }
  }, [bus]);

  const fetchBus = () => {
    axios.get("https://home-apis.croissant.one/bus").then((res) => {
      setBus(res.data);
    });
  };

  // Fetch bus data
  useEffect(() => {
    fetchBus();
    const interval = setInterval(() => {
      fetchBus();
    }, 1000 * 60 * 10); // every 10 minutes
    return () => clearInterval(interval);
  }, []);

  // refresh bus time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (bus) {
        const now = Date.now() / 1000;
        const nextBus =
          bus.route_departures[0].itineraries[0].schedule_items[0]
            .departure_time;
        setBusTime(Math.floor((nextBus - now) / 60));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [bus]);

  return (
    <Stack
      direction="column"
      spacing={4}
      p={6}
      justify={"center"}
      bg={useColorModeValue("pink.200", "pink.700")}
      color={useColorModeValue("black", "white")}
      borderRadius={8}
      h={"full"}
    >
      <Stack direction="row" spacing={4}>
        <Box>
          <Heading size="lg" fontFamily={"'Work Sans', sans-serif"}>
            Bus Departs In
          </Heading>
          <Heading size="3xl">
            {Math.floor(busTime / 60) > 0 &&
              Math.floor(busTime / 60) + " Hours "}
            {busTime % 60} minutes
          </Heading>

          <Heading size="sm">
            {bus?.route_departures[0].itineraries[0].headsign}
          </Heading>
        </Box>
        <Spacer />
        <Box textAlign="right">
          <Heading size="sm" fontFamily={"'Work Sans', sans-serif"}>
            Next Bus Departs In
          </Heading>
          <Heading size="xl">
            {busTimeNext > -1
              ? (Math.floor(busTimeNext / 60) > 0
                  ? Math.floor(busTimeNext / 60) + " Hours "
                  : "") +
                (busTimeNext % 60) +
                " Minutes"
              : "No more buses today"}
          </Heading>
          <Heading size="sm">
            {bus?.route_departures[0].itineraries[0].headsign}
          </Heading>
        </Box>
      </Stack>
      <Progress
        value={30 - busTime}
        max={30}
        colorScheme="pink"
        size="lg"
        borderRadius={8}
      />
    </Stack>
  );
};

export default App;

const EXAMPLE_BUS = {
  route_departures: [
    {
      global_route_id: "PVTAMA:116200",
      itineraries: [
        {
          branch_code: "",
          direction_headsign: "Sunderland",
          direction_id: 0,
          headsign: "Sunderland",
          merged_headsign: "Sunderland",
          schedule_items: [
            {
              departure_time: 1693255980,
              is_cancelled: false,
              is_real_time: false,
              rt_trip_id: "4017495-UM2223-UMTS-Weekday-78",
              scheduled_departure_time: 1693255980,
              trip_search_key: "PVTAMA:43094228:5:0:16",
              wheelchair_accessible: 1,
            },
            {
              departure_time: 1693258080,
              is_cancelled: false,
              is_real_time: false,
              rt_trip_id: "4017523-UM2223-UMTS-Weekday-78",
              scheduled_departure_time: 1693258080,
              trip_search_key: "PVTAMA:43094228:5:0:17",
              wheelchair_accessible: 1,
            },
            {
              departure_time: 1693260180,
              is_cancelled: false,
              is_real_time: false,
              rt_trip_id: "4017496-UM2223-UMTS-Weekday-78",
              scheduled_departure_time: 1693260180,
              trip_search_key: "PVTAMA:43094228:5:0:18",
              wheelchair_accessible: 1,
            },
          ],
        },
      ],
      mode_name: "Bus",
      real_time_route_id: "20031",
      route_color: "ea6083",
      route_long_name: "Sunderland  /  South Amherst",
      route_network_id: "PVTA|Boston",
      route_network_name: "PVTA",
      route_short_name: "31",
      route_text_color: "ffffff",
      route_type: 3,
      sorting_key: "31",
      tts_long_name: "Sunderland  /  South Amherst",
      tts_short_name: "31",
    },
  ],
};

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
