var Bike = require('../../models/bike');

exports.bike_list = function (req, res) {
  res.status(200).json({
    bikes: Bike.all
  });
};

exports.bike_create = function (req, res) {
  var bike = new Bike(
    req.body.id,
    req.body.color,
    req.body.model
  );
  bike.location = [req.body.lat, req.body.lng];
  Bike.add(bike);

  res.status(200).json({
    bike
  });
};