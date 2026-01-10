
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="SVS Holidays" style={{ maxHeight: '60px' }} />
                    </Link>
                </div>

                {/* Nav removed per user request */}

                <div className="header-cta" style={{ marginLeft: 'auto' }}>
                    {localStorage.getItem('auth_token') ? (
                        <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
                    ) : (
                        <Link to="/b2b-login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
