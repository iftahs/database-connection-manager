import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DatabasesProvider } from "./store/databases-context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <DatabasesProvider>
            <App />
        </DatabasesProvider>
    </React.StrictMode>
);
