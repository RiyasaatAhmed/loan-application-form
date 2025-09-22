import { Card, StackLayout, Text } from "@salt-ds/core";
import type { ReactElement } from "react";

export function ComingSoon(): ReactElement {
  return (
    <Card>
      <StackLayout gap={3}>
        <Text styleAs="h1">Coming Soon</Text>
        <Text>This page is coming soon.</Text>
      </StackLayout>
    </Card>
  );
}
