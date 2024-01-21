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

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("gray.100", "black")(props),
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
);
