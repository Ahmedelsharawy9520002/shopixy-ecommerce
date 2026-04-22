import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product detail if they just click Add
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="card product-card">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button 
            className="btn-primary overlay-add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} style={{ marginRight: 8 }} />
            Add to Cart
          </button>
        </div>
      </Link>
      <div className="product-info">
        <p className="product-category text-muted">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="price-text">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
