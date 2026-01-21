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

    // UI State
    const [activeTab, setActiveTab] = useState('visaTypes'); // visaTypes, general, diplomatic, help, logistic
    const [expandedJurisdiction, setExpandedJurisdiction] = useState({}); // { visaTypeIndex: expandedJurisdictionIndex }

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

    // Helper to safely access nested data
    const getSections = () => data?.sections || {};

    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === id ? `3px solid ${AWS.colorBackgroundButtonPrimaryDefault}` : '3px solid transparent',
                padding: '12px 20px',
                fontSize: '15px',
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
                <h1 style={{ fontSize: '20px', margin: 0, fontWeight: 800 }}>Visa Intelligence Hub</h1>
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
                    {/* Action Buttons Placeholder */}

                </div>

                {loading ? (
                    <Skeleton height="300px" />
                ) : data ? (
                    <>
                        {/* Country Header Card */}
                        <div style={{ ...containerStyle, padding: '24px', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                <i className="fas fa-globe" style={{ fontSize: '24px', color: AWS.colorBackgroundButtonPrimaryDefault }}></i>
                                <h2 style={{ fontSize: '28px', margin: 0, fontWeight: 800 }}>{data.name} <span style={{ fontSize: '18px', fontWeight: 500, color: '#888' }}>({data.code})</span></h2>
                                <span style={{ marginLeft: 'auto', backgroundColor: '#e6fffa', color: '#047481', padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 700 }}>Active</span>
                            </div>

                            <p style={{ color: AWS.colorTextBodySecondary, marginBottom: '24px' }}>{getSections().generalInformation?.description || `Visa requirements and information for ${data.name}.`}</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '24px', maxWidth: '500px' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capital</div>
                                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{getSections().generalInformation?.facts?.Capital || 'N/A'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timezone</div>
                                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{getSections().generalInformation?.facts?.Timezone || 'N/A'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Currency</div>
                                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{data.currency || 'N/A'}</div>
                                </div>
                            </div>
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {getSections().visaNotesAndFees?.visaTypes?.map((visa, vIdx) => (
                                    <div key={vIdx} style={containerStyle}>
                                        <div style={{ padding: '20px', borderBottom: `1px solid ${AWS.colorBorderContainerTop}`, display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{visa.name}</h3>
                                            <span style={{ fontSize: '12px', border: '1px solid #ddd', padding: '2px 8px', borderRadius: '10px', color: '#666' }}>{visa.code}</span>

                                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                                <button style={{
                                                    padding: '8px 16px',
                                                    backgroundColor: AWS.colorBackgroundButtonPrimaryDefault,
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    display: 'flex', alignItems: 'center', gap: '8px'
                                                }}>
                                                    Apply Visa
                                                </button>
                                                <button style={{
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
                                            {visa.jurisdictions?.map((jur, jIdx) => {
                                                const isExpanded = expandedJurisdiction[`${vIdx}-${jIdx}`];
                                                return (
                                                    <div key={jIdx} style={{ borderBottom: jIdx === visa.jurisdictions.length - 1 ? 'none' : `1px solid ${AWS.colorBorderContainerTop}` }}>
                                                        <div
                                                            onClick={() => toggleJurisdiction(vIdx, jIdx)}
                                                            style={{ padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isExpanded ? '#fafafa' : 'white' }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                <div style={{ color: AWS.colorBackgroundButtonPrimaryDefault, fontSize: '16px' }}>
                                                                    <i className="fas fa-map-marker-alt"></i>
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontWeight: 700, fontSize: '16px' }}>{jur.name}</div>
                                                                    <div style={{ color: '#888', fontSize: '13px' }}>Processing: {jur.processingTime}</div>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                                <div>
                                                                    <div style={{ fontWeight: 800, fontSize: '16px' }}>{jur.feeCurrency} {(jur.visaFee + jur.logisticFee).toFixed(2)}</div>
                                                                    <div style={{ fontSize: '11px', color: '#888' }}>Total Fee</div>
                                                                </div>
                                                                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} style={{ color: '#ccc' }}></i>
                                                            </div>
                                                        </div>

                                                        {isExpanded && (
                                                            <div style={{ padding: '20px 20px 30px 55px', borderTop: '1px dashed #eee' }}>
                                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                                                                    {/* Fees Breakdown */}
                                                                    <div>
                                                                        <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#888', marginBottom: '15px' }}>Fee Breakdown</h4>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                                                                            <span>Visa Fee</span>
                                                                            <span style={{ fontWeight: 600 }}>{jur.feeCurrency} {jur.visaFee.toFixed(2)}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                                                                            <span>Logistic/Service Fee</span>
                                                                            <span style={{ fontWeight: 600 }}>{jur.feeCurrency} {jur.logisticFee.toFixed(2)}</span>
                                                                        </div>
                                                                        <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: AWS.colorTextBodyDefault }}>
                                                                            <span>Total</span>
                                                                            <span>{jur.feeCurrency} {(jur.visaFee + jur.logisticFee).toFixed(2)}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Documents */}
                                                                    <div>
                                                                        <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#888', marginBottom: '15px' }}>Required Documents</h4>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                                            {jur.documents?.sort((a, b) => a.displayOrder - b.displayOrder).map((doc, dIdx) => (
                                                                                <div key={dIdx} style={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
                                                                                    <i className="fas fa-check-circle" style={{ color: 'green', marginTop: '3px' }}></i>
                                                                                    <div>
                                                                                        <div style={{ fontWeight: 600 }}>{doc.name} {doc.mandatory && <span style={{ color: 'red', fontSize: '11px' }}>*</span>}</div>
                                                                                        {doc.description && doc.description.length > 0 && (
                                                                                            <ul style={{ margin: '4px 0 0 0', paddingLeft: '15px', color: '#666', fontSize: '13px' }}>
                                                                                                {doc.description.map((line, lIdx) => (
                                                                                                    <li key={lIdx}>{line}</li>
                                                                                                ))}
                                                                                            </ul>
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
                                ))}
                            </div>
                        )}

                        {/* 2. General Info */}
                        {activeTab === 'general' && (
                            <div style={{ ...containerStyle, padding: '30px' }}>
                                <h3 style={{ marginTop: 0 }}>{getSections().generalInformation?.title}</h3>
                                <p>{getSections().generalInformation?.description}</p>
                                {getSections().generalInformation?.workingHours && (
                                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                        <strong>Standard Working Hours:</strong> {getSections().generalInformation.workingHours.text}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. Diplomatic Rep */}
                        {activeTab === 'diplomatic' && (
                            <div style={containerStyle}>
                                {getSections().diplomaticRepresentation?.items?.map((item, idx) => (
                                    <div key={idx} style={{ padding: '24px', borderBottom: '1px solid #eee' }}>
                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{item.name}</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr', gap: '10px 20px', alignItems: 'center', fontSize: '14px' }}>
                                            <i className="fas fa-map-marker-alt" style={{ color: '#888' }}></i>
                                            <span>{item.address}</span>

                                            {item.phone && (
                                                <>
                                                    <i className="fas fa-phone" style={{ color: '#888' }}></i>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        {item.phone.map(p => <span key={p}>{p}</span>)}
                                                    </div>
                                                </>
                                            )}

                                            {item.email && (
                                                <>
                                                    <i className="fas fa-envelope" style={{ color: '#888' }}></i>
                                                    <a href={`mailto:${item.email}`} style={{ color: AWS.blue }}>{item.email}</a>
                                                </>
                                            )}

                                            {item.website && (
                                                <>
                                                    <i className="fas fa-link" style={{ color: '#888' }}></i>
                                                    <a href={item.website} target="_blank" rel="noreferrer" style={{ color: AWS.blue }}>{item.website}</a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 4. Help & Support */}
                        {activeTab === 'help' && (
                            <div style={containerStyle}>
                                {getSections().internationalHelpAddress?.items?.map((item, idx) => (
                                    <div key={idx} style={{ padding: '24px', borderBottom: '1px solid #eee' }}>
                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{item.name}</h3>
                                        <div style={{ fontSize: '14px', color: '#555' }}>
                                            <p><strong>Location:</strong> {item.address}</p>
                                            {item.phone && <p><strong>Emergency:</strong> {item.phone.join(', ')}</p>}
                                            {item.email && <p><strong>Email:</strong> {item.email}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 5. Logistic Partner */}
                        {activeTab === 'logistic' && (
                            <div style={containerStyle}>
                                {getSections().logisticPartner?.items?.map((item, idx) => (
                                    <div key={idx} style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 700 }}>{item.name}</div>
                                        <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '8px 20px', borderRadius: '4px', textDecoration: 'none', border: '1px solid #ccc', color: '#333' }}>
                                            Visit Website <i className="fas fa-external-link-alt" style={{ marginLeft: '8px' }}></i>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}

                    </>
                ) : !loading && countryCode ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                        No requirements data available for this country selection.
                    </div>
                ) : null}

            </div>
        </div>
    );
};

export default VisaRequirements;
