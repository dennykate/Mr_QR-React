import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

import App from "./App.tsx";
import "./index.css";
import config from "./constants/config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={config.oauthClientId}>
    <MantineProvider
      theme={{ fontFamily: "Raleway,sans-seri" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
      <ToastContainer autoClose={3000} />
    </MantineProvider>
  </GoogleOAuthProvider>
);
