
const express = require('express');
const cors = require('cors');
const session = require('express-session'); 
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
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
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
const corsOptions = {
    origin: ['https://nexr-pi.vercel.app','https://philip-webdev.github.io',  'https://sandbox.monnify.com', 'http://localhost:5173'  ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json()); 
 
app.use(cors(corsOptions));


app.use(session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb+srv://philisobank21:twa123@cluster1.cege3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
        collectionName: "profiles",
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: 'None',
        httpOnly: true, // Prevents client-side access to cookies
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
}));


        const ensureAdmin = async (req, res, next) => {
            const user = Profile;

            req.session.user = { id: user._id, role: "user" };
            if (!req.session.user || req.session.user.role !== "user") {
                return res.status(403).json({ message: "Access denied. registered users only." });
            }
            next();
        };
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

app.get('/api/cryptoblogs', async (req, res) => {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=4a218c19-80f5-4eb9-828e-f3e4dd8b05f1`;
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


app.post('/api/monnify', async (req, res) => {
 //   const freshAccounts = new Account(req.body);
 const { walletReference, walletName, customerName, bvn, bvnDateOfBirth, customerEmail} = req.body;

 const requestBody = {
     walletReference,
     walletName,
     customerName,
     bvnDetails: {
         bvn,
         bvnDateOfBirth,
     },
     customerEmail,
     accountNumber:'8588872723'
 };
 const headers = {
     Authorization: `Basic ${authString}`,
     'Content-Type': 'application/json'
 };
    const url = `https://sandbox.monnify.com/api/v1/disbursements/wallet`;
    try {
        const action = await fetch(url, requestBody, {headers} );
        const data = await action.json();
        const result = res.json(data);
 
     console.log(result);
    
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// app.get('/api/monnify', async (req, res) => {
//     const url = `https://sandbox.monnify.com/api/v1/disbursements/wallet`;
//     try {
//         const response = await fetch(url, {headers});
//         const data = await response.json();
//        const result = res.json(data);

//     console.log(result);
//     } catch (error) {
//         res.status(500).send(error.toString());
//     }
// });

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
    
    const url = 'https://sandbox.monnify.com/api/v1/disbursements/wallet/balance?accountNumber=${accountNumber}';
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


app.post('/register', async (req, res) => {
    try {
        const { email, password   } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const freshPerson = new Profile({ email, password: hashedPassword });
        const result = await freshPerson.save();
        res.json(result);
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/login',   async (req, res) => {
    
try{
    // Find the user by email
    const { email, password  } = req.body;
   
    const user = await Profile.findOne({ email });
   
    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password  )) {
        // Set the user on the session
        req.session.user = { id: user._id, role: "user" };
        return res.json({ message: "Logged in successfully", redirectUrl: "/" });
         
    }

    res.status(401).json({ message: "Invalid credentials" });
} catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}});

app.post('/wallets', async (req, res) => {
    try {
        const { Address } = req.body;
        const walletAddress = new Account({addresses: Address}); 
        const result = await walletAddress.save();
        res.json(result);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } } );

    app.get('/wallets',  async (req, res) => {
        try {
            const resultAddresses = await Account.find({addresses}); // Fetch all profiles
           
            res.json(resultAddresses);
        } catch (error) {
            console.error('Error fetching Addresses :', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/profiledkey', async (req, res) => {
        try {
            const { p_k } = req.body;
            const privatekeys = new Account ({p_k: p_k}); 
            res.json(privatekeys);
        } catch (error) {
            console.error('Error fetching key:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }); 

app.get('/profiledkey', async (req, res) => {
    try {
        const results = await Account.find({p_k});
       
        res.json(results);
    } catch (error) {
        console.error('Error fetching acc:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 


