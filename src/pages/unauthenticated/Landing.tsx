import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Logo from "../../components/brand/Logo";

export default function Landing() {
  const { login, register } = useKindeAuth();
  return (
    <Stack
      direction={"column"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Logo h={24} />
      <Heading as="h1" size="2xl">
        Croissant Apps
      </Heading>
      <Text fontSize="xl">A collection of apps for Croissant</Text>

      <Box p={4}>
        <Stack direction={"row"} spacing={4} align={"center"} mt={8} as={"ul"}>
          <Button
            as={"button"}
            onClick={() => register()}
            w={"full"}
            colorScheme="orange"
            variant="outline"
          >
            Register
          </Button>
          <Button onClick={() => login({})} w={"full"} colorScheme="orange">
            Login
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
