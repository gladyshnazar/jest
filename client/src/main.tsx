import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";
import "./styles/App.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const nodeEnv = import.meta.env.VITE_NODE_ENV;
if (nodeEnv === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
