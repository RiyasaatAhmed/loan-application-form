import type { ReactElement } from "react";
import { QueryProvider } from "./providers/query-provider";
import { Page } from "./components/page";

/** Loans page component with query provider */
function LoansPage(): ReactElement {
  return (
    <QueryProvider>
      <Page />
    </QueryProvider>
  );
}

export default LoansPage;
