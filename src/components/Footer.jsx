import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', paddingTop: '80px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {/* Brand Column */}
                    <div style={{ maxWidth: '300px' }}>
                        <div style={{ marginBottom: '25px' }}>
                            {/* Filter brightness to Make logo white for dark background */}
                            <img
                                src={logo}
                                alt="Fly With SVS"
                                style={{ height: '40px', filter: 'brightness(0) invert(1)' }}
                            />
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px' }}>
                            Your trusted global partner for visa processing, corporate travel solutions, and seamless flight bookings.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <a href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.8 }}><i className="fab fa-linkedin"></i></a>
                            <a href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.8 }}><i className="fab fa-twitter"></i></a>
                            <a href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.8 }}><i className="fab fa-instagram"></i></a>
                            <a href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.8 }}><i className="fab fa-facebook"></i></a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '25px' }}>Our Services</h4>
                        <ul style={{ padding: 0 }}>
                            <li style={{ marginBottom: '12px' }}><Link to="/visa-services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Visa Assistance</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Flight Reservations</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Corporate Travel</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Holiday Packages</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Travel Insurance</Link></li>
                        </ul>
                    </div>

                    {/* Top Destinations */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '25px' }}>Visa Destinations</h4>
                        <ul style={{ padding: 0 }}>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>United States</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>United Kingdom</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Schengen Countries</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Canada</Link></li>
                            <li style={{ marginBottom: '12px' }}><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.95rem' }}>Australia</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '25px' }}>Contact Us</h4>
                        <ul style={{ padding: 0 }}>
                            <li style={{ marginBottom: '15px', display: 'flex', gap: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                <i className="fas fa-map-marker-alt" style={{ marginTop: '5px', color: 'var(--color-accent)' }}></i>
                                <span>Corporate HQ:<br />Hyderabad, India</span>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', gap: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                <i className="fas fa-phone-alt" style={{ marginTop: '5px', color: 'var(--color-accent)' }}></i>
                                <span>+91 123 456 7890</span>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', gap: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                <i className="fas fa-envelope" style={{ marginTop: '5px', color: 'var(--color-accent)' }}></i>
                                <span>support@flywithsvs.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    padding: '30px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>
                        &copy; {new Date().getFullYear()} Fly With SVS. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link to="/terms" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textDecoration: 'none' }}>Terms of Service</Link>
                        <Link to="/sitemap" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textDecoration: 'none' }}>Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
