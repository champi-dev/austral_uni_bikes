var Bike = require('../../models/bike');

exports.bike_list = function (req, res) {
  Bike.all(function (err, bikes) {
    if (err) return console.error(err);

    res.status(200).json({
      bikes 
    });
  })
};

exports.bike_create = function (req, res) {
  var bike = new Bike({
    code: req.body.code,
    color: req.body.color,
    model: req.body.model,
    location: [req.body.lat, req.body.lng]
  });

  Bike.add(bike, function (err, newBike) {
    if (err) return console.error(err);

    res.status(200).json({
      bike: newBike
    });
  });
};

exports.bike_update = function (req, res) {
  Bike.findByCode(req.body.code, function (err, bikeFound) {
    if (err) return console.error(err);

    bikeFound.code = req.body.code;
    bikeFound.model = req.body.model;
    bikeFound.color = req.body.color;
    bikeFound.location = [req.body.lat, req.body.lng];
  
    res.status(200).json({
      bike: bikeFound
    });
  });
};

exports.bike_delete = function (req, res) {
  Bike.removeByCode(req.body.code, function (err, bikeRemoved) {
    if (err) return console.error(err);

    res.status(200).send()
  });
};