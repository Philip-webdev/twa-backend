const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    P_k: {
        type: Array ,
         required: true
    }, 
    addresses: {
        type: Array ,
        required: true
         
    }
    // walletName: {
    //     type: String,
    //     required: true
    // },
    // walletReference: {
    //     type: String,
    //     required: true
    // },
    // customerEmail : {
    //     type: String,
    //     required: true
    // },
    // customerName : {
    //     type: String,
    //     required: true
    // }
  },
    { timestamps: true});

    const Account =  mongoose.model('Account ', blogSchema);
    module.exports = Account ;