/**
 * Security configuration constants for input validation and sanitization
 */

/** Valid query parameter keys to prevent injection attacks */
export const ALLOWED_QUERY_KEYS = new Set([
  "name", // Search by loan applicant name
  "status", // Filter by loan status
]);

/** Maximum length for query parameter values */
export const MAX_PARAM_LENGTH = 100;

/** Maximum length for search queries */
export const MAX_SEARCH_LENGTH = 50;

/** Maximum length for pathname to prevent DoS attacks */
export const MAX_PATHNAME_LENGTH = 200;

/** Allowed pathname patterns - only allow alphanumeric, hyphens, underscores, and forward slashes */
export const ALLOWED_PATHNAME_PATTERN = /^[a-zA-Z0-9\-_/]*$/;

/** Dangerous pathname patterns to block */
export const DANGEROUS_PATHNAME_PATTERNS = [
  /\.\./g, // Path traversal attempts
  /%2e%2e/gi, // URL-encoded path traversal
  /%2f/gi, // URL-encoded forward slash
  /%5c/gi, // URL-encoded backslash
  /<script/gi, // Script injection
  /javascript:/gi, // JavaScript protocol
  /data:/gi, // Data protocol
  /vbscript:/gi, // VBScript protocol
];

/** Characters to remove from user input */
export const DANGEROUS_CHARS = /[<>"'&]/g;

/** Comprehensive dangerous patterns to remove from user input */
export const DANGEROUS_PATTERNS = [
  // Protocol-based attacks
  /javascript:/gi, // JavaScript protocol
  /data:/gi, // Data protocol
  /vbscript:/gi, // VBScript protocol

  // Event handlers
  /onload=/gi, // Event handlers
  /onerror=/gi, // Event handlers
  /onclick=/gi, // Event handlers

  // HTML injection
  /<script/gi, // Script tags
  /<\/script>/gi, // Closing script tags
  /<iframe/gi, // Iframe tags
  /<object/gi, // Object tags
  /<embed/gi, // Embed tags

  // JavaScript function calls
  /eval\s*\(/gi, // eval() function calls
  /function\s*\(/gi, // Function declarations
  /setTimeout\s*\(/gi, // setTimeout calls
  /setInterval\s*\(/gi, // setInterval calls

  // Browser object access
  /document\./gi, // Document object access
  /window\./gi, // Window object access
  /location\./gi, // Location object access
  /history\./gi, // History object access

  // Storage access
  /localStorage/gi, // Local storage access
  /sessionStorage/gi, // Session storage access
  /cookie/gi, // Cookie access

  // User interaction functions
  /alert\s*\(/gi, // Alert calls
  /confirm\s*\(/gi, // Confirm calls
  /prompt\s*\(/gi, // Prompt calls

  // Network requests
  /fetch\s*\(/gi, // Fetch API calls
  /XMLHttpRequest/gi, // XHR calls

  // Module loading
  /import\s*\(/gi, // Dynamic imports
  /require\s*\(/gi, // Require calls

  // System access
  /process\./gi, // Node.js process access
  /global\./gi, // Global object access
];
