import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/style/mainStyle.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
