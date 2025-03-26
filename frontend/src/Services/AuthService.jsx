import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
