const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
     
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    
    password: {
        type: String,
        required: true
    }, 
   
  },
    { timestamps: true});

    const Profile =  mongoose.model('Profile', blogSchema);
    module.exports = Profile;