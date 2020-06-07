var mongoose = require('mongoose');
var Bike = require('../../models/bike');
// var doesntExist = require('../utils').doesntExist;

describe('Bike model', () => {
  var mongoDB = 'mongodb://localhost/testdbmodel';
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    console.log('We are connected to a test db for the model');
  });

  beforeEach(function () {
    Bike.deleteMany({}, function (err, success) {
      if (err) console.log(err);
    })
  });

  afterEach(function () {
    Bike.deleteMany({}, function (err, success) {
      if (err) console.log(err);
    })
  })

  describe('Bike.createInstance', () => {
    it('creates a Bike instance', () => {
      var bike = Bike.createInstance(1, 'green', 'urban', [-34.5, -54.1]);
      expect(bike.code).toBe(1);
      expect(bike.color).toBe('green');
      expect(bike.model).toBe('urban');
      expect(bike.location[0]).toBe(-34.5);
      expect(bike.location[1]).toBe(-54.1);
    });
  });

  describe('Bike.all', () => {
    it('starts empty', (done) => {
      Bike.all(function (err, bikes) {
        expect(bikes.length).toBe(0);
        done();
      })
    });
  });

  describe('Bike.add', () => {
    it('adds one bike', (done) => {
      var a = new Bike({ code: 1, color: 'red', model: 'urban' });

      Bike.add(a, function (err, newBike) {
        if (err) console.log(err);

        Bike.all(function (err, bikes) {
          expect(bikes.length).toBe(1);
          expect(bikes[0].code).toBe(a.code);
          done();
        })
      });
    })
  });

  describe('Bike.findByCode', () => {
    it('returns bike with code 1', (done) => {
      var a = new Bike({ code: 1, color: 'red', model: 'urban' });
      var b = new Bike({ code: 2, color: 'blue', model: 'rural' });

      Bike.addMany([
        { bike: a },
        {
          bike: b, cb: function () {
            Bike.findByCode(1, function (err, bikeFound) {
              expect(bikeFound.code).toBe(a.code);
              done();
            })
          }
        }
      ]);
    })
  });
});