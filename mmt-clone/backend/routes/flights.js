const router = require('express').Router();
const Flight = require('../models/Flight');

router.get('/seed', async (req, res) => {
  await Flight.insertMany([
    { airline: 'IndiGo', from: 'Mumbai', to: 'Delhi', date: '2025-06-01', time: '06:00 AM', price: 3500 },
    { airline: 'Air India', from: 'Mumbai', to: 'Delhi', date: '2025-06-01', time: '10:00 AM', price: 4200 },
    { airline: 'SpiceJet', from: 'Mumbai', to: 'Delhi', date: '2025-06-01', time: '02:00 PM', price: 2900 },
  ]);
  res.json({ message: 'Flights seeded!' });
});

router.get('/', async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});

module.exports = router;