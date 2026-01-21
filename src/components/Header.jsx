import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Check if we are on the home page to apply transparent header logic
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClass = `fixed w-full z-50 transition-all duration-300 ${isHome && !scrolled
            ? 'bg-transparent text-white py-6'
            : 'bg-[#031d31] text-white py-4 shadow-md'
        }`;

    // Inline styles for this component to ensure it works even if tailwind/global css has issues
    const navLinkStyle = {
        color: 'inherit',
        fontWeight: '500',
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: '0 15px',
        textDecoration: 'none',
        position: 'relative',
        opacity: 0.9,
        transition: 'opacity 0.2s'
    };

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            backgroundColor: isHome && !scrolled ? 'transparent' : 'var(--color-primary)',
            padding: isHome && !scrolled ? '25px 0' : '15px 0',
            boxShadow: isHome && !scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="logo">
                    {/* Filter brightness to Make logo white for dark background */}
                    <img
                        src={logo}
                        alt="Fly With SVS"
                        style={{ height: '45px', filter: 'brightness(0) invert(1)' }}
                    />
                </Link>

                <nav style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
                        <Link to="/" style={navLinkStyle}>Home</Link>
                        <Link to="/visa-services" style={navLinkStyle}>Visa Services</Link>
                        <Link to="/corporate-travel" style={navLinkStyle}>Corporate</Link>
                        <Link to="/about" style={navLinkStyle}>About</Link>
                    </div>

                    <div className="auth-buttons" style={{ display: 'flex', gap: '15px' }}>
                        {/* Secondary CTA */}
                        <a href="tel:+911234567890" style={{
                            color: 'white',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '20px',
                            fontSize: '0.9rem'
                        }}>
                            <i className="fas fa-phone-alt" style={{ marginRight: '8px', color: 'var(--color-accent)' }}></i>
                            Support
                        </a>

                        <Link to="/b2b-login" className="btn btn-secondary" style={{
                            padding: '10px 24px',
                            fontSize: '0.85rem'
                        }}>
                            Agent Login
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
