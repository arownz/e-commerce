import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart({ isLoggedIn, user }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      alert('Please login to access your cart');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  const placeOrder = async () => {
    if (!isLoggedIn) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/orders', {
        user_id: user.user_id,
        products: cartItems,
        total: calculateTotal()
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        alert('Order placed successfully!');
        setCartItems([]);
        localStorage.removeItem('cart');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('Error placing order.');
      console.error('Order error:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
