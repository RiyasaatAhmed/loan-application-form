import type { PropsWithChildren, ReactElement } from "react";

/**
 * Page wrapper component that provides consistent styling and layout.
 * Centers content with max width and provides proper spacing.
 *
 * @param props - Component props
 * @param props.children - Child components to render
 * @returns React element containing the page wrapper
 */
export function Page({ children }: PropsWithChildren): ReactElement {
  return (
    <main className="p-8 min-h-[calc(100vh-75px)] max-w-[1280px] mx-auto">
      {children}
    </main>
  );
}
