import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from || !to || !date) return alert('Please fill all fields');
    navigate('/flights', { state: { from, to, date } });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ animation: 'fadeInDown 1s ease-out' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            marginBottom: '10px', 
            fontWeight: '800',
            background: 'linear-gradient(to bottom, #ffffff, #cbd5e1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            Where to next?
          </h1>
          <p style={{ 
            color: '#e2e8f0', 
            fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
            marginBottom: '40px',
            fontWeight: '300',
            letterSpacing: '1px'
          }}>
            Explore the world with premium flight experiences.
          </p>
        </div>

        <div className="glass" style={{ 
          padding: '40px', 
          maxWidth: '1000px', 
          margin: '0 auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          animation: 'fadeInUp 1s ease-out 0.3s both'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'end' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>From</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>📍</span>
                <input style={{ paddingLeft: '45px' }} placeholder="Departure City" value={from} onChange={e => setFrom(e.target.value)} />
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>To</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>🎯</span>
                <input style={{ paddingLeft: '45px' }} placeholder="Destination" value={to} onChange={e => setTo(e.target.value)} />
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>📅</span>
                <input type="date" style={{ paddingLeft: '45px' }} value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
            <button className="btn-primary" style={{ height: '50px', fontSize: '1.1rem' }} onClick={handleSearch}>Search Flights</button>
          </div>
        </div>

        <div style={{ 
          marginTop: '60px', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center', 
          gap: '40px',
          animation: 'fadeIn 1.5s ease-in 0.8s both'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '50%' }}>⭐</span> 
              Best Price Guarantee
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '50%' }}>⚡</span> 
              Instant Confirmation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '50%' }}>🛡️</span> 
              Secure Checkout
            </div>
        </div>
      </div>
    </div>
  );
}
