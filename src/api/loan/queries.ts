import { useQuery } from "@tanstack/react-query";
import { LoanApiService } from "./loan-service";

/**
 * Get loans (returns LoanBase[])
 */
export const useLoans = (name: string, status: string) => {
  return useQuery({
    queryKey: ["loans", name, status],
    queryFn: () => LoanApiService.getLoans(name, status),
  });
};

/**
 * Get loan (returns LoanBase)
 */
export const useLoan = (id: string) => {
  return useQuery({
    queryKey: ["loan", id],
    queryFn: () => LoanApiService.getLoan(id),
  });
};
