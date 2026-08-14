import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useProduct } from '../context/ProductContext';
import { SlidersHorizontal } from 'lucide-react';
import kidsSneakers from '../assets/images/kidsSnerkers.jpg';
import '../styles/Home.css';

const Kids = () => {
    const { products, loading } = useProduct();
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [brandFilter, setBrandFilter] = useState('All');
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 300 },
        sizes: []
    });

    // 1. First filter by category 'kids'
    const kidsProducts = useMemo(() => {
        return products.filter(p => p.category.toLowerCase() === 'kids');
    }, [products]);

    // 2. Filter by brand, price, sizes
    const filteredProducts = useMemo(() => {
        let result = [...kidsProducts];

        // Brand filter (tabs)
        if (brandFilter !== 'All') {
            result = result.filter(p => p.brand === brandFilter);
        }

        // Price filter
        result = result.filter(p =>
            p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
        );

        // Size filter
        if (filters.sizes && filters.sizes.length > 0) {
            result = result.filter(p =>
                p.sizes && filters.sizes.some(s => p.sizes.includes(s))
            );
        }

        return result;
    }, [kidsProducts, brandFilter, filters]);

    if (loading) {
        return <div className="loading-state">Loading amazing sneakers...</div>;
    }

    return (
        <div className="page-container">
            {/* Styled Collection Hero Banner */}
            <div 
                className="collection-hero kids-hero" 
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${kidsSneakers})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="hero-content">
                    <h1>Kids' <span className="highlight">Collection</span></h1>
                    <p>Bright, colorful, and durably constructed sneakers active kids will love.</p>
                </div>
            </div>

            <section className="products-section" style={{ padding: '0 4% 3rem 4%' }}>
                <div className="collection-header-row">
                    <h2>Latest Release ({filteredProducts.length})</h2>
                    
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        {/* Mobile sidebar toggle button */}
                        <button
                            className="mobile-filter-toggle"
                            onClick={() => setMobileFilterOpen(true)}
                        >
                            <SlidersHorizontal size={16} />
                            <span>Filters</span>
                        </button>

                        <div className="filter-tabs">
                            {['All', 'Nike', 'Adidas', 'Puma'].map(brand => (
                                <button
                                    key={brand}
                                    className={`filter-btn ${brandFilter === brand ? 'active' : ''}`}
                                    onClick={() => setBrandFilter(brand)}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="products-layout">
                    {/* Mobile overlay */}
                    {mobileFilterOpen && (
                        <div
                            className="filter-overlay"
                            onClick={() => setMobileFilterOpen(false)}
                        />
                    )}

                    {/* Filter Sidebar on the left */}
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={setFilters}
                        className={mobileFilterOpen ? 'open' : ''}
                        products={kidsProducts}
                        hideCategory={true}
                    />

                    <div className="products-content">
                        <div className="product-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-results">
                                    <p>No products match your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Kids;
