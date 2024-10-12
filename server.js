const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend domain
const corsOptions = {
    origin: 'https://https://philip-webdev.github.io/telegram-webApp/', // Replace with your GitHub Pages URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Example API endpoint
app.get('/orderly', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});