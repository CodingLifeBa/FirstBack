const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Hotel = require('./models/hotel'); // Assurez-vous que le chemin vers votre modèle d'hôtel est correct
const hotelRoutes = require("./routes/hotel");
const userRoutes = require('./routes/user');
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");
const { getHotels } = require('./controllers/hotel');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;


// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Middleware pour Multer et gestion du téléchargement d'images
const MIME_TYPES = {
    'photo/jpg': 'jpg',
    'photo/jpeg': 'jpg',
    'photo/png': 'png'
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Dossier où les images seront stockées
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
        cb(null, Date.now() + '-' + file.originalname); // Nom du fichier enregistré
    }
});

module.exports=multer({ storage }).single('photo');
const upload = multer({ storage: storage });

// Route pour créer un nouvel hôtel avec une image
app.post('/api/hotels', upload.single('photo'), async (req, res) => {
    try {
        const { nom, email, adresse, numero, prix, devise } = req.body;
        const photo = req.file; // Fichier téléchargé par Multer

        const newHotel = new Hotel({
            nom,
            email,
            adresse,
            numero,
            prix,
            devise,
            photo: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // Stockez le chemin du fichier dans votre modèle d'hôtel
        });

await newHotel.save();

        await newHotel.save();
        res.status(201).json({ message: 'Hôtel créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création de l\'hôtel :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'hôtel' });
    }
});




const getHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        res.status(200).json(hotel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}











// Routes pour les utilisateurs et les hôtels
app.use('/api/users', userRoutes);
app.use("/api/hotels", hotelRoutes);


app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
// Connexion à MongoDB
mongoose.connect('mongodb+srv://Admin:NgurDam2000IssA@backendcrud.4sn4x5j.mongodb.net/backendCrud?retryWrites=true&w=majority&appName=backendCrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
