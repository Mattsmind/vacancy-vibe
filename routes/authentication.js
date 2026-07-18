const express = require('express');
const router = express.Router();

const auth = require('../controllers/authenticationController');

const validateForm = require('../middleware/validateForm');
const loginValidation = require('../models/loginValidation');
const userValidation = require('../models/userValidation');

router.route('/register')
    .get(auth.renderRegister)
    .post(validateForm(userValidation, 'user'), auth.register);

router.route('/login')
    .get(auth.renderLogin)
    .post(validateForm(loginValidation, 'user'), auth.login);

router.post('/logout', auth.logout);

module.exports = router;