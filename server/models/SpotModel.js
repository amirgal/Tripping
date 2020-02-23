const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema({
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

const Spot = mongoose.model("Spot", spotSchema);
module.exports = Spot;
