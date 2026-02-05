import React from 'react';
import AgentRegistrationForm from './AgentRegistrationForm';

const RegistrationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '90%',
                maxWidth: '900px',
                display: 'flex',
                alignItems: 'stretch', // Keep both columns same height for visual consistency
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
                position: 'relative',
                maxHeight: '90vh'
            }} onClick={e => e.stopPropagation()}>

                {/* --- Left Column: Travel Package Visual --- */}
                <div style={{
                    flex: '1',
                    backgroundColor: '#095289',
                    color: 'white',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                }}>

                    {/* Top Section */}
                    <div>
                        {/* Location Tag */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                            <span style={{ color: '#ef922b' }}><i className="fas fa-map-marker-alt"></i></span>
                            <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '1px' }}>THAILAND</span>
                        </div>

                        {/* Title */}
                        <h1 style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '1px', color: 'white' }}>
                            Bangkok-Pattaya
                        </h1>
                        <h1 style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '6px', color: '#ef922b' }}>
                            Backpacking
                        </h1>

                        {/* Chips */}
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '3px', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <i className="far fa-calendar-alt"></i> 5D4N
                            </span>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '3px', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <i className="far fa-star"></i> Top Rated
                            </span>
                        </div>

                        {/* Includes & Highlights - Reduced to 3 items each */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <div>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: '700', marginBottom: '2px', color: 'white' }}>Includes</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.55rem', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                    <li style={{ display: 'flex', gap: '3px' }}><span style={{ color: '#ef922b' }}>✔</span> 3N Pattaya 1N Bangkok</li>
                                    <li style={{ display: 'flex', gap: '3px' }}><span style={{ color: '#ef922b' }}>✔</span> Meals & Transfers</li>
                                    <li style={{ display: 'flex', gap: '3px' }}><span style={{ color: '#ef922b' }}>✔</span> Tours & Activities</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: '700', marginBottom: '2px', color: 'white' }}>Highlights</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.55rem', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                    <li style={{ display: 'flex', gap: '3px' }}><span style={{ color: '#ef922b' }}>✔</span> Nong Nooch Village</li>
                                    <li style={{ display: 'flex', gap: '3px' }}><span style={{ color: '#ef922b' }}>✔</span> Yacht Party</li>
                                    <li style={{ display: 'flex', gap: '3px' }}><span style={{ color: '#ef922b' }}>✔</span> Bangkok Nightlife</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Price Section */}
                    <div style={{ marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px' }}>
                        <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0' }}>Starting From</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white' }}>$299</span>
                            <span style={{ color: '#ef922b', fontSize: '0.8rem' }}>*</span>
                        </div>
                        <p style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>*Per person. T&C Apply.</p>
                    </div>
                </div>

                {/* --- Right Column: Content/Form --- */}
                <div style={{
                    flex: '1.1',
                    padding: '15px 25px',
                    position: 'relative',
                    background: 'radial-gradient(circle at 50% 30%, #f0f4ff 0%, #ffffff 70%)',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch'
                }}>
                    {/* Ripple Animation Styles */}
                    <style>
                        {`
                        @keyframes ripple-effect {
                            0% { transform: scale(0.8); opacity: 0.5; }
                            100% { transform: scale(1.5); opacity: 0; }
                        }
                        .ripple {
                            position: absolute;
                            border-radius: 50%;
                            background: rgba(8, 81, 137, 0.05); /* BRAND: Navy Ripple */
                            animation: ripple-effect 3s infinite linear;
                            z-index: 0;
                        }
                        `}
                    </style>

                    {/* Ripples behind Logo */}
                    <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', pointerEvents: 'none' }}>
                        <div className="ripple" style={{ width: '100%', height: '100%', animationDelay: '0s' }}></div>
                        <div className="ripple" style={{ width: '100%', height: '100%', animationDelay: '1s' }}></div>
                        <div className="ripple" style={{ width: '100%', height: '100%', animationDelay: '2s' }}></div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '15px',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            lineHeight: 1,
                            zIndex: 10
                        }}
                    >
                        ×
                    </button>

                    {/* Header Copy */}
                    <h3 style={{
                        fontSize: '1rem',
                        color: '#095289',
                        fontWeight: '700',
                        marginBottom: '8px', // Reduced from 10px
                        lineHeight: '1.3',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        Trusted B2B Travel Partner for Agents & Corporates.
                    </h3>

                    {/* Features List */}
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '15px', position: 'relative', zIndex: 2 }}> {/* Reduced from 15px */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#444' }}>
                            <span style={{ fontSize: '1rem', color: '#ef922b' }}>✔</span> GST Invoicing
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#444' }}>
                            <span style={{ fontSize: '1rem', color: '#ef922b' }}>✔</span> Easy Cancellation
                        </div>
                    </div>

                    {/* Form Header */}
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666', marginBottom: '6px', textTransform: 'uppercase', textAlign: 'center' }}> {/* Reduced from 8px */}
                        Login / Sign Up
                    </div>

                    {/* The Form Component (rendering compact mode) */}
                    <div style={{ position: 'relative', zIndex: 5 }}>
                        <AgentRegistrationForm customStyle="modal-compact" hideTitle={true} />
                    </div>



                    {/* Footer Legal */}
                    <div style={{ marginTop: '12px', fontSize: '0.6rem', color: '#aaa', textAlign: 'center' }}> {/* Reduced from 20px */}
                        By proceeding, you agree to <a href="#" style={{ color: '#d93b3b', textDecoration: 'none' }}>Terms</a> & <a href="#" style={{ color: '#d93b3b', textDecoration: 'none' }}>Privacy Policy</a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
