import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Types
interface UseQueryParamsReturn {
  getParam: (key: string) => string;
  getAllParams: () => Record<string, string>;
  updateQuery: (updates: Record<string, string | null>) => void;
  clearQuery: () => void;
}

// Constants
const DEFAULT_EMPTY_STRING = "";

/**
 * Custom hook for managing URL query parameters with React Router
 * Provides utilities to get, update, and clear query parameters
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
   * Get a single query parameter value
   * @param key - The parameter key to retrieve
   * @returns The decoded parameter value or empty string if not found
   */
  const getParam = useCallback(
    (key: string): string => {
      const value = searchParams.get(key);
      return value ? decodeURIComponent(value) : DEFAULT_EMPTY_STRING;
    },
    [searchParams]
  );

  /**
   * Get all query parameters as an object
   * @returns Object containing all query parameters
   */
  const getAllParams = useCallback((): Record<string, string> => {
    const params: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      params[key] = decodeURIComponent(value);
    }

    return params;
  }, [searchParams]);

  /**
   * Update multiple query parameters
   * @param updates - Object containing parameter updates (null values will be removed)
   */
  const updateQuery = useCallback(
    (updates: Record<string, string | null>): void => {
      const newSearchParams = new URLSearchParams(location.search);

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === DEFAULT_EMPTY_STRING
        ) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      // Convert to object for React Router
      const searchObject: Record<string, string> = {};
      newSearchParams.forEach((value, key) => {
        searchObject[key] = value;
      });

      navigate(
        {
          pathname: location.pathname,
          search: new URLSearchParams(searchObject).toString(),
        },
        { replace: true }
      );
    },
    [location.search, location.pathname, navigate]
  );

  /**
   * Clear all query parameters
   */
  const clearQuery = useCallback((): void => {
    navigate(
      {
        pathname: location.pathname,
        search: "",
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
