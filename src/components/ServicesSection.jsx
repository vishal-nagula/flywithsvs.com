import React from 'react';

const ServicesSection = () => {
    const services = [
        {
            icon: "fa-headset",
            title: "Dedicated Support",
            desc: "WhatsApp No +91 84228 90090 and Contact Center No. +91 79695 14000"
        },
        {
            icon: "fa-users", // or fa-network-wired
            title: "Best Network",
            desc: "Get Support from 50 + branches in India"
        },
        {
            icon: "fa-handshake",
            title: "Transparent Pricing",
            desc: "Get the detailed cost breakdown, from Visa Fees to VFS, GST & Service charges."
        }
    ];

    return (
        <section style={{ backgroundColor: 'white', padding: '80px 0' }}>
            <div className="container">
                <div className="section-header" style={{ marginBottom: '50px' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '600',
                        color: '#095289', // BRAND: Navy
                        marginBottom: '16px'
                    }}>
                        What will You <span style={{ color: '#ef922b', fontWeight: '700' }}>Find Here?</span> {/* BRAND: Yellow */}
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                    justifyContent: 'center'
                }}>
                    {services.map((service, index) => (
                        <div key={index} className="card" style={{
                            backgroundColor: 'white',
                            padding: '40px 30px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            border: '1px solid #eef2f6',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            transition: 'transform 0.3s ease'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                color: '#095289', // BRAND: Navy
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '2.5rem',
                                marginBottom: '20px'
                            }}>
                                <i className={`fas ${service.icon}`}></i>
                            </div>

                            {/* Decorative Line */}
                            <div style={{ width: '40px', height: '3px', backgroundColor: '#333', marginBottom: '20px' }}></div>

                            <h3 style={{
                                fontSize: '1.4rem',
                                marginBottom: '16px',
                                color: '#333',
                                fontWeight: '700'
                            }}>
                                {service.title}
                            </h3>
                            <p style={{
                                color: '#666',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection; // Ensure default export is present
