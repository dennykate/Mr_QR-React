import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider
    theme={{ fontFamily: "Raleway,sans-seri" }}
    withGlobalStyles
    withNormalizeCSS
  >
    <App />
    <ToastContainer autoClose={3000} />
  </MantineProvider>
);
