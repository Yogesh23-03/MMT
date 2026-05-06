const mongoose = require('mongoose');
const FlightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  date: String,
  time: String,
  price: Number
});
module.exports = mongoose.model('Flight', FlightSchema);