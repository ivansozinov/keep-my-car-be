const express = require('express');
const router = express.Router();
const User = require('../models/users');
const redisClient = require('../utils/redis');
const { generateJWT } = require('../utils/auth');
const { genereateKey } = require('../utils/common');

router.post('/getAuthCode', (req, res, next) => {
    if(!req.body.email || req.body.email === '') {
        const error = new Error('Email is empty')
        error.status = 400;
        throw error;
    };

    User.findByEmail(req.body.email, (err, user) => {
        if(err) {
            next(err);
        }

        if(!user) {
            const err = new Error('User not found');
            err.status = 404;
            next(err);
        } else {
            redisClient.set('login:' + user.email, genereateKey(6));
            res.status(201).send();
        }
    });
});

// login
router.post('/auth', async (req, res, next) => {
    if(!req.body.email || req.body.email === '' || !req.body.code || req.body.code === '') {
        const error = new Error('Email or code is empty')
        error.status = 400;
        throw error;
    };

    User.findByEmail(req.body.email, (err, user) => {
        if(err) {
            next(err);
        }

        if(!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        redisClient.get('login:' + user.email).then((code) => {
            const jwt = generateJWT(user);
            if(code.toString() === req.body.code) {
                res.cookie('userCookie', jwt, { secure: false });
                res.json({token: jwt});
                redisClient.del('login:' + user.email);
            } else {
                const err = new Error('Can\'t match codes');
                err.status = 400;
                next(err);
            }
        });
    });
});

module.exports = router;