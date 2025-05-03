import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a success message from registration or other sources
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username,
        password
      });
      
      if (response.data.success) {
        // Store user data and token
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.user);
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 401) {
          setError('Invalid username or password. Please try again.');
        } else if (error.response.status === 500) {
          setError('Server error. Please try again later or contact support.');
        } else if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred during login. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        // Something else caused the error
        setError('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5 auth-form">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow border-0 overflow-hidden">
            <Row className="g-0">
              <Col md={5} className="d-none d-md-block">
                <div 
                  className="h-100" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(13, 110, 253, 0.8), rgba(13, 110, 253, 0.9)), url(https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center h-100 p-4 text-white">
                    <h3 className="fw-bold mb-4">Welcome Back</h3>
                    <p className="text-center mb-4 text-white">Sign in to access your account and continue shopping!</p>
                    <div className="mt-auto">
                      <p className="small mb-0 text-white">Don't have an account?</p>
                      <Link to="/register" className="btn btn-outline-light mt-2 w-100">Register Now</Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold">Sign In</h4>
                    <p className="text-muted">Enter your credentials to access your account</p>
                  </div>
                  
                  {success && (
                    <Alert variant="success" className="mb-4">
                      {success}
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check 
                        type="checkbox"
                        id="remember-me"
                        label="Remember me"
                      />
                      <Link to="#" className="text-primary small">Forgot password?</Link>
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
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </Button>
                    
                    <div className="text-center mt-4 d-md-none">
                      <p className="mb-0 text-muted">Don't have an account?</p>
                      <Link to="/register" className="text-primary">Create account</Link>
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

export default Login;
