
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Skeleton from '../common/Skeleton';

const VisaRequirements = ({ onCancel }) => {
    const [countryCode, setCountryCode] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activePill, setActivePill] = useState(null);
    const [activeCity, setActiveCity] = useState(null);

    // Initial fetch for country list
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const list = await api.getVisaCountries();
                setCountries(list || []);
                setFilteredCountries(list || []);
            } catch (err) {
                console.error("Failed to load countries", err);
            }
        };
        fetchCountries();
    }, []);

    // Filter countries on search
    useEffect(() => {
        const results = countries.filter(c =>
            (c.countryName || c.name || c.code).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(results);
    }, [searchTerm, countries]);

    const fetchRequirements = async (code) => {
        if (!code) return;
        setLoading(true);
        setError(null);
        try {
            const result = await api.getVisaRequirements(code);
            setData(result);

            const firstPill = result.visa ? Object.keys(result.visa)[0] : null;
            if (firstPill) {
                setActivePill(firstPill);
                const firstCity = Object.keys(result.visa[firstPill])[0];
                setActiveCity(firstCity);
            }
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequirements(countryCode);
    }, [countryCode]);

    const handleCountrySelect = (country) => {
        setCountryCode(country.code);
        setSearchTerm(country.countryName || country.name || country.code);
        setIsDropdownOpen(false);
        // fetchRequirements is called by the useEffect on countryCode change
    };

    const handlePillChange = (pill) => {
        setActivePill(pill);
        // Reset city to first available in new pill
        if (data && data.visa && data.visa[pill]) {
            setActiveCity(Object.keys(data.visa[pill])[0]);
        }
    };

    // Helper to format key names like "Pills-business" -> "Business"
    const formatPillName = (key) => key.replace('Pills-', '').toUpperCase();

    const currentVisaDetails = data && activePill && activeCity && data.visa && data.visa[activePill] ? data.visa[activePill][activeCity] : null;

    // Strict AWS Cloudscape Design System Tokens
    const AWS = {
        // Foundation
        colorBackgroundLayoutMain: '#f2f3f3',
        colorBackgroundContainerContent: '#ffffff',
        colorBorderContainerTop: '#eaeded', // slightly lighter for separators
        colorBorderInputDefault: '#7d8998', // darker input border
        colorBorderItemFocused: '#0972d3', // focus ring
        colorTextBodyDefault: '#16191f',
        colorTextBodySecondary: '#545b64',
        colorTextLinkDefault: '#0972d3',

        // Buttons
        colorBackgroundButtonPrimaryDefault: '#ec7211',
        colorBackgroundButtonPrimaryHover: '#eb5f07',
        colorBorderButtonPrimaryDefault: '#ec7211',
        colorTextButtonPrimaryDefault: '#ffffff',

        colorBackgroundButtonNormalDefault: '#ffffff',
        colorBorderButtonNormalDefault: '#7d8998',
        colorTextButtonNormalDefault: '#16191f',

        // Status / Flashbar
        colorBackgroundStatusInfo: '#f1faff',
        colorBorderStatusInfo: '#0073bb',
        colorTextStatusInfo: '#0073bb',

        colorBackgroundStatusWarning: '#fffcf5', // warm light bg
        colorBorderStatusWarning: '#986c23', // darker gold
        colorTextStatusWarning: '#4d370f', // dark brown text

        colorBackgroundStatusError: '#fff5f5',
        colorBorderStatusError: '#d13212',
        colorTextStatusError: '#d13212',
    };

    // Generic Reusable "Container" Style
    const containerStyle = {
        backgroundColor: AWS.colorBackgroundContainerContent,
        // Modern AWS is simpler:
        boxShadow: 'none',
        border: '1px solid #d5dbdb',
        borderRadius: '0px',
        marginBottom: '20px'
    };

    const headerStyle = {
        fontSize: '18px',
        fontWeight: 700,
        color: AWS.colorTextBodyDefault,
        padding: '16px 20px',
        borderBottom: `1px solid ${AWS.colorBorderContainerTop}`,
        margin: 0
    };

    // Key-Value Pair Component
    const KeyValue = ({ label, value, large = false }) => (
        <div style={{ paddingBottom: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: AWS.colorTextBodySecondary, marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: large ? '24px' : '14px', color: AWS.colorTextBodyDefault, lineHeight: '20px' }}>{value}</div>
        </div>
    );

    return (
        <div style={{ padding: '0px', fontFamily: '"Amazon Ember", "Helvetica Neue", Roboto, Arial, sans-serif', backgroundColor: AWS.colorBackgroundLayoutMain, minHeight: '100vh', color: AWS.colorTextBodyDefault }}>

            {/* Top Navigation Bar Simulation (Service Level) */}
            <div style={{ padding: '12px 24px', backgroundColor: '#232f3e', color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>Visa Service</span>
                <span style={{ fontSize: '14px', color: '#aab7b8' }}>Region: Global</span>
            </div>

            <div style={{ padding: '24px 32px' }}>

                {/* Page Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 700, color: AWS.colorTextBodyDefault, margin: '0 0 8px 0' }}>Visa Requirements</h1>
                        <p style={{ fontSize: '14px', color: AWS.colorTextBodySecondary, margin: 0 }}>
                            Search and view entry requirements, fees, and processing times.
                        </p>
                    </div>
                </div>

                {/* Main Filter Container */}
                <div style={containerStyle}>
                    <div style={headerStyle}>Search Filter</div>
                    <div style={{ padding: '20px' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: AWS.colorTextBodyDefault, marginBottom: '8px' }}>
                                Country
                            </label>

                            {/* Custom Dropdown Container */}
                            <div style={{ position: 'relative' }}>

                                {/* 1. The Trigger (Select Box) */}
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{
                                        width: '100%',
                                        padding: '4px 12px',
                                        border: `1px solid ${isDropdownOpen ? AWS.colorBorderItemFocused : AWS.colorBorderInputDefault}`,
                                        borderRadius: '2px',
                                        backgroundColor: 'white',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        boxShadow: isDropdownOpen ? `0 0 0 1px ${AWS.colorBorderItemFocused}` : 'none'
                                    }}
                                >
                                    <span style={{ fontSize: '14px', color: countryCode ? AWS.colorTextBodyDefault : '#687078' }}>
                                        {countryCode ? (countries.find(c => c.code === countryCode)?.countryName || countries.find(c => c.code === countryCode)?.name || countryCode) : "Select country..."}
                                    </span>
                                    <i className={`fas fa-caret-${isDropdownOpen ? 'up' : 'down'}`} style={{ color: AWS.colorTextBodySecondary }}></i>
                                </div>

                                {/* 2. The Popover (Search + List) */}
                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        marginTop: '4px',
                                        backgroundColor: 'white',
                                        border: '1px solid #d5dbdb',
                                        borderRadius: '2px',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        zIndex: 1000,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {/* Internal Search Input */}
                                        <div style={{ padding: '8px', borderBottom: '1px solid #eaeded' }}>
                                            <div style={{ position: 'relative' }}>
                                                <i className="fas fa-search" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#687078', fontSize: '14px' }}></i>
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Search country..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                                                    style={{
                                                        width: '100%',
                                                        padding: '6px 8px 6px 30px', // Left padding for icon
                                                        border: '1px solid #7d8998',
                                                        borderRadius: '2px',
                                                        fontSize: '14px',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* List of Countries */}
                                        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                            {filteredCountries.length > 0 ? (
                                                filteredCountries.map(country => (
                                                    <div
                                                        key={country.code}
                                                        onClick={() => handleCountrySelect(country)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: AWS.colorTextBodyDefault,
                                                            borderBottom: '1px solid transparent'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1faff'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                                    >
                                                        {country.countryName || country.name || country.code}
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '12px', textAlign: 'center', color: AWS.colorTextBodySecondary, fontSize: '14px' }}>
                                                    No country found.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div style={{ marginTop: '20px' }}>
                        <Skeleton height="200px" />
                    </div>
                )}


                {/* Results Section */}
                {data && data.visa && !loading && (
                    <div style={{ marginTop: '20px' }}>

                        {/* Flashbar Area for Alerts */}
                        {(data.about || data.additional_info || data.logistic_partner_note) && (
                            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {/* Blue Info Flashbar */}
                                {data.about && (
                                    <div style={{
                                        backgroundColor: AWS.colorBackgroundStatusInfo,
                                        border: `1px solid ${AWS.colorBorderStatusInfo}`,
                                        padding: '12px 16px', display: 'flex', gap: '12px', borderRadius: '4px'
                                    }}>
                                        <i className="fas fa-info-circle" style={{ color: AWS.colorTextStatusInfo, marginTop: '2px' }}></i>
                                        <div>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: AWS.colorTextBodyDefault }}>General Information</span>
                                            <div style={{ fontSize: '14px', color: AWS.colorTextBodyDefault, marginTop: '4px' }}>{data.about}</div>
                                        </div>
                                    </div>
                                )}
                                {/* Warning Flashbar */}
                                {data.additional_info && (
                                    <div style={{
                                        backgroundColor: AWS.colorBackgroundStatusWarning,
                                        border: `1px solid ${AWS.colorBorderStatusWarning}`,
                                        padding: '12px 16px', display: 'flex', gap: '12px', borderRadius: '4px'
                                    }}>
                                        <i className="fas fa-exclamation-triangle" style={{ color: AWS.colorBorderStatusWarning, marginTop: '2px' }}></i>
                                        <div>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: AWS.colorTextBodyDefault }}>Important Notice</span>
                                            <div style={{ fontSize: '14px', color: AWS.colorTextBodyDefault, marginTop: '4px' }}>{data.additional_info}</div>
                                        </div>
                                    </div>
                                )}
                                {/* Error/Critical Flashbar */}
                                {data.logistic_partner_note && (
                                    <div style={{
                                        backgroundColor: AWS.colorBackgroundStatusError,
                                        border: `1px solid ${AWS.colorBorderStatusError}`,
                                        padding: '12px 16px', display: 'flex', gap: '12px', borderRadius: '4px'
                                    }}>
                                        <i className="fas fa-times-circle" style={{ color: AWS.colorTextStatusError, marginTop: '2px' }}></i>
                                        <div>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: AWS.colorTextBodyDefault }}>Partner Note</span>
                                            <div style={{ fontSize: '14px', color: AWS.colorTextBodyDefault, marginTop: '4px' }}>{data.logistic_partner_note}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Main Details Container with Tabs */}
                        <div style={containerStyle}>
                            <div style={headerStyle}>{data.country_name} Visa Configuration</div>

                            {/* Tabs */}
                            <div style={{ borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, padding: '0 20px', display: 'flex', gap: '20px' }}>
                                {Object.keys(data.visa).map(pillKey => (
                                    <button
                                        key={pillKey}
                                        onClick={() => handlePillChange(pillKey)}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            padding: '12px 4px',
                                            fontSize: '14px',
                                            fontWeight: activePill === pillKey ? 700 : 400,
                                            color: activePill === pillKey ? AWS.colorTextBodyDefault : AWS.colorTextBodySecondary,
                                            borderBottom: activePill === pillKey ? `4px solid ${AWS.colorBackgroundButtonPrimaryDefault}` : '4px solid transparent',
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                    >
                                        {formatPillName(pillKey)}
                                    </button>
                                ))}
                            </div>

                            {/* Inner Content Padding */}
                            <div style={{ padding: '20px' }}>

                                {/* City Selector (Radio Group style) */}
                                {activePill && data.visa[activePill] && (
                                    <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: AWS.colorTextBodyDefault }}>Processing Center:</span>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {Object.keys(data.visa[activePill]).map(city => (
                                                <button
                                                    key={city}
                                                    onClick={() => setActiveCity(city)}
                                                    style={{
                                                        padding: '4px 12px',
                                                        border: activeCity === city ? `1px solid ${AWS.colorBorderItemFocused}` : `1px solid ${AWS.colorBorderInputDefault}`,
                                                        backgroundColor: activeCity === city ? '#e9f2fa' : 'white',
                                                        color: activeCity === city ? AWS.colorBorderItemFocused : AWS.colorTextBodyDefault,
                                                        borderRadius: '14px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: activeCity === city ? 700 : 400
                                                    }}
                                                >
                                                    {city}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {currentVisaDetails && (
                                    <>
                                        {/* Key Details Grid - 4 Column Layout */}
                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontSize: '16px', fontWeight: 700, color: AWS.colorTextBodyDefault, borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, paddingBottom: '10px', marginTop: 0 }}>
                                                Financials & Processing
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '24px', marginTop: '15px' }}>
                                                <KeyValue label="Visa Fee" value={`${currentVisaDetails.visa_fee?.currency} ${currentVisaDetails.visa_fee?.amount}`} large />
                                                <KeyValue label="Service Charge" value={`${currentVisaDetails.visa_fee?.currency} ${currentVisaDetails.logistic_charges}`} large />
                                                <KeyValue label="Total Cost" value={`${currentVisaDetails.visa_fee?.currency} ${(parseFloat(currentVisaDetails.visa_fee?.amount || 0) + parseFloat(currentVisaDetails.logistic_charges || 0)).toFixed(2)}`} large />
                                                <KeyValue label="Processing Time" value={currentVisaDetails.processing_time} large />
                                            </div>
                                        </div>

                                        <div style={{ height: '1px', backgroundColor: AWS.colorBorderContainerTop, margin: '20px 0' }}></div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '40px' }}>
                                            {/* Documents - List View */}
                                            <div>
                                                <h4 style={{ fontSize: '16px', fontWeight: 700, color: AWS.colorTextBodyDefault, borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, paddingBottom: '10px', marginTop: 0 }}>
                                                    Documents Checklist
                                                </h4>
                                                <div>
                                                    {currentVisaDetails.mandatory_documents?.map((doc, idx) => (
                                                        <div key={idx} style={{ padding: '12px 0', borderBottom: `1px solid ${AWS.colorBorderContainerTop}` }}>
                                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                                <i className="fas fa-file-alt" style={{ color: AWS.colorTextBodySecondary, marginTop: '3px' }}></i>
                                                                <div>
                                                                    <div style={{ fontSize: '14px', fontWeight: 700, color: AWS.colorTextLinkDefault }}>{doc.name}</div>
                                                                    <div style={{ fontSize: '14px', color: AWS.colorTextBodyDefault, marginTop: '2px' }}>{doc.description}</div>
                                                                    {doc.links && doc.links.length > 0 && (
                                                                        <div style={{ marginTop: '6px' }}>
                                                                            {doc.links.map((link, lidx) => (
                                                                                <a key={lidx} href={link.url} style={{
                                                                                    fontSize: '14px', color: AWS.colorTextLinkDefault, textDecoration: 'none', marginRight: '15px',
                                                                                    display: 'inline-flex', alignItems: 'center', gap: '4px'
                                                                                }}>
                                                                                    <i className="fas fa-external-link-alt" style={{ fontSize: '12px' }}></i> {link.text || 'View Resource'}
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Diplomatic Missions - Custom UI from User Reference */}
                                            <div>
                                                <h4 style={{ fontSize: '18px', fontWeight: 700, color: AWS.colorTextBodyDefault, marginBottom: '15px', marginTop: 0 }}>
                                                    Diplomatic Representation
                                                </h4>
                                                <div style={{ border: `1px solid ${AWS.colorBorderContainerTop}`, backgroundColor: '#fff', borderRadius: '4px' }}>
                                                    {data.diplomatic_representations && data.diplomatic_representations.map((rep, idx) => (
                                                        <div key={idx} style={{
                                                            padding: '20px',
                                                            borderBottom: idx === data.diplomatic_representations.length - 1 ? 'none' : `1px solid ${AWS.colorBorderContainerTop}`
                                                        }}>
                                                            {/* Header Row: Red Pill + Name */}
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                                                <span style={{
                                                                    backgroundColor: '#b00b0b', // Deep red from image
                                                                    color: 'white',
                                                                    padding: '6px 20px',
                                                                    borderRadius: '20px',
                                                                    fontWeight: 600,
                                                                    fontSize: '14px',
                                                                    boxShadow: '0 2px 4px rgba(176, 11, 11, 0.2)'
                                                                }}>
                                                                    {rep.city}
                                                                </span>
                                                                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1a1f2c' }}>
                                                                    {rep.mission}
                                                                </span>
                                                            </div>

                                                            {/* Details Grid */}
                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', paddingLeft: '5px' }}>
                                                                {/* Address */}
                                                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                                    <i className="fas fa-map-marker-alt" style={{ color: '#9ba7b6', marginTop: '4px', width: '16px' }}></i>
                                                                    <span style={{ fontSize: '14px', color: '#545b64', lineHeight: '1.5' }}>{rep.address}</span>
                                                                </div>

                                                                {/* Contact Row (Email/Phone) */}
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '5px' }}>
                                                                    {/* Placeholder for phone if data existed: 
                                                                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                                        <i className="fas fa-phone-alt" style={{ color: '#9ba7b6', width: '16px' }}></i>
                                                                        <span style={{ fontSize: '14px', color: '#545b64' }}>+91 11 4139 9900</span>
                                                                     </div> 
                                                                     */}

                                                                    {rep.emails && (
                                                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                                            <i className="fas fa-envelope" style={{ color: '#9ba7b6', width: '16px' }}></i>
                                                                            <a href={`mailto:${rep.emails}`} style={{ fontSize: '14px', color: '#1a1f2c', textDecoration: 'none' }}>{rep.emails}</a>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Hours (Data Placeholder Mockup to match specific request visual if real data isn't there) */}
                                                                {/* Since actual data might not have hours, we omit or keep generic to avoid false info. 
                                                                    However, to match the "Look" requested, we style the container such that if hours existed, they'd look like the image.
                                                                */}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default VisaRequirements;
