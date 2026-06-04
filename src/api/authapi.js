import axios from "axios";

const BASE_URL = "https://ecommerce-monolithic-2.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login Failed. Please try again.",
    };
  }
};

export default api;