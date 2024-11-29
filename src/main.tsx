import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-5g1zqlam67s07l82.us.auth0.com"
    clientId="JVJSoF2lXS9EqdgfJeNlxV7vtfq6HP3I"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
