import React, { createContext, useContext, useState, useEffect } from 'react';
import { seedDemoUsers } from '../utils/seedDemoUsers';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    // Seed demo users first
    seedDemoUsers();
    
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('lms_user');
      }
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = (userData) => {
    const { email, password, name, role } = userData;
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('lms_users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      password, // In production, this should be hashed
      name,
      role,
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('lms_users', JSON.stringify(users));

    // Log in the user
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('lms_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('lms_users') || '[]');
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userWithoutPassword = { ...foundUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('lms_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isInstructor: user?.role === 'instructor',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
