const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
     
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }, 
    P_k: {
        type: Array ,
         required: true
    }, 
    addresses: {
        type: Array ,
        required: true
         
    }
  },
    { timestamps: true});

    const Profile =  mongoose.model('Profile', blogSchema);
    module.exports = Profile;