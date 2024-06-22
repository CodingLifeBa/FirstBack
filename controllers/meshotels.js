const Hotel = require("../models/Hotels");

exports.createHotel = (req, res, next) => {
  const objetHotel = {
    nom: req.body.nom,
    adresse: req.body.adresse,
    email: req.body.email,
    numero: req.body.numero,
    prix: req.body.prix,
    devise: req.body.devise,
    image: req.body.image,
  };

  delete objetHotel._id;
  delete objetHotel._userId;

  const hotel = new Hotel({
    ...objetHotel,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  hotel
    .save()
    .then(() => {
      res.status(201).json({
        message: "Hotel saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.modifyHotel = (req, res, next) => {
  Hotel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteHotel = (req, res, next) => {
  Hotel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneHotel = (req, res, next) => {
  Hotel.findOne({ _id: req.params.id })
    .then((hotel) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllHotel = (req, res, next) => {
  Hotel.find()
    .then((hotel) => {
      const reversedHotel = hotel.reverse();
      res.status(200).json(reversedHotel);
    })
    .catch((error) => res.status(400).json({ error }));
};
