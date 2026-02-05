import React from 'react';

const TrustSection = () => {
    // Placeholder logos for enterprise feel
    const companies = [
        "TechNova", "GlobalCorp", "AeroSystems", "FinEdge", "HealthPlus", "LogiChain"
    ];

    return (
        <section className="section" style={{ padding: '60px 0', borderBottom: '1px solid #e2e8f0' }}>
            <div className="container">


                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '60px',
                    alignItems: 'center',
                    opacity: 0.6
                }}>
                    {companies.map((company, index) => (
                        <div key={index} style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: '#095289', // BRAND: Navy
                            fontFamily: 'var(--font-heading)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <i className="fas fa-layer-group" style={{ fontSize: '1.2rem' }}></i> {company}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
