const express = require("express");
const router = express.Router();
const axios = require("axios");
const Trip = require("../models/LocationModel");
const Location = require("../models/TripModel");
const apiKey = "ad2a455b26a132204d39870ab339bf22";

const converter = async function(url) {
  let result = await axios.get(url);
  return result.data;
};

router.get(`/convert/:name`, async function(req, res) {
  const { name } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  let coords = await converter(url);
  coords = {
    lat: coords.coord.lat,
    lng: coords.coord.lon
  };
  res.send(coords);
});
router.get(`/convert/:lat/:lng`, async function(req, res) {
  const { lat, lng } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
  let name = await converter(url).name;
  res.send(name);
});

router.get(`/myTrips`, async function(req, res) {
  const trips = await Trip.find({}).populate("locations");
  res.send(trips);
});

// router.get(`/location/:name`, async function(req, res) {
//   const { name } = req.params;
//   const location = await Location.findOne({ name: name });
//   res.send(location);
// });

router.post(`/trip`, async function(req, res) {
  const tripObj = req.body;
  const trip = new Trip(tripObj);
  await trip.save();
  console.log(`saved ${trip}`);
  res.end();
});

router.post(`/location`, async function(req, res) {
  const locationObj = req.body;
  const location = new Location(locationObj);
  await location.save();
  await Trip.findOneAndUpdate({name = location.trip}, {$push:{locations: location}})
  res.end();
});

router.delete(`/trip/:name`, async function(req, res) {
  const { name } = req.params;
  const trip = await Trip.findOne({ name: name });
  trip.locations.forEach(async function(L) {
    let name = L.name;
    await Location.deleteOne({ name: name });
  });
  await Trip.deleteOne({ name: name });
  console.log(`deleted trip: ${name}`);
  res.end();
});

router.delete(`/location/:id`, async function(req, res) {
  const { id } = req.params;
  const trip = await Location.findOne({ _id: id }).trip;
  await Trip.findOne({ name: trip }).locations.deleteOne({ _id: id });
  await Location.deleteOne({ _id: id });
  console.log(`deleted location: ${name}`);
  res.end();
});

module.exports = router;
