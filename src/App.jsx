import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, ScrollRestoration } from 'react-router-dom';

// New Corporate Components
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import VisaServicesSection from './components/VisaServicesSection';
import ProcessSection from './components/ProcessSection';
import TrustSection from './components/TrustSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Keeping existing Auth/Dashboard components
import B2BLogin from './components/B2BLogin';
import AgentDashboard from './components/AgentDashboard';
import SetupPassword from './components/SetupPassword';
import AgentRegistrationForm from './components/AgentRegistrationForm'; // Preserved Component

// Layout component
const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

function Home() {
    return (
        <>
            <Hero />
            <ServicesSection />
            <VisaServicesSection />
            <TrustSection />
            <ProcessSection />
            <TestimonialsSection />
            <CTASection />
        </>
    );
}

function App() {
    return (
        <Router>
            {/* New feature: Scroll to top on route change */}
            <Routes>
                {/* Public Routes with Header/Footer */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/b2b-login" element={<B2BLogin />} />
                    <Route path="/b2b-register" element={
                        <div className="container" style={{ padding: '120px 20px 60px', maxWidth: '600px', margin: '0 auto' }}>
                            <AgentRegistrationForm />
                        </div>
                    } />
                </Route>

                {/* Authenticated/Standalone Routes */}
                <Route path="/dashboard" element={<AgentDashboard />} />
                <Route path="/setup-password" element={<SetupPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
