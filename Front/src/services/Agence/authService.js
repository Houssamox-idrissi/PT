import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/auth";

export const login = async (email, password) => {
  try {    
    const r = {
      username: email.trim(),
      password: password.trim()
      
    };
    const response = await axios.post(`${AUTH_URL}/login`, r);    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ 
        email: email,
        token: response.data.token
      }));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:',  error.message);
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

export const dakhl = () => {
  return !!localStorage.getItem('token');
};
