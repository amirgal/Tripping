const express = require("express");
const router = express.Router();
const axios = require("axios");
const Trip = require("../models/TripModel");
const Spot = require("../models/SpotModel");
const apiKey = "ad2a455b26a132204d39870ab339bf22";

const converter = async function(url) {
  let result = await axios.get(url);
  return result.data;
};

router.get(`/convert/:name`, async function(req, res) {
  const { name } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
  let coordsData = await converter(url);
  const coords = {
    lat: coordsData.coord.lat,
    lng: coordsData.coord.lon
  };
  res.send(coords);
});
// router.get(`/convert/:lat/:lng`, async function(req, res) {
//   const { lat, lng } = req.params;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
//   let data = await converter(url);
//   let name = data.name
//   res.send(name);
// });

router.get(`/myTrips`, async function(req, res) {
  const trips = await Trip.find({}).populate("spots");
  console.log(trips);

  res.send(trips);
});

router.post(`/trip`, async function(req, res) {
  console.log("here");

  const tripObj = req.body;
  const trip = new Trip(tripObj);
  await trip.save();
  console.log(`saved ${trip}`);
  res.end();
});

router.post(`/spot`, async function(req, res) {
  const spotObj = req.body;
  console.log(spotObj);
  const spot = new Spot(spotObj);
  await spot.save();
  await Trip.findOneAndUpdate({ name: spot.trip }, { $push: { spots: spot } });
  res.end();
});

router.delete(`/trip/:name`, async function(req, res) {
  const { name } = req.params;
  const trip = await Trip.findOne({ name: name });
  trip.spots.forEach(async function(S) {
    let spotId = S._id;
    await Spot.deleteOne({ _id: spotId });
  });
  await Trip.deleteOne({ name: name });
  console.log(`deleted trip: ${name}`);
  res.end();
});

router.delete(`/spot/:id`, async function(req, res) {
  const { id } = req.params;
  const spot = await Spot.findOne({ _id: id });
  console.log(spot.trip);

  const trip = await Trip.findOne({ name: spot.trip });
  const index = trip.spots.findIndex(s => s._id == id);
  trip.spots.splice(index, 1);
  await Trip.findOneAndUpdate({ name: trip.name }, { spots: trip.spots });
  await Spot.deleteOne({ _id: id });
  console.log(`deleted spot: ${name}`);
  res.end();
});

router.put(`/spot`, async function(req, res) {
  const spot = req.body;
  await Spot.replaceOne({ _id: spot._id }, spot);
  console.log(`updated ${spot}`);
  res.end();
});

module.exports = router;
