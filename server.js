"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const send_email_1 = __importDefault(require("./api/send-email"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3001', 10);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.post('/api/send-email', send_email_1.default);
// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Portfolio API is running' });
});
// Root route
app.get('/', (req, res) => {
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
