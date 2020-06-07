var mongoose = require('mongoose');
var Booking = require('./booking');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String
});

userSchema.methods.book = function (bikeId, from, to, cb) {
  var booking = new Booking({
    user: this._id,
    bike: bikeId,
    from,
    to
  })
  booking.save(cb)
};

module.exports = mongoose.model('User', userSchema);