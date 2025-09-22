import { Card, StackLayout, Text } from "@salt-ds/core";
import { useQueryResult } from "../providers/query-provider";

export function Page() {
  const { data } = useQueryResult();
  return (
    <Card>
      <StackLayout gap={3}>
        <Text styleAs="h1">Loan Details</Text>
        <Text>Loan ID: {data?.id}</Text>
        <Text>
          This page will show detailed information about the loan application.
        </Text>
      </StackLayout>
    </Card>
  );
}
