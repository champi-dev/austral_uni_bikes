var mongoose = require('mongoose');
var Bike = require('../../models/bike');
// var server = require('../../bin/www');
var axios = require('axios');

var baseUrl = 'http://localhost:3000/api/bikes';

describe('Bike api', () => {
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

  describe('GET bikes', () => {
    it('Status 200', (done) => {
      axios.get(baseUrl).then(res => {
        expect(res.status).toBe(200);
        expect(res.data.bikes.length).toBe(0);

        var a = {
          code: 1, 
          color: 'red', 
          model: 'urban', 
          lat: -34.6012424,
          lng: -58.3861497
        }

        axios.post(baseUrl + '/create', a).then(() => {
          axios.get(baseUrl).then(res => {
            expect(res.status).toBe(200);
            expect(res.data.bikes.length).toBe(1);
            done();
          });
        })
      })
    });
  })
})

xdescribe('POST bikes /create', () => {
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

xdescribe('POST bikes /delete', () => {
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

xdescribe('POST bikes /update', () => {
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