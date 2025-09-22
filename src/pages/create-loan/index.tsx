import { Text, Card, StackLayout } from "@salt-ds/core";

function CreateLoanPage() {
  return (
    <Card>
      <StackLayout gap={3}>
        <Text styleAs="h1">Create New Loan Application</Text>
        <Text>This page will contain the 3-step loan application form.</Text>
      </StackLayout>
    </Card>
  );
}

export default CreateLoanPage;
