const router = require('express').Router();
const Flight = require('../models/Flight');

router.get('/seed', async (req, res) => {
  try {
    await Flight.deleteMany({}); // Clear existing
    await Flight.insertMany([
      { airline: 'IndiGo', from: 'Mumbai', to: 'Delhi', date: '2025-06-01', time: '06:00 AM', price: 3500 },
      { airline: 'Air India', from: 'Mumbai', to: 'Delhi', date: '2025-06-01', time: '10:00 AM', price: 4200 },
      { airline: 'SpiceJet', from: 'Mumbai', to: 'Delhi', date: '2025-06-01', time: '02:00 PM', price: 2900 },
    ]);
    res.json({ message: 'Flights seeded!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
