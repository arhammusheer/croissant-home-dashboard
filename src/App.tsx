import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/unauthenticated/Landing";
import { FullPageLoader, Loader } from "./components/brand/Loader";

export default function App() {
  const { isAuthenticated, isLoading } = useKindeAuth();

  if (true) {
    return <FullPageLoader />
  }

  if (!isAuthenticated) {
    return <Landing />;
  }
  return <Dashboard />;
}
