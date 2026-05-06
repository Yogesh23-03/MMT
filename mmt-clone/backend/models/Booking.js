const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  flightId: String,
  passengerName: String,
  passengerAge: Number,
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
