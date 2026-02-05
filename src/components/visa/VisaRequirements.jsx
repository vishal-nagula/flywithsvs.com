import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Skeleton from '../common/Skeleton';
import ApplyVisaFlow from './ApplyVisaFlow';

const VisaRequirements = ({ onCancel }) => {
    const [countryCode, setCountryCode] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // UI State
    const [activeTab, setActiveTab] = useState('visaTypes'); // visaTypes, general, diplomatic, help, logistic
    const [activeVisaTypeTab, setActiveVisaTypeTab] = useState(0); // Index of active visa type tab
    const [expandedJurisdiction, setExpandedJurisdiction] = useState({}); // { visaTypeIndex: expandedJurisdictionIndex }
    const [showApplyVisaModal, setShowApplyVisaModal] = useState(false);

    // Share Modal State
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareEmail, setShareEmail] = useState('');
    const [shareLoading, setShareLoading] = useState(false);
    const [shareContext, setShareContext] = useState(null);

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
            // Reset state on new data
            setActiveTab('visaTypes');
            setExpandedJurisdiction({});
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
    };

    const toggleJurisdiction = (visaTypeIdx, jurisdictionIdx) => {
        setExpandedJurisdiction(prev => ({
            ...prev,
            [`${visaTypeIdx}-${jurisdictionIdx}`]: !prev[`${visaTypeIdx}-${jurisdictionIdx}`]
        }));
    };

    const handleShareSubmit = async () => {
        if (!shareEmail || !shareEmail.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        setShareLoading(true);
        try {
            await api.shareVisaRequirements(data.code, {
                email: shareEmail,
                ...shareContext
            });
            alert(`Visa requirements sent to ${shareEmail} successfully!`);
            setShowShareModal(false);
            setShareEmail('');
            setShareContext(null);
        } catch (err) {
            console.error(err);
            alert("Failed to send email. Please try again.");
        } finally {
            setShareLoading(false);
        }
    };

    // --- AWS & Custom Styles ---
    const AWS = {
        colorTextBodyDefault: '#16191f',
        colorTextBodySecondary: '#545b64',
        colorBorderContainerTop: '#eaeded',
        colorBackgroundContainerContent: '#ffffff',
        colorBackgroundButtonPrimaryDefault: '#ec7211',
        blue: '#0972d3',
        bgLight: '#f2f3f3'
    };

    const containerStyle = {
        backgroundColor: AWS.colorBackgroundContainerContent,
        border: '1px solid #d5dbdb',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
    };

    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === id ? `3px solid ${AWS.colorBackgroundButtonPrimaryDefault}` : '3px solid transparent',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: activeTab === id ? 700 : 500,
                color: activeTab === id ? AWS.colorTextBodyDefault : AWS.colorTextBodySecondary,
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            {label}
        </button>
    );

    return (
        <div style={{ padding: '0', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: '"Manrope", sans-serif', color: AWS.colorTextBodyDefault }}>

            {/* Header / Breadcrumb */}
            <div style={{ padding: '20px 30px', backgroundColor: 'white', borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '16px', margin: 0, fontWeight: 800 }}>Visa Intelligence Hub</h1>
                {loading && <i className="fas fa-spinner fa-spin" style={{ color: AWS.colorBackgroundButtonPrimaryDefault }}></i>}
            </div>

            <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>

                {/* Country Search Bar */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d5dbdb',
                                borderRadius: '6px',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}
                        >
                            <span style={{ fontWeight: 600 }}>
                                {countryCode ? (
                                    <>
                                        <i className="fas fa-globe" style={{ marginRight: '8px', color: '#888' }}></i>
                                        {countries.find(c => c.code === countryCode)?.countryName || countries.find(c => c.code === countryCode)?.name || countryCode}
                                    </>
                                ) : "Select Destination Country..."}
                            </span>
                            <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`} style={{ color: '#888' }}></i>
                        </div>

                        {isDropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '110%', left: 0, right: 0,
                                backgroundColor: 'white', border: '1px solid #d5dbdb', borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, maxHeight: '300px',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                <div style={{ padding: '10px' }}>
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Type to search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ overflowY: 'auto' }}>
                                    {filteredCountries.map(country => (
                                        <div
                                            key={country.code}
                                            onClick={() => handleCountrySelect(country)}
                                            style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontSize: '14px' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            <span style={{ fontWeight: 700, marginRight: '8px', width: '30px', display: 'inline-block' }}>{country.code}</span>
                                            {country.countryName || country.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {loading ? (
                    <Skeleton height="300px" />
                ) : data ? (
                    <>
                        {/* Country Header Card */}
                        <div style={{ ...containerStyle, padding: '20px', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <i className="fas fa-globe" style={{ fontSize: '20px', color: AWS.colorBackgroundButtonPrimaryDefault }}></i>
                                <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 800 }}>{data.name} <span style={{ fontSize: '14px', fontWeight: 500, color: '#888' }}>({data.code})</span></h2>
                                <span style={{ marginLeft: 'auto', backgroundColor: '#e6fffa', color: '#047481', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>Active</span>
                            </div>

                            <p style={{ color: AWS.colorTextBodySecondary, marginBottom: '0', fontSize: '13px' }}>Visa requirements and information for {data.name}.</p>
                        </div>

                        {/* Tabs Navigation */}
                        <div style={{ backgroundColor: 'white', borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, marginBottom: '20px', borderRadius: '8px', padding: '0 10px' }}>
                            <TabButton id="visaTypes" label="Visa Types & Fees" />
                            <TabButton id="general" label="General Info" />
                            <TabButton id="diplomatic" label="Diplomatic Rep" />
                            <TabButton id="help" label="Help & Support" />
                            <TabButton id="logistic" label="Logistic Partner" />
                        </div>

                        {/* Tab Content Areas */}

                        {/* 1. Visa Types & Fees */}
                        {activeTab === 'visaTypes' && (
                            <>
                                {/* Visa Type Sub-Tabs */}
                                <div style={{ backgroundColor: 'white', borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, marginBottom: '20px', borderRadius: '8px', padding: '0 10px', display: 'flex', gap: '5px', overflowX: 'auto' }}>
                                    {data.visaTypes?.map((visa, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setActiveVisaTypeTab(idx);
                                                setExpandedJurisdiction({});
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: activeVisaTypeTab === idx ? `3px solid ${AWS.colorBackgroundButtonPrimaryDefault}` : '3px solid transparent',
                                                padding: '10px 16px',
                                                fontSize: '13px',
                                                fontWeight: activeVisaTypeTab === idx ? 700 : 500,
                                                color: activeVisaTypeTab === idx ? AWS.colorTextBodyDefault : AWS.colorTextBodySecondary,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {visa.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Active Visa Type Content */}
                                {data.visaTypes?.[activeVisaTypeTab] && (
                                    <div style={containerStyle}>
                                        <div style={{ padding: '16px', borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{data.visaTypes[activeVisaTypeTab].name} Visa</h3>

                                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => setShowApplyVisaModal(true)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        backgroundColor: AWS.colorBackgroundButtonPrimaryDefault,
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        display: 'flex', alignItems: 'center', gap: '8px'
                                                    }}>
                                                    Apply Visa
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShareContext(null);
                                                        setShowShareModal(true);
                                                    }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        backgroundColor: 'white',
                                                        border: '1px solid #d5dbdb',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        color: AWS.colorTextBodySecondary
                                                    }} title="Share via Email">
                                                    <i className="fas fa-envelope"></i>
                                                </button>
                                                <button style={{
                                                    padding: '8px 12px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #d5dbdb',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    color: AWS.colorTextBodySecondary
                                                }} title="Download PDF">
                                                    <i className="fas fa-file-pdf"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ padding: '0' }}>
                                            {data.visaTypes[activeVisaTypeTab].jurisdictions?.map((jur, jIdx) => {
                                                const isExpanded = expandedJurisdiction[`${activeVisaTypeTab}-${jIdx}`];
                                                return (
                                                    <div key={jIdx} style={{ borderBottom: jIdx === data.visaTypes[activeVisaTypeTab].jurisdictions.length - 1 ? 'none' : `1px solid ${AWS.colorBorderContainerTop}` }}>
                                                        <div
                                                            onClick={() => toggleJurisdiction(activeVisaTypeTab, jIdx)}
                                                            style={{ padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isExpanded ? '#fafafa' : 'white' }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <div style={{ color: AWS.colorBackgroundButtonPrimaryDefault, fontSize: '14px' }}>
                                                                    <i className="fas fa-map-marker-alt"></i>
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{jur.name}</div>
                                                                    <div style={{ color: '#888', fontSize: '12px' }}>Processing: {jur.processingTime}</div>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                                <div>
                                                                    <div style={{ fontWeight: 800, fontSize: '14px' }}>USD {(jur.visaFee + jur.logisticFee).toFixed(2)}</div>
                                                                    <div style={{ fontSize: '10px', color: '#888' }}>Total Fee</div>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setShareContext({
                                                                            visaTypeId: data.visaTypes[activeVisaTypeTab].id,
                                                                            jurisdictionId: jur.id
                                                                        });
                                                                        setShowShareModal(true);
                                                                    }}
                                                                    style={{
                                                                        padding: '6px 10px',
                                                                        backgroundColor: 'white',
                                                                        border: '1px solid #d5dbdb',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer',
                                                                        color: AWS.colorTextBodySecondary,
                                                                        fontSize: '12px'
                                                                    }}
                                                                    title="Share Jurisdiction Data"
                                                                >
                                                                    <i className="fas fa-envelope"></i>
                                                                </button>
                                                                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} style={{ color: '#ccc' }}></i>
                                                            </div>
                                                        </div>

                                                        {isExpanded && (
                                                            <div style={{ padding: '20px 20px 30px 55px', borderTop: '1px dashed #eee' }}>
                                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                                                                    {/* Fees Breakdown */}
                                                                    <div>
                                                                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>Fee Breakdown</h4>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                                                            <span>Visa Fee</span>
                                                                            <span style={{ fontWeight: 600 }}>USD {jur.visaFee.toFixed(2)}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                                                            <span>Logistic/Service Fee</span>
                                                                            <span style={{ fontWeight: 600 }}>USD {jur.logisticFee.toFixed(2)}</span>
                                                                        </div>
                                                                        <div style={{ borderTop: '1px solid #eee', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: AWS.colorTextBodyDefault }}>
                                                                            <span>Total</span>
                                                                            <span>USD {(jur.visaFee + jur.logisticFee).toFixed(2)}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Documents */}
                                                                    <div>
                                                                        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>Required Documents</h4>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                            {jur.documents?.map((doc, dIdx) => (
                                                                                <div key={dIdx} style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                                                                                    <i className="fas fa-check-circle" style={{ color: 'green', marginTop: '2px', fontSize: '12px' }}></i>
                                                                                    <div>
                                                                                        <div style={{ fontWeight: 600 }}>{doc.name} {doc.mandatory && <span style={{ color: 'red', fontSize: '10px' }}>*</span>}</div>
                                                                                        {doc.description && doc.description.length > 0 && (
                                                                                            <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>{doc.description}</div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* 2. General Info */}
                        {activeTab === 'general' && (
                            <div style={{ ...containerStyle, padding: '30px' }}>
                                <h3 style={{ marginTop: 0 }}>General Information</h3>
                                <p>General visa information for {data.name}.</p>
                            </div>
                        )}

                        {/* 3. Diplomatic Rep */}
                        {activeTab === 'diplomatic' && (
                            <div style={containerStyle}>
                                {data.diplomaticRepresentations?.map((item, idx) => (
                                    <div key={idx} style={{ padding: '24px', borderBottom: idx === data.diplomaticRepresentations.length - 1 ? 'none' : '1px solid #eee' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <h3 style={{ margin: 0, fontSize: '18px' }}>{item.name}</h3>
                                            <span style={{ backgroundColor: item.type === 'EMBASSY' ? '#e0f2fe' : '#fef3c7', color: item.type === 'EMBASSY' ? '#075985' : '#92400e', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 600 }}>{item.type}</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr', gap: '10px 20px', alignItems: 'start', fontSize: '14px' }}>
                                            <i className="fas fa-map-marker-alt" style={{ color: '#888', marginTop: '3px' }}></i>
                                            <span>{item.address}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 4. Help & Support */}
                        {activeTab === 'help' && (
                            <div style={containerStyle}>
                                {data.helpLinks?.map((item, idx) => (
                                    <div key={idx} style={{ padding: '24px', borderBottom: idx === data.helpLinks.length - 1 ? 'none' : '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600 }}>{item.name}</div>
                                        <a href={item.url} target="_blank" rel="noreferrer" style={{ padding: '8px 20px', borderRadius: '4px', textDecoration: 'none', border: '1px solid #ccc', color: '#333', backgroundColor: 'white' }}>
                                            Visit Website <i className="fas fa-external-link-alt" style={{ marginLeft: '8px' }}></i>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 5. Logistic Partner */}
                        {activeTab === 'logistic' && (
                            <div style={{ ...containerStyle, padding: '30px', textAlign: 'center', color: '#888' }}>
                                <p>No logistic partner information available.</p>
                            </div>
                        )}

                    </>
                ) : !loading && countryCode ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                        No requirements data available for this country selection.
                    </div>
                ) : null}

            </div>

            {/* Apply Visa Modal */}
            {showApplyVisaModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    overflow: 'auto'
                }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowApplyVisaModal(false)}
                            style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                zIndex: 1001,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}
                        >
                            ×
                        </button>
                        <ApplyVisaFlow
                            initialCountry={data?.code}
                            initialVisaType={data?.visaTypes?.[activeVisaTypeTab]?.name}
                            onClose={() => setShowApplyVisaModal(false)}
                        />
                    </div>
                </div>
            )}

            {/* Share Email Modal */}
            {showShareModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '400px',
                        maxWidth: '90%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px', fontWeight: 700 }}>Share Visa Requirements</h3>
                        <p style={{ marginBottom: '20px', fontSize: '14px', color: '#555' }}>
                            Enter the customer's email address to send them a PDF of these visa requirements.
                        </p>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>Customer Email</label>
                            <input
                                type="email"
                                value={shareEmail}
                                onChange={(e) => setShareEmail(e.target.value)}
                                placeholder="customer@example.com"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                onClick={() => setShowShareModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleShareSubmit}
                                disabled={shareLoading || !shareEmail || !shareEmail.includes('@')}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: AWS.colorBackgroundButtonPrimaryDefault,
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: shareLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    opacity: shareLoading ? 0.7 : 1
                                }}
                            >
                                {shareLoading ? <><i className="fas fa-spinner fa-spin"></i> Sending...</> : 'Send Email'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisaRequirements;
