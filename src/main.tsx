import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";

import { Layout } from "./components/layout";

import LoansPage from "./pages/loan-list";
import LoanDetailPage from "./pages/loan";
import CreateLoanPage from "./pages/create-loan";
import EditLoanPage from "./pages/edit-loan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LoansPage /> },
      { path: "/loans", element: <LoansPage /> },
      { path: "/loan/:id", element: <LoanDetailPage /> },
      { path: "/loan/create", element: <CreateLoanPage /> },
      { path: "/loan/edit/:id", element: <EditLoanPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SaltProvider>
        <RouterProvider router={router} />
      </SaltProvider>
    </QueryClientProvider>
  </StrictMode>
);
