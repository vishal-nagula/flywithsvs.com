
import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer-top">
                <div className="container footer-grid">
                    <div className="footer-col">
                        <div className="footer-logo" style={{ marginBottom: '20px' }}>
                            <img src={logo} alt="SVS Holidays" style={{ maxWidth: '140px' }} />
                        </div>
                        <h3>SVS Holidays</h3>
                        <p>Your trusted partner for visa assistance, dummy tickets, and travel solutions.</p>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Visa Assistance</a></li>
                            <li><a href="#">Dummy Tickets</a></li>
                            <li><a href="#">Hotel Bookings</a></li>
                            <li><a href="#">B2B Solutions</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Contact Us</h3>
                        <ul className="contact-info">
                            <li><i className="fas fa-envelope"></i> support@svsholidays.com</li>
                            <li><i className="fas fa-map-marker-alt"></i> PAN India & International</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2024 FlyWithSVS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
