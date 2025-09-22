import type { PropsWithChildren, ReactElement } from "react";
import { createContext, useContext } from "react";
import { useLoan } from "../../../api/loan";
import type { DefaultError, UseQueryResult } from "@tanstack/react-query";
import type { LoanBase } from "../../../types/loan.types";
import { useParams } from "react-router-dom";
import { DEFAULT_EMPTY_STRING } from "../../../statics/constants";

// Types
type QueryResult = UseQueryResult<LoanBase, DefaultError>;

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
export const QueryProvider = ({
  children,
}: PropsWithChildren): ReactElement => {
  const { id = DEFAULT_EMPTY_STRING } = useParams();

  const queryResult = useLoan(id);

  return (
    <QueryContext.Provider value={queryResult}>
      {children}
    </QueryContext.Provider>
  );
};
