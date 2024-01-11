import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
     domain="dev-p73zinpt2ev606r7.us.auth0.com"
     clientId="XzzXIbMnwgvJQFJlSs6bUc0FK6QdSosF"
     authorizationParams={{
      redirect_uri: "https://real-state-ks3g.vercel.app/"
     }}
     audience="https://real-state-kappa.vercel.app"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
