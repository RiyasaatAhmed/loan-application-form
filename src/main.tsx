/**
 * @fileoverview Application entry point
 *
 * This file initializes the React application by mounting the root
 * component to the DOM element with id "root".
 */

import { createRoot } from "react-dom/client";
import App from "./app";

/** Mount the application to the DOM */
createRoot(document.getElementById("root")!).render(<App />);
