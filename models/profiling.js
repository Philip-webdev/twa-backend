const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    }
  },
    { timestamps: true});

    const Profile =  mongoose.model('Profile', blogSchema);
    module.exports = Profile;