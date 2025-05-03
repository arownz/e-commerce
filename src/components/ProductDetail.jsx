import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner, Alert, Image, Badge, ListGroup } from 'react-bootstrap';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(response => {
        if (response.data && response.data.success && response.data.data) {
          setProduct(response.data.data);
        } else if (response.data) {
          setProduct(response.data);
        } else {
          setError('Failed to load product details');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQty = quantity + value;
    if (newQty > 0 && newQty <= (product?.stock_quantity || 10)) {
      setQuantity(newQty);
    }
  };

  const addToCart = () => {
    if (!product) return;

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const productInCart = existingCart.find(item => item.id === product.id);
    
    if (productInCart) {
      // Update quantity if product exists
      const updatedCart = existingCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + quantity } 
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Add product with specified quantity if it doesn't exist
      localStorage.setItem('cart', JSON.stringify([
        ...existingCart, 
        {...product, quantity}
      ]));
    }
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success notification
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || 'Product not found'}</p>
          <div className="mt-3">
            <Link to="/" className="btn btn-outline-primary">Back to Home</Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item">
            <Link to={`/category/${product.category?.id || 1}`}>
              {product.category?.name || 'Category'}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <Row className="mb-5">
        {/* Product Image */}
        <Col md={6} className="mb-4 mb-md-0">
          <div className="bg-light rounded p-3 d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
            {product.image_url ? (
              <Image 
                src={product.image_url} 
                alt={product.name} 
                fluid 
                style={{ maxHeight: '380px', objectFit: 'contain' }}
              />
            ) : (
              <div className="text-center">
                <i className="bi bi-image text-secondary" style={{ fontSize: '5rem' }}></i>
                <p className="mt-3 text-muted">No image available</p>
              </div>
            )}
          </div>
        </Col>
        
        {/* Product Info */}
        <Col md={6}>
          <h2 className="fw-bold mb-3">{product.name}</h2>
          
          <div className="mb-4">
            <span className="fs-3 fw-bold text-primary">₱{product.price}</span>
            {product.stock_quantity > 0 ? (
              <Badge bg="success" className="ms-3">In Stock</Badge>
            ) : (
              <Badge bg="danger" className="ms-3">Out of Stock</Badge>
            )}
          </div>
          
          <p className="mb-4">{product.description}</p>
          
          {/* Category */}
          <p className="mb-4">
            <strong>Category:</strong>{' '}
            <Link to={`/category/${product.category?.id || 1}`}>
              {product.category?.name || 'Uncategorized'}
            </Link>
          </p>
          
          {/* Quantity Selector */}
          <div className="d-flex align-items-center mb-4">
            <strong className="me-3">Quantity:</strong>
            <div className="input-group" style={{ maxWidth: '150px' }}>
              <Button 
                variant="outline-secondary" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <i className="bi bi-dash"></i>
              </Button>
              <div className="form-control text-center">{quantity}</div>
              <Button 
                variant="outline-secondary" 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock_quantity || 10)}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            variant="primary" 
            size="lg"
            className="w-100" 
            onClick={addToCart}
            disabled={!product.is_available || product.stock_quantity <= 0}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </Button>
        </Col>
      </Row>

      {/* Product Details */}
      <div className="mb-5">
        <h3 className="fw-bold mb-4">Product Details</h3>
        <ListGroup variant="flush" className="border rounded">
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Product ID</Col>
              <Col md={9}>{product.id}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Name</Col>
              <Col md={9}>{product.name}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Description</Col>
              <Col md={9}>{product.description}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Price</Col>
              <Col md={9}>₱{product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Category</Col>
              <Col md={9}>{product.category?.name || 'Uncategorized'}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Stock</Col>
              <Col md={9}>{product.stock_quantity} units</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
}

export default ProductDetail;
