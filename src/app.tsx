/**
 * @fileoverview Main application component with provider setup
 *
 * This file serves as the root component that configures all necessary
 * providers and renders the application with proper context hierarchy.
 */

import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { SaltProvider } from "@salt-ds/core";
import { QueryClientProvider } from "@tanstack/react-query";

// Styles
import "@salt-ds/theme/index.css";
import "./styles/index.css";

// Configuration
import { queryClient } from "./lib/query-client";
import { router } from "./routes";

/**
 * Main application component
 *
 * Wraps the application with necessary providers in the correct order:
 * 1. StrictMode - Development mode checks
 * 2. QueryClientProvider - React Query for data fetching
 * 3. SaltProvider - JPMorgan design system
 * 4. RouterProvider - React Router for navigation
 *
 * @returns JSX element containing the complete application
 */
function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SaltProvider>
          <RouterProvider router={router} />
        </SaltProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
