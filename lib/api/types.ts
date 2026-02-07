/**
 * API Response Types
 * Standardized response structures for API endpoints
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: string;
  timestamp: string;
  path?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Example API request/response types
 */
export interface HelloRequest {
  name: string;
  message?: string;
}

export interface HelloResponse {
  greeting: string;
  receivedMessage: string | null;
}
