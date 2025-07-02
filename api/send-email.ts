import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fullname, email, message } = req.body;

  // Basic validation
  if (!fullname || !email || !message) {
    return res.status(400).json({ error: 'Full name, email, and message are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['iamshuklau@gmail.com'], // Your destination email
      subject: `New Message from ${fullname} via Portfolio`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullname}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
      reply_to: email,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ error: 'Failed to send email.' });
    }

    return res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (exception) {
    console.error(exception);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}; 