import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(res => {
        setFlights(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>Available Flights</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {state?.from || 'Anywhere'} → {state?.to || 'Anywhere'} | {state?.date || 'All Dates'}
            </p>
          </div>
          <button className="btn-primary" style={{ padding: '10px 20px' }} onClick={() => navigate('/')}>Modify Search</button>
        </div>

        {loading ? (
          <p>Loading the best deals...</p>
        ) : flights.length === 0 ? (
          <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px' }}>No flights found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Please connect to MongoDB and run the seed route.</p>
            <code>GET http://localhost:5000/api/flights/seed</code>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {flights.map(flight => (
              <div key={flight._id} className="glass" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr auto', alignItems: 'center', gap: '30px' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  ✈️
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem' }}>{flight.airline}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Flight ID: {flight._id.slice(-6).toUpperCase()}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{flight.time}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Non-stop</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>₹{flight.price}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>incl. taxes</p>
                </div>
                <button className="btn-primary" onClick={() => navigate('/booking', { state: { flight } })}>Book Now</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
