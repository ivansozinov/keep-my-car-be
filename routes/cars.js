const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Cars = require('../models/cars');

// get all my cars
router.get('/', async (req, res, next) => {
    const cars = await Cars.find({ '_id': { $in: res.locals.user.cars } });
    res.json(cars);
});

// save and attache new car
router.post('/', async (req, res) => {
    const car = new Cars(req.body);
	await car.save();
    const user = new User(res.locals.user);
    user.cars.push(car._id);
    await user.save();
	res.send(car);
});

module.exports = router;