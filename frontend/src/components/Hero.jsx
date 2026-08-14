import React from 'react';
import '../styles/Hero.css';
import heroImage from '../assets/images/nike_hero.png';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    JUST <span className="highlight">DROP</span> IT.
                </h1>
                <p className="hero-subtitle">
                    Experience the future of comfort. The new Air Future X is mostly air,
                    mostly magic. Lightweight, responsive, and ready to fly.
                </p>
                <button className="cta-btn">Shop Collection</button>

                <div className="stats">
                    <div className="stat-item">
                        <h3>30%</h3>
                        <p>Lighter</p>
                    </div>
                    <div className="stat-item">
                        <h3>2x</h3>
                        <p>Cushioning</p>
                    </div>
                </div>
            </div>

            <div className="hero-image-container">
                <div className="circle-bg"></div>
                <img src={heroImage} alt="Future Sneaker" className="hero-shoe" />
                <div className="floating-card glass">
                    <h4>New Arrival</h4>
                    <p>$249.00</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
