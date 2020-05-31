var Bike = require('../../models/bike');
var doesntExist = require('../utils').doesntExist;

Bike.testReset = function () {
  Bike.all.forEach(b => {
    Bike.removeById(b.id)
  })
};

beforeEach(() => {
  Bike.testReset()
})

describe('Bike model', () => {
  describe('Bike.all', () => {
    it('begins empty', () => {
      expect(Bike.all.length).toBe(0);
    });
  });

  describe('Bike.add', () => {
    it('adds one bike', () => {
      var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);

      Bike.add(a);
      expect(Bike.all.length).toBe(1);
      expect(Bike.all[0]).toBe(a);
    })
  })

  describe('Bike.findById', () => {
    it('returns bike with correct id', () => {
      var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);
      var b = new Bike(2, 'blanca', 'urban', [-32.6012424, -57.3861497]);

      Bike.add(a);
      Bike.add(b);

      var targetBike = Bike.findById(1);
      expect(targetBike.id).toBe(1);
      expect(targetBike.color).toBe('red');
      expect(targetBike.model).toBe('urban');
      expect(targetBike.location).toEqual([-34.6012424, -58.3861497]);
    });
  })

  describe('Bike.removeById', () => {
    it('removes a bike', async () => {
      var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);
      var b = new Bike(2, 'blanca', 'urban', [-32.6012424, -57.3861497]);

      Bike.add(a);
      Bike.add(b);
      Bike.removeById(1);
      var notFound = await doesntExist(() => Bike.findById(1));
      expect(notFound).toBe(true);
    })
  })
});