var mongoose = require('mongoose');
var Bike = require('../../models/bike');
// var doesntExist = require('../utils').doesntExist;

describe('Bike model', () => {
  beforeEach(function (done) {
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to a test db');
      done();
    });
  });

  afterEach(function (done) {
    Bike.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      done();
    })
  });

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

// TODO: https://www.coursera.org/learn/desarrollo-lado-servidor-nodejs-express-mongodb/lecture/hT5H6/odm-utilizando-mongoose-en-nuestro-proyecto
// min 16:20

// Bike.testReset = function () {
//   Bike.all.forEach(b => {
//     Bike.removeById(b.id)
//   })
// };

// beforeEach(() => {
//   Bike.testReset()
// })

// describe('Bike model', () => {
//   describe('Bike.all', () => {
//     it('begins empty', () => {
//       expect(Bike.all.length).toBe(0);
//     });
//   });

//   describe('Bike.add', () => {
//     it('adds one bike', () => {
//       var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);

//       Bike.add(a);
//       expect(Bike.all.length).toBe(1);
//       expect(Bike.all[0]).toBe(a);
//     })
//   })

//   describe('Bike.findById', () => {
//     it('returns bike with correct id', () => {
//       var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);
//       var b = new Bike(2, 'blanca', 'urban', [-32.6012424, -57.3861497]);

//       Bike.add(a);
//       Bike.add(b);

//       var targetBike = Bike.findById(1);
//       expect(targetBike.id).toBe(1);
//       expect(targetBike.color).toBe('red');
//       expect(targetBike.model).toBe('urban');
//       expect(targetBike.location).toEqual([-34.6012424, -58.3861497]);
//     });
//   })

//   describe('Bike.removeById', () => {
//     it('removes a bike', async () => {
//       var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);
//       var b = new Bike(2, 'blanca', 'urban', [-32.6012424, -57.3861497]);

//       Bike.add(a);
//       Bike.add(b);
//       Bike.removeById(1);
//       var notFound = await doesntExist(() => Bike.findById(1));
//       expect(notFound).toBe(true);
//     })
//   })
// });