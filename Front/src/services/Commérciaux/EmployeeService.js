import axios from "axios";
import { getAuthHeader } from "../Agence/authService";

const API_URL = "http://localhost:8080/api/employees";

// POST 
export const registerEmployee = async (formData) => {
  const employee = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    password: formData.password,
    role: formData.role,
    agenceId: formData.agenceId,
  };

  const response = await axios.post(API_URL, employee);
  return response.data;
};

// GET 
export const getAllEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

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
