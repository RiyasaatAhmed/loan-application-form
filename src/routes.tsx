import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Layout } from "./components/layout";
import { Loader } from "./components/loader";

/**
 * Application routing configuration with lazy loading
 *
 * This file handles all routing logic with code splitting for better performance.
 * Each page is loaded on-demand to reduce initial bundle size.
 */
/** Lazy loaded page components */
const LoansPage = lazy(() =>
  import("./pages/loan-list")
    .then((module) => ({ default: module.default }))
    .catch(() => ({ default: () => <div>Failed to load loans page</div> }))
);

const LoanDetailPage = lazy(() =>
  import("./pages/loan")
    .then((module) => ({ default: module.default }))
    .catch(() => ({
      default: () => <div>Failed to load loan detail page</div>,
    }))
);

const CreateLoanPage = lazy(() =>
  import("./pages/create-loan")
    .then((module) => ({ default: module.default }))
    .catch(() => ({
      default: () => <div>Failed to load create loan page</div>,
    }))
);

const EditLoanPage = lazy(() =>
  import("./pages/edit-loan")
    .then((module) => ({ default: module.default }))
    .catch(() => ({ default: () => <div>Failed to load edit loan page</div> }))
);

/** Loading wrapper with fallback UI */
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader className="h-[calc(100vh-120px)] bg-white" />}>
    {children}
  </Suspense>
);

/** Route definitions */
const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <LazyWrapper>
            <LoansPage />
          </LazyWrapper>
        ),
      },
      {
        path: "loans",
        element: (
          <LazyWrapper>
            <LoansPage />
          </LazyWrapper>
        ),
      },
      {
        path: "loan/:id",
        element: (
          <LazyWrapper>
            <LoanDetailPage />
          </LazyWrapper>
        ),
      },
      {
        path: "loan/create",
        element: (
          <LazyWrapper>
            <CreateLoanPage />
          </LazyWrapper>
        ),
      },
      {
        path: "loan/edit/:id",
        element: (
          <LazyWrapper>
            <EditLoanPage />
          </LazyWrapper>
        ),
      },
    ],
  },
];

/** Export configured router */
export const router = createBrowserRouter(routes);
