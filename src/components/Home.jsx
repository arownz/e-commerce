import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products from Laravel API
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    // You can also store cart in localStorage
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="products-container">
      <h1>Available Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image_url || 'default-product.jpg'} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
