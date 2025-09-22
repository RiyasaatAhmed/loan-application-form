import apiService from "../../services/api-service";
import { API_ENDPOINTS } from "../../statics/backend-endpoints";
import type { LoanBase } from "../../types/loan.types";

/**
 * Loan API service class
 */
export class LoanApiService {
  /**
   * Get loans (this is the main method for listing loans)
   */
  static async getLoans(
    name: string,
    status: string
  ): Promise<Array<LoanBase>> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Artificial delay for 1 second
    return await apiService.get<Array<LoanBase>>(
      API_ENDPOINTS.LOANS.GET_LOANS,
      {
        params: {
          name: name ? name : undefined,
          status: status ? status : undefined,
        },
      }
    );
  }

  /**
   * Get loan (this is the main method for getting a loan by id)
   */
  static async getLoan(id: string): Promise<LoanBase> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Artificial delay for 1 second
    return await apiService.get<LoanBase>(API_ENDPOINTS.LOANS.BY_ID(id));
  }
}
