const session = require('express-session');

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: ONE_WEEK
    }
}

const sessionProvider = session(sessionConfig);

const shareSessionWithViews = (req, res, next) => {
    res.locals.session = req.session;
    next();
}

module.exports = [sessionProvider, shareSessionWithViews];