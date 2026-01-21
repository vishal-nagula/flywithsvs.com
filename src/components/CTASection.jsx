import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section style={{
            backgroundColor: 'var(--color-primary)',
            padding: '100px 0',
            color: 'white',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        color: 'white',
                        fontSize: '3rem',
                        marginBottom: '20px',
                        letterSpacing: '-1px'
                    }}>
                        Start Your Global Journey With Confidence
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '40px',
                        fontWeight: '300'
                    }}>
                        Our experts handle everything — from documentation to approval — so you don’t have to worry.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <Link to="/apply-visa" className="btn btn-secondary" style={{
                            fontSize: '1.1rem',
                            padding: '16px 40px',
                            minWidth: '200px'
                        }}>
                            Apply For Visa
                        </Link>
                        <a href="tel:+911234567890" className="btn btn-outline" style={{
                            fontSize: '1.1rem',
                            padding: '16px 40px',
                            color: 'white',
                            borderColor: 'white',
                            minWidth: '200px'
                        }}>
                            Speak With Consultant
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
