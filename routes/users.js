const express = require('express');
const router = express.Router();

const { createPerson, loginPerson, logoutPerson, verifyPerson } = require('../controllers/usercontroller')


//User model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

// Verify Email Page
router.get('/verifyotp', (req, res) => {
    res.render('verify');
})

//Verify Email handler
router.post('/verifyotp', verifyPerson);

router.post('/register', createPerson);

// Login handler
router.post('/login', loginPerson);

//Logout Handle
router.get('/logout', logoutPerson);

module.exports = router;