import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const SetupPassword = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/b2b-login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwords.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            await api.changePassword({ newPassword: passwords.newPassword });
            // Cleanup flag if stored locally or just rely on next login
            // Ideally we might want to update local storage user details if we were tracking the flag there, 
            // but currently we just redirect to dashboard.
            navigate('/dashboard');
        } catch (err) {
            console.error('Password change error:', err);
            setError(err.message || 'Failed to update password');
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
                <h2 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '20px', color: '#16191f' }}>Set New Password</h2>
                <p style={{ marginBottom: '20px', color: '#545b64', fontSize: '0.9rem' }}>
                    Your password has expired or needs to be changed for security reasons. Please set a new password.
                </p>

                <form onSubmit={handleSubmit}>
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
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '5px', color: '#16191f' }}>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            value={passwords.newPassword}
                            onChange={handleChange}
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
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '5px', color: '#16191f' }}>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={passwords.confirmPassword}
                            onChange={handleChange}
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
                            borderRadius: '0px',
                            width: '100%',
                            backgroundColor: '#095289',
                            color: 'white',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Updating Password...' : 'Update Password'}
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#545b64' }}>
                <Link to="/b2b-login" style={{ color: '#095289', textDecoration: 'none' }}>&larr; Return to Sign In</Link>
            </div>
        </div>
    );
};

export default SetupPassword;
