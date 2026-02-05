import React from 'react';

const BusinessFeaturesSection = () => {
    // Content data customized for SVS Holidays
    const features = [
        "Register in less than 5 minutes and start booking – your dedicated corporate travel partner",
        "Zero setup cost, no IT support needed, and no complex ongoing contracts",
        "Book flights, hotels, and visas in a single platform – say goodbye to multiple tabs",
        "Empower employees to book their own trips while maintaining full admin control",
        "The more you book, the more exclusive corporate rates and recommendations you unlock",
        "Save time with centralized traveler profiles, saved destinations, and automated GST invoicing"
    ];

    // Image path
    const imagePath = "/Users/laxmikeerthana/.gemini/antigravity/brain/d63e474b-9e4b-4d4f-86e7-95c85bcb4244/business_travelers_queue_1770185121798.png";

    return (
        <section className="section" style={{ backgroundColor: '#fff', padding: '80px 0' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '60px',
                    flexWrap: 'wrap'
                }}>
                    {/* Left Column: Image */}
                    <div style={{ flex: '1', minWidth: '350px' }}>
                        <div style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            height: '500px', // Fixed height for vertical aspect ratio
                            position: 'relative'
                        }}>
                            <img
                                src={imagePath}
                                alt="Business travelers at airport"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div style={{ flex: '1', minWidth: '350px' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: '#095289', // BRAND: Navy
                            marginBottom: '20px',
                            lineHeight: '1.2'
                        }}>
                            Faster, easier business travel management – all in one place
                        </h2>

                        <p style={{
                            fontSize: '1rem',
                            color: '#1e293b', // Dark Slate
                            marginBottom: '30px',
                            lineHeight: '1.6',
                            fontWeight: '500'
                        }}>
                            SVS Holidays for Corporates helps speed up the work trip booking and management process so everyone can get back to focusing on the task at hand.
                        </p>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
                            {features.map((item, index) => (
                                <li key={index} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    marginBottom: '20px',
                                    fontSize: '0.95rem',
                                    color: '#1a1a1a',
                                    lineHeight: '1.5'
                                }}>
                                    <div style={{
                                        minWidth: '24px',
                                        height: '24px',
                                        color: '#ef922b', // BRAND: Yellow Checkmarks
                                        marginRight: '12px',
                                        marginTop: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fas fa-check-circle" style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="btn btn-primary" style={{
                            backgroundColor: '#ef922b', // BRAND: Orange Button
                            border: 'none',
                            padding: '12px 24px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            borderRadius: '4px'
                        }}>
                            More travel management solutions
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessFeaturesSection;
