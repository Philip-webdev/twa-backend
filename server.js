const express = require('express');
const cors = require('cors');
 
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const Account = require('./models/Accounts');
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
    origin: ['https://philip-webdev.github.io', 'http://localhost:5173', 'https://sandbox.monnify.com'],
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
app.get('/api/cryptocurrency', async (req, res) => {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=4a218c19-80f5-4eb9-828e-f3e4dd8b05f1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
       const result = res.json(data);

    console.log(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
const apiKey = "MK_TEST_GPRT2H96LH";
const clientSecret = "WP1FP56Y8RN58W7RSJFUWAHKCWD6BLD1";

// Create the Base64 string
const authString = Buffer.from(`${apiKey}:${clientSecret}`).toString('base64');

// Add the header to your request

const header = {
    method: 'POST',
    Authorization: `Basic ${authString}`
};

const headers = {
    Authorization: `Basic ${authString}`
};
app.post('/api/monnify', async (req, res) => {
    const freshAccounts = new Account(req.body);
    const url = `https://sandbox.monnify.com/api/v1/disbursements/wallet`;
    try {
        const action = await fetch(url, {header},freshAccounts);
       console.log(action.data);
       const result = await freshAccounts.save();
       console.log(result);
    
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/walletdetails', async (req, res) => {
    const url = `https://sandbox.monnify.com/api/v1/disbursements/wallet`;
    try {
        const response = await fetch(url, {headers});
        const data = await response.json();
       const result = res.json(data);

    console.log(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/AccBalance', async (req, res)=> { 
    
    const url = 'https://sandbox.monnify.com/api/v1/disbursements/wallet/balance';
    try {
        const response = await fetch(url, {headers});
        const data = await response.json();
       const result = res.json(data);

    console.log(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
} );
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
