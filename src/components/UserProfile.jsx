import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useToast } from './Toast';

function UserProfile({ isLoggedIn, user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    address: '',
    contact_number: '',
    email_address: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please login to view your profile' } });
      return;
    }

    // Populate form with user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        full_name: user.full_name || '',
        address: user.address || '',
        contact_number: user.contact_number || '',
        email_address: user.email_address || '',
      }));
    }
  }, [isLoggedIn, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error for field being edited
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user.user_id}`,
        {
          full_name: formData.full_name,
          address: formData.address,
          contact_number: formData.contact_number,
          email_address: formData.email_address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        // Update user data in parent component
        const updatedUser = { ...user, ...response.data.user };
        onUpdateUser(updatedUser);
        showToast('Profile updated successfully!', 'success');
      } else {
        showToast(response.data.message || 'Failed to update profile', 'danger');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        if (typeof error.response.data.message === 'object') {
          setErrors(error.response.data.message);
          showToast('Please correct the errors in the form', 'danger');
        } else {
          showToast(error.response.data.message, 'danger');
        }
      } else {
        showToast('An error occurred while updating your profile', 'danger');
      }
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validate passwords
    if (formData.new_password !== formData.confirm_password) {
      setErrors({ confirm_password: 'Passwords do not match' });
      showToast('Passwords do not match', 'danger');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${user.user_id}/password`,
        {
          current_password: formData.current_password,
          new_password: formData.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          current_password: '',
          new_password: '',
          confirm_password: '',
        }));
        showToast('Password updated successfully!', 'success');
      } else {
        showToast(response.data.message || 'Failed to update password', 'danger');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        if (typeof error.response.data.message === 'object') {
          setErrors(error.response.data.message);
          showToast('Please correct the errors in the form', 'danger');
        } else {
          showToast(error.response.data.message, 'danger');
        }
      } else {
        showToast('An error occurred while updating your password', 'danger');
      }
      console.error('Password update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white py-3">
              <h4 className="mb-0">My Profile</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Tabs defaultActiveKey="personal" className="mb-4">
                <Tab eventKey="personal" title="Personal Information">
                  <Form onSubmit={handleProfileUpdate}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            disabled
                            className="bg-light"
                          />
                          <Form.Text className="text-muted">
                            Username cannot be changed
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            isInvalid={!!errors.full_name}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.full_name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email_address"
                        value={formData.email_address}
                        onChange={handleChange}
                        isInvalid={!!errors.email_address}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email_address}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        isInvalid={!!errors.contact_number}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                        rows={3}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isLoading}
                        className="px-4"
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" className="me-2" />
                            Updating...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Tab>
                
                <Tab eventKey="password" title="Change Password">
                  <Form onSubmit={handlePasswordUpdate} className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="current_password"
                          value={formData.current_password}
                          onChange={handleChange}
                          isInvalid={!!errors.current_password}
                          required
                        />
                        <Button 
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.current_password}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showNewPassword ? 'text' : 'password'}
                          name="new_password"
                          value={formData.new_password}
                          onChange={handleChange}
                          isInvalid={!!errors.new_password}
                          required
                        />
                        <Button 
                          variant="outline-secondary"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          <i className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.new_password}
                        </Form.Control.Feedback>
                      </div>
                      <Form.Text className="text-muted">
                        Password must be at least 6 characters long
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirm_password"
                          value={formData.confirm_password}
                          onChange={handleChange}
                          isInvalid={!!errors.confirm_password}
                          required
                        />
                        <Button 
                          variant="outline-secondary"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.confirm_password}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isLoading}
                        className="px-4"
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" className="me-2" />
                            Updating...
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
