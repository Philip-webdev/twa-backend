const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    walletName: {
        type: String,
        required: true
    },
    walletReference: {
        type: String,
        required: true
    },
    customerEmail : {
        type: String,
        required: true
    }
  },
    { timestamps: true});

    const Account =  mongoose.model('Account ', blogSchema);
    module.exports = Account ;