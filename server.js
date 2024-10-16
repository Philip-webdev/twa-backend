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
app.get('/telegram-webApp/orderly', async (req, res) => {
    const response = await axios.get('https://twa-backend-g83o.onrender.com/telegram-webApp/orderly');
    console.log(response.data); 
);
    //const rawData = [product_data_1, product_data_2, product_data_3, product_data_4,product_data_5,product_data_6,product_data_7, product_data_8, product_data_9 ];
  // const rawData = product_data_1;
     //  res.json(rawData);});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});