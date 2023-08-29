import {
  Card,
  Stack,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function News() {
  const { toggleColorMode } = useColorMode();
  const [news, setNews] = useState<
    {
      title: string;
      tickers: string[];
    }[]
  >([]);

  const news_bg = useColorModeValue("gray.50", "gray.900");

  const getNews = async () => {
    await axios
      .get("https://home-apis.croissant.one/finance-news")
      .then((res) => {
        setNews(res.data);
      });
  };

  useEffect(() => {
    // Every 30 mins
    getNews();
    const interval = setInterval(() => {
      getNews();
    }, 60 * 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  // Infinite right moving news ticker. 4 news at a time.
  return (
    <Stack
      maxW={"97vw"}
      w={"100%"}
      borderRadius={"md"}
      overflow={"hidden"}
      align="end"
      h="full"
      onClick={toggleColorMode}
    >
      <Marquee
        speed={50}
        gradientWidth={0}
        pauseOnHover={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {news.map((n, i) => {
          return (
            <Card
              key={i}
              px={2}
              py={1}
              mr={2}
              rounded="md"
              minW={"300px"}
              maxW={"500px"}
              h={"full"}
              bg={news_bg}
            >
              <Text fontSize="sm" fontWeight="bold" color="gray.500">
                {n.tickers.join(", ")}
              </Text>
              <Text fontSize="md" fontWeight="bold">
                {n.title}
              </Text>
            </Card>
          );
        })}
      </Marquee>
    </Stack>
  );
}
