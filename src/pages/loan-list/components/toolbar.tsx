import type { ReactElement } from "react";
import { Card, FlexLayout, FlexItem } from "@salt-ds/core";
import { Filter } from "./filter";
import { Search } from "./search";

/** Toolbar component with search and filter controls */
export function Toolbar(): ReactElement {
  return (
    <Card className="rounded-md! border-none! shadow-none! sticky! top-[0px]! z-50!">
      <FlexLayout justify="space-between" align="center">
        <FlexItem grow={1}>
          <Search />
        </FlexItem>

        <FlexItem>
          <Filter />
        </FlexItem>
      </FlexLayout>
    </Card>
  );
}
