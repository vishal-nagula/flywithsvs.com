import React from 'react';
import { Link } from 'react-router-dom';

const VisaServicesSection = () => {
    const countries = [
        { name: "United States", code: "US", time: "10-15 Days", price: "$185" },
        { name: "United Kingdom", code: "GB", time: "15 Days", price: "£115" },
        { name: "Canada", code: "CA", time: "20-30 Days", price: "CAD 100" },
        { name: "Schengen (EU)", code: "EU", time: "15 Days", price: "€80" },
        { name: "Australia", code: "AU", time: "15-20 Days", price: "AUD 150" },
        { name: "Dubai (UAE)", code: "AE", time: "2-3 Days", price: "AED 350" }
    ];

    return (
        <section className="section">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <span className="section-subtitle">Global Access</span>
                        <h2>Seamless Visa Processing</h2>
                        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                            Navigate complex visa requirements with our expert guidance. High success rates for major destinations.
                        </p>
                    </div>
                    <Link to="/visa-services" className="btn btn-outline" style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline-flex' } }}>
                        View All Countries
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '24px'
                }}>
                    {countries.map((country, index) => (
                        <div key={index} style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'all 0.3s'
                        }}
                            className="visa-card" // Using class for cleaner hover in future if needed
                        >
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            backgroundColor: '#f0f0f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            color: 'var(--color-primary)'
                                        }}>
                                            {country.code}
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{country.name}</h3>
                                    </div>
                                    <span style={{
                                        backgroundColor: '#e6f7ff',
                                        color: '#0050b3',
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}>
                                        Fast Track
                                    </span>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Processing</div>
                                        <div style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{country.time}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Starting From</div>
                                        <div style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{country.price}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <Link to={`/apply-visa?country=${country.name}`} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.9rem' }}>
                                        Apply Now
                                    </Link>
                                    <Link to={`/visa-requirements/${country.name.toLowerCase().replace(' ', '-')}`} className="btn btn-outline" style={{ padding: '10px', fontSize: '0.9rem', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                                        Requirements
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center" style={{ marginTop: '50px' }}>
                    <Link to="/visa-services" className="btn btn-outline">
                        View All 100+ Countries
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default VisaServicesSection;
