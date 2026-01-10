import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Skeleton from '../common/Skeleton';

const SubscriptionManager = () => {
    const [loading, setLoading] = useState(true);
    const [activeSub, setActiveSub] = useState(null);
    const [solutions, setSolutions] = useState([]);
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [plans, setPlans] = useState([]);
    const [processing, setProcessing] = useState(null);

    // Initial Load
    useEffect(() => {
        loadData();
    }, []);

    // Load available plans when a solution is selected
    useEffect(() => {
        if (selectedSolution) {
            loadPlans(selectedSolution.id);
        }
    }, [selectedSolution]);

    const loadData = async () => {
        setLoading(true);
        try {
            // 1. Check current subscriptions
            let active = null;
            try {
                const subs = await api.getAgentSubscriptions();
                active = subs && subs.find(s => s.status === 'ACTIVE');
            } catch (e) {
                console.warn("Subs API failed", e);
            }

            if (active) {
                setActiveSub(active);
            } else {
                // 2. If no active sub, load solutions to let user pick
                let sols = [];
                try {
                    sols = await api.getAllSolutions();
                } catch (e) {
                    console.warn("Solutions API failed", e);
                }

                // Fallback Mock Solutions
                if (!sols || sols.length === 0) {
                    sols = [
                        { id: 2, name: 'Visa Services', code: 'VISA_REQUIREMENTS' }
                    ];
                } else {
                    // Restrict to Visa Services Only
                    sols = sols.filter(s => s.code === 'VISA_REQUIREMENTS');
                    if (sols.length === 0) {
                        sols = [{ id: 2, name: 'Visa Services', code: 'VISA_REQUIREMENTS' }];
                    }
                }

                setSolutions(sols);
                if (sols.length > 0) setSelectedSolution(sols[0]);
            }
        } catch (error) {
            console.error("Failed to load subscription data", error);
        } finally {
            setLoading(false);
        }
    };

    const loadPlans = async (solutionId) => {
        try {
            let data = [];
            try {
                data = await api.getSolutionPlans(solutionId);
            } catch (e) { console.warn("Plan API failed", e); }

            // Fallback Mock Plans
            if (!data || data.length === 0) {
                data = [
                    { id: 101, name: 'Basic Plan', price: 999, currency: 'INR', durationDays: 30, description: 'Starter pack for small agencies' },
                    { id: 102, name: 'Pro Plan', price: 2499, currency: 'INR', durationDays: 90, description: 'Best value for growing teams' },
                    { id: 103, name: 'Enterprise', price: 9999, currency: 'INR', durationDays: 365, description: 'Full access with priority support' }
                ];
            }

            setPlans(data);
        } catch (error) {
            console.error("Failed to load plans", error);
        }
    };

    const handleSubscribe = async (planId) => {
        setProcessing(planId);
        try {
            await api.subscribeToPlan(planId);
            alert('Subscription Activated!');
            // Refresh to show active sub
            await loadData();
        } catch (error) {
            alert(error.message);
        } finally {
            setProcessing(null);
        }
    };

    if (loading) {
        return (
            <div className="aws-widget" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Skeleton height="40px" width="200px" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <Skeleton height="300px" />
                    <Skeleton height="300px" />
                    <Skeleton height="300px" />
                </div>
            </div>
        );
    }

    // View 1: Active Subscription
    if (activeSub) {
        return (
            <div className="aws-widget">
                <div className="widget-header">
                    <h2 className="widget-title">My Subscription</h2>
                </div>

                <div className="current-plan-card">
                    <div className="plan-status-badge active">
                        <i className="fas fa-check-circle"></i> Active
                    </div>

                    <div className="plan-info">
                        <h3>{activeSub.plan?.name || 'Standard Plan'}</h3>
                        <p className="plan-solution">
                            {activeSub.plan?.solution?.name || 'Travel Solutions Bundle'}
                        </p>

                        <div className="plan-dates">
                            <div className="date-item">
                                <span className="label">Start Date</span>
                                <span className="value">{activeSub.startDate || '2024-01-01'}</span>
                            </div>
                            <div className="date-item">
                                <span className="label">Renewal Date</span>
                                <span className="value">{activeSub.endDate || '2025-01-01'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="plan-actions">
                        <button className="aws-btn secondary">Manage Payment</button>
                        <button className="aws-btn secondary text-danger">Cancel Plan</button>
                    </div>
                </div>
            </div>
        );
    }

    // View 2: Select a Plan
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16191f' }}>Available Plans</h2>
                <p style={{ color: '#545b64', marginTop: '5px' }}>Choose a plan to activate services.</p>
            </div>

            {/* Solution Tabs */}
            <div className="solution-tabs">
                {solutions.map(sol => (
                    <div
                        key={sol.id}
                        className={`solution-tab ${selectedSolution?.id === sol.id ? 'active' : ''}`}
                        onClick={() => setSelectedSolution(sol)}
                    >
                        {sol.name}
                    </div>
                ))}
            </div>

            {/* Pricing Cards Grid */}
            <div className="pricing-grid">
                {plans.map(plan => (
                    <div key={plan.id} className="pricing-card">
                        <div className="card-header">
                            <h3 className="plan-name">{plan.name}</h3>
                            <div className="plan-price">
                                <span className="currency">{plan.currency === 'INR' ? '₹' : '$'}</span>
                                <span className="amount">{plan.price}</span>
                                <span className="period">/ {plan.durationDays} days</span>
                            </div>
                        </div>

                        <div className="card-body">
                            <p className="plan-desc">{plan.description || 'Access to premium features included.'}</p>
                            <ul className="plan-features">
                                <li><i className="fas fa-check"></i> Unlimited Bookings</li>
                                <li><i className="fas fa-check"></i> 24/7 Support</li>
                                <li><i className="fas fa-check"></i> API Access</li>
                            </ul>
                        </div>

                        <div className="card-footer">
                            <button
                                className="aws-btn primary full-width"
                                disabled={processing === plan.id}
                                onClick={() => handleSubscribe(plan.id)}
                            >
                                {processing === plan.id ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Processing</>
                                ) : 'Subscribe Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionManager;
