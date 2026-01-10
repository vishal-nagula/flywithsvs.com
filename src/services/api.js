
// centralized API service
const BASE_URL = '/api/v1';

const getHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    // Auth
    verifySession: async () => {
        // Using getSolutions as a proxy for session verification
        const response = await fetch(`${BASE_URL}/agent/solutions`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Session invalid');
        return true;
    },

    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }
        return response.json();
    },

    changePassword: async (data) => {
        const headers = getHeaders();
        console.log('Change Password Debug:', {
            url: `${BASE_URL}/auth/change-password`,
            headers,
            body: data
        });
        const response = await fetch(`${BASE_URL}/auth/change-password`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Password change failed');
        }
        return response.json(); // Usually 200 OK
    },

    // Agent Registration

    // Agent Registration
    agentInitiate: async (data) => {
        const response = await fetch(`${BASE_URL}/auth/agent/initiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration initiation failed');
        }
        return response.json();
    },

    agentVerifyOtp: async (data) => {
        const response = await fetch(`${BASE_URL}/auth/agent/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'OTP verification failed');
        }
        return response.json();
    },

    agentComplete: async (data) => {
        const response = await fetch(`${BASE_URL}/auth/agent/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration completion failed');
        }
        return response.json();
    },

    // Agent Endpoints
    bookFlight: async (bookingData) => {
        const response = await fetch(`${BASE_URL}/agent/flight/book`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(bookingData)
        });
        if (!response.ok) throw new Error('Flight booking failed');
        return response.json();
    },

    createDummyTicket: async (ticketData) => {
        const response = await fetch(`${BASE_URL}/agent/flight/dummy-ticket`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(ticketData)
        });
        if (!response.ok) throw new Error('Dummy ticket creation failed');
        return response.json();
    },

    getSolutions: async () => {
        const response = await fetch(`${BASE_URL}/agent/solutions`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch solutions');
        return response.json();
    },

    // Agent Endpoints
    getVisaCountries: async () => {
        const response = await fetch(`${BASE_URL}/admin/countries`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch country list');
        return response.json();
    },

    getVisaRequirements: async (countryCode) => {
        const response = await fetch(`${BASE_URL}/visa/requirements/${countryCode}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch visa requirements');
        return response.json();
    },

    // Visa Services (New V2 POST Flow - Kept for reference or future use)
    searchVisaCountries: async (searchConfig) => {
        const response = await fetch(`${BASE_URL}/agent/search-countries`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(searchConfig) // { "search": "tha" }
        });
        if (!response.ok) throw new Error('Failed to search countries');
        return response.json();
    },

    getVisaTypes: async (countryCode) => {
        const response = await fetch(`${BASE_URL}/agent/get-visa-types`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ countryCode })
        });
        if (!response.ok) throw new Error('Failed to fetch visa types');
        return response.json();
    },

    getJurisdictions: async (countryCode, visaTypeCode) => {
        const response = await fetch(`${BASE_URL}/agent/get-jurisdictions`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ countryCode, visaTypeCode })
        });
        if (!response.ok) throw new Error('Failed to fetch jurisdictions');
        return response.json();
    },

    getVisaDetails: async (payload) => {
        // payload: { countryCode, visaTypeCode, jurisdictionCode }
        const response = await fetch(`${BASE_URL}/agent/get-visa-details`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to fetch visa details');
        return response.json();
    },

    shareVisaInfo: async (payload) => {
        // payload: { countryCode, visaTypeCode, jurisdictionCode, email? }
        const response = await fetch(`${BASE_URL}/agent/share-visa-info`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Failed to share visa info');
        return response.json();
    },

    // Public/Shared
    getBookingStatus: async (reference) => {
        const response = await fetch(`${BASE_URL}/public/bookings/${reference}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch booking status');
        return response.json();
    },

    // Subscription Management
    getAgentSubscriptions: async () => {
        const response = await fetch(`${BASE_URL}/agent/subscriptions`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch subscriptions');
        return response.json();
    },

    getAllSolutions: async () => {
        const response = await fetch(`${BASE_URL}/solutions`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch solutions');
        return response.json();
    },

    getSolutionPlans: async (solutionId) => {
        const response = await fetch(`${BASE_URL}/solutions/${solutionId}/plans`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch plans');
        return response.json();
    },

    subscribeToPlan: async (planId) => {
        const response = await fetch(`${BASE_URL}/agent/subscriptions`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ planId })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Subscription failed');
        }
        return response.json();
    }
};
