import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container, Badge } from 'react-bootstrap';

function Navbar({ isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // Get cart items count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cartItems.length);
    };
    
    // Update count on mount
    updateCartCount();
    
    // Add event listener for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates from within the app
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  
  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm py-3 fixed-top">
      <Container fluid className="px-md-5">
        <BSNavbar.Brand as={Link} to="/" className="fs-4 fw-bold text-primary">
          <i className="bi bi-shop-window me-2"></i>
          ShopEase
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-navbar" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <BSNavbar.Collapse id="main-navbar" in={isMenuOpen}>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="mx-2 fw-medium">Home</Nav.Link>
            <Nav.Link as={Link} to="#" className="mx-2 fw-medium">Categories</Nav.Link>
            <Nav.Link as={Link} to="#" className="mx-2 fw-medium">New Arrivals</Nav.Link>
            <Nav.Link as={Link} to="#" className="mx-2 fw-medium">Featured</Nav.Link>
          </Nav>
          
          <Nav className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/cart" className="mx-2 position-relative">
                  <i className="bi bi-cart3 fs-5"></i>
                  {cartCount > 0 && (
                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
                <div className="vr mx-2 d-none d-md-block" style={{ height: '24px' }}></div>
                <Nav.Link onClick={onLogout} className="mx-2 text-danger">
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">
                  <i className="bi bi-person me-1"></i>
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register" 
                  className="btn btn-primary ms-2 text-white px-3"
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
