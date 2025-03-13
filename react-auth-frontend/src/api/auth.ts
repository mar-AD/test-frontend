import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

export const getProfile = async (token: string) => {
    const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};