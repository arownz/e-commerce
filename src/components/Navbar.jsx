import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import './Navbar.css';
import { useToast } from './Toast';

function Navbar({ isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { showToast } = useToast();
  
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

  const handleLogout = () => {
    showToast('You have been logged out successfully', 'success');
    onLogout();
  };
  
  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm py-3 fixed-top">
      <Container fluid className="px-md-5">
        <BSNavbar.Brand as={Link} to="/" className="fs-4 fw-bold text-primary no-focus-outline">
          <img 
            src="/e-commerce-removebg-preview.png" 
            alt="ShopEase Logo" 
            style={{ width: '50px', height: 'auto' }}
            className="me-2 object-contain" 
          />
          ShopEase
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-navbar" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <BSNavbar.Collapse id="main-navbar" in={isMenuOpen}>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="mx-2 fw-medium nav-link-hover">Home</Nav.Link>
            
            <NavDropdown 
              title="Categories" 
              id="categories-dropdown"
              className="mx-2 fw-medium"
            >
              <NavDropdown.Item as={Link} to="/categories">All Categories</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/category/1">Electronics</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/2">Clothing</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/3">Home & Kitchen</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/4">Sports</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link as={Link} to="/new-arrivals" className="mx-2 fw-medium nav-link-hover">New Arrivals</Nav.Link>
            <Nav.Link as={Link} to="/featured" className="mx-2 fw-medium nav-link-hover">Featured</Nav.Link>
          </Nav>
          
          <Nav className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/cart" className="mx-2 position-relative nav-link-hover">
                  <i className="bi bi-cart3 fs-5"></i>
                  {cartCount > 0 && (
                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="mx-2 nav-link-hover">
                  <i className="bi bi-person-circle me-1"></i>
                  Profile
                </Nav.Link>
                <div className="vr mx-2 d-none d-md-block" style={{ height: '24px' }}></div>
                <Nav.Link onClick={handleLogout} className="mx-2 text-danger nav-link-hover">
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2 nav-link-hover">
                  <i className="bi bi-person me-1"></i>
                  Login
                </Nav.Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary ms-2 text-white px-4 py-2 register-btn"
                >
                  Register
                </Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
