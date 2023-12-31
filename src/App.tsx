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
import "@fontsource/work-sans";
import axios from "axios";
import { useEffect, useState } from "react";
import News from "./components/News";
import Weather from "./components/Weather";
import Greeting from "./components/Greeting";

function App() {
  const theme = useColorMode();

  const checkTheme = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 7 || hour >= 18) {
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
        "bus bus bus2 weather"
        "bottom bottom bottom bottom"
        `}
        h="100%"
        gap={4}
      >
        <Stack direction={"row"} gridArea="name" spacing={4}>
          <Greeting name="Arham" />
          <Spacer />
          <DateTime />
        </Stack>
        <Card gridArea="bus" rounded={"2xl"}>
          <Bus />
        </Card>
        <Stack direction={"column"} gridArea="bus2" rounded={"2xl"} gap={4}>
          <Card h={"full"} rounded={"2xl"}></Card>
          <Card h={"full"} rounded={"2xl"}></Card>
        </Stack>
        <Card gridArea="weather" rounded={"2xl"}>
          <Weather />
        </Card>
        <Box gridArea={"bottom"}>
          <News />
        </Box>
      </Grid>
    </Box>
  );
}

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
      p={6}
      justify={"space-between"}
      bg={useColorModeValue("pink.200", "pink.700")}
      color={useColorModeValue("black", "white")}
      rounded={"2xl"}
      h={"full"}
    >
      <Box textAlign="right">
        <Heading size="sm" fontFamily={"'Work Sans', sans-serif"}>
          Next Bus Departs In
        </Heading>
        <Heading size="xl" fontFamily={"'Work Sans', sans-serif"}>
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
      <Box>
        <Heading size="lg" fontFamily={"'Work Sans', sans-serif"}>
          Bus Departs In
        </Heading>
        <Heading size="4xl">
          {Math.floor(busTime / 60) > 0 && Math.floor(busTime / 60) + " Hours "}
          {busTime % 60} minutes
        </Heading>

        <Heading size="sm">
          {bus?.route_departures[0].itineraries[0].headsign}
        </Heading>
      </Box>

      <Progress
        value={30 - busTime}
        max={30}
        colorScheme="pink"
        size="lg"
        rounded={"2xl"}
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
