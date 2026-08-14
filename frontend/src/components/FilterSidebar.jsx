import React, { useState } from 'react';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, className = '', products = [], hideCategory = false }) => {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        size: true
    });

    const categories = ['All', 'Men', 'Women', 'Kids'];



    const sizes = [...new Set(products.flatMap(p => p.sizes || []))].sort((a, b) => a - b);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCategoryChange = (category) => {
        onFilterChange({ ...filters, category });
    };

    const handlePriceChange = (type, value) => {
        const numValue = Number(value);
        onFilterChange({
            ...filters,
            priceRange: {
                ...filters.priceRange,
                [type]: numValue
            }
        });
    };



    const handleSizeToggle = (size) => {
        const currentSizes = filters.sizes || [];
        const newSizes = currentSizes.includes(size)
            ? currentSizes.filter(s => s !== size)
            : [...currentSizes, size];
        onFilterChange({ ...filters, sizes: newSizes });
    };

    return (
        <aside className={`filter-sidebar ${className}`}>
            <h3 className="filter-sidebar-title">Filter Options</h3>

            {/* Category Section */}
            {!hideCategory && (
                <div className="filter-section">
                    <button
                        className="filter-section-header"
                        onClick={() => toggleSection('category')}
                    >
                        <span>Category</span>
                        <svg className={`chevron ${expandedSections.category ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        </svg>
                    </button>
                    {expandedSections.category && (
                        <div className="filter-section-body">
                            {categories.map(cat => (
                                <label key={cat} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={filters.category === cat}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">{cat}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Price Section */}
            <div className="filter-section">
                <button
                    className="filter-section-header"
                    onClick={() => toggleSection('price')}
                >
                    <span>Price</span>
                    <svg className={`chevron ${expandedSections.price ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                </button>
                {expandedSections.price && (
                    <div className="filter-section-body">
                        <div className="price-display">
                            ${filters.priceRange.min.toFixed(2)} – ${filters.priceRange.max.toFixed(2)}
                        </div>
                        <div className="price-slider-group">
                            <input
                                type="range"
                                className="price-range-input"
                                min="0"
                                max="300"
                                value={filters.priceRange.min}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                            />
                            <input
                                type="range"
                                className="price-range-input"
                                min="0"
                                max="300"
                                value={filters.priceRange.max}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>



            {/* Size Section */}
            <div className="filter-section">
                <button
                    className="filter-section-header"
                    onClick={() => toggleSection('size')}
                >
                    <span>Size</span>
                    <svg className={`chevron ${expandedSections.size ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                </button>
                {expandedSections.size && (
                    <div className="filter-section-body">
                        <div className="size-filter-grid">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-filter-btn ${(filters.sizes || []).includes(size) ? 'active' : ''}`}
                                    onClick={() => handleSizeToggle(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default FilterSidebar;
