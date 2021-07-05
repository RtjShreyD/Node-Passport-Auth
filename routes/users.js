const express = require('express');
const router = express.Router();

const { createPerson, loginPerson, logoutPerson } = require('../controllers/usercontroller')


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


router.post('/register', createPerson);

// Login handler
router.post('/login', loginPerson);

//Logout Handle
router.get('/logout', logoutPerson);

module.exports = router;