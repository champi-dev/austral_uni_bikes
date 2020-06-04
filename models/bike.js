var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeSchema = new Schema({
  code: Number,
  color: String,
  model: String,
  location: {
    type: [Number],
    index: { type: '2dsphere', sparse: true }
  }
});

bikeSchema.statics.createInstance = function (code, color, model, location) {
  return new this({
    code,
    color,
    model,
    location
  });
};

bikeSchema.statics.add = function (bike, cb) {
  this.create(bike, cb);
};

bikeSchema.statics.addMany = function (bikesArr) {
  bikesArr.forEach(bike => {
    this.add(bike.bike, bike.cb)
  })
}

bikeSchema.statics.findByCode = function (code, cb) {
  return this.findOne({ code }, cb);
}

bikeSchema.statics.removeByCode = function (code, cb) {
  return this.deleteOne({ code }, cb);
}

bikeSchema.statics.removeMany = function (codesArr) {
  codesArr.forEach(code => {
    this.removeByCode(code, code.cb)
  })
}

bikeSchema.statics.all = function (cb) {
  return this.find({}, cb);
};

bikeSchema.methods.toString = function () {
  return 'code: ' + this.code + " | color: " + this.color;
};

module.exports = mongoose.model('Bike', bikeSchema);