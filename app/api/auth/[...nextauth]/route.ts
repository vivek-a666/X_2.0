import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export async function GET(request: Request) {
  return await handle(request);
}

export async function POST(request: Request) {
  return await handle(request);
}

async function handle(request: Request) {
  try {
    const session = await NextAuth(request, {
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
      ],
      // Add any other Next-Auth configuration options here
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error in Next-Auth route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}