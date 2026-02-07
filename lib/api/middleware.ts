import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from './types';

/**
 * API Middleware utilities for production-ready error handling
 */

export type ApiHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

/**
 * Wrap API handlers with error handling and logging
 */
export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error('API Error:', {
        path: request.nextUrl.pathname,
        method: request.method,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Internal server error',
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 500 }
      );
    }
  };
}

/**
 * Validate request body against a schema
 */
export async function validateBody<T>(
  request: NextRequest,
  validator: (body: any) => body is T
): Promise<{ valid: true; data: T } | { valid: false; error: string }> {
  try {
    const body = await request.json();
    if (validator(body)) {
      return { valid: true, data: body };
    }
    return { valid: false, error: 'Invalid request body format' };
  } catch (error) {
    return { valid: false, error: 'Failed to parse request body' };
  }
}

/**
 * CORS headers for API routes
 */
export function withCORS(response: NextResponse, allowOrigins = '*'): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', allowOrigins);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

/**
 * Rate limiting check (basic implementation)
 * For production, use a proper rate limiting solution
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests = 100,
  windowMs = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}
