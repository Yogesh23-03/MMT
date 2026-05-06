import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flight = state?.flight;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleBooking = () => {
    if (!name || !age) return alert('Please fill in all details');
    setSubmitting(true);
    axios.post('http://localhost:5000/api/bookings', {
      flightId: flight?._id,
      passengerName: name,
      passengerAge: age
    }).then(() => {
      alert('Success! Your booking is confirmed.');
      navigate('/');
    }).catch(err => {
      console.log(err);
      alert('Booking failed. Please try again.');
      setSubmitting(false);
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Complete your booking</h1>
        
        {flight ? (
          <div className="glass" style={{ padding: '30px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Airline</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{flight.airline}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Price</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>₹{flight.price}</p>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Passenger Name</label>
                <input placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Age</label>
                <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <button 
                className="btn-primary" 
                style={{ width: '100%' }} 
                onClick={handleBooking}
                disabled={submitting}
              >
                {submitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        ) : (
          <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
            <p>No flight selected. Please go back to search.</p>
            <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>Go to Search</button>
          </div>
        )}
      </div>
    </div>
  );
}
