// src/main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { SessionTimeoutProvider } from "@/components/SessionTimeoutProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SessionTimeoutProvider>
      <App />
    </SessionTimeoutProvider>
  </BrowserRouter>
);