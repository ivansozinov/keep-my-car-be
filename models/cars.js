const mongoose = require('mongoose');

const carsSchema = mongoose.Schema({
    vin: String,
    manufacturer: String,
    model: String,
    submodel: String,
    modification: String,
    engine: {
        engineType: String,
        volume: Number,
        power: {
            hp: Number,
            kw: Number
        }
    },
    transmission: {
        transmissionType :String,
        gears: Number,
        drive: String
    },
    cabinType: String,
    productionYear: Number,
    color: String,
    images: [String],
    mileage: Number,
    dateOfPurchase: Date,
    dateOfSale: Date
});

const Car = mongoose.model('cars', carsSchema);

module.exports = Car;