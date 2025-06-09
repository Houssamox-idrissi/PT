import axios from 'axios';
import { getAuthHeader } from '../Agence/authService';

const API_URL = "http://localhost:8080/api/logements";
const API_ByCommercial = "http://localhost:8080/api/logements/my-logements";
const API_ByCommercialId = "http://localhost:8080/api/logements/commercial";

export const getLogements = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};

export const ModifyLogement = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error updating logement:", error);
        throw error;
    }
}

export const getLogementsByCommercialToken = async () => {
    try {
        const response = await axios.get(API_ByCommercial, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching logements:", error);
        throw error;
    }
};

export const getLogementsByCommercialId = async (id) => {
    try {
        const response = await axios.get(`${API_ByCommercialId}/${id}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching logements by commercial ID:", error);
        throw error;
    }
}



export const getLogementById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching logement by ID:", error);
        throw error;
    }
};

export const deleteLogement = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting logement:", error);
        throw error;
    }
};