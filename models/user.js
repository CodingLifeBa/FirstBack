const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
