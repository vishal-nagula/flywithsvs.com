
import React from 'react';

const Testimonials = () => {
    return (
        <section className="aws-section alt-bg">
            <div className="container">
                <div className="aws-header-group">
                    <h2 className="aws-h2">Customer Success Stories</h2>
                    <p className="aws-sub">See how SVS helps travelers and agents achieve their goals.</p>
                </div>
                <div className="aws-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                    <div className="aws-quote-card">
                        <div style={{ fontSize: '1.5rem', color: '#f09125', marginBottom: '15px' }}>★★★★★</div>
                        <p className="aws-quote-text">"The dummy ticket service saved my visa application. The PNR was valid and verified by the embassy without any issues. Highly recommended for visa applicants."</p>
                        <p className="aws-quote-author">Sarah Jenkins, <span style={{ fontWeight: '400' }}>Individual Traveler</span></p>
                    </div>

                    <div className="aws-quote-card">
                        <div style={{ fontSize: '1.5rem', color: '#f09125', marginBottom: '15px' }}>★★★★★</div>
                        <p className="aws-quote-text">"As a travel agent, the B2B portal has streamlined my workflow. I can generate flight reservations and hotel vouchers for my clients instantly. The white-label support is fantastic."</p>
                        <p className="aws-quote-author">Rajesh Patel, <span style={{ fontWeight: '400' }}>Travel Agency Owner</span></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
