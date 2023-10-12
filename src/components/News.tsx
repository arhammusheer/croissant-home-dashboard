import { Stack, Text, useColorMode } from "@chakra-ui/react";
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
      rounded={"2xl"}
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
            <>
              <Stack
                key={i}
                p={2}
                mr={2}
                rounded="2xl"
                maxW={"400px"}
                h={"full"}
                borderWidth={1}
              >
                <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  {n.tickers.join(", ")}
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  {n.title}
                </Text>
              </Stack>
            </>
          );
        })}
      </Marquee>
      <CurrencyRates />
    </Stack>
  );
}

const CurrencyRates = () => {
  const [rates, setRates] = useState<{
    success: boolean;
    date: string;
    rates: { [key: string]: number };
  }>({
    success: false,
    date: "",
    rates: {},
  });

  const getRates = async () => {
    await axios
      .get(`https://api.exchangerate.host/latest?base=INR`)
      .then((res) => {
        setRates(res.data);
      });
  };

  useEffect(() => {
    // Every 30 mins
    getRates();
    const interval = setInterval(() => {
      getRates();
    }, 60 * 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      w={"full"}
      direction={"row"}
      spacing={2}
      align={"center"}
      justify={"space-evenly"}
    >
      <Text fontSize="sm" fontWeight="bold" color="gray.500">
        {rates.date}
      </Text>
      {/* <CurrencyRateSingle
        currency="USD"
        rate={1 / rates.rates.USD}
        emoji="🇺🇸"
      /> */}
      {/* <CurrencyRateSingle
        currency="CAD"
        rate={1 / rates.rates.CAD}
        emoji="🇨🇦"
      />
      <CurrencyRateSingle
        currency="EUR"
        rate={1 / rates.rates.EUR}
        emoji="🇪🇺"
      />
      <CurrencyRateSingle
        currency="GBP"
        rate={1 / rates.rates.GBP}
        emoji="🇬🇧"
      /> */}
    </Stack>
  );
};

// const CurrencyRateSingle = ({
//   currency,
//   rate,
//   emoji,
// }: {
//   currency: string;
//   rate: number;
//   emoji: string;
// }) => {
//   return (
//     <Stack direction={"column"} align={"center"} justify={"center"} gap={0}>
//       <Text fontSize="lg" fontWeight="bold">
//         {rate.toFixed(3)}
//       </Text>
//       <Text fontSize="sm" fontWeight="bold" color="gray.500">
//         {emoji} {currency}
//       </Text>
//     </Stack>
//   );
// };
