import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GeoTimeProvider } from "./Contexts/GeoTimeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import SwitchSection from "./Contexts/SwitchSection.jsx";
import { PersonalDataProvider } from "./Contexts/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <GeoTimeProvider>
    <SwitchSection>
      <PersonalDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersonalDataProvider>
    </SwitchSection>
  </GeoTimeProvider>
);
