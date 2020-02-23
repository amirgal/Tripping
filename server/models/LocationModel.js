const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  date: Date,
  coords: {
    lat: Number,
    lng: Number
  },
  comment: String,
  photos: [String],
  trip: String
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
