import { useMemo } from "react";
import { useQueryResult } from "../providers/query-provider";
import {
  DocumentIcon,
  CheckmarkIcon,
  ClockIcon,
  CallIcon,
} from "@salt-ds/icons";
import { GridLayout } from "@salt-ds/core";
import { LoanCard } from "../../../components/loan-card";

export function Statistics() {
  const { data } = useQueryResult();

  // Memoize statistics calculation to avoid recalculating on every render
  const loanStats = useMemo(
    () => ({
      total: data?.length || 0,
      approved: data?.filter((loan) => loan.status === "Approved").length || 0,
      pending: data?.filter((loan) => loan.status === "Pending").length || 0,
      rejected: data?.filter((loan) => loan.status === "Rejected").length || 0,
    }),
    [data]
  );

  const statsCards = useMemo(
    () => [
      {
        value: loanStats.total,
        title: "Total Applications",
        icon: <DocumentIcon className="text-blue-600" />,
        iconColor: "blue" as const,
      },
      {
        value: loanStats.approved,
        title: "Approved",
        icon: <CheckmarkIcon className="text-green-600" />,
        iconColor: "green" as const,
      },
      {
        value: loanStats.pending,
        title: "Pending",
        icon: <ClockIcon className="text-yellow-600" />,
        iconColor: "yellow" as const,
      },
      {
        value: loanStats.rejected,
        title: "Rejected",
        icon: <CallIcon className="text-red-600" />,
        iconColor: "red" as const,
      },
    ],
    [loanStats]
  );

  return (
    <GridLayout columns={4} gap={3}>
      {statsCards.map((card, index) => (
        <LoanCard
          key={index}
          value={card.value}
          title={card.title}
          icon={card.icon}
          iconColor={card.iconColor}
        />
      ))}
    </GridLayout>
  );
}
