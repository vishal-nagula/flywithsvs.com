import React from 'react';
import { Link } from 'react-router-dom';
import AgentRegistrationForm from './AgentRegistrationForm';

const Hero = () => {
    return (
        <section className="hero-section" style={{
            position: 'relative',
            minHeight: '100vh',
            background: 'linear-gradient(rgba(3, 29, 49, 0.75), rgba(3, 29, 49, 0.85)), url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            paddingTop: '100px', // Extra padding for header
            paddingBottom: '80px'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '40px'
                }}>
                    {/* Left Content */}
                    <div style={{ flex: '1 1 500px', maxWidth: '650px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(240, 145, 37, 0.15)',
                            border: '1px solid rgba(240, 145, 37, 0.3)',
                            borderRadius: '30px',
                            marginBottom: '25px',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <span style={{
                                color: '#f09125',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}>
                                <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                                Leading Visa & Travel Partner
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: '3.8rem',
                            fontWeight: '800',
                            lineHeight: '1.1',
                            marginBottom: '25px',
                            letterSpacing: '-2px',
                            color: 'white'
                        }}>
                            Global Visa & <br />
                            <span style={{ color: '#f09125' }}>Travel Solutions</span>
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            lineHeight: '1.6',
                            marginBottom: '40px',
                            opacity: '0.9',
                            fontWeight: '300',
                            maxWidth: '600px'
                        }}>
                            Professional visa processing, flight bookings, and travel assistance — delivered by experts you can trust.
                        </p>

                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <Link to="/apply-visa" className="btn btn-primary" style={{
                                fontSize: '1rem',
                                padding: '14px 32px',
                                background: 'var(--color-accent)',
                                borderColor: 'var(--color-accent)',
                                color: 'white'
                            }}>
                                Apply For Visa
                            </Link>

                            <a href="https://wa.me/1234567890" className="btn btn-outline" style={{
                                fontSize: '1rem',
                                padding: '14px 32px',
                                color: 'white',
                                borderColor: 'white',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <i className="fas fa-comments" style={{ marginRight: '10px' }}></i>
                                Talk to an Expert
                            </a>
                        </div>

                        <div style={{ marginTop: '50px', display: 'flex', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '25px' }}>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white' }}>10k+</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Travelers</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white' }}>99%</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Visa Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div style={{ flex: '1 1 400px', maxWidth: '480px', width: '100%' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                            borderTop: '5px solid var(--color-accent)'
                        }}>
                            <div style={{ padding: '20px 30px 0' }}>
                                <AgentRegistrationForm />
                            </div>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                textAlign: 'center',
                                fontSize: '0.85rem',
                                color: '#6c757d',
                                borderTop: '1px solid #e9ecef'
                            }}>
                                <i className="fas fa-lock" style={{ marginRight: '5px' }}></i> Secure Agent Registration
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
