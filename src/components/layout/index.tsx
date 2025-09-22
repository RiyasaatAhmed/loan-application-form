import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Page } from "./page";

/**
 * Main layout component that wraps the entire application.
 * Provides consistent structure with header and main content area.
 *
 * @returns React element containing the application layout
 */
export function Layout(): ReactElement {
  return (
    <>
      <Header />
      <Page>
        <Outlet />
      </Page>
    </>
  );
}
