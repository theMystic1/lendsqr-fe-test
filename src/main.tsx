import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#FFFF",
            color: "#363636",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#39cdcc",
              secondary: "#FFFF",
            },
          },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
