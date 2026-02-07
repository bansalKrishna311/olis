import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler, validateBody, checkRateLimit } from '@/lib/api/middleware';
import { ApiResponse, HelloRequest } from '@/lib/api/types';

/**
 * Example endpoint demonstrating production-ready patterns:
 * - Error handling
 * - Validation
 * - Rate limiting
 * - Proper TypeScript types
 */

const handler = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting (basic implementation)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitCheck = checkRateLimit(ip, 10, 60000);

  if (!rateLimitCheck.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded',
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        }
      }
    );
  }

  // Validate request body
  const validation = await validateBody<HelloRequest>(
    request,
    (body): body is HelloRequest => {
      return typeof body === 'object' && typeof body.name === 'string';
    }
  );

  if (!validation.valid) {
    return NextResponse.json(
      {
        success: false,
        error: validation.error,
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 400 }
    );
  }

  const { name, message } = validation.data;

  // Business logic here
  const response: ApiResponse = {
    success: true,
    data: {
      greeting: `Hello, ${name}!`,
      message: message || 'Welcome to the API',
      processed: true,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
    },
  });
});

export const POST = handler;
