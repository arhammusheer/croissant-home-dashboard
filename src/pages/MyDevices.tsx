import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiServer } from "react-icons/bi";
import { FaLaptop } from "react-icons/fa";
import { LuCircuitBoard } from "react-icons/lu";
import { SlScreenDesktop, SlScreenSmartphone } from "react-icons/sl";
import Headbar from "../components/nagivation/Headbar";
import { Capitalize, relativeTime } from "../utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface Device {
  name: string;
  id: string;
  type: "iot" | "mobile" | "desktop" | "laptop" | "server";
  status: "online" | "offline" | "unknown" | "maintenance" | "retired";
  lastSeen: string;
}

const exampleDevices: Array<Device> = [
  {
    name: "My iPhone",
    id: "1",
    type: "mobile",
    status: "online",
    lastSeen: "2024-01-21T11:59:00Z",
  },
  {
    name: "My Desktop",
    id: "2",
    type: "desktop",
    status: "unknown",
    lastSeen: "2021-10-13T19:00:00Z",
  },
  {
    name: "My Raspberry Pi",
    id: "3",
    type: "iot",
    status: "offline",
    lastSeen: "2021-10-13T19:00:00Z",
  },
  {
    name: "My Server",
    id: "4",
    type: "server",
    status: "maintenance",
    lastSeen: "2021-10-13T19:00:00Z",
  },
];

export default function MyDevices() {
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const [lastSelectedID, setLastSelectedID] = useState<string | null>(null);
  return (
    <Box>
      <Headbar title={"My Devices"} mb={8}>
        <ButtonGroup>
          <Button>Register Device</Button>
        </ButtonGroup>
      </Headbar>
      {selectedID && (
        <motion.div
          layoutId={selectedID}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 50,
            zIndex: 100,
          }}
        >
          <LargeDeviceCard
            device={exampleDevices.find((device) => device.id === selectedID)!}
            onClick={() => {
              setSelectedID(null);
              setLastSelectedID(selectedID);
            }}
          />
        </motion.div>
      )}
      <Grid templateColumns="repeat(auto-fill, minmax(320px, 1fr))" gap={4}>
        {exampleDevices.map((device) => (
          <motion.div
            layoutId={device.id}
            key={device.id}
            style={{ zIndex: lastSelectedID === device.id ? 99 : 0 }}
          >
            <DeviceCard
              device={device}
              key={device.id}
              onClick={() => setSelectedID(device.id)}
            />
          </motion.div>
        ))}
        <OrderYourOwnCard />
      </Grid>
    </Box>
  );
}

