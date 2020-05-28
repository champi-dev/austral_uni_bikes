(function () {
	"use strict";

	var mymap = L.map('mapid').setView([51.505, -0.09], 0);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(mymap);

	axios.get('/api/bikes').then(data => {
		var bikes = data.data.bikes

		bikes.forEach(bike => {
			L.marker(
				bike.location, { title: bike.color + ' ' + bike.model }
			).addTo(mymap)
		});
	})
})()
