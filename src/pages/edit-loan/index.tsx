import { useParams } from "react-router-dom";
import { Text, Card, StackLayout } from "@salt-ds/core";

function EditLoanPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      <StackLayout gap={3}>
        <Text styleAs="h1">Edit Loan Application</Text>
        <Text>Loan ID: {id}</Text>
        <Text>
          This page will contain the 3-step loan application form for editing.
        </Text>
      </StackLayout>
    </Card>
  );
}

export default EditLoanPage;
