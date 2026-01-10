
import React from 'react';

const Features = () => {
    return (
        <>
            {/* Services / Why Choose Us */}
            <section className="aws-section">
                <div className="container">
                    <div className="aws-header-group">
                        <h2 className="aws-h2">Solutions for Every Traveler</h2>
                        <p className="aws-sub">Scale your travel business with our comprehensive visa and booking infrastructure.</p>
                    </div>

                    <div className="aws-card-grid">
                        <div className="aws-card">
                            <div className="aws-card-icon">
                                <i className="fas fa-passport"></i>
                            </div>
                            <h3 className="aws-card-title">Visa Assistance</h3>
                            <p className="aws-card-text">End-to-end visa assistance for Tourist, Business, and Family visits. tailored for high approval rates across multiple global destinations.</p>
                            <a href="#" className="aws-link">Learn more <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                        </div>

                        <div className="aws-card">
                            <div className="aws-card-icon">
                                <i className="fas fa-file-invoice"></i>
                            </div>
                            <h3 className="aws-card-title">Dummy Tickets</h3>
                            <p className="aws-card-text">Generate embassy-compliant dummy flight tickets with valid PNRs instantly. Perfect for visa applications requiring proof of onward travel.</p>
                            <a href="#" className="aws-link">View pricing <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                        </div>

                        <div className="aws-card">
                            <div className="aws-card-icon">
                                <i className="fas fa-hotel"></i>
                            </div>
                            <h3 className="aws-card-title">Hotel Bookings</h3>
                            <p className="aws-card-text">Secure realistic hotel booking confirmations for visa submissions without upfront payment risks. Verifiable and embassy-ready.</p>
                            <a href="#" className="aws-link">Get started <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                        </div>

                        <div className="aws-card">
                            <div className="aws-card-icon">
                                <i className="fas fa-plane"></i>
                            </div>
                            <h3 className="aws-card-title">Flight Reservations</h3>
                            <p className="aws-card-text">Access competitive pricing for domestic and international flights. Exclusive B2B rates available for registered agents.</p>
                            <a href="#" className="aws-link">Book flights <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                        </div>

                        <div className="aws-card">
                            <div className="aws-card-icon">
                                <i className="fas fa-user-tie"></i>
                            </div>
                            <h3 className="aws-card-title">B2B Agent Portal</h3>
                            <p className="aws-card-text">A dedicated platform for travel agents. Manage bookings, track visa applications, and earn commissions with our white-label solutions.</p>
                            <a href="#" className="aws-link">Register as agent <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                        </div>

                        <div className="aws-card">
                            <div className="aws-card-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3 className="aws-card-title">Secure Processing</h3>
                            <p className="aws-card-text">Your data is handled with the highest security standards. We ensure specific compliance for all documentation.</p>
                            <a href="#" className="aws-link">Security details <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner Section - AWS Style CTA */}
            <section style={{ padding: '80px 0', background: 'var(--dark-navy)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px' }}>Ready to start your journey?</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px', color: '#d1d5db' }}>
                        Join thousands of travelers and agents who trust SVS for their travel documentation needs.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <a href="#" className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem' }}>Get Started</a>
                        <a href="#" className="btn btn-outline" style={{ padding: '12px 30px', fontSize: '1.1rem', background: 'transparent', color: 'white', borderColor: 'white' }}>Contact Sales</a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
