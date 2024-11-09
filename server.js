const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const app = express();
const dbURI = 'mongodb+srv://Twa_admin:twa_project1@twa-cluster.z9twx.mongodb.net/?retryWrites=true&w=majority&appName=Twa-Cluster';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(4000, () => {
            console.log(`Server running on 4000}`);
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

app.use(cors(corsOptions));
app.use(express.json()); // Make sure to parse JSON request bodies


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
