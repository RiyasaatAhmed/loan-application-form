import type { ReactElement } from "react";
import { Table, TBody, TD, TH, THead, TR } from "@salt-ds/lab";
import { CheckmarkIcon, CloseIcon, EditIcon, DeleteIcon } from "@salt-ds/icons";
import { Text, Tag, Button, FlexLayout } from "@salt-ds/core";
import { useQueryResult } from "../providers/query-provider";
import { LOAN_STATUS_CLASSES } from "../../../statics/loan-status";
import { EMPLOYMENT_STATUS_CLASSES } from "../../../statics/employment-status";
import { Link } from "react-router-dom";

/** Loan table component with data rendering and actions */
export function LoanTable(): ReactElement {
  const { data } = useQueryResult();

  return (
    <div className="overflow-x-auto px-6 relative">
      <Table className="w-full min-w-[1196px]">
        <THead>
          <TR className="bg-white">
            <TH className="text-center! w-50">Name</TH>
            <TH className="text-center! w-60">Email</TH>
            <TH className="text-center! w-50">Phone</TH>
            <TH className="text-center! w-40">Status</TH>
            <TH className="text-center! w-40">Loan Amount</TH>
            <TH className="text-center! w-50">Employment Status</TH>
            <TH className="text-center! w-40">Annual Income</TH>
            <TH className="text-center! w-25">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {data?.map((loan) => (
            <TR key={loan.id}>
              <TD>
                <Link
                  to={`/loan/${loan.id}`}
                  className="flex items-center justify-center"
                >
                  {/* Confirmation status indicator */}
                  {loan.isConfirmed ? (
                    <CheckmarkIcon className="text-green-500" />
                  ) : (
                    <CloseIcon className="text-red-500" />
                  )}

                  <Text className="ml-2">{loan.name}</Text>
                </Link>
              </TD>
              <TD>
                <Text className="text-center!">{loan.email}</Text>
              </TD>
              <TD>
                <Text className="text-center!">{loan.phone}</Text>
              </TD>
              <TD>
                <Tag
                  className={`capitalize mx-auto ${
                    LOAN_STATUS_CLASSES[
                      loan.status as keyof typeof LOAN_STATUS_CLASSES
                    ]
                  }`}
                >
                  {loan.status}
                </Tag>
              </TD>

              <TD>
                <Text className="text-center!">
                  £
                  {loan.loanAmount?.toLocaleString("en-GB", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </TD>
              <TD>
                <Tag
                  className={`capitalize mx-auto ${
                    EMPLOYMENT_STATUS_CLASSES[
                      loan.employmentStatus as keyof typeof EMPLOYMENT_STATUS_CLASSES
                    ]
                  }`}
                >
                  {loan.employmentStatus}
                </Tag>
              </TD>
              <TD>
                <Text className="text-center!">
                  £
                  {loan.annualIncome?.toLocaleString("en-GB", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </TD>
              <TD>
                <FlexLayout gap={1}>
                  <Link to={`/loan/edit/${loan.id}`}>
                    <Button sentiment="accented" appearance="bordered">
                      <EditIcon />
                    </Button>
                  </Link>

                  <Button sentiment="accented" appearance="bordered">
                    <DeleteIcon />
                  </Button>
                </FlexLayout>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
