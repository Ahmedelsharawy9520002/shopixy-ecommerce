import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty container py-40 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted mt-20 mb-30">Looks like you haven't added anything yet.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page container py-40">
      <h1 className="page-title mb-30">Shopping Cart</h1>
      <div className="cart-layout">
        
        {/* Cart Items List */}
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.selectedSize || index}`} className="cart-item card p-20">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="cart-item-details">
                <div className="flex-between">
                  <h3 className="item-title">{item.name}</h3>
                  <p className="item-price price-text">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <p className="text-muted text-sm mt-10">
                  {item.category} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''}
                </p>

                <div className="item-actions mt-20">
                  <div className="quantity-selector-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn-sm"
                    >-</button>
                    <span className="qty-display-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn-sm"
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn-remove"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary card p-20">
          <h2 className="summary-title mb-20">Order Summary</h2>
          
          <div className="summary-row">
            <span className="text-muted">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row mt-10">
            <span className="text-muted">Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <hr className="summary-divider" />
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="price-text">${cartTotal.toFixed(2)}</span>
          </div>
          
          <button 
            className="btn-primary checkout-btn mt-30" 
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
