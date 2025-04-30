import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      
      if (response.data.success) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username"
            value={formData.username} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text" 
            name="full_name"
            value={formData.full_name} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            name="address"
            value={formData.address} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input 
            type="text" 
            name="contact_number"
            value={formData.contact_number} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input 
            type="email" 
            name="email_address"
            value={formData.email_address} 
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
