import React, { createContext, useState, useContext, useEffect } from "react";
import apiService from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const profile = await apiService.getProfile();
        setUser(profile);
      } catch (error) {
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);

      const user = {
        name: response.name,
        email: response.email,
      };
      setUser(user);

      return { success: true, message: "Login successful!" };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      return { success: true, message: "Registration successful!" };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    apiService.removeToken();
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
