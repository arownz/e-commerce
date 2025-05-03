import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import './AuthForms.css'; // We'll create this shared CSS file

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    address: '',
    contact_number: '',
    email_address: ''
  });
  const [generalError, setGeneralError] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({});
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      
      if (response.data.success) {
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      } else {
        setGeneralError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message && typeof error.response.data.message === 'object') {
          // Handle validation errors (Laravel returns these as an object)
          setErrors(error.response.data.message);
        } else {
          // Handle general error message
          setGeneralError(error.response.data.message || 'Registration failed. Please try again.');
        }
      } else {
        setGeneralError('Registration failed. Please try again.');
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5 auth-form">
      <Row className="justify-content-center">
        <Col md={12} lg={10} xl={9}>
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
                <Card.Body className="p-4 p-lg-5">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold">Create an Account</h4>
                    <p className="text-muted">Fill in your details to get started</p>
                  </div>
                  
                  {generalError && (
                    <Alert variant="danger" className="mb-4">
                      {generalError}
                    </Alert>
                  )}
                  
                  {Object.keys(errors).length > 0 && (
                    <Alert variant="danger" className="mb-4">
                      <Alert.Heading>Please correct the following errors:</Alert.Heading>
                      <ul className="mb-0">
                        {Object.entries(errors).map(([field, errorArr]) => (
                          <li key={field}>{errorArr[0]}</li>
                        ))}
                      </ul>
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
                            isInvalid={!!errors.username}
                          />
                          {errors.username && (
                            <Form.Control.Feedback type="invalid">
                              {errors.username[0]}
                            </Form.Control.Feedback>
                          )}
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
                            isInvalid={!!errors.password}
                          />
                          {errors.password && (
                            <Form.Control.Feedback type="invalid">
                              {errors.password[0]}
                            </Form.Control.Feedback>
                          )}
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
                        isInvalid={!!errors.full_name}
                      />
                      {errors.full_name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.full_name[0]}
                        </Form.Control.Feedback>
                      )}
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
                        isInvalid={!!errors.address}
                      />
                      {errors.address && (
                        <Form.Control.Feedback type="invalid">
                          {errors.address[0]}
                        </Form.Control.Feedback>
                      )}
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
                            isInvalid={!!errors.contact_number}
                          />
                          {errors.contact_number && (
                            <Form.Control.Feedback type="invalid">
                              {errors.contact_number[0]}
                            </Form.Control.Feedback>
                          )}
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
                            isInvalid={!!errors.email_address}
                          />
                          {errors.email_address && (
                            <Form.Control.Feedback type="invalid">
                              {errors.email_address[0]}
                            </Form.Control.Feedback>
                          )}
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
