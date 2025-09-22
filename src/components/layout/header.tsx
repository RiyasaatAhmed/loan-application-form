import { FlexLayout, FlexItem, Text, Button } from "@salt-ds/core";
import { AddIcon } from "@salt-ds/icons";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center sticky top-0 border-b z-50 bg-white px-8 py-4">
      <FlexLayout className="w-full" justify="space-between" align="center">
        <FlexItem>
          <Link to="/">
            <Text styleAs="h1">Loan Applications</Text>
            <Text color="secondary" styleAs="code">
              Manage and track all loan applications
            </Text>
          </Link>
        </FlexItem>
        <FlexItem>
          <Link to="/loan/create">
            <Button sentiment="accented" appearance="bordered">
              <AddIcon aria-hidden />
              New Application
            </Button>
          </Link>
        </FlexItem>
      </FlexLayout>
    </header>
  );
}
