const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const Cookie = require('./models/cookie');
const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://Twa_admin:twa_project1@twa-cluster.z9twx.mongodb.net/?retryWrites=true&w=majority&appName=Twa-Cluster'
mongoose.connect(dbURI);

const corsOptions = {
    origin: ['https://philip-webdev.github.io','https://twa-backend-g83o.onrender.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/telegram-webApp/orderly',  (req, res) => {
   // const response =  axios.get('https://twa-backend-g83o.onrender.com/telegram-webApp/orderly');
    console.log(res.json(result)); }
);

app.get('/profile', (req, res)=> {const info = res.json({message:'hi'});
console.log(info)}
); 

app.post('/profiler', (req, res)=>{
    console.log('passed')
const freshPerson = new Profile(req.body);

freshPerson.save()
.then((result)=>{
    res.json(result);
    console.log({Profile: result});
})

});

app.get('/profiler',  (req, res) => {
    try {
        const results = Profile.find(); // Fetch all profiles
        res.json(results);
    } catch (error) {
        console.error('Error fetching profiles:', error);
       // res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
