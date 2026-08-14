import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await api.post('/login', { email, password });
            const userData = data.user;
            const completeUser = {
                ...userData,
                token: data.token,
                name: userData.name || userData.email.split('@')[0]
            };

            setUser(completeUser);
            localStorage.setItem('user', JSON.stringify(completeUser));
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Invalid credentials');
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await api.post('/register', { name, email, password });
            const userData = data.user;
            const completeUser = {
                ...userData,
                token: data.token,
                name: userData.name || name
            };

            setUser(completeUser);
            localStorage.setItem('user', JSON.stringify(completeUser));
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed');
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout server error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const isAdmin = user && user.role === 'admin';

    const value = {
        user,
        login,
        register,
        logout,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
