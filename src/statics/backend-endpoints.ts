export const API_ENDPOINTS = {
  LOANS: {
    GET_LOANS: "/loan-applications",
    CREATE: "/loan-applications",
    BY_ID: (id: string) => `/loan-applications/${id}`,
    UPDATE: (id: string) => `/loan-applications/${id}`,
    DELETE: (id: string) => `/loan-applications/${id}`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error occurred",
  UNAUTHORIZED: "You are not authorized to access this resource",
  FORBIDDEN: "Access forbidden",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Server error occurred",
  UNKNOWN_ERROR: "An unknown error occurred",
} as const;
