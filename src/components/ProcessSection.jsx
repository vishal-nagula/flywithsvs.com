import React from 'react';

const ProcessSection = () => {
    const steps = [
        {
            icon: "fas fa-laptop-house", // Login/Portal
            title: "Login to the Portal",
            desc: ""
        },
        {
            icon: "fas fa-file-invoice", // Fill Application
            title: "Fill the Application",
            desc: ""
        },
        {
            icon: "fas fa-paper-plane", // Submit
            title: "Submit the Application",
            desc: ""
        }
    ];

    return (
        <section className="section" style={{ backgroundColor: 'white', padding: '80px 0' }}>
            <div className="container">
                <div className="section-header text-center" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '500', color: '#1a1a1a' }}>
                        Step to Submit the <span style={{ color: '#ef922b', fontWeight: '700' }}>Visa!</span> {/* BRAND: Orange */}
                    </h2>
                </div>

                <div style={{
                    position: 'relative',
                    padding: '20px 0'
                }}>
                    {/* Dashed Connector Line (Visible on Desktop) */}
                    <div className="connector-line" style={{
                        position: 'absolute',
                        top: '40%',
                        left: '15%',
                        width: '70%',
                        height: '100px',
                        zIndex: 0,
                        pointerEvents: 'none',
                        display: 'none', // Hidden on mobile
                    }}>
                        {/* SVG for curved dashed line */}
                        <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="none">
                            <path d="M0,50 Q200,80 400,50 T800,50" fill="none" stroke="#ccc" strokeWidth="2" strokeDasharray="10,10" />
                        </svg>
                    </div>
                    <style>{`
                        @media (min-width: 992px) {
                            .connector-line { display: block !important; }
                        }
                    `}</style>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)', // Force 3 columns on desktop
                        gap: '30px',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                {/* Icon Circle with Image feel */}
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    marginBottom: '20px',
                                    backgroundColor: 'white', // White bg
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    {/* Using FontAwesome with a large size and color/bg blob to simulate illustration */}
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(0, 53, 128, 0.05) 0%, rgba(255,255,255,0) 70%)', // BRAND: Navy Tint
                                        zIndex: -1
                                    }}></div>
                                    <i className={step.icon} style={{ fontSize: '4rem', color: '#095289' }}></i> {/* BRAND: Navy */}
                                </div>

                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    color: '#095289', // BRAND: Navy
                                    maxWidth: '180px',
                                    lineHeight: '1.4'
                                }}>
                                    {step.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
