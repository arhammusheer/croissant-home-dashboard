import {
  Box,
  Spacer,
  Stack,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Logo from "../brand/Logo";
import Greeting from "../brand/Greeting";
import Homepage from "../../pages/Homepage";
import { useNavigate } from "react-router-dom";

export interface NavbarItem {
  name: string; // The name of the item
  path: string; // The path to the item
  element: React.ReactNode; // The element of the item

  children?: React.ReactNode; // The content of the item
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // The size of the item
  isActive?: boolean; // Whether the item is active
}

export default function Navbar({ navitems }: { navitems: Array<NavbarItem> }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  ``;
  return (
    <nav>
      {isMobile ? (
        <MobileNav navitems={navitems} />
      ) : (
        <DesktopNav navitems={navitems} />
      )}
    </nav>
  );
}

const DesktopNav = ({ navitems }: { navitems: Array<NavbarItem> }) => {
  return (
    <Stack direction={"row"} spacing={4} align={"center"} p={8} as={"ul"}>
      <NavItem name="Home" path="/" size="lg" element={<Homepage />}>
        <Logo />
      </NavItem>
      <Greeting />
      <Spacer />
      {navitems.map((item) => (
        <NavItem key={item.name} {...item} />
      ))}
    </Stack>
  );
};

const MobileNav = ({ navitems }: { navitems: Array<NavbarItem> }) => {
  return (
    <Stack direction={"column"} spacing={4}>
      {navitems.map((item) => (
        <NavItem key={item.name} {...item} />
      ))}
    </Stack>
  );
};

function NavItem({
  name,
  children,
  path,
  size = "md",
  isActive = false,
}: NavbarItem) {
  const ref = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  const colors = {
    default: useColorModeValue("gray.600", "gray.400"),
    active: useColorModeValue("gray.900", "gray.100"),
    hover: useColorModeValue("gray.700", "gray.300"),
  };

  return (
    <Tooltip
      label={name}
      aria-label={name}
      isDisabled={!children}
      openDelay={500}
    >
      <Box
        ref={ref}
        as={motion.li}
        display="inline-block"
        fontWeight="bold"
        cursor="pointer"
        color={isActive ? colors.active : colors.default}
        _hover={{ color: colors.hover }}
        fontSize={size}
        whileHover={{ scale: 1.02, transition: { duration: 0.1, bounce: 0.5 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1, bounce: 0.5 } }}
        onClick={handleClick}
      >
        {children ? children : name}
      </Box>
    </Tooltip>
  );
}
