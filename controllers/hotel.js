const Hotel = require('../models/hotel')


const getHotels = async (req, res) => {

    try {
        const hotels = await Hotel.find({});
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




const getHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        res.status(200).json(hotel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const createHotel = async (req, res) => {
    try {
        const { nom, email, adresse, numero, prix, devise } = req.body;
        const photo = req.file; // Fichier téléchargé par Multer

        // Créez une nouvelle instance de l'hôtel avec le chemin de l'image
        const newHotel = new Hotel({
            nom,
            email,
            adresse,
            numero,
            prix,
            devise,
            photo: photo ? photo.path : null // Stockez le chemin du fichier dans votre modèle d'hôtel
        });

        // Enregistrez l'hôtel dans la base de données
        await newHotel.save();

        // Réponse réussie avec l'hôtel créé
        res.status(201).json(newHotel);
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la création de l\'hôtel :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'hôtel' });
    }
}




const updateHotel = async (req, res) => {

    try {
        const { id } = req.params;

        const hotel = await Hotel.findByIdAndUpdate(id, req.body);

        if (!hotel) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updateHotel = await Hotel.findById(id);
        res.status(200).json(updateHotel);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


const deleteHotel=async(req, res) => {
    try {
        const { id } = req.params;

        const hotel = await Hotel.findByIdAndDelete(id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({ message: "Hotel deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}




module.exports = {
    getHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
}