import React from 'react';

const ServicesSection = () => {
    const services = [
        {
            icon: "fa-passport",
            title: "Visa Services",
            desc: "End-to-end processing for Tourist, Business, and Student visas with high success rates."
        },
        {
            icon: "fa-plane-departure",
            title: "Flight Bookings",
            desc: "Exclusive B2B rates and seamless ticketing for domestic and international travel."
        },
        {
            icon: "fa-umbrella-beach",
            title: "Holiday Packages",
            desc: "Curated global experiences and customized itineraries for every traveler."
        },
        {
            icon: "fa-briefcase",
            title: "Corporate Travel",
            desc: "Dedicated travel management solutions for businesses and professional teams."
        },
        {
            icon: "fa-file-invoice-dollar",
            title: "Documentation",
            desc: "Expert assistance with travel insurance, hotel proof, and itinerary planning."
        }
    ];

    return (
        <section className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Our Expertise</span>
                    <h2>Comprehensive Travel Solutions</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        We provide enterprise-grade travel infrastructure for individuals and businesses.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px',
                    justifyContent: 'center'
                }}>
                    {services.map((service, index) => (
                        <div key={index} className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            borderTop: '4px solid transparent',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderTopColor = 'var(--color-accent)';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderTopColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: 'rgba(3, 29, 49, 0.05)',
                                color: 'var(--color-primary)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.75rem',
                                marginBottom: '24px'
                            }}>
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{service.title}</h3>
                            <p className="text-muted">{service.desc}</p>
                            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                                <a href="#" style={{
                                    color: 'var(--color-accent)',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    Learn More <i className="fas fa-arrow-right" style={{ marginLeft: '8px', fontSize: '0.8rem' }}></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
