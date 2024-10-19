const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('./models/profiling');
const Cookie = require('./models/cookie');
const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://phil_web:test123@cluster0.wsfgf9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI);
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: 'https://philip-webdev.github.io', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));


app.get('/telegram-webApp/orderly',  (req, res) => {
   // const response =  axios.get('https://twa-backend-g83o.onrender.com/telegram-webApp/orderly');
    console.log(res.json(result)); }
);

app.get('/profile', (req, res)=> {const info = res.json({message:'hi'});
console.log(info)}
); 
 
app.post('/profiler', (req, res)=>{
const freshPerson = new Profile(req.body);

freshPerson.save()
.then((result)=>{
    res.json(result);
    console.log(result);
})

});

app.get('/profiler', (req, res)=>{
    try{
    res.json({result})
    console.log({result});
    }
    catch{
        (err)=>{
            console.log(err);
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
