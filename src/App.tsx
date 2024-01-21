import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { FullPageLoader } from "./components/brand/Loader";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/unauthenticated/Landing";

export default function App() {
  const { isAuthenticated, isLoading } = useKindeAuth();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Landing />;
  }
  return <Dashboard />;
}
