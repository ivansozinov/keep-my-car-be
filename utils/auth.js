const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.isAuthorized  = function(req, res, next) {
    if (!req.headers.authorization) {
        const err = new Error('No auth token found, check headers');
        err.status = 401;
        next(err);
    }

    let userEmail = '';

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'asshole85');
        userEmail = decodedToken.email;
    } catch(err) {
        err.status = 401;
        next(err);
    }

    User.findByEmail(userEmail, (err, user) => {
        if(err) {
            next(err);
        }

        if(!user) {
            const err = new Error('User not found');
            err.status = 401;
            next(err);
        } else {
            res.locals.user = user;
            next()
        }
    });
};

exports.generateJWT = function (user) {
    const data = {
      name: user.name,
      email: user.email
    }
    return jwt.sign(data, 'asshole85')
}