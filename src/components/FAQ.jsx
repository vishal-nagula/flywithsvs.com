
import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const faqItems = [
        {
            question: "Is a dummy ticket valid for travel?",
            answer: "No. A dummy ticket is a flight reservation used solely for visa application documentation. It looks real and holds a valid PNR but is not a confirmed ticket for flying. Do not attempt to travel with it."
        },
        {
            question: "Do you guarantee visa approval?",
            answer: "Visa approval is at the sole discretion of the respective embassy or consulate. We provide expert guidance, document verification, and submission services to maximize your chances, but we cannot guarantee an outcome."
        },
        {
            question: "How fast can I receive my documents?",
            answer: "For digital services like dummy tickets and hotel vouchers, delivery is typically within 1-2 hours during business hours. Verification services may take longer depending on complexity."
        },
        {
            question: "Can I verify the flight PNR?",
            answer: "Yes. All our flight reservations come with a valid 6-digit PNR that can be verified on the airline's official website under 'Manage Booking'."
        }
    ];

    return (
        <section className="aws-section">
            <div className="container">
                <div className="aws-header-group">
                    <h2 className="aws-h2">Frequently Asked Questions</h2>
                    <p className="aws-sub">Common questions about our visa and ticketing services.</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {faqItems.map((item, index) => (
                        <div className="aws-accordion-item" key={index}>
                            <button className="aws-accordion-btn" onClick={() => toggleAccordion(index)}>
                                {item.question}
                                <i className={`fas ${activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.9rem', color: '#545b64' }}></i>
                            </button>
                            {activeIndex === index && (
                                <div className="aws-accordion-content">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <p className="aws-sub" style={{ fontSize: '1rem' }}>Have more questions?</p>
                    <a href="#" className="aws-link">Visit our Support Center <i className="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
