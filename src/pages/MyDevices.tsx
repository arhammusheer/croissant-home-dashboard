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
	Spacer,
	Stack,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { BiServer } from "react-icons/bi";
import { FaLaptop } from "react-icons/fa";
import { LuCircuitBoard } from "react-icons/lu";
import { SlScreenDesktop, SlScreenSmartphone } from "react-icons/sl";
import Headbar from "../components/nagivation/Headbar";
import { Capitalize, relativeTime } from "../utils";

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
    id: "123456789",
    type: "mobile",
    status: "online",
    lastSeen: "2024-01-21T11:59:00Z",
  },
  {
    name: "My Desktop",
    id: "123456789",
    type: "desktop",
    status: "online",
    lastSeen: "2021-10-13T19:00:00Z",
  },
  {
    name: "My Raspberry Pi",
    id: "123456789",
    type: "iot",
    status: "offline",
    lastSeen: "2021-10-13T19:00:00Z",
  },
  {
    name: "My Server",
    id: "123456789",
    type: "server",
    status: "maintenance",
    lastSeen: "2021-10-13T19:00:00Z",
  },
];

export default function MyDevices() {
  return (
    <Box>
      <Headbar title={"My Devices"} mb={8}>
        <ButtonGroup>
          <Button>Register Device</Button>
        </ButtonGroup>
      </Headbar>
      <Grid templateColumns="repeat(auto-fill, minmax(320px, 1fr))" gap={4}>
        {exampleDevices.map((device) => (
          <DeviceCard device={device} key={device.id} />
        ))}
      </Grid>
    </Box>
  );
}

const DeviceCard = ({ device }: { device: Device }) => {
  const bg = useColorModeValue("white", "black");

  return (
    <Card
      bg={bg}
      borderRadius="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <CardHeader>
        <Heading as="h3" size="md">
          {device.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text size="sm"></Text>
        <Heading as="h4" size="sm">
          Last Seen: {relativeTime(new Date(device.lastSeen))}
        </Heading>

        <Stack direction={"row"} spacing={2} justify={"space-between"}>
          <StatusIndicator status={device.status} />
          <Spacer />
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
      <Box
        w={4}
        h={4}
        borderRadius={"full"}
        bg={colors[status]}
        boxShadow={"md"}
      />
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
