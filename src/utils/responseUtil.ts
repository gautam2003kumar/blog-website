// src/utils/responseUtil.ts
import { ApiResponse } from '@/types/ApiResponse';

export function serveApiResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  error?: string | Record<string, any>,
  statusCode: number = success ? 200 : 500
): ApiResponse<T> {
  return { success, message, data, error, statusCode };
}
