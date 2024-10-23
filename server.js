const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const Cookie = require('./models/cookie');
const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://Twa_admin:twa_project1@twa-cluster.z9twx.mongodb.net/?retryWrites=true&w=majority&appName=Twa-Cluster'
mongoose.connect(dbURI).then(app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}))
.catch((err)=>{console.log(err)});

const corsOptions = {
    origin: 'https://philip-webdev.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/telegram-webApp/orderly',  (req, res) => {
   // const response =  axios.get('https://twa-backend-g83o.onrender.com/telegram-webApp/orderly');
    console.log(res.json(result)); }
);

app.get('/profile', (req, res)=> {
    
  const info =  axios.get('https://twa-backend-g83o.onrender.com/profiler');
    const infoFrontend = res.json(info);
console.log(infoFrontend);
}
); 

app.post('/profiler', (req, res)=>{

const freshPerson = new Profile(req.body);

freshPerson.save()
.then((result)=>{
    res.json(result);
   // console.log({profiles: result});
})

});

app.get('/profiler',  (req, res) => {

       const results = Profile.find(); // Fetch all profiles
    results.then( res.json(results))
   
     .catch ((error)=> {
        console.error('Error fetching profiles:', error);
       res.status(500).json({ error: 'Internal Server Error' });
})});
