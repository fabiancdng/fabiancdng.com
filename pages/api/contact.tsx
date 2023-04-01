import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
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

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({
    message: 'Success! Your message has been sent.',
    success: true,
  });
};

export default handler;
