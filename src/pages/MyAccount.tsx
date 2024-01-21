import { Box, Heading, Select, Stack, useColorMode } from "@chakra-ui/react";

export default function MyAccount() {
  return (
    <Box>
      <Heading>My Account</Heading>
      <Stack direction={"row"} spacing={4} align={"center"} p={8} as={"ul"} maxW={"xl"}>
        <ThemeSelector />
      </Stack>
    </Box>
  );
}

const ThemeSelector = () => {
  const { colorMode, setColorMode } = useColorMode();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColorMode(event.target.value);
  };

  return (
    <Select value={colorMode} onChange={handleThemeChange}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
};
