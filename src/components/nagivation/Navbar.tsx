import {
  Box,
  Spacer,
  Stack,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Homepage from "../../pages/Homepage";
import Logout from "../authentication/Logout";
import Greeting from "../brand/Greeting";
import Logo from "../brand/Logo";
import MenuToggle from "./AnimatedHamburger";

export interface NavbarItem {
  name: string; // The name of the item
  path: string; // The path to the item
  element: React.ReactNode; // The element of the item

  children?: React.ReactNode; // The content of the item
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // The size of the item
  isActive?: boolean; // Whether the item is active
}

export default function Navbar({ navitems }: { navitems: Array<NavbarItem> }) {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const isTablet = useBreakpointValue({ base: true, lg: false });
  ``;
  return (
    <nav>
      {isMobile ? (
        <MobileNav navitems={navitems} />
      ) : (
        <DesktopNav navitems={navitems} showGreeting={!isTablet} />
      )}
    </nav>
  );
}

const DesktopNav = ({
  navitems,
  showGreeting = true,
}: {
  navitems: Array<NavbarItem>;
  showGreeting?: boolean;
}) => {
  return (
    <Stack direction={"row"} spacing={4} align={"center"} p={8} as={"ul"}>
      <NavItem name="Home" path="/" size="lg" element={<Homepage />}>
        <Logo />
      </NavItem>
      {showGreeting && <Greeting />}
      <Spacer />
      {navitems.map((item) => (
        <NavItem key={item.name} {...item} />
      ))}
      <Logout />
    </Stack>
  );
};

const MobileNav = ({ navitems }: { navitems: Array<NavbarItem> }) => {
  const variants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
    closed: { opacity: 0, y: -50, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack direction={"column"}>
      <Stack
        direction={"row"}
        spacing={4}
        align={"center"}
        justify={"space-between"}
        p={8}
        as={"ul"}
      >
        <Logo />
        <MenuToggle
          toggle={onToggle}
          isOpen={isOpen}
          theme={useColorModeValue("dark", "light")}
        />
      </Stack>

      <AnimatePresence>
        {isOpen && (
          <Stack
            direction={"column"}
            spacing={4}
            align={"center"}
            p={8}
            as={motion.ul}
            listStyleType={"none"}
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navitems.map((item) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                style={{ width: "100%" }}
              >
                <NavItem key={item.name} {...item} />
              </motion.li>
            ))}
            <motion.li variants={itemVariants} style={{ width: "100%" }}>
              <Logout />
            </motion.li>
          </Stack>
        )}
      </AnimatePresence>
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
