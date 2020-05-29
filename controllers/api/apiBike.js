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

exports.bike_update = function (req, res) {
  var bike = Bike.findById(req.body.id);
  bike.id = req.body.id;
  bike.model = req.body.model;
  bike.color = req.body.color;
  bike.location = [req.body.lat, req.body.lng];

  console.log(Bike.all)

  res.status(200).json({
    bike
  });
};

exports.bike_delete = function (req, res) {
  Bike.removeById(req.body.id);
  res.status(200).send()
};