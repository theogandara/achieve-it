import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivateRoutes } from "./private-routes.tsx";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivateRoutes />
  </StrictMode>
);
