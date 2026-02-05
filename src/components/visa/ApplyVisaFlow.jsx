import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const ApplyVisaFlow = ({ initialCountry, initialVisaType, onClose }) => {
    // Step: 1 = NEW VISA, 2 = VISA DETAILS, 3 = TRAVELLER DETAILS, 4 = PREVIEW & SUBMIT
    const [currentStep, setCurrentStep] = useState(2); // Start at step 2 as step 1 is placeholder

    // Data State
    const [countries, setCountries] = useState([]);
    const [countryRequirements, setCountryRequirements] = useState(null);
    const [availableVisaTypes, setAvailableVisaTypes] = useState([]);
    const [availableEntries, setAvailableEntries] = useState([]);
    const [availableProcessingOptions, setAvailableProcessingOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [visaDetails, setVisaDetails] = useState({
        country: initialCountry || '',
        visaType: initialVisaType || '', // Stores the ID or Name
        entries: '',
        travelDate: '',
        processingOption: '' // Stores the ID (Jurisdiction ID)
    });

    const [travellers, setTravellers] = useState([{
        id: 1,
        passportNumber: '',
        passportExpiry: '',
        givenName: '',
        surname: '',
        passportPlaceOfIssue: '',
        dateOfBirth: '',
        panType: '',
        gender: 'Male',
        nationality: '',
        profession: '',
        emailId: '',
        mobileNumber: '',
        documents: []
    }]);

    const [feeBreakdown, setFeeBreakdown] = useState(null);

    // Fetch Countries on Mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                // Use specific V2 endpoint method
                const response = await api.getPublicVisaCountries();
                if (Array.isArray(response)) {
                    setCountries(response);
                } else if (response.data && Array.isArray(response.data)) {
                    setCountries(response.data);
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Handle Country Selection & Fetch Requirements
    useEffect(() => {
        if (visaDetails.country) {
            const fetchRequirements = async () => {
                setLoading(true);
                try {
                    const countryCode = visaDetails.country;
                    // Use specific V2 endpoint method
                    const response = await api.getPublicCountryRequirements(countryCode);
                    setCountryRequirements(response);

                    if (response && response.visaTypes) {
                        setAvailableVisaTypes(response.visaTypes);

                        // If initialVisaType is passed (by name), try to set it
                        if (initialVisaType && !visaDetails.visaType) {
                            const foundType = response.visaTypes.find(t => t.name === initialVisaType);
                            if (foundType) {
                                setVisaDetails(prev => ({ ...prev, visaType: foundType.id }));
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching requirements:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRequirements();
        } else {
            setAvailableVisaTypes([]);
            setAvailableEntries([]);
            setAvailableProcessingOptions([]);
        }
    }, [visaDetails.country]);

    // Handle Visa Type Selection
    useEffect(() => {
        if (visaDetails.visaType && availableVisaTypes.length > 0) {
            const selectedType = availableVisaTypes.find(t => t.id == visaDetails.visaType);
            if (selectedType) {
                // Populate Entries
                if (selectedType.entryTypes && selectedType.entryTypes.length > 0) {
                    setAvailableEntries(selectedType.entryTypes);
                } else {
                    setAvailableEntries(["Single Entry"]); // Default fallback
                }

                // Populate Processing Options (Jurisdictions)
                if (selectedType.jurisdictions && selectedType.jurisdictions.length > 0) {
                    setAvailableProcessingOptions(selectedType.jurisdictions);
                } else {
                    setAvailableProcessingOptions([]);
                }
            }
        } else {
            setAvailableEntries([]);
            setAvailableProcessingOptions([]);
        }
    }, [visaDetails.visaType, availableVisaTypes]);

    // Handle Processing Option Selection to Update Fees
    useEffect(() => {
        if (visaDetails.processingOption && availableProcessingOptions.length > 0) {
            const selectedJurisdiction = availableProcessingOptions.find(j => j.id == visaDetails.processingOption);
            if (selectedJurisdiction) {
                const gstRate = 0.18;
                const serviceCharge = 3500;

                const visaFee = selectedJurisdiction.visaFee || 0;
                const processingFee = 0;
                const gst = (serviceCharge * gstRate);
                const total = visaFee + processingFee + serviceCharge + gst;

                setFeeBreakdown({
                    visaFee: visaFee,
                    processingFee: processingFee,
                    serviceCharge: serviceCharge,
                    gst: gst,
                    totalPerPax: total
                });
            }
        } else {
            setFeeBreakdown(null);
        }
    }, [visaDetails.processingOption, availableProcessingOptions]);

    // Stepper Component
    const Stepper = () => {
        const steps = [
            { number: 1, label: 'NEW VISA' },
            { number: 2, label: 'VISA DETAILS' },
            { number: 3, label: 'TRAVELLER DETAILS' },
            { number: 4, label: 'PREVIEW & SUBMIT' }
        ];

        const getStepStatus = (stepNum) => {
            if (stepNum < currentStep) return 'completed';
            if (stepNum === currentStep) return 'active';
            return 'upcoming';
        };

        const progress = (currentStep / 4) * 100;

        return (
            <div style={{ marginBottom: '40px' }}>
                {/* Progress Indicator */}
                <div style={{ textAlign: 'right', marginBottom: '10px', fontSize: '12px', color: '#0ea5e9', fontWeight: 600 }}>
                    {Math.round(progress)}% Completed
                </div>

                {/* Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    {steps.map((step, idx) => {
                        const status = getStepStatus(step.number);

                        return (
                            <React.Fragment key={step.number}>
                                {/* Step Circle & Label */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                                    {/* Circle */}
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: status === 'completed' ? '#22c55e' : status === 'active' ? '#0ea5e9' : '#e5e7eb',
                                        border: `2px solid ${status === 'completed' ? '#22c55e' : status === 'active' ? '#0ea5e9' : '#e5e7eb'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: status === 'upcoming' ? '#9ca3af' : 'white',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        {status === 'completed' ? '✓' : step.number}
                                    </div>

                                    {/* Label */}
                                    <div style={{
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: status === 'upcoming' ? '#9ca3af' : status === 'active' ? '#0ea5e9' : '#1f2937',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        maxWidth: '100px'
                                    }}>
                                        {step.label}
                                    </div>
                                </div>

                                {/* Connecting Line */}
                                {idx < steps.length - 1 && (
                                    <div style={{
                                        flex: 1,
                                        height: '3px',
                                        backgroundColor: getStepStatus(step.number + 1) === 'upcoming' ? '#e5e7eb' : '#22c55e',
                                        position: 'relative',
                                        top: '-25px'
                                    }} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Step 2: Visa Details Form
    const VisaDetailsStep = () => {
        const handleInputChange = (field, value) => {
            // Reset dependent fields when parent changes
            if (field === 'country') {
                setVisaDetails(prev => ({ ...prev, country: value, visaType: '', entries: '', processingOption: '' }));
                setFeeBreakdown(null);
            } else if (field === 'visaType') {
                setVisaDetails(prev => ({ ...prev, visaType: value, entries: '', processingOption: '' }));
                setFeeBreakdown(null);
            } else {
                setVisaDetails(prev => ({ ...prev, [field]: value }));
            }
        };

        const isFormFilled = visaDetails.country && visaDetails.visaType && visaDetails.entries && visaDetails.travelDate && visaDetails.processingOption;

        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a8a', marginBottom: '30px' }}>Visa Details</h2>

                {/* Form Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    {/* Visa Country */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Visa Country <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <select
                            value={visaDetails.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: '#f9fafb',
                                color: visaDetails.country ? '#1f2937' : '#9ca3af'
                            }}
                        >
                            <option value="">Select Country</option>
                            {countries.map((country, idx) => (
                                <option key={idx} value={country.code}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Visa Type */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Visa Type <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <select
                            value={visaDetails.visaType}
                            onChange={(e) => handleInputChange('visaType', e.target.value)}
                            disabled={!visaDetails.country}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: !visaDetails.country ? '#e5e7eb' : '#f9fafb',
                                color: visaDetails.visaType ? '#1f2937' : '#9ca3af',
                                cursor: !visaDetails.country ? 'not-allowed' : 'default'
                            }}
                        >
                            <option value="">Select Visa Type</option>
                            {availableVisaTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Entries */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Entries <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <select
                            value={visaDetails.entries}
                            onChange={(e) => handleInputChange('entries', e.target.value)}
                            disabled={!visaDetails.visaType}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: !visaDetails.visaType ? '#e5e7eb' : '#f9fafb',
                                color: visaDetails.entries ? '#1f2937' : '#9ca3af',
                                cursor: !visaDetails.visaType ? 'not-allowed' : 'default'
                            }}
                        >
                            <option value="">Select</option>
                            {availableEntries.map((entry, idx) => (
                                <option key={idx} value={entry}>{entry}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Second Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    {/* Travel Date */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Travel Date <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <input
                            type="date"
                            value={visaDetails.travelDate}
                            onChange={(e) => handleInputChange('travelDate', e.target.value)}
                            placeholder="dd/mm/yyyy"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: '#f9fafb'
                            }}
                        />
                    </div>

                    {/* Processing Option */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Processing Option <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            value={visaDetails.processingOption}
                            onChange={(e) => handleInputChange('processingOption', e.target.value)}
                            disabled={!visaDetails.visaType}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: !visaDetails.visaType ? '#e5e7eb' : '#f9fafb',
                                color: visaDetails.processingOption ? '#1f2937' : '#9ca3af',
                                cursor: !visaDetails.visaType ? 'not-allowed' : 'default'
                            }}
                        >
                            <option value="">Enter Processing Option</option>
                            {availableProcessingOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Fee Breakdown - Show only when form is filled */}
                {feeBreakdown && (
                    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                            <span>Visa Fee : {feeBreakdown.visaFee.toFixed(2)}</span>
                            <span>Processing Fee (VFS.BLS charges) : {feeBreakdown.processingFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                            <span>Service Charges : {feeBreakdown.serviceCharge.toFixed(2)}</span>
                            <span>GST ( 18% ) : {feeBreakdown.gst.toFixed(2)}</span>
                        </div>
                        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #d1d5db', fontSize: '14px', fontWeight: 700 }}>
                            Total Amount ( Per PAX ) : {feeBreakdown.totalPerPax.toFixed(2)}
                        </div>

                        <div style={{ marginTop: '20px', fontSize: '12px', color: '#ef4444', lineHeight: '1.6' }}>
                            <p style={{ margin: '5px 0' }}>
                                <strong>Note :</strong> Only service charges will be collected now. Visa fees, VFS & Other Charges will be collected before the final submission.
                            </p>
                            <p style={{ margin: '5px 0' }}>
                                <strong>Disclaimer :</strong> Visa charges provided are subject to change as per ROE or the Consulate without prior notice and the same may vary at the time of final submission.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Step 3: Traveller Details Form
    const TravellerDetailsStep = () => {
        const [activePassenger, setActivePassenger] = useState(0);

        const handlePassengerChange = (field, value) => {
            const updatedTravellers = [...travellers];
            updatedTravellers[activePassenger] = {
                ...updatedTravellers[activePassenger],
                [field]: value
            };
            setTravellers(updatedTravellers);
        };

        const addPassenger = () => {
            setTravellers([...travellers, {
                id: travellers.length + 1,
                passportNumber: '',
                passportExpiry: '',
                givenName: '',
                surname: '',
                passportPlaceOfIssue: '',
                dateOfBirth: '',
                panType: '',
                gender: 'Male',
                nationality: '',
                profession: '',
                emailId: '',
                mobileNumber: '',
                documents: []
            }]);
        };

        const currentPassenger = travellers[activePassenger];

        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', marginBottom: '5px' }}>
                    Traveller Details ( <span style={{ fontWeight: 600 }}>Passenger</span> )
                </h2>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '25px' }}>
                    [Form only upload file, click on the scan below to scan the passport]
                </p>

                {/* Passport Page Selection */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                        Passport Page : 1
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '3px', background: 'white' }}>-</button>
                        <span style={{ fontSize: '13px' }}>No doc scann</span>
                        <button style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '3px', background: 'white' }}>+</button>
                        <button style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: 'white',
                            border: '1px solid #3b82f6',
                            borderRadius: '4px',
                            color: '#3b82f6',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            📷 SCAN NOW
                        </button>
                    </div>
                </div>

                <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '13px', color: '#9ca3af' }}>OR</div>

                {/* Form Fields Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    {/* Passport Number */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Passport Number <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <input
                            type="text"
                            value={currentPassenger.passportNumber}
                            onChange={(e) => handlePassengerChange('passportNumber', e.target.value)}
                            placeholder="Enter Passport Number"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* Passport Expiry */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Passport Expiry <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <input
                            type="date"
                            value={currentPassenger.passportExpiry}
                            onChange={(e) => handlePassengerChange('passportExpiry', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* Given Name */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Given Name <span style={{ color: 'red' }}>*</span> <span style={{ color: '#9ca3af', fontSize: '12px' }}>ⓘ</span>
                        </label>
                        <input
                            type="text"
                            value={currentPassenger.givenName}
                            onChange={(e) => handlePassengerChange('givenName', e.target.value)}
                            placeholder="Enter Given Name"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* Surname */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Surname <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={currentPassenger.surname}
                            onChange={(e) => handlePassengerChange('surname', e.target.value)}
                            placeholder="Enter Surname"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* Passport Place of Issue */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Passport Place of Issue <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={currentPassenger.passportPlaceOfIssue}
                            onChange={(e) => handlePassengerChange('passportPlaceOfIssue', e.target.value)}
                            placeholder="Enter Passport Place of Issue"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Date of Birth <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="date"
                            value={currentPassenger.dateOfBirth}
                            onChange={(e) => handlePassengerChange('dateOfBirth', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* PAN Type */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            PAN Type <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            value={currentPassenger.panType}
                            onChange={(e) => handlePassengerChange('panType', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                color: currentPassenger.panType ? '#1f2937' : '#9ca3af'
                            }}
                        >
                            <option value="">Select PAN Type</option>
                            <option value="Individual">Individual</option>
                            <option value="Company">Company</option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Gender <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '20px', paddingTop: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={currentPassenger.gender === 'Male'}
                                    onChange={(e) => handlePassengerChange('gender', e.target.value)}
                                />
                                Male
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={currentPassenger.gender === 'Female'}
                                    onChange={(e) => handlePassengerChange('gender', e.target.value)}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* Nationality */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Nationality <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            value={currentPassenger.nationality}
                            onChange={(e) => handlePassengerChange('nationality', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                color: currentPassenger.nationality ? '#1f2937' : '#9ca3af'
                            }}
                        >
                            <option value="">Enter Nationality</option>
                            <option value="Indian">Indian</option>
                            <option value="American">American</option>
                            <option value="British">British</option>
                        </select>
                    </div>

                    {/* Profession */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Profession <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            value={currentPassenger.profession}
                            onChange={(e) => handlePassengerChange('profession', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                color: currentPassenger.profession ? '#1f2937' : '#9ca3af'
                            }}
                        >
                            <option value="">Enter Profession</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                    </div>

                    {/* Email ID */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Email ID <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="email"
                            value={currentPassenger.emailId}
                            onChange={(e) => handlePassengerChange('emailId', e.target.value)}
                            placeholder="Enter Email ID"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                            Mobile Number <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="tel"
                            value={currentPassenger.mobileNumber}
                            onChange={(e) => handlePassengerChange('mobileNumber', e.target.value)}
                            placeholder="Enter Mobile Number"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                    </div>
                </div>

                {/* Documents Section */}
                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Documents <span style={{ fontSize: '12px', fontWeight: 400, color: '#6b7280' }}>( Upload 📁 Click on the doc to view/delete file )</span>
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '15px', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                                Document type
                            </label>
                            <select style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}>
                                <option>Photo</option>
                                <option>Passport Copy</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                                Document
                            </label>
                            <input
                                type="file"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '13px'
                                }}
                            />
                        </div>

                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            height: '40px'
                        }}>
                            Upload
                        </button>
                    </div>
                </div>

                {/* Add Passenger Button */}
                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                    <button
                        onClick={addPassenger}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'white',
                            color: '#3b82f6',
                            border: '2px solid #3b82f6',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        ➕ ADD PASSENGER
                    </button>
                </div>

                {/* Passenger Table */}
                {travellers.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>ACTION</th>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>PASSPORT NO</th>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>NAME</th>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>DOB</th>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>PAN TYPE</th>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>GENDER</th>
                                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 700 }}>EMAIL ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {travellers.map((traveller, idx) => (
                                    <tr key={traveller.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '10px' }}>
                                            <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                        </td>
                                        <td style={{ padding: '10px' }}>{traveller.passportNumber || '-'}</td>
                                        <td style={{ padding: '10px' }}>{traveller.givenName ? `${traveller.givenName} ${traveller.surname}` : '-'}</td>
                                        <td style={{ padding: '10px' }}>{traveller.dateOfBirth || '-'}</td>
                                        <td style={{ padding: '10px' }}>{traveller.panType || '-'}</td>
                                        <td style={{ padding: '10px' }}>{traveller.gender || '-'}</td>
                                        <td style={{ padding: '10px' }}>{traveller.emailId || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

    // Navigation Buttons
    const NavigationButtons = () => {
        const handlePrevious = () => {
            if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
            }
        };

        const handleContinue = () => {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            }
        };

        return (
            <div style={{ display: 'flex', gap: '15px' }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: 'white',
                        color: '#3b82f6',
                        border: '2px solid #3b82f6',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentStep === 1 ? 0.5 : 1
                    }}
                >
                    Previous
                </button>

                <button
                    onClick={handleContinue}
                    style={{
                        padding: '12px 40px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}
                >
                    Continue
                </button>
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px', fontFamily: '"Manrope", sans-serif' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Stepper />

                {currentStep === 2 && <VisaDetailsStep />}
                {currentStep === 3 && <TravellerDetailsStep />}
                {currentStep === 4 && (
                    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px', textAlign: 'center' }}>
                        <h2>Preview & Submit</h2>
                        <p>Review your application details before submitting.</p>
                    </div>
                )}

                <NavigationButtons />
            </div>
        </div>
    );
};

export default ApplyVisaFlow;
