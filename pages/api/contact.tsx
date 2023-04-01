import { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';
import { rateLimit } from 'express-rate-limit';

/**
 * Constant of Express.js middlewares to run (needed for rate limiting).
 * Inspired by https://kittygiraudel.com/2022/05/16/rate-limit-nextjs-api-routes/.
 */
const middlewares = [
  rateLimit({
    keyGenerator: (request) =>
      request.headers['x-real-ip'] ||
      request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress,
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2, // limit each IP to 2 requests per windowMs
    message: {
      message: 'Too many requests, please try again later.',
    },
  }),
];

/**
 * Makes Express.js middlewares (like express-rate-limit) compatible with
 * Next.js API routes.
 */
const applyMiddleware =
  (middleware: any) => (request: NextApiRequest, response: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(request, response, (result: any) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });

/**
 * Applies all Express.js middlewares to the request and response.
 */
async function applyRateLimit(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map((middleware) => middleware(request, response))
  );
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  }

  // Get JSON body of request holding the form values.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('Received contact form: ', body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (
    body.name.length <= 0 ||
    body.email.length <= 0 ||
    body.message.length <= 0
  ) {
    // Sends a HTTP bad request error code
    return res.status(400).json({
      message: 'Please fill in all the fields.',
      success: false,
    });
  }

  // Attempt sending the contact form data to my email via Twilio SendGrid API.
  if (!process.env.SENDGRID_API_KEY) {
    // Sends a HTTP internal server error code
    return res.status(500).json({
      message: 'SendGrid not set up.',
      success: false,
    });
  }

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  if (!process.env.CONTACT_EMAIL) {
    // Sends a HTTP internal server error code
    return res.status(500).json({
      message: 'No contact email address found.',
      success: false,
    });
  }

  try {
    await sendgrid.send({
      to: process.env.CONTACT_EMAIL,
      from: process.env.CONTACT_EMAIL ? process.env.CONTACT_EMAIL : '',
      subject: 'Message via fabiancdng.com',
      replyTo: body.email,
      html: `
              <div>
                  <h1>Message via fabiancdng.com</h1>
                  <p>From: ${body.name} ${body.email}</p>

                  <hr />

                  <p>${body.message}</p>

                  <hr />

                  <p>Received: ${new Date().toLocaleString('de-DE', {
                    timeZone: 'Europe/Amsterdam',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}</p>
              </div>
          `,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        'Something went wrong. Please try again later or send an email directly.',
      success: false,
    });
  }

  // Sends a HTTP success code
  return res.status(200).json({
    message: 'Success! Your message has been sent.',
    success: true,
  });
};

export default handler;