const DeviceCard = ({
  device,
  onClick,
}: {
  device: Device;
  onClick?: () => void;
}) => {
  const bg = useColorModeValue("white", "black");

  return (
    <Card
      onClick={onClick}
      bg={bg}
      borderRadius="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      shadow={"none"}
    >
      <CardHeader>
        <Heading as={motion.h3} size="md" layoutId={`name-${device.id}`}>
          {device.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading as={motion.h4} size="sm" layoutId={`lastseen-${device.id}`}>
          Last Seen: {relativeTime(new Date(device.lastSeen))}
        </Heading>

        <Stack
          direction={"row"}
          spacing={2}
          justify={"space-between"}
          as={motion.div}
          layoutId={`status-${device.id}`}
        >
          <StatusIndicator status={device.status} />
          <Spacer />
          <DeviceTypeIcon type={device.type} />
        </Stack>
      </CardBody>
    </Card>
  );
};

const LargeDeviceCard = ({
  device,
  onClick,
}: {
  device: Device;
  onClick?: () => void;
}) => {
  const bg = useColorModeValue("white", "black");

  return (
    <Card
      onClick={onClick}
      bg={bg}
      borderRadius="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      shadow={"none"}
      w={"full"}
      h={"full"}
    >
      <CardHeader>
        <Heading as={motion.h3} size="md" layoutId={`name-${device.id}`}>
          {device.name}
        </Heading>
      </CardHeader>
      <CardBody as={Stack} direction={"column"}>
        <Heading as={motion.h4} size="sm" layoutId={`lastseen-${device.id}`}>
          Last Seen: {relativeTime(new Date(device.lastSeen))}
        </Heading>

        <Text>Device ID: {device.id}</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem
          dui, fermentum ut magna at, condimentum porttitor magna. Cras sed
          feugiat justo. In id porta sem, non tincidunt eros. Integer sed
          gravida felis, in dapibus dui. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Ut ac molestie odio, sed tristique erat.
          Quisque sollicitudin, metus quis ornare vestibulum, dolor elit
          placerat risus, vitae ultrices erat dui eget nisi. Fusce at facilisis
          ipsum, at vehicula eros. Vestibulum semper magna vel dignissim dictum.
          Donec ut arcu ac libero fermentum scelerisque eu sit amet enim. In
          hendrerit metus pellentesque, laoreet ex eget, rutrum nisi. Donec ac
          volutpat risus. Sed ornare nulla eu justo vehicula, sed vehicula velit
          fermentum. Nulla sit amet convallis quam. Praesent ipsum nunc, tempus
          sit amet magna vitae, accumsan rhoncus risus. Vestibulum id ipsum sit
          amet nibh vehicula egestas. Aenean eu sapien a nulla convallis
          faucibus. Pellentesque sodales commodo viverra. Donec eget mollis mi.
          Vivamus risus nulla, suscipit vestibulum viverra et, interdum a
          ligula. Praesent a rhoncus lacus, et hendrerit magna. Phasellus
          consequat fermentum eleifend. Suspendisse potenti. Nulla id volutpat
          enim, commodo bibendum urna. Aliquam quis velit lacus. Vestibulum
          accumsan nisl nec rutrum mollis. Mauris in lobortis risus. Sed viverra
          ex lectus, vitae accumsan justo mattis et. Mauris aliquet facilisis
          accumsan. Cras scelerisque laoreet tellus auctor volutpat. Aenean in
          pellentesque lorem, sed lacinia ipsum. Duis ac mi eu turpis vestibulum
          posuere. Integer id accumsan mauris, in aliquet metus. Nulla sit amet
          placerat eros, ac sagittis tortor. Vivamus consequat vehicula
          fringilla. Nulla scelerisque non lacus eget pellentesque. Fusce
          posuere velit id consectetur dapibus. Curabitur sed vestibulum tortor.
          Donec eleifend luctus orci vitae laoreet. In hac habitasse platea
          dictumst. Curabitur commodo risus ac ullamcorper tincidunt.
          Pellentesque elementum rutrum porta. Donec fermentum a ex et blandit.
          Phasellus a risus dolor. Donec vulputate dignissim erat vel dapibus.
          Fusce scelerisque quis nibh a tincidunt. Vestibulum ipsum nisi,
          finibus luctus mauris at, pharetra hendrerit ipsum. Mauris ac sapien
          maximus, pharetra velit non, lacinia mi. Aliquam aliquet arcu eu
          consequat pretium. Duis quam augue, iaculis non facilisis et,
          tincidunt quis nibh. Cras porta vitae nisl in lacinia.
        </Text>
        <Spacer />

        <Stack
          direction={"row"}
          spacing={2}
          justify={"space-between"}
          as={motion.div}
          layoutId={`status-${device.id}`}
        >
          <StatusIndicator status={device.status} />
          <DeviceTypeIcon type={device.type} />
        </Stack>
      </CardBody>
    </Card>
  );
};

const StatusIndicator = ({ status }: { status: Device["status"] }) => {
  const colors = {
    online: "green.500",
    offline: "red.500",
    unknown: "gray.500",
    maintenance: "yellow.500",
    retired: "gray.500",
  };

  return (
    <Stack direction={"row"} align={"center"} spacing={2}>
      <Box w={4} h={4} borderRadius={"full"} bg={colors[status]} />
      <Text>{Capitalize(status)}</Text>
    </Stack>
  );
};

const DeviceTypeIcon = ({
  type,
  reverse = false,
}: {
  type: Device["type"];
  reverse?: boolean;
}) => {
  const icons = {
    iot: LuCircuitBoard,
    mobile: SlScreenSmartphone,
    desktop: SlScreenDesktop,
    laptop: FaLaptop,
    server: BiServer,
  };

  return (
    <Stack
      direction={reverse ? "row-reverse" : "row"}
      align={"center"}
      spacing={2}
    >
      <Text>{Capitalize(type)}</Text> <Icon as={icons[type]} />
    </Stack>
  );
};

const OrderYourOwnCard = () => {
  const themedGradient = useColorModeValue(
    "linear(to-t, orange.200,transparent)",
    "linear(to-t,transparent,#422200)"
  );

  return (
    <Card
      bg={useColorModeValue("white", "black")}
      borderRadius="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bgGradient={themedGradient}
      shadow={"none"}
    >
      <CardHeader>
        <Heading as="h3" size="md">
          Order Your CIOT Device
        </Heading>
      </CardHeader>
      <CardBody>
        <Image src="/iot-board.png" dropShadow={"md"} />
        <Text size="sm">
          You can order your own device from our store. We will automatically
          register it for you.
        </Text>
        <Button w={"full"} colorScheme="orange" mt={4}>
          Order Now
        </Button>
      </CardBody>
    </Card>
  );
};
