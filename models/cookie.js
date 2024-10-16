const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Food_choice: {
        type: String,
        required: true
    },
    Customary_preferred: {
        type: String,
        required: true
    },
    socialmedia_prefer: {
        type: String,
        required: true
    }
  },
    { timestamps: true});

    const Cookie =  mongoose.model('Cookie', blogSchema);
    module.exports = Cookie;