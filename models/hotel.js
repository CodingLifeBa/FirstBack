const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    nom: {
        type: String,
        
      
    },
    email: {
        type: String,
      
       
    },
    prix: {
        type: Number,
     
    },
    adresse: {
        type: String,
        
    },
    numero: {
        type: Number,
      
    },
    devise: {
        type: String,
       
    },
    photo: {
        type: String,
      
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);
