# ✈️ MMT Clone — Product Requirements Document
> **Duration:** 2 Hours | **Team:** 6 Members | **Tool:** Antigravity AI

---

## 🧠 Mental Model
> *"You are not coding. You are solving problems using AI."*
> Ask AI for small, specific tasks. Never say "build the full project."

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| HTTP Client | Axios |
| Version Control | GitHub |

---

## 📁 File Structure

```
mmt-clone/
│
├── frontend/                        ← React App (Vite)
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SearchPage.jsx       ← Student 1
│   │   │   ├── FlightsPage.jsx      ← Student 2
│   │   │   └── BookingPage.jsx      ← Student 3
│   │   ├── App.jsx                  ← Routes (ALL setup together)
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── backend/                         ← Node + Express App
    ├── models/
    │   ├── User.js                  ← Student 4
    │   ├── Flight.js                ← Student 5
    │   └── Booking.js               ← Student 6
    ├── routes/
    │   ├── auth.js                  ← Student 4
    │   ├── flights.js               ← Student 5
    │   └── bookings.js              ← Student 6
    ├── db.js                        ← MongoDB connection (ALL setup together)
    ├── server.js                    ← Entry point (ALL setup together)
    └── package.json
```

---

## 👥 Team Division

| Member | Role | Area |
|---|---|---|
| Student 1 | Frontend | Search Page |
| Student 2 | Frontend | Flights List Page |
| Student 3 | Frontend | Booking Page |
| Student 4 | Backend | Auth APIs (Login/Signup) |
| Student 5 | Backend | Flights API |
| Student 6 | Backend | Booking API |

---

## 🕐 6-Phase Execution Plan

---

### ⚡ PHASE 1 — Setup (0:00 – 0:20) | ALL 6 MEMBERS

> Everyone does this together before splitting work.

**Frontend Setup**
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios react-router-dom
npm run dev
```

**Backend Setup**
```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv
```

**`backend/server.js`**
```js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/bookings', require('./routes/bookings'));

app.listen(5000, () => console.log('Server running on port 5000'));
```

**`.env`**
```
MONGO_URI=your_mongodb_atlas_connection_string
```

**`frontend/src/App.jsx`**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FlightsPage from './pages/FlightsPage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Phase 1 Done when:** React shows default page, Node server logs "Server running"

---

### 🎨 PHASE 2 — Frontend Build (0:20 – 0:55) | Students 1, 2, 3 (Parallel)

---

#### 🟢 Student 1 — Search Page (`src/pages/SearchPage.jsx`)

**AI Prompt to use:**
> *"Create a React form with inputs: from, to, date and a search button. Use useState and useNavigate to go to /flights on submit. Basic CSS inline."*

**What to build:**
- 3 input fields: From, To, Date
- Search button
- On click → navigate to `/flights` passing search data

**Code:**
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/flights', { state: { from, to, date } });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>✈️ Search Flights</h1>
      <input placeholder="From" value={from} onChange={e => setFrom(e.target.value)} /><br/><br/>
      <input placeholder="To" value={to} onChange={e => setTo(e.target.value)} /><br/><br/>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br/><br/>
      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
}
```

---

#### 🟢 Student 2 — Flights Page (`src/pages/FlightsPage.jsx`)

**AI Prompt to use:**
> *"Create a React component that fetches flights from http://localhost:5000/api/flights using axios and displays each as a card with airline, price, time and a Book button."*

**What to build:**
- Fetch flights from backend using axios
- Display as list of cards: Airline, Price, Time
- Book button → navigate to `/booking` with flight data

**Code:**
```jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(res => setFlights(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Flights</h1>
      {flights.map(flight => (
        <div key={flight._id} style={{ border: '1px solid #ccc', padding: 16, marginBottom: 12 }}>
          <p><b>Airline:</b> {flight.airline}</p>
          <p><b>Price:</b> ₹{flight.price}</p>
          <p><b>Time:</b> {flight.time}</p>
          <button onClick={() => navigate('/booking', { state: { flight } })}>Book</button>
        </div>
      ))}
    </div>
  );
}
```

---

#### 🟢 Student 3 — Booking Page (`src/pages/BookingPage.jsx`)

**AI Prompt to use:**
> *"Create a React form to collect passenger name and age, show selected flight details from useLocation state, and POST to http://localhost:5000/api/bookings using axios."*

**What to build:**
- Show selected flight info (from location state)
- Input: Passenger Name, Age
- Submit button → POST to `/api/bookings`

