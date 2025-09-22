import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo } from "react";
import { useLoans } from "../../../api/loan";
import type { DefaultError, UseQueryResult } from "@tanstack/react-query";
import type { LoanBase } from "../../../types/loan.types";
import { useQueryParams } from "../../../hooks/use-query-params";

// Types
type QueryResult = UseQueryResult<Array<LoanBase>, DefaultError>;
// Context
const QueryContext = createContext<QueryResult | null>(null);

// Custom hook with better error handling
export const useQueryResult = (): QueryResult => {
  const context = useContext(QueryContext);

  if (context === null) {
    throw new Error("useQueryResult must be used within a QueryProvider.");
  }

  return context;
};

// Provider component
export const QueryProvider = ({ children }: PropsWithChildren) => {
  const { getParam } = useQueryParams();

  // Memoize the parameters to ensure stable references
  const searchParams = useMemo(
    () => ({
      name: getParam("name"),
      status: getParam("status"),
    }),
    [getParam]
  );

  const queryResult = useLoans(searchParams.name, searchParams.status);

  return (
    <QueryContext.Provider value={queryResult}>
      {children}
    </QueryContext.Provider>
  );
};
