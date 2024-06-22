const mongoose = require("mongoose");

const hotelShema = mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  numero: { type: String, required: true },
  prix: { type: Number, required: true },
  devise: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Hotels", hotelShema);
