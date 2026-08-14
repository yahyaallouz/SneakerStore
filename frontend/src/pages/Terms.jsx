import React from 'react';
import '../styles/InfoPages.css';

const Terms = () => {
    return (
        <div className="info-page">
            <div className="info-hero terms-hero">
                <div className="info-hero-content">
                    <h1>Terms & <span className="highlight">Conditions</span></h1>
                    <p>Last updated: July 12, 2026</p>
                </div>
            </div>

            <div className="info-container terms-container">
                <section className="terms-section">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to SneakerHead ("we," "our," or "us"). These Terms and Conditions govern your use 
                        of our website and services. By accessing or making a purchase from our store, you agree to 
                        be bound by these terms. Please read them carefully before using our platform.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>2. Account Registration</h2>
                    <p>
                        To make a purchase, you may be required to create an account. You are responsible for 
                        maintaining the confidentiality of your account credentials and for all activities that 
                        occur under your account. You must provide accurate, current, and complete information 
                        during registration.
                    </p>
                    <ul>
                        <li>You must be at least 16 years old to create an account.</li>
                        <li>You are responsible for all activity under your account.</li>
                        <li>Notify us immediately of any unauthorized use of your account.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>3. Products & Pricing</h2>
                    <p>
                        All products listed on our website are subject to availability. We reserve the right to 
                        modify prices, discontinue products, or limit quantities at any time without prior notice.
                    </p>
                    <ul>
                        <li>Prices are displayed in US Dollars (USD) and include applicable taxes.</li>
                        <li>Product images are for illustration purposes; actual colors may vary slightly.</li>
                        <li>We guarantee the authenticity of every product sold on SneakerHead.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>4. Orders & Payment</h2>
                    <p>
                        When you place an order, it constitutes an offer to purchase. We reserve the right to 
                        accept or decline any order. Payment is processed at the time of purchase.
                    </p>
                    <ul>
                        <li>We accept major credit/debit cards and PayPal.</li>
                        <li>All payment information is encrypted and securely processed.</li>
                        <li>Orders are confirmed via email once payment is successfully processed.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>5. Shipping & Delivery</h2>
                    <p>
                        We offer standard and express shipping options. Delivery times are estimates and may 
                        vary based on your location and shipping method selected.
                    </p>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 3–5 business days.</li>
                        <li><strong>Express Shipping:</strong> 1–2 business days.</li>
                        <li>Free shipping on orders over $100.</li>
                        <li>International shipping rates and times vary by destination.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>6. Returns & Refunds</h2>
                    <p>
                        We want you to love your purchase. If you're not completely satisfied, you may return 
                        eligible items within 30 days of delivery for a full refund or exchange.
                    </p>
                    <ul>
                        <li>Items must be unworn, undamaged, and in original packaging.</li>
                        <li>Return shipping is free for domestic orders.</li>
                        <li>Refunds are processed within 5–7 business days after we receive the returned item.</li>
                        <li>Sale items and gift cards are final sale and cannot be returned.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>7. Intellectual Property</h2>
                    <p>
                        All content on this website — including text, images, logos, and design elements — is the 
                        property of SneakerHead or its licensors. You may not reproduce, distribute, or use any 
                        content without our prior written consent.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>8. Privacy Policy</h2>
                    <p>
                        Your privacy is important to us. We collect, use, and protect your personal data in 
                        accordance with our Privacy Policy. By using our services, you consent to the collection 
                        and use of your information as described.
                    </p>
                    <ul>
                        <li>We never sell your personal information to third parties.</li>
                        <li>Data is encrypted and stored securely.</li>
                        <li>You may request deletion of your data at any time by contacting support.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>9. Limitation of Liability</h2>
                    <p>
                        SneakerHead shall not be liable for any indirect, incidental, or consequential damages 
                        arising from your use of our website or products. Our total liability shall not exceed 
                        the amount paid for the specific product giving rise to the claim.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms and Conditions, please contact us at:
                    </p>
                    <ul>
                        <li><strong>Email:</strong> support@sneakerhead.com</li>
                        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                        <li><strong>Address:</strong> 123 Sneaker Street, New York, NY 10001</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Terms;
