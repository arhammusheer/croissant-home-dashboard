import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export function Loader() {
  return (
    <Box
      as={motion.div}
      animate={{
        rotate: [0, 120, 0, 190, 0, 280, 0, 460, 360],
        transition: {
          duration: 2.75,
          repeat: Infinity,
          ease: "easeInOut",
          bounce: 2,
        },
      }}
    >
      <Logo h={16} />
    </Box>
  );
}

export function FullPageLoader() {
  const appearAfter = 5;

  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Loader />
      <Text
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: appearAfter, duration: 2 } }}
        mt={4}
      >
        This is taking longer than usual
      </Text>
    </Flex>
  );
}
