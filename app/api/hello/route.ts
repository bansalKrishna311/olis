import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/hello
 * Basic hello world endpoint with query parameter support
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || 'World';

    // Simulate async operation (e.g., database query)
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(
      {
        success: true,
        message: `Hello, ${name}!`,
        timestamp: new Date().toISOString(),
        path: request.nextUrl.pathname,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/hello:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/hello
 * Handle POST requests with JSON body
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    // Basic validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Name is required and must be a string',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          greeting: `Hello, ${name}!`,
          receivedMessage: message || null,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/hello:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body',
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
