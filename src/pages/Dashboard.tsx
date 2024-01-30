import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar, { NavbarItem } from "../components/nagivation/Navbar";
import Homepage from "./Homepage";
import MyAccount from "./MyAccount";
import MyDevices from "./MyDevices";
import DataSources from "./DataSources/Index";

const navitems: Array<NavbarItem> = [
  {
    name: "Home",
    path: "/",
    element: <Homepage />,
  },
  {
    name: "My Devices",
    path: "/devices",
    element: <MyDevices />,
  },
  {
    name: "My Sources",
    path: "/data-sources",
    element: <DataSources />,
  },
  {
    name: "My Account",
    path: "/account",
    element: <MyAccount />,
  },
];

export default function Dashboard() {
  return (
    <BrowserRouter>
      <Navbar navitems={navitems} />
      <Box px={8}>
        <Routes>
          {navitems.map((item) => (
            <Route key={item.name} path={item.path} element={item.element} />
          ))}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
