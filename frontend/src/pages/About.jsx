import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Truck, Award, Users, MapPin } from 'lucide-react';
import '../styles/InfoPages.css';

const About = () => {
    return (
        <div className="info-page">
            <div className="info-hero about-hero">
                <div className="info-hero-content">
                    <h1>About <span className="highlight">SneakerHead</span></h1>
                    <p>Premium kicks. Unmatched style. Since 2020.</p>
                </div>
            </div>

            <div className="info-container">
                <section className="info-section">
                    <h2>Our Story</h2>
                    <p>
                        SneakerHead was born out of a simple passion — the love for sneakers. What started as a small 
                        community of sneaker enthusiasts in 2020 has grown into a trusted destination for authentic, 
                        premium footwear from the world's most iconic brands.
                    </p>
                    <p>
                        We believe sneakers are more than just shoes — they're a form of self-expression, a piece of culture, 
                        and a statement of individuality. Our mission is to bring you the latest drops, timeless classics, 
                        and exclusive collaborations, all in one place.
                    </p>
                </section>

                <section className="info-section values-grid">
                    <div className="value-card glass">
                        <Shield size={32} />
                        <h3>100% Authentic</h3>
                        <p>Every pair is verified for authenticity. We source directly from brands and authorized retailers.</p>
                    </div>
                    <div className="value-card glass">
                        <Truck size={32} />
                        <h3>Fast Shipping</h3>
                        <p>Free express delivery on orders over $100. Most orders arrive within 2–4 business days.</p>
                    </div>
                    <div className="value-card glass">
                        <Heart size={32} />
                        <h3>Curated Selection</h3>
                        <p>We hand-pick every style. Only the freshest drops and most iconic silhouettes make the cut.</p>
                    </div>
                    <div className="value-card glass">
                        <Award size={32} />
                        <h3>Quality Guarantee</h3>
                        <p>Not satisfied? We offer hassle-free returns within 30 days — no questions asked.</p>
                    </div>
                </section>

                <section className="info-section">
                    <h2>Our Mission</h2>
                    <p>
                        At SneakerHead, we're committed to making premium sneakers accessible to everyone. 
                        Whether you're a seasoned collector or buying your first pair of Jordans, we provide 
                        an experience that's seamless, trustworthy, and exciting.
                    </p>
                    <p>
                        We partner with Nike, Adidas, Puma, and other leading brands to ensure you get 
                        the real deal — every single time.
                    </p>
                </section>

                <section className="info-section team-section">
                    <h2>Why Choose Us?</h2>
                    <div className="stats-row">
                        <div className="stat-item">
                            <Users size={28} />
                            <span className="stat-number">50K+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                        <div className="stat-item">
                            <Award size={28} />
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Sneaker Styles</span>
                        </div>
                        <div className="stat-item">
                            <MapPin size={28} />
                            <span className="stat-number">30+</span>
                            <span className="stat-label">Countries Shipped</span>
                        </div>
                    </div>
                </section>

                <section className="info-section cta-section">
                    <h2>Ready to find your next pair?</h2>
                    <p>Explore our latest collections and discover your perfect sneaker.</p>
                    <div className="cta-buttons">
                        <Link to="/men" className="cta-btn primary">Shop Men</Link>
                        <Link to="/women" className="cta-btn primary">Shop Women</Link>
                        <Link to="/kids" className="cta-btn primary">Shop Kids</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
