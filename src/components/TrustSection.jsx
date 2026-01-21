import React from 'react';

const TrustSection = () => {
    const features = [
        {
            title: "10+ Years",
            subtitle: "Industry Experience",
            icon: "fa-certificate"
        },
        {
            title: "99.8%",
            subtitle: "Approval Success",
            icon: "fa-check-double"
        },
        {
            title: "Global",
            subtitle: "Partner Network",
            icon: "fa-globe-americas"
        },
        {
            title: "Secure",
            subtitle: "Data Processing",
            icon: "fa-lock"
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Why Fly With SVS</span>
                    <h2>The Trusted Choice for Global Travel</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                        We combine decades of expertise with cutting-edge technology to deliver seamless travel solutions.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px'
                }}>
                    {features.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            padding: '24px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '4px',
                            borderLeft: '4px solid var(--color-accent)'
                        }}>
                            <div style={{
                                fontSize: '2rem',
                                color: 'var(--color-primary)',
                                opacity: 0.8
                            }}>
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: 'var(--color-primary)',
                                    lineHeight: '1.1'
                                }}>
                                    {item.title}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginTop: '5px'
                                }}>
                                    {item.subtitle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
