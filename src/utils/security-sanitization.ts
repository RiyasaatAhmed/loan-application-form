/**
 * Security sanitization functions for input validation and cleaning
 *
 * This module provides comprehensive input sanitization to prevent:
 * - XSS attacks
 * - Script injection
 * - Protocol-based attacks
 * - HTML injection
 * - SQL injection patterns
 */

import {
  ALLOWED_QUERY_KEYS,
  MAX_PARAM_LENGTH,
  MAX_SEARCH_LENGTH,
  MAX_PATHNAME_LENGTH,
  ALLOWED_PATHNAME_PATTERN,
  DANGEROUS_PATHNAME_PATTERNS,
  DANGEROUS_CHARS,
  DANGEROUS_PATTERNS,
} from "../statics/security-config";
import { DEFAULT_EMPTY_STRING } from "../statics/constants";

/**
 * Enhanced sanitization with multiple security layers
 * @param input - Input to sanitize
 * @returns Sanitized input
 */
const enhancedSanitize = (input: string): string => {
  let sanitized = input;

  // Layer 1: Remove dangerous characters
  sanitized = sanitized.replace(DANGEROUS_CHARS, DEFAULT_EMPTY_STRING);

  // Layer 2: Remove dangerous patterns
  DANGEROUS_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, DEFAULT_EMPTY_STRING);
  });

  return sanitized;
};

/**
 * Sanitizes and validates query parameter input to prevent security vulnerabilities
 *
 * @param key - The parameter key to validate
 * @param value - The parameter value to sanitize
 * @returns Sanitized value or null if invalid
 */
export const sanitizeQueryParam = (
  key: string,
  value: string
): string | null => {
  // Early validation
  if (!key || !value) {
    return null;
  }

  // Validate key is allowed
  if (!ALLOWED_QUERY_KEYS.has(key)) {
    console.warn(`🚫 Blocked unauthorized query parameter: ${key}`);
    return null;
  }

  // Validate value length
  if (value.length > MAX_PARAM_LENGTH) {
    console.warn(
      `📏 Query parameter value too long: ${key} (${value.length} > ${MAX_PARAM_LENGTH})`
    );
    return null;
  }

  // Apply enhanced sanitization
  const sanitized = enhancedSanitize(value);

  // Final validation - ensure we didn't remove everything
  if (sanitized.length === 0 && value.trim().length > 0) {
    console.warn(`🧹 Input completely sanitized for parameter: ${key}`);
    return null;
  }

  return sanitized;
};

/**
 * Validates and sanitizes search input specifically
 *
 * @param searchValue - The search value to sanitize
 * @returns Sanitized search value or empty string
 */
export const sanitizeSearchInput = (searchValue: string): string => {
  // Early validation
  if (!searchValue) {
    return DEFAULT_EMPTY_STRING;
  }

  // Validate length
  if (searchValue.length > MAX_SEARCH_LENGTH) {
    console.warn(
      `📏 Search input too long: ${searchValue.length} > ${MAX_SEARCH_LENGTH}`
    );
    return DEFAULT_EMPTY_STRING;
  }

  const sanitized = enhancedSanitize(searchValue);
  return sanitized || DEFAULT_EMPTY_STRING;
};

/**
 * Sanitizes and validates pathname to prevent security vulnerabilities
 *
 * This function provides comprehensive pathname security:
 * 1. Length validation to prevent DoS attacks
 * 2. Pattern validation to ensure only safe characters
 * 3. Path traversal prevention
 * 4. Protocol injection prevention
 * 5. XSS prevention
 *
 * @param pathname - The pathname to sanitize
 * @returns Sanitized pathname or default safe path if invalid
 *
 */
export const sanitizePathname = (pathname: string): string => {
  // Early validation - return safe default for falsy values
  if (!pathname || typeof pathname !== "string") {
    return "/";
  }

  // Validate length to prevent DoS attacks
  if (pathname.length > MAX_PATHNAME_LENGTH) {
    console.warn(
      `📏 Pathname too long: ${pathname.length} > ${MAX_PATHNAME_LENGTH}`
    );
    return "/";
  }

  // Check for dangerous patterns first
  for (const pattern of DANGEROUS_PATHNAME_PATTERNS) {
    if (pattern.test(pathname)) {
      console.warn(`🚫 Dangerous pathname pattern detected: ${pathname}`);
      return "/";
    }
  }

  // Validate against allowed pattern
  if (!ALLOWED_PATHNAME_PATTERN.test(pathname)) {
    console.warn(`🚫 Invalid pathname characters detected: ${pathname}`);
    return "/";
  }

  // Additional validation: ensure path starts with /
  if (!pathname.startsWith("/")) {
    console.warn(`🚫 Pathname must start with /: ${pathname}`);
    return "/";
  }

  // Additional validation: prevent multiple consecutive slashes
  if (pathname.includes("//")) {
    console.warn(`🚫 Multiple consecutive slashes detected: ${pathname}`);
    return "/";
  }

  return pathname;
};
