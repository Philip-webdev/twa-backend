const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://Twa_admin:twa_project1@twa-cluster.z9twx.mongodb.net/?retryWrites=true&w=majority&appName=Twa-Cluster';

const corsOptions = {
    origin: 'https://philip-webdev.github.io/telegram-webApp',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json()); // Make sure to parse JSON request bodies

mongoose.connect(dbURI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
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
