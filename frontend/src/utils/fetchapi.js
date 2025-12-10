const API_URL = 'http://localhost:5000/api';
;

const fetchApi = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${endpoint}`, config);
        // console.log('API Request:', { endpoint, options });
        // console.log('API Response:', response);

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } else {

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            return { success: true };
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};



export const api = {
    // User
    login: (credentials) =>
        fetchApi(API_URL + '/users/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }),

    register: (userData) =>
        fetchApi(API_URL + '/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        }),

    getCurrentUser: (user_id) =>
        fetchApi(API_URL + '/users/' + user_id, {
            method: 'GET'
        }),

    editProfile: (userData, user_id) =>
        fetchApi(API_URL + '/users/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(userData)
        }),

    updateProfileImage: (userData, user_id) =>
        fetchApi(API_URL + '/users/pic/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(userData)
        }),

    getCurrentUser: (email) =>
        fetchApi(`${API_URL}/users/${email}`),
    
    getUserById: (userId) =>
        fetchApi(API_URL + '/users/id/' + userId, {
            method: 'GET'
        }),

};

export default api;
