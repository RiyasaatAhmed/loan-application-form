import type { Secret } from "../types/secret.types";

export const secrets: Secret = {
  BACKEND_URL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  TANSTACK_STALE_TIME: import.meta.env.VITE_PUBLIC_TANSTACK_STALE_TIME,
  TANSTACK_GARBAGE_COLLECTION_TIME: import.meta.env
    .VITE_PUBLIC_TANSTACK_GARBAGE_COLLECTION_TIME,
};
