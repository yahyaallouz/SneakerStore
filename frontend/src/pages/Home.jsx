import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useProduct } from '../context/ProductContext';
import { X, SlidersHorizontal } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
    const { products, loading } = useProduct();
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: { min: 0, max: 300 },
        sizes: []
    });

    // Build active filter tags
    const activeFilterTags = useMemo(() => {
        const tags = [];
        if (filters.category !== 'All') {
            tags.push({ key: 'category', label: filters.category, value: filters.category });
        }

        filters.sizes.forEach(s => {
            tags.push({ key: `size-${s}`, label: s, value: s, type: 'size' });
        });
        if (filters.priceRange.min > 0 || filters.priceRange.max < 300) {
            tags.push({
                key: 'price',
                label: `Price: $${filters.priceRange.min.toFixed(2)}-${filters.priceRange.max.toFixed(2)}`,
                type: 'price'
            });
        }
        return tags;
    }, [filters]);

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (filters.category !== 'All') {
            const catMap = { 'Men': 'men', 'Women': 'women', 'Kids': 'kids' };
            result = result.filter(p => p.category === catMap[filters.category]);
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

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-az':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return result;
    }, [products, filters, sortBy]);

    const removeFilterTag = (tag) => {
        if (tag.key === 'category') {
            setFilters(f => ({ ...f, category: 'All' }));

        } else if (tag.type === 'size') {
            setFilters(f => ({ ...f, sizes: f.sizes.filter(s => s !== tag.value) }));
        } else if (tag.type === 'price') {
            setFilters(f => ({ ...f, priceRange: { min: 0, max: 300 } }));
        }
    };

    const clearAllFilters = () => {
        setFilters({
            category: 'All',
            priceRange: { min: 0, max: 300 },
            sizes: []
        });
        setSortBy('default');
    };

    const hasActiveFilters = activeFilterTags.length > 0;

    if (loading) {
        return <div className="loading-state">Loading amazing sneakers...</div>;
    }

    return (
        <div className="home">
            <Hero />

            <section className="products-section">
                <div className="section-header-row">
                    <h2>Latest <span className="highlight">Drops</span></h2>
                    <button
                        className="mobile-filter-toggle"
                        onClick={() => setMobileFilterOpen(true)}
                    >
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="products-layout">
                    {/* Mobile overlay */}
                    {mobileFilterOpen && (
                        <div
                            className="filter-overlay"
                            onClick={() => setMobileFilterOpen(false)}
                        />
                    )}

                    <FilterSidebar
                        filters={filters}
                        onFilterChange={setFilters}
                        className={mobileFilterOpen ? 'open' : ''}
                        products={products}
                    />

                    <div className="products-content">
                        {/* Top Results Bar */}
                        <div className="results-bar">
                            <div className="results-bar-left">
                                <span className="results-count">
                                    Showing 1-{Math.min(filteredProducts.length, 9)} of {filteredProducts.length} results
                                </span>
                            </div>
                            <div className="results-bar-right">
                                <div className="sort-wrapper">
                                    <label htmlFor="sort-select">Sort by:</label>
                                    <select
                                        id="sort-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="default">Default Setting</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name-az">Name: A to Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Active Filter Tags */}
                        {hasActiveFilters && (
                            <div className="active-filters-bar">
                                <span className="active-label">Active Filter</span>
                                <div className="filter-tags">
                                    {activeFilterTags.map(tag => (
                                        <span key={tag.key} className="filter-tag">
                                            {tag.label}
                                            <button
                                                className="tag-remove"
                                                onClick={() => removeFilterTag(tag)}
                                            >
                                                <X size={13} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <button className="clear-all-btn" onClick={clearAllFilters}>
                                    Close All
                                </button>
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className="product-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-results">
                                    <p>No products match your filters.</p>
                                    <button onClick={clearAllFilters} className="reset-btn">Reset Filters</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
