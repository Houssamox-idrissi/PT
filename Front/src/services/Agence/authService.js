import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/auth";

export const login = async (email, password) => {
  try {    
    const credentials = {
      username: email.trim(),
      password: password.trim()
    };
    
    const response = await axios.post(`${AUTH_URL}/login`, credentials);    
    
    if (!response.data?.jwt) {
      throw new Error('Authentication failed: No token received');
    }
    localStorage.setItem('token', response.data.jwt);
    localStorage.setItem('user', JSON.stringify({ 
      email: email,
      token: response.data.jwt
    }));
    
    return {
      success: true,
      token: response.data.jwt,
      role : response.data.role,
      user: { email }
    };
    
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid email or password');
      } else {
        throw new Error(error.response.data?.message || 'Authentication failed');
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection');
    } else {
      throw new Error(error.message || 'Login failed');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const dakhl = () => {
  return !!localStorage.getItem('token');
};

export const jibToken = () => {
  return localStorage.getItem('token');
}
