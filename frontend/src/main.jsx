import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-thanhnguyenx.us.auth0.com"
      clientId="r0txbPr8w7mxSz8X8KSyehpgsvAIBSeL"
      authorizationParams={{
        redirect_url: "http://localhost:5173",
      }}
      audience="http://localhost:8000"
      score="openid profile email"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </StrictMode>
);
