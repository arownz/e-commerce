import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Alert, ListGroup, Badge, InputGroup, Form, Spinner, Modal } from 'react-bootstrap';
import { useToast } from './Toast';

function Cart({ isLoggedIn, user, onUpdateUser }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please login to access your cart' } });
      return;
    }

    // Retrieve cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Set address from user data
    if (user && user.address) {
      setAddress(user.address);
    }
  }, [isLoggedIn, navigate, user]);

  const removeFromCart = (index) => {
    const itemName = cartItems[index].name;
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    showToast(`${itemName} removed from cart`, 'success');
  };

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;

    const updatedCart = [...cartItems];
    updatedCart[index] = { ...updatedCart[index], quantity };
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const quantity = item.quantity || 1;
        return total + parseFloat(item.price) * quantity;
      }, 0)
      .toFixed(2);
  };

  const handleAddressUpdate = async () => {
    if (!address.trim()) {
      setAddressError('Please enter your address');
      return;
    }

    setIsAddressUpdating(true);
    setAddressError(null);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user.user_id}`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        // Update user data in parent component with the new address
        const updatedUser = { ...user, address };
        onUpdateUser(updatedUser);
        setShowAddressModal(false);
        showToast('Shipping address updated successfully', 'success');
      } else {
        setAddressError(response.data.message || 'Failed to update address');
      }
    } catch (error) {
      setAddressError('Error updating address. Please try again.');
      console.error('Address update error:', error);
    } finally {
      setIsAddressUpdating(false);
    }
  };

  const placeOrder = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please login to place an order' } });
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add some products.");
      showToast("Your cart is empty. Please add some products.", 'warning');
      return;
    }

    if (!address.trim()) {
      setShowAddressModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/orders', {
        user_id: user.user_id,
        products: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity || 1,
        })),
        total: calculateTotal(),
        shipping_address: address
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        // Clear cart after successful order
        setCartItems([]);
        localStorage.removeItem('cart');
        
        // Dispatch custom event to update cart count in navbar
        window.dispatchEvent(new Event('cartUpdated'));

        // Success notification
        showToast('Order placed successfully!', 'success');
      } else {
        setError(response.data.message || 'Failed to place order. Please try again.');
        showToast(response.data.message || 'Failed to place order. Please try again.', 'danger');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        showToast(error.response.data.message, 'danger');
      } else {
        setError('Error placing order. Please try again later.');
        showToast('Error placing order. Please try again later.', 'danger');
      }
      console.error('Order error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0 fw-bold">
          <i className="bi bi-cart3 me-2"></i>
          Shopping Cart
        </h2>
        <Button as={Link} to="/" variant="outline-secondary" size="sm">
          <i className="bi bi-arrow-left me-2"></i>
          Continue Shopping
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <Card className="text-center py-5 border-0 shadow-sm">
          <Card.Body>
            <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            <h4 className="mt-3">Your cart is empty</h4>
            <p className="text-muted mb-4">Start shopping to add items to your cart.</p>
            <Button as={Link} to="/" variant="primary" className="px-4">
              <i className="bi bi-shop me-2"></i>
              Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
              </Card.Header>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index} className="py-3 cart-item">
                    <Row className="align-items-center">
                      <Col md={2} className="mb-3 mb-md-0">
                        <div className="product-img-container bg-light rounded">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="product-img img-fluid p-2"
                              style={{ height: '80px', width: '100%', objectFit: 'contain' }}
                            />
                          ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '80px' }}>
                              <i className="bi bi-image text-secondary" style={{ fontSize: '1.5rem' }}></i>
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col md={4}>
                        <h5 className="h6 mb-1">{item.name}</h5>
                        <p className="text-muted small mb-0 text-truncate-2">{item.description}</p>
                      </Col>
                      <Col md={2} className="text-center">
                        <Badge bg="secondary" className="px-2 py-1">
                          ${item.price}
                        </Badge>
                      </Col>
                      <Col md={2}>
                        <InputGroup size="sm">
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <i className="bi bi-dash"></i>
                          </Button>
                          <Form.Control 
                            className="text-center" 
                            value={item.quantity || 1} 
                            readOnly
                          />
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </Button>
                        </InputGroup>
                      </Col>
                      <Col md={1} className="text-center">
                        <h6 className="mb-0 fw-bold">${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</h6>
                      </Col>
                      <Col md={1} className="text-end">
                        <Button 
                          variant="link" 
                          className="text-danger p-0" 
                          onClick={() => removeFromCart(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0">Total</h5>
                  <h5 className="mb-0">${calculateTotal()}</h5>
                </div>
                
                {/* Shipping Address Section */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Shipping Address</h6>
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none" 
                      onClick={() => setShowAddressModal(true)}
                    >
                      <i className="bi bi-pencil me-1"></i> Edit
                    </Button>
                  </div>
                  <div className="p-3 bg-light rounded">
                    {address ? (
                      <p className="mb-0 small">{address}</p>
                    ) : (
                      <div className="text-center text-muted small">
                        <i className="bi bi-geo-alt me-1"></i>
                        No address provided
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    onClick={placeOrder} 
                    disabled={isLoading}
                    size="lg"
                    className="fw-bold"
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-credit-card me-2"></i>
                        Checkout
                      </>
                    )}
                  </Button>
                  <Button as={Link} to="/" variant="outline-secondary">
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      {/* Address Edit Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete shipping address"
                isInvalid={!!addressError}
              />
              <Form.Control.Feedback type="invalid">
                {addressError}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddressUpdate}
            disabled={isAddressUpdating}
          >
            {isAddressUpdating ? (
              <>
                <Spinner size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              'Save Address'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Cart;
