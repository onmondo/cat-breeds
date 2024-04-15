import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import "./main.css";

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("Cannot find root element with that id");
const root = createRoot(rootElement);

root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    // </React.StrictMode>
)

