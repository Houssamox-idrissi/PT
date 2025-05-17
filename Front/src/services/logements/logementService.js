import axios from 'axios';

const API_URL = "http://localhost:8080/api/logements";
export const getLogements = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}; 

export const getLogementsByCommercialToken = async (CommercialToken) => {
    try {
        const response = await axios.get(`${API_URL}/${CommercialToken}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching logements by user ID:", error);
        throw error;
    }
};