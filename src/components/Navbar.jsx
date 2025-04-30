import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">E-Commerce App</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/cart">Cart</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
