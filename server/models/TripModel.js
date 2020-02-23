const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: String,
  date: Date,
  coords: {
    lat: Number,
    lng: Number
  },
  spots: [{type:Schema.Types.ObjectId, ref:'Spot'}]
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
