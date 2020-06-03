var Bike = require('../../models/bike');
// var server = require('../../bin/www');
var axios = require('axios');

describe('Bike api', () => {
  describe('GET bikes', () => {
    it('Status 200', async () => {
      expect(Bike.all.length).toBe(0);

      var a = new Bike(1, 'red', 'urban', [-34.6012424, -58.3861497]);
      Bike.add(a);

      const res = await axios.get('http://localhost:3000/api/bikes');
      expect(res.status).toBe(200)
    })
  })

  describe('POST bikes /create', () => {
    it('Status 200', async () => {
      var a = {
        id: 10,
        color: 'red',
        model: 'normal',
        lat: -34.6012424,
        lng: -58.3861497
      }

      const res = await axios.post('http://localhost:3000/api/bikes/create', a)
      expect(res.status).toBe(200)
    })
  })

  describe('POST bikes /delete', () => {
    it('Deletes a bike', async () => {
      var a = {
        id: 10,
        color: 'red',
        model: 'normal',
        lat: -34.6012424,
        lng: -58.3861497
      }

      await axios.post('http://localhost:3000/api/bikes/create', a)
      const res = await axios.post('http://localhost:3000/api/bikes/delete', { id: a.id })
      expect(res.status).toBe(200)
    })
  })
  
  describe('POST bikes /update', () => {
    it('Deletes a bike', async () => {
      var a = {
        id: 10,
        color: 'red',
        model: 'normal',
        lat: -34.6012424,
        lng: -58.3861497
      }

      var aUpdated = {
        id: 10,
        color: 'blue',
        model: 'super',
        lat: -64.6012424,
        lng: -78.3861497
      }

      await axios.post('http://localhost:3000/api/bikes/create', a)
      const res = await axios.post('http://localhost:3000/api/bikes/update', aUpdated)
      expect(res.status).toBe(200)
    })
  })
});