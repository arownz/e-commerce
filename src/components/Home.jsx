import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert, Carousel } from 'react-bootstrap';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredCategories] = useState([
    { id: 1, name: 'Electronics', icon: 'bi-laptop' },
    { id: 2, name: 'Clothing', icon: 'bi-tags' },
    { id: 3, name: 'Home & Kitchen', icon: 'bi-house' },
    { id: 4, name: 'Sports', icon: 'bi-trophy' },
  ]);

  useEffect(() => {
    // Fetch products from Laravel API
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        if (response.data.data) {
          // Handle response format: { success: true, message: '...', data: [...] }
          setProducts(response.data.data);
        } else if (Array.isArray(response.data)) {
          // Handle direct array response
          setProducts(response.data);
        } else {
          // If neither format works, show an error
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format received from the server');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const productInCart = existingCart.find(item => item.id === product.id);
    
    if (productInCart) {
      // Increment quantity if product exists
      const updatedCart = existingCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Add product with quantity 1 if it doesn't exist
      localStorage.setItem('cart', JSON.stringify([...existingCart, {...product, quantity: 1}]));
    }
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success notification
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Banner Section */}
      <div className="mb-5">
        <Carousel fade interval={5000} indicators={false}>
          <Carousel.Item>
            <div style={{
              height: '500px', 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <Container className="d-flex flex-column justify-content-center h-100 py-5">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h1 className="display-4 fw-bold mb-4 text-white">Summer Collection</h1>
                    <p className="fs-5 mb-4 text-white">Discover our latest summer products with special discounts.</p>
                    <Button variant="light" size="lg" className="fw-bold">Shop Now</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={{
              height: '500px', 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <Container className="d-flex flex-column justify-content-center h-100 py-5">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h1 className="display-4 fw-bold mb-4 text-white">New Arrivals</h1>
                    <p className="fs-5 mb-4 text-white">Explore our latest collection of premium items.</p>
                    <Button variant="light" size="lg" className="fw-bold">Explore</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Featured Categories */}
      <Container className="mb-5">
        <h2 className="text-center mb-4 fw-bold">Shop by Category</h2>
        <Row className="g-4 justify-content-center">
          {featuredCategories.map(category => (
            <Col key={category.id} xs={6} md={3}>
              <Card className="text-center h-100 border-0 shadow-sm hover-shadow">
                <Card.Body className="d-flex flex-column justify-content-center py-4">
                  <div className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px' }}>
                    <i className={`bi ${category.icon} fs-2 text-primary`}></i>
                  </div>
                  <Card.Title className="mb-0">{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Products Section */}
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Featured Products</h2>
          <Button variant="outline-primary">View All</Button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-secondary"></i>
            <h3 className="mt-3">No products available</h3>
            <p className="text-muted">Check back soon for new products</p>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <Card className="h-100 shadow-sm hover-shadow border-0">
                  <div className="position-relative">
                    <div className="bg-light" style={{ height: '200px', overflow: 'hidden' }}>
                      {product.image_url ? (
                        <Card.Img 
                          variant="top" 
                          src={product.image_url} 
                          alt={product.name} 
                          style={{ height: '100%', objectFit: 'cover', width: '100%' }}
                        />
                      ) : (
                        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                          <i className="bi bi-image text-secondary" style={{ fontSize: '3rem' }}></i>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2 rounded-circle p-2"
                      onClick={() => addToCart(product)}
                      style={{ width: '38px', height: '38px' }}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </Button>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6">{product.name}</Card.Title>
                    <Card.Text className="text-muted small mb-4" style={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.description}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5">${product.price}</span>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Features Section */}
      <div className="bg-light py-5 mt-5">
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-primary p-3 mb-3">
                  <i className="bi bi-truck text-white fs-3"></i>
                </div>
                <h5>Free Shipping</h5>
                <p className="text-muted">On orders over $50</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-primary p-3 mb-3">
                  <i className="bi bi-shield-check text-white fs-3"></i>
                </div>
                <h5>Secure Payments</h5>
                <p className="text-muted">100% secure payment</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-primary p-3 mb-3">
                  <i className="bi bi-arrow-repeat text-white fs-3"></i>
                </div>
                <h5>Easy Returns</h5>
                <p className="text-muted">30 day return policy</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
