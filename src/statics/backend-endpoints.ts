/**
 * API configuration and error messages for loan application system
 */

/** API endpoints for loan applications */
export const API_ENDPOINTS = {
  LOANS: {
    GET_LOANS: "/loan-applications",
    CREATE: "/loan-applications",
    BY_ID: (id: string) => `/loan-applications/${id}`,
    UPDATE: (id: string) => `/loan-applications/${id}`,
    DELETE: (id: string) => `/loan-applications/${id}`,
  },
} as const;

/** HTTP status codes */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  RATE_LIMITED: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/** User-friendly error messages */
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Please check your internet connection and try again.",
  UNAUTHORIZED:
    "You don't have permission to access this resource. Please log in.",
  FORBIDDEN: "You don't have permission to access this resource.",
  NOT_FOUND: "The information you're looking for could not be found.",
  SERVER_ERROR:
    "There's a problem with our servers. Please try again in a few moments.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  VALIDATION_ERROR:
    "There are some issues with the information you provided. Please check and try again.",
  RATE_LIMITED:
    "You're making requests too quickly. Please wait a moment before trying again.",
  INTERNAL_SERVER_ERROR:
    "We're experiencing technical difficulties. Our team has been notified.",
} as const;
