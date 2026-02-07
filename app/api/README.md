# API Routes

This directory contains the API routes for the application, built with Next.js App Router.

## Structure

```
api/
├── hello/          # Basic hello world endpoint
├── health/         # Health check for monitoring
├── example/        # Full-featured example with middleware
└── README.md
```

## Endpoints

### GET /api/hello

Basic hello world endpoint with optional query parameter.

**Query Parameters:**
- `name` (optional): Name to greet

**Example:**
```bash
curl http://localhost:3000/api/hello?name=John
```

**Response:**
```json
{
  "success": true,
  "message": "Hello, John!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/hello"
}
```

### POST /api/hello

Handle POST requests with JSON body.

**Request Body:**
```json
{
  "name": "John",
  "message": "Optional message"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"name":"John","message":"Hello from the client"}'
```

### GET /api/health

Health check endpoint for monitoring and load balancers.

**Example:**
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

### POST /api/example

Full-featured example endpoint with middleware, validation, and rate limiting.

**Features:**
- Error handling wrapper
- Request validation
- Rate limiting (10 requests per minute)
- Proper TypeScript types
- Standardized response format

**Request Body:**
```json
{
  "name": "John",
  "message": "Optional message"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/example \
  -H "Content-Type: application/json" \
  -d '{"name":"John","message":"Test message"}'
```

## Production-Ready Features

### 1. Error Handling
All endpoints include try-catch blocks and return standardized error responses.

### 2. TypeScript Types
- `lib/api/types.ts`: Shared types for API requests/responses
- Strongly typed request/response objects
- Type guards for validation

### 3. Middleware
- `lib/api/middleware.ts`: Reusable middleware utilities
- Error handling wrapper
- Request validation
- CORS support
- Basic rate limiting

### 4. Response Standards
All API responses follow a consistent format:
```typescript
{
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  timestamp: string;
}
```

### 5. HTTP Status Codes
- 200: Success
- 400: Bad Request
- 429: Too Many Requests
- 500: Internal Server Error
- 503: Service Unavailable

## Testing

You can test the API endpoints using curl, Postman, or any HTTP client:

```bash
# Test GET endpoint
curl http://localhost:3000/api/hello

# Test POST endpoint
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"name":"Developer"}'

# Test health check
curl http://localhost:3000/api/health

# Test example endpoint
curl -X POST http://localhost:3000/api/example \
  -H "Content-Type: application/json" \
  -d '{"name":"Developer","message":"Testing"}'
```

## Development

To add a new API endpoint:

1. Create a new directory under `app/api/`
2. Add a `route.ts` file with your handler
3. Use the middleware utilities from `lib/api/middleware.ts`
4. Define types in `lib/api/types.ts`
5. Follow the standardized response format

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/api/middleware';
import { ApiResponse } from '@/lib/api/types';

const handler = withErrorHandler(async (request: NextRequest) => {
  // Your logic here
  return NextResponse.json({
    success: true,
    data: { /* your data */ },
    timestamp: new Date().toISOString(),
  } as ApiResponse);
});

export const GET = handler;
export const POST = handler;
```

## Deployment Considerations

1. **Environment Variables**: Use `.env.local` for local development and configure environment variables in your deployment platform
2. **Rate Limiting**: The basic rate limiting is in-memory. For production, use Redis or a dedicated service
3. **Monitoring**: Connect the `/api/health` endpoint to your monitoring service
4. **Logging**: Implement proper logging (e.g., Winston, Pino) instead of console.log
5. **Authentication**: Add authentication middleware for protected routes
6. **CORS**: Configure CORS properly for your frontend domain
