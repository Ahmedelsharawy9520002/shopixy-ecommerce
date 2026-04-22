import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { getProductById } from '../data/products';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [activeSize, setActiveSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    if (!fetchedProduct) {
      navigate('/not-found', { replace: true });
    } else {
      setProduct(fetchedProduct);
      if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
        setActiveSize(fetchedProduct.sizes[0]);
      }
    }
  }, [id, navigate]);

  if (!product) return null; // Wait for redirect or load

  const handleAddToCart = () => {
    // Note: a real app might store the chosen 'size' in the cart item as well.
    addToCart({ ...product, selectedSize: activeSize }, quantity);
  };

  return (
    <div className="product-detail-page container py-40">
      <div className="product-detail-layout">
        {/* Gallery Area */}
        <div className="product-gallery">
          <div className="main-image-container card">
            <img src={product.image} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnails">
            <div className="thumbnail card active">
              <img src={product.image} alt={`Thumbnail 1`} />
            </div>
            {/* Adding mock thumbnails of the same image for demonstration */}
            <div className="thumbnail card">
              <img src={product.image} alt={`Thumbnail 2`} />
            </div>
            <div className="thumbnail card">
              <img src={product.image} alt={`Thumbnail 3`} />
            </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="product-info-panel">
          <p className="product-category text-muted">{product.category}</p>
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="product-description card">
            <p>{product.description}</p>
          </div>

          {product.sizes && (
            <div className="size-selector">
              <div className="section-title">
                <h4>Select Size</h4>
                <a href="#" className="text-muted text-sm">Size Guide</a>
              </div>
              <div className="sizes-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`size-btn ${activeSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >-</button>
              <span className="qty-display">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="qty-btn"
                aria-label="Increase quantity"
              >+</button>
            </div>
            
            <button className="btn-primary add-btn" onClick={handleAddToCart}>
              <ShoppingBag size={20} className="mr-10" />
              Add to Cart
            </button>
          </div>

          <div className="product-meta mt-30 text-muted">
            <p>Free standard shipping on orders over $50.</p>
            <p>Free returns within 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
