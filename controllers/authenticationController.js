const User = require('../models/user');
const AppError = require('../utils/AppError');

module.exports.renderRegister = (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' });
};

module.exports.register = async (req, res, next) => {
    // REGISTER THE USER
};

module.exports.renderLogin = (req, res) => {
    res.render('auth/login', { pageTitle: 'Login' });
};

module.exports.login = async (req, res, next) => {
    // LOGIN THE USER (user.verifyPassword(password))
};

module.exports.logout = (req, res, next) => {
    // LOGOUT THE USER Probably just destroy the session. 
};