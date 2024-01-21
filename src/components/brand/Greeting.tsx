import { Box, Heading, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const TimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();

  // 3am - 12pm = Morning
  // 12pm - 4pm = Afternoon
  // 4pm - 9pm = Evening
  // 9pm - 3am = Night
  if (hours >= 3 && hours < 12) {
    return "Morning";
  } else if (hours >= 12 && hours < 16) {
    return "Afternoon";
  } else if (hours >= 16 && hours < 21) {
    return "Evening";
  } else {
    return "Night";
  }
};

export default function Greeting() {
  const isXl = useBreakpointValue({ base: false, xl: true });

  const color = useColorModeValue("gray.400", "gray.700");
  const { user } = useKindeAuth();

  return (
    <Box>
      <Heading as="h2" color={color} fontWeight="bold" size={isXl ? "xl" : "lg"}>
        Good {TimeOfDay()}, {user?.given_name}
      </Heading>
    </Box>
  );
}
