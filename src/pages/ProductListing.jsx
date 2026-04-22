import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import './ProductListing.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    maxPrice: 200,
  });

  useEffect(() => {
    setProducts(getProducts());
    setCategories(['All', ...getCategories()]);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = products.filter(p => {
    const matchCategory = filters.category === 'All' || p.category === filters.category;
    const matchPrice = p.price <= filters.maxPrice;
    return matchCategory && matchPrice;
  });

  return (
    <div className="product-listing-page container py-40">
      <div className="layout-sidebar-main">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar card p-20">
          <h2 className="filters-title">Filters</h2>
          
          <div className="filter-group">
            <h3 className="filter-subtitle">Category</h3>
            <ul className="filter-list">
              {categories.map(cat => (
                <li key={cat}>
                  <label>
                    <input 
                      type="radio" 
                      name="category" 
                      value={cat} 
                      checked={filters.category === cat}
                      onChange={handleFilterChange}
                    />
                    <span className="ml-10">{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group mt-30">
            <h3 className="filter-subtitle">Max Price: ${filters.maxPrice}</h3>
            <input 
              type="range" 
              name="maxPrice" 
              min="0" 
              max="200" 
              step="10"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="price-slider"
            />
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="main-products">
          <div className="products-header">
            <h1 className="page-title">Shop All</h1>
            <p className="results-count text-muted">{filteredProducts.length} Results</p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products match your filters.</p>
              <button 
                className="btn-secondary mt-20" 
                onClick={() => setFilters({ category: 'All', maxPrice: 200 })}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
