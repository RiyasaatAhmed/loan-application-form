import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { secrets } from "../statics/secrets";
import { HTTP_STATUS, API_ERROR_MESSAGES } from "../statics/backend-endpoints";
import { DEFAULT_EMPTY_STRING } from "../statics/constants";

/**
 * Configured Axios instance with default settings.
 * Provides HTTP client with timeout, headers, and base URL configuration.
 *
 * @constant {AxiosInstance} apiClient - The configured Axios instance
 */
const apiClient: AxiosInstance = axios.create({
  timeout: secrets.API_TIMEOUT,
  headers: { "Content-Type": "application/json" },
  baseURL: secrets.BACKEND_URL,
});

/**
 * Request interceptor for logging and debugging.
 * Currently passes through requests without modification.
 */
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling common errors and logging.
 * Provides centralized error handling and response logging.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle common error cases
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          // Unauthorized - redirect to login
          console.warn(API_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case HTTP_STATUS.FORBIDDEN:
          // Forbidden - user doesn't have permission
          console.error(data?.message || API_ERROR_MESSAGES.FORBIDDEN);
          break;
        case HTTP_STATUS.NOT_FOUND:
          // Not found
          console.error(data?.message || API_ERROR_MESSAGES.NOT_FOUND);
          break;
        case HTTP_STATUS.VALIDATION_ERROR:
          // Validation error
          console.error(data?.message || API_ERROR_MESSAGES.VALIDATION_ERROR);
          break;
        case HTTP_STATUS.RATE_LIMITED:
          // Rate limited
          console.error(data?.message || API_ERROR_MESSAGES.RATE_LIMITED);
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          // Server error
          console.error(
            data?.message || API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
          );
          break;
        default:
          console.error(data?.message || API_ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    } else if (error.request) {
      // Network error
      console.error(error.message || API_ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      // Other error
      console.error(error.message || API_ERROR_MESSAGES.UNKNOWN_ERROR);
    }
    return Promise.reject(error);
  }
);

/**
 * API service class providing HTTP methods and utilities.
 * Wraps Axios client with additional functionality for file uploads, downloads, and health checks.
 */
class ApiService {
  private client: AxiosInstance;

  /**
   * Creates an instance of ApiService.
   *
   * @param client - The Axios instance to use for HTTP requests
   */
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  /**
   * Performs a GET request.
   *
   * @param url - The URL to request
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async get<T = Response>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * Performs a POST request.
   *
   * @param url - The URL to request
   * @param data - Optional data to send in the request body
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async post<T = Response>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a PUT request.
   *
   * @param url - The URL to request
   * @param data - Optional data to send in the request body
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async put<T = Response>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a PATCH request.
   *
   * @param url - The URL to request
   * @param data - Optional data to send in the request body
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async patch<T = Response>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a DELETE request.
   *
   * @param url - The URL to request
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async delete<T = Response>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * Uploads a file with progress tracking.
   *
   * @param url - The URL to upload to
   * @param file - The file to upload
   * @param onProgress - Optional callback for progress updates
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async upload<T = Response>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.client.post<T>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  }

  /**
   * Downloads a file from the server.
   *
   * @param url - The URL to download from
   * @param filename - Optional filename for the download
   * @returns Promise that resolves when download is complete
   */
  async download(url: string, filename?: string): Promise<void> {
    const response = await this.client.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  /**
   * Performs a health check on the API.
   *
   * @returns Promise resolving to true if API is healthy, false otherwise
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get("/health");
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the current base URL.
   *
   * @returns The current base URL or empty string if not set
   */
  getBaseURL(): string {
    return this.client.defaults.baseURL || DEFAULT_EMPTY_STRING;
  }

  /**
   * Sets the base URL for all requests.
   *
   * @param url - The new base URL
   */
  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }
}

/**
 * Singleton instance of the API service.
 * Provides a configured instance ready for use throughout the application.
 *
 * @constant {ApiService} apiService - The configured API service instance
 */
const apiService = new ApiService(apiClient);

export default apiService;
