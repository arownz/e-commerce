import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import CategoryProducts from './components/CategoryProducts';
import CategoriesList from './components/CategoriesList';
import NewArrivals from './components/NewArrivals';
import FeaturedProducts from './components/FeaturedProducts';
import UserProfile from './components/UserProfile';
import { ToastProvider } from './components/Toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (via localStorage)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch {
        // If JSON.parse fails, clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} user={user} onUpdateUser={handleUpdateUser} />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/category/:id" element={<CategoryProducts />} />
              <Route path="/categories" element={<CategoriesList />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/featured" element={<FeaturedProducts />} />
              <Route path="/profile" element={<UserProfile user={user} onUpdateUser={handleUpdateUser} isLoggedIn={isLoggedIn} />} />
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
                  <p className="small mb-0">© {new Date().getFullYear()} Made by arownz</p>
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
    </ToastProvider>
  );
}

export default App;
