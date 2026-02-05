import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        : 'bg-[#095289] text-white py-4 shadow-md' // Brand Navy
        }`;

    // Inline styles for this component to ensure it works even if tailwind/global css has issues
    const navLinkStyle = {
        color: 'inherit',
        fontWeight: '500', // Clean medium weight
        fontSize: '0.85rem', // Slightly smaller for elegance
        textTransform: 'uppercase',
        letterSpacing: '1.5px', // Wider spacing like reference
        margin: '0 20px',
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
            backgroundColor: '#ffffff', // White background
            padding: '16px 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    {/* Booking.com style usually text or simple logo. Keeping existing logo but removing filter if it helps, or keeping white invert. */}
                    <img
                        src="/logo.png"
                        alt="Fly With SVS"
                        style={{ height: '40px' }}
                    />
                </Link>

                <nav style={{ display: 'flex', alignItems: 'center' }}>

                    {/* Auth / Action Buttons - Booking.com puts these prominent */}
                    <div className="auth-buttons" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>


                        {/* Secondary Button (Sign In) - Blue Text/Border */}
                        <Link to="/b2b-login" style={{
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: 'var(--color-primary)',
                            backgroundColor: 'transparent',
                            borderRadius: '2px', // Boxy
                            textDecoration: 'none',
                            border: '1px solid var(--color-primary)' // Blue border
                        }}>
                            Sign in
                        </Link>

                        {/* Primary Button (Register) - Yellow */}
                        <Link to="/b2b-register" style={{
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#1a1a1a', // Dark Text
                            backgroundColor: 'var(--color-accent)', // Yellow
                            borderRadius: '2px', // Boxy
                            textDecoration: 'none',
                            border: '1px solid var(--color-accent)'
                        }}>
                            Register
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
