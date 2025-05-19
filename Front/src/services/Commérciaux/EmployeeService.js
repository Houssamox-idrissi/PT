import axios from "axios";
import { getAuthHeader } from "../Agence/authService";

const API_URL = "http://localhost:8080/api/employees";
const API_ByCommercial = "http://localhost:8080/api/employees/commercials";

// POST 
export const registerEmployee = async (formData) => {
  const employee = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim(),
    password: formData.password,
    role: formData.role,
    agenceId: formData.agenceId,
  };

  const response = await axios.post(API_URL, employee,{
    headers: getAuthHeader()
  });
  return response.data;
};

// GET 
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Full error object:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error; // Re-throw after logging
  }
};

export const getAgenceBYCommercial = async () => {
  try {
    const response = await axios.get(API_ByCommercial, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Full error object:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
}

// GET 
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// PUT
export const updateEmployee = async (id, formData) => {
  const employee = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    password: formData.password,
    role: formData.role,
    agenceId: formData.agenceId,
  };

  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

// DELETE
export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  registerEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
