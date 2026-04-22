import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import './Home.css';

const Home = () => {
  const featured = getProducts().slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">Elevate Your Everyday Style</h1>
          <p className="hero-subtitle">Discover our new collection of premium essentials tailored for modern living.</p>
          <Link to="/shop" className="btn-primary hero-btn">Shop Now</Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/shop" className="text-muted">View all</Link>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
