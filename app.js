const express = require('express');
const userRouter = require('./controller/manager');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Allow requests from specified origins
app.use(cors({
    origin: '*', // This allows all origins to access your API
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow all headers
}));

// Handle preflight requests globally
app.options('*', cors()); // This handles preflight requests for all routes

app.use(userRouter);

// Sample route
app.get('/', (req, res) => {
    res.send('You have entered the Storage Microservice backend !!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
