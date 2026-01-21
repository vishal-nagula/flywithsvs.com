import React, { useState } from 'react';
import { api } from '../services/api';

const AgentRegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [refId, setRefId] = useState(null);

    // Step 1 Data
    const [initData, setInitData] = useState({
        companyName: '',
        contactPersonFirstName: '',
        contactPersonLastName: '',
        email: '',
        phone: ''
    });

    // Step 2 Data
    const [otp, setOtp] = useState('');

    // Step 3 Data
    const [completeData, setCompleteData] = useState({
        address: '',
        country: '',
        website: '',
        gstNumber: '',
        panNumber: ''
    });

    const handleInitChange = (e) => {
        setInitData({ ...initData, [e.target.name]: e.target.value });
    };

    const handleCompleteChange = (e) => {
        setCompleteData({ ...completeData, [e.target.name]: e.target.value });
    };

    const handleStep1Submit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.agentInitiate(initData);
            setRefId(response.refId);
            setStep(2);
        } catch (err) {
            setError(err.message || 'Failed to initiate registration');
        } finally {
            setLoading(false);
        }
    };

    const handleStep2Submit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.agentVerifyOtp({ refId, otp });
            setStep(3);
        } catch (err) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleStep3Submit = async (e) => {
        e.preventDefault();
        setError('');

        if (!completeData.country) {
            setError('Please select a country');
            return;
        }

        setLoading(true);
        try {
            await api.agentComplete({ refId, ...completeData });
            setStep(4); // Success
        } catch (err) {
            setError(err.message || 'Failed to complete registration');
        } finally {
            setLoading(false);
        }
    };

    /* Brand Colors (Enforced) */
    const primaryColor = '#031d31'; // Navy
    const accentColor = '#f09125'; // Orange
    const borderColor = '#e5e7eb'; // Light Grey for inputs

    const inputStyle = {
        width: '100%',
        padding: '12px 14px',
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        fontSize: '0.95rem',
        color: primaryColor,
        outline: 'none',
        transition: 'border-color 0.2s',
        marginBottom: '0',
        backgroundColor: 'white'
    };

    const btnStyle = {
        width: '100%',
        padding: '14px',
        backgroundColor: primaryColor,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.8 : 1
    };

    // Static list of major countries for reliability
    const countryList = [
        "United States", "India", "United Kingdom", "Canada", "Australia",
        "United Arab Emirates", "Saudi Arabia", "Singapore", "Germany", "France",
        "Malaysia", "Thailand", "Kuwait", "Qatar", "Oman", "Bahrain"
    ].sort();

    return (
        <div style={{ backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header Content inside Form */}
            {step < 4 && (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{
                        color: primaryColor,
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        opacity: 0.9
                    }}>
                        Join our B2B network.
                    </p>
                </div>
            )}

            {error && (
                <div style={{
                    backgroundColor: '#fff5f5',
                    border: '1px solid #fc8181', // Soft Red (Standard for error) but close to warm tones
                    color: '#c53030',
                    padding: '10px',
                    fontSize: '0.85rem',
                    marginBottom: '15px',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            <div style={{ flex: 1 }}>
                {step === 1 && (
                    <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Agency Name"
                                required
                                value={initData.companyName}
                                onChange={handleInitChange}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    name="contactPersonFirstName"
                                    placeholder="First Name"
                                    required
                                    value={initData.contactPersonFirstName}
                                    onChange={handleInitChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    name="contactPersonLastName"
                                    placeholder="Last Name"
                                    required
                                    value={initData.contactPersonLastName}
                                    onChange={handleInitChange}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                value={initData.email}
                                onChange={handleInitChange}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Mobile Number"
                                required
                                minLength="10"
                                maxLength="15"
                                value={initData.phone}
                                onChange={handleInitChange}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <button
                                type="submit"
                                style={btnStyle}
                                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = accentColor)}
                                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = primaryColor)}
                            >
                                {loading ? 'Processing...' : 'Register Now'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleStep2Submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#4a5568', textAlign: 'center' }}>
                            Enter the OTP sent to your email.
                        </p>
                        <div>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit OTP"
                                required
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{
                                    ...inputStyle,
                                    textAlign: 'center',
                                    letterSpacing: '3px',
                                    fontSize: '1.2rem',
                                    padding: '16px'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={btnStyle}
                            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = accentColor)}
                            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = primaryColor)}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: primaryColor, textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }}>
                                Edit Details
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleStep3Submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {/* Country Selection First */}
                        <div>
                            <select
                                name="country"
                                value={completeData.country}
                                onChange={handleCompleteChange}
                                style={{ ...inputStyle, cursor: 'pointer', color: completeData.country ? primaryColor : '#7d8998' }}
                                required
                            >
                                <option value="" disabled>Select Country</option>
                                {countryList.map(country => (
                                    <option key={country} value={country} style={{ color: primaryColor }}>{country}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <textarea
                                name="address"
                                placeholder="Agency Address"
                                required
                                value={completeData.address}
                                onChange={handleCompleteChange}
                                style={{ ...inputStyle, minHeight: '80px', fontFamily: 'inherit' }}
                            />
                        </div>
                        <div>
                            <input type="text" name="website" placeholder="Website (Optional)" value={completeData.website} onChange={handleCompleteChange} style={inputStyle} />
                        </div>
                        <div>
                            <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={completeData.gstNumber} onChange={handleCompleteChange} style={inputStyle} />
                        </div>
                        <div>
                            <input type="text" name="panNumber" placeholder="PAN Number (Optional)" value={completeData.panNumber} onChange={handleCompleteChange} style={inputStyle} />
                        </div>
                        <button
                            type="submit"
                            style={btnStyle}
                            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = accentColor)}
                            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = primaryColor)}
                        >
                            {loading ? 'Submitting...' : 'Complete Registration'}
                        </button>
                    </form>
                )}

                {step === 4 && (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: '3rem', color: primaryColor, marginBottom: '15px' }}>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: primaryColor }}>Registration Pending</h3>
                        <p style={{ fontSize: '0.95rem', color: '#4a5568' }}>
                            Your account is under review. You will receive an email upon approval.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentRegistrationForm;
