import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
    // Save user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // Clear localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="flex-grow-1 pt-5 mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} user={user} />} />
          </Routes>
        </main>
        <footer className="bg-dark text-white py-4">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h5 className="mb-0">
                  <img 
                    src="/e-commerce-removebg-preview.png" 
                    alt="ShopEase Logo" 
                    style={{ width: '50', height: 'auto', maxHeight: '60px' }}
                    className="me-2 object-contain" 
                  />
                  ShopEase
                </h5>
                <p className="small mb-0">© {new Date().getFullYear()} All rights reserved.</p>
              </div>
              <div className="d-flex gap-3">
                <a href="https://facebook.com/" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                <a href="https://instagram.com/" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
                <a href="https://x.com/" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
                <a href="https://linkedin.com/" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
