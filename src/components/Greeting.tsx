import { Heading, Stack } from "@chakra-ui/react";

export default function Greeting({ name }: { name: string }) {
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

  return (
    <Stack direction="column" spacing={4} p={6} justify={"center"}>
      <Heading size="lg" fontFamily={"'Work Sans', sans-serif"}>
        Hey There {name}!
      </Heading>
      <Heading size="3xl">Good {TimeOfDay()}</Heading>
    </Stack>
  );
}
