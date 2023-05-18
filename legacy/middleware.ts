// middleware.js

import { NextRequest, NextResponse } from 'next/server';
import GetCurrentTimestamp from './utils/get-time-stamp';

export function middleware(request: NextRequest) {
  let scope = '';
  let pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api')) {
    scope = ' api';
  } else if (pathname.startsWith('/_next/static')) {
    scope = ' _next/static';
  } else if (pathname.startsWith('/_next/image')) {
    scope = ' _next/image';
  }

  console.log(
    `\x1b[34m[${GetCurrentTimestamp()}] \x1b[33m[${
      request.method
    }${scope}]\x1b[0m`,
    request.nextUrl.href
  );

  return NextResponse.next();
}
