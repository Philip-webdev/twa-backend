const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const profile = require('./models/profiling');
const cookie = require('./models/cookie');
const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://phil_web:test123@cluster0.wsfgf9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI);
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
    
app.post('/profile', async(req, res)=>{
const freshPerson = new profile(req.body);

freshPerson.save()
.then((result)=>{res.json(result)})

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});