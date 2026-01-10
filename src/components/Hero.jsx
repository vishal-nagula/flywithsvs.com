
import React, { useState } from 'react';
import { api } from '../services/api';

const Hero = () => {
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

    return (
        <section className="hero-section">
            <div className="overlay"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1>Explore the World <br /> With Confidence</h1>
                    <p className="hero-sub">Your Trusted Partner for Visas, Flights, and Travel Planning.</p>
                    <div className="hero-cta-buttons" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                        <a href="/apply-visa" className="btn btn-primary" style={{ minWidth: '160px' }}>Apply for Visa</a>
                        <a href="/b2b-register" className="btn btn-outline" style={{ minWidth: '160px', borderColor: '#fff' }}>Become an Agent</a>
                    </div>
                    <div className="whatsapp-float">
                        <i className="fab fa-whatsapp"></i>
                    </div>
                </div>
                <div className="hero-form">
                    <div className="form-box">
                        <h2>Become an Agent</h2>

                        {step < 4 && <p style={{ textAlign: 'center', marginBottom: '15px', color: '#666', fontSize: '0.9rem' }}>Join our B2B network.</p>}

                        {error && (
                            <div style={{
                                backgroundColor: '#fff5f5',
                                border: '1px solid #dba6a6',
                                color: '#d13212',
                                padding: '8px',
                                fontSize: '0.8rem',
                                marginBottom: '10px',
                                borderRadius: '4px'
                            }}>
                                {error}
                            </div>
                        )}

                        {step === 1 && (
                            <form onSubmit={handleStep1Submit}>
                                <div className="form-group">
                                    <input type="text" name="companyName" placeholder="Agency Name" required value={initData.companyName} onChange={handleInitChange} />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <input type="text" name="contactPersonFirstName" placeholder="First Name" required value={initData.contactPersonFirstName} onChange={handleInitChange} />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <input type="text" name="contactPersonLastName" placeholder="Last Name" required value={initData.contactPersonLastName} onChange={handleInitChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" placeholder="Email Address" required value={initData.email} onChange={handleInitChange} />
                                </div>
                                <div className="form-group">
                                    <input type="tel" name="phone" placeholder="Mobile Number" required minLength="10" maxLength="15" value={initData.phone} onChange={handleInitChange} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'Processing...' : 'Register Now'}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleStep2Submit}>
                                <p style={{ fontSize: '0.9rem', color: '#545b64', marginBottom: '15px', textAlign: 'center' }}>
                                    Enter OTP sent to your email.
                                </p>
                                <div className="form-group">
                                    <input type="text" name="otp" placeholder="Enter 6-digit OTP" required maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} style={{ textAlign: 'center', letterSpacing: '2px' }} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                    <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#095289', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}>
                                        Edit Details
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handleStep3Submit}>
                                <div className="form-group">
                                    <textarea name="address" placeholder="Agency Address" required value={completeData.address} onChange={handleCompleteChange} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '60px' }} />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="website" placeholder="Website (Optional)" value={completeData.website} onChange={handleCompleteChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={completeData.gstNumber} onChange={handleCompleteChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="panNumber" placeholder="PAN Number (Optional)" value={completeData.panNumber} onChange={handleCompleteChange} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Complete Registration'}
                                </button>
                            </form>
                        )}

                        {step === 4 && (
                            <div style={{ textAlign: 'center', padding: '10px 0' }}>
                                <div style={{ fontSize: '3rem', color: '#28a745', marginBottom: '10px' }}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Registration Pending</h3>
                                <p style={{ fontSize: '0.9rem', color: '#545b64' }}>
                                    Your account is under review. You will receive an email upon approval.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
