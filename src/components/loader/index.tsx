import type { ReactElement } from "react";
import { FlexLayout, Spinner } from "@salt-ds/core";

/**
 * Props for the Loader component.
 */
interface LoaderProps {
  /** Optional CSS class name for custom styling */
  className?: string;
}

/**
 * Loading spinner component with centered layout.
 * Displays a Salt Design System spinner in a centered flex container.
 *
 * @param props - Component props
 * @param props.className - Optional CSS class for custom styling
 * @returns React element containing a centered spinner
 */
export function Loader({ className }: LoaderProps): ReactElement {
  return (
    <FlexLayout
      direction="column"
      align="center"
      justify="center"
      className={className}
    >
      <Spinner />
    </FlexLayout>
  );
}
