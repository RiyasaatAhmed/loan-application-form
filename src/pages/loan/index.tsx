import type { ReactElement } from "react";
import { QueryProvider } from "./providers/query-provider";
import { Page } from "./components/page";

function LoanDetailPage(): ReactElement {
  return (
    <QueryProvider>
      <Page />
    </QueryProvider>
  );
}

export default LoanDetailPage;
