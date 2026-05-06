import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    // Artificial delay to show off loading state (optional, but good for "feel")
    setTimeout(() => {
      axios.get('http://localhost:5000/api/flights')
        .then(res => {
          setFlights(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 800);
  }, []);

  return (
    <div style={{ 
      padding: '60px 0', 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #0b0e14, #1e293b)' 
    }}>
      <div className="container">
        <div style={{ 
          marginBottom: '50px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          animation: 'fadeInDown 0.8s ease-out'
        }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Available Flights</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="glass" style={{ padding: '6px 16px', borderRadius: '50px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
                {state?.from || 'Anywhere'}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <span className="glass" style={{ padding: '6px 16px', borderRadius: '50px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
                {state?.to || 'Anywhere'}
              </span>
              <span style={{ margin: '0 10px', color: 'var(--border)' }}>|</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📅 {state?.date || 'All Dates'}</span>
            </div>
          </div>
          <button 
            className="glass" 
            style={{ padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', transition: '0.3s' }} 
            onClick={() => navigate('/')}
          >
            ← Modify Search
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
            <p style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>CURATING BEST DEALS...</p>
          </div>
        ) : flights.length === 0 ? (
          <div className="glass" style={{ padding: '80px', textAlign: 'center', animation: 'fadeInUp 0.8s ease-out' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ marginBottom: '15px', fontSize: '1.8rem' }}>No flights found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
              We couldn't find any flights for your selection. Try seeding the database with dummy data.
            </p>
            <button className="btn-primary" onClick={() => window.open('http://localhost:5000/api/flights/seed', '_blank')}>
              Seed Flights Data
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '25px' }}>
            {flights.map((flight, index) => (
              <div 
                key={flight._id} 
                className="glass" 
                style={{ 
                  padding: '30px', 
                  display: 'grid', 
                  gridTemplateColumns: 'auto 1fr 1.5fr 1fr auto', 
                  alignItems: 'center', 
                  gap: '40px',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.01)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={{ 
                  width: '70px', 
                  height: '70px', 
                  background: 'var(--glass)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '2rem',
                  border: '1px solid var(--border)'
                }}>
                  {flight.airline.includes('IndiGo') ? '🟦' : flight.airline.includes('Air India') ? '🟥' : '✈️'}
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '5px' }}>{flight.airline}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Flight No: {flight._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>{flight.time}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{state?.from || 'Origin'}</p>
                  </div>
                  <div style={{ flex: 1, height: '2px', background: 'var(--border)', position: 'relative', minWidth: '80px' }}>
                    <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-dark)', padding: '0 10px', fontSize: '0.8rem', color: 'var(--primary)' }}>
                      Non-stop
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>{parseInt(flight.time) + 2}:30 PM</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{state?.to || 'Dest'}</p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent)' }}>₹{flight.price.toLocaleString()}</p>
                  <p style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '600' }}>Free Cancellation</p>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ borderRadius: '50px', padding: '12px 30px' }}
                  onClick={() => navigate('/booking', { state: { flight } })}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
