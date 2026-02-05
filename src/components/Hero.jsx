import React from 'react';
import { Link } from 'react-router-dom';
import AgentRegistrationForm from './AgentRegistrationForm';

const Hero = () => {
    return (
        <section className="hero-section" style={{
            position: 'relative',
            minHeight: '100vh',
            backgroundColor: 'var(--color-primary)', // Solid Navy
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            paddingTop: '80px', // Header offset
            paddingBottom: '80px'
        }}>
            {/* Subtle Gradient Overlay for depth */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '60px'
                }}>
                    {/* Left Content */}
                    <div style={{ flex: '1 1 550px', maxWidth: '650px', paddingRight: '40px' }}>

                        {/* Pre-heading Badge - refined */}
                        <div style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '50px', // softer round
                            color: '#fff',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            marginBottom: '32px',
                            letterSpacing: '0.5px',
                            backdropFilter: 'blur(4px)'
                        }}>
                            <span style={{ color: 'var(--color-accent)' }}>●</span> Platform for Business
                        </div>

                        {/* Main Heading - Refined & Smaller */}
                        <h1 style={{
                            fontSize: '2.5rem', // Smaller text for premium feel
                            fontWeight: '600', // Lighter weight
                            lineHeight: '1.25',
                            marginBottom: '20px',
                            letterSpacing: '-0.01em',
                            color: '#ffffff',
                            fontFamily: 'var(--font-heading)',
                            maxWidth: '650px'
                        }}>
                            FlyWithSVS — Trusted B2B Travel Partner for Agents & Corporates.
                        </h1>

                        <p style={{
                            fontSize: '0.95rem', // Smaller, more elegant body text
                            lineHeight: '1.6',
                            marginBottom: '32px',
                            color: 'rgba(255, 255, 255, 0.8)', // Softer white
                            fontWeight: '400',
                            maxWidth: '550px'
                        }}>
                            Save time, reduce costs, and manage every booking with confidence.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <Link to="/register" className="btn" style={{
                                padding: '12px 28px', // Smaller buttons
                                fontSize: '0.9rem',
                                borderRadius: '4px',
                                textTransform: 'none',
                                fontWeight: '600',
                                backgroundColor: 'var(--color-accent)',
                                color: '#0f172a',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}>
                                Get Started
                            </Link>
                            <Link to="/register" className="btn" style={{
                                padding: '12px 28px',
                                fontSize: '0.9rem',
                                borderRadius: '4px',
                                textTransform: 'none',
                                fontWeight: '500',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: 'white',
                                backdropFilter: 'blur(4px)'
                            }}>
                                Register
                            </Link>
                        </div>

                        {/* Stats - Minimal */}
                        <div style={{
                            marginTop: '60px',
                            display: 'flex',
                            gap: '50px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            paddingTop: '24px'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: '600', color: 'white', lineHeight: '1' }}>98%</span>
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Visa Approval</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: '600', color: 'white', lineHeight: '1' }}>150+</span>
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Countries</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: '600', color: 'white', lineHeight: '1' }}>24/7</span>
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Form - Styled as Floating Card */}
                    <div style={{ flex: '1 1 400px', maxWidth: '480px' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '0', // Form handles padding
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                padding: '20px 25px 0', // Reduced padding
                                borderBottom: '1px solid #f1f5f9'
                            }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    color: '#0f172a',
                                    marginBottom: '6px',
                                    fontWeight: '700'
                                }}>Get Started</h3>
                                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '15px' }}>Join the network of forward-thinking companies.</p>
                            </div>

                            {/* We use specific corporate style now */}
                            <AgentRegistrationForm customStyle="corporate-hero" hideTitle={true} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
