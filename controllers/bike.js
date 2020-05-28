var Bike = require('../models/bike');

exports.bike_list = function (req, res) {
  res.render('bikes/index', { bikes: Bike.all });
};

exports.bike_create_get = function (req, res) {
  res.render('bikes/create');
};

exports.bike_create_post = function (req, res) {
  var bike = new Bike(
    req.body.id, 
    req.body.color, 
    req.body.model
  );

  bike.location = [req.body.lat, req.body.lng];
  Bike.add(bike);

  res.redirect('/bikes');
};

exports.bike_update_get = function (req, res) {
  var bike = Bike.findById(req.params.id);
  res.render('bikes/update', { bike });
};

exports.bike_update_post = function (req, res) {
  var bike = Bike.findById(req.params.id);
  bike.id = req.body.id;
  bike.model = req.body.model;
  bike.color = req.body.color;
  bike.location = [req.body.lat, req.body.lng];

  res.redirect('/bikes');
};

exports.bike_delete_post = function (req, res) {
  Bike.removeById(req.body.id);
  res.redirect('/bikes');
};