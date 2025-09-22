import { FlexLayout, Text, Button, StackLayout } from "@salt-ds/core";
import { RefreshIcon, ErrorIcon } from "@salt-ds/icons";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  className?: string;
}

export function Error({
  message = "Something went wrong. Please try again.",
  onRetry,
  showRetryButton = true,
  className,
}: ErrorProps) {
  return (
    <FlexLayout
      direction="column"
      align="center"
      justify="center"
      className={`h-[calc(100vh-180px)] w-full ${className}`}
    >
      <StackLayout
        gap={3}
        align="center"
        className="text-center max-w-md px-6!"
      >
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <ErrorIcon className="text-red-600 w-8! h-8!" />
        </div>

        <StackLayout gap={2} align="center">
          <Text styleAs="h3" color="primary">
            Oops! Something went wrong
          </Text>
          <Text color="secondary" className="text-sm">
            {message}
          </Text>
        </StackLayout>

        {showRetryButton && onRetry && (
          <Button
            sentiment="accented"
            appearance="bordered"
            onClick={onRetry}
            className="mt-2"
          >
            <RefreshIcon aria-hidden />
            Try Again
          </Button>
        )}
      </StackLayout>
    </FlexLayout>
  );
}
