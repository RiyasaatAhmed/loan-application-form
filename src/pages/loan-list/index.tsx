import { QueryProvider } from "./providers/query-provider";
import { Page } from "./components/page";

function LoansPage() {
  return (
    <QueryProvider>
      <Page />
    </QueryProvider>
  );
}

export default LoansPage;
