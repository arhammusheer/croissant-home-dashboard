import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/unauthenticated/Landing";

export default function App() {
  const { isAuthenticated } = useKindeAuth();

  if (!isAuthenticated) {
    return <Landing />;
  }
  return <Dashboard />;
}
