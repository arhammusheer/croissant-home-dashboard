import Navbar from "../components/nagivation/Navbar";

const navitems = [
  {
    name: "My Devices",
    path: "/",
  },
  {
    name: "My Account",
    path: "/account",
  },
];

export default function Dashboard() {
  return <Navbar navitems={navitems} />;
}
