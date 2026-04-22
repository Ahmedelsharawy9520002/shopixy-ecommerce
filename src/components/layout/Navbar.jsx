import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, Search,Shirt  } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartCount } = useContext(CartContext);

  return (
    <header className="header-nav">
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          <strong>Shopixy</strong>
        </Link>
        <div className="nav-search">
          <input type="text" className="search-input" placeholder="Search products..." />
          <Search size={18} className="search-icon" />
        </div>
        <div className="nav-actions">
          
          <button className="icon-btn search-mobile-btn" aria-label="Search">
            <Search size={18} />
          </button>
          <Link to="/shop" className='icon-btn' aria-label="Products">
            <Shirt size={18} />
          </Link>
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/cart" className="icon-btn cart-btn" aria-label="View Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
