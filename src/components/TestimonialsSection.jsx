import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Client Stories</span>
                    <h2>Trusted by Professionals Worldwide</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px'
                }}>
                    {/* Testimonial 1 */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <div style={{ fontSize: '1.5rem' }}>🇺🇸</div>
                        </div>
                        <p style={{
                            fontSize: '1.05rem',
                            fontStyle: 'italic',
                            color: 'var(--color-text-main)',
                            marginBottom: '24px',
                            lineHeight: '1.6'
                        }}>
                            "The visa processing for our corporate team was handled with exceptional professionalism. SVS ensured compliance and speed for our UK delegation."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: '#ddd',
                                backgroundImage: 'url(https://randomuser.me/api/portraits/men/32.jpg)',
                                backgroundSize: 'cover'
                            }}></div>
                            <div>
                                <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>Michael Ross</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Operations Director, TechCorp</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <div style={{ fontSize: '1.5rem' }}>🇦🇪</div>
                        </div>
                        <p style={{
                            fontSize: '1.05rem',
                            fontStyle: 'italic',
                            color: 'var(--color-text-main)',
                            marginBottom: '24px',
                            lineHeight: '1.6'
                        }}>
                            "SVS has been our reliable partner for flight bookings and visa assistance. Their B2B portal is intuitive and their support team is always available."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: '#ddd',
                                backgroundImage: 'url(https://randomuser.me/api/portraits/women/44.jpg)',
                                backgroundSize: 'cover'
                            }}></div>
                            <div>
                                <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>Priya Sharma</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Travel Consultant, Mumbai</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
