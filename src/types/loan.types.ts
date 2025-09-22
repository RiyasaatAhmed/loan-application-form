/** Employment status options */
export type EmploymentStatus =
  | "Full-time"
  | "Part-time"
  | "Self-employed"
  | "Unemployed"
  | "Student";

/** Base loan application interface */
export interface LoanBase {
  id: string;
  name: string;
  email: string;
  phone: string;
  annualIncome: number;
  loanAmount: number;
  employmentStatus: EmploymentStatus;
  isConfirmed: boolean;
  applicationDate: Date;
  status: string;
}

/** Partial loan update type */
export type UpdateLoan = Partial<LoanBase>;

/** Loan form step enumeration */
export enum LoanFormStep {
  PersonalInfo = 1,
  FinancialInfo = 2,
  Review = 3,
}
