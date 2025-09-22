export type EmploymentStatus =
  | "Full-time"
  | "Part-time"
  | "Self-employed"
  | "Unemployed"
  | "Student";

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

export type UpdateLoan = Partial<LoanBase>;

export enum LoanFormStep {
  PersonalInfo = 1,
  FinancialInfo = 2,
  Review = 3,
}
