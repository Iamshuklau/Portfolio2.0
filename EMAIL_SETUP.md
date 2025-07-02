# Portfolio Contact Form with Resend API Setup

## Overview
Your contact form is now configured to send emails using Resend API. The frontend form will submit data to a backend API endpoint that handles email sending.

## What's Been Added

### Frontend Changes (assets/js/script.js)
- Form submission handler that prevents default behavior
- Loading state management (button shows "Sending..." during submission)
- Success/error notifications with beautiful styling
- Form reset after successful submission

### Backend Files Created
- `api/send-email.js` - Main email handler using Resend API
- `server.js` - Express server for local development
- `package.json` - Dependencies and scripts
- `vercel.json` - Configuration for Vercel deployment

## Setup Instructions

### 1. Get Resend API Key
1. Go to [Resend.com](https://resend.com)
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 2. Environment Variables
Create a `.env` file in your project root with:
```
RESEND_API_KEY=your_resend_api_key_here
PORT=3001
NODE_ENV=production
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Update Email Configuration
In `api/send-email.js`, update:
- Line 35: Change `to: ['mrshuklau@gmail.com']` to your email address
- Line 34: Optionally change the `from` address (requires domain verification)

### 5. Local Development
```bash
npm run dev
```
Your API will run on `http://localhost:3001`

Update the frontend fetch URL in `assets/js/script.js` line 19 to:
```javascript
const response = await fetch('http://localhost:3001/api/send-email', {
```

### 6. Production Deployment Options

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Add environment variable: `vercel env add RESEND_API_KEY`
4. Your API will be available at `https://your-project.vercel.app/api/send-email`

#### Option B: Other Platforms
- **Netlify Functions**: Move `api/send-email.js` to `netlify/functions/`
- **Railway**: Connect GitHub repo and add environment variables
- **Heroku**: Deploy with `git push heroku main`

### 7. Update Frontend for Production
Once deployed, update the fetch URL in `assets/js/script.js` to your production API endpoint:
```javascript
const response = await fetch('https://your-domain.vercel.app/api/send-email', {
```

## Email Template
The email you receive will include:
- Sender's name and email
- Message content with nice formatting
- Reply-to set to sender's email (you can reply directly)
- Professional styling

## Security Features
- CORS headers configured
- Input validation (required fields, email format)
- Error handling with appropriate status codes
- API key secured in environment variables

## Troubleshooting

### Common Issues
1. **CORS Error**: Make sure CORS headers are set in the API
2. **API Key Error**: Verify your Resend API key is correct
3. **Email Not Sending**: Check your Resend dashboard for send limits
4. **Frontend Not Connecting**: Verify the API URL is correct

### Testing
Test your setup:
1. Fill out the contact form
2. Check browser network tab for successful POST request
3. Check your email inbox
4. Verify Resend dashboard shows the sent email

## Form Features
- Real-time validation (button enables when all fields filled)
- Loading state during submission
- Success notification with auto-dismiss
- Error handling with user-friendly messages
- Form reset after successful submission
- Mobile-responsive notifications

Your contact form is now fully functional with professional email delivery! 