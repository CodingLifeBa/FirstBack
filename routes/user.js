// routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt= require('jsonwebtoken');
const router = express.Router();

// Route pour enregistrer un nouvel utilisateur
router.post('/register', async (req, res) => {
    try {
        const { nom, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Créer un nouvel utilisateur
        user = new User({
            nom,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Route pour le login d'un utilisateur
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        

        res.status(200).json({ msg: 'User logged in successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;
