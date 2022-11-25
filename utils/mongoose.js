const mongoose = require('mongoose');

module.export = mongoose.connect('mongodb://localhost:27017/keep-my-car', function (err) {
   if (err) throw err;
   console.log('MongoDB connected');
});