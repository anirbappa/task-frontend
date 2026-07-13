import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#282c34', color: 'white' }}>
      <h2><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>TaskManager</Link></h2>
      {user ? (
        <div>
          <span style={{ marginRight: '1rem' }}>Welcome, <strong>{user.name}</strong> ({user.role})</span>
          <button onClick={handleLogout} style={{ background: '#e06c75', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
          <Link to="/register" style={{ color: 'white' }}>Register</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
