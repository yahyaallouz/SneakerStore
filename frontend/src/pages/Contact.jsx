import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import '../styles/InfoPages.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="info-page">
            <div className="info-hero contact-hero">
                <div className="info-hero-content">
                    <h1>Get in <span className="highlight">Touch</span></h1>
                    <p>We'd love to hear from you. Reach out anytime.</p>
                </div>
            </div>

            <div className="info-container">
                <div className="contact-layout">
                    {/* Contact Info Cards */}
                    <div className="contact-info-column">
                        <div className="contact-card glass">
                            <Mail size={24} />
                            <div>
                                <h3>Email Us</h3>
                                <p>support@sneakerhead.com</p>
                                <span className="contact-note">We reply within 24 hours</span>
                            </div>
                        </div>
                        <div className="contact-card glass">
                            <Phone size={24} />
                            <div>
                                <h3>Call Us</h3>
                                <p>+1 (555) 123-4567</p>
                                <span className="contact-note">Mon–Fri, 9AM–6PM EST</span>
                            </div>
                        </div>
                        <div className="contact-card glass">
                            <MapPin size={24} />
                            <div>
                                <h3>Visit Us</h3>
                                <p>123 Sneaker Street</p>
                                <span className="contact-note">New York, NY 10001</span>
                            </div>
                        </div>
                        <div className="contact-card glass">
                            <Clock size={24} />
                            <div>
                                <h3>Business Hours</h3>
                                <p>Mon – Fri: 9AM – 6PM</p>
                                <span className="contact-note">Sat – Sun: 10AM – 4PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-column">
                        <div className="contact-form-card glass">
                            <div className="form-header">
                                <MessageCircle size={24} />
                                <h2>Send us a Message</h2>
                            </div>
                            {submitted && (
                                <div className="success-toast">
                                    ✅ Message sent successfully! We'll get back to you soon.
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="contact-form-row">
                                    <div className="contact-form-group">
                                        <label>Your Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="contact-form-group">
                                        <label>Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="contact-form-group">
                                    <label>Subject</label>
                                    <select name="subject" value={formData.subject} onChange={handleChange} required>
                                        <option value="">Select a topic</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="return">Returns & Exchanges</option>
                                        <option value="product">Product Question</option>
                                        <option value="shipping">Shipping Information</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="contact-form-group">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="Tell us how we can help..."
                                        required
                                    />
                                </div>
                                <button type="submit" className="contact-submit-btn">
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="info-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-list">
                        <div className="faq-item glass">
                            <h3>How long does shipping take?</h3>
                            <p>Standard shipping takes 3–5 business days. Express shipping is available for 1–2 day delivery on most orders placed before 2PM EST.</p>
                        </div>
                        <div className="faq-item glass">
                            <h3>What is your return policy?</h3>
                            <p>We offer free returns within 30 days of delivery. Items must be unworn and in original packaging. Visit your order page to start a return.</p>
                        </div>
                        <div className="faq-item glass">
                            <h3>Are all sneakers authentic?</h3>
                            <p>Yes, 100%. Every pair is sourced directly from brands or their authorized distributors. We never sell replicas or unauthorized products.</p>
                        </div>
                        <div className="faq-item glass">
                            <h3>Can I track my order?</h3>
                            <p>Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order directly on our website.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
