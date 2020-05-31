var Bike = function (id, color, model, location) {
  this.id = id;
  this.color = color;
  this.model = model;
  this.location = location;
};

Bike.all = [];

Bike.add = function (singleBike) {
  Bike.all.push(singleBike);
};

Bike.findById = function (id) {
  var bike = Bike.all.find(b => b.id == id);
  if (bike) return bike;
  throw new Error(`Bike with ${id} does not exist`);
};

Bike.removeById = function (id) {
  var filtered = [];
  Bike.all.forEach(bike => {
    if (bike.id != id) filtered.push(bike);
  });
  Bike.all = filtered;
};

Bike.prototype.toString = function () {
  return 'id: ' + this.id + " | color: " + this.color;
};

// var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);
// var b = new Bike(2, 'blanca', 'urban', [-32.6012424, -57.3861497]);

// Bike.add(a);
// Bike.add(b);

module.exports = Bike;