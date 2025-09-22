import type { ReactElement } from "react";
import { FlexLayout } from "@salt-ds/core";
import { Toolbar } from "./toolbar";
import { LoanTable } from "./loan-table";
import { Loader } from "../../../components/loader";
import { Error } from "../../../components/error";
import { useQueryResult } from "../providers/query-provider";

/** Main loan list page component with conditional rendering */
export function Page(): ReactElement {
  const { isLoading, error, refetch } = useQueryResult();

  // Render appropriate content based on query state
  let content: ReactElement | null = null;
  if (isLoading) {
    content = <Loader className="h-[calc(100vh-180px)]" />;
  } else if (error) {
    content = <Error message={error.message} onRetry={refetch} />;
  } else {
    content = <LoanTable />;
  }

  return (
    <FlexLayout direction="column" gap={3}>
      <div className="bg-white h-[calc(100vh-120px)] overflow-y-auto">
        <Toolbar />
        {content}
      </div>
    </FlexLayout>
  );
}
