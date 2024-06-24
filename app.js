const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/meshotels");
const userRoutes = require("./routes/user");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(express.json());
require('dotenv').config(); 

mongoose
  .connect(
  'mongodb+srv://Admin:NgurDam2000IssA@backendcrud.4sn4x5j.mongodb.net/backendCrud?retryWrites=true&w=majority&appName=backendCrud',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use(cors()); // Utilisez le middleware CORS ici


const allowedOrigins = [ "https://front-red-product.vercel.app","https://first-back-sigma.vercel.app"];

const corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());


  
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
