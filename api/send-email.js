const { Resend } = require('resend');

module.exports = async (req, res) => {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Set CORS headers for preflight OPTIONS request and actual request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['iamshuklau@gmail.com'],
      subject: `Message from ${fullname}`,
      html: `
        <p>Name: ${fullname}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
      reply_to: email,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (exception) {
    console.error(exception);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}; 