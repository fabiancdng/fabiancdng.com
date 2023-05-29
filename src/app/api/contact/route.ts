import sendgrid from '@sendgrid/mail';
import GetCurrentTimestamp from '@/utils/get-timestamp';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const rateLimit = {
  points: 2, // Set 2 points quota.
  duration: 1 * 60 * 60, // Reset every hour.
};

const rateLimiter = new RateLimiterMemory(rateLimit);

export async function POST(request: NextRequest) {
  const ipAddress = request.ip || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');

  if (!ipAddress) {
    return NextResponse.json(
      {
        message: 'Cannot identify client.',
        success: false,
      },
      { status: 400 }
    );
  }

  let rateLimiterResponse: RateLimiterRes;
  try {
    rateLimiterResponse = await rateLimiter.consume(ipAddress, 1);
  } catch (rateLimiterResponse: any) {
    return NextResponse.json(
      {
        message: 'Too many requests, please try again later.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimiterResponse.msBeforeNext / 1000),
          'X-RateLimit-Limit': String(rateLimit.points),
          'X-RateLimit-Remaining': String(rateLimiterResponse.remainingPoints),
          'X-RateLimit-Reset': new Date(Date.now() + rateLimiterResponse.msBeforeNext).toString(),
        },
      }
    );
  }

  const rateLimitHeadersForRequest = {
    'Retry-After': String(rateLimiterResponse.msBeforeNext / 1000),
    'X-RateLimit-Limit': String(rateLimit.points),
    'X-RateLimit-Remaining': String(rateLimiterResponse.remainingPoints),
    'X-RateLimit-Reset': String(Date.now() + rateLimiterResponse.msBeforeNext),
  };

  // Get JSON body of request holding the form values.
  const body: ContactFormValues = await request.json();

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log(`[${GetCurrentTimestamp()}] API: Received contact form: `, body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (body.name.length <= 0 || body.email.length <= 0 || body.message.length <= 0) {
    // Sends a HTTP bad request error code

    return NextResponse.json(
      {
        message: 'Please fill out all fields.',
        success: false,
      },
      { status: 400, headers: rateLimitHeadersForRequest }
    );
  }

  // Attempt sending the contact form data to my email via Twilio SendGrid API.
  if (!process.env.SENDGRID_API_KEY) {
    // Sends a HTTP internal server error code
    return NextResponse.json(
      {
        message: 'SendGrid not set up.',
        success: false,
      },
      { status: 500 }
    );
  }

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    // Sends a HTTP internal server error code
    return NextResponse.json(
      {
        message: 'No contact email address found.',
        success: false,
      },
      { status: 500, headers: rateLimitHeadersForRequest }
    );
  }

  try {
    await sendgrid.send({
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      from: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
      subject: 'Message via fabiancdng.com',
      replyTo: body.email,
      html: `
                <div>
                    <h1>Message via fabiancdng.com</h1>
                    <p>From: ${body.name} ${body.email}</p>

                    <hr />

                    <p>${body.message}</p>

                    <hr />

                    <p>Received: ${GetCurrentTimestamp()}</p>
                </div>
            `,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Something went wrong. Please try again later or send an email directly.',
        success: false,
      },
      { status: 500, headers: rateLimitHeadersForRequest }
    );
  }

  // Sends a HTTP success code
  return NextResponse.json(
    {
      message: 'Success! Your message has been sent.',
      success: true,
    },
    { status: 200, headers: rateLimitHeadersForRequest }
  );
}
