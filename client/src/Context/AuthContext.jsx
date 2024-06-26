import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status on mount
        axios.get(`${process.env.REACT_APP_BACKEND}`, { withCredentials: true })
            .then(response => {
                setIsAuthenticated(response.data.isAuthenticated);
            })
            .catch(error => {
                console.error('Error checking authentication:', error);
            });
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
