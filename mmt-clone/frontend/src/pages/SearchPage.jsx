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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top right, #1e293b, #0b0e14)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Where to next?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '50px' }}>
          Find the best deals on flights worldwide.
        </p>

        <div className="glass" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '20px', alignItems: 'end' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>From</label>
              <input placeholder="City or Airport" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>To</label>
              <input placeholder="Destination" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <div style={{ opacity: 0.6 }}>⭐ Best Price Guarantee</div>
            <div style={{ opacity: 0.6 }}>⚡ Instant Confirmation</div>
            <div style={{ opacity: 0.6 }}>💎 24/7 Premium Support</div>
        </div>
      </div>
    </div>
  );
}
