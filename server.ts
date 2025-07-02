import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendEmailHandler from './api/send-email';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/send-email', sendEmailHandler);

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Portfolio Backend API',
    endpoints: {
      '/api/send-email': 'POST - Send contact form email',
      '/api/health': 'GET - Health check'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 