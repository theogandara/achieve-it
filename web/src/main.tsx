import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivateRoutes } from "./private-routes.tsx";
import { GlobalStyle } from "./styles/globalStyle.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivateRoutes />
    <GlobalStyle />
  </StrictMode>
);
