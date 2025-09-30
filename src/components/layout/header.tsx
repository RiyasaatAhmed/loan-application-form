import type { ReactElement } from "react";
import { FlexLayout, FlexItem, Text, Button } from "@salt-ds/core";
import { AddIcon } from "@salt-ds/icons";
import { Link } from "react-router-dom";

/**
 * Application header component with navigation and branding.
 * Contains the main title, description, and create loan button.
 *
 * @returns React element containing the application header
 */
export function Header(): ReactElement {
  return (
    <header className="flex items-center sticky top-0 border-b z-50 bg-white px-8 py-4">
      <FlexLayout className="w-full" justify="space-between" align="center">
        {/* Brand section with title and description */}
        <FlexItem>
          <Link to="/">
            <Text styleAs="h1">
              <h1>Loan Applications</h1>
            </Text>
            <Text color="secondary" styleAs="code">
              Manage and track all loan applications
            </Text>
          </Link>
        </FlexItem>

        {/* Action section with create loan button */}
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
