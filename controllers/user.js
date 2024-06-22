const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};




//forget password

exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  
  // Chercher l'utilisateur par email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }

      // Générer un jeton unique
      const token = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

      // Sauvegarder l'utilisateur avec le jeton et l'expiration
      user.save()
        .then(() => {
          // Configurer le transporteur d'e-mail
          const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          // Configurer les options de l'e-mail
          const mailOptions = {
            to: user.email,
            from: process.env.USER_EMAIL,
            subject: 'Réinitialisation du mot de passe',
            text: `Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe pour votre compte.\n\n
                   Cliquez sur le lien suivant, ou copiez-le dans votre navigateur pour compléter le processus:\n\n
                   http://${req.headers.host}/reset/${token}\n\n
                   Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`
          };

        
          // Envoyer l'e-mail
          transporter.sendMail(mailOptions, (err) => {
            if (err) {
              return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
            }
            res.status(200).json({ message: 'Un e-mail a été envoyé avec les instructions pour réinitialiser le mot de passe.' });
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/*
exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'Le jeton de réinitialisation du mot de passe est invalide ou a expiré.' });
      }

      bcrypt.hash(password, 10)
        .then(hash => {
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save()
            .then(() => res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' }))
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
*/