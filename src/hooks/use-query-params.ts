import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_EMPTY_STRING } from "../statics/constants";
import {
  sanitizeQueryParam,
  sanitizePathname,
} from "../utils/security-sanitization";

// Types
interface UseQueryParamsReturn {
  getParam: (key: string) => string;
  getAllParams: () => Record<string, string>;
  updateQuery: (updates: Record<string, string | null>) => void;
  clearQuery: () => void;
}

/**
 * Manages URL query parameters with React Router.
 *
 * @returns Object with query parameter utilities
 */
export const useQueryParams = (): UseQueryParamsReturn => {
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize search params to avoid recreating on every render
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  /**
   * Get a single query parameter value with sanitization.
   *
   * @param key - The parameter key to retrieve
   * @returns The sanitized and decoded parameter value or empty string if not found
   */
  const getParam = useCallback(
    (key: string): string => {
      const value = searchParams.get(key);
      if (!value) return DEFAULT_EMPTY_STRING;

      try {
        const decoded = decodeURIComponent(value);
        const sanitized = sanitizeQueryParam(key, decoded);
        return sanitized || DEFAULT_EMPTY_STRING;
      } catch (error) {
        console.warn(`Failed to decode query parameter ${key}:`, error);
        return DEFAULT_EMPTY_STRING;
      }
    },
    [searchParams]
  );

  /**
   * Get all query parameters as an object with sanitization.
   *
   * @returns Object containing all sanitized query parameters
   */
  const getAllParams = useCallback((): Record<string, string> => {
    const params: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      try {
        const decoded = decodeURIComponent(value);
        const sanitized = sanitizeQueryParam(key, decoded);
        if (sanitized) {
          params[key] = sanitized;
        }
      } catch (error) {
        console.warn(`Failed to decode query parameter ${key}:`, error);
      }
    }

    return params;
  }, [searchParams]);

  /**
   * Update multiple query parameters with sanitization.
   *
   * @param updates - Object containing parameter updates (null values will be removed)
   */
  const updateQuery = useCallback(
    (updates: Record<string, string | null>): void => {
      const newSearchParams = new URLSearchParams(location.search);

      // Apply updates with sanitization
      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === DEFAULT_EMPTY_STRING
        ) {
          newSearchParams.delete(key);
        } else {
          const sanitized = sanitizeQueryParam(key, value);
          if (sanitized) {
            newSearchParams.set(key, sanitized);
          } else {
            newSearchParams.delete(key);
          }
        }
      });

      // Convert to object for React Router
      const searchObject: Record<string, string> = {};
      newSearchParams.forEach((value, key) => {
        searchObject[key] = value;
      });

      navigate(
        {
          pathname: sanitizePathname(location.pathname),
          search: new URLSearchParams(searchObject).toString(),
        },
        { replace: true }
      );
    },
    [location.search, location.pathname, navigate]
  );

  /**
   * Clear all query parameters.
   */
  const clearQuery = useCallback((): void => {
    navigate(
      {
        pathname: sanitizePathname(location.pathname),
        search: DEFAULT_EMPTY_STRING,
      },
      { replace: true }
    );
  }, [location.pathname, navigate]);

  return {
    getParam,
    getAllParams,
    updateQuery,
    clearQuery,
  };
};
