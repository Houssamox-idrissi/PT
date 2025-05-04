import axios from "axios";

const API_URL = "http://localhost:8080/api/agences";
const AUTH_URL = "http://localhost:8080/api/auth"

//Login
export const loginAgency = async (credentials) => {
  try {
    console.log('Attempting login with credentials:', credentials);
    const response = await axios.post(`${AUTH_URL}/login`, {
      username: credentials.email,
      password: credentials.password
    });
    console.log('Login response:', response.data);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ email: credentials.email }));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

//Post
export const registerAgency = async (formData) => {
  const l3aba = {
    nom: formData.nom.trim(),
    tel: formData.tel.trim(),
    email: formData.email.trim(),
    directeurName: formData.directeurName.trim(),
    directeurEmail: formData.directeurEmail.trim(),
    directeurPassword: formData.directeurPassword
  };

  const response = await axios.post(API_URL, l3aba);
  return response.data;
};

//Get
export const getAllAgencies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Get by id
export const getAgencyById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

//Put
export const updateAgency = async (id, formData) => {
  const l3aba = {
    nom: formData.nom.trim(),
    tel: formData.tel.trim(),
    email: formData.email.trim(),
    directeurName: formData.directeurName.trim(),
    directeurEmail: formData.directeurEmail.trim(),
    directeurPassword: formData.directeurPassword
  };

  const response = await axios.put(`${API_URL}/${id}`, l3aba);
  return response.data;
};

//Delete
export const deleteAgency = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  registerAgency,
  loginAgency,
  getAllAgencies,
  getAgencyById,
  updateAgency,
  deleteAgency,
};