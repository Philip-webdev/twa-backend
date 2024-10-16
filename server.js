const express = require('express');
const cors = require('cors');
import axios from 'axios';


const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend domain
const corsOptions = {
    origin: 'https://philip-webdev.github.io', // Replace with your GitHub Pages URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Example API endpoint
app.get('/telegram-webApp/orderly',  (req, res) => {
    const response =  axios.get('https://twa-backend-g83o.onrender.com/telegram-webApp/orderly');
    console.log(response.data); }
);
    


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});