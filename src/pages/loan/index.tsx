import { QueryProvider } from "./providers/query-provider";
import { Page } from "./components/page";

function LoanDetailPage() {
  return (
    <QueryProvider>
      <Page />
    </QueryProvider>
  );
}

export default LoanDetailPage;
