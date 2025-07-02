"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const resend_1 = require("resend");
// Initialize Resend with your API key
console.log('🔑 Loading API key from environment...');
console.log('API Key present:', process.env.RESEND_API_KEY ? 'Yes' : 'No');
console.log('API Key starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_') ? 'Yes' : 'No');

if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not found in environment variables');
    console.log('Please check your .env file contains: RESEND_API_KEY=your_key_here');
}

const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
exports.default = async (req, res) => {
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
        const { fullname, email, message } = req.body;
        // Validate required fields
        if (!fullname || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
            id: data.data?.id || data.id
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};
