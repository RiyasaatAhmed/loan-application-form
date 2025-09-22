import { FlexLayout } from "@salt-ds/core";
import { Toolbar } from "./toolbar";
import { LoanTable } from "./loan-table";
import { Loader } from "../../../components/loader";
import { Error } from "../../../components/error";
import { useQueryResult } from "../providers/query-provider";

export function Page() {
  const { isLoading, error, refetch } = useQueryResult();

  let content = null;

  if (isLoading) {
    content = <Loader />;
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
