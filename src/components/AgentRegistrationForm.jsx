import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';

const AgentRegistrationForm = ({ customStyle, hideTitle = false }) => {
    // Steps: 1 = Email Input, 2 = OTP + Details Input, 3 = Success
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
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

    // Check for passed state on mount (Handling Redirect from Modal)
    useEffect(() => {
        if (location.state?.email && location.state?.autoSubmit && step === 1) {
            const initialEmail = location.state.email;
            setFormData(prev => ({ ...prev, email: initialEmail }));

            // Auto-trigger OTP sending
            const autoSendOtp = async () => {
                setLoading(true);
                try {
                    await api.agentSendOtp({ email: initialEmail });
                    setOtpSent(true); // Show OTP input in Slide 1
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
    }, [location.state, step]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Step 1a: Send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Modal Mode or Hero Section Redirect Logic
        if (customStyle === 'modal-compact' || customStyle === 'corporate-hero') {
            navigate('/b2b-register', {
                state: {
                    email: formData.email,
                    autoSubmit: true
                }
            });
            return;
        }

        setLoading(true);

        try {
            await api.agentSendOtp({ email: formData.email });
            setOtpSent(true);
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 1b: Verify OTP (Call API)
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!formData.otp || formData.otp.length < 4) {
            setError('Please enter a valid OTP.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const result = await api.agentVerifyOtp({
                email: formData.email,
                otp: formData.otp
            });

            // Check if OTP is valid
            if (result.valid) {
                // OTP verified successfully, move to registration details
                setStep(2);
            } else {
                // OTP is invalid
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
        setLoading(true);

        try {
            await api.agentSendOtp({ email: formData.email });
            setFormData({ ...formData, otp: '' }); // Clear OTP field
            setError(''); // Clear any previous errors
            // Show success message briefly
            const successMsg = 'New OTP sent to your email';
            setError(''); // We'll use a different approach
            alert(successMsg); // Simple alert for now
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
        setLoading(true);

        // Map camelCase state to snake_case API payload
        const payload = {
            email: formData.email,
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
            setStep(3); // Move to Success view
        } catch (err) {
            setError(err.message || 'Registration failed. Check OTP and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Styling Logic
    const isHeroCard = customStyle === 'hero-card';
    const isCorporate = customStyle === 'corporate-hero';
    const isModal = customStyle === 'modal-compact';

    const inputStyle = {
        width: '100%',
        padding: isModal ? '10px 12px' : '14px 16px', // Compact padding for modal
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: isModal ? '0.9rem' : '0.95rem',
        color: '#1e293b',
        outline: 'none',
        transition: 'all 0.2s',
        marginBottom: '0',
        backgroundColor: '#ffffff',
        // Hero/Corporate overrides
        ...(isHeroCard && !isCorporate ? {
            border: 'none',
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.3)'
        } : {})
    };

    const labelStyle = {
        color: (isHeroCard && !isCorporate) ? 'rgba(255,255,255,0.7)' : '#334155',
        fontSize: isModal ? '0.75rem' : '0.85rem',
        fontWeight: '600',
        marginBottom: '4px',
        display: 'block',
    };

    const btnStyle = {
        width: '100%',
        padding: isModal ? '10px' : '14px', // Compact button
        backgroundColor: (isHeroCard && !isCorporate) ? 'white' : '#ef922b', // BRAND: Orange
        color: (isHeroCard && !isCorporate) ? '#031d31' : 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: isModal ? '0.9rem' : '0.95rem',
        fontWeight: '700',
        textTransform: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.8 : 1,
        marginTop: isModal ? '10px' : '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    };

    // --- RENDER LOGIC ---

    // 1. Success View (Step 3) - Centered Simple View
    if (step === 3) {
        return (
            <div style={{
                backgroundColor: (isHeroCard || isCorporate || isModal) ? 'transparent' : 'white',
                borderRadius: '12px',
                boxShadow: (isHeroCard || isCorporate || isModal) ? 'none' : '0 10px 40px rgba(0,0,0,0.1)',
                padding: '50px 30px',
                textAlign: 'center',
                margin: '0 auto',
                maxWidth: '100%'
            }}>
                <div style={{ fontSize: '3.5rem', color: '#ef922b', marginBottom: '20px' }}> {/* BRAND: Yellow */}
                    <i className="fas fa-check-circle"></i>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#095289', fontWeight: '700' }}> {/* BRAND: Navy */}
                    Registration Submitted
                </h3>
                <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.6' }}>
                    Your account is pending admin approval.<br />You will receive an email once verified.
                </p>
                <button
                    onClick={() => { setStep(1); setOtpSent(false); setFormData({ ...formData, otp: '' }); }}
                    style={{
                        marginTop: '20px',
                        background: 'transparent',
                        border: '1px solid #095289', // BRAND: Navy
                        color: '#095289', // BRAND: Navy
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // 2. Registration Steps (Sliding Form)
    return (
        <div style={{
            backgroundColor: (isHeroCard || isCorporate || isModal) ? 'transparent' : 'white',
            borderRadius: '12px',
            boxShadow: (isHeroCard || isCorporate || isModal) ? 'none' : '0 10px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            position: 'relative',
            maxWidth: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            {!hideTitle && (
                <div style={{
                    textAlign: 'center',
                    padding: '30px 30px 10px',
                    borderBottom: '1px solid #f0f0f0'
                }}>
                    <p style={{
                        color: (isHeroCard || isCorporate) ? 'white' : '#095289', // BRAND: Navy
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        margin: 0
                    }}>
                        {step === 1 ? 'Verify Identity' : 'Partner Details'}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: (isHeroCard || isCorporate) ? 'rgba(255,255,255,0.7)' : '#666', marginTop: '5px' }}>
                        {step === 1 ? 'Enter your email to receive a verification code' : 'Tell us about your business'}
                    </p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div style={{
                    backgroundColor: '#fff5f5',
                    color: '#e53e3e',
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    borderBottom: '1px solid #fed7d7',
                    marginTop: '10px'
                }}>
                    {error}
                </div>
            )}

            {/* Sliding Container */}
            <div style={{
                display: 'flex',
                width: '200%',
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: step === 1 ? 'translateX(0)' : 'translateX(-50%)',
                alignItems: 'flex-start' // Align top
            }}>

                {/* --- SLIDE 1: Email & OTP --- */}
                <div style={{ width: '50%', padding: isModal ? '5px 0' : (isCorporate ? '15px 25px' : '30px'), boxSizing: 'border-box' }}>

                    {/* Email Field */}
                    <div style={{ marginBottom: '16px' }}>
                        {!isModal && <label style={labelStyle}>Email Address</label>}
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={isModal ? "Enter your work email" : "name@company.com"}
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={otpSent}
                                    style={{
                                        ...inputStyle,
                                        backgroundColor: otpSent ? '#f8fafc' : inputStyle.backgroundColor,
                                        paddingRight: otpSent ? '60px' : '16px'
                                    }}
                                />
                                {/* "Edit" button if OTP sent */}
                                {otpSent && (
                                    <button
                                        type="button"
                                        onClick={() => setOtpSent(false)}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#095289', // BRAND: Navy
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* OTP Field (Shown after OTP sent) */}
                    {otpSent && (
                        <div style={{ marginBottom: '16px' }}>
                            {!isModal && <label style={labelStyle}>Verification Code</label>}
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit code"
                                required
                                value={formData.otp}
                                onChange={handleChange}
                                maxLength="6"
                                style={inputStyle}
                            />
                            <div style={{
                                marginTop: '8px',
                                textAlign: 'right',
                                fontSize: '0.8rem'
                            }}>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#095289',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        textDecoration: 'underline',
                                        fontSize: '0.8rem',
                                        padding: 0
                                    }}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    {!otpSent ? (
                        <button
                            onClick={handleSendOtp}
                            style={btnStyle}
                        >
                            {loading ? 'Sending...' : 'Get Started'}
                        </button>
                    ) : (
                        <button
                            onClick={handleVerifyOtp}
                            disabled={!formData.otp || loading}
                            style={{
                                ...btnStyle,
                                opacity: (!formData.otp || loading) ? 0.5 : 1
                            }}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    )}
                </div>

            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AgentRegistrationForm;
