const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'Please log in to continue.');
        return res.redirect('/auth/login');
    }
    next();
}
