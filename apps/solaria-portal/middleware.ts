import { NextResponse } from 'next/server';
import { auth } from './lib/auth/auth';

export async function middleware(request: Request) {
  const session = await auth();

  if (request.url.includes('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
    
    // Add logic for role checking here if roles are in user object
    // For now, protecting route is sufficient
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
