
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user_details') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_details');
        navigate('/b2b-login');
    };

    return (
        <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#095289' }}>Agent Dashboard</h1>
                <button onClick={handleLogout} className="btn btn-primary" style={{ backgroundColor: '#f09125' }}>Logout</button>
            </div>

            <div className="card" style={{ padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                <h2>Welcome, {user.email || 'Agent'}!</h2>
                <p style={{ marginTop: '10px', color: '#666' }}>You have successfully logged in to the B2B Portal.</p>
                <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                    <p><strong>Role:</strong> {user.roles?.join(', ') || 'AGENT'}</p>
                    <p><strong>Agent ID:</strong> {user.id || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
