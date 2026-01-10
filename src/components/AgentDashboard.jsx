import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisaRequirements from './visa/VisaRequirements';
import FlightBookingForm from './booking/FlightBookingForm';

import SubscriptionManager from './subscription/SubscriptionManager';
import { api } from '../services/api';

const AgentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Partner', id: '', role: '' });

    // Initialize activeView from storage or default to DASHBOARD
    const [activeView, setActiveView] = useState(() => {
        return sessionStorage.getItem('agent_active_view') || 'DASHBOARD';
    });
    const [solutions, setSolutions] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loadingSolutions, setLoadingSolutions] = useState(false);

    const [showUserMenu, setShowUserMenu] = useState(false);

    // Close dropdown when clicking outside (simple implementation)
    useEffect(() => {
        const closeMenu = () => setShowUserMenu(false);
        if (showUserMenu) {
            document.addEventListener('click', closeMenu);
        }
        return () => document.removeEventListener('click', closeMenu);
    }, [showUserMenu]);

    const toggleUserMenu = (e) => {
        e.stopPropagation(); // Prevent immediate close
        setShowUserMenu(!showUserMenu);
    };

    const [isVerifying, setIsVerifying] = useState(true);

    // Persist activeView whenever it changes
    useEffect(() => {
        sessionStorage.setItem('agent_active_view', activeView);
    }, [activeView]);

    useEffect(() => {
        const checkAuth = async () => {
            // Check for auth token locally first
            const token = localStorage.getItem('auth_token');
            const userData = localStorage.getItem('user_details');

            if (!token || !userData) {
                navigate('/'); // Return to landing on missing creds
                return;
            }

            // 1. Verify Session (Non-blocking for demo resilience)
            try {
                await api.verifySession();
            } catch (err) {
                console.warn("Session verification failed, continuing with local data", err);
            }

            // Always set user from local storage if available (source of truth for UI)
            if (userData) {
                setUser(JSON.parse(userData));
            }

            // 2. Fetch Data (Solutions & Subscriptions)
            setLoadingSolutions(true);
            let allSolutions = [];
            let userSubs = [];

            try {
                [allSolutions, userSubs] = await Promise.all([
                    api.getAllSolutions(),
                    api.getAgentSubscriptions()
                ]);
            } catch (e) {
                console.warn("API fetch failed, using fallback", e);
            }

            // Fallback Mock Data for Demo if API fails or returns empty/invalid
            if (!Array.isArray(allSolutions) || allSolutions.length === 0) {
                console.warn("Solutions data missing or invalid, using mock data", allSolutions);
                allSolutions = [
                    { id: 2, name: 'Visa Services', code: 'VISA_REQUIREMENTS', description: 'check requirements and apply for visas' }
                ];
            } else {
                // Feature Flag: Restrict to Visa Services ONLY for now
                allSolutions = allSolutions.filter(s => s.code === 'VISA_REQUIREMENTS');
                if (allSolutions.length === 0) {
                    // If API didn't return Visa, force add it for this requirement
                    allSolutions = [{ id: 2, name: 'Visa Services', code: 'VISA_REQUIREMENTS', description: 'check requirements and apply for visas' }];
                }
            }

            // Ensure subscriptions is also an array
            if (!Array.isArray(userSubs)) {
                userSubs = [];
            }

            setSolutions(allSolutions);
            setSubscriptions(userSubs || []);

            // Final Cleanup
            setLoadingSolutions(false);
            setIsVerifying(false);
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_details');
        navigate('/b2b-login');
    };

    if (isVerifying) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#095289' }}></i>
                <div style={{ color: '#545b64' }}>Verifying session...</div>
            </div>
        );
    }

    if (!user) return null;

    // Mapping code to icons and actions
    const getSolutionMeta = (code) => {
        const meta = {
            'TICKETING': { icon: 'fa-plane', action: () => setActiveView('FLIGHT_BOOKING') },
            'DUMMY_TICKET': { icon: 'fa-ticket-alt', action: () => console.log('Dummy Ticket') },
            'VISA_APPLY': { icon: 'fa-passport', action: () => console.log('Visa Apply') },
            'VISA_REQUIREMENTS': { icon: 'fa-info-circle', action: () => setActiveView('VISA_REQUIREMENTS') },
            'HOTEL_BOOKING': { icon: 'fa-hotel', action: () => console.log('Hotel') }
        };
        return meta[code] || { icon: 'fa-cube', action: () => console.log(code) };
    };




    return (
        <div className="dashboard-layout">
            {/* 1. Global Navigation Bar (Premium Style) */}
            <header className="global-nav">
                <div className="nav-left">
                    <div className="nav-logo">
                        <img src="/src/assets/logo.png" alt="SVS" />
                        <span>Console</span>
                    </div>
                </div>

                {/* Unified Search Bar */}
                <div className="nav-search-wrapper">
                    <div className="nav-search-input-box">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Search services, features..."
                        />
                        <div className="search-shortcut">/</div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="nav-actions">
                    <div className="nav-icon-btn">
                        <i className="fas fa-bell"></i>
                    </div>
                    <div className="nav-icon-btn">
                        <i className="fas fa-question-circle"></i>
                    </div>

                    <div className="nav-separator"></div>

                    <div style={{ position: 'relative' }}>
                        <div className={`user-menu-pill ${showUserMenu ? 'active' : ''}`} onClick={toggleUserMenu} title="User Menu">
                            <div className="user-avatar">
                                {(user.firstName || 'P').charAt(0)}
                            </div>
                            <span className="user-name">{user.firstName || 'Partner'}</span>
                            <i className={`fas fa-chevron-down ${showUserMenu ? 'rotate-180' : ''}`} style={{ fontSize: '0.7rem', opacity: 0.7, transition: 'transform 0.2s' }}></i>
                        </div>

                        {showUserMenu && (
                            <div className="user-dropdown">
                                <div className="dropdown-header-item">
                                    <div className="display-name">{user.firstName || 'Partner'}</div>
                                    <div className="display-email">{user.email || 'partner@svs.com'}</div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item">
                                    <i className="fas fa-user-cog"></i> Account Settings
                                </div>
                                <div className="dropdown-item" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Sign Out
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 2. Main Workspace (Sidebar + Content) */}
            <div className="workspace">

                {/* Sidebar Navigation */}
                <aside className="aws-sidebar">
                    <div className="sidebar-section">
                        <div className="sidebar-header">Service Catalog</div>

                        <div style={{ marginBottom: '10px' }}>
                            <div className="nav-group-title">Home</div>
                            <div
                                onClick={() => setActiveView('DASHBOARD')}
                                className={`nav-item ${activeView === 'DASHBOARD' ? 'active' : ''}`}
                            >
                                <i className="fas fa-home" style={{ width: '20px', textAlign: 'center' }}></i>
                                Dashboard
                            </div>
                        </div>

                        <div>
                            <div className="nav-group-title">Services</div>
                            {solutions.map((sol) => {
                                const meta = getSolutionMeta(sol.code);
                                return (
                                    <div
                                        key={sol.code}
                                        onClick={meta.action}
                                        className={`nav-item ${activeView === sol.code ? 'active' : ''}`}
                                    >
                                        <i className={`fas ${meta.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                                        {sol.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="aws-content">

                    {activeView === 'DASHBOARD' && (
                        <>
                            <div className="page-header">
                                <h1>Console Home</h1>
                                <p style={{ fontSize: '0.95rem', color: '#545b64' }}>Access your travel services and manage bookings.</p>
                            </div>

                            {/* Widgets Layout */}
                            <div className="widgets-grid">

                                {/* Left Column */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                    {/* Stats Widget */}
                                    <div className="aws-widget">
                                        <h3 className="widget-title">Quick Stats</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                                            <div className="stat-card-premium">
                                                <div className="stat-icon-wrapper blue">
                                                    <i className="fas fa-plane"></i>
                                                </div>
                                                <div className="stat-content">
                                                    <div className="stat-value">124</div>
                                                    <div className="stat-label">Total Bookings</div>
                                                </div>
                                            </div>
                                            <div className="stat-card-premium">
                                                <div className="stat-icon-wrapper orange">
                                                    <i className="fas fa-wallet"></i>
                                                </div>
                                                <div className="stat-content">
                                                    <div className="stat-value">$1,250</div>
                                                    <div className="stat-label">Wallet Balance</div>
                                                </div>
                                            </div>
                                            <div className="stat-card-premium">
                                                <div className="stat-icon-wrapper green">
                                                    <i className="fas fa-clock"></i>
                                                </div>
                                                <div className="stat-content">
                                                    <div className="stat-value">5</div>
                                                    <div className="stat-label">Pending Visas</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Services Widget */}
                                    <div className="aws-widget">
                                        <h3 className="widget-title">Available Services</h3>

                                        {loadingSolutions ? (
                                            <div style={{ padding: '20px', color: '#545b64' }}>Loading services...</div>
                                        ) : (
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' }}>
                                                {solutions.map(sol => {
                                                    const meta = getSolutionMeta(sol.code);
                                                    const sub = subscriptions.find(s => s.plan?.solution?.id === sol.id && s.status === 'ACTIVE');
                                                    const isSubscribed = !!sub;

                                                    return (
                                                        <div
                                                            key={sol.code}
                                                            className="service-card"
                                                            style={{ opacity: isSubscribed ? 1 : 1, borderColor: isSubscribed ? '#eaeded' : '#eaeded', cursor: isSubscribed ? 'pointer' : 'default' }}
                                                            onClick={isSubscribed ? meta.action : undefined}
                                                        >
                                                            <div className="aws-card-icon-small" style={{ backgroundColor: isSubscribed ? '#f0f7ff' : '#fff3ef', color: isSubscribed ? '#095289' : '#d13212' }}>
                                                                <i className={`fas ${meta.icon}`}></i>
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ color: '#16191f', fontWeight: 700, marginBottom: '4px', fontSize: '0.95rem' }}>{sol.name}</div>
                                                                {isSubscribed ? (
                                                                    <div style={{ fontSize: '0.8rem', color: '#037f0c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                        <i className="fas fa-check-circle" style={{ fontSize: '0.7rem' }}></i> Active
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        className="aws-btn-sm primary" // Assuming we can style this inline or add class
                                                                        style={{
                                                                            padding: '6px 12px',
                                                                            fontSize: '0.8rem',
                                                                            borderRadius: '20px',
                                                                            border: 'none',
                                                                            background: '#ec7211',
                                                                            color: 'white',
                                                                            cursor: 'pointer',
                                                                            fontWeight: 600,
                                                                            boxShadow: '0 2px 5px rgba(236, 114, 17, 0.3)'
                                                                        }}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setActiveView('SUBSCRIPTION');
                                                                        }}
                                                                    >
                                                                        Subscribe
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {isSubscribed && <i className="fas fa-arrow-right" style={{ color: '#d5dbdb', fontSize: '1rem' }}></i>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column (Welcome / Ads) */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="aws-widget">
                                        <h3 className="widget-title">Welcome to SVS Console</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#545b64', lineHeight: 1.5, marginBottom: '15px' }}>
                                            Manage all your travel documentation needs including flights, visas, and hotel vouchers from one place.
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <a href="#" className="aws-link">Read the Agent Guide <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem' }}></i></a>
                                            <a href="#" className="aws-link">Contact Support <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem' }}></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}

                    {activeView === 'FLIGHT_BOOKING' && (
                        <FlightBookingForm onCancel={() => setActiveView('DASHBOARD')} />
                    )}

                    {activeView === 'VISA_REQUIREMENTS' && (
                        <VisaRequirements onCancel={() => setActiveView('DASHBOARD')} />
                    )}

                    {activeView === 'SUBSCRIPTION' && (
                        <SubscriptionManager />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AgentDashboard;
