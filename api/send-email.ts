import { Resend } from 'resend';
import { Request, Response } from 'express';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  fullname: string;
  email: string;
  message: string;
}

export default async (req: Request, res: Response): Promise<Response> => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullname, email, message }: ContactFormData = req.body;

    // Validate required fields
    if (!fullname || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send email using Resend
    console.log(`📧 Attempting to send email to: iamshuklau@gmail.com`);
    console.log(`📝 From: ${fullname} (${email})`);
    console.log(`📄 Subject: Portfolio Contact - ${fullname}`);
    
    const data = await resend.emails.send({
      from: 'Utkarsh Portfolio <onboarding@resend.dev>', // Changed sender name
      to: ['iamshuklau@gmail.com'], // Your email address (must match your Resend account email)
      subject: `Portfolio Contact - ${fullname}`, // Simplified subject
      text: `
New Portfolio Contact Form Message

From: ${fullname}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${fullname}.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #333; margin-bottom: 20px;">
            New Portfolio Contact Message
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${fullname}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">Message:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            This message was sent from your portfolio contact form.<br>
            Reply directly to this email to respond to ${fullname}.
          </p>
        </div>
      `,
      reply_to: email, // This allows you to reply directly to the sender
    });

    console.log('Email sent successfully:', data);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: (data as any).data?.id || (data as any).id
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}; 