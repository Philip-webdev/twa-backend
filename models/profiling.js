const mongoose = require('mongoose');
const { json } = require('stream/consumers');
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
    
    p_k: {
        type: any 
            
    }, 
    addresses: {
        type: any
        
  }},
    { timestamps: true});

    const Profile =  mongoose.model('Profile', blogSchema);
    module.exports = Profile;