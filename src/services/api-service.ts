import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { secrets } from "../statics/secrets";

// Create axios instance with cookies-based authentication
const apiClient: AxiosInstance = axios.create({
  timeout: 60 * 5 * 1000, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: secrets.BACKEND_URL,
});

// Request interceptor for logging and debugging
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses for debugging (remove in production)
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          console.warn("🔐 Unauthorized, redirecting to login...");
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.error(
            "🚫 Access forbidden:",
            data?.message || "Insufficient permissions"
          );
          break;
        case 404:
          // Not found
          console.error(
            "🔍 Resource not found:",
            data?.message || "Requested resource not found"
          );
          break;
        case 422:
          // Validation error
          console.error(
            "📝 Validation error:",
            data?.message || "Invalid data provided"
          );
          break;
        case 429:
          // Rate limited
          console.error(
            "⏰ Rate limited:",
            data?.message || "Too many requests"
          );
          break;
        case 500:
          // Server error
          console.error(
            "💥 Server error:",
            data?.message || "Internal server error"
          );
          break;
        default:
          console.error(
            `❌ API Error (${status}):`,
            data?.message || "Unknown error occurred"
          );
      }
    } else if (error.request) {
      // Network error
      console.error("🌐 Network error:", error.message);
    } else {
      // Other error
      console.error("❌ Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// API service class with cookies-based authentication
class ApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // Generic GET request
  async get<T = Response>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Generic POST request
  async post<T = Response>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T = Response>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Generic PATCH request
  async patch<T = Response>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  // Generic DELETE request
  async delete<T = Response>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Upload file with progress tracking
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

  // Download file
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

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get("/health");
      return true;
    } catch {
      return false;
    }
  }

  // Get base URL
  getBaseURL(): string {
    return this.client.defaults.baseURL || "";
  }

  // Set base URL
  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }
}

// Create and export singleton instance
const apiService = new ApiService(apiClient);

export default apiService;
