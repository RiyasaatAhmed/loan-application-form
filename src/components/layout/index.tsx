import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Page } from "./page";

export function Layout() {
  return (
    <>
      <Header />
      <Page>
        <Outlet />
      </Page>
    </>
  );
}
