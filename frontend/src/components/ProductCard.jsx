import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BASE_URL } from '../utils/api';
import '../styles/ProductCard.css';

const StarRating = ({ rating = 4 }) => {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
                <svg
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const confirmAddToCart = (e) => {
        e.stopPropagation();
        if (selectedSize) {
            addToCart({ ...product, size: selectedSize });
            setShowModal(false);
            setSelectedSize(null);
        } else {
            alert('Please select a size');
        }
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
        setSelectedSize(null);
    };

    const sizes = product.sizes || [];

    return (
        <>
            <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <div className="product-image">
                    <img
                        src={product.image || (product.image_url ? `${BASE_URL}${product.image_url}` : '')}
                        alt={product.name}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                    />
                </div>
                <div className="product-info">
                    <div className="product-name-price">
                        <h3>{product.name}</h3>
                        <span className="price">${Number(product.price).toFixed(2)}</span>
                    </div>
                    <p className="product-description">
                        {product.description || 'Premium quality footwear for everyday style.'}
                    </p>
                    <StarRating rating={4} />
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="size-modal-overlay" onClick={closeModal}>
                    <div className="size-modal-content" onClick={e => e.stopPropagation()}>
                        <h4>Select Size</h4>
                        <div className="size-grid">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                            <button
                                className="confirm-btn"
                                onClick={confirmAddToCart}
                                disabled={!selectedSize}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
