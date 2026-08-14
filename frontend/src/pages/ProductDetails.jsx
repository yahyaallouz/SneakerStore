import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { BASE_URL } from '../utils/api';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { products, loading } = useProduct();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(null);
    const [activeSection, setActiveSection] = useState('description');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(p => p.id === parseInt(id));
            setProduct(foundProduct);
            setActiveImageIndex(0);
        }
    }, [id, products]);

    if (loading) return <div className="details-container"><h2>Loading...</h2></div>;
    if (!product) return <div className="details-container"><h2>Product not found</h2></div>;

    // Helper for image URL
    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${BASE_URL}${img}`;
    };

    const images = product.images && product.images.length > 0 ? product.images : (product.image_url ? [product.image_url] : []);
    const displayImage = getImageUrl(images[0]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size!');
            return;
        }
        addToCart({ ...product, size: selectedSize, image: displayImage });
    };

    return (
        <div className="product-details-page">
            <div className="breadcrumbs">
                <Link to="/">Home</Link> / <span>{product.name}</span>
            </div>

            <div className="product-layout">
                {/* Left Column - Gallery */}
                <div className="product-gallery">
                    <div className="thumbnails">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`thumb ${idx === activeImageIndex ? 'active' : ''}`}
                                onClick={() => setActiveImageIndex(idx)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={getImageUrl(img)} alt={`${product.name} view ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="main-image-container glass">
                        <img src={getImageUrl(images[activeImageIndex])} alt={product.name} className="main-image" />
                    </div>
                </div>

                {/* Right Column - Info */}
                <div className="product-info">
                    <span className="brand-badge">{product.brand}</span>
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-price">${product.price.toFixed(2)}</div>

                    <div className="size-section">
                        <div className="size-header">
                            <span>Select Size</span>
                            <button className="size-guide-btn">Size Guide</button>
                        </div>
                        <div className="size-grid">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-tile ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="add-to-cart-action" onClick={handleAddToCart}>
                        Add to Cart
                    </button>

                    <div className="info-accordions">
                        <div className="accordion-item">
                            <button
                                className={`accordion-header ${activeSection === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveSection(activeSection === 'description' ? '' : 'description')}
                            >
                                Description
                                <span>{activeSection === 'description' ? '-' : '+'}</span>
                            </button>
                            {activeSection === 'description' && (
                                <div className="accordion-content">
                                    <p>{product.description}</p>
                                    <p>Engineered for ultimate comfort and style, the {product.name} combines heritage design with modern technology.</p>
                                </div>
                            )}
                        </div>

                        <div className="accordion-item">
                            <button
                                className={`accordion-header ${activeSection === 'shipping' ? 'active' : ''}`}
                                onClick={() => setActiveSection(activeSection === 'shipping' ? '' : 'shipping')}
                            >
                                Shipping & Returns
                                <span>{activeSection === 'shipping' ? '-' : '+'}</span>
                            </button>
                            {activeSection === 'shipping' && (
                                <div className="accordion-content">
                                    <p>Free standard shipping on all orders over $100.</p>
                                    <p>Returns accepted within 30 days of purchase. Items must be unworn and in original packaging.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
