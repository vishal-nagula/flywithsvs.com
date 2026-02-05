import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const B2BRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Steps: 1 = OTP Verification, 2 = Registration Form, 3 = Success
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Get email from navigation state
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    // Registration form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        companyName: '',
        // Optional fields
        gstNumber: '',
        website: '',
        businessAddress: '',
        city: '',
        state: '',
        pincode: '',
        businessType: '',
        yearsInBusiness: ''
    });

    // On mount: Get email from navigation state and auto-send OTP
    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);

            if (location.state?.autoSubmit) {
                // Auto-send OTP
                const autoSendOtp = async () => {
                    setLoading(true);
                    try {
                        await api.agentSendOtp({ email: location.state.email });
                        setSuccessMessage('OTP sent to your email address.');
                        // Clear state history so refresh doesn't re-trigger
                        window.history.replaceState({}, document.title);
                    } catch (err) {
                        setError(err.message || 'Failed to send OTP. Please try again.');
                    } finally {
                        setLoading(false);
                    }
                };
                autoSendOtp();
            }
        } else {
            // No email passed, stay on step 1 but show email input
            setStep(0); // Special step for entering email
        }
    }, [location.state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Step 0: Send OTP (if user came directly without email)
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await api.agentSendOtp({ email });
            setStep(1);
            setSuccessMessage('OTP sent to your email address.');
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 1: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!otp || otp.length < 4) {
            setError('Please enter a valid OTP.');
            return;
        }

        setLoading(true);
        try {
            const result = await api.agentVerifyOtp({ email, otp });

            if (result.valid) {
                setStep(2);
                setSuccessMessage('OTP verified successfully!');
            } else {
                setError(result.message || 'Invalid or expired OTP. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'OTP verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            await api.agentSendOtp({ email });
            setOtp('');
            setSuccessMessage('New OTP sent to your email.');
        } catch (err) {
            setError(err.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Submit Registration
    const handleSubmitRegistration = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.companyName) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);

        // Map to API payload
        const payload = {
            email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            company_name: formData.companyName
        };

        // Add optional fields if provided
        if (formData.gstNumber) payload.gst_number = formData.gstNumber;
        if (formData.website) payload.website = formData.website;
        if (formData.businessAddress) payload.business_address = formData.businessAddress;
        if (formData.city) payload.city = formData.city;
        if (formData.state) payload.state = formData.state;
        if (formData.pincode) payload.pincode = formData.pincode;
        if (formData.businessType) payload.business_type = formData.businessType;
        if (formData.yearsInBusiness) payload.years_in_business = parseInt(formData.yearsInBusiness);

        try {
            await api.agentInitiate(payload);
            setStep(3);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Styles
    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: '500px',
        margin: '0 auto'
    };

    const headerStyle = {
        backgroundColor: '#095289',
        color: 'white',
        padding: '24px 30px',
        textAlign: 'center'
    };

    const bodyStyle = {
        padding: '30px'
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '0.95rem',
        color: '#1e293b',
        outline: 'none',
        transition: 'all 0.2s',
        marginBottom: '12px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        width: '100%',
        padding: '14px',
        backgroundColor: '#ef922b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        marginTop: '8px'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#334155',
        marginBottom: '6px'
    };

    // Step 0: Email input (if no email passed)
    if (step === 0) {
        return (
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Agent Registration</h2>
                    <p style={{ margin: '8px 0 0', fontSize: '0.9rem', opacity: 0.9 }}>Enter your email to get started</p>
                </div>
                <div style={bodyStyle}>
                    {error && (
                        <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSendOtp}>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            style={inputStyle}
                            required
                        />
                        <button type="submit" style={buttonStyle} disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Step 1: OTP Verification
    if (step === 1) {
        return (
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Verify Your Email</h2>
                    <p style={{ margin: '8px 0 0', fontSize: '0.9rem', opacity: 0.9 }}>Enter the OTP sent to {email}</p>
                </div>
                <div style={bodyStyle}>
                    {error && (
                        <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleVerifyOtp}>
                        <label style={labelStyle}>OTP Code</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit OTP"
                            style={{ ...inputStyle, textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem' }}
                            maxLength="6"
                            required
                        />
                        <button type="submit" style={buttonStyle} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={loading}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#095289',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Registration Form
    if (step === 2) {
        return (
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Complete Your Profile</h2>
                    <p style={{ margin: '8px 0 0', fontSize: '0.9rem', opacity: 0.9 }}>Fill in your business details</p>
                </div>
                <div style={bodyStyle}>
                    {error && (
                        <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmitRegistration}>
                        {/* Required Fields */}
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ margin: '0 0 12px', color: '#095289', fontSize: '0.95rem' }}>Required Information</h4>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                            </div>

                            <label style={labelStyle}>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91-9876543210"
                                style={inputStyle}
                                required
                            />

                            <label style={labelStyle}>Company Name *</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="ABC Travel Agency"
                                style={inputStyle}
                                required
                            />
                        </div>

                        {/* Optional Fields */}
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                            <h4 style={{ margin: '0 0 12px', color: '#64748b', fontSize: '0.9rem' }}>Business Details (Optional)</h4>

                            <label style={labelStyle}>GST Number</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                placeholder="29ABCDE1234F1Z5"
                                maxLength="15"
                                style={inputStyle}
                            />

                            <label style={labelStyle}>Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://www.example.com"
                                style={inputStyle}
                            />

                            <label style={labelStyle}>Business Address</label>
                            <input
                                type="text"
                                name="businessAddress"
                                value={formData.businessAddress}
                                onChange={handleChange}
                                placeholder="123 Main Street, Building A"
                                style={inputStyle}
                            />

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Mumbai"
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Maharashtra"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="400001"
                                        maxLength="6"
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Years in Business</label>
                                    <input
                                        type="number"
                                        name="yearsInBusiness"
                                        value={formData.yearsInBusiness}
                                        onChange={handleChange}
                                        placeholder="5"
                                        min="0"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <label style={labelStyle}>Business Type</label>
                            <input
                                type="text"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                placeholder="Travel Agency"
                                style={inputStyle}
                            />
                        </div>

                        <button type="submit" style={buttonStyle} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Step 3: Success
    return (
        <div style={cardStyle}>
            <div style={{ ...headerStyle, backgroundColor: '#16a34a' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✓</div>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Registration Submitted!</h2>
            </div>
            <div style={{ ...bodyStyle, textAlign: 'center' }}>
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Your agent registration request has been submitted successfully.<br /><br />
                    <strong>What's next?</strong><br />
                    Our team will review your application and send you an email with further instructions once approved.
                </p>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        ...buttonStyle,
                        backgroundColor: '#095289'
                    }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default B2BRegister;
