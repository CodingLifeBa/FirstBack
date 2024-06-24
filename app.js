const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/meshotels");
const userRoutes = require("./routes/user");
const app = express();
const path = require("path");
app.use(express.json());
require('dotenv').config(); 

mongoose
  .connect(
  'mongodb+srv://Admin:NgurDam2000IssA@backendcrud.4sn4x5j.mongodb.net/backendCrud?retryWrites=true&w=majority&appName=backendCrud',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors(
  {
    origin:["https://first-back-sigma.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
   
));


  
  next();
});

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/meshotels", hotelRoutes);
app.use("/api/auth", userRoutes);


app.get("/api/info", (req, res) => {
  res.send(`Backend URL is ${process.env.BACKEND_URL}`);
});

const PORT = process.env.PORT || 3000; // Utiliser la variable d'environnement pour le port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



module.exports = app;
