import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, ScrollRestoration } from 'react-router-dom';

// New Corporate Components
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import BusinessFeaturesSection from './components/BusinessFeaturesSection';
import ProcessSection from './components/ProcessSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Keeping existing Auth/Dashboard components
import B2BLogin from './components/B2BLogin';
import AgentDashboard from './components/AgentDashboard';
import SetupPassword from './components/SetupPassword';
import AgentRegistrationForm from './components/AgentRegistrationForm'; // Preserved Component
import RegistrationModal from './components/RegistrationModal';
import B2BRegister from './components/B2BRegister'; // New 3-step registration page

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
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        // Show modal after a brief delay for better UX
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <RegistrationModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <Hero />
            <ServicesSection />
            <BusinessFeaturesSection />
            <ProcessSection />
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
                            <B2BRegister />
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
