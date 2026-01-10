
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const B2BLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await api.login({ email, password });

            // Success: data contains key 'token'
            localStorage.setItem('auth_token', data.token);
            // Store user details
            localStorage.setItem('user_details', JSON.stringify({
                id: data.id,
                email: data.email,
                roles: data.roles,
                solutions: [] // Backend response doesn't strictly provide this yet, defaulting to empty
            }));

            if (data.passwordChangeRequired) {
                navigate('/setup-password');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#f2f3f3', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginBottom: '25px', textAlign: 'center' }}>
                <Link to="/">
                    <img src="/src/assets/logo.png" alt="SVS Holidays" style={{ maxHeight: '60px' }} />
                </Link>
            </div>

            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '0px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid #ddd'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '20px', color: '#16191f' }}>Sign in</h2>

                <form onSubmit={handleSubmit}>
                    {/* Error Message Display */}
                    {error && (
                        <div style={{
                            backgroundColor: '#fff5f5',
                            border: '1px solid #dba6a6',
                            color: '#d13212',
                            padding: '10px',
                            fontSize: '0.85rem',
                            marginBottom: '15px'
                        }}>
                            <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                            {error}
                        </div>
                    )}

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '5px', color: '#16191f' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 10px',
                                border: '1px solid #aab7b8',
                                borderRadius: '0px',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#095289'}
                            onBlur={(e) => e.target.style.borderColor = '#aab7b8'}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '5px', color: '#16191f' }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 10px',
                                border: '1px solid #aab7b8',
                                borderRadius: '0px',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#095289'}
                            onBlur={(e) => e.target.style.borderColor = '#aab7b8'}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                        style={{
                            height: '40px',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            borderRadius: '0px'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div style={{ marginTop: '20px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" style={{ color: '#095289', textDecoration: 'none' }}>Forgot password?</a>
                    </div>
                </form>
            </div>

            <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#545b64' }}>
                <Link to="/" style={{ color: '#095289', textDecoration: 'none' }}>&larr; Return to Home</Link>
                <span style={{ margin: '0 10px' }}>|</span>
                <span>Privacy Policy</span>
                <span style={{ margin: '0 10px' }}>|</span>
                <span>Terms of Use</span>
            </div>
        </div>
    );
};

export default B2BLogin;
