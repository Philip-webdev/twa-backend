const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Account_name: {
        type: String,
        required: true
    },
    Account_number: {
        type: String,
        required: true
    },
    customer_email : {
        type: String,
        required: true
    }
  },
    { timestamps: true});

    const Account =  mongoose.model('Account ', blogSchema);
    module.exports = Account ;