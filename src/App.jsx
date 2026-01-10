
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import B2BLogin from './components/B2BLogin';
import Dashboard from './components/Dashboard';
import AgentDashboard from './components/AgentDashboard';

import SetupPassword from './components/SetupPassword';

// Layout component for public pages that need Header/Footer
const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <Destinations />
            <Testimonials />
            <FAQ />
        </main>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes with Header/Footer */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/b2b-login" element={<B2BLogin />} />
                </Route>

                {/* Authenticated/Standalone Routes */}
                <Route path="/dashboard" element={<AgentDashboard />} />
                <Route path="/setup-password" element={<SetupPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
