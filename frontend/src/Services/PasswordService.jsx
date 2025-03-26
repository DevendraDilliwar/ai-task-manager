import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
