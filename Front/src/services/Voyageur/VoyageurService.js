import axios from "axios";
const API_URL = "http://localhost:8080/api/voyageurs/register";

export const registerVoyageur = async (formData) => {
  const voyageur = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim(),
    password: formData.password,
  };

  try {
    const response = await axios.post(API_URL, voyageur);
    return response.data;
  } catch (error) {
    console.error("Error registering voyageur:", error);
    throw error;
  }
}