**Code:**
```jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
  const { state } = useLocation();
  const flight = state?.flight;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleBooking = () => {
    axios.post('http://localhost:5000/api/bookings', {
      flightId: flight._id,
      passengerName: name,
      passengerAge: age
    }).then(() => alert('Booking Confirmed!'))
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Book Flight</h1>
      {flight && (
        <div>
          <p><b>Airline:</b> {flight.airline}</p>
          <p><b>Price:</b> ₹{flight.price}</p>
        </div>
      )}
      <input placeholder="Passenger Name" value={name} onChange={e => setName(e.target.value)} /><br/><br/>
      <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} /><br/><br/>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
```

---

### ⚙️ PHASE 3 — Backend Build (0:20 – 0:55) | Students 4, 5, 6 (Parallel)

---

#### 🟠 Student 4 — Auth APIs

**AI Prompt to use:**
> *"Create signup and login routes in Express with a User model using Mongoose. Save user to MongoDB. No JWT needed, just return success message."*

**`backend/models/User.js`**
```js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});
module.exports = mongoose.model('User', UserSchema);
```

**`backend/routes/auth.js`**
```js
const router = require('express').Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'Signup successful' });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', userId: user._id });
});

module.exports = router;
```

**APIs:** `POST /api/auth/signup` | `POST /api/auth/login`

---

#### 🟠 Student 5 — Flights API

**AI Prompt to use:**
> *"Create a flights route in Express with a Mongoose model. Add a seed route to insert 3 dummy flights and a GET route to return all flights."*

**`backend/models/Flight.js`**
```js
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
```

**`backend/routes/flights.js`**
```js
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
```

**APIs:** `GET /api/flights` | `GET /api/flights/seed` (run once to add dummy data)

---

#### 🟠 Student 6 — Booking API

**AI Prompt to use:**
> *"Create a bookings route in Express. POST /api/bookings saves flightId, passengerName, passengerAge to MongoDB using Mongoose."*

**`backend/models/Booking.js`**
```js
const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  flightId: String,
  passengerName: String,
  passengerAge: Number,
  bookedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
```

**`backend/routes/bookings.js`**
```js
const router = require('express').Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: 'Booking saved!', booking });
});

router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
```

**APIs:** `POST /api/bookings` | `GET /api/bookings`

---

### 🔗 PHASE 4 — Integration (0:55 – 1:20) | Paired Work

> Frontend meets Backend here. Most important phase.

| Pair | Task |
|---|---|
| Student 1 + 5 | Confirm flights load when search button clicked |
| Student 2 + 5 | Hit `/api/flights/seed` once, verify cards appear |
| Student 3 + 6 | Submit booking form, check MongoDB for saved record |

**If CORS fails:** Confirm `app.use(cors())` is in `server.js` before routes.

**All frontend axios calls must point to:** `http://localhost:5000/api/...`

---

### 🗄️ PHASE 5 — Database Verify (1:20 – 1:35) | Students 5 + 6

**Checklist:**
- [ ] Users collection has signup data
- [ ] Flights collection has 3 seeded flights
- [ ] Bookings collection shows submitted bookings

**Seed flights** (open in browser once):
```
http://localhost:5000/api/flights/seed
```

---

### 🚀 PHASE 6 — Final Test + Demo Prep (1:35 – 2:00) | ALL 6

**Full User Flow:**
```
Search Page → Enter From/To/Date → Search
→ Flights Page shows list → Click Book
→ Booking Page → Enter Name/Age → Confirm
→ Alert: "Booking Confirmed!" ✅
→ MongoDB Atlas → Booking record saved ✅
```

**Each member explains:**
1. What they built
2. One AI prompt they used
3. One error they fixed

---

## ⚠️ Common Blockers & Fixes

| Problem | Fix |
|---|---|
| `Cannot GET /api/flights` | Check server.js has route mounted |
| CORS error in browser | Add `app.use(cors())` before routes in server.js |
| MongoDB not connecting | Check `.env` has correct `MONGO_URI` |
| `useLocation` returns null | Navigate with `state` from SearchPage |
| Flights list empty | Hit `/api/flights/seed` first |
| Axios not found | Run `npm install axios` in frontend/ folder |

---

## 🔁 Debugging Flow

```
Error appears
  → Copy full error message
  → Paste in Antigravity AI
  → Ask: "Explain this error and fix it step by step"
  → Apply fix → Test again
```

---

## 📊 MongoDB Schema Summary

```
Users:     { email, password }
Flights:   { airline, from, to, date, time, price }
Bookings:  { flightId, passengerName, passengerAge, bookedAt }
```

---

## 🏁 Final Deliverable Checklist

- [ ] Search Page loads with 3 inputs
- [ ] Flights Page shows real data from MongoDB
- [ ] Booking Page submits to backend successfully
- [ ] All 3 backend APIs return correct responses
- [ ] MongoDB Atlas shows data in all 3 collections
- [ ] Each member can explain their part

---

*Built with Antigravity AI | MMT Clone Assignment | Skill Turtle*
