import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="checkout-empty container py-40 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted mt-20 mb-30">You must add items to your cart before checking out.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          Back to Shop
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let freshErrors = {};
    if (!formData.email.includes('@')) freshErrors.email = 'Valid email is required.';
    if (formData.firstName.length < 2) freshErrors.firstName = 'First name is required.';
    if (formData.lastName.length < 2) freshErrors.lastName = 'Last name is required.';
    if (formData.address.length < 5) freshErrors.address = 'Valid address is required.';
    if (formData.city.length < 2) freshErrors.city = 'City is required.';
    if (formData.zip.length < 4) freshErrors.zip = 'ZIP code is required.';
    if (formData.cardNumber.length < 15) freshErrors.cardNumber = 'Valid card number is required.';
    if (formData.cvv.length < 3) freshErrors.cvv = 'CVV is required.';

    setErrors(freshErrors);
    return Object.keys(freshErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Order Placed Successfully! (Mock Functionality)');
      // In a real app, you would submit to backend, clear cart, and redirect to success page
    }
  };

  return (
    <div className="checkout-page container py-40">
      <h1 className="page-title mb-30">Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form-container card p-20">
          <form onSubmit={handleSubmit} className="checkout-form">
            
            <section className="form-section">
              <h2 className="section-title mb-20">Contact Information</h2>
              <div className="form-group full-width">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className="input-field" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title mb-20">Shipping Address</h2>
              <div className="form-row">
                <div className="form-group half-width">
                  <label>First Name</label>
                  <input type="text" name="firstName" className="input-field" value={formData.firstName} onChange={handleChange} />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group half-width">
                  <label>Last Name</label>
                  <input type="text" name="lastName" className="input-field" value={formData.lastName} onChange={handleChange} />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Address</label>
                <input type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label>City</label>
                  <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>
                <div className="form-group half-width">
                  <label>ZIP / Postal Code</label>
                  <input type="text" name="zip" className="input-field" value={formData.zip} onChange={handleChange} />
                  {errors.zip && <span className="error-text">{errors.zip}</span>}
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title mb-20">Payment Details</h2>
              <div className="form-group full-width">
                <label>Name on Card</label>
                <input type="text" name="cardName" className="input-field" value={formData.cardName} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label>Card Number</label>
                <input type="text" name="cardNumber" className="input-field" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>
              <div className="form-row">
                <div className="form-group half-width">
                  <label>Expiration Date</label>
                  <input type="text" name="expDate" className="input-field" placeholder="MM/YY" value={formData.expDate} onChange={handleChange} />
                </div>
                <div className="form-group half-width">
                  <label>CVC</label>
                  <input type="text" name="cvv" className="input-field" placeholder="123" value={formData.cvv} onChange={handleChange} />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
            </section>

            <button type="submit" className="btn-primary place-order-btn mt-30">
              Place Order
            </button>
          </form>
        </div>

        <div className="checkout-summary card p-20">
          <h2 className="summary-title mb-20">Order Review</h2>
          <div className="review-items mb-20">
            {cart.map((item, idx) => (
              <div key={idx} className="review-item flex-between mb-10">
                <div className="review-item-info">
                  <span className="qty-badge">{item.quantity}x</span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <hr className="summary-divider" />
          
          <div className="summary-row total-row mb-10">
            <span>Total</span>
            <span className="price-text">${cartTotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
