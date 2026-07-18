const User = require('../models/user');
const AppError = require('../utils/AppError');

module.exports.renderRegister = (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' });
};

module.exports.register = async (req, res, next) => {
    const user = req.body.user;
 
    const newUser = new User({
        email: user.email,
        username: user.username,
        password: user.password
    });

    const createdUser = await newUser.save();

    if (!createdUser) {
        return next(new AppError('Error creating new user.', 500, '/auth/register'));
    }

    req.session.userId = createdUser._id;

    req.flash('success', `Welcome to Vacancy Vibe, ${createdUser.username}!`);
    res.redirect('/motels');
};

module.exports.renderLogin = (req, res) => {
    res.render('auth/login', { pageTitle: 'Login' });
};

module.exports.login = async (req, res, next) => {
    const user = req.body.user;
    
    const foundUser = await User.findOne({ email: user.email.toLowerCase() });
    if (!foundUser) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/auth/login');
    }

    const vaildPassword = await foundUser.verifyPassword(user.password);

    if (!vaildPassword) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/auth/login');
    }

    req.session.userId = foundUser._id;

    req.flash('success', `Welcome back, ${foundUser.username}!`);
    res.redirect('/motels');
};

module.exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }

        res.clearCookie('connect.sid');

        res.redirect('/motels');
    });
};