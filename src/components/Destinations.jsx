
import React from 'react';

const Destinations = () => {
    const destinations = [
        { name: "USA", img: "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?q=80&w=2070&auto=format&fit=crop" },
        { name: "UK", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop" },
        { name: "Canada", img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2011&auto=format&fit=crop" },
        { name: "Schengen Area", img: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=2020&auto=format&fit=crop" },
        { name: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop" },
        { name: "Singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop" },
        { name: "Australia", img: "https://images.unsplash.com/photo-1523482580638-016313f0b02c?q=80&w=2069&auto=format&fit=crop" },
        { name: "Thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop" }
    ];

    return (
        <section className="aws-section alt-bg">
            <div className="container">
                <div className="aws-header-group">
                    <h2 className="aws-h2">Global Access</h2>
                    <p className="aws-sub">We support visa applications and travel documentation for over 100+ countries. Explore our top key destinations.</p>
                </div>
                <div className="aws-card-grid">
                    {destinations.map((dest, index) => (
                        <div className="aws-dest-card" key={index}>
                            <img src={dest.img} alt={dest.name} className="aws-dest-img" />
                            <div className="aws-dest-content">
                                <h3 className="aws-card-title" style={{ marginBottom: '5px' }}>{dest.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Visa assistance available</p>
                                <a href="#" className="aws-link" style={{ marginTop: '10px' }}>View requirements <i className="fas fa-angle-right"></i></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
