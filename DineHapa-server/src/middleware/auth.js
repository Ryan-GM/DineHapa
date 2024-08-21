const session = require('express-session');

const auth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: 'Access denied. No session found' });
    }
};

module.exports = auth;
