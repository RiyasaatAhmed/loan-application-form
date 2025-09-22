import { FlexLayout, Spinner } from "@salt-ds/core";

export function Loader() {
  return (
    <FlexLayout
      direction="column"
      align="center"
      justify="center"
      className="h-[calc(100vh-180px)]"
    >
      <Spinner />
    </FlexLayout>
  );
}
