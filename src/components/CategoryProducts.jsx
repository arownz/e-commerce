import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert, Breadcrumb } from 'react-bootstrap';

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    
    // Fetch category and its products
    axios.get(`http://localhost:8000/api/categories/${id}/products`)
      .then(response => {
        if (response.data && response.data.success) {
          setCategory(response.data.category);
          setProducts(response.data.products);
        } else {
          setError('Failed to load category products');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching category products:', error);
        setError('Failed to load category products. Please try again later.');
        setLoading(false);
      });
  }, [id]);

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
      <Container className="py-5 d-flex justify-content-center">
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
          <div className="mt-3">
            <Link to="/" className="btn btn-outline-primary">Back to Home</Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/categories" }}>Categories</Breadcrumb.Item>
        <Breadcrumb.Item active>{category?.name || `Category ${id}`}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-5">
        <h1 className="fw-bold mb-1">{category?.name || `Category ${id}`}</h1>
        <p className="text-muted">Browse all products in this category</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox fs-1 text-secondary"></i>
          <h3 className="mt-3">No products available in this category</h3>
          <p className="text-muted">Check back soon for new products</p>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map(product => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm hover-shadow border-0">
                <Link to={`/products/${product.id}`} className="text-decoration-none">
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
                </Link>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-2 rounded-circle p-2"
                  onClick={() => addToCart(product)}
                  style={{ width: '38px', height: '38px' }}
                >
                  <i className="bi bi-cart-plus fs-6"></i>
                </Button>
                <Card.Body className="d-flex flex-column">
                  <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
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
                  </Link>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5">₱{product.price}</span>
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
  );
}

export default CategoryProducts;
