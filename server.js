const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const app = express();
const port = process.env.PORT || 1000;
const dbURI = 'mongodb+srv://philisobank21:twa123@cluster1.cege3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(port, () => {
            console.log(`Server running on 1000`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
const corsOptions = {
    origin: ['https://philip-webdev.github.io'],
    methods: ['GET', 'POST'],
    credentials: 'true',
    allowedHeaders: ['Content-Type'],
};

app.use(express.json()); // Make sure to parse JSON request bodies
 
app.use(cors(corsOptions));

app.get('/product', (req, res) => {
    res.json({ message: 'testing axios' });
});

app.get('/orderly', (req, res) => {
    res.json({ message: 'Welcome to my channel' });
});

app.get('/profile', async (req, res) => {
    try {
        const info = await axios.get('https://philip-webdev.github.io/telegram-webApp/profiler');
        res.json(info.data); // Return the actual data
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/profiler', async (req, res) => {
    try {
        console.log(req.body)
        const freshPerson = new Profile(req.body);
        const result = await freshPerson.save();
        res.json(result);
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/profiled', async (req, res) => {
    try {
        const results = await Profile.find(); // Fetch all profiles
        res.json(results);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 
