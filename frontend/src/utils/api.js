export const BASE_URL = 'http://localhost:8000';
const API_URL = `${BASE_URL}/api`;

const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
    }
    return headers;
};

// Generic Fetch Wrapper
const request = async (endpoint, options = {}) => {
    const config = {
        method: 'GET',
        headers: getHeaders(),
        ...options,
    };

    if (options.body && !(options.body instanceof FormData)) {
        config.body = JSON.stringify(options.body);
        // Remove Content-Type for FormData to let browser set it with boundary
    } else if (options.body instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to the server. Please ensure the backend is running.');
        }
        throw error;
    }
};

export const api = {
    get: (endpoint) => request(endpoint),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};
