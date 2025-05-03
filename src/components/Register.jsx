import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    address: '',
    contact_number: '',
    email_address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      
      if (response.data.success) {
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5 auth-form">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={7}>
          <Card className="shadow border-0 overflow-hidden">
            <Row className="g-0">
              <Col lg={5} className="d-none d-lg-block">
                <div 
                  className="h-100" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(13, 110, 253, 0.85), rgba(13, 110, 253, 0.95)), url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 p-4 text-white">
                    <h3 className="fw-bold mb-4">Join Our Community</h3>
                    <p className="text-center mb-4 text-white">Create an account to enjoy shopping with exclusive benefits and personalized experiences.</p>
                    <div className="mt-auto">
                      <p className="small mb-0 text-white">Already have an account?</p>
                      <Link to="/login" className="btn btn-outline-light mt-2 w-100">Sign In</Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold">Create an Account</h4>
                    <p className="text-muted">Fill in your details to get started</p>
                  </div>
                  
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Enter your full name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter your shipping address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="contact_number"
                            placeholder="Enter your phone number"
                            required
                            value={formData.contact_number}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email_address"
                            placeholder="Enter your email address"
                            required
                            value={formData.email_address}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="mb-3 mt-4">
                      <Form.Check
                        type="checkbox"
                        id="terms"
                        label={
                          <span>
                            I agree to the <Link to="#" className="text-primary">Terms of Service</Link> and <Link to="#" className="text-primary">Privacy Policy</Link>
                          </span>
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 py-2"
                      disabled={isLoading}
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus-fill me-2"></i>
                          Create Account
                        </>
                      )}
                    </Button>
                    
                    <div className="text-center mt-4 d-lg-none">
                      <p className="mb-0 text-muted">Already have an account?</p>
                      <Link to="/login" className="text-primary">Sign in</Link>
                    </div>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
