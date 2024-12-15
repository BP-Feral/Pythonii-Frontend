import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { EventsProvider } from "./components/EventsContext";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EventsProvider>
    </AuthProvider>
  </React.StrictMode>
);