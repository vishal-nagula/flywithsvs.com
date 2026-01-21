import React from 'react';

const ProcessSection = () => {
    const steps = [
        {
            num: "01",
            title: "Choose Service",
            desc: "Select your destination and preferred visa type based on your travel purpose."
        },
        {
            num: "02",
            title: "Submit Documents",
            desc: "Upload the required documents securely through our encrypted portal."
        },
        {
            num: "03",
            title: "Expert Verification",
            desc: "Our visa specialists review your application to ensure 100% compliance."
        },
        {
            num: "04",
            title: "Approval & Delivery",
            desc: "Receive your approved visa directly in your email and dashboard."
        }
    ];

    return (
        <section className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">How It Works</span>
                    <h2>Simple, Secure Process</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                        We've streamlined the visa application process to save you time and eliminate stress.
                    </p>
                </div>

                <div style={{
                    position: 'relative',
                    padding: '40px 0'
                }}>
                    {/* Connection Line (Desktop) */}
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        left: '10%',
                        width: '80%',
                        height: '2px',
                        backgroundColor: '#e5e7eb',
                        zIndex: 0,
                        display: 'none',
                    }} className="process-line"></div>
                    <style>{`
                        @media (min-width: 992px) {
                            .process-line { display: block !important; }
                        }
                    `}</style>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '40px',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 24px',
                                    backgroundColor: 'white',
                                    border: '2px solid var(--color-border)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: 'var(--color-primary)',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                }}>
                                    {step.num}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{step.title}</h3>
                                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
