import { mode } from "@chakra-ui/theme-tools";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {
  ChakraProvider,
  StyleFunctionProps,
  extendTheme,
} from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import store from "./redux/store.ts";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("white", "black")(props),
      },
    }),
  },
});

const domain = import.meta.env.PROD ? "https://auth.croissant.one" : "https://croissant.kinde.com";

const kindeConfig = {
  clientId: "953d71e1729d4fe1802ee6547c5e9963",
  domain: domain,
  redirectUri: window.location.origin,
  logoutUri: window.location.origin,
  isDangerouslyUseLocalStorage: !import.meta.env.PROD,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      clientId={kindeConfig.clientId}
      domain={kindeConfig.domain}
      redirectUri={kindeConfig.redirectUri}
      logoutUri={kindeConfig.logoutUri}
      isDangerouslyUseLocalStorage={kindeConfig.isDangerouslyUseLocalStorage}
    >
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ReduxProvider>
    </KindeProvider>
  </React.StrictMode>
);
