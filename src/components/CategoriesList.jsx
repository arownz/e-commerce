import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert, Breadcrumb } from 'react-bootstrap';

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Fetch all categories
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setError('Failed to load categories');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Map of category icons
  const categoryIcons = {
    'Electronics': 'bi-laptop',
    'Clothing': 'bi-tags',
    'Home & Kitchen': 'bi-house',
    'Sports': 'bi-trophy',
    'Books': 'bi-book',
    'Toys': 'bi-puzzle',
    'Beauty': 'bi-droplet',
    'Health': 'bi-heart-pulse',
    'Automotive': 'bi-car-front',
    'Garden': 'bi-flower1',
    // Add more as needed or use a default
  };

  const getIconForCategory = (categoryName) => {
    return categoryIcons[categoryName] || 'bi-tag';
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
        <Breadcrumb.Item active>Categories</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-5">
        <h1 className="fw-bold mb-1">All Categories</h1>
        <p className="text-muted">Browse products by category</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-folder fs-1 text-secondary"></i>
          <h3 className="mt-3">No categories available</h3>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {categories.map(category => (
            <Col key={category.id}>
              <Link 
                to={`/category/${category.id}`} 
                className="text-decoration-none"
              >
                <Card className="text-center h-100 border-0 shadow-sm hover-shadow">
                  <Card.Body className="d-flex flex-column justify-content-center py-5">
                    <div className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                      <i className={`bi ${getIconForCategory(category.name)} fs-1 text-primary`}></i>
                    </div>
                    <Card.Title className="h5 mb-0">{category.name}</Card.Title>
                    {category.product_count && (
                      <p className="text-muted small mt-2">{category.product_count} products</p>
                    )}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default CategoriesList;
