import { QueryClient } from "@tanstack/react-query";
import { secrets } from "../statics/secrets";

// Create a new query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: secrets.TANSTACK_STALE_TIME,
      gcTime: secrets.TANSTACK_GARBAGE_COLLECTION_TIME,
    },
  },
});
