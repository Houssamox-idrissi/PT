import { getAuthHeader } from "../Agence/authService";
import axios from "axios";


const API_URL = "http://localhost:8080/api/reservations";

// POST
export const createReservation = async (formData) => {
  const reservation = {
    logementId: formData.logementId,
    startDate: formData.startDate,
    endDate: formData.endDate,
    capacity: formData.capacity,
  };

  try {
    const response = await axios.post(API_URL, reservation, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};