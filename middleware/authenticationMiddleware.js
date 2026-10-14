const User = require('../models/user');

module.exports = async (req, res, next) => {
    res.locals.currentUser = null;
    res.locals.currentUrl = req.originalUrl;

    if (!req.session.userId) {
        return next();
    }
    
    const user = await User.findById(req.session.userId);

    if (user) {
        req.user = user;
        res.locals.currentUser = user;
    }

    next();
}