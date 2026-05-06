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
  const [confirmed, setConfirmed] = useState(false);

  const handleBooking = () => {
    if (!name || !age) return alert('Please fill in all details');
    setSubmitting(true);
    axios.post('http://localhost:5000/api/bookings', {
      flightId: flight?._id,
      passengerName: name,
      passengerAge: age
    }).then(() => {
      setConfirmed(true);
      setTimeout(() => navigate('/'), 3000);
    }).catch(err => {
      console.log(err);
      alert('Booking failed. Please try again.');
      setSubmitting(false);
    });
  };

  if (confirmed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
        <div className="glass" style={{ padding: '60px', textAlign: 'center', maxWidth: '500px', animation: 'fadeInUp 0.6s ease-out' }}>
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>✅</div>
          <h1 style={{ marginBottom: '15px' }}>Booking Confirmed!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            Your tickets for <b>{flight.airline}</b> have been sent to your registered email.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Redirecting to home in 3 seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at bottom left, #1e293b, #0b0e14)',
      padding: '20px'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', animation: 'fadeInDown 0.8s ease-out' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Secure Checkout</h1>
          <p style={{ color: 'var(--text-muted)' }}>Fill in the passenger details to complete your journey.</p>
        </div>
        
        {flight ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', animation: 'fadeInUp 0.8s ease-out' }}>
            {/* Flight Summary Card */}
            <div className="glass" style={{ padding: '30px', height: 'fit-content' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--primary)' }}>Journey Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Airline</span>
                <span style={{ fontWeight: '600' }}>{flight.airline}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Route</span>
                <span style={{ fontWeight: '600' }}>{flight.from} → {flight.to}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Class</span>
                <span style={{ fontWeight: '600' }}>Economy Premium</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Total Price</span>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent)' }}>₹{flight.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Passenger Form */}
            <div className="glass" style={{ padding: '40px' }}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '600', color: '#94a3b8' }}>FULL NAME</label>
                <input placeholder="As per passport/Aadhar" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div style={{ marginBottom: '35px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: '600', color: '#94a3b8' }}>AGE</label>
                <input type="number" placeholder="Passenger age" value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '50px' }} 
                onClick={handleBooking}
                disabled={submitting}
              >
                {submitting ? 'Processing Payment...' : 'Confirm & Pay'}
              </button>
              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                🔒 SSL Encrypted & Secure Transaction
              </p>
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
