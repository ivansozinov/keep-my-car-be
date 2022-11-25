const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cars' }]
});

userSchema.statics.findByEmail = function (email, cb) {
    return this.findOne({ email: email }, cb);
}

/*userSchema.methods.getAuthCode = function (cb) {
    return this.model('users').findOne({ email: this.email }, cb);
}*/

const User = mongoose.model('users', userSchema);

module.exports = User;