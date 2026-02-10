// app/api/events/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event, IEvent } from '@/database'; // Assuming your Event model is exported this way

/**
 * Handles GET requests to retrieve event details by slug.
 * @param request The NextRequest object.
 * @param params An object containing dynamic route parameters, specifically { slug: string }.
 * @returns A NextResponse object containing the event data or an error message.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> } // params may be async
) {
  const { slug } = await context.params; // unwrap params

  if (!slug) {
    return NextResponse.json({ success: false, message: 'Event slug is required.' }, { status: 400 });
  }

  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json({ success: false, message: `Event with slug '${slug}' not found.` }, { status: 404 });
    }

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}
